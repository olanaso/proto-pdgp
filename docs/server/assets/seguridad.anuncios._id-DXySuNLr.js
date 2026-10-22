import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { o as useHistorial, u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { C as puedeRedactar, D as urlBotonValida, E as textoPlano, O as useAnuncios, a as claveHistorialAnuncio, c as destinatarios, d as estadoDe, f as guardarAnuncio, h as isoLocal, i as audienciaTexto, m as idAnuncio, n as alcanceTexto, p as guardarArchivoAnuncio, t as NOMBRE_ESTADO, u as esImagen, v as leerArchivoAnuncio, w as restaurarAnuncio, x as pesoArchivo } from "./anuncios-CchLukSd.js";
import { i as ModalAnuncio, r as ImagenAnuncio } from "./Anuncio-BIz5COtU.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as Route$1 } from "./seguridad.anuncios._id-BNnW2dDo.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as EditorTexto } from "./EditorTexto-B1bwnZmh.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Eye, FileText, History, Megaphone, Save, Send, Trash2 } from "lucide-react";
//#region src/routes/seguridad.anuncios.$id.tsx?tsr-split=component
var MAX_TITULO = 120;
var PERFILES = Object.keys(ROLES);
/** Nombre legible de cada campo en el histórico. */
var ETIQUETAS = {
	titulo: "Título",
	mensaje: "Mensaje",
	audiencia: "Audiencia",
	perfiles: "Perfiles",
	alcance: "Alcance",
	prioridad: "Prioridad",
	mostrarDesde: "Mostrar desde",
	ocultarEl: "Ocultar el",
	copiaPorCorreo: "Copia por correo",
	autor: "Autor",
	creadoEl: "Creado el",
	modificadoEl: "Modificado el",
	publicadoEl: "Publicado el",
	archivadoEl: "Archivado el",
	portada: "Imagen destacada",
	adjuntos: "Archivo adjunto",
	boton: "Botón de acción",
	texto: "Texto",
	url: "Enlace",
	emergente: "Ventana emergente al ingresar",
	nombre: "Nombre",
	tipo: "Tipo",
	tamano: "Tamaño (bytes)"
};
/** Archivos que se pueden adjuntar al anuncio. */
var ACEPTA_ADJUNTOS = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt,image/*";
var claseArchivo = `${controlClase} h-auto py-1.5 file:mr-3 file:h-6 file:rounded-sm file:border-0 file:bg-primary-soft file:px-2 file:text-xs file:font-semibold file:text-primary-dark`;
function nuevo(autor) {
	const ahora = isoLocal(/* @__PURE__ */ new Date());
	return {
		id: idAnuncio(),
		titulo: "",
		mensaje: "",
		audiencia: "usuarios",
		perfiles: [],
		alcance: "todos",
		prioridad: "normal",
		mostrarDesde: "",
		ocultarEl: "",
		copiaPorCorreo: false,
		autor,
		creadoEl: ahora,
		modificadoEl: ahora,
		adjuntos: [],
		emergente: true
	};
}
function EditorAnuncioPage() {
	const { id } = Route$1.useParams();
	const { anuncios } = useAnuncios();
	const rol = useRol();
	const existente = anuncios.find((a) => a.id === id);
	const [listo, setListo] = useState(false);
	useEffect(() => setListo(true), []);
	if (!listo) return /* @__PURE__ */ jsx(AppShell, { children: null });
	if (id !== "nuevo" && !existente) return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Megaphone,
			titulo: "Anuncio no encontrado",
			migas: [{ texto: "Seguridad y configuración" }, {
				texto: "Anuncios",
				to: "/seguridad/anuncios"
			}]
		}),
		/* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: "El anuncio no existe en este navegador o fue eliminado."
		}),
		/* @__PURE__ */ jsx(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/seguridad/anuncios",
				children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Volver a anuncios"]
			})
		})
	] });
	return /* @__PURE__ */ jsx(Formulario, {
		inicial: existente ?? nuevo(ROLES[rol]),
		esNuevo: !existente,
		soloLectura: !puedeRedactar(rol)
	}, id);
}
function Formulario({ inicial, esNuevo, soloLectura }) {
	const navigate = useNavigate();
	const rol = useRol();
	const claveHistorial = claveHistorialAnuncio(inicial.id);
	const versiones = useHistorial(claveHistorial);
	const [a, setA] = useState(inicial);
	const programar = Boolean(a.mostrarDesde);
	const ocultar = Boolean(a.ocultarEl);
	const [errores, setErrores] = useState({});
	const [previa, setPrevia] = useState(false);
	const [subiendo, setSubiendo] = useState(false);
	const [errorArchivo, setErrorArchivo] = useState("");
	const cambiar = (k, v) => setA((x) => ({
		...x,
		[k]: v
	}));
	const total = useMemo(() => destinatarios(a), [a]);
	const palabras = textoPlano(a.mensaje).split(" ").filter(Boolean).length;
	const publicado = Boolean(inicial.publicadoEl);
	const archivado = Boolean(inicial.archivadoEl);
	const validar = () => {
		const e = {};
		if (!a.titulo.trim()) e.titulo = "Escriba el título del anuncio.";
		if (!textoPlano(a.mensaje) && !/<img/i.test(a.mensaje) && !a.portada) e.mensaje = "Escriba el mensaje o ponga una imagen.";
		const texto = a.boton?.texto.trim() ?? "";
		const url = a.boton?.url.trim() ?? "";
		if (texto && !url) e.botonUrl = "Indique a dónde lleva el botón.";
		if (url && !texto) e.botonTexto = "Escriba el texto del botón.";
		if (url && !urlBotonValida(url)) e.botonUrl = "Use una dirección https://, un correo mailto: o una pantalla del sistema (/…).";
		const desde = programar && a.mostrarDesde ? new Date(a.mostrarDesde) : /* @__PURE__ */ new Date();
		if (ocultar && a.ocultarEl && new Date(a.ocultarEl) <= desde) e.ocultarEl = "Debe ser posterior a la fecha en que se muestra.";
		setErrores(e);
		return Object.keys(e).length === 0;
	};
	const enviar = (publicar) => {
		if (!validar()) return;
		const final = guardarAnuncio({
			...a,
			titulo: a.titulo.trim(),
			mostrarDesde: programar ? a.mostrarDesde : "",
			ocultarEl: ocultar ? a.ocultarEl : "",
			boton: a.boton?.texto.trim() && a.boton.url.trim() ? {
				texto: a.boton.texto.trim(),
				url: a.boton.url.trim()
			} : void 0
		}, publicar);
		if (publicar && final.copiaPorCorreo) (final.audiencia === "sujetos_pasivos" ? [`Sujetos pasivos · ${alcanceTexto(final.alcance)}`] : (final.perfiles.length ? final.perfiles : ["todos"]).map((r) => r === "todos" ? "Usuarios · todos los perfiles" : `Usuarios · ${ROLES[r]}`)).forEach((destinatario) => registrarEnvio({
			proyecto: "mtc",
			predio: final.id,
			paso: "seguridad-anuncios",
			canal: "Correo",
			destinatario,
			documento: final.titulo,
			detalle: "Copia del anuncio; sin servidor de correo queda registrada, no enviada."
		}, {
			modulo: 8,
			entidad: "anuncio"
		}));
		navigate({
			to: "/seguridad/anuncios",
			search: { q: final.titulo }
		});
	};
	const bloqueado = soloLectura || archivado;
	/** Sube los archivos elegidos; devuelve los que se guardaron. */
	const subir = async (archivos) => {
		setSubiendo(true);
		setErrorArchivo("");
		const listos = [];
		for (const f of archivos) try {
			listos.push(await guardarArchivoAnuncio(f));
		} catch (e) {
			setErrorArchivo(e.message);
		}
		setSubiendo(false);
		return listos;
	};
	const restaurar = (registro, n) => {
		const final = restaurarAnuncio(registro, n);
		setA(final);
		setErrores({});
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Megaphone,
			titulo: esNuevo ? "Nuevo anuncio" : `Editar anuncio`,
			descripcion: esNuevo ? "Redacte el aviso, elija a quién va dirigido y cuándo se muestra." : `${inicial.titulo} · ${NOMBRE_ESTADO[estadoDe(inicial)]}`,
			migas: [
				{ texto: "Seguridad y configuración" },
				{
					texto: "Anuncios",
					to: "/seguridad/anuncios"
				},
				{ texto: esNuevo ? "Nuevo" : "Editar" }
			]
		}),
		soloLectura && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Solo el Administrador y el Coordinador redactan anuncios. Este perfil puede leerlo, no cambiarlo."
		}),
		archivado && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Este anuncio está archivado: queda como registro y no se edita. Use «Copiar como borrador» para reutilizarlo."
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "anuncio",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "anuncio",
						children: "Anuncio"
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
					value: "anuncio",
					children: /* @__PURE__ */ jsxs("form", {
						onSubmit: (e) => {
							e.preventDefault();
							enviar(true);
						},
						noValidate: true,
						children: [/* @__PURE__ */ jsxs("fieldset", {
							disabled: bloqueado,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Destinatarios",
									children: [/* @__PURE__ */ jsxs(FormGrid, {
										columnas: 1,
										children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Audiencia",
												obligatorio: true,
												children: /* @__PURE__ */ jsx("div", {
													className: "flex flex-wrap gap-4 pt-2 text-sm",
													role: "radiogroup",
													"aria-label": "Audiencia",
													children: [["usuarios", "Usuarios del sistema"], ["sujetos_pasivos", "Sujetos pasivos"]].map(([v, t]) => /* @__PURE__ */ jsxs("label", {
														className: "flex cursor-pointer items-center gap-2",
														children: [/* @__PURE__ */ jsx("input", {
															type: "radio",
															name: "audiencia",
															checked: a.audiencia === v,
															onChange: () => cambiar("audiencia", v),
															className: "accent-primary"
														}), t]
													}, v))
												})
											}),
											a.audiencia === "usuarios" && /* @__PURE__ */ jsx(FormField, {
												etiqueta: "Perfiles",
												ayuda: "Sin marcar ninguno, llega a todos los perfiles.",
												children: /* @__PURE__ */ jsx("div", {
													className: "grid grid-cols-1 gap-2 pt-2 text-sm sm:grid-cols-2",
													children: PERFILES.map((r) => /* @__PURE__ */ jsxs("label", {
														className: "flex cursor-pointer items-center gap-2",
														children: [/* @__PURE__ */ jsx("input", {
															type: "checkbox",
															checked: a.perfiles.includes(r),
															onChange: (e) => cambiar("perfiles", e.target.checked ? [...a.perfiles, r] : a.perfiles.filter((x) => x !== r)),
															className: "accent-primary"
														}), ROLES[r]]
													}, r))
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Alcance",
												obligatorio: true,
												children: (fid) => /* @__PURE__ */ jsxs("select", {
													id: fid,
													value: a.alcance,
													onChange: (e) => cambiar("alcance", e.target.value),
													className: controlClase,
													children: [/* @__PURE__ */ jsx("option", {
														value: "todos",
														children: "Todos los proyectos"
													}), proyectos.map((p) => /* @__PURE__ */ jsxs("option", {
														value: p.id,
														children: [
															p.codigo,
															" · ",
															alcanceTexto(p.id)
														]
													}, p.id))]
												})
											})
										]
									}), /* @__PURE__ */ jsxs("p", {
										className: "mt-3 rounded-md bg-background px-3 py-2 text-sm",
										children: [
											"Llegará a ",
											/* @__PURE__ */ jsx("b", {
												className: "tabular-nums",
												children: total
											}),
											" ",
											a.audiencia === "usuarios" ? "usuarios" : "sujetos pasivos",
											": ",
											audienciaTexto(a),
											" ",
											"· ",
											alcanceTexto(a.alcance),
											".",
											a.audiencia === "sujetos_pasivos" && a.alcance === "todos" && " Se mostrará a los sujetos pasivos de todos los proyectos."
										]
									})]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Contenido",
									children: /* @__PURE__ */ jsxs(FormGrid, {
										columnas: 1,
										children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Título",
												obligatorio: true,
												error: errores.titulo,
												ayuda: `${a.titulo.length} de ${MAX_TITULO} caracteres`,
												children: (fid) => /* @__PURE__ */ jsx("input", {
													id: fid,
													value: a.titulo,
													maxLength: MAX_TITULO,
													onChange: (e) => cambiar("titulo", e.target.value),
													"aria-invalid": Boolean(errores.titulo) || void 0,
													className: controlClase
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Prioridad",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap gap-4 pt-2 text-sm",
													role: "radiogroup",
													"aria-label": "Prioridad",
													children: [/* @__PURE__ */ jsxs("label", {
														className: "flex cursor-pointer items-center gap-2",
														children: [/* @__PURE__ */ jsx("input", {
															type: "radio",
															name: "prioridad",
															checked: a.prioridad === "normal",
															onChange: () => cambiar("prioridad", "normal"),
															className: "accent-primary"
														}), "Normal"]
													}), /* @__PURE__ */ jsxs("label", {
														className: "flex cursor-pointer items-center gap-2",
														children: [/* @__PURE__ */ jsx("input", {
															type: "radio",
															name: "prioridad",
															checked: a.prioridad === "importante",
															onChange: () => cambiar("prioridad", "importante"),
															className: "accent-primary"
														}), "Importante: se muestra primero, en rojo"]
													})]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Mensaje",
												obligatorio: true,
												error: errores.mensaje,
												ayuda: `Recuento de palabras: ${palabras}`,
												children: (fid) => /* @__PURE__ */ jsx(EditorTexto, {
													id: fid,
													valor: a.mensaje,
													onCambio: (html) => cambiar("mensaje", html),
													invalido: Boolean(errores.mensaje),
													imagenes: {
														subir: guardarArchivoAnuncio,
														leer: leerArchivoAnuncio
													}
												})
											})
										]
									})
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Imágenes y archivos",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-3 text-xs text-muted-foreground",
											children: "La imagen destacada encabeza la ventana del anuncio. Los adjuntos se muestran al pie: las imágenes en galería y los documentos para descargar (hasta 10 MB cada uno). Para poner una imagen dentro del texto use «Insertar imagen» en el mensaje."
										}),
										/* @__PURE__ */ jsxs(FormGrid, {
											columnas: 1,
											children: [/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Imagen destacada",
												ancho: "doble",
												children: (fid) => a.portada ? /* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap items-end gap-3",
													children: [/* @__PURE__ */ jsx(ImagenAnuncio, {
														archivo: a.portada,
														className: "h-40 w-full max-w-md rounded-md border border-border object-cover"
													}), /* @__PURE__ */ jsxs(Button, {
														type: "button",
														variant: "outline",
														size: "sm",
														onClick: () => cambiar("portada", void 0),
														children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar imagen"]
													})]
												}) : /* @__PURE__ */ jsx("input", {
													id: fid,
													type: "file",
													accept: "image/*",
													disabled: subiendo,
													className: claseArchivo,
													onChange: async (e) => {
														const f = e.target.files?.[0];
														e.target.value = "";
														if (!f) return;
														if (!f.type.startsWith("image/")) {
															setErrorArchivo(`«${f.name}» no es una imagen.`);
															return;
														}
														const [listo] = await subir([f]);
														if (listo) cambiar("portada", listo);
													}
												})
											}), /* @__PURE__ */ jsx(FormField, {
												etiqueta: "Archivos e imágenes adjuntos",
												ancho: "doble",
												ayuda: "PDF, Word, Excel, PowerPoint, ZIP o imágenes. Puede elegir varios a la vez.",
												children: (fid) => /* @__PURE__ */ jsxs("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ jsx("input", {
														id: fid,
														type: "file",
														multiple: true,
														accept: ACEPTA_ADJUNTOS,
														disabled: subiendo,
														className: claseArchivo,
														onChange: async (e) => {
															const fs = Array.from(e.target.files ?? []);
															e.target.value = "";
															if (!fs.length) return;
															const listos = await subir(fs);
															setA((x) => ({
																...x,
																adjuntos: [...x.adjuntos ?? [], ...listos]
															}));
														}
													}), (a.adjuntos ?? []).length > 0 && /* @__PURE__ */ jsx("ul", {
														className: "divide-y divide-border rounded-md border border-border",
														children: (a.adjuntos ?? []).map((ad) => /* @__PURE__ */ jsxs("li", {
															className: "flex items-center gap-3 px-3 py-2",
															children: [
																esImagen(ad) ? /* @__PURE__ */ jsx(ImagenAnuncio, {
																	archivo: ad,
																	className: "size-10 shrink-0 rounded-sm object-cover"
																}) : /* @__PURE__ */ jsx(FileText, {
																	size: 22,
																	className: "shrink-0 text-primary-dark",
																	"aria-hidden": true
																}),
																/* @__PURE__ */ jsxs("span", {
																	className: "min-w-0 flex-1",
																	children: [/* @__PURE__ */ jsx("span", {
																		className: "block truncate text-sm text-foreground",
																		children: ad.nombre
																	}), /* @__PURE__ */ jsxs("span", {
																		className: "block text-xs text-muted-foreground",
																		children: [
																			esImagen(ad) ? "Imagen" : "Documento",
																			" ·",
																			" ",
																			pesoArchivo(ad.tamano)
																		]
																	})]
																}),
																/* @__PURE__ */ jsxs(Button, {
																	type: "button",
																	variant: "outline",
																	size: "sm",
																	"aria-label": `Quitar ${ad.nombre}`,
																	onClick: () => setA((x) => ({
																		...x,
																		adjuntos: (x.adjuntos ?? []).filter((y) => y.id !== ad.id)
																	})),
																	children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar"]
																})
															]
														}, ad.id))
													})]
												})
											})]
										}),
										subiendo && /* @__PURE__ */ jsx("p", {
											className: "mt-2 text-sm text-muted-foreground",
											children: "Guardando archivos…"
										}),
										errorArchivo && /* @__PURE__ */ jsx("div", {
											className: "mt-2",
											children: /* @__PURE__ */ jsx(Aviso, {
												tipo: "error",
												onCerrar: () => setErrorArchivo(""),
												children: errorArchivo
											})
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Ventana del anuncio",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Ventana emergente",
											ancho: "doble",
											ayuda: "Al ingresar al portal (o a la consulta del sujeto pasivo) se abre el anuncio sin leer en una ventana, una vez por sesión.",
											children: (fid) => /* @__PURE__ */ jsxs("label", {
												htmlFor: fid,
												className: "flex cursor-pointer items-center gap-2 pt-2 text-sm",
												children: [/* @__PURE__ */ jsx("input", {
													id: fid,
													type: "checkbox",
													checked: a.emergente !== false,
													onChange: (e) => cambiar("emergente", e.target.checked),
													className: "accent-primary"
												}), "Mostrar como ventana emergente al ingresar"]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Texto del botón",
											error: errores.botonTexto,
											ayuda: "Opcional. Ej.: Ver el cronograma",
											children: (fid) => /* @__PURE__ */ jsx("input", {
												id: fid,
												value: a.boton?.texto ?? "",
												maxLength: 40,
												onChange: (e) => cambiar("boton", {
													texto: e.target.value,
													url: a.boton?.url ?? ""
												}),
												className: controlClase
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Enlace del botón",
											error: errores.botonUrl,
											ayuda: "https://…, mailto:… o una pantalla del sistema, como /anuncios",
											children: (fid) => /* @__PURE__ */ jsx("input", {
												id: fid,
												value: a.boton?.url ?? "",
												onChange: (e) => cambiar("boton", {
													texto: a.boton?.texto ?? "",
													url: e.target.value
												}),
												className: controlClase
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Publicación",
									children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Mostrar desde",
											error: errores.mostrarDesde,
											ayuda: "Vacío: se muestra al publicar.",
											children: (fid) => /* @__PURE__ */ jsx("input", {
												id: fid,
												type: "datetime-local",
												value: a.mostrarDesde,
												onChange: (e) => cambiar("mostrarDesde", e.target.value),
												className: controlClase
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Ocultar el",
											error: errores.ocultarEl,
											ayuda: "Vacío: se muestra hasta archivarlo.",
											children: (fid) => /* @__PURE__ */ jsx("input", {
												id: fid,
												type: "datetime-local",
												value: a.ocultarEl,
												onChange: (e) => cambiar("ocultarEl", e.target.value),
												className: controlClase
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Copia por correo",
											ancho: "doble",
											ayuda: "Sin servidor de correo configurado en Interoperabilidad (M9), la copia queda registrada, no enviada.",
											children: (fid) => /* @__PURE__ */ jsxs("label", {
												htmlFor: fid,
												className: "flex cursor-pointer items-center gap-2 pt-2 text-sm",
												children: [/* @__PURE__ */ jsx("input", {
													id: fid,
													type: "checkbox",
													checked: a.copiaPorCorreo,
													onChange: (e) => cambiar("copiaPorCorreo", e.target.checked),
													className: "accent-primary"
												}), "Enviar una copia por correo a los destinatarios"]
											})
										})
									] }), /* @__PURE__ */ jsx("div", {
										className: "mt-3",
										children: /* @__PURE__ */ jsx(HistorialEnvios, {
											proyecto: "mtc",
											predio: a.id,
											paso: "seguridad-anuncios"
										})
									})]
								})
							]
						}), /* @__PURE__ */ jsxs(FormActions, { children: [
							/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: () => navigate({ to: "/seguridad/anuncios" }),
								children: bloqueado ? "Volver" : "Cancelar"
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setPrevia(true),
								children: [/* @__PURE__ */ jsx(Eye, {}), " Vista previa"]
							}),
							!bloqueado && !publicado && /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => enviar(false),
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
							}),
							!bloqueado && /* @__PURE__ */ jsxs(Button, {
								type: "submit",
								children: [
									/* @__PURE__ */ jsx(Send, {}),
									" ",
									publicado ? "Guardar cambios" : "Publicar anuncio"
								]
							})
						] })]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico del anuncio",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: claveHistorial,
							etiquetas: ETIQUETAS,
							nombreArchivo: `historico-${claveHistorial}`,
							puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
							onRestaurar: restaurar
						})
					})
				})
			]
		}),
		/* @__PURE__ */ jsx(ModalAnuncio, {
			anuncio: a,
			abierto: previa,
			onCerrar: () => setPrevia(false),
			meta: `Vista previa · ${audienciaTexto(a)} · ${alcanceTexto(a.alcance)}`,
			pie: /* @__PURE__ */ jsx(Button, {
				type: "button",
				onClick: () => setPrevia(false),
				children: "Cerrar vista previa"
			})
		})
	] });
}
//#endregion
export { EditorAnuncioPage as component };
