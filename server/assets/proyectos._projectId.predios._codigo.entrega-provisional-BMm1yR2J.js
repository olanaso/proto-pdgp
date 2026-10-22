import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.entrega-provisional.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.entrega-provisional-CdGfrbhn.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/entrega-provisional")({
	head: () => ({ meta: [{ title: "Entrega provisional" }, {
		name: "description",
		content: "Pedido, resolución y acta de entrega provisional del predio estatal desocupado (art. 41.11 del TUO del DL 1192, DL 1726)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
