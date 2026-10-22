import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.elevacion-expediente.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.elevacion-expediente-DplIzft_.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/elevacion-expediente")({
	head: () => ({ meta: [{ title: "Elevación del expediente" }, {
		name: "description",
		content: "Registro de la elevación del expediente y seguimiento de su recepción."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
