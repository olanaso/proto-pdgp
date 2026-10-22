import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { y as importarPadron } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.padron-preliminar-Do2bRrO5.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2, Download, Eye, FileSpreadsheet, History, RotateCcw, Save, Upload, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.padron-preliminar.tsx?tsr-split=component
var TEMPLATE_COLUMNS = [
	"codigo_padron",
	"condicion_predio",
	"sujeto_pasivo",
	"tipo_persona_juridica",
	"condicion_sujeto",
	"tipo_predio",
	"area_m2",
	"latitud",
	"longitud",
	"ubicacion",
	"observaciones"
];
var ETIQUETAS = {
	fecha: "Fecha",
	usuario: "Usuario",
	archivo: "Archivo",
	total: "Filas",
	correctos: "Correctas",
	fallidos: "Observadas",
	estado: "Estado"
};
var aVersion = (lista) => lista.map((i) => ({
	...i,
	nombre: `${i.archivo} (${i.fecha})`
}));
var INITIAL_HISTORY = [{
	id: "hist-001",
	fecha: "03/07/2026 09:35",
	usuario: "Marcos Armando Soto Luis",
	archivo: "padron_preliminar_jauja_v1.xls",
	total: 18,
	correctos: 18,
	fallidos: 0,
	estado: "Importado"
}, {
	id: "hist-002",
	fecha: "02/07/2026 16:10",
	usuario: "Coordinación Predial",
	archivo: "padron_preliminar_observado.xls",
	total: 24,
	correctos: 20,
	fallidos: 4,
	estado: "Con errores"
}];
var SAMPLE_ROWS = [
	createValidatedRow({
		codigo_padron: "PAD-AERO-JAUJA-0001",
		condicion_predio: "PRIVADO",
		sujeto_pasivo: "BRYAN CESAR CATANO SARRO",
		tipo_persona_juridica: "NATURAL",
		condicion_sujeto: "POSEEDOR",
		tipo_predio: "RURAL",
		area_m2: "1250.45",
		latitud: "-11.78215",
		longitud: "-75.47852",
		ubicacion: "Jauja",
		observaciones: ""
	}, 2),
	createValidatedRow({
		codigo_padron: "",
		condicion_predio: "ESTATAL",
		sujeto_pasivo: "MUNICIPALIDAD PROVINCIAL DE JAUJA",
		tipo_persona_juridica: "JURIDICA",
		condicion_sujeto: "PROPIETARIO",
		tipo_predio: "URBANO",
		area_m2: "840.00",
		latitud: "-11.78170",
		longitud: "-75.47796",
		ubicacion: "Sector aeropuerto",
		observaciones: "Generar codigo de padron"
	}, 3),
	createValidatedRow({
		codigo_padron: "",
		condicion_predio: "",
		sujeto_pasivo: "",
		tipo_persona_juridica: "NATURAL",
		condicion_sujeto: "POSEEDOR",
		tipo_predio: "RURAL",
		area_m2: "abc",
		latitud: "",
		longitud: "",
		ubicacion: "Jauja",
		observaciones: ""
	}, 4)
];
function PadronPreliminarPage() {
	const { projectId } = Route$1.useParams();
	const rol = useRol();
	const [activeTab, setActiveTab] = useState("importacion");
	const [step, setStep] = useState("plantilla");
	const [archivo, setArchivo] = useState(null);
	const [rows, setRows] = useState([]);
	const [history, setHistory] = useState(INITIAL_HISTORY);
	const [message, setMessage] = useState("");
	const historial = useFormularioConHistorial(`padron-preliminar-${projectId}`, aVersion(history), (lista) => setHistory(lista.map(({ nombre: _nombre, ...i }) => i)), {
		modulo: 11,
		entidad: "importacion_padron"
	});
	const stats = useMemo(() => {
		const correctos = rows.filter((row) => row.estado === "ok").length;
		const fallidos = rows.filter((row) => row.estado === "error").length;
		return {
			total: rows.length,
			correctos,
			fallidos
		};
	}, [rows]);
	async function handleFile(file) {
		setArchivo(file);
		setMessage("");
		if (!file) {
			setRows([]);
			setStep("plantilla");
			return;
		}
		const parsed = parseUploadedPadron(await file.text());
		const nextRows = parsed.length ? parsed : SAMPLE_ROWS;
		setRows(nextRows);
		setStep("validacion");
		setMessage(parsed.length ? "" : "No se pudieron leer filas del archivo; se muestra una vista de validación referencial con observaciones.");
	}
	const [resultado, setResultado] = useState(null);
	function handleImport() {
		if (!rows.length) return;
		const id = `hist-${Date.now()}`;
		const r = importarPadron(projectId, rows.filter((row) => row.estado === "ok").map((row) => ({
			codigoPadron: row.codigo_padron.trim().toUpperCase(),
			origen: "PADRON",
			condicionPredio: row.condicion_predio.trim().toUpperCase(),
			tipoPredio: row.tipo_predio.trim().toUpperCase(),
			sujetoPasivo: row.sujeto_pasivo.trim().toUpperCase(),
			tipoPersona: row.tipo_persona_juridica.trim().toUpperCase(),
			condicionSujeto: row.condicion_sujeto.trim().toUpperCase(),
			areaM2: row.area_m2.replace(",", "."),
			lat: row.latitud.replace(",", "."),
			lon: row.longitud.replace(",", "."),
			ubicacion: row.ubicacion.trim(),
			observaciones: row.observaciones.trim()
		})), id);
		setResultado(r);
		const item = {
			id,
			fecha: (/* @__PURE__ */ new Date()).toLocaleString("es-PE", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			}),
			usuario: "Usuario solicitante",
			archivo: archivo?.name ?? "padron_preliminar.xls",
			total: stats.total,
			correctos: stats.correctos,
			fallidos: stats.fallidos,
			estado: stats.fallidos ? "Con errores" : "Importado"
		};
		const siguiente = [item, ...history];
		setHistory(siguiente);
		historial.guardarVersion("Importó padrón preliminar", `${item.archivo}: ${item.correctos} correctas, ${item.fallidos} observadas`, void 0, aVersion(siguiente));
		setStep("resultado");
		setMessage(`Importación registrada: ${r.creados} predio(s) nuevo(s) y ${r.actualizados} actualizado(s) en el listado del proyecto.${stats.fallidos ? ` ${stats.fallidos} fila(s) quedaron observadas: corríjalas y vuelva a subir el archivo.` : ""}`);
	}
	function resetImport() {
		setArchivo(null);
		setRows([]);
		setMessage("");
		setStep("plantilla");
	}
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [/* @__PURE__ */ jsx(ProyectoEncabezado, {
			projectId,
			titulo: "Padrón preliminar",
			icono: FileSpreadsheet,
			descripcion: "Importación y validación del padrón preliminar de predios desde Excel o CSV.",
			acciones: /* @__PURE__ */ jsx(StatusBadge, {
				tono: step === "resultado" ? "success" : "neutral",
				children: step === "resultado" ? "Importación registrada" : "Borrador"
			})
		}), /* @__PURE__ */ jsxs(Tabs, {
			value: activeTab,
			onValueChange: (v) => setActiveTab(v),
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "importacion",
							children: [/* @__PURE__ */ jsx(Upload, {
								size: 16,
								className: "mr-1",
								"aria-hidden": true
							}), " Importación"]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "historial",
							children: [
								/* @__PURE__ */ jsx(FileSpreadsheet, {
									size: 16,
									className: "mr-1",
									"aria-hidden": true
								}),
								" Importaciones (",
								history.length,
								")"
							]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "historico",
							children: [
								/* @__PURE__ */ jsx(History, {
									size: 16,
									className: "mr-1",
									"aria-hidden": true
								}),
								" Histórico (",
								historial.versiones.length,
								")"
							]
						})
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "importacion",
					children: /* @__PURE__ */ jsxs("form", {
						className: "space-y-4",
						onSubmit: (event) => {
							event.preventDefault();
							handleImport();
						},
						children: [
							/* @__PURE__ */ jsx(Section, {
								titulo: "Documentos que genera este paso",
								acciones: /* @__PURE__ */ jsxs(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: downloadPadronTemplate,
									children: [/* @__PURE__ */ jsx(Download, {}), " Descargar plantilla Excel"]
								}),
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Formato",
									obligatorio: true,
									children: (id) => /* @__PURE__ */ jsx("select", {
										id,
										className: controlClase,
										defaultValue: "padron_preliminar",
										children: /* @__PURE__ */ jsx("option", {
											value: "padron_preliminar",
											children: "Padrón preliminar de predios"
										})
									})
								}), /* @__PURE__ */ jsx(FormField, {
									etiqueta: "Columnas requeridas",
									ancho: "doble",
									children: /* @__PURE__ */ jsx("p", {
										className: "rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground",
										children: TEMPLATE_COLUMNS.join(", ")
									})
								})] })
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "1. Subir archivo completado",
								children: [/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Archivo Excel o CSV",
									obligatorio: true,
									children: /* @__PURE__ */ jsxs("label", {
										className: "inline-flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 text-sm hover:bg-primary-soft focus-within:ring-2 focus-within:ring-primary",
										children: [
											/* @__PURE__ */ jsx(Upload, {
												size: 16,
												className: "shrink-0 text-primary",
												"aria-hidden": true
											}),
											/* @__PURE__ */ jsx("span", {
												className: "truncate",
												children: archivo ? archivo.name : "Seleccionar archivo"
											}),
											/* @__PURE__ */ jsx("input", {
												type: "file",
												accept: ".xls,.xlsx,.csv,.txt",
												className: "sr-only",
												onChange: (event) => void handleFile(event.target.files?.[0] ?? null)
											})
										]
									})
								}), /* @__PURE__ */ jsx(FormField, {
									etiqueta: "Estado de lectura",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: `${controlClase} bg-muted`,
										value: rows.length ? `${rows.length} filas evaluadas` : "Pendiente",
										readOnly: true
									})
								})] }), message && step !== "resultado" && /* @__PURE__ */ jsxs("p", {
									role: "status",
									className: "mt-4 flex items-start gap-2 rounded-md border border-warning bg-warning-soft px-3 py-2 text-sm text-warning",
									children: [/* @__PURE__ */ jsx(AlertTriangle, {
										size: 16,
										className: "mt-0.5 shrink-0",
										"aria-hidden": true
									}), /* @__PURE__ */ jsx("span", { children: message })]
								})]
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "2. Validación del padrón importado",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "mb-3 grid grid-cols-2 gap-3 md:grid-cols-4",
										children: [
											/* @__PURE__ */ jsx(Cifra, {
												etiqueta: "Filas importadas",
												valor: stats.total
											}),
											/* @__PURE__ */ jsx(Cifra, {
												etiqueta: "Correctas",
												valor: stats.correctos,
												tono: "success"
											}),
											/* @__PURE__ */ jsx(Cifra, {
												etiqueta: "Observadas",
												valor: stats.fallidos,
												tono: "destructive"
											}),
											/* @__PURE__ */ jsx(Cifra, {
												etiqueta: "Habilitadas",
												valor: stats.correctos,
												tono: "success"
											})
										]
									}),
									/* @__PURE__ */ jsx(Tabla, {
										columnas: [
											{
												clave: "fila",
												titulo: "Fila",
												ancho: "60px",
												render: (r) => /* @__PURE__ */ jsx("span", {
													className: "tabular-nums text-muted-foreground",
													children: r.fila
												})
											},
											{
												clave: "codigo_padron",
												titulo: "Código padrón",
												render: (r) => /* @__PURE__ */ jsx("span", {
													className: "font-medium",
													children: r.codigo_padron || generatedPadronCode(r.fila)
												})
											},
											{
												clave: "condicion_predio",
												titulo: "Condición predio"
											},
											{
												clave: "sujeto_pasivo",
												titulo: "Sujeto pasivo"
											},
											{
												clave: "tipo_persona_juridica",
												titulo: "Tipo persona"
											},
											{
												clave: "condicion_sujeto",
												titulo: "Condición sujeto"
											},
											{
												clave: "tipo_predio",
												titulo: "Tipo predio"
											},
											{
												clave: "area_m2",
												titulo: "Área m²",
												alinear: "derecha",
												render: (r) => /* @__PURE__ */ jsx("span", {
													className: "tabular-nums",
													children: r.area_m2
												})
											},
											{
												clave: "latitud",
												titulo: "Latitud",
												render: (r) => /* @__PURE__ */ jsx("span", {
													className: "tabular-nums",
													children: r.latitud
												})
											},
											{
												clave: "longitud",
												titulo: "Longitud",
												render: (r) => /* @__PURE__ */ jsx("span", {
													className: "tabular-nums",
													children: r.longitud
												})
											},
											{
												clave: "observacionValidacion",
												titulo: "Observaciones",
												render: (r) => /* @__PURE__ */ jsx("span", {
													className: r.estado === "ok" ? "text-success" : "text-destructive",
													children: r.observacionValidacion
												})
											}
										],
										filas: rows,
										claveFila: (r) => r.id,
										vacio: "Descargue la plantilla, complétela y suba el archivo para ver la validación."
									}),
									step === "resultado" && message && /* @__PURE__ */ jsxs("p", {
										role: "status",
										className: "mt-4 flex items-start gap-2 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
										children: [
											/* @__PURE__ */ jsx(CheckCircle2, {
												size: 16,
												className: "mt-0.5 shrink-0",
												"aria-hidden": true
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "flex-1",
												children: [message, resultado && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx(Link, {
													to: "/proyectos/$projectId/predios",
													params: { projectId },
													search: { origen: "PADRON" },
													className: "font-semibold underline-offset-2 hover:underline",
													children: "Ver los predios del padrón"
												})] })]
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => setMessage(""),
												"aria-label": "Cerrar aviso",
												className: "rounded-sm hover:opacity-70",
												children: /* @__PURE__ */ jsx(X, { size: 16 })
											})
										]
									})
								]
							}),
							/* @__PURE__ */ jsxs(FormActions, { children: [
								/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: resetImport,
									children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Limpiar carga"]
								}),
								/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setActiveTab("historial"),
									children: [/* @__PURE__ */ jsx(Eye, {}), " Ver importaciones"]
								}),
								/* @__PURE__ */ jsxs(Button, {
									type: "submit",
									disabled: !rows.length || !stats.correctos,
									children: [/* @__PURE__ */ jsx(Save, {}), " Importar padrón"]
								})
							] })
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historial",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Historial de importaciones",
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 rounded-md bg-warning-soft px-3 py-1.5 text-xs text-warning",
							children: "Datos de demostración: el historial no está conectado a un servicio."
						}), /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "fecha",
									titulo: "Fecha",
									render: (i) => /* @__PURE__ */ jsx("span", {
										className: "tabular-nums",
										children: i.fecha
									})
								},
								{
									clave: "usuario",
									titulo: "Usuario"
								},
								{
									clave: "archivo",
									titulo: "Archivo",
									render: (i) => /* @__PURE__ */ jsx("span", {
										className: "text-xs",
										children: i.archivo
									})
								},
								{
									clave: "total",
									titulo: "Total",
									alinear: "derecha",
									render: (i) => /* @__PURE__ */ jsx("span", {
										className: "font-semibold tabular-nums",
										children: i.total
									})
								},
								{
									clave: "correctos",
									titulo: "Correctos",
									alinear: "derecha",
									render: (i) => /* @__PURE__ */ jsx("span", {
										className: "font-semibold tabular-nums text-success",
										children: i.correctos
									})
								},
								{
									clave: "fallidos",
									titulo: "Fallidos",
									alinear: "derecha",
									render: (i) => /* @__PURE__ */ jsx("span", {
										className: "font-semibold tabular-nums text-destructive",
										children: i.fallidos
									})
								},
								{
									clave: "estado",
									titulo: "Estado",
									render: (i) => /* @__PURE__ */ jsx(StatusBadge, {
										tono: i.estado === "Importado" ? "success" : "warning",
										children: i.estado
									})
								}
							],
							filas: history,
							claveFila: (i) => i.id,
							vacio: "Sin importaciones registradas."
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico del padrón preliminar",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `padron-preliminar-${projectId}`,
							etiquetas: ETIQUETAS,
							nombreArchivo: `historico-padron-preliminar-${projectId}`,
							puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
							onRestaurar: historial.restaurar
						})
					})
				})
			]
		})]
	});
}
function Cifra({ etiqueta, valor, tono }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border bg-background px-3 py-2",
		children: [/* @__PURE__ */ jsx("p", {
			className: `text-lg font-semibold tabular-nums ${tono === "success" ? "text-success" : tono === "destructive" ? "text-destructive" : "text-foreground"}`,
			children: valor
		}), /* @__PURE__ */ jsx("p", {
			className: "text-xs text-muted-foreground",
			children: etiqueta
		})]
	});
}
function createValidatedRow(input, index) {
	const observations = validateRow(input);
	return {
		...input,
		id: `${index}-${input.codigo_padron || input.sujeto_pasivo || "fila"}`,
		fila: index,
		estado: observations.length ? "error" : "ok",
		observacionValidacion: observations.length ? observations.join("; ") : "Correcto para importar"
	};
}
function validateRow(row) {
	const observations = [];
	[
		"condicion_predio",
		"sujeto_pasivo",
		"tipo_persona_juridica",
		"condicion_sujeto",
		"tipo_predio",
		"area_m2"
	].forEach((key) => {
		if (!row[key]?.trim()) observations.push(`${key} requerido`);
	});
	const area = Number(row.area_m2?.replace(",", "."));
	if (row.area_m2 && (!Number.isFinite(area) || area <= 0)) observations.push("area_m2 inválida");
	if (row.latitud && !Number.isFinite(Number(row.latitud.replace(",", ".")))) observations.push("latitud inválida");
	if (row.longitud && !Number.isFinite(Number(row.longitud.replace(",", ".")))) observations.push("longitud inválida");
	return observations;
}
function parseUploadedPadron(text) {
	const htmlRows = parseHtmlTable(text);
	if (htmlRows.length) return rowsFromMatrix(htmlRows);
	const delimiter = text.includes("	") ? "	" : text.includes(";") ? ";" : ",";
	const lines = text.split(/\r?\n/).filter((line) => line.trim());
	if (lines.length < 2) return [];
	return rowsFromMatrix(lines.map((line) => splitDelimited(line, delimiter)));
}
function rowsFromMatrix(matrix) {
	const headers = matrix[0]?.map(normalizeHeader) ?? [];
	if (TEMPLATE_COLUMNS.filter((column) => !headers.includes(column)).length > TEMPLATE_COLUMNS.length - 3) return [];
	return matrix.slice(1).map((cells, index) => {
		const row = Object.fromEntries(TEMPLATE_COLUMNS.map((column) => [column, ""]));
		headers.forEach((header, cellIndex) => {
			if (TEMPLATE_COLUMNS.includes(header)) row[header] = cleanCell(cells[cellIndex] ?? "");
		});
		return createValidatedRow(row, index + 2);
	});
}
function normalizeHeader(value) {
	return cleanCell(value).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "_").replace(/[^\w]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
}
function cleanCell(value) {
	return value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();
}
function splitDelimited(line, delimiter) {
	const cells = [];
	let current = "";
	let quoted = false;
	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		if (char === "\"") quoted = !quoted;
		else if (char === delimiter && !quoted) {
			cells.push(current);
			current = "";
		} else current += char;
	}
	cells.push(current);
	return cells;
}
function parseHtmlTable(text) {
	if (!text.includes("<table")) return [];
	return [...text.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((rowMatch) => {
		return [...rowMatch[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => cleanCell(cell[1] ?? ""));
	}).filter((row) => row.length);
}
function generatedPadronCode(rowNumber) {
	return `PAD-PREL-${String(rowNumber - 1).padStart(5, "0")}`;
}
function downloadPadronTemplate() {
	const html = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <table border="1">
      <thead>
        <tr>${TEMPLATE_COLUMNS.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        <tr>${[
		"PAD-AERO-JAUJA-0001",
		"PRIVADO",
		"NOMBRE DEL SUJETO PASIVO",
		"NATURAL",
		"PROPIETARIO",
		"RURAL",
		"1000.00",
		"-11.78200",
		"-75.47800",
		"Jauja",
		""
	].map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>
      </tbody>
    </table>
  </body>
</html>`;
	descargarBlob("template_padron_preliminar.xls", new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" }));
}
function escapeHtml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
//#endregion
export { PadronPreliminarPage as component };
