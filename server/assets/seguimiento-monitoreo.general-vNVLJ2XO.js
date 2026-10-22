import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { E as Modal, w as registrarExportacion } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, BarChart3, CalendarDays, CheckCircle2, Eye, FileSpreadsheet, House, Landmark, Printer } from "lucide-react";
import writeXlsxFile from "write-excel-file/browser";
//#region src/routes/seguimiento-monitoreo.general.tsx?tsr-split=component
var airportGroups = [
	{
		name: "Aeropuertos - Grupo 1",
		subtotalLabel: "Grupo 1 Aero",
		projects: [
			{
				name: "Cajamarca",
				totalProperties: 555,
				acquiredProperties: 459,
				interferenceUniverse: 24,
				releasedInterferences: 16
			},
			{
				name: "Chachapoyas",
				totalProperties: 3,
				acquiredProperties: 1,
				interferenceUniverse: 11,
				releasedInterferences: 10
			},
			{
				name: "Anta",
				totalProperties: 41,
				acquiredProperties: 3,
				interferenceUniverse: 11,
				releasedInterferences: 7
			},
			{
				name: "Iquitos",
				totalProperties: 1748,
				acquiredProperties: 1746,
				interferenceUniverse: 17,
				releasedInterferences: 12
			},
			{
				name: "Pisco",
				totalProperties: 125,
				acquiredProperties: 86,
				interferenceUniverse: 17,
				releasedInterferences: 12
			},
			{
				name: "Piura",
				totalProperties: 250,
				acquiredProperties: 142,
				interferenceUniverse: 17,
				releasedInterferences: 11
			},
			{
				name: "Pucallpa",
				totalProperties: 559,
				acquiredProperties: 548,
				interferenceUniverse: 17,
				releasedInterferences: 15
			},
			{
				name: "Tarapoto",
				totalProperties: 595,
				acquiredProperties: 528,
				interferenceUniverse: 18,
				releasedInterferences: 10
			},
			{
				name: "Trujillo",
				totalProperties: 66,
				acquiredProperties: 56,
				interferenceUniverse: 15,
				releasedInterferences: 12
			},
			{
				name: "Talara",
				totalProperties: 218,
				acquiredProperties: 96,
				interferenceUniverse: 17,
				releasedInterferences: 10
			}
		]
	},
	{
		name: "Aeropuertos - Grupo 2",
		subtotalLabel: "Grupo 2 Aero",
		projects: [
			{
				name: "Ayacucho",
				totalProperties: 324,
				acquiredProperties: 87,
				interferenceUniverse: 15,
				releasedInterferences: 9
			},
			{
				name: "Juliaca",
				totalProperties: 839,
				acquiredProperties: 229,
				interferenceUniverse: 16,
				releasedInterferences: 6
			},
			{
				name: "Puerto Maldonado",
				totalProperties: 114,
				acquiredProperties: 93,
				interferenceUniverse: 13,
				releasedInterferences: 10
			},
			{
				name: "Arequipa",
				totalProperties: 14,
				acquiredProperties: 14,
				interferenceUniverse: 23,
				releasedInterferences: 22
			}
		]
	},
	{
		name: "Aeropuertos - Grupo 3",
		subtotalLabel: "Aero Jauja",
		projects: [{
			name: "Jauja",
			totalProperties: 501,
			acquiredProperties: 495,
			interferenceUniverse: 19,
			releasedInterferences: 12
		}]
	},
	{
		name: "Aeródromos",
		subtotalLabel: "Aeródromos",
		projects: [
			{
				name: "Soplín Vargas",
				totalProperties: 56,
				acquiredProperties: 35,
				interferenceUniverse: 12,
				releasedInterferences: 10
			},
			{
				name: "Huancabamba - Oxapampa",
				totalProperties: 208,
				acquiredProperties: 41,
				interferenceUniverse: 15,
				releasedInterferences: 6
			},
			{
				name: "Caballococha",
				totalProperties: 607,
				acquiredProperties: 79,
				interferenceUniverse: 9,
				releasedInterferences: 6
			},
			{
				name: "Breu",
				totalProperties: 3,
				acquiredProperties: 3,
				interferenceUniverse: 12,
				releasedInterferences: 11
			}
		]
	}
];
function sumProjects(projects) {
	return projects.reduce((total, project) => ({
		totalProperties: total.totalProperties + project.totalProperties,
		acquiredProperties: total.acquiredProperties + project.acquiredProperties,
		interferenceUniverse: total.interferenceUniverse + project.interferenceUniverse,
		releasedInterferences: total.releasedInterferences + project.releasedInterferences
	}), {
		totalProperties: 0,
		acquiredProperties: 0,
		interferenceUniverse: 0,
		releasedInterferences: 0
	});
}
var grandTotal = sumProjects(airportGroups.flatMap((group) => group.projects));
var num = (value) => value.toLocaleString("es-PE");
function percentage(value, total) {
	return total === 0 ? "0.00%" : `${(value / total * 100).toFixed(2)}%`;
}
function pendingProperties(project) {
	return project.totalProperties - project.acquiredProperties;
}
function pendingInterferences(project) {
	return project.interferenceUniverse - project.releasedInterferences;
}
function propertyRegimeBreakdown(project) {
	const stateProperties = project.stateProperties ?? 0;
	return {
		privateProperties: project.privateProperties ?? project.totalProperties - stateProperties,
		stateProperties
	};
}
function acquisitionMethodBreakdown(project) {
	if (project.acquisitionBreakdown) return project.acquisitionBreakdown;
	const { privateProperties, stateProperties } = propertyRegimeBreakdown(project);
	return [
		{
			regime: "Privado",
			method: "Trato directo",
			detail: "Adquisición voluntaria",
			total: 0,
			completed: 0
		},
		{
			regime: "Privado",
			method: "Expropiación",
			detail: "Adquisición forzosa",
			total: 0,
			completed: 0
		},
		{
			regime: "Privado",
			method: "Liberación en bloque",
			detail: "Procedimiento alternativo",
			total: 0,
			completed: 0
		},
		{
			regime: "Privado",
			method: "Sin desagregar en la fuente",
			detail: "Pendiente de clasificación por modalidad",
			total: privateProperties,
			completed: project.acquiredProperties,
			unclassified: true
		},
		{
			regime: "Estatal",
			method: "Transferencia de propiedad",
			detail: "Transferencia interestatal",
			total: stateProperties,
			completed: 0
		},
		{
			regime: "Estatal",
			method: "Otro derecho real",
			detail: "Otorgamiento de uso u otro derecho",
			total: 0,
			completed: 0
		}
	];
}
function progressTone(value) {
	if (value >= 80) return "success";
	if (value >= 60) return "warning";
	return "destructive";
}
var barTone = (value) => value >= 80 ? "bg-success" : value >= 60 ? "bg-highlight" : "bg-destructive";
async function exportExcel(period) {
	const periodLabel = period === "TODOS" ? "Todos" : period;
	const data = [[
		"Proyecto / grupo",
		"Proyecto",
		"Total de predios",
		"Predios adquiridos",
		"Total pendientes",
		"% avance predial",
		"Universo de interferencias",
		"Interferencias liberadas y/o no son interferencia",
		"Pendientes",
		"% avance interferencias"
	].map((header) => ({
		value: header,
		fontWeight: "bold",
		align: "center",
		wrap: true,
		height: 30
	}))];
	airportGroups.forEach((group) => {
		group.projects.forEach((project) => {
			data.push([
				{
					value: group.name,
					type: String
				},
				{
					value: project.name,
					type: String,
					fontWeight: "bold"
				},
				{
					value: project.totalProperties,
					type: Number,
					format: "#,##0",
					align: "right"
				},
				{
					value: project.acquiredProperties,
					type: Number,
					format: "#,##0",
					align: "right"
				},
				{
					value: pendingProperties(project),
					type: Number,
					format: "#,##0",
					align: "right"
				},
				{
					value: project.acquiredProperties / project.totalProperties,
					type: Number,
					format: "0.00%",
					align: "right"
				},
				{
					value: project.interferenceUniverse,
					type: Number,
					format: "#,##0",
					align: "right"
				},
				{
					value: project.releasedInterferences,
					type: Number,
					format: "#,##0",
					align: "right"
				},
				{
					value: pendingInterferences(project),
					type: Number,
					format: "#,##0",
					align: "right"
				},
				{
					value: project.releasedInterferences / project.interferenceUniverse,
					type: Number,
					format: "0.00%",
					align: "right"
				}
			]);
		});
		data.push(buildExcelTotalRow(group.subtotalLabel, sumProjects(group.projects)));
	});
	data.push(buildExcelTotalRow("SUMA TOTAL", grandTotal));
	await writeXlsxFile([{
		data,
		sheet: `Reporte ${periodLabel}`,
		stickyRowsCount: 1,
		orientation: "landscape",
		showGridLines: true,
		columns: [
			{ width: 25 },
			{ width: 24 },
			{ width: 15 },
			{ width: 17 },
			{ width: 16 },
			{ width: 15 },
			{ width: 20 },
			{ width: 29 },
			{ width: 14 },
			{ width: 18 }
		]
	}]).toFile(`reporte_general_alta_gerencia_${periodLabel.toLowerCase()}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
	registrarExportacion("reporte_general_alta_gerencia", "Excel", void 0, periodLabel);
}
function buildExcelTotalRow(label, total) {
	const common = { fontWeight: "bold" };
	return [
		{
			value: label,
			type: String,
			...common
		},
		{
			value: "",
			type: String,
			...common
		},
		{
			value: total.totalProperties,
			type: Number,
			format: "#,##0",
			...common
		},
		{
			value: total.acquiredProperties,
			type: Number,
			format: "#,##0",
			...common
		},
		{
			value: total.totalProperties - total.acquiredProperties,
			type: Number,
			format: "#,##0",
			...common
		},
		{
			value: total.acquiredProperties / total.totalProperties,
			type: Number,
			format: "0.00%",
			...common
		},
		{
			value: total.interferenceUniverse,
			type: Number,
			format: "#,##0",
			...common
		},
		{
			value: total.releasedInterferences,
			type: Number,
			format: "#,##0",
			...common
		},
		{
			value: total.interferenceUniverse - total.releasedInterferences,
			type: Number,
			format: "#,##0",
			...common
		},
		{
			value: total.releasedInterferences / total.interferenceUniverse,
			type: Number,
			format: "0.00%",
			...common
		}
	];
}
var TH = "h-9 whitespace-nowrap px-3 text-xs font-semibold uppercase";
var TD = "border-t border-border px-3 py-1.5 text-center tabular-nums";
function ExecutiveAirportReportPage() {
	const [selectedProject, setSelectedProject] = useState(null);
	const [selectedPeriod, setSelectedPeriod] = useState("TODOS");
	const acquisitionProgress = grandTotal.acquiredProperties / grandTotal.totalProperties * 100;
	const interferenceProgress = grandTotal.releasedInterferences / grandTotal.interferenceUniverse * 100;
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: BarChart3,
			titulo: "Reporte general aeroportuario",
			descripcion: "Alta gerencia · Consolidado de adquisiciones prediales y liberación de interferencias por proyecto y grupo aeroportuario.",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 text-xs font-semibold text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx(CalendarDays, {
							size: 16,
							className: "text-primary-dark",
							"aria-hidden": true
						}),
						"Periodo",
						/* @__PURE__ */ jsxs("select", {
							value: selectedPeriod,
							onChange: (event) => {
								setSelectedPeriod(event.target.value);
								setSelectedProject(null);
							},
							className: `${controlClase} w-28`,
							"aria-label": "Seleccionar periodo del reporte",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "TODOS",
									children: "Todos"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "2026",
									children: "2026"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "2025",
									children: "2025"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void exportExcel(selectedPeriod),
					disabled: selectedPeriod === "2025",
					title: selectedPeriod !== "2025" ? `Exportar el reporte del periodo ${selectedPeriod === "TODOS" ? "completo" : selectedPeriod}` : "No hay información cargada para el periodo 2025",
					children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar Excel"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ jsx(Printer, {}), " Imprimir reporte"]
				})
			] })
		}),
		/* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-1.5 text-xs text-warning",
			children: "Datos de demostración: las cifras de este tablero no provienen de un servicio."
		}),
		selectedPeriod !== "2025" ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4 print:grid-cols-4",
			children: [
				/* @__PURE__ */ jsx(Kpi, {
					label: "Total de predios",
					value: num(grandTotal.totalProperties),
					detail: "Universo privado"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Predios adquiridos",
					value: num(grandTotal.acquiredProperties),
					detail: `${percentage(grandTotal.acquiredProperties, grandTotal.totalProperties)} de avance`,
					tono: "text-success"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Interferencias liberadas",
					value: num(grandTotal.releasedInterferences),
					detail: `${percentage(grandTotal.releasedInterferences, grandTotal.interferenceUniverse)} de avance`,
					tono: "text-primary-dark"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Pendientes críticos",
					value: num(grandTotal.totalProperties - grandTotal.acquiredProperties),
					detail: `${num(grandTotal.interferenceUniverse - grandTotal.releasedInterferences)} interferencias pendientes`,
					tono: "text-destructive"
				})
			]
		}), /* @__PURE__ */ jsxs(Section, {
			titulo: "Matriz consolidada de avance aeroportuario",
			acciones: /* @__PURE__ */ jsxs("div", {
				className: "hidden gap-4 text-xs text-muted-foreground sm:flex",
				children: [/* @__PURE__ */ jsx(ProgressLegend, {
					label: "Avance predial",
					value: acquisitionProgress
				}), /* @__PURE__ */ jsx(ProgressLegend, {
					label: "Interferencias",
					value: interferenceProgress
				})]
			}),
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: [
						"Periodo:",
						" ",
						selectedPeriod === "TODOS" ? "Todos (información disponible 2026)" : selectedPeriod,
						" ",
						"· Valores expresados en número de predios e interferencias. Seleccione un proyecto para ver su detalle."
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto rounded-md border border-border",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full min-w-[1080px] text-sm",
						children: [/* @__PURE__ */ jsxs("thead", { children: [/* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("th", {
								rowSpan: 2,
								scope: "col",
								className: `${TH} w-40 text-left`,
								children: "Proyecto / grupo"
							}),
							/* @__PURE__ */ jsx("th", {
								rowSpan: 2,
								scope: "col",
								className: `${TH} w-44 text-left`,
								children: "Proyectos"
							}),
							/* @__PURE__ */ jsx("th", {
								colSpan: 4,
								scope: "colgroup",
								className: `${TH} border-l border-border text-center`,
								children: "Avance de las adquisiciones prediales"
							}),
							/* @__PURE__ */ jsx("th", {
								colSpan: 4,
								scope: "colgroup",
								className: `${TH} border-l border-border text-center`,
								children: "Avance de la liberación de interferencias"
							})
						] }), /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("th", {
								scope: "col",
								className: `${TH} border-l border-border text-center`,
								children: "Total de predios"
							}),
							/* @__PURE__ */ jsx("th", {
								scope: "col",
								className: `${TH} text-center`,
								children: "Predios adquiridos"
							}),
							/* @__PURE__ */ jsx("th", {
								scope: "col",
								className: `${TH} text-center`,
								children: "Total pendientes"
							}),
							/* @__PURE__ */ jsx("th", {
								scope: "col",
								className: `${TH} text-center`,
								children: "% avance"
							}),
							/* @__PURE__ */ jsx("th", {
								scope: "col",
								className: `${TH} border-l border-border text-center`,
								children: "Universo de interferencias"
							}),
							/* @__PURE__ */ jsx("th", {
								scope: "col",
								className: `${TH} text-center`,
								children: "Liberadas y/o no son interferencia"
							}),
							/* @__PURE__ */ jsx("th", {
								scope: "col",
								className: `${TH} text-center`,
								children: "Pendientes"
							}),
							/* @__PURE__ */ jsx("th", {
								scope: "col",
								className: `${TH} text-center`,
								children: "% avance"
							})
						] })] }), /* @__PURE__ */ jsxs("tbody", { children: [airportGroups.map((group) => /* @__PURE__ */ jsx(GroupRows, {
							group,
							subtotal: sumProjects(group.projects),
							onSelectProject: (project) => setSelectedProject({
								groupName: group.name,
								project
							})
						}, group.name)), /* @__PURE__ */ jsxs("tr", {
							className: "bg-primary-soft font-bold text-primary-dark",
							children: [/* @__PURE__ */ jsx("td", {
								colSpan: 2,
								className: "border-t border-border px-3 py-2 text-center uppercase",
								children: "Suma total"
							}), /* @__PURE__ */ jsx(TotalCells, { total: grandTotal })]
						})] })]
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-2 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", { children: "* Universo de predios privados." }), /* @__PURE__ */ jsxs("span", { children: [
						"Total: ",
						num(grandTotal.totalProperties),
						" predios ·",
						" ",
						num(grandTotal.interferenceUniverse),
						" interferencias"
					] })]
				})
			]
		})] }) : /* @__PURE__ */ jsx(Section, {
			titulo: "Matriz consolidada de avance aeroportuario",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex min-h-[320px] flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ jsx(CalendarDays, {
						size: 32,
						className: "text-muted-foreground",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-3 text-lg font-semibold text-foreground",
						children: "Sin información cargada para 2025"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 max-w-md text-sm text-muted-foreground",
						children: "Por el momento, la matriz aeroportuaria y sus indicadores corresponden al periodo 2026. Los datos de 2025 se mostrarán cuando sean incorporados."
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "button",
						className: "mt-4",
						onClick: () => setSelectedPeriod("2026"),
						children: "Ver información 2026"
					})
				]
			})
		}),
		selectedProject && /* @__PURE__ */ jsx(ProjectDetailModal, {
			selected: selectedProject,
			onClose: () => setSelectedProject(null)
		})
	] });
}
function GroupRows({ group, subtotal, onSelectProject }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [group.projects.map((project, index) => {
		const acquisitionProgress = project.acquiredProperties / project.totalProperties * 100;
		const interferenceProgress = project.releasedInterferences / project.interferenceUniverse * 100;
		return /* @__PURE__ */ jsxs("tr", {
			className: "h-10 odd:bg-card even:bg-background hover:bg-primary-soft/40",
			children: [
				index === 0 && /* @__PURE__ */ jsx("th", {
					rowSpan: group.projects.length + 1,
					scope: "rowgroup",
					className: "border-t border-border bg-primary-soft px-3 py-1 text-left align-top text-xs font-semibold uppercase text-primary-dark",
					children: group.name
				}),
				/* @__PURE__ */ jsx("th", {
					scope: "row",
					className: "border-t border-border px-3 py-1 text-left font-semibold",
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => onSelectProject(project),
						className: "group flex w-full items-center justify-between gap-2 rounded-sm text-left hover:text-primary-dark hover:underline",
						title: `Ver detalle ejecutivo de ${project.name}`,
						children: [/* @__PURE__ */ jsx("span", { children: project.name }), /* @__PURE__ */ jsx(Eye, {
							size: 16,
							className: "shrink-0 text-muted-foreground opacity-40 group-hover:text-primary-dark group-hover:opacity-100",
							"aria-hidden": true
						})]
					})
				}),
				/* @__PURE__ */ jsx("td", {
					className: TD,
					children: num(project.totalProperties)
				}),
				/* @__PURE__ */ jsx("td", {
					className: `${TD} font-semibold text-success`,
					title: "Predios adquiridos",
					children: num(project.acquiredProperties)
				}),
				/* @__PURE__ */ jsx("td", {
					className: `${TD} font-semibold ${pendingProperties(project) > 0 ? "text-destructive" : "text-success"}`,
					title: "Predios pendientes",
					children: num(pendingProperties(project))
				}),
				/* @__PURE__ */ jsx("td", {
					className: TD,
					children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: progressTone(acquisitionProgress),
						children: percentage(project.acquiredProperties, project.totalProperties)
					})
				}),
				/* @__PURE__ */ jsx("td", {
					className: `${TD} border-l border-border`,
					children: num(project.interferenceUniverse)
				}),
				/* @__PURE__ */ jsx("td", {
					className: `${TD} font-semibold text-primary-dark`,
					title: "Interferencias liberadas",
					children: num(project.releasedInterferences)
				}),
				/* @__PURE__ */ jsx("td", {
					className: `${TD} font-semibold ${pendingInterferences(project) > 0 ? "text-destructive" : "text-success"}`,
					title: "Interferencias pendientes",
					children: num(pendingInterferences(project))
				}),
				/* @__PURE__ */ jsx("td", {
					className: TD,
					children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: progressTone(interferenceProgress),
						children: percentage(project.releasedInterferences, project.interferenceUniverse)
					})
				})
			]
		}, `${group.name}-${project.name}`);
	}), /* @__PURE__ */ jsxs("tr", {
		className: "h-10 bg-muted font-semibold",
		children: [/* @__PURE__ */ jsx("th", {
			scope: "row",
			className: "border-t border-border px-3 py-1 text-left text-xs uppercase",
			children: group.subtotalLabel
		}), /* @__PURE__ */ jsx(TotalCells, { total: subtotal })]
	})] });
}
function TotalCells({ total }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("td", {
			className: TD,
			children: num(total.totalProperties)
		}),
		/* @__PURE__ */ jsx("td", {
			className: TD,
			children: num(total.acquiredProperties)
		}),
		/* @__PURE__ */ jsx("td", {
			className: TD,
			children: num(total.totalProperties - total.acquiredProperties)
		}),
		/* @__PURE__ */ jsx("td", {
			className: TD,
			children: percentage(total.acquiredProperties, total.totalProperties)
		}),
		/* @__PURE__ */ jsx("td", {
			className: `${TD} border-l border-border`,
			children: num(total.interferenceUniverse)
		}),
		/* @__PURE__ */ jsx("td", {
			className: TD,
			children: num(total.releasedInterferences)
		}),
		/* @__PURE__ */ jsx("td", {
			className: TD,
			children: num(total.interferenceUniverse - total.releasedInterferences)
		}),
		/* @__PURE__ */ jsx("td", {
			className: TD,
			children: percentage(total.releasedInterferences, total.interferenceUniverse)
		})
	] });
}
function ProjectDetailModal({ selected, onClose }) {
	const { project, groupName } = selected;
	const propertyPending = pendingProperties(project);
	const interferencePending = pendingInterferences(project);
	const propertyRegime = propertyRegimeBreakdown(project);
	const acquisitionProgress = project.acquiredProperties / project.totalProperties * 100;
	const interferenceProgress = project.releasedInterferences / project.interferenceUniverse * 100;
	const needsAttention = acquisitionProgress < 60 || interferenceProgress < 60;
	const recommendation = acquisitionProgress < 60 ? "Priorizar la revisión de expedientes y la estrategia de adquisición de los predios pendientes." : interferenceProgress < 60 ? "Concentrar la coordinación con titulares de servicios para acelerar la liberación de interferencias." : propertyPending > 0 || interferencePending > 0 ? "Mantener el seguimiento semanal hasta cerrar las brechas pendientes." : "El proyecto no presenta brechas pendientes; mantener el control de cierre y actualización.";
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: project.name,
		descripcion: `Detalle ejecutivo · ${groupName}`,
		ancho: "lg",
		pie: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cerrar detalle"
		}),
		children: [
			/* @__PURE__ */ jsxs("p", {
				role: "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${needsAttention ? "border-warning bg-warning-soft text-warning" : "border-success bg-success-soft text-success"}`,
				children: [needsAttention ? /* @__PURE__ */ jsx(AlertTriangle, {
					size: 16,
					className: "mt-0.5 shrink-0",
					"aria-hidden": true
				}) : /* @__PURE__ */ jsx(CheckCircle2, {
					size: 16,
					className: "mt-0.5 shrink-0",
					"aria-hidden": true
				}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("b", {
					className: "block",
					children: needsAttention ? "Requiere atención de la coordinación" : "Avance favorable"
				}), /* @__PURE__ */ jsx("span", {
					className: "text-xs",
					children: recommendation
				})] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ jsx(Kpi, {
						label: "Total de predios",
						value: num(project.totalProperties)
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Predios adquiridos",
						value: num(project.acquiredProperties),
						tono: "text-success"
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Predios pendientes",
						value: num(propertyPending),
						tono: "text-destructive"
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Universo de interferencias",
						value: num(project.interferenceUniverse)
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Interferencias liberadas",
						value: num(project.releasedInterferences),
						tono: "text-primary-dark"
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Interferencias pendientes",
						value: num(interferencePending),
						tono: "text-destructive"
					})
				]
			}),
			/* @__PURE__ */ jsx(PropertyRegimeSummary, {
				total: project.totalProperties,
				privateProperties: propertyRegime.privateProperties,
				stateProperties: propertyRegime.stateProperties
			}),
			/* @__PURE__ */ jsx(AcquisitionMethodTable, { project }),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Avance del proyecto" }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsx(DetailProgress, {
					label: "Avance de adquisiciones prediales",
					value: acquisitionProgress,
					completed: project.acquiredProperties,
					pending: propertyPending
				}), /* @__PURE__ */ jsx(DetailProgress, {
					label: "Avance de liberación de interferencias",
					value: interferenceProgress,
					completed: project.releasedInterferences,
					pending: interferencePending
				})]
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Lectura para alta gerencia" }),
			/* @__PURE__ */ jsxs("ul", {
				className: "list-disc space-y-1 pl-5 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("li", { children: [
					"Se adquirieron ",
					num(project.acquiredProperties),
					" de ",
					num(project.totalProperties),
					" ",
					"predios; quedan ",
					num(propertyPending),
					" pendientes."
				] }), /* @__PURE__ */ jsxs("li", { children: [
					"Se liberaron ",
					num(project.releasedInterferences),
					" de ",
					num(project.interferenceUniverse),
					" ",
					"interferencias; quedan ",
					num(interferencePending),
					" pendientes."
				] })]
			})
		]
	});
}
function PropertyRegimeSummary({ total, privateProperties, stateProperties }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsxs(StatusBadge, { children: ["Universo: ", num(total)] }),
			children: "Disponibilidad por tipo de predio"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-muted-foreground",
			children: "Clasificación de referencia conforme al D. Leg. 1192."
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("article", {
				className: "rounded-lg border border-border bg-card p-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
							"aria-hidden": true,
							children: /* @__PURE__ */ jsx(House, { size: 16 })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold text-foreground",
							children: "Predios privados"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Universo registrado"
						})] })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-right",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-lg font-semibold tabular-nums text-success",
							children: num(privateProperties)
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: percentage(privateProperties, total)
						})]
					})]
				}), /* @__PURE__ */ jsxs("dl", {
					className: "mt-3 grid grid-cols-2 gap-2 border-t border-border pt-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-semibold text-foreground",
						children: "Forma de obtención"
					}), /* @__PURE__ */ jsx("dd", { children: "Adquisición, expropiación o liberación en bloque." })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-semibold text-foreground",
						children: "Personas vinculadas"
					}), /* @__PURE__ */ jsx("dd", { children: "Sujeto pasivo, propietario u ocupante/poseedor." })] })]
				})]
			}), /* @__PURE__ */ jsxs("article", {
				className: "rounded-lg border border-border bg-card p-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
							"aria-hidden": true,
							children: /* @__PURE__ */ jsx(Landmark, { size: 16 })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold text-foreground",
							children: "Predios estatales"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: stateProperties === 0 ? "Sin registros en esta fuente" : "Universo registrado"
						})] })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-right",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-lg font-semibold tabular-nums text-primary-dark",
							children: num(stateProperties)
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: percentage(stateProperties, total)
						})]
					})]
				}), /* @__PURE__ */ jsxs("dl", {
					className: "mt-3 grid grid-cols-2 gap-2 border-t border-border pt-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-semibold text-foreground",
						children: "Tipo de predio"
					}), /* @__PURE__ */ jsx("dd", { children: "Dominio público, privado o empresa del Estado." })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-semibold text-foreground",
						children: "Forma de obtención"
					}), /* @__PURE__ */ jsx("dd", { children: "Transferencia u otorgamiento de otro derecho real." })] })]
				})]
			})]
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-2 text-xs text-muted-foreground",
			children: "La fuente 2026 declara un universo de predios privados; por ello los estatales se muestran separados, sin asignarles valores no registrados."
		})
	] });
}
function AcquisitionMethodTable({ project }) {
	const rows = acquisitionMethodBreakdown(project);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsx(StatusBadge, { children: "D. Leg. 1192" }),
			children: "Detalle por forma de obtención"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-muted-foreground",
			children: "Desagregación de predios privados y estatales por procedimiento."
		}),
		/* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[620px] text-sm",
				children: [
					/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} text-left`,
							children: "Tipo de predio"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} text-left`,
							children: "Forma de obtención"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} text-left`,
							children: "Detalle"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} text-right`,
							children: "Universo"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} text-right`,
							children: "Culminados"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} text-right`,
							children: "Pendientes"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: `${TH} text-right`,
							children: "Avance"
						})
					] }) }),
					/* @__PURE__ */ jsx("tbody", {
						className: "[&>tr:nth-child(even)]:bg-background",
						children: rows.map((row) => {
							const pending = Math.max(row.total - row.completed, 0);
							return /* @__PURE__ */ jsxs("tr", {
								className: `h-10 border-t border-border ${row.unclassified ? "bg-warning-soft" : ""}`,
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-1.5",
										children: /* @__PURE__ */ jsx(StatusBadge, {
											tono: row.regime === "Privado" ? "success" : "primary",
											children: row.regime
										})
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "row",
										className: `px-3 py-1.5 text-left ${row.unclassified ? "font-bold text-warning" : "font-semibold"}`,
										children: row.method
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-1.5 text-muted-foreground",
										children: row.detail
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-1.5 text-right font-semibold tabular-nums",
										children: num(row.total)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-1.5 text-right font-semibold tabular-nums text-success",
										children: num(row.completed)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-1.5 text-right font-semibold tabular-nums text-destructive",
										children: num(pending)
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-1.5 text-right font-semibold tabular-nums",
										children: row.total > 0 ? percentage(row.completed, row.total) : "Sin universo"
									})
								]
							}, `${row.regime}-${row.method}`);
						})
					}),
					/* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", {
						className: "h-10 border-t border-border bg-primary-soft font-bold text-primary-dark",
						children: [
							/* @__PURE__ */ jsx("td", {
								colSpan: 3,
								className: "px-3 py-1.5 text-right uppercase",
								children: "Total del proyecto"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-1.5 text-right tabular-nums",
								children: num(project.totalProperties)
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-1.5 text-right tabular-nums",
								children: num(project.acquiredProperties)
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-1.5 text-right tabular-nums",
								children: num(pendingProperties(project))
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-1.5 text-right tabular-nums",
								children: percentage(project.acquiredProperties, project.totalProperties)
							})
						]
					}) })
				]
			})
		}),
		/* @__PURE__ */ jsxs("p", {
			role: "status",
			className: "mt-2 flex items-start gap-2 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: [/* @__PURE__ */ jsx(AlertTriangle, {
				size: 14,
				className: "mt-0.5 shrink-0",
				"aria-hidden": true
			}), /* @__PURE__ */ jsx("span", { children: "La fuente consolidada no separa todavía las cantidades de trato directo, expropiación y liberación en bloque. Los valores se mantienen en “Sin desagregar” hasta incorporar la fuente detallada." })]
		})
	] });
}
function DetailProgress({ label, value, completed, pending }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm font-medium text-foreground",
				children: label
			}), /* @__PURE__ */ jsxs("p", {
				className: "text-lg font-semibold tabular-nums text-foreground",
				children: [value.toFixed(2), "%"]
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-2 h-2 overflow-hidden rounded-sm bg-muted",
			role: "progressbar",
			"aria-valuenow": Math.round(value),
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-label": label,
			children: /* @__PURE__ */ jsx("div", {
				className: `h-full ${barTone(value)}`,
				style: { width: `${value}%` }
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-1 flex justify-between text-xs text-muted-foreground",
			children: [/* @__PURE__ */ jsxs("span", { children: [num(completed), " completados"] }), /* @__PURE__ */ jsxs("span", {
				className: pending > 0 ? "font-semibold text-destructive" : "text-success",
				children: [num(pending), " pendientes"]
			})]
		})
	] });
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
			detail && /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: detail
			})
		]
	});
}
function ProgressLegend({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-28",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-1 flex justify-between gap-3",
			children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsxs("b", {
				className: "text-foreground",
				children: [value.toFixed(2), "%"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "h-1.5 overflow-hidden rounded-sm bg-muted",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx("div", {
				className: "h-full bg-primary",
				style: { width: `${value}%` }
			})
		})]
	});
}
//#endregion
export { ExecutiveAirportReportPage as component };
