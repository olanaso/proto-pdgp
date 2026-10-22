import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { r as cn, t as Button } from "./button-DH6ZQkjT.js";
import { d as DropdownMenuTrigger, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-D811JBGD.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { Dt as BotonIcono, E as Modal } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown, Download, History, MoreHorizontal, RotateCcw, Search, X } from "lucide-react";
//#region src/components/ui/skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
//#endregion
//#region src/components/kit/CrudPage.tsx
var POR_PAGINA = [
	10,
	20,
	50
];
function valorDe(fila, clave) {
	return fila[clave];
}
function comparar(a, b) {
	if (a == null && b == null) return 0;
	if (a == null) return 1;
	if (b == null) return -1;
	if (typeof a === "number" && typeof b === "number") return a - b;
	if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
	return String(a).localeCompare(String(b), "es-PE", { numeric: true });
}
function escribirUrl(valores) {
	if (typeof window === "undefined") return;
	const url = new URL(window.location.href);
	Object.entries(valores).forEach(([k, v]) => v ? url.searchParams.set(k, v) : url.searchParams.delete(k));
	window.history.replaceState(window.history.state, "", url);
}
/**
* Pantalla de lista estándar: título, filtros, tabla ordenable, acciones por fila con tooltip,
* paginación y estados (vacío, cargando, error). El estado de filtros vive en la URL.
*/
function CrudPage({ titulo, icono, descripcion, migas, acciones, columnas, filas, claveFila, accionesFila = [], filtros = [], filtrar, buscarEn, estado = "listo", onReintentar, vacio = "No hay registros.", onFilaClick, exportar, demo, placeholderBuscar = "Código, nombre o descripción", onVista, historial }) {
	const versionesLista = useHistorial(historial?.registro ?? "");
	const [vista, setVista] = useState("lista");
	const [historialDeFila, setHistorialDeFila] = useState(null);
	const searchStr = useRouterState({ select: (s) => s.location.searchStr });
	const inicial = () => new URLSearchParams(searchStr);
	const [q, setQ] = useState(() => inicial().get("q") ?? "");
	const [valores, setValores] = useState(() => {
		const u = inicial();
		return Object.fromEntries(filtros.map((f) => [f.clave, u.get(f.clave) ?? ""]));
	});
	const [orden, setOrden] = useState(() => {
		const o = inicial().get("orden");
		if (!o) return null;
		const [clave, dir] = o.split(":");
		return {
			clave,
			dir: dir === "desc" ? "desc" : "asc"
		};
	});
	const [pagina, setPagina] = useState(() => Number(inicial().get("pagina")) || 1);
	const [porPagina, setPorPagina] = useState(() => {
		const n = Number(inicial().get("porPagina"));
		return POR_PAGINA.includes(n) ? n : POR_PAGINA[0];
	});
	useEffect(() => {
		escribirUrl({
			q,
			...valores,
			orden: orden ? `${orden.clave}:${orden.dir}` : "",
			pagina: pagina > 1 ? String(pagina) : "",
			porPagina: porPagina !== POR_PAGINA[0] ? String(porPagina) : ""
		});
	}, [
		q,
		valores,
		orden,
		pagina,
		porPagina
	]);
	const claves = buscarEn ?? columnas.map((c) => c.clave);
	const filtradas = useMemo(() => {
		const texto = q.trim().toLocaleLowerCase("es-PE");
		return filas.filter((f) => {
			if (texto && !claves.some((k) => String(valorDe(f, k) ?? "").toLocaleLowerCase("es-PE").includes(texto))) return false;
			for (const fl of filtros) {
				const v = valores[fl.clave];
				if (v && String(valorDe(f, fl.clave) ?? "") !== v) return false;
			}
			return filtrar ? filtrar(f, valores) : true;
		});
	}, [
		filas,
		q,
		valores,
		filtros,
		filtrar,
		claves
	]);
	const ordenadas = useMemo(() => {
		if (!orden) return filtradas;
		const s = [...filtradas].sort((a, b) => comparar(valorDe(a, orden.clave), valorDe(b, orden.clave)));
		return orden.dir === "desc" ? s.reverse() : s;
	}, [filtradas, orden]);
	useEffect(() => {
		onVista?.(ordenadas);
	}, [ordenadas]);
	const total = ordenadas.length;
	const paginas = Math.max(1, Math.ceil(total / porPagina));
	const paginaActual = Math.min(pagina, paginas);
	const desde = total === 0 ? 0 : (paginaActual - 1) * porPagina + 1;
	const hasta = Math.min(paginaActual * porPagina, total);
	const visibles = ordenadas.slice(desde - 1, hasta);
	const hayFiltros = Boolean(q) || Object.values(valores).some(Boolean);
	const limpiar = () => {
		setQ("");
		setValores(Object.fromEntries(filtros.map((f) => [f.clave, ""])));
		setPagina(1);
	};
	const ordenarPor = (clave) => {
		setOrden((o) => o?.clave === clave ? o.dir === "asc" ? {
			clave,
			dir: "desc"
		} : null : {
			clave,
			dir: "asc"
		});
	};
	const accionesConHistorial = historial?.etiquetaFila ? [...accionesFila, {
		nombre: "Ver historial",
		icono: History,
		onClick: (f) => setHistorialDeFila(historial.etiquetaFila(f))
	}] : accionesFila;
	const alinear = (c) => c.alinear === "derecha" ? "text-right" : c.alinear === "centro" ? "text-center" : "text-left";
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono,
			titulo,
			descripcion,
			migas,
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [exportar && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => exportar(ordenadas),
				disabled: total === 0,
				children: [/* @__PURE__ */ jsx(Download, {}), " Exportar"]
			}), acciones] })
		}),
		historial && /* @__PURE__ */ jsx("div", {
			className: "mb-3 flex gap-1",
			role: "tablist",
			"aria-label": "Vista de la lista",
			children: [["lista", "Lista"], ["historico", `Histórico (${versionesLista.length})`]].map(([v, texto]) => /* @__PURE__ */ jsx("button", {
				type: "button",
				role: "tab",
				"aria-selected": vista === v,
				onClick: () => setVista(v),
				className: `rounded-md px-3 py-1.5 text-sm font-medium ${vista === v ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:bg-primary-soft"}`,
				children: texto
			}, v))
		}),
		historial && vista === "historico" ? /* @__PURE__ */ jsx("div", {
			className: "rounded-lg border border-border bg-card p-4",
			children: /* @__PURE__ */ jsx(Historico, {
				registro: historial.registro,
				etiquetas: historial.etiquetas,
				nombreArchivo: `historico-${historial.registro}`,
				puedeRestaurar: historial.puedeRestaurar,
				onRestaurar: historial.onRestaurar
			})
		}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 rounded-lg border border-border bg-card p-4",
			"data-ayuda": "filtros",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "block xl:col-span-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
						children: "Buscar"
					}), /* @__PURE__ */ jsxs("span", {
						className: "relative block",
						children: [/* @__PURE__ */ jsx(Search, {
							size: 16,
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("input", {
							type: "search",
							value: q,
							onChange: (e) => {
								setQ(e.target.value);
								setPagina(1);
							},
							placeholder: placeholderBuscar,
							className: `${controlClase} pl-9`
						})]
					})]
				}), filtros.map((f) => /* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
						children: f.etiqueta
					}), /* @__PURE__ */ jsxs("select", {
						value: valores[f.clave] ?? "",
						onChange: (e) => {
							setValores((v) => ({
								...v,
								[f.clave]: e.target.value
							}));
							setPagina(1);
						},
						className: controlClase,
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Todos"
						}), f.opciones.map((o) => /* @__PURE__ */ jsx("option", {
							value: o.valor,
							children: o.texto
						}, o.valor))]
					})]
				}, f.clave))]
			}), hayFiltros && /* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("span", { children: [
					total,
					" de ",
					filas.length,
					" registros coinciden"
				] }), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: limpiar,
					children: [/* @__PURE__ */ jsx(X, {}), " Limpiar filtros"]
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-border bg-card",
			"data-ayuda": "tabla",
			children: [
				demo && /* @__PURE__ */ jsx("p", {
					className: "border-b border-border bg-warning-soft px-4 py-1.5 text-xs text-warning",
					children: typeof demo === "string" ? demo : "Datos de demostración: esta lista no está conectada a un servicio."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [columnas.map((c) => {
							const activa = orden?.clave === c.clave;
							const ordenable = c.ordenable !== false;
							return /* @__PURE__ */ jsx("th", {
								scope: "col",
								style: c.ancho ? { width: c.ancho } : void 0,
								"aria-sort": activa ? orden?.dir === "asc" ? "ascending" : "descending" : void 0,
								className: `h-9 whitespace-nowrap px-3 text-xs font-semibold uppercase ${alinear(c)}`,
								children: ordenable ? /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => ordenarPor(c.clave),
									className: "inline-flex items-center gap-1 rounded-sm hover:underline",
									children: [c.titulo, activa ? orden?.dir === "asc" ? /* @__PURE__ */ jsx(ChevronUp, {
										size: 14,
										"aria-hidden": true
									}) : /* @__PURE__ */ jsx(ChevronDown, {
										size: 14,
										"aria-hidden": true
									}) : /* @__PURE__ */ jsx(ChevronsUpDown, {
										size: 14,
										className: "opacity-50",
										"aria-hidden": true
									})]
								}) : c.titulo
							}, c.clave);
						}), accionesConHistorial.length > 0 && /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 w-px whitespace-nowrap px-3 text-right text-xs font-semibold uppercase",
							children: "Acciones"
						})] }) }), /* @__PURE__ */ jsxs("tbody", {
							className: "[&>tr:nth-child(even)]:bg-background",
							children: [
								estado === "cargando" && Array.from({ length: Math.min(porPagina, 8) }).map((_, i) => /* @__PURE__ */ jsxs("tr", {
									className: "h-10 border-t border-border",
									children: [columnas.map((c) => /* @__PURE__ */ jsx("td", {
										className: "px-3",
										children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4" })
									}, c.clave)), accionesConHistorial.length > 0 && /* @__PURE__ */ jsx("td", {})]
								}, i)),
								estado === "error" && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", {
									colSpan: columnas.length + 1,
									className: "px-3 py-10 text-center",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm text-destructive",
										children: "No se pudo cargar la lista."
									}), onReintentar && /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										className: "mt-3",
										onClick: onReintentar,
										children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Reintentar"]
									})]
								}) }),
								estado === "listo" && total === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
									colSpan: columnas.length + 1,
									className: "px-3 py-10 text-center text-sm text-muted-foreground",
									children: hayFiltros ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
										"Ningún registro coincide con los filtros.",
										" ",
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: limpiar,
											className: "font-medium text-primary-dark underline",
											children: "Limpiar filtros"
										})
									] }) : vacio
								}) }),
								estado === "listo" && visibles.map((f, i) => /* @__PURE__ */ jsxs("tr", {
									tabIndex: onFilaClick ? 0 : void 0,
									onClick: onFilaClick ? () => onFilaClick(f) : void 0,
									onKeyDown: onFilaClick ? (e) => e.key === "Enter" && e.currentTarget === e.target && onFilaClick(f) : void 0,
									className: `h-10 border-t border-border ${onFilaClick ? "cursor-pointer hover:bg-primary-soft/40 focus-visible:bg-primary-soft/40" : ""}`,
									children: [columnas.map((c) => /* @__PURE__ */ jsx("td", {
										className: `px-3 py-1.5 align-middle ${alinear(c)}`,
										children: c.render ? c.render(f) : String(valorDe(f, c.clave) ?? "")
									}, c.clave)), accionesConHistorial.length > 0 && /* @__PURE__ */ jsx("td", {
										className: "px-3 py-1 text-right",
										onClick: (e) => e.stopPropagation(),
										children: /* @__PURE__ */ jsx(AccionesCelda, {
											fila: f,
											acciones: accionesConHistorial.filter((a) => !a.visible || a.visible(f))
										})
									})]
								}, claveFila ? claveFila(f) : desde + i))
							]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsxs("span", { children: [
						"Mostrando ",
						desde,
						"–",
						hasta,
						" de ",
						total
					] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx("select", {
								value: porPagina,
								onChange: (e) => {
									setPorPagina(Number(e.target.value));
									setPagina(1);
								},
								className: "h-8 rounded-md border border-border bg-card px-2 text-xs",
								"aria-label": "Registros por página",
								children: POR_PAGINA.map((n) => /* @__PURE__ */ jsx("option", {
									value: n,
									children: n
								}, n))
							}), "por página"]
						}), /* @__PURE__ */ jsxs("nav", {
							"aria-label": "Paginación",
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setPagina(paginaActual - 1),
									disabled: paginaActual <= 1,
									"aria-label": "Página anterior",
									className: "flex size-8 items-center justify-center rounded-md hover:bg-muted disabled:opacity-40",
									children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16 })
								}),
								numerosDePagina(paginaActual, paginas).map((n, i) => n === "…" ? /* @__PURE__ */ jsx("span", {
									className: "px-1",
									children: "…"
								}, `e${i}`) : /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setPagina(n),
									"aria-current": n === paginaActual ? "page" : void 0,
									className: `flex size-8 items-center justify-center rounded-md text-sm ${n === paginaActual ? "bg-primary font-semibold text-primary-foreground" : "hover:bg-muted"}`,
									children: n
								}, n)),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setPagina(paginaActual + 1),
									disabled: paginaActual >= paginas,
									"aria-label": "Página siguiente",
									className: "flex size-8 items-center justify-center rounded-md hover:bg-muted disabled:opacity-40",
									children: /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
								})
							]
						})]
					})]
				})
			]
		})] }),
		historial && /* @__PURE__ */ jsx(Modal, {
			abierto: historialDeFila !== null,
			onCerrar: () => setHistorialDeFila(null),
			ancho: "xl",
			titulo: `Historial: ${historialDeFila ?? ""}`,
			descripcion: "Cambios de este registro, del más reciente al más antiguo.",
			children: /* @__PURE__ */ jsx(Historico, {
				registro: historial.registro,
				etiquetas: historial.etiquetas,
				filtroInicial: historialDeFila ?? "",
				nombreArchivo: `historico-${historial.registro}`
			})
		})
	] });
}
function numerosDePagina(actual, total) {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	const lista = [...new Set([
		1,
		total,
		actual - 1,
		actual,
		actual + 1
	].filter((x) => x >= 1 && x <= total))].sort((a, b) => a - b);
	const out = [];
	lista.forEach((x, i) => {
		if (i > 0 && x - lista[i - 1] > 1) out.push("…");
		out.push(x);
	});
	return out;
}
/** Hasta 4 acciones visibles con tooltip; si hay más, 3 visibles y el resto en "Más". */
function AccionesCelda({ fila, acciones }) {
	const visibles = acciones.length > 4 ? acciones.slice(0, 3) : acciones;
	const resto = acciones.length > 4 ? acciones.slice(3) : [];
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-flex items-center gap-1",
		children: [visibles.map((a) => /* @__PURE__ */ jsx(BotonIcono, {
			nombre: a.nombre,
			icono: a.icono,
			destructiva: a.destructiva,
			onClick: () => a.onClick(fila)
		}, a.nombre)), resto.length > 0 && /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Más acciones",
				className: "flex size-8 items-center justify-center rounded-md border border-border text-primary-dark hover:bg-primary-soft",
				children: /* @__PURE__ */ jsx(MoreHorizontal, {
					size: 16,
					"aria-hidden": true
				})
			})
		}), /* @__PURE__ */ jsx(DropdownMenuContent, {
			align: "end",
			children: resto.map((a) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
				onSelect: () => a.onClick(fila),
				className: a.destructiva ? "text-destructive" : "",
				children: [
					/* @__PURE__ */ jsx(a.icono, {
						size: 16,
						"aria-hidden": true
					}),
					" ",
					a.nombre
				]
			}, a.nombre))
		})] })]
	});
}
//#endregion
export { CrudPage as t };
