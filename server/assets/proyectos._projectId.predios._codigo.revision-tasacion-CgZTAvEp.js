import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.revision-tasacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.revision-tasacion-DsEj4_Uu.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/revision-tasacion")({
	head: () => ({ meta: [{ title: "Revisión de la tasación y pedido de CCP" }, {
		name: "description",
		content: "Revisión del informe de tasación contra la memoria descriptiva y pedido de la certificación presupuestal a la OGA."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
