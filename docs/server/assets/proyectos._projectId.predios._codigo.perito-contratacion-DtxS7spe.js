import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.perito-contratacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.perito-contratacion-MT2kidKK.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/perito-contratacion")({
	head: () => ({ meta: [{ title: "Perito y contratación" }, {
		name: "description",
		content: "Órgano de tasación, contratación del perito y supervisión del MTC (art. 14.1 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
