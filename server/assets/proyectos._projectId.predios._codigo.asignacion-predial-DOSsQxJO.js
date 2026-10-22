import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.asignacion-predial.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.asignacion-predial-CM2BeLIG.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/asignacion-predial")({
	head: () => ({ meta: [{ title: "Asignación predial · PDGP" }, {
		name: "description",
		content: "Asignación de brigadas, responsables adicionales e historial de atención del predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Lista flotante del autocompletado: la sombra marca la elevación del menú. */
/** "aaaa-mm-dd" del input de fecha a "dd/mm/aaaa", sin pasar por Date (evita el corrimiento de zona horaria). */
/** Una ficha por predio: al cambiar de predio se vuelve a montar y carga su última versión guardada. */
//#endregion
export { Route as t };
