import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, f as vencimiento, m as fecha, n as getProyecto, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { C as montoPositivo, S as documentoIdentidad, T as validar } from "./sujetoPasivo-Cz4oBCnt.js";
import { i as registrarEnviosPorFecha, r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { E as Modal, J as usePerfilPredio, Y as varianteDe, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.reconocimiento-mejoras-5vSRk7iL.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { n as useAlmacen, t as idNuevo } from "./almacen-BgvL3X8T.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Banknote, CalendarDays, Hammer, History, IdCard, Plus, Save, Trash2 } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.reconocimiento-mejoras.tsx?tsr-split=component
var VACIO = {
	poseedorNombre: "",
	poseedorTipoDoc: "DNI",
	poseedorDoc: "",
	mejoras: [],
	aviso1Fecha: "",
	aviso1Diario: "El Peruano",
	aviso2Fecha: "",
	aviso2Diario: "",
	oposiciones: [],
	pagoMonto: "",
	pagoFecha: "",
	pagoComprobante: ""
};
var etiquetasHistorial = {
	poseedorNombre: "Poseedor u ocupante",
	poseedorTipoDoc: "Tipo de documento",
	poseedorDoc: "Número de documento",
	mejoras: "Mejora",
	aviso1Fecha: "Primer aviso",
	aviso1Diario: "Diario del primer aviso",
	aviso2Fecha: "Segundo aviso",
	aviso2Diario: "Diario del segundo aviso",
	oposiciones: "Oposición",
	pagoMonto: "Monto pagado",
	pagoFecha: "Fecha de pago",
	pagoComprobante: "Comprobante",
	tipo: "Tipo",
	descripcion: "Descripción",
	valor: "Valor",
	fecha: "Fecha",
	opositor: "Quien se opone",
	sustento: "Sustento",
	resultado: "Resultado"
};
var TIPOS_MEJORA = [
	"Edificación",
	"Cerco",
	"Plantación frutal",
	"Plantación forestal",
	"Plantación transitoria",
	"Instalación fija",
	"Obra complementaria"
];
var d = (iso) => iso ? /* @__PURE__ */ new Date(`${iso}T00:00:00`) : null;
var diasEntre = (a, b) => d(a) && d(b) ? Math.round((d(b).getTime() - d(a).getTime()) / 864e5) : null;
function MejorasPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const rol = useRol();
	const estatal = varianteDe(usePerfilPredio(projectId, decodedCodigo)) === "estatal";
	const [e, setE] = useAlmacen(`pdgp-mejoras-${decodedCodigo}`, VACIO);
	const claveHistorial = `reconocimiento-mejoras-${decodedCodigo}`;
	const versiones = useHistorial(claveHistorial);
	const bitacora = {
		modulo: 17,
		entidad: "reconocimiento_mejoras"
	};
	const versionar = (accion, objeto, despues = e, motivo) => registrarCambio(claveHistorial, {
		accion,
		objeto,
		motivo,
		antes: versiones[0]?.registro ?? VACIO,
		despues
	}, bitacora);
	const [mensaje, setMensaje] = useState(null);
	const [mejoraAbierta, setMejoraAbierta] = useState(false);
	const [mejora, setMejora] = useState({
		tipo: TIPOS_MEJORA[0],
		descripcion: "",
		valor: ""
	});
	const [oposicionAbierta, setOposicionAbierta] = useState(false);
	const [oposicion, setOposicion] = useState({
		fecha: "",
		opositor: "",
		sustento: "",
		resultado: "En evaluación"
	});
	const [aEliminar, setAEliminar] = useState(null);
	const campo = (k) => (v) => setE((a) => ({
		...a,
		[k]: v
	}));
	const total = e.mejoras.reduce((s, m) => s + m.valor, 0);
	const intervalo = diasEntre(e.aviso1Fecha, e.aviso2Fecha);
	const intervaloInvalido = intervalo !== null && intervalo < 3;
	const venceOposicion = d(e.aviso2Fecha) && !e.pagoFecha ? vencimiento(d(e.aviso2Fecha), plazo("mejoras_oposicion")) : null;
	const hayOposicionFundada = e.oposiciones.some((o) => o.resultado === "Fundada");
	const enEvaluacion = e.oposiciones.some((o) => o.resultado === "En evaluación");
	const estado = e.pagoFecha ? {
		texto: "Mejoras pagadas",
		tono: "success"
	} : hayOposicionFundada ? {
		texto: "Denegado por oposición",
		tono: "destructive"
	} : e.aviso2Fecha ? {
		texto: "En plazo de oposición",
		tono: "warning"
	} : e.aviso1Fecha ? {
		texto: "Primer aviso publicado",
		tono: "primary"
	} : e.mejoras.length ? {
		texto: "Mejoras inventariadas",
		tono: "primary"
	} : {
		texto: "Sin iniciar",
		tono: "neutral"
	};
	const pasoEstado = (hecho, actual) => hecho ? "completado" : actual ? "actual" : "pendiente";
	const pasos = [
		{
			nombre: "Identificación del poseedor y las mejoras",
			estado: pasoEstado(e.mejoras.length > 0 && Boolean(e.poseedorDoc), !(e.mejoras.length > 0 && e.poseedorDoc)),
			detalle: "DCF 3.ª"
		},
		{
			nombre: "Dos avisos con 3 días de intervalo",
			estado: pasoEstado(Boolean(e.aviso1Fecha && e.aviso2Fecha && !intervaloInvalido), e.mejoras.length > 0 && !(e.aviso1Fecha && e.aviso2Fecha)),
			detalle: "El Peruano y un diario de circulación nacional"
		},
		{
			nombre: "Plazo de oposición",
			estado: pasoEstado(Boolean(e.pagoFecha) || hayOposicionFundada, Boolean(e.aviso2Fecha) && !e.pagoFecha && !hayOposicionFundada),
			detalle: "10 d.h. desde la última publicación"
		},
		{
			nombre: "Pago al poseedor",
			estado: pasoEstado(Boolean(e.pagoFecha), false),
			detalle: "Si no hay oposición fundada"
		}
	];
	function guardar(ev) {
		ev.preventDefault();
		const errorDoc = e.poseedorDoc ? validar(e.poseedorDoc, documentoIdentidad(e.poseedorTipoDoc)) : null;
		if (errorDoc) return setMensaje({
			tipo: "error",
			texto: errorDoc
		});
		if (intervaloInvalido) return setMensaje({
			tipo: "error",
			texto: "El segundo aviso debe publicarse al menos 3 días calendario después del primero (DCF 3.ª)."
		});
		if (e.pagoFecha && (hayOposicionFundada || enEvaluacion)) return setMensaje({
			tipo: "error",
			texto: "No se puede registrar el pago con una oposición fundada o en evaluación."
		});
		if (e.pagoFecha && venceOposicion && /* @__PURE__ */ new Date(`${e.pagoFecha}T00:00:00`) < venceOposicion && e.oposiciones.length === 0) return setMensaje({
			tipo: "error",
			texto: `El pago solo procede vencido el plazo de oposición (${fecha(venceOposicion)}).`
		});
		const antes = versiones[0]?.registro ?? VACIO;
		registrarEnviosPorFecha({
			aviso1Fecha: antes.aviso1Fecha,
			aviso2Fecha: antes.aviso2Fecha
		}, {
			aviso1Fecha: e.aviso1Fecha,
			aviso2Fecha: e.aviso2Fecha
		}, [{
			campo: "aviso1Fecha",
			canal: "Publicación",
			destinatario: e.aviso1Diario || "Diario",
			documento: "Primer aviso"
		}, {
			campo: "aviso2Fecha",
			canal: "Publicación",
			destinatario: e.aviso2Diario || "Diario",
			documento: "Segundo aviso"
		}]).forEach((envio) => registrarEnvio({
			...envio,
			proyecto: projectId,
			predio: decodedCodigo,
			paso: "reconocimiento-mejoras"
		}, bitacora));
		versionar(versiones.length ? "Modificó el reconocimiento de mejoras" : "Registró el reconocimiento de mejoras", `Predio ${decodedCodigo}: ${estado.texto}`);
		setMensaje({
			tipo: "exito",
			texto: `Reconocimiento de mejoras guardado. Estado: ${estado.texto}.`
		});
	}
	function agregarMejora() {
		const error = validar(mejora.valor, montoPositivo);
		if (!mejora.descripcion.trim() || error) return setMensaje({
			tipo: "error",
			texto: error ?? "Describa la mejora."
		});
		const nuevo = {
			...e,
			mejoras: [...e.mejoras, {
				id: idNuevo(),
				tipo: mejora.tipo,
				descripcion: mejora.descripcion.trim(),
				valor: Number(mejora.valor.replace(/,/g, ""))
			}]
		};
		setE(nuevo);
		versionar("Agregó mejora", `${mejora.tipo}: ${mejora.descripcion.trim()}`, nuevo);
		setMejoraAbierta(false);
		setMejora({
			tipo: TIPOS_MEJORA[0],
			descripcion: "",
			valor: ""
		});
		setMensaje({
			tipo: "exito",
			texto: "Mejora agregada al inventario."
		});
	}
	function agregarOposicion() {
		if (!oposicion.fecha || !oposicion.opositor.trim()) return setMensaje({
			tipo: "error",
			texto: "Indique la fecha y el nombre de quien se opone."
		});
		const nuevo = {
			...e,
			oposiciones: [{
				id: idNuevo(),
				...oposicion
			}, ...e.oposiciones]
		};
		setE(nuevo);
		versionar("Registró oposición", `Oposición de ${oposicion.opositor.trim()}`, nuevo);
		setOposicionAbierta(false);
		setOposicion({
			fecha: "",
			opositor: "",
			sustento: "",
			resultado: "En evaluación"
		});
		setMensaje({
			tipo: "exito",
			texto: "Oposición registrada."
		});
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
				titulo: "Reconocimiento de mejoras",
				icono: Hammer,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: estado.tono,
					children: estado.texto
				})
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Procedimiento · Tercera Disposición Complementaria Final",
				className: "mb-4",
				children: [/* @__PURE__ */ jsx(Stepper, { pasos }), venceOposicion && /* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
					children: ["Plazo para oponerse: ", /* @__PURE__ */ jsx(PlazoBadge, { vence: venceOposicion })]
				})]
			}),
			estatal && /* @__PURE__ */ jsx(Aviso, {
				tipo: "aviso",
				children: "Predio estatal: el reconocimiento de mejoras y gastos de traslado a los ocupantes no suspende el plazo de 30 d.h. que tiene la entidad ocupante para entregar el predio (art. 41.9)."
			}),
			mensaje && /* @__PURE__ */ jsx("p", {
				role: mensaje.tipo === "error" ? "alert" : "status",
				className: `mb-4 rounded-md border px-3 py-2 text-sm ${mensaje.tipo === "error" ? "border-destructive bg-destructive-soft text-destructive" : "border-success bg-success-soft text-success"}`,
				children: mensaje.texto
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
							onSubmit: guardar,
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									className: "mb-4"
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Poseedor u ocupante",
									children: [
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Nombre o razón social",
												obligatorio: true,
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: e.poseedorNombre,
													onChange: (ev) => campo("poseedorNombre")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Tipo de documento",
												icono: IdCard,
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: e.poseedorTipoDoc,
													onChange: (ev) => campo("poseedorTipoDoc")(ev.target.value),
													children: [
														/* @__PURE__ */ jsx("option", {
															value: "DNI",
															children: "DNI"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "RUC",
															children: "RUC"
														}),
														/* @__PURE__ */ jsx("option", {
															value: "CE",
															children: "Carné de extranjería"
														})
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Número de documento",
												obligatorio: true,
												error: e.poseedorDoc ? validar(e.poseedorDoc, documentoIdentidad(e.poseedorTipoDoc)) ?? void 0 : void 0,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													inputMode: "numeric",
													value: e.poseedorDoc,
													onChange: (ev) => campo("poseedorDoc")(ev.target.value)
												})
											})
										] }),
										/* @__PURE__ */ jsx(Subtitulo, {
											acciones: /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => setMejoraAbierta(true),
												children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar mejora"]
											}),
											children: "Inventario de mejoras"
										}),
										/* @__PURE__ */ jsx(Tabla, {
											columnas: [
												{
													clave: "tipo",
													titulo: "Tipo",
													ancho: "180px"
												},
												{
													clave: "descripcion",
													titulo: "Descripción"
												},
												{
													clave: "valor",
													titulo: "Valor (S/)",
													alinear: "derecha",
													render: (m) => /* @__PURE__ */ jsx("span", {
														className: "tabular-nums",
														children: moneda(m.valor)
													})
												},
												{
													clave: "acciones",
													titulo: "Acciones",
													alinear: "derecha",
													ancho: "90px",
													render: (m) => /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
														asChild: true,
														children: /* @__PURE__ */ jsx("button", {
															type: "button",
															onClick: () => setAEliminar(m),
															"aria-label": "Quitar mejora",
															className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
															children: /* @__PURE__ */ jsx(Trash2, {
																size: 16,
																"aria-hidden": true
															})
														})
													}), /* @__PURE__ */ jsx(TooltipContent, { children: "Quitar mejora" })] })
												}
											],
											filas: e.mejoras,
											claveFila: (m) => m.id,
											vacio: "Sin mejoras inventariadas. Agregue las edificaciones, cercos, plantaciones e instalaciones del poseedor."
										}),
										e.mejoras.length > 0 && /* @__PURE__ */ jsxs("p", {
											className: "mt-2 text-right text-sm",
											children: [
												"Total de mejoras:",
												" ",
												/* @__PURE__ */ jsx("span", {
													className: "font-semibold tabular-nums",
													children: moneda(total)
												})
											]
										})
									]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Avisos de reconocimiento",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Primer aviso",
												obligatorio: true,
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: e.aviso1Fecha,
													onChange: (ev) => campo("aviso1Fecha")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Diario del primer aviso",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: e.aviso1Diario,
													onChange: (ev) => campo("aviso1Diario")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Segundo aviso",
												obligatorio: true,
												icono: CalendarDays,
												ayuda: "Al menos 3 días calendario después del primero",
												error: intervaloInvalido ? `Solo han pasado ${intervalo} días desde el primer aviso.` : void 0,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: e.aviso2Fecha,
													onChange: (ev) => campo("aviso2Fecha")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Diario del segundo aviso",
												ayuda: "Diario de circulación nacional",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: e.aviso2Diario,
													onChange: (ev) => campo("aviso2Diario")(ev.target.value)
												})
											})
										] }),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3",
											children: /* @__PURE__ */ jsx(HistorialEnvios, {
												proyecto: projectId,
												predio: decodedCodigo,
												paso: "reconocimiento-mejoras",
												editable: true,
												vacio: "Aún no se publicó ningún aviso. Cada fecha de aviso guardada deja una fila."
											})
										}),
										/* @__PURE__ */ jsx(Subtitulo, {
											acciones: /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => setOposicionAbierta(true),
												disabled: !e.aviso2Fecha,
												children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar oposición"]
											}),
											children: "Oposiciones (10 d.h. desde la última publicación)"
										}),
										/* @__PURE__ */ jsx(Tabla, {
											columnas: [
												{
													clave: "fecha",
													titulo: "Fecha",
													ancho: "120px",
													render: (o) => fecha(d(o.fecha))
												},
												{
													clave: "opositor",
													titulo: "Quien se opone"
												},
												{
													clave: "sustento",
													titulo: "Sustento"
												},
												{
													clave: "resultado",
													titulo: "Resultado",
													render: (o) => /* @__PURE__ */ jsx(StatusBadge, {
														tono: o.resultado === "Fundada" ? "destructive" : o.resultado === "Infundada" ? "success" : "warning",
														children: o.resultado
													})
												}
											],
											filas: e.oposiciones,
											claveFila: (o) => o.id,
											vacio: e.aviso2Fecha ? "Sin oposiciones presentadas." : "Las oposiciones se registran después del segundo aviso."
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Pago al poseedor",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Monto pagado",
										icono: Banknote,
										ayuda: total ? `Inventario: ${moneda(total)}` : void 0,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											inputMode: "decimal",
											value: e.pagoMonto,
											onChange: (ev) => campo("pagoMonto")(ev.target.value),
											placeholder: "0.00"
										})
									}), /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Fecha de pago",
										icono: CalendarDays,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "date",
											className: controlClase,
											value: e.pagoFecha,
											onChange: (ev) => campo("pagoFecha")(ev.target.value)
										})
									})] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsx(FormGrid, {
										columnas: 1,
										children: /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Comprobante de pago",
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Comprobante de pago al poseedor",
												numero: e.pagoComprobante || void 0,
												fecha: e.pagoFecha || void 0
											})
										})
									})
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "outline",
									onClick: () => window.history.back(),
									children: "Cancelar"
								}), /* @__PURE__ */ jsxs(Button, {
									type: "submit",
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar reconocimiento de mejoras"]
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Reconocimiento de mejoras",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									setE(r);
									registrarVersion(claveHistorial, {
										accion: "Restauró una versión anterior",
										objeto: `versión ${n}`,
										registro: r
									}, bitacora);
									setMensaje({
										tipo: "exito",
										texto: `Se restauró la versión ${n}. Quedó como una versión nueva.`
									});
								}
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsx(Modal, {
				abierto: mejoraAbierta,
				onCerrar: () => setMejoraAbierta(false),
				titulo: "Agregar mejora",
				ancho: "sm",
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setMejoraAbierta(false),
					children: "Cancelar"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					onClick: agregarMejora,
					children: "Agregar mejora"
				})] }),
				children: /* @__PURE__ */ jsxs(FormGrid, {
					columnas: 1,
					children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Tipo",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsx("select", {
								id,
								className: controlClase,
								value: mejora.tipo,
								onChange: (ev) => setMejora((m) => ({
									...m,
									tipo: ev.target.value
								})),
								children: TIPOS_MEJORA.map((t) => /* @__PURE__ */ jsx("option", { children: t }, t))
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Descripción",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: controlClase,
								value: mejora.descripcion,
								onChange: (ev) => setMejora((m) => ({
									...m,
									descripcion: ev.target.value
								})),
								placeholder: "Material, área, antigüedad"
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Valor (S/)",
							obligatorio: true,
							icono: Banknote,
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: controlClase,
								inputMode: "decimal",
								value: mejora.valor,
								onChange: (ev) => setMejora((m) => ({
									...m,
									valor: ev.target.value
								})),
								placeholder: "0.00"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ jsx(Modal, {
				abierto: oposicionAbierta,
				onCerrar: () => setOposicionAbierta(false),
				titulo: "Registrar oposición",
				ancho: "sm",
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setOposicionAbierta(false),
					children: "Cancelar"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					onClick: agregarOposicion,
					children: "Registrar oposición"
				})] }),
				children: /* @__PURE__ */ jsxs(FormGrid, {
					columnas: 1,
					children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Fecha",
							obligatorio: true,
							icono: CalendarDays,
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								type: "date",
								className: controlClase,
								value: oposicion.fecha,
								onChange: (ev) => setOposicion((o) => ({
									...o,
									fecha: ev.target.value
								}))
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Quien se opone",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: controlClase,
								value: oposicion.opositor,
								onChange: (ev) => setOposicion((o) => ({
									...o,
									opositor: ev.target.value
								}))
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Sustento",
							children: (id) => /* @__PURE__ */ jsx("textarea", {
								id,
								rows: 3,
								className: `${controlClase} h-auto py-2`,
								value: oposicion.sustento,
								onChange: (ev) => setOposicion((o) => ({
									...o,
									sustento: ev.target.value
								}))
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Resultado",
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: controlClase,
								value: oposicion.resultado,
								onChange: (ev) => setOposicion((o) => ({
									...o,
									resultado: ev.target.value
								})),
								children: [
									/* @__PURE__ */ jsx("option", { children: "En evaluación" }),
									/* @__PURE__ */ jsx("option", { children: "Fundada" }),
									/* @__PURE__ */ jsx("option", { children: "Infundada" })
								]
							})
						})
					]
				})
			}),
			aEliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: aEliminar.descripcion,
				tipo: "mejora",
				onCerrar: () => setAEliminar(null),
				onConfirmar: (motivo) => {
					const nuevo = {
						...e,
						mejoras: e.mejoras.filter((m) => m.id !== aEliminar.id)
					};
					setE(nuevo);
					versionar("Eliminó mejora", `${aEliminar.tipo}: ${aEliminar.descripcion}`, nuevo, motivo);
					setAEliminar(null);
					setMensaje({
						tipo: "exito",
						texto: "Mejora eliminada. El histórico conserva su dato y el motivo."
					});
				}
			})
		]
	});
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, tipo, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Eliminar ${tipo}`,
		descripcion: `${nombre} sale del registro. El histórico conserva sus datos y el motivo.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "destructive",
			disabled: motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: [
				/* @__PURE__ */ jsx(Trash2, {}),
				" Eliminar ",
				tipo
			]
		})] }),
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-eliminacion",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-eliminacion",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (ev) => setMotivo(ev.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
//#endregion
export { MejorasPage as component };
