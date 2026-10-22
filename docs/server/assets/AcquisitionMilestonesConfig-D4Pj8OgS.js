import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowDown, ArrowUp, Building2, Check, ChevronRight, CircleDollarSign, Copy, Gavel, Plus, RotateCcw, Save, Trash2, Users } from "lucide-react";
//#region src/components/AcquisitionMilestonesConfig.tsx
var ACQUISITION_MILESTONES_STORAGE_KEY = "mtc-acquisition-milestones-v2";
var ACQUISITION_MILESTONES_UPDATED_EVENT = "mtc-acquisition-milestones-updated";
function stage(id, category, name, days, responsible, evidence, weight) {
	return {
		id,
		category,
		name,
		days,
		warningDay: Math.max(1, Math.round(days * .7)),
		criticalDay: Math.max(1, Math.round(days * .9)),
		repeatEvery: 2,
		weight,
		responsible,
		evidence,
		channel: "Sistema y correo",
		active: true
	};
}
function numberedStage(id, number, category, name, days, responsible, evidence, weight) {
	return {
		...stage(id, category, name, days, responsible, evidence, weight),
		number
	};
}
var DEFAULT_CONFIGS = [
	{
		id: "trato-directo",
		family: "1. Adquisición de predios privados",
		name: "1.1. Trato directo",
		description: "Adquisición por aceptación de la oferta, pago y entrega de posesión.",
		legalLimitDays: 180,
		color: "#2563eb",
		milestones: [
			stage("td-1", "Diagnóstico", "Identificado / individualizado", 12, "Equipo técnico", "Ficha de identificación", 6),
			stage("td-2", "Diagnóstico", "Diagnóstico técnico-legal", 18, "Técnico / Legal", "Informe técnico-legal", 8),
			stage("td-3", "Expediente", "Expediente técnico-legal completo", 22, "Coordinador predial", "Expediente validado", 12),
			stage("td-4", "Tasación", "En tasación", 18, "Perito tasador", "Cargo de envío al perito", 8),
			stage("td-5", "Tasación", "Tasado", 8, "Coordinador de tasaciones", "Informe de tasación", 8),
			stage("td-6", "Negociación", "Oferta y trato directo", 25, "Especialista legal", "Carta de intención notificada", 12),
			stage("td-7", "Negociación", "Aceptado", 10, "Sujeto pasivo", "Carta de aceptación", 8),
			stage("td-8", "Formalización", "Resolución aprobada", 15, "Asesoría legal", "Resolución emitida", 10),
			stage("td-9", "Pago", "Devengado", 12, "Administración", "Comprobante de devengado", 7),
			stage("td-10", "Pago", "Pago programado", 10, "Tesorería", "Programación de pago", 6),
			stage("td-11", "Pago", "Pagado", 15, "Tesorería", "Comprobante de pago", 8),
			stage("td-12", "Cierre", "Posesión entregada", 15, "Equipo predial", "Acta de entrega", 7)
		]
	},
	{
		id: "expropiacion",
		family: "1. Adquisición de predios privados",
		name: "1.2. Expropiación de predios",
		description: "Proceso expropiatorio cuando no se concreta el trato directo.",
		legalLimitDays: 180,
		color: "#dc2626",
		milestones: [
			stage("exp-1", "Diagnóstico", "Predio identificado y diagnóstico concluido", 15, "Equipo técnico-legal", "Informe técnico-legal", 8),
			stage("exp-2", "Expediente", "Expediente técnico-legal completo", 20, "Coordinador predial", "Expediente validado", 12),
			stage("exp-3", "Tasación", "Tasación aprobada", 20, "Perito tasador", "Informe de tasación", 10),
			stage("exp-4", "Trato directo", "Oferta notificada", 15, "Especialista legal", "Cargo de notificación", 8),
			stage("exp-5", "Trato directo", "Rechazo o vencimiento de oferta", 15, "Especialista legal", "Acta o constancia", 8),
			stage("exp-6", "Expropiación", "Expediente de expropiación", 25, "Asesoría legal", "Proyecto normativo", 15),
			stage("exp-7", "Expropiación", "Norma de expropiación emitida", 25, "Alta dirección", "Norma publicada", 15),
			stage("exp-8", "Pago", "Consignación / pago", 20, "Tesorería", "Constancia de consignación", 10),
			stage("exp-9", "Cierre", "Ejecución coactiva y posesión", 15, "Procuraduría / Predial", "Acta de posesión", 8),
			stage("exp-10", "Registro", "Inscripción registral", 10, "Especialista registral", "Asiento registral", 6)
		]
	},
	{
		id: "estatales",
		family: "2. Transferencia de predios estatales",
		name: "2. Transferencia de predios estatales",
		description: "Saneamiento, trámite interinstitucional y transferencia del predio estatal.",
		legalLimitDays: 90,
		color: "#059669",
		milestones: [
			stage("est-1", "Pendiente", "Identificación de entidad titular", 8, "Equipo técnico", "Partida y consulta institucional", 10),
			stage("est-2", "Pendiente", "Diagnóstico técnico-legal", 10, "Técnico / Legal", "Informe técnico-legal", 12),
			stage("est-3", "En trámite", "Solicitud a entidad propietaria", 10, "Especialista legal", "Oficio y cargo de recepción", 10),
			stage("est-4", "En trámite", "Evaluación y saneamiento", 18, "Entidad propietaria", "Informe de saneamiento", 18),
			stage("est-5", "En trámite", "Tasación o valorización", 12, "Perito tasador", "Informe de valorización", 12),
			stage("est-6", "En trámite", "Resolución / acto administrativo", 14, "Asesoría legal", "Resolución emitida", 16),
			stage("est-7", "Adquirido", "Transferencia e inscripción", 10, "SUNARP / Legal", "Asiento registral", 14),
			stage("est-8", "Adquirido", "Entrega de posesión", 8, "Equipo predial", "Acta de entrega", 8)
		]
	},
	{
		id: "mejoras",
		family: "3. Pago de mejoras",
		name: "3. Pago de mejoras",
		description: "Identificación, valorización, aprobación y pago de mejoras.",
		legalLimitDays: 180,
		color: "#7c3aed",
		milestones: [
			stage("mej-1", "Identificación", "Mejoras identificadas", 15, "Equipo técnico", "Ficha e inventario fotográfico", 8),
			stage("mej-2", "Expediente", "Levantamiento e inventario", 20, "Especialista técnico", "Planos y metrados", 10),
			stage("mej-3", "Expediente", "Expediente de mejoras completo", 25, "Coordinador predial", "Expediente validado", 15),
			stage("mej-4", "Valuación", "Tasación de mejoras", 20, "Perito tasador", "Informe de tasación", 15),
			stage("mej-5", "Valuación", "Valor aprobado", 12, "Coordinador de tasaciones", "Conformidad de tasación", 10),
			stage("mej-6", "Conformidad", "Acta de aceptación", 18, "Especialista legal", "Acta suscrita", 12),
			stage("mej-7", "Pago", "Devengado", 15, "Administración", "Comprobante de devengado", 8),
			stage("mej-8", "Pago", "Pago programado", 15, "Tesorería", "Programación de pago", 7),
			stage("mej-9", "Pago", "Pagado", 20, "Tesorería", "Comprobante de pago", 10),
			stage("mej-10", "Cierre", "Entrega y cierre", 20, "Equipo predial", "Acta de cierre", 5)
		]
	}
];
var PREDIAL_ACQUISITION_MILESTONES = [
	numberedStage("td-base-1", 1, "INFORMACIÓN BASE – Diagnóstico e identificación del predio", "Diagnóstico general", 5, "Equipo técnico-legal", "Ficha de diagnóstico general", 5),
	numberedStage("td-base-2", 2, "INFORMACIÓN BASE – Diagnóstico e identificación del predio", "Asignación predial a la brigada", 3, "Coordinador predial", "Registro de asignación e historial", 5),
	numberedStage("td-base-3", 3, "INFORMACIÓN BASE – Diagnóstico e identificación del predio", "Diagnóstico preliminar", 10, "Brigada predial", "Informe de diagnóstico preliminar", 10),
	numberedStage("td-base-4", 4, "INFORMACIÓN BASE – Diagnóstico e identificación del predio", "Inspección de campo", 10, "Brigada predial", "Acta de inspección, ficha y fotografías", 10),
	numberedStage("td-base-5", 5, "INFORMACIÓN BASE – Diagnóstico e identificación del predio", "Registro de código predial", 3, "Especialista técnico", "Ficha de identificación y codificación", 5),
	numberedStage("td-etapa-1", 6, "ETAPA I – Diagnóstico técnico, adquisición y preparación de tasación", "ITL / Requerimiento de tasación", 15, "Especialista técnico-legal", "ITL, requerimiento y cargo de remisión", 15),
	numberedStage("td-etapa-2-itt", 7, "ETAPA II – Tasación y disponibilidad presupuestal", "Obtención del ITT", 30, "Perito / Coordinación de tasaciones", "Informe técnico de tasación", 15),
	numberedStage("td-etapa-2-ccp", 8, "ETAPA II – Tasación y disponibilidad presupuestal", "N.° CCP", 10, "Oficina de presupuesto", "Certificación de crédito presupuestario", 10),
	numberedStage("td-etapa-3-eap", 9, "ETAPA III – Comunicación y aprobación de la adquisición", "Elevación del EAP", 7, "Coordinador predial", "Documento de elevación y cargo", 10),
	numberedStage("td-etapa-3-rd", 10, "ETAPA III – Comunicación y aprobación de la adquisición", "Emisión de RD", 15, "Asesoría legal / Dirección", "Resolución directoral emitida", 10),
	numberedStage("td-etapa-4", 11, "ETAPA IV – Pago y consignación", "Devengado", 10, "Administración", "Registro y comprobante de devengado", 5),
	numberedStage("td-etapa-5", null, "ETAPA V – Entrega, saneamiento e inscripción registral", "Entrega, saneamiento e inscripción registral", 30, "Equipo legal y registral", "Acta de entrega, título y asiento registral", 0),
	numberedStage("td-etapa-6", null, "ETAPA VI – Repositorio y cierre del predio", "Repositorio y cierre del predio", 12, "Coordinador predial", "Expediente digital y acta de cierre", 0)
];
var LEGACY_TRATO_DIRECTO_MILESTONES = DEFAULT_CONFIGS[0].milestones.map((item) => ({ ...item }));
DEFAULT_CONFIGS[0] = {
	...DEFAULT_CONFIGS[0],
	milestones: PREDIAL_ACQUISITION_MILESTONES
};
function migrateDefaults(configs) {
	return configs.map((process) => {
		return process.id === "trato-directo" && JSON.stringify(process.milestones) === JSON.stringify(LEGACY_TRATO_DIRECTO_MILESTONES) ? {
			...process,
			milestones: PREDIAL_ACQUISITION_MILESTONES.map((item) => ({ ...item }))
		} : process;
	});
}
function cloneDefaults() {
	return DEFAULT_CONFIGS.map((process) => ({
		...process,
		milestones: process.milestones.map((milestone) => ({ ...milestone }))
	}));
}
function AcquisitionMilestonesConfig() {
	const [configs, setConfigs] = useState(cloneDefaults);
	const [activeId, setActiveId] = useState("trato-directo");
	const [saved, setSaved] = useState(false);
	useEffect(() => {
		const stored = window.localStorage.getItem(ACQUISITION_MILESTONES_STORAGE_KEY);
		if (!stored) return;
		try {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed) && parsed.length === 4) setConfigs(migrateDefaults(parsed));
		} catch {
			window.localStorage.removeItem(ACQUISITION_MILESTONES_STORAGE_KEY);
		}
	}, []);
	const active = configs.find((process) => process.id === activeId) ?? configs[0];
	const enabled = active.milestones.filter((item) => item.active);
	const activeDays = enabled.reduce((sum, item) => sum + item.days, 0);
	const totalWeight = enabled.reduce((sum, item) => sum + item.weight, 0);
	const difference = active.legalLimitDays - activeDays;
	const categories = [...new Set(active.milestones.map((item) => item.category))];
	function updateProcess(patch) {
		setSaved(false);
		setConfigs((current) => current.map((process) => process.id === activeId ? {
			...process,
			...patch
		} : process));
	}
	function updateMilestone(id, patch) {
		updateProcess({ milestones: active.milestones.map((item) => item.id === id ? {
			...item,
			...patch
		} : item) });
	}
	function addMilestone() {
		updateProcess({ milestones: [...active.milestones, stage(`${activeId}-${Date.now()}`, categories.at(-1) ?? "Nueva categoría", "Nueva subetapa", 5, "Por asignar", "Documento sustentatorio", 5)] });
	}
	function moveMilestone(index, direction) {
		const target = index + direction;
		if (target < 0 || target >= active.milestones.length) return;
		const milestones = [...active.milestones];
		[milestones[index], milestones[target]] = [milestones[target], milestones[index]];
		updateProcess({ milestones });
	}
	function saveChanges() {
		window.localStorage.setItem(ACQUISITION_MILESTONES_STORAGE_KEY, JSON.stringify(configs));
		window.dispatchEvent(new Event(ACQUISITION_MILESTONES_UPDATED_EVENT));
		setSaved(true);
		window.setTimeout(() => setSaved(false), 2400);
	}
	function restoreDefaults() {
		setConfigs(cloneDefaults());
		window.localStorage.removeItem(ACQUISITION_MILESTONES_STORAGE_KEY);
		window.dispatchEvent(new Event(ACQUISITION_MILESTONES_UPDATED_EVENT));
		setSaved(false);
	}
	return /* @__PURE__ */ jsxs("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-xs leading-5 text-muted-foreground",
				children: "Defina el plazo, evidencia, peso de avance y escalamiento de alertas para cada etapa. Estas reglas permiten medir individualmente el progreso de cada predio."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 xl:grid-cols-[290px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ jsxs("aside", {
					className: "space-y-2 rounded-lg border border-border bg-card p-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "px-1 text-xs font-bold uppercase text-muted-foreground",
						children: "Tipos de proceso"
					}), configs.map((process, index) => {
						const total = process.milestones.filter((item) => item.active).reduce((sum, item) => sum + item.days, 0);
						const selected = process.id === activeId;
						return /* @__PURE__ */ jsxs("div", { children: [(index === 0 || process.family !== configs[index - 1].family) && /* @__PURE__ */ jsx("p", {
							className: "mb-1 mt-2 px-1 text-xs font-bold text-foreground",
							children: process.family
						}), /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setActiveId(process.id),
							"aria-pressed": selected,
							className: `w-full rounded-lg border p-3 text-left ${selected ? "border-primary bg-primary-soft" : "border-border hover:bg-muted"}`,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ jsx(ProcessIcon, {
										id: process.id,
										color: process.color
									}), /* @__PURE__ */ jsx(ChevronRight, {
										size: 16,
										className: selected ? "text-primary" : "text-muted-foreground",
										"aria-hidden": true
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm font-bold text-foreground",
									children: process.name
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-2 flex justify-between text-xs text-muted-foreground",
									children: [/* @__PURE__ */ jsxs("span", { children: [process.milestones.length, " etapas"] }), /* @__PURE__ */ jsxs("b", {
										className: `tabular-nums ${total > process.legalLimitDays ? "text-destructive" : "text-foreground"}`,
										children: [
											total,
											"/",
											process.legalLimitDays,
											" días"
										]
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1.5 h-1.5 overflow-hidden rounded-sm bg-muted",
									role: "progressbar",
									"aria-valuenow": Math.min(100, Math.round(total / process.legalLimitDays * 100)),
									"aria-valuemin": 0,
									"aria-valuemax": 100,
									"aria-label": "Plazo asignado sobre el máximo legal",
									children: /* @__PURE__ */ jsx("div", {
										className: `h-full ${total > process.legalLimitDays ? "bg-destructive" : ""}`,
										style: {
											backgroundColor: total > process.legalLimitDays ? void 0 : process.color,
											width: `${Math.min(100, total / process.legalLimitDays * 100)}%`
										}
									})
								})
							]
						})] }, process.id);
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0 space-y-3",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "rounded-lg border border-border bg-card p-4",
							children: /* @__PURE__ */ jsxs(FormGrid, { children: [
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Nombre del proceso",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										value: active.name,
										onChange: (e) => updateProcess({ name: e.target.value }),
										className: `${controlClase} font-semibold`
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Plazo máximo",
									children: /* @__PURE__ */ jsx(NumberInput, {
										value: active.legalLimitDays,
										onChange: (value) => updateProcess({ legalLimitDays: value }),
										suffix: "días"
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Descripción",
									ancho: "doble",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										value: active.description,
										onChange: (e) => updateProcess({ description: e.target.value }),
										className: controlClase
									})
								})
							] })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-2 md:grid-cols-5",
							children: [
								/* @__PURE__ */ jsx(SummaryCard, {
									label: "Plazo máximo",
									value: `${active.legalLimitDays} días`
								}),
								/* @__PURE__ */ jsx(SummaryCard, {
									label: "Tiempo asignado",
									value: `${activeDays} días`,
									alert: difference < 0
								}),
								/* @__PURE__ */ jsx(SummaryCard, {
									label: "Etapas activas",
									value: enabled.length.toString()
								}),
								/* @__PURE__ */ jsx(SummaryCard, {
									label: "Peso del avance",
									value: `${totalWeight}%`,
									alert: totalWeight !== 100
								}),
								/* @__PURE__ */ jsx(SummaryCard, {
									label: difference >= 0 ? "Margen" : "Exceso",
									value: `${Math.abs(difference)} días`,
									alert: difference < 0
								})
							]
						}),
						/* @__PURE__ */ jsx(AlertRules, {}),
						(difference < 0 || totalWeight !== 100) && /* @__PURE__ */ jsxs("p", {
							role: "alert",
							className: "flex items-start gap-2 rounded-md border border-destructive bg-destructive-soft px-3 py-2.5 text-sm text-destructive",
							children: [/* @__PURE__ */ jsx(AlertTriangle, {
								size: 16,
								className: "mt-0.5 shrink-0",
								"aria-hidden": true
							}), /* @__PURE__ */ jsxs("span", { children: [difference < 0 && `El flujo excede el plazo máximo en ${Math.abs(difference)} días. `, totalWeight !== 100 && `El peso de las etapas activas debe sumar 100 %; actualmente suma ${totalWeight} %.`] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "overflow-hidden rounded-lg border border-border bg-card",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2.5",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-bold uppercase text-primary-dark",
										children: "Etapas, evidencias y alertas"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "El avance se acredita con la evidencia exigida; las alertas se calculan desde la fecha de inicio de cada etapa."
									})] }), /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: addMilestone,
										children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar etapa"]
									})]
								}),
								/* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "numero",
											titulo: "N.°",
											ancho: "3rem",
											alinear: "centro",
											render: (item, index) => /* @__PURE__ */ jsx("b", {
												className: "tabular-nums text-muted-foreground",
												children: "number" in item ? item.number ?? "" : index + 1
											})
										},
										{
											clave: "category",
											titulo: "Etapa",
											ancho: "18rem",
											render: (item) => /* @__PURE__ */ jsx(TextInput, {
												value: item.category,
												onChange: (value) => updateMilestone(item.id, { category: value }),
												list: `categories-${activeId}`,
												strong: true
											})
										},
										{
											clave: "name",
											titulo: "Descripción del hito",
											ancho: "16rem",
											render: (item) => /* @__PURE__ */ jsx(TextInput, {
												value: item.name,
												onChange: (value) => updateMilestone(item.id, { name: value })
											})
										},
										{
											clave: "days",
											titulo: "Plazo",
											ancho: "6rem",
											alinear: "centro",
											render: (item) => /* @__PURE__ */ jsx(CompactNumber, {
												value: item.days,
												onChange: (value) => updateMilestone(item.id, {
													days: value,
													warningDay: Math.min(item.warningDay, value),
													criticalDay: Math.min(item.criticalDay, value)
												}),
												tone: "orange"
											})
										},
										{
											clave: "warningDay",
											titulo: "Preventiva",
											ancho: "6rem",
											alinear: "centro",
											render: (item) => /* @__PURE__ */ jsx(CompactNumber, {
												value: item.warningDay,
												max: item.days,
												onChange: (value) => updateMilestone(item.id, { warningDay: value }),
												tone: "amber"
											})
										},
										{
											clave: "criticalDay",
											titulo: "Crítica",
											ancho: "6rem",
											alinear: "centro",
											render: (item) => /* @__PURE__ */ jsx(CompactNumber, {
												value: item.criticalDay,
												max: item.days,
												onChange: (value) => updateMilestone(item.id, { criticalDay: value }),
												tone: "red"
											})
										},
										{
											clave: "repeatEvery",
											titulo: "Repetir",
											ancho: "6rem",
											alinear: "centro",
											render: (item) => /* @__PURE__ */ jsx(CompactNumber, {
												value: item.repeatEvery,
												onChange: (value) => updateMilestone(item.id, { repeatEvery: value })
											})
										},
										{
											clave: "weight",
											titulo: "Peso %",
											ancho: "6rem",
											alinear: "centro",
											render: (item) => /* @__PURE__ */ jsx(CompactNumber, {
												value: item.weight,
												max: 100,
												onChange: (value) => updateMilestone(item.id, { weight: value }),
												tone: "blue"
											})
										},
										{
											clave: "acumulado",
											titulo: "Acumulado %",
											ancho: "6rem",
											alinear: "centro",
											render: (item, index) => {
												const accumulated = active.milestones.slice(0, index + 1).filter((row) => row.active).reduce((sum, row) => sum + row.weight, 0);
												return /* @__PURE__ */ jsx("span", {
													className: "inline-flex h-8 min-w-14 items-center justify-center rounded-md border border-border bg-primary-soft px-2 font-bold tabular-nums text-primary-dark",
													children: item.weight > 0 ? `${accumulated} %` : "0 %"
												});
											}
										},
										{
											clave: "responsible",
											titulo: "Responsable",
											ancho: "11rem",
											render: (item) => /* @__PURE__ */ jsx(TextInput, {
												value: item.responsible,
												onChange: (value) => updateMilestone(item.id, { responsible: value })
											})
										},
										{
											clave: "evidence",
											titulo: "Evidencia de cierre",
											ancho: "13rem",
											render: (item) => /* @__PURE__ */ jsx(TextInput, {
												value: item.evidence,
												onChange: (value) => updateMilestone(item.id, { evidence: value })
											})
										},
										{
											clave: "channel",
											titulo: "Notificar por",
											ancho: "11rem",
											render: (item) => /* @__PURE__ */ jsxs("select", {
												value: item.channel,
												onChange: (e) => updateMilestone(item.id, { channel: e.target.value }),
												"aria-label": "Canal de notificación",
												className: `${controlClase} h-8 min-w-44 px-2 text-xs`,
												children: [
													/* @__PURE__ */ jsx("option", { children: "Sistema" }),
													/* @__PURE__ */ jsx("option", { children: "Sistema y correo" }),
													/* @__PURE__ */ jsx("option", { children: "Sistema, correo y SMS" })
												]
											})
										},
										{
											clave: "active",
											titulo: "Activa",
											ancho: "4rem",
											alinear: "centro",
											render: (item) => /* @__PURE__ */ jsx(Toggle, {
												active: item.active,
												onClick: () => updateMilestone(item.id, { active: !item.active })
											})
										},
										{
											clave: "acciones",
											titulo: "Acciones",
											ancho: "9rem",
											alinear: "centro",
											render: (item, index) => /* @__PURE__ */ jsxs("div", {
												className: "flex justify-center gap-1",
												children: [
													/* @__PURE__ */ jsx(IconButton, {
														title: "Subir",
														disabled: index === 0,
														onClick: () => moveMilestone(index, -1),
														children: /* @__PURE__ */ jsx(ArrowUp, { size: 12 })
													}),
													/* @__PURE__ */ jsx(IconButton, {
														title: "Bajar",
														disabled: index === active.milestones.length - 1,
														onClick: () => moveMilestone(index, 1),
														children: /* @__PURE__ */ jsx(ArrowDown, { size: 12 })
													}),
													/* @__PURE__ */ jsx(IconButton, {
														title: "Duplicar",
														onClick: () => updateProcess({ milestones: [...active.milestones, {
															...item,
															id: `${activeId}-${Date.now()}`,
															name: `${item.name} (copia)`
														}] }),
														children: /* @__PURE__ */ jsx(Copy, { size: 12 })
													}),
													/* @__PURE__ */ jsx(IconButton, {
														title: "Eliminar",
														danger: true,
														onClick: () => updateProcess({ milestones: active.milestones.filter((row) => row.id !== item.id) }),
														children: /* @__PURE__ */ jsx(Trash2, { size: 12 })
													})
												]
											})
										}
									],
									filas: active.milestones,
									claveFila: (item) => item.id,
									claseFila: (item) => item.active ? void 0 : "opacity-60",
									vacio: "Sin etapas."
								}),
								/* @__PURE__ */ jsx("datalist", {
									id: `categories-${activeId}`,
									children: categories.map((category) => /* @__PURE__ */ jsx("option", { value: category }, category))
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap justify-between gap-2 border-t border-border bg-background px-3 py-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ jsxs("span", { children: [
										enabled.filter((item) => item.weight > 0).length,
										" hitos ponderados ·",
										" ",
										categories.length,
										" etapas"
									] }), /* @__PURE__ */ jsxs("span", { children: [
										"Seguimiento acumulado: ",
										/* @__PURE__ */ jsxs("b", {
											className: "text-foreground",
											children: [totalWeight, " %"]
										}),
										" · Tiempo:",
										" ",
										/* @__PURE__ */ jsxs("b", {
											className: "text-foreground",
											children: [activeDays, " días"]
										})
									] })]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: restoreDefaults,
				children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Restaurar valores"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: saveChanges,
				children: [saved ? /* @__PURE__ */ jsx(Check, {}) : /* @__PURE__ */ jsx(Save, {}), saved ? "Configuración guardada" : "Guardar configuración"]
			})] })
		]
	});
}
function AlertRules() {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2 rounded-lg border border-border bg-card p-3 md:grid-cols-3",
		children: [
			/* @__PURE__ */ jsx(AlertRule, {
				color: "bg-success",
				title: "En plazo",
				text: "Desde el inicio hasta un día antes de la alerta preventiva."
			}),
			/* @__PURE__ */ jsx(AlertRule, {
				color: "bg-highlight",
				title: "Alerta preventiva",
				text: "Notifica al responsable y coordinador para impulsar la etapa."
			}),
			/* @__PURE__ */ jsx(AlertRule, {
				color: "bg-destructive",
				title: "Alerta crítica / vencida",
				text: "Escala según el canal elegido y se repite con la frecuencia configurada."
			})
		]
	});
}
function AlertRule({ color, title, text }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex gap-2",
		children: [/* @__PURE__ */ jsx("span", {
			className: `mt-1 size-2.5 shrink-0 rounded-sm ${color}`,
			"aria-hidden": true
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-bold text-foreground",
			children: title
		}), /* @__PURE__ */ jsx("p", {
			className: "text-xs leading-4 text-muted-foreground",
			children: text
		})] })]
	});
}
function ProcessIcon({ id, color }) {
	const icon = id === "mejoras" ? /* @__PURE__ */ jsx(CircleDollarSign, { size: 17 }) : id === "estatales" ? /* @__PURE__ */ jsx(Building2, { size: 17 }) : id === "expropiacion" ? /* @__PURE__ */ jsx(Gavel, { size: 17 }) : /* @__PURE__ */ jsx(Users, { size: 17 });
	return /* @__PURE__ */ jsx("span", {
		className: "flex size-8 items-center justify-center rounded-lg",
		style: {
			backgroundColor: `${color}15`,
			color
		},
		children: icon
	});
}
function SummaryCard({ label, value, alert = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `rounded-lg border bg-card p-3 ${alert ? "border-destructive" : "border-border"}`,
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-bold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: `mt-1 text-lg font-semibold tabular-nums ${alert ? "text-destructive" : "text-foreground"}`,
			children: value
		})]
	});
}
function NumberInput({ value, onChange, suffix }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsx("input", {
			type: "number",
			min: 1,
			value,
			onChange: (e) => onChange(Math.max(1, Number(e.target.value))),
			className: `${controlClase} pr-12 font-semibold tabular-nums`
		}), /* @__PURE__ */ jsx("span", {
			className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground",
			children: suffix
		})]
	});
}
function TextInput({ value, onChange, list, strong = false }) {
	return /* @__PURE__ */ jsx("input", {
		value,
		list,
		onChange: (e) => onChange(e.target.value),
		className: `${controlClase} h-8 min-w-44 px-2 text-xs ${strong ? "font-semibold" : ""}`
	});
}
function CompactNumber({ value, onChange, max, tone = "slate" }) {
	return /* @__PURE__ */ jsx("input", {
		type: "number",
		min: 0,
		max,
		value,
		onChange: (e) => onChange(Math.max(0, Math.min(max ?? Infinity, Number(e.target.value)))),
		className: `${controlClase} h-8 min-w-16 px-2 text-center text-xs font-bold tabular-nums ${{
			slate: "",
			orange: "border-primary bg-primary-soft text-primary-dark",
			amber: "border-warning bg-warning-soft text-warning",
			red: "border-destructive bg-destructive-soft text-destructive",
			blue: "border-primary bg-primary-soft text-primary-dark"
		}[tone]}`
	});
}
function Toggle({ active, onClick }) {
	return /* @__PURE__ */ jsx("input", {
		type: "checkbox",
		checked: active,
		onChange: onClick,
		className: "size-4 accent-primary",
		"aria-label": active ? "Desactivar etapa" : "Activar etapa"
	});
}
function IconButton({ title, onClick, children, disabled = false, danger = false }) {
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			"aria-label": title,
			disabled,
			onClick,
			className: `flex size-8 items-center justify-center rounded-md border border-border disabled:cursor-not-allowed disabled:opacity-40 ${danger ? "text-destructive hover:bg-destructive-soft" : "text-primary-dark hover:bg-primary-soft"}`,
			children
		})
	}), /* @__PURE__ */ jsx(TooltipContent, { children: title })] });
}
//#endregion
export { DEFAULT_CONFIGS as i, ACQUISITION_MILESTONES_UPDATED_EVENT as n, AcquisitionMilestonesConfig as r, ACQUISITION_MILESTONES_STORAGE_KEY as t };
