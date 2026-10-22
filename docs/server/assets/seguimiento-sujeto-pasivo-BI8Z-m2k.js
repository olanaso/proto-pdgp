import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha, r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { E as Modal, n as etiquetaProyecto } from "./PredioEncabezado-FhqZ2Jv6.js";
import { A as vigentesParaSujeto, O as useAnuncios, _ as lectorSujeto, b as marcarLeido, n as alcanceTexto, y as leido } from "./anuncios-CchLukSd.js";
import { a as PieLectura, i as ModalAnuncio, o as VistaAnuncio } from "./Anuncio-BIz5COtU.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as login_bg_default } from "./login-bg-CFFUB6xk.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, ArrowLeft, Building2, CalendarClock, Check, CheckCircle2, ChevronRight, Clock3, Download, Eye, FileCheck2, FileText, Fingerprint, FolderOpen, HelpCircle, Hourglass, KeyRound, LandPlot, LockKeyhole, LogOut, MapPin, RefreshCw, Send, ShieldCheck, UserRound } from "lucide-react";
//#region src/routes/seguimiento-sujeto-pasivo.tsx?tsr-split=component
/** Equipo de Jauja: el mismo para ambos predios del sujeto. */
var teamJauja = [
	{
		id: "t1",
		name: "Ing. Juan Carlos Pérez García",
		role: "Profesional técnico",
		title: "Especialista Técnico Predial · Coordinación Predial Aeropuertos 02",
		phone: "+51 987 654 321",
		email: "juan.perez@mtc.gob.pe",
		hours: "Lun. a vie. 8:30 a 17:00",
		attends: "Visitas a campo, medición del área afectada, planos y tasación.",
		tone: "bg-primary-soft text-primary-dark"
	},
	{
		id: "t2",
		name: "Abog. María Elena López Ruiz",
		role: "Profesional legal",
		title: "Especialista Legal · Coordinación Predial Aeropuertos 02",
		phone: "+51 976 543 210",
		email: "maria.lopez@mtc.gob.pe",
		hours: "Lun. a vie. 8:30 a 17:00",
		attends: "Carta de intención, documentos de propiedad, firma de acuerdos y escritura.",
		tone: "bg-success-soft text-success"
	},
	{
		id: "t4",
		name: "Lic. Rosa Quispe Mamani",
		role: "Gestor social",
		title: "Asistente Social · Equipo de campo Jauja",
		phone: "+51 954 321 098",
		email: "rosa.quispe@mtc.gob.pe",
		hours: "Lun. a sáb. 8:00 a 18:00",
		attends: "Acompañamiento a la familia, reubicación y consultas en su localidad.",
		tone: "bg-muted text-foreground"
	}
];
/** A dónde va el sujeto pasivo a hacer sus trámites con el MTC. Direcciones de demostración. */
var HERRAMIENTAS_SUJETO = [
	{
		nombre: "Mesa de Partes virtual del MTC",
		detalle: "Presente escritos, documentos de propiedad y respuestas a las cartas; obtiene su hoja de ruta.",
		url: "https://www.gob.pe/mtc-mesa-de-partes",
		icono: Send
	},
	{
		nombre: "Seguimiento de mi hoja de ruta",
		detalle: "Vea en qué oficina está su trámite y qué respuesta tuvo.",
		url: "https://std.mtc.gob.pe/consulta",
		icono: FolderOpen
	},
	{
		nombre: "Citas con el equipo predial",
		detalle: "Reserve una atención presencial o por videollamada con su técnico o abogado.",
		url: "https://www.gob.pe/mtc-citas-prediales",
		icono: CalendarClock
	},
	{
		nombre: "Reclamos y quejas",
		detalle: "Libro de reclamaciones del MTC si no lo atienden en los plazos.",
		url: "https://www.gob.pe/mtc-libro-de-reclamaciones",
		icono: AlertCircle
	}
];
/** Qué significa cada modalidad para el propietario (TUO del DL 1192). */
var MODALIDAD_EXPLICACION = {
	"Trato directo": "El MTC le ofrece comprar el predio por acuerdo: recibe una carta de intención con el valor de tasación más el 20 % de incentivo (art. 20). Si acepta, se firma el acuerdo y se le paga; no hay juicio.",
	Expropiación: "No hubo acuerdo o el predio no pudo adquirirse por trato directo: el MTC lo adquiere por ley, pagando el valor de tasación (sin el incentivo del 20 %) y, si corresponde, el daño emergente y lucro cesante (art. 28)."
};
var subjectData = {
	dni: "45678912",
	name: "María Quispe Huamán",
	email: "maria.quispe@email.com",
	maskedEmail: "m***.q*****@email.com",
	phone: "*** *** 482",
	properties: [{
		id: "property-0567",
		code: "AERO-JAUJA-PR-0567T",
		project: "Aeropuerto de Jauja",
		expediente: "EXP-3546-2023-MTC/DDP",
		location: "Distrito de Acolla, provincia de Jauja, Junín",
		affectedArea: "1,250.40 m²",
		modality: "Trato directo",
		detail: {
			affectation: "Parcial",
			totalArea: "3,420.00 m²",
			use: "Vivienda y cultivo (maíz)",
			ownership: "Propietaria con título inscrito · copropiedad con Jorge Quispe Huamán",
			registry: "Partida N.° 11045872 · Zona Registral VIII Huancayo",
			valuation: "S/ 186,420.00 (tasación DNC del 12/07/2026) + 20 % de incentivo",
			modalityWhy: "El predio tiene título inscrito y usted aceptó negociar."
		},
		progress: 58,
		currentStage: "Respuesta del sujeto pasivo",
		stageNumber: 7,
		totalStages: 12,
		timing: "Atrasado",
		timingDays: 4,
		daysInStage: 18,
		plannedDays: 14,
		updatedAt: "31/08/2026, 16:45",
		expectedDate: "05/09/2026",
		nextAction: "Registrar la respuesta a la carta de intención y completar la validación legal.",
		responsible: "Coordinación Predial Aeropuertos 02",
		team: teamJauja,
		documents: [
			{
				id: "doc-ficha-0567",
				title: "Ficha de identificación y codificación del predio",
				type: "Ficha predial",
				number: "FP-AERO-JAUJA-0567",
				date: "12/05/2026",
				size: "486 KB",
				stage: "Identificación"
			},
			{
				id: "doc-cri-0567",
				title: "Certificado registral inmobiliario",
				type: "Certificado registral",
				number: "CRI-2026-004812",
				date: "20/05/2026",
				size: "1.8 MB",
				stage: "Diagnóstico técnico-legal"
			},
			{
				id: "doc-plano-0567",
				title: "Plano de afectación predial",
				type: "Plano técnico",
				number: "PTKT-00567-01",
				date: "02/06/2026",
				size: "2.4 MB",
				stage: "Expediente técnico-legal"
			},
			{
				id: "doc-memoria-0567",
				title: "Memoria descriptiva del área afectada",
				type: "Memoria descriptiva",
				number: "MD-AJ-0567-2026",
				date: "02/06/2026",
				size: "782 KB",
				stage: "Expediente técnico-legal"
			},
			{
				id: "doc-itl-0567",
				title: "Informe técnico legal del predio",
				type: "Informe técnico legal",
				number: "ITL-178-2026-MTC/20.11",
				date: "10/06/2026",
				size: "1.2 MB",
				stage: "Expediente técnico-legal"
			},
			{
				id: "doc-itt-0567",
				title: "Informe técnico de tasación",
				type: "Tasación",
				number: "3541-2026-MTC/DDP",
				date: "08/07/2026",
				size: "3.1 MB",
				stage: "Tasación"
			},
			{
				id: "doc-carta-0567",
				title: "Carta de intención de adquisición",
				type: "Comunicación",
				number: "CARTA-421-2026-MTC/20",
				date: "16/07/2026",
				size: "594 KB",
				stage: "Trato directo"
			}
		],
		timeline: [
			{
				id: "tl-0567-1",
				title: "Identificación e individualización",
				description: "El predio y el área requerida fueron identificados y codificados.",
				status: "completed",
				date: "12/05/2026",
				duration: "5 días",
				documentIds: ["doc-ficha-0567"]
			},
			{
				id: "tl-0567-2",
				title: "Diagnóstico técnico-legal",
				description: "Se verificaron titularidad, antecedentes registrales y condición física.",
				status: "completed",
				date: "20/05/2026",
				duration: "8 días",
				documentIds: ["doc-cri-0567"]
			},
			{
				id: "tl-0567-3",
				title: "Expediente técnico-legal completo",
				description: "Se integraron plano, memoria descriptiva e informe técnico legal.",
				status: "completed",
				date: "10/06/2026",
				duration: "21 días",
				documentIds: [
					"doc-plano-0567",
					"doc-memoria-0567",
					"doc-itl-0567"
				]
			},
			{
				id: "tl-0567-4",
				title: "Tasación",
				description: "El órgano tasador determinó y aprobó el valor del inmueble afectado.",
				status: "completed",
				date: "08/07/2026",
				duration: "28 días",
				documentIds: ["doc-itt-0567"]
			},
			{
				id: "tl-0567-5",
				title: "Notificación de la intención de adquisición",
				description: "La carta de intención y la oferta económica fueron notificadas.",
				status: "completed",
				date: "16/07/2026",
				duration: "8 días",
				documentIds: ["doc-carta-0567"]
			},
			{
				id: "tl-0567-6",
				title: "Respuesta del sujeto pasivo",
				description: "Se encuentra pendiente registrar la aceptación u observación a la oferta.",
				status: "current",
				date: "En curso",
				duration: "18 de 14 días",
				documentIds: []
			},
			{
				id: "tl-0567-7",
				title: "Resolución de adquisición",
				description: "Se iniciará después de completar la respuesta y la validación legal.",
				status: "pending",
				documentIds: []
			},
			{
				id: "tl-0567-8",
				title: "Pago y entrega de posesión",
				description: "Comprende programación, abono y suscripción del acta de entrega.",
				status: "pending",
				documentIds: []
			},
			{
				id: "tl-0567-9",
				title: "Inscripción y cierre",
				description: "Presentación ante SUNARP y cierre del expediente predial.",
				status: "pending",
				documentIds: []
			}
		]
	}, {
		id: "property-0612",
		code: "AERO-JAUJA-PR-0612T",
		project: "Aeropuerto de Jauja",
		expediente: "EXP-4021-2024-MTC/DDP",
		location: "Distrito de Yauyos, provincia de Jauja, Junín",
		affectedArea: "842.75 m²",
		modality: "Expropiación",
		detail: {
			affectation: "Total",
			totalArea: "842.75 m²",
			use: "Terreno sin construcción",
			ownership: "Poseedora · sin título inscrito a su nombre",
			registry: "Sin partida registral · en saneamiento por la DDP",
			valuation: "S/ 54,780.00 (tasación DNC del 20/05/2026)",
			modalityWhy: "No se llegó a acuerdo en el plazo de trato directo (art. 21)."
		},
		progress: 76,
		currentStage: "Resolución de adquisición",
		stageNumber: 9,
		totalStages: 12,
		timing: "Adelantado",
		timingDays: 6,
		daysInStage: 4,
		plannedDays: 10,
		updatedAt: "02/09/2026, 10:20",
		expectedDate: "12/09/2026",
		nextAction: "Emitir y notificar la resolución que aprueba la adquisición del predio.",
		responsible: "Coordinación Predial Aeropuertos 02",
		team: teamJauja,
		documents: [
			{
				id: "doc-ficha-0612",
				title: "Ficha de identificación y codificación del predio",
				type: "Ficha predial",
				number: "FP-AERO-JAUJA-0612",
				date: "18/03/2026",
				size: "472 KB",
				stage: "Identificación"
			},
			{
				id: "doc-cri-0612",
				title: "Certificado registral inmobiliario",
				type: "Certificado registral",
				number: "CRI-2026-003104",
				date: "25/03/2026",
				size: "1.5 MB",
				stage: "Diagnóstico técnico-legal"
			},
			{
				id: "doc-itl-0612",
				title: "Informe técnico legal del predio",
				type: "Informe técnico legal",
				number: "ITL-102-2026-MTC/20.11",
				date: "15/04/2026",
				size: "1.1 MB",
				stage: "Expediente técnico-legal"
			},
			{
				id: "doc-itt-0612",
				title: "Informe técnico de tasación",
				type: "Tasación",
				number: "2987-2026-MTC/DDP",
				date: "20/05/2026",
				size: "2.7 MB",
				stage: "Tasación"
			},
			{
				id: "doc-aceptacion-0612",
				title: "Acta de aceptación de la oferta",
				type: "Acta",
				number: "ACTA-078-2026-MTC/20",
				date: "24/07/2026",
				size: "648 KB",
				stage: "Aceptación"
			}
		],
		timeline: [
			{
				id: "tl-0612-1",
				title: "Identificación e individualización",
				description: "Predio y afectación identificados.",
				status: "completed",
				date: "18/03/2026",
				duration: "4 días",
				documentIds: ["doc-ficha-0612"]
			},
			{
				id: "tl-0612-2",
				title: "Diagnóstico técnico-legal",
				description: "Antecedentes técnicos y registrales validados.",
				status: "completed",
				date: "25/03/2026",
				duration: "7 días",
				documentIds: ["doc-cri-0612"]
			},
			{
				id: "tl-0612-3",
				title: "Expediente técnico-legal completo",
				description: "Expediente conformado y remitido para tasación.",
				status: "completed",
				date: "15/04/2026",
				duration: "21 días",
				documentIds: ["doc-itl-0612"]
			},
			{
				id: "tl-0612-4",
				title: "Tasación",
				description: "Valor de tasación aprobado.",
				status: "completed",
				date: "20/05/2026",
				duration: "35 días",
				documentIds: ["doc-itt-0612"]
			},
			{
				id: "tl-0612-5",
				title: "Trato directo y aceptación",
				description: "Oferta notificada y aceptada por el sujeto pasivo.",
				status: "completed",
				date: "24/07/2026",
				duration: "19 días",
				documentIds: ["doc-aceptacion-0612"]
			},
			{
				id: "tl-0612-6",
				title: "Resolución de adquisición",
				description: "La resolución se encuentra en elaboración y revisión de firmas.",
				status: "current",
				date: "En curso",
				duration: "4 de 10 días",
				documentIds: []
			},
			{
				id: "tl-0612-7",
				title: "Pago y entrega de posesión",
				description: "Pendiente de la resolución de adquisición.",
				status: "pending",
				documentIds: []
			},
			{
				id: "tl-0612-8",
				title: "Inscripción y cierre",
				description: "Pendiente de las actuaciones anteriores.",
				status: "pending",
				documentIds: []
			}
		]
	}]
};
var TIMING_TONE = {
	Atrasado: "destructive",
	Adelantado: "success",
	"En plazo": "primary",
	Finalizado: "neutral"
};
function SubjectTrackingPage() {
	const [step, setStep] = useState("dni");
	const [dni, setDni] = useState("");
	const [otp, setOtp] = useState(Array(6).fill(""));
	const [generatedCode, setGeneratedCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState(null);
	const [attempts, setAttempts] = useState(3);
	const [resendSeconds, setResendSeconds] = useState(0);
	const [selectedPropertyId, setSelectedPropertyId] = useState(subjectData.properties[0].id);
	const [selectedDocument, setSelectedDocument] = useState(null);
	const [activeTab, setActiveTab] = useState("timeline");
	const otpRefs = useRef([]);
	const selectedProperty = subjectData.properties.find((property) => property.id === selectedPropertyId) ?? subjectData.properties[0];
	useEffect(() => {
		if (step === "otp") otpRefs.current[0]?.focus();
	}, [step]);
	useEffect(() => {
		if (resendSeconds <= 0) return;
		const timer = window.setInterval(() => {
			setResendSeconds((current) => Math.max(0, current - 1));
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [resendSeconds]);
	function sendDynamicCode(event) {
		event?.preventDefault();
		if (!/^\d{8}$/.test(dni)) {
			setFeedback({
				kind: "error",
				text: "Ingrese un número de DNI válido de 8 dígitos."
			});
			return;
		}
		setLoading(true);
		setFeedback(null);
		window.setTimeout(() => {
			const code = String(Math.floor(1e5 + Math.random() * 9e5));
			setGeneratedCode(code);
			setOtp(Array(6).fill(""));
			setAttempts(3);
			setResendSeconds(45);
			setLoading(false);
			setStep("otp");
			setFeedback({
				kind: "success",
				text: `Enviamos una clave dinámica al correo ${subjectData.maskedEmail}.`
			});
		}, 650);
	}
	function updateOtp(index, value) {
		const digit = value.replace(/\D/g, "").slice(-1);
		const next = [...otp];
		next[index] = digit;
		setOtp(next);
		setFeedback(null);
		if (digit && index < otp.length - 1) otpRefs.current[index + 1]?.focus();
	}
	function handleOtpKey(index, event) {
		if (event.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
	}
	function pasteOtp(event) {
		const value = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
		if (!value) return;
		event.preventDefault();
		const next = Array(6).fill("").map((_, index) => value[index] ?? "");
		setOtp(next);
		otpRefs.current[Math.min(value.length, 6) - 1]?.focus();
	}
	function verifyCode(event) {
		event.preventDefault();
		if (otp.join("") !== generatedCode) {
			const remaining = attempts - 1;
			setAttempts(remaining);
			setFeedback({
				kind: "error",
				text: remaining > 0 ? `La clave ingresada no es correcta. Le quedan ${remaining} intentos.` : "La clave fue bloqueada. Solicite una nueva para continuar."
			});
			if (remaining <= 0) setOtp(Array(6).fill(""));
			return;
		}
		setLoading(true);
		window.setTimeout(() => {
			setLoading(false);
			setFeedback(null);
			setStep("portal");
		}, 500);
	}
	function resendCode() {
		if (resendSeconds > 0) return;
		sendDynamicCode();
	}
	function logout() {
		setStep("dni");
		setDni("");
		setOtp(Array(6).fill(""));
		setGeneratedCode("");
		setFeedback(null);
		setSelectedDocument(null);
	}
	async function downloadDocument(document) {
		const { jsPDF } = await import("jspdf");
		const pdf = new jsPDF({
			unit: "mm",
			format: "a4"
		});
		pdf.setTextColor(200, 16, 46);
		pdf.setFont("helvetica", "bold");
		pdf.setFontSize(15);
		pdf.text("MINISTERIO DE TRANSPORTES Y COMUNICACIONES", 20, 24);
		pdf.setDrawColor(200, 16, 46);
		pdf.line(20, 29, 190, 29);
		pdf.setTextColor(31, 41, 55);
		pdf.setFontSize(13);
		pdf.text(document.title, 20, 43, { maxWidth: 170 });
		pdf.setFont("helvetica", "normal");
		pdf.setFontSize(10);
		[
			`Documento: ${document.number}`,
			`Tipo: ${document.type}`,
			`Fecha de generación: ${document.date}`,
			`Sujeto pasivo: ${subjectData.name}`,
			`DNI: ${dni || subjectData.dni}`,
			`Predio: ${selectedProperty.code}`,
			`Expediente: ${selectedProperty.expediente}`,
			`Proyecto: ${selectedProperty.project}`,
			`Etapa: ${document.stage}`
		].forEach((line, index) => pdf.text(line, 20, 64 + index * 8));
		pdf.setFontSize(9);
		pdf.setTextColor(75, 85, 99);
		pdf.text("Documento demostrativo generado desde la consulta individual de seguimiento predial.", 20, 148);
		pdf.save(`${document.number.replace(/[^A-Za-z0-9_-]/g, "-")}.pdf`);
	}
	/** Ficha del predio en PDF: detalle, equipo y el estado de cada hito, para que el sujeto pasivo la guarde o la lleve. */
	async function descargarFicha() {
		const { jsPDF } = await import("jspdf");
		const pdf = new jsPDF({
			unit: "mm",
			format: "a4"
		});
		const p = selectedProperty;
		let y = 24;
		const titulo = (t) => {
			if (y > 265) {
				pdf.addPage();
				y = 24;
			}
			y += 4;
			pdf.setFont("helvetica", "bold");
			pdf.setFontSize(11);
			pdf.setTextColor(200, 16, 46);
			pdf.text(t.toUpperCase(), 20, y);
			pdf.setDrawColor(200, 16, 46);
			pdf.line(20, y + 1.5, 190, y + 1.5);
			y += 8;
			pdf.setTextColor(31, 41, 55);
			pdf.setFont("helvetica", "normal");
			pdf.setFontSize(10);
		};
		const linea = (etiqueta, valor) => {
			const texto = pdf.splitTextToSize(valor, 120);
			if (y + texto.length * 5 > 280) {
				pdf.addPage();
				y = 24;
			}
			pdf.setFont("helvetica", "bold");
			pdf.text(etiqueta, 20, y);
			pdf.setFont("helvetica", "normal");
			pdf.text(texto, 68, y);
			y += texto.length * 5 + 1;
		};
		pdf.setTextColor(200, 16, 46);
		pdf.setFont("helvetica", "bold");
		pdf.setFontSize(15);
		pdf.text("MINISTERIO DE TRANSPORTES Y COMUNICACIONES", 20, y);
		y += 7;
		pdf.setFontSize(12);
		pdf.setTextColor(31, 41, 55);
		pdf.text(`Ficha del predio ${p.code}`, 20, y);
		y += 5;
		pdf.setFont("helvetica", "normal");
		pdf.setFontSize(9);
		pdf.setTextColor(75, 85, 99);
		pdf.text(`Consulta individual de ${subjectData.name} (DNI ${dni || subjectData.dni}) · ${(/* @__PURE__ */ new Date()).toLocaleString("es-PE")}`, 20, y);
		pdf.setTextColor(31, 41, 55);
		pdf.setFontSize(10);
		y += 4;
		titulo("Detalle del predio");
		linea("Modalidad", `${p.modality}. ${MODALIDAD_EXPLICACION[p.modality]} Por qué: ${p.detail.modalityWhy}`);
		linea("Expediente", p.expediente);
		linea("Proyecto", p.project);
		linea("Ubicación", p.location);
		linea("Afectación", `${p.detail.affectation}: ${p.affectedArea} de ${p.detail.totalArea}`);
		linea("Uso del predio", p.detail.use);
		linea("Titularidad", p.detail.ownership);
		linea("Situación registral", p.detail.registry);
		linea("Valor de tasación", p.detail.valuation);
		linea("Unidad responsable", p.responsible);
		titulo("Estado del expediente");
		linea("Avance", `${p.progress} % · etapa ${p.stageNumber} de ${p.totalStages}: ${p.currentStage}`);
		linea("Situación", p.timing === "Atrasado" ? `${p.timingDays} días de atraso` : p.timing === "Adelantado" ? `${p.timingDays} días adelantado` : p.timing);
		linea("Tiempo en etapa", `${p.daysInStage} días (plazo previsto ${p.plannedDays} días)`);
		linea("Próxima acción", `${p.nextAction} Fecha estimada: ${p.expectedDate}.`);
		linea("Actualizado", p.updatedAt);
		titulo("Hitos del proceso");
		const ESTADO = {
			completed: "Cumplido",
			current: "En curso",
			pending: "Pendiente"
		};
		p.timeline.forEach((h, i) => linea(`${i + 1}. ${ESTADO[h.status]}`, `${h.title}${h.date ? ` (${h.date})` : ""}. ${h.description}`));
		titulo("Documentos generados");
		if (!p.documents.length) linea("Sin documentos", "Aún no se generan documentos para este predio.");
		p.documents.forEach((d) => linea(d.number, `${d.title} · ${d.type} · ${d.date} · ${d.stage}`));
		titulo("Equipo a cargo del predio");
		p.team.forEach((m) => linea(m.role, `${m.name}. ${m.title}. Tel. ${m.phone} · ${m.email} · ${m.hours}`));
		y += 4;
		pdf.setFontSize(8);
		pdf.setTextColor(75, 85, 99);
		pdf.text("Ficha demostrativa generada desde la consulta individual de seguimiento predial. No reemplaza una notificación oficial.", 20, Math.min(y, 285), { maxWidth: 170 });
		pdf.save(`ficha-${p.code}.pdf`);
	}
	if (step !== "portal") return /* @__PURE__ */ jsx(AccessScreen, {
		step,
		dni,
		otp,
		feedback,
		loading,
		attempts,
		resendSeconds,
		generatedCode,
		otpRefs,
		onDniChange: (value) => setDni(value.replace(/\D/g, "").slice(0, 8)),
		onSendCode: sendDynamicCode,
		onUpdateOtp: updateOtp,
		onOtpKey: handleOtpKey,
		onPasteOtp: pasteOtp,
		onVerify: verifyCode,
		onResend: resendCode,
		onBack: () => {
			setStep("dni");
			setOtp(Array(6).fill(""));
			setFeedback(null);
		}
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-40 border-b border-border bg-card",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 lg:px-7",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground",
							children: "MTC"
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold uppercase text-primary",
								children: "Consulta individual"
							}), /* @__PURE__ */ jsx("h1", {
								className: "truncate text-lg font-bold text-primary-dark",
								children: "Seguimiento de predios y expedientes"
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "hidden text-right sm:block",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-semibold text-foreground",
									children: subjectData.name
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-xs text-muted-foreground",
									children: ["DNI ", dni]
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "inline-flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary-dark",
								"aria-hidden": true,
								children: /* @__PURE__ */ jsx(UserRound, { size: 16 })
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: logout,
								children: [
									/* @__PURE__ */ jsx(LogOut, {}),
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "hidden sm:inline",
										children: "Cerrar consulta"
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "mx-auto max-w-[1500px] space-y-4 p-4 lg:p-6",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
						children: "Datos de demostración. La información mostrada es de muestra y no corresponde a un expediente real."
					}),
					/* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "inline-flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary-dark",
								"aria-hidden": true,
								children: /* @__PURE__ */ jsx(Fingerprint, { size: 22 })
							}), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: "Sujeto pasivo verificado"
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "text-lg font-bold text-foreground",
									children: subjectData.name
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"DNI ",
										dni,
										" · ",
										subjectData.maskedEmail,
										" · Teléfono ",
										subjectData.phone
									]
								})
							] })]
						}), /* @__PURE__ */ jsxs(StatusBadge, {
							tono: "success",
							children: [/* @__PURE__ */ jsx(ShieldCheck, {
								size: 14,
								className: "mr-1",
								"aria-hidden": true
							}), " Identidad validada con clave dinámica"]
						})]
					}) }),
					/* @__PURE__ */ jsx(AvisosSujeto, {
						dni,
						nombresProyecto: subjectData.properties.map((p) => p.project)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid items-start gap-4 xl:grid-cols-[330px_minmax(0,1fr)]",
						children: [/* @__PURE__ */ jsxs(Section, {
							titulo: "Mis predios y expedientes",
							acciones: /* @__PURE__ */ jsxs(StatusBadge, {
								tono: "neutral",
								children: [subjectData.properties.length, " registrados"]
							}),
							children: [/* @__PURE__ */ jsx("ul", {
								className: "space-y-2",
								children: subjectData.properties.map((property) => {
									const active = selectedProperty.id === property.id;
									return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => {
											setSelectedPropertyId(property.id);
											setActiveTab("timeline");
										},
										"aria-pressed": active,
										className: `w-full rounded-md border p-3 text-left ${active ? "border-primary bg-primary-soft" : "border-border bg-card hover:bg-muted"}`,
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ jsx("span", {
													className: `font-mono text-sm font-semibold ${active ? "text-primary-dark" : "text-foreground"}`,
													children: property.code
												}), /* @__PURE__ */ jsx(ChevronRight, {
													size: 16,
													className: active ? "text-primary-dark" : "text-muted-foreground",
													"aria-hidden": true
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1.5 text-sm font-semibold text-foreground",
												children: property.project
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-0.5 text-xs text-muted-foreground",
												children: property.expediente
											}),
											/* @__PURE__ */ jsx("div", {
												className: "mt-3 h-1.5 overflow-hidden rounded-sm bg-muted",
												"aria-hidden": true,
												children: /* @__PURE__ */ jsx("div", {
													className: "h-full bg-primary",
													style: { width: `${property.progress}%` }
												})
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-1.5 flex items-center justify-between gap-2 text-xs",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "font-semibold text-muted-foreground",
													children: [property.progress, "% de avance"]
												}), /* @__PURE__ */ jsx(StatusBadge, {
													tono: TIMING_TONE[property.timing],
													children: property.timing
												})]
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "mt-2 line-clamp-2 text-xs text-muted-foreground",
												children: [
													"Etapa actual:",
													" ",
													/* @__PURE__ */ jsx("strong", {
														className: "text-foreground",
														children: property.currentStage
													})
												]
											})
										]
									}) }, property.id);
								})
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: "Solo se muestran predios donde su DNI figura como titular, posesionario o sujeto pasivo validado."
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0 space-y-4",
							children: [
								/* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3",
									children: [/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ jsx("h2", {
												className: "font-mono text-lg font-bold text-foreground",
												children: selectedProperty.code
											}), /* @__PURE__ */ jsx(StatusBadge, {
												tono: TIMING_TONE[selectedProperty.timing],
												children: selectedProperty.timing
											})]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm font-semibold text-foreground",
											children: selectedProperty.project
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-0.5 text-xs text-muted-foreground",
											children: ["Expediente ", selectedProperty.expediente]
										})
									] }), /* @__PURE__ */ jsxs("div", {
										className: "text-left lg:text-right",
										children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground",
											children: "Última actualización"
										}), /* @__PURE__ */ jsx("p", {
											className: "mt-1 text-sm font-semibold text-foreground",
											children: selectedProperty.updatedAt
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 pt-4 lg:grid-cols-[minmax(0,1fr)_280px]",
									children: [/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-end justify-between gap-3",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground",
												children: "Avance general"
											}), /* @__PURE__ */ jsxs("p", {
												className: "mt-1 text-sm font-semibold text-foreground",
												children: [
													"Etapa ",
													selectedProperty.stageNumber,
													" de ",
													selectedProperty.totalStages,
													":",
													" ",
													selectedProperty.currentStage
												]
											})] }), /* @__PURE__ */ jsxs("span", {
												className: "text-2xl font-bold tabular-nums text-primary-dark",
												children: [selectedProperty.progress, "%"]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3 h-3 overflow-hidden rounded-sm bg-muted",
											"aria-hidden": true,
											children: /* @__PURE__ */ jsx("div", {
												className: "h-full bg-primary",
												style: { width: `${selectedProperty.progress}%` }
											})
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-2 flex justify-between text-xs text-muted-foreground",
											children: [
												/* @__PURE__ */ jsx("span", { children: "Inicio" }),
												/* @__PURE__ */ jsx("span", { children: "Adquisición" }),
												/* @__PURE__ */ jsx("span", { children: "Pago" }),
												/* @__PURE__ */ jsx("span", { children: "Cierre registral" })
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-4 grid gap-3 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ jsx(InfoCard, {
													icon: Clock3,
													label: "Tiempo en etapa",
													value: `${selectedProperty.daysInStage} días`
												}),
												/* @__PURE__ */ jsx(InfoCard, {
													icon: CalendarClock,
													label: "Plazo previsto",
													value: `${selectedProperty.plannedDays} días`
												}),
												/* @__PURE__ */ jsx(InfoCard, {
													icon: FileCheck2,
													label: "Documentos generados",
													value: `${selectedProperty.documents.length} archivos`
												})
											]
										})
									] }), /* @__PURE__ */ jsxs("div", {
										className: `rounded-md border p-3 ${timingPanelClass(selectedProperty.timing)}`,
										role: "status",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-start gap-2",
											children: [selectedProperty.timing === "Atrasado" ? /* @__PURE__ */ jsx(AlertCircle, {
												size: 18,
												"aria-hidden": true
											}) : /* @__PURE__ */ jsx(CheckCircle2, {
												size: 18,
												"aria-hidden": true
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "text-sm font-bold",
												children: selectedProperty.timing === "Atrasado" ? `${selectedProperty.timingDays} días de atraso` : selectedProperty.timing === "Adelantado" ? `${selectedProperty.timingDays} días adelantado` : selectedProperty.timing
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs",
												children: selectedProperty.timing === "Atrasado" ? "La etapa superó el plazo previsto y requiere completar la acción pendiente." : "El expediente avanza dentro de un tiempo menor al plazo previsto."
											})] })]
										}), /* @__PURE__ */ jsxs("div", {
											className: "mt-3 border-t border-current/20 pt-2",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-xs font-semibold uppercase",
													children: "Próxima acción"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-1 text-xs font-medium",
													children: selectedProperty.nextAction
												}),
												/* @__PURE__ */ jsxs("p", {
													className: "mt-2 text-xs",
													children: ["Fecha estimada: ", /* @__PURE__ */ jsx("strong", { children: selectedProperty.expectedDate })]
												})
											]
										})]
									})]
								})] }),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Detalle de mi predio",
									acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(StatusBadge, {
										tono: selectedProperty.modality === "Expropiación" ? "destructive" : "primary",
										children: selectedProperty.modality
									}), /* @__PURE__ */ jsxs(Button, {
										type: "button",
										size: "sm",
										onClick: () => void descargarFicha(),
										children: [/* @__PURE__ */ jsx(Download, {}), " Descargar ficha en PDF"]
									})] }),
									children: [/* @__PURE__ */ jsxs("div", {
										className: `rounded-md border p-3 text-sm ${selectedProperty.modality === "Expropiación" ? "border-destructive bg-destructive-soft" : "border-primary bg-primary-soft"}`,
										children: [
											/* @__PURE__ */ jsxs("p", {
												className: "font-bold text-foreground",
												children: ["Su predio se adquiere por ", selectedProperty.modality.toLowerCase()]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs text-foreground",
												children: MODALIDAD_EXPLICACION[selectedProperty.modality]
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: ["Por qué: ", selectedProperty.detail.modalityWhy]
											})
										]
									}), /* @__PURE__ */ jsxs("dl", {
										className: "mt-3 grid divide-y divide-border rounded-md border border-border bg-background sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3",
										children: [
											/* @__PURE__ */ jsx(Detail, {
												icon: LandPlot,
												label: "Código del predio",
												value: selectedProperty.code
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: FolderOpen,
												label: "Expediente",
												value: selectedProperty.expediente
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: Building2,
												label: "Proyecto",
												value: selectedProperty.project
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: LandPlot,
												label: "Afectación",
												value: `${selectedProperty.detail.affectation}: ${selectedProperty.affectedArea} de ${selectedProperty.detail.totalArea}`
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: MapPin,
												label: "Uso del predio",
												value: selectedProperty.detail.use
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: UserRound,
												label: "Titularidad",
												value: selectedProperty.detail.ownership
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: FileCheck2,
												label: "Situación registral",
												value: selectedProperty.detail.registry
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: FileText,
												label: "Valor de tasación",
												value: selectedProperty.detail.valuation
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: Hourglass,
												label: "Etapa actual",
												value: selectedProperty.currentStage
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs(Section, { children: [
									/* @__PURE__ */ jsxs("dl", {
										className: "grid divide-y divide-border rounded-md border border-border bg-background sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4",
										children: [
											/* @__PURE__ */ jsx(Detail, {
												icon: MapPin,
												label: "Ubicación",
												value: selectedProperty.location
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: LandPlot,
												label: "Área afectada",
												value: selectedProperty.affectedArea
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: FolderOpen,
												label: "Modalidad",
												value: selectedProperty.modality
											}),
											/* @__PURE__ */ jsx(Detail, {
												icon: Building2,
												label: "Unidad responsable",
												value: selectedProperty.responsible
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-4 flex gap-1 border-b border-border",
										role: "tablist",
										children: [/* @__PURE__ */ jsxs(TabButton, {
											active: activeTab === "timeline",
											onClick: () => setActiveTab("timeline"),
											children: [/* @__PURE__ */ jsx(Hourglass, {
												size: 16,
												"aria-hidden": true
											}), " Línea de tiempo y avance"]
										}), /* @__PURE__ */ jsxs(TabButton, {
											active: activeTab === "documents",
											onClick: () => setActiveTab("documents"),
											children: [
												/* @__PURE__ */ jsx(FileText, {
													size: 16,
													"aria-hidden": true
												}),
												" Documentos generados",
												/* @__PURE__ */ jsx(StatusBadge, {
													tono: "neutral",
													children: selectedProperty.documents.length
												})
											]
										})]
									}),
									activeTab === "timeline" ? /* @__PURE__ */ jsx(Timeline, {
										property: selectedProperty,
										onOpenDocument: (documentId) => {
											const document = selectedProperty.documents.find((item) => item.id === documentId);
											if (document) setSelectedDocument(document);
										}
									}) : /* @__PURE__ */ jsx(DocumentsTable, {
										documents: selectedProperty.documents,
										onView: setSelectedDocument,
										onDownload: (document) => void downloadDocument(document)
									})
								] }),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Equipo a cargo de mi predio",
									acciones: /* @__PURE__ */ jsx(StatusBadge, {
										tono: "neutral",
										children: selectedProperty.responsible
									}),
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-3 text-xs text-muted-foreground",
											children: "Estas son las personas de la DDP asignadas a su expediente. Llame o escriba al que atiende su tema; todos se identifican con fotocheck del MTC."
										}),
										/* @__PURE__ */ jsx("ul", {
											className: "grid gap-3 sm:grid-cols-3",
											children: selectedProperty.team.map((m) => /* @__PURE__ */ jsxs("li", {
												className: "rounded-md border border-border bg-background p-3",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-start gap-3",
														children: [/* @__PURE__ */ jsx("span", {
															className: `inline-flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-bold ${m.tone}`,
															role: "img",
															"aria-label": `Foto de ${m.name}`,
															children: iniciales(m.name)
														}), /* @__PURE__ */ jsxs("div", {
															className: "min-w-0",
															children: [
																/* @__PURE__ */ jsx("p", {
																	className: "text-xs font-semibold uppercase text-primary-dark",
																	children: m.role
																}),
																/* @__PURE__ */ jsx("p", {
																	className: "text-sm font-bold text-foreground",
																	children: m.name
																}),
																/* @__PURE__ */ jsx("p", {
																	className: "text-xs text-muted-foreground",
																	children: m.title
																})
															]
														})]
													}),
													/* @__PURE__ */ jsxs("p", {
														className: "mt-2 text-xs text-foreground",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "font-semibold",
																children: "Atiende:"
															}),
															" ",
															m.attends
														]
													}),
													/* @__PURE__ */ jsxs("dl", {
														className: "mt-2 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-xs",
														children: [
															/* @__PURE__ */ jsx("dt", {
																className: "text-muted-foreground",
																children: "Teléfono"
															}),
															/* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx("a", {
																href: `tel:${m.phone.replace(/s/g, "")}`,
																className: "font-semibold text-primary-dark underline underline-offset-2",
																children: m.phone
															}) }),
															/* @__PURE__ */ jsx("dt", {
																className: "text-muted-foreground",
																children: "Correo"
															}),
															/* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx("a", {
																href: `mailto:${m.email}`,
																className: "font-semibold text-primary-dark underline underline-offset-2",
																children: m.email
															}) }),
															/* @__PURE__ */ jsx("dt", {
																className: "text-muted-foreground",
																children: "Horario"
															}),
															/* @__PURE__ */ jsx("dd", { children: m.hours })
														]
													})
												]
											}, m.id))
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-4 mb-2 text-xs font-semibold uppercase text-primary-dark",
											children: "Herramientas para sus trámites"
										}),
										/* @__PURE__ */ jsx("ul", {
											className: "grid gap-2 sm:grid-cols-2",
											children: HERRAMIENTAS_SUJETO.map((h) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
												href: h.url,
												target: "_blank",
												rel: "noreferrer",
												className: "flex items-start gap-3 rounded-md border border-border bg-background p-3 hover:bg-muted",
												children: [/* @__PURE__ */ jsx(h.icono, {
													size: 18,
													className: "mt-0.5 shrink-0 text-primary-dark",
													"aria-hidden": true
												}), /* @__PURE__ */ jsxs("span", {
													className: "min-w-0",
													children: [/* @__PURE__ */ jsx("span", {
														className: "block text-sm font-bold text-foreground",
														children: h.nombre
													}), /* @__PURE__ */ jsx("span", {
														className: "block text-xs text-muted-foreground",
														children: h.detalle
													})]
												})]
											}) }, h.nombre))
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx(HelpCircle, {
										size: 18,
										className: "mt-0.5 shrink-0 text-primary-dark",
										"aria-hidden": true
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-bold text-foreground",
										children: "¿Necesita aclarar el estado de su expediente?"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Comuníquese con la mesa de ayuda predial indicando su DNI, código de predio y número de expediente. La información mostrada es de consulta y no reemplaza una notificación oficial."
									})] })]
								}) })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(DocumentPreview, {
				document: selectedDocument,
				property: selectedProperty,
				onClose: () => setSelectedDocument(null),
				onDownload: () => selectedDocument && void downloadDocument(selectedDocument)
			})
		]
	});
}
function AccessScreen({ step, dni, otp, feedback, loading, attempts, resendSeconds, generatedCode, otpRefs, onDniChange, onSendCode, onUpdateOtp, onOtpKey, onPasteOtp, onVerify, onResend, onBack }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-foreground px-4 py-8",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 bg-cover bg-center opacity-35",
				style: { backgroundImage: `url(${login_bg_default})` }
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-foreground/95 via-foreground/80 to-primary-dark/75" }),
			/* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				className: "absolute left-4 top-4 z-10",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/",
					children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Volver al inicio"]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 grid w-full max-w-[1040px] overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[1.05fr_0.95fr]",
				children: [/* @__PURE__ */ jsxs("section", {
					className: "hidden bg-primary-dark p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex size-14 items-center justify-center rounded-lg bg-card text-base font-bold text-primary",
							children: "MTC"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-8 text-xs font-semibold uppercase text-primary-soft",
							children: "Servicio digital"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-3 max-w-sm text-2xl font-bold leading-tight",
							children: "Seguimiento individual de predios y expedientes"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 max-w-md text-sm leading-6 text-primary-soft",
							children: "Consulte de forma segura la etapa actual de sus predios, el avance del procedimiento, los plazos y los documentos generados."
						})
					] }), /* @__PURE__ */ jsxs("ul", {
						className: "space-y-3 border-t border-primary-foreground/20 pt-6 text-sm",
						children: [
							/* @__PURE__ */ jsx(AccessBenefit, {
								icon: ShieldCheck,
								children: "Acceso protegido mediante clave dinámica"
							}),
							/* @__PURE__ */ jsx(AccessBenefit, {
								icon: Hourglass,
								children: "Línea de tiempo actualizada del expediente"
							}),
							/* @__PURE__ */ jsx(AccessBenefit, {
								icon: FileCheck2,
								children: "Consulta y descarga de documentos generados"
							})
						]
					})]
				}), /* @__PURE__ */ jsx("section", {
					className: "p-6 sm:p-9 lg:p-10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto max-w-[390px]",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-7 flex items-center justify-center gap-2 lg:hidden",
								children: [/* @__PURE__ */ jsx("span", {
									className: "inline-flex size-9 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground",
									children: "MTC"
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-sm font-bold leading-4 text-foreground",
									children: [
										"Plataforma Digital de",
										/* @__PURE__ */ jsx("br", {}),
										"Gestión de Predios"
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "inline-flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary-dark",
									"aria-hidden": true,
									children: step === "dni" ? /* @__PURE__ */ jsx(Fingerprint, { size: 22 }) : /* @__PURE__ */ jsx(KeyRound, { size: 20 })
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs font-semibold uppercase text-primary",
									children: "Consulta del sujeto pasivo"
								}), /* @__PURE__ */ jsx("h2", {
									className: "text-xl font-semibold text-primary-dark",
									children: step === "dni" ? "Valide su identidad" : "Ingrese la clave dinámica"
								})] })]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "my-6",
								children: /* @__PURE__ */ jsx(Stepper, { pasos: [{
									nombre: "DNI",
									estado: step === "dni" ? "actual" : "completado",
									detalle: "8 dígitos"
								}, {
									nombre: "Clave dinámica",
									estado: step === "otp" ? "actual" : "pendiente",
									detalle: "6 dígitos al correo"
								}] })
							}),
							feedback && /* @__PURE__ */ jsx(AccessFeedback, { feedback }),
							step === "dni" ? /* @__PURE__ */ jsxs("form", {
								onSubmit: onSendCode,
								className: "mt-5",
								children: [
									/* @__PURE__ */ jsx(FormGrid, {
										columnas: 1,
										children: /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de DNI",
											obligatorio: true,
											icono: Fingerprint,
											ayuda: "La clave solo se enviará al correo registrado en su expediente predial.",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												value: dni,
												onChange: (event) => onDniChange(event.target.value),
												inputMode: "numeric",
												autoFocus: true,
												placeholder: "Ingrese los 8 dígitos",
												className: `${controlClase} font-semibold`
											})
										})
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "submit",
										className: "mt-5 w-full",
										disabled: dni.length !== 8 || loading,
										children: [loading ? /* @__PURE__ */ jsx(RefreshCw, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Send, {}), loading ? "Validando DNI" : "Enviar clave al correo"]
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-5 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
										children: [/* @__PURE__ */ jsx("strong", { children: "Datos de demostración:" }), " puede ingresar cualquier DNI de 8 dígitos. En producción se validará la identidad y el correo registrado."]
									})
								]
							}) : /* @__PURE__ */ jsxs("form", {
								onSubmit: onVerify,
								className: "mt-5",
								children: [
									/* @__PURE__ */ jsxs("p", {
										className: "text-sm text-muted-foreground",
										children: [
											"Enviamos una clave de 6 dígitos a ",
											/* @__PURE__ */ jsx("strong", { children: subjectData.maskedEmail }),
											". La clave tiene una vigencia limitada."
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-4",
										onPaste: onPasteOtp,
										role: "group",
										"aria-label": "Clave dinámica de 6 dígitos",
										children: /* @__PURE__ */ jsx("div", {
											className: "flex justify-center gap-2",
											children: otp.map((digit, index) => /* @__PURE__ */ jsx("input", {
												ref: (element) => {
													otpRefs.current[index] = element;
												},
												value: digit,
												onChange: (event) => onUpdateOtp(index, event.target.value),
												onKeyDown: (event) => onOtpKey(index, event),
												inputMode: "numeric",
												maxLength: 1,
												"aria-label": `Dígito ${index + 1}`,
												className: `${controlClase} size-11 px-0 text-center text-lg font-bold`
											}, index))
										})
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-3 flex items-center justify-between text-xs text-muted-foreground",
										children: [/* @__PURE__ */ jsxs("span", { children: ["Intentos disponibles: ", attempts] }), /* @__PURE__ */ jsx(Button, {
											type: "button",
											variant: "link",
											size: "sm",
											onClick: onResend,
											disabled: resendSeconds > 0,
											children: resendSeconds > 0 ? `Reenviar en ${resendSeconds} s` : "Reenviar clave"
										})]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "submit",
										className: "mt-5 w-full",
										disabled: otp.some((digit) => !digit) || loading || attempts <= 0,
										children: [loading ? /* @__PURE__ */ jsx(RefreshCw, { className: "animate-spin" }) : /* @__PURE__ */ jsx(LockKeyhole, {}), loading ? "Verificando clave" : "Ingresar a mi seguimiento"]
									}),
									/* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "ghost",
										className: "mt-2 w-full",
										onClick: onBack,
										children: "Cambiar número de DNI"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-center text-xs text-warning",
										children: [
											/* @__PURE__ */ jsx("strong", { children: "Clave de demostración:" }),
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "font-mono text-sm font-bold",
												children: generatedCode
											})
										]
									})
								]
							})
						]
					})
				})]
			})
		]
	});
}
function Timeline({ property, onOpenDocument }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "pt-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex flex-wrap items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
				className: "text-sm font-bold text-foreground",
				children: "Línea de tiempo del procedimiento"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: "Hitos alcanzados, etapa actual y actuaciones pendientes."
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx(Legend, {
						className: "bg-success",
						label: "Completado"
					}),
					/* @__PURE__ */ jsx(Legend, {
						className: "bg-primary",
						label: "Etapa actual"
					}),
					/* @__PURE__ */ jsx(Legend, {
						className: "bg-border",
						label: "Pendiente"
					})
				]
			})]
		}), /* @__PURE__ */ jsx("ol", {
			className: "relative ml-2 border-l-2 border-border pl-6",
			children: property.timeline.map((item, index) => {
				const attachedDocuments = item.documentIds.map((id) => property.documents.find((document) => document.id === id)).filter((document) => Boolean(document));
				return /* @__PURE__ */ jsxs("li", {
					className: `${index === property.timeline.length - 1 ? "pb-0" : "pb-5"} relative`,
					"aria-current": item.status === "current" ? "step" : void 0,
					children: [/* @__PURE__ */ jsx("span", {
						className: `absolute -left-[33px] top-0 flex size-4 items-center justify-center rounded-full border-2 border-card ${timelineDotClass(item.status)}`,
						"aria-hidden": true,
						children: item.status === "completed" && /* @__PURE__ */ jsx(Check, {
							size: 9,
							className: "text-primary-foreground"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: `rounded-md border p-3 ${timelineCardClass(item.status)}`,
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ jsxs("span", {
												className: "text-xs text-muted-foreground",
												children: ["Hito ", index + 1]
											}),
											item.status === "current" && /* @__PURE__ */ jsx(StatusBadge, {
												tono: "primary",
												children: "Etapa actual"
											}),
											item.status === "completed" && /* @__PURE__ */ jsx(StatusBadge, {
												tono: "success",
												children: "Completado"
											})
										]
									}),
									/* @__PURE__ */ jsx("h4", {
										className: "mt-1 text-sm font-bold text-foreground",
										children: item.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: item.description
									})
								]
							}), (item.date || item.duration) && /* @__PURE__ */ jsxs("div", {
								className: "shrink-0 text-right text-xs text-muted-foreground",
								children: [item.date && /* @__PURE__ */ jsx("p", {
									className: "font-bold text-foreground",
									children: item.date
								}), item.duration && /* @__PURE__ */ jsxs("p", {
									className: "mt-0.5",
									children: ["Duración: ", item.duration]
								})]
							})]
						}), attachedDocuments.length > 0 && /* @__PURE__ */ jsx("div", {
							className: "mt-2 flex flex-wrap gap-1.5 border-t border-border pt-2",
							children: attachedDocuments.map((document) => /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => onOpenDocument(document.id),
								children: [
									/* @__PURE__ */ jsx(FileText, {}),
									" ",
									document.type,
									" ",
									/* @__PURE__ */ jsx(Eye, {})
								]
							}, document.id))
						})]
					})]
				}, item.id);
			})
		})]
	});
}
function DocumentsTable({ documents, onView, onDownload }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "pt-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-sm font-bold text-foreground",
				children: "Documentos generados"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: "Documentos incorporados al expediente hasta la última actualización."
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[780px] text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: "h-9 w-10 px-3 text-center text-xs font-semibold uppercase",
						children: "#"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: "h-9 px-3 text-left text-xs font-semibold uppercase",
						children: "Documento"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: "h-9 w-44 px-3 text-left text-xs font-semibold uppercase",
						children: "Número"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: "h-9 w-40 px-3 text-left text-xs font-semibold uppercase",
						children: "Etapa"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: "h-9 w-24 px-3 text-left text-xs font-semibold uppercase",
						children: "Generado"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: "h-9 w-20 px-3 text-left text-xs font-semibold uppercase",
						children: "Tamaño"
					}),
					/* @__PURE__ */ jsx("th", {
						scope: "col",
						className: "h-9 w-24 px-3 text-center text-xs font-semibold uppercase",
						children: "Acciones"
					})
				] }) }), /* @__PURE__ */ jsxs("tbody", {
					className: "[&>tr:nth-child(even)]:bg-background",
					children: [documents.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: 7,
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "Sin documentos generados."
					}) }), documents.map((document, index) => /* @__PURE__ */ jsxs("tr", {
						className: "h-10 border-t border-border",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 text-center text-muted-foreground",
								children: index + 1
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
										"aria-hidden": true,
										children: /* @__PURE__ */ jsx(FileText, { size: 14 })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "font-semibold text-foreground",
										children: document.title
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: document.type
									})] })]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-mono text-xs font-semibold text-foreground",
								children: document.number
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: document.stage
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 tabular-nums",
								children: document.date
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 text-muted-foreground",
								children: document.size
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex justify-center gap-1",
									children: [/* @__PURE__ */ jsx(SmallAction, {
										label: "Visualizar documento",
										onClick: () => onView(document),
										children: /* @__PURE__ */ jsx(Eye, {})
									}), /* @__PURE__ */ jsx(SmallAction, {
										label: "Descargar PDF",
										onClick: () => onDownload(document),
										children: /* @__PURE__ */ jsx(Download, {})
									})]
								})
							})
						]
					}, document.id))]
				})]
			})
		})]
	});
}
function DocumentPreview({ document, property, onClose, onDownload }) {
	return /* @__PURE__ */ jsx(Modal, {
		abierto: document !== null,
		onCerrar: onClose,
		titulo: document?.title ?? "",
		descripcion: document ? `Vista del documento · Archivo ${document.number}.pdf · ${document.size}` : void 0,
		ancho: "md",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cerrar vista"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: onDownload,
			children: [/* @__PURE__ */ jsx(Download, {}), " Descargar PDF"]
		})] }),
		children: document && /* @__PURE__ */ jsx("div", {
			className: "rounded-md bg-muted p-4 sm:p-7",
			children: /* @__PURE__ */ jsxs("article", {
				className: "mx-auto min-h-[760px] max-w-[610px] border border-border bg-card px-12 py-14",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-xs font-bold uppercase",
								children: "Ministerio de Transportes y Comunicaciones"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Dirección de Disponibilidad de Predios"
							}),
							/* @__PURE__ */ jsx("div", { className: "mx-auto mt-4 h-0.5 w-20 bg-primary" })
						]
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-10 text-center text-sm font-bold uppercase leading-6",
						children: document.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-center font-mono text-sm font-semibold",
						children: document.number
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 space-y-3 text-sm leading-5 text-foreground",
						children: [
							/* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("strong", { children: "Sujeto pasivo:" }),
								" ",
								subjectData.name
							] }),
							/* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("strong", { children: "Código del predio:" }),
								" ",
								property.code
							] }),
							/* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("strong", { children: "Expediente:" }),
								" ",
								property.expediente
							] }),
							/* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("strong", { children: "Proyecto:" }),
								" ",
								property.project
							] }),
							/* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("strong", { children: "Ubicación:" }),
								" ",
								property.location
							] }),
							/* @__PURE__ */ jsxs("p", { children: [
								/* @__PURE__ */ jsx("strong", { children: "Fecha de generación:" }),
								" ",
								document.date
							] })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 border-t border-border pt-5 text-justify text-sm leading-5 text-muted-foreground",
						children: [/* @__PURE__ */ jsxs("p", { children: [
							"El presente documento forma parte del expediente predial señalado y sustenta las actuaciones realizadas durante la etapa de ",
							/* @__PURE__ */ jsx("strong", { children: document.stage }),
							"."
						] }), /* @__PURE__ */ jsx("p", {
							className: "mt-3",
							children: "La visualización presentada corresponde a una vista informativa para el sujeto pasivo. El documento oficial conserva las firmas, anexos y mecanismos de validación establecidos por la entidad."
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-24 flex justify-center",
						children: /* @__PURE__ */ jsx("div", {
							className: "w-52 border-t border-muted-foreground pt-2 text-center text-xs text-muted-foreground",
							children: "Documento generado por la PDGP"
						})
					})
				]
			})
		})
	});
}
function AccessBenefit({ icon: Icon, children }) {
	return /* @__PURE__ */ jsxs("li", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("span", {
			className: "inline-flex size-7 items-center justify-center rounded-md bg-primary-foreground/15",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx(Icon, { size: 14 })
		}), children]
	});
}
function AccessFeedback({ feedback }) {
	return /* @__PURE__ */ jsxs("p", {
		role: feedback.kind === "error" ? "alert" : "status",
		className: `flex items-start gap-2 rounded-md border px-3 py-2 text-xs ${{
			success: "border-success bg-success-soft text-success",
			error: "border-destructive bg-destructive-soft text-destructive",
			info: "border-border bg-background text-foreground"
		}[feedback.kind]}`,
		children: [feedback.kind === "success" ? /* @__PURE__ */ jsx(CheckCircle2, {
			size: 14,
			className: "mt-0.5 shrink-0",
			"aria-hidden": true
		}) : /* @__PURE__ */ jsx(AlertCircle, {
			size: 14,
			className: "mt-0.5 shrink-0",
			"aria-hidden": true
		}), feedback.text]
	});
}
function timingPanelClass(status) {
	if (status === "Atrasado") return "border-destructive bg-destructive-soft text-destructive";
	if (status === "Adelantado") return "border-success bg-success-soft text-success";
	return "border-border bg-primary-soft text-primary-dark";
}
/** "Ing. Juan Carlos Pérez García" → "JP": primer nombre y primer apellido, sin el título. */
function iniciales(nombre) {
	const partes = nombre.replace(/^(Ing|Abog|Lic|Arq|Dr|Dra)\.\s*/, "").split(/\s+/);
	const apellido = partes.length > 2 ? partes[2] : partes[1];
	return `${partes[0]?.[0] ?? ""}${apellido?.[0] ?? ""}`.toUpperCase();
}
function InfoCard({ icon: Icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2 rounded-md border border-border bg-background p-3",
		children: [/* @__PURE__ */ jsx("span", {
			className: "inline-flex size-7 items-center justify-center rounded-md bg-card text-primary-dark",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx(Icon, { size: 14 })
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-0.5 text-sm font-bold text-foreground",
			children: value
		})] })]
	});
}
function Detail({ icon: Icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start gap-2 px-3 py-3",
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 16,
			className: "mt-0.5 shrink-0 text-primary-dark",
			"aria-hidden": true
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "mt-1 text-sm font-semibold text-foreground",
			children: value
		})] })]
	});
}
function TabButton({ active, onClick, children }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		role: "tab",
		"aria-selected": active,
		onClick,
		className: `inline-flex h-9 items-center gap-1.5 border-b-2 px-3 text-sm font-semibold ${active ? "border-primary text-primary-dark" : "border-transparent text-muted-foreground hover:text-foreground"}`,
		children
	});
}
function timelineDotClass(status) {
	if (status === "completed") return "bg-success";
	if (status === "current") return "bg-primary ring-2 ring-primary-soft";
	return "bg-border";
}
function timelineCardClass(status) {
	if (status === "current") return "border-primary bg-primary-soft/50";
	if (status === "pending") return "border-border bg-background text-muted-foreground";
	return "border-border bg-card";
}
function Legend({ className, label }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1",
		children: [/* @__PURE__ */ jsx("span", {
			className: `size-2.5 rounded-sm ${className}`,
			"aria-hidden": true
		}), label]
	});
}
function SmallAction({ label, onClick, children }) {
	return /* @__PURE__ */ jsx(Button, {
		type: "button",
		variant: "outline",
		size: "icon",
		className: "size-8",
		title: label,
		"aria-label": label,
		onClick,
		children
	});
}
/** Anuncios de la DDP para los sujetos pasivos de los proyectos donde este DNI tiene predios. */
function AvisosSujeto({ dni, nombresProyecto }) {
	const datos = useAnuncios();
	const ids = proyectos.filter((p) => nombresProyecto.includes(etiquetaProyecto(p, p.id))).map((p) => p.id);
	const avisos = vigentesParaSujeto(datos.anuncios, ids);
	const quien = lectorSujeto(dni);
	const [ventana, setVentana] = useState(null);
	const candidato = avisos.find((a) => a.emergente !== false && !leido(datos, a.id, quien));
	useEffect(() => {
		if (!candidato) return;
		try {
			if (sessionStorage.getItem("pdgp-aviso-sujeto-visto") === candidato.id) return;
			sessionStorage.setItem("pdgp-aviso-sujeto-visto", candidato.id);
		} catch {}
		setVentana(candidato.id);
	}, [candidato]);
	const abierto = avisos.find((a) => a.id === ventana);
	if (avisos.length === 0) return null;
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Avisos de la Dirección de Disponibilidad de Predios",
		children: [abierto && /* @__PURE__ */ jsx(ModalAnuncio, {
			anuncio: abierto,
			abierto: true,
			onCerrar: () => setVentana(null),
			meta: `${fecha(abierto.mostrarDesde || abierto.publicadoEl)} · ${alcanceTexto(abierto.alcance)}`,
			pie: /* @__PURE__ */ jsx(PieLectura, {
				onMasTarde: () => setVentana(null),
				onLeido: () => {
					marcarLeido(abierto.id, quien);
					setVentana(null);
				}
			})
		}), /* @__PURE__ */ jsx("ul", {
			className: "space-y-3",
			children: avisos.map((a) => {
				const visto = leido(datos, a.id, quien);
				return /* @__PURE__ */ jsxs("li", {
					className: `rounded-md border px-4 py-3 ${a.prioridad === "importante" ? "border-destructive" : "border-border"}`,
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-start justify-between gap-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-semibold text-foreground",
								children: a.titulo
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground",
								children: [
									fecha(a.mostrarDesde || a.publicadoEl),
									" · ",
									alcanceTexto(a.alcance)
								]
							})]
						}), visto ? /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1 text-xs font-medium text-success",
							children: [/* @__PURE__ */ jsx(CheckCircle2, {
								size: 14,
								"aria-hidden": true
							}), " Leído"]
						}) : /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => marcarLeido(a.id, quien),
							children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Marcar como leído"]
						})]
					}), /* @__PURE__ */ jsx(VistaAnuncio, {
						anuncio: a,
						className: "mt-2"
					})]
				}, a.id);
			})
		})]
	});
}
//#endregion
export { SubjectTrackingPage as component };
