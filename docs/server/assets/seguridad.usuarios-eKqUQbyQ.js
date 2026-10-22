import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { Kt as textoRuta, Lt as areasACargoDe, Nt as USUARIOS_INICIALES, qt as useAreas } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Eye, KeyRound, Pencil, Plus, Shield, Trash2, Users, X } from "lucide-react";
//#region src/routes/seguridad.usuarios.tsx?tsr-split=component
var rolesCatalog = [
	"Especialista Técnico",
	"Especialista Legal",
	"Responsable Predial",
	"Supervisor",
	"Brigadista",
	"Consultor",
	"Digitador",
	"Revisor Legal",
	"Invitado"
];
var ETIQUETAS = {
	nombre: "Nombre",
	areaId: "Área",
	email: "Correo",
	doc: "Documento",
	cargo: "Cargo",
	roles: "Roles",
	estado: "Estado",
	ultimo: "Último acceso"
};
function UsuariosPage() {
	const navigate = useNavigate();
	const [users, setUsers] = useState(USUARIOS_INICIALES);
	const [showCreate, setShowCreate] = useState(false);
	const [editing, setEditing] = useState(null);
	const [viendo, setViendo] = useState(null);
	const [eliminar, setEliminar] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const areas = useAreas();
	const filas = useMemo(() => users.map((u) => {
		const a = areas.find((x) => x.id === u.areaId);
		return {
			...u,
			rolesTexto: u.roles.join(", "),
			areaTexto: a ? `${a.codigo} · ${a.nombre}` : ""
		};
	}), [users, areas]);
	const sinArea = (u) => u.areaId ? "" : " No tiene área asignada: no podrá numerar los documentos que genere.";
	/** Aviso si el usuario deja de estar activo siendo responsable de áreas. */
	const avisoResponsable = (u) => {
		const aCargo = areasACargoDe(areas, u.id);
		return aCargo.length ? ` Era responsable de ${aCargo.map((a) => a.codigo).join(", ")}: designe otro responsable en Áreas.` : "";
	};
	const rol = useRol();
	const { guardarVersion, restaurar } = useFormularioConHistorial("usuarios", users, setUsers, {
		modulo: 8,
		entidad: "usuarios"
	});
	const deleteUser = (u, motivo) => {
		const siguiente = users.filter((x) => x.id !== u.id);
		setUsers(siguiente);
		guardarVersion("Eliminó usuario", `${u.nombre} (${u.id})`, motivo, siguiente);
	};
	const resetAccess = (u) => {
		guardarVersion("Restableció acceso", `${u.nombre} (${u.id})`);
		setMensaje(`Acceso de ${u.id} restablecido: se enviará un correo con la nueva contraseña.`);
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		mensaje && /* @__PURE__ */ jsxs("p", {
			role: "status",
			className: "mb-4 flex items-center justify-between gap-3 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
			children: [mensaje, /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setMensaje(""),
				"aria-label": "Cerrar aviso",
				className: "rounded-sm hover:bg-success/10",
				children: /* @__PURE__ */ jsx(X, {
					size: 16,
					"aria-hidden": true
				})
			})]
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Administración de usuarios",
			icono: Users,
			descripcion: "Altas, cambios y seguimiento del acceso al sistema.",
			migas: [{ texto: "Seguridad y configuración" }, { texto: "Usuarios" }],
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => setShowCreate(true),
				children: [/* @__PURE__ */ jsx(Plus, {}), " Crear usuario"]
			}),
			demo: true,
			columnas: [
				{
					clave: "id",
					titulo: "Nro",
					ancho: "110px",
					render: (u) => /* @__PURE__ */ jsx("span", {
						className: "font-semibold",
						children: u.id
					})
				},
				{
					clave: "nombre",
					titulo: "Usuario",
					render: (u) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
						className: "font-medium",
						children: u.nombre
					}), /* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: u.email
					})] })
				},
				{
					clave: "doc",
					titulo: "Documento"
				},
				{
					clave: "cargo",
					titulo: "Cargo"
				},
				{
					clave: "areaTexto",
					titulo: "Área",
					render: (u) => u.areaId ? /* @__PURE__ */ jsx("span", {
						title: textoRuta(areas, u.areaId),
						children: u.areaTexto || u.areaId
					}) : /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "Sin área"
					})
				},
				{
					clave: "rolesTexto",
					titulo: "Roles",
					render: (u) => /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap gap-1",
						children: u.roles.map((r) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: r
						}, r))
					})
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (u) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: u.estado === "Activo" ? "success" : "warning",
						children: u.estado
					})
				},
				{
					clave: "ultimo",
					titulo: "Último acceso"
				}
			],
			filas,
			claveFila: (u) => u.id,
			filtros: [{
				clave: "areaId",
				etiqueta: "Área",
				opciones: areas.map((a) => ({
					valor: a.id,
					texto: `${a.codigo} · ${a.nombre}`
				}))
			}, {
				clave: "estado",
				etiqueta: "Estado",
				opciones: [{
					valor: "Activo",
					texto: "Activo"
				}, {
					valor: "Inactivo",
					texto: "Inactivo"
				}]
			}],
			buscarEn: [
				"id",
				"nombre",
				"email",
				"doc",
				"cargo",
				"areaTexto",
				"rolesTexto"
			],
			accionesFila: [
				{
					nombre: "Ver detalle",
					icono: Eye,
					onClick: (u) => setViendo(u)
				},
				{
					nombre: "Editar usuario",
					icono: Pencil,
					onClick: (u) => setEditing(u)
				},
				{
					nombre: "Ver roles",
					icono: Shield,
					onClick: () => navigate({ to: "/seguridad/roles" })
				},
				{
					nombre: "Restablecer acceso",
					icono: KeyRound,
					onClick: (u) => resetAccess(u)
				},
				{
					nombre: "Eliminar usuario",
					icono: Trash2,
					destructiva: true,
					onClick: (u) => setEliminar(u)
				}
			],
			exportar: (visibles) => exportarExcel("usuarios", [
				{
					titulo: "Nro",
					valor: (u) => u.id
				},
				{
					titulo: "Nombre",
					valor: (u) => u.nombre
				},
				{
					titulo: "Correo",
					valor: (u) => u.email
				},
				{
					titulo: "Documento",
					valor: (u) => u.doc
				},
				{
					titulo: "Cargo",
					valor: (u) => u.cargo
				},
				{
					titulo: "Área",
					valor: (u) => u.areaTexto
				},
				{
					titulo: "Roles",
					valor: (u) => u.rolesTexto
				},
				{
					titulo: "Estado",
					valor: (u) => u.estado
				},
				{
					titulo: "Último acceso",
					valor: (u) => u.ultimo
				}
			], visibles),
			vacio: "No hay usuarios registrados.",
			historial: {
				registro: "usuarios",
				etiquetas: ETIQUETAS,
				etiquetaFila: (u) => u.nombre,
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: (registro, n) => restaurar(registro, n)
			}
		}),
		(showCreate || editing) && /* @__PURE__ */ jsx(UserModal, {
			user: editing,
			onClose: () => {
				setShowCreate(false);
				setEditing(null);
			},
			onSave: (u) => {
				if (editing) {
					const siguiente = users.map((x) => x.id === editing.id ? u : x);
					setUsers(siguiente);
					guardarVersion("Modificó usuario", `${u.nombre} (${u.id})`, void 0, siguiente);
					setMensaje(`Usuario ${u.id} guardado.${sinArea(u)}${u.estado === "Inactivo" && editing.estado === "Activo" ? avisoResponsable(u) : ""}`);
				} else {
					const mayor = Math.max(0, ...users.map((x) => Number(x.id.replace(/\D/g, "")) || 0));
					const id = `USR-${String(mayor + 1).padStart(3, "0")}`;
					const siguiente = [...users, {
						...u,
						id
					}];
					setUsers(siguiente);
					guardarVersion("Creó usuario", `${u.nombre} (${id})`, void 0, siguiente);
					setMensaje(`Usuario ${id} creado.${sinArea(u)}`);
				}
				setShowCreate(false);
				setEditing(null);
			}
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: viendo !== null,
			onCerrar: () => setViendo(null),
			titulo: viendo?.nombre ?? "Usuario",
			ancho: "sm",
			children: viendo && /* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm",
				children: [
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Nro"
					}),
					/* @__PURE__ */ jsx("dd", {
						className: "font-semibold",
						children: viendo.id
					}),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Correo"
					}),
					/* @__PURE__ */ jsx("dd", { children: viendo.email }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Documento"
					}),
					/* @__PURE__ */ jsx("dd", { children: viendo.doc }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Cargo"
					}),
					/* @__PURE__ */ jsx("dd", { children: viendo.cargo }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Área"
					}),
					/* @__PURE__ */ jsx("dd", { children: viendo.areaId ? textoRuta(areas, viendo.areaId) : "Sin área" }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Roles"
					}),
					/* @__PURE__ */ jsx("dd", {
						className: "flex flex-wrap gap-1",
						children: viendo.roles.map((r) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: r
						}, r))
					}),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Estado"
					}),
					/* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: viendo.estado === "Activo" ? "success" : "warning",
						children: viendo.estado
					}) }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Último acceso"
					}),
					/* @__PURE__ */ jsx("dd", { children: viendo.ultimo })
				]
			})
		}),
		eliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
			nombre: `${eliminar.nombre} (${eliminar.id})`,
			onCerrar: () => setEliminar(null),
			onConfirmar: (motivo) => {
				deleteUser(eliminar, motivo);
				setMensaje(`Usuario ${eliminar.id} eliminado.${avisoResponsable(eliminar)}`);
				setEliminar(null);
			}
		})
	] });
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: "Eliminar usuario",
		descripcion: `${nombre} perderá el acceso al sistema. El histórico conserva sus datos y el motivo.`,
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
			children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar usuario"]
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
				placeholder: "Por ejemplo: dejó de laborar en el proyecto"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function UserModal({ user, onClose, onSave }) {
	const [form, setForm] = useState(user ?? {
		id: "",
		nombre: "",
		email: "",
		doc: "",
		cargo: "",
		roles: [],
		estado: "Activo",
		ultimo: "Sin accesos"
	});
	const [intentado, setIntentado] = useState(false);
	const areas = useAreas();
	const toggleRole = (r) => setForm((f) => ({
		...f,
		roles: f.roles.includes(r) ? f.roles.filter((x) => x !== r) : [...f.roles, r]
	}));
	const guardar = () => {
		setIntentado(true);
		if (!form.nombre || !form.email) return;
		onSave(form);
	};
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: user ? "Editar usuario" : "Crear usuario",
		ancho: "xl",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			onClick: guardar,
			children: user ? "Guardar usuario" : "Crear usuario"
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre completo",
				obligatorio: true,
				error: intentado && !form.nombre ? "Ingrese el nombre" : void 0,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					value: form.nombre,
					onChange: (e) => setForm({
						...form,
						nombre: e.target.value
					}),
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Correo",
				obligatorio: true,
				error: intentado && !form.email ? "Ingrese el correo" : void 0,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "email",
					value: form.email,
					onChange: (e) => setForm({
						...form,
						email: e.target.value
					}),
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Documento",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					value: form.doc,
					onChange: (e) => setForm({
						...form,
						doc: e.target.value
					}),
					placeholder: "DNI 12345678",
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Cargo",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					value: form.cargo,
					onChange: (e) => setForm({
						...form,
						cargo: e.target.value
					}),
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área",
				ayuda: "Un usuario pertenece a una sola área. Sin área no puede numerar los documentos que genera.",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					value: form.areaId ?? "",
					onChange: (e) => setForm({
						...form,
						areaId: e.target.value || void 0
					}),
					className: controlClase,
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Sin área"
					}), areas.filter((a) => a.estado === "ACTIVA" || a.id === form.areaId).map((a) => /* @__PURE__ */ jsxs("option", {
						value: a.id,
						children: [
							textoRuta(areas, a.id),
							" · ",
							a.nombre
						]
					}, a.id))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					value: form.estado,
					onChange: (e) => setForm({
						...form,
						estado: e.target.value
					}),
					className: controlClase,
					children: [/* @__PURE__ */ jsx("option", { children: "Activo" }), /* @__PURE__ */ jsx("option", { children: "Inactivo" })]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Roles",
				ancho: "doble",
				ayuda: "Seleccione uno o más roles.",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					role: "group",
					"aria-label": "Roles",
					children: rolesCatalog.map((r) => {
						const activo = form.roles.includes(r);
						return /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-pressed": activo,
							onClick: () => toggleRole(r),
							className: `h-8 rounded-md border px-3 text-xs font-semibold ${activo ? "border-primary bg-primary-soft text-primary-dark" : "border-border bg-card text-foreground hover:bg-muted"}`,
							children: r
						}, r);
					})
				})
			})
		] })
	});
}
//#endregion
export { UsuariosPage as component };
