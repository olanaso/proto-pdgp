import { i as estadoPlazo, m as fecha, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { i as registrarVersion } from "./historial-Bc37nCTn.js";
import { Y as varianteDe } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.ejecucion-coactiva-BHPJKrMo.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.ejecucion-coactiva.tsx?tsr-split=component
/** Base legal y plazo de entrega que habilita la ejecución, según la ruta del predio. */
var POR_VARIANTE = {
	privado: {
		base: "Título V, art. 39 y 40: desocupación forzosa y descerraje al vencer el plazo de entrega, en adquisición y en expropiación.",
		plazos: [
			"desocupacion_libre",
			"desocupacion_ocupado",
			"desocupacion_actividad"
		]
	},
	estatal: {
		base: "Art. 41.6 y 41.7: si la entidad ocupante no entrega en 30 d.h., se pide la ejecución coactiva y el lanzamiento.",
		plazos: ["entrega_estatal"]
	},
	mejoras: {
		base: "DCF 3.ª: vencido el plazo de desocupación después del pago o la consignación de las mejoras, procede el lanzamiento.",
		plazos: ["desocupacion_libre", "desocupacion_ocupado"]
	},
	bloque: {
		base: "Art. 64 (DL 1726): si el afectado del bloque no entrega, se procede a la ejecución coactiva y el lanzamiento.",
		plazos: ["bloque_entrega"]
	}
};
var plazoEntrega = (ctx) => POR_VARIANTE[varianteDe(ctx.perfil)].plazos.map((k) => estadoPlazo(ctx.hitos, k)).find(Boolean);
var conEntrega = (ctx) => ctx.values.resultado === "Entregado" || ctx.values.resultado === "Con descerraje";
function EjecucionCoactivaPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Ejecución coactiva y descerraje",
		paso: "ejecucion-coactiva",
		sections: [
			{
				title: "Plazo de entrega vencido",
				fields: [{
					key: "vencimientoEntrega",
					label: "Vencimiento del plazo de entrega",
					type: "calculado",
					ayuda: "Tomado de Entrega de posesión (o de la resolución que lo inicia).",
					calcular: (c) => {
						const e = plazoEntrega(c);
						return e ? `${fecha(e.vence)} · ${e.nombre} · art. ${e.articulo}` : "Sin plazo de entrega registrado";
					}
				}]
			},
			{
				title: "1. Solicitud al ejecutor coactivo",
				fields: [
					{
						key: "consignacionJudicial",
						label: "Consignación judicial del monto total",
						type: "select",
						options: ["Realizada", "Pendiente"],
						required: true,
						ayuda: "La solicitud va previa consignación judicial del monto total del valor.",
						visible: (c) => varianteDe(c.perfil) === "privado"
					},
					{
						key: "fechaRequerimiento",
						envio: {
							canal: "Solicitud de ejecución",
							destinatario: "Ejecutor coactivo"
						},
						label: "Fecha de la solicitud al ejecutor coactivo",
						type: "date",
						required: true,
						hito: "coactiva_solicitud",
						ayuda: "Con esta fecha también corre el plazo de gestión para que el ejecutor ordene."
					},
					{
						key: "oficio",
						label: "Oficio de solicitud"
					}
				]
			},
			{
				title: "2. Orden del ejecutor coactivo",
				fields: [
					{
						key: "plazoOrden",
						label: "Plazo para la orden",
						type: "calculado",
						calcular: (c) => {
							const e = estadoPlazo(c.hitos, "coactiva_orden");
							return e ? `${e.restantes < 0 ? "Venció" : "Vence"} el ${fecha(e.vence)} · plazo de gestión` : "Corre desde la solicitud al ejecutor coactivo";
						}
					},
					{
						key: "resolucionNumero",
						label: "N.º de resolución de ejecución coactiva"
					},
					{
						key: "resolucionFecha",
						label: "Fecha de la orden del ejecutor",
						type: "date",
						hito: "lanzamiento"
					},
					{
						key: "resolucionArchivo",
						label: "Resolución coactiva",
						type: "file",
						accept: ".pdf",
						fullWidth: true
					}
				]
			},
			{
				title: "3. Lanzamiento y toma de posesión",
				fields: [
					{
						key: "fechaLanzamiento",
						label: "Fecha del lanzamiento",
						type: "date"
					},
					{
						key: "apoyoPolicial",
						label: "Apoyo policial solicitado",
						type: "select",
						options: ["Sí", "No"]
					},
					{
						key: "oficioPnp",
						label: "Oficio a la PNP",
						type: "file",
						accept: ".pdf",
						fullWidth: true,
						visible: (c) => c.values.apoyoPolicial === "Sí"
					},
					{
						key: "juzgadoPaz",
						label: "Juzgado de paz letrado que acompaña"
					},
					{
						key: "gobiernoLocal",
						label: "Gobierno local que acompaña"
					},
					{
						key: "resultado",
						label: "Resultado",
						type: "select",
						options: [
							"Entregado",
							"Suspendido",
							"Con descerraje"
						]
					},
					{
						key: "acta",
						label: "Acta de lanzamiento y toma de posesión",
						type: "file",
						accept: ".pdf",
						fullWidth: true
					},
					{
						key: "observaciones",
						label: "Observaciones",
						type: "textarea",
						fullWidth: true
					}
				]
			},
			{
				title: "4. Descerraje",
				visible: (c) => c.values.resultado === "Con descerraje",
				fields: [
					{
						key: "esDomicilio",
						label: "¿El predio es domicilio del sujeto pasivo?",
						type: "select",
						options: ["Sí", "No"],
						required: true
					},
					{
						key: "fechaSolicitudJuez",
						envio: {
							canal: "Solicitud de descerraje",
							destinatario: "Juez"
						},
						label: "Solicitud de descerraje al juez",
						type: "date",
						visible: (c) => c.values.esDomicilio === "Sí"
					},
					{
						key: "fechaDescerraje",
						label: "Autorización judicial de descerraje",
						type: "date",
						ayuda: "El juez la otorga en 24 horas (DL 1726).",
						visible: (c) => c.values.esDomicilio === "Sí"
					},
					{
						key: "descerrajeDirecto",
						label: "Descerraje",
						type: "calculado",
						calcular: () => "Lo dispone directamente el ejecutor coactivo (art. 40.3)",
						visible: (c) => c.values.esDomicilio === "No"
					}
				]
			}
		],
		modulo: 16,
		antesDelFormulario: ({ perfil }) => /* @__PURE__ */ jsxs(Aviso, {
			tipo: "info",
			children: [POR_VARIANTE[varianteDe(perfil)].base, " La ejecución procede haya o no impugnación."]
		}),
		validar: ({ values, perfil }) => varianteDe(perfil) === "privado" && values.fechaRequerimiento && values.consignacionJudicial !== "Realizada" ? "La solicitud al ejecutor coactivo exige la consignación judicial del monto total." : null,
		alGuardar: ({ values, codigo: c }) => registrarHito(c, "coactiva_orden", values.fechaRequerimiento ?? "", "ejecucion-coactiva", "Fecha de la solicitud al ejecutor coactivo"),
		transiciones: [{
			texto: "Registrar entrega",
			icono: /* @__PURE__ */ jsx(CheckCircle2, {}),
			visible: conEntrega,
			permitido: ({ values }) => values.fechaLanzamiento ? null : "Registre la fecha del lanzamiento.",
			confirmacion: "Registra la entrega en Entrega de posesión y cierra la ejecución coactiva.",
			ejecutar: ({ values, codigo: c }) => {
				const clave = `pdgp-form-entrega-posesion-${c}`;
				let previo = {};
				try {
					previo = JSON.parse(localStorage.getItem(clave) ?? "{}");
				} catch {}
				const registro = {
					...previo,
					fechaEntrega: values.fechaLanzamiento,
					estadoLiberacion: "LIBERADO",
					observaciones: `Entrega por ejecución coactiva (${values.resultado.toLowerCase()}).`
				};
				try {
					localStorage.setItem(clave, JSON.stringify(registro));
				} catch {}
				registrarVersion(`entrega-posesion-${c}`, {
					accion: "Registró la entrega por ejecución coactiva",
					objeto: c,
					registro
				}, {
					modulo: 16,
					entidad: "entrega-posesion"
				});
			},
			destino: "entrega-posesion"
		}]
	});
}
//#endregion
export { EjecucionCoactivaPage as component };
