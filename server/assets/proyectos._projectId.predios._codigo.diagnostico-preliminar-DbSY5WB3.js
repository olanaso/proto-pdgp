import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, i as estadoPlazo, n as getProyecto, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.diagnostico-preliminar-BGHufh47.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, CheckCircle2, History, Save, ScanSearch, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.diagnostico-preliminar.tsx?tsr-split=component
var ETIQUETAS_DIAGNOSTICO = {
	fechaInicioCampo: "Inicio del levantamiento en campo",
	fechaDiagnostico: "Fecha de diagnóstico",
	resultado: "Resultado preliminar",
	situacionFisica: "Situación física",
	situacionCatastral: "Situación catastral",
	situacionRegistral: "Situación registral",
	situacionLegal: "Situación legal",
	antecedentes: "Antecedentes",
	observaciones: "Observaciones",
	recomendacion: "Acción recomendada"
};
function DiagnosticoPreliminarPage() {
	const { projectId, codigo } = Route$1.useParams();
	const navigate = useNavigate();
	const decodedCodigo = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const [message, setMessage] = useState(null);
	const [form, setForm] = useState({
		fechaInicioCampo: "",
		fechaDiagnostico: "",
		resultado: "",
		situacionFisica: "",
		situacionCatastral: "",
		situacionRegistral: "",
		situacionLegal: "",
		antecedentes: "",
		observaciones: "",
		recomendacion: ""
	});
	const rol = useRol();
	const claveHistorial = `diagnostico-preliminar-${decodedCodigo}`;
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, form, setForm, {
		modulo: 11,
		entidad: "diagnostico_preliminar"
	});
	const plazoDiagnostico = estadoPlazo(useHitosPredio(decodedCodigo), "diagnostico_tecnico_legal");
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	const textarea = (key, rows) => (id) => /* @__PURE__ */ jsx("textarea", {
		id,
		rows,
		className: `${controlClase} h-auto py-2`,
		value: form[key],
		onChange: (event) => setField(key, event.target.value)
	});
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
				titulo: "Diagnóstico preliminar",
				icono: ScanSearch
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "diagnostico-preliminar",
				projectId,
				codigo: decodedCodigo
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
							onSubmit: (event) => {
								event.preventDefault();
								registrarHito(decodedCodigo, "diagnostico_tecnico_legal", form.fechaInicioCampo ?? "", "diagnostico-preliminar", ETIQUETAS_DIAGNOSTICO.fechaInicioCampo);
								guardarVersion("Guardó el diagnóstico", `resultado ${form.resultado || "sin definir"}`);
								setMessage("Diagnóstico preliminar guardado.");
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									className: "mb-4"
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Control del diagnóstico",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Inicio del levantamiento en campo",
											icono: CalendarDays,
											ayuda: "Al guardar empieza a correr el diagnóstico técnico legal (plazo de gestión de 20 d.c.).",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaInicioCampo ?? "",
												onChange: (event) => setField("fechaInicioCampo", event.target.value)
											})
										}),
										plazoDiagnostico && /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Diagnóstico técnico legal",
											children: /* @__PURE__ */ jsx(PlazoBadge, {
												vence: plazoDiagnostico.vence,
												etiqueta: "Plazo de gestión"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de diagnóstico",
											obligatorio: true,
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaDiagnostico,
												onChange: (event) => setField("fechaDiagnostico", event.target.value),
												required: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Resultado preliminar",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.resultado,
												onChange: (event) => setField("resultado", event.target.value),
												required: true,
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "",
														children: "Seleccione"
													}),
													/* @__PURE__ */ jsx("option", { children: "EN EVALUACIÓN" }),
													/* @__PURE__ */ jsx("option", { children: "CONFORME" }),
													/* @__PURE__ */ jsx("option", { children: "OBSERVADO" }),
													/* @__PURE__ */ jsx("option", { children: "INFORMACIÓN INSUFICIENTE" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Acción recomendada",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.recomendacion,
												onChange: (event) => setField("recomendacion", event.target.value),
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "",
														children: "Seleccione"
													}),
													/* @__PURE__ */ jsx("option", { children: "CONTINUAR DIAGNÓSTICO TÉCNICO-LEGAL" }),
													/* @__PURE__ */ jsx("option", { children: "PROGRAMAR INSPECCIÓN DE CAMPO" }),
													/* @__PURE__ */ jsx("option", { children: "SOLICITAR INFORMACIÓN REGISTRAL" }),
													/* @__PURE__ */ jsx("option", { children: "SUBSANAR OBSERVACIONES" })
												]
											})
										})
									] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Situación preliminar del predio",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, {
										columnas: 1,
										children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Situación física",
												obligatorio: true,
												ancho: "doble",
												children: textarea("situacionFisica", 3)
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Situación catastral",
												obligatorio: true,
												ancho: "doble",
												children: textarea("situacionCatastral", 3)
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Situación registral",
												obligatorio: true,
												ancho: "doble",
												children: textarea("situacionRegistral", 3)
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Situación legal",
												obligatorio: true,
												ancho: "doble",
												children: textarea("situacionLegal", 3)
											})
										]
									})
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Antecedentes y observaciones",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, {
										columnas: 1,
										children: [/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Antecedentes",
											ancho: "doble",
											children: textarea("antecedentes", 4)
										}), /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Observaciones",
											ancho: "doble",
											children: textarea("observaciones", 4)
										})]
									})
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: () => navigate({
										to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
										params: {
											projectId,
											codigo: decodedCodigo
										}
									}),
									children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
								}), /* @__PURE__ */ jsxs(Button, {
									type: "submit",
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar diagnóstico"]
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico del diagnóstico preliminar",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS_DIAGNOSTICO,
								nombreArchivo: `historico-diagnostico-preliminar-${decodedCodigo}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setMessage(`Se restauró la versión ${n}.`);
								}
							})
						})
					})
				]
			})
		]
	});
}
//#endregion
export { DiagnosticoPreliminarPage as component };
