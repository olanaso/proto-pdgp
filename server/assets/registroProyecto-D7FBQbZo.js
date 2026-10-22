import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { _ as leerCapas, d as estiloInicial, f as guardarCapas, g as idCapa, t as CAPAS_OBLIGATORIAS } from "./capas-B7cJ7zRJ.js";
//#region src/lib/registroProyecto.ts
/**
* Registro del proyecto (M10): nace de la solicitud que llega por la Mesa de Partes (STD) y alimenta a
* las demás pantallas del proyecto: la evaluación de información recibe sus documentos y polígonos, y
* la base gráfica genera de él sus capas obligatorias.
*/
/** Documentos que acompañan la solicitud en el STD: el registro del proyecto nace de ellos. */
function documentosStd(hr, tipo, numero) {
	const base = (numero || hr).replace(/[^A-Z0-9-]/gi, "_");
	const semilla = [...hr].reduce((a, c) => a + c.charCodeAt(0), 0);
	return [
		{
			id: `std-${hr}-1`,
			nombre: `${tipo.toUpperCase()}_${base}.pdf`,
			tipo: "PDF",
			tamano: `${600 + semilla % 400} KB`,
			origen: "STD"
		},
		{
			id: `std-${hr}-2`,
			nombre: `INFORME_TECNICO_${base}.pdf`,
			tipo: "PDF",
			tamano: `${1 + semilla % 4},${semilla * 7 % 10} MB`,
			origen: "STD"
		},
		{
			id: `std-${hr}-3`,
			nombre: `PLANO_UBICACION_${base}.dwg`,
			tipo: "DWG",
			tamano: `${2 + semilla % 6},${semilla * 3 % 10} MB`,
			origen: "STD"
		},
		{
			id: `std-${hr}-4`,
			nombre: `RELACION_PREDIOS_${base}.xlsx`,
			tipo: "Excel",
			tamano: `${90 + semilla % 200} KB`,
			origen: "STD"
		}
	].slice(0, 2 + semilla % 3);
}
/** Polígonos de la obra adjuntos a la solicitud: nacen en el STD y se importan al proyecto. */
function poligonosStd(hr) {
	const semilla = [...hr].reduce((a, c) => a + c.charCodeAt(0), 0);
	const n = 1 + semilla % 3;
	return Array.from({ length: n }, (_, i) => ({
		id: `pol-${hr}-${i + 1}`,
		codigo: `POL-${String(i + 1).padStart(2, "0")}`,
		descripcion: [
			"Área de influencia directa",
			"Franja de vía",
			"Área complementaria"
		][i],
		areaHa: `${((12 + semilla * (i + 3) % 180) / 10 + 1).toFixed(1).replace(".", ",")} ha`,
		archivo: `POLIGONO_${i + 1}_${hr.replace(/[^A-Z0-9-]/gi, "_")}.kml`
	}));
}
var claveHistorial = (id) => `registro-proyecto-${id}`;
/**
* Registro simulado para los proyectos sembrados que aún no pasaron por M10: la misma solicitud STD
* que vería el usuario al registrarlos. ponytail: con backend, el registro siempre existe.
*/
function registroSembrado(projectId) {
	const p = getProyecto(projectId);
	if (!p) return void 0;
	const hr = `E-0${p.codigo.replace(/\D/g, "").padStart(5, "0")}-2026`;
	const numero = `MEMO-${p.codigo.replace(/\D/g, "")}-2026-MTC/DGPRCS`;
	const poligonos = poligonosStd(hr);
	return {
		id: p.id,
		codigo: p.codigo,
		nombre: p.nombre,
		hojaRuta: hr,
		solicitante: p.tipo === "Aeroportuarios" ? "DGIS" : "DINTRA",
		docOrigenTipo: "Memorando",
		docOrigenNumero: numero,
		docOrigenFecha: "2026-01-15",
		coordinadorPredial: p.coordinadorPredial,
		estado: "Registrado",
		adjuntos: documentosStd(hr, "Memorando", numero),
		poligonos,
		capasObligatorias: {
			DELIMITACION: `std:${poligonos[0].id}`,
			CONCESION: `std:${(poligonos[1] ?? poligonos[0]).id}`
		}
	};
}
/** Última versión guardada del registro: por id de proyecto o, si se registró sin id, por código. */
function registroGuardado(projectId) {
	try {
		const directo = JSON.parse(localStorage.getItem(`pdgp-historial-${claveHistorial(projectId)}`) ?? "[]");
		if (directo[0]) return directo[0].registro;
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i) ?? "";
			if (!k.startsWith("pdgp-historial-registro-proyecto-")) continue;
			const r = JSON.parse(localStorage.getItem(k) ?? "[]")[0]?.registro;
			if (r && (r.id === projectId || r.codigo.toLowerCase() === projectId)) return r;
		}
	} catch {}
}
var leerRegistroProyecto = (projectId) => registroGuardado(projectId) ?? registroSembrado(projectId);
/** Registro del proyecto reactivo a los guardados hechos en M10 con el id del proyecto. */
function useRegistroProyecto(projectId) {
	return useHistorial(claveHistorial(projectId))[0]?.registro ?? leerRegistroProyecto(projectId);
}
/**
* Lleva las capas obligatorias del registro a la base gráfica como capas base en borrador. Devuelve
* cuántas creó (0 si ya existen o el registro no las trae).
*/
function generarCapasObligatorias(projectId, r, usuario) {
	const existentes = leerCapas(projectId);
	const nuevas = CAPAS_OBLIGATORIAS.filter((o) => r.capasObligatorias[o.clave] && r.capasObligatorias[o.clave] !== "std:propio" && !existentes.some((c) => c.activa && c.obligatoria === o.clave)).map((o, i) => {
		const origen = r.capasObligatorias[o.clave];
		const poligono = r.poligonos.find((x) => `std:${x.id}` === origen);
		const nombreArchivo = poligono?.archivo ?? origen.replace(/^archivo:/, "");
		return {
			id: idCapa(),
			proyecto: projectId,
			nombre: o.nombre,
			abrev: o.clave.slice(0, 3),
			categoria: o.categoria,
			descripcion: o.detalle,
			fuente: poligono ? `Solicitud STD ${r.hojaRuta}` : "Archivo cargado en el registro del proyecto",
			fechaDatos: r.docOrigenFecha,
			responsable: r.coordinadorPredial || "Coordinación Predial",
			confiabilidad: "MEDIA",
			geometria: o.geometria,
			origen: {
				tipo: "ARCHIVO",
				formato: nombreArchivo.split(".").pop()?.toUpperCase() ?? "KML",
				nombreArchivo
			},
			crsOriginal: "EPSG:4326",
			entidades: 1,
			extension: null,
			campos: [],
			estilo: estiloInicial(o.geometria, existentes.length + i),
			estado: "BORRADOR",
			controles: [],
			observaciones: "Generada desde el registro del proyecto; pendiente de revisión en la Base gráfica.",
			revisadoPor: "",
			publicar: false,
			version: 1,
			orden: existentes.length + i,
			visible: true,
			activa: true,
			creadoEl: (/* @__PURE__ */ new Date()).toISOString(),
			clase: "BASE",
			obligatoria: o.clave
		};
	});
	if (nuevas.length) guardarCapas(projectId, [...existentes, ...nuevas], "Generó capas obligatorias del registro", usuario);
	return nuevas.length;
}
//#endregion
export { useRegistroProyecto as i, generarCapasObligatorias as n, poligonosStd as r, documentosStd as t };
