import { a as controlClase, n as FormField } from "./Form-DtuiyqJ8.js";
import { i as extension } from "./leer-CXNolRlj.js";
import { f as prediosGeojson, r as padronDemostrativo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { c as DropdownMenuSub, d as DropdownMenuTrigger, l as DropdownMenuSubContent, n as DropdownMenuContent, r as DropdownMenuItem, s as DropdownMenuSeparator, t as DropdownMenu, u as DropdownMenuSubTrigger } from "./dropdown-menu-D811JBGD.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { C as tienePoligonosPropios, T as validarCapa, _ as leerCapas, a as NOMBRE_CLASE, b as leerOriginal, c as actualizarCapa, f as guardarCapas, i as DETALLE_CLASE, l as claseDe, m as guardarEstilosSistema, n as CAPAS_SISTEMA, o as NOMBRE_ESTADO_CAPA, r as CATEGORIAS_CAPA, s as NOMBRE_GEOMETRIA, t as CAPAS_OBLIGATORIAS, u as estadoObligatorias, v as leerDatosCapa, w as useCapas, x as puedeGestionarCapas, y as leerEstilosSistema } from "./capas-B7cJ7zRJ.js";
import { a as leerActividad, d as resolverCambio, g as urlServicio, h as urlPlano, m as urlOgc, n as descargarPaquete, o as leerCambios, p as urlAdjunto, r as estadoPublicacion, s as leerPlanos, u as publicarProyecto, v as usuarioWeb } from "./gisProyecto-CAMCHdpa.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { Dt as BotonIcono, E as Modal, x as exportarExcel, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { d as PopoverContent, f as PopoverTrigger, n as Sheet$1, r as SheetContent, s as SheetTitle, t as AppShell, u as Popover } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { i as controlesCapa, n as AnadirDatos, r as OPCIONES_ANADIR, t as Route$1 } from "./proyectos._projectId.base-grafica.index-DQEtbx_9.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { i as useRegistroProyecto, n as generarCapasObligatorias } from "./registroProyecto-D7FBQbZo.js";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, Check, CheckCircle2, ChevronDown, CircleCheck, Copy, Download, Eye, EyeOff, FileText, FileUp, Info, Layers, Lock, Maximize, MoreVertical, Palette, PanelLeftClose, PanelLeftOpen, PanelRightOpen, Play, Plus, RefreshCw, Ruler, Save, Search, Send, Settings2, Share2, SquareDashed, Table2, Trash2, TriangleAlert, Upload, X, XCircle } from "lucide-react";
import { toast } from "sonner";
//#region src/components/mapa/BarraMapa.tsx
var BASES = [
	{
		valor: "osm",
		nombre: "OpenStreetMap"
	},
	{
		valor: "satelite",
		nombre: "Satélite"
	},
	{
		valor: "ninguno",
		nombre: "Sin fondo"
	}
];
/** Herramientas del mapa de la base gráfica: mapa base, extensión del proyecto y medición. */
function BarraMapa({ mapaBase, onMapaBase, onExtension, medir, onMedir }) {
	const alternar = (m) => onMedir(medir === m ? null : m);
	return /* @__PURE__ */ jsxs("div", {
		role: "toolbar",
		"aria-label": "Herramientas del mapa",
		className: "absolute left-3 top-3 z-10 flex flex-wrap items-center gap-1 rounded-md border border-border bg-card p-1",
		children: [
			/* @__PURE__ */ jsx("label", {
				className: "sr-only",
				htmlFor: "mapa-base",
				children: "Mapa base"
			}),
			/* @__PURE__ */ jsx("select", {
				id: "mapa-base",
				value: mapaBase,
				onChange: (e) => onMapaBase(e.target.value),
				className: "h-8 rounded-md border border-border bg-card px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				children: BASES.map((b) => /* @__PURE__ */ jsx("option", {
					value: b.valor,
					children: b.nombre
				}, b.valor))
			}),
			/* @__PURE__ */ jsx(BotonIcono, {
				nombre: "Extensión del proyecto",
				icono: Maximize,
				onClick: onExtension
			}),
			/* @__PURE__ */ jsx(BotonMedir, {
				activo: medir === "distancia",
				nombre: "Medir distancia",
				onClick: () => alternar("distancia"),
				icono: "distancia"
			}),
			/* @__PURE__ */ jsx(BotonMedir, {
				activo: medir === "area",
				nombre: "Medir área",
				onClick: () => alternar("area"),
				icono: "area"
			})
		]
	});
}
function BotonMedir({ activo, nombre, onClick, icono }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick,
		"aria-pressed": activo,
		"aria-label": nombre,
		title: nombre,
		className: `flex size-8 items-center justify-center rounded-md border ${activo ? "border-primary-dark bg-primary-dark text-primary-foreground" : "border-border text-primary-dark hover:bg-primary-soft"}`,
		children: /* @__PURE__ */ jsx(icono === "distancia" ? Ruler : SquareDashed, {
			size: 16,
			"aria-hidden": true
		})
	});
}
//#endregion
//#region src/components/mapa/IdentificarEntidad.tsx
var valor = (v) => v == null || v === "" ? "Sin información" : typeof v === "object" ? JSON.stringify(v) : String(v);
/** Ventana con los atributos de la entidad identificada con un clic en el mapa. */
function IdentificarEntidad({ capa, indice, propiedades, onVerEnTabla, onCerrar }) {
	const campos = Object.entries(propiedades);
	return /* @__PURE__ */ jsxs("section", {
		"aria-label": `Entidad ${indice + 1} de ${capa.nombre}`,
		className: "absolute right-3 top-14 z-20 flex max-h-[calc(100%-120px)] w-80 max-w-[calc(100%-24px)] flex-col rounded-lg border border-border bg-card",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex items-start justify-between gap-2 border-b border-border px-3 py-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: ["Entidad ", indice + 1]
					}), /* @__PURE__ */ jsx("h2", {
						className: "truncate text-sm font-semibold text-primary-dark",
						title: capa.nombre,
						children: capa.nombre
					})]
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onCerrar,
					"aria-label": "Cerrar atributos de la entidad",
					className: "flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted",
					children: /* @__PURE__ */ jsx(X, {
						size: 16,
						"aria-hidden": true
					})
				})]
			}),
			/* @__PURE__ */ jsxs("dl", {
				className: "min-h-0 flex-1 overflow-y-auto px-3 py-2 text-sm",
				children: [campos.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground",
					children: "La entidad no tiene atributos."
				}), campos.map(([k, v]) => /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-5 gap-2 border-b border-border py-1 last:border-0",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "col-span-2 truncate text-xs text-muted-foreground",
						title: k,
						children: k
					}), /* @__PURE__ */ jsx("dd", {
						className: "col-span-3 wrap-break-word",
						children: valor(v)
					})]
				}, k))]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t border-border px-3 py-2",
				children: /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: onVerEnTabla,
					children: [/* @__PURE__ */ jsx(Table2, {}), " Ver en la tabla"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/mapa/PanelCapas.tsx
var TONO_ESTADO_CAPA = {
	BORRADOR: "neutral",
	EN_REVISION: "warning",
	APROBADA: "success",
	OBSERVADA: "destructive"
};
function EstadoCapaBadge({ estado }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: TONO_ESTADO_CAPA[estado],
		children: NOMBRE_ESTADO_CAPA[estado]
	});
}
var SISTEMA = CAPAS_SISTEMA;
/** Color, grosor y tipo de línea de una capa del sistema, editables desde su fila. */
function EstiloSistemaPopover({ nombre, estilo, disabled, onChange }) {
	return /* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			disabled,
			"aria-label": `Estilo de ${nombre}`,
			title: "Color, grosor y tipo de línea",
			className: "flex size-7 shrink-0 items-center justify-center rounded-sm border border-border hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
			children: /* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				className: "block w-4",
				style: {
					borderTopColor: estilo.color,
					borderTopWidth: Math.min(6, Math.max(1, Math.round(estilo.grosor))),
					borderTopStyle: estilo.tipoLinea === "DISCONTINUA" ? "dashed" : estilo.tipoLinea === "PUNTEADA" ? "dotted" : "solid"
				}
			})
		})
	}), /* @__PURE__ */ jsxs(PopoverContent, {
		align: "end",
		className: "w-60 space-y-3 p-3",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-xs font-semibold text-foreground",
				children: nombre
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "flex items-center justify-between gap-2 text-xs",
				children: ["Color", /* @__PURE__ */ jsx("input", {
					type: "color",
					value: estilo.color,
					onChange: (e) => onChange({
						...estilo,
						color: e.target.value
					}),
					className: "size-7 cursor-pointer rounded-sm border border-border bg-transparent p-0"
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block text-xs",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex justify-between",
					children: ["Grosor ", /* @__PURE__ */ jsxs("span", {
						className: "tabular-nums",
						children: [estilo.grosor, " px"]
					})]
				}), /* @__PURE__ */ jsx("input", {
					type: "range",
					min: .5,
					max: 8,
					step: .25,
					value: estilo.grosor,
					onChange: (e) => onChange({
						...estilo,
						grosor: Number(e.target.value)
					}),
					className: "mt-1 h-1 w-full accent-primary"
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "block text-xs",
				children: ["Tipo de línea", /* @__PURE__ */ jsxs("select", {
					className: `${controlClase} mt-1`,
					value: estilo.tipoLinea,
					onChange: (e) => onChange({
						...estilo,
						tipoLinea: e.target.value
					}),
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
				})]
			})
		]
	})] });
}
var tipoDe = (c) => c.origen.tipo === "SERVICIO" ? `Servicio ${c.origen.formato}` : NOMBRE_GEOMETRIA[c.geometria];
/** Árbol de capas de la base gráfica: las del sistema (solo lectura) y las del proyecto por categoría. */
function PanelCapas({ capas, sistema, onSistema, seleccionada, onSeleccionar, onVisible, onAccion, puedeGestionar, onAgregarObligatoria, projectId, estilosSistema, onEstiloSistema }) {
	const [buscar, setBuscar] = useState("");
	const t = buscar.trim().toLocaleLowerCase("es-PE");
	const porOrden = [...capas].sort((a, b) => b.orden - a.orden);
	const visibles = porOrden.filter((c) => !t || `${c.nombre} ${c.abrev} ${c.categoria}`.toLocaleLowerCase("es-PE").includes(t));
	const obligatorias = estadoObligatorias(capas, projectId);
	const propios = tienePoligonosPropios(projectId);
	const pendientes = obligatorias.filter((o) => o.estado !== "OK").length;
	const registro = useRegistroProyecto(projectId);
	const faltanDelRegistro = obligatorias.filter((o) => o.estado === "FALTA" && registro?.capasObligatorias[o.clave] && registro.capasObligatorias[o.clave] !== "std:propio").length;
	const generarDelRegistro = () => {
		if (!registro) return;
		const n = generarCapasObligatorias(projectId, registro, registro.coordinadorPredial);
		toast.success(`${n} capa${n === 1 ? "" : "s"} generada${n === 1 ? "" : "s"} del registro`, { description: `Solicitud ${registro.hojaRuta}. Quedan en borrador hasta su aprobación.` });
	};
	const sistemaVisibles = SISTEMA.filter((s) => !t || s.nombre.toLocaleLowerCase("es-PE").includes(t));
	return /* @__PURE__ */ jsxs("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ jsx("div", {
			className: "border-b border-border p-2",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsx(Search, {
					size: 16,
					className: "pointer-events-none absolute left-2 top-2.5 text-muted-foreground",
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("input", {
					value: buscar,
					onChange: (e) => setBuscar(e.target.value),
					placeholder: "Buscar capa",
					"aria-label": "Buscar capa",
					className: `${controlClase} pl-8`
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-h-0 flex-1 overflow-y-auto p-2 text-sm",
			children: [
				/* @__PURE__ */ jsxs("section", {
					"aria-label": "Capas obligatorias",
					role: pendientes ? "alert" : void 0,
					className: `mb-2 rounded-md border p-2 ${pendientes ? "border-destructive bg-destructive-soft" : "border-success bg-success-soft"}`,
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: `mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase ${pendientes ? "text-destructive" : "text-success"}`,
							children: [
								pendientes ? /* @__PURE__ */ jsx(TriangleAlert, {
									size: 14,
									"aria-hidden": true
								}) : /* @__PURE__ */ jsx(CircleCheck, {
									size: 14,
									"aria-hidden": true
								}),
								"Capas obligatorias",
								" ",
								pendientes ? `(${pendientes} pendiente${pendientes > 1 ? "s" : ""})` : "completas"
							]
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "space-y-1",
							children: obligatorias.map((o) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "block font-medium text-foreground",
											children: o.nombre
										}), /* @__PURE__ */ jsx("span", {
											className: o.estado === "OK" ? "text-success" : o.estado === "PENDIENTE" ? "text-warning" : "text-destructive",
											children: o.estado === "OK" ? o.capa ? `Aprobada: ${o.capa.nombre}` : "Capa del sistema del proyecto" : o.estado === "PENDIENTE" ? `Registrada, falta aprobar (${o.capa?.nombre})` : "No registrada"
										})]
									}),
									o.estado === "FALTA" && puedeGestionar && /* @__PURE__ */ jsxs(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => onAgregarObligatoria(o.clave),
										children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar"]
									}),
									o.estado === "PENDIENTE" && o.capa && /* @__PURE__ */ jsx(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => onSeleccionar(o.capa.id),
										children: "Revisar"
									})
								]
							}, o.clave))
						}),
						faltanDelRegistro > 0 && puedeGestionar && /* @__PURE__ */ jsxs("div", {
							className: "mt-2 flex flex-col gap-2 border-t border-destructive/30 pt-2 text-xs",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "text-foreground",
								children: [
									"El registro del proyecto (solicitud ",
									registro?.hojaRuta,
									") trae los polígonos de",
									" ",
									faltanDelRegistro === 1 ? "esta capa" : "estas capas",
									"."
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsxs(Button, {
									type: "button",
									size: "sm",
									onClick: generarDelRegistro,
									children: [/* @__PURE__ */ jsx(Plus, {}), " Generar del registro"]
								}), /* @__PURE__ */ jsx(Link, {
									to: "/proyectos/registro",
									search: { id: projectId },
									className: "font-semibold text-primary-dark underline underline-offset-2",
									children: "Ver registro"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("details", {
					open: true,
					className: "mb-2",
					children: [/* @__PURE__ */ jsxs("summary", {
						className: "flex cursor-pointer items-center gap-1.5 rounded-md px-1 py-1 text-xs font-semibold uppercase text-primary-dark hover:bg-muted",
						children: ["Capas del sistema", /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsx("span", {
								tabIndex: 0,
								role: "img",
								"aria-label": "Cómo se generan las capas del sistema",
								className: "inline-flex text-muted-foreground",
								children: /* @__PURE__ */ jsx(Info, {
									size: 13,
									"aria-hidden": true
								})
							})
						}), /* @__PURE__ */ jsxs(TooltipContent, {
							side: "right",
							className: "max-w-xs normal-case",
							children: ["El sistema las genera solo: la delimitación y la concesión desde el registro del proyecto; los predios, el predio matriz y las áreas remanentes a medida que se registra cada predio y su cuadro de datos técnicos.", !propios && " Mientras tanto se muestran datos de demostración (Jauja)."]
						})] })]
					}), /* @__PURE__ */ jsx("ul", {
						className: "mt-1 space-y-0.5 pl-2",
						children: sistemaVisibles.map((s) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-center gap-2 rounded-md px-1 py-1",
							children: [
								/* @__PURE__ */ jsx("input", {
									id: `sistema-${s.id}`,
									type: "checkbox",
									checked: sistema[s.id] !== false,
									onChange: (e) => onSistema(s.id, e.target.checked),
									className: "size-4 accent-primary"
								}),
								/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
									asChild: true,
									children: /* @__PURE__ */ jsx("label", {
										htmlFor: `sistema-${s.id}`,
										className: "min-w-0 flex-1 truncate",
										children: s.nombre
									})
								}), /* @__PURE__ */ jsx(TooltipContent, {
									side: "right",
									children: s.detalle
								})] }),
								estilosSistema[s.id] ? /* @__PURE__ */ jsx(EstiloSistemaPopover, {
									nombre: s.nombre,
									estilo: estilosSistema[s.id],
									disabled: !puedeGestionar,
									onChange: (e) => onEstiloSistema(s.id, e)
								}) : /* @__PURE__ */ jsx(Lock, {
									size: 14,
									className: "shrink-0 text-muted-foreground",
									"aria-label": "Capa del sistema sin estilo propio"
								})
							]
						}, s.id))
					})]
				}),
				capas.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "px-2 py-3 text-xs text-muted-foreground",
					children: "El proyecto aún no tiene capas. Empiece por las obligatorias o use «Añadir datos»."
				}),
				capas.length > 0 && visibles.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "px-2 py-3 text-xs text-muted-foreground",
					children: "Ninguna capa coincide."
				}),
				Object.keys(NOMBRE_CLASE).map((clase) => {
					const deClase = visibles.filter((c) => claseDe(c) === clase);
					if (!deClase.length) return null;
					return /* @__PURE__ */ jsxs("details", {
						open: true,
						className: "mb-2",
						children: [/* @__PURE__ */ jsxs("summary", {
							title: DETALLE_CLASE[clase],
							className: "cursor-pointer rounded-md px-1 py-1 text-xs font-semibold uppercase text-primary-dark hover:bg-muted",
							children: [
								NOMBRE_CLASE[clase],
								" (",
								deClase.length,
								")"
							]
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-0.5 pl-2",
							children: deClase.map((c) => /* @__PURE__ */ jsx(FilaCapa, {
								capa: c,
								elegida: c.id === seleccionada,
								primera: porOrden[0]?.id === c.id,
								ultima: porOrden[porOrden.length - 1]?.id === c.id,
								onSeleccionar: () => onSeleccionar(c.id),
								onVisible: (v) => onVisible(c, v),
								onAccion: (a) => onAccion(a, c),
								puedeGestionar
							}, c.id))
						})]
					}, clase);
				})
			]
		})]
	});
}
function FilaCapa({ capa, elegida, primera, ultima, onSeleccionar, onVisible, onAccion, puedeGestionar }) {
	const raster = capa.geometria === "RASTER";
	return /* @__PURE__ */ jsxs("li", {
		className: `flex items-center gap-2 rounded-md px-1 py-1 ${elegida ? "bg-primary-soft" : "hover:bg-muted"}`,
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: capa.visible,
				onChange: (e) => onVisible(e.target.checked),
				"aria-label": `Mostrar ${capa.nombre}`,
				className: "size-4 shrink-0 accent-primary"
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => onAccion("estilo"),
				title: "Cambiar color y simbología",
				"aria-label": `Cambiar color y simbología de ${capa.nombre}`,
				className: "flex size-6 shrink-0 items-center justify-center rounded-sm hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				children: /* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "size-4 rounded-sm border-2",
					style: {
						background: capa.estilo.relleno,
						borderColor: capa.estilo.borde
					}
				})
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: onSeleccionar,
				"aria-current": elegida ? "true" : void 0,
				className: "min-w-0 flex-1 text-left",
				children: [/* @__PURE__ */ jsx("span", {
					className: "block truncate font-medium",
					title: capa.nombre,
					children: capa.nombre
				}), /* @__PURE__ */ jsxs("span", {
					className: "flex flex-wrap items-center gap-1 text-xs text-muted-foreground",
					children: [tipoDe(capa), /* @__PURE__ */ jsx(StatusBadge, {
						tono: TONO_ESTADO_CAPA[capa.estado],
						children: NOMBRE_ESTADO_CAPA[capa.estado]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
				"aria-label": `Acciones de ${capa.nombre}`,
				className: "flex size-8 shrink-0 items-center justify-center rounded-md text-primary-dark hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				children: /* @__PURE__ */ jsx(MoreVertical, {
					size: 16,
					"aria-hidden": true
				})
			}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
				align: "end",
				className: "w-56",
				children: [
					/* @__PURE__ */ jsxs(DropdownMenuItem, {
						onSelect: () => onAccion("zoom"),
						disabled: !capa.extension,
						children: [/* @__PURE__ */ jsx(Maximize, {}), " Zoom a la capa"]
					}),
					/* @__PURE__ */ jsxs(DropdownMenuItem, {
						onSelect: () => onAccion("propiedades"),
						children: [/* @__PURE__ */ jsx(Settings2, {}), " Propiedades"]
					}),
					/* @__PURE__ */ jsxs(DropdownMenuItem, {
						onSelect: () => onAccion("estilo"),
						children: [/* @__PURE__ */ jsx(Palette, {}), " Color y simbología"]
					}),
					/* @__PURE__ */ jsxs(DropdownMenuItem, {
						onSelect: () => onAccion("tabla"),
						disabled: raster,
						children: [/* @__PURE__ */ jsx(Table2, {}), " Tabla de atributos"]
					}),
					puedeGestionar && /* @__PURE__ */ jsxs(DropdownMenuItem, {
						onSelect: () => onAccion("reemplazar"),
						disabled: capa.origen.tipo === "SISTEMA",
						children: [/* @__PURE__ */ jsx(FileUp, {}), " Reemplazar datos"]
					}),
					/* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, {
						disabled: raster,
						children: [/* @__PURE__ */ jsx(Download, {}), " Exportar"]
					}), /* @__PURE__ */ jsxs(DropdownMenuSubContent, { children: [
						/* @__PURE__ */ jsx(DropdownMenuItem, {
							onSelect: () => onAccion("GeoJSON"),
							children: "GeoJSON"
						}),
						/* @__PURE__ */ jsx(DropdownMenuItem, {
							onSelect: () => onAccion("KML"),
							children: "KML"
						}),
						/* @__PURE__ */ jsx(DropdownMenuItem, {
							onSelect: () => onAccion("CSV"),
							children: "CSV de atributos"
						})
					] })] }),
					puedeGestionar && /* @__PURE__ */ jsxs(Fragment$1, { children: [
						/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
						/* @__PURE__ */ jsxs(DropdownMenuItem, {
							onSelect: () => onAccion("subir"),
							disabled: primera,
							children: [/* @__PURE__ */ jsx(ArrowUp, {}), " Subir"]
						}),
						/* @__PURE__ */ jsxs(DropdownMenuItem, {
							onSelect: () => onAccion("bajar"),
							disabled: ultima,
							children: [/* @__PURE__ */ jsx(ArrowDown, {}), " Bajar"]
						}),
						/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
						/* @__PURE__ */ jsxs(DropdownMenuItem, {
							onSelect: () => onAccion("quitar"),
							className: "text-destructive focus:text-destructive",
							children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar capa"]
						})
					] })
				]
			})] })
		]
	});
}
//#endregion
//#region src/components/mapa/PropiedadesCapa.tsx
var usuario = () => {
	try {
		return localStorage.getItem("mtc-session") || "usuario sin sesión";
	} catch {
		return "usuario sin sesión";
	}
};
var areaClase = `${controlClase} h-auto min-h-20 py-2`;
/** Propiedades de la capa elegida: datos, estilo con vista previa, origen, revisión e histórico. */
function PropiedadesCapa({ capa, projectId, puedeGestionar, extensionProyecto, pestana, onPestana, onVistaPrevia, onCerrar }) {
	return /* @__PURE__ */ jsxs("section", {
		"aria-label": `Propiedades de ${capa.nombre}`,
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "flex items-start justify-between gap-2 border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Propiedades de la capa"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "truncate text-sm font-semibold text-primary-dark",
						title: capa.nombre,
						children: capa.nombre
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-1 flex flex-wrap gap-1",
						children: [
							/* @__PURE__ */ jsx(EstadoCapaBadge, { estado: capa.estado }),
							capa.publicar && /* @__PURE__ */ jsx(StatusBadge, {
								tono: "primary",
								children: "Publicada"
							}),
							/* @__PURE__ */ jsxs(StatusBadge, { children: ["Versión ", capa.version] })
						]
					})
				]
			}), onCerrar && /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onCerrar,
				"aria-label": "Cerrar propiedades",
				className: "flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted",
				children: /* @__PURE__ */ jsx(X, {
					size: 16,
					"aria-hidden": true
				})
			})]
		}), /* @__PURE__ */ jsxs(Tabs, {
			value: pestana,
			onValueChange: (v) => onPestana(v),
			className: "flex min-h-0 flex-1 flex-col",
			children: [/* @__PURE__ */ jsxs(TabsList, {
				className: "mx-2 mt-2 flex h-auto flex-wrap justify-start",
				children: [
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "datos",
						children: "Datos"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "estilo",
						children: "Estilo"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "origen",
						children: "Origen"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "revision",
						children: "Revisión"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "historico",
						children: "Histórico"
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "@container min-h-0 flex-1 overflow-y-auto px-3 py-3",
				children: [
					/* @__PURE__ */ jsx(TabsContent, {
						value: "datos",
						className: "mt-0",
						children: /* @__PURE__ */ jsx(PestanaDatos, {
							capa,
							projectId,
							puede: puedeGestionar
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "estilo",
						className: "mt-0",
						children: /* @__PURE__ */ jsx(PestanaEstilo, {
							capa,
							projectId,
							puede: puedeGestionar,
							onVistaPrevia
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "origen",
						className: "mt-0",
						children: /* @__PURE__ */ jsx(PestanaOrigen, { capa })
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "revision",
						className: "mt-0",
						children: /* @__PURE__ */ jsx(PestanaRevision, {
							capa,
							projectId,
							puede: puedeGestionar,
							extensionProyecto
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						className: "mt-0",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `capas-${projectId}`,
							filtroInicial: capa.nombre,
							nombreArchivo: `historico-capa-${capa.abrev || capa.id}`
						})
					})
				]
			})]
		})]
	});
}
function PestanaDatos({ capa, projectId, puede }) {
	const inicial = {
		nombre: capa.nombre,
		abrev: capa.abrev,
		categoria: capa.categoria,
		descripcion: capa.descripcion,
		fuente: capa.fuente,
		fechaDatos: capa.fechaDatos,
		responsable: capa.responsable,
		confiabilidad: capa.confiabilidad,
		clase: claseDe(capa),
		obligatoria: capa.obligatoria
	};
	const [f, setF] = useState(inicial);
	const [error, setError] = useState("");
	const cambio = (k, v) => setF((s) => ({
		...s,
		[k]: v
	}));
	const guardar = () => {
		const e = validarCapa(leerCapas(projectId), {
			id: capa.id,
			nombre: f.nombre,
			abrev: f.abrev
		});
		setError(e ?? "");
		if (e) return;
		actualizarCapa(projectId, capa.id, {
			...f,
			nombre: f.nombre.trim()
		}, "Editó datos");
		toast.success("Datos de la capa guardados");
	};
	const dis = !puede;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre",
				obligatorio: true,
				error: error.includes("nombre") || error.includes("Ya hay") ? error : void 0,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: f.nombre,
					disabled: dis,
					onChange: (e) => cambio("nombre", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Abreviatura",
				obligatorio: true,
				error: error.includes("abreviatura") ? error : void 0,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: f.abrev,
					disabled: dis,
					onChange: (e) => cambio("abrev", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Clase de capa",
				ayuda: DETALLE_CLASE[f.clase],
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: f.clase,
					disabled: dis,
					onChange: (e) => {
						const clase = e.target.value;
						setF((s) => ({
							...s,
							clase,
							obligatoria: clase === "BASE" ? s.obligatoria ?? "DELIMITACION" : void 0
						}));
					},
					children: Object.keys(NOMBRE_CLASE).map((c) => /* @__PURE__ */ jsx("option", {
						value: c,
						children: NOMBRE_CLASE[c]
					}, c))
				})
			}),
			f.clase === "BASE" && /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Capa obligatoria que cumple",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: f.obligatoria ?? "DELIMITACION",
					disabled: dis,
					onChange: (e) => cambio("obligatoria", e.target.value),
					children: CAPAS_OBLIGATORIAS.map((o) => /* @__PURE__ */ jsx("option", {
						value: o.clave,
						children: o.nombre
					}, o.clave))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Categoría",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: f.categoria,
					disabled: dis,
					onChange: (e) => cambio("categoria", e.target.value),
					children: [.../* @__PURE__ */ new Set([...CATEGORIAS_CAPA, f.categoria])].map((c) => /* @__PURE__ */ jsx("option", { children: c }, c))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					className: areaClase,
					value: f.descripcion,
					disabled: dis,
					onChange: (e) => cambio("descripcion", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fuente",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: f.fuente,
					disabled: dis,
					onChange: (e) => cambio("fuente", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de los datos",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: f.fechaDatos,
					disabled: dis,
					onChange: (e) => cambio("fechaDatos", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Responsable",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: f.responsable,
					disabled: dis,
					onChange: (e) => cambio("responsable", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Confiabilidad",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: f.confiabilidad,
					disabled: dis,
					onChange: (e) => cambio("confiabilidad", e.target.value),
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
			puede ? /* @__PURE__ */ jsxs("div", {
				className: "flex justify-end gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setF(inicial),
					children: "Descartar cambios"
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: guardar,
					children: [/* @__PURE__ */ jsx(Save, {}), " Guardar datos"]
				})]
			}) : /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Su perfil puede consultar y exportar esta capa, no editarla."
			})
		]
	});
}
function PestanaEstilo({ capa, projectId, puede, onVistaPrevia }) {
	const [e, setE] = useState(capa.estilo);
	const sucio = JSON.stringify(e) !== JSON.stringify(capa.estilo);
	useEffect(() => {
		onVistaPrevia(sucio ? e : null);
	}, [
		e,
		sucio,
		onVistaPrevia
	]);
	useEffect(() => () => onVistaPrevia(null), [onVistaPrevia]);
	const cambio = (k, v) => setE((s) => ({
		...s,
		[k]: v
	}));
	const g = capa.geometria;
	const poligono = g === "POLIGONO" || g === "MIXTA";
	const punto = g === "PUNTO" || g === "MIXTA";
	const linea = g !== "PUNTO" && g !== "RASTER";
	const dis = !puede;
	const guardar = () => {
		actualizarCapa(projectId, capa.id, { estilo: e }, "Cambió estilo");
		toast.success("Estilo de la capa guardado");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Los cambios se ven en el mapa mientras edita; se conservan al guardarlos."
			}),
			g !== "RASTER" && (poligono || punto) && /* @__PURE__ */ jsx(FormField, {
				etiqueta: punto && !poligono ? "Color del punto" : "Relleno",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "color",
					className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted p-1`,
					value: e.relleno,
					disabled: dis,
					onChange: (x) => cambio("relleno", x.target.value)
				})
			}),
			linea && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: g === "LINEA" ? "Color de la línea" : "Borde",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "color",
						className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted p-1`,
						value: e.borde,
						disabled: dis,
						onChange: (x) => cambio("borde", x.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Grosor",
					ayuda: `${e.grosor} px`,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "range",
						min: .5,
						max: 10,
						step: .5,
						className: "w-full accent-primary",
						value: e.grosor,
						disabled: dis,
						onChange: (x) => cambio("grosor", Number(x.target.value))
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Tipo de línea",
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
						value: e.tipoLinea,
						disabled: dis,
						onChange: (x) => cambio("tipoLinea", x.target.value),
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
				})
			] }),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Opacidad",
				ayuda: `${Math.round(e.opacidad * 100)} %`,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "range",
					min: 0,
					max: 1,
					step: .05,
					className: "w-full accent-primary",
					value: e.opacidad,
					disabled: dis,
					onChange: (x) => cambio("opacidad", Number(x.target.value))
				})
			}),
			punto && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tamaño del punto",
				ayuda: `${e.tamanoPunto} px`,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "range",
					min: 2,
					max: 20,
					step: 1,
					className: "w-full accent-primary",
					value: e.tamanoPunto,
					disabled: dis,
					onChange: (x) => cambio("tamanoPunto", Number(x.target.value))
				})
			}), /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Forma del punto",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: e.formaPunto,
					disabled: dis,
					onChange: (x) => cambio("formaPunto", x.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "CIRCULO",
						children: "Círculo"
					}), /* @__PURE__ */ jsx("option", {
						value: "CUADRADO",
						children: "Cuadrado"
					})]
				})
			})] }),
			g !== "RASTER" && /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Etiqueta",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: e.etiqueta,
					disabled: dis,
					onChange: (x) => cambio("etiqueta", x.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Sin etiqueta"
					}), capa.campos.map((c) => /* @__PURE__ */ jsx("option", {
						value: c.nombre,
						children: c.nombre
					}, c.nombre))]
				})
			}),
			puede && /* @__PURE__ */ jsxs("div", {
				className: "flex justify-end gap-2 border-t border-border pt-3",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					disabled: !sucio,
					onClick: () => setE(capa.estilo),
					children: "Descartar cambios"
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					disabled: !sucio,
					onClick: guardar,
					children: [/* @__PURE__ */ jsx(Save, {}), " Guardar estilo"]
				})]
			})
		]
	});
}
var NOMBRE_ORIGEN = {
	ARCHIVO: "Archivo",
	URL: "Desde URL",
	SERVICIO: "Servicio",
	SISTEMA: "Del sistema"
};
var NOMBRE_CAMPO = {
	texto: "Texto",
	numero: "Número",
	fecha: "Fecha",
	booleano: "Sí o no"
};
function PestanaOrigen({ capa }) {
	const o = capa.origen;
	const ext = capa.extension?.map((n) => n.toFixed(5)).join(", ");
	const filas = [
		["Tipo de origen", NOMBRE_ORIGEN[o.tipo]],
		["Formato", o.formato],
		["Archivo", o.nombreArchivo],
		["Dirección (URL)", o.url],
		["Servicio", o.servicio ? `${o.servicio.tipo}${o.servicio.capa ? ` · ${o.servicio.capa}` : ""}` : void 0],
		["Capa del sistema", o.sistema],
		["Geometría", NOMBRE_GEOMETRIA[capa.geometria]],
		["CRS original", capa.crsOriginal],
		["CRS de la base", "WGS 84 (EPSG:4326)"],
		["Entidades", capa.geometria === "RASTER" ? void 0 : String(capa.entidades)],
		["Extensión", ext],
		["Versión", String(capa.version)],
		["Agregada el", capa.creadoEl ? new Date(capa.creadoEl).toLocaleString("es-PE") : void 0]
	];
	const descargar = async () => {
		const blob = await leerOriginal(capa.id, capa.version);
		if (!blob) {
			toast.error("No hay archivo original guardado para esta versión de la capa");
			return;
		}
		descargarBlob(o.nombreArchivo || `${capa.abrev || "capa"}-v${capa.version}`, blob);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx("dl", {
				className: "text-sm",
				children: filas.filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-5 gap-2 border-b border-border py-1.5",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "col-span-2 text-xs text-muted-foreground",
						children: k
					}), /* @__PURE__ */ jsx("dd", {
						className: "col-span-3 break-all",
						children: v
					})]
				}, k))
			}),
			o.tipo === "ARCHIVO" && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: descargar,
				children: [/* @__PURE__ */ jsx(Download, {}), " Descargar archivo original"]
			}),
			/* @__PURE__ */ jsx(Tabla, {
				columnas: [{
					clave: "nombre",
					titulo: "Campo"
				}, {
					clave: "tipo",
					titulo: "Tipo",
					render: (c) => NOMBRE_CAMPO[c.tipo]
				}],
				filas: capa.campos,
				claveFila: (c) => c.nombre,
				vacio: "La capa no tiene campos de atributos."
			})
		]
	});
}
function PestanaRevision({ capa, projectId, puede, extensionProyecto }) {
	const [texto, setTexto] = useState("");
	const [error, setError] = useState("");
	const cambiar = (cambios, accion, aviso, motivo) => {
		actualizarCapa(projectId, capa.id, cambios, accion, motivo);
		setTexto("");
		setError("");
		toast.success(aviso);
	};
	const ejecutar = async () => {
		const fc = await leerDatosCapa(capa);
		if (!fc) {
			toast.error("No se encontraron los datos de la capa para revisarlos");
			return;
		}
		cambiar({ controles: controlesCapa(fc, extensionProyecto) }, "Ejecutó controles", "Controles actualizados");
	};
	const observar = () => {
		if (!texto.trim()) {
			setError("Escriba la observación: es el motivo que verá quien cargó la capa.");
			return;
		}
		cambiar({
			estado: "OBSERVADA",
			observaciones: texto.trim(),
			revisadoPor: usuario(),
			publicar: false
		}, "Observó", "Capa observada", texto.trim());
	};
	const fallidos = capa.controles.filter((c) => !c.ok).length;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-sm font-bold uppercase text-primary-dark",
				children: "Controles automáticos"
			}), puede && capa.geometria !== "RASTER" && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: ejecutar,
				children: [/* @__PURE__ */ jsx(Play, {}), " Ejecutar controles"]
			})]
		}), capa.controles.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: "Aún no se ejecutaron los controles de esta capa."
		}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
			className: "mb-1 text-xs text-muted-foreground",
			children: fallidos === 0 ? "Válida: pasa todos los controles." : `Observada: ${fallidos} control(es) sin cumplir.`
		}), /* @__PURE__ */ jsx("ul", {
			className: "space-y-1 text-sm",
			children: capa.controles.map((c) => /* @__PURE__ */ jsxs("li", {
				className: "flex items-start gap-2",
				children: [c.ok ? /* @__PURE__ */ jsx(CheckCircle2, {
					size: 16,
					className: "mt-0.5 shrink-0 text-success",
					"aria-label": "Cumple"
				}) : /* @__PURE__ */ jsx(XCircle, {
					size: 16,
					className: "mt-0.5 shrink-0 text-destructive",
					"aria-label": "No cumple"
				}), /* @__PURE__ */ jsxs("span", { children: [c.nombre, c.detalle && /* @__PURE__ */ jsx("span", {
					className: "block text-xs text-muted-foreground",
					children: c.detalle
				})] })]
			}, c.nombre))
		})] })] }), /* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("h3", {
				className: "mb-2 text-sm font-bold uppercase text-primary-dark",
				children: "Revisión"
			}),
			/* @__PURE__ */ jsxs("dl", {
				className: "mb-2 text-sm",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-5 gap-2 border-b border-border py-1.5",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "col-span-2 text-xs text-muted-foreground",
							children: "Estado"
						}), /* @__PURE__ */ jsx("dd", {
							className: "col-span-3",
							children: NOMBRE_ESTADO_CAPA[capa.estado]
						})]
					}),
					capa.revisadoPor && /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-5 gap-2 border-b border-border py-1.5",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "col-span-2 text-xs text-muted-foreground",
							children: "Revisado por"
						}), /* @__PURE__ */ jsx("dd", {
							className: "col-span-3",
							children: capa.revisadoPor
						})]
					}),
					capa.observaciones && /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-5 gap-2 border-b border-border py-1.5",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "col-span-2 text-xs text-muted-foreground",
							children: "Observaciones"
						}), /* @__PURE__ */ jsx("dd", {
							className: "col-span-3 whitespace-pre-line",
							children: capa.observaciones
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-5 gap-2 border-b border-border py-1.5",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "col-span-2 text-xs text-muted-foreground",
							children: "Mapa del proyecto"
						}), /* @__PURE__ */ jsx("dd", {
							className: "col-span-3",
							children: capa.publicar ? "Publicada como capa opcional" : "No publicada"
						})]
					})
				]
			}),
			!puede ? /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Revisan y publican el Administrador, el Coordinador y el Especialista técnico."
			}) : /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [capa.estado === "EN_REVISION" && /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Observación",
					error: error || void 0,
					ayuda: "Obligatoria para observar; opcional al aprobar.",
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						className: areaClase,
						value: texto,
						onChange: (e) => setTexto(e.target.value)
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap justify-end gap-2",
					children: [
						(capa.estado === "BORRADOR" || capa.estado === "OBSERVADA") && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							onClick: () => cambiar({ estado: "EN_REVISION" }, "Envió a revisión", "Capa enviada a revisión"),
							children: [/* @__PURE__ */ jsx(Send, {}), " Enviar a revisión"]
						}),
						capa.estado === "EN_REVISION" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							onClick: observar,
							children: [/* @__PURE__ */ jsx(XCircle, {}), " Observar capa"]
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							onClick: () => cambiar({
								estado: "APROBADA",
								observaciones: texto.trim(),
								revisadoPor: usuario()
							}, "Aprobó", "Capa aprobada", texto.trim() || void 0),
							children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Aprobar capa"]
						})] }),
						capa.estado === "APROBADA" && (capa.publicar ? /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							onClick: () => cambiar({ publicar: false }, "Retiró del Mapa del proyecto", "Capa retirada del Mapa del proyecto"),
							children: [/* @__PURE__ */ jsx(EyeOff, {}), " Retirar del Mapa del proyecto"]
						}) : /* @__PURE__ */ jsxs(Button, {
							type: "button",
							onClick: () => cambiar({ publicar: true }, "Publicó", "Capa publicada en el Mapa del proyecto"),
							children: [/* @__PURE__ */ jsx(Eye, {}), " Publicar en el Mapa del proyecto"]
						}))
					]
				})]
			})
		] })]
	});
}
//#endregion
//#region src/components/mapa/ServicioGis.tsx
/**
* Servicio GIS del proyecto (docs/PLAN-GIS-INTEROPERABILIDAD.md §3 a §6): publicación para QGIS y
* ArcGIS, descarga del paquete, plugins, cambios recibidos desde el escritorio, planos y actividad.
*/
var fecha = (iso) => {
	const d = new Date(iso);
	return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("es-PE", {
		dateStyle: "short",
		timeStyle: "short"
	});
};
var m2 = (n) => n == null ? "-" : `${n.toLocaleString("es-PE", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})} m²`;
var ESTADO = {
	EN_REVISION: ["warning", "En revisión"],
	APROBADO: ["success", "Aprobado"],
	OBSERVADO: ["destructive", "Observado"]
};
var ACCION = {
	ingreso: "Inició sesión",
	ingreso_fallido: "Ingreso fallido",
	lectura: "Leyó el servicio",
	descarga: "Descargó el proyecto",
	publicacion: "Publicó el proyecto",
	envio_cambios: "Envió cambios",
	aprobacion: "Aprobó un cambio",
	observacion: "Observó un cambio",
	plano: "Subió un plano",
	accesos: "Sincronizó accesos"
};
/** Vigente en gris y propuesto en el color primario, en la misma escala. */
function VistaCambio({ anterior, propuesta }) {
	const anillos = (g) => !g ? [] : g.type === "Polygon" ? g.coordinates : g.type === "MultiPolygon" ? g.coordinates.flat() : g.type === "LineString" ? [g.coordinates] : g.type === "Point" ? [[g.coordinates]] : [];
	const todos = [...anillos(anterior), ...anillos(propuesta)].flat();
	if (!todos.length) return null;
	const xs = todos.map((p) => p[0]);
	const ys = todos.map((p) => p[1]);
	const [x0, x1, y0, y1] = [
		Math.min(...xs),
		Math.max(...xs),
		Math.min(...ys),
		Math.max(...ys)
	];
	const k = Math.cos((y0 + y1) / 2 * (Math.PI / 180));
	const ancho = Math.max((x1 - x0) * k, y1 - y0, 1e-7);
	const P = 8;
	const S = 144;
	const pt = (p) => `${(P + (p[0] - x0) * k / ancho * S).toFixed(1)},${(P + (y1 - p[1]) / ancho * S).toFixed(1)}`;
	const dibujar = (g, clase) => anillos(g).map((r, i) => r.length === 1 ? /* @__PURE__ */ jsx("circle", {
		cx: pt(r[0]).split(",")[0],
		cy: pt(r[0]).split(",")[1],
		r: 4,
		className: clase
	}, i) : /* @__PURE__ */ jsx("polygon", {
		points: r.map(pt).join(" "),
		className: clase
	}, i));
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: `0 0 160 160`,
		className: "h-40 w-40 shrink-0 rounded-md border border-border bg-background",
		role: "img",
		"aria-label": "Geometría vigente en gris y propuesta en rojo",
		children: [dibujar(anterior, "fill-muted stroke-muted-foreground [stroke-dasharray:3_2]"), dibujar(propuesta, "fill-primary/15 stroke-primary [stroke-width:1.5]")]
	});
}
function ServicioGis({ abierto, onCerrar, projectId, puedePublicar, puedeAprobar, onPendientes }) {
	const [estado, setEstado] = useState(null);
	const [cambios, setCambios] = useState([]);
	const [planos, setPlanos] = useState([]);
	const [actividad, setActividad] = useState([]);
	const [error, setError] = useState("");
	const [ocupado, setOcupado] = useState("");
	const [copiado, setCopiado] = useState(false);
	const [soloPendientes, setSoloPendientes] = useState(true);
	const [observar, setObservar] = useState(null);
	const [texto, setTexto] = useState("");
	const [errorTexto, setErrorTexto] = useState("");
	const cargar = useCallback(async () => {
		setOcupado("leer");
		setError("");
		try {
			const e = await estadoPublicacion(projectId);
			setEstado(e);
			if (e) {
				const [c, p, a] = await Promise.all([
					leerCambios(projectId),
					leerPlanos(projectId),
					leerActividad(projectId)
				]);
				setCambios(c);
				setPlanos(p);
				setActividad(a);
				onPendientes?.(c.filter((x) => x.estado === "EN_REVISION").length);
			} else setActividad(await leerActividad(projectId));
		} catch (e) {
			setError(e.message);
		} finally {
			setOcupado("");
		}
	}, [projectId, onPendientes]);
	useEffect(() => {
		if (abierto) cargar();
	}, [abierto, cargar]);
	const publicar = async () => {
		setOcupado("publicar");
		setError("");
		try {
			const e = await publicarProyecto(projectId, usuarioWeb());
			toast.success("Proyecto publicado en el servicio GIS", { description: `${e.colecciones.length} capas listas para QGIS y ArcGIS.` });
			await cargar();
		} catch (e) {
			setError(e.message);
			setOcupado("");
		}
	};
	const descargar = async () => {
		setOcupado("descargar");
		try {
			const p = await descargarPaquete(projectId, usuarioWeb());
			toast.success("Paquete GIS descargado", { description: `${p.colecciones.length} capas en GeoJSON, sus estilos y el proyecto de QGIS.` });
		} catch (e) {
			setError(e.message);
		} finally {
			setOcupado("");
		}
	};
	const resolver = async (c, est, obs = "") => {
		try {
			await resolverCambio(c, est, usuarioWeb(), obs);
			toast.success(est === "APROBADO" ? "Cambio aprobado y publicado" : "Cambio observado", { description: est === "APROBADO" ? `${c.fid}: la web y el servicio GIS ya muestran la nueva geometría.` : `${c.nombreUsuario} verá la observación en su plugin.` });
			await cargar();
		} catch (e) {
			toast.error("No se pudo resolver el cambio", { description: e.message });
		}
	};
	const confirmarObservar = () => {
		if (!observar) return;
		if (!texto.trim()) {
			setErrorTexto("Escriba qué debe corregir quien envió el cambio.");
			return;
		}
		resolver(observar, "OBSERVADO", texto.trim());
		setObservar(null);
	};
	const copiar = async () => {
		try {
			await navigator.clipboard.writeText(urlOgc(projectId));
			setCopiado(true);
			setTimeout(() => setCopiado(false), 2e3);
		} catch {}
	};
	const pendientes = cambios.filter((c) => c.estado === "EN_REVISION");
	const visibles = soloPendientes ? pendientes : cambios;
	return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs(Modal, {
		abierto,
		onCerrar,
		ancho: "lg",
		titulo: "Servicio GIS del proyecto",
		descripcion: "Publique el proyecto para leerlo en QGIS o ArcGIS, descárguelo y revise lo que llega del escritorio.",
		children: [error && /* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: error
			})
		}), /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "publicacion",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "flex h-auto flex-wrap justify-start",
					children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "publicacion",
							children: "Publicación"
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "cambios",
							children: ["Cambios recibidos", pendientes.length ? ` (${pendientes.length})` : ""]
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "planos",
							children: "Planos"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "actividad",
							children: "Actividad"
						})
					]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "publicacion",
					className: "space-y-4 pt-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "min-w-0 text-sm",
								children: estado ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("p", { children: [
									/* @__PURE__ */ jsx(StatusBadge, {
										tono: "success",
										children: "Publicado"
									}),
									" ",
									estado.publicadoEl,
									" por",
									" ",
									estado.publicadoPor
								] }), estado.demostracion && /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-xs text-warning",
									children: "Con datos de demostración de Jauja: registre la delimitación y la concesión del proyecto en la base gráfica."
								})] }) : ocupado === "leer" ? /* @__PURE__ */ jsx("p", {
									className: "text-muted-foreground",
									children: "Consultando el servicio…"
								}) : /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx(StatusBadge, {
									tono: "neutral",
									children: "Sin publicar"
								}), " QGIS y ArcGIS aún no ven este proyecto."] })
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ jsxs(Button, {
									size: "sm",
									onClick: publicar,
									disabled: !puedePublicar || !!ocupado,
									title: puedePublicar ? void 0 : "Publican el Administrador, el Coordinador y el Especialista técnico",
									children: [
										/* @__PURE__ */ jsx(Upload, {}),
										" ",
										ocupado === "publicar" ? "Publicando…" : estado ? "Volver a publicar" : "Publicar al servicio GIS"
									]
								}), /* @__PURE__ */ jsxs(Button, {
									size: "sm",
									variant: "outline",
									onClick: descargar,
									disabled: !!ocupado,
									children: [
										/* @__PURE__ */ jsx(Download, {}),
										" ",
										ocupado === "descargar" ? "Armando…" : "Descargar proyecto GIS (.zip)"
									]
								})]
							})]
						}),
						estado && /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "titulo",
									titulo: "Capa publicada",
									render: (c) => c.titulo
								},
								{
									clave: "id",
									titulo: "Colección",
									render: (c) => /* @__PURE__ */ jsx("span", {
										className: "font-mono text-xs",
										children: c.id
									})
								},
								{
									clave: "n",
									titulo: "Entidades",
									alinear: "derecha",
									render: (c) => c.entidades.toLocaleString("es-PE")
								},
								{
									clave: "editable",
									titulo: "Desde el escritorio",
									render: (c) => c.editable ? /* @__PURE__ */ jsx(StatusBadge, {
										tono: "primary",
										children: "Admite cambios"
									}) : "Solo lectura"
								}
							],
							filas: estado.colecciones,
							claveFila: (c) => c.id
						}),
						/* @__PURE__ */ jsxs("section", {
							"aria-labelledby": "gis-conexion",
							children: [
								/* @__PURE__ */ jsx(Subtitulo, { children: /* @__PURE__ */ jsx("span", {
									id: "gis-conexion",
									children: "Conexión directa (sin plugin)"
								}) }),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "OGC API Features",
									ayuda: "QGIS 3.10 o superior y ArcGIS Pro 2.6 o superior la leen de forma nativa.",
									children: (id) => /* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx("input", {
											id,
											readOnly: true,
											value: urlOgc(projectId),
											className: `${controlClase} font-mono text-sm`,
											onFocus: (e) => e.currentTarget.select()
										}), /* @__PURE__ */ jsxs(Button, {
											size: "sm",
											variant: "outline",
											onClick: copiar,
											className: "h-9 shrink-0",
											children: [
												copiado ? /* @__PURE__ */ jsx(Check, {}) : /* @__PURE__ */ jsx(Copy, {}),
												" ",
												copiado ? "Copiada" : "Copiar"
											]
										})]
									})
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "mt-2 list-disc space-y-1 pl-5 text-sm",
									children: [
										/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "QGIS:" }), " Capa, Añadir capa, Añadir capa WFS / OGC API Features. Nueva conexión con esta dirección y autenticación Básica con su usuario y contraseña GIS."] }),
										/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "ArcGIS Pro:" }), " Insertar, Conexiones, Servidor, Nuevo servidor OGC API. Pegue la dirección y elija autenticación de usuario con las mismas credenciales."] }),
										/* @__PURE__ */ jsxs("li", { children: [
											"Las credenciales GIS las asigna el Administrador en",
											" ",
											/* @__PURE__ */ jsx(Link, {
												to: "/seguridad/acceso-gis",
												className: "font-semibold text-primary underline underline-offset-2",
												children: "Seguridad y configuración, Acceso GIS"
											}),
											"."
										] })
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("section", {
							"aria-labelledby": "gis-plugins",
							children: [
								/* @__PURE__ */ jsx(Subtitulo, { children: /* @__PURE__ */ jsx("span", {
									id: "gis-plugins",
									children: "Plugins de escritorio"
								}) }),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ jsx(Button, {
										size: "sm",
										variant: "outline",
										asChild: true,
										children: /* @__PURE__ */ jsxs("a", {
											href: `${urlServicio()}/plugin/qgis.zip`,
											download: true,
											children: [/* @__PURE__ */ jsx(Download, {}), " Plugin de QGIS (.zip)"]
										})
									}), /* @__PURE__ */ jsx(Button, {
										size: "sm",
										variant: "outline",
										asChild: true,
										children: /* @__PURE__ */ jsxs("a", {
											href: `${urlServicio()}/plugin/arcgis.zip`,
											download: true,
											children: [/* @__PURE__ */ jsx(Download, {}), " Caja de herramientas de ArcGIS (.zip)"]
										})
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "QGIS: Complementos, Administrar e instalar complementos, Instalar a partir de ZIP. ArcGIS Pro: descomprima y agregue PDGP.pyt desde Catálogo, Cajas de herramientas. Con el plugin se elige el proyecto y el predio, se generan planos y se envían cambios a revisión."
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "cambios",
					className: "space-y-3 pt-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: soloPendientes,
									onChange: (e) => setSoloPendientes(e.target.checked)
								}), "Solo en revisión"]
							}), /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => void cargar(),
								disabled: !!ocupado,
								children: [/* @__PURE__ */ jsx(RefreshCw, {}), " Actualizar"]
							})]
						}),
						!puedeAprobar && pendientes.length > 0 && /* @__PURE__ */ jsx(Aviso, {
							tipo: "info",
							children: "Aprueban u observan los cambios el Coordinador y el Administrador."
						}),
						visibles.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground",
							children: soloPendientes ? "No hay cambios en revisión." : "Aún no llegan cambios desde QGIS o ArcGIS."
						}),
						visibles.map((c) => {
							const [tono, nombre] = ESTADO[c.estado];
							const delta = c.areaAnterior != null && c.areaNueva != null ? c.areaNueva - c.areaAnterior : null;
							return /* @__PURE__ */ jsxs("article", {
								className: "rounded-md border border-border p-3",
								"aria-label": `Cambio de ${c.fid}`,
								children: [
									/* @__PURE__ */ jsxs("header", {
										className: "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ jsx(StatusBadge, {
											tono,
											children: nombre
										}), /* @__PURE__ */ jsxs("span", { children: [
											"Desde ",
											c.cliente,
											" · ",
											fecha(c.enviadoEl),
											" · ",
											c.nombreUsuario,
											" (",
											c.rol,
											")"
										] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-2 flex flex-col gap-3 sm:flex-row",
										children: [/* @__PURE__ */ jsx(VistaCambio, {
											anterior: c.anterior,
											propuesta: c.geometria
										}), /* @__PURE__ */ jsxs("div", {
											className: "min-w-0 flex-1 space-y-1 text-sm",
											children: [
												/* @__PURE__ */ jsxs("p", {
													className: "font-semibold",
													children: [
														c.coleccion === "predios" ? `Predio ${c.fid}` : `Capa ${c.coleccion} · entidad ${c.fid}`,
														": ",
														c.tipo === "NUEVO" ? "polígono nuevo" : "geometría modificada"
													]
												}),
												(c.areaAnterior != null || c.areaNueva != null) && /* @__PURE__ */ jsxs("p", {
													className: "tabular-nums",
													children: [
														m2(c.areaAnterior),
														" a ",
														m2(c.areaNueva),
														delta != null && ` (${delta >= 0 ? "+" : ""}${delta.toLocaleString("es-PE", { maximumFractionDigits: 2 })} m²)`
													]
												}),
												/* @__PURE__ */ jsxs("p", { children: [
													/* @__PURE__ */ jsx("span", {
														className: "text-muted-foreground",
														children: "Motivo:"
													}),
													" ",
													c.motivo
												] }),
												c.adjunto && /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("a", {
													href: urlAdjunto(c),
													className: "text-primary underline underline-offset-2",
													children: [/* @__PURE__ */ jsx(FileText, {
														className: "mr-1 inline size-4",
														"aria-hidden": true
													}), c.adjunto.nombre]
												}) }),
												c.estado !== "EN_REVISION" && /* @__PURE__ */ jsxs("p", {
													className: "text-xs text-muted-foreground",
													children: [
														nombre,
														" por ",
														c.resueltoPor,
														" el ",
														fecha(c.resueltoEl ?? ""),
														c.observacion ? `: ${c.observacion}` : ""
													]
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground",
													children: "Línea discontinua gris: vigente. Línea roja: propuesta."
												})
											]
										})]
									}),
									observar?.id === c.id && /* @__PURE__ */ jsx("div", {
										className: "mt-2",
										children: /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Observación",
											obligatorio: true,
											error: errorTexto || void 0,
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												value: texto,
												onChange: (e) => setTexto(e.target.value),
												placeholder: "Qué debe corregir quien envió el cambio",
												className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted h-auto min-h-20 py-2`
											})
										})
									}),
									c.estado === "EN_REVISION" && puedeAprobar && observar?.id === c.id && /* @__PURE__ */ jsxs("footer", {
										className: "mt-2 flex flex-wrap justify-end gap-2",
										children: [/* @__PURE__ */ jsx(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => setObservar(null),
											children: "Cancelar"
										}), /* @__PURE__ */ jsx(Button, {
											size: "sm",
											onClick: confirmarObservar,
											children: "Enviar observación"
										})]
									}),
									c.estado === "EN_REVISION" && puedeAprobar && observar?.id !== c.id && /* @__PURE__ */ jsxs("footer", {
										className: "mt-2 flex flex-wrap justify-end gap-2",
										children: [/* @__PURE__ */ jsx(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => {
												setObservar(c);
												setTexto("");
												setErrorTexto("");
											},
											children: "Observar"
										}), /* @__PURE__ */ jsxs(Button, {
											size: "sm",
											onClick: () => void resolver(c, "APROBADO"),
											children: [/* @__PURE__ */ jsx(Send, {}), " Aprobar y publicar"]
										})]
									})
								]
							}, c.id);
						})
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "planos",
					className: "pt-3",
					children: /* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "codigo",
								titulo: "Predio",
								render: (p) => /* @__PURE__ */ jsx(Link, {
									to: "/proyectos/$projectId/predios/$codigo/levantamiento-informacion-tecnica",
									params: {
										projectId,
										codigo: p.codigo
									},
									className: "font-mono text-primary underline underline-offset-2",
									children: p.codigo
								})
							},
							{
								clave: "tipo",
								titulo: "Plano",
								render: (p) => p.tipo
							},
							{
								clave: "archivo",
								titulo: "Archivo",
								render: (p) => /* @__PURE__ */ jsx("a", {
									href: urlPlano(p),
									target: "_blank",
									rel: "noreferrer",
									className: "text-primary underline underline-offset-2",
									children: p.nombreArchivo
								})
							},
							{
								clave: "por",
								titulo: "Generado por",
								render: (p) => `${p.nombreUsuario} · ${p.cliente}`
							},
							{
								clave: "fecha",
								titulo: "Fecha",
								render: (p) => fecha(p.enviadoEl)
							}
						],
						filas: planos,
						claveFila: (p) => p.id,
						vacio: "Aún no se suben planos desde QGIS o ArcGIS."
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "actividad",
					className: "pt-3",
					children: /* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "fecha",
								titulo: "Fecha",
								render: (a) => fecha(a.fecha)
							},
							{
								clave: "usuario",
								titulo: "Usuario",
								render: (a) => a.usuario
							},
							{
								clave: "accion",
								titulo: "Acción",
								render: (a) => ACCION[a.accion] ?? a.accion
							},
							{
								clave: "detalle",
								titulo: "Detalle",
								render: (a) => a.detalle
							}
						],
						filas: actividad,
						claveFila: (a, i) => `${a.fecha}-${i}`,
						vacio: "Sin actividad del servicio GIS en este proyecto."
					})
				})
			]
		})]
	}) });
}
//#endregion
//#region src/components/mapa/TablaAtributos.tsx
/** Filas que se dibujan; el resto se alcanza buscando. ponytail: sin virtualización. */
var MAXIMO = 500;
var texto = (v) => v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
/** Entidades de la capa elegida: buscar, ordenar, clic en la fila para resaltarla y exportar a Excel. */
function TablaAtributos({ capa, datos, resaltado, onElegir, onCerrar }) {
	const [buscar, setBuscar] = useState("");
	const [orden, setOrden] = useState(null);
	const filaRef = useRef(null);
	const campos = useMemo(() => capa.campos.length ? capa.campos.map((c) => c.nombre) : Object.keys(datos?.features[0]?.properties ?? {}), [capa.campos, datos]);
	const filas = useMemo(() => {
		const t = buscar.trim().toLocaleLowerCase("es-PE");
		const todas = (datos?.features ?? []).map((f, indice) => ({
			indice,
			p: f.properties ?? {}
		}));
		const filtradas = t ? todas.filter((f) => campos.some((c) => texto(f.p[c]).toLocaleLowerCase("es-PE").includes(t))) : todas;
		if (!orden) return filtradas;
		const { campo, asc } = orden;
		return [...filtradas].sort((a, b) => {
			const x = a.p[campo];
			const y = b.p[campo];
			const r = typeof x === "number" && typeof y === "number" ? x - y : texto(x).localeCompare(texto(y), "es-PE", { numeric: true });
			return asc ? r : -r;
		});
	}, [
		buscar,
		campos,
		datos,
		orden
	]);
	useEffect(() => {
		filaRef.current?.scrollIntoView({ block: "nearest" });
	}, [resaltado]);
	const exportar = () => exportarExcel(`atributos-${capa.abrev || capa.nombre}`, [{
		titulo: "N.º",
		valor: (f) => f.indice + 1
	}, ...campos.map((c) => ({
		titulo: c,
		valor: (f) => {
			const v = f.p[c];
			return typeof v === "number" ? v : texto(v);
		}
	}))], filas);
	const ordenar = (campo) => setOrden((o) => o?.campo === campo ? o.asc ? {
		campo,
		asc: false
	} : null : {
		campo,
		asc: true
	});
	return /* @__PURE__ */ jsxs("section", {
		"aria-label": `Tabla de atributos de ${capa.nombre}`,
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "flex flex-wrap items-center gap-2 border-b border-border px-3 py-1.5",
			children: [
				/* @__PURE__ */ jsxs("h2", {
					className: "text-sm font-bold uppercase text-primary-dark",
					children: ["Atributos · ", capa.nombre]
				}),
				/* @__PURE__ */ jsx("span", {
					className: "text-xs text-muted-foreground tabular-nums",
					children: datos ? `${filas.length} de ${datos.features.length} entidades${filas.length > MAXIMO ? `, se muestran ${MAXIMO}` : ""}` : capa.geometria === "RASTER" ? "Las capas ráster no tienen atributos" : "Cargando entidades"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "ml-auto flex items-center gap-1",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx(Search, {
								size: 16,
								className: "pointer-events-none absolute left-2 top-2 text-muted-foreground",
								"aria-hidden": true
							}), /* @__PURE__ */ jsx("input", {
								value: buscar,
								onChange: (e) => setBuscar(e.target.value),
								placeholder: "Buscar en los atributos",
								"aria-label": "Buscar en los atributos",
								className: `${controlClase} h-8 w-56 pl-8 text-sm`
							})]
						}),
						/* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Exportar lo filtrado a Excel",
							icono: Download,
							onClick: exportar,
							deshabilitado: !datos || filas.length === 0
						}),
						/* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Cerrar la tabla de atributos",
							icono: X,
							onClick: onCerrar
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "sticky top-0 bg-primary-soft text-primary-dark",
					children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: "h-9 px-3 text-left text-xs font-semibold uppercase",
						children: "N.º"
					}), campos.map((c) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						"aria-sort": orden?.campo === c ? orden.asc ? "ascending" : "descending" : void 0,
						className: "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase",
						children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => ordenar(c),
							className: "inline-flex items-center gap-1 hover:underline",
							children: [c, orden?.campo === c && (orden.asc ? /* @__PURE__ */ jsx(ArrowUp, {
								size: 14,
								"aria-hidden": true
							}) : /* @__PURE__ */ jsx(ArrowDown, {
								size: 14,
								"aria-hidden": true
							}))]
						})
					}, c))] })
				}), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [datos && filas.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: campos.length + 1,
						className: "px-3 py-6 text-center text-muted-foreground",
						children: buscar ? "Ninguna entidad coincide con la búsqueda." : "La capa no tiene entidades."
					}) }), filas.slice(0, MAXIMO).map((f) => {
						const activa = f.indice === resaltado;
						return /* @__PURE__ */ jsxs("tr", {
							ref: activa ? filaRef : void 0,
							tabIndex: 0,
							"aria-selected": activa,
							onClick: () => onElegir(f.indice),
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									onElegir(f.indice);
								}
							},
							className: `cursor-pointer border-t border-border hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${activa ? "bg-warning-soft! font-semibold" : ""}`,
							children: [/* @__PURE__ */ jsx("td", {
								className: "px-3 py-1.5 tabular-nums text-muted-foreground",
								children: f.indice + 1
							}), campos.map((c) => /* @__PURE__ */ jsx("td", {
								className: "max-w-64 truncate px-3 py-1.5",
								title: texto(f.p[c]),
								children: texto(f.p[c])
							}, c))]
						}, f.indice);
					})]
				})]
			})
		})]
	});
}
//#endregion
//#region src/hooks/use-mobile.tsx
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState(void 0);
	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
//#endregion
//#region src/lib/geo/exportar.ts
/**
* Exportación de una capa: GeoJSON, KML y CSV de atributos (docs/PLAN-BASE-GRAFICA.md §8; el
* Shapefile queda para después). Usa la descarga común, que deja la exportación en Actividad.
*/
var archivo = (nombre) => nombre.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "").toLowerCase() || "capa";
var esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var coords = (ps) => ps.map((p) => `${p[0]},${p[1]}`).join(" ");
function geometriaKml(g) {
	switch (g.type) {
		case "Point": return `<Point><coordinates>${g.coordinates[0]},${g.coordinates[1]}</coordinates></Point>`;
		case "LineString": return `<LineString><coordinates>${coords(g.coordinates)}</coordinates></LineString>`;
		case "Polygon": return `<Polygon>${g.coordinates.map((a, i) => `<${i ? "innerBoundaryIs" : "outerBoundaryIs"}><LinearRing><coordinates>${coords(a)}</coordinates></LinearRing></${i ? "innerBoundaryIs" : "outerBoundaryIs"}>`).join("")}</Polygon>`;
		case "MultiPoint": return `<MultiGeometry>${g.coordinates.map((c) => geometriaKml({
			type: "Point",
			coordinates: c
		})).join("")}</MultiGeometry>`;
		case "MultiLineString": return `<MultiGeometry>${g.coordinates.map((c) => geometriaKml({
			type: "LineString",
			coordinates: c
		})).join("")}</MultiGeometry>`;
		case "MultiPolygon": return `<MultiGeometry>${g.coordinates.map((c) => geometriaKml({
			type: "Polygon",
			coordinates: c
		})).join("")}</MultiGeometry>`;
		case "GeometryCollection": return `<MultiGeometry>${g.geometries.map(geometriaKml).join("")}</MultiGeometry>`;
	}
}
function aKml(fc, nombre) {
	const marcas = fc.features.filter((f) => f.geometry).map((f) => {
		const props = Object.entries(f.properties ?? {});
		const titulo = props.find(([k]) => /^(nombre|name|codigo|id)$/i.test(k))?.[1];
		return `<Placemark>${titulo !== void 0 ? `<name>${esc(titulo)}</name>` : ""}<ExtendedData>${props.map(([k, v]) => `<Data name="${esc(k)}"><value>${esc(v)}</value></Data>`).join("")}</ExtendedData>${geometriaKml(f.geometry)}</Placemark>`;
	}).join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>${esc(nombre)}</name>\n${marcas}\n</Document></kml>`;
}
function aCsv(fc) {
	const campos = [...new Set(fc.features.flatMap((f) => Object.keys(f.properties ?? {})))];
	const celda = (v) => {
		const s = v === null || v === void 0 ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
		return /[";\n]/.test(s) ? `"${s.replace(/"/g, "\"\"")}"` : s;
	};
	return [campos.map(celda).join(";"), ...fc.features.map((f) => campos.map((c) => celda(f.properties?.[c])).join(";"))].join("\n");
}
function exportarCapa(fc, nombre, formato) {
	const base = archivo(nombre);
	if (formato === "GeoJSON") descargarBlob(`${base}.geojson`, new Blob([JSON.stringify({
		...fc,
		name: nombre
	})], { type: "application/geo+json" }));
	else if (formato === "KML") descargarBlob(`${base}.kml`, new Blob([aKml(fc, nombre)], { type: "application/vnd.google-earth.kml+xml" }));
	else descargarBlob(`${base}.csv`, new Blob(["﻿" + aCsv(fc)], { type: "text/csv" }));
}
//#endregion
//#region src/routes/proyectos.$projectId.base-grafica.index.tsx?tsr-split=component
/** MapLibre no corre en el servidor: el mapa se carga en el navegador. */
function MapaCliente(props) {
	const [Mapa, setMapa] = useState(null);
	useEffect(() => {
		import("./MapView-CftjYrgX.js").then((m) => setMapa(() => m.default));
	}, []);
	if (!Mapa) return /* @__PURE__ */ jsx("div", {
		className: "h-full w-full animate-pulse bg-muted",
		role: "status",
		"aria-label": "Cargando mapa"
	});
	return /* @__PURE__ */ jsx(Mapa, { ...props });
}
var clave = (c) => `${c.id}@${c.version}`;
var ESTADOS = [
	["BORRADOR", "en borrador"],
	["EN_REVISION", "en revisión"],
	["APROBADA", "aprobada"],
	["OBSERVADA", "observada"]
];
function BaseGraficaPage() {
	const { projectId } = Route$1.useParams();
	const { anadir } = Route$1.useSearch();
	const [obligatoria, setObligatoria] = useState();
	const navigate = Route$1.useNavigate();
	const movil = useIsMobile();
	const rol = useRol();
	const puede = puedeGestionarCapas(rol);
	const [servicio, setServicio] = useState(false);
	const [pendientesGis, setPendientesGis] = useState(0);
	useEffect(() => {
		estadoPublicacion(projectId).then((e) => setPendientesGis(e?.cambiosPendientes ?? 0)).catch(() => setPendientesGis(0));
	}, [projectId]);
	const todas = useCapas(projectId);
	const capas = useMemo(() => todas.filter((c) => c.activa), [todas]);
	const [sel, setSel] = useState(null);
	const capaSel = capas.find((c) => c.id === sel) ?? null;
	const [pestana, setPestana] = useState("datos");
	const [izquierdo, setIzquierdo] = useState(true);
	const [derecho, setDerecho] = useState(true);
	const [hojaCapas, setHojaCapas] = useState(false);
	const [hojaPropiedades, setHojaPropiedades] = useState(false);
	const [tabla, setTabla] = useState(false);
	const [datos, setDatos] = useState({});
	const pedidos = useRef(/* @__PURE__ */ new Set());
	const [vistaPrevia, setVistaPrevia] = useState(null);
	const [enfocar, setEnfocar] = useState(null);
	const [resaltar, setResaltar] = useState(null);
	const [identificado, setIdentificado] = useState(null);
	const [medir, setMedir] = useState(null);
	const [mapaBase, setMapaBase] = useState("osm");
	const [sistema, setSistema] = useState({ puntos: false });
	const [estilosSistema, setEstilosSistema] = useState(() => leerEstilosSistema(projectId));
	const [cursor, setCursor] = useState(null);
	const [zoom, setZoom] = useState(null);
	const [opcion, setOpcion] = useState(null);
	const [reemplazar, setReemplazar] = useState();
	const [quitar, setQuitar] = useState(null);
	const [motivo, setMotivo] = useState("");
	const [errorMotivo, setErrorMotivo] = useState("");
	const extensionProyecto = useMemo(() => extension(prediosGeojson), []);
	useEffect(() => {
		if (!anadir) return;
		setOpcion(anadir);
		navigate({
			search: {},
			replace: true
		});
	}, [anadir, navigate]);
	useEffect(() => {
		for (const c of capas) {
			const k = clave(c);
			if (c.geometria === "RASTER" || pedidos.current.has(k)) continue;
			pedidos.current.add(k);
			leerDatosCapa(c).then((fc) => {
				if (fc) setDatos((s) => ({
					...s,
					[k]: fc
				}));
			});
		}
	}, [capas]);
	const capasMapa = useMemo(() => capas.map((c) => ({
		capa: vistaPrevia?.id === c.id ? {
			...c,
			estilo: vistaPrevia.estilo
		} : c,
		datos: datos[clave(c)]
	})), [
		capas,
		datos,
		vistaPrevia
	]);
	const onVistaPrevia = useCallback((estilo) => setVistaPrevia(estilo && sel ? {
		id: sel,
		estilo
	} : null), [sel]);
	const elegir = (id, p) => {
		setSel(id);
		if (p) setPestana(p);
		setDerecho(true);
		if (movil) {
			setHojaCapas(false);
			setHojaPropiedades(true);
		}
	};
	const exportar = async (c, formato) => {
		const fc = datos[clave(c)] ?? await leerDatosCapa(c);
		if (fc) exportarCapa(fc, c.nombre, formato);
	};
	const accion = (a, c) => {
		if (a === "zoom" && c.extension) setEnfocar([...c.extension]);
		else if (a === "propiedades") elegir(c.id, "datos");
		else if (a === "estilo") elegir(c.id, "estilo");
		else if (a === "tabla") {
			setSel(c.id);
			setTabla(true);
			setHojaCapas(false);
		} else if (a === "reemplazar") {
			setReemplazar(c);
			setOpcion(c.origen.tipo);
		} else if (a === "quitar") {
			setQuitar(c);
			setMotivo("");
			setErrorMotivo("");
		} else if (a === "subir" || a === "bajar") {
			const orden = [...capas].sort((x, y) => y.orden - x.orden);
			const i = orden.findIndex((x) => x.id === c.id);
			const otra = orden[a === "subir" ? i - 1 : i + 1];
			if (!otra) return;
			guardarCapas(projectId, todas.map((x) => x.id === c.id ? {
				...x,
				orden: otra.orden
			} : x.id === otra.id ? {
				...x,
				orden: c.orden
			} : x), a === "subir" ? "Subió en el orden de dibujo" : "Bajó en el orden de dibujo", c.nombre);
		} else if (a === "GeoJSON" || a === "KML" || a === "CSV") exportar(c, a);
	};
	const confirmarQuitar = () => {
		if (!quitar) return;
		if (!motivo.trim()) {
			setErrorMotivo("Escriba el motivo: queda en el histórico de la capa.");
			return;
		}
		actualizarCapa(projectId, quitar.id, {
			activa: false,
			visible: false,
			publicar: false
		}, "Quitó", motivo.trim());
		if (sel === quitar.id) setSel(null);
		if (resaltar?.capaId === quitar.id) setResaltar(null);
		setIdentificado(null);
		setQuitar(null);
	};
	const elegirFila = (indice) => {
		if (!capaSel) return;
		setResaltar({
			capaId: capaSel.id,
			indice
		});
		const f = datos[clave(capaSel)]?.features[indice];
		const e = f && extension({
			type: "FeatureCollection",
			features: [f]
		});
		if (e) setEnfocar(e);
	};
	const conteo = ESTADOS.map(([e, t]) => [capas.filter((c) => c.estado === e).length, t]).filter(([n]) => n > 0).map(([n, t]) => `${n} ${t}${n > 1 && !t.startsWith("en ") ? "s" : ""}`).join(", ");
	const panelCapas = /* @__PURE__ */ jsx(PanelCapas, {
		projectId,
		capas,
		sistema,
		onSistema: (id, v) => setSistema((s) => ({
			...s,
			[id]: v
		})),
		estilosSistema,
		onEstiloSistema: (id, estilo) => {
			const e = {
				...estilosSistema,
				[id]: estilo
			};
			setEstilosSistema(e);
			guardarEstilosSistema(projectId, e);
		},
		seleccionada: sel,
		onSeleccionar: (id) => elegir(id),
		onVisible: (c, v) => actualizarCapa(projectId, c.id, { visible: v }, v ? "Mostró la capa" : "Ocultó la capa"),
		onAccion: accion,
		puedeGestionar: puede,
		onAgregarObligatoria: (clave) => {
			setReemplazar(void 0);
			setObligatoria(clave);
			setOpcion("ARCHIVO");
		}
	});
	const panelPropiedades = capaSel && /* @__PURE__ */ jsx(PropiedadesCapa, {
		capa: capaSel,
		projectId,
		puedeGestionar: puede,
		extensionProyecto,
		pestana,
		onPestana: setPestana,
		onVistaPrevia,
		onCerrar: movil ? void 0 : () => setDerecho(false)
	}, capaSel.id);
	return /* @__PURE__ */ jsxs(AppShell, {
		sinAlertaCapas: true,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex h-[calc(100dvh-3.5rem-2rem)] flex-col",
				children: [/* @__PURE__ */ jsx(ProyectoEncabezado, {
					projectId,
					titulo: "Base gráfica",
					icono: Layers,
					descripcion: "",
					acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
						/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								disabled: !puede,
								title: puede ? void 0 : "Su perfil solo consulta y exporta capas",
								children: [
									/* @__PURE__ */ jsx(Plus, {}),
									" Añadir datos ",
									/* @__PURE__ */ jsx(ChevronDown, {})
								]
							})
						}), /* @__PURE__ */ jsx(DropdownMenuContent, {
							align: "end",
							className: "w-80",
							children: OPCIONES_ANADIR.map((o) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
								onSelect: () => {
									setReemplazar(void 0);
									setObligatoria(void 0);
									setOpcion(o.opcion);
								},
								className: "flex-col items-start gap-0",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: o.nombre
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: o.detalle
								})]
							}, o.opcion))
						})] }),
						/* @__PURE__ */ jsxs(Button, {
							size: "sm",
							variant: "outline",
							disabled: !capaSel || capaSel.geometria === "RASTER",
							"aria-pressed": tabla,
							title: capaSel ? void 0 : "Elija una capa",
							onClick: () => setTabla((t) => !t),
							children: [
								/* @__PURE__ */ jsx(Table2, {}),
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "sr-only sm:not-sr-only",
									children: "Tabla de atributos"
								})
							]
						}),
						/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "outline",
								disabled: !capaSel || capaSel.geometria === "RASTER",
								title: capaSel ? void 0 : "Elija una capa",
								children: [
									/* @__PURE__ */ jsx(Download, {}),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "sr-only sm:not-sr-only",
										children: "Exportar"
									}),
									" ",
									/* @__PURE__ */ jsx(ChevronDown, {})
								]
							})
						}), /* @__PURE__ */ jsx(DropdownMenuContent, {
							align: "end",
							children: [
								"GeoJSON",
								"KML",
								"CSV"
							].map((f) => /* @__PURE__ */ jsx(DropdownMenuItem, {
								onSelect: () => capaSel && void exportar(capaSel, f),
								children: f === "CSV" ? "CSV de atributos" : f
							}, f))
						})] }),
						/* @__PURE__ */ jsxs(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => setServicio(true),
							children: [
								/* @__PURE__ */ jsx(Share2, {}),
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "sr-only sm:not-sr-only",
									children: "Servicio GIS"
								}),
								pendientesGis > 0 && /* @__PURE__ */ jsxs("span", {
									className: "rounded-sm bg-warning-soft px-1.5 text-xs font-semibold text-warning",
									children: [pendientesGis, /* @__PURE__ */ jsx("span", {
										className: "sr-only",
										children: " cambios en revisión"
									})]
								})
							]
						})
					] })
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card",
					children: [
						movil && /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2 border-b border-border p-2",
							children: [/* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setHojaCapas(true),
								children: [
									/* @__PURE__ */ jsx(Layers, {}),
									" Capas (",
									capas.length,
									")"
								]
							}), /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "outline",
								disabled: !capaSel,
								onClick: () => setHojaPropiedades(true),
								children: [/* @__PURE__ */ jsx(Settings2, {}), " Propiedades"]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex min-h-0 flex-1",
							children: [
								!movil && (izquierdo ? /* @__PURE__ */ jsxs("aside", {
									"aria-label": "Capas",
									className: "flex w-72 shrink-0 flex-col border-r border-border",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between border-b border-border px-3 py-1.5",
										children: [/* @__PURE__ */ jsx("h2", {
											className: "text-sm font-bold uppercase text-primary-dark",
											children: "Capas"
										}), /* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Ocultar panel de capas",
											icono: PanelLeftClose,
											onClick: () => setIzquierdo(false)
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "min-h-0 flex-1",
										children: panelCapas
									})]
								}) : /* @__PURE__ */ jsx("div", {
									className: "shrink-0 border-r border-border p-1",
									children: /* @__PURE__ */ jsx(BotonIcono, {
										nombre: "Mostrar panel de capas",
										icono: PanelLeftOpen,
										onClick: () => setIzquierdo(true)
									})
								})),
								/* @__PURE__ */ jsxs("div", {
									className: "relative min-w-0 flex-1",
									children: [
										/* @__PURE__ */ jsx(MapaCliente, {
											sinFiltrosPredios: true,
											layerVisibility: sistema,
											estilosSistema,
											capas: capasMapa,
											mapaBase,
											enfocar,
											resaltar,
											medir,
											onCursor: setCursor,
											onZoom: setZoom,
											onIdentificar: (r) => {
												setIdentificado(r);
												setResaltar(r ? {
													capaId: r.capa.id,
													indice: r.indice
												} : null);
											}
										}),
										/* @__PURE__ */ jsx(BarraMapa, {
											mapaBase,
											onMapaBase: setMapaBase,
											onExtension: () => extensionProyecto && setEnfocar([...extensionProyecto]),
											medir,
											onMedir: (m) => {
												setMedir(m);
												setIdentificado(null);
											}
										}),
										identificado && /* @__PURE__ */ jsx(IdentificarEntidad, {
											capa: identificado.capa,
											indice: identificado.indice,
											propiedades: identificado.propiedades,
											onCerrar: () => {
												setIdentificado(null);
												setResaltar(null);
											},
											onVerEnTabla: () => {
												setSel(identificado.capa.id);
												setTabla(true);
												setIdentificado(null);
											}
										})
									]
								}),
								!movil && capaSel && (derecho ? /* @__PURE__ */ jsx("aside", {
									"aria-label": "Propiedades",
									className: "w-96 shrink-0 border-l border-border",
									children: panelPropiedades
								}) : /* @__PURE__ */ jsx("div", {
									className: "shrink-0 border-l border-border p-1",
									children: /* @__PURE__ */ jsx(BotonIcono, {
										nombre: "Mostrar propiedades de la capa",
										icono: PanelRightOpen,
										onClick: () => setDerecho(true)
									})
								}))
							]
						}),
						tabla && capaSel && capaSel.geometria !== "RASTER" && /* @__PURE__ */ jsx("div", {
							className: "h-56 shrink-0 border-t border-border md:h-64",
							children: /* @__PURE__ */ jsx(TablaAtributos, {
								capa: capaSel,
								datos: datos[clave(capaSel)],
								resaltado: resaltar?.capaId === capaSel.id ? resaltar.indice : null,
								onElegir: elegirFila,
								onCerrar: () => setTabla(false)
							}, capaSel.id)
						}),
						/* @__PURE__ */ jsxs("footer", {
							"aria-label": "Estado del mapa",
							className: "flex flex-wrap items-center gap-x-4 gap-y-0.5 border-t border-border bg-background px-3 py-1 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "tabular-nums",
									children: cursor ? `Lat ${cursor.lat.toFixed(5)} · Long ${cursor.lng.toFixed(5)}` : "Mueva el puntero sobre el mapa"
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "tabular-nums",
									children: ["Zoom ", zoom == null ? "-" : zoom.toFixed(1)]
								}),
								/* @__PURE__ */ jsx("span", { children: "CRS WGS 84 (EPSG:4326)" }),
								/* @__PURE__ */ jsxs("span", { children: [
									capas.length,
									" ",
									capas.length === 1 ? "capa" : "capas",
									conteo ? `: ${conteo}` : ""
								] }),
								padronDemostrativo(projectId) && /* @__PURE__ */ jsx("span", {
									className: "text-warning",
									children: "Datos de demostración: padrón de Jauja"
								})
							]
						})
					]
				})]
			}),
			movil && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Sheet$1, {
				open: hojaCapas,
				onOpenChange: setHojaCapas,
				children: /* @__PURE__ */ jsxs(SheetContent, {
					side: "left",
					className: "flex w-[85vw] flex-col gap-0 p-0 pt-10",
					children: [/* @__PURE__ */ jsx(SheetTitle, {
						className: "px-3 pb-2 text-sm font-bold uppercase text-primary-dark",
						children: "Capas"
					}), /* @__PURE__ */ jsx("div", {
						className: "min-h-0 flex-1",
						children: panelCapas
					})]
				})
			}), /* @__PURE__ */ jsx(Sheet$1, {
				open: hojaPropiedades && !!capaSel,
				onOpenChange: setHojaPropiedades,
				children: /* @__PURE__ */ jsxs(SheetContent, {
					side: "right",
					className: "flex w-[92vw] flex-col gap-0 p-0 pt-10",
					children: [/* @__PURE__ */ jsx(SheetTitle, {
						className: "sr-only",
						children: "Propiedades de la capa"
					}), /* @__PURE__ */ jsx("div", {
						className: "min-h-0 flex-1",
						children: panelPropiedades
					})]
				})
			})] }),
			/* @__PURE__ */ jsx(Modal, {
				abierto: !!quitar,
				onCerrar: () => setQuitar(null),
				ancho: "sm",
				titulo: "Quitar capa",
				descripcion: quitar ? `«${quitar.nombre}» deja de verse en el mapa; queda en el histórico.` : void 0,
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					onClick: () => setQuitar(null),
					children: "Cancelar"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "destructive",
					onClick: confirmarQuitar,
					children: "Quitar capa"
				})] }),
				children: /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Motivo",
					obligatorio: true,
					error: errorMotivo || void 0,
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						value: motivo,
						onChange: (e) => setMotivo(e.target.value),
						className: `${controlClase} h-auto min-h-24 py-2`
					})
				})
			}),
			/* @__PURE__ */ jsx(ServicioGis, {
				abierto: servicio,
				onCerrar: () => setServicio(false),
				projectId,
				puedePublicar: puede,
				puedeAprobar: rol === "ADMIN" || rol === "COORDINADOR",
				onPendientes: setPendientesGis
			}),
			/* @__PURE__ */ jsx(AnadirDatos, {
				projectId,
				opcion,
				reemplazar,
				obligatoria,
				extensionProyecto,
				onCerrar: () => {
					setOpcion(null);
					setObligatoria(void 0);
					setReemplazar(void 0);
				},
				onAgregada: (c) => {
					setOpcion(null);
					setReemplazar(void 0);
					elegir(c.id, "datos");
					if (c.extension) setEnfocar([...c.extension]);
				}
			})
		]
	});
}
//#endregion
export { BaseGraficaPage as component };
