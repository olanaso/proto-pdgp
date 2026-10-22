import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/kit/Section.tsx
/** Tarjeta de contenido con subtítulo en rojo oscuro y regla roja (motivo de identidad gob.pe). */
function Section({ titulo, acciones, children, className = "" }) {
	return /* @__PURE__ */ jsxs("section", {
		className: `rounded-lg border border-border bg-card p-4 ${className}`,
		children: [titulo && /* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-primary pb-1",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-bold uppercase text-primary-dark",
				children: titulo
			}), acciones && /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap items-center gap-2",
				children: acciones
			})]
		}), children]
	});
}
/** Subtítulo dentro de una sección ("CLIENTE: [+ AGREGAR]" en la referencia). */
function Subtitulo({ children, acciones }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-2 mt-4 flex items-center justify-between gap-3 border-b border-border pb-1 first:mt-0",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-sm font-bold uppercase text-primary-dark",
			children
		}), acciones]
	});
}
//#endregion
export { Subtitulo as n, Section as t };
