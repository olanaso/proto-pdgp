import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { T as Confirmar } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { g as lectorActual } from "./anuncios-CchLukSd.js";
import { t as CuerpoAnuncio } from "./Anuncio-BIz5COtU.js";
import { C as listarVistas, S as useAyudas, _ as puedePublicarAyuda, d as documentoDeEnlace, f as duracionTexto, g as publicarAyuda, h as idAyuda, i as ayudaDeVista, m as guardarAyuda, n as TOPE_PDF, t as NOMBRE_ESTADO_AYUDA, u as documentoDeArchivo, v as puedeRedactarAyuda, w as nombreDeVista, x as urlValida } from "./manuales-BLjtkE55.js";
import { n as ReproductorVideo, t as Route$1 } from "./seguridad.manuales._id-ChMWGQFt.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as EditorTexto } from "./EditorTexto-B1bwnZmh.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowLeft, ArrowUp, CircleHelp, FileUp, Play, Plus, Save, Send, Trash2 } from "lucide-react";
//#region src/routes/seguridad.manuales.$id.tsx?tsr-split=component
/** Elementos que el tutorial puede señalar sin escribir un selector a mano. */
var SELECTORES = [
	{
		valor: "[data-ayuda=\"encabezado\"]",
		texto: "Encabezado de la pantalla"
	},
	{
		valor: "[data-ayuda=\"filtros\"]",
		texto: "Búsqueda y filtros"
	},
	{
		valor: "[data-ayuda=\"tabla\"]",
		texto: "Tabla de registros"
	},
	{
		valor: "main form",
		texto: "Formulario"
	},
	{
		valor: "[role=\"tablist\"]",
		texto: "Pestañas"
	},
	{
		valor: "main table",
		texto: "Primera tabla"
	}
];
var ETIQUETAS = {
	vista: "Vista",
	titulo: "Título",
	estado: "Estado",
	perfiles: "Perfiles",
	manual: "Manual",
	contenido: "Contenido del manual",
	pdf: "PDF del manual",
	videos: "Video",
	tutorial: "Tutorial",
	pasos: "Paso",
	selector: "Elemento",
	texto: "Texto",
	enlaces: "Enlace de apoyo",
	url: "Enlace",
	nombre: "Nombre",
	descripcion: "Descripción",
	duracion: "Duración (s)",
	subidoEl: "Subido el",
	subidoPor: "Subido por",
	version: "Versión",
	actualizadoEl: "Actualizado el",
	actualizadoPor: "Actualizado por"
};
function vacia(vista, autor) {
	const ahora = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: idAyuda(),
		vista,
		titulo: vista ? `Cómo usar: ${nombreDeVista(vista)}` : "",
		manual: null,
		videos: [],
		tutorial: null,
		perfiles: [],
		enlaces: [],
		estado: "BORRADOR",
		autor,
		creadoEl: ahora,
		modificadoEl: ahora
	};
}
function EditorAyudaPage() {
	const { id } = Route$1.useParams();
	const { vista } = Route$1.useSearch();
	const navigate = useNavigate();
	const ayudas = useAyudas();
	const rol = useRol();
	const [listo, setListo] = useState(false);
	useEffect(() => setListo(true), []);
	const existente = ayudas.find((a) => a.id === id);
	const previa = id === "nuevo" && vista ? ayudaDeVista(ayudas, vista) : void 0;
	useEffect(() => {
		if (listo && previa) navigate({
			to: "/seguridad/manuales/$id",
			params: { id: previa.id },
			replace: true
		});
	}, [
		listo,
		previa,
		navigate
	]);
	if (!listo || previa) return /* @__PURE__ */ jsx(AppShell, { children: null });
	if (id !== "nuevo" && !existente) return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: CircleHelp,
			titulo: "Ayuda no encontrada",
			migas: [{ texto: "Seguridad y configuración" }, {
				texto: "Ayuda",
				to: "/seguridad/manuales"
			}]
		}),
		/* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: "La ayuda no existe en este navegador o fue eliminada."
		}),
		/* @__PURE__ */ jsx(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/seguridad/manuales",
				children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Volver a la ayuda"]
			})
		})
	] });
	return /* @__PURE__ */ jsx(Formulario, {
		inicial: existente ?? vacia(vista ?? "", ROLES[rol]),
		esNuevo: !existente,
		puedeEditar: puedeRedactarAyuda(rol),
		puedePublicar: puedePublicarAyuda(rol),
		rol
	}, id);
}
function Formulario({ inicial, esNuevo, puedeEditar, puedePublicar, rol }) {
	const navigate = useNavigate();
	const router = useRouter();
	const [a, setA] = useState(inicial);
	const [guardado, setGuardado] = useState(!esNuevo);
	const [mensaje, setMensaje] = useState(null);
	const [errores, setErrores] = useState({});
	const [quitar, setQuitar] = useState(null);
	const [filtroVista, setFiltroVista] = useState("");
	const [nuevoVideo, setNuevoVideo] = useState({
		nombre: "",
		url: "",
		descripcion: "",
		minutos: ""
	});
	const [errorVideo, setErrorVideo] = useState("");
	const [nuevoEnlace, setNuevoEnlace] = useState({
		texto: "",
		url: ""
	});
	const cambiar = (k, v) => setA((x) => ({
		...x,
		[k]: v
	}));
	const vistas = useMemo(() => listarVistas(Object.keys(router.routesByPath)), [router]);
	const visibles = useMemo(() => {
		const t = filtroVista.trim().toLocaleLowerCase("es-PE");
		return vistas.filter((v) => !t || `${v.nombre} ${v.moduloNombre} ${v.ruta}`.toLocaleLowerCase("es-PE").includes(t) || v.ruta === a.vista);
	}, [
		vistas,
		filtroVista,
		a.vista
	]);
	const porModulo = useMemo(() => {
		const m = /* @__PURE__ */ new Map();
		for (const v of visibles) m.set(v.moduloNombre, [...m.get(v.moduloNombre) ?? [], v]);
		return [...m.entries()];
	}, [visibles]);
	const ahora = () => (/* @__PURE__ */ new Date()).toISOString();
	const quien = lectorActual();
	const validar = (publicar) => {
		const e = {};
		if (!a.vista) e.vista = "Elija la vista a la que pertenece.";
		if (!a.titulo.trim()) e.titulo = "Escriba el título de la ayuda.";
		if (publicar && !a.manual?.contenido.trim() && !a.manual?.pdf && a.videos.length === 0 && !a.tutorial?.pasos.length) e.contenido = "Para publicar, agregue al menos un manual, un video o un tutorial.";
		setErrores(e);
		return Object.keys(e).length === 0;
	};
	const enviar = (publicar) => {
		if (!validar(publicar)) {
			setMensaje({
				tipo: "error",
				texto: "Revise los campos marcados."
			});
			return;
		}
		const base = {
			...a,
			titulo: a.titulo.trim()
		};
		const accion = guardado ? "Modificó la ayuda" : "Creó la ayuda";
		const g = publicar ? publicarAyuda(guardarAyuda(base, accion)) : guardarAyuda(base, accion);
		setA(g);
		setGuardado(true);
		setMensaje({
			tipo: "exito",
			texto: publicar ? "Ayuda publicada: ya la ven los usuarios en esa pantalla." : "Borrador guardado."
		});
		if (esNuevo) navigate({
			to: "/seguridad/manuales/$id",
			params: { id: g.id },
			replace: true
		});
	};
	const setManual = (p) => cambiar("manual", {
		contenido: "",
		...a.manual,
		...p,
		actualizadoEl: ahora(),
		actualizadoPor: quien
	});
	async function cargarPdf(file) {
		if (!file) return;
		try {
			const doc = await documentoDeArchivo(file, a.manual?.pdf);
			setManual({ pdf: doc });
			setMensaje(null);
		} catch (e) {
			setMensaje({
				tipo: "error",
				texto: e.message
			});
		}
	}
	function agregarVideo() {
		const n = nuevoVideo;
		if (!n.nombre.trim()) return setErrorVideo("Escriba el nombre del video.");
		if (!urlValida(n.url)) return setErrorVideo("El enlace debe empezar con http:// o https://.");
		const minutos = Number(n.minutos.replace(",", "."));
		const v = {
			...documentoDeEnlace(n.nombre.trim(), n.url.trim(), minutos > 0 ? Math.round(minutos * 60) : void 0),
			descripcion: n.descripcion.trim()
		};
		cambiar("videos", [...a.videos, v]);
		setNuevoVideo({
			nombre: "",
			url: "",
			descripcion: "",
			minutos: ""
		});
		setErrorVideo("");
	}
	const pasos = a.tutorial?.pasos ?? [];
	const setPasos = (p) => cambiar("tutorial", {
		pasos: p,
		actualizadoEl: ahora(),
		actualizadoPor: quien
	});
	const mover = (i, d) => {
		const j = i + d;
		if (j < 0 || j >= pasos.length) return;
		const copia = [...pasos];
		[copia[i], copia[j]] = [copia[j], copia[i]];
		setPasos(copia);
	};
	const probar = () => {
		const url = a.vista.replace("$projectId", "jauja").replace("$codigo", "AERO-JAUJA-PR-0567T");
		window.open(`${url}?probar=${a.id}`, "_blank", "noopener");
	};
	const sol = !puedeEditar;
	const soloLectura = sol || a.estado === "ARCHIVADO";
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: CircleHelp,
			titulo: esNuevo ? "Nueva ayuda" : "Editar ayuda",
			descripcion: a.vista ? nombreDeVista(a.vista) : "Elija la vista",
			migas: [
				{ texto: "Seguridad y configuración" },
				{
					texto: "Ayuda",
					to: "/seguridad/manuales"
				},
				{ texto: esNuevo ? "Nueva" : a.titulo }
			],
			acciones: /* @__PURE__ */ jsx(StatusBadge, {
				tono: a.estado === "PUBLICADO" ? "success" : a.estado === "ARCHIVADO" ? "neutral" : "warning",
				children: NOMBRE_ESTADO_AYUDA[a.estado]
			})
		}),
		sol && /* @__PURE__ */ jsx(Aviso, {
			tipo: "aviso",
			children: "Su perfil solo puede leer la ayuda. Redacta el Administrador o el Coordinador."
		}),
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: mensaje.tipo,
			onCerrar: () => setMensaje(null),
			children: mensaje.texto
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "datos",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3 h-auto flex-wrap",
					children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "datos",
							children: "Datos"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "manual",
							children: "Manual"
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "video",
							children: [
								"Video (",
								a.videos.length,
								")"
							]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "tutorial",
							children: [
								"Tutorial (",
								pasos.length,
								")"
							]
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "previa",
							children: "Vista previa"
						}),
						!esNuevo && /* @__PURE__ */ jsx(TabsTrigger, {
							value: "historico",
							children: "Histórico"
						})
					]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "datos",
					children: [/* @__PURE__ */ jsx(Section, {
						titulo: "A qué vista pertenece",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Buscar vista",
								ayuda: "Escriba parte del nombre o del módulo.",
								children: (fid) => /* @__PURE__ */ jsx("input", {
									id: fid,
									className: controlClase,
									value: filtroVista,
									onChange: (e) => setFiltroVista(e.target.value),
									disabled: soloLectura,
									placeholder: "Sujeto pasivo, Seguridad, Presupuestal…"
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Vista",
								obligatorio: true,
								error: errores.vista,
								children: (fid) => /* @__PURE__ */ jsxs("select", {
									id: fid,
									className: controlClase,
									value: a.vista,
									disabled: soloLectura || guardado && !esNuevo,
									onChange: (e) => {
										const v = e.target.value;
										setA((x) => ({
											...x,
											vista: v,
											titulo: !x.titulo || x.titulo.startsWith("Cómo usar:") ? `Cómo usar: ${nombreDeVista(v)}` : x.titulo
										}));
									},
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Seleccione"
									}), porModulo.map(([modulo, lista]) => /* @__PURE__ */ jsx("optgroup", {
										label: modulo,
										children: lista.map((v) => /* @__PURE__ */ jsxs("option", {
											value: v.ruta,
											children: [v.nombre, v.ambito === "predio" ? " (predio)" : v.ambito === "proyecto" ? " (proyecto)" : ""]
										}, v.ruta))
									}, modulo))]
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Título",
								obligatorio: true,
								error: errores.titulo,
								children: (fid) => /* @__PURE__ */ jsx("input", {
									id: fid,
									className: controlClase,
									value: a.titulo,
									disabled: soloLectura,
									onChange: (e) => cambiar("titulo", e.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Perfiles",
								ayuda: "Sin marcar, la ven todos los perfiles.",
								children: /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm",
									children: Object.keys(ROLES).map((r) => /* @__PURE__ */ jsxs("label", {
										className: "flex cursor-pointer items-center gap-1.5",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											className: "accent-primary",
											disabled: soloLectura,
											checked: a.perfiles.includes(r),
											onChange: (e) => cambiar("perfiles", e.target.checked ? [...a.perfiles, r] : a.perfiles.filter((x) => x !== r))
										}), ROLES[r]]
									}, r))
								})
							})
						] })
					}), /* @__PURE__ */ jsxs(Section, {
						titulo: "Enlaces de apoyo",
						className: "mt-4",
						children: [!soloLectura && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Texto del enlace",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								placeholder: "Por ejemplo, TUO del DL 1192",
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: nuevoEnlace.texto,
								onChange: (e) => setNuevoEnlace((n) => ({
									...n,
									texto: e.target.value
								}))
							})
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Dirección",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								type: "url",
								placeholder: "https://",
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: nuevoEnlace.url,
								onChange: (e) => setNuevoEnlace((n) => ({
									...n,
									url: e.target.value
								}))
							})
						})] }), /* @__PURE__ */ jsx("div", {
							className: "mb-3 mt-3 flex justify-end",
							children: /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								disabled: !nuevoEnlace.texto.trim() || !urlValida(nuevoEnlace.url),
								onClick: () => {
									cambiar("enlaces", [...a.enlaces, {
										texto: nuevoEnlace.texto.trim(),
										url: nuevoEnlace.url.trim()
									}]);
									setNuevoEnlace({
										texto: "",
										url: ""
									});
								},
								children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar enlace"]
							})
						})] }), /* @__PURE__ */ jsx(Tabla, {
							filas: a.enlaces,
							claveFila: (e, i) => e.url + i,
							vacio: "Esta vista aún no tiene enlaces de apoyo.",
							columnas: [
								{
									clave: "texto",
									titulo: "Texto"
								},
								{
									clave: "url",
									titulo: "Dirección",
									render: (e) => /* @__PURE__ */ jsx("a", {
										href: e.url,
										target: "_blank",
										rel: "noreferrer",
										className: "break-all text-primary-dark underline",
										children: e.url
									})
								},
								{
									clave: "acciones",
									titulo: "Acciones",
									alinear: "derecha",
									render: (e, i) => !soloLectura && /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										"aria-label": `Quitar enlace ${e.texto}`,
										onClick: () => cambiar("enlaces", a.enlaces.filter((_, k) => k !== i)),
										children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar"]
									})
								}
							]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "manual",
					children: [/* @__PURE__ */ jsxs(Section, {
						titulo: "Texto del manual",
						children: [/* @__PURE__ */ jsx(FormGrid, {
							columnas: 1,
							children: /* @__PURE__ */ jsx(FormField, {
								etiqueta: "Contenido",
								error: errores.contenido,
								ancho: "doble",
								children: (fid) => /* @__PURE__ */ jsx(EditorTexto, {
									id: fid,
									valor: a.manual?.contenido ?? "",
									onCambio: (html) => !soloLectura && html !== (a.manual?.contenido ?? "") && setManual({ contenido: html }),
									invalido: Boolean(errores.contenido)
								})
							})
						}), a.manual && /* @__PURE__ */ jsxs("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								"Actualizado el ",
								fechaHora(a.manual.actualizadoEl),
								" por ",
								a.manual.actualizadoPor
							]
						})]
					}), /* @__PURE__ */ jsxs(Section, {
						titulo: "PDF del manual oficial",
						className: "mt-4",
						children: [
							a.manual?.pdf ? /* @__PURE__ */ jsxs("div", {
								className: "mb-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("p", {
										className: "truncate font-medium",
										children: a.manual.pdf.nombre
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Versión ",
											a.manual.pdf.version,
											" · subido el ",
											fechaHora(a.manual.pdf.subidoEl),
											" ",
											"por ",
											a.manual.pdf.subidoPor
										]
									})]
								}), !soloLectura && /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => setManual({ pdf: void 0 }),
									children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar"]
								})]
							}) : /* @__PURE__ */ jsx("p", {
								className: "mb-3 text-sm text-muted-foreground",
								children: "Sin PDF adjunto."
							}),
							!soloLectura && /* @__PURE__ */ jsxs("label", {
								className: "inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-primary-soft",
								children: [
									/* @__PURE__ */ jsx(FileUp, {
										size: 16,
										"aria-hidden": true
									}),
									" ",
									a.manual?.pdf ? "Reemplazar PDF" : "Cargar PDF",
									/* @__PURE__ */ jsx("input", {
										type: "file",
										accept: "application/pdf,.pdf",
										className: "sr-only",
										onChange: (e) => {
											cargarPdf(e.target.files?.[0]);
											e.target.value = "";
										}
									})
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									"Hasta ",
									Math.round(TOPE_PDF / 1024 / 1024),
									" MB en este prototipo. Si pesa más, súbalo al repositorio documental y agréguelo como enlace de apoyo."
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "video",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Videos de esta vista",
						children: [
							!soloLectura && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Nombre del video",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
										value: nuevoVideo.nombre,
										onChange: (e) => setNuevoVideo((n) => ({
											...n,
											nombre: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Duración en minutos",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										inputMode: "decimal",
										className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
										value: nuevoVideo.minutos,
										onChange: (e) => setNuevoVideo((n) => ({
											...n,
											minutos: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Enlace del video",
									ayuda: "YouTube, Vimeo, MP4 o el repositorio del MTC. El sistema guarda nombre, fecha de subida, quién lo subió y la duración.",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										type: "url",
										placeholder: "https://youtu.be/...",
										className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
										value: nuevoVideo.url,
										onChange: (e) => setNuevoVideo((n) => ({
											...n,
											url: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Descripción breve",
									error: errorVideo,
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
										value: nuevoVideo.descripcion,
										onChange: (e) => setNuevoVideo((n) => ({
											...n,
											descripcion: e.target.value
										}))
									})
								})
							] }), /* @__PURE__ */ jsx("div", {
								className: "mb-3 mt-3 flex justify-end",
								children: /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: agregarVideo,
									children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar video"]
								})
							})] }),
							/* @__PURE__ */ jsx(Tabla, {
								filas: a.videos,
								claveFila: (v, i) => v.url + i,
								vacio: "Esta vista aún no tiene videos.",
								columnas: [
									{
										clave: "nombre",
										titulo: "Video",
										render: (v) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
											className: "font-medium",
											children: v.nombre
										}), /* @__PURE__ */ jsx("p", {
											className: "max-w-xs truncate text-xs text-muted-foreground",
											children: v.url
										})] })
									},
									{
										clave: "duracion",
										titulo: "Duración",
										render: (v) => /* @__PURE__ */ jsx("span", {
											className: "tabular-nums",
											children: duracionTexto(v.duracion)
										})
									},
									{
										clave: "version",
										titulo: "Versión",
										render: (v) => `v${v.version}`
									},
									{
										clave: "subidoEl",
										titulo: "Subido",
										render: (v) => /* @__PURE__ */ jsxs("span", {
											className: "whitespace-nowrap text-xs",
											children: [
												fechaHora(v.subidoEl),
												/* @__PURE__ */ jsx("br", {}),
												v.subidoPor
											]
										})
									},
									{
										clave: "acciones",
										titulo: "Acciones",
										alinear: "derecha",
										render: (_, i) => !soloLectura && /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											onClick: () => setQuitar(i),
											children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar"]
										})
									}
								]
							}),
							a.videos[0] && /* @__PURE__ */ jsx("div", {
								className: "mt-4 max-w-xl",
								children: /* @__PURE__ */ jsx(ReproductorVideo, {
									url: a.videos[0].url,
									titulo: a.videos[0].nombre
								}, a.videos[0].url)
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "tutorial",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Pasos del tutorial",
						acciones: guardado && pasos.length > 0 ? /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: probar,
							children: [/* @__PURE__ */ jsx(Play, {}), " Probar en la vista"]
						}) : void 0,
						children: [
							pasos.length === 0 && /* @__PURE__ */ jsx("p", {
								className: "mb-3 text-sm text-muted-foreground",
								children: "Sin pasos."
							}),
							/* @__PURE__ */ jsx("ol", {
								className: "space-y-3",
								children: pasos.map((p, i) => /* @__PURE__ */ jsxs("li", {
									className: "rounded-md border border-border bg-background p-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "mb-2 flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "text-xs font-semibold uppercase text-muted-foreground",
											children: ["Paso ", i + 1]
										}), !soloLectura && /* @__PURE__ */ jsxs("span", {
											className: "flex gap-1",
											children: [
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													"aria-label": "Subir paso",
													disabled: i === 0,
													onClick: () => mover(i, -1),
													children: /* @__PURE__ */ jsx(ArrowUp, {})
												}),
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													"aria-label": "Bajar paso",
													disabled: i === pasos.length - 1,
													onClick: () => mover(i, 1),
													children: /* @__PURE__ */ jsx(ArrowDown, {})
												}),
												/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													"aria-label": "Quitar paso",
													onClick: () => setPasos(pasos.filter((_, k) => k !== i)),
													children: /* @__PURE__ */ jsx(Trash2, {})
												})
											]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ jsxs("select", {
												"aria-label": `Elemento del paso ${i + 1}`,
												className: controlClase,
												disabled: soloLectura,
												value: SELECTORES.some((s) => s.valor === p.selector) ? p.selector : "__otro",
												onChange: (e) => setPasos(pasos.map((x, k) => k === i ? {
													...x,
													selector: e.target.value === "__otro" ? "" : e.target.value
												} : x)),
												children: [SELECTORES.map((s) => /* @__PURE__ */ jsx("option", {
													value: s.valor,
													children: s.texto
												}, s.valor)), /* @__PURE__ */ jsx("option", {
													value: "__otro",
													children: "Otro selector…"
												})]
											}),
											/* @__PURE__ */ jsx("input", {
												"aria-label": `Selector del paso ${i + 1}`,
												className: controlClase,
												disabled: soloLectura,
												placeholder: "[data-ayuda=\"…\"] o un selector CSS",
												value: p.selector,
												onChange: (e) => setPasos(pasos.map((x, k) => k === i ? {
													...x,
													selector: e.target.value
												} : x))
											}),
											/* @__PURE__ */ jsx("input", {
												"aria-label": `Título del paso ${i + 1}`,
												className: controlClase,
												disabled: soloLectura,
												placeholder: "Título del paso",
												value: p.titulo,
												onChange: (e) => setPasos(pasos.map((x, k) => k === i ? {
													...x,
													titulo: e.target.value
												} : x))
											}),
											/* @__PURE__ */ jsx("input", {
												"aria-label": `Texto del paso ${i + 1}`,
												className: controlClase,
												disabled: soloLectura,
												placeholder: "Qué debe hacer o saber la persona",
												value: p.texto,
												onChange: (e) => setPasos(pasos.map((x, k) => k === i ? {
													...x,
													texto: e.target.value
												} : x))
											})
										]
									})]
								}, i))
							}),
							!soloLectura && /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								className: "mt-3",
								onClick: () => setPasos([...pasos, {
									selector: SELECTORES[0].valor,
									titulo: "",
									texto: ""
								}]),
								children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar paso"]
							}),
							a.tutorial && /* @__PURE__ */ jsxs("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: [
									"Actualizado el ",
									fechaHora(a.tutorial.actualizadoEl),
									" por ",
									a.tutorial.actualizadoPor,
									". «Probar en la vista» abre la pantalla con el borrador guardado; guarde antes de probar."
								]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "previa",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: a.titulo || "Vista previa",
						children: /* @__PURE__ */ jsxs("div", {
							className: "max-w-xl",
							children: [a.manual?.contenido ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("p", {
								className: "mb-3 text-xs text-muted-foreground",
								children: [
									"Actualizado el ",
									fechaHora(a.manual.actualizadoEl),
									" por ",
									a.manual.actualizadoPor
								]
							}), /* @__PURE__ */ jsx(CuerpoAnuncio, { html: a.manual.contenido })] }) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Sin manual."
							}), a.videos.map((v) => /* @__PURE__ */ jsxs("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ jsx(ReproductorVideo, {
									url: v.url,
									titulo: v.nombre
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										v.nombre,
										" · subido el ",
										fechaHora(v.subidoEl),
										" por ",
										v.subidoPor
									]
								})]
							}, v.url))]
						})
					})
				}),
				!esNuevo && /* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico de esta ayuda",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `ayuda-${a.id}`,
							etiquetas: ETIQUETAS,
							nombreArchivo: `historico-ayuda-${a.id}`
						})
					})
				})
			]
		}),
		/* @__PURE__ */ jsxs(FormActions, { children: [
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => navigate({ to: "/seguridad/manuales" }),
				children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Volver a la lista"]
			}),
			!soloLectura && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => enviar(false),
				children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
			}),
			!soloLectura && puedePublicar && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => enviar(true),
				children: [
					/* @__PURE__ */ jsx(Send, {}),
					" ",
					a.estado === "PUBLICADO" ? "Guardar y publicar cambios" : "Publicar"
				]
			}),
			!puedePublicar && !sol && /* @__PURE__ */ jsxs("span", {
				className: "text-xs text-muted-foreground",
				children: [
					"Perfil ",
					ROLES[rol],
					": guarda borradores; publica el Administrador."
				]
			})
		] }),
		/* @__PURE__ */ jsx(Confirmar, {
			abierto: quitar !== null,
			onCerrar: () => setQuitar(null),
			titulo: "Quitar video",
			texto: `Se quita «${quitar !== null ? a.videos[quitar]?.nombre : ""}» de la ayuda. Queda en el histórico al guardar.`,
			accion: "Quitar video",
			onConfirmar: () => {
				if (quitar !== null) cambiar("videos", a.videos.filter((_, i) => i !== quitar));
				setQuitar(null);
			}
		})
	] });
}
//#endregion
export { EditorAyudaPage as component };
