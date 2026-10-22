import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.datos-tecnicos.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.datos-tecnicos-DC9_VcVP.js");
var Route$1 = createFileRoute("/proyectos/$projectId/predios/$codigo/datos-tecnicos")({
	head: () => ({ meta: [{ title: "Tasación / ITT · PDGP" }, {
		name: "description",
		content: "Generación del borrador, registro de peritos y versionado del Informe Técnico de Tasación (art. 18 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route$1 as t };
