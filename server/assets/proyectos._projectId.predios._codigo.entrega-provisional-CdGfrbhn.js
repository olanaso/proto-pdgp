import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.entrega-provisional-BMm1yR2J.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.entrega-provisional.tsx?tsr-split=component
var sections = [
	{
		title: "Pedido de entrega provisional",
		fields: [
			{
				key: "fechaPedido",
				envio: {
					canal: "Pedido de entrega provisional",
					destinatario: "SBN o DGA del MEF"
				},
				label: "Fecha del pedido",
				type: "date",
				required: true,
				hito: "entrega_provisional"
			},
			{
				key: "sustento",
				label: "Sustento",
				type: "select",
				options: ["DESOCUPADO", "SIN USO EFECTIVO"],
				required: true
			},
			{
				key: "detalleSustento",
				label: "Detalle del sustento",
				type: "textarea",
				fullWidth: true
			}
		]
	},
	{
		title: "Resolución de la SBN o la DGA del MEF",
		fields: [
			{
				key: "numeroResolucion",
				label: "Número de resolución"
			},
			{
				key: "fechaResolucion",
				label: "Fecha de resolución",
				type: "date"
			},
			{
				key: "archivoResolucion",
				label: "Resolución",
				type: "file",
				accept: ".pdf"
			}
		]
	},
	{
		title: "Acta de entrega provisional",
		fields: [
			{
				key: "fechaActa",
				label: "Fecha del acta",
				type: "date"
			},
			{
				key: "firmantes",
				label: "Firmantes",
				type: "textarea"
			},
			{
				key: "condiciones",
				label: "Condiciones",
				type: "textarea"
			},
			{
				key: "archivoActa",
				label: "Acta",
				type: "file",
				accept: ".pdf"
			}
		]
	}
];
function EntregaProvisionalPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Entrega provisional",
		paso: "entrega-provisional",
		sections,
		validar: (ctx) => ctx.values.fechaActa && !ctx.values.numeroResolucion ? "Registre la resolución antes del acta de entrega." : null,
		antesDelFormulario: (ctx) => ctx.perfil.ocupado ? /* @__PURE__ */ jsx(Aviso, {
			tipo: "aviso",
			children: "El perfil del predio lo marca ocupado: la entrega provisional procede solo si está desocupado o sin uso efectivo (art. 41.11)."
		}) : /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Procede para predios desocupados o sin uso efectivo, con la solicitud a la SBN ya presentada. La SBN o la DGA del MEF resuelve en 7 d.h. desde el pedido (art. 41.11)."
		})
	});
}
//#endregion
export { EntregaProvisionalPage as component };
