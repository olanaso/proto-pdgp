import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.padron.index.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.padron.index-DpUTvola.js");
var Route = createFileRoute("/recolector-campo/$projectId/padron/")({
	head: () => ({ meta: [{ title: "Fichas de padrón · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Fichas de padrón levantadas en el proyecto y la entrada a una nueva. */
//#endregion
export { Route as t };
