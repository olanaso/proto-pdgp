import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { m as MotivoModal, n as etiquetaProyecto } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.metas-CaCKwfFe.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { A as validarVinculo, B as guardarMetas, C as puedeEditarVinculo, D as useEjecucionSiaf, F as claveMetas, G as puedeRegistrarMetas, J as useAprobacionesMetas, K as solicitarAprobacionMetas, L as decidirMetas, N as NOMBRE_ESTADO_METAS, P as aprobacionDe, R as ejercicioInicial, V as leerMetas, W as puedeAprobarMetas, c as UNIDADES_MEDIDA, g as guardarVinculo, j as ETIQUETAS_METAS, k as useVinculo, n as FUENTES, o as PLIEGO_MTC, p as estadoVinculo, q as totalProgramado, r as NOMBRE_ESTADO_VINCULO, s as UNIDADES_EJECUTORAS, t as ESPECIFICAS_PREDIALES, w as puedeValidarVinculo, y as metaVacia, z as ejerciciosDesde } from "./siaf-ocJzaGES.js";
import { t as CargaSiaf } from "./CargaSiaf-C7obvddh.js";
import { t as ConciliacionSiaf } from "./ConciliacionSiaf-DB3SkFdm.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, FileSpreadsheet, History, Link2, MessageSquareWarning, Plus, Save, Send, Target, Trash2 } from "lucide-react";
//#region src/components/siaf/VinculoSiaf.tsx
var TONO = {
	SIN_VINCULO: "neutral",
	VINCULADO: "success",
	OBSERVADO: "destructive"
};
var FUENTE_DATOS = {
	"datos-abiertos": "Datos abiertos del MEF (CSV de Consulta Amigable)",
	"export-siaf": "Exportación del SIAF-SP de la unidad ejecutora",
	servicio: "Servicio del MEF (pendiente de convenio)"
};
var celda = `${controlClase} h-8 px-2 text-sm`;
/**
* Lo que identifica al proyecto en el SIAF para un año: pliego, UE, CUI, metas presupuestarias y
* específicas de gasto. Lo completa el Coordinador con la OGPP; Presupuesto lo valida u observa.
*/
function VinculoSiaf({ projectId, anio, nombre }) {
	const rol = useRol();
	const quien = useUsuarioSesion()?.nombre ?? ROLES[rol];
	const guardado = useVinculo(projectId, anio);
	const [v, setV] = useState(guardado);
	const [mensaje, setMensaje] = useState(null);
	const [observar, setObservar] = useState(false);
	useEffect(() => setV(guardado), [guardado]);
	const edita = puedeEditarVinculo(rol);
	const valida = puedeValidarVinculo(rol);
	const errores = validarVinculo(v);
	const estado = estadoVinculo(guardado);
	const poner = (k, valor) => setV((x) => ({
		...x,
		[k]: valor
	}));
	const ponerCui = (i, c) => poner("cuis", v.cuis.map((x, j) => j === i ? {
		...x,
		...c
	} : x));
	const ponerMeta = (i, m) => poner("metas", v.metas.map((x, j) => j === i ? {
		...x,
		...m
	} : x));
	const guardar = () => {
		if (errores.length) {
			setMensaje({
				tipo: "error",
				texto: errores[0]
			});
			return;
		}
		guardarVinculo({
			...v,
			observacion: ""
		}, "Registró el vínculo con el SIAF");
		setMensaje({
			tipo: "exito",
			texto: `Vínculo SIAF ${anio} guardado.`
		});
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: mensaje.tipo,
			onCerrar: () => setMensaje(null),
			children: mensaje.texto
		}),
		estado === "OBSERVADO" && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "error",
			children: ["Presupuesto observó el vínculo: ", guardado.observacion]
		}),
		!edita && !valida && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "info",
			children: [
				"El perfil ",
				ROLES[rol],
				" consulta el vínculo. Lo registra el Coordinador y lo valida Tesorería / Presupuesto."
			]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: `Identificación en el SIAF · ${anio}`,
			acciones: /* @__PURE__ */ jsx(StatusBadge, {
				tono: TONO[estado],
				children: NOMBRE_ESTADO_VINCULO[estado]
			}),
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: [nombre, ". Estos códigos los entrega la OGPP del MTC a partir del PIA; con ellos el sistema filtra la ejecución del SIAF que le corresponde al proyecto."]
				}),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Pliego",
						children: /* @__PURE__ */ jsx("input", {
							value: `${PLIEGO_MTC.codigo} · ${PLIEGO_MTC.nombre}`,
							readOnly: true,
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Unidad ejecutora",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							value: v.unidadEjecutora,
							disabled: !edita,
							onChange: (e) => poner("unidadEjecutora", e.target.value),
							className: controlClase,
							children: UNIDADES_EJECUTORAS.map((u) => /* @__PURE__ */ jsxs("option", {
								value: u.codigo,
								children: [
									u.codigo,
									" · ",
									u.nombre
								]
							}, u.codigo))
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Categoría presupuestal",
						ayuda: "Programa presupuestal o APNOP (9002) en el que se registra la inversión.",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: v.categoriaPresupuestal,
							readOnly: !edita,
							onChange: (e) => poner("categoriaPresupuestal", e.target.value),
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Fuente de datos",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							value: v.fuenteDatos,
							disabled: !edita,
							onChange: (e) => poner("fuenteDatos", e.target.value),
							className: controlClase,
							children: Object.keys(FUENTE_DATOS).map((f) => /* @__PURE__ */ jsx("option", {
								value: f,
								children: FUENTE_DATOS[f]
							}, f))
						})
					})
				] }),
				/* @__PURE__ */ jsx(Subtitulo, {
					acciones: edita && /* @__PURE__ */ jsxs(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => poner("cuis", [...v.cuis, {
							cui: "",
							nombre: "",
							acciones: []
						}]),
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar CUI"]
					}),
					children: "Código único de inversión (CUI)"
				}),
				v.cuis.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Sin CUI registrado."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "space-y-2",
					children: v.cuis.map((c, i) => /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 gap-2 md:grid-cols-[9rem_1fr_1fr_auto]",
						children: [
							/* @__PURE__ */ jsx("input", {
								"aria-label": `CUI ${i + 1}`,
								value: c.cui,
								readOnly: !edita,
								inputMode: "numeric",
								maxLength: 7,
								placeholder: "7 dígitos",
								onChange: (e) => ponerCui(i, { cui: e.target.value.replace(/\D/g, "") }),
								className: `${celda} font-mono`
							}),
							/* @__PURE__ */ jsx("input", {
								"aria-label": `Nombre de la inversión ${i + 1}`,
								value: c.nombre,
								readOnly: !edita,
								placeholder: "Nombre de la inversión",
								onChange: (e) => ponerCui(i, { nombre: e.target.value }),
								className: celda
							}),
							/* @__PURE__ */ jsx("input", {
								"aria-label": `Acciones de inversión ${i + 1}`,
								value: c.acciones.join(", "),
								readOnly: !edita,
								placeholder: "Acciones de inversión, separadas por coma",
								onChange: (e) => ponerCui(i, { acciones: e.target.value.split(",").map((s) => s.trimStart()) }),
								className: celda
							}),
							edita && /* @__PURE__ */ jsx(Button, {
								type: "button",
								size: "sm",
								variant: "ghost",
								"aria-label": `Quitar CUI ${i + 1}`,
								onClick: () => poner("cuis", v.cuis.filter((_, j) => j !== i)),
								children: /* @__PURE__ */ jsx(Trash2, {})
							})
						]
					}, i))
				}),
				/* @__PURE__ */ jsx(Subtitulo, {
					acciones: edita && /* @__PURE__ */ jsxs(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => poner("metas", [...v.metas, metaVacia()]),
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar meta"]
					}),
					children: "Metas presupuestarias"
				}),
				v.metas.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Sin meta presupuestaria registrada."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full min-w-[56rem] text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "text-left text-xs font-semibold uppercase",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-1 py-1",
									children: "N.º meta"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-1 py-1",
									children: "Sec. func."
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-1 py-1",
									children: "Finalidad"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-1 py-1",
									children: "Unidad de medida"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-1 py-1 text-right",
									children: "Cantidad anual"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-1 py-1",
									children: "Fuente · rubro"
								}),
								edita && /* @__PURE__ */ jsx("th", { className: "px-1 py-1" })
							]
						}) }), /* @__PURE__ */ jsx("tbody", { children: v.metas.map((m, i) => /* @__PURE__ */ jsxs("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-1 py-1",
									children: /* @__PURE__ */ jsx("input", {
										"aria-label": `Número de la meta ${i + 1}`,
										value: m.numero,
										readOnly: !edita,
										inputMode: "numeric",
										maxLength: 4,
										placeholder: "0000",
										onChange: (e) => ponerMeta(i, { numero: e.target.value.replace(/\D/g, "") }),
										className: `${celda} w-20 font-mono`
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-1 py-1",
									children: /* @__PURE__ */ jsx("input", {
										"aria-label": `Secuencia funcional de la meta ${i + 1}`,
										value: m.secFunc,
										readOnly: !edita,
										inputMode: "numeric",
										maxLength: 4,
										placeholder: "0000",
										onChange: (e) => ponerMeta(i, { secFunc: e.target.value.replace(/\D/g, "") }),
										className: `${celda} w-20 font-mono`
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-1 py-1",
									children: /* @__PURE__ */ jsx("input", {
										"aria-label": `Finalidad de la meta ${i + 1}`,
										value: m.finalidad,
										readOnly: !edita,
										onChange: (e) => ponerMeta(i, { finalidad: e.target.value }),
										className: `${celda} min-w-56`
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-1 py-1",
									children: /* @__PURE__ */ jsx("select", {
										"aria-label": `Unidad de medida de la meta ${i + 1}`,
										value: m.unidadMedida,
										disabled: !edita,
										onChange: (e) => ponerMeta(i, { unidadMedida: e.target.value }),
										className: `${celda} w-32`,
										children: UNIDADES_MEDIDA.map((u) => /* @__PURE__ */ jsx("option", { children: u }, u))
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-1 py-1",
									children: /* @__PURE__ */ jsx("input", {
										type: "number",
										min: 0,
										"aria-label": `Cantidad anual de la meta ${i + 1}`,
										value: m.cantidadAnual,
										readOnly: !edita,
										onChange: (e) => ponerMeta(i, { cantidadAnual: Math.max(0, Number(e.target.value) || 0) }),
										className: `${celda} w-24 text-right tabular-nums`
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-1 py-1",
									children: /* @__PURE__ */ jsx("select", {
										"aria-label": `Fuente de financiamiento de la meta ${i + 1}`,
										value: m.fuente,
										disabled: !edita,
										onChange: (e) => {
											const f = FUENTES.find((x) => x.codigo === e.target.value);
											ponerMeta(i, {
												fuente: e.target.value,
												rubro: f?.rubro ?? m.rubro
											});
										},
										className: `${celda} w-full min-w-44`,
										children: FUENTES.map((f) => /* @__PURE__ */ jsxs("option", {
											value: f.codigo,
											children: [
												f.codigo,
												" · ",
												f.nombre,
												" · ",
												f.rubro
											]
										}, f.codigo))
									})
								}),
								edita && /* @__PURE__ */ jsx("td", {
									className: "px-1 py-1",
									children: /* @__PURE__ */ jsx(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										"aria-label": `Quitar meta ${i + 1}`,
										onClick: () => poner("metas", v.metas.filter((_, j) => j !== i)),
										children: /* @__PURE__ */ jsx(Trash2, {})
									})
								})
							]
						}, i)) })]
					})
				}),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Específicas de gasto a seguir" }),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 gap-1 md:grid-cols-2",
					children: ESPECIFICAS_PREDIALES.map((e) => /* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: v.especificas.includes(e.codigo),
								disabled: !edita,
								onChange: (ev) => poner("especificas", ev.target.checked ? [...v.especificas, e.codigo] : v.especificas.filter((x) => x !== e.codigo)),
								className: "size-4 rounded-sm accent-primary"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "font-mono text-xs",
								children: e.codigo
							}),
							" ",
							e.nombre
						]
					}, e.codigo))
				}),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Articulación CEPLAN" }),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Objetivo estratégico (OEI)",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: v.ceplan.oei,
							readOnly: !edita,
							onChange: (e) => poner("ceplan", {
								...v.ceplan,
								oei: e.target.value
							}),
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Acción estratégica (AEI)",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: v.ceplan.aei,
							readOnly: !edita,
							onChange: (e) => poner("ceplan", {
								...v.ceplan,
								aei: e.target.value
							}),
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Actividad operativa (AOI)",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: v.ceplan.aoi,
							readOnly: !edita,
							onChange: (e) => poner("ceplan", {
								...v.ceplan,
								aoi: e.target.value
							}),
							className: controlClase
						})
					})
				] }),
				edita && errores.length > 0 && /* @__PURE__ */ jsx("ul", {
					className: "mt-3 list-disc pl-5 text-xs text-destructive",
					children: errores.map((e) => /* @__PURE__ */ jsx("li", { children: e }, e))
				}),
				/* @__PURE__ */ jsxs(FormActions, { children: [valida && estado !== "SIN_VINCULO" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setObservar(true),
					children: [/* @__PURE__ */ jsx(MessageSquareWarning, {}), " Observar vínculo"]
				}), estado === "OBSERVADO" && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => {
						guardarVinculo({
							...guardado,
							observacion: ""
						}, "Validó el vínculo con el SIAF");
						setMensaje({
							tipo: "exito",
							texto: "Vínculo validado."
						});
					},
					children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Validar vínculo"]
				})] }), edita && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: guardar,
					children: [/* @__PURE__ */ jsx(Save, {}), " Guardar vínculo"]
				})] })
			]
		}),
		observar && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: "Observar el vínculo SIAF",
			descripcion: `Vínculo ${anio} de ${nombre}. El Coordinador lo corrige y vuelve a guardarlo.`,
			accion: "Observar vínculo",
			onCerrar: () => setObservar(false),
			onConfirmar: (motivo) => {
				guardarVinculo({
					...guardado,
					observacion: motivo
				}, "Observó el vínculo con el SIAF", motivo);
				setObservar(false);
				setMensaje({
					tipo: "exito",
					texto: `Vínculo observado por ${quien}.`
				});
			}
		})
	] });
}
//#endregion
//#region src/routes/proyectos.$projectId.metas.tsx?tsr-split=component
var TONO_ESTADO = {
	BORRADOR: "neutral",
	EN_APROBACION: "warning",
	APROBADA: "success",
	OBSERVADA: "destructive"
};
var TOTAL = "Total";
/**
* Metas del proyecto (M26): el Coordinador registra, mes a mes, los predios a liberar y el monto a
* ejecutar del ejercicio y pide su aprobación a Presupuesto; Presupuesto las aprueba u observa aquí o en
* Gestión presupuestal. Mientras están en aprobación o aprobadas no se editan; observadas, sí.
*/
function MetasProyectoPage() {
	const { projectId } = Route$1.useParams();
	const proyecto = getProyecto(projectId);
	const nombre = etiquetaProyecto(proyecto, projectId);
	const rol = useRol();
	const quien = useUsuarioSesion()?.nombre ?? ROLES[rol];
	const ejercicios = useMemo(() => ejerciciosDesde(ejercicioInicial(proyecto?.codigo ?? "1")), [proyecto?.codigo]);
	const [ejercicio, setEjercicio] = useState(ejercicios[0]);
	const [metas, setMetas] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const [observar, setObservar] = useState(false);
	const versiones = useHistorial(claveMetas(projectId, ejercicio));
	const aprobacion = aprobacionDe(useAprobacionesMetas(), projectId, ejercicio);
	const vinculo = useVinculo(projectId, ejercicio);
	const { ejecucion } = useEjecucionSiaf(projectId, ejercicio);
	useEffect(() => {
		setMetas(leerMetas(projectId, ejercicio));
		setMensaje(null);
	}, [projectId, ejercicio]);
	const registra = puedeRegistrarMetas(rol);
	const aprueba = puedeAprobarMetas(rol);
	const editable = registra && (aprobacion.estado === "BORRADOR" || aprobacion.estado === "OBSERVADA");
	const filas = metas ? [...metas.fisica.map((m, i) => ({
		mes: m.mes,
		fisica: m.programada,
		financiera: metas.financiera[i]?.programada ?? 0
	})), {
		mes: TOTAL,
		fisica: totalProgramado(metas.fisica),
		financiera: totalProgramado(metas.financiera)
	}] : [];
	const poner = (tipo, mes, valor) => setMetas((m) => m ? {
		...m,
		[tipo]: m[tipo].map((x) => x.mes === mes ? {
			...x,
			programada: Math.max(0, Number(valor) || 0)
		} : x)
	} : m);
	const validar = () => {
		if (!metas) return "Las metas no cargaron.";
		if (totalProgramado(metas.fisica) <= 0) return "Programe al menos un predio a liberar en el año.";
		if (totalProgramado(metas.financiera) <= 0) return "Programe el monto a ejecutar en el año.";
		return null;
	};
	const guardar = () => {
		if (!metas) return;
		guardarMetas(projectId, ejercicio, metas, "Registró las metas del proyecto", `ejercicio ${ejercicio}`);
		setMensaje({
			tipo: "exito",
			texto: `Metas ${ejercicio} guardadas como borrador.`
		});
	};
	const solicitar = () => {
		const e = validar();
		if (e) {
			setMensaje({
				tipo: "error",
				texto: e
			});
			return;
		}
		solicitarAprobacionMetas(projectId, nombre, ejercicio, metas, quien);
		setMensaje({
			tipo: "exito",
			texto: `Metas ${ejercicio} enviadas a Tesorería / Presupuesto para su aprobación.`
		});
	};
	const input = (tipo, f) => f.mes === TOTAL || !editable ? /* @__PURE__ */ jsx("span", {
		className: "tabular-nums",
		children: tipo === "financiera" ? moneda(f[tipo]) : f[tipo].toLocaleString("es-PE")
	}) : /* @__PURE__ */ jsx("input", {
		type: "number",
		min: 0,
		step: tipo === "financiera" ? 1e3 : 1,
		inputMode: "decimal",
		"aria-label": `${tipo === "fisica" ? "Predios a liberar" : "Monto a ejecutar"} en ${f.mes}`,
		value: f[tipo],
		onChange: (e) => poner(tipo, f.mes, e.target.value),
		className: `${controlClase} h-8 max-w-40 text-right tabular-nums`
	});
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [
			/* @__PURE__ */ jsx(ProyectoEncabezado, {
				projectId,
				titulo: "Metas del proyecto",
				icono: Target,
				descripcion: `${nombre} · Predios a liberar y monto a ejecutar por mes. Las registra el Coordinador y las aprueba Presupuesto.`,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: TONO_ESTADO[aprobacion.estado],
					children: NOMBRE_ESTADO_METAS[aprobacion.estado]
				})
			}),
			mensaje && /* @__PURE__ */ jsx(Aviso, {
				tipo: mensaje.tipo,
				onCerrar: () => setMensaje(null),
				children: mensaje.texto
			}),
			aprobacion.estado === "OBSERVADA" && /* @__PURE__ */ jsxs(Aviso, {
				tipo: "error",
				children: [
					"Presupuesto observó las metas ",
					ejercicio,
					aprobacion.decididoPor ? ` (${aprobacion.decididoPor})` : "",
					": ",
					aprobacion.motivo,
					". Corríjalas y vuelva a solicitar la aprobación."
				]
			}),
			aprobacion.estado === "EN_APROBACION" && /* @__PURE__ */ jsxs(Aviso, {
				tipo: "info",
				children: [
					"Enviadas a aprobación el ",
					fechaHora(aprobacion.solicitadoEl ?? ""),
					" por",
					" ",
					aprobacion.solicitadoPor,
					". No se editan mientras Presupuesto las revisa."
				]
			}),
			aprobacion.estado === "APROBADA" && /* @__PURE__ */ jsxs(Aviso, {
				tipo: "exito",
				children: [
					"Aprobadas el ",
					fechaHora(aprobacion.decididoEl ?? ""),
					" por ",
					aprobacion.decididoPor,
					". Los cambios se piden como reprogramación en Gestión presupuestal."
				]
			}),
			!registra && !aprueba && /* @__PURE__ */ jsxs(Aviso, {
				tipo: "info",
				children: [
					"El perfil ",
					ROLES[rol],
					" consulta las metas. Las registra el Coordinador y las aprueba Tesorería / Presupuesto."
				]
			}),
			/* @__PURE__ */ jsx(Section, {
				titulo: "Ejercicio",
				className: "mb-4",
				children: /* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Ejercicio",
					obligatorio: true,
					ayuda: `Vínculo SIAF ${NOMBRE_ESTADO_VINCULO[estadoVinculo(vinculo)].toLowerCase()} · ${ejecucion.length ? `${ejecucion.length} filas de ejecución cargadas` : "sin ejecución cargada"}`,
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						value: ejercicio,
						onChange: (e) => setEjercicio(Number(e.target.value)),
						className: controlClase,
						children: ejercicios.map((y) => /* @__PURE__ */ jsx("option", {
							value: y,
							children: y
						}, y))
					})
				}) })
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "metas",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "metas",
								children: "Metas"
							}),
							/* @__PURE__ */ jsxs(TabsTrigger, {
								value: "vinculo",
								children: [/* @__PURE__ */ jsx(Link2, {
									size: 16,
									className: "mr-1",
									"aria-hidden": true
								}), " Vínculo SIAF"]
							}),
							/* @__PURE__ */ jsxs(TabsTrigger, {
								value: "ejecucion",
								children: [/* @__PURE__ */ jsx(FileSpreadsheet, {
									size: 16,
									className: "mr-1",
									"aria-hidden": true
								}), " Ejecución SIAF"]
							}),
							/* @__PURE__ */ jsxs(TabsTrigger, {
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
							})
						]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "metas",
						children: [/* @__PURE__ */ jsxs(Section, {
							titulo: `Metas ${ejercicio}`,
							children: [/* @__PURE__ */ jsx(Tabla, {
								filas,
								claveFila: (f) => f.mes,
								claseFila: (f) => f.mes === TOTAL ? "bg-muted font-semibold" : void 0,
								vacio: "Cargando metas…",
								columnas: [
									{
										clave: "mes",
										titulo: "Mes"
									},
									{
										clave: "fisica",
										titulo: "Meta física (predios a liberar)",
										alinear: "derecha",
										render: (f) => input("fisica", f)
									},
									{
										clave: "financiera",
										titulo: "Meta financiera (S/ a ejecutar)",
										alinear: "derecha",
										render: (f) => input("financiera", f)
									}
								]
							}), /* @__PURE__ */ jsxs(FormActions, { children: [editable && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: guardar,
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								onClick: solicitar,
								children: [/* @__PURE__ */ jsx(Send, {}), " Solicitar aprobación a Presupuesto"]
							})] }), aprueba && aprobacion.estado === "EN_APROBACION" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setObservar(true),
								children: [/* @__PURE__ */ jsx(MessageSquareWarning, {}), " Observar"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								onClick: () => {
									decidirMetas(projectId, ejercicio, "APROBADA", quien);
									setMensaje({
										tipo: "exito",
										texto: `Metas ${ejercicio} aprobadas.`
									});
								},
								children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Aprobar metas"]
							})] })] })]
						}), /* @__PURE__ */ jsx(Section, {
							titulo: "Solicitudes de aprobación",
							className: "mt-4",
							children: /* @__PURE__ */ jsx(HistorialEnvios, {
								proyecto: projectId,
								paso: "metas-proyecto",
								vacio: "Aún no se solicitó la aprobación de metas."
							})
						})]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "vinculo",
						children: /* @__PURE__ */ jsx(VinculoSiaf, {
							projectId,
							anio: ejercicio,
							nombre
						})
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "ejecucion",
						children: [/* @__PURE__ */ jsx(ConciliacionSiaf, {
							projectId,
							anio: ejercicio,
							metas,
							ejecucion,
							vinculo
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-4",
							children: /* @__PURE__ */ jsx(CargaSiaf, {
								projectId,
								anio: ejercicio,
								vinculo
							})
						})]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: `Histórico de las metas ${ejercicio}`,
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveMetas(projectId, ejercicio),
								etiquetas: ETIQUETAS_METAS,
								nombreArchivo: `historico-${claveMetas(projectId, ejercicio)}`
							})
						})
					})
				]
			}),
			observar && /* @__PURE__ */ jsx(MotivoModal, {
				titulo: "Observar las metas",
				descripcion: `Metas ${ejercicio} de ${nombre}. El Coordinador las corrige y vuelve a pedir la aprobación.`,
				accion: "Observar metas",
				onCerrar: () => setObservar(false),
				onConfirmar: (motivo) => {
					decidirMetas(projectId, ejercicio, "OBSERVADA", quien, motivo);
					setObservar(false);
					setMensaje({
						tipo: "exito",
						texto: `Metas ${ejercicio} observadas.`
					});
				}
			})
		]
	});
}
//#endregion
export { MetasProyectoPage as component };
