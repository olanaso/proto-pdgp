import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.metas.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.metas-plY-DoBS.js");
var Route = createFileRoute("/proyectos/$projectId/metas")({
	head: () => ({ meta: [{ title: "Metas del proyecto · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Metas del proyecto (M26): el Coordinador registra, mes a mes, los predios a liberar y el monto a
* ejecutar del ejercicio y pide su aprobación a Presupuesto; Presupuesto las aprueba u observa aquí o en
* Gestión presupuestal. Mientras están en aprobación o aprobadas no se editan; observadas, sí.
*/
//#endregion
export { Route as t };
