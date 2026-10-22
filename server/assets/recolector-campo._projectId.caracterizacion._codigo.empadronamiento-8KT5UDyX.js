import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.empadronamiento.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.caracterizacion._codigo.empadronamiento-DCVd3DdO.js");
var Route = createFileRoute("/recolector-campo/$projectId/caracterizacion/$codigo/empadronamiento")({
	head: () => ({ meta: [{ title: "Empadronamiento · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Empadronamiento e inspección en campo: el mismo registro de la pantalla de escritorio (un empadronamiento
* realizado, con sus fotos y el acta numerada). Con «no se pudo empadronar» se omiten los pasos del
* ocupante y de lo que se ve.
*/
//#endregion
export { Route as t };
