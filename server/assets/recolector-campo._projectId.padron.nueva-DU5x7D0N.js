import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.padron.nueva.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.padron.nueva-rHUyGGKf.js");
var Route = createFileRoute("/recolector-campo/$projectId/padron/nueva")({
	head: () => ({ meta: [{ title: "Nueva ficha de padrón · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Ficha de padrón: la primera visita a un predio, en seis pasos. Al guardar el predio entra al proyecto
* (código provisional PAD-…), las fotos pasan a ese código y se numera el acta de padrón.
*/
//#endregion
export { Route as t };
