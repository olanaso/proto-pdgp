import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.requerimientos.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.requerimientos-CkX0RRd6.js");
var Route = createFileRoute("/proyectos/$projectId/requerimientos")({
	head: () => ({ meta: [{ title: "Requerimientos de información · PDGP" }, {
		name: "description",
		content: "Listado y gestión de requerimientos de información institucional del proyecto."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Fecha aaaa-mm-dd a dd/mm/aaaa sin corrimiento de zona horaria. */
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
