import { B as routeByKey, F as contextMenuItems, I as estatalMenuItems, N as MENUS, P as bloqueMenuItems, R as mejorasMenuItems } from "./prediosProyecto-D1ASzaVD.js";
import { _ as registrarEnBitacora, c as MENU_PROYECTO, f as moduloPorRuta, l as MODULOS, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { g as lectorActual } from "./anuncios-CchLukSd.js";
import { useSyncExternalStore } from "react";
//#region src/lib/vistas.ts
/** Rutas sin ayuda: acceso, utilidades y el proyecto ajeno. */
var EXCLUIDAS = [
	/^\/$/,
	/^\/login/,
	/^\/acceso/,
	/^\/recuperar/,
	/^\/kit/,
	/^\/tome-main/
];
var normalizarRuta = (ruta) => ruta.length > 1 ? ruta.replace(/\/+$/, "") : ruta;
/** `sinPisar`: el menú privado manda; los otros solo nombran lo que él no tiene. */
function recorrer(items, salida, sinPisar = false) {
	for (const it of items) {
		const ruta = it.key ? routeByKey[it.key] : void 0;
		if (ruta && !(sinPisar && salida.has(normalizarRuta(String(ruta))))) salida.set(normalizarRuta(String(ruta)), it.label.replace(/^\d+(\.\d+)*\s*[·.\-–]?\s*/, "").trim() || it.label);
		if (it.children) recorrer(it.children, salida, sinPisar);
	}
}
var nombres = null;
var moduloDeRuta = null;
function cargarNombres() {
	if (nombres && moduloDeRuta) return;
	nombres = /* @__PURE__ */ new Map();
	moduloDeRuta = /* @__PURE__ */ new Map();
	for (const m of MODULOS) for (const s of m.secciones) for (const p of s.pantallas) {
		const r = normalizarRuta(String(p.to));
		nombres.set(r, p.nombre);
		moduloDeRuta.set(r, m.numero);
	}
	for (const s of MENU_PROYECTO) for (const p of s.pantallas) {
		const r = normalizarRuta(String(p.to));
		nombres.set(r, p.nombre);
		moduloDeRuta.set(r, s.modulo);
	}
	recorrer(contextMenuItems, nombres);
	recorrer(estatalMenuItems, nombres, true);
	recorrer(mejorasMenuItems, nombres, true);
	recorrer(bloqueMenuItems, nombres, true);
	for (const m of Object.values(MENUS)) recorrer(m.transversales.map((t) => ({
		key: t.key,
		label: t.nombre
	})), nombres, true);
}
/** "base-grafica.registro" → "Base grafica registro". Último recurso cuando el menú no nombra la ruta. */
function humanizar(ruta) {
	const t = (ruta.split("/").filter((s) => s && !s.startsWith("$")).pop() ?? ruta).replace(/[-_.]+/g, " ").trim();
	return t.charAt(0).toUpperCase() + t.slice(1);
}
function nombreDeVista(ruta) {
	cargarNombres();
	return nombres.get(normalizarRuta(ruta)) ?? humanizar(ruta);
}
function moduloDeVista(ruta) {
	cargarNombres();
	const r = normalizarRuta(ruta);
	return moduloDeRuta.get(r) ?? moduloPorRuta(r)?.numero ?? (r.includes("$codigo") ? 11 : r.includes("$projectId") ? 10 : 0);
}
function ambitoDeVista(ruta) {
	if (ruta.includes("$codigo")) return "predio";
	if (ruta.includes("$projectId")) return "proyecto";
	return "general";
}
/** Vistas del sistema a partir de las rutas del router (`router.routesByPath`). */
function listarVistas(rutas) {
	cargarNombres();
	const vistas = /* @__PURE__ */ new Map();
	for (const cruda of rutas) {
		const ruta = normalizarRuta(cruda);
		if (EXCLUIDAS.some((re) => re.test(ruta)) || vistas.has(ruta)) continue;
		const modulo = moduloDeVista(ruta);
		vistas.set(ruta, {
			ruta,
			nombre: nombreDeVista(ruta),
			modulo,
			moduloNombre: MODULOS.find((m) => m.numero === modulo)?.nombre ?? "General",
			ambito: ambitoDeVista(ruta)
		});
	}
	return [...vistas.values()].sort((a, b) => a.modulo - b.modulo || a.nombre.localeCompare(b.nombre, "es-PE"));
}
//#endregion
//#region src/lib/manuales.ts
var NOMBRE_ESTADO_AYUDA = {
	BORRADOR: "Borrador",
	PUBLICADO: "Publicado",
	ARCHIVADO: "Archivado"
};
/** Redactan (en borrador) el Administrador y el Coordinador; publica solo el Administrador. */
var puedeRedactarAyuda = (rol) => rol === "ADMIN" || rol === "COORDINADOR";
var puedePublicarAyuda = (rol) => rol === "ADMIN";
/** Tope de un PDF en el prototipo: se guarda en el navegador. Mayores, por enlace. */
var TOPE_PDF = 2 * 1024 * 1024;
var DIAS_VIGENCIA = 365;
var CLAVE = "pdgp-ayudas";
var AYUDAS_EVENTO = "pdgp:ayudas";
var VACIO = [];
var datos = null;
var oyentes = /* @__PURE__ */ new Set();
var ahoraIso = () => (/* @__PURE__ */ new Date()).toISOString();
/** Dos ayudas publicadas de demostración para que el panel y el tutorial se vean desde el primer día. */
function semilla() {
	const base = {
		perfiles: [],
		enlaces: [],
		estado: "PUBLICADO",
		autor: "Administrador del sistema",
		creadoEl: ahoraIso(),
		modificadoEl: ahoraIso(),
		publicadoEl: ahoraIso(),
		semilla: true
	};
	const meta = {
		actualizadoEl: ahoraIso(),
		actualizadoPor: "Administrador del sistema"
	};
	return [
		{
			...base,
			id: "ayuda-sujeto-pasivo",
			vista: "/proyectos/$projectId/predios/$codigo/sujeto-pasivo",
			titulo: "Cómo registrar el sujeto pasivo de un predio",
			manual: {
				...meta,
				contenido: "<p><b>Datos de demostración.</b> Esta pantalla reúne a los titulares del predio, su condición jurídica y sus documentos (art. 6 a 8 del TUO del DL 1192).</p><ol><li>Elija si el predio está inscrito en SUNARP.</li><li>Pulse <b>Añadir titular</b>. Si es persona natural, ingrese el DNI o adjunte la ficha RENIEC: los datos se cargan solos.</li><li>Complete correo, celular y el domicilio para notificaciones.</li><li>Indique la condición jurídica y adjunte los documentos de sustento.</li><li>Cuando la suma de cuotas sea 100 % y cada titular tenga su DNI completo, pulse <b>Registrar sujeto pasivo</b>.</li></ol><p>Cada cambio queda en la pestaña <b>Histórico</b>, con quién lo hizo y cómo estaba el registro antes.</p>"
			},
			videos: [],
			tutorial: {
				...meta,
				pasos: [
					{
						selector: "[data-ayuda=\"encabezado\"]",
						titulo: "Predio y estado",
						texto: "Aquí ve el predio, su estado (borrador o registrado) y las descargas en Excel y PDF."
					},
					{
						selector: "[role=\"tablist\"]",
						titulo: "Registro e histórico",
						texto: "Cambie a Histórico para ver cada versión del registro, compararlas o restaurar una anterior."
					},
					{
						selector: "main table",
						titulo: "Titulares",
						texto: "Cada fila es un titular. Edítelo o elimínelo (con motivo) desde las acciones de la derecha."
					}
				]
			}
		},
		{
			...base,
			id: "ayuda-numeracion",
			vista: "/seguridad/documentos/numeracion",
			titulo: "Cómo se numeran los documentos",
			manual: {
				...meta,
				contenido: "<p><b>Datos de demostración.</b> Cada tipo de documento se numera con una regla. La regla junta piezas en orden: correlativo, año, área emisora, área destino, sigla del subtipo, usuario, proyecto o un texto fijo.</p><ol><li>Elija el tipo y, si hace falta, el subtipo. Una regla de subtipo manda sobre la del tipo.</li><li>Ordene las piezas y mire la vista previa con sus datos.</li><li>Marque por qué datos reinicia el contador. Lo común es año y área emisora.</li><li>Indique desde cuándo rige. Lo emitido antes conserva su número.</li></ol><p>Al generar un documento desde un paso del predio, el sistema pregunta si se numera. El número se reserva al confirmar y nunca se reutiliza: si hay un error, se anula con motivo en <b>Documentos generados</b>.</p><p>Si la numeración en papel ya va adelantada, use <b>Ajustar</b> en Contadores.</p>"
			},
			videos: [],
			tutorial: null
		},
		{
			...base,
			id: "ayuda-documentos-expediente",
			vista: "/seguridad/documentos/expediente",
			titulo: "Qué documentos pide cada paso del predio",
			manual: {
				...meta,
				contenido: "<p><b>Datos de demostración.</b> El catálogo dice qué documentos debe tener cada paso del predio. Sale de la lista de la DDP: cada fila de la lista está en un documento del catálogo.</p><ul><li><b>Genera el sistema</b>: se numera con la regla de Numeración, se firma y se sube firmado.</li><li><b>Recibido</b>: lo emite un tercero (SUNARP, perito, OGA); se registra con su número y fecha.</li><li><b>Cargo</b>: respalda la entrega de un documento generado.</li><li><b>Actividad</b>: un hecho con fecha y resultado.</li></ul><p><b>Requisitos</b> son los documentos que deben estar completos antes de dar código. <b>Cobertura de la lista</b> muestra en rojo las filas sin paso. <b>Fuera del catálogo</b> reúne lo que los predios registraron con «Otro documento»: si se repite, añádalo al catálogo.</p><p>Para cargar una lista nueva use <b>Importar lista CSV</b>: no se guarda hasta que cada fila tenga paso.</p>"
			},
			videos: [],
			tutorial: null
		},
		{
			...base,
			id: "ayuda-identificacion",
			vista: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
			titulo: "Cómo identificar y codificar un predio",
			manual: {
				...meta,
				contenido: "<p><b>Datos de demostración.</b> Cada predio y cada expediente llevan un código único.</p><ul><li><b>Generar</b> asigna el siguiente correlativo libre.</li><li><b>Vincular</b> toma un código que ya existe, si no está asignado a otro predio.</li><li>Valide ambos códigos antes de registrar.</li></ul>"
			},
			videos: [],
			tutorial: null
		}
	];
}
function cargar() {
	if (datos) return datos;
	try {
		const crudo = localStorage.getItem(CLAVE);
		datos = crudo ? JSON.parse(crudo) : semilla();
	} catch {
		datos = semilla();
	}
	return datos;
}
function guardar(nuevo) {
	datos = nuevo;
	try {
		localStorage.setItem(CLAVE, JSON.stringify(nuevo));
	} catch {}
	oyentes.forEach((f) => f());
	if (typeof window !== "undefined") window.dispatchEvent(new Event(AYUDAS_EVENTO));
}
/** Toda la ayuda. En el servidor no hay: las pantallas la muestran al hidratar. */
function useAyudas() {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, cargar, () => VACIO);
}
var idAyuda = () => `ayuda-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
/** La ayuda publicada de una vista que el perfil puede ver (la más reciente si hubiera varias). */
function ayudaPublicada(lista, vista, rol) {
	const v = normalizarRuta(vista);
	return lista.filter((a) => a.estado === "PUBLICADO" && normalizarRuta(a.vista) === v && (a.perfiles.length === 0 || a.perfiles.includes(rol))).sort((a, b) => (b.publicadoEl ?? "").localeCompare(a.publicadoEl ?? ""))[0];
}
/** La ayuda de una vista, en cualquier estado (para la administración). */
function ayudaDeVista(lista, vista) {
	const v = normalizarRuta(vista);
	return lista.find((a) => normalizarRuta(a.vista) === v && a.estado !== "ARCHIVADO");
}
/** Contenido que tiene la ayuda (para las marcas de la lista y las pestañas del panel). */
function contenidoDe(a) {
	return {
		manual: Boolean(a.manual && (a.manual.contenido.trim() || a.manual.pdf)),
		video: a.videos.length > 0,
		tutorial: Boolean(a.tutorial && a.tutorial.pasos.length > 0)
	};
}
/** Más de un año sin actualizar: el panel pide revisar la vigencia. */
function desactualizada(iso, ahora = /* @__PURE__ */ new Date()) {
	const t = Date.parse(iso);
	return Number.isFinite(t) && (ahora.getTime() - t) / 864e5 > DIAS_VIGENCIA;
}
/** Fecha más antigua entre las piezas de la ayuda: la que decide si hay que revisarla. */
function ultimaActualizacion(a) {
	return [
		a.manual?.actualizadoEl,
		a.manual?.pdf?.subidoEl,
		...a.videos.map((v) => v.subidoEl),
		a.tutorial?.actualizadoEl
	].filter((f) => Boolean(f)).sort().at(-1) ?? a.modificadoEl;
}
/** Copia para el histórico sin el contenido binario del PDF (pesa y no aporta al comparar). */
function paraHistorial(a) {
	return {
		...a,
		manual: a.manual ? {
			...a.manual,
			pdf: a.manual.pdf ? {
				...a.manual.pdf,
				url: a.manual.pdf.url.startsWith("data:") ? "(archivo del navegador)" : a.manual.pdf.url
			} : void 0
		} : null
	};
}
/** Guarda una ayuda nueva o editada. Pasar a publicado exige permiso: lo verifica la pantalla. */
function guardarAyuda(nueva, accion, motivo) {
	const lista = cargar();
	const existe = lista.find((a) => a.id === nueva.id);
	const confirmada = {
		...nueva,
		modificadoEl: ahoraIso()
	};
	guardar(existe ? lista.map((a) => a.id === nueva.id ? confirmada : a) : [confirmada, ...lista]);
	registrarCambio(`ayuda-${nueva.id}`, {
		accion,
		objeto: nueva.titulo,
		motivo,
		antes: existe ? paraHistorial(existe) : paraHistorial({
			...confirmada,
			manual: null,
			videos: [],
			tutorial: null
		}),
		despues: paraHistorial(confirmada)
	}, {
		modulo: 8,
		entidad: "ayuda_vista",
		accion: existe ? "editar" : "crear"
	});
	return confirmada;
}
function publicarAyuda(a) {
	return guardarAyuda({
		...a,
		estado: "PUBLICADO",
		publicadoEl: ahoraIso()
	}, "Publicó la ayuda");
}
function archivarAyuda(a, motivo) {
	return guardarAyuda({
		...a,
		estado: "ARCHIVADO"
	}, "Archivó la ayuda", motivo);
}
function eliminarBorradorAyuda(a) {
	if (a.estado !== "BORRADOR") return;
	guardar(cargar().filter((x) => x.id !== a.id));
	registrarEnBitacora({
		modulo: 8,
		entidad: "ayuda_vista",
		registro: a.titulo,
		accion: "eliminar",
		detalle: `Eliminó el borrador de la ayuda de ${a.vista}`
	});
}
/** Documento por enlace. La duración (segundos) es opcional y la informa quien lo sube. */
function documentoDeEnlace(nombre, url, duracion, anterior) {
	return {
		nombre,
		origen: "enlace",
		url,
		duracion,
		subidoEl: ahoraIso(),
		subidoPor: lectorActual(),
		version: (anterior?.version ?? 0) + 1
	};
}
/** PDF cargado en el navegador (hasta TOPE_PDF). Rechaza lo que pese más: va por enlace. */
function documentoDeArchivo(file, anterior) {
	return new Promise((resolver, rechazar) => {
		if (file.size > 2097152) {
			rechazar(/* @__PURE__ */ new Error("El PDF pesa más de 2 MB. Súbalo al repositorio y use el enlace."));
			return;
		}
		const lector = new FileReader();
		lector.onerror = () => rechazar(/* @__PURE__ */ new Error("No se pudo leer el archivo."));
		lector.onload = () => resolver({
			nombre: file.name,
			origen: "archivo",
			url: String(lector.result),
			tamano: file.size,
			subidoEl: ahoraIso(),
			subidoPor: lectorActual(),
			version: (anterior?.version ?? 0) + 1
		});
		lector.readAsDataURL(file);
	});
}
/** Enlace de video → lo que el reproductor necesita: incrustación de YouTube o Vimeo, o archivo directo. */
function descripcionDeVideo(url) {
	const u = url.trim();
	const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
	if (yt) return {
		tipo: "incrustado",
		src: `https://www.youtube-nocookie.com/embed/${yt[1]}`
	};
	const vi = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
	if (vi) return {
		tipo: "incrustado",
		src: `https://player.vimeo.com/video/${vi[1]}`
	};
	if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(u) || u.startsWith("data:video")) return {
		tipo: "archivo",
		src: u
	};
	return {
		tipo: "externo",
		src: u
	};
}
var urlValida = (u) => /^https?:\/\/\S+$/i.test(u.trim());
/** Uso de la ayuda: lo registra la bitácora para saber qué material se consulta y cuál no. */
function registrarUsoAyuda(a, que, detalle) {
	registrarEnBitacora({
		modulo: 8,
		entidad: que === "video" ? "video" : "manual",
		registro: a.vista,
		accion: "acceso",
		detalle: `${que === "video" ? "Reprodujo" : que === "tutorial" ? "Completó el tutorial de" : "Abrió el manual de"} ${a.titulo}${detalle ? `: ${detalle}` : ""}`
	});
}
/** "5 min 30 s" para una duración en segundos. */
function duracionTexto(seg) {
	if (!seg || seg < 1) return "";
	const m = Math.floor(seg / 60);
	const s = Math.round(seg % 60);
	return m ? `${m} min${s ? ` ${s} s` : ""}` : `${s} s`;
}
/** Borrador a partir de lo que el sistema ya sabe de la vista: nombre, módulo y ámbito. */
function borradorDeVista(v, autor) {
	const ahora = ahoraIso();
	const dondeEstoy = v.ambito === "predio" ? "Esta pantalla es un paso del expediente de un predio. Para abrirla, entre al proyecto, elija el predio y use el menú de etapas." : v.ambito === "proyecto" ? "Esta pantalla pertenece a un proyecto. Para abrirla, elija primero el proyecto desde el menú." : `Esta pantalla pertenece al módulo ${v.moduloNombre}.`;
	return {
		id: idAyuda(),
		vista: v.ruta,
		titulo: `Cómo usar: ${v.nombre}`,
		manual: {
			contenido: `<p><b>Borrador generado por el sistema. Revise y complete antes de publicar.</b></p><p>${dondeEstoy}</p><ol><li>Revise los datos que muestra la pantalla.</li><li>Use los filtros o la búsqueda para encontrar el registro.</li><li>Use los botones de acción para agregar, editar o consultar.</li><li>Cada cambio queda en la pestaña <b>Histórico</b>.</li></ol>`,
			actualizadoEl: ahora,
			actualizadoPor: autor
		},
		videos: [],
		tutorial: null,
		perfiles: [],
		enlaces: [],
		estado: "BORRADOR",
		autor,
		creadoEl: ahora,
		modificadoEl: ahora,
		semilla: true
	};
}
/** Crea un borrador por cada vista que aún no tiene ayuda en ningún estado. Devuelve cuántos creó. */
function crearBorradoresFaltantes(vistas, autor) {
	const lista = cargar();
	const conAyuda = new Set(lista.map((a) => normalizarRuta(a.vista)));
	const nuevos = vistas.filter((v) => !conAyuda.has(normalizarRuta(v.ruta))).map((v) => borradorDeVista(v, autor));
	if (nuevos.length === 0) return 0;
	guardar([...nuevos, ...lista]);
	registrarEnBitacora({
		modulo: 8,
		entidad: "ayuda_vista",
		registro: "borradores",
		accion: "generar",
		detalle: `Generó ${nuevos.length} borradores de ayuda para vistas sin manual`
	});
	return nuevos.length;
}
//#endregion
export { listarVistas as C, useAyudas as S, puedePublicarAyuda as _, ayudaPublicada as a, ultimaActualizacion as b, desactualizada as c, documentoDeEnlace as d, duracionTexto as f, publicarAyuda as g, idAyuda as h, ayudaDeVista as i, descripcionDeVideo as l, guardarAyuda as m, TOPE_PDF as n, contenidoDe as o, eliminarBorradorAyuda as p, archivarAyuda as r, crearBorradoresFaltantes as s, NOMBRE_ESTADO_AYUDA as t, documentoDeArchivo as u, puedeRedactarAyuda as v, nombreDeVista as w, urlValida as x, registrarUsoAyuda as y };
