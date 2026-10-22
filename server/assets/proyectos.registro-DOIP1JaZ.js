import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { t as CAPAS_OBLIGATORIAS } from "./capas-B7cJ7zRJ.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as Route$1 } from "./proyectos.registro-CeZ5611-.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { n as generarCapasObligatorias, r as poligonosStd, t as documentosStd } from "./registroProyecto-D7FBQbZo.js";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Building2, CalendarDays, ExternalLink, FileText, History, Paperclip, Save, Send, Trash2, Upload, UserPlus, Waypoints } from "lucide-react";
//#region src/routes/proyectos.registro.tsx?tsr-split=component
/** Enlace a la Mesa de Partes del MTC para responder el trámite (STD). Dirección de demostración. */
var urlStd = (hr) => `https://std.mtc.gob.pe/expediente?hr=${encodeURIComponent(hr)}`;
var PROYECTOS_MOCK = [{
	id: "caballococha",
	codigo: "PRY-011",
	nombre: "Aeropuerto de Caballococha",
	descripcion: "Proyecto aeroportuario regional en frontera amazónica.",
	naturaleza: "AEROPUERTO",
	modalidad: "no-concesionado",
	tipoRegistro: "gestion",
	subEscenario: "cero",
	docOrigenTipo: "Memorando",
	docOrigenNumero: "MEMO-238-2025-MTC/DGAC",
	docOrigenFecha: "2025-03-12",
	hojaRuta: "E-025834-2025",
	solicitante: "DINTRA",
	coordinacionGeneral: "Coordinación General de Aeropuertos",
	coordinacionPredial: "Coordinación Predial Aeropuertos 03",
	coordinadorPredial: "Marcos Armando Soto Luis",
	liderInterferencias: "Joel Jhonny Lázaro Anaya",
	departamento: "Loreto",
	provincia: "Mariscal Ramón Castilla",
	distrito: "Caballococha",
	referencia: "Margen derecha del río Amazonas",
	fechaInicio: "2025-03-15",
	fechaFinPrevista: "2026-12-30",
	estado: "Registrado",
	responsables: [{
		id: "r1",
		nombre: "Diana Flores",
		rol: "Coordinadora DDP",
		area: "Técnica"
	}, {
		id: "r2",
		nombre: "Luis Quispe",
		rol: "Profesional Legal",
		area: "Legal"
	}],
	adjuntos: [{
		id: "a1",
		nombre: "MEMO-238-2025.pdf",
		tipo: "PDF",
		tamano: "812 KB"
	}],
	poligonos: [],
	capasObligatorias: {
		DELIMITACION: "std:propio",
		CONCESION: "std:propio"
	},
	observaciones: "Proyecto iniciado por requerimiento de la DGAC.",
	trazabilidad: [{
		id: "e1",
		fecha: "2025-03-15 09:12",
		usuario: "Diana Flores",
		accion: "Creación",
		detalle: "Registro inicial del proyecto."
	}, {
		id: "e2",
		fecha: "2025-03-16 11:40",
		usuario: "Luis Quispe",
		accion: "Asignación",
		detalle: "Se asignó equipo legal y técnico."
	}]
}];
var NATURALEZAS = [
	{
		value: "CARRETERA",
		label: "Carretera"
	},
	{
		value: "PUENTE",
		label: "Puente"
	},
	{
		value: "AEROPUERTO",
		label: "Aeropuerto"
	},
	{
		value: "PUERTO",
		label: "Puerto"
	},
	{
		value: "FERROCARRIL",
		label: "Ferrocarril"
	},
	{
		value: "LÍNEA DE TRANSMISIÓN",
		label: "Línea de transmisión"
	},
	{
		value: "HIDROELÉCTRICA",
		label: "Hidroeléctrica"
	},
	{
		value: "SANEAMIENTO",
		label: "Saneamiento"
	},
	{
		value: "OTROS",
		label: "Otros"
	}
];
var DEPARTAMENTOS = [
	"AMAZONAS",
	"ANCASH",
	"APURIMAC",
	"AREQUIPA",
	"AYACUCHO",
	"CAJAMARCA",
	"CALLAO",
	"CUSCO",
	"HUANCAVELICA",
	"HUANUCO",
	"ICA",
	"JUNIN",
	"LA LIBERTAD",
	"LAMBAYEQUE",
	"LIMA",
	"LORETO",
	"MADRE DE DIOS",
	"MOQUEGUA",
	"PASCO",
	"PIURA",
	"PUNO",
	"SAN MARTIN",
	"TACNA",
	"TUMBES",
	"UCAYALI"
];
var TIPOS_DOC_ORIGEN = [
	"Memorando",
	"Oficio",
	"Informe",
	"Resolución",
	"Carta",
	"Acta",
	"Otro"
];
var CARGOS = [
	"COORDINADOR",
	"ESPECIALISTA LEGAL",
	"ESPECIALISTA TÉCNICO",
	"TASADOR",
	"TOPÓGRAFO",
	"ASISTENTE SOCIAL",
	"ASISTENTE TÉCNICO",
	"ASISTENTE LEGAL",
	"JEFE DE PROYECTO",
	"GERENTE"
];
var AREAS = [
	"Técnica",
	"Legal",
	"Administrativa",
	"Predial",
	"Social",
	"Topografía",
	"Tasación"
];
var COORDINACIONES_GENERALES = [
	"Coordinación General de Aeropuertos",
	"Coordinación General Vial 1",
	"Coordinación General Vial 2",
	"Coordinación General Vial 3",
	"Coordinación General de Proyectos Viales y Especiales"
];
var COORDINACIONES_PREDIALES = [
	"Coordinación Predial Aeropuertos 01",
	"Coordinación Predial Aeropuertos 02",
	"Coordinación Predial Aeropuertos 03",
	"Coordinación Predial Autopista del Sol",
	"Coordinación Predial Red Vial 4",
	"Coordinación Predial Red Vial 5",
	"Coordinación Predial Red Vial 6",
	"Coordinación Predial Longitudinal de la Sierra Tramo 2",
	"Coordinación Predial Longitudinal de la Sierra Tramo 4",
	"Coordinación de Multiproyectos Viales 1",
	"Coordinación de Multiproyectos Viales 2",
	"Coordinación de Multiproyectos Viales 3",
	"Coordinación de Multiproyectos Especiales"
];
var COORDINADORES_PREDIALES = [
	"Gilbert Manuel Aguirre Gómez",
	"Marcos Armando Soto Luis",
	"Marlon Napravnick Noriega",
	"Raquel Antuanet Huapaya Porras",
	"Rafael Palomino Rojas",
	"Paul Alexander Orosco Jiménez",
	"Freddy Justo Rojas Meza",
	"Nelson Efraín Gutiérrez Minchola",
	"Wenne Esteisy Jesús Loza",
	"José César Mendoza Soto"
];
var LIDERES_INTERFERENCIAS = [
	"Joel Jhonny Lázaro Anaya",
	"Jhony Elguera Rivas",
	"Marvin Antonio Mosquera Pérez",
	"María Cecilia Chil Chang",
	"Cristina Modesta Pancorbo Sayas",
	"Ángel Enrique Reyes Cruz",
	"Por designar"
];
var TIPOS_REGISTRO = [
	{
		value: "tdr",
		label: "Generación de TDR",
		descripcion: "Elaborar, registrar y gestionar Términos de Referencia para contratación de servicios técnicos, legales o especializados."
	},
	{
		value: "opinion",
		label: "Opinión técnica",
		descripcion: "Evaluar viabilidad, consistencia o suficiencia de documentación técnica, legal o predial del proyecto."
	},
	{
		value: "gestion",
		label: "Gestión predial",
		descripcion: "Inicio, continuidad o culminación de acciones de gestión predial (DTL o transferencia)."
	}
];
var ESTADO_TONO = {
	Borrador: "neutral",
	Registrado: "primary",
	"En revisión": "warning",
	Aprobado: "success"
};
var ETIQUETAS = {
	codigo: "Código",
	nombre: "Nombre del proyecto",
	descripcion: "Descripción",
	naturaleza: "Naturaleza",
	modalidad: "Modalidad",
	tipoRegistro: "Tipo de registro",
	subEscenario: "Escenario",
	docOrigenTipo: "Tipo de documento de origen",
	docOrigenNumero: "Número de documento",
	docOrigenFecha: "Fecha del documento",
	hojaRuta: "Hoja de ruta (Mesa de Partes)",
	solicitante: "Solicitante",
	coordinacionGeneral: "Coordinación general",
	coordinacionPredial: "Coordinación predial",
	coordinadorPredial: "Coordinador predial",
	liderInterferencias: "Líder de interferencias",
	departamento: "Departamento",
	provincia: "Provincia",
	distrito: "Distrito",
	referencia: "Referencia",
	fechaInicio: "Fecha de inicio",
	fechaFinPrevista: "Fecha de fin prevista",
	estado: "Estado",
	responsables: "Responsable",
	adjuntos: "Documento adjunto",
	poligonos: "Polígono de la obra",
	capasObligatorias: "Capa obligatoria",
	observaciones: "Observaciones",
	rol: "Rol",
	area: "Área",
	tipo: "Tipo",
	tamano: "Tamaño"
};
var sinTrazabilidad = ({ trazabilidad: _traza, ...resto }) => resto;
function vacio() {
	return {
		id: "",
		codigo: `PRY-${String(Math.floor(Math.random() * 900) + 100)}`,
		nombre: "",
		descripcion: "",
		naturaleza: "CARRETERA",
		modalidad: "no-concesionado",
		tipoRegistro: "gestion",
		subEscenario: "cero",
		docOrigenTipo: "Memorando",
		docOrigenNumero: "",
		docOrigenFecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		hojaRuta: "",
		solicitante: "",
		coordinacionGeneral: "",
		coordinacionPredial: "",
		coordinadorPredial: "",
		liderInterferencias: "",
		departamento: "",
		provincia: "",
		distrito: "",
		referencia: "",
		fechaInicio: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		fechaFinPrevista: "",
		estado: "Borrador",
		responsables: [],
		adjuntos: [],
		poligonos: [],
		capasObligatorias: {},
		observaciones: "",
		trazabilidad: [{
			id: "e0",
			fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
			usuario: "Usuario actual",
			accion: "Creación",
			detalle: "Inicio del registro del proyecto."
		}]
	};
}
function RegistroProyectoPage() {
	const { id } = Route$1.useSearch();
	const navigate = useNavigate();
	const editing = Boolean(id);
	const initial = useMemo(() => {
		if (id) {
			const found = PROYECTOS_MOCK.find((p) => p.id === id);
			if (found) return structuredClone(found);
		}
		return vacio();
	}, [id]);
	const [data, setData] = useState(initial);
	const [vista, setVista] = useState("formulario");
	const rol = useRol();
	const historial = useFormularioConHistorial(`registro-proyecto-${id ?? initial.codigo}`, sinTrazabilidad(data), (r) => setData((d) => ({
		...r,
		trazabilidad: d.trazabilidad
	})), {
		modulo: 10,
		entidad: "proyecto"
	});
	const update = (k, v) => setData((d) => ({
		...d,
		[k]: v
	}));
	const addEvento = (accion, detalle) => {
		const e = {
			id: `e${Date.now()}`,
			fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " "),
			usuario: "Usuario actual",
			accion,
			detalle
		};
		setData((d) => ({
			...d,
			trazabilidad: [...d.trazabilidad, e]
		}));
	};
	const [faltanCapas, setFaltanCapas] = useState([]);
	const capasQueFaltan = () => CAPAS_OBLIGATORIAS.filter((o) => !data.capasObligatorias[o.clave]).map((o) => o.nombre);
	/** Al registrar, cada capa obligatoria entra a la base gráfica como capa base en borrador. */
	const registrarCapasObligatorias = () => generarCapasObligatorias(data.id || data.codigo.toLowerCase(), data, data.nombre || data.codigo);
	const guardar = (siguienteEstado) => {
		if (siguienteEstado) {
			const faltan = capasQueFaltan();
			setFaltanCapas(faltan);
			if (faltan.length) return false;
			registrarCapasObligatorias();
		}
		historial.guardarVersion(siguienteEstado ? editing ? "Guardó el proyecto" : "Registró el proyecto" : editing ? "Guardó cambios del proyecto" : "Guardó borrador del proyecto", data.nombre ? `${data.nombre} (${data.codigo})` : data.codigo, void 0, {
			...sinTrazabilidad(data),
			...siguienteEstado ? { estado: siguienteEstado } : {}
		});
		if (siguienteEstado) {
			addEvento("Cambio de estado", `Estado actualizado a "${siguienteEstado}".`);
			setData((d) => ({
				...d,
				estado: siguienteEstado
			}));
		} else addEvento("Guardado", editing ? "Edición guardada." : "Borrador guardado.");
		return true;
	};
	const sinDato = "Sin registrar";
	return /* @__PURE__ */ jsxs(AppShell, { children: [/* @__PURE__ */ jsx(PageHeader, {
		icono: Building2,
		titulo: editing ? "Editar proyecto" : "Registro de proyecto",
		descripcion: "Establezca un entorno de trabajo trazable, articulado y ordenado para el proyecto predial.",
		migas: [{
			texto: "Proyectos",
			to: "/proyectos"
		}, { texto: editing ? `Editar ${data.codigo}` : "Nuevo proyecto" }],
		acciones: /* @__PURE__ */ jsx(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/proyectos",
				children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Volver a proyectos"]
			})
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]",
		children: [/* @__PURE__ */ jsxs(Tabs, {
			value: vista,
			onValueChange: (v) => setVista(v),
			children: [
				/* @__PURE__ */ jsxs(TabsList, { children: [
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "formulario",
						children: [/* @__PURE__ */ jsx(FileText, {
							size: 16,
							className: "mr-1.5",
							"aria-hidden": true
						}), " Formulario"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "trazabilidad",
						children: [/* @__PURE__ */ jsx(FileText, {
							size: 16,
							className: "mr-1.5",
							"aria-hidden": true
						}), " Actividad de la sesión"]
					}),
					/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "historico",
						children: [
							/* @__PURE__ */ jsx(History, {
								size: 16,
								className: "mr-1.5",
								"aria-hidden": true
							}),
							" Histórico (",
							historial.versiones.length,
							")"
						]
					})
				] }),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "formulario",
					children: /* @__PURE__ */ jsxs("form", {
						className: "space-y-4",
						onSubmit: (e) => e.preventDefault(),
						children: [
							/* @__PURE__ */ jsx(FormGeneral, {
								data,
								update,
								setData
							}),
							/* @__PURE__ */ jsx(FormAlcance, {
								data,
								update
							}),
							/* @__PURE__ */ jsx(FormFlujo, {
								data,
								update
							}),
							/* @__PURE__ */ jsx(FormUbicacion, {
								data,
								update
							}),
							/* @__PURE__ */ jsx(FormResponsables, {
								data,
								setData,
								addEvento
							}),
							/* @__PURE__ */ jsx(FormDocumentos, {
								data,
								setData,
								addEvento
							}),
							/* @__PURE__ */ jsx(FormCapasObligatorias, {
								data,
								setData
							}),
							faltanCapas.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "mt-4",
								children: /* @__PURE__ */ jsxs(Aviso, {
									tipo: "error",
									onCerrar: () => setFaltanCapas([]),
									children: [
										"No se puede registrar el proyecto sin sus capas obligatorias:",
										" ",
										faltanCapas.join(" y "),
										". Impórtelas de la solicitud (hoja de ruta) o cargue el archivo del polígono."
									]
								})
							}),
							/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => guardar(),
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								onClick: () => {
									if (guardar("Registrado")) setTimeout(() => navigate({ to: "/proyectos" }), 300);
								},
								children: [
									/* @__PURE__ */ jsx(Send, {}),
									" ",
									editing ? "Guardar proyecto" : "Registrar proyecto"
								]
							})] })
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "trazabilidad",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Actividad de esta sesión",
						children: /* @__PURE__ */ jsx(Trazabilidad, { eventos: data.trazabilidad })
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico del proyecto",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `registro-proyecto-${id ?? initial.codigo}`,
							etiquetas: ETIQUETAS,
							nombreArchivo: `historico-proyecto-${id ?? initial.codigo}`,
							puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
							onRestaurar: historial.restaurar
						})
					})
				})
			]
		}), /* @__PURE__ */ jsxs(Section, {
			titulo: "Resumen",
			className: "self-start xl:sticky xl:top-[4.5rem]",
			children: [/* @__PURE__ */ jsxs("dl", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Código",
						value: data.codigo
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Nombre",
						value: data.nombre || sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Naturaleza",
						value: NATURALEZAS.find((n) => n.value === data.naturaleza)?.label ?? sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Modalidad",
						value: data.modalidad === "concesionado" ? "Concesionado" : "No concesionado"
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Tipo de registro",
						value: TIPOS_REGISTRO.find((t) => t.value === data.tipoRegistro)?.label ?? sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Solicitante",
						value: data.solicitante || sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Coordinación general",
						value: data.coordinacionGeneral || sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Coordinación predial",
						value: data.coordinacionPredial || sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Coordinador",
						value: data.coordinadorPredial || sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Líder de interferencias",
						value: data.liderInterferencias || sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Ubicación",
						value: [
							data.departamento,
							data.provincia,
							data.distrito
						].filter(Boolean).join(" · ") || sinDato
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Responsables",
						value: String(data.responsables.length)
					}),
					/* @__PURE__ */ jsx(ResumenItem, {
						label: "Adjuntos",
						value: String(data.adjuntos.length)
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-3 border-t border-border pt-3",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: "Estado"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-1",
					children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: ESTADO_TONO[data.estado],
						children: data.estado
					})
				})]
			})]
		})]
	})] });
}
function ResumenItem({ label, value }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
		className: "text-xs text-muted-foreground",
		children: label
	}), /* @__PURE__ */ jsx("dd", {
		className: "truncate text-sm font-medium",
		title: value,
		children: value
	})] });
}
/** Áreas del MTC que solicitan la gestión predial (pedido del usuario, 2026-10-21). */
var AREAS_SOLICITANTES = ["DINTRA", "DGIS"];
function FormGeneral({ data, update, setData }) {
	const [verHr, setVerHr] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Section, {
		titulo: "Solicitud de la Mesa de Partes",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "El registro nace de la solicitud que llega por el STD: busque la hoja de ruta, revise la solicitud e importe el documento de origen, sus adjuntos y los polígonos de la obra."
			}),
			/* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Hoja de ruta",
				obligatorio: true,
				ancho: "doble",
				ayuda: "Código del trámite en el Sistema de Trámite Documentario del MTC. Consulta simulada de interoperabilidad.",
				children: (id) => /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ jsx("input", {
							id,
							className: `${controlClase} font-mono`,
							value: data.hojaRuta,
							onChange: (e) => update("hojaRuta", e.target.value.toUpperCase()),
							placeholder: "Ej. E-025834-2025"
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							disabled: !data.hojaRuta.trim(),
							onClick: () => setVerHr(true),
							children: [/* @__PURE__ */ jsx(Waypoints, {}), " Ver solicitud"]
						}),
						data.hojaRuta.trim() && /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							title: "Abre la Mesa de Partes del MTC para responder el trámite",
							children: /* @__PURE__ */ jsx("a", {
								href: urlStd(data.hojaRuta),
								target: "_blank",
								rel: "noreferrer",
								"aria-label": "Responder en Mesa de Partes",
								children: /* @__PURE__ */ jsx(ExternalLink, {})
							})
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(ModalHojaRuta, {
				data,
				abierto: verHr,
				onCerrar: () => setVerHr(false),
				onImportar: (solicitud, documentos, poligonos) => setData((d) => ({
					...d,
					...solicitud,
					adjuntos: [...d.adjuntos.filter((a) => a.origen !== "STD"), ...documentos],
					poligonos
				}))
			})
		]
	}), /* @__PURE__ */ jsxs(Section, {
		titulo: "Datos generales",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Identifique el proyecto y el documento de origen que da inicio al requerimiento."
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: data.codigo,
					onChange: (e) => update("codigo", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre del proyecto",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: data.nombre,
					onChange: (e) => update("nombre", e.target.value),
					placeholder: "Ej. Aeropuerto de Caballococha"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de documento de origen",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: data.docOrigenTipo,
					onChange: (e) => update("docOrigenTipo", e.target.value),
					children: TIPOS_DOC_ORIGEN.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Número de documento",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: data.docOrigenNumero,
					onChange: (e) => update("docOrigenNumero", e.target.value),
					placeholder: "Ej. MEMO-238-2025-MTC"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha del documento",
				icono: CalendarDays,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: data.docOrigenFecha,
					onChange: (e) => update("docOrigenFecha", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área solicitante",
				obligatorio: true,
				ayuda: "Áreas del MTC que piden la gestión predial a la DDP. La solicitud llega por la Mesa de Partes (STD).",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: data.solicitante,
					onChange: (e) => update("solicitante", e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), AREAS_SOLICITANTES.map((a) => /* @__PURE__ */ jsx("option", { children: a }, a))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de inicio",
				icono: CalendarDays,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: data.fechaInicio,
					onChange: (e) => update("fechaInicio", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha fin prevista",
				icono: CalendarDays,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: data.fechaFinPrevista,
					onChange: (e) => update("fechaFinPrevista", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción",
				obligatorio: true,
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 2,
					className: `${controlClase} h-auto py-2`,
					value: data.descripcion,
					onChange: (e) => update("descripcion", e.target.value),
					placeholder: "Descripción ejecutiva del proyecto."
				})
			})
		] })]
	})] });
}
var RUTA_HR = [
	"PLATAFORMA - MESA DE PARTES VIRTUAL",
	"PLATAFORMA - MESA DE PARTES VIRTUAL",
	"__AREA__",
	"DIRECCION DE DISPONIBILIDAD DE PREDIOS",
	"DIRECCION DE DISPONIBILIDAD DE PREDIOS",
	"COORDINACION PREDIAL"
];
var fechaHoraStd = (d) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
/** Movimientos deterministas a partir del código: la misma HR siempre muestra la misma ruta. */
function hojaDeRuta(hr, desde, area) {
	const semilla = [...hr].reduce((a, c) => a + c.charCodeAt(0), 0);
	const creacion = desde ? /* @__PURE__ */ new Date(`${desde}T09:00:00`) : new Date(2026, 0, 5 + semilla % 200);
	creacion.setMinutes(21 + semilla % 30);
	const pasos = 3 + semilla % (RUTA_HR.length - 3);
	let t = new Date(creacion);
	return {
		creacion,
		movimientos: RUTA_HR.map((u) => u === "__AREA__" ? area || "AREA SOLICITANTE" : u).slice(0, pasos + 1).map((unidad, i) => {
			const ingreso = new Date(t);
			const horas = i === 0 ? 0 : 1 + (semilla + i * 7) % 60;
			t = new Date(t.getTime() + horas * 3600 * 1e3);
			const ultimo = i === pasos;
			return {
				n: i + 1,
				ingreso: fechaHoraStd(ingreso),
				atencion: ultimo ? "" : fechaHoraStd(t),
				unidad,
				estado: ultimo ? "EN PROCESO" : "DERIVADO"
			};
		})
	};
}
var TONO_HR = {
	DERIVADO: "primary",
	"EN PROCESO": "warning",
	ATENDIDO: "success"
};
/** Réplica de la pantalla «Datos del Expediente STD» de la Mesa de Partes: datos generales y movimientos. */
function ModalHojaRuta({ data, abierto, onCerrar, onImportar }) {
	const hr = data.hojaRuta;
	const poligonos = useMemo(() => hr ? poligonosStd(hr) : [], [hr]);
	const documentos = useMemo(() => hr ? documentosStd(hr, data.docOrigenTipo, data.docOrigenNumero) : [], [
		hr,
		data.docOrigenTipo,
		data.docOrigenNumero
	]);
	const { creacion, movimientos } = useMemo(() => hr ? hojaDeRuta(hr, data.docOrigenFecha, data.solicitante) : {
		creacion: /* @__PURE__ */ new Date(),
		movimientos: []
	}, [
		hr,
		data.docOrigenFecha,
		data.solicitante
	]);
	const actual = movimientos[movimientos.length - 1];
	const generales = [
		["Asunto", (data.descripcion || data.nombre || "Sin asunto").toUpperCase()],
		["Fecha de creación", fechaHoraStd(creacion)],
		["Expediente", hr],
		["Tipo de documento", data.docOrigenTipo.toUpperCase()],
		["Número de documento", data.docOrigenNumero || "S/N"],
		["Procedimiento", "GESTIÓN PREDIAL · REGISTRO DE PROYECTO"],
		["Remitente", data.solicitante || AREAS_SOLICITANTES[0]],
		["Área responsable", actual?.unidad ?? ""],
		["Usuario responsable", data.coordinadorPredial?.toUpperCase() || "POR ASIGNAR"],
		["Observación final", ""],
		["Observación del expediente", ""]
	];
	return /* @__PURE__ */ jsxs(Modal, {
		abierto,
		onCerrar,
		ancho: "xl",
		titulo: "Datos del expediente STD",
		descripcion: "Consulta al Sistema de Trámite Documentario del MTC por interoperabilidad. Datos de demostración.",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: onCerrar,
				children: "Cerrar"
			}),
			/* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ jsxs("a", {
					href: urlStd(hr),
					target: "_blank",
					rel: "noreferrer",
					children: [/* @__PURE__ */ jsx(ExternalLink, {}), " Responder en Mesa de Partes"]
				})
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				disabled: !hr,
				onClick: () => {
					onImportar({
						docOrigenFecha: creacion.toISOString().slice(0, 10),
						solicitante: data.solicitante || AREAS_SOLICITANTES[0],
						descripcion: data.descripcion || generales[0][1]
					}, documentos, poligonos);
					onCerrar();
				},
				children: [/* @__PURE__ */ jsx(Upload, {}), " Importar solicitud y documentos"]
			})
		] }),
		children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: "Datos generales" }),
			/* @__PURE__ */ jsx("dl", {
				className: "grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm",
				children: generales.map(([k, v]) => /* @__PURE__ */ jsxs("div", {
					className: "contents",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "text-right font-semibold text-foreground",
						children: k
					}), /* @__PURE__ */ jsx("dd", {
						className: "min-w-0 break-words text-foreground",
						children: v
					})]
				}, k))
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Movimientos del expediente" }),
			/* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "ingreso",
						titulo: "Fecha de ingreso",
						ancho: "10rem"
					},
					{
						clave: "atencion",
						titulo: "Fecha de atención",
						ancho: "10rem"
					},
					{
						clave: "unidad",
						titulo: "Unidad de organización"
					},
					{
						clave: "estado",
						titulo: "Estado",
						render: (m) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: TONO_HR[m.estado],
							children: m.estado
						})
					}
				],
				filas: movimientos,
				claveFila: (m) => m.n,
				vacio: "Ingrese una hoja de ruta para consultar."
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Documentos de la solicitud" }),
			/* @__PURE__ */ jsx("p", {
				className: "mb-2 text-xs text-muted-foreground",
				children: "Archivos adjuntos al trámite en el STD. Al importar pasan a la sección Documentos del proyecto con origen STD."
			}),
			/* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "nombre",
						titulo: "Documento"
					},
					{
						clave: "tipo",
						titulo: "Tipo",
						ancho: "6rem"
					},
					{
						clave: "tamano",
						titulo: "Tamaño",
						ancho: "6rem",
						alinear: "derecha"
					}
				],
				filas: documentos,
				claveFila: (a) => a.id,
				vacio: "El trámite no tiene adjuntos."
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Polígonos de la obra" }),
			/* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "codigo",
						titulo: "Código",
						ancho: "6rem"
					},
					{
						clave: "descripcion",
						titulo: "Descripción"
					},
					{
						clave: "areaHa",
						titulo: "Área",
						ancho: "6rem",
						alinear: "derecha"
					},
					{
						clave: "archivo",
						titulo: "Archivo"
					}
				],
				filas: poligonos,
				claveFila: (x) => x.id,
				vacio: "La solicitud no trae polígonos."
			})
		]
	});
}
function FormAlcance({ data, update }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Alcance del proyecto",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Configure el tipo de infraestructura y la modalidad del proyecto."
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Tipo de infraestructura",
			obligatorio: true,
			children: (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				value: data.naturaleza,
				onChange: (e) => update("naturaleza", e.target.value),
				children: NATURALEZAS.map((n) => /* @__PURE__ */ jsx("option", {
					value: n.value,
					children: n.label
				}, n.value))
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Modalidad",
			obligatorio: true,
			children: (id) => /* @__PURE__ */ jsxs("select", {
				id,
				className: controlClase,
				value: data.modalidad,
				onChange: (e) => update("modalidad", e.target.value),
				children: [/* @__PURE__ */ jsx("option", {
					value: "concesionado",
					children: "Concesionado"
				}), /* @__PURE__ */ jsx("option", {
					value: "no-concesionado",
					children: "No concesionado"
				})]
			})
		})] })]
	});
}
function FormFlujo({ data, update }) {
	const tipoSeleccionado = TIPOS_REGISTRO.find((t) => t.value === data.tipoRegistro);
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Tipo de registro",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Seleccione el flujo de atención que corresponde al requerimiento."
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Tipo de registro",
			obligatorio: true,
			ayuda: tipoSeleccionado?.descripcion,
			children: (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				value: data.tipoRegistro,
				onChange: (e) => update("tipoRegistro", e.target.value),
				children: TIPOS_REGISTRO.map((t) => /* @__PURE__ */ jsx("option", {
					value: t.value,
					children: t.label
				}, t.value))
			})
		}), data.tipoRegistro === "gestion" && /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Escenario de gestión predial",
			children: (id) => /* @__PURE__ */ jsxs("select", {
				id,
				className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
				value: data.subEscenario ?? "cero",
				onChange: (e) => update("subEscenario", e.target.value),
				children: [
					/* @__PURE__ */ jsx("option", {
						value: "cero",
						children: "Inicio desde cero"
					}),
					/* @__PURE__ */ jsx("option", {
						value: "transferencia",
						children: "Inicio por transferencia"
					}),
					/* @__PURE__ */ jsx("option", {
						value: "encargatura",
						children: "Inicio por encargatura"
					})
				]
			})
		})] })]
	});
}
function FormUbicacion({ data, update }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Ubicación",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 text-xs text-muted-foreground",
			children: "Departamento, provincia y distrito donde se ejecuta el proyecto."
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Departamento",
				obligatorio: true,
				ayuda: "Maestro: Departamentos.",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: data.departamento,
					onChange: (e) => update("departamento", e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione un departamento"
					}), DEPARTAMENTOS.map((d) => /* @__PURE__ */ jsx("option", { children: d }, d))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Provincia",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: data.provincia,
					onChange: (e) => update("provincia", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Distrito",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: data.distrito,
					onChange: (e) => update("distrito", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Referencia / Dirección",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: data.referencia,
					onChange: (e) => update("referencia", e.target.value),
					placeholder: "Ej. Margen derecha del río Amazonas, km 12"
				})
			})
		] })]
	});
}
function FormResponsables({ data, setData, addEvento }) {
	const [nombre, setNombre] = useState("");
	const [rol, setRol] = useState(CARGOS[0]);
	const [area, setArea] = useState(AREAS[0]);
	const add = () => {
		if (!nombre.trim()) return;
		const r = {
			id: `r${Date.now()}`,
			nombre: nombre.trim(),
			rol,
			area
		};
		setData((d) => ({
			...d,
			responsables: [...d.responsables, r]
		}));
		addEvento("Responsable agregado", `${r.nombre} (${r.rol}).`);
		setNombre("");
	};
	const remove = (id) => {
		const r = data.responsables.find((x) => x.id === id);
		setData((d) => ({
			...d,
			responsables: d.responsables.filter((x) => x.id !== id)
		}));
		if (r) addEvento("Responsable retirado", `${r.nombre}.`);
	};
	const addFromAsignacion = (nombre, rolAsign, areaAsign) => {
		if (!nombre.trim()) return;
		if (data.responsables.some((x) => x.nombre === nombre && x.rol === rolAsign)) return;
		const r = {
			id: `r${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			nombre,
			rol: rolAsign,
			area: areaAsign
		};
		setData((d) => ({
			...d,
			responsables: [...d.responsables, r]
		}));
		addEvento("Responsable agregado", `${r.nombre} (${r.rol}).`);
	};
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Responsables",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Asignación organizacional y profesionales técnicos y legales del proyecto."
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Asignación organizacional" }),
			/* @__PURE__ */ jsx(FormGrid, { children: [
				{
					label: "Coordinación general",
					key: "coordinacionGeneral",
					rol: "COORDINADOR GENERAL",
					area: "Predial",
					options: COORDINACIONES_GENERALES
				},
				{
					label: "Coordinación predial",
					key: "coordinacionPredial",
					rol: "COORDINACIÓN PREDIAL",
					area: "Predial",
					options: COORDINACIONES_PREDIALES
				},
				{
					label: "Coordinador predial",
					key: "coordinadorPredial",
					rol: "COORDINADOR PREDIAL",
					area: "Predial",
					options: COORDINADORES_PREDIALES
				},
				{
					label: "Líder de interferencias",
					key: "liderInterferencias",
					rol: "LÍDER DE INTERFERENCIAS",
					area: "Técnica",
					options: LIDERES_INTERFERENCIAS
				}
			].map((a) => {
				const value = String(data[a.key] ?? "");
				return /* @__PURE__ */ jsx(FormField, {
					etiqueta: a.label,
					children: (id) => /* @__PURE__ */ jsxs("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							value,
							onChange: (e) => setData((d) => ({
								...d,
								[a.key]: e.target.value
							})),
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Seleccione una opción"
							}), a.options.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))]
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							disabled: !value,
							onClick: () => addFromAsignacion(value, a.rol, a.area),
							title: `Asignar como ${a.rol.toLowerCase()}`,
							children: "Asignar"
						})]
					})
				}, a.label);
			}) }),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Profesionales del proyecto" }),
			/* @__PURE__ */ jsxs(FormGrid, {
				columnas: 1,
				children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Nombre",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase,
							value: nombre,
							onChange: (e) => setNombre(e.target.value),
							placeholder: "Nombre y apellidos"
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Cargo",
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: controlClase,
							value: rol,
							onChange: (e) => setRol(e.target.value),
							children: CARGOS.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Área",
						children: (id) => /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx("select", {
								id,
								className: controlClase,
								value: area,
								onChange: (e) => setArea(e.target.value),
								children: AREAS.map((a) => /* @__PURE__ */ jsx("option", { children: a }, a))
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								disabled: !nombre.trim(),
								onClick: add,
								children: [/* @__PURE__ */ jsx(UserPlus, {}), " Agregar responsable"]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Tabla, {
					columnas: [
						{
							clave: "nombre",
							titulo: "Nombre",
							render: (r) => /* @__PURE__ */ jsx("span", {
								className: "font-medium",
								children: r.nombre
							})
						},
						{
							clave: "rol",
							titulo: "Rol"
						},
						{
							clave: "area",
							titulo: "Área"
						},
						{
							clave: "acciones",
							titulo: "Acciones",
							alinear: "derecha",
							ancho: "90px",
							render: (r) => /* @__PURE__ */ jsx(Button, {
								type: "button",
								size: "icon",
								variant: "ghost",
								className: "size-8 text-destructive",
								onClick: () => remove(r.id),
								"aria-label": `Retirar a ${r.nombre}`,
								title: "Retirar responsable",
								children: /* @__PURE__ */ jsx(Trash2, {})
							})
						}
					],
					filas: data.responsables,
					claveFila: (r) => r.id,
					vacio: "Sin responsables registrados."
				})
			})
		]
	});
}
/**
* Capas obligatorias del proyecto (docs/PLAN-BASE-GRAFICA.md §10): sin Delimitación y Área de concesión
* no se registra el proyecto. Cada una se toma de un polígono de la solicitud STD o de un archivo.
*/
function FormCapasObligatorias({ data, setData }) {
	const poner = (clave, valor) => setData((d) => ({
		...d,
		capasObligatorias: {
			...d.capasObligatorias,
			[clave]: valor
		}
	}));
	const propias = Object.values(data.capasObligatorias).includes("std:propio");
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Capas obligatorias del proyecto",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Sin estas capas no hay sobre qué delimitar la adquisición de predios. Elija el polígono que llegó con la solicitud o cargue el archivo (KML, GeoJSON, Shapefile en ZIP o DXF). Al registrar el proyecto entran a la Base gráfica como capas base en borrador, pendientes de aprobación."
			}),
			propias && /* @__PURE__ */ jsx(Aviso, {
				tipo: "info",
				children: "Este proyecto ya trae sus polígonos de delimitación y concesión."
			}),
			/* @__PURE__ */ jsx(FormGrid, {
				columnas: 1,
				children: CAPAS_OBLIGATORIAS.map((o) => {
					const valor = data.capasObligatorias[o.clave] ?? "";
					const archivo = valor.startsWith("archivo:") ? valor.slice(8) : "";
					return /* @__PURE__ */ jsx(FormField, {
						etiqueta: o.nombre,
						obligatorio: true,
						ancho: "doble",
						ayuda: valor ? void 0 : o.detalle,
						children: (id) => /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2 sm:flex-row sm:items-center",
							children: [
								/* @__PURE__ */ jsxs("select", {
									id,
									className: `${controlClase} sm:w-1/2`,
									value: valor.startsWith("std:") ? valor : "",
									onChange: (e) => poner(o.clave, e.target.value),
									disabled: propias,
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: data.poligonos.length ? "Polígono de la solicitud…" : "Sin polígonos de la solicitud"
									}), data.poligonos.map((pol) => /* @__PURE__ */ jsxs("option", {
										value: `std:${pol.id}`,
										children: [
											pol.codigo,
											" · ",
											pol.descripcion,
											" · ",
											pol.areaHa
										]
									}, pol.id))]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: "o"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "file",
									accept: ".kml,.kmz,.geojson,.json,.zip,.dxf",
									"aria-label": `Archivo de ${o.nombre}`,
									disabled: propias,
									className: `${controlClase} h-auto py-1.5 file:mr-3 file:rounded-sm file:border-0 file:bg-muted file:px-2 file:py-1 file:text-sm sm:w-1/2`,
									onChange: (e) => {
										const f = e.target.files?.[0];
										if (f) poner(o.clave, `archivo:${f.name}`);
									}
								}),
								/* @__PURE__ */ jsx(StatusBadge, {
									tono: valor ? "success" : "destructive",
									children: valor ? archivo ? `Archivo: ${archivo}` : valor === "std:propio" ? "Del sistema" : "De la solicitud" : "Falta"
								})
							]
						})
					}, o.clave);
				})
			})
		]
	});
}
function FormDocumentos({ data, setData, addEvento }) {
	const TIPOS = {
		pdf: "PDF",
		doc: "Word",
		docx: "Word",
		xls: "Excel",
		xlsx: "Excel",
		jpg: "Imagen",
		jpeg: "Imagen",
		png: "Imagen"
	};
	const add = (archivos) => {
		const nuevos = Array.from(archivos ?? []).map((f, i) => ({
			id: `a${Date.now()}-${i}`,
			nombre: f.name,
			tipo: TIPOS[f.name.split(".").pop()?.toLowerCase() ?? ""] ?? "Otro",
			tamano: f.size >= 1048576 ? `${(f.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`
		}));
		if (!nuevos.length) return;
		setData((d) => ({
			...d,
			adjuntos: [...d.adjuntos, ...nuevos]
		}));
		nuevos.forEach((a) => addEvento("Documento adjuntado", a.nombre));
	};
	const remove = (id) => {
		const a = data.adjuntos.find((x) => x.id === id);
		setData((d) => ({
			...d,
			adjuntos: d.adjuntos.filter((x) => x.id !== id)
		}));
		if (a) addEvento("Documento eliminado", a.nombre);
	};
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Documentos",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Adjunte memorandos, oficios y otros documentos que sustentan el proyecto."
			}),
			/* @__PURE__ */ jsx(FormGrid, {
				columnas: 1,
				children: /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Adjuntar documento",
					ancho: "doble",
					ayuda: "PDF, Word, Excel o imagen.",
					children: (id) => /* @__PURE__ */ jsxs("label", {
						htmlFor: id,
						className: "inline-flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 text-sm hover:bg-muted",
						children: [
							/* @__PURE__ */ jsx(Upload, {
								size: 16,
								"aria-hidden": true
							}),
							" Elegir archivos",
							/* @__PURE__ */ jsx("input", {
								id,
								type: "file",
								multiple: true,
								accept: ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png",
								className: "sr-only",
								onChange: (e) => {
									add(e.target.files);
									e.target.value = "";
								}
							})
						]
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: /* @__PURE__ */ jsx(Tabla, {
					columnas: [
						{
							clave: "nombre",
							titulo: "Documento",
							render: (a) => /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2 font-medium",
								children: [
									/* @__PURE__ */ jsx(Paperclip, {
										size: 16,
										className: "text-muted-foreground",
										"aria-hidden": true
									}),
									" ",
									a.nombre
								]
							})
						},
						{
							clave: "tipo",
							titulo: "Tipo"
						},
						{
							clave: "tamano",
							titulo: "Tamaño"
						},
						{
							clave: "origen",
							titulo: "Origen",
							render: (a) => a.origen === "STD" ? /* @__PURE__ */ jsx(StatusBadge, {
								tono: "primary",
								children: "Mesa de Partes (STD)"
							}) : /* @__PURE__ */ jsx(StatusBadge, {
								tono: "neutral",
								children: "Cargado aquí"
							})
						},
						{
							clave: "acciones",
							titulo: "Acciones",
							alinear: "derecha",
							ancho: "90px",
							render: (a) => /* @__PURE__ */ jsx(Button, {
								type: "button",
								size: "icon",
								variant: "ghost",
								className: "size-8 text-destructive",
								onClick: () => remove(a.id),
								"aria-label": `Eliminar ${a.nombre}`,
								title: "Eliminar documento",
								children: /* @__PURE__ */ jsx(Trash2, {})
							})
						}
					],
					filas: data.adjuntos,
					claveFila: (a) => a.id,
					vacio: "Sin documentos adjuntos."
				})
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Polígonos de la obra (de la solicitud STD)" }),
			/* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "codigo",
						titulo: "Código",
						ancho: "6rem"
					},
					{
						clave: "descripcion",
						titulo: "Descripción"
					},
					{
						clave: "areaHa",
						titulo: "Área",
						ancho: "6rem",
						alinear: "derecha"
					},
					{
						clave: "archivo",
						titulo: "Archivo"
					}
				],
				filas: data.poligonos,
				claveFila: (x) => x.id,
				vacio: "Sin polígonos. Impórtelos desde la solicitud (hoja de ruta) en Solicitud de la Mesa de Partes; luego se cargan en la Base gráfica del proyecto."
			})
		]
	});
}
function Trazabilidad({ eventos }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
		className: "mb-3 text-xs text-muted-foreground",
		children: "Historial cronológico de acciones, asignaciones y cambios sobre el proyecto."
	}), /* @__PURE__ */ jsx("ol", {
		className: "relative ml-3 space-y-4 border-l-2 border-border pt-2",
		children: eventos.slice().reverse().map((e) => /* @__PURE__ */ jsxs("li", {
			className: "relative ml-4",
			children: [
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "absolute -left-[21px] top-1.5 size-2.5 rounded-sm bg-primary"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: e.fecha
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm font-semibold",
					children: e.accion
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm",
					children: e.detalle
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: ["por ", e.usuario]
				})
			]
		}, e.id))
	})] });
}
//#endregion
export { RegistroProyectoPage as component };
