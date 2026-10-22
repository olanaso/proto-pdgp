import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.index.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.caracterizacion._codigo.index-GmX3Loh6.js");
var Route = createFileRoute("/recolector-campo/$projectId/caracterizacion/$codigo/")({
	head: () => ({ meta: [{ title: "Predio · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Lo que se levanta en campo de un predio existente, en el orden en que se hace. */
//#endregion
export { Route as t };
