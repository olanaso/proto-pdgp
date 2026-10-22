import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/seguridad.roles.$roleId.permisos.tsx
var $$splitComponentImporter = () => import("./seguridad.roles._roleId.permisos-B-TG3QrI.js");
var Route = createFileRoute("/seguridad/roles/$roleId/permisos")({
	head: () => ({ meta: [{ title: "Permisos por rol · PDGP" }, {
		name: "description",
		content: "Matriz de permisos por rol y módulo (8 a 29): lectura, edición, eliminación, impresión y supervisión."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Nombres legibles de los módulos (la clave del registro es el número) y de los perfiles. */
//#endregion
export { Route as t };
