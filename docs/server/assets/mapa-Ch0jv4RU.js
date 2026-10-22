import "./Form-DtuiyqJ8.js";
import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import "./router-C59nnwpC.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, CircleAlert, Construction, ExternalLink, Layers3, LoaderCircle, Map, MapPin, PanelLeftClose, PanelLeftOpen, Plane, RotateCcw, Route, Satellite, Search, TrainFront, X } from "lucide-react";
import { Map as Map$1, Marker, NavigationControl, Popup, ScaleControl } from "react-map-gl/maplibre";
//#region src/routes/mapa.tsx?tsr-split=component
var PROJECTS_GEOJSON_URL = `/data/proyectos.geojson`;
var DDP_TMS_URL = "http://3.233.4.153:8080/geoserver/gwc/service/tms/1.0.0/ddp%3Ageo_ddp_area_proyecto@EPSG%3A900913@png8/{z}/{x}/{y}.png8";
var DEPARTMENT_LIMITS_TMS_URL = "http://3.233.4.153:8080/geoserver/gwc/service/tms/1.0.0/ddp%3Ageo_limite_departamento@EPSG%3A900913@png8/{z}/{x}/{y}.png8";
var PERU_VIEW = {
	longitude: -75.05,
	latitude: -9.25,
	zoom: 4.45
};
var infrastructureSpecs = {
	AEROPORTUARIO: {
		label: "Aeroportuario",
		icon: Plane,
		clase: "bg-primary text-primary-foreground",
		suave: "bg-primary-soft text-primary-dark"
	},
	VIAL: {
		label: "Vial",
		icon: Construction,
		clase: "bg-success text-primary-foreground",
		suave: "bg-success-soft text-success"
	},
	"VIAS CONCESIONADAS": {
		label: "Vías concesionadas",
		icon: Route,
		clase: "bg-warning text-primary-foreground",
		suave: "bg-warning-soft text-warning"
	},
	FERROVIARIO: {
		label: "Ferroviario",
		icon: TrainFront,
		clase: "bg-foreground text-primary-foreground",
		suave: "bg-muted text-foreground"
	}
};
var projectRouteAliases = {
	"autopista del sol": "autopista-del-sol",
	"desvio quilca la concordia": "dv-quilca-la-concordia",
	"huaral acos": "dv-huaral-acos",
	"iirsa centro tramo 2": "iirsa-centro",
	"iirsa norte": "iirsa-norte",
	"iirsa sur tramo 2": "iirsa-sur-t2",
	"iirsa sur tramo 3": "iirsa-sur-t3",
	"iirsa sur tramo 4": "iirsa-sur-t4",
	"iirsa sur tramo 5 puno juliaca": "carretera-puno-juliaca",
	"longitudinal de la sierra norte tramo 2": "longitudinal-de-la-sierra-t2",
	"longitudinal de la sierra tramo 04": "longitudinal-de-la-sierra-t4",
	"nuevo mocupe cayalti": "dv-nuevo-mocupe-cayalti",
	"red vial 4": "red-vial-4",
	"red vial 5": "red-vial-5",
	"red vial 6": "red-vial-6",
	"anillo vial periferico avp": "anillo-vial-periferico",
	"ferrocarril huancayo huancavelica": "fhh"
};
function ProjectsMapPage() {
	const mapRef = useRef(null);
	const [projects, setProjects] = useState([]);
	const [selected, setSelected] = useState(null);
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState("TODOS");
	const [baseMap, setBaseMap] = useState("satelital");
	const [showDdpLayer, setShowDdpLayer] = useState(true);
	const [showDepartmentLimits, setShowDepartmentLimits] = useState(true);
	const [listOpen, setListOpen] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		const controller = new AbortController();
		async function loadProjects() {
			try {
				const response = await fetch(PROJECTS_GEOJSON_URL, { signal: controller.signal });
				if (!response.ok) throw new Error(`No se pudo cargar el GeoJSON (${response.status}).`);
				const geojson = await response.json();
				if (geojson.type !== "FeatureCollection" || !Array.isArray(geojson.features)) throw new Error("El archivo no contiene una colección GeoJSON válida.");
				const parsed = geojson.features.filter((feature) => feature.geometry?.type === "Point" && Number.isFinite(Number(feature.geometry.coordinates?.[0])) && Number.isFinite(Number(feature.geometry.coordinates?.[1]))).map((feature, index) => {
					const [longitude, latitude] = feature.geometry.coordinates;
					return {
						...feature.properties,
						id: `${feature.properties.ITEM}-${index}`,
						longitude: Number(longitude),
						latitude: Number(latitude),
						projectId: resolveProjectId(feature.properties.PROYECTO)
					};
				}).sort((a, b) => a.PROYECTO.localeCompare(b.PROYECTO, "es"));
				setProjects(parsed);
			} catch (loadError) {
				if (loadError.name !== "AbortError") setError(loadError.message || "No se pudo cargar la información de proyectos.");
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}
		loadProjects();
		return () => controller.abort();
	}, []);
	const infrastructureTypes = useMemo(() => Array.from(new Set(projects.map((project) => project.TIPO_INFRA))).sort(), [projects]);
	const filteredProjects = useMemo(() => {
		const query = normalizeText(search);
		return projects.filter((project) => {
			if (typeFilter !== "TODOS" && project.TIPO_INFRA !== typeFilter) return false;
			if (!query) return true;
			return normalizeText(`${project.PROYECTO} ${project.DENOMINACI} ${project.DEPARTAMEN} ${project.UBICACION} ${project.GRUPO}`).includes(query);
		});
	}, [
		projects,
		search,
		typeFilter
	]);
	const mapStyle = useMemo(() => {
		return {
			version: 8,
			sources: {
				base: {
					type: "raster",
					tileSize: 256,
					...baseMap === "satelital" ? {
						tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
						attribution: "Esri World Imagery"
					} : baseMap === "claro" ? {
						tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"],
						attribution: "© OpenStreetMap contributors © CARTO"
					} : {
						tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
						attribution: "© OpenStreetMap contributors"
					}
				},
				ddpProjects: {
					type: "raster",
					tiles: [DDP_TMS_URL],
					tileSize: 256,
					scheme: "tms",
					minzoom: 0,
					maxzoom: 20,
					bounds: [
						-90,
						-22.5,
						-67.5,
						0
					],
					attribution: "Dirección de Disponibilidad de Predios, MTC"
				},
				departmentLimits: {
					type: "raster",
					tiles: [DEPARTMENT_LIMITS_TMS_URL],
					tileSize: 256,
					scheme: "tms",
					minzoom: 1,
					maxzoom: 22,
					bounds: [
						-90,
						-22.5,
						-67.5,
						0
					],
					attribution: "Límites departamentales, MTC"
				}
			},
			layers: [
				{
					id: "base",
					type: "raster",
					source: "base",
					paint: {
						"raster-saturation": baseMap === "satelital" ? -.12 : -.25,
						"raster-brightness-max": baseMap === "satelital" ? .82 : 1
					}
				},
				{
					id: "ddp-project-areas",
					type: "raster",
					source: "ddpProjects",
					layout: { visibility: showDdpLayer ? "visible" : "none" },
					paint: { "raster-opacity": .86 }
				},
				{
					id: "department-limits",
					type: "raster",
					source: "departmentLimits",
					layout: { visibility: showDepartmentLimits ? "visible" : "none" },
					paint: { "raster-opacity": 1 }
				}
			]
		};
	}, [
		baseMap,
		showDdpLayer,
		showDepartmentLimits
	]);
	function selectProject(project) {
		setSelected(project);
		mapRef.current?.flyTo({
			center: [project.longitude, project.latitude],
			zoom: Math.max(mapRef.current.getZoom(), 7.2),
			duration: 900,
			essential: true
		});
	}
	function resetView() {
		setSelected(null);
		mapRef.current?.flyTo({
			center: [PERU_VIEW.longitude, PERU_VIEW.latitude],
			zoom: PERU_VIEW.zoom,
			duration: 900
		});
	}
	return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsxs("div", {
		className: "flex h-[calc(100vh-3.5rem-2rem)] flex-col",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			icono: Map,
			titulo: "Mapa nacional de proyectos",
			descripcion: "Dirección de Disponibilidad de Predios · Cobertura nacional",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(StatusBadge, {
				tono: "primary",
				children: [projects.length, " proyectos georreferenciados"]
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/proyectos",
					children: [/* @__PURE__ */ jsx(ExternalLink, {}), " Ver lista de proyectos"]
				})
			})] })
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex min-h-0 flex-1 overflow-hidden rounded-lg border border-border bg-card",
			children: [listOpen && /* @__PURE__ */ jsxs("aside", {
				className: "flex w-[340px] shrink-0 flex-col border-r border-border bg-card",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "border-b border-border p-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-2 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-sm font-bold uppercase text-primary-dark",
								children: "Listado de proyectos"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground",
								children: [
									filteredProjects.length,
									" de ",
									projects.length,
									" visibles"
								]
							})] }), /* @__PURE__ */ jsx(Button, {
								type: "button",
								size: "icon",
								variant: "ghost",
								className: "size-8",
								onClick: () => setListOpen(false),
								"aria-label": "Ocultar listado de proyectos",
								title: "Ocultar listado",
								children: /* @__PURE__ */ jsx(PanelLeftClose, {})
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "relative block",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "sr-only",
									children: "Buscar proyecto"
								}),
								/* @__PURE__ */ jsx(Search, {
									size: 16,
									className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": true
								}),
								/* @__PURE__ */ jsx("input", {
									value: search,
									onChange: (event) => setSearch(event.target.value),
									placeholder: "Buscar proyecto, región o grupo",
									className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted pl-9 pr-9`
								}),
								search && /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setSearch(""),
									className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground",
									"aria-label": "Limpiar búsqueda",
									children: /* @__PURE__ */ jsx(X, { size: 16 })
								})
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "mt-2 block",
							children: [/* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "Tipo de infraestructura"
							}), /* @__PURE__ */ jsxs("select", {
								value: typeFilter,
								onChange: (event) => setTypeFilter(event.target.value),
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								children: [/* @__PURE__ */ jsx("option", {
									value: "TODOS",
									children: "Todos los tipos de infraestructura"
								}), infrastructureTypes.map((type) => /* @__PURE__ */ jsxs("option", {
									value: type,
									children: [
										getInfrastructureSpec(type).label,
										" (",
										projects.filter((project) => project.TIPO_INFRA === type).length,
										")"
									]
								}, type))]
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-h-0 flex-1 overflow-y-auto",
					children: [
						loading && /* @__PURE__ */ jsxs("p", {
							className: "flex items-center justify-center gap-2 px-4 py-8 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx(LoaderCircle, {
									size: 16,
									className: "animate-spin text-primary",
									"aria-hidden": true
								}),
								" ",
								"Cargando proyectos"
							]
						}),
						error && /* @__PURE__ */ jsxs("p", {
							role: "alert",
							className: "m-3 flex items-start gap-2 rounded-md border border-destructive bg-destructive-soft p-3 text-sm text-destructive",
							children: [/* @__PURE__ */ jsx(CircleAlert, {
								size: 16,
								className: "mt-0.5 shrink-0",
								"aria-hidden": true
							}), /* @__PURE__ */ jsx("span", { children: error })]
						}),
						!loading && !error && filteredProjects.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "px-5 py-10 text-center text-sm text-muted-foreground",
							children: "No se encontraron proyectos con los filtros seleccionados."
						}),
						filteredProjects.map((project) => /* @__PURE__ */ jsx(ProjectListItem, {
							project,
							active: selected?.id === project.id,
							onSelect: () => selectProject(project)
						}, project.id))
					]
				})]
			}), /* @__PURE__ */ jsxs("section", {
				className: "relative min-w-0 flex-1 bg-muted",
				children: [
					/* @__PURE__ */ jsxs(Map$1, {
						ref: mapRef,
						initialViewState: PERU_VIEW,
						mapStyle,
						style: {
							width: "100%",
							height: "100%"
						},
						attributionControl: { compact: true },
						dragPan: true,
						scrollZoom: true,
						doubleClickZoom: true,
						touchZoomRotate: true,
						keyboard: true,
						minZoom: 2.5,
						onClick: () => setSelected(null),
						children: [
							/* @__PURE__ */ jsx(NavigationControl, {
								position: "bottom-right",
								showCompass: false
							}),
							/* @__PURE__ */ jsx(ScaleControl, {
								position: "bottom-left",
								unit: "metric"
							}),
							filteredProjects.map((project) => {
								const spec = getInfrastructureSpec(project.TIPO_INFRA);
								const Icon = spec.icon;
								const isSelected = selected?.id === project.id;
								return /* @__PURE__ */ jsx(Marker, {
									longitude: project.longitude,
									latitude: project.latitude,
									anchor: "bottom",
									children: /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: (event) => {
											event.stopPropagation();
											selectProject(project);
										},
										className: `group relative flex size-8 items-center justify-center rounded-md border-2 border-card ${spec.clase} ${isSelected ? "z-10 ring-2 ring-primary ring-offset-2" : "hover:z-10"}`,
										"aria-label": `Ver ${project.PROYECTO}`,
										"aria-pressed": isSelected,
										title: project.PROYECTO,
										children: [/* @__PURE__ */ jsx(Icon, { size: 16 }), /* @__PURE__ */ jsx("span", {
											className: "absolute bottom-9 left-1/2 hidden w-max max-w-60 -translate-x-1/2 rounded-sm bg-foreground px-2 py-1 text-xs font-medium text-primary-foreground group-hover:block",
											children: project.PROYECTO
										})]
									})
								}, project.id);
							}),
							selected && /* @__PURE__ */ jsx(Popup, {
								longitude: selected.longitude,
								latitude: selected.latitude,
								offset: 36,
								closeButton: false,
								closeOnClick: false,
								maxWidth: "360px",
								onClose: () => setSelected(null),
								children: /* @__PURE__ */ jsx(ProjectPopup, {
									project: selected,
									onClose: () => setSelected(null)
								})
							})
						]
					}),
					!listOpen && /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						className: "absolute left-3 top-3 z-10",
						onClick: () => setListOpen(true),
						children: [/* @__PURE__ */ jsx(PanelLeftOpen, {}), " Mostrar proyectos"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "absolute right-3 top-3 z-10 w-52 overflow-hidden rounded-lg border border-border bg-card/95",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 border-b border-border px-3 py-2 text-xs font-semibold uppercase text-primary-dark",
							children: [/* @__PURE__ */ jsx(Layers3, {
								size: 16,
								className: "text-primary",
								"aria-hidden": true
							}), " Capas del mapa"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1 p-2 text-sm",
							children: [
								/* @__PURE__ */ jsx(MapOption, {
									checked: baseMap === "calles",
									label: "Mapa de calles",
									icon: Map,
									onChange: () => setBaseMap("calles")
								}),
								/* @__PURE__ */ jsx(MapOption, {
									checked: baseMap === "satelital",
									label: "Mapa satelital",
									icon: Satellite,
									onChange: () => setBaseMap("satelital")
								}),
								/* @__PURE__ */ jsx(MapOption, {
									checked: baseMap === "claro",
									label: "Mapa claro",
									icon: Map,
									onChange: () => setBaseMap("claro")
								}),
								/* @__PURE__ */ jsx("div", { className: "my-1.5 border-t border-border" }),
								/* @__PURE__ */ jsxs("label", {
									className: "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-muted",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: showDdpLayer,
										onChange: (event) => setShowDdpLayer(event.target.checked),
										className: "size-4 accent-primary"
									}), /* @__PURE__ */ jsx("span", {
										className: "flex-1",
										children: "Áreas de proyecto DDP"
									})]
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-muted",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: showDepartmentLimits,
										onChange: (event) => setShowDepartmentLimits(event.target.checked),
										className: "size-4 accent-primary"
									}), /* @__PURE__ */ jsx("span", {
										className: "flex-1",
										children: "Límites departamentales"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "button",
						size: "icon",
						variant: "outline",
						className: "absolute bottom-24 right-3 z-10",
						onClick: resetView,
						"aria-label": "Volver a la vista nacional",
						title: "Vista nacional",
						children: /* @__PURE__ */ jsx(RotateCcw, {})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "absolute bottom-3 left-3 z-10 max-w-[calc(100%-120px)] rounded-lg border border-border bg-card/95 px-3 py-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-1.5 text-xs font-semibold uppercase text-primary-dark",
							children: "Tipo de infraestructura"
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-x-3 gap-y-1",
							children: Object.entries(infrastructureSpecs).map(([type, spec]) => {
								const Icon = spec.icon;
								const active = typeFilter === type;
								return /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => setTypeFilter(active ? "TODOS" : type),
									"aria-pressed": active,
									className: `flex items-center gap-1.5 rounded-md text-xs ${active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ jsx("span", {
										"aria-hidden": true,
										className: `flex size-4 items-center justify-center rounded-sm ${spec.clase}`,
										children: /* @__PURE__ */ jsx(Icon, { size: 10 })
									}), spec.label]
								}, type);
							})
						})]
					})
				]
			})]
		})]
	}) });
}
function ProjectListItem({ project, active, onSelect }) {
	const spec = getInfrastructureSpec(project.TIPO_INFRA);
	const Icon = spec.icon;
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick: onSelect,
		"aria-pressed": active,
		className: `flex w-full items-center gap-2.5 border-b border-l-2 border-border px-3 py-2.5 text-left ${active ? "border-l-primary bg-primary-soft" : "border-l-transparent hover:bg-muted"}`,
		children: [
			/* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				className: `flex size-8 shrink-0 items-center justify-center rounded-md ${spec.suave}`,
				children: /* @__PURE__ */ jsx(Icon, { size: 16 })
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsx("span", {
					className: "block truncate text-sm font-semibold",
					children: project.PROYECTO
				}), /* @__PURE__ */ jsxs("span", {
					className: "mt-0.5 block truncate text-xs text-muted-foreground",
					children: [
						project.DEPARTAMEN || "Sin departamento",
						" · ",
						project.GRUPO || "Sin grupo"
					]
				})]
			}),
			active ? /* @__PURE__ */ jsx(ChevronLeft, {
				size: 16,
				className: "shrink-0 text-primary",
				"aria-hidden": true
			}) : /* @__PURE__ */ jsx(ChevronRight, {
				size: 16,
				className: "shrink-0 text-muted-foreground",
				"aria-hidden": true
			})
		]
	});
}
function ProjectPopup({ project, onClose }) {
	const spec = getInfrastructureSpec(project.TIPO_INFRA);
	const Icon = spec.icon;
	const imageUrl = getProjectImageUrl(project);
	return /* @__PURE__ */ jsxs("div", {
		className: "w-[310px] max-w-full text-foreground",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: `relative mb-2 h-24 overflow-hidden rounded-md ${spec.suave}`,
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "absolute inset-0 flex items-center justify-center",
						"aria-hidden": true,
						children: /* @__PURE__ */ jsx(Icon, {
							size: 32,
							strokeWidth: 1.5
						})
					}),
					imageUrl && /* @__PURE__ */ jsx("img", {
						src: imageUrl,
						alt: `Vista referencial de ${project.PROYECTO}`,
						className: "relative size-full object-cover",
						loading: "lazy",
						onError: (event) => {
							event.currentTarget.style.display = "none";
						}
					}),
					/* @__PURE__ */ jsx("span", {
						className: "absolute bottom-2 left-2 rounded-sm bg-card/90 px-2 py-0.5 text-xs font-semibold text-muted-foreground",
						children: "Imagen referencial"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-2.5 border-b border-border pb-2",
				children: [
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": true,
						className: `flex size-9 shrink-0 items-center justify-center rounded-md ${spec.suave}`,
						children: /* @__PURE__ */ jsx(Icon, { size: 16 })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: [
								spec.label,
								" · Ítem ",
								project.ITEM
							]
						}), /* @__PURE__ */ jsx("h3", {
							className: "mt-0.5 text-sm font-bold leading-snug",
							children: project.PROYECTO
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground",
						"aria-label": "Cerrar detalle",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ jsxs("dl", {
				className: "mt-2 grid grid-cols-[96px_1fr] gap-x-2 gap-y-1.5 text-xs",
				children: [
					/* @__PURE__ */ jsx("dt", {
						className: "font-medium text-muted-foreground",
						children: "Denominación"
					}),
					/* @__PURE__ */ jsx("dd", {
						className: "font-medium",
						children: project.DENOMINACI || "Sin información"
					}),
					/* @__PURE__ */ jsx("dt", {
						className: "font-medium text-muted-foreground",
						children: "Departamento"
					}),
					/* @__PURE__ */ jsx("dd", { children: project.DEPARTAMEN || "Sin información" }),
					/* @__PURE__ */ jsx("dt", {
						className: "font-medium text-muted-foreground",
						children: "Ubicación"
					}),
					/* @__PURE__ */ jsx("dd", { children: project.UBICACION || "Sin información" }),
					/* @__PURE__ */ jsx("dt", {
						className: "font-medium text-muted-foreground",
						children: "Grupo"
					}),
					/* @__PURE__ */ jsx("dd", { children: project.GRUPO || "Sin información" }),
					/* @__PURE__ */ jsx("dt", {
						className: "font-medium text-muted-foreground",
						children: "Coordenadas"
					}),
					/* @__PURE__ */ jsxs("dd", {
						className: "tabular-nums",
						children: [
							project.latitude.toFixed(5),
							", ",
							project.longitude.toFixed(5)
						]
					})
				]
			}),
			project.projectId ? /* @__PURE__ */ jsx(Button, {
				asChild: true,
				className: "mt-3 w-full",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/proyectos/$projectId",
					params: { projectId: project.projectId },
					children: [/* @__PURE__ */ jsx(MapPin, {}), " Abrir gestión del proyecto"]
				})
			}) : /* @__PURE__ */ jsx("p", {
				className: "mt-3 rounded-md border border-border bg-background px-2.5 py-2 text-xs text-muted-foreground",
				children: "Proyecto disponible solo en el visor geográfico."
			})
		]
	});
}
function MapOption({ checked, label, icon: Icon, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-muted",
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "radio",
				name: "base-map",
				checked,
				onChange,
				className: "size-4 accent-primary"
			}),
			/* @__PURE__ */ jsx(Icon, {
				size: 16,
				className: "text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("span", { children: label })
		]
	});
}
function getInfrastructureSpec(type) {
	return infrastructureSpecs[type] ?? {
		label: type || "Otro",
		icon: MapPin,
		clase: "bg-muted-foreground text-primary-foreground",
		suave: "bg-muted text-muted-foreground"
	};
}
function getProjectImageUrl(project) {
	const matchingProject = project.projectId ? proyectos.find((item) => item.id === project.projectId) : void 0;
	if (matchingProject?.img) return matchingProject.img;
	const fallbackProjectId = project.TIPO_INFRA === "AEROPORTUARIO" ? "iquitos" : project.TIPO_INFRA === "FERROVIARIO" ? "fhh" : "autopista-del-sol";
	return proyectos.find((item) => item.id === fallbackProjectId)?.img;
}
function normalizeText(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function getComparableProjectName(value) {
	return normalizeText(value).replace(/^(aeropuerto|aerodromo)\s+(de\s+)?/, "").replace(/^pvc\s+/, "").trim();
}
function resolveProjectId(projectName) {
	const comparableName = getComparableProjectName(projectName);
	const aliasedId = projectRouteAliases[comparableName];
	if (aliasedId) return aliasedId;
	return proyectos.find((project) => {
		const candidate = getComparableProjectName(project.nombre);
		return candidate === comparableName || candidate.includes(comparableName) || comparableName.includes(candidate);
	})?.id;
}
//#endregion
export { ProjectsMapPage as component };
