import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { i as DEFAULT_CONFIGS, n as ACQUISITION_MILESTONES_UPDATED_EVENT, r as AcquisitionMilestonesConfig, t as ACQUISITION_MILESTONES_STORAGE_KEY } from "./AcquisitionMilestonesConfig-D4Pj8OgS.js";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { History, Settings2 } from "lucide-react";
//#region src/routes/configuracion.hitos-plazos.tsx?tsr-split=component
var CLAVE = "hitos-plazos";
var BITACORA = {
	modulo: 8,
	entidad: "hitos_plazos"
};
var ETIQUETAS = {
	family: "Familia",
	description: "Descripción",
	legalLimitDays: "Plazo legal (días)",
	milestones: "Hito",
	category: "Etapa",
	days: "Plazo (días)",
	warningDay: "Día de advertencia",
	criticalDay: "Día crítico",
	repeatEvery: "Repetir cada (días)",
	weight: "Peso de avance",
	responsible: "Responsable",
	evidence: "Evidencia",
	channel: "Canal de alerta",
	active: "Activo"
};
var aLegible = (c) => c.map(({ name, milestones, color: _color, ...p }) => ({
	...p,
	nombre: name,
	milestones: milestones.map(({ name: n, ...m }) => ({
		...m,
		nombre: n
	}))
}));
var desdeLegible = (r, original) => r.map(({ nombre, milestones, ...p }) => ({
	...p,
	name: nombre,
	color: original.find((o) => o.id === p.id)?.color ?? "",
	milestones: milestones.map(({ nombre: n, ...m }) => ({
		...m,
		name: n
	}))
}));
/** Lo que el sistema usa hoy: lo guardado o, si nunca se guardó, los valores por defecto. */
function vigente() {
	try {
		const crudo = localStorage.getItem(ACQUISITION_MILESTONES_STORAGE_KEY);
		const p = crudo ? JSON.parse(crudo) : null;
		if (Array.isArray(p) && p.length === DEFAULT_CONFIGS.length) return {
			configs: p,
			guardado: true
		};
	} catch {}
	return {
		configs: DEFAULT_CONFIGS,
		guardado: false
	};
}
function HitosPlazosPage() {
	const rol = useRol();
	const versiones = useHistorial(CLAVE);
	const ultimo = useRef(null);
	const restaurando = useRef(false);
	const [recarga, setRecarga] = useState(0);
	useEffect(() => {
		ultimo.current = aLegible(vigente().configs);
		const alCambiar = () => {
			if (restaurando.current) return;
			const { configs, guardado } = vigente();
			const despues = aLegible(configs);
			const nombres = despues.filter((p, i) => JSON.stringify(p) !== JSON.stringify(ultimo.current?.[i])).map((p) => p.nombre);
			registrarCambio(CLAVE, {
				accion: guardado ? "Guardó la configuración de hitos" : "Restauró los valores por defecto",
				objeto: nombres.length ? nombres.join(", ") : "sin cambios en los hitos",
				antes: ultimo.current ?? despues,
				despues
			}, BITACORA);
			ultimo.current = despues;
		};
		window.addEventListener(ACQUISITION_MILESTONES_UPDATED_EVENT, alCambiar);
		return () => window.removeEventListener(ACQUISITION_MILESTONES_UPDATED_EVENT, alCambiar);
	}, []);
	const restaurar = (registro, n) => {
		restaurando.current = true;
		try {
			localStorage.setItem(ACQUISITION_MILESTONES_STORAGE_KEY, JSON.stringify(desdeLegible(registro, vigente().configs)));
			window.dispatchEvent(new Event(ACQUISITION_MILESTONES_UPDATED_EVENT));
		} finally {
			restaurando.current = false;
		}
		registrarCambio(CLAVE, {
			accion: "Restauró una versión anterior",
			objeto: `versión ${n}`,
			antes: ultimo.current ?? registro,
			despues: registro
		}, BITACORA);
		ultimo.current = registro;
		setRecarga((r) => r + 1);
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [/* @__PURE__ */ jsx(PageHeader, {
		icono: Settings2,
		titulo: "Hitos y plazos",
		descripcion: "Plazo, evidencia, peso de avance y alertas de cada etapa de adquisición.",
		migas: [{ texto: "Configuración" }, { texto: "Hitos y plazos" }]
	}), /* @__PURE__ */ jsxs(Tabs, {
		defaultValue: "configuracion",
		children: [
			/* @__PURE__ */ jsxs(TabsList, {
				className: "mb-3",
				children: [/* @__PURE__ */ jsx(TabsTrigger, {
					value: "configuracion",
					children: "Configuración"
				}), /* @__PURE__ */ jsxs(TabsTrigger, {
					value: "historico",
					children: [
						/* @__PURE__ */ jsx(History, {
							size: 16,
							className: "mr-1",
							"aria-hidden": true
						}),
						" Histórico (",
						versiones.length,
						")"
					]
				})]
			}),
			/* @__PURE__ */ jsx(TabsContent, {
				value: "configuracion",
				forceMount: true,
				className: "data-[state=inactive]:hidden",
				children: /* @__PURE__ */ jsx(AcquisitionMilestonesConfig, {}, recarga)
			}),
			/* @__PURE__ */ jsx(TabsContent, {
				value: "historico",
				children: /* @__PURE__ */ jsx(Section, {
					titulo: "Histórico de hitos y plazos",
					children: /* @__PURE__ */ jsx(Historico, {
						registro: CLAVE,
						etiquetas: ETIQUETAS,
						nombreArchivo: "historico-hitos-plazos",
						puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
						onRestaurar: restaurar
					})
				})
			})
		]
	})] });
}
//#endregion
export { HitosPlazosPage as component };
