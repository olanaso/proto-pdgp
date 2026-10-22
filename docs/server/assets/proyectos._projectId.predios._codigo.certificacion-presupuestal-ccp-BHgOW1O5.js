import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.certificacion-presupuestal-ccp.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.certificacion-presupuestal-ccp-Db1FLkcX.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/certificacion-presupuestal-ccp")({
	head: () => ({ meta: [{ title: "Certificación presupuestal – CCP" }, {
		name: "description",
		content: "Registro de la Certificación de Crédito Presupuestario vinculada al predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
