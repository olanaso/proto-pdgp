import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.expediente-digital.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.expediente-digital-CCO8y3ij.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/expediente-digital")({
	head: () => ({ meta: [{ title: "Expediente digital" }, {
		name: "description",
		content: "Visor, enlace compartible y supervisión de los documentos del expediente digital del predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
