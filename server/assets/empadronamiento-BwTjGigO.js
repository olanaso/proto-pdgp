import { r as registrarCambio } from "./historial-Bc37nCTn.js";
//#region src/lib/empadronamiento.ts
var initialForm = {
	conEmpadronamiento: false,
	/** Brigada o persona que hizo el empadronamiento en campo. */
	realizadoPor: "",
	fechaInicio: "",
	fechaFin: "",
	ocupante: "",
	documentoOcupante: "",
	condicionOcupante: "",
	caracteristicasPredio: "",
	edificaciones: "",
	mejoras: "",
	observaciones: ""
};
var nuevoId = () => `emp-${Date.now().toString(36)}`;
var claveEmpadronamiento = (codigo) => `empadronamiento-${codigo}`;
/** Estado vigente: la última versión guardada o el formulario vacío. */
function leerEmpadronamiento(codigo) {
	try {
		const versiones = JSON.parse(localStorage.getItem(`pdgp-historial-${claveEmpadronamiento(codigo)}`) ?? "[]");
		if (versiones[0]) return versiones[0].registro;
	} catch {}
	return {
		form: initialForm,
		realizaciones: []
	};
}
/**
* Registra un empadronamiento realizado (con su acta ya generada) como lo hace la pantalla de escritorio:
* queda primero en la lista y el formulario en curso vuelve a vacío. Devuelve el número de empadronamiento.
*/
function registrarRealizacion(codigo, r, accion) {
	const antes = leerEmpadronamiento(codigo);
	const realizaciones = [r, ...antes.realizaciones ?? []];
	registrarCambio(claveEmpadronamiento(codigo), {
		accion,
		objeto: `del ${r.form.fechaInicio}, realizado por ${r.form.realizadoPor}`,
		antes,
		despues: {
			form: initialForm,
			borradorId: nuevoId(),
			realizaciones
		}
	}, {
		modulo: 11,
		entidad: "empadronamiento_inspeccion_campo"
	});
	return realizaciones.length;
}
//#endregion
export { registrarRealizacion as i, leerEmpadronamiento as n, nuevoId as r, initialForm as t };
