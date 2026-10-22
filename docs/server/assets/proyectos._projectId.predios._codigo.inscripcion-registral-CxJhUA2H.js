import { Y as varianteDe } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.inscripcion-registral-D_euwjWE.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.inscripcion-registral.tsx?tsr-split=component
var estatal = (ctx) => varianteDe(ctx.perfil) === "estatal";
var sections = [{
	title: "Datos de inscripción SUNARP",
	fields: [
		{
			key: "tituloSunarp",
			label: "Título SUNARP",
			required: true
		},
		{
			key: "asiento",
			label: "Asiento registral",
			required: true
		},
		{
			key: "partida",
			label: "Partida registral",
			required: true
		},
		{
			key: "fechaInscripcion",
			label: "Fecha de inscripción",
			type: "date",
			required: true
		},
		{
			key: "propietarioFinal",
			label: "Propietario final",
			required: true,
			fullWidth: true
		}
	]
}, {
	title: "Sustitución de cargas y gravámenes (art. 41.4)",
	visible: estatal,
	fields: [{
		key: "cargas",
		label: "Cargas y gravámenes",
		type: "lista",
		ayuda: "Cada carga se sustituye por una garantía o por la valoración judicial; el estado queda en la fila.",
		columnas: [
			{
				clave: "tipo",
				titulo: "Carga o gravamen"
			},
			{
				clave: "acreedor",
				titulo: "Acreedor"
			},
			{
				clave: "monto",
				titulo: "Monto (S/)",
				tipo: "number"
			},
			{
				clave: "partida",
				titulo: "Partida"
			},
			{
				clave: "garantia",
				titulo: "Garantía sustitutoria"
			},
			{
				clave: "juzgado",
				titulo: "Juzgado"
			},
			{
				clave: "expediente",
				titulo: "Expediente judicial"
			},
			{
				clave: "fecha",
				titulo: "Fecha de valoración",
				tipo: "date"
			},
			{
				clave: "estado",
				titulo: "Estado",
				tipo: "select",
				opciones: [
					"Pendiente",
					"Sustituida",
					"Levantada"
				]
			}
		]
	}]
}];
function InscripcionRegistralPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Inscripción registral",
		paso: "inscripcion-registral",
		sections,
		antesDelFormulario: (ctx) => estatal(ctx) && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "La inscripción de la transferencia estatal no paga derechos registrales (art. 41.3)."
		})
	});
}
//#endregion
export { InscripcionRegistralPage as component };
