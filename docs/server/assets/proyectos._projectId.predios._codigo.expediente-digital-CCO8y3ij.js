import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.expediente-digital-GvWgDocz.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as DocumentosEmitidos } from "./DocumentosEmitidos-CPbPRqQu.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CheckCircle2, Copy, Download, Eye, FileStack, History, KeyRound, Link2, LockKeyhole, Printer, RotateCcw, Search, Share2, ThumbsDown, ThumbsUp, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.expediente-digital.tsx?tsr-split=component
var SAMPLE_PDF_URL = "/documents/AERO-OXAPAMPA-PR-089.pdf";
var etiquetasHistorial = {
	reviews: "Revisión",
	decision: "Decisión",
	comment: "Observación",
	supervisor: "Supervisor",
	reviewedAt: "Revisado el"
};
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var DECISION_TONO = {
	"VISTO BUENO": "success",
	OBSERVADO: "destructive",
	PENDIENTE: "neutral"
};
var DOCUMENTS = [
	{
		number: 1,
		stage: "1. INFORMACIÓN BASE",
		document: "Ficha RENIEC, DNI o documento de personería jurídica",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 2,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Certificado de Búsqueda Catastral (CBC)",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 3,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Informe del Especialista Técnico",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 4,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Informe del Verificador Catastral / Especialista",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 5,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Títulos archivados",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 6,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Documentos que acreditan la posesión",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 7,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Publicaciones",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 8,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Notificación de publicaciones",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 9,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Certificado Registral Inmobiliario (CRI)",
		user: "Especialista legal"
	},
	{
		number: 10,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Partida Registral actualizada",
		user: "Especialista legal"
	},
	{
		number: 11,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Visualización / constancia de inexistencia de título pendiente",
		user: "Especialista legal"
	},
	{
		number: 12,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Oficio de comunicación de inicio de trato directo / solicitud de información",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 13,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Oficio a SUNARP solicitando Anotación Preventiva",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 14,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Asiento de inscripción de Anotación Preventiva",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 15,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Informe y documentos de perjuicio económico",
		user: "Perito tasador / Especialista técnico"
	},
	{
		number: 16,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Memoria descriptiva + plano de afectación + plano de distribución",
		user: "Perito tasador / Especialista técnico"
	},
	{
		number: 17,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Formato de certificación del expediente técnico",
		user: "Perito tasador / Especialista técnico"
	},
	{
		number: 18,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Orden de Servicio del Perito Tasador",
		user: "Perito tasador / Especialista técnico"
	},
	{
		number: 19,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Oficio o correo de remisión del expediente de tasación al perito",
		user: "Perito tasador / Especialista técnico"
	},
	{
		number: 20,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Carta del Perito al MTC remitiendo la tasación",
		user: "Perito tasador / Especialista técnico"
	},
	{
		number: 21,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Informe Técnico de Tasación (ITT)",
		user: "Perito tasador / Especialista técnico"
	},
	{
		number: 22,
		stage: "2. ADQUISICIÓN Y TASACIÓN",
		document: "Informe del Perito Supervisor",
		user: "Perito tasador / Especialista técnico"
	},
	{
		number: 23,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Certificación de Crédito Presupuestario (CCP)",
		user: "Administración / Tesorería"
	},
	{
		number: 24,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Cargo de notificación de Carta de Intención de Adquisición",
		user: "Coordinador predial"
	},
	{
		number: 25,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Documento de aceptación de la oferta + Hoja de Ruta",
		user: "Coordinador predial"
	},
	{
		number: 26,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Documento de rechazo de la oferta / consulta a Trámite Documentario",
		user: "Coordinador predial"
	},
	{
		number: 27,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Informe Técnico Legal (ITL) para aprobación del valor y pago",
		user: "Administración / Tesorería"
	},
	{
		number: 28,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Memorando DGPPT a VMT",
		user: "Administración / Tesorería"
	},
	{
		number: 29,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Informe DGOGAJ a VMT",
		user: "Administración / Tesorería"
	},
	{
		number: 30,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Resolución Ministerial + anexo",
		user: "Administración / Tesorería"
	},
	{
		number: 31,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Resolución Viceministerial + anexo",
		user: "Administración / Tesorería"
	},
	{
		number: 32,
		stage: "3. COMUNICACIÓN Y APROBACIÓN",
		document: "Resolución Directoral (RD)",
		user: "Administración / Tesorería"
	},
	{
		number: 33,
		stage: "4. PAGO",
		document: "Memorando DDP a OGA / Solicitud de emisión de devengado",
		user: "Administración / Tesorería"
	},
	{
		number: 34,
		stage: "4. PAGO",
		document: "Memorando solicitando representante para entrega de cheque DDP a OFIN",
		user: "Administración / Tesorería"
	},
	{
		number: 35,
		stage: "4. PAGO",
		document: "Designación de representante para entrega de cheque OFIN a DDP",
		user: "Administración / Tesorería"
	},
	{
		number: 36,
		stage: "4. PAGO",
		document: "Comprobante de pago + cheque / fe de entrega",
		user: "Administración / Tesorería"
	},
	{
		number: 37,
		stage: "4. PAGO",
		document: "Formulario Registral",
		user: "Especialista legal"
	},
	{
		number: 38,
		stage: "4. PAGO",
		document: "Oficio de designación de profesional DDP para recepción del predio",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 39,
		stage: "4. PAGO",
		document: "Memorando solicitando designación de representante DDP a OPAT",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 40,
		stage: "4. PAGO",
		document: "Designación de representante OPAT a DDP",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 41,
		stage: "4. PAGO",
		document: "Acta de entrega de terreno Sujeto Pasivo a DDP",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 42,
		stage: "4. PAGO",
		document: "Acta de entrega de terreno DDP a Concesionaria",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 43,
		stage: "4. PAGO",
		document: "Acta de entrega de terreno DDP a OPAT",
		user: "Gilbert Manuel Aguirre Gómez"
	},
	{
		number: 44,
		stage: "5. SANEAMIENTO E INSCRIPCIÓN",
		document: "Constancia de inscripción de transferencia a favor del MTC",
		user: "Especialista legal"
	}
];
var STAGES = [...new Set(DOCUMENTS.map((item) => item.stage))];
function ExpedienteDigitalPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const params = {
		projectId,
		codigo
	};
	const storageKey = `expediente-digital-revision:${projectId}:${decodedCodigo}`;
	const accessStorageKey = `expediente-digital-acceso:${projectId}:${decodedCodigo}`;
	const [selectedNumber, setSelectedNumber] = useState(1);
	const [search, setSearch] = useState("");
	const [reviews, setReviews] = useState({});
	const [supervisor, setSupervisor] = useState(proyecto?.coordinadorPredial || "Supervisor predial");
	const [reviewComment, setReviewComment] = useState("");
	const [previewUrl, setPreviewUrl] = useState("");
	const [mensaje, setMensaje] = useState(null);
	const [accessCode, setAccessCode] = useState("");
	const [shareDialogOpen, setShareDialogOpen] = useState(false);
	const [enteredAccessCode, setEnteredAccessCode] = useState("");
	const [accessError, setAccessError] = useState("");
	const [sharedAccess, setSharedAccess] = useState({
		mode: false,
		token: "",
		granted: false,
		printAll: false
	});
	const printLinkHandled = useRef(false);
	const rol = useRol();
	const claveHistorial = `expediente-digital-${decodedCodigo}`;
	const bitacora = {
		modulo: 22,
		entidad: "expediente_digital"
	};
	const versiones = useHistorial(claveHistorial);
	const selectedDocument = DOCUMENTS.find((item) => item.number === selectedNumber) ?? DOCUMENTS[0];
	const selectedReview = reviews[String(selectedDocument.number)] ?? emptyReview();
	const approvedCount = Object.values(reviews).filter((review) => review.decision === "VISTO BUENO").length;
	const observedCount = Object.values(reviews).filter((review) => review.decision === "OBSERVADO").length;
	const reviewedCount = approvedCount + observedCount;
	const progress = Math.round(approvedCount / DOCUMENTS.length * 100);
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) {
				const parsed = JSON.parse(stored);
				setReviews(parsed.reviews ?? {});
				if (parsed.supervisor) setSupervisor(parsed.supervisor);
			}
			const nextAccessCode = normalizeAccessCode(window.localStorage.getItem(accessStorageKey)) || generateAccessCode();
			setAccessCode(nextAccessCode);
			window.localStorage.setItem(accessStorageKey, nextAccessCode);
			const searchParams = new URLSearchParams(window.location.search);
			const sharedMode = searchParams.get("compartido") === "1";
			const token = searchParams.get("token") || "";
			const embeddedCode = normalizeAccessCode(searchParams.get("clave"));
			const granted = Boolean(sharedMode && token && embeddedCode && accessToken(embeddedCode, decodedCodigo) === token);
			setSharedAccess({
				mode: sharedMode,
				token,
				granted,
				printAll: searchParams.get("imprimir") === "1"
			});
			const documentFromLink = Number(window.location.hash.replace("#documento-", ""));
			if (DOCUMENTS.some((item) => item.number === documentFromLink)) setSelectedNumber(documentFromLink);
		} catch {
			setMensaje({
				tipo: "error",
				texto: "No se pudo recuperar la revisión anterior."
			});
		}
	}, [
		accessStorageKey,
		decodedCodigo,
		storageKey
	]);
	useEffect(() => {
		setReviewComment(selectedReview.comment);
	}, [selectedDocument.number, selectedReview.comment]);
	useEffect(() => {
		const blob = createDocumentPdfBlob(selectedDocument, decodedCodigo, projectLabel);
		const url = URL.createObjectURL(blob);
		setPreviewUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [
		decodedCodigo,
		projectLabel,
		selectedDocument
	]);
	useEffect(() => {
		if (!sharedAccess.mode || !sharedAccess.granted || !sharedAccess.printAll || printLinkHandled.current) return;
		printLinkHandled.current = true;
		window.open(SAMPLE_PDF_URL, "_blank");
	}, [sharedAccess]);
	const groupedDocuments = useMemo(() => {
		const term = search.trim().toLowerCase();
		return STAGES.map((stage) => ({
			stage,
			documents: DOCUMENTS.filter((item) => item.stage === stage && (!term || item.document.toLowerCase().includes(term) || item.user.toLowerCase().includes(term) || String(item.number).includes(term)))
		})).filter((group) => group.documents.length);
	}, [search]);
	function persist(nextReviews, nextSupervisor = supervisor) {
		window.localStorage.setItem(storageKey, JSON.stringify({
			reviews: nextReviews,
			supervisor: nextSupervisor
		}));
	}
	function selectDocument(number) {
		setSelectedNumber(number);
		window.history.replaceState(null, "", `#documento-${number}`);
		setMensaje(null);
	}
	function saveDecision(decision) {
		const nextReview = {
			decision,
			comment: reviewComment.trim(),
			supervisor: supervisor.trim() || "Supervisor predial",
			reviewedAt: decision === "PENDIENTE" ? "" : fechaHora(/* @__PURE__ */ new Date())
		};
		const nextReviews = {
			...reviews,
			[String(selectedDocument.number)]: nextReview
		};
		setReviews(nextReviews);
		persist(nextReviews);
		registrarCambio(claveHistorial, {
			accion: decision === "VISTO BUENO" ? "Dio visto bueno" : decision === "OBSERVADO" ? "Observó documento" : "Restableció la revisión",
			objeto: `Documento N.° ${selectedDocument.number}: ${selectedDocument.document}`,
			antes: versiones[0]?.registro ?? {
				reviews,
				supervisor
			},
			despues: {
				reviews: nextReviews,
				supervisor: nextReview.supervisor
			}
		}, bitacora);
		setMensaje({
			tipo: "exito",
			texto: decision === "VISTO BUENO" ? `Visto bueno registrado para el documento N.° ${selectedDocument.number}.` : decision === "OBSERVADO" ? `Documento N.° ${selectedDocument.number} marcado como observado.` : `Revisión del documento N.° ${selectedDocument.number} restablecida a pendiente.`
		});
	}
	function ensureAccessCode() {
		const code = normalizeAccessCode(accessCode) || generateAccessCode();
		if (code !== accessCode) {
			setAccessCode(code);
			window.localStorage.setItem(accessStorageKey, code);
		}
		return code;
	}
	/** Cada enlace o clave que sale de aquí deja fila (R8): se comparte varias veces y hay que seguirlo. */
	function registrarEnlace(documento) {
		registrarEnvio({
			proyecto: projectId,
			predio: decodedCodigo,
			paso: "expediente-digital",
			canal: "Enlace compartido",
			destinatario: "Enlace público",
			documento
		}, bitacora);
	}
	async function copyShareLink(documentNumber) {
		await copyText(buildSharedAccessLink({
			code: ensureAccessCode(),
			codigoPredio: decodedCodigo,
			documentNumber,
			includeCode: true
		}));
		registrarEnlace(documentNumber ? `Enlace del documento N.° ${documentNumber}` : "Enlace del expediente");
		setMensaje({
			tipo: "exito",
			texto: documentNumber ? "Enlace protegido del documento copiado." : "Enlace protegido del expediente digital copiado."
		});
	}
	function regenerateAccessCode() {
		const code = generateAccessCode();
		setAccessCode(code);
		window.localStorage.setItem(accessStorageKey, code);
		registrarEnlace("Clave de acceso nueva");
		setMensaje({
			tipo: "aviso",
			texto: "Clave nueva generada. Copie y distribuya los nuevos enlaces de acceso."
		});
	}
	function validateSharedAccess() {
		const code = normalizeAccessCode(enteredAccessCode);
		if (!code || accessToken(code, decodedCodigo) !== sharedAccess.token) {
			setAccessError("La clave de acceso no es válida para este expediente.");
			return;
		}
		setAccessError("");
		setSharedAccess((current) => ({
			...current,
			granted: true
		}));
	}
	function printCompleteExpediente() {
		if (!window.open(SAMPLE_PDF_URL, "_blank")) downloadFromUrl(SAMPLE_PDF_URL, `expediente_completo_${slug(decodedCodigo)}.pdf`);
	}
	function downloadSelectedDocument() {
		downloadFromUrl(SAMPLE_PDF_URL, documentFileName(selectedDocument));
	}
	const shell = (children) => /* @__PURE__ */ jsx(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: decodedCodigo,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: decodedCodigo }),
		children
	});
	if (sharedAccess.mode && !sharedAccess.granted) return shell(/* @__PURE__ */ jsx(SharedAccessGate, {
		projectId,
		codigoPredio: predio?.cod || decodedCodigo,
		decodedCodigo,
		accessCode: enteredAccessCode,
		error: accessError,
		printAll: sharedAccess.printAll,
		onAccessCodeChange: setEnteredAccessCode,
		onSubmit: validateSharedAccess
	}));
	return shell(/* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(PredioEncabezado, {
			projectId,
			codigo: decodedCodigo,
			titulo: "Expediente digital",
			icono: FileStack,
			descripcion: `${DOCUMENTS.length} documentos · ${reviewedCount} revisados · ${observedCount} observados · Datos de demostración`,
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsxs(StatusBadge, {
					tono: progress === 100 ? "success" : "primary",
					children: [
						approvedCount,
						"/",
						DOCUMENTS.length,
						" vistos buenos · ",
						progress,
						" %"
					]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => {
						ensureAccessCode();
						setShareDialogOpen(true);
					},
					children: [/* @__PURE__ */ jsx(Share2, {}), " Generar enlace compartible"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: printCompleteExpediente,
					children: [/* @__PURE__ */ jsx(Printer, {}), " Imprimir expediente completo"]
				})
			] })
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Recepción y custodia del expediente",
			className: "mb-4",
			children: /* @__PURE__ */ jsx(Stepper, { pasos: [
				{
					nombre: "Expediente digital",
					estado: "actual",
					detalle: "6.1 · revisión documental"
				},
				{
					nombre: "Entrega y recepción DDP-OPAT",
					estado: "pendiente",
					detalle: "6.2 · acta de entrega",
					to: "/proyectos/$projectId/predios/$codigo/entrega-recepcion-ddp-opat",
					params
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
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "registro",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]",
						children: [/* @__PURE__ */ jsxs(Section, {
							titulo: "Documentos del expediente",
							acciones: /* @__PURE__ */ jsxs("label", {
								className: "relative block w-64",
								children: [/* @__PURE__ */ jsx(Search, {
									size: 16,
									className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ jsx("input", {
									type: "search",
									className: `${controlClase} pl-9`,
									value: search,
									onChange: (event) => setSearch(event.target.value),
									placeholder: "Buscar documento o usuario",
									"aria-label": "Buscar documento o usuario"
								})]
							}),
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "mb-2 text-xs text-muted-foreground",
									children: "Seleccione un documento para revisarlo en el visor."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "max-h-212.5 overflow-auto",
									children: [groupedDocuments.length === 0 && /* @__PURE__ */ jsx("p", {
										className: "py-6 text-center text-sm text-muted-foreground",
										children: "Ningún documento coincide con la búsqueda."
									}), groupedDocuments.map((group) => {
										const stageDocuments = DOCUMENTS.filter((item) => item.stage === group.stage);
										const stageApproved = stageDocuments.filter((item) => reviews[String(item.number)]?.decision === "VISTO BUENO").length;
										return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Subtitulo, {
											acciones: /* @__PURE__ */ jsxs("span", {
												className: "text-xs text-muted-foreground",
												children: [
													stageApproved,
													"/",
													stageDocuments.length,
													" con visto bueno"
												]
											}),
											children: group.stage
										}), /* @__PURE__ */ jsx(Tabla, {
											columnas: [
												{
													clave: "number",
													titulo: "N.°",
													ancho: "50px",
													render: (d) => /* @__PURE__ */ jsx("span", {
														className: "tabular-nums text-muted-foreground",
														children: d.number
													})
												},
												{
													clave: "decision",
													titulo: "Revisión",
													ancho: "120px",
													render: (d) => {
														const decision = (reviews[String(d.number)] ?? emptyReview()).decision;
														return /* @__PURE__ */ jsx(StatusBadge, {
															tono: DECISION_TONO[decision],
															children: decision
														});
													}
												},
												{
													clave: "document",
													titulo: "Documento generado o registrado",
													render: (d) => /* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => selectDocument(d.number),
														"aria-current": d.number === selectedDocument.number ? "true" : void 0,
														className: `text-left hover:text-primary-dark hover:underline ${d.number === selectedDocument.number ? "font-semibold text-primary-dark" : "font-medium"}`,
														children: d.document
													})
												},
												{
													clave: "user",
													titulo: "Usuario que registra",
													render: (d) => /* @__PURE__ */ jsx("span", {
														className: "text-muted-foreground",
														children: d.user
													})
												},
												{
													clave: "acciones",
													titulo: "Acciones",
													alinear: "derecha",
													ancho: "100px",
													render: (d) => /* @__PURE__ */ jsxs("span", {
														className: "inline-flex gap-1",
														children: [/* @__PURE__ */ jsx("button", {
															type: "button",
															onClick: () => selectDocument(d.number),
															title: "Ver documento",
															"aria-label": `Ver documento ${d.number}`,
															className: "inline-flex size-8 items-center justify-center rounded-md border border-border text-primary-dark hover:bg-primary-soft",
															children: /* @__PURE__ */ jsx(Eye, { size: 16 })
														}), /* @__PURE__ */ jsx("button", {
															type: "button",
															onClick: () => void copyShareLink(d.number),
															title: "Copiar enlace directo",
															"aria-label": `Copiar enlace directo del documento ${d.number}`,
															className: "inline-flex size-8 items-center justify-center rounded-md border border-border text-primary-dark hover:bg-primary-soft",
															children: /* @__PURE__ */ jsx(Link2, { size: 16 })
														})]
													})
												}
											],
											filas: group.documents,
											claveFila: (d) => d.number
										})] }, group.stage);
									})]
								}),
								/* @__PURE__ */ jsx(Subtitulo, { children: "Enlaces compartidos" }),
								/* @__PURE__ */ jsx(HistorialEnvios, {
									proyecto: projectId,
									predio: decodedCodigo,
									paso: "expediente-digital",
									editable: true,
									vacio: "Aún no se compartió ningún enlace ni clave."
								})
							]
						}), /* @__PURE__ */ jsxs(Section, {
							titulo: `Vista del documento N.° ${selectedDocument.number}`,
							acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => void copyShareLink(selectedDocument.number),
								children: [/* @__PURE__ */ jsx(Copy, {}), " Copiar enlace"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: downloadSelectedDocument,
								children: [/* @__PURE__ */ jsx(Download, {}), " Descargar PDF"]
							})] }),
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "mb-3 text-sm font-medium",
									title: selectedDocument.document,
									children: selectedDocument.document
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-md border border-border bg-background p-3",
									children: [/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Supervisor",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: supervisor,
											onChange: (event) => setSupervisor(event.target.value)
										})
									}), /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Observación",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											value: reviewComment,
											onChange: (event) => setReviewComment(event.target.value),
											placeholder: "Comentario opcional para el visto bueno u observación"
										})
									})] }), /* @__PURE__ */ jsxs("div", {
										className: "mt-3 flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ jsx(StatusBadge, {
												tono: DECISION_TONO[selectedReview.decision],
												children: selectedReview.decision
											}), selectedReview.reviewedAt ? `Revisado por ${selectedReview.supervisor} · ${selectedReview.reviewedAt}` : "Pendiente de revisión del supervisor"]
										}), /* @__PURE__ */ jsxs("span", {
											className: "flex gap-2",
											children: [
												/* @__PURE__ */ jsxs(Button, {
													type: "button",
													size: "sm",
													onClick: () => saveDecision("VISTO BUENO"),
													children: [/* @__PURE__ */ jsx(ThumbsUp, {}), " Dar visto bueno"]
												}),
												/* @__PURE__ */ jsxs(Button, {
													type: "button",
													variant: "destructive",
													size: "sm",
													onClick: () => saveDecision("OBSERVADO"),
													children: [/* @__PURE__ */ jsx(ThumbsDown, {}), " Observar documento"]
												}),
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => saveDecision("PENDIENTE"),
													title: "Restablecer revisión",
													"aria-label": "Restablecer revisión",
													children: /* @__PURE__ */ jsx(RotateCcw, {})
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-3 rounded-md border border-border bg-muted p-2",
									children: previewUrl ? /* @__PURE__ */ jsx("iframe", {
										src: previewUrl,
										title: `Vista previa de ${selectedDocument.document}`,
										className: "h-172.5 w-full rounded-sm border border-border bg-card"
									}, previewUrl) : /* @__PURE__ */ jsx("div", {
										className: "flex h-172.5 items-center justify-center rounded-sm border border-border bg-card text-sm text-muted-foreground",
										children: "Preparando la vista previa del documento"
									})
								})
							]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-4",
						children: /* @__PURE__ */ jsx(DocumentosEmitidos, {
							predio: decodedCodigo,
							limite: 20,
							titulo: "Documentos emitidos del predio"
						})
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico · Expediente digital",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: claveHistorial,
							etiquetas: etiquetasHistorial,
							nombreArchivo: `historico-${claveHistorial}`,
							puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
							onRestaurar: (r, n) => {
								setReviews(r.reviews);
								setSupervisor(r.supervisor);
								persist(r.reviews, r.supervisor);
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
		accessCode && /* @__PURE__ */ jsx(ShareAccessDialog, {
			abierto: shareDialogOpen,
			accessCode,
			accessLink: buildSharedAccessLink({
				code: accessCode,
				codigoPredio: decodedCodigo
			}),
			embeddedLink: buildSharedAccessLink({
				code: accessCode,
				codigoPredio: decodedCodigo,
				includeCode: true
			}),
			printLink: buildSharedAccessLink({
				code: accessCode,
				codigoPredio: decodedCodigo,
				includeCode: true,
				printAll: true
			}),
			onClose: () => setShareDialogOpen(false),
			onRegenerate: regenerateAccessCode,
			onCopy: async (value, label) => {
				await copyText(value);
				registrarEnlace(label);
				setMensaje({
					tipo: "exito",
					texto: `${label} copiado.`
				});
			}
		})
	] }));
}
function SharedAccessGate({ projectId, codigoPredio, decodedCodigo, accessCode, error, printAll, onAccessCodeChange, onSubmit }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(PredioEncabezado, {
		projectId,
		codigo: decodedCodigo,
		titulo: "Acceso al expediente digital",
		icono: LockKeyhole,
		descripcion: "Enlace protegido con clave de seis dígitos"
	}), /* @__PURE__ */ jsx(Section, {
		className: "mx-auto max-w-md",
		children: /* @__PURE__ */ jsxs("form", {
			onSubmit: (event) => {
				event.preventDefault();
				onSubmit();
			},
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "mx-auto flex size-11 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
					children: /* @__PURE__ */ jsx(LockKeyhole, {
						size: 22,
						"aria-hidden": true
					})
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-3 text-center text-xl font-semibold text-primary-dark",
					children: "Expediente digital protegido"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mx-auto mt-1 max-w-sm text-center text-xs text-muted-foreground",
					children: [
						"Ingrese la clave de seis dígitos proporcionada junto con el enlace para acceder al expediente del predio ",
						codigoPredio,
						"."
					]
				}),
				printAll && /* @__PURE__ */ jsx("p", {
					role: "status",
					className: "mt-3 rounded-md border border-warning bg-warning-soft px-3 py-2 text-center text-xs text-warning",
					children: "Después de validar la clave se abrirá el expediente consolidado para impresión."
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "mt-5 block text-center text-xs font-semibold uppercase text-muted-foreground",
					children: ["Clave de acceso", /* @__PURE__ */ jsx("input", {
						autoFocus: true,
						inputMode: "numeric",
						maxLength: 7,
						className: `${controlClase} mx-auto mt-1.5 h-11 w-48 text-center font-mono text-xl font-bold`,
						value: accessCode,
						onChange: (event) => onAccessCodeChange(formatAccessCode(event.target.value)),
						placeholder: "000 000"
					})]
				}),
				error && /* @__PURE__ */ jsx("p", {
					role: "alert",
					className: "mt-3 rounded-md border border-destructive bg-destructive-soft px-3 py-2 text-center text-xs text-destructive",
					children: error
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "submit",
					className: "mt-4 w-full",
					children: [/* @__PURE__ */ jsx(KeyRound, {}), " Abrir expediente"]
				})
			]
		})
	})] });
}
function ShareAccessDialog({ abierto, accessCode, accessLink, embeddedLink, printLink, onClose, onRegenerate, onCopy }) {
	return /* @__PURE__ */ jsx(Modal, {
		abierto,
		onCerrar: onClose,
		titulo: "Generar enlace del expediente",
		descripcion: "Acceso protegido mediante enlace y clave, similar a una reunión virtual.",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2.5",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase text-muted-foreground",
						children: "Clave de acceso"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-0.5 font-mono text-2xl font-bold",
						children: formatAccessCode(accessCode)
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => void onCopy(accessCode, "Clave de acceso"),
							children: [/* @__PURE__ */ jsx(Copy, {}), " Copiar clave"]
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onRegenerate,
							children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Generar nueva clave"]
						})]
					})]
				}),
				/* @__PURE__ */ jsx(ShareLinkRow, {
					title: "Enlace de acceso",
					description: "El usuario deberá ingresar la clave de seis dígitos.",
					value: accessLink,
					onCopy: () => void onCopy(accessLink, "Enlace de acceso")
				}),
				/* @__PURE__ */ jsx(ShareLinkRow, {
					title: "Enlace con clave incorporada",
					description: "Abre directamente el expediente sin solicitar nuevamente la clave.",
					value: embeddedLink,
					onCopy: () => void onCopy(embeddedLink, "Enlace con clave incorporada")
				}),
				/* @__PURE__ */ jsx(ShareLinkRow, {
					title: "Enlace para imprimir todo",
					description: "Valida el acceso y abre el expediente consolidado en PDF.",
					value: printLink,
					onCopy: () => void onCopy(printLink, "Enlace para imprimir todo"),
					destacado: true
				}),
				/* @__PURE__ */ jsx("p", {
					className: "rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
					children: "Al generar una nueva clave se crean enlaces diferentes. Comparta la clave por un medio separado cuando utilice el enlace de acceso sin clave incorporada."
				})
			]
		})
	});
}
function ShareLinkRow({ title, description, value, onCopy, destacado = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border px-3 py-2.5",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: `text-sm font-semibold ${destacado ? "text-primary-dark" : ""}`,
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: description
			})] }), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: destacado ? "default" : "outline",
				size: "sm",
				onClick: onCopy,
				className: "shrink-0",
				children: [/* @__PURE__ */ jsx(Copy, {}), " Copiar enlace"]
			})]
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-2 truncate rounded-sm bg-background px-2 py-1.5 font-mono text-xs text-muted-foreground",
			title: value,
			children: value
		})]
	});
}
function emptyReview() {
	return {
		decision: "PENDIENTE",
		comment: "",
		supervisor: "",
		reviewedAt: ""
	};
}
function generateAccessCode() {
	const values = /* @__PURE__ */ new Uint32Array(1);
	window.crypto.getRandomValues(values);
	return String(1e5 + values[0] % 9e5);
}
function normalizeAccessCode(value) {
	return String(value ?? "").replace(/\D/g, "").slice(0, 6);
}
function formatAccessCode(value) {
	const normalized = normalizeAccessCode(value);
	return normalized.length > 3 ? `${normalized.slice(0, 3)} ${normalized.slice(3)}` : normalized;
}
function accessToken(code, codigoPredio) {
	const value = `${normalizeAccessCode(code)}|${codigoPredio}|MTC-EXPEDIENTE-DIGITAL`;
	let hash = 2166136261;
	for (let index = 0; index < value.length; index += 1) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(36).toUpperCase();
}
function buildSharedAccessLink({ code, codigoPredio, includeCode = false, printAll = false, documentNumber }) {
	const normalizedCode = normalizeAccessCode(code);
	const url = new URL(window.location.href);
	url.search = "";
	url.searchParams.set("compartido", "1");
	url.searchParams.set("token", accessToken(normalizedCode, codigoPredio));
	if (includeCode) url.searchParams.set("clave", normalizedCode);
	if (printAll) url.searchParams.set("imprimir", "1");
	url.hash = documentNumber ? `documento-${documentNumber}` : "";
	return url.toString();
}
function documentFileName(document) {
	return `${String(document.number).padStart(2, "0")}_${slug(document.document)}.pdf`;
}
function createDocumentPdfBlob(document, codigoPredio, projectLabel) {
	return createSimplePdfBlob(document.document, [
		"EXPEDIENTE DIGITAL DEL PREDIO",
		"",
		`Proyecto: ${projectLabel}`,
		`Codigo de predio: ${codigoPredio}`,
		`Etapa: ${document.stage}`,
		`Documento Nro.: ${document.number}`,
		`Documento generado / registrado: ${document.document}`,
		`Usuario que registra: ${document.user}`,
		`Archivo: ${documentFileName(document)}`,
		`Fecha de registro: ${formatDateForDocument(document.number)}`,
		"",
		"CONSTANCIA DEL DOCUMENTO REGISTRADO",
		"",
		"El presente archivo representa el documento incorporado al expediente digital del predio y se encuentra disponible para revision, visto bueno u observacion del supervisor.",
		"",
		"Contenido referencial para el prototipo de gestion predial."
	]);
}
function formatDateForDocument(number) {
	return new Date(Date.UTC(2026, 5, 1 + number)).toLocaleDateString("es-PE", { timeZone: "UTC" });
}
async function copyText(value) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(value);
		return;
	}
	const textarea = document.createElement("textarea");
	textarea.value = value;
	textarea.style.position = "fixed";
	textarea.style.left = "-9999px";
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
}
async function downloadFromUrl(url, fileName) {
	try {
		descargarBlob(fileName, await (await fetch(url)).blob());
	} catch {
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = fileName;
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
	}
}
function slug(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 70);
}
function createSimplePdfBlob(title, rawLines) {
	const lines = rawLines.flatMap((line) => wrapPdfLine(toPdfAscii(line), 92));
	const pages = chunk(lines.length ? lines : [toPdfAscii(title)], 46);
	const fontObjectNumber = 3 + pages.length * 2;
	const objects = /* @__PURE__ */ new Map();
	const pageObjectNumbers = [];
	pages.forEach((pageLines, pageIndex) => {
		const pageObjectNumber = 3 + pageIndex * 2;
		const contentObjectNumber = pageObjectNumber + 1;
		pageObjectNumbers.push(pageObjectNumber);
		const content = [
			"BT",
			"/F1 10 Tf",
			"48 790 Td",
			"15 TL",
			...pageLines.map((line) => `(${escapePdfText(line)}) Tj T*`),
			"ET"
		].join("\n");
		objects.set(pageObjectNumber, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 ${fontObjectNumber} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`);
		objects.set(contentObjectNumber, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
	});
	objects.set(1, "<< /Type /Catalog /Pages 2 0 R >>");
	objects.set(2, `<< /Type /Pages /Kids [${pageObjectNumbers.map((number) => `${number} 0 R`).join(" ")}] /Count ${pages.length} >>`);
	objects.set(fontObjectNumber, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
	let pdf = "%PDF-1.4\n";
	const offsets = [];
	for (let number = 1; number <= fontObjectNumber; number += 1) {
		const body = objects.get(number);
		if (!body) continue;
		offsets[number] = pdf.length;
		pdf += `${number} 0 obj\n${body}\nendobj\n`;
	}
	const xrefOffset = pdf.length;
	pdf += `xref\n0 ${fontObjectNumber + 1}\n0000000000 65535 f \n`;
	for (let number = 1; number <= fontObjectNumber; number += 1) pdf += `${String(offsets[number] || 0).padStart(10, "0")} 00000 n \n`;
	pdf += `trailer\n<< /Size ${fontObjectNumber + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
	return new Blob([pdf], { type: "application/pdf" });
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
	const groups = [];
	for (let index = 0; index < items.length; index += size) groups.push(items.slice(index, index + size));
	return groups;
}
function escapePdfText(value) {
	return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
function toPdfAscii(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\x20-\x7e]/g, " ");
}
//#endregion
export { ExpedienteDigitalPage as component };
