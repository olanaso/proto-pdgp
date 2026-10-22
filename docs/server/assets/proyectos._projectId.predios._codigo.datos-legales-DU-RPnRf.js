import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.datos-legales.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.datos-legales-Dz5X9Kk4.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/datos-legales")({
	head: () => ({ meta: [{ title: "Datos legales · PDGP" }, {
		name: "description",
		content: "Registro de datos legales del predio: expediente, ubicación, titulares, lucro cesante y CBC."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* El padrón legal (`PadronLegalForm`) guarda sus campos sin estado propio, así que la versión se arma
* leyendo lo que el usuario tiene en pantalla al guardar: cada campo por su etiqueta y los titulares.
* ponytail: versiona pero no restaura ni recarga; para eso `PadronLegalForm` debe pasar a campos controlados.
*/
//#endregion
export { Route as t };
