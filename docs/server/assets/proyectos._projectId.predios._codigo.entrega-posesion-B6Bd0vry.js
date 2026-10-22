import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.entrega-posesion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.entrega-posesion-CBIldrEK.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/entrega-posesion")({
	head: () => ({ meta: [{ title: "Entrega de posesión" }, {
		name: "description",
		content: "Registro del acta, fecha y estado de liberación del predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Plazo de entrega según la ruta y el perfil; `tope` solo donde cabe prórroga por acuerdo (art. 31). */
/** Vencimiento con la prórroga acordada; undefined sin hito de inicio. */
//#endregion
export { Route as t };
