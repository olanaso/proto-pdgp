import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.codigos-predios.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.codigos-predios-BxRGOXAV.js");
var Route = createFileRoute("/proyectos/$projectId/codigos-predios")({
	head: () => ({ meta: [{ title: "Códigos de predios · PDGP" }, {
		name: "description",
		content: "Listado de códigos de predios generados."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
