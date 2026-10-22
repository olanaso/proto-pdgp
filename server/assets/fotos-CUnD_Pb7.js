import { n as getProyecto, t as almacenArchivos } from "./archivosIdb-BbjJAFd8.js";
import { r as registrarCambio } from "./historial-Bc37nCTn.js";
import { h as estampaPorDefecto, n as reducirImagen, r as renderizarFoto, t as LADO_MAXIMO, u as ajustesBase } from "./fotoRender-BT_YRQ8T.js";
import { g as lectorActual } from "./anuncios-CchLukSd.js";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
//#region src/lib/exif.ts
var TAG = {
	make: 271,
	model: 272,
	orientation: 274,
	dateTime: 306,
	exifIfd: 34665,
	gpsIfd: 34853,
	dateTimeOriginal: 36867,
	gpsLatRef: 1,
	gpsLat: 2,
	gpsLonRef: 3,
	gpsLon: 4,
	gpsAltRef: 5,
	gpsAlt: 6
};
function leerIfd(v, tiff, offset, le) {
	const mapa = /* @__PURE__ */ new Map();
	if (tiff + offset + 2 > v.byteLength) return mapa;
	const n = v.getUint16(tiff + offset, le);
	for (let i = 0; i < n; i++) {
		const e = tiff + offset + 2 + i * 12;
		if (e + 12 > v.byteLength) break;
		mapa.set(v.getUint16(e, le), {
			tipo: v.getUint16(e + 2, le),
			cuenta: v.getUint32(e + 4, le),
			valorOffset: v.getUint32(e + 8, le),
			offsetEntrada: e + 8
		});
	}
	return mapa;
}
var TAMANO_TIPO = {
	1: 1,
	2: 1,
	3: 2,
	4: 4,
	5: 8,
	7: 1,
	9: 4,
	10: 8
};
/** Dónde están los datos: dentro de la entrada si caben en 4 bytes, si no en el offset. */
var datos$1 = (tiff, e) => (TAMANO_TIPO[e.tipo] ?? 1) * e.cuenta <= 4 ? e.offsetEntrada : tiff + e.valorOffset;
function texto(v, tiff, e) {
	if (!e || e.tipo !== 2) return void 0;
	const ini = datos$1(tiff, e);
	let s = "";
	for (let i = 0; i < e.cuenta && ini + i < v.byteLength; i++) {
		const c = v.getUint8(ini + i);
		if (c === 0) break;
		s += String.fromCharCode(c);
	}
	return s.trim() || void 0;
}
function racionales(v, tiff, le, e) {
	if (!e || e.tipo !== 5) return [];
	const ini = tiff + e.valorOffset;
	const out = [];
	for (let i = 0; i < e.cuenta; i++) {
		const p = ini + i * 8;
		if (p + 8 > v.byteLength) break;
		const num = v.getUint32(p, le);
		const den = v.getUint32(p + 4, le);
		out.push(den ? num / den : 0);
	}
	return out;
}
function corto(v, le, e) {
	if (!e) return void 0;
	if (e.tipo === 3) return v.getUint16(e.offsetEntrada, le);
	if (e.tipo === 4) return v.getUint32(e.offsetEntrada, le);
	if (e.tipo === 1) return v.getUint8(e.offsetEntrada);
}
var grados = ([g = 0, m = 0, s = 0]) => g + m / 60 + s / 3600;
/** Lee el EXIF de los bytes de un JPEG. Nunca lanza: ante un archivo raro devuelve lo que pudo leer. */
function leerExif(buffer) {
	try {
		const v = new DataView(buffer);
		if (v.byteLength < 4 || v.getUint16(0) !== 65496) return {};
		let p = 2;
		while (p + 4 < v.byteLength) {
			const marca = v.getUint16(p);
			const largo = v.getUint16(p + 2);
			if (marca === 65505 && v.getUint32(p + 4) === 1165519206) {
				const tiff = p + 10;
				const le = v.getUint16(tiff) === 18761;
				const ifd0 = leerIfd(v, tiff, v.getUint32(tiff + 4, le), le);
				const out = {};
				const make = texto(v, tiff, ifd0.get(TAG.make));
				const model = texto(v, tiff, ifd0.get(TAG.model));
				if (make || model) out.camara = model && make && model.startsWith(make) ? model : [make, model].filter(Boolean).join(" ");
				out.orientacion = corto(v, le, ifd0.get(TAG.orientation));
				let fechaHora = texto(v, tiff, ifd0.get(TAG.dateTime));
				const exifPtr = ifd0.get(TAG.exifIfd);
				if (exifPtr) fechaHora = texto(v, tiff, leerIfd(v, tiff, exifPtr.valorOffset, le).get(TAG.dateTimeOriginal)) ?? fechaHora;
				const m = fechaHora?.match(/^(\d{4}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
				if (m) {
					out.fecha = `${m[1]}-${m[2]}-${m[3]}`;
					out.hora = `${m[4]}:${m[5]}:${m[6]}`;
				}
				const gpsPtr = ifd0.get(TAG.gpsIfd);
				if (gpsPtr) {
					const g = leerIfd(v, tiff, gpsPtr.valorOffset, le);
					const lat = racionales(v, tiff, le, g.get(TAG.gpsLat));
					const lon = racionales(v, tiff, le, g.get(TAG.gpsLon));
					if (lat.length === 3 && lon.length === 3 && (lat[0] || lon[0])) {
						const latRef = texto(v, tiff, g.get(TAG.gpsLatRef)) ?? String.fromCharCode(v.getUint8(g.get(TAG.gpsLatRef)?.offsetEntrada ?? 0));
						const lonRef = texto(v, tiff, g.get(TAG.gpsLonRef)) ?? String.fromCharCode(v.getUint8(g.get(TAG.gpsLonRef)?.offsetEntrada ?? 0));
						out.lat = grados(lat) * (latRef === "S" ? -1 : 1);
						out.lon = grados(lon) * (lonRef === "W" ? -1 : 1);
					}
					const alt = racionales(v, tiff, le, g.get(TAG.gpsAlt))[0];
					if (alt != null) {
						const ref = g.get(TAG.gpsAltRef);
						out.altitud = Math.round(alt * (ref && v.getUint8(ref.offsetEntrada) === 1 ? -1 : 1));
					}
				}
				return out;
			}
			if (marca === 65498) break;
			p += 2 + largo;
		}
		return {};
	} catch {
		return {};
	}
}
//#endregion
//#region src/lib/utm.ts
var A = 6378137;
var F = 1 / 298.257223563;
var K0 = .9996;
var E2 = F * (2 - F);
var EP2 = E2 / (1 - E2);
function aUtm(lat, lon) {
	const zonaNum = Math.min(60, Math.floor((lon + 180) / 6) + 1);
	const lon0 = ((zonaNum - 1) * 6 - 180 + 3) * (Math.PI / 180);
	const phi = lat * (Math.PI / 180);
	const lambda = lon * (Math.PI / 180);
	const sin = Math.sin(phi);
	const cos = Math.cos(phi);
	const tan = Math.tan(phi);
	const n = A / Math.sqrt(1 - E2 * sin * sin);
	const t = tan * tan;
	const c = EP2 * cos * cos;
	const a = cos * (lambda - lon0);
	const m = A * ((1 - E2 / 4 - 3 * E2 * E2 / 64 - 5 * E2 ** 3 / 256) * phi - (.0025145938766266565 + 45 * E2 ** 3 / 1024) * Math.sin(2 * phi) + (15 * E2 * E2 / 256 + 45 * E2 ** 3 / 1024) * Math.sin(4 * phi) - 35 * E2 ** 3 / 3072 * Math.sin(6 * phi));
	const este = K0 * n * (a + (1 - t + c) * a ** 3 / 6 + (5 - 18 * t + t * t + 72 * c - 58 * EP2) * a ** 5 / 120) + 5e5;
	let norte = K0 * (m + n * tan * (a * a / 2 + (5 - t + 9 * c + 4 * c * c) * a ** 4 / 24 + (61 - 58 * t + t * t + 600 * c - 330 * EP2) * a ** 6 / 720));
	if (lat < 0) norte += 1e7;
	return {
		zona: `${zonaNum}${lat < 0 ? "S" : "N"}`,
		este: Math.round(este),
		norte: Math.round(norte)
	};
}
/** "500 000" con espacio de miles, como en los planos. */
var miles = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
/** "UTM 18S 446 012 E · 8 693 450 N" */
var utmTexto = (u) => `UTM ${u.zona} ${miles(u.este)} E · ${miles(u.norte)} N`;
//#endregion
//#region src/lib/fotos.ts
/**
* Almacén de fotos: el original reducido y la miniatura en IndexedDB (`pdgp-fotos`); los datos de cada
* foto (metadatos, ajustes, estampa, anotaciones, versión) en localStorage. Cada cambio deja versión en
* el histórico `foto-{id}` y entrada en la bitácora de M8.
* ponytail: en el navegador; con backend, repositorio documental (M24) y tablas.
*/
var archivos = almacenArchivos("pdgp-fotos");
var CLAVE = "pdgp-fotos-datos";
var CLAVE_CONFIG = "pdgp-fotos-config";
var CLAVE_KM = "pdgp-fotos-km";
var LADO_MINIATURA = 480;
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
/** Lectura fuera de React (al guardar un registro). */
var leerFotos = () => typeof localStorage === "undefined" ? VACIO : cargar();
/** Todas las fotos del navegador (filtrar en la pantalla). En el servidor no hay. */
function useFotos() {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, cargar, () => VACIO);
}
var fotosDe = (lista, c) => lista.filter((f) => Object.keys(c).every((k) => c[k] === void 0 || f[k] === c[k]));
/** Copia para el histórico: todos los datos de la foto (los archivos no viajan). */
var instantanea = (f) => ({ ...f });
var BITACORA = (f) => ({
	modulo: f.modulo,
	entidad: "foto"
});
function configPorDefecto(proyecto) {
	const p = getProyecto(proyecto);
	return {
		marcaAgua: {
			visible: true,
			texto: `MTC · DDP${p ? ` · ${p.nombre.toUpperCase()}` : ""}`,
			posicion: "diagonal",
			tamano: 60,
			opacidad: 45
		},
		estampaAuto: true,
		estampa: estampaPorDefecto(),
		marcaAguaAuto: false
	};
}
var configs = null;
var oyentesConfig = /* @__PURE__ */ new Set();
var VACIO_CONFIG = {};
function cargarConfigs() {
	if (configs) return configs;
	try {
		configs = JSON.parse(localStorage.getItem(CLAVE_CONFIG) ?? "{}");
	} catch {
		configs = {};
	}
	return configs;
}
function leerConfigFotos(proyecto) {
	return {
		...configPorDefecto(proyecto),
		...cargarConfigs()[proyecto] ?? {}
	};
}
function useConfigFotos(proyecto) {
	const todas = useSyncExternalStore((f) => {
		oyentesConfig.add(f);
		return () => {
			oyentesConfig.delete(f);
		};
	}, cargarConfigs, () => VACIO_CONFIG);
	return {
		...configPorDefecto(proyecto),
		...todas[proyecto] ?? {}
	};
}
function guardarConfigFotos(proyecto, c) {
	const antes = leerConfigFotos(proyecto);
	configs = {
		...cargarConfigs(),
		[proyecto]: c
	};
	try {
		localStorage.setItem(CLAVE_CONFIG, JSON.stringify(configs));
	} catch {}
	oyentesConfig.forEach((f) => f());
	registrarCambio(`config-fotos-${proyecto}`, {
		accion: "Guardó la configuración de fotos",
		objeto: proyecto,
		antes,
		despues: c
	}, {
		modulo: 8,
		entidad: "configuracion_fotos"
	});
}
/** Último km usado en el predio: la siguiente foto lo hereda. */
function kmDelPredio(predio) {
	try {
		return JSON.parse(localStorage.getItem(CLAVE_KM) ?? "{}")[predio] ?? "";
	} catch {
		return "";
	}
}
function recordarKm(predio, km) {
	if (!km) return;
	try {
		const m = JSON.parse(localStorage.getItem(CLAVE_KM) ?? "{}");
		m[predio] = km;
		localStorage.setItem(CLAVE_KM, JSON.stringify(m));
	} catch {}
}
var idFoto = () => `foto-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
/**
* Sube una foto: lee el EXIF, la endereza y reduce a 4000 px, guarda original y miniatura, y aplica la
* estampa y la marca de agua del proyecto si están en automático.
*/
async function subirFoto(archivo, c, titulo, gps) {
	if (!archivo.type.startsWith("image/") && !/\.(heic|heif)$/i.test(archivo.name)) throw new Error(`«${archivo.name}» no es una imagen.`);
	if (archivo.size > 15728640) throw new Error(`«${archivo.name}» pesa más de 15 MB.`);
	const exif = /jpe?g$/i.test(archivo.type) || /\.jpe?g$/i.test(archivo.name) ? leerExif(await archivo.arrayBuffer()) : {};
	if (gps && (exif.lat == null || exif.lon == null)) Object.assign(exif, gps);
	const { blob, ancho, alto } = await reducirImagen(archivo, LADO_MAXIMO);
	const utm = exif.lat != null && exif.lon != null ? utmTexto(aUtm(exif.lat, exif.lon)) : "";
	const config = leerConfigFotos(c.proyecto);
	const ahora = (/* @__PURE__ */ new Date()).toISOString();
	const quien = lectorActual();
	const tieneDatos = Boolean(exif.fecha || utm);
	const foto = {
		...c,
		id: idFoto(),
		titulo: titulo || c.campo,
		original: {
			nombre: archivo.name,
			tipo: archivo.type || "image/jpeg",
			tamano: archivo.size,
			ancho,
			alto,
			subidoEl: ahora,
			subidoPor: quien
		},
		metadatos: {
			fecha: exif.fecha ?? "",
			hora: exif.hora ?? "",
			lat: exif.lat,
			lon: exif.lon,
			utm,
			altitud: exif.altitud,
			camara: exif.camara,
			km: kmDelPredio(c.predio),
			origen: tieneDatos ? "exif" : "sin_datos",
			corregidos: [],
			leido: {
				fecha: exif.fecha,
				hora: exif.hora,
				utm: utm || void 0
			}
		},
		ajustes: ajustesBase(),
		estampa: config.estampaAuto ? {
			...config.estampa,
			visible: true
		} : null,
		marcaAgua: config.marcaAguaAuto ? {
			...config.marcaAgua,
			visible: true
		} : null,
		anotaciones: [],
		version: 1,
		modificadoEl: ahora,
		modificadoPor: quien
	};
	await archivos.guardar(`${foto.id}:original`, blob);
	await archivos.guardar(`${foto.id}:miniatura`, await renderizarFoto(foto, blob, LADO_MINIATURA, .82));
	guardar([...cargar(), foto]);
	registrarCambio(`foto-${foto.id}`, {
		accion: "Subió la foto",
		objeto: `${foto.titulo} · ${archivo.name}`,
		antes: {
			...instantanea(foto),
			anotaciones: [],
			estampa: null,
			marcaAgua: null
		},
		despues: instantanea(foto)
	}, BITACORA(foto));
	return foto;
}
/** Pasa al predio definitivo las fotos de un registro tomadas antes de que el predio tuviera código. */
function reasignarFotos(registro, predio) {
	const lista = cargar();
	if (!lista.some((f) => f.registro === registro)) return;
	guardar(lista.map((f) => f.registro === registro ? {
		...f,
		predio
	} : f));
}
/** Guarda la edición (Aplicar): sube la versión, regenera la miniatura y deja versión en el histórico. */
async function aplicarEdicion(nueva, accion = "Editó la foto", objeto) {
	const antes = cargar().find((f) => f.id === nueva.id);
	const confirmada = {
		...nueva,
		version: (antes?.version ?? nueva.version) + 1,
		modificadoEl: (/* @__PURE__ */ new Date()).toISOString(),
		modificadoPor: lectorActual()
	};
	const original = await leerOriginal(nueva.id);
	if (original) await archivos.guardar(`${nueva.id}:miniatura`, await renderizarFoto(confirmada, original, LADO_MINIATURA, .82));
	guardar(cargar().map((f) => f.id === nueva.id ? confirmada : f));
	recordarKm(confirmada.predio, confirmada.metadatos.km);
	avisarMiniatura(nueva.id);
	registrarCambio(`foto-${nueva.id}`, {
		accion,
		objeto: objeto ?? `${confirmada.titulo} · versión ${confirmada.version}`,
		antes: antes ? instantanea(antes) : instantanea(nueva),
		despues: instantanea(confirmada)
	}, BITACORA(confirmada));
	return confirmada;
}
/** Quita la foto (con motivo). Los archivos se borran; los datos quedan en el histórico. */
async function quitarFoto(f, motivo) {
	guardar(cargar().filter((x) => x.id !== f.id));
	registrarCambio(`foto-${f.id}`, {
		accion: "Quitó la foto",
		objeto: f.titulo,
		motivo,
		antes: instantanea(f),
		despues: {
			...instantanea(f),
			version: -1
		}
	}, BITACORA(f));
	await archivos.borrar(`${f.id}:original`).catch(() => void 0);
	await archivos.borrar(`${f.id}:miniatura`).catch(() => void 0);
}
var leerOriginal = (id) => archivos.leer(`${id}:original`).catch(() => void 0);
var leerMiniatura = (id) => archivos.leer(`${id}:miniatura`).catch(() => void 0);
var versionMiniatura = /* @__PURE__ */ new Map();
var oyentesMiniatura = /* @__PURE__ */ new Set();
function avisarMiniatura(id) {
	versionMiniatura.set(id, (versionMiniatura.get(id) ?? 0) + 1);
	oyentesMiniatura.forEach((f) => f());
}
/** URL de objeto de la miniatura u original; se libera al desmontar. */
function useUrlFoto(id, cual) {
	const [url, setUrl] = useState();
	useEffect(() => {
		if (!id) return;
		let vivo = true;
		let creada;
		(cual === "miniatura" ? leerMiniatura(id) : leerOriginal(id)).then((b) => {
			if (!vivo || !b) return;
			creada = URL.createObjectURL(b);
			setUrl(creada);
		});
		return () => {
			vivo = false;
			if (creada) URL.revokeObjectURL(creada);
		};
	}, [
		id,
		cual,
		useSyncExternalStore((f) => {
			oyentesMiniatura.add(f);
			return () => {
				oyentesMiniatura.delete(f);
			};
		}, () => id ? versionMiniatura.get(id) ?? 0 : 0, () => 0)
	]);
	return url;
}
/** Descarga la foto editada (JPEG a tamaño completo) o el original. */
async function descargarFoto(f, cual) {
	const original = await leerOriginal(f.id);
	if (!original) return void 0;
	return cual === "original" ? original : renderizarFoto(f, original);
}
/** Nombre de archivo de una foto: "AERO-JAUJA-PR-0567T_viviendas_Foto-frente_v3.jpg". */
var nombreArchivoFoto = (f, cual) => `${f.predio}_${f.seccion}_${f.titulo}`.replace(/[^\w.-]+/g, "-").replace(/-+/g, "-") + (cual === "editada" ? `_v${f.version}` : "_original") + ".jpg";
/** Borra sin dejar rastro de negocio las fotos de un registro que no llegó a guardarse (alta cancelada). */
async function descartarFotos(c) {
	const huerfanas = fotosDe(cargar(), c);
	if (!huerfanas.length) return;
	guardar(cargar().filter((f) => !huerfanas.includes(f)));
	for (const f of huerfanas) {
		await archivos.borrar(`${f.id}:original`).catch(() => void 0);
		await archivos.borrar(`${f.id}:miniatura`).catch(() => void 0);
	}
}
/**
* Referencia de fotos para un registro que se está creando en un modal: las fotos se suben con esa
* referencia; `confirmar()` al guardar el registro. Si el modal se cierra sin confirmar, se descartan.
*/
function useFotosDelRegistro(c, prefijo) {
	const [ref] = useState(() => `${prefijo}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`);
	const confirmado = useRef(false);
	useEffect(() => () => {
		if (!confirmado.current) descartarFotos({
			predio: c.predio,
			pantalla: c.pantalla,
			registro: ref
		});
	}, []);
	return {
		ref,
		confirmar: () => {
			confirmado.current = true;
		}
	};
}
/** Registro de las fotos de una fila: la referencia guardada en la fila o, en filas antiguas, su posición. */
var refDeFila = (seccion, fila, indice) => fila.fotoRef ?? `${seccion}-${indice + 1}`;
//#endregion
export { useFotosDelRegistro as _, fotosDe as a, utmTexto as b, leerFotos as c, quitarFoto as d, reasignarFotos as f, useFotos as g, useConfigFotos as h, descartarFotos as i, leerOriginal as l, subirFoto as m, configPorDefecto as n, guardarConfigFotos as o, refDeFila as p, descargarFoto as r, leerConfigFotos as s, aplicarEdicion as t, nombreArchivoFoto as u, useUrlFoto as v, aUtm as y };
