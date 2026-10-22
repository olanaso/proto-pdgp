import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.normas-habilitantes.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.normas-habilitantes-Cp7FOjQo.js");
var Route = createFileRoute("/proyectos/$projectId/normas-habilitantes")({
	head: () => ({ meta: [{ title: "Normas habilitantes · PDGP" }, {
		name: "description",
		content: "Ley autoritativa de expropiación (art. 25 y 33) y declaratoria de necesidad pública (art. 41.1) del proyecto."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
