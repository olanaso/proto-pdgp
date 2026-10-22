import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.acuerdo-mejoras.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.acuerdo-mejoras-CtiNnuc2.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/acuerdo-mejoras")({
	head: () => ({ meta: [{ title: "Acuerdo y acta de reconocimiento de mejoras" }, {
		name: "description",
		content: "Acuerdo con el ocupante o poseedor: mejoras reconocidas, gastos de traslado, monto y pago (DCF Tercera del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
