import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.modalidad-adquisicion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.modalidad-adquisicion-5vQrbR_s.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/modalidad-adquisicion")({
	head: () => ({ meta: [{ title: "Modalidad de adquisición" }, {
		name: "description",
		content: "Perfil legal del predio: condición, ruta (trato directo, expropiación, transferencia, mejoras) y datos que deciden su menú."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
