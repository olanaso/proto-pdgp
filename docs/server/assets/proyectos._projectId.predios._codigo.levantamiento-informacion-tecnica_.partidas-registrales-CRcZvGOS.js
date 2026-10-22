import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.levantamiento-informacion-tecnica_.partidas-registrales.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.levantamiento-informacion-tecnica_.partidas-registrales-D_aOi3WC.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/levantamiento-informacion-tecnica_/partidas-registrales")({
	head: () => ({ meta: [{ title: "Partidas registrales · PDGP" }, {
		name: "description",
		content: "Consulta de partidas registrales por oficina y número de partida, revisión de asientos y descarga en PDF."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
