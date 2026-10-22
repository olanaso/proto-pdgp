import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { _ as moneda, r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { d as predioRows } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { E as Modal, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Briefcase, Edit, FileText, History, Mail, Paperclip, Plus, Save, Send, X } from "lucide-react";
//#region src/routes/servicios.tsx?tsr-split=component
var textAreaCls = `${controlClase} h-auto min-h-[68px] py-2`;
var estados = [
	"REGISTRO",
	"REVISION",
	"ENVIADO ADMINISTRACION",
	"APROBADO",
	"RECHAZADO",
	"CONTRATADO",
	"SEGUIMIENTO",
	"CONFORMIDAD",
	"PAGO",
	"CERRADO"
];
var serviciosBase = [
	"1.MAQUINAS Y EQUIPOS - 2.6.3.2.1.1",
	"2.MOBILIARIO - 2.6.3.2.1.2",
	"1.EQUIPOS COMPUTACIONALES Y PERIFERICOS - 2.6.3.2.3.1",
	"1.AIRE ACONDICIONADO Y REFRIGERACION - 2.6.3.2.9.1",
	"5.EQUIPOS E INSTRUMENTOS DE MEDICION - 2.6.3.2.9.5",
	"1.TERRENOS URBANOS - 2.6.5.1.1.1",
	"2.TERRENOS RURALES - 2.6.5.1.1.2",
	"2.SOFTWARES - 2.6.6.1.3.2",
	"2.GASTO POR LA COMPRA DE BIENES - 2.6.8.1.4.2",
	"3.GASTO POR LA CONTRATACION DE SERVICIOS - 2.6.8.1.4.3",
	"4.GASTO POR LAUDOS ARBITRALES O SENTENCIAS VINCULADAS A INVERSIONES - 2.6.8.1.4.4",
	"99.OTROS GASTOS - 2.6.8.1.4.99",
	"3.EQUIPOS DE TELECOMUNICACIONES - 2.6.3.2.3.3"
];
var administracionRoles = [
	"Administración",
	"Tesorería",
	"Logística",
	"Abastecimiento",
	"Control presupuestal"
];
var usuariosAdministracion = [
	{
		id: "ADM-000",
		nombre: "Mesa Administración Predial",
		email: "administracion.predial@mtc.gob.pe",
		rol: "Administración"
	},
	{
		id: "ADM-001",
		nombre: "Ana María Campos",
		email: "ana.campos@mtc.gob.pe",
		rol: "Administración"
	},
	{
		id: "ADM-002",
		nombre: "Jorge Salazar Ríos",
		email: "jorge.salazar@mtc.gob.pe",
		rol: "Tesorería"
	},
	{
		id: "ADM-003",
		nombre: "Carmen Ruiz Vega",
		email: "carmen.ruiz@mtc.gob.pe",
		rol: "Logística"
	},
	{
		id: "ADM-004",
		nombre: "Luis Paredes Soto",
		email: "luis.paredes@mtc.gob.pe",
		rol: "Abastecimiento"
	},
	{
		id: "ADM-005",
		nombre: "Milagros Huamán",
		email: "milagros.huaman@mtc.gob.pe",
		rol: "Control presupuestal"
	}
];
var initialSolicitudes = [{
	id: 1,
	codigo: "SS-2026-PRY-016-0001",
	proyectoId: "jauja",
	predioCodigo: "AERO-JAUJA-PR-0567T",
	responsable: "Marcos Armando Soto Luis",
	tipoServicio: "3.GASTO POR LA CONTRATACION DE SERVICIOS - 2.6.8.1.4.3",
	descripcion: "Levantamiento topográfico complementario para sectores con observación técnica.",
	cantidad: 3,
	unidad: "sectores",
	montoEstimado: 42e3,
	montoAprobado: 4e4,
	montoContratado: 39e3,
	montoEjecutado: 18e3,
	fechaSolicitud: "2026-07-02",
	fechaRequerida: "2026-07-25",
	prioridad: "ALTA",
	proveedor: "Consorcio GeoAndes",
	correosNotificacion: "administracion.predial@mtc.gob.pe; coordinacion.predial@mtc.gob.pe",
	hojaRuta: "HR-2026-004512",
	estado: "SEGUIMIENTO",
	avance: 46,
	documentos: [{
		id: 1,
		nombre: "TDR topografía complementaria",
		version: "v1",
		archivo: "tdr_topografia_jauja.pdf",
		responsable: "Especialista técnico",
		fecha: "02/07/2026 10:30"
	}, {
		id: 2,
		nombre: "Cotización GeoAndes",
		version: "v1",
		archivo: "cotizacion_geoandes.pdf",
		responsable: "Administración",
		fecha: "04/07/2026 12:15"
	}],
	historial: [
		{
			id: 1,
			fecha: "02/07/2026 10:30",
			usuario: "Especialista técnico",
			estado: "REGISTRO",
			detalle: "Solicitud registrada con TDR inicial."
		},
		{
			id: 2,
			fecha: "04/07/2026 12:15",
			usuario: "Administración",
			estado: "CONTRATADO",
			detalle: "Servicio contratado y proveedor asignado."
		},
		{
			id: 3,
			fecha: "10/07/2026 09:00",
			usuario: "Coordinador predial",
			estado: "SEGUIMIENTO",
			detalle: "Se registra avance parcial del servicio."
		}
	]
}, {
	id: 2,
	codigo: "SS-2026-PRY-024-0002",
	proyectoId: "autopista-del-sol",
	predioCodigo: "",
	responsable: "Marlon Napravnick Noriega",
	tipoServicio: "3.GASTO POR LA CONTRATACION DE SERVICIOS - 2.6.8.1.4.3",
	descripcion: "Revisión legal de expedientes con titulares observados.",
	cantidad: 12,
	unidad: "expedientes",
	montoEstimado: 24e3,
	montoAprobado: 24e3,
	montoContratado: 0,
	montoEjecutado: 0,
	fechaSolicitud: "2026-07-08",
	fechaRequerida: "2026-08-05",
	prioridad: "MEDIA",
	proveedor: "Por asignar",
	correosNotificacion: "administracion.predial@mtc.gob.pe; legal.predial@mtc.gob.pe",
	hojaRuta: "",
	estado: "APROBADO",
	avance: 10,
	documentos: [{
		id: 1,
		nombre: "TDR asesoría legal",
		version: "v2",
		archivo: "tdr_asesoria_legal_v2.pdf",
		responsable: "Especialista legal",
		fecha: "09/07/2026 08:45"
	}],
	historial: [{
		id: 1,
		fecha: "08/07/2026 16:20",
		usuario: "Especialista legal",
		estado: "REGISTRO",
		detalle: "Solicitud creada."
	}, {
		id: 2,
		fecha: "09/07/2026 11:10",
		usuario: "Coordinador predial",
		estado: "APROBADO",
		detalle: "Solicitud aprobada para gestión administrativa."
	}]
}];
function nowLabel() {
	return (/* @__PURE__ */ new Date()).toLocaleString("es-PE", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	});
}
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
var money = moneda;
function makeSolicitudCode(index, projectId) {
	const proyecto = proyectos.find((item) => item.id === projectId);
	return `SS-${(/* @__PURE__ */ new Date()).getFullYear()}-${proyecto?.codigo ?? "PRY-000"}-${String(index).padStart(4, "0")}`;
}
function normalizeText(value) {
	return String(value ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
}
function prediosForProject(projectId) {
	const proyecto = proyectos.find((item) => item.id === projectId);
	if (!proyecto) return [];
	const projectName = normalizeText(proyecto.nombre);
	const projectIdText = normalizeText(projectId);
	return predioRows.filter((predio) => {
		const rowProject = normalizeText(predio.proyecto);
		const rowCode = normalizeText(predio.cod || predio.codigo);
		return rowProject.includes(projectName) || rowProject.includes(projectIdText) || rowCode.includes(projectIdText);
	});
}
var exportHeaders = [
	"Código interno",
	"Proyecto",
	"Predio vinculado",
	"Responsable",
	"Tipo de servicio",
	"Descripción",
	"Cantidad",
	"Unidad",
	"Monto estimado",
	"Monto aprobado",
	"Monto contratado",
	"Monto ejecutado",
	"Fecha solicitud",
	"Fecha requerida",
	"Prioridad",
	"Proveedor asignado",
	"Correos notificación",
	"Hoja de ruta",
	"Estado",
	"Avance %",
	"Documentos y versiones",
	"Historial de cambios"
];
function projectLabel(projectId) {
	const proyecto = proyectos.find((item) => item.id === projectId);
	return proyecto ? `${proyecto.codigo} - ${proyecto.nombre}` : projectId;
}
function documentsLabel(documentos) {
	if (!documentos.length) return "Sin documentos";
	return documentos.map((item) => `${item.nombre} (${item.version}) - ${item.archivo || "Sin archivo"} - ${item.responsable} - ${item.fecha}`).join(" | ");
}
function historyLabel(historial) {
	if (!historial.length) return "Sin historial";
	return historial.map((item) => `${item.fecha} - ${item.usuario} - ${item.estado}: ${item.detalle}`).join(" | ");
}
function solicitudExportRow(item) {
	return [
		item.codigo,
		projectLabel(item.proyectoId),
		item.predioCodigo || "Sin vínculo",
		item.responsable,
		item.tipoServicio,
		item.descripcion,
		item.cantidad,
		item.unidad,
		item.montoEstimado,
		item.montoAprobado,
		item.montoContratado,
		item.montoEjecutado,
		item.fechaSolicitud,
		item.fechaRequerida,
		item.prioridad,
		item.proveedor || "Por asignar",
		item.correosNotificacion,
		item.hojaRuta || "Sin hoja de ruta",
		item.estado,
		item.avance,
		documentsLabel(item.documentos),
		historyLabel(item.historial)
	];
}
function escapeHtml(value) {
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function exportSolicitudesExcel(rows) {
	const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const tableRows = rows.map((item) => solicitudExportRow(item));
	const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; font-size: 11px; }
    table { border-collapse: collapse; width: 100%; }
    th { background: rgb(200, 16, 46); color: rgb(255, 255, 255); font-weight: bold; }
    th, td { border: 1px solid rgb(209, 213, 219); padding: 6px; vertical-align: top; mso-number-format:"\\@"; }
    .number { mso-number-format:"0.00"; }
  </style>
</head>
<body>
  <h3>Solicitudes y control de servicios</h3>
  <p>Fecha de exportación: ${stamp} | Registros: ${rows.length}</p>
  <table>
    <thead><tr>${exportHeaders.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
    <tbody>
      ${tableRows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
    </tbody>
  </table>
</body>
</html>`;
	descargarBlob(`solicitudes_servicios_${stamp}.xls`, new Blob(["﻿", html], { type: "application/vnd.ms-excel;charset=utf-8" }));
}
function pdfSafe(value) {
	return String(value).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\x20-\x7E]/g, " ").replace(/[\\()]/g, "\\$&");
}
function wrapPdfLine(value, max = 104) {
	const text = String(value).replace(/\s+/g, " ").trim();
	if (!text) return [""];
	const words = text.split(" ");
	const lines = [];
	let current = "";
	words.forEach((word) => {
		const next = current ? `${current} ${word}` : word;
		if (next.length > max && current) {
			lines.push(current);
			current = word;
		} else current = next;
	});
	if (current) lines.push(current);
	return lines;
}
function createSolicitudesPdfBlob(rows, totals) {
	return createTextPdfBlob([
		"Solicitudes y control de servicios",
		`Fecha de exportación: ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`,
		`Registros: ${rows.length}`,
		`Totales: estimado ${money(totals.estimado)} | aprobado ${money(totals.aprobado)} | contratado ${money(totals.contratado)} | ejecutado ${money(totals.ejecutado)}`,
		"",
		...rows.flatMap((item, index) => {
			const values = solicitudExportRow(item);
			return [
				`${index + 1}. ${item.codigo}`,
				...exportHeaders.map((header, headerIndex) => `${header}: ${values[headerIndex]}`),
				""
			];
		})
	]);
}
function createTextPdfBlob(rawLines) {
	const pageLineLimit = 56;
	const lines = rawLines.flatMap((line) => wrapPdfLine(line));
	const pages = [];
	for (let i = 0; i < lines.length; i += pageLineLimit) pages.push(lines.slice(i, i + pageLineLimit));
	if (!pages.length) pages.push(["Sin registros"]);
	const objects = [];
	const addObject = (body) => {
		objects.push(body);
		return objects.length;
	};
	addObject("<< /Type /Catalog /Pages 2 0 R >>");
	addObject("");
	const fontObj = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
	const pageObjectNumbers = [];
	pages.forEach((pageLines) => {
		const stream = [
			"BT",
			"/F1 9 Tf",
			"42 800 Td",
			"12 TL",
			...pageLines.map((line) => `(${pdfSafe(line)}) Tj T*`),
			"ET"
		].join("\n");
		const contentObj = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
		const pageObj = addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontObj} 0 R >> >> /Contents ${contentObj} 0 R >>`);
		pageObjectNumbers.push(pageObj);
	});
	objects[1] = `<< /Type /Pages /Kids [${pageObjectNumbers.map((num) => `${num} 0 R`).join(" ")}] /Count ${pageObjectNumbers.length} >>`;
	let pdf = "%PDF-1.4\n";
	const offsets = [0];
	objects.forEach((body, index) => {
		offsets[index + 1] = pdf.length;
		pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
	});
	const xrefOffset = pdf.length;
	pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
	for (let i = 1; i <= objects.length; i += 1) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
	pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
	return new Blob([pdf], { type: "application/pdf" });
}
function exportSolicitudesPdf(rows, totals) {
	descargarBlob(`solicitudes_servicios_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf`, createSolicitudesPdfBlob(rows, totals));
}
function emptyForm() {
	return {
		proyectoId: "jauja",
		predioCodigo: "",
		responsable: "Coordinación predial",
		tipoServicio: "3.GASTO POR LA CONTRATACION DE SERVICIOS - 2.6.8.1.4.3",
		descripcion: "",
		cantidad: 1,
		unidad: "servicio",
		montoEstimado: 0,
		montoAprobado: 0,
		montoContratado: 0,
		montoEjecutado: 0,
		fechaSolicitud: today(),
		fechaRequerida: today(),
		prioridad: "MEDIA",
		proveedor: "",
		correosNotificacion: "administracion.predial@mtc.gob.pe",
		hojaRuta: "",
		estado: "REGISTRO",
		avance: 0
	};
}
function recipientsFromEmails(value) {
	return value.split(/[;,]/).map((email) => email.trim()).filter(Boolean).map((email) => {
		return usuariosAdministracion.find((item) => item.email.toLowerCase() === email.toLowerCase()) ?? {
			id: email,
			nombre: email,
			email,
			rol: "Administración"
		};
	});
}
function tonoEstado(estado) {
	if (estado === "RECHAZADO") return "destructive";
	if ([
		"APROBADO",
		"CONTRATADO",
		"CONFORMIDAD",
		"PAGO",
		"CERRADO"
	].includes(estado)) return "success";
	return "warning";
}
function totalsOf(rows) {
	return {
		estimado: rows.reduce((sum, item) => sum + item.montoEstimado, 0),
		aprobado: rows.reduce((sum, item) => sum + item.montoAprobado, 0),
		contratado: rows.reduce((sum, item) => sum + item.montoContratado, 0),
		ejecutado: rows.reduce((sum, item) => sum + item.montoEjecutado, 0)
	};
}
var ETIQUETAS = {
	codigo: "Código",
	proyectoId: "Proyecto",
	predioCodigo: "Predio",
	responsable: "Responsable",
	tipoServicio: "Tipo de servicio",
	descripcion: "Descripción",
	cantidad: "Cantidad",
	unidad: "Unidad",
	montoEstimado: "Monto estimado",
	montoAprobado: "Monto aprobado",
	montoContratado: "Monto contratado",
	montoEjecutado: "Monto ejecutado",
	fechaSolicitud: "Fecha de solicitud",
	fechaRequerida: "Fecha requerida",
	prioridad: "Prioridad",
	proveedor: "Proveedor",
	correosNotificacion: "Correos de notificación",
	hojaRuta: "Hoja de ruta",
	estado: "Estado",
	avance: "Avance (%)",
	documentos: "Documento",
	historial: "Seguimiento"
};
var opciones = (valores) => valores.map((v) => ({
	valor: v,
	texto: v
}));
function ServiciosPage() {
	const catalogo = serviciosBase;
	const [solicitudes, setSolicitudes] = useState(initialSolicitudes);
	const rol = useRol();
	const { guardarVersion, restaurar } = useFormularioConHistorial("servicios", solicitudes, setSolicitudes, {
		modulo: 23,
		entidad: "solicitudes_servicio"
	});
	const [editing, setEditing] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [historyItem, setHistoryItem] = useState(null);
	const [resendItem, setResendItem] = useState(null);
	const [notificationMessage, setNotificationMessage] = useState(null);
	const filas = useMemo(() => solicitudes.map((item) => ({
		...item,
		proyectoNombre: proyectos.find((p) => p.id === item.proyectoId)?.nombre ?? item.proyectoId,
		mesSolicitud: item.fechaSolicitud.slice(0, 7)
	})), [solicitudes]);
	const meses = useMemo(() => [...new Set(filas.map((f) => f.mesSolicitud))].sort(), [filas]);
	const totals = useMemo(() => totalsOf(solicitudes), [solicitudes]);
	function saveSolicitud(form, documentos) {
		const emailDetail = form.correosNotificacion.trim() ? `Correo enviado a: ${form.correosNotificacion}.` : "No se registraron correos para notificar.";
		let siguiente;
		if (editing) {
			siguiente = solicitudes.map((item) => item.id === editing.id ? {
				...item,
				...form,
				documentos,
				historial: [{
					id: Date.now(),
					fecha: nowLabel(),
					usuario: form.responsable || "Equipo funcional",
					estado: form.estado,
					detalle: `Registro actualizado desde el formulario de servicios. ${emailDetail}`
				}, ...item.historial]
			} : item);
			guardarVersion("Modificó solicitud de servicio", editing.codigo, void 0, siguiente);
		} else {
			const nextId = Math.max(0, ...solicitudes.map((item) => item.id)) + 1;
			const codigo = makeSolicitudCode(nextId, form.proyectoId);
			siguiente = [{
				id: nextId,
				codigo,
				...form,
				documentos,
				historial: [{
					id: Date.now(),
					fecha: nowLabel(),
					usuario: form.responsable || "Equipo funcional",
					estado: form.estado,
					detalle: `Solicitud de servicio registrada. ${emailDetail}`
				}]
			}, ...solicitudes];
			guardarVersion("Registró solicitud de servicio", codigo, void 0, siguiente);
		}
		setSolicitudes(siguiente);
		setNotificationMessage(`Solicitud guardada. ${emailDetail}`);
		setShowForm(false);
	}
	function advanceEstado(item) {
		const nextEstado = estados[Math.min(estados.indexOf(item.estado) + 1, estados.length - 1)];
		const siguiente = solicitudes.map((row) => row.id === item.id ? {
			...row,
			estado: nextEstado,
			historial: [{
				id: Date.now(),
				fecha: nowLabel(),
				usuario: "Equipo funcional",
				estado: nextEstado,
				detalle: nextEstado === "ENVIADO ADMINISTRACION" ? `Enviado a ${row.correosNotificacion}.` : "Cambio de estado registrado."
			}, ...row.historial]
		} : row);
		setSolicitudes(siguiente);
		guardarVersion("Cambió el estado de la solicitud", `${item.codigo}: ${item.estado} a ${nextEstado}`, void 0, siguiente);
		setNotificationMessage(`Solicitud ${item.codigo} pasó a ${nextEstado}.`);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		notificationMessage && /* @__PURE__ */ jsxs("p", {
			role: "status",
			className: "mb-4 flex items-center justify-between gap-3 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "inline-flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsx(Mail, {
						size: 16,
						"aria-hidden": true
					}),
					" ",
					notificationMessage
				]
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setNotificationMessage(null),
				className: "rounded-sm hover:bg-success/10",
				"aria-label": "Cerrar aviso",
				children: /* @__PURE__ */ jsx(X, {
					size: 16,
					"aria-hidden": true
				})
			})]
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Solicitudes y control de servicios",
			icono: Briefcase,
			descripcion: "Registro, aprobación, contratación, seguimiento y cierre de servicios por proyecto.",
			migas: [{ texto: "Evaluación de productos" }, { texto: "Servicios y solicitudes" }],
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => exportSolicitudesPdf(solicitudes, totals),
				title: "Descargar PDF con datos completos",
				children: [/* @__PURE__ */ jsx(FileText, {}), " Exportar PDF"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => {
					setEditing(null);
					setShowForm(true);
				},
				children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar solicitud"]
			})] }),
			demo: true,
			columnas: [
				{
					clave: "codigo",
					titulo: "Código",
					ancho: "170px",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "font-mono text-xs text-primary-dark",
						children: f.codigo
					})
				},
				{
					clave: "proyectoNombre",
					titulo: "Proyecto"
				},
				{
					clave: "predioCodigo",
					titulo: "Predio",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "font-mono text-xs",
						children: f.predioCodigo || "Sin vínculo"
					})
				},
				{
					clave: "tipoServicio",
					titulo: "Servicio",
					render: (f) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
						className: "font-medium",
						children: f.tipoServicio
					}), /* @__PURE__ */ jsx("div", {
						className: "max-w-[280px] truncate text-xs text-muted-foreground",
						children: f.descripcion
					})] })
				},
				{
					clave: "proveedor",
					titulo: "Proveedor",
					render: (f) => f.proveedor || "Por asignar"
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (f) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: tonoEstado(f.estado),
						children: f.estado
					})
				},
				{
					clave: "montoEstimado",
					titulo: "Estimado",
					alinear: "derecha",
					render: (f) => money(f.montoEstimado)
				},
				{
					clave: "montoEjecutado",
					titulo: "Ejecutado",
					alinear: "derecha",
					render: (f) => money(f.montoEjecutado)
				},
				{
					clave: "avance",
					titulo: "Avance",
					alinear: "centro",
					render: (f) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
						className: "mx-auto h-2 w-20 overflow-hidden rounded-sm bg-muted",
						role: "progressbar",
						"aria-valuenow": f.avance,
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						children: /* @__PURE__ */ jsx("div", {
							className: "h-full bg-primary",
							style: { width: `${f.avance}%` }
						})
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-xs text-muted-foreground",
						children: [f.avance, "%"]
					})] })
				}
			],
			filas,
			claveFila: (f) => f.id,
			filtros: [
				{
					clave: "proyectoId",
					etiqueta: "Proyecto",
					opciones: proyectos.map((p) => ({
						valor: p.id,
						texto: `${p.codigo} - ${p.nombre}`
					}))
				},
				{
					clave: "tipoServicio",
					etiqueta: "Tipo de servicio",
					opciones: opciones(catalogo)
				},
				{
					clave: "estado",
					etiqueta: "Estado",
					opciones: opciones(estados)
				},
				{
					clave: "prioridad",
					etiqueta: "Prioridad",
					opciones: opciones([
						"ALTA",
						"MEDIA",
						"BAJA"
					])
				},
				{
					clave: "mesSolicitud",
					etiqueta: "Mes de solicitud",
					opciones: opciones(meses)
				}
			],
			buscarEn: [
				"codigo",
				"proyectoNombre",
				"predioCodigo",
				"descripcion",
				"proveedor",
				"responsable"
			],
			accionesFila: [
				{
					nombre: "Editar solicitud",
					icono: Edit,
					onClick: (f) => {
						setEditing(f);
						setShowForm(true);
					}
				},
				{
					nombre: "Registrar cambio de estado",
					icono: Send,
					onClick: advanceEstado
				},
				{
					nombre: "Reenviar correo",
					icono: Mail,
					onClick: (f) => setResendItem(f)
				},
				{
					nombre: "Ver seguimiento",
					icono: History,
					onClick: (f) => setHistoryItem(f)
				}
			],
			exportar: (visibles) => exportSolicitudesExcel(visibles),
			vacio: "No hay solicitudes de servicio registradas.",
			historial: {
				registro: "servicios",
				etiquetas: ETIQUETAS,
				etiquetaFila: (f) => f.codigo,
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: (registro, n) => restaurar(registro, n)
			}
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Totales de la cartera",
			className: "mt-4",
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Sobre todas las solicitudes · Datos de demostración"
			}), /* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(AmountCard, {
						label: "Monto estimado",
						value: totals.estimado
					}),
					/* @__PURE__ */ jsx(AmountCard, {
						label: "Monto aprobado",
						value: totals.aprobado
					}),
					/* @__PURE__ */ jsx(AmountCard, {
						label: "Monto contratado",
						value: totals.contratado
					}),
					/* @__PURE__ */ jsx(AmountCard, {
						label: "Monto ejecutado",
						value: totals.ejecutado
					})
				]
			})]
		}),
		showForm && /* @__PURE__ */ jsx(SolicitudModal, {
			catalogo,
			editing,
			nextCode: makeSolicitudCode(Math.max(0, ...solicitudes.map((item) => item.id)) + 1, editing?.proyectoId ?? "jauja"),
			onClose: () => setShowForm(false),
			onSave: saveSolicitud
		}),
		historyItem && /* @__PURE__ */ jsx(HistorialModal, {
			solicitud: historyItem,
			onClose: () => setHistoryItem(null)
		}),
		resendItem && /* @__PURE__ */ jsx(ReenviarCorreoModal, {
			solicitud: resendItem,
			onClose: () => setResendItem(null),
			onSend: (email) => {
				const message = `Correo de la solicitud ${resendItem.codigo} reenviado a: ${email}.`;
				const siguiente = solicitudes.map((item) => item.id === resendItem.id ? {
					...item,
					historial: [{
						id: Date.now(),
						fecha: nowLabel(),
						usuario: "Equipo funcional",
						estado: item.estado,
						detalle: message
					}, ...item.historial]
				} : item);
				setSolicitudes(siguiente);
				registrarEnvio({
					proyecto: "mtc",
					predio: "",
					paso: "servicios",
					canal: "Correo",
					destinatario: email,
					documento: resendItem.codigo,
					detalle: "Reenvío de la solicitud de servicio"
				}, {
					modulo: 8,
					entidad: "solicitud_servicio"
				});
				guardarVersion("Reenvió correo de la solicitud", resendItem.codigo, void 0, siguiente);
				setNotificationMessage(message);
				setResendItem(null);
			}
		})
	] });
}
function AmountCard({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border px-3 py-2",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "mt-1 text-lg font-semibold tabular-nums",
			children: money(value)
		})]
	});
}
function SolicitudModal({ catalogo, editing, nextCode, onClose, onSave }) {
	const [form, setForm] = useState(() => editing ? { ...editing } : emptyForm());
	const [documentos, setDocumentos] = useState(editing?.documentos ?? []);
	const [documentName, setDocumentName] = useState("");
	const [documentFileName, setDocumentFileName] = useState("");
	const [selectedAdminUserId, setSelectedAdminUserId] = useState(usuariosAdministracion[0]?.id ?? "");
	const [selectedAdminRole, setSelectedAdminRole] = useState(administracionRoles[0]);
	const [adminRecipients, setAdminRecipients] = useState(() => recipientsFromEmails(editing?.correosNotificacion ?? emptyForm().correosNotificacion));
	const codigo = editing?.codigo ?? nextCode;
	const prediosProyecto = useMemo(() => prediosForProject(form.proyectoId), [form.proyectoId]);
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function setRecipients(nextRecipients) {
		setAdminRecipients(nextRecipients);
		setField("correosNotificacion", nextRecipients.map((item) => item.email).join("; "));
	}
	function addAdminRecipient() {
		const user = usuariosAdministracion.find((item) => item.id === selectedAdminUserId);
		if (!user) return;
		const nextUser = {
			...user,
			rol: selectedAdminRole
		};
		setRecipients([...adminRecipients.filter((item) => item.email !== nextUser.email), nextUser]);
	}
	function removeAdminRecipient(email) {
		setRecipients(adminRecipients.filter((item) => item.email !== email));
	}
	function addDocumento() {
		const nombre = documentName.trim();
		if (!nombre || !documentFileName) return;
		const count = documentos.filter((item) => item.nombre.toLowerCase() === nombre.toLowerCase()).length + 1;
		setDocumentos((current) => [{
			id: Date.now(),
			nombre,
			version: `v${count}`,
			archivo: documentFileName,
			responsable: form.responsable || "Equipo funcional",
			fecha: nowLabel()
		}, ...current]);
		setDocumentName("");
		setDocumentFileName("");
	}
	const numero = (key, etiqueta, max) => /* @__PURE__ */ jsx(FormField, {
		etiqueta,
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			type: "number",
			min: 0,
			max,
			className: controlClase,
			value: form[key],
			onChange: (event) => setField(key, Number(event.target.value))
		})
	});
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: editing ? "Editar solicitud de servicio" : "Registrar solicitud de servicio",
		descripcion: `Código interno: ${codigo}`,
		ancho: "xl",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "submit",
			form: "form-solicitud-servicio",
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar solicitud"]
		})] }),
		children: /* @__PURE__ */ jsxs("form", {
			id: "form-solicitud-servicio",
			onSubmit: (event) => {
				event.preventDefault();
				onSave(form, documentos);
			},
			children: [
				/* @__PURE__ */ jsx(Subtitulo, { children: "Datos generales" }),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Proyecto",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: controlClase,
							value: form.proyectoId,
							onChange: (event) => {
								const nextProjectId = event.target.value;
								setForm((current) => ({
									...current,
									proyectoId: nextProjectId,
									predioCodigo: ""
								}));
							},
							children: proyectos.map((proyecto) => /* @__PURE__ */ jsxs("option", {
								value: proyecto.id,
								children: [
									proyecto.codigo,
									" - ",
									proyecto.nombre
								]
							}, proyecto.id))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Responsable",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase,
							value: form.responsable,
							onChange: (event) => setField("responsable", event.target.value)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Predio vinculado",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							value: form.predioCodigo,
							onChange: (event) => setField("predioCodigo", event.target.value),
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Sin predio vinculado"
							}), prediosProyecto.map((predio) => {
								const codigoPredio = predio.cod || predio.codigo;
								return /* @__PURE__ */ jsxs("option", {
									value: codigoPredio,
									children: [
										codigoPredio,
										" - ",
										predio.suj
									]
								}, predio.rowId);
							})]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Tipo de servicio",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: controlClase,
							value: form.tipoServicio,
							onChange: (event) => setField("tipoServicio", event.target.value),
							children: catalogo.map((item) => /* @__PURE__ */ jsx("option", { children: item }, item))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Proveedor asignado",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase,
							value: form.proveedor,
							onChange: (event) => setField("proveedor", event.target.value)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Hoja de ruta",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase,
							value: form.hojaRuta,
							onChange: (event) => setField("hojaRuta", event.target.value),
							placeholder: "Nro. HR para sincronizar mesa de partes"
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Descripción",
						obligatorio: true,
						ancho: "doble",
						children: (id) => /* @__PURE__ */ jsx("textarea", {
							id,
							className: textAreaCls,
							value: form.descripcion,
							onChange: (event) => setField("descripcion", event.target.value)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Cantidad / unidad",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-[120px_1fr] gap-2",
							children: [/* @__PURE__ */ jsx("input", {
								type: "number",
								min: 0,
								className: controlClase,
								value: form.cantidad,
								"aria-label": "Cantidad",
								onChange: (event) => setField("cantidad", Number(event.target.value))
							}), /* @__PURE__ */ jsx("input", {
								className: controlClase,
								value: form.unidad,
								"aria-label": "Unidad",
								onChange: (event) => setField("unidad", event.target.value)
							})]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Prioridad / estado",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ jsxs("select", {
								className: controlClase,
								value: form.prioridad,
								"aria-label": "Prioridad",
								onChange: (event) => setField("prioridad", event.target.value),
								children: [
									/* @__PURE__ */ jsx("option", { children: "ALTA" }),
									/* @__PURE__ */ jsx("option", { children: "MEDIA" }),
									/* @__PURE__ */ jsx("option", { children: "BAJA" })
								]
							}), /* @__PURE__ */ jsx("select", {
								className: controlClase,
								value: form.estado,
								"aria-label": "Estado",
								onChange: (event) => setField("estado", event.target.value),
								children: estados.map((estado) => /* @__PURE__ */ jsx("option", { children: estado }, estado))
							})]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Fecha de solicitud",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							className: controlClase,
							value: form.fechaSolicitud,
							onChange: (event) => setField("fechaSolicitud", event.target.value)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Fecha requerida",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							className: controlClase,
							value: form.fechaRequerida,
							onChange: (event) => setField("fechaRequerida", event.target.value)
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Usuarios de administración",
						ancho: "doble",
						ayuda: "Los correos seleccionados reciben la notificación de la solicitud.",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 gap-2 sm:grid-cols-[1fr_180px_auto]",
									children: [
										/* @__PURE__ */ jsx("select", {
											className: controlClase,
											value: selectedAdminUserId,
											"aria-label": "Usuario de administración",
											onChange: (event) => setSelectedAdminUserId(event.target.value),
											children: usuariosAdministracion.map((user) => /* @__PURE__ */ jsxs("option", {
												value: user.id,
												children: [
													user.nombre,
													" - ",
													user.email
												]
											}, user.id))
										}),
										/* @__PURE__ */ jsx("select", {
											className: controlClase,
											value: selectedAdminRole,
											"aria-label": "Rol",
											onChange: (event) => setSelectedAdminRole(event.target.value),
											children: administracionRoles.map((rol) => /* @__PURE__ */ jsx("option", { children: rol }, rol))
										}),
										/* @__PURE__ */ jsxs(Button, {
											type: "button",
											onClick: addAdminRecipient,
											children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar destinatario"]
										})
									]
								}),
								/* @__PURE__ */ jsx("input", {
									className: `${controlClase} bg-muted`,
									value: form.correosNotificacion,
									readOnly: true,
									"aria-label": "Correos de notificación",
									placeholder: "Agregue usuarios de administración para notificar"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "min-h-8 rounded-md border border-border p-2",
									children: adminRecipients.length ? /* @__PURE__ */ jsx("ul", {
										className: "flex flex-wrap gap-1.5",
										children: adminRecipients.map((user) => /* @__PURE__ */ jsxs("li", {
											className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-primary-soft/50 px-2 py-1 text-xs text-foreground",
											children: [
												/* @__PURE__ */ jsx(Mail, {
													size: 14,
													className: "text-primary",
													"aria-hidden": true
												}),
												/* @__PURE__ */ jsx("b", { children: user.rol }),
												/* @__PURE__ */ jsx("span", { children: user.nombre }),
												/* @__PURE__ */ jsx("span", {
													className: "text-muted-foreground",
													children: user.email
												}),
												/* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => removeAdminRecipient(user.email),
													className: "ml-1 rounded-sm text-muted-foreground hover:text-destructive",
													"aria-label": `Quitar ${user.email}`,
													children: /* @__PURE__ */ jsx(X, {
														size: 14,
														"aria-hidden": true
													})
												})
											]
										}, user.email))
									}) : /* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground",
										children: "Sin usuarios de administración agregados."
									})
								})
							]
						})
					})
				] }),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Control de montos y avance" }),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					numero("montoEstimado", "Monto estimado"),
					numero("montoAprobado", "Monto aprobado"),
					numero("montoContratado", "Monto contratado"),
					numero("montoEjecutado", "Monto ejecutado"),
					numero("avance", "Avance %", 100)
				] }),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Documentos y versiones" }),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-2 grid grid-cols-1 items-center gap-2 rounded-md border border-border bg-muted p-2 sm:grid-cols-[1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ jsx("input", {
							className: controlClase,
							value: documentName,
							onChange: (event) => setDocumentName(event.target.value),
							placeholder: "Nombre del documento",
							"aria-label": "Nombre del documento"
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-3 text-sm hover:bg-primary-soft/40",
							children: [
								/* @__PURE__ */ jsx(Paperclip, {
									size: 16,
									"aria-hidden": true
								}),
								/* @__PURE__ */ jsx("span", {
									className: "truncate",
									children: documentFileName || "Seleccionar archivo"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "file",
									className: "sr-only",
									onChange: (event) => setDocumentFileName(event.target.files?.[0]?.name ?? "")
								})
							]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							onClick: addDocumento,
							children: [/* @__PURE__ */ jsx(Plus, {}), " Adjuntar documento"]
						})
					]
				}),
				/* @__PURE__ */ jsx(Tabla, {
					columnas: [
						{
							clave: "nombre",
							titulo: "Nombre"
						},
						{
							clave: "version",
							titulo: "Versión",
							render: (d) => /* @__PURE__ */ jsx("span", {
								className: "font-mono text-xs text-primary-dark",
								children: d.version
							})
						},
						{
							clave: "archivo",
							titulo: "Archivo"
						},
						{
							clave: "responsable",
							titulo: "Responsable"
						},
						{
							clave: "fecha",
							titulo: "Fecha"
						}
					],
					filas: documentos,
					claveFila: (d) => d.id,
					vacio: "Sin documentos adjuntos."
				})
			]
		})
	});
}
function HistorialModal({ solicitud, onClose }) {
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Historial de cambios",
		descripcion: solicitud.codigo,
		ancho: "lg",
		pie: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cerrar"
		}),
		children: /* @__PURE__ */ jsx(Tabla, {
			columnas: [
				{
					clave: "fecha",
					titulo: "Fecha",
					render: (c) => /* @__PURE__ */ jsx("span", {
						className: "whitespace-nowrap",
						children: c.fecha
					})
				},
				{
					clave: "usuario",
					titulo: "Usuario"
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (c) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: tonoEstado(c.estado),
						children: c.estado
					})
				},
				{
					clave: "detalle",
					titulo: "Detalle"
				}
			],
			filas: solicitud.historial,
			claveFila: (c) => c.id,
			vacio: "Sin cambios registrados."
		})
	});
}
function ReenviarCorreoModal({ solicitud, onClose, onSend }) {
	const [email, setEmail] = useState(solicitud.correosNotificacion.split(/[;,]/).map((item) => item.trim()).find(Boolean) ?? "");
	const [error, setError] = useState("");
	function submit(event) {
		event.preventDefault();
		const value = email.trim();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			setError("Ingrese un correo válido.");
			return;
		}
		onSend(value);
	}
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Reenviar correo",
		descripcion: solicitud.codigo,
		ancho: "md",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "submit",
			form: "form-reenviar-correo",
			children: [/* @__PURE__ */ jsx(Send, {}), " Reenviar correo"]
		})] }),
		children: /* @__PURE__ */ jsxs("form", {
			id: "form-reenviar-correo",
			onSubmit: submit,
			children: [
				/* @__PURE__ */ jsx(FormGrid, {
					columnas: 1,
					children: /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Correo destino",
						obligatorio: true,
						icono: Mail,
						error: error || void 0,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							autoFocus: true,
							type: "email",
							className: controlClase,
							value: email,
							onChange: (event) => {
								setEmail(event.target.value);
								setError("");
							},
							placeholder: "usuario@dominio.gob.pe"
						})
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 rounded-md border border-border bg-muted px-3 py-2 text-xs text-muted-foreground",
					children: "Se reenviará la solicitud de servicio y se registrará el envío en el historial."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4",
					children: /* @__PURE__ */ jsx(HistorialEnvios, {
						proyecto: "mtc",
						paso: "servicios"
					})
				})
			]
		})
	});
}
//#endregion
export { ServiciosPage as component };
