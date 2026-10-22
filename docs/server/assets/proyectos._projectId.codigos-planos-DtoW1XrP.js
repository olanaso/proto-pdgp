import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, n as etiquetaProyecto, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { n as Route$1 } from "./proyectos._projectId.codigos-planos-DW_cZ9gw.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { a as TIPOS_PLANO, i as PROFESIONALES, n as CURRENT_USER, o as getProjectInfo, r as PROCESOS_GESTION_PREDIAL, s as seguimientoMock, t as COORDINACIONES } from "./projectContext-BYyGxWhp.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useId, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { FileCode, History, Pencil, Plus, Printer, Save, Trash2, Upload, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.codigos-planos.tsx?tsr-split=component
var initialPlanos = [
	{
		id: 36413,
		fecha: "2026-06-23 07:52:30",
		proyecto: "PACRI - LONGITUDINAL DE LA SIERRA NORTE TRAMO 2",
		coordinacion: "COORDINACIÓN GENERAL VIAL 3",
		profesional: "GADY GABRIELA, QUIROZ PINCHI",
		tipoPlano: "PLANO DE DISTRIBUCION DE EDIFICACIONES",
		periodo: "2026",
		codigoPlano: "PDIST-55183-2026-CGV3-DDP-DGPPT-MTC",
		conPlanoPDF: false,
		conBaseGrafica: false,
		codigoPredio: "VIAL-LSNT2-ST01-060602-PR-02300",
		historial: seguimientoMock
	},
	{
		id: 36412,
		fecha: "2026-06-23 07:47:51",
		proyecto: "AEROPUERTO DE AYACUCHO",
		coordinacion: "COORDINACIÓN DE EJECUCIÓN DE LA GESTIÓN PREDIAL",
		profesional: "LUIS ENRIQUE, PONCE MUÑOZ",
		tipoPlano: "PLANO DE INDEPENDIZACION",
		periodo: "2026",
		codigoPlano: "PIND-55182-2026-CGAE-DDP-DGPPT-MTC",
		conPlanoPDF: false,
		conBaseGrafica: false,
		expediente: "117-2025-MTC/DDP",
		codigoPredio: "PM2G-AERAYACUCHO-PU-250",
		historial: seguimientoMock
	},
	{
		id: 36410,
		fecha: "2026-06-23 06:28:13",
		proyecto: "PACRI - AUTOPISTA DEL SOL",
		coordinacion: "COORDINACIÓN PREDIAL AUTOPISTA DEL SOL",
		profesional: "OKY AGUSTÍN, SUPARO TAJIRI",
		tipoPlano: "PLANO DE AFECTACION",
		periodo: "2026",
		codigoPlano: "PAFE-55180-2026-CPADS-DDP-DGPPT-MTC",
		conPlanoPDF: true,
		conBaseGrafica: true,
		expediente: "00833-2026-MTC/DDP",
		codigoPredio: "AUSOL-TC01-130104-R-0013",
		historial: seguimientoMock
	},
	{
		id: 36409,
		fecha: "2026-06-23 17:15:58",
		proyecto: "PACRI - HUARAL ACOS",
		coordinacion: "COORDINACIÓN DE MULTIPROYECTOS VIALES 1",
		profesional: "CHRISTIAN ALEXANDER, ALIAGA VASQUEZ",
		tipoPlano: "PLANO PARA BUSQUEDA CATASTRAL ANTE REGISTROS PUBLICOS",
		periodo: "2026",
		codigoPlano: "PBC-55179-2026-CMUV1-DDP-DGPPT-MTC",
		conPlanoPDF: false,
		conBaseGrafica: false,
		codigoPredio: "HUA-A-09",
		historial: seguimientoMock
	}
];
var ETIQUETAS = {
	codigoPlano: "Código de plano",
	tipoPlano: "Tipo de plano",
	coordinacion: "Coordinación",
	profesional: "Profesional",
	conPlanoPDF: "Plano PDF",
	conBaseGrafica: "Base gráfica",
	expediente: "Expediente",
	codigoPredio: "Código de predio",
	periodo: "Periodo",
	proyecto: "Proyecto",
	fecha: "Fecha de creación"
};
var unicos = (valores) => [...new Set(valores.filter(Boolean))].sort().map((v) => ({
	valor: v,
	texto: v
}));
var SiNoBadge = ({ valor }) => /* @__PURE__ */ jsx(StatusBadge, {
	tono: valor ? "success" : "neutral",
	children: valor ? "Sí" : "No"
});
function CodigosPlanosPage() {
	const { projectId } = Route$1.useParams();
	const project = getProjectInfo(projectId);
	const proyecto = getProyecto(projectId);
	const migas = [
		{
			texto: "Proyectos",
			to: "/proyectos"
		},
		{
			texto: etiquetaProyecto(proyecto, projectId),
			to: "/proyectos/$projectId",
			params: { projectId }
		},
		{ texto: "Códigos de plano" }
	];
	const [items, setItems] = useState(initialPlanos);
	const rol = useRol();
	const { guardarVersion, restaurar } = useFormularioConHistorial(`codigos-planos-${projectId}`, items, setItems, {
		modulo: 12,
		entidad: "codigos_planos"
	});
	const [openModal, setOpenModal] = useState(false);
	const [editing, setEditing] = useState(null);
	const [mensaje, setMensaje] = useState("");
	function openNew() {
		setEditing(null);
		setOpenModal(true);
	}
	function openEdit(p) {
		setEditing(p);
		setOpenModal(true);
	}
	function handleSave(form) {
		const now = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " ");
		if (editing) {
			const siguiente = items.map((it) => it.id === editing.id ? {
				...it,
				...form,
				historial: [{
					id: it.historial.length + 1,
					fecha: now,
					usuario: CURRENT_USER.nombre,
					accion: "Edición de registro",
					detalle: "Datos generales actualizados"
				}, ...it.historial]
			} : it);
			setItems(siguiente);
			guardarVersion("Modificó código de plano", editing.codigoPlano, void 0, siguiente);
			setMensaje(`Código de plano ${editing.codigoPlano} actualizado.`);
		} else {
			const id = Math.max(0, ...items.map((i) => i.id)) + 1;
			const codigo = form.codigoPlano || `PLAN-${id}-${form.periodo}-${project.id.toUpperCase().slice(0, 4)}-DDP-DGPPT-MTC`;
			const siguiente = [{
				id,
				fecha: now,
				...form,
				codigoPlano: codigo,
				historial: [{
					id: 1,
					fecha: now,
					usuario: CURRENT_USER.nombre,
					accion: "Creación de registro",
					detalle: "Registro generado desde el módulo",
					estado: "DISPONIBLE"
				}]
			}, ...items];
			setItems(siguiente);
			guardarVersion("Generó código de plano", codigo, void 0, siguiente);
			setMensaje(`Código de plano ${codigo} generado.`);
		}
		setOpenModal(false);
	}
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [
			mensaje && /* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mb-4 flex items-start gap-2 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
				children: [/* @__PURE__ */ jsx("span", {
					className: "flex-1",
					children: mensaje
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setMensaje(""),
					"aria-label": "Cerrar aviso",
					className: "rounded-sm hover:opacity-70",
					children: /* @__PURE__ */ jsx(X, { size: 16 })
				})]
			}),
			/* @__PURE__ */ jsx(CrudPage, {
				titulo: "Códigos de plano",
				icono: FileCode,
				descripcion: [proyecto && `${proyecto.codigo} · ${proyecto.fase}`, "Códigos emitidos para planos del proyecto, con sus archivos asociados."].filter(Boolean).join(" · "),
				migas,
				demo: true,
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ jsx(Printer, {}), " Imprimir"]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: openNew,
					children: [/* @__PURE__ */ jsx(Plus, {}), " Generar código de plano"]
				})] }),
				columnas: [
					{
						clave: "id",
						titulo: "ID",
						ancho: "80px"
					},
					{
						clave: "fecha",
						titulo: "Fecha de creación",
						render: (p) => fechaHora(p.fecha)
					},
					{
						clave: "proyecto",
						titulo: "Proyecto"
					},
					{
						clave: "coordinacion",
						titulo: "Coordinación"
					},
					{
						clave: "profesional",
						titulo: "Profesional solicitante"
					},
					{
						clave: "tipoPlano",
						titulo: "Tipo de plano"
					},
					{
						clave: "periodo",
						titulo: "Periodo",
						ancho: "90px"
					},
					{
						clave: "codigoPlano",
						titulo: "Código de plano",
						render: (p) => /* @__PURE__ */ jsx("span", {
							className: "font-medium text-primary-dark",
							children: p.codigoPlano
						})
					},
					{
						clave: "conPlanoPDF",
						titulo: "Plano PDF",
						alinear: "centro",
						render: (p) => /* @__PURE__ */ jsx(SiNoBadge, { valor: p.conPlanoPDF })
					},
					{
						clave: "conBaseGrafica",
						titulo: "Base gráfica",
						alinear: "centro",
						render: (p) => /* @__PURE__ */ jsx(SiNoBadge, { valor: p.conBaseGrafica })
					},
					{
						clave: "expediente",
						titulo: "Expediente",
						render: (p) => p.expediente ?? ""
					},
					{
						clave: "codigoPredio",
						titulo: "Código de predio",
						render: (p) => p.codigoPredio ?? ""
					}
				],
				filas: items,
				claveFila: (p) => p.id,
				filtros: [{
					clave: "tipoPlano",
					etiqueta: "Tipo de plano",
					opciones: unicos(items.map((p) => p.tipoPlano))
				}, {
					clave: "periodo",
					etiqueta: "Periodo",
					opciones: unicos(items.map((p) => p.periodo))
				}],
				buscarEn: [
					"codigoPlano",
					"proyecto",
					"profesional",
					"tipoPlano",
					"codigoPredio"
				],
				accionesFila: [{
					nombre: "Editar código de plano",
					icono: Pencil,
					onClick: openEdit
				}],
				exportar: (visibles) => exportarExcel("codigos-planos", [
					{
						titulo: "ID",
						valor: (p) => p.id
					},
					{
						titulo: "Fecha de creación",
						valor: (p) => p.fecha
					},
					{
						titulo: "Proyecto",
						valor: (p) => p.proyecto
					},
					{
						titulo: "Coordinación",
						valor: (p) => p.coordinacion
					},
					{
						titulo: "Profesional solicitante",
						valor: (p) => p.profesional
					},
					{
						titulo: "Tipo de plano",
						valor: (p) => p.tipoPlano
					},
					{
						titulo: "Periodo",
						valor: (p) => p.periodo
					},
					{
						titulo: "Código de plano",
						valor: (p) => p.codigoPlano
					},
					{
						titulo: "Con plano PDF",
						valor: (p) => p.conPlanoPDF ? "Sí" : "No"
					},
					{
						titulo: "Con base gráfica",
						valor: (p) => p.conBaseGrafica ? "Sí" : "No"
					},
					{
						titulo: "Expediente",
						valor: (p) => p.expediente
					},
					{
						titulo: "Código de predio",
						valor: (p) => p.codigoPredio
					}
				], visibles),
				vacio: "No hay códigos de plano generados.",
				historial: {
					registro: `codigos-planos-${projectId}`,
					etiquetas: ETIQUETAS,
					etiquetaFila: (p) => p.codigoPlano,
					puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
					onRestaurar: (registro, n) => restaurar(registro, n)
				}
			}),
			openModal && /* @__PURE__ */ jsx(PlanoModal, {
				initial: editing,
				projectId,
				onClose: () => setOpenModal(false),
				onSave: handleSave
			})
		]
	});
}
function PlanoModal({ initial, projectId, onClose, onSave }) {
	const project = getProjectInfo(projectId);
	const formId = useId();
	const [proyecto, setProyecto] = useState(initial?.proyecto ?? project.nombre);
	const [coordinacion, setCoordinacion] = useState(initial?.coordinacion ?? project.coordinacion);
	const [profesional, setProfesional] = useState(initial?.profesional ?? CURRENT_USER.nombre);
	const [tipoPlano, setTipoPlano] = useState(initial?.tipoPlano ?? "");
	const [periodo] = useState(initial?.periodo ?? String((/* @__PURE__ */ new Date()).getFullYear()));
	const [codigoPlano] = useState(initial?.codigoPlano ?? "");
	const [expediente, setExpediente] = useState(initial?.expediente ?? "");
	const [codigoPredio, setCodigoPredio] = useState(initial?.codigoPredio ?? "");
	const [comentario, setComentario] = useState("");
	const [procesoGestionPredial, setProcesoGestionPredial] = useState("");
	const [conPlanoPDF, setConPlanoPDF] = useState(initial?.conPlanoPDF ?? false);
	const [conBaseGrafica, setConBaseGrafica] = useState(initial?.conBaseGrafica ?? false);
	const [docs, setDocs] = useState([]);
	const opciones = (lista) => lista.map((o) => /* @__PURE__ */ jsx("option", {
		value: o,
		children: o
	}, o));
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		ancho: "xl",
		titulo: initial ? "Editar código de plano" : "Nuevo código de plano",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "submit",
			form: formId,
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar código de plano"]
		})] }),
		children: /* @__PURE__ */ jsx("form", {
			id: formId,
			onSubmit: (e) => {
				e.preventDefault();
				onSave({
					proyecto,
					coordinacion,
					profesional,
					tipoPlano,
					periodo,
					codigoPlano,
					comentario,
					expediente,
					codigoPredio,
					procesoGestionPredial,
					conPlanoPDF,
					conBaseGrafica
				});
			},
			children: /* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "datos",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "datos",
								children: "Datos generales"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "planos",
								children: "Información de planos"
							}),
							/* @__PURE__ */ jsxs(TabsTrigger, {
								value: "historial",
								children: [/* @__PURE__ */ jsx(History, {
									size: 16,
									className: "mr-1",
									"aria-hidden": true
								}), " Historial de seguimiento"]
							})
						]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "datos",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Proyecto",
								obligatorio: true,
								ancho: "doble",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									value: proyecto,
									onChange: (e) => setProyecto(e.target.value),
									className: controlClase,
									required: true
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Coordinación",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: coordinacion,
									onChange: (e) => setCoordinacion(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(COORDINACIONES)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Profesional",
								children: (id) => /* @__PURE__ */ jsx("select", {
									id,
									value: profesional,
									onChange: (e) => setProfesional(e.target.value),
									className: controlClase,
									children: opciones(PROFESIONALES)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Tipo de plano",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: tipoPlano,
									onChange: (e) => setTipoPlano(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(TIPOS_PLANO)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Código de plano",
								ayuda: codigoPlano ? void 0 : "Se genera al guardar",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									value: codigoPlano,
									disabled: true,
									className: controlClase
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Periodo",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									value: periodo,
									disabled: true,
									className: controlClase
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Expediente administrativo",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									value: expediente,
									onChange: (e) => setExpediente(e.target.value),
									className: controlClase
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Código de predio",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									value: codigoPredio,
									onChange: (e) => setCodigoPredio(e.target.value),
									className: controlClase
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Proceso de gestión predial",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: procesoGestionPredial,
									onChange: (e) => setProcesoGestionPredial(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(PROCESOS_GESTION_PREDIAL)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Comentario",
								ancho: "doble",
								children: (id) => /* @__PURE__ */ jsx("textarea", {
									id,
									value: comentario,
									onChange: (e) => setComentario(e.target.value),
									rows: 3,
									className: `${controlClase} h-auto py-2`
								})
							})
						] })
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "planos",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "mb-3 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground",
								children: "Los archivos de planos de más de 30 MB se suben por el enlace de carga a Drive (próximamente)."
							}),
							/* @__PURE__ */ jsxs(FormGrid, {
								columnas: 1,
								children: [/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Archivo de planos",
									children: /* @__PURE__ */ jsxs("label", {
										className: "inline-flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 text-sm hover:bg-primary-soft focus-within:ring-2 focus-within:ring-primary",
										children: [
											/* @__PURE__ */ jsx(Upload, {
												size: 16,
												className: "shrink-0 text-primary",
												"aria-hidden": true
											}),
											/* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: conPlanoPDF ? "plano.pdf" : "Seleccionar archivo PDF"
											}),
											/* @__PURE__ */ jsx("input", {
												type: "file",
												className: "sr-only",
												accept: ".pdf",
												onChange: (e) => setConPlanoPDF(!!e.target.files?.length)
											})
										]
									})
								}), /* @__PURE__ */ jsx(FormField, {
									etiqueta: "Base gráfica",
									children: /* @__PURE__ */ jsxs("label", {
										className: "inline-flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 text-sm hover:bg-primary-soft focus-within:ring-2 focus-within:ring-primary",
										children: [
											/* @__PURE__ */ jsx(Upload, {
												size: 16,
												className: "shrink-0 text-primary",
												"aria-hidden": true
											}),
											/* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: conBaseGrafica ? "base.dwg" : "Seleccionar archivo DWG o DXF"
											}),
											/* @__PURE__ */ jsx("input", {
												type: "file",
												className: "sr-only",
												accept: ".dwg,.dxf,.zip",
												onChange: (e) => setConBaseGrafica(!!e.target.files?.length)
											})
										]
									})
								})]
							}),
							/* @__PURE__ */ jsx(Subtitulo, {
								acciones: /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setDocs((d) => [...d, {
										nombre: `Documento ${d.length + 1}`,
										archivo: "documento.pdf",
										comentario: ""
									}]),
									children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar archivo"]
								}),
								children: "Documentos complementarios"
							}),
							/* @__PURE__ */ jsx(Tabla, {
								columnas: [
									{
										clave: "n",
										titulo: "N.°",
										ancho: "60px",
										render: (d) => String(docs.indexOf(d) + 1)
									},
									{
										clave: "nombre",
										titulo: "Nombre"
									},
									{
										clave: "archivo",
										titulo: "Archivo"
									},
									{
										clave: "comentario",
										titulo: "Comentario"
									},
									{
										clave: "acciones",
										titulo: "Acciones",
										alinear: "derecha",
										render: (d) => /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
											asChild: true,
											children: /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setDocs((arr) => arr.filter((x) => x !== d)),
												"aria-label": `Quitar ${d.nombre}`,
												className: "inline-flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
												children: /* @__PURE__ */ jsx(Trash2, {
													size: 16,
													"aria-hidden": true
												})
											})
										}), /* @__PURE__ */ jsx(TooltipContent, { children: "Quitar documento" })] })
									}
								],
								filas: docs,
								claveFila: (_, i) => i,
								vacio: "Sin documentos complementarios."
							})
						]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historial",
						children: /* @__PURE__ */ jsx(HistorialTimeline, { events: initial?.historial ?? seguimientoMock })
					})
				]
			})
		})
	});
}
/** Línea de tiempo de seguimiento. La reutiliza la pantalla de códigos de predios. */
function HistorialTimeline({ events }) {
	return /* @__PURE__ */ jsx("ol", {
		className: "relative ml-1.5 space-y-4 border-l-2 border-border pl-5",
		children: events.map((e) => /* @__PURE__ */ jsxs("li", {
			className: "relative",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "absolute -left-6.75 top-1 size-3 rounded-sm border-2 border-card bg-primary",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-baseline gap-2",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-sm font-semibold",
							children: e.accion
						}),
						e.estado && /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: e.estado
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: fechaHora(e.fecha)
						})
					]
				}),
				e.detalle && /* @__PURE__ */ jsx("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: e.detalle
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: ["Por: ", e.usuario]
				})
			]
		}, e.id))
	});
}
//#endregion
export { HistorialTimeline, CodigosPlanosPage as component };
