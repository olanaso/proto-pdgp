import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { r as proyectos, t as almacenArchivos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { At as useTiposDocumento, rt as useCatalogo, xt as leerTipos } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Check, Download, FileText, FolderArchive, LoaderCircle, Pencil, Plus, Save, Trash2, Upload } from "lucide-react";
import JSZip from "jszip";
//#region src/routes/gestion-documental.tsx?tsr-split=component
var CLAVE_HISTORIAL = "gestion-documental";
var BITACORA = {
	modulo: 24,
	entidad: "gestion_documental"
};
var ETIQUETAS = {
	code: "Código",
	denomination: "Denominación",
	description: "Descripción",
	projectIds: "Proyectos vinculados",
	system: "Plantilla del sistema",
	order: "Orden",
	fileName: "Archivo Word",
	fileSize: "Tamaño del archivo",
	fields: "Variables",
	name: "Variable",
	size: "Tamaño del campo",
	maxLength: "Longitud máxima",
	type: "Tipo de dato",
	tipoId: "Tipo de documento",
	subtipoId: "Subtipo de documento",
	updatedAt: "Actualización"
};
var plantillasWord = almacenArchivos("pdgp-plantillas-word", "files");
var VARIABLE_PATTERN = /^[A-Z][A-Z0-9_]*$/;
var textareaCls = `${controlClase} h-auto min-h-16 resize-y py-2`;
var CHECK = "size-4 rounded-sm accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";
var exampleFields = [
	"CODIGO_DE_PREDIO",
	"NOMBRE_DEL_PROYECTO",
	"NRO_DE_OFICIO",
	"NOMBRES_APELLIDOS",
	"DIRECCION_ELECTRONICA",
	"DOMICILIO",
	"DISTRITO"
];
function field(name, index) {
	return {
		id: `seed-field-${name}-${index}`,
		name,
		size: index < 2 ? "CORTO" : index < 5 ? "MEDIANO" : "LARGO",
		maxLength: index < 2 ? 50 : index < 5 ? 250 : 500,
		type: name.includes("FECHA") ? "date" : "text"
	};
}
var seedTemplates = [
	{
		id: "tpl-predio",
		projectIds: [],
		code: "HS34PC",
		system: true,
		denomination: "FICHA DE INFORMACIÓN DEL PREDIO",
		description: "Plantilla institucional para consolidar los datos generales del predio.",
		order: 8,
		fileName: "ficha-informacion-predio.docx",
		fileSize: 28462,
		fields: [
			"CODIGO_DE_PREDIO",
			"NOMBRE_DEL_PROYECTO",
			"AREA_AFECTADA"
		].map(field),
		updatedAt: "03/09/2026, 09:10"
	},
	{
		id: "tpl-oficio-cajamarca",
		projectIds: ["cajamarca"],
		code: "Y65FRD",
		system: true,
		denomination: "OFICIO CAJAMARCA",
		description: "Oficio institucional para comunicaciones del proyecto Cajamarca.",
		order: 3,
		fileName: "oficio-cajamarca.docx",
		fileSize: 36281,
		fields: exampleFields.map(field),
		updatedAt: "03/09/2026, 09:15"
	},
	{
		id: "tpl-intencion",
		projectIds: ["cajamarca"],
		code: "MPZ3TT",
		system: false,
		denomination: "OFICIO INTENCIÓN DE COMPRA",
		tipoId: "oficio",
		subtipoId: "of-intencion",
		description: "Comunicación de intención de adquisición al sujeto pasivo.",
		order: 4,
		fileName: "oficio-intencion-compra.docx",
		fileSize: 31440,
		fields: [
			"NRO_DE_OFICIO",
			"NOMBRES_APELLIDOS",
			"CODIGO_DE_PREDIO",
			"FECHA_DOCUMENTO"
		].map(field),
		updatedAt: "02/09/2026, 16:32"
	},
	{
		id: "tpl-prueba",
		projectIds: ["iquitos"],
		code: "B6H00Z",
		system: false,
		denomination: "ACTA DE INSPECCIÓN PREDIAL",
		description: "Acta para registrar visitas e inspecciones de campo.",
		order: 2,
		fileName: "acta-inspeccion-predial.docx",
		fileSize: 25876,
		fields: [
			"CODIGO_DE_PREDIO",
			"FECHA_INSPECCION",
			"NOMBRES_APELLIDOS",
			"OBSERVACIONES"
		].map(field),
		updatedAt: "01/09/2026, 12:20"
	},
	{
		id: "tpl-base-grafica",
		projectIds: ["pucallpa"],
		code: "7SA1DO",
		system: false,
		denomination: "OFICIO SOLICITUD DE BASE GRÁFICA",
		tipoId: "oficio",
		subtipoId: "of-base-grafica",
		description: "Solicitud de información gráfica para el análisis técnico registral.",
		order: 9,
		fileName: "solicitud-base-grafica.docx",
		fileSize: 33412,
		fields: [
			"NRO_DE_OFICIO",
			"NOMBRE_DEL_PROYECTO",
			"POLIGONO_AFECTADO"
		].map(field),
		updatedAt: "31/08/2026, 15:05"
	},
	{
		id: "tpl-independizacion",
		projectIds: ["iquitos"],
		code: "E64ZQY",
		system: false,
		denomination: "OFICIO DE INDEPENDIZACIÓN",
		description: "Documento para iniciar el procedimiento de independización registral.",
		order: 1,
		fileName: "oficio-independizacion.docx",
		fileSize: 41220,
		fields: [
			"NRO_DE_OFICIO",
			"PARTIDA_REGISTRAL",
			"OFICINA_REGISTRAL",
			"AREA_AFECTADA"
		].map(field),
		updatedAt: "30/08/2026, 10:42"
	},
	{
		id: "tpl-transferencia",
		projectIds: ["jauja"],
		code: "RS078B",
		system: false,
		denomination: "OFICIO DE INDEPENDIZACIÓN Y TRANSFERENCIA VÍA EXPROPIACIÓN",
		description: "Solicitud registral asociada al procedimiento de expropiación.",
		order: 1,
		fileName: "independizacion-transferencia.docx",
		fileSize: 46850,
		fields: [
			"CODIGO_DE_PREDIO",
			"PARTIDA_REGISTRAL",
			"TITULAR_REGISTRAL",
			"VALOR_TASACION"
		].map(field),
		updatedAt: "29/08/2026, 17:14"
	},
	{
		id: "tpl-informe-mejoras",
		projectIds: [],
		code: "6R8QNB",
		system: true,
		denomination: "INFORME TÉCNICO LEGAL: TRANSFERENCIA INTERESTATAL Y PAGO DE MEJORAS",
		description: "Informe técnico legal reutilizable en proyectos de infraestructura.",
		order: 11,
		fileName: "informe-tecnico-legal-mejoras.docx",
		fileSize: 58210,
		fields: [
			"CODIGO_DE_PREDIO",
			"NOMBRE_DEL_PROYECTO",
			"ENTIDAD_TITULAR",
			"DESCRIPCION_MEJORAS",
			"MONTO_TOTAL"
		].map(field),
		updatedAt: "28/08/2026, 09:34"
	},
	{
		id: "tpl-informe-regularizacion",
		projectIds: [],
		code: "R3GYP9",
		system: true,
		denomination: "INFORME TÉCNICO LEGAL: REGULARIZACIÓN DE PREDIOS DEL ESTADO",
		description: "Informe para predios ocupados por el Estado que requieren regularización.",
		order: 10,
		fileName: "informe-regularizacion-predios.docx",
		fileSize: 53118,
		fields: [
			"CODIGO_DE_PREDIO",
			"ENTIDAD_OCUPANTE",
			"ANTECEDENTE_REGISTRAL",
			"CONCLUSION"
		].map(field),
		updatedAt: "27/08/2026, 13:05"
	}
];
function newId(prefix) {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function generateCode() {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * 32)]).join("");
}
function createEmptyTemplate() {
	return {
		id: newId("tpl"),
		projectIds: [],
		code: generateCode(),
		system: false,
		denomination: "",
		description: "",
		order: 1,
		fileName: "",
		fileSize: 0,
		fields: [],
		updatedAt: ""
	};
}
function decodeXmlText(xml) {
	return xml.replace(/<w:tab\s*\/?>/g, "	").replace(/<\/w:p>/g, "\n").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}
async function extractVariables(file) {
	if (!file.name.toLowerCase().endsWith(".docx")) throw new Error("Solo se admiten plantillas Word en formato .docx.");
	const zip = await JSZip.loadAsync(await file.arrayBuffer());
	const contentFiles = Object.keys(zip.files).filter((name) => /^word\/(document|header\d+|footer\d+|footnotes|endnotes)\.xml$/.test(name));
	const matches = decodeXmlText((await Promise.all(contentFiles.map((name) => zip.file(name)?.async("text") ?? Promise.resolve("")))).join("\n")).match(/\$\{[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9_ -]+\}/g) ?? [];
	return Array.from(new Set(matches.map((match) => match.slice(2, -1).trim()).filter((name) => name.length > 0)));
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
async function createReferenceDocx(template) {
	const zip = new JSZip();
	zip.file("[Content_Types].xml", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\"><Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/><Default Extension=\"xml\" ContentType=\"application/xml\"/><Override PartName=\"/word/document.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml\"/></Types>");
	zip.folder("_rels")?.file(".rels", "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\"><Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"word/document.xml\"/></Relationships>");
	const paragraphs = [
		template.denomination,
		template.description,
		"",
		"Variables configuradas:",
		...template.fields.map((item) => `\${${item.name}}`)
	].map((line) => `<w:p><w:r><w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r></w:p>`).join("");
	zip.folder("word")?.file("document.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${paragraphs}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>`);
	return zip.generateAsync({
		type: "blob",
		mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	});
}
function formatFileSize(bytes) {
	if (!bytes) return "Sin archivo";
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function nombreTipoDocumento(tipoId, subtipoId) {
	const tipo = leerTipos().find((t) => t.id === tipoId);
	const sub = tipo?.subtipos.find((s) => s.id === subtipoId);
	return [tipo?.nombre ?? tipoId, sub?.nombre].filter(Boolean).join(" · ");
}
function projectName(projectId) {
	return proyectos.find((project) => project.id === projectId)?.nombre ?? projectId;
}
function normalizeVariable(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[\s-]+/g, "_").replace(/[^A-Z0-9_]/g, "");
}
function GestionDocumentalPage() {
	const catalogoExpediente = useCatalogo();
	const usosDe = (t) => catalogoExpediente.filter((c) => c.estado === "ACTIVO" && (c.plantillaId === t.id || !c.plantillaId && Boolean(t.tipoId) && c.tipos?.some((x) => x.tipoId === t.tipoId && (!t.subtipoId || x.subtipoId === t.subtipoId)))).map((c) => c.nombre);
	const templates = useHistorial(CLAVE_HISTORIAL)[0]?.registro ?? seedTemplates;
	const rol = useRol();
	const [draft, setDraft] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [removeExistingFile, setRemoveExistingFile] = useState(false);
	const [readingFile, setReadingFile] = useState(false);
	const [feedback, setFeedback] = useState(null);
	const [pageFeedback, setPageFeedback] = useState(null);
	const [deleteTarget, setDeleteTarget] = useState(null);
	const [downloadingId, setDownloadingId] = useState(null);
	useEffect(() => {
		if (!pageFeedback) return;
		const timer = window.setTimeout(() => setPageFeedback(null), 4200);
		return () => window.clearTimeout(timer);
	}, [pageFeedback]);
	const filas = useMemo(() => [...templates].sort((a, b) => a.order - b.order || a.denomination.localeCompare(b.denomination, "es")).map((template) => ({
		...template,
		proyectoId: template.projectIds[0] ?? "",
		sistemaTexto: template.system ? "Del sistema" : "Configurable",
		variablesTexto: template.fields.map((item) => item.name).join(" "),
		variables: template.fields.length
	})), [templates]);
	const cambiar = (despues, accion, objeto, motivo) => registrarCambio(CLAVE_HISTORIAL, {
		accion,
		objeto,
		motivo,
		antes: templates,
		despues
	}, BITACORA);
	const nombre = (t) => `${t.code} ${t.denomination}`;
	function openNewTemplate() {
		setDraft(createEmptyTemplate());
		setSelectedFile(null);
		setRemoveExistingFile(false);
		setFeedback(null);
	}
	function openEditTemplate(template) {
		setDraft({
			...template,
			projectIds: [...template.projectIds],
			fields: template.fields.map((item) => ({ ...item }))
		});
		setSelectedFile(null);
		setRemoveExistingFile(false);
		setFeedback(null);
	}
	function closeEditor() {
		setDraft(null);
		setSelectedFile(null);
		setRemoveExistingFile(false);
		setFeedback(null);
	}
	function updateDraft(key, value) {
		setDraft((current) => current ? {
			...current,
			[key]: value
		} : current);
	}
	function updateField(id, changes) {
		setDraft((current) => current ? {
			...current,
			fields: current.fields.map((item) => item.id === id ? {
				...item,
				...changes
			} : item)
		} : current);
	}
	async function handleFileSelection(file) {
		if (!file) return;
		setReadingFile(true);
		setFeedback(null);
		try {
			const names = await extractVariables(file);
			const existingByName = new Map(draft?.fields.map((item) => [item.name, item]));
			const detectedFields = names.map((name, index) => {
				return existingByName.get(name) ?? field(name, index);
			});
			setSelectedFile(file);
			setRemoveExistingFile(false);
			setDraft((current) => current ? {
				...current,
				fileName: file.name,
				fileSize: file.size,
				fields: detectedFields
			} : current);
			setFeedback({
				kind: "success",
				text: names.length > 0 ? `Se detectaron ${names.length} variables dentro del documento.` : "La plantilla fue cargada, pero no contiene variables con el formato ${NOMBRE_VARIABLE}."
			});
		} catch (error) {
			setSelectedFile(null);
			setFeedback({
				kind: "error",
				text: error instanceof Error ? error.message : "No se pudo leer la plantilla Word."
			});
		} finally {
			setReadingFile(false);
		}
	}
	function addManualField() {
		if (!draft) return;
		let index = draft.fields.length + 1;
		let name = `NUEVA_VARIABLE_${index}`;
		while (draft.fields.some((item) => item.name === name)) {
			index += 1;
			name = `NUEVA_VARIABLE_${index}`;
		}
		updateDraft("fields", [...draft.fields, field(name, index)]);
	}
	function validateDraft(template) {
		if (!template.code.trim()) return "Ingrese el código de la plantilla.";
		if (templates.some((item) => item.id !== template.id && item.code === template.code.trim())) return "El código ingresado ya corresponde a otra plantilla.";
		if (!template.denomination.trim()) return "Ingrese la denominación del documento.";
		if (!template.description.trim()) return "Ingrese la descripción del documento.";
		if (!Number.isFinite(template.order) || template.order < 1) return "Ingrese un orden mayor a cero.";
		if (!template.fileName) return "Seleccione una plantilla Word en formato .docx.";
		if (template.fields.some((item) => !VARIABLE_PATTERN.test(item.name))) return "Corrija las variables: deben estar en mayúsculas, sin tildes y separadas por guion bajo.";
		if (new Set(template.fields.map((item) => item.name)).size !== template.fields.length) return "No se permiten variables duplicadas.";
		return null;
	}
	async function saveTemplate(event) {
		event.preventDefault();
		if (!draft) return;
		const validationError = validateDraft(draft);
		if (validationError) {
			setFeedback({
				kind: "error",
				text: validationError
			});
			return;
		}
		try {
			if (selectedFile) await plantillasWord.guardar(draft.id, selectedFile);
			if (removeExistingFile) await plantillasWord.borrar(draft.id);
			const savedTemplate = {
				...draft,
				code: draft.code.trim().toUpperCase(),
				denomination: draft.denomination.trim().toUpperCase(),
				description: draft.description.trim(),
				updatedAt: new Intl.DateTimeFormat("es-PE", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit"
				}).format(/* @__PURE__ */ new Date())
			};
			if (templates.some((item) => item.id === savedTemplate.id)) cambiar(templates.map((item) => item.id === savedTemplate.id ? savedTemplate : item), "Modificó plantilla", nombre(savedTemplate));
			else cambiar([...templates, savedTemplate], "Creó plantilla", nombre(savedTemplate));
			closeEditor();
			setPageFeedback({
				kind: "success",
				text: `Plantilla ${savedTemplate.code} guardada.`
			});
		} catch {
			setFeedback({
				kind: "error",
				text: "No se pudo guardar el archivo en el navegador. Verifique el espacio disponible."
			});
		}
	}
	async function downloadTemplate(template) {
		setDownloadingId(template.id);
		try {
			const storedFile = await plantillasWord.leer(template.id);
			const blob = storedFile ?? await createReferenceDocx(template);
			descargarBlob(template.fileName || `${template.code}.docx`, blob);
			setPageFeedback({
				kind: "success",
				text: storedFile ? "Plantilla Word registrada descargada." : "Plantilla Word de referencia generada con las variables configuradas."
			});
		} catch {
			setPageFeedback({
				kind: "error",
				text: "No se pudo descargar la plantilla."
			});
		} finally {
			setDownloadingId(null);
		}
	}
	async function confirmDelete(motivo) {
		if (!deleteTarget) return;
		try {
			await plantillasWord.borrar(deleteTarget.id);
		} catch {}
		cambiar(templates.filter((item) => item.id !== deleteTarget.id), "Eliminó plantilla", nombre(deleteTarget), motivo);
		setPageFeedback({
			kind: "success",
			text: `Plantilla ${deleteTarget.code} eliminada.`
		});
		setDeleteTarget(null);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		pageFeedback && /* @__PURE__ */ jsx(FeedbackMessage, {
			feedback: pageFeedback,
			className: "mb-4"
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Configuración de plantillas Word",
			icono: FolderArchive,
			descripcion: "Documentos y variables utilizados por los módulos de la plataforma.",
			migas: [{ texto: "Gestión documental" }, { texto: "Plantillas y repositorio" }],
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: openNewTemplate,
				children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar plantilla"]
			}),
			demo: true,
			columnas: [
				{
					clave: "code",
					titulo: "Código",
					ancho: "110px",
					render: (t) => /* @__PURE__ */ jsx("span", {
						className: "font-mono text-xs font-semibold",
						children: t.code
					})
				},
				{
					clave: "proyectoId",
					titulo: "Proyecto vinculado",
					render: (t) => t.projectIds.length ? /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap gap-1",
						children: t.projectIds.map((projectId) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: projectName(projectId)
						}, projectId))
					}) : /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "Sin vínculo específico"
					})
				},
				{
					clave: "order",
					titulo: "Orden",
					ancho: "80px",
					alinear: "centro"
				},
				{
					clave: "denomination",
					titulo: "Denominación y descripción",
					render: (t) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-medium",
							children: t.denomination
						}),
						t.tipoId && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: nombreTipoDocumento(t.tipoId, t.subtipoId)
						}),
						usosDe(t).length > 0 && /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							title: usosDe(t).join("\n"),
							children: [
								"Genera en el expediente: ",
								usosDe(t).length,
								" documento(s)"
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "line-clamp-1 max-w-[430px] text-xs text-muted-foreground",
							children: t.description
						})
					] })
				},
				{
					clave: "sistemaTexto",
					titulo: "Sistema",
					alinear: "centro",
					render: (t) => t.system ? /* @__PURE__ */ jsx(StatusBadge, {
						tono: "success",
						children: "Sí"
					}) : /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "No"
					})
				},
				{
					clave: "variables",
					titulo: "Variables",
					alinear: "centro",
					render: (t) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: "primary",
						children: t.variables
					})
				},
				{
					clave: "fileName",
					titulo: "Archivo Word",
					render: (t) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
						className: "max-w-[165px] truncate text-xs font-medium",
						title: t.fileName,
						children: t.fileName || "Sin archivo"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: formatFileSize(t.fileSize)
					})] })
				},
				{
					clave: "updatedAt",
					titulo: "Actualización",
					render: (t) => /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: t.updatedAt
					})
				}
			],
			filas,
			claveFila: (t) => t.id,
			filtros: [{
				clave: "proyectoId",
				etiqueta: "Proyecto",
				opciones: proyectos.map((project) => ({
					valor: project.id,
					texto: project.nombre
				}))
			}, {
				clave: "sistemaTexto",
				etiqueta: "Tipo",
				opciones: ["Del sistema", "Configurable"].map((v) => ({
					valor: v,
					texto: v
				}))
			}],
			buscarEn: [
				"code",
				"denomination",
				"description",
				"variablesTexto"
			],
			accionesFila: [
				{
					nombre: "Descargar plantilla",
					icono: Download,
					onClick: (t) => void downloadTemplate(t)
				},
				{
					nombre: "Editar plantilla",
					icono: Pencil,
					onClick: openEditTemplate
				},
				{
					nombre: "Eliminar plantilla",
					icono: Trash2,
					destructiva: true,
					onClick: (t) => setDeleteTarget(t)
				}
			],
			onFilaClick: openEditTemplate,
			vacio: "No hay plantillas registradas. Agregue un nuevo documento.",
			historial: {
				registro: CLAVE_HISTORIAL,
				etiquetas: ETIQUETAS,
				etiquetaFila: (t) => t.code,
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: (registro, n) => cambiar(registro, "Restauró una versión anterior", `versión ${n}`)
			}
		}),
		/* @__PURE__ */ jsxs("p", {
			className: "mt-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: ["En este prototipo, la configuración y los archivos Word se guardan en el navegador. Para un entorno multiusuario, deben persistirse mediante el servicio documental institucional.", downloadingId && " Preparando descarga..."]
		}),
		draft && /* @__PURE__ */ jsx(TemplateEditor, {
			draft,
			feedback,
			readingFile,
			selectedFile,
			onClose: closeEditor,
			onSubmit: saveTemplate,
			onUpdate: updateDraft,
			onFileSelected: (file) => void handleFileSelection(file),
			onRemoveFile: () => {
				setSelectedFile(null);
				setRemoveExistingFile(true);
				setDraft((current) => current ? {
					...current,
					fileName: "",
					fileSize: 0,
					fields: []
				} : current);
			},
			onAddField: addManualField,
			onUpdateField: updateField,
			onDeleteField: (id) => updateDraft("fields", draft.fields.filter((item) => item.id !== id))
		}),
		deleteTarget && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: "Eliminar plantilla Word",
			descripcion: `Se eliminará ${deleteTarget.denomination}, su configuración y el archivo cargado en este navegador. El histórico conserva la configuración y el motivo.`,
			accion: "Eliminar plantilla",
			onCerrar: () => setDeleteTarget(null),
			onConfirmar: (motivo) => void confirmDelete(motivo)
		})
	] });
}
function TemplateEditor({ draft, feedback, readingFile, selectedFile, onClose, onSubmit, onUpdate, onFileSelected, onRemoveFile, onAddField, onUpdateField, onDeleteField }) {
	const fileInputRef = useRef(null);
	const tiposDocumento = useTiposDocumento().filter((t) => t.estado === "ACTIVO" || t.id === draft.tipoId);
	const tipoElegido = tiposDocumento.find((t) => t.id === draft.tipoId);
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: draft.updatedAt ? "Editar plantilla Word" : "Agregar plantilla Word",
		descripcion: "Gestión documental · Los campos marcados con * son obligatorios.",
		ancho: "xl",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "submit",
			form: "form-plantilla-word",
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar plantilla"]
		})] }),
		children: /* @__PURE__ */ jsxs("form", {
			id: "form-plantilla-word",
			onSubmit,
			children: [
				feedback && /* @__PURE__ */ jsx(FeedbackMessage, {
					feedback,
					className: "mb-3"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-3 rounded-md border border-primary-soft bg-primary-soft/50 px-4 py-3 text-xs leading-5 text-foreground",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-semibold text-primary-dark",
							children: "Importante para preparar el documento Word"
						}),
						/* @__PURE__ */ jsxs("p", { children: [
							"Escriba las variables en mayúsculas, sin tildes y separadas por guion bajo. Deben ir entre signo de dólar y llaves; por ejemplo:",
							" ",
							/* @__PURE__ */ jsx("code", {
								className: "rounded-sm bg-card px-1 py-0.5 text-xs",
								children: "${CODIGO_DE_PREDIO}"
							}),
							",",
							" ",
							/* @__PURE__ */ jsx("code", {
								className: "rounded-sm bg-card px-1 py-0.5 text-xs",
								children: "${NOMBRE_DEL_PROYECTO}"
							}),
							"."
						] }),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-1",
							children: [
								"El número asignado por Numeración entra en la variable",
								" ",
								/* @__PURE__ */ jsx("code", {
									className: "rounded-sm bg-card px-1 py-0.5 text-xs",
									children: "${NUMERO_DOCUMENTO}"
								}),
								" ",
								"(las plantillas antiguas con",
								" ",
								/* @__PURE__ */ jsx("code", {
									className: "rounded-sm bg-card px-1 py-0.5 text-xs",
									children: "${NRO_DE_OFICIO}"
								}),
								" la reciben igual)."
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-1",
							children: [
								"Ejemplo: El código del predio es ",
								/* @__PURE__ */ jsx("strong", { children: "${CODIGO_DE_PREDIO}" }),
								" y el proyecto es ",
								/* @__PURE__ */ jsx("strong", { children: "${NOMBRE_DEL_PROYECTO}" }),
								"."
							]
						})
					]
				}),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Datos del documento" }),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Código",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: draft.code,
							onChange: (event) => onUpdate("code", event.target.value.toUpperCase()),
							maxLength: 12,
							className: `${controlClase} font-mono uppercase`
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Orden",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "number",
							min: 1,
							value: draft.order,
							onChange: (event) => onUpdate("order", Number(event.target.value)),
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Plantilla del sistema",
						children: /* @__PURE__ */ jsxs("label", {
							className: "inline-flex h-9 items-center gap-2 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: draft.system,
								onChange: (event) => onUpdate("system", event.target.checked),
								className: CHECK
							}), "Disponible como documento institucional"]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Proyecto vinculado",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							value: draft.projectIds[0] ?? "",
							onChange: (event) => onUpdate("projectIds", event.target.value ? [event.target.value] : []),
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Sin vínculo específico"
							}), proyectos.map((project) => /* @__PURE__ */ jsx("option", {
								value: project.id,
								children: project.nombre
							}, project.id))]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Tipo de documento",
						ayuda: "Del catálogo de Seguridad y configuración. Define la regla que numera el documento.",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							value: draft.tipoId ?? "",
							onChange: (event) => {
								onUpdate("tipoId", event.target.value || void 0);
								onUpdate("subtipoId", void 0);
							},
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Sin tipo (no se numera)"
							}), tiposDocumento.map((t) => /* @__PURE__ */ jsx("option", {
								value: t.id,
								children: t.nombre
							}, t.id))]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Subtipo de documento",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							value: draft.subtipoId ?? "",
							disabled: !tipoElegido,
							onChange: (event) => onUpdate("subtipoId", event.target.value || void 0),
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Sin subtipo"
							}), tipoElegido?.subtipos.filter((s) => s.estado === "ACTIVO" || s.id === draft.subtipoId).map((s) => /* @__PURE__ */ jsx("option", {
								value: s.id,
								children: s.nombre
							}, s.id))]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Denominación",
						obligatorio: true,
						ancho: "doble",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: draft.denomination,
							onChange: (event) => onUpdate("denomination", event.target.value),
							className: controlClase,
							placeholder: "Ej.: OFICIO DE INTENCIÓN DE COMPRA"
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Descripción",
						obligatorio: true,
						ancho: "doble",
						children: (id) => /* @__PURE__ */ jsx("textarea", {
							id,
							value: draft.description,
							onChange: (event) => onUpdate("description", event.target.value),
							className: textareaCls,
							placeholder: "Indique el uso y alcance de la plantilla"
						})
					})
				] }),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Archivo de plantilla" }),
				/* @__PURE__ */ jsx(FormGrid, {
					columnas: 1,
					children: /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Plantilla Word (.docx)",
						obligatorio: true,
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
							ref: fileInputRef,
							type: "file",
							accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
							className: "sr-only",
							tabIndex: -1,
							onChange: (event) => {
								onFileSelected(event.target.files?.[0]);
								event.target.value = "";
							}
						}), !draft.fileName ? /* @__PURE__ */ jsxs("button", {
							type: "button",
							disabled: readingFile,
							onClick: () => fileInputRef.current?.click(),
							className: "flex min-h-20 w-full items-center justify-center gap-3 rounded-md border border-dashed border-primary bg-primary-soft/40 px-4 text-left hover:bg-primary-soft disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
							children: [readingFile ? /* @__PURE__ */ jsx(LoaderCircle, {
								size: 20,
								className: "animate-spin text-primary",
								"aria-hidden": true
							}) : /* @__PURE__ */ jsx(Upload, {
								size: 20,
								className: "text-primary",
								"aria-hidden": true
							}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("strong", {
								className: "block text-sm text-foreground",
								children: readingFile ? "Analizando variables..." : "Seleccionar documento Word"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "Formato .docx · máximo recomendado 10 MB"
							})] })]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-muted px-3 py-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 items-center gap-2",
								children: [/* @__PURE__ */ jsx(FileText, {
									size: 20,
									className: "shrink-0 text-primary-dark",
									"aria-hidden": true
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("p", {
										className: "truncate text-sm font-medium",
										children: draft.fileName
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-xs text-muted-foreground",
										children: [
											formatFileSize(draft.fileSize),
											" · ",
											draft.fields.length,
											" variables detectadas",
											selectedFile ? " · archivo nuevo" : ""
										]
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => fileInputRef.current?.click(),
									children: [/* @__PURE__ */ jsx(Upload, {}), " Reemplazar archivo"]
								}), /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "text-destructive",
									onClick: onRemoveFile,
									children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar archivo"]
								})]
							})]
						})] })
					})
				}),
				/* @__PURE__ */ jsx(Subtitulo, {
					acciones: /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: onAddField,
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar variable"]
					}),
					children: "Variables del documento"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-2 text-xs text-muted-foreground",
					children: "Se detectan automáticamente al cargar el archivo y también pueden ajustarse aquí."
				}),
				/* @__PURE__ */ jsx(Tabla, {
					columnas: [
						{
							clave: "n",
							titulo: "#",
							ancho: "48px",
							render: (item) => /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: draft.fields.indexOf(item) + 1
							})
						},
						{
							clave: "name",
							titulo: "Nombre del campo",
							render: (item) => {
								const invalid = !VARIABLE_PATTERN.test(item.name);
								return /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground",
											"aria-hidden": true,
											children: "${"
										}),
										/* @__PURE__ */ jsx("input", {
											value: item.name,
											onChange: (event) => onUpdateField(item.id, { name: normalizeVariable(event.target.value) }),
											className: `${controlClase} pl-6 pr-5 font-mono text-xs ${invalid ? "border-destructive bg-destructive-soft" : ""}`,
											"aria-invalid": invalid,
											"aria-label": `Nombre de la variable ${item.name}`
										}),
										/* @__PURE__ */ jsx("span", {
											className: "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground",
											"aria-hidden": true,
											children: "}"
										})
									]
								});
							}
						},
						{
							clave: "size",
							titulo: "Tamaño",
							ancho: "140px",
							render: (item) => /* @__PURE__ */ jsxs("select", {
								value: item.size,
								onChange: (event) => onUpdateField(item.id, { size: event.target.value }),
								className: controlClase,
								"aria-label": `Tamaño de ${item.name}`,
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "CORTO",
										children: "Corto"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "MEDIANO",
										children: "Mediano"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "LARGO",
										children: "Largo"
									})
								]
							})
						},
						{
							clave: "maxLength",
							titulo: "Nro. caracteres",
							ancho: "120px",
							render: (item) => /* @__PURE__ */ jsx("input", {
								type: "number",
								min: 1,
								max: 1e4,
								value: item.maxLength,
								onChange: (event) => onUpdateField(item.id, { maxLength: Number(event.target.value) }),
								className: controlClase,
								"aria-label": `Caracteres de ${item.name}`
							})
						},
						{
							clave: "type",
							titulo: "Tipo",
							ancho: "140px",
							render: (item) => /* @__PURE__ */ jsxs("select", {
								value: item.type,
								onChange: (event) => onUpdateField(item.id, { type: event.target.value }),
								className: controlClase,
								"aria-label": `Tipo de ${item.name}`,
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "text",
										children: "Texto"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "number",
										children: "Número"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "date",
										children: "Fecha"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "currency",
										children: "Moneda"
									})
								]
							})
						},
						{
							clave: "accion",
							titulo: "Acción",
							ancho: "64px",
							alinear: "derecha",
							render: (item) => /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": `Eliminar variable ${item.name}`,
								title: "Eliminar variable",
								onClick: () => onDeleteField(item.id),
								className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
								children: /* @__PURE__ */ jsx(Trash2, {
									size: 16,
									"aria-hidden": true
								})
							})
						}
					],
					filas: draft.fields,
					claveFila: (item) => item.id,
					vacio: "Cargue una plantilla Word para detectar variables o agréguelas manualmente."
				})
			]
		})
	});
}
function FeedbackMessage({ feedback, className = "" }) {
	return /* @__PURE__ */ jsxs("p", {
		role: feedback.kind === "success" ? "status" : "alert",
		className: `flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${feedback.kind === "success" ? "border-success bg-success-soft text-success" : "border-destructive bg-destructive-soft text-destructive"} ${className}`,
		children: [feedback.kind === "success" ? /* @__PURE__ */ jsx(Check, {
			size: 16,
			"aria-hidden": true
		}) : /* @__PURE__ */ jsx(AlertCircle, {
			size: 16,
			"aria-hidden": true
		}), feedback.text]
	});
}
/** Eliminar o anular exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoModal({ titulo, descripcion, accion, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo,
		descripcion,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "destructive",
			disabled: motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: accion
		})] }),
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-cambio",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-cambio",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
//#endregion
export { GestionDocumentalPage as component };
