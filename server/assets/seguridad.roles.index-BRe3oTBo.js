import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { c as rolDesdeCodigo, u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Copy, KeyRound, Pencil, Plus, Shield, Trash2, X } from "lucide-react";
//#region src/routes/seguridad.roles.index.tsx?tsr-split=component
var initialRoles = [
	{
		code: "ROL-ADM-SIS",
		name: "Administrador del sistema",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 48,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	},
	{
		code: "ROL-ESP-TEC",
		name: "Especialista técnico",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 12,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	},
	{
		code: "ROL-ESP-LEG",
		name: "Especialista legal",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 9,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	},
	{
		code: "ROL-RESP-PRE",
		name: "Responsable predial",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 16,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	},
	{
		code: "ROL-SUP",
		name: "Supervisor",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 7,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	},
	{
		code: "ROL-CON-EXT",
		name: "Consultor externo",
		subtitle: "Perfil de acceso del módulo",
		estado: "Inactivo",
		usuarios: 3,
		creadoPor: "Supervisor",
		ultimaActualizacion: "03/06/2026"
	},
	{
		code: "ROL-BRI",
		name: "Brigadista",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 11,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	},
	{
		code: "ROL-DIG",
		name: "Digitador",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 5,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	},
	{
		code: "ROL-REV-LEG",
		name: "Revisor legal",
		subtitle: "Perfil de acceso del módulo",
		estado: "Inactivo",
		usuarios: 4,
		creadoPor: "Supervisor",
		ultimaActualizacion: "03/06/2026"
	},
	{
		code: "ROL-INV",
		name: "Invitado",
		subtitle: "Perfil de acceso del módulo",
		estado: "Inactivo",
		usuarios: 1,
		creadoPor: "Supervisor",
		ultimaActualizacion: "03/06/2026"
	},
	{
		code: "ROL-ANAL",
		name: "Analista de datos",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 6,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	},
	{
		code: "ROL-COOR",
		name: "Coordinador de campo",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 8,
		creadoPor: "Administrador",
		ultimaActualizacion: "15/06/2026"
	}
];
var ETIQUETAS = {
	code: "Código",
	name: "Rol",
	subtitle: "Descripción",
	estado: "Estado",
	usuarios: "Usuarios asignados",
	creadoPor: "Creado por",
	ultimaActualizacion: "Última actualización"
};
var creadores = ["Administrador", "Supervisor"];
var estados = ["Activo", "Inactivo"];
var opciones = (valores) => valores.map((v) => ({
	valor: v,
	texto: v
}));
function RolesListPage() {
	const navigate = useNavigate();
	const [roles, setRoles] = useState(initialRoles);
	const rolSesion = useRol();
	const { guardarVersion, restaurar } = useFormularioConHistorial("roles", roles, setRoles, {
		modulo: 8,
		entidad: "roles"
	});
	const [modal, setModal] = useState(null);
	const [eliminar, setEliminar] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const nuevo = () => ({
		code: "",
		name: "",
		subtitle: "Perfil de acceso del módulo",
		estado: "Activo",
		usuarios: 0,
		creadoPor: "Administrador",
		ultimaActualizacion: fecha(/* @__PURE__ */ new Date())
	});
	const clonar = (r) => {
		const copia = {
			...r,
			code: `${r.code}-COPIA`,
			name: `${r.name} (copia)`,
			usuarios: 0,
			ultimaActualizacion: fecha(/* @__PURE__ */ new Date())
		};
		const siguiente = [...roles, copia];
		setRoles(siguiente);
		guardarVersion("Clonó rol", `${r.name} como ${copia.code}`, void 0, siguiente);
		setMensaje(`Rol ${r.code} clonado como ${copia.code}.`);
	};
	const guardar = (r, modo, original) => {
		const guardado = {
			...r,
			ultimaActualizacion: fecha(/* @__PURE__ */ new Date())
		};
		const siguiente = modo === "crear" ? [...roles, guardado] : roles.map((x) => x.code === original ? guardado : x);
		setRoles(siguiente);
		guardarVersion(modo === "crear" ? "Creó rol" : "Modificó rol", `${r.name} (${r.code})`, void 0, siguiente);
		setMensaje(modo === "crear" ? `Rol ${r.code} creado.` : `Rol ${r.code} guardado.`);
		setModal(null);
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
			titulo: "Administración de roles",
			icono: Shield,
			descripcion: "Roles del módulo de seguridad y asignación de permisos.",
			migas: [{ texto: "Seguridad y configuración" }, { texto: "Roles" }],
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => setModal({
					modo: "crear",
					rol: nuevo()
				}),
				children: [/* @__PURE__ */ jsx(Plus, {}), " Crear rol"]
			}),
			demo: true,
			columnas: [
				{
					clave: "code",
					titulo: "Código",
					ancho: "150px",
					render: (r) => /* @__PURE__ */ jsx("span", {
						className: "font-semibold",
						children: r.code
					})
				},
				{
					clave: "name",
					titulo: "Rol",
					render: (r) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
						className: "font-medium",
						children: r.name
					}), /* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: r.subtitle
					})] })
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: r.estado === "Activo" ? "success" : "warning",
						children: r.estado
					})
				},
				{
					clave: "usuarios",
					titulo: "Usuarios asignados",
					alinear: "derecha"
				},
				{
					clave: "creadoPor",
					titulo: "Creado por"
				},
				{
					clave: "ultimaActualizacion",
					titulo: "Última actualización"
				}
			],
			filas: roles,
			claveFila: (r) => r.code,
			filtros: [{
				clave: "estado",
				etiqueta: "Estado",
				opciones: opciones(estados)
			}, {
				clave: "creadoPor",
				etiqueta: "Creado por",
				opciones: opciones(creadores)
			}],
			buscarEn: ["code", "name"],
			accionesFila: [
				{
					nombre: "Editar rol",
					icono: Pencil,
					onClick: (r) => setModal({
						modo: "editar",
						rol: { ...r }
					})
				},
				{
					nombre: "Clonar rol",
					icono: Copy,
					onClick: clonar
				},
				{
					nombre: "Asignar permisos",
					icono: KeyRound,
					onClick: (r) => navigate({
						to: "/seguridad/roles/$roleId/permisos",
						params: { roleId: rolDesdeCodigo(r.code) ?? r.code }
					})
				},
				{
					nombre: "Eliminar rol",
					icono: Trash2,
					destructiva: true,
					onClick: (r) => setEliminar(r)
				}
			],
			onFilaClick: (r) => navigate({
				to: "/seguridad/roles/$roleId/permisos",
				params: { roleId: rolDesdeCodigo(r.code) ?? r.code }
			}),
			exportar: (visibles) => exportarExcel("roles", [
				{
					titulo: "Código",
					valor: (r) => r.code
				},
				{
					titulo: "Rol",
					valor: (r) => r.name
				},
				{
					titulo: "Estado",
					valor: (r) => r.estado
				},
				{
					titulo: "Usuarios asignados",
					valor: (r) => r.usuarios
				},
				{
					titulo: "Creado por",
					valor: (r) => r.creadoPor
				},
				{
					titulo: "Última actualización",
					valor: (r) => r.ultimaActualizacion
				}
			], visibles),
			vacio: "No hay roles registrados.",
			historial: {
				registro: "roles",
				etiquetas: ETIQUETAS,
				etiquetaFila: (r) => r.name,
				puedeRestaurar: rolSesion === "ADMIN" || rolSesion === "COORDINADOR",
				onRestaurar: (registro, n) => restaurar(registro, n)
			}
		}),
		modal && /* @__PURE__ */ jsx(RolModal, {
			modo: modal.modo,
			rol: modal.rol,
			existentes: roles.map((r) => r.code),
			onCerrar: () => setModal(null),
			onGuardar: (r) => guardar(r, modal.modo, modal.rol.code)
		}),
		eliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
			nombre: `${eliminar.name} (${eliminar.code})`,
			usuarios: eliminar.usuarios,
			onCerrar: () => setEliminar(null),
			onConfirmar: (motivo) => {
				const siguiente = roles.filter((x) => x.code !== eliminar.code);
				setRoles(siguiente);
				guardarVersion("Eliminó rol", `${eliminar.name} (${eliminar.code})`, motivo, siguiente);
				setMensaje(`Rol ${eliminar.code} eliminado.`);
				setEliminar(null);
			}
		})
	] });
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, usuarios, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: "Eliminar rol",
		descripcion: `${nombre} dejará de estar disponible para ${usuarios} usuarios. El histórico conserva sus datos y el motivo.`,
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
			children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar rol"]
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
				placeholder: "Por ejemplo: el perfil ya no se usa en el proyecto"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function RolModal({ modo, rol, existentes, onCerrar, onGuardar }) {
	const [form, setForm] = useState(rol);
	const [intentado, setIntentado] = useState(false);
	const codigo = form.code.trim().toUpperCase();
	const duplicado = modo === "crear" && existentes.includes(codigo);
	const errorCodigo = !intentado ? void 0 : !codigo ? "Ingrese el código" : duplicado ? "Ya existe un rol con este código" : void 0;
	const errorNombre = intentado && !form.name.trim() ? "Ingrese el nombre del rol" : void 0;
	const guardar = () => {
		setIntentado(true);
		if (!codigo || duplicado || !form.name.trim()) return;
		onGuardar({
			...form,
			code: codigo,
			name: form.name.trim()
		});
	};
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		titulo: modo === "crear" ? "Crear rol" : `Editar rol ${rol.code}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			onClick: guardar,
			children: modo === "crear" ? "Crear rol" : "Guardar rol"
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código",
				obligatorio: true,
				ayuda: "Ejemplo: ROL-ESP-TEC",
				error: errorCodigo,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					value: form.code,
					onChange: (e) => setForm({
						...form,
						code: e.target.value
					}),
					disabled: modo === "editar",
					className: `${controlClase} font-mono`
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre del rol",
				obligatorio: true,
				error: errorNombre,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					value: form.name,
					onChange: (e) => setForm({
						...form,
						name: e.target.value
					}),
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					value: form.estado,
					onChange: (e) => setForm({
						...form,
						estado: e.target.value
					}),
					className: controlClase,
					children: estados.map((e) => /* @__PURE__ */ jsx("option", { children: e }, e))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Creado por",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					value: form.creadoPor,
					onChange: (e) => setForm({
						...form,
						creadoPor: e.target.value
					}),
					className: controlClase,
					children: creadores.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					value: form.subtitle,
					onChange: (e) => setForm({
						...form,
						subtitle: e.target.value
					}),
					className: controlClase
				})
			})
		] })
	});
}
//#endregion
export { RolesListPage as component };
