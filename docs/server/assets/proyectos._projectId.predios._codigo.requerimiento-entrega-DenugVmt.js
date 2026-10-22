import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.requerimiento-entrega-Bdrw_Xhr.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.requerimiento-entrega.tsx?tsr-split=component
var sections = [{
	title: "Requerimiento",
	fields: [
		{
			key: "oficio",
			label: "Número de oficio",
			required: true
		},
		{
			key: "firma",
			label: "Firma de la Dirección DDP",
			type: "select",
			options: ["Firmado", "Pendiente de firma"],
			required: true
		},
		{
			key: "tipoNotificacion",
			label: "Tipo de notificación",
			type: "select",
			options: ["Personal", "Notarial"],
			required: true
		},
		{
			key: "fechaNotificacion",
			envio: {
				canal: "Notificación del requerimiento",
				destinatario: "Sujeto pasivo"
			},
			label: "Fecha de notificación",
			type: "date",
			required: true,
			hito: "requerimiento_entrega",
			ayuda: "El sistema cuenta 5 d.h.; el flujograma de la DDP indica 10 d.h. improrrogables. Pendiente de validación legal."
		},
		{
			key: "documento",
			label: "Requerimiento notificado",
			type: "file",
			accept: ".pdf",
			fullWidth: true
		}
	]
}, {
	title: "Resultado",
	fields: [
		{
			key: "resultado",
			label: "Resultado",
			type: "select",
			options: ["ENTREGÓ", "NO ENTREGÓ"]
		},
		{
			key: "fechaEntrega",
			label: "Fecha de entrega",
			type: "date",
			visible: (c) => c.values.resultado === "ENTREGÓ"
		},
		{
			key: "observaciones",
			label: "Observaciones",
			type: "textarea",
			fullWidth: true
		}
	]
}];
function RequerimientoEntregaPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Requerimiento único de entrega",
		paso: "requerimiento-entrega",
		sections,
		modulo: 16,
		antesDelFormulario: ({ values }) => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Aviso, {
			tipo: "aviso",
			children: "El requerimiento se hace por única vez y su plazo es improrrogable: vencido sin entrega, procede la ejecución coactiva (art. 20.4.f)."
		}), values.resultado === "NO ENTREGÓ" && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "error",
			children: [
				"El sujeto pasivo no entregó el inmueble. Continúe en",
				" ",
				/* @__PURE__ */ jsx(Link, {
					to: "/proyectos/$projectId/predios/$codigo/ejecucion-coactiva",
					params: {
						projectId,
						codigo
					},
					className: "font-medium underline",
					children: "Ejecución coactiva"
				}),
				"."
			]
		})] })
	});
}
//#endregion
export { RequerimientoEntregaPage as component };
