import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { a as formatoDeNombre, c as leerUrl, d as pmd_default, f as concesion_default, i as extension, l as pareceProyectado, o as geometriaDe, r as camposDe, s as leerArchivo, t as CRS, u as reproyectar } from "./leer-CXNolRlj.js";
import { f as prediosGeojson } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { S as siguienteOrdenCapa, T as validarCapa, _ as leerCapas, a as NOMBRE_CLASE, c as actualizarCapa, d as estiloInicial, f as guardarCapas, g as idCapa, h as guardarOriginal, i as DETALLE_CLASE, p as guardarDatosCapa, r as CATEGORIAS_CAPA, s as NOMBRE_GEOMETRIA, t as CAPAS_OBLIGATORIAS } from "./capas-B7cJ7zRJ.js";
import { E as Modal } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { n as Subtitulo } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { useMemo, useState } from "react";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Upload } from "lucide-react";
//#region src/lib/geo/servicios.ts
var NOMBRE_SERVICIO = {
	WMS: "WMS",
	WMTS: "WMTS",
	XYZ: "Teselas XYZ",
	WFS: "WFS",
	OGC_API: "OGC API Features",
	ARCGIS_FEATURE: "ArcGIS REST (FeatureServer)",
	ARCGIS_MAP: "ArcGIS REST (MapServer)"
};
var esRaster = (t) => t === "WMS" || t === "WMTS" || t === "XYZ" || t === "ARCGIS_MAP";
/** Tipo de servicio por la forma de la URL; null si no se reconoce. */
function detectarServicio(url) {
	const u = url.toLowerCase();
	if (/\{z\}/.test(u) && /\{x\}/.test(u) && /\{y\}/.test(u)) return "XYZ";
	if (u.includes("/featureserver")) return "ARCGIS_FEATURE";
	if (u.includes("/mapserver")) return "ARCGIS_MAP";
	if (/[?&]service=wmts/.test(u) || u.includes("/wmts")) return "WMTS";
	if (/[?&]service=wfs/.test(u) || u.includes("/wfs")) return "WFS";
	if (/[?&]service=wms/.test(u) || u.includes("/wms")) return "WMS";
	if (u.includes("/collections")) return "OGC_API";
	return null;
}
/** URL sin los parámetros OGC que se van a escribir (se conservan los propios del servidor). */
function base(url, quitar) {
	const u = new URL(url);
	for (const k of [...u.searchParams.keys()]) if (quitar.includes(k.toLowerCase())) u.searchParams.delete(k);
	return u.toString() + (u.search ? "&" : "?");
}
var OGC = [
	"service",
	"request",
	"version",
	"layers",
	"layer",
	"typename",
	"typenames",
	"bbox",
	"srs",
	"crs",
	"width",
	"height",
	"format",
	"transparent",
	"styles",
	"style",
	"outputformat",
	"srsname",
	"maxfeatures",
	"count",
	"tilematrixset",
	"tilematrix",
	"tilerow",
	"tilecol"
];
/** Raíz de un servicio ArcGIS: hasta /FeatureServer o /MapServer, sin el número de capa. */
var raizArcgis = (url) => url.replace(/(\/(FeatureServer|MapServer))(\/.*)?(\?.*)?$/i, "$1");
/** Raíz de una OGC API: lo que va antes de /collections. */
var raizOgc = (url) => url.split("?")[0].replace(/\/collections(\/.*)?$/i, "").replace(/\/$/, "");
/** URL de teselas para una fuente ráster de MapLibre. */
function plantillaRaster(url, tipo, capa) {
	switch (tipo) {
		case "XYZ": return url;
		case "WMS": return base(url, OGC) + `SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=${encodeURIComponent(capa?.id ?? "")}&STYLES=&BBOX={bbox-epsg-3857}&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&FORMAT=image/png&TRANSPARENT=true`;
		case "WMTS":
			if (capa?.plantilla) return capa.plantilla;
			return base(url, OGC) + `SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${encodeURIComponent(capa?.id ?? "")}&STYLE=default&TILEMATRIXSET=${encodeURIComponent(capa?.matriz ?? "GoogleMapsCompatible")}&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png`;
		case "ARCGIS_MAP": return `${raizArcgis(url)}/export?bbox={bbox-epsg-3857}&bboxSR=3857&imageSR=3857&size=256,256&format=png32&transparent=true&f=image${capa?.id ? `&layers=show:${capa.id}` : ""}`;
		default: throw new Error(`${NOMBRE_SERVICIO[tipo]} es un servicio vectorial: se descarga, no se tesela.`);
	}
}
async function pedir(url) {
	let r;
	try {
		r = await fetch(url);
	} catch {
		throw new Error("No se pudo conectar: el servidor no responde o no permite pedidos desde páginas web (CORS).");
	}
	if (!r.ok) throw new Error(`El servidor respondió ${r.status} ${r.statusText}.`);
	return r;
}
async function pedirXml(url) {
	const texto = await (await pedir(url)).text();
	const doc = new DOMParser().parseFromString(texto, "text/xml");
	if (doc.getElementsByTagName("parsererror").length) throw new Error("La respuesta no es un documento de capacidades válido (XML).");
	const excepcion = todos(doc, "ServiceException")[0] ?? todos(doc, "ExceptionText")[0];
	if (excepcion) throw new Error(`El servicio respondió con un error: ${excepcion.textContent?.trim()}`);
	return doc;
}
async function pedirJson(url) {
	const r = await pedir(url);
	let d;
	try {
		d = await r.json();
	} catch {
		throw new Error("La respuesta del servicio no es JSON.");
	}
	if (d?.error) throw new Error(`El servicio respondió con un error: ${d.error.message ?? ""}`);
	return d;
}
var todos = (el, nombre) => Array.from(el.getElementsByTagNameNS("*", nombre));
var hijo = (el, nombre) => Array.from(el.children).find((c) => c.localName === nombre);
var texto = (el, nombre) => hijo(el, nombre)?.textContent?.trim() ?? "";
/** Capas que ofrece el servicio. */
async function capasDelServicio(url, tipo) {
	switch (tipo) {
		case "XYZ": return [{
			id: "",
			titulo: "Teselas"
		}];
		case "WMS": return todos(await pedirXml(`${base(url, OGC)}SERVICE=WMS&REQUEST=GetCapabilities`), "Layer").filter((l) => texto(l, "Name")).map((l) => ({
			id: texto(l, "Name"),
			titulo: texto(l, "Title") || texto(l, "Name")
		}));
		case "WMTS": {
			const contenidos = todos(await pedirXml(`${base(url, OGC)}SERVICE=WMTS&REQUEST=GetCapabilities&VERSION=1.0.0`), "Contents")[0];
			if (!contenidos) return [];
			return Array.from(contenidos.children).filter((l) => l.localName === "Layer").map((l) => {
				const id = texto(l, "Identifier");
				const matrices = todos(l, "TileMatrixSet").map((m) => m.textContent?.trim() ?? "");
				const matriz = matrices.find((m) => /3857|google|webmercator|900913/i.test(m)) ?? matrices[0] ?? "";
				const estilo = todos(l, "Style").find((s) => s.getAttribute("isDefault") === "true")?.getElementsByTagNameNS("*", "Identifier")[0]?.textContent?.trim() ?? "default";
				const plantilla = todos(l, "ResourceURL").find((r) => r.getAttribute("resourceType") === "tile")?.getAttribute("template")?.replace(/\{TileMatrixSet\}/gi, matriz).replace(/\{Style\}/gi, estilo).replace(/\{TileMatrix\}/gi, "{z}").replace(/\{TileRow\}/gi, "{y}").replace(/\{TileCol\}/gi, "{x}");
				return {
					id,
					titulo: texto(l, "Title") || id,
					plantilla,
					matriz
				};
			});
		}
		case "WFS": return todos(await pedirXml(`${base(url, OGC)}SERVICE=WFS&REQUEST=GetCapabilities`), "FeatureType").map((f) => ({
			id: texto(f, "Name"),
			titulo: texto(f, "Title") || texto(f, "Name")
		}));
		case "OGC_API": return ((await pedirJson(`${raizOgc(url)}/collections?f=json`)).collections ?? []).map((c) => ({
			id: c.id,
			titulo: c.title || c.id
		}));
		case "ARCGIS_FEATURE":
		case "ARCGIS_MAP": return ((await pedirJson(`${raizArcgis(url)}?f=json`)).layers ?? []).map((l) => ({
			id: String(l.id),
			titulo: l.name
		}));
	}
}
/** Descarga una capa vectorial como FeatureCollection en WGS 84 (hasta `limite` entidades). */
async function descargarVector(url, tipo, capa, limite = 5e3) {
	let pedido;
	if (tipo === "WFS") pedido = base(url, OGC) + `SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=${encodeURIComponent(capa)}&outputFormat=application/json&srsName=EPSG:4326&maxFeatures=${limite}`;
	else if (tipo === "OGC_API") pedido = `${raizOgc(url)}/collections/${encodeURIComponent(capa)}/items?f=json&limit=${limite}`;
	else if (tipo === "ARCGIS_FEATURE") pedido = `${raizArcgis(url)}/${capa}/query?where=1%3D1&outFields=*&outSR=4326&f=geojson&resultRecordCount=${limite}`;
	else throw new Error(`${NOMBRE_SERVICIO[tipo]} es un servicio ráster: no se descargan datos.`);
	const d = await pedirJson(pedido);
	if (d?.type !== "FeatureCollection" || !Array.isArray(d.features)) throw new Error("El servicio no devolvió GeoJSON (FeatureCollection).");
	const fc = {
		type: "FeatureCollection",
		features: d.features.filter((f) => f.geometry)
	};
	if (!fc.features.length) throw new Error("La capa del servicio no tiene entidades con geometría.");
	const avisos = [];
	const total = d.numberMatched;
	if (d.features.length >= limite || d.exceededTransferLimit || d.properties?.exceededTransferLimit || total !== void 0 && total > d.features.length) avisos.push(`Se descargaron ${d.features.length} entidades${total ? ` de ${total}` : ""}: el servicio tiene más. Filtre en el origen o use el servicio como ráster.`);
	return {
		fc,
		avisos
	};
}
//#endregion
//#region src/lib/geo/validar.ts
/**
* Controles automáticos de una capa antes de entrar a revisión (docs/PLAN-BASE-GRAFICA.md §5):
* coordenadas en rango, anillos cerrados, sin geometrías vacías, extensión que se cruza con la del
* proyecto y campos con nombre. Su resultado se guarda en la capa.
*/
var cerrado = (anillo) => anillo.length >= 4 && anillo[0][0] === anillo[anillo.length - 1][0] && anillo[0][1] === anillo[anillo.length - 1][1];
function controlesCapa(fc, extensionProyecto) {
	let fueraDeRango = 0;
	let abiertos = 0;
	let vacias = 0;
	for (const f of fc.features) {
		const g = f.geometry;
		if (!g || "coordinates" in g && !g.coordinates.length) {
			vacias++;
			continue;
		}
		if ((g.type === "Polygon" ? g.coordinates : g.type === "MultiPolygon" ? g.coordinates.flat() : []).some((a) => !cerrado(a))) abiertos++;
	}
	const ext = extension(fc);
	if (ext && (ext[0] < -180 || ext[2] > 180 || ext[1] < -90 || ext[3] > 90)) fueraDeRango = 1;
	const cruza = !extensionProyecto || !ext ? null : ext[0] <= extensionProyecto[2] && ext[2] >= extensionProyecto[0] && ext[1] <= extensionProyecto[3] && ext[3] >= extensionProyecto[1];
	const campos = camposDe(fc);
	return [
		{
			nombre: "Coordenadas en grados (WGS 84)",
			ok: !fueraDeRango,
			detalle: fueraDeRango ? "Hay coordenadas fuera de rango: elija el sistema de coordenadas de origen." : void 0
		},
		{
			nombre: "Geometrías con coordenadas",
			ok: vacias === 0,
			detalle: vacias ? `${vacias} entidad(es) sin coordenadas.` : void 0
		},
		{
			nombre: "Polígonos cerrados",
			ok: abiertos === 0,
			detalle: abiertos ? `${abiertos} polígono(s) con anillos sin cerrar.` : void 0
		},
		{
			nombre: "Dentro del ámbito del proyecto",
			ok: cruza !== false,
			detalle: cruza === null ? "El proyecto no tiene extensión de referencia: no se comparó." : cruza ? void 0 : "La capa no se cruza con la extensión de los predios del proyecto."
		},
		{
			nombre: "Atributos",
			ok: campos.length > 0,
			detalle: campos.length ? `${campos.length} campo(s).` : "Las entidades no tienen atributos."
		}
	];
}
//#endregion
//#region src/components/mapa/AnadirDatos.tsx
var OPCIONES_ANADIR = [
	{
		opcion: "ARCHIVO",
		nombre: "Archivo…",
		detalle: "GeoJSON, KML, KMZ, GPX, CSV con coordenadas o Shapefile comprimido"
	},
	{
		opcion: "URL",
		nombre: "Desde URL…",
		detalle: "Los mismos formatos por enlace directo"
	},
	{
		opcion: "SERVICIO",
		nombre: "Desde servicio…",
		detalle: "WMS, WMTS, teselas XYZ, WFS, OGC API Features o ArcGIS REST"
	},
	{
		opcion: "SISTEMA",
		nombre: "Del sistema…",
		detalle: "Padrón de predios, PMD, concesión y otras capas del proyecto"
	}
];
/** Monta el asistente solo mientras está abierto: al cerrar, su estado se descarta. */
function AnadirDatos(props) {
	if (!props.opcion) return null;
	return /* @__PURE__ */ jsx(Asistente, {
		...props,
		opcion: props.opcion
	}, `${props.opcion}-${props.reemplazar?.id ?? ""}`);
}
var SISTEMA = [
	{
		id: "pmd",
		nombre: "Delimitación del proyecto (PMD)",
		categoria: "Sector transporte"
	},
	{
		id: "concesion",
		nombre: "Área de concesión",
		categoria: "Sector transporte"
	},
	{
		id: "predios",
		nombre: "Predios (generados por el sistema)",
		categoria: "Catastro de predios"
	}
];
async function leerSistema(id) {
	if (id === "predios") return structuredClone(prediosGeojson);
	const r = await fetch(id === "pmd" ? pmd_default : concesion_default);
	if (!r.ok) throw new Error(`No se pudo leer la capa del sistema (${r.status}).`);
	return await r.json();
}
var WGS84 = CRS["EPSG:4326"].nombre;
var CRS_PROYECTADOS = Object.keys(CRS).filter((k) => k !== "EPSG:4326");
var ACEPTA = ".geojson,.json,.kml,.kmz,.gpx,.csv,.txt,.zip";
var VACIA = {
	type: "FeatureCollection",
	features: []
};
var sinExtension = (n) => n.replace(/\.[^.]+$/, "");
var abreviar = (n) => {
	const p = n.normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^A-Za-z0-9]+/).filter(Boolean);
	return (p.length > 1 ? p.map((x) => x[0]).join("") : p[0] ?? "").slice(0, 6).toUpperCase();
};
function Asistente({ projectId, opcion, onCerrar, onAgregada, extensionProyecto, reemplazar, obligatoria }) {
	const defObligatoria = CAPAS_OBLIGATORIAS.find((o) => o.clave === obligatoria);
	const [paso, setPaso] = useState(1);
	const [ocupado, setOcupado] = useState(false);
	const [error, setError] = useState("");
	const [archivo, setArchivo] = useState(null);
	const [url, setUrl] = useState("");
	const [nombreUrl, setNombreUrl] = useState("");
	const [tipoServ, setTipoServ] = useState("AUTO");
	const [capasServ, setCapasServ] = useState(null);
	const [capaServ, setCapaServ] = useState("");
	const [sistema, setSistema] = useState("predios");
	const [crsUtm, setCrsUtm] = useState("EPSG:32718");
	const [leido, setLeido] = useState(null);
	const [datos, setDatos] = useState({
		nombre: "",
		abrev: "",
		categoria: "Otras",
		descripcion: "",
		fuente: "",
		fechaDatos: "",
		responsable: "",
		confiabilidad: "MEDIA",
		clase: obligatoria ? "BASE" : "PROYECTO",
		obligatoria
	});
	const [estilo, setEstilo] = useState(estiloInicial("POLIGONO"));
	const [motivo, setMotivo] = useState("");
	const tipoDetectado = tipoServ === "AUTO" ? detectarServicio(url) : tipoServ;
	const proyectadoCsv = leido?.formato === "CSV" && leido.crsOriginal !== WGS84;
	const enMetros = Boolean(leido && !leido.raster && pareceProyectado(leido.fc));
	const fc = useMemo(() => {
		if (!leido) return VACIA;
		return enMetros ? reproyectar(leido.fc, crsUtm) : leido.fc;
	}, [
		leido,
		enMetros,
		crsUtm
	]);
	const crsFinal = enMetros ? CRS[crsUtm].nombre : leido?.crsOriginal ?? "";
	const geometria = leido?.raster ? "RASTER" : geometriaDe(fc);
	const campos = useMemo(() => camposDe(fc), [fc]);
	const ext = useMemo(() => leido?.raster ? null : extension(fc), [fc, leido]);
	const controles = useMemo(() => leido?.raster ? [{
		nombre: "Servicio conectado",
		ok: true,
		detalle: leido.origen.servicio?.plantilla
	}] : controlesCapa(fc, extensionProyecto), [
		fc,
		leido,
		extensionProyecto
	]);
	async function ejecutar(f) {
		setError("");
		setOcupado(true);
		try {
			await f();
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		} finally {
			setOcupado(false);
		}
	}
	function aVistaPrevia(l) {
		setLeido(l);
		setDatos((d) => ({
			...d,
			nombre: reemplazar?.nombre ?? defObligatoria?.nombre ?? l.nombre,
			abrev: reemplazar?.abrev ?? abreviar(defObligatoria?.nombre ?? l.nombre),
			categoria: reemplazar?.categoria ?? defObligatoria?.categoria ?? l.categoria ?? d.categoria
		}));
		const g = l.raster ? "RASTER" : geometriaDe(l.fc);
		setEstilo(reemplazar?.estilo ?? estiloInicial(g, leerCapas(projectId).length));
		setPaso(2);
	}
	const leerOrigen = (crs = crsUtm) => ejecutar(async () => {
		if (opcion === "ARCHIVO") {
			if (!archivo) throw new Error("Elija un archivo.");
			const l = await leerArchivo(archivo, archivo.name, { crsUtm: crs });
			aVistaPrevia({
				...l,
				origen: {
					tipo: "ARCHIVO",
					formato: l.formato,
					nombreArchivo: archivo.name
				},
				nombre: sinExtension(archivo.name),
				original: archivo
			});
		} else if (opcion === "URL") {
			if (!/^https?:\/\//i.test(url.trim())) throw new Error("Ingrese una dirección que empiece con http:// o https://.");
			const l = await leerUrl(url.trim(), { crsUtm: crs });
			const deUrl = decodeURIComponent(new URL(url.trim()).pathname.split("/").pop() || "");
			aVistaPrevia({
				...l,
				origen: {
					tipo: "URL",
					formato: l.formato,
					url: url.trim()
				},
				nombre: nombreUrl.trim() || sinExtension(deUrl) || "Capa desde URL"
			});
		} else if (opcion === "SERVICIO") {
			if (!tipoDetectado) throw new Error("Elija el tipo de servicio.");
			const capa = capasServ?.find((c) => c.id === capaServ);
			if (!capa) throw new Error("Conecte el servicio y elija una capa.");
			const u = url.trim();
			const servicio = {
				tipo: tipoDetectado,
				capa: capa.id || void 0
			};
			if (esRaster(tipoDetectado)) {
				const plantilla = plantillaRaster(u, tipoDetectado, capa);
				aVistaPrevia({
					fc: VACIA,
					formato: NOMBRE_SERVICIO[tipoDetectado],
					crsOriginal: "Web Mercator (EPSG:3857)",
					avisos: [],
					origen: {
						tipo: "SERVICIO",
						formato: NOMBRE_SERVICIO[tipoDetectado],
						url: u,
						servicio: {
							...servicio,
							plantilla
						}
					},
					nombre: capa.titulo,
					raster: true
				});
			} else {
				const { fc: datosServ, avisos } = await descargarVector(u, tipoDetectado, capa.id);
				aVistaPrevia({
					fc: datosServ,
					formato: NOMBRE_SERVICIO[tipoDetectado],
					crsOriginal: WGS84,
					avisos,
					origen: {
						tipo: "SERVICIO",
						formato: NOMBRE_SERVICIO[tipoDetectado],
						url: u,
						servicio
					},
					nombre: capa.titulo
				});
			}
		} else {
			const s = SISTEMA.find((x) => x.id === sistema);
			aVistaPrevia({
				fc: await leerSistema(s.id),
				formato: "GeoJSON",
				crsOriginal: WGS84,
				avisos: ["Copia de solo lectura de la capa del sistema en este momento."],
				origen: {
					tipo: "SISTEMA",
					formato: "GeoJSON",
					sistema: s.id
				},
				nombre: s.nombre,
				categoria: s.categoria
			});
		}
	});
	const conectar = () => ejecutar(async () => {
		if (!/^https?:\/\//i.test(url.trim())) throw new Error("Ingrese una dirección que empiece con http:// o https://.");
		if (!tipoDetectado) throw new Error("No se reconoció el tipo de servicio por la dirección: elíjalo en Tipo.");
		setCapasServ(null);
		const lista = await capasDelServicio(url.trim(), tipoDetectado);
		if (!lista.length) throw new Error("El servicio no publica capas.");
		setCapasServ(lista);
		setCapaServ(lista[0].id);
	});
	function cambiarCrs(crs) {
		setCrsUtm(crs);
		if (proyectadoCsv) leerOrigen(crs);
	}
	const guardar = () => ejecutar(async () => {
		if (!leido) return;
		const comunes = {
			geometria,
			origen: leido.origen,
			crsOriginal: crsFinal,
			entidades: fc.features.length,
			extension: ext,
			campos,
			controles,
			estado: "BORRADOR"
		};
		if (reemplazar) {
			if (!motivo.trim()) throw new Error("Indique el motivo del reemplazo.");
			const version = reemplazar.version + 1;
			if (!leido.raster) await guardarDatosCapa(reemplazar.id, version, fc);
			if (leido.original) await guardarOriginal(reemplazar.id, version, leido.original);
			const cambios = {
				...comunes,
				version,
				revisadoPor: ""
			};
			actualizarCapa(projectId, reemplazar.id, cambios, "Reemplazó datos", motivo.trim());
			onAgregada({
				...reemplazar,
				...cambios
			});
			return;
		}
		const capas = leerCapas(projectId);
		const id = idCapa();
		const problema = validarCapa(capas, {
			id,
			nombre: datos.nombre,
			abrev: datos.abrev
		});
		if (problema) throw new Error(problema);
		if (!leido.raster) await guardarDatosCapa(id, 1, fc);
		if (leido.original) await guardarOriginal(id, 1, leido.original);
		const capa = {
			id,
			proyecto: projectId,
			...datos,
			nombre: datos.nombre.trim(),
			abrev: datos.abrev.trim().toUpperCase(),
			...comunes,
			estilo,
			observaciones: "",
			revisadoPor: "",
			publicar: false,
			version: 1,
			orden: siguienteOrdenCapa(capas),
			visible: true,
			activa: true,
			creadoEl: (/* @__PURE__ */ new Date()).toISOString()
		};
		guardarCapas(projectId, [...capas, capa], "Agregó capa", capa.nombre);
		onAgregada(capa);
	});
	const pasos = (reemplazar ? [
		"Origen",
		"Vista previa",
		"Confirmar"
	] : [
		"Origen",
		"Vista previa",
		"Datos y estilo"
	]).map((nombre, i) => ({
		nombre,
		estado: i + 1 < paso ? "completado" : i + 1 === paso ? "actual" : "pendiente"
	}));
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		titulo: reemplazar ? `Reemplazar datos de «${reemplazar.nombre}»` : `Añadir datos: ${OPCIONES_ANADIR.find((o) => o.opcion === opcion).nombre.replace("…", "").toLowerCase()}`,
		ancho: "lg",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: onCerrar,
				disabled: ocupado,
				children: "Cancelar"
			}),
			paso > 1 && /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: () => setPaso((p) => p - 1),
				disabled: ocupado,
				children: "Volver"
			}),
			paso === 1 && /* @__PURE__ */ jsx(Button, {
				onClick: () => void leerOrigen(),
				disabled: ocupado,
				children: ocupado ? "Leyendo…" : opcion === "SERVICIO" && capasServ?.find((c) => c.id === capaServ) ? tipoDetectado && esRaster(tipoDetectado) ? "Usar capa" : "Descargar capa" : "Leer datos"
			}),
			paso === 2 && /* @__PURE__ */ jsx(Button, {
				onClick: () => {
					setError("");
					setPaso(3);
				},
				disabled: ocupado,
				children: "Continuar"
			}),
			paso === 3 && /* @__PURE__ */ jsx(Button, {
				onClick: () => void guardar(),
				disabled: ocupado,
				children: ocupado ? "Guardando…" : reemplazar ? "Reemplazar datos" : "Agregar capa"
			})
		] }),
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mb-4",
				children: /* @__PURE__ */ jsx(Stepper, { pasos })
			}),
			error && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				onCerrar: () => setError(""),
				children: error
			}),
			paso === 1 && /* @__PURE__ */ jsx(PasoOrigen, {
				opcion,
				archivo,
				onArchivo: (f) => {
					setError("");
					if (f && f.size > 52428800) setError("El archivo supera los 50 MB permitidos.");
					else if (f && !formatoDeNombre(f.name)) setError("Formato no soportado. Use GeoJSON, KML, KMZ, GPX, CSV o Shapefile comprimido (.zip).");
					else setArchivo(f);
				},
				url,
				onUrl: (u) => {
					setUrl(u);
					setCapasServ(null);
				},
				nombreUrl,
				onNombreUrl: setNombreUrl,
				tipoServ,
				onTipoServ: (t) => {
					setTipoServ(t);
					setCapasServ(null);
				},
				tipoDetectado,
				capasServ,
				capaServ,
				onCapaServ: setCapaServ,
				onConectar: () => void conectar(),
				sistema,
				onSistema: setSistema,
				ocupado
			}),
			paso === 2 && leido && /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx(Resumen, { filas: [
						["Formato", leido.formato],
						["Entidades", leido.raster ? "No aplica (teselas)" : fc.features.length.toLocaleString("es-PE")],
						["Geometría", NOMBRE_GEOMETRIA[geometria]],
						["Sistema de coordenadas", crsFinal]
					] }),
					(enMetros || proyectadoCsv) && /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Sistema de origen",
						ayuda: "Las coordenadas están en metros: elija en qué sistema vienen para pasarlas a WGS 84.",
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							value: crsUtm,
							onChange: (e) => cambiarCrs(e.target.value),
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							disabled: ocupado,
							children: CRS_PROYECTADOS.map((k) => /* @__PURE__ */ jsx("option", {
								value: k,
								children: CRS[k].nombre
							}, k))
						})
					}),
					leido.avisos.map((a) => /* @__PURE__ */ jsx(Aviso, {
						tipo: "aviso",
						children: a
					}, a)),
					leido.raster ? /* @__PURE__ */ jsx(Aviso, {
						tipo: "info",
						children: "Servicio ráster: el mapa pide las teselas al servidor; no se descargan datos."
					}) : /* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Subtitulo, { children: "Extensión" }),
							/* @__PURE__ */ jsx(Croquis, {
								fc,
								estilo,
								geometria
							}),
							ext && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs tabular-nums text-muted-foreground",
								children: ext.map((n) => n.toFixed(5)).join(" · ")
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Campos" }), /* @__PURE__ */ jsx(Tabla, {
							columnas: [{
								clave: "nombre",
								titulo: "Campo"
							}, {
								clave: "tipo",
								titulo: "Tipo"
							}],
							filas: campos,
							claveFila: (c) => c.nombre,
							vacio: "Las entidades no tienen atributos."
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Controles automáticos" }), /* @__PURE__ */ jsx("ul", {
						className: "space-y-1 text-sm",
						children: controles.map((c) => /* @__PURE__ */ jsxs("li", {
							className: "flex flex-wrap items-start gap-2",
							children: [
								/* @__PURE__ */ jsx(StatusBadge, {
									tono: c.ok ? "success" : "warning",
									children: c.ok ? "Cumple" : "Revisar"
								}),
								/* @__PURE__ */ jsx("span", { children: c.nombre }),
								c.detalle && /* @__PURE__ */ jsx("span", {
									className: "break-all text-xs text-muted-foreground",
									children: c.detalle
								})
							]
						}, c.nombre))
					})] }),
					!leido.raster && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Primeras filas de atributos" }), /* @__PURE__ */ jsx(Tabla, {
						columnas: campos.map((c) => ({
							clave: c.nombre,
							titulo: c.nombre,
							render: (p) => /* @__PURE__ */ jsx("span", {
								className: "whitespace-nowrap",
								children: String(p[c.nombre] ?? "")
							})
						})),
						filas: fc.features.slice(0, 10).map((f) => f.properties ?? {}),
						vacio: "Sin atributos."
					})] })
				]
			}),
			paso === 3 && leido && reemplazar && /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx(Resumen, { filas: [
						["Capa", reemplazar.nombre],
						["Versión", `${reemplazar.version} pasa a ${reemplazar.version + 1}`],
						["Entidades", `${reemplazar.entidades} pasan a ${fc.features.length}`],
						["Origen", `${leido.formato} · ${crsFinal}`],
						["Estado", "Vuelve a Borrador"]
					] }),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "La versión anterior se conserva y se puede recuperar."
					}),
					/* @__PURE__ */ jsx(FormGrid, {
						columnas: 1,
						children: /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Motivo",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsx("textarea", {
								id,
								value: motivo,
								onChange: (e) => setMotivo(e.target.value),
								rows: 3,
								className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted h-auto py-2`
							})
						})
					})
				]
			}),
			paso === 3 && leido && !reemplazar && /* @__PURE__ */ jsx(PasoDatos, {
				datos,
				onDatos: (c) => setDatos((d) => ({
					...d,
					...c
				})),
				estilo,
				onEstilo: (c) => setEstilo((e) => ({
					...e,
					...c
				})),
				campos: campos.map((c) => c.nombre),
				geometria,
				fc
			})
		]
	});
}
function PasoOrigen(p) {
	const [encima, setEncima] = useState(false);
	if (p.opcion === "ARCHIVO") return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ jsxs("label", {
			onDragOver: (e) => {
				e.preventDefault();
				setEncima(true);
			},
			onDragLeave: () => setEncima(false),
			onDrop: (e) => {
				e.preventDefault();
				setEncima(false);
				p.onArchivo(e.dataTransfer.files[0] ?? null);
			},
			className: `flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center focus-within:ring-2 focus-within:ring-primary ${encima ? "border-primary bg-primary-soft" : "border-border bg-background"}`,
			children: [
				/* @__PURE__ */ jsx(Upload, {
					size: 20,
					className: "text-primary-dark",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsx("span", {
					className: "text-sm font-medium",
					children: p.archivo ? p.archivo.name : "Suelte el archivo aquí o haga clic para elegirlo"
				}),
				p.archivo && /* @__PURE__ */ jsxs("span", {
					className: "text-xs text-muted-foreground",
					children: [(p.archivo.size / 1024).toLocaleString("es-PE", { maximumFractionDigits: 0 }), " KB"]
				}),
				/* @__PURE__ */ jsx("input", {
					type: "file",
					accept: ACEPTA,
					className: "sr-only",
					"aria-label": "Elegir archivo de datos geográficos",
					onChange: (e) => p.onArchivo(e.target.files?.[0] ?? null)
				})
			]
		}), /* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: "Formatos: GeoJSON, KML, KMZ, GPX, CSV con columnas de coordenadas (lon y lat, o este y norte en UTM) y Shapefile comprimido (.zip con .shp, .dbf y .prj). Hasta 50 MB por archivo. GeoTIFF y GeoPackage se agregan como servicio."
		})]
	});
	if (p.opcion === "URL") return /* @__PURE__ */ jsxs(FormGrid, {
		columnas: 1,
		children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Dirección",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "url",
					value: p.url,
					onChange: (e) => p.onUrl(e.target.value),
					placeholder: "https://ejemplo.gob.pe/datos/rios.geojson",
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre",
				ayuda: "Si lo deja vacío, se usa el nombre del archivo.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					value: p.nombreUrl,
					onChange: (e) => p.onNombreUrl(e.target.value),
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "El archivo se descarga desde el navegador: el servidor debe permitir pedidos desde otras páginas (CORS). Formatos: GeoJSON, KML, KMZ, GPX, CSV y Shapefile comprimido."
			})
		]
	});
	if (p.opcion === "SERVICIO") return /* @__PURE__ */ jsxs(FormGrid, {
		columnas: 1,
		children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Dirección",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "url",
					value: p.url,
					onChange: (e) => p.onUrl(e.target.value),
					placeholder: "https://ejemplo.gob.pe/geoserver/wms",
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo",
				ayuda: p.tipoServ === "AUTO" ? p.tipoDetectado ? `Detectado: ${NOMBRE_SERVICIO[p.tipoDetectado]}.` : "Se detecta por la dirección." : void 0,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					value: p.tipoServ,
					onChange: (e) => p.onTipoServ(e.target.value),
					className: controlClase,
					children: [/* @__PURE__ */ jsx("option", {
						value: "AUTO",
						children: "Automático"
					}), Object.keys(NOMBRE_SERVICIO).map((t) => /* @__PURE__ */ jsx("option", {
						value: t,
						children: NOMBRE_SERVICIO[t]
					}, t))]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: p.onConectar,
					disabled: p.ocupado || !p.url.trim(),
					children: p.ocupado ? "Conectando…" : "Conectar"
				})
			}),
			p.capasServ && /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Capa",
				obligatorio: true,
				ayuda: p.tipoDetectado && esRaster(p.tipoDetectado) ? "Servicio ráster: se dibuja por teselas, no se descargan datos." : "Se descargan hasta 5 000 entidades en WGS 84.",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					value: p.capaServ,
					onChange: (e) => p.onCapaServ(e.target.value),
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					children: p.capasServ.map((c) => /* @__PURE__ */ jsxs("option", {
						value: c.id,
						children: [c.titulo, c.id && c.id !== c.titulo ? ` (${c.id})` : ""]
					}, c.id))
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Ráster: WMS, WMTS, teselas XYZ y ArcGIS MapServer. Vector: WFS, OGC API Features y ArcGIS FeatureServer. El servidor debe permitir pedidos desde otras páginas (CORS)."
			})
		]
	});
	return /* @__PURE__ */ jsxs("fieldset", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ jsx("legend", {
				className: "mb-2 text-sm font-medium",
				children: "Capa del sistema"
			}),
			SISTEMA.map((s) => /* @__PURE__ */ jsxs("label", {
				className: `flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2 ${p.sistema === s.id ? "border-primary bg-primary-soft" : "border-border"}`,
				children: [/* @__PURE__ */ jsx("input", {
					type: "radio",
					name: "capa-sistema",
					value: s.id,
					checked: p.sistema === s.id,
					onChange: () => p.onSistema(s.id),
					className: "mt-1 accent-primary"
				}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
					className: "block text-sm font-medium",
					children: s.nombre
				}), /* @__PURE__ */ jsx("span", {
					className: "block text-xs text-muted-foreground",
					children: s.categoria
				})] })]
			}, s.id)),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Se agrega una copia de solo lectura: los cambios posteriores en el sistema no la actualizan."
			})
		]
	});
}
function PasoDatos({ datos, onDatos, estilo, onEstilo, campos, geometria, fc }) {
	const texto = (k, etiqueta, obligatorio = false, tipo = "text") => /* @__PURE__ */ jsx(FormField, {
		etiqueta,
		obligatorio,
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			type: tipo,
			value: datos[k],
			onChange: (e) => onDatos({ [k]: e.target.value }),
			className: controlClase
		})
	});
	const raster = geometria === "RASTER";
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de la capa" }),
			/* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Clase de capa",
					obligatorio: true,
					ayuda: DETALLE_CLASE[datos.clase ?? "PROYECTO"],
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						value: datos.clase ?? "PROYECTO",
						onChange: (e) => {
							const clase = e.target.value;
							onDatos({
								clase,
								obligatoria: clase === "BASE" ? datos.obligatoria ?? "DELIMITACION" : void 0
							});
						},
						className: controlClase,
						children: Object.keys(NOMBRE_CLASE).map((c) => /* @__PURE__ */ jsx("option", {
							value: c,
							children: NOMBRE_CLASE[c]
						}, c))
					})
				}),
				datos.clase === "BASE" && /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Capa obligatoria que cumple",
					obligatorio: true,
					ayuda: CAPAS_OBLIGATORIAS.find((o) => o.clave === datos.obligatoria)?.detalle,
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						value: datos.obligatoria ?? "DELIMITACION",
						onChange: (e) => onDatos({ obligatoria: e.target.value }),
						className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
						children: CAPAS_OBLIGATORIAS.map((o) => /* @__PURE__ */ jsx("option", {
							value: o.clave,
							children: o.nombre
						}, o.clave))
					})
				}),
				texto("nombre", "Nombre", true),
				texto("abrev", "Abreviatura", true),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Categoría",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						value: datos.categoria,
						onChange: (e) => onDatos({ categoria: e.target.value }),
						className: controlClase,
						children: CATEGORIAS_CAPA.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c))
					})
				}),
				texto("fuente", "Fuente"),
				texto("fechaDatos", "Fecha de los datos", false, "date"),
				texto("responsable", "Responsable"),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Confiabilidad",
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						value: datos.confiabilidad,
						onChange: (e) => onDatos({ confiabilidad: e.target.value }),
						className: controlClase,
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "ALTA",
								children: "Alta"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "MEDIA",
								children: "Media"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "BAJA",
								children: "Baja"
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Descripción",
					ancho: "doble",
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						value: datos.descripcion,
						onChange: (e) => onDatos({ descripcion: e.target.value }),
						rows: 2,
						className: `${controlClase} h-auto py-2`
					})
				})
			] }),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Estilo inicial" }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-[1fr_16rem]",
				children: [/* @__PURE__ */ jsxs(FormGrid, {
					columnas: 1,
					children: [
						!raster && /* @__PURE__ */ jsxs(Fragment$1, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: geometria === "LINEA" ? "Color" : "Relleno",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "color",
									value: estilo.relleno,
									onChange: (e) => onEstilo({ relleno: e.target.value }),
									className: "h-9 w-16 cursor-pointer rounded-md border border-border bg-card p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								})
							}),
							(geometria === "POLIGONO" || geometria === "MIXTA") && /* @__PURE__ */ jsx(FormField, {
								etiqueta: "Borde",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "color",
									value: estilo.borde,
									onChange: (e) => onEstilo({ borde: e.target.value }),
									className: "h-9 w-16 cursor-pointer rounded-md border border-border bg-card p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								})
							}),
							geometria !== "PUNTO" && /* @__PURE__ */ jsx(FormField, {
								etiqueta: "Grosor",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "number",
									min: 0,
									max: 10,
									step: .5,
									value: estilo.grosor,
									onChange: (e) => onEstilo({ grosor: Number(e.target.value) }),
									className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted"
								})
							})
						] }),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Opacidad",
							ayuda: `${Math.round(estilo.opacidad * 100)} %`,
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								type: "range",
								min: 0,
								max: 1,
								step: .05,
								value: estilo.opacidad,
								onChange: (e) => onEstilo({ opacidad: Number(e.target.value) }),
								className: "h-9 w-full accent-primary"
							})
						}),
						(geometria === "PUNTO" || geometria === "MIXTA") && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Tamaño de punto",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								type: "number",
								min: 1,
								max: 30,
								value: estilo.tamanoPunto,
								onChange: (e) => onEstilo({ tamanoPunto: Number(e.target.value) }),
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted"
							})
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Forma de punto",
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								value: estilo.formaPunto,
								onChange: (e) => onEstilo({ formaPunto: e.target.value }),
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								children: [/* @__PURE__ */ jsx("option", {
									value: "CIRCULO",
									children: "Círculo"
								}), /* @__PURE__ */ jsx("option", {
									value: "CUADRADO",
									children: "Cuadrado"
								})]
							})
						})] }),
						!raster && geometria !== "PUNTO" && /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Tipo de línea",
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								value: estilo.tipoLinea,
								onChange: (e) => onEstilo({ tipoLinea: e.target.value }),
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "CONTINUA",
										children: "Continua"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "DISCONTINUA",
										children: "Discontinua"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "PUNTEADA",
										children: "Punteada"
									})
								]
							})
						}),
						!raster && /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Campo de etiqueta",
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								value: estilo.etiqueta,
								onChange: (e) => onEstilo({ etiqueta: e.target.value }),
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Sin etiqueta"
								}), campos.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c))]
							})
						})
					]
				}), !raster && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "mb-1 text-xs text-muted-foreground",
					children: "Vista previa"
				}), /* @__PURE__ */ jsx(Croquis, {
					fc,
					estilo,
					geometria
				})] })]
			})
		]
	});
}
function Resumen({ filas }) {
	return /* @__PURE__ */ jsx("dl", {
		className: "grid grid-cols-1 gap-x-6 gap-y-2 rounded-md border border-border p-3 text-sm sm:grid-cols-2",
		children: filas.map(([k, v]) => /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("dt", {
				className: "text-xs text-muted-foreground",
				children: k
			}), /* @__PURE__ */ jsx("dd", {
				className: "wrap-break-word font-medium",
				children: v
			})]
		}, k))
	});
}
var ANCHO = 320;
var ALTO = 200;
var TOPE_CROQUIS = 3e3;
/** Dibujo de la extensión y las geometrías en SVG, sin otra instancia de mapa. */
function Croquis({ fc, estilo, geometria }) {
	const trazos = useMemo(() => {
		const e = extension(fc);
		if (!e) return null;
		const k = Math.cos((e[1] + e[3]) / 2 * Math.PI / 180);
		const w = Math.max((e[2] - e[0]) * k, 1e-9);
		const h = Math.max(e[3] - e[1], 1e-9);
		const s = Math.min((ANCHO - 16) / w, (ALTO - 16) / h);
		const ox = (ANCHO - w * s) / 2;
		const oy = (ALTO - h * s) / 2;
		const xy = (p) => `${(ox + (p[0] - e[0]) * k * s).toFixed(1)},${(oy + (e[3] - p[1]) * s).toFixed(1)}`;
		const anillo = (a, cerrar) => `M${a.map(xy).join("L")}${cerrar ? "Z" : ""}`;
		const areas = [];
		const lineas = [];
		const puntos = [];
		const visitar = (g) => {
			if (!g) return;
			if (g.type === "Polygon") areas.push(g.coordinates.map((a) => anillo(a, true)).join(""));
			else if (g.type === "MultiPolygon") areas.push(g.coordinates.flatMap((p) => p.map((a) => anillo(a, true))).join(""));
			else if (g.type === "LineString") lineas.push(anillo(g.coordinates, false));
			else if (g.type === "MultiLineString") lineas.push(g.coordinates.map((a) => anillo(a, false)).join(""));
			else if (g.type === "Point") puntos.push(xy(g.coordinates));
			else if (g.type === "MultiPoint") puntos.push(...g.coordinates.map(xy));
			else if (g.type === "GeometryCollection") g.geometries.forEach(visitar);
		};
		fc.features.slice(0, TOPE_CROQUIS).forEach((f) => visitar(f.geometry));
		return {
			areas,
			lineas,
			puntos,
			marco: [
				ox,
				oy,
				w * s,
				h * s
			]
		};
	}, [fc]);
	if (!trazos) return /* @__PURE__ */ jsx("p", {
		className: "rounded-md border border-border p-4 text-sm text-muted-foreground",
		children: "Sin geometrías para dibujar."
	});
	const discontinua = estilo.tipoLinea === "DISCONTINUA" ? "6 4" : estilo.tipoLinea === "PUNTEADA" ? "1 3" : void 0;
	const r = Math.max(1.5, estilo.tamanoPunto / 2);
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: `0 0 ${ANCHO} ${ALTO}`,
		role: "img",
		"aria-label": `Croquis de la capa: ${fc.features.length} entidades de tipo ${NOMBRE_GEOMETRIA[geometria].toLowerCase()}`,
		className: "h-auto w-full rounded-md border border-border bg-background",
		children: [/* @__PURE__ */ jsx("rect", {
			x: trazos.marco[0],
			y: trazos.marco[1],
			width: trazos.marco[2],
			height: trazos.marco[3],
			fill: "none",
			strokeDasharray: "4 3",
			className: "stroke-muted-foreground",
			strokeWidth: .75
		}), /* @__PURE__ */ jsxs("g", {
			opacity: estilo.opacidad,
			children: [
				trazos.areas.map((d, i) => /* @__PURE__ */ jsx("path", {
					d,
					fill: estilo.relleno,
					fillRule: "evenodd",
					stroke: estilo.borde,
					strokeWidth: Math.min(estilo.grosor, 2),
					strokeDasharray: discontinua
				}, `a${i}`)),
				trazos.lineas.map((d, i) => /* @__PURE__ */ jsx("path", {
					d,
					fill: "none",
					stroke: estilo.relleno,
					strokeWidth: Math.min(estilo.grosor, 4),
					strokeDasharray: discontinua
				}, `l${i}`)),
				trazos.puntos.map((p, i) => {
					const [x, y] = p.split(",").map(Number);
					return estilo.formaPunto === "CUADRADO" ? /* @__PURE__ */ jsx("rect", {
						x: x - r,
						y: y - r,
						width: r * 2,
						height: r * 2,
						fill: estilo.relleno
					}, `p${i}`) : /* @__PURE__ */ jsx("circle", {
						cx: x,
						cy: y,
						r,
						fill: estilo.relleno
					}, `p${i}`);
				})
			]
		})]
	});
}
//#endregion
//#region src/routes/proyectos.$projectId.base-grafica.index.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.base-grafica.index-JYVrdQH1.js");
var OPCIONES = OPCIONES_ANADIR.map((o) => o.opcion);
var Route$1 = createFileRoute("/proyectos/$projectId/base-grafica/")({
	validateSearch: (s) => ({ anadir: OPCIONES.includes(s.anadir) ? s.anadir : void 0 }),
	head: () => ({ meta: [{ title: "Base gráfica · PDGP" }, {
		name: "description",
		content: "Base de datos geográfica del proyecto: capas, estilo, atributos y revisión."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** MapLibre no corre en el servidor: el mapa se carga en el navegador. */
//#endregion
export { controlesCapa as i, AnadirDatos as n, OPCIONES_ANADIR as r, Route$1 as t };
