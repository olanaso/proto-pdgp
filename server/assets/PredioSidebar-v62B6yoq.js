import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio } from "./archivosIdb-BbjJAFd8.js";
import { B as routeByKey, D as etapaDeFila, L as iconByKey, O as buildPredioSummary, a as prediosDelProyecto, n as etapaDelPredio, s as getPredioByCodigo, z as menuDelPredio } from "./prediosProyecto-D1ASzaVD.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { p as BITACORA_EVENTO } from "./historial-Bc37nCTn.js";
import { L as delPaso, P as avancePaso, it as useItems, rt as useCatalogo } from "./sujetoPasivo-Cz4oBCnt.js";
import { J as usePerfilPredio, K as textoPerfil, Y as varianteDe, d as PlazoPredioBadge, ft as codigoAsignado, i as recientes, xt as useCodigos } from "./PredioEncabezado-FhqZ2Jv6.js";
import { d as PopoverContent, f as PopoverTrigger, l as useSidebarColapsado, u as Popover } from "./AppShell-C-aaMtOy.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, ArrowLeft, BadgeCheck, Building2, CalendarClock, Check, ChevronDown, ChevronsUpDown, CircleAlert, CircleDashed, FileText, FolderOpen, Landmark, Lock, MapPinned, Route, Search, UserRound } from "lucide-react";
//#region src/components/shell/PredioResumen.tsx
var TONO = {
	privado: "primary",
	estatal: "neutral",
	mejoras: "warning",
	"sin-clasificar": "neutral"
};
var NOMBRE = {
	privado: "Predio privado",
	estatal: "Predio estatal",
	mejoras: "Reconocimiento de mejoras",
	"sin-clasificar": "Sin clasificar"
};
function oPendiente(v) {
	const t = v?.trim();
	return !t || t.toUpperCase() === "SIN INFORMACION" ? "Pendiente de registrar" : t;
}
function Dato({ etiqueta, valor, icono: Icono }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex gap-2 border-b border-border py-2 last:border-b-0",
		children: [/* @__PURE__ */ jsx(Icono, {
			size: 16,
			className: "mt-0.5 shrink-0 text-primary",
			"aria-hidden": true
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: etiqueta
			}), /* @__PURE__ */ jsx("p", {
				className: "break-words text-sm font-medium",
				children: valor
			})]
		})]
	});
}
/** Resumen de solo lectura del predio activo. Va en el panel lateral del AppShell. */
function PredioResumen({ codigo }) {
	const registro = useCodigos();
	const predio = getPredioByCodigo(codigo);
	if (!predio) return /* @__PURE__ */ jsxs("div", {
		className: "sticky top-[4.5rem] rounded-lg border border-border bg-card p-6 text-center",
		children: [
			/* @__PURE__ */ jsx(AlertCircle, {
				size: 24,
				className: "mx-auto text-destructive",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm font-semibold",
				children: "Predio no encontrado"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					"No hay información consolidada para el código ",
					codigo,
					"."
				]
			})
		]
	});
	const r = buildPredioSummary(predio);
	const etapa = etapaDelPredio(codigo);
	const expediente = codigoAsignado(registro, codigo, "expediente") ?? predio.exp;
	return /* @__PURE__ */ jsxs("div", {
		className: "sticky top-[4.5rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-lg border border-border bg-card",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "border-b-2 border-primary px-4 py-3",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-sm font-bold uppercase text-primary-dark",
					children: "Predio activo"
				}), /* @__PURE__ */ jsx("p", {
					className: "truncate text-sm font-semibold",
					title: codigo,
					children: codigo
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4 p-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ jsx(StatusBadge, {
							tono: TONO[r.processKind],
							children: NOMBRE[r.processKind]
						}), /* @__PURE__ */ jsx(StatusBadge, { children: r.sourceStatus })]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "rounded-md border border-border bg-background p-3",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ jsx(Route, {
								size: 16,
								className: "mt-0.5 shrink-0 text-primary",
								"aria-hidden": true
							}), /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "Ruta de gestión"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-sm font-semibold",
										children: r.condition
									}),
									/* @__PURE__ */ jsx("p", {
										className: `text-sm ${r.modalityPending ? "font-semibold text-warning" : "text-muted-foreground"}`,
										children: r.modality
									}),
									r.conditionInferred && /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Condición inferida de la modalidad registrada."
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-primary-dark",
						children: [/* @__PURE__ */ jsx(CalendarClock, {
							size: 16,
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("h3", {
							className: "text-xs font-bold uppercase",
							children: "Etapa actual"
						})]
					}), etapa && /* @__PURE__ */ jsxs(Fragment$1, { children: [
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 text-sm font-semibold",
							children: [
								"Etapa ",
								etapa.etapa,
								" · ",
								etapa.nombre
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							children: ["Paso pendiente: ", etapa.nombrePaso]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-2 h-1.5 overflow-hidden rounded-sm bg-muted",
							role: "progressbar",
							"aria-valuenow": etapa.avance,
							"aria-valuemin": 0,
							"aria-valuemax": 100,
							"aria-label": "Avance referencial",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-full bg-primary",
								style: { width: `${etapa.avance}%` }
							})
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [etapa.avance, " % referencial"]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 rounded-md bg-muted px-2.5 py-2 text-xs text-muted-foreground",
							children: etapa.hito
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-2",
							children: /* @__PURE__ */ jsx(PlazoPredioBadge, {
								plazo: etapa.plazo,
								vacio: "Sin plazo legal con fecha registrada"
							})
						})
					] })] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "border-b-2 border-primary pb-1 text-xs font-bold uppercase text-primary-dark",
							children: "Identificación"
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Código",
							valor: codigo,
							icono: FileText
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Sujeto pasivo",
							valor: oPendiente(predio.suj),
							icono: UserRound
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Expediente",
							valor: oPendiente(expediente),
							icono: FileText
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Tipo de predio",
							valor: oPendiente(predio.tipo || predio.tp),
							icono: Building2
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Área afectada",
							valor: predio.area ? `${predio.area} m²` : "Pendiente de registrar",
							icono: Landmark
						})
					] })
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "border-t border-border bg-background px-4 py-2 text-xs text-muted-foreground",
				children: "Solo lectura. Generado con el padrón y el mapa del proyecto."
			})
		]
	});
}
//#endregion
//#region src/components/PredioWorkspaceNavigation.tsx
var DEFAULT_PREDIO_ROUTE = "/proyectos/$projectId/predios/$codigo/identificacion-codificacion";
function routeSegment(route) {
	return route.slice(route.lastIndexOf("/") + 1);
}
function currentPredioRoute(pathname) {
	return Object.values(routeByKey).find((route) => route && pathname.endsWith(`/${routeSegment(route)}`)) ?? DEFAULT_PREDIO_ROUTE;
}
function PredioSelector({ projectId, codigo }) {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [recientesSesion, setRecientesSesion] = useState([]);
	const options = useMemo(() => [...prediosDelProyecto(projectId)].sort((a, b) => a.cod.localeCompare(b.cod)), [projectId]);
	const filteredOptions = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase("es-PE");
		if (normalizedQuery) return options.filter((option) => option.buscar.includes(normalizedQuery));
		const primeros = recientesSesion.map((c) => options.find((o) => o.codigo === c)).filter((o) => Boolean(o) && o.codigo !== codigo);
		return [...primeros, ...options.filter((o) => !primeros.includes(o))];
	}, [
		codigo,
		options,
		query,
		recientesSesion
	]);
	function selectPredio(nextCodigo) {
		const route = currentPredioRoute(pathname);
		setOpen(false);
		setQuery("");
		navigate({
			to: route,
			params: {
				projectId,
				codigo: nextCodigo
			}
		});
	}
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange: (nextOpen) => {
			setOpen(nextOpen);
			if (nextOpen) setRecientesSesion(recientes(projectId));
			if (!nextOpen) setQuery("");
		},
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "flex h-9 w-full items-center gap-2 rounded-md border border-border bg-card px-3 text-left text-sm hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
				"aria-label": "Cambiar predio",
				"aria-expanded": open,
				children: [
					/* @__PURE__ */ jsx(MapPinned, {
						size: 16,
						className: "shrink-0 text-primary",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "shrink-0 text-muted-foreground",
						children: "Predio:"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "min-w-0 flex-1 truncate font-semibold text-foreground",
						children: codigo
					}),
					/* @__PURE__ */ jsx(ChevronsUpDown, {
						size: 16,
						className: "shrink-0 text-muted-foreground",
						"aria-hidden": true
					})
				]
			})
		}), /* @__PURE__ */ jsxs(PopoverContent, {
			align: "center",
			sideOffset: 7,
			className: "z-[10000] w-[430px] p-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "border-b border-border p-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx(Search, {
						size: 16,
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": true
					}), /* @__PURE__ */ jsx("input", {
						autoFocus: true,
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Código, sujeto pasivo, partida o resolución",
						"aria-label": "Buscar predio",
						className: `${controlClase} pl-9`
					})]
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						filteredOptions.length,
						" de ",
						options.length,
						" predios del padrón"
					]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "max-h-72 overflow-y-auto p-1.5",
				children: filteredOptions.length ? filteredOptions.slice(0, 150).map((option) => {
					const active = option.codigo === codigo;
					const reciente = !query && recientesSesion.includes(option.codigo) && !active;
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => selectPredio(option.codigo),
						"aria-current": active ? "true" : void 0,
						className: `flex w-full items-start gap-2 rounded-md px-2.5 py-2 text-left hover:bg-primary-soft ${active ? "bg-primary-soft" : ""}`,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mt-0.5 flex size-4 shrink-0 items-center justify-center",
								children: active && /* @__PURE__ */ jsx(Check, {
									size: 16,
									className: "text-primary",
									"aria-hidden": true
								})
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block truncate font-mono text-xs font-semibold text-foreground",
									children: option.cod
								}), /* @__PURE__ */ jsx("span", {
									className: "block truncate text-xs text-muted-foreground",
									children: option.sujeto
								})]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "shrink-0 text-right text-xs text-muted-foreground",
								children: [
									reciente && /* @__PURE__ */ jsx("span", {
										className: "block font-semibold text-primary-dark",
										children: "Reciente"
									}),
									"Etapa ",
									option.etapa.etapa
								]
							})
						]
					}, option.codigo);
				}) : /* @__PURE__ */ jsx("p", {
					className: "px-3 py-8 text-center text-sm text-muted-foreground",
					children: "Ningún predio coincide con la búsqueda."
				})
			})]
		})]
	});
}
//#endregion
//#region src/lib/avancePasos.ts
/** Pantallas que guardan su registro con otro nombre que la clave del paso. */
var ALIAS = {
	"empadronamiento-inspeccion-campo": ["empadronamiento"],
	"identificacion-codificacion-predio": ["identificacion"],
	"tasacion-itt": ["datos-tecnicos"],
	"expropiacion-procedimiento": ["expropiacion"],
	"expediente-digital": ["expediente"],
	"anotacion-preventiva": ["anotacion-comunicacion"],
	"reconocimiento-mejoras": ["mejoras"]
};
function hayDatos(clave) {
	try {
		const v = localStorage.getItem(clave);
		if (!v) return false;
		const d = JSON.parse(v);
		if (Array.isArray(d)) return d.length > 0;
		if (d && typeof d === "object") return Object.values(d).some((x) => x !== "" && x != null);
		return Boolean(d);
	} catch {
		return false;
	}
}
/** ¿La pantalla del paso guardó algo para el predio? */
function pasoRegistrado(paso, predio) {
	return [paso, ...ALIAS[paso] ?? []].some((k) => hayDatos(`pdgp-historial-${k}-${predio}`) || hayDatos(`pdgp-form-${k}-${predio}`) || hayDatos(`pdgp-${k}-${predio}`));
}
/** Estado del paso: lo guardado en su pantalla más sus documentos obligatorios. */
function estadoPaso(paso, predio, catalogo, items, perfil, registrado = pasoRegistrado(paso, predio)) {
	const docs = avancePaso(catalogo, items, predio, paso, perfil);
	const conDocumentos = items.some((i) => i.predio === predio && i.estado !== "anulado" && (i.paso === paso || catalogo.some((c) => c.id === i.catalogoId && delPaso(c, paso))));
	if (!registrado && !conDocumentos) return "pendiente";
	if (registrado && docs.completos === docs.obligatorios) return "completo";
	return "incompleto";
}
/** Vuelve a leer cuando algo se guarda (toda grabación pasa por la bitácora) o cambia otra pestaña. */
function useCambiosGuardados() {
	const [n, setN] = useState(0);
	useEffect(() => {
		const otra = () => setN((x) => x + 1);
		window.addEventListener(BITACORA_EVENTO, otra);
		window.addEventListener("storage", otra);
		return () => {
			window.removeEventListener(BITACORA_EVENTO, otra);
			window.removeEventListener("storage", otra);
		};
	}, []);
	return n;
}
//#endregion
//#region src/components/shell/PredioSidebar.tsx
var segmento = (ruta) => ruta.slice(ruta.lastIndexOf("/") + 1);
var esActiva = (ruta, pathname) => Boolean(ruta) && pathname.endsWith(`/${segmento(ruta)}`);
/** Texto del tooltip: el motivo de un paso deshabilitado, o el artículo y la descripción. */
function titulo(p) {
	if (p.estado.tipo === "deshabilitado") return p.estado.motivo;
	return [
		p.articulo,
		p.descripcion,
		p.responsable && `Responsable: ${p.responsable}`
	].filter(Boolean).join(" · ") || void 0;
}
/**
* Sidebar de un predio: las etapas del TUO del DL 1192 (nivel 1) y sus pasos (nivel 2), según la ruta
* legal del predio (privado, estatal, mejoras o bloque). Lo que podría aplicar más adelante se ve en gris
* con el motivo; lo que nunca aplica no aparece (docs/PLAN-MENU-PREDIO.md §5).
*/
function PredioSidebar({ projectId, codigo, projectLabel }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const colapsado = useSidebarColapsado();
	const perfil = usePerfilPredio(projectId, codigo);
	const hitos = useHitosPredio(codigo);
	const { etapas, transversales } = menuDelPredio(varianteDe(perfil), {
		perfil,
		hitos
	});
	const catalogo = useCatalogo();
	const items = useItems();
	const perfilExp = {
		inscrito: perfil.inscrito,
		ocupado: perfil.ocupado,
		ruta: perfil.ruta,
		variante: varianteDe(perfil)
	};
	useCambiosGuardados();
	const orden = etapas.filter((e) => e.key !== "expropiacion" || perfil.ruta === "EXPROPIACION").flatMap((e) => e.pasos.map((p) => p.key));
	const fila = getPredioByCodigo(codigo);
	const pasoActual = fila ? etapaDeFila(fila).paso : void 0;
	const hasta = pasoActual ? orden.indexOf(pasoActual) : -1;
	const avance = (paso) => {
		const estado = estadoPaso(paso, codigo, catalogo, items, perfilExp);
		const segunPadron = estado === "pendiente" && hasta > 0 && orden.indexOf(paso) > -1 && orden.indexOf(paso) < hasta;
		return {
			...avancePaso(catalogo, items, codigo, paso, perfilExp),
			estado: segunPadron ? "completo" : estado,
			segunPadron
		};
	};
	return /* @__PURE__ */ jsxs("aside", {
		"aria-label": "Etapas del predio",
		className: `sticky top-14 flex h-[calc(100vh-3.5rem)] shrink-0 flex-col border-r border-border bg-card ${colapsado ? "w-14" : "w-60"}`,
		children: [
			!colapsado && /* @__PURE__ */ jsxs("div", {
				className: "space-y-2 border-b border-border p-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/$projectId/predios",
						params: { projectId },
						className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-primary-dark",
						children: [/* @__PURE__ */ jsx(ArrowLeft, {
							size: 14,
							"aria-hidden": true
						}), "Predios del proyecto"]
					}), /* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/$projectId",
						params: { projectId },
						activeOptions: { exact: true },
						title: "Resumen del proyecto",
						className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-primary-dark",
						children: [/* @__PURE__ */ jsx(FolderOpen, {
							size: 14,
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("span", {
							className: "truncate",
							children: projectLabel
						})]
					})]
				}), /* @__PURE__ */ jsx(PredioSelector, {
					projectId,
					codigo
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `bg-primary px-3 py-2 text-primary-foreground ${colapsado ? "text-center" : ""}`,
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase",
					children: colapsado ? "Predio" : "Expediente del predio"
				}), !colapsado && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
					className: "truncate text-sm font-semibold",
					children: codigo
				}), /* @__PURE__ */ jsx(Link, {
					to: "/proyectos/$projectId/predios/$codigo/modalidad-adquisicion",
					params: {
						projectId,
						codigo
					},
					title: "Perfil legal del predio: decide qué etapas aplican. Clic para revisarlo o cambiarlo.",
					className: "mt-0.5 block truncate text-xs text-primary-foreground/85 underline-offset-2 hover:underline",
					children: textoPerfil(perfil)
				})] })]
			}),
			/* @__PURE__ */ jsxs("nav", {
				className: "min-h-0 flex-1 overflow-y-auto py-2",
				children: [
					etapas.map((etapa) => /* @__PURE__ */ jsx(Etapa, {
						avance,
						etapa,
						projectId,
						codigo,
						pathname,
						colapsado
					}, etapa.key)),
					!colapsado && /* @__PURE__ */ jsxs("p", {
						className: "flex flex-wrap gap-x-3 gap-y-1 px-4 py-2 text-xs text-muted-foreground",
						children: [Object.keys(MARCA).map((k) => {
							const { icono: Icono, clase, texto } = MARCA[k];
							return /* @__PURE__ */ jsxs("span", {
								className: `inline-flex items-center gap-1 ${clase}`,
								children: [
									/* @__PURE__ */ jsx(Icono, {
										size: 12,
										"aria-hidden": true
									}),
									" ",
									texto
								]
							}, k);
						}), /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(Lock, {
								size: 12,
								"aria-hidden": true
							}), " No aplica aún"]
						})]
					}),
					!colapsado && transversales.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "mt-2 border-t border-border px-2 pt-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "px-2 pb-1 text-xs font-semibold uppercase text-muted-foreground",
							children: "Transversales"
						}), /* @__PURE__ */ jsx("ul", { children: transversales.map((t) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(PasoEnlace, {
							paso: t,
							projectId,
							codigo,
							activo: esActiva(t.ruta, pathname)
						}) }, t.key)) })]
					})
				]
			})
		]
	});
}
/** Marca del paso en la línea de tiempo: completo, incompleto o sin registrar. */
/**
* Estados del paso en el menú: el ícono y el color del texto dicen lo mismo, para leerlo de un vistazo.
* Validado (verde): registrado y con sus documentos obligatorios completos. Incompleto (ámbar): hay registro
* pero falta algo. Sin registrar (gris): nada todavía. Lo que la ruta aún no habilita lleva candado.
*/
var MARCA = {
	completo: {
		icono: BadgeCheck,
		clase: "text-success",
		texto: "Validado",
		letra: "text-success font-medium"
	},
	incompleto: {
		icono: CircleAlert,
		clase: "text-warning",
		texto: "Incompleto",
		letra: "text-warning"
	},
	pendiente: {
		icono: CircleDashed,
		clase: "text-muted-foreground",
		texto: "Sin registrar",
		letra: "text-foreground"
	}
};
function Marca({ estado, segunPadron }) {
	if (!estado) return null;
	const { icono: Icono, clase, texto } = MARCA[estado];
	const rotulo = segunPadron ? `${texto} según el padrón (sin registro en el sistema)` : texto;
	return /* @__PURE__ */ jsx(Icono, {
		size: 14,
		className: `mt-0.5 shrink-0 ${clase}`,
		"aria-label": rotulo,
		children: /* @__PURE__ */ jsx("title", { children: rotulo })
	});
}
/** "2/4": documentos obligatorios del paso completos. Nada si el paso no pide documentos. */
function Contador({ a }) {
	if (!a?.obligatorios) return null;
	const listo = a.completos === a.obligatorios;
	return /* @__PURE__ */ jsxs("span", {
		title: `${a.completos} de ${a.obligatorios} documentos obligatorios`,
		className: `ml-1 shrink-0 rounded-sm px-1 text-xs tabular-nums ${listo ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"}`,
		children: [
			a.completos,
			"/",
			a.obligatorios
		]
	});
}
function PasoEnlace({ paso, projectId, codigo, activo, avance }) {
	const texto = paso.numero ? `${paso.numero} ${paso.nombre}` : paso.nombre;
	const a = avance?.(paso.key);
	const contador = a?.segunPadron ? null : /* @__PURE__ */ jsx(Contador, { a });
	const marca = /* @__PURE__ */ jsx(Marca, {
		estado: a?.estado,
		segunPadron: a?.segunPadron
	});
	if (paso.estado.tipo === "deshabilitado" || !paso.ruta && !paso.externo) return /* @__PURE__ */ jsxs("span", {
		"aria-disabled": "true",
		title: paso.estado.tipo === "deshabilitado" ? paso.estado.motivo : "Pantalla no disponible",
		className: `flex cursor-not-allowed items-start gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground ${activo ? "bg-muted" : ""}`,
		children: [/* @__PURE__ */ jsx("span", {
			className: "min-w-0 flex-1",
			children: texto
		}), /* @__PURE__ */ jsx(Lock, {
			size: 13,
			className: "mt-0.5 shrink-0",
			"aria-label": "Deshabilitado"
		})]
	});
	const clase = `flex items-start justify-between rounded-md px-2 py-1.5 text-sm ${a ? MARCA[a.estado].letra : "text-foreground"} ${activo ? "bg-card font-semibold ring-2 ring-primary" : "hover:bg-muted"}`;
	if (paso.externo) return /* @__PURE__ */ jsxs(Link, {
		to: paso.externo,
		title: titulo(paso),
		className: clase,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex min-w-0 gap-1.5",
			children: [marca, /* @__PURE__ */ jsx("span", {
				className: "min-w-0",
				children: texto
			})]
		}), contador]
	});
	return /* @__PURE__ */ jsxs(Link, {
		to: paso.ruta,
		params: {
			projectId,
			codigo
		},
		title: titulo(paso),
		"aria-current": activo ? "page" : void 0,
		className: clase,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex min-w-0 gap-1.5",
			children: [marca, /* @__PURE__ */ jsx("span", {
				className: "min-w-0",
				children: texto
			})]
		}), contador]
	});
}
function Etapa({ etapa, projectId, codigo, pathname, colapsado, avance }) {
	const activa = etapa.pasos.some((p) => esActiva(p.ruta, pathname));
	const [abierta, setAbierta] = useState(activa);
	const Icono = iconByKey[etapa.key] ?? MapPinned;
	const deshabilitada = etapa.estado.tipo === "deshabilitado";
	const primero = etapa.pasos.find((p) => p.ruta && p.estado.tipo === "habilitado");
	const rotulo = `${etapa.numero}. ${etapa.nombre}`;
	const habilitados = etapa.pasos.filter((p) => p.estado.tipo === "habilitado");
	const completos = habilitados.filter((p) => avance?.(p.key).estado === "completo").length;
	const iniciada = habilitados.some((p) => avance?.(p.key).estado !== "pendiente");
	const estadoEtapa = deshabilitada || habilitados.length === 0 ? null : completos === habilitados.length ? "completo" : iniciada ? "incompleto" : "pendiente";
	if (colapsado) {
		const clase = `mx-auto my-1 flex size-10 items-center justify-center rounded-md ${activa ? "bg-primary-soft text-primary-dark" : "text-foreground hover:bg-muted"}`;
		return primero?.ruta ? /* @__PURE__ */ jsx(Link, {
			to: primero.ruta,
			params: {
				projectId,
				codigo
			},
			title: rotulo,
			"aria-label": rotulo,
			className: clase,
			children: /* @__PURE__ */ jsx(Icono, { size: 20 })
		}) : /* @__PURE__ */ jsx("span", {
			title: deshabilitada ? `${rotulo}: ${titulo(etapa)}` : rotulo,
			className: `${clase} opacity-50`,
			children: /* @__PURE__ */ jsx(Icono, { size: 20 })
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "px-2",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setAbierta((v) => !v),
			"aria-expanded": abierta,
			title: titulo(etapa),
			className: `flex min-h-10 w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted ${deshabilitada ? "text-muted-foreground" : estadoEtapa ? MARCA[estadoEtapa].letra : "text-foreground"} ${activa ? "font-semibold" : ""}`,
			children: [
				/* @__PURE__ */ jsx(Icono, {
					size: 20,
					className: `shrink-0 ${deshabilitada ? "text-muted-foreground" : "text-primary"}`,
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsx("span", {
					className: "min-w-0 flex-1",
					children: rotulo
				}),
				estadoEtapa === "completo" ? /* @__PURE__ */ jsx(BadgeCheck, {
					size: 16,
					className: "shrink-0 text-success",
					"aria-label": "Etapa validada"
				}) : estadoEtapa === "incompleto" && /* @__PURE__ */ jsxs("span", {
					className: "inline-flex shrink-0 items-center gap-0.5 text-xs tabular-nums text-warning",
					title: `${completos} de ${habilitados.length} pasos validados`,
					children: [
						/* @__PURE__ */ jsx(CircleAlert, {
							size: 13,
							"aria-hidden": true
						}),
						completos,
						"/",
						habilitados.length
					]
				}),
				deshabilitada && /* @__PURE__ */ jsx(Lock, {
					size: 13,
					className: "shrink-0",
					"aria-label": "Etapa deshabilitada"
				}),
				/* @__PURE__ */ jsx(ChevronDown, {
					size: 16,
					className: `shrink-0 text-muted-foreground transition-transform ${abierta ? "" : "-rotate-90"}`,
					"aria-hidden": true
				})
			]
		}), abierta && /* @__PURE__ */ jsx("ul", {
			className: "mb-1 ml-4 border-l border-border pl-1",
			children: etapa.pasos.filter((p) => p.estado.tipo !== "oculto").map((paso) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(PasoEnlace, {
				paso,
				projectId,
				codigo,
				activo: esActiva(paso.ruta, pathname),
				avance
			}) }, paso.key))
		})]
	});
}
//#endregion
export { PredioResumen as n, PredioSidebar as t };
