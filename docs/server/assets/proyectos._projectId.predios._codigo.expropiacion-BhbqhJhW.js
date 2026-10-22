import { a as controlClase, i as SiNo, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, c as useHitosPredio, f as vencimiento, m as fecha, n as getProyecto, s as registrarHito, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { i as registrarEnviosPorFecha, r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.expropiacion-DDRLVvZu.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { n as useAlmacen, t as idNuevo } from "./almacen-BgvL3X8T.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Banknote, CalendarDays, Gavel, History, Landmark, Plus, Save, Scale } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.expropiacion.tsx?tsr-split=component
var VACIO = {
	fechaRechazo: "",
	leyNumero: "",
	leyFecha: "",
	normaTipo: "RM",
	normaNumero: "",
	normaFecha: "",
	montoTasacion: "",
	inmuebleOcupado: false,
	consignacionNumero: "",
	consignacionFecha: "",
	publicacionFecha: "",
	notificacionFecha: "",
	remisionSunarpFecha: "",
	inscripcionFecha: "",
	entregaFecha: "",
	actaEntrega: "",
	recursos: []
};
var etiquetasHistorial = {
	fechaRechazo: "Fecha de rechazo o vencimiento",
	leyNumero: "Ley autoritativa",
	leyFecha: "Fecha de la ley",
	normaTipo: "Tipo de norma",
	normaNumero: "Número de la norma",
	normaFecha: "Fecha de la norma",
	montoTasacion: "Valor de tasación aprobado",
	inmuebleOcupado: "Inmueble ocupado",
	consignacionNumero: "Certificado de consignación",
	consignacionFecha: "Fecha de consignación",
	publicacionFecha: "Publicación en El Peruano",
	notificacionFecha: "Notificación al sujeto pasivo",
	remisionSunarpFecha: "Remisión a SUNARP",
	inscripcionFecha: "Inscripción registral",
	entregaFecha: "Fecha de entrega del bien",
	actaEntrega: "Acta de entrega",
	recursos: "Recurso",
	tipo: "Tipo",
	fecha: "Fecha",
	detalle: "Detalle",
	estado: "Estado"
};
var d = (iso) => iso ? /* @__PURE__ */ new Date(`${iso}T00:00:00`) : null;
function estadoDe(e) {
	if (e.inscripcionFecha) return {
		texto: "Inscrito a favor del MTC",
		tono: "success"
	};
	if (e.remisionSunarpFecha) return {
		texto: "Título presentado a SUNARP",
		tono: "primary"
	};
	if (e.publicacionFecha) return {
		texto: "Publicado y notificado",
		tono: "primary"
	};
	if (e.consignacionFecha) return {
		texto: "Consignado",
		tono: "primary"
	};
	if (e.normaFecha) return {
		texto: "Norma de ejecución emitida",
		tono: "primary"
	};
	if (e.fechaRechazo) return {
		texto: "Expropiación iniciada",
		tono: "warning"
	};
	return {
		texto: "Sin iniciar",
		tono: "neutral"
	};
}
function ExpropiacionPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const rol = useRol();
	const [e, setE] = useAlmacen(`pdgp-expropiacion-${decodedCodigo}`, VACIO);
	const claveHistorial = `expropiacion-${decodedCodigo}`;
	const versiones = useHistorial(claveHistorial);
	const bitacora = {
		modulo: 16,
		entidad: "expropiacion"
	};
	const hitos = useHitosPredio(decodedCodigo);
	/**
	* Publica los hitos de esta pantalla (paso "expropiacion-procedimiento"). Con la fecha vacía solo borra
	* el hito si lo registró esta pantalla: 5.2 y 5.4 también los registran.
	*/
	function publicarHitos(x) {
		const paso = "expropiacion-procedimiento";
		const fechas = [[
			"norma_expropiacion",
			x.fechaRechazo,
			"Fecha de rechazo o vencimiento (5.3)"
		], [
			"consignacion",
			x.normaFecha,
			"Fecha de la resolución de ejecución (5.3)"
		]];
		for (const [clave, valor, campo] of fechas) if (valor || hitos[clave]?.pantalla === paso) registrarHito(decodedCodigo, clave, valor, paso, campo);
	}
	const versionar = (accion, objeto, despues = e) => registrarCambio(claveHistorial, {
		accion,
		objeto,
		antes: versiones[0]?.registro ?? VACIO,
		despues
	}, bitacora);
	const [mensaje, setMensaje] = useState(null);
	const [recursoAbierto, setRecursoAbierto] = useState(false);
	const [recurso, setRecurso] = useState({
		tipo: "Reconsideración",
		fecha: "",
		detalle: "",
		estado: "En trámite"
	});
	const campo = (k) => (v) => setE((a) => ({
		...a,
		[k]: v
	}));
	const estado = estadoDe(e);
	const venceNorma = d(e.fechaRechazo) && !e.normaFecha ? vencimiento(d(e.fechaRechazo), plazo("norma_expropiacion")) : null;
	const venceConsignacion = d(e.normaFecha) && !e.consignacionFecha ? vencimiento(d(e.normaFecha), plazo("consignacion")) : null;
	const venceRemision = d(e.notificacionFecha) && !e.remisionSunarpFecha ? vencimiento(d(e.notificacionFecha), plazo("remision_sunarp_expropiacion")) : null;
	const venceInscripcion = d(e.remisionSunarpFecha) && !e.inscripcionFecha ? vencimiento(d(e.remisionSunarpFecha), plazo("inscripcion")) : null;
	const venceDesocupacion = d(e.notificacionFecha) && !e.entregaFecha ? vencimiento(d(e.notificacionFecha), plazo(e.inmuebleOcupado ? "desocupacion_ocupado" : "desocupacion_libre")) : null;
	const pasoEstado = (hecho, actual) => hecho ? "completado" : actual ? "actual" : "pendiente";
	const pasos = [
		{
			nombre: "Rechazo de la oferta",
			estado: pasoEstado(Boolean(e.fechaRechazo), !e.fechaRechazo),
			detalle: "Art. 20.5 y 26"
		},
		{
			nombre: "Norma de ejecución",
			estado: pasoEstado(Boolean(e.normaFecha), Boolean(e.fechaRechazo) && !e.normaFecha),
			detalle: "Art. 27 · 10 d.h. desde el rechazo (DL 1559)"
		},
		{
			nombre: "Consignación",
			estado: pasoEstado(Boolean(e.consignacionFecha), Boolean(e.normaFecha) && !e.consignacionFecha),
			detalle: "Art. 28.3 · 10 d.h. (60 en fideicomiso)"
		},
		{
			nombre: "Publicación y notificación",
			estado: pasoEstado(Boolean(e.publicacionFecha && e.notificacionFecha), Boolean(e.consignacionFecha) && !(e.publicacionFecha && e.notificacionFecha)),
			detalle: "Art. 28.4 · El Peruano"
		},
		{
			nombre: "Inscripción en SUNARP",
			estado: pasoEstado(Boolean(e.inscripcionFecha), Boolean(e.notificacionFecha) && !e.inscripcionFecha),
			detalle: "Art. 30 · 5 d.h. + 7 d.h."
		},
		{
			nombre: "Entrega del bien",
			estado: pasoEstado(Boolean(e.entregaFecha), Boolean(e.inscripcionFecha) && !e.entregaFecha),
			detalle: "Art. 31 y 28.1.e"
		}
	];
	/** Solo las fechas que son envíos, como texto, para compararlas entre la versión guardada y la actual. */
	const fechasDeEnvio = (x) => ({
		publicacionFecha: x.publicacionFecha ?? "",
		notificacionFecha: x.notificacionFecha ?? "",
		remisionSunarpFecha: x.remisionSunarpFecha ?? ""
	});
	function guardar(ev) {
		ev.preventDefault();
		if (e.fechaRechazo && !e.leyNumero.trim()) {
			setMensaje({
				tipo: "error",
				texto: "La expropiación requiere una ley autoritativa previa (art. 25). Registre su número."
			});
			return;
		}
		registrarEnviosPorFecha(fechasDeEnvio(versiones[0]?.registro ?? {}), fechasDeEnvio(e), [
			{
				campo: "publicacionFecha",
				canal: "Publicación en El Peruano",
				destinatario: "Diario oficial"
			},
			{
				campo: "notificacionFecha",
				canal: "Notificación de la norma",
				destinatario: "Sujeto pasivo"
			},
			{
				campo: "remisionSunarpFecha",
				canal: "Remisión del título",
				destinatario: "SUNARP"
			}
		]).forEach((env) => registrarEnvio({
			...env,
			proyecto: projectId,
			predio: decodedCodigo,
			paso: "expropiacion"
		}, {
			modulo: 16,
			entidad: "expropiacion"
		}));
		versionar(versiones.length ? "Modificó la expropiación" : "Registró la expropiación", `Predio ${decodedCodigo}: ${estado.texto}`);
		publicarHitos(e);
		setMensaje({
			tipo: "exito",
			texto: `Expropiación del predio ${decodedCodigo} guardada. Estado: ${estado.texto}.`
		});
	}
	function agregarRecurso() {
		if (!recurso.fecha || !recurso.detalle.trim()) {
			setMensaje({
				tipo: "error",
				texto: "Indique la fecha y el detalle del recurso."
			});
			return;
		}
		const nuevo = {
			...e,
			recursos: [{
				id: idNuevo(),
				...recurso
			}, ...e.recursos]
		};
		setE(nuevo);
		versionar("Registró recurso", `${recurso.tipo} del ${recurso.fecha}`, nuevo);
		setRecursoAbierto(false);
		setRecurso({
			tipo: "Reconsideración",
			fecha: "",
			detalle: "",
			estado: "En trámite"
		});
		setMensaje({
			tipo: "exito",
			texto: "Recurso registrado."
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
				titulo: "Expropiación",
				icono: Gavel,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: estado.tono,
					children: estado.texto
				})
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Procedimiento expropiatorio · Título IV del TUO del DL 1192",
				className: "mb-4",
				children: [/* @__PURE__ */ jsx(Stepper, { pasos }), /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "Solo procede si el sujeto pasivo rechazó la oferta o dejó vencer los 10 días hábiles de la carta de intención (art. 20.5), y existe ley autoritativa (art. 25)."
				})]
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
								/* @__PURE__ */ jsx(Section, {
									titulo: "Inicio y ley autoritativa",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de rechazo o vencimiento",
											obligatorio: true,
											icono: CalendarDays,
											ayuda: "Art. 20.5: abre el plazo de 10 d.h. para la norma de ejecución",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: e.fechaRechazo,
												onChange: (ev) => campo("fechaRechazo")(ev.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Plazo para la norma",
											children: /* @__PURE__ */ jsx("div", {
												className: "flex h-9 items-center",
												children: venceNorma ? /* @__PURE__ */ jsx(PlazoBadge, { vence: venceNorma }) : /* @__PURE__ */ jsx("span", {
													className: "text-sm text-muted-foreground",
													children: e.normaFecha ? "Cumplido" : "Registre la fecha de rechazo"
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Ley autoritativa",
											obligatorio: true,
											icono: Scale,
											ayuda: "Art. 25: número de la ley que autoriza la expropiación",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: e.leyNumero,
												onChange: (ev) => campo("leyNumero")(ev.target.value),
												placeholder: "Ley N.º"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de la ley",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: e.leyFecha,
												onChange: (ev) => campo("leyFecha")(ev.target.value)
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Norma de ejecución y consignación",
									className: "mt-4",
									children: [/* @__PURE__ */ jsx(Aviso, {
										tipo: "info",
										children: "La norma de ejecución es inimpugnable (art. 32): en vía arbitral o judicial solo se discute el valor de la tasación, el remanente o la duplicidad de partidas (art. 34). Al guardar, su fecha inicia los 10 d.h. de la consignación (art. 28.3)."
									}), /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Tipo de norma",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: e.normaTipo,
												onChange: (ev) => campo("normaTipo")(ev.target.value),
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "RM",
														children: "Resolución Ministerial"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "RVM",
														children: "Resolución Viceministerial"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "RD",
														children: "Resolución Directoral"
													})
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de la norma",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: e.normaNumero,
												onChange: (ev) => campo("normaNumero")(ev.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de la norma",
											icono: CalendarDays,
											ayuda: "Art. 28.1: aprueba el valor de la tasación y ordena consignar e inscribir",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: e.normaFecha,
												onChange: (ev) => campo("normaFecha")(ev.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Valor de tasación aprobado",
											icono: Banknote,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												inputMode: "decimal",
												value: e.montoTasacion,
												onChange: (ev) => campo("montoTasacion")(ev.target.value),
												placeholder: "0.00"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Certificado de consignación",
											ayuda: "Banco de la Nación",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: e.consignacionNumero,
												onChange: (ev) => campo("consignacionNumero")(ev.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de consignación",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: e.consignacionFecha,
												onChange: (ev) => campo("consignacionFecha")(ev.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Plazo de consignación",
											children: /* @__PURE__ */ jsx("div", {
												className: "flex h-9 items-center",
												children: venceConsignacion ? /* @__PURE__ */ jsx(PlazoBadge, { vence: venceConsignacion }) : /* @__PURE__ */ jsx("span", {
													className: "text-sm text-muted-foreground",
													children: e.consignacionFecha ? `Consignado el ${fecha(d(e.consignacionFecha))}` : "Registre la fecha de la norma"
												})
											})
										}),
										e.montoTasacion && /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Monto a consignar",
											children: /* @__PURE__ */ jsx("div", {
												className: "flex h-9 items-center text-sm font-semibold tabular-nums",
												children: moneda(Number(e.montoTasacion.replace(/,/g, "")))
											})
										})
									] })]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Publicación, inscripción y entrega",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Publicación en El Peruano",
												icono: CalendarDays,
												ayuda: "Art. 28.4",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: e.publicacionFecha,
													onChange: (ev) => campo("publicacionFecha")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Notificación al sujeto pasivo",
												icono: CalendarDays,
												ayuda: "Con copia de la consignación (art. 28.4)",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: e.notificacionFecha,
													onChange: (ev) => campo("notificacionFecha")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Remisión a SUNARP",
												icono: Landmark,
												ayuda: "Art. 30: 5 d.h. desde la norma y la notificación",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: e.remisionSunarpFecha,
													onChange: (ev) => campo("remisionSunarpFecha")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Plazo de remisión",
												children: /* @__PURE__ */ jsx("div", {
													className: "flex h-9 items-center",
													children: venceRemision ? /* @__PURE__ */ jsx(PlazoBadge, { vence: venceRemision }) : /* @__PURE__ */ jsx("span", {
														className: "text-sm text-muted-foreground",
														children: e.remisionSunarpFecha ? "Cumplido" : "Registre la notificación"
													})
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Inscripción registral",
												icono: CalendarDays,
												ayuda: "El registrador inscribe en 7 d.h. (art. 30)",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: e.inscripcionFecha,
													onChange: (ev) => campo("inscripcionFecha")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Plazo de inscripción",
												children: /* @__PURE__ */ jsx("div", {
													className: "flex h-9 items-center",
													children: venceInscripcion ? /* @__PURE__ */ jsx(PlazoBadge, { vence: venceInscripcion }) : /* @__PURE__ */ jsx("span", {
														className: "text-sm text-muted-foreground",
														children: e.inscripcionFecha ? "Inscrito" : "Registre la remisión"
													})
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "¿Inmueble ocupado?",
												ayuda: "Art. 28.1.e: 10 d.h. si está libre, 30 d.h. si está ocupado",
												children: /* @__PURE__ */ jsx(SiNo, {
													valor: e.inmuebleOcupado,
													onCambiar: campo("inmuebleOcupado"),
													nombre: "Inmueble ocupado"
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Plazo de desocupación",
												children: /* @__PURE__ */ jsx("div", {
													className: "flex h-9 items-center",
													children: venceDesocupacion ? /* @__PURE__ */ jsx(PlazoBadge, { vence: venceDesocupacion }) : /* @__PURE__ */ jsx("span", {
														className: "text-sm text-muted-foreground",
														children: e.entregaFecha ? "Entregado" : "Registre la notificación"
													})
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha de entrega del bien",
												icono: CalendarDays,
												ayuda: "Art. 31",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: e.entregaFecha,
													onChange: (ev) => campo("entregaFecha")(ev.target.value)
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Acta de entrega",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: e.actaEntrega,
													onChange: (ev) => campo("actaEntrega")(ev.target.value),
													placeholder: "Número del acta"
												})
											})
										] }),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3",
											children: /* @__PURE__ */ jsx(HistorialEnvios, {
												proyecto: projectId,
												predio: decodedCodigo,
												paso: "expropiacion",
												editable: true
											})
										}),
										/* @__PURE__ */ jsx(Subtitulo, {
											acciones: /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => setRecursoAbierto(true),
												children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar recurso"]
											}),
											children: "Impugnaciones y vía arbitral (art. 32 a 38)"
										}),
										/* @__PURE__ */ jsx(Tabla, {
											columnas: [
												{
													clave: "tipo",
													titulo: "Tipo",
													ancho: "160px"
												},
												{
													clave: "fecha",
													titulo: "Fecha",
													ancho: "120px",
													render: (r) => fecha(d(r.fecha))
												},
												{
													clave: "detalle",
													titulo: "Detalle"
												},
												{
													clave: "estado",
													titulo: "Estado",
													render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
														tono: r.estado === "Fundado" ? "destructive" : r.estado === "Infundado" ? "success" : "warning",
														children: r.estado
													})
												}
											],
											filas: e.recursos,
											claveFila: (r) => r.id,
											vacio: "Sin recursos presentados. Solo cabe cuestionar el valor de la tasación (art. 34)."
										})
									]
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "outline",
									onClick: () => window.history.back(),
									children: "Cancelar"
								}), /* @__PURE__ */ jsxs(Button, {
									type: "submit",
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar expropiación"]
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Expropiación",
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
				abierto: recursoAbierto,
				onCerrar: () => setRecursoAbierto(false),
				titulo: "Registrar recurso",
				ancho: "sm",
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setRecursoAbierto(false),
					children: "Cancelar"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					onClick: agregarRecurso,
					children: "Registrar recurso"
				})] }),
				children: /* @__PURE__ */ jsxs(FormGrid, {
					columnas: 1,
					children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Tipo",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: controlClase,
								value: recurso.tipo,
								onChange: (ev) => setRecurso((r) => ({
									...r,
									tipo: ev.target.value
								})),
								children: [
									/* @__PURE__ */ jsx("option", { children: "Reconsideración" }),
									/* @__PURE__ */ jsx("option", { children: "Apelación" }),
									/* @__PURE__ */ jsx("option", { children: "Arbitraje" }),
									/* @__PURE__ */ jsx("option", { children: "Demanda judicial" })
								]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Fecha",
							obligatorio: true,
							icono: CalendarDays,
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								type: "date",
								className: controlClase,
								value: recurso.fecha,
								onChange: (ev) => setRecurso((r) => ({
									...r,
									fecha: ev.target.value
								}))
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Detalle",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsx("textarea", {
								id,
								rows: 3,
								className: `${controlClase} h-auto py-2`,
								value: recurso.detalle,
								onChange: (ev) => setRecurso((r) => ({
									...r,
									detalle: ev.target.value
								}))
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Estado",
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: controlClase,
								value: recurso.estado,
								onChange: (ev) => setRecurso((r) => ({
									...r,
									estado: ev.target.value
								})),
								children: [
									/* @__PURE__ */ jsx("option", { children: "En trámite" }),
									/* @__PURE__ */ jsx("option", { children: "Fundado" }),
									/* @__PURE__ */ jsx("option", { children: "Infundado" })
								]
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ExpropiacionPage as component };
