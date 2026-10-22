import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { d as predioRows } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { n as CURRENT_USER } from "./projectContext-BYyGxWhp.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, BookOpen, ClipboardList, Clock, FileDown, Handshake, History, Landmark, Plus, Save, Search, Trash2, Users, X } from "lucide-react";
//#region src/routes/gestion-social.tsx?tsr-split=component
var STORAGE_KEY = "pdgp:gestion-social:v1";
var textareaCls = `${controlClase} h-auto min-h-16 py-2`;
var CHECK = "size-4 rounded-sm accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";
var ACTIVIDADES = [
	"Primera visita",
	"Sensibilización e información",
	"Actualización de información",
	"Entrega de documentación",
	"Recojo de documentación",
	"Coordinación para inspección",
	"Coordinación para tasación",
	"Acompañamiento para trámite documentario",
	"Constatación de vivencia",
	"Atención de consultas",
	"Seguimiento",
	"Negociación",
	"Reunión informativa"
];
var ACEPTACION = [
	"Muy favorable",
	"Favorable",
	"Neutral",
	"Desfavorable",
	"Muy desfavorable"
];
var DISPOSICION = [
	"Acepta",
	"En evaluación",
	"Requiere mayor información",
	"Rechaza"
];
var NIVELES = [
	"Bajo",
	"Medio",
	"Alto"
];
var SEMAFORO = [
	"Normal",
	"Seguimiento preventivo",
	"Atención prioritaria"
];
var ESTADOS_RIESGO = [
	"Atendido",
	"En proceso",
	"No atendido"
];
var ETAPAS = [
	"Diagnóstico",
	"Empadronamiento",
	"Tasación",
	"Adquisición",
	"Pago",
	"Entrega"
];
var SECCIONES_MARCO = [
	{
		titulo: "25.1 Marco normativo, contractual y referencias internacionales",
		parrafo: "La Gestión Predial Social se enmarca en el Decreto Legislativo N.° 1192 y sus modificatorias; en proyectos APP, en el marco normativo aplicable a dicha modalidad; y en la Resolución Directoral N.° 007-2004-MTC/16 (Directrices PACRI). Considera además los contratos de concesión, adendas e instrumentos de cada proyecto y, cuando apliquen, los estándares internacionales sobre adquisición de tierras, desplazamiento físico y económico, reasentamiento involuntario y participación de partes interesadas.",
		items: []
	},
	{
		titulo: "25.2 Funcionamiento y articulación del módulo",
		parrafo: "Integra las actuaciones sociales con la información técnica, legal, territorial y documental, manteniendo la correspondencia entre las actuaciones de campo y los procesos de Gestión de Predios que les dieron origen.",
		items: [
			"Vinculación multiescala: proyecto, tramo, sector y Códigos de Predio (alcance individual, colectivo o territorial).",
			"Consumo e intercambio de información entre módulos sin duplicar datos ni documentos.",
			"Relaciones estructuradas entre procesos y actuaciones mediante identificadores comunes.",
			"Gestión diferenciada por perfiles: especialista social, brigadas, coordinadores y usuarios autorizados.",
			"Articulación con Gestión Documental, el Expediente Predial Digital y el STD.",
			"Articulación con la Geodatabase corporativa sin duplicar geometrías."
		]
	},
	{
		titulo: "25.3 Caracterización y gestión geoespacial de la información social",
		parrafo: "Organiza la caracterización social de la población y actores vinculados con las áreas requeridas, para su análisis social y territorial.",
		items: [
			"Diagnóstico social del ámbito del proyecto, sector o zona de intervención.",
			"Caracterización social y socioeconómica: censos, fichas, empadronamientos, padrones y levantamientos de campo.",
			"Matriz de actores sociales (interés y nivel de poder) y directorio de autoridades, dirigentes y gestores.",
			"Estructuración territorial y georreferenciación reutilizando capas existentes.",
			"Consulta, análisis y visualización geoespacial por capas temáticas."
		]
	},
	{
		titulo: "25.4 Gestión de riesgos, incidencias y conflictos sociales",
		parrafo: "Gestiona las situaciones que puedan afectar la adquisición de predios, diferenciando riesgos potenciales de incidencias o conflictos materializados.",
		items: [
			"Registro y clasificación mediante una matriz de riesgos actualizable.",
			"Evaluación, priorización y semaforización: normal, seguimiento preventivo y atención prioritaria.",
			"Historial de evolución del nivel de riesgo con fecha, condición anterior, nueva condición, sustento y usuario.",
			"Identificación territorial de situaciones críticas y mapas de calor en el entorno GIS."
		]
	},
	{
		titulo: "25.5 Atención, participación y trazabilidad de actuaciones sociales",
		parrafo: "Concentra la información de los canales de atención y de los mecanismos de participación con la población vinculada.",
		items: [
			"Registro de consultas, solicitudes, quejas y reclamos con fecha, medio, tipo, actores, responsable y estado.",
			"Gestión de reuniones, visitas, talleres y jornadas con participantes, resultados, actas y evidencias.",
			"Gestión de acuerdos y compromisos con plazos, responsables, estados y sustentos.",
			"Trazabilidad completa de actuaciones por actor, situación social o Predio."
		]
	},
	{
		titulo: "25.6 Gestión de medidas sociales vinculadas al PCRA",
		parrafo: "Cuando el proyecto contemple un Plan de Compensación, Reasentamiento Involuntario y Adquisición de Predios, gestiona las medidas sociales para la población directamente afectada.",
		items: [
			"Configuración de programas, componentes y medidas del PCRA por proyecto.",
			"Asignación de medidas a unidades sociales vinculadas al Código de Predio.",
			"Gestión y visualización GIS de la reubicación o reasentamiento (origen, alternativas y destino).",
			"Medidas de restablecimiento socioeconómico.",
			"Implementación, evidencias y resultado de cada medida."
		]
	}
];
var uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var fmtDate = (iso) => iso ? iso.split("-").reverse().join("/") : "";
var projectName = (id) => proyectos.find((p) => p.id === id)?.nombre ?? id;
var seedRiesgos = [
	{
		id: "r1",
		proyecto: "pucallpa",
		fecha: "2026-04-23",
		etapa: "Adquisición",
		denominacion: "Demora en la rectificación de área de algunos predios",
		tipo: "Institucional",
		grupo: "Institucional",
		latencia: "Existente",
		antecedentes: "Demora en la atención de solicitudes de rectificación de área.",
		causas: "Burocracia municipal y registral.",
		efectos: "Molestia de los propietarios y retraso del proceso.",
		accionesDesarrolladas: "Apoyo en los trámites ante la municipalidad.",
		accionesADesarrollar: "Reuniones con la municipalidad y SUNARP.",
		nivel: "Medio",
		semaforo: "Seguimiento preventivo",
		estado: "En proceso",
		codigoPredio: "",
		historial: []
	},
	{
		id: "r2",
		proyecto: "pucallpa",
		fecha: "2026-04-23",
		etapa: "Adquisición",
		denominacion: "Posesionarios sin título de propiedad o constancia de posesión",
		tipo: "Social",
		grupo: "Individual",
		latencia: "Existente",
		antecedentes: "Posesión de hecho sin documentación.",
		causas: "Posesionarios sin saneamiento.",
		efectos: "Molestia por la demora en la adquisición.",
		accionesDesarrolladas: "Apoyo en la obtención de constancias de posesión.",
		accionesADesarrollar: "Reuniones con la municipalidad.",
		nivel: "Medio",
		semaforo: "Seguimiento preventivo",
		estado: "En proceso",
		codigoPredio: "",
		historial: []
	},
	{
		id: "r3",
		proyecto: "piura",
		fecha: "2026-04-24",
		etapa: "Adquisición",
		denominacion: "Rechazo de algunos beneficiarios a retirarse de la zona",
		tipo: "Social",
		grupo: "Individual",
		latencia: "Existente",
		antecedentes: "Posesión de larga data.",
		causas: "Negativa a la liberación de las áreas por sobrevaloración de los predios.",
		efectos: "Conformación de asociación y acción de amparo.",
		accionesDesarrolladas: "Acción de sensibilización.",
		accionesADesarrollar: "Sensibilizar.",
		nivel: "Medio",
		semaforo: "Atención prioritaria",
		estado: "No atendido",
		codigoPredio: "",
		historial: []
	},
	{
		id: "r4",
		proyecto: "tarapoto",
		fecha: "2026-04-22",
		etapa: "Adquisición",
		denominacion: "Ninguno",
		tipo: "",
		grupo: "",
		latencia: "",
		antecedentes: "Ninguno",
		causas: "Ninguna",
		efectos: "Ninguno",
		accionesDesarrolladas: "Proceso de adquisición normal.",
		accionesADesarrollar: "Proceso de adquisición normal.",
		nivel: "Bajo",
		semaforo: "Normal",
		estado: "En proceso",
		codigoPredio: "",
		historial: []
	},
	{
		id: "r5",
		proyecto: "cajamarca",
		fecha: "2024-01-01",
		etapa: "Adquisición",
		denominacion: "La zona de ampliación es el área verde de la ciudad de Cajamarca y alrededor hay zonas residenciales, instituciones educativas y la zona ganadera",
		tipo: "Ambiental",
		grupo: "Familiar",
		latencia: "Existente",
		antecedentes: "Inadecuado resguardo de las propiedades adquiridas.",
		causas: "Inadecuado proceso de demolición.",
		efectos: "Contaminación, enfermedades.",
		accionesDesarrolladas: "Ninguna.",
		accionesADesarrollar: "Adecuado proceso de demolición teniendo en cuenta los parámetros socioambientales.",
		nivel: "Alto",
		semaforo: "Atención prioritaria",
		estado: "No atendido",
		codigoPredio: "",
		historial: []
	}
];
var seedAntecedentes = {
	pucallpa: "Proyecto aeroportuario con predominio de posesionarios sin título. La municipalidad demora la rectificación de áreas; se coordina con SUNARP y la municipalidad para destrabar expedientes.",
	piura: "Beneficiarios organizados en asociación presentaron acción de amparo por desacuerdo con la valoración. Se mantiene campaña de sensibilización casa por casa.",
	tarapoto: "Proceso de adquisición sin riesgos sociales relevantes a la fecha.",
	cajamarca: "La zona de ampliación coincide con el área verde de la ciudad; colindan zonas residenciales, instituciones educativas y ganadería. Riesgo ambiental alto por demoliciones.",
	jauja: "Predios rurales con posesionarios y comunidades campesinas. Se requiere acompañamiento permanente para la entrega de documentación y constatación de vivencia."
};
var seedActores = [
	{
		id: "a1",
		proyecto: "piura",
		nombre: "Asociación de Posesionarios Sector Norte",
		tipo: "Organización social",
		cargo: "Presidente: Luis Chávez",
		interes: "Alto",
		poder: "Alto",
		ambito: "Sector norte del aeropuerto",
		telefono: "969 000 111",
		correo: ""
	},
	{
		id: "a2",
		proyecto: "jauja",
		nombre: "Comunidad Campesina de Huertas",
		tipo: "Comunidad",
		cargo: "Presidente comunal",
		interes: "Alto",
		poder: "Medio",
		ambito: "Predios AERO-JAUJA-0088 y PR-0556",
		telefono: "",
		correo: ""
	},
	{
		id: "a3",
		proyecto: "pucallpa",
		nombre: "Municipalidad Provincial de Coronel Portillo",
		tipo: "Autoridad local",
		cargo: "Subgerencia de Catastro",
		interes: "Medio",
		poder: "Alto",
		ambito: "Rectificación de áreas",
		telefono: "061 575 000",
		correo: "catastro@municportillo.gob.pe"
	}
];
var emptyIntervencion = () => ({
	id: "",
	proyecto: "jauja",
	codigoPredio: "",
	manzanaLote: "",
	ubicacion: "",
	fecha: today(),
	horaInicio: "09:00",
	horaFin: "10:00",
	gestor: CURRENT_USER.nombre,
	sujetoNombre: "",
	sujetoDni: "",
	sujetoCalidad: "Posesionario",
	sujetoDireccion: "",
	sujetoTelefono: "",
	sujetoCorreo: "",
	actividades: [],
	otraActividad: "",
	objetivo: "",
	desarrollo: "",
	aceptacion: "Neutral",
	preocupaciones: "",
	disposicion: "En evaluación",
	riesgo: "Medio",
	factores: "",
	observaciones: ""
});
var seedIntervenciones = [
	{
		...emptyIntervencion(),
		id: "i1",
		proyecto: "jauja",
		codigoPredio: "AERO-JAUJA-PR-0052",
		manzanaLote: "Mz. C Lt. 4",
		ubicacion: "Jauja / Jauja / Junín",
		fecha: "2026-03-12",
		sujetoNombre: "ANA JOSEFINA QUISPE",
		sujetoDni: "20456789",
		sujetoCalidad: "Propietaria",
		sujetoDireccion: "Jr. Huancayo 215, Jauja",
		sujetoTelefono: "964 112 233",
		actividades: ["Primera visita", "Sensibilización e información"],
		objetivo: "Informar sobre el proceso de adquisición y los beneficios del trato directo.",
		desarrollo: "Se explicó el procedimiento del D.L. 1192, el incentivo del 20 % y los plazos. La titular manifestó dudas sobre el valor comercial.",
		aceptacion: "Neutral",
		preocupaciones: "Valor de la tasación y plazo de pago.",
		disposicion: "Requiere mayor información",
		riesgo: "Medio",
		factores: "Desconfianza por experiencias previas de vecinos."
	},
	{
		...emptyIntervencion(),
		id: "i2",
		proyecto: "jauja",
		codigoPredio: "AERO-JAUJA-PR-0052",
		manzanaLote: "Mz. C Lt. 4",
		ubicacion: "Jauja / Jauja / Junín",
		fecha: "2026-04-02",
		sujetoNombre: "ANA JOSEFINA QUISPE",
		sujetoDni: "20456789",
		sujetoCalidad: "Propietaria",
		sujetoDireccion: "Jr. Huancayo 215, Jauja",
		sujetoTelefono: "964 112 233",
		actividades: [
			"Seguimiento",
			"Recojo de documentación",
			"Coordinación para tasación"
		],
		objetivo: "Recoger copia de la partida registral y coordinar la fecha de inspección para tasación.",
		desarrollo: "La titular entregó copia literal y DNI. Se fijó inspección para el 10/04/2026 con el perito.",
		aceptacion: "Favorable",
		preocupaciones: "Que la tasación considere las mejoras.",
		disposicion: "Acepta",
		riesgo: "Bajo",
		factores: "Mayor confianza tras la explicación del procedimiento."
	},
	{
		...emptyIntervencion(),
		id: "i3",
		proyecto: "piura",
		codigoPredio: "AERO-PIURA-PR-0117",
		manzanaLote: "Lt. 17",
		ubicacion: "Castilla / Piura / Piura",
		fecha: "2026-04-24",
		sujetoNombre: "LUIS ALBERTO CHÁVEZ RAMOS",
		sujetoDni: "02876543",
		sujetoCalidad: "Posesionario",
		sujetoDireccion: "Sector Norte, Castilla",
		actividades: ["Reunión informativa", "Negociación"],
		objetivo: "Atender el rechazo de la asociación a retirarse de la zona.",
		desarrollo: "Reunión con la directiva de la asociación. Insisten en sobrevaloración; se acordó una segunda reunión con el área de tasaciones.",
		aceptacion: "Desfavorable",
		preocupaciones: "Valor de los predios y reubicación.",
		disposicion: "Rechaza",
		riesgo: "Alto",
		factores: "Acción de amparo en curso; liderazgo organizado."
	}
];
var seedCompromisos = [{
	id: "c1",
	proyecto: "piura",
	codigoPredio: "AERO-PIURA-PR-0117",
	actor: "Asociación de Posesionarios Sector Norte",
	compromiso: "Segunda reunión con el área de tasaciones para explicar la metodología de valuación.",
	responsable: CURRENT_USER.nombre,
	plazo: "2026-05-08",
	estado: "Pendiente",
	sustento: "Acta de reunión 24/04/2026"
}, {
	id: "c2",
	proyecto: "jauja",
	codigoPredio: "AERO-JAUJA-PR-0052",
	actor: "ANA JOSEFINA QUISPE",
	compromiso: "Inspección de campo con el perito tasador.",
	responsable: CURRENT_USER.nombre,
	plazo: "2026-04-10",
	estado: "Cumplido",
	sustento: "Acta 02/04/2026"
}];
var seedMedidas = [{
	id: "m1",
	proyecto: "cajamarca",
	codigoPredio: "AERO-CAJ-PR-0021",
	unidadSocial: "Familia Huamán Tello (5 miembros)",
	componente: "Programa de reasentamiento",
	medida: "Reubicación asistida a vivienda de reposición",
	origen: "Av. Hoyos Rubio km 3.5",
	destino: "Lote 12, Urb. Las Torrecitas",
	estado: "En implementación",
	resultado: ""
}, {
	id: "m2",
	proyecto: "cajamarca",
	codigoPredio: "AERO-CAJ-PR-0021",
	unidadSocial: "Familia Huamán Tello (5 miembros)",
	componente: "Restablecimiento socioeconómico",
	medida: "Capacitación y capital semilla para actividad ganadera",
	origen: "",
	destino: "",
	estado: "Programada",
	resultado: ""
}];
var seedStore = () => ({
	antecedentes: seedAntecedentes,
	riesgos: seedRiesgos,
	actores: seedActores,
	intervenciones: seedIntervenciones,
	compromisos: seedCompromisos,
	medidas: seedMedidas
});
function loadStore() {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw) return {
			...seedStore(),
			...JSON.parse(raw)
		};
	} catch {}
	return seedStore();
}
var CLAVE_HISTORIAL = "gestion-social";
var BITACORA = {
	modulo: 25,
	entidad: "gestion_social"
};
var ETIQUETAS = {
	antecedentes: "Antecedentes del proyecto",
	riesgos: "Riesgo",
	actores: "Actor social",
	intervenciones: "Intervención",
	compromisos: "Compromiso",
	medidas: "Medida PCRA",
	proyecto: "Proyecto",
	fecha: "Fecha",
	etapa: "Etapa",
	denominacion: "Denominación",
	tipo: "Tipo",
	grupo: "Grupo",
	latencia: "Latencia",
	causas: "Causas",
	efectos: "Efectos",
	accionesDesarrolladas: "Acciones desarrolladas",
	accionesADesarrollar: "Acciones por desarrollar",
	nivel: "Nivel",
	semaforo: "Semáforo",
	estado: "Estado",
	codigoPredio: "Código del predio",
	historial: "Cambios de nivel",
	cargo: "Cargo",
	interes: "Interés",
	poder: "Poder",
	ambito: "Ámbito",
	telefono: "Teléfono",
	correo: "Correo",
	manzanaLote: "Manzana y lote",
	ubicacion: "Ubicación",
	horaInicio: "Hora de inicio",
	horaFin: "Hora de fin",
	gestor: "Gestor social",
	sujetoNombre: "Sujeto pasivo",
	sujetoDni: "DNI del sujeto",
	sujetoCalidad: "Calidad del sujeto",
	sujetoDireccion: "Dirección del sujeto",
	sujetoTelefono: "Teléfono del sujeto",
	sujetoCorreo: "Correo del sujeto",
	actividades: "Actividades",
	otraActividad: "Otra actividad",
	objetivo: "Objetivo",
	desarrollo: "Desarrollo",
	aceptacion: "Aceptación",
	preocupaciones: "Preocupaciones",
	disposicion: "Disposición",
	riesgo: "Riesgo identificado",
	factores: "Factores",
	observaciones: "Observaciones",
	actor: "Actor",
	responsable: "Responsable",
	plazo: "Plazo",
	sustento: "Sustento",
	unidadSocial: "Unidad social",
	componente: "Componente",
	origen: "Origen",
	destino: "Destino",
	resultado: "Resultado"
};
/** Cada colección, cómo se llama en singular y qué texto identifica a cada elemento. */
var COLECCIONES = [
	{
		clave: "riesgos",
		singular: "riesgo",
		nombre: (r) => r.denominacion
	},
	{
		clave: "actores",
		singular: "actor",
		nombre: (a) => a.nombre
	},
	{
		clave: "intervenciones",
		singular: "intervención",
		nombre: (i) => `${i.sujetoNombre} (${i.codigoPredio})`
	},
	{
		clave: "compromisos",
		singular: "compromiso",
		nombre: (c) => c.compromiso
	},
	{
		clave: "medidas",
		singular: "medida social",
		nombre: (m) => m.medida
	}
];
/** Qué cambió entre dos estados del almacén: acción legible, sobre qué y si fue una baja. */
function describirCambio(antes, despues) {
	for (const c of COLECCIONES) {
		const a = antes[c.clave];
		const d = despues[c.clave];
		if (a === d) continue;
		const nombre = (x) => c.nombre(x) || x.id;
		const quitados = a.filter((x) => !d.some((y) => y.id === x.id));
		if (quitados.length) return {
			accion: `Eliminó ${c.singular}`,
			objeto: quitados.map(nombre).join(", "),
			baja: true
		};
		const nuevos = d.filter((y) => !a.some((x) => x.id === y.id));
		if (nuevos.length) return {
			accion: `Agregó ${c.singular}`,
			objeto: nuevos.map(nombre).join(", "),
			baja: false
		};
		const cambiados = d.filter((y) => {
			const x = a.find((z) => z.id === y.id);
			return x && JSON.stringify(x) !== JSON.stringify(y);
		});
		if (cambiados.length) return {
			accion: `Modificó ${c.singular}`,
			objeto: cambiados.map(nombre).join(", "),
			baja: false
		};
	}
	const proyectos = Object.keys(despues.antecedentes).filter((p) => antes.antecedentes[p] !== despues.antecedentes[p]);
	if (proyectos.length) return {
		accion: "Actualizó antecedentes",
		objeto: proyectos.map(projectName).join(", "),
		baja: false
	};
	return {
		accion: "Guardó cambios",
		objeto: "gestión predial social",
		baja: false
	};
}
/** En el histórico cada elemento lleva `nombre` para identificarlo; al restaurar se quita. */
var conNombre = (lista, nombre) => lista.map((x) => ({
	...x,
	nombre: nombre(x) || x.id
}));
var sinNombre = (lista) => lista.map(({ nombre: _nombre, ...resto }) => resto);
/** Los actores ya traen `nombre`: no se tocan. */
var aVersion = (s) => ({
	...s,
	riesgos: conNombre(s.riesgos, (r) => r.denominacion),
	intervenciones: conNombre(s.intervenciones, (i) => `${i.sujetoNombre} (${i.codigoPredio})`),
	compromisos: conNombre(s.compromisos, (c) => c.compromiso),
	medidas: conNombre(s.medidas, (m) => m.medida)
});
var desdeVersion = (r) => ({
	...r,
	riesgos: sinNombre(r.riesgos),
	intervenciones: sinNombre(r.intervenciones),
	compromisos: sinNombre(r.compromisos),
	medidas: sinNombre(r.medidas)
});
function SpecForm({ fields, value, onChange }) {
	return /* @__PURE__ */ jsx(FormGrid, { children: fields.map((field) => {
		const current = String(value[field.key] ?? "");
		const set = (next) => onChange(field.key, next);
		const control = (id) => {
			if (field.type === "select") return /* @__PURE__ */ jsxs("select", {
				id,
				className: controlClase,
				value: current,
				onChange: (e) => set(e.target.value),
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: "Seleccione"
				}), field.options?.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))]
			});
			if (field.type === "proyecto") return /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				value: current,
				onChange: (e) => set(e.target.value),
				children: proyectos.map((p) => /* @__PURE__ */ jsxs("option", {
					value: p.id,
					children: [
						p.nombre,
						" · ",
						p.tipo
					]
				}, p.id))
			});
			if (field.type === "textarea") return /* @__PURE__ */ jsx("textarea", {
				id,
				className: textareaCls,
				value: current,
				onChange: (e) => set(e.target.value)
			});
			return /* @__PURE__ */ jsx("input", {
				id,
				type: field.type === "date" || field.type === "time" ? field.type : "text",
				className: controlClase,
				value: current,
				list: field.type === "predio" ? "gs-predios" : void 0,
				onChange: (e) => set(e.target.value)
			});
		};
		return /* @__PURE__ */ jsx(FormField, {
			etiqueta: field.label,
			ancho: field.full || field.type === "textarea" ? "doble" : "completo",
			children: control
		}, field.key);
	}) });
}
var riesgoFields = [
	{
		key: "proyecto",
		label: "Proyecto",
		type: "proyecto"
	},
	{
		key: "fecha",
		label: "Fecha de registro",
		type: "date"
	},
	{
		key: "etapa",
		label: "Etapa",
		type: "select",
		options: ETAPAS
	},
	{
		key: "denominacion",
		label: "Denominación del riesgo o suceso",
		full: true
	},
	{
		key: "tipo",
		label: "Tipo de riesgo",
		type: "select",
		options: [
			"Social",
			"Ambiental",
			"Institucional"
		]
	},
	{
		key: "grupo",
		label: "Grupo de interés que lo genera",
		type: "select",
		options: [
			"Individual",
			"Familiar",
			"Colectivo",
			"Institucional"
		]
	},
	{
		key: "latencia",
		label: "Tipo",
		type: "select",
		options: ["Latente", "Existente"]
	},
	{
		key: "codigoPredio",
		label: "Código de predio (opcional)",
		type: "predio"
	},
	{
		key: "nivel",
		label: "Nivel de riesgo",
		type: "select",
		options: NIVELES
	},
	{
		key: "semaforo",
		label: "Semaforización",
		type: "select",
		options: SEMAFORO
	},
	{
		key: "estado",
		label: "Estado del riesgo",
		type: "select",
		options: ESTADOS_RIESGO
	},
	{
		key: "antecedentes",
		label: "Antecedentes",
		type: "textarea"
	},
	{
		key: "causas",
		label: "Causas",
		type: "textarea"
	},
	{
		key: "efectos",
		label: "Efectos",
		type: "textarea"
	},
	{
		key: "accionesDesarrolladas",
		label: "Acciones desarrolladas",
		type: "textarea"
	},
	{
		key: "accionesADesarrollar",
		label: "Acciones a desarrollar",
		type: "textarea"
	}
];
var actorFields = [
	{
		key: "proyecto",
		label: "Proyecto",
		type: "proyecto"
	},
	{
		key: "nombre",
		label: "Actor / organización"
	},
	{
		key: "tipo",
		label: "Tipo",
		type: "select",
		options: [
			"Autoridad local",
			"Comunidad",
			"Organización social",
			"Dirigente",
			"Gestor social",
			"Institución"
		]
	},
	{
		key: "cargo",
		label: "Cargo / representante"
	},
	{
		key: "interes",
		label: "Nivel de interés",
		type: "select",
		options: NIVELES
	},
	{
		key: "poder",
		label: "Nivel de poder",
		type: "select",
		options: NIVELES
	},
	{
		key: "ambito",
		label: "Ámbito / predios vinculados"
	},
	{
		key: "telefono",
		label: "Teléfono"
	},
	{
		key: "correo",
		label: "Correo"
	}
];
var datosGeneralesFields = [
	{
		key: "proyecto",
		label: "Proyecto",
		type: "proyecto"
	},
	{
		key: "codigoPredio",
		label: "Código del predio",
		type: "predio"
	},
	{
		key: "manzanaLote",
		label: "Manzana / Lote"
	},
	{
		key: "ubicacion",
		label: "Distrito / Provincia / Departamento"
	},
	{
		key: "fecha",
		label: "Fecha",
		type: "date"
	},
	{
		key: "horaInicio",
		label: "Hora inicio",
		type: "time"
	},
	{
		key: "horaFin",
		label: "Hora fin",
		type: "time"
	},
	{
		key: "gestor",
		label: "Gestor social"
	}
];
var sujetoFields = [
	{
		key: "sujetoNombre",
		label: "Nombre completo"
	},
	{
		key: "sujetoDni",
		label: "DNI"
	},
	{
		key: "sujetoCalidad",
		label: "Calidad",
		type: "select",
		options: [
			"Propietario",
			"Propietaria",
			"Posesionario",
			"Posesionaria",
			"Ocupante",
			"Representante"
		]
	},
	{
		key: "sujetoDireccion",
		label: "Dirección"
	},
	{
		key: "sujetoTelefono",
		label: "Teléfono"
	},
	{
		key: "sujetoCorreo",
		label: "Correo electrónico"
	}
];
var evaluacionFields = [
	{
		key: "objetivo",
		label: "IV. Objetivo de la actividad",
		type: "textarea",
		full: true
	},
	{
		key: "desarrollo",
		label: "V. Desarrollo de la actividad",
		type: "textarea",
		full: true
	},
	{
		key: "aceptacion",
		label: "VI. Nivel de aceptación",
		type: "select",
		options: ACEPTACION
	},
	{
		key: "preocupaciones",
		label: "Principales preocupaciones",
		type: "textarea"
	},
	{
		key: "disposicion",
		label: "VII. Disposición",
		type: "select",
		options: DISPOSICION
	},
	{
		key: "riesgo",
		label: "Riesgo social",
		type: "select",
		options: NIVELES
	},
	{
		key: "factores",
		label: "Factores",
		type: "textarea"
	},
	{
		key: "observaciones",
		label: "VIII. Observaciones",
		type: "textarea",
		full: true
	}
];
var compromisoFields = [
	{
		key: "proyecto",
		label: "Proyecto",
		type: "proyecto"
	},
	{
		key: "codigoPredio",
		label: "Código de predio",
		type: "predio"
	},
	{
		key: "actor",
		label: "Actor / sujeto pasivo"
	},
	{
		key: "compromiso",
		label: "Compromiso",
		type: "textarea",
		full: true
	},
	{
		key: "responsable",
		label: "Responsable"
	},
	{
		key: "plazo",
		label: "Plazo",
		type: "date"
	},
	{
		key: "estado",
		label: "Estado",
		type: "select",
		options: [
			"Pendiente",
			"En curso",
			"Cumplido",
			"Incumplido"
		]
	},
	{
		key: "sustento",
		label: "Sustento documental"
	}
];
var medidaFields = [
	{
		key: "proyecto",
		label: "Proyecto",
		type: "proyecto"
	},
	{
		key: "codigoPredio",
		label: "Código de predio",
		type: "predio"
	},
	{
		key: "unidadSocial",
		label: "Unidad social"
	},
	{
		key: "componente",
		label: "Componente del PCRA",
		type: "select",
		options: [
			"Programa de reasentamiento",
			"Restablecimiento socioeconómico",
			"Compensación social",
			"Asistencia a población vulnerable"
		]
	},
	{
		key: "medida",
		label: "Medida",
		full: true
	},
	{
		key: "origen",
		label: "Ubicación de origen"
	},
	{
		key: "destino",
		label: "Ubicación de destino"
	},
	{
		key: "estado",
		label: "Estado",
		type: "select",
		options: [
			"Programada",
			"En implementación",
			"Implementada",
			"Cerrada"
		]
	},
	{
		key: "resultado",
		label: "Resultado alcanzado",
		type: "textarea",
		full: true
	}
];
var esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var check = (label, on) => `${on ? "☒" : "☐"} ${esc(label)}`;
var kv = (rows) => `<table>${rows.map(([k, v]) => `<tr><td style="width:38%;background:rgb(243,244,246)"><b>${esc(k)}</b></td><td>${esc(v) || "&nbsp;"}</td></tr>`).join("")}</table>`;
var lines = (text) => text.trim() ? `<p>${esc(text).replace(/\n/g, "<br>")}</p>` : "<p>" + "_".repeat(95) + "<br>" + "_".repeat(95) + "</p>";
function downloadDoc(fileName, body) {
	const html = `<!doctype html><html><head><meta charset="UTF-8"><style>
    body{font-family:Arial,sans-serif;font-size:10.5pt;color:rgb(17,17,17);line-height:1.35}
    h1{font-size:12.5pt;text-align:center;margin:0 0 4px}
    h2{font-size:10.5pt;background:rgb(229,231,235);padding:3px 6px;margin:14px 0 6px}
    table{border-collapse:collapse;width:100%;margin-bottom:6px}
    td,th{border:1px solid rgb(85,85,85);padding:4px 6px;vertical-align:top;font-size:10pt}
    .sig td{border:none;text-align:center;padding-top:46px}
  </style></head><body>${body}</body></html>`;
	descargarBlob(fileName, new Blob(["﻿", html], { type: "application/msword;charset=utf-8" }));
}
function actaBody(i) {
	return `
<h1>FORMATO DE REGISTRO DE ACTIVIDADES DE GESTIÓN SOCIAL DESARROLLADAS CON SUJETOS PASIVOS</h1>
<p style="text-align:center;margin:0">Dirección de Disponibilidad de Predios (DDP)<br>Formato para Gestores Sociales</p>
<h2>I. DATOS GENERALES</h2>
${kv([
		["Proyecto", projectName(i.proyecto)],
		["Código del Predio", i.codigoPredio],
		["Manzana / Lote", i.manzanaLote],
		["Distrito / Provincia / Departamento", i.ubicacion],
		["Fecha", fmtDate(i.fecha)],
		["Hora Inicio - Fin", `${i.horaInicio} - ${i.horaFin}`],
		["Gestor Social", i.gestor]
	])}
<h2>II. IDENTIFICACIÓN DEL SUJETO PASIVO</h2>
${kv([
		["Nombre completo", i.sujetoNombre],
		["DNI", i.sujetoDni],
		["Calidad", i.sujetoCalidad],
		["Dirección", i.sujetoDireccion],
		["Teléfono", i.sujetoTelefono],
		["Correo electrónico", i.sujetoCorreo]
	])}
<h2>III. TIPO DE ACTIVIDAD</h2>
<table><tr><td style="border:none">${ACTIVIDADES.slice(0, 7).map((a) => check(a, i.actividades.includes(a))).join("<br>")}</td><td style="border:none">${ACTIVIDADES.slice(7).map((a) => check(a, i.actividades.includes(a))).join("<br>")}<br>${check("Otro: " + (i.otraActividad || "__________________"), !!i.otraActividad)}</td></tr></table>
<h2>IV. OBJETIVO DE LA ACTIVIDAD</h2>${lines(i.objetivo)}
<h2>V. DESARROLLO DE LA ACTIVIDAD</h2>${lines(i.desarrollo)}
<h2>VI. PERCEPCIÓN DEL SUJETO PASIVO</h2>
<p>Nivel de aceptación: ${ACEPTACION.map((a) => check(a, i.aceptacion === a)).join(" &nbsp; ")}</p>
<p>Principales preocupaciones: ${esc(i.preocupaciones) || "__________________________________________"}</p>
<h2>VII. EVALUACIÓN SOCIAL</h2>
<p>Disposición: ${DISPOSICION.map((d) => check(d, i.disposicion === d)).join(" &nbsp; ")}</p>
<p>Riesgo social: ${NIVELES.map((n) => check(n, i.riesgo === n)).join(" &nbsp; ")}</p>
<p>Factores: ${esc(i.factores) || "__________________________________________"}</p>
<h2>VIII. OBSERVACIONES</h2>${lines(i.observaciones)}
<h2>IX. FIRMAS</h2>
<table class="sig"><tr><td>__________________________<br>Gestor Social<br>${esc(i.gestor)}</td><td>__________________________<br>Sujeto Pasivo<br>${esc(i.sujetoNombre)}</td></tr></table>`;
}
function fichaBody(i) {
	const p = proyectos.find((x) => x.id === i.proyecto);
	const titulo = p?.tipo === "Aeroportuarios" ? `AFECTACIÓN INDIVIDUAL POR LA AMPLIACIÓN DEL AEROPUERTO DE LA CIUDAD DE ${p.nombre.toUpperCase()}` : `AFECTACIÓN INDIVIDUAL POR EL PROYECTO ${projectName(i.proyecto).toUpperCase()}`;
	const persona = (rol, nombre, dni, cel) => `<td style="border:none"><br><br>_____________________________________<br>Firma del ${rol}<br><br>Nombre: ${esc(nombre) || "……………………………………"}<br><br>DNI: ${esc(dni) || "……………………………"}<br><br>Celular: ${esc(cel) || "……………………………"}</td>`;
	return `
<h1>FICHA TÉCNICA DE EMPADRONAMIENTO</h1>
<p style="text-align:center;margin:0"><b>${titulo}</b><br>(D.L. N° 1192 Y SUS MODIFICATORIAS)</p>
<h2>DATOS DEL PREDIO</h2>
${kv([
		["Proyecto", projectName(i.proyecto)],
		["Código del Predio", i.codigoPredio],
		["Manzana / Lote", i.manzanaLote],
		["Distrito / Provincia / Departamento", i.ubicacion],
		["Fecha de empadronamiento", fmtDate(i.fecha)]
	])}
<h2>DATOS DEL POSESIONARIO</h2>
${kv([
		["Nombre completo", i.sujetoNombre],
		["DNI", i.sujetoDni],
		["Calidad", i.sujetoCalidad],
		["Dirección", i.sujetoDireccion],
		["Teléfono", i.sujetoTelefono]
	])}
<h2>OBSERVACIONES</h2>${lines(i.observaciones)}
<table><tr>${persona("posesionario", i.sujetoNombre, i.sujetoDni, i.sujetoTelefono)}${persona("empadronador", i.gestor, "", "")}</tr>
<tr><td colspan="2" style="border:none;text-align:right">Fecha: ${fmtDate(i.fecha) || "………/………/………"}</td></tr></table>`;
}
var safeName = (v) => v.replace(/[^A-Z0-9-]/gi, "_");
var descargarActa = (i) => downloadDoc(`acta_gestion_social_${safeName(i.codigoPredio || i.sujetoNombre || "sin-codigo")}_${i.fecha}.doc`, actaBody(i));
var descargarFicha = (i) => downloadDoc(`ficha_empadronamiento_${safeName(i.codigoPredio || i.sujetoNombre || "sin-codigo")}.doc`, fichaBody(i));
var TABS = [
	{
		id: "marco",
		label: "Alcance y marco",
		icon: BookOpen
	},
	{
		id: "proyecto",
		label: "Antecedentes y riesgos",
		icon: AlertTriangle
	},
	{
		id: "actores",
		label: "Actores sociales",
		icon: Users
	},
	{
		id: "historial",
		label: "Historial por propietario",
		icon: History
	},
	{
		id: "acta",
		label: "Registrar intervención / acta",
		icon: ClipboardList
	},
	{
		id: "pcra",
		label: "Medidas PCRA",
		icon: Landmark
	}
];
function GestionSocialPage() {
	const rol = useRol();
	const versiones = useHistorial(CLAVE_HISTORIAL);
	const [baja, setBaja] = useState(null);
	const [store, setStore] = useState(loadStore);
	const [tab, setTab] = useState("proyecto");
	const [proyecto, setProyecto] = useState("pucallpa");
	const [draft, setDraft] = useState(emptyIntervencion);
	const [notice, setNotice] = useState("");
	function guardarAlmacen(next) {
		setStore(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		} catch {}
	}
	/** Todo guardado pasa por aquí: deja una versión; si quita algo, pide antes el motivo. */
	function persist(next) {
		const c = describirCambio(store, next);
		if (c.baja) {
			setBaja({
				next,
				accion: c.accion,
				objeto: c.objeto
			});
			return;
		}
		guardarAlmacen(next);
		registrarCambio(CLAVE_HISTORIAL, {
			accion: c.accion,
			objeto: c.objeto,
			antes: aVersion(store),
			despues: aVersion(next)
		}, BITACORA);
	}
	function confirmarBaja(motivo) {
		if (!baja) return;
		guardarAlmacen(baja.next);
		registrarCambio(CLAVE_HISTORIAL, {
			accion: baja.accion,
			objeto: baja.objeto,
			motivo,
			antes: aVersion(store),
			despues: aVersion(baja.next)
		}, BITACORA);
		setNotice("Eliminado. El motivo quedó en el histórico.");
		setBaja(null);
	}
	function restaurar(registro, n) {
		const next = desdeVersion(registro);
		guardarAlmacen(next);
		registrarCambio(CLAVE_HISTORIAL, {
			accion: "Restauró una versión anterior",
			objeto: `versión ${n}`,
			antes: aVersion(store),
			despues: aVersion(next)
		}, BITACORA);
		setNotice(`Gestión social restaurada a la versión ${n}.`);
	}
	const stats = useMemo(() => ({
		intervenciones: store.intervenciones.length,
		sujetos: new Set(store.intervenciones.map((i) => i.sujetoDni || i.sujetoNombre)).size,
		abiertos: store.riesgos.filter((r) => r.estado !== "Atendido").length,
		prioritarios: store.riesgos.filter((r) => r.semaforo === "Atención prioritaria").length
	}), [store]);
	function setDraftField(key, value) {
		setDraft((d) => {
			const next = {
				...d,
				[key]: value
			};
			if (key === "codigoPredio") {
				const predio = predioRows.find((p) => p.codigo === value);
				if (predio) {
					next.sujetoNombre = predio.suj;
					next.ubicacion = next.ubicacion || predio.ciudad;
					next.sujetoCalidad = /POSE/i.test(predio.cond) ? "Posesionario" : next.sujetoCalidad;
				}
			}
			return next;
		});
	}
	function guardarIntervencion(descargar) {
		if (!draft.sujetoNombre.trim() || !draft.codigoPredio.trim()) {
			setNotice("No se pudo registrar la intervención: indique el código del predio y el nombre del sujeto pasivo.");
			return;
		}
		const saved = {
			...draft,
			id: draft.id || uid()
		};
		const rest = store.intervenciones.filter((i) => i.id !== saved.id);
		persist({
			...store,
			intervenciones: [saved, ...rest]
		});
		if (descargar) descargarActa(saved);
		setNotice(`Intervención registrada para ${saved.sujetoNombre}.`);
		setDraft(emptyIntervencion());
		setTab("historial");
	}
	function continuar(i) {
		setDraft({
			...emptyIntervencion(),
			proyecto: i.proyecto,
			codigoPredio: i.codigoPredio,
			manzanaLote: i.manzanaLote,
			ubicacion: i.ubicacion,
			sujetoNombre: i.sujetoNombre,
			sujetoDni: i.sujetoDni,
			sujetoCalidad: i.sujetoCalidad,
			sujetoDireccion: i.sujetoDireccion,
			sujetoTelefono: i.sujetoTelefono,
			sujetoCorreo: i.sujetoCorreo,
			actividades: ["Seguimiento"]
		});
		setTab("acta");
	}
	const esError = notice.startsWith("No se pudo");
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx("datalist", {
			id: "gs-predios",
			children: predioRows.map((p) => /* @__PURE__ */ jsx("option", {
				value: p.codigo,
				children: p.suj
			}, p.rowId))
		}),
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Handshake,
			titulo: "Gestión predial social",
			descripcion: "Intervenciones sociales por proyecto y por sujeto pasivo: antecedentes, riesgos, actores, atención en campo, compromisos y medidas del PCRA, con actas en Word.",
			migas: [{ texto: "Gestión predial social" }, { texto: "Actas y reuniones" }]
		}),
		/* @__PURE__ */ jsxs("dl", {
			className: "mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ jsx(Metric, {
					label: "Intervenciones registradas",
					value: stats.intervenciones,
					tono: "primary"
				}),
				/* @__PURE__ */ jsx(Metric, {
					label: "Sujetos pasivos atendidos",
					value: stats.sujetos,
					tono: "success"
				}),
				/* @__PURE__ */ jsx(Metric, {
					label: "Riesgos abiertos",
					value: stats.abiertos,
					tono: "warning"
				}),
				/* @__PURE__ */ jsx(Metric, {
					label: "Atención prioritaria",
					value: stats.prioritarios,
					tono: "destructive"
				})
			]
		}),
		notice && /* @__PURE__ */ jsxs("p", {
			role: esError ? "alert" : "status",
			className: `mb-4 flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm ${esError ? "border-destructive bg-destructive-soft text-destructive" : "border-success bg-success-soft text-success"}`,
			children: [notice, /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setNotice(""),
				"aria-label": "Cerrar aviso",
				className: "rounded-sm",
				children: /* @__PURE__ */ jsx(X, {
					size: 16,
					"aria-hidden": true
				})
			})]
		}),
		/* @__PURE__ */ jsxs(Section, { children: [
			/* @__PURE__ */ jsx(Tabs, {
				value: tab,
				onValueChange: (v) => setTab(v),
				className: "mb-4",
				children: /* @__PURE__ */ jsxs(TabsList, {
					"aria-label": "Secciones de gestión social",
					className: "h-auto flex-wrap justify-start",
					children: [TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxs(TabsTrigger, {
						value: id,
						className: "gap-1.5",
						children: [
							/* @__PURE__ */ jsx(Icon, {
								size: 16,
								"aria-hidden": true
							}),
							" ",
							label
						]
					}, id)), /* @__PURE__ */ jsxs(TabsTrigger, {
						value: "historico",
						className: "gap-1.5",
						children: [
							/* @__PURE__ */ jsx(Clock, {
								size: 16,
								"aria-hidden": true
							}),
							" Histórico (",
							versiones.length,
							")"
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Datos de demostración guardados en este navegador."
			}),
			tab === "marco" && /* @__PURE__ */ jsx(MarcoTab, {}),
			tab === "historico" && /* @__PURE__ */ jsx(Historico, {
				registro: CLAVE_HISTORIAL,
				etiquetas: ETIQUETAS,
				nombreArchivo: "historico-gestion-social",
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: restaurar
			}),
			tab === "proyecto" && /* @__PURE__ */ jsx(ProyectoTab, {
				store,
				persist,
				proyecto,
				setProyecto
			}),
			tab === "actores" && /* @__PURE__ */ jsx(CrudTab, {
				titulo: "Matriz de actores sociales y directorio",
				nombre: "actor",
				items: store.actores,
				fields: actorFields,
				empty: {
					id: "",
					proyecto,
					nombre: "",
					tipo: "",
					cargo: "",
					interes: "Medio",
					poder: "Medio",
					ambito: "",
					telefono: "",
					correo: ""
				},
				columns: [
					["Proyecto", (a) => projectName(a.proyecto)],
					["Actor", (a) => a.nombre],
					["Tipo", (a) => a.tipo],
					["Cargo / representante", (a) => a.cargo],
					["Interés", (a) => /* @__PURE__ */ jsx(Pill, { level: a.interes })],
					["Poder", (a) => /* @__PURE__ */ jsx(Pill, { level: a.poder })],
					["Ámbito", (a) => a.ambito],
					["Contacto", (a) => [a.telefono, a.correo].filter(Boolean).join(" · ")]
				],
				onChange: (actores) => persist({
					...store,
					actores
				})
			}),
			tab === "historial" && /* @__PURE__ */ jsx(HistorialTab, {
				store,
				persist,
				onContinuar: continuar,
				proyectoDefault: proyecto
			}),
			tab === "acta" && /* @__PURE__ */ jsx(ActaTab, {
				draft,
				setField: setDraftField,
				setDraft,
				onSave: guardarIntervencion
			}),
			tab === "pcra" && /* @__PURE__ */ jsx(CrudTab, {
				titulo: "Medidas sociales del PCRA por unidad social",
				nombre: "medida",
				items: store.medidas,
				fields: medidaFields,
				empty: {
					id: "",
					proyecto,
					codigoPredio: "",
					unidadSocial: "",
					componente: "",
					medida: "",
					origen: "",
					destino: "",
					estado: "Programada",
					resultado: ""
				},
				columns: [
					["Proyecto", (m) => projectName(m.proyecto)],
					["Predio", (m) => m.codigoPredio],
					["Unidad social", (m) => m.unidadSocial],
					["Componente", (m) => m.componente],
					["Medida", (m) => m.medida],
					["Origen → destino", (m) => [m.origen, m.destino].filter(Boolean).join(" → ")],
					["Estado", (m) => /* @__PURE__ */ jsx(Pill, { level: m.estado })],
					["Resultado", (m) => m.resultado]
				],
				onChange: (medidas) => persist({
					...store,
					medidas
				})
			})
		] }),
		baja && /* @__PURE__ */ jsx(MotivoEliminacion, {
			tipo: baja.accion.replace(/^Eliminó /, ""),
			nombre: baja.objeto,
			onCerrar: () => setBaja(null),
			onConfirmar: confirmarBaja
		})
	] });
}
/** Modal de baja: el motivo (mínimo 5 caracteres) queda en el histórico. */
function MotivoEliminacion({ nombre, tipo, descripcion, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Eliminar ${tipo}`,
		descripcion: descripcion ?? `${nombre} sale del registro. El histórico conserva sus datos y el motivo.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "destructive",
			disabled: motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: [
				/* @__PURE__ */ jsx(Trash2, {}),
				" Eliminar ",
				tipo
			]
		})] }),
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-eliminacion",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-eliminacion",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value),
				placeholder: "Por ejemplo: se registró por error; ya no corresponde"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function MarcoTab() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5 text-sm leading-5 text-foreground",
		children: [/* @__PURE__ */ jsx("p", { children: "El Módulo de Gestión Predial Social constituye el componente transversal de la Plataforma Digital de Gestión de Predios orientado a gestionar la información y las actuaciones sociales vinculadas con los procesos de adquisición de predios. Articula la dimensión social con el ámbito territorial del proyecto y con las Áreas Afectadas individualizadas (Predios), incorporando capacidades de registro, gestión geoespacial y trazabilidad, y facilitando la identificación y atención de situaciones sociales y la gestión de las medidas e instrumentos sociales que correspondan a cada proyecto." }), SECCIONES_MARCO.map((s) => /* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: s.titulo }),
			/* @__PURE__ */ jsx("p", { children: s.parrafo }),
			s.items.length > 0 && /* @__PURE__ */ jsx("ul", {
				className: "mt-1 list-disc space-y-0.5 pl-5",
				children: s.items.map((it) => /* @__PURE__ */ jsx("li", { children: it }, it))
			})
		] }, s.titulo))]
	});
}
function ProyectoTab({ store, persist, proyecto, setProyecto }) {
	const [texto, setTexto] = useState(store.antecedentes[proyecto] ?? "");
	const [nuevo, setNuevo] = useState(null);
	const [cambio, setCambio] = useState(null);
	const riesgos = store.riesgos.filter((r) => r.proyecto === proyecto);
	const intervenciones = store.intervenciones.filter((i) => i.proyecto === proyecto);
	function cambiarProyecto(id) {
		setProyecto(id);
		setTexto(store.antecedentes[id] ?? "");
		setNuevo(null);
	}
	function guardarCambioNivel() {
		if (!cambio) return;
		persist({
			...store,
			riesgos: store.riesgos.map((r) => r.id !== cambio.id || r.nivel === cambio.nivel ? r : {
				...r,
				nivel: cambio.nivel,
				historial: [...r.historial, {
					fecha: today(),
					anterior: r.nivel,
					nueva: cambio.nivel,
					sustento: cambio.sustento,
					usuario: CURRENT_USER.nombre
				}]
			})
		});
		setCambio(null);
	}
	const TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
	const TD = "px-3 py-2 align-top";
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 md:grid-cols-[320px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
						children: "Proyecto"
					}), /* @__PURE__ */ jsx("select", {
						className: controlClase,
						value: proyecto,
						onChange: (e) => cambiarProyecto(e.target.value),
						children: proyectos.map((p) => /* @__PURE__ */ jsxs("option", {
							value: p.id,
							children: [
								p.nombre,
								" · ",
								p.tipo
							]
						}, p.id))
					})]
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground md:self-end",
					children: [
						intervenciones.length,
						" intervenciones · ",
						riesgos.length,
						" riesgos registrados ·",
						" ",
						store.actores.filter((a) => a.proyecto === proyecto).length,
						" actores"
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Subtitulo, { children: "Antecedentes sociales del proyecto" }),
				/* @__PURE__ */ jsx("textarea", {
					className: `${textareaCls} min-h-24`,
					value: texto,
					"aria-label": "Antecedentes sociales del proyecto",
					onChange: (e) => setTexto(e.target.value),
					placeholder: "Diagnóstico social, contexto, hitos y acuerdos previos del proyecto"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-2 flex justify-end",
					children: /* @__PURE__ */ jsxs(Button, {
						type: "button",
						onClick: () => persist({
							...store,
							antecedentes: {
								...store.antecedentes,
								[proyecto]: texto
							}
						}),
						children: [/* @__PURE__ */ jsx(Save, {}), " Guardar antecedentes"]
					})
				})
			] }),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Subtitulo, {
					acciones: /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => setNuevo({
							id: "",
							proyecto,
							fecha: today(),
							etapa: "Adquisición",
							denominacion: "",
							tipo: "Social",
							grupo: "Individual",
							latencia: "Existente",
							antecedentes: "",
							causas: "",
							efectos: "",
							accionesDesarrolladas: "",
							accionesADesarrollar: "",
							nivel: "Medio",
							semaforo: "Seguimiento preventivo",
							estado: "No atendido",
							codigoPredio: "",
							historial: []
						}),
						children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar riesgo"]
					}),
					children: "Matriz de riesgos, incidencias y conflictos sociales"
				}),
				nuevo && /* @__PURE__ */ jsxs("div", {
					className: "mb-3 rounded-md border border-border bg-background p-3",
					children: [/* @__PURE__ */ jsx(SpecForm, {
						fields: riesgoFields,
						value: nuevo,
						onChange: (k, v) => setNuevo({
							...nuevo,
							[k]: v
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex justify-end gap-2",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setNuevo(null),
							children: "Cancelar"
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							disabled: !nuevo.denominacion.trim(),
							onClick: () => {
								persist({
									...store,
									riesgos: [...store.riesgos, {
										...nuevo,
										id: uid()
									}]
								});
								setNuevo(null);
							},
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar riesgo"]
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto rounded-md border border-border",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full min-w-[1400px] text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
							"N°",
							"Fecha",
							"Etapa",
							"Denominación del riesgo o suceso",
							"Tipo",
							"Grupo de interés",
							"Latente / existente",
							"Causas",
							"Efectos",
							"Acciones desarrolladas",
							"Acciones a desarrollar",
							"Nivel",
							"Semáforo",
							"Estado",
							"Acciones"
						].map((h) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH,
							children: h
						}, h)) }) }), /* @__PURE__ */ jsxs("tbody", {
							className: "[&>tr:nth-child(even)]:bg-background",
							children: [riesgos.map((r, idx) => /* @__PURE__ */ jsxs("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: idx + 1
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${TD} whitespace-nowrap`,
										children: fmtDate(r.fecha)
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: r.etapa
									}),
									/* @__PURE__ */ jsxs("td", {
										className: `${TD} min-w-[220px]`,
										children: [
											/* @__PURE__ */ jsx("p", {
												className: "font-medium",
												children: r.denominacion
											}),
											r.codigoPredio && /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground",
												children: r.codigoPredio
											}),
											r.historial.length > 0 && /* @__PURE__ */ jsx("ul", {
												className: "mt-1 space-y-0.5 text-xs text-muted-foreground",
												children: r.historial.map((h, i) => /* @__PURE__ */ jsxs("li", { children: [
													fmtDate(h.fecha),
													": ",
													h.anterior,
													" → ",
													h.nueva,
													" ·",
													" ",
													h.sustento || "sin sustento",
													" · ",
													h.usuario
												] }, i))
											})
										]
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: r.tipo
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: r.grupo
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: r.latencia
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${TD} min-w-[160px]`,
										children: r.causas
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${TD} min-w-[160px]`,
										children: r.efectos
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${TD} min-w-[160px]`,
										children: r.accionesDesarrolladas
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${TD} min-w-[160px]`,
										children: r.accionesADesarrollar
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: cambio?.id === r.id ? /* @__PURE__ */ jsxs("div", {
											className: "w-40 space-y-1",
											children: [
												/* @__PURE__ */ jsx("select", {
													className: controlClase,
													"aria-label": "Nuevo nivel de riesgo",
													value: cambio.nivel,
													onChange: (e) => setCambio({
														...cambio,
														nivel: e.target.value
													}),
													children: NIVELES.map((n) => /* @__PURE__ */ jsx("option", { children: n }, n))
												}),
												/* @__PURE__ */ jsx("input", {
													className: controlClase,
													placeholder: "Sustento",
													"aria-label": "Sustento del cambio",
													value: cambio.sustento,
													onChange: (e) => setCambio({
														...cambio,
														sustento: e.target.value
													})
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "flex gap-1",
													children: [/* @__PURE__ */ jsx(Button, {
														type: "button",
														size: "sm",
														onClick: guardarCambioNivel,
														children: "Guardar nivel"
													}), /* @__PURE__ */ jsx(Button, {
														type: "button",
														size: "sm",
														variant: "outline",
														onClick: () => setCambio(null),
														"aria-label": "Cancelar cambio de nivel",
														children: /* @__PURE__ */ jsx(X, {})
													})]
												})
											]
										}) : /* @__PURE__ */ jsx("button", {
											type: "button",
											title: "Cambiar nivel de riesgo",
											"aria-label": `Cambiar nivel de riesgo (${r.nivel})`,
											className: "rounded-sm",
											onClick: () => setCambio({
												id: r.id,
												nivel: r.nivel,
												sustento: ""
											}),
											children: /* @__PURE__ */ jsx(Pill, { level: r.nivel })
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: /* @__PURE__ */ jsx("select", {
											className: controlClase,
											"aria-label": "Semáforo",
											value: r.semaforo,
											onChange: (e) => persist({
												...store,
												riesgos: store.riesgos.map((x) => x.id === r.id ? {
													...x,
													semaforo: e.target.value
												} : x)
											}),
											children: SEMAFORO.map((s) => /* @__PURE__ */ jsx("option", { children: s }, s))
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: /* @__PURE__ */ jsx("select", {
											className: controlClase,
											"aria-label": "Estado del riesgo",
											value: r.estado,
											onChange: (e) => persist({
												...store,
												riesgos: store.riesgos.map((x) => x.id === r.id ? {
													...x,
													estado: e.target.value
												} : x)
											}),
											children: ESTADOS_RIESGO.map((s) => /* @__PURE__ */ jsx("option", { children: s }, s))
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: /* @__PURE__ */ jsx(BotonEliminar, {
											etiqueta: "Eliminar riesgo",
											onClick: () => persist({
												...store,
												riesgos: store.riesgos.filter((x) => x.id !== r.id)
											})
										})
									})
								]
							}, r.id)), !riesgos.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 15,
								className: "px-4 py-8 text-center text-sm text-muted-foreground",
								children: "Sin riesgos registrados para este proyecto."
							}) })]
						})]
					})
				})
			] })
		]
	});
}
function HistorialTab({ store, persist, onContinuar, proyectoDefault }) {
	const [proyecto, setProyecto] = useState("");
	const [query, setQuery] = useState("");
	const [nuevoCompromiso, setNuevoCompromiso] = useState(null);
	const grupos = useMemo(() => {
		const q = query.trim().toLowerCase();
		const map = /* @__PURE__ */ new Map();
		store.intervenciones.filter((i) => !proyecto || i.proyecto === proyecto).filter((i) => !q || `${i.sujetoNombre} ${i.sujetoDni} ${i.codigoPredio}`.toLowerCase().includes(q)).sort((a, b) => b.fecha.localeCompare(a.fecha)).forEach((i) => {
			const key = i.sujetoDni || i.sujetoNombre;
			map.set(key, [...map.get(key) ?? [], i]);
		});
		return Array.from(map.values());
	}, [
		store.intervenciones,
		proyecto,
		query
	]);
	const compromisos = store.compromisos.filter((c) => !proyecto || c.proyecto === proyecto);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 md:grid-cols-[260px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
						children: "Proyecto"
					}), /* @__PURE__ */ jsxs("select", {
						className: controlClase,
						value: proyecto,
						onChange: (e) => setProyecto(e.target.value),
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Todos los proyectos"
						}), proyectos.map((p) => /* @__PURE__ */ jsx("option", {
							value: p.id,
							children: p.nombre
						}, p.id))]
					})]
				}), /* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
						children: "Sujeto pasivo, DNI o código de predio"
					}), /* @__PURE__ */ jsxs("span", {
						className: "relative block",
						children: [/* @__PURE__ */ jsx(Search, {
							size: 16,
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("input", {
							type: "search",
							className: `${controlClase} pl-9`,
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Buscar"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Historial de temas sociales por propietario" }),
			!grupos.length && /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "Sin intervenciones registradas con estos filtros."
			}),
			grupos.map((lista) => {
				const ultima = lista[0];
				return /* @__PURE__ */ jsxs("div", {
					className: "rounded-md border border-border",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-3 py-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold",
							children: ultima.sujetoNombre
						}), /* @__PURE__ */ jsxs("p", {
							className: "flex flex-wrap items-center gap-1 text-xs text-muted-foreground",
							children: [
								"DNI ",
								ultima.sujetoDni || "sin registrar",
								" · ",
								ultima.sujetoCalidad,
								" ·",
								" ",
								ultima.codigoPredio,
								" · ",
								projectName(ultima.proyecto),
								" · ",
								lista.length,
								" ",
								"intervención",
								lista.length === 1 ? "" : "es",
								" · última disposición:",
								" ",
								/* @__PURE__ */ jsx(Pill, { level: ultima.disposicion })
							]
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => descargarFicha(ultima),
								children: [/* @__PURE__ */ jsx(FileDown, {}), " Ficha de empadronamiento (Word)"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								onClick: () => onContinuar(ultima),
								children: [/* @__PURE__ */ jsx(Plus, {}), " Nueva intervención (continuidad)"]
							})]
						})]
					}), /* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "fecha",
								titulo: "Fecha",
								render: (i) => /* @__PURE__ */ jsx("span", {
									className: "whitespace-nowrap",
									children: fmtDate(i.fecha)
								})
							},
							{
								clave: "actividades",
								titulo: "Actividades",
								render: (i) => [...i.actividades, i.otraActividad].filter(Boolean).join(", ")
							},
							{
								clave: "objetivo",
								titulo: "Objetivo / desarrollo",
								render: (i) => /* @__PURE__ */ jsxs("div", {
									className: "max-w-[420px]",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "font-medium",
											children: i.objetivo
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-muted-foreground",
											children: i.desarrollo
										}),
										i.preocupaciones && /* @__PURE__ */ jsxs("p", {
											className: "text-xs text-muted-foreground",
											children: ["Preocupaciones: ", i.preocupaciones]
										})
									]
								})
							},
							{
								clave: "aceptacion",
								titulo: "Aceptación"
							},
							{
								clave: "disposicion",
								titulo: "Disposición",
								render: (i) => /* @__PURE__ */ jsx(Pill, { level: i.disposicion })
							},
							{
								clave: "riesgo",
								titulo: "Riesgo",
								render: (i) => /* @__PURE__ */ jsx(Pill, { level: i.riesgo })
							},
							{
								clave: "gestor",
								titulo: "Gestor"
							},
							{
								clave: "acta",
								titulo: "Acta",
								render: (i) => /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => descargarActa(i),
									children: [/* @__PURE__ */ jsx(FileDown, {}), " Descargar acta"]
								})
							}
						],
						filas: lista,
						claveFila: (i) => i.id
					})]
				}, ultima.sujetoDni || ultima.sujetoNombre);
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Subtitulo, {
					acciones: /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => setNuevoCompromiso({
							id: "",
							proyecto: proyecto || proyectoDefault,
							codigoPredio: "",
							actor: "",
							compromiso: "",
							responsable: CURRENT_USER.nombre,
							plazo: today(),
							estado: "Pendiente",
							sustento: ""
						}),
						children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar compromiso"]
					}),
					children: "Acuerdos y compromisos"
				}),
				nuevoCompromiso && /* @__PURE__ */ jsxs("div", {
					className: "mb-3 rounded-md border border-border bg-background p-3",
					children: [/* @__PURE__ */ jsx(SpecForm, {
						fields: compromisoFields,
						value: nuevoCompromiso,
						onChange: (k, v) => setNuevoCompromiso({
							...nuevoCompromiso,
							[k]: v
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex justify-end gap-2",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setNuevoCompromiso(null),
							children: "Cancelar"
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							disabled: !nuevoCompromiso.compromiso.trim(),
							onClick: () => {
								persist({
									...store,
									compromisos: [...store.compromisos, {
										...nuevoCompromiso,
										id: uid()
									}]
								});
								setNuevoCompromiso(null);
							},
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar compromiso"]
						})]
					})]
				}),
				/* @__PURE__ */ jsx(SimpleTable, {
					rows: compromisos,
					empty: "Sin compromisos registrados.",
					etiquetaEliminar: "Eliminar compromiso",
					columns: [
						["Proyecto", (c) => projectName(c.proyecto)],
						["Predio", (c) => c.codigoPredio],
						["Actor", (c) => c.actor],
						["Compromiso", (c) => c.compromiso],
						["Responsable", (c) => c.responsable],
						["Plazo", (c) => fmtDate(c.plazo)],
						["Estado", (c) => /* @__PURE__ */ jsx(Pill, { level: c.estado })],
						["Sustento", (c) => c.sustento]
					],
					onDelete: (c) => persist({
						...store,
						compromisos: store.compromisos.filter((x) => x.id !== c.id)
					})
				})
			] })
		]
	});
}
function ActaTab({ draft, setField, setDraft, onSave }) {
	const toggle = (a) => setDraft({
		...draft,
		actividades: draft.actividades.includes(a) ? draft.actividades.filter((x) => x !== a) : [...draft.actividades, a]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Formato de registro de actividades de gestión social desarrolladas con sujetos pasivos · Dirección de Disponibilidad de Predios (DDP) · Formato para gestores sociales."
			}),
			/* @__PURE__ */ jsx(Section, {
				titulo: "Documentos que genera esta intervención",
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => descargarFicha(draft),
					children: [/* @__PURE__ */ jsx(FileDown, {}), " Ficha de empadronamiento (Word)"]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => descargarActa(draft),
					children: [/* @__PURE__ */ jsx(FileDown, {}), " Vista previa del acta (Word)"]
				})] }),
				children: /* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Se generan con los datos del formulario de abajo; el acta definitiva sale con «Guardar y generar acta»."
				})
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "I. Datos generales" }),
			/* @__PURE__ */ jsx(SpecForm, {
				fields: datosGeneralesFields,
				value: draft,
				onChange: setField
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "II. Identificación del sujeto pasivo" }),
			/* @__PURE__ */ jsx(SpecForm, {
				fields: sujetoFields,
				value: draft,
				onChange: setField
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "III. Tipo de actividad" }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-1.5 sm:grid-cols-2",
				role: "group",
				"aria-label": "Tipo de actividad",
				children: [ACTIVIDADES.map((a) => /* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						className: CHECK,
						checked: draft.actividades.includes(a),
						onChange: () => toggle(a)
					}), a]
				}, a)), /* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 text-sm",
					children: ["Otro:", /* @__PURE__ */ jsx("input", {
						className: controlClase,
						value: draft.otraActividad,
						onChange: (e) => setField("otraActividad", e.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "IV a VIII. Objetivo, desarrollo, percepción, evaluación y observaciones" }),
			/* @__PURE__ */ jsx(SpecForm, {
				fields: evaluacionFields,
				value: draft,
				onChange: setField
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap justify-end gap-2 border-t border-border pt-4",
				children: [
					/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: () => setDraft(emptyIntervencion()),
						children: "Limpiar formulario"
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onSave(false),
						children: [/* @__PURE__ */ jsx(Save, {}), " Guardar intervención"]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						onClick: () => onSave(true),
						children: [/* @__PURE__ */ jsx(FileDown, {}), " Guardar y generar acta (Word)"]
					})
				]
			})
		]
	});
}
function CrudTab({ titulo, nombre, items, fields, empty, columns, onChange }) {
	const [nuevo, setNuevo] = useState(null);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setNuevo(empty),
				children: [
					/* @__PURE__ */ jsx(Plus, {}),
					" Registrar ",
					nombre
				]
			}),
			children: titulo
		}),
		nuevo && /* @__PURE__ */ jsxs("div", {
			className: "mb-3 rounded-md border border-border bg-background p-3",
			children: [/* @__PURE__ */ jsx(SpecForm, {
				fields,
				value: nuevo,
				onChange: (k, v) => setNuevo({
					...nuevo,
					[k]: v
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex justify-end gap-2",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setNuevo(null),
					children: "Cancelar"
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => {
						onChange([...items, {
							...nuevo,
							id: uid()
						}]);
						setNuevo(null);
					},
					children: [
						/* @__PURE__ */ jsx(Save, {}),
						" Guardar ",
						nombre
					]
				})]
			})]
		}),
		/* @__PURE__ */ jsx(SimpleTable, {
			rows: items,
			columns,
			empty: "Sin registros.",
			etiquetaEliminar: `Eliminar ${nombre}`,
			onDelete: (row) => onChange(items.filter((x) => x.id !== row.id))
		})
	] });
}
function BotonEliminar({ etiqueta, onClick }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		"aria-label": etiqueta,
		title: etiqueta,
		className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
		onClick,
		children: /* @__PURE__ */ jsx(Trash2, {
			size: 16,
			"aria-hidden": true
		})
	});
}
function SimpleTable({ rows, columns, empty, etiquetaEliminar, onDelete }) {
	return /* @__PURE__ */ jsx(Tabla, {
		columnas: [...columns.map(([h, render]) => ({
			clave: h,
			titulo: h,
			render
		})), {
			clave: "acciones",
			titulo: "Acciones",
			alinear: "derecha",
			render: (row) => /* @__PURE__ */ jsx(BotonEliminar, {
				etiqueta: etiquetaEliminar,
				onClick: () => onDelete(row)
			})
		}],
		filas: rows,
		claveFila: (r) => r.id,
		vacio: empty
	});
}
function Metric({ label, value, tono }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-lg border border-border bg-card p-3",
		children: [/* @__PURE__ */ jsx("dd", {
			className: `inline-flex size-9 shrink-0 items-center justify-center rounded-md text-lg font-semibold tabular-nums ${{
				neutral: "bg-muted text-muted-foreground",
				primary: "bg-primary-soft text-primary-dark",
				success: "bg-success-soft text-success",
				warning: "bg-warning-soft text-warning",
				destructive: "bg-destructive-soft text-destructive"
			}[tono]}`,
			children: value
		}), /* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		})]
	});
}
var PILL = {
	Bajo: "success",
	Medio: "warning",
	Alto: "destructive",
	Acepta: "success",
	"En evaluación": "warning",
	"Requiere mayor información": "primary",
	Rechaza: "destructive",
	Cumplido: "success",
	Pendiente: "warning",
	"En curso": "primary",
	Incumplido: "destructive",
	Implementada: "success",
	Cerrada: "success",
	"En implementación": "primary",
	Programada: "warning"
};
function Pill({ level }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: PILL[level] ?? "neutral",
		children: level || "Sin dato"
	});
}
//#endregion
export { GestionSocialPage as component };
