import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as SheetDescription, n as Sheet$1, o as SheetHeader, r as SheetContent, s as SheetTitle, t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowDownRight, ArrowUpRight, ChevronRight, Clock3, Download, Eye, FilterX, LandPlot, Search, UserRound, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.cartera-liberacion.tsx?tsr-split=component
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
var defaultFilters = {
	project: "TODOS",
	section: "TODOS",
	sector: "TODOS",
	affectation: "TODAS",
	procedure: "TODOS",
	status: "TODOS",
	owner: "TODOS",
	start: "2026-01-01",
	end: "2026-12-31"
};
var funnelStages = [
	[
		"Identificación",
		1248,
		100,
		4
	],
	[
		"Diagnóstico",
		1176,
		94.2,
		8
	],
	[
		"Empadronamiento",
		1084,
		92.2,
		11
	],
	[
		"Expediente técnico-legal",
		956,
		88.2,
		18
	],
	[
		"Tasación",
		824,
		86.2,
		24
	],
	[
		"Oferta",
		718,
		87.1,
		12
	],
	[
		"Aceptación",
		632,
		88,
		15
	],
	[
		"Pago",
		548,
		86.7,
		21
	],
	[
		"Entrega",
		491,
		89.6,
		9
	],
	[
		"Inscripción",
		427,
		87,
		32
	]
];
var sectionBase = [
	{
		name: "Tramo I · Norte",
		released: 72,
		process: 17,
		pending: 7,
		critical: 4
	},
	{
		name: "Tramo I · Centro",
		released: 61,
		process: 21,
		pending: 12,
		critical: 6
	},
	{
		name: "Tramo II · Norte",
		released: 84,
		process: 10,
		pending: 4,
		critical: 2
	},
	{
		name: "Tramo II · Sur",
		released: 54,
		process: 24,
		pending: 13,
		critical: 9
	},
	{
		name: "Tramo III · Este",
		released: 67,
		process: 19,
		pending: 9,
		critical: 5
	},
	{
		name: "Tramo III · Oeste",
		released: 43,
		process: 26,
		pending: 18,
		critical: 13
	},
	{
		name: "Acceso Norte",
		released: 76,
		process: 14,
		pending: 7,
		critical: 3
	}
];
var procedures = [
	{
		name: "Trato directo ordinario",
		pending: 66,
		process: 128,
		accepted: 94,
		rejected: 21,
		paid: 176,
		closed: 142
	},
	{
		name: "Expropiación",
		pending: 22,
		process: 54,
		accepted: 12,
		rejected: 18,
		paid: 47,
		closed: 39
	},
	{
		name: "Reconocimiento de mejoras",
		pending: 29,
		process: 46,
		accepted: 38,
		rejected: 8,
		paid: 51,
		closed: 42
	},
	{
		name: "Transferencia estatal",
		pending: 17,
		process: 36,
		accepted: 29,
		rejected: 3,
		paid: 22,
		closed: 31
	},
	{
		name: "Ejecución coactiva",
		pending: 11,
		process: 24,
		accepted: 6,
		rejected: 15,
		paid: 18,
		closed: 12
	}
];
var ganttRows = [
	{
		section: "Tramo I",
		activity: "Delimitación del tramo",
		start: 0,
		duration: 18,
		progress: 100,
		delay: 0,
		owner: "M. Salazar"
	},
	{
		section: "Tramo I",
		activity: "Empadronamiento y calificación",
		start: 16,
		duration: 27,
		progress: 100,
		delay: 0,
		owner: "C. Romero"
	},
	{
		section: "Tramo I",
		activity: "Aprobación del padrón y tasaciones",
		start: 41,
		duration: 32,
		progress: 78,
		delay: 6,
		owner: "L. Quispe"
	},
	{
		section: "Tramo I",
		activity: "Liberación",
		start: 70,
		duration: 31,
		progress: 54,
		delay: 9,
		owner: "A. Paredes"
	},
	{
		section: "Tramo I",
		activity: "Inscripción registral",
		start: 99,
		duration: 22,
		progress: 18,
		delay: 0,
		owner: "R. Huamán"
	},
	{
		section: "Tramo II",
		activity: "Delimitación del tramo",
		start: 8,
		duration: 20,
		progress: 100,
		delay: 0,
		owner: "M. Salazar"
	},
	{
		section: "Tramo II",
		activity: "Empadronamiento y calificación",
		start: 26,
		duration: 34,
		progress: 82,
		delay: 12,
		owner: "C. Romero"
	},
	{
		section: "Tramo II",
		activity: "Aprobación del padrón y tasaciones",
		start: 58,
		duration: 30,
		progress: 45,
		delay: 16,
		owner: "L. Quispe"
	},
	{
		section: "Tramo II",
		activity: "Liberación",
		start: 86,
		duration: 35,
		progress: 12,
		delay: 8,
		owner: "A. Paredes"
	},
	{
		section: "Tramo II",
		activity: "Inscripción registral",
		start: 118,
		duration: 20,
		progress: 0,
		delay: 0,
		owner: "R. Huamán"
	}
];
var prediosBase = [
	[
		"PR-001842",
		"María Elena Rojas",
		"Tramo I",
		842.4,
		"Tasación",
		"12/06/2026",
		54,
		"Certificado",
		"Pendiente",
		"No entregado",
		"Anotación preventiva",
		"L. Quispe",
		"Tasación observada"
	],
	[
		"PR-001873",
		"Comunidad San Jerónimo",
		"Tramo II",
		3260.8,
		"Oferta",
		"28/05/2026",
		69,
		"Disponible",
		"Programado",
		"Parcial",
		"En trámite",
		"A. Paredes",
		"Impacta camino crítico"
	],
	[
		"PR-001905",
		"Inversiones del Centro SAC",
		"Tramo III",
		1480.2,
		"Expediente técnico-legal",
		"09/04/2026",
		118,
		"Sin certificación",
		"Bloqueado",
		"No entregado",
		"Pendiente",
		"M. Salazar",
		"Controversia de linderos"
	],
	[
		"PR-001927",
		"Sucesión Flores Huamán",
		"Tramo I",
		615.7,
		"Aceptación",
		"18/06/2026",
		48,
		"Certificado",
		"Aceptado",
		"Por programar",
		"Título observado",
		"C. Romero",
		"Sucesión intestada"
	],
	[
		"PR-001944",
		"Municipalidad Distrital Norte",
		"Acceso Norte",
		5410.6,
		"Transferencia",
		"02/07/2026",
		34,
		"No aplica",
		"No aplica",
		"Parcial",
		"En trámite",
		"R. Huamán",
		"Acuerdo de concejo pendiente"
	],
	[
		"PR-001968",
		"José Antonio Medina",
		"Tramo II",
		392.1,
		"Pago",
		"21/07/2026",
		15,
		"Devengado",
		"Programado",
		"No entregado",
		"Anotación preventiva",
		"A. Paredes",
		"Sin alerta"
	],
	[
		"PR-001991",
		"Agrícola Santa Ana SRL",
		"Tramo III",
		2268.9,
		"Entrega",
		"11/07/2026",
		25,
		"Pagado",
		"Pagado",
		"Acta observada",
		"En trámite",
		"C. Romero",
		"Ocupante precario"
	],
	[
		"PR-002014",
		"Rosa Milagros Chávez",
		"Tramo II",
		729.3,
		"Diagnóstico",
		"17/03/2026",
		141,
		"Por solicitar",
		"Pendiente",
		"No entregado",
		"Sin iniciar",
		"M. Salazar",
		"No ubicada"
	],
	[
		"PR-002037",
		"Consorcio Vial Andino",
		"Tramo III",
		1894.5,
		"Expropiación",
		"05/05/2026",
		92,
		"Certificado",
		"En trámite",
		"No entregado",
		"Bloqueado",
		"L. Quispe",
		"Apelación judicial"
	],
	[
		"PR-002058",
		"Comunidad Campesina Central",
		"Tramo I",
		6840.2,
		"Inscripción",
		"25/06/2026",
		42,
		"Pagado",
		"Pagado",
		"Entregado",
		"Título presentado",
		"R. Huamán",
		"Subsanación registral"
	]
];
var impactBase = [
	[
		"PR-001905",
		118,
		1480,
		"Controversia de linderos",
		"M. Salazar"
	],
	[
		"PR-002014",
		104,
		729,
		"Sujeto pasivo no ubicado",
		"C. Romero"
	],
	[
		"PR-002037",
		92,
		1895,
		"Apelación judicial",
		"L. Quispe"
	],
	[
		"PR-001873",
		69,
		3261,
		"Tasación impugnada",
		"A. Paredes"
	],
	[
		"PR-002081",
		64,
		940,
		"Duplicidad registral",
		"R. Huamán"
	],
	[
		"PR-001927",
		58,
		616,
		"Sucesión intestada",
		"C. Romero"
	],
	[
		"PR-002106",
		52,
		2120,
		"Falta disponibilidad presupuestal",
		"L. Quispe"
	],
	[
		"PR-001842",
		47,
		842,
		"Tasación observada",
		"A. Paredes"
	],
	[
		"PR-002124",
		41,
		515,
		"Ocupante precario",
		"M. Salazar"
	],
	[
		"PR-002143",
		38,
		1280,
		"Rectificación de área",
		"R. Huamán"
	]
];
function number(value, digits = 0) {
	return value.toLocaleString("es-PE", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
var kpiTone = {
	blue: "text-primary-dark",
	green: "text-success",
	amber: "text-warning",
	red: "text-destructive"
};
var paymentTone = (value) => value === "Pagado" ? "success" : value === "Bloqueado" ? "destructive" : "warning";
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
var TR = "h-10 border-t border-border";
var TD = "px-3 py-1.5";
function CarteraLiberacionPage() {
	const [filters, setFilters] = useState(defaultFilters);
	const [search, setSearch] = useState("");
	const [selectedSection, setSelectedSection] = useState(null);
	const [selectedPredio, setSelectedPredio] = useState(null);
	const [updatedAt, setUpdatedAt] = useState("05/08/2026 10:15");
	const scope = useMemo(() => {
		let value = 1;
		if (filters.project !== "TODOS") value *= .46;
		if (filters.section !== "TODOS") value *= .7;
		if (filters.sector !== "TODOS") value *= .82;
		if (filters.affectation !== "TODAS") value *= .76;
		if (filters.procedure !== "TODOS") value *= .68;
		if (filters.status !== "TODOS") value *= .62;
		if (filters.owner !== "TODOS") value *= .54;
		if (selectedSection) value *= .41;
		return value;
	}, [filters, selectedSection]);
	const available = 68.4;
	const cards = [
		{
			label: "Predios identificados",
			value: number(Math.round(1248 * scope)),
			note: "100% de la cartera",
			trend: 3.2,
			color: "blue"
		},
		{
			label: "Predios en proceso",
			value: number(Math.round(621 * scope)),
			note: "49.8% del total",
			trend: -2.1,
			color: "amber"
		},
		{
			label: "Predios pagados",
			value: number(Math.round(548 * scope)),
			note: "43.9% del total",
			trend: 8.3,
			color: "green"
		},
		{
			label: "Predios entregados",
			value: number(Math.round(491 * scope)),
			note: "39.3% del total",
			trend: 6.8,
			color: "green"
		},
		{
			label: "Predios inscritos",
			value: number(Math.round(427 * scope)),
			note: "34.2% del total",
			trend: 5.7,
			color: "blue"
		},
		{
			label: "Área total requerida",
			value: `${number(286.4 * scope, 1)} ha`,
			note: "Área afectada consolidada",
			trend: 1.4,
			color: "blue"
		},
		{
			label: "Área liberada",
			value: `${number(195.9 * scope, 1)} ha`,
			note: "68.4% del área",
			trend: 7.1,
			color: "green"
		},
		{
			label: "Disponibilidad física",
			value: `${available.toFixed(1)}%`,
			note: "Meta del periodo: 75%",
			trend: 4.6,
			color: "amber"
		},
		{
			label: "Predios críticos",
			value: number(Math.max(1, Math.round(37 * scope))),
			note: "Bloquean el avance de obra",
			trend: -11.9,
			color: "red"
		}
	];
	const filteredPredios = prediosBase.filter((row) => {
		const query = search.trim().toLowerCase();
		if (query && !`${row[0]} ${row[1]}`.toLowerCase().includes(query)) return false;
		if (filters.owner !== "TODOS" && row[11] !== filters.owner) return false;
		if (selectedSection && !selectedSection.includes(row[2])) return false;
		return true;
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
		setSelectedSection(null);
	}
	function exportCsv() {
		const header = "codigo,sujeto_pasivo,tramo,area,etapa,dias,estado_pago,estado_entrega,estado_registral,responsable,alerta\n";
		const rows = filteredPredios.map((row) => [
			row[0],
			row[1],
			row[2],
			row[3],
			row[4],
			row[6],
			row[8],
			row[9],
			row[10],
			row[11],
			row[12]
		].map((cell) => `"${cell}"`).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([
			"﻿",
			header,
			rows
		], { type: "text/csv;charset=utf-8" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "cartera_liberacion_predial.csv";
		link.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: LandPlot,
			titulo: "Avance y disponibilidad predial",
			descripcion: "Estado integral de los inmuebles requeridos y su disponibilidad física para la ejecución de obra.",
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
				selectedSection && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => setSelectedSection(null),
					children: [
						"Filtro: ",
						selectedSection,
						" ",
						/* @__PURE__ */ jsx(X, {}),
						" Quitar"
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
					onClick: exportCsv,
					children: [/* @__PURE__ */ jsx(Download, {}), " Exportar CSV"]
				})
			] })
		}),
		/* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-1.5 text-xs text-warning",
			children: "Datos de demostración: las cifras de este tablero no provienen de un servicio."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Alcance de la cartera predial",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: () => setUpdatedAt("05/08/2026 10:37"),
				children: "Actualizar información"
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
						label: "Tipo de afectación",
						value: filters.affectation,
						onChange: (v) => update("affectation", v),
						options: [
							"TODAS",
							"Total",
							"Parcial",
							"Temporal",
							"Servidumbre"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Procedimiento",
						value: filters.procedure,
						onChange: (v) => update("procedure", v),
						options: [
							"TODOS",
							"Trato directo",
							"Expropiación",
							"Transferencia estatal"
						]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado del predio",
						value: filters.status,
						onChange: (v) => update("status", v),
						options: [
							"TODOS",
							"Pendiente",
							"En proceso",
							"Liberado",
							"Crítico",
							...funnelStages.map(([stage]) => stage)
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
			"aria-label": "Indicadores de la cartera",
			children: cards.map((card) => /* @__PURE__ */ jsx(KpiCard, { ...card }, card.label))
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid gap-4 2xl:grid-cols-[.9fr_1.1fr]",
			"aria-label": "Embudo y disponibilidad",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Embudo de maduración predial",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: "Muestra cuántos predios llegan a cada etapa, qué porcentaje continúa desde la etapa anterior y cuánto tiempo permanecen allí. Seleccione una etapa para filtrar por estado."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "space-y-1.5 py-1",
						children: funnelStages.map(([stage, count, conversion, days], index) => {
							const scaled = Math.round(count * scope);
							return /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => update("status", stage),
								className: "mx-auto grid min-h-8 grid-cols-[1fr_auto] items-center rounded-md bg-primary px-3 text-left text-primary-foreground hover:brightness-95",
								style: {
									width: `${100 - index * 5.2}%`,
									opacity: 1 - index * .055
								},
								children: [/* @__PURE__ */ jsx("span", {
									className: "truncate text-xs font-semibold",
									children: stage
								}), /* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-2 text-xs",
									children: [
										/* @__PURE__ */ jsxs("b", { children: [number(scaled), " predios"] }),
										/* @__PURE__ */ jsx("i", {
											className: "h-3 w-px bg-primary-foreground/40",
											"aria-hidden": true
										}),
										conversion,
										"%",
										/* @__PURE__ */ jsx("i", {
											className: "h-3 w-px bg-primary-foreground/40",
											"aria-hidden": true
										}),
										days,
										" días"
									]
								})]
							}, stage);
						})
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-2 flex justify-center gap-4 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("span", { children: "Cantidad" }),
							/* @__PURE__ */ jsx("span", { children: "% respecto a etapa anterior" }),
							/* @__PURE__ */ jsx("span", { children: "Tiempo promedio" })
						]
					})
				]
			}), /* @__PURE__ */ jsxs(Section, {
				titulo: "Disponibilidad por tramo y sector",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Cada barra compara la proporción de predios liberados, en proceso, pendientes y críticos por tramo o sector. Seleccione una para filtrar."
				}), /* @__PURE__ */ jsx(ResponsiveContainer, {
					width: "100%",
					height: 382,
					children: /* @__PURE__ */ jsxs(BarChart, {
						data: sectionBase,
						layout: "vertical",
						margin: {
							left: 20,
							right: 18,
							top: 8
						},
						onClick: (state) => {
							const label = state?.activeLabel;
							if (typeof label === "string") setSelectedSection((current) => current === label ? null : label);
						},
						children: [
							/* @__PURE__ */ jsx(CartesianGrid, {
								stroke: C.border,
								strokeDasharray: "3 3",
								horizontal: false
							}),
							/* @__PURE__ */ jsx(XAxis, {
								type: "number",
								domain: [0, 100],
								tickFormatter: (v) => `${v}%`,
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(YAxis, {
								type: "category",
								dataKey: "name",
								width: 120,
								tick: TICK,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ jsx(Tooltip, { formatter: (value) => `${value}%` }),
							/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "released",
								name: "Liberados",
								stackId: "a",
								fill: C.dark,
								cursor: "pointer"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "process",
								name: "En proceso",
								stackId: "a",
								fill: C.primary,
								fillOpacity: .6,
								cursor: "pointer"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "pending",
								name: "Pendiente documental",
								stackId: "a",
								fill: C.highlight,
								cursor: "pointer"
							}),
							/* @__PURE__ */ jsx(Bar, {
								dataKey: "critical",
								name: "Críticos",
								stackId: "a",
								fill: C.primary,
								radius: [
									0,
									3,
									3,
									0
								],
								cursor: "pointer",
								children: sectionBase.map((row) => /* @__PURE__ */ jsx(Cell, { opacity: selectedSection && selectedSection !== row.name ? .35 : 1 }, row.name))
							})
						]
					})
				})]
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Cronograma de disponibilidad de áreas",
			className: "mb-4",
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Ubica las actividades en el calendario y permite comparar fecha programada, avance real, días de retraso y responsable."
			}), /* @__PURE__ */ jsx(Gantt, { rows: ganttRows.filter((row) => !selectedSection || selectedSection.includes(row.section)) })]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Cartera por procedimiento y estado",
			className: "mb-4",
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Compara cuántos predios están pendientes, en trámite, aceptados, rechazados, pagados o cerrados para cada procedimiento."
			}), /* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 315,
				children: /* @__PURE__ */ jsxs(BarChart, {
					data: procedures.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, typeof value === "number" ? Math.round(value * scope) : value]))),
					margin: {
						left: 8,
						right: 14,
						top: 10
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
						/* @__PURE__ */ jsx(Tooltip, {}),
						/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "pending",
							name: "Pendiente",
							stackId: "a",
							fill: C.border
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "process",
							name: "En trámite",
							stackId: "a",
							fill: C.muted
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "accepted",
							name: "Aceptado",
							stackId: "a",
							fill: C.primary,
							fillOpacity: .5
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "rejected",
							name: "Rechazado",
							stackId: "a",
							fill: C.primary
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "paid",
							name: "Pagado",
							stackId: "a",
							fill: C.highlight
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "closed",
							name: "Cerrado",
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
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Tabla operativa de predios",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs("label", {
				className: "relative block",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "sr-only",
						children: "Buscar código o sujeto pasivo"
					}),
					/* @__PURE__ */ jsx(Search, {
						size: 16,
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("input", {
						type: "search",
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: "Buscar código o sujeto pasivo",
						className: `${controlClase} w-72 pl-9`
					})
				]
			}),
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Seguimiento de permanencia, pago, entrega, registro y alertas."
			}), /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[1520px] text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
						"Código",
						"Sujeto pasivo",
						"Tramo",
						"Área afectada",
						"Etapa actual",
						"Ingreso a etapa",
						"Días",
						"Estado presupuestal",
						"Estado de pago",
						"Estado de entrega",
						"Estado registral",
						"Responsable",
						"Alerta",
						"Acciones"
					].map((head) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: `${TH} ${head === "Acciones" ? "text-right" : ""}`,
						children: head
					}, head)) }) }), /* @__PURE__ */ jsxs("tbody", {
						className: "[&>tr:nth-child(even)]:bg-background",
						children: [!filteredPredios.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 14,
							className: "px-3 py-6 text-center text-sm text-muted-foreground",
							children: "No se encontraron predios con los filtros seleccionados."
						}) }), filteredPredios.map((row) => /* @__PURE__ */ jsxs("tr", {
							className: `${TR} hover:bg-primary-soft/40`,
							children: [
								/* @__PURE__ */ jsx("td", {
									className: `${TD} font-semibold text-primary-dark`,
									children: row[0]
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} max-w-52 truncate font-medium`,
									children: row[1]
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: row[2]
								}),
								/* @__PURE__ */ jsxs("td", {
									className: `${TD} tabular-nums`,
									children: [number(row[3], 1), " m²"]
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: /* @__PURE__ */ jsx(StatusBadge, {
										tono: "primary",
										children: row[4]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: row[5]
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} font-bold tabular-nums ${row[6] > 60 ? "text-destructive" : row[6] > 30 ? "text-warning" : "text-success"}`,
									children: row[6]
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: row[7]
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: /* @__PURE__ */ jsx(StatusBadge, {
										tono: paymentTone(row[8]),
										children: row[8]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: row[9]
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: row[10]
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(UserRound, {
											size: 14,
											"aria-hidden": true
										}), row[11]]
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} font-medium ${row[12] === "Sin alerta" ? "text-success" : "text-destructive"}`,
									children: row[12]
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} text-right`,
									children: /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => setSelectedPredio(row),
										title: "Abrir ficha individual",
										children: [/* @__PURE__ */ jsx(Eye, {}), " Abrir ficha"]
									})
								})
							]
						}, row[0]))]
					})]
				})
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "grid gap-4 xl:grid-cols-[.7fr_1.3fr]",
			"aria-label": "Disponibilidad global e impacto",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Disponibilidad predial global",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Resume qué porcentaje del área requerida ya puede ser ocupado por la obra; un valor bajo indica restricciones físicas pendientes."
				}), /* @__PURE__ */ jsx(GaugeChart, { value: available })]
			}), /* @__PURE__ */ jsxs(Section, {
				titulo: "Top 10 · Mayor impacto en el cronograma",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Ordena los predios según su impacto en el cronograma y muestra retraso, área afectada, causa y responsable de la siguiente acción."
				}), /* @__PURE__ */ jsx("div", {
					className: "max-h-[370px] overflow-auto rounded-md border border-border",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "sticky top-0",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: TH,
									children: "N.° / Predio"
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: TH,
									children: "Días de retraso"
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: TH,
									children: "Área bloqueada"
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: TH,
									children: "Causa"
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: TH,
									children: "Responsable siguiente acción"
								}),
								/* @__PURE__ */ jsx("th", {
									scope: "col",
									className: `${TH} text-right`,
									children: "Acciones"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "[&>tr:nth-child(even)]:bg-background",
							children: impactBase.map(([code, days, area, cause, owner], index) => /* @__PURE__ */ jsxs("tr", {
								className: TR,
								children: [
									/* @__PURE__ */ jsxs("td", {
										className: `${TD} font-semibold`,
										children: [
											/* @__PURE__ */ jsx(StatusBadge, {
												tono: "destructive",
												children: index + 1
											}),
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "ml-1",
												children: code
											})
										]
									}),
									/* @__PURE__ */ jsxs("td", {
										className: `${TD} font-bold tabular-nums text-destructive`,
										children: [days, " días"]
									}),
									/* @__PURE__ */ jsxs("td", {
										className: `${TD} tabular-nums`,
										children: [number(area), " m²"]
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: cause
									}),
									/* @__PURE__ */ jsx("td", {
										className: TD,
										children: /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ jsx(UserRound, {
												size: 14,
												"aria-hidden": true
											}), owner]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: `${TD} text-right`,
										children: /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => {
												const match = prediosBase.find((row) => row[0] === code);
												if (match) setSelectedPredio(match);
											},
											disabled: !prediosBase.some((row) => row[0] === code),
											title: prediosBase.some((row) => row[0] === code) ? "Abrir ficha individual" : "Sin ficha en la tabla operativa",
											children: ["Abrir ficha ", /* @__PURE__ */ jsx(ChevronRight, {})]
										})
									})
								]
							}, code))
						})]
					})
				})]
			})]
		}),
		/* @__PURE__ */ jsx(PredioDrawer, {
			row: selectedPredio,
			onClose: () => setSelectedPredio(null)
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
				className: `mt-1 text-lg font-semibold tabular-nums ${kpiTone[color]}`,
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
function Gantt({ rows }) {
	const colors = {
		"Delimitación del tramo": C.muted,
		"Empadronamiento y calificación": C.primary,
		"Aprobación del padrón y tasaciones": C.dark,
		Liberación: C.primary,
		"Inscripción registral": C.highlight
	};
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ jsxs("div", {
			className: "min-w-[1180px]",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-[280px_1fr_185px] border-b border-border pb-2 text-xs font-semibold uppercase text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx("div", { children: "Tramo / actividad" }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-6 text-center",
							children: [
								/* @__PURE__ */ jsx("span", { children: "Ene" }),
								/* @__PURE__ */ jsx("span", { children: "Feb" }),
								/* @__PURE__ */ jsx("span", { children: "Mar" }),
								/* @__PURE__ */ jsx("span", { children: "Abr" }),
								/* @__PURE__ */ jsx("span", { children: "May" }),
								/* @__PURE__ */ jsx("span", { children: "Jun" })
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "pl-3",
							children: "Avance / responsable"
						})
					]
				}),
				rows.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: "Sin actividades para el tramo seleccionado."
				}),
				rows.map((row) => /* @__PURE__ */ jsxs("div", {
					className: "grid min-h-10 grid-cols-[280px_1fr_185px] items-center border-b border-border py-1.5 text-sm",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("b", {
								className: "w-16 text-primary-dark",
								children: row.section
							}), /* @__PURE__ */ jsx("span", { children: row.activity })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative h-7 rounded-sm bg-muted",
							style: {
								backgroundImage: "linear-gradient(90deg, transparent calc(16.66% - 1px), var(--color-border) 16.66%)",
								backgroundSize: "16.66% 100%"
							},
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute top-1 h-5 overflow-hidden rounded-sm border bg-card",
								style: {
									left: `${row.start / 140 * 100}%`,
									width: `${row.duration / 140 * 100}%`,
									borderColor: colors[row.activity]
								},
								role: "progressbar",
								"aria-valuenow": row.progress,
								"aria-valuemin": 0,
								"aria-valuemax": 100,
								"aria-label": `${row.section}: ${row.activity}`,
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full",
									style: {
										width: `${row.progress}%`,
										background: colors[row.activity]
									}
								})
							}), row.delay > 0 && /* @__PURE__ */ jsxs("span", {
								className: "absolute -top-1 text-xs font-bold text-destructive",
								style: { left: `${Math.min(94, (row.start + row.duration) / 140 * 100)}%` },
								children: [
									"+",
									row.delay,
									" d"
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-2 pl-3",
							children: [/* @__PURE__ */ jsxs("span", {
								className: `font-bold tabular-nums ${row.progress < 50 ? "text-warning" : "text-success"}`,
								children: [row.progress, "%"]
							}), /* @__PURE__ */ jsx("span", {
								className: "truncate text-muted-foreground",
								children: row.owner
							})]
						})
					]
				}, `${row.section}-${row.activity}`))
			]
		})
	});
}
function GaugeChart({ value }) {
	const data = [{ value }, { value: 100 - value }];
	const estado = value >= 75 ? {
		tono: "success",
		texto: "Meta alcanzada (75% o más)"
	} : value >= 60 ? {
		tono: "warning",
		texto: "En riesgo (60% a 75%)"
	} : {
		tono: "destructive",
		texto: "Crítico (menos de 60%)"
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative mx-auto max-w-md",
		children: [
			/* @__PURE__ */ jsx(ResponsiveContainer, {
				width: "100%",
				height: 245,
				children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsxs(Pie, {
					data,
					dataKey: "value",
					startAngle: 180,
					endAngle: 0,
					cx: "50%",
					cy: "78%",
					innerRadius: 75,
					outerRadius: 108,
					stroke: "none",
					children: [/* @__PURE__ */ jsx(Cell, { fill: C.primary }), /* @__PURE__ */ jsx(Cell, { fill: C.border })]
				}) })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute inset-x-0 bottom-9 text-center",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-2xl font-bold tabular-nums text-foreground",
					children: [value.toFixed(1), "%"]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs uppercase text-muted-foreground",
					children: "Disponibilidad global"
				})]
			}),
			/* @__PURE__ */ jsx("span", {
				className: "absolute bottom-4 left-[16%] text-xs text-muted-foreground",
				children: "0%"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "absolute bottom-4 right-[16%] text-xs text-muted-foreground",
				children: "100%"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-[-16px] flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx(StatusBadge, {
					tono: estado.tono,
					children: estado.texto
				}), /* @__PURE__ */ jsx("span", { children: "Umbrales: crítico < 60%, en riesgo 60% a 75%, meta 75% o más." })]
			})
		]
	});
}
function PredioDrawer({ row, onClose }) {
	const fields = row ? [
		["Sujeto pasivo", row[1]],
		["Tramo", row[2]],
		["Área afectada", `${number(row[3], 1)} m²`],
		["Etapa actual", row[4]],
		["Ingreso a etapa", row[5]],
		["Días transcurridos", `${row[6]} días`],
		["Estado presupuestal", row[7]],
		["Estado de pago", row[8]],
		["Estado de entrega", row[9]],
		["Estado registral", row[10]],
		["Responsable", row[11]]
	] : [];
	return /* @__PURE__ */ jsx(Sheet$1, {
		open: row !== null,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsx(SheetContent, {
			className: "flex w-full flex-col gap-0 overflow-y-auto bg-card p-0 sm:max-w-md",
			children: row && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs(SheetHeader, {
					className: "border-b border-border px-4 py-4 text-left",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold uppercase text-primary-dark",
							children: "Ficha individual del predio"
						}),
						/* @__PURE__ */ jsx(SheetTitle, {
							className: "text-xl font-semibold text-foreground",
							children: row[0]
						}),
						/* @__PURE__ */ jsx(SheetDescription, {
							className: "text-xs",
							children: "Trazabilidad técnico-legal, presupuestal y registral."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 overflow-auto px-4 py-4",
					children: [
						/* @__PURE__ */ jsxs("p", {
							role: "status",
							className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${row[12] === "Sin alerta" ? "border-success bg-success-soft text-success" : "border-destructive bg-destructive-soft text-destructive"}`,
							children: [/* @__PURE__ */ jsx(AlertTriangle, {
								size: 16,
								className: "mt-0.5 shrink-0",
								"aria-hidden": true
							}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("b", {
								className: "block text-xs uppercase",
								children: "Alerta operativa"
							}), row[12]] })]
						}),
						/* @__PURE__ */ jsx("dl", {
							className: "rounded-md border border-border",
							children: fields.map(([label, value]) => /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-[150px_1fr] gap-2 border-b border-border px-3 py-2 text-sm last:border-0",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "text-muted-foreground",
									children: label
								}), /* @__PURE__ */ jsx("dd", {
									className: "font-semibold text-foreground",
									children: value
								})]
							}, label))
						}),
						/* @__PURE__ */ jsx(Subtitulo, { children: "Hitos recientes" }),
						/* @__PURE__ */ jsx("ol", {
							className: "space-y-3 border-l-2 border-border pl-4",
							children: [
								"Expediente actualizado y validado",
								"Control de calidad técnico-legal",
								"Asignación de responsable",
								"Ingreso a la etapa actual"
							].map((item, index) => /* @__PURE__ */ jsxs("li", {
								className: "relative text-sm",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: `absolute -left-[21px] top-1.5 size-2.5 rounded-sm ${index === 0 ? "bg-success" : "bg-border"}`,
										"aria-hidden": true
									}),
									/* @__PURE__ */ jsx("b", { children: item }),
									/* @__PURE__ */ jsxs("p", {
										className: "text-xs text-muted-foreground",
										children: [5 + index * 8, "/07/2026 · Sistema de Gestión Predial"]
									})
								]
							}, item))
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 border-t border-border px-4 py-3",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: onClose,
						children: "Cerrar ficha"
					}), /* @__PURE__ */ jsx(Button, {
						type: "button",
						disabled: true,
						title: "Próximamente",
						children: "Abrir expediente (próximamente)"
					})]
				})
			] })
		})
	});
}
//#endregion
export { CarteraLiberacionPage as component };
