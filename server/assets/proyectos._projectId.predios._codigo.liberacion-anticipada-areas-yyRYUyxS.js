import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.liberacion-anticipada-areas.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.liberacion-anticipada-areas-gTJNtJT3.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/liberacion-anticipada-areas")({
	head: () => ({ meta: [{ title: "Liberación anticipada de áreas" }, {
		name: "description",
		content: "Reunión informativa y de sensibilización y acta de compromiso de liberación de áreas, en proyectos con contrato NEC u obra de ejecución inmediata."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
