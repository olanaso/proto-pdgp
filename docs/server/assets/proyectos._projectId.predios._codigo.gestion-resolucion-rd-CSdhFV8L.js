import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, i as estadoPlazo, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion } from "./historial-Bc37nCTn.js";
import { i as registrarEnviosPorFecha, r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { J as usePerfilPredio } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.gestion-resolucion-rd-viyf4Z-J.js";
import { n as useAlmacen } from "./almacen-BgvL3X8T.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as PredioGeneratedDocumentForm } from "./PredioGeneratedDocumentForm-BInQfYUQ.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, Save } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.gestion-resolucion-rd.tsx?tsr-split=component
var fields = [
	{
		key: "tipoResolucion",
		label: "Tipo de resolución",
		type: "select",
		options: [
			"RESOLUCIÓN DIRECTORAL",
			"RESOLUCIÓN VICEMINISTERIAL",
			"RESOLUCIÓN MINISTERIAL"
		],
		required: true
	},
	{
		key: "numeroResolucion",
		label: "Número de resolución",
		required: true
	},
	{
		key: "fechaResolucion",
		label: "Fecha",
		type: "date",
		required: true
	},
	{
		key: "montoAprobado",
		label: "Monto aprobado",
		type: "number",
		placeholder: "S/ 0.00",
		required: true
	},
	{
		key: "incentivo",
		label: "Incentivo",
		type: "number",
		placeholder: "S/ 0.00"
	},
	{
		key: "responsable",
		label: "Responsable",
		required: true
	},
	{
		key: "fundamento",
		label: "Fundamento de aprobación",
		type: "textarea",
		fullWidth: true
	}
];
var CAMPOS_NOTIFICACION = [
	[
		"fechaEmision",
		"Emisión de la resolución",
		"date"
	],
	[
		"fechaNotificacion",
		"Notificación al sujeto pasivo",
		"date"
	],
	[
		"contratista",
		"Contratista",
		"text"
	],
	[
		"notaria",
		"Notaría",
		"text"
	],
	[
		"fechaSuscripcion",
		"Suscripción del instrumento y pago",
		"date"
	]
];
/** Notificación de la resolución y suscripción del instrumento con pago (3 d.h. de gestión desde la emisión). */
function NotificacionResolucion({ projectId, codigo }) {
	const perfil = usePerfilPredio(projectId, codigo);
	const hitos = useHitosPredio(codigo);
	const clave = `notificacion-rd-${codigo}`;
	const [guardado, setGuardado] = useAlmacen(`pdgp-form-${clave}`, {});
	const [borrador, setBorrador] = useState(null);
	const [mensaje, setMensaje] = useState(false);
	const valores = borrador ?? guardado;
	const e = estadoPlazo(hitos, "notificacion_rd");
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Notificación y suscripción del instrumento",
		className: "mb-4",
		children: [mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(false),
			children: "Notificación y suscripción guardadas."
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: (ev) => {
				ev.preventDefault();
				registrarEnviosPorFecha(guardado, valores, [{
					campo: "fechaNotificacion",
					canal: "Notificación de la resolución",
					destinatario: "Sujeto pasivo"
				}, {
					campo: "fechaSuscripcion",
					canal: "Suscripción del instrumento",
					destinatario: valores.notaria || "Notaría"
				}]).forEach((e) => registrarEnvio({
					...e,
					proyecto: projectId,
					predio: codigo,
					paso: "gestion-resolucion-rd"
				}, {
					modulo: 18,
					entidad: "notificacion_rd"
				}));
				setGuardado(valores);
				setBorrador(null);
				registrarHito(codigo, "notificacion_rd", valores.fechaEmision ?? "", "gestion-resolucion-rd", "Emisión de la resolución");
				registrarVersion(clave, {
					accion: "Guardó la notificación",
					objeto: "Notificación de la resolución",
					registro: valores
				}, {
					modulo: 18,
					entidad: "notificacion_rd"
				});
				setMensaje(true);
			},
			children: [
				/* @__PURE__ */ jsxs(FormGrid, { children: [CAMPOS_NOTIFICACION.map(([k, etiqueta, tipo]) => /* @__PURE__ */ jsx(FormField, {
					etiqueta,
					icono: tipo === "date" ? CalendarDays : void 0,
					ayuda: k === "fechaEmision" ? "Al guardar corren 3 d.h. de gestión para notificar y suscribir el instrumento." : k === "contratista" ? "El contratista notifica y gestiona la suscripción con el pago." : void 0,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: tipo,
						className: controlClase,
						value: valores[k] ?? "",
						onChange: (ev) => setBorrador({
							...valores,
							[k]: ev.target.value
						})
					})
				}, k)), e && /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Notificación",
					children: /* @__PURE__ */ jsx(PlazoBadge, {
						vence: e.vence,
						etiqueta: "Plazo de gestión"
					})
				})] }),
				perfil.arcc && /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Reconstrucción con Cambios: la notificación y la suscripción del instrumento siguen además los literales b y c del numeral 9.6 del art. 9 de la Ley 30556."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-3 flex justify-end",
					children: /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						variant: "outline",
						children: [/* @__PURE__ */ jsx(Save, {}), " Guardar notificación"]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-3",
					children: /* @__PURE__ */ jsx(HistorialEnvios, {
						proyecto: projectId,
						predio: codigo,
						paso: "gestion-resolucion-rd",
						editable: true
					})
				})
			]
		})]
	});
}
function GestionResolucionRdPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(PredioGeneratedDocumentForm, {
		projectId,
		codigo,
		title: "Resolución de aprobación del valor y notificación",
		paso: "gestion-resolucion-rd",
		sectionTitle: "Datos de la resolución",
		draftTitle: "RESOLUCIÓN – BORRADOR",
		fileBaseName: "borrador_resolucion",
		uploadLabel: "Registrar resolución original",
		fields,
		modulo: 18,
		documento: {
			tipos: ["resolucion"],
			subtipos: { resolucion: "rd-directoral" },
			campoNumero: "numeroResolucion"
		},
		enableOriginalDispatch: true,
		antesDelFormulario: /* @__PURE__ */ jsx(NotificacionResolucion, {
			projectId,
			codigo: decodeURIComponent(codigo)
		})
	}, `${projectId}-${codigo}`);
}
//#endregion
export { GestionResolucionRdPage as component };
