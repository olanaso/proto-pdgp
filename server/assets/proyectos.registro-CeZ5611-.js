import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.registro.tsx
var $$splitComponentImporter = () => import("./proyectos.registro-DOIP1JaZ.js");
var Route = createFileRoute("/proyectos/registro")({
	validateSearch: (s) => ({ id: typeof s.id === "string" ? s.id : void 0 }),
	head: () => ({ meta: [{ title: "Registro de proyecto · PDGP" }, {
		name: "description",
		content: "Registro y edición de proyectos prediales con trazabilidad."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Movimientos deterministas a partir del código: la misma HR siempre muestra la misma ruta. */
/** Réplica de la pantalla «Datos del Expediente STD» de la Mesa de Partes: datos generales y movimientos. */
/**
* Capas obligatorias del proyecto (docs/PLAN-BASE-GRAFICA.md §10): sin Delimitación y Área de concesión
* no se registra el proyecto. Cada una se toma de un polígono de la solicitud STD o de un archivo.
*/
//#endregion
export { Route as t };
