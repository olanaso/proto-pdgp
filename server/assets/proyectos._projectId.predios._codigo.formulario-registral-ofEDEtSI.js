import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.formulario-registral.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.formulario-registral-DXHVT52s.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/formulario-registral")({
	head: () => ({ meta: [{ title: "Formulario registral" }, {
		name: "description",
		content: "Registro del formulario registral suscrito para el predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
