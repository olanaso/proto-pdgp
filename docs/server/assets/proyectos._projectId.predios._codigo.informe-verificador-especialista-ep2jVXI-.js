import { a as controlClase, i as SiNo, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { f as vencimiento, g as fechaIso, n as getProyecto, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { U as itemActual, it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.informe-verificador-especialista-DMYkWFwI.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CalendarDays, CheckCircle2, FileCheck2, FilePenLine, Save, ShieldCheck, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.informe-verificador-especialista.tsx?tsr-split=component
var MENSAJE_CLASE = {
	success: "border-success bg-success-soft text-success",
	warning: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var ESTADO_TONO = {
	"NO APLICA": "neutral",
	"FIRMADO REGISTRADO": "success",
	"BORRADOR GENERADO": "primary",
	"EN ELABORACIÓN": "warning"
};
var INFORME_FIRMADO = "Informe del verificador especialista firmado";
var etiquetasHistorial = {
	form: "Informe",
	documents: "Versión del informe",
	conInforme: "Cuenta con informe",
	numeroInforme: "Número de informe",
	fechaInicio: "Fecha de inicio",
	fechaFin: "Fecha de término",
	especialista: "Verificador especialista",
	especialidad: "Especialidad",
	colegiatura: "Colegiatura",
	resultado: "Resultado",
	objeto: "Objeto",
	conclusion: "Conclusión",
	observaciones: "Observaciones",
	tipoFirma: "Tipo de firma",
	archivo: "Archivo",
	tipo: "Tipo",
	estado: "Estado",
	responsable: "Responsable"
};
function today() {
	return fechaIso(/* @__PURE__ */ new Date());
}
function Resumen({ icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-w-0 items-center gap-3 rounded-md border border-border bg-background px-3 py-2",
		children: [/* @__PURE__ */ jsx("span", {
			className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
			"aria-hidden": true,
			children: icon
		}), /* @__PURE__ */ jsxs("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("span", {
				className: "block text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ jsx("span", {
				className: "block truncate text-lg font-semibold",
				children: value
			})]
		})]
	});
}
function InformeVerificadorEspecialistaPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const predioCode = predio?.cod || decodedCodigo;
	const storageKey = `informe-verificador:${projectId}:${decodedCodigo}`;
	const defaultForm = useMemo(() => ({
		conInforme: true,
		numeroInforme: "",
		fechaInicio: today(),
		fechaFin: today(),
		especialista: predio?.rtec || "",
		especialidad: "Verificación técnico-registral",
		colegiatura: "",
		resultado: "",
		objeto: "Verificar la información física, catastral y registral del predio afectado por el proyecto.",
		conclusion: "",
		observaciones: ""
	}), [predio?.rtec]);
	const [form, setForm] = useState(defaultForm);
	const [message, setMessage] = useState(null);
	const [hydrated, setHydrated] = useState(false);
	const rol = useRol();
	const items = useItems();
	const informe = itemActual(items, decodedCodigo, "ver-informe");
	const claveHistorial = `informe-verificador-especialista-${decodedCodigo}`;
	const bitacora = {
		modulo: 14,
		entidad: "informe_verificador_especialista"
	};
	const versiones = useHistorial(claveHistorial);
	const versionar = (accion, objeto, despues, motivo) => registrarCambio(claveHistorial, {
		accion,
		objeto,
		motivo,
		antes: versiones[0]?.registro ?? { form: defaultForm },
		despues
	}, bitacora);
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) {
				const parsed = JSON.parse(stored);
				setForm({
					...defaultForm,
					...parsed.form
				});
			}
		} catch {
			setMessage({
				type: "warning",
				text: "No se pudo recuperar el registro anterior; se abrió un formulario nuevo."
			});
		} finally {
			setHydrated(true);
		}
	}, [defaultForm, storageKey]);
	useEffect(() => {
		if (!hydrated) return;
		const payload = { form };
		window.localStorage.setItem(storageKey, JSON.stringify(payload));
	}, [
		form,
		hydrated,
		storageKey
	]);
	const currentStatus = !form.conInforme ? "NO APLICA" : documentoDelCampo(items, decodedCodigo, INFORME_FIRMADO, "ver-informe") ? "FIRMADO REGISTRADO" : informe ? "BORRADOR GENERADO" : "EN ELABORACIÓN";
	const venceExpediente = form.fechaInicio ? vencimiento(/* @__PURE__ */ new Date(`${form.fechaInicio}T00:00:00`), plazo("expediente_tecnico_legal")) : null;
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function validateForDocument() {
		if (!form.conInforme) return "Active la opción 'Cuenta con informe' para generar documentos.";
		if (!form.fechaInicio || !form.fechaFin) return "Registre las fechas de inicio y término.";
		if (form.fechaFin < form.fechaInicio) return "La fecha de término no puede ser anterior a la fecha de inicio.";
		if (!form.especialista.trim()) return "Registre al verificador especialista.";
		if (!form.resultado) return "Seleccione el resultado de la verificación.";
		if (!form.conclusion.trim()) return "Registre la conclusión antes de generar el borrador.";
		return null;
	}
	function armarInforme(numero) {
		return createInformeWordBlob({
			form: {
				...form,
				numeroInforme: numero ?? "BORRADOR SIN NUMERAR"
			},
			predio,
			predioCode,
			projectLabel
		});
	}
	function handleSave() {
		versionar(versiones.length ? "Modificó el informe" : "Creó el informe", `Informe ${form.numeroInforme || "sin número"} (${currentStatus})`, { form });
		setMessage({
			type: "success",
			text: "Información del informe guardada."
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
				titulo: "Informe del verificador especialista",
				icono: FileCheck2,
				documentos: {
					armar: { "ver-informe": (numero) => armarInforme(numero) },
					validar: validateForDocument,
					alGenerar: (_, { numero, archivo }) => {
						const nuevoForm = {
							...form,
							numeroInforme: numero ?? form.numeroInforme
						};
						setForm(nuevoForm);
						versionar(numero ? "Generó el documento numerado" : "Generó borrador sin numerar", `Informe ${numero ?? "BORRADOR SIN NUMERAR"} (${archivo})`, { form: nuevoForm });
						setMessage({
							type: "success",
							text: numero ? `${numero} generado y registrado. Fírmelo y súbalo en el campo «Informe firmado (PDF)».` : "Borrador sin numerar generado. Numérelo antes de la firma."
						});
					}
				},
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: ESTADO_TONO[currentStatus] ?? "neutral",
					children: currentStatus
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "informe-verificador-especialista",
				projectId,
				codigo: decodedCodigo,
				extra: venceExpediente && /* @__PURE__ */ jsxs(Fragment$1, { children: ["Plazo para remitir el expediente técnico legal (art. 17, 4 meses desde la identificación):", /* @__PURE__ */ jsx(PlazoBadge, { vence: venceExpediente })] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 grid grid-cols-1 gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ jsx(Resumen, {
					icon: /* @__PURE__ */ jsx(ShieldCheck, { size: 16 }),
					label: "Estado del informe",
					value: currentStatus
				}), /* @__PURE__ */ jsx(Resumen, {
					icon: /* @__PURE__ */ jsx(FilePenLine, { size: 16 }),
					label: "Número de informe",
					value: form.numeroInforme || "Sin número"
				})]
			}),
			message && /* @__PURE__ */ jsxs("p", {
				role: message.type === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[message.type]}`,
				children: [
					message.type === "success" ? /* @__PURE__ */ jsx(CheckCircle2, {
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
						children: message.text
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
								handleSave();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									datos: [{
										etiqueta: "Condición jurídica",
										valor: predio?.condicionPredio || "Por verificar"
									}, {
										etiqueta: "Sujeto pasivo",
										valor: predio?.suj || ""
									}]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Datos del informe y del verificador",
									className: "mt-4",
									children: [/* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Cuenta con informe del verificador",
										ayuda: "Active esta opción para elaborar el borrador y registrar después el documento firmado.",
										ancho: "doble",
										children: /* @__PURE__ */ jsx(SiNo, {
											valor: form.conInforme,
											onCambiar: (v) => setField("conInforme", v),
											nombre: "Cuenta con informe del verificador"
										})
									}) }), /* @__PURE__ */ jsx("fieldset", {
										disabled: !form.conInforme,
										className: "mt-3 disabled:opacity-60",
										children: /* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Número de informe",
												ayuda: "Lo asigna el sistema al generar el documento, según la regla de Numeración.",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: `${controlClase} bg-muted font-mono`,
													value: form.numeroInforme || "Se asigna al generar",
													readOnly: true
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Resultado",
												obligatorio: true,
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: form.resultado,
													onChange: (event) => setField("resultado", event.target.value),
													children: [
														/* @__PURE__ */ jsx("option", {
															value: "",
															children: "Seleccione"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "FAVORABLE",
															children: "Favorable"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "FAVORABLE CON OBSERVACIONES",
															children: "Favorable con observaciones"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "OBSERVADO",
															children: "Observado"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "DESFAVORABLE",
															children: "Desfavorable"
														})
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha de inicio",
												obligatorio: true,
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: form.fechaInicio,
													onChange: (event) => setField("fechaInicio", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha de término",
												obligatorio: true,
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: form.fechaFin,
													onChange: (event) => setField("fechaFin", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Verificador especialista",
												obligatorio: true,
												children: (id) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("input", {
													id,
													list: "verificadores-especialistas",
													className: controlClase,
													value: form.especialista,
													placeholder: "Buscar o escribir especialista",
													onChange: (event) => setField("especialista", event.target.value)
												}), /* @__PURE__ */ jsxs("datalist", {
													id: "verificadores-especialistas",
													children: [
														predio?.rtec && /* @__PURE__ */ jsx("option", { value: predio.rtec }),
														/* @__PURE__ */ jsx("option", { value: "Especialista técnico predial" }),
														/* @__PURE__ */ jsx("option", { value: "Especialista catastral" }),
														/* @__PURE__ */ jsx("option", { value: "Especialista registral" })
													]
												})] })
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Especialidad",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: form.especialidad,
													onChange: (event) => setField("especialidad", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Número de colegiatura",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: form.colegiatura,
													placeholder: "CIP, CAP o colegiatura",
													onChange: (event) => setField("colegiatura", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Objeto del informe",
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("textarea", {
													id,
													rows: 2,
													className: `${controlClase} h-auto py-2`,
													value: form.objeto,
													onChange: (event) => setField("objeto", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Conclusión",
												obligatorio: true,
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("textarea", {
													id,
													rows: 3,
													className: `${controlClase} h-auto py-2`,
													value: form.conclusion,
													placeholder: "Conclusión técnica y registral del verificador",
													onChange: (event) => setField("conclusion", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Observaciones",
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("textarea", {
													id,
													rows: 2,
													className: `${controlClase} h-auto py-2`,
													value: form.observaciones,
													placeholder: "Observaciones, restricciones o documentación pendiente",
													onChange: (event) => setField("observaciones", event.target.value)
												})
											})
										] })
									})]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsx("fieldset", {
										disabled: !form.conInforme,
										className: "disabled:opacity-60",
										children: /* @__PURE__ */ jsx(FormGrid, {
											columnas: 1,
											children: /* @__PURE__ */ jsx(FormField, {
												etiqueta: "Informe firmado (PDF)",
												ancho: "doble",
												children: () => /* @__PURE__ */ jsx(CampoDocumento, {
													projectId,
													codigo: decodedCodigo,
													nombre: INFORME_FIRMADO,
													catalogoId: "ver-informe",
													firmado: true,
													accept: ".pdf",
													numero: form.numeroInforme || void 0,
													fecha: form.fechaFin || void 0
												})
											})
										})
									})
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: () => window.history.back(),
									children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
								}), /* @__PURE__ */ jsxs(Button, {
									type: "submit",
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar informe"]
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Informe del verificador especialista",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									setForm({
										...defaultForm,
										...r.form
									});
									registrarVersion(claveHistorial, {
										accion: "Restauró una versión anterior",
										objeto: `versión ${n}`,
										registro: r
									}, bitacora);
									setMessage({
										type: "success",
										text: `Se restauró la versión ${n}. Quedó como una versión nueva.`
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
function createInformeWordBlob({ form, predio, predioCode, projectLabel }) {
	const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; color: black; font-size: 11pt; line-height: 1.45; margin: 38px 46px; }
        h1 { text-align: center; font-size: 15pt; margin: 0 0 4px; }
        h2 { color: darkred; border-bottom: 1px solid lightgray; font-size: 11pt; margin: 22px 0 8px; padding-bottom: 4px; }
        p { margin: 7px 0; text-align: justify; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        th, td { border: 1px solid gray; padding: 7px; font-size: 10pt; text-align: left; }
        th { width: 26%; background: whitesmoke; }
        .number { text-align: center; font-weight: bold; margin-bottom: 24px; }
        .signature { margin: 60px auto 0; width: 58%; text-align: center; }
        .footer { color: gray; font-size: 8pt; margin-top: 48px; text-align: right; }
      </style>
    </head>
    <body>
      <h1>INFORME DEL VERIFICADOR ESPECIALISTA</h1>
      <p class="number">${escapeHtml(form.numeroInforme)}</p>
      <table>
        <tr><th>Proyecto</th><td>${escapeHtml(projectLabel)}</td></tr>
        <tr><th>Código de predio</th><td>${escapeHtml(predioCode)}</td></tr>
        <tr><th>Sujeto pasivo</th><td>${escapeHtml(predio?.suj || "Sin información")}</td></tr>
        <tr><th>Condición jurídica</th><td>${escapeHtml(predio?.condicionPredio || "Por verificar")}</td></tr>
        <tr><th>Periodo de verificación</th><td>${escapeHtml(form.fechaInicio)} al ${escapeHtml(form.fechaFin)}</td></tr>
        <tr><th>Verificador especialista</th><td>${escapeHtml(form.especialista)}</td></tr>
        <tr><th>Especialidad / colegiatura</th><td>${escapeHtml(form.especialidad)} ${form.colegiatura ? `· ${escapeHtml(form.colegiatura)}` : ""}</td></tr>
      </table>
      <h2>1. OBJETO</h2>
      <p>${escapeHtml(form.objeto)}</p>
      <h2>2. ANTECEDENTES Y VERIFICACIÓN</h2>
      <p>Se revisó la información física, catastral, registral y legal disponible para el predio indicado, así como la documentación vinculada al proyecto.</p>
      <h2>3. RESULTADO</h2>
      <p><b>${escapeHtml(form.resultado)}</b></p>
      <h2>4. CONCLUSIÓN</h2>
      <p>${escapeHtml(form.conclusion)}</p>
      <h2>5. OBSERVACIONES</h2>
      <p>${escapeHtml(form.observaciones || "Sin observaciones adicionales.")}</p>
      <div class="signature">____________________________________<br><b>${escapeHtml(form.especialista)}</b><br>Verificador Especialista</div>
      <p class="footer">Borrador generado por el Sistema de Gestión Predial · pendiente de firma</p>
    </body>
  </html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function escapeHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//#endregion
export { InformeVerificadorEspecialistaPage as component };
