import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.padron-preliminar.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.padron-preliminar-gqMkX7Vb.js");
var Route = createFileRoute("/proyectos/$projectId/padron-preliminar")({
	head: () => ({ meta: [{ title: "Padrón preliminar · PDGP" }, {
		name: "description",
		content: "Importación y validación del padrón preliminar de predios."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
