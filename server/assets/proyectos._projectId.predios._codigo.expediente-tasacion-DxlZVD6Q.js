import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.expediente-tasacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.expediente-tasacion--3XtVG-1.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/expediente-tasacion")({
	head: () => ({ meta: [{ title: "Expediente para tasación · PDGP" }, {
		name: "description",
		content: "Generación de memoria descriptiva, membretes y codificación de planos para la tasación (art. 17 y 18 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Planos firmados que están en el catálogo del paso; los demás se identifican por nombre. */
//#endregion
export { Route as t };
