import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio, s as BLOQUES, u as ROLES } from "./historial-Bc37nCTn.js";
import { a as leerMatriz, c as rolDesdeCodigo, i as guardarMatriz, n as ROLES_SISTEMA, o as matrizPorDefecto, s as restablecerMatriz, t as ACCIONES, u as useRol } from "./permisos-C7yUz4DS.js";
import { x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as Route$1 } from "./seguridad.roles._roleId.permisos-Di4GAAwd.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Download, History, KeyRound, RotateCcw, Save } from "lucide-react";
//#region src/routes/seguridad.roles.$roleId.permisos.tsx?tsr-split=component
var BITACORA = {
	modulo: 8,
	entidad: "rol"
};
/** Nombres legibles de los módulos (la clave del registro es el número) y de los perfiles. */
var ETIQUETAS = Object.fromEntries([...BLOQUES.flatMap((b) => b.modulos.map((m) => [String(m.numero), `M${m.numero} ${m.nombre}`])), ...Object.entries(ROLES)]);
var CHECK = "size-4 rounded-sm accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";
function PermisosRolPage() {
	const { roleId } = Route$1.useParams();
	const rolSesion = useRol();
	const rol = rolDesdeCodigo(roleId) ?? "ADMIN";
	const codigoDesconocido = !rolDesdeCodigo(roleId);
	const [matriz, setMatriz] = useState(matrizPorDefecto);
	const claveHistorial = `permisos-${rol}`;
	const versiones = useHistorial(claveHistorial);
	const [cargada, setCargada] = useState(false);
	const [aplicarTodos, setAplicarTodos] = useState(false);
	const [busqueda, setBusqueda] = useState("");
	const [bloque, setBloque] = useState("");
	const [estadoFiltro, setEstadoFiltro] = useState("");
	const [mensaje, setMensaje] = useState(null);
	useEffect(() => {
		setMatriz(leerMatriz());
		setCargada(true);
	}, []);
	const permisos = matriz[rol];
	const soloLectura = rolSesion !== "ADMIN";
	const setCelda = (modulo, accion, valor) => {
		if (soloLectura) return;
		setMatriz((m) => {
			const siguiente = structuredClone(m);
			const roles = aplicarTodos ? ROLES_SISTEMA : [rol];
			for (const r of roles) {
				const p = siguiente[r][modulo];
				if (accion === "Todos") ACCIONES.forEach((a) => p[a] = valor);
				else {
					p[accion] = valor;
					if (accion === "Lectura" && !valor) ACCIONES.forEach((a) => p[a] = false);
					if (accion !== "Lectura" && valor) p.Lectura = true;
				}
			}
			return siguiente;
		});
	};
	const seleccionarTodo = (valor) => {
		if (soloLectura) return;
		setMatriz((m) => {
			const siguiente = structuredClone(m);
			Object.keys(siguiente[rol]).forEach((k) => ACCIONES.forEach((a) => siguiente[rol][Number(k)][a] = valor));
			return siguiente;
		});
	};
	/** Una versión por perfil cuya fila cambió entre lo guardado (antes) y lo nuevo (después). */
	const versionar = (antes, despues, accion) => {
		let modulos = 0;
		for (const r of ROLES_SISTEMA) {
			const cambiados = Object.keys(despues[r]).filter((k) => JSON.stringify(antes[r][Number(k)]) !== JSON.stringify(despues[r][Number(k)]));
			if (cambiados.length === 0) continue;
			if (r === rol) modulos = cambiados.length;
			registrarCambio(`permisos-${r}`, {
				accion,
				objeto: `Permisos de ${ROLES[r]}: ${cambiados.length} módulos`,
				antes: antes[r],
				despues: despues[r]
			}, BITACORA);
		}
		return modulos;
	};
	const guardar = () => {
		const antes = leerMatriz();
		guardarMatriz(matriz);
		const cambiados = versionar(antes, matriz, aplicarTodos ? "Guardó permisos y los aplicó a todos los roles" : "Guardó permisos");
		setMensaje({
			tipo: "exito",
			texto: `Permisos de ${ROLES[rol]} guardados (${cambiados} módulos modificados).`
		});
	};
	const restablecer = () => {
		const antes = leerMatriz();
		const defecto = restablecerMatriz();
		setMatriz(defecto);
		versionar(antes, defecto, "Restableció permisos a los valores por defecto");
		setMensaje({
			tipo: "aviso",
			texto: "Matriz restablecida a los valores por defecto para todos los roles."
		});
	};
	const restaurarVersion = (registro, n) => {
		const siguiente = {
			...matriz,
			[rol]: registro
		};
		setMatriz(siguiente);
		guardarMatriz(siguiente);
		registrarVersion(claveHistorial, {
			accion: "Restauró una versión anterior",
			objeto: `versión ${n}`,
			registro
		}, BITACORA);
		setMensaje({
			tipo: "exito",
			texto: `Se restauró la versión ${n}. Quedó como una versión nueva en el histórico.`
		});
	};
	const texto = busqueda.trim().toLocaleLowerCase("es-PE");
	const visibles = useMemo(() => BLOQUES.filter((b) => !bloque || String(b.numero) === bloque).map((b) => ({
		...b,
		modulos: b.modulos.filter((m) => {
			if (texto && !`${m.numero} ${m.nombre}`.toLocaleLowerCase("es-PE").includes(texto)) return false;
			const otorgado = ACCIONES.some((a) => permisos[m.numero]?.[a]);
			return estadoFiltro === "otorgado" ? otorgado : estadoFiltro === "sin" ? !otorgado : true;
		})
	})).filter((b) => b.modulos.length > 0), [
		bloque,
		texto,
		estadoFiltro,
		permisos
	]);
	const todosMarcados = Object.values(permisos).every((p) => ACCIONES.every((a) => p[a]));
	const modulosConAcceso = Object.values(permisos).filter((p) => p.Lectura).length;
	const exportar = () => exportarExcel(`permisos-${rol}`, [
		{
			titulo: "Bloque",
			valor: (f) => f.bloque
		},
		{
			titulo: "Módulo",
			valor: (f) => `M${f.numero} ${f.nombre}`
		},
		...ACCIONES.map((a) => ({
			titulo: a,
			valor: (f) => permisos[f.numero][a] ? "Sí" : "No"
		}))
	], BLOQUES.flatMap((b) => b.modulos.map((m) => ({
		bloque: b.nombre,
		numero: m.numero,
		nombre: m.nombre
	}))));
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: KeyRound,
			titulo: "Permisos por rol",
			descripcion: `${ROLES[rol]} · acceso a ${modulosConAcceso} de ${Object.keys(permisos).length} módulos`,
			migas: [
				{ texto: "Seguridad y configuración" },
				{
					texto: "Roles",
					to: "/seguridad/roles"
				},
				{ texto: ROLES[rol] }
			],
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: exportar,
				children: [/* @__PURE__ */ jsx(Download, {}), " Exportar"]
			})
		}),
		codigoDesconocido && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "info",
			children: [
				"El código ",
				roleId,
				" no corresponde a un perfil del sistema; se muestra la matriz de",
				" ",
				ROLES[rol],
				". Los perfiles con matriz propia están en la lista de la izquierda."
			]
		}),
		soloLectura && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "aviso",
			children: [
				"Solo el Administrador del sistema modifica permisos. El perfil actual (",
				ROLES[rolSesion],
				") los ve en modo lectura."
			]
		}),
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: mensaje.tipo,
			onCerrar: () => setMensaje(null),
			children: mensaje.texto
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "matriz",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "matriz",
						children: "Matriz de permisos"
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
					value: "matriz",
					children: [
						/* @__PURE__ */ jsx(Section, {
							titulo: "Filtros",
							className: "mb-4",
							children: /* @__PURE__ */ jsxs(FormGrid, { children: [
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Buscar módulo",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										value: busqueda,
										onChange: (e) => setBusqueda(e.target.value),
										placeholder: "Número o nombre del módulo",
										className: controlClase
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Bloque",
									children: (id) => /* @__PURE__ */ jsxs("select", {
										id,
										value: bloque,
										onChange: (e) => setBloque(e.target.value),
										className: controlClase,
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Todos los bloques"
										}), BLOQUES.map((b) => /* @__PURE__ */ jsxs("option", {
											value: b.numero,
											children: [
												b.numero,
												". ",
												b.nombre
											]
										}, b.numero))]
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Estado",
									children: (id) => /* @__PURE__ */ jsxs("select", {
										id,
										value: estadoFiltro,
										onChange: (e) => setEstadoFiltro(e.target.value),
										className: controlClase,
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Todos"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "otorgado",
												children: "Con algún permiso"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "sin",
												children: "Sin permiso"
											})
										]
									})
								})
							] })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]",
							children: [/* @__PURE__ */ jsxs(Section, {
								titulo: "Perfiles del sistema",
								children: [/* @__PURE__ */ jsx("p", {
									className: "mb-2 text-xs text-muted-foreground",
									children: "Seleccione un perfil para ver o asignar sus permisos."
								}), /* @__PURE__ */ jsx("ul", {
									className: "space-y-1",
									children: ROLES_SISTEMA.map((r) => {
										const acceso = Object.values(matriz[r]).filter((p) => p.Lectura).length;
										return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
											to: "/seguridad/roles/$roleId/permisos",
											params: { roleId: r },
											"aria-current": r === rol ? "page" : void 0,
											className: `block rounded-md border p-2.5 ${r === rol ? "border-primary bg-primary-soft" : "border-border hover:bg-muted"}`,
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ jsx("div", {
														className: "truncate text-sm font-medium",
														children: ROLES[r]
													}), /* @__PURE__ */ jsx("div", {
														className: "text-xs text-muted-foreground",
														children: r
													})]
												}), /* @__PURE__ */ jsxs(StatusBadge, {
													tono: acceso === Object.keys(matriz[r]).length ? "success" : "primary",
													children: [acceso, " módulos"]
												})]
											})
										}) }, r);
									})
								})]
							}), /* @__PURE__ */ jsxs(Section, {
								titulo: `Permisos de ${ROLES[rol]}`,
								acciones: /* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-2 text-sm font-normal normal-case",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: todosMarcados,
										onChange: (e) => seleccionarTodo(e.target.checked),
										className: CHECK,
										disabled: soloLectura
									}), "Seleccionar todos"]
								}),
								children: [/* @__PURE__ */ jsx("div", {
									className: "overflow-x-auto rounded-md border border-border",
									children: /* @__PURE__ */ jsxs("table", {
										className: "w-full text-sm",
										children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "h-9 whitespace-nowrap px-3 text-left text-xs font-semibold uppercase",
											children: "Módulo"
										}), [...ACCIONES, "Todos"].map((a) => /* @__PURE__ */ jsx("th", {
											scope: "col",
											className: "h-9 whitespace-nowrap px-3 text-center text-xs font-semibold uppercase",
											children: a
										}, a))] }) }), /* @__PURE__ */ jsxs("tbody", { children: [visibles.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
											colSpan: ACCIONES.length + 2,
											className: "px-3 py-6 text-center text-sm text-muted-foreground",
											children: "Ningún módulo coincide con los filtros."
										}) }), visibles.map((b) => /* @__PURE__ */ jsx(GrupoBloque, {
											titulo: `Bloque ${b.numero} · ${b.nombre}`,
											children: b.modulos.map((m) => {
												const p = permisos[m.numero];
												const todos = ACCIONES.every((a) => p[a]);
												return /* @__PURE__ */ jsxs("tr", {
													className: "h-10 border-t border-border",
													children: [
														/* @__PURE__ */ jsxs("td", {
															className: "px-3 py-1.5",
															children: [/* @__PURE__ */ jsxs("span", {
																className: "mr-2 text-xs text-muted-foreground",
																children: ["M", m.numero]
															}), m.nombre]
														}),
														ACCIONES.map((a) => /* @__PURE__ */ jsx("td", {
															className: "px-3 py-1.5 text-center",
															children: /* @__PURE__ */ jsx("input", {
																type: "checkbox",
																"aria-label": `${a}: ${m.nombre}`,
																checked: p[a],
																onChange: (e) => setCelda(m.numero, a, e.target.checked),
																className: CHECK,
																disabled: soloLectura
															})
														}, a)),
														/* @__PURE__ */ jsx("td", {
															className: "px-3 py-1.5 text-center",
															children: /* @__PURE__ */ jsx("input", {
																type: "checkbox",
																"aria-label": `Todos los permisos: ${m.nombre}`,
																checked: todos,
																onChange: (e) => setCelda(m.numero, "Todos", e.target.checked),
																className: CHECK,
																disabled: soloLectura
															})
														})
													]
												}, m.numero);
											})
										}, b.numero))] })]
									})
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: "Supervisión: aprobar transiciones de estado (norma de valor y pago, cierres). Sin Lectura no hay ninguna otra acción."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs(FormActions, { children: [
							/* @__PURE__ */ jsxs("label", {
								className: "mr-auto flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: aplicarTodos,
									onChange: (e) => setAplicarTodos(e.target.checked),
									className: CHECK,
									disabled: soloLectura
								}), "Aplicar a todos los roles"]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: restablecer,
								disabled: soloLectura,
								children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Restablecer valores por defecto"]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								onClick: guardar,
								disabled: soloLectura || !cargada,
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar permisos"]
							})
						] })
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: `Histórico de permisos de ${ROLES[rol]}`,
						children: /* @__PURE__ */ jsx(Historico, {
							registro: claveHistorial,
							etiquetas: ETIQUETAS,
							nombreArchivo: `historico-permisos-${rol}`,
							puedeRestaurar: !soloLectura,
							onRestaurar: restaurarVersion
						})
					})
				})
			]
		})
	] });
}
function GrupoBloque({ titulo, children }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("tr", {
		className: "border-t border-border bg-background",
		children: /* @__PURE__ */ jsx("td", {
			colSpan: ACCIONES.length + 2,
			className: "px-3 py-1.5 text-xs font-semibold uppercase text-primary-dark",
			children: titulo
		})
	}), children] });
}
//#endregion
export { PermisosRolPage as component };
