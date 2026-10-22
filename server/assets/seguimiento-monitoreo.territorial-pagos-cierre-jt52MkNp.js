import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Archive, ArrowDownRight, ArrowUpRight, CheckCircle2, ChevronDown, ChevronsUpDown, Clock3, Download, FileCheck2, FileClock, FileSpreadsheet, FileX2, FilterX, Layers3, MapPinned, Maximize2, Minimize2, Search, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart as LineChart$1, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.territorial-pagos-cierre.tsx
var Route$1 = createFileRoute("/seguimiento-monitoreo/territorial-pagos-cierre")({
	head: () => ({ meta: [{ title: "Mapa, pagos, inscripción y cierre" }] }),
	component: TerritorialPagosDashboard
});
var C = {
	primary: "var(--color-primary)",
	dark: "var(--color-primary-dark)",
	highlight: "var(--color-highlight)",
	muted: "var(--color-muted-foreground)",
	border: "var(--color-border)",
	card: "var(--color-card)"
};
var TICK = {
	fontSize: 12,
	fill: C.muted
};
var LEGEND = { fontSize: 12 };
var statusColors = {
	Identificado: {
		fill: C.border,
		opacity: 1
	},
	"Expediente en proceso": {
		fill: C.muted,
		opacity: 1
	},
	Tasación: {
		fill: C.highlight,
		opacity: .6
	},
	Negociación: {
		fill: C.highlight,
		opacity: 1
	},
	"Conflicto / expropiación": {
		fill: C.primary,
		opacity: 1
	},
	Pagado: {
		fill: C.primary,
		opacity: .5
	},
	Liberado: {
		fill: C.dark,
		opacity: .6
	},
	Inscrito: {
		fill: C.dark,
		opacity: 1
	}
};
var mapProperties = [
	{
		code: "PR-001842",
		passive: "María Elena Rojas",
		area: 842,
		appraised: 1.42,
		approved: 1.38,
		paid: 1.38,
		delivery: "Entregado",
		registry: "Inscrito",
		interference: "Liberada",
		risk: "Bajo",
		status: "Inscrito",
		points: "62,85 142,74 154,128 72,139"
	},
	{
		code: "PR-001873",
		passive: "Comunidad San Jerónimo",
		area: 3261,
		appraised: 4.81,
		approved: 4.62,
		paid: 3.1,
		delivery: "Parcial",
		registry: "En trámite",
		interference: "Red de agua",
		risk: "Crítico",
		status: "Conflicto / expropiación",
		points: "151,74 238,67 249,119 154,128"
	},
	{
		code: "PR-001905",
		passive: "Inversiones del Centro SAC",
		area: 1480,
		appraised: 3.26,
		approved: 3.18,
		paid: 0,
		delivery: "No entregado",
		registry: "Bloqueado",
		interference: "Línea eléctrica",
		risk: "Crítico",
		status: "Conflicto / expropiación",
		points: "238,67 330,76 323,131 249,119"
	},
	{
		code: "PR-001927",
		passive: "Sucesión Flores Huamán",
		area: 616,
		appraised: 1.08,
		approved: 1.04,
		paid: .88,
		delivery: "Programado",
		registry: "Observado",
		interference: "Sin interferencia",
		risk: "Alto",
		status: "Negociación",
		points: "330,76 413,91 406,145 323,131"
	},
	{
		code: "PR-001944",
		passive: "Municipalidad Distrital Norte",
		area: 5411,
		appraised: 6.21,
		approved: 5.96,
		paid: 0,
		delivery: "Parcial",
		registry: "Transferencia",
		interference: "Paradero",
		risk: "Alto",
		status: "Expediente en proceso",
		points: "413,91 510,81 526,144 406,145"
	},
	{
		code: "PR-001968",
		passive: "José Antonio Medina",
		area: 392,
		appraised: .84,
		approved: .81,
		paid: .81,
		delivery: "No entregado",
		registry: "Anotación preventiva",
		interference: "Liberada",
		risk: "Medio",
		status: "Pagado",
		points: "72,139 154,128 161,196 80,207"
	},
	{
		code: "PR-001991",
		passive: "Agrícola Santa Ana SRL",
		area: 2269,
		appraised: 3.72,
		approved: 3.61,
		paid: 3.61,
		delivery: "Entregado",
		registry: "En trámite",
		interference: "Canal de riego",
		risk: "Alto",
		status: "Liberado",
		points: "154,128 249,119 258,190 161,196"
	},
	{
		code: "PR-002014",
		passive: "Rosa Milagros Chávez",
		area: 729,
		appraised: 1.19,
		approved: 1.14,
		paid: 0,
		delivery: "No entregado",
		registry: "Sin iniciar",
		interference: "Telecomunicaciones",
		risk: "Crítico",
		status: "Identificado",
		points: "249,119 323,131 334,197 258,190"
	},
	{
		code: "PR-002037",
		passive: "Consorcio Vial Andino",
		area: 1895,
		appraised: 4.04,
		approved: 3.92,
		paid: 2.1,
		delivery: "No entregado",
		registry: "Bloqueado",
		interference: "Gas natural",
		risk: "Crítico",
		status: "Tasación",
		points: "323,131 406,145 415,207 334,197"
	},
	{
		code: "PR-002058",
		passive: "Comunidad Campesina Central",
		area: 6840,
		appraised: 7.62,
		approved: 7.48,
		paid: 7.48,
		delivery: "Entregado",
		registry: "Inscrito",
		interference: "Liberada",
		risk: "Bajo",
		status: "Inscrito",
		points: "406,145 526,144 516,221 415,207"
	},
	{
		code: "PR-002081",
		passive: "Transportes del Valle SAC",
		area: 940,
		appraised: 1.88,
		approved: 1.82,
		paid: 1.82,
		delivery: "Entregado",
		registry: "Presentado",
		interference: "Señalización",
		risk: "Medio",
		status: "Liberado",
		points: "80,207 161,196 169,264 92,279"
	},
	{
		code: "PR-002106",
		passive: "Familia Gutiérrez Soto",
		area: 2120,
		appraised: 3.96,
		approved: 3.82,
		paid: 3.2,
		delivery: "Parcial",
		registry: "Observado",
		interference: "Saneamiento",
		risk: "Alto",
		status: "Pagado",
		points: "161,196 258,190 267,255 169,264"
	},
	{
		code: "PR-002124",
		passive: "Agroindustrias del Sur",
		area: 515,
		appraised: .96,
		approved: .93,
		paid: 0,
		delivery: "No entregado",
		registry: "Sin iniciar",
		interference: "Sin identificar",
		risk: "Medio",
		status: "Expediente en proceso",
		points: "258,190 334,197 345,265 267,255"
	},
	{
		code: "PR-002143",
		passive: "Constructora Los Andes",
		area: 1280,
		appraised: 2.74,
		approved: 2.66,
		paid: 2.66,
		delivery: "Entregado",
		registry: "Subsanado",
		interference: "Liberada",
		risk: "Medio",
		status: "Liberado",
		points: "334,197 415,207 421,278 345,265"
	},
	{
		code: "PR-002166",
		passive: "Asociación Valle Verde",
		area: 1740,
		appraised: 2.98,
		approved: 2.89,
		paid: 1.55,
		delivery: "No entregado",
		registry: "Pendiente",
		interference: "Semáforos",
		risk: "Alto",
		status: "Negociación",
		points: "415,207 516,221 503,292 421,278"
	}
];
var sectionProgress = [
	{
		name: "Tramo 1",
		pending: 12,
		paid: 18,
		delivered: 23,
		registered: 34
	},
	{
		name: "Tramo 2",
		pending: 19,
		paid: 24,
		delivered: 27,
		registered: 21
	},
	{
		name: "Tramo 3",
		pending: 16,
		paid: 29,
		delivered: 22,
		registered: 18
	},
	{
		name: "Tramo 4",
		pending: 28,
		paid: 21,
		delivered: 17,
		registered: 12
	},
	{
		name: "Tramo 5",
		pending: 14,
		paid: 26,
		delivered: 31,
		registered: 24
	},
	{
		name: "Tramo 6",
		pending: 31,
		paid: 18,
		delivered: 13,
		registered: 9
	},
	{
		name: "Tramo 7",
		pending: 17,
		paid: 23,
		delivered: 25,
		registered: 28
	}
];
var paymentConcepts = [
	{
		name: "Terreno",
		value: 54,
		amount: 31.8,
		color: C.primary,
		opacity: 1
	},
	{
		name: "Edificaciones",
		value: 17,
		amount: 10,
		color: C.dark,
		opacity: 1
	},
	{
		name: "Plantaciones",
		value: 6,
		amount: 3.5,
		color: C.highlight,
		opacity: 1
	},
	{
		name: "Perjuicio económico",
		value: 8,
		amount: 4.7,
		color: C.muted,
		opacity: 1
	},
	{
		name: "Incentivo",
		value: 5,
		amount: 2.9,
		color: C.primary,
		opacity: .5
	},
	{
		name: "Compensación",
		value: 4,
		amount: 2.4,
		color: C.dark,
		opacity: .5
	},
	{
		name: "Mejoras",
		value: 4,
		amount: 2.4,
		color: C.highlight,
		opacity: .5
	},
	{
		name: "Gastos de traslado",
		value: 2,
		amount: 1.2,
		color: C.muted,
		opacity: .5
	}
];
var payments = mapProperties.slice(0, 12).map((row, index) => ({
	code: row.code,
	beneficiary: row.passive,
	concept: paymentConcepts[index % paymentConcepts.length].name,
	approved: row.approved,
	certified: row.approved * .97,
	accrued: row.approved * (.78 + index % 4 * .06),
	drawn: row.approved * (.7 + index % 4 * .07),
	paid: row.paid,
	programmed: `${String(8 + index % 20).padStart(2, "0")}/08/2026`,
	effective: row.paid ? `${String(2 + index % 24).padStart(2, "0")}/08/2026` : "Pendiente",
	balance: Math.max(0, row.approved - row.paid),
	status: index === 5 || index === 8 ? "Emitido no entregado" : index === 2 || index === 7 ? "Próximo a vencer" : row.paid >= row.approved * .98 ? "Pagado" : "En proceso"
}));
var registryRows = mapProperties.slice(0, 10).map((row, index) => ({
	code: row.code,
	office: [
		"Lima",
		"Junín",
		"Chimbote",
		"Callao"
	][index % 4],
	title: `2026-${String(118420 + index * 137)}`,
	presentation: `${String(4 + index).padStart(2, "0")}/07/2026`,
	status: [
		"Inscrito",
		"Observado",
		"Pendiente",
		"Subsanado",
		"Tachado",
		"Archivado"
	][index % 6],
	observation: index % 3 === 0 ? "Rectificar área y linderos" : index % 3 === 1 ? "Acreditar representación" : "Sin observación",
	deadline: index % 3 === 2 ? "Sin plazo" : `${String(10 + index).padStart(2, "0")}/08/2026`,
	resulting: index % 6 === 0 ? `P-${11280460 + index}` : "Pendiente",
	owner: [
		"R. Huamán",
		"M. Salazar",
		"C. Romero"
	][index % 3]
}));
var timeline = [
	"Aprobación",
	"Certificación",
	"Devengado",
	"Pago",
	"Entrega",
	"Inscripción"
].map((stage, index) => ({
	stage,
	B01: [
		0,
		8,
		19,
		31,
		39,
		52
	][index],
	B02: [
		0,
		11,
		26,
		43,
		57,
		78
	][index],
	B04: [
		0,
		16,
		38,
		67,
		91,
		126
	][index],
	B06: [
		0,
		14,
		35,
		72,
		104,
		148
	][index]
}));
var audits = [
	[
		"05/08/2026 11:18",
		"María Salazar",
		"PR-001905 · Estado de pago",
		"Pendiente",
		"Bloqueado",
		"Medida cautelar vigente",
		"Informe Legal 044-2026"
	],
	[
		"05/08/2026 10:42",
		"Carlos Romero",
		"PR-001873 · Entrega física",
		"No entregado",
		"Parcial",
		"Acta de entrega de frente",
		"Acta 018-B04"
	],
	[
		"05/08/2026 09:57",
		"Rosa Huamán",
		"PR-002143 · Estado registral",
		"Observado",
		"Subsanado",
		"Reingreso de título",
		"Esquela 2026-882"
	],
	[
		"04/08/2026 17:21",
		"Luis Quispe",
		"PR-002037 · Monto pagado",
		"S/ 1.80 MM",
		"S/ 2.10 MM",
		"Pago parcial autorizado",
		"CP-005481"
	],
	[
		"04/08/2026 15:36",
		"Ana Paredes",
		"PR-002014 · Riesgo",
		"Alto",
		"Crítico",
		"Plazo legal vencido",
		"Alerta AR-129"
	],
	[
		"04/08/2026 12:08",
		"Rosa Huamán",
		"PR-002058 · Cierre",
		"En revisión",
		"Cerrado",
		"Cinco controles conformes",
		"Acta C-00142"
	]
];
var defaultFilters = {
	project: "TODOS",
	section: "TODOS",
	property: "TODOS",
	payment: "TODOS",
	delivery: "TODOS",
	registry: "TODOS",
	risk: "TODOS",
	owner: "TODOS"
};
var kpiTone = {
	blue: "text-primary-dark",
	green: "text-success",
	amber: "text-warning",
	red: "text-destructive"
};
function money(value, digits = 2, unit = "millions") {
	const amount = unit === "soles" ? value * 1e6 : unit === "thousands" ? value * 1e3 : value;
	const suffix = unit === "millions" ? " MM" : unit === "thousands" ? " mil" : "";
	return `S/ ${amount.toLocaleString("es-PE", {
		minimumFractionDigits: unit === "soles" ? 0 : digits,
		maximumFractionDigits: unit === "soles" ? 0 : digits
	})}${suffix}`;
}
function number(value, digits = 0) {
	return value.toLocaleString("es-PE", { maximumFractionDigits: digits });
}
function displayDate(value) {
	if (!value || !value.includes("/")) return value;
	const [day, month, yearAndTime] = value.split("/");
	const [year, time] = (yearAndTime ?? "").split(" ");
	return `${day} ${[
		"",
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
	][Number(month)]} ${year}${time ? ` · ${time}` : ""}`;
}
function exportExcel(filename, headers, rows) {
	const escape = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const html = `<table><thead><tr>${headers.map((header) => `<th>${escape(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escape(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
	const url = URL.createObjectURL(new Blob(["﻿", html], { type: "application/vnd.ms-excel" }));
	const link = document.createElement("a");
	link.href = url;
	link.download = `${filename}.xls`;
	link.click();
	URL.revokeObjectURL(url);
}
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
var TR = "h-10 border-t border-border";
var TD = "px-3 py-1.5";
function TerritorialPagosDashboard() {
	const [filters, setFilters] = useState(defaultFilters);
	const [layers, setLayers] = useState({
		alignment: true,
		interferences: false,
		delivered: false,
		pending: false,
		controls: true
	});
	const [selectedProperty, setSelectedProperty] = useState(mapProperties[1]);
	const [selectedConcept, setSelectedConcept] = useState(null);
	const [paymentSearch, setPaymentSearch] = useState("");
	const [registrySearch, setRegistrySearch] = useState("");
	const [auditOpen, setAuditOpen] = useState(true);
	const [amountUnit, setAmountUnit] = useState("millions");
	const formatMoney = (value, digits = 2) => money(value, digits, amountUnit);
	const filteredMap = useMemo(() => mapProperties.filter((row) => {
		if (filters.property !== "TODOS" && row.code !== filters.property) return false;
		if (filters.delivery !== "TODOS" && row.delivery !== filters.delivery) return false;
		if (filters.registry !== "TODOS" && row.registry !== filters.registry) return false;
		if (filters.risk !== "TODOS" && row.risk !== filters.risk) return false;
		if (filters.payment === "Pagado" && row.paid < row.approved * .98) return false;
		if (filters.payment === "Pendiente" && row.paid > 0) return false;
		if (filters.payment === "En proceso" && (row.paid === 0 || row.paid >= row.approved * .98)) return false;
		if (filters.payment === "Consignado" && !["PR-001873", "PR-002037"].includes(row.code)) return false;
		const responsible = [
			"M. Salazar",
			"C. Romero",
			"L. Quispe",
			"A. Paredes",
			"R. Huamán"
		][mapProperties.indexOf(row) % 5];
		if (filters.owner !== "TODOS" && responsible !== filters.owner) return false;
		return true;
	}), [filters]);
	const scale = Math.max(.1, filteredMap.length / mapProperties.length) * (filters.project === "TODOS" ? 1 : .68) * (filters.section === "TODOS" ? 1 : .77);
	const cards = [
		{
			label: "Monto total pagado",
			value: formatMoney(58.9 * scale, 1),
			note: "78.4% del aprobado",
			trend: 8.6,
			color: "green"
		},
		{
			label: "Pagos pendientes",
			value: formatMoney(16.2 * scale, 1),
			note: "86 operaciones",
			trend: -6.4,
			color: "amber"
		},
		{
			label: "Consignaciones",
			value: formatMoney(7.8 * scale, 1),
			note: "24 expedientes",
			trend: 5.1,
			color: "blue"
		},
		{
			label: "Pagados sin entrega",
			value: Math.max(1, Math.round(31 * scale)).toString(),
			note: "Requieren acta física",
			trend: -4.7,
			color: "red"
		},
		{
			label: "Entregados sin inscripción",
			value: Math.max(1, Math.round(46 * scale)).toString(),
			note: "En trámite registral",
			trend: -8.2,
			color: "amber"
		},
		{
			label: "Títulos observados",
			value: Math.max(1, Math.round(19 * scale)).toString(),
			note: "7 próximos a vencer",
			trend: 2.3,
			color: "red"
		},
		{
			label: "Predios cerrados",
			value: Math.max(1, Math.round(427 * scale)).toString(),
			note: "Cinco controles conformes",
			trend: 9.4,
			color: "green"
		},
		{
			label: "Cierre integral",
			value: "68.4%",
			note: "Meta del periodo: 75%",
			trend: 4.9,
			color: "amber"
		}
	];
	const filteredPayments = payments.filter((row) => (!selectedConcept || row.concept === selectedConcept) && (!paymentSearch.trim() || `${row.code} ${row.beneficiary}`.toLowerCase().includes(paymentSearch.toLowerCase())));
	const filteredRegistry = registryRows.filter((row) => !registrySearch.trim() || `${row.code} ${row.title} ${row.office}`.toLowerCase().includes(registrySearch.toLowerCase()));
	function update(key, value) {
		setFilters((current) => ({
			...current,
			[key]: value
		}));
	}
	function reset() {
		setFilters(defaultFilters);
		setSelectedConcept(null);
		setPaymentSearch("");
		setRegistrySearch("");
	}
	function exportPredios() {
		exportExcel("predios_territoriales", [
			"Código",
			"Sujeto pasivo",
			"Área m²",
			"Valor tasado",
			"Monto aprobado",
			"Monto pagado",
			"Entrega",
			"Registral",
			"Interferencia",
			"Riesgo",
			"Estado"
		], filteredMap.map((row) => [
			row.code,
			row.passive,
			row.area,
			row.appraised,
			row.approved,
			row.paid,
			row.delivery,
			row.registry,
			row.interference,
			row.risk,
			row.status
		]));
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: MapPinned,
			titulo: "Mapa, pagos, inscripción y cierre",
			descripcion: "Control geográfico y trazabilidad financiera, física, registral y documental de los predios.",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 text-xs font-semibold text-muted-foreground",
					children: ["Unidad", /* @__PURE__ */ jsxs("select", {
						value: amountUnit,
						onChange: (event) => setAmountUnit(event.target.value),
						className: `${controlClase} w-28`,
						"aria-label": "Unidad monetaria",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "soles",
								children: "Soles"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "thousands",
								children: "Miles"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "millions",
								children: "Millones"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx(Clock3, {
							size: 16,
							"aria-hidden": true
						}),
						" Última actualización:",
						" ",
						/* @__PURE__ */ jsx("b", {
							className: "text-foreground",
							children: "05/08/2026 12:03"
						})
					]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: reset,
					children: [/* @__PURE__ */ jsx(FilterX, {}), " Restablecer filtros"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: exportPredios,
					disabled: !filteredMap.length,
					children: [/* @__PURE__ */ jsx(Download, {}), " Exportar predios"]
				})
			] })
		}),
		/* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-1.5 text-xs text-warning",
			children: "Datos de demostración: el mapa, los pagos y los títulos no provienen de SIGP, SIAF ni SUNARP."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Alcance territorial",
			className: "mb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4 2xl:grid-cols-8",
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
						label: "Tramo",
						value: filters.section,
						onChange: (v) => update("section", v),
						options: [
							"TODOS",
							"Tramo I",
							"Tramo II",
							"Tramo III",
							"Acceso Norte"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Predio",
						value: filters.property,
						onChange: (v) => update("property", v),
						options: ["TODOS", ...mapProperties.map((row) => row.code)]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado de pago",
						value: filters.payment,
						onChange: (v) => update("payment", v),
						options: [
							"TODOS",
							"Pendiente",
							"En proceso",
							"Pagado",
							"Consignado"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado de entrega",
						value: filters.delivery,
						onChange: (v) => update("delivery", v),
						options: [
							"TODOS",
							"No entregado",
							"Programado",
							"Parcial",
							"Entregado"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado registral",
						value: filters.registry,
						onChange: (v) => update("registry", v),
						options: [
							"TODOS",
							"Sin iniciar",
							"En trámite",
							"Observado",
							"Subsanado",
							"Inscrito",
							"Bloqueado"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Nivel de riesgo",
						value: filters.risk,
						onChange: (v) => update("risk", v),
						options: [
							"TODOS",
							"Bajo",
							"Medio",
							"Alto",
							"Crítico"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Responsable",
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
					})
				]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid gap-4 2xl:grid-cols-[1.5fr_1fr]",
			"aria-label": "Mapa e indicadores",
			children: [/* @__PURE__ */ jsx(TerritorialMap, {
				rows: filteredMap,
				selected: selectedProperty,
				onSelect: setSelectedProperty,
				layers,
				onLayers: setLayers,
				amountUnit
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-4 grid grid-cols-2 gap-4",
					children: cards.map((card) => /* @__PURE__ */ jsx(KpiCard, { ...card }, card.label))
				}), /* @__PURE__ */ jsx(Panel, {
					title: "Avance por tramo",
					subtitle: "Cada barra compara por tramo los predios pendientes de pago, pagados, entregados e inscritos para ver si el avance físico y registral acompaña al financiero.",
					children: /* @__PURE__ */ jsx(ResponsiveContainer, {
						width: "100%",
						height: 260,
						children: /* @__PURE__ */ jsxs(BarChart, {
							data: sectionProgress,
							margin: {
								left: 0,
								right: 8,
								top: 8
							},
							children: [
								/* @__PURE__ */ jsx(CartesianGrid, {
									stroke: C.border,
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
								/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
								/* @__PURE__ */ jsx(Bar, {
									dataKey: "pending",
									name: "Pendientes de pago",
									stackId: "a",
									fill: C.border
								}),
								/* @__PURE__ */ jsx(Bar, {
									dataKey: "paid",
									name: "Pagados",
									stackId: "a",
									fill: C.highlight
								}),
								/* @__PURE__ */ jsx(Bar, {
									dataKey: "delivered",
									name: "Entregados",
									stackId: "a",
									fill: C.primary
								}),
								/* @__PURE__ */ jsx(Bar, {
									dataKey: "registered",
									name: "Inscritos",
									stackId: "a",
									fill: C.dark,
									radius: [
										3,
										3,
										0,
										0
									]
								})
							]
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid gap-4 xl:grid-cols-[.7fr_1.3fr]",
			"aria-label": "Pagos por concepto y tiempos",
			children: [/* @__PURE__ */ jsx(Panel, {
				title: "Pagos por concepto",
				subtitle: "Cada segmento muestra qué porcentaje del pago total corresponde a terreno, edificaciones, plantaciones u otros conceptos. Seleccione uno para filtrar la tabla de pagos.",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid items-center md:grid-cols-[1fr_.9fr]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: 300,
							children: /* @__PURE__ */ jsxs(PieChart, { children: [/* @__PURE__ */ jsx(Pie, {
								data: paymentConcepts,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 63,
								outerRadius: 98,
								paddingAngle: 2,
								stroke: C.border,
								cursor: "pointer",
								onClick: (row) => setSelectedConcept((current) => current === row.name ? null : row.name),
								children: paymentConcepts.map((row) => /* @__PURE__ */ jsx(Cell, {
									fill: row.color,
									fillOpacity: row.opacity,
									opacity: selectedConcept && selectedConcept !== row.name ? .25 : 1
								}, row.name))
							}), /* @__PURE__ */ jsx(Tooltip, { formatter: (value, _name, item) => [`${value}% · ${formatMoney(item.payload.amount)}`, item.payload.name] })] })
						}), /* @__PURE__ */ jsxs("div", {
							className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs uppercase text-muted-foreground",
								children: "Total pagado"
							}), /* @__PURE__ */ jsx("b", {
								className: "text-lg",
								children: formatMoney(58.9, 1)
							})]
						})]
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-1",
						children: paymentConcepts.map((row) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							"aria-pressed": selectedConcept === row.name,
							onClick: () => setSelectedConcept((current) => current === row.name ? null : row.name),
							className: "flex w-full items-center justify-between gap-2 rounded-md p-1.5 text-left text-sm hover:bg-muted",
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
								className: "whitespace-nowrap tabular-nums",
								children: formatMoney(row.amount)
							})]
						}) }, row.name))
					})]
				})
			}), /* @__PURE__ */ jsx(Panel, {
				title: "Tiempo promedio entre hitos",
				subtitle: "Sigue los días transcurridos entre aprobación, certificación, devengado, pago, entrega e inscripción para localizar la fase con mayor demora.",
				children: /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 318,
					children: /* @__PURE__ */ jsxs(LineChart$1, {
						data: timeline,
						margin: {
							left: 5,
							right: 16,
							top: 12
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: C.border,
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "stage",
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(YAxis, {
								tick: TICK,
								axisLine: false,
								tickLine: false,
								unit: " d"
							}),
							/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => `${value} días acumulados` }),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
							/* @__PURE__ */ jsx(Line, {
								type: "monotone",
								dataKey: "B01",
								name: "Tramo 1",
								stroke: C.dark,
								strokeWidth: 2.2,
								dot: { r: 3 }
							}),
							/* @__PURE__ */ jsx(Line, {
								type: "monotone",
								dataKey: "B02",
								name: "Tramo 2",
								stroke: C.muted,
								strokeWidth: 2.2,
								dot: { r: 3 }
							}),
							/* @__PURE__ */ jsx(Line, {
								type: "monotone",
								dataKey: "B04",
								name: "Tramo 4",
								stroke: C.highlight,
								strokeWidth: 2.2,
								dot: { r: 3 }
							}),
							/* @__PURE__ */ jsx(Line, {
								type: "monotone",
								dataKey: "B06",
								name: "Tramo 6",
								stroke: C.primary,
								strokeWidth: 2.2,
								dot: { r: 3 }
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ jsx(PaymentsTable, {
			rows: filteredPayments,
			search: paymentSearch,
			onSearch: setPaymentSearch,
			concept: selectedConcept,
			onClearConcept: () => setSelectedConcept(null),
			amountUnit
		}),
		/* @__PURE__ */ jsx(RegistryTable, {
			rows: filteredRegistry,
			search: registrySearch,
			onSearch: setRegistrySearch
		}),
		/* @__PURE__ */ jsx(ClosureTable, { rows: mapProperties.slice(0, 10) }),
		/* @__PURE__ */ jsx(AuditPanel, {
			open: auditOpen,
			onToggle: () => setAuditOpen((current) => !current)
		})
	] });
}
function FilterSelect({ label, value, options, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block truncate text-xs font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase,
			children: options.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
		})]
	});
}
function KpiCard({ label, value, note, trend, color }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "min-w-0 rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "min-h-8 text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("p", {
				className: `mt-1 whitespace-nowrap text-lg font-semibold tabular-nums ${kpiTone[color]}`,
				children: value
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-1 flex justify-between gap-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx("span", { children: note }), /* @__PURE__ */ jsxs("b", {
					className: `flex items-center ${trend >= 0 ? "text-success" : "text-destructive"}`,
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
/** Sección de gráfico que puede ampliarse a pantalla completa. */
function Panel({ title, subtitle, children }) {
	const [expanded, setExpanded] = useState(false);
	return /* @__PURE__ */ jsxs(Section, {
		titulo: title,
		className: expanded ? "fixed inset-4 z-50 overflow-auto" : "min-w-0",
		acciones: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			size: "icon",
			onClick: () => setExpanded((current) => !current),
			"aria-label": expanded ? "Restaurar gráfico" : "Ampliar gráfico",
			title: expanded ? "Restaurar gráfico" : "Ampliar gráfico",
			children: expanded ? /* @__PURE__ */ jsx(Minimize2, {}) : /* @__PURE__ */ jsx(Maximize2, {})
		}),
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: subtitle
			}),
			children,
			/* @__PURE__ */ jsxs("p", {
				className: "mt-2 flex justify-between border-t border-border pt-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx("span", { children: "Fuente: SIGP · SIAF · SUNARP" }), /* @__PURE__ */ jsx("span", { children: "Actualizado: 05 Ago 2026 · 12:03" })]
			})
		]
	});
}
function TerritorialMap({ rows, selected, onSelect, layers, onLayers, amountUnit }) {
	const [expanded, setExpanded] = useState(false);
	return /* @__PURE__ */ jsxs("section", {
		"aria-label": "Mapa GIS de gestión territorial",
		className: `${expanded ? "fixed inset-4 z-50" : "relative min-h-[720px]"} overflow-hidden rounded-lg border border-border bg-muted`,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 border-b-2 border-primary bg-card px-4 py-2",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-sm font-bold uppercase text-primary-dark",
					children: "Mapa GIS de gestión territorial"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Polígonos prediales, trazado y capas operativas."
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "text-xs text-muted-foreground",
						children: [rows.length, " predios visibles"]
					}), /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						onClick: () => setExpanded((current) => !current),
						"aria-label": expanded ? "Restaurar mapa" : "Ampliar mapa",
						title: expanded ? "Restaurar mapa" : "Ampliar mapa",
						children: expanded ? /* @__PURE__ */ jsx(Minimize2, {}) : /* @__PURE__ */ jsx(Maximize2, {})
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("svg", {
				viewBox: "0 0 580 360",
				className: "absolute inset-x-0 bottom-0 top-14 h-auto w-full",
				preserveAspectRatio: "xMidYMid slice",
				role: "img",
				"aria-label": "Polígonos de predios sobre el trazado de la obra",
				children: [
					/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", {
						id: "grid",
						width: "28",
						height: "28",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ jsx("path", {
							d: "M 28 0 L 0 0 0 28",
							fill: "none",
							stroke: C.border,
							strokeWidth: "0.6"
						})
					}) }),
					/* @__PURE__ */ jsx("rect", {
						width: "580",
						height: "360",
						fill: "url(#grid)"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M20 300 C120 250 180 312 270 225 S440 140 570 95",
						fill: "none",
						stroke: C.card,
						strokeWidth: "30",
						opacity: ".8"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M20 300 C120 250 180 312 270 225 S440 140 570 95",
						fill: "none",
						stroke: C.muted,
						strokeWidth: "4",
						strokeDasharray: "12 8",
						opacity: layers.alignment ? 1 : 0
					}),
					rows.map((row) => /* @__PURE__ */ jsx("polygon", {
						points: row.points,
						fill: statusColors[row.status].fill,
						fillOpacity: (selected?.code === row.code ? .95 : .7) * statusColors[row.status].opacity,
						stroke: selected?.code === row.code ? C.dark : C.card,
						strokeWidth: selected?.code === row.code ? 3 : 1.5,
						onClick: () => onSelect(row),
						className: "cursor-pointer hover:opacity-90",
						children: /* @__PURE__ */ jsx("title", { children: `${row.code} · ${row.status}` })
					}, row.code)),
					layers.delivered && rows.filter((row) => row.delivery === "Entregado").map((row) => /* @__PURE__ */ jsx("polygon", {
						points: row.points,
						fill: "none",
						stroke: C.dark,
						strokeWidth: "4",
						strokeDasharray: "7 3"
					}, `delivered-${row.code}`)),
					layers.pending && rows.filter((row) => row.delivery !== "Entregado").map((row) => /* @__PURE__ */ jsx("polygon", {
						points: row.points,
						fill: "none",
						stroke: C.primary,
						strokeWidth: "3",
						strokeDasharray: "4 3"
					}, `pending-${row.code}`)),
					layers.interferences && [
						[135, 165],
						[300, 151],
						[452, 180],
						[218, 236]
					].map(([x, y], index) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("circle", {
						cx: x,
						cy: y,
						r: "8",
						fill: C.primary,
						stroke: C.card,
						strokeWidth: "2"
					}), /* @__PURE__ */ jsx("text", {
						x,
						y: y + 3,
						textAnchor: "middle",
						fontSize: "8",
						fill: C.card,
						children: "!"
					})] }, index)),
					layers.controls && [
						[42, 304],
						[271, 224],
						[548, 104]
					].map(([x, y], index) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("circle", {
						cx: x,
						cy: y,
						r: "6",
						fill: C.dark
					}), /* @__PURE__ */ jsx("circle", {
						cx: x,
						cy: y,
						r: "11",
						fill: "none",
						stroke: C.dark
					})] }, index))
				]
			}),
			/* @__PURE__ */ jsxs("fieldset", {
				className: "absolute left-3 top-20 z-10 w-44 rounded-lg border border-border bg-card/95 p-2.5",
				children: [/* @__PURE__ */ jsxs("legend", {
					className: "flex items-center gap-1.5 px-1 text-xs font-semibold text-foreground",
					children: [/* @__PURE__ */ jsx(Layers3, {
						size: 14,
						"aria-hidden": true
					}), " Capas del mapa"]
				}), Object.entries({
					alignment: "Trazado de obra",
					interferences: "Interferencias",
					delivered: "Áreas entregadas",
					pending: "Áreas pendientes",
					controls: "Puntos de control"
				}).map(([key, label]) => /* @__PURE__ */ jsxs("label", {
					className: "flex cursor-pointer items-center justify-between py-1 text-xs",
					children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: layers[key],
						onChange: () => onLayers((current) => ({
							...current,
							[key]: !current[key]
						})),
						className: "accent-primary"
					})]
				}, key))]
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "absolute bottom-3 left-3 z-10 grid grid-cols-2 gap-x-3 gap-y-1 rounded-lg border border-border bg-card/95 p-2.5 text-xs",
				"aria-label": "Leyenda de estados",
				children: Object.entries(statusColors).map(([status, color]) => /* @__PURE__ */ jsxs("li", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ jsx("i", {
						className: "size-2 rounded-sm",
						style: {
							background: color.fill,
							opacity: color.opacity
						},
						"aria-hidden": true
					}), status]
				}, status))
			}),
			selected && /* @__PURE__ */ jsxs("div", {
				className: "absolute right-3 top-20 z-20 w-72 rounded-lg border border-border bg-card p-3",
				role: "dialog",
				"aria-label": `Predio ${selected.code}`,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-2 flex justify-between gap-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("b", {
							className: "text-sm text-primary-dark",
							children: selected.code
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs font-medium",
							children: selected.passive
						})] }), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => onSelect(null),
							"aria-label": "Cerrar ficha del predio",
							className: "rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground",
							children: /* @__PURE__ */ jsx(X, { size: 16 })
						})]
					}),
					/* @__PURE__ */ jsx("dl", { children: [
						["Área afectada", `${number(selected.area)} m²`],
						["Valor tasado", money(selected.appraised, 2, amountUnit)],
						["Monto aprobado", money(selected.approved, 2, amountUnit)],
						["Monto pagado", money(selected.paid, 2, amountUnit)],
						["Saldo", money(selected.approved - selected.paid, 2, amountUnit)],
						["Entrega", selected.delivery],
						["Estado registral", selected.registry],
						["Interferencias", selected.interference],
						["Riesgo", selected.risk]
					].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
						className: "flex justify-between gap-2 border-t border-border py-1.5 text-xs",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "text-muted-foreground",
							children: label
						}), /* @__PURE__ */ jsx("dd", {
							className: "text-right font-semibold tabular-nums",
							children: value
						})]
					}, label)) }),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						size: "sm",
						className: "mt-2 w-full",
						disabled: true,
						title: "Próximamente",
						children: [/* @__PURE__ */ jsx(FileCheck2, {}), " Ver documentos (próximamente)"]
					})
				]
			})
		]
	});
}
function BuscarEnTabla({ value, onChange, label }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "relative block",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: label
			}),
			/* @__PURE__ */ jsx(Search, {
				size: 16,
				className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("input", {
				type: "search",
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder: label,
				className: `${controlClase} w-56 pl-9`
			})
		]
	});
}
function OrdenarTh({ label, onClick }) {
	return /* @__PURE__ */ jsx("th", {
		scope: "col",
		className: TH,
		children: /* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick,
			className: "inline-flex items-center gap-1 rounded-sm hover:underline",
			children: [
				label,
				" ",
				/* @__PURE__ */ jsx(ChevronsUpDown, {
					size: 14,
					"aria-hidden": true
				})
			]
		})
	});
}
function PaymentsTable({ rows, search, onSearch, concept, onClearConcept, amountUnit }) {
	const [statusFilter, setStatusFilter] = useState("TODOS");
	const [ascending, setAscending] = useState(true);
	const visibleRows = [...rows].filter((row) => statusFilter === "TODOS" || row.status === statusFilter).sort((a, b) => ascending ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code));
	const statusTone = (status) => status === "Emitido no entregado" ? "destructive" : status === "Próximo a vencer" ? "warning" : status === "Pagado" ? "success" : "primary";
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Tabla de pagos prediales",
		className: "mb-4",
		acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			concept && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: onClearConcept,
				children: [
					"Concepto: ",
					concept,
					" ",
					/* @__PURE__ */ jsx(X, {}),
					" Quitar"
				]
			}),
			/* @__PURE__ */ jsx(BuscarEnTabla, {
				value: search,
				onChange: onSearch,
				label: "Buscar código o beneficiario"
			}),
			/* @__PURE__ */ jsxs("select", {
				value: statusFilter,
				onChange: (event) => setStatusFilter(event.target.value),
				className: `${controlClase} w-48`,
				"aria-label": "Estado del pago",
				children: [
					/* @__PURE__ */ jsx("option", { children: "TODOS" }),
					/* @__PURE__ */ jsx("option", { children: "Pagado" }),
					/* @__PURE__ */ jsx("option", { children: "En proceso" }),
					/* @__PURE__ */ jsx("option", { children: "Emitido no entregado" }),
					/* @__PURE__ */ jsx("option", { children: "Próximo a vencer" })
				]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => exportExcel("pagos_prediales", [
					"Código",
					"Beneficiario",
					"Concepto",
					"Aprobado",
					"Certificado",
					"Devengado",
					"Girado",
					"Pagado",
					"Programada",
					"Efectiva",
					"Saldo",
					"Estado"
				], visibleRows.map((row) => [
					row.code,
					row.beneficiary,
					row.concept,
					row.approved,
					row.certified,
					row.accrued,
					row.drawn,
					row.paid,
					displayDate(row.programmed),
					displayDate(row.effective),
					row.balance,
					row.status
				])),
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar Excel"]
			})
		] }),
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Trazabilidad desde aprobación hasta pago efectivo."
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1450px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx(OrdenarTh, {
					label: "Código",
					onClick: () => setAscending((current) => !current)
				}), [
					"Beneficiario",
					"Concepto",
					"Aprobado",
					"Certificado",
					"Devengado",
					"Girado",
					"Pagado",
					"Fecha programada",
					"Fecha efectiva",
					"Saldo",
					"Estado"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: head
				}, head))] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [!visibleRows.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 12,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Ningún pago coincide con los filtros."
					}) }), visibleRows.map((row) => /* @__PURE__ */ jsxs("tr", {
						className: `${TR} hover:bg-primary-soft/40`,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold text-primary-dark`,
								children: row.code
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-medium`,
								children: row.beneficiary
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.concept
							}),
							[
								row.approved,
								row.certified,
								row.accrued,
								row.drawn,
								row.paid
							].map((value, index) => /* @__PURE__ */ jsx("td", {
								className: `${TD} font-medium tabular-nums`,
								children: money(value, 2, amountUnit)
							}, index)),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: displayDate(row.programmed)
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: displayDate(row.effective)
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold tabular-nums`,
								children: money(row.balance, 2, amountUnit)
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: /* @__PURE__ */ jsx(StatusBadge, {
									tono: statusTone(row.status),
									children: row.status
								})
							})
						]
					}, row.code))]
				})]
			})
		})]
	});
}
function RegistryIcon({ status }) {
	const config = status === "Inscrito" ? {
		Icon: CheckCircle2,
		cls: "text-success"
	} : status === "Observado" ? {
		Icon: AlertCircle,
		cls: "text-warning"
	} : status === "Subsanado" ? {
		Icon: FileCheck2,
		cls: "text-primary-dark"
	} : status === "Tachado" ? {
		Icon: FileX2,
		cls: "text-destructive"
	} : status === "Archivado" ? {
		Icon: Archive,
		cls: "text-muted-foreground"
	} : {
		Icon: FileClock,
		cls: "text-muted-foreground"
	};
	const Icon = config.Icon;
	return /* @__PURE__ */ jsx(Icon, {
		size: 16,
		className: config.cls,
		"aria-hidden": true
	});
}
function RegistryTable({ rows, search, onSearch }) {
	const [statusFilter, setStatusFilter] = useState("TODOS");
	const [ascending, setAscending] = useState(true);
	const visibleRows = [...rows].filter((row) => statusFilter === "TODOS" || row.status === statusFilter).sort((a, b) => ascending ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code));
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Tabla de seguimiento registral",
		className: "mb-4",
		acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(BuscarEnTabla, {
				value: search,
				onChange: onSearch,
				label: "Buscar predio, título u oficina"
			}),
			/* @__PURE__ */ jsxs("select", {
				value: statusFilter,
				onChange: (event) => setStatusFilter(event.target.value),
				className: `${controlClase} w-40`,
				"aria-label": "Estado registral",
				children: [
					/* @__PURE__ */ jsx("option", { children: "TODOS" }),
					/* @__PURE__ */ jsx("option", { children: "Pendiente" }),
					/* @__PURE__ */ jsx("option", { children: "Observado" }),
					/* @__PURE__ */ jsx("option", { children: "Subsanado" }),
					/* @__PURE__ */ jsx("option", { children: "Inscrito" }),
					/* @__PURE__ */ jsx("option", { children: "Tachado" }),
					/* @__PURE__ */ jsx("option", { children: "Archivado" })
				]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => exportExcel("seguimiento_registral", [
					"Predio",
					"Oficina",
					"Título",
					"Presentación",
					"Estado",
					"Observación",
					"Límite",
					"Partida",
					"Responsable"
				], visibleRows.map((row) => [
					row.code,
					row.office,
					row.title,
					displayDate(row.presentation),
					row.status,
					row.observation,
					displayDate(row.deadline),
					row.resulting,
					row.owner
				])),
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar Excel"]
			})
		] }),
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Presentación, observaciones, subsanaciones e inscripción."
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1250px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx(OrdenarTh, {
					label: "Predio",
					onClick: () => setAscending((current) => !current)
				}), [
					"Oficina registral",
					"Número de título",
					"Presentación",
					"Estado",
					"Observación",
					"Límite de subsanación",
					"Partida resultante",
					"Responsable"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: head
				}, head))] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [!visibleRows.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 9,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Ningún título coincide con los filtros."
					}) }), visibleRows.map((row) => /* @__PURE__ */ jsxs("tr", {
						className: `${TR} hover:bg-primary-soft/40`,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold text-primary-dark`,
								children: row.code
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.office
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-medium`,
								children: row.title
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: displayDate(row.presentation)
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(RegistryIcon, { status: row.status }), /* @__PURE__ */ jsx("b", { children: row.status })]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.observation
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: displayDate(row.deadline)
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.resulting
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.owner
							})
						]
					}, row.code))]
				})]
			})
		})]
	});
}
function ClosureTable({ rows }) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("TODOS");
	const [ascending, setAscending] = useState(true);
	const controlsFor = (row) => [
		row.paid >= row.approved * .98,
		row.delivery === "Entregado",
		row.interference === "Liberada",
		row.registry === "Inscrito",
		mapProperties.indexOf(row) % 4 !== 2
	];
	const visibleRows = [...rows].filter((row) => !search.trim() || `${row.code} ${row.passive}`.toLowerCase().includes(search.toLowerCase())).filter((row) => statusFilter === "TODOS" || (controlsFor(row).every(Boolean) ? "CERRADO" : "EN PROCESO") === statusFilter).sort((a, b) => ascending ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code));
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Control de cierre integral por predio",
		className: "mb-4",
		acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(BuscarEnTabla, {
				value: search,
				onChange: setSearch,
				label: "Buscar predio o sujeto pasivo"
			}),
			/* @__PURE__ */ jsxs("select", {
				value: statusFilter,
				onChange: (event) => setStatusFilter(event.target.value),
				className: `${controlClase} w-36`,
				"aria-label": "Estado integral",
				children: [
					/* @__PURE__ */ jsx("option", { children: "TODOS" }),
					/* @__PURE__ */ jsx("option", { children: "CERRADO" }),
					/* @__PURE__ */ jsx("option", { children: "EN PROCESO" })
				]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => exportExcel("cierre_integral", [
					"Predio",
					"Pago conciliado",
					"Entrega física",
					"Interferencias",
					"Inscripción",
					"Expediente",
					"Estado"
				], visibleRows.map((row) => {
					const controls = controlsFor(row);
					return [
						row.code,
						...controls.map((value) => value ? "Conforme" : "Pendiente"),
						controls.every(Boolean) ? "CERRADO" : "EN PROCESO"
					];
				})),
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar Excel"]
			})
		] }),
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "El predio se cierra únicamente cuando los cinco controles están conformes."
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1050px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx(OrdenarTh, {
					label: "Predio",
					onClick: () => setAscending((current) => !current)
				}), [
					"Pago conciliado",
					"Entrega física",
					"Interferencias liberadas",
					"Inscripción concluida",
					"Expediente completo",
					"Estado integral"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: `${TH} text-center`,
					children: head
				}, head))] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [!visibleRows.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 7,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Ningún predio coincide con los filtros."
					}) }), visibleRows.map((row) => {
						const controls = controlsFor(row);
						const closed = controls.every(Boolean);
						return /* @__PURE__ */ jsxs("tr", {
							className: TR,
							children: [
								/* @__PURE__ */ jsx("td", {
									className: `${TD} font-semibold text-primary-dark`,
									children: row.code
								}),
								controls.map((value, controlIndex) => /* @__PURE__ */ jsx("td", {
									className: `${TD} text-center`,
									children: value ? /* @__PURE__ */ jsx(CheckCircle2, {
										size: 16,
										className: "mx-auto text-success",
										"aria-label": "Conforme"
									}) : /* @__PURE__ */ jsx(AlertCircle, {
										size: 16,
										className: "mx-auto text-destructive",
										"aria-label": "Pendiente"
									})
								}, controlIndex)),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} text-center`,
									children: /* @__PURE__ */ jsx(StatusBadge, {
										tono: closed ? "success" : "warning",
										children: closed ? "CERRADO" : "EN PROCESO"
									})
								})
							]
						}, row.code);
					})]
				})]
			})
		})]
	});
}
function AuditPanel({ open, onToggle }) {
	const [search, setSearch] = useState("");
	const [userFilter, setUserFilter] = useState("TODOS");
	const [ascending, setAscending] = useState(false);
	const visibleAudits = [...audits].filter((row) => userFilter === "TODOS" || row[1] === userFilter).filter((row) => !search.trim() || row.join(" ").toLowerCase().includes(search.toLowerCase())).sort((a, b) => ascending ? a[0].localeCompare(b[0]) : b[0].localeCompare(a[0]));
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Panel de auditoría",
		acciones: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			"aria-expanded": open,
			onClick: onToggle,
			children: [open ? "Ocultar auditoría" : "Mostrar auditoría", /* @__PURE__ */ jsx(ChevronDown, { className: open ? "rotate-180" : "" })]
		}),
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Últimas modificaciones y documentos sustentatorios."
		}), open && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex flex-wrap justify-end gap-2",
			children: [
				/* @__PURE__ */ jsx(BuscarEnTabla, {
					value: search,
					onChange: setSearch,
					label: "Buscar modificación"
				}),
				/* @__PURE__ */ jsxs("select", {
					value: userFilter,
					onChange: (event) => setUserFilter(event.target.value),
					className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted w-44`,
					"aria-label": "Usuario",
					children: [/* @__PURE__ */ jsx("option", { children: "TODOS" }), Array.from(new Set(audits.map((row) => row[1]))).map((user) => /* @__PURE__ */ jsx("option", { children: user }, user))]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => exportExcel("auditoria_territorial", [
						"Fecha",
						"Usuario",
						"Campo",
						"Anterior",
						"Nuevo",
						"Motivo",
						"Documento"
					], visibleAudits.map((row) => [...row])),
					children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar Excel"]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1200px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx(OrdenarTh, {
					label: "Fecha",
					onClick: () => setAscending((current) => !current)
				}), [
					"Usuario",
					"Campo modificado",
					"Valor anterior",
					"Valor nuevo",
					"Motivo",
					"Documento sustentatorio"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: head
				}, head))] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [!visibleAudits.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 7,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Ninguna modificación coincide con los filtros."
					}) }), visibleAudits.map(([date, user, field, previous, next, reason, document]) => /* @__PURE__ */ jsxs("tr", {
						className: TR,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: displayDate(date)
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-medium`,
								children: user
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: field
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} text-muted-foreground`,
								children: previous
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold`,
								children: next
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: reason
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} text-primary-dark`,
								children: document
							})
						]
					}, `${date}-${field}`))]
				})]
			})
		})] })]
	});
}
//#endregion
export { TerritorialPagosDashboard as n, Route$1 as t };
