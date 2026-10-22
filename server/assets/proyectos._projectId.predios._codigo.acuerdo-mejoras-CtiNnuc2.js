import { _ as moneda } from "./archivosIdb-BbjJAFd8.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.acuerdo-mejoras-CZP6lxJj.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.acuerdo-mejoras.tsx?tsr-split=component
/** Suma de las mejoras vigentes (sin las quitadas) más los gastos de traslado. */
function montoTotal(values) {
	let filas = [];
	try {
		filas = JSON.parse(values.mejoras || "[]");
	} catch {}
	return filas.filter((f) => !f._bajaMotivo).reduce((s, f) => s + (Number(f.valor) || 0), 0) + (Number(values.gastosTraslado) || 0);
}
var sections = (ctx) => [
	{
		title: "Ocupante o poseedor",
		fields: [{
			key: "ocupante",
			label: "Nombre del ocupante o poseedor",
			required: true,
			fullWidth: true,
			ayuda: "Como figura en Ocupantes y poseedores (1.7)."
		}, {
			key: "documento",
			label: "DNI o RUC"
		}]
	},
	{
		title: "Mejoras y gastos de traslado",
		fields: [
			{
				key: "mejoras",
				label: "Mejoras reconocidas",
				type: "lista",
				required: true,
				ayuda: "Las de la caracterización, con el valor del informe de tasación.",
				columnas: [{
					clave: "descripcion",
					titulo: "Mejora"
				}, {
					clave: "valor",
					titulo: "Valor de tasación (S/)",
					tipo: "number"
				}]
			},
			{
				key: "gastosTraslado",
				label: "Gastos de traslado (S/)",
				type: "number"
			},
			{
				key: "sustentoTraslado",
				label: "Sustento de los gastos"
			},
			{
				key: "total",
				label: "Monto total",
				type: "calculado",
				ayuda: "Suma de las mejoras de la lista más los gastos de traslado.",
				calcular: (c) => moneda(montoTotal(c.values))
			},
			{
				key: "ccp",
				label: "Certificación presupuestal (CCP)",
				required: true
			}
		]
	},
	{
		title: "Acuerdo y pago",
		fields: [
			{
				key: "fechaAcuerdo",
				label: "Fecha del acuerdo",
				type: "date",
				required: true
			},
			{
				key: "formaPago",
				label: "Forma de pago",
				type: "select",
				options: ["PAGO", "CONSIGNACIÓN"],
				required: true
			},
			{
				key: "fechaPago",
				label: "Fecha de pago o consignación",
				type: "date",
				hito: ctx.perfil.ocupado ? "desocupacion_ocupado" : "desocupacion_libre",
				ayuda: "Desde esta fecha corre el plazo para entregar el inmueble."
			},
			{
				key: "actaAcuerdo",
				label: "Acta de acuerdo",
				type: "file",
				accept: ".pdf"
			},
			{
				key: "comprobante",
				label: "Comprobante de pago",
				type: "file",
				accept: ".pdf"
			}
		]
	}
];
function AcuerdoMejorasPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Acuerdo y acta de reconocimiento de mejoras",
		paso: "acuerdo-mejoras",
		sections,
		modulo: 17,
		validar: (ctx) => montoTotal(ctx.values) <= 0 ? "El monto total debe ser mayor que cero." : null
	});
}
//#endregion
export { AcuerdoMejorasPage as component };
