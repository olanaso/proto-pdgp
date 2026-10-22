import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { l as diasHabilesRestantes, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { E as ETAPA_CORTA, T as ETAPA_COLOR, a as prediosDelProyecto, d as predioRows, f as prediosGeojson, i as predioDelProyecto, n as etapaDelPredio, r as padronDemostrativo, t as buscarPredios, w as ETAPAS_DE_AVANCE } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { i as recientes, n as etiquetaProyecto, u as EtapaBadge } from "./PredioEncabezado-FhqZ2Jv6.js";
import { n as DatosDemostracion } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as alertasDePlazos, t as Route$1 } from "./proyectos._projectId.index-BEW5q6c2.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Kpi } from "./Kpi-W-n9ERev.js";
import { t as FranjaAnuncios } from "./FranjaAnuncios-DOF5aRC8.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { t as DocumentosEmitidos } from "./DocumentosEmitidos-CPbPRqQu.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, CalendarCheck, CalendarClock, FolderOpen, Landmark, LayoutDashboard, ListChecks, Map, MapPinned, Search, Target } from "lucide-react";
//#region src/routes/proyectos.$projectId.index.tsx?tsr-split=component
var LISTADO = "/proyectos/$projectId/predios";
function ResumenProyecto() {
	const { projectId } = Route$1.useParams();
	const proyecto = getProyecto(projectId);
	const nombre = etiquetaProyecto(proyecto, projectId);
	const lista = useMemo(() => prediosDelProyecto(projectId), [projectId]);
	const cuenta = (f) => lista.filter(f).length;
	const porSemaforo = (s) => cuenta((p) => p.plazoFiltro === s);
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [
			/* @__PURE__ */ jsx(ProyectoEncabezado, {
				projectId,
				titulo: "Resumen del proyecto",
				icono: LayoutDashboard,
				descripcion: proyecto ? `${nombre} · ${proyecto.codigo} · ${proyecto.tipo} · ${proyecto.coordinacionPredial} · ${proyecto.fase} · ${proyecto.coordinadorPredial}` : nombre,
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ jsxs(Link, {
							to: LISTADO,
							params: { projectId },
							children: [/* @__PURE__ */ jsx(ListChecks, {}), " Listado de predios"]
						})
					}),
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/proyectos/$projectId/mapa",
							params: { projectId },
							children: [/* @__PURE__ */ jsx(Map, {}), " Mapa del proyecto"]
						})
					}),
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/proyectos/$projectId/metas",
							params: { projectId },
							children: [/* @__PURE__ */ jsx(Target, {}), " Metas del proyecto"]
						})
					})
				] })
			}),
			padronDemostrativo(projectId) && /* @__PURE__ */ jsx(DatosDemostracion, { children: "Datos de demostración: este proyecto muestra el padrón del Aeropuerto de Jauja hasta que se cargue el suyo." }),
			/* @__PURE__ */ jsx(IrAlPredio, { projectId }),
			/* @__PURE__ */ jsx(FranjaAnuncios, {
				projectId,
				variante: "tarjeta"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ jsx(KpiEnlace, {
						projectId,
						etiqueta: "Predios",
						valor: lista.length,
						detalle: `${predioRows.length} registros del padrón`,
						icono: MapPinned
					}),
					/* @__PURE__ */ jsx(KpiEnlace, {
						projectId,
						filtro: { etapaFiltro: "e8" },
						etiqueta: "Inscritos",
						valor: cuenta((p) => p.etapa.etapa === 8),
						detalle: "a favor del MTC",
						icono: Landmark
					}),
					/* @__PURE__ */ jsx(KpiEnlace, {
						projectId,
						filtro: { plazoFiltro: "verde" },
						etiqueta: "En plazo",
						valor: porSemaforo("verde"),
						detalle: "plazo legal en curso",
						icono: CalendarCheck
					}),
					/* @__PURE__ */ jsx(KpiEnlace, {
						projectId,
						filtro: { plazoFiltro: "ambar" },
						etiqueta: "Por vencer",
						valor: porSemaforo("ambar"),
						detalle: "3 d.h. o menos",
						icono: CalendarClock
					}),
					/* @__PURE__ */ jsx(KpiEnlace, {
						projectId,
						filtro: { plazoFiltro: "rojo" },
						etiqueta: "Vencidos",
						valor: porSemaforo("rojo"),
						detalle: "plazo legal vencido",
						icono: AlertTriangle
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-4 2xl:grid-cols-2",
				children: [
					/* @__PURE__ */ jsx(PrediosPorEtapa, {
						projectId,
						lista
					}),
					/* @__PURE__ */ jsx(PlazosPorAtender, {
						projectId,
						lista
					}),
					/* @__PURE__ */ jsx(MiniMapa, { projectId }),
					/* @__PURE__ */ jsx(Recientes, { projectId }),
					/* @__PURE__ */ jsx(DocumentosEmitidos, { projectId })
				]
			})
		]
	});
}
/** Cifra del resumen que lleva al listado ya filtrado. */
function KpiEnlace({ projectId, filtro, etiqueta, valor, detalle, icono }) {
	return /* @__PURE__ */ jsx(Link, {
		to: LISTADO,
		params: { projectId },
		search: filtro,
		title: `Ver en el listado: ${etiqueta.toLowerCase()}`,
		className: "block rounded-lg transition-shadow hover:shadow-md",
		children: /* @__PURE__ */ jsx(Kpi, {
			etiqueta,
			valor,
			detalle,
			icono
		})
	});
}
/** Buscador con autocompletado: Enter abre el expediente del primer resultado en su etapa actual. */
function IrAlPredio({ projectId }) {
	const navigate = useNavigate();
	const [texto, setTexto] = useState("");
	const [activo, setActivo] = useState(0);
	const [abierto, setAbierto] = useState(false);
	const resultados = useMemo(() => buscarPredios(projectId, texto, 8), [projectId, texto]);
	const abrir = (p) => navigate({
		to: p.etapa.ruta,
		params: {
			projectId,
			codigo: p.codigo
		}
	});
	const enviar = (e) => {
		e.preventDefault();
		const p = resultados[activo] ?? resultados[0];
		if (p) abrir(p);
	};
	return /* @__PURE__ */ jsxs("form", {
		role: "search",
		onSubmit: enviar,
		className: "mb-4 rounded-lg border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ jsx("label", {
				htmlFor: "ir-al-predio",
				className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
				children: "Ir al predio"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative min-w-0 flex-[1_1_16rem]",
					children: [
						/* @__PURE__ */ jsx(Search, {
							size: 16,
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": true
						}),
						/* @__PURE__ */ jsx("input", {
							id: "ir-al-predio",
							role: "combobox",
							"aria-expanded": abierto && texto.trim() !== "",
							"aria-controls": "ir-al-predio-lista",
							"aria-autocomplete": "list",
							"aria-activedescendant": abierto && resultados[activo] ? `ir-al-predio-${activo}` : void 0,
							autoComplete: "off",
							value: texto,
							onChange: (e) => {
								setTexto(e.target.value);
								setActivo(0);
								setAbierto(true);
							},
							onFocus: () => setAbierto(true),
							onBlur: () => setTimeout(() => setAbierto(false), 150),
							onKeyDown: (e) => {
								if (e.key === "ArrowDown") {
									e.preventDefault();
									setActivo((i) => Math.min(i + 1, resultados.length - 1));
								} else if (e.key === "ArrowUp") {
									e.preventDefault();
									setActivo((i) => Math.max(i - 1, 0));
								} else if (e.key === "Escape") setAbierto(false);
							},
							placeholder: "Código, sujeto pasivo, partida o resolución",
							className: `${controlClase} pl-9`
						}),
						abierto && texto.trim() && /* @__PURE__ */ jsx("ul", {
							id: "ir-al-predio-lista",
							role: "listbox",
							"aria-label": "Predios que coinciden",
							className: "absolute left-0 right-0 top-full z-30 mt-1 max-h-80 overflow-y-auto rounded-md border border-border bg-card p-1 shadow-md",
							children: resultados.length === 0 ? /* @__PURE__ */ jsxs("li", {
								className: "px-3 py-2 text-sm text-muted-foreground",
								children: [
									"Ningún predio coincide con «",
									texto.trim(),
									"»."
								]
							}) : resultados.map((p, i) => /* @__PURE__ */ jsx("li", {
								id: `ir-al-predio-${i}`,
								role: "option",
								"aria-selected": i === activo,
								children: /* @__PURE__ */ jsxs("button", {
									type: "button",
									onMouseEnter: () => setActivo(i),
									onMouseDown: (e) => e.preventDefault(),
									onClick: () => abrir(p),
									className: `flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-left ${i === activo ? "bg-primary-soft" : "hover:bg-muted"}`,
									children: [/* @__PURE__ */ jsxs("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "block truncate font-mono text-xs font-semibold text-foreground",
											children: p.cod
										}), /* @__PURE__ */ jsx("span", {
											className: "block truncate text-xs text-muted-foreground",
											children: p.sujeto
										})]
									}), /* @__PURE__ */ jsx(EtapaBadge, { etapa: p.etapa })]
								})
							}, p.codigo))
						})
					]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "submit",
					disabled: resultados.length === 0,
					children: [/* @__PURE__ */ jsx(FolderOpen, {}), " Abrir expediente"]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "Abre el expediente en la pantalla de la etapa en que está el predio. Desde cualquier pantalla, Ctrl+K también busca predios."
			})
		]
	});
}
function PrediosPorEtapa({ projectId, lista }) {
	const filas = ETAPAS_DE_AVANCE.map((n) => ({
		etapa: n,
		total: lista.filter((p) => p.etapa.etapa === n).length
	}));
	const maximo = Math.max(1, ...filas.map((f) => f.total));
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Predios por etapa",
		acciones: /* @__PURE__ */ jsx(Link, {
			to: LISTADO,
			params: { projectId },
			className: "text-xs font-medium text-primary-dark hover:underline",
			children: "Ver listado"
		}),
		children: [/* @__PURE__ */ jsx("ul", {
			className: "space-y-1",
			children: filas.map((f) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
				to: LISTADO,
				params: { projectId },
				search: { etapaFiltro: `e${f.etapa}` },
				className: "grid grid-cols-[9.5rem_1fr_3rem] items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "size-2.5 shrink-0 rounded-sm",
							style: { background: ETAPA_COLOR[f.etapa] },
							"aria-hidden": true
						}), /* @__PURE__ */ jsxs("span", {
							className: "truncate",
							children: [
								f.etapa,
								" · ",
								ETAPA_CORTA[f.etapa]
							]
						})]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "h-2 overflow-hidden rounded-sm bg-muted",
						"aria-hidden": true,
						children: /* @__PURE__ */ jsx("span", {
							className: "block h-full bg-primary",
							style: { width: `${f.total / maximo * 100}%` }
						})
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-right font-semibold tabular-nums",
						children: f.total
					})
				]
			}) }, f.etapa))
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: "La etapa se deduce del último hito que registra el padrón (resolución, devengado, título, inscripción)."
		})]
	});
}
/** Por vencer primero (el más próximo arriba); luego vencidos, del más reciente al más antiguo. */
var prioridad = (p) => p.semaforo === "ambar" ? p.restantes : 1e6 - p.restantes;
function PlazosPorAtender({ projectId, lista }) {
	const [delExpediente, setDelExpediente] = useState([]);
	useEffect(() => {
		setDelExpediente(alertasDePlazos().filter((a) => a.estado !== "verde" && predioDelProyecto(a.registro)).map((a) => ({
			clave: a.id,
			codigo: a.registro,
			texto: a.texto,
			vence: a.vence,
			semaforo: a.estado,
			restantes: diasHabilesRestantes(a.vence),
			ruta: a.ruta.replace(/^\/proyectos\/[^/]+\//, `/proyectos/${projectId}/`)
		})));
	}, [projectId]);
	const delPadron = lista.flatMap((p) => p.etapa.plazo && p.etapa.plazo.semaforo !== "verde" ? [{
		clave: p.codigo,
		codigo: p.codigo,
		texto: `${p.etapa.plazo.nombre} (art. ${p.etapa.plazo.articulo})`,
		vence: p.etapa.plazo.vence,
		semaforo: p.etapa.plazo.semaforo,
		restantes: p.etapa.plazo.restantes,
		ruta: p.etapa.ruta.replace("$projectId", projectId).replace("$codigo", encodeURIComponent(p.codigo))
	}] : []);
	const todos = [...delExpediente, ...delPadron].sort((a, b) => prioridad(a) - prioridad(b));
	const vencidos = todos.filter((p) => p.semaforo === "rojo").length;
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Plazos por atender",
		acciones: vencidos > 0 ? /* @__PURE__ */ jsxs(Link, {
			to: LISTADO,
			params: { projectId },
			search: { plazoFiltro: "rojo" },
			className: "text-xs font-medium text-primary-dark hover:underline",
			children: [
				"Ver los ",
				vencidos,
				" vencidos"
			]
		}) : void 0,
		children: [todos.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "py-6 text-center text-sm text-muted-foreground",
			children: "Ningún predio tiene un plazo legal vencido o por vencer con fecha de inicio registrada."
		}) : /* @__PURE__ */ jsx("ul", {
			className: "divide-y divide-border",
			children: todos.slice(0, 6).map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
				to: p.ruta,
				className: "flex flex-wrap items-center gap-x-3 gap-y-1 px-1 py-2 hover:bg-muted",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ jsx("span", {
						className: "block truncate font-mono text-xs font-semibold text-foreground",
						children: predioDelProyecto(p.codigo)?.cod ?? p.codigo
					}), /* @__PURE__ */ jsx("span", {
						className: "block truncate text-xs text-muted-foreground",
						children: p.texto
					})]
				}), /* @__PURE__ */ jsx(PlazoBadge, { vence: p.vence })]
			}) }, p.clave))
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: "Plazos del TUO del DL 1192 que corren desde una fecha registrada en el padrón o en el expediente del predio."
		})]
	});
}
var miniatura = null;
/** Contornos del padrón proyectados a un SVG de 400 px de ancho. Se calcula una vez. */
function construirMiniatura() {
	if (miniatura) return miniatura;
	const anillos = [];
	for (const f of prediosGeojson.features) {
		const p = f.properties ?? {};
		const codigo = String(p.codigopred ?? p.match_codigo_geojson ?? "");
		const g = f.geometry;
		if (!g) continue;
		const poligonos = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
		for (const pol of poligonos) if (pol[0]) anillos.push({
			puntos: pol[0],
			codigo
		});
	}
	const todos = anillos.flatMap((a) => a.puntos);
	const lngs = todos.map((c) => c[0]);
	const lats = todos.map((c) => c[1]);
	const [minLng, maxLng, minLat, maxLat] = [
		Math.min(...lngs),
		Math.max(...lngs),
		Math.min(...lats),
		Math.max(...lats)
	];
	const kx = Math.cos((minLat + maxLat) / 2 * Math.PI / 180);
	const ancho = 400;
	const escala = ancho / ((maxLng - minLng) * kx || 1);
	miniatura = {
		ancho,
		alto: Math.max(1, (maxLat - minLat) * escala),
		poligonos: anillos.map((a) => ({
			etapa: etapaDelPredio(a.codigo)?.etapa ?? 1,
			d: a.puntos.map(([lng, lat], i) => `${i ? "L" : "M"}${((lng - minLng) * kx * escala).toFixed(1)} ${((maxLat - lat) * escala).toFixed(1)}`).join("") + "Z"
		}))
	};
	return miniatura;
}
function MiniMapa({ projectId }) {
	const m = useMemo(construirMiniatura, []);
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Mapa del proyecto",
		acciones: /* @__PURE__ */ jsx(Link, {
			to: "/proyectos/$projectId/mapa",
			params: { projectId },
			className: "text-xs font-medium text-primary-dark hover:underline",
			children: "Abrir mapa"
		}),
		children: [/* @__PURE__ */ jsx(Link, {
			to: "/proyectos/$projectId/mapa",
			params: { projectId },
			className: "block rounded-md bg-muted p-3 hover:ring-2 hover:ring-primary/30",
			children: /* @__PURE__ */ jsx("svg", {
				viewBox: `0 0 ${m.ancho} ${m.alto}`,
				role: "img",
				"aria-label": `Miniatura del padrón: ${m.poligonos.length} polígonos coloreados por etapa. Abre el mapa del proyecto.`,
				className: "mx-auto max-h-64 w-full",
				preserveAspectRatio: "xMidYMid meet",
				children: m.poligonos.map((p, i) => /* @__PURE__ */ jsx("path", {
					d: p.d,
					fill: ETAPA_COLOR[p.etapa],
					fillOpacity: .75,
					stroke: ETAPA_COLOR[p.etapa],
					strokeWidth: .5
				}, i))
			})
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-2 text-xs text-muted-foreground",
			children: "Los colores son los de la leyenda «Predios por etapa»."
		})]
	});
}
function Recientes({ projectId }) {
	const [codigos, setCodigos] = useState([]);
	useEffect(() => setCodigos(recientes(projectId)), [projectId]);
	const predios = codigos.map((c) => predioDelProyecto(c)).filter((p) => Boolean(p));
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Últimos predios abiertos",
		children: predios.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "py-6 text-center text-sm text-muted-foreground",
			children: "Aún no abrió predios en esta sesión. Los últimos cinco aparecerán aquí."
		}) : /* @__PURE__ */ jsx("ul", {
			className: "divide-y divide-border",
			children: predios.map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
				to: p.etapa.ruta,
				params: {
					projectId,
					codigo: p.codigo
				},
				className: "flex items-center gap-3 px-1 py-2 hover:bg-muted",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ jsx("span", {
						className: "block truncate font-mono text-xs font-semibold text-foreground",
						children: p.cod
					}), /* @__PURE__ */ jsx("span", {
						className: "block truncate text-xs text-muted-foreground",
						children: p.sujeto
					})]
				}), /* @__PURE__ */ jsx(EtapaBadge, { etapa: p.etapa })]
			}) }, p.codigo))
		})
	});
}
//#endregion
export { ResumenProyecto as component };
