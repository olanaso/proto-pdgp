import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.evaluacion-informacion-CcwlkcWZ.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { i as useRegistroProyecto } from "./registroProyecto-D7FBQbZo.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, ClipboardCheck, FileCheck2, FileText, History, Paperclip, Plus, Save, Upload, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.evaluacion-informacion.tsx?tsr-split=component
var REGISTRO_INICIAL = {
	decision: "pendiente",
	evaluacionCerrada: false,
	selectedAnexos: ["a1", "a2"],
	observaciones: "",
	necesidades: [],
	servicios: []
};
var ETIQUETAS = {
	decision: "Decisión de la evaluación",
	evaluacionCerrada: "Evaluación cerrada",
	selectedAnexos: "Anexos evaluados",
	observaciones: "Observaciones",
	necesidades: "Necesidad",
	servicios: "Servicio",
	tipo: "Tipo",
	descripcion: "Descripción",
	sustento: "Sustento",
	prioridad: "Prioridad",
	responsable: "Responsable",
	fechaRegistro: "Fecha de registro",
	anexos: "Anexos",
	tdr: "TDR",
	estado: "Estado",
	necesidadId: "Necesidad asociada",
	proveedor: "Proveedor",
	ordenServicio: "Orden de servicio",
	fechaInicio: "Inicio",
	fechaEntrega: "Entrega",
	entregables: "Entregables"
};
/** Los anexos a evaluar son los documentos y polígonos que llegaron con la solicitud STD al registro. */
function anexosDelRegistro(r) {
	const fila = (nombre, tipo, std, i) => ({
		id: `anx-${i + 1}`,
		codigo: `ANX-${String(i + 1).padStart(3, "0")}`,
		nombre,
		tipo,
		origen: std ? "Transferencia de información" : "Registro directo",
		entidad: std ? `${r.solicitante} · STD ${r.hojaRuta}` : "DDP",
		fechaRecepcion: r.docOrigenFecha,
		responsable: r.coordinadorPredial,
		estado: "Recibido"
	});
	const docs = r.adjuntos.map((a, i) => fila(a.nombre, a.tipo, a.origen === "STD", i));
	const pols = r.poligonos.map((pol, i) => fila(`${pol.archivo} (${pol.descripcion}, ${pol.areaHa})`, "Archivo geográfico", true, docs.length + i));
	return [...docs, ...pols];
}
var anexosDemo = [
	{
		id: "a1",
		codigo: "ANX-001",
		nombre: "Plano perimétrico preliminar del área del proyecto",
		tipo: "Plano",
		origen: "Registro directo",
		entidad: "DDP",
		fechaRecepcion: "2026-06-18",
		responsable: "Ing. Diana Flores",
		estado: "Validado"
	},
	{
		id: "a2",
		codigo: "ANX-002",
		nombre: "Relación de predios afectados por transferencia",
		tipo: "Cuadro predial",
		origen: "Transferencia de información",
		entidad: "Concesionario",
		fechaRecepcion: "2026-06-20",
		responsable: "Gady Gabriela Quiroz Pinchi",
		estado: "Recibido"
	},
	{
		id: "a3",
		codigo: "ANX-003",
		nombre: "Archivo KMZ del eje del proyecto",
		tipo: "Archivo geográfico",
		origen: "Transferencia de información",
		entidad: "Oficina GIS",
		fechaRecepcion: "2026-06-22",
		responsable: "Luis Enrique Ponce Muñoz",
		estado: "Observado"
	},
	{
		id: "a4",
		codigo: "ANX-004",
		nombre: "Informe de compatibilidad catastral inicial",
		tipo: "Informe técnico",
		origen: "Registro directo",
		entidad: "Equipo predial",
		fechaRecepcion: "2026-06-24",
		responsable: "Christian Aliaga Vasquez",
		estado: "Recibido"
	}
];
var tipoNecesidadOptions = [
	"Levantamiento topográfico",
	"Verificación catastral",
	"Búsqueda registral",
	"Saneamiento físico legal",
	"Inspección de campo",
	"Otro servicio especializado"
];
var responsables = [
	"Gady Gabriela Quiroz Pinchi",
	"Luis Enrique Ponce Muñoz",
	"Diana Flores",
	"Pedro Ramírez"
];
var ESTADOS_SERVICIO = [
	"Por contratar",
	"En ejecución",
	"Entregado",
	"Conforme"
];
function tonoEstado(value) {
	if ([
		"Validado",
		"Atendida",
		"Conforme",
		"Cerrada"
	].includes(value)) return "success";
	if ([
		"Recibido",
		"Registrada",
		"Por contratar",
		"Convertida a servicio"
	].includes(value)) return "warning";
	if (["En ejecución", "Entregado"].includes(value)) return "primary";
	return "destructive";
}
var PRIORIDAD_TONO = {
	Alta: "destructive",
	Media: "warning",
	Baja: "success"
};
/** Fecha aaaa-mm-dd a dd/mm/aaaa sin corrimiento de zona horaria. */
var fechaCorta = (iso) => iso ? fecha(`${iso}T00:00:00`) : "";
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function nextNumero(prefix, total) {
	return `${prefix}-2026-${String(total + 1).padStart(4, "0")}`;
}
var opciones = (lista) => lista.map((o) => /* @__PURE__ */ jsx("option", {
	value: o,
	children: o
}, o));
function EvaluacionInformacionPage() {
	const { projectId } = Route$1.useParams();
	const navigate = useNavigate();
	const rol = useRol();
	const claveHistorial = `evaluacion-informacion-${projectId}`;
	const registro = useRegistroProyecto(projectId);
	const anexosRegistrados = useMemo(() => registro && registro.adjuntos.length + registro.poligonos.length ? anexosDelRegistro(registro) : anexosDemo, [registro]);
	const versiones = useHistorial(claveHistorial);
	const base = useRef(REGISTRO_INICIAL);
	const [decision, setDecision] = useState("pendiente");
	const [evaluacionCerrada, setEvaluacionCerrada] = useState(false);
	const [selectedAnexos, setSelectedAnexos] = useState(["a1", "a2"]);
	const [observaciones, setObservaciones] = useState("");
	const [necesidades, setNecesidades] = useState([]);
	const [servicios, setServicios] = useState([]);
	const [servicioEntrega, setServicioEntrega] = useState("");
	const [form, setForm] = useState({
		tipo: "Levantamiento topográfico",
		descripcion: "Levantamiento topográfico complementario para validar coordenadas, linderos y áreas de afectación.",
		sustento: "La información recibida no permite confirmar la geometría final del ámbito evaluado.",
		prioridad: "Alta",
		responsable: responsables[0],
		tdr: ""
	});
	const actual = {
		decision,
		evaluacionCerrada,
		selectedAnexos,
		observaciones,
		necesidades,
		servicios
	};
	const ponerRegistro = (r) => {
		setDecision(r.decision ?? "pendiente");
		setEvaluacionCerrada(Boolean(r.evaluacionCerrada));
		setSelectedAnexos(r.selectedAnexos ?? ["a1", "a2"]);
		setObservaciones(r.observaciones ?? "");
		setNecesidades(r.necesidades ?? []);
		setServicios(r.servicios ?? []);
	};
	const [hidratado, setHidratado] = useState(false);
	useEffect(() => {
		try {
			const raw = localStorage.getItem(`evaluacion-info:${projectId}`);
			if (raw) {
				const parsed = {
					...REGISTRO_INICIAL,
					...JSON.parse(raw)
				};
				ponerRegistro(parsed);
				base.current = parsed;
			} else setSelectedAnexos(anexosRegistrados.map((a) => a.id));
		} catch {}
		setHidratado(true);
	}, [projectId]);
	/** Deja la versión en el histórico, salvo que no haya cambiado nada respecto de la última. */
	const versionar = (despues, accion, objeto, motivo) => {
		const ultima = versiones[0]?.registro ?? base.current;
		if (JSON.stringify(ultima) === JSON.stringify(despues) && versiones.length > 0) return;
		registrarCambio(claveHistorial, {
			accion,
			objeto,
			motivo,
			antes: base.current,
			despues
		}, {
			modulo: 11,
			entidad: "evaluacion_informacion"
		});
		base.current = despues;
	};
	/** Aplica un cambio guardado por el usuario: actualiza la pantalla y deja la versión. */
	const aplicar = (parche, accion, objeto) => {
		const despues = {
			...actual,
			...parche
		};
		ponerRegistro(despues);
		versionar(despues, accion, objeto);
	};
	useEffect(() => {
		if (!hidratado) return;
		try {
			localStorage.setItem(`evaluacion-info:${projectId}`, JSON.stringify({
				decision,
				evaluacionCerrada,
				selectedAnexos,
				observaciones,
				necesidades,
				servicios
			}));
		} catch {}
	}, [
		hidratado,
		decision,
		evaluacionCerrada,
		necesidades,
		observaciones,
		projectId,
		selectedAnexos,
		servicios
	]);
	const anexosSeleccionados = useMemo(() => anexosRegistrados.filter((a) => selectedAnexos.includes(a.id)), [selectedAnexos, anexosRegistrados]);
	const toggleAnexo = (id) => {
		setSelectedAnexos((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	};
	const cerrarSinNecesidad = () => {
		aplicar({
			decision: "sin_necesidad",
			evaluacionCerrada: true,
			necesidades: [],
			servicios: []
		}, "Cerró la evaluación sin necesidad", `${selectedAnexos.length} anexos evaluados`);
	};
	const registrarNecesidad = () => {
		if (!form.descripcion.trim() || !form.sustento.trim()) return;
		const necesidad = {
			id: `nec-${Date.now()}`,
			numero: nextNumero("NEC", necesidades.length),
			tipo: form.tipo,
			descripcion: form.descripcion,
			sustento: form.sustento,
			prioridad: form.prioridad,
			responsable: form.responsable,
			fechaRegistro: today(),
			anexos: selectedAnexos,
			tdr: form.tdr || "TDR pendiente de adjuntar",
			estado: "Registrada"
		};
		aplicar({
			decision: "con_necesidad",
			evaluacionCerrada: false,
			necesidades: [necesidad, ...necesidades]
		}, "Registró necesidad", `${necesidad.numero} · ${necesidad.tipo}`);
		setForm((current) => ({
			...current,
			descripcion: "",
			sustento: "",
			tdr: ""
		}));
	};
	const convertirAServicio = (necesidad) => {
		if (servicios.some((s) => s.necesidadId === necesidad.id)) return;
		const servicio = {
			id: `srv-${Date.now()}`,
			necesidadId: necesidad.id,
			numero: nextNumero("SRV", servicios.length),
			proveedor: "",
			ordenServicio: "",
			fechaInicio: today(),
			fechaEntrega: "",
			estado: "Por contratar",
			entregables: [],
			observaciones: ""
		};
		aplicar({
			servicios: [servicio, ...servicios],
			necesidades: necesidades.map((item) => item.id === necesidad.id ? {
				...item,
				estado: "Convertida a servicio"
			} : item)
		}, "Convirtió necesidad en servicio", `${servicio.numero} desde ${necesidad.numero}`);
	};
	const sinServicio = (n) => !servicios.some((s) => s.necesidadId === n.id);
	const hayNecesidadPendiente = necesidades.some(sinServicio);
	const agregarServicio = () => {
		const necesidadPendiente = necesidades.find(sinServicio);
		if (!necesidadPendiente) return;
		convertirAServicio(necesidadPendiente);
	};
	const volverAlProyecto = () => {
		navigate({
			to: "/proyectos/$projectId",
			params: { projectId }
		});
	};
	/** Cambia un campo del servicio. Selectores: queda versión al instante; texto y fechas, al salir del campo. */
	const updateServicio = (id, key, value) => {
		setServicios((items) => items.map((s) => s.id === id ? {
			...s,
			[key]: value
		} : s));
	};
	const versionarServicio = (id, campo) => {
		const s = servicios.find((x) => x.id === id);
		if (s) versionar(actual, "Modificó servicio", `${s.numero}: ${campo}`);
	};
	const addEntregables = (id, files) => {
		if (!files?.length) return;
		const names = Array.from(files).map((file) => file.name);
		aplicar({ servicios: servicios.map((s) => s.id === id ? {
			...s,
			entregables: [...s.entregables, ...names],
			estado: "Entregado"
		} : s) }, "Subió entregables", `${names.length} archivo(s) a ${servicios.find((s) => s.id === id)?.numero ?? "servicio"}`);
	};
	const estadoEvaluacion = evaluacionCerrada ? {
		texto: "Cerrada sin necesidad",
		tono: "success"
	} : decision === "con_necesidad" ? {
		texto: "Con necesidad",
		tono: "warning"
	} : {
		texto: "En evaluación",
		tono: "neutral"
	};
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [/* @__PURE__ */ jsx(ProyectoEncabezado, {
			projectId,
			titulo: "Evaluación de información recibida",
			icono: ClipboardCheck,
			descripcion: "Diagnóstico técnico general: anexos recibidos, necesidades y servicios derivados.",
			acciones: /* @__PURE__ */ jsx(StatusBadge, {
				tono: estadoEvaluacion.tono,
				children: estadoEvaluacion.texto
			})
		}), /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "evaluacion",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "evaluacion",
						children: "Evaluación"
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
				/* @__PURE__ */ jsx(TabsContent, {
					value: "evaluacion",
					children: /* @__PURE__ */ jsxs("form", {
						className: "space-y-4",
						onSubmit: (event) => {
							event.preventDefault();
							if (decision === "sin_necesidad") cerrarSinNecesidad();
							if (decision === "con_necesidad") registrarNecesidad();
						},
						children: [
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Información recibida registrada en el proyecto",
								children: [registro ? /* @__PURE__ */ jsx("div", {
									className: "mb-3",
									children: /* @__PURE__ */ jsxs(Aviso, {
										tipo: "info",
										children: [
											"Documentos y polígonos recibidos con la solicitud ",
											registro.hojaRuta,
											" (",
											registro.solicitante,
											") en el registro del proyecto.",
											" ",
											/* @__PURE__ */ jsx(Link, {
												to: "/proyectos/registro",
												search: { id: projectId },
												className: "font-semibold underline",
												children: "Ver registro"
											}),
											" ",
											"·",
											" ",
											/* @__PURE__ */ jsx(Link, {
												to: "/proyectos/$projectId/base-grafica",
												params: { projectId },
												className: "font-semibold underline",
												children: "Base gráfica"
											})
										]
									})
								}) : /* @__PURE__ */ jsx("p", {
									className: "mb-3 rounded-md bg-warning-soft px-3 py-1.5 text-xs text-warning",
									children: "Datos de demostración: el proyecto no tiene registro."
								}), /* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "sel",
											titulo: "Evaluar",
											ancho: "70px",
											render: (a) => /* @__PURE__ */ jsx("input", {
												type: "checkbox",
												className: "size-4 accent-primary",
												checked: selectedAnexos.includes(a.id),
												onChange: () => toggleAnexo(a.id),
												"aria-label": `Evaluar ${a.codigo}`
											})
										},
										{
											clave: "codigo",
											titulo: "Código",
											render: (a) => /* @__PURE__ */ jsx("span", {
												className: "font-medium text-primary-dark",
												children: a.codigo
											})
										},
										{
											clave: "nombre",
											titulo: "Documento o anexo",
											render: (a) => /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1.5",
												children: [/* @__PURE__ */ jsx(FileText, {
													size: 16,
													className: "shrink-0 text-primary",
													"aria-hidden": true
												}), a.nombre]
											})
										},
										{
											clave: "tipo",
											titulo: "Tipo"
										},
										{
											clave: "origen",
											titulo: "Origen"
										},
										{
											clave: "entidad",
											titulo: "Entidad"
										},
										{
											clave: "fechaRecepcion",
											titulo: "Fecha",
											render: (a) => fechaCorta(a.fechaRecepcion)
										},
										{
											clave: "responsable",
											titulo: "Responsable"
										},
										{
											clave: "estado",
											titulo: "Estado",
											render: (a) => /* @__PURE__ */ jsx(StatusBadge, {
												tono: tonoEstado(a.estado),
												children: a.estado
											})
										}
									],
									filas: anexosRegistrados,
									claveFila: (a) => a.id,
									vacio: "No hay anexos registrados en el proyecto."
								})]
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Resultado de la evaluación",
								children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Decisión",
										obligatorio: true,
										children: /* @__PURE__ */ jsxs("div", {
											role: "group",
											"aria-label": "Decisión de la evaluación",
											className: "grid grid-cols-2 gap-2",
											children: [/* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: decision === "con_necesidad" ? "default" : "outline",
												"aria-pressed": decision === "con_necesidad",
												onClick: () => {
													setDecision("con_necesidad");
													setEvaluacionCerrada(false);
												},
												children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Existe necesidad"]
											}), /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: decision === "sin_necesidad" ? "default" : "outline",
												"aria-pressed": decision === "sin_necesidad",
												onClick: () => setDecision("sin_necesidad"),
												children: [/* @__PURE__ */ jsx(X, {}), " No existe necesidad"]
											})]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Anexos evaluados",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: `${controlClase} bg-muted`,
											readOnly: true,
											value: `${anexosSeleccionados.length} anexos`
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Observaciones",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("textarea", {
											id,
											rows: 3,
											className: `${controlClase} h-auto py-2`,
											value: observaciones,
											onChange: (event) => setObservaciones(event.target.value)
										})
									})
								] }), decision === "sin_necesidad" && /* @__PURE__ */ jsx("p", {
									role: "status",
									className: "mt-4 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
									children: "La evaluación se cerrará sin generar una necesidad ni un servicio asociado."
								})]
							}),
							decision === "con_necesidad" && /* @__PURE__ */ jsxs(Section, {
								titulo: "Registro formal de necesidad",
								children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Tipo de necesidad",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
											value: form.tipo,
											onChange: (event) => setForm({
												...form,
												tipo: event.target.value
											}),
											children: opciones(tipoNecesidadOptions)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Prioridad",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
											value: form.prioridad,
											onChange: (event) => setForm({
												...form,
												prioridad: event.target.value
											}),
											children: opciones([
												"Alta",
												"Media",
												"Baja"
											])
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Responsable",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("select", {
											id,
											className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
											value: form.responsable,
											onChange: (event) => setForm({
												...form,
												responsable: event.target.value
											}),
											children: opciones(responsables)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Descripción",
										obligatorio: true,
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("textarea", {
											id,
											rows: 3,
											className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted h-auto py-2`,
											value: form.descripcion,
											onChange: (event) => setForm({
												...form,
												descripcion: event.target.value
											})
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Sustento",
										obligatorio: true,
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("textarea", {
											id,
											rows: 3,
											className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted h-auto py-2`,
											value: form.sustento,
											onChange: (event) => setForm({
												...form,
												sustento: event.target.value
											})
										})
									})
								] }), /* @__PURE__ */ jsx("div", {
									className: "mt-3 flex justify-end",
									children: /* @__PURE__ */ jsxs(Button, {
										type: "button",
										onClick: registrarNecesidad,
										disabled: !form.descripcion.trim() || !form.sustento.trim(),
										children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar necesidad"]
									})
								})]
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Tabla de necesidades",
								children: /* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "numero",
											titulo: "N.°",
											render: (n) => /* @__PURE__ */ jsx("span", {
												className: "font-medium text-primary-dark",
												children: n.numero
											})
										},
										{
											clave: "descripcion",
											titulo: "Necesidad",
											render: (n) => /* @__PURE__ */ jsx("span", {
												className: "block max-w-xs",
												children: n.descripcion
											})
										},
										{
											clave: "tipo",
											titulo: "Tipo"
										},
										{
											clave: "prioridad",
											titulo: "Prioridad",
											render: (n) => /* @__PURE__ */ jsx(StatusBadge, {
												tono: PRIORIDAD_TONO[n.prioridad],
												children: n.prioridad
											})
										},
										{
											clave: "tdr",
											titulo: "TDR",
											render: (n) => /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ jsx(Paperclip, {
													size: 16,
													className: "shrink-0 text-primary",
													"aria-hidden": true
												}), n.tdr]
											})
										},
										{
											clave: "anexos",
											titulo: "Anexos",
											render: (n) => n.anexos.map((id) => anexosRegistrados.find((anexo) => anexo.id === id)?.codigo).filter(Boolean).join(", ")
										},
										{
											clave: "responsable",
											titulo: "Responsable"
										},
										{
											clave: "estado",
											titulo: "Estado",
											render: (n) => /* @__PURE__ */ jsx(StatusBadge, {
												tono: tonoEstado(n.estado),
												children: n.estado
											})
										},
										{
											clave: "acciones",
											titulo: "Acciones",
											alinear: "derecha",
											render: (n) => /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => convertirAServicio(n),
												disabled: !sinServicio(n),
												children: [/* @__PURE__ */ jsx(BriefcaseBusiness, {}), " Convertir en servicio"]
											})
										}
									],
									filas: necesidades,
									claveFila: (n) => n.id,
									vacio: "Sin necesidades registradas."
								})
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Servicios y entregables del proveedor",
								acciones: /* @__PURE__ */ jsxs(Button, {
									type: "button",
									size: "sm",
									onClick: agregarServicio,
									disabled: !hayNecesidadPendiente,
									children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar servicio"]
								}),
								children: /* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "numero",
											titulo: "Servicio",
											render: (s) => /* @__PURE__ */ jsx("span", {
												className: "font-medium text-primary-dark",
												children: s.numero
											})
										},
										{
											clave: "necesidadId",
											titulo: "Necesidad asociada",
											render: (s) => necesidades.find((item) => item.id === s.necesidadId)?.tipo ?? "Sin necesidad"
										},
										{
											clave: "proveedor",
											titulo: "Proveedor",
											render: (s) => /* @__PURE__ */ jsx("input", {
												className: controlClase,
												"aria-label": `Proveedor de ${s.numero}`,
												value: s.proveedor,
												onChange: (event) => updateServicio(s.id, "proveedor", event.target.value),
												onBlur: () => versionarServicio(s.id, "proveedor")
											})
										},
										{
											clave: "ordenServicio",
											titulo: "Orden de servicio",
											render: (s) => /* @__PURE__ */ jsx("input", {
												className: controlClase,
												"aria-label": `Orden de servicio de ${s.numero}`,
												value: s.ordenServicio,
												onChange: (event) => updateServicio(s.id, "ordenServicio", event.target.value),
												onBlur: () => versionarServicio(s.id, "orden de servicio")
											})
										},
										{
											clave: "fechaInicio",
											titulo: "Inicio",
											render: (s) => /* @__PURE__ */ jsx("input", {
												type: "date",
												className: controlClase,
												"aria-label": `Inicio de ${s.numero}`,
												value: s.fechaInicio,
												onChange: (event) => updateServicio(s.id, "fechaInicio", event.target.value),
												onBlur: () => versionarServicio(s.id, "fecha de inicio")
											})
										},
										{
											clave: "fechaEntrega",
											titulo: "Entrega",
											render: (s) => /* @__PURE__ */ jsx("input", {
												type: "date",
												className: controlClase,
												"aria-label": `Entrega de ${s.numero}`,
												value: s.fechaEntrega,
												onChange: (event) => updateServicio(s.id, "fechaEntrega", event.target.value),
												onBlur: () => versionarServicio(s.id, "fecha de entrega")
											})
										},
										{
											clave: "estado",
											titulo: "Estado",
											render: (s) => /* @__PURE__ */ jsx("select", {
												className: controlClase,
												"aria-label": `Estado de ${s.numero}`,
												value: s.estado,
												onChange: (event) => aplicar({ servicios: servicios.map((x) => x.id === s.id ? {
													...x,
													estado: event.target.value
												} : x) }, "Cambió el estado del servicio", `${s.numero}: ${event.target.value}`),
												children: opciones(ESTADOS_SERVICIO)
											})
										},
										{
											clave: "entregables",
											titulo: "Entregables",
											render: (s) => s.entregables.length === 0 ? /* @__PURE__ */ jsx("span", {
												className: "text-muted-foreground",
												children: "Sin entregables"
											}) : /* @__PURE__ */ jsx("ul", {
												className: "min-w-40 space-y-1",
												children: s.entregables.map((entregable) => /* @__PURE__ */ jsxs("li", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ jsx(FileCheck2, {
														size: 16,
														className: "shrink-0 text-success",
														"aria-hidden": true
													}), /* @__PURE__ */ jsx("span", {
														className: "truncate",
														children: entregable
													})]
												}, entregable))
											})
										}
									],
									filas: servicios,
									claveFila: (s) => s.id,
									vacio: "Sin servicios generados."
								})
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Documentos recibidos",
								children: /* @__PURE__ */ jsxs(FormGrid, {
									columnas: 1,
									children: [
										decision === "con_necesidad" && /* @__PURE__ */ jsx(FormField, {
											etiqueta: "TDR adjunto",
											ancho: "doble",
											children: /* @__PURE__ */ jsxs("label", {
												className: "inline-flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 text-sm hover:bg-primary-soft focus-within:ring-2 focus-within:ring-primary",
												children: [
													/* @__PURE__ */ jsx(Upload, {
														size: 16,
														className: "shrink-0 text-primary",
														"aria-hidden": true
													}),
													/* @__PURE__ */ jsx("span", {
														className: "truncate",
														children: form.tdr || "Seleccionar archivo TDR"
													}),
													/* @__PURE__ */ jsx("input", {
														type: "file",
														className: "sr-only",
														onChange: (event) => setForm({
															...form,
															tdr: event.target.files?.[0]?.name ?? ""
														})
													})
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Servicio",
											ayuda: "Al que pertenecen los entregables",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: servicioEntrega,
												onChange: (event) => setServicioEntrega(event.target.value),
												disabled: servicios.length === 0,
												children: [/* @__PURE__ */ jsx("option", {
													value: "",
													children: "Seleccionar servicio"
												}), servicios.map((s) => /* @__PURE__ */ jsx("option", {
													value: s.id,
													children: s.numero
												}, s.id))]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Entregables",
											ancho: "doble",
											children: /* @__PURE__ */ jsxs("label", {
												className: "inline-flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 text-sm hover:bg-primary-soft focus-within:ring-2 focus-within:ring-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-muted",
												children: [
													/* @__PURE__ */ jsx(Upload, {
														size: 16,
														className: "shrink-0 text-primary",
														"aria-hidden": true
													}),
													/* @__PURE__ */ jsx("span", {
														className: "truncate",
														children: "Subir entregables del servicio"
													}),
													/* @__PURE__ */ jsx("input", {
														type: "file",
														multiple: true,
														className: "sr-only",
														disabled: !servicioEntrega,
														onChange: (event) => addEntregables(servicioEntrega, event.target.files)
													})
												]
											})
										})
									]
								})
							}),
							/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: volverAlProyecto,
								children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Volver al proyecto"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "submit",
								disabled: decision === "pendiente",
								children: [decision === "sin_necesidad" ? /* @__PURE__ */ jsx(FileCheck2, {}) : /* @__PURE__ */ jsx(Save, {}), decision === "sin_necesidad" ? "Cerrar evaluación" : "Registrar necesidad"]
							})] })
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico de la evaluación de información",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: claveHistorial,
							etiquetas: ETIQUETAS,
							nombreArchivo: `historico-evaluacion-informacion-${projectId}`,
							puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
							onRestaurar: (r, n) => {
								ponerRegistro(r);
								registrarCambio(claveHistorial, {
									accion: "Restauró una versión anterior",
									objeto: `versión ${n}`,
									antes: base.current,
									despues: r
								}, {
									modulo: 11,
									entidad: "evaluacion_informacion"
								});
								base.current = r;
							}
						})
					})
				})
			]
		})]
	});
}
//#endregion
export { EvaluacionInformacionPage as component };
