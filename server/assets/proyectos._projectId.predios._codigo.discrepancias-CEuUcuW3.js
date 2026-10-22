import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.discrepancias.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.discrepancias-dLhuN_3X.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/discrepancias")({
	head: () => ({ meta: [{ title: "Discrepancias técnicas, legales y registrales · PDGP" }, {
		name: "description",
		content: "Regularización de la condición técnico legal del predio: discrepancias detectadas y su saneamiento."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
