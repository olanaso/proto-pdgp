import { g as fechaIso, m as fecha, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial } from "./historial-Bc37nCTn.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.expediente-afectacion-DbLRJq8V.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { FolderCheck, Send } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.expediente-afectacion.tsx?tsr-split=component
var PASO = "expediente-afectacion";
var CONSOLIDO = "Consolidó el expediente";
var claveHito = (v) => v.esApp === "Sí" ? "expediente_afectacion_app" : "expediente_afectacion";
function ExpedienteAfectacionPage() {
	const { projectId, codigo } = Route$1.useParams();
	const c = decodeURIComponent(codigo);
	const levantamiento = useHistorial(`levantamiento-informacion-tecnica-${c}`);
	const partidas = useHistorial(`partidas-registrales-${c}`);
	const caracterizacion = useHistorial(`caracterizacion-predio-${c}`);
	const verificador = useHistorial(`informe-verificador-especialista-${c}`);
	const discrepancias = useHistorial(`discrepancias-${c}`);
	const propio = useHistorial(`${PASO}-${c}`);
	const generoEnCaracterizacion = (accion) => caracterizacion.some((v) => v.accion === accion);
	const abiertas = (discrepancias[0]?.registro ?? []).filter((d) => d.estado !== "Resuelta").length;
	const items = [
		{
			clave: "levantamiento",
			texto: "2.1 Levantamiento de información técnica",
			completo: () => levantamiento.length > 0
		},
		{
			clave: "partidas",
			texto: "2.2 Partidas registrales y títulos archivados",
			completo: () => partidas.length > 0
		},
		{
			clave: "caracterizacion",
			texto: "2.3 Caracterización y memoria descriptiva",
			completo: () => caracterizacion.length > 0 && generoEnCaracterizacion("Generó memoria descriptiva")
		},
		{
			clave: "planos",
			texto: "2.3 Planos de afectación (membretado)",
			completo: () => generoEnCaracterizacion("Generó membretado de planos")
		},
		{
			clave: "verificador",
			texto: "2.4 Informe del verificador especialista",
			completo: () => verificador.length > 0
		},
		{
			clave: "discrepancias",
			texto: abiertas > 0 ? `2.5 Discrepancias resueltas (${abiertas} abiertas)` : "2.5 Discrepancias resueltas",
			completo: () => abiertas === 0
		}
	];
	const faltan = items.filter((i) => !i.completo()).map((i) => i.texto);
	const consolidado = propio.find((v) => v.accion === CONSOLIDO);
	const sections = (ctx) => [
		{
			title: "Plazo del expediente",
			fields: [{
				key: "esApp",
				label: "Proyecto bajo APP",
				type: "select",
				options: ["Sí", "No"],
				required: true,
				ayuda: "Art. 17: 4 meses; 3 meses si el proyecto es una APP."
			}, {
				key: "fechaInicio",
				label: "Inicio del plazo",
				type: "date",
				required: true,
				hito: claveHito(ctx.values),
				ayuda: ctx.hitos.comunicacion ? `Comunicación de afectación registrada el ${fecha(ctx.hitos.comunicacion.fecha)} (1.5).` : "Fecha de la comunicación de afectación (art. 16.1)."
			}]
		},
		{
			title: "Piezas del expediente técnico legal",
			fields: [{
				key: "piezas",
				label: "Estado de las piezas",
				type: "verificacion",
				items
			}]
		},
		{
			title: "Responsables y documentos",
			fields: [
				{
					key: "responsableTecnico",
					label: "Responsable técnico",
					required: true
				},
				{
					key: "responsableLegal",
					label: "Responsable legal",
					required: true
				},
				{
					key: "expedientePdf",
					label: "Expediente consolidado",
					type: "file",
					accept: ".pdf",
					fullWidth: true
				},
				{
					key: "planoAfectacion",
					label: "Plano de afectación",
					type: "file",
					accept: ".pdf,.dwg",
					fullWidth: true
				},
				{
					key: "observaciones",
					label: "Observaciones",
					type: "textarea",
					fullWidth: true
				}
			]
		}
	];
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Expediente de afectación predial",
		paso: PASO,
		sections,
		acciones: consolidado ? /* @__PURE__ */ jsxs(StatusBadge, {
			tono: "success",
			children: ["Consolidado el ", fecha(consolidado.fecha)]
		}) : /* @__PURE__ */ jsx(StatusBadge, {
			tono: "warning",
			children: "Sin consolidar"
		}),
		alGuardar: ({ values, hitos }) => {
			const otra = claveHito(values) === "expediente_afectacion" ? "expediente_afectacion_app" : "expediente_afectacion";
			if (hitos[otra]?.pantalla === PASO) registrarHito(c, otra, "", PASO, "");
		},
		transiciones: [{
			texto: "Consolidar expediente",
			icono: /* @__PURE__ */ jsx(FolderCheck, {}),
			visible: () => !consolidado,
			permitido: () => faltan.length ? `Faltan piezas: ${faltan.join("; ")}.` : null,
			confirmacion: "Deja constancia de que el expediente técnico legal está completo.",
			ejecutar: ({ values }) => registrarVersion(`${PASO}-${c}`, {
				accion: CONSOLIDO,
				objeto: c,
				registro: { ...values }
			}, {
				modulo: 11,
				entidad: PASO
			})
		}, {
			texto: "Remitir a tasación",
			icono: /* @__PURE__ */ jsx(Send, {}),
			permitido: () => consolidado ? null : "Consolide el expediente antes de remitirlo.",
			confirmacion: "Registra la remisión y abre 3.1 Requerimiento de tasación.",
			ejecutar: ({ values, projectId: proyecto }) => {
				registrarVersion(`${PASO}-${c}`, {
					accion: "Remitió a tasación",
					objeto: c,
					registro: {
						...values,
						fechaRemision: fechaIso(/* @__PURE__ */ new Date())
					}
				}, {
					modulo: 11,
					entidad: PASO
				});
				registrarEnvio({
					proyecto,
					predio: c,
					paso: PASO,
					canal: "Remisión interna",
					destinatario: "Órgano de tasación",
					documento: "Expediente técnico legal"
				}, {
					modulo: 11,
					entidad: PASO
				});
			},
			destino: "requerimiento-tasacion-itl"
		}]
	});
}
//#endregion
export { ExpedienteAfectacionPage as component };
