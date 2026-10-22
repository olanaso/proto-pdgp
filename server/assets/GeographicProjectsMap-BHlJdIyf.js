import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { n as projectStateColors } from "./geographicDashboardData-DjefOkoP.js";
import "./router-C59nnwpC.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Anchor, Building2, BusFront, Construction, Droplets, Layers3, Map, Plane, Route, Search, ShipWheel, TrainFront, X } from "lucide-react";
import { Map as Map$1, Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
//#region src/components/GeographicProjectsMap.tsx
var projectIcons = {
	Carretera: Construction,
	Puente: Route,
	Aeropuerto: Plane,
	Puerto: Anchor,
	Ferrocarril: TrainFront,
	"Corredor vial": Route,
	Saneamiento: Droplets,
	"Edificación pública": Building2,
	Terminal: BusFront,
	"Infraestructura urbana": Map,
	"Proyecto multimodal": ShipWheel
};
var layerOptions = [
	"Departamentos",
	"Provincias",
	"Trazado",
	"Predios",
	"Interferencias",
	"Áreas liberadas"
];
function GeographicProjectsMap({ projects, selected, onSelect }) {
	const [baseMap, setBaseMap] = useState("Calles");
	const [layers, setLayers] = useState(["Departamentos", "Trazado"]);
	const [layerMenu, setLayerMenu] = useState(false);
	const [search, setSearch] = useState("");
	const mapStyle = useMemo(() => {
		return {
			version: 8,
			sources: { base: {
				type: "raster",
				tileSize: 256,
				...baseMap === "Satelital" ? {
					tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
					attribution: "Esri World Imagery"
				} : baseMap === "Administrativo" ? {
					tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"],
					attribution: "CARTO"
				} : {
					tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
					attribution: "© OpenStreetMap contributors"
				}
			} },
			layers: [{
				id: "background",
				type: "background",
				paint: { "background-color": "#dbeafe" }
			}, {
				id: "base",
				type: "raster",
				source: "base",
				paint: { "raster-saturation": baseMap === "Satelital" ? -.15 : -.45 }
			}]
		};
	}, [baseMap]);
	const visibleProjects = projects.filter((project) => `${project.name} ${project.code} ${project.department}`.toLowerCase().includes(search.toLowerCase()));
	const toggleLayer = (layer) => setLayers((current) => current.includes(layer) ? current.filter((item) => item !== layer) : [...current, layer]);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative h-full min-h-[610px] overflow-hidden rounded-lg",
		children: [
			/* @__PURE__ */ jsxs(Map$1, {
				initialViewState: {
					longitude: -75.2,
					latitude: -9.7,
					zoom: 4.45
				},
				mapStyle,
				style: {
					width: "100%",
					height: "100%"
				},
				attributionControl: false,
				children: [
					/* @__PURE__ */ jsx(NavigationControl, {
						position: "bottom-right",
						showCompass: false
					}),
					visibleProjects.map((project) => {
						const Icon = projectIcons[project.type] ?? Map;
						return /* @__PURE__ */ jsx(Marker, {
							longitude: project.longitude,
							latitude: project.latitude,
							anchor: "center",
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: (event) => {
									event.stopPropagation();
									onSelect(project);
								},
								"aria-label": `${project.code} · ${project.name}`,
								className: `group relative flex size-10 items-center justify-center rounded-lg border-2 border-card text-card ${selected?.id === project.id ? "ring-4 ring-card/80" : ""}`,
								style: { background: projectStateColors[project.state] },
								title: `${project.code} · ${project.name}`,
								children: [/* @__PURE__ */ jsx(Icon, {
									size: 19,
									"aria-hidden": true
								}), /* @__PURE__ */ jsx("span", {
									className: "absolute left-1/2 top-11 hidden w-max max-w-56 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-card group-hover:block",
									children: project.name
								})]
							})
						}, project.id);
					}),
					selected && layers.includes("Predios") && [
						[
							-.045,
							.025,
							"#2563eb"
						],
						[
							.035,
							.018,
							"#eab308"
						],
						[
							-.02,
							-.034,
							"#16a34a"
						],
						[
							.048,
							-.025,
							"#dc2626"
						],
						[
							.006,
							.048,
							"#7c3aed"
						]
					].map(([longitudeOffset, latitudeOffset, color], index) => /* @__PURE__ */ jsx(Marker, {
						longitude: selected.longitude + Number(longitudeOffset),
						latitude: selected.latitude + Number(latitudeOffset),
						children: /* @__PURE__ */ jsx("span", {
							className: "block size-3 rounded-sm border border-card",
							style: { background: String(color) },
							title: "Predio demostrativo"
						})
					}, `predio-${index}`)),
					selected && /* @__PURE__ */ jsx(Popup, {
						longitude: selected.longitude,
						latitude: selected.latitude,
						offset: 26,
						closeButton: false,
						maxWidth: "370px",
						onClose: () => onSelect(null),
						children: /* @__PURE__ */ jsxs("div", {
							className: "w-[330px] text-xs",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-3 border-b border-border pb-2",
									children: [/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-xs font-semibold text-primary-dark",
											children: selected.code
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-0.5 text-sm font-bold text-foreground",
											children: selected.name
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-0.5 text-muted-foreground",
											children: [
												selected.type,
												" · ",
												selected.department
											]
										})
									] }), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => onSelect(null),
										"aria-label": "Cerrar detalle del proyecto",
										className: "flex size-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted",
										children: /* @__PURE__ */ jsx(X, {
											size: 16,
											"aria-hidden": true
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-2 grid grid-cols-3 gap-1.5",
									children: [
										/* @__PURE__ */ jsx(PopupMetric, {
											label: "Ejecución",
											value: `${(selected.executed / selected.investment * 100).toFixed(1)}%`
										}),
										/* @__PURE__ */ jsx(PopupMetric, {
											label: "Avance físico",
											value: `${selected.physical}%`
										}),
										/* @__PURE__ */ jsx(PopupMetric, {
											label: "Disponibilidad",
											value: `${(selected.delivered / selected.properties * 100).toFixed(1)}%`
										}),
										/* @__PURE__ */ jsx(PopupMetric, {
											label: "Predios",
											value: selected.properties
										}),
										/* @__PURE__ */ jsx(PopupMetric, {
											label: "Entregados",
											value: selected.delivered
										}),
										/* @__PURE__ */ jsx(PopupMetric, {
											label: "Inscritos",
											value: selected.registered
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-2 rounded-md bg-muted p-2 text-muted-foreground",
									children: [
										"Riesgo: ",
										/* @__PURE__ */ jsx("b", { children: selected.risk }),
										" · Disponibilidad estimada:",
										" ",
										/* @__PURE__ */ jsx("b", { children: selected.availabilityDate })
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-2 grid grid-cols-4 gap-1",
									children: [
										"Ver detalle",
										"Ver predios",
										"Ver gastos",
										"Cronograma"
									].map((action) => /* @__PURE__ */ jsx("button", {
										type: "button",
										title: "Próximamente",
										className: "rounded-md border border-border px-1 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary hover:bg-primary-soft hover:text-primary-dark",
										children: action
									}, action))
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute left-3 top-3 z-10 flex max-w-[calc(100%-90px)] gap-2",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "relative block w-64 max-w-[45vw]",
						children: [/* @__PURE__ */ jsx(Search, {
							size: 16,
							className: "pointer-events-none absolute left-2.5 top-2 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("input", {
							type: "search",
							value: search,
							onChange: (event) => setSearch(event.target.value),
							placeholder: "Buscar proyecto o departamento",
							"aria-label": "Buscar proyecto o departamento",
							className: `${controlClase} h-8 bg-card/95 pl-8 text-sm`
						})]
					}),
					/* @__PURE__ */ jsxs("select", {
						value: baseMap,
						onChange: (event) => setBaseMap(event.target.value),
						"aria-label": "Mapa base",
						className: `${controlClase} h-8 w-auto bg-card/95 text-sm`,
						children: [
							/* @__PURE__ */ jsx("option", { children: "Calles" }),
							/* @__PURE__ */ jsx("option", { children: "Administrativo" }),
							/* @__PURE__ */ jsx("option", { children: "Satelital" })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setLayerMenu((value) => !value),
							"aria-expanded": layerMenu,
							className: "inline-flex h-8 items-center gap-1 rounded-md border border-border bg-card/95 px-2 text-sm font-semibold hover:bg-muted",
							children: [
								/* @__PURE__ */ jsx(Layers3, {
									size: 16,
									"aria-hidden": true
								}),
								" Capas (",
								layers.length,
								")"
							]
						}), layerMenu && /* @__PURE__ */ jsx("div", {
							className: "absolute left-0 top-10 w-48 rounded-md border border-border bg-card p-2 shadow-md",
							children: layerOptions.map((layer) => /* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2 rounded-sm px-2 py-1.5 text-xs hover:bg-muted",
								children: [
									/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: layers.includes(layer),
										onChange: () => toggleLayer(layer),
										className: "accent-primary"
									}),
									" ",
									layer
								]
							}, layer))
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute bottom-3 left-3 z-10 max-w-[520px] rounded-lg border border-border bg-card/95 p-2.5 text-xs",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-1.5 font-semibold text-foreground",
					children: "Estado del proyecto"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-x-3 gap-y-1",
					children: Object.entries(projectStateColors).map(([state, color]) => /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ jsx("i", {
							className: "size-2.5 rounded-sm",
							style: { background: color },
							"aria-hidden": true
						}), state]
					}, state))
				})]
			})
		]
	});
}
function PopupMetric({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md bg-muted p-1.5 text-center",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-sm font-bold tabular-nums text-foreground",
			children: value
		}), /* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { GeographicProjectsMap as default };
