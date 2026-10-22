import { d as pmd_default, f as concesion_default, i as extension } from "./leer-CXNolRlj.js";
import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { E as ETAPA_CORTA, T as ETAPA_COLOR, a as prediosDelProyecto, b as leerRegistrados, f as prediosGeojson, l as muestraPadronBase, n as etapaDelPredio, w as ETAPAS_DE_AVANCE } from "./prediosProyecto-D1ASzaVD.js";
import { C as tienePoligonosPropios, _ as leerCapas, c as actualizarCapa, p as guardarDatosCapa, v as leerDatosCapa } from "./capas-B7cJ7zRJ.js";
import { n as armarPaquete, r as conFid } from "./gisPaquete-070Jklxg.js";
import { useSyncExternalStore } from "react";
//#region src/lib/gisProyecto.ts
var claveGeom = (p) => `pdgp-geom-predios-${p}`;
var VACIAS = {};
var cacheGeom = /* @__PURE__ */ new Map();
var oyentesGeom = /* @__PURE__ */ new Set();
function cargarGeom(p) {
	const c = cacheGeom.get(p);
	if (c) return c;
	let g = {};
	try {
		g = JSON.parse(localStorage.getItem(claveGeom(p)) ?? "{}");
	} catch {
		g = {};
	}
	cacheGeom.set(p, g);
	return g;
}
/** Polígonos de predios aprobados desde el escritorio: reemplazan al del padrón o al punto. */
function useGeometriasPredio(projectId) {
	return useSyncExternalStore((f) => {
		oyentesGeom.add(f);
		return () => {
			oyentesGeom.delete(f);
		};
	}, () => cargarGeom(projectId), () => VACIAS);
}
function guardarGeometriaPredio(projectId, codigo, g) {
	const nuevas = {
		...cargarGeom(projectId),
		[codigo]: g
	};
	cacheGeom.set(projectId, nuevas);
	try {
		localStorage.setItem(claveGeom(projectId), JSON.stringify(nuevas));
	} catch {}
	oyentesGeom.forEach((f) => f());
}
var codigoDe = (props, i) => String(props.codigopred ?? props.match_codigo_geojson ?? props["CODIGO DE PREDIO"] ?? `SIN-CODIGO-${i + 1}`);
/** Predios del padrón base con su etapa y los registrados como puntos (o con su polígono aprobado). */
function prediosPorEtapaDe(projectId, registrados, geometrias = cargarGeom(projectId)) {
	const base = muestraPadronBase(projectId) ? prediosGeojson.features.map((feature, index) => {
		const properties = feature.properties ?? {};
		const code = codigoDe(properties, index);
		return {
			...feature,
			geometry: geometrias[code] ?? feature.geometry,
			properties: {
				...properties,
				ETAPA_PREDIO: etapaDelPredio(code)?.etapa ?? 1
			}
		};
	}) : [];
	const registradosFs = registrados.filter((p) => p.estadoRegistro !== "BAJA").map((p) => {
		const lng = Number(p.lon.replace(",", "."));
		const lat = Number(p.lat.replace(",", "."));
		const geometry = geometrias[p.codigo] ?? (p.lon && p.lat && Number.isFinite(lng) && Number.isFinite(lat) ? {
			type: "Point",
			coordinates: [lng, lat]
		} : null);
		if (!geometry) return null;
		return {
			type: "Feature",
			properties: {
				codigopred: p.codigo,
				"SUJETO PASIVO": p.sujetoPasivo,
				ETAPA_PREDIO: etapaDelPredio(p.codigo)?.etapa ?? 1,
				REGISTRO: p.estadoRegistro
			},
			geometry
		};
	}).filter((f) => !!f);
	return {
		type: "FeatureCollection",
		features: [...base, ...registradosFs]
	};
}
var ESTILO_BASE = {
	relleno: "#2563eb",
	borde: "#1e293b",
	grosor: 1.5,
	opacidad: .35,
	tamanoPunto: 6,
	formaPunto: "CIRCULO",
	tipoLinea: "CONTINUA",
	etiqueta: ""
};
var POR_ETAPA = {
	campo: "etapa",
	valores: ETAPAS_DE_AVANCE.map((e) => ({
		valor: String(e),
		etiqueta: `${e} ${ETAPA_CORTA[e]}`,
		color: ETAPA_COLOR[e]
	}))
};
var geometriaGis = (g, fc) => {
	if (g === "PUNTO" || g === "LINEA" || g === "POLIGONO") return g;
	const t = fc?.features.find((f) => f.geometry)?.geometry?.type ?? "Polygon";
	return t.includes("Point") ? "PUNTO" : t.includes("Line") ? "LINEA" : "POLIGONO";
};
async function leerUrl(url) {
	return await (await fetch(url)).json();
}
/** Datos de una capa obligatoria: la capa aprobada que la cumple o los polígonos del sistema. */
async function obligatoria(capas, clave, url) {
	const capa = capas.find((c) => c.activa && c.obligatoria === clave && c.estado === "APROBADA");
	const datos = capa ? await leerDatosCapa(capa) : null;
	return datos ? {
		datos,
		capa
	} : { datos: await leerUrl(url) };
}
/** Las capas del proyecto como se publican: obligatorias, predios por etapa y capas aprobadas. */
async function proyectoGis(projectId, usuario) {
	const capas = leerCapas(projectId);
	const p = getProyecto(projectId);
	const deli = await obligatoria(capas, "DELIMITACION", pmd_default);
	const conc = await obligatoria(capas, "CONCESION", concesion_default);
	const colecciones = [{
		id: "delimitacion",
		titulo: "Delimitación del proyecto (PMD)",
		descripcion: deli.capa ? `Capa base «${deli.capa.nombre}» v${deli.capa.version}` : "Capa del sistema",
		geometria: "POLIGONO",
		estilo: {
			...ESTILO_BASE,
			relleno: "#000000",
			borde: "#000000",
			opacidad: 0,
			grosor: 3,
			tipoLinea: "DISCONTINUA"
		},
		editable: false,
		datos: conFid(deli.datos, (_, i) => String(i + 1))
	}, {
		id: "concesion",
		titulo: "Área de concesión",
		descripcion: conc.capa ? `Capa base «${conc.capa.nombre}» v${conc.capa.version}` : "Capa del sistema",
		geometria: "POLIGONO",
		estilo: {
			...ESTILO_BASE,
			relleno: "#dc2626",
			borde: "#dc2626",
			opacidad: 0,
			grosor: 2.5
		},
		editable: false,
		datos: conFid(conc.datos, (_, i) => String(i + 1))
	}];
	const info = new Map(prediosDelProyecto(projectId).map((x) => [x.codigo, x]));
	const vistos = /* @__PURE__ */ new Set();
	const poligonos = [];
	const puntos = [];
	prediosPorEtapaDe(projectId, leerRegistrados(projectId)).features.forEach((f, i) => {
		const codigo = codigoDe(f.properties ?? {}, i);
		if (vistos.has(codigo) || !f.geometry) return;
		vistos.add(codigo);
		const x = info.get(codigo);
		const props = {
			fid: codigo,
			codigo: x?.cod || codigo,
			sujeto_pasivo: x?.sujeto ?? String(f.properties?.["SUJETO PASIVO"] ?? ""),
			etapa: x?.etapa.etapa ?? 1,
			etapa_nombre: x?.etapa.corto ?? ETAPA_CORTA[1],
			paso: x?.etapa.nombrePaso ?? "",
			condicion: x?.condicion ?? "",
			modalidad: x?.modalidad ?? "",
			partida: x?.partida ?? "",
			area_m2: x?.area ?? "",
			expediente: x?.expediente ?? "",
			registro: x?.registro ?? "CODIFICADO",
			origen: x?.origenTexto ?? ""
		};
		(f.geometry.type.includes("Point") ? puntos : poligonos).push({
			type: "Feature",
			geometry: f.geometry,
			properties: props
		});
	});
	colecciones.push({
		id: "predios",
		titulo: "Predios por etapa",
		descripcion: "Generada por el sistema a medida que se registran los predios.",
		geometria: "POLIGONO",
		estilo: {
			...ESTILO_BASE,
			borde: "#1e293b",
			grosor: 1,
			opacidad: .55,
			etiqueta: "codigo",
			categorias: POR_ETAPA
		},
		editable: true,
		datos: {
			type: "FeatureCollection",
			features: poligonos
		}
	}, {
		id: "predios-sin-poligono",
		titulo: "Predios sin polígono (punto)",
		descripcion: "Predios registrados con su ubicación; dibuje el polígono en la capa Predios con el mismo código.",
		geometria: "PUNTO",
		estilo: {
			...ESTILO_BASE,
			borde: "#ffffff",
			opacidad: 1,
			tamanoPunto: 5,
			etiqueta: "codigo",
			categorias: POR_ETAPA
		},
		editable: false,
		datos: {
			type: "FeatureCollection",
			features: puntos
		}
	});
	for (const c of capas) {
		if (!c.activa || c.estado !== "APROBADA" || c.geometria === "RASTER" || c.obligatoria) continue;
		const datos = await leerDatosCapa(c);
		if (!datos) continue;
		colecciones.push({
			id: c.id,
			titulo: c.nombre,
			descripcion: `${c.categoria} · ${c.fuente} · v${c.version}`,
			geometria: geometriaGis(c.geometria, datos),
			estilo: c.estilo,
			editable: true,
			datos: conFid(datos, (_, i) => String(i))
		});
	}
	return {
		id: projectId,
		codigo: p?.codigo ?? projectId,
		nombre: p?.nombre ?? projectId,
		publicadoEl: (/* @__PURE__ */ new Date()).toLocaleString("es-PE"),
		publicadoPor: usuario,
		demostracion: !tienePoligonosPropios(projectId) && !deli.capa,
		colecciones
	};
}
var urlServicio = () => typeof location === "undefined" ? "/api/gis" : `${location.origin}/api/gis`;
/** Para QGIS y ArcGIS en Windows, localhost prueba primero IPv6 y espera: se muestra 127.0.0.1. */
var urlOgc = (projectId) => `${urlServicio()}/ogc/${projectId}`.replace("//localhost", "//127.0.0.1");
var ErrorGis = class extends Error {};
async function api(ruta, init = {}) {
	let r;
	try {
		r = await fetch(`${urlServicio()}/${ruta}`, {
			...init,
			headers: {
				"content-type": "application/json",
				"x-pdgp-web": "1",
				...init.headers ?? {}
			}
		});
	} catch {
		throw new ErrorGis("No hay conexión con el servicio GIS.");
	}
	if (!(r.headers.get("content-type") ?? "").includes("json")) throw new ErrorGis("El servicio GIS no está disponible en este despliegue (la versión estática no tiene servidor).");
	const datos = await r.json();
	if (!r.ok) throw new ErrorGis(datos?.error ?? `Error ${r.status} del servicio GIS.`);
	return datos;
}
/** Estado publicado del proyecto, o null si nunca se publicó. */
async function estadoPublicacion(projectId) {
	return api(`proyectos/${projectId}`);
}
async function publicarProyecto(projectId, usuario) {
	const p = await proyectoGis(projectId, usuario);
	return api(`proyectos/${projectId}/publicar`, {
		method: "POST",
		body: JSON.stringify(p)
	});
}
/** Paquete armado en el navegador: no necesita servidor. */
async function descargarPaquete(projectId, usuario) {
	const p = await proyectoGis(projectId, usuario);
	const zip = await armarPaquete(p, {
		servicio: urlOgc(projectId),
		usuario
	});
	const url = URL.createObjectURL(new Blob([zip], { type: "application/zip" }));
	const a = document.createElement("a");
	a.href = url;
	a.download = `pdgp-${projectId}.zip`;
	a.click();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
	return p;
}
var leerCambios = (projectId) => api(`proyectos/${projectId}/cambios`);
var leerPlanos = (projectId, codigo) => api(`proyectos/${projectId}/planos${codigo ? `?codigo=${encodeURIComponent(codigo)}` : ""}`);
var urlPlano = (pl) => `${urlServicio()}/proyectos/${pl.proyecto}/planos/${pl.id}/archivo`;
var urlAdjunto = (c) => `${urlServicio()}/proyectos/${c.proyecto}/cambios/${c.id}/adjunto`;
var leerActividad = (projectId) => api(`actividad${projectId ? `?proyecto=${projectId}` : ""}`);
var leerAccesos = () => api("accesos");
var sincronizarAccesos = (accesos, por) => api("accesos", {
	method: "POST",
	body: JSON.stringify({
		accesos,
		por
	})
});
/**
* Aprueba u observa un cambio. Aprobado, se aplica primero aquí (polígono del predio o nueva versión
* de la capa) y luego en la copia publicada, para que la web y QGIS muestren lo mismo.
*/
async function resolverCambio(c, estado, por, observacion = "") {
	if (estado === "APROBADO") if (c.coleccion === "predios") guardarGeometriaPredio(c.proyecto, c.fid, c.geometria);
	else {
		const capa = leerCapas(c.proyecto).find((x) => x.id === c.coleccion);
		if (!capa) throw new ErrorGis("La capa del cambio ya no existe en la base gráfica.");
		const datos = conFid(await leerDatosCapa(capa) ?? {
			type: "FeatureCollection",
			features: []
		}, (_, i) => String(i));
		const i = datos.features.findIndex((f) => String(f.properties.fid) === c.fid);
		const nueva = {
			type: "Feature",
			geometry: c.geometria,
			properties: {
				...i >= 0 ? datos.features[i].properties : {},
				...c.propiedades,
				fid: c.fid
			}
		};
		if (i >= 0) datos.features[i] = nueva;
		else datos.features.push(nueva);
		const version = capa.version + 1;
		await guardarDatosCapa(capa.id, version, datos);
		actualizarCapa(c.proyecto, capa.id, {
			version,
			entidades: datos.features.length,
			extension: extension(datos)
		}, `Aprobó cambio desde ${c.cliente} (${c.fid}) enviado por ${c.nombreUsuario}`, c.motivo);
	}
	return api(`proyectos/${c.proyecto}/cambios/${c.id}/resolver`, {
		method: "POST",
		body: JSON.stringify({
			estado,
			por,
			observacion
		})
	});
}
function usuarioWeb() {
	try {
		return localStorage.getItem("mtc-session") || "usuario sin sesión";
	} catch {
		return "usuario sin sesión";
	}
}
//#endregion
export { useGeometriasPredio as _, leerActividad as a, prediosPorEtapaDe as c, resolverCambio as d, sincronizarAccesos as f, urlServicio as g, urlPlano as h, leerAccesos as i, proyectoGis as l, urlOgc as m, descargarPaquete as n, leerCambios as o, urlAdjunto as p, estadoPublicacion as r, leerPlanos as s, codigoDe as t, publicarProyecto as u, usuarioWeb as v };
