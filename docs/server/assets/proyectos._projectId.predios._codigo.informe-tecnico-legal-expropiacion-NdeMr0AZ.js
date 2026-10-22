import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.informe-tecnico-legal-expropiacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.informe-tecnico-legal-expropiacion-qko8FVNv.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/informe-tecnico-legal-expropiacion")({
	head: () => ({ meta: [{ title: "Informe técnico legal de expropiación" }, {
		name: "description",
		content: "Informe técnico legal que sustenta la expropiación por rechazo o silencio (art. 26, 27 y 28.1 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
