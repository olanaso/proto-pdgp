import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, f as vencimiento, g as fechaIso, l as diasHabilesRestantes, n as getProyecto, o as plazoVencido, s as registrarHito, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { J as usePerfilPredio, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.respuesta-sujeto-pasivo-DzRGF1KO.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, CheckCircle2, FileCheck2, FileText, Gavel, Save, Send, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.respuesta-sujeto-pasivo.tsx?tsr-split=component
var etiquetasHistorial = {
	form: "Respuesta",
	fechaNotificacionCarta: "Notificación de la carta",
	fechaRecepcion: "Fecha de recepción",
	codigoExpedienteTd: "Expediente TD",
	tipoDocumento: "Tipo de documento",
	numeroDocumento: "N.° de documento",
	remitente: "Remitente",
	resultadoRespuesta: "Resultado de la respuesta",
	clasificacion: "Clasificación",
	tieneFirma: "Tiene firma",
	tieneDocumentoIdentidad: "Tiene documento de identidad",
	acreditaTitularidad: "Acredita titularidad",
	adjuntaDocumentosSolicitados: "Adjunta documentos solicitados",
	respuestaExpresa: "Respuesta expresa",
	observacionValidacion: "Observación de validación",
	responsable: "Responsable"
};
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var DOC_RESPUESTA = "Documento de respuesta del sujeto pasivo";
var CLASIFICACION_TEXTO = {
	PENDIENTE: "Borrador",
	"TRATO DIRECTO": "Trato directo",
	EXPROPIACION: "Expropiación"
};
var CLASIFICACION_TONO = {
	PENDIENTE: "neutral",
	"TRATO DIRECTO": "success",
	EXPROPIACION: "warning"
};
function RespuestaSujetoPasivoPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(RespuestaForm, {
		projectId,
		codigo
	}, `${projectId}-${codigo}`);
}
function RespuestaForm({ projectId, codigo }) {
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const baseCode = (predio?.cod || decodedCodigo).replace(/[^A-Z0-9-]/gi, "").toUpperCase();
	const initialDoc = useMemo(() => `RSP-${(/* @__PURE__ */ new Date()).getFullYear()}-${baseCode.slice(-6)}`, [baseCode]);
	const [mensaje, setMensaje] = useState(null);
	const [form, setForm] = useState({
		fechaNotificacionCarta: "",
		fechaRecepcion: fechaIso(/* @__PURE__ */ new Date()),
		codigoExpedienteTd: predio?.exp || `TD-${(/* @__PURE__ */ new Date()).getFullYear()}-${baseCode.slice(-6)}`,
		tipoDocumento: "Carta de respuesta",
		numeroDocumento: initialDoc,
		remitente: predio?.suj || "Sin información",
		resultadoRespuesta: "PENDIENTE",
		clasificacion: "PENDIENTE",
		tieneFirma: false,
		tieneDocumentoIdentidad: false,
		acreditaTitularidad: false,
		adjuntaDocumentosSolicitados: false,
		respuestaExpresa: false,
		observacionValidacion: "",
		responsable: proyecto?.coordinadorPredial || "Coordinador predial"
	});
	const rol = useRol();
	const respuesta = documentoDelCampo(useItems(), decodedCodigo, DOC_RESPUESTA, "rsp-documento");
	const claveHistorial = `respuesta-sujeto-pasivo-${decodedCodigo}`;
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, { form }, (r) => setForm(r.form), {
		modulo: 15,
		entidad: "respuesta_sujeto_pasivo"
	});
	const validation = getDocumentValidation(form, Boolean(respuesta));
	const venceRespuesta = form.fechaNotificacionCarta ? vencimiento(/* @__PURE__ */ new Date(`${form.fechaNotificacionCarta}T00:00:00`), plazo("respuesta_sujeto_pasivo")) : null;
	const perfil = usePerfilPredio(projectId, decodedCodigo);
	const hitos = useHitosPredio(decodedCodigo);
	const registrada = versiones[0]?.registro.form?.resultadoRespuesta;
	const rechazo = registrada === "NO ACEPTA" || registrada === "NO RESPONDE";
	const vencida = registrada !== "ACEPTA" && (venceRespuesta ? diasHabilesRestantes(venceRespuesta) < 0 : plazoVencido(hitos, "respuesta_sujeto_pasivo"));
	const ofrecerExpropiacion = (rechazo || vencida) && perfil.ruta !== "EXPROPIACION";
	/** La notificación de la carta inicia los 10 d.h. de respuesta: alimenta el stepper y el menú. */
	function publicarHito() {
		if (form.fechaNotificacionCarta) registrarHito(decodedCodigo, "respuesta_sujeto_pasivo", form.fechaNotificacionCarta, "respuesta-sujeto-pasivo", "Notificación de la carta");
	}
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function suggestClassification() {
		if (form.resultadoRespuesta === "ACEPTA" && validation.ok) {
			setField("clasificacion", "TRATO DIRECTO");
			setMensaje({
				tipo: "exito",
				texto: "La respuesta cumple los requisitos: se sugiere clasificar como trato directo."
			});
			return;
		}
		if (form.resultadoRespuesta === "NO ACEPTA" || form.resultadoRespuesta === "NO RESPONDE") {
			setField("clasificacion", "EXPROPIACION");
			setMensaje({
				tipo: "aviso",
				texto: "Por no aceptación o ausencia de respuesta se sugiere clasificar como expropiación (art. 20.5)."
			});
			return;
		}
		setMensaje({
			tipo: "aviso",
			texto: "Complete la validación documental para sugerir la clasificación."
		});
	}
	function handleSaveDraft() {
		guardarVersion(versiones.length ? "Modificó el borrador" : "Guardó el borrador", `Respuesta ${form.numeroDocumento}`);
		publicarHito();
		setMensaje({
			tipo: "exito",
			texto: `Borrador de la respuesta ${form.numeroDocumento} guardado.`
		});
	}
	function handleRegisterResponse() {
		if (!form.codigoExpedienteTd.trim() || !form.numeroDocumento.trim()) {
			setMensaje({
				tipo: "error",
				texto: "Registre el expediente de trámite documentario y el número de documento."
			});
			return;
		}
		if (!validation.ok) {
			setMensaje({
				tipo: "aviso",
				texto: validation.message
			});
			return;
		}
		if (form.clasificacion === "PENDIENTE") {
			setMensaje({
				tipo: "aviso",
				texto: "Clasifique formalmente el predio como trato directo o expropiación."
			});
			return;
		}
		guardarVersion("Registró respuesta y clasificación", `Respuesta ${form.numeroDocumento}: ${CLASIFICACION_TEXTO[form.clasificacion]}, resultado ${form.resultadoRespuesta}`);
		publicarHito();
		setMensaje({
			tipo: "exito",
			texto: `Respuesta registrada: predio clasificado como ${CLASIFICACION_TEXTO[form.clasificacion].toLowerCase()}.`
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
				titulo: "Respuesta del sujeto pasivo",
				icono: FileCheck2,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: CLASIFICACION_TONO[form.clasificacion],
					children: CLASIFICACION_TEXTO[form.clasificacion]
				})
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Trato directo · art. 19 a 21 del TUO del DL 1192",
				className: "mb-4",
				children: [
					/* @__PURE__ */ jsx(Stepper, { pasos: [
						{
							nombre: "Certificación presupuestal",
							estado: "completado",
							detalle: "Art. 20.2 · disponibilidad previa",
							to: "/proyectos/$projectId/predios/$codigo/certificacion-presupuestal-ccp",
							params: {
								projectId,
								codigo
							}
						},
						{
							nombre: "Carta de intención",
							estado: "completado",
							detalle: "Art. 20.2 · 20 d.h. desde la tasación",
							to: "/proyectos/$projectId/predios/$codigo/carta-intencion",
							params: {
								projectId,
								codigo
							}
						},
						{
							nombre: "Respuesta del sujeto pasivo",
							estado: "actual",
							detalle: "Art. 20.3 · 10 d.h. desde la notificación"
						},
						{
							nombre: "Norma de valor y pago",
							estado: "pendiente",
							detalle: "Art. 20.4.a · 10 d.h.",
							to: "/proyectos/$projectId/predios/$codigo/gestion-resolucion-rd",
							params: {
								projectId,
								codigo
							}
						}
					] }),
					venceRespuesta && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
						children: ["Plazo del sujeto pasivo para responder (art. 20.3):", /* @__PURE__ */ jsx(PlazoBadge, { vence: venceRespuesta })]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Art. 20.5: si vence el plazo sin respuesta, la oferta se considera rechazada y se inicia la expropiación."
					})
				]
			}),
			ofrecerExpropiacion && /* @__PURE__ */ jsxs(Section, {
				titulo: "Paso a expropiación · art. 26",
				className: "mb-4",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "mb-3 text-sm text-muted-foreground",
					children: [
						rechazo ? "El sujeto pasivo rechazó la oferta." : "Venció el plazo de 10 d.h. sin aceptación: la oferta se considera rechazada (art. 20.5).",
						" ",
						"Puede iniciarse la expropiación."
					]
				}), perfil.leyAutoritativa ? /* @__PURE__ */ jsx(Button, {
					asChild: true,
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/$projectId/predios/$codigo/inicio-expropiacion",
						params: {
							projectId,
							codigo
						},
						children: [/* @__PURE__ */ jsx(Gavel, {}), " Iniciar expropiación"]
					})
				}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					disabled: true,
					title: "Sin ley autoritativa vigente (art. 25)",
					children: [/* @__PURE__ */ jsx(Gavel, {}), " Iniciar expropiación"]
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-sm text-warning",
					children: [
						"No hay ley autoritativa vigente para el predio (art. 25): sin ella no se puede expropiar.",
						" ",
						/* @__PURE__ */ jsx(Link, {
							to: "/proyectos/$projectId/normas-habilitantes",
							params: { projectId },
							className: "font-semibold underline",
							children: "Registrar la ley en Normas habilitantes"
						})
					]
				})] })]
			}),
			mensaje && /* @__PURE__ */ jsxs("p", {
				role: mensaje.tipo === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[mensaje.tipo]}`,
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: mensaje.texto
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMensaje(null),
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
								"Histórico (",
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
								handleSaveDraft();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									datos: [{
										etiqueta: "Sujeto pasivo",
										valor: predio?.suj ?? ""
									}],
									className: "mb-4"
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Datos de recepción",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Notificación de la carta",
											icono: CalendarDays,
											ayuda: "Fecha desde la que corren los 10 d.h. del art. 20.3",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaNotificacionCarta,
												onChange: (e) => setField("fechaNotificacionCarta", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de recepción",
											obligatorio: true,
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaRecepcion,
												onChange: (e) => setField("fechaRecepcion", e.target.value),
												required: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Expediente TD",
											obligatorio: true,
											ayuda: "Número del trámite documentario",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.codigoExpedienteTd,
												onChange: (e) => setField("codigoExpedienteTd", e.target.value),
												required: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Tipo de documento",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.tipoDocumento,
												onChange: (e) => setField("tipoDocumento", e.target.value),
												children: [
													/* @__PURE__ */ jsx("option", { children: "Carta de respuesta" }),
													/* @__PURE__ */ jsx("option", { children: "Solicitud" }),
													/* @__PURE__ */ jsx("option", { children: "Declaración jurada" }),
													/* @__PURE__ */ jsx("option", { children: "Escrito simple" }),
													/* @__PURE__ */ jsx("option", { children: "Otro" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de documento",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.numeroDocumento,
												onChange: (e) => setField("numeroDocumento", e.target.value),
												required: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Remitente",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.remitente,
												onChange: (e) => setField("remitente", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Resultado de la respuesta",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.resultadoRespuesta,
												onChange: (e) => setField("resultadoRespuesta", e.target.value),
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "PENDIENTE",
														children: "Pendiente"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "ACEPTA",
														children: "Acepta"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "NO ACEPTA",
														children: "No acepta"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "OBSERVA",
														children: "Observa"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "NO RESPONDE",
														children: "No responde"
													})
												]
											})
										})
									] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Requisitos de validez de la respuesta",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Estado de validación",
											children: /* @__PURE__ */ jsx("p", {
												className: `pt-2 text-sm font-medium ${validation.ok ? "text-success" : "text-warning"}`,
												children: validation.message
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Requisitos",
											ancho: "doble",
											children: /* @__PURE__ */ jsxs("div", {
												className: "grid grid-cols-1 gap-2 rounded-md border border-border p-3 md:grid-cols-2",
												children: [
													/* @__PURE__ */ jsx(CheckItem, {
														label: "Tiene firma del sujeto pasivo o representante",
														checked: form.tieneFirma,
														onChange: (checked) => setField("tieneFirma", checked)
													}),
													/* @__PURE__ */ jsx(CheckItem, {
														label: "Adjunta DNI, RUC o documento de identidad",
														checked: form.tieneDocumentoIdentidad,
														onChange: (checked) => setField("tieneDocumentoIdentidad", checked)
													}),
													/* @__PURE__ */ jsx(CheckItem, {
														label: "Acredita titularidad o condición declarada",
														checked: form.acreditaTitularidad,
														onChange: (checked) => setField("acreditaTitularidad", checked)
													}),
													/* @__PURE__ */ jsx(CheckItem, {
														label: "Adjunta los documentos solicitados en la carta",
														checked: form.adjuntaDocumentosSolicitados,
														onChange: (checked) => setField("adjuntaDocumentosSolicitados", checked)
													}),
													/* @__PURE__ */ jsx(CheckItem, {
														label: "Contiene respuesta expresa",
														checked: form.respuestaExpresa,
														onChange: (checked) => setField("respuestaExpresa", checked)
													})
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Observaciones",
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 3,
												className: `${controlClase} h-auto py-2`,
												value: form.observacionValidacion,
												onChange: (e) => setField("observacionValidacion", e.target.value)
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Clasificación formal del predio",
									className: "mt-4",
									children: [/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Clasificación",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											value: form.clasificacion,
											onChange: (e) => setField("clasificacion", e.target.value),
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "PENDIENTE",
													children: "Pendiente"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "TRATO DIRECTO",
													children: "Trato directo"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "EXPROPIACION",
													children: "Expropiación"
												})
											]
										})
									}), /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Responsable",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.responsable,
											onChange: (e) => setField("responsable", e.target.value),
											required: true
										})
									})] }), /* @__PURE__ */ jsx("div", {
										className: "mt-3 flex justify-end",
										children: /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											onClick: suggestClassification,
											children: [/* @__PURE__ */ jsx(FileText, {}), " Sugerir clasificación"]
										})
									})]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsx(FormGrid, {
										columnas: 1,
										children: /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Documento de respuesta (PDF)",
											obligatorio: true,
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: DOC_RESPUESTA,
												catalogoId: "rsp-documento",
												numero: form.numeroDocumento || void 0,
												fecha: form.fechaRecepcion || void 0,
												emisor: form.remitente || void 0
											})
										})
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
										onClick: handleRegisterResponse,
										children: [/* @__PURE__ */ jsx(Send, {}), " Registrar respuesta"]
									})
								] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Respuesta del sujeto pasivo",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setMensaje({
										tipo: "exito",
										texto: `Se restauró la versión ${n}. Quedó como una versión nueva.`
									});
								}
							})
						})
					})
				]
			})
		]
	});
}
function CheckItem({ label, checked, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "flex items-center gap-2 text-sm text-foreground",
		children: [/* @__PURE__ */ jsx("input", {
			type: "checkbox",
			className: "size-4 accent-primary",
			checked,
			onChange: (event) => onChange(event.target.checked)
		}), label]
	});
}
function getDocumentValidation(form, recibido) {
	if (!recibido) return {
		ok: false,
		message: "Suba el documento de respuesta en el campo «Documento de respuesta (PDF)»."
	};
	if (!form.tieneFirma) return {
		ok: false,
		message: "La respuesta debe contar con firma."
	};
	if (!form.tieneDocumentoIdentidad) return {
		ok: false,
		message: "Falta el DNI, RUC o documento de identidad."
	};
	if (!form.acreditaTitularidad) return {
		ok: false,
		message: "Falta acreditar titularidad o condición declarada."
	};
	if (!form.adjuntaDocumentosSolicitados) return {
		ok: false,
		message: "Faltan los documentos solicitados en la carta."
	};
	if (!form.respuestaExpresa) return {
		ok: false,
		message: "Falta la respuesta expresa del sujeto pasivo."
	};
	return {
		ok: true,
		message: "Documento válido para clasificar el procedimiento."
	};
}
//#endregion
export { RespuestaSujetoPasivoPage as component };
