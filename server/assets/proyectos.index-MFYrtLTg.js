import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { r as cn, t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { n as useProyectosDelPerfil } from "./asignacion-Bv9JWe8m.js";
import { x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import * as React from "react";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Briefcase, Building2, ChevronDown, Download, FolderOpen, Home, LayoutGrid, List, MapPin, Network, Pencil, Plus, Search, Table, UserCog, X } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
//#region src/components/ui/accordion.tsx
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
	className: "flex",
	children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
//#endregion
//#region src/routes/proyectos.index.tsx?tsr-split=component
var ESTADO_TONO = {
	"En estructuracion": "warning",
	"En ejecucion": "success",
	"En revision": "primary"
};
var ESTADO_TEXTO = {
	"En estructuracion": "En estructuración",
	"En ejecucion": "En ejecución",
	"En revision": "En revisión"
};
var VISTAS = [
	{
		valor: "grid",
		nombre: "Ver como tarjetas",
		icono: LayoutGrid
	},
	{
		valor: "list",
		nombre: "Ver como lista",
		icono: List
	},
	{
		valor: "table",
		nombre: "Ver como tabla",
		icono: Table
	}
];
function ProyectosPage() {
	const [view, setView] = useState("grid");
	const [search, setSearch] = useState("");
	const [tipoFilter, setTipoFilter] = useState("");
	const [respFilter, setRespFilter] = useState("");
	const rol = useRol();
	const { lista: proyectos, acotado } = useProyectosDelPerfil();
	const filtered = useMemo(() => {
		return proyectos.filter((p) => {
			if (tipoFilter && p.tipo !== tipoFilter) return false;
			if (respFilter && p.coordinadorPredial !== respFilter) return false;
			if (search) {
				const q = search.toLowerCase();
				if (!`${p.nombre} ${p.codigo} ${p.coordinacionPredial} ${p.coordinacionGeneral}`.toLowerCase().includes(q)) return false;
			}
			return true;
		});
	}, [
		proyectos,
		search,
		tipoFilter,
		respFilter
	]);
	const projectGroups = useMemo(() => groupProjects(filtered), [filtered]);
	const exportar = () => exportarExcel("proyectos", [
		{
			titulo: "Código",
			valor: (p) => p.codigo
		},
		{
			titulo: "Proyecto",
			valor: (p) => p.nombre
		},
		{
			titulo: "Tipo",
			valor: (p) => p.tipo
		},
		{
			titulo: "Estado",
			valor: (p) => ESTADO_TEXTO[p.estado]
		},
		{
			titulo: "Fase",
			valor: (p) => p.fase
		},
		{
			titulo: "Coordinación general",
			valor: (p) => p.coordinacionGeneral
		},
		{
			titulo: "Coordinación predial",
			valor: (p) => p.coordinacionPredial
		},
		{
			titulo: "Coordinador predial",
			valor: (p) => p.coordinadorPredial
		},
		{
			titulo: "Líder de interferencias",
			valor: (p) => p.liderInterferencias
		},
		{
			titulo: "Avance físico (%)",
			valor: (p) => p.fisico
		},
		{
			titulo: "Avance financiero (%)",
			valor: (p) => p.financiero
		},
		{
			titulo: "Predios",
			valor: (p) => p.predios
		},
		{
			titulo: "Disponibles",
			valor: (p) => p.disponibles
		},
		{
			titulo: "Presupuesto",
			valor: (p) => p.presupuesto
		}
	], filtered);
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Building2,
			titulo: "Proyectos",
			descripcion: "Gestione proyectos prediales, consulte avances y cambie entre vistas operativas.",
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: exportar,
				children: [/* @__PURE__ */ jsx(Download, {}), " Exportar proyectos"]
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/proyectos/registro",
					children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar proyecto"]
				})
			})] })
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Filtros",
			className: "mb-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "relative min-w-[240px] flex-1",
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
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Buscar por proyecto, código o coordinación",
								className: `${controlClase} pl-9 pr-9`
							}),
							search && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setSearch(""),
								className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground",
								"aria-label": "Limpiar búsqueda",
								children: /* @__PURE__ */ jsx(X, { size: 16 })
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "w-full sm:w-56",
						children: [/* @__PURE__ */ jsx("label", {
							className: "sr-only",
							htmlFor: "filtro-tipo",
							children: "Tipo de proyecto"
						}), /* @__PURE__ */ jsxs("select", {
							id: "filtro-tipo",
							value: tipoFilter,
							onChange: (e) => setTipoFilter(e.target.value),
							className: controlClase,
							children: [/* @__PURE__ */ jsxs("option", {
								value: "",
								children: [
									"Todos los tipos (",
									proyectos.length,
									")"
								]
							}), Array.from(new Set(proyectos.map((p) => p.tipo))).map((t) => /* @__PURE__ */ jsxs("option", {
								value: t,
								children: [
									t,
									" (",
									proyectos.filter((p) => p.tipo === t).length,
									")"
								]
							}, t))]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "w-full sm:w-72",
						children: [/* @__PURE__ */ jsx("label", {
							className: "sr-only",
							htmlFor: "filtro-coordinador",
							children: "Coordinador predial"
						}), /* @__PURE__ */ jsxs("select", {
							id: "filtro-coordinador",
							value: respFilter,
							onChange: (e) => setRespFilter(e.target.value),
							className: controlClase,
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Todos los coordinadores"
							}), Array.from(new Set(proyectos.map((p) => p.coordinadorPredial))).map((r) => /* @__PURE__ */ jsx("option", {
								value: r,
								children: r
							}, r))]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						role: "group",
						"aria-label": "Tipo de vista",
						className: "ml-auto flex gap-1",
						children: VISTAS.map((v) => /* @__PURE__ */ jsx(Button, {
							type: "button",
							size: "icon",
							variant: view === v.valor ? "default" : "outline",
							"aria-pressed": view === v.valor,
							"aria-label": v.nombre,
							title: v.nombre,
							onClick: () => setView(v.valor),
							children: /* @__PURE__ */ jsx(v.icono, {})
						}, v.valor))
					})
				]
			}), /* @__PURE__ */ jsxs("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-semibold text-foreground",
						children: filtered.length
					}),
					" proyectos en",
					" ",
					/* @__PURE__ */ jsx("span", {
						className: "font-semibold text-foreground",
						children: projectGroups.length
					}),
					" grupos ·",
					acotado && ` Proyectos asignados al perfil ${ROLES[rol]} ·`,
					" Datos de demostración"
				]
			})]
		}),
		/* @__PURE__ */ jsx(ProjectGroups, {
			groups: projectGroups,
			view
		})
	] });
}
function getProjectGroup(p) {
	const airportGroup = p.coordinacionPredial.match(/Aeropuertos\s+0?(\d+)/i);
	if (airportGroup) return `Grupo de Aeropuertos ${airportGroup[1]}`;
	const roadGroup = p.coordinacionGeneral.match(/Vial\s+0?(\d+)/i);
	if (roadGroup) return `Grupo de Proyectos Viales ${roadGroup[1]}`;
	if (p.coordinacionGeneral.toLowerCase().includes("proyectos viales y especiales")) return "Grupo de Proyectos Viales y Especiales";
	return "Otros proyectos";
}
function groupProjects(items) {
	const groups = /* @__PURE__ */ new Map();
	items.forEach((project) => {
		const groupName = getProjectGroup(project);
		const groupItems = groups.get(groupName) ?? [];
		groupItems.push(project);
		groups.set(groupName, groupItems);
	});
	return Array.from(groups, ([name, projects]) => ({
		name,
		projects
	}));
}
function ProjectGroups({ groups, view }) {
	if (groups.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center",
		children: [
			/* @__PURE__ */ jsx(FolderOpen, {
				size: 28,
				className: "mx-auto text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm font-semibold",
				children: "No se encontraron proyectos"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Pruebe con otros filtros o términos de búsqueda."
			})
		]
	});
	return /* @__PURE__ */ jsx(Accordion, {
		type: "multiple",
		defaultValue: groups[0] ? [groups[0].name] : [],
		className: "space-y-4",
		children: groups.map((group) => /* @__PURE__ */ jsxs(AccordionItem, {
			value: group.name,
			className: "overflow-hidden rounded-lg border border-border bg-card",
			children: [/* @__PURE__ */ jsx(AccordionTrigger, {
				className: "px-4 py-3 hover:bg-muted hover:no-underline",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						"aria-hidden": true,
						className: "flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
						children: /* @__PURE__ */ jsx(FolderOpen, { size: 16 })
					}), /* @__PURE__ */ jsxs("span", {
						className: "min-w-0 text-left",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block truncate text-base font-semibold",
							children: group.name
						}), /* @__PURE__ */ jsxs("span", {
							className: "block text-xs font-normal text-muted-foreground",
							children: [
								group.projects.length,
								" ",
								group.projects.length === 1 ? "proyecto" : "proyectos"
							]
						})]
					})]
				})
			}), /* @__PURE__ */ jsxs(AccordionContent, {
				className: "border-t border-border bg-background p-4",
				children: [
					view === "grid" && /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
						children: group.projects.map((p) => /* @__PURE__ */ jsx(ProyectoCard, { p }, p.id))
					}),
					view === "list" && /* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: group.projects.map((p) => /* @__PURE__ */ jsx(ProyectoRow, { p }, p.id))
					}),
					view === "table" && /* @__PURE__ */ jsx(ProyectosTable, { items: group.projects })
				]
			})]
		}, group.name))
	});
}
function ProyectoCard({ p }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative h-40 shrink-0 bg-muted",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: p.img,
					alt: "",
					className: "size-full object-cover",
					loading: "lazy"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "absolute left-3 top-3",
					children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: ESTADO_TONO[p.estado],
						children: ESTADO_TEXTO[p.estado]
					})
				}),
				/* @__PURE__ */ jsx("span", {
					className: "absolute right-3 top-3",
					children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: "primary",
						children: p.tipo
					})
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex min-h-0 flex-1 flex-col p-4",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold text-muted-foreground",
					children: p.codigo
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "mt-0.5 line-clamp-2 text-base font-semibold leading-snug",
					children: p.nombre
				}),
				/* @__PURE__ */ jsxs("ul", {
					className: "mt-2 space-y-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx(Meta, {
							icono: Briefcase,
							texto: p.coordinacionGeneral
						}),
						/* @__PURE__ */ jsx(Meta, {
							icono: MapPin,
							texto: p.coordinacionPredial
						}),
						/* @__PURE__ */ jsx(Meta, {
							icono: UserCog,
							texto: p.coordinadorPredial
						}),
						/* @__PURE__ */ jsx(Meta, {
							icono: Network,
							texto: p.liderInterferencias
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 space-y-2",
					children: [/* @__PURE__ */ jsx(Avance, {
						etiqueta: "Avance físico",
						valor: p.fisico
					}), /* @__PURE__ */ jsx(Avance, {
						etiqueta: "Avance financiero",
						valor: p.financiero
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ jsx(Cifra, {
						etiqueta: "Predios",
						valor: p.predios
					}), /* @__PURE__ */ jsx(Cifra, {
						etiqueta: "Disponibles",
						valor: p.disponibles
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-auto pt-3",
					children: /* @__PURE__ */ jsx(Button, {
						asChild: true,
						className: "w-full",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/proyectos/$projectId",
							params: { projectId: p.id },
							children: "Ver proyecto"
						})
					})
				})
			]
		})]
	});
}
function Meta({ icono: Icono, texto }) {
	return /* @__PURE__ */ jsxs("li", {
		className: "flex items-start gap-1.5",
		children: [/* @__PURE__ */ jsx(Icono, {
			size: 14,
			className: "mt-0.5 shrink-0 text-primary",
			"aria-hidden": true
		}), /* @__PURE__ */ jsx("span", {
			className: "line-clamp-1",
			children: texto
		})]
	});
}
function Avance({ etiqueta, valor }) {
	const p = Math.min(100, Math.max(0, valor));
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between text-xs",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-muted-foreground",
			children: etiqueta
		}), /* @__PURE__ */ jsxs("span", {
			className: "font-semibold tabular-nums",
			children: [p, " %"]
		})]
	}), /* @__PURE__ */ jsx("div", {
		className: "mt-1 h-1.5 overflow-hidden rounded-sm bg-muted",
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
function Cifra({ etiqueta, valor }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border px-3 py-2",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "flex items-center gap-1 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ jsx(Home, {
					size: 14,
					"aria-hidden": true
				}),
				" ",
				etiqueta
			]
		}), /* @__PURE__ */ jsx("p", {
			className: "text-lg font-semibold tabular-nums",
			children: valor
		})]
	});
}
function ProyectoRow({ p }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "flex overflow-hidden rounded-lg border border-border bg-card",
		children: [/* @__PURE__ */ jsx("div", {
			className: "hidden w-48 shrink-0 bg-muted sm:block",
			children: /* @__PURE__ */ jsx("img", {
				src: p.img,
				alt: "",
				className: "h-full w-full object-cover",
				loading: "lazy"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid flex-1 gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_auto]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: p.codigo
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-base font-semibold",
								children: p.nombre
							}),
							/* @__PURE__ */ jsx(StatusBadge, {
								tono: "primary",
								children: p.tipo
							}),
							/* @__PURE__ */ jsx(StatusBadge, {
								tono: ESTADO_TONO[p.estado],
								children: ESTADO_TEXTO[p.estado]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ jsx(Dato, {
								icono: Briefcase,
								etiqueta: "Coordinación general",
								valor: p.coordinacionGeneral
							}),
							/* @__PURE__ */ jsx(Dato, {
								icono: MapPin,
								etiqueta: "Coordinación predial",
								valor: p.coordinacionPredial
							}),
							/* @__PURE__ */ jsx(Dato, {
								icono: UserCog,
								etiqueta: "Coordinador predial",
								valor: p.coordinadorPredial
							}),
							/* @__PURE__ */ jsx(Dato, {
								icono: Network,
								etiqueta: "Líder de interferencias",
								valor: p.liderInterferencias
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ jsx(Dato, {
								etiqueta: "Fase",
								valor: p.fase
							}),
							/* @__PURE__ */ jsx(Dato, {
								etiqueta: "Predios",
								valor: String(p.predios)
							}),
							/* @__PURE__ */ jsx(Dato, {
								etiqueta: "Disponibles",
								valor: String(p.disponibles)
							}),
							/* @__PURE__ */ jsx(Dato, {
								etiqueta: "Presupuesto",
								valor: p.presupuesto
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 space-y-2",
						children: [/* @__PURE__ */ jsx(Avance, {
							etiqueta: "Avance físico",
							valor: p.fisico
						}), /* @__PURE__ */ jsx(Avance, {
							etiqueta: "Avance financiero",
							valor: p.financiero
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col justify-end gap-2 lg:min-w-[180px]",
				children: [/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/registro",
						search: { id: p.id },
						children: [/* @__PURE__ */ jsx(Pencil, {}), " Editar proyecto"]
					})
				}), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					children: /* @__PURE__ */ jsx(Link, {
						to: "/proyectos/$projectId",
						params: { projectId: p.id },
						children: "Ver proyecto"
					})
				})]
			})]
		})]
	});
}
function Dato({ icono: Icono, etiqueta, valor }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "flex items-center gap-1 text-xs text-muted-foreground",
			children: [Icono && /* @__PURE__ */ jsx(Icono, {
				size: 14,
				"aria-hidden": true
			}), etiqueta]
		}), /* @__PURE__ */ jsx("p", {
			className: "truncate text-sm font-semibold",
			title: valor,
			children: valor
		})]
	});
}
function ProyectosTable({ items }) {
	return /* @__PURE__ */ jsx(Tabla, {
		columnas: [
			{
				clave: "codigo",
				titulo: "Código",
				render: (p) => /* @__PURE__ */ jsx("span", {
					className: "whitespace-nowrap font-semibold",
					children: p.codigo
				})
			},
			{
				clave: "nombre",
				titulo: "Proyecto",
				render: (p) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
					className: "block font-semibold",
					children: p.nombre
				}), /* @__PURE__ */ jsx("span", {
					className: "block text-xs text-muted-foreground",
					children: p.fase
				})] })
			},
			{
				clave: "tipo",
				titulo: "Tipo",
				render: (p) => /* @__PURE__ */ jsx(StatusBadge, {
					tono: "primary",
					children: p.tipo
				})
			},
			{
				clave: "coordinacionGeneral",
				titulo: "Coordinación general"
			},
			{
				clave: "coordinacionPredial",
				titulo: "Coordinación predial"
			},
			{
				clave: "coordinadorPredial",
				titulo: "Coordinador predial",
				render: (p) => /* @__PURE__ */ jsx("span", {
					className: "whitespace-nowrap",
					children: p.coordinadorPredial
				})
			},
			{
				clave: "liderInterferencias",
				titulo: "Líder de interferencias",
				render: (p) => /* @__PURE__ */ jsx("span", {
					className: "whitespace-nowrap",
					children: p.liderInterferencias
				})
			},
			{
				clave: "fisico",
				titulo: "Avance físico",
				ancho: "140px",
				render: (p) => /* @__PURE__ */ jsx(Avance, {
					etiqueta: "Físico",
					valor: p.fisico
				})
			},
			{
				clave: "financiero",
				titulo: "Avance financiero",
				ancho: "140px",
				render: (p) => /* @__PURE__ */ jsx(Avance, {
					etiqueta: "Financiero",
					valor: p.financiero
				})
			},
			{
				clave: "predios",
				titulo: "Predios",
				alinear: "derecha",
				render: (p) => /* @__PURE__ */ jsx("span", {
					className: "font-semibold tabular-nums",
					children: p.predios
				})
			},
			{
				clave: "estado",
				titulo: "Estado",
				render: (p) => /* @__PURE__ */ jsx(StatusBadge, {
					tono: ESTADO_TONO[p.estado],
					children: ESTADO_TEXTO[p.estado]
				})
			},
			{
				clave: "acciones",
				titulo: "Acciones",
				alinear: "derecha",
				render: (p) => /* @__PURE__ */ jsxs("span", {
					className: "flex justify-end gap-1",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "icon",
						variant: "ghost",
						className: "size-8",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/proyectos/registro",
							search: { id: p.id },
							"aria-label": `Editar ${p.nombre}`,
							title: "Editar proyecto",
							children: /* @__PURE__ */ jsx(Pencil, {})
						})
					}), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "icon",
						variant: "ghost",
						className: "size-8",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/proyectos/$projectId",
							params: { projectId: p.id },
							"aria-label": `Ver ${p.nombre}`,
							title: "Ver proyecto",
							children: /* @__PURE__ */ jsx(ArrowRight, {})
						})
					})]
				})
			}
		],
		filas: items,
		claveFila: (p) => p.id,
		vacio: "No hay proyectos en este grupo."
	});
}
//#endregion
export { ProyectosPage as component };
