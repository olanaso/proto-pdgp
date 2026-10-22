import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, _t as registrarCodigo, n as etiquetaProyecto, x as exportarExcel, yt as siguienteExpediente } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Route$1 } from "./proyectos._projectId.expedientes-CRIQujRz.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { n as CURRENT_USER, o as getProjectInfo, t as COORDINACIONES } from "./projectContext-BYyGxWhp.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useId, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, FolderOpen, Pencil, Plus, Printer, Save, Search, Trash2, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.expedientes.tsx?tsr-split=component
function prediosDelProyecto(projectId, project) {
	const slug = projectId.toUpperCase().replace(/[^A-Z0-9]+/g, "").slice(0, 6) || "PRY";
	const dpto = project.departamento || "Sin dato";
	return [
		"001",
		"002",
		"003",
		"005",
		"008",
		"012",
		"017",
		"021",
		"035"
	].map((s) => ({
		codigo: `${slug}-PRD-${s}`,
		departamento: dpto,
		tipo: "PREDIO RURAL"
	}));
}
var initial = [
	{
		id: 1,
		fecha: "2025-04-22 09:06:01",
		proyecto: "PACRI - IIRSA SUR TRAMO 3",
		coordinacion: "COORDINACIÓN DE MULTIPROYECTOS VIALES 3",
		tipo: "INDIVIDUAL",
		periodo: "2025",
		codigoExpediente: "00462-2025-MTC/DDP",
		codigoPredio: "COD_08_09_7",
		solicitante: "KAISER ELVIS, PAUCAR SALAZAR"
	},
	{
		id: 2,
		fecha: "2025-04-22 09:06:58",
		proyecto: "PACRI - IIRSA SUR TRAMO 3",
		coordinacion: "COORDINACIÓN DE MULTIPROYECTOS VIALES 3",
		tipo: "INDIVIDUAL",
		periodo: "2025",
		codigoExpediente: "00463-2025-MTC/DDP",
		codigoPredio: "T3-ALE-041",
		solicitante: "KAISER ELVIS, PAUCAR SALAZAR"
	},
	{
		id: 3,
		fecha: "2025-04-22 09:07:42",
		proyecto: "PACRI - IIRSA SUR TRAMO 3",
		coordinacion: "COORDINACIÓN DE MULTIPROYECTOS VIALES 3",
		tipo: "INDIVIDUAL",
		periodo: "2025",
		codigoExpediente: "00464-2025-MTC/DDP",
		codigoPredio: "T3-CAS-NT-02",
		solicitante: "KAISER ELVIS, PAUCAR SALAZAR"
	},
	{
		id: 4,
		fecha: "2025-04-22 09:08:20",
		proyecto: "PACRI - IIRSA SUR TRAMO 3",
		coordinacion: "COORDINACIÓN DE MULTIPROYECTOS VIALES 3",
		tipo: "INDIVIDUAL",
		periodo: "2025",
		codigoExpediente: "00465-2025-MTC/DDP",
		codigoPredio: "T3-MAV-005",
		solicitante: "KAISER ELVIS, PAUCAR SALAZAR"
	}
];
var ETIQUETAS = {
	codigoExpediente: "Código de expediente",
	codigoPredio: "Código de predio",
	coordinacion: "Coordinación",
	proyecto: "Proyecto",
	tipo: "Tipo",
	periodo: "Periodo",
	solicitante: "Solicitante",
	referencia: "Referencia",
	fecha: "Fecha de creación"
};
var unicos = (valores) => [...new Set(valores.filter(Boolean))].sort().map((v) => ({
	valor: v,
	texto: v
}));
function ExpedientesPage() {
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
		{ texto: "Expedientes del proyecto" }
	];
	const [items, setItems] = useState(initial);
	const rol = useRol();
	const { guardarVersion, restaurar } = useFormularioConHistorial(`expedientes-${projectId}`, items, setItems, {
		modulo: 10,
		entidad: "expedientes"
	});
	const [openModal, setOpenModal] = useState(false);
	const [editing, setEditing] = useState(null);
	const [eliminar, setEliminar] = useState(null);
	const [mensaje, setMensaje] = useState("");
	function openNew() {
		setEditing(null);
		setOpenModal(true);
	}
	function openEdit(e) {
		setEditing(e);
		setOpenModal(true);
	}
	function remove(e, motivo) {
		const siguiente = items.filter((x) => x.id !== e.id);
		setItems(siguiente);
		guardarVersion("Eliminó expediente", e.codigoExpediente, motivo, siguiente);
		setMensaje(`Expediente ${e.codigoExpediente} eliminado.`);
		setEliminar(null);
	}
	function handleSave(data) {
		if (editing) {
			const siguiente = items.map((x) => x.id === editing.id ? {
				...x,
				...data,
				id: editing.id
			} : x);
			setItems(siguiente);
			guardarVersion("Modificó expediente", data.codigoExpediente || editing.codigoExpediente, void 0, siguiente);
			setMensaje(`Expediente ${data.codigoExpediente || editing.codigoExpediente} actualizado.`);
		} else {
			const next = {
				id: Math.max(0, ...items.map((i) => i.id)) + 1,
				fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " "),
				...data,
				codigoExpediente: data.codigoExpediente || siguienteExpediente(data.periodo)
			};
			const siguiente = [next, ...items];
			setItems(siguiente);
			guardarVersion("Generó expediente", next.codigoExpediente, void 0, siguiente);
			registrarCodigo({
				codigo: next.codigoExpediente,
				tipo: "expediente",
				projectId,
				origen: "Expedientes"
			});
			setMensaje(`Expediente ${next.codigoExpediente} generado. Ya se puede vincular desde la ficha del predio.`);
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
				titulo: "Expedientes del proyecto",
				icono: FolderOpen,
				descripcion: [proyecto && `${proyecto.codigo} · ${proyecto.fase}`, "Expedientes administrativos generados por predio."].filter(Boolean).join(" · "),
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
					children: [/* @__PURE__ */ jsx(Plus, {}), " Generar expediente"]
				})] }),
				columnas: [
					{
						clave: "id",
						titulo: "ID",
						ancho: "60px"
					},
					{
						clave: "fecha",
						titulo: "Fecha de creación",
						render: (e) => fechaHora(e.fecha)
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
						clave: "tipo",
						titulo: "Tipo"
					},
					{
						clave: "periodo",
						titulo: "Periodo",
						ancho: "90px"
					},
					{
						clave: "codigoExpediente",
						titulo: "Código de expediente",
						render: (e) => /* @__PURE__ */ jsx("span", {
							className: "font-medium text-primary-dark",
							children: e.codigoExpediente
						})
					},
					{
						clave: "codigoPredio",
						titulo: "Código de predio"
					}
				],
				filas: items,
				claveFila: (e) => e.id,
				filtros: [{
					clave: "tipo",
					etiqueta: "Tipo",
					opciones: unicos(items.map((e) => e.tipo))
				}, {
					clave: "periodo",
					etiqueta: "Periodo",
					opciones: unicos(items.map((e) => e.periodo))
				}],
				buscarEn: [
					"codigoExpediente",
					"codigoPredio",
					"solicitante"
				],
				accionesFila: [{
					nombre: "Editar expediente",
					icono: Pencil,
					onClick: openEdit
				}, {
					nombre: "Eliminar expediente",
					icono: Trash2,
					destructiva: true,
					onClick: setEliminar
				}],
				exportar: (visibles) => exportarExcel("expedientes", [
					{
						titulo: "ID",
						valor: (e) => e.id
					},
					{
						titulo: "Fecha de creación",
						valor: (e) => e.fecha
					},
					{
						titulo: "Proyecto",
						valor: (e) => e.proyecto
					},
					{
						titulo: "Coordinación",
						valor: (e) => e.coordinacion
					},
					{
						titulo: "Tipo",
						valor: (e) => e.tipo
					},
					{
						titulo: "Periodo",
						valor: (e) => e.periodo
					},
					{
						titulo: "Código de expediente",
						valor: (e) => e.codigoExpediente
					},
					{
						titulo: "Código de predio",
						valor: (e) => e.codigoPredio
					},
					{
						titulo: "Solicitante",
						valor: (e) => e.solicitante
					}
				], visibles),
				vacio: "No hay expedientes generados para este proyecto.",
				historial: {
					registro: `expedientes-${projectId}`,
					etiquetas: ETIQUETAS,
					etiquetaFila: (e) => e.codigoExpediente,
					puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
					onRestaurar: (registro, n) => restaurar(registro, n)
				}
			}),
			openModal && /* @__PURE__ */ jsx(ExpedienteModal, {
				initial: editing,
				onClose: () => setOpenModal(false),
				onSave: handleSave
			}),
			eliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: eliminar.codigoExpediente,
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
		titulo: "Eliminar expediente",
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
			children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar expediente"]
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
				placeholder: "Por ejemplo: generado por error; duplicado"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function ExpedienteModal({ initial, onClose, onSave }) {
	const { projectId } = Route$1.useParams();
	const project = getProjectInfo(projectId);
	const formId = useId();
	const [step, setStep] = useState(initial ? 2 : 1);
	const [predioSearch, setPredioSearch] = useState("");
	const [codigoPredio, setCodigoPredio] = useState(initial?.codigoPredio ?? "");
	const [error, setError] = useState("");
	const [proyecto, setProyecto] = useState(initial?.proyecto ?? project.nombre);
	const [coordinacion, setCoordinacion] = useState(initial?.coordinacion ?? project.coordinacion);
	const [tipo, setTipo] = useState(initial?.tipo ?? "INDIVIDUAL");
	const [periodo, setPeriodo] = useState(initial?.periodo ?? String((/* @__PURE__ */ new Date()).getFullYear()));
	const [solicitante, setSolicitante] = useState(initial?.solicitante ?? CURRENT_USER.nombre);
	const [referencia, setReferencia] = useState(initial?.referencia ?? "");
	const [codigoExpediente, setCodigoExpediente] = useState(initial?.codigoExpediente ?? "");
	const prediosProyecto = useMemo(() => prediosDelProyecto(projectId, project), [projectId, project]);
	const prediosFiltrados = useMemo(() => prediosProyecto.filter((p) => !predioSearch || p.codigo.toLowerCase().includes(predioSearch.toLowerCase())), [prediosProyecto, predioSearch]);
	function next() {
		if (!codigoPredio) {
			setError("Seleccione un predio para continuar.");
			return;
		}
		setError("");
		setStep(2);
	}
	function submit(ev) {
		ev.preventDefault();
		if (!proyecto || !coordinacion || !tipo || !periodo) {
			setError("Complete los campos obligatorios: proyecto, coordinación, tipo y periodo.");
			return;
		}
		onSave({
			proyecto,
			coordinacion,
			tipo,
			periodo,
			codigoExpediente,
			codigoPredio,
			solicitante,
			referencia
		});
	}
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		ancho: "xl",
		titulo: initial ? "Editar expediente" : "Nuevo número de expediente",
		descripcion: `Paso ${step} de 2: ${step === 1 ? "seleccionar predio" : "datos generales"}`,
		pie: step === 1 ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: next,
			children: ["Siguiente ", /* @__PURE__ */ jsx(ChevronRight, {})]
		})] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
			!initial && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setStep(1),
				children: [/* @__PURE__ */ jsx(ChevronLeft, {}), " Atrás"]
			}),
			/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: onClose,
				children: "Cancelar"
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "submit",
				form: formId,
				children: [/* @__PURE__ */ jsx(Save, {}), " Guardar expediente"]
			})
		] }),
		children: [error && /* @__PURE__ */ jsx("p", {
			role: "alert",
			className: "mb-3 rounded-md border border-destructive bg-destructive-soft px-3 py-2 text-sm text-destructive",
			children: error
		}), step === 1 ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("label", {
				className: "relative block w-full max-w-xs",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "sr-only",
						children: "Buscar predio"
					}),
					/* @__PURE__ */ jsx(Search, {
						size: 16,
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("input", {
						type: "search",
						value: predioSearch,
						onChange: (e) => setPredioSearch(e.target.value),
						placeholder: "Buscar predio por código",
						className: `${controlClase} pl-9`
					})
				]
			}), /* @__PURE__ */ jsxs("span", {
				className: "text-xs text-muted-foreground",
				children: [prediosFiltrados.length, " predios"]
			})]
		}), /* @__PURE__ */ jsx(Tabla, {
			columnas: [
				{
					clave: "sel",
					titulo: "Elegir",
					ancho: "70px",
					render: (p) => /* @__PURE__ */ jsx("input", {
						type: "radio",
						name: "predio",
						className: "size-4 accent-primary",
						checked: codigoPredio === p.codigo,
						onChange: () => setCodigoPredio(p.codigo),
						"aria-label": `Seleccionar ${p.codigo}`
					})
				},
				{
					clave: "codigo",
					titulo: "Código de predio",
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
					clave: "tipo",
					titulo: "Tipo"
				}
			],
			filas: prediosFiltrados,
			claveFila: (p) => p.codigo,
			vacio: "Ningún predio coincide con la búsqueda."
		})] }) : /* @__PURE__ */ jsx("form", {
			id: formId,
			onSubmit: submit,
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
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						value: coordinacion,
						onChange: (e) => setCoordinacion(e.target.value),
						className: controlClase,
						children: COORDINACIONES.map((c) => /* @__PURE__ */ jsx("option", {
							value: c,
							children: c
						}, c))
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Número de expediente",
					ayuda: initial ? void 0 : "Se genera al guardar",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						value: codigoExpediente,
						onChange: (e) => setCodigoExpediente(e.target.value),
						disabled: !initial,
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Tipo de expediente",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						value: tipo,
						onChange: (e) => setTipo(e.target.value),
						className: controlClase,
						children: [/* @__PURE__ */ jsx("option", {
							value: "INDIVIDUAL",
							children: "INDIVIDUAL"
						}), /* @__PURE__ */ jsx("option", {
							value: "MULTIPLE",
							children: "MÚLTIPLE"
						})]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Código de predio",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						value: codigoPredio,
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
						onChange: (e) => setPeriodo(e.target.value),
						className: controlClase,
						inputMode: "numeric",
						required: true
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Solicitante",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						value: solicitante,
						onChange: (e) => setSolicitante(e.target.value),
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Referencia",
					ancho: "doble",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						value: referencia,
						onChange: (e) => setReferencia(e.target.value),
						className: controlClase
					})
				})
			] })
		})]
	});
}
//#endregion
export { ExpedientesPage as component };
