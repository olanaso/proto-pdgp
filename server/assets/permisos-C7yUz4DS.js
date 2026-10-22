import { _ as registrarEnBitacora, l as MODULOS, u as ROLES$1 } from "./historial-Bc37nCTn.js";
import { useSyncExternalStore } from "react";
//#region src/lib/permisos.ts
/**
* Permisos por rol y módulo, derivados de `modulos.ts`: quien figura en `editan` tiene todas las
* acciones; los demás leen e imprimen; el supervisor además supervisa (aprueba transiciones).
* La matriz de M8 parte de estos valores y guarda los cambios en localStorage.
* ponytail: con backend, la matriz vive en la base de datos y este módulo solo la consulta.
*/
var ACCIONES = [
	"Lectura",
	"Edición",
	"Eliminación",
	"Impresión",
	"Supervisión"
];
var ROLES = [
	"ADMIN",
	"COORDINADOR",
	"ESP_TECNICO",
	"ESP_LEGAL",
	"BRIGADISTA",
	"GESTOR_SOCIAL",
	"TESORERIA",
	"CUSTODIA",
	"SUPERVISOR"
];
var CLAVE_MATRIZ = "pdgp-permisos";
var CLAVE_ROL = "pdgp-rol";
var ROL_EVENTO = "pdgp:rol";
/**
* Módulos que cada rol ve en el portal (lectura). Sin entrada = todos. El administrador ajusta la
* matriz en Seguridad y configuración; esto es solo el punto de partida.
*/
var VE = {
	ESP_TECNICO: [
		11,
		12,
		14,
		15,
		16,
		17,
		21,
		18,
		19,
		20,
		30
	],
	ESP_LEGAL: [
		11,
		12,
		13,
		15,
		16,
		17,
		21,
		18,
		19,
		20,
		24,
		30
	],
	BRIGADISTA: [
		11,
		12,
		25,
		29,
		30
	],
	GESTOR_SOCIAL: [
		11,
		12,
		15,
		25,
		27,
		30
	],
	TESORERIA: [
		18,
		19,
		26
	],
	CUSTODIA: [
		20,
		22,
		24
	]
};
function matrizPorDefecto() {
	const m = {};
	for (const rol of ROLES) {
		m[rol] = {};
		for (const mod of MODULOS) {
			const edita = rol === "ADMIN" || mod.editan.includes(rol);
			const oculto = VE[rol] ? !VE[rol].includes(mod.numero) : false;
			m[rol][mod.numero] = {
				Lectura: !oculto,
				Edición: edita,
				Eliminación: edita && rol !== "BRIGADISTA",
				Impresión: !oculto,
				Supervisión: rol === "ADMIN" || rol === "SUPERVISOR"
			};
		}
	}
	return m;
}
function leerMatriz() {
	const base = matrizPorDefecto();
	try {
		const guardada = JSON.parse(localStorage.getItem(CLAVE_MATRIZ) ?? "null");
		if (!guardada) return base;
		for (const rol of ROLES) base[rol] = {
			...base[rol],
			...guardada[rol] ?? {}
		};
		return base;
	} catch {
		return base;
	}
}
function guardarMatriz(m) {
	try {
		localStorage.setItem(CLAVE_MATRIZ, JSON.stringify(m));
	} catch {}
}
function restablecerMatriz() {
	try {
		localStorage.removeItem(CLAVE_MATRIZ);
	} catch {}
	return matrizPorDefecto();
}
function tienePermiso(rol, modulo, accion, matriz = leerMatriz()) {
	return matriz[rol]?.[modulo]?.[accion] ?? false;
}
/** Códigos de rol del catálogo de M8 → perfil del sistema. Los que no tienen perfil propio devuelven undefined. */
var CODIGO_A_ROL = {
	"ROL-ADM-SIS": "ADMIN",
	"ROL-ESP-TEC": "ESP_TECNICO",
	"ROL-ESP-LEG": "ESP_LEGAL",
	"ROL-REV-LEG": "ESP_LEGAL",
	"ROL-RESP-PRE": "COORDINADOR",
	"ROL-COOR": "COORDINADOR",
	"ROL-SUP": "SUPERVISOR",
	"ROL-ANAL": "SUPERVISOR",
	"ROL-BRI": "BRIGADISTA",
	"ROL-DIG": "BRIGADISTA"
};
function rolDesdeCodigo(codigo) {
	if (ROLES.includes(codigo)) return codigo;
	return CODIGO_A_ROL[codigo];
}
var ROLES_SISTEMA = ROLES;
/** Rol de la sesión de demostración. Mientras no haya autenticación real se elige en la barra superior. */
var rolActual = "ADMIN";
var rolLeido = false;
var oyentes = /* @__PURE__ */ new Set();
function leerRol() {
	if (rolLeido) return;
	rolLeido = true;
	try {
		const r = localStorage.getItem(CLAVE_ROL);
		if (r && ROLES.includes(r)) rolActual = r;
	} catch {}
}
function cambiarRol(rol) {
	if (rol === rolActual) return;
	registrarEnBitacora({
		modulo: 8,
		entidad: "perfil",
		registro: rol,
		accion: "editar",
		detalle: `Perfil activo: ${ROLES$1[rol]}`,
		antes: { perfil: rolActual },
		despues: { perfil: rol }
	});
	rolActual = rol;
	try {
		localStorage.setItem(CLAVE_ROL, rol);
	} catch {}
	oyentes.forEach((f) => f());
	window.dispatchEvent(new CustomEvent(ROL_EVENTO, { detail: rol }));
}
function useRol() {
	return useSyncExternalStore((f) => {
		const antes = rolActual;
		leerRol();
		oyentes.add(f);
		if (antes !== rolActual) queueMicrotask(f);
		return () => oyentes.delete(f);
	}, () => rolActual, () => "ADMIN");
}
//#endregion
export { leerMatriz as a, rolDesdeCodigo as c, guardarMatriz as i, tienePermiso as l, ROLES_SISTEMA as n, matrizPorDefecto as o, cambiarRol as r, restablecerMatriz as s, ACCIONES as t, useRol as u };
