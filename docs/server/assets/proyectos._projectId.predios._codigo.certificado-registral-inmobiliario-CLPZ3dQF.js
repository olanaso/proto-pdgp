import { t as Route } from "./proyectos._projectId.predios._codigo.certificado-registral-inmobiliario-CcA2m-KV.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.certificado-registral-inmobiliario.tsx?tsr-split=component
var sections = [{
	title: "Datos del certificado",
	fields: [
		{
			key: "numero",
			label: "Número de CRI",
			required: true
		},
		{
			key: "fecha",
			label: "Fecha",
			type: "date",
			required: true
		},
		{
			key: "partida",
			label: "Partida registral",
			required: true
		},
		{
			key: "titular",
			label: "Titular registral",
			required: true
		},
		{
			key: "cargas",
			label: "Cargas",
			type: "textarea",
			fullWidth: true
		},
		{
			key: "gravamenes",
			label: "Gravámenes",
			type: "textarea",
			fullWidth: true
		},
		{
			key: "archivo",
			label: "Archivo CRI",
			type: "file",
			accept: ".pdf",
			fullWidth: true
		}
	]
}];
function CertificadoRegistralInmobiliarioPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Certificado Registral Inmobiliario – CRI",
		paso: "certificado-registral-inmobiliario",
		sections
	});
}
//#endregion
export { CertificadoRegistralInmobiliarioPage as component };
