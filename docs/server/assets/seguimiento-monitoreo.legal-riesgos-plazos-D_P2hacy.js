import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { E as Modal } from "./PredioEncabezado-FhqZ2Jv6.js";
import { a as SheetFooter, i as SheetDescription, n as Sheet$1, o as SheetHeader, r as SheetContent, s as SheetTitle, t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as ChartExplanation } from "./ChartExplanation-0Z95AIWE.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertOctagon, ArrowDownRight, ArrowUpRight, CalendarClock, Download, Eye, FileWarning, FilterX, Gavel, Landmark, RefreshCw, Scale, Search, ShieldAlert, UserRound, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, ReferenceArea, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.legal-riesgos-plazos.tsx?tsr-split=component
var HOY = new Date(2026, 7, 5);
var SERIE = [
	"var(--color-primary)",
	"var(--color-primary-dark)",
	"var(--color-highlight)",
	"var(--color-muted-foreground)",
	"var(--color-border)"
];
var serieColor = (index) => SERIE[index % SERIE.length];
var serieOpacidad = (index) => 1 - Math.floor(index / SERIE.length) * .3;
var TICK = {
	fontSize: 12,
	fill: "var(--color-muted-foreground)"
};
var NIVEL_COLOR = {
	Bajo: "var(--color-success)",
	Moderado: "var(--color-highlight)",
	Alto: "var(--color-warning)",
	Crítico: "var(--color-destructive)"
};
var NIVEL_TONO = {
	Bajo: "success",
	Moderado: "neutral",
	Alto: "warning",
	Crítico: "destructive"
};
var legalConditions = [
	{
		name: "Propietario registral",
		value: 38,
		count: 438
	},
	{
		name: "Documento de fecha cierta",
		value: 12,
		count: 138
	},
	{
		name: "Poseedor",
		value: 14,
		count: 161
	},
	{
		name: "Ocupante",
		value: 9,
		count: 104
	},
	{
		name: "Sucesión",
		value: 8,
		count: 92
	},
	{
		name: "Inmueble no inscrito",
		value: 7,
		count: 81
	},
	{
		name: "Inmueble estatal",
		value: 5,
		count: 58
	},
	{
		name: "Fideicomiso",
		value: 3,
		count: 35
	},
	{
		name: "Propiedad en litigio",
		value: 4,
		count: 46
	}
].map((row, index) => ({
	...row,
	color: serieColor(index),
	opacity: serieOpacidad(index)
}));
var legalCases = [
	{
		name: "Tramo 1",
		complete: 82,
		pending: 24,
		observation: 11,
		opposition: 6,
		litigation: 4,
		consignment: 5,
		expropriation: 8,
		closed: 38
	},
	{
		name: "Tramo 2",
		complete: 74,
		pending: 31,
		observation: 14,
		opposition: 8,
		litigation: 6,
		consignment: 7,
		expropriation: 10,
		closed: 29
	},
	{
		name: "Tramo 3",
		complete: 96,
		pending: 18,
		observation: 9,
		opposition: 3,
		litigation: 2,
		consignment: 4,
		expropriation: 6,
		closed: 47
	},
	{
		name: "Tramo 4",
		complete: 61,
		pending: 38,
		observation: 17,
		opposition: 12,
		litigation: 9,
		consignment: 8,
		expropriation: 13,
		closed: 21
	},
	{
		name: "Tramo 5",
		complete: 88,
		pending: 22,
		observation: 13,
		opposition: 7,
		litigation: 5,
		consignment: 6,
		expropriation: 9,
		closed: 35
	},
	{
		name: "Tramo 6",
		complete: 53,
		pending: 44,
		observation: 19,
		opposition: 14,
		litigation: 11,
		consignment: 9,
		expropriation: 16,
		closed: 17
	},
	{
		name: "Tramo 7",
		complete: 79,
		pending: 27,
		observation: 10,
		opposition: 5,
		litigation: 3,
		consignment: 5,
		expropriation: 7,
		closed: 33
	}
];
var legalCaseSeries = [
	{
		key: "complete",
		name: "Documentación completa"
	},
	{
		key: "pending",
		name: "Documentación pendiente"
	},
	{
		key: "observation",
		name: "Observación"
	},
	{
		key: "opposition",
		name: "Oposición"
	},
	{
		key: "litigation",
		name: "Litigio"
	},
	{
		key: "consignment",
		name: "Consignación"
	},
	{
		key: "expropriation",
		name: "Expropiación"
	},
	{
		key: "closed",
		name: "Cierre"
	}
];
var risks = [
	{
		code: "R-01",
		category: "Legal",
		description: "Controversia de titularidad y doble inscripción",
		probability: 5,
		impact: 5,
		level: "Crítico",
		exposed: 18.4,
		properties: 12,
		days: -9,
		mitigation: "Solicitar cierre registral y medida cautelar",
		owner: "M. Salazar",
		deadline: "27/07/2026",
		status: "Vencido"
	},
	{
		code: "R-02",
		category: "Presupuestal",
		description: "Falta de disponibilidad para consignaciones",
		probability: 4,
		impact: 5,
		level: "Crítico",
		exposed: 15.7,
		properties: 18,
		days: 3,
		mitigation: "Gestionar modificación presupuestal",
		owner: "L. Quispe",
		deadline: "08/08/2026",
		status: "Pendiente"
	},
	{
		code: "R-03",
		category: "Judicial",
		description: "Medida cautelar impide toma de posesión",
		probability: 4,
		impact: 5,
		level: "Crítico",
		exposed: 13.2,
		properties: 6,
		days: -4,
		mitigation: "Impulsar levantamiento de medida",
		owner: "A. Paredes",
		deadline: "01/08/2026",
		status: "Vencido"
	},
	{
		code: "R-04",
		category: "Social",
		description: "Oposición colectiva al empadronamiento",
		probability: 5,
		impact: 4,
		level: "Crítico",
		exposed: 11.8,
		properties: 27,
		days: 5,
		mitigation: "Activar mesa de diálogo territorial",
		owner: "C. Romero",
		deadline: "10/08/2026",
		status: "En mitigación"
	},
	{
		code: "R-05",
		category: "Registral",
		description: "Partidas con área y linderos inconsistentes",
		probability: 4,
		impact: 4,
		level: "Alto",
		exposed: 9.6,
		properties: 21,
		days: 8,
		mitigation: "Tramitar rectificación de área",
		owner: "R. Huamán",
		deadline: "13/08/2026",
		status: "En mitigación"
	},
	{
		code: "R-06",
		category: "Plazos",
		description: "Vencimiento de vigencia de tasaciones",
		probability: 5,
		impact: 3,
		level: "Alto",
		exposed: 8.1,
		properties: 34,
		days: 2,
		mitigation: "Priorizar ofertas y notificaciones",
		owner: "M. Salazar",
		deadline: "07/08/2026",
		status: "Pendiente"
	},
	{
		code: "R-07",
		category: "Sucesorio",
		description: "Herederos no declarados ni ubicados",
		probability: 3,
		impact: 4,
		level: "Alto",
		exposed: 6.9,
		properties: 15,
		days: 12,
		mitigation: "Iniciar consignación judicial",
		owner: "A. Paredes",
		deadline: "17/08/2026",
		status: "Pendiente"
	},
	{
		code: "R-08",
		category: "Documental",
		description: "Documentos de propiedad incompletos",
		probability: 4,
		impact: 3,
		level: "Alto",
		exposed: 5.7,
		properties: 42,
		days: 7,
		mitigation: "Campaña de subsanación documental",
		owner: "C. Romero",
		deadline: "12/08/2026",
		status: "En mitigación"
	},
	{
		code: "R-09",
		category: "Arbitral",
		description: "Pretensión indemnizatoria adicional",
		probability: 3,
		impact: 3,
		level: "Moderado",
		exposed: 4.8,
		properties: 4,
		days: 18,
		mitigation: "Elaborar informe técnico de defensa",
		owner: "L. Quispe",
		deadline: "23/08/2026",
		status: "Pendiente"
	},
	{
		code: "R-10",
		category: "Ocupación",
		description: "Ocupantes posteriores a fecha de corte",
		probability: 4,
		impact: 2,
		level: "Moderado",
		exposed: 3.9,
		properties: 23,
		days: 14,
		mitigation: "Verificación y acta notarial",
		owner: "R. Huamán",
		deadline: "19/08/2026",
		status: "Controlado"
	},
	{
		code: "R-11",
		category: "Administrativo",
		description: "Retraso en emisión de resolución",
		probability: 2,
		impact: 3,
		level: "Moderado",
		exposed: 2.7,
		properties: 11,
		days: 21,
		mitigation: "Seguimiento a circuito de firmas",
		owner: "M. Salazar",
		deadline: "26/08/2026",
		status: "Controlado"
	},
	{
		code: "R-12",
		category: "Notarial",
		description: "Agenda insuficiente para legalizaciones",
		probability: 2,
		impact: 2,
		level: "Bajo",
		exposed: 1.2,
		properties: 9,
		days: 26,
		mitigation: "Ampliar cartera de notarías",
		owner: "C. Romero",
		deadline: "31/08/2026",
		status: "Controlado"
	}
];
var legalRows = [
	{
		code: "PR-001842",
		condition: "Propietario registral",
		passive: "María Elena Rojas",
		occupant: "Mismo sujeto",
		propertyDoc: "Partida 11874290",
		observations: "Título con carga hipotecaria",
		conflict: "Acreedor no notificado",
		proceeding: "Sin proceso",
		consignment: "No aplica",
		owner: "M. Salazar",
		next: "Notificar al acreedor",
		risk: "Moderado",
		deadline: "Próximo",
		budget: "Disponible"
	},
	{
		code: "PR-001873",
		condition: "Poseedor",
		passive: "Comunidad San Jerónimo",
		occupant: "42 familias",
		propertyDoc: "Constancia de posesión",
		observations: "Área comunal sin independizar",
		conflict: "Oposición parcial",
		proceeding: "Exp. 0812-2026",
		consignment: "Pendiente",
		owner: "C. Romero",
		next: "Convocar asamblea",
		risk: "Crítico",
		deadline: "Vencido",
		budget: "Sin disponibilidad"
	},
	{
		code: "PR-001905",
		condition: "Propiedad en litigio",
		passive: "Inversiones del Centro SAC",
		occupant: "Arrendatario comercial",
		propertyDoc: "Partida 11028461",
		observations: "Doble cadena de dominio",
		conflict: "Controversia de titularidad",
		proceeding: "Exp. 1445-2025",
		consignment: "En trámite",
		owner: "L. Quispe",
		next: "Solicitar medida cautelar",
		risk: "Crítico",
		deadline: "Vencido",
		budget: "Sin disponibilidad"
	},
	{
		code: "PR-001927",
		condition: "Sucesión",
		passive: "Sucesión Flores Huamán",
		occupant: "Dos coherederos",
		propertyDoc: "Escritura imperfecta",
		observations: "Herederos no declarados",
		conflict: "Desacuerdo sobre porcentajes",
		proceeding: "Sucesión intestada",
		consignment: "Recomendada",
		owner: "A. Paredes",
		next: "Publicar edicto",
		risk: "Alto",
		deadline: "Próximo",
		budget: "Certificado"
	},
	{
		code: "PR-001944",
		condition: "Inmueble estatal",
		passive: "Municipalidad Distrital Norte",
		occupant: "Comercio informal",
		propertyDoc: "Afectación en uso",
		observations: "Acuerdo de concejo pendiente",
		conflict: "Competencia institucional",
		proceeding: "Sin proceso",
		consignment: "No aplica",
		owner: "R. Huamán",
		next: "Gestionar acuerdo",
		risk: "Alto",
		deadline: "Vigente",
		budget: "No aplica"
	},
	{
		code: "PR-001968",
		condition: "Documento de fecha cierta",
		passive: "José Antonio Medina",
		occupant: "Mismo sujeto",
		propertyDoc: "Contrato privado 1998",
		observations: "Falta tracto registral",
		conflict: "Ninguno",
		proceeding: "Sin proceso",
		consignment: "No aplica",
		owner: "M. Salazar",
		next: "Validar fecha cierta",
		risk: "Bajo",
		deadline: "Vigente",
		budget: "Disponible"
	},
	{
		code: "PR-001991",
		condition: "Propietario registral",
		passive: "Agrícola Santa Ana SRL",
		occupant: "Ocupante precario",
		propertyDoc: "Partida 11296744",
		observations: "Ocupación posterior al corte",
		conflict: "Desalojo pendiente",
		proceeding: "Exp. 0921-2026",
		consignment: "No aplica",
		owner: "C. Romero",
		next: "Realizar constatación",
		risk: "Alto",
		deadline: "Próximo",
		budget: "Certificado"
	},
	{
		code: "PR-002014",
		condition: "Inmueble no inscrito",
		passive: "Rosa Milagros Chávez",
		occupant: "No identificado",
		propertyDoc: "Sin documento",
		observations: "Sujeto pasivo no ubicado",
		conflict: "Posesión informal",
		proceeding: "Sin proceso",
		consignment: "Por iniciar",
		owner: "A. Paredes",
		next: "Publicar convocatoria",
		risk: "Crítico",
		deadline: "Vencido",
		budget: "Sin disponibilidad"
	},
	{
		code: "PR-002037",
		condition: "Fideicomiso",
		passive: "Consorcio Vial Andino",
		occupant: "Operador logístico",
		propertyDoc: "Partida 11903072",
		observations: "Requiere autorización fiduciaria",
		conflict: "Tasación impugnada",
		proceeding: "Arbitraje 044-2026",
		consignment: "Pendiente",
		owner: "L. Quispe",
		next: "Contestar arbitraje",
		risk: "Crítico",
		deadline: "Vencido",
		budget: "Disponible"
	},
	{
		code: "PR-002058",
		condition: "Propietario registral",
		passive: "Comunidad Campesina Central",
		occupant: "Comuneros calificados",
		propertyDoc: "Partida 11004538",
		observations: "Padrón comunal actualizado",
		conflict: "Ninguno",
		proceeding: "Sin proceso",
		consignment: "No aplica",
		owner: "R. Huamán",
		next: "Presentar título",
		risk: "Bajo",
		deadline: "Vigente",
		budget: "Pagado"
	}
];
var scheduleEvents = [
	{
		date: "05 Ago",
		type: "Publicación",
		code: "PR-002014",
		owner: "A. Paredes",
		status: "overdue",
		days: -3
	},
	{
		date: "06 Ago",
		type: "Empadronamiento",
		code: "Tramo II",
		owner: "C. Romero",
		status: "soon",
		days: 1
	},
	{
		date: "07 Ago",
		type: "Calificación",
		code: "PR-001927",
		owner: "M. Salazar",
		status: "soon",
		days: 2
	},
	{
		date: "08 Ago",
		type: "Tasación",
		code: "PR-001842",
		owner: "L. Quispe",
		status: "done",
		days: 0
	},
	{
		date: "10 Ago",
		type: "Notificación",
		code: "PR-001873",
		owner: "C. Romero",
		status: "blocked",
		days: 5
	},
	{
		date: "12 Ago",
		type: "Respuesta a oferta",
		code: "PR-001905",
		owner: "A. Paredes",
		status: "overdue",
		days: -6
	},
	{
		date: "14 Ago",
		type: "Resolución",
		code: "PR-001944",
		owner: "R. Huamán",
		status: "soon",
		days: 9
	},
	{
		date: "17 Ago",
		type: "Pago",
		code: "PR-001968",
		owner: "M. Salazar",
		status: "done",
		days: 0
	},
	{
		date: "20 Ago",
		type: "Entrega",
		code: "PR-001991",
		owner: "C. Romero",
		status: "soon",
		days: 15
	},
	{
		date: "22 Ago",
		type: "Consignación",
		code: "PR-002037",
		owner: "L. Quispe",
		status: "blocked",
		days: 17
	},
	{
		date: "25 Ago",
		type: "Presentación de título",
		code: "PR-002058",
		owner: "R. Huamán",
		status: "done",
		days: 0
	},
	{
		date: "28 Ago",
		type: "Subsanación",
		code: "PR-002081",
		owner: "A. Paredes",
		status: "soon",
		days: 23
	}
];
var MESES = [
	"Ene",
	"Feb",
	"Mar",
	"Abr",
	"May",
	"Jun",
	"Jul",
	"Ago",
	"Sep",
	"Oct",
	"Nov",
	"Dic"
];
/** "27/07/2026" a Date local. */
function parseFecha(value) {
	const [day, month, year] = value.split("/").map(Number);
	return new Date(year, month - 1, day);
}
/** "05 Ago" a Date del año de corte; los hitos vencidos (días negativos) se desplazan según `days`. */
function fechaHito(event) {
	const [day, mes] = event.date.split(" ");
	const base = new Date(HOY.getFullYear(), MESES.indexOf(mes), Number(day));
	if (event.status === "overdue") base.setDate(base.getDate() + event.days);
	return base;
}
var defaultFilters = {
	project: "TODOS",
	condition: "TODAS",
	procedure: "TODOS",
	risk: "TODOS",
	owner: "TODOS",
	deadline: "TODOS",
	start: "2026-01-01",
	end: "2026-12-31"
};
function money(value, digits = 1) {
	return `S/ ${value.toLocaleString("es-PE", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	})} MM`;
}
function LegalRiesgosPage() {
	const [filters, setFilters] = useState(defaultFilters);
	const [legalSearch, setLegalSearch] = useState("");
	const [riskSearch, setRiskSearch] = useState("");
	const [selectedLegal, setSelectedLegal] = useState(null);
	const [selectedRisk, setSelectedRisk] = useState(null);
	const [showCriticalAlert, setShowCriticalAlert] = useState(true);
	const [updatedAt, setUpdatedAt] = useState("05/08/2026 11:34");
	const filteredLegal = useMemo(() => legalRows.filter((row) => {
		if (filters.condition !== "TODAS" && row.condition !== filters.condition) return false;
		if (filters.risk !== "TODOS" && row.risk !== filters.risk) return false;
		if (filters.owner !== "TODOS" && row.owner !== filters.owner) return false;
		if (filters.deadline !== "TODOS" && row.deadline !== filters.deadline) return false;
		const query = legalSearch.trim().toLowerCase();
		return !query || `${row.code} ${row.passive} ${row.occupant}`.toLowerCase().includes(query);
	}), [filters, legalSearch]);
	const filteredRisks = risks.filter((row) => !riskSearch.trim() || `${row.code} ${row.category} ${row.description}`.toLowerCase().includes(riskSearch.toLowerCase()));
	const scale = Math.max(.1, filteredLegal.length / legalRows.length) * (filters.project === "TODOS" ? 1 : .68) * (filters.procedure === "TODOS" ? 1 : .76);
	const cards = [
		{
			label: "Sujetos pasivos identificados",
			value: Math.round(1153 * scale).toString(),
			note: "96.1% de la cartera",
			trend: 3.4
		},
		{
			label: "Ocupantes identificados",
			value: Math.round(287 * scale).toString(),
			note: "Incluye ocupación informal",
			trend: 5.2
		},
		{
			label: "Documentación incompleta",
			value: Math.max(1, Math.round(126 * scale)).toString(),
			note: "10.5% de la cartera",
			trend: -6.7
		},
		{
			label: "Predios en litigio",
			value: Math.max(1, Math.round(46 * scale)).toString(),
			note: "18 en proceso judicial",
			trend: 4.1
		},
		{
			label: "Oposiciones de terceros",
			value: Math.max(1, Math.round(38 * scale)).toString(),
			note: "Requieren pronunciamiento",
			trend: -3.2
		},
		{
			label: "Consignaciones pendientes",
			value: Math.max(1, Math.round(57 * scale)).toString(),
			note: "S/ 21.4 MM expuestos",
			trend: 7.8
		},
		{
			label: "Plazos próximos a vencer",
			value: Math.max(1, Math.round(31 * scale)).toString(),
			note: "Dentro de 15 días",
			trend: 9.1
		},
		{
			label: "Plazos vencidos",
			value: Math.max(1, Math.round(19 * scale)).toString(),
			note: "Atención inmediata",
			trend: -4.8
		},
		{
			label: "Riesgos críticos",
			value: Math.max(1, Math.round(12 * scale)).toString(),
			note: "S/ 59.1 MM expuestos",
			trend: 2.6
		}
	];
	const topRiskData = risks.slice(0, 10).map((row) => ({
		...row,
		label: `${row.level} · ${money(row.exposed)} · ${row.properties} predios · ${row.days < 0 ? `${Math.abs(row.days)}d vencido` : `${row.days}d restantes`}`
	}));
	function update(key, value) {
		setFilters((current) => ({
			...current,
			[key]: value
		}));
	}
	function reset() {
		setFilters(defaultFilters);
		setLegalSearch("");
		setRiskSearch("");
	}
	function exportLegal() {
		const header = "codigo,condicion_juridica,sujeto_pasivo,ocupante,documento,observaciones,conflicto,proceso,consignacion,responsable,accion_siguiente\n";
		const rows = filteredLegal.map((row) => [
			row.code,
			row.condition,
			row.passive,
			row.occupant,
			row.propertyDoc,
			row.observations,
			row.conflict,
			row.proceeding,
			row.consignment,
			row.owner,
			row.next
		].map((cell) => `"${cell}"`).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([
			"﻿",
			header,
			rows
		], { type: "text/csv;charset=utf-8" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "dashboard_legal_riesgos.csv";
		link.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Scale,
			titulo: "Situación legal, riesgos y plazos",
			descripcion: `Control de condiciones jurídicas, contingencias, mitigaciones y vencimientos de la gestión predial. Última actualización: ${updatedAt}.`,
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: reset,
				children: [/* @__PURE__ */ jsx(FilterX, {}), " Restablecer filtros"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: exportLegal,
				children: [/* @__PURE__ */ jsx(Download, {}), " Exportar tabla legal"]
			})] })
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: "Datos de demostración. Las cifras de este tablero son de muestra y no provienen de un sistema real; los plazos se calculan con fecha de corte 05/08/2026."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Alcance legal y de riesgos",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: () => setUpdatedAt("05/08/2026 11:49"),
				children: [/* @__PURE__ */ jsx(RefreshCw, {}), " Actualizar información"]
			}),
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8",
				children: [
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Proyecto",
						value: filters.project,
						onChange: (v) => update("project", v),
						options: [
							"TODOS",
							"Carretera Central",
							"Evitamiento Chimbote",
							"Aeropuerto de Jauja"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Condición jurídica",
						value: filters.condition,
						onChange: (v) => update("condition", v),
						options: ["TODAS", ...legalConditions.map((row) => row.name)]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Tipo de procedimiento",
						value: filters.procedure,
						onChange: (v) => update("procedure", v),
						options: [
							"TODOS",
							"Trato directo",
							"Expropiación",
							"Consignación",
							"Transferencia"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Nivel de riesgo",
						value: filters.risk,
						onChange: (v) => update("risk", v),
						options: [
							"TODOS",
							"Bajo",
							"Moderado",
							"Alto",
							"Crítico"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Responsable legal",
						value: filters.owner,
						onChange: (v) => update("owner", v),
						options: [
							"TODOS",
							"M. Salazar",
							"C. Romero",
							"L. Quispe",
							"A. Paredes",
							"R. Huamán"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado del plazo",
						value: filters.deadline,
						onChange: (v) => update("deadline", v),
						options: [
							"TODOS",
							"Vigente",
							"Próximo",
							"Vencido",
							"Bloqueado"
						]
					}),
					/* @__PURE__ */ jsx(DateFilter, {
						label: "Fecha inicio",
						value: filters.start,
						onChange: (v) => update("start", v)
					}),
					/* @__PURE__ */ jsx(DateFilter, {
						label: "Fecha fin",
						value: filters.end,
						onChange: (v) => update("end", v)
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Indicadores legales",
			className: "mb-4",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-9",
				children: cards.map((card) => /* @__PURE__ */ jsx(KpiCard, { ...card }, card.label))
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Afectados por condición jurídica",
			subtitle: "Cada segmento indica qué proporción de afectados corresponde a propietarios, poseedores, ocupantes u otras condiciones jurídicas. Seleccione una condición para filtrar la tabla legal.",
			icon: /* @__PURE__ */ jsx(Users, { size: 16 }),
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid items-center gap-4 md:grid-cols-[1fr_1.05fr]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
						width: "100%",
						height: 315,
						children: /* @__PURE__ */ jsxs(PieChart, { children: [/* @__PURE__ */ jsx(Pie, {
							data: legalConditions,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 65,
							outerRadius: 103,
							paddingAngle: 2,
							children: legalConditions.map((row) => /* @__PURE__ */ jsx(Cell, {
								fill: row.color,
								fillOpacity: row.opacity
							}, row.name))
						}), /* @__PURE__ */ jsx(Tooltip, { formatter: (value, _name, item) => [`${value}% · ${item.payload.count} afectados`, item.payload.name] })] })
					}), /* @__PURE__ */ jsxs("div", {
						className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs uppercase text-muted-foreground",
							children: "Afectados"
						}), /* @__PURE__ */ jsx("b", {
							className: "text-lg tabular-nums",
							children: "1,153"
						})]
					})]
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-1",
					children: legalConditions.map((row) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => update("condition", row.name),
						className: "flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-sm hover:bg-muted",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("i", {
								className: "size-2.5 rounded-sm",
								style: {
									background: row.color,
									opacity: row.opacity
								},
								"aria-hidden": true
							}), row.name]
						}), /* @__PURE__ */ jsx("b", {
							className: "tabular-nums",
							children: row.count
						})]
					}) }, row.name))
				})]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Casos legales por tramo",
			subtitle: "Compara por ámbito cuántos casos tienen documentación completa, observaciones, oposición, litigio, consignación, expropiación o cierre.",
			icon: /* @__PURE__ */ jsx(Landmark, { size: 16 }),
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 340,
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: legalCases,
					margin: {
						left: 5,
						right: 12,
						top: 10
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "var(--color-border)",
							strokeDasharray: "3 3",
							vertical: false
						}),
						/* @__PURE__ */ jsx(XAxis, {
							dataKey: "name",
							tick: TICK,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ jsx(YAxis, {
							tick: TICK,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ jsx(Tooltip, {}),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						legalCaseSeries.map((serie, index) => /* @__PURE__ */ jsx(Bar, {
							dataKey: serie.key,
							name: serie.name,
							stackId: "a",
							fill: serieColor(index),
							fillOpacity: serieOpacidad(index)
						}, serie.key))
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Matriz de riesgos 5 × 5",
			subtitle: "Los riesgos más cercanos a la esquina superior derecha son los más críticos; el tamaño del punto representa el monto expuesto. Seleccione un punto para abrir la ficha.",
			icon: /* @__PURE__ */ jsx(ShieldAlert, { size: 16 }),
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 420,
				children: /* @__PURE__ */ jsxs(ScatterChart, {
					margin: {
						left: 8,
						right: 28,
						top: 18,
						bottom: 15
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, { stroke: "var(--color-border)" }),
						/* @__PURE__ */ jsx(ReferenceArea, {
							x1: .5,
							x2: 2.5,
							y1: .5,
							y2: 2.5,
							fill: "var(--color-success-soft)",
							fillOpacity: .9
						}),
						/* @__PURE__ */ jsx(ReferenceArea, {
							x1: 2.5,
							x2: 4.5,
							y1: .5,
							y2: 3.5,
							fill: "var(--color-warning-soft)",
							fillOpacity: .9
						}),
						/* @__PURE__ */ jsx(ReferenceArea, {
							x1: .5,
							x2: 3.5,
							y1: 2.5,
							y2: 5.5,
							fill: "var(--color-highlight)",
							fillOpacity: .18
						}),
						/* @__PURE__ */ jsx(ReferenceArea, {
							x1: 3.5,
							x2: 5.5,
							y1: 3.5,
							y2: 5.5,
							fill: "var(--color-destructive-soft)",
							fillOpacity: .9
						}),
						/* @__PURE__ */ jsx(XAxis, {
							type: "number",
							dataKey: "probability",
							name: "Probabilidad",
							domain: [.5, 5.5],
							ticks: [
								1,
								2,
								3,
								4,
								5
							],
							tickFormatter: (v) => [
								"",
								"Muy baja",
								"Baja",
								"Media",
								"Alta",
								"Muy alta"
							][v],
							tick: TICK
						}),
						/* @__PURE__ */ jsx(YAxis, {
							type: "number",
							dataKey: "impact",
							name: "Impacto",
							domain: [.5, 5.5],
							ticks: [
								1,
								2,
								3,
								4,
								5
							],
							tickFormatter: (v) => [
								"",
								"Menor",
								"Bajo",
								"Medio",
								"Mayor",
								"Severo"
							][v],
							tick: TICK
						}),
						/* @__PURE__ */ jsx(ZAxis, {
							type: "number",
							dataKey: "exposed",
							range: [120, 760],
							name: "Monto expuesto"
						}),
						/* @__PURE__ */ jsx(Tooltip, { formatter: (value, name) => name === "Monto expuesto" ? money(Number(value)) : value }),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						[
							"Bajo",
							"Moderado",
							"Alto",
							"Crítico"
						].map((level) => /* @__PURE__ */ jsx(Scatter, {
							name: level,
							data: risks.filter((row) => row.level === level),
							fill: NIVEL_COLOR[level],
							onClick: (row) => setSelectedRisk(row),
							cursor: "pointer",
							children: /* @__PURE__ */ jsx(LabelList, {
								dataKey: "code",
								position: "top",
								style: {
									fontSize: 12,
									fill: "var(--color-foreground)",
									fontWeight: 600
								}
							})
						}, level))
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Top 10 riesgos de mayor criticidad",
			subtitle: "Ordena los diez riesgos más críticos y muestra cuánto dinero y cuántos predios comprometen, además del plazo para mitigarlos. Seleccione una barra para abrir la ficha.",
			icon: /* @__PURE__ */ jsx(AlertOctagon, { size: 16 }),
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 420,
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: topRiskData,
					layout: "vertical",
					margin: {
						left: 10,
						right: 245,
						top: 8
					},
					onClick: (state) => {
						if (typeof state?.activeLabel === "string") {
							const row = risks.find((item) => item.code === state.activeLabel);
							if (row) setSelectedRisk(row);
						}
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "var(--color-border)",
							strokeDasharray: "3 3",
							horizontal: false
						}),
						/* @__PURE__ */ jsx(XAxis, {
							type: "number",
							tick: TICK,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ jsx(YAxis, {
							type: "category",
							dataKey: "code",
							width: 48,
							tick: TICK,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => money(Number(value)) }),
						/* @__PURE__ */ jsxs(Bar, {
							dataKey: "exposed",
							name: "Monto expuesto",
							radius: [
								0,
								3,
								3,
								0
							],
							cursor: "pointer",
							children: [/* @__PURE__ */ jsx(LabelList, {
								dataKey: "label",
								position: "right",
								style: {
									fontSize: 12,
									fill: "var(--color-muted-foreground)"
								}
							}), risks.slice(0, 10).map((row) => /* @__PURE__ */ jsx(Cell, { fill: NIVEL_COLOR[row.level] }, row.code))]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Cronograma de vencimientos legales y prediales",
			subtitle: "Ubica cada hito legal en el calendario con su semáforo de plazo: verde dentro de plazo, ámbar por vencer, rojo vencido. Los hitos cumplidos y bloqueados se marcan con su estado.",
			icon: /* @__PURE__ */ jsx(CalendarClock, { size: 16 }),
			children: /* @__PURE__ */ jsx(Schedule, {})
		}),
		/* @__PURE__ */ jsx(LegalTable, {
			rows: filteredLegal,
			search: legalSearch,
			onSearch: setLegalSearch,
			onOpen: setSelectedLegal,
			onExport: exportLegal
		}),
		/* @__PURE__ */ jsx(RiskTable, {
			rows: filteredRisks,
			search: riskSearch,
			onSearch: setRiskSearch,
			onOpen: setSelectedRisk
		}),
		/* @__PURE__ */ jsx(CriticalAlert, {
			abierto: showCriticalAlert,
			onClose: () => setShowCriticalAlert(false),
			onOpen: () => {
				setShowCriticalAlert(false);
				setSelectedLegal(legalRows[2]);
			}
		}),
		/* @__PURE__ */ jsx(LegalDrawer, {
			row: selectedLegal,
			onClose: () => setSelectedLegal(null)
		}),
		/* @__PURE__ */ jsx(RiskDrawer, {
			row: selectedRisk,
			onClose: () => setSelectedRisk(null)
		})
	] });
}
function FilterSelect({ label, value, options, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block truncate text-xs font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ jsx("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase,
			children: options.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
		})]
	});
}
function DateFilter({ label, value, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block text-xs font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ jsx("input", {
			type: "date",
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase
		})]
	});
}
function KpiCard({ label, value, note, trend }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "min-h-8 text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-1 text-lg font-semibold tabular-nums text-foreground",
				children: value
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-1 flex items-center justify-between gap-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx("span", { children: note }), /* @__PURE__ */ jsxs("b", {
					className: `flex items-center tabular-nums ${trend >= 0 ? "text-success" : "text-destructive"}`,
					children: [
						trend >= 0 ? /* @__PURE__ */ jsx(ArrowUpRight, {
							size: 12,
							"aria-hidden": true
						}) : /* @__PURE__ */ jsx(ArrowDownRight, {
							size: 12,
							"aria-hidden": true
						}),
						Math.abs(trend),
						"%"
					]
				})]
			})
		]
	});
}
function Panel({ title, subtitle, icon, children }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: title,
		className: "mb-4",
		acciones: /* @__PURE__ */ jsx("span", {
			className: "text-primary",
			"aria-hidden": true,
			children: icon
		}),
		children: [/* @__PURE__ */ jsx(ChartExplanation, { children: subtitle }), /* @__PURE__ */ jsx("div", {
			className: "mt-3 min-w-0",
			children
		})]
	});
}
function Schedule() {
	return /* @__PURE__ */ jsx("ul", {
		className: "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
		children: scheduleEvents.map((event) => /* @__PURE__ */ jsxs("li", {
			className: `rounded-md border p-3 ${event.status === "overdue" ? "border-destructive bg-destructive-soft" : event.status === "blocked" ? "border-foreground bg-muted" : "border-border bg-card"}`,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("b", {
						className: "block text-sm",
						children: event.type
					}), /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: event.code
					})] }), /* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold text-muted-foreground",
						children: event.date
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-2",
					children: event.status === "done" ? /* @__PURE__ */ jsxs(StatusBadge, {
						tono: "success",
						children: ["Cumplido el ", event.date]
					}) : event.status === "blocked" ? /* @__PURE__ */ jsxs(StatusBadge, {
						tono: "neutral",
						children: ["Bloqueado · previsto ", event.date]
					}) : /* @__PURE__ */ jsx(PlazoBadge, {
						vence: fechaHito(event),
						hoy: HOY
					})
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "mt-2 flex items-center gap-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx(UserRound, {
						size: 12,
						"aria-hidden": true
					}), event.owner]
				})
			]
		}, `${event.date}-${event.type}`))
	});
}
function TableHeader({ subtitle, search, onSearch, action }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-3 flex flex-wrap items-center justify-between gap-2",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: subtitle
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsx(Search, {
					size: 16,
					className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("input", {
					value: search,
					onChange: (event) => onSearch(event.target.value),
					placeholder: "Buscar",
					"aria-label": "Buscar en la tabla",
					className: `${controlClase} w-64 pl-8`
				})]
			}), action]
		})]
	});
}
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
function LegalTable({ rows, search, onSearch, onOpen, onExport }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Tabla legal de predios",
		className: "mb-4",
		children: [/* @__PURE__ */ jsx(TableHeader, {
			subtitle: "Condición jurídica, conflictos, procesos y acciones siguientes.",
			search,
			onSearch,
			action: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: onExport,
				children: [/* @__PURE__ */ jsx(Download, {}), " Exportar tabla"]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1650px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [[
					"Código",
					"Condición jurídica",
					"Sujeto pasivo",
					"Ocupante",
					"Documento de propiedad",
					"Observaciones",
					"Conflicto identificado",
					"Proceso judicial/arbitral",
					"Consignación",
					"Responsable",
					"Acción siguiente",
					"Riesgo"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: head
				}, head)), /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: /* @__PURE__ */ jsx("span", {
						className: "sr-only",
						children: "Acciones"
					})
				})] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 13,
						className: "px-3 py-8 text-center text-sm text-muted-foreground",
						children: "No hay predios para los filtros seleccionados."
					}) }), rows.map((row) => /* @__PURE__ */ jsxs("tr", {
						className: "h-10 border-t border-border",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-semibold text-primary-dark",
								children: row.code
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.condition
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-medium",
								children: row.passive
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.occupant
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.propertyDoc
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.observations
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.conflict
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.proceeding
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.consignment
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.owner
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-semibold",
								children: row.next
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-1",
									children: [/* @__PURE__ */ jsx(StatusBadge, {
										tono: NIVEL_TONO[row.risk],
										children: row.risk
									}), /* @__PURE__ */ jsxs(StatusBadge, {
										tono: plazoTono(row.deadline),
										children: ["Plazo ", row.deadline.toLowerCase()]
									})]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									className: "size-8",
									"aria-label": `Ver ficha legal de ${row.code}`,
									title: "Ver ficha legal",
									onClick: () => onOpen(row),
									children: /* @__PURE__ */ jsx(Eye, {})
								})
							})
						]
					}, row.code))]
				})]
			})
		})]
	});
}
function plazoTono(deadline) {
	return deadline === "Vencido" ? "destructive" : deadline === "Próximo" ? "warning" : deadline === "Bloqueado" ? "neutral" : "success";
}
function RiskTable({ rows, search, onSearch, onOpen }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Tabla de riesgos y mitigaciones",
		className: "mb-4",
		children: [/* @__PURE__ */ jsx(TableHeader, {
			subtitle: "Exposición, responsables, plazos y estado de las medidas.",
			search,
			onSearch
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1420px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [[
					"Código",
					"Categoría",
					"Descripción",
					"Probabilidad",
					"Impacto",
					"Criticidad",
					"Monto expuesto",
					"Medida de mitigación",
					"Responsable",
					"Fecha límite",
					"Estado"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: head
				}, head)), /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: /* @__PURE__ */ jsx("span", {
						className: "sr-only",
						children: "Acciones"
					})
				})] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 12,
						className: "px-3 py-8 text-center text-sm text-muted-foreground",
						children: "No hay riesgos que coincidan con la búsqueda."
					}) }), rows.map((row) => /* @__PURE__ */ jsxs("tr", {
						className: "h-10 border-t border-border",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-semibold",
								children: row.code
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.category
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-medium",
								children: row.description
							}),
							/* @__PURE__ */ jsxs("td", {
								className: "px-3 py-2 tabular-nums",
								children: [row.probability, "/5"]
							}),
							/* @__PURE__ */ jsxs("td", {
								className: "px-3 py-2 tabular-nums",
								children: [row.impact, "/5"]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsx(StatusBadge, {
									tono: NIVEL_TONO[row.level],
									children: row.level
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-semibold tabular-nums",
								children: money(row.exposed)
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.mitigation
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: row.owner
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsx(PlazoBadge, {
									vence: parseFecha(row.deadline),
									hoy: HOY
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsx(StatusBadge, {
									tono: estadoRiesgoTono(row.status),
									children: row.status
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									className: "size-8",
									"aria-label": `Ver ficha del riesgo ${row.code}`,
									title: "Ver ficha de riesgo",
									onClick: () => onOpen(row),
									children: /* @__PURE__ */ jsx(Eye, {})
								})
							})
						]
					}, row.code))]
				})]
			})
		})]
	});
}
function estadoRiesgoTono(status) {
	if (status === "Vencido" || status === "Bloqueado") return "destructive";
	if (status === "Pendiente") return "warning";
	if (status === "Controlado") return "success";
	return "primary";
}
function CriticalAlert({ abierto, onClose, onOpen }) {
	return /* @__PURE__ */ jsxs(Modal, {
		abierto,
		onCerrar: onClose,
		titulo: "Alerta legal crítica de atención inmediata",
		descripcion: "Se detectaron predios con tres condiciones críticas simultáneas.",
		ancho: "sm",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Revisar después"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: onOpen,
			children: [/* @__PURE__ */ jsx(Gavel, {}), " Abrir ficha crítica"]
		})] }),
		children: [/* @__PURE__ */ jsxs("div", {
			role: "alert",
			className: "rounded-md border border-destructive bg-destructive-soft p-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-sm font-semibold text-destructive",
				children: [/* @__PURE__ */ jsx(AlertOctagon, {
					size: 16,
					"aria-hidden": true
				}), " PR-001905 · Inversiones del Centro SAC"]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ jsx(StatusBadge, {
						tono: "destructive",
						children: "Riesgo crítico"
					}),
					/* @__PURE__ */ jsx(StatusBadge, {
						tono: "destructive",
						children: "Plazo vencido"
					}),
					/* @__PURE__ */ jsx(StatusBadge, {
						tono: "destructive",
						children: "Sin presupuesto"
					})
				]
			})]
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: "Acción requerida: solicitar medida cautelar, gestionar disponibilidad presupuestal y escalar el caso al comité de riesgos."
		})]
	});
}
function LegalDrawer({ row, onClose }) {
	const fields = row ? [
		["Sujeto pasivo", row.passive],
		["Condición jurídica", row.condition],
		["Ocupante", row.occupant],
		["Documento de propiedad", row.propertyDoc],
		["Observaciones", row.observations],
		["Conflicto identificado", row.conflict],
		["Proceso judicial o arbitral", row.proceeding],
		["Consignación", row.consignment],
		["Responsable", row.owner],
		["Acción siguiente", row.next],
		["Riesgo y plazo", /* @__PURE__ */ jsxs("span", {
			className: "flex flex-wrap gap-1",
			children: [/* @__PURE__ */ jsx(StatusBadge, {
				tono: NIVEL_TONO[row.risk],
				children: row.risk
			}), /* @__PURE__ */ jsxs(StatusBadge, {
				tono: plazoTono(row.deadline),
				children: ["Plazo ", row.deadline.toLowerCase()]
			})]
		}, "riesgo")],
		["Presupuesto", row.budget]
	] : [];
	return /* @__PURE__ */ jsx(Drawer, {
		abierto: row !== null,
		title: row?.code ?? "",
		subtitle: "Ficha legal y trazabilidad del predio",
		fields,
		onClose,
		icon: /* @__PURE__ */ jsx(Gavel, {
			size: 18,
			"aria-hidden": true
		})
	});
}
function RiskDrawer({ row, onClose }) {
	const fields = row ? [
		["Categoría", row.category],
		["Descripción", row.description],
		["Probabilidad / impacto", `${row.probability}/5 · ${row.impact}/5`],
		["Criticidad", /* @__PURE__ */ jsx(StatusBadge, {
			tono: NIVEL_TONO[row.level],
			children: row.level
		}, "nivel")],
		["Monto expuesto", money(row.exposed)],
		["Predios afectados", row.properties],
		["Medida de mitigación", row.mitigation],
		["Responsable", row.owner],
		["Fecha límite", /* @__PURE__ */ jsx(PlazoBadge, {
			vence: parseFecha(row.deadline),
			hoy: HOY
		}, "plazo")],
		["Estado", /* @__PURE__ */ jsx(StatusBadge, {
			tono: estadoRiesgoTono(row.status),
			children: row.status
		}, "estado")]
	] : [];
	return /* @__PURE__ */ jsx(Drawer, {
		abierto: row !== null,
		title: row ? `${row.code} · ${row.level}` : "",
		subtitle: "Ficha de riesgo y medida de mitigación",
		fields,
		onClose,
		icon: /* @__PURE__ */ jsx(ShieldAlert, {
			size: 18,
			"aria-hidden": true
		})
	});
}
function Drawer({ abierto, title, subtitle, fields, onClose, icon }) {
	return /* @__PURE__ */ jsx(Sheet$1, {
		open: abierto,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsxs(SheetContent, {
			className: "flex w-full flex-col gap-0 overflow-y-auto bg-card p-0 sm:max-w-lg",
			children: [
				/* @__PURE__ */ jsxs(SheetHeader, {
					className: "border-b border-border px-4 py-3 text-left",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "flex items-center gap-2 text-xs font-semibold uppercase text-primary",
							children: [icon, " Detalle legal y de riesgo"]
						}),
						/* @__PURE__ */ jsx(SheetTitle, {
							className: "text-xl font-semibold text-primary-dark",
							children: title
						}),
						/* @__PURE__ */ jsx(SheetDescription, {
							className: "text-xs",
							children: subtitle
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 p-4",
					children: [/* @__PURE__ */ jsx("dl", {
						className: "rounded-md border border-border",
						children: fields.map(([label, value]) => /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-[10rem_1fr] gap-2 border-b border-border px-3 py-2 text-sm last:border-0",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "text-muted-foreground",
								children: label
							}), /* @__PURE__ */ jsx("dd", {
								className: "font-semibold",
								children: value
							})]
						}, label))
					}), /* @__PURE__ */ jsxs("p", {
						role: "status",
						className: "mt-4 rounded-md border border-warning bg-warning-soft p-3 text-xs text-warning",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2 font-semibold",
							children: [/* @__PURE__ */ jsx(FileWarning, {
								size: 14,
								"aria-hidden": true
							}), " Seguimiento obligatorio"]
						}), /* @__PURE__ */ jsx("span", {
							className: "mt-1 block",
							children: "Registre evidencia y actualice la fecha comprometida después de ejecutar la siguiente acción."
						})]
					})]
				}),
				/* @__PURE__ */ jsx(SheetFooter, {
					className: "border-t border-border p-3",
					children: /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: onClose,
						children: "Cerrar ficha"
					})
				})
			]
		})
	});
}
//#endregion
export { LegalRiesgosPage as component };
