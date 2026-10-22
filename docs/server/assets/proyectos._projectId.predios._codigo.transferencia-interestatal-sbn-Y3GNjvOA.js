import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.transferencia-interestatal-sbn.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.transferencia-interestatal-sbn-DLM-jnjW.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/transferencia-interestatal-sbn")({
	head: () => ({ meta: [{ title: "Transferencia interestatal · SBN · PDGP" }, {
		name: "description",
		content: "Generación del oficio, presentación por mesa de partes y seguimiento de la transferencia interestatal ante la SBN (Título VI, art. 41 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
