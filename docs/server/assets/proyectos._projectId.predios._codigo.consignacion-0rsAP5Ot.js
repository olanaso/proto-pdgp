import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.consignacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.consignacion-XF31xbkY.js");
/** A nombre de quién se consigna según el caso especial (flujograma de la DDP). */
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/consignacion")({
	head: () => ({ meta: [{ title: "Consignación en el Banco de la Nación" }, {
		name: "description",
		content: "Consignación del valor de tasación, titular de la consignación y notificación notarial (art. 28, 6.4, 7.3 y 29 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** 10 d.h. libre, 30 ocupado, 90 con industria o comercio en funcionamiento (art. 28.1.e; DL 1559). */
/** El hito lo registró otra pantalla: aquí solo se muestra (no se pisa). */
//#endregion
export { Route as t };
