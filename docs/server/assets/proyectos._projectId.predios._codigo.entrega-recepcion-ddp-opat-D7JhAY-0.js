import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.entrega-recepcion-ddp-opat.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.entrega-recepcion-ddp-opat-D5XYzGyU.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/entrega-recepcion-ddp-opat")({
	head: () => ({ meta: [{ title: "Entrega y recepción DDP-OPAT" }, {
		name: "description",
		content: "Generación, suscripción y trazabilidad del acta de entrega y recepción entre DDP y OPAT."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
