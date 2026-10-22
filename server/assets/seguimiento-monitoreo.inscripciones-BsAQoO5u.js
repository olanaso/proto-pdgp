import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as ChartExplanation } from "./ChartExplanation-0Z95AIWE.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FileCheck2, RotateCcw } from "lucide-react";
//#region src/routes/seguimiento-monitoreo.inscripciones.tsx?tsr-split=component
var INSCRITO = "var(--color-primary-dark)";
var EN_TRAMITE = "var(--color-primary)";
var PENDIENTE = "var(--color-highlight)";
var topFilters = [
	"Expediente físico recibido",
	"Formulario registral o fe de entrega",
	"Acta de aceptación",
	"Entrega a la oficina patrimonial (OPAT)",
	"Estado del título registral",
	"Estado de inscripción",
	"Modalidad de adquisición",
	"Estado de recepción documental"
];
var rows = [
	[
		"AERO-JAUJA-PR-0542T",
		"1787-2024-MTC/20",
		"TRANSFERENCIA INTERESTATAL",
		"ESTADO",
		"Inscrito",
		"Completa",
		"Completa",
		"Entregado"
	],
	[
		"AERO-JAUJA-S01-120401-PR-0098",
		"0456-2024-MTC/20",
		"TRATO DIRECTO",
		"ELIO ROMILIA PALACIOS NUNEZ DE P",
		"En tramite",
		"Completa",
		"Completa",
		"Pendiente"
	],
	[
		"AERO-JAUJA-0088",
		"2828-2024-MTC/20",
		"TRATO DIRECTO",
		"COMUNIDAD CAMPESINA DE HUERTAS",
		"Inscrito",
		"Completa",
		"Completa",
		"Entregado"
	],
	[
		"AERO-JAUJA-PR-0654",
		"3832-2024-MTC/20",
		"TRATO DIRECTO",
		"MANUEL DANTE HUARIPATA",
		"No inscrito",
		"Pendiente",
		"Completa",
		"Pendiente"
	],
	[
		"AERO-JAUJA-PR-0052",
		"061-2024-MTC/20",
		"TRATO DIRECTO",
		"ANA JOSEFINA QUISPE",
		"En tramite",
		"Completa",
		"Completa",
		"Pendiente"
	],
	[
		"AERO-JAUJA-PR-0556",
		"0491-2024-MTC/20",
		"TRATO DIRECTO",
		"COMUNIDAD CAMPESINA DE HUERTAS",
		"Inscrito",
		"Completa",
		"Completa",
		"Entregado"
	],
	[
		"AERO-JAUJA-PR-0161",
		"1130-2024-MTC/20",
		"CORPORACION",
		"CESAR AUGUSTO CONDOR",
		"En tramite",
		"Pendiente",
		"Completa",
		"Pendiente"
	],
	[
		"AERO-JAUJA-PR-0612",
		"1129-2024-MTC/20",
		"COPIA DIRECTA",
		"JUAN FARIAS CALDERON",
		"Inscrito",
		"Completa",
		"Completa",
		"Entregado"
	]
];
var estadoTitulo = [
	["En calificación registral", "168"],
	["Inscrito", "279"],
	["No corresponde", "5"],
	["Pendiente de presentación", "44"]
];
var recepcion = [
	["Expediente físico completo", "213"],
	["Expediente digital completo", "226"],
	["Documentación pendiente", "42"],
	["Documentación observada", "15"]
];
var transferencia = [
	["Pendiente de entrega", "185"],
	["Predio recibido por OPAT", "276"],
	["Predio y expediente recibidos por OPAT", "35"]
];
var resumen = [
	[
		"Inscripción registral",
		"37",
		"73",
		"238",
		"143",
		"5",
		"496"
	],
	[
		"Recepción de documentación física",
		"42",
		"86",
		"215",
		"125",
		"8",
		"476"
	],
	[
		"Recepción de documentación digital",
		"29",
		"68",
		"198",
		"133",
		"6",
		"434"
	],
	[
		"Entrega a la oficina patrimonial",
		"21",
		"49",
		"154",
		"96",
		"4",
		"324"
	]
];
var years = [
	"2021",
	"2022",
	"2023",
	"2024",
	"2025"
];
var DEFAULT_YEAR = "2025";
var ALL = "Todas";
var filterColumn = {
	"Expediente físico recibido": 5,
	"Entrega a la oficina patrimonial (OPAT)": 7,
	"Estado del título registral": 4,
	"Estado de inscripción": 4,
	"Modalidad de adquisición": 2,
	"Estado de recepción documental": 6
};
var initialFilters = Object.fromEntries(topFilters.map((filter) => [filter, ALL]));
function filterOptions(filter) {
	const column = filterColumn[filter];
	return column === void 0 ? ["Sí", "No"] : Array.from(new Set(rows.map((row) => row[column])));
}
function TableroInscripcionesPage() {
	const [filters, setFilters] = useState(initialFilters);
	const [year, setYear] = useState(DEFAULT_YEAR);
	const filteredRows = rows.filter((row) => topFilters.every((filter) => {
		const column = filterColumn[filter];
		return filters[filter] === ALL || column === void 0 || row[column] === filters[filter];
	}));
	const reset = () => {
		setFilters(initialFilters);
		setYear(DEFAULT_YEAR);
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: FileCheck2,
			titulo: "Inscripción registral de predios",
			descripcion: "Aeropuerto Internacional de Jauja · Octubre de 2025. Presentación del título, documentación recibida y entrega del expediente a la oficina patrimonial.",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: reset,
				children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Restablecer filtros"]
			})
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: "Datos de demostración. Las cifras de este tablero son de muestra y no provienen de un sistema real."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Filtros",
			className: "mb-4",
			children: /* @__PURE__ */ jsx("div", {
				className: "monitor-filter-band grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8",
				children: topFilters.map((filter) => /* @__PURE__ */ jsxs("label", {
					className: "block min-w-0",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block truncate text-xs font-medium text-foreground",
						title: filter,
						children: filter
					}), /* @__PURE__ */ jsxs("select", {
						value: filters[filter],
						onChange: (event) => setFilters({
							...filters,
							[filter]: event.target.value
						}),
						className: controlClase,
						children: [/* @__PURE__ */ jsx("option", {
							value: ALL,
							children: ALL
						}), filterOptions(filter).map((option) => /* @__PURE__ */ jsx("option", {
							value: option,
							children: readableTableValue(option, filterColumn[filter] ?? -1)
						}, option))]
					})]
				}, filter))
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Indicadores registrales",
			className: "mb-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-3 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(Counter, {
							label: "Total de predios",
							value: "496"
						}),
						/* @__PURE__ */ jsx(Counter, {
							label: "Inscritos",
							value: "279"
						}),
						/* @__PURE__ */ jsx(Counter, {
							label: "En trámite",
							value: "167"
						}),
						/* @__PURE__ */ jsx(Counter, {
							label: "Pendientes",
							value: "50"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4 grid gap-4 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ jsx(SummaryCard, {
							title: "Estado del título presentado",
							rows: estadoTitulo,
							total: "496"
						}),
						/* @__PURE__ */ jsx(SummaryCard, {
							title: "Recepción documental",
							rows: recepcion,
							total: "496"
						}),
						/* @__PURE__ */ jsx(SummaryCard, {
							title: "Entrega a la oficina patrimonial (OPAT)",
							rows: transferencia,
							total: "496"
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-right text-xs text-muted-foreground",
					children: "Cifras actualizadas al 17/10/2025"
				})
			]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Ubicación y estado registral",
			className: "mb-4",
			children: [/* @__PURE__ */ jsx(ChartExplanation, { children: "Cada polígono representa un predio y su color indica el estado de inscripción: rojo oscuro inscrito, rojo en trámite y ámbar pendiente de inscripción." }), /* @__PURE__ */ jsx("div", {
				className: "mt-3",
				children: /* @__PURE__ */ jsx(MapPanel, {})
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Predios y estado registral",
			className: "mb-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsx(ChartExplanation, { children: "Consulte el código para identificar el predio y revise de izquierda a derecha su título, documentación y entrega a la oficina patrimonial." }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: "Año de presentación:"
					}), years.map((option) => /* @__PURE__ */ jsx(Button, {
						type: "button",
						size: "sm",
						variant: option === year ? "default" : "outline",
						"aria-pressed": option === year,
						onClick: () => setYear(option),
						children: option
					}, option))]
				})]
			}), /* @__PURE__ */ jsx(DetailTable, { rows: filteredRows })]
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Resumen anual de actividades",
			className: "monitor-advanced-section mb-4",
			children: /* @__PURE__ */ jsx(ActivityTable, { year })
		})
	] });
}
function MapPanel() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative h-[435px] overflow-hidden rounded-md border border-border bg-muted",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 opacity-40",
				style: {
					backgroundImage: "linear-gradient(30deg, transparent 48%, var(--color-border) 49%, var(--color-border) 50%, transparent 51%), linear-gradient(115deg, transparent 48%, var(--color-border) 49%, var(--color-border) 50%, transparent 51%)",
					backgroundSize: "110px 90px"
				}
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute left-[22%] top-[6%] h-[82%] w-[38%] rotate-[-22deg]",
				children: [Array.from({ length: 52 }).map((_, index) => {
					const x = 8 + index % 7 * 12 + index * 5 % 7;
					const y = 3 + Math.floor(index / 7) * 11;
					const colors = [
						INSCRITO,
						EN_TRAMITE,
						PENDIENTE
					];
					return /* @__PURE__ */ jsx("div", {
						className: "absolute border border-card",
						style: {
							left: `${x}%`,
							top: `${y}%`,
							width: `${8 + index % 3 * 2}%`,
							height: `${7 + index % 4}%`,
							background: colors[index % colors.length]
						}
					}, index);
				}), /* @__PURE__ */ jsx("div", { className: "absolute left-[3%] top-[2%] h-[96%] w-[88%] border-2 border-highlight" })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute bottom-3 right-3 rounded-md border border-border bg-card p-2 text-xs",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mb-1 font-semibold",
						children: "Leyenda"
					}),
					/* @__PURE__ */ jsx(Legend, {
						color: INSCRITO,
						label: "Inscrito"
					}),
					/* @__PURE__ */ jsx(Legend, {
						color: EN_TRAMITE,
						label: "En trámite registral"
					}),
					/* @__PURE__ */ jsx(Legend, {
						color: PENDIENTE,
						label: "Pendiente de inscripción"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute bottom-1 left-2 text-xs text-muted-foreground",
				children: "Mapa de demostración · sin fuente cartográfica"
			})
		]
	});
}
function Legend({ color, label }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-1",
		children: [/* @__PURE__ */ jsx("span", {
			className: "inline-block size-2.5 rounded-sm",
			style: { background: color }
		}), /* @__PURE__ */ jsx("span", { children: label })]
	});
}
var detailHeads = [
	"Código del predio",
	"N.° de expediente",
	"Modalidad de adquisición",
	"Sujeto pasivo o entidad",
	"Estado registral",
	"Expediente físico",
	"Expediente digital",
	"Entrega a OPAT"
];
function DetailTable({ rows }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full min-w-[900px] text-sm",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: detailHeads.map((head) => /* @__PURE__ */ jsx("th", {
				scope: "col",
				className: "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase",
				children: head
			}, head)) }) }), /* @__PURE__ */ jsxs("tbody", {
				className: "[&>tr:nth-child(even)]:bg-background",
				children: [rows.map((row) => /* @__PURE__ */ jsx("tr", {
					className: "h-10 border-t border-border",
					children: row.map((cell, index) => /* @__PURE__ */ jsx("td", {
						className: "px-3 py-2",
						children: index >= 4 ? /* @__PURE__ */ jsx(EstadoBadge, { value: cell }) : readableTableValue(cell, index)
					}, `${row[0]}-${index}`))
				}, row[0])), rows.length === 0 && /* @__PURE__ */ jsx("tr", {
					className: "border-t border-border",
					children: /* @__PURE__ */ jsx("td", {
						colSpan: 8,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Ningún predio coincide con los filtros seleccionados."
					})
				})]
			})]
		})
	}), /* @__PURE__ */ jsxs("p", {
		className: "mt-2 text-xs text-muted-foreground",
		children: [
			"Mostrando ",
			rows.length,
			" de 496 registros"
		]
	})] });
}
function readableTableValue(value, columnIndex) {
	if (columnIndex === 3 && value === "ESTADO") return "Estado peruano";
	if (value === "En tramite") return "En trámite";
	if (columnIndex !== 2) return value;
	return {
		"TRANSFERENCIA INTERESTATAL": "Transferencia de predio estatal",
		"TRATO DIRECTO": "Trato directo",
		CORPORACION: "Corporación",
		"COPIA DIRECTA": "Copia directa"
	}[value] ?? value;
}
function EstadoBadge({ value }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: value === "Inscrito" || value === "Completa" || value === "Entregado" ? "success" : value === "En tramite" ? "primary" : value === "No inscrito" ? "warning" : "neutral",
		children: value === "En tramite" ? "En trámite" : value
	});
}
function Counter({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "text-lg font-semibold tabular-nums text-foreground",
			children: value
		})]
	});
}
var summaryExplanations = {
	"Estado del título presentado": "Muestra cuántos títulos están inscritos, en trámite o pendientes de presentación registral.",
	"Recepción documental": "Compara los expedientes con documentación completa, incompleta o todavía no recibida.",
	"Entrega a la oficina patrimonial (OPAT)": "Indica cuántos predios y expedientes fueron recibidos por la oficina patrimonial y cuántos continúan pendientes."
};
function SummaryCard({ title, rows, total }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: title }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-2",
			children: /* @__PURE__ */ jsx(ChartExplanation, { children: summaryExplanations[title] })
		}),
		/* @__PURE__ */ jsx(Tabla, {
			columnas: [{
				clave: "0",
				titulo: "Situación"
			}, {
				clave: "1",
				titulo: "Predios",
				alinear: "derecha",
				ancho: "90px"
			}],
			filas: [...rows, ["Total", total]],
			claveFila: (f) => f[0]
		})
	] });
}
function ActivityTable({ year }) {
	const yearCls = (index) => years[index - 1] === year ? "bg-primary-soft" : "";
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-x-auto rounded-md border border-border",
		children: /* @__PURE__ */ jsxs("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: [
				"Actividad",
				...years,
				"Total"
			].map((head, index) => /* @__PURE__ */ jsx("th", {
				scope: "col",
				className: `h-9 px-3 text-xs font-semibold uppercase ${index > 0 ? "text-right" : "text-left"} ${yearCls(index)}`,
				children: head
			}, head)) }) }), /* @__PURE__ */ jsxs("tbody", {
				className: "[&>tr:nth-child(even)]:bg-background",
				children: [resumen.map((row) => /* @__PURE__ */ jsx("tr", {
					className: "h-10 border-t border-border",
					children: row.map((cell, index) => /* @__PURE__ */ jsx("td", {
						className: `px-3 py-2 ${index > 0 ? "text-right" : ""} ${yearCls(index)}`,
						children: cell
					}, `${row[0]}-${index}`))
				}, row[0])), /* @__PURE__ */ jsx("tr", {
					className: "h-10 border-t border-border font-semibold text-primary-dark",
					children: [
						"Total",
						"129",
						"276",
						"805",
						"497",
						"23",
						"1.730"
					].map((cell, index) => /* @__PURE__ */ jsx("td", {
						className: `px-3 py-2 ${index > 0 ? "text-right" : ""} ${yearCls(index)}`,
						children: cell
					}, cell))
				})]
			})]
		})
	});
}
//#endregion
export { TableroInscripcionesPage as component };
