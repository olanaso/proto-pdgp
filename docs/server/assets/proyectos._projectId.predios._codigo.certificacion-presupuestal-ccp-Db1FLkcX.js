import { v as htmlDocumentoBase } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.certificacion-presupuestal-ccp-BHgOW1O5.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.certificacion-presupuestal-ccp.tsx?tsr-split=component
var ASUNTO = "Requerimiento de certificación presupuestal para el predio";
var sections = [{
	title: "Datos de la certificación presupuestal",
	fields: [
		{
			key: "numeroCcp",
			label: "Número CCP",
			required: true
		},
		{
			key: "fechaCcp",
			label: "Fecha",
			type: "date",
			required: true
		},
		{
			key: "montoCertificado",
			label: "Monto certificado",
			placeholder: "S/ 0.00",
			required: true
		},
		{
			key: "fuenteFinanciamiento",
			label: "Fuente de financiamiento",
			required: true
		},
		{
			key: "archivoCcp",
			label: "Archivo CCP",
			type: "file",
			accept: ".pdf,.doc,.docx",
			fullWidth: true
		}
	]
}];
function CertificacionPresupuestalCcpPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Certificación presupuestal – CCP",
		paso: "certificacion-presupuestal-ccp",
		sections,
		documento: {
			titulo: "Generar memorando de requerimiento de CCP",
			descripcion: "Memorando a la OGA. El número CCP lo emite la OGA y se registra arriba.",
			tipos: ["memorando"],
			subtipos: { memorando: "me-ccp" },
			destino: () => ({ areaId: "oga" }),
			asunto: (c) => `${ASUNTO} ${c.predio?.cod || c.decodedCodigo}`,
			nombreArchivo: (c) => `memorando_ccp_${c.decodedCodigo.replace(/[^A-Z0-9-]/gi, "_")}.doc`,
			armarArchivo: (numero, _t, c) => new Blob(["﻿", htmlDocumentoBase({
				titulo: "MEMORANDO",
				numero,
				asunto: c.predio?.cod ? `${ASUNTO} ${c.predio.cod}` : `${ASUNTO} ${c.decodedCodigo}`,
				lineas: [
					`Proyecto: ${c.projectLabel}`,
					`Predio: ${c.predio?.cod || c.decodedCodigo}`,
					c.values.montoCertificado ? `Monto a certificar: ${c.values.montoCertificado}` : ""
				],
				cuerpo: "Se solicita la emisión de la Certificación de Crédito Presupuestario para la adquisición del predio, conforme al valor de tasación aprobado."
			})], { type: "application/msword;charset=utf-8" })
		}
	});
}
//#endregion
export { CertificacionPresupuestalCcpPage as component };
