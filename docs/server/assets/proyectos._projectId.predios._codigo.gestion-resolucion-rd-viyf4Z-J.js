import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.gestion-resolucion-rd.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.gestion-resolucion-rd-CSdhFV8L.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/gestion-resolucion-rd")({
	head: () => ({ meta: [{ title: "Resolución de aprobación del valor y notificación" }, {
		name: "description",
		content: "Resolución de aprobación del valor de tasación, su notificación al sujeto pasivo y la suscripción del instrumento de transferencia con el pago (art. 20.4 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Notificación de la resolución y suscripción del instrumento con pago (3 d.h. de gestión desde la emisión). */
//#endregion
export { Route as t };
