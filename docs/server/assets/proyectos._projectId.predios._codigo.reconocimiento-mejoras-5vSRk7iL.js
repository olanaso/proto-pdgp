import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.reconocimiento-mejoras.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.reconocimiento-mejoras-D99FviH6.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/reconocimiento-mejoras")({
	head: () => ({ meta: [{ title: "Reconocimiento de mejoras · PDGP" }, {
		name: "description",
		content: "Reconocimiento y pago de mejoras al poseedor u ocupante (Tercera Disposición Complementaria Final del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
