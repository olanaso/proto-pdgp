import { _ as registrarEnBitacora } from "./historial-Bc37nCTn.js";
import { useSyncExternalStore } from "react";
//#region src/lib/envios.ts
var RESULTADOS_ENVIO = {
	enviado: "Enviado",
	aceptado: "Aceptado",
	observado: "Observado",
	rechazado: "Rechazado",
	finalizado: "Finalizado"
};
var CLAVE = "pdgp-envios";
var TOPE = 5e3;
var VACIO = [];
var datos = null;
var oyentes = /* @__PURE__ */ new Set();
function cargar() {
	if (datos) return datos;
	try {
		datos = JSON.parse(localStorage.getItem(CLAVE) ?? "[]");
	} catch {
		datos = [];
	}
	return datos;
}
function guardar(nuevo) {
	datos = nuevo.slice(0, TOPE);
	try {
		localStorage.setItem(CLAVE, JSON.stringify(datos));
	} catch {}
	oyentes.forEach((f) => f());
}
function usuarioActual() {
	try {
		return localStorage.getItem("mtc-session") || "usuario sin sesión";
	} catch {
		return "usuario sin sesión";
	}
}
/** Registra un envío y deja su entrada en la bitácora (M8). Devuelve la fila creada. */
function registrarEnvio(e, bitacora) {
	const envio = {
		id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
		fecha: (/* @__PURE__ */ new Date()).toISOString(),
		realizadoPor: e.realizadoPor ?? usuarioActual(),
		resultado: e.resultado ?? "enviado",
		...e
	};
	guardar([envio, ...cargar()]);
	registrarEnBitacora({
		modulo: bitacora.modulo,
		entidad: bitacora.entidad,
		registro: e.predio || e.paso,
		accion: "enviar",
		detalle: `${e.canal} a ${e.destinatario}${e.documento ? `: ${e.documento}` : ""}`
	});
	return envio;
}
/**
* Envíos que nacen de un formulario: cada campo de fecha listado que al guardar pasa de vacío (o de otra
* fecha) a una fecha nueva es un envío. Devuelve lo que falta completar con proyecto, predio y paso.
*/
function registrarEnviosPorFecha(antes, despues, campos) {
	return campos.filter(({ campo }) => despues[campo] && despues[campo] !== antes[campo]).map(({ campo, canal, destinatario, documento }) => ({
		canal,
		destinatario,
		documento,
		detalle: `Fecha registrada: ${despues[campo]}`
	}));
}
/** Cambia el resultado de un envío (aceptado, observado, rechazado, finalizado) con su detalle. */
function actualizarEnvio(id, resultado, detalle) {
	guardar(cargar().map((x) => x.id === id ? {
		...x,
		resultado,
		detalle: detalle ?? x.detalle
	} : x));
}
/** Envíos de un predio y paso (o de una pantalla de módulo), del más nuevo al más antiguo. */
function useEnvios(filtro) {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, cargar, () => VACIO).filter((e) => (filtro.proyecto === void 0 || e.proyecto === filtro.proyecto) && (filtro.predio === void 0 || e.predio === filtro.predio) && (filtro.paso === void 0 || e.paso === filtro.paso));
}
//#endregion
export { useEnvios as a, registrarEnviosPorFecha as i, actualizarEnvio as n, registrarEnvio as r, RESULTADOS_ENVIO as t };
