import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.entidad-titular.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.entidad-titular-B_ZRocAW.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/entidad-titular")({
	head: () => ({ meta: [{ title: "Entidad titular y ocupantes" }, {
		name: "description",
		content: "Entidad titular registral del predio estatal, entidad ocupante, uso actual y ocupantes particulares (art. 41.5 y 41.8 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Los datos del perfil que se corrigen, sin los calculados. */
//#endregion
export { Route as t };
