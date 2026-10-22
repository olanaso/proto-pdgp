import { t as Route } from "./proyectos._projectId.predios._codigo.plan-saneamiento-BHBZNsKS.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.plan-saneamiento.tsx?tsr-split=component
var sections = [
	{
		title: "Situación registral",
		fields: [{
			key: "situacionRegistral",
			label: "Situación registral",
			type: "select",
			options: [
				"INSCRITO",
				"NO INSCRITO",
				"SUPERPOSICIÓN"
			],
			required: true
		}, {
			key: "partida",
			label: "Partida registral",
			placeholder: "Si está inscrito"
		}]
	},
	{
		title: "Acciones de saneamiento",
		fields: [{
			key: "acciones",
			label: "Acciones necesarias",
			type: "lista",
			columnas: [
				{
					clave: "tipo",
					titulo: "Acción",
					tipo: "select",
					opciones: [
						"Primera inscripción de dominio",
						"Independización",
						"Rectificación de área",
						"Desafectación de dominio público",
						"Levantamiento de cargas"
					]
				},
				{
					clave: "responsable",
					titulo: "Responsable"
				},
				{
					clave: "plazo",
					titulo: "Plazo",
					tipo: "date"
				},
				{
					clave: "estado",
					titulo: "Estado",
					tipo: "select",
					opciones: [
						"Pendiente",
						"En trámite",
						"Concluida"
					]
				}
			]
		}]
	},
	{
		title: "Informe técnico legal",
		fields: [
			{
				key: "numeroInforme",
				label: "Número del informe",
				required: true
			},
			{
				key: "fechaInforme",
				label: "Fecha del informe",
				type: "date",
				required: true
			},
			{
				key: "conclusion",
				label: "Conclusión",
				type: "textarea",
				required: true,
				fullWidth: true
			},
			{
				key: "archivoInforme",
				label: "Informe técnico legal",
				type: "file",
				accept: ".pdf"
			}
		]
	},
	{
		title: "Documentos y planos",
		fields: [
			{
				key: "archivoPlan",
				label: "Plan en el formato de la SBN",
				type: "file",
				accept: ".pdf,.doc,.docx"
			},
			{
				key: "planoPerimetrico",
				label: "Plano perimétrico (UTM)",
				type: "file",
				accept: ".pdf,.dwg,.zip"
			},
			{
				key: "planoUbicacion",
				label: "Plano de ubicación (UTM)",
				type: "file",
				accept: ".pdf,.dwg,.zip"
			}
		]
	}
];
function PlanSaneamientoPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Plan de saneamiento físico legal",
		paso: "plan-saneamiento",
		sections
	});
}
//#endregion
export { PlanSaneamientoPage as component };
