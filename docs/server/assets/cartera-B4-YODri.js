import { a as leerHitos, i as estadoPlazo, m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { D as etapaDeFila, O as buildPredioSummary, b as leerRegistrados, d as predioRows, v as filaDeRegistro } from "./prediosProyecto-D1ASzaVD.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { m as proyectosAsignados } from "./campo-Dn2b-x9H.js";
import { H as perfilRapido, q as useCorreccionesPerfil } from "./PredioEncabezado-FhqZ2Jv6.js";
import { useEffect, useMemo, useState } from "react";
//#region src/lib/cartera.ts
/** Orden de los hitos del padrón: sirve para decir «antes de la resolución». */
var ORDEN_HITO = [
	"Identificado / individualizado",
	"Identificación y codificación",
	"Diagnóstico técnico-legal",
	"Expediente técnico-legal",
	"Tasación",
	"Resolución de adquisición",
	"Devengado, pago o consignación",
	"Entrega de posesión",
	"Inscripción registral en trámite",
	"Inscripción registral concluida"
];
var antesDe = (f, hito) => ORDEN_HITO.indexOf(f.hito) < ORDEN_HITO.indexOf(hito);
/** Última versión guardada de un historial (`registrarCambio`), o undefined. */
function ultimoRegistro(clave) {
	try {
		return JSON.parse(localStorage.getItem(`pdgp-historial-${clave}`) ?? "[]")[0]?.registro;
	} catch {
		return;
	}
}
/** Resultado registrado en «Respuesta del sujeto pasivo» (última versión), o PENDIENTE. */
function resultadoRespuesta(codigo) {
	try {
		return JSON.parse(localStorage.getItem(`pdgp-historial-respuesta-sujeto-pasivo-${codigo}`) ?? "[]")[0]?.registro.form?.resultadoRespuesta || "PENDIENTE";
	} catch {
		return "PENDIENTE";
	}
}
/** La carta de intención ya se notificó y no hay aceptación registrada: el predio puede ir a expropiación. */
function respuestaPendiente(codigo, hoy = /* @__PURE__ */ new Date()) {
	const plazo = estadoPlazo(leerHitos(codigo), "respuesta_sujeto_pasivo", hoy);
	if (!plazo) return void 0;
	const resultado = resultadoRespuesta(codigo);
	if (resultado === "ACEPTA") return void 0;
	return {
		estado: resultado === "NO ACEPTA" || resultado === "NO RESPONDE" ? "rechazo" : plazo.restantes < 0 ? "vencida" : "esperando",
		resultado,
		restantes: plazo.restantes,
		vence: plazo.vence
	};
}
function filasDe(p) {
	const filas = [...leerRegistrados(p.id).map(filaDeRegistro), ...p.id === "jauja" ? predioRows : []].filter((r) => r.codigo && !r.codigo.startsWith("SIN-CODIGO"));
	const porCodigo = /* @__PURE__ */ new Map();
	for (const r of filas) porCodigo.set(r.codigo, [...porCodigo.get(r.codigo) ?? [], r]);
	return [...porCodigo.values()].map((grupo) => {
		const r = grupo[0];
		const p0 = etapaDeFila(r).plazo;
		const sujetos = [...new Set(grupo.map((g) => g.suj).filter(Boolean))];
		return {
			...r,
			suj: sujetos.length > 1 ? `${sujetos[0]} y ${sujetos.length - 1} más` : sujetos[0] ?? "",
			proyectoId: p.id,
			proyectoNombre: p.nombre,
			ruta: perfilRapido(r.codigo).ruta,
			hito: buildPredioSummary(r).stage,
			plazo: p0 ? `${p0.nombre}: ${p0.restantes < 0 ? "venció" : "vence"} el ${fecha(p0.vence)}${p0.restantes < 0 ? "" : ` (${p0.restantes} d.h.)`}` : ""
		};
	});
}
/**
* Cartera de un módulo para el usuario: sus proyectos (o todos, si no figura en ninguna brigada) y las
* filas que el módulo admite. Se vuelve a armar cuando alguien corrige la ruta de un predio.
*/
function useCartera(nombreUsuario, admite) {
	const correcciones = useCorreccionesPerfil();
	const rol = useRol();
	const [base, setBase] = useState(null);
	useEffect(() => {
		const a = proyectosAsignados(nombreUsuario, rol);
		setBase({
			proyectos: a.lista,
			sinBrigada: a.sinBrigada
		});
	}, [nombreUsuario, rol]);
	const filas = useMemo(() => base ? base.proyectos.flatMap(filasDe).flatMap((f) => {
		const r = admite(f);
		return r ? [r] : [];
	}) : [], [base, correcciones]);
	/** Proyectos asignados que tienen predios en esta cartera, con su cantidad (para el filtro). */
	const opcionesProyecto = useMemo(() => {
		const cuenta = /* @__PURE__ */ new Map();
		filas.forEach((f) => cuenta.set(f.proyectoId, (cuenta.get(f.proyectoId) ?? 0) + 1));
		return (base?.proyectos ?? []).filter((p) => cuenta.has(p.id)).map((p) => ({
			valor: p.id,
			texto: `${p.nombre} (${cuenta.get(p.id)})`
		}));
	}, [base, filas]);
	return {
		cargando: base === null,
		sinBrigada: base?.sinBrigada ?? false,
		proyectos: base?.proyectos.length ?? 0,
		filas,
		opcionesProyecto
	};
}
//#endregion
export { useCartera as i, respuestaPendiente as n, ultimoRegistro as r, antesDe as t };
