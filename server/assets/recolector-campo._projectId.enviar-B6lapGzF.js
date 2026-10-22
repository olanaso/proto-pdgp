import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.enviar.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.enviar-s01ql2dY.js");
var Route = createFileRoute("/recolector-campo/$projectId/enviar")({
	validateSearch: (s) => ({
		ids: typeof s.ids === "string" ? s.ids : void 0,
		volver: typeof s.volver === "string" ? s.volver : void 0
	}),
	head: () => ({ meta: [{ title: "Enviar al sistema · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Enviar al sistema: confirma qué sale del campo (fichas y bloques, fotos) y deja un envío por registro.
* ponytail: los datos ya están en el expediente; con backend, aquí se descarga la cola contra la API.
*/
//#endregion
export { Route as t };
