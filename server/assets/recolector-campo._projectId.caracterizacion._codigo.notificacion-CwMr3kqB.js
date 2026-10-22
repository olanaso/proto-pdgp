import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.notificacion.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.caracterizacion._codigo.notificacion-BkDymETE.js");
var Route = createFileRoute("/recolector-campo/$projectId/caracterizacion/$codigo/notificacion")({
	head: () => ({ meta: [{ title: "Notificación y cargo · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Notificación y cargo en campo: la entrega de la comunicación de afectación, su resultado y el cargo
* firmado. Escribe la comunicación en el registro de la pantalla de escritorio y el cargo en el expediente.
*/
//#endregion
export { Route as t };
