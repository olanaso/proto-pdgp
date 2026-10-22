import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.expropiacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.expropiacion-BhbqhJhW.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/expropiacion")({
	head: () => ({ meta: [{ title: "Expropiación · PDGP" }, {
		name: "description",
		content: "Procedimiento expropiatorio del predio (Título IV del TUO del DL 1192, art. 24 a 38)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
