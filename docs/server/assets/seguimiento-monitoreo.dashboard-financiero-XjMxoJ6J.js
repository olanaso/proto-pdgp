import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as SheetDescription, n as Sheet$1, o as SheetHeader, r as SheetContent, s as SheetTitle, t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDownRight, ArrowUpRight, ChevronRight, Clock3, Download, FileCheck2, FileText, FilterX, Landmark, ReceiptText, Search, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, LineChart as LineChart$1, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.dashboard-financiero.tsx?tsr-split=component
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
var months = [
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
var monthlyBase = [
	{
		month: "Ene",
		programmed: 55,
		paid: 36,
		execution: 6
	},
	{
		month: "Feb",
		programmed: 62,
		paid: 43,
		execution: 13
	},
	{
		month: "Mar",
		programmed: 68,
		paid: 50,
		execution: 21
	},
	{
		month: "Abr",
		programmed: 74,
		paid: 58,
		execution: 30
	},
	{
		month: "May",
		programmed: 80,
		paid: 66,
		execution: 40
	},
	{
		month: "Jun",
		programmed: 86,
		paid: 70,
		execution: 51
	},
	{
		month: "Jul",
		programmed: 91,
		paid: 75,
		execution: 62
	},
	{
		month: "Ago",
		programmed: 88,
		paid: 71,
		execution: 72
	},
	{
		month: "Sep",
		programmed: 83,
		paid: 63,
		execution: 80
	},
	{
		month: "Oct",
		programmed: 76,
		paid: 57,
		execution: 88
	},
	{
		month: "Nov",
		programmed: 70,
		paid: 49,
		execution: 94
	},
	{
		month: "Dic",
		programmed: 63,
		paid: 42,
		execution: 98
	}
];
var categoryBase = [
	[
		"Terrenos",
		124,
		42,
		18
	],
	[
		"Edificaciones",
		94,
		31,
		15
	],
	[
		"Plantaciones",
		36,
		18,
		12
	],
	[
		"Perjuicio económico",
		58,
		22,
		9
	],
	[
		"Incentivos",
		24,
		15,
		8
	],
	[
		"Compensaciones",
		48,
		17,
		11
	],
	[
		"Mejoras",
		34,
		14,
		9
	],
	[
		"Servicios técnicos",
		28,
		11,
		7
	],
	[
		"Servicios legales",
		21,
		9,
		6
	],
	[
		"Tasaciones",
		18,
		7,
		5
	],
	[
		"Publicaciones",
		6,
		3,
		2
	],
	[
		"Notaría",
		8,
		4,
		2
	],
	[
		"Registro",
		11,
		5,
		3
	],
	[
		"Gestión social",
		17,
		8,
		4
	],
	[
		"Interferencias",
		42,
		21,
		14
	],
	[
		"Gastos administrativos",
		15,
		7,
		5
	]
];
var gapRows = [
	{
		project: "Carretera Central",
		section: "Tramo I",
		budget: 186,
		estimated: 214,
		appraised: 161,
		paid: 104,
		pending: 110
	},
	{
		project: "Evitamiento Chimbote",
		section: "Tramo II",
		budget: 142,
		estimated: 138,
		appraised: 119,
		paid: 82,
		pending: 56
	},
	{
		project: "Puente Santa Rosa",
		section: "Acceso Norte",
		budget: 88,
		estimated: 103,
		appraised: 79,
		paid: 41,
		pending: 62
	},
	{
		project: "Longitudinal de la Sierra",
		section: "Tramo IV",
		budget: 224,
		estimated: 207,
		appraised: 188,
		paid: 132,
		pending: 75
	},
	{
		project: "Aeropuerto de Jauja",
		section: "Sector Oeste",
		budget: 95,
		estimated: 116,
		appraised: 87,
		paid: 48,
		pending: 68
	},
	{
		project: "Autopista del Sol",
		section: "Tramo III",
		budget: 168,
		estimated: 174,
		appraised: 142,
		paid: 96,
		pending: 78
	}
];
var defaultFilters = {
	project: "TODOS",
	investmentCode: "TODOS",
	year: "2026",
	funding: "TODAS",
	section: "TODOS",
	sector: "TODOS",
	procedure: "TODOS",
	period: "Acumulado anual"
};
function money(value, digits = 1) {
	return `${value < 0 ? "-" : ""}S/ ${Math.abs(value).toLocaleString("es-PE", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	})} MM`;
}
var riskTone = {
	Crítico: "destructive",
	Alto: "destructive",
	Medio: "warning",
	Bajo: "success"
};
var statusBar = {
	green: "bg-success",
	amber: "bg-highlight",
	red: "bg-destructive"
};
var statusText = {
	green: "Dentro de lo previsto",
	amber: "En observación",
	red: "Requiere atención"
};
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
function DashboardFinancieroPage() {
	const [filters, setFilters] = useState(defaultFilters);
	const [selectedMonth, setSelectedMonth] = useState(null);
	const [detail, setDetail] = useState(null);
	const [detailTab, setDetailTab] = useState("Predios");
	const [updatedAt, setUpdatedAt] = useState("05/08/2026 09:42");
	const [projectionHorizon, setProjectionHorizon] = useState(12);
	const filterFactor = useMemo(() => {
		let factor = 1;
		if (filters.project !== "TODOS") factor *= .42;
		if (filters.section !== "TODOS") factor *= .66;
		if (filters.procedure !== "TODOS") factor *= .81;
		if (filters.funding !== "TODAS") factor *= .88;
		return factor;
	}, [filters]);
	const scopeFactor = filterFactor * (selectedMonth ? .12 + months.indexOf(selectedMonth) * .004 : 1);
	const monthly = useMemo(() => monthlyBase.map((row) => ({
		...row,
		programmed: row.programmed * filterFactor,
		paid: row.paid * filterFactor
	})), [filterFactor]);
	const budget = 980 * scopeFactor;
	const estimated = 1052 * scopeFactor;
	const appraised = 817 * scopeFactor;
	const approved = 742 * scopeFactor;
	const certified = 684 * scopeFactor;
	const accrued = 593 * scopeFactor;
	const paid = 548 * scopeFactor;
	const available = 126 * scopeFactor;
	const gap = budget - estimated;
	const kpis = [
		{
			label: "Presupuesto multianual aprobado",
			value: 1240 * scopeFactor,
			trend: 3.8,
			status: "green"
		},
		{
			label: "Presupuesto vigente",
			value: budget,
			trend: 2.4,
			status: "green"
		},
		{
			label: "Costo estimado actualizado",
			value: estimated,
			trend: 5.9,
			status: "red"
		},
		{
			label: "Valor total tasado",
			value: appraised,
			trend: 4.1,
			status: "amber"
		},
		{
			label: "Aprobado para pagos prediales",
			value: approved,
			trend: 2.7,
			status: "green"
		},
		{
			label: "Monto certificado",
			value: certified,
			trend: 6.2,
			status: "green"
		},
		{
			label: "Monto devengado",
			value: accrued,
			trend: 7.5,
			status: "green"
		},
		{
			label: "Monto pagado",
			value: paid,
			trend: 8.3,
			status: "green"
		},
		{
			label: "Saldo disponible",
			value: available,
			trend: -4.6,
			status: "amber"
		},
		{
			label: "Brecha presupuestal",
			value: gap,
			trend: -12.1,
			status: "red"
		}
	];
	const categories = categoryBase.map(([name, categoryPaid, pending, free]) => ({
		name,
		paid: categoryPaid * scopeFactor,
		pending: pending * scopeFactor,
		free: free * scopeFactor
	}));
	const waterfall = [
		{
			name: "PIM",
			base: 0,
			value: budget,
			fill: C.dark
		},
		{
			name: "Certificaciones",
			base: budget - certified,
			value: certified,
			fill: C.primary
		},
		{
			name: "Compromisos",
			base: 218 * scopeFactor,
			value: 78 * scopeFactor,
			fill: C.highlight
		},
		{
			name: "Devengados",
			base: 156 * scopeFactor,
			value: 62 * scopeFactor,
			fill: C.primary
		},
		{
			name: "Pagos",
			base: 126 * scopeFactor,
			value: 30 * scopeFactor,
			fill: C.primary
		},
		{
			name: "Oblig. pendientes",
			base: available,
			value: 22 * scopeFactor,
			fill: C.highlight
		},
		{
			name: "Saldo",
			base: 0,
			value: available,
			fill: C.muted
		}
	];
	const composition = [
		{
			name: "Pagos directos a afectados",
			value: 68,
			amount: paid * .68,
			color: C.primary
		},
		{
			name: "Servicios prediales",
			value: 15,
			amount: paid * .15,
			color: C.dark
		},
		{
			name: "Interferencias",
			value: 11,
			amount: paid * .11,
			color: C.highlight
		},
		{
			name: "Gastos administrativos",
			value: 6,
			amount: paid * .06,
			color: C.muted
		}
	];
	const projections = Array.from({ length: projectionHorizon }, (_, index) => {
		const monthIndex = (8 + index) % 12;
		const year = 2026 + Math.floor((8 + index) / 12);
		return {
			month: `${months[monthIndex]} ${String(year).slice(2)}`,
			base: (62 + index * 3.2 + Math.sin(index) * 4) * scopeFactor,
			optimistic: (56 + index * 2.4 + Math.sin(index) * 3) * scopeFactor,
			critical: (70 + index * 4.4 + Math.cos(index) * 5) * scopeFactor
		};
	});
	const filteredGaps = gapRows.filter((row) => filters.project === "TODOS" || row.project === filters.project).filter((row) => filters.section === "TODOS" || row.section === filters.section).map((row) => {
		const rowGap = row.budget - row.estimated;
		const coverage = row.budget / row.estimated * 100;
		const risk = rowGap < -20 ? "Crítico" : rowGap < 0 ? "Alto" : coverage < 90 ? "Medio" : "Bajo";
		return {
			...row,
			gap: rowGap * scopeFactor,
			coverage,
			risk
		};
	});
	function update(key, value) {
		setFilters((current) => ({
			...current,
			[key]: value
		}));
	}
	function resetFilters() {
		setFilters(defaultFilters);
		setSelectedMonth(null);
	}
	function showDetail(title, amount, subtitle) {
		setDetailTab("Predios");
		setDetail({
			title,
			amount,
			subtitle
		});
	}
	function exportCsv() {
		const headers = "proyecto,tramo,presupuesto_vigente,costo_estimado,monto_tasado,monto_pagado,necesidad_pendiente,brecha,cobertura,riesgo\n";
		const rows = filteredGaps.map((row) => [
			row.project,
			row.section,
			row.budget,
			row.estimated,
			row.appraised,
			row.paid,
			row.pending,
			row.gap,
			row.coverage,
			row.risk
		].map((item) => `"${item}"`).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([
			"﻿",
			headers,
			rows
		], { type: "text/csv;charset=utf-8" }));
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = "dashboard_presupuestal_financiero.csv";
		anchor.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Landmark,
			titulo: "Presupuesto y pagos prediales",
			descripcion: "Control consolidado de recursos y necesidades para la gestión predial de infraestructura pública.",
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
				selectedMonth && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => setSelectedMonth(null),
					children: [
						"Periodo: ",
						selectedMonth,
						" ",
						/* @__PURE__ */ jsx(X, {}),
						" Quitar"
					]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: resetFilters,
					children: [/* @__PURE__ */ jsx(FilterX, {}), " Restablecer filtros"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: exportCsv,
					children: [/* @__PURE__ */ jsx(Download, {}), " Exportar CSV"]
				})
			] })
		}),
		/* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-1.5 text-xs text-warning",
			children: "Datos de demostración: las cifras de este tablero no provienen del SIAF ni de un servicio."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Alcance presupuestal",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: () => setUpdatedAt("05/08/2026 10:05"),
				children: "Actualizar información"
			}),
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4 2xl:grid-cols-8",
				children: [
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Proyecto",
						value: filters.project,
						onChange: (v) => update("project", v),
						options: ["TODOS", ...gapRows.map((row) => row.project)]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Código de inversión",
						value: filters.investmentCode,
						onChange: (v) => update("investmentCode", v),
						options: [
							"TODOS",
							"CUI 2436645",
							"CUI 2489012",
							"CUI 2514470"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Año fiscal",
						value: filters.year,
						onChange: (v) => update("year", v),
						options: [
							"2026",
							"2025",
							"2024"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Fuente de financiamiento",
						value: filters.funding,
						onChange: (v) => update("funding", v),
						options: [
							"TODAS",
							"Recursos ordinarios",
							"Operaciones de crédito",
							"RDR"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Tramo",
						value: filters.section,
						onChange: (v) => update("section", v),
						options: ["TODOS", ...Array.from(new Set(gapRows.map((row) => row.section)))]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Sector",
						value: filters.sector,
						onChange: (v) => update("sector", v),
						options: [
							"TODOS",
							"Norte",
							"Centro",
							"Sur",
							"Oeste"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Tipo de procedimiento",
						value: filters.procedure,
						onChange: (v) => update("procedure", v),
						options: [
							"TODOS",
							"Trato directo",
							"Expropiación",
							"Transferencia"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Periodo de análisis",
						value: filters.period,
						onChange: (v) => update("period", v),
						options: [
							"Acumulado anual",
							"Mensual",
							"Trimestral",
							"Últimos 12 meses"
						]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mb-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5",
			"aria-label": "Indicadores presupuestales",
			children: kpis.map((item) => /* @__PURE__ */ jsx(KpiCard, {
				...item,
				budget,
				onClick: () => showDetail(item.label, item.value, selectedMonth ? `Periodo seleccionado: ${selectedMonth}` : "Acumulado anual 2026")
			}, item.label))
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid gap-4 2xl:grid-cols-[1.15fr_1fr]",
			"aria-label": "Ejecución mensual y por categoría",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Ejecución presupuestal mensual",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Las columnas comparan lo programado con lo pagado (millones de soles); la línea indica el porcentaje acumulado de ejecución. Seleccione un mes para filtrar el tablero."
				}), /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 390,
					children: /* @__PURE__ */ jsxs(ComposedChart, {
						data: monthly,
						margin: {
							top: 8,
							right: 10,
							left: 0,
							bottom: 0
						},
						onClick: (state) => {
							const label = state?.activeLabel;
							if (typeof label === "string") setSelectedMonth((current) => current === label ? null : label);
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
								yAxisId: "money",
								tick: TICK,
								axisLine: false,
								tickLine: false,
								tickFormatter: (v) => `${Math.round(v)}`
							}),
							/* @__PURE__ */ jsx(YAxis, {
								yAxisId: "pct",
								orientation: "right",
								domain: [0, 100],
								tick: TICK,
								axisLine: false,
								tickLine: false,
								tickFormatter: (v) => `${v}%`
							}),
							/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(MoneyTooltip, {}) }),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
							/* @__PURE__ */ jsx(Bar, {
								yAxisId: "money",
								dataKey: "programmed",
								name: "Presupuesto programado",
								fill: C.border,
								radius: [
									3,
									3,
									0,
									0
								],
								cursor: "pointer",
								children: monthly.map((row) => /* @__PURE__ */ jsx(Cell, {
									fill: selectedMonth === row.month ? C.muted : C.border,
									opacity: selectedMonth && selectedMonth !== row.month ? .35 : 1
								}, row.month))
							}),
							/* @__PURE__ */ jsx(Bar, {
								yAxisId: "money",
								dataKey: "paid",
								name: "Monto pagado",
								fill: C.primary,
								radius: [
									3,
									3,
									0,
									0
								],
								cursor: "pointer",
								children: monthly.map((row) => /* @__PURE__ */ jsx(Cell, {
									fill: C.primary,
									opacity: selectedMonth && selectedMonth !== row.month ? .28 : 1
								}, row.month))
							}),
							/* @__PURE__ */ jsx(Line, {
								yAxisId: "pct",
								type: "monotone",
								dataKey: "execution",
								name: "Ejecución acumulada",
								stroke: C.dark,
								strokeWidth: 2.5,
								dot: {
									r: 3,
									fill: "var(--color-card)",
									strokeWidth: 2
								},
								activeDot: { r: 5 }
							})
						]
					})
				})]
			}), /* @__PURE__ */ jsxs(Section, {
				titulo: "Ejecución por categoría de gasto",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Cada barra divide el presupuesto de una categoría entre monto pagado, monto pendiente y saldo aún no comprometido. Seleccione una barra para ver su sustento."
				}), /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 410,
					children: /* @__PURE__ */ jsxs(BarChart, {
						data: categories,
						layout: "vertical",
						margin: {
							left: 16,
							right: 12,
							top: 6
						},
						onClick: (state) => {
							if (typeof state?.activeLabel === "string") {
								const row = categories.find((item) => item.name === state.activeLabel);
								if (row) showDetail(row.name, row.paid + row.pending + row.free, "Categoría de gasto");
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
								dataKey: "name",
								width: 140,
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(MoneyTooltip, {}) }),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "paid",
								name: "Monto pagado",
								stackId: "a",
								fill: C.primary,
								cursor: "pointer"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "pending",
								name: "Monto pendiente",
								stackId: "a",
								fill: C.highlight,
								cursor: "pointer"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "free",
								name: "Saldo no comprometido",
								stackId: "a",
								fill: C.border,
								radius: [
									0,
									3,
									3,
									0
								],
								cursor: "pointer"
							})
						]
					})
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid gap-4 xl:grid-cols-[1.25fr_.75fr]",
			"aria-label": "Puente presupuestal y composición",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Puente presupuestal: del PIM al saldo disponible",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Parte del presupuesto vigente y descuenta certificaciones, compromisos, devengados, pagos y obligaciones hasta llegar al saldo disponible."
				}), /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 285,
					children: /* @__PURE__ */ jsxs(BarChart, {
						data: waterfall,
						margin: {
							left: 6,
							right: 10,
							top: 22,
							bottom: 8
						},
						onClick: (state) => {
							if (typeof state?.activeLabel === "string") {
								const row = waterfall.find((item) => item.name === state.activeLabel);
								if (row) showDetail(row.name, row.value, "Componente del puente presupuestal");
							}
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: C.border,
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "name",
								interval: 0,
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(YAxis, {
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(WaterfallTooltip, {}) }),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "base",
								stackId: "waterfall",
								fill: "transparent"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "value",
								stackId: "waterfall",
								radius: [
									3,
									3,
									0,
									0
								],
								cursor: "pointer",
								children: waterfall.map((row) => /* @__PURE__ */ jsx(Cell, { fill: row.fill }, row.name))
							})
						]
					})
				})]
			}), /* @__PURE__ */ jsxs(Section, {
				titulo: "Composición del gasto total",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Cada segmento muestra qué proporción del gasto pagado corresponde a afectados, servicios prediales, interferencias y administración."
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid items-center md:grid-cols-[.9fr_1.1fr]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ jsxs(PieChart, { children: [/* @__PURE__ */ jsx(Pie, {
								data: composition,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 62,
								outerRadius: 94,
								paddingAngle: 2,
								stroke: C.border,
								onClick: (row) => showDetail(row.name, row.amount, `${row.value}% del gasto total`),
								cursor: "pointer",
								children: composition.map((row) => /* @__PURE__ */ jsx(Cell, { fill: row.color }, row.name))
							}), /* @__PURE__ */ jsx(Tooltip, { formatter: (value) => `${value}%` })] })
						}), /* @__PURE__ */ jsxs("div", {
							className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs uppercase text-muted-foreground",
								children: "Total pagado"
							}), /* @__PURE__ */ jsx("b", {
								className: "text-lg",
								children: money(paid)
							})]
						})]
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-1 pr-3",
						children: composition.map((row) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => showDetail(row.name, row.amount, `${row.value}% del gasto total`),
							className: "flex w-full items-center justify-between gap-2 rounded-md p-1.5 text-left text-sm hover:bg-muted",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("i", {
									className: "size-2.5 rounded-sm",
									style: { background: row.color },
									"aria-hidden": true
								}), row.name]
							}), /* @__PURE__ */ jsxs("b", { children: [row.value, "%"] })]
						}) }, row.name))
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Brechas presupuestales por proyecto y tramo",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs("div", {
				className: "hidden gap-3 text-xs text-muted-foreground sm:flex",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ jsx("i", {
						className: "size-2 rounded-sm bg-destructive",
						"aria-hidden": true
					}), " Brecha negativa"]
				}), /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ jsx("i", {
						className: "size-2 rounded-sm bg-highlight",
						"aria-hidden": true
					}), " Cobertura < 90%"]
				})]
			}),
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Umbral de cobertura esperado: 90%. Seleccione cualquier monto para revisar su sustento."
			}), /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[1160px] text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
						"Proyecto",
						"Tramo",
						"Presupuesto vigente",
						"Costo estimado actualizado",
						"Monto tasado",
						"Monto pagado",
						"Necesidad pendiente",
						"Brecha",
						"% cobertura",
						"Nivel de riesgo",
						"Acciones"
					].map((head) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: `${TH} ${head === "Acciones" ? "text-right" : ""}`,
						children: head
					}, head)) }) }), /* @__PURE__ */ jsxs("tbody", {
						className: "[&>tr:nth-child(even)]:bg-background",
						children: [!filteredGaps.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 11,
							className: "px-3 py-6 text-center text-sm text-muted-foreground",
							children: "No existen registros para la combinación de filtros seleccionada."
						}) }), filteredGaps.map((row) => /* @__PURE__ */ jsxs("tr", {
							className: "h-10 border-t border-border hover:bg-primary-soft/40",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-1.5 font-semibold",
									children: row.project
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-1.5",
									children: row.section
								}),
								/* @__PURE__ */ jsx(AmountCell, {
									value: row.budget * scopeFactor,
									onClick: () => showDetail("Presupuesto vigente", row.budget * scopeFactor, row.project)
								}),
								/* @__PURE__ */ jsx(AmountCell, {
									value: row.estimated * scopeFactor,
									onClick: () => showDetail("Costo estimado actualizado", row.estimated * scopeFactor, row.project)
								}),
								/* @__PURE__ */ jsx(AmountCell, {
									value: row.appraised * scopeFactor,
									onClick: () => showDetail("Monto tasado", row.appraised * scopeFactor, row.project)
								}),
								/* @__PURE__ */ jsx(AmountCell, {
									value: row.paid * scopeFactor,
									onClick: () => showDetail("Monto pagado", row.paid * scopeFactor, row.project)
								}),
								/* @__PURE__ */ jsx(AmountCell, {
									value: row.pending * scopeFactor,
									onClick: () => showDetail("Necesidad pendiente", row.pending * scopeFactor, row.project)
								}),
								/* @__PURE__ */ jsx("td", {
									className: `px-3 py-1.5 font-bold tabular-nums ${row.gap < 0 ? "bg-destructive-soft text-destructive" : "text-success"}`,
									children: /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => showDetail("Brecha presupuestal", row.gap, row.project),
										className: "rounded-sm hover:underline",
										children: money(row.gap)
									})
								}),
								/* @__PURE__ */ jsxs("td", {
									className: `px-3 py-1.5 font-bold tabular-nums ${row.coverage < 90 ? "bg-warning-soft text-warning" : "text-success"}`,
									children: [row.coverage.toFixed(1), "%"]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-1.5",
									children: /* @__PURE__ */ jsx(StatusBadge, {
										tono: riskTone[row.risk],
										children: row.risk
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-1.5 text-right",
									children: /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => showDetail("Detalle presupuestal", row.estimated * scopeFactor, `${row.project} · ${row.section}`),
										children: ["Ver detalle ", /* @__PURE__ */ jsx(ChevronRight, {})]
									})
								})
							]
						}, `${row.project}-${row.section}`))]
					})]
				})
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: `Proyección de necesidades financieras · próximos ${projectionHorizon} meses`,
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setProjectionHorizon((current) => current === 12 ? 24 : 12),
				children: [
					"Ver ",
					projectionHorizon === 12 ? 24 : 12,
					" meses"
				]
			}),
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Las tres líneas proyectan la necesidad mensual; si una línea supera el presupuesto disponible, se anticipa una brecha de financiamiento."
			}), /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 310,
				children: /* @__PURE__ */ jsxs(LineChart$1, {
					data: projections,
					margin: {
						left: 10,
						right: 20,
						top: 12,
						bottom: 2
					},
					onClick: (state) => {
						if (typeof state?.activeLabel === "string") {
							const row = projections.find((item) => item.month === state.activeLabel);
							if (row) showDetail(`Necesidad financiera · ${row.month}`, row.base, "Escenario base proyectado");
						}
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
							tick: TICK,
							axisLine: false,
							tickLine: false,
							tickFormatter: (v) => `${v}`
						}),
						/* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(MoneyTooltip, {}) }),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
						/* @__PURE__ */ jsx(ReferenceLine, {
							y: available,
							stroke: C.muted,
							strokeDasharray: "6 4",
							label: {
								value: `Presupuesto disponible: ${money(available)}`,
								position: "insideTopRight",
								fontSize: 12,
								fill: C.muted
							}
						}),
						/* @__PURE__ */ jsx(Line, {
							type: "monotone",
							dataKey: "base",
							name: "Escenario base",
							stroke: C.dark,
							strokeWidth: 2.5,
							dot: { r: 3 },
							cursor: "pointer"
						}),
						/* @__PURE__ */ jsx(Line, {
							type: "monotone",
							dataKey: "optimistic",
							name: "Escenario optimista",
							stroke: C.muted,
							strokeWidth: 2.5,
							dot: { r: 3 },
							cursor: "pointer"
						}),
						/* @__PURE__ */ jsx(Line, {
							type: "monotone",
							dataKey: "critical",
							name: "Escenario crítico",
							stroke: C.primary,
							strokeWidth: 2.5,
							dot: { r: 3 },
							cursor: "pointer"
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ jsx(DetailDrawer, {
			detail,
			activeTab: detailTab,
			onTab: setDetailTab,
			onClose: () => setDetail(null)
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
function KpiCard({ label, value, trend, status, budget, onClick }) {
	const percentage = budget ? value / budget * 100 : 0;
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		title: `${statusText[status]}. Ver sustento y trazabilidad`,
		className: "group min-w-0 rounded-lg border border-border bg-card p-3 text-left hover:border-primary hover:bg-primary-soft/30",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "min-h-8 text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("p", {
				className: `mt-1 whitespace-nowrap text-lg font-semibold tabular-nums ${value < 0 ? "text-destructive" : "text-foreground"}`,
				children: money(value)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-1 flex items-center justify-between gap-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("span", { children: [percentage.toFixed(1), "% del PIM"] }), /* @__PURE__ */ jsxs("span", {
					className: `flex items-center font-semibold ${trend >= 0 ? "text-success" : "text-destructive"}`,
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
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-2 h-1 overflow-hidden rounded-sm bg-muted",
				"aria-hidden": true,
				children: /* @__PURE__ */ jsx("div", {
					className: `h-full ${statusBar[status]}`,
					style: { width: `${Math.min(100, Math.abs(percentage))}%` }
				})
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-1 text-xs text-muted-foreground group-hover:text-primary-dark",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "sr-only",
					children: [statusText[status], ". "]
				}), "Ver sustento"]
			})
		]
	});
}
function MoneyTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-card p-2 text-xs shadow-md",
		children: [/* @__PURE__ */ jsx("div", {
			className: "mb-1 font-semibold text-foreground",
			children: label
		}), payload.map((item) => /* @__PURE__ */ jsxs("div", {
			className: "flex justify-between gap-4 text-foreground",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ jsx("i", {
					className: "size-2 rounded-sm",
					style: { background: item.color },
					"aria-hidden": true
				}), item.name]
			}), /* @__PURE__ */ jsx("b", { children: item.name.includes("Ejecución") ? `${item.value}%` : money(item.value) })]
		}, item.name))]
	});
}
function WaterfallTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	const value = payload.find((item) => item.dataKey === "value")?.value ?? 0;
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-card p-2 text-xs shadow-md",
		children: [/* @__PURE__ */ jsx("b", { children: label }), /* @__PURE__ */ jsx("div", {
			className: "mt-1 text-muted-foreground",
			children: money(value)
		})]
	});
}
function AmountCell({ value, onClick }) {
	return /* @__PURE__ */ jsx("td", {
		className: "whitespace-nowrap px-3 py-1.5 font-medium tabular-nums",
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick,
			className: "rounded-sm text-foreground hover:text-primary-dark hover:underline",
			children: money(value)
		})
	});
}
function DetailDrawer({ detail, activeTab, onTab, onClose }) {
	const tabs = [
		{
			name: "Predios",
			icon: Landmark,
			count: 38
		},
		{
			name: "Contratos",
			icon: FileCheck2,
			count: 12
		},
		{
			name: "Pagos",
			icon: ReceiptText,
			count: 26
		},
		{
			name: "Documentos",
			icon: FileText,
			count: 74
		}
	];
	const count = tabs.find((tab) => tab.name === activeTab)?.count ?? 0;
	return /* @__PURE__ */ jsx(Sheet$1, {
		open: detail !== null,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsx(SheetContent, {
			className: "flex w-full flex-col gap-0 overflow-y-auto bg-card p-0 sm:max-w-lg",
			children: detail && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs(SheetHeader, {
					className: "border-b border-border px-4 py-4 text-left",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold uppercase text-primary-dark",
							children: "Trazabilidad financiera"
						}),
						/* @__PURE__ */ jsx(SheetTitle, {
							className: "text-xl font-semibold text-foreground",
							children: detail.title
						}),
						/* @__PURE__ */ jsx(SheetDescription, {
							className: "text-xs",
							children: detail.subtitle ?? "Registros que sustentan el monto seleccionado"
						}),
						/* @__PURE__ */ jsx("p", {
							className: `text-2xl font-bold tabular-nums ${detail.amount < 0 ? "text-destructive" : "text-foreground"}`,
							children: money(detail.amount)
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-b border-border px-4 py-3",
					children: [/* @__PURE__ */ jsx(Tabs, {
						value: activeTab,
						onValueChange: onTab,
						children: /* @__PURE__ */ jsx(TabsList, {
							className: "grid w-full grid-cols-4",
							children: tabs.map(({ name, icon: Icon, count: n }) => /* @__PURE__ */ jsxs(TabsTrigger, {
								value: name,
								className: "gap-1 px-1 text-xs",
								children: [
									/* @__PURE__ */ jsx(Icon, {
										size: 14,
										"aria-hidden": true
									}),
									" ",
									name,
									" ",
									/* @__PURE__ */ jsxs("span", {
										className: "text-muted-foreground",
										children: [
											"(",
											n,
											")"
										]
									})
								]
							}, name))
						})
					}), /* @__PURE__ */ jsxs("label", {
						className: "relative mt-3 block",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "sr-only",
								children: ["Buscar en ", activeTab.toLowerCase()]
							}),
							/* @__PURE__ */ jsx(Search, {
								size: 16,
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": true
							}),
							/* @__PURE__ */ jsx("input", {
								type: "search",
								className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted pl-9`,
								placeholder: `Buscar en ${activeTab.toLowerCase()}`
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 overflow-auto px-4 py-3",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "mb-2 flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ jsx("span", { children: "Registros que sustentan el monto seleccionado" }), /* @__PURE__ */ jsxs("b", { children: [count, " resultados"] })]
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2",
						children: Array.from({ length: 7 }, (_, index) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-center justify-between gap-3 rounded-md border border-border p-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-semibold text-foreground",
									children: activeTab === "Predios" ? `PR-${String(1842 + index).padStart(5, "0")} · Unidad predial ${index + 1}` : activeTab === "Contratos" ? `Contrato N.° 0${index + 1}-2026-MTC` : activeTab === "Pagos" ? `Comprobante de pago CP-${5260 + index}` : `Expediente técnico-legal ${String(index + 1).padStart(3, "0")}`
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-0.5 truncate text-xs text-muted-foreground",
									children: "Carretera Central · Tramo I · Estado verificado"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "shrink-0 text-right",
								children: [/* @__PURE__ */ jsx("b", {
									className: "block text-sm tabular-nums text-foreground",
									children: money(detail.amount / (18 + index), 2)
								}), /* @__PURE__ */ jsx(StatusBadge, {
									tono: "success",
									children: "Conciliado"
								})]
							})]
						}, index))
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: "Fuente: SIAF · SIGA · Expediente predial digital"
					}), /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: onClose,
						children: "Cerrar detalle"
					})]
				})
			] })
		})
	});
}
//#endregion
export { DashboardFinancieroPage as component };
