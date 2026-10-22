import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.inicio-expropiacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.inicio-expropiacion-C65j2jF7.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/inicio-expropiacion")({
	head: () => ({ meta: [{ title: "Inicio de expropiación por rechazo o silencio" }, {
		name: "description",
		content: "Causal, fecha del rechazo o del vencimiento y cambio de ruta a expropiación (art. 26 y 27 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
