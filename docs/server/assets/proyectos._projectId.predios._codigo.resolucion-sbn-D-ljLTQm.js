import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.resolucion-sbn.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.resolucion-sbn-B0JY2-Y7.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/resolucion-sbn")({
	head: () => ({ meta: [{ title: "Resolución de la SBN y publicación" }, {
		name: "description",
		content: "Resolución de transferencia de la SBN, la DGA del MEF o el gobierno regional con funciones transferidas y su publicación en El Peruano (art. 41.1 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
