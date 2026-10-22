import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, c as useHitosPredio, i as estadoPlazo, m as fecha, n as getProyecto, s as registrarHito, v as numero } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { i as registrarEnviosPorFecha, r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { Dt as BotonIcono, E as Modal, J as usePerfilPredio, U as puedeCambiarRuta, V as corregirPerfil, at as guardarBloque, ct as liquidacion, it as bloqueDelPredio, lt as useBloques, n as etiquetaProyecto, rt as UIT, st as incentivoBloque, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.afectado-bloque-BmdU0pHm.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Gavel, History, Plus, Save, Shapes, Trash2 } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.afectado-bloque.tsx?tsr-split=component
var RESPUESTA = {
	"": "Sin respuesta",
	ACEPTA: "Acepta (trato directo)",
	ACEPTA_ENTREGA_ANTICIPADA: "Acepta con entrega anticipada",
	RECHAZA: "Rechaza"
};
var CONCEPTOS = [
	"Valor del terreno",
	"Incentivo",
	"Compensación económica",
	"Otro"
];
function AfectadoBloquePage() {
	const { projectId, codigo } = Route$1.useParams();
	const c = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const en = bloqueDelPredio(useBloques(), c);
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: c,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: c }),
		children: [
			/* @__PURE__ */ jsx(PredioEncabezado, {
				projectId,
				codigo: c,
				titulo: "Afectado en el bloque",
				icono: Shapes,
				acciones: en && /* @__PURE__ */ jsxs(StatusBadge, {
					tono: "primary",
					children: [
						"Bloque ",
						en.bloque.nombre,
						" ·",
						" ",
						en.bloque.sectores.find((s) => s.id === en.afectado.sector)?.nombre
					]
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "afectado-bloque",
				projectId,
				codigo: c
			}),
			en ? /* @__PURE__ */ jsx(Registro, {
				projectId,
				codigo: c,
				bloque: en.bloque,
				inicial: en.afectado
			}, `${en.bloque.id}-${c}`) : /* @__PURE__ */ jsxs(Aviso, {
				tipo: "info",
				children: [
					"Este predio no está en un bloque de liberación. Los bloques se determinan y empadronan en",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/proyectos/$projectId/liberacion-bloque",
						params: { projectId },
						className: "font-medium text-primary-dark underline",
						children: "Liberación en bloque"
					}),
					" ",
					"del proyecto."
				]
			})
		]
	});
}
function Registro({ projectId, codigo, bloque, inicial }) {
	const rol = useRol();
	const edita = rol === "ADMIN" || rol === "COORDINADOR" || rol === "ESP_LEGAL";
	const perfil = usePerfilPredio(projectId, codigo);
	const hitos = useHitosPredio(codigo);
	const [a, setA] = useState(inicial);
	const [mensaje, setMensaje] = useState(null);
	const [pago, setPago] = useState({
		id: "",
		concepto: CONCEPTOS[0],
		monto: 0,
		fecha: ""
	});
	const [baja, setBaja] = useState(null);
	const [expropiar, setExpropiar] = useState(false);
	const [motivo, setMotivo] = useState("");
	const set = (k, v) => setA((x) => ({
		...x,
		[k]: v
	}));
	const sector = bloque.sectores.find((s) => s.id === a.sector);
	const l = liquidacion(a, sector?.valorM2 ?? 0);
	const carta = estadoPlazo(hitos, "bloque_carta");
	const entrega = estadoPlazo(hitos, "bloque_entrega");
	const acepta = a.respuesta === "ACEPTA" || a.respuesta === "ACEPTA_ENTREGA_ANTICIPADA";
	function guardar(nuevo, accion, m) {
		registrarEnviosPorFecha({ cartaNotificadaEl: bloque.afectados.find((x) => x.codigo === codigo)?.cartaNotificadaEl }, { cartaNotificadaEl: nuevo.cartaNotificadaEl }, [{
			campo: "cartaNotificadaEl",
			canal: "Notificación",
			destinatario: nuevo.nombres,
			documento: "Carta de intención"
		}]).forEach((envio) => registrarEnvio({
			...envio,
			proyecto: projectId,
			predio: codigo,
			paso: "afectado-bloque"
		}, {
			modulo: 10,
			entidad: "liberacion_bloque"
		}));
		guardarBloque({
			...bloque,
			afectados: bloque.afectados.map((x) => x.codigo === codigo ? nuevo : x)
		}, accion, codigo, m);
		registrarHito(codigo, "bloque_carta", nuevo.cartaNotificadaEl, "afectado-bloque", "cartaNotificadaEl");
		registrarHito(codigo, "bloque_entrega", nuevo.respuesta.startsWith("ACEPTA") ? nuevo.respuestaEl : "", "afectado-bloque", "respuestaEl");
		setA(nuevo);
	}
	const datosPerfil = {
		condicion: perfil.condicion,
		ruta: perfil.ruta,
		inscrito: perfil.inscrito,
		ocupado: perfil.ocupado,
		actividad: perfil.actividad,
		casoEspecial: perfil.casoEspecial,
		entregaAnticipada: perfil.entregaAnticipada
	};
	const bloqueoExpropiacion = !puedeCambiarRuta(rol) ? "Su perfil no cambia la ruta: lo hacen el Especialista legal, el Coordinador y el Administrador." : !perfil.leyAutoritativa ? "No hay ley autoritativa vigente para el predio (art. 25): regístrela en Normas habilitantes." : null;
	const fechaCampo = (etiqueta, k) => /* @__PURE__ */ jsx("input", {
		type: "date",
		"aria-label": etiqueta,
		className: controlClase,
		value: a[k],
		disabled: !edita,
		onChange: (e) => set(k, e.target.value)
	});
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(null),
			children: mensaje
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
						children: [/* @__PURE__ */ jsx(History, {
							size: 16,
							className: "mr-1",
							"aria-hidden": true
						}), " Histórico"]
					})]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "registro",
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsx(InformacionPredio, {
							projectId,
							codigo
						}),
						/* @__PURE__ */ jsx(Section, {
							titulo: "Afectado en el padrón del bloque (art. 54 y 55)",
							acciones: /* @__PURE__ */ jsx(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/proyectos/$projectId/liberacion-bloque",
									params: { projectId },
									search: { bloque: bloque.id },
									children: "Abrir el bloque"
								})
							}),
							children: /* @__PURE__ */ jsxs("dl", {
								className: "grid grid-cols-1 gap-x-8 gap-y-2 text-sm md:grid-cols-2",
								children: [[
									["Bloque", `${bloque.nombre} · ${bloque.resolucion.numero || "sin resolución"}`],
									["Sector", `${sector?.nombre ?? ""} · ${moneda(sector?.valorM2 ?? 0)} por m²`],
									["Afectado", `${a.nombres}${a.documento ? ` · ${a.documento}` : ""}`],
									["Condición y zona", `${a.condicion.toLowerCase()} · zona ${a.zona.toLowerCase()}`],
									["Área afectada", `${numero(a.area, 2)} m²`]
								].map(([k, v]) => /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx("dt", {
										className: "w-40 shrink-0 font-medium",
										children: k
									}), /* @__PURE__ */ jsx("dd", {
										className: "first-letter:uppercase",
										children: v
									})]
								}, k)), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx("dt", {
										className: "w-40 shrink-0 font-medium",
										children: "Calificación"
									}), /* @__PURE__ */ jsxs("dd", {
										className: "flex flex-col items-start gap-0.5",
										children: [/* @__PURE__ */ jsx(StatusBadge, {
											tono: a.calificacion === "APTO" ? "success" : a.calificacion === "OBSERVADO" ? "warning" : "neutral",
											children: a.calificacion === "APTO" ? "Apto" : a.calificacion === "OBSERVADO" ? "Observado" : "Pendiente"
										}), a.observacion && /* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: a.observacion
										})]
									})]
								})]
							})
						}),
						/* @__PURE__ */ jsxs(Section, {
							titulo: "Carta de intención y respuesta (art. 58)",
							children: [
								a.calificacion !== "APTO" && /* @__PURE__ */ jsx(Aviso, {
									tipo: "aviso",
									children: "La carta se dirige a los afectados calificados como aptos. Califique al afectado en el bloque antes de notificarla."
								}),
								/* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Notificación de la carta",
										ayuda: "Desde aquí corren 10 d.h. para responder.",
										children: () => fechaCampo("Notificación de la carta", "cartaNotificadaEl")
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Plazo de respuesta (art. 58)",
										children: /* @__PURE__ */ jsx("div", {
											className: "pt-2",
											children: carta && !a.respuesta ? /* @__PURE__ */ jsx(PlazoBadge, { vence: carta.vence }) : /* @__PURE__ */ jsx("span", {
												className: "text-sm text-muted-foreground",
												children: a.respuesta ? "Respondida." : "Registre la notificación."
											})
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Respuesta del afectado",
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											className: controlClase,
											value: a.respuesta,
											disabled: !edita || !a.cartaNotificadaEl,
											onChange: (e) => set("respuesta", e.target.value),
											children: Object.entries(RESPUESTA).map(([k, v]) => /* @__PURE__ */ jsx("option", {
												value: k,
												children: v
											}, k))
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Fecha de la respuesta",
										obligatorio: Boolean(a.respuesta),
										ayuda: acepta ? "Desde la aceptación corren 40 d.h. para entregar." : void 0,
										children: () => fechaCampo("Fecha de la respuesta", "respuestaEl")
									})
								] }),
								/* @__PURE__ */ jsx("div", {
									className: "mt-3",
									children: /* @__PURE__ */ jsx(HistorialEnvios, {
										proyecto: projectId,
										predio: codigo,
										paso: "afectado-bloque",
										editable: edita,
										vacio: "Aún no se notificó la carta. La fecha de notificación guardada deja una fila."
									})
								}),
								a.respuesta === "RECHAZA" && /* @__PURE__ */ jsxs(Aviso, {
									tipo: "aviso",
									children: [
										"El rechazo lleva el predio a expropiación (art. 64).",
										" ",
										perfil.ruta === "EXPROPIACION" ? "El predio ya está en la ruta de expropiación." : "Guarde la respuesta y pase el predio a expropiación."
									]
								})
							]
						}),
						/* @__PURE__ */ jsx(Section, {
							titulo: "Compensación económica (art. 58 y 59)",
							children: /* @__PURE__ */ jsx(Tabla, {
								columnas: [
									{
										clave: "concepto",
										titulo: "Concepto"
									},
									{
										clave: "base",
										titulo: "Base de cálculo"
									},
									{
										clave: "monto",
										titulo: "Monto",
										alinear: "derecha",
										render: (f) => /* @__PURE__ */ jsx("span", {
											className: "tabular-nums",
											children: moneda(f.monto)
										})
									}
								],
								filas: [
									{
										concepto: "Valor del terreno",
										base: a.condicion === "OCUPANTE" ? "El ocupante no recibe valor del terreno" : `${numero(a.area, 2)} m² × ${moneda(sector?.valorM2 ?? 0)}`,
										monto: l.terreno
									},
									{
										concepto: "Incentivo",
										base: `${incentivoBloque(a.respuesta) * 100} % del terreno según la respuesta`,
										monto: l.incentivo
									},
									{
										concepto: "Compensación económica",
										base: a.condicion === "OCUPANTE" ? `${a.zona === "URBANA" ? 4 : 3} UIT (UIT ${moneda(UIT)}), si entrega en 40 d.h.` : "10 % del terreno, entre 1 y 6 UIT, si entrega en 40 d.h.",
										monto: l.compensacion
									},
									{
										concepto: "Total",
										base: "",
										monto: l.total
									}
								],
								claveFila: (f) => f.concepto
							})
						}),
						/* @__PURE__ */ jsxs(Section, {
							titulo: "Pagos (art. 62 y 63)",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "mb-3 text-sm text-muted-foreground",
									children: [
										l.compensacion > 0 ? "Pago con compensación económica: corresponde si entrega dentro de los 40 d.h. desde la aceptación." : "Pago sin compensación económica: no entregó dentro de los 40 d.h. o rechazó.",
										" ",
										"Pagado ",
										moneda(l.pagado),
										" de ",
										moneda(l.total),
										"."
									]
								}),
								edita && /* @__PURE__ */ jsxs("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Concepto del pago",
											children: (id) => /* @__PURE__ */ jsx("select", {
												id,
												className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
												value: pago.concepto,
												onChange: (e) => setPago({
													...pago,
													concepto: e.target.value
												}),
												children: CONCEPTOS.map((k) => /* @__PURE__ */ jsx("option", { children: k }, k))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Monto (S/)",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "number",
												min: 0,
												step: "0.01",
												className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted tabular-nums`,
												value: pago.monto || "",
												onChange: (e) => setPago({
													...pago,
													monto: Number(e.target.value)
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha del pago",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
												value: pago.fecha,
												onChange: (e) => setPago({
													...pago,
													fecha: e.target.value
												})
											})
										})
									] }), /* @__PURE__ */ jsx("div", {
										className: "mt-3 flex justify-end",
										children: /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											disabled: !(pago.monto > 0 && pago.fecha),
											onClick: () => {
												guardar({
													...a,
													pagos: [...a.pagos, {
														...pago,
														id: `p${Date.now().toString(36)}`
													}]
												}, `Registró pago: ${pago.concepto}`);
												setPago({
													id: "",
													concepto: CONCEPTOS[0],
													monto: 0,
													fecha: ""
												});
												setMensaje("Pago registrado.");
											},
											children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar pago"]
										})
									})]
								}),
								/* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "concepto",
											titulo: "Concepto"
										},
										{
											clave: "monto",
											titulo: "Monto",
											alinear: "derecha",
											render: (p) => /* @__PURE__ */ jsx("span", {
												className: "tabular-nums",
												children: moneda(p.monto)
											})
										},
										{
											clave: "fecha",
											titulo: "Fecha",
											render: (p) => fecha(p.fecha)
										},
										{
											clave: "acciones",
											titulo: "Acciones",
											alinear: "derecha",
											render: (p) => edita && /* @__PURE__ */ jsx(BotonIcono, {
												nombre: "Anular pago",
												icono: Trash2,
												destructiva: true,
												onClick: () => {
													setMotivo("");
													setBaja(p);
												}
											})
										}
									],
									filas: a.pagos,
									claveFila: (p) => p.id,
									vacio: "Sin pagos registrados."
								})
							]
						}),
						/* @__PURE__ */ jsx(Section, {
							titulo: "Entrega del predio (art. 59)",
							children: /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Fecha de entrega",
								children: () => fechaCampo("Fecha de entrega", "entregaEl")
							}), /* @__PURE__ */ jsx(FormField, {
								etiqueta: "Plazo de entrega (art. 59)",
								children: /* @__PURE__ */ jsx("div", {
									className: "pt-2",
									children: entrega && !a.entregaEl ? /* @__PURE__ */ jsx(PlazoBadge, { vence: entrega.vence }) : /* @__PURE__ */ jsx("span", {
										className: "text-sm text-muted-foreground",
										children: a.entregaEl ? "Entregado." : "Corre desde la aceptación."
									})
								})
							})] })
						}),
						edita && /* @__PURE__ */ jsxs(FormActions, { children: [a.respuesta === "RECHAZA" && perfil.ruta !== "EXPROPIACION" && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "destructive",
							onClick: () => {
								setMotivo("");
								setExpropiar(true);
							},
							children: [/* @__PURE__ */ jsx(Gavel, {}), " Pasar a expropiación"]
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							disabled: Boolean(a.respuesta && !a.respuestaEl),
							onClick: () => {
								guardar(a, "Registró la liberación del afectado");
								setMensaje("Afectado guardado. Los plazos del predio ya están al día.");
							},
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar afectado"]
						})] })
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico del bloque",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `bloque-${bloque.id}`,
							nombreArchivo: `historico-bloque-${codigo}`,
							filtroInicial: codigo
						})
					})
				})
			]
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: baja !== null,
			onCerrar: () => setBaja(null),
			ancho: "sm",
			titulo: "Anular pago",
			descripcion: "El histórico del bloque conserva el pago y el motivo.",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setBaja(null),
				children: "Cancelar"
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "destructive",
				disabled: motivo.trim().length < 5,
				onClick: () => {
					if (!baja) return;
					guardar({
						...a,
						pagos: a.pagos.filter((p) => p.id !== baja.id)
					}, `Anuló pago: ${baja.concepto}`, motivo.trim());
					setBaja(null);
				},
				children: [/* @__PURE__ */ jsx(Trash2, {}), " Anular pago"]
			})] }),
			children: /* @__PURE__ */ jsx(Motivo, {
				valor: motivo,
				cambiar: setMotivo
			})
		}),
		/* @__PURE__ */ jsxs(Modal, {
			abierto: expropiar,
			onCerrar: () => setExpropiar(false),
			ancho: "sm",
			titulo: "Pasar el predio a expropiación",
			descripcion: "El afectado rechazó la carta de intención del bloque (art. 64). La ruta del predio cambia a expropiación y queda en el histórico del perfil.",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setExpropiar(false),
				children: "Cancelar"
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "destructive",
				disabled: Boolean(bloqueoExpropiacion) || motivo.trim().length < 5,
				onClick: () => {
					if (inicial.respuesta !== "RECHAZA" || a !== inicial) guardar(a, "Registró el rechazo del afectado");
					corregirPerfil(codigo, datosPerfil, { ruta: "EXPROPIACION" }, "Cambió la ruta a Expropiación por rechazo en el bloque", motivo.trim());
					setExpropiar(false);
					setMensaje("El predio pasó a la ruta de expropiación.");
				},
				children: [/* @__PURE__ */ jsx(Gavel, {}), " Pasar a expropiación"]
			})] }),
			children: [bloqueoExpropiacion && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: bloqueoExpropiacion
			}), /* @__PURE__ */ jsx(Motivo, {
				valor: motivo,
				cambiar: setMotivo
			})]
		})
	] });
}
function Motivo({ valor, cambiar }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("label", {
		htmlFor: "motivo-afectado-bloque",
		className: "mb-1 block text-sm font-medium",
		children: ["Motivo ", /* @__PURE__ */ jsx("span", {
			className: "text-destructive",
			children: "*"
		})]
	}), /* @__PURE__ */ jsx("textarea", {
		id: "motivo-afectado-bloque",
		rows: 3,
		className: `${controlClase} h-auto py-2`,
		value: valor,
		onChange: (e) => cambiar(e.target.value)
	})] });
}
//#endregion
export { AfectadoBloquePage as component };
