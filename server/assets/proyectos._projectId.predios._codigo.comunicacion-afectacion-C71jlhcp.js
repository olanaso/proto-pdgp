import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.comunicacion-afectacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.comunicacion-afectacion-BYyPLTN6.js");
/** Usuario de la sesión cuando no está en Usuarios (correo de ingreso). */
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/comunicacion-afectacion")({
	head: () => ({ meta: [{ title: "Comunicación de afectación · PDGP" }, {
		name: "description",
		content: "Generación, notificación y trazabilidad de la comunicación de afectación al sujeto pasivo (art. 16.1 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
