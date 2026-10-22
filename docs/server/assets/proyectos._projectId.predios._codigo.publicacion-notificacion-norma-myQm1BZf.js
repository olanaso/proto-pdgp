import { t as Route } from "./proyectos._projectId.predios._codigo.publicacion-notificacion-norma-CCrbNUZW.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.publicacion-notificacion-norma.tsx?tsr-split=component
var sections = [{
	title: "Publicación en El Peruano",
	fields: [
		{
			key: "fechaEmision",
			label: "Emisión de la norma",
			type: "date",
			hito: "publicacion_norma",
			required: true,
			ayuda: "Desde aquí corren 5 d.h. de gestión para publicarla."
		},
		{
			key: "cotizacion",
			label: "Cotización de la publicación"
		},
		{
			key: "disponibilidad",
			label: "Disponibilidad presupuestal",
			type: "select",
			options: ["Pendiente", "Otorgada"]
		},
		{
			key: "oficio",
			label: "N.º de oficio a El Peruano"
		},
		{
			key: "fechaPublicacion",
			envio: {
				canal: "Publicación en El Peruano",
				destinatario: "Diario oficial"
			},
			label: "Fecha de publicación",
			type: "date",
			hito: "notificacion_notarial",
			ayuda: "Desde la publicación corren 7 d.h. de gestión para notificar."
		},
		{
			key: "publicacionArchivo",
			label: "Publicación",
			type: "file",
			accept: ".pdf",
			fullWidth: true
		}
	]
}, {
	title: "Notificación al sujeto pasivo",
	fields: [
		{
			key: "tipoNotificacion",
			label: "Tipo de notificación",
			type: "select",
			options: ["Notarial", "Juez de paz"],
			required: true
		},
		{
			key: "notaria",
			label: "Notaría o juzgado de paz",
			required: true
		},
		{
			key: "fechaNotificacion",
			envio: {
				canal: "Notificación de la norma",
				destinatario: "Sujeto pasivo"
			},
			label: "Fecha de notificación",
			type: "date",
			required: true
		},
		{
			key: "cargo",
			label: "Cargo de notificación",
			type: "file",
			accept: ".pdf",
			fullWidth: true
		}
	]
}];
function PublicacionNotificacionNormaPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Publicación y notificación de la norma",
		paso: "publicacion-notificacion-norma",
		sections,
		modulo: 16
	});
}
//#endregion
export { PublicacionNotificacionNormaPage as component };
