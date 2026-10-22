import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.mapa.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.mapa-CIFTim0z.js");
var Route = createFileRoute("/proyectos/$projectId/mapa")({
	validateSearch: (search) => ({ predio: typeof search.predio === "string" && search.predio ? search.predio : void 0 }),
	head: () => ({ meta: [{ title: "Mapa del proyecto · PDGP" }, {
		name: "description",
		content: "Capas del proyecto y predios coloreados por su etapa actual."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** MapLibre no corre en el servidor: el mapa se carga en el navegador. */
/** Los mismos grupos que el panel de la Base gráfica: capas del sistema y luego las de cada clase. */
/** Centro del padrón de Jauja: la barra de coordenadas arranca aquí hasta que el puntero se mueve. */
//#endregion
export { Route as t };
