import { r as registrarCambio } from "./historial-Bc37nCTn.js";
//#region src/lib/caracterizacion.ts
var LISTAS_INICIALES = {
	matriz: [],
	afectadas: [{
		cod: "KFRE",
		uso: "AFECTADA",
		directa: 150,
		indirecta: 0,
		total: 150,
		fechaPlanoCbc: "FEBRERO 2025",
		codigoPlanoCbc: "PTKT-0001"
	}],
	remanentes: [],
	viviendas: [],
	obras: [],
	instalaciones: [],
	frutales: [],
	forestales: [],
	transitorias: [{
		nombreComun: "MAIZ",
		nombreCientifico: "ZEA MAYS",
		variedad: "CHULPI",
		edadAnos: "15",
		unidadMedida: "M2",
		cantidad: "15",
		utilidad: "1500",
		vupt: "1500",
		observacion: "",
		foto: ""
	}],
	cercoVivo: [{
		nombreCientifico: "ASDASD",
		nombreComun: "ASDASD",
		edadAnos: "23",
		longitudCerco: "123.23",
		distanciamientoPlantas: "123.23",
		estadoFitosanitario: "BUENO",
		observaciones: "NIN",
		foto: ""
	}, {
		nombreCientifico: "ALNUS GLUTINOSA",
		nombreComun: "ALISOS",
		edadAnos: "25",
		longitudCerco: "12",
		distanciamientoPlantas: "12",
		estadoFitosanitario: "REGULAR",
		observaciones: "NIN",
		foto: ""
	}]
};
var DANO_INICIAL = {
	correspondencia: {
		danoEmergente: "SI",
		lucroCesante: "SI"
	},
	identificacion: {
		formaAfectacion: "PARCIAL",
		condicionPredio: "INHABITABLE",
		descripcion: "Si corresponde indemnizar al sujeto pasivo acondicionamiento del área remanente en condiciones similares a las identificadas en la inspección ocular a cargo del sujeto activo..."
	},
	tipoAfectacion: {
		A: "SI",
		B: "SI",
		C: "SI",
		D: "SI",
		E: "NO",
		F: "NO",
		G: "NO",
		H: "NO"
	},
	numeralUno: {}
};
var NOMBRE_LISTA = {
	matriz: "área matriz",
	afectadas: "área afectada",
	remanentes: "área remanente",
	viviendas: "vivienda",
	obras: "obra complementaria",
	instalaciones: "instalación fija permanente",
	frutales: "plantación frutal",
	forestales: "plantación forestal",
	transitorias: "plantación transitoria",
	cercoVivo: "cerco vivo"
};
/** Nombre corto de un registro de lista: sirve de título en el histórico y en el motivo de baja. */
function rotuloFila(fila) {
	const r = fila;
	return String(r.nombreComun || r.descripcion || r.tipo || r.cod || r.nombreCientifico || "registro");
}
/** Copia de las listas con un `nombre` por fila (los repetidos llevan número) para distinguirlas en el histórico. */
function rotular(listas) {
	return Object.fromEntries(Object.keys(listas).map((k) => {
		const vistos = /* @__PURE__ */ new Map();
		return [k, listas[k].map((fila) => {
			const base = rotuloFila(fila);
			const n = (vistos.get(base) ?? 0) + 1;
			vistos.set(base, n);
			return {
				...fila,
				nombre: n > 1 ? `${base} (${n})` : base
			};
		})];
	}));
}
var claveCaracterizacion = (codigo) => `caracterizacion-predio-${codigo}`;
var BITACORA = {
	modulo: 12,
	entidad: "caracterizacion_predio"
};
/** Estado vigente: la última versión guardada o, si no hay, las listas iniciales de la pantalla. */
function leerCaracterizacion(codigo) {
	try {
		const versiones = JSON.parse(localStorage.getItem(`pdgp-historial-${claveCaracterizacion(codigo)}`) ?? "[]");
		if (versiones[0]) return versiones[0].registro;
	} catch {}
	return {
		listas: LISTAS_INICIALES,
		danoEmergente: DANO_INICIAL
	};
}
/** Agrega una fila a una lista y deja la versión ("Agregó vivienda desde campo"). */
function agregarFilaCaracterizacion(codigo, key, fila) {
	const antes = leerCaracterizacion(codigo);
	const listas = {
		...antes.listas,
		[key]: [...antes.listas[key], fila]
	};
	registrarCambio(claveCaracterizacion(codigo), {
		accion: `Agregó ${NOMBRE_LISTA[key]} desde campo`,
		objeto: rotuloFila(fila),
		antes,
		despues: {
			...antes,
			listas: rotular(listas)
		}
	}, BITACORA);
}
/** Guarda el entorno levantado en campo dentro del mismo registro. */
function guardarEntornoCampo(codigo, entorno) {
	const antes = leerCaracterizacion(codigo);
	registrarCambio(claveCaracterizacion(codigo), {
		accion: "Registró el entorno desde campo",
		objeto: entorno.usoEntorno || entorno.acceso || "entorno del predio",
		antes,
		despues: {
			...antes,
			entorno
		}
	}, BITACORA);
}
//#endregion
export { claveCaracterizacion as a, rotular as c, agregarFilaCaracterizacion as i, rotuloFila as l, LISTAS_INICIALES as n, guardarEntornoCampo as o, NOMBRE_LISTA as r, leerCaracterizacion as s, DANO_INICIAL as t };
