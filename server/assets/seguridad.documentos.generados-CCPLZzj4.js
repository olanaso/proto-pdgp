import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, m as fecha, n as getProyecto, r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { At as useTiposDocumento, Ft as useUsuarios, Ot as useDocumentos, it as useItems, jt as useUsuarioSesion, qt as useAreas, ut as anularDocumento, z as firmaDeDocumento } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, S as exportarPdf, _ as archivosDocumentos, h as GenerarDocumento, m as MotivoModal, v as htmlDocumentoBase, x as exportarExcel, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { t as Kpi } from "./Kpi-W-n9ERev.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Ban, Download, Eye, FilePlus2, FileStack, FileText, MapPin } from "lucide-react";
//#region src/routes/seguridad.documentos.generados.tsx?tsr-split=component
/** Ven todo el registro; el resto, lo suyo y lo de su área. */
var VEN_TODO = [
	"ADMIN",
	"COORDINADOR",
	"SUPERVISOR"
];
var ANULAN = ["ADMIN", "SUPERVISOR"];
function filaDocumento(d, tipos, areas) {
	const tipo = tipos.find((t) => t.id === d.tipoId);
	const sigla = (id) => areas.find((a) => a.id === id)?.codigo ?? "";
	return {
		...d,
		anio: d.fecha.slice(0, 4),
		tipoNombre: tipo?.nombre ?? d.tipoId,
		subtipoNombre: tipo?.subtipos.find((s) => s.id === d.subtipoId)?.nombre ?? "",
		proyectoNombre: d.projectId ? getProyecto(d.projectId)?.nombre ?? d.projectId : "",
		prediosTexto: d.predios.join(", "),
		emisor: [d.usuarioNombre, sigla(d.areaEmisoraId)].filter(Boolean).join(" · "),
		destino: [sigla(d.areaDestinoId), d.destinatarioExterno].filter(Boolean).join(" · ")
	};
}
function GeneradosPage() {
	const rol = useRol();
	const registro = useDocumentos();
	const tipos = useTiposDocumento();
	const itemsExpediente = useItems();
	const areas = useAreas();
	const usuarios = useUsuarios();
	const yo = useUsuarioSesion();
	const [ver, setVer] = useState(null);
	const [anular, setAnular] = useState(null);
	const [suelto, setSuelto] = useState(false);
	const [mensaje, setMensaje] = useState(null);
	const visibles = useMemo(() => registro.filter((d) => VEN_TODO.includes(rol) || d.usuarioId === yo?.id || yo?.areaId && d.areaEmisoraId === yo.areaId), [
		registro,
		rol,
		yo
	]);
	const filas = useMemo(() => visibles.map((d) => filaDocumento(d, tipos, areas)), [
		visibles,
		tipos,
		areas
	]);
	const anio = String((/* @__PURE__ */ new Date()).getFullYear());
	const mes = (/* @__PURE__ */ new Date()).toISOString().slice(0, 7);
	const emitidos = filas.filter((f) => f.estado === "emitido");
	const columnasExport = [
		{
			titulo: "Número",
			valor: (f) => f.numero
		},
		{
			titulo: "Tipo",
			valor: (f) => f.tipoNombre
		},
		{
			titulo: "Subtipo",
			valor: (f) => f.subtipoNombre
		},
		{
			titulo: "Asunto",
			valor: (f) => f.asunto
		},
		{
			titulo: "Proyecto",
			valor: (f) => f.proyectoNombre
		},
		{
			titulo: "Predios",
			valor: (f) => f.prediosTexto
		},
		{
			titulo: "Emisor",
			valor: (f) => f.emisor
		},
		{
			titulo: "Destino",
			valor: (f) => f.destino
		},
		{
			titulo: "Fecha",
			valor: (f) => fechaHora(f.fecha)
		},
		{
			titulo: "Estado",
			valor: (f) => f.estado === "emitido" ? "Emitido" : "Anulado"
		},
		{
			titulo: "Expediente",
			valor: (f) => firmaDeDocumento(itemsExpediente, f.id).texto
		}
	];
	async function descargar(f) {
		try {
			const blob = await archivosDocumentos.leer(f.id);
			if (!blob) throw new Error();
			descargarBlob(f.archivo ?? `${f.numero.replace(/[^A-Z0-9-]/gi, "_")}.doc`, blob);
		} catch {
			setMensaje({
				tipo: "error",
				texto: `El archivo de ${f.numero} no está guardado en este navegador. Vuelva a generarlo desde el paso de origen.`
			});
		}
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "proyecto",
			children: [
				/* @__PURE__ */ jsx(CrudPage, {
					titulo: "Documentos generados",
					icono: FileStack,
					descripcion: "Todo documento numerado por el sistema o registrado con número externo. Un número no se borra ni se reutiliza: se anula con motivo.",
					migas: [
						{ texto: "Seguridad y configuración" },
						{ texto: "Documentos" },
						{ texto: "Documentos generados" }
					],
					acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
						type: "button",
						onClick: () => setSuelto(true),
						children: [/* @__PURE__ */ jsx(FilePlus2, {}), " Nuevo documento"]
					}), /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						onClick: () => void exportarPdf("documentos-generados", columnasExport, filas, {
							titulo: "Documentos generados",
							lineas: [`${filas.length} documentos`]
						}),
						children: [/* @__PURE__ */ jsx(FileText, {}), " PDF"]
					})] }),
					columnas: [
						{
							clave: "numero",
							titulo: "Número",
							render: (f) => /* @__PURE__ */ jsx("button", {
								type: "button",
								className: `text-left font-mono text-xs font-semibold text-primary-dark hover:underline ${f.estado === "anulado" ? "line-through" : ""}`,
								onClick: () => setVer(f),
								children: f.numero
							})
						},
						{
							clave: "tipoNombre",
							titulo: "Tipo",
							render: (f) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
								className: "block",
								children: f.tipoNombre
							}), f.subtipoNombre && /* @__PURE__ */ jsx("span", {
								className: "block text-xs text-muted-foreground",
								children: f.subtipoNombre
							})] })
						},
						{
							clave: "asunto",
							titulo: "Asunto"
						},
						{
							clave: "proyectoNombre",
							titulo: "Proyecto · predio",
							render: (f) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
								className: "block",
								children: f.proyectoNombre || "Sin proyecto"
							}), f.prediosTexto && /* @__PURE__ */ jsx("span", {
								className: "block text-xs text-muted-foreground",
								children: f.prediosTexto
							})] })
						},
						{
							clave: "emisor",
							titulo: "Emisor"
						},
						{
							clave: "destino",
							titulo: "Destino"
						},
						{
							clave: "fecha",
							titulo: "Fecha",
							render: (f) => fechaHora(f.fecha)
						},
						{
							clave: "estado",
							titulo: "Estado",
							render: (f) => /* @__PURE__ */ jsx(StatusBadge, {
								tono: f.estado === "emitido" ? f.externo ? "primary" : "success" : "destructive",
								children: f.estado === "anulado" ? "Anulado" : f.externo ? "Externo" : "Emitido"
							})
						},
						{
							clave: "expediente",
							titulo: "Expediente",
							render: (f) => {
								const e = firmaDeDocumento(itemsExpediente, f.id);
								return /* @__PURE__ */ jsx(StatusBadge, {
									tono: e.tono,
									children: e.texto
								});
							}
						}
					],
					filas,
					claveFila: (f) => f.id,
					buscarEn: [
						"numero",
						"asunto",
						"prediosTexto",
						"destino",
						"emisor"
					],
					placeholderBuscar: "Número, asunto, predio o destino",
					filtros: [
						{
							clave: "projectId",
							etiqueta: "Proyecto",
							opciones: [...new Set(filas.map((f) => f.projectId).filter(Boolean))].map((id) => ({
								valor: id,
								texto: getProyecto(id)?.nombre ?? id
							}))
						},
						{
							clave: "usuarioId",
							etiqueta: "Usuario",
							opciones: [...new Map(filas.map((f) => [f.usuarioId, f.usuarioNombre])).entries()].map(([valor, texto]) => ({
								valor,
								texto
							}))
						},
						{
							clave: "areaEmisoraId",
							etiqueta: "Área emisora",
							opciones: areas.filter((a) => filas.some((f) => f.areaEmisoraId === a.id)).map((a) => ({
								valor: a.id,
								texto: a.codigo
							}))
						},
						{
							clave: "areaDestinoId",
							etiqueta: "Área destino",
							opciones: areas.filter((a) => filas.some((f) => f.areaDestinoId === a.id)).map((a) => ({
								valor: a.id,
								texto: a.codigo
							}))
						},
						{
							clave: "tipoId",
							etiqueta: "Tipo",
							opciones: tipos.map((t) => ({
								valor: t.id,
								texto: t.nombre
							}))
						},
						{
							clave: "anio",
							etiqueta: "Año",
							opciones: [...new Set(filas.map((f) => f.anio))].sort().reverse().map((a) => ({
								valor: a,
								texto: a
							}))
						},
						{
							clave: "estado",
							etiqueta: "Estado",
							opciones: [{
								valor: "emitido",
								texto: "Emitidos"
							}, {
								valor: "anulado",
								texto: "Anulados"
							}]
						}
					],
					accionesFila: [
						{
							nombre: "Ver detalle",
							icono: Eye,
							onClick: setVer
						},
						{
							nombre: "Descargar de nuevo",
							icono: Download,
							onClick: (f) => void descargar(f)
						},
						{
							nombre: "Anular documento",
							icono: Ban,
							destructiva: true,
							onClick: setAnular,
							visible: (f) => f.estado === "emitido" && ANULAN.includes(rol)
						}
					],
					exportar: (f) => void exportarExcel("documentos-generados", columnasExport, f, {
						titulo: "Documentos generados",
						lineas: [`${f.length} documentos`]
					}),
					vacio: registro.length ? "Ningún documento con esos filtros." : "Aún no se ha generado ningún documento numerado. Se registran al generar desde los pasos del predio o con «Nuevo documento»."
				}),
				mensaje && /* @__PURE__ */ jsx(Aviso, {
					tipo: mensaje.tipo,
					onCerrar: () => setMensaje(null),
					children: mensaje.texto
				}),
				!VEN_TODO.includes(rol) && /* @__PURE__ */ jsx(Aviso, {
					tipo: "info",
					children: "Su perfil ve los documentos que generó y los de su área."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ jsx(Kpi, {
							etiqueta: `Emitidos en ${anio}`,
							valor: emitidos.filter((f) => f.anio === anio).length
						}),
						/* @__PURE__ */ jsx(Kpi, {
							etiqueta: "Emitidos este mes",
							valor: emitidos.filter((f) => f.fecha.startsWith(mes)).length
						}),
						/* @__PURE__ */ jsx(Kpi, {
							etiqueta: "Anulados",
							valor: filas.length - emitidos.length
						})
					]
				}),
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3 mt-6",
					children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "proyecto",
							children: "Por proyecto"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "usuario",
							children: "Por usuario"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "anulados",
							children: "Anulaciones"
						})
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "proyecto",
					children: /* @__PURE__ */ jsx(Resumen, {
						filas: emitidos,
						tipos,
						agrupar: (f) => f.projectId ?? "",
						nombre: (k) => k ? getProyecto(k)?.nombre ?? k : "Sin proyecto",
						filtro: "projectId",
						titulo: "Proyecto"
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "usuario",
					children: /* @__PURE__ */ jsx(Resumen, {
						filas: emitidos,
						tipos,
						agrupar: (f) => f.usuarioId,
						nombre: (k) => usuarios.find((u) => u.id === k)?.nombre ?? filas.find((f) => f.usuarioId === k)?.usuarioNombre ?? k,
						filtro: "usuarioId",
						titulo: "Usuario"
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "anulados",
					children: /* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "numero",
								titulo: "Número",
								render: (f) => /* @__PURE__ */ jsx("span", {
									className: "font-mono text-xs",
									children: f.numero
								})
							},
							{
								clave: "motivo",
								titulo: "Motivo",
								render: (f) => f.anulacion?.motivo
							},
							{
								clave: "quien",
								titulo: "Anuló",
								render: (f) => f.anulacion?.usuario
							},
							{
								clave: "cuando",
								titulo: "Fecha",
								render: (f) => fechaHora(f.anulacion?.fecha)
							}
						],
						filas: filas.filter((f) => f.estado === "anulado"),
						claveFila: (f) => f.id,
						vacio: "No hay documentos anulados."
					})
				})
			]
		}),
		ver && /* @__PURE__ */ jsx(DetalleModal, {
			fila: ver,
			onCerrar: () => setVer(null),
			onDescargar: () => void descargar(ver)
		}),
		anular && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: `Anular ${anular.numero}`,
			descripcion: "El número queda en el registro como anulado y no se vuelve a usar. Si el documento se corrige, genérelo de nuevo: recibirá un número nuevo.",
			accion: "Anular documento",
			destructiva: true,
			onCerrar: () => setAnular(null),
			onConfirmar: (motivo) => {
				anularDocumento(anular.id, motivo, yo?.nombre ?? "usuario sin registro");
				setMensaje({
					tipo: "exito",
					texto: `${anular.numero} anulado.`
				});
				setAnular(null);
			}
		}),
		suelto && /* @__PURE__ */ jsx(DocumentoSuelto, {
			tipos,
			onCerrar: () => setSuelto(false),
			onGenerado: (numero) => {
				setSuelto(false);
				setMensaje({
					tipo: "exito",
					texto: numero ? `${numero} generado y registrado.` : "Borrador sin numerar generado."
				});
			}
		})
	] });
}
/** Cantidad por grupo (proyecto o usuario) y tipo; el grupo enlaza a la lista filtrada. */
function Resumen({ filas, tipos, agrupar, nombre, filtro, titulo }) {
	const grupos = [...new Set(filas.map(agrupar))];
	const usados = tipos.filter((t) => filas.some((f) => f.tipoId === t.id));
	const fila = grupos.map((g) => ({
		g,
		total: filas.filter((f) => agrupar(f) === g).length,
		porTipo: Object.fromEntries(usados.map((t) => [t.id, filas.filter((f) => agrupar(f) === g && f.tipoId === t.id).length]))
	})).sort((a, b) => b.total - a.total);
	return /* @__PURE__ */ jsx(Tabla, {
		columnas: [
			{
				clave: "g",
				titulo,
				render: (r) => r.g ? /* @__PURE__ */ jsx("a", {
					href: `/seguridad/documentos/generados?${filtro}=${encodeURIComponent(r.g)}`,
					className: "font-semibold text-primary-dark hover:underline",
					children: nombre(r.g)
				}) : nombre(r.g)
			},
			...usados.map((t) => ({
				clave: t.id,
				titulo: t.nombre,
				alinear: "derecha",
				render: (r) => r.porTipo[t.id] || ""
			})),
			{
				clave: "total",
				titulo: "Total",
				alinear: "derecha",
				render: (r) => /* @__PURE__ */ jsx("span", {
					className: "font-semibold",
					children: r.total
				})
			}
		],
		filas: fila,
		claveFila: (r) => r.g || "sin",
		vacio: "Aún no hay documentos emitidos."
	});
}
function DetalleModal({ fila, onCerrar, onDescargar }) {
	const datos = [
		["Tipo", [fila.tipoNombre, fila.subtipoNombre].filter(Boolean).join(" · ")],
		["Asunto", fila.asunto],
		["Proyecto", fila.proyectoNombre || "Sin proyecto"],
		["Predios", fila.prediosTexto || "Ninguno"],
		["Emisor", fila.emisor],
		["Destino", fila.destino || "Sin destino"],
		["Fecha", fechaHora(fila.fecha)],
		["Generado en", fila.origen.pantalla],
		["Archivo", fila.archivo ?? "Sin archivo"],
		["Numeración", fila.externo ? "Número externo (no consume correlativo)" : `Correlativo ${fila.correlativo}`]
	];
	if (fila.anulacion) datos.push(["Anulación", `${fila.anulacion.motivo} · ${fila.anulacion.usuario} · ${fecha(fila.anulacion.fecha)}`]);
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "md",
		titulo: fila.numero,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onDescargar,
			children: [/* @__PURE__ */ jsx(Download, {}), " Descargar"]
		}), fila.origen.ruta && /* @__PURE__ */ jsx(Button, {
			asChild: true,
			children: /* @__PURE__ */ jsxs("a", {
				href: fila.origen.ruta,
				children: [/* @__PURE__ */ jsx(MapPin, {}), " Ir al paso de origen"]
			})
		})] }),
		children: /* @__PURE__ */ jsx("dl", {
			className: "grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-3",
			children: datos.map(([k, v]) => /* @__PURE__ */ jsxs("div", {
				className: "contents",
				children: [/* @__PURE__ */ jsx("dt", {
					className: "text-xs text-muted-foreground sm:pt-0.5",
					children: k
				}), /* @__PURE__ */ jsx("dd", {
					className: "sm:col-span-2",
					children: v
				})]
			}, k))
		})
	});
}
/** Oficio o memorando que no nace de un paso del predio: consulta, memorando interno, informe del proyecto. */
function DocumentoSuelto({ tipos, onCerrar, onGenerado }) {
	const activos = tipos.filter((t) => t.estado === "ACTIVO");
	const [tipoId, setTipoId] = useState(activos[0]?.id ?? "");
	const [asunto, setAsunto] = useState("");
	const [projectId, setProjectId] = useState("");
	const [predio, setPredio] = useState("");
	const [cuerpo, setCuerpo] = useState("");
	const tipo = activos.find((t) => t.id === tipoId);
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "lg",
		titulo: "Nuevo documento",
		descripcion: "Para un documento que no nace de un paso del predio. Se genera con la plantilla base del tipo.",
		children: [/* @__PURE__ */ jsxs(FormGrid, {
			columnas: 1,
			children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Tipo",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						className: controlClase,
						value: tipoId,
						onChange: (e) => setTipoId(e.target.value),
						children: activos.map((t) => /* @__PURE__ */ jsx("option", {
							value: t.id,
							children: t.nombre
						}, t.id))
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Asunto",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: asunto,
						onChange: (e) => setAsunto(e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Proyecto",
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						value: projectId,
						onChange: (e) => setProjectId(e.target.value),
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Sin proyecto"
						}), proyectos.map((p) => /* @__PURE__ */ jsx("option", {
							value: p.id,
							children: p.nombre
						}, p.id))]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Predio",
					ayuda: "Código del predio, si el documento es de uno.",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: `${controlClase} uppercase`,
						value: predio,
						onChange: (e) => setPredio(e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Contenido",
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						rows: 5,
						className: `${controlClase} h-auto py-2`,
						value: cuerpo,
						onChange: (e) => setCuerpo(e.target.value)
					})
				})
			]
		}), /* @__PURE__ */ jsx(Section, {
			className: "mt-4",
			children: /* @__PURE__ */ jsx(GenerarDocumento, {
				titulo: `Generar ${tipo?.nombre.toLowerCase() ?? "documento"}`,
				descripcion: "Pregunta si se numera antes de descargar.",
				tipos: tipoId ? [tipoId] : [],
				projectId: projectId || void 0,
				predios: predio.trim() ? [predio.trim().toUpperCase()] : [],
				pantalla: "Documentos generados · nuevo documento",
				ruta: "/seguridad/documentos/generados",
				asunto: asunto.trim(),
				validar: () => asunto.trim() ? null : "Ingrese el asunto.",
				nombreArchivo: (t) => `${t}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.doc`,
				armarArchivo: (numero) => new Blob(["﻿", htmlDocumentoBase({
					titulo: tipo?.nombreEnNumero ?? "DOCUMENTO",
					numero,
					asunto: asunto.trim(),
					lineas: [projectId ? `Proyecto: ${getProyecto(projectId)?.nombre ?? projectId}` : "", predio.trim() ? `Predio: ${predio.trim().toUpperCase()}` : ""],
					cuerpo
				})], { type: "application/msword;charset=utf-8" }),
				onGenerado: (r) => onGenerado(r.numero)
			})
		})]
	});
}
//#endregion
export { GeneradosPage as component };
