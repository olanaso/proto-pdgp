import "./Form-DtuiyqJ8.js";
import { d as pmd_default, f as concesion_default } from "./leer-CXNolRlj.js";
import { C as usePrediosRegistrados, T as ETAPA_COLOR, c as getPredioCenter, i as predioDelProyecto, n as etapaDelPredio, o as filasDelProyecto, s as getPredioByCodigo, w as ETAPAS_DE_AVANCE } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { t as PredioActions } from "./PredioActions-DYxBPCVO.js";
import { v as leerDatosCapa } from "./capas-B7cJ7zRJ.js";
import { _ as useGeometriasPredio, c as prediosPorEtapaDe } from "./gisProyecto-CAMCHdpa.js";
import "./router-C59nnwpC.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Archive, Banknote, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, Download, Filter, GripHorizontal, Images, Landmark, Link as Link$1, MapPin, Maximize2, RotateCcw, Ruler, ShieldCheck, Users, X } from "lucide-react";
import { Map as Map$1, NavigationControl, Popup } from "react-map-gl/maplibre";
import * as DialogPrimitive from "@radix-ui/react-dialog";
//#region src/components/MapView.tsx
var center = [-75.478, -11.782];
var JAUJA_BOUNDS = [[-75.49035, -11.7964], [-75.45642, -11.76973]];
var MODAL_MARGIN = 12;
var PUBLIC_BASE_URL = "/";
var PREDIO_DEMO_IMAGES = [
	{
		id: "frente",
		label: "1. Frente",
		src: `${PUBLIC_BASE_URL}images/predios/predio-demo-frente.jpg`,
		alt: "Vista frontal demostrativa del predio rural en Jauja"
	},
	{
		id: "fondo",
		label: "2. Fondo",
		src: `${PUBLIC_BASE_URL}images/predios/predio-demo-fondo.jpg`,
		alt: "Vista posterior demostrativa del predio rural en Jauja"
	},
	{
		id: "lado-derecho",
		label: "3. Lado derecho",
		src: `${PUBLIC_BASE_URL}images/predios/predio-demo-lado-derecho.jpg`,
		alt: "Vista lateral derecha demostrativa del predio rural en Jauja"
	},
	{
		id: "lado-izquierdo",
		label: "4. Lado izquierdo",
		src: `${PUBLIC_BASE_URL}images/predios/predio-demo-lado-izquierdo.jpg`,
		alt: "Vista lateral izquierda demostrativa del predio rural en Jauja"
	},
	{
		id: "panoramica",
		label: "5. Panorámica",
		src: `${PUBLIC_BASE_URL}images/predios/predio-demo-panoramica.jpg`,
		alt: "Vista panorámica demostrativa del predio rural en Jauja"
	}
];
function hash(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
	return h;
}
/** Proporción pagada simulada por etapa; solo alimenta la pestaña "Monto", rotulada como simulada. */
var PAGADO_POR_ETAPA = {
	1: 0,
	2: .05,
	3: .1,
	4: .2,
	5: .22,
	6: .6,
	7: .95,
	8: 1
};
function demoFinancialForCode(code) {
	const seed = hash(code);
	const estimated = 16e4 + seed % 84e4;
	const approved = Math.round(estimated * (.94 + (seed >>> 8) % 13 / 100));
	const paid = Math.round(approved * (PAGADO_POR_ETAPA[etapaDelPredio(code)?.etapa ?? 1] ?? 0));
	return {
		estimated,
		approved,
		paid,
		balance: approved - paid
	};
}
function demoMoney(value) {
	return "S/ " + value.toLocaleString("es-PE", { minimumFractionDigits: 2 });
}
var MAP_FILTERS = [
	{
		key: "codigo",
		label: "Cod. predio",
		group: "Datos de adquisición"
	},
	{
		key: "tipo",
		label: "Tipo predio",
		group: "Datos de adquisición"
	},
	{
		key: "cond",
		label: "Condición SP",
		group: "Datos de adquisición"
	},
	{
		key: "mod",
		label: "Modalidad",
		group: "Datos de adquisición"
	},
	{
		key: "pagado",
		label: "Con resolución",
		group: "Datos de adquisición"
	},
	{
		key: "inscrito",
		label: "Inscrito",
		group: "Proceso de inscripción"
	},
	{
		key: "recepcionCampo",
		label: "Recepción campo",
		group: "OPAT"
	},
	{
		key: "recepcionOpat",
		label: "Recepción OPAT",
		group: "OPAT"
	}
];
function emptyLabel(value) {
	const clean = value?.trim();
	return clean ? clean : "Sin información";
}
function yesNo(value) {
	return value?.trim() ? "SI" : "NO";
}
function mapFilterValue(row, key) {
	if (key === "codigo") return emptyLabel(row.cod || row.codigo);
	if (key === "tipo") return emptyLabel(row.tipo || row.tp);
	if (key === "cond") return emptyLabel(row.cond);
	if (key === "mod") return emptyLabel(row.mod);
	if (key === "pagado") return yesNo(row.res || row.nres);
	if (key === "inscrito") return emptyLabel(row.estado);
	if (key === "recepcionCampo") return emptyLabel(row.fr);
	return emptyLabel(row.acta || row.edd);
}
function escapeExcelCell(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function exportPrediosExcel(rows) {
	const columns = [
		["Código de predio", "cod"],
		["CONDICION_PREDIO", "condicionPredio"],
		["N.º de expediente", "exp"],
		["Ciudad", "ciudad"],
		["Proyecto", "proyecto"],
		["E.T.", "et"],
		["Tipo de predio", "tipo"],
		["Sujeto pasivo", "suj"],
		["Condición SP", "cond"],
		["Modalidad", "mod"],
		["Área afectada (m²)", "area"],
		["N.º de resolución", "res"],
		["Fecha", "fres"],
		["Mes de resolución", "mesres"],
		["Año de adquisición", "per"],
		["Monto", "valor"],
		["H.R. de resolución", "hrres"],
		["STD devengado", "pago"],
		["Inscrito", "estado"],
		["Acto registral", "acto"],
		["Oficina registral", "ofi"],
		["Título SUNARP", "titulo"],
		["Estado del título", "etit"],
		["Partida inscrita", "pind"],
		["Recepción campo", "fr"],
		["Recepción OPAT", "acta"],
		["Estado predio", "afec"]
	];
	const tableRows = rows.map((row) => `<tr>${columns.map(([, key]) => `<td>${escapeExcelCell(row[key])}</td>`).join("")}</tr>`).join("");
	const html = `
    <html>
      <head><meta charset="UTF-8" /></head>
      <body>
        <table border="1">
          <thead><tr>${columns.map(([label]) => `<th>${escapeExcelCell(label)}</th>`).join("")}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;
	const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	a.href = url;
	a.download = `predios_filtrados_${stamp}.xls`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
var RADIO_TIERRA = 6371008.8;
var rad = (g) => g * Math.PI / 180;
/** Distancia geodésica (haversine) de una polilínea, en metros. */
function distanciaM(puntos) {
	let d = 0;
	for (let i = 1; i < puntos.length; i++) {
		const [l1, f1] = puntos[i - 1];
		const [l2, f2] = puntos[i];
		const a = Math.sin(rad(f2 - f1) / 2) ** 2 + Math.cos(rad(f1)) * Math.cos(rad(f2)) * Math.sin(rad(l2 - l1) / 2) ** 2;
		d += 2 * RADIO_TIERRA * Math.asin(Math.sqrt(a));
	}
	return d;
}
/** Área esférica de un anillo (abierto o cerrado), en m². */
function areaM2(puntos) {
	if (puntos.length < 3) return 0;
	let s = 0;
	for (let i = 0; i < puntos.length; i++) {
		const [l1, f1] = puntos[i];
		const [l2, f2] = puntos[(i + 1) % puntos.length];
		s += rad(l2 - l1) * (2 + Math.sin(rad(f1)) + Math.sin(rad(f2)));
	}
	return Math.abs(s * RADIO_TIERRA ** 2 / 2);
}
var num = (n, d = 2) => n.toLocaleString("es-PE", { maximumFractionDigits: d });
var textoDistancia = (m) => m < 1e3 ? `${num(m, 1)} m` : `${num(m / 1e3, 3)} km`;
var textoArea = (m2) => m2 < 1e4 ? `${num(m2, 1)} m²` : `${num(m2 / 1e4, 4)} ha (${num(m2, 0)} m²)`;
var DISCONTINUA = {
	CONTINUA: void 0,
	DISCONTINUA: [4, 2],
	PUNTEADA: [.5, 1.5]
};
var ES_POLIGONO = [
	"match",
	["geometry-type"],
	["Polygon", "MultiPolygon"],
	true,
	false
];
var ES_PUNTO = [
	"match",
	["geometry-type"],
	["Point", "MultiPoint"],
	true,
	false
];
/** Primera capa de MapLibre de una capa del proyecto: el resto se dibuja debajo de ella. */
var primeraDe = (c) => c.geometria === "RASTER" ? `${c.id}::raster` : `${c.id}::fill`;
var conIndice = (fc) => ({
	type: "FeatureCollection",
	features: fc.features.map((f, i) => ({
		...f,
		properties: {
			...f.properties,
			__i: i
		}
	}))
});
var VACIA = {
	type: "FeatureCollection",
	features: []
};
/**
* Capas de MapLibre de una capa del proyecto, con su simbología. Se aplican a mano (no con <Source>):
* el entorno de desarrollo inyecta `ref` en las props y MapLibre rechaza la fuente.
*/
function especificaciones(capa) {
	const e = capa.estilo;
	const vis = capa.visible ? "visible" : "none";
	if (capa.geometria === "RASTER") return [{
		id: `${capa.id}::raster`,
		type: "raster",
		layout: { visibility: vis },
		paint: { "raster-opacity": e.opacidad }
	}];
	return [
		{
			id: `${capa.id}::fill`,
			type: "fill",
			filter: ES_POLIGONO,
			layout: { visibility: vis },
			paint: {
				"fill-color": e.relleno,
				"fill-opacity": e.opacidad
			}
		},
		{
			id: `${capa.id}::line`,
			type: "line",
			filter: ["!", ES_PUNTO],
			layout: { visibility: vis },
			paint: {
				"line-color": e.borde,
				"line-width": e.grosor,
				"line-opacity": capa.geometria === "POLIGONO" ? 1 : e.opacidad,
				"line-dasharray": DISCONTINUA[e.tipoLinea]
			}
		},
		{
			id: `${capa.id}::circle`,
			type: "circle",
			filter: ES_PUNTO,
			layout: { visibility: e.formaPunto === "CIRCULO" ? vis : "none" },
			paint: {
				"circle-color": e.relleno,
				"circle-radius": e.tamanoPunto,
				"circle-opacity": e.opacidad,
				"circle-stroke-color": e.borde,
				"circle-stroke-width": 1
			}
		},
		{
			id: `${capa.id}::square`,
			type: "symbol",
			filter: ES_PUNTO,
			layout: {
				visibility: e.formaPunto === "CUADRADO" ? vis : "none",
				"icon-image": "pdgp-cuadrado",
				"icon-size": e.tamanoPunto / 8,
				"icon-allow-overlap": true
			},
			paint: {
				"icon-color": e.relleno,
				"icon-opacity": e.opacidad
			}
		},
		{
			id: `${capa.id}::label`,
			type: "symbol",
			layout: {
				visibility: e.etiqueta ? vis : "none",
				"text-field": ["to-string", ["get", e.etiqueta || "__i"]],
				"text-font": ["Noto Sans Regular"],
				"text-size": 11,
				"text-offset": [0, 1],
				"text-optional": true
			},
			paint: {
				"text-color": "#111827",
				"text-halo-color": "#ffffff",
				"text-halo-width": 1.5
			}
		}
	];
}
/** Resaltado de la entidad elegida y trazo de la medición: siempre encima de todo. */
var SUPERPUESTAS = [
	{
		id: "pdgp-resaltado-fill",
		source: "pdgp-resaltado",
		type: "fill",
		filter: ES_POLIGONO,
		layout: {},
		paint: {
			"fill-color": "#facc15",
			"fill-opacity": .3
		}
	},
	{
		id: "pdgp-resaltado-line",
		source: "pdgp-resaltado",
		type: "line",
		filter: ["!", ES_PUNTO],
		layout: {},
		paint: {
			"line-color": "#facc15",
			"line-width": 4
		}
	},
	{
		id: "pdgp-resaltado-punto",
		source: "pdgp-resaltado",
		type: "circle",
		filter: ES_PUNTO,
		layout: {},
		paint: {
			"circle-radius": 10,
			"circle-color": "#facc15",
			"circle-opacity": .5,
			"circle-stroke-color": "#facc15",
			"circle-stroke-width": 3
		}
	},
	{
		id: "pdgp-medida-fill",
		source: "pdgp-medida",
		type: "fill",
		filter: ES_POLIGONO,
		layout: {},
		paint: {
			"fill-color": "#0ea5e9",
			"fill-opacity": .2
		}
	},
	{
		id: "pdgp-medida-line",
		source: "pdgp-medida",
		type: "line",
		filter: ["!", ES_PUNTO],
		layout: {},
		paint: {
			"line-color": "#0369a1",
			"line-width": 2.5,
			"line-dasharray": [2, 1]
		}
	},
	{
		id: "pdgp-medida-punto",
		source: "pdgp-medida",
		type: "circle",
		filter: ES_PUNTO,
		layout: {},
		paint: {
			"circle-radius": 4,
			"circle-color": "#ffffff",
			"circle-stroke-color": "#0369a1",
			"circle-stroke-width": 2
		}
	}
];
var sinIndefinidos = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== void 0));
var CAPAS_INTERACTIVAS = [
	"fill",
	"line",
	"circle",
	"square"
];
function MapView({ selectedCodigo, onSelectCodigo, layerVisibility = {}, onCursor, onZoom, capas = [], sinFiltrosPredios = false, mapaBase, enfocar, resaltar, onIdentificar, medir = null, estilosSistema }) {
	const projectId = useParams({ strict: false }).projectId ?? "default";
	const containerRef = useRef(null);
	const modalRef = useRef(null);
	const mapRef = useRef(null);
	const dragOffsetRef = useRef({
		x: 0,
		y: 0
	});
	const [hover, setHover] = useState(null);
	const [selected, setSelected] = useState(null);
	const [showModal, setShowModal] = useState(true);
	const [modalMinimized, setModalMinimized] = useState(false);
	const [activeDetailTab, setActiveDetailTab] = useState("imagenes");
	const [selectedImageIndex, setSelectedImageIndex] = useState(null);
	const [openMapFilter, setOpenMapFilter] = useState(null);
	const [mapFilters, setMapFilters] = useState({});
	const [modalPos, setModalPos] = useState({
		x: 16,
		y: 16
	});
	const [isDragging, setIsDragging] = useState(false);
	const [mapLoaded, setMapLoaded] = useState(false);
	const [cargados, setCargados] = useState({});
	const [puntosMedida, setPuntosMedida] = useState([]);
	const selectedFilterCodigo = selected?.codigo ?? "";
	const prediosInteractivos = layerVisibility.predios !== false && !sinFiltrosPredios;
	const capasActivas = useMemo(() => capas.filter((c) => c.capa.activa).map((c) => ({
		capa: c.capa,
		datos: c.datos ?? cargados[`${c.capa.id}@${c.capa.version}`]
	})).sort((a, b) => b.capa.orden - a.capa.orden), [capas, cargados]);
	useEffect(() => {
		for (const { capa, datos } of capas) {
			const k = `${capa.id}@${capa.version}`;
			if (datos || capa.geometria === "RASTER" || cargados[k]) continue;
			leerDatosCapa(capa).then((fc) => {
				if (fc) setCargados((s) => s[k] ? s : {
					...s,
					[k]: fc
				});
			});
		}
	}, [capas, cargados]);
	const idsInteractivos = useMemo(() => [
		...prediosInteractivos ? ["predios-fill"] : [],
		...prediosInteractivos && layerVisibility.puntos !== false ? ["predios-punto"] : [],
		...capasActivas.filter((c) => c.capa.visible && c.capa.geometria !== "RASTER").flatMap((c) => CAPAS_INTERACTIVAS.map((t) => `${c.capa.id}::${t}`))
	], [
		capasActivas,
		prediosInteractivos,
		layerVisibility.puntos
	]);
	const resaltado = useMemo(() => {
		const c = resaltar && capasActivas.find((x) => x.capa.id === resaltar.capaId);
		const f = c && resaltar ? c.datos?.features[resaltar.indice] : void 0;
		return f ? {
			type: "FeatureCollection",
			features: [f]
		} : VACIA;
	}, [capasActivas, resaltar]);
	const medida = useMemo(() => {
		const features = puntosMedida.map((p) => ({
			type: "Feature",
			properties: {},
			geometry: {
				type: "Point",
				coordinates: p
			}
		}));
		if (puntosMedida.length > 1) features.push({
			type: "Feature",
			properties: {},
			geometry: medir === "area" && puntosMedida.length > 2 ? {
				type: "Polygon",
				coordinates: [[...puntosMedida, puntosMedida[0]]]
			} : {
				type: "LineString",
				coordinates: puntosMedida
			}
		});
		return {
			type: "FeatureCollection",
			features
		};
	}, [medir, puntosMedida]);
	useEffect(() => {
		setPuntosMedida([]);
		const map = mapRef.current?.getMap();
		if (!map) return;
		if (medir) map.doubleClickZoom.disable();
		else map.doubleClickZoom.enable();
	}, [medir]);
	useEffect(() => {
		if (!enfocar || !mapLoaded) return;
		mapRef.current?.fitBounds([[enfocar[0], enfocar[1]], [enfocar[2], enfocar[3]]], {
			padding: 48,
			maxZoom: 18,
			duration: 500
		});
	}, [enfocar, mapLoaded]);
	useEffect(() => {
		const map = mapRef.current?.getMap();
		if (!map || !mapLoaded || !mapaBase) return;
		map.setLayoutProperty("openstreetmap", "visibility", mapaBase === "osm" ? "visible" : "none");
		map.setLayoutProperty("satellite", "visibility", mapaBase === "satelite" ? "visible" : "none");
	}, [mapaBase, mapLoaded]);
	useEffect(() => {
		const map = mapRef.current?.getMap();
		if (!map || !mapLoaded) return;
		for (const [id, data] of [["pdgp-resaltado", resaltado], ["pdgp-medida", medida]]) {
			const fuente = map.getSource(id);
			if (fuente) fuente.setData(data);
			else map.addSource(id, {
				type: "geojson",
				data
			});
		}
		for (const c of SUPERPUESTAS) if (!map.getLayer(c.id)) map.addLayer(sinIndefinidos(c));
	}, [
		mapLoaded,
		resaltado,
		medida
	]);
	const dibujadas = useRef(new globalThis.Map());
	useEffect(() => {
		const map = mapRef.current?.getMap();
		if (!map || !mapLoaded || !map.getLayer("pdgp-resaltado-fill")) return;
		const quedan = new Set(capasActivas.map((c) => c.capa.id));
		for (const id of [...dibujadas.current.keys()]) {
			if (quedan.has(id)) continue;
			for (const l of map.getStyle().layers) if (l.id.startsWith(`${id}::`)) map.removeLayer(l.id);
			if (map.getSource(`${id}::fuente`)) map.removeSource(`${id}::fuente`);
			dibujadas.current.delete(id);
		}
		capasActivas.forEach(({ capa, datos }, i) => {
			const fuente = `${capa.id}::fuente`;
			const antes = dibujadas.current.get(capa.id);
			const plantilla = capa.origen.servicio?.plantilla;
			if (capa.geometria === "RASTER") {
				if (!plantilla) return;
				if (antes && antes.plantilla !== plantilla) {
					for (const l of map.getStyle().layers) if (l.id.startsWith(`${capa.id}::`)) map.removeLayer(l.id);
					map.removeSource(fuente);
				}
				if (!map.getSource(fuente)) map.addSource(fuente, {
					type: "raster",
					tiles: [plantilla],
					tileSize: 256
				});
			} else if (!map.getSource(fuente)) map.addSource(fuente, {
				type: "geojson",
				data: datos ? conIndice(datos) : VACIA
			});
			else if (antes?.datos !== datos) map.getSource(fuente).setData(datos ? conIndice(datos) : VACIA);
			dibujadas.current.set(capa.id, {
				datos,
				plantilla
			});
			const antesDe = i === 0 ? "pdgp-resaltado-fill" : primeraDe(capasActivas[i - 1].capa);
			for (const l of especificaciones(capa)) {
				if (!map.getLayer(l.id)) {
					map.addLayer({
						...l,
						source: fuente,
						layout: sinIndefinidos(l.layout),
						paint: sinIndefinidos(l.paint)
					}, antesDe);
					continue;
				}
				for (const [k, v] of Object.entries(l.layout)) map.setLayoutProperty(l.id, k, v);
				for (const [k, v] of Object.entries(l.paint)) map.setPaintProperty(l.id, k, v);
				map.moveLayer(l.id, antesDe);
			}
		});
	}, [capasActivas, mapLoaded]);
	const activeMapFilterCount = Object.keys(mapFilters).length;
	const registrados = usePrediosRegistrados(projectId);
	const predioRows = useMemo(() => filasDelProyecto(projectId), [projectId, registrados]);
	const geometrias = useGeometriasPredio(projectId);
	const prediosPorEtapa = useMemo(() => prediosPorEtapaDe(projectId, registrados, geometrias), [
		projectId,
		registrados,
		geometrias
	]);
	const mapFilterOptions = useMemo(() => {
		return Object.fromEntries(MAP_FILTERS.map((filter) => [filter.key, Array.from(new Set(predioRows.map((row) => mapFilterValue(row, filter.key)))).sort((a, b) => a.localeCompare(b))]));
	}, [predioRows]);
	const filteredPredioCodes = useMemo(() => {
		return predioRows.filter((row) => MAP_FILTERS.every((filter) => {
			const selectedValues = mapFilters[filter.key];
			if (!selectedValues) return true;
			return selectedValues.includes(mapFilterValue(row, filter.key));
		})).map((row) => row.codigo);
	}, [mapFilters, predioRows]);
	const filteredPredioRows = useMemo(() => {
		const codes = new Set(filteredPredioCodes);
		return predioRows.filter((row) => codes.has(row.codigo));
	}, [filteredPredioCodes, predioRows]);
	const hasMapFilters = activeMapFilterCount > 0;
	const mapStyle = useMemo(() => ({
		version: 8,
		glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
		sources: {
			openstreetmap: {
				type: "raster",
				tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
				tileSize: 256,
				attribution: "© OpenStreetMap contributors"
			},
			"esri-satellite": {
				type: "raster",
				tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
				tileSize: 256,
				attribution: "Tiles (c) Esri"
			},
			predios: {
				type: "geojson",
				data: prediosPorEtapa
			},
			concesion: {
				type: "geojson",
				data: concesion_default
			},
			pmd: {
				type: "geojson",
				data: pmd_default
			}
		},
		layers: [
			{
				id: "map-background",
				type: "background",
				paint: { "background-color": "#dbeafe" }
			},
			{
				id: "openstreetmap",
				type: "raster",
				source: "openstreetmap"
			},
			{
				id: "satellite",
				type: "raster",
				source: "esri-satellite"
			},
			{
				id: "pmd-line",
				type: "line",
				source: "pmd",
				paint: {
					"line-color": "#dc2626",
					"line-width": 5
				}
			},
			{
				id: "concesion-line",
				type: "line",
				source: "concesion",
				paint: {
					"line-color": "#ec4899",
					"line-width": 3
				}
			},
			{
				id: "predios-fill",
				type: "fill",
				source: "predios",
				paint: {
					"fill-color": [
						"match",
						["get", "ETAPA_PREDIO"],
						...ETAPAS_DE_AVANCE.flatMap((n) => [n, ETAPA_COLOR[n]]),
						ETAPA_COLOR[1]
					],
					"fill-opacity": .42
				}
			},
			{
				id: "predios-line",
				type: "line",
				source: "predios",
				paint: {
					"line-color": "#0f172a",
					"line-width": 1.25
				}
			},
			{
				id: "predios-punto",
				type: "circle",
				source: "predios",
				filter: [
					"==",
					["geometry-type"],
					"Point"
				],
				layout: { visibility: "none" },
				paint: {
					"circle-radius": 7,
					"circle-color": [
						"match",
						["get", "ETAPA_PREDIO"],
						...ETAPAS_DE_AVANCE.flatMap((n) => [n, ETAPA_COLOR[n]]),
						ETAPA_COLOR[1]
					],
					"circle-stroke-color": "#ffffff",
					"circle-stroke-width": 2
				}
			},
			{
				id: "predios-selected-fill",
				type: "fill",
				source: "predios",
				filter: [
					"==",
					["get", "codigopred"],
					""
				],
				paint: {
					"fill-color": "#facc15",
					"fill-opacity": .24
				}
			},
			{
				id: "predios-selected-line",
				type: "line",
				source: "predios",
				filter: [
					"==",
					["get", "codigopred"],
					""
				],
				paint: {
					"line-color": "#facc15",
					"line-width": 4
				}
			},
			{
				id: "predios-label",
				type: "symbol",
				source: "predios",
				layout: {
					"text-field": ["get", "codigopred"],
					"text-size": 7,
					"text-anchor": "center",
					"text-justify": "center"
				},
				paint: {
					"text-color": "#000000",
					"text-halo-color": "#ffffff",
					"text-halo-width": 4,
					"text-halo-blur": .5
				}
			}
		]
	}), []);
	const clampModalPosition = useCallback((x, y) => {
		const container = containerRef.current;
		const modal = modalRef.current;
		const containerWidth = container?.clientWidth ?? window.innerWidth;
		const containerHeight = container?.clientHeight ?? window.innerHeight;
		const modalWidth = modal?.offsetWidth ?? 520;
		const modalHeight = modal?.offsetHeight ?? 360;
		const maxX = Math.max(MODAL_MARGIN, containerWidth - modalWidth - MODAL_MARGIN);
		const maxY = Math.max(MODAL_MARGIN, containerHeight - modalHeight - MODAL_MARGIN);
		return {
			x: Math.min(Math.max(MODAL_MARGIN, x), maxX),
			y: Math.min(Math.max(MODAL_MARGIN, y), maxY)
		};
	}, []);
	const dockModalPosition = useCallback(() => {
		const container = containerRef.current;
		const modal = modalRef.current;
		const containerWidth = container?.clientWidth ?? window.innerWidth;
		const modalWidth = modal?.offsetWidth ?? 520;
		return clampModalPosition(containerWidth - modalWidth - 16, 76);
	}, [clampModalPosition]);
	useEffect(() => {
		const map = mapRef.current?.getMap();
		if (!map || !mapLoaded) return;
		map.getSource("predios")?.setData?.(prediosPorEtapa);
	}, [prediosPorEtapa, mapLoaded]);
	useEffect(() => {
		const map = mapRef.current?.getMap();
		if (!map || !mapLoaded) return;
		const visibilityGroups = {
			...mapaBase ? {} : { base: ["openstreetmap", "satellite"] },
			pmd: ["pmd-line"],
			concesion: ["concesion-line"],
			predios: [
				"predios-fill",
				"predios-line",
				"predios-selected-fill",
				"predios-selected-line",
				"predios-label"
			],
			puntos: ["predios-punto"]
		};
		Object.entries(visibilityGroups).forEach(([key, layerIds]) => {
			const visibility = layerVisibility[key] === false ? "none" : "visible";
			layerIds.forEach((layerId) => {
				if (map.getLayer(layerId)) map.setLayoutProperty(layerId, "visibility", visibility);
			});
		});
		for (const [key, e] of Object.entries(estilosSistema ?? {})) {
			const layerId = `${key}-line`;
			if (!map.getLayer(layerId)) continue;
			map.setPaintProperty(layerId, "line-color", e.color);
			map.setPaintProperty(layerId, "line-width", e.grosor);
			map.setPaintProperty(layerId, "line-dasharray", DISCONTINUA[e.tipoLinea] ?? null);
		}
	}, [
		layerVisibility,
		mapLoaded,
		mapaBase,
		estilosSistema
	]);
	useEffect(() => {
		const map = mapRef.current?.getMap();
		if (!map || !mapLoaded) return;
		const visibleCodesFilter = [
			"in",
			["get", "codigopred"],
			["literal", filteredPredioCodes]
		];
		const baseFilter = hasMapFilters ? visibleCodesFilter : null;
		const selectedFilter = selectedFilterCodigo ? hasMapFilters ? [
			"all",
			visibleCodesFilter,
			[
				"==",
				["get", "codigopred"],
				selectedFilterCodigo
			]
		] : [
			"==",
			["get", "codigopred"],
			selectedFilterCodigo
		] : [
			"==",
			["get", "codigopred"],
			"__none__"
		];
		[
			"predios-fill",
			"predios-line",
			"predios-label",
			"predios-punto"
		].forEach((layerId) => {
			if (map.getLayer(layerId)) map.setFilter(layerId, baseFilter);
		});
		if (map.getLayer("predios-selected-fill")) map.setFilter("predios-selected-fill", selectedFilter);
		if (map.getLayer("predios-selected-line")) map.setFilter("predios-selected-line", selectedFilter);
		const colorExpression = [
			"case",
			[
				"==",
				["get", "codigopred"],
				selectedFilterCodigo
			],
			"#facc15",
			"#ffffff"
		];
		map.setPaintProperty("predios-line", "line-color", colorExpression);
		map.setPaintProperty("predios-line", "line-width", [
			"case",
			[
				"==",
				["get", "codigopred"],
				selectedFilterCodigo
			],
			3,
			1.2
		]);
	}, [
		filteredPredioCodes,
		hasMapFilters,
		mapLoaded,
		selectedFilterCodigo
	]);
	useEffect(() => {
		if (!selectedCodigo) {
			setSelected(null);
			setSelectedImageIndex(null);
			setShowModal(false);
			return;
		}
		if (selected?.codigo === selectedCodigo) return;
		const nextCenter = getPredioCenter(selectedCodigo);
		if (!nextCenter) return;
		const map = mapRef.current?.getMap();
		if (map) map.flyTo({
			center: nextCenter,
			zoom: Math.max(map.getZoom(), 16),
			duration: 500
		});
		setSelected({
			codigo: selectedCodigo,
			lng: nextCenter[0],
			lat: nextCenter[1]
		});
		setActiveDetailTab("imagenes");
		setSelectedImageIndex(null);
		setModalPos(dockModalPosition());
		setShowModal(true);
		setModalMinimized(false);
	}, [
		dockModalPosition,
		selected?.codigo,
		selectedCodigo
	]);
	useEffect(() => {
		if (!isDragging) return;
		function handlePointerMove(e) {
			const container = containerRef.current;
			if (!container) return;
			const rect = container.getBoundingClientRect();
			const nextX = e.clientX - rect.left - dragOffsetRef.current.x;
			const nextY = e.clientY - rect.top - dragOffsetRef.current.y;
			setModalPos(clampModalPosition(nextX, nextY));
			e.preventDefault();
		}
		function handlePointerUp() {
			setIsDragging(false);
		}
		window.addEventListener("pointermove", handlePointerMove, { passive: false });
		window.addEventListener("pointerup", handlePointerUp);
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
		};
	}, [clampModalPosition, isDragging]);
	function handleClick(e) {
		if (medir) {
			setPuntosMedida((p) => [...p, [e.lngLat.lng, e.lngLat.lat]]);
			return;
		}
		const f = e.features?.[0];
		const capaId = f?.layer.id.includes("::") ? f.layer.id.split("::")[0] : null;
		if (capaId || sinFiltrosPredios) {
			const c = capaId ? capasActivas.find((x) => x.capa.id === capaId) : void 0;
			const indice = Number(f?.properties?.__i);
			const propiedades = c?.datos?.features[indice]?.properties ?? {};
			onIdentificar?.(c && f ? {
				capa: c.capa,
				indice,
				propiedades
			} : null);
			return;
		}
		if (!f) {
			setSelected(null);
			setSelectedImageIndex(null);
			setShowModal(false);
			onSelectCodigo?.(null);
			return;
		}
		const codigo = f.properties?.codigopred ?? "SIN CODIGO";
		setSelected({
			codigo,
			lng: e.lngLat.lng,
			lat: e.lngLat.lat
		});
		setActiveDetailTab("imagenes");
		setSelectedImageIndex(null);
		onSelectCodigo?.(codigo);
		setModalPos(dockModalPosition());
		setShowModal(true);
		setModalMinimized(false);
	}
	function handleMove(e) {
		onCursor?.({
			lat: e.lngLat.lat,
			lng: e.lngLat.lng
		});
		const f = e.features?.[0];
		const map = mapRef.current?.getMap();
		if (map) map.getCanvas().style.cursor = f ? "pointer" : "";
		if (!f || f.layer.id.includes("::")) return setHover(null);
		const codigo = f.properties?.codigopred ?? "";
		setHover({
			codigo,
			lng: e.lngLat.lng,
			lat: e.lngLat.lat
		});
	}
	const row = getPredioByCodigo(selected?.codigo);
	const etapa = selected ? etapaDelPredio(selected.codigo) : void 0;
	const demoFinancial = demoFinancialForCode(selected?.codigo ?? "Jauja");
	const modalityLabel = selected && predioDelProyecto(selected.codigo)?.modalidad || row?.mod || "Sin modalidad";
	const trato = {
		label: modalityLabel,
		color: modalityLabel.toUpperCase().includes("TRANSFERENCIA") ? "#7c3aed" : modalityLabel.toUpperCase().includes("EXPROPI") ? "#dc2626" : "#2563eb"
	};
	const detailSections = [
		{
			id: "imagenes",
			short: "Imágenes",
			icon: Images,
			title: "Imágenes del predio",
			items: []
		},
		{
			id: "identificacion",
			short: "Predio",
			icon: MapPin,
			title: "Identificación del predio",
			items: [
				[
					"Código de predio",
					row?.cod || selected?.codigo,
					true
				],
				[
					"N.º de expediente",
					row?.exp,
					true
				],
				["Ciudad", row?.ciudad],
				["Proyecto", row?.proyecto],
				["E.T.", row?.et],
				["Tipo de predio", row?.tipo || row?.tp]
			]
		},
		{
			id: "responsables",
			short: "Resp.",
			icon: Users,
			title: "Responsables",
			items: [["Especialista legal", row?.rlegal], ["Especialista técnico", row?.rtec]]
		},
		{
			id: "sujeto",
			short: "Sujeto",
			icon: ShieldCheck,
			title: "Sujeto pasivo",
			items: [["Sujeto pasivo", row?.suj], ["Condición del SP", row?.cond]]
		},
		{
			id: "area",
			short: "Área",
			icon: Ruler,
			title: "Área afectada",
			items: [["Cantidad", row?.cantidad], [
				"Área afectada (m²)",
				row?.area,
				true
			]]
		},
		{
			id: "adquisicion",
			short: "Adq.",
			icon: ClipboardCheck,
			title: "Adquisición",
			items: [
				["Modalidad de adquisición", trato.label],
				[
					"N.º de resolución",
					row?.res || row?.nres,
					true
				],
				["Fecha", row?.fres],
				["Mes de resolución", row?.mesres],
				["Año de adquisición", row?.per]
			]
		},
		{
			id: "economica",
			short: "Monto",
			icon: Banknote,
			title: "Información económica",
			items: [
				[
					"Costo estimado (simulado)",
					demoMoney(demoFinancial.estimated),
					true
				],
				[
					"Monto aprobado (simulado)",
					demoMoney(demoFinancial.approved),
					true
				],
				[
					"Monto pagado (simulado)",
					demoMoney(demoFinancial.paid),
					true
				],
				[
					"Saldo (simulado)",
					demoMoney(demoFinancial.balance),
					true
				]
			]
		},
		{
			id: "documental",
			short: "Doc.",
			icon: Link$1,
			title: "Sustento documental",
			items: [[
				"Drive / expediente digital",
				row?.drive,
				true
			]]
		},
		{
			id: "registral",
			short: "Reg.",
			icon: Landmark,
			title: "Inscripción registral",
			items: [
				["Inscrito (sí o no)", row?.estado],
				["Acto registral", row?.acto],
				["Oficina registral", row?.ofi],
				[
					"N.º de título SUNARP",
					row?.titulo,
					true
				],
				["Fecha de presentación", row?.ftit],
				["Estado del título", row?.etit],
				["Fecha de inscripción", row?.finsc],
				[
					"N.º de partida inscrita",
					row?.pind || row?.part,
					true
				]
			]
		},
		{
			id: "cierre",
			short: "Cierre",
			icon: Archive,
			title: "Recepción y cierre",
			items: [
				["Recepción en campo", row?.fr],
				["Fecha de recepción y entrega", row?.acta],
				["Recepción del expediente físico", row?.edd],
				["Fecha de entrega", row?.trans],
				["Estado del predio", row?.afec || row?.com]
			]
		}
	];
	const activeSection = detailSections.find((section) => section.id === activeDetailTab) ?? detailSections[0];
	return /* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		className: "relative h-full w-full",
		children: [
			/* @__PURE__ */ jsxs(Map$1, {
				ref: mapRef,
				initialViewState: {
					longitude: center[0],
					latitude: center[1],
					zoom: 13.8
				},
				style: {
					width: "100%",
					height: "100%"
				},
				mapStyle,
				attributionControl: false,
				interactiveLayerIds: idsInteractivos,
				onClick: handleClick,
				onMouseMove: handleMove,
				onZoomEnd: (e) => onZoom?.(e.viewState.zoom),
				onLoad: () => {
					const map = mapRef.current?.getMap();
					if (map && !map.hasImage("pdgp-cuadrado")) map.addImage("pdgp-cuadrado", {
						width: 16,
						height: 16,
						data: new Uint8Array(256 * 4).fill(255)
					}, { sdf: true });
					setMapLoaded(true);
					mapRef.current?.fitBounds(JAUJA_BOUNDS, {
						padding: 42,
						duration: 0
					});
					onZoom?.(mapRef.current?.getZoom() ?? 0);
				},
				children: [/* @__PURE__ */ jsx(NavigationControl, {
					position: "top-right",
					showCompass: false
				}), hover && !selected && /* @__PURE__ */ jsx(Popup, {
					longitude: hover.lng,
					latitude: hover.lat,
					anchor: "bottom",
					closeButton: false,
					className: "text-xs",
					children: hover.codigo
				})]
			}),
			!mapLoaded && /* @__PURE__ */ jsx("div", {
				role: "status",
				className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-background/90 text-sm font-medium text-muted-foreground",
				children: "Cargando mapa predial de Jauja..."
			}),
			medir && /* @__PURE__ */ jsxs("div", {
				role: "status",
				className: "absolute bottom-10 left-3 z-20 max-w-[calc(100%-24px)] rounded-md border border-border bg-card px-3 py-2 text-sm",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "font-semibold text-foreground",
						children: medir === "distancia" ? `Distancia: ${textoDistancia(distanciaM(puntosMedida))}` : `Área: ${textoArea(areaM2(puntosMedida))} · perímetro ${textoDistancia(distanciaM(puntosMedida.length > 2 ? [...puntosMedida, puntosMedida[0]] : puntosMedida))}`
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							puntosMedida.length,
							" ",
							puntosMedida.length === 1 ? "punto" : "puntos",
							". Haga clic en el mapa para agregar vértices."
						]
					}),
					puntosMedida.length > 0 && /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "mt-1",
						onClick: () => setPuntosMedida([]),
						children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Borrar medida"]
					})
				]
			}),
			!sinFiltrosPredios && /* @__PURE__ */ jsx(MapFilterBar, {
				filters: MAP_FILTERS,
				options: mapFilterOptions,
				values: mapFilters,
				openFilter: openMapFilter,
				onOpenFilter: setOpenMapFilter,
				onValuesChange: setMapFilters,
				rows: filteredPredioRows,
				resultCount: filteredPredioCodes.length,
				activeCount: activeMapFilterCount
			}),
			selected && showModal && !sinFiltrosPredios && /* @__PURE__ */ jsxs("div", {
				ref: modalRef,
				className: `absolute z-[600] w-[520px] max-w-[calc(100%-24px)] overflow-hidden rounded-lg border border-border bg-card shadow-md ${isDragging ? "ring-2 ring-primary/40" : ""}`,
				style: {
					left: `${modalPos.x}px`,
					top: `${modalPos.y}px`
				},
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex cursor-grab select-none items-center justify-between gap-3 bg-primary-dark px-3 py-2.5 text-primary-foreground active:cursor-grabbing",
					style: { touchAction: "none" },
					onPointerDown: (e) => {
						if (e.button !== 0) return;
						const rect = modalRef.current?.getBoundingClientRect();
						if (!rect) return;
						dragOffsetRef.current = {
							x: e.clientX - rect.left,
							y: e.clientY - rect.top
						};
						setIsDragging(true);
						e.preventDefault();
					},
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ jsx(GripHorizontal, {
							size: 16,
							className: "shrink-0 text-primary-foreground/80",
							"aria-hidden": true
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold uppercase text-primary-foreground/75",
								children: "Predio seleccionado"
							}), /* @__PURE__ */ jsx("p", {
								className: "truncate text-sm font-semibold",
								title: row?.cod || selected.codigo,
								children: row?.cod || selected.codigo
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex shrink-0 gap-1",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onPointerDown: (e) => e.stopPropagation(),
							onClick: () => setModalMinimized(!modalMinimized),
							className: "flex size-7 items-center justify-center rounded-sm hover:bg-primary-foreground/20",
							"aria-label": modalMinimized ? "Expandir panel" : "Minimizar panel",
							title: modalMinimized ? "Expandir panel" : "Minimizar panel",
							children: modalMinimized ? "▲" : "▼"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onPointerDown: (e) => e.stopPropagation(),
							onClick: () => {
								setSelected(null);
								setSelectedImageIndex(null);
								setShowModal(false);
								onSelectCodigo?.(null);
							},
							className: "flex size-7 items-center justify-center rounded-sm hover:bg-primary-foreground/20",
							"aria-label": "Cerrar panel del predio",
							title: "Cerrar panel del predio",
							children: /* @__PURE__ */ jsx(X, {
								size: 16,
								"aria-hidden": true
							})
						})]
					})]
				}), !modalMinimized && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
					className: "border-b border-border bg-card px-3 py-2",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold uppercase text-primary-dark",
							children: "Acciones"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-end gap-1.5",
							children: [/* @__PURE__ */ jsx(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/proyectos/$projectId/predios",
									params: { projectId },
									search: { q: row?.cod || selected.codigo },
									children: "Ver en el listado"
								})
							}), /* @__PURE__ */ jsx(PredioActions, {
								codigoPredio: selected.codigo,
								condicionPredio: row?.condicionPredio,
								mode: "toolbar"
							})]
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "overflow-auto p-3 text-sm",
					style: { maxHeight: "min(510px, calc(100vh - 205px))" },
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-center justify-between gap-2 border-b border-border pb-2",
							children: [etapa && /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1.5",
								title: etapa.hito,
								children: [/* @__PURE__ */ jsx("span", {
									className: "size-2.5 shrink-0 rounded-sm",
									style: { background: ETAPA_COLOR[etapa.etapa] },
									"aria-hidden": true
								}), /* @__PURE__ */ jsxs(StatusBadge, {
									tono: "primary",
									children: [
										"Etapa ",
										etapa.etapa,
										" · ",
										etapa.corto
									]
								})]
							}), /* @__PURE__ */ jsx("span", {
								className: "rounded-sm px-2 py-0.5 text-xs font-semibold text-primary-foreground",
								style: { background: trato.color },
								children: trato.label
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							role: "tablist",
							className: "mb-3 flex gap-1 overflow-x-auto border-b border-border pb-2",
							children: detailSections.map((section) => {
								const Icon = section.icon;
								const active = section.id === activeSection.id;
								return /* @__PURE__ */ jsxs("button", {
									type: "button",
									role: "tab",
									"aria-selected": active,
									title: section.title,
									"aria-label": section.title,
									onClick: () => setActiveDetailTab(section.id),
									className: `flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium ${active ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:bg-primary-soft hover:text-primary-dark"}`,
									children: [/* @__PURE__ */ jsx(Icon, {
										size: 16,
										"aria-hidden": true
									}), /* @__PURE__ */ jsx("span", { children: section.short })]
								}, section.id);
							})
						}),
						activeSection.id === "imagenes" ? /* @__PURE__ */ jsx(PredioImageGallery, {
							images: PREDIO_DEMO_IMAGES,
							onSelect: setSelectedImageIndex
						}) : /* @__PURE__ */ jsx(DetailSection, {
							icon: activeSection.icon,
							title: activeSection.title,
							items: activeSection.items
						})
					]
				})] })]
			}),
			/* @__PURE__ */ jsx(PredioImageViewer, {
				images: PREDIO_DEMO_IMAGES,
				selectedIndex: selectedImageIndex,
				codigoPredio: row?.cod || selected?.codigo || "",
				onSelectedIndexChange: setSelectedImageIndex
			})
		]
	});
}
function MapFilterBar({ filters, options, values, openFilter, onOpenFilter, onValuesChange, rows, resultCount, activeCount }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [openFilter && /* @__PURE__ */ jsx("button", {
		className: "fixed inset-0 z-[519] cursor-default",
		onClick: () => onOpenFilter(null),
		"aria-label": "Cerrar filtro"
	}), /* @__PURE__ */ jsx("div", {
		className: "absolute left-1/2 top-3 z-[520] w-[min(calc(100%-96px),1120px)] -translate-x-1/2 overflow-visible",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex max-w-full flex-nowrap items-center justify-center gap-1.5 overflow-visible",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs font-semibold text-foreground",
					title: `${resultCount} predios visibles`,
					children: [/* @__PURE__ */ jsx(Filter, {
						size: 16,
						className: activeCount ? "text-primary" : "text-muted-foreground",
						"aria-hidden": true
					}), /* @__PURE__ */ jsx("span", {
						className: "tabular-nums",
						children: resultCount
					})]
				}),
				filters.map((filter) => /* @__PURE__ */ jsx(MapFilterButton, {
					filter,
					options: options[filter.key] ?? [],
					selected: values[filter.key],
					open: openFilter === filter.key,
					onOpen: () => onOpenFilter(openFilter === filter.key ? null : filter.key),
					onClose: () => onOpenFilter(null),
					onValuesChange
				}, filter.key)),
				/* @__PURE__ */ jsx("div", {
					className: "mx-1 h-7 w-px shrink-0 bg-border",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex shrink-0 items-center gap-1.5",
					children: [/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => {
								onValuesChange({});
								onOpenFilter(null);
							},
							className: "flex size-8 items-center justify-center rounded-md border border-border bg-card text-primary-dark hover:bg-primary-soft",
							"aria-label": "Reiniciar filtros",
							children: /* @__PURE__ */ jsx(RotateCcw, {
								size: 16,
								"aria-hidden": true
							})
						})
					}), /* @__PURE__ */ jsx(TooltipContent, { children: "Reiniciar filtros" })] }), /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => exportPrediosExcel(rows),
							className: "flex size-8 items-center justify-center rounded-md border border-border bg-card text-success hover:bg-success-soft",
							"aria-label": "Exportar predios filtrados a Excel",
							children: /* @__PURE__ */ jsx(Download, {
								size: 16,
								"aria-hidden": true
							})
						})
					}), /* @__PURE__ */ jsx(TooltipContent, { children: "Exportar predios filtrados a Excel" })] })]
				})
			]
		})
	})] });
}
function MapFilterButton({ filter, options, selected, open, onOpen, onClose, onValuesChange }) {
	const active = selected !== void 0;
	const checkedCount = selected?.length ?? options.length;
	const [search, setSearch] = useState("");
	const searchable = filter.key === "codigo";
	const visibleOptions = searchable ? options.filter((option) => option.toLowerCase().includes(search.trim().toLowerCase())) : options;
	function setAll() {
		onValuesChange((previous) => {
			const next = { ...previous };
			delete next[filter.key];
			return next;
		});
	}
	function setNone() {
		onValuesChange((previous) => ({
			...previous,
			[filter.key]: []
		}));
	}
	function toggleValue(value) {
		onValuesChange((previous) => {
			const current = previous[filter.key] ?? options;
			const nextValues = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
			const next = { ...previous };
			if (nextValues.length === options.length) delete next[filter.key];
			else next[filter.key] = nextValues;
			return next;
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: onOpen,
			"aria-expanded": open,
			className: `flex h-8 max-w-[128px] shrink-0 items-center gap-1 rounded-md border px-2.5 text-xs font-semibold ${active ? "border-primary-dark bg-primary-dark text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`,
			title: filter.label,
			children: [/* @__PURE__ */ jsx("span", {
				className: "truncate",
				children: filter.label
			}), /* @__PURE__ */ jsxs("span", {
				className: "flex shrink-0 items-center gap-1",
				children: [active && /* @__PURE__ */ jsx("span", {
					className: "rounded-sm bg-primary-foreground/20 px-1 text-xs tabular-nums text-primary-foreground",
					children: checkedCount
				}), /* @__PURE__ */ jsx(ChevronDown, {
					size: 14,
					"aria-hidden": true
				})]
			})]
		}), open && /* @__PURE__ */ jsxs("div", {
			className: "absolute left-0 top-full z-[900] mt-1 w-60 rounded-md border border-border bg-card shadow-md",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "border-b border-border px-2 py-1.5",
					children: [/* @__PURE__ */ jsx("p", {
						className: "truncate text-xs font-semibold text-foreground",
						children: filter.label
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							checkedCount,
							" de ",
							options.length,
							" visibles"
						]
					})]
				}),
				searchable && /* @__PURE__ */ jsx("div", {
					className: "border-b border-border p-1.5",
					children: /* @__PURE__ */ jsx("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Buscar valor",
						"aria-label": `Buscar en ${filter.label}`,
						className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted h-8 px-2 text-xs`,
						autoFocus: true
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-1 border-b border-border p-1.5",
					children: [
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "flex-1",
							onClick: setAll,
							children: "Marcar todo"
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "flex-1",
							onClick: setNone,
							children: "Desmarcar todo"
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onClose,
							"aria-label": "Cerrar filtro",
							children: /* @__PURE__ */ jsx(X, {})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "max-h-[320px] overflow-auto p-1",
					children: [visibleOptions.map((option) => {
						return /* @__PURE__ */ jsxs("label", {
							className: "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-xs hover:bg-muted",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: selected === void 0 ? true : selected.includes(option),
								onChange: () => toggleValue(option),
								className: "accent-primary"
							}), /* @__PURE__ */ jsx("span", {
								className: "min-w-0 flex-1 truncate",
								title: option,
								children: option
							})]
						}, option);
					}), visibleOptions.length === 0 && /* @__PURE__ */ jsx("p", {
						className: "px-2 py-3 text-center text-xs text-muted-foreground",
						children: "Sin coincidencias"
					})]
				})
			]
		})]
	});
}
function PredioImageGallery({ images, onSelect }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-md border border-border bg-background p-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsxs("h4", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase text-primary-dark",
				children: [/* @__PURE__ */ jsx(Images, {
					size: 16,
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("span", { children: "Imágenes del predio" })]
			}), /* @__PURE__ */ jsx(StatusBadge, {
				tono: "primary",
				children: "Datos de demostración"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-2",
			children: images.map((image, index) => /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => onSelect(index),
				className: `group min-w-0 overflow-hidden rounded-md border border-border bg-card text-left hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${image.id === "panoramica" ? "col-span-2" : ""}`,
				"aria-label": `Ampliar ${image.label.toLowerCase()}`,
				children: [/* @__PURE__ */ jsxs("div", {
					className: `relative overflow-hidden ${image.id === "panoramica" ? "h-28" : "h-24"}`,
					children: [/* @__PURE__ */ jsx("img", {
						src: image.src,
						alt: image.alt,
						className: "size-full object-cover"
					}), /* @__PURE__ */ jsx("span", {
						className: "absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-md bg-foreground/60 text-card",
						"aria-hidden": true,
						children: /* @__PURE__ */ jsx(Maximize2, { size: 14 })
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-2 px-2 py-1.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "truncate text-xs font-semibold text-foreground",
						children: image.label
					}), /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: "Ampliar"
					})]
				})]
			}, image.id))
		})]
	});
}
function PredioImageViewer({ images, selectedIndex, codigoPredio, onSelectedIndexChange }) {
	const selectedImage = selectedIndex === null ? null : images[selectedIndex];
	function showPrevious() {
		if (selectedIndex === null) return;
		onSelectedIndexChange((selectedIndex - 1 + images.length) % images.length);
	}
	function showNext() {
		if (selectedIndex === null) return;
		onSelectedIndexChange((selectedIndex + 1) % images.length);
	}
	return /* @__PURE__ */ jsx(DialogPrimitive.Root, {
		open: selectedImage !== null,
		onOpenChange: (open) => {
			if (!open) onSelectedIndexChange(null);
		},
		children: /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [/* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-[10000] bg-black/80 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
			className: "fixed left-1/2 top-1/2 z-[10001] w-[min(94vw,1100px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-card/15 bg-foreground shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-3 border-b border-card/10 px-4 py-3 text-card",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx(DialogPrimitive.Title, {
							className: "truncate text-xl font-semibold",
							children: selectedImage?.label || "Imagen del predio"
						}), /* @__PURE__ */ jsxs(DialogPrimitive.Description, {
							className: "mt-0.5 truncate text-xs text-card/60",
							children: [
								"Predio ",
								codigoPredio,
								" · Imagen de demostración"
							]
						})]
					}), /* @__PURE__ */ jsx(DialogPrimitive.Close, {
						className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-card/10 text-card hover:bg-card/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card",
						"aria-label": "Cerrar visor de imagen",
						children: /* @__PURE__ */ jsx(X, {
							size: 16,
							"aria-hidden": true
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative flex h-[min(70vh,720px)] items-center justify-center bg-black",
					children: [
						selectedImage && /* @__PURE__ */ jsx("img", {
							src: selectedImage.src,
							alt: selectedImage.alt,
							className: "size-full object-contain"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: showPrevious,
							className: "absolute left-3 flex size-10 items-center justify-center rounded-md bg-foreground/60 text-card hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card",
							"aria-label": "Ver imagen anterior",
							children: /* @__PURE__ */ jsx(ChevronLeft, {
								size: 22,
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: showNext,
							className: "absolute right-3 flex size-10 items-center justify-center rounded-md bg-foreground/60 text-card hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card",
							"aria-label": "Ver imagen siguiente",
							children: /* @__PURE__ */ jsx(ChevronRight, {
								size: 22,
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-md bg-foreground/60 px-3 py-2",
							children: images.map((image, index) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => onSelectedIndexChange(index),
								"aria-current": index === selectedIndex ? "true" : void 0,
								className: `size-2.5 rounded-sm ${index === selectedIndex ? "bg-primary ring-2 ring-card/80" : "bg-card/55 hover:bg-card"}`,
								"aria-label": `Ver ${image.label.toLowerCase()}`
							}, image.id))
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-3 px-4 py-2.5 text-xs text-card/65",
					children: [/* @__PURE__ */ jsx("span", { children: selectedImage?.label }), /* @__PURE__ */ jsxs("span", { children: [
						selectedIndex === null ? 0 : selectedIndex + 1,
						" de ",
						images.length
					] })]
				})
			]
		})] })
	});
}
function DetailSection({ icon: Icon, title, items }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-md border border-border bg-background p-2",
		children: [/* @__PURE__ */ jsxs("h4", {
			className: "mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase text-primary-dark",
			children: [/* @__PURE__ */ jsx(Icon, {
				size: 16,
				"aria-hidden": true
			}), /* @__PURE__ */ jsx("span", { children: title })]
		}), /* @__PURE__ */ jsx("dl", {
			className: "grid grid-cols-2 gap-2 text-xs",
			children: items.map(([label, value, mono]) => /* @__PURE__ */ jsx(DetailItem, {
				label,
				value,
				mono
			}, label))
		})]
	});
}
function DetailItem({ label, value, mono }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0 rounded-md border border-border bg-card p-2",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: `break-words leading-snug text-foreground ${mono ? "font-mono" : ""}`,
			children: value || "Sin información"
		})]
	});
}
//#endregion
export { MapView as default };
