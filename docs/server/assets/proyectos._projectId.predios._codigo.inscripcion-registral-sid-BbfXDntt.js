import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.inscripcion-registral-sid.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.inscripcion-registral-sid-Bxsiymna.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/inscripcion-registral-sid")({
	head: () => ({ meta: [{ title: "Presentación SID · Inscripción registral" }, {
		name: "description",
		content: "Preparación y envío del acto administrativo a los Registros Públicos (Sunarp) mediante la Plataforma de Interoperabilidad del Estado (PIDE)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
