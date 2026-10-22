import { f as vencimiento, l as diasHabilesRestantes, m as fecha, p as desdeIso, s as registrarHito, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { Y as varianteDe } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.entrega-posesion-B6Bd0vry.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.entrega-posesion.tsx?tsr-split=component
var PASO = "entrega-posesion";
var DESOCUPACION = [
	"desocupacion_libre",
	"desocupacion_ocupado",
	"desocupacion_actividad"
];
/** Plazo de entrega según la ruta y el perfil; `tope` solo donde cabe prórroga por acuerdo (art. 31). */
function plazoDe(p) {
	const v = varianteDe(p);
	if (v === "estatal") return {
		clave: "entrega_estatal",
		desde: "resolución de la SBN"
	};
	if (v === "bloque") return {
		clave: "bloque_entrega",
		desde: "aceptación de la carta del bloque"
	};
	if (v === "mejoras") return {
		clave: p.ocupado ? "desocupacion_ocupado" : "desocupacion_libre",
		desde: "pago o consignación de las mejoras"
	};
	const desde = p.ruta === "EXPROPIACION" ? "notificación de la consignación" : "pago";
	if (p.actividad === "INDUSTRIA_COMERCIO") return {
		clave: "desocupacion_actividad",
		desde,
		tope: 120
	};
	return {
		clave: p.ocupado ? "desocupacion_ocupado" : "desocupacion_libre",
		desde,
		tope: 60
	};
}
var num = (v) => Number(v) || 0;
/** Vencimiento con la prórroga acordada; undefined sin hito de inicio. */
function venceEntrega({ perfil, hitos, values }) {
	const { clave, tope } = plazoDe(perfil);
	const desde = desdeIso(hitos[clave]?.fecha);
	if (!desde) return void 0;
	const p = plazo(clave);
	return vencimiento(desde, {
		...p,
		dias: p.dias + (tope ? num(values.prorroga) : 0)
	});
}
var sections = (ctx) => {
	const { clave, desde, tope } = plazoDe(ctx.perfil);
	const p = plazo(clave);
	const hito = ctx.hitos[clave];
	const deOtra = hito && hito.pantalla !== PASO ? hito : void 0;
	return [{
		title: "Plazo de entrega",
		fields: [
			{
				key: "inicioDeOtra",
				label: `Inicio del plazo (${desde})`,
				type: "calculado",
				visible: () => Boolean(deOtra),
				ayuda: deOtra ? `Registrado en ${deOtra.campo}.` : void 0,
				calcular: () => fecha(deOtra?.fecha)
			},
			{
				key: "fechaInicioPlazo",
				label: `Inicio del plazo (${desde})`,
				type: "date",
				hito: clave,
				visible: () => !deOtra
			},
			{
				key: "plazoBase",
				label: "Plazo legal",
				type: "calculado",
				calcular: () => `${p.dias} d.h. · ${p.nombre} · art. ${p.articulo}`
			},
			{
				key: "prorroga",
				label: "Prórroga por acuerdo (d.h.)",
				type: "number",
				visible: () => tope !== void 0,
				ayuda: `Art. 31: el plazo total con prórroga no supera ${tope} d.h.`
			},
			{
				key: "acuerdoProrroga",
				label: "Acuerdo de prórroga",
				type: "file",
				accept: ".pdf",
				fullWidth: true,
				visible: (c) => tope !== void 0 && num(c.values.prorroga) > 0
			},
			{
				key: "venceTotal",
				label: "Vencimiento de la entrega",
				type: "calculado",
				calcular: (c) => {
					const v = venceEntrega(c);
					return v ? fecha(v) : "Registre el inicio del plazo";
				}
			}
		]
	}, {
		title: "Datos de entrega",
		fields: [
			{
				key: "fechaEntrega",
				label: "Fecha de entrega",
				type: "date",
				required: true
			},
			{
				key: "estadoLiberacion",
				label: "Estado de liberación",
				type: "select",
				options: [
					"PENDIENTE",
					"PARCIALMENTE LIBERADO",
					"LIBERADO",
					"OBSERVADO"
				],
				required: true
			},
			{
				key: "acta",
				label: "Acta de entrega",
				type: "file",
				accept: ".pdf,.doc,.docx",
				fullWidth: true
			},
			{
				key: "observaciones",
				label: "Observaciones",
				type: "textarea",
				fullWidth: true
			},
			{
				key: "fotos",
				label: "Fotos del acta",
				type: "foto",
				fullWidth: true
			}
		]
	}];
};
function EntregaPosesionPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		modulo: 16,
		projectId,
		codigo,
		title: "Entrega de posesión",
		paso: PASO,
		sections,
		validar: ({ perfil, values }) => {
			const { clave, tope } = plazoDe(perfil);
			return tope && plazo(clave).dias + num(values.prorroga) > tope ? `Con la prórroga el plazo supera el tope de ${tope} d.h. (art. 31).` : null;
		},
		alGuardar: ({ perfil, hitos, codigo: c }) => {
			const vigente = plazoDe(perfil).clave;
			for (const k of DESOCUPACION) if (k !== vigente && hitos[k]?.pantalla === PASO) registrarHito(c, k, "", PASO, "");
		},
		antesDelFormulario: (ctx) => {
			const v = venceEntrega(ctx);
			return v && diasHabilesRestantes(v) < 0 && !ctx.values.fechaEntrega ? /* @__PURE__ */ jsxs(Aviso, {
				tipo: "error",
				children: [
					"El plazo de entrega venció el ",
					fecha(v),
					" sin acta. Corresponde la ejecución coactiva (Título V).",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/proyectos/$projectId/predios/$codigo/ejecucion-coactiva",
						params: {
							projectId,
							codigo: ctx.codigo
						},
						className: "font-semibold underline",
						children: "Ir a Ejecución coactiva"
					})
				]
			}) : null;
		},
		documento: {
			titulo: "Generar acta de entrega de posesión",
			tipos: ["acta"],
			subtipos: { acta: "ac-posesion" },
			destino: ({ predio }) => ({ externo: predio?.suj || "" }),
			asunto: ({ predio, decodedCodigo }) => `Entrega de posesión del predio ${predio?.cod || decodedCodigo}`,
			nombreArchivo: ({ predio, decodedCodigo }) => `acta_entrega_posesion_${(predio?.cod || decodedCodigo).replace(/[^A-Z0-9-]/gi, "").toUpperCase()}.doc`,
			armarArchivo: (numero, _tipo, c) => armarActa(numero, c)
		}
	});
}
function armarActa(numero, { values, decodedCodigo, projectLabel, predio }) {
	return createActaEntregaPosesionWordBlob({
		numero,
		fechaEntrega: values.fechaEntrega,
		estadoLiberacion: values.estadoLiberacion,
		observaciones: values.observaciones,
		predio,
		predioCode: predio?.cod || decodedCodigo,
		projectLabel
	});
}
function createActaEntregaPosesionWordBlob({ numero, fechaEntrega, estadoLiberacion, observaciones, predio, predioCode, projectLabel }) {
	const fechaDocumento = formatDocumentDate(fechaEntrega);
	const representante = predio?.rlegal || predio?.rtec || "Representante de la DDP";
	const sujetoPasivo = predio?.suj || "Sujeto pasivo pendiente de identificar";
	const html = `<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
  <head>
    <meta charset="UTF-8" />
    <title>Acta de entrega de posesión</title>
    <style>
      @page { size: A4; margin: 2cm 2.2cm; }
      body { font-family: Arial, sans-serif; color: rgb(17, 24, 39); font-size: 10.5pt; line-height: 1.5; }
      h1 { margin: 18px 0 4px; text-align: center; font-size: 15pt; }
      h2 { margin: 18px 0 8px; border-bottom: 1px solid rgb(200, 16, 46); padding-bottom: 4px; color: rgb(139, 26, 26); font-size: 11pt; }
      p { margin: 8px 0; text-align: justify; }
      .institution, .subtitle { text-align: center; }
      .institution { font-size: 9pt; font-weight: bold; }
      .subtitle { margin-bottom: 20px; font-size: 9pt; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; }
      th, td { border: 1px solid rgb(209, 213, 219); padding: 6px 8px; vertical-align: top; }
      th { width: 31%; background: rgb(243, 244, 246); text-align: left; }
      .signatures td { height: 90px; border: 0; padding: 50px 18px 0; text-align: center; vertical-align: bottom; }
      .signature-line { border-top: 1px solid rgb(17, 24, 39); padding-top: 5px; }
      .footer { margin-top: 24px; color: rgb(75, 85, 99); text-align: center; font-size: 8pt; }
    </style>
  </head>
  <body>
    <div class="institution">MINISTERIO DE TRANSPORTES Y COMUNICACIONES</div>
    <h1>ACTA DE ENTREGA DE POSESIÓN</h1>
    <div class="subtitle"><b>${escapeDocumentHtml(numero ?? "BORRADOR SIN NUMERAR")}</b> · Predio ${escapeDocumentHtml(predioCode)}</div>

    <p>
      En la fecha ${escapeDocumentHtml(fechaDocumento)}, se deja constancia de la entrega de posesión
      del predio identificado con código <b>${escapeDocumentHtml(predioCode)}</b>, correspondiente al
      proyecto <b>${escapeDocumentHtml(projectLabel)}</b>, de acuerdo con la información y condiciones
      detalladas en la presente acta.
    </p>

    <h2>1. Identificación del predio</h2>
    <table>
      <tr><th>Proyecto</th><td>${escapeDocumentHtml(projectLabel)}</td></tr>
      <tr><th>Código de predio</th><td>${escapeDocumentHtml(predioCode)}</td></tr>
      <tr><th>Expediente</th><td>${escapeDocumentHtml(predio?.exp || "No consignado")}</td></tr>
      <tr><th>Sujeto pasivo</th><td>${escapeDocumentHtml(sujetoPasivo)}</td></tr>
      <tr><th>Partida registral</th><td>${escapeDocumentHtml(predio?.part || predio?.pind || "No consignada")}</td></tr>
      <tr><th>Área afectada</th><td>${escapeDocumentHtml(predio?.area || predio?.m2 || "Por verificar")} m²</td></tr>
      <tr><th>Ubicación</th><td>${escapeDocumentHtml(predio?.ciudad || "No consignada")}</td></tr>
    </table>

    <h2>2. Condiciones de la entrega</h2>
    <table>
      <tr><th>Fecha de entrega</th><td>${escapeDocumentHtml(fechaDocumento)}</td></tr>
      <tr><th>Estado de liberación</th><td>${escapeDocumentHtml(estadoLiberacion || "Pendiente de verificar")}</td></tr>
      <tr><th>Observaciones</th><td>${escapeDocumentHtml(observaciones || "Sin observaciones registradas")}</td></tr>
    </table>

    <h2>3. Declaración de entrega</h2>
    <p>
      La parte entregante manifiesta que pone el predio descrito a disposición de la Dirección de
      Disponibilidad de Predios, en el estado físico y de ocupación consignado en esta acta. La parte
      receptora declara recibir la posesión para la continuidad de las acciones relacionadas con el
      proyecto, sin perjuicio de las verificaciones técnicas y legales que correspondan.
    </p>

    <h2>4. Conformidad</h2>
    <p>
      Leído el contenido del presente borrador, las partes podrán completar las precisiones necesarias
      antes de su impresión y suscripción definitiva.
    </p>

    <table class="signatures">
      <tr>
        <td><div class="signature-line"><b>${escapeDocumentHtml(sujetoPasivo)}</b><br />Parte entregante</div></td>
        <td><div class="signature-line"><b>${escapeDocumentHtml(representante)}</b><br />Representante DDP / parte receptora</div></td>
      </tr>
    </table>

    <div class="footer">Borrador generado el ${escapeDocumentHtml(todayInPeru())} por el Sistema de Gestión Predial.</div>
  </body>
</html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function formatDocumentDate(value) {
	if (!value) return "No consignada";
	const [year, month, day] = value.split("-");
	return year && month && day ? `${day}/${month}/${year}` : value;
}
function todayInPeru() {
	return new Intl.DateTimeFormat("es-PE", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		timeZone: "America/Lima"
	}).format(/* @__PURE__ */ new Date());
}
function escapeDocumentHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//#endregion
export { EntregaPosesionPage as component };
