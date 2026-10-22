import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { m as fecha, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, n as etiquetaProyecto, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Route$1 } from "./proyectos._projectId.requerimientos-Bt1pjCG4.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ClipboardList, Eye, Paperclip, Pencil, Plus, Save, Send, Trash2, Upload, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.requerimientos.tsx?tsr-split=component
var ENTIDADES = [
	"Municipalidad Distrital de Baños del Inca",
	"SUNARP",
	"COFOPRI",
	"MIDAGRI",
	"Municipalidad Provincial de Cajamarca"
];
var TIPOS_INFO = [
	"Información Catastral",
	"Información Registral",
	"Información Predial",
	"Información Urbana",
	"Otros"
];
var ESPECIFICAS = [
	"Plano catastral",
	"Relación de contribuyentes",
	"Licencias",
	"Constancias de posesión",
	"Habilitaciones urbanas",
	"Otros"
];
var AREAS = [
	"Tramo 1 – Sector A",
	"Tramo 1 – Sector B",
	"Tramo 2 – Sector A",
	"Bloque Único"
];
var RESPONSABLES = [
	"María López",
	"Ing. Pedro Ramírez",
	"Abog. Juan Delgado",
	"Ing. Diana Flores"
];
var ESTADOS = [
	"Borrador",
	"Enviado",
	"Atendido",
	"Fuera de plazo"
];
var PRIORIDADES = [
	"Alta",
	"Media",
	"Baja"
];
var ESTADO_TONO = {
	Borrador: "neutral",
	Enviado: "primary",
	Atendido: "success",
	"Fuera de plazo": "destructive"
};
var PRIORIDAD_TONO = {
	Alta: "destructive",
	Media: "warning",
	Baja: "success"
};
var SEED = [{
	id: "r1",
	numero: "REQ-2026-00049",
	proyecto: "Aeropuerto de Cajamarca",
	codigoProyecto: "PROY-2026-ACAJ",
	area: "Tramo 1 – Sector A",
	entidad: "Municipalidad Distrital de Baños del Inca",
	tipoInformacion: "Información Catastral",
	asunto: "Solicitud de información catastral del área de influencia del proyecto.",
	fundamento: "La información solicitada es necesaria para el diagnóstico técnico legal, identificación predial y elaboración de los planos de afectación del proyecto.",
	especifica: [
		"Plano catastral",
		"Relación de contribuyentes",
		"Licencias"
	],
	fechaElaboracion: "2026-05-28",
	prioridad: "Alta",
	plazoDias: 10,
	fechaLimite: "2026-06-07",
	responsable: "María López",
	cargo: "Coordinador Predial",
	areaResp: "Área Legal",
	telefono: "987 654 321",
	correo: "mlopez@proyecto.gob.pe",
	observaciones: "",
	estado: "Enviado",
	documentos: [
		{
			id: "d1",
			nombre: "Plano de ubicación - Área de influencia.pdf",
			tipo: "Plano",
			tamano: "2.35 MB"
		},
		{
			id: "d2",
			nombre: "Memoria descriptiva del proyecto.pdf",
			tipo: "Memoria",
			tamano: "1.82 MB"
		},
		{
			id: "d3",
			nombre: "Cuadro de coordenadas - Tramo 1.xlsx",
			tipo: "Cuadro de Coordenadas",
			tamano: "856 KB"
		}
	]
}, {
	id: "r2",
	numero: "REQ-2026-00050",
	proyecto: "Aeropuerto de Cajamarca",
	codigoProyecto: "PROY-2026-ACAJ",
	area: "Tramo 1 – Sector B",
	entidad: "SUNARP",
	tipoInformacion: "Información Registral",
	asunto: "Solicitud de partidas registrales del ámbito del proyecto.",
	fundamento: "Necesario para el saneamiento físico legal.",
	especifica: ["Otros"],
	fechaElaboracion: "2026-05-20",
	prioridad: "Media",
	plazoDias: 15,
	fechaLimite: "2026-06-04",
	responsable: "Abog. Juan Delgado",
	cargo: "Responsable Legal",
	areaResp: "Área Legal",
	telefono: "987 111 222",
	correo: "jdelgado@proyecto.gob.pe",
	observaciones: "",
	estado: "Atendido",
	documentos: []
}];
var PROYECTO_NOMBRE = "Aeropuerto de Cajamarca";
var PROYECTO_CODIGO = "PROY-2026-ACAJ";
function nextNumero(items) {
	const max = items.reduce((m, r) => {
		const n = parseInt(r.numero.split("-").pop() || "0", 10);
		return Math.max(m, isNaN(n) ? 0 : n);
	}, 0);
	return `REQ-2026-${String(max + 1).padStart(5, "0")}`;
}
function addDays(date, days) {
	if (!date) return "";
	const d = new Date(date);
	d.setDate(d.getDate() + days);
	return d.toISOString().slice(0, 10);
}
/** Fecha aaaa-mm-dd a dd/mm/aaaa sin corrimiento de zona horaria. */
var fechaCorta = (iso) => iso ? fecha(`${iso}T00:00:00`) : "";
function emptyForm(items) {
	const hoy = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	return {
		id: "",
		numero: nextNumero(items),
		proyecto: PROYECTO_NOMBRE,
		codigoProyecto: PROYECTO_CODIGO,
		area: AREAS[0],
		entidad: ENTIDADES[0],
		tipoInformacion: TIPOS_INFO[0],
		asunto: "",
		fundamento: "",
		especifica: [],
		fechaElaboracion: hoy,
		prioridad: "Media",
		plazoDias: 10,
		fechaLimite: addDays(hoy, 10),
		responsable: RESPONSABLES[0],
		cargo: "",
		areaResp: "",
		telefono: "",
		correo: "",
		observaciones: "",
		estado: "Borrador",
		documentos: []
	};
}
var ETIQUETAS = {
	numero: "N.° requerimiento",
	entidad: "Entidad",
	tipoInformacion: "Tipo de información",
	asunto: "Asunto",
	fundamento: "Fundamento",
	especifica: "Información específica",
	fechaElaboracion: "Fecha de elaboración",
	prioridad: "Prioridad",
	plazoDias: "Plazo (días)",
	fechaLimite: "Fecha límite",
	responsable: "Responsable",
	cargo: "Cargo",
	areaResp: "Área del responsable",
	area: "Área, tramo o sector",
	telefono: "Teléfono",
	correo: "Correo",
	observaciones: "Observaciones",
	estado: "Estado",
	documentos: "Documento",
	tamano: "Tamaño"
};
var opciones = (lista) => lista.map((x) => /* @__PURE__ */ jsx("option", {
	value: x,
	children: x
}, x));
function RequerimientosPage() {
	const { projectId } = Route$1.useParams();
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
		{ texto: "Requerimientos de información" }
	];
	const [items, setItems] = useState(SEED);
	const rol = useRol();
	const { guardarVersion, restaurar } = useFormularioConHistorial(`requerimientos-${projectId}`, items, setItems, {
		modulo: 10,
		entidad: "requerimientos"
	});
	const [mode, setMode] = useState("list");
	const [current, setCurrent] = useState(null);
	const [detalle, setDetalle] = useState(null);
	const [eliminar, setEliminar] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const openNew = () => {
		setCurrent(emptyForm(items));
		setMode("form");
	};
	const openEdit = (r) => {
		setCurrent({
			...r,
			especifica: [...r.especifica],
			documentos: [...r.documentos]
		});
		setDetalle(null);
		setMode("form");
	};
	const remove = (r, motivo) => {
		const siguiente = items.filter((x) => x.id !== r.id);
		setItems(siguiente);
		guardarVersion("Eliminó requerimiento", r.numero, motivo, siguiente);
		setMensaje(`Requerimiento ${r.numero} eliminado.`);
		setEliminar(null);
	};
	const save = (estado) => {
		if (!current) return;
		const toSave = {
			...current,
			estado
		};
		const esNuevo = !toSave.id;
		let siguiente;
		if (esNuevo) {
			toSave.id = `r${Date.now()}`;
			siguiente = [toSave, ...items];
		} else siguiente = items.map((r) => r.id === toSave.id ? toSave : r);
		setItems(siguiente);
		guardarVersion(`${estado === "Borrador" ? "Guardó borrador de" : esNuevo ? "Registró" : "Modificó"} requerimiento`, toSave.numero, void 0, siguiente);
		setMensaje(estado === "Borrador" ? `Borrador ${toSave.numero} guardado.` : `Requerimiento ${toSave.numero} registrado.`);
		setMode("list");
		setCurrent(null);
	};
	const volver = () => {
		setMode("list");
		setCurrent(null);
	};
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [
			mode === "form" && current ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(ProyectoEncabezado, {
				projectId,
				titulo: current.id ? "Editar requerimiento" : "Registrar requerimiento",
				icono: ClipboardList,
				descripcion: "Solicitud de información institucional requerida para el proyecto."
			}), /* @__PURE__ */ jsx(FormView, {
				data: current,
				setData: setCurrent,
				onCancel: volver,
				onSaveDraft: () => save("Borrador"),
				onRegister: () => save("Enviado")
			})] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [mensaje && /* @__PURE__ */ jsxs("p", {
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
			}), /* @__PURE__ */ jsx(CrudPage, {
				titulo: "Requerimientos de información",
				icono: ClipboardList,
				descripcion: [proyecto && `${proyecto.codigo} · ${proyecto.fase}`, "Solicitudes de información a entidades, con plazo y estado de atención."].filter(Boolean).join(" · "),
				migas,
				demo: true,
				acciones: /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: openNew,
					children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar requerimiento"]
				}),
				columnas: [
					{
						clave: "numero",
						titulo: "N.° requerimiento",
						ancho: "160px",
						render: (r) => /* @__PURE__ */ jsx("span", {
							className: "font-medium text-primary-dark",
							children: r.numero
						})
					},
					{
						clave: "entidad",
						titulo: "Entidad"
					},
					{
						clave: "tipoInformacion",
						titulo: "Tipo de información"
					},
					{
						clave: "asunto",
						titulo: "Asunto",
						render: (r) => /* @__PURE__ */ jsx("span", {
							className: "block max-w-xs truncate",
							title: r.asunto,
							children: r.asunto
						})
					},
					{
						clave: "fechaElaboracion",
						titulo: "Elaboración",
						render: (r) => fechaCorta(r.fechaElaboracion)
					},
					{
						clave: "plazoDias",
						titulo: "Plazo (días)",
						alinear: "centro"
					},
					{
						clave: "fechaLimite",
						titulo: "Fecha límite",
						render: (r) => fechaCorta(r.fechaLimite)
					},
					{
						clave: "prioridad",
						titulo: "Prioridad",
						render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: PRIORIDAD_TONO[r.prioridad],
							children: r.prioridad
						})
					},
					{
						clave: "estado",
						titulo: "Estado",
						render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: ESTADO_TONO[r.estado],
							children: r.estado
						})
					}
				],
				filas: items,
				claveFila: (r) => r.id,
				filtros: [{
					clave: "entidad",
					etiqueta: "Entidad",
					opciones: ENTIDADES.map((x) => ({
						valor: x,
						texto: x
					}))
				}, {
					clave: "estado",
					etiqueta: "Estado",
					opciones: ESTADOS.map((x) => ({
						valor: x,
						texto: x
					}))
				}],
				buscarEn: [
					"numero",
					"asunto",
					"entidad"
				],
				accionesFila: [
					{
						nombre: "Ver detalle",
						icono: Eye,
						onClick: setDetalle
					},
					{
						nombre: "Editar requerimiento",
						icono: Pencil,
						onClick: openEdit
					},
					{
						nombre: "Eliminar requerimiento",
						icono: Trash2,
						destructiva: true,
						onClick: setEliminar
					}
				],
				onFilaClick: setDetalle,
				exportar: (visibles) => exportarExcel("requerimientos", [
					{
						titulo: "N.° requerimiento",
						valor: (r) => r.numero
					},
					{
						titulo: "Entidad",
						valor: (r) => r.entidad
					},
					{
						titulo: "Tipo de información",
						valor: (r) => r.tipoInformacion
					},
					{
						titulo: "Asunto",
						valor: (r) => r.asunto
					},
					{
						titulo: "Fecha de elaboración",
						valor: (r) => r.fechaElaboracion
					},
					{
						titulo: "Plazo (días)",
						valor: (r) => r.plazoDias
					},
					{
						titulo: "Fecha límite",
						valor: (r) => r.fechaLimite
					},
					{
						titulo: "Prioridad",
						valor: (r) => r.prioridad
					},
					{
						titulo: "Estado",
						valor: (r) => r.estado
					},
					{
						titulo: "Responsable",
						valor: (r) => r.responsable
					}
				], visibles),
				vacio: "No hay requerimientos registrados para este proyecto.",
				historial: {
					registro: `requerimientos-${projectId}`,
					etiquetas: ETIQUETAS,
					etiquetaFila: (r) => r.numero,
					puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
					onRestaurar: (registro, n) => restaurar(registro, n)
				}
			})] }),
			detalle && /* @__PURE__ */ jsx(DetalleModal, {
				data: detalle,
				onCerrar: () => setDetalle(null),
				onEditar: () => openEdit(detalle)
			}),
			eliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: eliminar.numero,
				onCerrar: () => setEliminar(null),
				onConfirmar: (motivo) => remove(eliminar, motivo)
			})
		]
	});
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: "Eliminar requerimiento",
		descripcion: `${nombre} sale de la lista. El histórico conserva sus datos y el motivo.`,
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
			children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar requerimiento"]
		})] }),
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-eliminacion",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-eliminacion",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value),
				placeholder: "Por ejemplo: duplicado; la entidad ya respondió por otra vía"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function FormView(props) {
	const { data, setData } = props;
	const update = (k, v) => setData({
		...data,
		[k]: v
	});
	const toggleEsp = (e) => {
		const next = data.especifica.includes(e) ? data.especifica.filter((x) => x !== e) : [...data.especifica, e];
		update("especifica", next);
	};
	const onAddDoc = () => {
		const nombre = prompt("Nombre del documento (ej: plano.pdf):");
		if (!nombre) return;
		const tipo = prompt("Tipo (Plano, Memoria, Cuadro de Coordenadas, Otro):") || "Otro";
		const doc = {
			id: `d${Date.now()}`,
			nombre,
			tipo,
			tamano: `${(Math.random() * 3 + .2).toFixed(2)} MB`
		};
		update("documentos", [...data.documentos, doc]);
	};
	const onUploadDocs = (files) => {
		if (!files?.length) return;
		const nuevos = Array.from(files).map((f, i) => ({
			id: `d${Date.now()}-${i}`,
			nombre: f.name,
			tipo: "Otro",
			tamano: `${(f.size / 1024 / 1024).toFixed(2)} MB`
		}));
		update("documentos", [...data.documentos, ...nuevos]);
	};
	const removeDoc = (id) => update("documentos", data.documentos.filter((d) => d.id !== id));
	const recalcLimite = (fechaElab, dias) => {
		setData({
			...data,
			fechaElaboracion: fechaElab,
			plazoDias: dias,
			fechaLimite: addDays(fechaElab, dias)
		});
	};
	const pendientes = useMemo(() => ESPECIFICAS.filter((x) => !data.especifica.includes(x)), [data.especifica]);
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: (e) => {
			e.preventDefault();
			props.onRegister();
		},
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsx(Section, {
				titulo: "1. Datos generales del requerimiento",
				children: /* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Proyecto",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: data.proyecto,
							readOnly: true,
							className: `${controlClase} bg-muted`
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Código del proyecto",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: data.codigoProyecto,
							readOnly: true,
							className: `${controlClase} bg-muted`
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "N.° de requerimiento",
						ayuda: "Se asigna automáticamente",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: data.numero,
							readOnly: true,
							className: `${controlClase} bg-muted`
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Área, tramo o sector",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							value: data.area,
							onChange: (e) => update("area", e.target.value),
							className: controlClase,
							children: opciones(AREAS)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Entidad destinataria",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							value: data.entidad,
							onChange: (e) => update("entidad", e.target.value),
							className: controlClase,
							children: opciones(ENTIDADES)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Tipo de información",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							value: data.tipoInformacion,
							onChange: (e) => update("tipoInformacion", e.target.value),
							className: controlClase,
							children: opciones(TIPOS_INFO)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Asunto o referencia",
						obligatorio: true,
						ancho: "doble",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: data.asunto,
							onChange: (e) => update("asunto", e.target.value),
							className: controlClase,
							placeholder: "Ingrese el asunto",
							required: true
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Fecha de elaboración",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							value: data.fechaElaboracion,
							onChange: (e) => recalcLimite(e.target.value, data.plazoDias),
							className: controlClase,
							required: true
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Prioridad",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							value: data.prioridad,
							onChange: (e) => update("prioridad", e.target.value),
							className: controlClase,
							children: opciones(PRIORIDADES)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Plazo legal (días)",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "number",
							min: 0,
							value: data.plazoDias,
							onChange: (e) => recalcLimite(data.fechaElaboracion, Number(e.target.value) || 0),
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Fecha límite referencial",
						ayuda: "Elaboración más plazo legal",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: fechaCorta(data.fechaLimite),
							readOnly: true,
							className: `${controlClase} bg-muted`
						})
					})
				] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-4",
				children: [/* @__PURE__ */ jsx(Section, {
					titulo: "2. Sustento del requerimiento",
					children: /* @__PURE__ */ jsxs(FormGrid, {
						columnas: 1,
						children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Fundamento",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsx("textarea", {
								id,
								value: data.fundamento,
								onChange: (e) => update("fundamento", e.target.value),
								rows: 4,
								className: `${controlClase} h-auto py-2`,
								required: true
							})
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Información específica",
							obligatorio: true,
							ayuda: "Agregue cada ítem solicitado a la entidad",
							children: (id) => /* @__PURE__ */ jsxs("div", {
								className: "rounded-md border border-border p-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "mb-2 flex flex-wrap gap-1.5",
									children: [data.especifica.length === 0 && /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground",
										children: "Sin ítems agregados."
									}), data.especifica.map((e) => /* @__PURE__ */ jsxs(StatusBadge, {
										tono: "primary",
										children: [e, /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => toggleEsp(e),
											"aria-label": `Quitar ${e}`,
											className: "ml-1 rounded-sm hover:opacity-70",
											children: /* @__PURE__ */ jsx(X, {
												size: 12,
												"aria-hidden": true
											})
										})]
									}, e))]
								}), /* @__PURE__ */ jsxs("select", {
									id,
									value: "",
									onChange: (e) => e.target.value && toggleEsp(e.target.value),
									className: controlClase,
									disabled: pendientes.length === 0,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: pendientes.length ? "Agregar información específica" : "Todos los ítems agregados"
									}), opciones(pendientes)]
								})]
							})
						})]
					})
				}), /* @__PURE__ */ jsx(Section, {
					titulo: "3. Responsable del requerimiento",
					children: /* @__PURE__ */ jsxs(FormGrid, {
						columnas: 1,
						children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Responsable",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsx("select", {
									id,
									value: data.responsable,
									onChange: (e) => update("responsable", e.target.value),
									className: controlClase,
									children: opciones(RESPONSABLES)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Cargo",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									value: data.cargo,
									onChange: (e) => update("cargo", e.target.value),
									className: controlClase
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Área",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									value: data.areaResp,
									onChange: (e) => update("areaResp", e.target.value),
									className: controlClase
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Teléfono o anexo",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									inputMode: "tel",
									value: data.telefono,
									onChange: (e) => update("telefono", e.target.value),
									className: controlClase
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Correo electrónico",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "email",
									value: data.correo,
									onChange: (e) => update("correo", e.target.value),
									className: controlClase
								})
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "4. Documentos de sustento (anexos)",
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onAddDoc,
					children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar documento"]
				}), /* @__PURE__ */ jsxs("label", {
					className: "inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 text-xs font-medium hover:bg-primary-soft focus-within:ring-2 focus-within:ring-primary",
					children: [
						/* @__PURE__ */ jsx(Upload, {
							size: 16,
							"aria-hidden": true
						}),
						" Cargar desde el equipo",
						/* @__PURE__ */ jsx("input", {
							type: "file",
							multiple: true,
							className: "sr-only",
							onChange: (e) => {
								onUploadDocs(e.target.files);
								e.currentTarget.value = "";
							}
						})
					]
				})] }),
				children: [/* @__PURE__ */ jsx(Tabla, {
					columnas: [
						{
							clave: "n",
							titulo: "N.°",
							ancho: "60px",
							render: (d) => String(data.documentos.indexOf(d) + 1)
						},
						{
							clave: "nombre",
							titulo: "Nombre del documento",
							render: (d) => /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx(Paperclip, {
									size: 16,
									className: "shrink-0 text-primary",
									"aria-hidden": true
								}), d.nombre]
							})
						},
						{
							clave: "tipo",
							titulo: "Tipo"
						},
						{
							clave: "tamano",
							titulo: "Tamaño",
							alinear: "derecha"
						},
						{
							clave: "acciones",
							titulo: "Acciones",
							alinear: "derecha",
							render: (d) => /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => removeDoc(d.id),
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
					filas: data.documentos,
					claveFila: (d) => d.id,
					vacio: "Sin documentos adjuntos."
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: ["Total de documentos: ", data.documentos.length]
				})]
			}),
			/* @__PURE__ */ jsx(Section, {
				titulo: "5. Observaciones (opcional)",
				children: /* @__PURE__ */ jsx(FormGrid, {
					columnas: 1,
					children: /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Observaciones",
						children: (id) => /* @__PURE__ */ jsx("textarea", {
							id,
							value: data.observaciones,
							onChange: (e) => update("observaciones", e.target.value),
							rows: 3,
							placeholder: "Observaciones adicionales",
							className: `${controlClase} h-auto py-2`
						})
					})
				})
			}),
			/* @__PURE__ */ jsxs(FormActions, { children: [
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: props.onCancel,
					children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Volver al listado"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: props.onSaveDraft,
					children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "submit",
					children: [/* @__PURE__ */ jsx(Send, {}), " Registrar requerimiento"]
				})
			] })
		]
	});
}
function Dato({ etiqueta, valor, doble }) {
	return /* @__PURE__ */ jsxs("div", {
		className: doble ? "md:col-span-2" : "",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: etiqueta
		}), /* @__PURE__ */ jsx("dd", {
			className: "text-sm font-medium",
			children: valor || "Sin dato"
		})]
	});
}
function DetalleModal({ data, onCerrar, onEditar }) {
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		titulo: data.numero,
		descripcion: data.asunto,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cerrar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: onEditar,
			children: [/* @__PURE__ */ jsx(Pencil, {}), " Editar requerimiento"]
		})] }),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ jsx(StatusBadge, {
				tono: ESTADO_TONO[data.estado],
				children: data.estado
			}), /* @__PURE__ */ jsxs(StatusBadge, {
				tono: PRIORIDAD_TONO[data.prioridad],
				children: ["Prioridad ", data.prioridad.toLowerCase()]
			})]
		}), /* @__PURE__ */ jsxs("dl", {
			className: "grid grid-cols-1 gap-3 md:grid-cols-2",
			children: [
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Proyecto",
					valor: data.proyecto
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Código",
					valor: data.codigoProyecto
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Área",
					valor: data.area
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Entidad",
					valor: data.entidad
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Tipo de información",
					valor: data.tipoInformacion
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Fecha de elaboración",
					valor: fechaCorta(data.fechaElaboracion)
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Plazo (días)",
					valor: String(data.plazoDias)
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Fecha límite",
					valor: fechaCorta(data.fechaLimite)
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Responsable",
					valor: [data.responsable, data.cargo].filter(Boolean).join(" · ")
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Contacto",
					valor: [data.correo, data.telefono].filter(Boolean).join(" · ")
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Fundamento",
					valor: data.fundamento,
					doble: true
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "mb-1 text-xs text-muted-foreground",
						children: "Información específica"
					}), /* @__PURE__ */ jsxs("dd", {
						className: "flex flex-wrap gap-1.5",
						children: [data.especifica.length === 0 && /* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Sin ítems"
						}), data.especifica.map((e) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: e
						}, e))]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ jsxs("dt", {
						className: "mb-1 text-xs text-muted-foreground",
						children: [
							"Documentos (",
							data.documentos.length,
							")"
						]
					}), /* @__PURE__ */ jsx("dd", { children: data.documentos.length === 0 ? /* @__PURE__ */ jsx("span", {
						className: "text-sm",
						children: "Sin documentos adjuntos."
					}) : /* @__PURE__ */ jsx("ul", {
						className: "space-y-1",
						children: data.documentos.map((d) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ jsx(Paperclip, {
									size: 16,
									className: "shrink-0 text-primary",
									"aria-hidden": true
								}),
								" ",
								d.nombre,
								/* @__PURE__ */ jsxs("span", {
									className: "text-xs text-muted-foreground",
									children: [
										d.tipo,
										" · ",
										d.tamano
									]
								})
							]
						}, d.id))
					}) })]
				})
			]
		})]
	});
}
//#endregion
export { RequerimientosPage as component };
