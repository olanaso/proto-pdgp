import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { f as vencimiento, g as fechaIso, n as getProyecto, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { n as etiquetaProyecto, t as PredioEncabezado, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.expediente-tasacion-DxlZVD6Q.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, CheckCircle2, FileSpreadsheet, FileText, Save, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.expediente-tasacion.tsx?tsr-split=component
var etiquetasHistorial = {
	fechaExpedicion: "Fecha de expedición",
	fechaDesignacionPerito: "Designación del perito",
	profesional: "Profesional que firma",
	datum: "Datum",
	firmaArquitectura: "Firma del plano de arquitectura",
	planRows: "Plano",
	fecha: "Fecha de elaboración",
	codigo: "Código",
	tipo: "Tipo"
};
var PLAN_DEFS = [
	{
		key: "diagnostico",
		tipo: "Plano diagnóstico",
		fechaLabel: "Fecha de elaboración del plano diagnóstico",
		codigoLabel: "Código del plano diagnóstico",
		suffix: "PD"
	},
	{
		key: "ubicacion",
		tipo: "Plano de ubicación",
		fechaLabel: "Fecha de elaboración del plano de ubicación",
		codigoLabel: "Código del plano de ubicación",
		suffix: "PU"
	},
	{
		key: "perimetrico",
		tipo: "Plano perimétrico",
		fechaLabel: "Fecha de elaboración del plano perimétrico",
		codigoLabel: "Código del plano perimétrico",
		suffix: "PP"
	},
	{
		key: "afectacion",
		tipo: "Plano de afectación",
		fechaLabel: "Fecha de elaboración del plano de afectación",
		codigoLabel: "Código del plano de afectación",
		suffix: "PA"
	},
	{
		key: "distribucion",
		tipo: "Plano de distribución",
		fechaLabel: "Fecha de elaboración del plano de distribución",
		codigoLabel: "Código del plano de distribución",
		suffix: "PDI"
	},
	{
		key: "arquitectura",
		tipo: "Plano de arquitectura",
		fechaLabel: "Fecha de elaboración del plano de arquitectura",
		codigoLabel: "Código del plano de arquitectura",
		suffix: "PARQ"
	}
];
/** Planos firmados que están en el catálogo del paso; los demás se identifican por nombre. */
var CATALOGO_PLANO = {
	ubicacion: "tas-plano-ubicacion",
	afectacion: "tas-plano-afectacion",
	distribucion: "tas-plano-distribucion"
};
function ExpedienteTasacionPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(ExpedienteTasacionForm, {
		projectId,
		codigo
	}, `${projectId}-${codigo}`);
}
function ExpedienteTasacionForm({ projectId, codigo }) {
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const baseCode = (predio?.cod || decodedCodigo).replace(/[^A-Z0-9-]/gi, "").toUpperCase();
	const [fechaExpedicion, setFechaExpedicion] = useState(fechaIso(/* @__PURE__ */ new Date()));
	const [fechaDesignacionPerito, setFechaDesignacionPerito] = useState("");
	const [profesional, setProfesional] = useState(predio?.rtec || "");
	const [datum, setDatum] = useState("WGS84");
	const [firmaArquitectura, setFirmaArquitectura] = useState("");
	const [message, setMessage] = useState("");
	const [planRows, setPlanRows] = useState(() => PLAN_DEFS.map((plan, index) => ({
		...plan,
		fecha: fechaIso(/* @__PURE__ */ new Date()),
		codigo: `${baseCode}-${plan.suffix}-${String(index + 1).padStart(2, "0")}`
	})));
	const rol = useRol();
	const claveHistorial = `expediente-tasacion-${decodedCodigo}`;
	const formulario = {
		fechaExpedicion,
		fechaDesignacionPerito,
		profesional,
		datum,
		firmaArquitectura,
		planRows
	};
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, formulario, (r) => {
		setFechaExpedicion(r.fechaExpedicion);
		setFechaDesignacionPerito(r.fechaDesignacionPerito);
		setProfesional(r.profesional);
		setDatum(r.datum);
		setFirmaArquitectura(r.firmaArquitectura);
		setPlanRows(r.planRows);
	}, {
		modulo: 14,
		entidad: "expediente_tasacion"
	});
	const canGenerateMembretes = useMemo(() => planRows.every((plan) => plan.fecha && plan.codigo.trim()), [planRows]);
	const venceTasacion = fechaDesignacionPerito ? vencimiento(/* @__PURE__ */ new Date(`${fechaDesignacionPerito}T00:00:00`), plazo("tasacion")) : null;
	function updatePlan(key, field, value) {
		setPlanRows((current) => current.map((plan) => plan.key === key ? {
			...plan,
			[field]: value
		} : plan));
	}
	function assignPlanCodes() {
		const codificados = planRows.map((plan, index) => ({
			...plan,
			codigo: plan.codigo.trim() || `${baseCode}-${PLAN_DEFS.find((def) => def.key === plan.key)?.suffix ?? "PL"}-${String(index + 1).padStart(2, "0")}`
		}));
		setPlanRows(codificados);
		guardarVersion("Asignó codificación de planos", `Predio ${predio?.cod || decodedCodigo}`, void 0, {
			...formulario,
			planRows: codificados
		});
		setMessage("Codificación de planos asignada.");
	}
	function handleMemoriaGenerada(numero) {
		guardarVersion("Generó memoria descriptiva", `${numero ?? "BORRADOR SIN NUMERAR"} con fecha de expedición ${fechaExpedicion}`);
		setMessage("Memoria descriptiva generada. Revise la descarga.");
	}
	function handleGenerateMembretes() {
		descargarBlob(`membretes_autocad_${baseCode}.xls`, createMembretesExcelBlob({
			planRows,
			predio,
			codigo: decodedCodigo,
			profesional,
			datum,
			firmaArquitectura
		}));
		guardarVersion("Generó membretes", "Excel para Data Link de AutoCAD");
		setMessage("Membretes para planos generados. Revise la descarga.");
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
				titulo: "Expediente para la tasación",
				icono: FileText,
				documentos: {
					armar: { "tas-memoria": (numero) => createMemoriaWordBlob({
						numero,
						fechaExpedicion,
						predio,
						codigo: decodedCodigo,
						projectLabel
					}) },
					alGenerar: (catalogoId, { numero }) => {
						if (catalogoId === "tas-memoria") handleMemoriaGenerada(numero);
					}
				},
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: "success",
					children: "Caracterización registrada"
				})
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Tasación · art. 17 y 18 del TUO del DL 1192",
				className: "mb-4",
				children: [/* @__PURE__ */ jsx(Stepper, { pasos: [
					{
						nombre: "Requerimiento de tasación / ITL",
						estado: "completado",
						detalle: "Art. 17 · expediente técnico legal",
						to: "/proyectos/$projectId/predios/$codigo/requerimiento-tasacion-itl",
						params: {
							projectId,
							codigo
						}
					},
					{
						nombre: "Expediente de tasación",
						estado: "actual",
						detalle: "Art. 17 · memoria descriptiva y planos"
					},
					{
						nombre: "Tasación / ITT",
						estado: "pendiente",
						detalle: "Art. 18 · 30 d.h. desde la designación del perito"
					},
					{
						nombre: "Modalidad de adquisición",
						estado: "pendiente",
						detalle: "Art. 19 · trato directo o expropiación",
						to: "/proyectos/$projectId/predios/$codigo/modalidad-adquisicion",
						params: {
							projectId,
							codigo
						}
					}
				] }), venceTasacion && /* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
					children: ["Plazo del órgano de tasación (art. 18):", /* @__PURE__ */ jsx(PlazoBadge, { vence: venceTasacion })]
				})]
			}),
			message && /* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mb-4 flex items-start gap-2 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: message
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMessage(""),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "documentos",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "documentos",
							children: "Documentos y planos"
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
						value: "documentos",
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: (event) => {
								event.preventDefault();
								guardarVersion(versiones.length ? "Modificó el expediente" : "Creó el expediente", `Predio ${predio?.cod || decodedCodigo}`);
								setMessage("Datos del expediente para tasación guardados.");
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									className: "mb-4",
									datos: [
										{
											etiqueta: "Caracterización",
											valor: "Registrada"
										},
										{
											etiqueta: "Sujeto pasivo",
											valor: predio?.suj || ""
										},
										{
											etiqueta: "Área (m²)",
											valor: predio?.area || predio?.m2 || ""
										}
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Estado del trámite",
									children: /* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Designación del perito",
										icono: CalendarDays,
										ayuda: "Fecha desde la que corren los 30 d.h. del art. 18",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: fechaDesignacionPerito,
											onChange: (e) => setFechaDesignacionPerito(e.target.value)
										})
									}) })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Memoria descriptiva y membretes",
									className: "mt-4",
									acciones: /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: handleGenerateMembretes,
										disabled: !canGenerateMembretes,
										title: "Excel para Data Link de AutoCAD",
										children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Generar membretes"]
									}),
									children: /* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Fecha de expedición",
										obligatorio: true,
										icono: CalendarDays,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: fechaExpedicion,
											onChange: (e) => setFechaExpedicion(e.target.value),
											required: true
										})
									}) })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Datos de los planos",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Profesional que firma los planos",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: profesional,
													onChange: (e) => setProfesional(e.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Datum de los planos",
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: datum,
													onChange: (e) => setDatum(e.target.value),
													children: [
														/* @__PURE__ */ jsx("option", {
															value: "WGS84",
															children: "WGS84"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "PSAD56",
															children: "PSAD56"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "LOCAL",
															children: "LOCAL"
														})
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Firma del plano de arquitectura",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: firmaArquitectura,
													onChange: (e) => setFirmaArquitectura(e.target.value)
												})
											})
										] }),
										/* @__PURE__ */ jsx(Subtitulo, {
											acciones: /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: assignPlanCodes,
												title: "Completa los códigos vacíos con el patrón del predio",
												children: [/* @__PURE__ */ jsx(Save, {}), " Asignar codificación"]
											}),
											children: "Fechas y códigos"
										}),
										/* @__PURE__ */ jsx(Tabla, {
											columnas: [
												{
													clave: "tipo",
													titulo: "Tipo de plano",
													render: (plan) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
														className: "block font-medium",
														children: plan.tipo
													}), /* @__PURE__ */ jsx("span", {
														className: "block text-xs text-muted-foreground",
														children: plan.fechaLabel
													})] })
												},
												{
													clave: "fecha",
													titulo: "Fecha de elaboración",
													ancho: "200px",
													render: (plan) => /* @__PURE__ */ jsx("input", {
														type: "date",
														"aria-label": plan.fechaLabel,
														className: controlClase,
														value: plan.fecha,
														onChange: (e) => updatePlan(plan.key, "fecha", e.target.value)
													})
												},
												{
													clave: "codigo",
													titulo: "Código del plano",
													render: (plan) => /* @__PURE__ */ jsx("input", {
														"aria-label": plan.codigoLabel,
														className: controlClase,
														value: plan.codigo,
														onChange: (e) => updatePlan(plan.key, "codigo", e.target.value),
														placeholder: plan.codigoLabel
													})
												},
												{
													clave: "firmado",
													titulo: "Plano firmado (PDF)",
													render: (plan) => /* @__PURE__ */ jsx(CampoDocumento, {
														projectId,
														codigo: decodedCodigo,
														nombre: `${plan.tipo} firmado`,
														catalogoId: CATALOGO_PLANO[plan.key],
														firmado: true,
														accept: ".pdf",
														numero: plan.codigo || void 0,
														fecha: plan.fecha || void 0
													})
												}
											],
											filas: planRows,
											claveFila: (plan) => plan.key
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, {
										columnas: 1,
										children: [/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Memoria descriptiva firmada (PDF)",
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Memoria descriptiva firmada",
												catalogoId: "tas-memoria",
												firmado: true,
												accept: ".pdf",
												fecha: fechaExpedicion || void 0
											})
										}), /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Planos en DWG",
											ayuda: "Un .dwg o un .zip con todos los planos",
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Planos en DWG",
												accept: ".dwg,.zip"
											})
										})]
									})
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: () => history.back(),
									children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
								}), /* @__PURE__ */ jsxs(Button, {
									type: "submit",
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar expediente"]
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Expediente para la tasación",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setMessage(`Se restauró la versión ${n}. Quedó como una versión nueva.`);
								}
							})
						})
					})
				]
			})
		]
	});
}
function createMemoriaWordBlob({ numero, fechaExpedicion, predio, codigo, projectLabel }) {
	const html = `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body style="font-family: Arial; font-size: 10pt; color: black;">
    <h2>MEMORIA DESCRIPTIVA</h2>
    <p style="text-align:center"><b>${escapeHtml(numero ?? "BORRADOR SIN NUMERAR")}</b></p>
    <p><b>Fecha de expedición:</b> ${escapeHtml(fechaExpedicion)}</p>
    <p><b>Proyecto:</b> ${escapeHtml(projectLabel)}</p>
    <p><b>Código de predio:</b> ${escapeHtml(predio?.cod || codigo)}</p>
    <p><b>Sujeto pasivo:</b> ${escapeHtml(predio?.suj || "Sin información")}</p>
    <p><b>Tipo de predio:</b> ${escapeHtml(predio?.tipo || predio?.tp || "Sin información")}</p>
    <p><b>Área afectada:</b> ${escapeHtml(predio?.area || predio?.m2 || "Sin información")} m2</p>
    <p>El presente documento se emite para conformar el expediente para tasación, considerando la caracterización del predio registrada en el sistema.</p>
  </body>
</html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function createMembretesExcelBlob({ planRows, predio, codigo, profesional, datum, firmaArquitectura }) {
	const headers = [
		"tipo_plano",
		"fecha_elaboracion",
		"codigo_plano",
		"codigo_predio",
		"sujeto_pasivo",
		"area_m2",
		"datum",
		"profesional_tecnico",
		"firma_plano_arquitectura"
	];
	const rows = planRows.map((plan) => [
		plan.tipo,
		plan.fecha,
		plan.codigo,
		predio?.cod || codigo,
		predio?.suj || "",
		predio?.area || predio?.m2 || "",
		datum,
		profesional,
		firmaArquitectura
	]);
	const html = `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body>
    <table border="1">
      <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </body>
</html>`;
	return new Blob(["﻿", html], { type: "application/vnd.ms-excel;charset=utf-8" });
}
function escapeHtml(value) {
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
//#endregion
export { ExpedienteTasacionPage as component };
