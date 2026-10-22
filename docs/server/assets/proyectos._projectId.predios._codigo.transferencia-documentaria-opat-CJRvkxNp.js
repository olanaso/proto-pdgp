import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.transferencia-documentaria-opat.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.transferencia-documentaria-opat-D9e_guEl.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/transferencia-documentaria-opat")({
	head: () => ({ meta: [{ title: "Transferencia documentaria a OPAT" }, {
		name: "description",
		content: "Registro, evidencias e historial de la transferencia del expediente documentario hacia OPAT."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
