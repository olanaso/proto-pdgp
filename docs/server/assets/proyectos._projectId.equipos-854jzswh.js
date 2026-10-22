import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { i as TooltipContent, n as StatusBadge, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { a as rolesBrigada, c as writeProjectBrigades, i as readProjectBrigades, o as tiposUsuario, r as initialProjectBrigades, s as usuariosEquipo } from "./projectTeamsData-D-Nygxw-.js";
import { E as Modal } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useEffect, useId, useMemo, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, History, Pencil, Plus, Save, Search, Trash2, Users } from "lucide-react";
//#region src/routes/proyectos.$projectId.equipos.tsx?tsr-split=component
var TIPO_TONO = {
	Técnico: "primary",
	Legal: "warning",
	Administrativo: "success",
	Otro: "neutral"
};
var ROL_TONO = {
	Coordinador: "success",
	"Responsable Técnico": "primary",
	"Responsable Legal": "warning",
	"Especialista Predial": "primary",
	Miembro: "neutral"
};
var ESTADO_TONO = {
	Activa: "success",
	"En formación": "primary",
	Programada: "warning"
};
/** Fecha aaaa-mm-dd a dd/mm/aaaa sin corrimiento de zona horaria. */
var fechaCorta = (iso) => iso ? fecha(`${iso}T00:00:00`) : "sin fecha";
function getUsuario(id) {
	return usuariosEquipo.find((u) => u.id === id);
}
var ETIQUETAS = {
	codigo: "Código",
	zona: "Zona o tramo",
	coordinadorId: "Coordinador (usuario)",
	vigenciaIni: "Vigencia desde",
	vigenciaFin: "Vigencia hasta",
	estado: "Estado",
	descripcion: "Descripción",
	integrantes: "Integrante",
	rol: "Rol en la brigada",
	usuarioId: "Usuario"
};
var aVersion = (lista) => lista.map((b) => ({
	...b,
	integrantes: b.integrantes.map((i) => ({
		...i,
		nombre: getUsuario(i.usuarioId)?.nombre ?? i.usuarioId
	}))
}));
var desdeVersion = (lista) => lista.map((b) => ({
	...b,
	integrantes: b.integrantes.map(({ usuarioId, rol }) => ({
		usuarioId,
		rol
	}))
}));
function EquiposPage() {
	const { projectId } = useParams({ from: "/proyectos/$projectId/equipos" });
	const [brigadas, setBrigadas] = useState(initialProjectBrigades);
	const [selectedId, setSelectedId] = useState(initialProjectBrigades[0].id);
	const [loadedProjectId, setLoadedProjectId] = useState(null);
	const [showNew, setShowNew] = useState(false);
	const [showAddMember, setShowAddMember] = useState(false);
	const [editId, setEditId] = useState(null);
	const [baja, setBaja] = useState(null);
	const rol = useRol();
	const claveHistorial = `equipos-${projectId}`;
	const versiones = useHistorial(claveHistorial);
	const bitacora = {
		modulo: 10,
		entidad: "brigada"
	};
	/** Guarda la lista y deja la versión en el histórico (la primera vez, antes guarda cómo estaba). */
	function guardar(nuevas, accion, objeto, motivo) {
		registrarCambio(claveHistorial, {
			accion,
			objeto,
			motivo,
			antes: aVersion(brigadas),
			despues: aVersion(nuevas)
		}, bitacora);
		setBrigadas(nuevas);
	}
	useEffect(() => {
		const storedBrigades = readProjectBrigades(projectId);
		setBrigadas(storedBrigades);
		setSelectedId(storedBrigades[0]?.id ?? "");
		setLoadedProjectId(projectId);
	}, [projectId]);
	useEffect(() => {
		if (loadedProjectId === projectId) writeProjectBrigades(projectId, brigadas);
	}, [
		brigadas,
		loadedProjectId,
		projectId
	]);
	const selected = brigadas.find((b) => b.id === selectedId) ?? brigadas[0];
	const resumen = useMemo(() => ({
		registradas: brigadas.length,
		activas: brigadas.filter((b) => b.estado === "Activa").length,
		usuarios: new Set(brigadas.flatMap((b) => b.integrantes.map((i) => i.usuarioId))).size,
		roles: rolesBrigada.length
	}), [brigadas]);
	function addBrigada(b) {
		const id = "b" + Date.now();
		const integrantes = b.integrantes.find((i) => i.usuarioId === b.coordinadorId) ? b.integrantes : [{
			usuarioId: b.coordinadorId,
			rol: "Coordinador"
		}, ...b.integrantes];
		guardar([...brigadas, {
			...b,
			id,
			integrantes
		}], "Registró brigada", `${b.nombre} (${b.codigo})`);
	}
	function updateBrigada(id, b) {
		const integrantes = b.integrantes.find((i) => i.usuarioId === b.coordinadorId) ? b.integrantes : [{
			usuarioId: b.coordinadorId,
			rol: "Coordinador"
		}, ...b.integrantes];
		guardar(brigadas.map((x) => x.id === id ? {
			...b,
			id,
			integrantes
		} : x), "Modificó brigada", `${b.nombre} (${b.codigo})`);
	}
	function removeBrigada(brigada, motivo) {
		guardar(brigadas.filter((b) => b.id !== brigada.id), "Eliminó brigada", `${brigada.nombre} (${brigada.codigo})`, motivo);
		if (selectedId === brigada.id) setSelectedId(brigadas.find((b) => b.id !== brigada.id)?.id ?? "");
		setBaja(null);
	}
	function addMember(brigadaId, integrante) {
		const brigada = brigadas.find((b) => b.id === brigadaId);
		if (!brigada || brigada.integrantes.some((i) => i.usuarioId === integrante.usuarioId)) return;
		guardar(brigadas.map((b) => b.id === brigadaId ? {
			...b,
			integrantes: [...b.integrantes, integrante]
		} : b), "Agregó integrante", `${getUsuario(integrante.usuarioId)?.nombre ?? integrante.usuarioId} a ${brigada.nombre}`);
	}
	function removeMember(brigada, integrante, motivo) {
		guardar(brigadas.map((b) => b.id === brigada.id ? {
			...b,
			integrantes: b.integrantes.filter((i) => i.usuarioId !== integrante.usuarioId)
		} : b), "Quitó integrante", `${getUsuario(integrante.usuarioId)?.nombre ?? integrante.usuarioId} de ${brigada.nombre}`, motivo);
		setBaja(null);
	}
	function restaurar(lista, n) {
		const brigadasRestauradas = desdeVersion(lista);
		guardar(brigadasRestauradas, "Restauró una versión anterior", `versión ${n}`);
		setSelectedId(brigadasRestauradas[0]?.id ?? "");
	}
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [
			/* @__PURE__ */ jsx(ProyectoEncabezado, {
				projectId,
				titulo: "Equipos y brigadas",
				icono: Users,
				descripcion: `${resumen.registradas} brigadas · ${resumen.activas} activas · ${resumen.usuarios} usuarios asignados · ${resumen.roles} roles definidos`,
				acciones: /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => setShowNew(true),
					children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar brigada"]
				})
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "brigadas",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "brigadas",
							children: "Brigadas"
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
						value: "brigadas",
						children: [/* @__PURE__ */ jsx(Section, {
							titulo: "Brigadas del proyecto",
							className: "mb-4",
							children: brigadas.length === 0 ? /* @__PURE__ */ jsx("p", {
								className: "py-6 text-center text-sm text-muted-foreground",
								children: "No hay brigadas registradas. Registre la primera con el botón de arriba."
							}) : /* @__PURE__ */ jsx("ul", {
								className: "grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3",
								children: brigadas.map((b) => {
									const activa = selected?.id === b.id;
									return /* @__PURE__ */ jsxs("li", {
										className: `rounded-lg border p-4 ${activa ? "border-primary bg-primary-soft/30" : "border-border bg-card"}`,
										"aria-current": activa ? "true" : void 0,
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-start justify-between gap-2",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ jsx("p", {
														className: "text-xs font-semibold text-primary-dark",
														children: b.codigo
													}), /* @__PURE__ */ jsx("h3", {
														className: "truncate text-sm font-semibold",
														children: b.nombre
													})]
												}), /* @__PURE__ */ jsx(StatusBadge, {
													tono: ESTADO_TONO[b.estado],
													children: b.estado
												})]
											}),
											/* @__PURE__ */ jsxs("dl", {
												className: "mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs",
												children: [
													/* @__PURE__ */ jsx(DatoTarjeta, {
														etiqueta: "Zona o tramo",
														valor: b.zona || "Sin zona"
													}),
													/* @__PURE__ */ jsx(DatoTarjeta, {
														etiqueta: "Coordinador",
														valor: getUsuario(b.coordinadorId)?.nombre ?? "Sin asignar"
													}),
													/* @__PURE__ */ jsx(DatoTarjeta, {
														etiqueta: "Integrantes",
														valor: String(b.integrantes.length)
													}),
													/* @__PURE__ */ jsx(DatoTarjeta, {
														etiqueta: "Vigencia",
														valor: `${fechaCorta(b.vigenciaIni)} al ${fechaCorta(b.vigenciaFin)}`
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-3 flex items-center justify-between gap-2 border-t border-border pt-3",
												children: [/* @__PURE__ */ jsxs(Button, {
													type: "button",
													variant: activa ? "default" : "outline",
													size: "sm",
													onClick: () => setSelectedId(b.id),
													"aria-pressed": activa,
													children: [
														/* @__PURE__ */ jsx(Users, {}),
														" ",
														activa ? "Seleccionada" : "Ver integrantes"
													]
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ jsx(AccionIcono, {
														nombre: "Editar brigada",
														icono: Pencil,
														onClick: () => setEditId(b.id)
													}), /* @__PURE__ */ jsx(AccionIcono, {
														nombre: "Eliminar brigada",
														icono: Trash2,
														destructiva: true,
														onClick: () => setBaja({ brigada: b })
													})]
												})]
											})
										]
									}, b.id);
								})
							})
						}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Section, {
							titulo: "Composición de la brigada seleccionada",
							acciones: selected && /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setShowAddMember(true),
								children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar integrante"]
							}),
							children: !selected ? /* @__PURE__ */ jsx("p", {
								className: "py-6 text-center text-sm text-muted-foreground",
								children: "Seleccione una brigada para ver su composición."
							}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
								/* @__PURE__ */ jsx(FormGrid, {
									columnas: 1,
									children: /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Brigada",
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											value: selected.id,
											onChange: (e) => setSelectedId(e.target.value),
											className: controlClase,
											children: brigadas.map((b) => /* @__PURE__ */ jsxs("option", {
												value: b.id,
												children: [
													b.nombre,
													" (",
													b.codigo,
													")"
												]
											}, b.id))
										})
									})
								}),
								/* @__PURE__ */ jsx(Subtitulo, { children: "Información de la brigada" }),
								/* @__PURE__ */ jsxs("dl", {
									className: "grid grid-cols-1 gap-x-6 gap-y-2 text-sm md:grid-cols-2",
									children: [
										/* @__PURE__ */ jsx(DatoFila, {
											etiqueta: "Código",
											valor: selected.codigo
										}),
										/* @__PURE__ */ jsx(DatoFila, {
											etiqueta: "Nombre",
											valor: selected.nombre
										}),
										/* @__PURE__ */ jsx(DatoFila, {
											etiqueta: "Zona o tramo",
											valor: selected.zona || "Sin zona"
										}),
										/* @__PURE__ */ jsx(DatoFila, {
											etiqueta: "Coordinador",
											valor: getUsuario(selected.coordinadorId)?.nombre ?? "Sin asignar"
										}),
										/* @__PURE__ */ jsx(DatoFila, {
											etiqueta: "Vigencia",
											valor: `${fechaCorta(selected.vigenciaIni)} al ${fechaCorta(selected.vigenciaFin)}`
										}),
										/* @__PURE__ */ jsx(DatoFila, {
											etiqueta: "Estado",
											valor: /* @__PURE__ */ jsx(StatusBadge, {
												tono: ESTADO_TONO[selected.estado],
												children: selected.estado
											})
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "md:col-span-2",
											children: [/* @__PURE__ */ jsx("dt", {
												className: "text-xs text-muted-foreground",
												children: "Descripción"
											}), /* @__PURE__ */ jsx("dd", { children: selected.descripcion || "Sin descripción" })]
										})
									]
								}),
								/* @__PURE__ */ jsxs(Subtitulo, { children: [
									"Integrantes (",
									selected.integrantes.length,
									")"
								] }),
								/* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "nombre",
											titulo: "Nombre",
											render: (i) => /* @__PURE__ */ jsx("span", {
												className: "font-medium",
												children: getUsuario(i.usuarioId)?.nombre
											})
										},
										{
											clave: "tipo",
											titulo: "Tipo",
											render: (i) => {
												const u = getUsuario(i.usuarioId);
												return u ? /* @__PURE__ */ jsx(StatusBadge, {
													tono: TIPO_TONO[u.tipo],
													children: u.tipo
												}) : null;
											}
										},
										{
											clave: "rol",
											titulo: "Rol en la brigada",
											render: (i) => /* @__PURE__ */ jsx(StatusBadge, {
												tono: ROL_TONO[i.rol],
												children: i.rol
											})
										},
										{
											clave: "especialidad",
											titulo: "Especialidad o área",
											render: (i) => getUsuario(i.usuarioId)?.especialidad ?? ""
										},
										{
											clave: "acciones",
											titulo: "Acciones",
											alinear: "derecha",
											render: (i) => /* @__PURE__ */ jsx(AccionIcono, {
												nombre: "Quitar de la brigada",
												icono: Trash2,
												destructiva: true,
												onClick: () => setBaja({
													brigada: selected,
													integrante: i
												})
											})
										}
									],
									filas: selected.integrantes.filter((i) => getUsuario(i.usuarioId)),
									claveFila: (i) => i.usuarioId,
									vacio: "Esta brigada aún no tiene integrantes."
								})
							] })
						}) })]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico de equipos y brigadas",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS,
								nombreArchivo: `historico-equipos-${projectId}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: restaurar
							})
						})
					})
				]
			}),
			showNew && /* @__PURE__ */ jsx(BrigadaFormModal, {
				mode: "create",
				onClose: () => setShowNew(false),
				onSubmit: (b) => {
					addBrigada(b);
					setShowNew(false);
				},
				initial: {
					codigo: `BRG-CAB-${String(brigadas.length + 1).padStart(3, "0")}`,
					nombre: "",
					zona: "",
					coordinadorId: "",
					vigenciaIni: "",
					vigenciaFin: "",
					estado: "En formación",
					descripcion: "",
					integrantes: []
				}
			}),
			editId && (() => {
				const b = brigadas.find((x) => x.id === editId);
				if (!b) return null;
				return /* @__PURE__ */ jsx(BrigadaFormModal, {
					mode: "edit",
					onClose: () => setEditId(null),
					onSubmit: (data) => {
						updateBrigada(editId, data);
						setEditId(null);
					},
					initial: b
				});
			})(),
			showAddMember && selected && /* @__PURE__ */ jsx(AddMemberModal, {
				existing: selected.integrantes.map((i) => i.usuarioId),
				onClose: () => setShowAddMember(false),
				onAdd: (i) => {
					addMember(selected.id, i);
					setShowAddMember(false);
				}
			}),
			baja && !baja.integrante && /* @__PURE__ */ jsx(MotivoEliminacion, {
				tipo: "brigada",
				nombre: `${baja.brigada.nombre} (${baja.brigada.codigo})`,
				descripcion: `La brigada ${baja.brigada.nombre} (${baja.brigada.codigo}) y la asignación de sus ${baja.brigada.integrantes.length} integrantes se quitarán del proyecto. El histórico conserva sus datos y el motivo.`,
				onCerrar: () => setBaja(null),
				onConfirmar: (motivo) => removeBrigada(baja.brigada, motivo)
			}),
			baja?.integrante && /* @__PURE__ */ jsx(MotivoEliminacion, {
				tipo: "integrante",
				nombre: `${getUsuario(baja.integrante.usuarioId)?.nombre ?? "El integrante"} sale de ${baja.brigada.nombre}`,
				onCerrar: () => setBaja(null),
				onConfirmar: (motivo) => removeMember(baja.brigada, baja.integrante, motivo)
			})
		]
	});
}
/** Modal de baja: el motivo (mínimo 5 caracteres) queda en el histórico. */
function MotivoEliminacion({ nombre, tipo, descripcion, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Eliminar ${tipo}`,
		descripcion: descripcion ?? `${nombre} sale del registro. El histórico conserva sus datos y el motivo.`,
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
				onChange: (e) => setMotivo(e.target.value),
				placeholder: "Por ejemplo: se registró por error; ya no corresponde"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function DatoTarjeta({ etiqueta, valor }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-muted-foreground",
			children: etiqueta
		}), /* @__PURE__ */ jsx("dd", {
			className: "truncate font-medium",
			title: valor,
			children: valor
		})]
	});
}
function DatoFila({ etiqueta, valor }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start justify-between gap-3 border-b border-border py-1.5",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-muted-foreground",
			children: etiqueta
		}), /* @__PURE__ */ jsx("dd", {
			className: "text-right font-medium",
			children: valor
		})]
	});
}
/** Botón de ícono 32 × 32 con tooltip obligatorio (mismo patrón que CrudPage). */
function AccionIcono({ nombre, icono: Icono, onClick, destructiva }) {
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick,
			"aria-label": nombre,
			className: `flex size-8 items-center justify-center rounded-md border border-border ${destructiva ? "text-destructive hover:bg-destructive-soft" : "text-primary-dark hover:bg-primary-soft"}`,
			children: /* @__PURE__ */ jsx(Icono, {
				size: 16,
				"aria-hidden": true
			})
		})
	}), /* @__PURE__ */ jsx(TooltipContent, { children: nombre })] });
}
function FiltroTipo({ valor, onCambiar }) {
	return /* @__PURE__ */ jsxs("div", {
		role: "group",
		"aria-label": "Filtrar por tipo de usuario",
		className: "flex flex-wrap gap-1.5",
		children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			size: "sm",
			variant: valor === "" ? "default" : "outline",
			"aria-pressed": valor === "",
			onClick: () => onCambiar(""),
			children: "Todos"
		}), tiposUsuario.map((t) => /* @__PURE__ */ jsx(Button, {
			type: "button",
			size: "sm",
			variant: valor === t ? "default" : "outline",
			"aria-pressed": valor === t,
			onClick: () => onCambiar(t),
			children: t
		}, t))]
	});
}
function UserAutocomplete({ id, value, onChange, exclude = [], placeholder = "Buscar usuario por nombre" }) {
	const [query, setQuery] = useState(value ? usuariosEquipo.find((u) => u.id === value)?.nombre ?? "" : "");
	const [open, setOpen] = useState(false);
	const filtered = usuariosEquipo.filter((u) => !exclude.includes(u.id)).filter((u) => u.nombre.toLowerCase().includes(query.toLowerCase()) || u.especialidad.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [/* @__PURE__ */ jsx(Search, {
				size: 16,
				className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": true
			}), /* @__PURE__ */ jsx("input", {
				id,
				value: query,
				onChange: (e) => {
					setQuery(e.target.value);
					setOpen(true);
					onChange("");
				},
				onFocus: () => setOpen(true),
				onBlur: () => setTimeout(() => setOpen(false), 150),
				placeholder,
				autoComplete: "off",
				role: "combobox",
				"aria-expanded": open && filtered.length > 0,
				"aria-autocomplete": "list",
				className: `${controlClase} pl-9`
			})]
		}), open && filtered.length > 0 && /* @__PURE__ */ jsx("ul", {
			role: "listbox",
			className: "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-card",
			children: filtered.map((u) => /* @__PURE__ */ jsx("li", {
				role: "option",
				"aria-selected": u.id === value,
				children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => {
						onChange(u.id);
						setQuery(u.nombre);
						setOpen(false);
					},
					className: "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-primary-soft",
					children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
						className: "block font-medium",
						children: u.nombre
					}), /* @__PURE__ */ jsx("span", {
						className: "block text-xs text-muted-foreground",
						children: u.especialidad
					})] }), /* @__PURE__ */ jsx(StatusBadge, {
						tono: TIPO_TONO[u.tipo],
						children: u.tipo
					})]
				})
			}, u.id))
		})]
	});
}
function BrigadaFormModal({ mode, onClose, onSubmit, initial }) {
	const formId = useId();
	const [codigo, setCodigo] = useState(initial.codigo);
	const [nombre, setNombre] = useState(initial.nombre);
	const [zona, setZona] = useState(initial.zona);
	const [coordinadorId, setCoordinadorId] = useState(initial.coordinadorId);
	const [vigenciaIni, setVigenciaIni] = useState(initial.vigenciaIni);
	const [vigenciaFin, setVigenciaFin] = useState(initial.vigenciaFin);
	const [estado, setEstado] = useState(initial.estado);
	const [descripcion, setDescripcion] = useState(initial.descripcion);
	const [integrantes, setIntegrantes] = useState(initial.integrantes);
	const [error, setError] = useState("");
	const [newMemberId, setNewMemberId] = useState("");
	const [newMemberRol, setNewMemberRol] = useState("Miembro");
	const [filtroTipo, setFiltroTipo] = useState("");
	function addMember() {
		if (!newMemberId) return;
		if (integrantes.find((i) => i.usuarioId === newMemberId)) return;
		setIntegrantes((arr) => [...arr, {
			usuarioId: newMemberId,
			rol: newMemberRol
		}]);
		setNewMemberId("");
		setNewMemberRol("Miembro");
	}
	function removeIntegrante(uid) {
		setIntegrantes((arr) => arr.filter((i) => i.usuarioId !== uid));
	}
	function changeRol(uid, rol) {
		setIntegrantes((arr) => arr.map((i) => i.usuarioId === uid ? {
			...i,
			rol
		} : i));
	}
	function submit(e) {
		e.preventDefault();
		if (!nombre || !coordinadorId || !codigo) {
			setError("Complete el código, el nombre y el coordinador de la brigada.");
			return;
		}
		onSubmit({
			codigo,
			nombre,
			zona,
			coordinadorId,
			vigenciaIni,
			vigenciaFin,
			estado,
			descripcion,
			integrantes
		});
	}
	const excludedForMember = [...integrantes.map((i) => i.usuarioId), ...filtroTipo ? usuariosEquipo.filter((u) => u.tipo !== filtroTipo).map((u) => u.id) : []];
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		ancho: "xl",
		titulo: mode === "create" ? "Registrar brigada" : "Editar brigada",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "submit",
			form: formId,
			children: [
				/* @__PURE__ */ jsx(Save, {}),
				" ",
				mode === "create" ? "Registrar brigada" : "Guardar cambios"
			]
		})] }),
		children: /* @__PURE__ */ jsxs("form", {
			id: formId,
			onSubmit: submit,
			children: [
				error && /* @__PURE__ */ jsx("p", {
					role: "alert",
					className: "mb-3 rounded-md border border-destructive bg-destructive-soft px-3 py-2 text-sm text-destructive",
					children: error
				}),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Código de brigada",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: codigo,
							onChange: (e) => setCodigo(e.target.value),
							className: `${controlClase} font-medium text-primary-dark`,
							required: true
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Nombre de la brigada",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: nombre,
							onChange: (e) => setNombre(e.target.value),
							className: controlClase,
							required: true
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Zona o tramo",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: zona,
							onChange: (e) => setZona(e.target.value),
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Coordinador",
						obligatorio: true,
						ayuda: "Busque un usuario registrado",
						children: (id) => /* @__PURE__ */ jsx(UserAutocomplete, {
							id,
							value: coordinadorId,
							onChange: setCoordinadorId
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Vigencia desde",
						icono: CalendarDays,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							value: vigenciaIni,
							onChange: (e) => setVigenciaIni(e.target.value),
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Vigencia hasta",
						icono: CalendarDays,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							value: vigenciaFin,
							onChange: (e) => setVigenciaFin(e.target.value),
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Estado",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							value: estado,
							onChange: (e) => setEstado(e.target.value),
							className: controlClase,
							children: [
								/* @__PURE__ */ jsx("option", { children: "Activa" }),
								/* @__PURE__ */ jsx("option", { children: "En formación" }),
								/* @__PURE__ */ jsx("option", { children: "Programada" })
							]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Descripción",
						ancho: "doble",
						children: (id) => /* @__PURE__ */ jsx("textarea", {
							id,
							value: descripcion,
							onChange: (e) => setDescripcion(e.target.value),
							rows: 2,
							className: `${controlClase} h-auto py-2`
						})
					})
				] }),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Integrantes de la brigada" }),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2 rounded-md border border-border bg-background p-3",
					children: [/* @__PURE__ */ jsx(FiltroTipo, {
						valor: filtroTipo,
						onCambiar: setFiltroTipo
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 gap-2 md:grid-cols-[1fr_200px_auto]",
						children: [
							/* @__PURE__ */ jsx(UserAutocomplete, {
								value: newMemberId,
								onChange: setNewMemberId,
								exclude: excludedForMember,
								placeholder: "Buscar usuario registrado"
							}),
							/* @__PURE__ */ jsx("select", {
								value: newMemberRol,
								onChange: (e) => setNewMemberRol(e.target.value),
								className: controlClase,
								"aria-label": "Rol del nuevo integrante",
								children: rolesBrigada.map((r) => /* @__PURE__ */ jsx("option", { children: r }, r))
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								onClick: addMember,
								disabled: !newMemberId,
								children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar integrante"]
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-3",
					children: /* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "nombre",
								titulo: "Nombre",
								render: (i) => /* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: getUsuario(i.usuarioId)?.nombre
								})
							},
							{
								clave: "tipo",
								titulo: "Tipo",
								render: (i) => {
									const u = getUsuario(i.usuarioId);
									return u ? /* @__PURE__ */ jsx(StatusBadge, {
										tono: TIPO_TONO[u.tipo],
										children: u.tipo
									}) : null;
								}
							},
							{
								clave: "rol",
								titulo: "Rol",
								render: (i) => /* @__PURE__ */ jsx("select", {
									value: i.rol,
									onChange: (e) => changeRol(i.usuarioId, e.target.value),
									className: `${controlClase} h-8 text-sm`,
									"aria-label": `Rol de ${getUsuario(i.usuarioId)?.nombre}`,
									children: rolesBrigada.map((r) => /* @__PURE__ */ jsx("option", { children: r }, r))
								})
							},
							{
								clave: "especialidad",
								titulo: "Especialidad",
								render: (i) => getUsuario(i.usuarioId)?.especialidad ?? ""
							},
							{
								clave: "acciones",
								titulo: "Acciones",
								alinear: "derecha",
								render: (i) => /* @__PURE__ */ jsx(AccionIcono, {
									nombre: "Quitar integrante",
									icono: Trash2,
									destructiva: true,
									onClick: () => removeIntegrante(i.usuarioId)
								})
							}
						],
						filas: integrantes.filter((i) => getUsuario(i.usuarioId)),
						claveFila: (i) => i.usuarioId,
						vacio: "Sin integrantes agregados."
					})
				})
			]
		})
	});
}
function AddMemberModal({ existing, onClose, onAdd }) {
	const formId = useId();
	const [usuarioId, setUsuarioId] = useState("");
	const [rol, setRol] = useState("Miembro");
	const [filtroTipo, setFiltroTipo] = useState("");
	const excluded = useMemo(() => {
		const ids = [...existing];
		if (filtroTipo) usuariosEquipo.filter((u) => u.tipo !== filtroTipo).forEach((u) => ids.push(u.id));
		return ids;
	}, [existing, filtroTipo]);
	function submit(e) {
		e.preventDefault();
		if (!usuarioId) return;
		onAdd({
			usuarioId,
			rol
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		ancho: "sm",
		titulo: "Agregar integrante",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "submit",
			form: formId,
			disabled: !usuarioId,
			children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar integrante"]
		})] }),
		children: /* @__PURE__ */ jsx("form", {
			id: formId,
			onSubmit: submit,
			children: /* @__PURE__ */ jsxs(FormGrid, {
				columnas: 1,
				children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Tipo de usuario",
						children: /* @__PURE__ */ jsx(FiltroTipo, {
							valor: filtroTipo,
							onCambiar: setFiltroTipo
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Usuario",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx(UserAutocomplete, {
							id,
							value: usuarioId,
							onChange: setUsuarioId,
							exclude: excluded
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Rol en la brigada",
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							value: rol,
							onChange: (e) => setRol(e.target.value),
							className: controlClase,
							children: rolesBrigada.map((r) => /* @__PURE__ */ jsx("option", { children: r }, r))
						})
					})
				]
			})
		})
	});
}
//#endregion
export { EquiposPage as component };
