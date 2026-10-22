import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.certificado-registral-inmobiliario.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.certificado-registral-inmobiliario-CLPZ3dQF.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/certificado-registral-inmobiliario")({
	head: () => ({ meta: [{ title: "Certificado Registral Inmobiliario – CRI" }, {
		name: "description",
		content: "Registro del CRI, titularidad, cargas y gravámenes del predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
