import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.inscripcion-sunarp.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.inscripcion-sunarp-Bkw65ZbJ.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/inscripcion-sunarp")({
	head: () => ({ meta: [{ title: "Inscripción por SUNARP" }, {
		name: "description",
		content: "Inscripción de primera de dominio o independización a favor del MTC con la resolución de la autoridad (art. 41.3 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
