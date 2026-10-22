import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.afectado-bloque.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.afectado-bloque-Dqsp4ndu.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/afectado-bloque")({
	head: () => ({ meta: [{ title: "Afectado en el bloque" }, {
		name: "description",
		content: "Afectado del predio en la liberación en bloque (DL 1726): sector, calificación, carta, respuesta, compensación, pagos y entrega."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
