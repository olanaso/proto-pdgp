import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { r as cn } from "./button-DH6ZQkjT.js";
import { c as MENU_PROYECTO, u as ROLES } from "./historial-Bc37nCTn.js";
import { u as estadoObligatorias, w as useCapas } from "./capas-B7cJ7zRJ.js";
import { l as tienePermiso, u as useRol } from "./permisos-C7yUz4DS.js";
import { n as useProyectosDelPerfil } from "./asignacion-Bv9JWe8m.js";
import { Ct as recordarModulo, Et as useRutaActual, St as moduloActual, Tt as useModuloRecordado, n as etiquetaProyecto, wt as rutaActiva } from "./PredioEncabezado-FhqZ2Jv6.js";
import * as React from "react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Link, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Check, ChevronDown, ChevronsUpDown, FolderOpen, PanelRightOpen, Search, TriangleAlert, X } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { toast } from "sonner";
import * as PopoverPrimitive from "@radix-ui/react-popover";
//#region src/components/shell/seleccionContexto.ts
/** Qué le falta a la ruta para abrirse con los parámetros de la pantalla actual. */
function faltaContexto(to, params) {
	const ruta = String(to);
	if (ruta.includes("$projectId") && !params.projectId) return "proyecto";
	if (ruta.includes("$codigo") && !params.codigo) return "predio";
	return null;
}
var pedido = null;
var secuencia = 0;
var oyentes$1 = /* @__PURE__ */ new Set();
var avisar = () => oyentes$1.forEach((f) => f());
/** Abre el selector; al elegir, se navega a `to` con el proyecto y el predio elegidos. */
function pedirContexto(p) {
	pedido = {
		...p,
		id: ++secuencia
	};
	avisar();
}
function cerrarPedido() {
	pedido = null;
	avisar();
}
function usePedido() {
	return useSyncExternalStore((f) => {
		oyentes$1.add(f);
		return () => {
			oyentes$1.delete(f);
		};
	}, () => pedido, () => null);
}
//#endregion
//#region src/components/ui/popover.tsx
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(PopoverPrimitive.Content, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
//#endregion
//#region src/components/shell/sidebarStore.ts
var CLAVE = "pdgp-sidebar-colapsado";
var colapsado = false;
var leido = false;
var oyentes = /* @__PURE__ */ new Set();
function leer() {
	if (leido) return;
	leido = true;
	try {
		colapsado = window.matchMedia("(max-width: 767px)").matches || localStorage.getItem(CLAVE) === "1";
	} catch {}
}
function alternarSidebar() {
	colapsado = !colapsado;
	try {
		localStorage.setItem(CLAVE, colapsado ? "1" : "0");
	} catch {}
	oyentes.forEach((f) => f());
}
function useSidebarColapsado() {
	return useSyncExternalStore((f) => {
		const antes = colapsado;
		leer();
		oyentes.add(f);
		if (antes !== colapsado) queueMicrotask(f);
		return () => oyentes.delete(f);
	}, () => colapsado, () => false);
}
//#endregion
//#region src/components/ui/sheet.tsx
var Sheet$1 = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(SheetPrimitive.Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ jsxs(SheetPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
//#endregion
//#region src/components/mapa/AlertaCapasObligatorias.tsx
/** Texto corto de lo que falta: "falta Delimitación del proyecto; Área de concesión sin aprobar". */
function textoPendientes(pendientes) {
	return pendientes.map((o) => o.estado === "FALTA" ? `falta ${o.nombre}` : `${o.nombre} sin aprobar`).join("; ");
}
/**
* Alerta de capas obligatorias (base gráfica del proyecto): un aviso fijo arriba de cada pantalla del
* proyecto y de sus predios, y un recordatorio emergente cada vez que se cambia de pantalla, hasta que
* la delimitación del proyecto y el área de concesión estén registradas y aprobadas.
*/
function AlertaCapasObligatorias({ projectId }) {
	const capas = useCapas(projectId);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const pendientes = estadoObligatorias(capas, projectId).filter((o) => o.estado !== "OK");
	const faltan = pendientes.some((o) => o.estado === "FALTA");
	const resumen = textoPendientes(pendientes);
	useEffect(() => {
		if (!resumen) return;
		toast.warning("Base gráfica incompleta", {
			id: `capas-obligatorias-${projectId}`,
			description: `${resumen.charAt(0).toUpperCase()}${resumen.slice(1)}. Sin ellas no se puede delimitar la adquisición de predios.`,
			duration: 8e3
		});
	}, [
		pathname,
		resumen,
		projectId
	]);
	if (!pendientes.length) return null;
	return /* @__PURE__ */ jsxs("div", {
		role: "alert",
		className: `mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border px-3 py-2 text-sm ${faltan ? "border-destructive bg-destructive-soft text-destructive" : "border-warning bg-warning-soft text-warning"}`,
		children: [
			/* @__PURE__ */ jsx(TriangleAlert, {
				size: 18,
				className: "shrink-0",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ jsx("strong", { children: "Capas obligatorias de la base gráfica:" }),
					" ",
					resumen,
					". Sin ellas no se puede delimitar la adquisición de predios del proyecto."
				]
			}),
			!pathname.endsWith("/base-grafica") && /* @__PURE__ */ jsx(Link, {
				to: "/proyectos/$projectId/base-grafica",
				params: { projectId },
				className: "shrink-0 font-semibold underline underline-offset-2",
				children: "Registrarlas en la base gráfica"
			})
		]
	});
}
//#endregion
//#region src/components/shell/ModuleSidebar.tsx
function leerUsuario() {
	try {
		return localStorage.getItem("mtc-session") ?? "";
	} catch {
		return "";
	}
}
/** Sidebar de un módulo: nivel 1 secciones, nivel 2 pantallas. Nunca más de dos niveles. */
function ModuleSidebar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const params = useParams({ strict: false });
	const colapsado = useSidebarColapsado();
	const modulo = moduloActual(pathname, useModuloRecordado());
	useEffect(() => recordarModulo(modulo.numero), [modulo.numero]);
	const rol = useRol();
	const puedeLeer = tienePermiso(rol, modulo.numero, "Lectura");
	const puedeEditar = tienePermiso(rol, modulo.numero, "Edición");
	const [usuario, setUsuario] = useState("");
	useEffect(() => setUsuario(leerUsuario()), []);
	const pideElegir = modulo.secciones.some((s) => s.pantallas.some((p) => faltaContexto(p.to, params)));
	return /* @__PURE__ */ jsxs("aside", {
		"aria-label": `Menú del módulo ${modulo.numero}`,
		className: `sticky top-14 flex h-[calc(100vh-3.5rem)] shrink-0 flex-col border-r border-border bg-card ${colapsado ? "w-14" : "w-60"}`,
		children: [
			!colapsado && /* @__PURE__ */ jsx("div", {
				className: "border-b border-border px-4 py-3",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						"aria-hidden": true,
						className: "flex size-9 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary-dark",
						children: (usuario || "U").slice(0, 2).toUpperCase()
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("p", {
							className: "truncate text-sm font-semibold",
							children: usuario || "Usuario"
						}), /* @__PURE__ */ jsxs("p", {
							className: "truncate text-xs text-muted-foreground",
							children: [ROLES[rol], " · DDP"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `bg-primary px-3 py-2 text-primary-foreground ${colapsado ? "text-center" : ""}`,
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase",
					children: colapsado ? `M${modulo.numero}` : `Módulo ${modulo.numero}`
				}), !colapsado && /* @__PURE__ */ jsx("p", {
					className: "truncate text-sm font-semibold",
					children: modulo.nombre
				})]
			}),
			!colapsado && !puedeLeer && /* @__PURE__ */ jsxs("p", {
				role: "alert",
				className: "border-b border-border bg-destructive-soft px-3 py-2 text-xs text-destructive",
				children: [
					"El perfil ",
					ROLES[rol],
					" no tiene acceso a este módulo. Cambie de perfil en la barra superior."
				]
			}),
			!colapsado && puedeLeer && !puedeEditar && /* @__PURE__ */ jsxs("p", {
				className: "border-b border-border bg-muted px-3 py-2 text-xs text-muted-foreground",
				children: [
					"Solo lectura para el perfil ",
					ROLES[rol],
					"."
				]
			}),
			!colapsado && puedeLeer && pideElegir && /* @__PURE__ */ jsx("p", {
				className: "border-b border-border px-3 py-2 text-xs text-muted-foreground",
				children: "Las pantallas con «…» piden elegir el proyecto o el predio antes de abrirse."
			}),
			/* @__PURE__ */ jsx("nav", {
				className: "min-h-0 flex-1 overflow-y-auto py-2",
				children: modulo.secciones.map((s) => /* @__PURE__ */ jsx(SeccionItem$1, {
					seccion: s,
					pathname,
					params,
					colapsado
				}, s.nombre))
			})
		]
	});
}
function SeccionItem$1({ seccion, pathname, params, colapsado }) {
	const contieneActiva = seccion.pantallas.some((p) => rutaActiva(p.to, pathname));
	const [abierta, setAbierta] = useState(true);
	const Icono = seccion.icono;
	if (colapsado) {
		const primera = seccion.pantallas[0];
		const falta = faltaContexto(primera.to, params);
		const clase = `mx-auto my-1 flex size-10 items-center justify-center rounded ${contieneActiva ? "bg-primary-soft text-primary-dark" : "text-foreground hover:bg-muted"}`;
		return falta ? /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => pedirContexto({
				to: primera.to,
				nombre: primera.nombre,
				params
			}),
			title: `${seccion.nombre}: pide elegir el ${falta}`,
			"aria-label": `${seccion.nombre}: pide elegir el ${falta}`,
			"aria-haspopup": "dialog",
			className: clase,
			children: /* @__PURE__ */ jsx(Icono, { size: 20 })
		}) : /* @__PURE__ */ jsx(Link, {
			to: primera.to,
			params,
			title: seccion.nombre,
			"aria-label": seccion.nombre,
			className: clase,
			children: /* @__PURE__ */ jsx(Icono, { size: 20 })
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "px-2",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setAbierta((v) => !v),
			"aria-expanded": abierta,
			className: `flex h-10 w-full items-center gap-2 rounded px-2 text-left text-sm ${contieneActiva ? "font-semibold text-primary-dark" : "text-foreground hover:bg-muted"}`,
			children: [
				/* @__PURE__ */ jsx(Icono, {
					size: 20,
					className: "shrink-0 text-primary"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "min-w-0 flex-1 truncate",
					children: seccion.nombre
				}),
				/* @__PURE__ */ jsx(ChevronDown, {
					size: 16,
					className: `shrink-0 text-muted-foreground transition-transform ${abierta ? "" : "-rotate-90"}`
				})
			]
		}), abierta && /* @__PURE__ */ jsx("ul", {
			className: "mb-1 ml-4 border-l border-border pl-1",
			children: seccion.pantallas.map((p) => {
				const activa = rutaActiva(p.to, pathname);
				const falta = faltaContexto(p.to, params);
				const clase = `flex min-h-9 w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm ${activa ? "bg-primary-soft font-medium text-primary-dark" : "text-foreground hover:bg-muted"}`;
				const contenido = /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("span", {
					className: "min-w-0 flex-1",
					children: [p.nombre, falta && "…"]
				}), p.nueva && /* @__PURE__ */ jsx("span", {
					className: "rounded-sm bg-highlight px-1 text-xs font-semibold text-highlight-foreground",
					children: "Nuevo"
				})] });
				return /* @__PURE__ */ jsx("li", { children: falta ? /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => pedirContexto({
						to: p.to,
						nombre: p.nombre,
						params
					}),
					title: textoFalta(falta),
					"aria-haspopup": "dialog",
					className: clase,
					children: contenido
				}) : /* @__PURE__ */ jsx(Link, {
					to: p.to,
					params,
					"aria-current": activa ? "page" : void 0,
					className: clase,
					children: contenido
				}) }, p.nombre);
			})
		})]
	});
}
function textoFalta(falta) {
	return falta === "proyecto" ? "Pide elegir el proyecto antes de abrirse" : "Pide elegir el predio antes de abrirse";
}
//#endregion
//#region src/components/shell/ProyectoSidebar.tsx
/** La pantalla está activa si la ruta es la suya o una de sus subpantallas (Base gráfica → Registro de capa). */
function activa(to, pathname, exacta) {
	const base = to.replace(/\$[a-zA-Z]+/g, "[^/]+");
	return new RegExp(`^${base}${exacta ? "/?" : "(/.*)?"}$`).test(pathname);
}
var RAIZ = "/proyectos/$projectId";
/**
* Menú de un proyecto: dos niveles (sección → pantalla) con las pantallas de proyecto de M10, M11,
* M12 y M29. Reemplaza al sidebar del módulo en `/proyectos/$projectId/*`, igual que el menú por
* etapas lo hace dentro de un predio.
*/
function ProyectoSidebar({ projectId }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const colapsado = useSidebarColapsado();
	const rol = useRol();
	const proyecto = proyectos.find((p) => p.id === projectId);
	const secciones = MENU_PROYECTO.filter((s) => tienePermiso(rol, s.modulo, "Lectura"));
	return /* @__PURE__ */ jsxs("aside", {
		"aria-label": "Menú del proyecto",
		className: `sticky top-14 flex h-[calc(100vh-3.5rem)] shrink-0 flex-col border-r border-border bg-card ${colapsado ? "w-14" : "w-60"}`,
		children: [
			!colapsado && /* @__PURE__ */ jsxs("div", {
				className: "space-y-2 border-b border-border p-3",
				children: [/* @__PURE__ */ jsxs(Link, {
					to: "/proyectos",
					className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-primary-dark",
					children: [/* @__PURE__ */ jsx(ArrowLeft, {
						size: 14,
						"aria-hidden": true
					}), "Lista de proyectos"]
				}), /* @__PURE__ */ jsx(ProyectoSelector, { projectId })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `bg-primary px-3 py-2 text-primary-foreground ${colapsado ? "text-center" : ""}`,
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase",
					children: colapsado ? "Proy." : `Proyecto ${proyecto?.codigo ?? ""}`
				}), !colapsado && /* @__PURE__ */ jsx("p", {
					className: "truncate text-sm font-semibold",
					children: etiquetaProyecto(proyecto, projectId)
				})]
			}),
			/* @__PURE__ */ jsx("nav", {
				className: "min-h-0 flex-1 overflow-y-auto py-2",
				children: secciones.map((s) => /* @__PURE__ */ jsx(SeccionItem, {
					seccion: s,
					projectId,
					pathname,
					colapsado
				}, s.nombre))
			})
		]
	});
}
function SeccionItem({ seccion, projectId, pathname, colapsado }) {
	const directa = seccion.pantallas.length === 1;
	const esActiva = (to) => activa(to, pathname, to === RAIZ);
	const contieneActiva = seccion.pantallas.some((p) => esActiva(String(p.to)));
	const [abierta, setAbierta] = useState(true);
	const Icono = seccion.icono;
	if (colapsado || directa) return /* @__PURE__ */ jsx("div", {
		className: "px-2",
		children: /* @__PURE__ */ jsxs(Link, {
			to: String(seccion.pantallas[0].to),
			params: { projectId },
			title: seccion.nombre,
			"aria-label": colapsado ? seccion.nombre : void 0,
			"aria-current": directa && contieneActiva ? "page" : void 0,
			className: colapsado ? `mx-auto my-1 flex size-10 items-center justify-center rounded ${contieneActiva ? "bg-primary-soft text-primary-dark" : "text-foreground hover:bg-muted"}` : `flex h-10 w-full items-center gap-2 rounded px-2 text-left text-sm ${contieneActiva ? "bg-primary-soft font-semibold text-primary-dark" : "text-foreground hover:bg-muted"}`,
			children: [/* @__PURE__ */ jsx(Icono, {
				size: 20,
				className: colapsado ? "" : "shrink-0 text-primary",
				"aria-hidden": true
			}), !colapsado && /* @__PURE__ */ jsx("span", {
				className: "min-w-0 flex-1 truncate",
				children: seccion.nombre
			})]
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "px-2",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setAbierta((v) => !v),
			"aria-expanded": abierta,
			className: `flex h-10 w-full items-center gap-2 rounded px-2 text-left text-sm ${contieneActiva ? "font-semibold text-primary-dark" : "text-foreground hover:bg-muted"}`,
			children: [
				/* @__PURE__ */ jsx(Icono, {
					size: 20,
					className: "shrink-0 text-primary",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsx("span", {
					className: "min-w-0 flex-1 truncate",
					children: seccion.nombre
				}),
				/* @__PURE__ */ jsx(ChevronDown, {
					size: 16,
					className: `shrink-0 text-muted-foreground transition-transform ${abierta ? "" : "-rotate-90"}`,
					"aria-hidden": true
				})
			]
		}), abierta && /* @__PURE__ */ jsx("ul", {
			className: "mb-1 ml-4 border-l border-border pl-1",
			children: seccion.pantallas.map((p) => {
				const on = esActiva(String(p.to));
				return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
					to: p.to,
					params: { projectId },
					"aria-current": on ? "page" : void 0,
					className: `flex min-h-9 items-center gap-2 rounded px-2 py-1.5 text-sm ${on ? "bg-primary-soft font-medium text-primary-dark" : "text-foreground hover:bg-muted"}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "min-w-0 flex-1",
						children: p.nombre
					}), p.nueva && /* @__PURE__ */ jsx("span", {
						className: "rounded-sm bg-highlight px-1 text-xs font-semibold text-highlight-foreground",
						children: "Nuevo"
					})]
				}) }, p.nombre);
			})
		})]
	});
}
/** Cambia de proyecto sin salir de la pantalla: de Equipos de Trujillo a Equipos de Jauja. */
function ProyectoSelector({ projectId }) {
	const navigate = useNavigate();
	const rutaActual = useRutaActual();
	const [abierto, setAbierto] = useState(false);
	const [texto, setTexto] = useState("");
	const actual = proyectos.find((p) => p.id === projectId);
	const { lista: delPerfil } = useProyectosDelPerfil();
	const visibles = useMemo(() => {
		const t = texto.trim().toLocaleLowerCase("es-PE");
		return t ? delPerfil.filter((p) => `${p.codigo} ${p.nombre} ${p.tipo}`.toLocaleLowerCase("es-PE").includes(t)) : delPerfil;
	}, [texto, delPerfil]);
	const elegir = (id) => {
		setAbierto(false);
		setTexto("");
		navigate({
			to: rutaActual,
			params: { projectId: id }
		});
	};
	return /* @__PURE__ */ jsxs(Popover, {
		open: abierto,
		onOpenChange: (v) => {
			setAbierto(v);
			if (!v) setTexto("");
		},
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				"aria-label": "Cambiar de proyecto",
				"aria-expanded": abierto,
				className: "flex h-9 w-full items-center gap-2 rounded-md border border-border bg-card px-3 text-left text-sm hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
				children: [
					/* @__PURE__ */ jsx(FolderOpen, {
						size: 16,
						className: "shrink-0 text-primary",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "min-w-0 flex-1 truncate font-semibold",
						children: actual?.nombre ?? projectId
					}),
					/* @__PURE__ */ jsx(ChevronsUpDown, {
						size: 16,
						className: "shrink-0 text-muted-foreground",
						"aria-hidden": true
					})
				]
			})
		}), /* @__PURE__ */ jsxs(PopoverContent, {
			align: "start",
			sideOffset: 6,
			className: "z-[10000] w-80 p-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "border-b border-border p-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx(Search, {
						size: 16,
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": true
					}), /* @__PURE__ */ jsx("input", {
						autoFocus: true,
						value: texto,
						onChange: (e) => setTexto(e.target.value),
						placeholder: "Código o nombre del proyecto",
						"aria-label": "Buscar proyecto",
						className: `${controlClase} pl-9`
					})]
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						visibles.length,
						" de ",
						proyectos.length,
						" proyectos"
					]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "max-h-72 overflow-y-auto p-1.5",
				children: visibles.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "px-3 py-6 text-center text-sm text-muted-foreground",
					children: "Ningún proyecto coincide."
				}) : visibles.map((p) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => elegir(p.id),
					"aria-current": p.id === projectId ? "true" : void 0,
					className: `flex w-full items-start gap-2 rounded-md px-2.5 py-2 text-left hover:bg-primary-soft ${p.id === projectId ? "bg-primary-soft" : ""}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "mt-0.5 flex size-4 shrink-0 items-center justify-center",
						children: p.id === projectId && /* @__PURE__ */ jsx(Check, {
							size: 16,
							className: "text-primary",
							"aria-hidden": true
						})
					}), /* @__PURE__ */ jsxs("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block truncate text-sm font-semibold text-foreground",
							children: etiquetaProyecto(p, p.id)
						}), /* @__PURE__ */ jsxs("span", {
							className: "block truncate text-xs text-muted-foreground",
							children: [
								p.codigo,
								" · ",
								p.fase
							]
						})]
					})]
				}, p.id))
			})]
		})]
	});
}
//#endregion
//#region src/components/shell/AppShell.tsx
/**
* Cuerpo de toda pantalla interna: menú lateral + contenido.
* Sin `sidebar`, el menú sale de la ruta: el del proyecto dentro de `/proyectos/$projectId/*` y el del
* módulo en el resto. Las pantallas de predio pasan el suyo (etapas del TUO).
* La barra superior la pinta la raíz del router, una sola vez.
*/
function AppShell({ children, sidebar, lateral, sinAlertaCapas }) {
	const params = useParams({ strict: false });
	const porDefecto = params.projectId && !params.codigo ? /* @__PURE__ */ jsx(ProyectoSidebar, { projectId: params.projectId }) : /* @__PURE__ */ jsx(ModuleSidebar, {});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-[calc(100vh-3.5rem)] bg-background text-foreground",
		children: [
			sidebar ?? porDefecto,
			/* @__PURE__ */ jsxs("main", {
				className: "min-w-0 flex-1 p-4",
				children: [
					params.projectId && !sinAlertaCapas && /* @__PURE__ */ jsx(AlertaCapasObligatorias, { projectId: params.projectId }),
					children,
					/* @__PURE__ */ jsx("div", {
						id: "pie-de-pagina",
						className: "mt-4 empty:hidden"
					})
				]
			}),
			lateral && /* @__PURE__ */ jsxs(Sheet$1, { children: [/* @__PURE__ */ jsxs(SheetTrigger, {
				title: params.codigo ? "Ver el resumen del predio" : "Ver el resumen del proyecto",
				className: "fixed right-0 top-32 z-30 flex flex-col items-center gap-2 rounded-l-md border border-r-0 border-border bg-card px-2 py-3 text-xs font-semibold text-primary-dark hover:bg-primary-soft",
				children: [/* @__PURE__ */ jsx(PanelRightOpen, {
					size: 16,
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("span", {
					className: "[writing-mode:vertical-rl]",
					children: "Resumen"
				})]
			}), /* @__PURE__ */ jsxs(SheetContent, {
				"aria-describedby": void 0,
				className: "w-full overflow-y-auto p-4 pt-12 sm:max-w-sm",
				children: [/* @__PURE__ */ jsx(SheetTitle, {
					className: "sr-only",
					children: params.codigo ? "Resumen del predio" : "Resumen del proyecto"
				}), lateral]
			})] })
		]
	});
}
//#endregion
export { SheetFooter as a, alternarSidebar as c, PopoverContent as d, PopoverTrigger as f, usePedido as g, pedirContexto as h, SheetDescription as i, useSidebarColapsado as l, faltaContexto as m, Sheet$1 as n, SheetHeader as o, cerrarPedido as p, SheetContent as r, SheetTitle as s, AppShell as t, Popover as u };
