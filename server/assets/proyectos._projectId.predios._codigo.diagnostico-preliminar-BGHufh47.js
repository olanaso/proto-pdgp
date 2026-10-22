import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.diagnostico-preliminar.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.diagnostico-preliminar-DbSY5WB3.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/diagnostico-preliminar")({
	head: () => ({ meta: [{ title: "Diagnóstico preliminar · PDGP" }, {
		name: "description",
		content: "Diagnóstico físico, catastral, registral y legal del predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
