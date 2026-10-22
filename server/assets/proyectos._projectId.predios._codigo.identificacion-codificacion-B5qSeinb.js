import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { _ as esProvisional, c as getPredioCenter, d as predioRows, m as codificarPredio, p as NOMBRE_ORIGEN, s as getPredioByCodigo, u as normalizarExpediente, x as registradoPorCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, P as useRegistroExpediente, T as Confirmar, bt as usadoPorOtro, dt as asignarCodigo, ft as codigoAsignado, gt as partesDeCodigo, ht as infraestructuraDe, mt as expedienteValido, n as etiquetaProyecto, pt as disponibles, t as PredioEncabezado, ut as armarCodigoPredio, vt as siguienteCorrelativoPredio, xt as useCodigos, yt as siguienteExpediente } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.identificacion-codificacion-D7srUBdS.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Archive, CheckCircle2, ChevronDown, Download, Eye, FileCheck2, FileText, FileUp, Files, History, Link2, Loader2, Pencil, Plus, Save, Scale, Search, SearchCheck, Send, ShieldAlert, Trash2, Upload, UsersRound, X } from "lucide-react";
import { toast } from "sonner";
//#region src/components/DialogosCodigo.tsx
var INFRAESTRUCTURAS = [
	["AERO", "Aeroportuaria"],
	["VIAL", "Vial"],
	["FERRO", "Ferroviaria"],
	["PORT", "Portuaria"]
];
/** Valor más frecuente de una parte del código entre los predios del proyecto (sector, ubigeo). */
function masFrecuente(proyecto, campo) {
	const cuenta = /* @__PURE__ */ new Map();
	for (const r of predioRows) {
		const p = partesDeCodigo(r.cod);
		if (p && p.proyecto === proyecto) cuenta.set(p[campo], (cuenta.get(p[campo]) ?? 0) + 1);
	}
	return [...cuenta.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}
/**
* Genera el código del predio con el formato del padrón. Toma las partes del código actual si es largo;
* si no, las más usadas en el proyecto. El correlativo es el siguiente libre del proyecto.
*/
function GenerarCodigoPredio({ abierto, onCerrar, projectId, predio, codigoActual, condicion, alAsignar }) {
	const registro = useCodigos();
	const proyecto = getProyecto(projectId);
	const abrevInicial = (partesDeCodigo(codigoActual)?.proyecto ?? projectId.replace(/[^a-z0-9]/gi, "")).toUpperCase();
	const actuales = partesDeCodigo(codigoActual);
	const [partes, setPartes] = useState(() => ({
		infraestructura: actuales?.infraestructura ?? infraestructuraDe(proyecto?.tipo ?? ""),
		proyecto: abrevInicial,
		sector: actuales?.sector ?? masFrecuente(abrevInicial, "sector"),
		ubigeo: actuales?.ubigeo ?? masFrecuente(abrevInicial, "ubigeo"),
		condicion: condicion === "ESTATAL" ? "PU" : "PR"
	}));
	const cambiar = (k, v) => setPartes((p) => ({
		...p,
		[k]: v
	}));
	const correlativo = useMemo(() => siguienteCorrelativoPredio(partes.proyecto, registro), [partes.proyecto, registro]);
	const errores = {
		proyecto: /^[A-Z0-9]{2,12}$/i.test(partes.proyecto) ? "" : "De 2 a 12 letras o números.",
		sector: /^[A-Z0-9]{1,6}$/i.test(partes.sector) ? "" : "De 1 a 6 letras o números, por ejemplo SO2.",
		ubigeo: /^\d{6}$/.test(partes.ubigeo) ? "" : "Seis dígitos del ubigeo del distrito."
	};
	const valido = !errores.proyecto && !errores.sector && !errores.ubigeo;
	const codigo = armarCodigoPredio(partes, correlativo);
	return /* @__PURE__ */ jsxs(Modal, {
		abierto,
		onCerrar,
		titulo: "Generar código de predio",
		descripcion: "Formato del padrón: infraestructura · proyecto · sector · ubigeo · PR privado o PU público · correlativo del proyecto.",
		ancho: "md",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			disabled: !valido,
			onClick: () => {
				alAsignar(asignarCodigo({
					codigo,
					tipo: "predio",
					projectId,
					predio,
					origen: "Ficha del predio"
				}), "generado");
				onCerrar();
			},
			children: [/* @__PURE__ */ jsx(Plus, {}), " Asignar este código"]
		})] }),
		children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Infraestructura",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: partes.infraestructura,
					onChange: (e) => cambiar("infraestructura", e.target.value),
					children: INFRAESTRUCTURAS.map(([v, t]) => /* @__PURE__ */ jsxs("option", {
						value: v,
						children: [
							v,
							" · ",
							t
						]
					}, v))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Proyecto",
				obligatorio: true,
				error: errores.proyecto,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: partes.proyecto,
					onChange: (e) => cambiar("proyecto", e.target.value.toUpperCase())
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sector",
				obligatorio: true,
				error: errores.sector,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: partes.sector,
					onChange: (e) => cambiar("sector", e.target.value.toUpperCase())
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Ubigeo",
				obligatorio: true,
				error: errores.ubigeo,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					inputMode: "numeric",
					maxLength: 6,
					className: controlClase,
					value: partes.ubigeo,
					onChange: (e) => cambiar("ubigeo", e.target.value.replace(/\D/g, ""))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Condición",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: partes.condicion,
					onChange: (e) => cambiar("condicion", e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "PR",
						children: "PR · predio privado"
					}), /* @__PURE__ */ jsx("option", {
						value: "PU",
						children: "PU · predio público"
					})]
				})
			})
		] }), /* @__PURE__ */ jsxs("div", {
			className: "mt-4 rounded-md bg-background px-4 py-3",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Código que se asignará"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "break-all font-mono text-lg font-semibold text-primary-dark",
					children: valido ? codigo : "Complete los datos"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						"Correlativo ",
						String(correlativo).padStart(5, "0"),
						": el siguiente libre del proyecto",
						" ",
						partes.proyecto,
						" entre el padrón y los códigos ya generados."
					]
				})
			]
		})]
	});
}
/** Genera el expediente del año con el formato NNNN-AAAA-MTC/DDP y el siguiente correlativo libre. */
function GenerarExpediente({ abierto, onCerrar, projectId, predio, anio, alAsignar }) {
	const registro = useCodigos();
	const valido = /^\d{4}$/.test(anio);
	const codigo = valido ? siguienteExpediente(anio, registro) : "";
	return /* @__PURE__ */ jsx(Modal, {
		abierto,
		onCerrar,
		titulo: "Generar código de expediente",
		descripcion: "Formato del padrón: correlativo · año · MTC/DDP. El año sale de «Mes y año del expediente».",
		ancho: "sm",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			disabled: !valido,
			onClick: () => {
				alAsignar(asignarCodigo({
					codigo,
					tipo: "expediente",
					projectId,
					predio,
					origen: "Ficha del predio"
				}), "generado");
				onCerrar();
			},
			children: [/* @__PURE__ */ jsx(Plus, {}), " Asignar este expediente"]
		})] }),
		children: /* @__PURE__ */ jsxs("div", {
			className: "rounded-md bg-background px-4 py-3",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Expediente que se asignará"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "font-mono text-lg font-semibold text-primary-dark",
					children: valido ? codigo : "Indique un año de cuatro dígitos"
				}),
				valido && /* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						"Siguiente correlativo libre de ",
						anio,
						" entre el padrón y los expedientes ya generados."
					]
				})
			]
		})
	});
}
/** Vincula un código generado antes (en Codificación o en otra ficha) y que sigue disponible. */
function VincularCodigo({ abierto, onCerrar, projectId, predio, tipo, alAsignar }) {
	const registro = useCodigos();
	const [texto, setTexto] = useState("");
	const lista = disponibles(registro, projectId, tipo).filter((c) => c.codigo.toLowerCase().includes(texto.trim().toLowerCase()));
	return /* @__PURE__ */ jsxs(Modal, {
		abierto,
		onCerrar,
		titulo: `Vincular ${tipo === "predio" ? "código de predio" : "expediente"} existente`,
		descripcion: `Códigos generados en Codificación o liberados de otra ficha, aún sin predio. Al vincular uno, queda asignado a este predio.`,
		ancho: "md",
		children: [/* @__PURE__ */ jsxs("label", {
			className: "relative mb-3 block",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: "Buscar código"
				}),
				/* @__PURE__ */ jsx(Search, {
					size: 16,
					className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsx("input", {
					autoFocus: true,
					value: texto,
					onChange: (e) => setTexto(e.target.value),
					placeholder: "Buscar código",
					className: `${controlClase} pl-9`
				})
			]
		}), lista.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "rounded-md bg-background px-4 py-6 text-center text-sm text-muted-foreground",
			children: texto ? "Ningún código disponible coincide." : `No hay ${tipo === "predio" ? "códigos de predio" : "expedientes"} disponibles en este proyecto. Genere uno aquí o en Codificación.`
		}) : /* @__PURE__ */ jsx("ul", {
			className: "divide-y divide-border rounded-md border border-border",
			children: lista.map((c) => /* @__PURE__ */ jsxs("li", {
				className: "flex flex-wrap items-center justify-between gap-2 px-3 py-2",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ jsx("span", {
						className: "block break-all font-mono text-sm font-semibold",
						children: c.codigo
					}), /* @__PURE__ */ jsxs("span", {
						className: "block text-xs text-muted-foreground",
						children: [
							c.origen,
							" · ",
							fechaHora(c.fecha)
						]
					})]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: () => {
						alAsignar(asignarCodigo({
							codigo: c.codigo,
							tipo,
							projectId,
							predio,
							origen: c.origen
						}), "vinculado");
						onCerrar();
					},
					children: [/* @__PURE__ */ jsx(Link2, {}), " Vincular"]
				})]
			}, c.codigo))
		})]
	});
}
//#endregion
//#region src/components/DocumentSectionIcon.tsx
var icons = {
	scale: Scale,
	files: Files,
	succession: UsersRound,
	possession: FileCheck2,
	charges: ShieldAlert,
	archive: Archive
};
function DocumentSectionIcon({ icon, size = 16, className }) {
	const Icon = icons[icon];
	return /* @__PURE__ */ jsx(Icon, {
		size,
		className,
		"aria-hidden": true
	});
}
//#endregion
//#region src/components/DocumentSectionAccordion.tsx
function DocumentSectionAccordion({ config, records, open, onToggle, onNew, onView, onEdit, onDownload, onDelete }) {
	const columnas = [
		{
			clave: "numero",
			titulo: "N.º",
			ancho: "56px",
			render: (f) => /* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: f.numero
			})
		},
		{
			clave: "acciones",
			titulo: "Acciones",
			ancho: "150px",
			render: (f) => /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1",
				children: [
					/* @__PURE__ */ jsx(AccionIcono, {
						nombre: "Ver documento",
						icono: Eye,
						onClick: () => onView(f.registro)
					}),
					/* @__PURE__ */ jsx(AccionIcono, {
						nombre: "Editar documento",
						icono: Pencil,
						onClick: () => onEdit(f.registro)
					}),
					/* @__PURE__ */ jsx(AccionIcono, {
						nombre: f.registro.archivo ? "Descargar archivo" : "Sin archivo adjunto",
						icono: Download,
						onClick: () => onDownload(f.registro),
						disabled: !f.registro.archivo
					}),
					/* @__PURE__ */ jsx(AccionIcono, {
						nombre: "Eliminar documento",
						icono: Trash2,
						onClick: () => onDelete(f.registro),
						destructiva: true
					})
				]
			})
		},
		...config.columns.map((column) => ({
			clave: column.key,
			titulo: column.label,
			render: (f) => /* @__PURE__ */ jsx("span", {
				className: `block ${column.className ?? ""}`,
				children: column.key === "archivo" ? f.registro.archivo?.name || "Sin archivo" : f.registro[column.key] || "Sin dato"
			})
		}))
	];
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-lg border border-border bg-card",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 pr-3",
			children: [/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: onToggle,
				"aria-expanded": open,
				className: "flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-muted",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
						children: /* @__PURE__ */ jsx(DocumentSectionIcon, { icon: config.icon })
					}),
					/* @__PURE__ */ jsx("span", {
						className: "truncate text-sm font-semibold",
						children: config.title
					}),
					/* @__PURE__ */ jsx(StatusBadge, { children: records.length }),
					/* @__PURE__ */ jsx(ChevronDown, {
						size: 16,
						className: `ml-auto shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`,
						"aria-hidden": true
					})
				]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				size: "sm",
				onClick: onNew,
				children: [/* @__PURE__ */ jsx(Plus, {}), " Nuevo registro"]
			})]
		}), open && /* @__PURE__ */ jsx("div", {
			className: "border-t border-border p-3",
			children: /* @__PURE__ */ jsx(Tabla, {
				columnas,
				filas: records.map((registro, index) => ({
					registro,
					numero: index + 1
				})),
				claveFila: (f) => f.registro.id,
				vacio: config.emptyMessage
			})
		})]
	});
}
function AccionIcono({ nombre, icono: Icono, onClick, disabled, destructiva }) {
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick,
			disabled,
			"aria-label": nombre,
			className: `flex size-8 items-center justify-center rounded-md border border-border disabled:cursor-not-allowed disabled:opacity-40 ${destructiva ? "text-destructive hover:bg-destructive-soft" : "text-primary-dark hover:bg-primary-soft"}`,
			children: /* @__PURE__ */ jsx(Icono, {
				size: 16,
				"aria-hidden": true
			})
		})
	}), /* @__PURE__ */ jsx(TooltipContent, { children: nombre })] });
}
//#endregion
//#region src/lib/predioDocumentSections.ts
var GENERAL_FIELDS = [
	{
		key: "fechaDocumento",
		label: "Fecha del documento",
		type: "date",
		required: true
	},
	{
		key: "anioTitulo",
		label: "Año del título",
		type: "number",
		required: true,
		placeholder: "Ej. 2026"
	},
	{
		key: "tipoDocumento",
		label: "Tipo de documento",
		type: "select",
		required: true,
		options: [
			"Acta",
			"Carta",
			"Certificado",
			"Escritura pública",
			"Informe",
			"Resolución",
			"Título",
			"Otro"
		]
	},
	{
		key: "numeroDocumento",
		label: "Número de documento",
		type: "text",
		required: true,
		placeholder: "Ingrese el número"
	},
	{
		key: "oficinaRegistral",
		label: "Oficina registral",
		type: "text",
		required: true,
		placeholder: "Ingrese la oficina registral"
	},
	{
		key: "descripcion",
		label: "Descripción",
		type: "text",
		required: true,
		placeholder: "Describa brevemente el documento"
	}
];
var JUDICIAL_FIELDS = [
	{
		key: "numeroExpedienteJudicial",
		label: "N.º de expediente judicial",
		type: "text",
		required: true
	},
	{
		key: "distritoJudicial",
		label: "Distrito judicial",
		type: "text",
		required: true
	},
	{
		key: "instancia",
		label: "Instancia",
		type: "select",
		required: true,
		options: [
			"Juzgado de Paz Letrado",
			"Primera instancia",
			"Segunda instancia",
			"Corte Suprema"
		]
	},
	{
		key: "especialidad",
		label: "Especialidad",
		type: "select",
		required: true,
		options: [
			"Civil",
			"Contencioso administrativo",
			"Laboral",
			"Penal",
			"Constitucional",
			"Otra"
		]
	}
];
var GENERAL_COLUMNS = [
	{
		key: "fechaDocumento",
		label: "Fecha documento",
		className: "whitespace-nowrap"
	},
	{
		key: "anioTitulo",
		label: "Año título",
		className: "whitespace-nowrap"
	},
	{
		key: "tipoDocumento",
		label: "Tipo de documento",
		className: "min-w-[140px]"
	},
	{
		key: "numeroDocumento",
		label: "N.º documento",
		className: "min-w-[130px]"
	},
	{
		key: "oficinaRegistral",
		label: "Oficina registral",
		className: "min-w-[150px]"
	},
	{
		key: "descripcion",
		label: "Descripción",
		className: "min-w-[220px]"
	},
	{
		key: "archivo",
		label: "Archivo",
		className: "min-w-[130px]"
	}
];
var JUDICIAL_COLUMNS = [
	...GENERAL_COLUMNS.slice(0, 5),
	{
		key: "numeroExpedienteJudicial",
		label: "Expediente judicial",
		className: "min-w-[150px]"
	},
	{
		key: "distritoJudicial",
		label: "Distrito judicial",
		className: "min-w-[140px]"
	},
	{
		key: "instancia",
		label: "Instancia",
		className: "min-w-[130px]"
	},
	{
		key: "especialidad",
		label: "Especialidad",
		className: "min-w-[130px]"
	},
	...GENERAL_COLUMNS.slice(5)
];
var section = (config) => ({
	...config,
	columns: config.judicial ? JUDICIAL_COLUMNS : GENERAL_COLUMNS,
	formFields: config.judicial ? [
		...GENERAL_FIELDS.slice(0, 5),
		...JUDICIAL_FIELDS,
		GENERAL_FIELDS[5]
	] : GENERAL_FIELDS,
	emptyMessage: "Sin registros disponibles"
});
var DOCUMENT_SECTION_CONFIGS = [
	section({
		id: "procesos-judiciales",
		title: "Procesos Judiciales",
		icon: "scale",
		createTitle: "Registrar proceso judicial",
		editTitle: "Editar proceso judicial",
		viewTitle: "Ver proceso judicial",
		endpoint: "/api/predios/:codigo/procesos-judiciales",
		judicial: true
	}),
	section({
		id: "otros-documentos",
		title: "Otros Documentos",
		icon: "files",
		createTitle: "Registrar otro documento",
		editTitle: "Editar otro documento",
		viewTitle: "Ver otro documento",
		endpoint: "/api/predios/:codigo/otros-documentos"
	}),
	section({
		id: "sucesion-intestada",
		title: "Sucesión Intestada",
		icon: "succession",
		createTitle: "Registrar sucesión intestada",
		editTitle: "Editar sucesión intestada",
		viewTitle: "Ver sucesión intestada",
		endpoint: "/api/predios/:codigo/sucesion-intestada"
	}),
	section({
		id: "documentos-posesion",
		title: "Documentos que Acreditan la Posesión",
		icon: "possession",
		createTitle: "Registrar documento que acredita la posesión",
		editTitle: "Editar documento que acredita la posesión",
		viewTitle: "Ver documento que acredita la posesión",
		endpoint: "/api/predios/:codigo/documentos-posesion"
	}),
	section({
		id: "cargas-gravamenes",
		title: "Cargas o Gravámenes",
		icon: "charges",
		createTitle: "Registrar carga o gravamen",
		editTitle: "Editar carga o gravamen",
		viewTitle: "Ver carga o gravamen",
		endpoint: "/api/predios/:codigo/cargas-gravamenes"
	}),
	section({
		id: "titulos-archivados",
		title: "Títulos Archivados",
		icon: "archive",
		createTitle: "Registrar título archivado",
		editTitle: "Editar título archivado",
		viewTitle: "Ver título archivado",
		endpoint: "/api/predios/:codigo/titulos-archivados"
	})
];
var EMPTY_DOCUMENT_RECORD = {
	id: "",
	fechaDocumento: "",
	anioTitulo: "",
	tipoDocumento: "",
	numeroDocumento: "",
	oficinaRegistral: "",
	descripcion: "",
	numeroExpedienteJudicial: "",
	distritoJudicial: "",
	instancia: "",
	especialidad: "",
	archivo: null
};
var DOCUMENT_FILE_ACCEPT = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp";
var ALLOWED_EXTENSIONS = [
	"pdf",
	"doc",
	"docx",
	"png",
	"jpg",
	"jpeg",
	"webp"
];
function validateDocumentFile(file) {
	const extension = file.name.split(".").pop()?.toLowerCase() || "";
	if (!ALLOWED_EXTENSIONS.includes(extension)) return "Formato no permitido. Adjunte un archivo PDF, Word o una imagen.";
	if (file.size > 10485760) return "El archivo supera el tamaño máximo permitido de 10 MB.";
	return "";
}
function formatDocumentFileSize(size) {
	if (size < 1024) return `${size} B`;
	if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
	return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
//#endregion
//#region src/components/PredioDocumentModal.tsx
function PredioDocumentModal({ open, mode, config, record, onClose, onSave }) {
	const [form, setForm] = useState({ ...EMPTY_DOCUMENT_RECORD });
	const [fileError, setFileError] = useState("");
	const [serverError, setServerError] = useState("");
	const [saving, setSaving] = useState(false);
	const fileInputRef = useRef(null);
	const isView = mode === "view";
	useEffect(() => {
		if (!open) return;
		setForm(record ? { ...record } : { ...EMPTY_DOCUMENT_RECORD });
		setFileError("");
		setServerError("");
		setSaving(false);
		if (fileInputRef.current) fileInputRef.current.value = "";
	}, [
		open,
		record,
		config?.id,
		mode
	]);
	const fieldErrors = useMemo(() => {
		if (!config) return {};
		return config.formFields.reduce((errors, field) => {
			const value = String(form[field.key] ?? "").trim();
			if (field.required && !value) errors[field.key] = "Este campo es obligatorio.";
			if (field.key === "anioTitulo" && value && !/^\d{4}$/.test(value)) errors[field.key] = "Ingrese un año válido de cuatro dígitos.";
			return errors;
		}, {});
	}, [config, form]);
	const canSave = !isView && !saving && !fileError && Object.keys(fieldErrors).length === 0;
	if (!config) return null;
	const title = mode === "create" ? config.createTitle : mode === "edit" ? config.editTitle : config.viewTitle;
	const documentFields = config.formFields.filter((field) => field.key !== "descripcion");
	const descriptionField = config.formFields.find((field) => field.key === "descripcion");
	const disabled = isView || saving;
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
		setServerError("");
	}
	function handleFile(file) {
		if (!file) return;
		const error = validateDocumentFile(file);
		setFileError(error);
		if (!error) setForm((current) => ({
			...current,
			archivo: file
		}));
	}
	function removeFile() {
		setForm((current) => ({
			...current,
			archivo: null
		}));
		setFileError("");
		if (fileInputRef.current) fileInputRef.current.value = "";
	}
	async function handleSave() {
		if (!canSave) return;
		setSaving(true);
		setServerError("");
		try {
			await onSave(form);
		} catch (error) {
			setServerError(error instanceof Error ? error.message : "No se pudo guardar el registro.");
			setSaving(false);
		}
	}
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: open,
		onCerrar: () => {
			if (!saving) onClose();
		},
		titulo: title,
		descripcion: isView ? "Consulta de la información registrada." : "Complete los datos obligatorios antes de guardar.",
		ancho: "lg",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			disabled: saving,
			children: [
				/* @__PURE__ */ jsx(X, {}),
				" ",
				isView ? "Cerrar" : "Cancelar"
			]
		}), !isView && /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleSave,
			disabled: !canSave,
			children: [saving ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, {}), saving ? "Guardando..." : "Guardar documento"]
		})] }),
		children: [
			serverError && /* @__PURE__ */ jsx("p", {
				role: "alert",
				className: "mb-3 rounded-md border border-destructive bg-destructive-soft px-3 py-2 text-sm text-destructive",
				children: serverError
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Datos del documento" }),
			/* @__PURE__ */ jsx(FormGrid, { children: documentFields.map((field) => /* @__PURE__ */ jsx(FormField, {
				etiqueta: field.label,
				obligatorio: field.required,
				error: isView ? void 0 : fieldErrors[field.key],
				children: (id) => field.type === "select" ? /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: String(form[field.key] ?? ""),
					onChange: (event) => setField(field.key, event.target.value),
					disabled,
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), field.options?.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				}) : /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					type: field.type,
					value: String(form[field.key] ?? ""),
					onChange: (event) => setField(field.key, event.target.value),
					disabled,
					placeholder: field.placeholder,
					min: field.type === "number" ? "1900" : void 0,
					max: field.type === "number" ? "2100" : void 0
				})
			}, field.key)) }),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Archivo y descripción" }),
			/* @__PURE__ */ jsxs(FormGrid, {
				columnas: 1,
				children: [descriptionField && /* @__PURE__ */ jsx(FormField, {
					etiqueta: descriptionField.label,
					obligatorio: descriptionField.required,
					error: isView ? void 0 : fieldErrors.descripcion,
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						rows: 3,
						value: form.descripcion,
						onChange: (event) => setField("descripcion", event.target.value),
						disabled,
						placeholder: descriptionField.placeholder,
						className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted h-auto py-2`
					})
				}), /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Archivo adjunto",
					ayuda: "PDF, Word o imágenes. Tamaño máximo: 10 MB.",
					error: fileError || void 0,
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex min-h-9 items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 text-sm",
						children: [
							/* @__PURE__ */ jsx("input", {
								ref: fileInputRef,
								type: "file",
								accept: DOCUMENT_FILE_ACCEPT,
								className: "sr-only",
								onChange: (event) => handleFile(event.target.files?.[0])
							}),
							/* @__PURE__ */ jsx("div", {
								className: "min-w-0 flex-1",
								children: form.archivo ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
									className: "truncate font-medium",
									children: form.archivo.name
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: formatDocumentFileSize(form.archivo.size)
								})] }) : /* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "Sin archivo adjunto"
								})
							}),
							!isView && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								disabled: saving,
								onClick: () => fileInputRef.current?.click(),
								children: [
									/* @__PURE__ */ jsx(FileUp, {}),
									" ",
									form.archivo ? "Reemplazar archivo" : "Seleccionar archivo"
								]
							}), form.archivo && /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								disabled: saving,
								onClick: removeFile,
								className: "text-destructive",
								children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar archivo"]
							})] })
						]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/services/predioDocumentsService.ts
var store = /* @__PURE__ */ new Map();
var keyFor = ({ projectId, codigo, sectionId }) => `${projectId}:${codigo}:${sectionId}`;
var wait = (milliseconds = 450) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
async function listPredioDocuments(scope) {
	await wait(120);
	return [...store.get(keyFor(scope)) ?? []];
}
async function savePredioDocument(scope, record) {
	await wait();
	const key = keyFor(scope);
	const current = store.get(key) ?? [];
	if (current.find((item) => item.numeroDocumento.trim().toLowerCase() === record.numeroDocumento.trim().toLowerCase() && item.id !== record.id)) throw new Error("Ya existe un registro con el mismo número de documento en esta sección.");
	const saved = {
		...record,
		id: record.id || `document-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
	};
	const next = record.id ? current.map((item) => item.id === record.id ? saved : item) : [saved, ...current];
	store.set(key, next);
	return saved;
}
async function deletePredioDocument(scope, recordId) {
	await wait(300);
	const key = keyFor(scope);
	const current = store.get(key) ?? [];
	store.set(key, current.filter((item) => item.id !== recordId));
}
//#endregion
//#region src/components/PredioDocumentManager.tsx
var emptyRecords = () => DOCUMENT_SECTION_CONFIGS.reduce((result, config) => {
	result[config.id] = [];
	return result;
}, {});
/** Sección del registro del predio → documento del catálogo del expediente (las demás entran como libres). */
var CATALOGO_SECCION = {
	"titulos-archivados": "rr-titulos",
	"documentos-posesion": "diag-posesion"
};
function PredioDocumentManager({ projectId, codigo }) {
	const [recordsBySection, setRecordsBySection] = useState(emptyRecords);
	const registrarEnExpediente = useRegistroExpediente(projectId, codigo);
	const [openSections, setOpenSections] = useState(() => /* @__PURE__ */ new Set([DOCUMENT_SECTION_CONFIGS[0].id]));
	const [modal, setModal] = useState({
		open: false,
		mode: "create",
		config: null,
		record: null
	});
	const [deleteTarget, setDeleteTarget] = useState(null);
	useEffect(() => {
		let active = true;
		Promise.all(DOCUMENT_SECTION_CONFIGS.map(async (config) => {
			const records = await listPredioDocuments({
				projectId,
				codigo,
				sectionId: config.id
			});
			return [config.id, records];
		})).then((entries) => {
			if (!active) return;
			setRecordsBySection((current) => {
				const next = { ...current };
				entries.forEach(([sectionId, records]) => {
					next[sectionId] = records;
				});
				return next;
			});
		});
		return () => {
			active = false;
		};
	}, [projectId, codigo]);
	function toggleSection(sectionId) {
		setOpenSections((current) => {
			const next = new Set(current);
			if (next.has(sectionId)) next.delete(sectionId);
			else next.add(sectionId);
			return next;
		});
	}
	function openModal(config, mode, record = null) {
		setModal({
			open: true,
			config,
			mode,
			record
		});
	}
	function closeModal() {
		setModal((current) => ({
			...current,
			open: false
		}));
	}
	async function handleSave(record) {
		if (!modal.config) return;
		const config = modal.config;
		const saved = await savePredioDocument({
			projectId,
			codigo,
			sectionId: config.id
		}, record);
		if (record.archivo) registrarEnExpediente(record.archivo, {
			nombre: `${config.title}: ${record.tipoDocumento} ${record.numeroDocumento}`.trim(),
			catalogoId: CATALOGO_SECCION[config.id],
			numero: record.numeroDocumento,
			fecha: record.fechaDocumento,
			emisor: record.oficinaRegistral
		});
		setRecordsBySection((current) => ({
			...current,
			[config.id]: record.id ? current[config.id].map((item) => item.id === saved.id ? saved : item) : [saved, ...current[config.id]]
		}));
		closeModal();
		toast.success(record.id ? "Registro actualizado." : "Registro guardado.");
	}
	async function handleDelete() {
		const target = deleteTarget;
		if (!target) return;
		setDeleteTarget(null);
		try {
			await deletePredioDocument({
				projectId,
				codigo,
				sectionId: target.config.id
			}, target.record.id);
			setRecordsBySection((current) => ({
				...current,
				[target.config.id]: current[target.config.id].filter((item) => item.id !== target.record.id)
			}));
			toast.success("Registro eliminado.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "No se pudo eliminar el registro.");
		}
	}
	function handleDownload(record) {
		if (!record.archivo) return;
		const url = URL.createObjectURL(record.archivo);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = record.archivo.name;
		anchor.click();
		window.setTimeout(() => URL.revokeObjectURL(url), 0);
	}
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "space-y-3",
			children: DOCUMENT_SECTION_CONFIGS.map((config) => /* @__PURE__ */ jsx(DocumentSectionAccordion, {
				config,
				records: recordsBySection[config.id],
				open: openSections.has(config.id),
				onToggle: () => toggleSection(config.id),
				onNew: () => openModal(config, "create"),
				onView: (record) => openModal(config, "view", record),
				onEdit: (record) => openModal(config, "edit", record),
				onDownload: handleDownload,
				onDelete: (record) => setDeleteTarget({
					config,
					record
				})
			}, config.id))
		}),
		/* @__PURE__ */ jsx(PredioDocumentModal, {
			open: modal.open,
			mode: modal.mode,
			config: modal.config,
			record: modal.record,
			onClose: closeModal,
			onSave: handleSave
		}),
		/* @__PURE__ */ jsx(Confirmar, {
			abierto: Boolean(deleteTarget),
			onCerrar: () => setDeleteTarget(null),
			onConfirmar: () => void handleDelete(),
			titulo: "Eliminar registro",
			texto: `El registro seleccionado de "${deleteTarget?.config.title ?? ""}" se eliminará de forma permanente.`,
			accion: "Eliminar registro",
			destructiva: true
		})
	] });
}
//#endregion
//#region src/routes/proyectos.$projectId.predios.$codigo.identificacion-codificacion.tsx?tsr-split=component
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var VALIDACION_TONO = {
	PENDIENTE: "neutral",
	VALIDO: "success",
	OBSERVADO: "warning"
};
var LEGAL_OPTIONS = [
	"Decreto Legislativo Nro. 1192 y modificatorias",
	"Ley General de Expropiaciones aplicable al procedimiento predial",
	"Código Civil: derechos reales, posesión y propiedad",
	"Normativa catastral y registral aplicable",
	"Directivas internas de gestión predial del MTC"
];
var SERVIDUMBRE_OPTIONS = [
	"NINGUNO",
	"SERVIDUMBRE DE PASO",
	"SERVIDUMBRE DE AGUAS",
	"SERVIDUMBRE DE DESAGUE",
	"SERVIDUMBRES AERONAUTICAS",
	"SERVIDUMBRES DE CARRETERAS Y FERROCARRILES",
	"OTRA"
];
var FUENTE_CONDICION_OPTIONS = [
	"Padrón preliminar",
	"Partida registral",
	"Ficha catastral",
	"Declaración del sujeto pasivo",
	"Verificación de campo",
	"Verificación pendiente"
];
function currentMonth() {
	return String((/* @__PURE__ */ new Date()).getMonth() + 1).padStart(2, "0");
}
/** Nombres legibles de los campos de la ficha en el histórico. */
var ETIQUETAS_FICHA = {
	tipoPredio: "Tipo de predio",
	profesionalResponsable: "Profesional responsable",
	brigadaResponsable: "Brigada responsable",
	codigoPredio: "Código de predio",
	codigoExpediente: "Código de expediente",
	mesExpediente: "Mes del expediente",
	anioExpediente: "Año del expediente",
	validacionCodigo: "Validación del código",
	validacionExpediente: "Validación del expediente",
	condicionJuridicaPredio: "Condición jurídica",
	fuenteCondicionJuridica: "Fuente de la condición",
	titularidadEstatal: "Titularidad estatal",
	documentoSustentoCondicion: "Documento de sustento",
	requiereTransferenciaInterestatal: "Requiere transferencia interestatal",
	distrito: "Distrito",
	sector: "Sector",
	localidad: "Localidad",
	manzana: "Manzana",
	lote: "Lote",
	unidadCatastral: "Unidad catastral",
	tieneServidumbre: "Tiene servidumbre",
	tipoServidumbre: "Tipo de servidumbre",
	marcoLegal: "Marco legal",
	analisisLegal: "Análisis legal",
	observaciones: "Observaciones",
	fuenteLevantamiento: "Fuente del levantamiento",
	datum: "Datum",
	zonaUtm: "Zona UTM",
	areaLevantada: "Área levantada",
	perimetroLevantado: "Perímetro levantado",
	precision: "Precisión"
};
function IdentificacionCodificacionPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const center = getPredioCenter(decodedCodigo);
	const navigate = useNavigate();
	const registrado = registradoPorCodigo(decodedCodigo);
	const preliminar = registrado?.estadoRegistro === "PRELIMINAR";
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const initialCondicionJuridica = normalizeCondicionJuridica(predio?.condicionPredio);
	const [activeTab, setActiveTab] = useState("registro");
	const [message, setMessage] = useState(null);
	const [form, setForm] = useState({
		tipoPredio: normalizeTipoPredio(predio?.tipo || predio?.tp),
		profesionalResponsable: predio?.rtec || "",
		brigadaResponsable: proyecto?.coordinacionPredial || "Brigada predial",
		codigoPredio: preliminar ? "" : predio?.cod || decodedCodigo,
		codigoExpediente: predio?.exp || "",
		mesExpediente: currentMonth(),
		anioExpediente: String((/* @__PURE__ */ new Date()).getFullYear()),
		validacionCodigo: "PENDIENTE",
		validacionExpediente: "PENDIENTE",
		condicionJuridicaPredio: initialCondicionJuridica,
		fuenteCondicionJuridica: predio?.condicionPredio ? "Padrón preliminar" : "Verificación pendiente",
		titularidadEstatal: initialCondicionJuridica === "ESTATAL" ? "Entidad pública por verificar" : "",
		documentoSustentoCondicion: predio?.part || predio?.pind || "",
		requiereTransferenciaInterestatal: initialCondicionJuridica === "ESTATAL" ? "SI" : "NO",
		distrito: predio?.ciudad || "Jauja",
		sector: predio?.et || "",
		localidad: predio?.proyecto || "",
		manzana: "",
		lote: "",
		unidadCatastral: predio?.part || "",
		tieneServidumbre: "NO",
		tipoServidumbre: "NINGUNO",
		marcoLegal: [LEGAL_OPTIONS[0], LEGAL_OPTIONS[3]],
		analisisLegal: "De la revisión preliminar se identifica la necesidad de confirmar la condición del sujeto pasivo, la situación registral y la correspondencia entre el área levantada y la ocupación física del predio.",
		observaciones: "",
		fuenteLevantamiento: "Levantamiento topográfico preliminar",
		datum: "WGS84",
		zonaUtm: "19M",
		areaLevantada: predio?.m2 || predio?.area || "",
		perimetroLevantado: "",
		precision: "Preliminar"
	});
	const [vertices, setVertices] = useState(() => initialVertices(center));
	const [technicalFileName, setTechnicalFileName] = useState("");
	const [trace, setTrace] = useState([{
		id: "trace-inicial",
		fecha: fechaHora(/* @__PURE__ */ new Date()),
		usuario: "Sistema",
		actividad: "Actividad creada",
		estado: "BORRADOR",
		detalle: `Se inició la identificación y codificación del predio ${predio?.cod || decodedCodigo}.`
	}]);
	const registro = useCodigos();
	const [dialogo, setDialogo] = useState(null);
	const rol = useRol();
	const claveHistorial = `identificacion-${decodedCodigo}`;
	const versiones = useHistorial(claveHistorial);
	const cargadoDelHistorial = useRef(false);
	useEffect(() => {
		if (cargadoDelHistorial.current || versiones.length === 0) return;
		cargadoDelHistorial.current = true;
		setForm(versiones[0].registro);
	}, [versiones]);
	const guardarVersion = (registro, accion, objeto) => registrarVersion(claveHistorial, {
		accion,
		objeto,
		registro
	}, {
		modulo: 11,
		entidad: "identificacion_codificacion"
	});
	const cargadoDelRegistro = useRef(false);
	useEffect(() => {
		if (cargadoDelRegistro.current || registro.length === 0) return;
		cargadoDelRegistro.current = true;
		const p = codigoAsignado(registro, decodedCodigo, "predio");
		const e = codigoAsignado(registro, decodedCodigo, "expediente");
		if (p || e) setForm((c) => ({
			...c,
			...p ? {
				codigoPredio: p,
				validacionCodigo: "VALIDO"
			} : {},
			...e ? {
				codigoExpediente: e,
				validacionExpediente: "VALIDO"
			} : {}
		}));
	}, [registro, decodedCodigo]);
	const validationSummary = useMemo(() => validateCodigo(form.codigoPredio, decodedCodigo, registro), [
		form.codigoPredio,
		decodedCodigo,
		registro
	]);
	const expedienteValidationSummary = useMemo(() => validateExpediente(form.codigoExpediente, decodedCodigo, registro), [
		form.codigoExpediente,
		decodedCodigo,
		registro
	]);
	/** Código generado o vinculado desde un diálogo: entra al formulario ya validado. */
	function alAsignar(tipo, codigo, origen) {
		const verbo = origen === "generado" ? "generado" : "vinculado";
		if (tipo === "predio") setForm((c) => ({
			...c,
			codigoPredio: codigo,
			validacionCodigo: "VALIDO"
		}));
		else setForm((c) => ({
			...c,
			codigoExpediente: codigo,
			validacionExpediente: "VALIDO"
		}));
		addTrace(tipo === "predio" ? "Código de predio" : "Código de expediente", "VALIDO", `${codigo} ${verbo} y asignado al predio.`);
		setMessage({
			tipo: "exito",
			texto: `${tipo === "predio" ? "Código de predio" : "Expediente"} ${codigo} ${verbo} y asignado a este predio.`
		});
	}
	const estado = form.validacionCodigo === "VALIDO" && form.validacionExpediente === "VALIDO" ? {
		tono: "success",
		texto: "Códigos validados"
	} : form.validacionCodigo === "OBSERVADO" || form.validacionExpediente === "OBSERVADO" ? {
		tono: "warning",
		texto: "Observado"
	} : {
		tono: "neutral",
		texto: "Borrador"
	};
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function addTrace(actividad, estado, detalle) {
		setTrace((current) => [{
			id: `trace-${Date.now()}-${current.length}`,
			fecha: fechaHora(/* @__PURE__ */ new Date()),
			usuario: form.profesionalResponsable || "Usuario técnico",
			actividad,
			estado,
			detalle
		}, ...current]);
	}
	function handleValidateCode() {
		if (validationSummary.ok && validationSummary.registrar) asignarCodigo({
			codigo: form.codigoPredio,
			tipo: "predio",
			projectId,
			predio: decodedCodigo,
			origen: "Ficha del predio (digitado)"
		});
		const nextStatus = validationSummary.ok ? "VALIDO" : "OBSERVADO";
		setForm((current) => ({
			...current,
			validacionCodigo: nextStatus
		}));
		addTrace("Validación de código", nextStatus, validationSummary.message);
		setMessage({
			tipo: validationSummary.ok ? "exito" : "aviso",
			texto: validationSummary.message
		});
	}
	function handleValidateExpediente() {
		if (expedienteValidationSummary.ok && expedienteValidationSummary.registrar) asignarCodigo({
			codigo: form.codigoExpediente,
			tipo: "expediente",
			projectId,
			predio: decodedCodigo,
			origen: "Ficha del predio (digitado)"
		});
		const nextStatus = expedienteValidationSummary.ok ? "VALIDO" : "OBSERVADO";
		setForm((current) => ({
			...current,
			validacionExpediente: nextStatus
		}));
		addTrace("Validación de expediente", nextStatus, expedienteValidationSummary.message);
		setMessage({
			tipo: expedienteValidationSummary.ok ? "exito" : "aviso",
			texto: expedienteValidationSummary.message
		});
	}
	function toggleLegalOption(option) {
		setForm((current) => ({
			...current,
			marcoLegal: current.marcoLegal.includes(option) ? current.marcoLegal.filter((item) => item !== option) : [...current.marcoLegal, option]
		}));
	}
	function updateVertex(id, patch) {
		setVertices((current) => current.map((item) => item.id === id ? {
			...item,
			...patch
		} : item));
	}
	function addVertex() {
		const nextNumber = vertices.length + 1;
		setVertices((current) => [...current, {
			id: `v-${Date.now()}`,
			vertice: `P${nextNumber}`,
			lado: `P${nextNumber}-P${nextNumber + 1}`,
			distancia: "",
			este: "",
			norte: "",
			observacion: ""
		}]);
	}
	function removeVertex(id) {
		setVertices((current) => current.filter((item) => item.id !== id));
	}
	async function handleTechnicalFileUpload(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		try {
			const fileName = file.name;
			const extension = fileName.split(".").pop()?.toLowerCase();
			const result = extension === "csv" || extension === "txt" ? parseTechnicalTableCsv(await file.text(), fileName) : await parseTechnicalTableExcel(file);
			setVertices(result.rows);
			setTechnicalFileName(fileName);
			setForm((current) => ({
				...current,
				areaLevantada: result.area || current.areaLevantada,
				perimetroLevantado: result.perimeter || current.perimetroLevantado,
				fuenteLevantamiento: result.source || `Excel: ${fileName}`
			}));
			addTrace("Carga de datos técnicos", "BORRADOR", result.message);
			setMessage({
				tipo: "exito",
				texto: result.message
			});
		} catch (error) {
			setMessage({
				tipo: "error",
				texto: error instanceof Error ? error.message : "No se pudo leer el archivo de datos técnicos."
			});
		} finally {
			event.target.value = "";
		}
	}
	function handleSave(status) {
		if (!form.codigoPredio.trim() || !form.codigoExpediente.trim()) {
			setMessage({
				tipo: "error",
				texto: "Registre el código de predio y el código de expediente."
			});
			return;
		}
		if (status === "REGISTRADO" && form.validacionCodigo !== "VALIDO") {
			setMessage({
				tipo: "aviso",
				texto: "Valide el código del predio antes de registrar la actividad."
			});
			return;
		}
		if (status === "REGISTRADO" && form.validacionExpediente !== "VALIDO") {
			setMessage({
				tipo: "aviso",
				texto: "Valide el código de expediente antes de registrar la actividad."
			});
			return;
		}
		guardarVersion(form, status === "REGISTRADO" ? "Registró la identificación" : "Guardó borrador", `predio ${form.codigoPredio}, expediente ${form.codigoExpediente}`);
		if (status === "REGISTRADO" && registrado && preliminar && !esProvisional(form.codigoPredio)) {
			const nuevo = form.codigoPredio.trim().toUpperCase();
			codificarPredio(registrado.projectId, registrado.id, nuevo);
			toast.success(`Predio codificado: ${decodedCodigo} pasa a ${nuevo}.`);
			navigate({
				to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
				params: {
					projectId,
					codigo: nuevo
				},
				replace: true
			});
			return;
		}
		addTrace(status === "REGISTRADO" ? "Registro de identificación y codificación" : "Guardado de borrador", status, `Predio ${form.codigoPredio}, expediente ${form.codigoExpediente}, condición ${form.condicionJuridicaPredio}, periodo ${form.mesExpediente}/${form.anioExpediente}.`);
		setMessage({
			tipo: "exito",
			texto: status === "REGISTRADO" ? "Identificación, codificación y datos técnicos preliminares registrados." : "Borrador de la identificación guardado."
		});
	}
	const texto = (key) => (id) => /* @__PURE__ */ jsx("input", {
		id,
		className: controlClase,
		value: String(form[key]),
		onChange: (event) => setField(key, event.target.value)
	});
	const soloLectura = (valor) => (id) => /* @__PURE__ */ jsx("input", {
		id,
		className: `${controlClase} bg-muted`,
		value: valor,
		readOnly: true
	});
	const celda = (row, key, etiqueta) => /* @__PURE__ */ jsx("input", {
		"aria-label": `${etiqueta} del vértice ${row.vertice}`,
		className: controlClase,
		value: row[key],
		onChange: (event) => updateVertex(row.id, { [key]: event.target.value })
	});
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
				titulo: "Identificación y codificación del predio",
				icono: FileText,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: estado.tono,
					children: estado.texto
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "identificacion-codificacion-predio",
				projectId,
				codigo: decodedCodigo,
				extra: /* @__PURE__ */ jsx("span", { children: "Desde la identificación del inmueble corren 10 d.h. para comunicar a sujetos pasivos y ocupantes (art. 16.1)." })
			}),
			message && /* @__PURE__ */ jsxs("p", {
				role: message.tipo === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[message.tipo]}`,
				children: [
					message.tipo === "exito" ? /* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}) : /* @__PURE__ */ jsx(AlertCircle, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: message.texto
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMessage(null),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				value: activeTab,
				onValueChange: (value) => setActiveTab(value),
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "registro",
							children: [/* @__PURE__ */ jsx(FileText, {
								size: 16,
								"aria-hidden": true
							}), " Identificación y codificación"]
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
					/* @__PURE__ */ jsx(TabsContent, {
						value: "registro",
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: (event) => {
								event.preventDefault();
								handleSave("BORRADOR");
							},
							children: [
								preliminar && /* @__PURE__ */ jsxs(Aviso, {
									tipo: "aviso",
									children: [
										"Predio preliminar (",
										NOMBRE_ORIGEN[registrado.origen],
										") con código provisional",
										" ",
										decodedCodigo,
										". Genere o vincule el código oficial y el expediente, valide ambos y registre la actividad: el expediente continúa bajo el código oficial."
									]
								}),
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									brigada: form.brigadaResponsable
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Identificación plena y codificación",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Tipo de predio",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.tipoPredio,
												onChange: (event) => setField("tipoPredio", event.target.value),
												children: [/* @__PURE__ */ jsx("option", {
													value: "RURAL",
													children: "Rural"
												}), /* @__PURE__ */ jsx("option", {
													value: "URBANO",
													children: "Urbano"
												})]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Mes y año del expediente",
											obligatorio: true,
											children: /* @__PURE__ */ jsxs("div", {
												className: "grid grid-cols-2 gap-2",
												children: [/* @__PURE__ */ jsx("select", {
													"aria-label": "Mes del expediente",
													className: controlClase,
													value: form.mesExpediente,
													onChange: (event) => setField("mesExpediente", event.target.value),
													children: Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0")).map((month) => /* @__PURE__ */ jsx("option", {
														value: month,
														children: month
													}, month))
												}), /* @__PURE__ */ jsx("input", {
													"aria-label": "Año del expediente",
													inputMode: "numeric",
													className: controlClase,
													value: form.anioExpediente,
													onChange: (event) => setField("anioExpediente", event.target.value)
												})]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Código del predio",
											ancho: "doble",
											obligatorio: true,
											ayuda: validationSummary.message,
											children: (id) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ jsx("input", {
													id,
													className: `${controlClase} font-mono`,
													value: form.codigoPredio,
													onChange: (event) => setForm((current) => ({
														...current,
														codigoPredio: event.target.value.toUpperCase(),
														validacionCodigo: "PENDIENTE"
													})),
													required: true
												}), /* @__PURE__ */ jsxs(Button, {
													type: "button",
													variant: "outline",
													className: "shrink-0",
													onClick: handleValidateCode,
													children: [/* @__PURE__ */ jsx(SearchCheck, {}), " Validar código"]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "mt-2 flex flex-wrap gap-2",
												children: [/* @__PURE__ */ jsxs(Button, {
													type: "button",
													size: "sm",
													variant: "outline",
													onClick: () => setDialogo("generar-predio"),
													children: [/* @__PURE__ */ jsx(Plus, {}), " Generar código"]
												}), /* @__PURE__ */ jsxs(Button, {
													type: "button",
													size: "sm",
													variant: "outline",
													onClick: () => setDialogo("vincular-predio"),
													children: [/* @__PURE__ */ jsx(Link2, {}), " Vincular existente"]
												})]
											})] })
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Código de expediente",
											ancho: "doble",
											obligatorio: true,
											ayuda: expedienteValidationSummary.message,
											children: (id) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ jsx("input", {
													id,
													className: `${controlClase} font-mono`,
													placeholder: "0000-AAAA-MTC/DDP",
													value: form.codigoExpediente,
													onChange: (event) => setForm((current) => ({
														...current,
														codigoExpediente: event.target.value.toUpperCase(),
														validacionExpediente: "PENDIENTE"
													})),
													required: true
												}), /* @__PURE__ */ jsxs(Button, {
													type: "button",
													variant: "outline",
													className: "shrink-0",
													onClick: handleValidateExpediente,
													children: [/* @__PURE__ */ jsx(SearchCheck, {}), " Validar expediente"]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "mt-2 flex flex-wrap gap-2",
												children: [/* @__PURE__ */ jsxs(Button, {
													type: "button",
													size: "sm",
													variant: "outline",
													onClick: () => setDialogo("generar-expediente"),
													children: [/* @__PURE__ */ jsx(Plus, {}), " Generar expediente"]
												}), /* @__PURE__ */ jsxs(Button, {
													type: "button",
													size: "sm",
													variant: "outline",
													onClick: () => setDialogo("vincular-expediente"),
													children: [/* @__PURE__ */ jsx(Link2, {}), " Vincular existente"]
												})]
											})] })
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Estado del código de predio",
											children: /* @__PURE__ */ jsx("div", {
												className: "flex h-9 items-center",
												children: /* @__PURE__ */ jsx(StatusBadge, {
													tono: VALIDACION_TONO[form.validacionCodigo],
													children: form.validacionCodigo
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Estado del expediente",
											children: /* @__PURE__ */ jsx("div", {
												className: "flex h-9 items-center",
												children: /* @__PURE__ */ jsx(StatusBadge, {
													tono: VALIDACION_TONO[form.validacionExpediente],
													children: form.validacionExpediente
												})
											})
										})
									] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Identificación de la condición jurídica del predio",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Condición del predio",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.condicionJuridicaPredio,
												onChange: (event) => {
													const nextValue = event.target.value;
													setForm((current) => ({
														...current,
														condicionJuridicaPredio: nextValue,
														titularidadEstatal: nextValue === "PRIVADO" ? "" : current.titularidadEstatal,
														requiereTransferenciaInterestatal: nextValue === "ESTATAL" ? "SI" : "NO"
													}));
												},
												children: [/* @__PURE__ */ jsx("option", {
													value: "PRIVADO",
													children: "Privado"
												}), /* @__PURE__ */ jsx("option", {
													value: "ESTATAL",
													children: "Estatal"
												})]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fuente de identificación",
											children: (id) => /* @__PURE__ */ jsx("select", {
												id,
												className: controlClase,
												value: form.fuenteCondicionJuridica,
												onChange: (event) => setField("fuenteCondicionJuridica", event.target.value),
												children: FUENTE_CONDICION_OPTIONS.map((item) => /* @__PURE__ */ jsx("option", { children: item }, item))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Entidad titular",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.titularidadEstatal,
												onChange: (event) => setField("titularidadEstatal", event.target.value),
												placeholder: form.condicionJuridicaPredio === "ESTATAL" ? "Entidad pública titular o administradora" : "No aplica",
												disabled: form.condicionJuridicaPredio === "PRIVADO"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Documento de sustento",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.documentoSustentoCondicion,
												onChange: (event) => setField("documentoSustentoCondicion", event.target.value),
												placeholder: "Partida, ficha, informe o documento de verificación"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Transferencia interestatal",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.requiereTransferenciaInterestatal,
												onChange: (event) => setField("requiereTransferenciaInterestatal", event.target.value),
												disabled: form.condicionJuridicaPredio === "PRIVADO",
												children: [/* @__PURE__ */ jsx("option", {
													value: "NO",
													children: "No"
												}), /* @__PURE__ */ jsx("option", {
													value: "SI",
													children: "Sí"
												})]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Resumen de la condición",
											children: soloLectura(form.condicionJuridicaPredio === "ESTATAL" ? `Predio estatal${form.titularidadEstatal ? `: ${form.titularidadEstatal}` : ""}` : "Predio privado")
										})
									] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Datos de ubicación",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Distrito",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.distrito,
												onChange: (event) => setField("distrito", event.target.value),
												required: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Sector",
											children: texto("sector")
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Localidad",
											children: texto("localidad")
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Manzana",
											children: texto("manzana")
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Lote",
											children: texto("lote")
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Unidad catastral",
											children: texto("unidadCatastral")
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Tiene servidumbre",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.tieneServidumbre,
												onChange: (event) => setField("tieneServidumbre", event.target.value),
												children: [/* @__PURE__ */ jsx("option", {
													value: "NO",
													children: "No"
												}), /* @__PURE__ */ jsx("option", {
													value: "SI",
													children: "Sí"
												})]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Tipo de servidumbre",
											children: (id) => /* @__PURE__ */ jsx("select", {
												id,
												className: controlClase,
												value: form.tipoServidumbre,
												onChange: (event) => setField("tipoServidumbre", event.target.value),
												children: SERVIDUMBRE_OPTIONS.map((item) => /* @__PURE__ */ jsx("option", { children: item }, item))
											})
										})
									] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Marco legal, análisis y observaciones",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Marcos legales",
											ancho: "doble",
											children: /* @__PURE__ */ jsx("div", {
												role: "group",
												"aria-label": "Marcos legales",
												className: "grid gap-2 rounded-md border border-border p-3 lg:grid-cols-2",
												children: LEGAL_OPTIONS.map((option) => /* @__PURE__ */ jsxs("label", {
													className: "flex items-center gap-2 text-sm",
													children: [/* @__PURE__ */ jsx("input", {
														type: "checkbox",
														checked: form.marcoLegal.includes(option),
														onChange: () => toggleLegalOption(option),
														className: "size-4 accent-primary"
													}), option]
												}, option))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Análisis legal",
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 3,
												className: `${controlClase} h-auto py-2`,
												value: form.analisisLegal,
												onChange: (event) => setField("analisisLegal", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Observaciones",
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 3,
												className: `${controlClase} h-auto py-2`,
												value: form.observaciones,
												onChange: (event) => setField("observaciones", event.target.value)
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Datos técnicos preliminares del polígono",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fuente del levantamiento",
												children: texto("fuenteLevantamiento")
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Datum y zona UTM",
												children: /* @__PURE__ */ jsxs("div", {
													className: "grid grid-cols-2 gap-2",
													children: [/* @__PURE__ */ jsx("input", {
														"aria-label": "Datum",
														className: controlClase,
														value: form.datum,
														onChange: (event) => setField("datum", event.target.value)
													}), /* @__PURE__ */ jsx("input", {
														"aria-label": "Zona UTM",
														className: controlClase,
														value: form.zonaUtm,
														onChange: (event) => setField("zonaUtm", event.target.value)
													})]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Área levantada (m²)",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													inputMode: "decimal",
													className: controlClase,
													value: form.areaLevantada,
													onChange: (event) => setField("areaLevantada", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Perímetro (ml)",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													inputMode: "decimal",
													className: controlClase,
													value: form.perimetroLevantado,
													onChange: (event) => setField("perimetroLevantado", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Precisión",
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: form.precision,
													onChange: (event) => setField("precision", event.target.value),
													children: [
														/* @__PURE__ */ jsx("option", { children: "Preliminar" }),
														/* @__PURE__ */ jsx("option", { children: "Verificado en campo" }),
														/* @__PURE__ */ jsx("option", { children: "Observado" })
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Centro aproximado",
												children: soloLectura(center ? `${center[1].toFixed(6)}, ${center[0].toFixed(6)}` : "Sin coordenada")
											})
										] }),
										/* @__PURE__ */ jsx(Subtitulo, {
											acciones: /* @__PURE__ */ jsxs("div", {
												className: "flex flex-wrap gap-2",
												children: [/* @__PURE__ */ jsxs("label", {
													className: "inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent focus-within:ring-2 focus-within:ring-primary",
													children: [
														/* @__PURE__ */ jsx(Upload, {
															size: 16,
															"aria-hidden": true
														}),
														" Subir cuadro técnico",
														/* @__PURE__ */ jsx("input", {
															type: "file",
															accept: ".xlsx,.csv,.txt",
															className: "sr-only",
															onChange: handleTechnicalFileUpload
														})
													]
												}), /* @__PURE__ */ jsxs(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: addVertex,
													children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar vértice"]
												})]
											}),
											children: "Cuadro técnico de vértices"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mb-2 text-xs text-muted-foreground",
											children: technicalFileName ? `Archivo cargado: ${technicalFileName}` : "Seleccione un Excel (.xlsx) o CSV con vértices, lados, distancias y coordenadas, o edite la tabla a mano."
										}),
										/* @__PURE__ */ jsx(Tabla, {
											columnas: [
												{
													clave: "vertice",
													titulo: "Vértice",
													ancho: "110px",
													render: (r) => celda(r, "vertice", "Nombre")
												},
												{
													clave: "lado",
													titulo: "Lado",
													ancho: "120px",
													render: (r) => celda(r, "lado", "Lado")
												},
												{
													clave: "distancia",
													titulo: "Distancia (ml)",
													ancho: "130px",
													render: (r) => celda(r, "distancia", "Distancia")
												},
												{
													clave: "este",
													titulo: "Este",
													render: (r) => celda(r, "este", "Este")
												},
												{
													clave: "norte",
													titulo: "Norte",
													render: (r) => celda(r, "norte", "Norte")
												},
												{
													clave: "observacion",
													titulo: "Observación",
													render: (r) => celda(r, "observacion", "Observación")
												},
												{
													clave: "acciones",
													titulo: "Acciones",
													alinear: "derecha",
													ancho: "80px",
													render: (r) => /* @__PURE__ */ jsx(Button, {
														type: "button",
														variant: "ghost",
														size: "icon",
														className: "size-8 text-destructive",
														title: "Quitar vértice",
														"aria-label": `Quitar vértice ${r.vertice}`,
														onClick: () => removeVertex(r.id),
														children: /* @__PURE__ */ jsx(Trash2, {})
													})
												}
											],
											filas: vertices,
											claveFila: (r) => r.id,
											vacio: "Sin vértices. Suba un cuadro técnico o agregue vértices a mano."
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos · documentación legal y registral",
									className: "mt-4",
									children: /* @__PURE__ */ jsx(PredioDocumentManager, {
										projectId,
										codigo: predio?.cod || decodedCodigo
									})
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: () => window.history.back(),
										children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "submit",
										variant: "outline",
										children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										onClick: () => handleSave("REGISTRADO"),
										children: [/* @__PURE__ */ jsx(Send, {}), " Registrar identificación"]
									})
								] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsxs(Section, {
							titulo: "Histórico de identificación y codificación",
							children: [
								/* @__PURE__ */ jsx(Historico, {
									registro: claveHistorial,
									etiquetas: ETIQUETAS_FICHA,
									nombreArchivo: `historico-identificacion-${decodedCodigo}`,
									puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
									onRestaurar: (r, n) => {
										setForm(r);
										guardarVersion(r, "Restauró una versión anterior", `versión ${n}`);
										setMessage({
											tipo: "exito",
											texto: `Se restauró la versión ${n}.`
										});
									}
								}),
								/* @__PURE__ */ jsx(Subtitulo, { children: "Actividad de esta sesión" }),
								/* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "fecha",
											titulo: "Fecha",
											ancho: "150px",
											render: (r) => /* @__PURE__ */ jsx("span", {
												className: "whitespace-nowrap tabular-nums",
												children: r.fecha
											})
										},
										{
											clave: "usuario",
											titulo: "Usuario"
										},
										{
											clave: "actividad",
											titulo: "Actividad",
											render: (r) => /* @__PURE__ */ jsx("span", {
												className: "font-medium",
												children: r.actividad
											})
										},
										{
											clave: "estado",
											titulo: "Estado",
											render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
												tono: r.estado === "VALIDO" || r.estado === "REGISTRADO" ? "success" : r.estado === "OBSERVADO" ? "warning" : "primary",
												children: r.estado
											})
										},
										{
											clave: "detalle",
											titulo: "Detalle"
										}
									],
									filas: trace,
									claveFila: (r) => r.id
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx(GenerarCodigoPredio, {
				abierto: dialogo === "generar-predio",
				onCerrar: () => setDialogo(null),
				projectId,
				predio: decodedCodigo,
				codigoActual: form.codigoPredio,
				condicion: form.condicionJuridicaPredio,
				alAsignar: (c, o) => alAsignar("predio", c, o)
			}, dialogo === "generar-predio" ? "gp-abierto" : "gp"),
			/* @__PURE__ */ jsx(GenerarExpediente, {
				abierto: dialogo === "generar-expediente",
				onCerrar: () => setDialogo(null),
				projectId,
				predio: decodedCodigo,
				anio: form.anioExpediente,
				alAsignar: (c, o) => alAsignar("expediente", c, o)
			}),
			(dialogo === "vincular-predio" || dialogo === "vincular-expediente") && /* @__PURE__ */ jsx(VincularCodigo, {
				abierto: true,
				onCerrar: () => setDialogo(null),
				projectId,
				predio: decodedCodigo,
				tipo: dialogo === "vincular-predio" ? "predio" : "expediente",
				alAsignar: (c, o) => alAsignar(dialogo === "vincular-predio" ? "predio" : "expediente", c, o)
			})
		]
	});
}
function normalizeTipoPredio(value) {
	return String(value ?? "").toUpperCase().includes("URB") ? "URBANO" : "RURAL";
}
function normalizeCondicionJuridica(value) {
	return String(value ?? "").trim().toUpperCase().includes("ESTATAL") ? "ESTATAL" : "PRIVADO";
}
function parseTechnicalTableCsv(text, fileName) {
	const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
	if (lines.length < 2) throw new Error("El archivo debe incluir una cabecera y al menos una fila de vértices.");
	const delimiter = detectDelimiter(lines[0]);
	const headers = splitDelimitedLine(lines[0], delimiter).map(normalizeHeader);
	return technicalImportFromRecords(lines.slice(1).map((line) => {
		const values = splitDelimitedLine(line, delimiter);
		return headers.reduce((record, header, index) => {
			record[header] = values[index] ?? "";
			return record;
		}, {});
	}), fileName);
}
async function parseTechnicalTableExcel(file) {
	const { readSheet } = await import("read-excel-file/browser");
	const sheetRows = await readSheet(file);
	if (sheetRows.length < 2) throw new Error("La primera hoja del Excel debe incluir una cabecera y al menos una fila de vértices.");
	const headers = sheetRows[0].map((header) => normalizeHeader(String(header ?? "")));
	return technicalImportFromRecords(sheetRows.slice(1).map((row) => headers.reduce((record, header, index) => {
		record[header] = String(row[index] ?? "").trim();
		return record;
	}, {})), file.name);
}
function technicalImportFromRecords(rows, fileName) {
	const importedRows = rows.map((record, index) => ({
		id: `imp-${Date.now()}-${index}`,
		vertice: valueFrom(record, [
			"vertice",
			"punto",
			"p"
		]) || `P${index + 1}`,
		lado: valueFrom(record, ["lado", "tramo"]) || `P${index + 1}-P${index + 2}`,
		distancia: valueFrom(record, [
			"distancia",
			"distancia ml",
			"distancia m",
			"dist"
		]),
		este: valueFrom(record, [
			"este",
			"este x",
			"x",
			"coord este",
			"coordenada este"
		]),
		norte: valueFrom(record, [
			"norte",
			"norte y",
			"y",
			"coord norte",
			"coordenada norte"
		]),
		observacion: valueFrom(record, ["observacion", "obs"])
	})).filter((row) => row.vertice || row.este || row.norte || row.distancia);
	if (!importedRows.length) throw new Error("No se encontraron vértices válidos en el archivo seleccionado.");
	const firstRecord = rows[0] || {};
	return {
		rows: importedRows,
		area: valueFrom(firstRecord, [
			"area",
			"area levantada",
			"area m2",
			"area_m2"
		]),
		perimeter: valueFrom(firstRecord, [
			"perimetro",
			"perimetro ml",
			"perimetro_m",
			"perimetro ml"
		]),
		source: `Excel/CSV: ${fileName}`,
		message: `Se cargaron ${importedRows.length} vértices desde ${fileName}.`
	};
}
function detectDelimiter(headerLine) {
	const tabCount = (headerLine.match(/\t/g) || []).length;
	const semicolonCount = (headerLine.match(/;/g) || []).length;
	const commaCount = (headerLine.match(/,/g) || []).length;
	if (tabCount > 0) return "	";
	return semicolonCount >= commaCount ? ";" : ",";
}
function splitDelimitedLine(line, delimiter) {
	const values = [];
	let current = "";
	let inQuotes = false;
	for (let index = 0; index < line.length; index += 1) {
		const char = line[index];
		if (char === "\"") {
			inQuotes = !inQuotes;
			continue;
		}
		if (char === delimiter && !inQuotes) {
			values.push(current.trim());
			current = "";
			continue;
		}
		current += char;
	}
	values.push(current.trim());
	return values.map((value) => value.replace(/^"|"$/g, ""));
}
function normalizeHeader(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
}
function valueFrom(record, aliases) {
	for (const alias of aliases) {
		const value = record[normalizeHeader(alias)];
		if (value) return value;
	}
	return "";
}
/**
* Código de predio: no puede estar asignado a otro predio; vale el del padrón para este predio, el asignado
* en el registro, o uno digitado con el formato largo (al validarlo queda asignado).
*/
function validateCodigo(codigoPredio, originalCodigo, registro) {
	const c = codigoPredio.trim().toUpperCase();
	if (!c) return {
		ok: false,
		message: "El código de predio está vacío. Genérelo o vincule uno existente."
	};
	const otro = usadoPorOtro(registro, c, "predio", originalCodigo);
	if (otro) return {
		ok: false,
		message: `El código ya está asignado al predio ${otro}.`
	};
	const padron = getPredioByCodigo(originalCodigo)?.cod.toUpperCase();
	if (c === originalCodigo.toUpperCase() || c === padron) return {
		ok: true,
		message: "Código del padrón para este predio."
	};
	if (codigoAsignado(registro, originalCodigo, "predio") === c) return {
		ok: true,
		message: "Código asignado a este predio en el registro de codificación."
	};
	if (!partesDeCodigo(c)) return {
		ok: false,
		message: "No sigue el formato INFRA-PROYECTO-SECTOR-UBIGEO-PR/PU-NNNNN. Use «Generar código» o «Vincular existente»."
	};
	return {
		ok: true,
		registrar: true,
		message: "Formato correcto y sin uso en otro predio: al validarlo queda asignado a este predio."
	};
}
/** Expediente: formato NNNN-AAAA-MTC/DDP y no asignado a otro predio. */
function validateExpediente(codigoExpediente, originalCodigo, registro) {
	const c = normalizarExpediente(codigoExpediente);
	if (!c) return {
		ok: false,
		message: "El expediente está vacío. Genérelo o vincule uno existente."
	};
	if (!expedienteValido(c)) return {
		ok: false,
		message: "Formato esperado: NNNN-AAAA-MTC/DDP, por ejemplo 1539-2023-MTC/DDP."
	};
	const otro = usadoPorOtro(registro, c, "expediente", originalCodigo);
	if (otro) return {
		ok: false,
		message: `El expediente ya está asociado al predio ${otro}.`
	};
	if (c === getPredioByCodigo(originalCodigo)?.exp) return {
		ok: true,
		message: "Expediente del padrón para este predio."
	};
	if (codigoAsignado(registro, originalCodigo, "expediente") === c) return {
		ok: true,
		message: "Expediente asignado a este predio en el registro de codificación."
	};
	return {
		ok: true,
		registrar: true,
		message: "Formato correcto y sin uso en otro predio: al validarlo queda asignado a este predio."
	};
}
function initialVertices(center) {
	const baseEste = center ? Math.round((center[0] + 180) * 1e3) : 383267;
	const baseNorte = center ? Math.round((center[1] + 90) * 1e5) : 9598499;
	return [
		{
			id: "v-1",
			vertice: "P1",
			lado: "P1-P2",
			distancia: "",
			este: String(baseEste),
			norte: String(baseNorte),
			observacion: "Dato preliminar"
		},
		{
			id: "v-2",
			vertice: "P2",
			lado: "P2-P3",
			distancia: "",
			este: "",
			norte: "",
			observacion: ""
		},
		{
			id: "v-3",
			vertice: "P3",
			lado: "P3-P4",
			distancia: "",
			este: "",
			norte: "",
			observacion: ""
		},
		{
			id: "v-4",
			vertice: "P4",
			lado: "P4-P1",
			distancia: "",
			este: "",
			norte: "",
			observacion: ""
		}
	];
}
//#endregion
export { IdentificacionCodificacionPage as component };
