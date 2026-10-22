import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { g as fechaIso, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { U as itemActual, it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.entrega-recepcion-ddp-opat-D7JhAY-0.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CalendarDays, CheckCircle2, Handshake, History, Save, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.entrega-recepcion-ddp-opat.tsx?tsr-split=component
var etiquetasHistorial = {
	form: "Acta",
	documents: "Versión del acta",
	numeroActa: "Número de acta",
	fechaActa: "Fecha del acta",
	fechaFin: "Fecha de finalización",
	lugarEntrega: "Lugar de entrega",
	representanteDdp: "Representante DDP",
	cargoRepresentanteDdp: "Cargo en DDP",
	representanteOpat: "Representante OPAT",
	cargoRepresentanteOpat: "Cargo en OPAT",
	estadoLiberacion: "Estado de liberación",
	condicionEntrega: "Condición de entrega",
	areaEntregada: "Área entregada",
	documentosEntregados: "Documentación entregada",
	acuerdos: "Acuerdos",
	observaciones: "Observaciones",
	conActaSuscrita: "Acta suscrita",
	archivo: "Archivo",
	tipo: "Tipo",
	estado: "Estado",
	responsable: "Responsable",
	tipoFirma: "Firma"
};
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var ACTA_FIRMADA = "Acta de entrega y recepción firmada";
var ESTADO_TONO = {
	"ACTA FIRMADA": "success",
	"BORRADOR GENERADO": "warning",
	"POR ELABORAR": "neutral"
};
function EntregaRecepcionDdpOpatPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const predioCode = predio?.cod || decodedCodigo;
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const rol = useRol();
	const params = {
		projectId,
		codigo
	};
	predioCode.replace(/[^A-Z0-9-]/gi, "").toUpperCase();
	const storageKey = `entrega-recepcion-ddp-opat:${projectId}:${decodedCodigo}`;
	const initialForm = useMemo(() => ({
		numeroActa: "",
		fechaActa: fechaIso(/* @__PURE__ */ new Date()),
		fechaFin: fechaIso(/* @__PURE__ */ new Date()),
		lugarEntrega: projectLabel,
		representanteDdp: proyecto?.coordinadorPredial || predio?.rlegal || "",
		cargoRepresentanteDdp: "Representante de la DDP",
		representanteOpat: "",
		cargoRepresentanteOpat: "Representante de la OPAT",
		estadoLiberacion: "PENDIENTE",
		condicionEntrega: "POR VERIFICAR",
		areaEntregada: predio?.m2 || "",
		documentosEntregados: "Expediente predial, planos, memoria descriptiva y documentos de sustento disponibles.",
		acuerdos: "La OPAT recibe la documentación y el predio en las condiciones descritas en la presente acta.",
		observaciones: ""
	}), [
		predio?.m2,
		predio?.rlegal,
		projectLabel,
		proyecto?.coordinadorPredial
	]);
	const [form, setForm] = useState(initialForm);
	const [loaded, setLoaded] = useState(false);
	const [mensaje, setMensaje] = useState(null);
	const claveHistorial = `entrega-recepcion-ddp-opat-${decodedCodigo}`;
	const bitacora = {
		modulo: 22,
		entidad: "entrega_recepcion_ddp_opat"
	};
	const versiones = useHistorial(claveHistorial);
	const versionar = (accion, objeto, despues, motivo) => registrarCambio(claveHistorial, {
		accion,
		objeto,
		motivo,
		antes: versiones[0]?.registro ?? { form: initialForm },
		despues
	}, bitacora);
	const items = useItems();
	const acta = itemActual(items, decodedCodigo, "opat-acta");
	const currentStatus = Boolean(documentoDelCampo(items, decodedCodigo, ACTA_FIRMADA, "opat-acta")) ? "ACTA FIRMADA" : acta ? "BORRADOR GENERADO" : "POR ELABORAR";
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) {
				const parsed = JSON.parse(stored);
				setForm({
					...initialForm,
					...parsed.form
				});
			}
		} catch {
			setMensaje({
				tipo: "aviso",
				texto: "No se pudo recuperar el registro anterior. Puede continuar con un registro nuevo."
			});
		} finally {
			setLoaded(true);
		}
	}, [initialForm, storageKey]);
	useEffect(() => {
		if (!loaded) return;
		window.localStorage.setItem(storageKey, JSON.stringify({ form }));
	}, [
		form,
		loaded,
		storageKey
	]);
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function validateActaData(requireRepresentatives = true) {
		if (!form.fechaActa) {
			setMensaje({
				tipo: "aviso",
				texto: "Complete la fecha del acta."
			});
			return false;
		}
		if (requireRepresentatives && (!form.representanteDdp.trim() || !form.representanteOpat.trim())) {
			setMensaje({
				tipo: "aviso",
				texto: "Registre los representantes de DDP y OPAT antes de guardar el registro."
			});
			return false;
		}
		return true;
	}
	const armarActa = (numero) => createActaWordBlob({
		form: {
			...form,
			numeroActa: numero ?? "BORRADOR SIN NUMERAR"
		},
		predio,
		predioCode,
		projectLabel
	});
	function handleGenerado(numero) {
		const nuevoForm = {
			...form,
			numeroActa: numero ?? form.numeroActa
		};
		setForm(nuevoForm);
		versionar(numero ? "Generó el documento numerado" : "Generó borrador sin numerar", `Acta ${numero ?? "BORRADOR SIN NUMERAR"}`, { form: nuevoForm });
		setMensaje({
			tipo: "exito",
			texto: numero ? `${numero} generado. Fírmelo y suba luego el escaneado en el campo «Acta firmada (PDF)».` : "Borrador sin numerar generado. Numérelo antes de la firma."
		});
	}
	function handleSave() {
		if (!validateActaData()) return;
		versionar(versiones.length ? "Modificó el acta" : "Creó el acta", `Acta ${form.numeroActa}`, { form });
		setMensaje({
			tipo: "exito",
			texto: "Acta de entrega y recepción guardada."
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
				titulo: "Entrega y recepción DDP-OPAT",
				icono: Handshake,
				documentos: {
					armar: { "opat-acta": (numero) => armarActa(numero) },
					alGenerar: (_, { numero }) => handleGenerado(numero)
				},
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: ESTADO_TONO[currentStatus],
					children: currentStatus
				})
			}),
			/* @__PURE__ */ jsx(Section, {
				titulo: "Recepción y custodia del expediente",
				className: "mb-4",
				children: /* @__PURE__ */ jsx(Stepper, { pasos: [
					{
						nombre: "Expediente digital",
						estado: "completado",
						detalle: "6.1 · revisión documental",
						to: "/proyectos/$projectId/predios/$codigo/expediente-digital",
						params
					},
					{
						nombre: "Entrega y recepción DDP-OPAT",
						estado: "actual",
						detalle: "6.2 · acta de entrega"
					},
					{
						nombre: "Transferencia documentaria",
						estado: "pendiente",
						detalle: "6.3 · remisión a OPAT",
						to: "/proyectos/$projectId/predios/$codigo/transferencia-documentaria-opat",
						params
					},
					{
						nombre: "Monitoreo",
						estado: "pendiente",
						detalle: "Seguimiento individual del predio",
						to: "/proyectos/$projectId/predios/$codigo/monitoreo",
						params
					}
				] })
			}),
			mensaje && /* @__PURE__ */ jsxs("p", {
				role: mensaje.tipo === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[mensaje.tipo]}`,
				children: [
					mensaje.tipo === "exito" ? /* @__PURE__ */ jsx(CheckCircle2, {
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
							className: "space-y-4",
							onSubmit: (event) => {
								event.preventDefault();
								handleSave();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									tituloDatos: "Datos registrales",
									datos: [
										{
											etiqueta: "Sujeto pasivo",
											valor: predio?.suj || ""
										},
										{
											etiqueta: "Área afectada (m²)",
											valor: predio?.m2 || "Por verificar"
										},
										{
											etiqueta: "Partida registral",
											valor: predio?.part || ""
										}
									]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Datos del acta de entrega y recepción",
									children: [
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Número de acta",
												ayuda: "Lo asigna el sistema al generar el documento, según la regla de Numeración.",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: `${controlClase} bg-muted font-mono`,
													value: form.numeroActa || "Se asigna al generar",
													readOnly: true
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha del acta",
												obligatorio: true,
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: form.fechaActa,
													onChange: (event) => setField("fechaActa", event.target.value),
													required: true
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Lugar de entrega",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: form.lugarEntrega,
													onChange: (event) => setField("lugarEntrega", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha de finalización",
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
												etiqueta: "Estado de liberación",
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: form.estadoLiberacion,
													onChange: (event) => setField("estadoLiberacion", event.target.value),
													children: [
														/* @__PURE__ */ jsx("option", { children: "PENDIENTE" }),
														/* @__PURE__ */ jsx("option", { children: "ENTREGA PARCIAL" }),
														/* @__PURE__ */ jsx("option", { children: "ENTREGA TOTAL" })
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Condición de entrega",
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: form.condicionEntrega,
													onChange: (event) => setField("condicionEntrega", event.target.value),
													children: [
														/* @__PURE__ */ jsx("option", { children: "POR VERIFICAR" }),
														/* @__PURE__ */ jsx("option", { children: "LIBRE Y DESOCUPADO" }),
														/* @__PURE__ */ jsx("option", { children: "CON OCUPANTES" }),
														/* @__PURE__ */ jsx("option", { children: "CON OBSERVACIONES" })
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Área entregada",
												ayuda: "En metros cuadrados",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													inputMode: "decimal",
													value: form.areaEntregada,
													onChange: (event) => setField("areaEntregada", event.target.value),
													placeholder: "0.0000"
												})
											})
										] }),
										/* @__PURE__ */ jsx(Subtitulo, { children: "Representantes que intervienen" }),
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Representante DDP",
												obligatorio: true,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: form.representanteDdp,
													onChange: (event) => setField("representanteDdp", event.target.value),
													placeholder: "Apellidos y nombres"
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Cargo en DDP",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: form.cargoRepresentanteDdp,
													onChange: (event) => setField("cargoRepresentanteDdp", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Representante OPAT",
												obligatorio: true,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: form.representanteOpat,
													onChange: (event) => setField("representanteOpat", event.target.value),
													placeholder: "Apellidos y nombres"
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Cargo en OPAT",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: form.cargoRepresentanteOpat,
													onChange: (event) => setField("cargoRepresentanteOpat", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Documentación entregada",
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("textarea", {
													id,
													rows: 2,
													className: `${controlClase} h-auto py-2`,
													value: form.documentosEntregados,
													onChange: (event) => setField("documentosEntregados", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Acuerdos",
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("textarea", {
													id,
													rows: 2,
													className: `${controlClase} h-auto py-2`,
													value: form.acuerdos,
													onChange: (event) => setField("acuerdos", event.target.value)
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
													onChange: (event) => setField("observaciones", event.target.value),
													placeholder: "Registre incidencias, pendientes o condiciones particulares de la entrega."
												})
											})
										] })
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsx(FormGrid, {
										columnas: 1,
										children: /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Acta firmada (PDF)",
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: ACTA_FIRMADA,
												catalogoId: "opat-acta",
												firmado: true,
												accept: ".pdf",
												numero: form.numeroActa || void 0,
												fecha: form.fechaActa || void 0
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
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar acta"]
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Entrega y recepción DDP-OPAT",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									setForm(r.form);
									registrarVersion(claveHistorial, {
										accion: "Restauró una versión anterior",
										objeto: `versión ${n}`,
										registro: r
									}, bitacora);
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
function createActaWordBlob({ form, predio, predioCode, projectLabel }) {
	const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page { size: A4; margin: 2.2cm; }
        body { font-family: Arial, sans-serif; color: rgb(17, 24, 39); font-size: 10.5pt; line-height: 1.45; }
        h1 { margin: 0; text-align: center; font-size: 14pt; }
        .number { margin: 5px 0 24px; text-align: center; font-weight: bold; }
        h2 { margin: 20px 0 8px; border-bottom: 1px solid rgb(156, 163, 175); padding-bottom: 3px; font-size: 10.5pt; }
        p { margin: 7px 0; text-align: justify; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        th, td { border: 1px solid rgb(156, 163, 175); padding: 6px; font-size: 9.5pt; text-align: left; vertical-align: top; }
        th { width: 25%; background: rgb(243, 244, 246); }
        .signatures { margin-top: 62px; border: 0; }
        .signatures td { width: 50%; border: 0; padding: 0 22px; text-align: center; }
        .line { border-top: 1px solid rgb(17, 24, 39); padding-top: 6px; }
        .footer { margin-top: 42px; color: rgb(107, 114, 128); font-size: 8pt; text-align: right; }
      </style>
    </head>
    <body>
      <h1>ACTA DE ENTREGA Y RECEPCIÓN DE PREDIO DDP · OPAT</h1>
      <p class="number">${escapeHtml(form.numeroActa)}</p>

      <p>En ${escapeHtml(form.lugarEntrega || "el lugar indicado")}, con fecha ${escapeHtml(form.fechaActa)}, se reúnen los representantes de la Dirección de Disponibilidad de Predios (DDP) y de la Oficina de Patrimonio / OPAT, con la finalidad de formalizar la entrega y recepción del predio detallado en la presente acta.</p>

      <h2>I. IDENTIFICACIÓN DEL PREDIO</h2>
      <table>
        <tr><th>Proyecto</th><td>${escapeHtml(projectLabel)}</td></tr>
        <tr><th>Código de predio</th><td>${escapeHtml(predioCode)}</td></tr>
        <tr><th>Expediente</th><td>${escapeHtml(predio?.exp || "Sin expediente registrado")}</td></tr>
        <tr><th>Sujeto pasivo</th><td>${escapeHtml(predio?.suj || "Sin información")}</td></tr>
        <tr><th>Partida registral</th><td>${escapeHtml(predio?.part || "Sin información")}</td></tr>
        <tr><th>Área entregada</th><td>${escapeHtml(form.areaEntregada || predio?.m2 || "Por verificar")} m²</td></tr>
      </table>

      <h2>II. REPRESENTANTES</h2>
      <table>
        <tr><th>Representante DDP</th><td>${escapeHtml(form.representanteDdp || "Pendiente de designación")} · ${escapeHtml(form.cargoRepresentanteDdp)}</td></tr>
        <tr><th>Representante OPAT</th><td>${escapeHtml(form.representanteOpat || "Pendiente de designación")} · ${escapeHtml(form.cargoRepresentanteOpat)}</td></tr>
      </table>

      <h2>III. OBJETO DEL ACTA</h2>
      <p>Dejar constancia de la entrega por parte de la DDP y la recepción por parte de la OPAT del predio y su documentación asociada, para la continuidad de las acciones de administración, saneamiento, inscripción, custodia o cierre que correspondan.</p>

      <h2>IV. ESTADO Y CONDICIONES DE ENTREGA</h2>
      <table>
        <tr><th>Estado de liberación</th><td>${escapeHtml(form.estadoLiberacion)}</td></tr>
        <tr><th>Condición de entrega</th><td>${escapeHtml(form.condicionEntrega)}</td></tr>
        <tr><th>Fecha de finalización</th><td>${escapeHtml(form.fechaFin || "No consignada")}</td></tr>
      </table>

      <h2>V. DOCUMENTACIÓN ENTREGADA</h2>
      <p>${escapeHtml(form.documentosEntregados || "Sin detalle adicional.")}</p>

      <h2>VI. ACUERDOS Y OBSERVACIONES</h2>
      <p><b>Acuerdos:</b> ${escapeHtml(form.acuerdos || "Sin acuerdos adicionales.")}</p>
      <p><b>Observaciones:</b> ${escapeHtml(form.observaciones || "Sin observaciones.")}</p>

      <h2>VII. CONFORMIDAD</h2>
      <p>Leída la presente acta, los representantes intervinientes expresan su conformidad con su contenido y proceden a suscribirla para constancia.</p>
      <table class="signatures">
        <tr>
          <td><div class="line"><b>${escapeHtml(form.representanteDdp || "Pendiente de designación")}</b><br>${escapeHtml(form.cargoRepresentanteDdp)}<br>DDP</div></td>
          <td><div class="line"><b>${escapeHtml(form.representanteOpat || "Pendiente de designación")}</b><br>${escapeHtml(form.cargoRepresentanteOpat)}<br>OPAT</div></td>
        </tr>
      </table>
      <p class="footer">Borrador generado por el Sistema de Gestión Predial · pendiente de suscripción</p>
    </body>
  </html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function escapeHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//#endregion
export { EntregaRecepcionDdpOpatPage as component };
