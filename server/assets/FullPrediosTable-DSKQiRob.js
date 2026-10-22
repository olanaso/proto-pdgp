import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { d as predioRows } from "./prediosProyecto-D1ASzaVD.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { t as PredioActions } from "./PredioActions-DYxBPCVO.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2, Clock3, Filter, Search, X } from "lucide-react";
//#region src/components/ColumnFilter.tsx
/** Filtro por valores de una columna (menú flotante). */
function ColumnFilter({ values, selected, onChange }) {
	const [q, setQ] = useState("");
	const filtered = values.filter((v) => v.toLowerCase().includes(q.toLowerCase()));
	const allOn = selected.size === 0 || selected.size === values.length;
	return /* @__PURE__ */ jsxs("div", {
		className: "w-60 rounded-md border border-border bg-card p-2 text-sm text-foreground shadow-md",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative mb-2",
				children: [/* @__PURE__ */ jsx(Search, {
					size: 16,
					className: "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar valor",
					"aria-label": "Buscar valor",
					className: `${controlClase} h-8 pl-8 text-sm`
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "mb-1 flex items-center gap-2 border-b border-border px-1 py-1",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: allOn,
					onChange: (e) => onChange(e.target.checked ? /* @__PURE__ */ new Set() : new Set(values)),
					className: "accent-primary"
				}), /* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: "(Seleccionar todo)"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "max-h-50 overflow-y-auto pr-1",
				children: [filtered.map((v) => {
					const checked = selected.size === 0 ? true : !selected.has(v);
					return /* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2 rounded-sm px-1 py-0.5 hover:bg-muted",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked,
							onChange: () => {
								const next = new Set(selected.size === 0 ? [] : selected);
								if (checked) next.add(v);
								else next.delete(v);
								onChange(next);
							},
							className: "accent-primary"
						}), /* @__PURE__ */ jsx("span", {
							className: "truncate",
							children: v || "(vacío)"
						})]
					}, v);
				}), filtered.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "px-1 py-2 text-center text-xs text-muted-foreground",
					children: "Sin coincidencias"
				})]
			})
		]
	});
}
//#endregion
//#region src/lib/fullPredioTracking.ts
var FULL_PREDIO_TRACKING_STAGES = [
	{
		label: "Ingreso",
		targetDays: 5
	},
	{
		label: "Elaboración técnico-legal",
		targetDays: 15
	},
	{
		label: "Revisión técnica",
		targetDays: 10
	},
	{
		label: "Subsanación",
		targetDays: 10
	},
	{
		label: "Conforme",
		targetDays: 5
	},
	{
		label: "Enviado a tasación",
		targetDays: 5
	},
	{
		label: "En tasación",
		targetDays: 25
	},
	{
		label: "Informe recibido",
		targetDays: 5
	},
	{
		label: "Aprobado",
		targetDays: 5
	}
];
var FULL_PREDIO_TRACKING_TARGET_DAYS = FULL_PREDIO_TRACKING_STAGES.reduce((total, stage) => total + stage.targetDays, 0);
var TRACKING_DAY_MS = 864e5;
function fullPredioTrackingStageIndex(row) {
	const source = `${row.etit} ${row.estado} ${row.trans} ${row.pago}`.toUpperCase();
	if (/INSCRITO|RECEPCIONADO|OPAT/.test(source)) return 8;
	if (/APROBADO|PAGADO/.test(source)) return 7;
	if (/TASACI/.test(source)) return 6;
	if (row.exp) return 5;
	if (/CONFORME|SI/.test(source)) return 4;
	if (/OBSERV/.test(source)) return 3;
	return Array.from(row.codigo).reduce((total, char) => total + char.charCodeAt(0), 0) % 4;
}
function fullPredioTrackingStart(row) {
	const seed = Array.from(row.codigo).reduce((total, char) => total + char.charCodeAt(0), 0);
	return new Date(Date.UTC(2026, 0, 4 + seed % 80));
}
function fullPredioTrackingStageTiming(row, stageIndex) {
	const currentStage = fullPredioTrackingStageIndex(row);
	if (stageIndex > currentStage) return {
		condition: "Pendiente",
		start: null,
		end: null,
		days: null
	};
	const seed = Array.from(row.codigo).reduce((total, char) => total + char.charCodeAt(0), 0);
	const previousDays = FULL_PREDIO_TRACKING_STAGES.slice(0, stageIndex).reduce((total, stage, index) => total + Math.max(2, stage.targetDays - 3 + (seed + index) % 5), 0);
	const start = new Date(fullPredioTrackingStart(row).getTime() + previousDays * TRACKING_DAY_MS);
	if (stageIndex < currentStage) {
		const realDays = Math.max(2, FULL_PREDIO_TRACKING_STAGES[stageIndex].targetDays - 3 + (seed + stageIndex) % 5);
		return {
			condition: "Completada",
			start,
			end: new Date(start.getTime() + (realDays - 1) * TRACKING_DAY_MS),
			days: realDays
		};
	}
	const cutOff = new Date(Date.UTC(2026, 7, 5));
	return {
		condition: "Etapa actual",
		start,
		end: cutOff,
		days: Math.max(1, Math.floor((cutOff.getTime() - start.getTime()) / TRACKING_DAY_MS) + 1)
	};
}
function fullPredioTrackingProcessDays(row) {
	return Math.max(1, Math.floor((new Date(Date.UTC(2026, 7, 5)).getTime() - fullPredioTrackingStart(row).getTime()) / TRACKING_DAY_MS) + 1);
}
function formatFullPredioTrackingDate(date) {
	return date.toLocaleDateString("es-PE", { timeZone: "UTC" });
}
//#endregion
//#region src/components/FullPrediosTable.tsx
var GROUPS = {
	predio: { label: "DATOS DEL PREDIO Y SUJETO PASIVO" },
	adq: { label: "DATOS ADQUISICIÓN" },
	reg: { label: "GESTIÓN DEL PROCESO DE INSCRIPCIÓN REGISTRAL" },
	fis: { label: "DATOS FÍSICOS DEL PREDIO Y EXPEDIENTE" },
	seg: { label: "SEGUIMIENTO TÉCNICO Y TASACIONES" }
};
/** Alto fijo de la fila de grupos; las cabeceras de columna se pegan debajo. */
var GROUP_ROW_HEIGHT = 32;
var BASE_COLUMNS = [
	{
		key: "n",
		label: "N°",
		group: "predio",
		width: 50,
		align: "center"
	},
	{
		key: "__act",
		label: "Acciones",
		group: "predio",
		width: 70,
		align: "center"
	},
	{
		key: "cod",
		label: "Código de predio",
		group: "predio",
		width: 220,
		mono: true
	},
	{
		key: "condicionPredio",
		label: "CONDICION_PREDIO",
		group: "predio",
		width: 150
	},
	{
		key: "proyecto",
		label: "Nombre del Proyecto",
		group: "predio",
		width: 200
	},
	{
		key: "exp",
		label: "Expediente",
		group: "predio",
		width: 160
	},
	{
		key: "mod",
		label: "Modalidad de adquisición",
		group: "predio",
		width: 170
	},
	{
		key: "suj",
		label: "Sujeto Pasivo",
		group: "predio",
		width: 260
	},
	{
		key: "tp",
		label: "Tipo de persona jurídica",
		group: "predio",
		width: 140
	},
	{
		key: "cond",
		label: "Condición del Sujeto Pasivo",
		group: "predio",
		width: 150
	},
	{
		key: "rlegal",
		label: "Responsable Legal",
		group: "predio",
		width: 170
	},
	{
		key: "rtec",
		label: "Responsable Técnico",
		group: "predio",
		width: 170
	},
	{
		key: "part",
		label: "Número de partida registral",
		group: "predio",
		width: 140,
		mono: true
	},
	{
		key: "m2",
		label: "Área m²",
		group: "predio",
		width: 90,
		align: "right"
	},
	{
		key: "ha",
		label: "Área (ha)",
		group: "predio",
		width: 90,
		align: "right"
	},
	{
		key: "afec",
		label: "Tipo de afectación (Total/Parcial)",
		group: "predio",
		width: 160
	},
	{
		key: "valor",
		label: "Valor de adquisición (S/)",
		group: "predio",
		width: 140,
		align: "right"
	},
	{
		key: "fres",
		label: "Fecha Resolución MTC/VMT/SBN",
		group: "adq",
		width: 150
	},
	{
		key: "nres",
		label: "Número de Resolución",
		group: "adq",
		width: 150
	},
	{
		key: "per",
		label: "Periodo de adquisición",
		group: "adq",
		width: 110,
		align: "center"
	},
	{
		key: "pago",
		label: "Estado de pago",
		group: "adq",
		width: 110
	},
	{
		key: "estado",
		label: "Estado situacional de inscripción",
		group: "reg",
		width: 130,
		align: "center"
	},
	{
		key: "acto",
		label: "Acto registral",
		group: "reg",
		width: 180
	},
	{
		key: "ofi",
		label: "Oficina registral",
		group: "reg",
		width: 130
	},
	{
		key: "titulo",
		label: "N° Título SUNARP",
		group: "reg",
		width: 150
	},
	{
		key: "ftit",
		label: "Fecha de título",
		group: "reg",
		width: 120
	},
	{
		key: "etit",
		label: "Estado de título",
		group: "reg",
		width: 120
	},
	{
		key: "finsc",
		label: "Fecha de inscripción",
		group: "reg",
		width: 130
	},
	{
		key: "pind",
		label: "Partida inscrita / independizada",
		group: "reg",
		width: 150,
		mono: true
	},
	{
		key: "edd",
		label: "EXPEDIENTE FÍSICO DDP",
		group: "fis",
		width: 140,
		align: "center"
	},
	{
		key: "fr",
		label: "FORM. REGISTRAL / FE ENTREGA MEJORAS",
		group: "fis",
		width: 180,
		align: "center"
	},
	{
		key: "acta",
		label: "ACTA RECEPCIÓN DE PREDIO",
		group: "fis",
		width: 150,
		align: "center"
	},
	{
		key: "trans",
		label: "Estado transferencia a OPAT",
		group: "fis",
		width: 220
	},
	{
		key: "com",
		label: "COMENTARIO",
		group: "fis",
		width: 200
	}
];
var TRACKING_COLUMNS = [
	{
		key: "__track_start",
		label: "Fecha de inicio",
		group: "seg",
		width: 110,
		align: "center"
	},
	...FULL_PREDIO_TRACKING_STAGES.map((stage, index) => ({
		key: `__track_${index}`,
		label: `${stage.label} · ${stage.targetDays} d`,
		group: "seg",
		width: 54,
		align: "center"
	})),
	{
		key: "__track_progress",
		label: "% avance",
		group: "seg",
		width: 85,
		align: "center"
	},
	{
		key: "__track_days",
		label: "Días transcurridos",
		group: "seg",
		width: 115,
		align: "center"
	},
	{
		key: "__track_deviation",
		label: "Desviación",
		group: "seg",
		width: 90,
		align: "center"
	}
];
function FullPrediosTable({ rows: sourceRows = predioRows, selectedCodigo, onSelectCodigo, tracking = false, onSelectTrackingStage }) {
	const [filters, setFilters] = useState({});
	const [openFilter, setOpenFilter] = useState(null);
	const [search, setSearch] = useState("");
	const rowRefs = useRef({});
	const columns = useMemo(() => tracking ? [...BASE_COLUMNS, ...TRACKING_COLUMNS] : BASE_COLUMNS, [tracking]);
	const groups = useMemo(() => {
		const out = [];
		let cur = null;
		for (const c of columns) if (cur !== c.group) {
			out.push({
				group: c.group,
				span: 1
			});
			cur = c.group;
		} else out[out.length - 1].span += 1;
		return out;
	}, [columns]);
	const rows = useMemo(() => {
		return sourceRows.filter((r) => {
			if (search) {
				if (!Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())) return false;
			}
			for (const [k, sel] of Object.entries(filters)) {
				if (sel.size === 0) continue;
				if (sel.has(r[k] ?? "")) return false;
			}
			return true;
		});
	}, [
		filters,
		search,
		sourceRows
	]);
	const distinct = (key) => Array.from(new Set(sourceRows.map((r) => r[key] ?? ""))).sort();
	useEffect(() => {
		if (!selectedCodigo) return;
		rowRefs.current[selectedCodigo]?.scrollIntoView({ block: "nearest" });
	}, [rows, selectedCodigo]);
	const leftOffsets = [];
	let acc = 0;
	for (let i = 0; i < 3; i++) {
		leftOffsets.push(acc);
		acc += columns[i].width;
	}
	const frozenCount = 3;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 border-b border-border bg-card px-4 py-2",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "relative max-w-md flex-1",
					children: [
						/* @__PURE__ */ jsx(Search, {
							size: 16,
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": true
						}),
						/* @__PURE__ */ jsx("input", {
							type: "search",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Buscar en toda la tabla",
							"aria-label": "Buscar en toda la tabla",
							className: `${controlClase} pl-9 pr-9`
						}),
						search && /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setSearch(""),
							"aria-label": "Limpiar búsqueda",
							className: "absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ jsx(X, { size: 16 })
						})
					]
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "text-xs text-muted-foreground",
					children: [
						rows.length,
						" de ",
						sourceRows.length,
						" registros"
					]
				}),
				tracking && /* @__PURE__ */ jsxs(StatusBadge, {
					tono: "warning",
					children: [
						"Plazo técnico total: ",
						FULL_PREDIO_TRACKING_TARGET_DAYS,
						" días"
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1 overflow-auto relative",
			children: /* @__PURE__ */ jsxs("table", {
				className: "border-separate border-spacing-0 text-xs",
				style: { minWidth: columns.reduce((s, c) => s + c.width, 0) },
				children: [/* @__PURE__ */ jsxs("thead", { children: [/* @__PURE__ */ jsx("tr", { children: groups.map((g, gi) => {
					const minW = columns.filter((_, i) => {
						const before = groups.slice(0, gi).reduce((s, x) => s + x.span, 0);
						return i >= before && i < before + g.span;
					}).reduce((s, c) => s + c.width, 0);
					return /* @__PURE__ */ jsx("th", {
						colSpan: g.span,
						className: "sticky top-0 z-30 whitespace-nowrap border border-card bg-primary-dark px-2 text-center text-xs font-semibold uppercase text-primary-foreground",
						style: {
							minWidth: minW,
							height: GROUP_ROW_HEIGHT
						},
						children: GROUPS[g.group].label
					}, g.group + gi);
				}) }), /* @__PURE__ */ jsx("tr", { children: columns.map((c, ci) => {
					const isFrozen = ci < frozenCount;
					return /* @__PURE__ */ jsxs("th", {
						className: `sticky z-20 border-b border-r border-border bg-primary-soft px-2 py-1.5 text-left align-top text-xs font-semibold uppercase text-primary-dark ${isFrozen && ci === frozenCount - 1 ? "border-r-2" : ""}`,
						style: {
							width: c.width,
							minWidth: c.width,
							top: GROUP_ROW_HEIGHT,
							left: isFrozen ? leftOffsets[ci] : void 0,
							position: "sticky",
							zIndex: isFrozen ? 40 : 20
						},
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "whitespace-normal leading-tight",
								children: c.label
							}), c.group !== "seg" && /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setOpenFilter(openFilter === c.key ? null : c.key),
									"aria-label": `Filtrar ${c.label}`,
									"aria-expanded": openFilter === c.key,
									className: `flex size-6 shrink-0 items-center justify-center rounded-sm hover:bg-card ${filters[c.key]?.size ? "text-primary" : "text-muted-foreground"}`,
									children: /* @__PURE__ */ jsx(Filter, {
										size: 14,
										"aria-hidden": true
									})
								})
							}), /* @__PURE__ */ jsxs(TooltipContent, { children: ["Filtrar ", c.label] })] })]
						}), openFilter === c.key && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
							className: "fixed inset-0 z-60",
							onClick: () => setOpenFilter(null)
						}), /* @__PURE__ */ jsx("div", {
							className: "absolute top-full right-0 mt-1 z-70",
							children: /* @__PURE__ */ jsx(ColumnFilter, {
								values: distinct(c.key),
								selected: filters[c.key] ?? /* @__PURE__ */ new Set(),
								onChange: (next) => setFilters((f) => {
									const copy = { ...f };
									if (next.size === 0) delete copy[c.key];
									else copy[c.key] = next;
									return copy;
								})
							})
						})] })]
					}, c.key);
				}) })] }), /* @__PURE__ */ jsxs("tbody", { children: [rows.map((r, i) => {
					const isSelected = selectedCodigo === r.codigo;
					return /* @__PURE__ */ jsx("tr", {
						ref: (node) => {
							if (node && !rowRefs.current[r.codigo]) rowRefs.current[r.codigo] = node;
						},
						onClick: () => onSelectCodigo?.(r.codigo),
						className: `${isSelected ? "bg-warning-soft" : i % 2 ? "bg-background" : "bg-card"} cursor-pointer hover:bg-primary-soft/40`,
						children: columns.map((c, ci) => {
							const isFrozen = ci < frozenCount;
							const bg = isSelected ? "var(--warning-soft)" : i % 2 ? "var(--background)" : "var(--card)";
							let content = r[c.key];
							if (c.key === "__act") content = /* @__PURE__ */ jsx(PredioActions, {
								codigoPredio: r.codigo,
								condicionPredio: r.condicionPredio
							});
							else if (c.key === "n") content = i + 1;
							else if (c.key === "__track_start") content = /* @__PURE__ */ jsx("span", {
								className: "font-semibold tabular-nums",
								children: formatFullPredioTrackingDate(fullPredioTrackingStart(r))
							});
							else if (c.key.startsWith("__track_") && /^__track_\d+$/.test(c.key)) {
								const stageIndex = Number(c.key.replace("__track_", ""));
								const timing = fullPredioTrackingStageTiming(r, stageIndex);
								const observed = timing.condition === "Etapa actual" && /OBSERV|VENCID/.test(`${r.etit} ${r.trans}`.toUpperCase());
								content = /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: (event) => {
										event.stopPropagation();
										onSelectTrackingStage?.(r, stageIndex);
									},
									title: `${FULL_PREDIO_TRACKING_STAGES[stageIndex].label}: ${timing.condition}. ${timing.days ?? 0} días / meta ${FULL_PREDIO_TRACKING_STAGES[stageIndex].targetDays} días`,
									className: `relative flex h-8 w-full items-center justify-center overflow-hidden ${timing.condition === "Completada" ? "bg-success-soft text-success" : timing.condition === "Etapa actual" ? observed ? "bg-destructive text-destructive-foreground" : "bg-highlight text-highlight-foreground" : "bg-card text-muted-foreground"}`,
									children: [timing.condition === "Completada" ? /* @__PURE__ */ jsx(CheckCircle2, {
										size: 14,
										"aria-hidden": true
									}) : timing.condition === "Etapa actual" ? observed ? /* @__PURE__ */ jsx(AlertTriangle, {
										size: 14,
										"aria-hidden": true
									}) : /* @__PURE__ */ jsx(Clock3, {
										size: 14,
										"aria-hidden": true
									}) : /* @__PURE__ */ jsx("span", {
										className: "size-1 rounded-sm bg-border",
										"aria-hidden": true
									}), /* @__PURE__ */ jsx("span", {
										className: "absolute inset-x-0 bottom-0 h-0.5 bg-primary",
										"aria-hidden": true
									})]
								});
							} else if (c.key === "__track_progress") content = `${((fullPredioTrackingStageIndex(r) + 1) / FULL_PREDIO_TRACKING_STAGES.length * 100).toFixed(1)}%`;
							else if (c.key === "__track_days") {
								const days = fullPredioTrackingProcessDays(r);
								content = /* @__PURE__ */ jsx(StatusBadge, {
									tono: days > FULL_PREDIO_TRACKING_TARGET_DAYS ? "destructive" : days >= FULL_PREDIO_TRACKING_TARGET_DAYS * .8 ? "warning" : "primary",
									children: /* @__PURE__ */ jsxs("span", {
										className: "tabular-nums",
										children: [days, " días"]
									})
								});
							} else if (c.key === "__track_deviation") {
								const deviation = fullPredioTrackingProcessDays(r) - FULL_PREDIO_TRACKING_TARGET_DAYS;
								content = /* @__PURE__ */ jsxs("b", {
									className: `tabular-nums ${deviation > 0 ? "text-destructive" : "text-success"}`,
									children: [
										deviation > 0 ? "+" : "",
										deviation,
										" d"
									]
								});
							}
							return /* @__PURE__ */ jsx("td", {
								className: `${c.key.startsWith("__track_") && /^__track_\d+$/.test(c.key) ? "p-0" : "px-2 py-1"} border-b border-r border-border align-top ${c.mono ? "font-mono" : ""} ${isFrozen && ci === frozenCount - 1 ? "border-r-2" : ""} ${c.key === "n" ? "font-semibold text-primary-dark" : "text-foreground"}`,
								style: {
									width: c.width,
									minWidth: c.width,
									textAlign: c.align ?? "left",
									position: isFrozen ? "sticky" : void 0,
									left: isFrozen ? leftOffsets[ci] : void 0,
									background: isFrozen ? bg : void 0,
									zIndex: isFrozen ? 10 : void 0
								},
								children: /* @__PURE__ */ jsx("div", {
									className: "whitespace-normal leading-tight",
									children: content
								})
							}, c.key);
						})
					}, r.codigo + i);
				}), rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
					colSpan: columns.length,
					className: "px-4 py-8 text-center text-sm text-muted-foreground",
					children: "Ningún predio coincide con la búsqueda o los filtros."
				}) })] })]
			})
		})]
	});
}
//#endregion
export { fullPredioTrackingStageIndex as a, fullPredioTrackingProcessDays as i, FULL_PREDIO_TRACKING_STAGES as n, fullPredioTrackingStageTiming as o, formatFullPredioTrackingDate as r, fullPredioTrackingStart as s, FullPrediosTable as t };
