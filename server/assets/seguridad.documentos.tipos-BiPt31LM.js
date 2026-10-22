import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { At as useTiposDocumento, Ct as proximoNumero, Ft as useUsuarios, Ot as useDocumentos, Tt as reglaVigente, ct as NOMBRE_DIRIGIDO, jt as useUsuarioSesion, kt as useReglas, qt as useAreas, vt as guardarTipos, yt as idDocumento } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, S as exportarPdf, m as MotivoModal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { FileDown, FileSpreadsheet, FileText, History, Pencil, Plus, Power } from "lucide-react";
//#region src/routes/seguridad.documentos.tipos.tsx?tsr-split=component
var ETIQUETAS = {
	sigla: "Sigla",
	nombre: "Nombre",
	nombreEnNumero: "Nombre en el número",
	dirigidoA: "Dirigido a",
	requiereDestino: "Requiere destino",
	orden: "Orden",
	estado: "Estado",
	subtipos: "Subtipos",
	descripcion: "Descripción"
};
var SIGLA = /^[A-ZÑ0-9]+$/;
function TiposPage() {
	const rol = useRol();
	const edita = rol === "ADMIN";
	const tipos = useTiposDocumento();
	const reglas = useReglas();
	const documentos = useDocumentos();
	const areas = useAreas();
	useUsuarios();
	const yo = useUsuarioSesion();
	const ordenados = useMemo(() => [...tipos].sort((a, b) => a.orden - b.orden), [tipos]);
	const [seleccion, setSeleccion] = useState(ordenados[0]?.id);
	const [editarTipo, setEditarTipo] = useState(null);
	const [editarSub, setEditarSub] = useState(null);
	const [estadoTipo, setEstadoTipo] = useState(null);
	const [estadoSub, setEstadoSub] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const elegido = tipos.find((t) => t.id === seleccion);
	const anio = (/* @__PURE__ */ new Date()).getFullYear();
	const emitidosAnio = (tipoId) => documentos.filter((d) => d.tipoId === tipoId && d.estado === "emitido" && d.fecha.startsWith(String(anio))).length;
	function reemplazar(t, accion, motivo) {
		guardarTipos(tipos.some((x) => x.id === t.id) ? tipos.map((x) => x.id === t.id ? t : x) : [...tipos, t], accion, `${t.sigla} · ${t.nombre}`, motivo);
	}
	const columnasExport = [
		{
			titulo: "Tipo",
			valor: (f) => f.t.nombre
		},
		{
			titulo: "Sigla",
			valor: (f) => f.t.sigla
		},
		{
			titulo: "Subtipo",
			valor: (f) => f.s?.nombre ?? ""
		},
		{
			titulo: "Sigla del subtipo",
			valor: (f) => f.s?.sigla ?? ""
		},
		{
			titulo: "Dirigido a",
			valor: (f) => NOMBRE_DIRIGIDO[f.t.dirigidoA]
		},
		{
			titulo: "Estado",
			valor: (f) => (f.s?.estado ?? f.t.estado) === "ACTIVO" ? "Activo" : "Inactivo"
		}
	];
	const filasExport = ordenados.flatMap((t) => t.subtipos.length ? t.subtipos.map((s) => ({
		t,
		s
	})) : [{ t }]);
	const cabecera = {
		titulo: "Tipos de documento",
		lineas: [`${tipos.length} tipos`]
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: FileText,
			titulo: "Tipos de documento",
			descripcion: "Catálogo de los documentos que genera el sistema. Cada tipo tiene subtipos; la regla de numeración se define en Numeración.",
			migas: [
				{ texto: "Seguridad y configuración" },
				{ texto: "Documentos" },
				{ texto: "Tipos de documento" }
			],
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				edita && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => setEditarTipo({
						nuevo: true,
						tipo: {
							id: idDocumento("tipo"),
							sigla: "",
							nombre: "",
							nombreEnNumero: "",
							dirigidoA: "interno",
							requiereDestino: false,
							orden: Math.max(0, ...tipos.map((t) => t.orden)) + 1,
							estado: "ACTIVO",
							subtipos: []
						}
					}),
					children: [/* @__PURE__ */ jsx(Plus, {}), " Nuevo tipo"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void exportarExcel("tipos-documento", columnasExport, filasExport, cabecera),
					children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Excel"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void exportarPdf("tipos-documento", columnasExport, filasExport, cabecera),
					children: [/* @__PURE__ */ jsx(FileDown, {}), " PDF"]
				})
			] })
		}),
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(null),
			children: mensaje
		}),
		!edita && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "info",
			children: [
				"Ingresó como ",
				ROLES[rol],
				": puede consultar el catálogo. Lo edita el perfil Administrador del sistema."
			]
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "catalogo",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "catalogo",
						children: [
							"Catálogo (",
							tipos.length,
							")"
						]
					}), /* @__PURE__ */ jsxs(TabsTrigger, {
						value: "historico",
						children: [/* @__PURE__ */ jsx(History, {
							size: 16,
							className: "mr-1",
							"aria-hidden": true
						}), " Histórico"]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "catalogo",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 lg:grid-cols-5",
						children: [/* @__PURE__ */ jsx(Section, {
							titulo: "Tipos",
							className: "lg:col-span-2",
							children: /* @__PURE__ */ jsx("ul", {
								className: "divide-y divide-border rounded-md border border-border",
								children: ordenados.map((t) => {
									const activo = t.id === seleccion;
									return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
										type: "button",
										"aria-current": activo ? "true" : void 0,
										onClick: () => setSeleccion(t.id),
										className: `flex w-full items-start justify-between gap-3 px-3 py-2 text-left hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${activo ? "bg-primary-soft" : ""} ${t.estado === "INACTIVO" ? "text-muted-foreground" : ""}`,
										children: [/* @__PURE__ */ jsxs("span", {
											className: "min-w-0",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "block text-sm",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "font-semibold",
														children: t.sigla
													}),
													" ",
													t.nombre
												]
											}), /* @__PURE__ */ jsxs("span", {
												className: "block text-xs text-muted-foreground",
												children: [
													NOMBRE_DIRIGIDO[t.dirigidoA],
													" · ",
													t.subtipos.length,
													" subtipo",
													t.subtipos.length === 1 ? "" : "s",
													" · ",
													emitidosAnio(t.id),
													" emitido",
													emitidosAnio(t.id) === 1 ? "" : "s",
													" en ",
													anio
												]
											})]
										}), t.estado === "INACTIVO" && /* @__PURE__ */ jsx(StatusBadge, {
											tono: "neutral",
											children: "Inactivo"
										})]
									}) }, t.id);
								})
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "lg:col-span-3",
							children: elegido ? /* @__PURE__ */ jsx(DetalleTipo, {
								tipo: elegido,
								edita,
								siguiente: (() => {
									const sub = elegido.subtipos.find((s) => s.estado === "ACTIVO");
									const r = reglaVigente(reglas, elegido.id, sub?.id);
									if (!r || !yo) return void 0;
									return {
										regla: r.nombre,
										numero: proximoNumero(r, elegido, {
											usuario: yo,
											areaEmisoraId: yo.areaId,
											areaDestinoId: "oga",
											subtipoId: sub?.id,
											predios: [],
											fecha: /* @__PURE__ */ new Date()
										}, areas).numero
									};
								})(),
								reglaDe: (s) => reglaVigente(reglas, elegido.id, s.id)?.nombre ?? "Sin regla",
								onEditar: () => setEditarTipo({
									tipo: elegido,
									nuevo: false
								}),
								onEstado: () => setEstadoTipo(elegido),
								onNuevoSub: () => setEditarSub({
									nuevo: true,
									sub: {
										id: idDocumento("sub"),
										sigla: "",
										nombre: "",
										descripcion: "",
										estado: "ACTIVO"
									}
								}),
								onEditarSub: (s) => setEditarSub({
									sub: s,
									nuevo: false
								}),
								onEstadoSub: setEstadoSub
							}) : /* @__PURE__ */ jsx(Section, {
								titulo: "Detalle del tipo",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Elija un tipo de la lista."
								})
							})
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Historico, {
						registro: "documentos-tipos",
						etiquetas: ETIQUETAS,
						nombreArchivo: "historico-tipos-documento"
					})
				})
			]
		}),
		editarTipo && /* @__PURE__ */ jsx(TipoModal, {
			inicial: editarTipo.tipo,
			nuevo: editarTipo.nuevo,
			tipos,
			onCerrar: () => setEditarTipo(null),
			onGuardar: (t) => {
				reemplazar(t, editarTipo.nuevo ? "Creó tipo de documento" : "Modificó tipo de documento");
				setEditarTipo(null);
				setSeleccion(t.id);
				setMensaje(`Tipo ${t.sigla} ${editarTipo.nuevo ? "creado" : "guardado"}.`);
			}
		}),
		editarSub && elegido && /* @__PURE__ */ jsx(SubtipoModal, {
			inicial: editarSub.sub,
			nuevo: editarSub.nuevo,
			tipo: elegido,
			onCerrar: () => setEditarSub(null),
			onGuardar: (s) => {
				const subtipos = editarSub.nuevo ? [...elegido.subtipos, s] : elegido.subtipos.map((x) => x.id === s.id ? s : x);
				reemplazar({
					...elegido,
					subtipos
				}, editarSub.nuevo ? `Creó subtipo ${s.sigla}` : `Modificó subtipo ${s.sigla}`);
				setEditarSub(null);
				setMensaje(`Subtipo ${s.nombre} ${editarSub.nuevo ? "creado" : "guardado"}.`);
			}
		}),
		estadoTipo && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: `${estadoTipo.estado === "ACTIVO" ? "Inactivar" : "Activar"} ${estadoTipo.nombre}`,
			descripcion: estadoTipo.estado === "ACTIVO" ? `El tipo deja de ofrecerse al generar documentos. ${estadoTipo.subtipos.some((s) => s.estado === "ACTIVO") ? "Sus subtipos activos también se inactivan. " : ""}Los documentos ya numerados no cambian.` : "El tipo vuelve a ofrecerse al generar. Los subtipos se activan uno por uno.",
			accion: estadoTipo.estado === "ACTIVO" ? "Inactivar tipo" : "Activar tipo",
			destructiva: estadoTipo.estado === "ACTIVO",
			onCerrar: () => setEstadoTipo(null),
			onConfirmar: (motivo) => {
				const inactivar = estadoTipo.estado === "ACTIVO";
				reemplazar({
					...estadoTipo,
					estado: inactivar ? "INACTIVO" : "ACTIVO",
					subtipos: inactivar ? estadoTipo.subtipos.map((s) => ({
						...s,
						estado: "INACTIVO"
					})) : estadoTipo.subtipos
				}, inactivar ? "Inactivó tipo de documento" : "Activó tipo de documento", motivo);
				setEstadoTipo(null);
				setMensaje(`Tipo ${estadoTipo.sigla} ${inactivar ? "inactivado" : "activado"}.`);
			}
		}),
		estadoSub && elegido && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: `${estadoSub.estado === "ACTIVO" ? "Inactivar" : "Activar"} ${estadoSub.nombre}`,
			accion: estadoSub.estado === "ACTIVO" ? "Inactivar subtipo" : "Activar subtipo",
			destructiva: estadoSub.estado === "ACTIVO",
			bloqueo: estadoSub.estado === "INACTIVO" && elegido.estado === "INACTIVO" ? `El tipo ${elegido.nombre} está inactivo: actívelo primero.` : null,
			onCerrar: () => setEstadoSub(null),
			onConfirmar: (motivo) => {
				const estado = estadoSub.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO";
				reemplazar({
					...elegido,
					subtipos: elegido.subtipos.map((s) => s.id === estadoSub.id ? {
						...s,
						estado
					} : s)
				}, `${estado === "INACTIVO" ? "Inactivó" : "Activó"} subtipo ${estadoSub.sigla}`, motivo);
				setEstadoSub(null);
			}
		})
	] });
}
function DetalleTipo({ tipo, edita, siguiente, reglaDe, onEditar, onEstado, onNuevoSub, onEditarSub, onEstadoSub }) {
	return /* @__PURE__ */ jsxs(Section, {
		titulo: `${tipo.sigla} · ${tipo.nombre}`,
		acciones: edita && /* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: onEditar,
				children: [/* @__PURE__ */ jsx(Pencil, {}), " Editar"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: onEstado,
				children: [
					/* @__PURE__ */ jsx(Power, {}),
					" ",
					tipo.estado === "ACTIVO" ? "Inactivar" : "Activar"
				]
			})]
		}),
		children: [
			/* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-xs text-muted-foreground",
						children: "Nombre en el número"
					}), /* @__PURE__ */ jsx("dd", { children: tipo.nombreEnNumero || "Sin definir" })] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-xs text-muted-foreground",
						children: "Dirigido a"
					}), /* @__PURE__ */ jsx("dd", { children: NOMBRE_DIRIGIDO[tipo.dirigidoA] })] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-xs text-muted-foreground",
						children: "Destino al generar"
					}), /* @__PURE__ */ jsx("dd", { children: tipo.requiereDestino ? "Obligatorio" : "Opcional" })] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-xs text-muted-foreground",
						children: "Estado"
					}), /* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: tipo.estado === "ACTIVO" ? "success" : "neutral",
						children: tipo.estado === "ACTIVO" ? "Activo" : "Inactivo"
					}) })] })
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-3 rounded-md border border-border bg-muted px-3 py-2 text-sm",
				children: siguiente ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
					"Siguiente número con la regla «",
					siguiente.regla,
					"», para su área:",
					" ",
					/* @__PURE__ */ jsx("span", {
						className: "font-mono font-semibold",
						children: siguiente.numero
					})
				] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
					"Este tipo no tiene regla de numeración vigente.",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/seguridad/documentos/numeracion",
						className: "text-primary-dark underline",
						children: "Definir en Numeración"
					})
				] })
			}),
			/* @__PURE__ */ jsx(Subtitulo, {
				acciones: edita && tipo.estado === "ACTIVO" && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					size: "sm",
					onClick: onNuevoSub,
					children: [/* @__PURE__ */ jsx(Plus, {}), " Nuevo subtipo"]
				}),
				children: "Subtipos"
			}),
			/* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "sigla",
						titulo: "Sigla",
						render: (s) => /* @__PURE__ */ jsx("span", {
							className: "font-semibold",
							children: s.sigla
						})
					},
					{
						clave: "nombre",
						titulo: "Nombre",
						render: (s) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
							className: "block",
							children: s.nombre
						}), s.descripcion && /* @__PURE__ */ jsx("span", {
							className: "block text-xs text-muted-foreground",
							children: s.descripcion
						})] })
					},
					{
						clave: "regla",
						titulo: "Regla",
						render: reglaDe
					},
					{
						clave: "estado",
						titulo: "Estado",
						render: (s) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: s.estado === "ACTIVO" ? "success" : "neutral",
							children: s.estado === "ACTIVO" ? "Activo" : "Inactivo"
						})
					},
					...edita ? [{
						clave: "acciones",
						titulo: "Acciones",
						render: (s) => /* @__PURE__ */ jsxs("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								title: `Editar ${s.nombre}`,
								"aria-label": `Editar ${s.nombre}`,
								onClick: () => onEditarSub(s),
								children: /* @__PURE__ */ jsx(Pencil, {})
							}), /* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								title: `${s.estado === "ACTIVO" ? "Inactivar" : "Activar"} ${s.nombre}`,
								"aria-label": `${s.estado === "ACTIVO" ? "Inactivar" : "Activar"} ${s.nombre}`,
								onClick: () => onEstadoSub(s),
								children: /* @__PURE__ */ jsx(Power, {})
							})]
						})
					}] : []
				],
				filas: tipo.subtipos,
				claveFila: (s) => s.id,
				vacio: "Este tipo no tiene subtipos: se numera solo por tipo."
			})
		]
	});
}
function TipoModal({ inicial, nuevo, tipos, onCerrar, onGuardar }) {
	const [t, setT] = useState(inicial);
	const [intentado, setIntentado] = useState(false);
	const set = (k, v) => setT((x) => ({
		...x,
		[k]: v
	}));
	const sigla = t.sigla.trim().toUpperCase();
	const error = !sigla ? "Ingrese la sigla." : !SIGLA.test(sigla) ? "La sigla solo admite letras y números." : tipos.some((x) => x.id !== t.id && x.sigla.toUpperCase() === sigla) ? `La sigla ${sigla} ya la usa otro tipo.` : !t.nombre.trim() ? "Ingrese el nombre." : null;
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "xl",
		titulo: nuevo ? "Nuevo tipo de documento" : `Editar ${inicial.nombre}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			onClick: () => {
				setIntentado(true);
				if (!error) onGuardar({
					...t,
					sigla,
					nombre: t.nombre.trim(),
					nombreEnNumero: (t.nombreEnNumero.trim() || t.nombre.trim()).toUpperCase()
				});
			},
			children: nuevo ? "Crear tipo" : "Guardar tipo"
		})] }),
		children: [intentado && error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: error
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sigla",
				obligatorio: true,
				ayuda: "Única. Entra al número si la regla la usa. Por ejemplo: OF.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} uppercase`,
					maxLength: 8,
					value: t.sigla,
					onChange: (e) => set("sigla", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: t.nombre,
					onChange: (e) => set("nombre", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre en el número",
				ayuda: "Se imprime antes de «N.°». Vacío: el nombre en mayúsculas.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} uppercase`,
					value: t.nombreEnNumero,
					onChange: (e) => set("nombreEnNumero", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Dirigido a",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: t.dirigidoA,
					onChange: (e) => set("dirigidoA", e.target.value),
					children: Object.keys(NOMBRE_DIRIGIDO).map((d) => /* @__PURE__ */ jsx("option", {
						value: d,
						children: NOMBRE_DIRIGIDO[d]
					}, d))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Destino obligatorio",
				ayuda: "Al generar se exige un área destino o un destinatario externo.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "checkbox",
					className: "mt-2 size-4 accent-primary",
					checked: t.requiereDestino,
					onChange: (e) => set("requiereDestino", e.target.checked)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Orden",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "number",
					min: 1,
					className: controlClase,
					value: t.orden,
					onChange: (e) => set("orden", Number(e.target.value) || 1)
				})
			})
		] })]
	});
}
function SubtipoModal({ inicial, nuevo, tipo, onCerrar, onGuardar }) {
	const [s, setS] = useState(inicial);
	const [intentado, setIntentado] = useState(false);
	const set = (k, v) => setS((x) => ({
		...x,
		[k]: v
	}));
	const sigla = s.sigla.trim().toUpperCase();
	const error = !sigla ? "Ingrese la sigla." : !SIGLA.test(sigla) ? "La sigla solo admite letras y números." : tipo.subtipos.some((x) => x.id !== s.id && x.sigla.toUpperCase() === sigla) ? `La sigla ${sigla} ya la usa otro subtipo de ${tipo.nombre}.` : !s.nombre.trim() ? "Ingrese el nombre." : null;
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "md",
		titulo: nuevo ? `Nuevo subtipo de ${tipo.nombre}` : `Editar ${inicial.nombre}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			onClick: () => {
				setIntentado(true);
				if (!error) onGuardar({
					...s,
					sigla,
					nombre: s.nombre.trim(),
					descripcion: s.descripcion.trim()
				});
			},
			children: nuevo ? "Crear subtipo" : "Guardar subtipo"
		})] }),
		children: [intentado && error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: error
		}), /* @__PURE__ */ jsxs(FormGrid, {
			columnas: 1,
			children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Sigla",
					obligatorio: true,
					ayuda: "Única dentro del tipo. Por ejemplo: PAG.",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: `${controlClase} uppercase`,
						maxLength: 8,
						value: s.sigla,
						onChange: (e) => set("sigla", e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Nombre",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: s.nombre,
						onChange: (e) => set("nombre", e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Descripción",
					ayuda: "Cuándo se usa.",
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						rows: 2,
						className: `${controlClase} h-auto py-2`,
						value: s.descripcion,
						onChange: (e) => set("descripcion", e.target.value)
					})
				})
			]
		})]
	});
}
//#endregion
export { TiposPage as component };
