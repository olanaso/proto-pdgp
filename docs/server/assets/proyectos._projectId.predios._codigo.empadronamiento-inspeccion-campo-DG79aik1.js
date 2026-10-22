import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.empadronamiento-inspeccion-campo.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.empadronamiento-inspeccion-campo-CtVhliDu.js");
/** Clave de la pantalla en el almacén de fotos (M11). */
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/empadronamiento-inspeccion-campo")({
	head: () => ({ meta: [{ title: "Empadronamiento e inspección de campo · PDGP" }, {
		name: "description",
		content: "Registro del empadronamiento, inspección de campo y actas correspondientes al predio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Usuario de la sesión cuando no está en Usuarios (correo de ingreso). */
/** Una ficha por predio: al cambiar de predio se vuelve a montar y carga su última versión guardada. */
/**
* Acta de empadronamiento en blanco para llenar a mano en campo: lleva impresos su número, el proyecto y
* los datos del predio (código, expediente, sujeto pasivo); lo que se encuentra en campo queda en líneas.
*/
//#endregion
export { Route as t };
