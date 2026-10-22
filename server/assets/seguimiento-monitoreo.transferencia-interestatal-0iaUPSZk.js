import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { w as registrarExportacion } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FileSpreadsheet, FilterX, Landmark, Search } from "lucide-react";
import writeXlsxFile from "write-excel-file/browser";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
//#region src/routes/seguimiento-monitoreo.transferencia-interestatal.tsx?tsr-split=component
var statusOrder = [
	"PENDIENTE",
	"EN TRÁMITE",
	"ADQUIRIDO"
];
var STATUS_FILL = {
	PENDIENTE: "var(--color-primary)",
	"EN TRÁMITE": "var(--color-highlight)",
	ADQUIRIDO: "var(--color-primary-dark)"
};
var STATUS_BG = {
	PENDIENTE: "bg-primary",
	"EN TRÁMITE": "bg-highlight",
	ADQUIRIDO: "bg-primary-dark"
};
var STATUS_TONE = {
	PENDIENTE: "destructive",
	"EN TRÁMITE": "warning",
	ADQUIRIDO: "success"
};
var properties = [
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0521T",
		registry: "PARTIDA ELECTRÓNICA 11356305",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Ana Campos",
		updatedAt: "08/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0522T",
		registry: "PARTIDA ELECTRÓNICA 11354027",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Ana Campos",
		updatedAt: "09/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0535T",
		registry: "PARTIDA ELECTRÓNICA 11369203",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Luis Paredes",
		updatedAt: "10/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0547T",
		registry: "PARTIDA ELECTRÓNICA 11376290",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Luis Paredes",
		updatedAt: "11/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0548AT",
		registry: "PARTIDA ELECTRÓNICA 11366180",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Patricia Gómez",
		updatedAt: "12/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0534T",
		registry: "PARTIDA ELECTRÓNICA 11360421",
		status: "EN TRÁMITE",
		period: "2026",
		responsible: "Patricia Gómez",
		updatedAt: "13/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0536T",
		registry: "PARTIDA ELECTRÓNICA 11360773",
		status: "EN TRÁMITE",
		period: "2026",
		responsible: "Jorge Salazar",
		updatedAt: "14/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0541T",
		registry: "PARTIDA ELECTRÓNICA 11363102",
		status: "EN TRÁMITE",
		period: "2026",
		responsible: "Jorge Salazar",
		updatedAt: "15/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0549T",
		registry: "Pendiente de validación registral",
		status: "PENDIENTE",
		period: "2026",
		responsible: "Ana Campos",
		updatedAt: "16/07/2026"
	},
	{
		project: "JAUJA",
		owner: "Estado peruano",
		code: "AERO-JAUJA-PR-0560T",
		registry: "Pendiente de ingreso documental",
		status: "PENDIENTE",
		period: "2026",
		responsible: "Luis Paredes",
		updatedAt: "17/07/2026"
	},
	{
		project: "CAJAMARCA",
		owner: "Estado peruano",
		code: "PM1G-AERCAJAMARCA-PR-0456",
		registry: "PARTIDA ELECTRÓNICA 11237411",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Patricia Gómez",
		updatedAt: "18/07/2026"
	},
	{
		project: "CAJAMARCA",
		owner: "Estado peruano",
		code: "PM1G-AERCAJAMARCA-PR-0565",
		registry: "OFICIO N.° 05690-2026-SBN-DGPE-SDDI",
		status: "EN TRÁMITE",
		period: "2026",
		responsible: "Jorge Salazar",
		updatedAt: "19/07/2026"
	},
	{
		project: "CAJAMARCA",
		owner: "Estado peruano",
		code: "PM1G-AERCAJAMARCA-PR-0571",
		registry: "Pendiente de ingreso documental",
		status: "PENDIENTE",
		period: "2026",
		responsible: "Ana Campos",
		updatedAt: "20/07/2026"
	},
	{
		project: "PIURA",
		owner: "Estado peruano",
		code: "PM1G-AERPIURA-PU-203",
		registry: "PARTIDA ELECTRÓNICA 11305577",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Luis Paredes",
		updatedAt: "21/07/2026"
	},
	{
		project: "PIURA",
		owner: "Estado peruano",
		code: "PM1G-AERPIURA-PU-206",
		registry: "PARTIDA ELECTRÓNICA 11299145",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Patricia Gómez",
		updatedAt: "22/07/2026"
	},
	{
		project: "TALARA",
		owner: "Estado peruano",
		code: "PM1G-AER-TALARA-PR-102",
		registry: "PARTIDA ELECTRÓNICA 11248754",
		status: "EN TRÁMITE",
		period: "2026",
		responsible: "Jorge Salazar",
		updatedAt: "23/07/2026"
	},
	{
		project: "TALARA",
		owner: "Estado peruano",
		code: "PM1G-AER-TALARA-PR-103",
		registry: "PARTIDA ELECTRÓNICA 11248775",
		status: "EN TRÁMITE",
		period: "2026",
		responsible: "Ana Campos",
		updatedAt: "24/07/2026"
	},
	{
		project: "TALARA",
		owner: "Estado peruano",
		code: "PM1G-AER-TALARA-PR-109",
		registry: "Pendiente de ingreso documental",
		status: "PENDIENTE",
		period: "2026",
		responsible: "Luis Paredes",
		updatedAt: "25/07/2026"
	},
	{
		project: "AREQUIPA",
		owner: "Estado peruano",
		code: "PM2G-AERAREQ-PU-014",
		registry: "PARTIDA ELECTRÓNICA 11632517",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Patricia Gómez",
		updatedAt: "26/07/2026"
	},
	{
		project: "AREQUIPA",
		owner: "Estado peruano",
		code: "PM2G-AERAREQ-PU-015",
		registry: "PARTIDA ELECTRÓNICA 11632518",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Jorge Salazar",
		updatedAt: "27/07/2026"
	},
	{
		project: "PUCALLPA",
		owner: "Estado peruano",
		code: "PM1G-AERPUCALLPA-PU-119",
		registry: "PARTIDA ELECTRÓNICA 11270311",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Ana Campos",
		updatedAt: "28/07/2026"
	},
	{
		project: "BREU",
		owner: "Estado peruano",
		code: "AERO-BREU-PU-07",
		registry: "PARTIDA ELECTRÓNICA 11226684",
		status: "EN TRÁMITE",
		period: "2026",
		responsible: "Luis Paredes",
		updatedAt: "29/07/2026"
	},
	{
		project: "BREU",
		owner: "Estado peruano",
		code: "AERO-BREU-PU-09",
		registry: "PARTIDA ELECTRÓNICA 11225940",
		status: "ADQUIRIDO",
		period: "2026",
		responsible: "Patricia Gómez",
		updatedAt: "30/07/2026"
	},
	{
		project: "CABALLOCOCHA",
		owner: "Estado peruano",
		code: "AEROCABALLOCHA-PR-015",
		registry: "Pendiente de ingreso documental",
		status: "PENDIENTE",
		period: "2026",
		responsible: "Jorge Salazar",
		updatedAt: "31/07/2026"
	}
];
function TransferenciaInterestatalPage() {
	const [project, setProject] = useState("TODOS");
	const [status, setStatus] = useState("TODOS");
	const [period, setPeriod] = useState("TODOS");
	const [query, setQuery] = useState("");
	const projects = useMemo(() => Array.from(new Set(properties.map((property) => property.project))).sort(), []);
	const filtered = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase("es");
		return properties.filter((property) => (project === "TODOS" || property.project === project) && (status === "TODOS" || property.status === status) && (period === "TODOS" || property.period === period) && (!normalizedQuery || `${property.code} ${property.registry} ${property.owner}`.toLocaleLowerCase("es").includes(normalizedQuery)));
	}, [
		period,
		project,
		query,
		status
	]);
	const counts = useMemo(() => Object.fromEntries(statusOrder.map((item) => [item, filtered.filter((property) => property.status === item).length])), [filtered]);
	const resetFilters = () => {
		setProject("TODOS");
		setStatus("TODOS");
		setPeriod("TODOS");
		setQuery("");
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Landmark,
			titulo: "Transferencias interestatales",
			descripcion: "Coordinadores · Seguimiento consolidado de predios estatales con tres estados: Pendiente, En trámite y Adquirido.",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => void exportTransfersExcel(filtered),
				disabled: !filtered.length,
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar a Excel"]
			})
		}),
		/* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-1.5 text-xs text-warning",
			children: "Datos de demostración: el padrón de predios estatales no está conectado a un servicio."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Filtros",
			className: "mb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-[160px_180px_180px_minmax(220px,1fr)_auto]",
				children: [
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Periodo",
						value: period,
						onChange: setPeriod,
						options: ["2026"],
						allLabel: "Todos"
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Proyecto",
						value: project,
						onChange: setProject,
						options: projects,
						allLabel: "Todos"
					}),
					/* @__PURE__ */ jsx(FilterSelect, {
						label: "Estado",
						value: status,
						onChange: setStatus,
						options: statusOrder,
						allLabel: "Todos"
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
							children: "Código o partida registral"
						}), /* @__PURE__ */ jsxs("span", {
							className: "relative block",
							children: [/* @__PURE__ */ jsx(Search, {
								size: 16,
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": true
							}), /* @__PURE__ */ jsx("input", {
								type: "search",
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Buscar predio",
								className: `${controlClase} pl-9`
							})]
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						className: "mt-auto",
						onClick: resetFilters,
						children: [/* @__PURE__ */ jsx(FilterX, {}), " Limpiar filtros"]
					})
				]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mb-4 grid grid-cols-2 gap-4 xl:grid-cols-4",
			"aria-label": "Indicadores",
			children: [
				/* @__PURE__ */ jsx(Metric, {
					label: "Total de predios",
					value: filtered.length
				}),
				/* @__PURE__ */ jsx(Metric, {
					label: "Pendientes",
					value: counts.PENDIENTE,
					tono: "text-destructive"
				}),
				/* @__PURE__ */ jsx(Metric, {
					label: "En trámite",
					value: counts["EN TRÁMITE"],
					tono: "text-warning"
				}),
				/* @__PURE__ */ jsx(Metric, {
					label: "Adquiridos",
					value: counts.ADQUIRIDO,
					tono: "text-success"
				})
			]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "grid items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_330px]",
			"aria-label": "Detalle y distribución",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Detalle de predios estatales",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: "La tabla diferencia la situación actual de cada transferencia interestatal."
					}),
					/* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "project",
								titulo: "Proyecto",
								render: (f) => /* @__PURE__ */ jsx("b", { children: f.project })
							},
							{
								clave: "owner",
								titulo: "Propietario"
							},
							{
								clave: "code",
								titulo: "Datos del predio",
								render: (f) => /* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: f.code
								})
							},
							{
								clave: "registry",
								titulo: "Partida o documento",
								render: (f) => /* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: f.registry
								})
							},
							{
								clave: "responsible",
								titulo: "Responsable"
							},
							{
								clave: "status",
								titulo: "Estado",
								render: (f) => /* @__PURE__ */ jsx(StatusBadge, {
									tono: STATUS_TONE[f.status],
									children: f.status
								})
							}
						],
						filas: filtered,
						claveFila: (f) => f.code,
						vacio: "No existen predios para los filtros seleccionados."
					}),
					!!filtered.length && /* @__PURE__ */ jsxs("p", {
						className: "mt-2 text-right text-xs text-muted-foreground",
						children: ["Total de predios filtrados: ", /* @__PURE__ */ jsx("b", {
							className: "text-foreground",
							children: filtered.length
						})]
					})
				]
			}), /* @__PURE__ */ jsx(DashboardSide, {
				rows: filtered,
				counts
			})]
		})
	] });
}
function FilterSelect({ label, value, onChange, options, allLabel }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsxs("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: controlClase,
			children: [/* @__PURE__ */ jsx("option", {
				value: "TODOS",
				children: allLabel
			}), options.map((option) => /* @__PURE__ */ jsx("option", {
				value: option,
				children: option
			}, option))]
		})]
	});
}
function DashboardSide({ rows, counts }) {
	const projects = useMemo(() => {
		const grouped = /* @__PURE__ */ new Map();
		rows.forEach((property) => {
			const current = grouped.get(property.project) ?? {
				PENDIENTE: 0,
				"EN TRÁMITE": 0,
				ADQUIRIDO: 0
			};
			current[property.status] += 1;
			grouped.set(property.project, current);
		});
		return Array.from(grouped.entries()).sort(([, first], [, second]) => Object.values(second).reduce((sum, value) => sum + value, 0) - Object.values(first).reduce((sum, value) => sum + value, 0));
	}, [rows]);
	const donut = statusOrder.map((item) => ({
		name: item,
		value: counts[item]
	}));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ jsxs(Section, {
			titulo: "Estado de las transferencias",
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Distribución del universo filtrado."
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-[145px_1fr] items-center gap-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx(ResponsiveContainer, {
						width: "100%",
						height: 145,
						children: /* @__PURE__ */ jsxs(PieChart, { children: [/* @__PURE__ */ jsx(Pie, {
							data: donut,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 44,
							outerRadius: 66,
							stroke: "var(--color-border)",
							children: donut.map((item) => /* @__PURE__ */ jsx(Cell, { fill: STATUS_FILL[item.name] }, item.name))
						}), /* @__PURE__ */ jsx(Tooltip, {})] })
					}), /* @__PURE__ */ jsxs("div", {
						className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ jsx("strong", {
							className: "text-lg tabular-nums",
							children: rows.length
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: "Predios"
						})]
					})]
				}), /* @__PURE__ */ jsx("ul", {
					className: "space-y-2",
					children: statusOrder.map((item) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-center justify-between gap-2 text-xs",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5 font-semibold text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: `size-2.5 rounded-sm ${STATUS_BG[item]}`,
									"aria-hidden": true
								}),
								" ",
								item
							]
						}), /* @__PURE__ */ jsx("strong", {
							className: "tabular-nums",
							children: counts[item]
						})]
					}, item))
				})]
			})]
		}), /* @__PURE__ */ jsxs(Section, {
			titulo: "Predios por proyecto",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Comparación por estado de transferencia."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mb-3 flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground",
					children: statusOrder.map((item) => /* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: `size-2 rounded-sm ${STATUS_BG[item]}`,
								"aria-hidden": true
							}),
							" ",
							item
						]
					}, item))
				}),
				/* @__PURE__ */ jsxs("ul", {
					className: "space-y-3",
					children: [projects.map(([name, projectCounts]) => /* @__PURE__ */ jsx(ProjectBar, {
						name,
						counts: projectCounts
					}, name)), !projects.length && /* @__PURE__ */ jsx("li", {
						className: "py-6 text-center text-xs text-muted-foreground",
						children: "Sin información para los filtros seleccionados."
					})]
				})
			]
		})]
	});
}
function ProjectBar({ name, counts }) {
	const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
	return /* @__PURE__ */ jsxs("li", {
		className: "grid grid-cols-[90px_1fr_24px] items-center gap-2 text-xs",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "truncate text-right font-semibold text-muted-foreground",
				title: name,
				children: name
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex h-4 overflow-hidden rounded-sm bg-muted",
				role: "img",
				"aria-label": `${name}: ${counts.PENDIENTE} pendientes, ${counts["EN TRÁMITE"]} en trámite, ${counts.ADQUIRIDO} adquiridos`,
				children: statusOrder.map((item) => /* @__PURE__ */ jsx("div", {
					className: STATUS_BG[item],
					style: { width: `${counts[item] / total * 100}%` },
					title: `${counts[item]} ${item.toLocaleLowerCase("es")}`
				}, item))
			}),
			/* @__PURE__ */ jsx("strong", {
				className: "tabular-nums",
				children: total
			})
		]
	});
}
function Metric({ label, value, tono = "text-foreground" }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: `mt-1 text-lg font-semibold tabular-nums ${tono}`,
			children: value
		})]
	});
}
async function exportTransfersExcel(rows) {
	const summaryData = [excelHeader([
		"Estado",
		"Cantidad",
		"% del total"
	])];
	statusOrder.forEach((status) => {
		const count = rows.filter((property) => property.status === status).length;
		summaryData.push([
			{
				value: status,
				type: String
			},
			{
				value: count,
				type: Number
			},
			{
				value: rows.length ? count / rows.length : 0,
				type: Number,
				format: "0.00%"
			}
		]);
	});
	const detailHeaders = [
		"Periodo",
		"Proyecto",
		"Propietario",
		"Datos del predio",
		"Partida registral / documento",
		"Estado",
		"Responsable",
		"Última actualización"
	];
	const detailData = [excelHeader(detailHeaders)];
	rows.forEach((property) => {
		detailData.push([
			{
				value: property.period,
				type: String
			},
			{
				value: property.project,
				type: String
			},
			{
				value: property.owner,
				type: String
			},
			{
				value: property.code,
				type: String
			},
			{
				value: property.registry,
				type: String
			},
			{
				value: property.status,
				type: String,
				fontWeight: "bold"
			},
			{
				value: property.responsible,
				type: String
			},
			{
				value: property.updatedAt,
				type: String
			}
		]);
	});
	await writeXlsxFile([{
		data: detailData,
		sheet: "Detalle de predios",
		stickyRowsCount: 1,
		orientation: "landscape",
		columns: detailHeaders.map((header, index) => ({ width: [3, 4].includes(index) ? 34 : Math.min(26, Math.max(14, header.length + 2)) }))
	}, {
		data: summaryData,
		sheet: "Resumen",
		stickyRowsCount: 1,
		columns: [
			{ width: 20 },
			{ width: 14 },
			{ width: 16 }
		]
	}]).toFile(`transferencias_interestatales_2026_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
	registrarExportacion("transferencias_interestatales_2026", "Excel");
}
function excelHeader(headers) {
	return headers.map((header) => ({
		value: header,
		fontWeight: "bold",
		align: "center",
		wrap: true,
		height: 30
	}));
}
//#endregion
export { TransferenciaInterestatalPage as component };
