import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.anotacion-preventiva.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.anotacion-preventiva-8Gj993ZW.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/anotacion-preventiva")({
	head: () => ({ meta: [{ title: "Anotación preventiva · PDGP" }, {
		name: "description",
		content: "Seguimiento de la anotación preventiva (art. 16.2 del TUO del DL 1192), generación documental y trazabilidad del trámite SUNARP."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Entidades a las que se comunicó la anotación: alta en línea y baja con motivo. */
//#endregion
export { Route as t };
