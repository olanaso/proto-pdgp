import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.pago-propietarios.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.pago-propietarios-D2T2DVry.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/pago-propietarios")({
	head: () => ({ meta: [{ title: "Solicitud de pago · PDGP" }, {
		name: "description",
		content: "Registro de número de solicitud, propietario, monto, fecha, trazabilidad y envío a Administración/Tesorería."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
