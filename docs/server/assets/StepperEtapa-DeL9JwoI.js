import { c as useHitosPredio, i as estadoPlazo, m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { A as nombreDeEtapa, j as pasosDeEtapa, k as etapaDePaso } from "./prediosProyecto-D1ASzaVD.js";
import { J as usePerfilPredio, Y as varianteDe } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown } from "lucide-react";
//#region src/components/kit/StepperEtapa.tsx
var SEMAFORO = {
	verde: "en plazo",
	ambar: "por vencer",
	rojo: "vencido"
};
/**
* Sección con los pasos de la etapa a la que pertenece la pantalla, en el menú de la ruta legal del
* predio (fuente: src/lib/etapas.ts). Cuando el hito de un paso está registrado, su plazo aparece con
* la fecha de vencimiento y el semáforo. `extra` admite el PlazoBadge o la ayuda legal de la pantalla.
* Plegada por defecto, como un acordeón: la cabecera dice la etapa y el paso actual, y `extra` (el plazo)
* se ve siempre. Lo que el usuario elige (abierta o plegada) se recuerda en su navegador.
*/
var CLAVE_ABIERTA = "pdgp-stepper-etapa-abierta";
function StepperEtapa({ actual, projectId, codigo, extra, className = "mb-4" }) {
	const [abierta, setAbierta] = useState(false);
	useEffect(() => {
		try {
			setAbierta(localStorage.getItem(CLAVE_ABIERTA) === "si");
		} catch {}
	}, []);
	const alternar = () => setAbierta((a) => {
		try {
			localStorage.setItem(CLAVE_ABIERTA, a ? "no" : "si");
		} catch {}
		return !a;
	});
	const perfil = usePerfilPredio(projectId, codigo);
	const hitos = useHitosPredio(codigo);
	const variante = etapaDePaso(actual, varianteDe(perfil)) ? varianteDe(perfil) : "privado";
	const etapa = etapaDePaso(actual, variante);
	if (!etapa) return null;
	const pasos = pasosDeEtapa(etapa, variante);
	const n = pasos.findIndex((p) => p.clave === actual);
	const idPasos = `pasos-etapa-${etapa}`;
	return /* @__PURE__ */ jsxs("section", {
		"data-stepper": true,
		className: `rounded-lg border border-border bg-card ${className}`,
		children: [
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: alternar,
				"aria-expanded": abierta,
				"aria-controls": idPasos,
				className: "flex w-full flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-left hover:bg-muted",
				children: [
					/* @__PURE__ */ jsx(ChevronDown, {
						size: 16,
						className: `shrink-0 text-primary-dark transition-transform ${abierta ? "" : "-rotate-90"}`,
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "text-sm font-bold uppercase text-primary-dark",
						children: [
							"Etapa ",
							etapa,
							" · ",
							nombreDeEtapa(etapa, variante)
						]
					}),
					n >= 0 && /* @__PURE__ */ jsxs("span", {
						className: "text-sm text-muted-foreground",
						children: [
							"Paso ",
							n + 1,
							" de ",
							pasos.length,
							": ",
							pasos[n].nombre
						]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "ml-auto text-xs text-muted-foreground",
						children: abierta ? "Ocultar pasos" : "Ver pasos"
					})
				]
			}),
			abierta && /* @__PURE__ */ jsx("div", {
				id: idPasos,
				className: "border-t-2 border-primary px-4 pb-4 pt-3",
				children: /* @__PURE__ */ jsx(Stepper, { pasos: pasos.map((p) => {
					const plazo = p.plazo?.map((c) => estadoPlazo(hitos, c)).find(Boolean);
					return {
						nombre: p.nombre,
						detalle: plazo ? `${p.detalle ? `${p.detalle} · ` : ""}${plazo.gestion ? "gestión: " : ""}vence ${fecha(plazo.vence)} (${SEMAFORO[plazo.semaforo]})` : p.detalle,
						estado: p.clave === actual ? "actual" : "pendiente",
						to: p.clave === actual ? void 0 : p.to,
						params: {
							projectId,
							codigo
						}
					};
				}) })
			}),
			extra && /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap items-center gap-2 border-t border-border px-4 py-2 text-xs text-muted-foreground",
				children: extra
			})
		]
	});
}
//#endregion
export { StepperEtapa as t };
