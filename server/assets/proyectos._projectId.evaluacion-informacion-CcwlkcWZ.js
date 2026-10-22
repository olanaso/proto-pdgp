import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.evaluacion-informacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.evaluacion-informacion-grmb5tVy.js");
var Route = createFileRoute("/proyectos/$projectId/evaluacion-informacion")({
	head: () => ({ meta: [{ title: "Evaluación de información recibida · PDGP" }, {
		name: "description",
		content: "Evaluación de anexos recibidos y registro de necesidades derivadas del diagnóstico técnico general."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Los anexos a evaluar son los documentos y polígonos que llegaron con la solicitud STD al registro. */
/** Fecha aaaa-mm-dd a dd/mm/aaaa sin corrimiento de zona horaria. */
//#endregion
export { Route as t };
