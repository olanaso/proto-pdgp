import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { w as registrarExportacion } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { n as integratedPredios, r as integratedProjects } from "./integratedCeplanSiafData-BdiC1vIX.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileSpreadsheet, FolderKanban, RotateCcw, Search } from "lucide-react";
import writeXlsxFile from "write-excel-file/browser";
//#region src/routes/seguimiento-monitoreo.integrado-proyectos.tsx?tsr-split=component
var moneyFormatter = new Intl.NumberFormat("es-PE", {
	style: "currency",
	currency: "PEN",
	maximumFractionDigits: 0
});
function money(value) {
	return moneyFormatter.format(value);
}
function compactMoney(value) {
	if (value >= 1e6) return `S/ ${(value / 1e6).toFixed(1)} M`;
	return money(value);
}
function parseProjectBudget(value) {
	const amount = Number(value.match(/[\d.]+/)?.[0] ?? 0);
	return value.toUpperCase().includes("MM") ? amount * 1e6 : amount;
}
function buildPortfolioRow(project) {
	const integration = integratedProjects.find((item) => item.id === project.id) ?? null;
	const financialProgress = integration ? integration.accrued / Math.max(integration.pim, 1) * 100 : project.financiero;
	return {
		project,
		integration,
		referenceBudget: parseProjectBudget(project.presupuesto),
		poi: integration?.poi ?? null,
		pia: integration?.pia ?? null,
		pim: integration?.pim ?? null,
		certification: integration?.certification ?? null,
		accrued: integration?.accrued ?? null,
		paid: integration?.paid ?? null,
		financialProgress,
		physicalProgress: project.fisico,
		gap: project.fisico - financialProgress,
		linkStatus: integration?.linkStatus ?? "Sin vincular"
	};
}
var matrixHeaders = [
	"Tipo",
	"Coordinación",
	"Estado",
	"OEI / AEI",
	"Actividad operativa",
	"Meta SIAF",
	"POI prog.",
	"PIA",
	"PIM",
	"Certificación",
	"Devengado",
	"Pagado",
	"Avance físico",
	"Avance financiero",
	"Brecha",
	"Predios",
	"Disponibles",
	"Vinculación",
	"Acción"
];
function IntegratedProjectsPage() {
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState("Todos");
	const [coordinationFilter, setCoordinationFilter] = useState("Todas");
	const [stateFilter, setStateFilter] = useState("Todos");
	const [linkFilter, setLinkFilter] = useState("Todos");
	const [expandedProject, setExpandedProject] = useState("iquitos");
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(15);
	const rows = useMemo(() => proyectos.map(buildPortfolioRow), []);
	const projectTypes = useMemo(() => ["Todos", ...Array.from(new Set(proyectos.map((item) => item.tipo)))], []);
	const coordinations = useMemo(() => ["Todas", ...Array.from(new Set(proyectos.map((item) => item.coordinacionGeneral)))], []);
	const filteredRows = useMemo(() => {
		const query = search.trim().toLocaleLowerCase("es-PE");
		return rows.filter((row) => {
			return (!query || [
				row.project.codigo,
				row.project.nombre,
				row.project.tipo,
				row.project.coordinacionGeneral,
				row.project.coordinacionPredial,
				row.integration?.cui ?? "",
				row.integration?.meta ?? ""
			].some((value) => value.toLocaleLowerCase("es-PE").includes(query))) && (typeFilter === "Todos" || row.project.tipo === typeFilter) && (coordinationFilter === "Todas" || row.project.coordinacionGeneral === coordinationFilter) && (stateFilter === "Todos" || row.project.estado === stateFilter) && (linkFilter === "Todos" || row.linkStatus === linkFilter);
		});
	}, [
		coordinationFilter,
		linkFilter,
		rows,
		search,
		stateFilter,
		typeFilter
	]);
	const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
	const currentPage = Math.min(page, totalPages);
	const visibleRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	const linkedCount = rows.filter((row) => row.linkStatus === "Vinculado").length;
	const partialCount = rows.filter((row) => row.linkStatus === "Vinculación parcial").length;
	const unlinkedCount = rows.filter((row) => row.linkStatus === "Sin vincular").length;
	const totalPortfolioBudget = rows.reduce((sum, row) => sum + row.referenceBudget, 0);
	const integratedPim = rows.reduce((sum, row) => sum + (row.pim ?? 0), 0);
	const integratedAccrued = rows.reduce((sum, row) => sum + (row.accrued ?? 0), 0);
	const siafExecution = integratedAccrued / Math.max(integratedPim, 1) * 100;
	const resetPage = () => setPage(1);
	const exportPortfolio = async () => {
		const headers = [
			"Código",
			"Proyecto",
			"Tipo",
			"Coordinación general",
			"Coordinación predial",
			"Estado",
			"CUI",
			"OEI",
			"AEI",
			"Actividad operativa",
			"Meta SIAF",
			"POI programado",
			"PIA",
			"PIM",
			"Certificación",
			"Devengado",
			"Pagado",
			"Avance físico",
			"Avance financiero",
			"Brecha físico-financiera",
			"Predios",
			"Predios disponibles",
			"Vinculación"
		];
		await writeXlsxFile([headers.map((value) => ({
			value,
			fontWeight: "bold",
			wrap: true
		})), ...filteredRows.map((row) => [
			row.project.codigo,
			row.project.nombre,
			row.project.tipo,
			row.project.coordinacionGeneral,
			row.project.coordinacionPredial,
			row.project.estado,
			row.integration?.cui ?? "Pendiente",
			row.integration?.oei ?? "Pendiente",
			row.integration?.aei ?? "Pendiente",
			row.integration?.aoi ?? "Pendiente",
			row.integration?.meta ?? "Pendiente",
			row.poi ?? "",
			row.pia ?? "",
			row.pim ?? "",
			row.certification ?? "",
			row.accrued ?? "",
			row.paid ?? "",
			row.physicalProgress / 100,
			row.financialProgress / 100,
			row.gap / 100,
			row.project.predios,
			row.project.disponibles,
			row.linkStatus
		].map((value, index) => ({
			value,
			type: typeof value === "number" ? Number : String,
			format: index >= 11 && index <= 16 ? "S/ #,##0.00" : index >= 17 && index <= 19 ? "0.00%" : void 0,
			wrap: true
		})))], {
			sheet: "Todos los proyectos",
			stickyRowsCount: 1,
			orientation: "landscape",
			columns: headers.map((header, index) => ({ width: index === 1 || index === 3 || index === 4 ? 32 : Math.max(13, header.length + 2) }))
		}).toFile(`seguimiento_integrado_todos_los_proyectos_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
		registrarExportacion("seguimiento_integrado_todos_los_proyectos", "Excel");
	};
	const limpiar = () => {
		setSearch("");
		setTypeFilter("Todos");
		setCoordinationFilter("Todas");
		setStateFilter("Todos");
		setLinkFilter("Todos");
		setPage(1);
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: FolderKanban,
			titulo: "Seguimiento integrado de todos los proyectos",
			descripcion: `Integración institucional · Estado CEPLAN, SIAF y Gestión Predial de los ${proyectos.length} proyectos registrados.`,
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: exportPortfolio,
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar proyectos"]
			})
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: "Datos de demostración. Las cifras de este tablero son de muestra y no provienen de un sistema real."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Filtros",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: limpiar,
				children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Limpiar filtros"]
			}),
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_repeat(4,minmax(150px,0.7fr))]",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block text-xs font-medium text-foreground",
							children: "Buscar proyecto"
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx(Search, {
								size: 16,
								className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": true
							}), /* @__PURE__ */ jsx("input", {
								value: search,
								onChange: (event) => {
									setSearch(event.target.value);
									resetPage();
								},
								placeholder: "Nombre, código, CUI, Meta o coordinación",
								className: `${controlClase} pl-8`
							})]
						})]
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Tipo de infraestructura",
						value: typeFilter,
						options: projectTypes,
						onChange: (value) => {
							setTypeFilter(value);
							resetPage();
						}
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Coordinación general",
						value: coordinationFilter,
						options: coordinations,
						onChange: (value) => {
							setCoordinationFilter(value);
							resetPage();
						}
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado del proyecto",
						value: stateFilter,
						options: [
							"Todos",
							"En ejecucion",
							"En revision",
							"En estructuracion"
						],
						onChange: (value) => {
							setStateFilter(value);
							resetPage();
						}
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado de vinculación",
						value: linkFilter,
						options: [
							"Todos",
							"Vinculado",
							"Vinculación parcial",
							"Sin vincular"
						],
						onChange: (value) => {
							setLinkFilter(value);
							resetPage();
						}
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Resumen de la cartera",
			className: "mb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ jsx(SummaryCard, {
						label: "Total de proyectos",
						value: String(rows.length),
						detail: "Cartera registrada"
					}),
					/* @__PURE__ */ jsx(SummaryCard, {
						label: "Vinculados",
						value: String(linkedCount),
						detail: "CEPLAN · SIAF · Predial"
					}),
					/* @__PURE__ */ jsx(SummaryCard, {
						label: "Vinculación parcial",
						value: String(partialCount),
						detail: "Requieren completar claves"
					}),
					/* @__PURE__ */ jsx(SummaryCard, {
						label: "Sin vincular",
						value: String(unlinkedCount),
						detail: "Pendientes de homologación"
					}),
					/* @__PURE__ */ jsx(SummaryCard, {
						label: "PIM integrado",
						value: compactMoney(integratedPim),
						detail: `Cartera referencial ${compactMoney(totalPortfolioBudget)}`
					}),
					/* @__PURE__ */ jsx(SummaryCard, {
						label: "Ejecución devengada",
						value: `${siafExecution.toFixed(1)}%`,
						detail: compactMoney(integratedAccrued)
					})
				]
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Matriz consolidada de proyectos",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ jsx(LinkBadge, { status: "Vinculado" }),
					/* @__PURE__ */ jsx(LinkBadge, { status: "Vinculación parcial" }),
					/* @__PURE__ */ jsx(LinkBadge, { status: "Sin vincular" })
				]
			}),
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Los campos CEPLAN y SIAF muestran \"Pendiente\" cuando el proyecto aún no fue homologado."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto rounded-md border border-border",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full min-w-[2300px] text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "sticky left-0 z-20 h-9 min-w-[330px] bg-primary-soft px-3 text-left text-xs font-semibold uppercase",
							children: "Proyecto / CUI"
						}), matrixHeaders.map((header) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase",
							children: header
						}, header))] }) }), /* @__PURE__ */ jsxs("tbody", { children: [visibleRows.flatMap((row, index) => {
							const open = expandedProject === row.project.id;
							const rowBackground = index % 2 ? "bg-background" : "bg-card";
							return [/* @__PURE__ */ jsxs("tr", {
								className: `h-10 border-t border-border ${rowBackground}`,
								children: [
									/* @__PURE__ */ jsx("td", {
										className: `sticky left-0 z-10 px-3 py-2 ${rowBackground}`,
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-start gap-1.5",
											children: [/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setExpandedProject(open ? null : row.project.id),
												"aria-expanded": open,
												"aria-label": open ? "Contraer proyecto" : "Expandir proyecto",
												className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md hover:bg-muted",
												children: open ? /* @__PURE__ */ jsx(ChevronDown, { size: 16 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
												className: "font-semibold text-foreground",
												children: [
													row.project.codigo,
													" · ",
													row.project.nombre
												]
											}), /* @__PURE__ */ jsxs("div", {
												className: "mt-0.5 text-xs text-muted-foreground",
												children: ["CUI: ", row.integration?.cui ?? "Pendiente de homologación"]
											})] })]
										})
									}),
									/* @__PURE__ */ jsx(TextCell, { value: row.project.tipo }),
									/* @__PURE__ */ jsx(TextCell, { value: row.project.coordinacionGeneral }),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center",
										children: /* @__PURE__ */ jsx(ProjectStateBadge, { state: row.project.estado })
									}),
									/* @__PURE__ */ jsx(TextCell, {
										value: row.integration ? `${row.integration.oei} / ${row.integration.aei}` : "Pendiente",
										pending: !row.integration
									}),
									/* @__PURE__ */ jsx(TextCell, {
										value: row.integration?.aoi ?? "Pendiente",
										pending: !row.integration
									}),
									/* @__PURE__ */ jsx(TextCell, {
										value: row.integration ? `${row.integration.meta} / ${row.integration.functionalSequence}` : "Pendiente",
										pending: !row.integration
									}),
									/* @__PURE__ */ jsx(MoneyCell, { value: row.poi }),
									/* @__PURE__ */ jsx(MoneyCell, { value: row.pia }),
									/* @__PURE__ */ jsx(MoneyCell, { value: row.pim }),
									/* @__PURE__ */ jsx(MoneyCell, { value: row.certification }),
									/* @__PURE__ */ jsx(MoneyCell, {
										value: row.accrued,
										strong: true
									}),
									/* @__PURE__ */ jsx(MoneyCell, { value: row.paid }),
									/* @__PURE__ */ jsx(ProgressCell, {
										value: row.physicalProgress,
										tone: "primary"
									}),
									/* @__PURE__ */ jsx(ProgressCell, {
										value: row.financialProgress,
										tone: "dark"
									}),
									/* @__PURE__ */ jsxs("td", {
										className: `px-3 py-2 text-right font-semibold tabular-nums ${Math.abs(row.gap) > 20 ? "text-destructive" : Math.abs(row.gap) > 10 ? "text-warning" : "text-success"}`,
										children: [
											row.gap > 0 ? "+" : "",
											row.gap.toFixed(1),
											" p.p."
										]
									}),
									/* @__PURE__ */ jsx(NumberCell, { value: row.project.predios }),
									/* @__PURE__ */ jsx(NumberCell, { value: row.project.disponibles }),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center",
										children: /* @__PURE__ */ jsx(LinkBadge, { status: row.linkStatus })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-center",
										children: row.integration ? /* @__PURE__ */ jsx(Button, {
											asChild: true,
											size: "sm",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/seguimiento-monitoreo/integrado-ceplan-siaf",
												search: { project: row.project.id },
												children: "Ver análisis"
											})
										}) : /* @__PURE__ */ jsx(Button, {
											asChild: true,
											size: "sm",
											variant: "outline",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/configuracion/siaf-ceplan",
												children: "Homologar proyecto"
											})
										})
									})
								]
							}, row.project.id), ...open ? [/* @__PURE__ */ jsx("tr", {
								className: "border-t border-border bg-muted",
								children: /* @__PURE__ */ jsx("td", {
									colSpan: 21,
									className: "p-3",
									children: /* @__PURE__ */ jsx(ProjectDetail, { row })
								})
							}, `${row.project.id}-detail`)] : []];
						}), !visibleRows.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 21,
							className: "px-3 py-10 text-center text-sm text-muted-foreground",
							children: "No hay proyectos que coincidan con los filtros seleccionados."
						}) })] })]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsxs("span", { children: [
						"Mostrando ",
						(currentPage - 1) * pageSize + (visibleRows.length ? 1 : 0),
						" a",
						" ",
						(currentPage - 1) * pageSize + visibleRows.length,
						" de ",
						filteredRows.length,
						" proyectos"
					] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ jsxs("select", {
								value: pageSize,
								onChange: (event) => {
									setPageSize(Number(event.target.value));
									setPage(1);
								},
								"aria-label": "Filas por página",
								className: `${controlClase} mr-2 w-auto`,
								children: [
									/* @__PURE__ */ jsx("option", {
										value: 15,
										children: "15 filas"
									}),
									/* @__PURE__ */ jsx("option", {
										value: 25,
										children: "25 filas"
									}),
									/* @__PURE__ */ jsx("option", {
										value: 50,
										children: "Todos"
									})
								]
							}),
							/* @__PURE__ */ jsx(PaginationButton, {
								label: "Primera página",
								disabled: currentPage === 1,
								onClick: () => setPage(1),
								children: /* @__PURE__ */ jsx(ChevronsLeft, {})
							}),
							/* @__PURE__ */ jsx(PaginationButton, {
								label: "Página anterior",
								disabled: currentPage === 1,
								onClick: () => setPage((value) => Math.max(1, value - 1)),
								children: /* @__PURE__ */ jsx(ChevronLeft, {})
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "px-2 font-semibold text-foreground",
								children: [
									currentPage,
									" / ",
									totalPages
								]
							}),
							/* @__PURE__ */ jsx(PaginationButton, {
								label: "Página siguiente",
								disabled: currentPage === totalPages,
								onClick: () => setPage((value) => Math.min(totalPages, value + 1)),
								children: /* @__PURE__ */ jsx(ChevronRight, {})
							}),
							/* @__PURE__ */ jsx(PaginationButton, {
								label: "Última página",
								disabled: currentPage === totalPages,
								onClick: () => setPage(totalPages),
								children: /* @__PURE__ */ jsx(ChevronsRight, {})
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx("strong", {
						className: "text-foreground",
						children: "Lectura del consolidado:"
					}), " el presupuesto referencial proviene de la cartera de proyectos. POI, PIA, PIM, Meta y ejecución solo se muestran cuando existe una homologación institucional válida."]
				})
			]
		})
	] });
}
function ProjectDetail({ row }) {
	const predios = integratedPredios.filter((item) => item.projectId === row.project.id);
	if (!row.integration) return /* @__PURE__ */ jsxs("div", {
		role: "alert",
		className: "flex flex-wrap items-center justify-between gap-3 rounded-md border border-destructive bg-destructive-soft p-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ jsx(AlertTriangle, {
				size: 16,
				className: "mt-0.5 shrink-0 text-destructive",
				"aria-hidden": true
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
				className: "text-sm font-semibold text-destructive",
				children: "Proyecto pendiente de integración"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-xs text-destructive",
				children: "Falta relacionar CUI, OEI, AEI, Actividad Operativa, Meta SIAF y clasificadores."
			})] })]
		}), /* @__PURE__ */ jsx(Button, {
			asChild: true,
			size: "sm",
			children: /* @__PURE__ */ jsx(Link, {
				to: "/configuracion/siaf-ceplan",
				children: "Ir a homologación"
			})
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3 xl:grid-cols-[0.9fr_1.1fr]",
		children: [/* @__PURE__ */ jsx("dl", {
			className: "grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border text-sm",
			children: [
				["CUI", row.integration.cui],
				["Meta / secuencia", `${row.integration.meta} / ${row.integration.functionalSequence}`],
				["OEI", row.integration.oei],
				["AEI", row.integration.aei],
				["Actividad operativa", row.integration.aoi],
				["Centro de costo", row.integration.costCenter],
				["Fuente / rubro", `${row.integration.sourceCode} / ${row.integration.itemCode}`],
				["Genérica", `${row.integration.genericCode} · ${row.integration.genericName}`]
			].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
				className: "bg-card p-2",
				children: [/* @__PURE__ */ jsx("dt", {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ jsx("dd", {
					className: "mt-0.5 font-semibold text-foreground",
					children: value
				})]
			}, label))
		}), /* @__PURE__ */ jsxs("div", {
			className: "overflow-hidden rounded-md border border-border bg-card",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "border-b border-border px-3 py-2 text-sm font-semibold text-primary-dark",
					children: "Predios vinculados al proyecto"
				}),
				/* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 px-3 text-left text-xs font-semibold uppercase",
							children: "Predio / titular"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 px-3 text-xs font-semibold uppercase",
							children: "Etapa"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 px-3 text-right text-xs font-semibold uppercase",
							children: "Costo"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 px-3 text-right text-xs font-semibold uppercase",
							children: "Devengado"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 px-3 text-right text-xs font-semibold uppercase",
							children: "Pagado"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "h-9 px-3 text-xs font-semibold uppercase",
							children: "Vinc."
						})
					] }) }), /* @__PURE__ */ jsxs("tbody", {
						className: "[&>tr:nth-child(even)]:bg-background",
						children: [predios.map((predio) => /* @__PURE__ */ jsxs("tr", {
							className: "h-10 border-t border-border",
							children: [
								/* @__PURE__ */ jsxs("td", {
									className: "px-3 py-2",
									children: [/* @__PURE__ */ jsx("strong", { children: predio.code }), /* @__PURE__ */ jsxs("span", {
										className: "ml-1 text-muted-foreground",
										children: ["· ", predio.owner]
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 text-center",
									children: predio.stage
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 text-right tabular-nums",
									children: money(predio.cost)
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 text-right tabular-nums",
									children: money(predio.accrued)
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 text-right tabular-nums",
									children: money(predio.paid)
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 text-center",
									children: /* @__PURE__ */ jsx(LinkBadge, {
										status: predio.linkStatus,
										compact: true
									})
								})
							]
						}, predio.code)), !predios.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 6,
							className: "px-3 py-6 text-center text-muted-foreground",
							children: "Sin predios vinculados."
						}) })]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end border-t border-border p-2",
					children: /* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "sm",
						variant: "outline",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/seguimiento-monitoreo/integrado-ceplan-siaf",
							search: { project: row.project.id },
							children: "Abrir análisis completo"
						})
					})
				})
			]
		})]
	});
}
function SummaryCard({ label, value, detail }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-1 text-lg font-semibold tabular-nums text-foreground",
				children: value
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-0.5 truncate text-xs text-muted-foreground",
				title: detail,
				children: detail
			})
		]
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
function TextCell({ value, pending = false }) {
	return /* @__PURE__ */ jsx("td", {
		className: `max-w-60 px-3 py-2 ${pending ? "font-semibold text-destructive" : "text-foreground"}`,
		children: /* @__PURE__ */ jsx("span", {
			className: "line-clamp-2",
			title: value,
			children: value
		})
	});
}
function MoneyCell({ value, strong = false }) {
	return /* @__PURE__ */ jsx("td", {
		className: `px-3 py-2 text-right tabular-nums ${strong ? "font-semibold text-primary-dark" : ""}`,
		children: value === null ? /* @__PURE__ */ jsx("span", {
			className: "font-semibold text-destructive",
			children: "Pendiente"
		}) : money(value)
	});
}
function ProgressCell({ value, tone }) {
	return /* @__PURE__ */ jsx("td", {
		className: "min-w-28 px-3 py-2",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ jsx("div", {
				className: "h-1.5 flex-1 overflow-hidden rounded-sm bg-muted",
				"aria-hidden": true,
				children: /* @__PURE__ */ jsx("div", {
					className: `h-full ${tone === "primary" ? "bg-primary" : "bg-primary-dark"}`,
					style: { width: `${Math.min(value, 100)}%` }
				})
			}), /* @__PURE__ */ jsxs("strong", {
				className: "w-9 text-right tabular-nums",
				children: [value.toFixed(0), "%"]
			})]
		})
	});
}
function NumberCell({ value }) {
	return /* @__PURE__ */ jsx("td", {
		className: "px-3 py-2 text-right font-semibold tabular-nums",
		children: value.toLocaleString("es-PE")
	});
}
var LINK_TONE = {
	Vinculado: "success",
	"Vinculación parcial": "warning",
	"Sin vincular": "destructive"
};
function LinkBadge({ status, compact = false }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: LINK_TONE[status],
		children: compact ? status.replace("Vinculación ", "") : status
	});
}
function ProjectStateBadge({ state }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: state === "En ejecucion" ? "primary" : state === "En revision" ? "warning" : "neutral",
		children: state
	});
}
function PaginationButton({ label, disabled, onClick, children }) {
	return /* @__PURE__ */ jsx(Button, {
		type: "button",
		variant: "outline",
		size: "icon",
		className: "size-8",
		"aria-label": label,
		title: label,
		disabled,
		onClick,
		children
	});
}
//#endregion
export { IntegratedProjectsPage as component };
