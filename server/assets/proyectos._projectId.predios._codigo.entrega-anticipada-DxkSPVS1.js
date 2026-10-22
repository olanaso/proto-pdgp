import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.entrega-anticipada.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.entrega-anticipada-DODNGdgV.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/entrega-anticipada")({
	head: () => ({ meta: [{ title: "Entrega anticipada y contratos preparatorios" }, {
		name: "description",
		content: "Contratos preparatorios, pago a cuenta de hasta 50 %, bloqueo registral e incentivo del 30 % (art. 21.5 y 21.8 del TUO del DL 1192; DL 1559)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
