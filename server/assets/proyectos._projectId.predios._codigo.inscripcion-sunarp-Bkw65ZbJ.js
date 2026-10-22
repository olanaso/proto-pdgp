import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.inscripcion-sunarp-C1MTsqFG.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.inscripcion-sunarp.tsx?tsr-split=component
var sections = [{
	title: "Solicitud de inscripción",
	fields: [
		{
			key: "acto",
			label: "Acto",
			type: "select",
			options: ["Primera de dominio", "Independización"],
			required: true
		},
		{
			key: "fechaResolucion",
			label: "Fecha de la resolución de la autoridad",
			type: "date",
			required: true,
			hito: "sunarp_estatal",
			ayuda: "Resolución de la SBN, la DGA o el gobierno regional que aprueba la transferencia."
		},
		{
			key: "titulo",
			label: "N.º de título"
		}
	]
}, {
	title: "Resultado",
	fields: [
		{
			key: "estado",
			label: "Estado",
			type: "select",
			options: [
				"EN CALIFICACIÓN",
				"OBSERVADO",
				"INSCRITO",
				"TACHADO"
			]
		},
		{
			key: "asiento",
			label: "Asiento"
		},
		{
			key: "partida",
			label: "Partida"
		},
		{
			key: "fechaInscripcion",
			label: "Fecha de inscripción",
			type: "date"
		},
		{
			key: "esquela",
			label: "Esquela de observación",
			type: "file",
			accept: ".pdf",
			visible: (c) => c.values.estado === "OBSERVADO" || c.values.estado === "TACHADO"
		},
		{
			key: "documento",
			label: "Asiento de inscripción",
			type: "file",
			accept: ".pdf"
		}
	]
}];
function InscripcionSunarpPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Inscripción por SUNARP",
		paso: "inscripcion-sunarp",
		sections,
		antesDelFormulario: /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "La resolución de la autoridad es título suficiente: SUNARP inscribe la primera de dominio o la independización sin pago de derechos registrales (art. 41.3)."
		})
	});
}
//#endregion
export { InscripcionSunarpPage as component };
