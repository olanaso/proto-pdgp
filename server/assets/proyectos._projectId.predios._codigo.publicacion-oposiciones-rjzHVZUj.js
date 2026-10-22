import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.publicacion-oposiciones.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.publicacion-oposiciones-tjar2-Gi.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/publicacion-oposiciones")({
	head: () => ({ meta: [{ title: "Publicación y oposiciones" }, {
		name: "description",
		content: "Registro de publicaciones, avisos, oposiciones y resultado del procedimiento."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
