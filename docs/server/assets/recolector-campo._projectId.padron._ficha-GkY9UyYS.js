import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.padron.$ficha.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.padron._ficha-Cj6wojX2.js");
var Route = createFileRoute("/recolector-campo/$projectId/padron/$ficha")({
	validateSearch: (s) => ({ nuevo: s.nuevo === true || s.nuevo === "true" ? true : void 0 }),
	head: () => ({ meta: [{ title: "Ficha de padrón · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Una ficha de padrón ya guardada: lo que se registró, su código provisional, el acta y si se envió. */
//#endregion
export { Route as t };
