import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.requerimiento-entrega.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.requerimiento-entrega-DenugVmt.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/requerimiento-entrega")({
	head: () => ({ meta: [{ title: "Requerimiento único de entrega" }, {
		name: "description",
		content: "Requerimiento por única vez para que el sujeto pasivo entregue el inmueble, bajo apercibimiento de ejecución coactiva (art. 20.4.f del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
