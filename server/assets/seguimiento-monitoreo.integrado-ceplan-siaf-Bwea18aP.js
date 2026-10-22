import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { E as Modal, w as registrarExportacion } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as Route$1 } from "./seguimiento-monitoreo.integrado-ceplan-siaf-CH4kcWPH.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { a as predialIndicators, i as physicalTargets, n as integratedPredios, r as integratedProjects, t as getSiafClassifiers } from "./integratedCeplanSiafData-BdiC1vIX.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronRight, FileSpreadsheet, Filter, Layers3, Search, SlidersHorizontal, Target, WalletCards } from "lucide-react";
import writeXlsxFile from "write-excel-file/browser";
//#region src/routes/seguimiento-monitoreo.integrado-ceplan-siaf.tsx?tsr-split=component
var tabDefinitions = [
	{
		id: "financial",
		label: "Análisis financiero",
		icon: WalletCards
	},
	{
		id: "physical",
		label: "Metas físicas",
		icon: Target
	},
	{
		id: "classifier",
		label: "Clasificador SIAF",
		icon: Layers3
	}
];
var moneyFormatter = new Intl.NumberFormat("es-PE", {
	style: "currency",
	currency: "PEN",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});
var compactFormatter = new Intl.NumberFormat("es-PE", {
	notation: "compact",
	maximumFractionDigits: 1
});
function money(value) {
	return moneyFormatter.format(value);
}
function compactMoney(value) {
	return `S/ ${compactFormatter.format(value)}`;
}
function percent(value, total) {
	return total ? value / total * 100 : 0;
}
function buildFinancialRows(project, predios) {
	const common = {
		source: `${project.sourceCode} · ${project.sourceName}`,
		generic: `${project.genericCode} · ${project.genericName}`,
		poi: project.poi,
		pia: project.pia,
		pim: project.pim,
		certification: project.certification,
		commitment: project.commitment,
		accrued: project.accrued,
		drawn: project.drawn,
		paid: project.paid,
		linkStatus: project.linkStatus
	};
	return [
		{
			...common,
			id: "oei",
			parentId: null,
			depth: 0,
			kind: "OEI",
			description: `${project.oei} · ${project.oeiName}`,
			hasChildren: true
		},
		{
			...common,
			id: "aei",
			parentId: "oei",
			depth: 1,
			kind: "AEI",
			description: `${project.aei} · ${project.aeiName}`,
			hasChildren: true
		},
		{
			...common,
			id: "aoi",
			parentId: "aei",
			depth: 2,
			kind: "AOI",
			description: `${project.aoi} · ${project.aoiName}`,
			hasChildren: true
		},
		{
			...common,
			id: "project",
			parentId: "aoi",
			depth: 3,
			kind: "CUI",
			description: `CUI ${project.cui} · ${project.name}`,
			hasChildren: true
		},
		{
			...common,
			id: "meta",
			parentId: "project",
			depth: 4,
			kind: "META",
			description: `Meta SIAF ${project.meta} · Secuencia ${project.functionalSequence}`,
			hasChildren: true
		},
		...predios.map((predio) => ({
			id: predio.code,
			parentId: "meta",
			depth: 5,
			kind: "PREDIO",
			description: `${predio.code} · ${predio.owner}`,
			source: `${project.sourceCode} · ${project.sourceName}`,
			generic: predio.classifier ? project.genericCode : "Sin genérica",
			poi: 0,
			pia: 0,
			pim: project.pim,
			certification: predio.certification,
			commitment: predio.commitment,
			accrued: predio.accrued,
			drawn: predio.drawn,
			paid: predio.paid,
			linkStatus: predio.linkStatus,
			hasChildren: false,
			predio
		}))
	];
}
function IntegratedMonitoringPage() {
	const requestedProjectId = Route$1.useSearch().project;
	const initialProjectId = requestedProjectId && integratedProjects.some((item) => item.id === requestedProjectId) ? requestedProjectId : integratedProjects[0].id;
	const [tab, setTab] = useState("financial");
	const [level, setLevel] = useState("project");
	const [year, setYear] = useState("2026");
	const [projectId, setProjectId] = useState(initialProjectId);
	const [predioCode, setPredioCode] = useState(integratedPredios[0].code);
	const [predioSearch, setPredioSearch] = useState("");
	const [predioResultsOpen, setPredioResultsOpen] = useState(false);
	const [tableSearch, setTableSearch] = useState("");
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [sourceFilter, setSourceFilter] = useState("Todas");
	const [genericFilter, setGenericFilter] = useState("Todas");
	const [stateFilter, setStateFilter] = useState("Todos");
	const [stageFilter, setStageFilter] = useState("Todas");
	const [expanded, setExpanded] = useState(() => /* @__PURE__ */ new Set([
		"oei",
		"aei",
		"aoi",
		"project",
		"meta"
	]));
	const [expandedClassifiers, setExpandedClassifiers] = useState(() => /* @__PURE__ */ new Set());
	const [linkDetail, setLinkDetail] = useState(null);
	const project = integratedProjects.find((item) => item.id === projectId) ?? integratedProjects[0];
	const projectPredios = useMemo(() => integratedPredios.filter((item) => item.projectId === projectId), [projectId]);
	const selectedPredio = projectPredios.find((item) => item.code === predioCode) ?? projectPredios[0];
	const classifiers = useMemo(() => getSiafClassifiers(year, projectId), [projectId, year]);
	const targets = physicalTargets.filter((item) => item.projectId === projectId);
	const indicators = predialIndicators.filter((item) => item.projectId === projectId);
	const predioMatches = useMemo(() => {
		const query = predioSearch.trim().toLocaleLowerCase("es-PE");
		const base = projectPredios.filter((item) => (stateFilter === "Todos" || item.state === stateFilter) && (stageFilter === "Todas" || item.stage === stageFilter));
		if (!query) return base;
		return base.filter((item) => [
			item.code,
			item.file,
			item.owner,
			item.identity,
			item.sector,
			item.section
		].some((value) => value.toLocaleLowerCase("es-PE").includes(query)));
	}, [
		predioSearch,
		projectPredios,
		stageFilter,
		stateFilter
	]);
	const financialRows = useMemo(() => buildFinancialRows(project, projectPredios), [project, projectPredios]);
	const visibleFinancialRows = useMemo(() => {
		if (level === "predio") return financialRows.filter((row) => row.predio?.code === selectedPredio.code);
		const query = tableSearch.trim().toLocaleLowerCase("es-PE");
		const parentById = new Map(financialRows.map((row) => [row.id, row.parentId]));
		const matched = /* @__PURE__ */ new Set();
		financialRows.forEach((row) => {
			const predioMatchesFilters = !row.predio || (stateFilter === "Todos" || row.predio.state === stateFilter) && (stageFilter === "Todas" || row.predio.stage === stageFilter);
			const matchesText = !query || row.description.toLocaleLowerCase("es-PE").includes(query);
			const matchesSource = sourceFilter === "Todas" || row.source.startsWith(sourceFilter);
			const matchesGeneric = genericFilter === "Todas" || row.generic.startsWith(genericFilter);
			if (predioMatchesFilters && matchesText && matchesSource && matchesGeneric) {
				matched.add(row.id);
				let parentId = row.parentId;
				while (parentId) {
					matched.add(parentId);
					parentId = parentById.get(parentId) ?? null;
				}
			}
		});
		return financialRows.filter((row) => {
			if (!matched.has(row.id)) return false;
			let parentId = row.parentId;
			while (parentId) {
				if (!expanded.has(parentId)) return false;
				parentId = parentById.get(parentId) ?? null;
			}
			return true;
		});
	}, [
		expanded,
		financialRows,
		genericFilter,
		level,
		selectedPredio.code,
		sourceFilter,
		stageFilter,
		stateFilter,
		tableSearch
	]);
	const changeProject = (nextId) => {
		const firstPredio = integratedPredios.find((item) => item.projectId === nextId);
		setProjectId(nextId);
		if (firstPredio) setPredioCode(firstPredio.code);
		setPredioSearch("");
		setTableSearch("");
	};
	const toggleExpanded = (id) => {
		setExpanded((current) => {
			const next = new Set(current);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	const exportCurrentTab = async () => {
		if (tab === "financial") {
			await exportSheet("Análisis financiero", [
				"Descripción",
				"Fuente",
				"Genérica",
				"POI programado",
				"PIA SIAF",
				"PIM SIAF",
				"Certificación",
				"Compromiso",
				"Devengado",
				"Girado",
				"Pagado",
				"Saldo",
				"% Eje/PIM",
				"% Eje/POI",
				"Diferencia PIM-POI",
				"Vinculación"
			], visibleFinancialRows.map((row) => [
				row.description,
				row.source,
				row.generic,
				row.poi,
				row.pia,
				row.pim,
				row.certification,
				row.commitment,
				row.accrued,
				row.drawn,
				row.paid,
				row.pim - row.accrued,
				percent(row.accrued, row.pim) / 100,
				percent(row.accrued, row.poi) / 100,
				row.pim - row.poi,
				row.linkStatus
			]), "seguimiento_integrado_financiero");
			return;
		}
		if (tab === "physical") {
			await exportSheet("Metas físicas", [
				"Descripción",
				"Unidad de medida",
				"Meta anual",
				"Programado periodo",
				"Ejecutado periodo",
				"% avance físico",
				"Devengado",
				"% avance financiero",
				"Brecha",
				"Estado"
			], targets.map((item) => [
				item.label,
				item.unit,
				item.annual,
				item.periodPlanned,
				item.periodExecuted,
				percent(item.periodExecuted, item.periodPlanned) / 100,
				item.financialAccrued,
				percent(item.financialAccrued, item.financialPim) / 100,
				(percent(item.periodExecuted, item.periodPlanned) - percent(item.financialAccrued, item.financialPim)) / 100,
				item.state
			]), "seguimiento_integrado_metas_fisicas");
			return;
		}
		await exportSheet("Clasificador SIAF", [
			"Fuente",
			"Rubro",
			"Categoría",
			"Genérica",
			"Subgenérica",
			"Específica",
			"Clasificador",
			"Descripción",
			"Meta",
			"PIA",
			"PIM",
			"Certificado",
			"Compromiso",
			"Devengado",
			"Girado",
			"Pagado"
		], classifiers.map((item) => [
			`${item.sourceCode} · ${item.sourceName}`,
			`${item.itemCode} · ${item.itemName}`,
			`${item.categoryCode} · ${item.categoryName}`,
			`${item.genericCode} · ${item.genericName}`,
			`${item.subgenericCode} · ${item.subgenericName}`,
			`${item.specificCode} · ${item.specificName}`,
			item.code,
			item.description,
			item.meta,
			item.pia,
			item.pim,
			item.certification,
			item.commitment,
			item.accrued,
			item.drawn,
			item.paid
		]), "seguimiento_integrado_clasificadores");
	};
	const filterCount = [
		sourceFilter,
		genericFilter,
		stateFilter,
		stageFilter
	].filter((value) => value !== "Todas" && value !== "Todos").length;
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Layers3,
			titulo: "Seguimiento integrado CEPLAN · SIAF · Gestión Predial",
			descripcion: "Coordinadores · Trazabilidad institucional. Planeamiento, meta física, presupuesto y ejecución predial en una sola matriz.",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: exportCurrentTab,
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar pestaña"]
			})
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: "Datos de demostración. Las cifras de este tablero son de muestra y no provienen de un sistema real."
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Contexto institucional",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ jsx(StatusBadge, {
						tono: "neutral",
						children: "CEPLAN"
					}),
					/* @__PURE__ */ jsx(StatusBadge, {
						tono: "neutral",
						children: "SIAF"
					}),
					/* @__PURE__ */ jsx(StatusBadge, {
						tono: "primary",
						children: "Gestión predial"
					})
				]
			}),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-3 md:grid-cols-2 xl:grid-cols-7",
					children: [
						/* @__PURE__ */ jsx(CompactSelect, {
							label: "Año",
							value: year,
							options: ["2026", "2025"],
							onChange: setYear
						}),
						/* @__PURE__ */ jsx(CompactSelect, {
							label: "Entidad",
							value: `${project.entityCode} · ${project.entity}`,
							options: [`${project.entityCode} · ${project.entity}`]
						}),
						/* @__PURE__ */ jsx(CompactSelect, {
							label: "Pliego",
							value: project.pliego,
							options: [project.pliego]
						}),
						/* @__PURE__ */ jsx(CompactSelect, {
							label: "Unidad ejecutora",
							value: project.executingUnit,
							options: [project.executingUnit]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ jsx(CompactSelect, {
								label: "Proyecto / CUI",
								value: projectId,
								options: integratedProjects.map((item) => item.id),
								optionLabel: (value) => {
									const item = integratedProjects.find((projectItem) => projectItem.id === value);
									return item ? `${item.cui} · ${item.name}` : value;
								},
								onChange: changeProject
							})
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block text-xs font-medium text-foreground",
							children: "Nivel de análisis"
						}), /* @__PURE__ */ jsxs("div", {
							role: "group",
							"aria-label": "Nivel de análisis",
							className: "grid grid-cols-2 gap-1",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								size: "sm",
								variant: level === "project" ? "default" : "outline",
								"aria-pressed": level === "project",
								onClick: () => setLevel("project"),
								children: "Proyecto"
							}), /* @__PURE__ */ jsx(Button, {
								type: "button",
								size: "sm",
								variant: level === "predio" ? "default" : "outline",
								"aria-pressed": level === "predio",
								onClick: () => setLevel("predio"),
								children: "Predio"
							})]
						})] })
					]
				}),
				level === "predio" && /* @__PURE__ */ jsx("div", {
					className: "mt-3 border-t border-border pt-3",
					children: /* @__PURE__ */ jsxs("label", {
						className: "relative block max-w-4xl",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-1 block text-xs font-medium text-foreground",
								children: "Predio seleccionado"
							}),
							/* @__PURE__ */ jsx(Search, {
								size: 16,
								className: "pointer-events-none absolute left-3 top-[30px] text-muted-foreground",
								"aria-hidden": true
							}),
							/* @__PURE__ */ jsx("input", {
								value: predioSearch,
								onFocus: () => setPredioResultsOpen(true),
								onBlur: () => window.setTimeout(() => setPredioResultsOpen(false), 150),
								onChange: (event) => {
									setPredioSearch(event.target.value);
									setPredioResultsOpen(true);
								},
								placeholder: "Buscar código, expediente, DNI/RUC, propietario, sector o tramo",
								className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted pl-9`
							}),
							predioResultsOpen && /* @__PURE__ */ jsxs("div", {
								className: "absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-card p-1 shadow-md",
								children: [predioMatches.map((item) => /* @__PURE__ */ jsxs("button", {
									type: "button",
									onMouseDown: (event) => event.preventDefault(),
									onClick: () => {
										setPredioCode(item.code);
										setPredioSearch("");
										setPredioResultsOpen(false);
									},
									className: `grid w-full grid-cols-[180px_1fr_120px] gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted ${item.code === selectedPredio.code ? "bg-primary-soft text-primary-dark" : ""}`,
									children: [
										/* @__PURE__ */ jsx("strong", { children: item.code }),
										/* @__PURE__ */ jsx("span", {
											className: "truncate",
											children: item.owner
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-right text-muted-foreground",
											children: item.stage
										})
									]
								}, item.code)), !predioMatches.length && /* @__PURE__ */ jsx("p", {
									className: "px-3 py-5 text-center text-sm text-muted-foreground",
									children: "No hay predios que coincidan con los filtros."
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 border-t border-border pt-3",
					children: [/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						className: "text-primary-dark",
						onClick: () => setFiltersOpen((value) => !value),
						"aria-expanded": filtersOpen,
						children: [
							/* @__PURE__ */ jsx(SlidersHorizontal, {}),
							" Filtros de integración",
							filterCount > 0 && /* @__PURE__ */ jsx(StatusBadge, {
								tono: "primary",
								children: filterCount
							}),
							filtersOpen ? /* @__PURE__ */ jsx(ChevronDown, {}) : /* @__PURE__ */ jsx(ChevronRight, {})
						]
					}), filtersOpen && /* @__PURE__ */ jsxs("div", {
						className: "mt-2 grid gap-3 border-t border-border pt-3 md:grid-cols-3 xl:grid-cols-6",
						children: [
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "Centro de costo",
								value: project.costCenter,
								options: [project.costCenter]
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "OEI",
								value: project.oei,
								options: [project.oei]
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "AEI",
								value: project.aei,
								options: [project.aei]
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "Actividad operativa",
								value: project.aoi,
								options: [project.aoi]
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "Meta SIAF",
								value: project.meta,
								options: [project.meta]
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "Fuente de financiamiento",
								value: sourceFilter,
								options: ["Todas", "1"],
								onChange: setSourceFilter
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "Rubro",
								value: project.itemCode,
								options: [project.itemCode]
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "Genérica de gasto",
								value: genericFilter,
								options: [
									"Todas",
									"2.6",
									"2.3"
								],
								onChange: setGenericFilter
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "Estado predial",
								value: stateFilter,
								options: [
									"Todos",
									"Pagado",
									"En proceso",
									"Observado"
								],
								onChange: setStateFilter
							}),
							/* @__PURE__ */ jsx(CompactSelect, {
								label: "Etapa predial",
								value: stageFilter,
								options: [
									"Todas",
									"Diagnóstico",
									"Tasación",
									"Adquisición",
									"Pago",
									"Transferencia interestatal"
								],
								onChange: setStageFilter
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									className: "w-full",
									onClick: () => {
										setSourceFilter("Todas");
										setGenericFilter("Todas");
										setStateFilter("Todos");
										setStageFilter("Todas");
									},
									children: [/* @__PURE__ */ jsx(Filter, {}), " Limpiar filtros"]
								})
							})
						]
					})]
				})
			]
		}),
		level === "predio" && /* @__PURE__ */ jsx(PredioSummary, {
			project,
			predio: selectedPredio,
			onLink: () => setLinkDetail(selectedPredio)
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Indicadores de integración",
			className: "mb-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ jsx(MetricCard, {
						label: "POI programado",
						value: project.poi,
						source: "CEPLAN"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "PIM vigente",
						value: project.pim,
						source: "SIAF"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Devengado",
						value: project.accrued,
						source: "SIAF"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Ejecución / PIM",
						value: percent(project.accrued, project.pim),
						percentValue: true,
						source: "SIAF"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Predios vinculados",
						value: projectPredios.filter((item) => item.linkStatus !== "Sin vincular").length,
						count: true,
						source: "PREDIAL"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Por vincular",
						value: projectPredios.filter((item) => item.linkStatus === "Sin vincular").length,
						count: true,
						source: "CONTROL"
					})
				]
			}), /* @__PURE__ */ jsxs("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx("strong", {
					className: "text-foreground",
					children: "Regla de trazabilidad:"
				}), " Año + Pliego + Unidad Ejecutora + CUI + Meta + Secuencia funcional + AOI + Fuente + Rubro + Clasificador. El devengado SIAF es el indicador principal para comparar la ejecución financiera con CEPLAN."]
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Matriz integrada",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs("div", {
				className: "relative hidden w-64 xl:block",
				children: [/* @__PURE__ */ jsx(Search, {
					size: 16,
					className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("input", {
					value: tableSearch,
					onChange: (event) => setTableSearch(event.target.value),
					placeholder: "Buscar en la matriz",
					"aria-label": "Buscar en la matriz",
					className: `${controlClase} h-8 pl-8`
				})]
			}),
			children: [
				/* @__PURE__ */ jsx(Tabs, {
					value: tab,
					onValueChange: (value) => setTab(value),
					children: /* @__PURE__ */ jsx(TabsList, {
						className: "mb-3 h-auto flex-wrap",
						children: tabDefinitions.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ jsxs(TabsTrigger, {
								value: item.id,
								className: "gap-2",
								children: [
									/* @__PURE__ */ jsx(Icon, {
										size: 16,
										"aria-hidden": true
									}),
									" ",
									item.label
								]
							}, item.id);
						})
					})
				}),
				tab === "financial" && /* @__PURE__ */ jsx(FinancialMatrix, {
					rows: visibleFinancialRows,
					level,
					project,
					expanded,
					onToggle: toggleExpanded,
					onLink: (predio) => setLinkDetail(predio ?? "project")
				}),
				tab === "physical" && /* @__PURE__ */ jsx(PhysicalMatrix, {
					project,
					predio: level === "predio" ? selectedPredio : null,
					targets,
					indicators
				}),
				tab === "classifier" && /* @__PURE__ */ jsx(ClassifierMatrix, {
					project,
					predio: level === "predio" ? selectedPredio : null,
					classifiers,
					predios: projectPredios,
					expanded: expandedClassifiers,
					onToggle: (code) => setExpandedClassifiers((current) => {
						const next = new Set(current);
						if (next.has(code)) next.delete(code);
						else next.add(code);
						return next;
					}),
					onLink: (predio) => setLinkDetail(predio ?? "project")
				})
			]
		}),
		/* @__PURE__ */ jsx(LinkDetailModal, {
			abierto: linkDetail !== null,
			project,
			predio: linkDetail === "project" || linkDetail === null ? null : linkDetail,
			onClose: () => setLinkDetail(null)
		})
	] });
}
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
var TH_NUM = "h-9 whitespace-nowrap px-3 text-right text-xs font-semibold uppercase";
var TH_STICKY = `${TH} sticky left-0 z-20 min-w-96 bg-primary-soft`;
function FinancialMatrix({ rows, level, project, expanded, onToggle, onLink }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(MatrixIntro, {
			title: "Matriz de análisis financiero",
			description: level === "project" ? "Consolidado jerárquico CEPLAN · SIAF con apertura hasta predio." : "Ejecución presupuestal vinculada exclusivamente al predio seleccionado; el PIM se muestra como referencia de la Meta SIAF."
		}),
		/* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[2100px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_STICKY,
						children: "Descripción"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Fuente"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Genérica"
					}),
					[
						"POI prog.",
						"PIA SIAF",
						"PIM SIAF",
						"Certificación",
						"Compromiso",
						"Devengado",
						"Girado",
						"Pagado",
						"Saldo",
						"% Eje/PIM",
						"% Eje/POI",
						"Dif. PIM-POI"
					].map((header) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_NUM,
						children: header
					}, header)),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Vinc."
					})
				] }) }), /* @__PURE__ */ jsxs("tbody", { children: [rows.map((row, index) => {
					const isPredio = row.kind === "PREDIO";
					const saldo = (isPredio ? row.predio?.cost ?? 0 : row.pim) - row.accrued;
					const poiProgress = isPredio ? 0 : percent(row.accrued, row.poi);
					const bg = index % 2 ? "bg-background" : "bg-card";
					return /* @__PURE__ */ jsxs("tr", {
						className: `h-10 border-t border-border ${bg} ${row.depth <= 1 ? "font-semibold" : ""}`,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: `sticky left-0 z-10 px-3 py-2 ${bg}`,
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center",
									style: { paddingLeft: row.depth * 16 },
									children: [
										row.hasChildren ? /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => onToggle(row.id),
											"aria-expanded": expanded.has(row.id),
											"aria-label": expanded.has(row.id) ? "Contraer nivel" : "Expandir nivel",
											className: "mr-1 flex size-6 shrink-0 items-center justify-center rounded-md hover:bg-muted",
											children: expanded.has(row.id) ? /* @__PURE__ */ jsx(ChevronDown, { size: 16 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
										}) : /* @__PURE__ */ jsx("span", { className: "mr-1 size-6 shrink-0" }),
										/* @__PURE__ */ jsx("span", {
											className: "mr-1.5 rounded-sm bg-muted px-1 py-0.5 text-xs font-semibold text-muted-foreground",
											children: row.kind
										}),
										/* @__PURE__ */ jsx("span", {
											className: isPredio ? "font-semibold text-primary-dark" : "text-foreground",
											children: row.description
										})
									]
								})
							}),
							/* @__PURE__ */ jsx(TextCell, { value: row.source }),
							/* @__PURE__ */ jsx(TextCell, { value: row.generic }),
							/* @__PURE__ */ jsx(MoneyCell, {
								value: row.poi,
								empty: isPredio
							}),
							/* @__PURE__ */ jsx(MoneyCell, {
								value: row.pia,
								empty: isPredio
							}),
							/* @__PURE__ */ jsx(MoneyCell, {
								value: row.pim,
								reference: isPredio
							}),
							/* @__PURE__ */ jsx(MoneyCell, { value: row.certification }),
							/* @__PURE__ */ jsx(MoneyCell, { value: row.commitment }),
							/* @__PURE__ */ jsx(MoneyCell, {
								value: row.accrued,
								strong: true
							}),
							/* @__PURE__ */ jsx(MoneyCell, { value: row.drawn }),
							/* @__PURE__ */ jsx(MoneyCell, { value: row.paid }),
							/* @__PURE__ */ jsx(MoneyCell, { value: saldo }),
							/* @__PURE__ */ jsx(PercentCell, { value: percent(row.accrued, row.pim) }),
							/* @__PURE__ */ jsx(PercentCell, {
								value: poiProgress,
								empty: isPredio
							}),
							/* @__PURE__ */ jsx(MoneyCell, {
								value: isPredio ? 0 : row.pim - row.poi,
								empty: isPredio
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 text-center",
								children: /* @__PURE__ */ jsx(LinkButton, {
									status: row.linkStatus,
									onClick: () => onLink(row.predio)
								})
							})
						]
					}, row.id);
				}), !rows.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
					colSpan: 16,
					className: "px-3 py-10 text-center text-sm text-muted-foreground",
					children: "No hay registros para los filtros seleccionados."
				}) })] })]
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("b", { children: "Saldo:" }), " PIM menos Devengado"] }),
				/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("b", { children: "% Eje/PIM:" }), " Devengado ÷ PIM"] }),
				/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("b", { children: "% Eje/POI:" }), " Devengado ÷ POI programado"] }),
				/* @__PURE__ */ jsxs("span", { children: [
					/* @__PURE__ */ jsx("b", { children: "Meta activa:" }),
					" ",
					project.meta,
					" / ",
					project.functionalSequence
				] })
			]
		})
	] });
}
function PhysicalMatrix({ project, predio, targets, indicators }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(MatrixIntro, {
			title: "Matriz de metas físicas",
			description: "Compara la meta oficial CEPLAN con el avance operativo predial y el devengado SIAF."
		}),
		/* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1350px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_STICKY,
						children: "Descripción"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "U.M. CEPLAN"
					}),
					[
						"Meta anual",
						"Programado periodo",
						"Ejecutado periodo",
						"% avance físico",
						"Devengado SIAF",
						"% avance financiero",
						"Brecha p.p."
					].map((header) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH_NUM,
						children: header
					}, header)),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: TH,
						children: "Estado"
					})
				] }) }), /* @__PURE__ */ jsxs("tbody", { children: [
					/* @__PURE__ */ jsx(HierarchyTextRow, {
						depth: 0,
						label: `${project.oei} · ${project.oeiName}`,
						tag: "OEI"
					}),
					/* @__PURE__ */ jsx(HierarchyTextRow, {
						depth: 1,
						label: `${project.aei} · ${project.aeiName}`,
						tag: "AEI"
					}),
					/* @__PURE__ */ jsx(HierarchyTextRow, {
						depth: 2,
						label: `${project.aoi} · ${project.aoiName}`,
						tag: "AOI"
					}),
					targets.map((item, index) => {
						const physical = percent(item.periodExecuted, item.periodPlanned);
						const financial = percent(item.financialAccrued, item.financialPim);
						const gap = physical - financial;
						const bg = index % 2 ? "bg-background" : "bg-card";
						return /* @__PURE__ */ jsxs("tr", {
							className: `h-10 border-t border-border ${bg}`,
							children: [
								/* @__PURE__ */ jsx("td", {
									className: `sticky left-0 z-10 px-3 py-2 ${bg}`,
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center pl-12",
										children: [/* @__PURE__ */ jsx("span", {
											className: "mr-1.5 rounded-sm bg-primary-soft px-1 py-0.5 text-xs font-semibold text-primary-dark",
											children: "META"
										}), /* @__PURE__ */ jsx("span", {
											className: "font-semibold",
											children: item.label
										})]
									})
								}),
								/* @__PURE__ */ jsx(TextCell, { value: item.unit }),
								/* @__PURE__ */ jsx(NumberCell, { value: item.annual }),
								/* @__PURE__ */ jsx(NumberCell, { value: item.periodPlanned }),
								/* @__PURE__ */ jsx(NumberCell, { value: item.periodExecuted }),
								/* @__PURE__ */ jsx(PercentCell, { value: physical }),
								/* @__PURE__ */ jsx(MoneyCell, {
									value: item.financialAccrued,
									strong: true
								}),
								/* @__PURE__ */ jsx(PercentCell, { value: financial }),
								/* @__PURE__ */ jsxs("td", {
									className: `px-3 py-2 text-right font-semibold tabular-nums ${gap > 20 ? "text-destructive" : gap > 10 ? "text-warning" : "text-success"}`,
									children: [gap.toFixed(1), " p.p."]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 text-center",
									children: /* @__PURE__ */ jsx(GapBadge, { gap })
								})
							]
						}, item.id);
					})
				] })]
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(Subtitulo, { children: "Indicadores complementarios de Gestión Predial" }),
				/* @__PURE__ */ jsx("p", {
					className: "mb-2 text-xs text-muted-foreground",
					children: "Explican el avance operativo; no reemplazan la meta oficial CEPLAN."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto rounded-md border border-border",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH,
							children: "Indicador predial"
						}), [
							"Programado",
							"Ejecutado",
							"Pendiente",
							"Avance"
						].map((h) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: TH_NUM,
							children: h
						}, h))] }) }), /* @__PURE__ */ jsx("tbody", {
							className: "[&>tr:nth-child(even)]:bg-background",
							children: indicators.map((item) => /* @__PURE__ */ jsxs("tr", {
								className: "h-10 border-t border-border",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 font-medium",
										children: item.label
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-right tabular-nums",
										children: item.planned
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-right tabular-nums",
										children: item.executed
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-3 py-2 text-right tabular-nums",
										children: item.planned - item.executed
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-3 py-2 text-right font-semibold tabular-nums text-primary-dark",
										children: [percent(item.executed, item.planned).toFixed(1), "%"]
									})
								]
							}, item.label))
						})]
					})
				})
			] }), predio ? /* @__PURE__ */ jsx(PredioContribution, {
				project,
				predio,
				indicators
			}) : /* @__PURE__ */ jsxs("p", {
				className: "flex items-center justify-center rounded-md border border-dashed border-border p-5 text-center text-sm text-muted-foreground",
				children: [
					"Seleccione el nivel ",
					/* @__PURE__ */ jsx("b", {
						className: "mx-1 text-foreground",
						children: "Predio"
					}),
					" para identificar su contribución a la meta física."
				]
			})]
		})
	] });
}
function ClassifierMatrix({ project, predio, classifiers, predios, expanded, onToggle, onLink }) {
	const visibleClassifiers = predio ? classifiers.filter((item) => item.code === predio.classifier) : classifiers;
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(MatrixIntro, {
		title: "Matriz por clasificador SIAF",
		description: `Catálogo presupuestal ${project.year} cargado desde la configuración SIAF; conserva código y descripción oficial.`
	}), /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full min-w-[2050px] text-sm",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
				[
					"Fuente",
					"Rubro",
					"Categoría",
					"Genérica",
					"Subgenérica",
					"Específica",
					"Clasificador",
					"Meta",
					"Expediente / Predio"
				].map((header) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: header
				}, header)),
				[
					"PIA",
					"PIM",
					"Certificado",
					"Compromiso",
					"Devengado",
					"Girado",
					"Pagado",
					"Saldo"
				].map((header) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH_NUM,
					children: header
				}, header)),
				/* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: "Vinc."
				})
			] }) }), /* @__PURE__ */ jsxs("tbody", { children: [visibleClassifiers.flatMap((item, index) => {
				const relatedPredios = predio ? [predio] : predios.filter((predioItem) => predioItem.classifier === item.code);
				const open = expanded.has(item.code) || Boolean(predio);
				return [/* @__PURE__ */ jsxs("tr", {
					className: `h-10 border-t border-border ${index % 2 ? "bg-background" : "bg-card"}`,
					children: [
						/* @__PURE__ */ jsxs("td", {
							className: "px-3 py-2 font-semibold",
							children: [
								item.sourceCode,
								" · ",
								item.sourceName
							]
						}),
						/* @__PURE__ */ jsx(TextCell, { value: `${item.itemCode} · ${item.itemName}` }),
						/* @__PURE__ */ jsx(TextCell, { value: `${item.categoryCode} · ${item.categoryName}` }),
						/* @__PURE__ */ jsx(TextCell, { value: `${item.genericCode} · ${item.genericName}` }),
						/* @__PURE__ */ jsx(TextCell, { value: `${item.subgenericCode} · ${item.subgenericName}` }),
						/* @__PURE__ */ jsx(TextCell, { value: `${item.specificCode} · ${item.specificName}` }),
						/* @__PURE__ */ jsx("td", {
							className: "px-3 py-2",
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => onToggle(item.code),
								"aria-expanded": open,
								className: "inline-flex items-start gap-1.5 text-left font-semibold text-primary-dark hover:underline",
								children: [open ? /* @__PURE__ */ jsx(ChevronDown, { size: 16 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 16 }), /* @__PURE__ */ jsxs("span", { children: [item.code, /* @__PURE__ */ jsx("small", {
									className: "block text-xs font-normal text-muted-foreground",
									children: item.description
								})] })]
							})
						}),
						/* @__PURE__ */ jsx(TextCell, { value: item.meta }),
						/* @__PURE__ */ jsx(TextCell, { value: `${relatedPredios.length} predio(s)` }),
						/* @__PURE__ */ jsx(MoneyCell, { value: item.pia }),
						/* @__PURE__ */ jsx(MoneyCell, { value: item.pim }),
						/* @__PURE__ */ jsx(MoneyCell, { value: item.certification }),
						/* @__PURE__ */ jsx(MoneyCell, { value: item.commitment }),
						/* @__PURE__ */ jsx(MoneyCell, {
							value: item.accrued,
							strong: true
						}),
						/* @__PURE__ */ jsx(MoneyCell, { value: item.drawn }),
						/* @__PURE__ */ jsx(MoneyCell, { value: item.paid }),
						/* @__PURE__ */ jsx(MoneyCell, { value: item.pim - item.accrued }),
						/* @__PURE__ */ jsx("td", {
							className: "px-3 py-2 text-center",
							children: /* @__PURE__ */ jsx(LinkButton, {
								status: project.linkStatus,
								onClick: () => onLink()
							})
						})
					]
				}, item.code), ...open ? relatedPredios.map((predioItem) => /* @__PURE__ */ jsxs("tr", {
					className: "h-10 border-t border-border bg-primary-soft/40",
					children: [
						/* @__PURE__ */ jsx("td", {
							colSpan: 6,
							className: "px-3 py-2 text-right text-xs font-semibold uppercase text-muted-foreground",
							children: "Predio vinculado"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "px-3 py-2 pl-6 text-primary-dark",
							children: item.code
						}),
						/* @__PURE__ */ jsx("td", {
							className: "px-3 py-2",
							children: project.meta
						}),
						/* @__PURE__ */ jsxs("td", {
							className: "px-3 py-2",
							children: [/* @__PURE__ */ jsx("strong", { children: predioItem.code }), /* @__PURE__ */ jsx("small", {
								className: "block text-xs text-muted-foreground",
								children: predioItem.siafFile || "Sin expediente SIAF"
							})]
						}),
						/* @__PURE__ */ jsx(MoneyCell, {
							value: 0,
							empty: true
						}),
						/* @__PURE__ */ jsx(MoneyCell, {
							value: project.pim,
							reference: true
						}),
						/* @__PURE__ */ jsx(MoneyCell, { value: predioItem.certification }),
						/* @__PURE__ */ jsx(MoneyCell, { value: predioItem.commitment }),
						/* @__PURE__ */ jsx(MoneyCell, {
							value: predioItem.accrued,
							strong: true
						}),
						/* @__PURE__ */ jsx(MoneyCell, { value: predioItem.drawn }),
						/* @__PURE__ */ jsx(MoneyCell, { value: predioItem.paid }),
						/* @__PURE__ */ jsx(MoneyCell, { value: Math.max(predioItem.cost - predioItem.paid, 0) }),
						/* @__PURE__ */ jsx("td", {
							className: "px-3 py-2 text-center",
							children: /* @__PURE__ */ jsx(LinkButton, {
								status: predioItem.linkStatus,
								onClick: () => onLink(predioItem)
							})
						})
					]
				}, `${item.code}-${predioItem.code}`)) : []];
			}), !visibleClassifiers.length && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
				colSpan: 18,
				className: "px-3 py-10 text-center text-sm text-muted-foreground",
				children: "No existen clasificadores cargados para el año, proyecto o predio seleccionado."
			}) })] })]
		})
	})] });
}
function PredioSummary({ project, predio, onLink }) {
	const pending = Math.max(predio.cost - predio.paid, 0);
	const values = [
		["Costo reconocido", predio.cost],
		["Monto vinculado", predio.linkedAmount],
		["Certificado", predio.certification],
		["Comprometido", predio.commitment],
		["Devengado", predio.accrued],
		["Girado", predio.drawn],
		["Pagado", predio.paid],
		["Pendiente", pending]
	];
	return /* @__PURE__ */ jsxs(Section, {
		titulo: `${predio.code} · ${predio.owner}`,
		className: "mb-4",
		acciones: /* @__PURE__ */ jsx(LinkButton, {
			status: predio.linkStatus,
			onClick: onLink
		}),
		children: [/* @__PURE__ */ jsxs("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: [
				"CUI ",
				project.cui,
				" · Meta ",
				project.meta,
				" · ",
				predio.file,
				" · ",
				predio.stage
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8",
			children: values.map(([label, value]) => /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg border border-border bg-card p-3",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ jsx("div", {
					className: `mt-1 text-lg font-semibold tabular-nums ${label === "Pendiente" ? "text-destructive" : "text-foreground"}`,
					children: compactMoney(value)
				})]
			}, label))
		})]
	});
}
function PredioContribution({ project, predio, indicators }) {
	const paidIndicator = indicators.find((item) => item.label === "Predios pagados") ?? indicators[0];
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Subtitulo, {
		acciones: /* @__PURE__ */ jsx(StatusBadge, {
			tono: "primary",
			children: "Gestión predial"
		}),
		children: "Contribución del predio a la meta"
	}), /* @__PURE__ */ jsxs("dl", {
		className: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm",
		children: [
			/* @__PURE__ */ jsx(DetailTerm, {
				label: "Actividad operativa",
				value: `${project.aoi} · ${project.aoiName}`,
				wide: true
			}),
			/* @__PURE__ */ jsx(DetailTerm, {
				label: "Meta física asociada",
				value: `${paidIndicator.executed} de ${paidIndicator.planned} predios ejecutados`,
				wide: true
			}),
			/* @__PURE__ */ jsx(DetailTerm, {
				label: "Código predial",
				value: predio.code
			}),
			/* @__PURE__ */ jsx(DetailTerm, {
				label: "Estado / etapa",
				value: `${predio.state} · ${predio.stage}`
			}),
			/* @__PURE__ */ jsx(DetailTerm, {
				label: "Tasación",
				value: predio.appraisalState
			}),
			/* @__PURE__ */ jsx(DetailTerm, {
				label: "Pago",
				value: predio.paymentState
			}),
			/* @__PURE__ */ jsx(DetailTerm, {
				label: "Inscripción",
				value: predio.registrationState
			}),
			/* @__PURE__ */ jsx(DetailTerm, {
				label: "Avance de la meta",
				value: `${percent(paidIndicator.executed, paidIndicator.planned).toFixed(1)}%`
			})
		]
	})] });
}
function LinkDetailModal({ abierto, project, predio, onClose }) {
	const status = predio?.linkStatus ?? project.linkStatus;
	return /* @__PURE__ */ jsx(Modal, {
		abierto,
		onCerrar: onClose,
		titulo: "Detalle de vinculación CEPLAN · SIAF · Gestión Predial",
		descripcion: "La homologación prioriza códigos oficiales, no coincidencias de texto.",
		ancho: "lg",
		pie: /* @__PURE__ */ jsxs("div", {
			className: "flex w-full flex-wrap items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-xs",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-semibold text-muted-foreground",
					children: "Estado:"
				}), /* @__PURE__ */ jsx(LinkBadge, { status })]
			}), /* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: onClose,
				children: "Cerrar detalle"
			})]
		}),
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ jsx(DetailPanel, {
					title: "CEPLAN",
					rows: [
						["OEI", `${project.oei} · ${project.oeiName}`],
						["AEI", `${project.aei} · ${project.aeiName}`],
						["Actividad Operativa", `${project.aoi} · ${project.aoiName}`],
						["Centro de costo", project.costCenter],
						["Meta física", "Predios con proceso de adquisición y liberación"],
						["POI programado", money(project.poi)]
					]
				}),
				/* @__PURE__ */ jsx(DetailPanel, {
					title: "SIAF",
					rows: [
						["Proyecto / CUI", project.cui],
						["Meta / secuencia", `${project.meta} / ${project.functionalSequence}`],
						["Fuente", `${project.sourceCode} · ${project.sourceName}`],
						["Rubro", `${project.itemCode} · ${project.itemName}`],
						["Genérica", `${project.genericCode} · ${project.genericName}`],
						["Clasificador", predio?.classifier || "Por homologar"]
					]
				}),
				/* @__PURE__ */ jsx(DetailPanel, {
					title: "Gestión predial",
					rows: [
						["Proyecto", project.name],
						["Código predial", predio?.code ?? `${integratedPredios.filter((item) => item.projectId === project.id).length} predios`],
						["Expediente", predio?.file ?? "Consolidado del proyecto"],
						["Sujeto pasivo", predio?.owner ?? "Múltiples sujetos pasivos"],
						["Etapa", predio?.stage ?? "Múltiples etapas"],
						["Costo predial", predio ? money(predio.cost) : "Consolidado"]
					]
				})
			]
		})
	});
}
function CompactSelect({ label, value, options, optionLabel, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block truncate text-xs font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ jsx("select", {
			value,
			onChange: (event) => onChange?.(event.target.value),
			disabled: !onChange,
			className: controlClase,
			children: options.map((option) => /* @__PURE__ */ jsx("option", {
				value: option,
				children: optionLabel ? optionLabel(option) : option
			}, option))
		})]
	});
}
function MetricCard({ label, value, source, percentValue = false, count = false }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ jsx("span", {
				className: "text-xs font-semibold text-muted-foreground",
				children: source
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-1 text-lg font-semibold tabular-nums text-foreground",
			children: percentValue ? `${value.toFixed(1)}%` : count ? value : compactMoney(value)
		})]
	});
}
function MatrixIntro({ title, description }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-3 flex flex-wrap items-center justify-between gap-2",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
			className: "text-sm font-semibold text-foreground",
			children: title
		}), /* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: description
		})] }), /* @__PURE__ */ jsx("div", {
			className: "text-xs text-muted-foreground",
			children: "Importes en soles · Devengado como indicador financiero principal"
		})]
	});
}
function TextCell({ value }) {
	return /* @__PURE__ */ jsx("td", {
		className: "max-w-56 px-3 py-2",
		children: /* @__PURE__ */ jsx("span", {
			className: "line-clamp-2",
			title: value,
			children: value
		})
	});
}
function MoneyCell({ value, empty = false, strong = false, reference = false }) {
	return /* @__PURE__ */ jsx("td", {
		className: `px-3 py-2 text-right tabular-nums ${strong ? "font-semibold text-primary-dark" : ""}`,
		children: empty ? "" : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", { children: money(value) }), reference && /* @__PURE__ */ jsx("small", {
			className: "block text-xs text-muted-foreground",
			children: "Referencia Meta"
		})] })
	});
}
function PercentCell({ value, empty = false }) {
	return /* @__PURE__ */ jsx("td", {
		className: "px-3 py-2 text-right font-semibold tabular-nums",
		children: empty ? "" : `${value.toFixed(1)}%`
	});
}
function NumberCell({ value }) {
	return /* @__PURE__ */ jsx("td", {
		className: "px-3 py-2 text-right tabular-nums",
		children: value.toLocaleString("es-PE")
	});
}
function HierarchyTextRow({ depth, label, tag }) {
	return /* @__PURE__ */ jsxs("tr", {
		className: "h-10 border-t border-border bg-background font-semibold",
		children: [/* @__PURE__ */ jsxs("td", {
			className: "sticky left-0 z-10 bg-background px-3 py-2",
			style: { paddingLeft: 12 + depth * 16 },
			children: [/* @__PURE__ */ jsx("span", {
				className: "mr-1.5 rounded-sm bg-muted px-1 py-0.5 text-xs font-semibold text-muted-foreground",
				children: tag
			}), label]
		}), /* @__PURE__ */ jsx("td", {
			colSpan: 9,
			className: "px-3 py-2 text-xs font-normal text-muted-foreground",
			children: "Nivel jerárquico de planeamiento"
		})]
	});
}
var LINK_TONE = {
	Vinculado: "success",
	"Vinculación parcial": "warning",
	"Sin vincular": "destructive"
};
function LinkBadge({ status }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: LINK_TONE[status],
		children: status
	});
}
function LinkButton({ status, onClick }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick,
		title: "Ver detalle de vinculación",
		"aria-label": `Ver detalle de vinculación: ${status}`,
		className: "rounded-sm hover:opacity-80",
		children: /* @__PURE__ */ jsx(LinkBadge, { status })
	});
}
function GapBadge({ gap }) {
	if (Math.abs(gap) <= 8) return /* @__PURE__ */ jsx(StatusBadge, {
		tono: "success",
		children: "Avance consistente"
	});
	if (Math.abs(gap) <= 20) return /* @__PURE__ */ jsx(StatusBadge, {
		tono: "warning",
		children: "Diferencia moderada"
	});
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: "destructive",
		children: "Brecha alta"
	});
}
function DetailTerm({ label, value, wide = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: wide ? "col-span-2" : "",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "mt-0.5 font-semibold text-foreground",
			children: value
		})]
	});
}
function DetailPanel({ title, rows }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "overflow-hidden rounded-md border border-border",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "border-b border-border bg-primary-soft px-3 py-2 text-sm font-semibold uppercase text-primary-dark",
			children: title
		}), /* @__PURE__ */ jsx("dl", {
			className: "divide-y divide-border p-3 text-sm",
			children: rows.map(([label, value]) => /* @__PURE__ */ jsxs("div", {
				className: "py-1.5",
				children: [/* @__PURE__ */ jsx("dt", {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ jsx("dd", {
					className: "mt-0.5 font-medium text-foreground",
					children: value
				})]
			}, label))
		})]
	});
}
async function exportSheet(title, headers, rows, filename) {
	const monetaryStart = title === "Metas físicas" ? 6 : title === "Clasificador SIAF" ? 9 : 3;
	await writeXlsxFile([headers.map((value) => ({
		value,
		fontWeight: "bold",
		wrap: true
	})), ...rows.map((row) => row.map((value, index) => ({
		value,
		type: typeof value === "number" ? Number : String,
		format: typeof value === "number" && index >= monetaryStart ? "#,##0.00" : void 0,
		wrap: true
	})))], {
		sheet: title.slice(0, 31),
		stickyRowsCount: 1,
		orientation: "landscape",
		columns: headers.map((header, index) => ({ width: index === 0 ? 42 : Math.max(14, Math.min(24, header.length + 3)) }))
	}).toFile(`${filename}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
	registrarExportacion(filename, "Excel");
}
//#endregion
export { IntegratedMonitoringPage as component };
