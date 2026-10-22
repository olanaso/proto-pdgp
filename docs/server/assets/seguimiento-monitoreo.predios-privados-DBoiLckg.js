import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { E as Modal, w as registrarExportacion } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { i as DEFAULT_CONFIGS, n as ACQUISITION_MILESTONES_UPDATED_EVENT, t as ACQUISITION_MILESTONES_STORAGE_KEY } from "./AcquisitionMilestonesConfig-D4Pj8OgS.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2, ChevronDown, Clock3, Eye, FileSpreadsheet, FilterX, Printer, Search } from "lucide-react";
import writeXlsxFile from "write-excel-file/browser";
//#region src/routes/seguimiento-monitoreo.predios-privados.tsx?tsr-split=component
var stages = [
	{
		label: "Identificado / Individualizado",
		evidence: "código predial, ubicación y polígono de afectación",
		nextAction: "iniciar el diagnóstico técnico-legal"
	},
	{
		label: "En diagnóstico técnico-legal",
		evidence: "partida registral, titularidad, área afectada y condición física",
		nextAction: "cerrar observaciones del diagnóstico"
	},
	{
		label: "Expediente técnico-legal completo",
		evidence: "planos, memoria descriptiva, informe técnico e informe legal",
		nextAction: "remitir el expediente para tasación"
	},
	{
		label: "En tasación",
		evidence: "expediente admitido por el órgano tasador",
		nextAction: "obtener el informe técnico de tasación"
	},
	{
		label: "Tasado",
		evidence: "informe de tasación aprobado y monto determinado",
		nextAction: "notificar la oferta de adquisición"
	},
	{
		label: "En trato directo / adquisición",
		evidence: "carta de intención u oferta notificada al sujeto pasivo",
		nextAction: "obtener la respuesta del sujeto pasivo"
	},
	{
		label: "Aceptado",
		evidence: "aceptación expresa de la oferta dentro del plazo",
		nextAction: "emitir la resolución de adquisición"
	},
	{
		label: "Con Resolución",
		evidence: "resolución aprobatoria emitida y notificada",
		nextAction: "gestionar la certificación y el devengado"
	},
	{
		label: "Devengado",
		evidence: "registro presupuestal del devengado",
		nextAction: "programar el pago al beneficiario"
	},
	{
		label: "Pago programado",
		evidence: "fecha y cuenta de pago validadas",
		nextAction: "ejecutar el abono o consignación"
	},
	{
		label: "Pagado parcialmente",
		evidence: "constancia de abono parcial y saldo identificado",
		nextAction: "completar el saldo pendiente"
	},
	{
		label: "Pagado",
		evidence: "comprobante de pago total o consignación",
		nextAction: "formalizar la entrega de posesión"
	},
	{
		label: "Posesión entregada",
		evidence: "acta de entrega y recepción del área",
		nextAction: "suscribir el formulario registral"
	},
	{
		label: "Formulario Registral suscrito",
		evidence: "formulario registral firmado por las partes",
		nextAction: "presentar el título ante SUNARP"
	},
	{
		label: "En trámite SUNARP",
		evidence: "número de título y asiento de presentación",
		nextAction: "dar seguimiento a la calificación registral"
	},
	{
		label: "Observado por SUNARP",
		evidence: "esquela de observación registral",
		nextAction: "subsanar las observaciones dentro del plazo"
	},
	{
		label: "Inscrito en SUNARP",
		evidence: "asiento registral de adquisición inscrito",
		nextAction: "completar el expediente predial"
	},
	{
		label: "Expediente predial completo",
		evidence: "documentos técnicos, legales, financieros y registrales foliados",
		nextAction: "entregar el expediente a OPAT"
	},
	{
		label: "Entregado a OPAT",
		evidence: "cargo de entrega y conformidad de recepción",
		nextAction: "confirmar el cierre administrativo"
	},
	{
		label: "Cerrado",
		evidence: "lista de control final sin pendientes",
		nextAction: "mantener el expediente en custodia"
	}
];
var improvementStages = stages.slice(0, 13).map((stage, index) => index === 12 ? {
	...stage,
	nextAction: "cerrar el expediente del pago de mejoras"
} : stage);
var statePropertyStages = [
	{
		label: "PENDIENTE",
		evidence: "identificación del predio estatal y de la entidad titular",
		nextAction: "iniciar la solicitud de transferencia o adquisición"
	},
	{
		label: "EN TRÁMITE",
		evidence: "expediente presentado y cargo de recepción de la entidad competente",
		nextAction: "obtener el acto administrativo que aprueba la transferencia"
	},
	{
		label: "ADQUIRIDO",
		evidence: "resolución, convenio o acto de transferencia aprobado",
		nextAction: "cerrar el expediente del predio estatal"
	}
];
var stageTargetDays = {
	predial: [
		7,
		14,
		12,
		18,
		8,
		14,
		7,
		10,
		8,
		6,
		8,
		6,
		5,
		8,
		12,
		10,
		10,
		8,
		5,
		4
	],
	mejoras: [
		10,
		18,
		16,
		22,
		10,
		18,
		10,
		14,
		12,
		10,
		16,
		12,
		12
	],
	estado: [
		20,
		60,
		10
	]
};
function targetDaysFor(runtime, stageIndex) {
	return runtime.targetDays[stageIndex] ?? 5;
}
function processTargetDaysFor(runtime) {
	return runtime.targetDays.reduce((total, days) => total + days, 0);
}
function processTermFor(runtime) {
	const days = runtime.legalLimitDays;
	return days > 0 && days % 30 === 0 ? `${days / 30} meses` : `${days} días`;
}
var matrixCopy = {
	predial: {
		tab: "Adquisición predial",
		title: "Matriz de avance por predio",
		description: "Seleccione cualquier celda para conocer por qué el predio llegó o aún no llega a esa etapa.",
		exportName: "adquisicion_predial"
	},
	mejoras: {
		tab: "Pago de mejoras",
		title: "Matriz de pago de mejoras por predio",
		description: "Seguimiento del pago de mejoras desde la identificación hasta la entrega de posesión.",
		exportName: "pago_mejoras"
	},
	estado: {
		tab: "Predios del Estado",
		title: "Matriz de avance de predios del Estado",
		description: "Seguimiento de predios estatales en condición pendiente, en trámite o adquirido.",
		exportName: "predios_del_estado"
	}
};
var owners = [
	"María Quispe Huamán",
	"Juan Ramos Paredes",
	"Comunidad Campesina Acolla",
	"Rosa Vilca Torres",
	"Hermanos Salazar E.I.R.L.",
	"Carlos Mendoza Ruiz"
];
var responsibles = [
	"Ana Campos",
	"Luis Paredes",
	"Patricia Gómez",
	"Jorge Salazar"
];
var stageSeeds = [
	5,
	9,
	4,
	16,
	5,
	17,
	10,
	15,
	1,
	12,
	7,
	19,
	3,
	6,
	13,
	8,
	14,
	11,
	2,
	18,
	0,
	5,
	16,
	9
];
var improvementStageSeeds = [
	3,
	7,
	2,
	12,
	4,
	10,
	6,
	11,
	1,
	8,
	5,
	12,
	3,
	9,
	7,
	10,
	2,
	11,
	4,
	12,
	0,
	6,
	9,
	5
];
var stateStageSeeds = [
	0,
	1,
	1,
	2,
	0,
	1,
	2,
	1,
	0,
	2,
	1,
	0,
	1,
	2,
	0,
	1,
	1,
	2,
	0,
	1,
	2,
	1,
	0,
	2
];
var projectSeeds = [
	{
		name: "Aeropuerto de Jauja",
		prefix: "AERO-JAUJA",
		count: 12
	},
	{
		name: "Aeropuerto de Cajamarca",
		prefix: "AERO-CAJ",
		count: 6
	},
	{
		name: "Aeropuerto de Pisco",
		prefix: "AERO-PISCO",
		count: 6
	}
];
var privateProperties = projectSeeds.flatMap((project, projectIndex) => Array.from({ length: project.count }, (_, localIndex) => {
	const index = projectSeeds.slice(0, projectIndex).reduce((sum, previous) => sum + previous.count, 0) + localIndex;
	const currentStage = stageSeeds[index];
	const improvementsStage = improvementStageSeeds[index];
	const stateStage = stateStageSeeds[index];
	const status = currentStage === stages.length - 1 ? "Cerrado" : currentStage === 15 ? "Observado" : index % 5 === 0 ? "En riesgo" : "En plazo";
	const improvementsStatus = improvementsStage === improvementStages.length - 1 ? "Cerrado" : index % 7 === 0 ? "Observado" : index % 4 === 0 ? "En riesgo" : "En plazo";
	const stateStatus = stateStage === statePropertyStages.length - 1 ? "Cerrado" : index % 8 === 0 ? "Observado" : index % 5 === 0 ? "En riesgo" : "En plazo";
	return {
		code: `${project.prefix}-PR-${String(localIndex + 1).padStart(3, "0")}`,
		project: project.name,
		period: "2026",
		owner: owners[index % owners.length],
		modality: index % 4 === 0 ? "Expropiación" : "Trato directo",
		responsible: responsibles[index % responsibles.length],
		currentStage,
		status,
		updatedAt: `${String(10 + index % 18).padStart(2, "0")}/07/2026`,
		blocker: status === "Observado" ? "Pendiente subsanar la esquela de observación emitida por SUNARP." : status === "En riesgo" ? "La actividad supera el plazo interno de atención y requiere priorización." : status === "Cerrado" ? "Sin bloqueos; el expediente cuenta con cierre administrativo." : "Pendiente completar la evidencia exigida para pasar a la siguiente etapa.",
		improvementsStage,
		improvementsStatus,
		improvementsFile: `EXP-MEJ-2026-${String(index + 1).padStart(4, "0")}`,
		improvementsUpdatedAt: `${String(8 + index % 20).padStart(2, "0")}/07/2026`,
		improvementsBlocker: improvementsStatus === "Observado" ? "Pendiente validar la documentación que sustenta las mejoras valorizadas." : improvementsStatus === "En riesgo" ? "El trámite de pago de mejoras requiere atención prioritaria para cumplir el plazo." : improvementsStatus === "Cerrado" ? "Sin bloqueos; el pago de mejoras y la entrega de posesión fueron completados." : "Pendiente completar la evidencia de la etapa para continuar con el pago de mejoras.",
		stateStage,
		stateStatus,
		stateFile: `EXP-EST-2026-${String(index + 1).padStart(4, "0")}`,
		stateUpdatedAt: `${String(6 + index % 22).padStart(2, "0")}/07/2026`,
		stateBlocker: stateStatus === "Observado" ? "Pendiente subsanar la documentación solicitada por la entidad estatal competente." : stateStatus === "En riesgo" ? "El expediente estatal requiere atención prioritaria para cumplir el plazo previsto." : stateStatus === "Cerrado" ? "Sin bloqueos; el predio estatal cuenta con acto de adquisición aprobado." : "Pendiente completar la documentación requerida para avanzar con el trámite."
	};
}));
function stagesFor(matrixKind) {
	if (matrixKind === "mejoras") return improvementStages;
	if (matrixKind === "estado") return statePropertyStages;
	return stages;
}
function cloneMilestoneConfigs() {
	return DEFAULT_CONFIGS.map((process) => ({
		...process,
		milestones: process.milestones.map((milestone) => ({ ...milestone }))
	}));
}
function readMilestoneConfigs() {
	const defaults = cloneMilestoneConfigs();
	if (typeof window === "undefined") return defaults;
	try {
		const stored = window.localStorage.getItem(ACQUISITION_MILESTONES_STORAGE_KEY);
		if (!stored) return defaults;
		const parsed = JSON.parse(stored);
		if (!Array.isArray(parsed) || !parsed.length) return defaults;
		const currentDirectAcquisition = defaults.find((item) => item.id === "trato-directo");
		return parsed.map((process) => {
			return process.id === "trato-directo" && process.milestones.length === 12 && process.milestones.every((milestone, index) => milestone.id === `td-${index + 1}`) && currentDirectAcquisition ? {
				...process,
				milestones: currentDirectAcquisition.milestones.map((milestone) => ({ ...milestone }))
			} : process;
		});
	} catch {
		return defaults;
	}
}
function processTypeFor(matrixKind, modality) {
	if (matrixKind === "mejoras") return "mejoras";
	if (matrixKind === "estado") return "estatales";
	return modality === "Expropiación" ? "expropiacion" : "trato-directo";
}
function buildMatrixRuntime(matrixKind, modality, configs) {
	const processId = processTypeFor(matrixKind, modality);
	const process = configs.find((item) => item.id === processId) ?? DEFAULT_CONFIGS.find((item) => item.id === processId);
	const activeMilestones = process?.milestones.filter((milestone) => milestone.active) ?? [];
	if (!process || !activeMilestones.length) {
		const fallbackStages = stagesFor(matrixKind);
		const fallbackDays = stageTargetDays[matrixKind];
		return {
			processId,
			processName: matrixCopy[matrixKind].tab,
			legalLimitDays: fallbackDays.reduce((total, days) => total + days, 0),
			stages: fallbackStages,
			targetDays: fallbackDays,
			warningDays: fallbackDays.map((days) => Math.max(1, Math.round(days * .7))),
			criticalDays: fallbackDays.map((days) => Math.max(1, Math.round(days * .9))),
			weights: fallbackStages.map(() => 1)
		};
	}
	return {
		processId,
		processName: process.name,
		legalLimitDays: process.legalLimitDays,
		stages: activeMilestones.map((milestone, index) => ({
			label: milestone.name,
			evidence: milestone.evidence || "documento sustentatorio de la etapa",
			nextAction: activeMilestones[index + 1]?.name ? `continuar con “${activeMilestones[index + 1].name}”` : "cerrar el proceso y archivar el expediente"
		})),
		targetDays: activeMilestones.map((milestone) => Math.max(1, milestone.days)),
		warningDays: activeMilestones.map((milestone) => Math.max(1, milestone.warningDay)),
		criticalDays: activeMilestones.map((milestone) => Math.max(1, milestone.criticalDay)),
		weights: activeMilestones.map((milestone) => Math.max(0, milestone.weight))
	};
}
function currentStageFor(property, matrixKind, stageCount) {
	const rawStage = matrixKind === "mejoras" ? property.improvementsStage : matrixKind === "estado" ? property.stateStage : property.currentStage;
	const sourceCount = stagesFor(matrixKind).length;
	if (stageCount <= 1 || sourceCount <= 1) return 0;
	return Math.min(stageCount - 1, Math.max(0, Math.round(rawStage / (sourceCount - 1) * (stageCount - 1))));
}
function statusFor(property, matrixKind) {
	if (matrixKind === "mejoras") return property.improvementsStatus;
	if (matrixKind === "estado") return property.stateStatus;
	return property.status;
}
function updatedAtFor(property, matrixKind) {
	if (matrixKind === "mejoras") return property.improvementsUpdatedAt;
	if (matrixKind === "estado") return property.stateUpdatedAt;
	return property.updatedAt;
}
function blockerFor(property, matrixKind) {
	if (matrixKind === "mejoras") return property.improvementsBlocker;
	if (matrixKind === "estado") return property.stateBlocker;
	return property.blocker;
}
function secondaryValueFor(property, matrixKind) {
	if (matrixKind === "mejoras") return property.improvementsFile;
	if (matrixKind === "estado") return property.stateFile;
	return property.modality;
}
function secondaryLabelFor(matrixKind) {
	return matrixKind === "predial" ? "Modalidad de adquisición" : "Expediente";
}
function stageCondition(property, stageIndex, matrixKind, runtime) {
	const currentStage = currentStageFor(property, matrixKind, runtime.stages.length);
	if (statusFor(property, matrixKind) === "Cerrado" && stageIndex <= currentStage) return "Completada";
	if (stageIndex < currentStage) return "Completada";
	if (stageIndex === currentStage) return "Etapa actual";
	return "Pendiente";
}
function progressFor(property, matrixKind, runtime) {
	const currentStage = currentStageFor(property, matrixKind, runtime.stages.length);
	const reached = statusFor(property, matrixKind) === "Cerrado" ? runtime.stages.length : currentStage + 1;
	const totalWeight = runtime.weights.reduce((total, weight) => total + weight, 0);
	if (!totalWeight) return reached / runtime.stages.length * 100;
	return runtime.weights.slice(0, reached).reduce((total, weight) => total + weight, 0) / totalWeight * 100;
}
var DAY_IN_MS = 864e5;
function formatDate(date) {
	return date.toLocaleDateString("es-PE", { timeZone: "UTC" });
}
function parsePeruvianDate(value) {
	const [day, month, year] = value.split("/").map(Number);
	return new Date(Date.UTC(year, month - 1, day));
}
function daysBetween(start, end) {
	return Math.max(1, Math.floor((end.getTime() - start.getTime()) / DAY_IN_MS) + 1);
}
function stageStartDateFor(property, stageIndex, matrixKind, runtime) {
	if (stageIndex > currentStageFor(property, matrixKind, runtime.stages.length)) return null;
	const propertyNumber = Number(property.code.split("-").at(-1)) || 1;
	const matrixSeed = matrixKind === "mejoras" ? 2 : matrixKind === "estado" ? 4 : 0;
	const baseOffset = matrixKind === "mejoras" ? 56 : matrixKind === "estado" ? 120 : 0;
	let accumulatedDays = 0;
	for (let index = 0; index < stageIndex; index += 1) {
		const configuredDays = targetDaysFor(runtime, index);
		const executionFactor = .7 + (propertyNumber + index * 2 + matrixSeed) % 5 * .08;
		accumulatedDays += Math.max(1, Math.round(configuredDays * executionFactor));
	}
	return new Date(Date.UTC(2026, 0, 4 + propertyNumber + baseOffset + accumulatedDays));
}
function stageTimingFor(property, stageIndex, matrixKind, runtime) {
	const condition = stageCondition(property, stageIndex, matrixKind, runtime);
	const currentStage = currentStageFor(property, matrixKind, runtime.stages.length);
	const start = stageStartDateFor(property, stageIndex, matrixKind, runtime);
	if (!start || condition === "Pendiente") return {
		start: null,
		end: null,
		days: null,
		condition
	};
	const nextStart = stageStartDateFor(property, stageIndex + 1, matrixKind, runtime);
	if (stageIndex < currentStage && nextStart) {
		const end = /* @__PURE__ */ new Date(nextStart.getTime() - DAY_IN_MS);
		return {
			start,
			end,
			days: daysBetween(start, end),
			condition
		};
	}
	const end = parsePeruvianDate(updatedAtFor(property, matrixKind));
	return {
		start,
		end,
		days: daysBetween(start, end),
		condition
	};
}
function processDaysFor(property, matrixKind, runtime) {
	const start = stageStartDateFor(property, 0, matrixKind, runtime);
	if (!start) return 0;
	return daysBetween(start, parsePeruvianDate(updatedAtFor(property, matrixKind)));
}
function stageDaysLabel(property, stageIndex, matrixKind, runtime) {
	const timing = stageTimingFor(property, stageIndex, matrixKind, runtime);
	if (timing.days === null) return "Aún no inicia";
	return `${timing.days} ${timing.days === 1 ? "día" : "días"}${timing.condition === "Etapa actual" ? " en curso" : ""}`;
}
function dateForStage(property, stageIndex, matrixKind, runtime) {
	const date = stageStartDateFor(property, stageIndex, matrixKind, runtime);
	return date ? formatDate(date) : "Sin iniciar";
}
function reasonForStage(property, stageIndex, matrixKind, runtime) {
	const matrixStages = runtime.stages;
	const currentStage = currentStageFor(property, matrixKind, runtime.stages.length);
	const stage = matrixStages[stageIndex];
	const condition = stageCondition(property, stageIndex, matrixKind, runtime);
	if (condition === "Completada") return `La etapa se completó después de verificar ${stage.evidence}.`;
	if (condition === "Etapa actual") return `${property.code} llegó a esta etapa al completarse las validaciones anteriores. ${blockerFor(property, matrixKind)}`;
	return `La etapa aún no inicia porque el predio permanece en “${matrixStages[currentStage].label}”.`;
}
var statusTone = {
	Cerrado: "success",
	Observado: "destructive",
	"En riesgo": "warning",
	"En plazo": "primary"
};
var CELL = {
	done: "bg-success-soft text-success",
	current: "bg-primary-soft text-primary-dark ring-1 ring-inset ring-primary",
	warning: "bg-warning-soft text-warning ring-1 ring-inset ring-highlight",
	critical: "bg-destructive-soft text-destructive ring-1 ring-inset ring-destructive",
	pending: "bg-card text-muted-foreground"
};
var STICKY_TH = "sticky z-30 border border-border bg-primary-soft px-3 py-2 text-xs font-semibold uppercase text-primary-dark";
var STICKY_TD = "sticky z-10 border border-border bg-card px-2 py-1.5 group-even:bg-background group-hover:bg-primary-soft/40";
function PrivatePropertiesDashboard() {
	const [milestoneConfigs, setMilestoneConfigs] = useState(cloneMilestoneConfigs);
	const [matrixKind, setMatrixKind] = useState("predial");
	const [project, setProject] = useState("TODOS");
	const [period, setPeriod] = useState("TODOS");
	const [query, setQuery] = useState("");
	const [stage, setStage] = useState("TODAS");
	const [status, setStatus] = useState("TODOS");
	const [modality, setModality] = useState("TODAS");
	const [responsible, setResponsible] = useState("TODOS");
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [selected, setSelected] = useState(null);
	const runtime = useMemo(() => buildMatrixRuntime(matrixKind, modality, milestoneConfigs), [
		matrixKind,
		milestoneConfigs,
		modality
	]);
	const activeStages = runtime.stages;
	const activeCopy = matrixCopy[matrixKind];
	useEffect(() => {
		const refreshMilestones = () => setMilestoneConfigs(readMilestoneConfigs());
		refreshMilestones();
		window.addEventListener("focus", refreshMilestones);
		window.addEventListener("storage", refreshMilestones);
		window.addEventListener(ACQUISITION_MILESTONES_UPDATED_EVENT, refreshMilestones);
		return () => {
			window.removeEventListener("focus", refreshMilestones);
			window.removeEventListener("storage", refreshMilestones);
			window.removeEventListener(ACQUISITION_MILESTONES_UPDATED_EVENT, refreshMilestones);
		};
	}, []);
	const filtered = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return privateProperties.filter((property) => {
			if (project !== "TODOS" && property.project !== project) return false;
			if (period !== "TODOS" && property.period !== period) return false;
			if (stage !== "TODAS" && activeStages[currentStageFor(property, matrixKind, activeStages.length)].label !== stage) return false;
			if (status !== "TODOS" && statusFor(property, matrixKind) !== status) return false;
			if (modality !== "TODAS" && secondaryValueFor(property, matrixKind) !== modality) return false;
			if (responsible !== "TODOS" && property.responsible !== responsible) return false;
			if (normalizedQuery && !`${property.code} ${property.owner}`.toLowerCase().includes(normalizedQuery)) return false;
			return true;
		});
	}, [
		activeStages,
		matrixKind,
		modality,
		period,
		project,
		query,
		responsible,
		stage,
		status
	]);
	const closed = filtered.filter((property) => statusFor(property, matrixKind) === "Cerrado").length;
	const observed = filtered.filter((property) => statusFor(property, matrixKind) === "Observado").length;
	const atRisk = filtered.filter((property) => statusFor(property, matrixKind) === "En riesgo").length;
	const averageProgress = filtered.length ? filtered.reduce((sum, property) => sum + progressFor(property, matrixKind, runtime), 0) / filtered.length : 0;
	const averageProcessDays = filtered.length ? filtered.reduce((sum, property) => sum + processDaysFor(property, matrixKind, runtime), 0) / filtered.length : 0;
	const activeFilterCount = [
		project !== "TODOS",
		period !== "TODOS",
		Boolean(query.trim()),
		stage !== "TODAS",
		status !== "TODOS",
		modality !== "TODAS",
		responsible !== "TODOS"
	].filter(Boolean).length;
	function clearFilters() {
		setProject("TODOS");
		setPeriod("TODOS");
		setQuery("");
		setStage("TODAS");
		setStatus("TODOS");
		setModality("TODAS");
		setResponsible("TODOS");
	}
	function changeMatrix(nextMatrix) {
		setMatrixKind(nextMatrix);
		setStage("TODAS");
		setStatus("TODOS");
		setModality("TODAS");
		setSelected(null);
	}
	function printMatrix() {
		const previousTitle = document.title;
		document.title = `${activeCopy.title} - ${runtime.processName}`;
		window.print();
		window.setTimeout(() => {
			document.title = previousTitle;
		}, 0);
	}
	const processDaysTone = (property) => {
		const days = processDaysFor(property, matrixKind, runtime);
		const target = processTargetDaysFor(runtime);
		if (days > target) return "destructive";
		if (days >= target * .8) return "warning";
		if (statusFor(property, matrixKind) === "Cerrado") return "success";
		return "primary";
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Eye,
			titulo: "Seguimiento de predios por etapas",
			descripcion: "Coordinadores · Matriz operativa para identificar la etapa actual, las brechas y el motivo de cada situación.",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: printMatrix,
				disabled: !filtered.length,
				children: [/* @__PURE__ */ jsx(Printer, {}), " Imprimir matriz"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => void exportPrivatePropertiesExcel(filtered, matrixKind, runtime),
				disabled: !filtered.length,
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar matriz"]
			})] })
		}),
		/* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-1.5 text-xs text-warning",
			children: "Datos de demostración 2026: los predios y sus fechas no provienen de un servicio."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Filtros de la matriz",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				activeFilterCount > 0 && /* @__PURE__ */ jsxs(StatusBadge, {
					tono: "primary",
					children: [activeFilterCount, " activos"]
				}),
				activeFilterCount > 0 && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: clearFilters,
					children: [/* @__PURE__ */ jsx(FilterX, {}), " Limpiar filtros"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					"aria-expanded": filtersOpen,
					onClick: () => setFiltersOpen((current) => !current),
					children: [filtersOpen ? "Ocultar filtros" : "Mostrar filtros", /* @__PURE__ */ jsx(ChevronDown, { className: filtersOpen ? "rotate-180" : "" })]
				})
			] }),
			children: filtersOpen ? /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4 2xl:grid-cols-7",
				children: [
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Proyecto",
						value: project,
						onChange: setProject,
						options: Array.from(new Set(privateProperties.map((item) => item.project))),
						allValue: "TODOS",
						allLabel: "Todos"
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Periodo",
						value: period,
						onChange: setPeriod,
						options: ["2026", "2025"],
						allValue: "TODOS",
						allLabel: "Todos"
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
							children: "Código / titular"
						}), /* @__PURE__ */ jsxs("span", {
							className: "relative block",
							children: [/* @__PURE__ */ jsx(Search, {
								size: 16,
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": true
							}), /* @__PURE__ */ jsx("input", {
								type: "search",
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Buscar predio",
								className: `${controlClase} pl-9`
							})]
						})]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Etapa actual",
						value: stage,
						onChange: setStage,
						options: activeStages.map((item) => item.label),
						allValue: "TODAS",
						allLabel: "Todas"
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado",
						value: status,
						onChange: setStatus,
						options: [
							"En plazo",
							"En riesgo",
							"Observado",
							"Cerrado"
						],
						allValue: "TODOS",
						allLabel: "Todos"
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: matrixKind === "predial" ? "Modalidad" : "Expediente",
						value: modality,
						onChange: setModality,
						options: matrixKind === "predial" ? ["Trato directo", "Expropiación"] : privateProperties.map((property) => secondaryValueFor(property, matrixKind)),
						allValue: "TODAS",
						allLabel: "Todas"
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Responsable",
						value: responsible,
						onChange: setResponsible,
						options: responsibles,
						allValue: "TODOS",
						allLabel: "Todos"
					})
				]
			}) : /* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [activeFilterCount > 0 ? `${activeFilterCount} filtros aplicados. ` : "Sin filtros aplicados. ", "Use “Mostrar filtros” para acotar la matriz por proyecto, etapa, estado o responsable."]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			"data-print-matrix": true,
			className: "mb-4 rounded-lg border border-border bg-card",
			"aria-label": activeCopy.title,
			children: [
				/* @__PURE__ */ jsx("div", {
					"data-print-hidden": true,
					className: "border-b border-border px-4 pt-3",
					children: /* @__PURE__ */ jsx(Tabs, {
						value: matrixKind,
						onValueChange: (value) => changeMatrix(value),
						children: /* @__PURE__ */ jsx(TabsList, {
							className: "mb-3",
							children: Object.keys(matrixCopy).map((kind) => /* @__PURE__ */ jsx(TabsTrigger, {
								value: kind,
								children: matrixCopy[kind].tab
							}, kind))
						})
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-start justify-between gap-3 border-b-2 border-primary px-4 py-3",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-bold uppercase text-primary-dark",
						children: activeCopy.title
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: activeCopy.description
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-end gap-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ jsxs(StatusBadge, {
								tono: "primary",
								children: ["Hitos configurados: ", runtime.processName]
							}),
							/* @__PURE__ */ jsxs(StatusBadge, {
								tono: "warning",
								children: [
									"Plazo legal: ",
									processTermFor(runtime),
									" · Hitos: ",
									processTargetDaysFor(runtime),
									" días"
								]
							}),
							/* @__PURE__ */ jsx(Legend, {
								cls: CELL.done,
								label: "Completada"
							}),
							/* @__PURE__ */ jsx(Legend, {
								cls: CELL.current,
								label: "Actual en plazo"
							}),
							/* @__PURE__ */ jsx(Legend, {
								cls: CELL.warning,
								label: "En aviso"
							}),
							/* @__PURE__ */ jsx(Legend, {
								cls: CELL.critical,
								label: "Crítica / observada"
							}),
							/* @__PURE__ */ jsx(Legend, {
								cls: "border border-border bg-card",
								label: "Pendiente"
							}),
							/* @__PURE__ */ jsx(Legend, {
								cls: "border border-highlight bg-warning-soft",
								label: "Plazo objetivo"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					"data-print-scroll": true,
					className: "min-h-[560px] max-h-[calc(100vh-190px)] overflow-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: `${matrixKind === "estado" ? "w-full min-w-[920px]" : "w-max"} border-collapse text-sm`,
						children: [/* @__PURE__ */ jsx("thead", {
							className: "sticky top-0 z-20",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: `${STICKY_TH} left-0 w-48 text-left`,
									children: "Listado de predios"
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: `${STICKY_TH} left-48 w-40 text-center`,
									children: secondaryLabelFor(matrixKind)
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: `${STICKY_TH} left-[22rem] w-28 text-center`,
									children: "Fecha de inicio"
								}),
								activeStages.map((item, stageIndex) => /* @__PURE__ */ jsxs("th", {
									scope: "col",
									className: "relative h-40 w-10 min-w-10 border border-border bg-muted p-0 align-bottom text-foreground",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "absolute left-1/2 top-1 z-10 inline-flex min-w-7 -translate-x-1/2 items-center justify-center rounded-sm border border-highlight bg-warning-soft px-1 text-xs font-semibold normal-case text-warning",
										children: [targetDaysFor(runtime, stageIndex), " d"]
									}), /* @__PURE__ */ jsx("span", {
										className: "absolute bottom-0 left-0 inline-flex h-32 w-10 rotate-180 items-center justify-center px-1 py-2 text-xs font-semibold normal-case leading-tight [writing-mode:vertical-rl]",
										children: item.label
									})]
								}, item.label)),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: `${STICKY_TH} right-32 w-20 text-center`,
									children: "% avance"
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: `${STICKY_TH} right-0 w-32 text-center`,
									children: "Días en proceso"
								})
							] })
						}), /* @__PURE__ */ jsxs("tbody", {
							className: "[&>tr:nth-child(even)]:bg-background",
							children: [filtered.map((property) => /* @__PURE__ */ jsxs("tr", {
								className: "group h-10 hover:bg-primary-soft/40",
								children: [
									/* @__PURE__ */ jsx("th", {
										scope: "row",
										className: `${STICKY_TD} left-0 text-left`,
										children: /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => setSelected({
												property,
												stageIndex: currentStageFor(property, matrixKind, activeStages.length),
												matrixKind
											}),
											className: "flex w-full items-center justify-between gap-2 rounded-sm text-left text-sm font-semibold text-foreground hover:text-primary-dark hover:underline",
											title: `Ver detalle de ${property.code}`,
											children: [/* @__PURE__ */ jsx("span", { children: property.code }), /* @__PURE__ */ jsx(Eye, {
												size: 14,
												className: "text-muted-foreground",
												"aria-hidden": true
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${STICKY_TD} left-48 text-center`,
										children: /* @__PURE__ */ jsx(StatusBadge, {
											tono: matrixKind === "estado" ? "success" : matrixKind === "mejoras" ? "primary" : property.modality === "Trato directo" ? "primary" : "destructive",
											children: secondaryValueFor(property, matrixKind)
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${STICKY_TD} left-[22rem] text-center font-semibold tabular-nums`,
										children: dateForStage(property, 0, matrixKind, runtime)
									}),
									activeStages.map((item, stageIndex) => {
										const condition = stageCondition(property, stageIndex, matrixKind, runtime);
										const timing = stageTimingFor(property, stageIndex, matrixKind, runtime);
										const isCritical = condition === "Etapa actual" && timing.days !== null && timing.days >= runtime.criticalDays[stageIndex];
										const isWarning = condition === "Etapa actual" && timing.days !== null && timing.days >= runtime.warningDays[stageIndex];
										const isObserved = condition === "Etapa actual" && (statusFor(property, matrixKind) === "Observado" || isCritical);
										const cls = condition === "Completada" ? CELL.done : condition === "Etapa actual" ? isObserved ? CELL.critical : isWarning ? CELL.warning : CELL.current : CELL.pending;
										return /* @__PURE__ */ jsx("td", {
											className: "border border-border p-0 text-center",
											children: /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setSelected({
													property,
													stageIndex,
													matrixKind
												}),
												title: `${item.label}: ${condition}. ${stageDaysLabel(property, stageIndex, matrixKind, runtime)}. Aviso: ${runtime.warningDays[stageIndex]} días. Crítico: ${runtime.criticalDays[stageIndex]} días. Plazo objetivo: ${targetDaysFor(runtime, stageIndex)} días`,
												"aria-label": `${property.code}, ${item.label}, ${condition}, ${stageDaysLabel(property, stageIndex, matrixKind, runtime)}, plazo objetivo ${targetDaysFor(runtime, stageIndex)} días`,
												className: `flex size-9 w-full items-center justify-center hover:ring-2 hover:ring-inset hover:ring-primary ${cls}`,
												children: condition === "Completada" ? /* @__PURE__ */ jsx(CheckCircle2, {
													size: 14,
													"aria-hidden": true
												}) : condition === "Etapa actual" ? isObserved ? /* @__PURE__ */ jsx(AlertTriangle, {
													size: 14,
													"aria-hidden": true
												}) : /* @__PURE__ */ jsx(Clock3, {
													size: 14,
													"aria-hidden": true
												}) : /* @__PURE__ */ jsx("span", {
													className: "size-1 rounded-sm bg-border",
													"aria-hidden": true
												})
											})
										}, item.label);
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "sticky right-32 z-10 border border-border bg-primary-soft px-2 py-1 text-center text-sm font-bold tabular-nums text-primary-dark",
										children: [progressFor(property, matrixKind, runtime).toFixed(1), "%"]
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${STICKY_TD} right-0 text-center`,
										children: /* @__PURE__ */ jsx("span", {
											title: `Tiempo transcurrido frente a los ${processTargetDaysFor(runtime)} días configurados para los hitos`,
											children: /* @__PURE__ */ jsxs(StatusBadge, {
												tono: processDaysTone(property),
												children: [
													/* @__PURE__ */ jsx(Clock3, {
														size: 12,
														className: "mr-1",
														"aria-hidden": true
													}),
													" ",
													processDaysFor(property, matrixKind, runtime),
													" días"
												]
											})
										})
									})
								]
							}, property.code)), !filtered.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: activeStages.length + 5,
								className: "px-4 py-12 text-center text-sm text-muted-foreground",
								children: "No existen predios para los filtros seleccionados."
							}) })]
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Resumen de resultados de la matriz",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-6",
				children: [
					/* @__PURE__ */ jsx(Kpi, {
						label: "Predios visibles",
						value: filtered.length,
						detail: `De ${privateProperties.length} predios registrados`
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Avance promedio",
						value: `${averageProgress.toFixed(1)}%`,
						detail: "Porcentaje de etapas alcanzadas",
						tono: "text-primary-dark"
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Tiempo promedio",
						value: `${Math.round(averageProcessDays)} días`,
						detail: `Plazo legal: ${processTermFor(runtime)} · Hitos: ${processTargetDaysFor(runtime)} días`
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "En riesgo",
						value: atRisk,
						detail: "Requieren prioridad",
						tono: "text-warning"
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: matrixKind === "predial" ? "Observados SUNARP" : "Observados",
						value: observed,
						detail: "Por subsanar",
						tono: "text-destructive"
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Cerrados",
						value: closed,
						detail: "Proceso culminado",
						tono: "text-success"
					})
				]
			})
		}),
		selected && /* @__PURE__ */ jsx(StageDetailModal, {
			selected,
			runtime,
			onClose: () => setSelected(null)
		})
	] });
}
function FilterSelect({ label, value, onChange, options, allValue, allLabel }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsxs("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase,
			children: [/* @__PURE__ */ jsx("option", {
				value: allValue,
				children: allLabel
			}), options.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
		})]
	});
}
function Kpi({ label, value, detail, tono = "text-foreground" }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("p", {
				className: `mt-1 text-lg font-semibold tabular-nums ${tono}`,
				children: value
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: detail
			})
		]
	});
}
function Legend({ cls, label }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1.5 whitespace-nowrap",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: `size-3 rounded-sm ${cls}`,
				"aria-hidden": true
			}),
			" ",
			label
		]
	});
}
function StageDetailModal({ selected, runtime, onClose }) {
	const { property, stageIndex, matrixKind } = selected;
	const matrixStages = runtime.stages;
	const currentStage = currentStageFor(property, matrixKind, matrixStages.length);
	const currentStatus = statusFor(property, matrixKind);
	const stage = matrixStages[stageIndex];
	const condition = stageCondition(property, stageIndex, matrixKind, runtime);
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: stage.label,
		descripcion: `${matrixCopy[matrixKind].tab} · ${property.code}`,
		ancho: "lg",
		pie: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cerrar detalle"
		}),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-5",
				children: [
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Condición",
						value: condition,
						tono: conditionTone(condition)
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Inicio de etapa",
						value: dateForStage(property, stageIndex, matrixKind, runtime)
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Tiempo en etapa",
						value: stageDaysLabel(property, stageIndex, matrixKind, runtime),
						tono: condition === "Etapa actual" ? "text-warning" : condition === "Completada" ? "text-success" : "text-foreground"
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Tiempo total",
						value: `${processDaysFor(property, matrixKind, runtime)} días`,
						tono: "text-primary-dark"
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Plazo objetivo",
						value: `${targetDaysFor(runtime, stageIndex)} días`,
						tono: "text-warning"
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Aviso desde",
						value: `${runtime.warningDays[stageIndex]} días`,
						tono: "text-warning"
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Crítico desde",
						value: `${runtime.criticalDays[stageIndex]} días`,
						tono: "text-destructive"
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Meta del proceso",
						value: `${processTermFor(runtime)} · ${processTargetDaysFor(runtime)} días en hitos`
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: matrixKind === "predial" ? "Modalidad" : "Expediente",
						value: secondaryValueFor(property, matrixKind)
					}),
					/* @__PURE__ */ jsx(DetailValue, {
						label: "Responsable",
						value: property.responsible
					})
				]
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "¿Por qué llegó a esta etapa?" }),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: reasonForStage(property, stageIndex, matrixKind, runtime)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-md border border-border bg-muted p-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase text-primary-dark",
						children: "Evidencia requerida"
					}), /* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-sm text-foreground",
						children: [stage.evidence, "."]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "rounded-md border border-border bg-muted p-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase text-primary-dark",
						children: "Siguiente acción"
					}), /* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-sm text-foreground",
						children: [condition === "Pendiente" ? `Primero completar “${matrixStages[currentStage].label}”.` : stage.nextAction.charAt(0).toUpperCase() + stage.nextAction.slice(1), "."]
					})]
				})]
			}),
			/* @__PURE__ */ jsx(Subtitulo, {
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: statusTone[currentStatus],
					children: currentStatus
				}),
				children: "Ficha del predio"
			}),
			/* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(Info$1, {
						label: "Proyecto",
						value: property.project
					}),
					/* @__PURE__ */ jsx(Info$1, {
						label: "Titular",
						value: property.owner
					}),
					/* @__PURE__ */ jsx(Info$1, {
						label: "Etapa actual",
						value: matrixStages[currentStage].label
					}),
					/* @__PURE__ */ jsx(Info$1, {
						label: "Actualización",
						value: updatedAtFor(property, matrixKind)
					})
				]
			}),
			/* @__PURE__ */ jsx(Subtitulo, {
				acciones: /* @__PURE__ */ jsxs(StatusBadge, {
					tono: "neutral",
					children: [
						currentStage + 1,
						" de ",
						matrixStages.length,
						" etapas alcanzadas"
					]
				}),
				children: "Tiempo por cada etapa"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mb-2 text-xs text-muted-foreground",
				children: [
					"Fechas y permanencia acumulada al corte del ",
					updatedAtFor(property, matrixKind),
					"."
				]
			}),
			/* @__PURE__ */ jsx("ol", {
				className: "divide-y divide-border rounded-md border border-border",
				children: matrixStages.map((timelineStage, index) => {
					const timing = stageTimingFor(property, index, matrixKind, runtime);
					const isSelected = index === stageIndex;
					const isCurrent = timing.condition === "Etapa actual";
					const targetDays = targetDaysFor(runtime, index);
					const isLate = timing.days !== null && timing.days > targetDays;
					return /* @__PURE__ */ jsxs("li", {
						"aria-current": isSelected ? "true" : void 0,
						className: `grid grid-cols-[24px_minmax(150px,1fr)] items-center gap-2 px-3 py-2 text-sm sm:grid-cols-[24px_minmax(190px,1.5fr)_110px_200px_115px] ${isSelected ? "bg-primary-soft/40" : ""}`,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: `flex size-6 items-center justify-center rounded-sm text-xs font-bold ${timing.condition === "Completada" ? "bg-success text-primary-foreground" : isCurrent ? currentStatus === "Observado" ? "bg-destructive text-primary-foreground" : "bg-highlight text-foreground" : "bg-muted text-muted-foreground"}`,
								"aria-hidden": true,
								children: timing.condition === "Completada" ? /* @__PURE__ */ jsx(CheckCircle2, { size: 12 }) : index + 1
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("p", {
									className: "truncate font-semibold text-foreground",
									children: timelineStage.label
								}), isSelected && /* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold uppercase text-primary-dark",
									children: "Etapa seleccionada"
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "hidden sm:inline-flex",
								children: /* @__PURE__ */ jsx(StatusBadge, {
									tono: timing.condition === "Completada" ? "success" : isCurrent ? "warning" : "neutral",
									children: timing.condition
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "hidden text-xs text-muted-foreground sm:block",
								children: timing.start && timing.end ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
									/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-foreground",
										children: formatDate(timing.start)
									}),
									" ",
									"al",
									" ",
									/* @__PURE__ */ jsx("span", { children: isCurrent ? `corte ${formatDate(timing.end)}` : formatDate(timing.end) })
								] }) : "Sin iniciar"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "justify-self-end",
								title: `Tiempo real frente al plazo objetivo de ${targetDays} días`,
								children: /* @__PURE__ */ jsx(StatusBadge, {
									tono: timing.days === null ? "neutral" : isLate ? "destructive" : "warning",
									children: timing.days === null ? `Meta ${targetDays} d` : `${timing.days} / ${targetDays} d`
								})
							})
						]
					}, timelineStage.label);
				})
			})
		]
	});
}
function conditionTone(condition) {
	if (condition === "Completada") return "text-success";
	if (condition === "Etapa actual") return "text-warning";
	return "text-foreground";
}
function DetailValue({ label, value, tono = "text-foreground" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-card p-2.5",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: `mt-1 text-sm font-semibold ${tono}`,
			children: value
		})]
	});
}
function Info$1({ label, value }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
		className: "text-xs text-muted-foreground",
		children: label
	}), /* @__PURE__ */ jsx("dd", {
		className: "mt-0.5 font-semibold text-foreground",
		children: value
	})] });
}
async function exportPrivatePropertiesExcel(rows, matrixKind, runtime) {
	const matrixStages = runtime.stages;
	const matrixHeaders = [
		"Código",
		"Proyecto",
		"Periodo",
		"Titular",
		matrixKind === "predial" ? "Modalidad" : "Expediente",
		"Fecha de inicio",
		"Responsable",
		"Etapa actual",
		"Estado",
		...matrixStages.map((stage, index) => `${stage.label} (meta ${targetDaysFor(runtime, index)} días)`),
		"% avance",
		"Última actualización",
		"Días en proceso",
		"Plazo total (días)",
		"Desviación total (días)"
	];
	const matrixData = [excelHeader(matrixHeaders)];
	rows.forEach((property) => {
		matrixData.push([
			{
				value: property.code,
				type: String
			},
			{
				value: property.project,
				type: String
			},
			{
				value: property.period,
				type: String
			},
			{
				value: property.owner,
				type: String
			},
			{
				value: secondaryValueFor(property, matrixKind),
				type: String
			},
			{
				value: dateForStage(property, 0, matrixKind, runtime),
				type: String
			},
			{
				value: property.responsible,
				type: String
			},
			{
				value: matrixStages[currentStageFor(property, matrixKind, matrixStages.length)].label,
				type: String,
				fontWeight: "bold"
			},
			{
				value: statusFor(property, matrixKind),
				type: String
			},
			...matrixStages.map((_, index) => ({
				value: stageCondition(property, index, matrixKind, runtime),
				type: String,
				fontWeight: stageCondition(property, index, matrixKind, runtime) === "Etapa actual" ? "bold" : void 0
			})),
			{
				value: progressFor(property, matrixKind, runtime) / 100,
				type: Number,
				format: "0.00%"
			},
			{
				value: updatedAtFor(property, matrixKind),
				type: String
			},
			{
				value: processDaysFor(property, matrixKind, runtime),
				type: Number,
				fontWeight: "bold"
			},
			{
				value: processTargetDaysFor(runtime),
				type: Number,
				fontWeight: "bold"
			},
			{
				value: processDaysFor(property, matrixKind, runtime) - processTargetDaysFor(runtime),
				type: Number,
				fontWeight: "bold"
			}
		]);
	});
	const detailHeaders = [
		"Código",
		"Proyecto",
		secondaryLabelFor(matrixKind),
		"Etapa",
		"Condición",
		"Fecha de inicio",
		"Fecha fin / corte",
		"Días en etapa",
		"Plazo objetivo (días)",
		"Desviación (días)",
		"Motivo",
		"Evidencia requerida",
		"Siguiente acción",
		"Responsable"
	];
	const detailData = [excelHeader(detailHeaders)];
	rows.forEach((property) => {
		matrixStages.forEach((stage, index) => {
			const timing = stageTimingFor(property, index, matrixKind, runtime);
			detailData.push([
				{
					value: property.code,
					type: String
				},
				{
					value: property.project,
					type: String
				},
				{
					value: secondaryValueFor(property, matrixKind),
					type: String
				},
				{
					value: stage.label,
					type: String
				},
				{
					value: stageCondition(property, index, matrixKind, runtime),
					type: String
				},
				{
					value: timing.start ? formatDate(timing.start) : "Sin iniciar",
					type: String
				},
				{
					value: timing.end ? formatDate(timing.end) : "Sin iniciar",
					type: String
				},
				{
					value: timing.days ?? 0,
					type: Number
				},
				{
					value: targetDaysFor(runtime, index),
					type: Number
				},
				{
					value: timing.days === null ? 0 : timing.days - targetDaysFor(runtime, index),
					type: Number
				},
				{
					value: reasonForStage(property, index, matrixKind, runtime),
					type: String,
					wrap: true
				},
				{
					value: stage.evidence,
					type: String,
					wrap: true
				},
				{
					value: stage.nextAction,
					type: String,
					wrap: true
				},
				{
					value: property.responsible,
					type: String
				}
			]);
		});
	});
	await writeXlsxFile([{
		data: matrixData,
		sheet: matrixKind === "mejoras" ? "Matriz pago de mejoras" : "Matriz de etapas",
		stickyRowsCount: 1,
		orientation: "landscape",
		showGridLines: true,
		columns: matrixHeaders.map((header, index) => ({ width: index < 8 ? Math.min(28, Math.max(14, header.length + 2)) : 18 }))
	}, {
		data: detailData,
		sheet: matrixKind === "mejoras" ? "Detalle pago de mejoras" : "Detalle de etapas",
		stickyRowsCount: 1,
		orientation: "landscape",
		showGridLines: true,
		columns: detailHeaders.map((header) => ({ width: [
			"Motivo",
			"Evidencia requerida",
			"Siguiente acción"
		].includes(header) ? 42 : Math.min(28, Math.max(14, header.length + 2)) }))
	}]).toFile(`seguimiento_${matrixCopy[matrixKind].exportName}_2026_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
	registrarExportacion(`seguimiento_${matrixCopy[matrixKind].exportName}_2026`, "Excel");
}
function excelHeader(headers) {
	return headers.map((header) => ({
		value: header,
		fontWeight: "bold",
		align: "center",
		wrap: true,
		height: 32
	}));
}
//#endregion
export { PrivatePropertiesDashboard as component };
