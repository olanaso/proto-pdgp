import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.informe-tecnico-legal.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.informe-tecnico-legal-B_vUgkJ2.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/informe-tecnico-legal")({
	head: () => ({ meta: [{ title: "Informe técnico legal" }, {
		name: "description",
		content: "Generación, firma y control de versiones del Informe Técnico Legal."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** La respuesta del sujeto pasivo abre los 3 d.h. de gestión del informe; la fecha vive en el hito. */
//#endregion
export { Route as t };
