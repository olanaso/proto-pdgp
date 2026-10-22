import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/proyectos.$projectId.predios.$codigo.pago-consignacion.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.predios._codigo.pago-consignacion-BOtulBT-.js");
var Route = createFileRoute("/proyectos/$projectId/predios/$codigo/pago-consignacion")({
	head: () => ({ meta: [{ title: "Pago o consignación" }, {
		name: "description",
		content: "Pago al sujeto pasivo en trato directo (art. 20.4), consignación en expropiación (art. 28) o pago del acuerdo de mejoras o del bloque."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Expediente del ciclo de gasto en la UE; se cruza con la exportación del SIAF-SP cargada en Metas. */
//#endregion
export { Route as t };
