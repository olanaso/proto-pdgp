import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
//#region src/components/kit/Stepper.tsx
/** Pasos de un procedimiento. Un solo paso "actual"; el resto completado o pendiente. */
function Stepper({ pasos }) {
	return /* @__PURE__ */ jsx("ol", {
		"data-stepper": true,
		className: "flex flex-wrap gap-y-3",
		children: pasos.map((p, i) => {
			const contenido = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				className: `flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${p.estado === "completado" ? "bg-success text-primary-foreground" : p.estado === "actual" ? "bg-primary text-primary-foreground ring-4 ring-primary-soft" : "border border-border bg-card text-muted-foreground"}`,
				"aria-hidden": true,
				children: p.estado === "completado" ? /* @__PURE__ */ jsx(Check, { size: 14 }) : i + 1
			}), /* @__PURE__ */ jsxs("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("span", {
					className: `block text-sm ${p.estado === "actual" ? "font-semibold text-primary-dark" : "text-foreground"}`,
					children: p.nombre
				}), p.detalle && /* @__PURE__ */ jsx("span", {
					className: "block text-xs text-muted-foreground",
					children: p.detalle
				})]
			})] });
			return /* @__PURE__ */ jsx("li", {
				className: "flex min-w-[12rem] flex-1 items-start gap-2 pr-4",
				"aria-current": p.estado === "actual" ? "step" : void 0,
				children: p.to ? /* @__PURE__ */ jsx(Link, {
					to: p.to,
					params: p.params,
					className: "flex items-start gap-2 rounded-md hover:bg-muted",
					children: contenido
				}) : contenido
			}, p.nombre);
		})
	});
}
//#endregion
export { Stepper as t };
