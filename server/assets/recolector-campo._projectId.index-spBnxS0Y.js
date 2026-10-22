import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.index.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.index-Dk_tN-Hq.js");
var Route = createFileRoute("/recolector-campo/$projectId/")({
	head: () => ({ meta: [{ title: "Proyecto · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** ¿Qué va a registrar? Padrón (predio nuevo) o caracterización (predio existente). */
//#endregion
export { Route as t };
