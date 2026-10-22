import { f as vencimiento, i as estadoPlazo, m as fecha, p as desdeIso, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { U as puedeCambiarRuta, V as corregirPerfil, W as puedeRevertirExpropiacion } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.inicio-expropiacion-D7d6Reh5.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Gavel, Undo2 } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.inicio-expropiacion.tsx?tsr-split=component
var datosPerfil = (p) => ({
	condicion: p.condicion,
	ruta: p.ruta,
	inscrito: p.inscrito,
	ocupado: p.ocupado,
	actividad: p.actividad,
	casoEspecial: p.casoEspecial,
	entregaAnticipada: p.entregaAnticipada
});
var sections = [{
	title: "Causal de inicio",
	fields: [
		{
			key: "causal",
			label: "Causal",
			type: "select",
			options: [
				"Rechazo expreso de la oferta",
				"Silencio: venció el plazo de respuesta",
				"Duplicidad de partidas sin acuerdo",
				"Litigio sobre la propiedad"
			],
			required: true
		},
		{
			key: "fechaCausal",
			label: "Fecha del rechazo o del vencimiento",
			type: "date",
			hito: "norma_expropiacion",
			required: true,
			ayuda: "Art. 26: desde esta fecha corren los 10 d.h. para la resolución de ejecución."
		},
		{
			key: "respuesta",
			label: "Plazo de respuesta (4.3)",
			type: "calculado",
			calcular: ({ hitos }) => {
				const e = estadoPlazo(hitos, "respuesta_sujeto_pasivo");
				return e ? `Venció o vence el ${fecha(e.vence)} (art. 20.3)` : "Sin notificación de la carta registrada en 4.3";
			}
		},
		{
			key: "plazoResolucion",
			label: "Plazo para la resolución de ejecución",
			type: "calculado",
			calcular: ({ values }) => {
				const d = desdeIso(values.fechaCausal);
				return d ? `Vence el ${fecha(vencimiento(d, plazo("norma_expropiacion")))} (10 d.h., art. 27)` : "Registre la fecha del rechazo o del vencimiento";
			}
		}
	]
}, {
	title: "Sustento",
	fields: [
		{
			key: "numeroInforme",
			label: "Informe legal que sustenta el inicio",
			required: true
		},
		{
			key: "documentoRechazo",
			label: "Documento del rechazo",
			type: "file",
			accept: ".pdf",
			fullWidth: true
		},
		{
			key: "informeLegal",
			label: "Informe legal",
			type: "file",
			accept: ".pdf,.doc,.docx",
			fullWidth: true
		},
		{
			key: "observaciones",
			label: "Observaciones",
			type: "textarea",
			fullWidth: true
		}
	]
}];
function InicioExpropiacionPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Inicio de expropiación por rechazo o silencio",
		paso: "inicio-expropiacion",
		sections,
		modulo: 16,
		antesDelFormulario: ({ perfil }) => !perfil.leyAutoritativa ? /* @__PURE__ */ jsxs(Aviso, {
			tipo: "error",
			children: [
				"No hay ley autoritativa vigente que alcance al predio (art. 25): sin ella no se puede iniciar la expropiación.",
				" ",
				/* @__PURE__ */ jsx(Link, {
					to: "/proyectos/$projectId/normas-habilitantes",
					params: { projectId },
					className: "font-semibold underline",
					children: "Registrar la ley en Normas habilitantes"
				})
			]
		}) : perfil.ruta === "EXPROPIACION" ? /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "El predio ya está en expropiación. Volver a trato directo exige entrega anticipada (art. 21.8) o al Administrador."
		}) : null,
		transiciones: [{
			texto: "Iniciar expropiación",
			icono: /* @__PURE__ */ jsx(Gavel, {}),
			visible: ({ perfil }) => perfil.ruta !== "EXPROPIACION",
			permitido: ({ rol, perfil }) => !puedeCambiarRuta(rol) ? "Cambian la ruta el Especialista legal, el Coordinador o el Administrador." : !perfil.leyAutoritativa ? "No hay ley autoritativa vigente para el predio (art. 25)." : null,
			exigeMotivo: true,
			confirmacion: "Cambia la ruta del predio a expropiación (art. 26) y habilita la resolución de ejecución.",
			ejecutar: ({ perfil, codigo: c }, motivo) => corregirPerfil(c, datosPerfil(perfil), { ruta: "EXPROPIACION" }, "Inició la expropiación", motivo),
			destino: "expropiacion-procedimiento"
		}, {
			texto: "Volver a trato directo",
			icono: /* @__PURE__ */ jsx(Undo2, {}),
			visible: ({ perfil }) => perfil.ruta === "EXPROPIACION",
			permitido: ({ rol, perfil }) => puedeRevertirExpropiacion(rol, perfil.entregaAnticipada) ? null : "Solo con entrega anticipada (art. 21.8) o por el Administrador.",
			exigeMotivo: true,
			confirmacion: "Devuelve el predio a trato directo (art. 21.8).",
			ejecutar: ({ perfil, codigo: c }, motivo) => corregirPerfil(c, datosPerfil(perfil), { ruta: "TRATO_DIRECTO" }, "Volvió a trato directo", motivo)
		}]
	});
}
//#endregion
export { InicioExpropiacionPage as component };
