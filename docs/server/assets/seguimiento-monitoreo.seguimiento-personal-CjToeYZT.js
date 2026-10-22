import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as SheetDescription, n as Sheet$1, o as SheetHeader, r as SheetContent, s as SheetTitle, t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowDownAZ, BriefcaseBusiness, CheckCircle2, ChevronLeft, ChevronRight, Clock3, FileSpreadsheet, Printer, RotateCcw, Search, Target, TrendingUp, UserCheck, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart as LineChart$1, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.seguimiento-personal.tsx?tsr-split=component
var SERIE = [
	"var(--color-primary)",
	"var(--color-primary-dark)",
	"var(--color-highlight)",
	"var(--color-muted-foreground)",
	"var(--color-border)"
];
var TICK = {
	fontSize: 12,
	fill: "var(--color-muted-foreground)"
};
var MONTHS = [
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
var TABS = [
	"Resumen",
	"Especialistas",
	"Participación",
	"Productividad",
	"Carga de Trabajo",
	"Análisis"
];
var ACTIVITY_TYPES = [
	"Diagnóstico técnico-legal",
	"Estudio de títulos",
	"Elaboración de expedientes",
	"Tasaciones",
	"Trato directo",
	"Expropiaciones",
	"Gestión social",
	"Inscripción registral",
	"Atención de observaciones",
	"Seguimiento de pagos",
	"Elaboración de informes"
];
var SPECIALISTS = [
	{
		id: "sp-01",
		name: "María Elena Salazar Rojas",
		initials: "MS",
		profession: "Abogada",
		specialty: "Adquisición predial",
		team: "Equipo Legal",
		coordination: "Coordinación Predial Aeropuertos 02",
		supervisor: "Marcos Soto Luis",
		project: "Jauja",
		role: "Especialista legal",
		joined: "15/03/2021",
		monthly: [
			8,
			9,
			10,
			7,
			11,
			9,
			12,
			10,
			13,
			11,
			9,
			12
		],
		assigned: 142,
		inProgress: 13,
		pending: 7,
		observed: 4,
		overdue: 2,
		properties: 48,
		files: 39,
		averageDays: 7
	},
	{
		id: "sp-02",
		name: "Carlos Alberto Mendoza Peña",
		initials: "CM",
		profession: "Abogado",
		specialty: "Saneamiento legal",
		team: "Equipo Legal",
		coordination: "Coordinación Predial Aeropuertos 02",
		supervisor: "Marcos Soto Luis",
		project: "Jauja",
		role: "Especialista legal",
		joined: "08/07/2020",
		monthly: [
			6,
			7,
			8,
			9,
			8,
			10,
			7,
			9,
			8,
			10,
			11,
			9
		],
		assigned: 130,
		inProgress: 16,
		pending: 8,
		observed: 7,
		overdue: 3,
		properties: 42,
		files: 36,
		averageDays: 9
	},
	{
		id: "sp-03",
		name: "Rosa Milagros Huamán Torres",
		initials: "RH",
		profession: "Abogada",
		specialty: "Derecho registral",
		team: "Equipo Legal",
		coordination: "Coordinación Predial Aeropuertos 02",
		supervisor: "Marcos Soto Luis",
		project: "Jauja",
		role: "Especialista registral",
		joined: "12/01/2022",
		monthly: [
			5,
			6,
			5,
			7,
			8,
			6,
			9,
			8,
			7,
			9,
			8,
			10
		],
		assigned: 115,
		inProgress: 17,
		pending: 9,
		observed: 6,
		overdue: 4,
		properties: 35,
		files: 41,
		averageDays: 10
	},
	{
		id: "sp-04",
		name: "Luis Fernando Quispe Ramos",
		initials: "LQ",
		profession: "Ingeniero",
		specialty: "Catastro",
		team: "Equipo Técnico",
		coordination: "Coordinación Predial Aeropuertos 02",
		supervisor: "Joel Lázaro Anaya",
		project: "Jauja",
		role: "Especialista técnico",
		joined: "04/11/2019",
		monthly: [
			10,
			11,
			12,
			9,
			13,
			12,
			14,
			13,
			12,
			15,
			13,
			14
		],
		assigned: 176,
		inProgress: 14,
		pending: 6,
		observed: 4,
		overdue: 1,
		properties: 67,
		files: 31,
		averageDays: 6
	},
	{
		id: "sp-05",
		name: "Ana Sofía Paredes Vega",
		initials: "AP",
		profession: "Arquitecta",
		specialty: "Edificaciones",
		team: "Equipo Técnico",
		coordination: "Coordinación Predial Aeropuertos 02",
		supervisor: "Joel Lázaro Anaya",
		project: "Jauja",
		role: "Especialista técnico",
		joined: "20/05/2021",
		monthly: [
			7,
			8,
			9,
			8,
			10,
			11,
			9,
			12,
			10,
			11,
			12,
			10
		],
		assigned: 148,
		inProgress: 18,
		pending: 7,
		observed: 5,
		overdue: 2,
		properties: 54,
		files: 34,
		averageDays: 8
	},
	{
		id: "sp-06",
		name: "Jorge Raúl Cárdenas León",
		initials: "JC",
		profession: "Ingeniero",
		specialty: "Topografía",
		team: "Equipo Técnico",
		coordination: "Coordinación Predial Vial 01",
		supervisor: "Rafael Palomino Rojas",
		project: "Piura",
		role: "Especialista topográfico",
		joined: "16/09/2018",
		monthly: [
			8,
			7,
			9,
			10,
			9,
			8,
			11,
			10,
			12,
			9,
			10,
			11
		],
		assigned: 151,
		inProgress: 20,
		pending: 10,
		observed: 3,
		overdue: 3,
		properties: 59,
		files: 28,
		averageDays: 8
	},
	{
		id: "sp-07",
		name: "Patricia del Pilar Núñez Soto",
		initials: "PN",
		profession: "Especialista social",
		specialty: "Gestión social",
		team: "Equipo Social",
		coordination: "Coordinación Predial Aeropuertos 02",
		supervisor: "Verónica Castro Medina",
		project: "Jauja",
		role: "Especialista social",
		joined: "10/02/2020",
		monthly: [
			6,
			5,
			7,
			8,
			7,
			9,
			8,
			10,
			9,
			8,
			10,
			11
		],
		assigned: 126,
		inProgress: 18,
		pending: 11,
		observed: 4,
		overdue: 3,
		properties: 46,
		files: 22,
		averageDays: 9
	},
	{
		id: "sp-08",
		name: "Miguel Ángel Rojas Silva",
		initials: "MR",
		profession: "Especialista social",
		specialty: "Relacionamiento comunitario",
		team: "Equipo Social",
		coordination: "Coordinación Predial Vial 01",
		supervisor: "Verónica Castro Medina",
		project: "Piura",
		role: "Gestor social",
		joined: "07/06/2022",
		monthly: [
			4,
			5,
			6,
			5,
			7,
			6,
			8,
			7,
			9,
			8,
			7,
			9
		],
		assigned: 108,
		inProgress: 21,
		pending: 13,
		observed: 5,
		overdue: 5,
		properties: 39,
		files: 18,
		averageDays: 12
	},
	{
		id: "sp-09",
		name: "Cecilia Vargas Medina",
		initials: "CV",
		profession: "Administrativa",
		specialty: "Control documental",
		team: "Equipo Administrativo",
		coordination: "Coordinación Predial Aeropuertos 02",
		supervisor: "Silvia Rivas Flores",
		project: "Jauja",
		role: "Analista administrativa",
		joined: "18/10/2021",
		monthly: [
			9,
			8,
			10,
			9,
			11,
			10,
			12,
			11,
			10,
			13,
			12,
			11
		],
		assigned: 158,
		inProgress: 16,
		pending: 8,
		observed: 6,
		overdue: 2,
		properties: 31,
		files: 76,
		averageDays: 5
	},
	{
		id: "sp-10",
		name: "Diego Alonso Chávez Luna",
		initials: "DC",
		profession: "Técnico",
		specialty: "Archivo predial",
		team: "Equipo Administrativo",
		coordination: "Coordinación Predial Aeropuertos 02",
		supervisor: "Silvia Rivas Flores",
		project: "Jauja",
		role: "Técnico administrativo",
		joined: "03/04/2023",
		monthly: [
			5,
			4,
			6,
			5,
			7,
			6,
			5,
			8,
			7,
			6,
			8,
			7
		],
		assigned: 104,
		inProgress: 19,
		pending: 12,
		observed: 7,
		overdue: 6,
		properties: 28,
		files: 63,
		averageDays: 11
	},
	{
		id: "sp-11",
		name: "Fernando Iván Valdivia Cruz",
		initials: "FV",
		profession: "Ingeniero",
		specialty: "Tasaciones",
		team: "Equipo Técnico",
		coordination: "Coordinación Predial Sur",
		supervisor: "Nelson Gutiérrez Minchola",
		project: "Tacna",
		role: "Perito tasador",
		joined: "22/08/2019",
		monthly: [
			7,
			9,
			8,
			10,
			11,
			9,
			12,
			11,
			10,
			12,
			13,
			12
		],
		assigned: 156,
		inProgress: 15,
		pending: 7,
		observed: 8,
		overdue: 3,
		properties: 52,
		files: 37,
		averageDays: 8
	},
	{
		id: "sp-12",
		name: "Lucía Esperanza Castro Díaz",
		initials: "LC",
		profession: "Abogada",
		specialty: "Expropiaciones",
		team: "Equipo Legal",
		coordination: "Coordinación Predial Sur",
		supervisor: "Nelson Gutiérrez Minchola",
		project: "Tacna",
		role: "Especialista legal",
		joined: "11/12/2020",
		monthly: [
			5,
			7,
			6,
			8,
			7,
			9,
			8,
			9,
			10,
			8,
			9,
			10
		],
		assigned: 124,
		inProgress: 18,
		pending: 8,
		observed: 5,
		overdue: 4,
		properties: 38,
		files: 33,
		averageDays: 10
	}
];
var DEFAULT_FILTERS = {
	project: "Jauja",
	profession: "TODOS",
	specialty: "TODOS",
	team: "TODOS",
	coordination: "TODOS",
	supervisor: "TODOS",
	year: "2026",
	month: "6"
};
var PROJECT_MONTHLY_GOALS = {
	Jauja: [
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		24,
		25,
		25,
		26,
		27
	],
	Piura: [
		6,
		6,
		7,
		7,
		7,
		8,
		8,
		8,
		9,
		9,
		9,
		10
	],
	Tacna: [
		6,
		7,
		7,
		7,
		8,
		8,
		8,
		9,
		9,
		9,
		10,
		10
	]
};
function annualProduction(item) {
	return item.monthly.reduce((sum, value) => sum + value, 0);
}
function completedForPeriod(item, month) {
	return month === "TODOS" ? annualProduction(item) : item.monthly[Number(month)] ?? 0;
}
function assignedForPeriod(item, month) {
	return month === "TODOS" ? item.assigned : Math.ceil(item.assigned / 12);
}
function liberatedForMonth(item, monthIndex) {
	return Math.round((item.monthly[monthIndex] ?? 0) * {
		"Equipo Legal": .3,
		"Equipo Técnico": .35,
		"Equipo Social": .2,
		"Equipo Administrativo": .1
	}[item.team]);
}
function liberatedForPeriod(item, month) {
	if (month !== "TODOS") return liberatedForMonth(item, Number(month));
	return Math.min(item.properties, MONTHS.reduce((sum, _label, monthIndex) => sum + liberatedForMonth(item, monthIndex), 0));
}
function projectGoalForPeriod(project, month) {
	const goals = PROJECT_MONTHLY_GOALS[project] ?? [];
	return month === "TODOS" ? goals.reduce((sum, value) => sum + value, 0) : goals[Number(month)] ?? 0;
}
function projectLiberatedForPeriod(project, month) {
	return SPECIALISTS.filter((item) => item.project === project).reduce((sum, item) => sum + liberatedForPeriod(item, month), 0);
}
function compliance(item, month) {
	const assigned = assignedForPeriod(item, month);
	return assigned ? Math.min(100, completedForPeriod(item, month) / assigned * 100) : 0;
}
/** Semáforo de cumplimiento: el color siempre acompaña a la etiqueta. */
function complianceTone(value, overdue = 0) {
	if (value < 50 || overdue >= 5) return {
		label: "Crítico",
		tono: "destructive",
		bar: "bg-destructive",
		text: "text-destructive",
		color: "var(--color-destructive)"
	};
	if (value < 70) return {
		label: "Alto",
		tono: "warning",
		bar: "bg-warning",
		text: "text-warning",
		color: "var(--color-warning)"
	};
	if (value < 90) return {
		label: "En riesgo",
		tono: "warning",
		bar: "bg-highlight",
		text: "text-warning",
		color: "var(--color-highlight)"
	};
	return {
		label: "Cumple",
		tono: "success",
		bar: "bg-success",
		text: "text-success",
		color: "var(--color-success)"
	};
}
function unique(values) {
	return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}
function heatClass(value) {
	if (value === 0) return "bg-card text-muted-foreground";
	if (value <= 5) return "bg-warning-soft text-warning";
	if (value <= 8) return "bg-primary-soft text-primary-dark";
	return "bg-success-soft text-success";
}
function participationValue(item, activityIndex) {
	return (item.name.length + activityIndex * 5 + item.id.charCodeAt(item.id.length - 1)) % 8;
}
function xmlEscape(value) {
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function exportExcel(items, month) {
	const sheet = (name, rows) => `
    <Worksheet ss:Name="${xmlEscape(name)}"><Table>${rows.map((row) => `<Row>${row.map((cell) => `<Cell><Data ss:Type="${typeof cell === "number" ? "Number" : "String"}">${xmlEscape(cell)}</Data></Cell>`).join("")}</Row>`).join("")}</Table></Worksheet>`;
	const summary = [
		["Indicador", "Valor"],
		["Especialistas", items.length],
		["Actividades asignadas", items.reduce((sum, item) => sum + assignedForPeriod(item, month), 0)],
		["Actividades concluidas", items.reduce((sum, item) => sum + completedForPeriod(item, month), 0)],
		["Predios liberados", items.reduce((sum, item) => sum + liberatedForPeriod(item, month), 0)],
		["Actividades vencidas", items.reduce((sum, item) => sum + item.overdue, 0)]
	];
	const productivity = [[
		"Especialista",
		"Proyecto",
		...MONTHS,
		"Total actividades",
		"Predios liberados",
		"Meta del proyecto",
		"Aporte individual %"
	], ...items.map((item) => {
		const goal = projectGoalForPeriod(item.project, month);
		const liberated = liberatedForPeriod(item, month);
		return [
			item.name,
			item.project,
			...item.monthly,
			annualProduction(item),
			liberated,
			goal,
			goal ? Number((liberated / goal * 100).toFixed(2)) : 0
		];
	})];
	const workload = [[
		"Especialista",
		"Asignadas",
		"Concluidas",
		"En proceso",
		"Pendientes",
		"Observadas",
		"Vencidas",
		"Predios liberados"
	], ...items.map((item) => [
		item.name,
		item.assigned,
		annualProduction(item),
		item.inProgress,
		item.pending,
		item.observed,
		item.overdue,
		liberatedForPeriod(item, month)
	])];
	const activities = [[
		"Especialista",
		"Proyecto",
		"Actividad",
		"Estado",
		"Avance"
	], ...items.flatMap((item) => ACTIVITY_TYPES.slice(0, 4).map((activity, index) => [
		item.name,
		item.project,
		activity,
		index === 0 ? "Concluido" : index === 3 ? "Vencido" : "En proceso",
		index === 0 ? 100 : 35 + index * 15
	]))];
	const alerts = [[
		"Especialista",
		"Proyecto",
		"Vencidas",
		"Recomendación"
	], ...items.filter((item) => item.overdue > 2).map((item) => [
		item.name,
		item.project,
		item.overdue,
		"Reprogramar y priorizar actividades críticas"
	])];
	const workbook = `<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">${sheet("Resumen", summary)}${sheet("Productividad por Especialista", productivity)}${sheet("Actividades Detalladas", activities)}${sheet("Carga de Trabajo", workload)}${sheet("Alertas", alerts)}</Workbook>`;
	const url = URL.createObjectURL(new Blob([workbook], { type: "application/vnd.ms-excel" }));
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = "seguimiento_personal.xls";
	anchor.click();
	URL.revokeObjectURL(url);
}
function SeguimientoPersonalPage() {
	const [tab, setTab] = useState("Resumen");
	const [filters, setFilters] = useState(DEFAULT_FILTERS);
	const [focusId, setFocusId] = useState(null);
	const [detailId, setDetailId] = useState(null);
	const [search, setSearch] = useState("");
	const [sortDesc, setSortDesc] = useState(true);
	const [page, setPage] = useState(0);
	const options = useMemo(() => ({
		project: unique(SPECIALISTS.map((item) => item.project)),
		profession: unique(SPECIALISTS.map((item) => item.profession)),
		specialty: unique(SPECIALISTS.map((item) => item.specialty)),
		team: unique(SPECIALISTS.map((item) => item.team)),
		coordination: unique(SPECIALISTS.map((item) => item.coordination)),
		supervisor: unique(SPECIALISTS.map((item) => item.supervisor))
	}), []);
	const filtered = useMemo(() => SPECIALISTS.filter((item) => {
		if (filters.project !== "TODOS" && item.project !== filters.project) return false;
		if (filters.profession !== "TODOS" && item.profession !== filters.profession) return false;
		if (filters.specialty !== "TODOS" && item.specialty !== filters.specialty) return false;
		if (filters.team !== "TODOS" && item.team !== filters.team) return false;
		if (filters.coordination !== "TODOS" && item.coordination !== filters.coordination) return false;
		if (filters.supervisor !== "TODOS" && item.supervisor !== filters.supervisor) return false;
		return true;
	}), [filters]);
	const visible = focusId ? filtered.filter((item) => item.id === focusId) : filtered;
	const selected = SPECIALISTS.find((item) => item.id === detailId) ?? null;
	const totalAssigned = visible.reduce((sum, item) => sum + assignedForPeriod(item, filters.month), 0);
	const totalCompleted = visible.reduce((sum, item) => sum + completedForPeriod(item, filters.month), 0);
	const totalPending = visible.reduce((sum, item) => sum + item.pending, 0);
	const totalOverdue = visible.reduce((sum, item) => sum + item.overdue, 0);
	const averageCompliance = visible.length ? visible.reduce((sum, item) => sum + compliance(item, filters.month), 0) / visible.length : 0;
	const totalLiberated = visible.reduce((sum, item) => sum + liberatedForPeriod(item, filters.month), 0);
	const totalProjectGoal = unique(visible.map((item) => item.project)).reduce((sum, project) => sum + projectGoalForPeriod(project, filters.month), 0);
	const contributionToGoal = totalProjectGoal ? totalLiberated / totalProjectGoal * 100 : 0;
	const ranking = [...filtered].sort((a, b) => completedForPeriod(b, filters.month) - completedForPeriod(a, filters.month)).slice(0, 10);
	const rankingMax = Math.max(...ranking.map((item) => completedForPeriod(item, filters.month)), 1);
	const evolution = MONTHS.map((month, monthIndex) => ({
		month,
		legal: filtered.filter((item) => item.team === "Equipo Legal").reduce((sum, item) => sum + item.monthly[monthIndex], 0),
		tecnico: filtered.filter((item) => item.team === "Equipo Técnico").reduce((sum, item) => sum + item.monthly[monthIndex], 0),
		social: filtered.filter((item) => item.team === "Equipo Social").reduce((sum, item) => sum + item.monthly[monthIndex], 0),
		administrativo: filtered.filter((item) => item.team === "Equipo Administrativo").reduce((sum, item) => sum + item.monthly[monthIndex], 0),
		meta: Math.max(12, Math.round(filtered.length * 7.5))
	}));
	const workload = visible.slice(0, 10).map((item) => ({
		name: item.name.split(" ").slice(0, 2).join(" "),
		concluidas: completedForPeriod(item, filters.month),
		proceso: item.inProgress,
		pendientes: item.pending,
		observadas: item.observed,
		vencidas: item.overdue
	}));
	const scatter = visible.map((item) => ({
		name: item.name,
		assigned: assignedForPeriod(item, filters.month),
		completed: completedForPeriod(item, filters.month),
		properties: item.properties,
		color: complianceTone(compliance(item, filters.month), item.overdue).color
	}));
	const teamSummary = options.team.map((team) => {
		const members = filtered.filter((item) => item.team === team);
		const assigned = members.reduce((sum, item) => sum + assignedForPeriod(item, filters.month), 0);
		const completed = members.reduce((sum, item) => sum + completedForPeriod(item, filters.month), 0);
		return {
			team: team.replace("Equipo ", ""),
			specialists: members.length,
			assigned,
			completed,
			productivity: members.length ? completed / members.length : 0,
			compliance: assigned ? completed / assigned * 100 : 0,
			workload: members.length ? assigned / members.length : 0,
			overdue: members.reduce((sum, item) => sum + item.overdue, 0),
			averageDays: members.length ? members.reduce((sum, item) => sum + item.averageDays, 0) / members.length : 0
		};
	});
	const matrixRows = [...visible].filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sortDesc ? annualProduction(b) - annualProduction(a) : a.name.localeCompare(b.name));
	const pageCount = Math.max(1, Math.ceil(matrixRows.length / 8));
	const paginatedRows = matrixRows.slice(page * 8, page * 8 + 8);
	const updateFilter = (key, value) => {
		setFilters((current) => ({
			...current,
			[key]: value
		}));
		setFocusId(null);
		setPage(0);
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Users,
			titulo: "Seguimiento del personal",
			descripcion: "Carga de trabajo, productividad y cumplimiento de especialistas prediales.",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => exportExcel(filtered, filters.month),
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar a Excel"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => window.print(),
				children: [/* @__PURE__ */ jsx(Printer, {}), " Imprimir reporte"]
			})] })
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: "Datos de demostración. Las cifras de este tablero son de muestra y no provienen de un sistema real."
		}),
		/* @__PURE__ */ jsx(Tabs, {
			value: tab,
			onValueChange: (value) => setTab(value),
			className: "mb-4",
			children: /* @__PURE__ */ jsx(TabsList, {
				className: "h-auto flex-wrap",
				children: TABS.map((item) => /* @__PURE__ */ jsx(TabsTrigger, {
					value: item,
					children: item
				}, item))
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Filtros del periodo",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => {
					setFilters(DEFAULT_FILTERS);
					setFocusId(null);
				},
				children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Restablecer filtros"]
			}),
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8",
				children: [
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Proyecto",
						value: filters.project,
						options: options.project,
						onChange: (value) => updateFilter("project", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Profesión",
						value: filters.profession,
						options: options.profession,
						onChange: (value) => updateFilter("profession", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Especialidad",
						value: filters.specialty,
						options: options.specialty,
						onChange: (value) => updateFilter("specialty", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Equipo",
						value: filters.team,
						options: options.team,
						onChange: (value) => updateFilter("team", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Coordinación",
						value: filters.coordination,
						options: options.coordination,
						onChange: (value) => updateFilter("coordination", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Responsable",
						value: filters.supervisor,
						options: options.supervisor,
						onChange: (value) => updateFilter("supervisor", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Año",
						value: filters.year,
						options: [
							"2026",
							"2025",
							"2024"
						],
						includeAll: false,
						onChange: (value) => updateFilter("year", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Mes",
						value: filters.month,
						options: MONTHS.map((month, index) => ({
							label: month,
							value: String(index)
						})),
						onChange: (value) => updateFilter("month", value)
					})
				]
			}), focusId && /* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mt-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm",
				children: [/* @__PURE__ */ jsxs("span", { children: [
					"Vista filtrada por especialista:",
					" ",
					/* @__PURE__ */ jsx("b", { children: SPECIALISTS.find((item) => item.id === focusId)?.name })
				] }), /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => setFocusId(null),
					children: "Ver todo el equipo"
				})]
			})]
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Indicadores del periodo",
			className: "mb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8",
				children: [
					/* @__PURE__ */ jsx(KpiCard, {
						icon: Users,
						label: "Especialistas activos",
						value: visible.length,
						trend: "+1 vs. mes anterior"
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: BriefcaseBusiness,
						label: "Actividades asignadas",
						value: totalAssigned,
						trend: "+6.4%"
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: CheckCircle2,
						label: "Actividades concluidas",
						value: totalCompleted,
						trend: "+8.2%"
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: Clock3,
						label: "Actividades pendientes",
						value: totalPending,
						trend: "-3.1%"
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: AlertTriangle,
						label: "Actividades vencidas",
						value: totalOverdue,
						trend: "Requiere atención"
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: Target,
						label: "Cumplimiento promedio",
						value: `${averageCompliance.toFixed(1)}%`,
						trend: "+4.5 pp",
						tone: complianceTone(averageCompliance)
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: TrendingUp,
						label: "Productividad promedio",
						value: visible.length ? (totalCompleted / visible.length).toFixed(1) : "0",
						trend: "Actividades / persona"
					}),
					/* @__PURE__ */ jsx(KpiCard, {
						icon: UserCheck,
						label: "Predios liberados",
						value: totalLiberated,
						trend: `${contributionToGoal.toFixed(1)}% de la meta del proyecto`,
						tone: complianceTone(contributionToGoal)
					})
				]
			})
		}),
		(tab === "Resumen" || tab === "Especialistas" || tab === "Productividad") && /* @__PURE__ */ jsx(ProfessionalContributionPanel, {
			items: visible,
			month: filters.month,
			onOpen: setDetailId
		}),
		tab === "Resumen" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Panel, {
				title: "Ranking de productividad",
				subtitle: "Seleccione un especialista para analizarlo.",
				children: /* @__PURE__ */ jsx("ol", {
					className: "space-y-2",
					children: ranking.map((item, index) => {
						const value = completedForPeriod(item, filters.month);
						return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => {
								setFocusId(item.id);
								setDetailId(item.id);
							},
							className: "grid w-full grid-cols-[1.5rem_minmax(150px,1fr)_2fr_3rem] items-center gap-2 rounded-md text-left text-sm hover:bg-muted",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-center font-semibold text-muted-foreground",
									children: index + 1
								}),
								/* @__PURE__ */ jsx("span", {
									className: "truncate font-medium text-foreground",
									children: item.name
								}),
								/* @__PURE__ */ jsx("span", {
									className: "h-4 overflow-hidden rounded-sm bg-muted",
									"aria-hidden": true,
									children: /* @__PURE__ */ jsx("span", {
										className: "block h-full rounded-sm bg-primary",
										style: { width: `${value / rankingMax * 100}%` }
									})
								}),
								/* @__PURE__ */ jsx("b", {
									className: "text-right tabular-nums",
									children: value
								})
							]
						}) }, item.id);
					})
				})
			}),
			/* @__PURE__ */ jsx(Panel, {
				title: "Evolución mensual de productividad",
				subtitle: "Producción por equipo comparada con la meta de coordinación.",
				children: /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 285,
					children: /* @__PURE__ */ jsxs(LineChart$1, {
						data: evolution,
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: "var(--color-border)",
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "month",
								tick: TICK
							}),
							/* @__PURE__ */ jsx(YAxis, { tick: TICK }),
							/* @__PURE__ */ jsx(Tooltip, {}),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
							/* @__PURE__ */ jsx(Line, {
								dataKey: "legal",
								name: "Legal",
								stroke: SERIE[0],
								strokeWidth: 2
							}),
							/* @__PURE__ */ jsx(Line, {
								dataKey: "tecnico",
								name: "Técnico",
								stroke: SERIE[1],
								strokeWidth: 2
							}),
							/* @__PURE__ */ jsx(Line, {
								dataKey: "social",
								name: "Social",
								stroke: SERIE[2],
								strokeWidth: 2
							}),
							/* @__PURE__ */ jsx(Line, {
								dataKey: "administrativo",
								name: "Administrativo",
								stroke: SERIE[3],
								strokeWidth: 2
							}),
							/* @__PURE__ */ jsx(Line, {
								dataKey: "meta",
								name: "Meta",
								stroke: SERIE[3],
								strokeDasharray: "5 4",
								strokeOpacity: .6
							})
						]
					})
				})
			}),
			/* @__PURE__ */ jsx(AlertsPanel, {
				items: visible,
				month: filters.month,
				onOpen: setDetailId
			})
		] }),
		tab === "Especialistas" && /* @__PURE__ */ jsx(SpecialistsDirectory, {
			items: matrixRows,
			month: filters.month,
			search,
			onSearch: (value) => {
				setSearch(value);
				setPage(0);
			},
			onOpen: setDetailId
		}),
		tab === "Productividad" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(TeamCards, { teams: teamSummary }), /* @__PURE__ */ jsx(ProductivityMatrix, {
			items: paginatedRows,
			search,
			onSearch: (value) => {
				setSearch(value);
				setPage(0);
			},
			sortDesc,
			onSort: () => setSortDesc((value) => !value),
			onOpen: setDetailId,
			paginacion: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-end gap-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						className: "size-8",
						"aria-label": "Página anterior",
						disabled: page === 0,
						onClick: () => setPage((value) => Math.max(0, value - 1)),
						children: /* @__PURE__ */ jsx(ChevronLeft, {})
					}),
					/* @__PURE__ */ jsxs("span", { children: [
						"Página ",
						page + 1,
						" de ",
						pageCount
					] }),
					/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						className: "size-8",
						"aria-label": "Página siguiente",
						disabled: page >= pageCount - 1,
						onClick: () => setPage((value) => Math.min(pageCount - 1, value + 1)),
						children: /* @__PURE__ */ jsx(ChevronRight, {})
					})
				]
			})
		})] }),
		tab === "Participación" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(ParticipationOverview, { items: visible }), /* @__PURE__ */ jsx(ParticipationMatrix, {
			items: visible,
			onOpen: setDetailId
		})] }),
		tab === "Carga de Trabajo" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Panel, {
			title: "Carga de trabajo por especialista",
			subtitle: "Distribución de actividades según su estado.",
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 360,
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: workload,
					layout: "vertical",
					margin: { left: 26 },
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "var(--color-border)",
							strokeDasharray: "3 3",
							horizontal: false
						}),
						/* @__PURE__ */ jsx(XAxis, {
							type: "number",
							tick: TICK
						}),
						/* @__PURE__ */ jsx(YAxis, {
							type: "category",
							dataKey: "name",
							width: 110,
							tick: TICK
						}),
						/* @__PURE__ */ jsx(Tooltip, {}),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "concluidas",
							name: "Concluidas",
							stackId: "a",
							fill: SERIE[0]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "proceso",
							name: "En proceso",
							stackId: "a",
							fill: SERIE[1]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "pendientes",
							name: "Pendientes",
							stackId: "a",
							fill: SERIE[2]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "observadas",
							name: "Observadas",
							stackId: "a",
							fill: SERIE[3]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "vencidas",
							name: "Vencidas",
							stackId: "a",
							fill: SERIE[4]
						})
					]
				})
			})
		}), /* @__PURE__ */ jsx(Panel, {
			title: "Carga versus productividad",
			subtitle: "El tamaño representa la cantidad de predios asignados; el color sigue el semáforo de cumplimiento.",
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 360,
				children: /* @__PURE__ */ jsxs(ScatterChart, {
					margin: {
						left: 8,
						right: 22,
						bottom: 14
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "var(--color-border)",
							strokeDasharray: "3 3"
						}),
						/* @__PURE__ */ jsx(XAxis, {
							type: "number",
							dataKey: "assigned",
							name: "Asignadas",
							tick: TICK,
							label: {
								value: "Actividades asignadas",
								position: "bottom",
								fontSize: 12,
								fill: "var(--color-muted-foreground)"
							}
						}),
						/* @__PURE__ */ jsx(YAxis, {
							type: "number",
							dataKey: "completed",
							name: "Concluidas",
							tick: TICK
						}),
						/* @__PURE__ */ jsx(ZAxis, {
							type: "number",
							dataKey: "properties",
							range: [70, 320]
						}),
						/* @__PURE__ */ jsx(Tooltip, { cursor: { strokeDasharray: "3 3" } }),
						/* @__PURE__ */ jsx(Scatter, {
							data: scatter,
							children: scatter.map((item) => /* @__PURE__ */ jsx(Cell, { fill: item.color }, item.name))
						})
					]
				})
			})
		})] }),
		tab === "Análisis" && /* @__PURE__ */ jsx(AnalysisPanel, {
			rows: teamSummary,
			evolution
		}),
		/* @__PURE__ */ jsx(SpecialistDrawer, {
			item: selected,
			month: filters.month,
			onClose: () => setDetailId(null)
		})
	] });
}
function FilterSelect({ label, value, options, onChange, includeAll = true }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block truncate text-xs font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ jsxs("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase,
			children: [includeAll && /* @__PURE__ */ jsx("option", {
				value: "TODOS",
				children: "Todos"
			}), options.map((option) => {
				const item = typeof option === "string" ? {
					label: option,
					value: option
				} : option;
				return /* @__PURE__ */ jsx("option", {
					value: item.value,
					children: item.label
				}, item.value);
			})]
		})]
	});
}
function KpiCard({ icon: Icon, label, value, trend, tone }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "min-w-0 rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx(Icon, {
					size: 16,
					className: "shrink-0 text-primary-dark",
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("span", {
					className: "min-h-8",
					children: label
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: `mt-1 text-lg font-semibold tabular-nums ${tone ? tone.text : "text-foreground"}`,
				children: value
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-0.5 truncate text-xs text-muted-foreground",
				children: trend
			})
		]
	});
}
function Panel({ title, subtitle, acciones, children }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: title,
		className: "mb-4",
		acciones,
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: subtitle
			}),
			children,
			/* @__PURE__ */ jsx("div", {
				className: "mt-3 border-t border-border pt-2 text-xs text-muted-foreground",
				children: "Fuente: registro demostrativo de actividades · Actualizado 07/08/2026"
			})
		]
	});
}
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
var TH_C = "h-9 whitespace-nowrap px-3 text-center text-xs font-semibold uppercase";
var ZEBRA = "[&>tr:nth-child(even)]:bg-background";
function Barra({ value, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: "h-2 overflow-hidden rounded-sm bg-muted",
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("div", {
			className: `h-full ${className}`,
			style: { width: `${Math.min(100, value)}%` }
		})
	});
}
function NombreBoton({ item, onOpen }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: () => onOpen(item.id),
		className: "font-semibold text-foreground hover:text-primary-dark hover:underline",
		children: item.name
	});
}
function ProfessionalContributionPanel({ items, month, onOpen }) {
	const periodLabel = month === "TODOS" ? "Acumulado anual 2026" : `${MONTHS[Number(month)]} 2026`;
	const rows = [...items].sort((a, b) => liberatedForPeriod(b, month) - liberatedForPeriod(a, month));
	const projects = unique(items.map((item) => item.project));
	const filteredLiberated = items.reduce((sum, item) => sum + liberatedForPeriod(item, month), 0);
	const combinedGoal = projects.reduce((sum, project) => sum + projectGoalForPeriod(project, month), 0);
	return /* @__PURE__ */ jsxs(Panel, {
		title: "Aporte del profesional a la meta de liberación predial",
		subtitle: "Aporte individual = predios liberados por el profesional ÷ meta mensual del proyecto. El avance del proyecto considera a todo su equipo.",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 grid grid-cols-1 gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx(SmallMetric, {
					label: "Periodo evaluado",
					value: periodLabel
				}),
				/* @__PURE__ */ jsx(SmallMetric, {
					label: "Predios liberados por la selección",
					value: filteredLiberated
				}),
				/* @__PURE__ */ jsx(SmallMetric, {
					label: "Meta conjunta de los proyectos",
					value: combinedGoal
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1080px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Profesional"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Profesión / equipo"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Proyecto"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Actividades realizadas"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Predios liberados"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Meta mensual"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Aporte individual a la meta"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Avance total del proyecto"
					})
				] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: ZEBRA,
					children: [rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 8,
						className: "px-3 py-6 text-center text-muted-foreground",
						children: "Sin especialistas para los filtros seleccionados."
					}) }), rows.map((item) => {
						const liberated = liberatedForPeriod(item, month);
						const goal = projectGoalForPeriod(item.project, month);
						const projectLiberated = projectLiberatedForPeriod(item.project, month);
						const individualContribution = goal ? liberated / goal * 100 : 0;
						const projectProgress = goal ? projectLiberated / goal * 100 : 0;
						const tone = complianceTone(projectProgress);
						return /* @__PURE__ */ jsxs("tr", {
							className: "h-10 border-t border-border",
							children: [
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [/* @__PURE__ */ jsx(NombreBoton, {
										item,
										onOpen
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: item.specialty
									})]
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [/* @__PURE__ */ jsx("div", { children: item.profession }), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: item.team
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center font-medium",
									children: item.project
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center font-semibold tabular-nums",
									children: completedForPeriod(item, month)
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center text-lg font-semibold tabular-nums text-success",
									children: liberated
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center font-semibold tabular-nums",
									children: goal
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "mb-1 flex justify-between gap-2 text-xs",
										children: [/* @__PURE__ */ jsxs("span", { children: [
											liberated,
											" de ",
											goal,
											" predios"
										] }), /* @__PURE__ */ jsxs("b", {
											className: "tabular-nums",
											children: [individualContribution.toFixed(1), "%"]
										})]
									}), /* @__PURE__ */ jsx(Barra, {
										value: individualContribution,
										className: "bg-primary"
									})]
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "mb-1 flex justify-between gap-2 text-xs",
										children: [/* @__PURE__ */ jsxs("span", { children: [projectLiberated, " liberados"] }), /* @__PURE__ */ jsxs("b", {
											className: `tabular-nums ${tone.text}`,
											children: [projectProgress.toFixed(1), "%"]
										})]
									}), /* @__PURE__ */ jsx(Barra, {
										value: projectProgress,
										className: tone.bar
									})]
								})
							]
						}, item.id);
					})]
				})]
			})
		})]
	});
}
function ProductivityMatrix({ items, search, onSearch, sortDesc, onSort, onOpen, paginacion }) {
	return /* @__PURE__ */ jsxs(Panel, {
		title: "Matriz de productividad por especialista",
		subtitle: "Cada celda muestra actividades concluidas; el color permite reconocer rápidamente niveles bajos y altos.",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsx(Buscador, {
					value: search,
					onChange: onSearch,
					placeholder: "Buscar especialista"
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: onSort,
					children: [
						/* @__PURE__ */ jsx(ArrowDownAZ, {}),
						" ",
						sortDesc ? "Mayor productividad" : "Orden alfabético"
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[1050px] text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} sticky left-0 z-10 min-w-56 bg-primary-soft`,
							children: "Apellidos y nombres"
						}),
						MONTHS.map((month) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH_C,
							children: month
						}, month)),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH_C,
							children: "Total"
						})
					] }) }), /* @__PURE__ */ jsxs("tbody", { children: [items.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 14,
						className: "px-3 py-6 text-center text-muted-foreground",
						children: "Sin especialistas para la búsqueda."
					}) }), items.map((item) => /* @__PURE__ */ jsxs("tr", {
						className: "h-10 border-t border-border",
						children: [
							/* @__PURE__ */ jsxs("td", {
								className: "sticky left-0 z-10 bg-card px-3 py-2",
								children: [/* @__PURE__ */ jsx(NombreBoton, {
									item,
									onOpen
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: item.team
								})]
							}),
							item.monthly.map((value, index) => /* @__PURE__ */ jsx("td", {
								className: `border-l border-border px-3 py-2 text-center font-semibold tabular-nums ${heatClass(value)}`,
								children: value
							}, `${item.id}-${MONTHS[index]}`)),
							/* @__PURE__ */ jsx("td", {
								className: "border-l border-border bg-background px-3 py-2 text-center font-semibold tabular-nums",
								children: annualProduction(item)
							})
						]
					}, item.id))] })]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-3",
				children: paginacion
			})
		]
	});
}
function Buscador({ value, onChange, placeholder }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "relative block w-72 max-w-full",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: placeholder
			}),
			/* @__PURE__ */ jsx(Search, {
				size: 16,
				className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("input", {
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				className: `${controlClase} pl-8`
			})
		]
	});
}
function SpecialistsDirectory({ items, month, search, onSearch, onOpen }) {
	return /* @__PURE__ */ jsxs(Panel, {
		title: "Directorio operativo de especialistas",
		subtitle: "Muestra qué realizó cada profesional, su carga vigente, los predios que liberó y su nivel de cumplimiento.",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(Buscador, {
				value: search,
				onChange: onSearch,
				placeholder: "Buscar por nombre"
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1120px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Especialista"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Profesión y equipo"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Proyecto"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Asignadas"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Realizadas"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Predios liberados"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Pendientes"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Vencidas"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Cumplimiento de actividades"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: "Detalle"
					})
				] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: ZEBRA,
					children: [items.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 10,
						className: "px-3 py-6 text-center text-muted-foreground",
						children: "Sin especialistas para la búsqueda."
					}) }), items.map((item) => {
						const assigned = assignedForPeriod(item, month);
						const completed = completedForPeriod(item, month);
						const liberated = liberatedForPeriod(item, month);
						const value = compliance(item, month);
						const tone = complianceTone(value, item.overdue);
						return /* @__PURE__ */ jsxs("tr", {
							className: "h-10 border-t border-border",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary-dark",
											"aria-hidden": true,
											children: item.initials
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "font-semibold text-foreground",
											children: item.name
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: item.specialty
										})] })]
									})
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [/* @__PURE__ */ jsx("div", { children: item.profession }), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: item.team
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center font-medium",
									children: item.project
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center tabular-nums",
									children: assigned
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center font-semibold tabular-nums text-primary-dark",
									children: completed
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center font-semibold tabular-nums text-success",
									children: liberated
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center tabular-nums",
									children: item.pending
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center font-semibold tabular-nums text-destructive",
									children: item.overdue
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "mb-1 flex justify-between gap-2 text-xs",
										children: [/* @__PURE__ */ jsx(StatusBadge, {
											tono: tone.tono,
											children: tone.label
										}), /* @__PURE__ */ jsxs("b", {
											className: "tabular-nums",
											children: [value.toFixed(1), "%"]
										})]
									}), /* @__PURE__ */ jsx(Barra, {
										value,
										className: tone.bar
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center",
									children: /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => onOpen(item.id),
										children: "Ver ficha"
									})
								})
							]
						}, item.id);
					})]
				})]
			})
		})]
	});
}
function ParticipationOverview({ items }) {
	const activityTotals = ACTIVITY_TYPES.map((activity, index) => ({
		activity,
		total: items.reduce((sum, item) => sum + participationValue(item, index), 0)
	})).sort((a, b) => b.total - a.total);
	const maximum = Math.max(...activityTotals.map((item) => item.total), 1);
	const teamTotals = unique(items.map((item) => item.team)).map((team) => {
		const members = items.filter((item) => item.team === team);
		return {
			team,
			members: members.length,
			interventions: members.reduce((total, item) => total + ACTIVITY_TYPES.reduce((sum, _activity, index) => sum + participationValue(item, index), 0), 0)
		};
	});
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Panel, {
		title: "Actividades con mayor participación",
		subtitle: "Total de intervenciones registradas por tipo de actividad en el periodo.",
		children: /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2",
			children: activityTotals.map((item) => /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-[minmax(150px,1fr)_1.5fr_2rem] items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "truncate text-foreground",
						children: item.activity
					}),
					/* @__PURE__ */ jsx(Barra, {
						value: item.total / maximum * 100,
						className: "bg-primary"
					}),
					/* @__PURE__ */ jsx("b", {
						className: "text-right tabular-nums",
						children: item.total
					})
				]
			}, item.activity))
		})
	}), /* @__PURE__ */ jsx(Panel, {
		title: "Participación por equipo",
		subtitle: "Intervenciones y especialistas que las realizaron.",
		children: /* @__PURE__ */ jsx("div", {
			className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
			children: teamTotals.map((item) => /* @__PURE__ */ jsxs("div", {
				className: "rounded-md border border-border p-3",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: item.team
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-1 text-lg font-semibold tabular-nums text-primary-dark",
						children: item.interventions
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: [
							item.members,
							" especialistas · ",
							item.interventions,
							" intervenciones"
						]
					})
				]
			}, item.team))
		})
	})] });
}
function ParticipationMatrix({ items, onOpen }) {
	return /* @__PURE__ */ jsx(Panel, {
		title: "Participación por tipo de actividad",
		subtitle: "Número de intervenciones registradas por especialista y actividad predial.",
		children: /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1250px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
					scope: "col",
					className: `${TH} sticky left-0 z-10 min-w-56 bg-primary-soft`,
					children: "Especialista"
				}), ACTIVITY_TYPES.map((activity) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: "h-9 min-w-24 px-3 text-center text-xs font-semibold uppercase",
					children: activity
				}, activity))] }) }), /* @__PURE__ */ jsx("tbody", { children: items.map((item) => /* @__PURE__ */ jsxs("tr", {
					className: "h-10 border-t border-border",
					children: [/* @__PURE__ */ jsx("td", {
						className: "sticky left-0 z-10 bg-card px-3 py-2",
						children: /* @__PURE__ */ jsx(NombreBoton, {
							item,
							onOpen
						})
					}), ACTIVITY_TYPES.map((activity, index) => {
						const value = participationValue(item, index);
						return /* @__PURE__ */ jsx("td", {
							className: `border-l border-border px-3 py-2 text-center font-semibold tabular-nums ${heatClass(value)}`,
							children: value
						}, activity);
					})]
				}, item.id)) })]
			})
		})
	});
}
function TeamCards({ teams }) {
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Equipos",
		className: "mb-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4",
			children: teams.map((team) => /* @__PURE__ */ jsxs("article", {
				className: "rounded-lg border border-border bg-card p-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-sm font-semibold",
					children: ["Equipo ", team.team]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-3 grid grid-cols-3 gap-2 text-center",
					children: [
						/* @__PURE__ */ jsx(SmallMetric, {
							label: "Integrantes",
							value: team.specialists
						}),
						/* @__PURE__ */ jsx(SmallMetric, {
							label: "Producción",
							value: team.completed
						}),
						/* @__PURE__ */ jsx(SmallMetric, {
							label: "Promedio",
							value: team.productivity.toFixed(1)
						})
					]
				})]
			}, team.team))
		})
	});
}
function SmallMetric({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md bg-background p-2",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-lg font-semibold tabular-nums",
			children: value
		}), /* @__PURE__ */ jsx("div", {
			className: "text-xs text-muted-foreground",
			children: label
		})]
	});
}
function AlertsPanel({ items, month, onOpen }) {
	const alerts = [...items].sort((a, b) => b.overdue - a.overdue).slice(0, 6);
	return /* @__PURE__ */ jsx(Panel, {
		title: "Alertas del personal",
		subtitle: "Casos que requieren revisión del responsable o jefe de equipo.",
		children: /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[850px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
					"Especialista",
					"Proyecto",
					"Alerta",
					"Criticidad",
					"Días",
					"Acción recomendada"
				].map((h) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: h
				}, h)) }) }), /* @__PURE__ */ jsxs("tbody", {
					className: ZEBRA,
					children: [alerts.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 6,
						className: "px-3 py-6 text-center text-muted-foreground",
						children: "Sin alertas para la selección."
					}) }), alerts.map((item) => {
						const tone = complianceTone(compliance(item, month), item.overdue);
						return /* @__PURE__ */ jsxs("tr", {
							className: "h-10 border-t border-border",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ jsx(NombreBoton, {
										item,
										onOpen
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: item.project
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [item.overdue, " actividades vencidas"]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ jsx(StatusBadge, {
										tono: tone.tono,
										children: tone.label
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 tabular-nums",
									children: item.overdue * 3 + 2
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: "Priorizar vencidos y redistribuir carga"
								})
							]
						}, item.id);
					})]
				})]
			})
		})
	});
}
function AnalysisPanel({ rows, evolution }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Panel, {
			title: "Comparativo entre equipos",
			subtitle: "Indicadores consolidados para orientar la distribución de personal.",
			children: /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[850px] text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Equipo"
					}), [
						"Especialistas",
						"Asignadas",
						"Concluidas",
						"Promedio",
						"Cumplimiento",
						"Carga/persona",
						"Vencidas",
						"Tiempo prom."
					].map((h) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_C,
						children: h
					}, h))] }) }), /* @__PURE__ */ jsx("tbody", {
						className: ZEBRA,
						children: rows.map((row) => /* @__PURE__ */ jsxs("tr", {
							className: "h-10 border-t border-border text-center tabular-nums",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-left font-medium",
									children: row.team
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: row.specialists
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: row.assigned
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: row.completed
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: row.productivity.toFixed(1)
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [row.compliance.toFixed(1), "%"]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: row.workload.toFixed(1)
								}),
								/* @__PURE__ */ jsx("td", {
									className: `px-3 py-2 ${row.overdue > 7 ? "font-semibold text-destructive" : ""}`,
									children: row.overdue
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [row.averageDays.toFixed(1), " días"]
								})
							]
						}, row.team))
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Producción y carga por equipo",
			subtitle: "Compara actividades asignadas y concluidas.",
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 320,
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: rows,
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "var(--color-border)",
							strokeDasharray: "3 3",
							vertical: false
						}),
						/* @__PURE__ */ jsx(XAxis, {
							dataKey: "team",
							tick: TICK
						}),
						/* @__PURE__ */ jsx(YAxis, { tick: TICK }),
						/* @__PURE__ */ jsx(Tooltip, {}),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "assigned",
							name: "Asignadas",
							fill: SERIE[4],
							radius: [
								4,
								4,
								0,
								0
							]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "completed",
							name: "Concluidas",
							fill: SERIE[0],
							radius: [
								4,
								4,
								0,
								0
							]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Tendencia mensual comparativa entre equipos",
			subtitle: "Permite reconocer equipos que mejoran, pierden productividad o se alejan de la meta mensual.",
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 300,
				children: /* @__PURE__ */ jsxs(LineChart$1, {
					data: evolution,
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "var(--color-border)",
							strokeDasharray: "3 3",
							vertical: false
						}),
						/* @__PURE__ */ jsx(XAxis, {
							dataKey: "month",
							tick: TICK
						}),
						/* @__PURE__ */ jsx(YAxis, { tick: TICK }),
						/* @__PURE__ */ jsx(Tooltip, {}),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ jsx(Line, {
							dataKey: "legal",
							name: "Equipo Legal",
							stroke: SERIE[0],
							strokeWidth: 2
						}),
						/* @__PURE__ */ jsx(Line, {
							dataKey: "tecnico",
							name: "Equipo Técnico",
							stroke: SERIE[1],
							strokeWidth: 2
						}),
						/* @__PURE__ */ jsx(Line, {
							dataKey: "social",
							name: "Equipo Social",
							stroke: SERIE[2],
							strokeWidth: 2
						}),
						/* @__PURE__ */ jsx(Line, {
							dataKey: "administrativo",
							name: "Equipo Administrativo",
							stroke: SERIE[3],
							strokeWidth: 2
						}),
						/* @__PURE__ */ jsx(Line, {
							dataKey: "meta",
							name: "Meta mensual",
							stroke: SERIE[3],
							strokeDasharray: "5 4",
							strokeOpacity: .6
						})
					]
				})
			})
		})
	] });
}
function estadoActividadTono(status) {
	if (status === "Vencido") return "destructive";
	if (status === "Concluido") return "success";
	if (status === "Observado") return "warning";
	return "primary";
}
function SpecialistDrawer({ item, month, onClose }) {
	return /* @__PURE__ */ jsx(Sheet$1, {
		open: item !== null,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsx(SheetContent, {
			className: "flex w-full flex-col gap-0 overflow-y-auto bg-card p-0 sm:max-w-4xl",
			children: item && /* @__PURE__ */ jsx(SpecialistDetail, {
				item,
				month
			})
		})
	});
}
function SpecialistDetail({ item, month }) {
	const completed = completedForPeriod(item, month);
	const assigned = assignedForPeriod(item, month);
	const value = compliance(item, month);
	const tone = complianceTone(value, item.overdue);
	const liberated = liberatedForPeriod(item, month);
	const projectGoal = projectGoalForPeriod(item.project, month);
	const individualContribution = projectGoal ? liberated / projectGoal * 100 : 0;
	const projectLiberated = projectLiberatedForPeriod(item.project, month);
	const projectProgress = projectGoal ? projectLiberated / projectGoal * 100 : 0;
	const projectTone = complianceTone(projectProgress);
	const activities = ACTIVITY_TYPES.slice(0, 6).map((activity, index) => ({
		activity,
		code: `AERO-${item.project.toUpperCase()}-PR-${String(91 + index).padStart(4, "0")}`,
		file: `EXP-2026-${118 + index}`,
		assigned: `${String(2 + index).padStart(2, "0")}/07/2026`,
		due: `${String(12 + index * 2).padStart(2, "0")}/08/2026`,
		status: index === 0 ? "Concluido" : index === 4 ? "Vencido" : index === 3 ? "Observado" : "En proceso",
		progress: index === 0 ? 100 : index === 4 ? 55 : 35 + index * 12
	}));
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(SheetHeader, {
		className: "border-b border-border px-4 py-3 text-left",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ jsx("span", {
				className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-base font-semibold text-primary-dark",
				"aria-hidden": true,
				children: item.initials
			}), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Seguimiento individual del especialista"
				}),
				/* @__PURE__ */ jsx(SheetTitle, {
					className: "text-xl font-semibold text-primary-dark",
					children: item.name
				}),
				/* @__PURE__ */ jsxs(SheetDescription, {
					className: "text-xs",
					children: [
						item.role,
						" · ",
						item.team
					]
				})
			] })]
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "space-y-4 p-4",
		children: [
			/* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(ProfileValue, {
						label: "Profesión",
						value: item.profession
					}),
					/* @__PURE__ */ jsx(ProfileValue, {
						label: "Especialidad",
						value: item.specialty
					}),
					/* @__PURE__ */ jsx(ProfileValue, {
						label: "Coordinación",
						value: item.coordination
					}),
					/* @__PURE__ */ jsx(ProfileValue, {
						label: "Supervisor",
						value: item.supervisor
					}),
					/* @__PURE__ */ jsx(ProfileValue, {
						label: "Cargo",
						value: item.role
					}),
					/* @__PURE__ */ jsx(ProfileValue, {
						label: "Fecha de ingreso",
						value: item.joined
					}),
					/* @__PURE__ */ jsx(ProfileValue, {
						label: "Estado laboral",
						value: "Activo"
					}),
					/* @__PURE__ */ jsx(ProfileValue, {
						label: "Proyecto principal",
						value: item.project
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(SmallMetric, {
						label: "Predios asignados",
						value: item.properties
					}),
					/* @__PURE__ */ jsx(SmallMetric, {
						label: "Predios liberados",
						value: liberated
					}),
					/* @__PURE__ */ jsx(SmallMetric, {
						label: "Expedientes",
						value: item.files
					}),
					/* @__PURE__ */ jsx(SmallMetric, {
						label: "Concluidas",
						value: completed
					}),
					/* @__PURE__ */ jsx(SmallMetric, {
						label: "Pendientes",
						value: item.pending
					}),
					/* @__PURE__ */ jsx(SmallMetric, {
						label: "Vencidas",
						value: item.overdue
					}),
					/* @__PURE__ */ jsx(SmallMetric, {
						label: "Productividad acumulada",
						value: annualProduction(item)
					}),
					/* @__PURE__ */ jsx(SmallMetric, {
						label: "Tiempo promedio",
						value: `${item.averageDays} días`
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md bg-background p-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: `text-lg font-semibold tabular-nums ${tone.text}`,
							children: [value.toFixed(1), "%"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1 text-xs text-muted-foreground",
							children: ["Cumplimiento ", /* @__PURE__ */ jsx(StatusBadge, {
								tono: tone.tono,
								children: tone.label
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: `Aporte a la meta de liberación de ${item.project}`,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							month === "TODOS" ? "Acumulado anual" : `${MONTHS[Number(month)]} 2026`,
							" · La meta del proyecto es ",
							projectGoal,
							" predios."
						]
					}), /* @__PURE__ */ jsxs(StatusBadge, {
						tono: "primary",
						children: [
							"Aporte individual: ",
							individualContribution.toFixed(1),
							"%"
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-3 grid grid-cols-1 gap-3 md:grid-cols-2",
					children: [/* @__PURE__ */ jsx(ProgressMetric, {
						label: `${item.name.split(" ")[0]} liberó ${liberated} de ${projectGoal} predios de la meta`,
						value: individualContribution,
						tone: complianceTone(100),
						barClass: "bg-primary",
						textClass: "text-primary-dark"
					}), /* @__PURE__ */ jsx(ProgressMetric, {
						label: `El proyecto lleva ${projectLiberated} de ${projectGoal} predios liberados`,
						value: projectProgress,
						tone: projectTone,
						barClass: projectTone.bar,
						textClass: projectTone.text
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Actividades detalladas",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: [assigned, " actividades asignadas en el periodo seleccionado."]
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto rounded-md border border-border",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full min-w-[1050px] text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [[
							"Proyecto",
							"Código predio",
							"Expediente",
							"Tipo de actividad"
						].map((h) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH,
							children: h
						}, h)), [
							"Asignación",
							"Programada",
							"Estado",
							"Avance",
							"Días atención",
							"Días retraso",
							"Prioridad"
						].map((h) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH_C,
							children: h
						}, h))] }) }), /* @__PURE__ */ jsx("tbody", {
							className: ZEBRA,
							children: activities.map((activity, index) => /* @__PURE__ */ jsxs("tr", {
								className: "h-10 border-t border-border",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2",
										children: item.project
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 font-mono",
										children: activity.code
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 font-mono",
										children: activity.file
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2",
										children: activity.activity
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center tabular-nums",
										children: activity.assigned
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center tabular-nums",
										children: activity.due
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center",
										children: /* @__PURE__ */ jsx(StatusBadge, {
											tono: estadoActividadTono(activity.status),
											children: activity.status
										})
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-3 py-2 text-center tabular-nums",
										children: [activity.progress, "%"]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center tabular-nums",
										children: 5 + index * 2
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center font-semibold tabular-nums text-destructive",
										children: activity.status === "Vencido" ? 6 : 0
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center",
										children: index === 4 ? "Alta" : "Media"
									})
								]
							}, activity.file))
						})]
					})
				})]
			})
		]
	})] });
}
function ProfileValue({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border p-2",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "mt-1 text-sm font-medium text-foreground",
			children: value
		})]
	});
}
function ProgressMetric({ label, value, tone, barClass, textClass }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-card p-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-2 flex items-start justify-between gap-3 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsxs("b", {
				className: `shrink-0 text-sm tabular-nums ${textClass}`,
				title: tone.label,
				children: [value.toFixed(1), "%"]
			})]
		}), /* @__PURE__ */ jsx(Barra, {
			value,
			className: barClass
		})]
	});
}
//#endregion
export { SeguimientoPersonalPage as component };
