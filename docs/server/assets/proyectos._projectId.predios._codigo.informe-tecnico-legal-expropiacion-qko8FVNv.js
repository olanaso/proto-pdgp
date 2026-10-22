import { t as Route } from "./proyectos._projectId.predios._codigo.informe-tecnico-legal-expropiacion-NdeMr0AZ.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.informe-tecnico-legal-expropiacion.tsx?tsr-split=component
var sections = [
	{
		title: "Datos del informe",
		fields: [
			{
				key: "numero",
				label: "N.º de informe",
				required: true
			},
			{
				key: "fecha",
				label: "Fecha",
				type: "date",
				hito: "itl_expropiacion",
				required: true,
				ayuda: "Plazo de gestión de 3 d.h. para emitir el informe."
			},
			{
				key: "sustento",
				label: "Sustento",
				type: "select",
				options: ["Rechazo de la oferta", "Silencio del sujeto pasivo"],
				required: true,
				ayuda: "Art. 26: la expropiación procede por rechazo o por vencer el plazo sin respuesta."
			},
			{
				key: "montoTasacion",
				label: "Monto de la tasación (S/)",
				type: "number",
				required: true
			}
		]
	},
	{
		title: "Requisitos del art. 28.1",
		fields: [{
			key: "requisitos",
			label: "Contenido de la norma",
			type: "verificacion",
			items: [
				{
					clave: "sujeto",
					texto: "Identificación del sujeto activo y del sujeto pasivo"
				},
				{
					clave: "ley",
					texto: "Ley autoritativa que declara la necesidad pública"
				},
				{
					clave: "bien",
					texto: "Identificación precisa del bien, con coordenadas y partida registral"
				},
				{
					clave: "valor",
					texto: "Valor de la tasación"
				},
				{
					clave: "desocupacion",
					texto: "Orden de desocupación y su plazo"
				}
			]
		}, {
			key: "conclusion",
			label: "Conclusión",
			type: "textarea",
			required: true,
			fullWidth: true
		}]
	},
	{
		title: "Remisión a la OAJ",
		fields: [
			{
				key: "memorandoOaj",
				label: "N.º de memorando a la OAJ"
			},
			{
				key: "fechaOaj",
				envio: {
					canal: "Memorando de remisión",
					destinatario: "OAJ"
				},
				label: "Fecha de remisión",
				type: "date"
			},
			{
				key: "informe",
				label: "Informe técnico legal firmado",
				type: "file",
				accept: ".pdf,.doc,.docx",
				fullWidth: true
			}
		]
	}
];
function InformeTecnicoLegalExpropiacionPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Informe técnico legal de expropiación",
		paso: "informe-tecnico-legal-expropiacion",
		sections,
		modulo: 16
	});
}
//#endregion
export { InformeTecnicoLegalExpropiacionPage as component };
