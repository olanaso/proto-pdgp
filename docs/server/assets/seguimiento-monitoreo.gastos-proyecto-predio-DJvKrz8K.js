import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { E as Modal, w as registrarExportacion } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as ChartExplanation } from "./ChartExplanation-0Z95AIWE.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowDownUp, Check, ChevronDown, ChevronRight, Download, FileSpreadsheet, FilterX, Layers3, Search, SlidersHorizontal, WalletCards, X } from "lucide-react";
import writeXlsxFile from "write-excel-file/browser";
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.gastos-proyecto-predio.tsx?tsr-split=component
var SERIE = [
	"var(--color-primary)",
	"var(--color-primary-dark)",
	"var(--color-highlight)",
	"var(--color-muted-foreground)",
	"var(--color-border)"
];
var serieColor = (index) => SERIE[index % SERIE.length];
var serieOpacidad = (index) => 1 - Math.floor(index / SERIE.length) * .25;
var TICK = {
	fontSize: 12,
	fill: "var(--color-muted-foreground)"
};
var expenseCategories = [
	"Valor del terreno",
	"Edificaciones",
	"Obras complementarias",
	"Instalaciones",
	"Plantaciones",
	"Daño emergente",
	"Lucro cesante",
	"Incentivo",
	"Compensación",
	"Reconocimiento de mejoras",
	"Gastos de traslado",
	"Servicios técnicos",
	"Servicios legales",
	"Gastos notariales",
	"Gastos registrales",
	"Gestión social",
	"Liberación de interferencias",
	"Gastos administrativos"
];
var predios = Array.from({ length: 12 }, (_, index) => {
	const area = 680 + index * 431 % 3100;
	const estimated = 68e4 + index * 143e3 + index % 3 * 185e3;
	const appraised = estimated * (.91 + index % 5 * .045);
	const approved = appraised * (.94 + index % 4 * .035);
	const paid = approved * (.54 + index % 5 * .085);
	return {
		code: `PR-${String(1842 + index * 17).padStart(6, "0")}`,
		name: `Predio ${String(index + 1).padStart(2, "0")} · Corredor Central`,
		owner: [
			"María Elena Rojas",
			"Sucesión Flores Huamán",
			"Comunidad San Jerónimo",
			"Inversiones del Centro SAC",
			"Agrícola Santa Ana SRL",
			"José Antonio Medina"
		][index % 6],
		tramo: `Tramo ${index % 3 + 1}`,
		sector: `Sector ${String.fromCharCode(65 + index % 4)}`,
		procedure: ["Trato directo", "Expropiación"][index % 2],
		legal: [
			"Propietario registral",
			"Poseedor",
			"Sucesión",
			"Inmueble no inscrito"
		][index % 4],
		status: [
			"En proceso",
			"Pagado",
			"Entregado",
			"Inscrito",
			"Observado"
		][index % 5],
		area,
		estimated,
		appraised,
		approved,
		certified: approved * .96,
		committed: approved * .92,
		accrued: approved * .84,
		drawn: paid * 1.03,
		paid,
		services: approved * (.035 + index % 3 * .012),
		interference: approved * (.018 + index % 4 * .009)
	};
});
var SIN_CONTRATO = "Sin contrato";
var movementCategories = [
	"Valor del terreno",
	"Edificaciones",
	"Servicios técnicos",
	"Servicios legales",
	"Liberación de interferencias",
	"Reconocimiento de mejoras",
	"Gastos administrativos",
	"Plantaciones"
];
var movements = predios.flatMap((predio, predioIndex) => Array.from({ length: 4 }, (_, movementIndex) => {
	const category = movementCategories[(predioIndex + movementIndex * 2) % movementCategories.length];
	const factor = [
		.52,
		.22,
		.12,
		.07
	][movementIndex];
	const approved = predio.approved * factor;
	const linkType = [
		"Directo",
		"Compartido",
		"Prorrateado",
		"General"
	][(predioIndex + movementIndex) % 4];
	return {
		id: `MOV-${String(predioIndex * 4 + movementIndex + 1).padStart(5, "0")}`,
		predio: predio.code,
		category,
		subcategory: movementIndex % 2 ? "Servicio especializado" : "Componente principal",
		concept: `${category} · ${predio.sector}`,
		group: groupForCategory(category),
		linkType,
		contract: movementIndex === 0 ? SIN_CONTRATO : `OS-${String(410 + predioIndex * 3 + movementIndex).padStart(5, "0")}`,
		provider: movementIndex === 0 ? predio.owner : [
			"Consorcio Predial Centro",
			"Tasaciones Andinas SAC",
			"Notaría del Valle"
		][movementIndex - 1],
		file: `EXP-${String(2026e3 + predioIndex * 10 + movementIndex)}`,
		resolution: movementIndex === 0 ? `RD-${String(620 + predioIndex).padStart(4, "0")}-2026` : "Sin resolución",
		certification: `CCP-${String(8001 + predioIndex * 4 + movementIndex).padStart(6, "0")}`,
		commitment: `COM-${String(7101 + predioIndex * 4 + movementIndex).padStart(6, "0")}`,
		accrual: `DEV-${String(5301 + predioIndex * 4 + movementIndex).padStart(6, "0")}`,
		draw: `GIR-${String(4201 + predioIndex * 4 + movementIndex).padStart(6, "0")}`,
		receipt: `CP-${String(3101 + predioIndex * 4 + movementIndex).padStart(7, "0")}`,
		funding: predioIndex % 2 ? "Recursos ordinarios" : "Recursos por operaciones",
		classifier: [
			"2.6.8.1.4.2",
			"2.3.2.7.11.99",
			"2.6.3.2.9.2"
		][movementIndex % 3],
		year: predioIndex % 5 === 0 ? "2025" : "2026",
		recordDate: `2026-${String(3 + movementIndex % 5).padStart(2, "0")}-${String(4 + predioIndex % 23).padStart(2, "0")}`,
		scheduledDate: `2026-${String(7 + movementIndex % 2).padStart(2, "0")}-${String(6 + predioIndex % 20).padStart(2, "0")}`,
		effectiveDate: movementIndex === 3 && predioIndex % 3 === 0 ? "" : `2026-07-${String(8 + predioIndex % 18).padStart(2, "0")}`,
		estimated: predio.estimated * factor,
		appraised: predio.appraised * factor,
		approved,
		certified: approved * .96,
		committed: approved * .92,
		accrued: approved * (.72 + movementIndex * .05),
		drawn: approved * (.62 + movementIndex * .05),
		paid: approved * (.54 + movementIndex * .055),
		state: [
			"Pagado",
			"En proceso",
			"Pendiente",
			"Observado"
		][movementIndex],
		responsible: [
			"C. Romero",
			"L. Quispe",
			"M. Salazar",
			"A. Paredes"
		][movementIndex],
		hasDocument: !(predioIndex % 5 === 0 && movementIndex === 3),
		rule: linkType === "Directo" ? "Asignación directa" : [
			"Área afectada",
			"Número de predios",
			"Fórmula mixta"
		][movementIndex - 1] ?? "Fórmula mixta",
		assignedPct: linkType === "Directo" ? 100 : 12 + predioIndex % 5 * 3,
		totalContract: linkType === "Directo" ? approved : approved * (4.1 + predioIndex % 3)
	};
}));
function groupForCategory(category) {
	if ([
		"Valor del terreno",
		"Edificaciones",
		"Plantaciones",
		"Daño emergente",
		"Lucro cesante",
		"Incentivo",
		"Compensación"
	].includes(category)) return "Pagos directos";
	if (["Reconocimiento de mejoras", "Gastos de traslado"].includes(category)) return "Mejoras y traslado";
	if ([
		"Servicios técnicos",
		"Servicios legales",
		"Gastos notariales",
		"Gastos registrales",
		"Gestión social"
	].includes(category)) return "Servicios técnicos y legales";
	if (category === "Liberación de interferencias") return "Interferencias";
	return "Gastos administrativos";
}
var defaultFilters = {
	project: "Carretera Central · Tramo 1",
	year: "TODOS",
	tramo: "TODOS",
	sector: "TODOS",
	procedure: "TODOS",
	legal: "TODAS",
	status: "TODOS",
	category: "TODAS",
	provider: "TODOS",
	contract: "TODOS",
	funding: "TODAS",
	budgetState: "TODOS",
	start: "2026-01-01",
	end: "2026-08-05"
};
function money(value, compact = false) {
	if (compact && Math.abs(value) >= 1e6) return `S/ ${(value / 1e6).toFixed(2)} M`;
	return `S/ ${value.toLocaleString("es-PE", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	})}`;
}
function date(value) {
	if (!value) return "Pendiente";
	return new Intl.DateTimeFormat("es-PE", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	}).format(/* @__PURE__ */ new Date(`${value}T00:00:00Z`));
}
function GastosProyectoPredioPage() {
	const [filters, setFilters] = useState(defaultFilters);
	const [selectedPredios, setSelectedPredios] = useState(predios.map((item) => item.code));
	const [selectorOpen, setSelectorOpen] = useState(false);
	const [advancedOpen, setAdvancedOpen] = useState(true);
	const [view, setView] = useState("summary");
	const [search, setSearch] = useState("");
	const [sortDescending, setSortDescending] = useState(true);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [selectedBar, setSelectedBar] = useState(null);
	const [expanded, setExpanded] = useState(null);
	const [exportOpen, setExportOpen] = useState(false);
	const [exportMode, setExportMode] = useState("both");
	const scopedPredios = useMemo(() => {
		return predios.filter((item) => selectedPredios.includes(item.code) && (filters.tramo === "TODOS" || item.tramo === filters.tramo) && (filters.sector === "TODOS" || item.sector === filters.sector) && (filters.procedure === "TODOS" || item.procedure === filters.procedure) && (filters.legal === "TODAS" || item.legal === filters.legal) && (filters.status === "TODOS" || item.status === filters.status));
	}, [filters, selectedPredios]);
	const scopedCodes = useMemo(() => new Set(scopedPredios.map((item) => item.code)), [scopedPredios]);
	const filteredMovements = useMemo(() => movements.filter((item) => scopedCodes.has(item.predio) && (filters.year === "TODOS" || item.year === filters.year) && (filters.category === "TODAS" || item.category === filters.category) && (filters.provider === "TODOS" || item.provider === filters.provider) && (filters.contract === "TODOS" || item.contract === filters.contract) && (filters.funding === "TODAS" || item.funding === filters.funding) && (filters.budgetState === "TODOS" || item.state === filters.budgetState) && (!selectedGroup || item.group === selectedGroup) && (!selectedBar || item.predio === selectedBar) && item.recordDate >= filters.start && item.recordDate <= filters.end && (!search || `${item.predio} ${item.concept} ${item.provider} ${item.contract}`.toLowerCase().includes(search.toLowerCase()))), [
		filters,
		scopedCodes,
		search,
		selectedBar,
		selectedGroup
	]);
	const totals = useMemo(() => {
		const sum = (key) => scopedPredios.reduce((acc, item) => acc + Number(item[key]), 0);
		const totalCost = sum("approved") + sum("services") + sum("interference");
		return {
			area: sum("area"),
			estimated: sum("estimated"),
			appraised: sum("appraised"),
			approved: sum("approved"),
			certified: sum("certified"),
			committed: sum("committed"),
			accrued: sum("accrued"),
			drawn: sum("drawn"),
			paid: sum("paid"),
			pending: sum("approved") - sum("paid"),
			totalCost
		};
	}, [scopedPredios]);
	const chartRows = useMemo(() => scopedPredios.map((item, index) => {
		const row = { code: item.code };
		expenseCategories.forEach((category, categoryIndex) => {
			const weight = (index + categoryIndex * 3) % 9 + 1;
			row[category] = item.approved * (weight / 340);
		});
		return row;
	}).sort((a, b) => Number(b["Valor del terreno"]) - Number(a["Valor del terreno"])), [scopedPredios]);
	const composition = useMemo(() => {
		return [
			"Pagos directos",
			"Mejoras y traslado",
			"Servicios técnicos y legales",
			"Interferencias",
			"Gastos administrativos"
		].map((name, index) => ({
			name,
			value: movements.filter((movement) => scopedCodes.has(movement.predio) && movement.group === name).reduce((sum, movement) => sum + movement.paid, 0),
			color: serieColor(index)
		}));
	}, [scopedCodes]);
	const summaryRows = useMemo(() => [...scopedPredios].sort((a, b) => sortDescending ? b.approved + b.services + b.interference - (a.approved + a.services + a.interference) : a.approved - b.approved), [scopedPredios, sortDescending]);
	const cards = [
		[
			"Predios seleccionados",
			scopedPredios.length.toString(),
			"Alcance de consulta"
		],
		[
			"Área total afectada",
			`${totals.area.toLocaleString("es-PE", { maximumFractionDigits: 0 })} m²`,
			"Superficie consolidada"
		],
		[
			"Presupuesto estimado",
			money(totals.estimated, true),
			"Estimación inicial"
		],
		[
			"Valor total tasado",
			money(totals.appraised, true),
			`${((totals.appraised / Math.max(totals.estimated, 1) - 1) * 100).toFixed(1)}% vs. estimado`
		],
		[
			"Monto total aprobado",
			money(totals.approved, true),
			"Resoluciones aprobadas"
		],
		[
			"Monto certificado",
			money(totals.certified, true),
			`${(totals.certified / Math.max(totals.approved, 1) * 100).toFixed(1)}% aprobado`
		],
		[
			"Monto comprometido",
			money(totals.committed, true),
			"Compromiso anual"
		],
		[
			"Monto devengado",
			money(totals.accrued, true),
			"Obligación reconocida"
		],
		[
			"Monto girado",
			money(totals.drawn, true),
			"Órdenes de pago"
		],
		[
			"Monto pagado",
			money(totals.paid, true),
			`${(totals.paid / Math.max(totals.approved, 1) * 100).toFixed(1)}% de ejecución`
		],
		[
			"Saldo pendiente",
			money(totals.pending, true),
			"Por completar"
		],
		[
			"Costo total acumulado",
			money(totals.totalCost, true),
			"Directo + servicios + interferencias"
		]
	];
	const indicators = [
		["Costo promedio por predio", money(totals.totalCost / Math.max(scopedPredios.length, 1), true)],
		["Costo por m² afectado", money(totals.totalCost / Math.max(totals.area, 1))],
		["Ejecución financiera", `${(totals.paid / Math.max(totals.approved, 1) * 100).toFixed(1)}%`],
		["Desviación costo final", `${((totals.totalCost / Math.max(totals.estimated, 1) - 1) * 100).toFixed(1)}%`]
	];
	function setScope(kind) {
		if (kind === "all") setSelectedPredios(predios.map((item) => item.code));
		if (kind === "tramo") setSelectedPredios(predios.filter((item) => item.tramo === "Tramo 1").map((item) => item.code));
		if (kind === "one") setSelectedPredios([predios[0].code]);
	}
	function reset() {
		setFilters(defaultFilters);
		setSelectedPredios(predios.map((item) => item.code));
		setSelectedBar(null);
		setSelectedGroup(null);
		setSearch("");
	}
	async function exportWorkbook() {
		const sheets = [];
		if (exportMode !== "detail") {
			const rows = summaryRows.map((item) => ({
				"Código predio": item.code,
				Predio: item.name,
				"Sujeto pasivo": item.owner,
				Tramo: item.tramo,
				Sector: item.sector,
				"Costo estimado": item.estimated,
				"Valor tasado": item.appraised,
				"Monto aprobado": item.approved,
				"Monto pagado": item.paid,
				"Servicios asociados": item.services,
				Interferencias: item.interference,
				Saldo: item.approved - item.paid,
				"Costo total": item.approved + item.services + item.interference,
				Estado: item.status
			}));
			sheets.push(buildExcelSheet("Resumen por predio", rows));
		}
		if (exportMode !== "summary") {
			const rows = filteredMovements.map((item) => movementExportRow(item));
			sheets.push(buildExcelSheet("Detalle de gastos", rows));
		}
		const shared = filteredMovements.filter((item) => item.linkType !== "Directo").map((item) => ({
			"Contrato o servicio": item.contract,
			"Tipo de vinculación": item.linkType,
			"Regla de distribución": item.rule,
			"Predio beneficiado": item.predio,
			"Porcentaje asignado": item.assignedPct / 100,
			"Monto total contrato": item.totalContract,
			"Monto asignado": item.approved,
			Estado: item.state
		}));
		sheets.push(buildExcelSheet("Distribución gastos compartidos", shared));
		sheets.push(buildExcelSheet("Parámetros de consulta", [
			{
				Parámetro: "Proyecto",
				Valor: filters.project
			},
			{
				Parámetro: "Predios consultados",
				Valor: selectedPredios.join(", ")
			},
			{
				Parámetro: "Filtros aplicados",
				Valor: JSON.stringify(filters)
			},
			{
				Parámetro: "Usuario",
				Valor: "Equipo funcional"
			},
			{
				Parámetro: "Fecha y hora",
				Valor: (/* @__PURE__ */ new Date()).toLocaleString("es-PE")
			}
		]));
		await writeXlsxFile(sheets, { features: [excelAutoFilterFeature] }).toFile(`monitoreo_gastos_prediales_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
		registrarExportacion("monitoreo_gastos_prediales", "Excel");
		setExportOpen(false);
	}
	const seleccionPrediosTexto = selectedPredios.length === predios.length ? "Todos los predios" : `${selectedPredios.length} predio(s) seleccionados`;
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: WalletCards,
			titulo: "Monitoreo de gastos por proyecto y predio",
			descripcion: "Consulta consolidada de movimientos presupuestales, contractuales, financieros y de pago. Actualizado: 05 ago 2026 · 10:35.",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => setExportOpen(true),
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar a Excel"]
			})
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: "Datos de demostración. Las cifras de este tablero son de muestra y no provienen de un sistema real."
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Filtros",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: reset,
				children: [/* @__PURE__ */ jsx(FilterX, {}), " Restablecer filtros"]
			}),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(FilterSelect, {
							required: true,
							label: "Proyecto",
							value: filters.project,
							options: [
								"Carretera Central · Tramo 1",
								"Evitamiento Chimbote",
								"Puente Santa Rosa"
							],
							onChange: (value) => setFilters({
								...filters,
								project: value
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "mb-1 block text-xs font-medium text-foreground",
									children: [
										"Predios seleccionados",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "text-destructive",
											"aria-hidden": true,
											children: "*"
										})
									]
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => setSelectorOpen(!selectorOpen),
									"aria-expanded": selectorOpen,
									"aria-haspopup": "listbox",
									className: `${controlClase} flex items-center justify-between text-left`,
									children: [/* @__PURE__ */ jsx("span", {
										className: "truncate",
										children: seleccionPrediosTexto
									}), /* @__PURE__ */ jsx(ChevronDown, {
										size: 16,
										"aria-hidden": true
									})]
								}),
								selectorOpen && /* @__PURE__ */ jsxs("div", {
									className: "absolute z-30 mt-1 w-full min-w-[320px] rounded-md border border-border bg-card p-2 shadow-md",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "mb-2 grid grid-cols-2 gap-1",
											children: [
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => setScope("all"),
													children: "Todo el proyecto"
												}),
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => setScope("tramo"),
													children: "Tramo 1"
												}),
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => setSelectedPredios(predios.filter((item) => item.sector === "Sector A").map((item) => item.code)),
													children: "Sector A"
												}),
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => setScope("one"),
													children: "Predio individual"
												})
											]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "max-h-52 space-y-1 overflow-auto border-t border-border pt-2",
											children: predios.map((item) => /* @__PURE__ */ jsxs("label", {
												className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
												children: [
													/* @__PURE__ */ jsx("input", {
														type: "checkbox",
														checked: selectedPredios.includes(item.code),
														onChange: () => setSelectedPredios((current) => current.includes(item.code) ? current.filter((code) => code !== item.code) : [...current, item.code]),
														className: "accent-primary"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "font-semibold",
														children: item.code
													}),
													/* @__PURE__ */ jsx("span", {
														className: "truncate text-muted-foreground",
														children: item.owner
													})
												]
											}, item.code))
										}),
										/* @__PURE__ */ jsx(Button, {
											type: "button",
											className: "mt-2 w-full",
											onClick: () => setSelectorOpen(false),
											children: "Aplicar selección"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Año fiscal",
							value: filters.year,
							options: [
								"TODOS",
								"2026",
								"2025"
							],
							onChange: (value) => setFilters({
								...filters,
								year: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Tramo",
							value: filters.tramo,
							options: [
								"TODOS",
								"Tramo 1",
								"Tramo 2",
								"Tramo 3"
							],
							onChange: (value) => setFilters({
								...filters,
								tramo: value
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					className: "mt-3 text-primary-dark",
					onClick: () => setAdvancedOpen(!advancedOpen),
					"aria-expanded": advancedOpen,
					children: [/* @__PURE__ */ jsx(SlidersHorizontal, {}), advancedOpen ? "Ocultar filtros complementarios" : "Mostrar filtros complementarios"]
				}),
				advancedOpen && /* @__PURE__ */ jsxs("div", {
					className: "mt-2 grid gap-3 border-t border-border pt-3 md:grid-cols-3 xl:grid-cols-6",
					children: [
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Sector",
							value: filters.sector,
							options: [
								"TODOS",
								"Sector A",
								"Sector B",
								"Sector C",
								"Sector D"
							],
							onChange: (value) => setFilters({
								...filters,
								sector: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Procedimiento",
							value: filters.procedure,
							options: [
								"TODOS",
								"Trato directo",
								"Expropiación"
							],
							onChange: (value) => setFilters({
								...filters,
								procedure: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Condición jurídica",
							value: filters.legal,
							options: [
								"TODAS",
								"Propietario registral",
								"Poseedor",
								"Sucesión",
								"Inmueble no inscrito"
							],
							onChange: (value) => setFilters({
								...filters,
								legal: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Estado del predio",
							value: filters.status,
							options: [
								"TODOS",
								"En proceso",
								"Pagado",
								"Entregado",
								"Inscrito",
								"Observado"
							],
							onChange: (value) => setFilters({
								...filters,
								status: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Categoría",
							value: filters.category,
							options: ["TODAS", ...movementCategories],
							onChange: (value) => setFilters({
								...filters,
								category: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Estado presupuestal",
							value: filters.budgetState,
							options: [
								"TODOS",
								"Pagado",
								"En proceso",
								"Pendiente",
								"Observado"
							],
							onChange: (value) => setFilters({
								...filters,
								budgetState: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Proveedor / beneficiario",
							value: filters.provider,
							options: ["TODOS", ...Array.from(new Set(movements.map((item) => item.provider))).slice(0, 8)],
							onChange: (value) => setFilters({
								...filters,
								provider: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Contrato",
							value: filters.contract,
							options: ["TODOS", ...Array.from(new Set(movements.map((item) => item.contract))).filter((item) => item !== SIN_CONTRATO).slice(0, 8)],
							onChange: (value) => setFilters({
								...filters,
								contract: value
							})
						}),
						/* @__PURE__ */ jsx(FilterSelect, {
							label: "Fuente",
							value: filters.funding,
							options: [
								"TODAS",
								"Recursos ordinarios",
								"Recursos por operaciones"
							],
							onChange: (value) => setFilters({
								...filters,
								funding: value
							})
						}),
						/* @__PURE__ */ jsx(DateField, {
							label: "Desde",
							value: filters.start,
							onChange: (value) => setFilters({
								...filters,
								start: value
							})
						}),
						/* @__PURE__ */ jsx(DateField, {
							label: "Hasta",
							value: filters.end,
							onChange: (value) => setFilters({
								...filters,
								end: value
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Indicadores de gasto",
			className: "mb-4",
			children: [/* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
				children: cards.map(([label, value, note]) => /* @__PURE__ */ jsx(KpiCard, {
					label,
					value,
					note
				}, label))
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: indicators.map(([label, value]) => /* @__PURE__ */ jsx(KpiCard, {
					label,
					value
				}, label))
			})]
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Gastos acumulados por predio",
			subtitle: "Compara presupuesto, compromiso, devengado y pago por proyecto; seleccione una barra para revisar los movimientos que forman el monto.",
			source: "SIGEP · Módulo presupuestal",
			acciones: selectedBar ? /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setSelectedBar(null),
				children: [
					/* @__PURE__ */ jsx(X, {}),
					" Quitar filtro ",
					selectedBar
				]
			}) : void 0,
			children: /* @__PURE__ */ jsx("div", {
				className: "h-[360px]",
				children: /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ jsxs(BarChart, {
						data: chartRows,
						layout: "vertical",
						margin: {
							left: 18,
							right: 12,
							top: 8
						},
						onClick: (event) => event?.activeLabel && setSelectedBar(String(event.activeLabel)),
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: "var(--color-border)",
								strokeDasharray: "3 3",
								horizontal: false
							}),
							/* @__PURE__ */ jsx(XAxis, {
								type: "number",
								tickFormatter: (value) => `${(value / 1e3).toFixed(0)}k`,
								tick: TICK
							}),
							/* @__PURE__ */ jsx(YAxis, {
								type: "category",
								dataKey: "code",
								width: 82,
								tick: TICK
							}),
							/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => money(Number(value)) }),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
							expenseCategories.map((category, index) => /* @__PURE__ */ jsx(Bar, {
								dataKey: category,
								stackId: "cost",
								fill: serieColor(index),
								fillOpacity: serieOpacidad(index),
								maxBarSize: 20
							}, category))
						]
					})
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Estimado, tasado, aprobado y pagado",
			subtitle: "Compara el costo de cada predio con su límite presupuestal: el aprobado en rojo oscuro supera el estimado y en ámbar está próximo al límite.",
			source: "SIGEP · Presupuesto y tasaciones",
			children: /* @__PURE__ */ jsx("div", {
				className: "h-[360px]",
				children: /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ jsxs(ComposedChart, {
						data: scopedPredios.slice(0, 8),
						margin: {
							left: 4,
							right: 10,
							top: 12,
							bottom: 36
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: "var(--color-border)",
								strokeDasharray: "3 3"
							}),
							/* @__PURE__ */ jsx(XAxis, {
								dataKey: "code",
								angle: -32,
								textAnchor: "end",
								height: 55,
								tick: TICK
							}),
							/* @__PURE__ */ jsx(YAxis, {
								tickFormatter: (value) => `${(value / 1e6).toFixed(1)}M`,
								tick: TICK
							}),
							/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => money(Number(value)) }),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "estimated",
								name: "Estimado",
								fill: "var(--color-border)"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "appraised",
								name: "Tasado",
								fill: "var(--color-muted-foreground)"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "approved",
								name: "Aprobado",
								children: scopedPredios.slice(0, 8).map((item) => /* @__PURE__ */ jsx(Cell, { fill: item.approved > item.estimated ? "var(--color-primary-dark)" : item.approved > item.estimated * .9 ? "var(--color-highlight)" : "var(--color-primary)" }, item.code))
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "paid",
								name: "Pagado",
								fill: "var(--color-primary)",
								fillOpacity: .45
							}),
							/* @__PURE__ */ jsx(ReferenceLine, {
								y: totals.estimated / Math.max(scopedPredios.length, 1),
								stroke: "var(--color-primary-dark)",
								strokeDasharray: "5 4",
								label: {
									value: "Límite",
									fontSize: 12,
									fill: "var(--color-primary-dark)"
								}
							})
						]
					})
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Composición total de gastos",
			subtitle: "Cada segmento representa la participación de una categoría en el gasto total; seleccione una para filtrar la tabla de detalle.",
			source: "SIGEP · Detalle de gastos",
			children: /* @__PURE__ */ jsx("div", {
				className: "h-[275px]",
				children: /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ jsxs(PieChart, { children: [
						/* @__PURE__ */ jsx(Pie, {
							data: composition,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 58,
							outerRadius: 92,
							paddingAngle: 2,
							onClick: (item) => setSelectedGroup(selectedGroup === item.name ? null : item.name),
							children: composition.map((item) => /* @__PURE__ */ jsx(Cell, {
								fill: item.color,
								opacity: !selectedGroup || selectedGroup === item.name ? 1 : .3
							}, item.name))
						}),
						/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => money(Number(value)) }),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } })
					] })
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Alertas e inconsistencias",
			subtitle: "Agrupa inconsistencias detectadas automáticamente y permite priorizar los registros que requieren revisión antes del cierre.",
			source: "SIGEP · Motor de reglas",
			children: /* @__PURE__ */ jsx("ul", {
				className: "grid gap-2 md:grid-cols-2 xl:grid-cols-3",
				children: [
					[
						"Pagos duplicados",
						"2 movimientos",
						"destructive"
					],
					[
						"Sin documento sustentatorio",
						`${filteredMovements.filter((item) => !item.hasDocument).length} movimientos`,
						"destructive"
					],
					[
						"Pago mayor al aprobado",
						"1 predio",
						"destructive"
					],
					[
						"Contratos sin distribución",
						"3 contratos",
						"warning"
					],
					[
						"Compartidos sin asignar",
						"S/ 184 mil",
						"warning"
					],
					[
						"Saldo negativo",
						"1 predio",
						"destructive"
					],
					[
						"Pagado sin entrega",
						"4 predios",
						"warning"
					],
					[
						"Entregado sin inscripción",
						"3 predios",
						"neutral"
					],
					[
						"Tasaciones vencidas",
						"5 expedientes",
						"destructive"
					],
					[
						"Desviación relevante",
						"3 predios > 10%",
						"warning"
					]
				].map(([label, value, tono]) => /* @__PURE__ */ jsxs("li", {
					className: "flex items-start gap-2 rounded-md border border-border p-3",
					children: [/* @__PURE__ */ jsx(AlertTriangle, {
						size: 16,
						"aria-hidden": true,
						className: `mt-0.5 shrink-0 ${tono === "destructive" ? "text-destructive" : tono === "warning" ? "text-warning" : "text-muted-foreground"}`
					}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
						className: "block text-sm font-semibold",
						children: label
					}), /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: value
					})] })]
				}, label))
			})
		}),
		/* @__PURE__ */ jsxs(Panel, {
			title: "Detalle consolidado de gastos",
			subtitle: "Resumen expandible por predio y movimientos asociados.",
			source: "SIGEP · Consulta consolidada",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							size: "sm",
							variant: view === "summary" ? "default" : "outline",
							"aria-pressed": view === "summary",
							onClick: () => setView("summary"),
							children: "Resumen por predio"
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							size: "sm",
							variant: view === "detail" ? "default" : "outline",
							"aria-pressed": view === "detail",
							onClick: () => setView("detail"),
							children: "Detalle de movimientos"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx(Search, {
									size: 16,
									className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ jsx("input", {
									value: search,
									onChange: (event) => setSearch(event.target.value),
									placeholder: "Código, concepto, proveedor",
									"aria-label": "Buscar en el detalle",
									className: `${controlClase} w-64 pl-8`
								})]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setSortDescending(!sortDescending),
								children: [
									/* @__PURE__ */ jsx(ArrowDownUp, {}),
									" ",
									sortDescending ? "Mayor costo" : "Menor costo"
								]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setExportOpen(true),
								children: [/* @__PURE__ */ jsx(Download, {}), " Exportar detalle"]
							})
						]
					})]
				}),
				selectedGroup && /* @__PURE__ */ jsxs("p", {
					role: "status",
					className: "mb-3 flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm",
					children: [
						/* @__PURE__ */ jsx(Layers3, {
							size: 16,
							className: "text-primary-dark",
							"aria-hidden": true
						}),
						/* @__PURE__ */ jsxs("span", { children: ["Tabla filtrada por: ", /* @__PURE__ */ jsx("b", { children: selectedGroup })] }),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							className: "ml-auto",
							onClick: () => setSelectedGroup(null),
							children: [/* @__PURE__ */ jsx(X, {}), " Quitar filtro"]
						})
					]
				}),
				view === "summary" ? /* @__PURE__ */ jsx(SummaryTable, {
					rows: summaryRows,
					expanded,
					onExpand: setExpanded
				}) : /* @__PURE__ */ jsx(MovementTable, { rows: filteredMovements })
			]
		}),
		/* @__PURE__ */ jsx(ExportDialog, {
			abierto: exportOpen,
			mode: exportMode,
			setMode: setExportMode,
			onClose: () => setExportOpen(false),
			onExport: exportWorkbook,
			count: scopedPredios.length
		})
	] });
}
function FilterSelect({ label, value, options, onChange, required = false }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ jsxs("span", {
			className: "mb-1 block text-xs font-medium text-foreground",
			children: [label, required && /* @__PURE__ */ jsxs("span", {
				className: "text-destructive",
				"aria-hidden": true,
				children: [" ", "*"]
			})]
		}), /* @__PURE__ */ jsx("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase,
			children: options.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
		})]
	});
}
function DateField({ label, value, onChange }) {
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
function KpiCard({ label, value, note }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-1 truncate text-lg font-semibold tabular-nums text-foreground",
				children: value
			}),
			note && /* @__PURE__ */ jsx("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: note
			})
		]
	});
}
function Panel({ title, subtitle, source, acciones, children }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: title,
		className: "mb-4",
		acciones,
		children: [
			/* @__PURE__ */ jsx(ChartExplanation, { children: subtitle }),
			/* @__PURE__ */ jsx("div", {
				className: "mt-3",
				children
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex justify-between border-t border-border pt-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("span", { children: ["Fuente: ", source] }), /* @__PURE__ */ jsx("span", { children: "Actualización: 05 ago 2026" })]
			})
		]
	});
}
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
var TH_NUM = "h-9 whitespace-nowrap px-3 text-right text-xs font-semibold uppercase";
function SummaryTable({ rows, expanded, onExpand }) {
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full min-w-[1450px] text-sm",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
				/* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: /* @__PURE__ */ jsx("span", {
						className: "sr-only",
						children: "Expandir"
					})
				}),
				[
					"Código",
					"Predio / sujeto pasivo",
					"Tramo"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: head
				}, head)),
				[
					"Estimado",
					"Tasado",
					"Aprobado",
					"Pagado",
					"Servicios",
					"Interferencias",
					"Saldo",
					"Costo total"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH_NUM,
					children: head
				}, head)),
				/* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: "Estado"
				})
			] }) }), /* @__PURE__ */ jsxs("tbody", { children: [rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
				colSpan: 13,
				className: "px-3 py-8 text-center text-sm text-muted-foreground",
				children: "No existen predios para los filtros seleccionados."
			}) }), rows.map((item) => {
				return /* @__PURE__ */ jsx(FragmentRow, {
					item,
					total: item.approved + item.services + item.interference,
					open: expanded === item.code,
					onToggle: () => onExpand(expanded === item.code ? null : item.code)
				}, item.code);
			})] })]
		})
	});
}
function FragmentRow({ item, total, open, onToggle }) {
	const related = movements.filter((movement) => movement.predio === item.code);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("tr", {
		className: "h-10 border-t border-border hover:bg-background",
		children: [
			/* @__PURE__ */ jsx("td", {
				className: "px-3 py-2",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onToggle,
					"aria-expanded": open,
					"aria-label": open ? `Contraer ${item.code}` : `Expandir ${item.code}`,
					className: "flex size-6 items-center justify-center rounded-md hover:bg-muted",
					children: open ? /* @__PURE__ */ jsx(ChevronDown, { size: 16 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
				})
			}),
			/* @__PURE__ */ jsx("td", {
				className: "whitespace-nowrap px-3 py-2 font-semibold text-primary-dark",
				children: item.code
			}),
			/* @__PURE__ */ jsxs("td", {
				className: "px-3 py-2",
				children: [/* @__PURE__ */ jsx("div", {
					className: "font-semibold",
					children: item.name
				}), /* @__PURE__ */ jsx("div", {
					className: "text-xs text-muted-foreground",
					children: item.owner
				})]
			}),
			/* @__PURE__ */ jsx("td", {
				className: "px-3 py-2",
				children: item.tramo
			}),
			[
				item.estimated,
				item.appraised,
				item.approved,
				item.paid,
				item.services,
				item.interference,
				item.approved - item.paid,
				total
			].map((value, index) => /* @__PURE__ */ jsx("td", {
				className: `whitespace-nowrap px-3 py-2 text-right tabular-nums ${index === 6 && value < 0 ? "font-semibold text-destructive" : ""}`,
				children: money(value)
			}, index)),
			/* @__PURE__ */ jsx("td", {
				className: "px-3 py-2",
				children: /* @__PURE__ */ jsx(StateBadge, { state: item.status })
			})
		]
	}), open && /* @__PURE__ */ jsx("tr", {
		className: "border-t border-border bg-background",
		children: /* @__PURE__ */ jsx("td", {
			colSpan: 13,
			className: "p-3",
			children: /* @__PURE__ */ jsxs("div", {
				className: "rounded-md border border-border bg-card",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "border-b border-border px-3 py-2 text-xs font-semibold uppercase text-primary-dark",
					children: ["Movimientos que conforman el costo de ", item.code]
				}), related.map((movement) => /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-[90px_1fr_190px_120px_110px] items-center gap-3 border-b border-border px-3 py-2 text-sm last:border-0",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold text-primary-dark",
							children: movement.id
						}),
						/* @__PURE__ */ jsx("span", { children: movement.concept }),
						/* @__PURE__ */ jsxs("span", {
							className: "text-muted-foreground",
							children: [
								movement.linkType,
								" · ",
								movement.rule
							]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-right font-semibold tabular-nums",
							children: money(movement.paid)
						}),
						/* @__PURE__ */ jsx(StateBadge, { state: movement.state })
					]
				}, movement.id))]
			})
		})
	})] });
}
var movementTextHeads = [
	"Proyecto",
	"Nombre proyecto",
	"Tramo",
	"Sector",
	"Código predio",
	"Predio",
	"Sujeto pasivo / ocupante",
	"Procedimiento",
	"Categoría",
	"Subcategoría",
	"Concepto",
	"Vinculación",
	"Contrato / OS",
	"Proveedor / beneficiario",
	"Expediente",
	"Resolución",
	"Certificación",
	"Compromiso",
	"Devengado",
	"Giro",
	"Comprobante",
	"Fuente",
	"Clasificador",
	"Año",
	"Registro",
	"Pago programado",
	"Pago efectivo"
];
var movementAmountHeads = [
	"Estimado",
	"Tasado",
	"Aprobado",
	"Certificado",
	"Comprometido",
	"Devengado",
	"Girado",
	"Pagado",
	"Saldo",
	"% ejecución"
];
function MovementTable({ rows }) {
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full min-w-[3100px] text-sm",
			children: [/* @__PURE__ */ jsx("thead", {
				className: "sticky top-0",
				children: /* @__PURE__ */ jsxs("tr", { children: [
					movementTextHeads.map((head) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: head
					}, head)),
					movementAmountHeads.map((head) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_NUM,
						children: head
					}, head)),
					[
						"Estado",
						"Responsable",
						"Sustento"
					].map((head) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: head
					}, head))
				] })
			}), /* @__PURE__ */ jsxs("tbody", {
				className: "[&>tr:nth-child(even)]:bg-background",
				children: [rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
					colSpan: 40,
					className: "px-3 py-8 text-center text-sm text-muted-foreground",
					children: "No existen movimientos para los filtros seleccionados."
				}) }), rows.map((item) => {
					const predio = predios.find((row) => row.code === item.predio);
					const cells = [
						"CUI-2459786",
						"Carretera Central · Tramo 1",
						predio.tramo,
						predio.sector,
						predio.code,
						predio.name,
						predio.owner,
						predio.procedure,
						item.category,
						item.subcategory,
						item.concept,
						item.linkType,
						item.contract,
						item.provider,
						item.file,
						item.resolution,
						item.certification,
						item.commitment,
						item.accrual,
						item.draw,
						item.receipt,
						item.funding,
						item.classifier,
						item.year,
						date(item.recordDate),
						date(item.scheduledDate),
						date(item.effectiveDate)
					];
					const amounts = [
						item.estimated,
						item.appraised,
						item.approved,
						item.certified,
						item.committed,
						item.accrued,
						item.drawn,
						item.paid,
						item.approved - item.paid
					];
					return /* @__PURE__ */ jsxs("tr", {
						className: `h-10 border-t border-border ${!item.hasDocument ? "bg-destructive-soft" : ""}`,
						children: [
							cells.map((cell, index) => /* @__PURE__ */ jsx("td", {
								className: "whitespace-nowrap px-3 py-2",
								children: cell
							}, index)),
							amounts.map((amount, index) => /* @__PURE__ */ jsx("td", {
								className: "whitespace-nowrap px-3 py-2 text-right tabular-nums",
								children: money(amount)
							}, index)),
							/* @__PURE__ */ jsxs("td", {
								className: "px-3 py-2 text-right tabular-nums",
								children: [(item.paid / item.approved * 100).toFixed(1), "%"]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsx(StateBadge, { state: item.state })
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: item.responsible
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: item.hasDocument ? /* @__PURE__ */ jsx(StatusBadge, {
									tono: "success",
									children: "Adjunto"
								}) : /* @__PURE__ */ jsx(StatusBadge, {
									tono: "destructive",
									children: "Faltante"
								})
							})
						]
					}, item.id);
				})]
			})]
		})
	});
}
function StateBadge({ state }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: state === "Pagado" || state === "Entregado" || state === "Inscrito" ? "success" : state === "Observado" ? "destructive" : state === "Pendiente" ? "warning" : "primary",
		children: state
	});
}
function ExportDialog({ abierto, mode, setMode, onClose, onExport, count }) {
	return /* @__PURE__ */ jsxs(Modal, {
		abierto,
		onCerrar: onClose,
		titulo: "Exportar a Excel",
		descripcion: `La exportación respetará los filtros y ${count} predio(s) seleccionados.`,
		ancho: "sm",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: onExport,
			children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Generar archivo .xlsx"]
		})] }),
		children: [/* @__PURE__ */ jsx("div", {
			role: "radiogroup",
			"aria-label": "Contenido a exportar",
			className: "space-y-2",
			children: [
				[
					"summary",
					"Resumen por predio",
					"Una fila por inmueble con montos y estados"
				],
				[
					"detail",
					"Detalle completo de movimientos",
					"Operaciones presupuestales, contractuales y de pago"
				],
				[
					"both",
					"Resumen y detalle",
					"Libro completo con todas las hojas solicitadas"
				]
			].map(([value, label, note]) => /* @__PURE__ */ jsxs("button", {
				type: "button",
				role: "radio",
				"aria-checked": mode === value,
				onClick: () => setMode(value),
				className: `flex w-full items-center gap-3 rounded-md border p-3 text-left ${mode === value ? "border-primary bg-primary-soft" : "border-border"}`,
				children: [/* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: `flex size-5 shrink-0 items-center justify-center rounded-sm border ${mode === value ? "border-primary bg-primary text-primary-foreground" : "border-border"}`,
					children: mode === value && /* @__PURE__ */ jsx(Check, { size: 12 })
				}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
					className: "block text-sm font-semibold",
					children: label
				}), /* @__PURE__ */ jsx("span", {
					className: "text-xs text-muted-foreground",
					children: note
				})] })]
			}, value))
		}), /* @__PURE__ */ jsxs("p", {
			className: "mt-3 rounded-md bg-background p-3 text-xs text-muted-foreground",
			children: [
				"Se incluirán las hojas ",
				/* @__PURE__ */ jsx("b", { children: "Distribución gastos compartidos" }),
				" y",
				" ",
				/* @__PURE__ */ jsx("b", { children: "Parámetros de consulta" }),
				". Los montos conservarán formato numérico en soles y los códigos no perderán ceros iniciales."
			]
		})]
	});
}
function movementExportRow(item) {
	const predio = predios.find((row) => row.code === item.predio);
	return {
		"Código proyecto": "CUI-2459786",
		"Nombre proyecto": "Carretera Central · Tramo 1",
		Tramo: predio.tramo,
		Sector: predio.sector,
		"Código predio": predio.code,
		Predio: predio.name,
		"Sujeto pasivo / ocupante": predio.owner,
		Procedimiento: predio.procedure,
		"Categoría de gasto": item.category,
		"Subcategoría de gasto": item.subcategory,
		Concepto: item.concept,
		"Tipo de vinculación": item.linkType,
		"Contrato / OS": item.contract,
		"Proveedor / beneficiario": item.provider,
		Expediente: item.file,
		Resolución: item.resolution,
		Certificación: item.certification,
		Compromiso: item.commitment,
		Devengado: item.accrual,
		Giro: item.draw,
		"Comprobante de pago": item.receipt,
		"Fuente de financiamiento": item.funding,
		Clasificador: item.classifier,
		"Año fiscal": item.year,
		"Fecha registro": date(item.recordDate),
		"Fecha programada": date(item.scheduledDate),
		"Fecha efectiva": date(item.effectiveDate),
		"Monto estimado": item.estimated,
		"Monto tasado": item.appraised,
		"Monto aprobado": item.approved,
		"Monto certificado": item.certified,
		"Monto comprometido": item.committed,
		"Monto devengado": item.accrued,
		"Monto girado": item.drawn,
		"Monto pagado": item.paid,
		"Saldo pendiente": item.approved - item.paid,
		"% ejecución": item.paid / item.approved,
		Estado: item.state,
		Responsable: item.responsible,
		"Documento sustentatorio": item.hasDocument ? `DOC-${item.id}` : "FALTANTE"
	};
}
var excelAutoFilterFeature = { files: { transform: { "xl/worksheets/sheet{id}.xml": { transform(content) {
	const range = content.match(/<dimension ref="([^"]+)"\s*\/>/)?.[1];
	if (!range || content.includes("<autoFilter")) return content;
	return content.replace("</sheetData>", `</sheetData><autoFilter ref="${range}"/>`);
} } } } };
function buildExcelSheet(name, rows) {
	const safeRows = rows.length ? rows : [{ Resultado: "Sin registros para los filtros seleccionados" }];
	const headers = Object.keys(safeRows[0]);
	const data = [headers.map((header) => ({
		value: header,
		fontWeight: "bold",
		align: "center",
		wrap: true,
		height: 28
	})), ...safeRows.map((row) => headers.map((header) => {
		const value = row[header] ?? "";
		if (typeof value === "number") {
			const percentage = header.includes("%") || header.toLowerCase().includes("porcentaje");
			return {
				value,
				type: Number,
				format: percentage ? "0.00%" : "S/ #,##0.00",
				align: "right"
			};
		}
		return {
			value: String(value),
			type: String,
			align: "left"
		};
	}))];
	if (safeRows.length > 1) data.push(headers.map((header, column) => {
		const values = safeRows.map((row) => row[header]);
		if (values.every((value) => typeof value === "number")) {
			const percentage = header.includes("%") || header.toLowerCase().includes("porcentaje");
			return {
				value: values.reduce((sum, value) => sum + Number(value), 0),
				type: Number,
				format: percentage ? "0.00%" : "S/ #,##0.00",
				fontWeight: "bold"
			};
		}
		return {
			value: column === 0 ? "TOTAL GENERAL" : "",
			fontWeight: "bold"
		};
	}));
	return {
		data,
		sheet: name.slice(0, 31),
		stickyRowsCount: 1,
		orientation: "landscape",
		showGridLines: true,
		columns: headers.map((header) => ({ width: Math.min(34, Math.max(14, header.length + 2, ...safeRows.map((row) => String(row[header] ?? "").length))) }))
	};
}
//#endregion
export { GastosProyectoPredioPage as component };
