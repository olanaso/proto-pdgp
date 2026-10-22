import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.caracterizacion.index.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.caracterizacion.index-CiHBTCzr.js");
var Route = createFileRoute("/recolector-campo/$projectId/caracterizacion/")({
	head: () => ({ meta: [{ title: "Elegir predio · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Elegir el predio a caracterizar: buscar, filtrar por lo que falta o los más cercanos. */
//#endregion
export { Route as t };
