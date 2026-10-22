import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as SheetDescription, n as Sheet$1, o as SheetHeader, r as SheetContent, s as SheetTitle, t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Cable, CheckCircle2, Clock3, Download, FileCheck2, FileWarning, FilterX, HandCoins, Search } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Line, LineChart as LineChart$1, Pie, PieChart, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.contractual-servicios-interferencias.tsx?tsr-split=component
var C = {
	primary: "var(--color-primary)",
	dark: "var(--color-primary-dark)",
	highlight: "var(--color-highlight)",
	muted: "var(--color-muted-foreground)",
	border: "var(--color-border)"
};
var TICK = {
	fontSize: 12,
	fill: C.muted
};
var LEGEND = { fontSize: 12 };
var contracts = [
	{
		number: "CS-014-2026",
		provider: "Consorcio Predial Centro",
		service: "Diagnóstico técnico-legal",
		amount: 12.8,
		start: "15/01/2026",
		end: "30/11/2026",
		physical: 72,
		financial: 68,
		compliant: 18,
		observed: 3,
		penalties: .12,
		balance: 4.1,
		owner: "M. Salazar",
		paid: 6.4,
		payable: 1.2,
		committed: 1.1
	},
	{
		number: "OS-087-2026",
		provider: "GeoVial Ingeniería SAC",
		service: "Topografía",
		amount: 9.6,
		start: "02/02/2026",
		end: "15/10/2026",
		physical: 83,
		financial: 76,
		compliant: 24,
		observed: 2,
		penalties: .04,
		balance: 2.3,
		owner: "C. Romero",
		paid: 6.1,
		payable: .8,
		committed: .4
	},
	{
		number: "CS-021-2026",
		provider: "Tasaciones Andinas SRL",
		service: "Tasación",
		amount: 8.4,
		start: "10/03/2026",
		end: "20/12/2026",
		physical: 61,
		financial: 64,
		compliant: 15,
		observed: 5,
		penalties: .18,
		balance: 3,
		owner: "L. Quispe",
		paid: 4.2,
		payable: .9,
		committed: .3
	},
	{
		number: "OS-103-2026",
		provider: "Gestión Social Perú",
		service: "Gestión social",
		amount: 7.2,
		start: "05/01/2026",
		end: "28/09/2026",
		physical: 78,
		financial: 59,
		compliant: 19,
		observed: 6,
		penalties: .21,
		balance: 2.9,
		owner: "A. Paredes",
		paid: 3.4,
		payable: .8,
		committed: .1
	},
	{
		number: "CS-029-2026",
		provider: "InterRedes Consultores",
		service: "Interferencias",
		amount: 6.8,
		start: "18/02/2026",
		end: "05/11/2026",
		physical: 52,
		financial: 57,
		compliant: 11,
		observed: 7,
		penalties: .26,
		balance: 2.5,
		owner: "R. Huamán",
		paid: 3,
		payable: .7,
		committed: .6
	},
	{
		number: "OS-118-2026",
		provider: "Legal & Registro Asociados",
		service: "Estudio de títulos",
		amount: 5.9,
		start: "22/01/2026",
		end: "10/09/2026",
		physical: 88,
		financial: 81,
		compliant: 27,
		observed: 2,
		penalties: 0,
		balance: 1.1,
		owner: "M. Salazar",
		paid: 4.2,
		payable: .4,
		committed: .2
	},
	{
		number: "CS-033-2026",
		provider: "Catastro Integral SAC",
		service: "Catastro",
		amount: 5.1,
		start: "11/04/2026",
		end: "18/12/2026",
		physical: 46,
		financial: 51,
		compliant: 9,
		observed: 4,
		penalties: .08,
		balance: 2,
		owner: "C. Romero",
		paid: 2.2,
		payable: .5,
		committed: .4
	},
	{
		number: "OS-126-2026",
		provider: "Notaría y Archivo Digital",
		service: "Notaría y registro",
		amount: 3.7,
		start: "06/02/2026",
		end: "30/08/2026",
		physical: 69,
		financial: 72,
		compliant: 31,
		observed: 3,
		penalties: .03,
		balance: .8,
		owner: "R. Huamán",
		paid: 2.4,
		payable: .3,
		committed: .2
	}
];
var monthlyProgress = [
	{
		month: "Ene",
		physical: 9,
		financial: 7
	},
	{
		month: "Feb",
		physical: 17,
		financial: 14
	},
	{
		month: "Mar",
		physical: 26,
		financial: 23
	},
	{
		month: "Abr",
		physical: 38,
		financial: 30
	},
	{
		month: "May",
		physical: 49,
		financial: 37
	},
	{
		month: "Jun",
		physical: 58,
		financial: 44
	},
	{
		month: "Jul",
		physical: 67,
		financial: 53
	},
	{
		month: "Ago",
		physical: 73,
		financial: 62
	},
	{
		month: "Sep",
		physical: 80,
		financial: 71
	},
	{
		month: "Oct",
		physical: 87,
		financial: 80
	},
	{
		month: "Nov",
		physical: 93,
		financial: 89
	},
	{
		month: "Dic",
		physical: 98,
		financial: 96
	}
];
var specialties = [
	[
		"Topografía",
		9.6,
		468
	],
	[
		"Catastro",
		5.1,
		384
	],
	[
		"Diagnóstico técnico-legal",
		12.8,
		612
	],
	[
		"Estudio de títulos",
		5.9,
		327
	],
	[
		"Expedientes",
		8.7,
		446
	],
	[
		"Tasación",
		8.4,
		358
	],
	[
		"Gestión social",
		7.2,
		521
	],
	[
		"Publicaciones",
		1.8,
		176
	],
	[
		"Notaría",
		2.2,
		241
	],
	[
		"Registro",
		2.6,
		219
	],
	[
		"Logística",
		3.4,
		198
	],
	[
		"Asesoría legal",
		4.9,
		287
	],
	[
		"Interferencias",
		6.8,
		164
	]
].map(([name, amount, properties]) => ({
	name,
	amount,
	properties
}));
var providers = [
	{
		name: "Consorcio Predial Centro",
		deadlines: 78,
		quality: 84,
		amount: 12.8,
		risk: "Medio"
	},
	{
		name: "GeoVial Ingeniería",
		deadlines: 91,
		quality: 93,
		amount: 9.6,
		risk: "Bajo"
	},
	{
		name: "Tasaciones Andinas",
		deadlines: 68,
		quality: 79,
		amount: 8.4,
		risk: "Alto"
	},
	{
		name: "Gestión Social Perú",
		deadlines: 62,
		quality: 71,
		amount: 7.2,
		risk: "Alto"
	},
	{
		name: "InterRedes Consultores",
		deadlines: 55,
		quality: 66,
		amount: 6.8,
		risk: "Crítico"
	},
	{
		name: "Legal & Registro",
		deadlines: 94,
		quality: 91,
		amount: 5.9,
		risk: "Bajo"
	},
	{
		name: "Catastro Integral",
		deadlines: 73,
		quality: 82,
		amount: 5.1,
		risk: "Medio"
	},
	{
		name: "Notaría y Archivo",
		deadlines: 88,
		quality: 86,
		amount: 3.7,
		risk: "Bajo"
	}
];
var RISK_FILL = {
	Bajo: {
		fill: C.dark,
		opacity: 1
	},
	Medio: {
		fill: C.highlight,
		opacity: 1
	},
	Alto: {
		fill: C.primary,
		opacity: .55
	},
	Crítico: {
		fill: C.primary,
		opacity: 1
	}
};
var expenseDistribution = [
	{
		name: "Número de predios",
		value: 28,
		amount: 4.3,
		color: C.primary,
		opacity: 1
	},
	{
		name: "Área afectada",
		value: 21,
		amount: 3.2,
		color: C.dark,
		opacity: 1
	},
	{
		name: "Horas trabajadas",
		value: 14,
		amount: 2.1,
		color: C.highlight,
		opacity: 1
	},
	{
		name: "Valor de tasación",
		value: 16,
		amount: 2.5,
		color: C.muted,
		opacity: 1
	},
	{
		name: "Entregables",
		value: 12,
		amount: 1.8,
		color: C.primary,
		opacity: .5
	},
	{
		name: "Fórmula mixta",
		value: 9,
		amount: 1.4,
		color: C.dark,
		opacity: .5
	}
];
var interferenceTypes = [
	"Agua",
	"Saneamiento",
	"Electricidad",
	"Telecom.",
	"Gas",
	"Canales",
	"Señalización",
	"Semáforos",
	"Paraderos",
	"Otras"
];
var interferenceLocations = [
	"Tramo I · Norte",
	"Tramo I · Centro",
	"Tramo II · Norte",
	"Tramo II · Sur",
	"Tramo III · Este",
	"Tramo III · Oeste",
	"Acceso Norte"
];
var heatStatuses = [
	"released",
	"progress",
	"critical",
	"unknown"
];
var interferences = [
	{
		location: "Km 18+420 · Tramo I",
		entity: "SEDAPAL",
		solution: "Reubicación de red matriz DN 400",
		budget: 2.8,
		contract: "CS-041-2026",
		progress: 72,
		release: "30/09/2026",
		risk: "Medio"
	},
	{
		location: "Km 21+180 · Tramo I",
		entity: "Luz del Sur",
		solution: "Soterramiento de línea MT",
		budget: 4.2,
		contract: "CS-046-2026",
		progress: 38,
		release: "18/11/2026",
		risk: "Alto"
	},
	{
		location: "Km 27+650 · Tramo II",
		entity: "Cálidda",
		solution: "Protección de tubería de gas",
		budget: 3.5,
		contract: "CS-052-2026",
		progress: 24,
		release: "15/12/2026",
		risk: "Crítico"
	},
	{
		location: "Km 32+040 · Tramo II",
		entity: "Claro / Telefónica",
		solution: "Canalización compartida",
		budget: 1.6,
		contract: "OS-139-2026",
		progress: 61,
		release: "22/10/2026",
		risk: "Medio"
	},
	{
		location: "Km 38+910 · Tramo III",
		entity: "ANA / JUA",
		solution: "Reposición de canal de riego",
		budget: 2.1,
		contract: "CS-055-2026",
		progress: 19,
		release: "20/12/2026",
		risk: "Alto"
	},
	{
		location: "Km 44+230 · Tramo III",
		entity: "Municipalidad Provincial",
		solution: "Traslado de semáforos y señales",
		budget: .9,
		contract: "OS-144-2026",
		progress: 83,
		release: "12/09/2026",
		risk: "Bajo"
	}
];
var defaultFilters = {
	project: "TODOS",
	service: "TODOS",
	contract: "TODOS",
	provider: "TODOS",
	status: "TODOS",
	owner: "TODOS",
	start: "2026-01-01",
	end: "2026-12-31"
};
var kpiTone = {
	blue: "text-primary-dark",
	green: "text-success",
	amber: "text-warning",
	red: "text-destructive"
};
function money(value, digits = 1) {
	return `S/ ${value.toLocaleString("es-PE", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	})} MM`;
}
var riskTone = (risk) => risk === "Crítico" || risk === "Alto" ? "destructive" : risk === "Medio" ? "warning" : "success";
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
var TR = "h-10 border-t border-border hover:bg-primary-soft/40";
var TD = "px-3 py-1.5";
function ContractualServiciosPage() {
	const [filters, setFilters] = useState(defaultFilters);
	const [contractSearch, setContractSearch] = useState("");
	const [interferenceSearch, setInterferenceSearch] = useState("");
	const [selectedContract, setSelectedContract] = useState(null);
	const [selectedInterference, setSelectedInterference] = useState(null);
	const [selectedExpense, setSelectedExpense] = useState(null);
	const [updatedAt, setUpdatedAt] = useState("05/08/2026 11:12");
	const filteredContracts = useMemo(() => contracts.filter((row) => {
		if (filters.service !== "TODOS" && row.service !== filters.service) return false;
		if (filters.contract !== "TODOS" && row.number !== filters.contract) return false;
		if (filters.provider !== "TODOS" && row.provider !== filters.provider) return false;
		if (filters.owner !== "TODOS" && row.owner !== filters.owner) return false;
		const query = contractSearch.trim().toLowerCase();
		return !query || `${row.number} ${row.provider} ${row.service}`.toLowerCase().includes(query);
	}), [filters, contractSearch]);
	const scale = Math.max(.1, filteredContracts.length / contracts.length) * (filters.project === "TODOS" ? 1 : .67);
	const totalAmount = contracts.reduce((sum, row) => sum + row.amount, 0) * scale;
	const totalPaid = contracts.reduce((sum, row) => sum + row.paid, 0) * scale;
	const totalPayable = contracts.reduce((sum, row) => sum + row.payable, 0) * scale;
	const totalBalance = contracts.reduce((sum, row) => sum + row.balance, 0) * scale;
	const cards = [
		{
			label: "Contratos vigentes",
			value: Math.max(1, Math.round(18 * scale)).toString(),
			note: "14 servicios y 4 consultorías",
			trend: 2.1,
			color: "blue"
		},
		{
			label: "Monto total contratado",
			value: money(totalAmount),
			note: "Cartera contractual activa",
			trend: 4.8,
			color: "blue"
		},
		{
			label: "Monto devengado",
			value: money(totalPaid + totalPayable),
			note: "72.4% del contratado",
			trend: 7.2,
			color: "green"
		},
		{
			label: "Monto pagado",
			value: money(totalPaid),
			note: "64.8% del contratado",
			trend: 8.5,
			color: "green"
		},
		{
			label: "Saldo contractual",
			value: money(totalBalance),
			note: "Disponible por ejecutar",
			trend: -6.1,
			color: "amber"
		},
		{
			label: "Entregables pendientes",
			value: Math.max(1, Math.round(42 * scale)).toString(),
			note: "12 próximos en 15 días",
			trend: -9.3,
			color: "amber"
		},
		{
			label: "Entregables observados",
			value: Math.max(1, Math.round(17 * scale)).toString(),
			note: "Requieren subsanación",
			trend: -3.7,
			color: "red"
		},
		{
			label: "Penalidades acumuladas",
			value: money(.92 * scale, 2),
			note: "1.6% del contratado",
			trend: 11.4,
			color: "red"
		},
		{
			label: "Contratos próximos a vencer",
			value: Math.max(1, Math.round(5 * scale)).toString(),
			note: "Dentro de 45 días",
			trend: 0,
			color: "amber"
		},
		{
			label: "Interferencias críticas",
			value: Math.max(1, Math.round(13 * scale)).toString(),
			note: "Pendientes de liberación",
			trend: -7.8,
			color: "red"
		}
	];
	const contractChart = [...filteredContracts].sort((a, b) => b.amount - a.amount).map((row) => ({
		...row,
		executionLabel: `${row.financial}%`
	}));
	const alertMonths = monthlyProgress.filter((row) => Math.abs(row.physical - row.financial) > 10);
	const filteredInterferences = interferences.filter((row) => !interferenceSearch.trim() || `${row.location} ${row.entity} ${row.solution}`.toLowerCase().includes(interferenceSearch.toLowerCase()));
	function update(key, value) {
		setFilters((current) => ({
			...current,
			[key]: value
		}));
	}
	function reset() {
		setFilters(defaultFilters);
		setContractSearch("");
		setInterferenceSearch("");
		setSelectedExpense(null);
	}
	function exportData() {
		const header = "contrato,proveedor,servicio,monto,inicio,fin,avance_fisico,avance_financiero,conformes,observados,penalidades,saldo,responsable\n";
		const rows = filteredContracts.map((row) => [
			row.number,
			row.provider,
			row.service,
			row.amount,
			row.start,
			row.end,
			row.physical,
			row.financial,
			row.compliant,
			row.observed,
			row.penalties,
			row.balance,
			row.owner
		].map((cell) => `"${cell}"`).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([
			"﻿",
			header,
			rows
		], { type: "text/csv;charset=utf-8" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "dashboard_contractual.csv";
		link.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: HandCoins,
			titulo: "Contratos, servicios e interferencias",
			descripcion: "Control integrado de consultorías, proveedores, entregables y liberación de instalaciones.",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
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
							children: updatedAt
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
					onClick: exportData,
					children: [/* @__PURE__ */ jsx(Download, {}), " Exportar CSV"]
				})
			] })
		}),
		/* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-1.5 text-xs text-warning",
			children: "Datos de demostración: contratos, proveedores e interferencias no provienen de un servicio."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Alcance contractual",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: () => setUpdatedAt("05/08/2026 11:28"),
				children: "Actualizar información"
			}),
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
						label: "Tipo de servicio",
						value: filters.service,
						onChange: (v) => update("service", v),
						options: ["TODOS", ...contracts.map((row) => row.service)]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Contrato",
						value: filters.contract,
						onChange: (v) => update("contract", v),
						options: ["TODOS", ...contracts.map((row) => row.number)]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Proveedor",
						value: filters.provider,
						onChange: (v) => update("provider", v),
						options: ["TODOS", ...contracts.map((row) => row.provider)]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado contractual",
						value: filters.status,
						onChange: (v) => update("status", v),
						options: [
							"TODOS",
							"Vigente",
							"Suspendido",
							"Por vencer",
							"Cerrado"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Responsable",
						value: filters.owner,
						onChange: (v) => update("owner", v),
						options: ["TODOS", ...contracts.map((row) => row.owner)]
					}),
					/* @__PURE__ */ jsx(DateFilter, {
						label: "Fecha de inicio",
						value: filters.start,
						onChange: (v) => update("start", v)
					}),
					/* @__PURE__ */ jsx(DateFilter, {
						label: "Fecha de fin",
						value: filters.end,
						onChange: (v) => update("end", v)
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mb-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5",
			"aria-label": "Indicadores contractuales",
			children: cards.map((card) => /* @__PURE__ */ jsx(KpiCard, { ...card }, card.label))
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid gap-4 2xl:grid-cols-[1.1fr_.9fr]",
			"aria-label": "Ejecución por contrato",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Ejecución financiera por contrato",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Cada barra distribuye el monto del contrato entre pagado, devengado pendiente, comprometido y saldo; se ordena de mayor a menor monto. Seleccione una barra para abrir la ficha."
				}), /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 405,
					children: /* @__PURE__ */ jsxs(BarChart, {
						data: contractChart,
						layout: "vertical",
						margin: {
							left: 20,
							right: 56,
							top: 8
						},
						onClick: (state) => {
							if (typeof state?.activeLabel === "string") {
								const row = contracts.find((item) => item.number === state.activeLabel);
								if (row) setSelectedContract(row);
							}
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: C.border,
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
								dataKey: "number",
								width: 100,
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => money(Number(value)) }),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "paid",
								name: "Pagado",
								stackId: "a",
								fill: C.dark,
								cursor: "pointer"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "payable",
								name: "Devengado pendiente",
								stackId: "a",
								fill: C.primary,
								cursor: "pointer"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "committed",
								name: "Comprometido",
								stackId: "a",
								fill: C.highlight,
								cursor: "pointer"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "balance",
								name: "Saldo contractual",
								stackId: "a",
								fill: C.border,
								radius: [
									0,
									3,
									3,
									0
								],
								cursor: "pointer",
								children: /* @__PURE__ */ jsx(LabelList, {
									dataKey: "executionLabel",
									position: "right",
									style: {
										fontSize: 12,
										fill: C.muted,
										fontWeight: 600
									}
								})
							})
						]
					})
				})]
			}), /* @__PURE__ */ jsxs(Section, {
				titulo: "Avance físico vs. financiero",
				acciones: /* @__PURE__ */ jsxs(StatusBadge, {
					tono: alertMonths.length ? "destructive" : "success",
					children: [
						alertMonths.length ? /* @__PURE__ */ jsx(AlertTriangle, {
							size: 12,
							className: "mr-1",
							"aria-hidden": true
						}) : /* @__PURE__ */ jsx(CheckCircle2, {
							size: 12,
							className: "mr-1",
							"aria-hidden": true
						}),
						alertMonths.length,
						" periodos fuera de tolerancia"
					]
				}),
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Compara entregables conformes con ejecución financiera a lo largo del tiempo; una separación mayor a 10 puntos genera una alerta."
				}), /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 365,
					children: /* @__PURE__ */ jsxs(LineChart$1, {
						data: monthlyProgress,
						margin: {
							left: 0,
							right: 12,
							top: 12
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: C.border,
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "month",
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(YAxis, {
								domain: [0, 100],
								tickFormatter: (v) => `${v}%`,
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => `${value}%` }),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
							/* @__PURE__ */ jsx(ReferenceLine, {
								y: 75,
								stroke: C.muted,
								strokeDasharray: "4 4",
								label: {
									value: "Meta",
									fontSize: 12,
									fill: C.muted
								}
							}),
							/* @__PURE__ */ jsx(Line, {
								type: "monotone",
								dataKey: "physical",
								name: "Entregables conformes",
								stroke: C.dark,
								strokeWidth: 2.5,
								dot: { r: 3 }
							}),
							/* @__PURE__ */ jsx(Line, {
								type: "monotone",
								dataKey: "financial",
								name: "Ejecución financiera",
								stroke: C.primary,
								strokeWidth: 2.5,
								dot: { r: 3 }
							})
						]
					})
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid gap-4 2xl:grid-cols-[1.15fr_.85fr]",
			"aria-label": "Especialidades y proveedores",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Servicios por especialidad",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Para cada especialidad compara el monto contratado con la cantidad de predios atendidos, mostrando dónde se concentra el servicio."
				}), /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 390,
					children: /* @__PURE__ */ jsxs(BarChart, {
						data: specialties,
						margin: {
							left: 5,
							right: 8,
							top: 18,
							bottom: 70
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: C.border,
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "name",
								angle: -35,
								textAnchor: "end",
								interval: 0,
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(YAxis, {
								yAxisId: "amount",
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(YAxis, {
								yAxisId: "properties",
								orientation: "right",
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(Tooltip, { formatter: (value, name) => name === "Monto contratado" ? money(Number(value)) : `${value} predios` }),
							/* @__PURE__ */ jsx(Legend, {
								wrapperStyle: LEGEND,
								verticalAlign: "top"
							}),
							/* @__PURE__ */ jsx(Bar, {
								yAxisId: "amount",
								dataKey: "amount",
								name: "Monto contratado",
								fill: C.primary,
								radius: [
									3,
									3,
									0,
									0
								]
							}),
							/* @__PURE__ */ jsx(Bar, {
								yAxisId: "properties",
								dataKey: "properties",
								name: "Predios atendidos",
								fill: C.highlight,
								radius: [
									3,
									3,
									0,
									0
								]
							})
						]
					})
				})]
			}), /* @__PURE__ */ jsxs(Section, {
				titulo: "Evaluación de proveedores",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Más a la derecha significa mejor cumplimiento de plazo y más arriba mejor calidad; el tamaño indica monto y el color, nivel de riesgo."
				}), /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 390,
					children: /* @__PURE__ */ jsxs(ScatterChart, {
						margin: {
							left: 10,
							right: 24,
							top: 14,
							bottom: 12
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: C.border,
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ jsx(XAxis, {
								type: "number",
								dataKey: "deadlines",
								name: "Cumplimiento de plazos",
								unit: "%",
								domain: [45, 100],
								tick: TICK
							}),
							/* @__PURE__ */ jsx(YAxis, {
								type: "number",
								dataKey: "quality",
								name: "Entregables conformes",
								unit: "%",
								domain: [55, 100],
								tick: TICK
							}),
							/* @__PURE__ */ jsx(ZAxis, {
								type: "number",
								dataKey: "amount",
								range: [100, 650],
								name: "Monto contratado"
							}),
							/* @__PURE__ */ jsx(Tooltip, {
								cursor: { strokeDasharray: "3 3" },
								formatter: (value, name) => name === "Monto contratado" ? money(Number(value)) : `${value}%`
							}),
							/* @__PURE__ */ jsx(ReferenceLine, {
								x: 75,
								stroke: C.muted,
								strokeDasharray: "4 4"
							}),
							/* @__PURE__ */ jsx(ReferenceLine, {
								y: 80,
								stroke: C.muted,
								strokeDasharray: "4 4"
							}),
							[
								"Bajo",
								"Medio",
								"Alto",
								"Crítico"
							].map((risk) => /* @__PURE__ */ jsx(Scatter, {
								name: risk,
								data: providers.filter((row) => row.risk === risk),
								fill: RISK_FILL[risk].fill,
								fillOpacity: RISK_FILL[risk].opacity
							}, risk)),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND })
						]
					})
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid gap-4 xl:grid-cols-[.7fr_1.3fr]",
			"aria-label": "Gastos compartidos e interferencias",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Distribución de gastos compartidos",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Muestra cómo se distribuyen los gastos compartidos según el método de asignación y cuánto monto aún falta distribuir."
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid items-center md:grid-cols-[1fr_.9fr]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: 290,
							children: /* @__PURE__ */ jsxs(PieChart, { children: [/* @__PURE__ */ jsx(Pie, {
								data: expenseDistribution,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 62,
								outerRadius: 96,
								paddingAngle: 2,
								stroke: C.border,
								cursor: "pointer",
								onClick: (row) => setSelectedExpense(row.name),
								children: expenseDistribution.map((row) => /* @__PURE__ */ jsx(Cell, {
									fill: row.color,
									fillOpacity: row.opacity,
									opacity: selectedExpense && selectedExpense !== row.name ? .3 : 1
								}, row.name))
							}), /* @__PURE__ */ jsx(Tooltip, { formatter: (value) => `${value}%` })] })
						}), /* @__PURE__ */ jsxs("div", {
							className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs uppercase text-muted-foreground",
									children: "Distribuido"
								}),
								/* @__PURE__ */ jsx("b", {
									className: "text-lg",
									children: "S/ 15.3 MM"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "mt-1 text-xs font-semibold text-warning",
									children: "Pendiente: S/ 2.7 MM"
								})
							]
						})]
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-1",
						children: expenseDistribution.map((row) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							"aria-pressed": selectedExpense === row.name,
							onClick: () => setSelectedExpense((current) => current === row.name ? null : row.name),
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
							}), /* @__PURE__ */ jsx("b", { children: money(row.amount) })]
						}) }, row.name))
					})]
				})]
			}), /* @__PURE__ */ jsxs(Section, {
				titulo: "Matriz de liberación de interferencias",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Cruza cada tramo con el tipo de instalación: crítica requiere atención inmediata, en ejecución está en curso y liberada ya no afecta la obra."
				}), /* @__PURE__ */ jsx(Heatmap, {})]
			})]
		}),
		/* @__PURE__ */ jsx(ContractsTable, {
			rows: filteredContracts,
			search: contractSearch,
			onSearch: setContractSearch,
			onOpen: setSelectedContract,
			onExport: exportData
		}),
		/* @__PURE__ */ jsx(InterferencesTable, {
			rows: filteredInterferences,
			search: interferenceSearch,
			onSearch: setInterferenceSearch,
			onOpen: setSelectedInterference
		}),
		/* @__PURE__ */ jsx(DetailDrawer, {
			abierto: selectedContract !== null,
			title: selectedContract?.number ?? "",
			subtitle: "Ficha contractual y trazabilidad de entregables",
			icon: /* @__PURE__ */ jsx(FileCheck2, {
				size: 18,
				"aria-hidden": true
			}),
			fields: selectedContract ? [
				["Proveedor", selectedContract.provider],
				["Servicio", selectedContract.service],
				["Monto contratado", money(selectedContract.amount)],
				["Periodo", `${selectedContract.start} al ${selectedContract.end}`],
				["Avance físico", `${selectedContract.physical}%`],
				["Avance financiero", `${selectedContract.financial}%`],
				["Entregables conformes", selectedContract.compliant],
				["Entregables observados", selectedContract.observed],
				["Penalidades", money(selectedContract.penalties, 2)],
				["Saldo contractual", money(selectedContract.balance)],
				["Responsable", selectedContract.owner]
			] : [],
			onClose: () => setSelectedContract(null),
			action: "Abrir expediente contractual"
		}),
		/* @__PURE__ */ jsx(DetailDrawer, {
			abierto: selectedInterference !== null,
			title: selectedInterference?.location ?? "",
			subtitle: "Ficha operativa de liberación de interferencia",
			icon: /* @__PURE__ */ jsx(Cable, {
				size: 18,
				"aria-hidden": true
			}),
			fields: selectedInterference ? [
				["Entidad responsable", selectedInterference.entity],
				["Alternativa de solución", selectedInterference.solution],
				["Presupuesto", money(selectedInterference.budget)],
				["Contrato", selectedInterference.contract],
				["Avance", `${selectedInterference.progress}%`],
				["Liberación prevista", selectedInterference.release],
				["Riesgo para la obra", selectedInterference.risk]
			] : [],
			onClose: () => setSelectedInterference(null),
			action: "Abrir expediente de interferencia"
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
function DateFilter({ label, value, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("input", {
			type: "date",
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase
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
				className: "mt-1 flex items-center justify-between gap-1 text-xs text-muted-foreground",
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
function Heatmap() {
	const config = {
		released: {
			label: "Liberada",
			cls: "bg-success-soft text-success",
			swatch: "bg-success",
			symbol: "✓"
		},
		progress: {
			label: "En ejecución",
			cls: "bg-warning-soft text-warning",
			swatch: "bg-highlight",
			symbol: "◐"
		},
		critical: {
			label: "Crítica",
			cls: "bg-destructive-soft text-destructive",
			swatch: "bg-destructive",
			symbol: "!"
		},
		unknown: {
			label: "No identificada",
			cls: "bg-muted text-muted-foreground",
			swatch: "bg-border",
			symbol: "·"
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: [/* @__PURE__ */ jsxs("table", {
			className: "w-full min-w-[850px] text-sm",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
				scope: "col",
				className: TH,
				children: "Tramo"
			}), interferenceTypes.map((type) => /* @__PURE__ */ jsx("th", {
				scope: "col",
				className: `${TH} text-center`,
				children: type
			}, type))] }) }), /* @__PURE__ */ jsx("tbody", {
				className: "[&>tr:nth-child(even)]:bg-background",
				children: interferenceLocations.map((location, rowIndex) => /* @__PURE__ */ jsxs("tr", {
					className: "h-10 border-t border-border",
					children: [/* @__PURE__ */ jsx("td", {
						className: `${TD} font-semibold`,
						children: location
					}), interferenceTypes.map((type, columnIndex) => {
						const status = heatStatuses[(rowIndex * 3 + columnIndex * 2 + (columnIndex > 5 ? 1 : 0)) % 4];
						return /* @__PURE__ */ jsx("td", {
							className: "p-1 text-center",
							children: /* @__PURE__ */ jsx("span", {
								title: `${type}: ${config[status].label}`,
								"aria-label": `${type}: ${config[status].label}`,
								className: `inline-flex size-7 items-center justify-center rounded-sm text-xs font-bold ${config[status].cls}`,
								children: config[status].symbol
							})
						}, type);
					})]
				}, location))
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap justify-end gap-3 border-t border-border px-3 py-2 text-xs text-muted-foreground",
			children: Object.values(config).map((item) => /* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ jsx("i", {
					className: `size-2 rounded-sm ${item.swatch}`,
					"aria-hidden": true
				}), item.label]
			}, item.label))
		})]
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
				className: `${controlClase} w-64 pl-9`
			})
		]
	});
}
function ContractsTable({ rows, search, onSearch, onOpen, onExport }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Tabla de contratos y órdenes de servicio",
		className: "mb-4",
		acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(BuscarEnTabla, {
			value: search,
			onChange: onSearch,
			label: "Buscar contrato, proveedor o servicio"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			onClick: onExport,
			children: [/* @__PURE__ */ jsx(Download, {}), " Exportar CSV"]
		})] }),
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Seguimiento financiero, entregables, penalidades y responsables."
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1450px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
					"Número",
					"Proveedor",
					"Servicio",
					"Monto",
					"Inicio",
					"Fin",
					"Avance físico",
					"Avance financiero",
					"Conformes",
					"Observados",
					"Penalidades",
					"Saldo",
					"Responsable",
					"Acciones"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: `${TH} ${head === "Acciones" ? "text-right" : ""}`,
					children: head
				}, head)) }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [!rows.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 14,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Ningún contrato coincide con los filtros."
					}) }), rows.map((row) => /* @__PURE__ */ jsxs("tr", {
						className: TR,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold text-primary-dark`,
								children: row.number
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-medium`,
								children: row.provider
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.service
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold tabular-nums`,
								children: money(row.amount)
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.start
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.end
							}),
							/* @__PURE__ */ jsx(ProgressCell, {
								value: row.physical,
								color: "bg-primary-dark"
							}),
							/* @__PURE__ */ jsx(ProgressCell, {
								value: row.financial,
								color: "bg-primary"
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} tabular-nums text-success`,
								children: row.compliant
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} tabular-nums text-warning`,
								children: row.observed
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold tabular-nums ${row.penalties > .15 ? "text-destructive" : ""}`,
								children: money(row.penalties, 2)
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} tabular-nums`,
								children: money(row.balance)
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.owner
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} text-right`,
								children: /* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => onOpen(row),
									children: "Ver detalle"
								})
							})
						]
					}, row.number))]
				})]
			})
		})]
	});
}
function InterferencesTable({ rows, search, onSearch, onOpen }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Tabla operativa de interferencias",
		acciones: /* @__PURE__ */ jsx(BuscarEnTabla, {
			value: search,
			onChange: onSearch,
			label: "Buscar ubicación, entidad o solución"
		}),
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Soluciones, presupuestos, liberación prevista y riesgo para la obra."
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1200px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
					"Ubicación",
					"Entidad responsable",
					"Alternativa de solución",
					"Presupuesto",
					"Contrato",
					"Avance",
					"Liberación prevista",
					"Riesgo para la obra",
					"Acciones"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: `${TH} ${head === "Acciones" ? "text-right" : ""}`,
					children: head
				}, head)) }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [!rows.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 9,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Ninguna interferencia coincide con la búsqueda."
					}) }), rows.map((row) => /* @__PURE__ */ jsxs("tr", {
						className: TR,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold`,
								children: row.location
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.entity
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.solution
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold tabular-nums`,
								children: money(row.budget)
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} text-primary-dark`,
								children: row.contract
							}),
							/* @__PURE__ */ jsx(ProgressCell, {
								value: row.progress,
								color: row.progress < 40 ? "bg-destructive" : "bg-success"
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.release
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: /* @__PURE__ */ jsx(StatusBadge, {
									tono: riskTone(row.risk),
									children: row.risk
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} text-right`,
								children: /* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => onOpen(row),
									children: "Ver detalle"
								})
							})
						]
					}, row.location))]
				})]
			})
		})]
	});
}
function ProgressCell({ value, color }) {
	return /* @__PURE__ */ jsx("td", {
		className: TD,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx("div", {
				className: "h-1.5 w-16 rounded-sm bg-muted",
				role: "progressbar",
				"aria-valuenow": value,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				children: /* @__PURE__ */ jsx("div", {
					className: `h-full rounded-sm ${color}`,
					style: { width: `${value}%` }
				})
			}), /* @__PURE__ */ jsxs("b", {
				className: "tabular-nums",
				children: [value, "%"]
			})]
		})
	});
}
function DetailDrawer({ abierto, title, subtitle, icon, fields, onClose, action }) {
	return /* @__PURE__ */ jsx(Sheet$1, {
		open: abierto,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsxs(SheetContent, {
			className: "flex w-full flex-col gap-0 overflow-y-auto bg-card p-0 sm:max-w-md",
			children: [
				/* @__PURE__ */ jsxs(SheetHeader, {
					className: "border-b border-border px-4 py-4 text-left",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "flex items-center gap-2 text-xs font-semibold uppercase text-primary-dark",
							children: [icon, " Detalle de gestión"]
						}),
						/* @__PURE__ */ jsx(SheetTitle, {
							className: "text-xl font-semibold text-foreground",
							children: title
						}),
						/* @__PURE__ */ jsx(SheetDescription, {
							className: "text-xs",
							children: subtitle
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 overflow-auto px-4 py-4",
					children: [/* @__PURE__ */ jsx("dl", {
						className: "rounded-md border border-border",
						children: fields.map(([label, value]) => /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-[155px_1fr] gap-2 border-b border-border px-3 py-2 text-sm last:border-0",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "text-muted-foreground",
								children: label
							}), /* @__PURE__ */ jsx("dd", {
								className: "font-semibold text-foreground",
								children: value
							})]
						}, label))
					}), /* @__PURE__ */ jsxs("p", {
						role: "status",
						className: "mt-4 flex items-start gap-2 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
						children: [/* @__PURE__ */ jsx(FileWarning, {
							size: 14,
							className: "mt-0.5 shrink-0",
							"aria-hidden": true
						}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("b", {
							className: "block text-sm",
							children: "Seguimiento requerido"
						}), "Verificar el siguiente hito programado y registrar evidencia de conformidad."] })]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 border-t border-border px-4 py-3",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: onClose,
						children: "Cerrar detalle"
					}), /* @__PURE__ */ jsxs(Button, {
						type: "button",
						disabled: true,
						title: "Próximamente",
						children: [action, " (próximamente)"]
					})]
				})
			]
		})
	});
}
//#endregion
export { ContractualServiciosPage as component };
