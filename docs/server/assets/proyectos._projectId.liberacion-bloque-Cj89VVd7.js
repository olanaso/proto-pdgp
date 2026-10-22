import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, f as vencimiento, m as fecha, p as desdeIso, s as registrarHito, u as plazo, v as numero } from "./archivosIdb-BbjJAFd8.js";
import { a as prediosDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { o as archivoDe } from "./sujetoPasivo-Cz4oBCnt.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { Dt as BotonIcono, E as Modal, N as ListaDocumentos, at as guardarBloque, ct as liquidacion, it as bloqueDelPredio, lt as useBloques, ot as idBloque } from "./PredioEncabezado-FhqZ2Jv6.js";
import { n as DatosDemostracion, t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.liberacion-bloque-Cj6Wa3qc.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, FolderOpen, History, Mail, Pencil, Plus, Save, Shapes, Trash2 } from "lucide-react";
//#region src/routes/proyectos.$projectId.liberacion-bloque.tsx?tsr-split=component
var ETAPA_BLOQUE = {
	DETERMINACION: "Determinación",
	EMPADRONAMIENTO: "Empadronamiento y calificación",
	PADRON: "Padrón",
	LIBERACION: "Liberación",
	INSCRIPCION: "Inscripción"
};
var CONDICION = {
	PROPIETARIO: "Propietario",
	POSEEDOR: "Poseedor",
	OCUPANTE: "Ocupante"
};
var CALIFICACION = {
	PENDIENTE: ["Pendiente", "neutral"],
	APTO: ["Apto", "success"],
	OBSERVADO: ["Observado", "warning"]
};
var RESPUESTA = {
	"": "Sin respuesta",
	ACEPTA: "Acepta",
	ACEPTA_ENTREGA_ANTICIPADA: "Acepta con entrega anticipada",
	RECHAZA: "Rechaza"
};
var bloqueVacio = (projectId, nombre) => ({
	id: idBloque(),
	projectId,
	nombre,
	resolucion: {
		numero: "",
		fecha: "",
		documento: null
	},
	plano: null,
	publicaciones: [
		"",
		"",
		""
	],
	diagnostico: [],
	sectores: [],
	afectados: [],
	prePadronEl: "",
	padronEl: "",
	etapa: "DETERMINACION"
});
var afectadoVacio = () => ({
	codigo: "",
	sector: "",
	nombres: "",
	documento: "",
	condicion: "PROPIETARIO",
	area: 0,
	zona: "URBANA",
	calificacion: "PENDIENTE",
	observacion: "",
	cartaNotificadaEl: "",
	respuesta: "",
	respuestaEl: "",
	entregaEl: "",
	pagos: []
});
/** Vencimiento en días hábiles desde una fecha "aaaa-mm-dd", o undefined si no hay fecha. */
var venceEn = (desde, dias) => {
	const d = desdeIso(desde);
	return d ? vencimiento(d, {
		dias,
		unidad: "habiles"
	}) : void 0;
};
function LiberacionBloquePage() {
	const { projectId } = Route$1.useParams();
	const { bloque: abierto } = Route$1.useSearch();
	const rol = useRol();
	const edita = rol === "ADMIN" || rol === "COORDINADOR" || rol === "ESP_LEGAL";
	const bloques = useBloques().filter((b) => b.projectId === projectId);
	const actual = bloques.find((b) => b.id === abierto);
	const [nuevo, setNuevo] = useState(null);
	const navigate = Route$1.useNavigate();
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(ProyectoEncabezado, {
			projectId,
			titulo: actual ? `Bloque ${actual.nombre}` : "Liberación en bloque",
			icono: Shapes,
			descripcion: "Título VIII del TUO del DL 1192 (DL 1726, art. 46 a 65): el bloque se aprueba por resolución con plano; padrón, tasación por sector y publicaciones son del bloque.",
			acciones: actual ? /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				size: "sm",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/proyectos/$projectId/liberacion-bloque",
					params: { projectId },
					children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Bloques del proyecto"]
				})
			}) : edita && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				size: "sm",
				onClick: () => setNuevo(""),
				children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar bloque"]
			})
		}),
		/* @__PURE__ */ jsx(DatosDemostracion, {}),
		actual ? /* @__PURE__ */ jsx(DetalleBloque, {
			inicial: actual,
			projectId,
			edita
		}, actual.id) : /* @__PURE__ */ jsx(Section, {
			titulo: `Bloques del proyecto (${bloques.length})`,
			children: /* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "nombre",
						titulo: "Bloque",
						render: (b) => /* @__PURE__ */ jsx("span", {
							className: "font-medium",
							children: b.nombre
						})
					},
					{
						clave: "resolucion",
						titulo: "Resolución",
						render: (b) => b.resolucion.numero ? `${b.resolucion.numero} · ${fecha(b.resolucion.fecha)}` : "Sin resolución"
					},
					{
						clave: "etapa",
						titulo: "Etapa",
						render: (b) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: ETAPA_BLOQUE[b.etapa]
						})
					},
					{
						clave: "sectores",
						titulo: "Sectores",
						render: (b) => b.sectores.length
					},
					{
						clave: "afectados",
						titulo: "Afectados",
						render: (b) => b.afectados.length
					},
					{
						clave: "acciones",
						titulo: "Acciones",
						alinear: "derecha",
						render: (b) => /* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Abrir bloque",
							icono: FolderOpen,
							onClick: () => navigate({ search: { bloque: b.id } })
						})
					}
				],
				filas: bloques,
				claveFila: (b) => b.id,
				vacio: "Aún no hay bloques en este proyecto. Registre uno con su resolución y plano."
			})
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: nuevo !== null,
			onCerrar: () => setNuevo(null),
			ancho: "sm",
			titulo: "Registrar bloque",
			descripcion: "Luego registre la resolución que lo determina y su plano georreferenciado (art. 48).",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setNuevo(null),
				children: "Cancelar"
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				disabled: !nuevo?.trim(),
				onClick: () => {
					const b = bloqueVacio(projectId, nuevo.trim());
					guardarBloque(b, "Registró bloque", b.nombre);
					setNuevo(null);
					navigate({ search: { bloque: b.id } });
				},
				children: [/* @__PURE__ */ jsx(Save, {}), " Registrar bloque"]
			})] }),
			children: /* @__PURE__ */ jsx(FormGrid, {
				columnas: 1,
				children: /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Nombre del bloque",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: nuevo ?? "",
						onChange: (e) => setNuevo(e.target.value),
						placeholder: "Bloque 1 · Tramo norte"
					})
				})
			})
		})
	] });
}
function DetalleBloque({ inicial, projectId, edita }) {
	const [b, setB] = useState(inicial);
	const [mensaje, setMensaje] = useState(null);
	const [baja, setBaja] = useState(null);
	const [motivo, setMotivo] = useState("");
	const [afectado, setAfectado] = useState(null);
	const [cartas, setCartas] = useState(null);
	const todos = useBloques();
	const set = (k, v) => setB((x) => ({
		...x,
		[k]: v
	}));
	const guardar = (nuevo, accion, objeto, m, aviso) => {
		guardarBloque(nuevo, accion, objeto, m);
		setB(nuevo);
		setMensaje(aviso ?? `Bloque ${nuevo.nombre} guardado.`);
	};
	const pedirBaja = (x) => {
		setMotivo("");
		setBaja(x);
	};
	const sector = (id) => b.sectores.find((s) => s.id === id);
	const guardarBoton = (texto, accion) => edita ? /* @__PURE__ */ jsx(FormActions, { children: /* @__PURE__ */ jsxs(Button, {
		type: "button",
		onClick: () => guardar(b, accion, b.nombre),
		children: [
			/* @__PURE__ */ jsx(Save, {}),
			" ",
			texto
		]
	}) }) : null;
	const fechaInput = (valor, cambiar, etiqueta) => /* @__PURE__ */ jsx("input", {
		type: "date",
		"aria-label": etiqueta,
		className: controlClase,
		value: valor,
		disabled: !edita,
		onChange: (e) => cambiar(e.target.value)
	});
	const doc = plazo("bloque_documentos");
	const primera = desdeIso(b.publicaciones[0]);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(null),
			children: mensaje
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "determinacion",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3 h-auto w-full flex-wrap justify-start",
					children: [
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "determinacion",
							children: "Determinación"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "publicaciones",
							children: "Publicaciones y diagnóstico"
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "sectores",
							children: [
								"Sectores y tasación (",
								b.sectores.length,
								")"
							]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "empadronamiento",
							children: [
								"Empadronamiento y calificación (",
								b.afectados.length,
								")"
							]
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "padron",
							children: "Padrón"
						}),
						/* @__PURE__ */ jsx(TabsTrigger, {
							value: "liberacion",
							children: "Liberación"
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
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "determinacion",
					children: [
						/* @__PURE__ */ jsx(Section, {
							titulo: "Determinación del bloque (art. 47 y 48)",
							children: /* @__PURE__ */ jsxs(FormGrid, { children: [
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Nombre del bloque",
									obligatorio: true,
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: controlClase,
										value: b.nombre,
										disabled: !edita,
										onChange: (e) => set("nombre", e.target.value)
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Etapa del bloque",
									children: (id) => /* @__PURE__ */ jsx("select", {
										id,
										className: controlClase,
										value: b.etapa,
										disabled: !edita,
										onChange: (e) => set("etapa", e.target.value),
										children: Object.entries(ETAPA_BLOQUE).map(([k, v]) => /* @__PURE__ */ jsx("option", {
											value: k,
											children: v
										}, k))
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Resolución que lo determina",
									obligatorio: true,
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: controlClase,
										value: b.resolucion.numero,
										disabled: !edita,
										placeholder: "RD 0123-2026-MTC/19.03",
										onChange: (e) => set("resolucion", {
											...b.resolucion,
											numero: e.target.value
										})
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Fecha de la resolución",
									obligatorio: true,
									children: () => fechaInput(b.resolucion.fecha, (v) => set("resolucion", {
										...b.resolucion,
										fecha: v
									}), "Fecha de la resolución")
								})
							] })
						}),
						/* @__PURE__ */ jsx(Section, {
							titulo: "Documentos recibidos",
							className: "mt-4",
							children: /* @__PURE__ */ jsx(FormGrid, {
								columnas: 1,
								children: /* @__PURE__ */ jsx(FormField, {
									etiqueta: "Documentos",
									ancho: "doble",
									children: /* @__PURE__ */ jsx(ListaDocumentos, {
										deshabilitado: !edita,
										items: [{
											clave: "resolucion",
											nombre: "Resolución (PDF)",
											archivo: b.resolucion.documento,
											accept: ".pdf"
										}, {
											clave: "plano",
											nombre: "Plano georreferenciado del bloque",
											archivo: b.plano,
											accept: ".pdf,.dwg,.zip,.kmz"
										}],
										onCargar: (k, f) => k === "plano" ? set("plano", archivoDe(f)) : set("resolucion", {
											...b.resolucion,
											documento: archivoDe(f)
										}),
										onQuitar: (k) => k === "plano" ? set("plano", null) : set("resolucion", {
											...b.resolucion,
											documento: null
										})
									})
								})
							})
						}),
						guardarBoton("Guardar determinación", "Guardó la determinación")
					]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "publicaciones",
					children: [/* @__PURE__ */ jsxs(Section, {
						titulo: "Publicaciones (art. 51)",
						className: "mb-4",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "mb-3 text-sm text-muted-foreground",
							children: [
								"Tres publicaciones con intervalos de 20 d.h. Desde la primera corren ",
								doc.dias,
								" d.h. para que los afectados presenten sus documentos."
							]
						}), /* @__PURE__ */ jsxs(FormGrid, { children: [[
							0,
							1,
							2
						].map((i) => {
							const anterior = i > 0 ? venceEn(b.publicaciones[i - 1], 20) : void 0;
							return /* @__PURE__ */ jsx(FormField, {
								etiqueta: `Publicación ${i + 1}`,
								ayuda: anterior ? `Corresponde el ${fecha(anterior)} (20 d.h.).` : void 0,
								children: () => fechaInput(b.publicaciones[i], (v) => {
									const p = [...b.publicaciones];
									p[i] = v;
									set("publicaciones", p);
								}, `Publicación ${i + 1}`)
							}, i);
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: `Presentación de documentos (art. ${doc.articulo})`,
							children: /* @__PURE__ */ jsx("div", {
								className: "pt-2",
								children: primera ? /* @__PURE__ */ jsx(PlazoBadge, { vence: vencimiento(primera, doc) }) : /* @__PURE__ */ jsx("span", {
									className: "text-sm text-muted-foreground",
									children: "Registre la primera publicación."
								})
							})
						})] })]
					}), /* @__PURE__ */ jsxs(Section, {
						titulo: "Diagnóstico: pedidos de información (art. 49)",
						acciones: edita && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => set("diagnostico", [...b.diagnostico, {
								entidad: "",
								pedidoEl: "",
								respuestaEl: ""
							}]),
							children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar pedido"]
						}),
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "mb-3 text-sm text-muted-foreground",
								children: "Cada entidad responde en 10 d.h., prorrogables por 10 más."
							}),
							/* @__PURE__ */ jsx(Tabla, {
								columnas: [
									{
										clave: "entidad",
										titulo: "Entidad",
										render: (d, i) => /* @__PURE__ */ jsx("input", {
											"aria-label": "Entidad",
											className: controlClase,
											value: d.entidad,
											disabled: !edita,
											placeholder: "SUNARP, COFOPRI, municipalidad",
											onChange: (e) => set("diagnostico", b.diagnostico.map((x, j) => j === i ? {
												...x,
												entidad: e.target.value
											} : x))
										})
									},
									{
										clave: "pedidoEl",
										titulo: "Pedido",
										render: (d, i) => fechaInput(d.pedidoEl, (v) => set("diagnostico", b.diagnostico.map((x, j) => j === i ? {
											...x,
											pedidoEl: v
										} : x)), "Fecha del pedido")
									},
									{
										clave: "respuestaEl",
										titulo: "Respuesta",
										render: (d, i) => fechaInput(d.respuestaEl, (v) => set("diagnostico", b.diagnostico.map((x, j) => j === i ? {
											...x,
											respuestaEl: v
										} : x)), "Fecha de la respuesta")
									},
									{
										clave: "plazo",
										titulo: "Plazo",
										render: (d) => {
											const v = venceEn(d.pedidoEl, 10);
											if (d.respuestaEl) return /* @__PURE__ */ jsx(StatusBadge, {
												tono: "success",
												children: "Respondido"
											});
											return v ? /* @__PURE__ */ jsx(PlazoBadge, { vence: v }) : "";
										}
									},
									{
										clave: "acciones",
										titulo: "Acciones",
										alinear: "derecha",
										render: (d, i) => edita && /* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Quitar pedido",
											icono: Trash2,
											destructiva: true,
											onClick: () => pedirBaja({
												titulo: `Quitar el pedido a ${d.entidad || "la entidad"}`,
												objeto: d.entidad,
												aplicar: (x) => ({
													...x,
													diagnostico: x.diagnostico.filter((_, j) => j !== i)
												})
											})
										})
									}
								],
								filas: b.diagnostico,
								claveFila: (_, i) => i,
								vacio: "Sin pedidos de información."
							}),
							guardarBoton("Guardar publicaciones y diagnóstico", "Guardó publicaciones")
						]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "sectores",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Sectores y tasación del terreno (art. 53)",
						acciones: edita && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => set("sectores", [...b.sectores, {
								id: `s${Date.now().toString(36)}`,
								nombre: `Sector ${b.sectores.length + 1}`,
								valorM2: 0,
								tasadoEl: ""
							}]),
							children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar sector"]
						}),
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "mb-3 text-sm text-muted-foreground",
								children: "El bloque se divide en sectores homogéneos; cada sector tiene un valor del terreno por m² que se aplica a todos sus afectados."
							}),
							/* @__PURE__ */ jsx(Tabla, {
								columnas: [
									{
										clave: "nombre",
										titulo: "Sector",
										render: (s, i) => /* @__PURE__ */ jsx("input", {
											"aria-label": "Nombre del sector",
											className: controlClase,
											value: s.nombre,
											disabled: !edita,
											onChange: (e) => set("sectores", b.sectores.map((x, j) => j === i ? {
												...x,
												nombre: e.target.value
											} : x))
										})
									},
									{
										clave: "valorM2",
										titulo: "Valor por m² (S/)",
										render: (s, i) => /* @__PURE__ */ jsx("input", {
											type: "number",
											min: 0,
											step: "0.01",
											"aria-label": "Valor por m²",
											className: `${controlClase} tabular-nums`,
											value: s.valorM2 || "",
											disabled: !edita,
											onChange: (e) => set("sectores", b.sectores.map((x, j) => j === i ? {
												...x,
												valorM2: Number(e.target.value)
											} : x))
										})
									},
									{
										clave: "tasadoEl",
										titulo: "Tasado el",
										render: (s, i) => fechaInput(s.tasadoEl, (v) => set("sectores", b.sectores.map((x, j) => j === i ? {
											...x,
											tasadoEl: v
										} : x)), "Fecha de tasación")
									},
									{
										clave: "afectados",
										titulo: "Afectados",
										alinear: "derecha",
										render: (s) => b.afectados.filter((a) => a.sector === s.id).length
									},
									{
										clave: "acciones",
										titulo: "Acciones",
										alinear: "derecha",
										render: (s) => edita && /* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Quitar sector",
											icono: Trash2,
											destructiva: true,
											deshabilitado: b.afectados.some((a) => a.sector === s.id),
											onClick: () => pedirBaja({
												titulo: `Quitar ${s.nombre}`,
												objeto: s.nombre,
												aplicar: (x) => ({
													...x,
													sectores: x.sectores.filter((y) => y.id !== s.id)
												})
											})
										})
									}
								],
								filas: b.sectores,
								claveFila: (s) => s.id,
								vacio: "Sin sectores. Agregue al menos uno antes de empadronar."
							}),
							guardarBoton("Guardar sectores", "Guardó sectores y tasación")
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "empadronamiento",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Empadronamiento y calificación (art. 54 y 55)",
						acciones: edita && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							disabled: b.sectores.length === 0,
							onClick: () => setAfectado({
								a: {
									...afectadoVacio(),
									sector: b.sectores[0]?.id ?? ""
								},
								nuevo: true
							}),
							children: [/* @__PURE__ */ jsx(Plus, {}), " Empadronar"]
						}),
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-sm text-muted-foreground",
							children: "Empadronamiento en 40 d.h. y calificación de la condición jurídica de cada afectado en 40 d.h. Solo los aptos pasan al padrón."
						}), /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "codigo",
									titulo: "Predio",
									render: (a) => /* @__PURE__ */ jsx("span", {
										className: "font-mono text-xs",
										children: a.codigo
									})
								},
								{
									clave: "sector",
									titulo: "Sector",
									render: (a) => sector(a.sector)?.nombre
								},
								{
									clave: "nombres",
									titulo: "Afectado"
								},
								{
									clave: "documento",
									titulo: "Documento"
								},
								{
									clave: "condicion",
									titulo: "Condición",
									render: (a) => CONDICION[a.condicion]
								},
								{
									clave: "area",
									titulo: "Área (m²)",
									alinear: "derecha",
									render: (a) => /* @__PURE__ */ jsx("span", {
										className: "tabular-nums",
										children: numero(a.area, 2)
									})
								},
								{
									clave: "zona",
									titulo: "Zona",
									render: (a) => a.zona === "URBANA" ? "Urbana" : "Rural"
								},
								{
									clave: "calificacion",
									titulo: "Calificación",
									render: (a) => /* @__PURE__ */ jsxs("span", {
										className: "flex flex-col items-start gap-0.5",
										children: [/* @__PURE__ */ jsx(StatusBadge, {
											tono: CALIFICACION[a.calificacion][1],
											children: CALIFICACION[a.calificacion][0]
										}), a.observacion && /* @__PURE__ */ jsx("span", {
											className: "text-xs text-muted-foreground",
											children: a.observacion
										})]
									})
								},
								{
									clave: "acciones",
									titulo: "Acciones",
									alinear: "derecha",
									render: (a) => edita && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex gap-1",
										children: [/* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Editar afectado",
											icono: Pencil,
											onClick: () => setAfectado({
												a,
												nuevo: false
											})
										}), /* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Quitar afectado",
											icono: Trash2,
											destructiva: true,
											onClick: () => pedirBaja({
												titulo: `Quitar el predio ${a.codigo} del bloque`,
												objeto: a.codigo,
												aplicar: (x) => ({
													...x,
													afectados: x.afectados.filter((y) => y.codigo !== a.codigo)
												})
											})
										})]
									})
								}
							],
							filas: b.afectados,
							claveFila: (a) => a.codigo,
							vacio: "Aún no hay afectados empadronados."
						})]
					})
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "padron",
					children: [/* @__PURE__ */ jsxs(Section, {
						titulo: "Pre padrón y padrón (art. 56 y 57)",
						className: "mb-4",
						children: [/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Publicación del pre padrón",
							ayuda: "Observaciones en 10 d.h., absolución en 10 d.h. y resolución en 10 d.h.",
							children: () => fechaInput(b.prePadronEl, (v) => set("prePadronEl", v), "Pre padrón")
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Aprobación del padrón",
							ayuda: b.prePadronEl ? `Referencia: ${fecha(venceEn(b.prePadronEl, 45))} (30 d.h. del pre padrón más 15 del padrón).` : "Se aprueba en 15 d.h. tras resolver las observaciones.",
							children: () => fechaInput(b.padronEl, (v) => set("padronEl", v), "Padrón")
						})] }), guardarBoton("Guardar padrón", "Guardó fechas del padrón")]
					}), /* @__PURE__ */ jsxs(Section, {
						titulo: "Total por sector (art. 58 y 59)",
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-sm text-muted-foreground",
							children: "Valor del terreno por sector, incentivo del 20 % (trato directo) o 30 % (entrega anticipada) y compensación económica: 10 % del terreno entre 1 y 6 UIT; ocupantes 4 UIT en zona urbana y 3 en rural."
						}), /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "nombre",
									titulo: "Sector"
								},
								{
									clave: "valorM2",
									titulo: "Valor m²",
									alinear: "derecha",
									render: (s) => moneda(s.valorM2)
								},
								{
									clave: "n",
									titulo: "Afectados",
									alinear: "derecha"
								},
								{
									clave: "area",
									titulo: "Área (m²)",
									alinear: "derecha",
									render: (s) => numero(s.area, 2)
								},
								{
									clave: "terreno",
									titulo: "Terreno",
									alinear: "derecha",
									render: (s) => moneda(s.t.terreno)
								},
								{
									clave: "incentivo",
									titulo: "Incentivo",
									alinear: "derecha",
									render: (s) => moneda(s.t.incentivo)
								},
								{
									clave: "compensacion",
									titulo: "Compensación",
									alinear: "derecha",
									render: (s) => moneda(s.t.compensacion)
								},
								{
									clave: "total",
									titulo: "Total",
									alinear: "derecha",
									render: (s) => /* @__PURE__ */ jsx("span", {
										className: "font-semibold",
										children: moneda(s.t.total)
									})
								}
							],
							filas: b.sectores.map((s) => {
								const del = b.afectados.filter((a) => a.sector === s.id);
								const t = del.map((a) => liquidacion(a, s.valorM2)).reduce((x, y) => ({
									terreno: x.terreno + y.terreno,
									incentivo: x.incentivo + y.incentivo,
									compensacion: x.compensacion + y.compensacion,
									total: x.total + y.total,
									pagado: x.pagado + y.pagado
								}), {
									terreno: 0,
									incentivo: 0,
									compensacion: 0,
									total: 0,
									pagado: 0
								});
								return {
									...s,
									t,
									n: del.length,
									area: del.reduce((x, a) => x + a.area, 0)
								};
							}),
							claveFila: (s) => s.id,
							vacio: "Sin sectores."
						})]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "liberacion",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Liberación por afectado",
						acciones: edita && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							disabled: !b.afectados.some((a) => a.calificacion === "APTO" && !a.cartaNotificadaEl),
							onClick: () => setCartas(""),
							children: [/* @__PURE__ */ jsx(Mail, {}), " Notificar cartas"]
						}),
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "mb-3 text-sm text-muted-foreground",
								children: "Carta de intención con respuesta en 10 d.h.; quien acepta entrega en 40 d.h. para recibir la compensación. El rechazo lleva el predio a expropiación. La respuesta, la entrega y los pagos se registran en el expediente de cada predio."
							}),
							/* @__PURE__ */ jsx(Tabla, {
								columnas: [
									{
										clave: "codigo",
										titulo: "Predio",
										render: (a) => /* @__PURE__ */ jsx("span", {
											className: "font-mono text-xs",
											children: a.codigo
										})
									},
									{
										clave: "nombres",
										titulo: "Afectado"
									},
									{
										clave: "carta",
										titulo: "Carta",
										render: (a) => a.cartaNotificadaEl ? /* @__PURE__ */ jsxs("span", {
											className: "flex flex-col items-start gap-0.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "tabular-nums",
												children: fecha(a.cartaNotificadaEl)
											}), !a.respuesta && /* @__PURE__ */ jsx(PlazoBadge, { vence: venceEn(a.cartaNotificadaEl, 10) })]
										}) : "Sin notificar"
									},
									{
										clave: "respuesta",
										titulo: "Respuesta",
										render: (a) => /* @__PURE__ */ jsx(StatusBadge, {
											tono: a.respuesta === "RECHAZA" ? "destructive" : a.respuesta ? "success" : "neutral",
											children: RESPUESTA[a.respuesta]
										})
									},
									{
										clave: "entrega",
										titulo: "Entrega",
										render: (a) => a.entregaEl ? fecha(a.entregaEl) : a.respuestaEl && a.respuesta.startsWith("ACEPTA") ? /* @__PURE__ */ jsx(PlazoBadge, { vence: venceEn(a.respuestaEl, 40) }) : ""
									},
									{
										clave: "pagos",
										titulo: "Pagado / total",
										alinear: "derecha",
										render: (a) => {
											const l = liquidacion(a, sector(a.sector)?.valorM2 ?? 0);
											return /* @__PURE__ */ jsxs("span", {
												className: "tabular-nums",
												children: [
													moneda(l.pagado),
													" / ",
													moneda(l.total)
												]
											});
										}
									},
									{
										clave: "acciones",
										titulo: "Acciones",
										alinear: "derecha",
										render: (a) => /* @__PURE__ */ jsx(Button, {
											asChild: true,
											size: "sm",
											variant: "outline",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/proyectos/$projectId/predios/$codigo/afectado-bloque",
												params: {
													projectId,
													codigo: a.codigo
												},
												children: "Registrar en el predio"
											})
										})
									}
								],
								filas: b.afectados,
								claveFila: (a) => a.codigo,
								vacio: "Aún no hay afectados."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-4",
								children: /* @__PURE__ */ jsx(HistorialEnvios, {
									proyecto: projectId,
									paso: "liberacion-bloque",
									editable: edita
								})
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico del bloque",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `bloque-${b.id}`,
							nombreArchivo: `historico-${b.id}`
						})
					})
				})
			]
		}),
		afectado && /* @__PURE__ */ jsx(FormAfectado, {
			inicial: afectado.a,
			nuevo: afectado.nuevo,
			projectId,
			sectores: b.sectores,
			ocupado: (codigo) => {
				const en = bloqueDelPredio(todos, codigo);
				return en ? en.bloque.nombre : void 0;
			},
			onCerrar: () => setAfectado(null),
			onGuardar: (a) => {
				guardar({
					...b,
					afectados: afectado.nuevo ? [...b.afectados, a] : b.afectados.map((x) => x.codigo === a.codigo ? a : x)
				}, afectado.nuevo ? "Empadronó afectado" : "Modificó afectado", a.codigo, void 0, `Afectado ${a.codigo} guardado.`);
				setAfectado(null);
			}
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: cartas !== null,
			onCerrar: () => setCartas(null),
			ancho: "sm",
			titulo: "Notificar cartas de intención",
			descripcion: `Se registra la notificación a los ${b.afectados.filter((a) => a.calificacion === "APTO" && !a.cartaNotificadaEl).length} afectados aptos sin carta. Desde esa fecha corren 10 d.h. para responder (art. 58).`,
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setCartas(null),
				children: "Cancelar"
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				disabled: !cartas,
				onClick: () => {
					const afectados = b.afectados.map((a) => {
						if (a.calificacion !== "APTO" || a.cartaNotificadaEl) return a;
						registrarHito(a.codigo, "bloque_carta", cartas, "liberacion-bloque", "cartaNotificadaEl");
						registrarEnvio({
							proyecto: projectId,
							predio: a.codigo,
							paso: "liberacion-bloque",
							canal: "Carta de intención",
							destinatario: a.nombres,
							documento: `Bloque ${b.nombre}`,
							detalle: `Fecha de notificación: ${cartas}`
						}, {
							modulo: 4,
							entidad: "bloque"
						});
						return {
							...a,
							cartaNotificadaEl: cartas
						};
					});
					guardar({
						...b,
						afectados,
						etapa: "LIBERACION"
					}, "Notificó cartas de intención", b.nombre, void 0, "Cartas registradas. El plazo de respuesta corre en cada predio.");
					setCartas(null);
				},
				children: [/* @__PURE__ */ jsx(Mail, {}), " Registrar notificación"]
			})] }),
			children: /* @__PURE__ */ jsx(FormGrid, {
				columnas: 1,
				children: /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Fecha de notificación",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: cartas ?? "",
						onChange: (e) => setCartas(e.target.value)
					})
				})
			})
		}),
		/* @__PURE__ */ jsxs(Modal, {
			abierto: baja !== null,
			onCerrar: () => setBaja(null),
			ancho: "sm",
			titulo: baja?.titulo ?? "",
			descripcion: "El histórico del bloque conserva los datos y el motivo.",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setBaja(null),
				children: "Cancelar"
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "destructive",
				disabled: motivo.trim().length < 5,
				onClick: () => {
					if (!baja) return;
					guardar(baja.aplicar(b), baja.titulo, baja.objeto, motivo.trim());
					setBaja(null);
				},
				children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar"]
			})] }),
			children: [/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-baja-bloque",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}), /* @__PURE__ */ jsx("textarea", {
				id: "motivo-baja-bloque",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value)
			})]
		})
	] });
}
function FormAfectado({ inicial, nuevo, projectId, sectores, ocupado, onCerrar, onGuardar }) {
	const [a, setA] = useState(inicial);
	const set = (k, v) => setA((x) => ({
		...x,
		[k]: v
	}));
	const predios = prediosDelProyecto(projectId);
	const predio = predios.find((p) => p.codigo === a.codigo);
	const enOtro = nuevo && a.codigo ? ocupado(a.codigo) : void 0;
	const errorPredio = !a.codigo ? void 0 : !predio ? "El código no está en el padrón del proyecto." : enOtro ? `El predio ya está en el bloque ${enOtro}.` : void 0;
	const valida = predio && !enOtro && a.sector && a.nombres.trim() && a.area > 0 && (a.calificacion !== "OBSERVADO" || a.observacion.trim());
	const campo = (etiqueta, control, obligatorio = false) => /* @__PURE__ */ jsx(FormField, {
		etiqueta,
		obligatorio,
		children: control
	});
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "xl",
		titulo: nuevo ? "Empadronar afectado" : `Afectado ${inicial.codigo}`,
		descripcion: "Datos del empadronamiento (art. 54) y calificación de la condición jurídica (art. 55).",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			disabled: !valida,
			onClick: () => onGuardar(a),
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar afectado"]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Predio del proyecto",
				obligatorio: true,
				error: errorPredio,
				children: (id) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("input", {
					id,
					list: "predios-bloque",
					className: `${controlClase} font-mono`,
					value: a.codigo,
					disabled: !nuevo,
					placeholder: "Escriba o elija el código",
					onChange: (e) => {
						const codigo = e.target.value.trim();
						const p = predios.find((x) => x.codigo === codigo);
						setA((x) => ({
							...x,
							codigo,
							nombres: p && !x.nombres ? p.sujetos[0] ?? "" : x.nombres,
							area: p && !x.area ? Number(p.area.replace(/,/g, "")) || 0 : x.area
						}));
					}
				}), /* @__PURE__ */ jsx("datalist", {
					id: "predios-bloque",
					children: predios.map((p) => /* @__PURE__ */ jsx("option", {
						value: p.codigo,
						children: p.sujeto
					}, p.codigo))
				})] })
			}),
			campo("Sector", (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				value: a.sector,
				onChange: (e) => set("sector", e.target.value),
				children: sectores.map((s) => /* @__PURE__ */ jsx("option", {
					value: s.id,
					children: s.nombre
				}, s.id))
			}), true),
			campo("Nombres o razón social", (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				value: a.nombres,
				onChange: (e) => set("nombres", e.target.value)
			}), true),
			campo("Documento de identidad", (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				value: a.documento,
				placeholder: "DNI o RUC",
				onChange: (e) => set("documento", e.target.value)
			})),
			campo("Condición", (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				value: a.condicion,
				onChange: (e) => set("condicion", e.target.value),
				children: Object.entries(CONDICION).map(([k, v]) => /* @__PURE__ */ jsx("option", {
					value: k,
					children: v
				}, k))
			}), true),
			campo("Área afectada (m²)", (id) => /* @__PURE__ */ jsx("input", {
				id,
				type: "number",
				min: 0,
				step: "0.01",
				className: `${controlClase} tabular-nums`,
				value: a.area || "",
				onChange: (e) => set("area", Number(e.target.value))
			}), true),
			campo("Zona", (id) => /* @__PURE__ */ jsxs("select", {
				id,
				className: controlClase,
				value: a.zona,
				onChange: (e) => set("zona", e.target.value),
				children: [/* @__PURE__ */ jsx("option", {
					value: "URBANA",
					children: "Urbana"
				}), /* @__PURE__ */ jsx("option", {
					value: "RURAL",
					children: "Rural"
				})]
			})),
			campo("Calificación", (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				value: a.calificacion,
				onChange: (e) => set("calificacion", e.target.value),
				children: Object.entries(CALIFICACION).map(([k, [v]]) => /* @__PURE__ */ jsx("option", {
					value: k,
					children: v
				}, k))
			})),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observación de la calificación",
				obligatorio: a.calificacion === "OBSERVADO",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 2,
					className: `${controlClase} h-auto py-2`,
					value: a.observacion,
					onChange: (e) => set("observacion", e.target.value)
				})
			})
		] })
	});
}
//#endregion
export { LiberacionBloquePage as component };
