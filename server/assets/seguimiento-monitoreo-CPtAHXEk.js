import { t as Button } from "./button-DH6ZQkjT.js";
import { useEffect, useState } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, CheckCircle2, Eye, Layers3, X } from "lucide-react";
//#region src/routes/seguimiento-monitoreo.tsx?tsr-split=component
var monitorGuides = {
	general: {
		title: "Resumen general",
		description: "Ofrece una lectura rápida del estado de los proyectos y permite ubicar dónde actuar primero.",
		questions: [
			"¿Qué proyecto necesita atención?",
			"¿Cuál es su avance físico y financiero?",
			"¿Dónde están las alertas principales?"
		]
	},
	"dashboard-geografico": {
		title: "Dashboard geográfico",
		description: "Integra en un mapa nacional el avance financiero, físico y predial de los proyectos de infraestructura.",
		questions: [
			"¿Dónde se encuentran los proyectos críticos?",
			"¿Qué proyecto tiene menor disponibilidad predial?",
			"¿En qué fase se detienen los predios?"
		]
	},
	"dashboard-financiero": {
		title: "Presupuesto y pagos",
		description: "Compara el presupuesto disponible con lo aprobado, devengado, pagado y pendiente.",
		questions: [
			"¿Cuánto presupuesto existe?",
			"¿Cuánto se ha ejecutado?",
			"¿Dónde existe déficit o riesgo?"
		]
	},
	"cartera-liberacion": {
		title: "Avance y disponibilidad predial",
		description: "Explica cuántos predios están disponibles y cuáles todavía impiden el avance de la obra.",
		questions: [
			"¿Cuántos predios están liberados?",
			"¿En qué etapa están los pendientes?",
			"¿Qué casos afectan el cronograma?"
		]
	},
	"tecnico-tasaciones": {
		title: "Expedientes y tasaciones",
		description: "Resume el estado técnico de los expedientes y las diferencias entre estimación, tasación y pago.",
		questions: [
			"¿Qué expedientes están pendientes?",
			"¿Qué tasaciones están observadas?",
			"¿Dónde existen sobrecostos?"
		]
	},
	"contractual-servicios-interferencias": {
		title: "Contratos e interferencias",
		description: "Relaciona el desempeño de contratos y proveedores con la atención de servicios e interferencias.",
		questions: [
			"¿Qué contratos están por vencer?",
			"¿Qué proveedor presenta retrasos?",
			"¿Qué interferencia sigue siendo crítica?"
		]
	},
	"legal-riesgos-plazos": {
		title: "Situación legal y plazos",
		description: "Prioriza casos jurídicos, vencimientos y riesgos que requieren una acción inmediata.",
		questions: [
			"¿Qué plazo está por vencer?",
			"¿Qué predio tiene riesgo crítico?",
			"¿Quién debe ejecutar la siguiente acción?"
		]
	},
	"territorial-pagos-cierre": {
		title: "Mapa, pagos y cierre",
		description: "Integra ubicación, pago, entrega, inscripción y cierre de cada predio.",
		questions: [
			"¿Dónde está cada predio?",
			"¿Qué pago o entrega está pendiente?",
			"¿Qué falta para cerrar el expediente?"
		]
	},
	"territorial-integral": {
		title: "Cierre territorial integral",
		description: "Integra ubicación, pago, entrega, inscripción y cierre de cada predio.",
		questions: [
			"¿Dónde está cada predio?",
			"¿Qué pago o entrega está pendiente?",
			"¿Qué falta para cerrar el expediente?"
		]
	},
	"gastos-proyecto-predio": {
		title: "Gastos por predio",
		description: "Consolida los gastos directos, compartidos y contractuales asociados a los predios seleccionados.",
		questions: [
			"¿Cuánto cuesta cada predio?",
			"¿Qué concepto genera mayor gasto?",
			"¿Existe algún pago inconsistente?"
		]
	},
	"predios-privados": {
		title: "Seguimiento de predios privados",
		description: "Muestra la etapa actual, el avance acumulado y las razones que explican la situación de cada predio privado.",
		questions: [
			"¿En qué etapa se encuentra cada predio?",
			"¿Por qué llegó a esa situación?",
			"¿Qué acción permite continuar el proceso?"
		]
	},
	predial: {
		title: "Metas y ejecución predial",
		description: "Compara metas, programación y ejecución del trabajo predial por equipo responsable.",
		questions: [
			"¿Cuál es la meta vigente?",
			"¿Qué equipo tiene retraso?",
			"¿Cuánto queda por ejecutar?"
		]
	},
	inscripciones: {
		title: "Inscripción registral",
		description: "Muestra el estado registral y documental de los predios presentados para inscripción.",
		questions: [
			"¿Cuántos títulos están inscritos?",
			"¿Qué documentos están pendientes?",
			"¿Qué predios requieren subsanación?"
		]
	},
	"transferencia-interestatal": {
		title: "Transferencias interestatales",
		description: "Permite identificar predios estatales pendientes, en trámite y adquiridos.",
		questions: [
			"¿Cuántos predios fueron adquiridos?",
			"¿Cuántos continúan en trámite?",
			"¿Qué proyectos tienen transferencias pendientes?"
		]
	},
	"seguimiento-personal": {
		title: "Seguimiento del personal",
		description: "Explica la carga, productividad y cumplimiento de los especialistas que atienden la gestión predial.",
		questions: [
			"¿Quién tiene actividades vencidas?",
			"¿Qué equipo cumple su meta mensual?",
			"¿Dónde existe sobrecarga de trabajo?"
		]
	}
};
/**
* Layout de los tableros: solo el <Outlet/> y la guía flotante que alterna la clase global
* `monitor-simple-mode` (styles.css). El sidebar y la cabecera los pone cada página con AppShell.
*/
function SeguimientoMonitoreoLayout() {
	const path = useRouterState({ select: (state) => state.location.pathname });
	const [simpleView, setSimpleView] = useState(true);
	const [guideOpen, setGuideOpen] = useState(false);
	const guide = monitorGuides[path.split("/").filter(Boolean).at(-1) ?? "general"] ?? monitorGuides.general;
	useEffect(() => {
		document.documentElement.classList.toggle("monitor-simple-mode", simpleView);
		return () => document.documentElement.classList.remove("monitor-simple-mode");
	}, [simpleView]);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx("div", {
		className: "fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-2 print:hidden",
		children: guideOpen ? /* @__PURE__ */ jsxs("aside", {
			"aria-label": "Guía del monitor",
			className: "w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-border bg-card shadow-lg",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-3 border-b-2 border-primary px-4 py-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx(BookOpen, {
						size: 16,
						className: "mt-0.5 shrink-0 text-primary",
						"aria-hidden": true
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Qué muestra este monitor"
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-sm font-bold uppercase text-primary-dark",
						children: guide.title
					})] })]
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setGuideOpen(false),
					className: "rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground",
					"aria-label": "Cerrar guía",
					children: /* @__PURE__ */ jsx(X, { size: 16 })
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: guide.description
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "mt-3 space-y-1.5",
						children: guide.questions.map((question) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-2 text-xs text-foreground",
							children: [/* @__PURE__ */ jsx(CheckCircle2, {
								size: 14,
								className: "mt-0.5 shrink-0 text-success",
								"aria-hidden": true
							}), question]
						}, question))
					}),
					/* @__PURE__ */ jsxs("div", {
						role: "group",
						"aria-label": "Nivel de detalle",
						className: "mt-4 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							variant: simpleView ? "default" : "outline",
							"aria-pressed": simpleView,
							onClick: () => setSimpleView(true),
							children: [/* @__PURE__ */ jsx(Eye, {}), " Ver vista simple"]
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							variant: simpleView ? "outline" : "default",
							"aria-pressed": !simpleView,
							onClick: () => setSimpleView(false),
							children: [/* @__PURE__ */ jsx(Layers3, {}), " Ver análisis completo"]
						})]
					}),
					simpleView && /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "La información secundaria está oculta para facilitar la lectura."
					})
				]
			})]
		}) : /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: () => setGuideOpen(true),
			className: "shadow-lg",
			children: [/* @__PURE__ */ jsx(BookOpen, {}), " Abrir guía del monitor"]
		})
	})] });
}
//#endregion
export { SeguimientoMonitoreoLayout as component };
