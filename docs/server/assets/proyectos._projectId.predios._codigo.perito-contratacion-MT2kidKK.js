import { t as Route } from "./proyectos._projectId.predios._codigo.perito-contratacion-DtxS7spe.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.perito-contratacion.tsx?tsr-split=component
var esPerito = (v) => v.organo === "Perito contratado";
var sections = [
	{
		title: "Órgano de tasación",
		fields: [{
			key: "organo",
			label: "Órgano de tasación",
			type: "select",
			options: ["Ministerio de Vivienda", "Perito contratado"],
			required: true,
			ayuda: "Art. 14.1: la tasación la hace el Ministerio de Vivienda o un perito contratado, con supervisión del MTC."
		}]
	},
	{
		title: "Datos del perito",
		visible: ({ values }) => esPerito(values),
		fields: [
			{
				key: "peritoNombre",
				label: "Nombre o razón social",
				required: true
			},
			{
				key: "peritoRegistro",
				label: "N.º de registro de perito",
				required: true
			},
			{
				key: "tipoContrato",
				label: "Tipo de documento",
				type: "select",
				options: ["Contrato", "Orden de servicio"],
				required: true
			},
			{
				key: "numeroContrato",
				label: "Número",
				required: true
			},
			{
				key: "fechaContrato",
				label: "Fecha",
				type: "date",
				required: true
			},
			{
				key: "montoContrato",
				label: "Monto (S/)",
				type: "number",
				required: true
			}
		]
	},
	{
		title: "Supervisión del MTC",
		fields: [{
			key: "supervisor",
			label: "Supervisor",
			required: true
		}, {
			key: "observaciones",
			label: "Observaciones",
			type: "textarea",
			fullWidth: true
		}]
	},
	{
		title: "Documentos",
		fields: [{
			key: "contrato",
			label: "Contrato u orden de servicio",
			type: "file",
			accept: ".pdf",
			fullWidth: true,
			visible: ({ values }) => esPerito(values)
		}, {
			key: "oficioOrgano",
			label: "Oficio al órgano de tasación",
			type: "file",
			accept: ".pdf,.doc,.docx",
			fullWidth: true
		}]
	}
];
function PeritoContratacionPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Perito y contratación",
		paso: "perito-contratacion",
		sections,
		modulo: 14
	});
}
//#endregion
export { PeritoContratacionPage as component };
