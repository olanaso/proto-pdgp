import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { Bt as descendientes, Ft as useUsuarios, Gt as siguienteOrden, Ht as hijosDe, It as NOMBRE_TIPO_AREA, Jt as validarArea, Kt as textoRuta, Pt as guardarUsuarios, Rt as bloqueoInactivar, Ut as idArea, Vt as guardarAreas, Wt as rutaArea, qt as useAreas, zt as codigoDocumental } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, S as exportarPdf, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronRight, ChevronsDownUp, ChevronsUpDown, FileDown, FileSpreadsheet, FolderTree, History, MoveRight, Pencil, Plus, Power, Search, UserPlus } from "lucide-react";
//#region src/components/kit/Arbol.tsx
function Arbol({ raices, hijosDe, abiertos, onAlternar, seleccionado, onSeleccionar, etiqueta, renderNodo, nombre }) {
	const ref = useRef(null);
	const visibles = [];
	const recorrer = (lista, nivel, padreId) => {
		for (const n of lista) {
			const hijos = hijosDe(n.id);
			visibles.push({
				nodo: n,
				nivel,
				tieneHijos: hijos.length > 0,
				padreId
			});
			if (hijos.length && abiertos.has(n.id)) recorrer(hijos, nivel + 1, n.id);
		}
	};
	recorrer(raices, 1, null);
	const activo = visibles.find((v) => v.nodo.id === seleccionado)?.nodo.id ?? visibles[0]?.nodo.id;
	const enfocar = (id) => {
		onSeleccionar(id);
		requestAnimationFrame(() => ref.current?.querySelector(`[data-nodo="${CSS.escape(id)}"]`)?.focus());
	};
	function teclado(e, i) {
		const v = visibles[i];
		const ir = (j) => visibles[j] && enfocar(visibles[j].nodo.id);
		const accion = {
			ArrowDown: () => ir(i + 1),
			ArrowUp: () => ir(i - 1),
			Home: () => ir(0),
			End: () => ir(visibles.length - 1),
			ArrowRight: () => {
				if (!v.tieneHijos) return;
				if (abiertos.has(v.nodo.id)) ir(i + 1);
				else onAlternar(v.nodo.id, true);
			},
			ArrowLeft: () => {
				if (v.tieneHijos && abiertos.has(v.nodo.id)) onAlternar(v.nodo.id, false);
				else if (v.padreId) enfocar(v.padreId);
			},
			Enter: () => onSeleccionar(v.nodo.id),
			" ": () => onSeleccionar(v.nodo.id)
		}[e.key];
		if (accion) {
			e.preventDefault();
			accion();
		}
	}
	return /* @__PURE__ */ jsx("ul", {
		ref,
		role: "tree",
		"aria-label": nombre,
		className: "space-y-0.5",
		children: visibles.map((v, i) => {
			const abierto = abiertos.has(v.nodo.id);
			const elegido = v.nodo.id === seleccionado;
			return /* @__PURE__ */ jsx("li", {
				role: "treeitem",
				"data-nodo": v.nodo.id,
				"aria-level": v.nivel,
				"aria-selected": elegido,
				"aria-expanded": v.tieneHijos ? abierto : void 0,
				"aria-label": etiqueta(v.nodo),
				tabIndex: v.nodo.id === activo ? 0 : -1,
				onKeyDown: (e) => teclado(e, i),
				onClick: () => onSeleccionar(v.nodo.id),
				style: { paddingLeft: `${(v.nivel - 1) * 1.25}rem` },
				className: "cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: /* @__PURE__ */ jsxs("div", {
					className: `flex items-start gap-1 rounded-md px-1 py-1.5 ${elegido ? "bg-primary-soft" : "hover:bg-muted"}`,
					children: [v.tieneHijos ? /* @__PURE__ */ jsx("button", {
						type: "button",
						tabIndex: -1,
						"aria-hidden": true,
						onClick: (e) => {
							e.stopPropagation();
							onAlternar(v.nodo.id, !abierto);
						},
						className: "mt-0.5 shrink-0 rounded-sm p-0.5 text-muted-foreground hover:bg-card",
						children: /* @__PURE__ */ jsx(ChevronRight, {
							size: 16,
							className: `transition-transform ${abierto ? "rotate-90" : ""}`
						})
					}) : /* @__PURE__ */ jsx("span", {
						className: "w-5 shrink-0",
						"aria-hidden": true
					}), /* @__PURE__ */ jsx("div", {
						className: "min-w-0 flex-1",
						children: renderNodo(v.nodo, v)
					})]
				})
			}, v.nodo.id);
		})
	});
}
//#endregion
//#region src/routes/seguridad.areas.tsx?tsr-split=component
var ETIQUETAS = {
	codigo: "Sigla",
	nombre: "Nombre",
	tipo: "Tipo",
	padreId: "Área superior",
	orden: "Orden",
	responsableId: "Responsable",
	codigoOrgano: "Código documental",
	emiteDocumentos: "Emite documentos",
	estado: "Estado",
	vigenteDesde: "Vigente desde",
	observacion: "Observación"
};
var areaVacia = (padreId, orden) => ({
	id: idArea(),
	codigo: "",
	nombre: "",
	tipo: padreId ? "EQUIPO" : "ORGANO",
	padreId,
	orden,
	responsableId: "",
	codigoOrgano: "",
	emiteDocumentos: false,
	estado: "ACTIVA",
	vigenteDesde: "",
	observacion: ""
});
/** Áreas en orden de árbol con su nivel, para listas, selectores y exportaciones. */
function enOrden(areas) {
	const salida = [];
	const recorrer = (padreId, nivel) => {
		for (const a of hijosDe(areas, padreId)) {
			salida.push({
				area: a,
				nivel
			});
			recorrer(a.id, nivel + 1);
		}
	};
	recorrer(null, 1);
	return salida;
}
var sangria = (nivel) => "\xA0\xA0\xA0".repeat(nivel - 1);
function AreasPage() {
	const rol = useRol();
	const edita = rol === "ADMIN";
	const areas = useAreas();
	const usuarios = useUsuarios();
	const porUsuario = useMemo(() => new Map(usuarios.map((u) => [u.id, u])), [usuarios]);
	const [seleccion, setSeleccion] = useState("ddp");
	const [abiertos, setAbiertos] = useState(() => new Set(areas.filter((a) => areas.some((h) => h.padreId === a.id)).map((a) => a.id)));
	const [busqueda, setBusqueda] = useState("");
	const [editar, setEditar] = useState(null);
	const [mover, setMover] = useState(null);
	const [cambiarEstado, setCambiarEstado] = useState(null);
	const [asignar, setAsignar] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const [filtroTipo, setFiltroTipo] = useState("");
	const [filtroEstado, setFiltroEstado] = useState("");
	const ordenadas = useMemo(() => enOrden(areas), [areas]);
	const elegida = areas.find((a) => a.id === seleccion);
	const nombreResponsable = (a) => a.responsableId ? porUsuario.get(a.responsableId)?.nombre ?? a.responsableId : "";
	const texto = busqueda.trim().toLowerCase();
	const visibles = useMemo(() => {
		if (!texto) return null;
		const ids = /* @__PURE__ */ new Set();
		for (const a of areas) if ([
			a.codigo,
			a.nombre,
			nombreResponsable(a)
		].some((v) => v.toLowerCase().includes(texto))) rutaArea(areas, a.id).forEach((r) => ids.add(r.id));
		return ids;
	}, [
		texto,
		areas,
		porUsuario
	]);
	const filtrar = (lista) => visibles ? lista.filter((a) => visibles.has(a.id)) : lista;
	function guardar(a, nueva) {
		const limpia = {
			...a,
			codigo: a.codigo.trim().toUpperCase(),
			nombre: a.nombre.trim()
		};
		guardarAreas(nueva ? [...areas, limpia] : areas.map((x) => x.id === a.id ? limpia : x), nueva ? "Creó área" : "Modificó área", `${limpia.codigo} · ${limpia.nombre}`);
		setEditar(null);
		setSeleccion(limpia.id);
		if (limpia.padreId) setAbiertos((s) => new Set(s).add(limpia.padreId));
		setMensaje(`Área ${limpia.codigo} ${nueva ? "creada" : "guardada"}.`);
	}
	function moverA(a, padreId, motivo) {
		const destino = padreId ? areas.find((x) => x.id === padreId)?.codigo : "raíz";
		const movida = {
			...a,
			padreId,
			orden: siguienteOrden(areas, padreId)
		};
		guardarAreas(areas.map((x) => x.id === a.id ? movida : x), "Movió área", `${a.codigo} a ${destino}`, motivo);
		setMover(null);
		if (padreId) setAbiertos((s) => new Set(s).add(padreId));
		setMensaje(`Área ${a.codigo} movida con sus subáreas a ${destino}.`);
	}
	function alternarEstado(a, motivo) {
		const estado = a.estado === "ACTIVA" ? "INACTIVA" : "ACTIVA";
		guardarAreas(areas.map((x) => x.id === a.id ? {
			...x,
			estado
		} : x), estado === "INACTIVA" ? "Inactivó área" : "Activó área", `${a.codigo} · ${a.nombre}`, motivo);
		setCambiarEstado(null);
		setMensaje(`Área ${a.codigo} ${estado === "INACTIVA" ? "inactivada" : "activada"}.`);
	}
	const columnasExport = [
		{
			titulo: "Sigla",
			valor: (f) => `${sangria(f.nivel)}${f.area.codigo}`
		},
		{
			titulo: "Nombre",
			valor: (f) => f.area.nombre
		},
		{
			titulo: "Tipo",
			valor: (f) => NOMBRE_TIPO_AREA[f.area.tipo]
		},
		{
			titulo: "Ruta",
			valor: (f) => textoRuta(areas, f.area.id)
		},
		{
			titulo: "Responsable",
			valor: (f) => nombreResponsable(f.area)
		},
		{
			titulo: "Código documental",
			valor: (f) => codigoDocumental(areas, f.area.id)
		},
		{
			titulo: "Estado",
			valor: (f) => f.area.estado === "ACTIVA" ? "Activa" : "Inactiva"
		}
	];
	const cabecera = {
		titulo: "Estructura orgánica (áreas)",
		lineas: [`${areas.length} áreas · ${areas.filter((a) => a.estado === "ACTIVA").length} activas`]
	};
	const filasLista = ordenadas.filter((f) => (!filtroTipo || f.area.tipo === filtroTipo) && (!filtroEstado || f.area.estado === filtroEstado));
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: FolderTree,
			titulo: "Áreas",
			descripcion: "Estructura orgánica de la entidad: cada área cuelga de otra o es raíz, tiene un responsable y un código para numerar los documentos que emite.",
			migas: [{ texto: "Seguridad y configuración" }, { texto: "Áreas" }],
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				edita && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => setEditar({
						area: areaVacia(null, siguienteOrden(areas, null)),
						nueva: true
					}),
					children: [/* @__PURE__ */ jsx(Plus, {}), " Nueva área"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void exportarExcel("areas", columnasExport, ordenadas, cabecera),
					children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Excel"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void exportarPdf("areas", columnasExport, ordenadas, cabecera),
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
				": puede consultar las áreas. Crear áreas y asignar usuarios lo hace el perfil Administrador del sistema (cambie de perfil desde su usuario, arriba a la derecha)."
			]
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "arbol",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "arbol",
							children: "Árbol"
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "lista",
							children: [
								"Lista (",
								areas.length,
								")"
							]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "historico",
							children: [/* @__PURE__ */ jsx(History, {
								size: 16,
								className: "mr-1",
								"aria-hidden": true
							}), " Histórico"]
						})
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "arbol",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 lg:grid-cols-5",
						children: [/* @__PURE__ */ jsxs(Section, {
							titulo: "Árbol de áreas",
							className: "lg:col-span-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-3 flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "relative min-w-0 flex-1",
										children: [/* @__PURE__ */ jsx(Search, {
											size: 16,
											className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
											"aria-hidden": true
										}), /* @__PURE__ */ jsx("input", {
											type: "search",
											"aria-label": "Buscar área por sigla, nombre o responsable",
											placeholder: "Buscar por sigla, nombre o responsable",
											className: `${controlClase} pl-9`,
											value: busqueda,
											onChange: (e) => setBusqueda(e.target.value)
										})]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setAbiertos(new Set(areas.filter((a) => areas.some((h) => h.padreId === a.id)).map((a) => a.id))),
										children: [/* @__PURE__ */ jsx(ChevronsUpDown, {}), " Expandir todo"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setAbiertos(/* @__PURE__ */ new Set()),
										children: [/* @__PURE__ */ jsx(ChevronsDownUp, {}), " Contraer todo"]
									})
								]
							}), visibles && visibles.size === 0 ? /* @__PURE__ */ jsxs("p", {
								className: "py-6 text-center text-sm text-muted-foreground",
								children: [
									"Ninguna área coincide con «",
									busqueda,
									"»."
								]
							}) : /* @__PURE__ */ jsx(Arbol, {
								nombre: "Árbol de áreas",
								raices: filtrar(hijosDe(areas, null)),
								hijosDe: (id) => filtrar(hijosDe(areas, id)),
								abiertos: visibles ?? abiertos,
								onAlternar: (id, abrir) => setAbiertos((s) => {
									const n = new Set(s);
									if (abrir) n.add(id);
									else n.delete(id);
									return n;
								}),
								seleccionado: seleccion,
								onSeleccionar: setSeleccion,
								etiqueta: (a) => `${a.codigo}, ${a.nombre}${a.estado === "INACTIVA" ? ", inactiva" : ""}`,
								renderNodo: (a) => {
									const subareas = areas.filter((h) => h.padreId === a.id).length;
									const miembros = usuarios.filter((u) => u.areaId === a.id).length;
									return /* @__PURE__ */ jsxs("div", {
										className: a.estado === "INACTIVA" ? "text-muted-foreground" : "",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap items-center gap-x-2 gap-y-1",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "text-sm font-semibold",
													children: a.codigo
												}),
												/* @__PURE__ */ jsx("span", {
													className: "text-sm",
													children: a.nombre
												}),
												a.estado === "INACTIVA" && /* @__PURE__ */ jsx(StatusBadge, {
													tono: "neutral",
													children: "Inactiva"
												})
											]
										}), /* @__PURE__ */ jsxs("p", {
											className: "text-xs text-muted-foreground",
											children: [
												NOMBRE_TIPO_AREA[a.tipo],
												" · ",
												nombreResponsable(a) || "Sin responsable",
												subareas > 0 && ` · ${subareas} subárea${subareas === 1 ? "" : "s"}`,
												miembros > 0 && ` · ${miembros} usuario${miembros === 1 ? "" : "s"}`
											]
										})]
									});
								}
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "lg:col-span-3",
							children: elegida ? /* @__PURE__ */ jsx(DetalleArea, {
								area: elegida,
								areas,
								usuarios,
								responsable: porUsuario.get(elegida.responsableId),
								edita,
								onSeleccionar: setSeleccion,
								onEditar: () => setEditar({
									area: elegida,
									nueva: false
								}),
								onNuevaSubarea: () => setEditar({
									area: areaVacia(elegida.id, siguienteOrden(areas, elegida.id)),
									nueva: true
								}),
								onMover: () => setMover(elegida),
								onAsignar: () => setAsignar(elegida),
								onCambiarEstado: () => setCambiarEstado(elegida)
							}) : /* @__PURE__ */ jsx(Section, {
								titulo: "Detalle del área",
								children: /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Elija un área del árbol para ver su detalle."
								})
							})
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "lista",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Lista de áreas",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ jsxs("select", {
								"aria-label": "Filtrar por tipo",
								className: `${controlClase} w-auto`,
								value: filtroTipo,
								onChange: (e) => setFiltroTipo(e.target.value),
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Todos los tipos"
								}), Object.keys(NOMBRE_TIPO_AREA).map((t) => /* @__PURE__ */ jsx("option", {
									value: t,
									children: NOMBRE_TIPO_AREA[t]
								}, t))]
							}), /* @__PURE__ */ jsxs("select", {
								"aria-label": "Filtrar por estado",
								className: `${controlClase} w-auto`,
								value: filtroEstado,
								onChange: (e) => setFiltroEstado(e.target.value),
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Todos los estados"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "ACTIVA",
										children: "Activas"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "INACTIVA",
										children: "Inactivas"
									})
								]
							})]
						}), /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "codigo",
									titulo: "Sigla",
									render: (f) => /* @__PURE__ */ jsx("button", {
										type: "button",
										className: "font-semibold text-primary-dark hover:underline",
										onClick: () => setSeleccion(f.area.id),
										children: f.area.codigo
									})
								},
								{
									clave: "nombre",
									titulo: "Nombre",
									render: (f) => f.area.nombre
								},
								{
									clave: "tipo",
									titulo: "Tipo",
									render: (f) => NOMBRE_TIPO_AREA[f.area.tipo]
								},
								{
									clave: "ruta",
									titulo: "Ruta",
									render: (f) => textoRuta(areas, f.area.id)
								},
								{
									clave: "responsable",
									titulo: "Responsable",
									render: (f) => nombreResponsable(f.area) || "Sin responsable"
								},
								{
									clave: "documental",
									titulo: "Código documental",
									render: (f) => codigoDocumental(areas, f.area.id)
								},
								{
									clave: "estado",
									titulo: "Estado",
									render: (f) => /* @__PURE__ */ jsx(StatusBadge, {
										tono: f.area.estado === "ACTIVA" ? "success" : "neutral",
										children: f.area.estado === "ACTIVA" ? "Activa" : "Inactiva"
									})
								}
							],
							filas: filasLista,
							claveFila: (f) => f.area.id,
							vacio: "Ninguna área con esos filtros."
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Historico, {
						registro: "areas",
						etiquetas: ETIQUETAS,
						nombreArchivo: "historico-areas"
					})
				})
			]
		}),
		editar && /* @__PURE__ */ jsx(AreaModal, {
			inicial: editar.area,
			nueva: editar.nueva,
			areas,
			usuarios,
			onCerrar: () => setEditar(null),
			onGuardar: (a) => guardar(a, editar.nueva)
		}),
		mover && /* @__PURE__ */ jsx(MoverModal, {
			area: mover,
			areas,
			usuarios,
			onCerrar: () => setMover(null),
			onMover: (padreId, motivo) => moverA(mover, padreId, motivo)
		}),
		asignar && /* @__PURE__ */ jsx(AsignarModal, {
			area: asignar,
			areas,
			usuarios,
			onCerrar: () => setAsignar(null),
			onGuardar: (ids) => {
				const entran = usuarios.filter((u) => ids.has(u.id) && u.areaId !== asignar.id);
				const salen = usuarios.filter((u) => !ids.has(u.id) && u.areaId === asignar.id);
				const siguiente = usuarios.map((u) => ids.has(u.id) ? {
					...u,
					areaId: asignar.id
				} : u.areaId === asignar.id ? {
					...u,
					areaId: void 0
				} : u);
				guardarUsuarios(usuarios, siguiente, "Asignó usuarios a área", `${asignar.codigo}: ${[entran.length && `entran ${entran.map((u) => u.nombre).join(", ")}`, salen.length && `salen ${salen.map((u) => u.nombre).join(", ")}`].filter(Boolean).join("; ")}`);
				setAsignar(null);
				setMensaje(`Usuarios de ${asignar.codigo} actualizados: ${entran.length} asignado(s), ${salen.length} quitado(s).`);
			}
		}),
		cambiarEstado && /* @__PURE__ */ jsx(EstadoModal, {
			area: cambiarEstado,
			bloqueo: cambiarEstado.estado === "ACTIVA" ? bloqueoInactivar(areas, cambiarEstado.id, usuarios) : validarArea(areas, {
				...cambiarEstado,
				estado: "ACTIVA"
			}, usuarios),
			onCerrar: () => setCambiarEstado(null),
			onConfirmar: (motivo) => alternarEstado(cambiarEstado, motivo)
		})
	] });
}
function DetalleArea({ area, areas, usuarios, responsable, edita, onSeleccionar, onEditar, onNuevaSubarea, onMover, onAsignar, onCambiarEstado }) {
	const ruta = rutaArea(areas, area.id);
	const subareas = hijosDe(areas, area.id);
	const miembros = usuarios.filter((u) => u.areaId === area.id);
	return /* @__PURE__ */ jsxs(Section, {
		titulo: `${area.codigo} · ${area.nombre}`,
		acciones: edita && /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				size: "sm",
				variant: "outline",
				onClick: onEditar,
				children: [/* @__PURE__ */ jsx(Pencil, {}), " Editar"]
			}),
			area.estado === "ACTIVA" && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				size: "sm",
				variant: "outline",
				onClick: onNuevaSubarea,
				children: [/* @__PURE__ */ jsx(Plus, {}), " Nueva subárea"]
			}),
			area.estado === "ACTIVA" && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				size: "sm",
				variant: "outline",
				onClick: onAsignar,
				children: [/* @__PURE__ */ jsx(UserPlus, {}), " Asignar usuarios"]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				size: "sm",
				variant: "outline",
				onClick: onMover,
				children: [/* @__PURE__ */ jsx(MoveRight, {}), " Mover"]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				size: "sm",
				variant: area.estado === "ACTIVA" ? "destructive" : "outline",
				onClick: onCambiarEstado,
				children: [
					/* @__PURE__ */ jsx(Power, {}),
					" ",
					area.estado === "ACTIVA" ? "Inactivar" : "Activar"
				]
			})
		] }),
		children: [
			/* @__PURE__ */ jsx("nav", {
				"aria-label": "Ruta del área",
				className: "mb-3 flex flex-wrap items-center gap-1 text-sm",
				children: ruta.map((r, i) => /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1",
					children: [i > 0 && /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "›"
					}), r.id === area.id ? /* @__PURE__ */ jsx("span", {
						className: "font-semibold",
						children: r.codigo
					}) : /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "text-primary-dark hover:underline",
						onClick: () => onSeleccionar(r.id),
						children: r.codigo
					})]
				}, r.id))
			}),
			!area.responsableId && area.estado === "ACTIVA" && /* @__PURE__ */ jsx(Aviso, {
				tipo: "aviso",
				children: "El área no tiene responsable designado."
			}),
			/* @__PURE__ */ jsxs("dl", {
				className: "grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]",
				children: [
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Tipo"
					}),
					/* @__PURE__ */ jsx("dd", { children: NOMBRE_TIPO_AREA[area.tipo] }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Estado"
					}),
					/* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx(StatusBadge, {
						tono: area.estado === "ACTIVA" ? "success" : "neutral",
						children: area.estado === "ACTIVA" ? "Activa" : "Inactiva"
					}) }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Responsable"
					}),
					/* @__PURE__ */ jsx("dd", { children: responsable ? /* @__PURE__ */ jsxs(Link, {
						to: "/seguridad/usuarios",
						className: "text-primary-dark hover:underline",
						children: [
							responsable.nombre,
							" (",
							responsable.cargo,
							")"
						]
					}) : "Sin responsable" }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Código documental"
					}),
					/* @__PURE__ */ jsxs("dd", { children: [/* @__PURE__ */ jsx("span", {
						className: "font-semibold",
						children: codigoDocumental(areas, area.id)
					}), area.emiteDocumentos ? /* @__PURE__ */ jsxs("span", {
						className: "text-muted-foreground",
						children: [
							" ",
							"· ejemplo: OFICIO N.° 0001-",
							(/* @__PURE__ */ new Date()).getFullYear(),
							"-",
							codigoDocumental(areas, area.id)
						]
					}) : /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: " · no emite documentos"
					})] }),
					/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Vigente desde"
					}),
					/* @__PURE__ */ jsx("dd", { children: area.vigenteDesde ? fecha(area.vigenteDesde) : "Sin fecha" }),
					area.observacion && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: "Observación"
					}), /* @__PURE__ */ jsx("dd", { children: area.observacion })] })
				]
			}),
			/* @__PURE__ */ jsxs("h3", {
				className: "mb-2 mt-4 text-sm font-semibold",
				children: [
					"Subáreas (",
					subareas.length,
					")"
				]
			}),
			subareas.length ? /* @__PURE__ */ jsx("ul", {
				className: "flex flex-wrap gap-2",
				children: subareas.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onSeleccionar(s.id),
					className: "rounded-md border border-border px-2 py-1 text-sm hover:bg-muted",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold",
							children: s.codigo
						}),
						" ",
						s.nombre
					]
				}) }, s.id))
			}) : /* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: "No tiene subáreas."
			}),
			/* @__PURE__ */ jsxs("h3", {
				className: "mb-2 mt-4 text-sm font-semibold",
				children: [
					"Usuarios del área (",
					miembros.length,
					")"
				]
			}),
			miembros.length ? /* @__PURE__ */ jsx("ul", {
				className: "divide-y divide-border text-sm",
				children: miembros.map((u) => /* @__PURE__ */ jsxs("li", {
					className: "flex flex-wrap items-center justify-between gap-2 py-1.5",
					children: [/* @__PURE__ */ jsxs("span", { children: [
						u.nombre,
						" ",
						/* @__PURE__ */ jsxs("span", {
							className: "text-muted-foreground",
							children: ["· ", u.cargo]
						})
					] }), /* @__PURE__ */ jsx(StatusBadge, {
						tono: u.estado === "Activo" ? "success" : "warning",
						children: u.estado
					})]
				}, u.id))
			}) : /* @__PURE__ */ jsxs("p", {
				className: "text-sm text-muted-foreground",
				children: ["Ningún usuario asignado.", edita && area.estado === "ACTIVA" && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "text-primary-dark hover:underline",
					onClick: onAsignar,
					children: "Asignar usuarios"
				})] })]
			})
		]
	});
}
/**
* Asignar usuarios al área: se marcan los que pertenecen a ella. Un usuario tiene una sola área, así
* que marcar a alguien de otra área lo cambia de área (se avisa en la fila).
*/
function AsignarModal({ area, areas, usuarios, onCerrar, onGuardar }) {
	const [ids, setIds] = useState(() => new Set(usuarios.filter((u) => u.areaId === area.id).map((u) => u.id)));
	const [texto, setTexto] = useState("");
	const porId = new Map(areas.map((a) => [a.id, a]));
	const t = texto.trim().toLowerCase();
	const lista = usuarios.filter((u) => !t || [
		u.nombre,
		u.cargo,
		u.email
	].some((v) => v.toLowerCase().includes(t)));
	const cambios = usuarios.filter((u) => ids.has(u.id) !== (u.areaId === area.id)).length;
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "lg",
		titulo: `Asignar usuarios a ${area.codigo}`,
		descripcion: `${area.nombre}. Un usuario pertenece a una sola área: si ya está en otra, pasa a esta.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			disabled: cambios === 0,
			onClick: () => onGuardar(ids),
			children: [
				/* @__PURE__ */ jsx(UserPlus, {}),
				" Guardar asignación",
				cambios ? ` (${cambios} cambio${cambios === 1 ? "" : "s"})` : ""
			]
		})] }),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative mb-3",
			children: [/* @__PURE__ */ jsx(Search, {
				size: 16,
				className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
				"aria-hidden": true
			}), /* @__PURE__ */ jsx("input", {
				type: "search",
				"aria-label": "Buscar usuario",
				placeholder: "Buscar por nombre, cargo o correo",
				className: `${controlClase} pl-9`,
				value: texto,
				onChange: (e) => setTexto(e.target.value)
			})]
		}), /* @__PURE__ */ jsxs("ul", {
			className: "max-h-96 divide-y divide-border overflow-y-auto rounded-md border border-border",
			children: [lista.map((u) => {
				const marcado = ids.has(u.id);
				const otra = u.areaId && u.areaId !== area.id ? porId.get(u.areaId) : void 0;
				const inactivo = u.estado !== "Activo";
				return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", {
					className: "flex cursor-pointer items-start gap-3 px-3 py-2 hover:bg-muted",
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							className: "mt-1 accent-primary",
							checked: marcado,
							disabled: inactivo && !marcado,
							onChange: () => setIds((s) => {
								const n = new Set(s);
								if (n.has(u.id)) n.delete(u.id);
								else n.add(u.id);
								return n;
							})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "min-w-0 flex-1 text-sm",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: u.nombre
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "text-muted-foreground",
									children: [" · ", u.cargo]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "block text-xs text-muted-foreground",
									children: inactivo ? "Usuario inactivo: no se puede asignar" : otra ? marcado ? `Pasa de ${otra.codigo} a ${area.codigo}` : `Hoy en ${otra.codigo} · ${otra.nombre}` : u.areaId === area.id ? marcado ? "Ya pertenece a esta área" : "Se quita de esta área y queda sin área" : "Sin área"
								})
							]
						}),
						area.responsableId === u.id && /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: "Responsable"
						})
					]
				}) }, u.id);
			}), lista.length === 0 && /* @__PURE__ */ jsxs("li", {
				className: "px-3 py-6 text-center text-sm text-muted-foreground",
				children: [
					"Ningún usuario coincide con «",
					texto,
					"»."
				]
			})]
		})]
	});
}
/** Selector de área superior con sangría; excluye al área y su subárbol (no hay ciclos). */
function OpcionesPadre({ areas, excluir }) {
	const fuera = excluir ? /* @__PURE__ */ new Set([excluir, ...descendientes(areas, excluir)]) : /* @__PURE__ */ new Set();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("option", {
		value: "",
		children: "Ninguna (área raíz)"
	}), enOrden(areas).filter((f) => !fuera.has(f.area.id)).map((f) => /* @__PURE__ */ jsxs("option", {
		value: f.area.id,
		disabled: f.area.estado === "INACTIVA",
		children: [
			sangria(f.nivel),
			f.area.codigo,
			" · ",
			f.area.nombre,
			f.area.estado === "INACTIVA" ? " (inactiva)" : ""
		]
	}, f.area.id))] });
}
function AreaModal({ inicial, nueva, areas, usuarios, onCerrar, onGuardar }) {
	const [a, setA] = useState(inicial);
	const [intentado, setIntentado] = useState(false);
	const set = (k, v) => setA((x) => ({
		...x,
		[k]: v
	}));
	const error = validarArea(areas, a, usuarios);
	const activos = usuarios.filter((u) => u.estado === "Activo" || u.id === inicial.responsableId);
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "xl",
		titulo: nueva ? a.padreId ? "Nueva subárea" : "Nueva área" : `Editar ${inicial.codigo}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			onClick: () => {
				setIntentado(true);
				if (!error) onGuardar(a);
			},
			children: nueva ? "Crear área" : "Guardar área"
		})] }),
		children: [intentado && error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: error
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sigla",
				obligatorio: true,
				ayuda: "Única en toda la estructura. Por ejemplo: DDP.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} uppercase`,
					value: a.codigo,
					maxLength: 20,
					onChange: (e) => set("codigo", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: a.nombre,
					onChange: (e) => set("nombre", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: a.tipo,
					onChange: (e) => set("tipo", e.target.value),
					children: Object.keys(NOMBRE_TIPO_AREA).map((t) => /* @__PURE__ */ jsx("option", {
						value: t,
						children: NOMBRE_TIPO_AREA[t]
					}, t))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área superior",
				ayuda: "Vacío: el área es una raíz.",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: a.padreId ?? "",
					onChange: (e) => set("padreId", e.target.value || null),
					children: /* @__PURE__ */ jsx(OpcionesPadre, {
						areas,
						excluir: nueva ? void 0 : a.id
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Responsable",
				ayuda: "Solo usuarios activos.",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: a.responsableId,
					onChange: (e) => set("responsableId", e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Sin responsable"
					}), activos.map((u) => /* @__PURE__ */ jsxs("option", {
						value: u.id,
						children: [
							u.nombre,
							" · ",
							u.cargo,
							u.estado !== "Activo" ? " (inactivo)" : ""
						]
					}, u.id))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código documental",
				ayuda: `Código del órgano en la numeración del MTC (por ejemplo 19.03). Vacío: se usa la sigla. Resultado: ${codigoDocumental([...areas.filter((x) => x.id !== a.id), a], a.id) || "sin definir"}`,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: a.codigoOrgano,
					onChange: (e) => set("codigoOrgano", e.target.value.trim())
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Emite documentos",
				children: /* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 pt-2 text-sm",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						className: "accent-primary",
						checked: a.emiteDocumentos,
						onChange: (e) => set("emiteDocumentos", e.target.checked)
					}), "El área numera y firma documentos de la gestión predial"]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Vigente desde",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: a.vigenteDesde,
					onChange: (e) => set("vigenteDesde", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observación",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 2,
					className: `${controlClase} h-auto py-2`,
					value: a.observacion,
					onChange: (e) => set("observacion", e.target.value)
				})
			})
		] })]
	});
}
function MoverModal({ area, areas, usuarios, onCerrar, onMover }) {
	const [padreId, setPadreId] = useState(area.padreId ?? "");
	const [motivo, setMotivo] = useState("");
	const total = descendientes(areas, area.id).size;
	const error = (padreId || null) === area.padreId ? "Elija un área superior distinta de la actual." : validarArea(areas, {
		...area,
		padreId: padreId || null
	}, usuarios);
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "md",
		titulo: `Mover ${area.codigo}`,
		descripcion: total ? `Se mueve con sus ${total} subárea${total === 1 ? "" : "s"}. Ahora: ${textoRuta(areas, area.id)}.` : `Ahora: ${textoRuta(areas, area.id)}.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			disabled: Boolean(error) || motivo.trim().length < 5,
			onClick: () => onMover(padreId || null, motivo.trim()),
			children: [/* @__PURE__ */ jsx(MoveRight, {}), " Mover área"]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, {
			columnas: 1,
			children: [/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nueva área superior",
				error: error ?? void 0,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: padreId,
					onChange: (e) => setPadreId(e.target.value),
					children: /* @__PURE__ */ jsx(OpcionesPadre, {
						areas,
						excluir: area.id
					})
				})
			}), /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Motivo",
				obligatorio: true,
				ayuda: "Mínimo cinco caracteres. Queda en el histórico.",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 3,
					className: `${controlClase} h-auto py-2`,
					value: motivo,
					onChange: (e) => setMotivo(e.target.value),
					placeholder: "Por ejemplo: reorganización aprobada por resolución ministerial"
				})
			})]
		})
	});
}
function EstadoModal({ area, bloqueo, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	const inactivar = area.estado === "ACTIVA";
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `${inactivar ? "Inactivar" : "Activar"} ${area.codigo}`,
		descripcion: inactivar ? "El área deja de ofrecerse para nuevos usuarios y documentos. Los documentos ya codificados conservan su órgano." : "El área vuelve a estar disponible.",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: inactivar ? "destructive" : "default",
			disabled: Boolean(bloqueo) || motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: [
				/* @__PURE__ */ jsx(Power, {}),
				" ",
				inactivar ? "Inactivar área" : "Activar área"
			]
		})] }),
		children: bloqueo ? /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: bloqueo
		}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-estado-area",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-estado-area",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		] })
	});
}
//#endregion
export { AreasPage as component };
