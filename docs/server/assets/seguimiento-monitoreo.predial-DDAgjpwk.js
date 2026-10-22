import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as ChartExplanation } from "./ChartExplanation-0Z95AIWE.js";
import { useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Gauge, ListChecks, RotateCcw, Target } from "lucide-react";
//#region src/routes/seguimiento-monitoreo.predial.tsx?tsr-split=component
var initialFilters = {
	team: "Todos",
	city: "Todos",
	legal: "Todos",
	technical: "Todos",
	period: "Mayo de 2026"
};
var filterDefinitions = [
	{
		key: "team",
		label: "Equipo responsable",
		options: [
			"Todos",
			"G01",
			"G02",
			"G03"
		]
	},
	{
		key: "city",
		label: "Proyecto o ciudad",
		options: [
			"Todos",
			"Jauja",
			"Piura",
			"Tacna"
		]
	},
	{
		key: "legal",
		label: "Responsable legal",
		options: [
			"Todos",
			"Katherine Silva",
			"Evelyn Phillips",
			"Joana Elias",
			"Juan Carlos Evangelista"
		]
	},
	{
		key: "technical",
		label: "Responsable técnico",
		options: [
			"Todos",
			"Raúl Cárdenas",
			"Carola Gómez",
			"Jorge Huamán",
			"Milton Solórzano"
		]
	},
	{
		key: "period",
		label: "Periodo de análisis",
		options: [
			"Todos los periodos",
			"Abril de 2026",
			"Mayo de 2026",
			"Junio de 2026"
		]
	}
];
var teamProfiles = {
	G01: {
		city: "Jauja",
		periods: ["Abril de 2026", "Mayo de 2026"],
		legal: ["Katherine Silva", "Evelyn Phillips"],
		technical: ["Raúl Cárdenas", "Carola Gómez"]
	},
	G02: {
		city: "Piura",
		periods: ["Mayo de 2026", "Junio de 2026"],
		legal: ["Joana Elias", "Juan Carlos Evangelista"],
		technical: ["Jorge Huamán", "Milton Solórzano"]
	},
	G03: {
		city: "Tacna",
		periods: ["Mayo de 2026"],
		legal: [],
		technical: []
	}
};
var metas = [
	{
		title: "Meta presupuestal aprobada",
		amount: "S/ 6.126.229,31",
		percent: 105,
		advance: "S/ 6.410.614",
		diff: "S/ 284.384",
		tone: "green"
	},
	{
		title: "Meta de gestión del sector",
		amount: "S/ 13.000.000,00",
		percent: 49,
		advance: "S/ 6.410.614",
		diff: "- S/ 6.589.386",
		tone: "red"
	},
	{
		title: "Monto planificado",
		amount: "S/ 15.526.277,23",
		percent: 41,
		advance: "S/ 6.410.614",
		diff: "- S/ 9.115.664",
		tone: "red"
	},
	{
		title: "Monto en trámite",
		amount: "S/ 9.767.652,07",
		percent: 66,
		advance: "S/ 6.410.614",
		diff: "- S/ 3.357.038",
		tone: "red"
	}
];
var brigadas = [
	[
		"G01",
		"15",
		"S/ 4.099.601,00",
		"S/ 4.087.318,00",
		"100%"
	],
	[
		"G02",
		"18",
		"S/ 1.900.000,00",
		"S/ 1.190.795,00",
		"63%"
	],
	[
		"G03",
		"0",
		"S/ 126.628,00",
		"S/ 0,00",
		"0%"
	]
];
var ejecucion = [
	[
		"G01",
		"S/ 4.099.601",
		"S/ 5.908.932",
		"- S/ 1.809.331",
		"S/ 5.218.915",
		"S/ 689.113",
		"127%"
	],
	[
		"G02",
		"S/ 1.900.000",
		"S/ 3.858.720",
		"S/ 1.958.720",
		"S/ 1.190.795",
		"S/ 2.667.925",
		"63%"
	],
	[
		"G03",
		"S/ 126.628",
		"S/ 0",
		"- S/ 126.628",
		"S/ 0",
		"S/ 126.628",
		"0%"
	]
];
var responsables = [
	[
		"KATHERINE SILVA",
		"S/ 5.460.448,00",
		"3"
	],
	[
		"EVELYN PHILLIPS",
		"S/ 0,00",
		"1"
	],
	[
		"JOANA ELIAS",
		"S/ 525.472,00",
		"1"
	],
	[
		"JUAN CARLOS EVANGELISTA",
		"S/ 702.122,00",
		"1"
	]
];
var tecnicos = [
	[
		"RAUL CARDENAS",
		"S/ 409.536,00",
		"3"
	],
	[
		"CAROLA GOMEZ",
		"S/ 0,00",
		"1"
	],
	[
		"JORGE HUAMAN",
		"S/ 4.708.185,00",
		"1"
	],
	[
		"MILTON SOLORZANO",
		"S/ 218.123,00",
		"1"
	]
];
var programacion = [
	[
		"G01",
		"11",
		"9",
		"2",
		"82%"
	],
	[
		"G02",
		"25",
		"12",
		"13",
		"48%"
	],
	[
		"G03",
		"0",
		"0",
		"0",
		"0%"
	]
];
var tramitologia = [
	[
		"EXPROPIACION",
		"15",
		"9",
		"6",
		"60%"
	],
	[
		"TRATO DIRECTO",
		"12",
		"8",
		"4",
		"67%"
	],
	[
		"TRANSFERENCIA INTERESTATAL",
		"9",
		"4",
		"5",
		"44%"
	]
];
function MonitoreoPredialPage() {
	const [selectedFilters, setSelectedFilters] = useState(initialFilters);
	const [showDetails, setShowDetails] = useState(false);
	const progressRef = useRef(null);
	const detailRef = useRef(null);
	const visibleTeams = useMemo(() => Object.keys(teamProfiles).filter((team) => {
		const profile = teamProfiles[team];
		return (selectedFilters.team === "Todos" || selectedFilters.team === team) && (selectedFilters.city === "Todos" || selectedFilters.city === profile.city) && (selectedFilters.period === "Todos los periodos" || profile.periods.some((period) => period === selectedFilters.period)) && (selectedFilters.legal === "Todos" || profile.legal.some((name) => name === selectedFilters.legal)) && (selectedFilters.technical === "Todos" || profile.technical.some((name) => name === selectedFilters.technical));
	}), [selectedFilters]);
	const filteredBrigadas = brigadas.filter((row) => visibleTeams.some((team) => team === row[0]));
	const filteredEjecucion = ejecucion.filter((row) => visibleTeams.some((team) => team === row[0]));
	const filteredProgramacion = programacion.filter((row) => visibleTeams.some((team) => team === row[0]));
	const filteredResponsables = responsables.filter((row) => visibleTeams.some((team) => teamProfiles[team].legal.some((name) => normalizeName(name) === normalizeName(row[0]))));
	const filteredTecnicos = tecnicos.filter((row) => visibleTeams.some((team) => teamProfiles[team].technical.some((name) => normalizeName(name) === normalizeName(row[0]))));
	const totals = buildDashboardTotals(filteredBrigadas, filteredEjecucion, filteredProgramacion);
	const activeFilterCount = Object.entries(selectedFilters).filter(([key, value]) => key !== "period" && value !== "Todos").length;
	const updateFilter = (key, value) => {
		setSelectedFilters((current) => ({
			...current,
			[key]: value
		}));
	};
	const resetFilters = () => setSelectedFilters(initialFilters);
	const openProgress = () => {
		progressRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	const toggleDetails = () => {
		const opening = !showDetails;
		setShowDetails(opening);
		if (opening) window.setTimeout(() => detailRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		}), 50);
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Target,
			titulo: "Metas y ejecución predial",
			descripcion: "Compara los predios y montos programados con lo aprobado y devengado por cada equipo responsable. Última actualización: 08 jun 2026 · 15:18.",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: toggleDetails,
				"aria-expanded": showDetails,
				children: [
					/* @__PURE__ */ jsx(ListChecks, {}),
					" ",
					showDetails ? "Ocultar detalle de datos" : "Ver detalle de datos"
				]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: openProgress,
				children: [/* @__PURE__ */ jsx(Gauge, {}), " Ver avance de metas"]
			})] })
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
				onClick: resetFilters,
				title: activeFilterCount > 0 ? `Restablecer ${activeFilterCount} filtros` : "Sin filtros activos",
				children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Restablecer filtros"]
			}),
			children: [
				/* @__PURE__ */ jsx(ChartExplanation, { children: "Revise primero la meta vigente, luego el monto devengado y finalmente los equipos o procedimientos que mantienen saldo pendiente." }),
				/* @__PURE__ */ jsx("div", {
					className: "mt-3 grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5",
					children: filterDefinitions.map(({ key, label, options }) => /* @__PURE__ */ jsxs("label", {
						className: "block min-w-0",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block text-xs font-medium text-foreground",
							children: label
						}), /* @__PURE__ */ jsx("select", {
							value: selectedFilters[key],
							onChange: (event) => updateFilter(key, event.target.value),
							className: controlClase,
							children: options.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
						})]
					}, label))
				}),
				activeFilterCount > 0 && /* @__PURE__ */ jsxs("p", {
					role: "status",
					className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
					children: ["Filtros aplicados:", filterDefinitions.filter(({ key }) => key !== "period" && selectedFilters[key] !== "Todos").map(({ key, label }) => /* @__PURE__ */ jsxs(StatusBadge, {
						tono: "primary",
						children: [
							label,
							": ",
							selectedFilters[key]
						]
					}, key))]
				})
			]
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Indicadores del periodo",
			className: "mb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ jsx(Kpi, {
						label: "Predios previstos (plan anual)",
						value: totals.programmedPredios
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Monto previsto (plan anual)",
						value: totals.programmedAmount
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Predios ejecutados (meta vigente)",
						value: totals.executedPredios
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Monto devengado",
						value: totals.devengado
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Monto aprobado para adquisición",
						value: totals.approvedAmount
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Predios pendientes para la meta",
						value: totals.pendingPredios
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Aprobados el mes anterior",
						value: totals.previousApproved
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Meta del mes",
						value: totals.executedPredios
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Aprobados este mes",
						value: totals.executedPredios
					})
				]
			})
		}),
		visibleTeams.length > 0 && /* @__PURE__ */ jsx("div", {
			ref: progressRef,
			className: "scroll-mt-4",
			children: /* @__PURE__ */ jsxs(Section, {
				titulo: "Cumplimiento de metas monetarias",
				className: "mb-4",
				acciones: /* @__PURE__ */ jsxs("span", {
					className: "text-xs text-muted-foreground",
					children: ["Periodo: ", selectedFilters.period]
				}),
				children: [/* @__PURE__ */ jsx(ChartExplanation, { children: "El porcentaje compara el monto devengado con cada referencia institucional." }), /* @__PURE__ */ jsx("div", {
					className: "mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4",
					children: metas.map((meta) => /* @__PURE__ */ jsx(MetaCard, { ...meta }, meta.title))
				})]
			})
		}),
		visibleTeams.length === 0 && /* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-sm text-warning",
			children: "No existen datos para la combinación seleccionada. Restablezca los filtros o elija otro equipo responsable."
		}),
		showDetails && visibleTeams.length > 0 && /* @__PURE__ */ jsxs("div", {
			ref: detailRef,
			className: "scroll-mt-4 grid gap-4 xl:grid-cols-2",
			children: [
				/* @__PURE__ */ jsx(DataCard, {
					title: "Predios asignados por equipo",
					children: /* @__PURE__ */ jsx(MiniTable, {
						head: [
							"Equipo",
							"Predios",
							"Monto programado",
							"Monto devengado",
							"% Avance"
						],
						rows: filteredBrigadas,
						total: buildBrigadaTotal(filteredBrigadas)
					})
				}),
				/* @__PURE__ */ jsx(DataCard, {
					title: "Ejecución presupuestal por equipo",
					children: /* @__PURE__ */ jsx(MiniTable, {
						head: [
							"Equipo",
							"Monto planificado",
							"Monto tramitado",
							"Diferencia",
							"Devengado",
							"Por devengar",
							"% Avance"
						],
						rows: filteredEjecucion,
						total: buildExecutionTotal(filteredEjecucion)
					})
				}),
				/* @__PURE__ */ jsx(DataCard, {
					title: "Carga del responsable legal",
					children: /* @__PURE__ */ jsx(MiniTable, {
						head: [
							"Responsable legal",
							"Monto devengado",
							"Predios aprobados"
						],
						rows: filteredResponsables,
						total: buildResponsibleTotal(filteredResponsables)
					})
				}),
				/* @__PURE__ */ jsx(DataCard, {
					title: "Carga del responsable técnico",
					children: /* @__PURE__ */ jsx(MiniTable, {
						head: [
							"Responsable técnico",
							"Monto devengado",
							"Predios aprobados"
						],
						rows: filteredTecnicos,
						total: buildResponsibleTotal(filteredTecnicos)
					})
				}),
				/* @__PURE__ */ jsx(DataCard, {
					title: "Programación anual",
					children: /* @__PURE__ */ jsx(MiniTable, {
						head: [
							"Equipo",
							"Programado",
							"Ejecutado",
							"Pendiente",
							"% Avance"
						],
						rows: filteredProgramacion,
						total: buildProgrammingTotal(filteredProgramacion)
					})
				}),
				/* @__PURE__ */ jsx(DataCard, {
					title: "Programación por etapa",
					children: /* @__PURE__ */ jsx(MiniTable, {
						head: [
							"Procedimiento",
							"Programado",
							"Ejecutado",
							"Pendiente",
							"% Avance"
						],
						rows: tramitologia,
						total: [
							"Total",
							"36",
							"21",
							"15",
							"58%"
						]
					})
				})
			]
		})
	] });
}
function Kpi({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-1 text-lg font-semibold tabular-nums text-foreground",
			children: value
		})]
	});
}
function MetaCard({ title, amount, percent, advance, diff, tone }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx(Target, {
						size: 16,
						className: "shrink-0 text-primary",
						"aria-hidden": true
					}),
					" ",
					title
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-1 text-lg font-semibold tabular-nums text-foreground",
				children: amount
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex items-center gap-3",
				children: [/* @__PURE__ */ jsx("div", {
					className: "h-2 flex-1 overflow-hidden rounded-sm bg-muted",
					"aria-hidden": true,
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full bg-primary",
						style: { width: `${Math.min(percent, 100)}%` }
					})
				}), /* @__PURE__ */ jsxs("span", {
					className: `text-sm font-semibold tabular-nums ${toneClass(tone)}`,
					children: [percent, "%"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 text-sm",
				children: [
					/* @__PURE__ */ jsx(InfoRow, {
						label: "Devengado",
						value: advance
					}),
					/* @__PURE__ */ jsx(InfoRow, {
						label: "Saldo",
						value: diff,
						tone
					}),
					/* @__PURE__ */ jsx(InfoRow, {
						label: "Cumplimiento",
						value: `${percent}%`,
						tone
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Monto devengado respecto de esta referencia"
			})
		]
	});
}
function toneClass(tone) {
	return tone === "green" ? "text-success" : tone === "red" ? "text-destructive" : "text-foreground";
}
function InfoRow({ label, value, tone = "gray" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-[6rem_1fr] border-b border-border py-1 last:border-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: `text-right font-semibold tabular-nums ${toneClass(tone)}`,
			children: value
		})]
	});
}
function normalizeName(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
}
function parseMoney(value) {
	const negative = value.includes("-");
	const numeric = Number(value.replace(/[^\d,.]/g, "").replace(/\./g, "").replace(",", "."));
	return negative ? -numeric : numeric;
}
function formatMoney(value) {
	return `S/ ${new Intl.NumberFormat("es-PE", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value)}`;
}
function sumColumn(rows, index, parser = Number) {
	return rows.reduce((total, row) => total + (parser(row[index]) || 0), 0);
}
function percent(numerator, denominator) {
	return denominator > 0 ? `${Math.round(numerator / denominator * 100)}%` : "0%";
}
function buildDashboardTotals(teamRows, executionRows, programmingRows) {
	const programmedAmount = sumColumn(teamRows, 2, parseMoney);
	const devengado = sumColumn(teamRows, 3, parseMoney);
	const approvedAmount = sumColumn(executionRows, 2, parseMoney);
	const programmedPredios = sumColumn(programmingRows, 1);
	const executedPredios = sumColumn(programmingRows, 2);
	const pendingPredios = sumColumn(programmingRows, 3);
	return {
		programmedAmount: formatMoney(programmedAmount),
		devengado: formatMoney(devengado),
		approvedAmount: formatMoney(approvedAmount),
		programmedPredios: String(programmedPredios),
		executedPredios: String(executedPredios),
		pendingPredios: String(pendingPredios),
		previousApproved: String(Math.max(executedPredios - 1, 0))
	};
}
function buildBrigadaTotal(rows) {
	const predios = sumColumn(rows, 1);
	const programmed = sumColumn(rows, 2, parseMoney);
	const devengado = sumColumn(rows, 3, parseMoney);
	return [
		"Total",
		String(predios),
		formatMoney(programmed),
		formatMoney(devengado),
		percent(devengado, programmed)
	];
}
function buildExecutionTotal(rows) {
	const planned = sumColumn(rows, 1, parseMoney);
	const processed = sumColumn(rows, 2, parseMoney);
	const devengado = sumColumn(rows, 4, parseMoney);
	return [
		"Total",
		formatMoney(planned),
		formatMoney(processed),
		formatMoney(processed - planned),
		formatMoney(devengado),
		formatMoney(Math.max(processed - devengado, 0)),
		percent(devengado, planned)
	];
}
function buildResponsibleTotal(rows) {
	return [
		"Total",
		formatMoney(sumColumn(rows, 1, parseMoney)),
		String(sumColumn(rows, 2))
	];
}
function buildProgrammingTotal(rows) {
	const programmed = sumColumn(rows, 1);
	const executed = sumColumn(rows, 2);
	const pending = sumColumn(rows, 3);
	return [
		"Total",
		String(programmed),
		String(executed),
		String(pending),
		percent(executed, programmed)
	];
}
var dataCardExplanations = {
	"Predios asignados por equipo": "Compara la meta, los predios atendidos y el saldo pendiente de cada equipo de trabajo.",
	"Ejecución presupuestal por equipo": "Compara lo programado con lo devengado y muestra la diferencia que todavía debe ejecutarse.",
	"Carga del responsable legal": "Muestra cuántos predios tiene asignados cada especialista legal y cuánto ha avanzado.",
	"Carga del responsable técnico": "Muestra cuántos predios tiene asignados cada especialista técnico y cuánto ha avanzado.",
	"Programación anual": "Resume la cantidad prevista, ejecutada y pendiente dentro de la programación del año.",
	"Programación por etapa": "Distribuye la carga operativa por etapa para identificar dónde se acumulan los pendientes."
};
function DataCard({ title, children }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: title,
		children: [dataCardExplanations[title] && /* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(ChartExplanation, { children: dataCardExplanations[title] })
		}), children]
	});
}
function MiniTable({ head, rows, total }) {
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: head.map((item, index) => /* @__PURE__ */ jsx("th", {
				scope: "col",
				className: `h-9 whitespace-nowrap px-3 text-xs font-semibold uppercase ${index > 0 ? "text-right" : "text-left"}`,
				children: item
			}, item)) }) }), /* @__PURE__ */ jsxs("tbody", {
				className: "[&>tr:nth-child(even)]:bg-background",
				children: [
					rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: head.length,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Sin registros para los filtros seleccionados."
					}) }),
					rows.map((row, index) => /* @__PURE__ */ jsx("tr", {
						className: "h-10 border-t border-border",
						children: row.map((cell, cellIndex) => /* @__PURE__ */ jsx("td", {
							className: `whitespace-nowrap px-3 py-2 ${cellIndex > 0 ? "text-right" : ""}`,
							children: /* @__PURE__ */ jsx(TableValue, { value: cell })
						}, `${cell}-${cellIndex}`))
					}, `${row[0]}-${index}`)),
					/* @__PURE__ */ jsx("tr", {
						className: "h-10 border-t border-border font-semibold",
						children: total.map((cell, index) => /* @__PURE__ */ jsx("td", {
							className: `whitespace-nowrap px-3 py-2 ${index > 0 ? "text-right" : ""}`,
							children: /* @__PURE__ */ jsx(TableValue, { value: cell })
						}, `${cell}-${index}`))
					})
				]
			})]
		})
	});
}
function TableValue({ value }) {
	const red = value.trim().startsWith("-");
	const green = value.includes("105%") || value.includes("S/ 3.641");
	return /* @__PURE__ */ jsx("span", {
		className: red ? "text-destructive" : green ? "text-success" : "",
		children: value
	});
}
//#endregion
export { MonitoreoPredialPage as component };
