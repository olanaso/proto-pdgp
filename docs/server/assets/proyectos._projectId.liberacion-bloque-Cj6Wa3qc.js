import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.liberacion-bloque.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.liberacion-bloque-Cj89VVd7.js");
var Route = createFileRoute("/proyectos/$projectId/liberacion-bloque")({
	validateSearch: (s) => ({ bloque: typeof s.bloque === "string" && s.bloque ? s.bloque : void 0 }),
	head: () => ({ meta: [{ title: "Liberación en bloque · PDGP" }, {
		name: "description",
		content: "Bloques del proyecto (Título VIII, DL 1726): determinación, publicaciones, sectores, empadronamiento, padrón y liberación."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
