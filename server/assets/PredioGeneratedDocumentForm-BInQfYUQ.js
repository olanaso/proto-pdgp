import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { M as rotulosDePaso } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { n as esGrande, r as ordenarCampos } from "./PredioSimpleForm-D1Ryg2uF.js";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, FileText, History, Save, X } from "lucide-react";
//#region src/components/PredioGeneratedDocumentForm.tsx
/** Texto visible sin guion corto (U+2013): "Resolución – RD" pasa a "Resolución · RD". */
var sinGuion = (texto) => texto.replace(/\s*–\s*/g, " · ");
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning"
};
/** Página de predio (patrón 1.3) que genera un borrador Word y versiona el documento firmado. */
function PredioGeneratedDocumentForm({ projectId, codigo, title, paso, sectionTitle, draftTitle, fileBaseName, uploadLabel, fields, modulo, antesDelFormulario, documento }) {
	const navigate = useNavigate();
	const decodedCodigo = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const titulo = sinGuion(title);
	const rotulos = rotulosDePaso(paso);
	const tituloBorrador = sinGuion(draftTitle);
	const [values, setValues] = useState(useMemo(() => Object.fromEntries(fields.map((field) => [field.key, ""])), [fields]));
	const [versions, setVersions] = useState([]);
	const [mensaje, setMensaje] = useState(null);
	const rol = useRol();
	const claveHistorial = `${paso}-${decodedCodigo}`;
	const etiquetas = useMemo(() => ({
		values: "Datos",
		versions: "Documento firmado",
		version: "Versión",
		archivo: "Archivo",
		estado: "Estado",
		...Object.fromEntries(fields.map((field) => [field.key, field.label]))
	}), [fields]);
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, {
		values,
		versions
	}, (r) => {
		setValues(r.values);
		setVersions(r.versions);
	}, {
		modulo,
		entidad: paso.replaceAll("-", "_")
	});
	function setField(key, value) {
		setValues((current) => ({
			...current,
			[key]: value
		}));
	}
	function renderField(field, id) {
		if (field.key === documento.campoNumero) return /* @__PURE__ */ jsx("input", {
			id,
			className: `${controlClase} bg-muted font-mono`,
			value: values[field.key] || "Se asigna al generar el documento",
			readOnly: true
		});
		if (field.type === "textarea") return /* @__PURE__ */ jsx("textarea", {
			id,
			rows: 3,
			className: `${controlClase} h-auto py-2`,
			value: values[field.key] ?? "",
			placeholder: field.placeholder,
			onChange: (event) => setField(field.key, event.target.value)
		});
		if (field.type === "select") return /* @__PURE__ */ jsxs("select", {
			id,
			className: controlClase,
			value: values[field.key] ?? "",
			onChange: (event) => setField(field.key, event.target.value),
			children: [/* @__PURE__ */ jsx("option", {
				value: "",
				children: "Seleccione"
			}), field.options?.map((option) => /* @__PURE__ */ jsx("option", {
				value: option,
				children: option
			}, option))]
		});
		return /* @__PURE__ */ jsx("input", {
			id,
			type: field.type === "date" ? "date" : field.type === "number" ? "number" : "text",
			className: controlClase,
			value: values[field.key] ?? "",
			placeholder: field.placeholder,
			onChange: (event) => setField(field.key, event.target.value)
		});
	}
	const nombreArchivo = `${fileBaseName}_${decodedCodigo.replace(/[^A-Z0-9-]/gi, "_")}.doc`;
	function armarBorrador(numero) {
		const datos = documento.campoNumero ? {
			...values,
			[documento.campoNumero]: numero ?? "BORRADOR SIN NUMERAR"
		} : values;
		const details = fields.map((field) => `<p><b>${escapeHtml(field.label)}:</b> ${escapeHtml(datos[field.key] || "Pendiente de registro")}</p>`).join("");
		const html = `<!doctype html>
      <html><head><meta charset="UTF-8" /></head>
      <body style="font-family:Arial,sans-serif;font-size:11pt;color:#111827;line-height:1.4">
        <h1 style="color:#8b1a1a;text-align:center;font-size:16pt">${escapeHtml(numero ?? draftTitle)}</h1>
        <p><b>Proyecto:</b> ${escapeHtml(projectLabel)}</p>
        <p><b>Código de predio:</b> ${escapeHtml(decodedCodigo)}</p>
        ${details}
        <h3>Antecedentes y sustento</h3>
        <p>Complete el contenido técnico y legal que corresponda antes de la firma final.</p>
        <br><br><p style="text-align:center">____________________________________<br>Responsable</p>
      </body></html>`;
		return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
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
				titulo,
				icono: FileText,
				descripcion: sinGuion(rotulos?.menu ?? ""),
				acciones: rotulos && /* @__PURE__ */ jsx(StatusBadge, {
					tono: "primary",
					children: rotulos.insignia
				}),
				documentos: {
					propio: {
						titulo: tituloBorrador,
						tipos: documento.tipos,
						subtipos: documento.subtipos,
						tipoInicial: documento.tipoInicial,
						asunto: `${titulo} del predio ${decodedCodigo}`,
						nombreArchivo: () => nombreArchivo
					},
					armar: { "*": (numero) => armarBorrador(numero) },
					destino: documento.destino,
					alGenerar: (_, { numero }) => {
						const nuevos = documento.campoNumero && numero ? {
							...values,
							[documento.campoNumero]: numero
						} : values;
						setValues(nuevos);
						guardarVersion(numero ? "Generó documento numerado" : "Generó borrador sin numerar", `${numero ?? tituloBorrador} (${nombreArchivo})`, void 0, {
							values: nuevos,
							versions
						});
						setMensaje({
							tipo: "exito",
							texto: numero ? `${numero} generado y registrado. Revise la descarga en Word.` : `${tituloBorrador} generado sin número. Revise la descarga en Word.`
						});
					}
				}
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: paso,
				projectId,
				codigo: decodedCodigo
			}),
			antesDelFormulario,
			mensaje && /* @__PURE__ */ jsxs("p", {
				role: "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[mensaje.tipo]}`,
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
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
					/* @__PURE__ */ jsx(TabsContent, {
						value: "registro",
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: (event) => {
								event.preventDefault();
								guardarVersion(versiones.length ? "Modificó el registro" : "Creó el registro", titulo);
								setMensaje({
									tipo: "exito",
									texto: `${titulo}: registro guardado.`
								});
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: sectionTitle,
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [ordenarCampos(fields).map((field) => /* @__PURE__ */ jsx(FormField, {
										etiqueta: field.label,
										obligatorio: field.required,
										ancho: esGrande(field) ? "doble" : "completo",
										children: (id) => renderField(field, id)
									}, field.key)), /* @__PURE__ */ jsx(FormField, {
										etiqueta: uploadLabel,
										ancho: "doble",
										children: () => /* @__PURE__ */ jsx(CampoDocumento, {
											projectId,
											codigo: decodedCodigo,
											nombre: uploadLabel,
											firmado: true,
											accept: ".pdf"
										})
									})] })
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
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar registro"]
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: `Histórico · ${titulo}`,
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setMensaje({
										tipo: "exito",
										texto: `Se restauró la versión ${n}. Quedó como una versión nueva.`
									});
								}
							})
						})
					})
				]
			})
		]
	});
}
function escapeHtml(value) {
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//#endregion
export { PredioGeneratedDocumentForm as t };
