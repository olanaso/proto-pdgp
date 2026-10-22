import { t as almacenArchivos } from "./archivosIdb-BbjJAFd8.js";
import { r as registrarCambio } from "./historial-Bc37nCTn.js";
import { useSyncExternalStore } from "react";
//#region src/lib/capas.ts
var NOMBRE_CLASE = {
	BASE: "Capas base (obligatorias)",
	PROYECTO: "Capas del proyecto",
	AUXILIAR: "Capas auxiliares"
};
var DETALLE_CLASE = {
	BASE: "Sin ellas no se puede delimitar la adquisición de predios",
	PROYECTO: "Información propia del proyecto (catastro, interferencias, PMD)",
	AUXILIAR: "Referencia de otras entidades (riesgos, ANP, patrimonio, límites)"
};
/**
* Capas que todo proyecto debe tener registradas y aprobadas en su base gráfica: sin ellas no hay
* sobre qué delimitar la adquisición de predios. Faltar una dispara la alerta en todas las pantallas
* del proyecto y de sus predios.
*/
var CAPAS_OBLIGATORIAS = [{
	clave: "DELIMITACION",
	nombre: "Delimitación del proyecto",
	detalle: "Polígono del área del proyecto sobre la que se adquieren los predios (PMD aprobado).",
	geometria: "POLIGONO",
	categoria: "Sector transporte"
}, {
	clave: "CONCESION",
	nombre: "Área de concesión",
	detalle: "Polígono del área entregada en concesión.",
	geometria: "POLIGONO",
	categoria: "Sector transporte"
}];
/** Situación de cada capa obligatoria del proyecto. Una aprobada gana sobre las pendientes. */
/**
* Proyectos cuyos polígonos de delimitación y concesión ya vienen con el sistema (capas del sistema).
* ponytail: con backend, cada proyecto trae sus polígonos y esta lista desaparece.
*/
var CON_POLIGONOS_PROPIOS = /* @__PURE__ */ new Set(["jauja"]);
var tienePoligonosPropios = (projectId) => CON_POLIGONOS_PROPIOS.has(projectId);
function estadoObligatorias(capas, projectId) {
	const propios = projectId ? tienePoligonosPropios(projectId) : false;
	return CAPAS_OBLIGATORIAS.map((o) => {
		const candidatas = capas.filter((c) => c.activa && c.obligatoria === o.clave);
		const aprobada = candidatas.find((c) => c.estado === "APROBADA");
		const capa = aprobada ?? candidatas[0];
		return {
			clave: o.clave,
			nombre: o.nombre,
			detalle: o.detalle,
			estado: aprobada || propios ? "OK" : capa ? "PENDIENTE" : "FALTA",
			capa
		};
	});
}
var claseDe = (c) => c.clase ?? "PROYECTO";
var NOMBRE_ESTADO_CAPA = {
	BORRADOR: "Borrador",
	EN_REVISION: "En revisión",
	APROBADA: "Aprobada",
	OBSERVADA: "Observada"
};
var NOMBRE_GEOMETRIA = {
	PUNTO: "Punto",
	LINEA: "Línea",
	POLIGONO: "Polígono",
	MIXTA: "Mixta",
	RASTER: "Ráster"
};
/** Catálogo de categorías de la base gráfica (antes, los grupos de demostración). */
var CATEGORIAS_CAPA = [
	"Cartografía de riesgos",
	"Catastro de áreas naturales protegidas",
	"Catastro de patrimonio cultural",
	"Catastro de predios",
	"Catastro forestal",
	"Límites político administrativos",
	"Proyectos multimodales - Interferencias",
	"Proyectos multimodales - Predios",
	"Recursos naturales e infraestructura",
	"Sector transporte",
	"Sector energía",
	"Otras"
];
/** Simbología inicial por geometría (colores de la capa en el mapa, no de la interfaz). */
var PALETA = [
	"#2563eb",
	"#16a34a",
	"#d97706",
	"#9333ea",
	"#dc2626",
	"#0891b2",
	"#db2777"
];
function estiloInicial(geometria, n = 0) {
	const color = PALETA[n % PALETA.length];
	return {
		relleno: color,
		borde: geometria === "POLIGONO" ? "#1e293b" : color,
		grosor: geometria === "LINEA" ? 3 : 1.5,
		opacidad: geometria === "POLIGONO" ? .35 : .9,
		tamanoPunto: 6,
		formaPunto: "CIRCULO",
		tipoLinea: "CONTINUA",
		etiqueta: ""
	};
}
/** Agregan, editan, aprueban u observan: Administrador, Coordinador y Especialista técnico. */
var puedeGestionarCapas = (rol) => rol === "ADMIN" || rol === "COORDINADOR" || rol === "ESP_TECNICO";
var clave = (proyecto) => `pdgp-capas-${proyecto}`;
var VACIA = [];
var cache = /* @__PURE__ */ new Map();
var oyentes = /* @__PURE__ */ new Set();
var datosIdb = almacenArchivos("pdgp-capas");
/**
* Capas del sistema: se ven en el Mapa del proyecto y en la Base gráfica, no se editan. Las claves son
* las de `layerVisibility` de MapView. Las dos obligatorias nacen del registro del proyecto; predios,
* predio matriz y áreas remanentes se generan a medida que se registra cada predio y su cuadro de
* datos técnicos.
*/
var CAPAS_SISTEMA = [
	{
		id: "pmd",
		nombre: "Delimitación del proyecto (PMD)",
		detalle: "Del registro del proyecto"
	},
	{
		id: "concesion",
		nombre: "Área de concesión",
		detalle: "Del registro del proyecto"
	},
	{
		id: "predios",
		nombre: "Predios",
		detalle: "Por etapa, al registrar cada predio"
	},
	{
		id: "matriz",
		nombre: "Predio matriz",
		detalle: "Al registrar el cuadro de datos técnicos"
	},
	{
		id: "remanentes",
		nombre: "Áreas remanentes",
		detalle: "Al registrar el cuadro de datos técnicos"
	},
	{
		id: "puntos",
		nombre: "Predios sin polígono (puntos)",
		detalle: "Registrados solo con coordenada; apagada por defecto"
	}
];
/**
* Capas complementarias de demostración (clase AUXILIAR) con que arranca todo proyecto sin capas:
* áreas protegidas, patrimonio, puntos de control y red vial, dibujadas alrededor del padrón de Jauja.
* ponytail: con backend, llegan de los servicios WFS del MTC, SERNANP y el IGN.
*/
function semillaComplementarias(proyecto) {
	const [x, y] = [-75.478, -11.782];
	const anillo = (cx, cy, r, n = 8) => Array.from({ length: n + 1 }, (_, i) => {
		const a = i / n * 2 * Math.PI;
		return [cx + r * Math.cos(a), cy + r * .8 * Math.sin(a)];
	});
	const base = (i, nombre, abrev, categoria, descripcion, fuente, geometria, entidades) => ({
		id: `demo-${abrev.toLowerCase()}-${proyecto}`,
		proyecto,
		nombre,
		abrev,
		categoria,
		descripcion,
		fuente,
		fechaDatos: "2026-01-15",
		responsable: "Oficina GIS de la DDP",
		confiabilidad: "ALTA",
		geometria,
		origen: {
			tipo: "SERVICIO",
			formato: "WFS",
			servicio: {
				tipo: "WFS",
				capa: abrev
			}
		},
		crsOriginal: "EPSG:4326",
		entidades,
		extension: null,
		campos: [{
			nombre: "nombre",
			tipo: "texto"
		}],
		estilo: estiloInicial(geometria, i + 3),
		estado: "APROBADA",
		controles: [],
		observaciones: "Capa de demostración tomada de un servicio externo.",
		revisadoPor: "Oficina GIS",
		publicar: true,
		version: 1,
		orden: i,
		visible: true,
		activa: true,
		creadoEl: "2026-01-15T09:00:00.000Z",
		clase: "AUXILIAR"
	});
	const fc = (features) => ({
		type: "FeatureCollection",
		features
	});
	const poligono = (nombre, cx, cy, r) => ({
		type: "Feature",
		properties: { nombre },
		geometry: {
			type: "Polygon",
			coordinates: [anillo(cx, cy, r)]
		}
	});
	const punto = (nombre, cx, cy) => ({
		type: "Feature",
		properties: { nombre },
		geometry: {
			type: "Point",
			coordinates: [cx, cy]
		}
	});
	return {
		capas: [
			base(0, "Áreas naturales protegidas", "ANP", "Catastro de áreas naturales protegidas", "Zonas de amortiguamiento y áreas de conservación regional (SERNANP).", "SERNANP · GeoServer", "POLIGONO", 2),
			base(1, "Patrimonio cultural", "PCU", "Catastro de patrimonio cultural", "Sitios arqueológicos declarados por el Ministerio de Cultura.", "Ministerio de Cultura · SIGDA", "POLIGONO", 1),
			base(2, "Puntos de control geodésico", "PCG", "Sector transporte", "Hitos de la red geodésica usados por las brigadas de topografía.", "IGN · Red Geodésica", "PUNTO", 4),
			base(3, "Red vial nacional", "RVN", "Sector transporte", "Ejes de la red vial nacional y departamental.", "MTC · Provías", "LINEA", 1)
		],
		datos: [
			fc([poligono("ACR Huaytapallana · amortiguamiento", x - .028, y - .012, .012), poligono("Humedal de Laguna de Paca", x + .03, y + .02, .009)]),
			fc([poligono("Sitio arqueológico Tunanmarca", x + .018, y - .022, .005)]),
			fc([
				punto("PCG-01 · Aeropuerto", x - .004, y + .003),
				punto("PCG-02 · Sausa", x - .02, y + .012),
				punto("PCG-03 · Yauyos", x + .016, y - .008),
				punto("PCG-04 · Pancán", x + .03, y + .004)
			]),
			fc([{
				type: "Feature",
				properties: { nombre: "PE-3S · Longitudinal de la Sierra" },
				geometry: {
					type: "LineString",
					coordinates: [
						[x - .05, y + .028],
						[x - .02, y + .012],
						[x, y],
						[x + .025, y - .012],
						[x + .05, y - .03]
					]
				}
			}])
		]
	};
}
var ESTILO_SISTEMA = {
	pmd: {
		color: "#dc2626",
		grosor: 5,
		tipoLinea: "CONTINUA"
	},
	concesion: {
		color: "#ec4899",
		grosor: 3,
		tipoLinea: "CONTINUA"
	},
	predios: {
		color: "#0f172a",
		grosor: 1.25,
		tipoLinea: "CONTINUA"
	},
	matriz: {
		color: "#7c3aed",
		grosor: 2,
		tipoLinea: "DISCONTINUA"
	},
	remanentes: {
		color: "#d97706",
		grosor: 2,
		tipoLinea: "PUNTEADA"
	}
};
var claveEstilos = (proyecto) => `pdgp-estilos-sistema-${proyecto}`;
function leerEstilosSistema(proyecto) {
	try {
		const guardado = JSON.parse(localStorage.getItem(claveEstilos(proyecto)) ?? "{}");
		return Object.fromEntries(Object.entries(ESTILO_SISTEMA).map(([k, v]) => [k, {
			...v,
			...guardado[k]
		}]));
	} catch {
		return { ...ESTILO_SISTEMA };
	}
}
function guardarEstilosSistema(proyecto, estilos) {
	localStorage.setItem(claveEstilos(proyecto), JSON.stringify(estilos));
}
function cargar(proyecto) {
	const c = cache.get(proyecto);
	if (c) return c;
	let lista = [];
	try {
		lista = JSON.parse(localStorage.getItem(clave(proyecto)) ?? "[]");
		if (!lista.some((c) => c.id.startsWith("demo-"))) {
			const semilla = semillaComplementarias(proyecto);
			lista = [...lista, ...semilla.capas];
			localStorage.setItem(clave(proyecto), JSON.stringify(lista));
			semilla.capas.forEach((capa, i) => void guardarDatosCapa(capa.id, 1, semilla.datos[i]));
		}
	} catch {
		lista = [];
	}
	cache.set(proyecto, lista);
	return lista;
}
function useCapas(proyecto) {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, () => cargar(proyecto), () => VACIA);
}
var leerCapas = (proyecto) => cargar(proyecto);
/** Guarda la lista de capas del proyecto con versión en el histórico. */
function guardarCapas(proyecto, nuevas, accion, objeto, motivo) {
	const antes = cargar(proyecto);
	cache.set(proyecto, nuevas);
	try {
		localStorage.setItem(clave(proyecto), JSON.stringify(nuevas));
	} catch {}
	oyentes.forEach((f) => f());
	registrarCambio(`capas-${proyecto}`, {
		accion,
		objeto,
		motivo,
		antes,
		despues: nuevas
	}, {
		modulo: 12,
		entidad: "capa_base_grafica"
	});
}
/** Cambia una capa (por id) y guarda. */
function actualizarCapa(proyecto, id, cambios, accion, motivo) {
	const lista = cargar(proyecto);
	const capa = lista.find((c) => c.id === id);
	if (!capa) return;
	guardarCapas(proyecto, lista.map((c) => c.id === id ? {
		...c,
		...cambios
	} : c), accion, capa.nombre, motivo);
}
var idCapa = () => `capa-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
var claveDatos = (id, version) => `${id}@${version}`;
/** GeoJSON (WGS 84) de una versión de la capa; sin versión, la vigente. */
async function leerDatosCapa(capa, version = capa.version) {
	return datosIdb.leer(claveDatos(capa.id, version));
}
var guardarDatosCapa = (id, version, fc) => datosIdb.guardar(claveDatos(id, version), fc);
var guardarOriginal = (id, version, archivo) => datosIdb.guardar(`${claveDatos(id, version)}:original`, archivo);
var leerOriginal = (id, version) => datosIdb.leer(`${claveDatos(id, version)}:original`);
/** Error que impide guardar los datos de la capa, o null. */
function validarCapa(capas, c) {
	if (!c.nombre.trim()) return "Ingrese el nombre de la capa.";
	if (!c.abrev.trim()) return "Ingrese la abreviatura.";
	const repetida = capas.find((x) => x.activa && x.id !== c.id && x.nombre.trim().toLowerCase() === c.nombre.trim().toLowerCase());
	if (repetida) return `Ya hay una capa llamada «${repetida.nombre}» en el proyecto.`;
	return null;
}
/** Siguiente orden de dibujo (las nuevas quedan encima). */
var siguienteOrdenCapa = (capas) => Math.max(0, ...capas.map((c) => c.orden)) + 1;
//#endregion
export { tienePoligonosPropios as C, siguienteOrdenCapa as S, validarCapa as T, leerCapas as _, NOMBRE_CLASE as a, leerOriginal as b, actualizarCapa as c, estiloInicial as d, guardarCapas as f, idCapa as g, guardarOriginal as h, DETALLE_CLASE as i, claseDe as l, guardarEstilosSistema as m, CAPAS_SISTEMA as n, NOMBRE_ESTADO_CAPA as o, guardarDatosCapa as p, CATEGORIAS_CAPA as r, NOMBRE_GEOMETRIA as s, CAPAS_OBLIGATORIAS as t, estadoObligatorias as u, leerDatosCapa as v, useCapas as w, puedeGestionarCapas as x, leerEstilosSistema as y };
