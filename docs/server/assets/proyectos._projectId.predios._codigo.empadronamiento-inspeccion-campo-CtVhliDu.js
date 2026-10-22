import { a as controlClase, i as SiNo, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, m as fecha, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { it as useItems, jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { r as nuevoId, t as initialForm } from "./empadronamiento-BwTjGigO.js";
import { E as Modal, f as descargarArchivo, m as MotivoModal, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.empadronamiento-inspeccion-campo-DG79aik1.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { g as useFotos } from "./fotos-CUnD_Pb7.js";
import { n as BotonPanelFotografico, t as CampoFoto } from "./CampoFoto-CSlShmEX.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CalendarDays, CheckCircle2, Download, Eye, History, MapPinned, Save, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.empadronamiento-inspeccion-campo.tsx?tsr-split=component
/** Clave de la pantalla en el almacén de fotos (M11). */
var PANTALLA = "empadronamiento-inspeccion-campo";
/** Usuario de la sesión cuando no está en Usuarios (correo de ingreso). */
function sesionActual() {
	try {
		return localStorage.getItem("mtc-session") || "Usuario sin sesión";
	} catch {
		return "Usuario sin sesión";
	}
}
var ETIQUETAS_EMPADRONAMIENTO = {
	form: "Empadronamiento en curso",
	realizaciones: "Empadronamiento realizado",
	realizadoPor: "Realizado por",
	registradoPor: "Registrado por",
	registradoEl: "Registrado el",
	actaItemId: "Acta",
	estado: "Estado",
	anulacion: "Anulación",
	motivo: "Motivo",
	actas: "Acta",
	conEmpadronamiento: "Con empadronamiento",
	fechaInicio: "Fecha de empadronamiento",
	fechaFin: "Fecha fin del empadronamiento",
	ocupante: "Ocupante encontrado",
	documentoOcupante: "DNI / documento",
	condicionOcupante: "Condición del ocupante",
	caracteristicasPredio: "Características del predio",
	edificaciones: "Edificaciones",
	mejoras: "Mejoras",
	observaciones: "Observaciones de campo",
	numero: "Número de acta",
	description: "Descripción",
	fileName: "Archivo",
	size: "Tamaño (bytes)"
};
function todayInPeru() {
	return new Intl.DateTimeFormat("es-PE", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		timeZone: "America/Lima"
	}).format(/* @__PURE__ */ new Date());
}
/** Una ficha por predio: al cambiar de predio se vuelve a montar y carga su última versión guardada. */
function EmpadronamientoInspeccionCampoPage() {
	const { codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(EmpadronamientoFicha, {}, codigo);
}
function EmpadronamientoFicha() {
	const { projectId, codigo } = Route$1.useParams();
	const navigate = useNavigate();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const fotoBase = {
		proyecto: projectId,
		predio: decodedCodigo,
		pantalla: PANTALLA,
		modulo: 11
	};
	const [form, setForm] = useState(initialForm);
	const [borradorId, setBorradorId] = useState(nuevoId);
	const [realizaciones, setRealizaciones] = useState([]);
	const [ver, setVer] = useState(null);
	const [anular, setAnular] = useState(null);
	const [feedback, setFeedback] = useState(null);
	const nombreUsuario = useUsuarioSesion()?.nombre ?? sesionActual();
	const fotos = useFotos();
	const fotosDe = (id) => fotos.filter((x) => x.predio === decodedCodigo && x.pantalla === PANTALLA && x.registro === id).length;
	const rol = useRol();
	const items = useItems();
	const usados = new Set(realizaciones.flatMap((r) => [r.actaItemId, ...r.otrosItemIds]));
	const actaNueva = items.find((i) => i.predio === decodedCodigo && i.catalogoId === "emp-acta" && i.estado !== "anulado" && !usados.has(i.id));
	const otrosNuevos = items.filter((i) => i.predio === decodedCodigo && !i.catalogoId && i.paso === "empadronamiento-inspeccion-campo" && i.estado !== "anulado" && !usados.has(i.id));
	const itemPorId = (id) => items.find((i) => i.id === id);
	const vigentes = realizaciones.filter((r) => r.estado === "vigente").length;
	const claveHistorial = `empadronamiento-${decodedCodigo}`;
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, {
		form,
		borradorId,
		realizaciones
	}, (v) => {
		setForm({
			...initialForm,
			...v.form
		});
		if (v.borradorId) setBorradorId(v.borradorId);
		setRealizaciones(v.realizaciones ?? []);
		setFeedback(null);
	}, {
		modulo: 11,
		entidad: "empadronamiento_inspeccion_campo"
	});
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
		setFeedback(null);
	}
	const predioCode = predio?.cod || decodedCodigo;
	function handleSubmit() {
		if (!form.conEmpadronamiento) {
			setFeedback({
				kind: "error",
				text: "Confirme que el predio cuenta con empadronamiento antes de registrarlo."
			});
			return;
		}
		if (!form.fechaInicio) {
			setFeedback({
				kind: "error",
				text: "Indique la fecha del empadronamiento."
			});
			return;
		}
		if (form.fechaFin && form.fechaFin < form.fechaInicio) {
			setFeedback({
				kind: "error",
				text: "La fecha final no puede ser anterior a la fecha inicial del empadronamiento."
			});
			return;
		}
		if (!actaNueva) {
			setFeedback({
				kind: "error",
				text: "Genere el acta de este empadronamiento en «Documentos que genera este paso», arriba del formulario. Después súbala firmada en el campo «Acta de empadronamiento firmada»."
			});
			return;
		}
		const nueva = {
			id: borradorId,
			form: {
				...form,
				realizadoPor: form.realizadoPor.trim() || nombreUsuario
			},
			registradoPor: nombreUsuario,
			registradoEl: (/* @__PURE__ */ new Date()).toISOString(),
			actaItemId: actaNueva.id,
			otrosItemIds: otrosNuevos.map((i) => i.id),
			estado: "vigente"
		};
		const lista = [nueva, ...realizaciones];
		const siguienteId = nuevoId();
		setRealizaciones(lista);
		setBorradorId(siguienteId);
		setForm(initialForm);
		guardarVersion(`Registró empadronamiento N.° ${lista.length}`, `del ${nueva.form.fechaInicio}, realizado por ${nueva.form.realizadoPor}, acta ${actaNueva.numero ?? actaNueva.folio}`, void 0, {
			form: initialForm,
			borradorId: siguienteId,
			realizaciones: lista
		});
		setFeedback({
			kind: "success",
			text: `Empadronamiento N.° ${lista.length} registrado.`
		});
	}
	function anularRealizacion(r, motivo) {
		const lista = realizaciones.map((x) => x.id === r.id ? {
			...x,
			estado: "anulado",
			anulacion: {
				motivo,
				usuario: nombreUsuario,
				fecha: (/* @__PURE__ */ new Date()).toISOString()
			}
		} : x);
		setRealizaciones(lista);
		guardarVersion("Anuló empadronamiento", `del ${r.form.fechaInicio}`, motivo, {
			form,
			borradorId,
			realizaciones: lista
		});
		setFeedback({
			kind: "success",
			text: "Empadronamiento anulado."
		});
	}
	const campo = (key, placeholder) => (id) => /* @__PURE__ */ jsx("input", {
		id,
		disabled: !form.conEmpadronamiento,
		className: controlClase,
		placeholder,
		value: form[key],
		onChange: (event) => setField(key, event.target.value)
	});
	const area = (key, rows, placeholder) => (id) => /* @__PURE__ */ jsx("textarea", {
		id,
		rows,
		disabled: !form.conEmpadronamiento,
		className: `${controlClase} h-auto py-2`,
		placeholder,
		value: form[key],
		onChange: (event) => setField(key, event.target.value)
	});
	const opcionesDocumentos = {
		armar: { "emp-acta": (numero) => createActaEmpadronamientoWordBlob({
			numero: numero ?? "BORRADOR SIN NUMERAR",
			predio,
			predioCode,
			projectLabel
		}) },
		destino: { externo: predio?.suj || "" },
		alGenerar: (_, { numero }) => {
			guardarVersion("Generó acta de empadronamiento", `acta ${numero ?? "BORRADOR SIN NUMERAR"} del predio ${predioCode}`);
			setFeedback({
				kind: "success",
				text: numero ? `Acta ${numero} generada y registrada. Revise la descarga.` : "Acta sin numerar generada. Numérela antes de su firma."
			});
		}
	};
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
				titulo: "Empadronamiento e inspección de campo",
				icono: MapPinned,
				documentos: opcionesDocumentos,
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(BotonPanelFotografico, {
					proyecto: projectId,
					predio: decodedCodigo,
					pantalla: PANTALLA,
					titulo: "Panel fotográfico · Empadronamiento e inspección de campo"
				}), /* @__PURE__ */ jsx(StatusBadge, {
					tono: vigentes ? "success" : "neutral",
					children: vigentes ? `${vigentes} empadronamiento(s) registrado(s)` : "Sin empadronamiento"
				})] })
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "empadronamiento-inspeccion-campo",
				projectId,
				codigo: decodedCodigo
			}),
			feedback && /* @__PURE__ */ jsxs("p", {
				role: feedback.kind === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${feedback.kind === "success" ? "border-success bg-success-soft text-success" : "border-destructive bg-destructive-soft text-destructive"}`,
				children: [
					feedback.kind === "success" ? /* @__PURE__ */ jsx(CheckCircle2, {
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
						children: feedback.text
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setFeedback(null),
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
								handleSubmit();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Empadronamientos realizados",
									className: "mt-4",
									children: [/* @__PURE__ */ jsx("p", {
										className: "mb-3 text-sm text-muted-foreground",
										children: "Cada empadronamiento registrado queda aquí con quién lo hizo, su acta y sus fotos. El acta se genera en blanco en «Documentos que genera este paso», arriba del formulario, y se sube firmada en «Documentos recibidos»."
									}), /* @__PURE__ */ jsx(Tabla, {
										filas: realizaciones,
										claveFila: (r) => r.id,
										claseFila: (r) => r.estado === "anulado" ? "text-muted-foreground line-through" : void 0,
										vacio: "Aún no se registró ningún empadronamiento.",
										columnas: [
											{
												clave: "n",
												titulo: "N.°",
												ancho: "50px",
												render: (_, i) => realizaciones.length - i
											},
											{
												clave: "fecha",
												titulo: "Fecha",
												render: (r) => /* @__PURE__ */ jsxs("span", {
													className: "text-xs",
													children: [fecha(r.form.fechaInicio), r.form.fechaFin && r.form.fechaFin !== r.form.fechaInicio && ` al ${fecha(r.form.fechaFin)}`]
												})
											},
											{
												clave: "ocupante",
												titulo: "Ocupante",
												render: (r) => /* @__PURE__ */ jsxs("span", {
													className: "text-xs",
													children: [r.form.ocupante || "Sin ocupante registrado", r.form.condicionOcupante && /* @__PURE__ */ jsx("span", {
														className: "block text-muted-foreground",
														children: r.form.condicionOcupante
													})]
												})
											},
											{
												clave: "realizadoPor",
												titulo: "Realizado por",
												render: (r) => r.form.realizadoPor
											},
											{
												clave: "registro",
												titulo: "Registrado por",
												render: (r) => /* @__PURE__ */ jsxs("span", {
													className: "text-xs",
													children: [r.registradoPor, /* @__PURE__ */ jsx("span", {
														className: "block text-muted-foreground",
														children: fechaHora(r.registradoEl)
													})]
												})
											},
											{
												clave: "acta",
												titulo: "Acta",
												render: (r) => {
													const a = itemPorId(r.actaItemId);
													if (!a) return /* @__PURE__ */ jsx("span", {
														className: "text-xs text-muted-foreground",
														children: "Sin acta"
													});
													const firmada = a.estado === "firmado";
													return /* @__PURE__ */ jsxs("span", {
														className: "text-xs",
														children: [
															/* @__PURE__ */ jsx("span", {
																className: "block font-mono",
																children: a.numero ?? a.folio
															}),
															/* @__PURE__ */ jsx(StatusBadge, {
																tono: firmada ? "success" : "warning",
																children: firmada ? "Firmada" : a.estado === "anulado" ? "Anulada" : "Sin firma"
															}),
															/* @__PURE__ */ jsxs("span", {
																className: "mt-1 flex flex-wrap gap-1",
																children: [a.archivo && /* @__PURE__ */ jsxs(Button, {
																	type: "button",
																	variant: "outline",
																	size: "sm",
																	onClick: () => void descargarArchivo(a.archivo),
																	children: [/* @__PURE__ */ jsx(Download, {}), " Firmada"]
																}), a.generado && /* @__PURE__ */ jsxs(Button, {
																	type: "button",
																	variant: "outline",
																	size: "sm",
																	onClick: () => void descargarArchivo(a.generado),
																	children: [/* @__PURE__ */ jsx(Download, {}), " En blanco"]
																})]
															})
														]
													});
												}
											},
											{
												clave: "fotos",
												titulo: "Fotos",
												alinear: "centro",
												render: (r) => fotosDe(r.id)
											},
											{
												clave: "otros",
												titulo: "Otros documentos",
												render: (r) => r.otrosItemIds.length ? /* @__PURE__ */ jsx("ul", {
													className: "text-xs",
													children: r.otrosItemIds.map((id) => {
														const o = itemPorId(id);
														return o ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
															type: "button",
															className: "text-left underline",
															onClick: () => o.archivo && void descargarArchivo(o.archivo),
															children: o.libre?.nombre
														}) }, id) : null;
													})
												}) : /* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: "Ninguno"
												})
											},
											{
												clave: "acciones",
												titulo: "Acciones",
												render: (r) => /* @__PURE__ */ jsxs("span", {
													className: "flex flex-wrap gap-1",
													children: [/* @__PURE__ */ jsxs(Button, {
														type: "button",
														variant: "outline",
														size: "sm",
														onClick: () => setVer(r),
														children: [/* @__PURE__ */ jsx(Eye, {}), " Ver"]
													}), r.estado === "vigente" && /* @__PURE__ */ jsxs(Button, {
														type: "button",
														variant: "outline",
														size: "sm",
														onClick: () => setAnular(r),
														children: [/* @__PURE__ */ jsx(X, {}), " Anular"]
													})]
												})
											}
										]
									})]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Empadronamiento",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsx(Subtitulo, { children: "Control del empadronamiento" }),
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Con empadronamiento",
												obligatorio: true,
												ayuda: "Indique si el predio cuenta con empadronamiento realizado.",
												children: /* @__PURE__ */ jsx(SiNo, {
													nombre: "Con empadronamiento",
													valor: form.conEmpadronamiento,
													onCambiar: (checked) => {
														setForm((current) => ({
															...current,
															conEmpadronamiento: checked,
															fechaInicio: checked ? current.fechaInicio : "",
															fechaFin: checked ? current.fechaFin : ""
														}));
														setFeedback(null);
													}
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Realizado por",
												ayuda: "Brigada o persona que empadronó. Si lo deja vacío, se registra su usuario.",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													disabled: !form.conEmpadronamiento,
													className: controlClase,
													placeholder: nombreUsuario,
													value: form.realizadoPor,
													onChange: (event) => setField("realizadoPor", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha de empadronamiento",
												obligatorio: true,
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													required: form.conEmpadronamiento,
													disabled: !form.conEmpadronamiento,
													className: controlClase,
													value: form.fechaInicio,
													onChange: (event) => setField("fechaInicio", event.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha fin del empadronamiento",
												obligatorio: true,
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													disabled: !form.conEmpadronamiento,
													className: controlClase,
													value: form.fechaFin,
													onChange: (event) => setField("fechaFin", event.target.value)
												})
											})
										] }),
										/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de la inspección de campo" }),
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Ocupante encontrado",
												children: campo("ocupante", "Apellidos y nombres")
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "DNI / documento",
												children: campo("documentoOcupante", "Documento del ocupante")
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Condición del ocupante",
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													disabled: !form.conEmpadronamiento,
													className: controlClase,
													value: form.condicionOcupante,
													onChange: (event) => setField("condicionOcupante", event.target.value),
													children: [
														/* @__PURE__ */ jsx("option", {
															value: "",
															children: "Seleccione"
														}),
														/* @__PURE__ */ jsx("option", { children: "PROPIETARIO" }),
														/* @__PURE__ */ jsx("option", { children: "POSEEDOR" }),
														/* @__PURE__ */ jsx("option", { children: "ARRENDATARIO" }),
														/* @__PURE__ */ jsx("option", { children: "OCUPANTE" }),
														/* @__PURE__ */ jsx("option", { children: "OTRO" })
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Características del predio",
												ancho: "doble",
												children: area("caracteristicasPredio", 3, "Uso actual, materiales, estado de conservación y otras características.")
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Edificaciones",
												ancho: "doble",
												children: area("edificaciones", 2, "Descripción de edificaciones encontradas.")
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Mejoras",
												ancho: "doble",
												children: area("mejoras", 2, "Cultivos, cercos, instalaciones u otras mejoras.")
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Observaciones de campo",
												ancho: "doble",
												children: area("observaciones", 3)
											})
										] })
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, {
										columnas: 1,
										children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fotos de la inspección",
												ancho: "doble",
												children: /* @__PURE__ */ jsx(CampoFoto, { contexto: {
													...fotoBase,
													seccion: "Ficha de campo",
													registro: borradorId,
													campo: "Fotos de la inspección"
												} })
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fotos del acta",
												ancho: "doble",
												ayuda: "Fotos o escaneos del acta llenada en campo.",
												children: /* @__PURE__ */ jsx(CampoFoto, { contexto: {
													...fotoBase,
													seccion: "Acta",
													registro: borradorId,
													campo: "Fotos del acta"
												} })
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Acta de empadronamiento firmada",
												ancho: "doble",
												ayuda: "El acta en blanco se genera en «Documentos que genera este paso», arriba del formulario; súbala aquí firmada.",
												children: () => /* @__PURE__ */ jsx(CampoDocumento, {
													projectId,
													codigo: decodedCodigo,
													nombre: "Acta de empadronamiento firmada",
													catalogoId: "emp-acta",
													excluir: [...usados].filter((x) => Boolean(x)),
													firmado: true,
													accept: ".pdf"
												})
											})
										]
									})
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [
									/* @__PURE__ */ jsxs("p", {
										className: "mr-auto self-center text-xs text-muted-foreground",
										children: [
											"Los campos marcados con ",
											/* @__PURE__ */ jsx("span", {
												className: "text-destructive",
												children: "*"
											}),
											" son obligatorios."
										]
									}),
									/* @__PURE__ */ jsxs(Button, {
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
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "submit",
										children: [/* @__PURE__ */ jsx(Save, {}), " Registrar empadronamiento"]
									})
								] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico del empadronamiento e inspección de campo",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS_EMPADRONAMIENTO,
								nombreArchivo: `historico-empadronamiento-${decodedCodigo}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setFeedback({
										kind: "success",
										text: `Se restauró la versión ${n}.`
									});
								}
							})
						})
					})
				]
			}),
			ver && /* @__PURE__ */ jsxs(Modal, {
				abierto: true,
				onCerrar: () => setVer(null),
				ancho: "lg",
				titulo: `Empadronamiento del ${fecha(ver.form.fechaInicio)}`,
				descripcion: `Realizado por ${ver.form.realizadoPor} · registrado por ${ver.registradoPor} el ${fechaHora(ver.registradoEl)}`,
				children: [/* @__PURE__ */ jsx("dl", {
					className: "grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2",
					children: [
						["Ocupante", ver.form.ocupante],
						["DNI / documento", ver.form.documentoOcupante],
						["Condición", ver.form.condicionOcupante],
						["Características", ver.form.caracteristicasPredio],
						["Edificaciones", ver.form.edificaciones],
						["Mejoras", ver.form.mejoras],
						["Observaciones", ver.form.observaciones]
					].map(([k, v]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-xs font-semibold text-muted-foreground",
						children: k
					}), /* @__PURE__ */ jsx("dd", { children: v || "Sin información" })] }, k))
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-4 space-y-3",
					children: [/* @__PURE__ */ jsx(CampoFoto, {
						soloLectura: true,
						etiqueta: "Fotos de la inspección",
						contexto: {
							...fotoBase,
							seccion: "Ficha de campo",
							registro: ver.id,
							campo: "Fotos de la inspección"
						}
					}), /* @__PURE__ */ jsx(CampoFoto, {
						soloLectura: true,
						etiqueta: "Fotos del acta",
						contexto: {
							...fotoBase,
							seccion: "Acta",
							registro: ver.id,
							campo: "Fotos del acta"
						}
					})]
				})]
			}),
			anular && /* @__PURE__ */ jsx(MotivoModal, {
				titulo: "Anular empadronamiento",
				descripcion: "Queda en la tabla como anulado; su acta y sus fotos se conservan.",
				accion: "Anular",
				destructiva: true,
				onCerrar: () => setAnular(null),
				onConfirmar: (motivo) => {
					anularRealizacion(anular, motivo);
					setAnular(null);
				}
			})
		]
	});
}
/**
* Acta de empadronamiento en blanco para llenar a mano en campo: lleva impresos su número, el proyecto y
* los datos del predio (código, expediente, sujeto pasivo); lo que se encuentra en campo queda en líneas.
*/
function createActaEmpadronamientoWordBlob({ numero, predio, predioCode, projectLabel }) {
	const linea = "<span class=\"blank\">&nbsp;</span>";
	const renglones = (n) => "<div class=\"line\">&nbsp;</div>".repeat(n);
	const casilla = (texto) => `<span class="check">&#9744; ${texto}</span>`;
	const html = `<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
  <head>
    <meta charset="UTF-8" />
    <title>Acta de empadronamiento</title>
    <style>
      @page { size: A4; margin: 2cm 2.2cm; }
      body { font-family: Arial, sans-serif; color: rgb(17, 24, 39); font-size: 10.5pt; line-height: 1.45; }
      h1 { margin: 18px 0 6px; text-align: center; font-size: 15pt; }
      h2 { margin: 18px 0 8px; border-bottom: 1px solid rgb(200, 16, 46); padding-bottom: 4px; color: rgb(139, 26, 26); font-size: 11pt; }
      p { margin: 7px 0; text-align: justify; }
      .institution { text-align: center; font-size: 9pt; font-weight: bold; }
      .subtitle { margin-bottom: 18px; text-align: center; font-size: 9pt; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; }
      th, td { border: 1px solid rgb(209, 213, 219); padding: 6px 8px; vertical-align: top; }
      th { width: 32%; background: rgb(243, 244, 246); text-align: left; font-weight: bold; }
      .signature td { height: 82px; border: 0; padding: 42px 10px 0; text-align: center; vertical-align: bottom; }
      .signature-line { border-top: 1px solid rgb(17, 24, 39); padding-top: 5px; }
      .footer { margin-top: 24px; color: rgb(75, 85, 99); text-align: center; font-size: 8pt; }
      .blank { display: inline-block; min-width: 160px; border-bottom: 1px solid rgb(17, 24, 39); }
      .line { border-bottom: 1px solid rgb(17, 24, 39); height: 22px; }
      .check { margin-right: 14px; white-space: nowrap; }
      td.fill { height: 26px; }
    </style>
  </head>
  <body>
    <div class="institution">MINISTERIO DE TRANSPORTES Y COMUNICACIONES</div>
    <h1>ACTA DE EMPADRONAMIENTO E INSPECCIÓN DE CAMPO</h1>
    <div class="subtitle">${escapeActaHtml(numero)} · Predio ${escapeActaHtml(predioCode)}</div>

    <p>
      En la localidad de ${linea}, siendo las ${linea} horas del día ${linea}, se realizó el
      empadronamiento y la inspección de campo del predio identificado con código
      <b>${escapeActaHtml(predioCode)}</b>, del proyecto <b>${escapeActaHtml(projectLabel)}</b>.
      La presente acta deja constancia de la información encontrada durante la diligencia.
    </p>

    <h2>1. Identificación del predio</h2>
    <table>
      <tr><th>Proyecto</th><td>${escapeActaHtml(projectLabel)}</td></tr>
      <tr><th>Código del predio</th><td>${escapeActaHtml(predioCode)}</td></tr>
      <tr><th>Expediente</th><td>${escapeActaHtml(predio?.exp || "No consignado")}</td></tr>
      <tr><th>Sujeto pasivo</th><td>${escapeActaHtml(predio?.suj || "No consignado")}</td></tr>
      <tr><th>Tipo de predio</th><td>${escapeActaHtml(predio?.tipo || predio?.tp || "No consignado")}</td></tr>
      <tr><th>Área afectada</th><td>${escapeActaHtml(predio?.area || predio?.m2 || "No consignada")} m²</td></tr>
      <tr><th>Ubicación</th><td>${escapeActaHtml(predio?.ciudad || "No consignada")}</td></tr>
    </table>

    <h2>2. Diligencia</h2>
    <table>
      <tr><th>Fecha de inicio</th><td class="fill"></td></tr>
      <tr><th>Fecha de término</th><td class="fill"></td></tr>
      <tr><th>Brigada</th><td class="fill"></td></tr>
    </table>

    <h2>3. Ocupante encontrado</h2>
    <table>
      <tr><th>Nombres y apellidos</th><td class="fill"></td></tr>
      <tr><th>DNI / documento</th><td class="fill"></td></tr>
      <tr><th>Condición</th><td>${casilla("Propietario")}${casilla("Poseedor")}${casilla("Inquilino")}${casilla("Sin ocupante")}${casilla("Otro")}</td></tr>
      <tr><th>Teléfono / correo</th><td class="fill"></td></tr>
    </table>

    <h2>4. Inspección del predio</h2>
    <p><b>Características del predio</b></p>
    ${renglones(3)}
    <p><b>Edificaciones</b> ${casilla("No hay")}</p>
    ${renglones(3)}
    <p><b>Mejoras (cultivos, cercos, obras complementarias)</b> ${casilla("No hay")}</p>
    ${renglones(3)}
    <p><b>Observaciones de campo</b></p>
    ${renglones(4)}

    <p>
      Leída la presente acta y encontrándola conforme, los participantes la suscriben para constancia
      de la diligencia de empadronamiento e inspección de campo realizada.
    </p>

    <table class="signature">
      <tr>
        <td><div class="signature-line">Nombre: ${linea}<br />DNI: ${linea}<br />Responsable técnico</div></td>
        <td><div class="signature-line">Nombre: ${linea}<br />DNI: ${linea}<br />Responsable legal</div></td>
        <td><div class="signature-line">Nombre: ${linea}<br />DNI: ${linea}<br />Ocupante / sujeto pasivo</div></td>
      </tr>
    </table>

    <div class="footer">${escapeActaHtml(numero)} · Predio ${escapeActaHtml(predioCode)} · Expediente ${escapeActaHtml(predio?.exp || "sin código")} · Emitida en blanco el ${escapeActaHtml(todayInPeru())} por el Sistema de Gestión Predial. Llene a mano en campo, firme y súbala firmada en el campo «Acta de empadronamiento firmada».</div>
  </body>
</html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function escapeActaHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
//#endregion
export { EmpadronamientoInspeccionCampoPage as component };
