import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.ejecucion-coactiva.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.ejecucion-coactiva-DZywEV4G.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/ejecucion-coactiva")({
	head: () => ({ meta: [{ title: "Ejecución coactiva y descerraje" }, {
		name: "description",
		content: "Requerimiento al ejecutor coactivo, resolución, diligencia de lanzamiento y descerraje cuando vence el plazo de entrega sin acta (Título V del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Base legal y plazo de entrega que habilita la ejecución, según la ruta del predio. */
//#endregion
export { Route as t };
