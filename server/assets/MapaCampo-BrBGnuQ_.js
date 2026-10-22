import { i as circuloPrecision } from "./campo-Dn2b-x9H.js";
import "./router-C59nnwpC.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { Map as Map$1 } from "react-map-gl/maplibre";
//#region src/components/campo/MapaCampo.tsx
var BOTON = "flex size-12 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary";
var COLOR_CAMPO = [
	"match",
	["get", "CAMPO"],
	"completo",
	"#15803d",
	"curso",
	"#b45309",
	"#6b7280"
];
var AZUL_YO = "#2563eb";
var VACIA = {
	type: "FeatureCollection",
	features: []
};
/** Recuadro de todos los predios, para encuadrar el mapa al abrir. */
function recuadro(fc) {
	let [x0, y0, x1, y1] = [
		Infinity,
		Infinity,
		-Infinity,
		-Infinity
	];
	const visitar = (c) => {
		if (Array.isArray(c) && typeof c[0] === "number") {
			const [x, y] = c;
			x0 = Math.min(x0, x);
			y0 = Math.min(y0, y);
			x1 = Math.max(x1, x);
			y1 = Math.max(y1, y);
		} else if (Array.isArray(c)) c.forEach(visitar);
	};
	for (const f of fc.features) if (f.geometry && "coordinates" in f.geometry) visitar(f.geometry.coordinates);
	return Number.isFinite(x0) ? [[x0, y0], [x1, y1]] : null;
}
function MapaCampo({ predios, yo, base, seleccionado, onSeleccionar, centrar, onUbicar, margenInferior = 16 }) {
	const mapa = useRef(null);
	const [cargado, setCargado] = useState(false);
	const posicion = useMemo(() => yo ? {
		type: "FeatureCollection",
		features: [{
			type: "Feature",
			properties: { tipo: "precision" },
			geometry: circuloPrecision(yo.lon, yo.lat, Math.max(yo.precision, 3))
		}, {
			type: "Feature",
			properties: { tipo: "punto" },
			geometry: {
				type: "Point",
				coordinates: [yo.lon, yo.lat]
			}
		}]
	} : VACIA, [yo]);
	const estilo = useMemo(() => ({
		version: 8,
		sources: {
			osm: {
				type: "raster",
				tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
				tileSize: 256,
				maxzoom: 19,
				attribution: "© OpenStreetMap contributors"
			},
			satelite: {
				type: "raster",
				tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
				tileSize: 256,
				maxzoom: 19,
				attribution: "Tiles (c) Esri"
			},
			predios: {
				type: "geojson",
				data: VACIA
			},
			yo: {
				type: "geojson",
				data: VACIA
			}
		},
		layers: [
			{
				id: "fondo",
				type: "background",
				paint: { "background-color": "#e5e7eb" }
			},
			{
				id: "osm",
				type: "raster",
				source: "osm"
			},
			{
				id: "satelite",
				type: "raster",
				source: "satelite",
				layout: { visibility: "none" }
			},
			{
				id: "predios-fill",
				type: "fill",
				source: "predios",
				filter: [
					"!=",
					["geometry-type"],
					"Point"
				],
				paint: {
					"fill-color": COLOR_CAMPO,
					"fill-opacity": .38
				}
			},
			{
				id: "predios-line",
				type: "line",
				source: "predios",
				filter: [
					"!=",
					["geometry-type"],
					"Point"
				],
				paint: {
					"line-color": "#111827",
					"line-width": 1
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
				paint: {
					"circle-radius": 8,
					"circle-color": COLOR_CAMPO,
					"circle-stroke-color": "#ffffff",
					"circle-stroke-width": 2
				}
			},
			{
				id: "predio-elegido",
				type: "line",
				source: "predios",
				filter: [
					"==",
					["get", "CODIGO"],
					""
				],
				paint: {
					"line-color": "#facc15",
					"line-width": 4
				}
			},
			{
				id: "yo-precision",
				type: "fill",
				source: "yo",
				filter: [
					"==",
					["get", "tipo"],
					"precision"
				],
				paint: {
					"fill-color": AZUL_YO,
					"fill-opacity": .15
				}
			},
			{
				id: "yo-punto",
				type: "circle",
				source: "yo",
				filter: [
					"==",
					["get", "tipo"],
					"punto"
				],
				paint: {
					"circle-radius": 8,
					"circle-color": AZUL_YO,
					"circle-stroke-color": "#ffffff",
					"circle-stroke-width": 3
				}
			}
		]
	}), []);
	useEffect(() => {
		const m = mapa.current?.getMap();
		if (!m || !cargado) return;
		m.getSource("predios")?.setData?.(predios);
	}, [predios, cargado]);
	useEffect(() => {
		const m = mapa.current?.getMap();
		if (!m || !cargado) return;
		m.getSource("yo")?.setData?.(posicion);
	}, [posicion, cargado]);
	useEffect(() => {
		const m = mapa.current?.getMap();
		if (!m || !cargado) return;
		m.setLayoutProperty("satelite", "visibility", base === "satelite" ? "visible" : "none");
	}, [base, cargado]);
	useEffect(() => {
		const m = mapa.current?.getMap();
		if (!m || !cargado) return;
		m.setFilter("predio-elegido", [
			"==",
			["get", "CODIGO"],
			seleccionado ?? ""
		]);
	}, [seleccionado, cargado]);
	useEffect(() => {
		if (!centrar || !cargado) return;
		mapa.current?.flyTo({
			center: [centrar.lon, centrar.lat],
			zoom: centrar.zoom ?? Math.max(mapa.current.getZoom(), 16),
			duration: 700
		});
	}, [centrar, cargado]);
	const encuadrado = useRef(false);
	useEffect(() => {
		if (!cargado || encuadrado.current || !predios.features.length) return;
		encuadrado.current = true;
		if (centrar) return;
		const r = recuadro(predios);
		if (r) mapa.current?.fitBounds(r, {
			padding: 40,
			duration: 0
		});
	}, [
		cargado,
		predios,
		centrar
	]);
	const tocar = (e) => {
		const f = e.features?.[0];
		onSeleccionar(f ? String(f.properties?.CODIGO ?? "") || null : null);
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Map$1, {
		ref: mapa,
		initialViewState: {
			longitude: -75.478,
			latitude: -11.782,
			zoom: 13
		},
		style: {
			width: "100%",
			height: "100%"
		},
		mapStyle: estilo,
		attributionControl: false,
		interactiveLayerIds: ["predios-fill", "predios-punto"],
		onClick: tocar,
		onLoad: () => setCargado(true),
		cursor: "pointer"
	}), /* @__PURE__ */ jsxs("div", {
		className: "absolute right-3 flex flex-col gap-2",
		style: { bottom: margenInferior },
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Acercar",
				className: BOTON,
				onClick: () => mapa.current?.zoomIn(),
				children: /* @__PURE__ */ jsx(Plus, {
					size: 22,
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Alejar",
				className: BOTON,
				onClick: () => mapa.current?.zoomOut(),
				children: /* @__PURE__ */ jsx(Minus, {
					size: 22,
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Mi ubicación",
				title: "Mi ubicación",
				className: `${BOTON} text-primary-dark`,
				onClick: () => yo ? mapa.current?.flyTo({
					center: [yo.lon, yo.lat],
					zoom: Math.max(mapa.current.getZoom(), 17),
					duration: 700
				}) : onUbicar(),
				children: /* @__PURE__ */ jsx(LocateFixed, {
					size: 22,
					"aria-hidden": true
				})
			})
		]
	})] });
}
//#endregion
export { MapaCampo as default };
