import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.ley-autoritativa.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.ley-autoritativa-eNg6wC1X.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/ley-autoritativa")({
	head: () => ({ meta: [{ title: "Ley autoritativa y caducidad" }, {
		name: "description",
		content: "Ley autoritativa de expropiación que alcanza al predio y su caducidad a los 60 meses (art. 25 y 33 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
