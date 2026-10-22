import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.cbc.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.cbc-Csp4Mf8o.js");
/** Usuario de la sesión cuando no está en Usuarios (correo de ingreso). */
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/cbc")({
	head: () => ({ meta: [{ title: "Certificado de búsqueda catastral (CBC) · PDGP" }, {
		name: "description",
		content: "Gestión de solicitud, documentos y recepción del Certificado de Búsqueda Catastral SUNARP (art. 16.1 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
