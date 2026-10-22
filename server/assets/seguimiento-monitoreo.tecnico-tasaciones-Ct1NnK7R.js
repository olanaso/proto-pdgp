import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { d as predioRows } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { E as Modal } from "./PredioEncabezado-FhqZ2Jv6.js";
import { a as SheetFooter, i as SheetDescription, n as Sheet$1, o as SheetHeader, r as SheetContent, s as SheetTitle, t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { a as fullPredioTrackingStageIndex, i as fullPredioTrackingProcessDays, n as FULL_PREDIO_TRACKING_STAGES, o as fullPredioTrackingStageTiming, r as formatFullPredioTrackingDate, s as fullPredioTrackingStart, t as FullPrediosTable } from "./FullPrediosTable-DSKQiRob.js";
import { t as ChartExplanation } from "./ChartExplanation-0Z95AIWE.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, ArrowDownRight, ArrowUpRight, Calculator, CheckCircle2, ChevronRight, CircleDollarSign, Download, Eye, FileCheck2, FilterX, MinusCircle, RefreshCw, Ruler, Search, X, XCircle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.tecnico-tasaciones.tsx?tsr-split=component
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
var states = [
	"Pendiente",
	"Elaboración",
	"Revisión",
	"Observado",
	"Subsanado",
	"Conforme",
	"Enviado a tasación",
	"En tasación",
	"Recibido",
	"Aprobado",
	"Vencido"
];
var stateData = states.map((name, index) => ({
	name,
	value: [
		74,
		96,
		82,
		61,
		48,
		116,
		91,
		68,
		53,
		142,
		27
	][index],
	color: serieColor(index),
	opacity: serieOpacidad(index)
}));
var names = [
	"María Elena Rojas",
	"Comunidad San Jerónimo",
	"Inversiones del Centro SAC",
	"Sucesión Flores Huamán",
	"Municipalidad Distrital Norte",
	"José Antonio Medina",
	"Agrícola Santa Ana SRL",
	"Rosa Milagros Chávez",
	"Consorcio Vial Andino",
	"Comunidad Campesina Central",
	"Transportes del Valle SAC",
	"Familia Gutiérrez Soto",
	"Agroindustrias del Sur",
	"Constructora Los Andes",
	"Asociación Valle Verde"
];
var types = [
	"Rural",
	"Urbano",
	"Industrial",
	"Comercial"
];
var typeColors = {
	Rural: SERIE[0],
	Urbano: SERIE[1],
	Industrial: SERIE[2],
	Comercial: SERIE[3]
};
var experts = [
	"Ing. J. Torres",
	"Arq. P. Medina",
	"Ing. R. Castro",
	"Arq. S. León"
];
var technicians = [
	"M. Salazar",
	"C. Romero",
	"L. Quispe",
	"A. Paredes"
];
var predios = names.map((owner, index) => {
	const affectedArea = 360 + index * 617 % 6800;
	const matrixArea = affectedArea * (1.55 + index % 4 * .3);
	const land = affectedArea * (620 + index % 5 * 185) / 1e6;
	const buildings = index % 3 === 0 ? land * .52 : land * (.14 + index % 4 * .07);
	const plantations = index % 2 === 0 ? land * .11 : land * .025;
	const economicLoss = land * (.05 + index % 3 * .02);
	const incentive = land * .06;
	const compensation = land * (.04 + index % 2 * .03);
	const directServices = .08 + index % 5 * .035;
	const sharedExpenses = .04 + index % 4 * .02;
	const appraised = land + buildings + plantations + economicLoss;
	const approved = appraised * (.96 + index % 4 * .025);
	const paid = approved * (.72 + index % 5 * .055);
	const estimated = appraised * (.84 + index % 6 * .055);
	return {
		code: `PR-${String(1842 + index * 23).padStart(6, "0")}`,
		owner,
		sector: `Sector ${String.fromCharCode(65 + index % 7)}`,
		type: types[index % types.length],
		status: states[index * 3 % states.length],
		appraisalStatus: [
			"Pendiente",
			"En proceso",
			"Aprobada",
			"Observada",
			"Vencida"
		][index % 5],
		expert: experts[index % experts.length],
		technician: technicians[index * 3 % technicians.length],
		matrixArea,
		affectedArea,
		remainingArea: matrixArea - affectedArea,
		land,
		buildings,
		plantations,
		economicLoss,
		incentive,
		compensation,
		directServices,
		sharedExpenses,
		appraised,
		approved,
		paid,
		estimated,
		variation: (appraised - estimated) / estimated * 100,
		servicesPct: (directServices + sharedExpenses) / (appraised + directServices + sharedExpenses) * 100,
		entryDate: new Date(Date.UTC(2026, 0, 5 + index * 4)).toLocaleDateString("es-PE", { timeZone: "UTC" })
	};
});
var sectorCosts = Array.from({ length: 7 }, (_, index) => {
	const rows = predios.filter((row) => row.sector === `Sector ${String.fromCharCode(65 + index)}`);
	return {
		name: `Sector ${String.fromCharCode(65 + index)}`,
		estimated: rows.reduce((sum, row) => sum + row.estimated, 0),
		appraised: rows.reduce((sum, row) => sum + row.appraised, 0),
		approved: rows.reduce((sum, row) => sum + row.approved, 0),
		paid: rows.reduce((sum, row) => sum + row.paid, 0)
	};
});
var compositionBase = [
	{
		name: "Terreno",
		value: 58
	},
	{
		name: "Edificaciones",
		value: 18
	},
	{
		name: "Obras complementarias",
		value: 7
	},
	{
		name: "Instalaciones fijas",
		value: 5
	},
	{
		name: "Plantaciones",
		value: 4
	},
	{
		name: "Daño emergente",
		value: 5
	},
	{
		name: "Lucro cesante",
		value: 3
	}
].map((row, index) => ({
	...row,
	color: serieColor(index),
	opacity: serieOpacidad(index)
}));
var documentColumns = [
	"Plano",
	"Memoria descriptiva",
	"Coordenadas",
	"Partida registral",
	"Estudio de títulos",
	"Sujeto pasivo",
	"Edificaciones",
	"Plantaciones",
	"Perjuicio económico",
	"Fotografías",
	"Inspección ocular"
];
var defaultFilters = {
	project: "TODOS",
	sector: "TODOS",
	property: "TODOS",
	type: "TODOS",
	fileStatus: "TODOS",
	appraisalStatus: "TODOS",
	expert: "TODOS",
	technician: "TODOS",
	start: "2026-01-01",
	end: "2026-12-31"
};
function money(value, digits = 2) {
	return `S/ ${value.toLocaleString("es-PE", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	})} MM`;
}
function number(value, digits = 1) {
	return value.toLocaleString("es-PE", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function TecnicoTasacionesPage() {
	const [filters, setFilters] = useState(defaultFilters);
	const [search, setSearch] = useState("");
	const [selectedComposition, setSelectedComposition] = useState(null);
	const [selectedPredio, setSelectedPredio] = useState(null);
	const [selectedFullTracking, setSelectedFullTracking] = useState(null);
	const [updatedAt, setUpdatedAt] = useState("05/08/2026 10:48");
	const filtered = useMemo(() => predios.filter((row) => {
		if (filters.sector !== "TODOS" && row.sector !== filters.sector) return false;
		if (filters.property !== "TODOS" && row.code !== filters.property) return false;
		if (filters.type !== "TODOS" && row.type !== filters.type) return false;
		if (filters.fileStatus !== "TODOS" && row.status !== filters.fileStatus) return false;
		if (filters.appraisalStatus !== "TODOS" && row.appraisalStatus !== filters.appraisalStatus) return false;
		if (filters.expert !== "TODOS" && row.expert !== filters.expert) return false;
		if (filters.technician !== "TODOS" && row.technician !== filters.technician) return false;
		const query = search.trim().toLowerCase();
		return !query || `${row.code} ${row.owner}`.toLowerCase().includes(query);
	}), [filters, search]);
	const scale = Math.max(.08, filtered.length / predios.length) * (filters.project === "TODOS" ? 1 : .74);
	const totalAppraised = predios.reduce((sum, row) => sum + row.appraised, 0) * scale;
	const cards = [
		{
			label: "Expedientes pendientes",
			value: Math.round(74 * scale).toString(),
			note: "8.2% de expedientes",
			trend: -4.2
		},
		{
			label: "Expedientes en elaboración",
			value: Math.round(96 * scale).toString(),
			note: "10.6% de expedientes",
			trend: 6.4
		},
		{
			label: "Expedientes observados",
			value: Math.round(61 * scale).toString(),
			note: "6.7% requieren subsanación",
			trend: -8.1
		},
		{
			label: "Expedientes conformes",
			value: Math.round(116 * scale).toString(),
			note: "12.8% de expedientes",
			trend: 9.7
		},
		{
			label: "Tasaciones en proceso",
			value: Math.round(68 * scale).toString(),
			note: "7.5% de expedientes",
			trend: 5.3
		},
		{
			label: "Tasaciones aprobadas",
			value: Math.round(142 * scale).toString(),
			note: "15.6% de expedientes",
			trend: 11.8
		},
		{
			label: "Tasaciones vencidas",
			value: Math.max(1, Math.round(27 * scale)).toString(),
			note: "Superaron vigencia",
			trend: -3.6
		},
		{
			label: "Valor total tasado",
			value: money(totalAppraised, 1),
			note: "Acumulado de la cartera",
			trend: 7.9
		},
		{
			label: "Desviación estimación / tasación",
			value: "+8.6%",
			note: "Tolerancia definida: ±10%",
			trend: 1.2
		}
	];
	const ranking = [...predios].sort((a, b) => b.appraised + b.directServices + b.sharedExpenses - (a.appraised + a.directServices + a.sharedExpenses)).map((row, index) => {
		const total = row.appraised + row.directServices + row.sharedExpenses;
		const perSquareMeter = total * 1e6 / row.affectedArea;
		return {
			...row,
			total,
			perSquareMeter,
			above: index < 4,
			label: `${money(total, 1)} · S/ ${number(perSquareMeter, 0)}/m² · Serv. ${row.servicesPct.toFixed(1)}%`
		};
	});
	function update(key, value) {
		setFilters((current) => ({
			...current,
			[key]: value
		}));
	}
	function reset() {
		setFilters(defaultFilters);
		setSearch("");
		setSelectedComposition(null);
	}
	function exportCsv() {
		const header = "codigo,area_matriz,area_afectada,area_remanente,terreno,edificaciones,plantaciones,perjuicio_economico,incentivo,compensacion,servicios_directos,gastos_compartidos,valor_tasado,monto_aprobado,monto_pagado,variacion\n";
		const rows = filtered.map((row) => [
			row.code,
			row.matrixArea,
			row.affectedArea,
			row.remainingArea,
			row.land,
			row.buildings,
			row.plantations,
			row.economicLoss,
			row.incentive,
			row.compensation,
			row.directServices,
			row.sharedExpenses,
			row.appraised,
			row.approved,
			row.paid,
			row.variation
		].map((cell) => `"${cell}"`).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([
			"﻿",
			header,
			rows
		], { type: "text/csv;charset=utf-8" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "dashboard_tecnico_tasaciones.csv";
		link.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Calculator,
			titulo: "Expedientes, tasaciones y costos",
			descripcion: `Control de expedientes, valorizaciones, desviaciones de costo y cumplimiento documental. Última actualización: ${updatedAt}.`,
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: reset,
				children: [/* @__PURE__ */ jsx(FilterX, {}), " Restablecer filtros"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: exportCsv,
				children: [/* @__PURE__ */ jsx(Download, {}), " Exportar tabla de costos"]
			})] })
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: "Datos de demostración. Las cifras de este tablero son de muestra y no provienen de un sistema real."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Alcance técnico y valuatorio",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [filters.fileStatus !== "TODOS" && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => update("fileStatus", "TODOS"),
					children: [
						/* @__PURE__ */ jsx(X, {}),
						" Quitar estado: ",
						filters.fileStatus
					]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => setUpdatedAt("05/08/2026 11:06"),
					children: [/* @__PURE__ */ jsx(RefreshCw, {}), " Actualizar información"]
				})]
			}),
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5",
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
						label: "Sector",
						value: filters.sector,
						onChange: (v) => update("sector", v),
						options: ["TODOS", ...sectorCosts.map((row) => row.name)]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Predio",
						value: filters.property,
						onChange: (v) => update("property", v),
						options: ["TODOS", ...predios.map((row) => row.code)]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Tipo de inmueble",
						value: filters.type,
						onChange: (v) => update("type", v),
						options: ["TODOS", ...types]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado del expediente",
						value: filters.fileStatus,
						onChange: (v) => update("fileStatus", v),
						options: ["TODOS", ...states]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado de tasación",
						value: filters.appraisalStatus,
						onChange: (v) => update("appraisalStatus", v),
						options: [
							"TODOS",
							"Pendiente",
							"En proceso",
							"Aprobada",
							"Observada",
							"Vencida"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Perito",
						value: filters.expert,
						onChange: (v) => update("expert", v),
						options: ["TODOS", ...experts]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Responsable técnico",
						value: filters.technician,
						onChange: (v) => update("technician", v),
						options: ["TODOS", ...technicians]
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
			titulo: "Indicadores técnicos",
			className: "mb-4",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-9",
				children: cards.map((card) => /* @__PURE__ */ jsx(KpiCard, { ...card }, card.label))
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Matriz extensa con seguimiento técnico y tasaciones",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs(StatusBadge, {
				tono: "neutral",
				children: [
					"Fuente completa: predioRows · ",
					predioRows.length,
					" registros"
				]
			}),
			children: [/* @__PURE__ */ jsxs("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: [
					"Conserva todas las columnas de la Matriz extensa y añade fechas, etapas, tiempos y desviaciones para los ",
					predioRows.length,
					" predios. Seleccione una etapa para ver su detalle."
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex h-[720px] min-h-0 flex-col",
				children: /* @__PURE__ */ jsx(FullPrediosTable, {
					rows: predioRows,
					tracking: true,
					onSelectTrackingStage: (row, stageIndex) => setSelectedFullTracking({
						row,
						stageIndex
					})
				})
			})]
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Expedientes por estado",
			subtitle: "Compara la cantidad de expedientes en cada estado del proceso técnico; seleccione una barra para ver solo esos predios.",
			icon: /* @__PURE__ */ jsx(FileCheck2, { size: 16 }),
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 365,
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: stateData.map((row) => ({
						...row,
						value: Math.max(1, Math.round(row.value * scale))
					})),
					margin: {
						left: 4,
						right: 10,
						top: 12,
						bottom: 45
					},
					onClick: (state) => {
						if (typeof state?.activeLabel === "string") update("fileStatus", filters.fileStatus === state.activeLabel ? "TODOS" : state.activeLabel);
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "var(--color-border)",
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
							tick: TICK,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ jsx(Tooltip, {}),
						/* @__PURE__ */ jsxs(Bar, {
							dataKey: "value",
							name: "Expedientes",
							radius: [
								4,
								4,
								0,
								0
							],
							cursor: "pointer",
							children: [/* @__PURE__ */ jsx(LabelList, {
								dataKey: "value",
								position: "top",
								style: {
									fontSize: 12,
									fill: "var(--color-muted-foreground)"
								}
							}), stateData.map((row) => /* @__PURE__ */ jsx(Cell, {
								fill: row.color,
								opacity: filters.fileStatus !== "TODOS" && filters.fileStatus !== row.name ? .25 : row.opacity
							}, row.name))]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Comparativo de costos por sector",
			subtitle: "Compara costo estimado, valor tasado, monto aprobado y pago final; la línea de referencia marca la tolerancia presupuestal.",
			icon: /* @__PURE__ */ jsx(CircleDollarSign, { size: 16 }),
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 365,
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: sectorCosts,
					margin: {
						left: 4,
						right: 10,
						top: 16
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
						/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => money(Number(value)) }),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						/* @__PURE__ */ jsx(ReferenceLine, {
							y: 22,
							stroke: "var(--color-primary-dark)",
							strokeDasharray: "5 4",
							label: {
								value: "Límite de tolerancia",
								position: "insideTopRight",
								fill: "var(--color-primary-dark)",
								fontSize: 12
							}
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "estimated",
							name: "Costo estimado",
							fill: SERIE[4],
							radius: [
								3,
								3,
								0,
								0
							]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "appraised",
							name: "Valor tasado",
							fill: SERIE[3],
							radius: [
								3,
								3,
								0,
								0
							]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "approved",
							name: "Monto aprobado",
							fill: SERIE[2],
							radius: [
								3,
								3,
								0,
								0
							]
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "paid",
							name: "Costo final pagado",
							fill: SERIE[0],
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
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Composición del valor tasado",
			subtitle: "Cada segmento muestra cuánto aporta terreno, edificaciones, instalaciones, plantaciones o perjuicios al valor tasado total. Seleccione un segmento para ver los predios que lo componen.",
			icon: /* @__PURE__ */ jsx(Calculator, { size: 16 }),
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid items-center gap-4 md:grid-cols-[1fr_.9fr]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
						width: "100%",
						height: 300,
						children: /* @__PURE__ */ jsxs(PieChart, { children: [/* @__PURE__ */ jsx(Pie, {
							data: compositionBase,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 67,
							outerRadius: 104,
							paddingAngle: 2,
							cursor: "pointer",
							onClick: (row) => setSelectedComposition(row.name),
							children: compositionBase.map((row) => /* @__PURE__ */ jsx(Cell, {
								fill: row.color,
								fillOpacity: row.opacity
							}, row.name))
						}), /* @__PURE__ */ jsx(Tooltip, { formatter: (value) => `${value}%` })] })
					}), /* @__PURE__ */ jsxs("div", {
						className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-xs uppercase text-muted-foreground",
							children: "Valor tasado"
						}), /* @__PURE__ */ jsx("b", {
							className: "text-lg tabular-nums",
							children: money(totalAppraised, 1)
						})]
					})]
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-1",
					children: compositionBase.map((row) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setSelectedComposition(row.name),
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
						}), /* @__PURE__ */ jsxs("b", {
							className: "tabular-nums",
							children: [row.value, "%"]
						})]
					}) }, row.name))
				})]
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Área afectada vs. valor tasado",
			subtitle: "Los puntos alejados del grupo revelan posibles valores atípicos: eje horizontal es área, eje vertical valor tasado y tamaño es costo total. Seleccione un punto para abrir el expediente.",
			icon: /* @__PURE__ */ jsx(Ruler, { size: 16 }),
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 318,
				children: /* @__PURE__ */ jsxs(ScatterChart, {
					margin: {
						left: 8,
						right: 24,
						top: 12,
						bottom: 10
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "var(--color-border)",
							strokeDasharray: "3 3"
						}),
						/* @__PURE__ */ jsx(XAxis, {
							type: "number",
							dataKey: "affectedArea",
							name: "Área afectada",
							unit: " m²",
							tick: TICK
						}),
						/* @__PURE__ */ jsx(YAxis, {
							type: "number",
							dataKey: "appraised",
							name: "Valor tasado",
							unit: " MM",
							tick: TICK
						}),
						/* @__PURE__ */ jsx(ZAxis, {
							type: "number",
							dataKey: "approved",
							range: [70, 440],
							name: "Costo total"
						}),
						/* @__PURE__ */ jsx(Tooltip, {
							cursor: { strokeDasharray: "3 3" },
							formatter: (value, name) => name === "Área afectada" ? `${number(Number(value), 0)} m²` : money(Number(value))
						}),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
						types.map((type) => /* @__PURE__ */ jsx(Scatter, {
							name: type,
							data: predios.filter((row) => row.type === type),
							fill: typeColors[type],
							onClick: (row) => setSelectedPredio(row),
							cursor: "pointer"
						}, type)),
						/* @__PURE__ */ jsx(ReferenceLine, {
							y: 12,
							stroke: "var(--color-primary-dark)",
							strokeDasharray: "4 4",
							label: {
								value: "Zona de atípicos",
								fontSize: 12,
								fill: "var(--color-primary-dark)"
							}
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx(Panel, {
			title: "Ranking de los 15 predios de mayor costo",
			subtitle: "Ordena los quince predios más costosos; en rojo los que superan el promedio de su sector por encima del umbral. Seleccione una barra para abrir el expediente.",
			icon: /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 }),
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 505,
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: ranking,
					layout: "vertical",
					margin: {
						left: 18,
						right: 280,
						top: 8
					},
					onClick: (state) => {
						if (typeof state?.activeLabel === "string") {
							const row = ranking.find((item) => item.code === state.activeLabel);
							if (row) setSelectedPredio(row);
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
							width: 90,
							tick: TICK,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => money(Number(value)) }),
						/* @__PURE__ */ jsxs(Bar, {
							dataKey: "total",
							name: "Costo total",
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
							}), ranking.map((row) => /* @__PURE__ */ jsx(Cell, { fill: row.above ? SERIE[0] : SERIE[3] }, row.code))]
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Tabla técnica de costos por predio",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "relative block w-64",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "sr-only",
							children: "Buscar código o sujeto pasivo"
						}),
						/* @__PURE__ */ jsx(Search, {
							size: 16,
							className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": true
						}),
						/* @__PURE__ */ jsx("input", {
							value: search,
							onChange: (event) => setSearch(event.target.value),
							className: `${controlClase} h-8 pl-8`,
							placeholder: "Buscar código o sujeto pasivo"
						})
					]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: exportCsv,
					children: [/* @__PURE__ */ jsx(Download, {}), " Exportar tabla"]
				})]
			}),
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Valores monetarios expresados en millones de soles."
			}), /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[1900px] text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH,
							children: "Código"
						}),
						[
							"Área matriz",
							"Área afectada",
							"Área remanente",
							"Terreno",
							"Edificaciones",
							"Plantaciones",
							"Perjuicio económico",
							"Incentivo",
							"Compensación",
							"Servicios directos",
							"Gastos compartidos",
							"Valor tasado",
							"Monto aprobado",
							"Monto pagado",
							"Variación"
						].map((head) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH_NUM,
							children: head
						}, head)),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH,
							children: /* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "Acciones"
							})
						})
					] }) }), /* @__PURE__ */ jsxs("tbody", {
						className: "[&>tr:nth-child(even)]:bg-background",
						children: [!filtered.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 17,
							className: "px-3 py-8 text-center text-sm text-muted-foreground",
							children: "No se encontraron predios con los filtros seleccionados."
						}) }), filtered.map((row) => /* @__PURE__ */ jsxs("tr", {
							className: "h-10 border-t border-border",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 font-semibold text-primary-dark",
									children: row.code
								}),
								/* @__PURE__ */ jsx(AreaCell, { value: row.matrixArea }),
								/* @__PURE__ */ jsx(AreaCell, { value: row.affectedArea }),
								/* @__PURE__ */ jsx(AreaCell, { value: row.remainingArea }),
								[
									row.land,
									row.buildings,
									row.plantations,
									row.economicLoss,
									row.incentive,
									row.compensation,
									row.directServices,
									row.sharedExpenses,
									row.appraised,
									row.approved,
									row.paid
								].map((value, index) => /* @__PURE__ */ jsx(MoneyCell, { value }, index)),
								/* @__PURE__ */ jsxs("td", {
									className: `px-3 py-2 text-right font-semibold tabular-nums ${Math.abs(row.variation) > 10 ? "text-destructive" : row.variation > 0 ? "text-warning" : "text-success"}`,
									children: [
										row.variation > 0 ? "+" : "",
										row.variation.toFixed(1),
										"%"
									]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setSelectedPredio(row),
										title: "Abrir expediente técnico-legal",
										children: [/* @__PURE__ */ jsx(Eye, {}), " Expediente"]
									})
								})
							]
						}, row.code))]
					})]
				})
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Matriz de cumplimiento documental",
			className: "mb-4",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Integridad de los documentos técnicos, legales y valuatorios por predio."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto rounded-md border border-border",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full min-w-[1380px] text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} sticky left-0 z-10 bg-primary-soft`,
							children: "Código del predio"
						}), documentColumns.map((column) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 min-w-24 px-3 text-center text-xs font-semibold uppercase",
							children: column
						}, column))] }) }), /* @__PURE__ */ jsxs("tbody", {
							className: "[&>tr:nth-child(even)]:bg-background",
							children: [filtered.slice(0, 10).map((row, rowIndex) => /* @__PURE__ */ jsxs("tr", {
								className: "h-10 border-t border-border",
								children: [/* @__PURE__ */ jsx("td", {
									className: "sticky left-0 z-10 bg-card px-3 py-2 font-semibold text-foreground",
									children: row.code
								}), documentColumns.map((column, columnIndex) => /* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center",
									children: /* @__PURE__ */ jsx(DocumentStatus, { status: (rowIndex * 3 + columnIndex) % 11 === 0 ? "missing" : (rowIndex + columnIndex * 2) % 7 === 0 ? "observed" : columnIndex > 6 && (rowIndex + columnIndex) % 6 === 0 ? "na" : "complete" })
								}, column))]
							}, row.code)), !filtered.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 12,
								className: "px-3 py-8 text-center text-sm text-muted-foreground",
								children: "No se encontraron predios con los filtros seleccionados."
							}) })]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-2 flex flex-wrap justify-end gap-4 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(CheckCircle2, {
								size: 12,
								className: "text-success",
								"aria-hidden": true
							}), " Completo"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(AlertCircle, {
								size: 12,
								className: "text-warning",
								"aria-hidden": true
							}), " Observado"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(XCircle, {
								size: 12,
								className: "text-destructive",
								"aria-hidden": true
							}), " Faltante"]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(MinusCircle, {
								size: 12,
								className: "text-muted-foreground",
								"aria-hidden": true
							}), " No aplicable"]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsx(CompositionDrawer, {
			name: selectedComposition,
			total: totalAppraised * (compositionBase.find((row) => row.name === selectedComposition)?.value ?? 0) / 100,
			onClose: () => setSelectedComposition(null),
			onPredio: setSelectedPredio
		}),
		/* @__PURE__ */ jsx(PredioDrawer, {
			row: selectedPredio,
			onClose: () => setSelectedPredio(null)
		}),
		/* @__PURE__ */ jsx(FullPredioTrackingModal, {
			selected: selectedFullTracking,
			onClose: () => setSelectedFullTracking(null)
		})
	] });
}
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
var TH_NUM = "h-9 whitespace-nowrap px-3 text-right text-xs font-semibold uppercase";
function FullPredioTrackingModal({ selected, onClose }) {
	return /* @__PURE__ */ jsx(Modal, {
		abierto: selected !== null,
		onCerrar: onClose,
		titulo: selected ? `${selected.row.cod || selected.row.codigo} · ${FULL_PREDIO_TRACKING_STAGES[selected.stageIndex].label}` : "",
		descripcion: selected ? `Matriz extensa · Seguimiento técnico y tasaciones. ${selected.row.proyecto || "Proyecto sin registrar"} · ${selected.row.suj || "Sin información"}` : void 0,
		ancho: "lg",
		pie: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cerrar detalle"
		}),
		children: selected && /* @__PURE__ */ jsx(FullPredioTrackingDetail, { selected })
	});
}
function FullPredioTrackingDetail({ selected }) {
	const { row, stageIndex } = selected;
	const currentStage = fullPredioTrackingStageIndex(row);
	const timing = fullPredioTrackingStageTiming(row, stageIndex);
	const stage = FULL_PREDIO_TRACKING_STAGES[stageIndex];
	const totalTarget = FULL_PREDIO_TRACKING_STAGES.reduce((total, item) => total + item.targetDays, 0);
	const processDays = fullPredioTrackingProcessDays(row);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ jsx(TrackingMetric, {
					label: "Condición",
					value: /* @__PURE__ */ jsx(CondicionBadge, { condition: timing.condition })
				}),
				/* @__PURE__ */ jsx(TrackingMetric, {
					label: "Inicio del proceso",
					value: formatFullPredioTrackingDate(fullPredioTrackingStart(row))
				}),
				/* @__PURE__ */ jsx(TrackingMetric, {
					label: "Inicio de etapa",
					value: timing.start ? formatFullPredioTrackingDate(timing.start) : "Pendiente"
				}),
				/* @__PURE__ */ jsx(TrackingMetric, {
					label: "Fin / corte",
					value: timing.end ? formatFullPredioTrackingDate(timing.end) : "Pendiente"
				}),
				/* @__PURE__ */ jsx(TrackingMetric, {
					label: "Tiempo real",
					value: timing.days === null ? "Sin registro" : `${timing.days} días`
				}),
				/* @__PURE__ */ jsx(TrackingMetric, {
					label: "Meta etapa",
					value: `${stage.targetDays} días`
				}),
				/* @__PURE__ */ jsx(TrackingMetric, {
					label: "Tiempo total",
					value: `${processDays} días`
				}),
				/* @__PURE__ */ jsx(TrackingMetric, {
					label: "Meta total",
					value: `${totalTarget} días`
				})
			]
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos principales de la Matriz extensa" }),
		/* @__PURE__ */ jsx("dl", {
			className: "grid gap-px overflow-hidden rounded-md border border-border bg-border text-sm sm:grid-cols-2 lg:grid-cols-4",
			children: [
				["Condición del predio", row.condicionPredio],
				["Expediente", row.exp],
				["Modalidad", row.mod],
				["Sujeto pasivo", row.suj],
				["Condición del sujeto pasivo", row.cond],
				["Responsable legal", row.rlegal],
				["Responsable técnico", row.rtec],
				["Partida registral", row.part],
				["Área afectada", row.m2 ? `${row.m2} m²` : ""],
				["Tipo de afectación", row.afec],
				["Valor de adquisición", row.valor ? `S/ ${row.valor}` : ""],
				["Estado de pago", row.pago],
				["Estado de título", row.etit],
				["Transferencia a OPAT", row.trans],
				["Expediente físico DDP", row.edd],
				["Comentario", row.com]
			].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
				className: "bg-card p-2.5",
				children: [/* @__PURE__ */ jsx("dt", {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ jsx("dd", {
					className: "mt-1 font-semibold text-foreground",
					children: value || "Sin información"
				})]
			}, label))
		}),
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsxs(StatusBadge, {
				tono: "primary",
				children: [
					currentStage + 1,
					" de ",
					FULL_PREDIO_TRACKING_STAGES.length,
					" etapas"
				]
			}),
			children: "Cronología del expediente técnico y tasación"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-muted-foreground",
			children: "Tiempo real comparado con la meta definida para cada etapa."
		}),
		/* @__PURE__ */ jsx("ol", {
			className: "divide-y divide-border rounded-md border border-border",
			children: FULL_PREDIO_TRACKING_STAGES.map((timelineStage, index) => {
				const timelineTiming = fullPredioTrackingStageTiming(row, index);
				const late = timelineTiming.days !== null && timelineTiming.days > timelineStage.targetDays;
				return /* @__PURE__ */ jsxs("li", {
					className: `grid grid-cols-[1.75rem_1fr_auto] items-center gap-2 px-3 py-2 text-sm sm:grid-cols-[1.75rem_minmax(180px,1fr)_8rem_14rem_8rem] ${index === stageIndex ? "bg-primary-soft" : ""}`,
					"aria-current": index === stageIndex ? "step" : void 0,
					children: [
						/* @__PURE__ */ jsx("span", {
							className: `flex size-7 items-center justify-center rounded-full text-xs font-semibold ${timelineTiming.condition === "Completada" ? "bg-success text-primary-foreground" : timelineTiming.condition === "Etapa actual" ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground"}`,
							"aria-hidden": true,
							children: timelineTiming.condition === "Completada" ? /* @__PURE__ */ jsx(CheckCircle2, { size: 14 }) : index + 1
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("b", {
							className: "text-foreground",
							children: timelineStage.label
						}), index === stageIndex && /* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold text-primary-dark",
							children: "Etapa seleccionada"
						})] }),
						/* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ jsx(CondicionBadge, { condition: timelineTiming.condition })
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "hidden text-xs text-muted-foreground sm:block",
							children: [
								timelineTiming.start ? formatFullPredioTrackingDate(timelineTiming.start) : "Pendiente",
								" ",
								"a",
								" ",
								timelineTiming.end ? formatFullPredioTrackingDate(timelineTiming.end) : "Pendiente"
							]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "justify-self-end",
							children: /* @__PURE__ */ jsx(StatusBadge, {
								tono: timelineTiming.days === null ? "neutral" : late ? "destructive" : "success",
								children: timelineTiming.days === null ? `Meta ${timelineStage.targetDays} d` : `${timelineTiming.days} / ${timelineStage.targetDays} d`
							})
						})
					]
				}, timelineStage.label);
			})
		})
	] });
}
function CondicionBadge({ condition }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: condition === "Completada" ? "success" : condition === "Etapa actual" ? "primary" : "neutral",
		children: condition
	});
}
function TrackingMetric({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-1 text-sm font-semibold",
			children: value
		})]
	});
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
				className: "mt-1 whitespace-nowrap text-lg font-semibold tabular-nums text-foreground",
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
function AreaCell({ value }) {
	return /* @__PURE__ */ jsxs("td", {
		className: "whitespace-nowrap px-3 py-2 text-right tabular-nums",
		children: [number(value), " m²"]
	});
}
function MoneyCell({ value }) {
	return /* @__PURE__ */ jsx("td", {
		className: "whitespace-nowrap px-3 py-2 text-right tabular-nums",
		children: money(value)
	});
}
function DocumentStatus({ status }) {
	const config = {
		complete: {
			Icon: CheckCircle2,
			cls: "text-success",
			label: "Completo"
		},
		observed: {
			Icon: AlertCircle,
			cls: "text-warning",
			label: "Observado"
		},
		missing: {
			Icon: XCircle,
			cls: "text-destructive",
			label: "Faltante"
		},
		na: {
			Icon: MinusCircle,
			cls: "text-muted-foreground",
			label: "No aplicable"
		}
	}[status];
	const Icon = config.Icon;
	return /* @__PURE__ */ jsxs("span", {
		title: config.label,
		className: `inline-flex items-center justify-center ${config.cls}`,
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 16,
			"aria-hidden": true
		}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: config.label
		})]
	});
}
function CompositionDrawer({ name, total, onClose, onPredio }) {
	return /* @__PURE__ */ jsx(Sheet$1, {
		open: name !== null,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsxs(SheetContent, {
			className: "flex w-full flex-col gap-0 overflow-y-auto bg-card p-0 sm:max-w-md",
			children: [
				/* @__PURE__ */ jsxs(SheetHeader, {
					className: "border-b border-border px-4 py-3 text-left",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold uppercase text-primary",
							children: "Composición del valor tasado"
						}),
						/* @__PURE__ */ jsx(SheetTitle, {
							className: "text-xl font-semibold text-primary-dark",
							children: name
						}),
						/* @__PURE__ */ jsx(SheetDescription, {
							className: "text-lg font-semibold tabular-nums text-foreground",
							children: money(total, 1)
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 p-4",
					children: [/* @__PURE__ */ jsx("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: "Predios que conforman el monto seleccionado."
					}), /* @__PURE__ */ jsx("ul", {
						className: "space-y-2",
						children: predios.slice(0, 8).map((row, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => onPredio(row),
							className: "flex w-full items-center justify-between gap-2 rounded-md border border-border p-3 text-left hover:bg-muted",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("b", {
									className: "text-sm text-foreground",
									children: row.code
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: [
										row.owner,
										" · ",
										row.sector
									]
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "text-right",
									children: [/* @__PURE__ */ jsx("b", {
										className: "text-sm tabular-nums",
										children: money(total * (.17 - index * .012), 2)
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "Ver expediente"
									})]
								}),
								/* @__PURE__ */ jsx(ChevronRight, {
									size: 16,
									className: "text-muted-foreground",
									"aria-hidden": true
								})
							]
						}) }, row.code))
					})]
				}),
				/* @__PURE__ */ jsx(SheetFooter, {
					className: "border-t border-border p-3",
					children: /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: onClose,
						children: "Cerrar"
					})
				})
			]
		})
	});
}
function PredioDrawer({ row, onClose }) {
	const fields = row ? [
		["Sujeto pasivo", row.owner],
		["Sector / tipo", `${row.sector} · ${row.type}`],
		["Estado del expediente", row.status],
		["Estado de tasación", row.appraisalStatus],
		["Perito", row.expert],
		["Responsable técnico", row.technician],
		["Área afectada", `${number(row.affectedArea)} m²`],
		["Valor tasado", money(row.appraised)],
		["Monto aprobado", money(row.approved)],
		["Monto pagado", money(row.paid)],
		["Variación", `${row.variation > 0 ? "+" : ""}${row.variation.toFixed(1)}%`]
	] : [];
	return /* @__PURE__ */ jsx(Sheet$1, {
		open: row !== null,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsxs(SheetContent, {
			className: "flex w-full flex-col gap-0 overflow-y-auto bg-card p-0 sm:max-w-lg",
			children: [
				/* @__PURE__ */ jsxs(SheetHeader, {
					className: "border-b border-border px-4 py-3 text-left",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold uppercase text-primary",
							children: "Expediente técnico-legal"
						}),
						/* @__PURE__ */ jsx(SheetTitle, {
							className: "text-xl font-semibold text-primary-dark",
							children: row?.code
						}),
						/* @__PURE__ */ jsx(SheetDescription, {
							className: "text-xs",
							children: "Ficha de valorización y costos del predio"
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
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "rounded-md border border-border p-3",
							children: [
								/* @__PURE__ */ jsx(FileCheck2, {
									size: 16,
									className: "text-success",
									"aria-hidden": true
								}),
								/* @__PURE__ */ jsx("b", {
									className: "mt-2 block text-sm",
									children: "Documentos técnicos"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: "8 completos · 2 observados"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "rounded-md border border-border p-3",
							children: [
								/* @__PURE__ */ jsx(CircleDollarSign, {
									size: 16,
									className: "text-primary-dark",
									"aria-hidden": true
								}),
								/* @__PURE__ */ jsx("b", {
									className: "mt-2 block text-sm",
									children: "Informe de tasación"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: "Versión 03 · Vigente"
								})
							]
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
export { TecnicoTasacionesPage as component };
