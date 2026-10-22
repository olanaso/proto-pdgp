import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/seguridad.anuncios.$id.tsx
var $$splitComponentImporter = () => import("./seguridad.anuncios._id-DXySuNLr.js");
var Route = createFileRoute("/seguridad/anuncios/$id")({
	head: () => ({ meta: [{ title: "Anuncio · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Nombre legible de cada campo en el histórico. */
/** Archivos que se pueden adjuntar al anuncio. */
//#endregion
export { Route as t };
