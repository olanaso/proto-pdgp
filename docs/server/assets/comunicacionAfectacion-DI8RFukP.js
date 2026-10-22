import { r as registrarCambio } from "./historial-Bc37nCTn.js";
//#region src/lib/comunicacionAfectacion.ts
var MEDIOS = [
	"Correo electrónico",
	"WhatsApp",
	"Entrega física",
	"Bajo puerta",
	"Notificación notarial",
	"Otro"
];
var claveComunicacion = (codigo) => `comunicacion-afectacion-${codigo}`;
var hoy = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
/** Ficha inicial, la misma con que abre la pantalla de escritorio. */
function registroComunicacionInicial(responsable) {
	return {
		form: {
			numeroDocumento: "",
			tipoDocumento: "Carta",
			fechaIdentificacion: "",
			fechaEmision: hoy(),
			asunto: "Comunicación de afectación del predio para liberación predial",
			sustento: "Se comunica la afectación del predio en el marco de las actividades de gestión predial del proyecto, solicitando la atención y respuesta del sujeto pasivo.",
			correoRegistrado: "",
			correoManual: "",
			whatsappRegistrado: "",
			whatsappManual: "",
			responsable
		},
		resultado: {
			comunicacionEfectiva: "PENDIENTE",
			aceptacion: "PENDIENTE",
			fechaRespuesta: hoy(),
			observacion: ""
		},
		comunicaciones: []
	};
}
/** Estado vigente: la última versión guardada o la ficha inicial. */
function leerComunicacion(codigo, responsable) {
	try {
		const versiones = JSON.parse(localStorage.getItem(`pdgp-historial-${claveComunicacion(codigo)}`) ?? "[]");
		if (versiones[0]) return versiones[0].registro;
	} catch {}
	return registroComunicacionInicial(responsable);
}
var TEXTO_EFECTIVA = {
	SI: "Comunicación efectiva",
	NO: "No efectiva",
	PENDIENTE: "Pendiente"
};
/**
* Registra una comunicación hecha en campo con su resultado, como la pantalla de escritorio: la comunicación
* queda primera en la lista y el resultado se escribe en ella y en la ficha. Devuelve el número.
*/
function registrarComunicacionCampo(codigo, responsable, c, resultado) {
	const antes = leerComunicacion(codigo, responsable);
	const texto = `${TEXTO_EFECTIVA[resultado.comunicacionEfectiva] ?? resultado.comunicacionEfectiva} · aceptación ${resultado.aceptacion.toLowerCase()}`;
	const comunicaciones = [{
		...c,
		id: `com-${Date.now().toString(36)}`,
		registradoEl: (/* @__PURE__ */ new Date()).toISOString(),
		resultado: texto,
		estado: "vigente"
	}, ...antes.comunicaciones ?? []];
	registrarCambio(claveComunicacion(codigo), {
		accion: "Registró comunicación desde campo",
		objeto: `comunicación N.° ${comunicaciones.length} por ${c.medio.toLowerCase()} a ${c.destinatario}`,
		antes,
		despues: {
			...antes,
			resultado,
			comunicaciones
		}
	}, {
		modulo: 15,
		entidad: "comunicacion_afectacion"
	});
	return comunicaciones.length;
}
//#endregion
export { leerComunicacion as n, registrarComunicacionCampo as r, MEDIOS as t };
