import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { a as prediosDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as readProjectBrigades, r as initialProjectBrigades, t as PROJECT_BRIGADES_UPDATED_EVENT } from "./projectTeamsData-D-Nygxw-.js";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Banknote, BriefcaseBusiness, Building2, CircleUserRound, MapPinned, ShieldCheck, UsersRound } from "lucide-react";
//#region src/components/shell/ProyectoResumen.tsx
function Dato({ etiqueta, valor, icono: Icono }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex gap-2 border-b border-border py-2 last:border-b-0",
		children: [/* @__PURE__ */ jsx(Icono, {
			size: 16,
			className: "mt-0.5 shrink-0 text-primary",
			"aria-hidden": true
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: etiqueta
			}), /* @__PURE__ */ jsx("p", {
				className: "break-words text-sm font-medium",
				children: valor
			})]
		})]
	});
}
function Cifra({ etiqueta, valor }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-background px-3 py-2",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-lg font-semibold tabular-nums",
			children: valor
		}), /* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: etiqueta
		})]
	});
}
function Avance({ etiqueta, valor }) {
	const p = Math.min(100, Math.max(0, valor));
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-1 flex items-center justify-between text-xs",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-muted-foreground",
			children: etiqueta
		}), /* @__PURE__ */ jsxs("span", {
			className: "font-semibold tabular-nums",
			children: [p, " %"]
		})]
	}), /* @__PURE__ */ jsx("div", {
		className: "h-1.5 overflow-hidden rounded-sm bg-muted",
		role: "progressbar",
		"aria-valuenow": p,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": etiqueta,
		children: /* @__PURE__ */ jsx("div", {
			className: "h-full bg-primary",
			style: { width: `${p}%` }
		})
	})] });
}
/** Resumen de solo lectura del proyecto activo. Va en el panel lateral del AppShell. */
function ProyectoResumen({ projectId }) {
	const proyecto = getProyecto(projectId);
	const [brigadas, setBrigadas] = useState(initialProjectBrigades);
	useEffect(() => {
		const refrescar = () => setBrigadas(readProjectBrigades(projectId));
		const alCambiar = (event) => {
			const id = event.detail?.projectId;
			if (!id || id === projectId) refrescar();
		};
		refrescar();
		window.addEventListener("storage", refrescar);
		window.addEventListener(PROJECT_BRIGADES_UPDATED_EVENT, alCambiar);
		return () => {
			window.removeEventListener("storage", refrescar);
			window.removeEventListener(PROJECT_BRIGADES_UPDATED_EVENT, alCambiar);
		};
	}, [projectId]);
	const equipo = useMemo(() => ({
		activas: brigadas.filter((b) => b.estado === "Activa").length,
		integrantes: new Set(brigadas.flatMap((b) => b.integrantes.map((m) => m.usuarioId))).size
	}), [brigadas]);
	if (!proyecto) return /* @__PURE__ */ jsxs("div", {
		className: "sticky top-[4.5rem] rounded-lg border border-border bg-card p-6 text-center",
		children: [
			/* @__PURE__ */ jsx(AlertCircle, {
				size: 24,
				className: "mx-auto text-destructive",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm font-semibold",
				children: "Proyecto no encontrado"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					"No hay información consolidada para ",
					projectId,
					"."
				]
			})
		]
	});
	const predios = prediosDelProyecto(projectId);
	const inscritos = predios.filter((p) => p.etapa.etapa === 8).length;
	return /* @__PURE__ */ jsxs("div", {
		className: "sticky top-[4.5rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-lg border border-border bg-card",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "border-b-2 border-primary px-4 py-3",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-bold uppercase text-primary-dark",
						children: "Proyecto activo"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "truncate text-sm font-semibold",
						title: proyecto.nombre,
						children: proyecto.nombre
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: proyecto.codigo
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4 p-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: proyecto.tipo
						}), /* @__PURE__ */ jsx(StatusBadge, {
							tono: "warning",
							children: proyecto.estado
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start gap-2 rounded-md border border-border bg-background p-3",
						children: [/* @__PURE__ */ jsx(MapPinned, {
							size: 16,
							className: "mt-0.5 shrink-0 text-primary",
							"aria-hidden": true
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Fase actual"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold",
							children: proyecto.fase
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "border-b-2 border-primary pb-1 text-xs font-bold uppercase text-primary-dark",
							children: "Resumen operativo"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 grid grid-cols-2 gap-2",
							children: [
								/* @__PURE__ */ jsx(Cifra, {
									etiqueta: "Predios del padrón",
									valor: predios.length
								}),
								/* @__PURE__ */ jsx(Cifra, {
									etiqueta: "Inscritos",
									valor: inscritos
								}),
								/* @__PURE__ */ jsx(Cifra, {
									etiqueta: "En proceso",
									valor: predios.length - inscritos
								}),
								/* @__PURE__ */ jsx(Cifra, {
									etiqueta: "Brigadas",
									valor: brigadas.length
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex items-center justify-between rounded-md border border-border px-3 py-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ jsx(ShieldCheck, {
										size: 14,
										className: "text-primary",
										"aria-hidden": true
									}),
									" ",
									equipo.activas,
									" ",
									"activas"
								]
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ jsx(UsersRound, {
										size: 14,
										className: "text-primary",
										"aria-hidden": true
									}),
									" ",
									equipo.integrantes,
									" ",
									"integrantes"
								]
							})]
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/proyectos/$projectId/equipos",
							params: { projectId },
							className: "mt-2 inline-block text-xs font-semibold text-primary-dark hover:underline",
							children: "Ver equipos y brigadas"
						})
					] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "border-b-2 border-primary pb-1 text-xs font-bold uppercase text-primary-dark",
							children: "Avance y presupuesto"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 space-y-3",
							children: [/* @__PURE__ */ jsx(Avance, {
								etiqueta: "Avance físico",
								valor: proyecto.fisico
							}), /* @__PURE__ */ jsx(Avance, {
								etiqueta: "Avance financiero",
								valor: proyecto.financiero
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex items-center gap-2 rounded-md bg-background px-3 py-2",
							children: [/* @__PURE__ */ jsx(Banknote, {
								size: 16,
								className: "text-primary",
								"aria-hidden": true
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: "Presupuesto"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm font-semibold",
								children: proyecto.presupuesto
							})] })]
						})
					] }),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "border-b-2 border-primary pb-1 text-xs font-bold uppercase text-primary-dark",
							children: "Responsables"
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Coordinación general",
							valor: proyecto.coordinacionGeneral,
							icono: Building2
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Coordinación predial",
							valor: proyecto.coordinacionPredial,
							icono: BriefcaseBusiness
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Coordinador predial",
							valor: proyecto.coordinadorPredial,
							icono: CircleUserRound
						}),
						/* @__PURE__ */ jsx(Dato, {
							etiqueta: "Líder de interferencias",
							valor: proyecto.liderInterferencias,
							icono: CircleUserRound
						})
					] })
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "border-t border-border bg-background px-4 py-2 text-xs text-muted-foreground",
				children: "Solo lectura. Datos consolidados del proyecto y sus equipos."
			})
		]
	});
}
//#endregion
export { ProyectoResumen as t };
