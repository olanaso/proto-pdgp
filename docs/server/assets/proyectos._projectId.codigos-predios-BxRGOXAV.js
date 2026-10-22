import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, _t as registrarCodigo, n as etiquetaProyecto, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Route$1 } from "./proyectos._projectId.codigos-predios-97JSKP-O.js";
import { t as HistorialTimeline } from "./proyectos._projectId.codigos-planos-DW_cZ9gw.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { i as PROFESIONALES, n as CURRENT_USER, o as getProjectInfo, s as seguimientoMock, t as COORDINACIONES } from "./projectContext-BYyGxWhp.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useId, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Copy, History, MapPin, Pencil, Plus, Printer, Save, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.codigos-predios.tsx?tsr-split=component
var initialPredios = [
	{
		id: 1,
		codigo: "VIAL-IIRSST5-T05-210101-PR-01042",
		departamento: "PUNO",
		proyecto: "PACRI - IIRSA SUR TRAMO 5",
		tipoPredio: "PREDIO RURAL",
		fecha: "2026-06-23 05:46:36",
		estado: "USADO"
	},
	{
		id: 2,
		codigo: "VIAL-IIRSST5-T05-210101-PR-01041",
		departamento: "PUNO",
		proyecto: "PACRI - IIRSA SUR TRAMO 5",
		tipoPredio: "PREDIO RURAL",
		fecha: "2026-06-23 05:41:57",
		estado: "ASIGNADO"
	},
	{
		id: 3,
		codigo: "AERO-PUCALLPA-PU-0611",
		departamento: "UCAYALI",
		proyecto: "AEROPUERTO DE PUCALLPA",
		tipoPredio: "PREDIO URBANO",
		fecha: "2026-06-22 10:11:57",
		estado: "USADO"
	},
	{
		id: 4,
		codigo: "AERO-PUCALLPA-PU-0610",
		departamento: "UCAYALI",
		proyecto: "AEROPUERTO DE PUCALLPA",
		tipoPredio: "PREDIO URBANO",
		fecha: "2026-06-22 10:11:05",
		estado: "ANULADO"
	},
	{
		id: 5,
		codigo: "VIAL-RV4-T02EVV-131201-PU-02201",
		departamento: "LA LIBERTAD",
		proyecto: "PACRI - RED VIAL 4",
		tipoPredio: "PREDIO URBANO",
		fecha: "2026-06-22 08:48:14",
		estado: "ASIGNADO"
	},
	{
		id: 6,
		codigo: "VIAL-RV4-T02EVV-131201-PU-02200",
		departamento: "LA LIBERTAD",
		proyecto: "PACRI - RED VIAL 4",
		tipoPredio: "PREDIO URBANO",
		fecha: "2026-06-22 08:48:13",
		estado: "USADO"
	},
	{
		id: 7,
		codigo: "AERO-PUCALLPA-PU-0609",
		departamento: "UCAYALI",
		proyecto: "AEROPUERTO DE PUCALLPA",
		tipoPredio: "PREDIO URBANO",
		fecha: "2026-06-22 08:47:14",
		estado: "DISPONIBLE"
	},
	{
		id: 8,
		codigo: "VIAL-IIRSST4-T04-210204-PR-04205",
		departamento: "PUNO",
		proyecto: "PACRI - IIRSA SUR TRAMO 4",
		tipoPredio: "PREDIO RURAL",
		fecha: "2026-06-18 03:22:14",
		estado: "USADO"
	},
	{
		id: 9,
		codigo: "VIAL-IIRSST4-T04-210204-PR-04204",
		departamento: "PUNO",
		proyecto: "PACRI - IIRSA SUR TRAMO 4",
		tipoPredio: "PREDIO RURAL",
		fecha: "2026-06-18 03:22:12",
		estado: "ANULADO"
	},
	{
		id: 10,
		codigo: "VIAL-LST4-ST05-090702-PR-05288",
		departamento: "HUANCAVELICA",
		proyecto: "LONGITUDINAL DE LA SIERRA TRAMO 04",
		tipoPredio: "PREDIO RURAL",
		fecha: "2026-06-17 03:51:56",
		estado: "DISPONIBLE"
	}
];
var ESTADO_TONO = {
	USADO: "success",
	ASIGNADO: "primary",
	ANULADO: "destructive",
	DISPONIBLE: "neutral"
};
var ESTADOS = [
	"USADO",
	"ASIGNADO",
	"ANULADO",
	"DISPONIBLE"
];
var tipoInfraestructuraOptions = [
	"Vial",
	"Aeropuerto",
	"Ferroviario",
	"Portuario"
];
var proyectoOptions = [
	"AEROPUERTO DE CABALLOCOCHA",
	"PACRI - IIRSA SUR TRAMO 5",
	"PACRI - RED VIAL 4",
	"LONGITUDINAL DE LA SIERRA TRAMO 04"
];
var tramoOptions = [
	"Tramo 01",
	"Tramo 02",
	"Tramo 03",
	"Tramo 04"
];
var tipoPredioOptions = ["PREDIO RURAL", "PREDIO URBANO"];
var departamentoOptions = [
	"LORETO",
	"PUNO",
	"UCAYALI",
	"LA LIBERTAD",
	"HUANCAVELICA"
];
var provinciaOptions = [
	"Mariscal Ramón Castilla",
	"Coronel Portillo",
	"Trujillo"
];
var distritoOptions = [
	"Caballococha",
	"Callería",
	"Trujillo"
];
var ETIQUETAS = {
	codigo: "Código",
	departamento: "Departamento",
	proyecto: "Proyecto",
	tipoPredio: "Tipo de predio",
	fecha: "Fecha de creación",
	estado: "Estado"
};
var unicos = (valores) => [...new Set(valores.filter(Boolean))].sort().map((v) => ({
	valor: v,
	texto: v
}));
function CodigosPrediosPage() {
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
		{ texto: "Códigos de predios" }
	];
	const [items, setItems] = useState(initialPredios);
	const rol = useRol();
	const { guardarVersion, restaurar } = useFormularioConHistorial(`codigos-predios-${projectId}`, items, setItems, {
		modulo: 12,
		entidad: "codigos_predios"
	});
	const [openModal, setOpenModal] = useState(false);
	const [editing, setEditing] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	function openNew() {
		setEditing(null);
		setOpenModal(true);
	}
	function openEdit(p) {
		setEditing(p);
		setOpenModal(true);
	}
	async function copiarPredio(p) {
		const texto = [
			`Código: ${p.codigo}`,
			`Departamento: ${p.departamento}`,
			`Proyecto: ${p.proyecto}`,
			`Tipo de Predio: ${p.tipoPredio}`,
			`Fecha de Creación: ${p.fecha}`,
			`Estado: ${p.estado}`
		].join("	");
		try {
			await navigator.clipboard.writeText(texto);
			setMensaje({
				tipo: "exito",
				texto: `Código ${p.codigo} copiado al portapapeles.`
			});
		} catch {
			setMensaje({
				tipo: "error",
				texto: "No se pudo copiar al portapapeles."
			});
		}
	}
	function handleSave(form) {
		if (editing) {
			const siguiente = items.map((it) => it.id === editing.id ? {
				...it,
				codigo: form.codigo || it.codigo,
				proyecto: form.proyecto || it.proyecto,
				tipoPredio: form.tipoPredio || it.tipoPredio,
				departamento: form.departamento || it.departamento
			} : it);
			setItems(siguiente);
			guardarVersion("Modificó código de predio", editing.codigo, void 0, siguiente);
			setMensaje({
				tipo: "exito",
				texto: `Código ${form.codigo || editing.codigo} actualizado.`
			});
		} else {
			const next = {
				id: Math.max(0, ...items.map((i) => i.id)) + 1,
				codigo: form.codigo || `NUEVO-${Date.now()}`,
				departamento: form.departamento || "Sin dato",
				proyecto: form.proyecto || "Sin dato",
				tipoPredio: form.tipoPredio || "PREDIO RURAL",
				fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " "),
				estado: "DISPONIBLE"
			};
			const siguiente = [next, ...items];
			setItems(siguiente);
			guardarVersion("Generó código de predio", next.codigo, void 0, siguiente);
			if (form.codigo) registrarCodigo({
				codigo: next.codigo,
				tipo: "predio",
				projectId,
				origen: "Códigos de predios"
			});
			setMensaje({
				tipo: "exito",
				texto: `Código ${next.codigo} generado. Ya se puede vincular desde la ficha del predio.`
			});
		}
		setOpenModal(false);
	}
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [
			mensaje && /* @__PURE__ */ jsxs("p", {
				role: mensaje.tipo === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${mensaje.tipo === "error" ? "border-destructive bg-destructive-soft text-destructive" : "border-success bg-success-soft text-success"}`,
				children: [/* @__PURE__ */ jsx("span", {
					className: "flex-1",
					children: mensaje.texto
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setMensaje(null),
					"aria-label": "Cerrar aviso",
					className: "rounded-sm hover:opacity-70",
					children: /* @__PURE__ */ jsx(X, { size: 16 })
				})]
			}),
			/* @__PURE__ */ jsx(CrudPage, {
				titulo: "Códigos de predios",
				icono: MapPin,
				descripcion: [proyecto && `${proyecto.codigo} · ${proyecto.fase}`, "Códigos de predio emitidos para el proyecto y su estado de uso."].filter(Boolean).join(" · "),
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
					children: [/* @__PURE__ */ jsx(Plus, {}), " Generar código de predio"]
				})] }),
				columnas: [
					{
						clave: "id",
						titulo: "ID",
						ancho: "60px"
					},
					{
						clave: "codigo",
						titulo: "Código",
						render: (p) => /* @__PURE__ */ jsx("span", {
							className: "font-medium text-primary-dark",
							children: p.codigo
						})
					},
					{
						clave: "departamento",
						titulo: "Departamento"
					},
					{
						clave: "proyecto",
						titulo: "Proyecto"
					},
					{
						clave: "tipoPredio",
						titulo: "Tipo de predio"
					},
					{
						clave: "fecha",
						titulo: "Fecha de creación",
						render: (p) => fechaHora(p.fecha)
					},
					{
						clave: "estado",
						titulo: "Estado",
						render: (p) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: ESTADO_TONO[p.estado],
							children: p.estado
						})
					}
				],
				filas: items,
				claveFila: (p) => p.id,
				filtros: [
					{
						clave: "estado",
						etiqueta: "Estado",
						opciones: ESTADOS.map((e) => ({
							valor: e,
							texto: e
						}))
					},
					{
						clave: "tipoPredio",
						etiqueta: "Tipo de predio",
						opciones: unicos(items.map((p) => p.tipoPredio))
					},
					{
						clave: "departamento",
						etiqueta: "Departamento",
						opciones: unicos(items.map((p) => p.departamento))
					}
				],
				buscarEn: [
					"codigo",
					"proyecto",
					"departamento"
				],
				accionesFila: [{
					nombre: "Copiar para Word",
					icono: Copy,
					onClick: (p) => void copiarPredio(p)
				}, {
					nombre: "Editar código",
					icono: Pencil,
					onClick: openEdit
				}],
				exportar: (visibles) => exportarExcel("codigos-predios", [
					{
						titulo: "ID",
						valor: (p) => p.id
					},
					{
						titulo: "Código",
						valor: (p) => p.codigo
					},
					{
						titulo: "Departamento",
						valor: (p) => p.departamento
					},
					{
						titulo: "Proyecto",
						valor: (p) => p.proyecto
					},
					{
						titulo: "Tipo de predio",
						valor: (p) => p.tipoPredio
					},
					{
						titulo: "Fecha de creación",
						valor: (p) => p.fecha
					},
					{
						titulo: "Estado",
						valor: (p) => p.estado
					}
				], visibles),
				vacio: "No hay códigos de predio generados.",
				historial: {
					registro: `codigos-predios-${projectId}`,
					etiquetas: ETIQUETAS,
					etiquetaFila: (p) => p.codigo,
					puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
					onRestaurar: (registro, n) => restaurar(registro, n)
				}
			}),
			openModal && /* @__PURE__ */ jsx(PredioModal, {
				initial: editing,
				onClose: () => setOpenModal(false),
				onSave: handleSave
			})
		]
	});
}
function PredioModal({ initial, onClose, onSave }) {
	const { projectId } = Route$1.useParams();
	const project = getProjectInfo(projectId);
	const formId = useId();
	const [tipoInfraestructura, setTipoInfraestructura] = useState(project.tipoInfraestructura);
	const [codigo, setCodigo] = useState(initial?.codigo ?? "");
	const [proyecto, setProyecto] = useState(initial?.proyecto ?? project.nombre);
	const [coordinacion, setCoordinacion] = useState(project.coordinacion);
	const [profesional, setProfesional] = useState(CURRENT_USER.nombre);
	const [tramo, setTramo] = useState("");
	const [tipoPredio, setTipoPredio] = useState(initial?.tipoPredio ?? "");
	const [departamento, setDepartamento] = useState(initial?.departamento ?? project.departamento);
	const [provincia, setProvincia] = useState(project.provincia);
	const [distrito, setDistrito] = useState(project.distrito);
	const opciones = (lista) => lista.map((o) => /* @__PURE__ */ jsx("option", {
		value: o,
		children: o
	}, o));
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		ancho: "xl",
		titulo: initial ? "Editar código de predio" : "Nuevo código de predio",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "submit",
			form: formId,
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar código"]
		})] }),
		children: /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "datos",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "datos",
						children: "Datos generales"
					}), /* @__PURE__ */ jsxs(TabsTrigger, {
						value: "historial",
						children: [/* @__PURE__ */ jsx(History, {
							size: 16,
							className: "mr-1",
							"aria-hidden": true
						}), " Historial de seguimiento"]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "datos",
					children: /* @__PURE__ */ jsx("form", {
						id: formId,
						onSubmit: (e) => {
							e.preventDefault();
							onSave({
								tipoInfraestructura,
								codigo,
								proyecto,
								tramo,
								tipoPredio,
								departamento,
								provincia,
								distrito
							});
						},
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Proyecto",
								obligatorio: true,
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
								children: (id) => /* @__PURE__ */ jsx("select", {
									id,
									value: coordinacion,
									onChange: (e) => setCoordinacion(e.target.value),
									className: controlClase,
									children: opciones(COORDINACIONES)
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
								etiqueta: "Tipo de infraestructura",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: tipoInfraestructura,
									onChange: (e) => setTipoInfraestructura(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(tipoInfraestructuraOptions)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Código de predio",
								ayuda: initial ? void 0 : "Se genera al guardar",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									value: codigo,
									onChange: (e) => setCodigo(e.target.value),
									disabled: !initial,
									className: controlClase
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Proyecto del catálogo",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: proyecto,
									onChange: (e) => setProyecto(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(proyectoOptions)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Tramo",
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: tramo,
									onChange: (e) => setTramo(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(tramoOptions)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Tipo de predio",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: tipoPredio,
									onChange: (e) => setTipoPredio(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(tipoPredioOptions)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Departamento",
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: departamento,
									onChange: (e) => setDepartamento(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(departamentoOptions)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Provincia",
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: provincia,
									onChange: (e) => setProvincia(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(provinciaOptions)]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Distrito",
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									value: distrito,
									onChange: (e) => setDistrito(e.target.value),
									className: controlClase,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), opciones(distritoOptions)]
								})
							})
						] })
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historial",
					children: /* @__PURE__ */ jsx(HistorialTimeline, { events: initial ? seguimientoMock : seguimientoMock.slice(0, 1) })
				})
			]
		})
	});
}
//#endregion
export { CodigosPrediosPage as component };
