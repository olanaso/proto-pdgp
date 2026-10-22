import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { f as vencimiento, g as fechaIso, h as fechaHora, m as fecha, n as getProyecto, p as desdeIso, t as almacenArchivos, u as plazo, v as numero } from "./archivosIdb-BbjJAFd8.js";
import { B as routeByKey, M as rotulosDePaso, O as buildPredioSummary, a as prediosDelProyecto, d as predioRows, i as predioDelProyecto, p as NOMBRE_ORIGEN, s as getPredioByCodigo, u as normalizarExpediente, z as menuDelPredio } from "./prediosProyecto-D1ASzaVD.js";
import { n as buttonVariants, r as cn, t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { _ as registrarEnBitacora, d as moduloPorNumero, f as moduloPorRuta, i as registrarVersion, l as MODULOS, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { $ as registrarRecibido, A as adjuntarCargo, At as useTiposDocumento, Ct as proximoNumero, D as NOMBRE_CLASE, E as COMPLETO, Et as reservarNumero, F as catalogoParaGenerado, Ft as useUsuarios, J as marcarHecho, L as delPaso, M as aplicacion, N as archivosExpediente, Ot as useDocumentos, Q as registrarGenerado, R as enviarAFirma, Tt as reglaVigente, U as itemActual, W as itemsDe, Wt as rutaArea, Y as mismoDocumento, bt as leerReglas, et as registrarSubida, h as leerSujetoPasivo, ht as faltantes, it as useItems, j as anularItem, jt as useUsuarioSesion, k as NOMBRE_ESTADO, kt as useReglas, mt as documentosDe, nt as subirFirmado, ot as vincularDocumento, qt as useAreas, rt as useCatalogo, tt as requisitosDe, ut as anularDocumento, wt as registrarExterno } from "./sujetoPasivo-Cz4oBCnt.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import * as React from "react";
import { useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChartGantt, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleHelp, Download, FilePlus2, FileSignature, Hash, ListChecks, MapPinned, Plus, Printer, Send, Upload, X, XCircle } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import JSZip from "jszip";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import writeXlsxFile from "write-excel-file/browser";
//#region src/lib/ayudaPanel.ts
var estado = {
	abierto: false,
	tutorial: false
};
var oyentes$6 = /* @__PURE__ */ new Set();
function poner(e) {
	estado = e;
	oyentes$6.forEach((f) => f());
}
var abrirAyuda = (pestana) => poner({
	abierto: true,
	pestana,
	tutorial: false
});
var cerrarAyuda = () => poner({
	...estado,
	abierto: false
});
var alternarAyuda = () => estado.abierto ? cerrarAyuda() : abrirAyuda();
var iniciarTutorial = () => poner({
	abierto: false,
	tutorial: true
});
var terminarTutorial = () => poner({
	...estado,
	tutorial: false
});
function useEstadoAyuda() {
	return useSyncExternalStore((f) => {
		oyentes$6.add(f);
		return () => {
			oyentes$6.delete(f);
		};
	}, () => estado, () => estado);
}
//#endregion
//#region src/components/kit/BotonAyuda.tsx
/** Botón de ayuda de la pantalla: abre el panel con el manual, el video y el tutorial de esta vista. */
function BotonAyuda() {
	return /* @__PURE__ */ jsxs(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick: () => abrirAyuda(),
		title: "Ayuda de esta pantalla (F1)",
		"data-print-hidden": true,
		children: [/* @__PURE__ */ jsx(CircleHelp, {}), " Ayuda"]
	});
}
//#endregion
//#region src/components/kit/BotonIcono.tsx
/** Botón de 32 px solo con ícono. El tooltip y el aria-label llevan el verbo de la acción; nunca va sin ellos. */
function BotonIcono({ nombre, icono: Icono, onClick, destructiva, deshabilitado, tipo = "button" }) {
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: tipo,
			onClick,
			disabled: deshabilitado,
			"aria-label": nombre,
			className: `flex size-8 items-center justify-center rounded-md border border-border disabled:cursor-not-allowed disabled:opacity-50 ${destructiva ? "text-destructive hover:bg-destructive-soft" : "text-primary-dark hover:bg-primary-soft"}`,
			children: /* @__PURE__ */ jsx(Icono, {
				size: 16,
				"aria-hidden": true
			})
		})
	}), /* @__PURE__ */ jsx(TooltipContent, { children: nombre })] });
}
//#endregion
//#region src/components/shell/rutas.ts
var CLAVE_MODULO = "pdgp-modulo";
var oyentes$5 = /* @__PURE__ */ new Set();
/** Guarda el módulo elegido (portal, buscador o menú) para esta pestaña. */
function recordarModulo(numero) {
	try {
		if (sessionStorage.getItem(CLAVE_MODULO) === String(numero)) return;
		sessionStorage.setItem(CLAVE_MODULO, String(numero));
	} catch {
		return;
	}
	oyentes$5.forEach((f) => f());
}
function leerModuloRecordado() {
	try {
		return Number(sessionStorage.getItem(CLAVE_MODULO)) || void 0;
	} catch {
		return;
	}
}
/** Último módulo elegido. El servidor no lo conoce: allí manda la ruta y el navegador corrige al hidratar. */
function useModuloRecordado() {
	return useSyncExternalStore((f) => {
		oyentes$5.add(f);
		return () => {
			oyentes$5.delete(f);
		};
	}, leerModuloRecordado, () => void 0);
}
var reclama = (m, pathname) => m.to === pathname || m.secciones.some((s) => s.pantallas.some((p) => rutaActiva(p.to, pathname)));
/**
* Módulo activo. Si el elegido también reclama la ruta, manda ese: varios módulos entran por la lista
* de proyectos y cada uno debe mostrar su menú. Si no, el de la ruta; si la ruta no es de ninguno,
* el último elegido; si no, el primero. Sin efectos: se puede llamar al renderizar.
*/
function moduloActual(pathname, recordado) {
	const elegido = recordado ? moduloPorNumero(recordado) : void 0;
	if (elegido && reclama(elegido, pathname)) return elegido;
	return moduloPorRuta(pathname) ?? elegido ?? MODULOS[0];
}
function rutaActiva(to, pathname) {
	return new RegExp("^" + String(to).replace(/\$[a-zA-Z]+/g, "[^/]+") + "$").test(pathname);
}
/**
* Patrón de la pantalla abierta ("/proyectos/$projectId/predios/$codigo/cbc"). Sirve para cambiar de
* proyecto o de predio sin salir de la pantalla en la que se está.
*/
function useRutaActual() {
	return useRouterState({ select: (s) => s.matches[s.matches.length - 1]?.fullPath ?? "/" });
}
//#endregion
//#region src/lib/codificacion.ts
var CLAVE$4 = "pdgp-codigos";
var VACIO$3 = [];
var lista$1 = null;
var oyentes$4 = /* @__PURE__ */ new Set();
function cargar$4() {
	if (lista$1) return lista$1;
	try {
		lista$1 = JSON.parse(localStorage.getItem(CLAVE$4) ?? "[]");
	} catch {
		lista$1 = [];
	}
	return lista$1;
}
function guardar(nueva) {
	lista$1 = nueva;
	try {
		localStorage.setItem(CLAVE$4, JSON.stringify(nueva));
	} catch {}
	oyentes$4.forEach((f) => f());
}
function useCodigos() {
	return useSyncExternalStore((f) => {
		oyentes$4.add(f);
		return () => {
			oyentes$4.delete(f);
		};
	}, cargar$4, () => VACIO$3);
}
var ahora = () => (/* @__PURE__ */ new Date()).toISOString();
/** Prefijo de infraestructura según el tipo de proyecto. */
function infraestructuraDe(tipoProyecto) {
	const t = tipoProyecto.toUpperCase();
	if (t.includes("AERO")) return "AERO";
	if (t.includes("FERRO")) return "FERRO";
	if (t.includes("PORT")) return "PORT";
	return "VIAL";
}
var LARGO = /^([A-Z]+)-([A-Z0-9]+)-([A-Z0-9]+)-(\d{6})-(PR|PU)-(\d+)[A-Z]?$/;
/** Partes de un código en formato largo; null si es corto ("AERO-JAUJA-PR-0567T") o no sigue el formato. */
function partesDeCodigo(codigo) {
	const m = LARGO.exec(codigo.trim().toUpperCase());
	if (!m) return null;
	return {
		infraestructura: m[1],
		proyecto: m[2],
		sector: m[3],
		ubigeo: m[4],
		condicion: m[5],
		correlativo: Number(m[6])
	};
}
function armarCodigoPredio(p, correlativo) {
	const limpio = (v) => v.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
	return [
		limpio(p.infraestructura),
		limpio(p.proyecto),
		limpio(p.sector),
		p.ubigeo.trim(),
		p.condicion,
		String(correlativo).padStart(5, "0")
	].join("-");
}
/** Siguiente correlativo de predio del proyecto: el mayor del padrón o del registro, más uno. */
function siguienteCorrelativoPredio(proyecto, registro = cargar$4()) {
	const abrev = proyecto.trim().toUpperCase();
	const usados = [...predioRows.map((r) => r.cod), ...registro.filter((c) => c.tipo === "predio").map((c) => c.codigo)].map((c) => partesDeCodigo(c)).filter((p) => p && p.proyecto === abrev).map((p) => p.correlativo);
	return Math.max(0, ...usados) + 1;
}
var EXPEDIENTE = /^(\d+)-(\d{4})-MTC\/DDP$/;
var formatoExpediente = (n, anio) => `${String(n).padStart(4, "0")}-${anio}-MTC/DDP`;
function expedienteValido(codigo) {
	return EXPEDIENTE.test(normalizarExpediente(codigo));
}
/** Siguiente expediente del año: el mayor correlativo de ese año en el padrón o el registro, más uno. */
function siguienteExpediente(anio, registro = cargar$4()) {
	const usados = [...predioRows.map((r) => r.exp), ...registro.filter((c) => c.tipo === "expediente").map((c) => c.codigo)].map((c) => EXPEDIENTE.exec(normalizarExpediente(c ?? ""))).filter((m) => m && m[2] === String(anio)).map((m) => Number(m[1]));
	return formatoExpediente(Math.max(0, ...usados) + 1, anio);
}
/** Código asignado a un predio en el registro (lo último que se generó o vinculó en su ficha). */
function codigoAsignado(registro, predio, tipo) {
	return registro.find((c) => c.tipo === tipo && c.estado === "asignado" && c.asignadoA === predio)?.codigo;
}
/** Predio que ya usa este código, en el padrón o en el registro (sin contar `predio`). */
function usadoPorOtro(registro, codigo, tipo, predio) {
	const c = tipo === "expediente" ? normalizarExpediente(codigo) : codigo.trim().toUpperCase();
	const enRegistro = registro.find((r) => r.tipo === tipo && r.codigo === c && r.estado === "asignado" && r.asignadoA !== predio);
	if (enRegistro) return enRegistro.asignadoA;
	const fila = predioRows.find((r) => (tipo === "expediente" ? r.exp === c : r.cod.toUpperCase() === c) && r.codigo !== predio);
	return fila ? fila.cod || fila.codigo : void 0;
}
/** Códigos disponibles del proyecto para vincular. */
function disponibles(registro, projectId, tipo) {
	return registro.filter((c) => c.tipo === tipo && c.projectId === projectId && c.estado === "disponible");
}
/** Registra un código generado en Codificación: queda disponible para vincular desde la ficha del predio. */
function registrarCodigo(c) {
	const r = cargar$4();
	const codigo = c.tipo === "expediente" ? normalizarExpediente(c.codigo) : c.codigo.trim().toUpperCase();
	if (r.some((x) => x.tipo === c.tipo && x.codigo === codigo)) return;
	guardar([{
		...c,
		codigo,
		estado: "disponible",
		fecha: ahora()
	}, ...r]);
}
/**
* Asigna un código (nuevo o vinculado) a un predio. El que tenía el predio en el registro vuelve a quedar
* disponible para otro. Deja constancia en la bitácora.
*/
function asignarCodigo(c) {
	const codigo = c.tipo === "expediente" ? normalizarExpediente(c.codigo) : c.codigo.trim().toUpperCase();
	const r = cargar$4().map((x) => x.tipo === c.tipo && x.asignadoA === c.predio && x.codigo !== codigo ? {
		...x,
		estado: "disponible",
		asignadoA: void 0
	} : x);
	const existe = r.find((x) => x.tipo === c.tipo && x.codigo === codigo);
	guardar([existe ? {
		...existe,
		estado: "asignado",
		asignadoA: c.predio
	} : {
		codigo,
		tipo: c.tipo,
		projectId: c.projectId,
		estado: "asignado",
		asignadoA: c.predio,
		origen: c.origen,
		fecha: ahora()
	}, ...r.filter((x) => x !== existe)]);
	registrarEnBitacora({
		modulo: 12,
		entidad: c.tipo === "predio" ? "codigo_predio" : "expediente",
		registro: codigo,
		accion: existe ? "editar" : "crear",
		detalle: `${existe ? "Vinculado" : "Generado"} para el predio ${c.predio}`
	});
	return codigo;
}
//#endregion
//#region src/lib/bloques.ts
var CLAVE$3 = "pdgp-bloques";
var VACIO$2 = [];
var datos$1 = null;
var oyentes$3 = /* @__PURE__ */ new Set();
function cargar$3() {
	if (datos$1) return datos$1;
	try {
		datos$1 = JSON.parse(localStorage.getItem(CLAVE$3) ?? "[]");
	} catch {
		datos$1 = [];
	}
	return datos$1;
}
function useBloques() {
	return useSyncExternalStore((f) => {
		oyentes$3.add(f);
		return () => {
			oyentes$3.delete(f);
		};
	}, cargar$3, () => VACIO$2);
}
function guardarBloque(b, accion, objeto, motivo) {
	const lista = cargar$3();
	const antes = lista.find((x) => x.id === b.id);
	datos$1 = antes ? lista.map((x) => x.id === b.id ? b : x) : [...lista, b];
	try {
		localStorage.setItem(CLAVE$3, JSON.stringify(datos$1));
	} catch {}
	oyentes$3.forEach((f) => f());
	registrarCambio(`bloque-${b.id}`, {
		accion,
		objeto,
		motivo,
		antes: antes ?? {
			...b,
			afectados: [],
			sectores: []
		},
		despues: b
	}, {
		modulo: 10,
		entidad: "liberacion_bloque"
	});
}
var idBloque = () => `bloque-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
/** Bloque y afectado del predio, si está dentro de un bloque. */
function bloqueDelPredio(bloques, codigo) {
	for (const bloque of bloques) {
		const afectado = bloque.afectados.find((a) => a.codigo === codigo);
		if (afectado) return {
			bloque,
			afectado
		};
	}
}
/** UIT de referencia para la compensación (art. 59); se ajusta cada año en Maestros. */
var UIT = 5350;
/**
* Compensación económica (art. 59): 10 % del valor del terreno, entre 1 y 6 UIT, si entrega en 40 d.h.
* Ocupantes: 4 UIT en zona urbana, 3 en rural.
*/
function compensacion(a, valorM2, uit = UIT) {
	if (a.condicion === "OCUPANTE") return (a.zona === "URBANA" ? 4 : 3) * uit;
	const diez = a.area * valorM2 * .1;
	return Math.round(Math.min(6 * uit, Math.max(uit, diez)) * 100) / 100;
}
/** Incentivo sobre el valor del terreno: 30 % con entrega anticipada, 20 % solo trato directo (art. 58). */
var incentivoBloque = (r) => r === "ACEPTA_ENTREGA_ANTICIPADA" ? .3 : r === "ACEPTA" ? .2 : 0;
/**
* Liquidación del afectado: terreno (los ocupantes no cobran terreno), incentivo (art. 58) y compensación
* (art. 59), que se pierde si rechaza o si entrega después de los 40 d.h. desde la aceptación.
*/
function liquidacion(a, valorM2, uit = UIT) {
	const terreno = a.condicion === "OCUPANTE" ? 0 : Math.round(a.area * valorM2 * 100) / 100;
	const incentivo = Math.round(terreno * incentivoBloque(a.respuesta) * 100) / 100;
	const desde = desdeIso(a.respuestaEl);
	const comp = a.respuesta === "RECHAZA" || Boolean(desde && a.entregaEl && a.entregaEl > fechaIso(vencimiento(desde, plazo("bloque_entrega")))) ? 0 : compensacion(a, valorM2, uit);
	const pagado = a.pagos.reduce((s, p) => s + p.monto, 0);
	return {
		terreno,
		incentivo,
		compensacion: comp,
		total: terreno + incentivo + comp,
		pagado
	};
}
//#endregion
//#region src/lib/normasProyecto.ts
var NOMBRE_MODALIDAD_OBRA = {
	ORDINARIA: "Ordinaria",
	NEC: "Contrato NEC",
	INMEDIATA: "Obra de ejecución inmediata"
};
/** Gobiernos regionales con funciones transferidas en materia de bienes estatales (flujograma de la DDP). */
var GORES_CON_FUNCIONES = [
	"Gobierno Regional de Tumbes",
	"Gobierno Regional de Lambayeque",
	"Gobierno Regional de San Martín",
	"Gobierno Regional de Amazonas",
	"Gobierno Regional de Arequipa",
	"Gobierno Regional de Tacna",
	"Gobierno Regional del Callao"
];
var CLAVE$2 = "pdgp-normas-proyecto";
var VACIAS = {
	leyes: [],
	declaratorias: []
};
var datos = null;
var oyentes$2 = /* @__PURE__ */ new Set();
function cargar$2() {
	if (datos) return datos;
	try {
		datos = JSON.parse(localStorage.getItem(CLAVE$2) ?? "{}");
	} catch {
		datos = {};
	}
	return datos;
}
function useNormasProyecto(projectId) {
	return useSyncExternalStore((f) => {
		oyentes$2.add(f);
		return () => {
			oyentes$2.delete(f);
		};
	}, () => cargar$2()[projectId] ?? VACIAS, () => VACIAS);
}
var leerNormasProyecto = (projectId) => cargar$2()[projectId] ?? VACIAS;
/** Guarda las normas del proyecto y deja la versión en el histórico `normas-{proyecto}`. */
function guardarNormasProyecto(projectId, nuevas, accion, objeto, motivo) {
	const antes = leerNormasProyecto(projectId);
	datos = {
		...cargar$2(),
		[projectId]: nuevas
	};
	try {
		localStorage.setItem(CLAVE$2, JSON.stringify(datos));
	} catch {}
	oyentes$2.forEach((f) => f());
	registrarCambio(`normas-${projectId}`, {
		accion,
		objeto,
		motivo,
		antes,
		despues: nuevas
	}, {
		modulo: 10,
		entidad: "normas_habilitantes"
	});
}
var idNorma = () => `norma-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
/** Caducidad del derecho de expropiar: 60 meses desde la vigencia (art. 33). Aviso a 180 días. */
function estadoLey(ley, hoy = /* @__PURE__ */ new Date()) {
	const desde = desdeIso(ley.vigencia || ley.publicacion);
	if (!desde) return { estado: "SIN_FECHA" };
	const caduca = vencimiento(desde, plazo("caducidad_ley"));
	const dias = Math.ceil((caduca.getTime() - hoy.getTime()) / 864e5);
	return {
		estado: dias < 0 ? "CADUCADA" : dias <= 180 ? "CADUCA_PRONTO" : "VIGENTE",
		caduca,
		dias
	};
}
/** La ley autoritativa vigente que alcanza al predio, si hay. */
function leyDelPredio(normas, codigo, hoy = /* @__PURE__ */ new Date()) {
	return normas.leyes.find((l) => (l.alcance === "proyecto" || l.predios.includes(codigo)) && estadoLey(l, hoy).estado !== "CADUCADA");
}
/** La declaratoria de necesidad pública vigente o en trámite del proyecto. */
var declaratoriaDelProyecto = (normas) => normas.declaratorias.find((d) => d.estado === "VIGENTE") ?? normas.declaratorias[0];
//#endregion
//#region src/lib/perfilPredio.ts
var NOMBRE_CONDICION = {
	PRIVADO: "Predio privado",
	ESTATAL: "Predio estatal",
	COMUNAL: "Predio comunal",
	SIN_SUJETO_PASIVO: "Sin sujeto pasivo"
};
var NOMBRE_RUTA = {
	TRATO_DIRECTO: "Trato directo",
	EXPROPIACION: "Expropiación",
	TRANSFERENCIA: "Transferencia SBN",
	MEJORAS: "Reconocimiento de mejoras",
	BLOQUE: "Liberación en bloque",
	PENDIENTE: "Modalidad pendiente"
};
var NOMBRE_CASO = {
	"": "Ninguno",
	DUPLICIDAD: "Duplicidad de partidas (art. 29)",
	LITIGIO: "Disputa judicial o arbitral (art. 28.1.c)",
	TERCEROS: "Terceros interesados (art. 6.2)",
	SUCESION: "Sucesión no inscrita (art. 6.1)"
};
/** Regla del flujograma de la DDP para consignar en cada caso especial. */
var REGLA_CASO = {
	DUPLICIDAD: "De no lograrse el trato directo, el valor de la tasación se consigna a favor de los titulares registrales.",
	LITIGIO: "Se consigna a la autoridad a cargo del proceso judicial o arbitral.",
	TERCEROS: "Se inicia la expropiación considerando sujeto pasivo al titular; los terceros pueden iniciar las acciones legales solo contra el sujeto pasivo.",
	SUCESION: "Se considera sujeto pasivo al titular registral, sin comunicar la afectación ni la intención de adquisición; la expropiación se inicia al recibir la tasación."
};
var NOMBRE_ACTIVIDAD = {
	VIVIENDA: "Vivienda u otro uso",
	INDUSTRIA_COMERCIO: "Industria o comercio en funcionamiento",
	SIN_ACTIVIDAD: "Sin actividad"
};
/** Qué menú corresponde: el bloque manda; luego la ruta; luego la condición. */
function varianteDe(p) {
	if (p.bloque && p.ruta !== "EXPROPIACION" || p.ruta === "BLOQUE") return "bloque";
	if (p.ruta === "MEJORAS" || p.condicion === "SIN_SUJETO_PASIVO") return "mejoras";
	if (p.ruta === "TRANSFERENCIA" || p.condicion === "ESTATAL") return "estatal";
	return "privado";
}
var norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
/** Perfil inferido, sin correcciones. Pura: mismas entradas, mismo resultado. */
function inferirPerfil(entrada) {
	const cond = norm(entrada.condicionIdentificacion || entrada.condicionPadron || "");
	const mod = norm(entrada.modalidadPadron || "");
	const comunal = entrada.sujeto?.titulares.some((t) => t.tipoPersona === "COMUNIDAD_CAMPESINA" || t.tipoPersona === "COMUNIDAD_NATIVA");
	const condicion = entrada.procesoPadron === "mejoras" || cond.includes("RECONOCIMIENTO") ? "SIN_SUJETO_PASIVO" : cond.includes("ESTATAL") || entrada.procesoPadron === "estatal" ? "ESTATAL" : comunal || cond.includes("COMUN") ? "COMUNAL" : "PRIVADO";
	return {
		condicion,
		ruta: condicion === "ESTATAL" ? "TRANSFERENCIA" : condicion === "SIN_SUJETO_PASIVO" ? "MEJORAS" : mod.includes("EXPROPI") ? "EXPROPIACION" : mod.includes("TRATO DIRECTO") || mod.includes("ENTREGA ANTICIPADA") ? "TRATO_DIRECTO" : "PENDIENTE",
		inscrito: entrada.sujeto ? entrada.sujeto.predioInscrito : true,
		ocupado: Boolean(entrada.sujeto?.ocupantes.length),
		actividad: "VIVIENDA",
		casoEspecial: entrada.sujeto?.litigio.tipo ? "LITIGIO" : "",
		entregaAnticipada: mod.includes("ENTREGA ANTICIPADA")
	};
}
var CLAVE$1 = "pdgp-perfil-predio";
var VACIO$1 = {};
var correcciones = null;
var oyentes$1 = /* @__PURE__ */ new Set();
function cargar$1() {
	if (correcciones) return correcciones;
	try {
		correcciones = JSON.parse(localStorage.getItem(CLAVE$1) ?? "{}");
	} catch {
		correcciones = {};
	}
	for (const c of Object.values(correcciones)) if ("litigioOduplicidad" in c) {
		if (c.litigioOduplicidad && !c.casoEspecial) c.casoEspecial = "LITIGIO";
		delete c.litigioOduplicidad;
	}
	return correcciones;
}
function useCorrecciones(codigo) {
	return useSyncExternalStore((f) => {
		oyentes$1.add(f);
		return () => {
			oyentes$1.delete(f);
		};
	}, () => cargar$1()[codigo] ?? VACIO$1, () => VACIO$1);
}
/** Quién cambia la ruta de un predio (§12.2): Especialista legal, Coordinador y Administrador. */
var puedeCambiarRuta = (rol) => rol === "ADMIN" || rol === "COORDINADOR" || rol === "ESP_LEGAL";
/**
* Volver de expropiación a trato directo: el Administrador, o cualquiera de los anteriores si hay
* entrega anticipada (art. 21.8).
*/
var puedeRevertirExpropiacion = (rol, entregaAnticipada) => rol === "ADMIN" || entregaAnticipada && puedeCambiarRuta(rol);
/** Registra una corrección del perfil con motivo; deja versión y entrada en la bitácora de M8. */
function corregirPerfil(codigo, antes, cambios, accion, motivo) {
	const todas = cargar$1();
	const nuevas = {
		...todas[codigo] ?? {},
		...cambios
	};
	correcciones = {
		...todas,
		[codigo]: nuevas
	};
	try {
		localStorage.setItem(CLAVE$1, JSON.stringify(correcciones));
	} catch {}
	oyentes$1.forEach((f) => f());
	registrarCambio(`perfil-${codigo}`, {
		accion,
		objeto: codigo,
		motivo,
		antes,
		despues: {
			...antes,
			...cambios
		}
	}, {
		modulo: 11,
		entidad: "perfil_predio"
	});
}
/** Perfil completo del predio: inferido + correcciones + normas del proyecto + bloque. */
function usePerfilPredio(projectId, codigo) {
	const fila = getPredioByCodigo(codigo);
	const resumen = fila ? buildPredioSummary(fila) : void 0;
	const ident = useHistorial(`identificacion-${codigo}`)[0];
	const corr = useCorrecciones(codigo);
	const normas = useNormasProyecto(projectId);
	const bloques = useBloques();
	const [sujeto, setSujeto] = useState(null);
	useEffect(() => {
		const leer = () => setSujeto(leerSujetoPasivo(codigo));
		leer();
		window.addEventListener("storage", leer);
		window.addEventListener("focus", leer);
		return () => {
			window.removeEventListener("storage", leer);
			window.removeEventListener("focus", leer);
		};
	}, [codigo]);
	return useMemo(() => {
		const inferido = inferirPerfil({
			condicionPadron: resumen?.condition,
			modalidadPadron: resumen?.modality,
			procesoPadron: resumen?.processKind,
			condicionIdentificacion: ident?.registro.condicionJuridicaPredio,
			sujeto
		});
		const datos = {
			...inferido,
			...corr
		};
		const ley = leyDelPredio(normas, codigo);
		const enBloque = bloqueDelPredio(bloques, codigo);
		const origen = Object.fromEntries(Object.keys(inferido).map((k) => [k, k in corr ? "registrado" : "inferido"]));
		return {
			...datos,
			ocupantes: sujeto?.ocupantes.length ?? 0,
			leyAutoritativa: Boolean(ley),
			ley,
			modalidadObra: normas.proyecto?.modalidadObra ?? "ORDINARIA",
			arcc: Boolean(normas.proyecto?.arcc),
			bloque: enBloque ? {
				id: enBloque.bloque.id,
				nombre: enBloque.bloque.nombre,
				sector: enBloque.afectado.sector
			} : void 0,
			origen
		};
	}, [
		resumen?.condition,
		resumen?.modality,
		resumen?.processKind,
		ident,
		sujeto,
		corr,
		normas,
		bloques,
		codigo
	]);
}
/**
* Ruta del predio para listados (sin hooks): padrón + corrección guardada. No mira identificación,
* sujeto pasivo, normas ni bloques; para el perfil completo, `usePerfilPredio`.
*/
function rutaRapida(codigo) {
	const fila = getPredioByCodigo(codigo);
	const resumen = fila ? buildPredioSummary(fila) : void 0;
	const corr = typeof localStorage === "undefined" ? void 0 : cargar$1()[codigo]?.ruta;
	if (corr) return {
		ruta: corr,
		inferida: false
	};
	return {
		ruta: inferirPerfil({
			condicionPadron: resumen?.condition,
			modalidadPadron: resumen?.modality,
			procesoPadron: resumen?.processKind
		}).ruta,
		inferida: true
	};
}
/** Perfil para listados (sin hooks): el inferido del padrón con las correcciones guardadas. */
function perfilRapido(codigo) {
	const fila = getPredioByCodigo(codigo);
	const resumen = fila ? buildPredioSummary(fila) : void 0;
	return {
		...inferirPerfil({
			condicionPadron: resumen?.condition,
			modalidadPadron: resumen?.modality,
			procesoPadron: resumen?.processKind
		}),
		...typeof localStorage === "undefined" ? {} : cargar$1()[codigo] ?? {}
	};
}
/** Todas las correcciones: un listado que las usa se vuelve a pintar cuando alguien corrige un perfil. */
function useCorreccionesPerfil() {
	return useSyncExternalStore((f) => {
		oyentes$1.add(f);
		return () => {
			oyentes$1.delete(f);
		};
	}, () => cargar$1(), () => SIN_CORRECCIONES);
}
var SIN_CORRECCIONES = {};
/** Asigna la ruta legal de un predio desde un listado (deja versión y bitácora como la pantalla). */
function asignarRuta(codigo, ruta, motivo) {
	const antes = perfilRapido(codigo);
	if (antes.ruta === ruta) return;
	corregirPerfil(codigo, antes, { ruta }, `Asignó la ruta ${NOMBRE_RUTA[ruta]}`, motivo);
}
/** "Predio privado · Trato directo · Ocupado" */
function textoPerfil(p) {
	return [
		NOMBRE_CONDICION[p.condicion],
		p.bloque ? `Bloque ${p.bloque.nombre} · sector ${p.bloque.sector}` : NOMBRE_RUTA[p.ruta],
		p.ocupado ? "Ocupado" : "Libre"
	].join(" · ");
}
//#endregion
//#region src/components/kit/expedienteContexto.ts
/** Clave del paso del menú del predio para la ruta en pantalla ("cbc"), o undefined fuera del predio. */
function usePasoActual() {
	const ruta = useRutaActual();
	return Object.keys(routeByKey).find((k) => routeByKey[k] === ruta);
}
/**
* Lo que el expediente necesita saber del predio en pantalla: código de expediente (el asignado en la
* ficha o, si no, el del padrón), perfil legal y el contexto con el que se registran los ítems.
*/
function useContextoExpediente(projectId, predio, paso) {
	const codigos = useCodigos();
	const perfil = usePerfilPredio(projectId, predio);
	const ruta = useRutaActual();
	const pasoActual = usePasoActual();
	const expediente = codigoAsignado(codigos, predio, "expediente") || getPredioByCodigo(predio)?.exp || void 0;
	return useMemo(() => {
		return {
			perfil: {
				inscrito: perfil.inscrito,
				ocupado: perfil.ocupado,
				ruta: perfil.ruta,
				variante: varianteDe(perfil)
			},
			ctx: {
				projectId,
				predio,
				expediente,
				paso: paso ?? pasoActual ?? "",
				ruta
			},
			expediente
		};
	}, [
		perfil,
		projectId,
		predio,
		expediente,
		paso,
		pasoActual,
		ruta
	]);
}
/**
* Registro en el expediente de un archivo que sube un formulario del predio (docs/PLAN-EXPEDIENTE-DOCUMENTOS.md
* §0): ningún archivo queda suelto. Si el ítem del catálogo es un documento que el sistema generó y está
* numerado, el PDF cierra su firma; si no, entra como documento recibido del ítem o como documento libre
* del paso. Avisa con un mensaje si no se pudo registrar (por ejemplo, el predio no tiene expediente).
*/
function useRegistroExpediente(projectId, predio, paso) {
	const { ctx } = useContextoExpediente(projectId, predio, paso);
	return async (archivo, o) => {
		try {
			return await registrarSubida(ctx, archivo, o);
		} catch (e) {
			toast.error("El archivo no entró al expediente", { description: e instanceof Error ? e.message : void 0 });
			return;
		}
	};
}
//#endregion
//#region src/components/kit/Documentos.tsx
/**
* Acción principal de un paso documental: "Generar carta" (descarga) o "Subir documento firmado" (carga).
* Botón grande con ícono, título y descripción; el mismo en todas las pantallas de predio.
*/
function AccionDocumento({ titulo, descripcion, icono: Icono = Download, onClick, deshabilitado }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		disabled: deshabilitado,
		className: "flex w-full items-center gap-3 rounded-md border border-primary bg-card p-3 text-left hover:bg-primary-soft disabled:cursor-not-allowed disabled:opacity-50",
		children: [/* @__PURE__ */ jsx("span", {
			className: "flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground",
			children: /* @__PURE__ */ jsx(Icono, {
				size: 18,
				"aria-hidden": true
			})
		}), /* @__PURE__ */ jsxs("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("span", {
				className: "block text-sm font-semibold",
				children: titulo
			}), descripcion && /* @__PURE__ */ jsx("span", {
				className: "block text-xs text-muted-foreground",
				children: descripcion
			})]
		})]
	});
}
/** Carga de archivo con el mismo aspecto que AccionDocumento. El input queda accesible (sr-only). */
function CargaDocumento({ titulo, descripcion, accept = ".pdf,.doc,.docx", multiple, onArchivos }) {
	const id = useId();
	return /* @__PURE__ */ jsxs("label", {
		htmlFor: id,
		className: "flex w-full cursor-pointer items-center gap-3 rounded-md border border-dashed border-primary bg-card p-3 text-left hover:bg-primary-soft focus-within:ring-2 focus-within:ring-primary",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
				children: /* @__PURE__ */ jsx(Upload, {
					size: 18,
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("span", {
					className: "block text-sm font-semibold",
					children: titulo
				}), descripcion && /* @__PURE__ */ jsx("span", {
					className: "block text-xs text-muted-foreground",
					children: descripcion
				})]
			}),
			/* @__PURE__ */ jsx("input", {
				id,
				type: "file",
				className: "sr-only",
				accept,
				multiple,
				onChange: (e) => {
					const lista = Array.from(e.target.files ?? []);
					if (lista.length) onArchivos(lista);
					e.currentTarget.value = "";
				}
			})
		]
	});
}
/**
* Lista de verificación de documentos: cada pieza con su estado (cargada o pendiente) y su acción de carga.
* Ejemplo: anverso del DNI, reverso del DNI, ficha RENIEC.
*/
function ListaDocumentos({ items, onCargar, onQuitar, deshabilitado }) {
	return /* @__PURE__ */ jsx("ul", {
		className: "divide-y divide-border rounded-md border border-border",
		children: items.map((it) => /* @__PURE__ */ jsx(ItemDocumento, {
			item: it,
			onCargar,
			onQuitar,
			deshabilitado
		}, it.clave))
	});
}
function ItemDocumento({ item, onCargar, onQuitar, deshabilitado }) {
	const id = useId();
	return /* @__PURE__ */ jsxs("li", {
		className: "flex flex-wrap items-center gap-2 px-3 py-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: `flex size-5 shrink-0 items-center justify-center rounded-sm text-xs font-bold ${item.archivo ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"}`,
				"aria-hidden": true,
				children: item.archivo ? "✓" : "·"
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsx("span", {
					className: "block text-sm font-medium",
					children: item.nombre
				}), /* @__PURE__ */ jsx("span", {
					className: "block truncate text-xs text-muted-foreground",
					children: item.archivo ? `${item.archivo.nombre} · ${item.archivo.fecha}` : item.ayuda ?? "Pendiente"
				})]
			}),
			item.archivo && !deshabilitado && /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => onQuitar(item.clave),
				className: "text-xs font-medium text-destructive hover:underline",
				children: "Quitar"
			}),
			!deshabilitado && /* @__PURE__ */ jsxs("label", {
				htmlFor: id,
				className: "flex h-8 cursor-pointer items-center gap-1 rounded-md border border-border px-2 text-xs font-medium hover:bg-primary-soft focus-within:ring-2 focus-within:ring-primary",
				children: [
					/* @__PURE__ */ jsx(Upload, {
						size: 14,
						"aria-hidden": true
					}),
					" ",
					item.archivo ? "Reemplazar" : "Cargar",
					/* @__PURE__ */ jsx("input", {
						id,
						type: "file",
						className: "sr-only",
						accept: item.accept ?? ".pdf,.jpg,.jpeg,.png",
						"aria-label": `Cargar ${item.nombre}`,
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) onCargar(item.clave, f);
							e.currentTarget.value = "";
						}
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/kit/Modal.tsx
/** xl: formularios de seis campos o más, a dos columnas (regla de docs/PLAN-SUJETO-PASIVO.md §6). */
var ANCHOS = {
	sm: "sm:max-w-md",
	md: "sm:max-w-2xl",
	lg: "sm:max-w-4xl",
	xl: "sm:max-w-6xl"
};
/** Diálogo estándar: título, cuerpo, pie con botones a la derecha. Cierra con Esc. */
function Modal({ abierto, onCerrar, titulo, descripcion, pie, ancho = "md", children }) {
	return /* @__PURE__ */ jsx(Dialog, {
		open: abierto,
		onOpenChange: (v) => !v && onCerrar(),
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: `gap-0 p-0 ${ANCHOS[ancho]}`,
			children: [
				/* @__PURE__ */ jsxs(DialogHeader, {
					className: "border-b border-border px-4 py-3 text-left",
					children: [/* @__PURE__ */ jsx(DialogTitle, {
						className: "text-xl font-semibold text-primary-dark",
						children: titulo
					}), descripcion ? /* @__PURE__ */ jsx(DialogDescription, {
						className: "text-xs",
						children: descripcion
					}) : /* @__PURE__ */ jsx(DialogDescription, {
						className: "sr-only",
						children: titulo
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "max-h-[70vh] overflow-y-auto px-4 py-4",
					children
				}),
				pie && /* @__PURE__ */ jsx(DialogFooter, {
					className: "border-t border-border px-4 py-3",
					children: pie
				})
			]
		})
	});
}
/** Confirmación antes de anular o eliminar. Nunca se borra sin pasar por aquí. */
function Confirmar({ abierto, onCerrar, onConfirmar, titulo, texto, accion, destructiva }) {
	return /* @__PURE__ */ jsx(AlertDialog, {
		open: abierto,
		onOpenChange: (v) => !v && onCerrar(),
		children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, {
			className: "text-xl text-primary-dark",
			children: titulo
		}), /* @__PURE__ */ jsx(AlertDialogDescription, { children: texto })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ jsx(AlertDialogAction, {
			onClick: onConfirmar,
			className: destructiva ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "",
			children: accion
		})] })] })
	});
}
//#endregion
//#region src/lib/exportar.ts
/**
* Deja constancia de una descarga en la actividad de la pantalla (botón "Actividad" del encabezado) y en
* la auditoría de M8. Lo llaman los exportadores; las pantallas con su propio exportador lo llaman a mano.
*/
function registrarExportacion(nombre, formato, filas, detalle) {
	if (typeof window === "undefined") return;
	const ruta = window.location.pathname.replace(/\/+$/, "") || "/";
	try {
		registrarVersion(`actividad-${ruta}`, {
			accion: "Exportó",
			objeto: `${formato} · ${nombre}${detalle ? ` · ${detalle}` : ""}${filas == null ? "" : ` · ${filas} filas`}`,
			registro: {
				archivo: nombre,
				formato,
				filas: filas ?? "",
				detalle: detalle ?? ""
			}
		}, {
			modulo: moduloPorRuta(ruta)?.numero ?? 0,
			entidad: "exportacion",
			accion: "exportar"
		});
	} catch {}
}
var ENTIDAD = "Ministerio de Transportes y Comunicaciones · Dirección de Disponibilidad de Predios (DDP)";
function usuarioActual() {
	try {
		return localStorage.getItem("mtc-session") || "usuario sin sesión";
	} catch {
		return "usuario sin sesión";
	}
}
/** Líneas fijas al final de toda cabecera: quién y cuándo generó el reporte. */
var generado = () => `Generado el ${(/* @__PURE__ */ new Date()).toLocaleString("es-PE", {
	dateStyle: "short",
	timeStyle: "short"
})} por ${usuarioActual()}`;
var texto = (v) => v instanceof Date ? v.toLocaleDateString("es-PE") : v == null ? "" : String(v);
/** Exporta a Excel las mismas columnas y filas que ve el usuario. Un solo exportador para todo el sistema. */
async function exportarExcel(nombre, columnas, filas, cabeceraReporte) {
	const cabecera = columnas.map((c) => ({
		value: c.titulo,
		fontWeight: "bold"
	}));
	const cuerpo = filas.map((f) => columnas.map((c) => {
		const v = c.valor(f);
		if (v instanceof Date) return {
			value: v,
			type: Date,
			format: "dd/mm/yyyy"
		};
		if (typeof v === "number") return {
			value: v,
			type: Number
		};
		return {
			value: v == null ? "" : String(v),
			type: String
		};
	}));
	const encabezado = cabeceraReporte ? [
		[{
			value: ENTIDAD,
			type: String
		}],
		[{
			value: cabeceraReporte.titulo,
			type: String,
			fontWeight: "bold",
			fontSize: 14
		}],
		...[...cabeceraReporte.lineas, generado()].map((l) => [{
			value: l,
			type: String
		}]),
		[]
	] : [];
	const archivo = await writeXlsxFile([{
		data: [
			...encabezado,
			cabecera,
			...cuerpo
		],
		sheet: "Datos",
		stickyRowsCount: encabezado.length + 1
	}]).toBlob();
	descargarBlob(`${nombre}.xlsx`, archivo, false);
	registrarExportacion(nombre, "Excel", filas.length, cabeceraReporte?.titulo);
}
/** Descarga un blob (Word, PDF, ZIP) con el nombre dado y la registra en la actividad de la pantalla. */
function descargarBlob(nombre, blob, registrar = true) {
	if (registrar) {
		const ext = nombre.split(".").pop()?.toLowerCase();
		const formato = ext === "pdf" ? "PDF" : ext === "xlsx" || ext === "xls" || ext === "csv" ? "Excel" : ext === "docx" || ext === "doc" ? "Word" : "Archivo";
		registrarExportacion(nombre.replace(/.[^.]+$/, ""), formato);
	}
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = nombre;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
/**
* Cabecera institucional de todo PDF del sistema: franja roja, entidad, título y líneas de contexto
* (proyecto, predio) más quién y cuándo lo generó. Devuelve la altura en mm donde sigue el contenido.
*/
function dibujarCabeceraPdf(doc, cabecera, m = 12) {
	const ancho = doc.internal.pageSize.getWidth();
	const util = ancho - 2 * m;
	doc.setFillColor(200, 16, 46);
	doc.rect(0, 0, ancho, 4, "F");
	let y = m + 2;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9);
	doc.setTextColor(90, 90, 90);
	doc.text(ENTIDAD, m, y);
	y += 7;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(14);
	doc.setTextColor(0, 0, 0);
	doc.text(cabecera.titulo, m, y);
	y += 6;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9);
	for (const l of [...cabecera.lineas, generado()]) {
		const partes = doc.splitTextToSize(l, util);
		doc.text(partes, m, y);
		y += partes.length * 4.2;
	}
	return y + 3;
}
/** Pie con el título y el número de página en todas las hojas. */
function numerarPaginasPdf(doc, titulo, m = 12) {
	const ancho = doc.internal.pageSize.getWidth();
	const alto = doc.internal.pageSize.getHeight();
	const paginas = doc.getNumberOfPages();
	for (let p = 1; p <= paginas; p++) {
		doc.setPage(p);
		doc.setFontSize(8);
		doc.setTextColor(120, 120, 120);
		doc.text(`${titulo} · Página ${p} de ${paginas}`, ancho - m, alto - 5, { align: "right" });
	}
}
/**
* PDF horizontal A4 con la cabecera institucional y la tabla. Las celdas largas se parten en líneas y la
* tabla sigue en la página siguiente repitiendo los títulos.
*/
async function exportarPdf(nombre, columnas, filas, cabeceraReporte) {
	const { jsPDF } = await import("jspdf");
	const doc = new jsPDF({
		orientation: "landscape",
		unit: "mm",
		format: "a4"
	});
	const ancho = doc.internal.pageSize.getWidth();
	const alto = doc.internal.pageSize.getHeight();
	const m = 12;
	const util = ancho - 2 * m;
	const medidas = columnas.map((c) => {
		const valores = filas.map((f) => texto(c.valor(f)));
		doc.setFont("helvetica", "bold");
		doc.setFontSize(8);
		const palabrasTitulo = c.titulo.split(/\s+/).map((w) => doc.getTextWidth(w));
		const tituloEntero = doc.getTextWidth(c.titulo);
		doc.setFont("helvetica", "normal");
		const palabras = valores.flatMap((v) => v.split(/\s+/)).map((w) => doc.getTextWidth(w));
		const enteros = valores.map((v) => doc.getTextWidth(v));
		const min = Math.min(45, Math.max(...palabrasTitulo, ...palabras, 4) + 3);
		return {
			min,
			ideal: Math.max(min, Math.min(60, Math.max(tituloEntero, ...enteros, 4) + 3))
		};
	});
	const sumaMin = medidas.reduce((t, m2) => t + m2.min, 0);
	const sumaIdeal = medidas.reduce((t, m2) => t + m2.ideal, 0);
	const anchos = sumaIdeal <= util ? medidas.map((m2) => m2.ideal * (util / sumaIdeal)) : sumaMin >= util ? medidas.map((m2) => m2.min * (util / sumaMin)) : medidas.map((m2) => m2.min + (m2.ideal - m2.min) / (sumaIdeal - sumaMin) * (util - sumaMin));
	const ROJO = [
		200,
		16,
		46
	];
	let y = m;
	const titulos = () => {
		doc.setFont("helvetica", "bold");
		doc.setFontSize(8);
		const lineas = columnas.map((c, i) => doc.splitTextToSize(c.titulo, anchos[i] - 2));
		const h = Math.max(...lineas.map((l) => l.length)) * 3.6 + 2;
		doc.setFillColor(...ROJO);
		doc.rect(m, y, util, h, "F");
		doc.setTextColor(255, 255, 255);
		let x = m;
		lineas.forEach((l, i) => {
			doc.text(l, x + 1, y + 4);
			x += anchos[i];
		});
		doc.setTextColor(0, 0, 0);
		y += h;
	};
	y = dibujarCabeceraPdf(doc, cabeceraReporte, m);
	titulos();
	doc.setFontSize(8);
	filas.forEach((f, n) => {
		doc.setFont("helvetica", "normal");
		const celdas = columnas.map((c, i) => doc.splitTextToSize(texto(c.valor(f)), anchos[i] - 2));
		const h = Math.max(...celdas.map((l) => l.length)) * 3.6 + 2;
		if (y + h > alto - m) {
			doc.addPage();
			y = m;
			titulos();
			doc.setFont("helvetica", "normal");
		}
		if (n % 2) {
			doc.setFillColor(245, 245, 245);
			doc.rect(m, y, util, h, "F");
		}
		let x = m;
		celdas.forEach((l, i) => {
			doc.text(l, x + 1, y + 4);
			x += anchos[i];
		});
		y += h;
	});
	if (filas.length === 0) doc.text("Sin registros.", m, y + 5);
	numerarPaginasPdf(doc, cabeceraReporte.titulo, m);
	doc.save(`${nombre}.pdf`);
	registrarExportacion(nombre, "PDF", filas.length, cabeceraReporte.titulo);
}
//#endregion
//#region src/components/kit/GenerarDocumento.tsx
/** Lo que se imprime en lugar del número cuando el documento sale sin numerar. */
var TEXTO_BORRADOR = "BORRADOR SIN NUMERAR";
/** Archivos generados, por id del documento: permiten volver a descargarlo desde el registro. */
var archivosDocumentos = almacenArchivos("pdgp-documentos-archivos", "archivos");
/**
* Generación de un documento con la pregunta de numeración (docs/PLAN-DOCUMENTOS.md §6). Dibuja el
* botón del paso; al pulsarlo pregunta si se numera con la regla vigente, sale como borrador sin
* número o lleva un número emitido fuera del sistema. El número se reserva al confirmar; cancelar no
* consume nada. La pantalla arma el archivo con `armarArchivo(numero)` y recibe el resultado.
* En un predio, todo lo generado entra al expediente (docs/PLAN-EXPEDIENTE-DOCUMENTOS.md §5): el ítem del
* catálogo del paso que corresponde al tipo, o un ítem libre. Los requisitos del ítem bloquean el código
* (no el borrador) y la opción "vincular" suma el predio a un documento ya emitido.
*/
function GenerarDocumento({ titulo, descripcion, icono = Download, tipos: tiposAdmitidos, subtipos: subtipoPorTipo = {}, tipoInicial, projectId, predios, paso, pantalla, ruta, asunto, destino, armarArchivo, nombreArchivo, onGenerado, validar, deshabilitado, catalogoId, renderBoton }) {
	const tiposCatalogo = useTiposDocumento();
	const registro = useDocumentos();
	const catalogo = useCatalogo();
	const items = useItems();
	const predio = predios[0] ?? "";
	const exp = useContextoExpediente(projectId ?? "", predio, paso);
	const pasoExp = exp.ctx.paso || pantalla;
	const catalogoDe = (tipoId, subtipoId) => catalogoId ? catalogo.find((c) => c.id === catalogoId) : predio ? catalogoParaGenerado(catalogo, pasoExp, tipoId, subtipoId) : void 0;
	const tipo0 = tipoInicial ?? tiposAdmitidos[0] ?? "";
	const catInicial = catalogoDe(tipo0, subtipoPorTipo[tipo0]);
	const soloNumero = SOLO_NUMERO.has(tipo0);
	const requisitos = catInicial && predio && !soloNumero ? requisitosDe(catInicial, catalogo, items, predio, exp.perfil) : [];
	const sinExpediente = Boolean(predio) && !exp.expediente && !soloNumero;
	const [abierto, setAbierto] = useState(null);
	const [errorPantalla, setErrorPantalla] = useState(null);
	const [borrador, setBorrador] = useState(false);
	const emitidos = useMemo(() => documentosDe(registro, { predio: predios[0] }).filter((d) => (paso ? d.origen.paso === paso : d.origen.pantalla === pantalla) && d.estado === "emitido"), [
		registro,
		predios,
		paso,
		pantalla
	]);
	const ultimo = emitidos[0];
	const nombreTipo = (id) => tiposCatalogo.find((t) => t.id === id)?.nombre ?? id;
	function abrir(modo) {
		const e = validar?.() ?? null;
		setErrorPantalla(e);
		if (!e) setAbierto(modo);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: renderBoton ? "contents" : "space-y-2",
		children: [
			renderBoton ? renderBoton(() => abrir("numerar")) : /* @__PURE__ */ jsx(AccionDocumento, {
				titulo,
				descripcion,
				icono,
				deshabilitado,
				onClick: () => abrir("numerar")
			}),
			errorPantalla && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: errorPantalla
			}),
			borrador && !renderBoton && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => abrir("numerar"),
				children: [/* @__PURE__ */ jsx(Hash, {}), " Numerar este borrador"]
			}),
			ultimo && !renderBoton && /* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Último documento:",
					" ",
					/* @__PURE__ */ jsx("span", {
						className: "font-mono font-semibold text-foreground",
						children: ultimo.numero
					}),
					" ·",
					" ",
					nombreTipo(ultimo.tipoId),
					" · ",
					fechaHora(ultimo.fecha),
					emitidos.length > 1 && ` · ${emitidos.length} emitidos en este paso`,
					" ·",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/seguridad/documentos/generados",
						search: { q: ultimo.numero },
						className: "text-primary-dark underline",
						children: "ver en el registro"
					})
				]
			}),
			abierto && /* @__PURE__ */ jsx(DialogoNumeracion, {
				titulo,
				modoInicial: abierto,
				tiposAdmitidos: tiposAdmitidos.map((id) => tiposCatalogo.find((t) => t.id === id)).filter((t) => Boolean(t && t.estado === "ACTIVO")),
				subtipoPorTipo,
				tipoInicial,
				projectId,
				predios,
				destino,
				requisitos,
				sinExpediente,
				onCerrar: () => setAbierto(null),
				onConfirmar: async ({ modo, tipoId, subtipoId, ctx, externo, vinculoId }) => {
					const cat = catalogoDe(tipoId, subtipoId);
					if (modo === "vincular") {
						const item = await vincularDocumento(exp.ctx, vinculoId, cat?.id, titulo);
						const doc = registro.find((d) => d.id === vinculoId);
						setAbierto(null);
						onGenerado({
							numero: item.numero ?? null,
							documento: doc,
							tipoId,
							subtipoId,
							archivo: doc?.archivo ?? ""
						});
						return;
					}
					const datos = {
						tipoId,
						asunto,
						origen: {
							ruta,
							pantalla,
							paso
						},
						archivo: nombreArchivo(tipoId)
					};
					let documento;
					if (modo === "numerar") {
						const regla = reglaVigente(leerReglas(), tipoId, subtipoId);
						if (!regla) throw new Error("El tipo no tiene regla de numeración vigente.");
						documento = reservarNumero(regla, tiposCatalogo.find((t) => t.id === tipoId), ctx, datos);
					} else if (modo === "externo") documento = registrarExterno(externo, ctx, datos);
					const numero = documento?.numero ?? null;
					let blob;
					try {
						blob = await armarArchivo(numero, tipoId);
					} catch (e) {
						if (documento) anularDocumento(documento.id, "No se pudo generar el archivo", ctx.usuario.nombre);
						throw e;
					}
					descargarBlob(datos.archivo, blob);
					if (documento) archivosDocumentos.guardar(documento.id, blob).catch(() => void 0);
					if (predio) await registrarGenerado(exp.ctx, {
						catalogoId: cat?.id,
						nombreLibre: titulo,
						tipoId,
						subtipoId,
						documento,
						blob,
						nombreArchivo: datos.archivo
					});
					setBorrador(modo === "borrador");
					setAbierto(null);
					onGenerado({
						numero,
						documento,
						tipoId,
						subtipoId,
						archivo: datos.archivo
					});
				}
			})
		]
	});
}
/** Áreas que pueden emitir en nombre del usuario: la suya y sus superiores que emiten documentos. */
/** Tipos que se numeran con correlativo propio, sin expediente ni requisitos del predio. */
var SOLO_NUMERO = /* @__PURE__ */ new Set(["acta"]);
/** Área que emite por defecto cuando el usuario no tiene área asignada (prototipo): la DDP. */
var AREA_EMISORA_POR_DEFECTO = "ddp";
function areasEmisoras(areas, yo) {
	if (!yo?.areaId) return areas.filter((a) => a.id === AREA_EMISORA_POR_DEFECTO);
	return rutaArea(areas, yo.areaId).reverse().filter((a) => a.estado === "ACTIVA" && (a.emiteDocumentos || a.id === yo.areaId));
}
/** Subtipo que propone el diálogo: el que define el paso o, si el tipo tiene uno solo activo, ese. */
function subtipoPorDefecto(tipo, porTipo) {
	if (!tipo) return "";
	const activos = tipo.subtipos.filter((s) => s.estado === "ACTIVO");
	return porTipo[tipo.id] ?? (activos.length === 1 ? activos[0].id : "");
}
function DialogoNumeracion({ titulo, modoInicial, tiposAdmitidos, subtipoPorTipo, tipoInicial, projectId, predios, destino, requisitos, sinExpediente, onCerrar, onConfirmar }) {
	const areas = useAreas();
	const reglas = useReglas();
	const registro = useDocumentos();
	const [vinculoId, setVinculoId] = useState("");
	const [buscarVinculo, setBuscarVinculo] = useState("");
	useUsuarios();
	const yo = useUsuarioSesion();
	const emisoras = areasEmisoras(areas, yo);
	const emisoraPorDefecto = emisoras.find((a) => a.emiteDocumentos) ?? emisoras[0];
	const [modo, setModo] = useState(modoInicial);
	const [tipoId, setTipoId] = useState(tiposAdmitidos.find((t) => t.id === tipoInicial)?.id ?? tiposAdmitidos[0]?.id ?? "");
	const tipo = tiposAdmitidos.find((t) => t.id === tipoId);
	const subtiposActivos = tipo?.subtipos.filter((s) => s.estado === "ACTIVO") ?? [];
	const [subtipoId, setSubtipoId] = useState(subtipoPorDefecto(tipo, subtipoPorTipo));
	const [areaEmisoraId, setAreaEmisoraId] = useState(emisoraPorDefecto?.id ?? "");
	const [destinoArea, setDestinoArea] = useState(destino?.areaId ?? "");
	const [destinoExterno, setDestinoExterno] = useState(destino?.externo ?? "");
	const [externo, setExterno] = useState("");
	const [error, setError] = useState(null);
	const [procesando, setProcesando] = useState(false);
	const admiteArea = tipo?.dirigidoA !== "externo";
	const admiteExterno = tipo?.dirigidoA !== "interno";
	const ctx = {
		usuario: yo ?? {
			id: "sin-usuario",
			nombre: "Usuario sin registro",
			areaId: void 0
		},
		areaEmisoraId: areaEmisoraId || void 0,
		areaDestinoId: admiteArea ? destinoArea || void 0 : void 0,
		destinatarioExterno: admiteExterno ? destinoExterno || void 0 : void 0,
		subtipoId: subtipoId || void 0,
		projectId,
		predios,
		fecha: /* @__PURE__ */ new Date()
	};
	const regla = tipo ? reglaVigente(reglas, tipo.id, subtipoId || void 0) : void 0;
	const falta = regla ? faltantes(regla, ctx, tipo) : [];
	const previo = regla ? proximoNumero(regla, tipo, ctx, areas).numero : "";
	const faltan = requisitos.filter((r) => r.bloquea && !r.cumple);
	const q = buscarVinculo.trim().toLowerCase();
	const vinculables = registro.filter((d) => d.estado === "emitido" && tiposAdmitidos.some((t) => t.id === d.tipoId) && (!predios[0] || !d.predios.includes(predios[0])) && (!projectId || !d.projectId || d.projectId === projectId) && (!q || d.numero.toLowerCase().includes(q) || d.asunto.toLowerCase().includes(q))).slice(0, 8);
	const bloqueo = !tipo ? "El paso no tiene un tipo de documento activo. Revíselo en Tipos de documento." : modo === "numerar" && !regla ? `${tipo.nombre} no tiene regla de numeración vigente: defínala en Numeración o genere un borrador.` : modo === "numerar" && faltan.length ? `Faltan requisitos: ${faltan.map((r) => r.nombre).join("; ")}. Puede generarlo como borrador; con código, cuando estén todos.` : modo === "numerar" && falta.length ? `Falta indicar: ${falta.join(", ")}.` : modo === "vincular" && !vinculoId ? "Elija el documento al que se vincula este predio." : modo === "externo" && !externo.trim() ? "Ingrese el número emitido fuera del sistema." : null;
	const cambiarTipo = (id) => {
		setTipoId(id);
		const t = tiposAdmitidos.find((x) => x.id === id);
		setSubtipoId(subtipoPorDefecto(t, subtipoPorTipo));
	};
	async function confirmar() {
		setError(null);
		setProcesando(true);
		try {
			await onConfirmar({
				modo,
				tipoId,
				subtipoId: subtipoId || void 0,
				ctx,
				externo,
				vinculoId
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "No se pudo generar el documento.");
		} finally {
			setProcesando(false);
		}
	}
	const opcion = (valor, texto, detalle) => /* @__PURE__ */ jsxs("label", {
		className: `flex cursor-pointer gap-3 rounded-md border px-3 py-2 ${modo === valor ? "border-primary bg-primary-soft" : "border-border"}`,
		children: [/* @__PURE__ */ jsx("input", {
			type: "radio",
			name: "modo-numeracion",
			className: "mt-1 size-4 accent-primary",
			checked: modo === valor,
			onChange: () => setModo(valor)
		}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
			className: "block text-sm font-semibold",
			children: texto
		}), /* @__PURE__ */ jsx("span", {
			className: "block text-xs text-muted-foreground",
			children: detalle
		})] })]
	});
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "lg",
		titulo,
		descripcion: "¿Desea asignar un número de documento?",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			disabled: procesando,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			onClick: () => void confirmar(),
			disabled: Boolean(bloqueo) || procesando,
			children: procesando ? "Generando..." : modo === "borrador" ? "Generar borrador" : modo === "vincular" ? "Vincular" : "Generar documento"
		})] }),
		children: [
			error && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: error
			}),
			requisitos.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "mb-3 rounded-md border border-border px-3 py-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase text-muted-foreground",
					children: "Requisitos"
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-1 space-y-1 text-sm",
					children: requisitos.map((r) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-2",
						children: [r.cumple ? /* @__PURE__ */ jsx(Check, {
							size: 16,
							className: "mt-0.5 shrink-0 text-success",
							"aria-label": "Cumple"
						}) : /* @__PURE__ */ jsx(X, {
							size: 16,
							className: `mt-0.5 shrink-0 ${r.bloquea ? "text-destructive" : "text-warning"}`,
							"aria-label": r.bloquea ? "Falta" : "Recomendado"
						}), /* @__PURE__ */ jsxs("span", {
							className: "min-w-0",
							children: [
								r.nombre,
								r.item?.numero && /* @__PURE__ */ jsx("span", {
									className: "ml-1 font-mono text-xs text-muted-foreground",
									children: r.item.numero
								}),
								!r.cumple && /* @__PURE__ */ jsxs("span", {
									className: "ml-1 text-xs text-muted-foreground",
									children: [r.bloquea ? "falta" : "recomendado", routeByKey[r.paso] && predios[0] && projectId && /* @__PURE__ */ jsxs(Fragment$1, { children: [" · ", /* @__PURE__ */ jsx(Link, {
										to: routeByKey[r.paso],
										params: {
											projectId,
											codigo: predios[0]
										},
										className: "text-primary-dark underline",
										onClick: onCerrar,
										children: "ir al paso"
									})] })]
								})
							]
						})]
					}, r.id))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					opcion("numerar", "Sí, numerar con la regla vigente", "El número se reserva al generar y queda en el registro de documentos."),
					opcion("borrador", "No, generar sin número", `El documento sale marcado «${TEXTO_BORRADOR}». Podrá numerarlo después desde este paso.`),
					predios.length > 0 && opcion("vincular", "Vincular a un documento ya registrado", "Suma este predio a un documento emitido (oficio múltiple, documento de otro paso). No genera número ni archivo nuevos."),
					opcion("externo", "Usar un número ya emitido fuera del sistema", "Se registra tal cual, sin consumir el correlativo. No puede repetir un número registrado.")
				]
			}),
			modo === "vincular" && /* @__PURE__ */ jsxs("div", {
				className: "mt-4 space-y-2",
				children: [/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Buscar por número o asunto",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
						placeholder: "OFICIO N.° 0011",
						value: buscarVinculo,
						onChange: (e) => setBuscarVinculo(e.target.value)
					})
				}), vinculables.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "No hay documentos emitidos de este tipo para vincular."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "space-y-1",
					"aria-label": "Documentos que se pueden vincular",
					children: vinculables.map((d) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", {
						className: `flex cursor-pointer gap-2 rounded-md border px-3 py-2 text-sm ${vinculoId === d.id ? "border-primary bg-primary-soft" : "border-border"}`,
						children: [/* @__PURE__ */ jsx("input", {
							type: "radio",
							name: "vinculo",
							className: "mt-1 size-4 accent-primary",
							checked: vinculoId === d.id,
							onChange: () => setVinculoId(d.id)
						}), /* @__PURE__ */ jsxs("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("span", {
								className: "block font-mono text-xs font-semibold",
								children: d.numero
							}), /* @__PURE__ */ jsxs("span", {
								className: "block text-xs text-muted-foreground",
								children: [
									d.asunto,
									" · ",
									d.predios.length,
									" predio(s) · ",
									fechaHora(d.fecha),
									" ·",
									" ",
									d.usuarioNombre
								]
							})]
						})]
					}) }, d.id))
				})]
			}),
			modo !== "borrador" && modo !== "vincular" && /* @__PURE__ */ jsxs("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Tipo",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: tipoId,
							onChange: (e) => cambiarTipo(e.target.value),
							children: tiposAdmitidos.map((t) => /* @__PURE__ */ jsx("option", {
								value: t.id,
								children: t.nombre
							}, t.id))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Subtipo",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: subtipoId,
							onChange: (e) => setSubtipoId(e.target.value),
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Sin subtipo"
							}), subtiposActivos.map((s) => /* @__PURE__ */ jsx("option", {
								value: s.id,
								children: s.nombre
							}, s.id))]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Área emisora",
						obligatorio: true,
						ayuda: yo ? `Su área o una superior que emite documentos. Emite: ${yo.nombre}.` : "Su usuario no tiene área asignada: emite la DDP. Pida al Administrador que la registre en Usuarios.",
						children: (id) => emisoras.length ? /* @__PURE__ */ jsx("select", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: areaEmisoraId,
							onChange: (e) => setAreaEmisoraId(e.target.value),
							children: emisoras.map((a) => /* @__PURE__ */ jsxs("option", {
								value: a.id,
								children: [
									a.codigo,
									" · ",
									a.nombre
								]
							}, a.id))
						}) : /* @__PURE__ */ jsx("p", {
							id,
							className: "pt-2 text-sm text-destructive",
							children: "Su usuario no tiene área asignada. Pida al Administrador que la registre en Usuarios."
						})
					}),
					admiteArea && /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Área destino",
						obligatorio: Boolean(regla?.piezas.some((p) => p.tipo === "areaDestino")),
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: destinoArea,
							onChange: (e) => setDestinoArea(e.target.value),
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: admiteExterno ? "Ninguna (destinatario externo)" : "Elija el área"
							}), areas.filter((a) => a.estado === "ACTIVA").map((a) => /* @__PURE__ */ jsxs("option", {
								value: a.id,
								children: [
									a.codigo,
									" · ",
									a.nombre
								]
							}, a.id))]
						})
					}),
					admiteExterno && /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Destinatario externo",
						ayuda: "Persona o entidad fuera del MTC: sujeto pasivo, SUNARP, SBN.",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: destinoExterno,
							onChange: (e) => setDestinoExterno(e.target.value)
						})
					}),
					modo === "externo" && /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Número del documento",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							placeholder: "OFICIO N.° 0143-2025-MTC/19.03",
							value: externo,
							onChange: (e) => setExterno(e.target.value)
						})
					})
				] }), modo === "numerar" && regla && /* @__PURE__ */ jsxs("div", {
					className: "mt-3 rounded-md border border-border bg-muted px-3 py-2",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Número que se asignará (regla «",
							regla.nombre,
							"»)"
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "font-mono text-base font-semibold",
						children: previo
					})]
				})]
			}),
			bloqueo && /* @__PURE__ */ jsx(Aviso, {
				tipo: "aviso",
				children: bloqueo
			})
		]
	});
}
var escapar = (t) => t.replace(/[&<>"]/g, (c) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[c]);
/**
* Plantilla base de un documento en Word (HTML): encabezado de la entidad, número (o la marca de
* borrador), fecha, asunto y cuerpo. La usan el documento suelto y los pasos sin plantilla propia.
*/
function htmlDocumentoBase(d) {
	const hoy = (/* @__PURE__ */ new Date()).toLocaleDateString("es-PE", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	const parrafos = (d.cuerpo ?? "").split(/\n{2,}/).filter((p) => p.trim()).map((p) => `<p>${escapar(p).replace(/\n/g, "<br>")}</p>`).join("");
	return `<!doctype html><html><head><meta charset="UTF-8" /></head>
    <body style="font-family:Arial,sans-serif;font-size:11pt;color:#111827;line-height:1.4">
      <p style="text-align:center;font-size:9pt">MINISTERIO DE TRANSPORTES Y COMUNICACIONES<br>Dirección de Disponibilidad de Predios</p>
      <h1 style="text-align:center;font-size:14pt">${escapar(d.numero ?? "BORRADOR SIN NUMERAR")}</h1>
      <p style="text-align:right">Lima, ${escapar(hoy)}</p>
      <p><b>Asunto:</b> ${escapar(d.asunto)}</p>
      ${(d.lineas ?? []).filter(Boolean).map((l) => `<p>${escapar(l)}</p>`).join("")}
      ${parrafos || "<p>Complete el contenido antes de la firma.</p>"}
      <br><br><p style="text-align:center">____________________________________<br>Firma</p>
    </body></html>`;
}
//#endregion
//#region src/components/kit/MotivoModal.tsx
/** Confirmación que exige motivo (mínimo cinco caracteres): anular, inactivar, ajustar. */
function MotivoModal({ titulo, descripcion, accion, destructiva, bloqueo, onCerrar, onConfirmar, children }) {
	const id = useId();
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo,
		descripcion,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: destructiva ? "destructive" : "default",
			disabled: Boolean(bloqueo) || motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: accion
		})] }),
		children: [
			bloqueo && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: bloqueo
			}),
			children,
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id,
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id,
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
//#endregion
//#region src/lib/plantillaDocx.ts
/**
* Relleno de plantillas Word reales de M24 (docs/PLAN-EXPEDIENTE-DOCUMENTOS.md §8): abre el .docx,
* reemplaza `${VARIABLE}` en el cuerpo, encabezados y pies, y devuelve otro .docx. Word suele partir
* una variable en varios fragmentos con formato (`${` en uno, `NOMBRE}` en otro): se reconoce aunque
* venga partida y se escribe en el primer fragmento. Una variable sin dato queda como línea para llenar.
*/
var plantillasWord = almacenArchivos("pdgp-plantillas-word", "files");
/** Plantillas vigentes de M24: la última versión guardada en su histórico. */
function leerPlantillas() {
	try {
		return JSON.parse(localStorage.getItem("pdgp-historial-gestion-documental") ?? "[]")[0]?.registro ?? [];
	} catch {
		return [];
	}
}
/**
* Archivo .docx para generar: la plantilla asignada al ítem del catálogo o, si no hay, la de M24 que
* declara el mismo tipo y subtipo. Sin archivo cargado en el navegador, undefined (se usa el HTML base).
*/
async function plantillaDe(plantillaId, tipoId, subtipoId) {
	const lista = leerPlantillas();
	const p = lista.find((x) => x.id === plantillaId) ?? (tipoId ? lista.find((x) => x.tipoId === tipoId && x.subtipoId === subtipoId) ?? lista.find((x) => x.tipoId === tipoId && !x.subtipoId) : void 0);
	if (!p) return void 0;
	return await plantillasWord.leer(p.id).catch(() => void 0) ?? void 0;
}
var escaparXml = (t) => t.replace(/[&<>"]/g, (c) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[c]);
/** Variable con o sin etiquetas de formato en medio: `$<w:t>{</w:t>...NOMBRE...}`. */
var VARIABLE = /\$(?:<[^>]+>)*\{((?:<[^>]+>|[A-Z0-9_])+)\}/g;
var sinEtiquetas = (t) => t.replace(/<[^>]+>/g, "");
/**
* Reemplaza las variables de un XML de Word. Si la variable venía partida en varios fragmentos, el valor
* va en el primero y las etiquetas de los demás se conservan vacías (el documento sigue siendo válido).
*/
function rellenarXml(xml, datos) {
	return xml.replace(VARIABLE, (m, nombre) => {
		const clave = sinEtiquetas(nombre);
		return (datos[clave]?.trim() ? escaparXml(datos[clave]) : "________________") + (m.match(/<[^>]+>/g) ?? []).join("");
	});
}
var PARTES = /^word\/(document|header\d*|footer\d*)\.xml$/;
/** Rellena la plantilla y devuelve el .docx. */
async function armarDesdePlantilla(docx, datos) {
	const zip = await JSZip.loadAsync(await docx.arrayBuffer());
	for (const nombre of Object.keys(zip.files).filter((n) => PARTES.test(n))) zip.file(nombre, rellenarXml(await zip.file(nombre).async("string"), datos));
	return zip.generateAsync({
		type: "blob",
		mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	});
}
//#endregion
//#region src/components/kit/DocumentosDelPaso.tsx
var TONO = {
	pendiente: "neutral",
	borrador: "warning",
	numerado: "primary",
	en_firma: "primary",
	firmado: "success",
	recibido: "success",
	hecho: "success",
	observado: "destructive",
	anulado: "neutral"
};
var CLAVE_ABIERTO = "pdgp-documentos-paso-abierto";
/** Descarga un archivo guardado del expediente. */
async function descargarArchivo(a) {
	const blob = await archivosExpediente.leer(a.id);
	if (!blob) throw new Error("El archivo no está en este navegador.");
	descargarBlob(a.nombre, blob, false);
}
var huellaCorta = (a) => a ? `${a.sha256.slice(0, 12)}…` : "";
function DocumentosDelPaso({ projectId, codigo, paso, plegable = true, titulo, opciones, modo = "todo" }) {
	const catalogo = useCatalogo();
	const items = useItems();
	const { perfil, ctx } = useContextoExpediente(projectId, codigo, paso);
	const [abierto, setAbierto] = useState(modo !== "generar");
	const [otro, setOtro] = useState(false);
	useEffect(() => {
		try {
			if (plegable) {
				const guardado = localStorage.getItem(CLAVE_ABIERTO);
				setAbierto(modo === "generar" ? guardado === "si" : guardado !== "no");
			}
		} catch {}
	}, [plegable, modo]);
	const alternar = () => {
		setAbierto((a) => {
			try {
				localStorage.setItem(CLAVE_ABIERTO, a ? "no" : "si");
			} catch {}
			return !a;
		});
	};
	const delPredio = useMemo(() => items.filter((i) => i.predio === codigo), [items, codigo]);
	const generable = (c) => c.clase === "G" && Boolean(c.tipos?.length || c.producto && opciones?.productos?.[c.id]);
	const filas = catalogo.filter((c) => c.estado === "ACTIVO" && delPaso(c, paso)).map((c) => ({
		c,
		ap: aplicacion(c, perfil)
	})).filter((x) => !(x.ap.aplica === "no" && x.ap.razon?.startsWith("No corresponde a la ruta"))).filter(({ c }) => modo === "generar" ? generable(c) : modo === "subir" ? !generable(c) || itemsDe(delPredio, codigo, c.id).length > 0 : true);
	const libres = modo === "generar" ? [] : delPredio.filter((i) => !i.catalogoId && i.paso === paso);
	const obligatorios = filas.filter((x) => x.c.obligatorio && x.ap.aplica === "si");
	const completos = obligatorios.filter((x) => {
		const i = itemActual(delPredio, codigo, x.c.id);
		return i && (modo === "generar" ? true : COMPLETO.includes(i.estado));
	}).length;
	const conPropio = modo !== "subir" && opciones?.propio && !filas.some(({ c }) => c.tipos?.some((t) => opciones.propio.tipos.includes(t.tipoId)));
	if (modo === "generar" && filas.length === 0 && !conPropio) return null;
	const tituloBloque = titulo ?? (modo === "generar" ? "Documentos que genera este paso" : modo === "subir" ? "Documentos recibidos y firmados" : "Documentos de este paso");
	const articulo = menuDelPredio(perfil.variante).etapas.flatMap((e) => e.pasos).find((p) => p.key === paso)?.articulo;
	return /* @__PURE__ */ jsxs("section", {
		className: "mb-4 rounded-lg border border-border bg-card",
		"aria-label": modo === "subir" ? "Documentos recibidos y firmados" : "Documentos de este paso",
		"data-ayuda": "documentos-paso",
		children: [/* @__PURE__ */ jsxs("div", {
			className: `flex flex-wrap items-center justify-between gap-2 px-4 py-2 ${abierto ? "border-b-2 border-primary" : ""}`,
			children: [/* @__PURE__ */ jsxs("h2", {
				className: "flex items-center gap-2 text-sm font-bold uppercase text-primary-dark",
				children: [
					/* @__PURE__ */ jsx(ListChecks, {
						size: 16,
						"aria-hidden": true
					}),
					tituloBloque,
					articulo && /* @__PURE__ */ jsxs("span", {
						className: "font-normal normal-case text-muted-foreground",
						children: ["· ", articulo]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [obligatorios.length > 0 && /* @__PURE__ */ jsxs(StatusBadge, {
					tono: completos === obligatorios.length ? "success" : "warning",
					children: [
						completos,
						" de ",
						obligatorios.length,
						" ",
						modo === "generar" ? "generados" : "obligatorios"
					]
				}), plegable && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: alternar,
					"aria-expanded": abierto,
					children: [abierto ? /* @__PURE__ */ jsx(ChevronUp, { "aria-hidden": true }) : /* @__PURE__ */ jsx(ChevronDown, { "aria-hidden": true }), abierto ? "Ocultar" : "Mostrar"]
				})]
			})]
		}), abierto && /* @__PURE__ */ jsxs("div", {
			className: "px-4 py-3",
			children: [
				!ctx.expediente && filas.some(({ c }) => !c.tipos?.every((t) => t.tipoId === "acta")) && /* @__PURE__ */ jsxs(Aviso, {
					tipo: "aviso",
					children: [
						"El predio no tiene código de expediente: sus documentos llevan folio provisional (S/E). El folio definitivo llega al asignarlo en",
						" ",
						routeByKey["identificacion-codificacion-predio"] ? /* @__PURE__ */ jsx(Link, {
							to: routeByKey["identificacion-codificacion-predio"],
							params: {
								projectId,
								codigo
							},
							className: "underline",
							children: "1.2 Identificación y codificación"
						}) : "1.2 Identificación y codificación",
						"."
					]
				}),
				modo !== "generar" && filas.length === 0 && libres.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Nada que subir todavía en este paso. Lo que llegue (recibido o firmado) se registra con «Otro documento»."
				}),
				/* @__PURE__ */ jsxs("ul", {
					className: "divide-y divide-border",
					children: [
						filas.map(({ c, ap }) => /* @__PURE__ */ jsx(FilaDocumento, {
							c,
							aplica: ap,
							ctx,
							items: delPredio,
							catalogo,
							perfil,
							projectId,
							codigo,
							opciones,
							modo
						}, c.id)),
						conPropio && /* @__PURE__ */ jsx(FilaPropia, {
							ctx,
							projectId,
							codigo,
							opciones,
							items: libres
						}),
						(modo === "generar" ? [] : opciones?.adicionales ?? []).filter((n) => !libres.some((i) => i.libre?.nombre === n) && !filas.some(({ c }) => mismoDocumento(n, c.nombre))).map((n) => /* @__PURE__ */ jsx(FilaAdicional, {
							nombre: n,
							ctx
						}, n)),
						libres.map((i) => /* @__PURE__ */ jsx(FilaLibre, {
							item: i,
							ctx
						}, i.id))
					]
				}),
				modo !== "generar" && /* @__PURE__ */ jsx("div", {
					className: "mt-3",
					children: /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => setOtro(true),
						children: [/* @__PURE__ */ jsx(Plus, { "aria-hidden": true }), " Otro documento"]
					})
				}),
				otro && /* @__PURE__ */ jsx(ModalRecibido, {
					ctx,
					libre: true,
					onCerrar: () => setOtro(false)
				})
			]
		})]
	});
}
function Linea({ item }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "block text-xs text-muted-foreground",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-mono",
				children: item.folio
			}),
			item.numero && /* @__PURE__ */ jsxs("span", {
				className: "font-mono font-semibold text-foreground",
				children: [" · ", item.numero]
			}),
			item.fechaDocumento && ` · ${fecha(item.fechaDocumento)}`,
			item.emisor && ` · ${item.emisor}`,
			item.resultado && ` · ${item.resultado}`,
			item.vinculado && " · vinculado",
			item.firmas?.length ? ` · firmó ${item.firmas.map((f) => f.firmante).join(", ")}` : item.tipoFirma === "manuscrita_escaneada" ? " · firma escaneada" : "",
			item.enFirma && ` · en firma de ${item.enFirma.firmante}`,
			item.archivo && ` · SHA-256 ${huellaCorta(item.archivo)}`
		]
	});
}
function FilaDocumento({ c, aplica, ctx, items, catalogo, perfil, projectId, codigo, opciones, modo = "todo" }) {
	const [modal, setModal] = useState(null);
	const [error, setError] = useState(null);
	const actual = itemActual(items, codigo, c.id);
	const anteriores = items.filter((i) => i.catalogoId === c.id && i !== actual);
	const estado = actual?.estado ?? "pendiente";
	const faltan = (Boolean(c.tipos?.length) && c.tipos.every((t) => t.tipoId === "acta") ? [] : requisitosDe(c, catalogo, items, codigo, perfil)).filter((r) => r.bloquea && !r.cumple);
	const noAplica = aplica.aplica === "no";
	const referido = c.referenciaA ? catalogo.find((x) => x.id === c.referenciaA) : void 0;
	const refItem = referido ? itemActual(items, codigo, referido.id) : void 0;
	const tipo0 = c.tipos?.[0];
	const accion = (fn) => async () => {
		setError(null);
		try {
			await fn();
		} catch (e) {
			setError(e instanceof Error ? e.message : "No se pudo completar la acción.");
		}
	};
	const genera = modo !== "subir";
	const sube = modo !== "generar";
	const historial = items.filter((i) => i.catalogoId === c.id && (i.generado || i.documentoId)).sort((a, b) => b.registradoEl.localeCompare(a.registradoEl));
	const ultimo = historial.filter((i) => i.estado !== "anulado")[0];
	const [verTodas, setVerTodas] = useState(false);
	const estadoGenerado = !ultimo ? {
		texto: "No generado",
		tono: "neutral"
	} : ultimo.estado === "borrador" ? {
		texto: "Borrador sin código",
		tono: "warning"
	} : ultimo.estado === "firmado" ? {
		texto: "Generado y firmado",
		tono: "success"
	} : {
		texto: "Generado",
		tono: "primary"
	};
	const etiquetas = [modo === "generar" ? /* @__PURE__ */ jsx(StatusBadge, {
		tono: estadoGenerado.tono,
		children: estadoGenerado.texto
	}, "e") : /* @__PURE__ */ jsx(StatusBadge, {
		tono: TONO[referido ? refItem?.estado ?? "pendiente" : estado],
		children: NOMBRE_ESTADO[referido ? refItem?.estado ?? "pendiente" : estado]
	}, "e")];
	if (c.obligatorio && aplica.aplica === "si") etiquetas.push(/* @__PURE__ */ jsx(StatusBadge, { children: "Obligatorio" }, "o"));
	if (aplica.aplica === "condicional") etiquetas.push(/* @__PURE__ */ jsx(StatusBadge, { children: "Si corresponde" }, "c"));
	if (c.propuesto) etiquetas.push(/* @__PURE__ */ jsx(StatusBadge, {
		tono: "warning",
		children: "Propuesto"
	}, "p"));
	const boton = (texto, icono, onClick, deshabilitado = false) => /* @__PURE__ */ jsxs(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick,
		disabled: deshabilitado,
		children: [
			icono,
			" ",
			texto
		]
	});
	const predio = getPredioByCodigo(codigo);
	const proyecto = getProyecto(projectId);
	const armar = async (numero, tipoId) => {
		const datos = {
			NUMERO_DOCUMENTO: numero ?? "BORRADOR SIN NUMERAR",
			CODIGO_DE_PREDIO: codigo,
			CODIGO_DE_EXPEDIENTE: ctx.expediente ?? "",
			PROYECTO: proyecto?.nombre ?? projectId,
			SUJETO_PASIVO: predio?.suj ?? "",
			PARTIDA: predio?.part ?? "",
			AREA_AFECTADA: predio?.area ?? "",
			DOCUMENTO: c.nombre
		};
		const plantilla = await plantillaDe(c.plantillaId, tipoId, c.tipos?.find((t) => t.tipoId === tipoId)?.subtipoId);
		if (plantilla) return armarDesdePlantilla(plantilla, datos);
		const html = htmlDocumentoBase({
			titulo: c.nombre,
			numero,
			asunto: `${c.nombre} · predio ${codigo}`,
			lineas: [
				`Proyecto: ${datos.PROYECTO}`,
				`Código de predio: ${codigo}`,
				ctx.expediente ? `Expediente: ${ctx.expediente}` : "",
				datos.SUJETO_PASIVO ? `Sujeto pasivo: ${datos.SUJETO_PASIVO}` : "",
				datos.PARTIDA ? `Partida registral: ${datos.PARTIDA}` : ""
			]
		});
		return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
	};
	return /* @__PURE__ */ jsxs("li", {
		className: `py-2 ${noAplica ? "opacity-60" : ""}`,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm font-medium",
							children: [
								c.nombre,
								" ",
								/* @__PURE__ */ jsxs("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: [
										"· ",
										NOMBRE_CLASE[c.clase],
										c.emisor && ` · ${c.emisor}`
									]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-1 flex flex-wrap gap-1",
							children: etiquetas
						}),
						modo === "generar" ? historial.length > 0 && /* @__PURE__ */ jsxs("div", {
							className: "mt-2",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Código vigente:",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "font-mono font-semibold text-foreground",
											children: ultimo?.numero ?? (ultimo ? "sin código (borrador)" : "ninguno")
										}),
										historial.length > 1 && ` · ${historial.length} generaciones`
									]
								}),
								/* @__PURE__ */ jsxs("table", {
									className: "mt-1 w-full text-xs",
									children: [
										/* @__PURE__ */ jsxs("caption", {
											className: "sr-only",
											children: ["Últimas generaciones de ", c.nombre]
										}),
										/* @__PURE__ */ jsx("thead", {
											className: "text-left text-muted-foreground",
											children: /* @__PURE__ */ jsxs("tr", { children: [
												/* @__PURE__ */ jsx("th", {
													scope: "col",
													className: "py-0.5 pr-3 font-semibold",
													children: "Código"
												}),
												/* @__PURE__ */ jsx("th", {
													scope: "col",
													className: "py-0.5 pr-3 font-semibold",
													children: "Generado el"
												}),
												/* @__PURE__ */ jsx("th", {
													scope: "col",
													className: "py-0.5 pr-3 font-semibold",
													children: "Por"
												}),
												/* @__PURE__ */ jsx("th", {
													scope: "col",
													className: "py-0.5 pr-3 font-semibold",
													children: "Folio"
												}),
												/* @__PURE__ */ jsx("th", {
													scope: "col",
													className: "py-0.5 pr-3 font-semibold",
													children: "Estado"
												}),
												/* @__PURE__ */ jsx("th", {
													scope: "col",
													className: "py-0.5 font-semibold",
													children: /* @__PURE__ */ jsx("span", {
														className: "sr-only",
														children: "Archivo"
													})
												})
											] })
										}),
										/* @__PURE__ */ jsx("tbody", { children: (verTodas ? historial : historial.slice(0, 3)).map((g) => /* @__PURE__ */ jsxs("tr", {
											className: `border-t border-border ${g.estado === "anulado" ? "text-muted-foreground line-through" : ""}`,
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "py-1 pr-3 font-mono",
													children: g.numero ?? "Borrador"
												}),
												/* @__PURE__ */ jsx("td", {
													className: "py-1 pr-3 whitespace-nowrap",
													children: fechaHora(g.registradoEl)
												}),
												/* @__PURE__ */ jsx("td", {
													className: "py-1 pr-3",
													children: g.registradoPor
												}),
												/* @__PURE__ */ jsx("td", {
													className: "py-1 pr-3 font-mono",
													children: g.folio
												}),
												/* @__PURE__ */ jsxs("td", {
													className: "py-1 pr-3",
													children: [g.estado === "firmado" ? "Firmado" : g.estado === "anulado" ? `Anulado: ${g.anulacion?.motivo ?? ""}` : g.estado === "borrador" ? "Borrador" : "Sin firma", g.vinculado && " · vinculado"]
												}),
												/* @__PURE__ */ jsx("td", {
													className: "py-1",
													children: g.generado && /* @__PURE__ */ jsxs("button", {
														type: "button",
														className: "inline-flex items-center gap-1 underline",
														onClick: () => void descargarArchivo(g.generado).catch(() => void 0),
														children: [/* @__PURE__ */ jsx(Download, {
															size: 12,
															"aria-hidden": true
														}), " Word"]
													})
												})
											]
										}, g.id)) })
									]
								}),
								historial.length > 3 && /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "mt-1 text-xs text-primary-dark underline",
									onClick: () => setVerTodas((v) => !v),
									children: verTodas ? "Ver solo las últimas 3" : `Ver las ${historial.length} generaciones`
								})
							]
						}) : actual && /* @__PURE__ */ jsx(Linea, { item: actual }),
						referido && /* @__PURE__ */ jsxs("span", {
							className: "block text-xs text-muted-foreground",
							children: [
								"Se registra en",
								" ",
								routeByKey[referido.paso] ? /* @__PURE__ */ jsx(Link, {
									to: routeByKey[referido.paso],
									params: {
										projectId,
										codigo
									},
									className: "text-primary-dark underline",
									children: referido.nombre
								}) : referido.nombre,
								refItem && ` · ${refItem.folio}`
							]
						}),
						noAplica && /* @__PURE__ */ jsx("span", {
							className: "block text-xs text-muted-foreground",
							children: aplica.razon
						}),
						aplica.aplica === "condicional" && /* @__PURE__ */ jsx("span", {
							className: "block text-xs text-muted-foreground",
							children: aplica.razon
						}),
						!noAplica && faltan.length > 0 && (!actual || actual.estado === "borrador") && /* @__PURE__ */ jsxs("span", {
							className: "block text-xs text-warning",
							children: [
								"Para darle código falta: ",
								faltan.map((r) => r.nombre).join("; "),
								"."
							]
						}),
						modo !== "generar" && anteriores.map((i) => /* @__PURE__ */ jsxs("span", {
							className: `block text-xs text-muted-foreground ${i.estado === "anulado" ? "line-through" : ""}`,
							children: [
								i.folio,
								" · ",
								NOMBRE_ESTADO[i.estado],
								i.numero && ` · ${i.numero}`,
								i.anulacion && ` · ${i.anulacion.motivo}`
							]
						}, i.id))
					]
				}), !noAplica && !referido && /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-1",
					children: [
						genera && c.clase === "G" && c.tipos && tipo0 && /* @__PURE__ */ jsx(GenerarDocumento, {
							titulo: c.nombre,
							tipos: c.tipos.map((t) => t.tipoId),
							subtipos: Object.fromEntries(c.tipos.filter((t) => t.subtipoId).map((t) => [t.tipoId, t.subtipoId])),
							projectId,
							predios: [codigo],
							paso: ctx.paso,
							pantalla: c.nombre,
							ruta: ctx.ruta,
							asunto: `${c.nombre} · predio ${codigo}`,
							armarArchivo: opciones?.armar?.[c.id] ?? (opciones?.propio && c.tipos.some((t) => opciones.propio.tipos.includes(t.tipoId)) ? opciones.armar?.["*"] : void 0) ?? armar,
							destino: opciones?.destino,
							validar: opciones?.validar,
							nombreArchivo: (t) => `${c.id}_${t}_${codigo}.doc`,
							catalogoId: c.id,
							onGenerado: (r) => opciones?.alGenerar?.(c.id, r),
							renderBoton: (abrir) => boton(ultimo?.estado === "borrador" ? "Numerar" : ultimo ? "Generar de nuevo" : "Generar", /* @__PURE__ */ jsx(FilePlus2, { "aria-hidden": true }), abrir)
						}),
						genera && c.clase === "G" && c.producto && opciones?.productos?.[c.id] && boton(actual ? `${opciones.productos[c.id].texto} de nuevo` : opciones.productos[c.id].texto, /* @__PURE__ */ jsx(FilePlus2, { "aria-hidden": true }), accion(async () => {
							const p = opciones.productos[c.id];
							if (!ctx.expediente) throw new Error("El predio no tiene código de expediente: asígnelo en 1.2 Identificación y codificación.");
							const blob = await p.generar();
							descargarBlob(p.nombreArchivo, blob);
							await registrarRecibido(ctx, {
								catalogoId: c.id,
								numero: "",
								emisor: "Sistema PDGP",
								fechaDocumento: fechaIso(/* @__PURE__ */ new Date()),
								archivo: new File([blob], p.nombreArchivo, { type: blob.type })
							});
						})),
						sube && c.clase === "G" && c.producto && !opciones?.productos?.[c.id] && !actual && boton("Registrar archivo", /* @__PURE__ */ jsx(Upload, { "aria-hidden": true }), () => setModal("recibido")),
						genera && opciones?.extras?.[c.id],
						sube && c.clase === "G" && actual && (actual.estado === "numerado" || actual.estado === "en_firma") && /* @__PURE__ */ jsxs(Fragment$1, { children: [actual.estado === "numerado" && boton("Enviar a firma", /* @__PURE__ */ jsx(Send, { "aria-hidden": true }), () => setModal("enviar")), boton("Subir firmado", /* @__PURE__ */ jsx(FileSignature, { "aria-hidden": true }), () => setModal("firmado"))] }),
						sube && c.clase === "R" && boton(actual ? "Registrar otro" : "Registrar recibido", /* @__PURE__ */ jsx(Upload, { "aria-hidden": true }), () => setModal("recibido")),
						sube && c.clase === "C" && !actual && boton("Adjuntar cargo", /* @__PURE__ */ jsx(Upload, { "aria-hidden": true }), () => setModal("cargo")),
						sube && c.clase === "A" && !actual && boton("Marcar hecho", /* @__PURE__ */ jsx(ListChecks, { "aria-hidden": true }), () => setModal("hecho")),
						modo !== "generar" && actual?.generado && boton("Word", /* @__PURE__ */ jsx(Download, { "aria-hidden": true }), accion(() => descargarArchivo(actual.generado))),
						sube && actual?.archivo && boton("PDF", /* @__PURE__ */ jsx(Download, { "aria-hidden": true }), accion(() => descargarArchivo(actual.archivo))),
						sube && actual && boton("Anular", /* @__PURE__ */ jsx(XCircle, { "aria-hidden": true }), () => setModal("anular"))
					]
				})]
			}),
			error && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: error
			}),
			modal === "recibido" && /* @__PURE__ */ jsx(ModalRecibido, {
				ctx,
				catalogo: c,
				previo: opciones?.recibido?.[c.id],
				onCerrar: () => setModal(null)
			}),
			modal === "cargo" && /* @__PURE__ */ jsx(ModalCargo, {
				ctx,
				c,
				items,
				catalogo,
				onCerrar: () => setModal(null)
			}),
			modal === "hecho" && /* @__PURE__ */ jsx(ModalHecho, {
				ctx,
				c,
				onCerrar: () => setModal(null)
			}),
			modal === "firmado" && actual && /* @__PURE__ */ jsx(ModalFirmado, {
				item: actual,
				c,
				onCerrar: () => setModal(null)
			}),
			modal === "enviar" && actual && /* @__PURE__ */ jsx(MotivoModal, {
				titulo: "Enviar a firma",
				descripcion: `${actual.numero ?? c.nombre}: indique quién firma.`,
				accion: "Enviar a firma",
				onCerrar: () => setModal(null),
				onConfirmar: (firmante) => {
					accion(() => enviarAFirma(actual.id, firmante))();
					setModal(null);
				}
			}),
			modal === "anular" && actual && /* @__PURE__ */ jsx(MotivoModal, {
				titulo: "Anular documento del expediente",
				descripcion: `${actual.folio}: el folio queda en el expediente como anulado.`,
				accion: "Anular",
				destructiva: true,
				onCerrar: () => setModal(null),
				onConfirmar: (motivo) => {
					accion(() => anularItem(actual.id, motivo))();
					setModal(null);
				}
			})
		]
	});
}
/** Documento que genera la pantalla y no tiene ítem en el catálogo del paso. */
function FilaPropia({ ctx, projectId, codigo, opciones, items }) {
	const p = opciones.propio;
	if (items.some((i) => i.libre?.nombre === p.titulo)) return null;
	return /* @__PURE__ */ jsx("li", {
		className: "py-2",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-start justify-between gap-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm font-medium",
					children: [
						p.titulo,
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "text-xs font-normal text-muted-foreground",
							children: "· Genera el sistema"
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-1",
					children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: "neutral",
						children: "Pendiente"
					})
				})]
			}), /* @__PURE__ */ jsx(GenerarDocumento, {
				titulo: p.titulo,
				tipos: p.tipos,
				subtipos: p.subtipos,
				tipoInicial: p.tipoInicial,
				destino: opciones.destino,
				validar: opciones.validar,
				projectId,
				predios: [codigo],
				paso: ctx.paso,
				pantalla: p.titulo,
				ruta: ctx.ruta,
				asunto: p.asunto ?? `${p.titulo} · predio ${codigo}`,
				armarArchivo: opciones.armar?.["*"] ?? (() => new Blob([""])),
				nombreArchivo: p.nombreArchivo ?? ((t) => `${ctx.paso}_${t}_${codigo}.doc`),
				onGenerado: (r) => opciones.alGenerar?.(void 0, r),
				renderBoton: (abrir) => /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: abrir,
					children: [/* @__PURE__ */ jsx(FilePlus2, { "aria-hidden": true }), " Generar"]
				})
			})]
		})
	});
}
/** Adjunto que pide el formulario y aún no está en el expediente. */
function FilaAdicional({ nombre, ctx }) {
	const [abierto, setAbierto] = useState(false);
	return /* @__PURE__ */ jsxs("li", {
		className: "py-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-start justify-between gap-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-sm font-medium",
					children: [
						nombre,
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "text-xs font-normal text-muted-foreground",
							children: "· Adjunto del formulario"
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-1",
					children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: "neutral",
						children: "Pendiente"
					})
				})]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setAbierto(true),
				children: [/* @__PURE__ */ jsx(Upload, { "aria-hidden": true }), " Registrar"]
			})]
		}), abierto && /* @__PURE__ */ jsx(ModalRecibido, {
			ctx,
			libre: true,
			nombreFijo: nombre,
			onCerrar: () => setAbierto(false)
		})]
	});
}
function FilaLibre({ item, ctx }) {
	const [anular, setAnular] = useState(false);
	const [otraVersion, setOtraVersion] = useState(false);
	const [firmar, setFirmar] = useState(false);
	return /* @__PURE__ */ jsxs("li", {
		className: "py-2",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: `text-sm font-medium ${item.estado === "anulado" ? "line-through" : ""}`,
							children: [
								item.libre?.nombre,
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: "· fuera del catálogo"
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-1",
							children: /* @__PURE__ */ jsx(StatusBadge, {
								tono: TONO[item.estado],
								children: NOMBRE_ESTADO[item.estado]
							})
						}),
						/* @__PURE__ */ jsx(Linea, { item })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-1",
					children: [
						item.generado && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => void descargarArchivo(item.generado),
							children: [/* @__PURE__ */ jsx(Download, { "aria-hidden": true }), " Word"]
						}),
						item.archivo && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => void descargarArchivo(item.archivo),
							children: [/* @__PURE__ */ jsx(Download, { "aria-hidden": true }), " Archivo"]
						}),
						(item.estado === "numerado" || item.estado === "en_firma") && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => setFirmar(true),
							children: [/* @__PURE__ */ jsx(FileSignature, { "aria-hidden": true }), " Subir firmado"]
						}),
						item.estado !== "anulado" && item.libre?.clase === "R" && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => setOtraVersion(true),
							children: [/* @__PURE__ */ jsx(Upload, { "aria-hidden": true }), " Registrar otro"]
						}),
						item.estado !== "anulado" && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => setAnular(true),
							children: [/* @__PURE__ */ jsx(XCircle, { "aria-hidden": true }), " Anular"]
						})
					]
				})]
			}),
			firmar && /* @__PURE__ */ jsx(ModalFirmado, {
				item,
				nombre: item.libre?.nombre ?? "",
				onCerrar: () => setFirmar(false)
			}),
			otraVersion && /* @__PURE__ */ jsx(ModalRecibido, {
				ctx,
				libre: true,
				nombreFijo: item.libre?.nombre,
				onCerrar: () => setOtraVersion(false)
			}),
			anular && /* @__PURE__ */ jsx(MotivoModal, {
				titulo: "Anular documento del expediente",
				accion: "Anular",
				destructiva: true,
				onCerrar: () => setAnular(false),
				onConfirmar: (motivo) => {
					anularItem(item.id, motivo);
					setAnular(false);
				}
			})
		]
	});
}
function PieModal({ onCerrar, onConfirmar, texto, procesando }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
		type: "button",
		variant: "outline",
		onClick: onCerrar,
		disabled: procesando,
		children: "Cancelar"
	}), /* @__PURE__ */ jsx(Button, {
		type: "button",
		onClick: onConfirmar,
		disabled: procesando,
		children: procesando ? "Guardando..." : texto
	})] });
}
function useEnvio(onCerrar) {
	const [error, setError] = useState(null);
	const [procesando, setProcesando] = useState(false);
	const enviar = async (fn) => {
		setError(null);
		setProcesando(true);
		try {
			await fn();
			onCerrar();
		} catch (e) {
			setError(e instanceof Error ? e.message : "No se pudo guardar.");
		} finally {
			setProcesando(false);
		}
	};
	return {
		error,
		procesando,
		enviar
	};
}
function CampoArchivo({ onArchivo, accept }) {
	return /* @__PURE__ */ jsx(FormField, {
		etiqueta: "Archivo",
		obligatorio: true,
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			type: "file",
			accept,
			className: `${controlClase} h-auto py-1.5`,
			onChange: (e) => onArchivo(e.target.files?.[0] ?? null)
		})
	});
}
/** Documento recibido (R), producto de otro módulo (G sin número) u "Otro documento" fuera del catálogo. */
function ModalRecibido({ ctx, catalogo, libre, previo, nombreFijo, onCerrar }) {
	const { error, procesando, enviar } = useEnvio(onCerrar);
	const [nombre, setNombre] = useState(nombreFijo ?? "");
	const [clase, setClase] = useState("R");
	const [numero, setNumero] = useState(previo?.numero ?? "");
	const [emisor, setEmisor] = useState(catalogo?.emisor ?? (catalogo?.producto ? "Sistema PDGP" : ""));
	const [fechaDoc, setFechaDoc] = useState(previo?.fecha || fechaIso(/* @__PURE__ */ new Date()));
	const [archivo, setArchivo] = useState(null);
	const [justificacion, setJustificacion] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		titulo: nombreFijo ? `Registrar ${nombreFijo}` : libre ? "Otro documento" : catalogo?.producto ? `Registrar ${catalogo.nombre}` : `Registrar ${catalogo?.nombre}`,
		descripcion: libre ? "Un documento que el catálogo no previó. Queda en el expediente con folio y en M8 → Fuera del catálogo." : catalogo?.vigenciaMeses ? `Antigüedad máxima: ${catalogo.vigenciaMeses} meses desde su expedición.` : void 0,
		pie: /* @__PURE__ */ jsx(PieModal, {
			onCerrar,
			procesando,
			texto: "Registrar",
			onConfirmar: () => void enviar(() => {
				if (!archivo) throw new Error("Adjunte el archivo.");
				if (libre && !nombre.trim()) throw new Error("Indique qué documento es.");
				return registrarRecibido(ctx, {
					catalogoId: catalogo?.id,
					libre: libre ? {
						nombre: nombre.trim(),
						clase,
						emisor: emisor.trim() || void 0
					} : void 0,
					numero,
					emisor,
					fechaDocumento: fechaDoc,
					archivo,
					justificacion
				});
			})
		}),
		children: [error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: error
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [
			libre && !nombreFijo && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Documento",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: nombre,
					onChange: (e) => setNombre(e.target.value)
				})
			}), /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Origen",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: clase,
					onChange: (e) => setClase(e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "R",
						children: "Recibido de un tercero"
					}), /* @__PURE__ */ jsx("option", {
						value: "G",
						children: "Emitido por el MTC"
					})]
				})
			})] }),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: catalogo?.producto ? "Referencia" : "Número del documento",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: numero,
					onChange: (e) => setNumero(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Emisor",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: emisor,
					onChange: (e) => setEmisor(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha del documento",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: fechaDoc,
					onChange: (e) => setFechaDoc(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(CampoArchivo, { onArchivo: setArchivo }),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observación",
				ayuda: "Si es copia escaneada o le falta algo, dígalo aquí.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: justificacion,
					onChange: (e) => setJustificacion(e.target.value)
				})
			})
		] })]
	});
}
function ModalCargo({ ctx, c, items, catalogo, onCerrar }) {
	const { error, procesando, enviar } = useEnvio(onCerrar);
	const candidatos = itemsDe(items, ctx.predio, c.respaldaA ?? "");
	const [respalda, setRespalda] = useState(candidatos[0]?.id ?? "");
	const [numero, setNumero] = useState("");
	const [fechaDoc, setFechaDoc] = useState(fechaIso(/* @__PURE__ */ new Date()));
	const [archivo, setArchivo] = useState(null);
	const nombreRespalda = catalogo.find((x) => x.id === c.respaldaA)?.nombre ?? "el documento";
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		titulo: c.nombre,
		descripcion: `Respalda a: ${nombreRespalda}.`,
		pie: /* @__PURE__ */ jsx(PieModal, {
			onCerrar,
			procesando,
			texto: "Adjuntar cargo",
			onConfirmar: () => void enviar(() => {
				if (!archivo) throw new Error("Adjunte el cargo.");
				return adjuntarCargo(ctx, {
					catalogoId: c.id,
					respaldaA: respalda,
					fechaDocumento: fechaDoc,
					numero,
					archivo
				});
			})
		}),
		children: [error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: error
		}), candidatos.length === 0 ? /* @__PURE__ */ jsxs(Aviso, {
			tipo: "aviso",
			children: [
				"Primero registre ",
				nombreRespalda,
				": el cargo no puede quedar suelto."
			]
		}) : /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Documento que respalda",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: respalda,
					onChange: (e) => setRespalda(e.target.value),
					children: candidatos.map((i) => /* @__PURE__ */ jsxs("option", {
						value: i.id,
						children: [
							i.folio,
							" · ",
							i.numero ?? NOMBRE_ESTADO[i.estado]
						]
					}, i.id))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Hoja de ruta o número de cargo",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: numero,
					onChange: (e) => setNumero(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de recepción",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: fechaDoc,
					onChange: (e) => setFechaDoc(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(CampoArchivo, { onArchivo: setArchivo })
		] })]
	});
}
function ModalHecho({ ctx, c, onCerrar }) {
	const { error, procesando, enviar } = useEnvio(onCerrar);
	const [fechaHecho, setFechaHecho] = useState(fechaIso(/* @__PURE__ */ new Date()));
	const [resultado, setResultado] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		titulo: c.nombre,
		descripcion: "Actividad: se registra la fecha y el resultado, sin documento.",
		pie: /* @__PURE__ */ jsx(PieModal, {
			onCerrar,
			procesando,
			texto: "Registrar",
			onConfirmar: () => void enviar(() => marcarHecho(ctx, {
				catalogoId: c.id,
				fecha: fechaHecho,
				resultado
			}))
		}),
		children: [error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: error
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Fecha",
			obligatorio: true,
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				type: "date",
				className: controlClase,
				value: fechaHecho,
				onChange: (e) => setFechaHecho(e.target.value)
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Resultado",
			obligatorio: Boolean(c.opciones),
			children: (id) => c.opciones ? /* @__PURE__ */ jsxs("select", {
				id,
				className: controlClase,
				value: resultado,
				onChange: (e) => setResultado(e.target.value),
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: "Elija"
				}), c.opciones.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))]
			}) : /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				value: resultado,
				onChange: (e) => setResultado(e.target.value)
			})
		})] })]
	});
}
function ModalFirmado({ item, c, nombre, onCerrar }) {
	const { error, procesando, enviar } = useEnvio(onCerrar);
	const [archivo, setArchivo] = useState(null);
	const [justificacion, setJustificacion] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		titulo: `Subir firmado · ${item.numero ?? c?.nombre ?? nombre}`,
		descripcion: "PDF firmado digitalmente. El sistema lee las firmas del archivo y guarda su huella SHA-256.",
		pie: /* @__PURE__ */ jsx(PieModal, {
			onCerrar,
			procesando,
			texto: "Subir firmado",
			onConfirmar: () => void enviar(() => {
				if (!archivo) throw new Error("Adjunte el PDF firmado.");
				return subirFirmado(item.id, archivo, { justificacion });
			})
		}),
		children: [
			error && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: error
			}),
			c?.firmasEsperadas && c.firmasEsperadas > 1 && /* @__PURE__ */ jsxs(Aviso, {
				tipo: "info",
				children: [
					"Este documento lleva ",
					c.firmasEsperadas,
					" firmas."
				]
			}),
			/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(CampoArchivo, {
				onArchivo: setArchivo,
				accept: ".pdf,application/pdf"
			}), /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Si no tiene firma digital",
				ayuda: "Solo si se firmó a mano y se escaneó: explique por qué no se firmó digitalmente.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: justificacion,
					onChange: (e) => setJustificacion(e.target.value)
				})
			})] })
		]
	});
}
//#endregion
//#region src/components/kit/EtapaPredio.tsx
/** Insignia de la etapa actual del predio. El detalle (lo que registra el padrón) va en el tooltip nativo. */
function EtapaBadge({ etapa, conPaso = false }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex flex-col items-start gap-0.5",
		title: etapa.hito,
		children: [/* @__PURE__ */ jsxs(StatusBadge, {
			tono: "primary",
			children: [
				"Etapa ",
				etapa.etapa,
				" · ",
				etapa.corto
			]
		}), conPaso && /* @__PURE__ */ jsx("span", {
			className: "text-xs text-muted-foreground",
			children: etapa.nombrePaso
		})]
	});
}
/** Plazo legal en curso del predio; sin fecha de inicio en el padrón, lo dice en lugar de inventar un semáforo. */
function PlazoPredioBadge({ plazo, vacio = "Sin fecha de inicio" }) {
	if (!plazo) return /* @__PURE__ */ jsx("span", {
		className: "text-xs text-muted-foreground",
		children: vacio
	});
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex",
		title: `${plazo.nombre} (art. ${plazo.articulo}), desde la ${plazo.desde}`,
		children: /* @__PURE__ */ jsx(PlazoBadge, {
			vence: plazo.vence,
			etiqueta: `Art. ${plazo.articulo}`
		})
	});
}
//#endregion
//#region src/lib/prediosDerivados.ts
var CLAVE = "pdgp-predios-derivados";
var VACIO = [];
var lista = null;
var oyentes = /* @__PURE__ */ new Set();
function cargar() {
	if (lista) return lista;
	try {
		lista = JSON.parse(localStorage.getItem(CLAVE) ?? "[]");
	} catch {
		lista = [];
	}
	return lista;
}
function usePrediosDerivados() {
	return useSyncExternalStore((f) => {
		oyentes.add(f);
		return () => {
			oyentes.delete(f);
		};
	}, cargar, () => VACIO);
}
function crearPredioDerivado(p) {
	const actual = cargar();
	if (actual.some((x) => x.codigo === p.codigo)) return;
	lista = [{
		...p,
		creadoEl: (/* @__PURE__ */ new Date()).toISOString()
	}, ...actual];
	try {
		localStorage.setItem(CLAVE, JSON.stringify(lista));
	} catch {}
	oyentes.forEach((f) => f());
	registrarEnBitacora({
		modulo: 11,
		entidad: "expediente_individual",
		registro: p.codigo,
		accion: "crear",
		detalle: `Expediente individual de ${p.comunero} (DNI ${p.dni}) desde el predio comunal ${p.padre} · ${p.comunidad}`
	});
}
function derivadoDe(lista, codigo) {
	return lista.find((d) => d.codigo === codigo);
}
//#endregion
//#region src/lib/recorrido.ts
/**
* Memoria de navegación de la sesión: último proyecto abierto, predios recientes y el orden del
* listado del que se vino (para "anterior / siguiente" en el expediente).
* Vive en sessionStorage: se borra al cerrar la pestaña o la sesión. Sin almacenamiento, no hay memoria
* y la navegación sigue funcionando.
*/
var CLAVE_PROYECTO = "pdgp-proyecto";
var claveRecientes = (projectId) => `pdgp-recientes-${projectId}`;
var claveRecorrido = (projectId) => `pdgp-recorrido-${projectId}`;
var TOPE_RECIENTES = 5;
function leer(clave, porDefecto) {
	try {
		return JSON.parse(sessionStorage.getItem(clave) ?? "null") ?? porDefecto;
	} catch {
		return porDefecto;
	}
}
function escribir(clave, valor) {
	try {
		sessionStorage.setItem(clave, JSON.stringify(valor));
	} catch {}
}
function recordarProyecto(projectId) {
	escribir(CLAVE_PROYECTO, projectId);
}
function ultimoProyecto() {
	return leer(CLAVE_PROYECTO, void 0);
}
function registrarReciente(projectId, codigo) {
	escribir(claveRecientes(projectId), [codigo, ...recientes(projectId).filter((c) => c !== codigo)].slice(0, TOPE_RECIENTES));
}
function recientes(projectId) {
	return leer(claveRecientes(projectId), []);
}
function guardarRecorrido(projectId, recorrido) {
	escribir(claveRecorrido(projectId), recorrido);
}
function leerRecorrido(projectId) {
	return leer(claveRecorrido(projectId), null);
}
//#endregion
//#region src/components/kit/PredioEncabezado.tsx
function etiquetaProyecto(proyecto, projectId) {
	if (!proyecto) return projectId;
	return `${proyecto.tipo === "Aeroportuarios" ? "Aeropuerto de " : ""}${proyecto.nombre}`;
}
/**
* Posición del predio en el recorrido: el orden del listado del que se vino o, si se llegó por otro
* camino, el del padrón. Además deja el predio en "recientes". Solo en el navegador (sessionStorage).
*/
function useVecinos(projectId, codigo) {
	const [vecinos, setVecinos] = useState(null);
	useEffect(() => {
		registrarReciente(projectId, codigo);
		const recorrido = leerRecorrido(projectId);
		const desdeListado = recorrido?.codigos.includes(codigo) ?? false;
		const codigos = desdeListado ? recorrido.codigos : prediosDelProyecto(projectId).map((p) => p.codigo);
		const i = codigos.indexOf(codigo);
		setVecinos(i < 0 ? null : {
			anterior: codigos[i - 1],
			siguiente: codigos[i + 1],
			posicion: i + 1,
			total: codigos.length,
			origen: desdeListado ? recorrido.origen : "padrón del proyecto"
		});
	}, [projectId, codigo]);
	return vecinos;
}
/**
* Cabecera de toda pantalla de predio, en dos franjas:
* arriba, el predio (código, sujeto, partida, etapa, plazo, anterior y siguiente, accesos);
* abajo, la pantalla (ícono, título del paso, descripción y sus acciones).
* Es la misma en todos los pasos del expediente: cambia el título, no el contexto.
*/
function PredioEncabezado({ projectId, codigo, titulo, icono: Icono, descripcion, acciones, documentos, sinDocumentos }) {
	const navigate = useNavigate();
	const rutaActual = useRutaActual();
	const proyecto = getProyecto(projectId);
	const predio = predioDelProyecto(codigo);
	const derivado = derivadoDe(usePrediosDerivados(), codigo);
	const vecinos = useVecinos(projectId, codigo);
	const perfil = usePerfilPredio(projectId, codigo);
	const clavePaso = Object.keys(routeByKey).find((k) => routeByKey[k] === rutaActual);
	const subtitulo = descripcion ?? (clavePaso ? rotulosDePaso(clavePaso, varianteDe(perfil))?.menu.replace(/\s*–\s*/g, " · ") : void 0);
	const enMonitoreo = rutaActual.endsWith("/monitoreo");
	const irA = (otro) => {
		if (otro) navigate({
			to: rutaActual,
			params: {
				projectId,
				codigo: otro
			}
		});
	};
	const datos = predio ? [
		predio.sujetos.length > 1 ? predio.sujetos.join(", ") : predio.sujeto,
		predio.partida && `Partida ${predio.partida}`,
		predio.modalidad,
		predio.area && `${numero(Number(predio.area.replace(/,/g, "")), 2)} m²`
	].filter(Boolean) : derivado ? [
		`Comunero ${derivado.comunero} · DNI ${derivado.dni}`,
		`Expediente individual del predio comunal ${derivado.padre}`,
		derivado.comunidad
	] : ["Este código no figura en el padrón del proyecto."];
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-4 overflow-hidden rounded-lg border border-border bg-card",
		"data-ayuda": "encabezado",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "border-b border-border bg-background/60 px-4 py-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsxs("nav", {
					"aria-label": "Ubicación",
					className: "flex min-w-0 flex-wrap items-center gap-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/proyectos",
							className: "hover:text-primary-dark hover:underline",
							children: "Proyectos"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": true,
							children: "/"
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/proyectos/$projectId",
							params: { projectId },
							className: "hover:text-primary-dark hover:underline",
							children: etiquetaProyecto(proyecto, projectId)
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": true,
							children: "/"
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/proyectos/$projectId/predios",
							params: { projectId },
							className: "hover:text-primary-dark hover:underline",
							children: "Predios"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": true,
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "truncate",
							children: predio?.cod ?? codigo
						})
					]
				}), vecinos && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1 text-xs text-muted-foreground",
					"data-print-hidden": true,
					children: [
						/* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Predio anterior",
							icono: ChevronLeft,
							onClick: () => irA(vecinos.anterior),
							deshabilitado: !vecinos.anterior
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "px-1 tabular-nums",
							title: `Orden del ${vecinos.origen}`,
							children: [
								vecinos.posicion,
								" de ",
								vecinos.total
							]
						}),
						/* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Predio siguiente",
							icono: ChevronRight,
							onClick: () => irA(vecinos.siguiente),
							deshabilitado: !vecinos.siguiente
						})
					]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "break-all font-mono text-base font-semibold text-foreground",
							children: predio?.cod ?? codigo
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: datos.join(" · ")
						}),
						predio?.registro === "PRELIMINAR" && /* @__PURE__ */ jsxs(StatusBadge, {
							tono: "warning",
							children: [
								"Preliminar · ",
								NOMBRE_ORIGEN[predio.origen],
								" · sin código oficial"
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-2 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: "Perfil legal:"
								}),
								/* @__PURE__ */ jsx(StatusBadge, {
									tono: perfil.ruta === "PENDIENTE" ? "warning" : "neutral",
									children: textoPerfil(perfil)
								}),
								Object.values(perfil.origen).every((o) => o === "inferido") && /* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: "(inferido del padrón)"
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/proyectos/$projectId/predios/$codigo/modalidad-adquisicion",
									params: {
										projectId,
										codigo
									},
									className: "text-xs font-medium text-primary-dark underline underline-offset-2",
									"data-print-hidden": true,
									children: "Cambiar"
								})
							]
						}),
						predio && /* @__PURE__ */ jsxs("div", {
							className: "mt-2 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: "Etapa actual del predio:"
								}),
								/* @__PURE__ */ jsx(EtapaBadge, { etapa: predio.etapa }),
								/* @__PURE__ */ jsx(PlazoPredioBadge, {
									plazo: predio.etapa.plazo,
									vacio: "Sin plazo legal con fecha registrada en el padrón"
								})
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "ml-auto flex flex-wrap items-center gap-2",
					"data-print-hidden": true,
					children: [
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/proyectos/$projectId/mapa",
								params: { projectId },
								search: { predio: codigo },
								children: [/* @__PURE__ */ jsx(MapPinned, {}), " Ver en el mapa"]
							})
						}),
						!enMonitoreo && /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/proyectos/$projectId/predios/$codigo/monitoreo",
								params: {
									projectId,
									codigo
								},
								children: [/* @__PURE__ */ jsx(ChartGantt, {}), " Avance y plazos"]
							})
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ jsx(Printer, {}), " Imprimir"]
						}),
						/* @__PURE__ */ jsx(BotonAyuda, {})
					]
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ jsx(Icono, {
					size: 22,
					className: "shrink-0 text-primary",
					"aria-hidden": true
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold uppercase text-primary-dark sm:truncate",
						children: titulo
					}), subtitulo && /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: subtitulo
					})]
				})]
			}), acciones && /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap items-center gap-2",
				children: acciones
			})]
		})]
	}), clavePaso && !sinDocumentos && /* @__PURE__ */ jsx(TrasElStepper, { children: /* @__PURE__ */ jsx(DocumentosDelPaso, {
		projectId,
		codigo,
		paso: clavePaso,
		opciones: documentos,
		modo: "generar"
	}) })] });
}
/**
* Coloca el panel justo después del bloque de la etapa (el elemento `[data-stepper]` o la sección que lo
* contiene), pedido del usuario: título → etapa → documentos que genera el paso → formulario. Si la
* pantalla no tiene stepper, queda bajo la cabecera.
*/
function TrasElStepper({ children }) {
	const [destino, setDestino] = useState(null);
	useEffect(() => {
		const main = document.querySelector("main");
		const buscar = () => {
			const st = main?.querySelector("[data-stepper]");
			const bloque = st ? st.closest("section") ?? st : null;
			if (!bloque) {
				setDestino(null);
				return;
			}
			let cont = bloque.nextElementSibling;
			if (!cont?.hasAttribute("data-documentos-paso")) {
				cont = document.createElement("div");
				cont.setAttribute("data-documentos-paso", "");
				bloque.after(cont);
			}
			setDestino((actual) => actual === cont ? actual : cont);
		};
		buscar();
		if (!main) return;
		const obs = new MutationObserver(buscar);
		obs.observe(main, {
			childList: true,
			subtree: true
		});
		return () => obs.disconnect();
	}, []);
	return destino ? createPortal(children, destino) : /* @__PURE__ */ jsx(Fragment$1, { children });
}
//#endregion
export { estadoLey as $, DialogTitle as A, cerrarAyuda as At, asignarRuta as B, numerarPaginasPdf as C, recordarModulo as Ct, Dialog as D, BotonIcono as Dt, Modal as E, useRutaActual as Et, NOMBRE_ACTIVIDAD as F, rutaRapida as G, perfilRapido as H, NOMBRE_CASO as I, usePerfilPredio as J, textoPerfil as K, NOMBRE_CONDICION as L, CargaDocumento as M, terminarTutorial as Mt, ListaDocumentos as N, useEstadoAyuda as Nt, DialogContent as O, BotonAyuda as Ot, useRegistroExpediente as P, declaratoriaDelProyecto as Q, NOMBRE_RUTA as R, exportarPdf as S, moduloActual as St, Confirmar as T, useModuloRecordado as Tt, puedeCambiarRuta as U, corregirPerfil as V, puedeRevertirExpropiacion as W, GORES_CON_FUNCIONES as X, varianteDe as Y, NOMBRE_MODALIDAD_OBRA as Z, archivosDocumentos as _, registrarCodigo as _t, recordarProyecto as a, guardarBloque as at, dibujarCabeceraPdf as b, usadoPorOtro as bt, derivadoDe as c, liquidacion as ct, PlazoPredioBadge as d, asignarCodigo as dt, guardarNormasProyecto as et, descargarArchivo as f, codigoAsignado as ft, TEXTO_BORRADOR as g, partesDeCodigo as gt, GenerarDocumento as h, infraestructuraDe as ht, recientes as i, bloqueDelPredio as it, AccionDocumento as j, iniciarTutorial as jt, DialogDescription as k, alternarAyuda as kt, usePrediosDerivados as l, useBloques as lt, MotivoModal as m, expedienteValido as mt, etiquetaProyecto as n, useNormasProyecto as nt, ultimoProyecto as o, idBloque as ot, leerPlantillas as p, disponibles as pt, useCorreccionesPerfil as q, guardarRecorrido as r, UIT as rt, crearPredioDerivado as s, incentivoBloque as st, PredioEncabezado as t, idNorma as tt, EtapaBadge as u, armarCodigoPredio as ut, htmlDocumentoBase as v, siguienteCorrelativoPredio as vt, registrarExportacion as w, rutaActiva as wt, exportarExcel as x, useCodigos as xt, descargarBlob as y, siguienteExpediente as yt, REGLA_CASO as z };
