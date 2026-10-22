import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { g as fechaIso, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { T as Confirmar, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.transferencia-documentaria-opat-CJRvkxNp.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CalendarDays, CheckCircle2, FolderInput, Plus, Save, Search, Send, Trash2, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.transferencia-documentaria-opat.tsx?tsr-split=component
var DOC_REMISION = "Documento de remisión del expediente a OPAT";
var DOC_CARGO = "Cargo de recepción de OPAT";
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning"
};
function tonoEstado(status) {
	if (status === "TRANSFERIDO" || status === "RECIBIDO") return "success";
	if (status === "OBSERVADO") return "destructive";
	if (status === "BORRADOR") return "neutral";
	return "primary";
}
function TransferenciaDocumentariaOpatPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const params = {
		projectId,
		codigo
	};
	const storageKey = `transferencia-documentaria-opat:${projectId}:${decodedCodigo}`;
	const initialForm = useMemo(() => ({
		oficinaRegistral: predio?.ofi || "",
		areaRegistral: predio?.m2 || predio?.area || "",
		partidaRegistral: predio?.part || predio?.pind || "",
		partidaMatriz: "",
		datosOtorgante: predio?.suj || "",
		fechaInscripcion: normalizeDate(predio?.finsc),
		nivelViabilidad: "RIESGO MEDIO",
		periodoProgramacion: currentMonth(),
		periodoEjecutado: "",
		numeroDocumento: "",
		fechaDocumento: fechaIso(/* @__PURE__ */ new Date()),
		expedienteTransferido: predio?.exp || `EXP-${(predio?.cod || decodedCodigo).replace(/[^A-Z0-9-]/gi, "").slice(-8)}`,
		hojaRuta: predio?.hrres || "",
		dependenciaOrigen: "DIRECCIÓN DE DISPONIBILIDAD DE PREDIOS",
		dependenciaDestino: "OPAT",
		responsableEntrega: proyecto?.coordinadorPredial || predio?.rlegal || "",
		responsableRecibe: "",
		faseEstado: "PREPARACIÓN DEL EXPEDIENTE",
		estado: "BORRADOR",
		progreso: "0",
		comentario: ""
	}), [
		decodedCodigo,
		predio,
		proyecto?.coordinadorPredial
	]);
	const [form, setForm] = useState(initialForm);
	const [history, setHistory] = useState([]);
	const [search, setSearch] = useState("");
	const [mensaje, setMensaje] = useState(null);
	const [confirmacion, setConfirmacion] = useState(null);
	const [loaded, setLoaded] = useState(false);
	const items = useItems();
	const registrado = (nombre) => Boolean(documentoDelCampo(items, decodedCodigo, nombre));
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) {
				const parsed = JSON.parse(stored);
				setForm((current) => ({
					...current,
					...parsed.form
				}));
				setHistory(parsed.history ?? []);
			} else setForm(initialForm);
		} catch {
			setForm(initialForm);
			setMensaje({
				tipo: "aviso",
				texto: "No se pudo recuperar el borrador anterior. Se inició un registro nuevo."
			});
		} finally {
			setLoaded(true);
		}
	}, [initialForm, storageKey]);
	const filteredHistory = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) return history;
		return history.filter((row) => [
			row.id,
			row.documentDate,
			row.comment,
			row.routeNumber,
			row.dependency,
			row.phase,
			row.status
		].some((value) => value.toLowerCase().includes(term)));
	}, [history, search]);
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function persist(nextForm = form, nextHistory = history) {
		const payload = {
			form: nextForm,
			history: nextHistory
		};
		window.localStorage.setItem(storageKey, JSON.stringify(payload));
	}
	function handleSaveDraft() {
		persist();
		setMensaje({
			tipo: "exito",
			texto: "Borrador guardado para este predio."
		});
	}
	function addHistory(statusOverride) {
		if (!form.numeroDocumento.trim() || !form.fechaDocumento || !form.expedienteTransferido.trim()) {
			setMensaje({
				tipo: "aviso",
				texto: "Complete el número de documento, la fecha y el expediente transferido."
			});
			return;
		}
		if (statusOverride === "TRANSFERIDO" && !registrado(DOC_REMISION) && !registrado(DOC_CARGO)) {
			setMensaje({
				tipo: "aviso",
				texto: `Suba «${DOC_REMISION}» o «${DOC_CARGO}» en su campo antes de registrar la transferencia.`
			});
			return;
		}
		const nextStatus = statusOverride ?? form.estado;
		const nextProgress = statusOverride === "TRANSFERIDO" ? 100 : Number(form.progreso || 0);
		const nextForm = {
			...form,
			estado: nextStatus,
			progreso: String(nextProgress),
			periodoEjecutado: nextStatus === "TRANSFERIDO" ? form.periodoEjecutado || currentMonth() : form.periodoEjecutado
		};
		const nextHistoryId = Math.max(0, ...history.map((item) => Number(item.id) || 0)) + 1;
		const nextHistory = [{
			id: String(nextHistoryId).padStart(3, "0"),
			documentDate: nextForm.fechaDocumento,
			comment: nextForm.comentario || "Registro de transferencia documentaria a OPAT",
			routeNumber: nextForm.hojaRuta,
			dependency: `${nextForm.dependenciaOrigen} → ${nextForm.dependenciaDestino}`,
			phase: nextForm.faseEstado,
			status: nextStatus,
			progress: nextProgress
		}, ...history];
		setForm(nextForm);
		setHistory(nextHistory);
		persist(nextForm, nextHistory);
		setMensaje({
			tipo: "exito",
			texto: nextStatus === "TRANSFERIDO" ? "Transferencia a OPAT registrada como culminada." : "Movimiento agregado al historial del trámite."
		});
	}
	function removeHistory(id) {
		const nextHistory = history.filter((row) => row.id !== id);
		setHistory(nextHistory);
		persist(form, nextHistory);
		setConfirmacion(null);
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
				titulo: "Transferencia documentaria a OPAT",
				icono: FolderInput,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: tonoEstado(form.estado),
					children: form.estado
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
						estado: "completado",
						detalle: "6.2 · acta de entrega",
						to: "/proyectos/$projectId/predios/$codigo/entrega-recepcion-ddp-opat",
						params
					},
					{
						nombre: "Transferencia documentaria",
						estado: "actual",
						detalle: "6.3 · remisión a OPAT"
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
				role: "status",
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
			/* @__PURE__ */ jsxs("form", {
				className: "space-y-4",
				onSubmit: (event) => {
					event.preventDefault();
					handleSaveDraft();
				},
				children: [
					/* @__PURE__ */ jsx(InformacionPredio, {
						projectId,
						codigo: decodedCodigo
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Antecedentes del predio",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Oficina registral",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.oficinaRegistral,
									onChange: (event) => setField("oficinaRegistral", event.target.value),
									placeholder: "Oficina registral SUNARP"
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Datos del otorgante",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.datosOtorgante,
									onChange: (event) => setField("datosOtorgante", event.target.value),
									placeholder: "Nombre o razón social"
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Área registral",
								obligatorio: true,
								ayuda: "En metros cuadrados",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									inputMode: "decimal",
									value: form.areaRegistral,
									onChange: (event) => setField("areaRegistral", event.target.value),
									placeholder: "0.0000"
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Fecha de inscripción",
								obligatorio: true,
								icono: CalendarDays,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "date",
									className: controlClase,
									value: form.fechaInscripcion,
									onChange: (event) => setField("fechaInscripcion", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Partida registral",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.partidaRegistral,
									onChange: (event) => setField("partidaRegistral", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Partida matriz",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.partidaMatriz,
									onChange: (event) => setField("partidaMatriz", event.target.value)
								})
							})
						] })
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Programación de metas de adquisiciones",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Nivel de viabilidad",
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									className: controlClase,
									value: form.nivelViabilidad,
									onChange: (event) => setField("nivelViabilidad", event.target.value),
									children: [
										/* @__PURE__ */ jsx("option", { children: "RIESGO BAJO" }),
										/* @__PURE__ */ jsx("option", { children: "RIESGO MEDIO" }),
										/* @__PURE__ */ jsx("option", { children: "RIESGO ALTO" })
									]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Periodo de programación",
								icono: CalendarDays,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "month",
									className: controlClase,
									value: form.periodoProgramacion,
									onChange: (event) => setField("periodoProgramacion", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Periodo ejecutado",
								icono: CalendarDays,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "month",
									className: controlClase,
									value: form.periodoEjecutado,
									onChange: (event) => setField("periodoEjecutado", event.target.value)
								})
							})
						] })
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Registro de la transferencia a OPAT",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Número de documento",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.numeroDocumento,
									onChange: (event) => setField("numeroDocumento", event.target.value),
									placeholder: "Ej. MEMORANDO N.° 000123-2026-MTC"
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Fecha del documento",
								obligatorio: true,
								icono: CalendarDays,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									type: "date",
									className: controlClase,
									value: form.fechaDocumento,
									onChange: (event) => setField("fechaDocumento", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Expediente transferido",
								obligatorio: true,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.expedienteTransferido,
									onChange: (event) => setField("expedienteTransferido", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Hoja de ruta",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.hojaRuta,
									onChange: (event) => setField("hojaRuta", event.target.value),
									placeholder: "Ej. HR-2026-001234"
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Dependencia de origen",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.dependenciaOrigen,
									onChange: (event) => setField("dependenciaOrigen", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Dependencia de destino",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.dependenciaDestino,
									onChange: (event) => setField("dependenciaDestino", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Responsable que entrega",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.responsableEntrega,
									onChange: (event) => setField("responsableEntrega", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Responsable que recibe",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: controlClase,
									value: form.responsableRecibe,
									onChange: (event) => setField("responsableRecibe", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Fase del estado",
								children: (id) => /* @__PURE__ */ jsxs("select", {
									id,
									className: controlClase,
									value: form.faseEstado,
									onChange: (event) => setField("faseEstado", event.target.value),
									children: [
										/* @__PURE__ */ jsx("option", { children: "PREPARACIÓN DEL EXPEDIENTE" }),
										/* @__PURE__ */ jsx("option", { children: "REMISIÓN DOCUMENTARIA" }),
										/* @__PURE__ */ jsx("option", { children: "REVISIÓN OPAT" }),
										/* @__PURE__ */ jsx("option", { children: "SUBSANACIÓN" }),
										/* @__PURE__ */ jsx("option", { children: "RECEPCIÓN CONFORME" })
									]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Estado y progreso",
								ayuda: "Progreso en porcentaje (0 a 100)",
								children: (id) => /* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-[1fr_110px] gap-2",
									children: [/* @__PURE__ */ jsxs("select", {
										id,
										className: controlClase,
										value: form.estado,
										onChange: (event) => setField("estado", event.target.value),
										children: [
											/* @__PURE__ */ jsx("option", { children: "BORRADOR" }),
											/* @__PURE__ */ jsx("option", { children: "EN PREPARACIÓN" }),
											/* @__PURE__ */ jsx("option", { children: "ENVIADO" }),
											/* @__PURE__ */ jsx("option", { children: "EN REVISIÓN OPAT" }),
											/* @__PURE__ */ jsx("option", { children: "OBSERVADO" }),
											/* @__PURE__ */ jsx("option", { children: "RECIBIDO" }),
											/* @__PURE__ */ jsx("option", { children: "TRANSFERIDO" })
										]
									}), /* @__PURE__ */ jsx("input", {
										type: "number",
										min: "0",
										max: "100",
										className: `${controlClase} text-right tabular-nums`,
										value: form.progreso,
										onChange: (event) => setField("progreso", event.target.value),
										"aria-label": "Progreso en porcentaje"
									})]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Comentario",
								ancho: "doble",
								children: (id) => /* @__PURE__ */ jsx("textarea", {
									id,
									rows: 3,
									className: `${controlClase} h-auto py-2`,
									value: form.comentario,
									onChange: (event) => setField("comentario", event.target.value),
									placeholder: "Detalle del envío, recepción u observaciones de OPAT"
								})
							})
						] })
					}),
					/* @__PURE__ */ jsxs(Section, {
						titulo: "Historial de envíos, recepciones y observaciones",
						acciones: /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => addHistory(),
							children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar movimiento"]
						}),
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "relative block w-full max-w-xs",
								children: [/* @__PURE__ */ jsx(Search, {
									size: 16,
									className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ jsx("input", {
									type: "search",
									className: `${controlClase} pl-9`,
									value: search,
									onChange: (event) => setSearch(event.target.value),
									placeholder: "Buscar en el historial",
									"aria-label": "Buscar en el historial"
								})]
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xs text-muted-foreground",
								children: [
									filteredHistory.length,
									" de ",
									history.length,
									" registro(s)"
								]
							})]
						}), /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "id",
									titulo: "ID",
									ancho: "60px",
									render: (r) => /* @__PURE__ */ jsx("span", {
										className: "font-semibold text-muted-foreground",
										children: r.id
									})
								},
								{
									clave: "documentDate",
									titulo: "Fecha",
									ancho: "110px",
									render: (r) => /* @__PURE__ */ jsx("span", {
										className: "whitespace-nowrap tabular-nums",
										children: formatDatePe(r.documentDate)
									})
								},
								{
									clave: "comment",
									titulo: "Comentario"
								},
								{
									clave: "routeNumber",
									titulo: "Hoja de ruta",
									render: (r) => r.routeNumber || "Sin hoja de ruta"
								},
								{
									clave: "dependency",
									titulo: "Dependencia"
								},
								{
									clave: "phase",
									titulo: "Fase"
								},
								{
									clave: "status",
									titulo: "Estado",
									render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
										tono: tonoEstado(r.status),
										children: r.status
									})
								},
								{
									clave: "progress",
									titulo: "Progreso",
									ancho: "130px",
									render: (r) => /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "h-1.5 flex-1 overflow-hidden rounded-sm bg-muted",
											role: "progressbar",
											"aria-valuenow": r.progress,
											"aria-valuemin": 0,
											"aria-valuemax": 100,
											"aria-label": "Progreso",
											children: /* @__PURE__ */ jsx("span", {
												className: "block h-full bg-primary",
												style: { width: `${Math.min(100, Math.max(0, r.progress))}%` }
											})
										}), /* @__PURE__ */ jsxs("span", {
											className: "w-10 text-right text-xs font-semibold tabular-nums",
											children: [r.progress, " %"]
										})]
									})
								},
								{
									clave: "acciones",
									titulo: "Acciones",
									alinear: "derecha",
									ancho: "100px",
									render: (r) => /* @__PURE__ */ jsx("span", {
										className: "inline-flex gap-1",
										children: /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setConfirmacion({
												titulo: "Eliminar movimiento",
												texto: `Se eliminará el movimiento ${r.id} del historial del trámite.`,
												accion: "Eliminar movimiento",
												onConfirmar: () => removeHistory(r.id)
											}),
											title: "Eliminar movimiento",
											"aria-label": `Eliminar movimiento ${r.id}`,
											className: "inline-flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
											children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
										})
									})
								}
							],
							filas: filteredHistory,
							claveFila: (r) => `${r.id}-${r.documentDate}`,
							vacio: history.length ? "No se encontraron movimientos con el criterio indicado." : "Ningún movimiento registrado en el historial del trámite."
						})]
					}),
					/* @__PURE__ */ jsx(Section, {
						titulo: "Documentos recibidos",
						children: /* @__PURE__ */ jsxs(FormGrid, {
							columnas: 1,
							children: [/* @__PURE__ */ jsx(FormField, {
								etiqueta: DOC_REMISION,
								ancho: "doble",
								children: () => /* @__PURE__ */ jsx(CampoDocumento, {
									projectId,
									codigo: decodedCodigo,
									nombre: DOC_REMISION,
									numero: form.numeroDocumento || void 0,
									fecha: form.fechaDocumento || void 0
								})
							}), /* @__PURE__ */ jsx(FormField, {
								etiqueta: DOC_CARGO,
								ancho: "doble",
								children: () => /* @__PURE__ */ jsx(CampoDocumento, {
									projectId,
									codigo: decodedCodigo,
									nombre: DOC_CARGO,
									emisor: "OPAT"
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
							disabled: !loaded,
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							onClick: () => addHistory("TRANSFERIDO"),
							children: [/* @__PURE__ */ jsx(Send, {}), " Registrar transferencia"]
						})
					] })
				]
			}),
			/* @__PURE__ */ jsx(Confirmar, {
				abierto: confirmacion !== null,
				onCerrar: () => setConfirmacion(null),
				onConfirmar: () => confirmacion?.onConfirmar(),
				titulo: confirmacion?.titulo ?? "",
				texto: confirmacion?.texto ?? "",
				accion: confirmacion?.accion ?? "Confirmar",
				destructiva: true
			})
		]
	});
}
function currentMonth() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
}
function normalizeDate(value) {
	const clean = String(value ?? "").trim();
	if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
	const match = clean.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
	if (!match) return "";
	return `${match[3].length === 2 ? `20${match[3]}` : match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}
function formatDatePe(value) {
	const normalized = normalizeDate(value);
	if (!normalized) return value || "Sin fecha";
	const [year, month, day] = normalized.split("-");
	return `${day}/${month}/${year}`;
}
//#endregion
export { TransferenciaDocumentariaOpatPage as component };
