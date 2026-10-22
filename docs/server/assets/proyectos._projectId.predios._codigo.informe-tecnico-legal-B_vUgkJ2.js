import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, i as estadoPlazo, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.informe-tecnico-legal-B-oJXNs7.js";
import { t as PredioGeneratedDocumentForm } from "./PredioGeneratedDocumentForm-BInQfYUQ.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.informe-tecnico-legal.tsx?tsr-split=component
var fields = [
	{
		key: "numeroInforme",
		label: "Número de informe",
		required: true
	},
	{
		key: "fechaInforme",
		label: "Fecha",
		type: "date",
		required: true
	},
	{
		key: "conclusion",
		label: "Conclusión",
		type: "textarea",
		fullWidth: true,
		required: true
	},
	{
		key: "recomendacion",
		label: "Recomendación",
		type: "textarea",
		fullWidth: true,
		required: true
	}
];
/** La respuesta del sujeto pasivo abre los 3 d.h. de gestión del informe; la fecha vive en el hito. */
function RespuestaSujetoPasivo({ codigo }) {
	const hitos = useHitosPredio(codigo);
	const e = estadoPlazo(hitos, "itl");
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Plazo del informe",
		className: "mb-4",
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Respuesta del sujeto pasivo",
			icono: CalendarDays,
			ayuda: "Fecha de la aceptación o el rechazo. Desde ella corren 3 d.h. de gestión para el informe.",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				type: "date",
				className: controlClase,
				value: hitos.itl?.fecha ?? "",
				onChange: (ev) => registrarHito(codigo, "itl", ev.target.value, "informe-tecnico-legal", "Respuesta del sujeto pasivo")
			})
		}), e && /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Informe técnico legal",
			children: /* @__PURE__ */ jsx(PlazoBadge, {
				vence: e.vence,
				etiqueta: "Plazo de gestión"
			})
		})] })
	});
}
function InformeTecnicoLegalPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(PredioGeneratedDocumentForm, {
		projectId,
		codigo,
		title: "Informe técnico legal",
		paso: "informe-tecnico-legal",
		sectionTitle: "Datos del Informe Técnico Legal",
		draftTitle: "INFORME TÉCNICO LEGAL – BORRADOR",
		fileBaseName: "borrador_informe_tecnico_legal",
		uploadLabel: "Registrar informe firmado",
		fields,
		modulo: 14,
		documento: {
			tipos: ["informe"],
			subtipos: { informe: "in-legal" },
			campoNumero: "numeroInforme"
		},
		antesDelFormulario: /* @__PURE__ */ jsx(RespuestaSujetoPasivo, { codigo: decodeURIComponent(codigo) })
	}, `${projectId}-${codigo}`);
}
//#endregion
export { InformeTecnicoLegalPage as component };
