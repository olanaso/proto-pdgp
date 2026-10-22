import { _ as moneda, i as estadoPlazo, m as fecha, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { I as NOMBRE_CASO, z as REGLA_CASO } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.consignacion-0rsAP5Ot.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.consignacion.tsx?tsr-split=component
/** A nombre de quién se consigna según el caso especial (flujograma de la DDP). */
var A_NOMBRE_DE = {
	"": "Sujeto pasivo",
	DUPLICIDAD: "Titulares registrales en duplicidad",
	LITIGIO: "Autoridad judicial o arbitral",
	TERCEROS: "Sujeto pasivo",
	SUCESION: "Sujeto pasivo"
};
var PASO = "consignacion";
var DESOCUPACION = [
	"desocupacion_libre",
	"desocupacion_ocupado",
	"desocupacion_actividad"
];
/** 10 d.h. libre, 30 ocupado, 90 con industria o comercio en funcionamiento (art. 28.1.e; DL 1559). */
var claveDesocupacion = (p) => p.actividad === "INDUSTRIA_COMERCIO" ? "desocupacion_actividad" : p.ocupado ? "desocupacion_ocupado" : "desocupacion_libre";
/** El hito lo registró otra pantalla: aquí solo se muestra (no se pisa). */
var deOtra = (ctx, clave) => {
	const h = ctx.hitos[clave];
	return h && h.pantalla !== PASO ? h : void 0;
};
var num = (v) => Number((v ?? "").replace(/,/g, "")) || 0;
function ConsignacionPage() {
	const { projectId, codigo } = Route.useParams();
	const tasacion = num(useHistorial(`expropiacion-${decodeURIComponent(codigo)}`)[0]?.registro.montoTasacion);
	const sections = (ctx) => [
		{
			title: "Resolución de ejecución",
			fields: [
				{
					key: "resolucionDe53",
					label: "Fecha de la resolución",
					type: "calculado",
					visible: (c) => Boolean(deOtra(c, "consignacion")),
					ayuda: "Tomada de 5.3 Resolución ministerial de ejecución.",
					calcular: (c) => fecha(deOtra(c, "consignacion")?.fecha)
				},
				{
					key: "fechaResolucion",
					label: "Fecha de la resolución",
					type: "date",
					hito: "consignacion",
					required: true,
					visible: (c) => !deOtra(c, "consignacion")
				},
				{
					key: "plazoConsignacion",
					label: "Plazo de consignación",
					type: "calculado",
					calcular: ({ hitos }) => {
						const e = estadoPlazo(hitos, "consignacion");
						const g = estadoPlazo(hitos, "consignacion_gestion");
						return e ? `Vence el ${fecha(e.vence)} (10 d.h., art. 28.3)${g ? `. Plazo de gestión: ${fecha(g.vence)} (3 d.h.)` : ""}` : "Registre la fecha de la resolución";
					}
				}
			]
		},
		{
			title: "Consignación",
			fields: [
				{
					key: "monto",
					label: "Monto consignado (S/)",
					type: "number",
					required: true
				},
				{
					key: "comparacion",
					label: "Valor de tasación aprobado",
					type: "calculado",
					calcular: ({ values }) => !tasacion ? "Sin valor registrado en 5.3" : num(values.monto) === tasacion ? `${moneda(tasacion)} · el monto coincide` : `${moneda(tasacion)} · diferencia ${moneda(num(values.monto) - tasacion)}`
				},
				{
					key: "aNombreDe",
					label: "A nombre de",
					type: "select",
					options: [
						"Sujeto pasivo",
						"Titulares registrales en duplicidad",
						"Autoridad judicial o arbitral"
					],
					required: true,
					ayuda: ctx.perfil.casoEspecial ? `${NOMBRE_CASO[ctx.perfil.casoEspecial]}: ${REGLA_CASO[ctx.perfil.casoEspecial]}` : "Sin caso especial: se consigna a nombre del sujeto pasivo."
				},
				{
					key: "certificado",
					label: "N.º de certificado de consignación",
					required: true
				},
				{
					key: "fechaCertificado",
					label: "Fecha del certificado",
					type: "date",
					hito: "arbitraje_caducidad",
					required: true,
					ayuda: "Desde la consignación corren los 2 años para cuestionar el valor (art. 34)."
				},
				{
					key: "certificadoArchivo",
					label: "Certificado de consignación",
					type: "file",
					accept: ".pdf",
					fullWidth: true,
					ayuda: "Se anexan la resolución de ejecución y la copia fedateada de la consignación."
				}
			]
		},
		{
			title: "Notificación y publicación",
			fields: [
				{
					key: "fechaNotificacion",
					envio: {
						canal: "Notificación notarial",
						destinatario: "Sujeto pasivo"
					},
					label: "Notificación notarial al sujeto pasivo",
					type: "date",
					hito: claveDesocupacion(ctx.perfil),
					ayuda: "Inicia el plazo de desocupación según el perfil (ocupado y actividad)."
				},
				{
					key: "notaria",
					label: "Notaría"
				},
				{
					key: "fechaPublicacion",
					envio: {
						canal: "Publicación en El Peruano",
						destinatario: "Diario oficial"
					},
					label: "Publicación en El Peruano",
					type: "date"
				},
				{
					key: "cargoNotificacion",
					label: "Cargo de notificación",
					type: "file",
					accept: ".pdf",
					fullWidth: true
				},
				{
					key: "publicacion",
					label: "Publicación",
					type: "file",
					accept: ".pdf",
					fullWidth: true
				}
			]
		}
	];
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Consignación en el Banco de la Nación",
		paso: PASO,
		sections,
		modulo: 16,
		validar: ({ values, perfil }) => {
			const esperado = A_NOMBRE_DE[perfil.casoEspecial];
			return values.aNombreDe && values.aNombreDe !== esperado ? `${NOMBRE_CASO[perfil.casoEspecial] || "Sin caso especial"}: la consignación va a nombre de "${esperado}".` : null;
		},
		alGuardar: (ctx) => {
			const { perfil, hitos, codigo: c } = ctx;
			if (!hitos.consignacion_gestion || hitos.consignacion_gestion.pantalla === PASO) registrarHito(c, "consignacion_gestion", deOtra(ctx, "consignacion")?.fecha ?? ctx.values.fechaResolucion ?? "", PASO, "Fecha de la resolución");
			const vigente = claveDesocupacion(perfil);
			for (const k of DESOCUPACION) if (k !== vigente && hitos[k]?.pantalla === PASO) registrarHito(c, k, "", PASO, "");
		}
	});
}
//#endregion
export { ConsignacionPage as component };
