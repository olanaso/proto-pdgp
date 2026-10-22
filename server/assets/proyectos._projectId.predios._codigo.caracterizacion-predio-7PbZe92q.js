import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.caracterizacion-predio.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.caracterizacion-predio-CCN2XHVY.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/caracterizacion-predio")({
	head: () => ({ meta: [{ title: "Caracterización del predio · PDGP" }, {
		name: "description",
		content: "Memoria descriptiva, planos, partidas, fichas, fotografías, documentos técnicos, legales y componentes de valorización del predio (art. 17 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Datos de expediente que encabezan cada pestaña. */
/** Lista de registros de una pestaña: numeración, columnas propias y acción de eliminar. */
/** Tabla de solo lectura a partir de cabeceras y filas de texto. */
//#endregion
export { Route as t };
