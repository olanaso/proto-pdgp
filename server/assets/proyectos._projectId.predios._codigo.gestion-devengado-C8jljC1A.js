import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.gestion-devengado.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.gestion-devengado-D7UFC8-t.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/gestion-devengado")({
	head: () => ({ meta: [{ title: "Gestión de devengado" }, {
		name: "description",
		content: "Generación y registro documental de la solicitud de devengado del predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
