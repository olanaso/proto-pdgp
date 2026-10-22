import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { b as leerRegistrados, c as getPredioCenter, i as predioDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { c as prediosPorEtapaDe, t as codigoDe } from "./gisProyecto-CAMCHdpa.js";
import { S as useRegistrosCampo, a as distanciaM, h as seguirPosicion, l as estadoBloques, w as useUltimaPosicion, y as tomarPosicion } from "./campo-Dn2b-x9H.js";
import { t as Route$1 } from "./recolector-campo._projectId.mapa-Db6UTN50.js";
import { n as PuntoEstado, t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { LandPlot, X } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.mapa.tsx?tsr-split=component
/** MapLibre no corre en el servidor: el mapa se carga en el navegador. */
function MapaCliente(props) {
	const [Mapa, setMapa] = useState(null);
	useEffect(() => {
		import("./MapaCampo-BrBGnuQ_.js").then((m) => setMapa(() => m.default));
	}, []);
	if (!Mapa) return /* @__PURE__ */ jsx("div", {
		className: "h-full w-full animate-pulse bg-muted",
		role: "status",
		"aria-label": "Cargando mapa"
	});
	return /* @__PURE__ */ jsx(Mapa, { ...props });
}
var LEYENDA = [
	{
		estado: "pendiente",
		texto: "Sin levantar"
	},
	{
		estado: "curso",
		texto: "En curso"
	},
	{
		estado: "completo",
		texto: "Completo"
	}
];
/** Resumen de los cuatro bloques: completo si están todos, en curso si hay alguno. */
function estadoCampo(e) {
	const v = Object.values(e);
	return v.every((x) => x.estado === "completo") ? "completo" : v.some((x) => x.estado !== "pendiente") ? "curso" : "pendiente";
}
var metros = (m) => m < 1e3 ? `${Math.round(m)} m` : `${(m / 1e3).toFixed(1)} km`;
/**
* Mapa de campo: la ubicación del equipo en vivo y los predios del proyecto según lo que falta levantar.
* Tocar un predio muestra su ficha corta y «Caracterizar» abre su checklist.
*/
function MapaRecolector() {
	const { projectId } = Route$1.useParams();
	const { predio } = Route$1.useSearch();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const registros = useRegistrosCampo();
	const yo = useUltimaPosicion();
	const [errorGps, setErrorGps] = useState("");
	const [base, setBase] = useState("osm");
	const [sel, setSel] = useState(predio ?? null);
	const [centrar, setCentrar] = useState(null);
	const [predios, setPredios] = useState(null);
	const responsable = proyecto?.coordinadorPredial ?? "";
	useEffect(() => seguirPosicion(setErrorGps), []);
	useEffect(() => {
		const fc = prediosPorEtapaDe(projectId, leerRegistrados(projectId));
		setPredios({
			...fc,
			features: fc.features.map((f, i) => {
				const codigo = codigoDe(f.properties ?? {}, i);
				return {
					...f,
					properties: {
						...f.properties,
						CODIGO: codigo,
						CAMPO: estadoCampo(estadoBloques(codigo, responsable))
					}
				};
			})
		});
	}, [
		projectId,
		responsable,
		registros
	]);
	useEffect(() => {
		if (!predio) return;
		const c = getPredioCenter(predio);
		if (c) setCentrar({
			lon: c[0],
			lat: c[1],
			zoom: 17,
			n: Date.now()
		});
	}, [predio]);
	const elegido = useMemo(() => {
		if (!sel) return null;
		const p = predioDelProyecto(sel);
		const c = getPredioCenter(sel);
		return {
			codigo: sel,
			p,
			estado: estadoBloques(sel, responsable),
			distancia: c && yo ? distanciaM(yo, {
				lat: c[1],
				lon: c[0]
			}) : void 0
		};
	}, [
		sel,
		yo,
		responsable,
		registros
	]);
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: "Mapa de campo",
		subtitulo: proyecto?.nombre,
		pantallaCompleta: true,
		onAtras: () => navigate({
			to: "/recolector-campo/$projectId",
			params: { projectId }
		}),
		children: [
			predios ? /* @__PURE__ */ jsx(MapaCliente, {
				predios,
				yo,
				base,
				seleccionado: sel,
				onSeleccionar: setSel,
				centrar,
				margenInferior: elegido ? 232 : 16,
				onUbicar: () => tomarPosicion().then((p) => setCentrar({
					lon: p.lon,
					lat: p.lat,
					zoom: 17,
					n: Date.now()
				})).catch((e) => setErrorGps(e.message))
			}) : /* @__PURE__ */ jsx("div", {
				className: "h-full w-full animate-pulse bg-muted",
				role: "status",
				"aria-label": "Cargando predios"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute left-3 top-3 flex flex-col gap-2",
				children: [/* @__PURE__ */ jsx("div", {
					role: "group",
					"aria-label": "Mapa base",
					className: "flex overflow-hidden rounded-md border border-border bg-card",
					children: [["osm", "Mapa"], ["satelite", "Satélite"]].map(([v, t]) => /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-pressed": base === v,
						onClick: () => setBase(v),
						className: `min-h-11 px-4 text-sm font-medium ${base === v ? "bg-primary-soft text-primary-dark" : "text-foreground hover:bg-muted"}`,
						children: t
					}, v))
				}), /* @__PURE__ */ jsxs("ul", {
					className: "space-y-1 rounded-md border border-border bg-card px-3 py-2 text-xs",
					children: [LEYENDA.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(PuntoEstado, {
						estado: l.estado,
						etiqueta: l.texto
					}) }, l.estado)), /* @__PURE__ */ jsxs("li", {
						className: "inline-flex items-center gap-1.5 text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "size-2.5 rounded-full bg-blue-600 ring-2 ring-card",
								"aria-hidden": true
							}),
							"Usted ",
							yo ? `(±${yo.precision} m)` : ""
						]
					})]
				})]
			}),
			errorGps && !yo && /* @__PURE__ */ jsx("p", {
				role: "status",
				className: "absolute inset-x-3 top-36 rounded-md border border-warning bg-warning-soft px-3 py-2 text-sm text-warning",
				children: errorGps
			}),
			elegido && /* @__PURE__ */ jsx("section", {
				"aria-label": `Predio ${elegido.codigo}`,
				className: "absolute inset-x-0 bottom-0 rounded-t-xl border-t border-border bg-card px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-screen-md",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("p", {
									className: "truncate font-mono text-base font-semibold text-foreground",
									children: elegido.p?.cod ?? elegido.codigo
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: [
										elegido.p?.sujeto || "Sin sujeto pasivo",
										elegido.p?.condicion,
										elegido.distancia != null ? `a ${metros(elegido.distancia)} de usted` : ""
									].filter(Boolean).join(" · ")
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Cerrar",
								onClick: () => setSel(null),
								className: "flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted",
								children: /* @__PURE__ */ jsx(X, {
									size: 20,
									"aria-hidden": true
								})
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 flex flex-wrap gap-x-3 gap-y-1",
							children: [
								/* @__PURE__ */ jsx(PuntoEstado, {
									estado: elegido.estado["sujeto-pasivo"].estado,
									etiqueta: "SP"
								}),
								/* @__PURE__ */ jsx(PuntoEstado, {
									estado: elegido.estado.notificacion.estado,
									etiqueta: "Notif."
								}),
								/* @__PURE__ */ jsx(PuntoEstado, {
									estado: elegido.estado.empadronamiento.estado,
									etiqueta: "Emp."
								}),
								/* @__PURE__ */ jsx(PuntoEstado, {
									estado: elegido.estado.caracterizacion.estado,
									etiqueta: "Caract."
								})
							]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							className: "mt-3 h-12 w-full text-base",
							onClick: () => navigate({
								to: "/recolector-campo/$projectId/caracterizacion/$codigo",
								params: {
									projectId,
									codigo: elegido.codigo
								}
							}),
							children: [/* @__PURE__ */ jsx(LandPlot, {}), " Caracterizar este predio"]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { MapaRecolector as component };
