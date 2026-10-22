import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useEnvios, n as actualizarEnvio, t as RESULTADOS_ENVIO } from "./envios-0BYSMr_j.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { jsx } from "react/jsx-runtime";
//#region src/components/kit/HistorialEnvios.tsx
var TONO = {
	enviado: "primary",
	aceptado: "success",
	observado: "warning",
	rechazado: "destructive",
	finalizado: "neutral"
};
/**
* Tabla de envíos de un panel (docs/PLAN-INTERFACES.md R8): va debajo del botón que envía. Con `editable`,
* el resultado se cambia en la fila (quien registra la respuesta de SUNARP, la notaría o el sujeto pasivo).
*/
function HistorialEnvios({ proyecto, predio, paso, editable, vacio = "Aún no se envió nada." }) {
	const envios = useEnvios({
		proyecto,
		predio,
		paso
	});
	return /* @__PURE__ */ jsx(Tabla, {
		filas: envios,
		claveFila: (e) => e.id,
		vacio,
		columnas: [
			{
				clave: "n",
				titulo: "N.°",
				ancho: "3rem",
				render: (_, i) => envios.length - i
			},
			{
				clave: "fecha",
				titulo: "Fecha",
				render: (e) => fechaHora(e.fecha)
			},
			{
				clave: "canal",
				titulo: "Canal"
			},
			{
				clave: "destinatario",
				titulo: "Destinatario"
			},
			{
				clave: "documento",
				titulo: "Documento",
				render: (e) => e.documento ?? ""
			},
			{
				clave: "realizadoPor",
				titulo: "Realizado por"
			},
			{
				clave: "resultado",
				titulo: "Resultado",
				render: (e) => editable ? /* @__PURE__ */ jsx("select", {
					"aria-label": `Resultado del envío ${e.id}`,
					className: `${controlClase} h-8 w-36`,
					value: e.resultado,
					onChange: (ev) => actualizarEnvio(e.id, ev.target.value),
					children: Object.keys(RESULTADOS_ENVIO).map((r) => /* @__PURE__ */ jsx("option", {
						value: r,
						children: RESULTADOS_ENVIO[r]
					}, r))
				}) : /* @__PURE__ */ jsx(StatusBadge, {
					tono: TONO[e.resultado],
					children: RESULTADOS_ENVIO[e.resultado]
				})
			},
			{
				clave: "detalle",
				titulo: "Detalle",
				render: (e) => e.detalle ?? e.acuse ?? ""
			}
		]
	});
}
//#endregion
export { HistorialEnvios as t };
