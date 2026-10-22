import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.respuesta-sujeto-pasivo.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.respuesta-sujeto-pasivo-BAGK1YFW.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/respuesta-sujeto-pasivo")({
	head: () => ({ meta: [{ title: "Respuesta del sujeto pasivo · PDGP" }, {
		name: "description",
		content: "Registro, validación documental, aceptación o rechazo y versionado de la respuesta del sujeto pasivo (art. 20.3 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
