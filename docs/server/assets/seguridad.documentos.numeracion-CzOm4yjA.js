import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { At as useTiposDocumento, Dt as useContadores, Mt as validarRegla, Ot as useDocumentos, St as nombrePieza, _t as guardarReglas, dt as avisosRegla, ft as claveLegible, gt as formatearNumero, jt as useUsuarioSesion, kt as useReglas, lt as ajustarContador, pt as contadoresVivos, qt as useAreas, st as NOMBRE_DIMENSION, yt as idDocumento } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, m as MotivoModal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, Hash, History, Pencil, Plus, Power, SlidersHorizontal, X } from "lucide-react";
//#region src/routes/seguridad.documentos.numeracion.tsx?tsr-split=component
var ETIQUETAS = {
	nombre: "Nombre",
	tipoId: "Tipo",
	subtipoId: "Subtipo",
	prefijo: "Prefijo",
	piezas: "Piezas",
	separador: "Separador",
	digitos: "Dígitos",
	reiniciaPor: "Reinicia por",
	vigenteDesde: "Vigente desde",
	estado: "Estado"
};
var DIMENSIONES = Object.keys(NOMBRE_DIMENSION);
/** Piezas que se pueden añadir, con su configuración inicial. */
var PIEZAS_DISPONIBLES = [
	{ tipo: "correlativo" },
	{
		tipo: "anio",
		formato: "AAAA"
	},
	{ tipo: "siglaTipo" },
	{ tipo: "siglaSubtipo" },
	{
		tipo: "areaEmisora",
		formato: "sigla"
	},
	{
		tipo: "areaDestino",
		formato: "sigla"
	},
	{
		tipo: "usuario",
		formato: "iniciales"
	},
	{ tipo: "proyecto" },
	{
		tipo: "texto",
		valor: "MTC"
	}
];
var ETIQUETA_FORMATO_AREA = {
	sigla: "Sigla (DDP)",
	codigoOrgano: "Código de órgano (19.03)",
	documental: "Entidad y código (MTC/19.03)"
};
/** Contexto de la vista previa: el usuario de la sesión, su área y OGA como destino de ejemplo. */
function contextoEjemplo(yo, tipo, subtipoId) {
	return {
		usuario: yo ?? {
			id: "USR-000",
			nombre: "Usuario de ejemplo",
			areaId: "ddp"
		},
		areaEmisoraId: yo?.areaId ?? "ddp",
		areaDestinoId: "oga",
		subtipoId: subtipoId || tipo?.subtipos.find((s) => s.estado === "ACTIVO")?.id,
		projectId: "jauja",
		predios: [],
		fecha: /* @__PURE__ */ new Date()
	};
}
function NumeracionPage() {
	const rol = useRol();
	const edita = rol === "ADMIN";
	const reglas = useReglas();
	const tipos = useTiposDocumento();
	const documentos = useDocumentos();
	const contadores = useContadores();
	const areas = useAreas();
	const yo = useUsuarioSesion();
	const [editar, setEditar] = useState(null);
	const [estado, setEstado] = useState(null);
	const [ajustar, setAjustar] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const filas = useMemo(() => reglas.map((r) => {
		const tipo = tipos.find((t) => t.id === r.tipoId);
		const sub = tipo?.subtipos.find((s) => s.id === r.subtipoId);
		return {
			...r,
			tipoNombre: sub ? `${tipo?.nombre} · ${sub.nombre}` : tipo?.nombre ?? r.tipoId,
			ejemplo: formatearNumero(r, tipo, contextoEjemplo(yo, tipo, r.subtipoId), 1, areas),
			emitidos: documentos.filter((d) => d.reglaId === r.id).length
		};
	}), [
		reglas,
		tipos,
		documentos,
		areas,
		yo
	]);
	const vivos = useMemo(() => contadoresVivos(contadores, documentos).map((c) => ({
		...c,
		legible: claveLegible(c.clave, tipos, areas)
	})).sort((a, b) => a.legible.localeCompare(b.legible)), [
		contadores,
		documentos,
		tipos,
		areas
	]);
	const nueva = () => ({
		id: idDocumento("regla"),
		nombre: "",
		tipoId: tipos[0]?.id ?? "",
		prefijo: "",
		piezas: [
			{ tipo: "correlativo" },
			{
				tipo: "anio",
				formato: "AAAA"
			},
			{
				tipo: "areaEmisora",
				formato: "sigla"
			}
		],
		separador: "-",
		digitos: 4,
		reiniciaPor: ["anio", "areaEmisora"],
		vigenteDesde: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		estado: "ACTIVA"
	});
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Numeración de documentos",
			icono: Hash,
			descripcion: "Cada regla arma el número con piezas (correlativo, año, áreas, usuario, subtipo) y define por qué datos reinicia el contador. Cambiar una regla no renumera lo ya emitido.",
			migas: [
				{ texto: "Seguridad y configuración" },
				{ texto: "Documentos" },
				{ texto: "Numeración" }
			],
			acciones: edita && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => setEditar({
					regla: nueva(),
					nueva: true
				}),
				children: [/* @__PURE__ */ jsx(Plus, {}), " Nueva regla"]
			}),
			columnas: [
				{
					clave: "nombre",
					titulo: "Regla"
				},
				{
					clave: "tipoNombre",
					titulo: "Aplica a"
				},
				{
					clave: "ejemplo",
					titulo: "Formato (ejemplo)",
					render: (r) => /* @__PURE__ */ jsx("span", {
						className: "font-mono text-xs",
						children: r.ejemplo
					})
				},
				{
					clave: "reiniciaPor",
					titulo: "Reinicia por",
					render: (r) => r.reiniciaPor.length ? r.reiniciaPor.map((d) => NOMBRE_DIMENSION[d]).join(", ") : "Nunca"
				},
				{
					clave: "vigenteDesde",
					titulo: "Vigente desde",
					render: (r) => fecha(r.vigenteDesde)
				},
				{
					clave: "emitidos",
					titulo: "Emitidos",
					alinear: "derecha"
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: r.estado === "ACTIVA" ? "success" : "neutral",
						children: r.estado === "ACTIVA" ? "Activa" : "Inactiva"
					})
				}
			],
			filas,
			claveFila: (r) => r.id,
			filtros: [{
				clave: "tipoId",
				etiqueta: "Tipo",
				opciones: tipos.map((t) => ({
					valor: t.id,
					texto: t.nombre
				}))
			}, {
				clave: "estado",
				etiqueta: "Estado",
				opciones: [{
					valor: "ACTIVA",
					texto: "Activas"
				}, {
					valor: "INACTIVA",
					texto: "Inactivas"
				}]
			}],
			accionesFila: edita ? [{
				nombre: "Editar regla",
				icono: Pencil,
				onClick: (r) => setEditar({
					regla: r,
					nueva: false
				})
			}, {
				nombre: "Inactivar o activar",
				icono: Power,
				onClick: (r) => setEstado(r)
			}] : [],
			exportar: (f) => void exportarExcel("reglas-numeracion", [
				{
					titulo: "Regla",
					valor: (r) => r.nombre
				},
				{
					titulo: "Aplica a",
					valor: (r) => r.tipoNombre
				},
				{
					titulo: "Formato",
					valor: (r) => r.ejemplo
				},
				{
					titulo: "Reinicia por",
					valor: (r) => r.reiniciaPor.map((d) => NOMBRE_DIMENSION[d]).join(", ")
				},
				{
					titulo: "Vigente desde",
					valor: (r) => fecha(r.vigenteDesde)
				},
				{
					titulo: "Estado",
					valor: (r) => r.estado
				}
			], f, {
				titulo: "Reglas de numeración",
				lineas: [`${f.length} reglas`]
			}),
			vacio: "No hay reglas con esos filtros."
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "contadores",
			className: "mt-6",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsxs(TabsTrigger, {
						value: "contadores",
						children: [
							"Contadores (",
							vivos.length,
							")"
						]
					}), /* @__PURE__ */ jsxs(TabsTrigger, {
						value: "historico",
						children: [/* @__PURE__ */ jsx(History, {
							size: 16,
							className: "mr-1",
							"aria-hidden": true
						}), " Histórico de reglas"]
					})]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "contadores",
					children: [
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
								": puede consultar reglas y contadores. Los edita el perfil Administrador del sistema."
							]
						}),
						/* @__PURE__ */ jsx(Subtitulo, { children: "Contadores en uso" }),
						/* @__PURE__ */ jsx("p", {
							className: "mb-2 text-sm text-muted-foreground",
							children: "Un contador por cada combinación de tipo y datos por los que reinicia. Ajustar sirve para arrancar donde va la numeración en papel; nunca baja de lo ya emitido."
						}),
						/* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "legible",
									titulo: "Contador",
									render: (c) => c.legible
								},
								{
									clave: "ultimo",
									titulo: "Último número",
									alinear: "derecha",
									render: (c) => c.ultimo
								},
								{
									clave: "documentos",
									titulo: "Documentos",
									alinear: "derecha",
									render: (c) => c.documentos
								},
								...edita ? [{
									clave: "acciones",
									titulo: "Acciones",
									render: (c) => /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setAjustar({
											clave: c.clave,
											ultimo: c.ultimo
										}),
										children: [/* @__PURE__ */ jsx(SlidersHorizontal, {}), " Ajustar"]
									})
								}] : []
							],
							filas: vivos,
							claveFila: (c) => c.clave,
							vacio: "Aún no se ha numerado ningún documento. Los contadores aparecen con el primer número reservado."
						})
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Historico, {
						registro: "documentos-reglas",
						etiquetas: ETIQUETAS,
						nombreArchivo: "historico-reglas-numeracion"
					})
				})
			]
		}),
		editar && /* @__PURE__ */ jsx(ReglaModal, {
			inicial: editar.regla,
			nueva: editar.nueva,
			reglas,
			tipos,
			areas,
			yo,
			onCerrar: () => setEditar(null),
			onGuardar: (r) => {
				guardarReglas(editar.nueva ? [...reglas, r] : reglas.map((x) => x.id === r.id ? r : x), editar.nueva ? "Creó regla de numeración" : "Modificó regla de numeración", r.nombre);
				setEditar(null);
				setMensaje(`Regla «${r.nombre}» ${editar.nueva ? "creada" : "guardada"}.`);
			}
		}),
		estado && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: `${estado.estado === "ACTIVA" ? "Inactivar" : "Activar"} «${estado.nombre}»`,
			descripcion: estado.estado === "ACTIVA" ? "Sin regla activa, el tipo no se puede numerar al generar (sí como borrador o con número externo)." : "La regla vuelve a numerar desde su fecha de vigencia.",
			accion: estado.estado === "ACTIVA" ? "Inactivar regla" : "Activar regla",
			destructiva: estado.estado === "ACTIVA",
			bloqueo: estado.estado === "INACTIVA" ? validarRegla(reglas, {
				...estado,
				estado: "ACTIVA"
			}) : null,
			onCerrar: () => setEstado(null),
			onConfirmar: (motivo) => {
				const nuevoEstado = estado.estado === "ACTIVA" ? "INACTIVA" : "ACTIVA";
				guardarReglas(reglas.map((x) => x.id === estado.id ? {
					...x,
					estado: nuevoEstado
				} : x), nuevoEstado === "ACTIVA" ? "Activó regla" : "Inactivó regla", estado.nombre, motivo);
				setEstado(null);
			}
		}),
		ajustar && /* @__PURE__ */ jsx(AjustarModal, {
			clave: ajustar.clave,
			ultimo: ajustar.ultimo,
			legible: claveLegible(ajustar.clave, tipos, areas),
			onCerrar: () => setAjustar(null),
			onListo: (texto) => {
				setAjustar(null);
				setMensaje(texto);
			}
		})
	] });
}
function AjustarModal({ clave, ultimo, legible, onCerrar, onListo }) {
	const [valor, setValor] = useState(String(ultimo));
	const [error, setError] = useState(null);
	return /* @__PURE__ */ jsxs(MotivoModal, {
		titulo: "Ajustar contador",
		descripcion: `${legible}. El siguiente documento recibirá el número que ingrese más uno.`,
		accion: "Ajustar contador",
		bloqueo: error,
		onCerrar,
		onConfirmar: (motivo) => {
			const e = ajustarContador(clave, Number(valor), motivo);
			if (e) setError(e);
			else onListo(`Contador ajustado: el siguiente número será el ${Number(valor) + 1}.`);
		},
		children: [/* @__PURE__ */ jsx("label", {
			htmlFor: "ajuste-contador",
			className: "mb-1 block text-sm font-medium",
			children: "Último número usado"
		}), /* @__PURE__ */ jsx("input", {
			id: "ajuste-contador",
			type: "number",
			min: 0,
			className: `${controlClase} mb-3`,
			value: valor,
			onChange: (e) => {
				setValor(e.target.value);
				setError(null);
			}
		})]
	});
}
function ReglaModal({ inicial, nueva, reglas, tipos, areas, yo, onCerrar, onGuardar }) {
	const [r, setR] = useState(inicial);
	const [intentado, setIntentado] = useState(false);
	const set = (k, v) => setR((x) => ({
		...x,
		[k]: v
	}));
	const tipo = tipos.find((t) => t.id === r.tipoId);
	const error = validarRegla(reglas, r);
	const avisos = avisosRegla(r, tipo);
	const ctx = contextoEjemplo(yo, tipo, r.subtipoId);
	const ejemplo = formatearNumero(r, tipo, ctx, 13, areas);
	const areaYo = areas.find((a) => a.id === ctx.areaEmisoraId);
	const moverPieza = (i, d) => setR((x) => {
		const p = [...x.piezas];
		const j = i + d;
		if (j < 0 || j >= p.length) return x;
		[p[i], p[j]] = [p[j], p[i]];
		return {
			...x,
			piezas: p
		};
	});
	const cambiarPieza = (i, p) => setR((x) => ({
		...x,
		piezas: x.piezas.map((q, k) => k === i ? p : q)
	}));
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "xl",
		titulo: nueva ? "Nueva regla de numeración" : `Regla: ${inicial.nombre}`,
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
					...r,
					nombre: r.nombre.trim(),
					prefijo: r.prefijo.trim()
				});
			},
			children: nueva ? "Crear regla" : "Guardar regla"
		})] }),
		children: [
			intentado && error && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: error
			}),
			/* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Nombre",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: r.nombre,
						onChange: (e) => set("nombre", e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Tipo",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						className: controlClase,
						value: r.tipoId,
						onChange: (e) => setR((x) => ({
							...x,
							tipoId: e.target.value,
							subtipoId: void 0
						})),
						children: tipos.map((t) => /* @__PURE__ */ jsx("option", {
							value: t.id,
							children: t.nombre
						}, t.id))
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Subtipo",
					ayuda: "Vacío: la regla numera todo el tipo. Una regla de subtipo manda sobre la del tipo.",
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						value: r.subtipoId ?? "",
						onChange: (e) => set("subtipoId", e.target.value || void 0),
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Todos los subtipos"
						}), tipo?.subtipos.map((s) => /* @__PURE__ */ jsx("option", {
							value: s.id,
							children: s.nombre
						}, s.id))]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Vigente desde",
					obligatorio: true,
					ayuda: "Lo emitido antes conserva su número.",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: r.vigenteDesde,
						onChange: (e) => set("vigenteDesde", e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Prefijo",
					ayuda: "Se imprime antes del número. Por ejemplo: OFICIO N.°",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: r.prefijo,
						onChange: (e) => set("prefijo", e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Separador",
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						value: r.separador,
						onChange: (e) => set("separador", e.target.value),
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "-",
								children: "Guion (0012-2026)"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "/",
								children: "Barra (0012/2026)"
							}),
							/* @__PURE__ */ jsx("option", {
								value: " ",
								children: "Espacio (0012 2026)"
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Dígitos del correlativo",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "number",
						min: 1,
						max: 8,
						className: controlClase,
						value: r.digitos,
						onChange: (e) => set("digitos", Number(e.target.value) || 1)
					})
				})
			] }),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Piezas, en el orden en que se imprimen" }),
			/* @__PURE__ */ jsx("ol", {
				className: "space-y-2",
				children: r.piezas.map((p, i) => /* @__PURE__ */ jsxs("li", {
					className: "flex flex-wrap items-center gap-2 rounded-md border border-border px-3 py-2",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "w-6 text-sm font-semibold text-muted-foreground",
							children: [i + 1, "."]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "min-w-40 flex-1 text-sm",
							children: nombrePieza(p)
						}),
						(p.tipo === "areaEmisora" || p.tipo === "areaDestino") && /* @__PURE__ */ jsx("select", {
							"aria-label": `Formato de ${nombrePieza(p)}`,
							className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted w-auto`,
							value: p.formato,
							onChange: (e) => cambiarPieza(i, {
								...p,
								formato: e.target.value
							}),
							children: Object.keys(ETIQUETA_FORMATO_AREA).map((f) => /* @__PURE__ */ jsx("option", {
								value: f,
								children: ETIQUETA_FORMATO_AREA[f]
							}, f))
						}),
						p.tipo === "anio" && /* @__PURE__ */ jsxs("select", {
							"aria-label": "Formato del año",
							className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted w-auto`,
							value: p.formato,
							onChange: (e) => cambiarPieza(i, {
								...p,
								formato: e.target.value
							}),
							children: [/* @__PURE__ */ jsx("option", {
								value: "AAAA",
								children: "Cuatro cifras (2026)"
							}), /* @__PURE__ */ jsx("option", {
								value: "AA",
								children: "Dos cifras (26)"
							})]
						}),
						p.tipo === "usuario" && /* @__PURE__ */ jsxs("select", {
							"aria-label": "Formato del usuario",
							className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted w-auto`,
							value: p.formato,
							onChange: (e) => cambiarPieza(i, {
								...p,
								formato: e.target.value
							}),
							children: [/* @__PURE__ */ jsx("option", {
								value: "iniciales",
								children: "Iniciales"
							}), /* @__PURE__ */ jsx("option", {
								value: "id",
								children: "Código de usuario"
							})]
						}),
						p.tipo === "texto" && /* @__PURE__ */ jsx("input", {
							"aria-label": "Texto fijo",
							className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted w-32`,
							value: p.valor,
							onChange: (e) => cambiarPieza(i, {
								...p,
								valor: e.target.value
							})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex gap-1",
							children: [
								/* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									title: "Subir",
									"aria-label": `Subir ${nombrePieza(p)}`,
									disabled: i === 0,
									onClick: () => moverPieza(i, -1),
									children: /* @__PURE__ */ jsx(ArrowUp, {})
								}),
								/* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									title: "Bajar",
									"aria-label": `Bajar ${nombrePieza(p)}`,
									disabled: i === r.piezas.length - 1,
									onClick: () => moverPieza(i, 1),
									children: /* @__PURE__ */ jsx(ArrowDown, {})
								}),
								/* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									title: "Quitar",
									"aria-label": `Quitar ${nombrePieza(p)}`,
									onClick: () => setR((x) => ({
										...x,
										piezas: x.piezas.filter((_, k) => k !== i)
									})),
									children: /* @__PURE__ */ jsx(X, {})
								})
							]
						})
					]
				}, i))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: PIEZAS_DISPONIBLES.filter((p) => p.tipo !== "correlativo" || !r.piezas.some((q) => q.tipo === "correlativo")).map((p) => /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => setR((x) => ({
						...x,
						piezas: [...x.piezas, p]
					})),
					children: [
						/* @__PURE__ */ jsx(Plus, {}),
						" ",
						nombrePieza(p).replace(/ \(.*\)$/, "").replace(/ «.*»$/, "")
					]
				}, p.tipo))
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "El contador reinicia por" }),
			/* @__PURE__ */ jsxs("fieldset", {
				className: "flex flex-wrap gap-x-6 gap-y-2",
				children: [/* @__PURE__ */ jsx("legend", {
					className: "sr-only",
					children: "Dimensiones del contador"
				}), DIMENSIONES.map((d) => /* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						className: "size-4 accent-primary",
						checked: r.reiniciaPor.includes(d),
						onChange: (e) => set("reiniciaPor", e.target.checked ? [...r.reiniciaPor, d] : r.reiniciaPor.filter((x) => x !== d))
					}), NOMBRE_DIMENSION[d]]
				}, d))]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Sin marcar ninguno, la regla lleva un solo contador que nunca reinicia."
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Vista previa" }),
			/* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Con sus datos: ",
					ctx.usuario.nombre,
					" · ",
					areaYo?.codigo ?? "sin área",
					" · destino OGA · proyecto Jauja · ",
					ctx.fecha.getFullYear()
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 rounded-md border border-border bg-muted px-3 py-2 font-mono text-base font-semibold",
				children: ejemplo
			}),
			avisos.map((a) => /* @__PURE__ */ jsx(Aviso, {
				tipo: "aviso",
				children: a
			}, a))
		]
	});
}
//#endregion
export { NumeracionPage as component };
