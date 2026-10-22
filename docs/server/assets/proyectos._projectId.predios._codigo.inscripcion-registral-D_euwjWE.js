import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.inscripcion-registral.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.inscripcion-registral-CxJhUA2H.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/inscripcion-registral")({
	head: () => ({ meta: [{ title: "Inscripción registral" }, {
		name: "description",
		content: "Registro de la inscripción del predio ante SUNARP y su propietario final."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
