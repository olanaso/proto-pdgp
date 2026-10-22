import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.declaratoria.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.declaratoria-cD8B-7PL.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/declaratoria")({
	head: () => ({ meta: [{ title: "Declaratoria de necesidad pública" }, {
		name: "description",
		content: "Declaratoria de necesidad pública del proyecto que alcanza al predio estatal (art. 41.1 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Vista del predio, en solo lectura: la declaratoria es dato del proyecto (§15.2). */
//#endregion
export { Route as t };
