import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, g as fechaIso, h as fechaHora, i as estadoPlazo, m as fecha, n as getProyecto, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { U as itemActual, it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, Q as declaratoriaDelProyecto, X as GORES_CON_FUNCIONES, n as etiquetaProyecto, nt as useNormasProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.transferencia-interestatal-sbn-Y3GNjvOA.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CalendarDays, CheckCircle2, History, Landmark, Save, Send, Trash2, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.transferencia-interestatal-sbn.tsx?tsr-split=component
/** Cargo que el formulario pide y el catálogo del paso no tiene: se sube en su campo de la sección 2. */
var CARGO_SBN = "Cargo de mesa de partes de la SBN";
var OFICIO_FIRMADO = "Oficio de transferencia interestatal firmado";
var etiquetasHistorial = {
	form: "Transferencia",
	submissions: "Presentación en mesa de partes",
	entidadTransferente: "Entidad transferente",
	entidadBeneficiaria: "Entidad beneficiaria",
	dependenciaSbn: "Dependencia SBN",
	cusSbn: "CUS SBN",
	oficinaRegistral: "Oficina registral",
	partidaRegistral: "Partida registral",
	areaRegistral: "Área registral",
	numeroOficio: "N.° de oficio",
	fechaOficio: "Fecha del oficio",
	destinatario: "Destinatario",
	cargoDestinatario: "Cargo del destinatario",
	asunto: "Asunto",
	referencia: "Referencia",
	sustento: "Sustento",
	anexos: "Anexos",
	responsable: "Responsable",
	estado: "Estado",
	resolucionSbn: "Resolución de la SBN",
	fechaResolucion: "Fecha de resolución",
	publicacion: "Publicación",
	fechaPublicacion: "Fecha de publicación",
	fechaInscripcion: "Fecha de inscripción",
	partidaFinal: "Partida final",
	observacionesResultado: "Observaciones del resultado",
	destinatarioSolicitud: "Destinatario de la solicitud",
	fechaPresentacion: "Fecha de presentación",
	fechaAnotacion: "Inscripción de la anotación preventiva",
	verificacion: "Lista de verificación",
	archivo: "Archivo",
	version: "Versión",
	tipo: "Tipo",
	numeroTramite: "N.° de trámite",
	oficio: "Oficio",
	fechaIngreso: "Fecha de ingreso"
};
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
function currentTime() {
	return (/* @__PURE__ */ new Date()).toTimeString().slice(0, 5);
}
function makeId(prefix) {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function Cifra({ etiqueta, valor }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-background px-3 py-2",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: etiqueta
		}), /* @__PURE__ */ jsx("p", {
			className: "truncate text-lg font-semibold tabular-nums",
			children: valor
		})]
	});
}
function TransferenciaInterestatalSbnPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const predioCode = predio?.cod || decodedCodigo;
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	predioCode.replace(/[^A-Z0-9-]/gi, "").toUpperCase();
	const storageKey = `transferencia-interestatal-sbn:${projectId}:${decodedCodigo}`;
	const initialForm = useMemo(() => ({
		entidadTransferente: "ESTADO PERUANO",
		entidadBeneficiaria: "MINISTERIO DE TRANSPORTES Y COMUNICACIONES",
		dependenciaSbn: "SDAPE - Subdirección de Administración del Patrimonio Estatal",
		cusSbn: "",
		oficinaRegistral: predio?.ofi || "",
		partidaRegistral: predio?.part || "",
		areaRegistral: predio?.m2 || "",
		numeroOficio: "",
		fechaOficio: fechaIso(/* @__PURE__ */ new Date()),
		destinatario: "Superintendente Nacional de Bienes Estatales",
		cargoDestinatario: "SUPERINTENDENCIA NACIONAL DE BIENES ESTATALES",
		asunto: `Solicitud de transferencia interestatal del predio ${predioCode}`,
		referencia: predio?.exp ? `Expediente predial ${predio.exp}` : "Expediente predial",
		sustento: "Se solicita la transferencia interestatal a favor del Ministerio de Transportes y Comunicaciones para la ejecución y continuidad del proyecto de infraestructura indicado.",
		anexos: "Memoria descriptiva, plano perimétrico, plano de ubicación, partida registral y documentación técnica y legal del predio.",
		responsable: proyecto?.coordinadorPredial || predio?.rlegal || "",
		estado: "BORRADOR",
		resolucionSbn: "",
		fechaResolucion: "",
		publicacion: "",
		fechaPublicacion: "",
		fechaInscripcion: "",
		partidaFinal: predio?.part || "",
		observacionesResultado: "",
		destinatarioSolicitud: "SBN",
		fechaPresentacion: "",
		fechaAnotacion: "",
		verificacion: "{}"
	}), [
		predio?.exp,
		predio?.m2,
		predio?.ofi,
		predio?.part,
		predio?.rlegal,
		predioCode,
		proyecto?.coordinadorPredial
	]);
	const initialMesaDraft = useMemo(() => ({
		fechaIngreso: fechaIso(/* @__PURE__ */ new Date()),
		horaIngreso: currentTime(),
		canal: "MESA DE PARTES VIRTUAL SBN",
		numeroTramite: "",
		expedienteSbn: "",
		hojaRuta: "",
		dependencia: "SDAPE",
		recibidoPor: "Mesa de Partes SBN",
		correoUrl: "",
		estado: "PRESENTADO",
		observaciones: ""
	}), []);
	const [form, setForm] = useState(initialForm);
	const [submissions, setSubmissions] = useState([]);
	const [mesaDraft, setMesaDraft] = useState(initialMesaDraft);
	const [loaded, setLoaded] = useState(false);
	const [mensaje, setMensaje] = useState(null);
	const [porEliminar, setPorEliminar] = useState(null);
	const rol = useRol();
	const items = useItems();
	const oficio = itemActual(items, decodedCodigo, "sbn-oficio");
	const oficioFirmado = Boolean(documentoDelCampo(items, decodedCodigo, OFICIO_FIRMADO, "sbn-oficio"));
	const cargoRegistrado = Boolean(documentoDelCampo(items, decodedCodigo, CARGO_SBN));
	const claveHistorial = `transferencia-interestatal-sbn-${decodedCodigo}`;
	const bitacora = {
		modulo: 21,
		entidad: "transferencia_interestatal_sbn"
	};
	const versiones = useHistorial(claveHistorial);
	const versionar = (accion, objeto, despues, motivo) => registrarCambio(claveHistorial, {
		accion,
		objeto,
		motivo,
		antes: versiones[0]?.registro ?? {
			form: initialForm,
			submissions: []
		},
		despues
	}, bitacora);
	const currentStatus = form.resolucionSbn ? "RESOLUCIÓN REGISTRADA" : submissions.length ? form.estado : oficioFirmado ? "OFICIO FIRMADO" : oficio ? "BORRADOR GENERADO" : form.estado;
	const hitos = useHitosPredio(decodedCodigo);
	const plan = useHistorial(`plan-saneamiento-${decodedCodigo}`)[0]?.registro;
	const conInspeccion = useHistorial(`empadronamiento-${decodedCodigo}`).length > 0;
	const conDiagnostico = useHistorial(`diagnostico-preliminar-${decodedCodigo}`).length > 0;
	const conCbc = useHistorial(`cbc-${decodedCodigo}`).length > 0;
	const declaratoria = declaratoriaDelProyecto(useNormasProyecto(projectId));
	const marcados = (() => {
		try {
			return JSON.parse(form.verificacion || "{}");
		} catch {
			return {};
		}
	})();
	/** `auto`: true si otra pantalla ya lo tiene; si es false y `manual`, se puede marcar a mano. */
	const verificacion = [
		{
			clave: "solicitud",
			texto: "Solicitud (oficio firmado, sección 1)",
			auto: oficioFirmado
		},
		{
			clave: "plan",
			texto: "Plan de saneamiento físico legal con informe técnico legal",
			auto: Boolean(plan?.numeroInforme)
		},
		{
			clave: "inspeccion",
			texto: "Informe de inspección técnica",
			auto: conInspeccion
		},
		{
			clave: "diagnostico",
			texto: "Informe de diagnóstico técnico legal",
			auto: conDiagnostico,
			manual: true
		},
		{
			clave: "cbc",
			texto: "Certificado de búsqueda catastral (CBC)",
			auto: conCbc,
			manual: true
		},
		{
			clave: "partida",
			texto: "Partida registral",
			auto: Boolean(form.partidaRegistral.trim())
		},
		{
			clave: "planos",
			texto: "Planos perimétrico y de ubicación",
			auto: Boolean(plan?.planoPerimetrico && plan?.planoUbicacion),
			manual: true
		},
		{
			clave: "memoria",
			texto: "Memoria descriptiva",
			auto: false,
			manual: true
		},
		{
			clave: "declaratoria",
			texto: declaratoria ? `Declaratoria del proyecto: N.° ${declaratoria.numero}` : "Declaratoria o constancia de trámite (art. 41.1)",
			auto: Boolean(declaratoria),
			manual: true
		}
	].map((it) => ({
		...it,
		hecho: it.auto || it.manual === true && !!marcados[it.clave]
	}));
	const faltaVerificar = verificacion.filter((it) => !it.hecho).map((it) => it.texto);
	const plazoSbn = estadoPlazo(hitos, "sbn_resolucion");
	const plazoAnotacion = estadoPlazo(hitos, "sbn_anotacion");
	const pasos = (() => {
		const hechos = [
			oficioFirmado,
			submissions.length > 0,
			Boolean(form.resolucionSbn),
			Boolean(form.fechaInscripcion)
		];
		const actual = hechos.indexOf(false);
		const estado = (i) => hechos[i] ? "completado" : i === actual ? "actual" : "pendiente";
		return [
			{
				nombre: "Oficio de transferencia",
				estado: estado(0),
				detalle: "Título VI · art. 41 · solicitud a la SBN"
			},
			{
				nombre: "Presentación por mesa de partes",
				estado: estado(1),
				detalle: "Art. 41 · cargo de la SBN"
			},
			{
				nombre: "Resolución de la SBN",
				estado: estado(2),
				detalle: "Art. 41 · aprueba la transferencia"
			},
			{
				nombre: "Inscripción registral",
				estado: estado(3),
				detalle: "Art. 41 · SUNARP a favor del MTC",
				to: "/proyectos/$projectId/predios/$codigo/inscripcion-registral",
				params: {
					projectId,
					codigo
				}
			}
		];
	})();
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) {
				const parsed = JSON.parse(stored);
				setForm({
					...initialForm,
					...parsed.form
				});
				setSubmissions(parsed.submissions || []);
				setMesaDraft({
					...initialMesaDraft,
					...parsed.mesaDraft
				});
			}
		} catch {
			setMensaje({
				tipo: "aviso",
				texto: "No se pudo recuperar el registro anterior. Puede continuar con uno nuevo."
			});
		} finally {
			setLoaded(true);
		}
	}, [
		initialForm,
		initialMesaDraft,
		storageKey
	]);
	useEffect(() => {
		if (!loaded) return;
		window.localStorage.setItem(storageKey, JSON.stringify({
			form,
			submissions,
			mesaDraft
		}));
	}, [
		form,
		loaded,
		mesaDraft,
		storageKey,
		submissions
	]);
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function setMesaField(key, value) {
		setMesaDraft((current) => ({
			...current,
			[key]: value
		}));
	}
	function validateOficioData() {
		if (!form.fechaOficio) return "Complete la fecha del oficio.";
		if (!form.entidadTransferente.trim() || !form.entidadBeneficiaria.trim()) return "Registre la entidad transferente y la entidad beneficiaria.";
		if (!form.responsable.trim()) return "Registre el responsable que suscribirá el oficio.";
		return null;
	}
	const armarOficio = (numero) => createOficioWordBlob({
		form: {
			...form,
			numeroOficio: numero ?? "BORRADOR SIN NUMERAR"
		},
		predio,
		predioCode,
		projectLabel
	});
	function handleGenerateOficio(numero, fileName) {
		const nuevoForm = {
			...form,
			numeroOficio: numero ?? form.numeroOficio
		};
		setForm(nuevoForm);
		versionar(numero ? "Generó el documento numerado" : "Generó borrador sin numerar", `Oficio ${numero ?? "BORRADOR SIN NUMERAR"} (${fileName})`, {
			form: nuevoForm,
			submissions
		});
		setMensaje({
			tipo: "exito",
			texto: numero ? `${numero} generado. Fírmelo y súbalo en el campo «Oficio firmado (PDF)» antes de presentarlo a la SBN.` : "Borrador sin numerar generado. Numérelo antes de la firma."
		});
	}
	function handleRegisterMesaPartes() {
		if (!oficioFirmado) {
			setMensaje({
				tipo: "aviso",
				texto: "Suba primero el oficio firmado en el campo «Oficio firmado (PDF)» de la sección 1."
			});
			return;
		}
		if (!mesaDraft.fechaIngreso || !mesaDraft.numeroTramite.trim()) {
			setMensaje({
				tipo: "aviso",
				texto: "Complete la fecha de ingreso y el número de trámite de mesa de partes."
			});
			return;
		}
		if (!cargoRegistrado) {
			setMensaje({
				tipo: "aviso",
				texto: "Suba el cargo en el campo «Cargo de mesa de partes (PDF)»."
			});
			return;
		}
		const entry = {
			id: makeId("mesa-partes-sbn"),
			...mesaDraft,
			fechaRegistro: fechaHora(/* @__PURE__ */ new Date()),
			oficio: form.numeroOficio || void 0
		};
		const formNuevo = {
			...form,
			estado: "PRESENTADO A SBN"
		};
		setSubmissions([entry, ...submissions]);
		setForm(formNuevo);
		versionar("Registró presentación en mesa de partes", `Trámite ${entry.numeroTramite}`, {
			form: formNuevo,
			submissions: [entry, ...submissions]
		});
		setMesaDraft({
			...initialMesaDraft,
			fechaIngreso: fechaIso(/* @__PURE__ */ new Date()),
			horaIngreso: currentTime()
		});
		setMensaje({
			tipo: "exito",
			texto: `Presentación registrada con trámite ${entry.numeroTramite}.`
		});
	}
	function handleDeleteSubmission(entry, motivo) {
		const nextSubmissions = submissions.filter((item) => item.id !== entry.id);
		setSubmissions(nextSubmissions);
		let formNuevo = form;
		if (!nextSubmissions.length && !form.resolucionSbn) {
			formNuevo = {
				...form,
				estado: oficioFirmado ? "OFICIO FIRMADO" : "BORRADOR"
			};
			setForm(formNuevo);
		}
		versionar("Eliminó presentación en mesa de partes", `Trámite ${entry.numeroTramite}`, {
			form: formNuevo,
			submissions: nextSubmissions
		}, motivo);
		setMensaje({
			tipo: "exito",
			texto: "Registro de mesa de partes eliminado."
		});
	}
	function handleSave() {
		if (!form.entidadTransferente.trim() || !form.entidadBeneficiaria.trim()) {
			setMensaje({
				tipo: "aviso",
				texto: "Complete las entidades de la transferencia."
			});
			return;
		}
		if (form.fechaPresentacion && faltaVerificar.length) {
			setMensaje({
				tipo: "aviso",
				texto: `No se puede registrar la presentación ante ${form.destinatarioSolicitud}: falta ${faltaVerificar.join(", ")}.`
			});
			return;
		}
		const pantalla = "transferencia-interestatal-sbn";
		registrarHito(decodedCodigo, "sbn_resolucion", form.fechaPresentacion, pantalla, "Fecha de presentación");
		registrarHito(decodedCodigo, "sbn_anotacion", form.fechaPresentacion, pantalla, "Fecha de presentación");
		window.localStorage.setItem(storageKey, JSON.stringify({
			form,
			submissions,
			mesaDraft
		}));
		versionar(versiones.length ? "Modificó la transferencia" : "Creó la transferencia", `Predio ${predioCode}: ${currentStatus}`, {
			form,
			submissions
		});
		setMensaje({
			tipo: "exito",
			texto: "Transferencia interestatal guardada."
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
				titulo: "Transferencia interestatal · SBN",
				icono: Landmark,
				documentos: {
					armar: { "sbn-oficio": (numero) => armarOficio(numero) },
					validar: validateOficioData,
					destino: { externo: form.cargoDestinatario || "Superintendencia Nacional de Bienes Estatales (SBN)" },
					alGenerar: (_, { numero, archivo }) => handleGenerateOficio(numero, archivo)
				},
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: form.resolucionSbn ? "success" : submissions.length || oficioFirmado ? "primary" : "neutral",
					children: currentStatus
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "transferencia-interestatal-sbn",
				projectId,
				codigo: decodedCodigo
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Transferencia interestatal · Título VI, art. 41 del TUO del DL 1192",
				className: "mb-4",
				children: [/* @__PURE__ */ jsx(Stepper, { pasos }), /* @__PURE__ */ jsxs("div", {
					className: "mt-4 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ jsx(Cifra, {
						etiqueta: "Presentaciones a la SBN",
						valor: `${submissions.length}`
					}), /* @__PURE__ */ jsx(Cifra, {
						etiqueta: "Estado",
						valor: currentStatus
					})]
				})]
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
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "registro",
						children: [
							/* @__PURE__ */ jsx(InformacionPredio, {
								projectId,
								codigo: decodedCodigo,
								className: "mb-4"
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Información registral y entidades intervinientes",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Entidad transferente",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.entidadTransferente,
											onChange: (e) => setField("entidadTransferente", e.target.value),
											required: true
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Entidad beneficiaria",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.entidadBeneficiaria,
											onChange: (e) => setField("entidadBeneficiaria", e.target.value),
											required: true
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Dependencia SBN",
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											value: form.dependenciaSbn,
											onChange: (e) => setField("dependenciaSbn", e.target.value),
											children: [
												/* @__PURE__ */ jsx("option", { children: "SDAPE - Subdirección de Administración del Patrimonio Estatal" }),
												/* @__PURE__ */ jsx("option", { children: "SDDI - Subdirección de Desarrollo Inmobiliario" }),
												/* @__PURE__ */ jsx("option", { children: "Otra dependencia" })
											]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "CUS SBN",
										ayuda: "Código Único SINABIP",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.cusSbn,
											onChange: (e) => setField("cusSbn", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Oficina registral",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.oficinaRegistral,
											onChange: (e) => setField("oficinaRegistral", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Partida registral",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.partidaRegistral,
											onChange: (e) => setField("partidaRegistral", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Área registral (m²)",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											inputMode: "decimal",
											value: form.areaRegistral,
											onChange: (e) => setField("areaRegistral", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Estado del trámite",
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											value: form.estado,
											onChange: (e) => setField("estado", e.target.value),
											children: [
												/* @__PURE__ */ jsx("option", { children: "BORRADOR" }),
												/* @__PURE__ */ jsx("option", { children: "OFICIO FIRMADO" }),
												/* @__PURE__ */ jsx("option", { children: "PRESENTADO A SBN" }),
												/* @__PURE__ */ jsx("option", { children: "EN EVALUACIÓN SBN" }),
												/* @__PURE__ */ jsx("option", { children: "OBSERVADO" }),
												/* @__PURE__ */ jsx("option", { children: "APROBADO" }),
												/* @__PURE__ */ jsx("option", { children: "TRANSFERIDO" })
											]
										})
									})
								] })
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "1. Elaboración del oficio de transferencia",
								className: "mt-4",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Número de oficio",
										ayuda: "Lo asigna el sistema al generar el documento, según la regla de Numeración.",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: `${controlClase} bg-muted font-mono`,
											value: form.numeroOficio || "Se asigna al generar",
											readOnly: true
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Fecha del oficio",
										obligatorio: true,
										icono: CalendarDays,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: form.fechaOficio,
											onChange: (e) => setField("fechaOficio", e.target.value),
											required: true
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Destinatario",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.destinatario,
											onChange: (e) => setField("destinatario", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Entidad o cargo",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.cargoDestinatario,
											onChange: (e) => setField("cargoDestinatario", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Asunto",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.asunto,
											onChange: (e) => setField("asunto", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Referencia",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.referencia,
											onChange: (e) => setField("referencia", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Sustento de la solicitud",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("textarea", {
											id,
											rows: 3,
											className: `${controlClase} h-auto py-2`,
											value: form.sustento,
											onChange: (e) => setField("sustento", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Anexos",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("textarea", {
											id,
											rows: 2,
											className: `${controlClase} h-auto py-2`,
											value: form.anexos,
											onChange: (e) => setField("anexos", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Responsable que firma",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.responsable,
											onChange: (e) => setField("responsable", e.target.value),
											placeholder: "Apellidos y nombres",
											required: true
										})
									})
								] })
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "2. Registro de presentación por mesa de partes SBN",
								className: "mt-4",
								children: [
									/* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Oficio que se presenta",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted`,
												value: oficioFirmado ? form.numeroOficio || "Oficio firmado" : "Suba primero el oficio firmado (sección 1)",
												readOnly: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Canal de presentación",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: mesaDraft.canal,
												onChange: (e) => setMesaField("canal", e.target.value),
												children: [
													/* @__PURE__ */ jsx("option", { children: "MESA DE PARTES VIRTUAL SBN" }),
													/* @__PURE__ */ jsx("option", { children: "MESA DE PARTES PRESENCIAL SBN" }),
													/* @__PURE__ */ jsx("option", { children: "PLATAFORMA DE INTEROPERABILIDAD" }),
													/* @__PURE__ */ jsx("option", { children: "CORREO INSTITUCIONAL" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de ingreso",
											obligatorio: true,
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: mesaDraft.fechaIngreso,
												onChange: (e) => setMesaField("fechaIngreso", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Hora de ingreso",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "time",
												className: controlClase,
												value: mesaDraft.horaIngreso,
												onChange: (e) => setMesaField("horaIngreso", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de trámite",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: mesaDraft.numeroTramite,
												onChange: (e) => setMesaField("numeroTramite", e.target.value),
												placeholder: "Número de registro o trámite"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Expediente SBN",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: mesaDraft.expedienteSbn,
												onChange: (e) => setMesaField("expedienteSbn", e.target.value),
												placeholder: "Número de expediente asignado"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Hoja de ruta",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: mesaDraft.hojaRuta,
												onChange: (e) => setMesaField("hojaRuta", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Dependencia receptora",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: mesaDraft.dependencia,
												onChange: (e) => setMesaField("dependencia", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Recibido por",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: mesaDraft.recibidoPor,
												onChange: (e) => setMesaField("recibidoPor", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Correo o URL de consulta",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: mesaDraft.correoUrl,
												onChange: (e) => setMesaField("correoUrl", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Estado de presentación",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: mesaDraft.estado,
												onChange: (e) => setMesaField("estado", e.target.value),
												children: [
													/* @__PURE__ */ jsx("option", { children: "PRESENTADO" }),
													/* @__PURE__ */ jsx("option", { children: "RECIBIDO" }),
													/* @__PURE__ */ jsx("option", { children: "DERIVADO" }),
													/* @__PURE__ */ jsx("option", { children: "OBSERVADO" }),
													/* @__PURE__ */ jsx("option", { children: "SUBSANADO" })
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
												value: mesaDraft.observaciones,
												onChange: (e) => setMesaField("observaciones", e.target.value)
											})
										})
									] }),
									/* @__PURE__ */ jsx("div", {
										className: "mt-3 flex justify-end",
										children: /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											onClick: handleRegisterMesaPartes,
											children: [/* @__PURE__ */ jsx(Send, {}), " Registrar presentación"]
										})
									}),
									/* @__PURE__ */ jsx(Subtitulo, { children: "Presentaciones registradas" }),
									/* @__PURE__ */ jsx(Tabla, {
										columnas: [
											{
												clave: "fechaIngreso",
												titulo: "Fecha y hora",
												ancho: "120px",
												render: (e) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
													className: "block",
													children: e.fechaIngreso
												}), /* @__PURE__ */ jsx("span", {
													className: "block text-xs text-muted-foreground",
													children: e.horaIngreso
												})] })
											},
											{
												clave: "canal",
												titulo: "Canal"
											},
											{
												clave: "numeroTramite",
												titulo: "N.° de trámite",
												render: (e) => /* @__PURE__ */ jsx("span", {
													className: "font-medium",
													children: e.numeroTramite
												})
											},
											{
												clave: "expedienteSbn",
												titulo: "Expediente SBN",
												render: (e) => e.expedienteSbn || "Pendiente"
											},
											{
												clave: "hojaRuta",
												titulo: "Hoja de ruta",
												render: (e) => e.hojaRuta || "Pendiente"
											},
											{
												clave: "dependencia",
												titulo: "Dependencia"
											},
											{
												clave: "oficio",
												titulo: "Oficio",
												render: (e) => e.oficio || "Sin número"
											},
											{
												clave: "estado",
												titulo: "Estado",
												render: (e) => /* @__PURE__ */ jsx(StatusBadge, {
													tono: "primary",
													children: e.estado
												})
											},
											{
												clave: "acciones",
												titulo: "Acciones",
												alinear: "derecha",
												render: (e) => /* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "icon",
													className: "size-8 text-destructive",
													title: "Eliminar presentación",
													"aria-label": `Eliminar presentación ${e.numeroTramite}`,
													onClick: () => setPorEliminar(e),
													children: /* @__PURE__ */ jsx(Trash2, {})
												})
											}
										],
										filas: submissions,
										claveFila: (e) => e.id,
										vacio: "No existen presentaciones registradas en mesa de partes."
									})
								]
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Solicitud a la autoridad (SBN, DGA o gobierno regional)",
								className: "mt-4",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Destinatario",
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											value: form.destinatarioSolicitud,
											onChange: (e) => setField("destinatarioSolicitud", e.target.value),
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "SBN",
													children: "SBN"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "DGA del MEF",
													children: "DGA del MEF"
												}),
												GORES_CON_FUNCIONES.map((g) => /* @__PURE__ */ jsx("option", {
													value: g,
													children: g
												}, g))
											]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Documentos de la solicitud",
										ancho: "doble",
										ayuda: "Anexo 1 de la Directiva DIR-00001-2026/SBN. Lo que ya está en otra pantalla se marca solo.",
										children: (id) => /* @__PURE__ */ jsx("ul", {
											id,
											className: "space-y-1.5 pt-1 text-sm",
											children: verificacion.map((it) => /* @__PURE__ */ jsxs("li", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ jsx("input", {
													type: "checkbox",
													className: "mt-0.5 size-4 accent-primary",
													checked: it.hecho,
													disabled: it.auto || !it.manual,
													"aria-label": it.texto,
													onChange: (e) => setField("verificacion", JSON.stringify({
														...marcados,
														[it.clave]: e.target.checked
													}))
												}), /* @__PURE__ */ jsxs("span", {
													className: it.hecho ? "text-foreground" : "text-muted-foreground",
													children: [it.texto, !it.manual && /* @__PURE__ */ jsx("span", {
														className: "ml-1 text-xs text-muted-foreground",
														children: "(se lee de su pantalla)"
													})]
												})]
											}, it.clave))
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Fecha de presentación",
										icono: CalendarDays,
										ayuda: "Desde esta fecha corren los 45 d.h. para resolver (art. 41.1) y los 2 d.h. para pedir la anotación preventiva (art. 41.2).",
										children: (id) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: form.fechaPresentacion,
											onChange: (e) => setField("fechaPresentacion", e.target.value)
										}), plazoSbn && /* @__PURE__ */ jsxs("p", {
											className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
											children: [
												/* @__PURE__ */ jsx(PlazoBadge, {
													vence: plazoSbn.vence,
													etiqueta: "Art. 41.1"
												}),
												"Resolución: vence el ",
												fecha(plazoSbn.vence),
												"."
											]
										})] })
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Inscripción de la anotación preventiva",
										icono: CalendarDays,
										ayuda: "La pide la SBN a SUNARP; es gratuita.",
										children: (id) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: form.fechaAnotacion,
											onChange: (e) => setField("fechaAnotacion", e.target.value)
										}), plazoAnotacion && !form.fechaAnotacion && /* @__PURE__ */ jsxs("p", {
											className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
											children: [
												/* @__PURE__ */ jsx(PlazoBadge, {
													vence: plazoAnotacion.vence,
													etiqueta: "Art. 41.2"
												}),
												"Pedido de la SBN: vence el ",
												fecha(plazoAnotacion.vence),
												"."
											]
										})] })
									})
								] })
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "3. Resultado de la transferencia e inscripción",
								className: "mt-4",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Resolución SBN",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.resolucionSbn,
											onChange: (e) => setField("resolucionSbn", e.target.value)
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
											onChange: (e) => setField("fechaResolucion", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Publicación",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.publicacion,
											onChange: (e) => setField("publicacion", e.target.value),
											placeholder: "Diario, portal o referencia"
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Fecha de publicación",
										icono: CalendarDays,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: form.fechaPublicacion,
											onChange: (e) => setField("fechaPublicacion", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Partida final",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: form.partidaFinal,
											onChange: (e) => setField("partidaFinal", e.target.value)
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
											onChange: (e) => setField("fechaInscripcion", e.target.value)
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
											onChange: (e) => setField("observacionesResultado", e.target.value)
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
										etiqueta: "Oficio firmado (PDF)",
										ancho: "doble",
										children: () => /* @__PURE__ */ jsx(CampoDocumento, {
											projectId,
											codigo: decodedCodigo,
											nombre: OFICIO_FIRMADO,
											catalogoId: "sbn-oficio",
											firmado: true,
											accept: ".pdf",
											numero: form.numeroOficio || void 0,
											fecha: form.fechaOficio || void 0
										})
									}), /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Cargo de mesa de partes (PDF)",
										obligatorio: true,
										ancho: "doble",
										children: () => /* @__PURE__ */ jsx(CampoDocumento, {
											projectId,
											codigo: decodedCodigo,
											nombre: CARGO_SBN,
											numero: mesaDraft.numeroTramite || void 0,
											fecha: mesaDraft.fechaIngreso || void 0,
											emisor: "SBN"
										})
									})]
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
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar transferencia"]
							})] })
						]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Transferencia interestatal · SBN",
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
									setSubmissions(r.submissions);
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
			}),
			porEliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: `Trámite ${porEliminar.numeroTramite}`,
				tipo: "presentación",
				onCerrar: () => setPorEliminar(null),
				onConfirmar: (motivo) => {
					handleDeleteSubmission(porEliminar, motivo);
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
function createOficioWordBlob({ form, predio, predioCode, projectLabel }) {
	const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    @page { size: A4; margin: 2.5cm; }
    body { font-family: Arial, sans-serif; color: black; font-size: 11pt; line-height: 1.55; }
    .header { text-align: center; font-weight: bold; font-size: 12pt; margin-bottom: 28px; }
    .date { text-align: right; margin-bottom: 22px; }
    .label { display: inline-block; width: 95px; font-weight: bold; vertical-align: top; }
    .value { display: inline-block; width: 520px; }
    p { margin: 9px 0; text-align: justify; }
    table { width: 100%; border-collapse: collapse; margin: 14px 0; }
    th, td { border: 1px solid gray; padding: 6px; font-size: 9.5pt; text-align: left; }
    th { width: 28%; background: whitesmoke; }
    .signature { width: 58%; margin: 70px auto 0; border-top: 1px solid black; text-align: center; padding-top: 6px; }
    .footer { margin-top: 42px; color: dimgray; font-size: 8pt; text-align: right; }
  </style></head><body>
    <div class="header">${escapeHtml(form.numeroOficio)}</div>
    <p class="date">Lima, ${escapeHtml(form.fechaOficio)}</p>
    <p>Señor(a)<br><b>${escapeHtml(form.destinatario)}</b><br>${escapeHtml(form.cargoDestinatario)}<br>Presente.-</p>
    <p><span class="label">Asunto:</span><span class="value"><b>${escapeHtml(form.asunto)}</b></span></p>
    <p><span class="label">Referencia:</span><span class="value">${escapeHtml(form.referencia)}</span></p>
    <p>De mi consideración:</p>
    <p>${escapeHtml(form.sustento)}</p>
    <p>La solicitud comprende el siguiente predio estatal:</p>
    <table>
      <tr><th>Proyecto</th><td>${escapeHtml(projectLabel)}</td></tr>
      <tr><th>Código de predio</th><td>${escapeHtml(predioCode)}</td></tr>
      <tr><th>Entidad transferente</th><td>${escapeHtml(form.entidadTransferente)}</td></tr>
      <tr><th>Entidad beneficiaria</th><td>${escapeHtml(form.entidadBeneficiaria)}</td></tr>
      <tr><th>Partida registral</th><td>${escapeHtml(form.partidaRegistral || predio?.part || "Por verificar")}</td></tr>
      <tr><th>Área registral</th><td>${escapeHtml(form.areaRegistral || predio?.m2 || "Por verificar")} m²</td></tr>
      <tr><th>CUS SBN</th><td>${escapeHtml(form.cusSbn || "Por asignar")}</td></tr>
      <tr><th>Dependencia SBN</th><td>${escapeHtml(form.dependenciaSbn)}</td></tr>
    </table>
    <p><b>Anexos:</b> ${escapeHtml(form.anexos)}</p>
    <p>Sin otro particular, hago propicia la oportunidad para expresarle los sentimientos de mi especial consideración.</p>
    <p>Atentamente,</p>
    <div class="signature"><b>${escapeHtml(form.responsable)}</b><br>Ministerio de Transportes y Comunicaciones</div>
    <p class="footer">Generado por el Sistema de Gestión Predial · pendiente de firma</p>
  </body></html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function escapeHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//#endregion
export { TransferenciaInterestatalSbnPage as component };
