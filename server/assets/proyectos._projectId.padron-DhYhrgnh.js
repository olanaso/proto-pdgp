import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.padron.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.padron-xK1otd7t.js");
var Route = createFileRoute("/proyectos/$projectId/padron")({
	head: () => ({ meta: [{ title: "Padrón completo · PDGP" }, {
		name: "description",
		content: "Las columnas del padrón predial en cinco grupos, para revisar y exportar."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
