import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.informe-verificador-especialista.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.informe-verificador-especialista-ep2jVXI-.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/informe-verificador-especialista")({
	head: () => ({ meta: [{ title: "Informe del verificador especialista · PDGP" }, {
		name: "description",
		content: "Generación del borrador, registro del informe firmado y trazabilidad del verificador especialista (art. 17 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
