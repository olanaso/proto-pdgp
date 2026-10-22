import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.sujeto-pasivo.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.caracterizacion._codigo.sujeto-pasivo--GMcw6ZX.js");
var Route = createFileRoute("/recolector-campo/$projectId/caracterizacion/$codigo/sujeto-pasivo")({
	head: () => ({ meta: [{ title: "Sujeto pasivo · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Documentos que exige la condición del titular (grupo de DOCUMENTOS_SUSTENTO). */
/** Sujeto pasivo levantado en campo: escribe el mismo registro que la pantalla 1.3 del escritorio. */
//#endregion
export { Route as t };
