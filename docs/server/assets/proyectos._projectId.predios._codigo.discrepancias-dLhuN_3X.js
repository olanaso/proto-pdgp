import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { g as fechaIso, m as fecha, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.discrepancias-CEuUcuW3.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { n as useAlmacen, t as idNuevo } from "./almacen-BgvL3X8T.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, FileCheck, History, Pencil, Plus, Trash2 } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.discrepancias.tsx?tsr-split=component
var ORIGENES = [
	"Certificado de búsqueda catastral",
	"Certificado registral inmobiliario",
	"Partida registral",
	"Inspección de campo",
	"Levantamiento topográfico",
	"Tasación",
	"Padrón"
];
var ACCIONES = [
	"Rectificación de área y linderos",
	"Cierre de duplicidad de partidas (art. 29)",
	"Saneamiento físico legal (DCF 2.ª)",
	"Independización",
	"Levantamiento de carga o gravamen",
	"Prescripción adquisitiva",
	"Actualización catastral",
	"Otra"
];
var TONO = {
	Abierta: "destructive",
	"En regularización": "warning",
	Resuelta: "success"
};
var NUEVA = () => ({
	tipo: "Técnica",
	origen: ORIGENES[0],
	descripcion: "",
	detectada: fechaIso(/* @__PURE__ */ new Date()),
	responsable: "",
	accion: ACCIONES[0],
	estado: "Abierta",
	resuelta: ""
});
var ETIQUETAS_DISCREPANCIAS = {
	nombre: "Discrepancia",
	tipo: "Tipo",
	origen: "Origen",
	descripcion: "Descripción",
	detectada: "Detectada el",
	responsable: "Responsable",
	accion: "Acción de regularización",
	estado: "Estado",
	resuelta: "Resuelta el"
};
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: "Eliminar discrepancia",
		descripcion: `${nombre} sale del registro del predio. El histórico conserva sus datos y el motivo.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "destructive",
			disabled: motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar discrepancia"]
		})] }),
		children: [/* @__PURE__ */ jsxs("label", {
			htmlFor: "motivo-eliminacion",
			className: "mb-1 block text-sm font-medium",
			children: ["Motivo ", /* @__PURE__ */ jsx("span", {
				className: "text-destructive",
				children: "*"
			})]
		}), /* @__PURE__ */ jsx("textarea", {
			id: "motivo-eliminacion",
			rows: 3,
			className: `${controlClase} h-auto py-2`,
			value: motivo,
			onChange: (e) => setMotivo(e.target.value),
			placeholder: "Por ejemplo: se registró por error; ya fue regularizada"
		})]
	});
}
function DiscrepanciasPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const [lista, setLista] = useAlmacen(`pdgp-discrepancias-${decodedCodigo}`, []);
	const [editando, setEditando] = useState(null);
	const [form, setForm] = useState(NUEVA());
	const [abierto, setAbierto] = useState(false);
	const [aEliminar, setAEliminar] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const [filtroEstado, setFiltroEstado] = useState("");
	const rol = useRol();
	const claveHistorial = `discrepancias-${decodedCodigo}`;
	const versiones = useHistorial(claveHistorial);
	const bitacora = {
		modulo: 13,
		entidad: "discrepancias"
	};
	const versionable = (l) => l.map((x) => ({
		...x,
		nombre: resumen(x)
	}));
	const resumen = (x) => `${x.tipo.toLowerCase()}: ${x.descripcion.slice(0, 40)}`;
	const abiertas = lista.filter((x) => x.estado !== "Resuelta").length;
	const visibles = filtroEstado ? lista.filter((x) => x.estado === filtroEstado) : lista;
	const porTipo = (t) => lista.filter((x) => x.tipo === t && x.estado !== "Resuelta").length;
	function abrirNueva() {
		setEditando(null);
		setForm(NUEVA());
		setAbierto(true);
	}
	function abrirEdicion(x) {
		setEditando(x);
		const { id: _id, ...resto } = x;
		setForm(resto);
		setAbierto(true);
	}
	function guardar() {
		if (!form.descripcion.trim() || !form.detectada) return setMensaje({
			tipo: "error",
			texto: "Describa la discrepancia e indique cuándo se detectó."
		});
		if (form.estado === "Resuelta" && !form.resuelta) return setMensaje({
			tipo: "error",
			texto: "Una discrepancia resuelta necesita la fecha de resolución."
		});
		if (editando) {
			const despues = lista.map((x) => x.id === editando.id ? {
				...editando,
				...form
			} : x);
			setLista(despues);
			registrarCambio(claveHistorial, {
				accion: "Modificó discrepancia",
				objeto: resumen(form),
				antes: versionable(lista),
				despues: versionable(despues)
			}, bitacora);
			setMensaje({
				tipo: "exito",
				texto: "Discrepancia actualizada."
			});
		} else {
			const nueva = {
				id: idNuevo(),
				...form
			};
			const despues = [nueva, ...lista];
			setLista(despues);
			registrarCambio(claveHistorial, {
				accion: "Registró discrepancia",
				objeto: resumen(nueva),
				antes: versionable(lista),
				despues: versionable(despues)
			}, bitacora);
			setMensaje({
				tipo: "exito",
				texto: "Discrepancia registrada."
			});
		}
		setAbierto(false);
	}
	const estadoGeneral = lista.length === 0 ? {
		texto: "Sin discrepancias",
		tono: "neutral"
	} : abiertas === 0 ? {
		texto: "Condición regularizada",
		tono: "success"
	} : {
		texto: `${abiertas} por regularizar`,
		tono: "warning"
	};
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
				titulo: "Discrepancias técnicas, legales y registrales",
				icono: FileCheck,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: estadoGeneral.tono,
					children: estadoGeneral.texto
				})
			}),
			mensaje && /* @__PURE__ */ jsx("p", {
				role: mensaje.tipo === "error" ? "alert" : "status",
				className: `mb-4 rounded-md border px-3 py-2 text-sm ${mensaje.tipo === "error" ? "border-destructive bg-destructive-soft text-destructive" : "border-success bg-success-soft text-success"}`,
				children: mensaje.texto
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3",
				children: [
					"Técnica",
					"Legal",
					"Registral"
				].map((t) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-card px-4 py-3",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-lg font-semibold tabular-nums",
						children: porTipo(t)
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [t === "Técnica" ? "Técnicas" : t === "Legal" ? "Legales" : "Registrales", " abiertas"]
					})]
				}, t))
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "registro",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "registro",
							children: "Registro"
						}), /* @__PURE__ */ jsxs(TabsTrigger, {
							value: "historico",
							children: [
								/* @__PURE__ */ jsx(History, {
									size: 16,
									"aria-hidden": true
								}),
								" Histórico (",
								versiones.length,
								")"
							]
						})]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "registro",
						children: [/* @__PURE__ */ jsx(InformacionPredio, {
							projectId,
							codigo: decodedCodigo,
							className: "mb-4"
						}), /* @__PURE__ */ jsx(Section, {
							titulo: "Registro de discrepancias",
							acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: ["Estado", /* @__PURE__ */ jsxs("select", {
									value: filtroEstado,
									onChange: (ev) => setFiltroEstado(ev.target.value),
									className: "h-8 rounded-md border border-border bg-card px-2 text-sm",
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Todas"
										}),
										/* @__PURE__ */ jsx("option", { children: "Abierta" }),
										/* @__PURE__ */ jsx("option", { children: "En regularización" }),
										/* @__PURE__ */ jsx("option", { children: "Resuelta" })
									]
								})]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								onClick: abrirNueva,
								children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar discrepancia"]
							})] }),
							children: /* @__PURE__ */ jsx(Tabla, {
								columnas: [
									{
										clave: "tipo",
										titulo: "Tipo",
										ancho: "100px"
									},
									{
										clave: "origen",
										titulo: "Origen"
									},
									{
										clave: "descripcion",
										titulo: "Descripción"
									},
									{
										clave: "detectada",
										titulo: "Detectada",
										ancho: "110px",
										render: (x) => fecha(/* @__PURE__ */ new Date(`${x.detectada}T00:00:00`))
									},
									{
										clave: "accion",
										titulo: "Acción de regularización"
									},
									{
										clave: "estado",
										titulo: "Estado",
										render: (x) => /* @__PURE__ */ jsx(StatusBadge, {
											tono: TONO[x.estado],
											children: x.estado
										})
									},
									{
										clave: "acciones",
										titulo: "Acciones",
										alinear: "derecha",
										ancho: "110px",
										render: (x) => /* @__PURE__ */ jsxs("div", {
											className: "inline-flex gap-1",
											children: [/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
												asChild: true,
												children: /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => abrirEdicion(x),
													"aria-label": "Editar discrepancia",
													className: "flex size-8 items-center justify-center rounded-md border border-border text-primary-dark hover:bg-primary-soft",
													children: /* @__PURE__ */ jsx(Pencil, {
														size: 16,
														"aria-hidden": true
													})
												})
											}), /* @__PURE__ */ jsx(TooltipContent, { children: "Editar discrepancia" })] }), /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
												asChild: true,
												children: /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => setAEliminar(x),
													"aria-label": "Eliminar discrepancia",
													className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
													children: /* @__PURE__ */ jsx(Trash2, {
														size: 16,
														"aria-hidden": true
													})
												})
											}), /* @__PURE__ */ jsx(TooltipContent, { children: "Eliminar discrepancia" })] })]
										})
									}
								],
								filas: visibles,
								claveFila: (x) => x.id,
								claseFila: (x) => x.estado === "Abierta" ? "bg-destructive-soft/40" : void 0,
								vacio: lista.length === 0 ? "Sin discrepancias registradas para este predio." : "Ninguna discrepancia con ese estado."
							})
						})]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico de discrepancias del predio",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS_DISCREPANCIAS,
								nombreArchivo: `historico-discrepancias-${decodedCodigo}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									setLista(r.map(({ nombre: _nombre, ...x }) => x));
									registrarCambio(claveHistorial, {
										accion: "Restauró una versión anterior",
										objeto: `versión ${n}`,
										antes: versionable(lista),
										despues: versionable(r)
									}, bitacora);
									setMensaje({
										tipo: "exito",
										texto: `Se restauró la versión ${n}.`
									});
								}
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsx(Modal, {
				abierto,
				onCerrar: () => setAbierto(false),
				ancho: "xl",
				titulo: editando ? "Editar discrepancia" : "Registrar discrepancia",
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setAbierto(false),
					children: "Cancelar"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					onClick: guardar,
					children: editando ? "Guardar cambios" : "Registrar discrepancia"
				})] }),
				children: /* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Tipo",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							value: form.tipo,
							onChange: (ev) => setForm((f) => ({
								...f,
								tipo: ev.target.value
							})),
							children: [
								/* @__PURE__ */ jsx("option", { children: "Técnica" }),
								/* @__PURE__ */ jsx("option", { children: "Legal" }),
								/* @__PURE__ */ jsx("option", { children: "Registral" })
							]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Origen",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: controlClase,
							value: form.origen,
							onChange: (ev) => setForm((f) => ({
								...f,
								origen: ev.target.value
							})),
							children: ORIGENES.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Descripción",
						obligatorio: true,
						ancho: "doble",
						children: (id) => /* @__PURE__ */ jsx("textarea", {
							id,
							rows: 3,
							className: `${controlClase} h-auto py-2`,
							value: form.descripcion,
							onChange: (ev) => setForm((f) => ({
								...f,
								descripcion: ev.target.value
							})),
							placeholder: "Qué no coincide y entre qué fuentes"
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Detectada el",
						obligatorio: true,
						icono: CalendarDays,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							className: controlClase,
							value: form.detectada,
							onChange: (ev) => setForm((f) => ({
								...f,
								detectada: ev.target.value
							}))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Responsable",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase,
							value: form.responsable,
							onChange: (ev) => setForm((f) => ({
								...f,
								responsable: ev.target.value
							}))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Acción de regularización",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: controlClase,
							value: form.accion,
							onChange: (ev) => setForm((f) => ({
								...f,
								accion: ev.target.value
							})),
							children: ACCIONES.map((a) => /* @__PURE__ */ jsx("option", { children: a }, a))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Estado",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							value: form.estado,
							onChange: (ev) => setForm((f) => ({
								...f,
								estado: ev.target.value
							})),
							children: [
								/* @__PURE__ */ jsx("option", { children: "Abierta" }),
								/* @__PURE__ */ jsx("option", { children: "En regularización" }),
								/* @__PURE__ */ jsx("option", { children: "Resuelta" })
							]
						})
					}),
					form.estado === "Resuelta" && /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Resuelta el",
						obligatorio: true,
						icono: CalendarDays,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: form.resuelta,
							onChange: (ev) => setForm((f) => ({
								...f,
								resuelta: ev.target.value
							}))
						})
					})
				] })
			}),
			aEliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: resumen(aEliminar),
				onCerrar: () => setAEliminar(null),
				onConfirmar: (motivo) => {
					const despues = lista.filter((x) => x.id !== aEliminar.id);
					setLista(despues);
					registrarCambio(claveHistorial, {
						accion: "Eliminó discrepancia",
						objeto: resumen(aEliminar),
						motivo,
						antes: versionable(lista),
						despues: versionable(despues)
					}, bitacora);
					setAEliminar(null);
					setMensaje({
						tipo: "exito",
						texto: "Discrepancia eliminada."
					});
				}
			})
		]
	});
}
//#endregion
export { DiscrepanciasPage as component };
