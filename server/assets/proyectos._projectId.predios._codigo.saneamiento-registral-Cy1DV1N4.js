import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { f as vencimiento, g as fechaIso, h as fechaHora, m as fecha, n as getProyecto, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.saneamiento-registral-km37HpuE.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Banknote, Building2, CalendarDays, CheckCircle2, ClipboardCheck, History, Landmark, Plus, Save, SearchCheck, ShieldCheck, Trash2, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.saneamiento-registral.tsx?tsr-split=component
var DOC_CARGO = "Cargo de presentación del título ante SUNARP";
var DOC_CALIFICACION = "Esquela, liquidación o subsanación de la calificación registral";
var DOC_EXPEDIENTE = "Documentos del expediente de titulación";
var MENSAJE_CLASE = {
	success: "border-success bg-success-soft text-success",
	warning: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var etiquetasHistorial = {
	form: "Expediente",
	presentations: "Título presentado",
	qualifications: "Actuación SUNARP",
	zonaRegistral: "Zona registral",
	oficinaRegistral: "Oficina registral",
	partidaMatriz: "Partida matriz",
	titularActual: "Titular actual",
	areaAntecedente: "Área de antecedente",
	condicionRegistral: "Condición registral",
	tipoSaneamiento: "Tipo de saneamiento",
	actoSolicitado: "Acto solicitado",
	baseLegal: "Base legal",
	resolucionSustento: "Resolución de sustento",
	fechaResolucion: "Fecha de resolución",
	areaTitular: "Área a titular",
	responsableLegal: "Responsable legal",
	responsableTecnico: "Responsable técnico",
	titularDestino: "Titular de destino",
	rucTitularDestino: "RUC del titular de destino",
	estadoExpediente: "Estado del expediente",
	estadoResultado: "Estado del resultado",
	numeroTituloFinal: "N.° de título final",
	asientoInscripcion: "Asiento de inscripción",
	partidaFinal: "Partida final",
	fechaInscripcion: "Fecha de inscripción",
	areaInscrita: "Área inscrita",
	propietarioFinal: "Propietario final",
	observacionesResultado: "Observaciones del resultado",
	numeroTitulo: "N.° de título",
	fechaPresentacion: "Fecha de presentación",
	numeroDocumento: "N.° de documento",
	estado: "Estado",
	tipo: "Tipo"
};
function today() {
	return fechaIso(/* @__PURE__ */ new Date());
}
function addDays(date, days) {
	const value = /* @__PURE__ */ new Date(`${date}T12:00:00`);
	value.setDate(value.getDate() + days);
	return value.toISOString().slice(0, 10);
}
function timestamp() {
	return fechaHora(/* @__PURE__ */ new Date());
}
function makeId(prefix) {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
var aFecha = (iso) => iso ? /* @__PURE__ */ new Date(`${iso}T00:00:00`) : null;
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
function AccionesFila({ onEliminar }) {
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex gap-1",
		children: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			size: "icon",
			className: "size-8 text-destructive hover:bg-destructive-soft",
			title: "Eliminar registro",
			"aria-label": "Eliminar registro",
			onClick: onEliminar,
			children: /* @__PURE__ */ jsx(Trash2, {})
		})
	});
}
function SaneamientoRegistralPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const predioCode = predio?.cod || decodedCodigo;
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const storageKey = `saneamiento-registral:${projectId}:${decodedCodigo}`;
	const initialForm = useMemo(() => ({
		zonaRegistral: "ZONA REGISTRAL N.° VIII - SEDE HUANCAYO",
		oficinaRegistral: predio?.ofi || "OFICINA REGISTRAL DE JAUJA",
		partidaMatriz: predio?.part || "11024567",
		titularActual: predio?.suj || "COMUNIDAD CAMPESINA DE SAUSA",
		areaAntecedente: predio?.m2 || "1,250.0000",
		condicionRegistral: "ÁREA POR INDEPENDIZAR DE PARTIDA MATRIZ",
		tipoSaneamiento: "INDEPENDIZACIÓN Y TITULACIÓN",
		actoSolicitado: "INDEPENDIZACIÓN E INSCRIPCIÓN DE DOMINIO A FAVOR DEL MTC",
		baseLegal: "Decreto Legislativo N.° 1192 y normas registrales aplicables",
		resolucionSustento: "R.M. N.° 412-2026-MTC/01.02",
		fechaResolucion: "2026-08-18",
		areaTitular: predio?.m2 || "1,250.0000",
		responsableLegal: predio?.rlegal || "María Elena Torres Huamán",
		responsableTecnico: predio?.rtec || "Carlos Alberto Mendoza Rojas",
		titularDestino: "MINISTERIO DE TRANSPORTES Y COMUNICACIONES",
		rucTitularDestino: "20131379944",
		estadoExpediente: "EXPEDIENTE TÉCNICO-LEGAL COMPLETO",
		estadoResultado: "PENDIENTE",
		numeroTituloFinal: "",
		asientoInscripcion: "",
		partidaFinal: "",
		fechaInscripcion: "",
		areaInscrita: predio?.m2 || "1,250.0000",
		propietarioFinal: "MINISTERIO DE TRANSPORTES Y COMUNICACIONES",
		observacionesResultado: ""
	}), [
		predio?.m2,
		predio?.ofi,
		predio?.part,
		predio?.rlegal,
		predio?.rtec,
		predio?.suj
	]);
	const initialPresentation = useMemo(() => ({
		numeroTitulo: "2026-01874562",
		anioTitulo: "2026",
		oficina: "OFICINA REGISTRAL DE JAUJA",
		fechaPresentacion: "2026-08-20",
		fechaVencimiento: "2026-09-10",
		lugarPresentacion: "SID SUNARP / JAUJA",
		presentante: "María Elena Torres Huamán",
		tipoDocumento: "DNI",
		numeroDocumento: "42156874",
		reciboPago: "REC-2026-45871",
		montoPagado: "248.60",
		estado: "PRESENTADO",
		observaciones: "Título presentado para independización e inscripción a favor del MTC."
	}), []);
	const initialQualification = useMemo(() => ({
		fecha: today(),
		tipo: "ESQUELA DE OBSERVACIÓN",
		numeroDocumento: "",
		detalle: "",
		fechaLimite: addDays(today(), 15),
		estado: "PENDIENTE DE ATENCIÓN"
	}), []);
	const [form, setForm] = useState(initialForm);
	const [presentationDraft, setPresentationDraft] = useState(initialPresentation);
	const [presentations, setPresentations] = useState([]);
	const [qualificationDraft, setQualificationDraft] = useState(initialQualification);
	const [qualifications, setQualifications] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [message, setMessage] = useState(null);
	const [porEliminar, setPorEliminar] = useState(null);
	const rol = useRol();
	const items = useItems();
	const usados = new Set([...presentations.map((p) => p.cargoItemId), ...qualifications.map((q) => q.documentoItemId)].filter(Boolean));
	const sinUsar = items.filter((i) => !usados.has(i.id));
	const docNuevo = (nombre) => documentoDelCampo(sinUsar, decodedCodigo, nombre);
	const claveHistorial = `saneamiento-registral-${decodedCodigo}`;
	const bitacora = {
		modulo: 13,
		entidad: "saneamiento_registral"
	};
	const versiones = useHistorial(claveHistorial);
	const versionar = (accion, objeto, despues, motivo) => registrarCambio(claveHistorial, {
		accion,
		objeto,
		motivo,
		antes: versiones[0]?.registro ?? {
			form: initialForm,
			presentations: [],
			qualifications: []
		},
		despues
	}, bitacora);
	const currentStatus = form.estadoResultado === "INSCRITO" ? "TITULADO A FAVOR DEL MTC" : qualifications.some((entry) => entry.estado.includes("PENDIENTE")) ? "OBSERVADO" : presentations.length ? form.estadoExpediente : "EXPEDIENTE EN PREPARACIÓN";
	const estadoTono = form.estadoResultado === "INSCRITO" ? "success" : currentStatus === "OBSERVADO" ? "warning" : "primary";
	const venceCalificacion = presentationDraft.fechaPresentacion ? vencimiento(aFecha(presentationDraft.fechaPresentacion), plazo("inscripcion")) : null;
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) {
				const parsed = JSON.parse(stored);
				setForm({
					...initialForm,
					...parsed.form
				});
				setPresentationDraft({
					...initialPresentation,
					...parsed.presentationDraft
				});
				setPresentations(parsed.presentations || []);
				setQualificationDraft({
					...initialQualification,
					...parsed.qualificationDraft
				});
				setQualifications(parsed.qualifications || []);
			}
		} catch {
			setMessage({
				type: "warning",
				text: "No se pudo recuperar el expediente anterior. Se cargaron datos de referencia."
			});
		} finally {
			setLoaded(true);
		}
	}, [
		initialForm,
		initialPresentation,
		initialQualification,
		storageKey
	]);
	useEffect(() => {
		if (!loaded) return;
		window.localStorage.setItem(storageKey, JSON.stringify({
			form,
			presentationDraft,
			presentations,
			qualificationDraft,
			qualifications
		}));
	}, [
		form,
		loaded,
		presentationDraft,
		presentations,
		qualificationDraft,
		qualifications,
		storageKey
	]);
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function setPresentationField(key, value) {
		setPresentationDraft((current) => ({
			...current,
			[key]: value
		}));
	}
	function setQualificationField(key, value) {
		setQualificationDraft((current) => ({
			...current,
			[key]: value
		}));
	}
	function handleRegisterPresentation() {
		if (!presentationDraft.numeroTitulo.trim() || !presentationDraft.fechaPresentacion) {
			setMessage({
				type: "warning",
				text: "Complete el número de título y la fecha de presentación."
			});
			return;
		}
		const cargo = docNuevo(DOC_CARGO);
		if (!cargo) {
			setMessage({
				type: "warning",
				text: "Suba el cargo de presentación en «Documentos recibidos»."
			});
			return;
		}
		const entry = {
			id: makeId("titulo-sunarp"),
			...presentationDraft,
			cargoItemId: cargo.id,
			fechaRegistro: timestamp()
		};
		const formNuevo = {
			...form,
			estadoExpediente: "EN CALIFICACIÓN SUNARP"
		};
		const presentacionesNuevas = [entry, ...presentations];
		setPresentations(presentacionesNuevas);
		setForm(formNuevo);
		versionar("Registró título presentado", `Título ${entry.numeroTitulo}`, {
			form: formNuevo,
			presentations: presentacionesNuevas,
			qualifications
		});
		setMessage({
			type: "success",
			text: `Título ${entry.numeroTitulo} registrado y enviado a seguimiento de calificación.`
		});
	}
	function handleRegisterQualification() {
		if (!presentations.length) {
			setMessage({
				type: "warning",
				text: "Primero registre la presentación del título ante SUNARP."
			});
			return;
		}
		if (!qualificationDraft.numeroDocumento.trim() || !qualificationDraft.detalle.trim()) {
			setMessage({
				type: "warning",
				text: "Complete el número y el detalle del documento de calificación."
			});
			return;
		}
		const documento = docNuevo(DOC_CALIFICACION);
		if (!documento) {
			setMessage({
				type: "warning",
				text: "Suba la esquela, liquidación o subsanación en «Documentos recibidos»."
			});
			return;
		}
		const entry = {
			id: makeId("calificacion-sunarp"),
			...qualificationDraft,
			documentoItemId: documento.id,
			fechaRegistro: timestamp()
		};
		const formNuevo = {
			...form,
			estadoExpediente: entry.tipo.includes("SUBSANACIÓN") ? "SUBSANADO" : entry.tipo.includes("OBSERVACIÓN") ? "OBSERVADO" : "EN CALIFICACIÓN SUNARP"
		};
		const actuacionesNuevas = [entry, ...qualifications];
		setQualifications(actuacionesNuevas);
		setForm(formNuevo);
		versionar("Registró actuación de calificación", `${entry.tipo} N.° ${entry.numeroDocumento}`, {
			form: formNuevo,
			presentations,
			qualifications: actuacionesNuevas
		});
		setQualificationDraft({
			...initialQualification,
			fecha: today(),
			fechaLimite: addDays(today(), 15)
		});
		setMessage({
			type: "success",
			text: "Actuación de calificación registrada."
		});
	}
	function handleDelete(id, target, nombre, motivo) {
		const presentacionesNuevas = target === "presentation" ? presentations.filter((entry) => entry.id !== id) : presentations;
		const actuacionesNuevas = target === "qualification" ? qualifications.filter((entry) => entry.id !== id) : qualifications;
		setPresentations(presentacionesNuevas);
		setQualifications(actuacionesNuevas);
		versionar("Eliminó registro", nombre, {
			form,
			presentations: presentacionesNuevas,
			qualifications: actuacionesNuevas
		}, motivo);
		setMessage({
			type: "success",
			text: "Registro eliminado."
		});
	}
	function handleSave() {
		if (!form.partidaMatriz.trim() || !form.areaTitular.trim()) {
			setMessage({
				type: "warning",
				text: "Complete la partida matriz y el área materia de titulación."
			});
			return;
		}
		if (form.estadoResultado === "INSCRITO" && !form.partidaFinal.trim()) {
			setMessage({
				type: "warning",
				text: "Para concluir como inscrito debe registrar la nueva partida a favor del MTC."
			});
			return;
		}
		window.localStorage.setItem(storageKey, JSON.stringify({
			form,
			presentationDraft,
			presentations,
			qualificationDraft,
			qualifications
		}));
		versionar(versiones.length ? "Modificó el expediente" : "Creó el expediente", `Predio ${predioCode}: ${currentStatus}`, {
			form,
			presentations,
			qualifications
		});
		setMessage({
			type: "success",
			text: "Expediente de titulación guardado."
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
				titulo: "Saneamiento registral y titulación",
				icono: Landmark,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: estadoTono,
					children: currentStatus
				})
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Inscripción registral y saneamiento · art. 22 y 30, DCF 2.ª del TUO del DL 1192",
				className: "mb-4",
				children: [
					/* @__PURE__ */ jsx(Stepper, { pasos: [
						{
							nombre: "Saneamiento registral",
							estado: "actual",
							detalle: "DCF 2.ª · 120 d.h. desde el formulario registral"
						},
						{
							nombre: "Presentación SID",
							estado: "pendiente",
							detalle: "Art. 22 · remisión 5 d.h.",
							to: "/proyectos/$projectId/predios/$codigo/inscripcion-registral-sid",
							params: {
								projectId,
								codigo
							}
						},
						{
							nombre: "Inscripción registral",
							estado: "pendiente",
							detalle: "Art. 22 y 30 · 7 d.h.",
							to: "/proyectos/$projectId/predios/$codigo/inscripcion-registral",
							params: {
								projectId,
								codigo
							}
						},
						{
							nombre: "Transferencia interestatal (SBN)",
							estado: "pendiente",
							to: "/proyectos/$projectId/predios/$codigo/transferencia-interestatal-sbn",
							params: {
								projectId,
								codigo
							}
						}
					] }),
					venceCalificacion && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
						children: ["Calificación del registrador para el título en preparación (art. 22 y 30, 7 d.h. desde la presentación):", /* @__PURE__ */ jsx(PlazoBadge, { vence: venceCalificacion })]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs text-warning",
						children: "Datos de demostración: los valores iniciales del expediente son referenciales hasta conectar el servicio."
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(Resumen, {
						icon: /* @__PURE__ */ jsx(Building2, { size: 16 }),
						label: "Titular de destino",
						value: "MTC"
					}),
					/* @__PURE__ */ jsx(Resumen, {
						icon: /* @__PURE__ */ jsx(ClipboardCheck, { size: 16 }),
						label: "Títulos presentados",
						value: `${presentations.length}`
					}),
					/* @__PURE__ */ jsx(Resumen, {
						icon: /* @__PURE__ */ jsx(SearchCheck, { size: 16 }),
						label: "Actuaciones SUNARP",
						value: `${qualifications.length}`
					}),
					/* @__PURE__ */ jsx(Resumen, {
						icon: /* @__PURE__ */ jsx(ShieldCheck, { size: 16 }),
						label: "Estado",
						value: currentStatus
					})
				]
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
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "registro",
						children: [
							/* @__PURE__ */ jsx(InformacionPredio, {
								projectId,
								codigo: decodedCodigo,
								className: "mb-4"
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Antecedentes registrales",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Zona registral",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.zonaRegistral,
											onChange: (event) => setField("zonaRegistral", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Oficina registral",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.oficinaRegistral,
											onChange: (event) => setField("oficinaRegistral", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Partida matriz",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.partidaMatriz,
											onChange: (event) => setField("partidaMatriz", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Titular registral actual",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.titularActual,
											onChange: (event) => setField("titularActual", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Área del antecedente (m²)",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											inputMode: "decimal",
											value: form.areaAntecedente,
											onChange: (event) => setField("areaAntecedente", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Condición registral",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.condicionRegistral,
											onChange: (event) => setField("condicionRegistral", event.target.value)
										})
									})
								] })
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Expediente técnico legal de titulación",
								className: "mt-4",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Tipo de saneamiento",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											value: form.tipoSaneamiento,
											onChange: (event) => setField("tipoSaneamiento", event.target.value),
											children: [
												/* @__PURE__ */ jsx("option", { children: "INDEPENDIZACIÓN Y TITULACIÓN" }),
												/* @__PURE__ */ jsx("option", { children: "INMATRICULACIÓN" }),
												/* @__PURE__ */ jsx("option", { children: "RECTIFICACIÓN DE ÁREA Y TITULACIÓN" }),
												/* @__PURE__ */ jsx("option", { children: "ACUMULACIÓN E INSCRIPCIÓN DE DOMINIO" })
											]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Acto solicitado",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.actoSolicitado,
											onChange: (event) => setField("actoSolicitado", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Base legal",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.baseLegal,
											onChange: (event) => setField("baseLegal", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Resolución de sustento",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.resolucionSustento,
											onChange: (event) => setField("resolucionSustento", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Fecha de resolución",
										icono: CalendarDays,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: form.fechaResolucion,
											onChange: (event) => setField("fechaResolucion", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Área a titular (m²)",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											inputMode: "decimal",
											value: form.areaTitular,
											onChange: (event) => setField("areaTitular", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Especialista legal",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.responsableLegal,
											onChange: (event) => setField("responsableLegal", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Especialista técnico",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.responsableTecnico,
											onChange: (event) => setField("responsableTecnico", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Titular de destino",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: `${controlClase} bg-muted`,
											value: form.titularDestino,
											readOnly: true
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "RUC del MTC",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: `${controlClase} bg-muted`,
											value: form.rucTitularDestino,
											readOnly: true
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Estado del expediente",
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											value: form.estadoExpediente,
											onChange: (event) => setField("estadoExpediente", event.target.value),
											children: [
												/* @__PURE__ */ jsx("option", { children: "EXPEDIENTE EN PREPARACIÓN" }),
												/* @__PURE__ */ jsx("option", { children: "EXPEDIENTE TÉCNICO-LEGAL COMPLETO" }),
												/* @__PURE__ */ jsx("option", { children: "PRESENTADO A SUNARP" }),
												/* @__PURE__ */ jsx("option", { children: "EN CALIFICACIÓN SUNARP" }),
												/* @__PURE__ */ jsx("option", { children: "OBSERVADO" }),
												/* @__PURE__ */ jsx("option", { children: "SUBSANADO" }),
												/* @__PURE__ */ jsx("option", { children: "CONCLUIDO" })
											]
										})
									})
								] })
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Presentación del título ante SUNARP",
								className: "mt-4",
								children: [
									/* @__PURE__ */ jsx(Subtitulo, { children: "Datos del título presentado" }),
									/* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de título",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: presentationDraft.numeroTitulo,
												onChange: (event) => setPresentationField("numeroTitulo", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Año del título",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: presentationDraft.anioTitulo,
												onChange: (event) => setPresentationField("anioTitulo", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Oficina registral",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: presentationDraft.oficina,
												onChange: (event) => setPresentationField("oficina", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de presentación",
											obligatorio: true,
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: presentationDraft.fechaPresentacion,
												onChange: (event) => setPresentationField("fechaPresentacion", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de vencimiento",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: presentationDraft.fechaVencimiento,
												onChange: (event) => setPresentationField("fechaVencimiento", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Lugar o canal",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: presentationDraft.lugarPresentacion,
												onChange: (event) => setPresentationField("lugarPresentacion", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Presentante",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: presentationDraft.presentante,
												onChange: (event) => setPresentationField("presentante", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Documento del presentante",
											children: (id) => /* @__PURE__ */ jsxs("div", {
												className: "grid grid-cols-[90px_1fr] gap-2",
												children: [/* @__PURE__ */ jsxs("select", {
													"aria-label": "Tipo de documento",
													className: controlClase,
													value: presentationDraft.tipoDocumento,
													onChange: (event) => setPresentationField("tipoDocumento", event.target.value),
													children: [
														/* @__PURE__ */ jsx("option", { children: "DNI" }),
														/* @__PURE__ */ jsx("option", { children: "CE" }),
														/* @__PURE__ */ jsx("option", { children: "CIP" })
													]
												}), /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: presentationDraft.numeroDocumento,
													onChange: (event) => setPresentationField("numeroDocumento", event.target.value)
												})]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Recibo de pago",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: presentationDraft.reciboPago,
												onChange: (event) => setPresentationField("reciboPago", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Monto pagado",
											icono: Banknote,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												inputMode: "decimal",
												value: presentationDraft.montoPagado,
												onChange: (event) => setPresentationField("montoPagado", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Estado",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: presentationDraft.estado,
												onChange: (event) => setPresentationField("estado", event.target.value),
												children: [
													/* @__PURE__ */ jsx("option", { children: "PRESENTADO" }),
													/* @__PURE__ */ jsx("option", { children: "EN CALIFICACIÓN" }),
													/* @__PURE__ */ jsx("option", { children: "OBSERVADO" }),
													/* @__PURE__ */ jsx("option", { children: "SUBSANADO" }),
													/* @__PURE__ */ jsx("option", { children: "INSCRITO" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Observaciones",
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 2,
												className: `${controlClase} h-auto py-2`,
												value: presentationDraft.observaciones,
												onChange: (event) => setPresentationField("observaciones", event.target.value)
											})
										})
									] }),
									/* @__PURE__ */ jsx("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "Suba el cargo en «Documentos recibidos» antes de registrar el título."
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-3 flex justify-end",
										children: /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											onClick: handleRegisterPresentation,
											children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar título presentado"]
										})
									}),
									/* @__PURE__ */ jsx(Subtitulo, { children: "Títulos presentados" }),
									/* @__PURE__ */ jsx(Tabla, {
										columnas: [
											{
												clave: "numeroTitulo",
												titulo: "Título",
												render: (e) => /* @__PURE__ */ jsx("span", {
													className: "font-semibold",
													children: e.numeroTitulo
												})
											},
											{
												clave: "fechaPresentacion",
												titulo: "Presentación y vencimiento",
												render: (e) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
													className: "block",
													children: fecha(aFecha(e.fechaPresentacion))
												}), aFecha(e.fechaVencimiento) && /* @__PURE__ */ jsx(PlazoBadge, { vence: aFecha(e.fechaVencimiento) })] })
											},
											{
												clave: "oficina",
												titulo: "Oficina"
											},
											{
												clave: "presentante",
												titulo: "Presentante",
												render: (e) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
													className: "block",
													children: e.presentante
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-xs text-muted-foreground",
													children: [
														e.tipoDocumento,
														" ",
														e.numeroDocumento
													]
												})] })
											},
											{
												clave: "montoPagado",
												titulo: "Pago",
												render: (e) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("span", {
													className: "block tabular-nums",
													children: ["S/ ", e.montoPagado]
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: e.reciboPago
												})] })
											},
											{
												clave: "estado",
												titulo: "Estado",
												render: (e) => /* @__PURE__ */ jsx(StatusBadge, {
													tono: e.estado === "INSCRITO" ? "success" : e.estado === "OBSERVADO" ? "warning" : "primary",
													children: e.estado
												})
											},
											{
												clave: "acciones",
												titulo: "Acciones",
												alinear: "derecha",
												render: (e) => /* @__PURE__ */ jsx(AccionesFila, { onEliminar: () => setPorEliminar({
													id: e.id,
													target: "presentation",
													nombre: `el título ${e.numeroTitulo}`
												}) })
											}
										],
										filas: presentations,
										claveFila: (e) => e.id,
										vacio: "No existen títulos presentados registrados."
									})
								]
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Calificación, observaciones y subsanaciones",
								className: "mt-4",
								children: [
									/* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de actuación",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: qualificationDraft.fecha,
												onChange: (event) => setQualificationField("fecha", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Tipo de actuación",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: qualificationDraft.tipo,
												onChange: (event) => setQualificationField("tipo", event.target.value),
												children: [
													/* @__PURE__ */ jsx("option", { children: "ESQUELA DE OBSERVACIÓN" }),
													/* @__PURE__ */ jsx("option", { children: "LIQUIDACIÓN DE MAYOR DERECHO" }),
													/* @__PURE__ */ jsx("option", { children: "DOCUMENTO DE SUBSANACIÓN" }),
													/* @__PURE__ */ jsx("option", { children: "ESQUELA DE TACHA" }),
													/* @__PURE__ */ jsx("option", { children: "PRÓRROGA DEL ASIENTO DE PRESENTACIÓN" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de documento",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: qualificationDraft.numeroDocumento,
												onChange: (event) => setQualificationField("numeroDocumento", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha límite de atención",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: qualificationDraft.fechaLimite,
												onChange: (event) => setQualificationField("fechaLimite", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Estado",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: qualificationDraft.estado,
												onChange: (event) => setQualificationField("estado", event.target.value),
												children: [
													/* @__PURE__ */ jsx("option", { children: "PENDIENTE DE ATENCIÓN" }),
													/* @__PURE__ */ jsx("option", { children: "EN PREPARACIÓN" }),
													/* @__PURE__ */ jsx("option", { children: "ATENDIDO" }),
													/* @__PURE__ */ jsx("option", { children: "VENCIDO" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Detalle",
											obligatorio: true,
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 2,
												className: `${controlClase} h-auto py-2`,
												value: qualificationDraft.detalle,
												onChange: (event) => setQualificationField("detalle", event.target.value),
												placeholder: "Describa la observación, requisito pendiente o subsanación presentada."
											})
										})
									] }),
									/* @__PURE__ */ jsx("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "Suba la esquela, liquidación o subsanación en «Documentos recibidos» antes de agregar la actuación."
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-3 flex justify-end",
										children: /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											onClick: handleRegisterQualification,
											children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar actuación"]
										})
									}),
									/* @__PURE__ */ jsx(Subtitulo, { children: "Actuaciones registradas" }),
									/* @__PURE__ */ jsx(Tabla, {
										columnas: [
											{
												clave: "fecha",
												titulo: "Fecha",
												ancho: "110px",
												render: (e) => fecha(aFecha(e.fecha))
											},
											{
												clave: "tipo",
												titulo: "Actuación",
												render: (e) => /* @__PURE__ */ jsx("span", {
													className: "font-medium",
													children: e.tipo
												})
											},
											{
												clave: "numeroDocumento",
												titulo: "Documento",
												render: (e) => /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx("span", {
													className: "block",
													children: e.numeroDocumento
												}) })
											},
											{
												clave: "detalle",
												titulo: "Detalle"
											},
											{
												clave: "fechaLimite",
												titulo: "Plazo",
												render: (e) => aFecha(e.fechaLimite) ? /* @__PURE__ */ jsx(PlazoBadge, { vence: aFecha(e.fechaLimite) }) : "Sin plazo"
											},
											{
												clave: "estado",
												titulo: "Estado",
												render: (e) => /* @__PURE__ */ jsx(StatusBadge, {
													tono: e.estado === "ATENDIDO" ? "success" : e.estado === "VENCIDO" ? "destructive" : "warning",
													children: e.estado
												})
											},
											{
												clave: "acciones",
												titulo: "Acciones",
												alinear: "derecha",
												render: (e) => /* @__PURE__ */ jsx(AccionesFila, { onEliminar: () => setPorEliminar({
													id: e.id,
													target: "qualification",
													nombre: `la actuación ${e.numeroDocumento}`
												}) })
											}
										],
										filas: qualifications,
										claveFila: (e) => e.id,
										vacio: "No existen actuaciones de calificación registradas."
									})
								]
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Resultado final de la titulación",
								className: "mt-4",
								children: [form.estadoResultado === "INSCRITO" && /* @__PURE__ */ jsxs("p", {
									role: "status",
									className: "mb-3 flex items-center gap-2 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
									children: [/* @__PURE__ */ jsx(CheckCircle2, {
										size: 16,
										"aria-hidden": true
									}), " Predio titulado e inscrito a favor del Ministerio de Transportes y Comunicaciones."]
								}), /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Resultado",
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											value: form.estadoResultado,
											onChange: (event) => setField("estadoResultado", event.target.value),
											children: [
												/* @__PURE__ */ jsx("option", { children: "PENDIENTE" }),
												/* @__PURE__ */ jsx("option", { children: "INSCRITO" }),
												/* @__PURE__ */ jsx("option", { children: "TACHADO" }),
												/* @__PURE__ */ jsx("option", { children: "DESISTIDO" })
											]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Número de título final",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.numeroTituloFinal,
											onChange: (event) => setField("numeroTituloFinal", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Nueva partida registral",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.partidaFinal,
											onChange: (event) => setField("partidaFinal", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Asiento de inscripción",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.asientoInscripcion,
											onChange: (event) => setField("asientoInscripcion", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Fecha de inscripción",
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
										etiqueta: "Área inscrita (m²)",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											inputMode: "decimal",
											value: form.areaInscrita,
											onChange: (event) => setField("areaInscrita", event.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Propietario final",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: `${controlClase} bg-muted`,
											value: form.propietarioFinal,
											readOnly: true
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Observaciones",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("textarea", {
											id,
											rows: 2,
											className: `${controlClase} h-auto py-2`,
											value: form.observacionesResultado,
											onChange: (event) => setField("observacionesResultado", event.target.value)
										})
									})
								] })]
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Documentos recibidos",
								className: "mt-4",
								children: /* @__PURE__ */ jsxs(FormGrid, {
									columnas: 1,
									children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Documentos del expediente de titulación (PDF)",
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: DOC_EXPEDIENTE,
												accept: ".pdf"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Cargo de presentación del título ante SUNARP",
											obligatorio: true,
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: DOC_CARGO,
												excluir: [...usados],
												numero: presentationDraft.numeroTitulo || void 0,
												fecha: presentationDraft.fechaPresentacion || void 0,
												emisor: "SUNARP"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Esquela, liquidación o subsanación",
											obligatorio: true,
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: DOC_CALIFICACION,
												excluir: [...usados],
												numero: qualificationDraft.numeroDocumento || void 0,
												fecha: qualificationDraft.fecha || void 0
											})
										})
									]
								})
							}),
							/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => window.history.back(),
								children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								onClick: handleSave,
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar expediente"]
							})] })
						]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Saneamiento registral y titulación",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									setForm({
										...initialForm,
										...r.form
									});
									setPresentations(r.presentations);
									setQualifications(r.qualifications);
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
			}),
			porEliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: porEliminar.nombre.charAt(0).toUpperCase() + porEliminar.nombre.slice(1),
				tipo: "registro",
				onCerrar: () => setPorEliminar(null),
				onConfirmar: (motivo) => {
					handleDelete(porEliminar.id, porEliminar.target, porEliminar.nombre, motivo);
					setPorEliminar(null);
				}
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
export { SaneamientoRegistralPage as component };
