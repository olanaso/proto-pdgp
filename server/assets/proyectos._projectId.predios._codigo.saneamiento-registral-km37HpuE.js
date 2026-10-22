import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.saneamiento-registral.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.saneamiento-registral-Cy1DV1N4.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/saneamiento-registral")({
	head: () => ({ meta: [{ title: "Saneamiento registral y titulación · PDGP" }, {
		name: "description",
		content: "Preparación, presentación y seguimiento de la titulación del predio a favor del Ministerio de Transportes y Comunicaciones (DCF 2.ª del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
