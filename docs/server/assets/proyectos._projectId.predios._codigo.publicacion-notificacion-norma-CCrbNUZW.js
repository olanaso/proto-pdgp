import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.publicacion-notificacion-norma.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.publicacion-notificacion-norma-myQm1BZf.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/publicacion-notificacion-norma")({
	head: () => ({ meta: [{ title: "Publicación y notificación de la norma" }, {
		name: "description",
		content: "Publicación de la norma de expropiación en El Peruano y notificación notarial o por juez de paz (art. 28.4 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
