import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { m as fecha, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { $ as estadoLey, E as Modal, F as NOMBRE_ACTIVIDAD, I as NOMBRE_CASO, J as usePerfilPredio, L as NOMBRE_CONDICION, R as NOMBRE_RUTA, U as puedeCambiarRuta, V as corregirPerfil, W as puedeRevertirExpropiacion, n as etiquetaProyecto, t as PredioEncabezado, z as REGLA_CASO } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.modalidad-adquisicion-DlVLOJmo.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { HandCoins, History, Save } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.modalidad-adquisicion.tsx?tsr-split=component
var RUTAS_POR_CONDICION = {
	PRIVADO: [
		"PENDIENTE",
		"TRATO_DIRECTO",
		"EXPROPIACION"
	],
	COMUNAL: [
		"PENDIENTE",
		"TRATO_DIRECTO",
		"EXPROPIACION"
	],
	ESTATAL: ["TRANSFERENCIA"],
	SIN_SUJETO_PASIVO: ["MEJORAS"]
};
var BASE_RUTA = {
	TRATO_DIRECTO: "Título III, art. 19 a 22: carta de intención, aceptación en 10 d.h., pago y formulario registral.",
	EXPROPIACION: "Título IV, art. 24 a 38: exige ley autoritativa vigente; nace del rechazo o el silencio (art. 26).",
	TRANSFERENCIA: "Título VI, art. 41: transferencia gratuita por la SBN en 45 d.h.; sin tasación ni carta de intención.",
	MEJORAS: "DCF 3.ª: el ocupante no es sujeto pasivo; se reconocen mejoras y gastos de traslado.",
	BLOQUE: "Título VIII (DL 1726): el predio está dentro de un bloque aprobado por resolución.",
	PENDIENTE: "Sin ruta definida: trato directo y expropiación quedan deshabilitados en el menú."
};
var ETIQUETAS = {
	condicion: "Condición del predio",
	ruta: "Ruta legal",
	inscrito: "Inscrito en SUNARP",
	ocupado: "Ocupado",
	actividad: "Actividad",
	casoEspecial: "Caso especial",
	entregaAnticipada: "Entrega anticipada"
};
function ModalidadAdquisicionPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const rol = useRol();
	const perfil = usePerfilPredio(projectId, decodedCodigo);
	const versiones = useHistorial(`perfil-${decodedCodigo}`);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const actual = {
		condicion: perfil.condicion,
		ruta: perfil.ruta,
		inscrito: perfil.inscrito,
		ocupado: perfil.ocupado,
		actividad: perfil.actividad,
		casoEspecial: perfil.casoEspecial,
		entregaAnticipada: perfil.entregaAnticipada
	};
	const [d, setD] = useState(actual);
	const firma = JSON.stringify(actual);
	useEffect(() => setD(JSON.parse(firma)), [firma]);
	const [confirmar, setConfirmar] = useState(false);
	const [motivo, setMotivo] = useState("");
	const [mensaje, setMensaje] = useState(null);
	const set = (k, v) => setD((x) => ({
		...x,
		[k]: v
	}));
	const cambios = Object.keys(d).filter((k) => d[k] !== actual[k]);
	const cambiaRuta = d.ruta !== actual.ruta;
	const rutas = RUTAS_POR_CONDICION[d.condicion];
	/** Por qué no se puede guardar este cambio de ruta, o null. */
	const bloqueo = (() => {
		if (!cambiaRuta) return null;
		if (actual.ruta === "EXPROPIACION" && d.ruta === "TRATO_DIRECTO" && !puedeRevertirExpropiacion(rol, d.entregaAnticipada)) return "Volver de expropiación a trato directo requiere entrega anticipada (art. 21.8) o al Administrador.";
		if (!puedeCambiarRuta(rol)) return `Su perfil (${ROLES[rol]}) no cambia la ruta: lo hacen el Especialista legal, el Coordinador y el Administrador.`;
		if (d.ruta === "EXPROPIACION" && !perfil.leyAutoritativa) return "No hay ley autoritativa vigente para el predio (art. 25): regístrela en Normas habilitantes del proyecto.";
		return null;
	})();
	function guardar() {
		const cambiosObj = Object.fromEntries(cambios.map((k) => [k, d[k]]));
		corregirPerfil(decodedCodigo, actual, cambiosObj, cambiaRuta ? `Cambió la ruta a ${NOMBRE_RUTA[d.ruta]}` : "Corrigió el perfil", motivo.trim());
		setConfirmar(false);
		setMotivo("");
		setMensaje("Perfil actualizado. El menú del predio ya refleja la nueva ruta.");
	}
	const ley = perfil.ley;
	const estado = ley ? estadoLey(ley) : void 0;
	const marca = (k) => perfil.origen[k] === "inferido" ? /* @__PURE__ */ jsx("span", {
		className: "ml-1 text-xs text-muted-foreground",
		children: "(inferido)"
	}) : null;
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
				titulo: "Modalidad de adquisición",
				icono: HandCoins,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: perfil.ruta === "PENDIENTE" ? "warning" : "primary",
					children: NOMBRE_RUTA[perfil.ruta]
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "modalidad-adquisicion",
				projectId,
				codigo: decodedCodigo
			}),
			mensaje && /* @__PURE__ */ jsx(Aviso, {
				tipo: "exito",
				onCerrar: () => setMensaje(null),
				children: mensaje
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "perfil",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "perfil",
							children: "Perfil del predio"
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
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "perfil",
						children: [
							/* @__PURE__ */ jsx(InformacionPredio, {
								projectId,
								codigo: decodedCodigo,
								className: "mb-4"
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Condición y ruta legal",
								children: [/* @__PURE__ */ jsx("p", {
									className: "mb-3 text-sm text-muted-foreground",
									children: "El perfil decide qué etapas del menú aplican al predio. Lo que el sistema infiere del padrón, la identificación y el sujeto pasivo se marca «inferido» hasta que una persona lo confirme o corrija aquí."
								}), /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Condición del predio",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											className: controlClase,
											value: d.condicion,
											onChange: (e) => {
												const c = e.target.value;
												setD((x) => ({
													...x,
													condicion: c,
													ruta: RUTAS_POR_CONDICION[c].includes(x.ruta) ? x.ruta : RUTAS_POR_CONDICION[c][0]
												}));
											},
											children: Object.keys(NOMBRE_CONDICION).map((c) => /* @__PURE__ */ jsx("option", {
												value: c,
												children: NOMBRE_CONDICION[c]
											}, c))
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Ruta legal",
										obligatorio: true,
										ayuda: BASE_RUTA[d.ruta],
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											className: controlClase,
											value: d.ruta,
											onChange: (e) => set("ruta", e.target.value),
											children: rutas.map((r) => /* @__PURE__ */ jsx("option", {
												value: r,
												children: NOMBRE_RUTA[r]
											}, r))
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Inscrito en SUNARP",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-4 pt-2 text-sm",
											children: [[true, false].map((v) => /* @__PURE__ */ jsxs("label", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("input", {
													type: "radio",
													name: "inscrito",
													className: "accent-primary",
													checked: d.inscrito === v,
													onChange: () => set("inscrito", v)
												}), v ? "Sí (art. 6)" : "No (art. 7)"]
											}, String(v))), marca("inscrito")]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Ocupado",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-4 pt-2 text-sm",
											children: [[true, false].map((v) => /* @__PURE__ */ jsxs("label", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("input", {
													type: "radio",
													name: "ocupado",
													className: "accent-primary",
													checked: d.ocupado === v,
													onChange: () => set("ocupado", v)
												}), v ? "Ocupado" : "Libre"]
											}, String(v))), marca("ocupado")]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Actividad en el inmueble",
										ayuda: "Industria o comercio en funcionamiento: 90 d.h. de desocupación, hasta 120 (DL 1559).",
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											className: controlClase,
											value: d.actividad,
											onChange: (e) => set("actividad", e.target.value),
											children: Object.keys(NOMBRE_ACTIVIDAD).map((a) => /* @__PURE__ */ jsx("option", {
												value: a,
												children: NOMBRE_ACTIVIDAD[a]
											}, a))
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Caso especial",
										ayuda: d.casoEspecial ? REGLA_CASO[d.casoEspecial] : "Duplicidad, litigio, terceros o sucesión no inscrita cambian a nombre de quién se consigna.",
										children: (id) => /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("select", {
												id,
												className: controlClase,
												value: d.casoEspecial,
												onChange: (e) => set("casoEspecial", e.target.value),
												children: Object.keys(NOMBRE_CASO).map((c) => /* @__PURE__ */ jsx("option", {
													value: c,
													children: NOMBRE_CASO[c]
												}, c))
											}), marca("casoEspecial")]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Entrega anticipada",
										ayuda: "Se registra en 4.5 Entrega anticipada (art. 21.5 y 21.8); aquí solo se muestra.",
										children: /* @__PURE__ */ jsx("span", {
											className: "block pt-2 text-sm",
											children: d.entregaAnticipada ? "Registrada (incentivo 30 %)" : "No registrada"
										})
									})
								] })]
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Normas y bloque que alcanzan al predio",
								className: "mt-4",
								children: /* @__PURE__ */ jsxs("dl", {
									className: "grid grid-cols-1 gap-3 text-sm sm:grid-cols-2",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
										className: "text-xs font-semibold uppercase text-muted-foreground",
										children: "Ley autoritativa (art. 25)"
									}), /* @__PURE__ */ jsxs("dd", { children: [
										ley ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
											"Ley ",
											ley.numero,
											" ·",
											" ",
											estado?.estado === "CADUCA_PRONTO" ? "caduca pronto" : "vigente",
											estado?.caduca && ` hasta el ${fecha(estado.caduca)}`
										] }) : "Ninguna vigente",
										" ",
										/* @__PURE__ */ jsx(Link, {
											to: "/proyectos/$projectId/normas-habilitantes",
											params: { projectId },
											className: "font-medium text-primary-dark underline underline-offset-2",
											children: "Normas habilitantes"
										})
									] })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
										className: "text-xs font-semibold uppercase text-muted-foreground",
										children: "Liberación en bloque (DL 1726)"
									}), /* @__PURE__ */ jsx("dd", { children: perfil.bloque ? `Bloque ${perfil.bloque.nombre} · sector ${perfil.bloque.sector}` : "El predio no está en un bloque" })] })]
								})
							}),
							bloqueo && cambios.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "mt-4",
								children: /* @__PURE__ */ jsx(Aviso, {
									tipo: "aviso",
									children: bloqueo
								})
							}),
							/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								disabled: cambios.length === 0,
								onClick: () => setD(actual),
								children: "Deshacer cambios"
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								disabled: cambios.length === 0 || Boolean(bloqueo),
								onClick: () => setConfirmar(true),
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar perfil"]
							})] })
						]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico del perfil",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: `perfil-${decodedCodigo}`,
								etiquetas: ETIQUETAS,
								nombreArchivo: `historico-perfil-${decodedCodigo}`
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Modal, {
				abierto: confirmar,
				onCerrar: () => setConfirmar(false),
				ancho: "sm",
				titulo: cambiaRuta ? `Cambiar la ruta a ${NOMBRE_RUTA[d.ruta]}` : "Guardar perfil",
				descripcion: `Cambia: ${cambios.map((k) => ETIQUETAS[k]).join(", ")}. Queda en el histórico del predio.`,
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setConfirmar(false),
					children: "Cancelar"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					disabled: motivo.trim().length < 5,
					onClick: guardar,
					children: "Confirmar"
				})] }),
				children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: "motivo-perfil",
					className: "mb-1 block text-sm font-medium",
					children: ["Motivo y sustento ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("textarea", {
					id: "motivo-perfil",
					rows: 3,
					className: `${controlClase} h-auto py-2`,
					value: motivo,
					onChange: (e) => setMotivo(e.target.value),
					placeholder: "Por ejemplo: informe legal N.º 12-2026; partida 11023456 confirma titularidad privada"
				})]
			})
		]
	});
}
//#endregion
export { ModalidadAdquisicionPage as component };
