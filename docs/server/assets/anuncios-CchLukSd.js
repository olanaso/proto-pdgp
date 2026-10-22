import { n as getProyecto, t as almacenArchivos } from "./archivosIdb-BbjJAFd8.js";
import { a as prediosDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { i as registrarVersion, r as registrarCambio, u as ROLES } from "./historial-Bc37nCTn.js";
import { n as etiquetaProyecto } from "./PredioEncabezado-FhqZ2Jv6.js";
import { n as reducirImagen } from "./fotoRender-BT_YRQ8T.js";
import { useEffect, useState, useSyncExternalStore } from "react";
//#region src/lib/anuncios.ts
var CLAVE = "pdgp-anuncios";
var VACIO = {
	anuncios: [],
	lecturas: {}
};
var ANUNCIOS_EVENTO = "pdgp:anuncios";
function semilla() {
	const ahora = /* @__PURE__ */ new Date();
	const dia = (d) => isoLocal(new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + d, 8, 0));
	const base = {
		copiaPorCorreo: false,
		autor: "Administrador del sistema",
		creadoEl: dia(-2),
		modificadoEl: dia(-2)
	};
	return {
		anuncios: [
			{
				...base,
				id: "demo-1",
				titulo: "Datos de demostración: corte de registro de devengados",
				mensaje: "<p>Los devengados del mes deben registrarse antes del cierre del <b>SIAF</b>. Después de esa fecha se registran en el periodo siguiente.</p><ul><li>Revise la hoja de ruta de cada resolución.</li><li>Adjunte el comprobante en el expediente del predio.</li></ul>",
				audiencia: "usuarios",
				perfiles: ["TESORERIA", "COORDINADOR"],
				alcance: "todos",
				prioridad: "importante",
				mostrarDesde: dia(-2),
				ocultarEl: dia(10),
				publicadoEl: dia(-2)
			},
			{
				...base,
				id: "demo-2",
				titulo: "Datos de demostración: brigadas de campo en Jauja",
				mensaje: "<p>Las brigadas de empadronamiento trabajarán en el sector 2 durante la semana. Coordine el acceso con el gestor social.</p>",
				audiencia: "usuarios",
				perfiles: [],
				alcance: "jauja",
				prioridad: "normal",
				mostrarDesde: dia(-1),
				ocultarEl: dia(6),
				publicadoEl: dia(-1)
			},
			{
				...base,
				id: "demo-3",
				titulo: "Datos de demostración: atención a sujetos pasivos en Jauja",
				mensaje: "<p>La Dirección de Disponibilidad de Predios atenderá consultas sobre pagos y entrega de posesión en la sede de Jauja, de lunes a viernes de 9:00 a 13:00. Acérquese con su <b>DNI</b> y el código de su predio.</p>",
				audiencia: "sujetos_pasivos",
				perfiles: [],
				alcance: "jauja",
				prioridad: "normal",
				mostrarDesde: dia(-1),
				ocultarEl: dia(20),
				publicadoEl: dia(-1)
			}
		],
		lecturas: {}
	};
}
var datos = null;
var oyentes = /* @__PURE__ */ new Set();
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
	if (typeof window !== "undefined") window.dispatchEvent(new Event(ANUNCIOS_EVENTO));
}
/** Anuncios y lecturas. En el servidor no hay: las pantallas los muestran al hidratar. */
function useAnuncios() {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		const otraPestana = (e) => {
			if (e.key === CLAVE) {
				datos = null;
				f();
			}
		};
		window.addEventListener("storage", otraPestana);
		return () => {
			oyentes.delete(f);
			window.removeEventListener("storage", otraPestana);
		};
	}, cargar, () => VACIO);
}
var dd = (n) => String(n).padStart(2, "0");
/** "aaaa-mm-ddThh:mm" en hora local, el formato de <input type="datetime-local">. */
function isoLocal(d) {
	return `${d.getFullYear()}-${dd(d.getMonth() + 1)}-${dd(d.getDate())}T${dd(d.getHours())}:${dd(d.getMinutes())}`;
}
var aFecha = (iso) => iso ? new Date(iso) : null;
function estadoDe(a, ahora = /* @__PURE__ */ new Date()) {
	if (a.archivadoEl) return "archivado";
	if (!a.publicadoEl) return "borrador";
	const desde = aFecha(a.mostrarDesde);
	const hasta = aFecha(a.ocultarEl);
	if (desde && ahora < desde) return "programado";
	if (hasta && ahora >= hasta) return "vencido";
	return "publicado";
}
var NOMBRE_ESTADO = {
	borrador: "Borrador",
	programado: "Programado",
	publicado: "Publicado",
	vencido: "Vencido",
	archivado: "Archivado"
};
/** Directorio de usuarios de demostración (el mismo de Usuarios en M8): nombre del perfil por usuario. */
var DIRECTORIO = [
	{
		usuario: "juan.perez@proyecto.com",
		perfiles: ["Especialista técnico"]
	},
	{
		usuario: "maria.lopez@proyecto.com",
		perfiles: ["Especialista legal"]
	},
	{
		usuario: "carlos.ramos@proyecto.com",
		perfiles: ["Supervisor / Directivo", "Brigadista de campo"]
	},
	{
		usuario: "luis.nunez@proyecto.com",
		perfiles: ["Especialista técnico"]
	},
	{
		usuario: "patricia.gomez@proyecto.com",
		perfiles: ["Coordinador de proyecto"]
	},
	{
		usuario: "bim@mtc.gob.pe",
		perfiles: ["Administrador del sistema"]
	}
];
/** Cuántos deberían leerlo: usuarios del directorio con alguno de los perfiles, o sujetos pasivos del padrón. */
function destinatarios(a) {
	if (a.audiencia === "sujetos_pasivos") return new Set(prediosDelProyecto(a.alcance).flatMap((p) => p.sujetos)).size;
	if (a.perfiles.length === 0) return DIRECTORIO.length;
	const nombres = a.perfiles.map((r) => ROLES[r]);
	return DIRECTORIO.filter((u) => u.perfiles.some((p) => nombres.includes(p))).length;
}
/** Anuncios vigentes para un perfil (usuarios); con `projectId`, solo los de ese proyecto. */
function vigentesParaUsuario(lista, rol, projectId, ahora = /* @__PURE__ */ new Date()) {
	return ordenar(lista.filter((a) => a.audiencia === "usuarios" && estadoDe(a, ahora) === "publicado" && (a.perfiles.length === 0 || a.perfiles.includes(rol)) && (projectId ? a.alcance === projectId : true)));
}
/** Anuncios para sujetos pasivos de los proyectos donde el DNI tiene predios. */
function vigentesParaSujeto(lista, proyectos, ahora = /* @__PURE__ */ new Date()) {
	return ordenar(lista.filter((a) => a.audiencia === "sujetos_pasivos" && estadoDe(a, ahora) === "publicado" && (a.alcance === "todos" || proyectos.includes(a.alcance))));
}
/** Importantes primero; luego el más reciente. */
function ordenar(lista) {
	return [...lista].sort((a, b) => Number(b.prioridad === "importante") - Number(a.prioridad === "importante") || (b.mostrarDesde || b.publicadoEl || "").localeCompare(a.mostrarDesde || a.publicadoEl || ""));
}
function leido(d, id, quien) {
	return (d.lecturas[id] ?? []).some((l) => l.quien === quien);
}
function marcarLeido(id, quien) {
	const d = cargar();
	if (leido(d, id, quien)) return;
	guardar({
		...d,
		lecturas: {
			...d.lecturas,
			[id]: [...d.lecturas[id] ?? [], {
				quien,
				fecha: isoLocal(/* @__PURE__ */ new Date())
			}]
		}
	});
}
/** Clave del histórico de un anuncio: una versión por cada guardado, publicación o archivo. */
var claveHistorialAnuncio = (id) => `anuncio-${id}`;
var BITACORA_ANUNCIO = {
	modulo: 8,
	entidad: "anuncio"
};
var idAnuncio = () => `anuncio-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
/** Crea o actualiza. Con `publicar`, deja de ser borrador (queda programado o publicado según las fechas). */
function guardarAnuncio(a, publicar) {
	const d = cargar();
	const ahora = isoLocal(/* @__PURE__ */ new Date());
	const existe = d.anuncios.some((x) => x.id === a.id);
	const final = {
		...a,
		modificadoEl: ahora,
		publicadoEl: publicar ? a.publicadoEl ?? ahora : a.publicadoEl
	};
	guardar({
		...d,
		anuncios: existe ? d.anuncios.map((x) => x.id === a.id ? final : x) : [final, ...d.anuncios]
	});
	const anterior = d.anuncios.find((x) => x.id === a.id);
	const accion = publicar ? "Publicó el anuncio" : anterior ? "Guardó cambios del anuncio" : "Creó el anuncio";
	const objeto = `${final.titulo} (${NOMBRE_ESTADO[estadoDe(final)]})`;
	const clave = claveHistorialAnuncio(final.id);
	if (anterior) registrarCambio(clave, {
		accion,
		objeto,
		antes: anterior,
		despues: final
	}, BITACORA_ANUNCIO);
	else registrarVersion(clave, {
		accion,
		objeto,
		registro: final
	}, BITACORA_ANUNCIO);
	return final;
}
function copiarAnuncio(a, autor) {
	const ahora = isoLocal(/* @__PURE__ */ new Date());
	const copia = {
		...a,
		id: idAnuncio(),
		titulo: `Copia de ${a.titulo}`,
		autor,
		creadoEl: ahora,
		modificadoEl: ahora,
		publicadoEl: void 0,
		archivadoEl: void 0
	};
	const d = cargar();
	guardar({
		...d,
		anuncios: [copia, ...d.anuncios]
	});
	registrarVersion(claveHistorialAnuncio(copia.id), {
		accion: "Creó el anuncio",
		objeto: `Copia de «${a.titulo}»`,
		registro: copia
	}, BITACORA_ANUNCIO);
	return copia;
}
function archivarAnuncio(a) {
	const d = cargar();
	const archivado = {
		...d.anuncios.find((x) => x.id === a.id) ?? a,
		archivadoEl: isoLocal(/* @__PURE__ */ new Date())
	};
	guardar({
		...d,
		anuncios: d.anuncios.map((x) => x.id === a.id ? archivado : x)
	});
	registrarCambio(claveHistorialAnuncio(a.id), {
		accion: "Archivó el anuncio",
		objeto: a.titulo,
		antes: a,
		despues: archivado
	}, BITACORA_ANUNCIO);
}
/** Solo borradores: un anuncio ya mostrado se archiva. */
function eliminarBorrador(a, motivo) {
	if (a.publicadoEl) return;
	const d = cargar();
	guardar({
		...d,
		anuncios: d.anuncios.filter((x) => x.id !== a.id)
	});
	registrarCambio(claveHistorialAnuncio(a.id), {
		accion: "Eliminó el borrador",
		objeto: a.titulo,
		motivo,
		antes: a,
		despues: a
	}, BITACORA_ANUNCIO);
}
function publicarAhora(a) {
	const d = cargar();
	const ahora = isoLocal(/* @__PURE__ */ new Date());
	const publicado = {
		...d.anuncios.find((x) => x.id === a.id) ?? a,
		mostrarDesde: ahora,
		modificadoEl: ahora
	};
	guardar({
		...d,
		anuncios: d.anuncios.map((x) => x.id === a.id ? publicado : x)
	});
	registrarCambio(claveHistorialAnuncio(a.id), {
		accion: "Publicó de inmediato",
		objeto: a.titulo,
		antes: a,
		despues: publicado
	}, BITACORA_ANUNCIO);
}
/** Vuelve un anuncio a una versión anterior del histórico y lo registra como versión nueva. */
function restaurarAnuncio(registro, version) {
	const d = cargar();
	const anterior = d.anuncios.find((x) => x.id === registro.id);
	const final = {
		...registro,
		modificadoEl: isoLocal(/* @__PURE__ */ new Date())
	};
	guardar({
		...d,
		anuncios: anterior ? d.anuncios.map((x) => x.id === final.id ? final : x) : [final, ...d.anuncios]
	});
	registrarCambio(claveHistorialAnuncio(final.id), {
		accion: "Restauró una versión anterior",
		objeto: `versión ${version}`,
		antes: anterior ?? registro,
		despues: final
	}, BITACORA_ANUNCIO);
	return final;
}
/** Redactan el Administrador y el Coordinador; el resto solo lee. */
var puedeRedactar = (rol) => rol === "ADMIN" || rol === "COORDINADOR";
/** Quién lee: el correo de la sesión; los sujetos pasivos, su DNI enmascarado. */
function lectorActual() {
	try {
		return localStorage.getItem("mtc-session") || "usuario sin sesión";
	} catch {
		return "usuario sin sesión";
	}
}
var lectorSujeto = (dni) => `DNI ****${dni.slice(-4)}`;
var archivosAnuncio = almacenArchivos("pdgp-anuncios-archivos");
/** Lado mayor de las imágenes guardadas: alcanza para la ventana y no llena el navegador. */
var LADO_IMAGEN = 1600;
var esImagen = (a) => a.tipo.startsWith("image/");
/** Guarda un archivo del anuncio (las imágenes, reducidas a 1600 px). Lanza un Error para mostrar. */
async function guardarArchivoAnuncio(archivo) {
	if (archivo.size > 10485760) throw new Error(`«${archivo.name}» pesa más de 10 MB.`);
	const id = `anu-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
	let blob = archivo;
	if (archivo.type.startsWith("image/") && !archivo.type.includes("svg")) try {
		blob = (await reducirImagen(archivo, LADO_IMAGEN, .85)).blob;
	} catch {}
	await archivosAnuncio.guardar(id, blob);
	return {
		id,
		nombre: archivo.name,
		tipo: blob.type || archivo.type,
		tamano: blob.size
	};
}
var leerArchivoAnuncio = (id) => archivosAnuncio.leer(id).catch(() => void 0);
/** URL de objeto del archivo (para `<img>` o abrirlo); se libera al desmontar. */
function useUrlArchivoAnuncio(id) {
	const [url, setUrl] = useState();
	useEffect(() => {
		if (!id) return;
		let vivo = true;
		let creada;
		leerArchivoAnuncio(id).then((b) => {
			if (!vivo || !b) return;
			creada = URL.createObjectURL(b);
			setUrl(creada);
		});
		return () => {
			vivo = false;
			if (creada) URL.revokeObjectURL(creada);
			setUrl(void 0);
		};
	}, [id]);
	return url;
}
async function descargarArchivoAnuncio(a) {
	const b = await leerArchivoAnuncio(a.id);
	if (!b) return;
	const url = URL.createObjectURL(b);
	const enlace = document.createElement("a");
	enlace.href = url;
	enlace.download = a.nombre;
	enlace.click();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
/** "1,2 MB", "340 KB". */
var pesoArchivo = (bytes) => bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
/** Enlace del botón de acción: web, correo o una pantalla del sistema. */
var urlBotonValida = (url) => /^(https?:\/\/|mailto:|\/)/i.test(url.trim());
var ETIQUETAS = /* @__PURE__ */ new Set([
	"B",
	"STRONG",
	"I",
	"EM",
	"U",
	"UL",
	"OL",
	"LI",
	"P",
	"BR",
	"A",
	"DIV",
	"SPAN",
	"IMG"
]);
/** Deja solo el formato que permite el editor; quita atributos salvo enlaces http, https o mailto. */
function sanear(html) {
	if (typeof DOMParser === "undefined") return "";
	const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
	const limpiar = (nodo) => {
		[...nodo.children].forEach((hijo) => {
			if (!ETIQUETAS.has(hijo.tagName)) {
				hijo.replaceWith(...[...hijo.childNodes]);
				return limpiar(nodo);
			}
			const href = hijo.tagName === "A" ? hijo.getAttribute("href") ?? "" : "";
			if (hijo.tagName === "IMG") {
				const archivo = hijo.getAttribute("data-archivo") ?? "";
				const alt = hijo.getAttribute("alt") ?? "";
				[...hijo.attributes].forEach((at) => hijo.removeAttribute(at.name));
				if (!/^anu-[a-z0-9]+$/.test(archivo)) {
					hijo.remove();
					return;
				}
				hijo.setAttribute("data-archivo", archivo);
				hijo.setAttribute("alt", alt);
				return;
			}
			[...hijo.attributes].forEach((at) => hijo.removeAttribute(at.name));
			if (/^(https?:|mailto:)/i.test(href)) {
				hijo.setAttribute("href", href);
				hijo.setAttribute("target", "_blank");
				hijo.setAttribute("rel", "noopener noreferrer");
			}
			limpiar(hijo);
		});
	};
	const raiz = doc.body.firstElementChild;
	limpiar(raiz);
	return raiz.innerHTML;
}
/** Texto plano del mensaje (extracto en listas, recuento de palabras). */
function textoPlano(html) {
	return html.replace(/<\/(p|li|div)>/gi, " ").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
/** "Usuarios · Tesorería" o "Sujetos pasivos". */
function audienciaTexto(a) {
	if (a.audiencia === "sujetos_pasivos") return "Sujetos pasivos";
	return a.perfiles.length ? `Usuarios · ${a.perfiles.map((r) => ROLES[r]).join(", ")}` : "Usuarios · todos los perfiles";
}
function alcanceTexto(alcance) {
	return alcance === "todos" ? "Todos los proyectos" : etiquetaProyecto(getProyecto(alcance), alcance);
}
//#endregion
export { vigentesParaSujeto as A, puedeRedactar as C, urlBotonValida as D, textoPlano as E, useAnuncios as O, publicarAhora as S, sanear as T, lectorSujeto as _, claveHistorialAnuncio as a, marcarLeido as b, destinatarios as c, estadoDe as d, guardarAnuncio as f, lectorActual as g, isoLocal as h, audienciaTexto as i, vigentesParaUsuario as j, useUrlArchivoAnuncio as k, eliminarBorrador as l, idAnuncio as m, alcanceTexto as n, copiarAnuncio as o, guardarArchivoAnuncio as p, archivarAnuncio as r, descargarArchivoAnuncio as s, NOMBRE_ESTADO as t, esImagen as u, leerArchivoAnuncio as v, restaurarAnuncio as w, pesoArchivo as x, leido as y };
