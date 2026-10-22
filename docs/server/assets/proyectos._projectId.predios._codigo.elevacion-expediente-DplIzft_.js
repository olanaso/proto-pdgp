import { t as Route } from "./proyectos._projectId.predios._codigo.elevacion-expediente-CGM7LOX_.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.elevacion-expediente.tsx?tsr-split=component
var sections = [{
	title: "Datos de elevación",
	fields: [
		{
			key: "fechaElevacion",
			label: "Fecha de elevación",
			type: "date",
			required: true
		},
		{
			key: "areaReceptora",
			label: "Área receptora",
			required: true
		},
		{
			key: "responsable",
			label: "Responsable",
			required: true
		},
		{
			key: "estado",
			label: "Estado",
			type: "select",
			options: [
				"BORRADOR",
				"ELEVADO",
				"RECIBIDO",
				"OBSERVADO",
				"APROBADO"
			],
			required: true
		},
		{
			key: "documento",
			label: "Documento de elevación",
			type: "file",
			accept: ".pdf,.doc,.docx",
			fullWidth: true
		}
	]
}, {
	title: "Documentos remitidos a la DGPPT, al VMT u otras áreas",
	fields: [{
		key: "documentosRemitidos",
		label: "Documentos remitidos",
		type: "lista",
		fullWidth: true,
		columnas: [
			{
				clave: "documento",
				titulo: "Documento"
			},
			{
				clave: "fecha",
				titulo: "Fecha",
				tipo: "date"
			},
			{
				clave: "destino",
				titulo: "Destino"
			},
			{
				clave: "tramite",
				titulo: "N.º de trámite"
			},
			{
				clave: "estado",
				titulo: "Estado",
				tipo: "select",
				opciones: [
					"ENVIADO",
					"RECIBIDO",
					"EN EVALUACIÓN",
					"OBSERVADO",
					"ATENDIDO"
				]
			}
		]
	}]
}];
function ElevacionExpedientePage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Elevación del expediente",
		paso: "elevacion-expediente",
		sections
	});
}
//#endregion
export { ElevacionExpedientePage as component };
