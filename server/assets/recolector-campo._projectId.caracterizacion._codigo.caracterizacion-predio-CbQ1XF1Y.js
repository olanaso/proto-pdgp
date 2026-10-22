import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.caracterizacion-predio.tsx
var $$splitComponentImporter = () => import("./recolector-campo._projectId.caracterizacion._codigo.caracterizacion-predio-B42g5BMO.js");
var SUBS = [
	"viviendas",
	"obras",
	"instalaciones",
	"frutales",
	"forestales",
	"transitorias",
	"cercoVivo",
	"entorno"
];
var Route = createFileRoute("/recolector-campo/$projectId/caracterizacion/$codigo/caracterizacion-predio")({
	validateSearch: (s) => ({
		sub: SUBS.includes(s.sub) ? s.sub : void 0,
		agregar: s.agregar === true || s.agregar === "true" ? true : void 0
	}),
	head: () => ({ meta: [{ title: "Caracterización · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Lo que se levanta en campo de cada lista de la caracterización (docs/PLAN-RECOLECTOR-CAMPO.md §4.11). */
/**
* Caracterización levantada en campo: viviendas, obras, instalaciones, plantaciones, cerco vivo y entorno.
* Cada ítem entra a la misma lista de la pantalla de escritorio, con sus fotos en la sección de la fila.
*/
/** Un ítem nuevo de una lista: campos cortos y las fotos de la fila. */
/** Entorno del predio: acceso, servicios, vía y uso del entorno, con fotos. */
//#endregion
export { Route as t };
