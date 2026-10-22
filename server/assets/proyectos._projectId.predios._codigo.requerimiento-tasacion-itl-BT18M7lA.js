import { v as htmlDocumentoBase } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.requerimiento-tasacion-itl-BO-JZWYq.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.requerimiento-tasacion-itl.tsx?tsr-split=component
var ASUNTO = "Presentación del expediente técnico con fines de tasación del predio";
var sections = [{
	title: "Expediente técnico",
	fields: [{
		key: "fechaConclusion",
		label: "Conclusión del expediente técnico",
		type: "date",
		hito: "presentacion_tasacion",
		required: true,
		ayuda: "Desde aquí corren los 15 d.h. de gestión para presentarlo con fines de tasación."
	}]
}, {
	title: "Datos del requerimiento",
	fields: [
		{
			key: "numero",
			label: "Número de requerimiento",
			required: true
		},
		{
			key: "fecha",
			envio: {
				canal: "Requerimiento de tasación",
				destinatario: "Entidad tasadora"
			},
			label: "Fecha",
			type: "date",
			required: true
		},
		{
			key: "entidad",
			label: "Entidad receptora",
			required: true
		},
		{
			key: "estado",
			label: "Estado",
			type: "select",
			options: [
				"BORRADOR",
				"ENVIADO",
				"RECIBIDO",
				"OBSERVADO",
				"ATENDIDO"
			],
			required: true
		},
		{
			key: "informeTecnicoLegal",
			label: "Informe Técnico Legal",
			type: "file",
			accept: ".pdf,.doc,.docx",
			fullWidth: true
		}
	]
}];
function RequerimientoTasacionItlPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Presentación del expediente con fines de tasación",
		paso: "requerimiento-tasacion-itl",
		sections,
		documento: {
			titulo: "Generar requerimiento de tasación",
			descripcion: "Oficio al ente tasador o memorando interno. El número se guarda en «Número de requerimiento».",
			tipos: ["oficio", "memorando"],
			subtipos: {
				oficio: "of-tasacion",
				memorando: "me-tasacion"
			},
			campoNumero: "numero",
			destino: (c) => ({ externo: c.values.entidad || "" }),
			asunto: (c) => `${ASUNTO} ${c.predio?.cod || c.decodedCodigo}`,
			nombreArchivo: (c, t) => `${t}_tasacion_${c.decodedCodigo.replace(/[^A-Z0-9-]/gi, "_")}.doc`,
			armarArchivo: (numero, t, c) => new Blob(["﻿", htmlDocumentoBase({
				titulo: t === "oficio" ? "OFICIO" : "MEMORANDO",
				numero,
				asunto: c.predio?.cod ? `${ASUNTO} ${c.predio.cod}` : `${ASUNTO} ${c.decodedCodigo}`,
				lineas: [
					`Proyecto: ${c.projectLabel}`,
					`Predio: ${c.predio?.cod || c.decodedCodigo}`,
					c.values.entidad ? `Dirigido a: ${c.values.entidad}` : ""
				],
				cuerpo: "Se remite el expediente técnico del predio con fines de tasación, conforme al TUO del Decreto Legislativo 1192."
			})], { type: "application/msword;charset=utf-8" })
		}
	});
}
//#endregion
export { RequerimientoTasacionItlPage as component };
