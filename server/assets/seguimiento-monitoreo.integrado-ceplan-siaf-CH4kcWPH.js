import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/seguimiento-monitoreo.integrado-ceplan-siaf.tsx
var $$splitComponentImporter = () => import("./seguimiento-monitoreo.integrado-ceplan-siaf-Bwea18aP.js");
var Route = createFileRoute("/seguimiento-monitoreo/integrado-ceplan-siaf")({
	validateSearch: (search) => ({ project: typeof search.project === "string" ? search.project : void 0 }),
	head: () => ({ meta: [{ title: "Seguimiento integrado CEPLAN · SIAF · Gestión Predial" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
