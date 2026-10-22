import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.sujeto-pasivo.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.sujeto-pasivo-B3J63Q0E.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/sujeto-pasivo")({
	head: () => ({ meta: [{ title: "Sujeto pasivo · PDGP" }, {
		name: "description",
		content: "Titulares, condición jurídica, documentos, ocupantes e histórico del sujeto pasivo (art. 6 a 8 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Nombres legibles de los campos en el histórico. */
/** Punto de partida cuando el predio aún no tiene registro: los sujetos del padrón, sin documentos. */
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
