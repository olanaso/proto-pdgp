import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.bim.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.bim-BQH1coK7.js");
var Route = createFileRoute("/proyectos/$projectId/bim")({
	head: () => ({ meta: [{ title: "Modelo BIM del proyecto · PDGP" }, {
		name: "description",
		content: "Generación del IFC consolidado del proyecto y visor 3D de lotes (ThatOpen)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
