import { _ as moneda, f as vencimiento, m as fecha, p as desdeIso, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { U as puedeCambiarRuta, V as corregirPerfil } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.entrega-anticipada-DxkSPVS1.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
import { HandCoins } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.entrega-anticipada.tsx?tsr-split=component
var num = (v) => Number((v ?? "").replace(/,/g, "")) || 0;
var datosPerfil = (p) => ({
	condicion: p.condicion,
	ruta: p.ruta,
	inscrito: p.inscrito,
	ocupado: p.ocupado,
	actividad: p.actividad,
	casoEspecial: p.casoEspecial,
	entregaAnticipada: p.entregaAnticipada
});
var conBloqueo = (v) => v.bloqueoSolicitado === "Sí";
var sections = [
	{
		title: "Acto preparatorio",
		fields: [
			{
				key: "tipoActo",
				label: "Tipo de acto",
				type: "select",
				options: [
					"Promesa de transferencia",
					"Promesa de reconocimiento de mejoras",
					"Acta de entrega anticipada"
				],
				required: true
			},
			{
				key: "fechaActa",
				label: "Fecha del acta",
				type: "date",
				required: true
			},
			{
				key: "contrato",
				label: "Contrato preparatorio o acta firmada",
				type: "file",
				accept: ".pdf",
				fullWidth: true
			}
		]
	},
	{
		title: "Valor estimado y pago a cuenta",
		fields: [
			{
				key: "valorEstimado",
				label: "Valor estimado del inmueble (S/)",
				type: "number",
				required: true,
				ayuda: "Art. 21.6: informe de valor estimado."
			},
			{
				key: "fechaInformeValor",
				label: "Fecha del informe de valor",
				type: "date",
				hito: "valor_estimado"
			},
			{
				key: "topePago",
				label: "Tope del pago a cuenta",
				type: "calculado",
				calcular: ({ values }) => num(values.valorEstimado) ? `${moneda(num(values.valorEstimado) * .5)} (50 % del valor estimado)` : "Registre el valor estimado"
			},
			{
				key: "montoPagoCuenta",
				label: "Pago a cuenta (S/)",
				type: "number"
			},
			{
				key: "fechaPagoCuenta",
				label: "Fecha del pago a cuenta",
				type: "date"
			},
			{
				key: "incentivo",
				label: "Incentivo aplicado",
				type: "calculado",
				ayuda: "Con entrega anticipada el incentivo sube del 20 % al 30 % (DL 1559).",
				calcular: ({ values }) => num(values.valorEstimado) ? `30 % · ${moneda(num(values.valorEstimado) * .3)}` : "30 % del valor"
			},
			{
				key: "comprobante",
				label: "Comprobante del pago a cuenta",
				type: "file",
				accept: ".pdf",
				fullWidth: true
			}
		]
	},
	{
		title: "Bloqueo registral",
		fields: [
			{
				key: "bloqueoSolicitado",
				label: "Bloqueo registral solicitado",
				type: "select",
				options: ["Sí", "No"]
			},
			{
				key: "partida",
				label: "Partida",
				visible: ({ values }) => conBloqueo(values)
			},
			{
				key: "fechaBloqueo",
				label: "Fecha de inscripción del bloqueo",
				type: "date",
				hito: "bloqueo_registral",
				visible: ({ values }) => conBloqueo(values)
			},
			{
				key: "venceBloqueo",
				label: "Vencimiento del bloqueo",
				type: "calculado",
				ayuda: "Art. 21.6: el bloqueo dura 2 años desde su inscripción.",
				visible: ({ values }) => conBloqueo(values),
				calcular: ({ values }) => {
					const d = desdeIso(values.fechaBloqueo);
					return d ? fecha(vencimiento(d, plazo("bloqueo_registral"))) : "Registre la inscripción";
				}
			},
			{
				key: "constanciaBloqueo",
				label: "Constancia de bloqueo",
				type: "file",
				accept: ".pdf",
				fullWidth: true,
				visible: ({ values }) => conBloqueo(values)
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
function EntregaAnticipadaPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Entrega anticipada y contratos preparatorios",
		paso: "entrega-anticipada",
		sections,
		modulo: 15,
		antesDelFormulario: ({ perfil }) => perfil.entregaAnticipada ? /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Entrega anticipada registrada en el perfil: el incentivo es del 30 % en la carta y en el pago (art. 21.8)."
		}) : null,
		validar: ({ values }) => num(values.montoPagoCuenta) > num(values.valorEstimado) * .5 ? `El pago a cuenta no puede superar el 50 % del valor estimado (${moneda(num(values.valorEstimado) * .5)}, art. 21.5).` : null,
		transiciones: [{
			texto: "Registrar entrega anticipada",
			icono: /* @__PURE__ */ jsx(HandCoins, {}),
			visible: ({ perfil }) => !perfil.entregaAnticipada,
			permitido: ({ rol }) => puedeCambiarRuta(rol) ? null : "Lo registran el Especialista legal, el Coordinador o el Administrador.",
			exigeMotivo: true,
			confirmacion: "Marca la entrega anticipada en el perfil del predio y sube el incentivo al 30 % (art. 21.8).",
			ejecutar: ({ perfil, codigo: c }, motivo) => corregirPerfil(c, datosPerfil(perfil), { entregaAnticipada: true }, "Registró entrega anticipada", motivo)
		}]
	});
}
//#endregion
export { EntregaAnticipadaPage as component };
