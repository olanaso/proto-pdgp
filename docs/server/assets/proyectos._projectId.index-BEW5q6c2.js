import { d as semaforo, f as vencimiento, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/lib/notificaciones.ts
var d = (iso) => /* @__PURE__ */ new Date(`${iso}T00:00:00`);
function leer(clave) {
	try {
		return JSON.parse(localStorage.getItem(clave) ?? "null");
	} catch {
		return null;
	}
}
function clavesCon(prefijo) {
	const out = [];
	try {
		for (let i = 0; i < localStorage.length; i++) {
			const k = localStorage.key(i);
			if (k?.startsWith(prefijo)) out.push(k);
		}
	} catch {}
	return out;
}
var PROYECTO = "jauja";
function alertasDePlazos(hoy = /* @__PURE__ */ new Date()) {
	const alertas = [];
	const agregar = (a) => alertas.push({
		...a,
		id: `${a.modulo}-${a.registro}-${a.texto}`,
		estado: semaforo(a.vence, hoy)
	});
	for (const k of clavesCon("pdgp-expropiacion-")) {
		const e = leer(k);
		const codigo = k.replace("pdgp-expropiacion-", "");
		if (!e) continue;
		const ruta = `/proyectos/${PROYECTO}/predios/${codigo}/expropiacion`;
		if (e.fechaRechazo && !e.normaFecha) agregar({
			modulo: 16,
			registro: codigo,
			texto: "Norma de ejecución de la expropiación (art. 27)",
			vence: vencimiento(d(e.fechaRechazo), plazo("norma_expropiacion")),
			ruta
		});
		if (e.normaFecha && !e.consignacionFecha) agregar({
			modulo: 16,
			registro: codigo,
			texto: "Consignación (art. 28.3)",
			vence: vencimiento(d(e.normaFecha), plazo("consignacion")),
			ruta
		});
		if (e.notificacionFecha && !e.remisionSunarpFecha) agregar({
			modulo: 16,
			registro: codigo,
			texto: "Remisión a SUNARP (art. 30)",
			vence: vencimiento(d(e.notificacionFecha), plazo("remision_sunarp_expropiacion")),
			ruta
		});
	}
	for (const k of clavesCon("pdgp-mejoras-")) {
		const e = leer(k);
		const codigo = k.replace("pdgp-mejoras-", "");
		if (!e || !e.aviso2Fecha || e.pagoFecha) continue;
		agregar({
			modulo: 17,
			registro: codigo,
			texto: "Cierre del plazo de oposición a las mejoras (DCF 3.ª)",
			vence: vencimiento(d(e.aviso2Fecha), plazo("mejoras_oposicion")),
			ruta: `/proyectos/${PROYECTO}/predios/${codigo}/reconocimiento-mejoras`
		});
	}
	for (const i of leer("pdgp-interferencias") ?? []) {
		const ruta = "/interferencias";
		if (i.estado === "Comunicada" && i.fechaComunicacion) agregar({
			modulo: 23,
			registro: i.codigo,
			texto: "Presupuesto y cronograma de la empresa (art. 43.2)",
			vence: vencimiento(d(i.fechaComunicacion), plazo("interferencias_presupuesto")),
			ruta
		});
		if (i.estado === "Observada" && i.fechaObservacion) agregar({
			modulo: 23,
			registro: i.codigo,
			texto: "Levantamiento de observaciones (art. 43.3)",
			vence: vencimiento(d(i.fechaObservacion), plazo("interferencias_observaciones")),
			ruta
		});
		if (i.estado === "Aprobada" && i.fechaAprobacion) agregar({
			modulo: 23,
			registro: i.codigo,
			texto: "Inicio de los trabajos (art. 43.3)",
			vence: vencimiento(d(i.fechaAprobacion), plazo("interferencias_inicio")),
			ruta
		});
	}
	const orden = {
		rojo: 0,
		ambar: 1,
		verde: 2
	};
	return alertas.sort((a, b) => orden[a.estado] - orden[b.estado] || a.vence.getTime() - b.vence.getTime());
}
//#endregion
//#region src/routes/proyectos.$projectId.index.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.index-rMocJFay.js");
var Route = createFileRoute("/proyectos/$projectId/")({
	head: () => ({ meta: [{ title: "Resumen del proyecto · PDGP" }, {
		name: "description",
		content: "Estado del proyecto: predios por etapa, plazos por atender y acceso directo a cada expediente."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Contornos del padrón proyectados a un SVG de 400 px de ancho. Se calcula una vez. */
//#endregion
export { alertasDePlazos as n, Route as t };
