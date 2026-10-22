import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, f as vencimiento, g as fechaIso, h as fechaHora, i as estadoPlazo, m as fecha, n as getProyecto, s as registrarHito, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { Dt as BotonIcono, E as Modal, n as etiquetaProyecto, t as PredioEncabezado, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.anotacion-preventiva-XfHoTgh0.js";
import { n as useAlmacen } from "./almacen-BgvL3X8T.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, CalendarDays, CheckCircle2, Copy, Download, ExternalLink, FileArchive, Landmark, Link2, Plus, Save, Send, Trash2, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.anotacion-preventiva.tsx?tsr-split=component
var SUNARP_LINK = "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio";
var NOMBRE_SUBSANACION = "Documento de subsanación de observaciones de la anotación preventiva";
var NOMBRE_ASIENTO = "Asiento de inscripción de la anotación preventiva";
var PASO = "anotacion-preventiva";
var COMUNICACION_VACIA = {
	entidades: [],
	fechaSujeto: "",
	documentoSujeto: "",
	medioSujeto: ""
};
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var ALERTA_CLASE = {
	success: "border-success bg-success-soft text-success",
	warning: "border-warning bg-warning-soft text-warning",
	destructive: "border-destructive bg-destructive-soft text-destructive",
	primary: "border-primary bg-primary-soft text-primary-dark",
	neutral: "border-border bg-muted text-muted-foreground"
};
var STATUS_OPTIONS = [
	"PENDIENTE",
	"GENERADO",
	"LISTO PARA PRESENTAR",
	"PRESENTADO",
	"OBSERVADO",
	"SUBSANADO",
	"INSCRITO",
	"TACHADO",
	"CANCELADO"
];
var STATUS_TONO = {
	PENDIENTE: "neutral",
	GENERADO: "primary",
	"LISTO PARA PRESENTAR": "primary",
	PRESENTADO: "primary",
	OBSERVADO: "warning",
	SUBSANADO: "primary",
	INSCRITO: "success",
	TACHADO: "destructive",
	CANCELADO: "destructive"
};
var DOCUMENTS = [
	{
		id: "solicitud",
		label: "Solicitud de anotación preventiva",
		fileName: "solicitud_anotacion_preventiva",
		description: "Solicitud principal para presentar ante SUNARP."
	},
	{
		id: "oficio",
		label: "Oficio de remisión",
		fileName: "oficio_remision_sunarp",
		description: "Oficio dirigido a la oficina registral competente."
	},
	{
		id: "resumen",
		label: "Hoja resumen",
		fileName: "hoja_resumen_expediente",
		description: "Resumen ejecutivo del expediente registral."
	},
	{
		id: "indice",
		label: "Índice de anexos",
		fileName: "indice_anexos",
		description: "Relación ordenada de anexos y documentos de soporte."
	},
	{
		id: "relacion",
		label: "Relación de predios afectados",
		fileName: "relacion_predios_afectados",
		description: "Listado de predios vinculados al trámite."
	},
	{
		id: "consolidado",
		label: "Expediente consolidado",
		fileName: "expediente_consolidado_anotacion",
		description: "Paquete consolidado para revisión y presentación."
	}
];
function today() {
	return fechaIso(/* @__PURE__ */ new Date());
}
function timestamp() {
	return fechaHora(/* @__PURE__ */ new Date());
}
function AnotacionPreventivaPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const displayCode = predio?.cod || decodedCodigo;
	const safeCode = safeFileName(displayCode);
	const initialStatus = statusFromPredio(predio?.etit);
	const [copied, setCopied] = useState(null);
	const [message, setMessage] = useState(null);
	const [form, setForm] = useState({
		status: initialStatus,
		expedienteId: predio?.exp || `AP-${(/* @__PURE__ */ new Date()).getFullYear()}-${safeCode.slice(-6)}`,
		solicitudNumber: `SOL-AP-${(/* @__PURE__ */ new Date()).getFullYear()}-${safeCode.slice(-5)}`,
		oficioNumber: "",
		presentationMode: "Mesa de partes SUNARP",
		responsible: proyecto?.coordinadorPredial || predio?.rlegal || "Especialista legal",
		office: predio?.ofi || officeForLocation(predio?.ciudad),
		titleNumber: predio?.titulo && predio.titulo !== "-" ? predio.titulo : "",
		presentationDate: normalizeDate(predio?.ftit) || today(),
		observations: predio?.etit?.toUpperCase().includes("OBSERV") ? predio?.com || "Pendiente levantar observaciones." : "",
		registrySeat: predio?.pind || predio?.part || "",
		inscriptionDate: normalizeDate(predio?.finsc),
		lastUpdate: today()
	});
	const [trace, setTrace] = useState([{
		id: "trace-inicial",
		date: timestamp(),
		user: "Sistema",
		previousStatus: "PENDIENTE",
		newStatus: initialStatus,
		document: "Registro base",
		detail: `Se inició el seguimiento de la anotación preventiva del predio ${displayCode}.`
	}]);
	const hitos = useHitosPredio(decodedCodigo);
	const plazoSunarp = estadoPlazo(hitos, "anotacion_sunarp");
	const plazoEntidades = estadoPlazo(hitos, "comunicacion_entidades");
	const [comGuardada, setComGuardada] = useAlmacen(`pdgp-form-anotacion-comunicacion-${decodedCodigo}`, COMUNICACION_VACIA);
	const [comBorrador, setComBorrador] = useState(null);
	const com = comBorrador ?? comGuardada;
	const setCom = (cambio) => setComBorrador({
		...com,
		...cambio
	});
	const items = useItems();
	const subsanacion = documentoDelCampo(items, decodedCodigo, NOMBRE_SUBSANACION);
	const constancia = documentoDelCampo(items, decodedCodigo, NOMBRE_ASIENTO, "ap-asiento");
	const datos = {
		...form,
		correctionDocument: subsanacion?.folio ?? "",
		registrationCertificate: constancia?.folio ?? ""
	};
	const progress = useMemo(() => progressFromStatus(form.status), [form.status]);
	const alerts = buildAlerts(datos);
	const venceOrden = form.presentationDate ? vencimiento(/* @__PURE__ */ new Date(`${form.presentationDate}T00:00:00`), plazo("anotacion_preventiva")) : null;
	const venceVigencia = form.inscriptionDate ? vencimiento(/* @__PURE__ */ new Date(`${form.inscriptionDate}T00:00:00`), plazo("anotacion_vigencia")) : null;
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function addTrace(newStatus, document, detail) {
		setTrace((current) => [{
			id: `trace-${Date.now()}-${current.length}`,
			date: timestamp(),
			user: form.responsible || "Usuario predial",
			previousStatus: form.status,
			newStatus,
			document,
			detail
		}, ...current]);
	}
	function updateStatus(nextStatus, document, detail) {
		addTrace(nextStatus, document, detail);
		setForm((current) => ({
			...current,
			status: nextStatus,
			lastUpdate: today()
		}));
	}
	function handleMarkReady() {
		updateStatus("LISTO PARA PRESENTAR", "Expediente documental", "El expediente fue marcado como listo para presentar ante SUNARP.");
		setMessage({
			tipo: "exito",
			texto: "Expediente listo para presentar ante SUNARP."
		});
	}
	function handleRegisterPresentation() {
		updateStatus("PRESENTADO", "Presentación SUNARP", `Título ${form.titleNumber || "pendiente"} presentado en ${form.office}.`);
		registrarEnvio({
			proyecto: projectId,
			predio: decodedCodigo,
			paso: PASO,
			canal: "SUNARP · presentación de título",
			destinatario: form.office || "Oficina registral",
			documento: form.titleNumber ? `Título ${form.titleNumber}` : "Solicitud de anotación"
		}, {
			modulo: 11,
			entidad: "anotacion_preventiva"
		});
		setMessage({
			tipo: "exito",
			texto: "Presentación ante SUNARP registrada en el historial."
		});
	}
	function handleSave() {
		registrarHito(decodedCodigo, "anotacion_sunarp", form.presentationDate, PASO, "Solicitud de la anotación a SUNARP");
		registrarHito(decodedCodigo, "comunicacion_entidades", form.inscriptionDate, PASO, "Inscripción y notificación de SUNARP");
		setComGuardada(com);
		setComBorrador(null);
		addTrace(form.status, "Guardado", "Se guardó la información del seguimiento de la anotación preventiva.");
		setMessage({
			tipo: "exito",
			texto: "Seguimiento de la anotación preventiva guardado."
		});
	}
	function handleDownloadConsolidated() {
		descargarBlob(`expediente_consolidado_anotacion_preventiva_${safeCode}.pdf`, createConsolidatedPdf(datos, trace, predio, projectLabel, displayCode, safeCode));
		updateStatus(form.status === "PENDIENTE" ? "GENERADO" : form.status, "PDF consolidado", "Se exportó el expediente consolidado en PDF.");
		setMessage({
			tipo: "exito",
			texto: "Expediente consolidado exportado en PDF."
		});
	}
	async function handleDownloadZip() {
		const pdfFiles = await Promise.all(DOCUMENTS.map(async (document) => {
			const blob = document.id === "oficio" ? createOficioWordBlob(form, predio, projectLabel, displayCode) : createDocumentPdf(document, form, predio, projectLabel, displayCode);
			return {
				name: generatedFileName(document, safeCode),
				data: new Uint8Array(await blob.arrayBuffer())
			};
		}));
		const metadata = new TextEncoder().encode(buildMetadata(datos, trace, predio, displayCode, safeCode));
		const zip = createZipBlob([
			...pdfFiles,
			{
				name: `metadata_anotacion_preventiva_${safeCode}.txt`,
				data: metadata
			},
			{
				name: `anexos_${safeCode}.txt`,
				data: new TextEncoder().encode(buildAnnexText(predio, datos))
			}
		]);
		descargarBlob(`paquete_anotacion_preventiva_${safeCode}.zip`, zip);
		updateStatus(form.status === "PENDIENTE" ? "GENERADO" : form.status, "ZIP expediente", "Se exportó el ZIP con documentos, anexos y metadata.");
		setMessage({
			tipo: "exito",
			texto: "Paquete ZIP con anexos exportado."
		});
	}
	async function handleCopySummary() {
		await copyTextToClipboard(buildCopySummary(datos, predio, displayCode));
		markCopied("summary");
	}
	async function handleCopySunarpLink() {
		await copyTextToClipboard(SUNARP_LINK);
		markCopied("sunarp");
	}
	function markCopied(key) {
		setCopied(key);
		window.setTimeout(() => {
			setCopied((current) => current === key ? null : current);
		}, 1600);
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
				titulo: "Anotación preventiva",
				icono: Landmark,
				documentos: {
					armar: { "ap-oficio": (numero) => createOficioWordBlob({
						...form,
						oficioNumber: numero ?? "BORRADOR SIN NUMERAR"
					}, predio, projectLabel, displayCode) },
					destino: { externo: form.office || "SUNARP" },
					alGenerar: (_, { numero }) => {
						if (numero) setField("oficioNumber", numero);
						updateStatus(form.status === "PENDIENTE" ? "GENERADO" : form.status, "Oficio de remisión", "Oficio de remisión generado para exportación.");
						setMessage({
							tipo: "exito",
							texto: numero ? `${numero} generado y registrado. Revise la descarga.` : "Borrador sin numerar generado. Numérelo antes de presentar."
						});
					}
				},
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: STATUS_TONO[form.status],
					children: form.status
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "anotacion-preventiva",
				projectId,
				codigo: decodedCodigo,
				extra: (venceOrden || venceVigencia || plazoSunarp || plazoEntidades) && /* @__PURE__ */ jsxs(Fragment$1, { children: [
					venceOrden && /* @__PURE__ */ jsx(PlazoBadge, {
						etiqueta: "Anotación preventiva (art. 16.2, 10 d.h.)",
						vence: venceOrden
					}),
					venceVigencia && /* @__PURE__ */ jsx(PlazoBadge, {
						etiqueta: "Vigencia de la anotación (1 año)",
						vence: venceVigencia
					}),
					plazoSunarp && /* @__PURE__ */ jsx(PlazoBadge, {
						etiqueta: "Inscripción por SUNARP (art. 5.5.d, 7 d.h.)",
						vence: plazoSunarp.vence
					}),
					plazoEntidades && /* @__PURE__ */ jsx(PlazoBadge, {
						etiqueta: "Comunicación a las entidades (art. 5, 10 d.h.)",
						vence: plazoEntidades.vence
					})
				] })
			}),
			message && /* @__PURE__ */ jsxs("p", {
				role: message.tipo === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[message.tipo]}`,
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
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
			/* @__PURE__ */ jsxs("form", {
				onSubmit: (event) => {
					event.preventDefault();
					handleSave();
				},
				children: [
					/* @__PURE__ */ jsx(InformacionPredio, {
						projectId,
						codigo: decodedCodigo,
						tituloDatos: "Datos del expediente",
						datos: [
							{
								etiqueta: "Sujeto pasivo",
								valor: predio?.suj || ""
							},
							{
								etiqueta: "Acto administrativo",
								valor: predio?.nres || predio?.res || "Pendiente de registro"
							},
							{
								etiqueta: "Partida registral",
								valor: predio?.part || predio?.pind || ""
							},
							{
								etiqueta: "Área afectada (m²)",
								valor: predio?.m2 || predio?.area || ""
							},
							{
								etiqueta: "Memoria y planos",
								valor: `Plano y memoria descriptiva asociados a ${displayCode}`
							}
						]
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Control del trámite registral",
						className: "mt-4",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Estado del trámite",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsx("select", {
									id,
									className: controlClase,
									value: form.status,
									onChange: (event) => updateStatus(event.target.value, "Cambio manual", "Estado actualizado desde el formulario."),
									children: STATUS_OPTIONS.map((status) => /* @__PURE__ */ jsx("option", {
										value: status,
										children: status
									}, status))
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Expediente",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.expedienteId,
									onChange: (event) => setField("expedienteId", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Solicitud",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.solicitudNumber,
									onChange: (event) => setField("solicitudNumber", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Oficio",
								ayuda: "Se asigna al generar el oficio de remisión.",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: `${controlClase} bg-muted font-mono`,
									value: form.oficioNumber || "Sin generar",
									readOnly: true
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Modo de presentación",
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									className: controlClase,
									value: form.presentationMode,
									onChange: (event) => setField("presentationMode", event.target.value),
									children: [
										/* @__PURE__ */ jsx("option", { children: "Mesa de partes SUNARP" }),
										/* @__PURE__ */ jsx("option", { children: "SID SUNARP" }),
										/* @__PURE__ */ jsx("option", { children: "Ventanilla registral" }),
										/* @__PURE__ */ jsx("option", { children: "Presentación por notaría" })
									]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Responsable",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.responsible,
									onChange: (event) => setField("responsible", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Avance",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex h-9 items-center gap-2",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-1.5 flex-1 overflow-hidden rounded-sm bg-muted",
										role: "progressbar",
										"aria-valuenow": progress,
										"aria-valuemin": 0,
										"aria-valuemax": 100,
										"aria-label": "Avance del trámite",
										children: /* @__PURE__ */ jsx("div", {
											className: "h-full bg-primary",
											style: { width: `${progress}%` }
										})
									}), /* @__PURE__ */ jsxs("span", {
										className: "w-12 text-right text-sm font-medium tabular-nums",
										children: [progress, " %"]
									})]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Última actualización",
								icono: CalendarDays,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "date",
									className: controlClase,
									value: form.lastUpdate,
									onChange: (event) => setField("lastUpdate", event.target.value)
								})
							})
						] })
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Paquete para la presentación",
						className: "mt-4",
						acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: handleDownloadConsolidated,
							children: [/* @__PURE__ */ jsx(Download, {}), " Exportar PDF consolidado"]
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => void handleDownloadZip(),
							children: [/* @__PURE__ */ jsx(FileArchive, {}), " Exportar ZIP con anexos"]
						})] }),
						children: /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "El oficio de remisión se genera en «Documentos que genera este paso», al final del formulario; el asiento de inscripción y la subsanación se suben en sus campos de Seguimiento ante SUNARP. El ZIP reúne la solicitud, el oficio, la hoja resumen, el índice de anexos y la relación de predios para presentarlos ante SUNARP."
						})
					}),
					/* @__PURE__ */ jsxs(Section, {
						titulo: "Seguimiento ante SUNARP",
						className: "mt-4",
						children: [
							/* @__PURE__ */ jsxs(FormGrid, { children: [
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Consulta SUNARP",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ jsx(Button, {
											asChild: true,
											variant: "outline",
											children: /* @__PURE__ */ jsxs("a", {
												href: SUNARP_LINK,
												target: "_blank",
												rel: "noreferrer",
												children: [/* @__PURE__ */ jsx(ExternalLink, {}), " Consultar en SUNARP"]
											})
										}), /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											onClick: () => void handleCopySunarpLink(),
											children: [
												/* @__PURE__ */ jsx(Link2, {}),
												" ",
												copied === "sunarp" ? "Enlace copiado" : "Copiar enlace"
											]
										})]
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Número de título",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: controlClase,
										value: form.titleNumber,
										onChange: (event) => setField("titleNumber", event.target.value),
										placeholder: "Pegar el número de título SUNARP"
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Oficina registral",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: controlClase,
										value: form.office,
										onChange: (event) => setField("office", event.target.value)
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Solicitud a SUNARP",
									icono: CalendarDays,
									ayuda: "Fecha de presentación. Al guardar corren 7 d.h. para que SUNARP inscriba y notifique.",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										type: "date",
										className: controlClase,
										value: form.presentationDate,
										onChange: (event) => setField("presentationDate", event.target.value)
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Asiento registral",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: controlClase,
										value: form.registrySeat,
										onChange: (event) => setField("registrySeat", event.target.value),
										placeholder: "Pegar el asiento registral"
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Inscripción y notificación de SUNARP",
									icono: CalendarDays,
									ayuda: "Al guardar corren 10 d.h. para comunicar la anotación a las entidades (art. 5).",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										type: "date",
										className: controlClase,
										value: form.inscriptionDate,
										onChange: (event) => setField("inscriptionDate", event.target.value)
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Asiento de inscripción (PDF)",
									obligatorio: form.status === "INSCRITO",
									children: () => /* @__PURE__ */ jsx(CampoDocumento, {
										projectId,
										codigo: decodedCodigo,
										nombre: NOMBRE_ASIENTO,
										catalogoId: "ap-asiento",
										accept: ".pdf",
										emisor: "SUNARP",
										numero: form.registrySeat || void 0,
										fecha: form.inscriptionDate || void 0
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Documento de subsanación",
									obligatorio: form.status === "OBSERVADO",
									children: () => /* @__PURE__ */ jsx(CampoDocumento, {
										projectId,
										codigo: decodedCodigo,
										nombre: NOMBRE_SUBSANACION
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Observaciones",
									ancho: "doble",
									children: (id) => /* @__PURE__ */ jsx("textarea", {
										id,
										rows: 3,
										className: `${controlClase} h-auto py-2`,
										value: form.observations,
										onChange: (event) => setField("observations", event.target.value),
										placeholder: "Pegar observaciones de SUNARP o detalle de tacha o subsanación"
									})
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-3 flex flex-wrap justify-end gap-2",
								children: [/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: () => void handleCopySummary(),
									children: [
										/* @__PURE__ */ jsx(Copy, {}),
										" ",
										copied === "summary" ? "Datos copiados" : "Copiar datos para SUNARP"
									]
								}), /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: handleRegisterPresentation,
									children: [/* @__PURE__ */ jsx(Send, {}), " Registrar presentación"]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-3",
								children: /* @__PURE__ */ jsx(HistorialEnvios, {
									proyecto: projectId,
									predio: decodedCodigo,
									paso: PASO,
									editable: true
								})
							})
						]
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Comunicación de la anotación",
						className: "mt-4",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Entidades comunicadas",
								ancho: "doble",
								children: (id) => /* @__PURE__ */ jsx(ListaEntidades, {
									id,
									filas: com.entidades,
									onCambio: (entidades) => setCom({ entidades })
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Comunicación al sujeto pasivo",
								icono: CalendarDays,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "date",
									className: controlClase,
									value: com.fechaSujeto,
									onChange: (event) => setCom({ fechaSujeto: event.target.value })
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Documento al sujeto pasivo",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: com.documentoSujeto,
									onChange: (event) => setCom({ documentoSujeto: event.target.value }),
									placeholder: "Carta u oficio"
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Medio de notificación",
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									className: controlClase,
									value: com.medioSujeto,
									onChange: (event) => setCom({ medioSujeto: event.target.value }),
									children: [
										/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Seleccione"
										}),
										/* @__PURE__ */ jsx("option", { children: "Notificación personal" }),
										/* @__PURE__ */ jsx("option", { children: "Notarial" }),
										/* @__PURE__ */ jsx("option", { children: "Correo electrónico" }),
										/* @__PURE__ */ jsx("option", { children: "Publicación" })
									]
								})
							})
						] })
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Alertas del trámite",
						className: "mt-4",
						children: /* @__PURE__ */ jsx("div", {
							className: "grid gap-2 md:grid-cols-2",
							children: alerts.map((alert) => /* @__PURE__ */ jsxs("p", {
								role: "status",
								className: `rounded-md border px-3 py-2 text-sm ${ALERTA_CLASE[alert.tono]}`,
								children: [/* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-2 font-semibold",
									children: [/* @__PURE__ */ jsx(AlertTriangle, {
										size: 16,
										"aria-hidden": true
									}), alert.title]
								}), /* @__PURE__ */ jsx("span", {
									className: "mt-1 block text-xs",
									children: alert.detail
								})]
							}, alert.title))
						})
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Trazabilidad",
						className: "mt-4",
						children: /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "date",
									titulo: "Fecha",
									ancho: "150px"
								},
								{
									clave: "user",
									titulo: "Usuario"
								},
								{
									clave: "previousStatus",
									titulo: "Estado anterior"
								},
								{
									clave: "newStatus",
									titulo: "Estado nuevo",
									render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
										tono: STATUS_TONO[r.newStatus],
										children: r.newStatus
									})
								},
								{
									clave: "document",
									titulo: "Documento adjunto"
								},
								{
									clave: "detail",
									titulo: "Detalle"
								}
							],
							filas: trace,
							claveFila: (r) => r.id
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
							type: "button",
							variant: "outline",
							onClick: handleMarkReady,
							children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Marcar listo para presentar"]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar seguimiento"]
						})
					] })
				]
			})
		]
	});
}
/** Entidades a las que se comunicó la anotación: alta en línea y baja con motivo. */
function ListaEntidades({ id, filas, onCambio }) {
	const vacia = {
		entidad: "",
		oficio: "",
		fecha: ""
	};
	const [nueva, setNueva] = useState(vacia);
	const [quitar, setQuitar] = useState(null);
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs("div", {
		id,
		children: [
			filas.some((f) => !f.bajaMotivo) && /* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "entidad",
						titulo: "Entidad"
					},
					{
						clave: "oficio",
						titulo: "Oficio"
					},
					{
						clave: "fecha",
						titulo: "Fecha",
						ancho: "120px",
						render: (f) => f.fecha ? fecha(f.fecha) : "Sin dato"
					},
					{
						clave: "accion",
						titulo: "Acción",
						ancho: "80px",
						render: (f) => /* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Quitar entidad",
							icono: Trash2,
							destructiva: true,
							onClick: () => setQuitar(f.i)
						})
					}
				],
				filas: filas.map((f, i) => ({
					...f,
					i
				})).filter((f) => !f.bajaMotivo),
				claveFila: (f) => String(f.i)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 rounded-md border border-dashed border-border p-3",
				children: [/* @__PURE__ */ jsx(FormGrid, { children: [
					[
						"entidad",
						"Entidad",
						"text"
					],
					[
						"oficio",
						"Oficio",
						"text"
					],
					[
						"fecha",
						"Fecha",
						"date"
					]
				].map(([clave, titulo, tipo]) => /* @__PURE__ */ jsx(FormField, {
					etiqueta: titulo,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: tipo,
						className: controlClase,
						value: nueva[clave],
						onChange: (e) => setNueva((n) => ({
							...n,
							[clave]: e.target.value
						}))
					})
				}, clave)) }), /* @__PURE__ */ jsx("div", {
					className: "mt-3 flex justify-end",
					children: /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: !nueva.entidad.trim(),
						onClick: () => {
							onCambio([...filas, nueva]);
							setNueva(vacia);
						},
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar entidad"]
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Modal, {
				abierto: quitar !== null,
				onCerrar: () => setQuitar(null),
				ancho: "sm",
				titulo: "Quitar entidad",
				descripcion: "La entidad sale de la lista; el registro conserva sus datos y el motivo.",
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setQuitar(null),
					children: "Cancelar"
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "destructive",
					disabled: motivo.trim().length < 5,
					onClick: () => {
						if (quitar !== null) onCambio(filas.map((f, i) => i === quitar ? {
							...f,
							bajaMotivo: motivo.trim()
						} : f));
						setQuitar(null);
						setMotivo("");
					},
					children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar"]
				})] }),
				children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: "motivo-quitar-entidad",
					className: "mb-1 block text-sm font-medium",
					children: ["Motivo ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("textarea", {
					id: "motivo-quitar-entidad",
					rows: 3,
					className: `${controlClase} h-auto py-2`,
					value: motivo,
					onChange: (e) => setMotivo(e.target.value)
				})]
			})
		]
	});
}
function buildAlerts(form) {
	const alerts = [];
	if (form.status === "OBSERVADO" && !form.correctionDocument) alerts.push({
		title: "Observación pendiente",
		detail: "Suba el documento de subsanación en el campo «Documento de subsanación» y actualice el estado a subsanado.",
		tono: "destructive"
	});
	if ([
		"PRESENTADO",
		"OBSERVADO",
		"SUBSANADO"
	].includes(form.status) && daysSince(form.lastUpdate) >= 7) alerts.push({
		title: "Sin actualización",
		detail: "El trámite registra siete o más días sin actualización. Verifique el título en SUNARP.",
		tono: "warning"
	});
	if (form.status === "INSCRITO" && (!form.registrySeat || !form.inscriptionDate)) alerts.push({
		title: "Inscripción incompleta",
		detail: "Complete el asiento registral y la fecha de inscripción para cerrar el seguimiento.",
		tono: "warning"
	});
	if (alerts.length === 0) alerts.push({
		title: "Sin alertas críticas",
		detail: "El trámite no presenta observaciones ni vencimientos pendientes.",
		tono: "success"
	});
	return alerts;
}
function generatedFileName(document, safeCode) {
	return `${document.fileName}_${safeCode}.${document.id === "oficio" ? "doc" : "pdf"}`;
}
function createDocumentPdf(document, form, predio, projectLabel, displayCode) {
	const lines = [
		document.label.toUpperCase(),
		"",
		`Expediente: ${form.expedienteId}`,
		`Solicitud: ${form.solicitudNumber}`,
		`Oficio: ${form.oficioNumber || "Pendiente"}`,
		`Proyecto: ${projectLabel}`,
		`Código de predio: ${displayCode}`,
		`Sujeto pasivo: ${predio?.suj || "Sin información"}`,
		`Acto administrativo: ${predio?.nres || predio?.res || "Pendiente"}`,
		`Partida registral: ${predio?.part || predio?.pind || "Sin información"}`,
		`Área afectada m2: ${predio?.m2 || predio?.area || "Sin información"}`,
		`Oficina registral: ${form.office}`,
		`Estado del trámite: ${form.status}`,
		"",
		document.description,
		"El documento se genera con la información registrada del proyecto, predio, acto administrativo, planos y memoria descriptiva.",
		"Incluye metadata de expediente para presentación y control registral."
	];
	return createSimplePdfBlob(document.label, lines);
}
function createOficioWordBlob(form, predio, projectLabel, displayCode) {
	const html = `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>${wordDocumentStyles()}</style>
      </head>
      <body>
        <p class="right"><b>${escapeHtml(form.oficioNumber || "BORRADOR SIN NUMERAR")}</b></p>
        <p class="right">Lima, ${escapeHtml(formatDatePe(form.lastUpdate))}</p>

        <p><b>Señor(a):</b><br>
        Registrador Público<br>
        ${escapeHtml(form.office)}<br>
        Superintendencia Nacional de los Registros Públicos - SUNARP</p>

        <p><b>Asunto:</b> Solicitud de inscripción de anotación preventiva del predio ${escapeHtml(displayCode)}.</p>
        <p><b>Referencia:</b> Expediente ${escapeHtml(form.expedienteId)} - Solicitud ${escapeHtml(form.solicitudNumber)}.</p>

        <p>De mi consideración:</p>
        <p>
          Me dirijo a usted para remitir el expediente correspondiente y solicitar la inscripción
          de la anotación preventiva vinculada al procedimiento de gestión predial del proyecto
          ${escapeHtml(projectLabel)}, respecto del predio identificado con código
          ${escapeHtml(displayCode)}.
        </p>
        <p>
          La solicitud se sustenta en la información técnica, legal y registral registrada en el
          sistema, incluyendo el acto administrativo, planos, memoria descriptiva y anexos que
          forman parte del expediente.
        </p>

        <table>
          <tr><th>Campo</th><th>Detalle</th></tr>
          <tr><td>Código de predio</td><td>${escapeHtml(displayCode)}</td></tr>
          <tr><td>Sujeto pasivo</td><td>${escapeHtml(predio?.suj || "Sin información")}</td></tr>
          <tr><td>Partida registral</td><td>${escapeHtml(predio?.part || predio?.pind || "Sin información")}</td></tr>
          <tr><td>Acto administrativo</td><td>${escapeHtml(predio?.nres || predio?.res || "Pendiente")}</td></tr>
          <tr><td>Área afectada m2</td><td>${escapeHtml(predio?.m2 || predio?.area || "Sin información")}</td></tr>
          <tr><td>Modalidad de presentación</td><td>${escapeHtml(form.presentationMode)}</td></tr>
        </table>

        <p>
          Se adjunta la solicitud de anotación preventiva, hoja resumen, índice de anexos,
          relación de predios afectados, planos, memoria descriptiva y demás documentos
          que integran el expediente para su calificación registral.
        </p>
        <p>Sin otro particular, quedo atento(a) a la atención correspondiente.</p>

        <br><br>
        <p class="signature">
          ____________________________________<br>
          ${escapeHtml(form.responsible)}<br>
          Responsable del trámite registral
        </p>
      </body>
    </html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function createConsolidatedPdf(form, trace, predio, projectLabel, displayCode, safeCode) {
	return createSimplePdfBlob("Expediente consolidado de anotación preventiva", [
		"EXPEDIENTE CONSOLIDADO DE ANOTACIÓN PREVENTIVA",
		"",
		buildCopySummary(form, predio, displayCode),
		`Proyecto: ${projectLabel}`,
		"",
		"DOCUMENTOS",
		...DOCUMENTS.map((document, index) => `${index + 1}. ${document.label} | ${generatedFileName(document, safeCode)}`),
		"",
		"TRAZABILIDAD",
		...trace.map((row) => `${row.date} | ${row.user} | ${row.previousStatus} -> ${row.newStatus} | ${row.document} | ${row.detail}`)
	]);
}
function buildCopySummary(form, predio, displayCode) {
	return [
		`Predio: ${displayCode}`,
		`Sujeto pasivo: ${predio?.suj || "Sin información"}`,
		`Expediente: ${form.expedienteId}`,
		`Nro. de título SUNARP: ${form.titleNumber || "Pendiente"}`,
		`Oficina registral: ${form.office}`,
		`Fecha de presentación: ${formatDatePe(form.presentationDate)}`,
		`Estado: ${form.status}`,
		`Observaciones: ${form.observations || "Sin observaciones"}`,
		`Documento de subsanación: ${form.correctionDocument || "Sin documento"}`,
		`Constancia de inscripción: ${form.registrationCertificate || "Sin constancia"}`,
		`Asiento registral: ${form.registrySeat || "Pendiente"}`,
		`Fecha de inscripción: ${form.inscriptionDate ? formatDatePe(form.inscriptionDate) : "Pendiente"}`,
		`Consulta SUNARP: ${SUNARP_LINK}`
	].join("\n");
}
function buildMetadata(form, trace, predio, displayCode, safeCode) {
	return [
		"METADATA EXPEDIENTE ANOTACIÓN PREVENTIVA",
		"",
		buildCopySummary(form, predio, displayCode),
		"",
		"Documentos:",
		...DOCUMENTS.map((document) => `- ${document.label}: ${generatedFileName(document, safeCode)}`),
		"",
		"Trazabilidad:",
		...trace.map((row) => `- ${row.date}: ${row.previousStatus} -> ${row.newStatus} | ${row.document} | ${row.user}`)
	].join("\n");
}
function buildAnnexText(predio, form) {
	return [
		"ANEXOS REFERENCIALES",
		`Acto administrativo: ${predio?.nres || predio?.res || "Pendiente"}`,
		`Planos: Plano de afectación del predio ${predio?.cod || ""}`,
		`Memoria descriptiva: Asociada al expediente ${form.expedienteId}`,
		`Partida registral: ${predio?.part || predio?.pind || "Sin información"}`,
		`Documento de subsanación: ${form.correctionDocument || "Sin documento"}`,
		`Constancia de inscripción: ${form.registrationCertificate || "Sin constancia"}`
	].join("\n");
}
function createSimplePdfBlob(title, rawLines) {
	const lines = rawLines.flatMap((line) => wrapPdfLine(toPdfAscii(line), 108));
	const pages = chunk(lines.length ? lines : [toPdfAscii(title)], 42);
	const fontObjNum = 3 + pages.length * 2;
	const maxObjNum = fontObjNum;
	const objects = /* @__PURE__ */ new Map();
	const pageObjNums = [];
	pages.forEach((pageLines, pageIndex) => {
		const pageObjNum = 3 + pageIndex * 2;
		const contentObjNum = pageObjNum + 1;
		pageObjNums.push(pageObjNum);
		const content = [
			"BT",
			"/F1 9 Tf",
			"40 800 Td",
			"12 TL",
			...pageLines.map((line) => `(${escapePdfText(line)}) Tj T*`),
			"ET"
		].join("\n");
		objects.set(pageObjNum, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 ${fontObjNum} 0 R >> >> /Contents ${contentObjNum} 0 R >>`);
		objects.set(contentObjNum, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
	});
	objects.set(1, "<< /Type /Catalog /Pages 2 0 R >>");
	objects.set(2, `<< /Type /Pages /Kids [${pageObjNums.map((num) => `${num} 0 R`).join(" ")}] /Count ${pages.length} >>`);
	objects.set(fontObjNum, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
	let pdf = "%PDF-1.4\n";
	const offsets = [];
	for (let num = 1; num <= maxObjNum; num += 1) {
		const body = objects.get(num);
		if (!body) continue;
		offsets[num] = pdf.length;
		pdf += `${num} 0 obj\n${body}\nendobj\n`;
	}
	const xrefOffset = pdf.length;
	pdf += `xref\n0 ${maxObjNum + 1}\n0000000000 65535 f \n`;
	for (let num = 1; num <= maxObjNum; num += 1) pdf += `${String(offsets[num] || 0).padStart(10, "0")} 00000 n \n`;
	pdf += `trailer\n<< /Size ${maxObjNum + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
	return new Blob([pdf], { type: "application/pdf" });
}
function createZipBlob(files) {
	const encoder = new TextEncoder();
	const local = [];
	const central = [];
	const records = [];
	files.forEach((file) => {
		const nameBytes = encoder.encode(file.name);
		const crc = crc32(file.data);
		const offset = local.length;
		writeUint32(local, 67324752);
		writeUint16(local, 20);
		writeUint16(local, 0);
		writeUint16(local, 0);
		writeUint16(local, 0);
		writeUint16(local, 0);
		writeUint32(local, crc);
		writeUint32(local, file.data.length);
		writeUint32(local, file.data.length);
		writeUint16(local, nameBytes.length);
		writeUint16(local, 0);
		local.push(...nameBytes, ...file.data);
		records.push({
			nameBytes,
			data: file.data,
			crc,
			offset
		});
	});
	records.forEach((record) => {
		writeUint32(central, 33639248);
		writeUint16(central, 20);
		writeUint16(central, 20);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint32(central, record.crc);
		writeUint32(central, record.data.length);
		writeUint32(central, record.data.length);
		writeUint16(central, record.nameBytes.length);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint32(central, 0);
		writeUint32(central, record.offset);
		central.push(...record.nameBytes);
	});
	const end = [];
	writeUint32(end, 101010256);
	writeUint16(end, 0);
	writeUint16(end, 0);
	writeUint16(end, records.length);
	writeUint16(end, records.length);
	writeUint32(end, central.length);
	writeUint32(end, local.length);
	writeUint16(end, 0);
	return new Blob([new Uint8Array([
		...local,
		...central,
		...end
	])], { type: "application/zip" });
}
function crc32(bytes) {
	let crc = 4294967295;
	for (const byte of bytes) {
		crc ^= byte;
		for (let index = 0; index < 8; index += 1) crc = crc >>> 1 ^ 3988292384 & -(crc & 1);
	}
	return (crc ^ 4294967295) >>> 0;
}
function writeUint16(out, value) {
	out.push(value & 255, value >>> 8 & 255);
}
function writeUint32(out, value) {
	out.push(value & 255, value >>> 8 & 255, value >>> 16 & 255, value >>> 24 & 255);
}
function wordDocumentStyles() {
	return `
    body { font-family: Arial, sans-serif; font-size: 10.5pt; color: black; line-height: 1.4; }
    p { margin: 9px 0; }
    .right { text-align: right; }
    .signature { text-align: center; margin-top: 42px; }
    table { width: 100%; border-collapse: collapse; margin: 14px 0; }
    th, td { border: 1px solid gray; padding: 7px; vertical-align: top; }
    th { background: whitesmoke; text-align: left; }
  `;
}
function escapeHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
async function copyTextToClipboard(value) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(value);
		return;
	}
	const textarea = document.createElement("textarea");
	textarea.value = value;
	textarea.setAttribute("readonly", "true");
	textarea.style.position = "fixed";
	textarea.style.left = "-9999px";
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
}
function progressFromStatus(status) {
	return {
		PENDIENTE: 10,
		GENERADO: 30,
		"LISTO PARA PRESENTAR": 45,
		PRESENTADO: 60,
		OBSERVADO: 65,
		SUBSANADO: 78,
		INSCRITO: 100,
		TACHADO: 0,
		CANCELADO: 0
	}[status];
}
function statusFromPredio(value) {
	const clean = String(value ?? "").toUpperCase();
	if (clean.includes("INSCRITO")) return "INSCRITO";
	if (clean.includes("OBSERV")) return "OBSERVADO";
	if (clean.includes("TACH")) return "TACHADO";
	if (clean.includes("PRESENT")) return "PRESENTADO";
	return "PENDIENTE";
}
function officeForLocation(city) {
	const value = String(city ?? "").toUpperCase();
	if (value.includes("JAUJA") || value.includes("HUANCAYO")) return "SUNARP - Oficina Registral Huancayo";
	if (value.includes("CAJAMARCA")) return "SUNARP - Oficina Registral Cajamarca";
	if (value.includes("LIMA")) return "SUNARP - Oficina Registral Lima";
	return "SUNARP - Oficina Registral competente";
}
function normalizeDate(value) {
	const clean = String(value ?? "").trim();
	if (!clean || clean === "-") return "";
	if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
	const slash = clean.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
	if (slash) {
		const day = slash[1].padStart(2, "0");
		const month = slash[2].padStart(2, "0");
		return `${slash[3].length === 2 ? `20${slash[3]}` : slash[3]}-${month}-${day}`;
	}
	return "";
}
function formatDatePe(value) {
	const iso = (normalizeDate(value) || value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (!iso) return value || "Pendiente";
	return `${iso[3]}/${iso[2]}/${iso[1]}`;
}
function daysSince(value) {
	const normalized = normalizeDate(value);
	if (!normalized) return 0;
	const start = (/* @__PURE__ */ new Date(`${normalized}T00:00:00`)).getTime();
	const end = (/* @__PURE__ */ new Date(`${today()}T00:00:00`)).getTime();
	return Math.floor((end - start) / 864e5);
}
function wrapPdfLine(value, maxLength) {
	if (value.length <= maxLength) return [value];
	const words = value.split(" ");
	const lines = [];
	let current = "";
	words.forEach((word) => {
		if (`${current} ${word}`.trim().length > maxLength) {
			if (current) lines.push(current);
			current = word;
		} else current = `${current} ${word}`.trim();
	});
	if (current) lines.push(current);
	return lines;
}
function chunk(items, size) {
	const chunks = [];
	for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
	return chunks;
}
function escapePdfText(value) {
	return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
function toPdfAscii(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, " ");
}
function safeFileName(value) {
	return value.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "");
}
//#endregion
export { AnotacionPreventivaPage as component };
