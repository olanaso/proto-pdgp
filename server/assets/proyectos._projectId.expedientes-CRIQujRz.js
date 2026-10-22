import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.expedientes.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.expedientes-Cuql_nGN.js");
var Route = createFileRoute("/proyectos/$projectId/expedientes")({
	head: () => ({ meta: [{ title: "Expedientes del proyecto · PDGP" }, {
		name: "description",
		content: "Gestión de expedientes por predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
