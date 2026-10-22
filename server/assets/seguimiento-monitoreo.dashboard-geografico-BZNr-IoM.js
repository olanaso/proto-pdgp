import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as geographicProjects } from "./geographicDashboardData-DjefOkoP.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, Download, FileDown, Layers3, MapPin, Maximize2, RefreshCcw, Search } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/routes/seguimiento-monitoreo.dashboard-geografico.tsx?tsr-split=component
function ClientProjectMap(props) {
	const [MapComponent, setMapComponent] = useState(null);
	useEffect(() => {
		import("./GeographicProjectsMap-BHlJdIyf.js").then((module) => setMapComponent(() => module.default));
	}, []);
	if (!MapComponent) return /* @__PURE__ */ jsx("div", {
		className: "flex h-full items-center justify-center bg-muted text-xs text-muted-foreground",
		children: "Cargando cartografía de proyectos…"
	});
	return /* @__PURE__ */ jsx(MapComponent, { ...props });
}
var EMPTY_FILTERS = {
	year: "2026",
	project: "TODOS",
	type: "TODOS",
	department: "TODOS",
	province: "TODOS",
	tramo: "TODOS",
	sector: "TODOS",
	state: "TODOS",
	predialState: "TODOS",
	risk: "TODOS",
	responsible: "TODOS"
};
var C = {
	primary: "var(--color-primary)",
	dark: "var(--color-primary-dark)",
	highlight: "var(--color-highlight)",
	muted: "var(--color-muted-foreground)",
	border: "var(--color-border)"
};
var SERIES = [
	{
		fill: C.primary,
		opacity: 1
	},
	{
		fill: C.dark,
		opacity: 1
	},
	{
		fill: C.highlight,
		opacity: 1
	},
	{
		fill: C.muted,
		opacity: 1
	},
	{
		fill: C.primary,
		opacity: .5
	},
	{
		fill: C.dark,
		opacity: .5
	},
	{
		fill: C.highlight,
		opacity: .5
	},
	{
		fill: C.muted,
		opacity: .5
	}
];
var TICK = {
	fontSize: 12,
	fill: C.muted
};
var LEGEND = { fontSize: 12 };
var PHASES = [
	"Identificado",
	"Diagnóstico",
	"Expediente",
	"Tasación",
	"Negociación",
	"Pago aprobado",
	"Pagado",
	"Entregado",
	"Inscrito",
	"Cerrado"
];
function unique(values) {
	return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}
function money(value) {
	return `S/ ${(value / 1e6).toLocaleString("es-PE", { maximumFractionDigits: 1 })} MM`;
}
function percentage(value, total) {
	return total ? value / total * 100 : 0;
}
function riskTone(risk) {
	if (risk === "Crítico" || risk === "Alto") return "destructive";
	if (risk === "Moderado" || risk === "Medio") return "warning";
	return "success";
}
function buildFunnel(projects, kind) {
	const properties = projects.reduce((sum, item) => sum + item.properties, 0);
	const paid = projects.reduce((sum, item) => sum + item.paid, 0);
	const delivered = projects.reduce((sum, item) => sum + item.delivered, 0);
	const registered = projects.reduce((sum, item) => sum + item.registered, 0);
	const values = kind === "general" ? [
		["Identificados", properties],
		["Diagnosticados", Math.round(properties * .93)],
		["Empadronados", Math.round(properties * .87)],
		["Expediente Técnico-Legal", Math.round(properties * .79)],
		["Tasación", Math.round(properties * .72)],
		["Negociación / Trato Directo", Math.round(properties * .66)],
		["Aprobación de Pago", Math.max(paid, Math.round(properties * .59))],
		["Pagados", paid],
		["Entregados", delivered],
		["Inscritos", registered],
		["Cerrados", Math.round(registered * .82)]
	] : kind === "physical" ? [
		["Predios Requeridos", properties],
		["Expediente Completo", Math.round(properties * .79)],
		["Predios Tasados", Math.round(properties * .72)],
		["Pago Aprobado", Math.max(paid, Math.round(properties * .59))],
		["Predios Pagados", paid],
		["Predios Entregados", delivered],
		["Disponibles para Obra", Math.round(delivered * .93)]
	] : [
		["Predios Estimados", properties],
		["Predios Tasados", Math.round(properties * .72)],
		["Presupuesto Disponible", Math.round(properties * .67)],
		["Predios Certificados", Math.round(properties * .61)],
		["Predios Devengados", Math.round(properties * .56)],
		["Predios Girados", Math.round(properties * .53)],
		["Predios Pagados", paid]
	];
	return values.map(([label, rawValue], index) => {
		const value = Number(rawValue);
		const previous = index ? Number(values[index - 1][1]) : value;
		return {
			label: String(label),
			value,
			totalPct: percentage(value, properties),
			conversion: percentage(value, previous),
			stopped: Math.max(previous - value, 0)
		};
	});
}
function buildPredialRows(project) {
	const responsibleNames = [
		project.responsible,
		"María Salazar Rojas",
		"Luis Quispe Ramos",
		"Patricia Núñez Soto"
	];
	return Array.from({ length: 14 }, (_, index) => {
		const phase = PHASES[(index * 3 + project.code.length) % PHASES.length];
		const appraised = 185e3 + index * 47500 + project.properties * 320;
		const approved = Math.round(appraised * (.94 + index % 4 * .02));
		const paid = [
			"Pagado",
			"Entregado",
			"Inscrito",
			"Cerrado"
		].includes(phase) ? approved : 0;
		const alert = index % 7 === 0 ? "Crítico" : index % 5 === 0 ? "Próximo a vencer" : phase === "Cerrado" ? "Cerrado" : "En proceso";
		return {
			code: `${project.code}-PR-${String(index + 41).padStart(4, "0")}`,
			sector: `${project.sector} ${1 + index % 3}`,
			area: 280 + index * 83,
			subject: `Sujeto pasivo demostrativo ${index + 1}`,
			phase,
			appraised,
			approved,
			paid,
			delivery: [
				"Entregado",
				"Inscrito",
				"Cerrado"
			].includes(phase) ? "Entregado" : "Pendiente",
			registry: phase === "Inscrito" || phase === "Cerrado" ? "Inscrito" : index % 5 === 0 ? "Observado" : "Pendiente",
			days: 7 + index * 4,
			responsible: responsibleNames[index % responsibleNames.length],
			alert
		};
	});
}
function exportProjects(items, selectedPhase) {
	const rows = [[
		"Código",
		"Proyecto",
		"Tipo",
		"Departamento",
		"Inversión",
		"Ejecutado",
		"Avance físico",
		"Predios",
		"Pagados",
		"Entregados",
		"Inscritos",
		"Riesgo"
	], ...items.map((item) => [
		item.code,
		item.name,
		item.type,
		item.department,
		item.investment,
		item.executed,
		item.physical,
		item.properties,
		item.paid,
		item.delivered,
		item.registered,
		item.risk
	])];
	const html = `<html><head><meta charset="utf-8"></head><body><h3>Dashboard geográfico</h3><p>Fase seleccionada: ${selectedPhase || "Todas"}</p><table border="1">${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</table></body></html>`;
	const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = "dashboard_geografico_proyectos.xls";
	anchor.click();
	URL.revokeObjectURL(url);
}
var TH = "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase";
var TR = "h-10 border-t border-border";
var TD = "px-3 py-1.5";
function GeographicDashboardPage() {
	const [filters, setFilters] = useState(EMPTY_FILTERS);
	const [selectedProject, setSelectedProject] = useState(null);
	const [selectedPhase, setSelectedPhase] = useState("");
	const [sideTab, setSideTab] = useState("Financiero");
	const [search, setSearch] = useState("");
	const [sortDesc, setSortDesc] = useState(true);
	const filtered = useMemo(() => geographicProjects.filter((item) => {
		if (filters.project !== "TODOS" && item.id !== filters.project) return false;
		if (filters.type !== "TODOS" && item.type !== filters.type) return false;
		if (filters.department !== "TODOS" && item.department !== filters.department) return false;
		if (filters.province !== "TODOS" && item.province !== filters.province) return false;
		if (filters.tramo !== "TODOS" && item.tramo !== filters.tramo) return false;
		if (filters.sector !== "TODOS" && item.sector !== filters.sector) return false;
		if (filters.state !== "TODOS" && item.state !== filters.state) return false;
		if (filters.predialState !== "TODOS" && item.predialState !== filters.predialState) return false;
		if (filters.risk !== "TODOS" && item.risk !== filters.risk) return false;
		if (filters.responsible !== "TODOS" && item.responsible !== filters.responsible) return false;
		return true;
	}), [filters]);
	useEffect(() => {
		if (selectedProject && !filtered.some((item) => item.id === selectedProject.id)) setSelectedProject(null);
	}, [filtered, selectedProject]);
	const scope = selectedProject ? [selectedProject] : filtered;
	const totalInvestment = scope.reduce((sum, item) => sum + item.investment, 0);
	const totalExecuted = scope.reduce((sum, item) => sum + item.executed, 0);
	const totalProperties = scope.reduce((sum, item) => sum + item.properties, 0);
	const totalDelivered = scope.reduce((sum, item) => sum + item.delivered, 0);
	const totalCritical = scope.reduce((sum, item) => sum + item.critical, 0);
	const physicalAverage = scope.length ? scope.reduce((sum, item) => sum + item.physical, 0) / scope.length : 0;
	const projectRows = [...filtered].filter((item) => `${item.code} ${item.name} ${item.department}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sortDesc ? b.investment - a.investment : a.name.localeCompare(b.name));
	const predialBase = selectedProject ?? filtered[0] ?? geographicProjects[0];
	const allPredialRows = buildPredialRows(predialBase);
	const matchingPredialRows = selectedPhase ? allPredialRows.filter((row) => row.phase.toLowerCase().includes(selectedPhase.split(" ")[0].toLowerCase())) : allPredialRows;
	const predialRows = matchingPredialRows.length ? matchingPredialRows : allPredialRows;
	const update = (key, value) => {
		setFilters((current) => ({
			...current,
			[key]: value
		}));
		setSelectedProject(null);
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: MapPin,
			titulo: "Dashboard geográfico",
			descripcion: "Seguimiento territorial, financiero, físico y predial de proyectos de infraestructura.",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => {
						setFilters(EMPTY_FILTERS);
						setSelectedProject(null);
						setSelectedPhase("");
					},
					children: [/* @__PURE__ */ jsx(RefreshCcw, {}), " Restablecer filtros"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => exportProjects(scope, selectedPhase),
					children: [/* @__PURE__ */ jsx(Download, {}), " Exportar Excel"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ jsx(FileDown, {}), " Exportar PDF"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => document.getElementById("project-table")?.scrollIntoView({ behavior: "smooth" }),
					children: [/* @__PURE__ */ jsx(Maximize2, {}), " Ir a la tabla de proyectos"]
				})
			] })
		}),
		/* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-1.5 text-xs text-warning",
			children: "Datos de demostración: cifras coherentes pero no conectadas a un servicio · actualización 07/08/2026."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Filtros geográficos y de gestión",
			className: "mb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Año",
						value: filters.year,
						options: [
							"2026",
							"2025",
							"2024"
						],
						includeAll: false,
						onChange: (value) => update("year", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Proyecto",
						value: filters.project,
						options: geographicProjects.map((item) => ({
							label: item.name,
							value: item.id
						})),
						onChange: (value) => update("project", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Tipo de proyecto",
						value: filters.type,
						options: unique(geographicProjects.map((item) => item.type)),
						onChange: (value) => update("type", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Departamento",
						value: filters.department,
						options: unique(geographicProjects.map((item) => item.department)),
						onChange: (value) => update("department", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Provincia",
						value: filters.province,
						options: unique(geographicProjects.map((item) => item.province)),
						onChange: (value) => update("province", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Tramo",
						value: filters.tramo,
						options: unique(geographicProjects.map((item) => item.tramo)),
						onChange: (value) => update("tramo", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Sector",
						value: filters.sector,
						options: unique(geographicProjects.map((item) => item.sector)),
						onChange: (value) => update("sector", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado del proyecto",
						value: filters.state,
						options: unique(geographicProjects.map((item) => item.state)),
						onChange: (value) => update("state", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado predial",
						value: filters.predialState,
						options: unique(geographicProjects.map((item) => item.predialState)),
						onChange: (value) => update("predialState", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Riesgo",
						value: filters.risk,
						options: unique(geographicProjects.map((item) => item.risk)),
						onChange: (value) => update("risk", value)
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Responsable",
						value: filters.responsible,
						options: unique(geographicProjects.map((item) => item.responsible)),
						onChange: (value) => update("responsible", value)
					})
				]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid grid-cols-2 gap-4 md:grid-cols-4 2xl:grid-cols-8",
			"aria-label": "Indicadores",
			children: [
				/* @__PURE__ */ jsx(Kpi, {
					label: "Total de proyectos",
					value: scope.length,
					detail: "Cobertura nacional",
					tono: "text-primary-dark"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Inversión total",
					value: money(totalInvestment),
					detail: "+4.8% vs. periodo anterior",
					tono: "text-primary-dark"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Ejecución financiera",
					value: `${percentage(totalExecuted, totalInvestment).toFixed(1)}%`,
					detail: money(totalExecuted),
					tono: "text-success"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Avance físico promedio",
					value: `${physicalAverage.toFixed(1)}%`,
					detail: "-1.9 pp frente a meta",
					tono: physicalAverage >= 65 ? "text-success" : "text-warning"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Predios requeridos",
					value: totalProperties.toLocaleString("es-PE"),
					detail: "Universo predial"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Predios entregados",
					value: totalDelivered.toLocaleString("es-PE"),
					detail: `${percentage(totalDelivered, totalProperties).toFixed(1)}% disponibles`,
					tono: "text-success"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Predios pendientes",
					value: (totalProperties - totalDelivered).toLocaleString("es-PE"),
					detail: "Requieren gestión",
					tono: "text-warning"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					label: "Predios críticos",
					value: totalCritical,
					detail: "Atención prioritaria",
					tono: "text-destructive"
				})
			]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,1.65fr)_minmax(410px,0.85fr)]",
			"aria-label": "Mapa y análisis",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Mapa ejecutivo de proyectos",
				acciones: /* @__PURE__ */ jsxs("span", {
					className: "inline-flex items-center gap-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx(Layers3, {
							size: 16,
							"aria-hidden": true
						}),
						" ",
						filtered.length,
						" proyectos visibles"
					]
				}),
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Seleccione un ícono para actualizar los componentes del tablero."
				}), /* @__PURE__ */ jsx("div", {
					className: "h-[560px] overflow-hidden rounded-md border border-border",
					children: /* @__PURE__ */ jsx(ClientProjectMap, {
						projects: filtered,
						selected: selectedProject,
						onSelect: setSelectedProject
					})
				})]
			}), /* @__PURE__ */ jsx(SideAnalysisPanel, {
				tab: sideTab,
				onTab: setSideTab,
				projects: scope
			})]
		}),
		selectedPhase && /* @__PURE__ */ jsxs("p", {
			role: "status",
			className: "mb-4 flex items-center justify-between gap-3 rounded-md border border-primary bg-primary-soft px-3 py-2 text-xs text-primary-dark",
			children: [/* @__PURE__ */ jsxs("span", { children: [
				"Filtro activo del embudo: ",
				/* @__PURE__ */ jsx("b", { children: selectedPhase }),
				". El detalle predial muestra los casos relacionados."
			] }), /* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: () => setSelectedPhase(""),
				children: "Quitar filtro"
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Embudos de predios según su fase",
			className: "mb-4",
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Seleccione una fase para revisar los predios detenidos y su detalle."
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-4 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ jsx(Funnel, {
						title: "Gestión predial",
						data: buildFunnel(scope, "general"),
						barra: "bg-primary",
						selected: selectedPhase,
						onSelect: setSelectedPhase
					}),
					/* @__PURE__ */ jsx(Funnel, {
						title: "Disponibilidad física",
						data: buildFunnel(scope, "physical"),
						barra: "bg-primary-dark",
						selected: selectedPhase,
						onSelect: setSelectedPhase
					}),
					/* @__PURE__ */ jsx(Funnel, {
						title: "Ejecución financiera predial",
						data: buildFunnel(scope, "financial"),
						barra: "bg-muted-foreground",
						selected: selectedPhase,
						onSelect: setSelectedPhase
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx(PhaseComparison, { projects: filtered }),
		/* @__PURE__ */ jsx(ProjectsTable, {
			projects: projectRows,
			search,
			onSearch: setSearch,
			sortDesc,
			onSort: () => setSortDesc((value) => !value),
			onSelect: (project) => {
				setSelectedProject(project);
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			}
		}),
		/* @__PURE__ */ jsx(PredialTable, {
			project: predialBase,
			rows: predialRows,
			phase: selectedPhase
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_0.65fr]",
			"aria-label": "Alertas y actividad",
			children: [/* @__PURE__ */ jsx(Alerts, { projects: scope }), /* @__PURE__ */ jsx(RecentActivity, { projects: scope })]
		})
	] });
}
function FilterSelect({ label, value, options, onChange, includeAll = true }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block min-w-0",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block truncate text-xs font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsxs("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase,
			children: [includeAll && /* @__PURE__ */ jsx("option", {
				value: "TODOS",
				children: "Todos"
			}), options.map((option) => {
				const item = typeof option === "string" ? {
					label: option,
					value: option
				} : option;
				return /* @__PURE__ */ jsx("option", {
					value: item.value,
					children: item.label
				}, item.value);
			})]
		})]
	});
}
function Kpi({ label, value, detail, tono = "text-foreground" }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "min-w-0 rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "truncate text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("p", {
				className: `mt-1 truncate text-lg font-semibold tabular-nums ${tono}`,
				children: value
			}),
			detail && /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 truncate text-xs text-muted-foreground",
				children: detail
			})
		]
	});
}
function SideAnalysisPanel({ tab, onTab, projects }) {
	const investment = projects.reduce((sum, item) => sum + item.investment, 0);
	const executed = projects.reduce((sum, item) => sum + item.executed, 0);
	const properties = projects.reduce((sum, item) => sum + item.properties, 0);
	const paid = projects.reduce((sum, item) => sum + item.paid, 0);
	const delivered = projects.reduce((sum, item) => sum + item.delivered, 0);
	const registered = projects.reduce((sum, item) => sum + item.registered, 0);
	const expenditure = [
		"Adquisición",
		"Servicios prediales",
		"Tasaciones",
		"Interferencias",
		"Gestión social",
		"Notaría",
		"Registro",
		"Administración"
	].map((name, index) => ({
		name,
		value: Math.round(executed * [
			.52,
			.12,
			.08,
			.1,
			.06,
			.035,
			.025,
			.05
		][index])
	}));
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Análisis del alcance",
		children: /* @__PURE__ */ jsxs(Tabs, {
			value: tab,
			onValueChange: (value) => onTab(value),
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "grid w-full grid-cols-3",
					children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "Financiero",
							children: "Financiero"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "Físico",
							children: "Físico"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "Predial",
							children: "Predial"
						})
					]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "Financiero",
					children: [
						/* @__PURE__ */ jsx(Subtitulo, { children: "Componente financiero" }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Inversión",
									value: money(investment)
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Presupuesto vigente",
									value: money(investment * .92)
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Certificado",
									value: money(executed * 1.08)
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Devengado",
									value: money(executed)
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Girado",
									value: money(executed * .96)
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Pagado",
									value: money(executed * .91)
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Saldo disponible",
									value: money(investment * .92 - executed)
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 grid grid-cols-[150px_1fr] items-center gap-2",
							children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
								width: "100%",
								height: 165,
								children: /* @__PURE__ */ jsxs(PieChart, { children: [/* @__PURE__ */ jsx(Pie, {
									data: expenditure,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 40,
									outerRadius: 65,
									stroke: C.border,
									children: expenditure.map((item, index) => /* @__PURE__ */ jsx(Cell, {
										fill: SERIES[index].fill,
										fillOpacity: SERIES[index].opacity
									}, item.name))
								}), /* @__PURE__ */ jsx(Tooltip, { formatter: (value) => money(Number(value)) })] })
							}), /* @__PURE__ */ jsx("ul", {
								className: "space-y-1",
								children: expenditure.map((item, index) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-center justify-between gap-2 text-xs",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx("i", {
											className: "size-2 rounded-sm",
											style: {
												background: SERIES[index].fill,
												opacity: SERIES[index].opacity
											},
											"aria-hidden": true
										}), item.name]
									}), /* @__PURE__ */ jsxs("b", { children: [percentage(item.value, executed).toFixed(0), "%"] })]
								}, item.name))
							})]
						}),
						/* @__PURE__ */ jsx(ProgressList, {
							projects,
							mode: "financial"
						})
					]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "Físico",
					children: [
						/* @__PURE__ */ jsx(Subtitulo, { children: "Componente físico" }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Avance físico",
									value: `${projects.length ? (projects.reduce((sum, item) => sum + item.physical, 0) / projects.length).toFixed(1) : 0}%`
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Meta programada",
									value: `${projects.length ? (projects.reduce((sum, item) => sum + item.physicalTarget, 0) / projects.length).toFixed(1) : 0}%`
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Hitos cumplidos",
									value: projects.reduce((sum, item) => sum + Math.round(item.physical / 10), 0)
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Hitos pendientes",
									value: projects.reduce((sum, item) => sum + Math.max(10 - Math.round(item.physical / 10), 0), 0)
								})
							]
						}),
						/* @__PURE__ */ jsx(ProgressList, {
							projects,
							mode: "physical"
						})
					]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "Predial",
					children: [
						/* @__PURE__ */ jsx(Subtitulo, { children: "Entrega y disponibilidad predial" }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Requeridos",
									value: properties
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Pagados",
									value: paid
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Entregados",
									value: delivered
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Inscritos",
									value: registered
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Disponibilidad",
									value: `${percentage(delivered, properties).toFixed(1)}%`
								}),
								/* @__PURE__ */ jsx(MiniMetric, {
									label: "Área entregada",
									value: `${(projects.reduce((sum, item) => sum + item.areaDelivered, 0) / 1e6).toFixed(2)} km²`
								})
							]
						}),
						/* @__PURE__ */ jsx(PredialComposition, {
							delivered,
							paid,
							properties,
							critical: projects.reduce((sum, item) => sum + item.critical, 0)
						}),
						/* @__PURE__ */ jsx(ProgressList, {
							projects,
							mode: "predial"
						})
					]
				})
			]
		})
	});
}
function MiniMetric({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0 rounded-md border border-border bg-muted p-2",
		children: [/* @__PURE__ */ jsx("p", {
			className: "truncate text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-0.5 truncate text-sm font-semibold tabular-nums text-foreground",
			children: value
		})]
	});
}
function ProgressList({ projects, mode }) {
	return /* @__PURE__ */ jsx("ul", {
		className: "mt-3 space-y-2 border-t border-border pt-3",
		children: projects.slice(0, 6).map((item) => {
			const value = mode === "financial" ? percentage(item.executed, item.investment) : mode === "physical" ? item.physical : percentage(item.delivered, item.properties);
			const target = mode === "physical" ? item.physicalTarget : 100;
			const color = value >= target ? "bg-success" : target - value <= 8 ? "bg-highlight" : "bg-destructive";
			return /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-1 flex justify-between gap-2 text-xs",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "truncate",
					children: [
						item.code,
						" · ",
						item.name
					]
				}), /* @__PURE__ */ jsxs("b", { children: [value.toFixed(1), "%"] })]
			}), /* @__PURE__ */ jsx("div", {
				className: "h-2 overflow-hidden rounded-sm bg-muted",
				role: "progressbar",
				"aria-valuenow": Math.round(value),
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-label": item.name,
				children: /* @__PURE__ */ jsx("div", {
					className: `h-full ${color}`,
					style: { width: `${Math.min(100, value)}%` }
				})
			})] }, item.id);
		})
	});
}
function PredialComposition({ delivered, paid, properties, critical }) {
	const data = [
		{
			name: "Entregados",
			value: delivered
		},
		{
			name: "En proceso",
			value: Math.max(paid - delivered, 0)
		},
		{
			name: "Pendientes",
			value: Math.max(properties - paid - critical, 0)
		},
		{
			name: "Críticos",
			value: critical
		}
	];
	return /* @__PURE__ */ jsx(ResponsiveContainer, {
		width: "100%",
		height: 190,
		children: /* @__PURE__ */ jsxs(PieChart, { children: [
			/* @__PURE__ */ jsx(Pie, {
				data,
				dataKey: "value",
				nameKey: "name",
				innerRadius: 45,
				outerRadius: 70,
				stroke: C.border,
				children: data.map((item, index) => /* @__PURE__ */ jsx(Cell, { fill: [
					C.dark,
					C.primary,
					C.highlight,
					C.muted
				][index] }, item.name))
			}),
			/* @__PURE__ */ jsx(Tooltip, {}),
			/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND })
		] })
	});
}
function Funnel({ title, data, barra, selected, onSelect }) {
	const total = data[0]?.value ?? 1;
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [
			/* @__PURE__ */ jsxs(Subtitulo, { children: ["Embudo de ", title] }),
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Cantidad, conversión y detenidos por fase."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-1.5",
				children: data.map((item) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					"aria-pressed": selected === item.label,
					onClick: () => onSelect(selected === item.label ? "" : item.label),
					className: `mx-auto block min-w-[55%] rounded-md px-2 py-1.5 text-primary-foreground hover:brightness-95 ${barra} ${selected === item.label ? "ring-2 ring-primary-dark ring-offset-1" : ""}`,
					style: {
						width: `${Math.max(55, percentage(item.value, total))}%`,
						opacity: .58 + percentage(item.value, total) / 240
					},
					children: [/* @__PURE__ */ jsxs("span", {
						className: "flex items-center justify-between gap-2 text-xs",
						children: [/* @__PURE__ */ jsx("span", {
							className: "truncate font-semibold",
							children: item.label
						}), /* @__PURE__ */ jsx("b", { children: item.value })]
					}), /* @__PURE__ */ jsxs("span", {
						className: "mt-0.5 flex justify-between gap-1 text-xs opacity-90",
						children: [
							/* @__PURE__ */ jsxs("span", { children: [item.totalPct.toFixed(1), "% total"] }),
							/* @__PURE__ */ jsxs("span", { children: [item.conversion.toFixed(1), "% conversión"] }),
							/* @__PURE__ */ jsxs("span", { children: [item.stopped, " detenidos"] })
						]
					})]
				}, item.label))
			})
		]
	});
}
function PhaseComparison({ projects }) {
	const data = projects.map((item) => ({
		name: item.code,
		identificados: Math.round(item.properties * .08),
		expediente: Math.round(item.properties * .14),
		tasacion: Math.round(item.properties * .12),
		negociacion: Math.max(item.properties - item.paid - Math.round(item.properties * .34), 0),
		pagados: Math.max(item.paid - item.delivered, 0),
		entregados: Math.max(item.delivered - item.registered, 0),
		inscritos: item.registered
	}));
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Predios por fase y proyecto",
		className: "mb-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Compara dónde se concentra la cartera pendiente."
		}), /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: 285,
			children: /* @__PURE__ */ jsxs(BarChart, {
				data,
				children: [
					/* @__PURE__ */ jsx(CartesianGrid, {
						stroke: C.border,
						strokeDasharray: "3 3",
						vertical: false
					}),
					/* @__PURE__ */ jsx(XAxis, {
						dataKey: "name",
						tick: TICK
					}),
					/* @__PURE__ */ jsx(YAxis, { tick: TICK }),
					/* @__PURE__ */ jsx(Tooltip, {}),
					/* @__PURE__ */ jsx(Legend, { wrapperStyle: LEGEND }),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "identificados",
						name: "Identificados",
						stackId: "a",
						fill: C.muted,
						fillOpacity: .5
					}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "expediente",
						name: "Expediente",
						stackId: "a",
						fill: C.muted
					}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "tasacion",
						name: "Tasación",
						stackId: "a",
						fill: C.highlight,
						fillOpacity: .6
					}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "negociacion",
						name: "Negociación",
						stackId: "a",
						fill: C.highlight
					}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "pagados",
						name: "Pagados",
						stackId: "a",
						fill: C.primary,
						fillOpacity: .55
					}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "entregados",
						name: "Entregados",
						stackId: "a",
						fill: C.primary
					}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "inscritos",
						name: "Inscritos",
						stackId: "a",
						fill: C.dark
					})
				]
			})
		})]
	});
}
function ProjectsTable({ projects, search, onSearch, sortDesc, onSort, onSelect }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Detalle de proyectos",
		className: "mb-4",
		acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("label", {
			className: "relative block",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: "Buscar proyecto"
				}),
				/* @__PURE__ */ jsx(Search, {
					size: 16,
					className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsx("input", {
					type: "search",
					value: search,
					onChange: (event) => onSearch(event.target.value),
					placeholder: "Buscar proyecto",
					className: `${controlClase} w-56 pl-9`
				})
			]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			onClick: onSort,
			children: ["Ordenar por ", sortDesc ? "nombre" : "inversión"]
		})] }),
		children: [
			/* @__PURE__ */ jsx("div", {
				id: "project-table",
				className: "scroll-mt-4"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: [
					"Orden actual: ",
					sortDesc ? "mayor inversión" : "alfabético",
					". Abra un proyecto para actualizar el tablero."
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[1250px] text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
						"Código",
						"Proyecto",
						"Tipo",
						"Departamento",
						"Inversión",
						"Ejecución",
						"Avance físico",
						"Predios",
						"Pagados",
						"Entregados",
						"Inscritos",
						"Disponibilidad",
						"Riesgo",
						"Acciones"
					].map((head) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: `${TH} ${head === "Acciones" ? "text-right" : ""}`,
						children: head
					}, head)) }) }), /* @__PURE__ */ jsxs("tbody", {
						className: "[&>tr:nth-child(even)]:bg-background",
						children: [projects.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 14,
							className: "px-3 py-6 text-center text-sm text-muted-foreground",
							children: "Ningún proyecto coincide con la búsqueda."
						}) }), projects.map((item) => /* @__PURE__ */ jsxs("tr", {
							className: `${TR} hover:bg-primary-soft/40`,
							children: [
								/* @__PURE__ */ jsx("td", {
									className: `${TD} font-semibold`,
									children: item.code
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} max-w-64 truncate font-medium`,
									children: item.name
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: item.type
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: item.department
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} tabular-nums`,
									children: money(item.investment)
								}),
								/* @__PURE__ */ jsxs("td", {
									className: `${TD} tabular-nums`,
									children: [percentage(item.executed, item.investment).toFixed(1), "%"]
								}),
								/* @__PURE__ */ jsxs("td", {
									className: `${TD} tabular-nums`,
									children: [item.physical, "%"]
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} tabular-nums`,
									children: item.properties
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} tabular-nums`,
									children: item.paid
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} tabular-nums`,
									children: item.delivered
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} tabular-nums`,
									children: item.registered
								}),
								/* @__PURE__ */ jsxs("td", {
									className: `${TD} tabular-nums`,
									children: [percentage(item.delivered, item.properties).toFixed(1), "%"]
								}),
								/* @__PURE__ */ jsx("td", {
									className: TD,
									children: /* @__PURE__ */ jsx(StatusBadge, {
										tono: riskTone(item.risk),
										children: item.risk
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: `${TD} text-right`,
									children: /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => onSelect(item),
										children: "Abrir proyecto"
									})
								})
							]
						}, item.id))]
					})]
				})
			})
		]
	});
}
function alertTone(alert) {
	if (alert === "Crítico") return "destructive";
	if (alert === "Próximo a vencer") return "warning";
	if (alert === "Cerrado") return "success";
	return "primary";
}
function PredialTable({ project, rows, phase }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: `Detalle predial · ${project.code}`,
		className: "mb-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: phase ? `Filtrado por la fase “${phase}”.` : "Muestra representativa de predios del proyecto seleccionado."
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[1400px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
					"Código predio",
					"Sector",
					"Área m²",
					"Sujeto pasivo",
					"Fase actual",
					"Valor tasado",
					"Monto aprobado",
					"Monto pagado",
					"Entrega",
					"Registral",
					"Días en fase",
					"Responsable",
					"Alerta"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: head
				}, head)) }) }), /* @__PURE__ */ jsx("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: rows.map((row) => /* @__PURE__ */ jsxs("tr", {
						className: TR,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold`,
								children: row.code
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.sector
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} tabular-nums`,
								children: row.area.toLocaleString("es-PE")
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.subject
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.phase
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} tabular-nums`,
								children: money(row.appraised)
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} tabular-nums`,
								children: money(row.approved)
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} tabular-nums`,
								children: money(row.paid)
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.delivery
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.registry
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} tabular-nums`,
								children: row.days
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: row.responsible
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: /* @__PURE__ */ jsx(StatusBadge, {
									tono: alertTone(row.alert),
									children: row.alert
								})
							})
						]
					}, row.code))
				})]
			})
		})]
	});
}
function Alerts({ projects }) {
	const items = projects.flatMap((project, projectIndex) => [{
		project,
		type: "Pagos pendientes",
		days: 8 + projectIndex * 3
	}, {
		project,
		type: project.critical > 15 ? "Interferencia crítica" : "Entrega sin inscripción",
		days: 5 + projectIndex * 2
	}]).sort((a, b) => b.days - a.days).slice(0, 8);
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Alertas y riesgos",
		children: /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[760px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
					"Criticidad",
					"Proyecto",
					"Alerta",
					"Responsable",
					"Días de atraso",
					"Acción"
				].map((head) => /* @__PURE__ */ jsx("th", {
					scope: "col",
					className: TH,
					children: head
				}, head)) }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [items.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 6,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Sin alertas para el alcance seleccionado."
					}) }), items.map((item, index) => /* @__PURE__ */ jsxs("tr", {
						className: TR,
						children: [
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: /* @__PURE__ */ jsxs(StatusBadge, {
									tono: item.days > 20 ? "destructive" : "warning",
									children: [
										/* @__PURE__ */ jsx(AlertTriangle, {
											size: 12,
											className: "mr-1",
											"aria-hidden": true
										}),
										" ",
										item.days > 20 ? "Alta" : "Media"
									]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold`,
								children: item.project.code
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: item.type
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: item.project.responsible
							}),
							/* @__PURE__ */ jsx("td", {
								className: `${TD} font-semibold tabular-nums text-destructive`,
								children: item.days
							}),
							/* @__PURE__ */ jsx("td", {
								className: TD,
								children: "Priorizar y actualizar cronograma"
							})
						]
					}, `${item.project.id}-${index}`))]
				})]
			})
		})
	});
}
function RecentActivity({ projects }) {
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Actividad reciente",
		children: /* @__PURE__ */ jsx("ul", {
			className: "space-y-3",
			children: [
				"Predio pagado",
				"Entrega física realizada",
				"Tasación aprobada",
				"Título inscrito",
				"Interferencia registrada",
				"Proyecto actualizado"
			].map((event, index) => {
				const project = projects[index % Math.max(projects.length, 1)] ?? geographicProjects[0];
				return /* @__PURE__ */ jsxs("li", {
					className: "flex gap-2 border-b border-border pb-2 last:border-0",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mt-1.5 size-2 shrink-0 rounded-sm bg-primary",
						"aria-hidden": true
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm font-semibold text-foreground",
						children: event
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							`0${7 - index % 4}/08/2026`,
							" · ",
							project.code,
							" · ",
							project.responsible
						]
					})] })]
				}, event);
			})
		})
	});
}
//#endregion
export { GeographicDashboardPage as component };
