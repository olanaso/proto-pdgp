import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.requerimiento-tasacion-itl.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.requerimiento-tasacion-itl-BT18M7lA.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/requerimiento-tasacion-itl")({
	head: () => ({ meta: [{ title: "Presentación del expediente con fines de tasación" }, {
		name: "description",
		content: "Presentación del expediente técnico legal al órgano de tasación (art. 15 y DCF 3.ª del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
