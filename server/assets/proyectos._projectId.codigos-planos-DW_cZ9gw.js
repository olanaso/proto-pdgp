import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.codigos-planos.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.codigos-planos-DtoW1XrP.js");
var Route = createFileRoute("/proyectos/$projectId/codigos-planos")({
	head: () => ({ meta: [{ title: "Códigos de plano · PDGP" }, {
		name: "description",
		content: "Listado y registro de códigos de plano del proyecto."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Línea de tiempo de seguimiento. La reutiliza la pantalla de códigos de predios. */
function HistorialTimeline({ events }) {
	return /* @__PURE__ */ jsx("ol", {
		className: "relative ml-1.5 space-y-4 border-l-2 border-border pl-5",
		children: events.map((e) => /* @__PURE__ */ jsxs("li", {
			className: "relative",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "absolute -left-6.75 top-1 size-3 rounded-sm border-2 border-card bg-primary",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-baseline gap-2",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-sm font-semibold",
							children: e.accion
						}),
						e.estado && /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: e.estado
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: fechaHora(e.fecha)
						})
					]
				}),
				e.detalle && /* @__PURE__ */ jsx("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: e.detalle
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: ["Por: ", e.usuario]
				})
			]
		}, e.id))
	});
}
//#endregion
export { Route as n, HistorialTimeline as t };
