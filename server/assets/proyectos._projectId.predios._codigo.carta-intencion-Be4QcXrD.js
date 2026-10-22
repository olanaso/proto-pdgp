import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, f as vencimiento, g as fechaIso, i as estadoPlazo, n as getProyecto, s as registrarHito, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.carta-intencion-DM7e4C4N.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { t as DestinatariosSujetoPasivo } from "./DestinatariosSujetoPasivo-9-uf7LUo.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Banknote, CalendarDays, CheckCircle2, FileText, History, Mail, MessageCircle, Save, Send, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.carta-intencion.tsx?tsr-split=component
var ETIQUETAS_CARTA = {
	form: "Carta",
	files: "Documento firmado",
	tipoDocumento: "Tipo de documento",
	numeroCarta: "Número de carta u oficio",
	fechaCcp: "Fecha de la certificación presupuestal",
	fechaEmision: "Fecha de emisión",
	montoOfertado: "Monto ofertado",
	incentivo: "Incentivo (20 %)",
	fechaNotificacion: "Fecha de notificación",
	codigoExpedienteTd: "Expediente TD",
	asunto: "Asunto",
	sustento: "Sustento",
	correoRegistrado: "Correo registrado",
	correoManual: "Correo manual",
	whatsappRegistrado: "WhatsApp registrado",
	whatsappManual: "WhatsApp manual",
	responsable: "Responsable",
	canalNotificacion: "Canal",
	comunicacionSatisfactoria: "Comunicación satisfactoria",
	observacionNotificacion: "Observación",
	version: "Versión",
	archivo: "Archivo",
	fecha: "Fecha",
	usuario: "Usuario",
	estado: "Estado"
};
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var ESTADO_TONO = {
	SI: "success",
	NO: "destructive",
	PENDIENTE: "neutral"
};
var ESTADO_TEXTO = {
	SI: "Comunicada",
	NO: "No comunicada",
	PENDIENTE: "Borrador"
};
function CartaIntencionPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const items = useItems();
	const cartaFirmada = Boolean(documentoDelCampo(items, decodedCodigo, "Carta de intención firmada", "ci-carta"));
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const baseCode = (predio?.cod || decodedCodigo).replace(/[^A-Z0-9-]/gi, "").toUpperCase();
	const [mensaje, setMensaje] = useState(null);
	const [form, setForm] = useState({
		tipoDocumento: "CARTA",
		numeroCarta: "",
		fechaCcp: "",
		fechaEmision: fechaIso(/* @__PURE__ */ new Date()),
		montoOfertado: "",
		incentivo: "",
		fechaNotificacion: fechaIso(/* @__PURE__ */ new Date()),
		codigoExpedienteTd: predio?.exp || `TD-${(/* @__PURE__ */ new Date()).getFullYear()}-${baseCode.slice(-6)}`,
		asunto: "Carta de intención de adquisición para trato directo",
		sustento: "Se comunica la intención de adquisición del predio y se solicita al sujeto pasivo presentar la documentación requerida para continuar con el procedimiento.",
		correoRegistrado: "",
		correoManual: "",
		whatsappRegistrado: "",
		whatsappManual: "",
		responsable: proyecto?.coordinadorPredial || "Coordinador predial",
		canalNotificacion: "PENDIENTE",
		comunicacionSatisfactoria: "PENDIENTE",
		observacionNotificacion: ""
	});
	const rol = useRol();
	const claveHistorial = `carta-intencion-${decodedCodigo}`;
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, { form }, (v) => setForm(v.form), {
		modulo: 15,
		entidad: "carta_intencion"
	});
	const recipientEmail = (form.correoManual || form.correoRegistrado).trim();
	const recipientWhatsapp = (form.whatsappManual || form.whatsappRegistrado).replace(/\D/g, "");
	const venceRespuesta = form.fechaNotificacion ? vencimiento(/* @__PURE__ */ new Date(`${form.fechaNotificacion}T00:00:00`), plazo("respuesta_sujeto_pasivo")) : null;
	const plazoCarta = estadoPlazo(useHitosPredio(decodedCodigo), "carta_elaboracion");
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function guardar(accion, objeto, f = form) {
		guardarVersion(accion, objeto, void 0, { form: f });
	}
	function handleEmailNotification() {
		if (!recipientEmail) {
			setMensaje({
				tipo: "error",
				texto: "Ingrese el correo registrado o manual del sujeto pasivo."
			});
			return;
		}
		const canalNotificacion = form.canalNotificacion === "WHATSAPP" ? "MIXTO" : "CORREO";
		setField("canalNotificacion", canalNotificacion);
		registrarEnvio({
			proyecto: projectId,
			predio: decodedCodigo,
			paso: "carta-intencion",
			canal: "Correo",
			destinatario: recipientEmail,
			documento: form.numeroCarta || "Carta de intención"
		}, {
			modulo: 15,
			entidad: "carta_intencion"
		});
		guardar("Notificó por correo", `carta ${form.numeroCarta} a ${recipientEmail}, expediente TD ${form.codigoExpedienteTd}`, {
			...form,
			canalNotificacion
		});
		setMensaje({
			tipo: "exito",
			texto: `Notificación por correo registrada para ${recipientEmail}.`
		});
	}
	function handleWhatsappNotification() {
		if (!recipientWhatsapp) {
			setMensaje({
				tipo: "error",
				texto: "Ingrese el número de WhatsApp registrado o manual."
			});
			return;
		}
		const text = encodeURIComponent(`${form.numeroCarta}: se remite carta de intención de adquisición del predio ${predio?.cod || decodedCodigo}. Expediente TD: ${form.codigoExpedienteTd}.`);
		window.open(`https://wa.me/51${recipientWhatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
		const canalNotificacion = form.canalNotificacion === "CORREO" ? "MIXTO" : "WHATSAPP";
		setField("canalNotificacion", canalNotificacion);
		registrarEnvio({
			proyecto: projectId,
			predio: decodedCodigo,
			paso: "carta-intencion",
			canal: "WhatsApp",
			destinatario: `+51 ${recipientWhatsapp}`,
			documento: form.numeroCarta || "Carta de intención"
		}, {
			modulo: 15,
			entidad: "carta_intencion"
		});
		guardar("Notificó por WhatsApp", `comunicación al número ${recipientWhatsapp}`, {
			...form,
			canalNotificacion
		});
		setMensaje({
			tipo: "exito",
			texto: "WhatsApp abierto con el mensaje de la carta."
		});
	}
	function handleRegisterCommunication() {
		if (!form.fechaNotificacion || !form.codigoExpedienteTd.trim()) {
			setMensaje({
				tipo: "error",
				texto: "Registre la fecha de notificación y el expediente de trámite documentario."
			});
			return;
		}
		if (!cartaFirmada) {
			setMensaje({
				tipo: "aviso",
				texto: "Suba la carta de intención firmada en el campo «Carta de intención firmada (PDF)» antes de cerrar la comunicación."
			});
			return;
		}
		guardar("Registró la comunicación", `fecha ${form.fechaNotificacion}, expediente TD ${form.codigoExpedienteTd}`);
		setMensaje({
			tipo: "exito",
			texto: "Comunicación de la carta de intención registrada."
		});
	}
	function handleSaveDraft() {
		registrarHito(decodedCodigo, "carta_elaboracion", form.fechaCcp ?? "", "carta-intencion", ETIQUETAS_CARTA.fechaCcp);
		guardar("Guardó borrador", `carta ${form.numeroCarta}`);
		setMensaje({
			tipo: "exito",
			texto: `Borrador de la carta ${form.numeroCarta} guardado.`
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
				titulo: "Carta de intención",
				icono: FileText,
				documentos: {
					armar: { "ci-carta": (numero, t) => createCartaIntencionBlob({
						form: {
							...form,
							tipoDocumento: t === "carta" ? "CARTA" : "OFICIO",
							numeroCarta: numero ?? "BORRADOR SIN NUMERAR"
						},
						predio,
						codigo: decodedCodigo,
						projectLabel
					}) },
					destino: { externo: predio?.suj || "" },
					alGenerar: (_, { numero, tipoId }) => {
						const tipoDocumento = tipoId === "carta" ? "CARTA" : "OFICIO";
						const nuevo = {
							...form,
							tipoDocumento,
							numeroCarta: numero ?? form.numeroCarta
						};
						setForm(nuevo);
						guardar(numero ? "Generó el documento numerado" : "Generó borrador sin numerar", `${tipoDocumento.toLowerCase()} ${numero ?? "BORRADOR SIN NUMERAR"}`, nuevo);
						setMensaje({
							tipo: "exito",
							texto: numero ? `${numero} generado y registrado. Revise la descarga.` : "Borrador sin numerar generado. Numérelo antes de notificar."
						});
					}
				},
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: ESTADO_TONO[form.comunicacionSatisfactoria],
					children: ESTADO_TEXTO[form.comunicacionSatisfactoria]
				})
			}),
			/* @__PURE__ */ jsx(DestinatariosSujetoPasivo, {
				projectId,
				codigo: decodedCodigo
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Trato directo · art. 19 a 21 del TUO del DL 1192",
				className: "mb-4",
				children: [/* @__PURE__ */ jsx(Stepper, { pasos: [
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
						estado: "actual",
						detalle: "Art. 20.2 · 20 d.h. desde la tasación · incentivo 20 %"
					},
					{
						nombre: "Respuesta del sujeto pasivo",
						estado: "pendiente",
						detalle: "Art. 20.3 · 15 d.h.",
						to: "/proyectos/$projectId/predios/$codigo/respuesta-sujeto-pasivo",
						params: {
							projectId,
							codigo
						}
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
				] }), venceRespuesta && /* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
					children: ["Plazo del sujeto pasivo para responder (art. 20.3):", /* @__PURE__ */ jsx(PlazoBadge, { vence: venceRespuesta })]
				})]
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
								handleSaveDraft();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									datos: [{
										etiqueta: "Sujeto pasivo",
										valor: predio?.suj || ""
									}]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Datos de la carta",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Tipo de documento",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.tipoDocumento,
												onChange: (e) => setField("tipoDocumento", e.target.value),
												children: [/* @__PURE__ */ jsx("option", {
													value: "CARTA",
													children: "Carta"
												}), /* @__PURE__ */ jsx("option", {
													value: "OFICIO",
													children: "Oficio"
												})]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de carta u oficio",
											ayuda: "Lo asigna el sistema al generar el documento, según la regla de Numeración.",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted font-mono`,
												value: form.numeroCarta || "Se asigna al generar",
												readOnly: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de la certificación presupuestal",
											icono: CalendarDays,
											ayuda: "Al guardar corren 3 d.h. de gestión para elaborar y firmar la carta.",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaCcp ?? "",
												onChange: (e) => setField("fechaCcp", e.target.value)
											})
										}),
										plazoCarta && /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Elaboración y firma",
											children: /* @__PURE__ */ jsx(PlazoBadge, {
												vence: plazoCarta.vence,
												etiqueta: "Plazo de gestión"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de emisión",
											obligatorio: true,
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaEmision,
												onChange: (e) => setField("fechaEmision", e.target.value),
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
											etiqueta: "Responsable",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.responsable,
												onChange: (e) => setField("responsable", e.target.value),
												required: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Monto ofertado",
											obligatorio: true,
											icono: Banknote,
											ayuda: "Valor comercial de la tasación",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												inputMode: "decimal",
												value: form.montoOfertado,
												onChange: (e) => setField("montoOfertado", e.target.value),
												placeholder: "0.00",
												required: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Incentivo (20 %)",
											icono: Banknote,
											ayuda: "Art. 20.2: 20 % del valor comercial",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												inputMode: "decimal",
												value: form.incentivo,
												onChange: (e) => setField("incentivo", e.target.value),
												placeholder: "0.00"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Asunto",
											obligatorio: true,
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.asunto,
												onChange: (e) => setField("asunto", e.target.value),
												required: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Sustento",
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 3,
												className: `${controlClase} h-auto py-2`,
												value: form.sustento,
												onChange: (e) => setField("sustento", e.target.value)
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Notificación y comunicación",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha de notificación",
												obligatorio: true,
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: form.fechaNotificacion,
													onChange: (e) => setField("fechaNotificacion", e.target.value),
													required: true
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Canal",
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: form.canalNotificacion,
													onChange: (e) => setField("canalNotificacion", e.target.value),
													children: [
														/* @__PURE__ */ jsx("option", {
															value: "PENDIENTE",
															children: "Pendiente"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "CORREO",
															children: "Correo"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "WHATSAPP",
															children: "WhatsApp"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "FISICO",
															children: "Físico"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "MIXTO",
															children: "Mixto"
														})
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Correo registrado",
												icono: Mail,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "email",
													className: controlClase,
													value: form.correoRegistrado,
													onChange: (e) => setField("correoRegistrado", e.target.value),
													placeholder: "Correo del sujeto pasivo"
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Correo manual",
												icono: Mail,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "email",
													className: controlClase,
													value: form.correoManual,
													onChange: (e) => setField("correoManual", e.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "WhatsApp registrado",
												icono: MessageCircle,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													inputMode: "tel",
													className: controlClase,
													value: form.whatsappRegistrado,
													onChange: (e) => setField("whatsappRegistrado", e.target.value),
													placeholder: "9 dígitos"
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "WhatsApp manual",
												icono: MessageCircle,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													inputMode: "tel",
													className: controlClase,
													value: form.whatsappManual,
													onChange: (e) => setField("whatsappManual", e.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Comunicación satisfactoria",
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: form.comunicacionSatisfactoria,
													onChange: (e) => setField("comunicacionSatisfactoria", e.target.value),
													children: [
														/* @__PURE__ */ jsx("option", {
															value: "PENDIENTE",
															children: "Pendiente"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "SI",
															children: "Sí"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "NO",
															children: "No"
														})
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Observación",
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("textarea", {
													id,
													rows: 2,
													className: `${controlClase} h-auto py-2`,
													value: form.observacionNotificacion,
													onChange: (e) => setField("observacionNotificacion", e.target.value)
												})
											})
										] }),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-3 flex flex-wrap justify-end gap-2",
											children: [/* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												onClick: handleEmailNotification,
												children: [/* @__PURE__ */ jsx(Mail, {}), " Notificar por correo"]
											}), /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												onClick: handleWhatsappNotification,
												children: [/* @__PURE__ */ jsx(MessageCircle, {}), " Enviar por WhatsApp"]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3",
											children: /* @__PURE__ */ jsx(HistorialEnvios, {
												proyecto: projectId,
												predio: decodedCodigo,
												paso: "carta-intencion",
												editable: true
											})
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, {
										columnas: 1,
										children: [/* @__PURE__ */ jsx(FormField, {
											ancho: "doble",
											etiqueta: "Carta de intención firmada (PDF)",
											obligatorio: true,
											ayuda: "Se genera en «Documentos que genera este paso», arriba del formulario; súbala aquí firmada.",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Carta de intención firmada",
												catalogoId: "ci-carta",
												firmado: true,
												accept: ".pdf",
												numero: form.numeroCarta || void 0,
												fecha: form.fechaEmision || void 0
											})
										}), /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Cargo de notificación",
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Cargo de notificación de la carta de intención",
												catalogoId: "ci-cargo",
												fecha: form.fechaNotificacion || void 0
											})
										})]
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
										onClick: handleRegisterCommunication,
										children: [/* @__PURE__ */ jsx(Send, {}), " Registrar y cerrar"]
									})
								] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico de la carta de intención",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS_CARTA,
								nombreArchivo: `historico-carta-intencion-${decodedCodigo}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setMensaje({
										tipo: "exito",
										texto: `Se restauró la versión ${n}.`
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
function createCartaIntencionBlob({ form, predio, codigo, projectLabel }) {
	const html = `
    <html>
      <head><meta charset="utf-8"><style>${documentStyles()}</style></head>
      <body>
        <h1>${escapeHtml(form.tipoDocumento)} DE INTENCIÓN DE ADQUISICIÓN</h1>
        <p class="right"><b>Nro.:</b> ${escapeHtml(form.numeroCarta)}<br><b>Fecha:</b> ${escapeHtml(form.fechaEmision)}</p>
        <p><b>Proyecto:</b> ${escapeHtml(projectLabel)}</p>
        <p><b>Predio:</b> ${escapeHtml(predio?.cod || codigo)}</p>
        <p><b>Sujeto pasivo:</b> ${escapeHtml(predio?.suj || "SIN INFORMACIÓN")}</p>
        <p><b>Expediente de trámite documentario:</b> ${escapeHtml(form.codigoExpedienteTd)}</p>
        <p><b>Monto ofertado:</b> ${escapeHtml(form.montoOfertado || "PENDIENTE")}</p>
        <p><b>Incentivo:</b> ${escapeHtml(form.incentivo || "NO APLICA")}</p>
        <p><b>Asunto:</b> ${escapeHtml(form.asunto)}</p>
        <p>${escapeHtml(form.sustento)}</p>
        <p>Se solicita presentar la documentación que acredite titularidad, identificación, representación y demás documentos necesarios para evaluar la procedencia del trato directo (art. 20 del TUO del DL 1192).</p>
        <p>La presente comunicación se emite para continuar con el procedimiento de gestión predial correspondiente.</p>
        <br><br>
        <p class="signature">____________________________________<br>${escapeHtml(form.responsable)}<br>Responsable predial</p>
      </body>
    </html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function documentStyles() {
	return `
    body { font-family: Arial, sans-serif; font-size: 11pt; color: rgb(31, 41, 55); line-height: 1.35; }
    h1 { color: rgb(139, 26, 26); font-size: 15pt; text-align: center; margin-bottom: 24px; }
    p { margin: 8px 0; }
    .right { text-align: right; }
    .signature { text-align: center; margin-top: 48px; }
  `;
}
function escapeHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//#endregion
export { CartaIntencionPage as component };
