import { a as controlClase, i as SiNo, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, i as estadoPlazo, n as getProyecto, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial, i as registrarVersion } from "./historial-Bc37nCTn.js";
import { h as urlPlano, s as leerPlanos } from "./gisProyecto-CAMCHdpa.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.levantamiento-informacion-tecnica-C7OlE4V1.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { n as BotonPanelFotografico, t as CampoFoto } from "./CampoFoto-CSlShmEX.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CalendarDays, CheckCircle2, FileText, History, Plus, Ruler, Save, Trash2, X } from "lucide-react";
//#region src/components/mapa/PlanosDelPredio.tsx
/** Planos del predio generados con el plugin de QGIS o ArcGIS (servicio GIS). Sin servicio, no se muestra. */
function PlanosDelPredio({ projectId, codigo }) {
	const [planos, setPlanos] = useState(null);
	useEffect(() => {
		leerPlanos(projectId, codigo).then(setPlanos).catch(() => setPlanos(null));
	}, [projectId, codigo]);
	if (!planos) return null;
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Planos generados en QGIS o ArcGIS",
		className: "mt-4",
		children: planos.length === 0 ? /* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "Aún no hay planos de este predio. Se generan con el plugin PDGP (pestaña Plano) y llegan aquí con quien los generó y la fecha."
		}) : /* @__PURE__ */ jsx("ul", {
			className: "divide-y divide-border rounded-md border border-border",
			children: planos.map((p) => /* @__PURE__ */ jsxs("li", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-sm",
				children: [
					/* @__PURE__ */ jsx(FileText, {
						size: 16,
						className: "shrink-0 text-muted-foreground",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsxs("a", {
						href: urlPlano(p),
						target: "_blank",
						rel: "noreferrer",
						className: "font-medium text-primary underline underline-offset-2",
						children: [
							p.tipo,
							": ",
							p.nombreArchivo
						]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "text-xs text-muted-foreground",
						children: [
							p.nombreUsuario,
							" · ",
							p.cliente,
							" ·",
							" ",
							new Date(p.enviadoEl).toLocaleString("es-PE", {
								dateStyle: "short",
								timeStyle: "short"
							})
						]
					})
				]
			}, p.id))
		})
	});
}
//#endregion
//#region src/routes/proyectos.$projectId.predios.$codigo.levantamiento-informacion-tecnica.tsx?tsr-split=component
/** Clave de la pantalla en el almacén de fotos (M11). */
var PANTALLA = "levantamiento-informacion-tecnica";
var DOC_ENVIADOS = "Documentos enviados con el requerimiento";
var DOC_PRODUCTOS = "Productos recibidos de la actividad";
var serviceTypes = [
	{
		key: "geodesico",
		label: "Servicio geodésico y/o topográfico",
		description: "Coordenadas, áreas, linderos y detalles del terreno."
	},
	{
		key: "fotogrametria",
		label: "Servicio de fotogrametría",
		description: "Captura aérea y productos cartográficos del predio."
	},
	{
		key: "hitos",
		label: "Servicio de colocación de hitos",
		description: "Materialización y verificación de vértices en campo."
	},
	{
		key: "existencias",
		label: "Servicio de levantamiento de existencias",
		description: "Inventario de edificaciones, instalaciones y mejoras."
	}
];
var etiquetasHistorial = {
	requerimientos: "Requerimiento",
	hojaRuta: "Hoja de ruta",
	fechaEnvio: "Fecha de envío",
	destinatario: "Destinatario",
	asunto: "Asunto",
	estado: "Estado",
	services: "Servicios",
	tieneOrdenServicio: "Tiene orden de servicio",
	numeroOrdenServicio: "N.° de orden de servicio",
	fechaOrdenServicio: "Fecha de orden de servicio",
	especialista: "Especialista o proveedor",
	fechaRecepcionResultado: "Fecha de recepción",
	descripcionResultado: "Producto recibido",
	observaciones: "Observaciones"
};
var ESTADO_TONO = {
	BORRADOR: "neutral",
	ENVIADO: "primary",
	"EN ATENCIÓN": "warning",
	"RESULTADO RECIBIDO": "success",
	CERRADO: "success"
};
function createRequirement(id) {
	return {
		id,
		hojaRuta: "",
		fechaEnvio: "",
		destinatario: "",
		asunto: "",
		estado: "BORRADOR",
		services: [],
		tieneOrdenServicio: false,
		numeroOrdenServicio: "",
		fechaOrdenServicio: "",
		especialista: "",
		fechaRecepcionResultado: "",
		descripcionResultado: "",
		observaciones: ""
	};
}
function LevantamientoInformacionTecnicaPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(LevantamientoForm, {
		projectId,
		codigo
	}, `${projectId}-${codigo}`);
}
function LevantamientoForm({ projectId, codigo }) {
	const navigate = useNavigate();
	const decodedCodigo = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const [requirements, setRequirements] = useState([createRequirement("requirement-initial")]);
	const [feedback, setFeedback] = useState(null);
	const [porEliminar, setPorEliminar] = useState(null);
	const rol = useRol();
	const items = useItems();
	const registrado = (nombre) => Boolean(documentoDelCampo(items, decodedCodigo, nombre));
	const docDe = (base, r) => `${base} · R-${r.id === "requirement-initial" ? "1" : r.id.slice(-6)}`;
	const hitos = useHitosPredio(decodedCodigo);
	const [inicioExpediente, setInicioExpediente] = useState(null);
	const inicioActual = inicioExpediente ?? hitos.expediente_tecnico_elaboracion?.fecha ?? "";
	const plazoExpediente = estadoPlazo(hitos, "expediente_tecnico_elaboracion");
	const claveHistorial = `levantamiento-informacion-tecnica-${decodedCodigo}`;
	const bitacora = {
		modulo: 11,
		entidad: "levantamiento_informacion_tecnica"
	};
	const serializable = (lista) => ({ requerimientos: lista.map((r, i) => ({
		...r,
		nombre: `Requerimiento ${i + 1}${r.hojaRuta ? ` · ${r.hojaRuta}` : ""}`
	})) });
	const { versiones, guardarVersion } = useFormularioConHistorial(claveHistorial, serializable(requirements), (r) => setRequirements(r.requerimientos), bitacora);
	const nombreRequerimiento = (id) => `Requerimiento ${requirements.findIndex((r) => r.id === id) + 1}`;
	/** Aplica un cambio a la lista y deja la versión con la lista resultante. */
	function aplicar(cambio, accion, objeto, motivo) {
		const siguiente = cambio(requirements);
		setRequirements(siguiente);
		guardarVersion(accion, objeto, motivo, serializable(siguiente));
		setFeedback(null);
	}
	function updateRequirement(requirementId, key, value) {
		setRequirements((current) => current.map((requirement) => requirement.id === requirementId ? {
			...requirement,
			[key]: value
		} : requirement));
		setFeedback(null);
	}
	function toggleService(requirementId, serviceKey) {
		setRequirements((current) => current.map((requirement) => {
			if (requirement.id !== requirementId) return requirement;
			const selected = requirement.services.includes(serviceKey);
			return {
				...requirement,
				services: selected ? requirement.services.filter((item) => item !== serviceKey) : [...requirement.services, serviceKey]
			};
		}));
		setFeedback(null);
	}
	function addRequirement() {
		aplicar((lista) => [...lista, createRequirement(`requirement-${Date.now()}`)], "Agregó requerimiento", `Requerimiento ${requirements.length + 1}`);
	}
	function removeRequirement(requirementId) {
		setPorEliminar({
			requirementId,
			nombre: nombreRequerimiento(requirementId)
		});
	}
	function confirmarEliminacion(motivo) {
		if (!porEliminar) return;
		const { requirementId, nombre } = porEliminar;
		aplicar((lista) => lista.filter((r) => r.id !== requirementId), "Eliminó requerimiento", nombre, motivo);
		setPorEliminar(null);
	}
	function handleSubmit() {
		if (requirements.find((requirement) => !requirement.services.length)) {
			setFeedback({
				kind: "error",
				text: "Cada requerimiento debe incluir por lo menos un servicio."
			});
			return;
		}
		if (requirements.some((requirement) => requirement.estado !== "BORRADOR" && !registrado(docDe(DOC_ENVIADOS, requirement)))) {
			setFeedback({
				kind: "error",
				text: `Suba «${DOC_ENVIADOS}» en su campo del requerimiento antes de marcarlo como enviado.`
			});
			return;
		}
		if (requirements.some((requirement) => ["RESULTADO RECIBIDO", "CERRADO"].includes(requirement.estado) && !registrado(docDe(DOC_PRODUCTOS, requirement)))) {
			setFeedback({
				kind: "error",
				text: `Suba «${DOC_PRODUCTOS}» en su campo del requerimiento antes de marcar un resultado como recibido.`
			});
			return;
		}
		if (inicioExpediente !== null) registrarHito(decodedCodigo, "expediente_tecnico_elaboracion", inicioExpediente, PANTALLA, "Inicio del expediente técnico");
		setInicioExpediente(null);
		guardarVersion(versiones.length ? "Modificó los requerimientos" : "Registró los requerimientos", `${requirements.length} requerimiento(s) del predio ${decodedCodigo}`);
		setFeedback({
			kind: "success",
			text: "Requerimientos guardados."
		});
	}
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
				titulo: "Levantamiento de información técnica",
				icono: Ruler,
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(BotonPanelFotografico, {
					proyecto: projectId,
					predio: decodedCodigo,
					pantalla: PANTALLA,
					titulo: "Panel fotográfico · Levantamiento de información técnica"
				}), /* @__PURE__ */ jsxs(StatusBadge, {
					tono: "primary",
					children: [requirements.length, " requerimiento(s)"]
				})] })
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "levantamiento-informacion-tecnica",
				projectId,
				codigo: decodedCodigo
			}),
			feedback && /* @__PURE__ */ jsxs("p", {
				role: feedback.kind === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${feedback.kind === "success" ? "border-success bg-success-soft text-success" : "border-destructive bg-destructive-soft text-destructive"}`,
				children: [
					feedback.kind === "success" ? /* @__PURE__ */ jsx(CheckCircle2, {
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
						children: feedback.text
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setFeedback(null),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
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
									className: "mr-1",
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
								handleSubmit();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									className: "mb-4"
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Predio del requerimiento",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Inicio del expediente técnico",
										icono: CalendarDays,
										ayuda: "Al guardar empieza a correr la elaboración del expediente técnico (plazo de gestión de 40 d.h.).",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: inicioActual,
											onChange: (event) => setInicioExpediente(event.target.value)
										})
									}), plazoExpediente && /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Elaboración del expediente",
										children: /* @__PURE__ */ jsx(PlazoBadge, {
											vence: plazoExpediente.vence,
											etiqueta: "Plazo de gestión"
										})
									})] })
								}),
								/* @__PURE__ */ jsx(PlanosDelPredio, {
									projectId,
									codigo: decodedCodigo
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Requerimientos registrados",
									className: "mt-4",
									acciones: /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: addRequirement,
										children: [/* @__PURE__ */ jsx(Plus, {}), " Nuevo requerimiento"]
									}),
									children: [/* @__PURE__ */ jsx("p", {
										className: "mb-4 text-xs text-muted-foreground",
										children: "Cada tarjeta representa una hoja de ruta. Puede solicitar uno o varios servicios y registrar por separado lo que se envió y los productos recibidos. Agregue una tarjeta nueva cuando exista otra hoja de ruta."
									}), /* @__PURE__ */ jsx("div", {
										className: "space-y-4",
										children: requirements.map((requirement, requirementIndex) => /* @__PURE__ */ jsxs("article", {
											className: "rounded-lg border border-border",
											children: [/* @__PURE__ */ jsxs("header", {
												className: "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background px-4 py-3",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ jsx("span", {
														className: "flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground",
														"aria-hidden": true,
														children: requirementIndex + 1
													}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h3", {
														className: "text-sm font-semibold",
														children: [
															"Requerimiento ",
															requirementIndex + 1,
															requirement.hojaRuta ? ` · ${requirement.hojaRuta}` : " · Sin hoja de ruta"
														]
													}), /* @__PURE__ */ jsxs("p", {
														className: "text-xs text-muted-foreground",
														children: [
															requirement.services.length,
															" servicio",
															requirement.services.length === 1 ? "" : "s",
															" seleccionado",
															requirement.services.length === 1 ? "" : "s"
														]
													})] })]
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [/* @__PURE__ */ jsx(StatusBadge, {
														tono: ESTADO_TONO[requirement.estado] ?? "neutral",
														children: requirement.estado
													}), requirements.length > 1 && /* @__PURE__ */ jsxs(Button, {
														type: "button",
														variant: "outline",
														size: "sm",
														className: "text-destructive",
														onClick: () => removeRequirement(requirement.id),
														children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar requerimiento"]
													})]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "p-4",
												children: [
													/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de envío por hoja de ruta" }),
													/* @__PURE__ */ jsxs(FormGrid, { children: [
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Número de hoja de ruta",
															obligatorio: true,
															children: (id) => /* @__PURE__ */ jsx("input", {
																id,
																required: true,
																className: controlClase,
																placeholder: "Ej. HR-2026-001234",
																value: requirement.hojaRuta,
																onChange: (event) => updateRequirement(requirement.id, "hojaRuta", event.target.value)
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Fecha de envío",
															obligatorio: true,
															icono: CalendarDays,
															children: (id) => /* @__PURE__ */ jsx("input", {
																id,
																type: "date",
																required: true,
																className: controlClase,
																value: requirement.fechaEnvio,
																onChange: (event) => updateRequirement(requirement.id, "fechaEnvio", event.target.value)
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Área o entidad destinataria",
															obligatorio: true,
															children: (id) => /* @__PURE__ */ jsx("input", {
																id,
																required: true,
																className: controlClase,
																placeholder: "Coordinación, abastecimiento, consultor u otra entidad",
																value: requirement.destinatario,
																onChange: (event) => updateRequirement(requirement.id, "destinatario", event.target.value)
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Estado del requerimiento",
															children: (id) => /* @__PURE__ */ jsxs("select", {
																id,
																className: controlClase,
																value: requirement.estado,
																onChange: (event) => updateRequirement(requirement.id, "estado", event.target.value),
																children: [
																	/* @__PURE__ */ jsx("option", {
																		value: "BORRADOR",
																		children: "BORRADOR"
																	}),
																	/* @__PURE__ */ jsx("option", {
																		value: "ENVIADO",
																		children: "ENVIADO"
																	}),
																	/* @__PURE__ */ jsx("option", {
																		value: "EN ATENCIÓN",
																		children: "EN ATENCIÓN"
																	}),
																	/* @__PURE__ */ jsx("option", {
																		value: "RESULTADO RECIBIDO",
																		children: "RESULTADO RECIBIDO"
																	}),
																	/* @__PURE__ */ jsx("option", {
																		value: "CERRADO",
																		children: "CERRADO"
																	})
																]
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Asunto del requerimiento",
															ancho: "doble",
															children: (id) => /* @__PURE__ */ jsx("input", {
																id,
																className: controlClase,
																placeholder: "Resumen de lo solicitado mediante la hoja de ruta",
																value: requirement.asunto,
																onChange: (event) => updateRequirement(requirement.id, "asunto", event.target.value)
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: DOC_ENVIADOS,
															obligatorio: requirement.estado !== "BORRADOR",
															ancho: "doble",
															children: () => /* @__PURE__ */ jsx(CampoDocumento, {
																projectId,
																codigo: decodedCodigo,
																nombre: docDe(DOC_ENVIADOS, requirement),
																numero: requirement.hojaRuta || void 0,
																fecha: requirement.fechaEnvio || void 0
															})
														})
													] }),
													/* @__PURE__ */ jsx(Subtitulo, { children: "Servicios incluidos en este requerimiento" }),
													/* @__PURE__ */ jsx("p", {
														className: "mb-2 text-xs text-muted-foreground",
														children: "Una hoja de ruta puede solicitar uno o varios de los siguientes servicios."
													}),
													/* @__PURE__ */ jsx("div", {
														className: "grid gap-2 lg:grid-cols-2",
														children: serviceTypes.map((service) => {
															const selected = requirement.services.includes(service.key);
															return /* @__PURE__ */ jsxs("label", {
																className: `flex cursor-pointer items-start gap-3 rounded-md border p-3 focus-within:ring-2 focus-within:ring-primary ${selected ? "border-primary bg-primary-soft" : "border-border hover:bg-muted"}`,
																children: [/* @__PURE__ */ jsx("input", {
																	type: "checkbox",
																	checked: selected,
																	onChange: () => toggleService(requirement.id, service.key),
																	className: "mt-0.5 size-4 accent-primary"
																}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
																	className: "block text-sm font-semibold",
																	children: service.label
																}), /* @__PURE__ */ jsx("span", {
																	className: "block text-xs text-muted-foreground",
																	children: service.description
																})] })]
															}, service.key);
														})
													}),
													/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de contratación, cuando corresponda" }),
													/* @__PURE__ */ jsxs(FormGrid, { children: [
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "¿Tiene orden de servicio?",
															children: /* @__PURE__ */ jsx(SiNo, {
																nombre: "Tiene orden de servicio",
																valor: requirement.tieneOrdenServicio,
																onCambiar: (checked) => {
																	setRequirements((current) => current.map((item) => item.id === requirement.id ? {
																		...item,
																		tieneOrdenServicio: checked,
																		numeroOrdenServicio: checked ? item.numeroOrdenServicio : "",
																		fechaOrdenServicio: checked ? item.fechaOrdenServicio : ""
																	} : item));
																	setFeedback(null);
																}
															})
														}),
														/* @__PURE__ */ jsx("div", {
															className: "hidden lg:block",
															"aria-hidden": true
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Número de orden de servicio",
															children: (id) => /* @__PURE__ */ jsx("input", {
																id,
																className: controlClase,
																disabled: !requirement.tieneOrdenServicio,
																placeholder: "Ingrese el número de O/S",
																value: requirement.numeroOrdenServicio,
																onChange: (event) => updateRequirement(requirement.id, "numeroOrdenServicio", event.target.value)
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Fecha de orden de servicio",
															icono: CalendarDays,
															children: (id) => /* @__PURE__ */ jsx("input", {
																id,
																type: "date",
																className: controlClase,
																disabled: !requirement.tieneOrdenServicio,
																value: requirement.fechaOrdenServicio,
																onChange: (event) => updateRequirement(requirement.id, "fechaOrdenServicio", event.target.value)
															})
														})
													] }),
													/* @__PURE__ */ jsx(Subtitulo, { children: "Recepción del resultado de la actividad" }),
													/* @__PURE__ */ jsxs(FormGrid, { children: [
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Especialista o proveedor",
															children: (id) => /* @__PURE__ */ jsx("input", {
																id,
																className: controlClase,
																placeholder: "Responsable que entrega el producto",
																value: requirement.especialista,
																onChange: (event) => updateRequirement(requirement.id, "especialista", event.target.value)
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Fecha de recepción",
															icono: CalendarDays,
															children: (id) => /* @__PURE__ */ jsx("input", {
																id,
																type: "date",
																className: controlClase,
																value: requirement.fechaRecepcionResultado,
																onChange: (event) => updateRequirement(requirement.id, "fechaRecepcionResultado", event.target.value)
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: "Descripción del producto recibido",
															ancho: "doble",
															children: (id) => /* @__PURE__ */ jsx("textarea", {
																id,
																rows: 3,
																className: `${controlClase} h-auto py-2`,
																placeholder: "Describa brevemente el informe, plano, base gráfica, fotografías u otro producto recibido.",
																value: requirement.descripcionResultado,
																onChange: (event) => updateRequirement(requirement.id, "descripcionResultado", event.target.value)
															})
														}),
														/* @__PURE__ */ jsx(FormField, {
															etiqueta: DOC_PRODUCTOS,
															obligatorio: ["RESULTADO RECIBIDO", "CERRADO"].includes(requirement.estado),
															ancho: "doble",
															children: () => /* @__PURE__ */ jsx(CampoDocumento, {
																projectId,
																codigo: decodedCodigo,
																nombre: docDe(DOC_PRODUCTOS, requirement),
																fecha: requirement.fechaRecepcionResultado || void 0,
																emisor: requirement.especialista || void 0
															})
														})
													] }),
													/* @__PURE__ */ jsx(Subtitulo, { children: "Fotografías del requerimiento" }),
													/* @__PURE__ */ jsx(CampoFoto, {
														contexto: {
															proyecto: projectId,
															predio: decodedCodigo,
															pantalla: PANTALLA,
															seccion: "Requerimientos",
															registro: requirement.id,
															campo: "Fotografías del requerimiento",
															modulo: 11
														},
														etiqueta: `Fotografías del requerimiento ${requirementIndex + 1}`
													}),
													/* @__PURE__ */ jsx(Subtitulo, { children: "Observaciones del requerimiento" }),
													/* @__PURE__ */ jsx(FormGrid, {
														columnas: 1,
														children: /* @__PURE__ */ jsx(FormField, {
															etiqueta: "Observaciones",
															children: (id) => /* @__PURE__ */ jsx("textarea", {
																id,
																rows: 3,
																className: `${controlClase} h-auto py-2`,
																placeholder: "Registre incidencias, pendientes o aclaraciones relacionadas con esta hoja de ruta.",
																value: requirement.observaciones,
																onChange: (event) => updateRequirement(requirement.id, "observaciones", event.target.value)
															})
														})
													})
												]
											})]
										}, requirement.id))
									})]
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [
									/* @__PURE__ */ jsx("p", {
										className: "mr-auto self-center text-xs text-muted-foreground",
										children: "Formatos admitidos: PDF, Word, Excel, DWG, DXF, ZIP e imágenes. También puede registrar enlaces externos."
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: () => navigate({
											to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
											params: {
												projectId,
												codigo: decodedCodigo
											}
										}),
										children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "submit",
										children: [/* @__PURE__ */ jsx(Save, {}), " Guardar requerimientos"]
									})
								] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Levantamiento de información técnica",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									setRequirements(r.requerimientos);
									registrarVersion(claveHistorial, {
										accion: "Restauró una versión anterior",
										objeto: `versión ${n}`,
										registro: r
									}, bitacora);
									setFeedback({
										kind: "success",
										text: `Se restauró la versión ${n}. Quedó como una versión nueva.`
									});
								}
							})
						})
					})
				]
			}),
			porEliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: porEliminar.nombre,
				tipo: "requerimiento",
				onCerrar: () => setPorEliminar(null),
				onConfirmar: confirmarEliminacion
			})
		]
	});
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, tipo, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Eliminar ${tipo}`,
		descripcion: `${nombre} sale del registro. El histórico conserva sus datos y el motivo.`,
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
			children: [
				/* @__PURE__ */ jsx(Trash2, {}),
				" Eliminar ",
				tipo
			]
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
				onChange: (ev) => setMotivo(ev.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
//#endregion
export { LevantamientoInformacionTecnicaPage as component };
