import { t as Route } from "./proyectos._projectId.predios._codigo.formulario-registral-ofEDEtSI.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { t as DestinatariosSujetoPasivo } from "./DestinatariosSujetoPasivo-9-uf7LUo.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.formulario-registral.tsx?tsr-split=component
var sections = [{
	title: "Datos del formulario registral",
	fields: [
		{
			key: "numeroFormulario",
			label: "Número",
			required: true
		},
		{
			key: "fechaSuscripcion",
			label: "Fecha de suscripción",
			type: "date",
			required: true
		},
		{
			key: "notaria",
			label: "Notaría",
			required: true
		},
		{
			key: "archivo",
			label: "Archivo",
			type: "file",
			accept: ".pdf,.doc,.docx",
			fullWidth: true
		}
	]
}];
function FormularioRegistralPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Formulario registral",
		paso: "formulario-registral",
		sections,
		antesDelFormulario: /* @__PURE__ */ jsx(DestinatariosSujetoPasivo, {
			projectId,
			codigo: decodeURIComponent(codigo)
		})
	});
}
//#endregion
export { FormularioRegistralPage as component };
