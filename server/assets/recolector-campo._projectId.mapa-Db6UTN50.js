import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.mapa.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.mapa-BFwo6L2J.js");
var Route = createFileRoute("/recolector-campo/$projectId/mapa")({
	validateSearch: (s) => ({ predio: typeof s.predio === "string" && s.predio ? s.predio : void 0 }),
	head: () => ({ meta: [{ title: "Mapa de campo · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Resumen de los cuatro bloques: completo si están todos, en curso si hay alguno. */
/**
* Mapa de campo: la ubicación del equipo en vivo y los predios del proyecto según lo que falta levantar.
* Tocar un predio muestra su ficha corta y «Caracterizar» abre su checklist.
*/
//#endregion
export { Route as t };
