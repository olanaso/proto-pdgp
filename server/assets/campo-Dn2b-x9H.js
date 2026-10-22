import { r as proyectos, t as almacenArchivos } from "./archivosIdb-BbjJAFd8.js";
import { t as idsAsignadosAlPerfil } from "./asignacion-Bv9JWe8m.js";
import { Et as reservarNumero, Q as registrarGenerado, Tt as reglaVigente, bt as leerReglas, h as leerSujetoPasivo, i as TIPO_DOCUMENTO, m as idSP, v as titularVacio, xt as leerTipos } from "./sujetoPasivo-Cz4oBCnt.js";
import { n as leerComunicacion } from "./comunicacionAfectacion-DI8RFukP.js";
import { n as leerEmpadronamiento } from "./empadronamiento-BwTjGigO.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { i as readProjectBrigades, n as getUsuarioEquipo } from "./projectTeamsData-D-Nygxw-.js";
import { useEffect, useState, useSyncExternalStore } from "react";
//#region src/lib/campo.ts
var NOMBRE_TIPO_CAMPO = {
	padron: "Ficha de padrón",
	"sujeto-pasivo": "Sujeto pasivo",
	notificacion: "Notificación y cargo",
	empadronamiento: "Empadronamiento e inspección",
	caracterizacion: "Caracterización del predio"
};
var fichaPadronVacia = (numero) => ({
	numero,
	lat: "",
	lon: "",
	precision: "",
	distrito: "",
	sector: "",
	referencia: "",
	condicionPredio: "",
	tipoPredio: "",
	areaM2: "",
	uso: "",
	sujetoPasivo: "",
	tipoPersona: "",
	tipoDocumento: "DNI",
	numeroDocumento: "",
	condicionSujeto: "",
	telefono: "",
	hayOcupante: null,
	ocupante: "",
	dniOcupante: "",
	norte: "",
	sur: "",
	este: "",
	oeste: "",
	observaciones: "",
	seNegoFirmar: null,
	motivoNegativa: ""
});
var siNo = (v) => v == null ? "" : v ? "Sí" : "No";
/** La ficha en grupos etiqueta/valor (resumen en pantalla y acta en PDF). `paso` = paso del asistente. */
function gruposFichaPadron(d) {
	return [
		{
			titulo: "Ubicación",
			paso: 0,
			filas: [
				["Posición", d.lat && d.lon ? `${d.lat}, ${d.lon}${d.precision ? ` (±${d.precision} m)` : ""}` : ""],
				["Distrito", d.distrito],
				["Sector o localidad", d.sector],
				["Referencia", d.referencia]
			]
		},
		{
			titulo: "El predio",
			paso: 1,
			filas: [
				["Condición", d.condicionPredio],
				["Tipo", d.tipoPredio],
				["Área estimada", d.areaM2 ? `${d.areaM2} m²` : ""],
				["Uso actual", d.uso]
			]
		},
		{
			titulo: "Sujeto pasivo",
			paso: 2,
			filas: [
				["Nombre o razón social", d.sujetoPasivo],
				["Tipo de persona", d.tipoPersona],
				["Documento", d.numeroDocumento ? `${d.tipoDocumento} ${d.numeroDocumento}` : ""],
				["Condición", d.condicionSujeto],
				["Teléfono", d.telefono]
			]
		},
		{
			titulo: "Ocupación y linderos",
			paso: 3,
			filas: [
				["Ocupante distinto del titular", siNo(d.hayOcupante)],
				...d.hayOcupante ? [["Ocupante", `${d.ocupante}${d.dniOcupante ? ` · DNI ${d.dniOcupante}` : ""}`]] : [],
				["Norte", d.norte],
				["Sur", d.sur],
				["Este", d.este],
				["Oeste", d.oeste],
				["Observaciones", d.observaciones]
			]
		},
		{
			titulo: "Firma del acta",
			paso: 4,
			filas: [["Se negó a firmar", siNo(d.seNegoFirmar)], ...d.seNegoFirmar ? [["Motivo", d.motivoNegativa]] : []]
		}
	];
}
var CLAVE = "pdgp-campo-registros";
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
	datos = nuevo;
	try {
		localStorage.setItem(CLAVE, JSON.stringify(nuevo));
	} catch {}
	oyentes.forEach((f) => f());
}
function useRegistrosCampo() {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, cargar, () => VACIO);
}
var leerRegistrosCampo = () => typeof localStorage === "undefined" ? VACIO : cargar();
function sesionCampo() {
	try {
		return localStorage.getItem("mtc-session") || "";
	} catch {
		return "";
	}
}
var oyentesSesion = /* @__PURE__ */ new Set();
/** Correo de la sesión (la misma del sistema). null mientras se hidrata: aún no se sabe. */
function useSesionCampo() {
	return useSyncExternalStore((f) => {
		oyentesSesion.add(f);
		return () => {
			oyentesSesion.delete(f);
		};
	}, sesionCampo, () => null);
}
function iniciarSesionCampo(correo) {
	try {
		localStorage.setItem("mtc-session", correo);
	} catch {}
	oyentesSesion.forEach((f) => f());
}
function cerrarSesionCampo() {
	try {
		localStorage.removeItem("mtc-session");
	} catch {}
	oyentesSesion.forEach((f) => f());
}
/** Deja constancia de lo guardado en campo (queda pendiente de envío). Devuelve el registro. */
function anotarRegistro(r) {
	const nuevo = {
		...r,
		id: `rc-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
		usuario: sesionCampo(),
		guardadoEl: (/* @__PURE__ */ new Date()).toISOString()
	};
	guardar([nuevo, ...cargar()]);
	return nuevo;
}
/**
* «Enviar al sistema»: marca los registros como enviados y deja un envío por cada uno (historial de envíos
* y bitácora). Los datos ya están en el expediente; esto registra que salieron del campo.
*/
function enviarRegistros(ids) {
	const ahora = (/* @__PURE__ */ new Date()).toISOString();
	const lista = cargar();
	const aEnviar = lista.filter((r) => ids.includes(r.id) && !r.enviadoEl);
	for (const r of aEnviar) registrarEnvio({
		proyecto: r.projectId,
		predio: r.predio,
		paso: "recolector-campo",
		canal: "Recolector de campo",
		destinatario: "Sistema PDGP",
		documento: r.acta ?? r.titulo,
		resultado: "aceptado",
		detalle: `${NOMBRE_TIPO_CAMPO[r.tipo]} · ${r.titulo}${r.fotos ? ` · ${plural(r.fotos, "foto", "fotos")}` : ""}`
	}, {
		modulo: 30,
		entidad: "recolector_campo"
	});
	guardar(lista.map((r) => aEnviar.includes(r) ? {
		...r,
		enviadoEl: ahora
	} : r));
	return aEnviar.length;
}
var esDeHoy = (iso) => iso.slice(0, 10) === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
/** Número correlativo de la siguiente ficha de padrón del proyecto: FP-0001. */
function siguienteNumeroFicha(projectId) {
	const n = cargar().filter((r) => r.projectId === projectId && r.tipo === "padron").length + 1;
	return `FP-${String(n).padStart(4, "0")}`;
}
/**
* El sujeto pasivo de un predio que nació de una ficha de padrón de campo: lo que ya se preguntó en la
* primera visita (documento, celular, condición, ocupante) no se vuelve a pedir.
*/
function sujetoPasivoDesdeFicha(r, codigo) {
	const ficha = leerRegistrosCampo().find((x) => x.tipo === "padron" && x.predio === codigo)?.ficha;
	if (!ficha || !ficha.sujetoPasivo.trim()) return r;
	const base = r.titulares[0] ?? titularVacio();
	const tipoDocumento = ficha.tipoDocumento in TIPO_DOCUMENTO ? ficha.tipoDocumento : base.tipoDocumento;
	const titular = {
		...base,
		nombres: ficha.sujetoPasivo.trim().toUpperCase(),
		tipoPersona: ficha.tipoPersona === "JURIDICA" ? "JURIDICA" : ficha.tipoPersona === "COMUNIDAD" ? "COMUNIDAD_CAMPESINA" : base.tipoPersona,
		tipoDocumento,
		numero: ficha.numeroDocumento || base.numero,
		celular: ficha.telefono || base.celular,
		condicion: ficha.condicionSujeto === "POSEEDOR" ? "POSEEDOR_10" : base.condicion
	};
	const ocupantes = ficha.hayOcupante && ficha.ocupante.trim() && !r.ocupantes.length ? [{
		id: idSP(),
		nombres: ficha.ocupante.trim().toUpperCase(),
		dni: ficha.dniOcupante,
		relacion: "",
		notificadoEl: ""
	}] : r.ocupantes;
	return {
		...r,
		titulares: [titular, ...r.titulares.slice(1)],
		ocupantes
	};
}
/**
* Proyectos donde el usuario figura en una brigada. Si no figura en ninguna (demostración), todos, con
* `sinBrigada` para avisarlo.
* ponytail: brigadas de demostración; con backend, la asignación del usuario al proyecto.
*/
function proyectosAsignados(nombreUsuario, rol) {
	const nombre = nombreUsuario.trim().toLowerCase();
	const todos = proyectos.map((p) => {
		let brigada;
		for (const b of readProjectBrigades(p.id)) {
			const yo = b.integrantes.find((i) => getUsuarioEquipo(i.usuarioId)?.nombre.toLowerCase() === nombre);
			if (yo) brigada = `${b.nombre} · ${yo.rol}`;
		}
		return {
			id: p.id,
			codigo: p.codigo,
			nombre: p.nombre,
			tipo: p.tipo,
			brigada
		};
	});
	const mios = todos.filter((p) => p.brigada);
	if (mios.length) return {
		lista: mios,
		sinBrigada: false
	};
	const ids = rol ? idsAsignadosAlPerfil(rol) : null;
	return ids ? {
		lista: todos.filter((p) => ids.includes(p.id)),
		sinBrigada: false
	} : {
		lista: todos,
		sinBrigada: true
	};
}
/** "1 titular", "3 titulares". */
var plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
/**
* Situación de los cuatro bloques de campo de un predio, leída de los registros del escritorio. La
* caracterización cuenta lo levantado en campo (las listas del escritorio traen filas de demostración).
*/
function estadoBloques(codigo, responsable = "") {
	const sp = leerSujetoPasivo(codigo);
	const titulares = sp?.titulares.filter((t) => t.nombres.trim()) ?? [];
	const conDocumento = titulares.filter((t) => t.numero.trim()).length;
	const comVigentes = (leerComunicacion(codigo, responsable).comunicaciones ?? []).filter((c) => c.estado === "vigente").length;
	const emp = (leerEmpadronamiento(codigo).realizaciones ?? []).filter((r) => r.estado === "vigente").length;
	const filas = cargar().filter((r) => r.predio === codigo && r.tipo === "caracterizacion").length;
	return {
		"sujeto-pasivo": !sp || titulares.length === 0 ? {
			estado: "pendiente",
			texto: "Pendiente"
		} : conDocumento === titulares.length ? {
			estado: "completo",
			texto: plural(titulares.length, "titular", "titulares")
		} : {
			estado: "curso",
			texto: `${conDocumento} de ${titulares.length} con documento`
		},
		notificacion: comVigentes ? {
			estado: "completo",
			texto: plural(comVigentes, "comunicación", "comunicaciones")
		} : {
			estado: "pendiente",
			texto: "Pendiente"
		},
		empadronamiento: emp ? {
			estado: "completo",
			texto: plural(emp, "empadronamiento", "empadronamientos")
		} : {
			estado: "pendiente",
			texto: "Pendiente"
		},
		caracterizacion: filas ? {
			estado: "curso",
			texto: `${plural(filas, "registro", "registros")} de campo`
		} : {
			estado: "pendiente",
			texto: "Pendiente"
		}
	};
}
var ultima = null;
var oyentesGps = /* @__PURE__ */ new Set();
/** Última posición tomada en esta sesión (la comparten la cabecera y los formularios). */
function useUltimaPosicion() {
	return useSyncExternalStore((f) => {
		oyentesGps.add(f);
		return () => {
			oyentesGps.delete(f);
		};
	}, () => ultima, () => null);
}
/** Pide la posición al equipo (alta precisión). Rechaza con un texto para mostrar. */
function tomarPosicion() {
	return new Promise((resolver, rechazar) => {
		if (typeof navigator === "undefined" || !navigator.geolocation) {
			rechazar(new Error(SIN_GPS));
			return;
		}
		navigator.geolocation.getCurrentPosition((p) => resolver(anotarPosicion(p)), (e) => rechazar(new Error(mensajeGps(e))), {
			enableHighAccuracy: true,
			timeout: 2e4,
			maximumAge: 3e4
		});
	});
}
/**
* Sigue la posición del equipo (mapa de campo): cada lectura actualiza la última posición que comparten
* la cabecera y los formularios. Devuelve la función que deja de seguirla.
*/
function seguirPosicion(onError) {
	if (typeof navigator === "undefined" || !navigator.geolocation) {
		onError(SIN_GPS);
		return () => void 0;
	}
	const id = navigator.geolocation.watchPosition((p) => {
		anotarPosicion(p);
		onError("");
	}, (e) => onError(mensajeGps(e)), {
		enableHighAccuracy: true,
		timeout: 2e4,
		maximumAge: 5e3
	});
	return () => navigator.geolocation.clearWatch(id);
}
var SIN_GPS = "Este equipo no tiene GPS disponible. Escriba las coordenadas.";
function anotarPosicion(p) {
	ultima = {
		lat: Number(p.coords.latitude.toFixed(6)),
		lon: Number(p.coords.longitude.toFixed(6)),
		precision: Math.round(p.coords.accuracy),
		hora: (/* @__PURE__ */ new Date()).toISOString()
	};
	oyentesGps.forEach((f) => f());
	return ultima;
}
var mensajeGps = (e) => e.code === e.PERMISSION_DENIED ? "El permiso de ubicación está bloqueado. Actívelo en el navegador o escriba las coordenadas." : "No se obtuvo la posición. Salga a cielo abierto e intente de nuevo.";
/** Polígono del margen de precisión alrededor de un punto (para dibujarlo en el mapa). */
function circuloPrecision(lon, lat, radioM, lados = 48) {
	const dLat = radioM / 111320;
	const dLon = radioM / (111320 * Math.cos(lat * Math.PI / 180));
	return {
		type: "Polygon",
		coordinates: [Array.from({ length: lados + 1 }, (_, i) => {
			const a = i / lados * 2 * Math.PI;
			return [lon + dLon * Math.cos(a), lat + dLat * Math.sin(a)];
		})]
	};
}
/** Distancia en metros entre dos puntos (haversine). */
function distanciaM(a, b) {
	const R = 6371e3;
	const rad = (g) => g * Math.PI / 180;
	const dLat = rad(b.lat - a.lat);
	const dLon = rad(b.lon - a.lon);
	const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(h));
}
/** Hay conexión (para el indicador de la cabecera; el recolector funciona igual sin ella). */
function useEnLinea() {
	return useSyncExternalStore((f) => {
		window.addEventListener("online", f);
		window.addEventListener("offline", f);
		return () => {
			window.removeEventListener("online", f);
			window.removeEventListener("offline", f);
		};
	}, () => navigator.onLine, () => true);
}
/**
* Estado de un asistente que sobrevive a cerrar la pestaña por accidente (sessionStorage). Se carga
* después de montar, como el resto del sistema, para no romper la hidratación.
*/
function useBorrador(clave, inicial) {
	const [valor, setValor] = useState(inicial);
	const [cargado, setCargado] = useState(false);
	useEffect(() => {
		try {
			const crudo = sessionStorage.getItem(clave);
			if (crudo) setValor({
				...inicial,
				...JSON.parse(crudo)
			});
		} catch {}
		setCargado(true);
	}, [clave]);
	useEffect(() => {
		if (!cargado) return;
		try {
			sessionStorage.setItem(clave, JSON.stringify(valor));
		} catch {}
	}, [
		clave,
		valor,
		cargado
	]);
	const limpiar = () => {
		try {
			sessionStorage.removeItem(clave);
		} catch {}
	};
	return [
		valor,
		setValor,
		limpiar
	];
}
/** Mismo almacén de archivos que usa «Generar documento» (el PDF numerado queda en el registro). */
var archivosDocumentos = almacenArchivos("pdgp-documentos-archivos", "archivos");
/**
* Emite un acta levantada en campo: reserva el correlativo del tipo Acta (solo número, área DDP), arma el
* PDF con lo registrado y lo deja en el expediente del predio (folio provisional si aún no tiene
* expediente). Devuelve el número y el ítem del expediente.
*/
async function emitirActaCampo(a) {
	const regla = reglaVigente(leerReglas(), "acta", a.subtipoId);
	if (!regla) throw new Error("El tipo Acta no tiene regla de numeración vigente (M8).");
	const usuario = a.usuario ?? {
		id: "sin-usuario",
		nombre: sesionCampo() || "Usuario de campo"
	};
	const nombreArchivo = `${a.titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${a.predio}.pdf`;
	const documento = reservarNumero(regla, leerTipos().find((t) => t.id === "acta"), {
		usuario,
		areaEmisoraId: "ddp",
		subtipoId: a.subtipoId,
		projectId: a.projectId,
		predios: [a.predio],
		fecha: /* @__PURE__ */ new Date()
	}, {
		tipoId: "acta",
		asunto: `${a.titulo} · predio ${a.predio}`,
		origen: {
			ruta: a.ruta,
			pantalla: a.paso,
			paso: a.paso
		},
		archivo: nombreArchivo
	});
	const blob = await actaPdf(a.titulo, documento.numero, a.predio, usuario.nombre, a.grupos);
	archivosDocumentos.guardar(documento.id, blob).catch(() => void 0);
	const item = await registrarGenerado({
		projectId: a.projectId,
		predio: a.predio,
		expediente: void 0,
		paso: a.paso,
		ruta: a.ruta
	}, {
		catalogoId: a.catalogoId,
		nombreLibre: a.titulo,
		tipoId: "acta",
		subtipoId: a.subtipoId,
		documento,
		blob,
		nombreArchivo
	});
	return {
		numero: documento.numero,
		item
	};
}
/** PDF del acta: encabezado del MTC, número, y los datos por grupo; espacio de firmas al pie. */
async function actaPdf(titulo, numero, predio, responsable, grupos) {
	const { jsPDF } = await import("jspdf");
	const pdf = new jsPDF({
		unit: "mm",
		format: "a4"
	});
	let y = 20;
	const salto = (alto) => {
		if (y + alto > 280) {
			pdf.addPage();
			y = 20;
		}
	};
	pdf.setFont("helvetica", "bold");
	pdf.setFontSize(13);
	pdf.setTextColor(200, 16, 46);
	pdf.text("MINISTERIO DE TRANSPORTES Y COMUNICACIONES", 20, y);
	y += 6;
	pdf.setFontSize(10);
	pdf.setTextColor(31, 41, 55);
	pdf.text("Dirección de Disponibilidad de Predios", 20, y);
	y += 10;
	pdf.setFontSize(12);
	pdf.text(numero, 20, y);
	y += 6;
	pdf.text(titulo.toUpperCase(), 20, y);
	y += 6;
	pdf.setFont("helvetica", "normal");
	pdf.setFontSize(9);
	pdf.setTextColor(75, 85, 99);
	pdf.text(`Predio ${predio} · ${(/* @__PURE__ */ new Date()).toLocaleString("es-PE")} · Responsable: ${responsable}`, 20, y);
	y += 4;
	for (const g of grupos) {
		salto(14);
		y += 6;
		pdf.setFont("helvetica", "bold");
		pdf.setFontSize(10);
		pdf.setTextColor(139, 26, 26);
		pdf.text(g.titulo.toUpperCase(), 20, y);
		pdf.setDrawColor(200, 16, 46);
		pdf.line(20, y + 1.5, 190, y + 1.5);
		y += 7;
		pdf.setTextColor(31, 41, 55);
		for (const [k, v] of g.filas) {
			const texto = pdf.splitTextToSize(v?.trim() ? v : "—", 115);
			salto(texto.length * 5);
			pdf.setFont("helvetica", "bold");
			pdf.text(k, 20, y);
			pdf.setFont("helvetica", "normal");
			pdf.text(texto, 75, y);
			y += texto.length * 5 + 1;
		}
	}
	salto(40);
	y += 25;
	pdf.line(25, y, 90, y);
	pdf.line(120, y, 185, y);
	pdf.setFontSize(9);
	pdf.text("Responsable de la DDP", 35, y + 5);
	pdf.text("Titular u ocupante", 135, y + 5);
	return pdf.output("blob");
}
//#endregion
export { useSesionCampo as C, useRegistrosCampo as S, siguienteNumeroFicha as _, distanciaM as a, useBorrador as b, esDeHoy as c, gruposFichaPadron as d, iniciarSesionCampo as f, sesionCampo as g, seguirPosicion as h, circuloPrecision as i, estadoBloques as l, proyectosAsignados as m, anotarRegistro as n, emitirActaCampo as o, plural as p, cerrarSesionCampo as r, enviarRegistros as s, NOMBRE_TIPO_CAMPO as t, fichaPadronVacia as u, sujetoPasivoDesdeFicha as v, useUltimaPosicion as w, useEnLinea as x, tomarPosicion as y };
