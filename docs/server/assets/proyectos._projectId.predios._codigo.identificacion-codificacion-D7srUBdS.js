import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.identificacion-codificacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.identificacion-codificacion-B5qSeinb.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/identificacion-codificacion")({
	head: () => ({ meta: [{ title: "Identificación y codificación del predio · PDGP" }, {
		name: "description",
		content: "Registro de identificación plena, codificación, ubicación y datos técnicos preliminares del predio (art. 5 a 8 y 16 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/**
* Código de predio: no puede estar asignado a otro predio; vale el del padrón para este predio, el asignado
* en el registro, o uno digitado con el formato largo (al validarlo queda asignado).
*/
/** Expediente: formato NNNN-AAAA-MTC/DDP y no asignado a otro predio. */
//#endregion
export { Route as t };
