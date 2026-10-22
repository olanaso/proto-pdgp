import { Y as varianteDe } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.publicacion-oposiciones-rjzHVZUj.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.publicacion-oposiciones.tsx?tsr-split=component
var mejoras = (ctx) => varianteDe(ctx.perfil) === "mejoras";
var sections = (ctx) => [{
	title: "Datos de publicación",
	fields: [
		{
			key: "diario",
			label: "Diario",
			required: true
		},
		{
			key: "fechaPublicacion",
			envio: {
				canal: "Publicación del aviso",
				destinatario: "Diario de la localidad"
			},
			label: mejoras(ctx) ? "Fecha de la última publicación del aviso" : "Fecha de publicación",
			type: "date",
			required: true,
			hito: mejoras(ctx) ? "mejoras_oposicion" : void 0
		},
		{
			key: "aviso",
			label: "Aviso publicado",
			required: true
		},
		{
			key: "archivoAviso",
			label: "Archivo del aviso",
			type: "file",
			accept: ".pdf"
		},
		{
			key: "fotos",
			label: "Foto de la publicación",
			type: "foto",
			fullWidth: true
		}
	]
}, {
	title: "Oposiciones",
	fields: [{
		key: "oposiciones",
		label: "Oposiciones presentadas",
		type: "textarea",
		fullWidth: true
	}, {
		key: "resultado",
		label: "Resultado",
		type: "select",
		options: [
			"SIN OPOSICIONES",
			"CON OPOSICIONES",
			"EN EVALUACIÓN",
			"RESUELTO"
		],
		required: true
	}]
}];
function PublicacionOposicionesPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Publicación y oposiciones",
		paso: "publicacion-oposiciones",
		sections,
		modulo: 12,
		antesDelFormulario: (ctx) => mejoras(ctx) && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Aviso de reconocimiento de mejoras y gastos de traslado (DCF Tercera): se publica para que quien se crea con derecho sobre el inmueble o sus mejoras se oponga. Desde la última publicación hay 5 d.h. para presentar oposiciones (DL 1559)."
		})
	});
}
//#endregion
export { PublicacionOposicionesPage as component };
