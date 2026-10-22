import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.carta-intencion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.carta-intencion-Be4QcXrD.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/carta-intencion")({
	head: () => ({ meta: [{ title: "Carta de intención · PDGP" }, {
		name: "description",
		content: "Carta de intención de adquisición: generación, firma, notificación y trazabilidad (art. 20.2 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
