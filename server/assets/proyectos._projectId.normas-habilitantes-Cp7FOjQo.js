import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { a as prediosDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { o as archivoDe } from "./sujetoPasivo-Cz4oBCnt.js";
import { $ as estadoLey, Dt as BotonIcono, E as Modal, N as ListaDocumentos, Z as NOMBRE_MODALIDAD_OBRA, et as guardarNormasProyecto, nt as useNormasProyecto, tt as idNorma } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.normas-habilitantes-CMEprl3k.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Gavel, History, Pencil, Plus, Save, Trash2 } from "lucide-react";
//#region src/routes/proyectos.$projectId.normas-habilitantes.tsx?tsr-split=component
var TONO_LEY = {
	VIGENTE: "success",
	CADUCA_PRONTO: "warning",
	CADUCADA: "destructive",
	SIN_FECHA: "neutral"
};
var NOMBRE_ESTADO_LEY = {
	VIGENTE: "Vigente",
	CADUCA_PRONTO: "Caduca pronto",
	CADUCADA: "Caducada",
	SIN_FECHA: "Sin fecha de vigencia"
};
var TIPO_DECLARATORIA = {
	LEY: "Ley",
	DECRETO_SUPREMO: "Decreto supremo",
	RESOLUCION: "Resolución"
};
var leyVacia = () => ({
	id: idNorma(),
	numero: "",
	nombre: "",
	publicacion: "",
	vigencia: "",
	razon: "",
	alcance: "proyecto",
	predios: [],
	documento: null
});
var QUITAR_NOMBRE = {
	ley: "ley autoritativa",
	declaratoria: "declaratoria",
	poligono: "polígono"
};
var OBRA_VACIA = {
	modalidadObra: "ORDINARIA",
	arcc: false,
	poligonos: []
};
var poligonoVacio = () => ({
	id: idNorma(),
	nombre: "",
	resolucion: "",
	fecha: "",
	areaHa: "",
	archivo: null
});
var declaratoriaVacia = () => ({
	id: idNorma(),
	tipo: "LEY",
	numero: "",
	fecha: "",
	alcance: "",
	estado: "VIGENTE",
	documentoTramite: "",
	documento: null
});
function NormasHabilitantesPage() {
	const { projectId } = Route$1.useParams();
	const rol = useRol();
	const edita = rol === "ADMIN" || rol === "COORDINADOR" || rol === "ESP_LEGAL";
	const normas = useNormasProyecto(projectId);
	const [ley, setLey] = useState(null);
	const [declaratoria, setDeclaratoria] = useState(null);
	const obra = normas.proyecto ?? OBRA_VACIA;
	const [obraBorrador, setObraBorrador] = useState(null);
	const obraActual = obraBorrador ?? obra;
	const [poligono, setPoligono] = useState(null);
	const [quitar, setQuitar] = useState(null);
	const [motivo, setMotivo] = useState("");
	const [mensaje, setMensaje] = useState(null);
	function guardarLey(l) {
		const existe = normas.leyes.some((x) => x.id === l.id);
		guardarNormasProyecto(projectId, {
			...normas,
			leyes: existe ? normas.leyes.map((x) => x.id === l.id ? l : x) : [...normas.leyes, l]
		}, existe ? "Modificó ley autoritativa" : "Registró ley autoritativa", `Ley ${l.numero}`);
		setLey(null);
		setMensaje(`Ley ${l.numero} guardada. Los predios del alcance ya pueden seguir la ruta de expropiación.`);
	}
	function guardarDeclaratoria(d) {
		const existe = normas.declaratorias.some((x) => x.id === d.id);
		guardarNormasProyecto(projectId, {
			...normas,
			declaratorias: existe ? normas.declaratorias.map((x) => x.id === d.id ? d : x) : [...normas.declaratorias, d]
		}, existe ? "Modificó declaratoria" : "Registró declaratoria", `${TIPO_DECLARATORIA[d.tipo]} ${d.numero}`);
		setDeclaratoria(null);
		setMensaje("Declaratoria guardada.");
	}
	function guardarObra() {
		if (!obraBorrador) return;
		guardarNormasProyecto(projectId, {
			...normas,
			proyecto: {
				...obra,
				...obraBorrador
			}
		}, "Modificó los datos de la obra", NOMBRE_MODALIDAD_OBRA[obraBorrador.modalidadObra]);
		setObraBorrador(null);
		setMensaje("Datos de la obra guardados. Los predios del proyecto ya los heredan.");
	}
	function guardarPoligono(p) {
		const existe = obra.poligonos.some((x) => x.id === p.id);
		guardarNormasProyecto(projectId, {
			...normas,
			proyecto: {
				...obra,
				poligonos: existe ? obra.poligonos.map((x) => x.id === p.id ? p : x) : [...obra.poligonos, p]
			}
		}, existe ? "Modificó polígono" : "Registró polígono", p.nombre);
		setPoligono(null);
		setMensaje(`Polígono ${p.nombre} guardado.`);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(ProyectoEncabezado, {
			projectId,
			titulo: "Normas habilitantes",
			icono: Gavel,
			descripcion: "Ley autoritativa de expropiación (art. 25 y 33) y declaratoria de necesidad pública (art. 41.1). Cada predio del alcance las hereda."
		}),
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(null),
			children: mensaje
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "leyes",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "leyes",
							children: [
								"Leyes autoritativas (",
								normas.leyes.length,
								")"
							]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "declaratorias",
							children: [
								"Declaratorias (",
								normas.declaratorias.length,
								")"
							]
						}),
						/* @__PURE__ */ jsxs(TabsTrigger, {
							value: "obra",
							children: [
								"Obra y polígonos (",
								obra.poligonos.length,
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
					value: "leyes",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Leyes autoritativas de expropiación",
						acciones: edita && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							onClick: () => setLey(leyVacia()),
							children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar ley"]
						}),
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-sm text-muted-foreground",
							children: "Sin ley autoritativa vigente no hay expropiación (art. 25). El derecho de expropiar caduca a los 60 meses de su vigencia si no se inicia el procedimiento (art. 33)."
						}), /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "numero",
									titulo: "Ley",
									render: (l) => /* @__PURE__ */ jsxs("span", {
										className: "font-medium",
										children: ["Ley ", l.numero]
									})
								},
								{
									clave: "nombre",
									titulo: "Denominación"
								},
								{
									clave: "vigencia",
									titulo: "Vigencia",
									render: (l) => l.vigencia ? fecha(l.vigencia) : "Sin fecha"
								},
								{
									clave: "caduca",
									titulo: "Caducidad (art. 33)",
									render: (l) => {
										const e = estadoLey(l);
										return /* @__PURE__ */ jsxs("span", {
											className: "flex flex-col items-start gap-0.5",
											children: [/* @__PURE__ */ jsx(StatusBadge, {
												tono: TONO_LEY[e.estado],
												children: NOMBRE_ESTADO_LEY[e.estado]
											}), e.caduca && /* @__PURE__ */ jsx("span", {
												className: "text-xs text-muted-foreground",
												children: fecha(e.caduca)
											})]
										});
									}
								},
								{
									clave: "alcance",
									titulo: "Alcance",
									render: (l) => l.alcance === "proyecto" ? "Todo el proyecto" : `${l.predios.length} predios`
								},
								{
									clave: "acciones",
									titulo: "Acciones",
									alinear: "derecha",
									render: (l) => edita && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex gap-1",
										children: [/* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Editar ley",
											icono: Pencil,
											onClick: () => setLey(l)
										}), /* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Quitar ley",
											icono: Trash2,
											destructiva: true,
											onClick: () => {
												setMotivo("");
												setQuitar({
													tipo: "ley",
													id: l.id,
													nombre: `Ley ${l.numero}`
												});
											}
										})]
									})
								}
							],
							filas: normas.leyes,
							claveFila: (l) => l.id,
							vacio: "Aún no hay ley autoritativa registrada para este proyecto."
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "declaratorias",
					children: /* @__PURE__ */ jsxs(Section, {
						titulo: "Declaratoria de necesidad pública",
						acciones: edita && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							onClick: () => setDeclaratoria(declaratoriaVacia()),
							children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar declaratoria"]
						}),
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-sm text-muted-foreground",
							children: "La transferencia de predios estatales puede pedirse a la SBN antes de la declaratoria (art. 41.1): regístrela como «en trámite» con el documento con el que se elevó."
						}), /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "tipo",
									titulo: "Norma",
									render: (d) => `${TIPO_DECLARATORIA[d.tipo]} ${d.numero}`
								},
								{
									clave: "fecha",
									titulo: "Fecha",
									render: (d) => d.fecha ? fecha(d.fecha) : "Sin fecha"
								},
								{
									clave: "alcance",
									titulo: "Alcance"
								},
								{
									clave: "estado",
									titulo: "Estado",
									render: (d) => /* @__PURE__ */ jsx(StatusBadge, {
										tono: d.estado === "VIGENTE" ? "success" : "warning",
										children: d.estado === "VIGENTE" ? "Vigente" : "En trámite"
									})
								},
								{
									clave: "acciones",
									titulo: "Acciones",
									alinear: "derecha",
									render: (d) => edita && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex gap-1",
										children: [/* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Editar declaratoria",
											icono: Pencil,
											onClick: () => setDeclaratoria(d)
										}), /* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Quitar declaratoria",
											icono: Trash2,
											destructiva: true,
											onClick: () => {
												setMotivo("");
												setQuitar({
													tipo: "declaratoria",
													id: d.id,
													nombre: `${TIPO_DECLARATORIA[d.tipo]} ${d.numero}`
												});
											}
										})]
									})
								}
							],
							filas: normas.declaratorias,
							claveFila: (d) => d.id,
							vacio: "Aún no hay declaratoria registrada."
						})]
					})
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "obra",
					children: [/* @__PURE__ */ jsx(Section, {
						titulo: "Datos de la obra",
						acciones: edita && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							disabled: !obraBorrador,
							onClick: guardarObra,
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar"]
						}),
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Modalidad de la obra",
							ayuda: "Con contrato NEC u obra de ejecución inmediata se habilita la liberación anticipada de áreas en cada predio.",
							children: (id) => /* @__PURE__ */ jsx("select", {
								id,
								className: controlClase,
								disabled: !edita,
								value: obraActual.modalidadObra,
								onChange: (ev) => setObraBorrador({
									...obraActual,
									modalidadObra: ev.target.value
								}),
								children: Object.entries(NOMBRE_MODALIDAD_OBRA).map(([k, v]) => /* @__PURE__ */ jsx("option", {
									value: k,
									children: v
								}, k))
							})
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Reconstrucción con Cambios",
							ayuda: "Marque si el proyecto es de la ARCC: los predios muestran las referencias a la Ley 30556.",
							children: /* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-2 pt-2 text-sm",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									className: "size-4 accent-primary",
									disabled: !edita,
									checked: obraActual.arcc,
									onChange: (ev) => setObraBorrador({
										...obraActual,
										arcc: ev.target.checked
									})
								}), "Proyecto ARCC (Ley 30556)"]
							})
						})] })
					}), /* @__PURE__ */ jsxs(Section, {
						titulo: "Polígonos del PMD aprobado por la DGAC",
						className: "mt-4",
						acciones: edita && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							onClick: () => setPoligono(poligonoVacio()),
							children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar polígono"]
						}),
						children: [/* @__PURE__ */ jsx("p", {
							className: "mb-3 text-sm text-muted-foreground",
							children: "Primer paso del flujograma de la DDP: los polígonos necesarios para la obra, según el plan maestro de desarrollo aprobado por la DGAC."
						}), /* @__PURE__ */ jsx(Tabla, {
							columnas: [
								{
									clave: "nombre",
									titulo: "Polígono",
									render: (p) => /* @__PURE__ */ jsx("span", {
										className: "font-medium",
										children: p.nombre
									})
								},
								{
									clave: "resolucion",
									titulo: "Resolución"
								},
								{
									clave: "fecha",
									titulo: "Fecha",
									render: (p) => p.fecha ? fecha(p.fecha) : "Sin fecha"
								},
								{
									clave: "areaHa",
									titulo: "Área (ha)",
									alinear: "derecha"
								},
								{
									clave: "acciones",
									titulo: "Acciones",
									alinear: "derecha",
									render: (p) => edita && /* @__PURE__ */ jsxs("span", {
										className: "inline-flex gap-1",
										children: [/* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Editar polígono",
											icono: Pencil,
											onClick: () => setPoligono(p)
										}), /* @__PURE__ */ jsx(BotonIcono, {
											nombre: "Quitar polígono",
											icono: Trash2,
											destructiva: true,
											onClick: () => {
												setMotivo("");
												setQuitar({
													tipo: "poligono",
													id: p.id,
													nombre: p.nombre
												});
											}
										})]
									})
								}
							],
							filas: obra.poligonos,
							claveFila: (p) => p.id,
							vacio: "Aún no hay polígonos registrados."
						})]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico de las normas del proyecto",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `normas-${projectId}`,
							nombreArchivo: `historico-normas-${projectId}`
						})
					})
				})
			]
		}),
		ley && /* @__PURE__ */ jsx(FormLey, {
			projectId,
			inicial: ley,
			onCerrar: () => setLey(null),
			onGuardar: guardarLey
		}),
		poligono && /* @__PURE__ */ jsx(FormPoligono, {
			inicial: poligono,
			onCerrar: () => setPoligono(null),
			onGuardar: guardarPoligono
		}),
		declaratoria && /* @__PURE__ */ jsx(FormDeclaratoria, {
			inicial: declaratoria,
			onCerrar: () => setDeclaratoria(null),
			onGuardar: guardarDeclaratoria
		}),
		/* @__PURE__ */ jsxs(Modal, {
			abierto: quitar !== null,
			onCerrar: () => setQuitar(null),
			ancho: "sm",
			titulo: `Quitar ${quitar?.nombre ?? ""}`,
			descripcion: quitar?.tipo === "poligono" ? "El polígono sale de la lista. El histórico conserva sus datos y el motivo." : "Los predios dejan de heredarla. El histórico conserva sus datos y el motivo.",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setQuitar(null),
				children: "Cancelar"
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "destructive",
				disabled: motivo.trim().length < 5,
				onClick: () => {
					if (!quitar) return;
					guardarNormasProyecto(projectId, quitar.tipo === "ley" ? {
						...normas,
						leyes: normas.leyes.filter((l) => l.id !== quitar.id)
					} : quitar.tipo === "poligono" ? {
						...normas,
						proyecto: {
							...obra,
							poligonos: obra.poligonos.filter((p) => p.id !== quitar.id)
						}
					} : {
						...normas,
						declaratorias: normas.declaratorias.filter((d) => d.id !== quitar.id)
					}, `Quitó ${QUITAR_NOMBRE[quitar.tipo]}`, quitar.nombre, motivo.trim());
					setQuitar(null);
				},
				children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar"]
			})] }),
			children: [/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-norma",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}), /* @__PURE__ */ jsx("textarea", {
				id: "motivo-norma",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value)
			})]
		})
	] });
}
function FormLey({ projectId, inicial, onCerrar, onGuardar }) {
	const [l, setL] = useState(inicial);
	const [buscar, setBuscar] = useState("");
	const set = (k, v) => setL((x) => ({
		...x,
		[k]: v
	}));
	const visibles = prediosDelProyecto(projectId).filter((p) => !buscar || p.buscar.includes(buscar.toLowerCase())).slice(0, 40);
	const e = estadoLey(l);
	const valida = l.numero.trim() && l.vigencia && l.razon.trim() && (l.alcance === "proyecto" || l.predios.length > 0);
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "xl",
		titulo: inicial.numero ? `Ley ${inicial.numero}` : "Registrar ley autoritativa",
		descripcion: "La ley debe señalar la razón de necesidad pública o seguridad nacional (art. 25).",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			disabled: !valida,
			onClick: () => onGuardar(l),
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar ley"]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Número de ley",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: l.numero,
					onChange: (ev) => set("numero", ev.target.value),
					placeholder: "31234"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Denominación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: l.nombre,
					onChange: (ev) => set("nombre", ev.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Publicación en El Peruano",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: l.publicacion,
					onChange: (ev) => set("publicacion", ev.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Vigencia",
				obligatorio: true,
				ayuda: e.caduca ? `Caduca el ${fecha(e.caduca)} (60 meses, art. 33).` : "Desde ella corren los 60 meses del art. 33.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: l.vigencia,
					onChange: (ev) => set("vigencia", ev.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Razón de necesidad pública o seguridad nacional",
				obligatorio: true,
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 2,
					className: `${controlClase} h-auto py-2`,
					value: l.razon,
					onChange: (ev) => set("razon", ev.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Alcance",
				ancho: "doble",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex gap-4 pt-2 text-sm",
					children: ["proyecto", "predios"].map((a) => /* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("input", {
							type: "radio",
							name: "alcance-ley",
							className: "accent-primary",
							checked: l.alcance === a,
							onChange: () => set("alcance", a)
						}), a === "proyecto" ? "Todos los predios del proyecto" : "Predios listados en la ley"]
					}, a))
				})
			}),
			l.alcance === "predios" && /* @__PURE__ */ jsx(FormField, {
				etiqueta: `Predios (${l.predios.length})`,
				ancho: "doble",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
					className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted mb-2`,
					placeholder: "Buscar predio",
					"aria-label": "Buscar predio",
					value: buscar,
					onChange: (ev) => setBuscar(ev.target.value)
				}), /* @__PURE__ */ jsx("div", {
					className: "max-h-48 overflow-y-auto rounded-md border border-border p-2 text-sm",
					children: visibles.map((p) => /* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2 py-0.5",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								className: "accent-primary",
								checked: l.predios.includes(p.codigo),
								onChange: (ev) => set("predios", ev.target.checked ? [...l.predios, p.codigo] : l.predios.filter((c) => c !== p.codigo))
							}),
							/* @__PURE__ */ jsx("span", {
								className: "font-mono text-xs",
								children: p.cod
							}),
							/* @__PURE__ */ jsx("span", {
								className: "truncate text-muted-foreground",
								children: p.sujeto
							})
						]
					}, p.codigo))
				})] })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Ley publicada",
				ancho: "doble",
				children: /* @__PURE__ */ jsx(ListaDocumentos, {
					items: [{
						clave: "documento",
						nombre: "Ley (PDF)",
						archivo: l.documento,
						accept: ".pdf"
					}],
					onCargar: (_, f) => set("documento", archivoDe(f)),
					onQuitar: () => set("documento", null)
				})
			})
		] })
	});
}
function FormPoligono({ inicial, onCerrar, onGuardar }) {
	const [p, setP] = useState(inicial);
	const set = (k, v) => setP((x) => ({
		...x,
		[k]: v
	}));
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "lg",
		titulo: inicial.nombre ? `Polígono ${inicial.nombre}` : "Registrar polígono",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			disabled: !p.nombre.trim(),
			onClick: () => onGuardar(p),
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar polígono"]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: p.nombre,
					onChange: (ev) => set("nombre", ev.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Resolución de aprobación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: p.resolucion,
					onChange: (ev) => set("resolucion", ev.target.value),
					placeholder: "Resolución de la DGAC"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: p.fecha,
					onChange: (ev) => set("fecha", ev.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área (ha)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "number",
					min: "0",
					step: "0.0001",
					className: `${controlClase} tabular-nums`,
					value: p.areaHa,
					onChange: (ev) => set("areaHa", ev.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Archivo",
				ancho: "doble",
				children: /* @__PURE__ */ jsx(ListaDocumentos, {
					items: [{
						clave: "archivo",
						nombre: "Polígono o plano (PDF, KMZ o SHP)",
						archivo: p.archivo,
						accept: ".pdf,.kmz,.kml,.zip,.shp"
					}],
					onCargar: (_, f) => set("archivo", archivoDe(f)),
					onQuitar: () => set("archivo", null)
				})
			})
		] })
	});
}
function FormDeclaratoria({ inicial, onCerrar, onGuardar }) {
	const [d, setD] = useState(inicial);
	const set = (k, v) => setD((x) => ({
		...x,
		[k]: v
	}));
	const valida = d.numero.trim() && (d.estado === "EN_TRAMITE" ? d.documentoTramite.trim() : d.fecha);
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "lg",
		titulo: inicial.numero ? `${TIPO_DECLARATORIA[inicial.tipo]} ${inicial.numero}` : "Registrar declaratoria",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			disabled: !valida,
			onClick: () => onGuardar(d),
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar declaratoria"]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de norma",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: d.tipo,
					onChange: (ev) => set("tipo", ev.target.value),
					children: Object.entries(TIPO_DECLARATORIA).map(([k, v]) => /* @__PURE__ */ jsx("option", {
						value: k,
						children: v
					}, k))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Número",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: d.numero,
					onChange: (ev) => set("numero", ev.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: d.estado,
					onChange: (ev) => set("estado", ev.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "VIGENTE",
						children: "Vigente"
					}), /* @__PURE__ */ jsx("option", {
						value: "EN_TRAMITE",
						children: "En trámite"
					})]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha",
				obligatorio: d.estado === "VIGENTE",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: d.fecha,
					onChange: (ev) => set("fecha", ev.target.value)
				})
			}),
			d.estado === "EN_TRAMITE" && /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Documento con que se elevó",
				obligatorio: true,
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
					value: d.documentoTramite,
					onChange: (ev) => set("documentoTramite", ev.target.value),
					placeholder: "Oficio o informe y su fecha"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Alcance",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: d.alcance,
					onChange: (ev) => set("alcance", ev.target.value),
					placeholder: "Proyecto, tramo u obra que declara"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Documento",
				ancho: "doble",
				children: /* @__PURE__ */ jsx(ListaDocumentos, {
					items: [{
						clave: "documento",
						nombre: "Norma (PDF)",
						archivo: d.documento,
						accept: ".pdf"
					}],
					onCargar: (_, f) => set("documento", archivoDe(f)),
					onQuitar: () => set("documento", null)
				})
			})
		] })
	});
}
//#endregion
export { NormasHabilitantesPage as component };
