import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { f as vencimiento, g as fechaIso, h as fechaHora, m as fecha, n as getProyecto, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { U as itemActual, it as useItems, jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { t as MEDIOS } from "./comunicacionAfectacion-DI8RFukP.js";
import { m as MotivoModal, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.comunicacion-afectacion-C71jlhcp.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { t as DestinatariosSujetoPasivo } from "./DestinatariosSujetoPasivo-9-uf7LUo.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, CheckCircle2, FileText, History, Mail, MessageCircle, Plus, Save, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.comunicacion-afectacion.tsx?tsr-split=component
/** Usuario de la sesión cuando no está en Usuarios (correo de ingreso). */
function sesionActual() {
	try {
		return localStorage.getItem("mtc-session") || "Usuario sin sesión";
	} catch {
		return "Usuario sin sesión";
	}
}
var ETIQUETAS_COMUNICACION = {
	form: "Comunicación",
	comunicaciones: "Comunicación realizada",
	medio: "Medio",
	destinatario: "Destinatario",
	documento: "Documento comunicado",
	realizadoPor: "Realizada por",
	registradoPor: "Registrada por",
	registradoEl: "Registrada el",
	anulacion: "Anulación",
	motivo: "Motivo",
	resultado: "Resultado",
	officialDocument: "Documento oficial",
	documentos: "Versión oficial",
	numeroDocumento: "Número de documento",
	tipoDocumento: "Tipo de documento",
	fechaIdentificacion: "Fecha de identificación",
	fechaEmision: "Fecha de emisión",
	asunto: "Asunto",
	sustento: "Sustento",
	correoRegistrado: "Correo registrado",
	correoManual: "Correo manual",
	whatsappRegistrado: "WhatsApp registrado",
	whatsappManual: "WhatsApp manual",
	responsable: "Responsable",
	comunicacionEfectiva: "Comunicación efectiva",
	aceptacion: "Aceptación",
	fechaRespuesta: "Fecha de respuesta",
	observacion: "Observación",
	tipoFirma: "Tipo de firma",
	descripcion: "Descripción",
	version: "Versión",
	archivo: "Archivo",
	tipo: "Tipo",
	size: "Tamaño (bytes)",
	fecha: "Fecha de carga",
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
	SI: "Comunicación efectiva",
	NO: "No efectiva",
	PENDIENTE: "Pendiente"
};
function ComunicacionAfectacionPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const sujetoPasivo = predio?.suj || "Sin información";
	const [mensaje, setMensaje] = useState(null);
	const [form, setForm] = useState({
		numeroDocumento: "",
		tipoDocumento: "Carta",
		fechaIdentificacion: "",
		fechaEmision: fechaIso(/* @__PURE__ */ new Date()),
		asunto: "Comunicación de afectación del predio para liberación predial",
		sustento: "Se comunica la afectación del predio en el marco de las actividades de gestión predial del proyecto, solicitando la atención y respuesta del sujeto pasivo.",
		correoRegistrado: "",
		correoManual: "",
		whatsappRegistrado: "",
		whatsappManual: "",
		responsable: proyecto?.coordinadorPredial || "Coordinador predial"
	});
	const [resultado, setResultado] = useState({
		comunicacionEfectiva: "PENDIENTE",
		aceptacion: "PENDIENTE",
		fechaRespuesta: fechaIso(/* @__PURE__ */ new Date()),
		observacion: ""
	});
	const [comunicaciones, setComunicaciones] = useState([]);
	const [anular, setAnular] = useState(null);
	const nombreUsuario = useUsuarioSesion()?.nombre ?? sesionActual();
	const oficio = itemActual(useItems(), decodedCodigo, "ca-oficio");
	const [nueva, setNueva] = useState({
		medio: "Entrega física",
		fecha: fechaIso(/* @__PURE__ */ new Date()),
		destinatario: "",
		realizadoPor: "",
		observacion: ""
	});
	const vigentes = comunicaciones.filter((c) => c.estado === "vigente");
	const recipientEmail = (form.correoManual || form.correoRegistrado).trim();
	const recipientWhatsapp = (form.whatsappManual || form.whatsappRegistrado).replace(/\D/g, "");
	const statusLabel = resultado.comunicacionEfectiva === "SI" ? "COMUNICACIÓN EFECTIVA" : resultado.comunicacionEfectiva === "NO" ? "NO EFECTIVA" : "PENDIENTE";
	const venceComunicacion = form.fechaIdentificacion ? vencimiento(/* @__PURE__ */ new Date(`${form.fechaIdentificacion}T00:00:00`), plazo("comunicacion")) : null;
	const rol = useRol();
	const claveHistorial = `comunicacion-afectacion-${decodedCodigo}`;
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, {
		form,
		resultado,
		comunicaciones
	}, (v) => {
		setForm(v.form);
		setResultado(v.resultado);
		setComunicaciones(v.comunicaciones ?? []);
	}, {
		modulo: 15,
		entidad: "comunicacion_afectacion"
	});
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	/** Lo que se comunica: el oficio o carta generado (con su código) o el número escrito en el formulario. */
	const documentoComunicado = () => oficio?.numero ?? (form.numeroDocumento ? `${form.tipoDocumento} ${form.numeroDocumento}` : "Sin documento generado");
	function registrarComunicacion(c, accion) {
		const lista = [{
			...c,
			id: `com-${Date.now().toString(36)}`,
			realizadoPor: c.realizadoPor.trim() || nombreUsuario,
			documento: documentoComunicado(),
			registradoPor: nombreUsuario,
			registradoEl: (/* @__PURE__ */ new Date()).toISOString(),
			estado: "vigente"
		}, ...comunicaciones];
		setComunicaciones(lista);
		guardarVersion(accion, `comunicación N.° ${lista.length} por ${c.medio.toLowerCase()} a ${c.destinatario || sujetoPasivo}`, void 0, {
			form,
			resultado,
			comunicaciones: lista
		});
		return lista.length;
	}
	function handleRegistrarComunicacion() {
		if (!nueva.fecha) {
			setMensaje({
				tipo: "error",
				texto: "Indique la fecha de la comunicación."
			});
			return;
		}
		const n = registrarComunicacion({
			...nueva,
			destinatario: nueva.destinatario.trim() || sujetoPasivo
		}, "Registró comunicación");
		setNueva((x) => ({
			...x,
			destinatario: "",
			observacion: ""
		}));
		setMensaje({
			tipo: "exito",
			texto: `Comunicación N.° ${n} registrada.`
		});
	}
	function handleAnular(c, motivo) {
		const lista = comunicaciones.map((x) => x.id === c.id ? {
			...x,
			estado: "anulado",
			anulacion: {
				motivo,
				usuario: nombreUsuario,
				fecha: (/* @__PURE__ */ new Date()).toISOString()
			}
		} : x);
		setComunicaciones(lista);
		guardarVersion("Anuló comunicación", `por ${c.medio.toLowerCase()} del ${fecha(c.fecha)}`, motivo, {
			form,
			resultado,
			comunicaciones: lista
		});
		setMensaje({
			tipo: "exito",
			texto: "Comunicación anulada."
		});
	}
	function handleEmailNotification() {
		if (!recipientEmail) {
			setMensaje({
				tipo: "error",
				texto: "Ingrese un correo registrado o manual para notificar al sujeto pasivo."
			});
			return;
		}
		const n = registrarComunicacion({
			medio: "Correo electrónico",
			destinatario: recipientEmail,
			fecha: fechaIso(/* @__PURE__ */ new Date()),
			realizadoPor: "",
			observacion: ""
		}, "Notificó por correo");
		setMensaje({
			tipo: "exito",
			texto: `Comunicación N.° ${n}: notificación por correo registrada para ${recipientEmail}.`
		});
	}
	function handleWhatsappNotification() {
		if (!recipientWhatsapp) {
			setMensaje({
				tipo: "error",
				texto: "Ingrese un número de WhatsApp registrado o manual para notificar."
			});
			return;
		}
		const text = encodeURIComponent(`${form.tipoDocumento} ${form.numeroDocumento}: se comunica la afectación del predio ${predio?.cod || decodedCodigo}. ${form.asunto}`);
		window.open(`https://wa.me/51${recipientWhatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
		const n = registrarComunicacion({
			medio: "WhatsApp",
			destinatario: recipientWhatsapp,
			fecha: fechaIso(/* @__PURE__ */ new Date()),
			realizadoPor: "",
			observacion: ""
		}, "Notificó por WhatsApp");
		setMensaje({
			tipo: "exito",
			texto: `Comunicación N.° ${n}: WhatsApp abierto con el mensaje.`
		});
	}
	function handleRegisterOutcome() {
		const ultima = vigentes[0];
		const texto = `${ESTADO_TEXTO[resultado.comunicacionEfectiva] ?? statusLabel} · aceptación ${resultado.aceptacion.toLowerCase()}`;
		const lista = ultima ? comunicaciones.map((c) => c.id === ultima.id ? {
			...c,
			resultado: texto
		} : c) : comunicaciones;
		setComunicaciones(lista);
		guardarVersion("Registró el resultado de la comunicación", `${statusLabel.toLowerCase()}, aceptación ${resultado.aceptacion.toLowerCase()}`, void 0, {
			form,
			resultado,
			comunicaciones: lista
		});
		setMensaje({
			tipo: "exito",
			texto: "Resultado de la comunicación registrado en el historial."
		});
	}
	function handleSaveDraft() {
		guardarVersion("Guardó borrador", `${form.tipoDocumento} ${form.numeroDocumento}`);
		setMensaje({
			tipo: "exito",
			texto: "Datos de la comunicación guardados."
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
				titulo: "Comunicación de afectación",
				icono: FileText,
				documentos: {
					armar: {
						"ca-oficio": (numero, t) => createAfectacionWordBlob({
							form: {
								...form,
								tipoDocumento: t === "carta" ? "Carta" : "Oficio",
								numeroDocumento: numero ?? "BORRADOR SIN NUMERAR"
							},
							predio,
							codigo: decodedCodigo,
							projectLabel
						}),
						"ca-constancia": (numero) => createPhysicalDeliveryBlob({
							form,
							numero: numero ?? "BORRADOR SIN NUMERAR",
							predio,
							codigo: decodedCodigo,
							projectLabel
						})
					},
					destino: { externo: predio?.suj || "" },
					alGenerar: (catalogoId, { numero, tipoId }) => {
						if (catalogoId === "ca-constancia") {
							guardarVersion("Generó cargo de entrega física", `constancia ${numero ?? "BORRADOR SIN NUMERAR"}, entrega física al sujeto pasivo`);
							setMensaje({
								tipo: "exito",
								texto: numero ? `Cargo de entrega física ${numero} generado. Revise la descarga.` : "Cargo de entrega física generado sin numerar. Revise la descarga."
							});
							return;
						}
						const tipoDocumento = tipoId === "carta" ? "Carta" : "Oficio";
						const nuevo = {
							...form,
							tipoDocumento,
							numeroDocumento: numero ?? form.numeroDocumento
						};
						setForm(nuevo);
						guardarVersion(numero ? "Generó el documento numerado" : "Generó borrador sin numerar", `${tipoDocumento} ${numero ?? "BORRADOR SIN NUMERAR"} con fecha ${form.fechaEmision}`, void 0, {
							form: nuevo,
							resultado
						});
						setMensaje({
							tipo: "exito",
							texto: numero ? `${numero} generado y registrado. Revise la descarga.` : "Borrador sin numerar generado. Numérelo antes de notificar."
						});
					}
				},
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: ESTADO_TONO[resultado.comunicacionEfectiva],
					children: ESTADO_TEXTO[resultado.comunicacionEfectiva]
				})
			}),
			/* @__PURE__ */ jsx(DestinatariosSujetoPasivo, {
				projectId,
				codigo: decodedCodigo
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Identificación del inmueble · art. 16 del TUO del DL 1192",
				className: "mb-4",
				children: [/* @__PURE__ */ jsx(Stepper, { pasos: [
					{
						nombre: "Identificación del inmueble",
						estado: "completado",
						detalle: "Art. 16.1 · codificación del predio",
						to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
						params: {
							projectId,
							codigo
						}
					},
					{
						nombre: "Certificado de búsqueda catastral",
						estado: "completado",
						detalle: "Art. 16.1 · 15 d.h. SUNARP",
						to: "/proyectos/$projectId/predios/$codigo/cbc",
						params: {
							projectId,
							codigo
						}
					},
					{
						nombre: "Comunicación de afectación",
						estado: "actual",
						detalle: "Art. 16.1 · 10 d.h. desde la identificación"
					},
					{
						nombre: "Anotación preventiva",
						estado: "pendiente",
						detalle: "Art. 16.2 · 10 d.h. desde la comunicación",
						to: "/proyectos/$projectId/predios/$codigo/anotacion-preventiva",
						params: {
							projectId,
							codigo
						}
					}
				] }), venceComunicacion && /* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
					children: ["Plazo para comunicar la afectación (art. 16.1):", /* @__PURE__ */ jsx(PlazoBadge, { vence: venceComunicacion })]
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
				defaultValue: "gestion",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "gestion",
							children: "Gestión"
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
						value: "gestion",
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: (event) => {
								event.preventDefault();
								handleSaveDraft();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									tituloDatos: "Datos del predio y sujeto pasivo",
									datos: [
										{
											etiqueta: "Condición del predio",
											valor: predio?.condicionPredio || ""
										},
										{
											etiqueta: "Sujeto pasivo",
											valor: sujetoPasivo
										},
										{
											etiqueta: "Ubicación",
											valor: [predio?.ciudad, predio?.proyecto].filter(Boolean).join(" / ")
										},
										{
											etiqueta: "Área afectada (m²)",
											valor: predio?.m2 || predio?.area || ""
										}
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documento de comunicación",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de identificación",
											icono: CalendarDays,
											ayuda: "Desde esta fecha corren los 10 d.h. del art. 16.1",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaIdentificacion,
												onChange: (e) => setField("fechaIdentificacion", e.target.value)
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
												children: [/* @__PURE__ */ jsx("option", { children: "Carta" }), /* @__PURE__ */ jsx("option", { children: "Oficio" })]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de documento",
											ayuda: "Lo asigna el sistema al generar el documento, según la regla de Numeración.",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted font-mono`,
												value: form.numeroDocumento || "Se asigna al generar",
												readOnly: true
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
									titulo: "Notificación al sujeto pasivo",
									className: "mt-4",
									children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Correo registrado",
											icono: Mail,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "email",
												className: controlClase,
												value: form.correoRegistrado,
												onChange: (e) => setField("correoRegistrado", e.target.value),
												placeholder: "Correo registrado en el padrón"
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
												onChange: (e) => setField("correoManual", e.target.value),
												placeholder: "Correo alterno"
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
												onChange: (e) => setField("whatsappManual", e.target.value),
												placeholder: "Número alterno"
											})
										})
									] }), /* @__PURE__ */ jsxs("div", {
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
									})]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Comunicaciones realizadas",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-3 text-sm text-muted-foreground",
											children: "Cada comunicación al sujeto pasivo queda aquí con quién la hizo. Las notificaciones por correo y WhatsApp se registran solas; la entrega física, la notarial u otra, con este formulario."
										}),
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Medio",
												children: (id) => /* @__PURE__ */ jsx("select", {
													id,
													className: controlClase,
													value: nueva.medio,
													onChange: (e) => setNueva({
														...nueva,
														medio: e.target.value
													}),
													children: MEDIOS.map((m) => /* @__PURE__ */ jsx("option", { children: m }, m))
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha",
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: nueva.fecha,
													onChange: (e) => setNueva({
														...nueva,
														fecha: e.target.value
													})
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Destinatario",
												ayuda: `Si lo deja vacío: ${sujetoPasivo}.`,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: nueva.destinatario,
													onChange: (e) => setNueva({
														...nueva,
														destinatario: e.target.value
													}),
													placeholder: "Persona, dirección o número"
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Realizada por",
												ayuda: "Si lo deja vacío, se registra su usuario.",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: nueva.realizadoPor,
													onChange: (e) => setNueva({
														...nueva,
														realizadoPor: e.target.value
													}),
													placeholder: nombreUsuario
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Observación",
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: nueva.observacion,
													onChange: (e) => setNueva({
														...nueva,
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
												onClick: handleRegistrarComunicacion,
												children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar comunicación"]
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-4",
											children: /* @__PURE__ */ jsx(Tabla, {
												filas: comunicaciones,
												claveFila: (c) => c.id,
												claseFila: (c) => c.estado === "anulado" ? "text-muted-foreground line-through" : void 0,
												vacio: "Aún no se registró ninguna comunicación.",
												columnas: [
													{
														clave: "n",
														titulo: "N.°",
														ancho: "50px",
														render: (_, i) => comunicaciones.length - i
													},
													{
														clave: "fecha",
														titulo: "Fecha",
														render: (c) => fecha(c.fecha)
													},
													{
														clave: "medio",
														titulo: "Medio"
													},
													{
														clave: "destinatario",
														titulo: "Destinatario",
														render: (c) => /* @__PURE__ */ jsx("span", {
															className: "text-xs",
															children: c.destinatario
														})
													},
													{
														clave: "documento",
														titulo: "Documento",
														render: (c) => /* @__PURE__ */ jsx("span", {
															className: "font-mono text-xs",
															children: c.documento
														})
													},
													{
														clave: "realizadoPor",
														titulo: "Realizada por"
													},
													{
														clave: "registro",
														titulo: "Registrada por",
														render: (c) => /* @__PURE__ */ jsxs("span", {
															className: "text-xs",
															children: [c.registradoPor, /* @__PURE__ */ jsx("span", {
																className: "block text-muted-foreground",
																children: fechaHora(c.registradoEl)
															})]
														})
													},
													{
														clave: "resultado",
														titulo: "Resultado",
														render: (c) => /* @__PURE__ */ jsxs("span", {
															className: "text-xs",
															children: [c.estado === "anulado" ? `Anulada: ${c.anulacion?.motivo ?? ""}` : c.resultado ?? "Pendiente", c.observacion && /* @__PURE__ */ jsx("span", {
																className: "block text-muted-foreground",
																children: c.observacion
															})]
														})
													},
													{
														clave: "acciones",
														titulo: "Acciones",
														render: (c) => c.estado === "vigente" && /* @__PURE__ */ jsxs(Button, {
															type: "button",
															variant: "outline",
															size: "sm",
															onClick: () => setAnular(c),
															children: [/* @__PURE__ */ jsx(X, {}), " Anular"]
														})
													}
												]
											})
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Registro de resultado",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Comunicación efectiva",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: resultado.comunicacionEfectiva,
												onChange: (e) => setResultado((current) => ({
													...current,
													comunicacionEfectiva: e.target.value
												})),
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
											etiqueta: "Aceptación",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: resultado.aceptacion,
												onChange: (e) => setResultado((current) => ({
													...current,
													aceptacion: e.target.value
												})),
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
														value: "DENIEGA",
														children: "Deniega"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "SIN RESPUESTA",
														children: "Sin respuesta"
													})
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de respuesta",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: resultado.fechaRespuesta,
												onChange: (e) => setResultado((current) => ({
													...current,
													fechaRespuesta: e.target.value
												}))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Observación",
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 2,
												className: `${controlClase} h-auto py-2`,
												value: resultado.observacion,
												onChange: (e) => setResultado((current) => ({
													...current,
													observacion: e.target.value
												}))
											})
										})
									] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, {
										columnas: 1,
										children: [/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Cargo de notificación",
											ancho: "doble",
											ayuda: "El oficio o carta se genera en «Documentos que genera este paso», arriba del formulario; aquí se sube el cargo con la recepción del sujeto pasivo.",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Cargo del oficio de comunicación de afectación",
												catalogoId: "ca-cargo",
												numero: form.numeroDocumento || void 0
											})
										}), /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Certificación notarial",
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Certificación notarial del oficio de comunicación",
												catalogoId: "ca-notarial",
												emisor: "Notario"
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
										onClick: handleRegisterOutcome,
										children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Registrar resultado"]
									})
								] })
							]
						})
					}),
					anular && /* @__PURE__ */ jsx(MotivoModal, {
						titulo: "Anular comunicación",
						descripcion: "Queda en la tabla como anulada.",
						accion: "Anular comunicación",
						destructiva: true,
						onCerrar: () => setAnular(null),
						onConfirmar: (motivo) => {
							handleAnular(anular, motivo);
							setAnular(null);
						}
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico de la comunicación de afectación",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS_COMUNICACION,
								nombreArchivo: `historico-comunicacion-afectacion-${decodedCodigo}`,
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
function createAfectacionWordBlob({ form, predio, codigo, projectLabel }) {
	const html = `
    <html>
      <head><meta charset="utf-8"><style>${documentStyles()}</style></head>
      <body>
        <h1>${escapeHtml(form.tipoDocumento.toUpperCase())} DE COMUNICACIÓN DE AFECTACIÓN</h1>
        <p class="right"><b>Nro.:</b> ${escapeHtml(form.numeroDocumento)}<br><b>Fecha:</b> ${escapeHtml(form.fechaEmision)}</p>
        <p><b>Proyecto:</b> ${escapeHtml(projectLabel)}</p>
        <p><b>Predio:</b> ${escapeHtml(predio?.cod || codigo)}</p>
        <p><b>Sujeto pasivo:</b> ${escapeHtml(predio?.suj || "SIN INFORMACIÓN")}</p>
        <p><b>Ubicación:</b> ${escapeHtml([predio?.ciudad, predio?.proyecto].filter(Boolean).join(" / ") || "Sin información")}</p>
        <p><b>Área afectada:</b> ${escapeHtml(predio?.m2 || predio?.area || "Sin información")} m2</p>
        <p><b>Asunto:</b> ${escapeHtml(form.asunto)}</p>
        <p>${escapeHtml(form.sustento)}</p>
        <p>Por medio del presente documento se comunica al sujeto pasivo la afectación del predio indicado, a fin de continuar con el procedimiento de gestión predial correspondiente.</p>
        <p>Se solicita tomar conocimiento de la presente comunicación y emitir la respuesta que corresponda dentro del plazo aplicable.</p>
        <br><br>
        <p class="signature">____________________________________<br>${escapeHtml(form.responsable)}<br>Responsable predial</p>
      </body>
    </html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function createPhysicalDeliveryBlob({ form, numero, predio, codigo, projectLabel }) {
	const html = `
    <html>
      <head><meta charset="utf-8"><style>${documentStyles()}</style></head>
      <body>
        <h1>CARGO DE ENTREGA FÍSICA</h1>
        <p class="right"><b>Nro.:</b> ${escapeHtml(numero)}</p>
        <p><b>Documento entregado:</b> ${escapeHtml(form.tipoDocumento)} ${escapeHtml(form.numeroDocumento)}</p>
        <p><b>Proyecto:</b> ${escapeHtml(projectLabel)}</p>
        <p><b>Predio:</b> ${escapeHtml(predio?.cod || codigo)}</p>
        <p><b>Sujeto pasivo:</b> ${escapeHtml(predio?.suj || "SIN INFORMACIÓN")}</p>
        <p><b>Fecha de emisión:</b> ${escapeHtml(form.fechaEmision)}</p>
        <table>
          <tr><th>Fecha de entrega</th><th>Hora</th><th>Persona que recibe</th><th>DNI</th><th>Firma</th></tr>
          <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
        </table>
        <p><b>Observaciones de entrega:</b></p>
        <p class="box">&nbsp;</p>
      </body>
    </html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function documentStyles() {
	return `
    body { font-family: Arial, sans-serif; font-size: 11pt; color: black; line-height: 1.35; }
    h1 { color: darkred; font-size: 15pt; text-align: center; margin-bottom: 24px; }
    p { margin: 8px 0; }
    .right { text-align: right; }
    .signature { text-align: center; margin-top: 48px; }
    table { width: 100%; border-collapse: collapse; margin-top: 14px; }
    th, td { border: 1px solid gray; padding: 8px; font-size: 10pt; }
    th { background: whitesmoke; }
    .box { min-height: 90px; border: 1px solid gray; }
  `;
}
function escapeHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//#endregion
export { ComunicacionAfectacionPage as component };
