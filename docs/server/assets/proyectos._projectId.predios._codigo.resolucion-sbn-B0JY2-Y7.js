import { i as estadoPlazo, m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { X as GORES_CON_FUNCIONES } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.resolucion-sbn-D-ljLTQm.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.resolucion-sbn.tsx?tsr-split=component
var sections = [{
	title: "Resolución",
	fields: [
		{
			key: "emisora",
			label: "Entidad que resuelve",
			type: "select",
			options: [
				"SBN",
				"DGA DEL MEF",
				"GOBIERNO REGIONAL"
			],
			required: true
		},
		{
			key: "gobiernoRegional",
			label: "Gobierno regional",
			type: "select",
			options: GORES_CON_FUNCIONES,
			required: true,
			ayuda: "Solo los gobiernos regionales con funciones transferidas en bienes estatales.",
			visible: (ctx) => ctx.values.emisora === "GOBIERNO REGIONAL"
		},
		{
			key: "numero",
			label: "Número de resolución",
			required: true
		},
		{
			key: "fecha",
			label: "Fecha de resolución",
			type: "date",
			required: true,
			hito: "entrega_estatal"
		},
		{
			key: "plazoSbn",
			label: "Plazo de la SBN (45 d.h.)",
			type: "calculado",
			ayuda: "Se cuenta desde la fecha de presentación registrada en la Solicitud a la SBN.",
			calcular: (ctx) => {
				const e = estadoPlazo(ctx.hitos, "sbn_resolucion");
				if (!e) return "Sin solicitud registrada";
				return `${e.restantes < 0 ? "Venció" : "Vence"} el ${fecha(e.vence)}`;
			}
		},
		{
			key: "condiciones",
			label: "Condiciones de la transferencia",
			type: "textarea",
			fullWidth: true
		},
		{
			key: "documento",
			label: "Resolución",
			type: "file",
			accept: ".pdf"
		}
	]
}, {
	title: "Publicación en El Peruano",
	fields: [
		{
			key: "fechaPublicacion",
			envio: {
				canal: "Publicación en El Peruano",
				destinatario: "Diario oficial"
			},
			label: "Fecha de publicación",
			type: "date",
			required: true
		},
		{
			key: "edicion",
			label: "Edición o separata"
		},
		{
			key: "archivoPublicacion",
			label: "Publicación",
			type: "file",
			accept: ".pdf"
		}
	]
}];
function ResolucionSbnPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Resolución de la SBN y publicación",
		paso: "resolucion-sbn",
		sections,
		antesDelFormulario: /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "La resolución es irrecurrible (art. 41.1). Con su fecha empieza a correr el plazo de 30 d.h. para que la entidad ocupante entregue el predio (art. 41.5). La SBN puede aprobar en la misma resolución el otorgamiento de los derechos necesarios para ejecutar el plan de saneamiento."
		})
	});
}
//#endregion
export { ResolucionSbnPage as component };
