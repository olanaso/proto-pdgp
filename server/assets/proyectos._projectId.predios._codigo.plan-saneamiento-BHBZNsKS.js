import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.plan-saneamiento.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.plan-saneamiento-2eSxEVDj.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/plan-saneamiento")({
	head: () => ({ meta: [{ title: "Plan de saneamiento físico legal" }, {
		name: "description",
		content: "Plan de saneamiento físico legal con informe técnico legal del predio estatal (anexo 2 de la Directiva DIR-00001-2026/SBN)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
