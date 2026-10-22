import { useSyncExternalStore } from "react";
//#region src/lib/formato.ts
/** Formatos comunes (es-PE). Un solo lugar; las páginas no definen los suyos. */
var fmtMoneda = new Intl.NumberFormat("es-PE", {
	style: "currency",
	currency: "PEN",
	minimumFractionDigits: 2
});
var moneda = (n) => n == null || Number.isNaN(n) ? "" : fmtMoneda.format(n);
var numero = (n, decimales = 0) => n == null || Number.isNaN(n) ? "" : new Intl.NumberFormat("es-PE", {
	minimumFractionDigits: decimales,
	maximumFractionDigits: decimales
}).format(n);
function aFecha(d) {
	if (d == null || d === "") return null;
	const soloFecha = typeof d === "string" ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(d) : null;
	const x = soloFecha ? new Date(Number(soloFecha[1]), Number(soloFecha[2]) - 1, Number(soloFecha[3])) : d instanceof Date ? d : new Date(d);
	return Number.isNaN(x.getTime()) ? null : x;
}
/** Date local a partir de "aaaa-mm-dd"; null si está vacío o es inválido. */
var desdeIso = (iso) => aFecha(iso);
var dd = (n) => String(n).padStart(2, "0");
/** dd/mm/aaaa */
function fecha(d) {
	const x = aFecha(d);
	return x ? `${dd(x.getDate())}/${dd(x.getMonth() + 1)}/${x.getFullYear()}` : "";
}
/** dd/mm/aaaa hh:mm */
function fechaHora(d) {
	const x = aFecha(d);
	return x ? `${fecha(x)} ${dd(x.getHours())}:${dd(x.getMinutes())}` : "";
}
/** Valor para <input type="date">: aaaa-mm-dd */
function fechaIso(d) {
	const x = aFecha(d);
	return x ? `${x.getFullYear()}-${dd(x.getMonth() + 1)}-${dd(x.getDate())}` : "";
}
//#endregion
//#region src/lib/plazos.ts
var PLAZOS = [
	{
		clave: "cbc",
		nombre: "Certificado de búsqueda catastral (SUNARP)",
		dias: 15,
		unidad: "habiles",
		articulo: "16.1",
		desde: "solicitud a SUNARP"
	},
	{
		clave: "comunicacion",
		nombre: "Comunicación a sujetos pasivos y ocupantes",
		dias: 10,
		unidad: "habiles",
		articulo: "16.1",
		desde: "identificación del inmueble"
	},
	{
		clave: "anotacion_preventiva",
		nombre: "Orden de anotación preventiva a SUNARP",
		dias: 10,
		unidad: "habiles",
		articulo: "16.2",
		desde: "comunicación"
	},
	{
		clave: "anotacion_vigencia",
		nombre: "Vigencia de la anotación preventiva",
		dias: 365,
		unidad: "calendario",
		articulo: "16.2",
		desde: "inscripción de la anotación"
	},
	{
		clave: "expediente_tecnico_legal",
		nombre: "Expediente técnico legal al órgano de tasación",
		dias: 80,
		unidad: "habiles",
		articulo: "17",
		desde: "identificación (4 meses; 3 en APP)"
	},
	{
		clave: "tasacion",
		nombre: "Tasación",
		dias: 30,
		unidad: "habiles",
		articulo: "18",
		desde: "designación del perito"
	},
	{
		clave: "valor_estimado",
		nombre: "Valor estimado para posesión anticipada",
		dias: 30,
		unidad: "calendario",
		articulo: "21.6",
		desde: "designación del perito"
	},
	{
		clave: "certificado_registral",
		nombre: "Certificado registral previo a la carta",
		dias: 2,
		unidad: "habiles",
		articulo: "20.2",
		desde: "solicitud a SUNARP"
	},
	{
		clave: "carta_intencion",
		nombre: "Carta de intención de adquisición",
		dias: 20,
		unidad: "habiles",
		articulo: "20.2",
		desde: "recepción de la tasación"
	},
	{
		clave: "respuesta_sujeto_pasivo",
		nombre: "Respuesta del sujeto pasivo",
		dias: 10,
		unidad: "habiles",
		articulo: "20.3",
		desde: "notificación de la carta"
	},
	{
		clave: "norma_valor_pago",
		nombre: "Norma que aprueba valor y pago",
		dias: 10,
		unidad: "habiles",
		articulo: "20.4.a",
		desde: "aceptación"
	},
	{
		clave: "formulario_y_pago",
		nombre: "Suscripción del formulario registral y pago",
		dias: 20,
		unidad: "habiles",
		articulo: "20.4.b",
		desde: "norma aprobatoria (60 en fideicomiso)"
	},
	{
		clave: "desocupacion_libre",
		nombre: "Desocupación de inmueble libre",
		dias: 10,
		unidad: "habiles",
		articulo: "20.4.e",
		desde: "pago o consignación"
	},
	{
		clave: "desocupacion_ocupado",
		nombre: "Desocupación de inmueble ocupado",
		dias: 30,
		unidad: "habiles",
		articulo: "20.4.e",
		desde: "pago o consignación (máx. 60)"
	},
	{
		clave: "requerimiento_entrega",
		nombre: "Requerimiento de entrega bajo apercibimiento",
		dias: 5,
		unidad: "habiles",
		articulo: "20.4.f",
		desde: "requerimiento (emitido en 2 d.h.)"
	},
	{
		clave: "remision_sunarp_adquisicion",
		nombre: "Remisión a SUNARP (adquisición)",
		dias: 5,
		unidad: "habiles",
		articulo: "22",
		desde: "formulario registral y pago"
	},
	{
		clave: "inscripcion",
		nombre: "Inscripción por el registrador",
		dias: 7,
		unidad: "habiles",
		articulo: "22 / 30",
		desde: "presentación del título"
	},
	{
		clave: "norma_expropiacion",
		nombre: "Norma de ejecución de la expropiación",
		dias: 10,
		unidad: "habiles",
		articulo: "27",
		desde: "rechazo o vencimiento del 20.3"
	},
	{
		clave: "consignacion",
		nombre: "Consignación",
		dias: 10,
		unidad: "habiles",
		articulo: "28.3",
		desde: "norma de ejecución (60 en fideicomiso)"
	},
	{
		clave: "remision_sunarp_expropiacion",
		nombre: "Remisión a SUNARP (expropiación)",
		dias: 5,
		unidad: "habiles",
		articulo: "30",
		desde: "norma y notificación de la consignación"
	},
	{
		clave: "saneamiento",
		nombre: "Solicitud de saneamiento físico legal",
		dias: 120,
		unidad: "habiles",
		articulo: "DCF 2.ª",
		desde: "suscripción del formulario registral"
	},
	{
		clave: "mejoras_oposicion",
		nombre: "Oposición al reconocimiento de mejoras",
		dias: 5,
		unidad: "habiles",
		articulo: "DCF 3.ª",
		desde: "última publicación del aviso"
	},
	{
		clave: "interferencias_presupuesto",
		nombre: "Presupuesto y cronograma de la empresa",
		dias: 20,
		unidad: "habiles",
		articulo: "43.2",
		desde: "notificación"
	},
	{
		clave: "interferencias_observaciones",
		nombre: "Levantamiento de observaciones",
		dias: 15,
		unidad: "habiles",
		articulo: "43.3",
		desde: "observación de la entidad"
	},
	{
		clave: "interferencias_inicio",
		nombre: "Inicio de los trabajos",
		dias: 30,
		unidad: "calendario",
		articulo: "43.3",
		desde: "aprobación"
	},
	{
		clave: "expediente_afectacion",
		nombre: "Expediente de afectación predial",
		dias: 122,
		unidad: "calendario",
		articulo: "17 · DCF 20.ª",
		desde: "comunicación de afectación"
	},
	{
		clave: "expediente_afectacion_app",
		nombre: "Expediente de afectación predial (APP)",
		dias: 91,
		unidad: "calendario",
		articulo: "17",
		desde: "comunicación de afectación"
	},
	{
		clave: "bloqueo_registral",
		nombre: "Vigencia del bloqueo registral",
		dias: 730,
		unidad: "calendario",
		articulo: "21.6",
		desde: "inscripción del bloqueo"
	},
	{
		clave: "caducidad_ley",
		nombre: "Caducidad del derecho de expropiar",
		dias: 1826,
		unidad: "calendario",
		articulo: "33",
		desde: "vigencia de la ley autoritativa"
	},
	{
		clave: "arbitraje_caducidad",
		nombre: "Cuestionamiento arbitral o judicial",
		dias: 730,
		unidad: "calendario",
		articulo: "34",
		desde: "consignación"
	},
	{
		clave: "arbitraje_oposicion",
		nombre: "Oposición del sujeto activo al arbitraje",
		dias: 10,
		unidad: "habiles",
		articulo: "35",
		desde: "comunicación del sujeto pasivo"
	},
	{
		clave: "laudo",
		nombre: "Laudo arbitral",
		dias: 183,
		unidad: "calendario",
		articulo: "38",
		desde: "admisión de la demanda"
	},
	{
		clave: "pago_laudo",
		nombre: "Pago del monto ordenado",
		dias: 20,
		unidad: "habiles",
		articulo: "38",
		desde: "laudo o sentencia"
	},
	{
		clave: "desocupacion_actividad",
		nombre: "Desocupación de inmueble industrial o comercial",
		dias: 90,
		unidad: "habiles",
		articulo: "20.4.e (DL 1559)",
		desde: "pago o consignación"
	},
	{
		clave: "sbn_resolucion",
		nombre: "Resolución de transferencia de la SBN",
		dias: 45,
		unidad: "habiles",
		articulo: "41.1",
		desde: "solicitud a la SBN"
	},
	{
		clave: "sbn_anotacion",
		nombre: "Anotación preventiva pedida por la SBN",
		dias: 2,
		unidad: "habiles",
		articulo: "41.2",
		desde: "solicitud a la SBN"
	},
	{
		clave: "entrega_estatal",
		nombre: "Entrega por la entidad ocupante",
		dias: 30,
		unidad: "habiles",
		articulo: "41.5",
		desde: "resolución de la SBN"
	},
	{
		clave: "entrega_provisional",
		nombre: "Entrega provisional",
		dias: 7,
		unidad: "habiles",
		articulo: "41.11 (DL 1726)",
		desde: "pedido de entrega provisional"
	},
	{
		clave: "bloque_documentos",
		nombre: "Presentación de documentos del bloque",
		dias: 60,
		unidad: "habiles",
		articulo: "51 (DL 1726)",
		desde: "primera publicación"
	},
	{
		clave: "bloque_carta",
		nombre: "Respuesta a la carta del bloque",
		dias: 10,
		unidad: "habiles",
		articulo: "58 (DL 1726)",
		desde: "notificación de la carta"
	},
	{
		clave: "bloque_entrega",
		nombre: "Entrega con compensación económica",
		dias: 40,
		unidad: "habiles",
		articulo: "59 (DL 1726)",
		desde: "aceptación"
	},
	{
		clave: "diagnostico_tecnico_legal",
		nombre: "Diagnóstico técnico legal",
		dias: 20,
		unidad: "calendario",
		articulo: "Flujograma DDP",
		desde: "inicio del levantamiento en campo",
		tipo: "gestion"
	},
	{
		clave: "anotacion_sunarp",
		nombre: "Inscripción de la anotación preventiva por SUNARP",
		dias: 7,
		unidad: "habiles",
		articulo: "5.5.d",
		desde: "solicitud de la anotación"
	},
	{
		clave: "comunicacion_entidades",
		nombre: "Comunicación de la anotación preventiva a las entidades",
		dias: 10,
		unidad: "habiles",
		articulo: "5",
		desde: "inscripción de la anotación"
	},
	{
		clave: "expediente_tecnico_elaboracion",
		nombre: "Elaboración del expediente técnico para tasación",
		dias: 40,
		unidad: "habiles",
		articulo: "15 · DCF 3.ª",
		desde: "comunicación al sujeto pasivo",
		tipo: "gestion"
	},
	{
		clave: "presentacion_tasacion",
		nombre: "Presentación del expediente con fines de tasación",
		dias: 15,
		unidad: "habiles",
		articulo: "15 · DCF 3.ª",
		desde: "expediente técnico concluido",
		tipo: "gestion"
	},
	{
		clave: "revision_tasacion",
		nombre: "Revisión de la tasación y pedido de CCP",
		dias: 2,
		unidad: "habiles",
		articulo: "Flujograma DDP",
		desde: "recepción del informe de tasación",
		tipo: "gestion"
	},
	{
		clave: "carta_elaboracion",
		nombre: "Elaboración y firma de la carta de intención",
		dias: 3,
		unidad: "habiles",
		articulo: "Flujograma DDP",
		desde: "certificación presupuestal",
		tipo: "gestion"
	},
	{
		clave: "itl",
		nombre: "Informe técnico legal",
		dias: 3,
		unidad: "habiles",
		articulo: "Flujograma DDP",
		desde: "aceptación o rechazo del sujeto pasivo",
		tipo: "gestion"
	},
	{
		clave: "itl_expropiacion",
		nombre: "Informe técnico legal de expropiación",
		dias: 3,
		unidad: "habiles",
		articulo: "Flujograma DDP",
		desde: "rechazo o vencimiento del plazo del sujeto pasivo",
		tipo: "gestion"
	},
	{
		clave: "notificacion_rd",
		nombre: "Notificación de la resolución y suscripción del instrumento",
		dias: 3,
		unidad: "habiles",
		articulo: "20.4",
		desde: "emisión de la resolución",
		tipo: "gestion"
	},
	{
		clave: "entrega_tras_inscripcion",
		nombre: "Entrega del inmueble tras la inscripción",
		dias: 2,
		unidad: "habiles",
		articulo: "Flujograma DDP",
		desde: "inscripción a favor del beneficiario",
		tipo: "gestion"
	},
	{
		clave: "consignacion_gestion",
		nombre: "Gestión de la consignación en el Banco de la Nación",
		dias: 3,
		unidad: "habiles",
		articulo: "28.4",
		desde: "emisión de la norma de expropiación",
		tipo: "gestion"
	},
	{
		clave: "publicacion_norma",
		nombre: "Publicación de la norma de expropiación en El Peruano",
		dias: 5,
		unidad: "habiles",
		articulo: "28.4",
		desde: "emisión de la norma",
		tipo: "gestion"
	},
	{
		clave: "notificacion_notarial",
		nombre: "Notificación notarial o por juez de paz de la expropiación",
		dias: 7,
		unidad: "habiles",
		articulo: "28.4",
		desde: "publicación de la norma",
		tipo: "gestion"
	},
	{
		clave: "coactiva_solicitud",
		nombre: "Solicitud al ejecutor coactivo",
		dias: 5,
		unidad: "habiles",
		articulo: "39",
		desde: "vencimiento del plazo de entrega",
		tipo: "gestion"
	},
	{
		clave: "coactiva_orden",
		nombre: "Orden de ejecución coactiva",
		dias: 30,
		unidad: "habiles",
		articulo: "39",
		desde: "solicitud al ejecutor coactivo",
		tipo: "gestion"
	},
	{
		clave: "lanzamiento",
		nombre: "Lanzamiento y toma de posesión",
		dias: 5,
		unidad: "habiles",
		articulo: "40",
		desde: "orden del ejecutor coactivo",
		tipo: "gestion"
	},
	{
		clave: "liberacion_anticipada_areas",
		nombre: "Liberación anticipada de áreas (NEC u obra inmediata)",
		dias: 45,
		unidad: "calendario",
		articulo: "Flujograma DDP",
		desde: "reunión informativa con los titulares",
		tipo: "gestion"
	},
	{
		clave: "sunarp_estatal",
		nombre: "Inscripción de primera de dominio o independización",
		dias: 7,
		unidad: "habiles",
		articulo: "41.3",
		desde: "resolución de la SBN o la DGA"
	}
];
function plazo(clave) {
	const p = PLAZOS.find((x) => x.clave === clave);
	if (!p) throw new Error(`Plazo desconocido: ${clave}`);
	return p;
}
var FERIADOS_FIJOS = /* @__PURE__ */ new Set([
	"01-01",
	"05-01",
	"06-07",
	"06-29",
	"07-28",
	"07-29",
	"08-06",
	"08-30",
	"10-08",
	"11-01",
	"12-08",
	"12-09",
	"12-25"
]);
var mmdd = (d) => `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function esHabil(d, feriados = FERIADOS_FIJOS) {
	const dow = d.getDay();
	return dow !== 0 && dow !== 6 && !feriados.has(mmdd(d));
}
/** Fecha de vencimiento: suma n días hábiles (o calendario) a partir del día siguiente a `desde`. */
function vencimiento(desde, p, feriados = FERIADOS_FIJOS) {
	const d = new Date(desde.getFullYear(), desde.getMonth(), desde.getDate());
	if (p.unidad === "calendario") {
		d.setDate(d.getDate() + p.dias);
		return d;
	}
	let faltan = p.dias;
	while (faltan > 0) {
		d.setDate(d.getDate() + 1);
		if (esHabil(d, feriados)) faltan -= 1;
	}
	return d;
}
/** Días hábiles entre hoy y el vencimiento; negativo si ya venció. */
function diasHabilesRestantes(vence, hoy = /* @__PURE__ */ new Date(), feriados = FERIADOS_FIJOS) {
	const a = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
	const b = new Date(vence.getFullYear(), vence.getMonth(), vence.getDate());
	const signo = b >= a ? 1 : -1;
	const [ini, fin] = signo === 1 ? [a, b] : [b, a];
	let n = 0;
	const d = new Date(ini);
	while (d < fin) {
		d.setDate(d.getDate() + 1);
		if (esHabil(d, feriados)) n += 1;
	}
	return signo * n;
}
/** Verde dentro de plazo, ámbar a 3 días hábiles o menos, rojo vencido. */
function semaforo(vence, hoy = /* @__PURE__ */ new Date()) {
	const restan = diasHabilesRestantes(vence, hoy);
	if (restan < 0) return "rojo";
	if (restan <= 3) return "ambar";
	return "verde";
}
//#endregion
//#region src/lib/hitosPredio.ts
var CLAVE = "pdgp-hitos";
var VACIO = {};
var datos = null;
var oyentes = /* @__PURE__ */ new Set();
function cargar() {
	if (datos) return datos;
	try {
		datos = JSON.parse(localStorage.getItem(CLAVE) ?? "{}");
	} catch {
		datos = {};
	}
	return datos;
}
/** Hitos registrados del predio, por clave de plazo. */
function useHitosPredio(codigo) {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, () => cargar()[codigo] ?? VACIO, () => VACIO);
}
function leerHitos(codigo) {
	return cargar()[codigo] ?? VACIO;
}
/** Registra (o borra, con fecha vacía) el hito desde el que corre el plazo `clave`. */
function registrarHito(codigo, clave, fecha, pantalla, campo) {
	const actual = cargar();
	const delPredio = { ...actual[codigo] ?? {} };
	if (fecha) delPredio[clave] = {
		fecha,
		pantalla,
		campo,
		registradoEl: (/* @__PURE__ */ new Date()).toISOString()
	};
	else delete delPredio[clave];
	datos = {
		...actual,
		[codigo]: delPredio
	};
	try {
		localStorage.setItem(CLAVE, JSON.stringify(datos));
	} catch {}
	oyentes.forEach((f) => f());
}
/** Estado del plazo `clave` si su hito está registrado; si no, undefined (no se inventa una fecha). */
function estadoPlazo(hitos, clave, hoy = /* @__PURE__ */ new Date()) {
	const h = hitos[clave];
	const desde = h ? desdeIso(h.fecha) : void 0;
	if (!desde) return void 0;
	const p = plazo(clave);
	const vence = vencimiento(desde, p);
	return {
		clave,
		nombre: p.nombre,
		articulo: p.articulo,
		gestion: p.tipo === "gestion",
		desde,
		vence,
		semaforo: semaforo(vence, hoy),
		restantes: diasHabilesRestantes(vence, hoy)
	};
}
/** ¿El plazo `clave` ya venció? Sin hito registrado, no. */
var plazoVencido = (hitos, clave, hoy = /* @__PURE__ */ new Date()) => (estadoPlazo(hitos, clave, hoy)?.restantes ?? 0) < 0;
//#endregion
//#region src/lib/projectsData.ts
var projectSeed = [
	{
		"id": "iquitos",
		"codigo": "PRY-001",
		"nombre": "Iquitos",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En ejecucion",
		"presupuesto": "S/ 44.3 MM",
		"fisico": 29,
		"financiero": 30,
		"predios": 64,
		"disponibles": 28
	},
	{
		"id": "trujillo",
		"codigo": "PRY-002",
		"nombre": "Trujillo",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En revision",
		"presupuesto": "S/ 100.0 MM",
		"fisico": 22,
		"financiero": 28,
		"predios": 69,
		"disponibles": 242
	},
	{
		"id": "chachapoyas",
		"codigo": "PRY-003",
		"nombre": "Chachapoyas",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1583500178690-f7eb3c2dd6cc?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En estructuracion",
		"presupuesto": "S/ 64.8 MM",
		"fisico": 14,
		"financiero": 10,
		"predios": 262,
		"disponibles": 117
	},
	{
		"id": "chiclayo",
		"codigo": "PRY-004",
		"nombre": "Chiclayo",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En ejecucion",
		"presupuesto": "S/ 15.8 MM",
		"fisico": 21,
		"financiero": 40,
		"predios": 257,
		"disponibles": 25
	},
	{
		"id": "tumbes",
		"codigo": "PRY-005",
		"nombre": "Tumbes",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En revision",
		"presupuesto": "S/ 100.6 MM",
		"fisico": 25,
		"financiero": 65,
		"predios": 154,
		"disponibles": 171
	},
	{
		"id": "pucallpa",
		"codigo": "PRY-006",
		"nombre": "Pucallpa",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En estructuracion",
		"presupuesto": "S/ 78.3 MM",
		"fisico": 17,
		"financiero": 41,
		"predios": 243,
		"disponibles": 22
	},
	{
		"id": "anta-huaraz",
		"codigo": "PRY-007",
		"nombre": "Anta-HUARAZ",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En ejecucion",
		"presupuesto": "S/ 117.3 MM",
		"fisico": 15,
		"financiero": 40,
		"predios": 108,
		"disponibles": 84
	},
	{
		"id": "pisco",
		"codigo": "PRY-008",
		"nombre": "Pisco",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1583500178690-f7eb3c2dd6cc?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En revision",
		"presupuesto": "S/ 54.9 MM",
		"fisico": 25,
		"financiero": 41,
		"predios": 197,
		"disponibles": 153
	},
	{
		"id": "tarapoto",
		"codigo": "PRY-009",
		"nombre": "Tarapoto",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En estructuracion",
		"presupuesto": "S/ 99.4 MM",
		"fisico": 33,
		"financiero": 11,
		"predios": 136,
		"disponibles": 105
	},
	{
		"id": "cajamarca",
		"codigo": "PRY-010",
		"nombre": "Cajamarca",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En ejecucion",
		"presupuesto": "S/ 18.9 MM",
		"fisico": 18,
		"financiero": 41,
		"predios": 70,
		"disponibles": 168
	},
	{
		"id": "talara",
		"codigo": "PRY-011",
		"nombre": "Talara",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En revision",
		"presupuesto": "S/ 31.1 MM",
		"fisico": 64,
		"financiero": 54,
		"predios": 200,
		"disponibles": 129
	},
	{
		"id": "piura",
		"codigo": "PRY-012",
		"nombre": "Piura",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 01",
		"coordinadorPredial": "Gilbert Manuel Aguirre Gómez",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En estructuracion",
		"presupuesto": "S/ 73.6 MM",
		"fisico": 68,
		"financiero": 28,
		"predios": 193,
		"disponibles": 73
	},
	{
		"id": "andahuaylas",
		"codigo": "PRY-013",
		"nombre": "Andahuaylas",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 02",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1583500178690-f7eb3c2dd6cc?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En ejecucion",
		"presupuesto": "S/ 97.0 MM",
		"fisico": 41,
		"financiero": 10,
		"predios": 193,
		"disponibles": 144
	},
	{
		"id": "ayacucho",
		"codigo": "PRY-014",
		"nombre": "Ayacucho",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 02",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En revision",
		"presupuesto": "S/ 63.5 MM",
		"fisico": 53,
		"financiero": 51,
		"predios": 269,
		"disponibles": 83
	},
	{
		"id": "juliaca",
		"codigo": "PRY-015",
		"nombre": "Juliaca",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 02",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En estructuracion",
		"presupuesto": "S/ 76.2 MM",
		"fisico": 19,
		"financiero": 12,
		"predios": 254,
		"disponibles": 52
	},
	{
		"id": "jauja",
		"codigo": "PRY-016",
		"nombre": "Jauja",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 02",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En ejecucion",
		"presupuesto": "S/ 92.8 MM",
		"fisico": 29,
		"financiero": 64,
		"predios": 290,
		"disponibles": 117
	},
	{
		"id": "puerto-maldonado",
		"codigo": "PRY-017",
		"nombre": "Puerto Maldonado",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 03",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En revision",
		"presupuesto": "S/ 12.4 MM",
		"fisico": 19,
		"financiero": 53,
		"predios": 200,
		"disponibles": 97
	},
	{
		"id": "tacna",
		"codigo": "PRY-018",
		"nombre": "Tacna",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 03",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1583500178690-f7eb3c2dd6cc?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En estructuracion",
		"presupuesto": "S/ 85.9 MM",
		"fisico": 73,
		"financiero": 42,
		"predios": 273,
		"disponibles": 27
	},
	{
		"id": "arequipa",
		"codigo": "PRY-019",
		"nombre": "Arequipa",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 03",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En ejecucion",
		"presupuesto": "S/ 102.1 MM",
		"fisico": 44,
		"financiero": 35,
		"predios": 73,
		"disponibles": 25
	},
	{
		"id": "caballococha",
		"codigo": "PRY-020",
		"nombre": "Caballococha",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 03",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En revision",
		"presupuesto": "S/ 89.9 MM",
		"fisico": 49,
		"financiero": 46,
		"predios": 268,
		"disponibles": 82
	},
	{
		"id": "soplin-vargas",
		"codigo": "PRY-021",
		"nombre": "Soplin Vargas",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 03",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En estructuracion",
		"presupuesto": "S/ 88.3 MM",
		"fisico": 54,
		"financiero": 6,
		"predios": 276,
		"disponibles": 100
	},
	{
		"id": "huancabamba-oxapampa",
		"codigo": "PRY-022",
		"nombre": "Huancabamba - Oxapampa",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 03",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En ejecucion",
		"presupuesto": "S/ 26.8 MM",
		"fisico": 24,
		"financiero": 36,
		"predios": 70,
		"disponibles": 65
	},
	{
		"id": "breu",
		"codigo": "PRY-023",
		"nombre": "Breu",
		"tipo": "Aeroportuarios",
		"coordinacionGeneral": "Coordinación General de Aeropuertos",
		"coordinacionPredial": "Coordinación Predial Aeropuertos 03",
		"coordinadorPredial": "Marcos Armando Soto Luis",
		"liderInterferencias": "Joel Jhonny Lázaro Anaya",
		"img": "https://images.unsplash.com/photo-1583500178690-f7eb3c2dd6cc?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En revision",
		"presupuesto": "S/ 94.0 MM",
		"fisico": 26,
		"financiero": 52,
		"predios": 166,
		"disponibles": 111
	},
	{
		"id": "autopista-del-sol",
		"codigo": "PRY-024",
		"nombre": "Autopista del Sol",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 1",
		"coordinacionPredial": "Coordinación Predial Autopista del Sol",
		"coordinadorPredial": "Marlon Napravnick Noriega",
		"liderInterferencias": "Jhony Elguera Rivas",
		"img": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En estructuracion",
		"presupuesto": "S/ 51.8 MM",
		"fisico": 73,
		"financiero": 10,
		"predios": 125,
		"disponibles": 124
	},
	{
		"id": "red-vial-6",
		"codigo": "PRY-025",
		"nombre": "Red Vial 6",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 1",
		"coordinacionPredial": "Coordinación Predial Red Vial 6",
		"coordinadorPredial": "Raquel Antuanet Huapaya Porras",
		"liderInterferencias": "Marvin Antonio Mosquera Pérez",
		"img": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En ejecucion",
		"presupuesto": "S/ 53.0 MM",
		"fisico": 45,
		"financiero": 61,
		"predios": 110,
		"disponibles": 219
	},
	{
		"id": "red-vial-5",
		"codigo": "PRY-026",
		"nombre": "Red Vial 5",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 1",
		"coordinacionPredial": "Coordinación Predial Red Vial 5",
		"coordinadorPredial": "Raquel Antuanet Huapaya Porras",
		"liderInterferencias": "María Cecilia Chil Chang",
		"img": "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En revision",
		"presupuesto": "S/ 56.2 MM",
		"fisico": 45,
		"financiero": 50,
		"predios": 252,
		"disponibles": 101
	},
	{
		"id": "dv-huaral-acos",
		"codigo": "PRY-027",
		"nombre": "Dv. Huaral - Acos",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 1",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 1",
		"coordinadorPredial": "Rafael Palomino Rojas",
		"liderInterferencias": "Marvin Antonio Mosquera Pérez",
		"img": "https://images.unsplash.com/photo-1473042904451-00171c69419d?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En estructuracion",
		"presupuesto": "S/ 84.5 MM",
		"fisico": 58,
		"financiero": 19,
		"predios": 117,
		"disponibles": 31
	},
	{
		"id": "dv-quilca-la-concordia",
		"codigo": "PRY-028",
		"nombre": "Dv. Quilca - La Concordia",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 1",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 1",
		"coordinadorPredial": "Rafael Palomino Rojas",
		"liderInterferencias": "Marvin Antonio Mosquera Pérez",
		"img": "https://images.unsplash.com/photo-1545262810-77515befe149?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En ejecucion",
		"presupuesto": "S/ 27.7 MM",
		"fisico": 39,
		"financiero": 47,
		"predios": 159,
		"disponibles": 13
	},
	{
		"id": "iirsa-sur-t1",
		"codigo": "PRY-029",
		"nombre": "IIRSA Sur T1",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 2",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 2",
		"coordinadorPredial": "Paul Alexander Orosco Jiménez",
		"liderInterferencias": "Cristina Modesta Pancorbo Sayas",
		"img": "https://images.unsplash.com/photo-1597171646371-aa961df17de1?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En revision",
		"presupuesto": "S/ 62.3 MM",
		"fisico": 33,
		"financiero": 21,
		"predios": 184,
		"disponibles": 11
	},
	{
		"id": "iirsa-sur-t2",
		"codigo": "PRY-030",
		"nombre": "IIRSA Sur T2",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 2",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 2",
		"coordinadorPredial": "Paul Alexander Orosco Jiménez",
		"liderInterferencias": "Cristina Modesta Pancorbo Sayas",
		"img": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En estructuracion",
		"presupuesto": "S/ 24.3 MM",
		"fisico": 57,
		"financiero": 44,
		"predios": 203,
		"disponibles": 42
	},
	{
		"id": "iirsa-sur-t3",
		"codigo": "PRY-031",
		"nombre": "IIRSA Sur T3",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 2",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 2",
		"coordinadorPredial": "Paul Alexander Orosco Jiménez",
		"liderInterferencias": "Cristina Modesta Pancorbo Sayas",
		"img": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En ejecucion",
		"presupuesto": "S/ 85.3 MM",
		"fisico": 75,
		"financiero": 65,
		"predios": 67,
		"disponibles": 126
	},
	{
		"id": "iirsa-sur-t4",
		"codigo": "PRY-032",
		"nombre": "IIRSA Sur T4",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 2",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 2",
		"coordinadorPredial": "Paul Alexander Orosco Jiménez",
		"liderInterferencias": "Cristina Modesta Pancorbo Sayas",
		"img": "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En revision",
		"presupuesto": "S/ 108.7 MM",
		"fisico": 60,
		"financiero": 30,
		"predios": 244,
		"disponibles": 110
	},
	{
		"id": "iirsa-sur-t5",
		"codigo": "PRY-033",
		"nombre": "IIRSA Sur T5",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 2",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 2",
		"coordinadorPredial": "Paul Alexander Orosco Jiménez",
		"liderInterferencias": "Cristina Modesta Pancorbo Sayas",
		"img": "https://images.unsplash.com/photo-1473042904451-00171c69419d?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En estructuracion",
		"presupuesto": "S/ 19.6 MM",
		"fisico": 61,
		"financiero": 8,
		"predios": 137,
		"disponibles": 27
	},
	{
		"id": "carretera-puno-juliaca",
		"codigo": "PRY-034",
		"nombre": "Carretera Puno Juliaca",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 2",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 2",
		"coordinadorPredial": "Paul Alexander Orosco Jiménez",
		"liderInterferencias": "Cristina Modesta Pancorbo Sayas",
		"img": "https://images.unsplash.com/photo-1545262810-77515befe149?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En ejecucion",
		"presupuesto": "S/ 118.3 MM",
		"fisico": 66,
		"financiero": 15,
		"predios": 96,
		"disponibles": 97
	},
	{
		"id": "iirsa-centro",
		"codigo": "PRY-035",
		"nombre": "IIRSA Centro",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 2",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 2",
		"coordinadorPredial": "Paul Alexander Orosco Jiménez",
		"liderInterferencias": "Cristina Modesta Pancorbo Sayas",
		"img": "https://images.unsplash.com/photo-1597171646371-aa961df17de1?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En revision",
		"presupuesto": "S/ 75.3 MM",
		"fisico": 23,
		"financiero": 5,
		"predios": 117,
		"disponibles": 147
	},
	{
		"id": "iirsa-norte",
		"codigo": "PRY-036",
		"nombre": "IIRSA Norte",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 2",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 2",
		"coordinadorPredial": "Paul Alexander Orosco Jiménez",
		"liderInterferencias": "Cristina Modesta Pancorbo Sayas",
		"img": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En estructuracion",
		"presupuesto": "S/ 19.4 MM",
		"fisico": 56,
		"financiero": 44,
		"predios": 53,
		"disponibles": 28
	},
	{
		"id": "longitudinal-de-la-sierra-t2",
		"codigo": "PRY-037",
		"nombre": "Longitudinal de la Sierra T2",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 3",
		"coordinacionPredial": "Coordinación Predial Longitudinal de la Sierra Tramo 2",
		"coordinadorPredial": "Freddy Justo Rojas Meza",
		"liderInterferencias": "Por designar",
		"img": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En ejecucion",
		"presupuesto": "S/ 105.9 MM",
		"fisico": 58,
		"financiero": 14,
		"predios": 169,
		"disponibles": 98
	},
	{
		"id": "longitudinal-de-la-sierra-t4",
		"codigo": "PRY-038",
		"nombre": "Longitudinal de la Sierra T4",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 3",
		"coordinacionPredial": "Coordinación Predial Longitudinal de la Sierra Tramo 4",
		"coordinadorPredial": "Nelson Efraín Gutiérrez Minchola",
		"liderInterferencias": "Por designar",
		"img": "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En revision",
		"presupuesto": "S/ 75.5 MM",
		"fisico": 70,
		"financiero": 12,
		"predios": 99,
		"disponibles": 227
	},
	{
		"id": "dv-nuevo-mocupe-cayalti",
		"codigo": "PRY-039",
		"nombre": "Dv. Nuevo Mocupe - Cayalti",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 3",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 3",
		"coordinadorPredial": "Nelson Efraín Gutiérrez Minchola",
		"liderInterferencias": "Por designar",
		"img": "https://images.unsplash.com/photo-1473042904451-00171c69419d?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En estructuracion",
		"presupuesto": "S/ 62.7 MM",
		"fisico": 69,
		"financiero": 35,
		"predios": 287,
		"disponibles": 89
	},
	{
		"id": "dv-buenos-aires-canchaque",
		"codigo": "PRY-040",
		"nombre": "Dv. Buenos Aires - Canchaque",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General Vial 3",
		"coordinacionPredial": "Coordinación de Multiproyectos Viales 3",
		"coordinadorPredial": "Nelson Efraín Gutiérrez Minchola",
		"liderInterferencias": "Por designar",
		"img": "https://images.unsplash.com/photo-1545262810-77515befe149?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En ejecucion",
		"presupuesto": "S/ 17.6 MM",
		"fisico": 23,
		"financiero": 52,
		"predios": 215,
		"disponibles": 199
	},
	{
		"id": "red-vial-4",
		"codigo": "PRY-041",
		"nombre": "Red Vial 4",
		"tipo": "Viales",
		"coordinacionGeneral": "Coordinación General de Proyectos Viales y Especiales",
		"coordinacionPredial": "Coordinación Predial Red Vial 4",
		"coordinadorPredial": "Wenne Esteisy Jesús Loza",
		"liderInterferencias": "Ángel Enrique Reyes Cruz",
		"img": "https://images.unsplash.com/photo-1597171646371-aa961df17de1?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En revision",
		"presupuesto": "S/ 37.7 MM",
		"fisico": 30,
		"financiero": 38,
		"predios": 51,
		"disponibles": 62
	},
	{
		"id": "puerto-san-juan-de-marcona",
		"codigo": "PRY-042",
		"nombre": "Puerto San Juan de Marcona",
		"tipo": "Especiales",
		"coordinacionGeneral": "Coordinación General de Proyectos Viales y Especiales",
		"coordinacionPredial": "Coordinación de Multiproyectos Especiales",
		"coordinadorPredial": "José César Mendoza Soto",
		"liderInterferencias": "Ángel Enrique Reyes Cruz",
		"img": "https://images.unsplash.com/photo-1473221326025-9183b464bb7e?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En estructuracion",
		"presupuesto": "S/ 114.5 MM",
		"fisico": 56,
		"financiero": 14,
		"predios": 53,
		"disponibles": 204
	},
	{
		"id": "evitamiento-cuzco",
		"codigo": "PRY-043",
		"nombre": "Evitamiento Cuzco",
		"tipo": "Especiales",
		"coordinacionGeneral": "Coordinación General de Proyectos Viales y Especiales",
		"coordinacionPredial": "Coordinación de Multiproyectos Especiales",
		"coordinadorPredial": "José César Mendoza Soto",
		"liderInterferencias": "Ángel Enrique Reyes Cruz",
		"img": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=70&auto=format&fit=crop",
		"fase": "Liberacion predial",
		"estado": "En ejecucion",
		"presupuesto": "S/ 67.1 MM",
		"fisico": 21,
		"financiero": 49,
		"predios": 173,
		"disponibles": 142
	},
	{
		"id": "anillo-vial-periferico",
		"codigo": "PRY-044",
		"nombre": "Anillo Vial Periférico",
		"tipo": "Especiales",
		"coordinacionGeneral": "Coordinación General de Proyectos Viales y Especiales",
		"coordinacionPredial": "Coordinación de Multiproyectos Especiales",
		"coordinadorPredial": "José César Mendoza Soto",
		"liderInterferencias": "Ángel Enrique Reyes Cruz",
		"img": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=70&auto=format&fit=crop",
		"fase": "Disponibilidad de areas",
		"estado": "En revision",
		"presupuesto": "S/ 49.1 MM",
		"fisico": 31,
		"financiero": 27,
		"predios": 154,
		"disponibles": 146
	},
	{
		"id": "fhh",
		"codigo": "PRY-045",
		"nombre": "FHH",
		"tipo": "Especiales",
		"coordinacionGeneral": "Coordinación General de Proyectos Viales y Especiales",
		"coordinacionPredial": "Coordinación de Multiproyectos Especiales",
		"coordinadorPredial": "José César Mendoza Soto",
		"liderInterferencias": "Ángel Enrique Reyes Cruz",
		"img": "https://images.unsplash.com/photo-1473221326025-9183b464bb7e?w=800&q=70&auto=format&fit=crop",
		"fase": "Diagnostico predial",
		"estado": "En estructuracion",
		"presupuesto": "S/ 68.7 MM",
		"fisico": 74,
		"financiero": 26,
		"predios": 154,
		"disponibles": 166
	},
	{
		"id": "puertos-y-otros",
		"codigo": "PRY-046",
		"nombre": "Puertos y otros",
		"tipo": "Especiales",
		"coordinacionGeneral": "Coordinación General de Proyectos Viales y Especiales",
		"coordinacionPredial": "Coordinación de Multiproyectos Especiales",
		"coordinadorPredial": "José César Mendoza Soto",
		"liderInterferencias": "Ángel Enrique Reyes Cruz",
		"img": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=70&auto=format&fit=crop",
		"fase": "Levantamiento topografico",
		"estado": "En ejecucion",
		"presupuesto": "S/ 98.9 MM",
		"fisico": 34,
		"financiero": 56,
		"predios": 162,
		"disponibles": 219
	},
	{
		"id": "otros-proyectos-especiales",
		"codigo": "PRY-047",
		"nombre": "Otros proyectos especiales",
		"tipo": "Especiales",
		"coordinacionGeneral": "Coordinación General de Proyectos Viales y Especiales",
		"coordinacionPredial": "Coordinación de Multiproyectos Especiales",
		"coordinadorPredial": "José César Mendoza Soto",
		"liderInterferencias": "Ángel Enrique Reyes Cruz",
		"img": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=70&auto=format&fit=crop",
		"fase": "Saneamiento fisico legal",
		"estado": "En revision",
		"presupuesto": "S/ 52.9 MM",
		"fisico": 39,
		"financiero": 17,
		"predios": 292,
		"disponibles": 101
	}
];
var airportImages = Object.fromEntries([
	"iquitos",
	"trujillo",
	"chachapoyas",
	"chiclayo",
	"tumbes",
	"pucallpa",
	"anta-huaraz",
	"pisco",
	"tarapoto",
	"cajamarca",
	"talara",
	"piura",
	"andahuaylas",
	"ayacucho",
	"juliaca",
	"jauja",
	"puerto-maldonado",
	"tacna",
	"arequipa",
	"caballococha",
	"soplin-vargas",
	"huancabamba-oxapampa",
	"breu"
].map((id) => [id, `/images/airports/${id}.jpg`]));
var proyectos = projectSeed.map((project) => ({
	...project,
	img: airportImages[project.id] ?? project.img
}));
function getProyecto(id) {
	return proyectos.find((p) => p.id === id);
}
//#endregion
//#region src/lib/archivosIdb.ts
/**
* Almacén de archivos del navegador (IndexedDB) compartido: guarda Blobs por clave en una base y un
* almacén con nombre. Lo usan las fotos y las pantallas que guardan PDF o Word en el navegador.
* ponytail: con backend, este módulo se reemplaza por el repositorio documental (M24).
*/
var conexiones = /* @__PURE__ */ new Map();
function abrirVersion(base, almacen, version) {
	return new Promise((resolver, rechazar) => {
		if (typeof indexedDB === "undefined") {
			rechazar(/* @__PURE__ */ new Error("Este navegador no permite guardar archivos."));
			return;
		}
		const req = version ? indexedDB.open(base, version) : indexedDB.open(base);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(almacen)) req.result.createObjectStore(almacen);
		};
		req.onsuccess = () => resolver(req.result);
		req.onerror = () => rechazar(req.error ?? /* @__PURE__ */ new Error("No se pudo abrir el almacén de archivos."));
		req.onblocked = () => rechazar(/* @__PURE__ */ new Error("Cierre las otras pestañas del sistema e inténtelo de nuevo."));
	});
}
/**
* Abre la base en su versión actual (así sirve para las bases que ya existían con otras versiones) y,
* si le falta el almacén pedido, la reabre con una versión más para crearlo.
*/
function abrir(base, almacen) {
	const clave = `${base}/${almacen}`;
	const existente = conexiones.get(clave);
	if (existente) return existente;
	const p = abrirVersion(base, almacen).then((db) => {
		if (db.objectStoreNames.contains(almacen)) return db;
		const siguiente = db.version + 1;
		db.close();
		return abrirVersion(base, almacen, siguiente);
	});
	p.catch(() => conexiones.delete(clave));
	conexiones.set(clave, p);
	return p;
}
function operar(base, almacen, modo, fn) {
	return abrir(base, almacen).then((db) => new Promise((resolver, rechazar) => {
		const tx = db.transaction(almacen, modo);
		const req = fn(tx.objectStore(almacen));
		const fallo = () => rechazar(req.error ?? tx.error ?? /* @__PURE__ */ new Error("Operación de archivo fallida."));
		req.onerror = fallo;
		if (modo === "readwrite") {
			tx.oncomplete = () => resolver(req.result);
			tx.onabort = fallo;
		} else req.onsuccess = () => resolver(req.result);
	}));
}
/** Acceso a un almacén: leer, guardar y borrar un Blob (o cualquier valor clonable) por clave. */
function almacenArchivos(base, almacen = "archivos") {
	return {
		leer: (clave) => operar(base, almacen, "readonly", (s) => s.get(clave)),
		guardar: (clave, valor) => operar(base, almacen, "readwrite", (s) => s.put(valor, clave)),
		borrar: (clave) => operar(base, almacen, "readwrite", (s) => s.delete(clave))
	};
}
//#endregion
export { moneda as _, leerHitos as a, useHitosPredio as c, semaforo as d, vencimiento as f, fechaIso as g, fechaHora as h, estadoPlazo as i, diasHabilesRestantes as l, fecha as m, getProyecto as n, plazoVencido as o, desdeIso as p, proyectos as r, registrarHito as s, almacenArchivos as t, plazo as u, numero as v };
