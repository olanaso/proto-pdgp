import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.index.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios.index-d4JtJOsr.js");
var Route = createFileRoute("/proyectos/$projectId/predios/")({
	head: () => ({ meta: [{ title: "Listado de predios · PDGP" }, {
		name: "description",
		content: "Predios del proyecto con su etapa actual y el plazo legal en curso."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
