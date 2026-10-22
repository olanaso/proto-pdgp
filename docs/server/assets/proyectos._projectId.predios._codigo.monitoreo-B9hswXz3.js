import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { n as etapaDelPredio, s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { d as PlazoPredioBadge, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.monitoreo-EpUaqz3n.js";
import { i as DEFAULT_CONFIGS, t as ACQUISITION_MILESTONES_STORAGE_KEY } from "./AcquisitionMilestonesConfig-D4Pj8OgS.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CalendarRange, ChartGantt } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.monitoreo.tsx?tsr-split=component
function MonitoreoPredialPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const etapa = etapaDelPredio(decodedCodigo);
	const todayIso = today();
	const suggestedProcessId = useMemo(() => resolveProcessType(predio), [predio]);
	const ganttStorageKey = `predio-gantt:${projectId}:${decodedCodigo}`;
	const [configs, setConfigs] = useState(cloneAcquisitionConfigs);
	const [processId, setProcessId] = useState(suggestedProcessId);
	const [ganttStartDate, setGanttStartDate] = useState(() => inferScheduleStart(predio));
	const [milestoneProgress, setMilestoneProgress] = useState({});
	const [ganttLoaded, setGanttLoaded] = useState(false);
	const activeProcess = configs.find((process) => process.id === processId) ?? configs[0];
	const ganttRows = useMemo(() => buildGanttRows(activeProcess?.milestones ?? [], ganttStartDate, milestoneProgress, todayIso), [
		activeProcess?.milestones,
		ganttStartDate,
		milestoneProgress,
		todayIso
	]);
	const progress = Math.round(ganttRows.reduce((sum, row) => sum + row.milestone.weight * (row.progress / 100), 0));
	const completedCount = ganttRows.filter((row) => row.trackingState === "CUMPLIDO").length;
	useEffect(() => {
		const configuredProcesses = readAcquisitionMilestoneConfigs();
		setConfigs(configuredProcesses);
		try {
			const stored = window.localStorage.getItem(ganttStorageKey);
			if (stored) {
				const parsed = JSON.parse(stored);
				const storedProcess = configuredProcesses.some((item) => item.id === parsed.processId) ? parsed.processId : suggestedProcessId;
				const selectedProcess = configuredProcesses.find((item) => item.id === storedProcess) ?? configuredProcesses[0];
				setProcessId(storedProcess ?? suggestedProcessId);
				setGanttStartDate(parsed.startDate || inferScheduleStart(predio));
				setMilestoneProgress(parsed.progress ?? buildInitialMilestoneProgress(selectedProcess?.milestones ?? [], predio));
			} else {
				const selectedProcess = configuredProcesses.find((item) => item.id === suggestedProcessId) ?? configuredProcesses[0];
				setMilestoneProgress(buildInitialMilestoneProgress(selectedProcess?.milestones ?? [], predio));
			}
		} catch {
			const selectedProcess = configuredProcesses.find((item) => item.id === suggestedProcessId) ?? configuredProcesses[0];
			setMilestoneProgress(buildInitialMilestoneProgress(selectedProcess?.milestones ?? [], predio));
		} finally {
			setGanttLoaded(true);
		}
	}, [
		ganttStorageKey,
		predio,
		suggestedProcessId
	]);
	useEffect(() => {
		if (!ganttLoaded) return;
		const payload = {
			processId,
			startDate: ganttStartDate,
			progress: milestoneProgress
		};
		window.localStorage.setItem(ganttStorageKey, JSON.stringify(payload));
	}, [
		ganttLoaded,
		ganttStartDate,
		ganttStorageKey,
		milestoneProgress,
		processId
	]);
	const rol = useRol();
	const claveHistorial = `monitoreo-${decodedCodigo}`;
	const estadoActual = {
		processId,
		startDate: ganttStartDate,
		progress: milestoneProgress
	};
	function registrar(accion, objeto, despues) {
		registrarCambio(claveHistorial, {
			accion,
			objeto,
			antes: estadoActual,
			despues
		}, {
			modulo: 11,
			entidad: "seguimiento_gantt"
		});
	}
	function handleProcessChange(nextProcessId) {
		const nextProcess = configs.find((item) => item.id === nextProcessId);
		const nuevoAvance = buildInitialMilestoneProgress(nextProcess?.milestones ?? [], predio);
		registrar("Cambió el proceso", nextProcess?.name ?? nextProcessId, {
			processId: nextProcessId,
			startDate: ganttStartDate,
			progress: nuevoAvance
		});
		setProcessId(nextProcessId);
		setMilestoneProgress(nuevoAvance);
	}
	function handleStartDateChange(value) {
		registrar("Cambió la fecha de inicio", value, {
			...estadoActual,
			startDate: value
		});
		setGanttStartDate(value);
	}
	function updateMilestoneProgress(id, value) {
		const hito = activeProcess?.milestones.find((m) => m.id === id);
		registrar("Actualizó el avance del hito", hito?.name ?? id, {
			...estadoActual,
			progress: {
				...milestoneProgress,
				[id]: value
			}
		});
		setMilestoneProgress((current) => ({
			...current,
			[id]: value
		}));
	}
	function restaurar(registro, version) {
		registrarCambio(claveHistorial, {
			accion: "Restauró una versión anterior",
			objeto: `versión ${version}`,
			antes: estadoActual,
			despues: registro
		}, {
			modulo: 11,
			entidad: "seguimiento_gantt"
		});
		if (registro.processId) setProcessId(registro.processId);
		setGanttStartDate(registro.startDate ?? ganttStartDate);
		setMilestoneProgress(registro.progress ?? {});
	}
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: decodedCodigo,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: decodedCodigo }),
		children: [
			/* @__PURE__ */ jsx(PredioEncabezado, {
				projectId,
				codigo: decodedCodigo,
				titulo: "Monitoreo",
				icono: ChartGantt,
				acciones: /* @__PURE__ */ jsxs(StatusBadge, {
					tono: progress === 100 ? "success" : "primary",
					children: [
						"Avance ",
						completedCount,
						"/",
						ganttRows.length,
						" hitos · ",
						progress,
						" %"
					]
				})
			}),
			etapa && /* @__PURE__ */ jsx(StepperEtapa, {
				actual: etapa.paso,
				projectId,
				codigo: decodedCodigo,
				extra: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(PlazoPredioBadge, {
					plazo: etapa.plazo,
					vacio: "Sin plazo legal con fecha registrada en el padrón"
				}), /* @__PURE__ */ jsx("span", { children: etapa.hito })] })
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Diagrama Gantt del seguimiento individual",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Datos de demostración: los hitos y plazos provienen de la configuración local y del padrón del proyecto."
				}), /* @__PURE__ */ jsx(PredioGantt, {
					configs,
					activeProcess,
					processId,
					startDate: ganttStartDate,
					rows: ganttRows,
					progress,
					todayIso,
					onProcessChange: handleProcessChange,
					onStartDateChange: handleStartDateChange,
					onProgressChange: updateMilestoneProgress
				})]
			}),
			/* @__PURE__ */ jsx(Section, {
				titulo: "Histórico del seguimiento",
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Historico, {
					registro: claveHistorial,
					etiquetas: {
						processId: "Proceso",
						startDate: "Fecha de inicio",
						progress: "Avance de hitos"
					},
					puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
					onRestaurar: restaurar,
					nombreArchivo: `historico-monitoreo-${decodedCodigo}`
				})
			})
		]
	});
}
function PredioGantt({ configs, activeProcess, processId, startDate, rows, progress, todayIso, onProcessChange, onStartDateChange, onProgressChange }) {
	const totalDays = rows.reduce((sum, row) => sum + row.duration, 0);
	const scheduleEnd = rows.at(-1)?.endDate ?? startDate;
	const alertCount = rows.filter((row) => [
		"PREVENTIVO",
		"CRÍTICO",
		"VENCIDO"
	].includes(row.scheduleStatus)).length;
	const todayOffset = differenceInDays(startDate, todayIso);
	const showToday = todayOffset >= 0 && todayOffset <= totalDays;
	const todayPosition = totalDays ? Math.min(100, todayOffset / totalDays * 100) : 0;
	const ticks = Array.from({ length: 7 }, (_, index) => {
		const offset = Math.round(Math.max(1, totalDays) * index / 6);
		return {
			offset,
			label: formatDatePe(addDaysIso(startDate, offset))
		};
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-card",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end gap-3 border-b border-border px-3 py-2",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "min-w-60 flex-1 text-xs font-semibold uppercase text-muted-foreground",
						children: ["Proceso", /* @__PURE__ */ jsx("select", {
							className: `${controlClase} mt-1 font-normal normal-case`,
							value: processId,
							onChange: (event) => onProcessChange(event.target.value),
							children: configs.map((process) => /* @__PURE__ */ jsx("option", {
								value: process.id,
								children: process.name
							}, process.id))
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "w-40 text-xs font-semibold uppercase text-muted-foreground",
						children: ["Inicio", /* @__PURE__ */ jsx("input", {
							type: "date",
							className: `${controlClase} mt-1 font-normal normal-case`,
							value: startDate,
							onChange: (event) => onStartDateChange(event.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "w-28 text-xs font-semibold uppercase text-muted-foreground",
						children: ["Fin", /* @__PURE__ */ jsx("p", {
							className: `${controlClase} mt-1 flex items-center bg-muted font-semibold normal-case tabular-nums`,
							children: formatDatePe(scheduleEnd)
						})]
					}),
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						className: "ml-auto",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/configuracion/hitos-plazos",
							children: [/* @__PURE__ */ jsx(CalendarRange, {}), " Configurar plazos"]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-border bg-background px-3 py-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "min-w-0 truncate font-semibold text-foreground",
						title: activeProcess?.name,
						children: activeProcess?.name ?? "Sin proceso"
					}),
					/* @__PURE__ */ jsxs("span", { children: ["Duración: ", /* @__PURE__ */ jsxs("b", {
						className: "text-foreground",
						children: [totalDays, " días"]
					})] }),
					/* @__PURE__ */ jsxs("span", { children: ["Avance: ", /* @__PURE__ */ jsxs("b", {
						className: "text-primary-dark",
						children: [progress, " %"]
					})] }),
					/* @__PURE__ */ jsxs("span", { children: ["Alertas: ", /* @__PURE__ */ jsx("b", {
						className: alertCount ? "text-warning" : "text-success",
						children: alertCount
					})] })
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ jsxs("div", {
					className: "min-w-295",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-[300px_minmax(540px,1fr)_300px] border-b border-border bg-primary-soft text-xs font-semibold uppercase text-primary-dark",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "px-3 py-2",
									children: "Etapa / hito"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "relative px-3 py-2",
									children: /* @__PURE__ */ jsx("div", {
										className: "flex justify-between tabular-nums",
										children: ticks.map((tick) => /* @__PURE__ */ jsx("span", { children: tick.label }, `${tick.offset}-${tick.label}`))
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "px-3 py-2",
									children: "Estado / avance acumulado"
								})
							]
						}),
						rows.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "px-3 py-6 text-center text-sm text-muted-foreground",
							children: "El proceso no tiene hitos activos."
						}),
						rows.map((row) => {
							const barColor = scheduleColor(row.scheduleStatus);
							const left = totalDays ? row.startOffset / totalDays * 100 : 0;
							const width = totalDays ? Math.max(.8, row.duration / totalDays * 100) : 100;
							return /* @__PURE__ */ jsxs("div", {
								className: "grid min-h-12 grid-cols-[300px_minmax(540px,1fr)_300px] items-center border-b border-border text-xs last:border-b-0 even:bg-background",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "min-w-0 px-3 py-1.5",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex size-6 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-xs font-bold text-primary-dark",
												children: row.milestone.number ?? "s/n"
											}), /* @__PURE__ */ jsxs("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ jsx("p", {
													className: "truncate text-sm font-semibold text-foreground",
													title: `${row.milestone.category} · ${row.milestone.name}`,
													children: row.milestone.name
												}), /* @__PURE__ */ jsxs("p", {
													className: "truncate text-xs text-muted-foreground",
													title: `${row.milestone.responsible} · ${formatDatePe(row.startDate)} al ${formatDatePe(row.endDate)}`,
													children: [
														row.milestone.responsible,
														" · ",
														row.duration,
														" d · ",
														row.milestone.weight,
														" % ·",
														" ",
														formatDatePe(row.startDate),
														" al ",
														formatDatePe(row.endDate)
													]
												})]
											})]
										})
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative mx-3 h-7",
										style: {
											backgroundImage: "linear-gradient(90deg, transparent calc(16.666% - 1px), var(--color-border) 16.666%)",
											backgroundSize: "16.666% 100%"
										},
										children: [showToday && /* @__PURE__ */ jsx("div", {
											className: "absolute inset-y-0 z-20 border-l-2 border-primary",
											style: { left: `${todayPosition}%` },
											title: `Fecha actual: ${formatDatePe(todayIso)}`
										}), /* @__PURE__ */ jsx("div", {
											className: "absolute top-1 h-5 overflow-hidden rounded-sm border",
											style: {
												left: `${left}%`,
												width: `${width}%`,
												borderColor: barColor,
												backgroundColor: "var(--color-primary-soft)"
											},
											title: `${row.milestone.name}: ${formatDatePe(row.startDate)} al ${formatDatePe(row.endDate)}`,
											children: /* @__PURE__ */ jsx("div", {
												className: "h-full",
												style: {
													width: `${row.progress}%`,
													backgroundColor: barColor
												}
											})
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 px-3 py-1.5",
										children: [
											/* @__PURE__ */ jsx(StatusBadge, {
												tono: TONO_ESTADO[row.scheduleStatus],
												children: row.scheduleStatus
											}),
											/* @__PURE__ */ jsxs("select", {
												className: `${controlClase} h-8 min-w-0 flex-1 px-2 text-xs`,
												value: row.trackingState,
												"aria-label": `Avance de ${row.milestone.name}`,
												onChange: (event) => onProgressChange(row.milestone.id, event.target.value),
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "PENDIENTE",
														children: "Pendiente 0 %"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "EN PROCESO",
														children: "En proceso 50 %"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "CUMPLIDO",
														children: "Cumplido 100 %"
													})
												]
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "w-10 shrink-0 text-right text-xs font-bold tabular-nums",
												children: [row.accumulatedWeight, " %"]
											})
										]
									})
								]
							}, row.milestone.id);
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-t border-border bg-background px-3 py-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ jsx(Legend, {
							color: scheduleColor("CUMPLIDO"),
							label: "Cumplido"
						}),
						/* @__PURE__ */ jsx(Legend, {
							color: scheduleColor("EN PROCESO"),
							label: "En proceso"
						}),
						/* @__PURE__ */ jsx(Legend, {
							color: scheduleColor("PREVENTIVO"),
							label: "Alerta preventiva"
						}),
						/* @__PURE__ */ jsx(Legend, {
							color: scheduleColor("CRÍTICO"),
							label: "Crítico o vencido"
						}),
						/* @__PURE__ */ jsx(Legend, {
							color: scheduleColor("PENDIENTE"),
							label: "Pendiente"
						})
					]
				}), /* @__PURE__ */ jsx("span", { children: "Línea roja: fecha actual · plazos en días calendario." })]
			})
		]
	});
}
var TONO_ESTADO = {
	CUMPLIDO: "success",
	"EN PROCESO": "primary",
	PENDIENTE: "neutral",
	PREVENTIVO: "warning",
	CRÍTICO: "destructive",
	VENCIDO: "destructive"
};
function Legend({ color, label }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "size-2.5 rounded-sm",
				style: { backgroundColor: color },
				"aria-hidden": true
			}),
			" ",
			label
		]
	});
}
function cloneAcquisitionConfigs() {
	return DEFAULT_CONFIGS.map((process) => ({
		...process,
		milestones: process.milestones.map((milestone) => ({ ...milestone }))
	}));
}
function readAcquisitionMilestoneConfigs() {
	const defaults = cloneAcquisitionConfigs();
	if (typeof window === "undefined") return defaults;
	const stored = window.localStorage.getItem(ACQUISITION_MILESTONES_STORAGE_KEY);
	if (!stored) return defaults;
	try {
		const parsed = JSON.parse(stored);
		if (!Array.isArray(parsed) || parsed.length !== 4) return defaults;
		const defaultDirectAcquisition = defaults.find((item) => item.id === "trato-directo");
		return parsed.map((process) => {
			return process.id === "trato-directo" && process.milestones.length === 12 && process.milestones.every((milestone, index) => milestone.id === `td-${index + 1}`) && defaultDirectAcquisition ? {
				...process,
				milestones: defaultDirectAcquisition.milestones.map((milestone) => ({ ...milestone }))
			} : {
				...process,
				milestones: process.milestones.map((milestone) => ({ ...milestone }))
			};
		});
	} catch {
		return defaults;
	}
}
function resolveProcessType(predio) {
	const context = `${predio?.mod || ""} ${predio?.condicionPredio || ""} ${predio?.tipo || ""}`.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
	if (context.includes("EXPROPI")) return "expropiacion";
	if (context.includes("ESTATAL") || context.includes("INTERESTATAL") || context.includes("SBN")) return "estatales";
	if (context.includes("MEJORA")) return "mejoras";
	return "trato-directo";
}
function inferScheduleStart(predio) {
	const resolutionDate = normalizeDate(predio?.fres);
	if (resolutionDate) return addDaysIso(resolutionDate, -107);
	const registrationDate = normalizeDate(predio?.ftit || predio?.finsc);
	if (registrationDate) return addDaysIso(registrationDate, -135);
	return today();
}
function buildInitialMilestoneProgress(milestones, predio) {
	const activeMilestones = milestones.filter((item) => item.active);
	let completedIndex = -1;
	function completeThrough(search) {
		const index = activeMilestones.findIndex(search);
		if (index >= 0) completedIndex = Math.max(completedIndex, index);
	}
	if (hasRegisteredValue(predio?.cod || predio?.codigo)) completeThrough((item) => item.name.toUpperCase().includes("CÓDIGO PREDIAL"));
	if (hasRegisteredValue(predio?.valor)) completeThrough((item) => item.name.toUpperCase().includes("ITT"));
	if (hasRegisteredValue(predio?.nres || predio?.res)) completeThrough((item) => item.name.toUpperCase().includes("EMISIÓN DE RD"));
	if (hasRegisteredValue(predio?.pago)) completeThrough((item) => item.name.toUpperCase().includes("DEVENGADO"));
	if (hasRegisteredValue(predio?.finsc || predio?.titulo)) completeThrough((item) => item.name.toUpperCase().includes("INSCRIPCIÓN REGISTRAL"));
	if (hasRegisteredValue(predio?.trans || predio?.acta)) completedIndex = activeMilestones.length - 1;
	return Object.fromEntries(activeMilestones.map((milestone, index) => [milestone.id, index <= completedIndex ? "CUMPLIDO" : index === completedIndex + 1 ? "EN PROCESO" : "PENDIENTE"]));
}
function buildGanttRows(milestones, startDate, progressMap, todayIso) {
	let offset = 0;
	let accumulatedWeight = 0;
	return milestones.filter((milestone) => milestone.active).map((milestone) => {
		const duration = Math.max(1, milestone.days);
		const rowStart = addDaysIso(startDate, offset);
		const rowEnd = addDaysIso(rowStart, duration - 1);
		const trackingState = progressMap[milestone.id] ?? "PENDIENTE";
		const progress = trackingState === "CUMPLIDO" ? 100 : trackingState === "EN PROCESO" ? 50 : 0;
		accumulatedWeight += milestone.weight;
		const scheduleStatus = calculateScheduleStatus(milestone, trackingState, rowStart, rowEnd, todayIso);
		const row = {
			milestone,
			startDate: rowStart,
			endDate: rowEnd,
			startOffset: offset,
			duration,
			progress,
			trackingState,
			scheduleStatus,
			accumulatedWeight
		};
		offset += duration;
		return row;
	});
}
function calculateScheduleStatus(milestone, trackingState, startDate, endDate, todayIso) {
	if (trackingState === "CUMPLIDO") return "CUMPLIDO";
	if (todayIso > endDate) return "VENCIDO";
	const criticalDate = addDaysIso(startDate, Math.max(0, milestone.criticalDay - 1));
	const warningDate = addDaysIso(startDate, Math.max(0, milestone.warningDay - 1));
	if (todayIso >= criticalDate) return "CRÍTICO";
	if (todayIso >= warningDate) return "PREVENTIVO";
	if (trackingState === "EN PROCESO") return "EN PROCESO";
	return "PENDIENTE";
}
/** Colores de barra: solo tokens del tema. */
function scheduleColor(status) {
	if (status === "CUMPLIDO") return "var(--color-success)";
	if (status === "EN PROCESO") return "var(--color-primary)";
	if (status === "PREVENTIVO") return "var(--color-highlight)";
	if (status === "CRÍTICO" || status === "VENCIDO") return "var(--color-destructive)";
	return "var(--color-border)";
}
function addDaysIso(value, days) {
	const [year, month, day] = (normalizeDate(value) || today()).split("-").map(Number);
	return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}
function differenceInDays(from, to) {
	const start = Date.parse(`${normalizeDate(from) || from}T00:00:00Z`);
	const end = Date.parse(`${normalizeDate(to) || to}T00:00:00Z`);
	if (!Number.isFinite(start) || !Number.isFinite(end)) return -1;
	return Math.floor((end - start) / 864e5);
}
function hasRegisteredValue(value) {
	const clean = String(value ?? "").trim();
	return clean !== "" && clean !== "-" && clean.toUpperCase() !== "SIN INFORMACION";
}
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function normalizeDate(value) {
	const clean = String(value ?? "").trim();
	if (!clean) return "";
	if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
	const slash = clean.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
	if (slash) {
		const day = slash[1].padStart(2, "0");
		const month = slash[2].padStart(2, "0");
		return `${slash[3].length === 2 ? `20${slash[3]}` : slash[3]}-${month}-${day}`;
	}
	return "";
}
function formatDatePe(value) {
	const iso = (normalizeDate(value) || value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!iso) return String(value || "Sin información");
	return `${iso[3]}/${iso[2]}/${iso[1]}`;
}
//#endregion
export { MonitoreoPredialPage as component };
