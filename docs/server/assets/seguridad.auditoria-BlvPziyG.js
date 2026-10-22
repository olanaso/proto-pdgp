import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { g as leerBitacora, h as codigoDeEntrada, l as MODULOS, m as cambiosEntre, p as BITACORA_EVENTO } from "./historial-Bc37nCTn.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, History } from "lucide-react";
//#region src/routes/seguridad.auditoria.tsx?tsr-split=component
var TONO = {
	crear: "success",
	editar: "primary",
	anular: "destructive",
	eliminar: "destructive",
	transicion: "warning",
	generar: "primary",
	exportar: "neutral",
	enviar: "primary",
	acceso: "neutral",
	ingreso: "success",
	ingreso_fallido: "destructive",
	salida: "neutral"
};
var PAGINA = 20;
function AuditoriaPage() {
	const [entradas, setEntradas] = useState([]);
	const [codigo, setCodigo] = useState("");
	const [desde, setDesde] = useState("");
	const [hasta, setHasta] = useState("");
	const [limite, setLimite] = useState(PAGINA);
	useEffect(() => {
		const cargar = () => setEntradas(leerBitacora());
		cargar();
		window.addEventListener(BITACORA_EVENTO, cargar);
		window.addEventListener("storage", cargar);
		return () => {
			window.removeEventListener(BITACORA_EVENTO, cargar);
			window.removeEventListener("storage", cargar);
		};
	}, []);
	const codigos = useMemo(() => [...new Set(entradas.map(codigoDeEntrada))].sort(), [entradas]);
	const filtradas = useMemo(() => entradas.filter((e) => {
		if (codigo && codigoDeEntrada(e) !== codigo) return false;
		const dia = e.fecha.slice(0, 10);
		if (desde && dia < desde) return false;
		if (hasta && dia > hasta) return false;
		return true;
	}), [
		entradas,
		codigo,
		desde,
		hasta
	]);
	const visibles = filtradas.slice(0, limite);
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: History,
			titulo: "Registro de auditoría",
			descripcion: "Ingresos, cierres de sesión, cambios de perfil y acciones sobre registros, del más reciente al más antiguo. Solo lectura.",
			migas: [{ texto: "Seguridad y configuración" }, { texto: "Registro de auditoría" }]
		}),
		/* @__PURE__ */ jsxs("form", {
			className: "mb-4 flex flex-wrap items-end justify-end gap-2",
			onSubmit: (e) => e.preventDefault(),
			"aria-label": "Filtros del registro",
			children: [
				/* @__PURE__ */ jsxs("label", {
					className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
					children: ["Acción", /* @__PURE__ */ jsxs("select", {
						value: codigo,
						onChange: (e) => setCodigo(e.target.value),
						className: `${controlClase} w-56`,
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Todas las acciones"
						}), codigos.map((c) => /* @__PURE__ */ jsx("option", {
							value: c,
							children: c
						}, c))]
					})]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
					children: ["Desde", /* @__PURE__ */ jsx("input", {
						type: "date",
						value: desde,
						max: hasta || void 0,
						onChange: (e) => setDesde(e.target.value),
						className: `${controlClase} w-40`
					})]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
					children: ["Hasta", /* @__PURE__ */ jsx("input", {
						type: "date",
						value: hasta,
						min: desde || void 0,
						onChange: (e) => setHasta(e.target.value),
						className: `${controlClase} w-40`
					})]
				}),
				(codigo || desde || hasta) && /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => {
						setCodigo("");
						setDesde("");
						setHasta("");
					},
					children: "Limpiar filtros"
				})
			]
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			role: "status",
			children: filtradas.length === entradas.length ? plural(entradas.length) : `${filtradas.length} de ${plural(entradas.length)}`
		}),
		visibles.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "rounded-lg border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground",
			children: entradas.length === 0 ? "Aún no hay entradas. Cada ingreso, cierre de sesión, cambio de perfil y guardado deja una." : "Ninguna entrada coincide con los filtros."
		}) : /* @__PURE__ */ jsx("ol", {
			className: "space-y-2",
			children: visibles.map((e) => /* @__PURE__ */ jsx(Entrada, { entrada: e }, e.id))
		}),
		filtradas.length > limite && /* @__PURE__ */ jsx("div", {
			className: "mt-4 flex justify-center",
			children: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setLimite((n) => n + PAGINA),
				children: [
					"Mostrar ",
					Math.min(PAGINA, filtradas.length - limite),
					" más"
				]
			})
		})
	] });
}
function Entrada({ entrada: e }) {
	const modulo = MODULOS.find((m) => m.numero === e.modulo);
	const cambios = cambiosEntre(e.antes, e.despues);
	const hayDetalle = Boolean(e.detalle || cambios.length || modulo);
	return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("details", {
		className: "group rounded-lg border border-border bg-card open:bg-muted/40",
		children: [/* @__PURE__ */ jsxs("summary", {
			className: `flex items-center gap-3 px-3 py-2 ${hayDetalle ? "cursor-pointer" : "cursor-default"} [&::-webkit-details-marker]:hidden`,
			children: [
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground",
					children: (e.usuario || "?").slice(0, 1).toUpperCase()
				}),
				/* @__PURE__ */ jsx(StatusBadge, {
					tono: TONO[e.accion],
					children: /* @__PURE__ */ jsx("span", {
						className: "font-mono normal-case",
						children: codigoDeEntrada(e)
					})
				}),
				/* @__PURE__ */ jsx("span", {
					className: "min-w-0 flex-1 truncate text-sm text-foreground",
					children: e.registro
				}),
				/* @__PURE__ */ jsx("span", {
					className: "hidden text-sm text-muted-foreground sm:inline",
					children: e.usuario
				}),
				/* @__PURE__ */ jsx("time", {
					dateTime: e.fecha,
					className: "text-sm text-primary-dark",
					children: fechaHora(e.fecha)
				}),
				/* @__PURE__ */ jsx(ChevronDown, {
					size: 16,
					"aria-hidden": true,
					className: `shrink-0 text-muted-foreground transition-transform group-open:rotate-180 ${hayDetalle ? "" : "invisible"}`
				})
			]
		}), hayDetalle && /* @__PURE__ */ jsxs("div", {
			className: "border-t border-border px-3 py-3 text-sm",
			children: [/* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[auto_1fr]",
				children: [
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Usuario"
					}),
					/* @__PURE__ */ jsx("dd", { children: e.usuario }),
					modulo && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Módulo"
					}), /* @__PURE__ */ jsxs("dd", { children: [
						"M",
						modulo.numero,
						" · ",
						modulo.nombre
					] })] }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Entidad"
					}),
					/* @__PURE__ */ jsx("dd", { children: e.entidad }),
					e.detalle && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Detalle"
					}), /* @__PURE__ */ jsx("dd", { children: e.detalle })] })
				]
			}), cambios.length > 0 && /* @__PURE__ */ jsxs("table", {
				className: "mt-3 w-full text-xs",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", {
						className: "px-2 py-1 text-left",
						children: "Campo"
					}),
					/* @__PURE__ */ jsx("th", {
						className: "px-2 py-1 text-left",
						children: "Antes"
					}),
					/* @__PURE__ */ jsx("th", {
						className: "px-2 py-1 text-left",
						children: "Después"
					})
				] }) }), /* @__PURE__ */ jsx("tbody", { children: cambios.map((c) => /* @__PURE__ */ jsxs("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ jsx("td", {
							className: "px-2 py-1 font-medium",
							children: c.campo
						}),
						/* @__PURE__ */ jsx("td", {
							className: "break-all px-2 py-1 text-muted-foreground",
							children: texto(c.antes)
						}),
						/* @__PURE__ */ jsx("td", {
							className: "break-all px-2 py-1",
							children: texto(c.despues)
						})
					]
				}, c.campo)) })]
			})]
		})]
	}) });
}
var plural = (n) => `${n} ${n === 1 ? "entrada" : "entradas"}`;
function texto(v) {
	if (v == null || v === "") return "(vacío)";
	if (typeof v === "object") return JSON.stringify(v);
	return String(v);
}
//#endregion
export { AuditoriaPage as component };
