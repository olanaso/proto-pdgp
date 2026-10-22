import { _ as moneda, m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { Y as varianteDe } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.pago-consignacion-BAWuzXY0.js";
import { r as SituacionSiaf } from "./ConciliacionSiaf-DB3SkFdm.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.pago-consignacion.tsx?tsr-split=component
var modoDe = ({ perfil }) => {
	const v = varianteDe(perfil);
	if (v === "mejoras" || v === "bloque") return "acuerdo";
	return perfil.ruta === "EXPROPIACION" ? "expropiacion" : "trato";
};
/** Expediente del ciclo de gasto en la UE; se cruza con la exportación del SIAF-SP cargada en Metas. */
var EXPEDIENTE_SIAF = {
	key: "expedienteSiaf",
	label: "N.º de expediente SIAF",
	placeholder: "Solo dígitos",
	ayuda: "Expediente del gasto en el SIAF-SP de la UE. Al guardarlo, abajo se muestra su devengado y girado si la exportación está cargada."
};
var comprobantes = [{
	key: "comprobante",
	label: "Comprobante",
	type: "file",
	accept: ".pdf",
	fullWidth: true
}, {
	key: "fotos",
	label: "Foto del comprobante",
	type: "foto",
	fullWidth: true
}];
var TRATO = [{
	title: "Pago al sujeto pasivo",
	fields: [
		{
			key: "formaPago",
			label: "Forma de pago",
			type: "select",
			options: ["Cheque", "Transferencia"],
			required: true
		},
		{
			key: "monto",
			label: "Monto (S/)",
			type: "number",
			required: true
		},
		{
			key: "fechaPago",
			label: "Fecha de pago",
			type: "date",
			hito: "formulario_y_pago",
			required: true,
			ayuda: "Art. 20.4.b: formulario registral y pago en 20 d.h. (60 en fideicomiso)."
		},
		{
			key: "numeroComprobante",
			label: "N.º de cheque u operación",
			required: true
		},
		{
			key: "entidadBancaria",
			label: "Entidad bancaria",
			type: "select",
			options: ["BANCO DE LA NACIÓN", "OTRA ENTIDAD"]
		},
		EXPEDIENTE_SIAF,
		...comprobantes
	]
}];
var ACUERDO = [{
	title: "Pago del acuerdo",
	fields: [
		{
			key: "acuerdo",
			label: "Acuerdo o acta de referencia",
			required: true
		},
		{
			key: "beneficiario",
			label: "Beneficiario",
			required: true
		},
		{
			key: "formaPago",
			label: "Forma de pago",
			type: "select",
			options: ["Pago directo", "Consignación"],
			required: true
		},
		{
			key: "monto",
			label: "Monto (S/)",
			type: "number",
			required: true
		},
		{
			key: "fechaPago",
			label: "Fecha de pago",
			type: "date",
			required: true
		},
		{
			key: "numeroComprobante",
			label: "N.º de comprobante u operación"
		},
		EXPEDIENTE_SIAF,
		...comprobantes
	]
}];
function PagoConsignacionPage() {
	const { projectId, codigo } = Route.useParams();
	const consignacion = useHistorial(`consignacion-${decodeURIComponent(codigo)}`)[0]?.registro;
	const leer = (k, f = (v) => v) => () => consignacion?.[k] ? f(consignacion[k]) : "Sin registrar";
	const EXPROPIACION = [{
		title: "Consignación registrada en 5.4",
		fields: [
			{
				key: "cMonto",
				label: "Monto consignado",
				type: "calculado",
				calcular: leer("monto", (v) => moneda(Number(v)))
			},
			{
				key: "cNombre",
				label: "A nombre de",
				type: "calculado",
				calcular: leer("aNombreDe")
			},
			{
				key: "cCertificado",
				label: "Certificado de consignación",
				type: "calculado",
				calcular: leer("certificado")
			},
			{
				key: "cFecha",
				label: "Fecha del certificado",
				type: "calculado",
				calcular: leer("fechaCertificado", fecha)
			},
			{
				key: "cNotificacion",
				label: "Notificación notarial",
				type: "calculado",
				calcular: leer("fechaNotificacion", fecha)
			}
		]
	}];
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Pago o consignación",
		paso: "pago-consignacion",
		modulo: 19,
		sections: (ctx) => ({
			trato: TRATO,
			expropiacion: EXPROPIACION,
			acuerdo: ACUERDO
		})[modoDe(ctx)],
		validar: (ctx) => ctx.values.expedienteSiaf && !/^\d{1,10}$/.test(ctx.values.expedienteSiaf.trim()) ? "El expediente SIAF se escribe solo con dígitos." : null,
		antesDelFormulario: (ctx) => modoDe(ctx) === "expropiacion" ? /* @__PURE__ */ jsxs(Aviso, {
			tipo: "info",
			children: [
				"En expropiación el pago se hace por consignación en el Banco de la Nación (art. 28). Se registra en",
				" ",
				/* @__PURE__ */ jsx(Link, {
					to: "/proyectos/$projectId/predios/$codigo/consignacion",
					params: {
						projectId,
						codigo: ctx.codigo
					},
					className: "font-semibold underline",
					children: "5.4 Consignación"
				}),
				"; aquí solo se muestra."
			]
		}) : /* @__PURE__ */ jsx(SituacionSiaf, {
			expediente: ctx.values.expedienteSiaf ?? "",
			anio: Number(ctx.values.fechaPago?.slice(0, 4)) || (/* @__PURE__ */ new Date()).getFullYear()
		})
	});
}
//#endregion
export { PagoConsignacionPage as component };
