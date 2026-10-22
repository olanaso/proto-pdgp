import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { i as readProjectBrigades, n as getUsuarioEquipo, r as initialProjectBrigades, s as usuariosEquipo } from "./projectTeamsData-D-Nygxw-.js";
import { n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.asignacion-predial-DOSsQxJO.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CalendarDays, CheckCircle2, Clock3, History, Save, Search, Trash2, UserCheck, UserPlus, Users, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.asignacion-predial.tsx?tsr-split=component
var additionalRoles = [
	"Responsable de apoyo",
	"Especialista técnico",
	"Especialista legal",
	"Responsable documental",
	"Supervisor",
	"Otro"
];
var initialForm = {
	brigadaId: "",
	responsablePrincipalId: "",
	fechaAsignacion: "",
	fechaFin: "",
	prioridad: "ORDINARIA",
	estado: "ASIGNADO",
	motivo: "",
	observaciones: ""
};
var ETIQUETAS_ASIGNACION = {
	brigada: "Brigada",
	responsablePrincipal: "Responsable principal",
	responsablesAdicionales: "Responsable adicional",
	fechaAsignacion: "Fecha de asignación",
	fechaFin: "Fecha prevista de término",
	prioridad: "Prioridad",
	estado: "Estado de asignación",
	motivo: "Motivo de asignación",
	observaciones: "Observaciones",
	role: "Función en este predio",
	brigadaId: "Brigada (id)",
	responsablePrincipalId: "Responsable principal (id)",
	usuarioId: "Usuario (id)"
};
var TONO_BRIGADA = {
	Activa: "success",
	Programada: "warning"
};
/** Lista flotante del autocompletado: la sombra marca la elevación del menú. */
var listaClase = "absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-card";
function BrigadaAutocomplete({ id, brigadas, value, onChange }) {
	const selected = brigadas.find((brigada) => brigada.id === value);
	const [query, setQuery] = useState(selected ? `${selected.codigo} · ${selected.nombre}` : "");
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const selectedBrigada = brigadas.find((brigada) => brigada.id === value);
		setQuery(selectedBrigada ? `${selectedBrigada.codigo} · ${selectedBrigada.nombre}` : "");
	}, [brigadas, value]);
	const filtered = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase("es");
		return brigadas.filter((brigada) => {
			if (!normalizedQuery) return true;
			return [
				brigada.codigo,
				brigada.nombre,
				brigada.zona,
				brigada.estado
			].join(" ").toLocaleLowerCase("es").includes(normalizedQuery);
		}).slice(0, 8);
	}, [brigadas, query]);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ jsx(Search, {
				size: 16,
				className: "pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("input", {
				id,
				className: `${controlClase} pl-9`,
				value: query,
				placeholder: "Buscar por código, nombre, zona o estado",
				onFocus: () => setOpen(true),
				onBlur: () => window.setTimeout(() => setOpen(false), 150),
				onChange: (event) => {
					setQuery(event.target.value);
					setOpen(true);
					if (value) onChange("");
				}
			}),
			open && /* @__PURE__ */ jsx("div", {
				className: listaClase,
				children: filtered.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "px-3 py-4 text-center text-xs text-muted-foreground",
					children: "No se encontraron brigadas."
				}) : filtered.map((brigada) => {
					const coordinator = getUsuarioEquipo(brigada.coordinadorId);
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onMouseDown: (event) => event.preventDefault(),
						onClick: () => {
							onChange(brigada.id);
							setQuery(`${brigada.codigo} · ${brigada.nombre}`);
							setOpen(false);
						},
						className: "flex w-full items-start justify-between gap-3 border-b border-border px-3 py-2 text-left last:border-b-0 hover:bg-primary-soft",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "block text-sm font-semibold text-foreground",
								children: [
									brigada.codigo,
									" · ",
									brigada.nombre
								]
							}), /* @__PURE__ */ jsxs("span", {
								className: "mt-0.5 block text-xs text-muted-foreground",
								children: [
									brigada.zona,
									" · Coordinador: ",
									coordinator?.nombre ?? "Sin asignar"
								]
							})]
						}), /* @__PURE__ */ jsx(StatusBadge, {
							tono: TONO_BRIGADA[brigada.estado] ?? "destructive",
							children: brigada.estado
						})]
					}, brigada.id);
				})
			})
		]
	});
}
function UserAutocomplete({ users, value, onChange, disabled = false }) {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setQuery(users.find((user) => user.id === value)?.nombre ?? "");
	}, [users, value]);
	const filtered = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase("es");
		return users.filter((user) => [
			user.nombre,
			user.especialidad,
			user.tipo
		].join(" ").toLocaleLowerCase("es").includes(normalizedQuery)).slice(0, 8);
	}, [query, users]);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ jsx(Search, {
				size: 16,
				className: "pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("input", {
				className: `${controlClase} pl-9`,
				disabled,
				value: query,
				"aria-label": "Responsable adicional",
				placeholder: disabled ? "Seleccione primero una brigada" : "Buscar responsable por nombre",
				onFocus: () => setOpen(true),
				onBlur: () => window.setTimeout(() => setOpen(false), 150),
				onChange: (event) => {
					setQuery(event.target.value);
					setOpen(true);
					if (value) onChange("");
				}
			}),
			open && !disabled && /* @__PURE__ */ jsx("div", {
				className: listaClase,
				children: filtered.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "px-3 py-4 text-center text-xs text-muted-foreground",
					children: "No se encontraron responsables disponibles."
				}) : filtered.map((user) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					onMouseDown: (event) => event.preventDefault(),
					onClick: () => {
						onChange(user.id);
						setQuery(user.nombre);
						setOpen(false);
					},
					className: "flex w-full items-center justify-between gap-3 border-b border-border px-3 py-2 text-left last:border-b-0 hover:bg-primary-soft",
					children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
						className: "block text-sm font-semibold text-foreground",
						children: user.nombre
					}), /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: user.especialidad
					})] }), /* @__PURE__ */ jsx(StatusBadge, { children: user.tipo })]
				}, user.id))
			})
		]
	});
}
function historyStorageKey(projectId, codigo) {
	return `mtc-predio-assignment-history:${projectId}:${codigo}`;
}
function readAssignmentHistory(projectId, codigo) {
	if (typeof window === "undefined") return [];
	try {
		const stored = window.localStorage.getItem(historyStorageKey(projectId, codigo));
		if (!stored) return [];
		const parsed = JSON.parse(stored);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function writeAssignmentHistory(projectId, codigo, historyItems) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(historyStorageKey(projectId, codigo), JSON.stringify(historyItems));
}
/** "aaaa-mm-dd" del input de fecha a "dd/mm/aaaa", sin pasar por Date (evita el corrimiento de zona horaria). */
function formatDate(date) {
	if (!date) return "Sin fecha";
	const [year, month, day] = date.split("-");
	return `${day}/${month}/${year}`;
}
/** Una ficha por predio: al cambiar de predio se vuelve a montar y carga su última versión guardada. */
function AsignacionPredialPage() {
	const { codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(AsignacionPredialFicha, {}, codigo);
}
function AsignacionPredialFicha() {
	const { projectId, codigo } = Route$1.useParams();
	const navigate = useNavigate();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const [brigadas, setBrigadas] = useState(initialProjectBrigades);
	const [form, setForm] = useState(initialForm);
	const [additionalResponsibles, setAdditionalResponsibles] = useState([]);
	const [newResponsibleId, setNewResponsibleId] = useState("");
	const [newResponsibleRole, setNewResponsibleRole] = useState("Responsable de apoyo");
	const [historyItems, setHistoryItems] = useState([]);
	const [feedback, setFeedback] = useState(null);
	useEffect(() => {
		setBrigadas(readProjectBrigades(projectId));
		setHistoryItems(readAssignmentHistory(projectId, decodedCodigo));
		setFeedback(null);
	}, [decodedCodigo, projectId]);
	const selectedBrigada = brigadas.find((brigada) => brigada.id === form.brigadaId);
	const brigadeMembers = useMemo(() => selectedBrigada?.integrantes.map((integrante) => ({
		...integrante,
		user: getUsuarioEquipo(integrante.usuarioId)
	})).filter((integrante) => integrante.user) ?? [], [selectedBrigada]);
	const rol = useRol();
	const claveHistorial = `asignacion-predial-${decodedCodigo}`;
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, {
		...form,
		brigada: selectedBrigada ? `${selectedBrigada.codigo} · ${selectedBrigada.nombre}` : "",
		responsablePrincipal: getUsuarioEquipo(form.responsablePrincipalId)?.nombre ?? "",
		responsablesAdicionales: additionalResponsibles.map((r) => ({
			...r,
			nombre: getUsuarioEquipo(r.usuarioId)?.nombre ?? "Usuario"
		}))
	}, (v) => {
		const { brigada: _b, responsablePrincipal: _p, responsablesAdicionales, ...resto } = v;
		setForm(resto);
		setAdditionalResponsibles(responsablesAdicionales.map(({ id, usuarioId, role }) => ({
			id,
			usuarioId,
			role
		})));
		setFeedback(null);
	}, {
		modulo: 11,
		entidad: "asignacion_predial"
	});
	const availableExternalUsers = useMemo(() => {
		const brigadeUserIds = new Set(selectedBrigada?.integrantes.map((integrante) => integrante.usuarioId) ?? []);
		const alreadyAddedIds = new Set(additionalResponsibles.map((responsible) => responsible.usuarioId));
		return usuariosEquipo.filter((user) => !brigadeUserIds.has(user.id) && !alreadyAddedIds.has(user.id));
	}, [additionalResponsibles, selectedBrigada]);
	function setField(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
		setFeedback(null);
	}
	function selectBrigada(brigadaId) {
		const brigada = brigadas.find((item) => item.id === brigadaId);
		setForm((current) => ({
			...current,
			brigadaId,
			responsablePrincipalId: brigada?.coordinadorId ?? ""
		}));
		setAdditionalResponsibles([]);
		setNewResponsibleId("");
		setFeedback(null);
	}
	function addAdditionalResponsible() {
		if (!newResponsibleId) return;
		setAdditionalResponsibles((current) => [...current, {
			id: `additional-${Date.now()}`,
			usuarioId: newResponsibleId,
			role: newResponsibleRole
		}]);
		setNewResponsibleId("");
		setNewResponsibleRole("Responsable de apoyo");
		setFeedback(null);
	}
	function handleSubmit() {
		if (!selectedBrigada) {
			setFeedback({
				kind: "error",
				text: "Seleccione una brigada registrada."
			});
			return;
		}
		const principal = getUsuarioEquipo(form.responsablePrincipalId);
		if (!principal) {
			setFeedback({
				kind: "error",
				text: "Seleccione al responsable principal dentro de la brigada."
			});
			return;
		}
		const updatedHistory = [{
			id: `history-${Date.now()}`,
			registeredAt: fechaHora(/* @__PURE__ */ new Date()),
			action: historyItems.length ? "REASIGNACIÓN" : "ASIGNACIÓN",
			brigadaCode: selectedBrigada.codigo,
			brigadaName: selectedBrigada.nombre,
			principalName: principal.nombre,
			additionalNames: additionalResponsibles.map((responsible) => {
				return `${getUsuarioEquipo(responsible.usuarioId)?.nombre ?? "Usuario"} (${responsible.role})`;
			}),
			startDate: form.fechaAsignacion,
			endDate: form.fechaFin,
			priority: form.prioridad,
			status: form.estado,
			observation: form.observaciones || form.motivo
		}, ...historyItems];
		setHistoryItems(updatedHistory);
		writeAssignmentHistory(projectId, decodedCodigo, updatedHistory);
		guardarVersion(historyItems.length ? "Reasignó el predio" : "Asignó el predio", `brigada ${selectedBrigada.codigo}, responsable ${principal.nombre}`);
		setFeedback({
			kind: "success",
			text: "Asignación guardada y añadida al historial del predio."
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
				titulo: "Asignación predial",
				icono: UserCheck,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: historyItems.length ? "success" : "neutral",
					children: historyItems.length ? `${historyItems.length} asignación(es)` : "Sin asignación"
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "asignacion-predial",
				projectId,
				codigo: decodedCodigo
			}),
			feedback && /* @__PURE__ */ jsxs("p", {
				role: feedback.kind === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${feedback.kind === "success" ? "border-success bg-success-soft text-success" : "border-destructive bg-destructive-soft text-destructive"}`,
				children: [
					feedback.kind === "success" ? /* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}) : /* @__PURE__ */ jsx(AlertCircle, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: feedback.text
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setFeedback(null),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
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
							onSubmit: (event) => {
								event.preventDefault();
								handleSubmit();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									brigada: selectedBrigada?.nombre
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Identificación de la asignación",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de asignación",
											obligatorio: true,
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												required: true,
												className: controlClase,
												value: form.fechaAsignacion,
												onChange: (event) => setField("fechaAsignacion", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha prevista de término",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaFin,
												onChange: (event) => setField("fechaFin", event.target.value)
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Prioridad",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.prioridad,
												onChange: (event) => setField("prioridad", event.target.value),
												children: [
													/* @__PURE__ */ jsx("option", { children: "ORDINARIA" }),
													/* @__PURE__ */ jsx("option", { children: "ALTA" }),
													/* @__PURE__ */ jsx("option", { children: "URGENTE" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Estado de asignación",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.estado,
												onChange: (event) => setField("estado", event.target.value),
												children: [
													/* @__PURE__ */ jsx("option", { children: "ASIGNADO" }),
													/* @__PURE__ */ jsx("option", { children: "PENDIENTE" }),
													/* @__PURE__ */ jsx("option", { children: "REASIGNADO" }),
													/* @__PURE__ */ jsx("option", { children: "CERRADO" })
												]
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Brigada asignada",
									className: "mt-4",
									acciones: /* @__PURE__ */ jsxs(Link, {
										to: "/proyectos/$projectId/equipos",
										params: { projectId },
										className: "inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline",
										children: [/* @__PURE__ */ jsx(Users, {
											size: 14,
											"aria-hidden": true
										}), " Administrar brigadas en Equipos"]
									}),
									children: [/* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Buscar brigada",
										obligatorio: true,
										ancho: "doble",
										ayuda: "El responsable principal se completa con el coordinador de la brigada; puede cambiarlo en la lista.",
										children: (id) => /* @__PURE__ */ jsx(BrigadaAutocomplete, {
											id,
											brigadas,
											value: form.brigadaId,
											onChange: selectBrigada
										})
									}) }), !selectedBrigada ? /* @__PURE__ */ jsxs("p", {
										className: "mt-4 rounded-md border border-dashed border-border bg-background px-4 py-6 text-center text-sm text-muted-foreground",
										children: [/* @__PURE__ */ jsx(Users, {
											size: 24,
											className: "mx-auto mb-2",
											"aria-hidden": true
										}), "Seleccione una brigada para cargar sus integrantes."]
									}) : /* @__PURE__ */ jsxs("div", {
										className: "mt-4 space-y-2",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap items-center justify-between gap-2",
											children: [/* @__PURE__ */ jsxs("p", {
												className: "text-sm",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "font-semibold",
													children: [
														selectedBrigada.codigo,
														" · ",
														selectedBrigada.nombre
													]
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-muted-foreground",
													children: [" · ", selectedBrigada.zona]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-wrap gap-2",
												children: [/* @__PURE__ */ jsx(StatusBadge, {
													tono: TONO_BRIGADA[selectedBrigada.estado] ?? "destructive",
													children: selectedBrigada.estado
												}), /* @__PURE__ */ jsxs(StatusBadge, { children: [
													"Vigencia: ",
													formatDate(selectedBrigada.vigenciaIni),
													" a",
													" ",
													formatDate(selectedBrigada.vigenciaFin)
												] })]
											})]
										}), /* @__PURE__ */ jsx(Tabla, {
											columnas: [
												{
													clave: "principal",
													titulo: "Principal",
													ancho: "90px",
													render: (m) => /* @__PURE__ */ jsx("input", {
														type: "radio",
														name: "responsable-principal",
														"aria-label": `Seleccionar a ${m.user?.nombre} como responsable principal`,
														checked: form.responsablePrincipalId === m.usuarioId,
														onChange: () => setField("responsablePrincipalId", m.usuarioId),
														className: "size-4 accent-primary"
													})
												},
												{
													clave: "integrante",
													titulo: "Integrante",
													render: (m) => /* @__PURE__ */ jsx("span", {
														className: "font-medium",
														children: m.user?.nombre
													})
												},
												{
													clave: "tipo",
													titulo: "Tipo",
													render: (m) => m.user?.tipo
												},
												{
													clave: "rol",
													titulo: "Rol en la brigada",
													render: (m) => /* @__PURE__ */ jsx(StatusBadge, {
														tono: "primary",
														children: m.rol
													})
												},
												{
													clave: "especialidad",
													titulo: "Especialidad",
													render: (m) => m.user?.especialidad
												}
											],
											filas: brigadeMembers,
											claveFila: (m) => m.usuarioId,
											vacio: "La brigada no tiene integrantes registrados."
										})]
									})]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Responsables adicionales fuera de la brigada",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-3 text-xs text-muted-foreground",
											children: "Agregue usuarios que apoyarán este predio sin modificar la composición de la brigada en Equipos."
										}),
										/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Responsable externo",
											children: /* @__PURE__ */ jsx(UserAutocomplete, {
												users: availableExternalUsers,
												value: newResponsibleId,
												onChange: setNewResponsibleId,
												disabled: !selectedBrigada
											})
										}), /* @__PURE__ */ jsx(FormField, {
											etiqueta: "Función en este predio",
											children: (id) => /* @__PURE__ */ jsx("select", {
												id,
												className: controlClase,
												disabled: !selectedBrigada,
												value: newResponsibleRole,
												onChange: (event) => setNewResponsibleRole(event.target.value),
												children: additionalRoles.map((role) => /* @__PURE__ */ jsx("option", { children: role }, role))
											})
										})] }),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3 flex justify-end",
											children: /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												disabled: !newResponsibleId,
												onClick: addAdditionalResponsible,
												children: [/* @__PURE__ */ jsx(UserPlus, {}), " Agregar responsable"]
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3",
											children: /* @__PURE__ */ jsx(Tabla, {
												columnas: [
													{
														clave: "n",
														titulo: "N.°",
														ancho: "56px",
														render: (r) => additionalResponsibles.indexOf(r) + 1
													},
													{
														clave: "usuario",
														titulo: "Responsable externo",
														render: (r) => {
															const user = getUsuarioEquipo(r.usuarioId);
															return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
																className: "block font-medium",
																children: user?.nombre
															}), /* @__PURE__ */ jsx("span", {
																className: "text-xs text-muted-foreground",
																children: user?.especialidad
															})] });
														}
													},
													{
														clave: "tipo",
														titulo: "Tipo",
														render: (r) => getUsuarioEquipo(r.usuarioId)?.tipo
													},
													{
														clave: "role",
														titulo: "Función en este predio"
													},
													{
														clave: "acciones",
														titulo: "Acciones",
														alinear: "derecha",
														ancho: "80px",
														render: (r) => /* @__PURE__ */ jsx(Button, {
															type: "button",
															variant: "ghost",
															size: "icon",
															className: "size-8 text-destructive",
															title: "Quitar responsable adicional",
															"aria-label": "Quitar responsable adicional",
															onClick: () => setAdditionalResponsibles((current) => current.filter((item) => item.id !== r.id)),
															children: /* @__PURE__ */ jsx(Trash2, {})
														})
													}
												],
												filas: additionalResponsibles,
												claveFila: (r) => r.id,
												vacio: "No se agregaron responsables fuera de la brigada."
											})
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Motivo y observaciones",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Motivo de asignación",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: controlClase,
											placeholder: "Asignación inicial, redistribución de carga, apoyo especializado u otro",
											value: form.motivo,
											onChange: (event) => setField("motivo", event.target.value)
										})
									}), /* @__PURE__ */ jsx(FormField, {
										etiqueta: "Observaciones",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("textarea", {
											id,
											rows: 3,
											className: `${controlClase} h-auto py-2`,
											value: form.observaciones,
											onChange: (event) => setField("observaciones", event.target.value)
										})
									})] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Historial de asignaciones del predio",
									className: "mt-4",
									children: /* @__PURE__ */ jsx(Tabla, {
										columnas: [
											{
												clave: "registeredAt",
												titulo: "Fecha de registro",
												ancho: "150px",
												render: (h) => /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1 whitespace-nowrap tabular-nums",
													children: [
														/* @__PURE__ */ jsx(Clock3, {
															size: 14,
															"aria-hidden": true
														}),
														" ",
														h.registeredAt
													]
												})
											},
											{
												clave: "action",
												titulo: "Acción",
												render: (h) => /* @__PURE__ */ jsx(StatusBadge, {
													tono: "primary",
													children: h.action
												})
											},
											{
												clave: "brigada",
												titulo: "Brigada",
												render: (h) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
													className: "block font-medium",
													children: h.brigadaCode
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs text-muted-foreground",
													children: h.brigadaName
												})] })
											},
											{
												clave: "principalName",
												titulo: "Responsable principal"
											},
											{
												clave: "adicionales",
												titulo: "Responsables adicionales",
												render: (h) => h.additionalNames.length ? h.additionalNames.join(", ") : "Ninguno"
											},
											{
												clave: "vigencia",
												titulo: "Vigencia",
												render: (h) => /* @__PURE__ */ jsxs("span", {
													className: "whitespace-nowrap tabular-nums",
													children: [
														formatDate(h.startDate),
														" a ",
														formatDate(h.endDate)
													]
												})
											},
											{
												clave: "status",
												titulo: "Estado",
												render: (h) => /* @__PURE__ */ jsx(StatusBadge, {
													tono: "success",
													children: h.status
												})
											}
										],
										filas: historyItems,
										claveFila: (h) => h.id,
										vacio: "Este predio todavía no tiene asignaciones registradas."
									})
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: () => navigate({
										to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
										params: {
											projectId,
											codigo: decodedCodigo
										}
									}),
									children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
								}), /* @__PURE__ */ jsxs(Button, {
									type: "submit",
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar asignación"]
								})] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico de la asignación predial",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS_ASIGNACION,
								nombreArchivo: `historico-asignacion-predial-${decodedCodigo}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setFeedback({
										kind: "success",
										text: `Se restauró la versión ${n}.`
									});
								}
							})
						})
					})
				]
			})
		]
	});
}
//#endregion
export { AsignacionPredialPage as component };
