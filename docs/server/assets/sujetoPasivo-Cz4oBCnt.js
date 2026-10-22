import { s as registrarHito, t as almacenArchivos } from "./archivosIdb-BbjJAFd8.js";
import { _ as registrarEnBitacora, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { useSyncExternalStore } from "react";
//#region src/lib/areas.ts
var NOMBRE_TIPO_AREA = {
	ORGANO: "Órgano",
	UNIDAD_ORGANICA: "Unidad orgánica",
	EQUIPO: "Equipo"
};
var area = (id, codigo, nombre, tipo, padreId, orden, extra = {}) => ({
	id,
	codigo,
	nombre,
	tipo,
	padreId,
	orden,
	responsableId: "",
	codigoOrgano: "",
	emiteDocumentos: false,
	estado: "ACTIVA",
	vigenteDesde: "",
	observacion: "",
	...extra
});
/** Estructura de demostración. Los códigos de órgano están por confirmar con la DDP. */
var AREAS_INICIALES = [
	area("mtc", "MTC", "Ministerio de Transportes y Comunicaciones", "ORGANO", null, 1, { emiteDocumentos: true }),
	area("vmt", "VMT", "Despacho Viceministerial de Transportes", "ORGANO", "mtc", 1),
	area("dgppt", "DGPPT", "Dirección General de Programas y Proyectos de Transportes", "ORGANO", "vmt", 1, {
		codigoOrgano: "19",
		emiteDocumentos: true
	}),
	area("ddp", "DDP", "Dirección de Disponibilidad de Predios", "UNIDAD_ORGANICA", "dgppt", 1, {
		codigoOrgano: "19.03",
		emiteDocumentos: true,
		responsableId: "USR-006"
	}),
	area("ddp-adq", "ADQ", "Equipo de Adquisiciones", "EQUIPO", "ddp", 1, { responsableId: "USR-001" }),
	area("ddp-exp", "EXP", "Equipo de Expropiaciones", "EQUIPO", "ddp", 2, { responsableId: "USR-002" }),
	area("ddp-san", "SAN", "Equipo de Saneamiento", "EQUIPO", "ddp", 3),
	area("ddp-seg", "SEG", "Equipo de Seguimiento", "EQUIPO", "ddp", 4, { responsableId: "USR-005" }),
	area("ddp-bri", "BRI", "Brigadas de campo", "EQUIPO", "ddp", 5, { responsableId: "USR-003" }),
	area("oga", "OGA", "Oficina General de Administración", "ORGANO", "mtc", 2, { emiteDocumentos: true }),
	area("oaj", "OAJ", "Oficina General de Asesoría Jurídica", "ORGANO", "mtc", 3, { emiteDocumentos: true }),
	area("ppm", "PP", "Procuraduría Pública", "ORGANO", "mtc", 4, { emiteDocumentos: true })
];
var CLAVE = "pdgp-areas";
var datos = null;
var oyentes = /* @__PURE__ */ new Set();
function cargar() {
	if (datos) return datos;
	try {
		const guardado = localStorage.getItem(CLAVE);
		datos = guardado ? JSON.parse(guardado) : AREAS_INICIALES;
	} catch {
		datos = AREAS_INICIALES;
	}
	return datos;
}
function useAreas() {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, cargar, () => AREAS_INICIALES);
}
var leerAreas = () => cargar();
/** Guarda todas las áreas y deja la versión en el histórico "areas" con su motivo. */
function guardarAreas(nuevas, accion, objeto, motivo) {
	const antes = cargar();
	datos = nuevas;
	try {
		localStorage.setItem(CLAVE, JSON.stringify(nuevas));
	} catch {}
	oyentes.forEach((f) => f());
	registrarCambio("areas", {
		accion,
		objeto,
		motivo,
		antes,
		despues: nuevas
	}, {
		modulo: 8,
		entidad: "areas"
	});
}
var idArea = () => `area-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
/** Hijos directos ordenados (raíces con `padreId` null). */
function hijosDe(areas, padreId) {
	return areas.filter((a) => a.padreId === padreId).sort((a, b) => a.orden - b.orden || a.codigo.localeCompare(b.codigo));
}
/** Ids de todos los descendientes (sin incluir al área). */
function descendientes(areas, id) {
	const salida = /* @__PURE__ */ new Set();
	const pila = [id];
	while (pila.length) {
		const actual = pila.pop();
		for (const h of areas) if (h.padreId === actual && !salida.has(h.id)) {
			salida.add(h.id);
			pila.push(h.id);
		}
	}
	return salida;
}
/** Desde la raíz hasta el área: [MTC, VMT, DGPPT, DDP]. */
function rutaArea(areas, id) {
	const porId = new Map(areas.map((a) => [a.id, a]));
	const ruta = [];
	let actual = porId.get(id);
	while (actual && ruta.length <= areas.length) {
		ruta.unshift(actual);
		actual = actual.padreId ? porId.get(actual.padreId) : void 0;
	}
	return ruta;
}
var textoRuta = (areas, id) => rutaArea(areas, id).map((a) => a.codigo).join(" > ");
/**
* Código del órgano emisor en la numeración documental: la sigla de la raíz y el código del área
* ("MTC/19.03"). Un área raíz se codifica solo con su sigla.
*/
function codigoDocumental(areas, id) {
	const ruta = rutaArea(areas, id);
	const a = ruta[ruta.length - 1];
	if (!a) return "";
	if (ruta.length === 1) return a.codigo;
	return `${ruta[0].codigo}/${a.codigoOrgano || a.codigo}`;
}
/** Error que impide guardar el área, o null. `a` puede ser nueva (id que aún no está en la lista). */
function validarArea(areas, a, usuarios) {
	if (!a.codigo.trim()) return "Ingrese la sigla del área.";
	if (!/^[A-ZÑ0-9.-]+$/i.test(a.codigo.trim())) return "La sigla solo admite letras, números, punto y guion.";
	if (!a.nombre.trim()) return "Ingrese el nombre del área.";
	if (areas.some((x) => x.id !== a.id && x.codigo.toUpperCase() === a.codigo.trim().toUpperCase())) return `La sigla ${a.codigo.toUpperCase()} ya la usa otra área.`;
	if (a.padreId) {
		if (a.padreId === a.id) return "Un área no puede depender de sí misma.";
		if (descendientes(areas, a.id).has(a.padreId)) return "El área no puede depender de una de sus subáreas.";
		const padre = areas.find((x) => x.id === a.padreId);
		if (!padre) return "El área superior no existe.";
		if (padre.estado === "INACTIVA" && a.estado === "ACTIVA") return `El área superior ${padre.codigo} está inactiva.`;
	}
	if (a.responsableId) {
		const r = usuarios.find((u) => u.id === a.responsableId);
		if (!r) return "El responsable no está registrado como usuario.";
		if (r.estado !== "Activo") return `${r.nombre} está inactivo: elija un responsable activo.`;
	}
	return null;
}
/** Por qué no se puede inactivar el área, o null. */
function bloqueoInactivar(areas, id, usuarios) {
	const hijas = areas.filter((a) => a.padreId === id && a.estado === "ACTIVA");
	const miembros = usuarios.filter((u) => u.areaId === id && u.estado === "Activo");
	const partes = [hijas.length && `${hijas.length} subárea(s) activa(s): ${hijas.map((h) => h.codigo).join(", ")}`, miembros.length && `${miembros.length} usuario(s) activo(s) asignado(s)`].filter(Boolean);
	return partes.length ? `Tiene ${partes.join(" y ")}. Inactívelas o reasígnelos primero.` : null;
}
/** Áreas de las que el usuario es responsable (aviso al inactivarlo). */
var areasACargoDe = (areas, usuarioId) => areas.filter((a) => a.responsableId === usuarioId && a.estado === "ACTIVA");
/** Siguiente posición entre los hijos de `padreId`. */
var siguienteOrden$1 = (areas, padreId) => Math.max(0, ...hijosDe(areas, padreId).map((a) => a.orden)) + 1;
//#endregion
//#region src/lib/usuarios.ts
var USUARIOS_INICIALES = [
	{
		id: "USR-001",
		nombre: "Juan Carlos Perez Garcia",
		email: "juan.perez@proyecto.com",
		doc: "DNI 42145678",
		cargo: "Especialista Técnico Predial",
		roles: ["Especialista Técnico", "Responsable Predial"],
		estado: "Activo",
		ultimo: "Hoy, 08:42 a. m.",
		areaId: "ddp-adq"
	},
	{
		id: "USR-002",
		nombre: "Maria Elena Lopez Ruiz",
		email: "maria.lopez@proyecto.com",
		doc: "DNI 40651234",
		cargo: "Especialista Legal",
		roles: ["Especialista Legal"],
		estado: "Activo",
		ultimo: "Ayer, 06:15 p. m.",
		areaId: "ddp-exp"
	},
	{
		id: "USR-003",
		nombre: "Carlos Ramos Delgado",
		email: "carlos.ramos@proyecto.com",
		doc: "DNI 43895621",
		cargo: "Supervisor de campo",
		roles: ["Supervisor", "Brigadista"],
		estado: "Activo",
		ultimo: "Hoy, 07:58 a. m.",
		areaId: "ddp-bri"
	},
	{
		id: "USR-004",
		nombre: "Rosa Vilchez Torres",
		email: "rosa.vilchez@proyecto.com",
		doc: "DNI 29561478",
		cargo: "Consultora externa",
		roles: ["Consultor"],
		estado: "Inactivo",
		ultimo: "12/06/2026",
		areaId: "ddp-san"
	},
	{
		id: "USR-005",
		nombre: "Luis Alberto Nuñez",
		email: "luis.nunez@proyecto.com",
		doc: "CE 00875612",
		cargo: "Digitador",
		roles: ["Digitador"],
		estado: "Activo",
		ultimo: "Hoy, 09:05 a. m.",
		areaId: "ddp-seg"
	},
	{
		id: "USR-006",
		nombre: "Patricia Gomez Salas",
		email: "patricia.gomez@proyecto.com",
		doc: "DNI 41778542",
		cargo: "Responsable predial",
		roles: ["Responsable Predial"],
		estado: "Activo",
		ultimo: "Hoy, 08:17 a. m.",
		areaId: "ddp"
	},
	{
		id: "USR-007",
		nombre: "Usuario de demostración",
		email: "bim@mtc.gob.pe",
		doc: "DNI 00000000",
		cargo: "Administrador del sistema",
		roles: ["Administrador del sistema"],
		estado: "Activo",
		ultimo: "Hoy",
		areaId: "ddp"
	}
];
/**
* Guarda la lista de usuarios como nueva versión del histórico "usuarios" (la misma que usa la
* pantalla de Usuarios), por ejemplo al asignarlos a un área desde Áreas.
*/
function guardarUsuarios(antes, despues, accion, objeto, motivo) {
	registrarCambio("usuarios", {
		accion,
		objeto,
		motivo,
		antes,
		despues
	}, {
		modulo: 8,
		entidad: "usuarios"
	});
}
/** Lista vigente de usuarios: la última versión guardada o la de demostración. */
function useUsuarios() {
	return useHistorial("usuarios")[0]?.registro ?? USUARIOS_INICIALES;
}
//#endregion
//#region src/lib/documentos.ts
var NOMBRE_DIMENSION = {
	anio: "Año",
	areaEmisora: "Área emisora",
	areaDestino: "Área destino",
	usuario: "Usuario",
	subtipo: "Subtipo",
	proyecto: "Proyecto"
};
var NOMBRE_DIRIGIDO = {
	interno: "Interno",
	externo: "Externo",
	ambos: "Interno y externo"
};
var NOMBRE_FORMATO_AREA = {
	sigla: "sigla",
	codigoOrgano: "código de órgano",
	documental: "entidad/código"
};
function nombrePieza(p) {
	switch (p.tipo) {
		case "correlativo": return "Correlativo";
		case "anio": return `Año (${p.formato})`;
		case "siglaTipo": return "Sigla del tipo";
		case "siglaSubtipo": return "Sigla del subtipo";
		case "areaEmisora": return `Área emisora (${NOMBRE_FORMATO_AREA[p.formato]})`;
		case "areaDestino": return `Área destino (${NOMBRE_FORMATO_AREA[p.formato]})`;
		case "usuario": return p.formato === "iniciales" ? "Usuario (iniciales)" : "Usuario (código)";
		case "proyecto": return "Proyecto";
		case "texto": return `Texto fijo «${p.valor}»`;
	}
}
var sub = (id, sigla, nombre, descripcion = "") => ({
	id,
	sigla,
	nombre,
	descripcion,
	estado: "ACTIVO"
});
/** Catálogo de demostración. Siglas y usos por confirmar con la DDP. */
var TIPOS_INICIALES = [
	{
		id: "oficio",
		sigla: "OF",
		nombre: "Oficio",
		nombreEnNumero: "OFICIO",
		dirigidoA: "ambos",
		requiereDestino: true,
		orden: 1,
		estado: "ACTIVO",
		subtipos: [
			sub("of-afectacion", "AFE", "Comunicación de afectación", "Primera comunicación al sujeto pasivo."),
			sub("of-intencion", "INT", "Intención de adquisición", "Oferta de adquisición por trato directo."),
			sub("of-sunarp", "SUN", "Solicitud a SUNARP", "Anotación preventiva, inscripción, consultas."),
			sub("of-sbn", "SBN", "Solicitud a SBN", "Transferencia interestatal."),
			sub("of-base-grafica", "BG", "Solicitud de base gráfica"),
			sub("of-tasacion", "TAS", "Solicitud de tasación", "Presentación del expediente técnico al ente tasador."),
			sub("of-cbc", "CBC", "Solicitud de certificado de búsqueda catastral", "A SUNARP, art. 16.1."),
			sub("of-publicaciones", "PUB", "Notificación de publicaciones"),
			sub("of-perito", "PER", "Remisión de expediente al perito", "Entrega de información al perito."),
			sub("of-observacion", "OBS", "Observación de tasación", "Observaciones al informe del perito."),
			sub("of-expropiacion", "EXP", "Inicio de expropiación", "Comunicación al sujeto pasivo."),
			sub("of-consignacion", "CON", "Notificación de consignación"),
			sub("of-entrega", "ENT", "Requerimiento de entrega", "Requerimiento único, art. 20.4.f.")
		]
	},
	{
		id: "carta",
		sigla: "CI",
		nombre: "Carta",
		nombreEnNumero: "CARTA",
		dirigidoA: "externo",
		requiereDestino: true,
		orden: 2,
		estado: "ACTIVO",
		subtipos: [
			sub("ca-afectacion", "AFE", "Comunicación de afectación"),
			sub("ca-intencion", "INT", "Intención de adquisición"),
			sub("ca-respuesta", "RSP", "Respuesta al sujeto pasivo"),
			sub("ca-mejoras", "MEJ", "Reconocimiento de mejoras"),
			sub("ca-entrega", "ENT", "Requerimiento de entrega")
		]
	},
	{
		id: "memorando",
		sigla: "MEMO",
		nombre: "Memorando",
		nombreEnNumero: "MEMORANDO",
		dirigidoA: "interno",
		requiereDestino: true,
		orden: 3,
		estado: "ACTIVO",
		subtipos: [
			sub("me-tasacion", "TAS", "Requerimiento de tasación"),
			sub("me-ccp", "CCP", "Requerimiento de certificación presupuestal"),
			sub("me-opat", "OPAT", "Remisión de expediente a OPAT"),
			sub("me-elevacion", "ELE", "Elevación de expediente", "DDP a DGPPT y DGPPT a viceministerio."),
			sub("me-deposito", "DEP", "Solicitud de devengado y depósito judicial")
		]
	},
	{
		id: "informe",
		sigla: "INF",
		nombre: "Informe",
		nombreEnNumero: "INFORME",
		dirigidoA: "interno",
		requiereDestino: false,
		orden: 4,
		estado: "ACTIVO",
		subtipos: [
			sub("in-pago", "PAG", "Informe técnico para pago", "Sustenta el devengado y el pago."),
			sub("in-requerimiento", "REQ", "Informe técnico para requerimiento"),
			sub("in-proyecto", "PRY", "Informe técnico del proyecto", "Diagnóstico, interferencias, avance."),
			sub("in-legal", "ITL", "Informe técnico legal"),
			sub("in-multiple", "MUL", "Informe múltiple", "Un informe que abarca varios predios."),
			sub("in-verificador", "VER", "Informe del verificador especialista"),
			sub("in-diagnostico", "DIA", "Diagnóstico técnico legal", "Condición jurídica del predio, art. 6, 7 y 16."),
			sub("in-respuesta", "RSP", "Evaluación de la respuesta del sujeto pasivo"),
			sub("in-conformidad", "CNF", "Conformidad del servicio")
		]
	},
	{
		id: "acta",
		sigla: "ACTA",
		nombre: "Acta",
		nombreEnNumero: "ACTA",
		dirigidoA: "ambos",
		requiereDestino: false,
		orden: 5,
		estado: "ACTIVO",
		subtipos: [
			sub("ac-empadronamiento", "EMP", "Empadronamiento e inspección de campo"),
			sub("ac-padron", "PAD", "Registro de padrón de campo"),
			sub("ac-posesion", "POS", "Entrega de posesión"),
			sub("ac-opat", "OPAT", "Entrega y recepción DDP–OPAT"),
			sub("ac-fe-entrega", "FE", "Fe de entrega")
		]
	},
	{
		id: "resolucion",
		sigla: "RD",
		nombre: "Resolución",
		nombreEnNumero: "RESOLUCIÓN DIRECTORAL",
		dirigidoA: "interno",
		requiereDestino: false,
		orden: 6,
		estado: "ACTIVO",
		subtipos: [sub("rd-directoral", "RD", "Resolución directoral")]
	},
	{
		id: "constancia",
		sigla: "CONST",
		nombre: "Constancia",
		nombreEnNumero: "CONSTANCIA",
		dirigidoA: "externo",
		requiereDestino: false,
		orden: 7,
		estado: "ACTIVO",
		subtipos: [sub("co-entrega", "ENT", "Entrega física")]
	},
	{
		id: "documento-tecnico",
		sigla: "DT",
		nombre: "Documento técnico",
		nombreEnNumero: "DOCUMENTO TÉCNICO",
		dirigidoA: "ambos",
		requiereDestino: false,
		orden: 8,
		estado: "ACTIVO",
		subtipos: [
			sub("dt-memoria", "MD", "Memoria descriptiva"),
			sub("dt-tdr", "TDR", "Términos de referencia"),
			sub("dt-formulario", "FR", "Formulario registral", "Lo firman el sujeto pasivo y el MTC."),
			sub("dt-montos", "ADM", "Anexo de distribución de montos"),
			sub("dt-cultivos", "CUL", "Relación cuantificada de cultivos"),
			sub("dt-obras", "OBC", "Relación de obras complementarias e instalaciones"),
			sub("dt-aviso", "AVI", "Aviso de publicación")
		]
	},
	{
		id: "resolucion-ministerial",
		sigla: "RM",
		nombre: "Resolución ministerial",
		nombreEnNumero: "RESOLUCIÓN MINISTERIAL",
		dirigidoA: "interno",
		requiereDestino: false,
		orden: 9,
		estado: "ACTIVO",
		subtipos: [sub("rm-valor", "VAL", "Aprobación del valor"), sub("rm-ejecucion", "EJE", "Ejecución de expropiación")]
	}
];
var regla = (id, tipoId, nombre, prefijo, piezas, reiniciaPor, extra = {}) => ({
	id,
	nombre,
	tipoId,
	prefijo,
	piezas,
	separador: "-",
	digitos: 4,
	reiniciaPor,
	vigenteDesde: "2026-01-01",
	estado: "ACTIVA",
	...extra
});
var N = { tipo: "correlativo" };
var AAAA = {
	tipo: "anio",
	formato: "AAAA"
};
var EMISOR_DOC = {
	tipo: "areaEmisora",
	formato: "documental"
};
var EMISOR_SIGLA = {
	tipo: "areaEmisora",
	formato: "sigla"
};
/** Reglas de demostración (formato del MTC asumido en PLAN-AREAS; por confirmar con un documento real). */
var REGLAS_INICIALES = [
	regla("r-oficio", "oficio", "Oficios", "OFICIO N.°", [
		N,
		AAAA,
		EMISOR_DOC
	], ["anio", "areaEmisora"]),
	regla("r-carta", "carta", "Cartas", "CARTA N.°", [
		N,
		AAAA,
		EMISOR_DOC
	], ["anio", "areaEmisora"]),
	regla("r-memorando", "memorando", "Memorandos", "MEMORANDO N.°", [
		N,
		AAAA,
		EMISOR_SIGLA,
		{
			tipo: "areaDestino",
			formato: "sigla"
		}
	], ["anio", "areaEmisora"]),
	regla("r-informe", "informe", "Informes", "INFORME N.°", [
		N,
		AAAA,
		EMISOR_SIGLA,
		{ tipo: "siglaSubtipo" }
	], ["anio", "areaEmisora"]),
	regla("r-acta", "acta", "Actas", "ACTA N.°", [
		N,
		AAAA,
		EMISOR_SIGLA,
		{ tipo: "siglaSubtipo" }
	], [
		"anio",
		"areaEmisora",
		"subtipo"
	]),
	regla("r-resolucion", "resolucion", "Resoluciones directorales", "RESOLUCIÓN DIRECTORAL N.°", [
		N,
		AAAA,
		EMISOR_DOC
	], ["anio", "areaEmisora"]),
	regla("r-constancia", "constancia", "Constancias", "CONSTANCIA N.°", [
		N,
		AAAA,
		EMISOR_SIGLA
	], ["anio", "areaEmisora"]),
	regla("r-documento-tecnico", "documento-tecnico", "Documentos técnicos", "DT N.°", [
		N,
		AAAA,
		EMISOR_SIGLA,
		{ tipo: "siglaSubtipo" }
	], [
		"anio",
		"areaEmisora",
		"subtipo"
	])
];
function almacen$1(clave, inicial, fusionar) {
	let datos = null;
	const oyentes = /* @__PURE__ */ new Set();
	const cargar = (forzar = false) => {
		if (datos && !forzar) return datos;
		try {
			const g = localStorage.getItem(clave);
			datos = g ? JSON.parse(g) : inicial;
			if (g && fusionar) datos = fusionar(datos);
		} catch {
			datos = datos ?? inicial;
		}
		return datos;
	};
	const guardar = (nuevo) => {
		datos = nuevo;
		try {
			localStorage.setItem(clave, JSON.stringify(nuevo));
		} catch {}
		oyentes.forEach((f) => f());
	};
	const suscribir = (f) => {
		oyentes.add(f);
		const alAlmacen = (e) => {
			if (e.key === clave) {
				cargar(true);
				f();
			}
		};
		if (typeof window !== "undefined") window.addEventListener("storage", alAlmacen);
		return () => {
			oyentes.delete(f);
			if (typeof window !== "undefined") window.removeEventListener("storage", alAlmacen);
		};
	};
	return {
		cargar,
		guardar,
		suscribir,
		inicial
	};
}
/**
* Lo que el catálogo inicial suma después de que el usuario ya guardó el suyo (tipos, subtipos y reglas
* nuevos por id) entra sin pisar lo editado.
*/
function sumarNuevos(guardado, inicial) {
	const ids = new Set(guardado.map((x) => x.id));
	return [...guardado, ...inicial.filter((x) => !ids.has(x.id))];
}
var tiposA = almacen$1("pdgp-documentos-tipos", TIPOS_INICIALES, (g) => sumarNuevos(g, TIPOS_INICIALES).map((t) => {
	const ini = TIPOS_INICIALES.find((x) => x.id === t.id);
	return ini ? {
		...t,
		subtipos: sumarNuevos(t.subtipos, ini.subtipos)
	} : t;
}));
var reglasA = almacen$1("pdgp-documentos-reglas", REGLAS_INICIALES, (g) => sumarNuevos(g, REGLAS_INICIALES));
var registroA = almacen$1("pdgp-documentos-registro", []);
var contadoresA = almacen$1("pdgp-documentos-contadores", {});
function useAlmacenDoc(a) {
	return useSyncExternalStore(a.suscribir, () => a.cargar(), () => a.inicial);
}
var useTiposDocumento = () => useAlmacenDoc(tiposA);
var useReglas = () => useAlmacenDoc(reglasA);
var useDocumentos = () => useAlmacenDoc(registroA);
var useContadores = () => useAlmacenDoc(contadoresA);
var leerTipos = () => tiposA.cargar();
var leerReglas = () => reglasA.cargar();
var BITACORA = { modulo: 8 };
function guardarTipos(nuevos, accion, objeto, motivo) {
	const antes = tiposA.cargar();
	tiposA.guardar(nuevos);
	registrarCambio("documentos-tipos", {
		accion,
		objeto,
		motivo,
		antes,
		despues: nuevos
	}, {
		...BITACORA,
		entidad: "tipo_documento"
	});
}
function guardarReglas(nuevas, accion, objeto, motivo) {
	const antes = reglasA.cargar();
	reglasA.guardar(nuevas);
	registrarCambio("documentos-reglas", {
		accion,
		objeto,
		motivo,
		antes,
		despues: nuevas
	}, {
		...BITACORA,
		entidad: "regla_numeracion"
	});
}
var idDocumento = (prefijo = "doc") => `${prefijo}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
var correoSesion = () => {
	try {
		return (localStorage.getItem("mtc-session") ?? "").trim().toLowerCase();
	} catch {
		return "";
	}
};
/** Usuario con ese correo en la lista vigente o en la de demostración. */
function usuarioPorCorreo(usuarios, correo) {
	if (!correo) return void 0;
	const c = correo.toLowerCase();
	return usuarios.find((u) => u.email.toLowerCase() === c) ?? USUARIOS_INICIALES.find((u) => u.email.toLowerCase() === c);
}
/** Usuario de la sesión. En el servidor no hay sesión: así el primer render coincide al hidratar. */
function useUsuarioSesion() {
	const correo = useSyncExternalStore(() => () => void 0, correoSesion, () => "");
	return usuarioPorCorreo(useUsuarios(), correo);
}
var iniciales = (nombre) => nombre.split(/\s+/).filter(Boolean).map((p) => p[0].toUpperCase()).join("");
var hoyIso$1 = (f = /* @__PURE__ */ new Date()) => `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")}`;
/**
* Regla que numera el tipo (o subtipo) en la fecha: entre las activas ya vigentes, la de subtipo manda
* sobre la del tipo; entre iguales, la de vigencia más reciente.
*/
function reglaVigente(reglas, tipoId, subtipoId, fecha = /* @__PURE__ */ new Date()) {
	const dia = hoyIso$1(fecha);
	return reglas.filter((r) => r.estado === "ACTIVA" && r.tipoId === tipoId && r.vigenteDesde <= dia && (!r.subtipoId || r.subtipoId === subtipoId)).sort((a, b) => Number(Boolean(b.subtipoId)) - Number(Boolean(a.subtipoId)) || b.vigenteDesde.localeCompare(a.vigenteDesde))[0];
}
/** Error que impide guardar la regla, o null. */
function validarRegla(reglas, r) {
	if (!r.nombre.trim()) return "Ingrese el nombre de la regla.";
	if (!r.tipoId) return "Elija el tipo de documento.";
	if (r.piezas.filter((p) => p.tipo === "correlativo").length !== 1) return "La regla debe tener exactamente una pieza Correlativo.";
	if (r.digitos < 1 || r.digitos > 8) return "El correlativo debe tener entre 1 y 8 dígitos.";
	if (!/^\d{4}-\d{2}-\d{2}$/.test(r.vigenteDesde)) return "Indique desde cuándo rige la regla.";
	if (r.piezas.some((p) => p.tipo === "texto" && !p.valor.trim())) return "Un texto fijo no puede quedar vacío.";
	const choca = reglas.find((x) => x.id !== r.id && x.estado === "ACTIVA" && r.estado === "ACTIVA" && x.tipoId === r.tipoId && (x.subtipoId ?? "") === (r.subtipoId ?? "") && x.vigenteDesde === r.vigenteDesde);
	if (choca) return `La regla «${choca.nombre}» ya numera ese tipo desde la misma fecha.`;
	return null;
}
/** Avisos que no impiden guardar. */
function avisosRegla(r, tipo) {
	const salida = [];
	const usa = (t) => r.piezas.some((p) => p.tipo === t);
	if (tipo?.requiereDestino && !usa("areaDestino")) salida.push("El tipo exige destino y la regla no lo imprime: el destino se guarda pero no sale en el número.");
	if (!usa("anio") && r.reiniciaPor.includes("anio")) salida.push("El contador reinicia cada año pero el número no muestra el año: se repetirán números de un año a otro.");
	if (usa("anio") && !r.reiniciaPor.includes("anio")) salida.push("El número muestra el año pero el contador no reinicia: la numeración seguirá corrida entre años.");
	if (!r.prefijo.trim()) salida.push("Sin prefijo, el número no dice qué documento es.");
	return salida;
}
/** Datos que la regla necesita y el contexto no trae. */
function faltantes(r, ctx, tipo) {
	const usa = (t) => r.piezas.some((p) => p.tipo === t) || r.reiniciaPor.includes(t);
	const salida = [];
	if (usa("areaEmisora") && !ctx.areaEmisoraId) salida.push("área emisora");
	if (usa("areaDestino") && !ctx.areaDestinoId) salida.push("área destino");
	if (tipo?.requiereDestino && !ctx.areaDestinoId && !ctx.destinatarioExterno?.trim()) {
		if (!salida.includes("área destino")) salida.push("destino");
	}
	if ((usa("siglaSubtipo") || usa("subtipo")) && !ctx.subtipoId) salida.push("subtipo");
	if (usa("proyecto") && !ctx.projectId) salida.push("proyecto");
	return salida;
}
function textoArea(areas, id, formato) {
	if (!id) return "";
	const a = areas.find((x) => x.id === id);
	if (!a) return "";
	if (formato === "sigla") return a.codigo;
	if (formato === "codigoOrgano") return a.codigoOrgano || a.codigo;
	return codigoDocumental(areas, id);
}
/**
* Número formateado. Puro: no lee almacenes, así se prueba y sirve para la vista previa. Una pieza sin
* dato se muestra entre corchetes ("[área destino]") para que la vista previa diga qué falta.
*/
function formatearNumero(r, tipo, ctx, correlativo, areas) {
	const falta = (q) => `[${q}]`;
	const subtipo = tipo?.subtipos.find((s) => s.id === ctx.subtipoId);
	const cuerpo = r.piezas.map((p) => {
		switch (p.tipo) {
			case "correlativo": return String(correlativo).padStart(r.digitos, "0");
			case "anio": {
				const a = String(ctx.fecha.getFullYear());
				return p.formato === "AA" ? a.slice(2) : a;
			}
			case "siglaTipo": return tipo?.sigla ?? falta("tipo");
			case "siglaSubtipo": return subtipo?.sigla ?? falta("subtipo");
			case "areaEmisora": return textoArea(areas, ctx.areaEmisoraId, p.formato) || falta("área emisora");
			case "areaDestino": return textoArea(areas, ctx.areaDestinoId, p.formato) || falta("área destino");
			case "usuario": return p.formato === "iniciales" ? iniciales(ctx.usuario.nombre) : ctx.usuario.id;
			case "proyecto": return ctx.projectId ? ctx.projectId.toUpperCase() : falta("proyecto");
			case "texto": return p.valor.trim();
		}
	}).filter(Boolean).join(r.separador);
	return r.prefijo.trim() ? `${r.prefijo.trim()} ${cuerpo}` : cuerpo;
}
/**
* Clave del contador: la regla (o el ámbito tipo/subtipo, para que una regla nueva del mismo tipo siga
* la numeración) más los valores de las dimensiones por las que reinicia.
*/
function claveContador(r, ctx) {
	const ambito = r.subtipoId ? `${r.tipoId}.${r.subtipoId}` : r.tipoId;
	const valor = {
		anio: String(ctx.fecha.getFullYear()),
		areaEmisora: ctx.areaEmisoraId ?? "",
		areaDestino: ctx.areaDestinoId ?? "",
		usuario: ctx.usuario.id,
		subtipo: ctx.subtipoId ?? "",
		proyecto: ctx.projectId ?? ""
	};
	return [ambito, ...r.reiniciaPor.map((d) => `${d}=${valor[d]}`)].join("|");
}
/** Clave de contador en palabras: "Oficio · Año 2026 · Área emisora DDP". */
function claveLegible(clave, tipos, areas) {
	const [ambito, ...dims] = clave.split("|");
	const [tipoId, subtipoId] = ambito.split(".");
	const tipo = tipos.find((t) => t.id === tipoId);
	const subtipo = tipo?.subtipos.find((s) => s.id === subtipoId);
	const partes = [subtipo ? `${tipo?.nombre} · ${subtipo.nombre}` : tipo?.nombre ?? tipoId];
	for (const d of dims) {
		const [k, v] = d.split("=");
		const texto = k === "areaEmisora" || k === "areaDestino" ? areas.find((a) => a.id === v)?.codigo ?? v : k === "subtipo" ? tipo?.subtipos.find((s) => s.id === v)?.nombre ?? v : v;
		partes.push(`${NOMBRE_DIMENSION[k] ?? k} ${texto || "(vacío)"}`);
	}
	return partes.join(" · ");
}
/** Último correlativo usado con la clave: el mayor entre el contador guardado y el registro. */
function ultimo(clave, contadores, registro) {
	return Math.max(contadores[clave] ?? 0, ...registro.filter((d) => d.claveContador === clave).map((d) => d.correlativo));
}
/** El siguiente número sin reservarlo (vista previa). */
function proximoNumero(r, tipo, ctx, areas = leerAreas()) {
	const clave = claveContador(r, ctx);
	const correlativo = ultimo(clave, contadoresA.cargar(), registroA.cargar()) + 1;
	return {
		numero: formatearNumero(r, tipo, ctx, correlativo, areas),
		correlativo,
		clave
	};
}
/**
* Reserva el número y lo registra. Relee el almacén justo antes (otra pestaña pudo reservar) y, si el
* número ya existe, pasa al siguiente. Lanza un Error si falta un dato que la regla necesita.
*/
function reservarNumero(r, tipo, ctx, datos, areas = leerAreas()) {
	const falta = faltantes(r, ctx, tipo);
	if (falta.length) throw new Error(`Falta indicar: ${falta.join(", ")}.`);
	const contadores = { ...contadoresA.cargar(true) };
	const registro = registroA.cargar(true);
	const clave = claveContador(r, ctx);
	const usados = new Set(registro.map((d) => d.numero));
	let n = ultimo(clave, contadores, registro) + 1;
	let numero = formatearNumero(r, tipo, ctx, n, areas);
	while (usados.has(numero)) numero = formatearNumero(r, tipo, ctx, ++n, areas);
	contadores[clave] = n;
	const doc = {
		id: idDocumento(),
		numero,
		claveContador: clave,
		correlativo: n,
		tipoId: datos.tipoId,
		subtipoId: ctx.subtipoId,
		reglaId: r.id,
		areaEmisoraId: ctx.areaEmisoraId,
		areaDestinoId: ctx.areaDestinoId,
		destinatarioExterno: ctx.destinatarioExterno?.trim() || void 0,
		usuarioId: ctx.usuario.id,
		usuarioNombre: ctx.usuario.nombre,
		fecha: ctx.fecha.toISOString(),
		projectId: ctx.projectId,
		predios: ctx.predios,
		origen: datos.origen,
		asunto: datos.asunto,
		archivo: datos.archivo,
		estado: "emitido"
	};
	contadoresA.guardar(contadores);
	registroA.guardar([doc, ...registro]);
	registrarEnBitacora({
		modulo: 8,
		entidad: "documento",
		registro: numero,
		accion: "generar",
		detalle: `${datos.asunto}${ctx.predios.length ? ` · predio ${ctx.predios.join(", ")}` : ""}`
	});
	return doc;
}
/** Registra un número emitido fuera del sistema; no consume correlativo. Lanza si ya existe. */
function registrarExterno(numero, ctx, datos) {
	const limpio = numero.trim().replace(/\s+/g, " ");
	if (!limpio) throw new Error("Ingrese el número del documento.");
	const registro = registroA.cargar(true);
	const igual = registro.find((d) => d.numero.toUpperCase() === limpio.toUpperCase());
	if (igual) throw new Error(`El número ${igual.numero} ya está registrado (${fechaCorta(igual.fecha)}).`);
	const doc = {
		id: idDocumento(),
		numero: limpio,
		claveContador: "",
		correlativo: 0,
		tipoId: datos.tipoId,
		subtipoId: ctx.subtipoId,
		areaEmisoraId: ctx.areaEmisoraId,
		areaDestinoId: ctx.areaDestinoId,
		destinatarioExterno: ctx.destinatarioExterno?.trim() || void 0,
		usuarioId: ctx.usuario.id,
		usuarioNombre: ctx.usuario.nombre,
		fecha: ctx.fecha.toISOString(),
		projectId: ctx.projectId,
		predios: ctx.predios,
		origen: datos.origen,
		asunto: datos.asunto,
		archivo: datos.archivo,
		externo: true,
		estado: "emitido"
	};
	registroA.guardar([doc, ...registro]);
	registrarEnBitacora({
		modulo: 8,
		entidad: "documento",
		registro: limpio,
		accion: "crear",
		detalle: `Número externo registrado: ${datos.asunto}`
	});
	return doc;
}
var fechaCorta = (iso) => iso.slice(0, 10).split("-").reverse().join("/");
/**
* Suma un predio a un documento ya emitido (un oficio múltiple a SUNARP, un documento generado desde otro
* paso). No genera número ni archivo nuevos. Lanza si el documento está anulado.
*/
function vincularPredio(id, predio) {
	const registro = registroA.cargar(true);
	const doc = registro.find((d) => d.id === id);
	if (!doc) throw new Error("El documento ya no está en el registro.");
	if (doc.estado === "anulado") throw new Error(`${doc.numero} está anulado: no se puede vincular.`);
	if (doc.predios.includes(predio)) return doc;
	const nuevo = {
		...doc,
		predios: [...doc.predios, predio]
	};
	registroA.guardar(registro.map((d) => d.id === id ? nuevo : d));
	registrarEnBitacora({
		modulo: 8,
		entidad: "documento",
		registro: doc.numero,
		accion: "editar",
		detalle: `Vinculó el predio ${predio}`
	});
	return nuevo;
}
/** Anula un documento: el número queda en el registro como anulado y no se vuelve a usar. */
function anularDocumento(id, motivo, usuario) {
	const registro = registroA.cargar(true);
	const doc = registro.find((d) => d.id === id);
	if (!doc || doc.estado === "anulado") return;
	registroA.guardar(registro.map((d) => d.id === id ? {
		...d,
		estado: "anulado",
		anulacion: {
			motivo,
			usuario,
			fecha: (/* @__PURE__ */ new Date()).toISOString()
		}
	} : d));
	registrarEnBitacora({
		modulo: 8,
		entidad: "documento",
		registro: doc.numero,
		accion: "anular",
		detalle: `Motivo: ${motivo}`
	});
}
/**
* Ajuste de arranque: fija el último número usado de un contador (la DDP ya va por el 0143). No puede
* quedar por debajo de lo ya emitido con esa clave.
*/
function ajustarContador(clave, valor, motivo) {
	const registro = registroA.cargar(true);
	const emitido = Math.max(0, ...registro.filter((d) => d.claveContador === clave).map((d) => d.correlativo));
	if (!Number.isInteger(valor) || valor < 0) return "Ingrese un número entero.";
	if (valor < emitido) return `Ya se emitió el ${emitido} con este contador: no puede bajar de ahí.`;
	const antes = contadoresA.cargar(true);
	const despues = {
		...antes,
		[clave]: valor
	};
	contadoresA.guardar(despues);
	registrarCambio("documentos-contadores", {
		accion: "Ajustó contador",
		objeto: `${clave} a ${valor}`,
		motivo,
		antes,
		despues
	}, {
		modulo: 8,
		entidad: "regla_numeracion"
	});
	return null;
}
/** Contadores vivos: los guardados más los que solo aparecen en el registro. */
function contadoresVivos(contadores, registro) {
	return [.../* @__PURE__ */ new Set([...Object.keys(contadores), ...registro.map((d) => d.claveContador).filter(Boolean)])].map((clave) => ({
		clave,
		ultimo: ultimo(clave, contadores, registro),
		documentos: registro.filter((d) => d.claveContador === clave).length
	}));
}
/** Documentos de un predio, un proyecto o un usuario, del más nuevo al más antiguo. */
function documentosDe(registro, f) {
	return registro.filter((d) => (!f.projectId || d.projectId === f.projectId) && (!f.predio || d.predios.includes(f.predio)) && (!f.usuarioId || d.usuarioId === f.usuarioId) && (!f.tipoId || d.tipoId === f.tipoId));
}
//#endregion
//#region src/lib/expedienteCsv.ts
/**
* Lista de la DDP «Módulos_EPD_16.10.2026_6pm» tal cual: módulo y documento que debe tener el
* expediente predial digital. Es la fuente de la cobertura (docs/PLAN-EXPEDIENTE-DOCUMENTOS.md §0): toda
* fila con texto debe estar en el catálogo del expediente. No se edita a mano; una lista nueva se
* importa desde M8 → Documentos del expediente.
*/
var CSV_DDP = [
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Levantamiento catastral predial (Actividad)"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Base gráfica predial individualizada e integrada en la Geodatabase corporativa, conformada por el Predio Matriz, Áreas Afectadas individualizadas y Áreas Remanentes."],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Padrón de predios afectados actualizados"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Codificación del predio y apertura del Expediente Predial Digital (Actividad)"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Plano perimétrico para búsqueda catastral (Inc. Ubicación)"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Memoria descriptiva para búsqueda catastral"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Solicitud de Certificado de Búsqueda Catastral"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Certificado de Búsqueda Catastral (CBC)"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Informe del Especialista Técnico / Especialista Técnico."],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Títulos Archivados."],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Documentos que acrediten la posesión."],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Publicaciones (No registrados)"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Notificación de publicaciones"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Certificado Registral Inmobiliario."],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Partida Registral."],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Visualización de no existir título pendiente. (Actividad)"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Ficha RENIEC, DNI o documento de la Personería Jurídica de corresponder."],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Oficio de Comunicación de afectación"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Cargo de Oficio de Comunicación de afectación"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Certificación de Oficio de Comunicación de afectación"],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Oficio a SUNARP solicitando la inscripción de la Anotación Preventiva."],
	["Módulo 12. Diagnóstico Técnico Legal Específico", "Asiento de Inscripción de la Anotación Preventiva."],
	["Módulo 13. Regularización de la Condición Técnico Legal de Predios", ""],
	["Módulo 13. Regularización de la Condición Técnico Legal de Predios", ""],
	["Módulo 13. Regularización de la Condición Técnico Legal de Predios", ""],
	["Módulo 13. Regularización de la Condición Técnico Legal de Predios", ""],
	["Módulo 13. Regularización de la Condición Técnico Legal de Predios", ""],
	["Módulo 14. Gestión de la Tasación", "Plano de ubicación"],
	["Módulo 14. Gestión de la Tasación", "Plano Afectación"],
	["Módulo 14. Gestión de la Tasación", "Plano de distribución en el caso haya edificaciones"],
	["Módulo 14. Gestión de la Tasación", "Memoria Descriptiva"],
	["Módulo 14. Gestión de la Tasación", "Copia informativa de la partida registral con una antigüedad no mayor a seis (6) meses de su expedición, en caso de tratarse de un bien inmueble inscrito."],
	["Módulo 14. Gestión de la Tasación", "Declaratoria de Fábrica o Edificación, si la hubiera"],
	["Módulo 14. Gestión de la Tasación", "Declaración Jurada de Autoevalúo, correspondiente al último año, si la hubiera"],
	["Módulo 14. Gestión de la Tasación", "Relación cuantificada de cultivos permanente y/o transitorios, indicando sus características, si los hubiera"],
	["Módulo 14. Gestión de la Tasación", "Relación cuantificada de obras complementarias e instalaciones fijas y permanentes, si las hubiera"],
	["Módulo 14. Gestión de la Tasación", "En caso de construcciones especiales: cuando las hubiera, se acompañará la siguiente documentación: Planos, Memoria Descriptiva y especificaciones técnicas relativa a las mismas"],
	["Módulo 14. Gestión de la Tasación", "Valor estimado del inmueble, si lo hubiera."],
	["Módulo 14. Gestión de la Tasación", "Otros (Plano de Zonificación, Ordenanza Municipal, PMD, Resolución Directoral)"],
	["Módulo 14. Gestión de la Tasación", "Documentos respecto del sujeto pasivo"],
	["Módulo 14. Gestión de la Tasación", "Copia simple del Título de Propiedad y/o documento que acredite propiedad y otros; y en caso de no ser propietario, la Constancia de Posesión considerando los supuestos establecidos en los artículos 6 y 7 del presente Decreto Legislativo."],
	["Módulo 14. Gestión de la Tasación", "Documento que acredite la identidad, denominación social o razón social del Sujeto Pasivo:"],
	["Módulo 14. Gestión de la Tasación", "En caso de persona natural: copia simple del documento de identidad del titular afectado o de la certificación de identidad emitida por el Registro Nacional de Identificación y Estado Civil - RENIEC"],
	["Módulo 14. Gestión de la Tasación", "En caso de persona jurídica: copia simple de la partida registral actualizada emitida por el Registro de Personas Jurídicas de la SUNARP"],
	["Módulo 14. Gestión de la Tasación", "Requisitos para fijar la indemnización por Perjuicio Económico"],
	["Módulo 14. Gestión de la Tasación", "Lucro cesante (contratos vigentes, acuerdos, PDT - Impuesto a la Renta, otros)"],
	["Módulo 14. Gestión de la Tasación", "Daño emergente o informe de sustento"],
	["Módulo 14. Gestión de la Tasación", "Memorando de requerimiento de Tasación"],
	["Módulo 14. Gestión de la Tasación", "Elaboración de TdR (Actividad)"],
	["Módulo 14. Gestión de la Tasación", "Orden de Servicio"],
	["Módulo 14. Gestión de la Tasación", "Constancia de notificación de la Orden de Servicio"],
	["Módulo 14. Gestión de la Tasación", "Oficio de entrega de información"],
	["Módulo 14. Gestión de la Tasación", "Constancia de notificación del Oficio"],
	["Módulo 14. Gestión de la Tasación", "Carta del Perito con el Informe Técnico de Tasación"],
	["Módulo 14. Gestión de la Tasación", "Informe Técnico de Tasación"],
	["Módulo 14. Gestión de la Tasación", "Oficio de solicitud de Observación de tasación al perito"],
	["Módulo 14. Gestión de la Tasación", "Cargo del oficio de Observación de tasación"],
	["Módulo 14. Gestión de la Tasación", "Informe Técnico de Conformidad - Perito Supervisor"],
	["Módulo 14. Gestión de la Tasación", "Conformidad del Servicio"],
	["Módulo 26. Gestión Presupuestal - Gestión de la Certificación de Crédito Presupuestario (CCP)", "Solicitud de Certificación de Crédito Presupuestario (CCP) y Adjuntos"],
	["Módulo 26. Gestión Presupuestal - Gestión de la Certificación de Crédito Presupuestario (CCP)", "Certificación de Crédito Presupuestario (CCP)"],
	["Módulo 15. Trato Directo", "Verificación registral previa / Consulta de partida registral, CRI y títulos pendientes de inscripción (de corresponder) (Actividad)"],
	["Módulo 15. Trato Directo", "Determinación de la oferta\nValor del ITT más incentivo del 20 % o 30 %, según corresponda. (Actividad)"],
	["Módulo 15. Trato Directo", "Generación de la carta de intención\nSe integra el ITT, modelo de Formulario Registral y otros anexos aplicables. (Actividad)"],
	["Módulo 15. Trato Directo", "Notificación de la oferta\nTrámite vinculado al STD, hoja de ruta y cargo de notificación. (Actividad)"],
	["Módulo 15. Trato Directo", "Control del plazo de respuesta\nDiez (10) días hábiles desde la notificación. (Actividad)"],
	["Módulo 15. Trato Directo", "Evaluación de la respuesta\nAceptación, rechazo o ausencia de respuesta; verificación de firmas, facultades y documentación tributaria cuando corresponda. (Actividad)"],
	["Módulo 16. Expropiación", "Rechazo de la oferta de adquisición por el Sujeto Pasivo."],
	["Módulo 16. Expropiación", "Falta de respuesta del Sujeto Pasivo dentro de los diez (10) días hábiles establecidos."],
	["Módulo 16. Expropiación", "Falta de acreditación de las facultades necesarias para disponer del Predio."],
	["Módulo 16. Expropiación", "Condiciones registrales que determinan la procedencia de la vía expropiatoria, identificadas mediante la evaluación de la partida registral, el CRI y los títulos en calificación."],
	["Módulo 16. Expropiación", "Duplicidad de partidas registrales entre el Estado o entidades estatales y particulares. Requiere gestionar previamente la transferencia del Predio estatal a favor del MTC."],
	["Módulo 16. Expropiación", "Duplicidad de partidas registrales entre el MTC y particulares, para expropiar el derecho privado."],
	["Módulo 16. Expropiación", "Oficio de comunicación de inicio del procedimiento de Expropiación dirigido al Sujeto Pasivo."],
	["Módulo 16. Expropiación", "Conformación del sustento de la Expropiación y continuidad del expediente. (Actividad)"],
	["Módulo 17. Reconocimiento de Mejoras", "Carta de intención de reconocimiento de mejoras"],
	["Módulo 17. Reconocimiento de Mejoras", "Notificación de la oferta\nTrámite vinculado al STD, hoja de ruta y cargo de notificación."],
	["Módulo 17. Reconocimiento de Mejoras", "Cargo de intención de reconocimiento de mejoras"],
	["Módulo 17. Reconocimiento de Mejoras", "Documento que acredita la aceptación"],
	["Módulo 18. Gestión de la Resolución", "Informe Técnico Legal (ITL)"],
	["Módulo 18. Gestión de la Resolución", "Anexo de distribución de montos"],
	["Módulo 18. Gestión de la Resolución", "Proyecto de Resolución (RM / RD según corresponda)"],
	["Módulo 18. Gestión de la Resolución", "Proyecto Memorando de la DDP dirigido a la DGPPT"],
	["Módulo 18. Gestión de la Resolución", "Proyecto Memorando de la DGPPT dirigido a VM según corresponda"],
	["Módulo 18. Gestión de la Resolución", "Resolución (RM / RD según corresponda)"],
	["Módulo 19. Trámite del Pago y Consignación", "Memorándum y anexos para solicitud de devengado y disposición del pago"],
	["Módulo 19. Trámite del Pago y Consignación", "Acta de Fe de Entrega"],
	["Módulo 19. Trámite del Pago y Consignación", "Formulario Registral"],
	["Módulo 19. Trámite del Pago y Consignación", "Comprobante de pago y cheque"],
	["Módulo 19. Trámite del Pago y Consignación", "Memorándum y anexos para solicitud de devengado y depósito judicial"],
	["Módulo 19. Trámite del Pago y Consignación", "Documento que acredita el depósito judicial"],
	["Módulo 19. Trámite del Pago y Consignación", "Oficio de notificación de consignación"],
	["Módulo 19. Trámite del Pago y Consignación", "Copia fedateada de la consignación"],
	["Módulo 19. Trámite del Pago y Consignación", "Acta de Fe de Entrega"],
	["Módulo 19. Trámite del Pago y Consignación", ""],
	["Módulo 20. Gestión de la Inscripción Registral de Predios Adquiridos", "Solicitud de inscripción de transferencia del predio a SUNARP"],
	["Módulo 20. Gestión de la Inscripción Registral de Predios Adquiridos", "Formulario Registral"],
	["Módulo 20. Gestión de la Inscripción Registral de Predios Adquiridos", "Acta de Fe de Entrega"],
	["Módulo 20. Gestión de la Inscripción Registral de Predios Adquiridos", "Constancia de inscripción de transferencia a favor del MTC."],
	["Módulo 20. Gestión de la Inscripción Registral de Predios Adquiridos", "Solicitud de inscripción de transferencia del predio a SUNARP"],
	["Módulo 20. Gestión de la Inscripción Registral de Predios Adquiridos", "Resolución Ministerial (RM) de expropiación"],
	["Módulo 20. Gestión de la Inscripción Registral de Predios Adquiridos", "Notificación notarial de la consignación"],
	["Módulo 20. Gestión de la Inscripción Registral de Predios Adquiridos", "Constancia de inscripción de transferencia a favor del MTC."],
	["Módulo 22. Recepción y Custodia de Predios", "Acta de entrega y recepción del predio del Sujeto Pasivo a la DDP."],
	["Módulo 22. Recepción y Custodia de Predios", "Acta de entrega y recepción del predio de la DDP a la OPAT"],
	["Módulo 22. Recepción y Custodia de Predios", "Expediente Predial Digital"]
];
//#endregion
//#region src/lib/firmaPdf.ts
/** Texto de un literal PDF "(...)" o hexadecimal "<FEFF...>", sin escapes. */
function textoPdf(v) {
	if (!v) return void 0;
	if (v.startsWith("<")) {
		const bytes = v.slice(1, -1).replace(/\s+/g, "").match(/../g)?.map((h) => parseInt(h, 16)) ?? [];
		if (bytes[0] === 254 && bytes[1] === 255) {
			let s = "";
			for (let i = 2; i + 1 < bytes.length; i += 2) s += String.fromCharCode(bytes[i] << 8 | bytes[i + 1]);
			return s;
		}
		return String.fromCharCode(...bytes);
	}
	const s = v.slice(1, -1).replace(/\\([0-7]{1,3}|[nrtbf()\\])/g, (_, c) => /^[0-7]/.test(c) ? String.fromCharCode(parseInt(c, 8)) : {
		n: "\n",
		r: "\r",
		t: "	",
		b: "",
		f: ""
	}[c] ?? c);
	if (s.startsWith("þÿ")) {
		let r = "";
		for (let i = 2; i + 1 < s.length; i += 2) r += String.fromCharCode(s.charCodeAt(i) << 8 | s.charCodeAt(i + 1));
		return r;
	}
	return s;
}
/** Fecha PDF "D:20261020153000-05'00'" → ISO. */
function fechaPdf(v) {
	const m = v?.match(/D:(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\d{2})?([Z+-])?(\d{2})?'?(\d{2})?/);
	if (!m) return void 0;
	const [, a, mes = "01", d = "01", h = "00", mi = "00", s = "00", z, zh, zm] = m;
	const zona = !z || z === "Z" ? "Z" : `${z}${zh ?? "00"}:${zm ?? "00"}`;
	const f = /* @__PURE__ */ new Date(`${a}-${mes}-${d}T${h}:${mi}:${s}${zona}`);
	return Number.isNaN(f.getTime()) ? void 0 : f.toISOString();
}
var valor = (dic, clave) => dic.match(new RegExp(`/${clave}\\s*(\\((?:\\\\.|[^\\\\)])*\\)|<[0-9A-Fa-f\\s]*>|/[^\\s/>]+)`))?.[1];
/** Firmas del PDF. Recibe el contenido como texto latin1 (un carácter por byte). */
function leerFirmasPdf(contenido) {
	if (!contenido.startsWith("%PDF")) return [];
	const firmas = [];
	for (const m of contenido.matchAll(/<<((?:(?!<<|>>)[\s\S])*?\/ByteRange[\s\S]*?)>>/g)) {
		const dic = m[1];
		if (!/\/Type\s*\/Sig\b/.test(dic) && !/\/Filter\s*\/Adobe\.PPKLite/.test(dic)) continue;
		const sub = valor(dic, "SubFilter");
		firmas.push({
			firmante: textoPdf(valor(dic, "Name")) || "Firmante no indicado en el PDF",
			fecha: fechaPdf(textoPdf(valor(dic, "M"))),
			motivo: textoPdf(valor(dic, "Reason")),
			lugar: textoPdf(valor(dic, "Location")),
			subfiltro: sub ? sub.replace(/^\//, "") : "sin subfiltro"
		});
	}
	return firmas;
}
/** Bytes del archivo como texto latin1, para `leerFirmasPdf`. */
async function textoLatin1(blob) {
	const bytes = new Uint8Array(await blob.arrayBuffer());
	let s = "";
	for (let i = 0; i < bytes.length; i += 32768) s += String.fromCharCode(...bytes.subarray(i, i + 32768));
	return s;
}
/** Huella SHA-256 en hexadecimal. */
async function sha256(blob) {
	const h = await crypto.subtle.digest("SHA-256", await blob.arrayBuffer());
	return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
var esPdf = (nombre, tipo = "") => tipo === "application/pdf" || /\.pdf$/i.test(nombre);
//#endregion
//#region src/lib/expediente.ts
/** Estados que cuentan como documento completo (cumple un requisito, suma al avance). */
var COMPLETO = [
	"firmado",
	"recibido",
	"hecho"
];
var NOMBRE_CLASE = {
	G: "Genera el sistema",
	R: "Recibido",
	C: "Cargo o constancia",
	A: "Actividad",
	ref: "Referencia"
};
var NOMBRE_ESTADO = {
	pendiente: "Pendiente",
	borrador: "Borrador",
	numerado: "Numerado, sin firma",
	en_firma: "En firma",
	firmado: "Firmado",
	recibido: "Registrado",
	hecho: "Hecho",
	observado: "Observado",
	anulado: "Anulado"
};
var NOMBRE_CONDICION = {
	inscrito: "predio inscrito",
	no_inscrito: "predio no inscrito",
	posesion: "predio no inscrito o con poseedor",
	acepta: "trato directo aceptado",
	expropiacion: "ruta de expropiación",
	con_edificaciones: "si hay edificaciones",
	con_cultivos: "si hay cultivos",
	con_obras: "si hay obras complementarias",
	con_perjuicio: "si se pide indemnización por perjuicio"
};
/** Filas de la lista de la DDP que son encabezado de grupo, no documento. */
var FILAS_GRUPO = /* @__PURE__ */ new Set([
	"Documentos respecto del sujeto pasivo",
	"Requisitos para fijar la indemnización por Perjuicio Económico",
	"Documento que acredite la identidad, denominación social o razón social del Sujeto Pasivo:"
]);
var numeroModulo = (etiqueta) => Number(etiqueta.match(/\d+/)?.[0] ?? 0);
var ordenCatalogo = 0;
/** Un ítem del catálogo. `t` = "tipo.subtipo|tipo.subtipo"; `filas` = índices de `CSV_DDP`. */
function d(id, paso, clase, nombre, o = {}) {
	const filas = o.filas ?? [];
	return {
		id,
		paso,
		otrosPasos: o.otros,
		modulo: o.mod ?? (filas.length ? numeroModulo(CSV_DDP[filas[0]][0]) : 0),
		nombre,
		clase,
		obligatorio: clase !== "ref" && !o.opcional,
		csv: filas.map((i) => ({
			modulo: CSV_DDP[i][0],
			texto: CSV_DDP[i][1]
		})),
		propuesto: o.propuesto,
		tipos: o.t?.split("|").map((x) => {
			const [tipoId, subtipoId] = x.split(".");
			return {
				tipoId,
				subtipoId
			};
		}),
		producto: o.producto,
		emisor: o.emisor,
		respaldaA: o.resp,
		referenciaA: o.ref,
		hito: o.hito,
		requisitos: o.req,
		recomendados: o.rec,
		aplicaSi: o.aplica,
		variantes: o.var,
		opciones: o.opciones,
		firmasEsperadas: o.firmas,
		vigenciaMeses: o.vigencia,
		orden: ++ordenCatalogo,
		estado: "ACTIVO"
	};
}
/** Catálogo por formulario del predio, en el orden del menú (plan §4). */
var CATALOGO_INICIAL = [
	d("emp-acta", "empadronamiento-inspeccion-campo", "G", "Acta de empadronamiento e inspección de campo", {
		t: "acta.ac-empadronamiento",
		propuesto: true,
		mod: 11
	}),
	d("emp-fotos", "empadronamiento-inspeccion-campo", "G", "Panel fotográfico de campo", {
		producto: "fotos",
		propuesto: true,
		mod: 11,
		opcional: true
	}),
	d("cod-apertura", "identificacion-codificacion-predio", "A", "Codificación del predio y apertura del expediente predial digital", { filas: [3] }),
	d("diag-informe", "diagnostico-preliminar", "G", "Informe de diagnóstico técnico legal (condición jurídica del predio)", {
		t: "informe.in-diagnostico",
		propuesto: true,
		mod: 12,
		rec: ["emp-acta"]
	}),
	d("diag-posesion", "diagnostico-preliminar", "R", "Documentos que acrediten la posesión", {
		filas: [10],
		emisor: "Sujeto pasivo",
		aplica: "posesion"
	}),
	d("cbc-plano", "cbc", "G", "Plano perimétrico para búsqueda catastral (incluye ubicación)", {
		filas: [4],
		producto: "gis"
	}),
	d("cbc-memoria", "cbc", "G", "Memoria descriptiva para búsqueda catastral", {
		filas: [5],
		t: "documento-tecnico.dt-memoria"
	}),
	d("cbc-solicitud", "cbc", "G", "Solicitud de certificado de búsqueda catastral", {
		filas: [6],
		t: "oficio.of-cbc",
		req: ["cbc-plano", "cbc-memoria"],
		hito: "cbc"
	}),
	d("cbc-certificado", "cbc", "R", "Certificado de búsqueda catastral (CBC)", {
		filas: [7],
		emisor: "SUNARP",
		rec: ["cbc-solicitud"]
	}),
	d("sp-identidad", "sujeto-pasivo", "R", "Ficha RENIEC, DNI o partida de la persona jurídica", {
		filas: [
			16,
			41,
			42,
			43
		],
		emisor: "RENIEC / SUNARP"
	}),
	d("sp-titulo", "sujeto-pasivo", "R", "Título de propiedad o constancia de posesión (art. 6 y 7)", {
		filas: [40],
		emisor: "Sujeto pasivo"
	}),
	d("sp-reniec", "sujeto-pasivo", "A", "Verificación de identidad en RENIEC", {
		propuesto: true,
		mod: 12,
		opcional: true
	}),
	d("ca-oficio", "comunicacion-afectacion", "G", "Oficio o carta de comunicación de afectación", {
		filas: [17],
		t: "oficio.of-afectacion|carta.ca-afectacion",
		req: ["sp-identidad"]
	}),
	d("ca-cargo", "comunicacion-afectacion", "C", "Cargo del oficio de comunicación de afectación", {
		filas: [18],
		resp: "ca-oficio",
		hito: "expediente_afectacion"
	}),
	d("ca-notarial", "comunicacion-afectacion", "R", "Certificación notarial del oficio de comunicación", {
		filas: [19],
		emisor: "Notario",
		opcional: true
	}),
	d("ca-constancia", "comunicacion-afectacion", "G", "Constancia de entrega física", {
		t: "constancia.co-entrega",
		propuesto: true,
		mod: 12,
		opcional: true,
		rec: ["ca-oficio"]
	}),
	d("ap-oficio", "anotacion-preventiva", "G", "Oficio a SUNARP solicitando la anotación preventiva", {
		filas: [20],
		t: "oficio.of-sunarp",
		aplica: "inscrito",
		req: [
			"rr-partida",
			"cbc-plano",
			"cbc-memoria"
		],
		hito: "anotacion_sunarp"
	}),
	d("ap-asiento", "anotacion-preventiva", "R", "Asiento de inscripción de la anotación preventiva", {
		filas: [21],
		emisor: "SUNARP",
		aplica: "inscrito",
		rec: ["ap-oficio"],
		hito: "anotacion_vigencia"
	}),
	d("pub-aviso", "publicacion-oposiciones", "G", "Aviso de publicación", {
		t: "documento-tecnico.dt-aviso",
		propuesto: true,
		mod: 12,
		aplica: "posesion"
	}),
	d("pub-diario", "publicacion-oposiciones", "R", "Publicaciones en el diario (predios no registrados)", {
		filas: [11],
		emisor: "Diario oficial o regional",
		aplica: "posesion",
		rec: ["pub-aviso"]
	}),
	d("pub-oficio", "publicacion-oposiciones", "G", "Oficio de notificación de publicaciones", {
		filas: [12],
		t: "oficio.of-publicaciones",
		aplica: "posesion",
		req: ["pub-diario"]
	}),
	d("pub-cargo", "publicacion-oposiciones", "C", "Cargo de la notificación de publicaciones", {
		resp: "pub-oficio",
		propuesto: true,
		mod: 12,
		aplica: "posesion"
	}),
	d("lev-actividad", "levantamiento-informacion-tecnica", "A", "Levantamiento catastral predial", { filas: [0] }),
	d("lev-base", "levantamiento-informacion-tecnica", "G", "Base gráfica individualizada en la geodatabase (predio matriz, áreas afectadas y remanentes)", {
		filas: [1],
		producto: "gis",
		rec: ["lev-actividad"]
	}),
	d("lev-padron", "levantamiento-informacion-tecnica", "G", "Padrón de predios afectados actualizado", {
		filas: [2],
		producto: "padron"
	}),
	d("rr-partida", "partidas-registrales", "R", "Partida registral", {
		filas: [14],
		emisor: "SUNARP",
		aplica: "inscrito"
	}),
	d("rr-titulos", "partidas-registrales", "R", "Títulos archivados", {
		filas: [9],
		emisor: "SUNARP",
		aplica: "inscrito"
	}),
	d("rr-sin-pendiente", "partidas-registrales", "A", "Visualización de no existir título pendiente", {
		filas: [15],
		aplica: "inscrito"
	}),
	d("ver-informe", "informe-verificador-especialista", "G", "Informe del especialista técnico (verificador)", {
		filas: [8],
		t: "informe.in-verificador",
		req: ["lev-actividad"]
	}),
	d("tas-memo", "requerimiento-tasacion-itl", "G", "Memorando de requerimiento de tasación", {
		filas: [47],
		t: "memorando.me-tasacion|oficio.of-tasacion",
		req: ["ver-informe", "lev-base"],
		rec: ["cbc-certificado"]
	}),
	d("tas-plano-ubicacion", "expediente-tasacion", "G", "Plano de ubicación", {
		filas: [27],
		producto: "gis"
	}),
	d("tas-plano-afectacion", "expediente-tasacion", "G", "Plano de afectación", {
		filas: [28],
		producto: "gis"
	}),
	d("tas-plano-distribucion", "expediente-tasacion", "G", "Plano de distribución (si hay edificaciones)", {
		filas: [29],
		producto: "gis",
		aplica: "con_edificaciones"
	}),
	d("tas-memoria", "expediente-tasacion", "G", "Memoria descriptiva", {
		filas: [30],
		t: "documento-tecnico.dt-memoria"
	}),
	d("tas-partida", "expediente-tasacion", "R", "Copia informativa de la partida registral (no mayor a 6 meses)", {
		filas: [31],
		emisor: "SUNARP",
		aplica: "inscrito",
		vigencia: 6
	}),
	d("tas-fabrica", "expediente-tasacion", "R", "Declaratoria de fábrica o edificación", {
		filas: [32],
		emisor: "Sujeto pasivo / SUNARP",
		aplica: "con_edificaciones"
	}),
	d("tas-autovaluo", "expediente-tasacion", "R", "Declaración jurada de autoevalúo del último año", {
		filas: [33],
		emisor: "Municipalidad / sujeto pasivo",
		opcional: true
	}),
	d("tas-cultivos", "expediente-tasacion", "G", "Relación cuantificada de cultivos permanentes o transitorios", {
		filas: [34],
		t: "documento-tecnico.dt-cultivos",
		aplica: "con_cultivos"
	}),
	d("tas-obras", "expediente-tasacion", "G", "Relación cuantificada de obras complementarias e instalaciones fijas", {
		filas: [35],
		t: "documento-tecnico.dt-obras",
		aplica: "con_obras"
	}),
	d("tas-especiales", "expediente-tasacion", "G", "Construcciones especiales: planos, memoria y especificaciones técnicas", {
		filas: [36],
		t: "documento-tecnico.dt-memoria",
		opcional: true
	}),
	d("tas-valor", "expediente-tasacion", "R", "Valor estimado del inmueble", {
		filas: [37],
		emisor: "Sujeto pasivo",
		opcional: true
	}),
	d("tas-otros", "expediente-tasacion", "R", "Otros: plano de zonificación, ordenanza municipal, PDM, resolución directoral", {
		filas: [38],
		emisor: "Municipalidad",
		opcional: true
	}),
	d("tas-ref-titulo", "expediente-tasacion", "ref", "Título de propiedad o constancia de posesión", { ref: "sp-titulo" }),
	d("tas-ref-identidad", "expediente-tasacion", "ref", "Documento de identidad del sujeto pasivo", { ref: "sp-identidad" }),
	d("tas-lucro", "expediente-tasacion", "R", "Lucro cesante (contratos vigentes, acuerdos, PDT, otros)", {
		filas: [45],
		emisor: "Sujeto pasivo",
		aplica: "con_perjuicio"
	}),
	d("tas-dano", "expediente-tasacion", "R", "Daño emergente o informe de sustento", {
		filas: [46],
		emisor: "Sujeto pasivo / especialista",
		aplica: "con_perjuicio"
	}),
	d("per-tdr", "perito-contratacion", "G", "Términos de referencia del servicio de tasación", {
		filas: [48],
		t: "documento-tecnico.dt-tdr",
		req: ["tas-memo"]
	}),
	d("per-orden", "perito-contratacion", "R", "Orden de servicio", {
		filas: [49],
		emisor: "OGA / Logística",
		rec: ["per-tdr"]
	}),
	d("per-orden-cargo", "perito-contratacion", "C", "Constancia de notificación de la orden de servicio", {
		filas: [50],
		resp: "per-orden"
	}),
	d("per-oficio", "perito-contratacion", "G", "Oficio de entrega de información al perito", {
		filas: [51],
		t: "oficio.of-perito",
		req: [
			"per-orden",
			"tas-memoria",
			"tas-plano-ubicacion",
			"tas-plano-afectacion"
		]
	}),
	d("per-oficio-cargo", "perito-contratacion", "C", "Constancia de notificación del oficio al perito", {
		filas: [52],
		resp: "per-oficio",
		hito: "tasacion"
	}),
	d("itt-carta", "tasacion-itt", "R", "Carta del perito con el informe técnico de tasación", {
		filas: [53],
		emisor: "Perito tasador",
		rec: ["per-oficio"]
	}),
	d("itt-informe", "tasacion-itt", "R", "Informe técnico de tasación (ITT)", {
		filas: [54],
		emisor: "Perito tasador",
		hito: "carta_intencion"
	}),
	d("rev-oficio", "revision-tasacion", "G", "Oficio de observación de tasación al perito", {
		filas: [55],
		t: "oficio.of-observacion",
		opcional: true,
		req: ["itt-informe"]
	}),
	d("rev-cargo", "revision-tasacion", "C", "Cargo del oficio de observación de tasación", {
		filas: [56],
		resp: "rev-oficio",
		opcional: true
	}),
	d("rev-supervisor", "revision-tasacion", "R", "Informe técnico de conformidad del perito supervisor", {
		filas: [57],
		emisor: "Perito supervisor",
		rec: ["itt-informe"]
	}),
	d("rev-conformidad", "revision-tasacion", "G", "Conformidad del servicio", {
		filas: [58],
		t: "informe.in-conformidad",
		req: ["rev-supervisor"]
	}),
	d("cri-certificado", "certificado-registral-inmobiliario", "R", "Certificado registral inmobiliario (CRI)", {
		filas: [13],
		emisor: "SUNARP",
		aplica: "inscrito"
	}),
	d("cri-verificacion", "certificado-registral-inmobiliario", "A", "Verificación registral previa (partida, CRI y títulos pendientes)", {
		filas: [61],
		aplica: "inscrito",
		rec: ["cri-certificado"]
	}),
	d("ccp-solicitud", "certificacion-presupuestal-ccp", "G", "Solicitud de certificación de crédito presupuestario y adjuntos", {
		filas: [59],
		t: "memorando.me-ccp",
		req: ["rev-conformidad"]
	}),
	d("ccp-certificado", "certificacion-presupuestal-ccp", "R", "Certificación de crédito presupuestario (CCP)", {
		filas: [60],
		emisor: "OGPP (SIAF)",
		rec: ["ccp-solicitud"]
	}),
	d("ci-oferta", "carta-intencion", "A", "Determinación de la oferta: valor del ITT más incentivo (20 % o 30 %)", {
		filas: [62],
		rec: ["itt-informe"]
	}),
	d("ci-carta", "carta-intencion", "G", "Carta de intención de adquisición (con ITT, modelo de formulario registral y anexos)", {
		filas: [63],
		t: "carta.ca-intencion|oficio.of-intencion",
		req: [
			"cri-certificado",
			"ccp-certificado",
			"itt-informe",
			"ci-oferta"
		]
	}),
	d("ci-cargo", "carta-intencion", "C", "Notificación de la oferta (STD, hoja de ruta y cargo)", {
		filas: [64],
		resp: "ci-carta",
		hito: "respuesta_sujeto_pasivo"
	}),
	d("ci-plazo", "carta-intencion", "A", "Control del plazo de respuesta (10 días hábiles)", { filas: [65] }),
	d("rsp-documento", "respuesta-sujeto-pasivo", "R", "Documento de respuesta del sujeto pasivo (aceptación o rechazo)", {
		emisor: "Sujeto pasivo",
		propuesto: true,
		mod: 15,
		opcional: true,
		rec: ["ci-cargo"],
		hito: "itl"
	}),
	d("rsp-evaluacion", "respuesta-sujeto-pasivo", "G", "Informe de evaluación de la respuesta (firmas, facultades, documentación tributaria)", {
		filas: [66],
		t: "informe.in-respuesta"
	}),
	d("rsp-resultado", "respuesta-sujeto-pasivo", "A", "Resultado de la oferta", {
		propuesto: true,
		mod: 15,
		rec: ["rsp-evaluacion"],
		opciones: [
			"Aceptación",
			"Rechazo",
			"Sin respuesta en el plazo"
		]
	}),
	d("itl-informe", "informe-tecnico-legal", "G", "Informe técnico legal (ITL)", {
		filas: [79],
		t: "informe.in-legal",
		aplica: "acepta",
		req: ["rsp-evaluacion"]
	}),
	d("itl-montos", "informe-tecnico-legal", "G", "Anexo de distribución de montos", {
		filas: [80],
		t: "documento-tecnico.dt-montos",
		aplica: "acepta"
	}),
	d("ele-ddp", "elevacion-expediente", "G", "Memorando de la DDP a la DGPPT", {
		filas: [82],
		t: "memorando.me-elevacion",
		aplica: "acepta",
		req: ["itl-informe", "itl-montos"]
	}),
	d("ele-dgppt", "elevacion-expediente", "G", "Memorando de la DGPPT al viceministerio", {
		filas: [83],
		t: "memorando.me-elevacion",
		aplica: "acepta",
		req: ["ele-ddp"]
	}),
	d("res-proyecto", "gestion-resolucion-rd", "G", "Proyecto de resolución (RD o RM)", {
		filas: [81],
		t: "resolucion.rd-directoral|resolucion-ministerial.rm-valor",
		aplica: "acepta",
		req: ["ele-ddp"]
	}),
	d("res-firmada", "gestion-resolucion-rd", "R", "Resolución firmada (RD o RM)", {
		filas: [84],
		emisor: "Dirección (RD) o Secretaría General (RM)",
		aplica: "acepta",
		rec: ["res-proyecto"],
		hito: "formulario_y_pago"
	}),
	d("ley-autoritativa", "ley-autoritativa", "R", "Ley autoritativa de la expropiación", {
		emisor: "Congreso / El Peruano",
		propuesto: true,
		mod: 16,
		aplica: "expropiacion",
		hito: "caducidad_ley"
	}),
	d("exp-causal", "inicio-expropiacion", "A", "Causal de expropiación", {
		filas: [
			67,
			68,
			69,
			70,
			71,
			72
		],
		aplica: "expropiacion",
		opciones: [
			"Rechazo de la oferta de adquisición por el sujeto pasivo",
			"Falta de respuesta del sujeto pasivo en los diez (10) días hábiles",
			"Falta de acreditación de las facultades para disponer del predio",
			"Condición registral que determina la vía expropiatoria (partida, CRI, títulos en calificación)",
			"Duplicidad de partidas entre el Estado o entidades estatales y particulares",
			"Duplicidad de partidas entre el MTC y particulares"
		]
	}),
	d("exp-oficio", "inicio-expropiacion", "G", "Oficio de comunicación de inicio de expropiación al sujeto pasivo", {
		filas: [73],
		t: "oficio.of-expropiacion",
		aplica: "expropiacion",
		req: ["exp-causal", "ley-autoritativa"]
	}),
	d("exp-itl", "informe-tecnico-legal-expropiacion", "G", "Informe técnico legal de expropiación (sustento y continuidad del expediente)", {
		filas: [74],
		t: "informe.in-legal",
		aplica: "expropiacion",
		req: ["exp-oficio"]
	}),
	d("exp-rm-proyecto", "expropiacion-procedimiento", "G", "Proyecto de resolución ministerial de ejecución", {
		t: "resolucion-ministerial.rm-ejecucion",
		propuesto: true,
		mod: 16,
		aplica: "expropiacion",
		req: ["exp-itl"]
	}),
	d("exp-rm", "expropiacion-procedimiento", "R", "Resolución ministerial de expropiación", {
		filas: [100],
		emisor: "Secretaría General",
		aplica: "expropiacion",
		hito: "consignacion"
	}),
	d("con-memo", "consignacion", "G", "Memorando de solicitud de devengado y depósito judicial", {
		filas: [89],
		t: "memorando.me-deposito",
		aplica: "expropiacion",
		req: ["exp-rm"]
	}),
	d("con-deposito", "consignacion", "R", "Documento que acredita el depósito judicial", {
		filas: [90],
		emisor: "Banco de la Nación",
		aplica: "expropiacion"
	}),
	d("con-oficio", "consignacion", "G", "Oficio de notificación de consignación", {
		filas: [91],
		t: "oficio.of-consignacion",
		aplica: "expropiacion",
		req: ["con-deposito"]
	}),
	d("con-fedateada", "consignacion", "R", "Copia fedateada de la consignación", {
		filas: [92],
		emisor: "Fedatario",
		aplica: "expropiacion"
	}),
	d("con-notarial", "consignacion", "R", "Notificación notarial de la consignación", {
		filas: [101],
		emisor: "Notario",
		aplica: "expropiacion"
	}),
	d("norma-constancia", "publicacion-notificacion-norma", "R", "Constancia de publicación y notificación de la norma", {
		emisor: "El Peruano / notario",
		propuesto: true,
		mod: 16,
		aplica: "expropiacion"
	}),
	d("dev-memo", "gestion-devengado", "G", "Memorando y anexos: solicitud de devengado y disposición del pago", {
		filas: [85],
		t: "informe.in-pago|memorando.me-ccp",
		aplica: "acepta",
		req: ["res-firmada"]
	}),
	d("pago-comprobante", "pago-consignacion", "R", "Comprobante de pago y cheque", {
		filas: [88],
		emisor: "OGA / Tesorería",
		aplica: "acepta",
		rec: ["dev-memo"]
	}),
	d("pago-acta-fe", "pago-consignacion", "G", "Acta de fe de entrega", {
		filas: [
			86,
			93,
			97
		],
		t: "acta.ac-fe-entrega",
		rec: ["pago-comprobante"]
	}),
	d("fr-formulario", "formulario-registral", "G", "Formulario registral", {
		filas: [87, 96],
		t: "documento-tecnico.dt-formulario",
		aplica: "acepta",
		firmas: 2,
		req: ["res-firmada"]
	}),
	d("sid-solicitud", "inscripcion-registral-sid", "G", "Solicitud de inscripción de la transferencia a SUNARP", {
		filas: [95, 99],
		t: "oficio.of-sunarp",
		req: ["fr-formulario", "pago-acta-fe"],
		rec: ["res-firmada", "exp-rm"],
		hito: "inscripcion"
	}),
	d("sid-ref-formulario", "inscripcion-registral-sid", "ref", "Formulario registral", {
		ref: "fr-formulario",
		aplica: "acepta"
	}),
	d("sid-ref-acta", "inscripcion-registral-sid", "ref", "Acta de fe de entrega", { ref: "pago-acta-fe" }),
	d("sid-ref-rm", "inscripcion-registral-sid", "ref", "Resolución ministerial de expropiación", {
		ref: "exp-rm",
		aplica: "expropiacion"
	}),
	d("ins-constancia", "inscripcion-registral", "R", "Constancia de inscripción de la transferencia a favor del MTC", {
		filas: [98, 102],
		emisor: "SUNARP",
		rec: ["sid-solicitud"]
	}),
	d("pos-acta", "entrega-posesion", "G", "Acta de entrega y recepción del predio del sujeto pasivo a la DDP", {
		filas: [103],
		t: "acta.ac-posesion"
	}),
	d("req-entrega", "requerimiento-entrega", "G", "Requerimiento único de entrega", {
		t: "carta.ca-entrega|oficio.of-entrega",
		propuesto: true,
		mod: 22,
		opcional: true,
		hito: "requerimiento_entrega"
	}),
	d("opat-acta", "entrega-recepcion-ddp-opat", "G", "Acta de entrega y recepción del predio de la DDP a la OPAT", {
		filas: [104],
		t: "acta.ac-opat",
		req: ["pos-acta"],
		rec: ["ins-constancia"]
	}),
	d("epd-indice", "expediente-digital", "G", "Expediente predial digital: índice foliado", {
		filas: [105],
		producto: "indice"
	}),
	d("mej-carta", "reconocimiento-mejoras", "G", "Carta de intención de reconocimiento de mejoras", {
		filas: [75],
		t: "carta.ca-mejoras",
		otros: ["acuerdo-mejoras"]
	}),
	d("mej-cargo", "reconocimiento-mejoras", "C", "Notificación y cargo de la carta de mejoras (STD, hoja de ruta)", {
		filas: [76, 77],
		resp: "mej-carta",
		otros: ["acuerdo-mejoras"]
	}),
	d("mej-aceptacion", "reconocimiento-mejoras", "R", "Documento que acredita la aceptación", {
		filas: [78],
		emisor: "Sujeto pasivo",
		otros: ["acuerdo-mejoras"]
	}),
	d("sbn-oficio", "transferencia-interestatal-sbn", "G", "Oficio de solicitud de transferencia interestatal a la SBN", {
		t: "oficio.of-sbn",
		propuesto: true,
		mod: 21,
		var: ["estatal"]
	})
];
function almacen(clave, inicial, fusionar) {
	let datos = null;
	const oyentes = /* @__PURE__ */ new Set();
	const cargar = (forzar = false) => {
		if (datos && !forzar) return datos;
		try {
			const g = localStorage.getItem(clave);
			datos = g ? JSON.parse(g) : inicial;
			if (g && fusionar) datos = fusionar(datos);
		} catch {
			datos = datos ?? inicial;
		}
		return datos;
	};
	const guardar = (nuevo) => {
		datos = nuevo;
		try {
			localStorage.setItem(clave, JSON.stringify(nuevo));
		} catch {}
		oyentes.forEach((f) => f());
	};
	const suscribir = (f) => {
		oyentes.add(f);
		const alAlmacen = (e) => {
			if (e.key === clave) {
				cargar(true);
				f();
			}
		};
		if (typeof window !== "undefined") window.addEventListener("storage", alAlmacen);
		return () => {
			oyentes.delete(f);
			if (typeof window !== "undefined") window.removeEventListener("storage", alAlmacen);
		};
	};
	return {
		cargar,
		guardar,
		suscribir,
		inicial
	};
}
var catalogoA = almacen("pdgp-expediente-catalogo", CATALOGO_INICIAL, (g) => {
	const ids = new Set(g.map((x) => x.id));
	return [...g, ...CATALOGO_INICIAL.filter((x) => !ids.has(x.id))];
});
var itemsA = almacen("pdgp-expediente-items", []);
var archivosExpediente = almacenArchivos("pdgp-expediente-archivos", "archivos");
var useCatalogo = () => useSyncExternalStore(catalogoA.suscribir, () => catalogoA.cargar(), () => catalogoA.inicial);
var useItems = () => useSyncExternalStore(itemsA.suscribir, () => itemsA.cargar(), () => itemsA.inicial);
var leerCatalogo = () => catalogoA.cargar();
var leerItems = () => itemsA.cargar();
function guardarCatalogo(nuevo, accion, objeto, motivo) {
	const antes = catalogoA.cargar();
	catalogoA.guardar(nuevo);
	registrarCambio("expediente-catalogo", {
		accion,
		objeto,
		motivo,
		antes,
		despues: nuevo
	}, {
		modulo: 8,
		entidad: "catalogo_expediente"
	});
}
/** ¿El ítem aplica a este predio? Lo que el sistema no sabe (edificaciones, cultivos) queda condicional. */
function aplicacion(c, p) {
	if (c.variantes && !c.variantes.includes(p.variante)) return {
		aplica: "no",
		razon: "No corresponde a la ruta de este predio."
	};
	const no = (razon) => ({
		aplica: "no",
		razon
	});
	switch (c.aplicaSi) {
		case void 0: return { aplica: "si" };
		case "inscrito": return p.inscrito ? { aplica: "si" } : no("No aplica: el predio no está inscrito.");
		case "no_inscrito": return p.inscrito ? no("No aplica: el predio está inscrito.") : { aplica: "si" };
		case "posesion": return !p.inscrito || p.ocupado ? { aplica: "si" } : no("No aplica: predio inscrito y sin poseedor.");
		case "acepta": return p.ruta === "EXPROPIACION" ? no("No aplica: el predio va por expropiación.") : { aplica: "si" };
		case "expropiacion": return p.ruta === "EXPROPIACION" ? { aplica: "si" } : no("Solo en la ruta de expropiación.");
		default: return {
			aplica: "condicional",
			razon: `Solo ${NOMBRE_CONDICION[c.aplicaSi]}.`
		};
	}
}
var delPaso = (c, paso) => c.paso === paso || Boolean(c.otrosPasos?.includes(paso));
/** Ítems vigentes (no anulados) del predio para un ítem del catálogo, del más nuevo al más antiguo. */
function itemsDe(items, predio, catalogoId) {
	return items.filter((i) => i.predio === predio && i.catalogoId === catalogoId && i.estado !== "anulado");
}
/** El ítem que representa al catálogo en el predio: el completo más reciente, o el último vigente. */
function itemActual(items, predio, catalogoId) {
	const vigentes = itemsDe(items, predio, catalogoId);
	return vigentes.find((i) => COMPLETO.includes(i.estado)) ?? vigentes[0];
}
/** Requisitos (bloquean el código) y recomendados (avisan) de un ítem del catálogo para el predio. */
function requisitosDe(c, catalogo, items, predio, perfil) {
	const uno = (id, bloquea) => {
		const r = catalogo.find((x) => x.id === id);
		if (!r || r.estado === "INACTIVO") return null;
		if (aplicacion(r, perfil).aplica === "no") return null;
		const item = itemActual(items, predio, id);
		return {
			id,
			nombre: r.nombre,
			paso: r.paso,
			cumple: Boolean(item && COMPLETO.includes(item.estado)),
			bloquea,
			item
		};
	};
	return [...(c.requisitos ?? []).map((id) => uno(id, true)), ...(c.recomendados ?? []).map((id) => uno(id, false))].filter((x) => Boolean(x));
}
/** Avance de un paso: obligatorios que aplican y cuántos están completos. */
function avancePaso(catalogo, items, predio, paso, perfil) {
	const obligatorios = catalogo.filter((c) => c.estado === "ACTIVO" && delPaso(c, paso) && c.obligatorio && aplicacion(c, perfil).aplica === "si");
	return {
		completos: obligatorios.filter((c) => {
			const i = itemActual(items, predio, c.id);
			return i && COMPLETO.includes(i.estado);
		}).length,
		obligatorios: obligatorios.length
	};
}
/** Siguiente orden de folio del predio. Anular no libera el folio. */
function siguienteOrden(items, predio) {
	return Math.max(0, ...items.filter((i) => i.predio === predio).map((i) => i.orden)) + 1;
}
var armarFolio = (expediente, orden) => `${expediente}/${String(orden).padStart(3, "0")}`;
/** ¿El documento recibido supera la antigüedad máxima? */
function vencido(fechaDocumento, meses, hoy = /* @__PURE__ */ new Date()) {
	const f = /* @__PURE__ */ new Date(`${fechaDocumento}T00:00:00`);
	if (Number.isNaN(f.getTime())) return false;
	const limite = new Date(hoy);
	limite.setMonth(limite.getMonth() - meses);
	return f < limite;
}
var normal = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
/** Cada fila de la lista con los ítems del catálogo que la cubren. */
function cobertura(catalogo, filas = CSV_DDP) {
	const porTexto = /* @__PURE__ */ new Map();
	for (const c of catalogo) for (const f of c.csv) {
		const k = `${numeroModulo(f.modulo)}|${normal(f.texto)}`;
		porTexto.set(k, [...porTexto.get(k) ?? [], c]);
	}
	return filas.map(([modulo, texto], fila) => ({
		fila,
		modulo,
		texto,
		tipo: !texto.trim() ? "vacia" : FILAS_GRUPO.has(texto.trim()) ? "grupo" : "documento",
		items: porTexto.get(`${numeroModulo(modulo)}|${normal(texto)}`) ?? []
	}));
}
/** Lee un CSV con separador ";" y comillas (el formato de la lista de la DDP). */
function parsearCsv(texto) {
	const s = texto.replace(/^\uFEFF/, "");
	const filas = [];
	let fila = [];
	let campo = "";
	let comillas = false;
	for (let i = 0; i < s.length; i++) {
		const c = s[i];
		if (comillas) if (c === "\"") if (s[i + 1] === "\"") {
			campo += "\"";
			i++;
		} else comillas = false;
		else campo += c;
		else if (c === "\"") comillas = true;
		else if (c === ";") {
			fila.push(campo);
			campo = "";
		} else if (c === "\n") {
			fila.push(campo.replace(/\r$/, ""));
			filas.push(fila);
			fila = [];
			campo = "";
		} else campo += c;
	}
	if (campo || fila.length) filas.push([...fila, campo]);
	return filas.slice(1).filter((f) => f[0]?.trim()).map((f) => [f[0].trim(), (f[1] ?? "").replace(/\r/g, "").trim()]);
}
/** Paso que se propone para una fila nueva: el de un ítem con el mismo módulo y nombre parecido. */
function proponerPaso(catalogo, modulo, texto) {
	const palabras = normal(texto).split(" ").filter((p) => p.length > 4);
	const m = numeroModulo(modulo);
	let mejor = null;
	for (const c of catalogo) {
		const n = normal(c.nombre);
		const puntos = palabras.filter((p) => n.includes(p)).length + (c.modulo === m ? 1 : 0);
		if (!mejor || puntos > mejor.puntos) mejor = {
			c,
			puntos
		};
	}
	return mejor && mejor.puntos > 1 ? mejor.c : void 0;
}
/**
* ¿El adjunto que pide un formulario ("Archivo CCP", "Comprobante") es este documento del catálogo
* ("Certificación de crédito presupuestario (CCP)", "Comprobante de pago y cheque")? Uno contiene al otro,
* sin contar palabras de relleno.
*/
function mismoDocumento(adjunto, documento) {
	const limpio = (x) => normal(x).replace(/[()]/g, " ").split(" ").filter((p) => p && ![
		"archivo",
		"documento",
		"pdf",
		"del",
		"de",
		"la",
		"el",
		"y"
	].includes(p));
	const a = limpio(adjunto);
	const d = new Set(limpio(documento));
	return a.length > 0 && a.every((p) => d.has(p));
}
function usuarioActual() {
	try {
		return localStorage.getItem("mtc-session") || "usuario sin sesión";
	} catch {
		return "usuario sin sesión";
	}
}
var idItem = () => `exp-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
var hoyIso = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function nombreDe(i) {
	return i.libre?.nombre ?? leerCatalogo().find((c) => c.id === i.catalogoId)?.nombre ?? "Documento";
}
/** Guarda la lista y deja versión en el histórico del predio y entrada en la bitácora. */
function guardarItems(nuevos, predio, accion, objeto, motivo) {
	const antes = itemsA.cargar(true).filter((i) => i.predio === predio);
	itemsA.guardar(nuevos);
	registrarCambio(`expediente-${predio}`, {
		accion,
		objeto,
		motivo,
		antes,
		despues: nuevos.filter((i) => i.predio === predio)
	}, {
		modulo: 24,
		entidad: "expediente"
	});
}
function publicarHito(c, predio, fecha, ruta) {
	if (c?.hito && fecha) registrarHito(predio, c.hito, fecha, ruta, c.nombre);
}
/**
* Expediente del folio. Sin código asignado el predio folia con el provisional "S/E-<código de predio>"
* (prototipo, pedido del usuario 2026-10-21): los documentos se generan y envían igual, y el folio
* definitivo llega cuando 1.2 asigna el expediente.
*/
function exigirExpediente(ctx) {
	return ctx.expediente || `S/E-${ctx.predio}`;
}
/** Ítem nuevo con folio. */
function nuevoItem(ctx, base, items) {
	const expediente = exigirExpediente(ctx);
	const orden = siguienteOrden(items, ctx.predio);
	const ahora = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: idItem(),
		predio: ctx.predio,
		projectId: ctx.projectId,
		folio: armarFolio(expediente, orden),
		orden,
		registradoPor: usuarioActual(),
		registradoEl: ahora,
		actualizadoEl: ahora,
		paso: ctx.paso,
		ruta: ctx.ruta,
		...base
	};
}
async function guardarArchivo(blob, nombre) {
	const id = `arc-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
	const huella = await sha256(blob);
	await archivosExpediente.guardar(id, blob);
	return {
		id,
		nombre,
		tipo: blob.type,
		bytes: blob.size,
		sha256: huella
	};
}
/** Catálogo que corresponde a un documento generado en un paso: por tipo y subtipo, o el único G del paso. */
function catalogoParaGenerado(catalogo, paso, tipoId, subtipoId) {
	const g = catalogo.filter((c) => c.estado === "ACTIVO" && c.clase === "G" && delPaso(c, paso) && c.tipos);
	return g.find((c) => c.tipos.some((t) => t.tipoId === tipoId && t.subtipoId === subtipoId)) ?? g.find((c) => c.tipos.some((t) => t.tipoId === tipoId));
}
/**
* Registra en el expediente un documento que el sistema acaba de generar (con número, vinculado, externo
* o borrador). Un borrador del mismo ítem pasa a numerado conservando su folio; si ya hay uno numerado o
* firmado, se crea otro (reiteración). Sin ítem de catálogo, entra como ítem libre del paso.
*/
async function registrarGenerado(ctx, g) {
	const items = itemsA.cargar(true);
	const cat = leerCatalogo().find((c) => c.id === g.catalogoId);
	const generado = g.blob ? await guardarArchivo(g.blob, g.nombreArchivo ?? "documento.doc") : void 0;
	const datos = {
		estado: g.documento ? "numerado" : "borrador",
		documentoId: g.documento?.id,
		numero: g.documento?.numero,
		fechaDocumento: g.documento ? g.documento.fecha.slice(0, 10) : void 0,
		vinculado: g.vinculado || void 0,
		generado
	};
	if (g.vinculado && g.documento) {
		const hermano = items.find((i) => i.documentoId === g.documento.id && i.estado !== "anulado");
		if (hermano) Object.assign(datos, {
			estado: hermano.estado,
			archivo: hermano.archivo,
			firmas: hermano.firmas,
			tipoFirma: hermano.tipoFirma,
			generado: hermano.generado
		});
	}
	const borrador = g.catalogoId ? itemsDe(items, ctx.predio, g.catalogoId).find((i) => i.estado === "borrador") : void 0;
	let item;
	let lista;
	if (borrador) {
		item = {
			...borrador,
			...datos,
			generado: datos.generado ?? borrador.generado,
			actualizadoEl: (/* @__PURE__ */ new Date()).toISOString()
		};
		lista = items.map((i) => i.id === borrador.id ? item : i);
	} else {
		item = nuevoItem(ctx, {
			...datos,
			estado: datos.estado,
			catalogoId: cat?.id,
			libre: cat ? void 0 : {
				nombre: g.nombreLibre,
				clase: "G",
				tipoId: g.tipoId,
				subtipoId: g.subtipoId
			}
		}, items);
		lista = [item, ...items];
	}
	const accion = g.vinculado ? "Vinculó documento" : g.documento ? "Generó documento" : "Generó borrador";
	guardarItems(lista, ctx.predio, accion, `${item.folio} · ${item.numero ?? nombreDe(item)}`);
	registrarEnBitacora({
		modulo: 24,
		entidad: "expediente",
		registro: item.folio,
		accion: "generar",
		detalle: `${accion}: ${nombreDe(item)}${item.numero ? ` · ${item.numero}` : ""} · predio ${ctx.predio}`
	});
	if (item.estado === "numerado" && cat) publicarHito(cat, ctx.predio, item.fechaDocumento ?? hoyIso(), ctx.ruta);
	return item;
}
/**
* Sube el documento firmado de un G (o el archivo de un producto). Solo PDF. Lee las firmas: sin firma
* digital exige justificación y queda como firma manuscrita escaneada. Un documento vinculado a varios
* predios se firma una vez para todos.
*/
async function subirFirmado(itemId, archivo, f = {}) {
	if (!esPdf(archivo.name, archivo.type)) throw new Error("Suba el documento firmado en PDF: un Word no lleva firma digital.");
	const firmas = leerFirmasPdf(await textoLatin1(archivo));
	if (!firmas.length && !f.justificacion?.trim()) throw new Error("El PDF no trae firma digital. Si se firmó a mano y se escaneó, indique por qué no se firmó digitalmente.");
	const items = itemsA.cargar(true);
	const item = items.find((i) => i.id === itemId);
	if (!item) throw new Error("El documento ya no está en el expediente.");
	const guardado = await guardarArchivo(archivo, archivo.name);
	const cambio = {
		estado: "firmado",
		archivo: guardado,
		firmas,
		tipoFirma: firmas.length ? "digital" : "manuscrita_escaneada",
		justificacion: firmas.length ? void 0 : f.justificacion?.trim(),
		enFirma: void 0,
		actualizadoEl: (/* @__PURE__ */ new Date()).toISOString()
	};
	const mismos = (i) => i.id === itemId || item.documentoId && i.documentoId === item.documentoId && i.estado !== "anulado";
	const lista = items.map((i) => mismos(i) ? {
		...i,
		...cambio
	} : i);
	const objeto = `${item.folio} · ${item.numero ?? nombreDe(item)} · ${firmas.length ? `${firmas.length} firma(s) digital(es)` : "firma escaneada"}`;
	guardarItems(lista, item.predio, "Subió documento firmado", objeto, cambio.justificacion);
	registrarEnBitacora({
		modulo: 24,
		entidad: "expediente",
		registro: item.folio,
		accion: "transicion",
		detalle: `Firmado: ${objeto} · SHA-256 ${guardado.sha256.slice(0, 16)}`
	});
	const cat = leerCatalogo().find((c) => c.id === item.catalogoId);
	if (cat?.clase === "G") publicarHito(cat, item.predio, item.fechaDocumento ?? hoyIso(), item.ruta);
	return lista.find((i) => i.id === itemId);
}
/** Registra un documento recibido de un tercero (R), un producto de otro módulo o un ítem libre recibido. */
async function registrarRecibido(ctx, r) {
	const cat = leerCatalogo().find((c) => c.id === r.catalogoId);
	if (!r.fechaDocumento) throw new Error("Indique la fecha del documento.");
	if (cat?.vigenciaMeses && vencido(r.fechaDocumento, cat.vigenciaMeses)) throw new Error(`El documento tiene más de ${cat.vigenciaMeses} meses: pida una copia vigente.`);
	const items = itemsA.cargar(true);
	const archivo = await guardarArchivo(r.archivo, r.archivo.name);
	const firmas = esPdf(r.archivo.name, r.archivo.type) ? leerFirmasPdf(await textoLatin1(r.archivo)) : [];
	const item = nuevoItem(ctx, {
		estado: "recibido",
		catalogoId: cat?.id,
		libre: cat ? void 0 : r.libre,
		numero: r.numero.trim() || void 0,
		emisor: r.emisor.trim() || cat?.emisor,
		fechaDocumento: r.fechaDocumento,
		archivo,
		firmas,
		tipoFirma: firmas.length ? "digital" : r.justificacion ? "manuscrita_escaneada" : "sin_firma",
		justificacion: r.justificacion?.trim() || void 0
	}, items);
	guardarItems([item, ...items], ctx.predio, "Registró documento recibido", `${item.folio} · ${nombreDe(item)}`);
	registrarEnBitacora({
		modulo: 24,
		entidad: "expediente",
		registro: item.folio,
		accion: "crear",
		detalle: `Recibido: ${nombreDe(item)}${item.numero ? ` · ${item.numero}` : ""} · ${item.emisor ?? ""} · predio ${ctx.predio}`
	});
	publicarHito(cat, ctx.predio, r.fechaDocumento, ctx.ruta);
	return item;
}
/** Cargo o constancia de un documento (C): exige el ítem al que respalda. */
async function adjuntarCargo(ctx, c) {
	if (!itemsA.cargar(true).some((i) => i.id === c.respaldaA && i.estado !== "anulado")) throw new Error("El cargo debe respaldar un documento registrado en el expediente.");
	const item = await registrarRecibido(ctx, {
		catalogoId: c.catalogoId,
		numero: c.numero,
		emisor: "",
		fechaDocumento: c.fechaDocumento,
		archivo: c.archivo
	});
	const lista = itemsA.cargar(true).map((i) => i.id === item.id ? {
		...i,
		respaldaA: c.respaldaA
	} : i);
	itemsA.guardar(lista);
	return lista.find((i) => i.id === item.id);
}
/** Actividad hecha (A): fecha y resultado; publica su hito. */
function marcarHecho(ctx, a) {
	if (!a.fecha) throw new Error("Indique la fecha.");
	const items = itemsA.cargar(true);
	const cat = leerCatalogo().find((c) => c.id === a.catalogoId);
	if (cat?.opciones && !a.resultado) throw new Error("Elija el resultado.");
	const item = nuevoItem(ctx, {
		estado: "hecho",
		catalogoId: a.catalogoId,
		hechoEl: a.fecha,
		fechaDocumento: a.fecha,
		resultado: a.resultado.trim() || void 0
	}, items);
	guardarItems([item, ...items], ctx.predio, "Registró actividad", `${item.folio} · ${nombreDe(item)}`);
	publicarHito(cat, ctx.predio, a.fecha, ctx.ruta);
	return item;
}
/** Anula un ítem con motivo: queda tachado y conserva su folio. */
function anularItem(itemId, motivo) {
	if (!motivo.trim()) throw new Error("Indique el motivo.");
	const items = itemsA.cargar(true);
	const item = items.find((i) => i.id === itemId);
	if (!item || item.estado === "anulado") return;
	guardarItems(items.map((i) => i.id === itemId ? {
		...i,
		estado: "anulado",
		anulacion: {
			motivo,
			usuario: usuarioActual(),
			fecha: (/* @__PURE__ */ new Date()).toISOString()
		}
	} : i), item.predio, "Anuló documento", `${item.folio} · ${nombreDe(item)}`, motivo);
	registrarEnBitacora({
		modulo: 24,
		entidad: "expediente",
		registro: item.folio,
		accion: "anular",
		detalle: `Motivo: ${motivo}`
	});
}
/** Envía a firma: el ítem numerado queda esperando el PDF firmado de `firmante`. */
function enviarAFirma(itemId, firmante) {
	if (!firmante.trim()) throw new Error("Indique quién firma.");
	const items = itemsA.cargar(true);
	const item = items.find((i) => i.id === itemId);
	if (!item || item.estado !== "numerado") throw new Error("Solo se envía a firma un documento numerado.");
	guardarItems(items.map((i) => i.id === itemId ? {
		...i,
		estado: "en_firma",
		enFirma: {
			firmante: firmante.trim(),
			enviadoEl: (/* @__PURE__ */ new Date()).toISOString()
		}
	} : i), item.predio, "Envió a firma", `${item.folio} · ${firmante}`);
}
/**
* Vincula el predio a un documento ya emitido (oficio múltiple, documento de otro paso). Suma el predio al
* registro de M8 y crea el ítem del expediente que comparte número, archivo y firma.
*/
async function vincularDocumento(ctx, documentoId, catalogoId, nombreLibre) {
	const doc = vincularPredio(documentoId, ctx.predio);
	return registrarGenerado(ctx, {
		catalogoId,
		nombreLibre,
		tipoId: doc.tipoId,
		subtipoId: doc.subtipoId,
		documento: doc,
		vinculado: true
	});
}
/**
* Un archivo que sube un formulario del predio. Con `catalogoId` de un G numerado y un PDF, es su versión
* firmada (sin firma digital queda como firma escaneada, con la justificación de que se subió desde el
* formulario). Si no, entra como documento registrado del ítem o, sin ítem, como documento libre del paso.
*/
async function registrarSubida(ctx, archivo, o) {
	if (o.firmado && !o.catalogoId && esPdf(archivo.name, archivo.type)) {
		const pendiente = itemsA.cargar(true).find((i) => i.predio === ctx.predio && i.paso === ctx.paso && (i.estado === "numerado" || i.estado === "en_firma"));
		if (pendiente) return subirFirmado(pendiente.id, archivo, { justificacion: "Subido desde el formulario del paso sin firma digital" });
	}
	const cat = o.catalogoId ? leerCatalogo().find((c) => c.id === o.catalogoId) : void 0;
	if (cat?.clase === "G" && esPdf(archivo.name, archivo.type)) {
		const pendiente = itemsDe(itemsA.cargar(true), ctx.predio, cat.id).find((i) => i.estado === "numerado" || i.estado === "en_firma");
		if (pendiente) return subirFirmado(pendiente.id, archivo, { justificacion: "Subido desde el formulario del paso sin firma digital" });
	}
	return registrarRecibido(ctx, {
		catalogoId: cat && cat.clase !== "ref" && cat.clase !== "A" ? cat.id : void 0,
		libre: cat ? void 0 : {
			nombre: o.nombre,
			clase: "R",
			emisor: o.emisor
		},
		numero: o.numero ?? "",
		emisor: o.emisor ?? cat?.emisor ?? "",
		fechaDocumento: o.fecha || hoyIso(),
		archivo
	});
}
var listaA = almacen("pdgp-expediente-lista-ddp", CSV_DDP);
var useListaDdp = () => useSyncExternalStore(listaA.suscribir, () => listaA.cargar(), () => listaA.inicial);
/**
* Importa una lista nueva de la DDP: las filas que el catálogo no cubre entran como ítems nuevos en el
* paso y la clase que eligió el Administrador. No guarda si queda una fila con documento sin paso.
*/
function importarLista(filas, asignaciones) {
	const catalogo = catalogoA.cargar(true);
	const cob = cobertura(catalogo, filas);
	const sinPaso = cob.filter((f) => f.tipo === "documento" && !f.items.length && !asignaciones[f.fila]?.paso);
	if (sinPaso.length) throw new Error(`Faltan ${sinPaso.length} fila(s) por asignar a un paso.`);
	const nuevos = cob.filter((f) => f.tipo === "documento" && !f.items.length).map((f, i) => {
		const a = asignaciones[f.fila];
		return {
			id: `cat-${Date.now().toString(36)}-${i}`,
			paso: a.paso,
			modulo: numeroModulo(f.modulo),
			nombre: a.nombre.trim() || f.texto,
			clase: a.clase,
			obligatorio: a.clase !== "ref",
			csv: [{
				modulo: f.modulo,
				texto: f.texto
			}],
			orden: Math.max(0, ...catalogo.map((c) => c.orden)) + i + 1,
			estado: "ACTIVO"
		};
	});
	guardarCatalogo([...catalogo, ...nuevos], "Importó lista de la DDP", `${filas.length} filas · ${nuevos.length} ítems nuevos`);
	listaA.guardar(filas);
	return nuevos.length;
}
/** Documentos registrados fuera del catálogo, agrupados por nombre y paso. */
function libresAgrupados(items) {
	const grupos = /* @__PURE__ */ new Map();
	for (const i of items) if (!i.catalogoId && i.libre && i.estado !== "anulado") {
		const clave = `${i.paso}|${normal(i.libre.nombre)}`;
		const g = grupos.get(clave) ?? {
			clave,
			nombre: i.libre.nombre,
			paso: i.paso,
			clase: i.libre.clase,
			items: []
		};
		g.items.push(i);
		grupos.set(clave, g);
	}
	return [...grupos.values()].sort((a, b) => b.items.length - a.items.length);
}
/** Añade un grupo de documentos libres al catálogo y reclasifica los ítems que ya existen. */
function incorporarAlCatalogo(g, obligatorio) {
	const catalogo = catalogoA.cargar(true);
	const nuevo = {
		id: `cat-${Date.now().toString(36)}`,
		paso: g.paso,
		modulo: 0,
		nombre: g.nombre,
		clase: g.clase,
		obligatorio,
		csv: [],
		propuesto: true,
		tipos: g.items[0]?.libre?.tipoId ? [{
			tipoId: g.items[0].libre.tipoId,
			subtipoId: g.items[0].libre.subtipoId
		}] : void 0,
		emisor: g.items[0]?.libre?.emisor,
		orden: Math.max(0, ...catalogo.map((c) => c.orden)) + 1,
		estado: "ACTIVO"
	};
	guardarCatalogo([...catalogo, nuevo], "Añadió al catálogo", `${g.nombre} · ${g.paso}`);
	const ids = new Set(g.items.map((i) => i.id));
	itemsA.guardar(itemsA.cargar(true).map((i) => ids.has(i.id) ? {
		...i,
		catalogoId: nuevo.id,
		libre: void 0
	} : i));
	return nuevo;
}
/** Estado en el expediente de un documento del registro de M8 (firmado, en firma, sin firma). */
function firmaDeDocumento(items, documentoId) {
	const del = items.filter((i) => i.documentoId === documentoId && i.estado !== "anulado");
	if (!del.length) return {
		texto: "Fuera del expediente",
		tono: "neutral"
	};
	if (del.some((i) => i.estado === "firmado")) return {
		texto: del.some((i) => i.tipoFirma === "digital") ? "Firmado digitalmente" : "Firma escaneada",
		tono: "success"
	};
	if (del.some((i) => i.estado === "en_firma")) return {
		texto: "En firma",
		tono: "primary"
	};
	return {
		texto: "Sin firma",
		tono: "warning"
	};
}
//#endregion
//#region src/lib/validadores.ts
var dni = (v) => /^\d{8}$/.test(v.trim()) ? null : "El DNI tiene 8 dígitos.";
/** RUC de 11 dígitos con dígito verificador (módulo 11, pesos 5 4 3 2 7 6 5 4 3 2). */
var ruc = (v) => {
	const s = v.trim();
	if (!/^(10|15|16|17|20)\d{9}$/.test(s)) return "El RUC tiene 11 dígitos y empieza en 10, 15, 16, 17 o 20.";
	return (11 - [
		5,
		4,
		3,
		2,
		7,
		6,
		5,
		4,
		3,
		2
	].reduce((acc, p, i) => acc + p * Number(s[i]), 0) % 11) % 10 === Number(s[10]) ? null : "El dígito verificador del RUC no coincide.";
};
var carnetExtranjeria = (v) => /^[A-Za-z0-9]{9,12}$/.test(v.trim()) ? null : "El carné de extranjería tiene de 9 a 12 caracteres.";
function documentoIdentidad(tipo) {
	return tipo === "DNI" ? dni : tipo === "RUC" ? ruc : carnetExtranjeria;
}
var celular = (v) => /^9\d{8}$/.test(v.replace(/\s/g, "")) ? null : "El celular tiene 9 dígitos y empieza en 9.";
var correo = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Ingrese un correo válido.";
var monto = (v) => {
	const n = Number(v.replace(/,/g, ""));
	if (!Number.isFinite(n)) return "Ingrese un monto numérico.";
	if (n < 0) return "El monto no puede ser negativo.";
	if (!/^\d+(\.\d{1,2})?$/.test(v.replace(/,/g, "").trim())) return "El monto admite hasta 2 decimales.";
	return null;
};
var montoPositivo = (v) => monto(v) ?? (Number(v.replace(/,/g, "")) > 0 ? null : "El monto debe ser mayor a cero.");
/** Aplica varios validadores y devuelve el primer error. */
function validar(valor, ...reglas) {
	for (const r of reglas) {
		const e = r(valor);
		if (e) return e;
	}
	return null;
}
//#endregion
//#region src/lib/sujetoPasivo.ts
var TIPO_PERSONA = {
	NATURAL: "Persona natural",
	JURIDICA: "Persona jurídica",
	COMUNIDAD_CAMPESINA: "Comunidad campesina",
	COMUNIDAD_NATIVA: "Comunidad nativa",
	SUCESION: "Sucesión",
	JUNTA_PROPIETARIOS: "Junta de propietarios"
};
var TIPO_DOCUMENTO = {
	DNI: "DNI",
	CE: "Carné de extranjería",
	RUC: "RUC",
	PASAPORTE: "Pasaporte"
};
/** Condiciones del TUO: base legal y lo que exige cada una. */
var CONDICION = {
	TITULAR_REGISTRAL: {
		nombre: "Titular registral",
		base: "Art. 6.1",
		exige: "Partida registral del predio."
	},
	PROPIETARIO_FECHA_CIERTA: {
		nombre: "Propietario con documento de fecha cierta",
		base: "Art. 4.15, 6.2 y 7.1",
		exige: "Un documento de fecha cierta. Abre la publicación y oposiciones (diez días hábiles)."
	},
	POSEEDOR_10: {
		nombre: "Poseedor de más de diez años",
		base: "Art. 6.3 y 7.2",
		exige: "Fecha de inicio de la posesión y título inscrito, resolución, o dos pruebas con una obligatoria."
	},
	SUCESION: {
		nombre: "Sucesión",
		base: "Art. 6.1",
		exige: "Inscripción en el Registro de Sucesiones o declaratoria de herederos."
	},
	JUNTA: {
		nombre: "Junta de propietarios",
		base: "Art. 8.1 y Ley 27157",
		exige: "Partida de la junta y vigencia de poder del presidente."
	},
	COMUNIDAD: {
		nombre: "Comunidad campesina o nativa",
		base: "Art. 41.8 y leyes de la materia (por verificar)",
		exige: "Junta directiva vigente, acta de asamblea y padrón de comuneros."
	},
	LITIGIO: {
		nombre: "Parte en litigio",
		base: "Art. 6.4 y 7.3",
		exige: "Expediente judicial o arbitral. El pago se consigna."
	},
	FIDUCIARIO: {
		nombre: "Fiduciario",
		base: "Art. 6.6",
		exige: "Contrato de fideicomiso y titular registral."
	}
};
/** Documentos de sustento por grupo (§3.4 del plan). */
var DOCUMENTOS_SUSTENTO = {
	Registrales: [
		"Partida registral (copia literal)",
		"Certificado registral inmobiliario",
		"Título archivado"
	],
	"Fecha cierta (art. 4.15)": [
		"Resolución judicial o administrativa",
		"Certificado de autoridad competente",
		"Documento privado con firmas legalizadas (compraventa, donación, permuta)",
		"Documento privado reconocido judicialmente",
		"Documento privado con cotejo pericial de firma",
		"Escritura imperfecta ante juez de paz",
		"Minuta con constancia de ingreso notarial",
		"Escritura pública"
	],
	"Posesión (art. 6.3)": [
		"Título de posesión inscrito",
		"Resolución judicial o administrativa de posesión",
		"Certificado o constancia de posesión",
		"Declaración jurada de posesión",
		"Recibos de servicios o autoavalúo a nombre del poseedor",
		"Constancia de comunero hábil",
		"Constancia de la junta directiva comunal"
	],
	Representación: [
		"Vigencia de poder",
		"Acta de asamblea",
		"Declaratoria de herederos",
		"Poder por escritura pública",
		"Contrato de fideicomiso"
	]
};
var idSP = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
var archivoDe = (f) => ({
	nombre: f.name,
	fecha: (/* @__PURE__ */ new Date()).toLocaleDateString("es-PE")
});
function titularVacio(parcial = {}) {
	return {
		id: idSP(),
		tipoPersona: "NATURAL",
		tipoDocumento: "DNI",
		numero: "",
		nombres: "",
		caducidad: "",
		dniAnverso: null,
		dniReverso: null,
		fichaReniec: null,
		estadoCivil: "SOLTERO",
		cuota: "",
		correo: "",
		celular: "",
		whatsapp: false,
		telefono: "",
		domicilio: "",
		departamento: "",
		provincia: "",
		distrito: "",
		notificarEnDomicilioReal: true,
		domicilioNotificacion: "",
		aceptaElectronica: false,
		condicion: "TITULAR_REGISTRAL",
		partida: "",
		fechaInicioPosesion: "",
		documentos: [],
		tieneRepresentante: false,
		representanteNombres: "",
		representanteDni: "",
		representantePoder: null,
		juntaPresidente: "",
		juntaPresidenteDni: "",
		actaAsamblea: null,
		vigenciaPoder: null,
		padronComuneros: null,
		comuneros: [],
		...parcial
	};
}
/**
* Punto de partida cuando el predio aún no tiene registro: los sujetos del padrón, sin documentos. Si es
* el expediente individual de un comunero, el comunero es el titular (poseedor).
*/
function registroInicialSujetoPasivo(p, derivado) {
	const inscrito = Boolean(p?.partida);
	const condicion = derivado ? "POSEEDOR_10" : inscrito ? "TITULAR_REGISTRAL" : "PROPIETARIO_FECHA_CIERTA";
	return {
		predioInscrito: inscrito,
		estado: "BORRADOR",
		titulares: derivado ? [titularVacio({
			nombres: derivado.comunero,
			numero: derivado.dni,
			condicion
		})] : (p?.sujetos ?? []).map((nombres) => titularVacio({
			nombres,
			condicion,
			partida: p?.partida ?? ""
		})),
		ocupantes: [],
		litigio: {
			tipo: "",
			expediente: "",
			organo: "",
			partes: ""
		},
		partidaMatriz: p?.partida ?? "",
		partidaIndependizada: "",
		areaDocumento: derivado?.area || p?.area || "",
		unidadDocumento: "m2"
	};
}
var esComunidad = (t) => t.tipoPersona === "COMUNIDAD_CAMPESINA" || t.tipoPersona === "COMUNIDAD_NATIVA";
/** Representante obligatorio: quien no firma por sí mismo. */
var exigeRepresentante = (t) => t.tipoPersona !== "NATURAL";
/** DNI completo = anverso, reverso y ficha RENIEC. Solo para personas naturales con DNI. */
function estadoDni(t) {
	if (t.tipoPersona !== "NATURAL" || t.tipoDocumento !== "DNI") return "no_aplica";
	const n = [
		t.dniAnverso,
		t.dniReverso,
		t.fichaReniec
	].filter(Boolean).length;
	return n === 3 ? "completo" : n === 0 ? "sin" : "parcial";
}
var NOMBRE_ESTADO_DNI = {
	completo: "DNI completo",
	parcial: "DNI parcial",
	sin: "Sin documento",
	no_aplica: "No aplica"
};
var aniosDesde = (iso, hoy = /* @__PURE__ */ new Date()) => {
	const d = /* @__PURE__ */ new Date(`${iso}T00:00:00`);
	return (hoy.getTime() - d.getTime()) / (365.25 * 864e5);
};
/** Lo que le falta a un titular para poder registrarse. Vacío = listo. */
function faltantesTitular(t, hoy = /* @__PURE__ */ new Date()) {
	const f = [];
	if (!t.nombres.trim()) f.push(t.tipoPersona === "NATURAL" ? "nombres y apellidos" : "denominación o razón social");
	const reglaDoc = t.tipoDocumento === "DNI" ? dni : t.tipoDocumento === "RUC" ? ruc : t.tipoDocumento === "CE" ? carnetExtranjeria : null;
	if (!t.numero.trim()) f.push(`número de ${TIPO_DOCUMENTO[t.tipoDocumento]}`);
	else if (reglaDoc && reglaDoc(t.numero)) f.push(reglaDoc(t.numero).replace(/\.$/, "").toLowerCase());
	const e = estadoDni(t);
	if (e === "sin" || e === "parcial") {
		if (!t.dniAnverso) f.push("anverso del DNI");
		if (!t.dniReverso) f.push("reverso del DNI");
		if (!t.fichaReniec) f.push("ficha RENIEC");
	}
	if (t.correo && correo(t.correo)) f.push("correo válido");
	if (t.celular && celular(t.celular)) f.push("celular válido (9 dígitos)");
	if (t.whatsapp && !t.celular) f.push("celular para WhatsApp");
	if (t.aceptaElectronica && !t.correo) f.push("correo para la notificación electrónica");
	if (!t.domicilio.trim()) f.push("domicilio real");
	if (!t.notificarEnDomicilioReal && !t.domicilioNotificacion.trim()) f.push("domicilio para notificaciones");
	if (t.condicion === "TITULAR_REGISTRAL" && !t.partida.trim()) f.push("partida registral");
	if (t.condicion === "PROPIETARIO_FECHA_CIERTA" && !t.documentos.some((d) => DOCUMENTOS_SUSTENTO["Fecha cierta (art. 4.15)"].includes(d.tipo))) f.push("documento de fecha cierta");
	if (t.condicion === "POSEEDOR_10") {
		if (!t.fechaInicioPosesion) f.push("fecha de inicio de la posesión");
		else if (aniosDesde(t.fechaInicioPosesion, hoy) < 10) f.push("posesión de más de diez años");
		const pruebas = t.documentos.filter((d) => DOCUMENTOS_SUSTENTO["Posesión (art. 6.3)"].includes(d.tipo));
		if (!pruebas.some((d) => d.tipo === "Título de posesión inscrito" || d.tipo === "Resolución judicial o administrativa de posesión") && (pruebas.length < 2 || !pruebas.some((d) => d.obligatoria))) f.push("dos pruebas de posesión con una marcada como obligatoria");
	}
	if (t.condicion === "SUCESION" && !t.documentos.some((d) => d.tipo === "Declaratoria de herederos" || d.tipo.startsWith("Partida"))) f.push("declaratoria de herederos o partida de sucesión");
	if (exigeRepresentante(t) && !esComunidad(t) && (!t.representanteNombres.trim() || !t.representanteDni.trim())) f.push("representante con DNI");
	if (t.tieneRepresentante && t.tipoPersona === "NATURAL" && (!t.representanteNombres.trim() || dni(t.representanteDni))) f.push("representante con DNI válido");
	if (esComunidad(t)) {
		if (!t.juntaPresidente.trim() || dni(t.juntaPresidenteDni)) f.push("presidente de la junta directiva con DNI");
		if (!t.actaAsamblea) f.push("acta de asamblea general");
		if (!t.vigenciaPoder) f.push("vigencia de poder de la junta");
		if (!t.padronComuneros) f.push("padrón de comuneros");
	}
	return f;
}
/** Suma de cuotas: con un solo titular sin cuota se toma 100 %. */
function sumaCuotas(titulares) {
	if (titulares.length === 1 && !titulares[0].cuota) return 100;
	return titulares.reduce((s, t) => s + (Number(t.cuota.replace(",", ".")) || 0), 0);
}
/** Lo que falta para registrar el sujeto pasivo completo. */
function faltantesRegistro(r) {
	const f = [];
	if (r.titulares.length === 0) f.push("Registre al menos un titular.");
	r.titulares.forEach((t) => {
		const ft = faltantesTitular(t);
		if (ft.length) f.push(`${t.nombres || "Titular sin nombre"}: falta ${ft.join(", ")}.`);
	});
	const suma = sumaCuotas(r.titulares);
	if (r.titulares.length > 0 && Math.abs(suma - 100) > .01) f.push(`Las cuotas suman ${suma} %; deben sumar 100 %.`);
	if (r.titulares.some((t) => t.condicion === "LITIGIO") && (!r.litigio.tipo || !r.litigio.expediente.trim())) f.push("Hay una parte en litigio: registre el tipo y el número de expediente.");
	return f;
}
/** Código del expediente individual de un comunero: el del predio comunal con sufijo -C01, -C02… */
function codigoComunero(codigoComunal, usados) {
	let n = 1;
	while (usados.includes(`${codigoComunal}-C${String(n).padStart(2, "0")}`)) n++;
	return `${codigoComunal}-C${String(n).padStart(2, "0")}`;
}
/** Clave del registro del sujeto pasivo de un predio (localStorage). */
var claveSujetoPasivo = (codigo) => `pdgp-sujeto-pasivo-${codigo}`;
/** Lectura directa para otras pantallas (comunicación, carta, formulario registral). Solo en el navegador. */
function leerSujetoPasivo(codigo) {
	try {
		return JSON.parse(localStorage.getItem(claveSujetoPasivo(codigo)) ?? "null");
	} catch {
		return null;
	}
}
//#endregion
export { registrarRecibido as $, adjuntarCargo as A, useTiposDocumento as At, guardarCatalogo as B, descendientes as Bt, montoPositivo as C, proximoNumero as Ct, NOMBRE_CLASE as D, useContadores as Dt, COMPLETO as E, reservarNumero as Et, catalogoParaGenerado as F, useUsuarios as Ft, leerCatalogo as G, siguienteOrden$1 as Gt, incorporarAlCatalogo as H, hijosDe as Ht, cobertura as I, NOMBRE_TIPO_AREA as It, marcarHecho as J, validarArea as Jt, leerItems as K, textoRuta as Kt, delPaso as L, areasACargoDe as Lt, aplicacion as M, validarRegla as Mt, archivosExpediente as N, USUARIOS_INICIALES as Nt, NOMBRE_CONDICION as O, useDocumentos as Ot, avancePaso as P, guardarUsuarios as Pt, registrarGenerado as Q, enviarAFirma as R, bloqueoInactivar as Rt, documentoIdentidad as S, nombrePieza as St, validar as T, reglaVigente as Tt, itemActual as U, idArea as Ut, importarLista as V, guardarAreas as Vt, itemsDe as W, rutaArea as Wt, parsearCsv as X, mismoDocumento as Y, proponerPaso as Z, sumaCuotas as _, guardarReglas as _t, TIPO_PERSONA as a, useListaDdp as at, correo as b, leerReglas as bt, codigoComunero as c, NOMBRE_DIRIGIDO as ct, exigeRepresentante as d, avisosRegla as dt, registrarSubida as et, faltantesRegistro as f, claveLegible as ft, registroInicialSujetoPasivo as g, formatearNumero as gt, leerSujetoPasivo as h, faltantes as ht, TIPO_DOCUMENTO as i, useItems as it, anularItem as j, useUsuarioSesion as jt, NOMBRE_ESTADO as k, useReglas as kt, esComunidad as l, ajustarContador as lt, idSP as m, documentosDe as mt, DOCUMENTOS_SUSTENTO as n, subirFirmado as nt, archivoDe as o, vincularDocumento as ot, faltantesTitular as p, contadoresVivos as pt, libresAgrupados as q, useAreas as qt, NOMBRE_ESTADO_DNI as r, useCatalogo as rt, claveSujetoPasivo as s, NOMBRE_DIMENSION as st, CONDICION as t, requisitosDe as tt, estadoDni as u, anularDocumento as ut, titularVacio as v, guardarTipos as vt, ruc as w, registrarExterno as wt, dni as x, leerTipos as xt, celular as y, idDocumento as yt, firmaDeDocumento as z, codigoDocumental as zt };
