import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.levantamiento-informacion-tecnica.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.levantamiento-informacion-tecnica-C-gWMrkL.js");
/** Clave de la pantalla en el almacén de fotos (M11). */
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/levantamiento-informacion-tecnica")({
	head: () => ({ meta: [{ title: "Levantamiento de información técnica · PDGP" }, {
		name: "description",
		content: "Registro de requerimientos, servicios, documentos enviados y productos recibidos del predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
export { Route as t };
