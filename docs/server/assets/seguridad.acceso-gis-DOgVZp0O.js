import { a as controlClase, n as FormField } from "./Form-DtuiyqJ8.js";
import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { f as sincronizarAccesos, i as leerAccesos, v as usuarioWeb } from "./gisProyecto-CAMCHdpa.js";
import { a as leerMatriz, l as tienePermiso, u as useRol } from "./permisos-C7yUz4DS.js";
import { Ft as useUsuarios } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { KeyRound, RefreshCw, Settings2, Share2 } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/seguridad.acceso-gis.tsx?tsr-split=component
/** Módulo de la matriz que gobierna el GIS: Diagnóstico técnico legal (Codificación). */
var MODULO_GIS = 12;
/** Rol del catálogo de usuarios → perfil del sistema (sin perfil: sin acceso GIS). */
var PERFIL = {
	Administrador: "ADMIN",
	"Administrador del sistema": "ADMIN",
	Coordinador: "COORDINADOR",
	"Responsable Predial": "COORDINADOR",
	"Especialista Técnico": "ESP_TECNICO",
	"Especialista Legal": "ESP_LEGAL",
	"Revisor Legal": "ESP_LEGAL",
	Supervisor: "SUPERVISOR",
	Brigadista: "BRIGADISTA",
	Digitador: "BRIGADISTA"
};
var CLAVE = "pdgp-acceso-gis";
function leerConfig() {
	try {
		return JSON.parse(localStorage.getItem(CLAVE) ?? "{}");
	} catch {
		return {};
	}
}
/** Perfil y permisos GIS de un usuario: el mejor de sus roles en la matriz del módulo 12. */
function permisosDe(u) {
	const matriz = leerMatriz();
	const con = [...new Set(u.roles.map((r) => PERFIL[r]).filter(Boolean))].map((rol) => ({
		rol,
		descargar: tienePermiso(rol, MODULO_GIS, "Lectura", matriz),
		actualizar: tienePermiso(rol, MODULO_GIS, "Edición", matriz)
	}));
	return {
		rol: (con.find((c) => c.actualizar) ?? con.find((c) => c.descargar) ?? con[0])?.rol,
		descargar: con.some((c) => c.descargar),
		actualizar: con.some((c) => c.actualizar)
	};
}
function accesoDe(u, c, contrasena) {
	const p = permisosDe(u);
	return {
		usuario: u.email,
		nombre: u.nombre,
		rol: p.rol ?? "",
		rolNombre: p.rol ? ROLES[p.rol] : "Sin perfil",
		proyectos: c?.proyectos ?? "*",
		descargar: p.descargar,
		actualizar: p.actualizar,
		activo: !!c?.activo && u.estado === "Activo" && p.descargar,
		...contrasena ? { contrasena } : {}
	};
}
var SiNo = ({ v }) => v ? /* @__PURE__ */ jsx(StatusBadge, {
	tono: "success",
	children: "Sí"
}) : /* @__PURE__ */ jsx(StatusBadge, {
	tono: "neutral",
	children: "No"
});
function AccesoGisPage() {
	const usuarios = useUsuarios();
	const edita = useRol() === "ADMIN";
	const [config, setConfig] = useState({});
	const [servidor, setServidor] = useState(null);
	const [error, setError] = useState("");
	const [editar, setEditar] = useState(null);
	useEffect(() => setConfig(leerConfig()), []);
	const consultar = useCallback(async () => {
		try {
			setServidor(await leerAccesos());
			setError("");
		} catch (e) {
			setError(e.message);
		}
	}, []);
	useEffect(() => {
		consultar();
	}, [consultar]);
	const filas = useMemo(() => usuarios.map((u) => {
		const a = accesoDe(u, config[u.id]);
		const s = servidor?.find((x) => x.usuario.toLowerCase() === u.email.toLowerCase());
		return {
			u,
			a,
			contrasena: !!s?.tieneContrasena,
			sincronizado: !!s && s.activo === a.activo
		};
	}), [
		usuarios,
		config,
		servidor
	]);
	/** Guarda la configuración y la envía al servicio (con la contraseña nueva, si se asignó). */
	const guardar = async (nueva, contrasenas = {}) => {
		setConfig(nueva);
		try {
			localStorage.setItem(CLAVE, JSON.stringify(nueva));
		} catch {}
		try {
			const r = await sincronizarAccesos(usuarios.map((u) => accesoDe(u, nueva[u.id], contrasenas[u.id])), usuarioWeb());
			setServidor(r);
			setError("");
			toast.success("Accesos GIS sincronizados", { description: `${r.filter((x) => x.activo).length} usuarios con acceso activo al servicio.` });
		} catch (e) {
			setError(e.message);
		}
	};
	const activos = filas.filter((f) => f.a.activo).length;
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Share2,
			titulo: "Acceso GIS",
			descripcion: "Quién lee los proyectos desde QGIS o ArcGIS, con qué credenciales, y quién puede enviar cambios a revisión.",
			migas: [{ texto: "Seguridad y configuración" }, { texto: "Acceso GIS" }],
			acciones: edita && /* @__PURE__ */ jsxs(Button, {
				variant: "outline",
				onClick: () => void guardar(config),
				children: [/* @__PURE__ */ jsx(RefreshCw, {}), " Sincronizar con el servicio"]
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "space-y-4",
			children: [
				error && /* @__PURE__ */ jsx(Aviso, {
					tipo: "error",
					children: error
				}),
				!edita && /* @__PURE__ */ jsx(Aviso, {
					tipo: "info",
					children: "Solo el Administrador del sistema asigna accesos y contraseñas GIS."
				}),
				/* @__PURE__ */ jsxs(Section, {
					titulo: `Usuarios (${activos} con acceso activo)`,
					children: [/* @__PURE__ */ jsxs("p", {
						className: "mb-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("strong", {
								className: "text-foreground",
								children: "Descargar proyecto"
							}),
							" es la Lectura y",
							" ",
							/* @__PURE__ */ jsx("strong", {
								className: "text-foreground",
								children: "Actualizar GIS"
							}),
							" es la Edición del módulo 12 (Diagnóstico técnico legal específico) en la",
							" ",
							/* @__PURE__ */ jsx(Link, {
								to: "/seguridad/roles",
								className: "font-semibold text-primary underline underline-offset-2",
								children: "matriz de permisos de Roles"
							}),
							". Si cambia la matriz, sincronice de nuevo. El usuario de demostración del acceso web entra siempre como Administrador."
						]
					}), /* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "nombre",
								titulo: "Usuario",
								render: ({ u }) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium",
									children: u.nombre
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: u.email
								})] })
							},
							{
								clave: "perfil",
								titulo: "Perfil GIS",
								render: ({ a }) => a.rolNombre
							},
							{
								clave: "proyectos",
								titulo: "Proyectos",
								render: ({ a }) => a.proyectos === "*" ? "Todos" : `${a.proyectos.length} ${a.proyectos.length === 1 ? "proyecto" : "proyectos"}`
							},
							{
								clave: "descargar",
								titulo: "Descargar",
								render: ({ a }) => /* @__PURE__ */ jsx(SiNo, { v: a.descargar })
							},
							{
								clave: "actualizar",
								titulo: "Actualizar GIS",
								render: ({ a }) => /* @__PURE__ */ jsx(SiNo, { v: a.actualizar })
							},
							{
								clave: "clave",
								titulo: "Contraseña GIS",
								render: ({ contrasena }) => contrasena ? /* @__PURE__ */ jsx(StatusBadge, {
									tono: "success",
									children: "Asignada"
								}) : /* @__PURE__ */ jsx(StatusBadge, {
									tono: "neutral",
									children: "Sin asignar"
								})
							},
							{
								clave: "acceso",
								titulo: "Acceso",
								render: ({ u, a, sincronizado }) => /* @__PURE__ */ jsxs("div", {
									className: "space-y-0.5",
									children: [
										a.activo ? /* @__PURE__ */ jsx(StatusBadge, {
											tono: "success",
											children: "Activo"
										}) : /* @__PURE__ */ jsx(StatusBadge, {
											tono: "neutral",
											children: "Inactivo"
										}),
										u.estado !== "Activo" && /* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground",
											children: "Usuario inactivo"
										}),
										!a.descargar && /* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground",
											children: "Su perfil no lee el módulo 12"
										}),
										servidor && !sincronizado && /* @__PURE__ */ jsx("p", {
											className: "text-xs text-warning",
											children: "Sin sincronizar"
										})
									]
								})
							},
							{
								clave: "acciones",
								titulo: "Acciones",
								alinear: "derecha",
								render: ({ u }) => edita && /* @__PURE__ */ jsxs(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => setEditar(u),
									children: [/* @__PURE__ */ jsx(Settings2, {}), " Configurar"]
								})
							}
						],
						filas,
						claveFila: (f) => f.u.id
					})]
				})
			]
		}),
		editar && /* @__PURE__ */ jsx(ConfigModal, {
			usuario: editar,
			config: config[editar.id],
			tieneContrasena: !!filas.find((f) => f.u.id === editar.id)?.contrasena,
			onCerrar: () => setEditar(null),
			onGuardar: (c, contrasena) => {
				guardar({
					...config,
					[editar.id]: c
				}, contrasena ? { [editar.id]: contrasena } : {});
				setEditar(null);
			}
		})
	] });
}
function ConfigModal({ usuario, config, tieneContrasena, onCerrar, onGuardar }) {
	const p = permisosDe(usuario);
	const [activo, setActivo] = useState(config?.activo ?? false);
	const [todos, setTodos] = useState((config?.proyectos ?? "*") === "*");
	const [elegidos, setElegidos] = useState(Array.isArray(config?.proyectos) ? config.proyectos : []);
	const [clave, setClave] = useState("");
	const [repetir, setRepetir] = useState("");
	const [errores, setErrores] = useState({});
	const confirmar = () => {
		const e = {};
		if (clave && clave.length < 8) e.clave = "Use al menos 8 caracteres.";
		if (clave !== repetir) e.repetir = "Las contraseñas no coinciden.";
		if (activo && !clave && !tieneContrasena) e.clave = "Asigne una contraseña para activar el acceso.";
		if (activo && !todos && !elegidos.length) e.proyectos = "Elija al menos un proyecto.";
		setErrores(e);
		if (Object.keys(e).length) return;
		onGuardar({
			activo,
			proyectos: todos ? "*" : elegidos
		}, clave || void 0);
	};
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "md",
		titulo: "Configurar acceso GIS",
		descripcion: `${usuario.nombre} · ${usuario.email}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			onClick: confirmar,
			children: [/* @__PURE__ */ jsx(KeyRound, {}), " Guardar y sincronizar"]
		})] }),
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ jsxs(Aviso, {
					tipo: p.descargar ? "info" : "aviso",
					children: [
						"Perfil ",
						p.rol ? ROLES[p.rol] : "sin equivalente en el sistema",
						":",
						" ",
						p.descargar ? "descarga" : "no descarga",
						" proyectos y",
						" ",
						p.actualizar ? "envía" : "no envía",
						" cambios a revisión, según la matriz del módulo 12."
					]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 text-sm font-medium",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: activo,
						onChange: (e) => setActivo(e.target.checked),
						disabled: !p.descargar
					}), "Acceso GIS activo"]
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Proyectos",
					error: errores.proyectos,
					children: (id) => /* @__PURE__ */ jsxs("div", {
						id,
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: todos,
								onChange: (e) => setTodos(e.target.checked)
							}), "Todos los proyectos"]
						}), !todos && /* @__PURE__ */ jsx("div", {
							className: "max-h-48 space-y-1 overflow-y-auto rounded-md border border-border p-2",
							children: proyectos.map((pr) => /* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: elegidos.includes(pr.id),
										onChange: (e) => setElegidos((s) => e.target.checked ? [...s, pr.id] : s.filter((x) => x !== pr.id))
									}),
									pr.nombre,
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground",
										children: pr.codigo
									})
								]
							}, pr.id))
						})]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: tieneContrasena ? "Nueva contraseña GIS" : "Contraseña GIS",
					ayuda: tieneContrasena ? "Déjela en blanco para conservar la actual." : "La usa en el plugin y en la conexión directa.",
					error: errores.clave,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "password",
						autoComplete: "new-password",
						value: clave,
						onChange: (e) => setClave(e.target.value),
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Repetir contraseña",
					error: errores.repetir,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "password",
						autoComplete: "new-password",
						value: repetir,
						onChange: (e) => setRepetir(e.target.value),
						className: controlClase
					})
				})
			]
		})
	});
}
//#endregion
export { AccesoGisPage as component };
