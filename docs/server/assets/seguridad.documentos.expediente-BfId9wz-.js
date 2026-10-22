import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { N as MENUS } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { At as useTiposDocumento, B as guardarCatalogo, D as NOMBRE_CLASE, H as incorporarAlCatalogo, I as cobertura, O as NOMBRE_CONDICION, V as importarLista, X as parsearCsv, Z as proponerPaso, at as useListaDdp, it as useItems, q as libresAgrupados, rt as useCatalogo } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, S as exportarPdf, m as MotivoModal, p as leerPlantillas, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { FileDown, FileSpreadsheet, FolderInput, History, Pencil, Plus, Power, Upload } from "lucide-react";
//#region src/routes/seguridad.documentos.expediente.tsx?tsr-split=component
/** Pasos del menú del predio (todas las rutas), en orden, con su número y nombre. */
var PASOS = (() => {
	const vistos = /* @__PURE__ */ new Map();
	for (const v of Object.values(MENUS)) {
		v.etapas.forEach((e, i) => e.pasos.forEach((p, j) => {
			if (!vistos.has(p.key)) vistos.set(p.key, `${i + 1}.${j + 1} ${p.nombre}`);
		}));
		v.transversales.forEach((t) => !vistos.has(t.key) && vistos.set(t.key, t.nombre));
	}
	return vistos;
})();
var nombrePaso = (k) => PASOS.get(k) ?? k;
var ETIQUETAS = {
	nombre: "Documento",
	paso: "Paso",
	clase: "Clase",
	obligatorio: "Obligatorio",
	emisor: "Emisor",
	estado: "Estado"
};
/**
* Catálogo de documentos del expediente predial (docs/PLAN-EXPEDIENTE-DOCUMENTOS.md §7.5): qué debe tener
* cada paso del predio, la cobertura de la lista de la DDP (ninguna fila sin paso), los documentos que
* los predios registraron fuera del catálogo y la importación de una lista nueva.
*/
function CatalogoExpedientePage() {
	const catalogo = useCatalogo();
	const items = useItems();
	const lista = useListaDdp();
	const tipos = useTiposDocumento();
	const rol = useRol();
	const edita = rol === "ADMIN";
	const [paso, setPaso] = useState("");
	const [texto, setTexto] = useState("");
	const [editar, setEditar] = useState(null);
	const [inactivar, setInactivar] = useState(null);
	const [incorporar, setIncorporar] = useState(null);
	const [importar, setImportar] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const cob = useMemo(() => cobertura(catalogo, lista), [catalogo, lista]);
	const sueltas = cob.filter((f) => f.tipo === "documento" && !f.items.length);
	const libres = useMemo(() => libresAgrupados(items), [items]);
	const q = texto.trim().toLowerCase();
	const filas = catalogo.filter((c) => (!paso || c.paso === paso) && (!q || c.nombre.toLowerCase().includes(q))).sort((a, b) => a.orden - b.orden);
	const nombreTipo = (c) => c.tipos?.map((t) => {
		const tipo = tipos.find((x) => x.id === t.tipoId);
		const sub = tipo?.subtipos.find((s) => s.id === t.subtipoId);
		return [tipo?.nombre ?? t.tipoId, sub?.nombre].filter(Boolean).join(" → ");
	}).join(" o ") ?? (c.producto ? `Producto (${c.producto})` : c.emisor ?? "");
	const columnasExport = [
		{
			titulo: "Paso",
			valor: (c) => nombrePaso(c.paso)
		},
		{
			titulo: "Documento",
			valor: (c) => c.nombre
		},
		{
			titulo: "Clase",
			valor: (c) => NOMBRE_CLASE[c.clase]
		},
		{
			titulo: "Obligatorio",
			valor: (c) => c.obligatorio ? "Sí" : "No"
		},
		{
			titulo: "Tipo o emisor",
			valor: (c) => nombreTipo(c)
		},
		{
			titulo: "Fila de la lista",
			valor: (c) => c.csv.map((f) => f.texto).join(" / ") || (c.propuesto ? "Propuesto" : "")
		},
		{
			titulo: "Estado",
			valor: (c) => c.estado
		}
	];
	const cabecera = {
		titulo: "Documentos del expediente predial",
		lineas: [`${catalogo.length} ítems · ${sueltas.length} filas de la lista sin paso`]
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: FolderInput,
			titulo: "Documentos del expediente",
			descripcion: "Qué documentos debe tener cada paso del predio. Sale de la lista de la DDP: ninguna fila queda sin paso y lo que se registra fuera del catálogo aparece aquí para incorporarlo.",
			migas: [
				{ texto: "Seguridad y configuración" },
				{ texto: "Documentos" },
				{ texto: "Documentos del expediente" }
			],
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				edita && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => setEditar({
						nuevo: true,
						c: {
							id: `cat-${Date.now().toString(36)}`,
							paso: paso || "cbc",
							modulo: 0,
							nombre: "",
							clase: "R",
							obligatorio: true,
							csv: [],
							propuesto: true,
							orden: Math.max(0, ...catalogo.map((c) => c.orden)) + 1,
							estado: "ACTIVO"
						}
					}),
					children: [/* @__PURE__ */ jsx(Plus, {}), " Nuevo documento"]
				}), /* @__PURE__ */ jsxs("label", {
					className: "inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium hover:bg-muted focus-within:ring-2 focus-within:ring-primary",
					children: [
						/* @__PURE__ */ jsx(Upload, {
							size: 16,
							"aria-hidden": true
						}),
						" Importar lista CSV",
						/* @__PURE__ */ jsx("input", {
							type: "file",
							accept: ".csv,text/csv",
							className: "sr-only",
							onChange: async (e) => {
								const f = e.target.files?.[0];
								e.target.value = "";
								if (f) setImportar(parsearCsv(await f.text()));
							}
						})
					]
				})] }),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void exportarExcel("documentos-expediente", columnasExport, filas, cabecera),
					children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Excel"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void exportarPdf("documentos-expediente", columnasExport, filas, cabecera),
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
		sueltas.length > 0 && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "error",
			children: [sueltas.length, " fila(s) de la lista de la DDP no tienen paso. Revíselas en Cobertura de la lista."]
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "catalogo",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3 flex-wrap",
					children: [
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "catalogo",
							children: [
								"Catálogo (",
								catalogo.length,
								")"
							]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "cobertura",
							children: [
								"Cobertura de la lista (",
								cob.filter((f) => f.tipo === "documento").length - sueltas.length,
								"/",
								cob.filter((f) => f.tipo === "documento").length,
								")"
							]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "libres",
							children: [
								"Fuera del catálogo (",
								libres.length,
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
					value: "catalogo",
					children: /* @__PURE__ */ jsxs(Section, { children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-3 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Paso del predio",
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: controlClase,
								value: paso,
								onChange: (e) => setPaso(e.target.value),
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Todos los pasos"
								}), [...PASOS].map(([k, n]) => /* @__PURE__ */ jsx("option", {
									value: k,
									children: n
								}, k))]
							})
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Buscar documento",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: controlClase,
								value: texto,
								onChange: (e) => setTexto(e.target.value)
							})
						})]
					}), /* @__PURE__ */ jsx(Tabla, {
						filas,
						claveFila: (c) => c.id,
						vacio: "No hay documentos con ese filtro.",
						columnas: [
							{
								clave: "paso",
								titulo: "Paso",
								render: (c) => /* @__PURE__ */ jsx("span", {
									className: "text-xs",
									children: nombrePaso(c.paso)
								})
							},
							{
								clave: "nombre",
								titulo: "Documento",
								render: (c) => /* @__PURE__ */ jsxs("span", {
									className: c.estado === "INACTIVO" ? "text-muted-foreground line-through" : "",
									children: [c.nombre, /* @__PURE__ */ jsxs("span", {
										className: "mt-0.5 flex flex-wrap gap-1",
										children: [c.propuesto && /* @__PURE__ */ jsx(StatusBadge, {
											tono: "warning",
											children: "Propuesto"
										}), c.aplicaSi && /* @__PURE__ */ jsx(StatusBadge, { children: NOMBRE_CONDICION[c.aplicaSi] })]
									})]
								})
							},
							{
								clave: "clase",
								titulo: "Clase",
								render: (c) => NOMBRE_CLASE[c.clase]
							},
							{
								clave: "oblig",
								titulo: "Obligatorio",
								render: (c) => c.obligatorio ? "Sí" : "No"
							},
							{
								clave: "tipo",
								titulo: "Tipo o emisor",
								render: (c) => /* @__PURE__ */ jsx("span", {
									className: "text-xs",
									children: nombreTipo(c)
								})
							},
							{
								clave: "req",
								titulo: "Requisitos",
								render: (c) => /* @__PURE__ */ jsx("span", {
									className: "text-xs",
									children: (c.requisitos ?? []).map((r) => catalogo.find((x) => x.id === r)?.nombre ?? r).join("; ")
								})
							},
							{
								clave: "fila",
								titulo: "Lista DDP",
								render: (c) => /* @__PURE__ */ jsx("span", {
									className: "text-xs",
									children: c.csv.length ? `${c.csv.length} fila(s)` : c.clase === "ref" ? "Referencia" : "Propuesto"
								})
							},
							{
								clave: "acciones",
								titulo: "Acciones",
								render: (c) => edita && /* @__PURE__ */ jsxs("span", {
									className: "flex gap-1",
									children: [/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setEditar({
											nuevo: false,
											c
										}),
										children: [/* @__PURE__ */ jsx(Pencil, {}), " Editar"]
									}), /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setInactivar(c),
										children: [
											/* @__PURE__ */ jsx(Power, {}),
											" ",
											c.estado === "ACTIVO" ? "Inactivar" : "Activar"
										]
									})]
								})
							}
						]
					})] })
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "cobertura",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Cobertura de la lista de la DDP",
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-sm text-muted-foreground",
							children: "Cada fila de la lista y el documento del catálogo que la cubre. Las filas sin paso aparecen primero. Los encabezados de grupo y las filas vacías (por ejemplo, las del módulo 13) no son documentos."
						}), /* @__PURE__ */ jsx(Tabla, {
							filas: [...cob].sort((a, b) => Number(b.tipo === "documento" && !b.items.length) - Number(a.tipo === "documento" && !a.items.length)),
							claveFila: (f) => f.fila,
							claseFila: (f) => f.tipo === "documento" && !f.items.length ? "bg-destructive-soft" : void 0,
							columnas: [
								{
									clave: "fila",
									titulo: "Fila",
									render: (f) => f.fila + 1
								},
								{
									clave: "modulo",
									titulo: "Módulo",
									render: (f) => /* @__PURE__ */ jsx("span", {
										className: "text-xs",
										children: f.modulo
									})
								},
								{
									clave: "texto",
									titulo: "Documento en la lista",
									render: (f) => f.tipo === "vacia" ? /* @__PURE__ */ jsx("span", {
										className: "text-muted-foreground",
										children: "Fila vacía"
									}) : /* @__PURE__ */ jsxs("span", {
										className: "whitespace-pre-line",
										children: [f.texto, f.tipo === "grupo" && /* @__PURE__ */ jsx("span", {
											className: "text-muted-foreground",
											children: " (encabezado)"
										})]
									})
								},
								{
									clave: "items",
									titulo: "En el catálogo",
									render: (f) => f.tipo !== "documento" ? "" : f.items.length ? /* @__PURE__ */ jsx("span", {
										className: "text-xs",
										children: f.items.map((c) => `${c.nombre} · ${nombrePaso(c.paso)}`).join("; ")
									}) : /* @__PURE__ */ jsx(StatusBadge, {
										tono: "destructive",
										children: "Sin paso"
									})
								}
							]
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "libres",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Documentos registrados fuera del catálogo",
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-sm text-muted-foreground",
							children: "Lo que los predios registraron con «Otro documento». Si se repite, añádalo al catálogo: los registros ya hechos pasan a ese ítem."
						}), /* @__PURE__ */ jsx(Tabla, {
							filas: libres,
							claveFila: (g) => g.clave,
							vacio: "Ningún documento fuera del catálogo.",
							columnas: [
								{
									clave: "nombre",
									titulo: "Documento",
									render: (g) => g.nombre
								},
								{
									clave: "paso",
									titulo: "Paso",
									render: (g) => nombrePaso(g.paso)
								},
								{
									clave: "clase",
									titulo: "Origen",
									render: (g) => g.clase === "G" ? "Emitido por el MTC" : "Recibido"
								},
								{
									clave: "n",
									titulo: "Registros",
									render: (g) => g.items.length
								},
								{
									clave: "predios",
									titulo: "Predios",
									render: (g) => /* @__PURE__ */ jsx("span", {
										className: "text-xs",
										children: [...new Set(g.items.map((i) => i.predio))].join(", ")
									})
								},
								{
									clave: "acciones",
									titulo: "Acciones",
									render: (g) => edita && /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setIncorporar(g),
										children: [/* @__PURE__ */ jsx(Plus, {}), " Añadir al catálogo"]
									})
								}
							]
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico · Documentos del expediente",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: "expediente-catalogo",
							etiquetas: ETIQUETAS,
							nombreArchivo: "historico-documentos-expediente"
						})
					})
				})
			]
		}),
		editar && /* @__PURE__ */ jsx(EditorDocumento, {
			inicial: editar.c,
			nuevo: editar.nuevo,
			catalogo,
			onCerrar: () => setEditar(null),
			onGuardar: (c) => {
				guardarCatalogo(editar.nuevo ? [...catalogo, c] : catalogo.map((x) => x.id === c.id ? c : x), editar.nuevo ? "Creó documento" : "Modificó documento", `${c.nombre} · ${nombrePaso(c.paso)}`);
				setEditar(null);
				setMensaje(`Documento «${c.nombre}» guardado.`);
			}
		}),
		inactivar && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: `${inactivar.estado === "ACTIVO" ? "Inactivar" : "Activar"} documento`,
			descripcion: `${inactivar.nombre}. Los registros que ya tienen los predios se conservan.`,
			accion: inactivar.estado === "ACTIVO" ? "Inactivar" : "Activar",
			destructiva: inactivar.estado === "ACTIVO",
			onCerrar: () => setInactivar(null),
			onConfirmar: (motivo) => {
				const estado = inactivar.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO";
				guardarCatalogo(catalogo.map((x) => x.id === inactivar.id ? {
					...x,
					estado
				} : x), estado === "ACTIVO" ? "Activó documento" : "Inactivó documento", inactivar.nombre, motivo);
				setInactivar(null);
			}
		}),
		incorporar && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: "Añadir al catálogo",
			descripcion: `«${incorporar.nombre}» en ${nombrePaso(incorporar.paso)}. ${incorporar.items.length} registro(s) pasan a este ítem.`,
			accion: "Añadir",
			onCerrar: () => setIncorporar(null),
			onConfirmar: () => {
				incorporarAlCatalogo(incorporar, false);
				setIncorporar(null);
				setMensaje(`«${incorporar.nombre}» añadido al catálogo como propuesto.`);
			}
		}),
		importar && /* @__PURE__ */ jsx(ImportarLista, {
			filas: importar,
			catalogo,
			onCerrar: () => setImportar(null),
			onImportado: (n) => {
				setImportar(null);
				setMensaje(`Lista importada: ${n} documento(s) nuevo(s) en el catálogo.`);
			}
		})
	] });
}
var CLASES = [
	"G",
	"R",
	"C",
	"A",
	"ref"
];
var CONDICIONES = Object.keys(NOMBRE_CONDICION);
function EditorDocumento({ inicial, nuevo, catalogo, onCerrar, onGuardar }) {
	const tipos = useTiposDocumento();
	const plantillas = leerPlantillas();
	const [c, setC] = useState(inicial);
	const [error, setError] = useState("");
	const tipoTexto = (c.tipos ?? []).map((t) => `${t.tipoId}.${t.subtipoId ?? ""}`).join("|");
	const set = (k, v) => setC((x) => ({
		...x,
		[k]: v
	}));
	const opcionesTipo = tipos.flatMap((t) => t.subtipos.map((s) => ({
		v: `${t.id}.${s.id}`,
		n: `${t.nombre} → ${s.nombre}`
	})));
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "lg",
		titulo: nuevo ? "Nuevo documento del expediente" : `Editar · ${inicial.nombre}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			onClick: () => {
				if (!c.nombre.trim()) return setError("Indique el nombre del documento.");
				if (c.clase === "G" && !c.tipos?.length && !c.producto) return setError("Un documento que genera el sistema necesita tipo y subtipo.");
				if (c.clase === "C" && !c.respaldaA) return setError("Un cargo debe indicar a qué documento respalda.");
				if (c.clase === "ref" && !c.referenciaA) return setError("Una referencia debe indicar el documento original.");
				onGuardar({
					...c,
					nombre: c.nombre.trim()
				});
			},
			children: "Guardar"
		})] }),
		children: [error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: error
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Documento",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: c.nombre,
					onChange: (e) => set("nombre", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Paso del predio",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: c.paso,
					onChange: (e) => set("paso", e.target.value),
					children: [...PASOS].map(([k, n]) => /* @__PURE__ */ jsx("option", {
						value: k,
						children: n
					}, k))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Clase",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: c.clase,
					onChange: (e) => set("clase", e.target.value),
					children: CLASES.map((k) => /* @__PURE__ */ jsx("option", {
						value: k,
						children: NOMBRE_CLASE[k]
					}, k))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Obligatorio",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: c.obligatorio ? "si" : "no",
					onChange: (e) => set("obligatorio", e.target.value === "si"),
					children: [/* @__PURE__ */ jsx("option", {
						value: "si",
						children: "Sí"
					}), /* @__PURE__ */ jsx("option", {
						value: "no",
						children: "No"
					})]
				})
			}),
			c.clase === "G" && /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo y subtipo",
				ayuda: "Con qué regla de M8 se numera.",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: tipoTexto.split("|")[0] ?? "",
					onChange: (e) => {
						const [tipoId, subtipoId] = e.target.value.split(".");
						set("tipos", e.target.value ? [{
							tipoId,
							subtipoId
						}] : void 0);
					},
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Sin número (producto de otro módulo)"
					}), opcionesTipo.map((o) => /* @__PURE__ */ jsx("option", {
						value: o.v,
						children: o.n
					}, o.v))]
				})
			}),
			c.clase === "G" && /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Plantilla Word (M24)",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: c.plantillaId ?? "",
					onChange: (e) => set("plantillaId", e.target.value || void 0),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "La del tipo y subtipo, o la plantilla base"
					}), plantillas.map((p) => /* @__PURE__ */ jsxs("option", {
						value: p.id,
						children: [
							p.code,
							" · ",
							p.denomination
						]
					}, p.id))]
				})
			}),
			(c.clase === "R" || c.clase === "G") && /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Emisor",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: c.emisor ?? "",
					onChange: (e) => set("emisor", e.target.value || void 0)
				})
			}),
			(c.clase === "C" || c.clase === "ref") && /* @__PURE__ */ jsx(FormField, {
				etiqueta: c.clase === "C" ? "Respalda a" : "Documento original",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: (c.clase === "C" ? c.respaldaA : c.referenciaA) ?? "",
					onChange: (e) => set(c.clase === "C" ? "respaldaA" : "referenciaA", e.target.value || void 0),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Elija"
					}), catalogo.filter((x) => x.id !== c.id && x.clase !== "ref").map((x) => /* @__PURE__ */ jsxs("option", {
						value: x.id,
						children: [
							x.nombre,
							" · ",
							nombrePaso(x.paso)
						]
					}, x.id))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Aplica si",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: c.aplicaSi ?? "",
					onChange: (e) => set("aplicaSi", e.target.value || void 0),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Siempre"
					}), CONDICIONES.map((k) => /* @__PURE__ */ jsx("option", {
						value: k,
						children: NOMBRE_CONDICION[k]
					}, k))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Requisitos",
				ancho: "doble",
				ayuda: "Deben estar completos para darle código. Mantenga Ctrl para elegir varios.",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					multiple: true,
					className: `${controlClase} h-28`,
					value: c.requisitos ?? [],
					onChange: (e) => set("requisitos", [...e.target.selectedOptions].map((o) => o.value)),
					children: catalogo.filter((x) => x.id !== c.id).map((x) => /* @__PURE__ */ jsx("option", {
						value: x.id,
						children: x.nombre
					}, x.id))
				})
			})
		] })]
	});
}
function ImportarLista({ filas, catalogo, onCerrar, onImportado }) {
	const cob = cobertura(catalogo, filas);
	const nuevas = cob.filter((f) => f.tipo === "documento" && !f.items.length);
	const [asig, setAsig] = useState(() => Object.fromEntries(nuevas.map((f) => {
		const p = proponerPaso(catalogo, f.modulo, f.texto);
		return [f.fila, {
			paso: p?.paso ?? "",
			clase: p?.clase === "ref" ? "R" : p?.clase ?? "R",
			nombre: f.texto
		}];
	})));
	const [error, setError] = useState("");
	const faltan = nuevas.filter((f) => !asig[f.fila]?.paso).length;
	const set = (fila, k, v) => setAsig((a) => ({
		...a,
		[fila]: {
			...a[fila],
			[k]: v
		}
	}));
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "lg",
		titulo: "Importar lista de la DDP",
		descripcion: `${filas.length} filas leídas · ${cob.filter((f) => f.tipo === "documento").length - nuevas.length} ya están en el catálogo · ${nuevas.length} nuevas.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			disabled: faltan > 0,
			onClick: () => {
				try {
					onImportado(importarLista(filas, asig));
				} catch (e) {
					setError(e instanceof Error ? e.message : "No se pudo importar.");
				}
			},
			children: "Importar"
		})] }),
		children: [
			error && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: error
			}),
			faltan > 0 && /* @__PURE__ */ jsxs(Aviso, {
				tipo: "aviso",
				children: [
					"Asigne un paso a cada fila nueva: ",
					faltan,
					" pendiente(s). Ninguna queda suelta."
				]
			}),
			nuevas.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "text-sm",
				children: "Todas las filas de la lista ya están en el catálogo. Importar actualiza la lista de referencia."
			}) : /* @__PURE__ */ jsx("ul", {
				className: "divide-y divide-border",
				children: nuevas.map((f) => /* @__PURE__ */ jsxs("li", {
					className: "py-2",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Fila ",
							f.fila + 1,
							" · ",
							f.modulo
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-1 grid gap-2 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								"aria-label": "Nombre en el catálogo",
								className: controlClase,
								value: asig[f.fila]?.nombre ?? "",
								onChange: (e) => set(f.fila, "nombre", e.target.value)
							}),
							/* @__PURE__ */ jsxs("select", {
								"aria-label": "Paso",
								className: controlClase,
								value: asig[f.fila]?.paso ?? "",
								onChange: (e) => set(f.fila, "paso", e.target.value),
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Elija el paso"
								}), [...PASOS].map(([k, n]) => /* @__PURE__ */ jsx("option", {
									value: k,
									children: n
								}, k))]
							}),
							/* @__PURE__ */ jsx("select", {
								"aria-label": "Clase",
								className: controlClase,
								value: asig[f.fila]?.clase ?? "R",
								onChange: (e) => set(f.fila, "clase", e.target.value),
								children: CLASES.filter((k) => k !== "ref").map((k) => /* @__PURE__ */ jsx("option", {
									value: k,
									children: NOMBRE_CLASE[k]
								}, k))
							})
						]
					})]
				}, f.fila))
			})
		]
	});
}
//#endregion
export { CatalogoExpedientePage as component };
