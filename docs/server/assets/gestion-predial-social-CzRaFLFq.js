import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, x as exportarExcel, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Download, Eye, Paperclip, Pencil, Plus, Save, Trash2, Upload, Users } from "lucide-react";
//#region src/routes/gestion-predial-social.tsx?tsr-split=component
var textareaCls = `${controlClase} h-auto py-2`;
var PROYECTOS = [
	"Longitudinal de la Sierra Tramo 4",
	"Carretera Central, Tramo II",
	"Corredor Vial Interoceánico Sur"
];
var AMBITOS = [
	"Individual",
	"Familiar",
	"Grupal",
	"Comunitario"
];
var SEVERIDADES = [
	"No identificado",
	"Baja",
	"Media",
	"Alta"
];
var CATEGORIAS = [
	"Vulnerabilidad económica",
	"Salud",
	"Educación",
	"Vivienda",
	"Conflicto social",
	"Reasentamiento",
	"No identificado"
];
var SEVERIDAD_TONO = {
	Alta: "destructive",
	Media: "warning",
	Baja: "success",
	"No identificado": "neutral"
};
var opciones = (valores) => valores.map((v) => ({
	valor: v,
	texto: v
}));
var seed = [{
	id: "GPS-0001",
	proyecto: PROYECTOS[0],
	ambito: "Familiar",
	categoria: "Vulnerabilidad económica",
	severidad: "Media",
	sujeto: "Familia Quispe Huamán",
	ubicacion: "Sector Huanchaca, km 42+300",
	descripcion: "Núcleo familiar con jefe de hogar adulto mayor. Actividad económica basada en agricultura de subsistencia.",
	economica: "Ingreso mensual estimado < S/ 500. Sin acceso a crédito formal.",
	educacion: "2 miembros con primaria incompleta.",
	salud: "1 miembro con enfermedad crónica (diabetes).",
	enfermedades: "Diabetes tipo 2, hipertensión leve.",
	otros: "Solicita acompañamiento social durante adquisición.",
	fechaRegistro: "2026-05-14",
	responsable: "María López · Área Social",
	evidencias: [{
		id: "E1",
		tipo: "Foto",
		categoria: "Vivienda",
		descripcion: "Frontis de la vivienda familiar.",
		fecha: "2026-05-14",
		responsable: "María López",
		nombreArchivo: "vivienda_frontis.jpg"
	}],
	seguimientos: [{
		id: "S1",
		fecha: "2026-06-02",
		responsable: "María López",
		estado: "Permanece",
		observacion: "Se coordina segunda visita con equipo legal."
	}]
}, {
	id: "GPS-0002",
	proyecto: PROYECTOS[0],
	ambito: "Comunitario",
	categoria: "Conflicto social",
	severidad: "Alta",
	sujeto: "Comunidad Campesina San Andrés",
	ubicacion: "Sector norte del tramo",
	descripcion: "Comunidad expresa preocupación por afectación de zona agrícola comunal.",
	economica: "Comunidad dedicada a ganadería y agricultura.",
	educacion: "No identificado",
	salud: "No identificado",
	enfermedades: "No identificado",
	otros: "Requiere mesa de diálogo.",
	fechaRegistro: "2026-06-10",
	responsable: "Carlos Ruiz · Área Social",
	evidencias: [],
	seguimientos: []
}];
var CLAVE_HISTORIAL = "gestion-predial-social";
var BITACORA = {
	modulo: 25,
	entidad: "gestion_predial_social"
};
var ETIQUETAS = {
	proyecto: "Proyecto",
	ambito: "Ámbito",
	categoria: "Categoría",
	severidad: "Severidad",
	sujeto: "Sujeto / grupo",
	ubicacion: "Ubicación",
	descripcion: "Descripción",
	economica: "Situación económica",
	educacion: "Educación",
	salud: "Salud",
	enfermedades: "Enfermedades",
	otros: "Otros aspectos",
	fechaRegistro: "Fecha de registro",
	responsable: "Responsable",
	evidencias: "Evidencias",
	seguimientos: "Seguimientos",
	tipo: "Tipo",
	nombreArchivo: "Archivo",
	fecha: "Fecha",
	estado: "Estado",
	observacion: "Observación"
};
function Page() {
	const items = useHistorial(CLAVE_HISTORIAL)[0]?.registro ?? seed;
	const rol = useRol();
	const [openForm, setOpenForm] = useState(false);
	const [editing, setEditing] = useState(null);
	const [detail, setDetail] = useState(null);
	const [confirmDel, setConfirmDel] = useState(null);
	const cambiar = (despues, accion, objeto, motivo) => registrarCambio(CLAVE_HISTORIAL, {
		accion,
		objeto,
		motivo,
		antes: items,
		despues
	}, BITACORA);
	const nombre = (a) => `${a.id} ${a.sujeto}`;
	const upsert = (a) => {
		if (items.some((x) => x.id === a.id)) cambiar(items.map((x) => x.id === a.id ? a : x), "Modificó registro social", nombre(a));
		else cambiar([a, ...items], "Creó registro social", nombre(a));
	};
	const eliminar = (motivo) => {
		if (!confirmDel) return;
		cambiar(items.filter((x) => x.id !== confirmDel.id), "Eliminó registro social", nombre(confirmDel), motivo);
		setConfirmDel(null);
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Gestión predial social",
			icono: Users,
			descripcion: "Actores y ámbito de registro: seguimiento social del proceso predial.",
			migas: [{ texto: "Gestión predial social" }, { texto: "Actores y evidencias" }],
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => {
					setEditing(null);
					setOpenForm(true);
				},
				children: [/* @__PURE__ */ jsx(Plus, {}), " Crear registro social"]
			}),
			demo: true,
			columnas: [
				{
					clave: "id",
					titulo: "Código",
					ancho: "110px",
					render: (a) => /* @__PURE__ */ jsx("span", {
						className: "font-mono text-xs",
						children: a.id
					})
				},
				{
					clave: "proyecto",
					titulo: "Proyecto"
				},
				{
					clave: "ambito",
					titulo: "Ámbito"
				},
				{
					clave: "categoria",
					titulo: "Categoría"
				},
				{
					clave: "sujeto",
					titulo: "Sujeto / grupo",
					render: (a) => /* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: a.sujeto
					})
				},
				{
					clave: "severidad",
					titulo: "Severidad",
					render: (a) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: SEVERIDAD_TONO[a.severidad],
						children: a.severidad
					})
				},
				{
					clave: "fechaRegistro",
					titulo: "Fecha",
					render: (a) => fecha(a.fechaRegistro)
				},
				{
					clave: "responsable",
					titulo: "Responsable"
				}
			],
			filas: items,
			claveFila: (a) => a.id,
			filtros: [
				{
					clave: "proyecto",
					etiqueta: "Proyecto",
					opciones: opciones(PROYECTOS)
				},
				{
					clave: "ambito",
					etiqueta: "Ámbito",
					opciones: opciones(AMBITOS)
				},
				{
					clave: "severidad",
					etiqueta: "Severidad",
					opciones: opciones(SEVERIDADES)
				}
			],
			buscarEn: [
				"id",
				"sujeto",
				"descripcion",
				"categoria",
				"ubicacion"
			],
			accionesFila: [
				{
					nombre: "Ver detalle",
					icono: Eye,
					onClick: (a) => setDetail(a)
				},
				{
					nombre: "Editar registro",
					icono: Pencil,
					onClick: (a) => {
						setEditing(a);
						setOpenForm(true);
					}
				},
				{
					nombre: "Eliminar registro",
					icono: Trash2,
					destructiva: true,
					onClick: (a) => setConfirmDel(a)
				}
			],
			onFilaClick: (a) => setDetail(a),
			exportar: (visibles) => exportarExcel("gestion-predial-social", [
				{
					titulo: "Código",
					valor: (a) => a.id
				},
				{
					titulo: "Proyecto",
					valor: (a) => a.proyecto
				},
				{
					titulo: "Ámbito",
					valor: (a) => a.ambito
				},
				{
					titulo: "Categoría",
					valor: (a) => a.categoria
				},
				{
					titulo: "Sujeto / grupo",
					valor: (a) => a.sujeto
				},
				{
					titulo: "Severidad",
					valor: (a) => a.severidad
				},
				{
					titulo: "Ubicación",
					valor: (a) => a.ubicacion
				},
				{
					titulo: "Fecha de registro",
					valor: (a) => a.fechaRegistro
				},
				{
					titulo: "Responsable",
					valor: (a) => a.responsable
				},
				{
					titulo: "Evidencias",
					valor: (a) => a.evidencias.length
				},
				{
					titulo: "Seguimientos",
					valor: (a) => a.seguimientos.length
				}
			], visibles),
			vacio: "No hay registros sociales.",
			historial: {
				registro: CLAVE_HISTORIAL,
				etiquetas: ETIQUETAS,
				etiquetaFila: (a) => a.id,
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: (registro, n) => cambiar(registro, "Restauró una versión anterior", `versión ${n}`)
			}
		}),
		openForm && /* @__PURE__ */ jsx(ActorForm, {
			initial: editing,
			onCancel: () => setOpenForm(false),
			onSave: (a) => {
				upsert(a);
				setOpenForm(false);
			}
		}),
		detail && /* @__PURE__ */ jsx(DetailModal, {
			actor: detail,
			onClose: () => setDetail(null)
		}),
		confirmDel && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: "Eliminar registro social",
			descripcion: `El registro ${confirmDel.id} (${confirmDel.sujeto}) sale de la lista con sus evidencias y seguimientos. El histórico conserva sus datos y el motivo.`,
			accion: "Eliminar registro",
			onCerrar: () => setConfirmDel(null),
			onConfirmar: eliminar
		})
	] });
}
function ActorForm({ initial, onSave, onCancel }) {
	const [tab, setTab] = useState("caso");
	const [a, setA] = useState(initial ?? {
		id: "GPS-" + String(Math.floor(Math.random() * 9e3) + 1e3),
		proyecto: PROYECTOS[0],
		ambito: "Individual",
		categoria: "No identificado",
		severidad: "No identificado",
		sujeto: "",
		ubicacion: "",
		descripcion: "",
		economica: "",
		educacion: "",
		salud: "",
		enfermedades: "",
		otros: "",
		fechaRegistro: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		responsable: "",
		evidencias: [],
		seguimientos: []
	});
	const [intentado, setIntentado] = useState(false);
	const set = (k, v) => setA((p) => ({
		...p,
		[k]: v
	}));
	const guardar = () => {
		setIntentado(true);
		if (!a.sujeto.trim() || !a.responsable.trim() || !a.descripcion.trim()) {
			setTab("caso");
			return;
		}
		onSave(a);
	};
	const tabs = [
		{
			key: "caso",
			label: "Datos del caso"
		},
		{
			key: "socio",
			label: "Condición social"
		},
		{
			key: "evidencias",
			label: `Evidencias (${a.evidencias.length})`
		},
		{
			key: "seguimiento",
			label: `Seguimiento (${a.seguimientos.length})`
		}
	];
	const areaSocial = (k, etiqueta, placeholder) => /* @__PURE__ */ jsx(FormField, {
		etiqueta,
		ancho: "doble",
		children: (id) => /* @__PURE__ */ jsx("textarea", {
			id,
			rows: 2,
			className: textareaCls,
			value: a[k],
			onChange: (e) => set(k, e.target.value),
			placeholder
		})
	});
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onCancel,
		titulo: initial ? "Editar registro social" : "Crear registro social",
		descripcion: `Código ${a.id}`,
		ancho: "xl",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCancel,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: guardar,
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar registro"]
		})] }),
		children: [
			/* @__PURE__ */ jsx(Tabs, {
				value: tab,
				onValueChange: (v) => setTab(v),
				className: "mb-4",
				children: /* @__PURE__ */ jsx(TabsList, {
					"aria-label": "Secciones del registro",
					className: "flex-wrap",
					children: tabs.map((t) => /* @__PURE__ */ jsx(TabsTrigger, {
						value: t.key,
						children: t.label
					}, t.key))
				})
			}),
			tab === "caso" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx(Subtitulo, { children: "Ámbito del registro" }),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Proyecto",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: a.proyecto,
							onChange: (e) => set("proyecto", e.target.value),
							children: PROYECTOS.map((p) => /* @__PURE__ */ jsx("option", { children: p }, p))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Ámbito de afectación",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: a.ambito,
							onChange: (e) => set("ambito", e.target.value),
							children: AMBITOS.map((x) => /* @__PURE__ */ jsx("option", { children: x }, x))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Sujeto / grupo",
						obligatorio: true,
						error: intentado && !a.sujeto.trim() ? "Ingrese el sujeto o grupo" : void 0,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: a.sujeto,
							onChange: (e) => set("sujeto", e.target.value),
							placeholder: "Nombre del sujeto pasivo, familia o comunidad"
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Ubicación / sector",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: a.ubicacion,
							onChange: (e) => set("ubicacion", e.target.value)
						})
					})
				] }),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Clasificación" }),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Categoría social",
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: a.categoria,
							onChange: (e) => set("categoria", e.target.value),
							children: CATEGORIAS.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Nivel de severidad",
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: a.severidad,
							onChange: (e) => set("severidad", e.target.value),
							children: SEVERIDADES.map((x) => /* @__PURE__ */ jsx("option", { children: x }, x))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Fecha de registro",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: a.fechaRegistro,
							onChange: (e) => set("fechaRegistro", e.target.value)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Responsable",
						obligatorio: true,
						error: intentado && !a.responsable.trim() ? "Ingrese el responsable" : void 0,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							value: a.responsable,
							onChange: (e) => set("responsable", e.target.value)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Descripción del caso",
						obligatorio: true,
						ancho: "doble",
						error: intentado && !a.descripcion.trim() ? "Describa el caso" : void 0,
						children: (id) => /* @__PURE__ */ jsx("textarea", {
							id,
							rows: 4,
							className: textareaCls,
							value: a.descripcion,
							onChange: (e) => set("descripcion", e.target.value),
							placeholder: "Descripción textual del caso y su contexto"
						})
					})
				] })
			] }),
			tab === "socio" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Condición socioeconómica" }), /* @__PURE__ */ jsxs(FormGrid, { children: [
				areaSocial("economica", "Situación económica"),
				areaSocial("educacion", "Educación"),
				areaSocial("salud", "Salud"),
				areaSocial("enfermedades", "Enfermedades", "Información sensible: acceso restringido"),
				areaSocial("otros", "Otros aspectos sociales")
			] })] }),
			tab === "evidencias" && /* @__PURE__ */ jsx(EvidenciasEditor, {
				value: a.evidencias,
				onChange: (v) => set("evidencias", v)
			}),
			tab === "seguimiento" && /* @__PURE__ */ jsx(SeguimientoEditor, {
				value: a.seguimientos,
				onChange: (v) => set("seguimientos", v)
			})
		]
	});
}
function EvidenciasEditor({ value, onChange }) {
	const [e, setE] = useState({
		id: "",
		tipo: "Foto",
		categoria: "No identificado",
		descripcion: "",
		fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		responsable: "",
		nombreArchivo: ""
	});
	const add = () => {
		if (!e.descripcion || !e.nombreArchivo) return;
		onChange([...value, {
			...e,
			id: "E" + (value.length + 1)
		}]);
		setE({
			...e,
			descripcion: "",
			nombreArchivo: ""
		});
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Registrar evidencia" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: e.tipo,
					onChange: (ev) => setE({
						...e,
						tipo: ev.target.value
					}),
					children: [
						"Documento",
						"Foto",
						"Imagen"
					].map((x) => /* @__PURE__ */ jsx("option", { children: x }, x))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Categoría",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: e.categoria,
					onChange: (ev) => setE({
						...e,
						categoria: ev.target.value
					}),
					children: CATEGORIAS.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: e.fecha,
					onChange: (ev) => setE({
						...e,
						fecha: ev.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Responsable",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: e.responsable,
					onChange: (ev) => setE({
						...e,
						responsable: ev.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 2,
					className: textareaCls,
					value: e.descripcion,
					onChange: (ev) => setE({
						...e,
						descripcion: ev.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Archivo",
				ancho: "doble",
				ayuda: "Escriba el nombre o elija un archivo.",
				children: (id) => /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: e.nombreArchivo,
						onChange: (ev) => setE({
							...e,
							nombreArchivo: ev.target.value
						}),
						placeholder: "archivo.pdf / foto.jpg"
					}), /* @__PURE__ */ jsxs("label", {
						className: "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 text-sm hover:bg-muted",
						children: [
							/* @__PURE__ */ jsx(Upload, {
								size: 16,
								"aria-hidden": true
							}),
							" Elegir archivo",
							/* @__PURE__ */ jsx("input", {
								type: "file",
								className: "sr-only",
								onChange: (ev) => setE({
									...e,
									nombreArchivo: ev.target.files?.[0]?.name ?? e.nombreArchivo
								})
							})
						]
					})]
				})
			})
		] }),
		/* @__PURE__ */ jsx("div", {
			className: "mt-3 flex justify-end",
			children: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: add,
				disabled: !e.descripcion || !e.nombreArchivo,
				children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar evidencia"]
			})
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Evidencias registradas" }),
		/* @__PURE__ */ jsx(Tabla, {
			columnas: [
				{
					clave: "tipo",
					titulo: "Tipo"
				},
				{
					clave: "categoria",
					titulo: "Categoría"
				},
				{
					clave: "nombreArchivo",
					titulo: "Archivo",
					render: (x) => /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1",
						children: [
							/* @__PURE__ */ jsx(Paperclip, {
								size: 16,
								"aria-hidden": true
							}),
							" ",
							x.nombreArchivo
						]
					})
				},
				{
					clave: "descripcion",
					titulo: "Descripción"
				},
				{
					clave: "fecha",
					titulo: "Fecha",
					render: (x) => fecha(x.fecha)
				},
				{
					clave: "responsable",
					titulo: "Responsable"
				},
				{
					clave: "acciones",
					titulo: "Acciones",
					alinear: "derecha",
					render: (x) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onChange(value.filter((y) => y !== x)),
						"aria-label": `Quitar evidencia ${x.nombreArchivo}`,
						title: "Quitar evidencia",
						className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
						children: /* @__PURE__ */ jsx(Trash2, {
							size: 16,
							"aria-hidden": true
						})
					})
				}
			],
			filas: value,
			claveFila: (x) => x.id,
			vacio: "Sin evidencias registradas."
		})
	] });
}
function SeguimientoEditor({ value, onChange }) {
	const [s, setS] = useState({
		id: "",
		fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		responsable: "",
		estado: "Permanece",
		observacion: ""
	});
	const add = () => {
		if (!s.observacion) return;
		onChange([...value, {
			...s,
			id: "S" + (value.length + 1)
		}]);
		setS({
			...s,
			observacion: ""
		});
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Nuevo seguimiento" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: s.fecha,
					onChange: (e) => setS({
						...s,
						fecha: e.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Responsable",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: s.responsable,
					onChange: (e) => setS({
						...s,
						responsable: e.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado del caso",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: s.estado,
					onChange: (e) => setS({
						...s,
						estado: e.target.value
					}),
					children: [
						"Permanece",
						"Cambia",
						"Se agrava",
						"Resuelto"
					].map((x) => /* @__PURE__ */ jsx("option", { children: x }, x))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observación",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 2,
					className: textareaCls,
					value: s.observacion,
					onChange: (e) => setS({
						...s,
						observacion: e.target.value
					})
				})
			})
		] }),
		/* @__PURE__ */ jsx("div", {
			className: "mt-3 flex justify-end",
			children: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: add,
				disabled: !s.observacion,
				children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar seguimiento"]
			})
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Historial" }),
		/* @__PURE__ */ jsx(Tabla, {
			columnas: [
				{
					clave: "fecha",
					titulo: "Fecha",
					render: (x) => fecha(x.fecha)
				},
				{
					clave: "responsable",
					titulo: "Responsable"
				},
				{
					clave: "estado",
					titulo: "Estado"
				},
				{
					clave: "observacion",
					titulo: "Observación"
				},
				{
					clave: "acciones",
					titulo: "Acciones",
					alinear: "derecha",
					render: (x) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onChange(value.filter((y) => y !== x)),
						"aria-label": `Quitar seguimiento del ${fecha(x.fecha)}`,
						title: "Quitar seguimiento",
						className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
						children: /* @__PURE__ */ jsx(Trash2, {
							size: 16,
							"aria-hidden": true
						})
					})
				}
			],
			filas: value,
			claveFila: (x) => x.id,
			vacio: "Sin seguimientos registrados."
		})
	] });
}
function DetailModal({ actor, onClose }) {
	const exportCsv = () => {
		const csv = [
			["Campo", "Valor"],
			["Código", actor.id],
			["Proyecto", actor.proyecto],
			["Ámbito", actor.ambito],
			["Categoría", actor.categoria],
			["Severidad", actor.severidad],
			["Sujeto", actor.sujeto],
			["Ubicación", actor.ubicacion],
			["Descripción", actor.descripcion],
			["Económica", actor.economica],
			["Educación", actor.educacion],
			["Salud", actor.salud],
			["Enfermedades", actor.enfermedades],
			["Otros", actor.otros],
			["Fecha", actor.fechaRegistro],
			["Responsable", actor.responsable]
		].map((r) => r.map((c) => `"${(c ?? "").replace(/"/g, "\"\"")}"`).join(",")).join("\n");
		descargarBlob(`${actor.id}.csv`, new Blob([csv], { type: "text/csv;charset=utf-8" }));
	};
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: `Detalle · ${actor.id}`,
		descripcion: actor.sujeto,
		ancho: "lg",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: exportCsv,
			children: [/* @__PURE__ */ jsx(Download, {}), " Exportar CSV"]
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			onClick: onClose,
			children: "Cerrar"
		})] }),
		children: [
			/* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsx(Info$1, {
						k: "Proyecto",
						v: actor.proyecto
					}),
					/* @__PURE__ */ jsx(Info$1, {
						k: "Ámbito",
						v: actor.ambito
					}),
					/* @__PURE__ */ jsx(Info$1, {
						k: "Categoría",
						v: actor.categoria
					}),
					/* @__PURE__ */ jsx(Info$1, {
						k: "Severidad",
						v: actor.severidad
					}),
					/* @__PURE__ */ jsx(Info$1, {
						k: "Ubicación",
						v: actor.ubicacion
					}),
					/* @__PURE__ */ jsx(Info$1, {
						k: "Fecha de registro",
						v: fecha(actor.fechaRegistro)
					}),
					/* @__PURE__ */ jsx(Info$1, {
						k: "Responsable",
						v: actor.responsable
					})
				]
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Descripción" }),
			/* @__PURE__ */ jsx("p", {
				className: "whitespace-pre-wrap text-sm",
				children: actor.descripcion || "Sin descripción"
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Condición socioeconómica" }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsx(Block, {
						title: "Económica",
						text: actor.economica
					}),
					/* @__PURE__ */ jsx(Block, {
						title: "Educación",
						text: actor.educacion
					}),
					/* @__PURE__ */ jsx(Block, {
						title: "Salud",
						text: actor.salud
					}),
					/* @__PURE__ */ jsx(Block, {
						title: "Enfermedades",
						text: actor.enfermedades
					}),
					/* @__PURE__ */ jsx(Block, {
						title: "Otros",
						text: actor.otros
					})
				]
			}),
			/* @__PURE__ */ jsxs(Subtitulo, { children: [
				"Evidencias (",
				actor.evidencias.length,
				")"
			] }),
			/* @__PURE__ */ jsxs("ul", {
				className: "list-disc pl-5 text-sm",
				children: [actor.evidencias.map((e) => /* @__PURE__ */ jsxs("li", { children: [
					"[",
					e.tipo,
					"] ",
					e.nombreArchivo,
					": ",
					e.descripcion,
					" (",
					fecha(e.fecha),
					")"
				] }, e.id)), actor.evidencias.length === 0 && /* @__PURE__ */ jsx("li", {
					className: "list-none text-muted-foreground",
					children: "Sin evidencias."
				})]
			}),
			/* @__PURE__ */ jsxs(Subtitulo, { children: [
				"Seguimientos (",
				actor.seguimientos.length,
				")"
			] }),
			/* @__PURE__ */ jsxs("ul", {
				className: "list-disc pl-5 text-sm",
				children: [actor.seguimientos.map((s) => /* @__PURE__ */ jsxs("li", { children: [
					fecha(s.fecha),
					" · ",
					s.estado,
					": ",
					s.observacion,
					" (",
					s.responsable,
					")"
				] }, s.id)), actor.seguimientos.length === 0 && /* @__PURE__ */ jsx("li", {
					className: "list-none text-muted-foreground",
					children: "Sin seguimientos."
				})]
			})
		]
	});
}
function Info$1({ k, v }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex gap-2",
		children: [/* @__PURE__ */ jsxs("dt", {
			className: "text-muted-foreground",
			children: [k, ":"]
		}), /* @__PURE__ */ jsx("dd", {
			className: "text-foreground",
			children: v || "Sin dato"
		})]
	});
}
function Block({ title, text }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-muted p-2",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-1 text-xs font-semibold uppercase text-muted-foreground",
			children: title
		}), /* @__PURE__ */ jsx("p", {
			className: "whitespace-pre-wrap text-sm",
			children: text || "Sin dato"
		})]
	});
}
/** Eliminar o anular exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoModal({ titulo, descripcion, accion, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo,
		descripcion,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "destructive",
			disabled: motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: accion
		})] }),
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-cambio",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-cambio",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
//#endregion
export { Page as component };
