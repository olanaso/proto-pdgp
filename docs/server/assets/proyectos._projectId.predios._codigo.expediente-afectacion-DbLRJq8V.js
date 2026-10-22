import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.expediente-afectacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.expediente-afectacion-BnqnGrBl.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/expediente-afectacion")({
	head: () => ({ meta: [{ title: "Expediente de afectación predial" }, {
		name: "description",
		content: "Consolida el expediente técnico legal (2.1 a 2.5) y controla los 4 meses, 3 en APP, desde la comunicación de afectación (art. 17 del TUO del DL 1192; DCF Vigésima)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
