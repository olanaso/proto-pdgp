import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.arbitraje.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.arbitraje-CK51U6VZ.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/arbitraje")({
	head: () => ({ meta: [{ title: "Arbitraje o vía judicial" }, {
		name: "description",
		content: "Cuestionamiento del valor, del remanente o de la duplicidad: caducidad de 2 años, oposición, laudo en 6 meses y pago del monto adicional (art. 34 a 38 del TUO del DL 1192)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
