import { a as leerHitos, n as getProyecto, t as almacenArchivos } from "./archivosIdb-BbjJAFd8.js";
import { a as prediosDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { _ as registrarEnBitacora, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { n as actualizarEnvio, r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { useEffect, useState, useSyncExternalStore } from "react";
//#region src/lib/metas.ts
/**
* Metas físicas (predios a liberar) y financieras (S/ a ejecutar) de un proyecto por ejercicio (M26). El
* Coordinador las registra en «Metas del proyecto» y pide su aprobación a Presupuesto; Presupuesto las
* aprueba u observa en Gestión presupuestal. Las metas se versionan en `metas-{proyecto}-{ejercicio}`.
* ponytail: localStorage; con backend, tabla de metas y flujo de aprobación con firma.
*/
var MESES = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Setiembre",
	"Octubre",
	"Noviembre",
	"Diciembre"
];
var ETIQUETAS_METAS = {
	fisica: "Metas físicas",
	financiera: "Metas financieras",
	programada: "Meta programada",
	reprogramada: "Meta reprogramada",
	fechaReprog: "Fecha de reprogramación",
	usuarioReprog: "Usuario de reprogramación",
	cumplida: "Meta cumplida"
};
var BITACORA_METAS = {
	modulo: 26,
	entidad: "meta_presupuestal"
};
/** Un mes se identifica por su nombre en el histórico; al cargar o restaurar se quita. */
var limpiarMetas = (l) => l.map(({ nombre: _nombre, ...m }) => m);
var conNombre = (r) => ({
	fisica: r.fisica.map((m) => ({
		...m,
		nombre: m.mes
	})),
	financiera: r.financiera.map((m) => ({
		...m,
		nombre: m.mes
	}))
});
/** Primer ejercicio del proyecto (demostración: sale del código). */
function ejercicioInicial(codigo) {
	return 2020 + parseInt(codigo.replace(/\D/g, "") || "1", 10) % 5;
}
/** Ejercicios del proyecto, del más reciente al primero. */
function ejerciciosDesde(inicio) {
	const out = [];
	for (let y = 2026; y >= inicio; y--) out.push(y);
	return out;
}
function ultimoDiaDelMes(year, monthIndex) {
	return String(new Date(year, monthIndex + 1, 0).getDate()).padStart(2, "0");
}
/** Metas de demostración cuando el proyecto aún no registra las suyas. */
function metasDemostracion(kind, year) {
	return MESES.map((mes, i) => {
		const base = kind === "fisica" ? 10 + (i * 7 + year) % 60 : 5e4 + (i * 13e3 + year * 100) % 4e5;
		if (year === 2026) {
			if (i < 6) {
				const reprog = Math.max(1, base + (i % 2 === 0 ? -1 : 1) * ((i + 2) % 5));
				return {
					mes,
					programada: base,
					reprogramada: reprog,
					fechaReprog: `${ultimoDiaDelMes(year, i)}/${String(i + 1).padStart(2, "0")}/${year}`,
					usuarioReprog: "Jean Ascencios",
					cumplida: Math.round(reprog * (.75 + i % 3 * .05))
				};
			}
			return {
				mes,
				programada: base,
				reprogramada: 0,
				fechaReprog: "",
				usuarioReprog: "",
				cumplida: 0
			};
		}
		return {
			mes,
			programada: base,
			reprogramada: base,
			fechaReprog: `${ultimoDiaDelMes(year, i)}/${String(i + 1).padStart(2, "0")}/${year}`,
			usuarioReprog: "Jean Ascencios",
			cumplida: Math.round(base * .7)
		};
	});
}
var claveMetas = (proyecto, ejercicio) => `metas-${proyecto}-${ejercicio}`;
/** Metas vigentes: la última versión guardada o las de demostración. */
function leerMetas(proyecto, ejercicio) {
	try {
		const v = JSON.parse(localStorage.getItem(`pdgp-historial-${claveMetas(proyecto, ejercicio)}`) ?? "[]");
		if (v[0]) return {
			fisica: limpiarMetas(v[0].registro.fisica),
			financiera: limpiarMetas(v[0].registro.financiera)
		};
	} catch {}
	return {
		fisica: metasDemostracion("fisica", ejercicio),
		financiera: metasDemostracion("financiera", ejercicio)
	};
}
/** Guarda las metas con su versión en el histórico. */
function guardarMetas(proyecto, ejercicio, metas, accion, objeto, motivo) {
	registrarCambio(claveMetas(proyecto, ejercicio), {
		accion,
		objeto,
		motivo,
		antes: conNombre(leerMetas(proyecto, ejercicio)),
		despues: conNombre(metas)
	}, BITACORA_METAS);
}
var NOMBRE_ESTADO_METAS = {
	BORRADOR: "Borrador",
	EN_APROBACION: "En aprobación",
	APROBADA: "Aprobadas",
	OBSERVADA: "Observadas"
};
/** Quién registra las metas del proyecto y quién las aprueba. */
var puedeRegistrarMetas = (rol) => rol === "COORDINADOR" || rol === "ADMIN";
var puedeAprobarMetas = (rol) => rol === "TESORERIA" || rol === "ADMIN";
var CLAVE = "pdgp-metas-aprobacion";
var VACIO$1 = {};
var datos = null;
var oyentes$1 = /* @__PURE__ */ new Set();
var id = (proyecto, ejercicio) => `${proyecto}-${ejercicio}`;
function cargar() {
	if (datos) return datos;
	try {
		datos = JSON.parse(localStorage.getItem(CLAVE) ?? "{}");
	} catch {
		datos = {};
	}
	return datos;
}
function poner(a) {
	datos = {
		...cargar(),
		[id(a.proyecto, a.ejercicio)]: a
	};
	try {
		localStorage.setItem(CLAVE, JSON.stringify(datos));
	} catch {}
	oyentes$1.forEach((f) => f());
}
function useAprobacionesMetas() {
	return useSyncExternalStore((f) => {
		oyentes$1.add(f);
		return () => {
			oyentes$1.delete(f);
		};
	}, cargar, () => VACIO$1);
}
var aprobacionDe = (todas, proyecto, ejercicio) => todas[id(proyecto, ejercicio)] ?? {
	proyecto,
	ejercicio,
	estado: "BORRADOR"
};
var sumar = (l) => l.reduce((a, m) => a + m.programada, 0);
/** El Coordinador pide a Presupuesto que apruebe las metas del ejercicio (queda como envío). */
function solicitarAprobacionMetas(proyecto, nombreProyecto, ejercicio, metas, quien) {
	guardarMetas(proyecto, ejercicio, metas, "Solicitó la aprobación de las metas", `ejercicio ${ejercicio}`);
	const envio = registrarEnvio({
		proyecto,
		predio: "",
		paso: "metas-proyecto",
		canal: "Solicitud de aprobación de metas",
		destinatario: "Tesorería / Presupuesto",
		documento: `Metas ${ejercicio} de ${nombreProyecto}`,
		detalle: `${sumar(metas.fisica)} predios a liberar · S/ ${sumar(metas.financiera).toLocaleString("es-PE")} a ejecutar`
	}, BITACORA_METAS);
	poner({
		proyecto,
		ejercicio,
		estado: "EN_APROBACION",
		solicitadoEl: (/* @__PURE__ */ new Date()).toISOString(),
		solicitadoPor: quien,
		envioId: envio.id
	});
}
/** Presupuesto aprueba u observa (con motivo) las metas pedidas. */
function decidirMetas(proyecto, ejercicio, decision, quien, motivo = "") {
	const actual = aprobacionDe(cargar(), proyecto, ejercicio);
	guardarMetas(proyecto, ejercicio, leerMetas(proyecto, ejercicio), decision === "APROBADA" ? "Aprobó las metas" : "Observó las metas", `ejercicio ${ejercicio}`, motivo || void 0);
	if (actual.envioId) actualizarEnvio(actual.envioId, decision === "APROBADA" ? "aceptado" : "observado", motivo || void 0);
	poner({
		...actual,
		estado: decision,
		decididoEl: (/* @__PURE__ */ new Date()).toISOString(),
		decididoPor: quien,
		motivo
	});
}
var totalProgramado = sumar;
//#endregion
//#region src/lib/siaf.ts
/**
* Conexión de las metas del proyecto con el SIAF (docs/PLAN-SIAF-METAS.md). Tres piezas:
* 1. El vínculo: lo que identifica al proyecto en el SIAF (pliego, UE, CUI, metas presupuestarias,
*    específicas de gasto), por proyecto y año, versionado en `vinculo-siaf-{proyecto}-{año}`.
* 2. La carga: el CSV de datos abiertos del MEF (Consulta Amigable) o la exportación del SIAF-SP de la
*    UE se leen en el navegador, se filtran por el vínculo y se guardan en IndexedDB (`pdgp-siaf`).
* 3. La conciliación: metas del Coordinador contra PIM, devengado y girado; meta física contra el padrón.
* ponytail: todo en el navegador y por archivo; con backend, una tarea diaria descarga y filtra el CSV y
* el SIAF-RP reemplaza la exportación.
*/
var PLIEGO_MTC = {
	codigo: "036",
	nombre: "Ministerio de Transportes y Comunicaciones"
};
var UNIDADES_EJECUTORAS = [
	{
		codigo: "001",
		nombre: "Administración General"
	},
	{
		codigo: "007",
		nombre: "Provías Nacional"
	},
	{
		codigo: "010",
		nombre: "Provías Descentralizado"
	}
];
/** Específicas del clasificador de gastos donde la DDP registra lo predial (Anexo 2, versión 2022). */
var ESPECIFICAS_PREDIALES = [
	{
		codigo: "2.6.5.1.1.1",
		nombre: "Terrenos urbanos (incluye expropiaciones)"
	},
	{
		codigo: "2.6.5.1.1.2",
		nombre: "Terrenos rurales (incluye expropiaciones)"
	},
	{
		codigo: "2.6.5.1.1.3",
		nombre: "Terrenos eriazos (incluye expropiaciones)"
	},
	{
		codigo: "2.6.8.1.4.3",
		nombre: "Contratación de servicios (tasación, saneamiento, notaría)"
	},
	{
		codigo: "2.6.8.1.4.4",
		nombre: "Laudos arbitrales o sentencias vinculadas a inversiones"
	}
];
var FUENTES = [
	{
		codigo: "1",
		nombre: "Recursos ordinarios",
		rubro: "00"
	},
	{
		codigo: "2",
		nombre: "Recursos directamente recaudados",
		rubro: "09"
	},
	{
		codigo: "3",
		nombre: "Recursos por operaciones oficiales de crédito",
		rubro: "19"
	},
	{
		codigo: "4",
		nombre: "Donaciones y transferencias",
		rubro: "13"
	},
	{
		codigo: "5",
		nombre: "Recursos determinados",
		rubro: "18"
	}
];
var UNIDADES_MEDIDA = [
	"PREDIO",
	"INMUEBLE",
	"HECTÁREA",
	"EXPEDIENTE",
	"INFORME"
];
var NOMBRE_ESTADO_VINCULO = {
	SIN_VINCULO: "Sin vínculo",
	VINCULADO: "Vinculado",
	OBSERVADO: "Observado"
};
var metaVacia = () => ({
	numero: "",
	finalidad: "",
	secFunc: "",
	unidadMedida: "PREDIO",
	cantidadAnual: 0,
	fuente: "1",
	rubro: "00"
});
var vinculoVacio = (proyecto, anio) => ({
	proyecto,
	anio,
	pliego: PLIEGO_MTC.codigo,
	unidadEjecutora: "001",
	categoriaPresupuestal: "",
	cuis: [],
	metas: [],
	especificas: ESPECIFICAS_PREDIALES.map((e) => e.codigo),
	ceplan: {
		oei: "",
		aei: "",
		aoi: ""
	},
	fuenteDatos: "datos-abiertos",
	observacion: ""
});
/**
* Vínculos de demostración de los proyectos sembrados (los CUI y metas de la configuración SIAF-CEPLAN).
* ponytail: con backend, el vínculo nace vacío y lo completa el Coordinador con la OGPP.
*/
var SEMILLA = {
	iquitos: {
		categoriaPresupuestal: "9002 · Asignaciones presupuestarias que no resultan en productos",
		cuis: [{
			cui: "2491435",
			nombre: "Mejoramiento del Aeropuerto Internacional de Iquitos",
			acciones: ["Adquisición y liberación de áreas"]
		}],
		metas: [{
			numero: "0045",
			finalidad: "Adquisición y liberación de áreas del aeropuerto",
			secFunc: "0123",
			unidadMedida: "PREDIO",
			cantidadAnual: 430,
			fuente: "1",
			rubro: "00"
		}],
		ceplan: {
			oei: "OEI.05",
			aei: "AEI.05.02",
			aoi: "AOI00003600412"
		}
	},
	jauja: {
		categoriaPresupuestal: "9002 · Asignaciones presupuestarias que no resultan en productos",
		cuis: [{
			cui: "2233850",
			nombre: "Mejoramiento del Aeropuerto Francisco Carlé de Jauja",
			acciones: ["Adquisición y liberación de áreas"]
		}],
		metas: [{
			numero: "0061",
			finalidad: "Adquisición y liberación de áreas del aeropuerto",
			secFunc: "0187",
			unidadMedida: "PREDIO",
			cantidadAnual: 290,
			fuente: "1",
			rubro: "00"
		}],
		ceplan: {
			oei: "OEI.05",
			aei: "AEI.05.02",
			aoi: "AOI00003600415"
		}
	}
};
var claveVinculo = (proyecto, anio) => `vinculo-siaf-${proyecto}-${anio}`;
var BITACORA = {
	modulo: 26,
	entidad: "vinculo_siaf"
};
function ultimaVersion(clave) {
	try {
		return JSON.parse(localStorage.getItem(`pdgp-historial-${clave}`) ?? "[]")[0]?.registro;
	} catch {
		return;
	}
}
/** Vínculo vigente del proyecto y año: lo guardado o la semilla de demostración. */
function leerVinculo(proyecto, anio) {
	return ultimaVersion(claveVinculo(proyecto, anio)) ?? {
		...vinculoVacio(proyecto, anio),
		...SEMILLA[proyecto] ?? {}
	};
}
function useVinculo(proyecto, anio) {
	const versiones = useHistorial(claveVinculo(proyecto, anio));
	const [semilla, setSemilla] = useState(() => vinculoVacio(proyecto, anio));
	useEffect(() => setSemilla({
		...vinculoVacio(proyecto, anio),
		...SEMILLA[proyecto] ?? {}
	}), [proyecto, anio]);
	return versiones[0]?.registro ?? semilla;
}
/** Qué le falta al vínculo para servir. Vacío = válido. */
function validarVinculo(v) {
	const e = [];
	if (!/^\d{3}$/.test(v.unidadEjecutora)) e.push("La unidad ejecutora tiene 3 dígitos.");
	if (!v.cuis.length) e.push("Registre al menos un CUI.");
	v.cuis.forEach((c, i) => {
		if (!/^\d{7}$/.test(c.cui)) e.push(`El CUI ${i + 1} debe tener 7 dígitos.`);
	});
	if (!v.metas.length) e.push("Registre al menos una meta presupuestaria.");
	v.metas.forEach((m, i) => {
		if (!/^\d{4}$/.test(m.numero)) e.push(`La meta ${i + 1} debe tener 4 dígitos.`);
		if (m.secFunc && !/^\d{4}$/.test(m.secFunc)) e.push(`La secuencia funcional de la meta ${i + 1} tiene 4 dígitos.`);
		if (!m.finalidad.trim()) e.push(`Escriba la finalidad de la meta ${i + 1}.`);
		if (!(m.cantidadAnual > 0)) e.push(`La cantidad anual de la meta ${i + 1} debe ser mayor que 0.`);
	});
	if (!v.especificas.length) e.push("Elija al menos una específica de gasto a seguir.");
	const numeros = v.metas.map((m) => m.numero);
	if (new Set(numeros).size !== numeros.length) e.push("Hay metas con el mismo número.");
	return e;
}
var estadoVinculo = (v) => v.observacion.trim() ? "OBSERVADO" : validarVinculo(v).length === 0 ? "VINCULADO" : "SIN_VINCULO";
function guardarVinculo(v, accion, motivo) {
	registrarCambio(claveVinculo(v.proyecto, v.anio), {
		accion,
		objeto: `${v.proyecto} ${v.anio}`,
		motivo,
		antes: leerVinculo(v.proyecto, v.anio),
		despues: v
	}, BITACORA);
}
/** Quién edita el vínculo: Coordinador y Administrador; Presupuesto lo valida u observa. */
var puedeEditarVinculo = (rol) => rol === "COORDINADOR" || rol === "ADMIN";
var puedeValidarVinculo = (rol) => rol === "TESORERIA" || rol === "ADMIN";
/** Quién carga archivos del SIAF: quien edita el vínculo y Presupuesto. */
var puedeCargarSiaf = (rol) => puedeEditarVinculo(rol) || puedeValidarVinculo(rol);
/** Suma de la cantidad física anual de las metas vinculadas. */
var cantidadFisicaVinculada = (v) => v.metas.reduce((n, m) => n + (m.cantidadAnual || 0), 0);
var claveAvance12B = (proyecto, anio) => `avance-12b-${proyecto}-${anio}`;
function useAvance12B(proyecto, anio) {
	return useHistorial(claveAvance12B(proyecto, anio))[0]?.registro;
}
function guardarAvance12B(proyecto, anio, a) {
	registrarCambio(claveAvance12B(proyecto, anio), {
		accion: "Anotó el avance físico del Formato 12-B",
		objeto: `${proyecto} ${anio} · ${MESES[a.mes - 1]}`,
		antes: ultimaVersion(claveAvance12B(proyecto, anio)) ?? {
			porcentaje: 0,
			mes: 0,
			fuente: ""
		},
		despues: a
	}, {
		modulo: 26,
		entidad: "avance_12b"
	});
}
/** Separa un CSV (coma o punto y coma, comillas dobles) en cabecera y filas. */
function parsearCsv(texto) {
	const lineas = (texto.charCodeAt(0) === 65279 ? texto.slice(1) : texto).split(/\r?\n/);
	const primera = lineas.find((l) => l.trim()) ?? "";
	const sep = (primera.match(/;/g)?.length ?? 0) > (primera.match(/,/g)?.length ?? 0) ? ";" : ",";
	const partir = (l) => {
		const out = [];
		let actual = "";
		let entreComillas = false;
		for (let i = 0; i < l.length; i++) {
			const c = l[i];
			if (c === "\"") if (entreComillas && l[i + 1] === "\"") {
				actual += "\"";
				i++;
			} else entreComillas = !entreComillas;
			else if (c === sep && !entreComillas) {
				out.push(actual);
				actual = "";
			} else actual += c;
		}
		out.push(actual);
		return out.map((x) => x.trim());
	};
	const [cab, ...resto] = lineas.filter((l) => l.trim());
	return {
		cabecera: partir(cab ?? "").map((h) => h.toUpperCase()),
		filas: resto.map(partir)
	};
}
var NOMBRE_FORMATO = {
	"datos-abiertos": "Datos abiertos del MEF",
	"export-siaf": "Exportación SIAF-SP"
};
/** Reconoce el archivo por sus columnas. */
function detectarFormato(cabecera) {
	const tiene = (c) => cabecera.includes(c);
	if (tiene("SEC_FUNC") && tiene("MONTO_PIM")) return "datos-abiertos";
	if (tiene("EXPEDIENTE") && tiene("FASE") && tiene("MONTO")) return "export-siaf";
	return null;
}
/** Columnas que se esperan en cada formato (para la ayuda en pantalla y el archivo de ejemplo). */
var COLUMNAS_DATOS_ABIERTOS = [
	"ANO_EJE",
	"MES_EJE",
	"NIVEL_GOBIERNO",
	"SECTOR",
	"PLIEGO",
	"PLIEGO_NOMBRE",
	"SEC_EJEC",
	"EJECUTORA",
	"EJECUTORA_NOMBRE",
	"PROGRAMA_PPTO",
	"TIPO_ACT_PROY",
	"PRODUCTO_PROYECTO",
	"PRODUCTO_PROYECTO_NOMBRE",
	"ACTIVIDAD_ACCION_OBRA",
	"ACTIVIDAD_ACCION_OBRA_NOMBRE",
	"FUNCION",
	"DIVISION_FUNCIONAL",
	"GRUPO_FUNCIONAL",
	"META",
	"FINALIDAD",
	"META_NOMBRE",
	"SEC_FUNC",
	"FUENTE_FINANC",
	"RUBRO",
	"TIPO_TRANSACCION",
	"GENERICA",
	"SUBGENERICA",
	"SUBGENERICA_DET",
	"ESPECIFICA",
	"ESPECIFICA_DET",
	"ESPECIFICA_DET_NOMBRE",
	"MONTO_PIA",
	"MONTO_MODIFICACIONES",
	"MONTO_PIM",
	"MONTO_CERTIFICADO",
	"MONTO_COMPROMETIDO_ANUAL",
	"MONTO_COMPROMETIDO",
	"MONTO_DEVENGADO",
	"MONTO_GIRADO"
];
var COLUMNAS_EXPORT_SIAF = [
	"ANO_EJE",
	"EJECUTORA",
	"EXPEDIENTE",
	"CICLO",
	"FASE",
	"SECUENCIA",
	"FECHA",
	"TIPO_DOCUMENTO",
	"NUMERO_DOCUMENTO",
	"BENEFICIARIO_DOC",
	"BENEFICIARIO",
	"META",
	"ESPECIFICA_DET",
	"FUENTE_FINANC",
	"MONTO",
	"ESTADO"
];
var numero = (v) => {
	if (!v) return 0;
	const limpio = v.includes(",") && v.includes(".") ? v.replace(/,/g, "") : v.replace(",", ".");
	const n = Number(limpio.replace(/[^\d.-]/g, ""));
	return Number.isFinite(n) ? n : 0;
};
/** Normaliza "2.6.5.1.1.1", "2.6.5.1.1 1" o "26 51 11" al formato con puntos. */
var normalizarEspecifica = (v) => {
	const d = v.replace(/\D/g, "");
	return d.length >= 6 ? `${d[0]}.${d[1]}.${d[2]}.${d[3]}.${d[4]}.${d.slice(5)}` : v.trim();
};
var NOMBRE_FASE = {
	C: "Compromiso",
	CA: "Compromiso anual",
	D: "Devengado",
	G: "Girado",
	P: "Pagado"
};
/**
* Lee las filas ya separadas y se queda con las del vínculo: mismo pliego y UE, CUI del vínculo o meta
* del vínculo (por número o secuencia funcional), y específicas elegidas. Lo demás se descarta y se cuenta.
*/
function leerArchivo(cabecera, filas, v) {
	const formato = detectarFormato(cabecera);
	if (!formato) return { error: "No se reconoce el archivo: se esperan las columnas de datos abiertos del MEF (SEC_FUNC, MONTO_PIM…) o de la exportación del SIAF-SP (EXPEDIENTE, FASE, MONTO)." };
	const col = (fila, nombre) => fila[cabecera.indexOf(nombre)] ?? "";
	const cuis = new Set(v.cuis.map((c) => c.cui));
	const metas = new Set(v.metas.map((m) => m.numero));
	const secs = new Set(v.metas.map((m) => m.secFunc).filter(Boolean));
	const especificas = new Set(v.especificas);
	const observaciones = [];
	let descartadas = 0;
	const meses = /* @__PURE__ */ new Set();
	const metasVistas = /* @__PURE__ */ new Set();
	const cuisVistos = /* @__PURE__ */ new Set();
	if (formato === "datos-abiertos") {
		const ejecucion = [];
		for (const f of filas) {
			const pliego = col(f, "PLIEGO").padStart(3, "0");
			const ue = col(f, "EJECUTORA").padStart(3, "0");
			const cui = col(f, "PRODUCTO_PROYECTO");
			const meta = col(f, "META").padStart(4, "0");
			const secFunc = col(f, "SEC_FUNC").padStart(4, "0");
			const esp = normalizarEspecifica(col(f, "ESPECIFICA_DET"));
			const anio = Number(col(f, "ANO_EJE")) || v.anio;
			if (pliego !== v.pliego || ue !== v.unidadEjecutora || anio !== v.anio) {
				descartadas++;
				continue;
			}
			if (!(cuis.has(cui) || metas.has(meta) || secs.has(secFunc)) || !especificas.has(esp)) {
				descartadas++;
				continue;
			}
			const mes = Number(col(f, "MES_EJE")) || 0;
			meses.add(mes);
			metasVistas.add(meta);
			if (cui) cuisVistos.add(cui);
			ejecucion.push({
				anio,
				mes,
				pliego,
				ue,
				cui,
				actividad: col(f, "ACTIVIDAD_ACCION_OBRA_NOMBRE") || col(f, "ACTIVIDAD_ACCION_OBRA"),
				secFunc,
				meta,
				finalidad: col(f, "META_NOMBRE") || col(f, "FINALIDAD"),
				especificaDet: esp,
				fuente: col(f, "FUENTE_FINANC"),
				rubro: col(f, "RUBRO"),
				pia: numero(col(f, "MONTO_PIA")),
				modificaciones: numero(col(f, "MONTO_MODIFICACIONES")),
				pim: numero(col(f, "MONTO_PIM")),
				certificado: numero(col(f, "MONTO_CERTIFICADO")),
				compromisoAnual: numero(col(f, "MONTO_COMPROMETIDO_ANUAL")),
				compromisoMensual: numero(col(f, "MONTO_COMPROMETIDO")),
				devengado: numero(col(f, "MONTO_DEVENGADO")),
				girado: numero(col(f, "MONTO_GIRADO"))
			});
		}
		v.metas.forEach((m) => {
			if (!metasVistas.has(m.numero)) observaciones.push(`La meta ${m.numero} del vínculo no tiene filas en el archivo.`);
		});
		v.cuis.forEach((c) => {
			if (!cuisVistos.has(c.cui) && !ejecucion.length) observaciones.push(`El CUI ${c.cui} del vínculo no aparece en el archivo.`);
		});
		ejecucion.forEach((e) => {
			if (e.devengado > e.pim && e.pim > 0) observaciones.push(`Mes ${e.mes}, meta ${e.meta}, ${e.especificaDet}: el devengado supera al PIM.`);
			if ([
				e.pia,
				e.pim,
				e.devengado,
				e.girado
			].some((n) => n < 0)) observaciones.push(`Mes ${e.mes}, meta ${e.meta}: hay montos negativos.`);
		});
		if (!ejecucion.length) observaciones.push("Ninguna fila corresponde al vínculo: revise pliego, UE, CUI, metas y específicas.");
		const lista = [...meses].filter(Boolean).sort((a, b) => a - b);
		return {
			formato,
			filasLeidas: filas.length,
			ejecucion,
			movimientos: [],
			descartadas,
			observaciones: [...new Set(observaciones)].slice(0, 20),
			periodo: lista.length ? `${v.anio} · ${MESES[lista[0] - 1]}${lista.length > 1 ? ` a ${MESES[lista[lista.length - 1] - 1]}` : ""}` : String(v.anio)
		};
	}
	const movimientos = [];
	for (const f of filas) {
		const ue = col(f, "EJECUTORA").padStart(3, "0");
		const meta = col(f, "META").padStart(4, "0");
		const esp = normalizarEspecifica(col(f, "ESPECIFICA_DET"));
		const anio = Number(col(f, "ANO_EJE")) || v.anio;
		if (ue && ue !== v.unidadEjecutora || anio !== v.anio || !metas.has(meta) || !especificas.has(esp)) {
			descartadas++;
			continue;
		}
		metasVistas.add(meta);
		movimientos.push({
			anio,
			ue,
			expediente: col(f, "EXPEDIENTE"),
			ciclo: col(f, "CICLO") || "G",
			fase: col(f, "FASE").toUpperCase(),
			secuencia: col(f, "SECUENCIA"),
			fecha: col(f, "FECHA"),
			tipoDocumento: col(f, "TIPO_DOCUMENTO"),
			documento: col(f, "NUMERO_DOCUMENTO"),
			beneficiarioDoc: col(f, "BENEFICIARIO_DOC"),
			beneficiario: col(f, "BENEFICIARIO"),
			meta,
			especificaDet: esp,
			fuente: col(f, "FUENTE_FINANC"),
			monto: numero(col(f, "MONTO")),
			estado: col(f, "ESTADO")
		});
	}
	v.metas.forEach((m) => {
		if (!metasVistas.has(m.numero)) observaciones.push(`La meta ${m.numero} del vínculo no tiene movimientos en el archivo.`);
	});
	if (!movimientos.length) observaciones.push("Ningún movimiento corresponde al vínculo: revise UE, metas y específicas.");
	const fechas = movimientos.map((m) => m.fecha).filter(Boolean).sort();
	return {
		formato,
		filasLeidas: filas.length,
		ejecucion: [],
		movimientos,
		descartadas,
		observaciones: [...new Set(observaciones)].slice(0, 20),
		periodo: fechas.length ? `${fechas[0]} a ${fechas[fechas.length - 1]}` : String(v.anio)
	};
}
var datosIdb = almacenArchivos("pdgp-siaf");
var CLAVE_CARGAS = "pdgp-siaf-cargas";
var VACIO = [];
var cargas = null;
var oyentes = /* @__PURE__ */ new Set();
function cargarCargas() {
	if (cargas) return cargas;
	try {
		cargas = JSON.parse(localStorage.getItem(CLAVE_CARGAS) ?? "[]");
	} catch {
		cargas = [];
	}
	return cargas;
}
function guardarCargas(nuevas) {
	cargas = nuevas;
	try {
		localStorage.setItem(CLAVE_CARGAS, JSON.stringify(nuevas));
	} catch {}
	oyentes.forEach((f) => f());
}
function useCargasSiaf() {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, cargarCargas, () => VACIO);
}
var claveEjecucion = (proyecto, anio) => `ejecucion:${proyecto}:${anio}`;
var claveMovimientos = (proyecto, anio) => `movimientos:${proyecto}:${anio}`;
async function huella(texto) {
	if (typeof crypto === "undefined" || !crypto.subtle) return "";
	const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
	return [...new Uint8Array(b)].slice(0, 6).map((x) => x.toString(16).padStart(2, "0")).join("");
}
/**
* Guarda lo leído. Datos abiertos: las filas de los meses cargados reemplazan a las guardadas de esos
* meses (una carga del mismo periodo se repite sin duplicar). Exportación: los movimientos del mismo
* expediente, fase y secuencia se reemplazan.
*/
async function guardarCarga(proyecto, anio, archivo, texto, r, usuario) {
	if (r.formato === "datos-abiertos") {
		const meses = new Set(r.ejecucion.map((e) => e.mes));
		const previas = await datosIdb.leer(claveEjecucion(proyecto, anio)).catch(() => void 0) ?? [];
		await datosIdb.guardar(claveEjecucion(proyecto, anio), [...previas.filter((e) => !meses.has(e.mes)), ...r.ejecucion]);
	} else {
		const previas = await datosIdb.leer(claveMovimientos(proyecto, anio)).catch(() => void 0) ?? [];
		const idDe = (m) => `${m.expediente}|${m.fase}|${m.secuencia}`;
		const nuevos = new Set(r.movimientos.map(idDe));
		await datosIdb.guardar(claveMovimientos(proyecto, anio), [...previas.filter((m) => !nuevos.has(idDe(m))), ...r.movimientos]);
	}
	const carga = {
		id: `cs-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
		proyecto,
		anio,
		archivo,
		formato: r.formato,
		periodo: r.periodo,
		filasLeidas: r.filasLeidas,
		filasCargadas: r.formato === "datos-abiertos" ? r.ejecucion.length : r.movimientos.length,
		descartadas: r.descartadas,
		observaciones: r.observaciones,
		usuario,
		fecha: (/* @__PURE__ */ new Date()).toISOString(),
		hash: await huella(texto)
	};
	guardarCargas([carga, ...cargarCargas()].slice(0, 500));
	registrarEnBitacora({
		modulo: 26,
		entidad: "carga_siaf",
		registro: `${proyecto}-${anio}`,
		accion: "crear",
		detalle: `Cargó ${archivo} (${r.formato}): ${carga.filasCargadas} filas, ${carga.descartadas} descartadas · ${carga.periodo}`
	});
	return carga;
}
/** Ejecución cargada del proyecto y año; se relee con cada carga nueva. */
function useEjecucionSiaf(proyecto, anio) {
	const version = useCargasSiaf().filter((c) => c.proyecto === proyecto && c.anio === anio).length;
	const [datos, setDatos] = useState({
		ejecucion: [],
		movimientos: []
	});
	useEffect(() => {
		let vivo = true;
		Promise.all([datosIdb.leer(claveEjecucion(proyecto, anio)).catch(() => void 0), datosIdb.leer(claveMovimientos(proyecto, anio)).catch(() => void 0)]).then(([e, m]) => {
			if (vivo) setDatos({
				ejecucion: e ?? [],
				movimientos: m ?? []
			});
		});
		return () => {
			vivo = false;
		};
	}, [
		proyecto,
		anio,
		version
	]);
	return datos;
}
/** Movimientos de un expediente SIAF entre todos los proyectos cargados (para la ficha del predio). */
async function movimientosDeExpediente(expediente, anio) {
	const exp = expediente.trim();
	if (!exp) return [];
	const proyectos = [...new Set(cargarCargas().filter((c) => c.anio === anio).map((c) => c.proyecto))];
	return (await Promise.all(proyectos.map((p) => datosIdb.leer(claveMovimientos(p, anio)).catch(() => void 0)))).flatMap((l) => l ?? []).filter((m) => m.expediente === exp);
}
/** Predios del proyecto con pago registrado en cada mes del año (hito formulario_y_pago o pago del padrón). */
function prediosPagadosPorMes(proyecto, anio) {
	const porMes = Array(12).fill(0);
	for (const p of prediosDelProyecto(proyecto)) {
		const fecha = leerHitos(p.codigo)["formulario_y_pago"]?.fecha;
		if (!fecha || !fecha.startsWith(String(anio))) continue;
		const m = Number(fecha.slice(5, 7));
		if (m >= 1 && m <= 12) porMes[m - 1]++;
	}
	return porMes;
}
/**
* Metas del Coordinador contra lo cargado del SIAF, mes a mes. Los montos de datos abiertos son
* acumulados al mes: el devengado del mes es la diferencia con el mes anterior; el PIM es el del último mes.
*/
function conciliar(proyecto, anio, metas, ejecucion) {
	const meses = [...new Set(ejecucion.map((e) => e.mes))].sort((a, b) => a - b);
	const ultimoMes = meses[meses.length - 1] ?? 0;
	const suma = (mes, k) => ejecucion.filter((e) => e.mes === mes).reduce((n, e) => n + e[k], 0);
	const pagados = prediosPagadosPorMes(proyecto, anio);
	let devAnt = 0;
	let girAnt = 0;
	const filas = MESES.map((nombreMes, i) => {
		const mes = i + 1;
		const conDatos = meses.includes(mes);
		const devAcum = conDatos ? suma(mes, "devengado") : devAnt;
		const girAcum = conDatos ? suma(mes, "girado") : girAnt;
		const devengado = conDatos ? Math.max(0, devAcum - devAnt) : 0;
		const girado = conDatos ? Math.max(0, girAcum - girAnt) : 0;
		if (conDatos) {
			devAnt = devAcum;
			girAnt = girAcum;
		}
		const metaFinanciera = metas.financiera[i]?.programada ?? 0;
		return {
			mes,
			nombreMes,
			metaFinanciera,
			devengado,
			girado,
			brecha: conDatos ? devengado - metaFinanciera : 0,
			metaFisica: metas.fisica[i]?.programada ?? 0,
			prediosPagados: pagados[i],
			conDatos
		};
	});
	const pim = ultimoMes ? suma(ultimoMes, "pim") : 0;
	const metaFinancieraAnual = metas.financiera.reduce((n, m) => n + m.programada, 0);
	return {
		filas,
		pim,
		pia: ultimoMes ? suma(ultimoMes, "pia") : 0,
		certificado: ultimoMes ? suma(ultimoMes, "certificado") : 0,
		compromisoAnual: ultimoMes ? suma(ultimoMes, "compromisoAnual") : 0,
		devengadoAcumulado: devAnt,
		giradoAcumulado: girAnt,
		metaFinancieraAnual,
		metaFisicaAnual: metas.fisica.reduce((n, m) => n + m.programada, 0),
		prediosPagadosAnual: pagados.reduce((a, b) => a + b, 0),
		ultimoMes,
		excedente: pim > 0 ? Math.max(0, metaFinancieraAnual - pim) : 0
	};
}
/** Una celda del CSV: entre comillas si lleva coma, comillas o salto de línea (como publica el MEF). */
var celdaCsv = (v) => {
	const t = String(v);
	return /[",\n]/.test(t) ? `"${t.replace(/"/g, "\"\"")}"` : t;
};
var csv = (cabecera, filas) => [cabecera.join(","), ...filas.map((f) => f.map(celdaCsv).join(","))].join("\n");
/**
* CSV con las columnas de datos abiertos del MEF para el vínculo del proyecto: meses de enero al actual,
* montos acumulados, más filas de otro pliego y de otra específica para ver el filtro en acción.
*/
function csvEjemploDatosAbiertos(v, hastaMes = (/* @__PURE__ */ new Date()).getMonth() + 1) {
	const nombre = getProyecto(v.proyecto)?.nombre ?? v.proyecto;
	const filas = [];
	const cui = v.cuis[0]?.cui ?? "2000000";
	v.metas.forEach((m, mi) => {
		const pia = 24e5 + mi * 6e5;
		const pim = pia * 1.15;
		["2.6.5.1.1.2", "2.6.8.1.4.3"].forEach((esp, ei) => {
			if (!v.especificas.includes(esp)) return;
			const parte = ei === 0 ? .92 : .08;
			for (let mes = 1; mes <= hastaMes; mes++) {
				const avance = Math.min(1, mes / 12 * 1.05);
				const devengado = Math.round(pim * parte * avance * .9);
				filas.push([
					v.anio,
					mes,
					"E",
					"36",
					v.pliego,
					PLIEGO_MTC.nombre,
					"000" + v.unidadEjecutora,
					v.unidadEjecutora,
					UNIDADES_EJECUTORAS.find((u) => u.codigo === v.unidadEjecutora)?.nombre ?? "",
					"9002",
					"3",
					cui,
					`MEJORAMIENTO DEL AEROPUERTO DE ${nombre.toUpperCase()}`,
					"4000010",
					"ADQUISICION Y LIBERACION DE AREAS",
					"15",
					"033",
					"0067",
					m.numero,
					m.finalidad.toUpperCase().slice(0, 40),
					m.finalidad.toUpperCase(),
					m.secFunc || "0001",
					m.fuente,
					m.rubro,
					"2",
					"6",
					esp.split(".")[2],
					esp.split(".")[3],
					esp.split(".")[4],
					esp,
					ESPECIFICAS_PREDIALES.find((e) => e.codigo === esp)?.nombre.toUpperCase() ?? "",
					Math.round(pia * parte),
					Math.round((pim - pia) * parte),
					Math.round(pim * parte),
					Math.round(pim * parte * Math.min(1, avance + .05)),
					Math.round(pim * parte * Math.min(1, avance + .02)),
					devengado,
					devengado,
					Math.round(devengado * .97)
				]);
			}
		});
	});
	filas.push([
		v.anio,
		1,
		"E",
		"36",
		"036",
		PLIEGO_MTC.nombre,
		"0007",
		"007",
		"PROVIAS NACIONAL",
		"0138",
		"3",
		"2112233",
		"CARRETERA DE EJEMPLO",
		"4000154",
		"OBRA",
		"15",
		"034",
		"0066",
		"0210",
		"OBRA",
		"EJECUCION DE OBRA",
		"0401",
		"1",
		"00",
		"2",
		"6",
		"2",
		"3",
		"2",
		"2.6.2.3.2.1",
		"COSTO DE CONSTRUCCION POR CONTRATA",
		9e7,
		0,
		9e7,
		6e7,
		55e6,
		5e7,
		5e7,
		49e6
	]);
	filas.push([
		v.anio,
		1,
		"E",
		"36",
		v.pliego,
		PLIEGO_MTC.nombre,
		"000" + v.unidadEjecutora,
		v.unidadEjecutora,
		"",
		"9002",
		"3",
		cui,
		`MEJORAMIENTO DEL AEROPUERTO DE ${nombre.toUpperCase()}`,
		"4000010",
		"ADQUISICION Y LIBERACION DE AREAS",
		"15",
		"033",
		"0067",
		v.metas[0]?.numero ?? "0001",
		"",
		"",
		v.metas[0]?.secFunc || "0001",
		"1",
		"00",
		"2",
		"6",
		"2",
		"3",
		"1",
		"2.6.2.3.1.1",
		"PUERTOS Y AEROPUERTOS",
		12e6,
		0,
		12e6,
		8e6,
		7e6,
		65e5,
		65e5,
		64e5
	]);
	return csv(COLUMNAS_DATOS_ABIERTOS, filas);
}
/** Exportación del SIAF-SP de ejemplo: expedientes con sus fases para los pagos del proyecto. */
function csvEjemploExportSiaf(v) {
	const meta = v.metas[0]?.numero ?? "0001";
	const filas = [];
	prediosDelProyecto(v.proyecto).slice(0, 6).forEach((p, i) => {
		const exp = String(3200 + i * 17);
		const monto = 8e4 + i * 23500;
		const dia = String(i * 5 % 27 + 1).padStart(2, "0");
		const fases = [
			[
				"CA",
				1,
				`${v.anio}-03-${dia}`
			],
			[
				"C",
				1,
				`${v.anio}-04-${dia}`
			],
			[
				"D",
				1,
				`${v.anio}-05-${dia}`
			],
			[
				"G",
				1,
				`${v.anio}-05-${dia}`
			]
		];
		(i % 3 === 2 ? fases.slice(0, 2) : fases).forEach(([fase, sec, fecha]) => {
			filas.push([
				v.anio,
				v.unidadEjecutora,
				exp,
				"G",
				fase,
				sec,
				fecha,
				fase === "G" ? "CARTA ORDEN" : fase === "D" ? "RESOLUCION DIRECTORAL" : "CERTIFICACION",
				fase === "G" ? `CO-${1200 + i}` : fase === "D" ? `RD-${300 + i}-${v.anio}-MTC/20` : `CCP-${500 + i}`,
				p.sujeto ? `DNI ${String(4e7 + i * 1111).slice(0, 8)}` : "",
				p.sujeto,
				meta,
				"2.6.5.1.1.2",
				"1",
				monto,
				fase === "G" ? "PAGADO" : "APROBADO"
			]);
		});
	});
	return csv(COLUMNAS_EXPORT_SIAF, filas);
}
/** PIM, devengado y girado al último mes cargado del proyecto; null si no hay carga. */
async function resumenEjecucion(proyecto, anio) {
	const [e, m] = await Promise.all([datosIdb.leer(claveEjecucion(proyecto, anio)).catch(() => void 0), datosIdb.leer(claveMovimientos(proyecto, anio)).catch(() => void 0)]);
	const ejecucion = e ?? [];
	if (!ejecucion.length && !m?.length) return null;
	const ultimoMes = Math.max(0, ...ejecucion.map((x) => x.mes));
	const suma = (k) => ejecucion.filter((x) => x.mes === ultimoMes).reduce((n, x) => n + x[k], 0);
	return {
		pim: suma("pim"),
		devengado: suma("devengado"),
		girado: suma("girado"),
		ultimoMes,
		movimientos: m?.length ?? 0
	};
}
/** Resumen de ejecución de varios proyectos; se relee cuando entra una carga nueva. */
function useResumenesEjecucion(proyectos, anio) {
	const cargas = useCargasSiaf();
	const version = cargas.filter((c) => c.anio === anio).length;
	const clave = proyectos.join("|");
	const [res, setRes] = useState({});
	useEffect(() => {
		let vivo = true;
		const con = new Set(cargas.filter((c) => c.anio === anio).map((c) => c.proyecto));
		const ids = clave.split("|").filter((id) => con.has(id));
		Promise.all(ids.map((id) => resumenEjecucion(id, anio).then((r) => [id, r]))).then((pares) => {
			if (vivo) setRes(Object.fromEntries(pares));
		});
		return () => {
			vivo = false;
		};
	}, [
		clave,
		anio,
		version
	]);
	return res;
}
//#endregion
export { validarVinculo as A, guardarMetas as B, puedeEditarVinculo as C, useEjecucionSiaf as D, useCargasSiaf as E, claveMetas as F, puedeRegistrarMetas as G, limpiarMetas as H, conNombre as I, useAprobacionesMetas as J, solicitarAprobacionMetas as K, decidirMetas as L, MESES as M, NOMBRE_ESTADO_METAS as N, useResumenesEjecucion as O, aprobacionDe as P, ejercicioInicial as R, puedeCargarSiaf as S, useAvance12B as T, metasDemostracion as U, leerMetas as V, puedeAprobarMetas as W, leerArchivo as _, NOMBRE_FORMATO as a, movimientosDeExpediente as b, UNIDADES_MEDIDA as c, csvEjemploDatosAbiertos as d, csvEjemploExportSiaf as f, guardarVinculo as g, guardarCarga as h, NOMBRE_FASE as i, ETIQUETAS_METAS as j, useVinculo as k, cantidadFisicaVinculada as l, guardarAvance12B as m, FUENTES as n, PLIEGO_MTC as o, estadoVinculo as p, totalProgramado as q, NOMBRE_ESTADO_VINCULO as r, UNIDADES_EJECUTORAS as s, ESPECIFICAS_PREDIALES as t, conciliar as u, leerVinculo as v, puedeValidarVinculo as w, parsearCsv as x, metaVacia as y, ejerciciosDesde as z };
