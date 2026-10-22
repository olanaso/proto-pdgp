import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { i as FotoSvg, u as ajustesBase } from "./fotoRender-BT_YRQ8T.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { h as useConfigFotos, n as configPorDefecto, o as guardarConfigFotos } from "./fotos-CUnD_Pb7.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Camera, History, Save } from "lucide-react";
//#region src/routes/configuracion.fotos.tsx?tsr-split=component
/** Imagen de muestra para la vista previa: un degradado neutro en SVG (sin archivo externo). */
var MUESTRA = "data:image/svg+xml;charset=utf-8," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1600\" height=\"1000\"><defs><linearGradient id=\"g\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"rgb(160,190,215)\"/><stop offset=\"0.55\" stop-color=\"rgb(205,200,180)\"/><stop offset=\"1\" stop-color=\"rgb(150,125,95)\"/></linearGradient></defs><rect width=\"1600\" height=\"1000\" fill=\"url(#g)\"/></svg>");
function ConfigFotosPage() {
	const rol = useRol();
	const edita = rol === "ADMIN" || rol === "COORDINADOR";
	const [proyecto, setProyecto] = useState(proyectos[0]?.id ?? "jauja");
	const guardada = useConfigFotos(proyecto);
	const [c, setC] = useState(guardada);
	const [mensaje, setMensaje] = useState(null);
	const versiones = useHistorial(`config-fotos-${proyecto}`);
	const firma = JSON.stringify(guardada);
	useEffect(() => setC(JSON.parse(firma)), [firma]);
	const set = (k, v) => setC((x) => ({
		...x,
		[k]: v
	}));
	const muestra = {
		id: "muestra",
		proyecto,
		predio: "AERO-JAUJA-PR-0567T",
		pantalla: "configuracion",
		seccion: "muestra",
		registro: "",
		campo: "Foto de muestra",
		modulo: 8,
		titulo: "Foto de muestra",
		original: {
			nombre: "muestra",
			tipo: "image/svg+xml",
			tamano: 0,
			ancho: 1600,
			alto: 1e3,
			subidoEl: (/* @__PURE__ */ new Date()).toISOString(),
			subidoPor: ""
		},
		metadatos: {
			fecha: "2026-08-28",
			hora: "12:20:48",
			utm: "UTM 18S 445 612 E · 8 698 210 N",
			km: "12+350",
			origen: "exif",
			corregidos: [],
			leido: {}
		},
		ajustes: ajustesBase(),
		estampa: c.estampaAuto ? c.estampa : null,
		marcaAgua: c.marcaAguaAuto ? c.marcaAgua : null,
		anotaciones: [],
		version: 1,
		modificadoEl: "",
		modificadoPor: ""
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Camera,
			titulo: "Fotos",
			descripcion: "Marca de agua y estampa que reciben las fotos al subirse, por proyecto.",
			migas: [{ texto: "Configuración" }, { texto: "Fotos" }]
		}),
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(null),
			children: mensaje
		}),
		!edita && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Su perfil solo puede leer esta configuración."
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "config",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "config",
						children: "Configuración"
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
					value: "config",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 gap-4 xl:grid-cols-[1fr_440px]",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Section, {
								titulo: "Proyecto",
								children: /* @__PURE__ */ jsx(FormGrid, {
									columnas: 1,
									children: /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Proyecto",
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											className: controlClase,
											value: proyecto,
											onChange: (e) => setProyecto(e.target.value),
											children: proyectos.map((p) => /* @__PURE__ */ jsx("option", {
												value: p.id,
												children: p.nombre
											}, p.id))
										})
									})
								})
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Estampa al subir",
								className: "mt-4",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Aplicar al subir",
										children: /* @__PURE__ */ jsxs("label", {
											className: "flex items-center gap-2 pt-2 text-sm",
											children: [/* @__PURE__ */ jsx("input", {
												type: "checkbox",
												className: "accent-primary",
												disabled: !edita,
												checked: c.estampaAuto,
												onChange: (e) => set("estampaAuto", e.target.checked)
											}), "Cada foto nueva recibe la estampa con fecha, hora, UTM y km"]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Posición",
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											disabled: !edita,
											value: c.estampa.posicion,
											onChange: (e) => set("estampa", {
												...c.estampa,
												posicion: e.target.value
											}),
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "inferior-izquierda",
													children: "Abajo a la izquierda"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "inferior-derecha",
													children: "Abajo a la derecha"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "superior-izquierda",
													children: "Arriba a la izquierda"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "superior-derecha",
													children: "Arriba a la derecha"
												})
											]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Campos",
										children: /* @__PURE__ */ jsx("div", {
											className: "flex flex-wrap gap-x-4 gap-y-1 pt-2 text-sm",
											children: [
												["fecha", "Fecha"],
												["hora", "Hora"],
												["utm", "UTM"],
												["km", "Progresiva"],
												["titulo", "Título"]
											].map(([k, t]) => /* @__PURE__ */ jsxs("label", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ jsx("input", {
													type: "checkbox",
													className: "accent-primary",
													disabled: !edita,
													checked: c.estampa.campos[k],
													onChange: (e) => set("estampa", {
														...c.estampa,
														campos: {
															...c.estampa.campos,
															[k]: e.target.checked
														}
													})
												}), t]
											}, k))
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Tamaño y fondo",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 pt-1",
											children: [/* @__PURE__ */ jsx("input", {
												type: "range",
												min: 12,
												max: 48,
												"aria-label": "Tamaño de la estampa",
												disabled: !edita,
												value: c.estampa.tamano,
												onChange: (e) => set("estampa", {
													...c.estampa,
													tamano: Number(e.target.value)
												}),
												className: "w-full accent-primary"
											}), /* @__PURE__ */ jsxs("select", {
												"aria-label": "Fondo de la estampa",
												className: `${controlClase} w-32`,
												disabled: !edita,
												value: c.estampa.fondo,
												onChange: (e) => set("estampa", {
													...c.estampa,
													fondo: e.target.value
												}),
												children: [/* @__PURE__ */ jsx("option", {
													value: "claro",
													children: "Claro"
												}), /* @__PURE__ */ jsx("option", {
													value: "oscuro",
													children: "Oscuro"
												})]
											})]
										})
									})
								] })
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Marca de agua",
								className: "mt-4",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Aplicar al subir",
										children: /* @__PURE__ */ jsxs("label", {
											className: "flex items-center gap-2 pt-2 text-sm",
											children: [/* @__PURE__ */ jsx("input", {
												type: "checkbox",
												className: "accent-primary",
												disabled: !edita,
												checked: c.marcaAguaAuto,
												onChange: (e) => set("marcaAguaAuto", e.target.checked)
											}), "Cada foto nueva lleva la marca de agua"]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Texto",
										ayuda: "Nombre del proyecto, de la entidad o de la empresa consultora.",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											disabled: !edita,
											value: c.marcaAgua.texto,
											onChange: (e) => set("marcaAgua", {
												...c.marcaAgua,
												texto: e.target.value
											})
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Posición",
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: controlClase,
											disabled: !edita,
											value: c.marcaAgua.posicion,
											onChange: (e) => set("marcaAgua", {
												...c.marcaAgua,
												posicion: e.target.value
											}),
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "diagonal",
													children: "Diagonal"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "centro",
													children: "Centro"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "inferior",
													children: "Abajo"
												})
											]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Tamaño y opacidad",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 pt-1",
											children: [/* @__PURE__ */ jsx("input", {
												type: "range",
												min: 20,
												max: 140,
												"aria-label": "Tamaño de la marca de agua",
												disabled: !edita,
												value: c.marcaAgua.tamano,
												onChange: (e) => set("marcaAgua", {
													...c.marcaAgua,
													tamano: Number(e.target.value)
												}),
												className: "w-full accent-primary"
											}), /* @__PURE__ */ jsx("input", {
												type: "range",
												min: 10,
												max: 90,
												"aria-label": "Opacidad de la marca de agua",
												disabled: !edita,
												value: c.marcaAgua.opacidad,
												onChange: (e) => set("marcaAgua", {
													...c.marcaAgua,
													opacidad: Number(e.target.value)
												}),
												className: "w-full accent-primary"
											})]
										})
									})
								] })
							}),
							edita && /* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setC(configPorDefecto(proyecto)),
								children: "Valores por defecto"
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								onClick: () => {
									guardarConfigFotos(proyecto, c);
									setMensaje("Configuración guardada. Se aplica a las fotos que se suban desde ahora.");
								},
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar configuración"]
							})] })
						] }), /* @__PURE__ */ jsxs(Section, {
							titulo: "Vista previa",
							children: [/* @__PURE__ */ jsx(FotoSvg, {
								foto: muestra,
								src: MUESTRA,
								style: {
									width: "100%",
									height: "auto",
									display: "block"
								},
								className: "rounded-md border border-border"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "Así se ve una foto nueva de este proyecto al subirla. Cada foto se puede ajustar después en el editor."
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico de la configuración",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `config-fotos-${proyecto}`,
							nombreArchivo: `historico-config-fotos-${proyecto}`
						})
					})
				})
			]
		})
	] });
}
//#endregion
export { ConfigFotosPage as component };
