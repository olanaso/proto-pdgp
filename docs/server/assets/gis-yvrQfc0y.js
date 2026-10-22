import { n as armarPaquete, t as areaM2 } from "./gisPaquete-070Jklxg.js";
import JSZip from "jszip";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
//#region src/server/gis.ts
/**
* Servicio GIS del prototipo (docs/PLAN-GIS-INTEROPERABILIDAD.md §3): lo que la web publica queda en
* `.data/gis/` y se sirve como OGC API Features a QGIS y ArcGIS, con sesión por usuario.
* ponytail: archivos JSON en disco y un solo proceso; con backend, base de datos espacial (PostGIS)
* y el directorio de usuarios del MTC.
*/
var DIR = path.join(process.cwd(), ".data", "gis");
var RAIZ = process.cwd();
async function leer(archivo, vacio) {
	try {
		return JSON.parse(await readFile(path.join(DIR, archivo), "utf8"));
	} catch {
		return vacio;
	}
}
async function escribir(archivo, datos) {
	const ruta = path.join(DIR, archivo);
	await mkdir(path.dirname(ruta), { recursive: true });
	await writeFile(ruta, typeof datos === "string" || datos instanceof Uint8Array ? datos : JSON.stringify(datos));
}
var seguro = (s) => /^[a-z0-9][a-z0-9_.-]{0,80}$/i.test(s);
async function anotar(a) {
	const lista = await leer("actividad.json", []);
	lista.unshift({
		fecha: (/* @__PURE__ */ new Date()).toISOString(),
		...a
	});
	await escribir("actividad.json", lista.slice(0, 2e3));
}
var DEMO = {
	usuario: "bim",
	nombre: "Usuario de demostración",
	rol: "ADMIN",
	rolNombre: "Administrador del sistema",
	proyectos: "*",
	descargar: true,
	actualizar: true,
	activo: true
};
var CLAVE_DEMO = "Bim2026*";
var DIAS_SESION = 30;
var hashDe = (contrasena, sal) => scryptSync(contrasena, sal, 32).toString("hex");
function claveValida(a, contrasena) {
	if (a.usuario === DEMO.usuario) return contrasena === CLAVE_DEMO;
	if (!a.sal || !a.hash) return false;
	const x = Buffer.from(hashDe(contrasena, a.sal), "hex");
	const y = Buffer.from(a.hash, "hex");
	return x.length === y.length && timingSafeEqual(x, y);
}
var norm = (u) => u.trim().toLowerCase();
/** "juan.perez@proyecto.com" también entra como "juan.perez". */
var mismoUsuario = (a, b) => norm(a) === norm(b) || norm(a).split("@")[0] === norm(b).split("@")[0];
async function accesos() {
	return leer("accesos.json", []);
}
async function accesoDe(usuario) {
	if (mismoUsuario(usuario, DEMO.usuario)) return DEMO;
	return (await accesos()).find((a) => mismoUsuario(a.usuario, usuario));
}
async function crearSesion(usuario) {
	const token = randomBytes(24).toString("base64url");
	const sesiones = await leer("sesiones.json", {});
	const ahora = Date.now();
	for (const [t, s] of Object.entries(sesiones)) if (Date.parse(s.caduca) < ahora) delete sesiones[t];
	const caduca = new Date(ahora + DIAS_SESION * 864e5).toISOString();
	sesiones[token] = {
		usuario,
		caduca
	};
	await escribir("sesiones.json", sesiones);
	return {
		token,
		caduca
	};
}
/** Quien llama: token Bearer, Basic (usuario y contraseña, o usuario y token) o token en la ruta. */
async function quien(req, tokenRuta) {
	const cab = req.headers.get("authorization") ?? "";
	let token = tokenRuta ?? "";
	if (cab.startsWith("Bearer ")) token = cab.slice(7).trim();
	if (cab.startsWith("Basic ")) {
		const [u, ...resto] = Buffer.from(cab.slice(6), "base64").toString("utf8").split(":");
		const clave = resto.join(":");
		const a = await accesoDe(u);
		if (a?.activo && claveValida(a, clave)) return a;
		token = clave;
	}
	if (!token) return null;
	const s = (await leer("sesiones.json", {}))[token];
	if (!s || Date.parse(s.caduca) < Date.now()) return null;
	const a = await accesoDe(s.usuario);
	return a?.activo ? a : null;
}
var permitido = (a, proyecto) => a.proyectos === "*" || a.proyectos.includes(proyecto);
/**
* Llamadas de la propia web (publicar, sincronizar accesos, resolver cambios): mismo origen y cabecera.
* ponytail: la web aún no tiene sesión de servidor; con backend, estas llamadas usan la sesión del usuario.
*/
function esWeb(req) {
	if (req.headers.get("x-pdgp-web") !== "1") return false;
	const origen = req.headers.get("origin");
	return !origen || new URL(origen).host === new URL(req.url).host;
}
/**
* Siempre con Content-Length: sin ella el servidor de desarrollo deja la conexión abierta y los
* clientes de Python (plugin de QGIS, ArcGIS) esperan hasta su tiempo límite.
*/
function respuesta(cuerpo, estado, cabeceras) {
	const bytes = typeof cuerpo === "string" ? new TextEncoder().encode(cuerpo) : cuerpo;
	return new Response(bytes, {
		status: estado,
		headers: {
			...cabeceras,
			"content-length": String(bytes.byteLength),
			"cache-control": "no-store"
		}
	});
}
var json = (datos, estado = 200, tipo = "application/json") => respuesta(JSON.stringify(datos), estado, { "content-type": `${tipo}; charset=utf-8` });
var error = (estado, mensaje) => json({ error: mensaje }, estado);
var SIN_SESION = () => respuesta(JSON.stringify({ error: "Inicie sesión: falta el token o venció." }), 401, {
	"content-type": "application/json; charset=utf-8",
	"www-authenticate": "Basic realm=\"PDGP\""
});
var SIN_PERMISO = (permiso) => error(403, `Su usuario no tiene el permiso "${permiso}". Pídalo al Administrador del sistema.`);
var publico = (a) => {
	const { sal, hash, ...resto } = a;
	return {
		...resto,
		tieneContrasena: a.usuario === DEMO.usuario || !!(sal && hash)
	};
};
var leerProyecto = (id) => seguro(id) ? leer(`proyectos/${id}.json`, null) : Promise.resolve(null);
async function publicados() {
	const dir = path.join(DIR, "proyectos");
	if (!existsSync(dir)) return [];
	const ids = (await readdir(dir)).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));
	return (await Promise.all(ids.map(leerProyecto))).filter((p) => !!p);
}
var resumen = (p, pendientes = 0) => ({
	id: p.id,
	codigo: p.codigo,
	nombre: p.nombre,
	publicadoEl: p.publicadoEl,
	publicadoPor: p.publicadoPor,
	demostracion: p.demostracion,
	cambiosPendientes: pendientes,
	colecciones: p.colecciones.map((c) => ({
		id: c.id,
		titulo: c.titulo,
		geometria: c.geometria,
		editable: c.editable,
		entidades: c.datos.features.length
	}))
});
var CRS84 = "http://www.opengis.net/def/crs/OGC/1.3/CRS84";
function bboxDe(g) {
	let e = null;
	const ir = (c) => {
		if (Array.isArray(c) && typeof c[0] === "number") {
			const [x, y] = c;
			e = e ? [
				Math.min(e[0], x),
				Math.min(e[1], y),
				Math.max(e[2], x),
				Math.max(e[3], y)
			] : [
				x,
				y,
				x,
				y
			];
		} else if (Array.isArray(c)) c.forEach(ir);
	};
	if (g && "coordinates" in g) ir(g.coordinates);
	return e;
}
function extensionColeccion(fc) {
	let e = null;
	for (const f of fc.features) {
		const b = bboxDe(f.geometry);
		if (b) e = e ? [
			Math.min(e[0], b[0]),
			Math.min(e[1], b[1]),
			Math.max(e[2], b[2]),
			Math.max(e[3], b[3])
		] : b;
	}
	return e ?? [
		-81.4,
		-18.4,
		-68.6,
		.1
	];
}
var conId = (f) => ({
	...f,
	id: String(f.properties?.fid ?? "")
});
function ogc(req, p, resto, base) {
	const url = new URL(req.url);
	const enlace = (href, rel, type = "application/json", title) => ({
		href,
		rel,
		type,
		...title ? { title } : {}
	});
	if (resto.length === 0) return json({
		title: `PDGP · ${p.nombre}`,
		description: `Capas del proyecto ${p.nombre} (${p.codigo}) publicadas el ${p.publicadoEl} por ${p.publicadoPor}.`,
		links: [
			enlace(base, "self"),
			enlace(`${base}/conformance`, "conformance"),
			enlace(`${base}/collections`, "data"),
			enlace(`${base}/api`, "service-desc", "application/vnd.oai.openapi+json;version=3.0")
		]
	});
	if (resto[0] === "api") return json({
		openapi: "3.0.2",
		info: {
			title: `PDGP · ${p.nombre}`,
			version: "0.1"
		},
		paths: { "/collections/{collectionId}/items": { get: {
			parameters: [{
				name: "limit",
				in: "query",
				schema: {
					type: "integer",
					minimum: 1,
					maximum: 1e4,
					default: 1e3
				}
			}],
			responses: { "200": { description: "Entidades en GeoJSON" } }
		} } }
	}, 200, "application/vnd.oai.openapi+json;version=3.0");
	if (resto[0] === "conformance") return json({ conformsTo: ["http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core", "http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson"] });
	if (resto[0] !== "collections") return error(404, "Recurso no encontrado.");
	const meta = (c) => ({
		id: c.id,
		title: c.titulo,
		description: c.descripcion,
		itemType: "feature",
		crs: [CRS84],
		extent: { spatial: {
			bbox: [extensionColeccion(c.datos)],
			crs: CRS84
		} },
		links: [enlace(`${base}/collections/${c.id}`, "self"), enlace(`${base}/collections/${c.id}/items`, "items", "application/geo+json", c.titulo)]
	});
	if (resto.length === 1) return json({
		collections: p.colecciones.map(meta),
		links: [enlace(`${base}/collections`, "self")]
	});
	const c = p.colecciones.find((x) => x.id === resto[1]);
	if (!c) return error(404, `La colección «${resto[1]}» no existe en el proyecto.`);
	if (resto.length === 2) return json(meta(c));
	if (resto[2] !== "items") return error(404, "Recurso no encontrado.");
	if (resto.length === 4) {
		const f = c.datos.features.find((x) => String(x.properties?.fid) === resto[3]);
		return f ? json(conId(f), 200, "application/geo+json") : error(404, "Entidad no encontrada.");
	}
	const limite = Math.min(1e4, Math.max(1, Number(url.searchParams.get("limit")) || 1e3));
	const desde = Math.max(0, Number(url.searchParams.get("offset")) || 0);
	const bbox = url.searchParams.get("bbox")?.split(",").map(Number);
	const q = url.searchParams.get("q")?.trim().toLowerCase();
	let fs = c.datos.features;
	if (bbox?.length === 4 && bbox.every(Number.isFinite)) fs = fs.filter((f) => {
		const b = bboxDe(f.geometry);
		return b && b[0] <= bbox[2] && b[2] >= bbox[0] && b[1] <= bbox[3] && b[3] >= bbox[1];
	});
	if (q) fs = fs.filter((f) => Object.values(f.properties ?? {}).some((v) => String(v ?? "").toLowerCase().includes(q)));
	const pagina = fs.slice(desde, desde + limite);
	const propia = (o) => {
		const u = new URL(`${base}/collections/${c.id}/items`);
		url.searchParams.forEach((v, k) => u.searchParams.set(k, v));
		u.searchParams.set("offset", String(o));
		u.searchParams.set("limit", String(limite));
		return u.toString();
	};
	return json({
		type: "FeatureCollection",
		features: pagina.map(conId),
		numberMatched: fs.length,
		numberReturned: pagina.length,
		timeStamp: (/* @__PURE__ */ new Date()).toISOString(),
		links: [enlace(propia(desde), "self", "application/geo+json"), ...desde + limite < fs.length ? [enlace(propia(desde + limite), "next", "application/geo+json")] : []]
	}, 200, "application/geo+json");
}
var leerCambios = (p) => leer(`cambios/${p}.json`, []);
/** Aplica un cambio aprobado a la copia publicada, para que QGIS y ArcGIS vean la versión vigente. */
function aplicar(p, c) {
	const col = p.colecciones.find((x) => x.id === c.coleccion);
	if (!col) return;
	const i = col.datos.features.findIndex((f) => String(f.properties?.fid) === c.fid);
	const nueva = {
		type: "Feature",
		geometry: c.geometria,
		properties: {
			...i >= 0 ? col.datos.features[i].properties : {},
			...c.propiedades,
			fid: c.fid
		}
	};
	if (i >= 0) col.datos.features[i] = nueva;
	else col.datos.features.push(nueva);
	if (c.coleccion === "predios") {
		const sp = p.colecciones.find((x) => x.id === "predios-sin-poligono");
		if (sp) sp.datos.features = sp.datos.features.filter((f) => String(f.properties?.fid) !== c.fid);
	}
}
/** Zip de la carpeta del plugin; `extra` agrega archivos sueltos (el cliente compartido con ArcGIS). */
async function zipCarpeta(carpeta, nombre, extra = []) {
	const zip = new JSZip();
	for (const e of extra) zip.file(`${nombre}/${path.basename(e)}`, await readFile(e));
	const agregar = async (dir, dentro) => {
		for (const e of await readdir(dir, { withFileTypes: true })) {
			if (e.name === "__pycache__" || e.name.startsWith(".")) continue;
			const ruta = path.join(dir, e.name);
			if (e.isDirectory()) await agregar(ruta, `${dentro}/${e.name}`);
			else zip.file(`${dentro}/${e.name}`, await readFile(ruta));
		}
	};
	await agregar(carpeta, nombre);
	return zip.generateAsync({
		type: "uint8array",
		compression: "DEFLATE"
	});
}
var archivo = (datos, tipo, nombre, disposicion = "attachment") => respuesta(datos, 200, {
	"content-type": tipo,
	"content-disposition": `${disposicion}; filename="${nombre}"`
});
var cuerpo = async (req) => {
	try {
		return await req.json();
	} catch {
		return {};
	}
};
var texto = (v, max = 500) => String(v ?? "").trim().slice(0, max);
var idNuevo = (pre) => `${pre}-${Date.now().toString(36)}${randomBytes(3).toString("hex")}`;
/** Atiende `/api/gis/{ruta}`. */
async function atender(req, ruta) {
	try {
		return await despachar(req, ruta);
	} catch (e) {
		console.error("[gis]", e);
		return error(500, "Error del servicio GIS.");
	}
}
async function despachar(req, ruta) {
	let partes = ruta.split("/").filter(Boolean).map(decodeURIComponent);
	const metodo = req.method.toUpperCase();
	const url = new URL(req.url);
	const raiz = `${url.origin}${url.pathname.slice(0, url.pathname.length - ruta.length).replace(/\/$/, "")}`;
	let tokenRuta;
	let prefijo = raiz;
	if (partes[0] === "k" && partes[1]) {
		tokenRuta = partes[1];
		prefijo = `${raiz}/k/${encodeURIComponent(partes[1])}`;
		partes = partes.slice(2);
	}
	const [r0, r1, r2, r3, r4] = partes;
	if (!r0) return json({
		servicio: "PDGP · servicio GIS",
		version: "0.1 (prototipo)",
		ogcApiFeatures: `${prefijo}/ogc/{proyecto}`,
		documentacion: "docs/PLAN-GIS-INTEROPERABILIDAD.md"
	});
	if (r0 === "sesion" && metodo === "POST") {
		const b = await cuerpo(req);
		const usuario = texto(b.usuario, 120);
		const a = await accesoDe(usuario);
		if (!a || !a.activo || !claveValida(a, String(b.contrasena ?? ""))) {
			await anotar({
				usuario,
				accion: "ingreso_fallido",
				detalle: `Cliente ${texto(b.cliente, 40) || "GIS"}`
			});
			return error(401, "Usuario o contraseña incorrectos, o el acceso GIS no está activo.");
		}
		const s = await crearSesion(a.usuario);
		await anotar({
			usuario: a.usuario,
			accion: "ingreso",
			detalle: `Cliente ${texto(b.cliente, 40) || "GIS"}`
		});
		return json({
			...s,
			usuario: publico(a)
		});
	}
	if (r0 === "yo") {
		const a = await quien(req, tokenRuta);
		return a ? json(publico(a)) : SIN_SESION();
	}
	if (r0 === "accesos") {
		if (!esWeb(req)) return error(403, "Solo la plataforma web administra los accesos.");
		if (metodo === "GET") return json((await accesos()).map(publico));
		if (metodo === "POST") {
			const b = await cuerpo(req);
			const antes = await accesos();
			const nuevos = (Array.isArray(b.accesos) ? b.accesos : []).map((a) => {
				const previo = antes.find((x) => mismoUsuario(x.usuario, a.usuario));
				const guardado = {
					usuario: texto(a.usuario, 120),
					nombre: texto(a.nombre, 120),
					rol: texto(a.rol, 40),
					rolNombre: texto(a.rolNombre, 80),
					proyectos: a.proyectos === "*" ? "*" : (a.proyectos ?? []).filter(seguro),
					descargar: !!a.descargar,
					actualizar: !!a.actualizar,
					activo: !!a.activo,
					sal: previo?.sal,
					hash: previo?.hash
				};
				if (a.contrasena) {
					guardado.sal = randomBytes(16).toString("hex");
					guardado.hash = hashDe(a.contrasena, guardado.sal);
				}
				return guardado;
			});
			await escribir("accesos.json", nuevos);
			await anotar({
				usuario: texto(b.por, 120) || "web",
				accion: "accesos",
				detalle: `Sincronizó ${nuevos.length} accesos GIS (${nuevos.filter((a) => a.activo).length} activos)`
			});
			return json(nuevos.map(publico));
		}
	}
	if (r0 === "actividad" && metodo === "GET") {
		if (!esWeb(req)) return error(403, "Solo la plataforma web consulta la actividad.");
		const p = url.searchParams.get("proyecto");
		return json((await leer("actividad.json", [])).filter((a) => !p || a.proyecto === p).slice(0, 300));
	}
	if (r0 === "plugin" && metodo === "GET") {
		if (r1 === "qgis.zip") return archivo(await zipCarpeta(path.join(RAIZ, "plugins", "qgis-pdgp", "pdgp"), "pdgp"), "application/zip", "pdgp-qgis.zip");
		if (r1 === "arcgis.zip") return archivo(await zipCarpeta(path.join(RAIZ, "plugins", "arcgis-pdgp"), "pdgp-arcgis", [path.join(RAIZ, "plugins", "qgis-pdgp", "pdgp", "cliente.py")]), "application/zip", "pdgp-arcgis.zip");
		return error(404, "Plugin no encontrado.");
	}
	const web = esWeb(req);
	const a = web ? null : await quien(req, tokenRuta);
	if (r0 === "proyectos" && r1 && r2 === "publicar" && metodo === "POST") {
		if (!web) return error(403, "Solo la plataforma web publica proyectos.");
		if (!seguro(r1)) return error(400, "Proyecto inválido.");
		const p = await cuerpo(req);
		if (p.id !== r1 || !Array.isArray(p.colecciones)) return error(400, "Publicación incompleta.");
		await escribir(`proyectos/${r1}.json`, p);
		const n = p.colecciones.reduce((s, c) => s + c.datos.features.length, 0);
		await anotar({
			usuario: p.publicadoPor,
			proyecto: r1,
			accion: "publicacion",
			detalle: `Publicó ${p.colecciones.length} capas (${n} entidades)`
		});
		return json(resumen(p));
	}
	if (r0 === "ogc" && r1) {
		if (!a && !web) return SIN_SESION();
		if (a && !a.descargar) return SIN_PERMISO("Descargar proyecto");
		if (a && !permitido(a, r1)) return error(403, "Su usuario no tiene acceso a este proyecto.");
		const p = await leerProyecto(r1);
		if (!p) return error(404, "El proyecto no está publicado en el servicio GIS.");
		if (a && partes.length === 2) await anotar({
			usuario: a.usuario,
			proyecto: r1,
			accion: "lectura",
			detalle: "Conexión OGC API Features"
		});
		return ogc(req, p, partes.slice(2), `${prefijo}/ogc/${r1}`);
	}
	if (r0 !== "proyectos") return error(404, "Recurso no encontrado.");
	if (!a && !web) return SIN_SESION();
	if (a && !a.descargar) return SIN_PERMISO("Descargar proyecto");
	if (!r1) {
		const ps = (await publicados()).filter((p) => !a || permitido(a, p.id));
		return json((await Promise.all(ps.map(async (p) => resumen(p, (await leerCambios(p.id)).filter((c) => c.estado === "EN_REVISION").length)))).sort((x, y) => x.nombre.localeCompare(y.nombre, "es")));
	}
	if (!seguro(r1)) return error(400, "Proyecto inválido.");
	if (a && !permitido(a, r1)) return error(403, "Su usuario no tiene acceso a este proyecto.");
	const p = await leerProyecto(r1);
	if (!p && web && !r2 && metodo === "GET") return json(null);
	if (!p) return error(404, "El proyecto no está publicado en el servicio GIS.");
	if (!r2 && metodo === "GET") return json(resumen(p, (await leerCambios(r1)).filter((c) => c.estado === "EN_REVISION").length));
	if (r2 === "paquete" && metodo === "GET") {
		const usuario = a?.usuario ?? "web";
		const zip = await armarPaquete(p, {
			servicio: `${prefijo}/ogc/${r1}`,
			usuario
		});
		await anotar({
			usuario,
			proyecto: r1,
			accion: "descarga",
			detalle: "Paquete GIS (.zip)"
		});
		return archivo(zip, "application/zip", `pdgp-${r1}.zip`);
	}
	if (r2 === "cambios") {
		let lista = await leerCambios(r1);
		if (!r3 && metodo === "GET") {
			if (a) lista = lista.filter((c) => mismoUsuario(c.usuario, a.usuario));
			return json(lista.slice(0, 200));
		}
		if (!r3 && metodo === "POST") {
			if (!a) return SIN_SESION();
			if (!a.actualizar) return SIN_PERMISO("Actualizar GIS");
			const b = await cuerpo(req);
			const motivo = texto(b.motivo, 1e3);
			if (!motivo) return error(400, "Escriba el motivo del cambio.");
			const entrantes = Array.isArray(b.cambios) ? b.cambios : [];
			if (!entrantes.length) return error(400, "No hay cambios que enviar.");
			let adjunto;
			const adj = b.adjunto;
			if (adj?.nombre && adj.base64) {
				const id = idNuevo("adj");
				await escribir(`adjuntos/${id}`, Buffer.from(adj.base64, "base64"));
				adjunto = {
					id,
					nombre: texto(adj.nombre, 120)
				};
			}
			const nuevos = [];
			for (const e of entrantes) {
				const col = p.colecciones.find((c) => c.id === e.coleccion);
				if (!col?.editable) return error(400, `La capa «${texto(e.coleccion, 80)}» no admite cambios desde el escritorio.`);
				const geometria = e.geometria;
				if (!geometria || !("type" in geometria)) return error(400, "Falta la geometría del cambio.");
				const fid = texto(e.fid, 120);
				if (!fid) return error(400, "Cada entidad necesita su identificador (fid o código de predio).");
				const previa = col.datos.features.find((f) => String(f.properties?.fid) === fid) ?? (col.id === "predios" ? p.colecciones.find((c) => c.id === "predios-sin-poligono")?.datos.features.find((f) => String(f.properties?.fid) === fid) : void 0);
				if (col.id === "predios" && !previa) return error(400, `El predio «${fid}» no existe en el proyecto: regístrelo primero en la web.`);
				const enColeccion = col.datos.features.some((f) => String(f.properties?.fid) === fid);
				nuevos.push({
					id: idNuevo("cam"),
					proyecto: r1,
					coleccion: col.id,
					fid,
					tipo: enColeccion ? "MODIFICADO" : "NUEVO",
					geometria,
					anterior: previa?.geometry ?? null,
					propiedades: e.propiedades ?? {},
					areaAnterior: areaM2(previa?.geometry ?? null),
					areaNueva: areaM2(geometria),
					motivo,
					adjunto,
					usuario: a.usuario,
					nombreUsuario: a.nombre,
					rol: a.rolNombre,
					cliente: texto(b.cliente, 40) || "GIS",
					enviadoEl: (/* @__PURE__ */ new Date()).toISOString(),
					estado: "EN_REVISION"
				});
			}
			await escribir(`cambios/${r1}.json`, [...nuevos, ...lista]);
			await anotar({
				usuario: a.usuario,
				proyecto: r1,
				accion: "envio_cambios",
				detalle: `${nuevos.length} ${nuevos.length === 1 ? "cambio" : "cambios"} a revisión: ${[...new Set(nuevos.map((n) => n.fid))].slice(0, 5).join(", ")}`
			});
			return json(nuevos, 201);
		}
		const c = lista.find((x) => x.id === r3);
		if (!c) return error(404, "Cambio no encontrado.");
		if (r4 === "adjunto" && metodo === "GET" && c.adjunto) return archivo(await readFile(path.join(DIR, "adjuntos", c.adjunto.id)), "application/octet-stream", c.adjunto.nombre);
		if (r4 === "resolver" && metodo === "POST") {
			if (!web) return error(403, "Los cambios se aprueban u observan en la plataforma web.");
			if (c.estado !== "EN_REVISION") return error(409, "El cambio ya fue resuelto.");
			const b = await cuerpo(req);
			const estado = b.estado === "APROBADO" ? "APROBADO" : b.estado === "OBSERVADO" ? "OBSERVADO" : null;
			if (!estado) return error(400, "Estado inválido.");
			if (estado === "OBSERVADO" && !texto(b.observacion)) return error(400, "Escriba la observación.");
			Object.assign(c, {
				estado,
				resueltoPor: texto(b.por, 120) || "web",
				resueltoEl: (/* @__PURE__ */ new Date()).toISOString(),
				observacion: texto(b.observacion, 1e3) || void 0
			});
			if (estado === "APROBADO") {
				aplicar(p, c);
				await escribir(`proyectos/${r1}.json`, p);
			}
			await escribir(`cambios/${r1}.json`, lista);
			await anotar({
				usuario: c.resueltoPor,
				proyecto: r1,
				accion: estado === "APROBADO" ? "aprobacion" : "observacion",
				detalle: `${c.fid} (${c.coleccion}) enviado por ${c.nombreUsuario}${c.observacion ? `: ${c.observacion}` : ""}`
			});
			return json(c);
		}
	}
	if (r2 === "planos") {
		const indice = await leer(`planos/${r1}.json`, []);
		if (!r3 && metodo === "GET") {
			const codigo = url.searchParams.get("codigo");
			return json(indice.filter((x) => !codigo || x.codigo === codigo));
		}
		if (!r3 && metodo === "POST") {
			if (!a) return SIN_SESION();
			if (!a.actualizar) return SIN_PERMISO("Actualizar GIS");
			const b = await cuerpo(req);
			const codigo = texto(b.codigo, 80);
			const base64 = String(b.base64 ?? "");
			if (!codigo || !base64) return error(400, "Falta el código del predio o el PDF.");
			const bytes = Buffer.from(base64, "base64");
			if (bytes.subarray(0, 4).toString() !== "%PDF") return error(400, "El archivo no es un PDF.");
			const plano = {
				id: idNuevo("pla"),
				proyecto: r1,
				codigo,
				tipo: texto(b.tipo, 60) || "Plano perimétrico",
				nombreArchivo: texto(b.nombreArchivo, 120) || `${codigo}.pdf`,
				bytes: bytes.length,
				usuario: a.usuario,
				nombreUsuario: a.nombre,
				cliente: texto(b.cliente, 40) || "GIS",
				enviadoEl: (/* @__PURE__ */ new Date()).toISOString()
			};
			await escribir(`planos/${r1}/${plano.id}.pdf`, bytes);
			await escribir(`planos/${r1}.json`, [plano, ...indice]);
			await anotar({
				usuario: a.usuario,
				proyecto: r1,
				accion: "plano",
				detalle: `${plano.tipo} de ${codigo} subido al expediente`
			});
			return json(plano, 201);
		}
		const pl = indice.find((x) => x.id === r3);
		if (pl && r4 === "archivo" && metodo === "GET") return archivo(await readFile(path.join(DIR, "planos", r1, `${pl.id}.pdf`)), "application/pdf", pl.nombreArchivo, "inline");
		return error(404, "Plano no encontrado.");
	}
	return error(404, "Recurso no encontrado.");
}
//#endregion
export { atender };
