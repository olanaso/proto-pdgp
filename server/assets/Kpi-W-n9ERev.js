import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/kit/Kpi.tsx
/** Cifra de resumen de un tablero: valor grande, etiqueta y, si hace falta, un detalle o variación. */
function Kpi({ etiqueta, valor, detalle, icono: Icono }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3",
		children: [Icono && /* @__PURE__ */ jsx("span", {
			className: "flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx(Icono, { size: 18 })
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-lg font-semibold tabular-nums",
					children: valor
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: etiqueta
				}),
				detalle && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: detalle
				})
			]
		})]
	});
}
/** Fila de KPIs: 2 columnas en móvil, 4 en escritorio. */
function Kpis({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: "mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4",
		children
	});
}
//#endregion
export { Kpis as n, Kpi as t };
