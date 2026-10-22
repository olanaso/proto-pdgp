import { i as estadoPlazo, m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.arbitraje-rmAs_m_P.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.arbitraje.tsx?tsr-split=component
var PASO = "arbitraje";
var SIN = "Sin cuestionamiento";
var enProceso = ({ values }) => (values.estado || SIN) !== SIN;
var vence = (ctx, clave, falta) => {
	const e = estadoPlazo(ctx.hitos, clave);
	return e ? `Vence el ${fecha(e.vence)} (art. ${e.articulo})` : falta;
};
function ArbitrajePage() {
	const { projectId, codigo } = Route.useParams();
	const sections = (ctx) => [
		{
			title: "Estado y caducidad",
			fields: [
				{
					key: "estado",
					label: "Estado",
					type: "select",
					options: [
						SIN,
						"En trámite",
						"Concluido"
					],
					ayuda: "Solo se discute el valor, el remanente o la duplicidad de partidas (art. 34)."
				},
				{
					key: "consignacionDe54",
					label: "Fecha de la consignación",
					type: "calculado",
					ayuda: "Tomada de 5.4 Consignación.",
					visible: (c) => Boolean(c.hitos.arbitraje_caducidad) && c.hitos.arbitraje_caducidad.pantalla !== PASO,
					calcular: (c) => fecha(c.hitos.arbitraje_caducidad?.fecha)
				},
				{
					key: "fechaConsignacion",
					label: "Fecha de la consignación",
					type: "date",
					hito: "arbitraje_caducidad",
					visible: (c) => !c.hitos.arbitraje_caducidad || c.hitos.arbitraje_caducidad.pantalla === PASO
				},
				{
					key: "caducidad",
					label: "Caducidad del cuestionamiento",
					type: "calculado",
					calcular: (c) => vence(c, "arbitraje_caducidad", "2 años desde la consignación (registre la consignación)")
				}
			]
		},
		{
			title: "Proceso",
			visible: enProceso,
			fields: [
				{
					key: "via",
					label: "Vía",
					type: "select",
					options: ["Arbitral", "Judicial"],
					required: enProceso(ctx)
				},
				{
					key: "causal",
					label: "Causal",
					type: "select",
					options: [
						"Revisión del valor de la tasación",
						"Expropiación total del remanente",
						"Duplicidad de partidas"
					],
					required: enProceso(ctx)
				},
				{
					key: "fechaComunicacion",
					label: "Comunicación del sujeto pasivo",
					type: "date",
					hito: "arbitraje_oposicion",
					ayuda: "Desde aquí corren los 10 d.h. para oponerse al arbitraje (art. 35)."
				},
				{
					key: "oposicion",
					label: "Oposición del sujeto activo al arbitraje",
					type: "select",
					options: ["Sí", "No"],
					visible: (c) => c.values.via === "Arbitral"
				},
				{
					key: "centro",
					label: "Centro de arbitraje o juzgado"
				},
				{
					key: "expediente",
					label: "Expediente"
				},
				{
					key: "fechaAdmision",
					label: "Admisión de la demanda",
					type: "date",
					hito: "laudo"
				},
				{
					key: "plazoLaudo",
					label: "Plazo del laudo",
					type: "calculado",
					calcular: (c) => vence(c, "laudo", "6 meses desde la admisión")
				},
				{
					key: "demanda",
					label: "Demanda",
					type: "file",
					accept: ".pdf",
					fullWidth: true
				}
			]
		},
		{
			title: "Resultado y pago",
			visible: enProceso,
			fields: [
				{
					key: "montoAdicional",
					label: "Monto adicional ordenado (S/)",
					type: "number"
				},
				{
					key: "fechaLaudo",
					label: "Fecha del laudo o sentencia",
					type: "date",
					hito: "pago_laudo"
				},
				{
					key: "fideicomiso",
					label: "Pago mediante fideicomiso",
					type: "select",
					options: ["Sí", "No"],
					ayuda: "Con fideicomiso el plazo de pago es de 60 d.h. (art. 38)."
				},
				{
					key: "plazoPago",
					label: "Plazo de pago",
					type: "calculado",
					calcular: (c) => c.values.fideicomiso === "Sí" ? "60 d.h. desde el laudo o la sentencia (fideicomiso)" : vence(c, "pago_laudo", "20 d.h. desde el laudo o la sentencia")
				},
				{
					key: "fechaPagoAdicional",
					label: "Fecha de pago del monto adicional",
					type: "date"
				},
				{
					key: "laudoArchivo",
					label: "Laudo o sentencia",
					type: "file",
					accept: ".pdf",
					fullWidth: true
				},
				{
					key: "comprobantePago",
					label: "Comprobante del pago adicional",
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
		}
	];
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Arbitraje o vía judicial",
		paso: PASO,
		sections,
		modulo: 16
	});
}
//#endregion
export { ArbitrajePage as component };
