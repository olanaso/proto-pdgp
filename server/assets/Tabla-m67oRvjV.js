import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/kit/Tabla.tsx
var ALINEAR = {
	izquierda: "text-left",
	derecha: "text-right",
	centro: "text-center"
};
/** Tabla ligera para listas dentro de una sección (versiones, historial). Sin filtros ni paginación. */
function Tabla({ columnas, filas, claveFila, claseFila, vacio = "Sin registros." }) {
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columnas.map((c) => /* @__PURE__ */ jsx("th", {
				scope: "col",
				style: c.ancho ? { width: c.ancho } : void 0,
				className: `h-9 whitespace-nowrap px-3 text-xs font-semibold uppercase ${ALINEAR[c.alinear ?? "izquierda"]}`,
				children: c.titulo
			}, c.clave)) }) }), /* @__PURE__ */ jsx("tbody", {
				className: "[&>tr:nth-child(even)]:bg-background",
				children: filas.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
					colSpan: columnas.length,
					className: "px-3 py-6 text-center text-sm text-muted-foreground",
					children: vacio
				}) }) : filas.map((f, i) => /* @__PURE__ */ jsx("tr", {
					className: `border-t border-border align-top ${claseFila?.(f, i) ?? ""}`,
					children: columnas.map((c) => /* @__PURE__ */ jsx("td", {
						className: `px-3 py-2 ${ALINEAR[c.alinear ?? "izquierda"]}`,
						children: c.render ? c.render(f, i) : String(f[c.clave] ?? "")
					}, c.clave))
				}, claveFila ? claveFila(f, i) : i))
			})]
		})
	});
}
//#endregion
export { Tabla as t };
