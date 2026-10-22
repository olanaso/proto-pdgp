import { t as Route } from "./proyectos._projectId.predios._codigo.gestion-devengado-C8jljC1A.js";
import { t as PredioGeneratedDocumentForm } from "./PredioGeneratedDocumentForm-BInQfYUQ.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.gestion-devengado.tsx?tsr-split=component
var fields = [
	{
		key: "tipoDocumento",
		label: "Tipo de documento",
		type: "select",
		options: ["MEMORANDO", "SOLICITUD DE DEVENGADO"],
		required: true
	},
	{
		key: "numeroDocumento",
		label: "Número de documento",
		required: true
	},
	{
		key: "fechaDocumento",
		label: "Fecha",
		type: "date",
		required: true
	},
	{
		key: "numeroHojaRuta",
		label: "Número de hoja de ruta",
		placeholder: "Sistema de trámite documentario",
		required: true
	},
	{
		key: "montoDevengado",
		label: "Monto del predio",
		type: "number",
		placeholder: "S/ 0.00",
		required: true
	},
	{
		key: "responsable",
		label: "Responsable",
		required: true
	},
	{
		key: "sustento",
		label: "Sustento del devengado",
		type: "textarea",
		fullWidth: true
	}
];
function GestionDevengadoPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioGeneratedDocumentForm, {
		projectId,
		codigo,
		title: "Gestión de devengado",
		paso: "gestion-devengado",
		sectionTitle: "Datos del devengado",
		draftTitle: "MEMORANDO / SOLICITUD DE DEVENGADO – BORRADOR",
		fileBaseName: "borrador_devengado",
		uploadLabel: "Registrar documento original",
		fields,
		modulo: 19,
		documento: {
			tipos: ["memorando", "informe"],
			subtipos: { informe: "in-pago" },
			tipoInicial: "memorando",
			campoNumero: "numeroDocumento",
			destino: { areaId: "oga" }
		}
	}, `${projectId}-${codigo}`);
}
//#endregion
export { GestionDevengadoPage as component };
