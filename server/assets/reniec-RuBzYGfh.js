import { d as predioRows } from "./prediosProyecto-D1ASzaVD.js";
//#region src/lib/reniec.ts
var ESTADOS = [
	"SOLTERO",
	"CASADO",
	"CASADO",
	"CONVIVIENTE",
	"VIUDO",
	"DIVORCIADO"
];
var DISTRITOS = [
	"Jauja",
	"Yauyos",
	"Sausa",
	"Huertas",
	"Masma",
	"Ataura"
];
var CALLES = [
	"Jr. Junín",
	"Av. Ricardo Palma",
	"Jr. Grau",
	"Jr. Bolognesi",
	"Av. Manco Cápac",
	"Jr. Tarapacá"
];
/** Nombres de personas naturales del padrón (sin empresas ni entidades). */
function nombresPadron() {
	const entidad = /S\.?A\.?C?|E\.?I\.?R\.?L|MUNICIPALIDAD|COMUNIDAD|ESTADO|MINISTERIO|SUCESI|ASOCIACI|IGLESIA|SIN INFORMACION/i;
	return [...new Set(predioRows.map((r) => r.suj).filter((s) => s && !entidad.test(s) && !/,| Y /.test(s) && /^(\S+ ){2,4}\S+$/.test(s)))];
}
var hash = (s) => [...s].reduce((h, c) => h * 31 + c.charCodeAt(0) >>> 0, 7);
/** Devuelve los datos del ciudadano o null si el DNI no existe. Formato: 8 dígitos. */
async function consultarReniec(dni) {
	await new Promise((r) => setTimeout(r, 500));
	if (!/^\d{8}$/.test(dni) || /^0+$/.test(dni)) return null;
	const h = hash(dni);
	const nombres = nombresPadron();
	const año = 2027 + h % 8;
	return {
		numero: dni,
		nombres: nombres.length ? nombres[h % nombres.length] : `CIUDADANO ${dni}`,
		estadoCivil: ESTADOS[h % ESTADOS.length],
		caducidad: `${año}-${String(h % 12 + 1).padStart(2, "0")}-${String(h % 28 + 1).padStart(2, "0")}`,
		domicilio: `${CALLES[h % CALLES.length]} ${100 + h % 900}`,
		distrito: DISTRITOS[(h >> 3) % DISTRITOS.length],
		provincia: "Jauja",
		departamento: "Junín",
		consultadoEl: (/* @__PURE__ */ new Date()).toISOString(),
		simulado: true
	};
}
/** DNI escrito en el nombre del PDF de la ficha (p. ej. "ficha-41234567.pdf"), si lo trae. */
var dniDeArchivo = (nombre) => nombre.match(/(?<!\d)\d{8}(?!\d)/)?.[0] ?? null;
//#endregion
export { dniDeArchivo as n, consultarReniec as t };
