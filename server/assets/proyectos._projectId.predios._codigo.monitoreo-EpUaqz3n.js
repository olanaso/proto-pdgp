import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.monitoreo.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.monitoreo-B9hswXz3.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/monitoreo")({
	head: () => ({ meta: [{ title: "Monitoreo" }, {
		name: "description",
		content: "Estado actual, porcentaje de avance, pendientes, alertas y observaciones del proceso predial."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Colores de barra: solo tokens del tema. */
//#endregion
export { Route as t };
