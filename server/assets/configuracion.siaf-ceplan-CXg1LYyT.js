import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { n as buttonVariants, t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, T as Confirmar } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { g as guardarVinculo, p as estadoVinculo, r as NOMBRE_ESTADO_VINCULO, v as leerVinculo } from "./siaf-ocJzaGES.js";
import { Children, cloneElement, isValidElement, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowLeftRight, Building2, CheckCircle2, ClipboardCheck, Clock, Database, FileSpreadsheet, History, KeyRound, Landmark, Link2, Loader2, Play, Plus, RefreshCw, Save, Search, Server, ShieldCheck, Trash2, Upload, X, XCircle } from "lucide-react";
//#region src/routes/configuracion.siaf-ceplan.tsx?tsr-split=component
var CHECK = "size-4 rounded-sm accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";
var TIPOS_CONEXION = [
	"Datos abiertos del MEF (CSV)",
	"Exportación SIAF-SP",
	"Base de datos",
	"Archivos",
	"Servicio/API",
	"Importación manual"
];
var STORAGE_KEY = "mtc-siaf-ceplan-config-v1";
var CLAVE_HISTORIAL = "siaf-ceplan";
var BITACORA = {
	modulo: 9,
	entidad: "siaf_ceplan"
};
var ETIQUETAS = {
	institutions: "Institución",
	projects: "Proyecto / CUI",
	connection: "Conexión",
	processingIds: "Periodos a procesar",
	updateMode: "Modo de actualización",
	entityCode: "Código de entidad",
	entityName: "Entidad",
	sector: "Sector",
	pliego: "Pliego",
	pliegoName: "Nombre del pliego",
	ue: "Unidad ejecutora",
	ueName: "Nombre de la UE",
	ruc: "RUC",
	fiscalYear: "Año fiscal",
	active: "Activo",
	default: "Por defecto",
	cui: "CUI",
	internalCode: "Código interno",
	name: "Nombre del proyecto",
	infrastructure: "Infraestructura",
	department: "Departamento",
	province: "Provincia",
	district: "Distrito",
	startYear: "Año de inicio",
	endYear: "Año de fin",
	budget: "Presupuesto",
	entity: "Entidad",
	type: "Tipo de conexión",
	origin: "Origen",
	server: "Servidor",
	port: "Puerto",
	database: "Base de datos",
	user: "Usuario",
	timeout: "Tiempo de espera",
	sourcePath: "Ruta del origen",
	format: "Formato",
	encoding: "Codificación",
	filenamePattern: "Patrón de archivo"
};
/** Cada institución y proyecto lleva `nombre` para identificarlo en el histórico; al restaurar se quita. */
var aRegistro = (s) => ({
	institutions: s.institutions.map((i) => ({
		...i,
		nombre: `${i.entityName} · UE ${i.ue} ${i.ueName}`.trim()
	})),
	projects: s.projects.map((p) => ({
		...p,
		nombre: `${p.cui} · ${p.name}`.trim()
	})),
	connection: s.connection,
	processingIds: s.processingIds,
	updateMode: s.updateMode
});
var institutionsSeed = [{
	id: 1,
	entityCode: "036",
	entityName: "Ministerio de Transportes y Comunicaciones",
	sector: "36 · Transportes y Comunicaciones",
	pliego: "036",
	pliegoName: "Ministerio de Transportes y Comunicaciones",
	ue: "001",
	ueName: "Administración General",
	ruc: "20131379944",
	fiscalYear: "2026",
	active: true,
	default: true
}, {
	id: 2,
	entityCode: "036",
	entityName: "Ministerio de Transportes y Comunicaciones",
	sector: "36 · Transportes y Comunicaciones",
	pliego: "036",
	pliegoName: "Ministerio de Transportes y Comunicaciones",
	ue: "010",
	ueName: "Provías Nacional",
	ruc: "20503503639",
	fiscalYear: "2026",
	active: true,
	default: false
}];
var projectsSeed = [{
	id: 1,
	cui: "2491435",
	internalCode: "AERO-IQT-2026",
	name: "Mejoramiento del Aeropuerto Internacional de Iquitos",
	infrastructure: "Aeroportuaria",
	department: "Loreto",
	province: "Maynas",
	district: "San Juan Bautista",
	ue: "001",
	startYear: "2024",
	endYear: "2028",
	budget: 4865e5,
	active: true
}, {
	id: 2,
	cui: "2233850",
	internalCode: "AERO-JAU-2026",
	name: "Mejoramiento del Aeropuerto Francisco Carlé de Jauja",
	infrastructure: "Aeroportuaria",
	department: "Junín",
	province: "Jauja",
	district: "Jauja",
	ue: "001",
	startYear: "2023",
	endYear: "2027",
	budget: 3128e5,
	active: true
}];
var connectionSeed = {
	entity: "036 · Ministerio de Transportes y Comunicaciones",
	pliego: "036 · MTC",
	ue: "001 · Administración General",
	fiscalYear: "2026",
	type: "Datos abiertos del MEF (CSV)",
	origin: "MEF · Consulta Amigable (datos abiertos)",
	server: "10.10.20.15",
	port: "1433",
	database: "SIAF_2026",
	user: "svc_integracion_predial",
	timeout: "30",
	sourcePath: "https://fs.datosabiertos.mef.gob.pe/datastorefiles/2026-Gasto-Mensual.csv",
	format: "CSV",
	encoding: "UTF-8",
	filenamePattern: "{AAAA}-Gasto-Mensual.csv"
};
var availablePeriods = [
	{
		id: "2024-ANUAL",
		year: "2024",
		period: "Anual",
		entity: "036",
		records: 34250,
		origin: "SIAF",
		databaseDate: "31/12/2024",
		status: "Procesado",
		progress: 100
	},
	{
		id: "2025-ANUAL",
		year: "2025",
		period: "Anual",
		entity: "036",
		records: 46805,
		origin: "SIAF",
		databaseDate: "31/12/2025",
		status: "Disponible",
		progress: 0
	},
	{
		id: "2026-07",
		year: "2026",
		period: "Julio",
		entity: "036",
		records: 48023,
		origin: "SIAF",
		databaseDate: "20/08/2026",
		status: "Disponible",
		progress: 0
	},
	{
		id: "2026-08",
		year: "2026",
		period: "Agosto",
		entity: "036",
		records: 51420,
		origin: "SIAF",
		databaseDate: "21/08/2026",
		status: "Observado",
		progress: 0
	}
];
var validationRows = [
	{
		rule: "Registros duplicados",
		detail: "Coincidencia por año, secuencia y clasificador",
		severity: "Advertencia",
		records: 18
	},
	{
		rule: "Metas sin proyecto",
		detail: "Meta presupuestal sin CUI asociado",
		severity: "Error crítico",
		records: 7
	},
	{
		rule: "Proyectos sin CUI",
		detail: "Proyecto predial sin código único de inversión",
		severity: "Error crítico",
		records: 2
	},
	{
		rule: "Registros sin clasificador",
		detail: "Clasificador de gasto vacío o inválido",
		severity: "Advertencia",
		records: 11
	},
	{
		rule: "Sin fuente de financiamiento",
		detail: "Registro sin código ni descripción de fuente",
		severity: "Advertencia",
		records: 4
	},
	{
		rule: "SIAF sin homologación",
		detail: "Metas que aún no se vinculan con Gestión Predial",
		severity: "Advertencia",
		records: 63
	},
	{
		rule: "CEPLAN sin meta SIAF",
		detail: "Actividad operativa sin equivalencia presupuestal",
		severity: "Advertencia",
		records: 9
	},
	{
		rule: "Montos negativos",
		detail: "No se detectaron inconsistencias en los montos",
		severity: "Correcto",
		records: 0
	},
	{
		rule: "PIM menor a ejecución",
		detail: "No se detectaron casos fuera de regla",
		severity: "Correcto",
		records: 0
	},
	{
		rule: "Predios sin relación presupuestal",
		detail: "Predios activos sin meta presupuestal",
		severity: "Error crítico",
		records: 24
	}
];
var importedFields = [
	"Año",
	"Mes",
	"Sector",
	"Pliego",
	"Unidad Ejecutora",
	"CUI",
	"Categoría presupuestal",
	"Producto / Proyecto",
	"Actividad / Obra",
	"Función",
	"División funcional",
	"Grupo funcional",
	"Meta",
	"Secuencia funcional",
	"Fuente de financiamiento",
	"Rubro",
	"Clasificador",
	"PIA",
	"Modificaciones",
	"PIM",
	"Certificación",
	"Compromiso anual",
	"Compromiso mensual",
	"Devengado",
	"Girado",
	"Pagado"
];
var initialLogs = [{
	id: "PROC-2026-0087",
	entity: "036",
	ue: "001",
	origin: "SIAF",
	year: "2026",
	period: "Junio",
	startedAt: "20/08/2026 08:42",
	finishedAt: "20/08/2026 08:49",
	user: "mquiroz",
	found: 47218,
	processed: 47218,
	inserted: 1358,
	updated: 45812,
	observed: 42,
	errors: 6,
	status: "Completado con observaciones",
	message: "Proceso incremental finalizado",
	sourceFile: "SIAF_2026_06.zip",
	hash: "8f65c1...9ac4"
}];
function defaultState() {
	return {
		institutions: institutionsSeed,
		projects: projectsSeed,
		connection: connectionSeed,
		processingIds: ["2026-07"],
		updateMode: "Incremental",
		logs: initialLogs
	};
}
function loadState() {
	const fallback = defaultState();
	if (typeof window === "undefined") return fallback;
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (!stored) return fallback;
		const parsed = JSON.parse(stored);
		return {
			institutions: parsed.institutions?.length ? parsed.institutions : fallback.institutions,
			projects: parsed.projects?.length ? parsed.projects : fallback.projects,
			connection: parsed.connection ?? fallback.connection,
			processingIds: parsed.processingIds ?? fallback.processingIds,
			updateMode: parsed.updateMode ?? fallback.updateMode,
			logs: parsed.logs?.length ? parsed.logs : fallback.logs
		};
	} catch {
		return fallback;
	}
}
var tabs = [
	{
		id: "actualizacion",
		label: "Origen y actualización",
		icon: RefreshCw
	},
	{
		id: "institucional",
		label: "Configuración institucional",
		icon: Building2
	},
	{
		id: "proyectos",
		label: "Proyectos / CUI",
		icon: Landmark
	},
	{
		id: "ceplan",
		label: "Configuración CEPLAN",
		icon: FileSpreadsheet
	},
	{
		id: "parametros",
		label: "Parámetros presupuestales",
		icon: Database
	},
	{
		id: "homologacion-predial",
		label: "SIAF - Gestión Predial",
		icon: Link2
	},
	{
		id: "homologacion-ceplan",
		label: "SIAF - CEPLAN",
		icon: ArrowLeftRight
	},
	{
		id: "validaciones",
		label: "Validaciones",
		icon: ClipboardCheck
	},
	{
		id: "bitacora",
		label: "Bitácora",
		icon: History
	},
	{
		id: "seguridad",
		label: "Seguridad y auditoría",
		icon: ShieldCheck
	}
];
function SiafCeplanPage() {
	const [state, setState] = useState(defaultState);
	const [hydrated, setHydrated] = useState(false);
	const [tab, setTab] = useState("actualizacion");
	const [password, setPassword] = useState("");
	const [connectionStatus, setConnectionStatus] = useState("idle");
	const [lastTest, setLastTest] = useState("Sin pruebas registradas");
	const [responseTime, setResponseTime] = useState("Sin medir");
	const [selectedAvailable, setSelectedAvailable] = useState([]);
	const [progress, setProgress] = useState(0);
	const [running, setRunning] = useState(false);
	const [notice, setNotice] = useState("");
	const [institutionEditor, setInstitutionEditor] = useState(null);
	const [projectEditor, setProjectEditor] = useState(null);
	const [confirmFull, setConfirmFull] = useState(false);
	const rol = useRol();
	const versiones = useHistorial(CLAVE_HISTORIAL);
	const [baja, setBaja] = useState(null);
	/** Guarda el nuevo estado y deja la versión: la primera vez, antes guarda cómo estaba. */
	function cambiar(next, accion, objeto, motivo) {
		setState(next);
		registrarCambio(CLAVE_HISTORIAL, {
			accion,
			objeto,
			motivo,
			antes: aRegistro(state),
			despues: aRegistro(next)
		}, BITACORA);
	}
	/** Acción guardada que no cambia los datos configurables (por ejemplo, un proceso o una prueba). */
	function dejarConstancia(accion, objeto) {
		const actual = aRegistro(state);
		registrarCambio(CLAVE_HISTORIAL, {
			accion,
			objeto,
			antes: actual,
			despues: actual
		}, BITACORA);
	}
	useEffect(() => {
		setState(loadState());
		setHydrated(true);
	}, []);
	useEffect(() => {
		if (!hydrated) return;
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}, [hydrated, state]);
	useEffect(() => {
		if (!running) return;
		const timer = window.setInterval(() => {
			setProgress((current) => Math.min(100, current + 4));
		}, 150);
		return () => window.clearInterval(timer);
	}, [running]);
	useEffect(() => {
		if (!running || progress < 100) return;
		setRunning(false);
		const periods = availablePeriods.filter((period) => state.processingIds.includes(period.id));
		const found = periods.reduce((total, period) => total + period.records, 0);
		const now = (/* @__PURE__ */ new Date()).toLocaleString("es-PE");
		const newLog = {
			id: `PROC-2026-${String(state.logs.length + 88).padStart(4, "0")}`,
			entity: "036",
			ue: "001",
			origin: state.connection.origin,
			year: periods[0]?.year ?? state.connection.fiscalYear,
			period: periods.map((period) => period.period).join(", ") || "Sin periodo",
			startedAt: now,
			finishedAt: now,
			user: "equipo.funcional",
			found,
			processed: found,
			inserted: Math.round(found * .08),
			updated: Math.round(found * .91),
			observed: Math.round(found * .009),
			errors: Math.round(found * .001),
			status: "Completado con observaciones",
			message: `${state.updateMode} finalizada`,
			sourceFile: state.connection.type === "Archivos" ? state.connection.filenamePattern : "Conexión directa",
			hash: `sha256:${crypto.randomUUID().slice(0, 12)}`
		};
		setState((current) => ({
			...current,
			logs: [newLog, ...current.logs]
		}));
		dejarConstancia(`Ejecutó actualización: ${state.updateMode}`, `${newLog.year} · ${newLog.period} · ${found} registros`);
		setNotice("Actualización terminada. Se ejecutaron las validaciones automáticas.");
	}, [
		progress,
		running,
		state.connection,
		state.logs.length,
		state.processingIds,
		state.updateMode
	]);
	const processingPeriods = useMemo(() => availablePeriods.filter((period) => state.processingIds.includes(period.id)), [state.processingIds]);
	const foundRecords = processingPeriods.reduce((total, period) => total + period.records, 0);
	const processedRecords = Math.round(foundRecords * progress / 100);
	function persist(next = state) {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		dejarConstancia("Guardó la configuración de origen y actualización", `${next.connection.type} · ${next.connection.origin || "sin origen"} · ${next.processingIds.length} periodo(s)`);
		setNotice("Configuración guardada. La contraseña no fue almacenada.");
	}
	function updateConnection(key, value) {
		setState((current) => ({
			...current,
			connection: {
				...current.connection,
				[key]: value
			}
		}));
	}
	function testConnection() {
		setConnectionStatus("testing");
		setNotice("");
		window.setTimeout(() => {
			const succeeds = Boolean(state.connection.origin && (state.connection.server || state.connection.sourcePath));
			setConnectionStatus(succeeds ? "success" : "failed");
			setResponseTime(succeeds ? "186 ms" : "5,000 ms");
			setLastTest((/* @__PURE__ */ new Date()).toLocaleString("es-PE"));
		}, 850);
	}
	function addSelectedPeriods() {
		setState((current) => ({
			...current,
			processingIds: Array.from(/* @__PURE__ */ new Set([...current.processingIds, ...selectedAvailable]))
		}));
		setSelectedAvailable([]);
	}
	function startUpdate(mode = state.updateMode, confirmada = false) {
		if (!state.processingIds.length) {
			setNotice("Seleccione al menos un periodo para iniciar la actualización.");
			return;
		}
		if (mode === "Actualización completa" && !confirmada) {
			setConfirmFull(true);
			return;
		}
		setState((current) => ({
			...current,
			updateMode: mode
		}));
		setProgress(0);
		setNotice("");
		setRunning(true);
	}
	function saveInstitution(institution) {
		const existe = state.institutions.some((item) => item.id === institution.id);
		cambiar({
			...state,
			institutions: existe ? state.institutions.map((item) => item.id === institution.id ? institution : item) : [...state.institutions, institution]
		}, existe ? "Modificó institución" : "Agregó institución", `${institution.entityName} · UE ${institution.ue}`);
		setInstitutionEditor(null);
		setNotice("Configuración institucional registrada.");
	}
	function saveProject(project) {
		const existe = state.projects.some((item) => item.id === project.id);
		cambiar({
			...state,
			projects: existe ? state.projects.map((item) => item.id === project.id ? project : item) : [...state.projects, project]
		}, existe ? "Modificó proyecto / CUI" : "Agregó proyecto / CUI", `${project.cui} · ${project.name}`);
		const anio = Number(state.connection.fiscalYear) || (/* @__PURE__ */ new Date()).getFullYear();
		if (project.projectId && /^\d{7}$/.test(project.cui)) {
			const vinculo = leerVinculo(project.projectId, anio);
			if (!vinculo.cuis.some((c) => c.cui === project.cui)) guardarVinculo({
				...vinculo,
				unidadEjecutora: /^\d{3}$/.test(project.ue) ? project.ue : vinculo.unidadEjecutora,
				cuis: [...vinculo.cuis, {
					cui: project.cui,
					nombre: project.name,
					acciones: []
				}]
			}, "Agregó el CUI desde la configuración SIAF-CEPLAN");
		}
		setProjectEditor(null);
		setNotice(project.projectId ? "Proyecto/CUI registrado; el CUI quedó en el vínculo SIAF del proyecto." : "Proyecto/CUI registrado y disponible para homologación.");
	}
	function confirmarBaja(motivo) {
		if (!baja) return;
		if (baja.tipo === "institución") {
			const quitada = state.institutions.find((i) => i.id === baja.id);
			cambiar({
				...state,
				institutions: state.institutions.filter((i) => i.id !== baja.id)
			}, "Eliminó institución", quitada ? `${quitada.entityName} · UE ${quitada.ue}` : String(baja.id), motivo);
		} else {
			const quitado = state.projects.find((p) => p.id === baja.id);
			cambiar({
				...state,
				projects: state.projects.filter((p) => p.id !== baja.id)
			}, "Eliminó proyecto / CUI", quitado ? `${quitado.cui} · ${quitado.name}` : String(baja.id), motivo);
		}
		setNotice("Eliminado. El motivo quedó en el histórico.");
		setBaja(null);
	}
	function restaurar(registro, n) {
		cambiar({
			...state,
			institutions: registro.institutions.map(({ nombre: _nombre, ...i }) => i),
			projects: registro.projects.map(({ nombre: _nombre, ...p }) => p),
			connection: registro.connection,
			processingIds: registro.processingIds,
			updateMode: registro.updateMode
		}, "Restauró una versión anterior", `versión ${n}`);
		setNotice(`Configuración restaurada a la versión ${n}.`);
	}
	function confirmarCompleta() {
		setConfirmFull(false);
		startUpdate("Actualización completa", true);
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: RefreshCw,
			titulo: "Actualización SIAF - CEPLAN",
			descripcion: "Integración presupuestal: integra información oficial con proyectos, expedientes y predios sin reemplazar al SIAF.",
			migas: [{ texto: "Configuración" }, { texto: "SIAF - CEPLAN" }],
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(StatusBadge, {
				tono: connectionStatus === "success" ? "success" : "neutral",
				children: connectionStatus === "success" ? "SIAF conectado" : "Conexión pendiente"
			}), /* @__PURE__ */ jsxs(StatusBadge, {
				tono: "primary",
				children: ["Año fiscal ", state.connection.fiscalYear]
			})] })
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Contexto de trabajo",
			className: "mb-4",
			children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(ContextSelect, {
					label: "Entidad",
					value: state.connection.entity,
					options: ["036 · Ministerio de Transportes y Comunicaciones"],
					onChange: (value) => updateConnection("entity", value)
				}),
				/* @__PURE__ */ jsx(ContextSelect, {
					label: "Proyecto / CUI",
					value: "2491435 · Aeropuerto de Iquitos",
					options: ["2491435 · Aeropuerto de Iquitos", "2233850 · Aeropuerto de Jauja"],
					onChange: () => void 0
				}),
				/* @__PURE__ */ jsx(ContextSelect, {
					label: "Unidad Ejecutora",
					value: state.connection.ue,
					options: ["001 · Administración General", "010 · Provías Nacional"],
					onChange: (value) => updateConnection("ue", value)
				}),
				/* @__PURE__ */ jsx(ContextSelect, {
					label: "Año",
					value: state.connection.fiscalYear,
					options: [
						"2026",
						"2025",
						"2024"
					],
					onChange: (value) => updateConnection("fiscalYear", value)
				})
			] }), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "Datos de demostración guardados en este navegador."
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]",
			children: [/* @__PURE__ */ jsx(Section, {
				titulo: "Secciones del módulo",
				className: "h-fit",
				children: /* @__PURE__ */ jsx("nav", {
					"aria-label": "Secciones del módulo",
					className: "grid grid-cols-2 gap-1 sm:grid-cols-3 xl:block xl:space-y-0.5",
					children: [...tabs, {
						id: "historico",
						label: `Histórico (${versiones.length})`,
						icon: Clock
					}].map((item) => {
						const Icon = item.icon;
						const active = tab === item.id;
						return /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setTab(item.id),
							"aria-current": active ? "true" : void 0,
							className: `flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm ${active ? "bg-primary-soft font-medium text-primary-dark" : "text-foreground hover:bg-muted"}`,
							children: [/* @__PURE__ */ jsx(Icon, {
								size: 16,
								className: "shrink-0",
								"aria-hidden": true
							}), /* @__PURE__ */ jsx("span", { children: item.label })]
						}, item.id);
					})
				})
			}), /* @__PURE__ */ jsxs("section", {
				className: "min-w-0",
				children: [
					notice && /* @__PURE__ */ jsxs("p", {
						role: notice.startsWith("No se pudo") || notice.startsWith("Seleccione") ? "alert" : "status",
						className: `mb-3 flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm ${notice.startsWith("No se pudo") || notice.startsWith("Seleccione") ? "border-destructive bg-destructive-soft text-destructive" : "border-success bg-success-soft text-success"}`,
						children: [/* @__PURE__ */ jsx("span", { children: notice }), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setNotice(""),
							"aria-label": "Cerrar aviso",
							className: "rounded-sm",
							children: /* @__PURE__ */ jsx(X, {
								size: 16,
								"aria-hidden": true
							})
						})]
					}),
					tab === "actualizacion" && /* @__PURE__ */ jsx(UpdateWorkspace, {
						state,
						password,
						setPassword,
						updateConnection,
						connectionStatus,
						responseTime,
						lastTest,
						testConnection,
						selectedAvailable,
						setSelectedAvailable,
						processingPeriods,
						addSelectedPeriods,
						removePeriod: (id) => setState((current) => ({
							...current,
							processingIds: current.processingIds.filter((item) => item !== id)
						})),
						selectAll: () => setSelectedAvailable(availablePeriods.map((period) => period.id)),
						clearSelection: () => setSelectedAvailable([]),
						updateMode: state.updateMode,
						setUpdateMode: (mode) => setState((current) => ({
							...current,
							updateMode: mode
						})),
						running,
						progress,
						processedRecords,
						foundRecords,
						onSave: () => persist(),
						onStart: () => startUpdate(),
						onPending: () => startUpdate("Solo pendientes"),
						onFull: () => startUpdate("Actualización completa"),
						openValidations: () => setTab("validaciones"),
						openLogs: () => setTab("bitacora")
					}),
					tab === "institucional" && /* @__PURE__ */ jsx(InstitutionPanel, {
						rows: state.institutions,
						editor: institutionEditor,
						setEditor: setInstitutionEditor,
						save: saveInstitution,
						setDefault: (id) => cambiar({
							...state,
							institutions: state.institutions.map((item) => ({
								...item,
								default: item.id === id
							}))
						}, "Marcó institución por defecto", state.institutions.find((i) => i.id === id)?.entityName ?? String(id)),
						remove: (id) => setBaja({
							tipo: "institución",
							id
						})
					}),
					tab === "proyectos" && /* @__PURE__ */ jsx(ProjectsPanel, {
						rows: state.projects,
						anio: Number(state.connection.fiscalYear) || (/* @__PURE__ */ new Date()).getFullYear(),
						editor: projectEditor,
						setEditor: setProjectEditor,
						save: saveProject,
						remove: (id) => setBaja({
							tipo: "proyecto",
							id
						})
					}),
					tab === "ceplan" && /* @__PURE__ */ jsx(CeplanPanel, { onSave: () => {
						dejarConstancia("Guardó la configuración CEPLAN", "PEI 2024-2030 · POI Anual 2026");
						setNotice("Configuración CEPLAN guardada y lista para homologación.");
					} }),
					tab === "parametros" && /* @__PURE__ */ jsx(ParametersPanel, {}),
					tab === "homologacion-predial" && /* @__PURE__ */ jsx(PredialMappingPanel, { onSave: () => {
						dejarConstancia("Registró homologación SIAF - Gestión Predial", "3 predios");
						setNotice("Homologación SIAF - Gestión Predial registrada para 3 predios.");
					} }),
					tab === "homologacion-ceplan" && /* @__PURE__ */ jsx(CeplanMappingPanel, { onSave: () => {
						dejarConstancia("Registró homologación SIAF - CEPLAN", "Meta SIAF 0012");
						setNotice("Homologación SIAF - CEPLAN registrada con trazabilidad de usuario y fecha.");
					} }),
					tab === "validaciones" && /* @__PURE__ */ jsx(ValidationsPanel, {}),
					tab === "bitacora" && /* @__PURE__ */ jsx(LogsPanel, { logs: state.logs }),
					tab === "seguridad" && /* @__PURE__ */ jsx(SecurityPanel, {}),
					tab === "historico" && /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico de la configuración SIAF - CEPLAN",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: CLAVE_HISTORIAL,
							etiquetas: ETIQUETAS,
							nombreArchivo: "historico-siaf-ceplan",
							puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
							onRestaurar: restaurar
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx(Confirmar, {
			abierto: confirmFull,
			onCerrar: () => setConfirmFull(false),
			onConfirmar: confirmarCompleta,
			titulo: "Actualización completa",
			texto: "La actualización completa reconstruirá la información de los periodos seleccionados.",
			accion: "Ejecutar actualización completa",
			destructiva: true
		}),
		baja && /* @__PURE__ */ jsx(MotivoEliminacion, {
			tipo: baja.tipo,
			nombre: baja.tipo === "institución" ? state.institutions.find((i) => i.id === baja.id)?.entityName ?? "La institución" : state.projects.find((p) => p.id === baja.id)?.name ?? "El proyecto",
			onCerrar: () => setBaja(null),
			onConfirmar: confirmarBaja
		})
	] });
}
/** Modal de baja: el motivo (mínimo 5 caracteres) queda en el histórico. */
function MotivoEliminacion({ nombre, tipo, descripcion, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Eliminar ${tipo}`,
		descripcion: descripcion ?? `${nombre} sale del registro. El histórico conserva sus datos y el motivo.`,
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
			children: [
				/* @__PURE__ */ jsx(Trash2, {}),
				" Eliminar ",
				tipo
			]
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
				placeholder: "Por ejemplo: se registró por error; ya no corresponde"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function UpdateWorkspace(props) {
	const { state, updateConnection } = props;
	const connection = state.connection;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Configuración de origen",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: "Defina cómo se obtiene la información presupuestal oficial del SIAF."
					}),
					/* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Entidad",
							children: /* @__PURE__ */ jsx(Input, {
								value: connection.entity,
								onChange: (value) => updateConnection("entity", value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Pliego",
							children: /* @__PURE__ */ jsx(Input, {
								value: connection.pliego,
								onChange: (value) => updateConnection("pliego", value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Unidad Ejecutora",
							children: /* @__PURE__ */ jsx(Input, {
								value: connection.ue,
								onChange: (value) => updateConnection("ue", value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Año fiscal",
							children: /* @__PURE__ */ jsx(Input, {
								value: connection.fiscalYear,
								onChange: (value) => updateConnection("fiscalYear", value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Tipo de conexión",
							children: /* @__PURE__ */ jsx(Select, {
								value: connection.type,
								options: TIPOS_CONEXION,
								onChange: (value) => updateConnection("type", value)
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Origen de datos",
							children: /* @__PURE__ */ jsx(Input, {
								value: connection.origin,
								onChange: (value) => updateConnection("origin", value)
							})
						})
					] }),
					connection.type === "Base de datos" && /* @__PURE__ */ jsx("div", {
						className: "mt-3 border-t border-border pt-3",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Servidor / IP",
								children: /* @__PURE__ */ jsx(Input, {
									value: connection.server,
									onChange: (value) => updateConnection("server", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Puerto",
								children: /* @__PURE__ */ jsx(Input, {
									value: connection.port,
									onChange: (value) => updateConnection("port", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Base de datos",
								children: /* @__PURE__ */ jsx(Input, {
									value: connection.database,
									onChange: (value) => updateConnection("database", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Timeout (segundos)",
								children: /* @__PURE__ */ jsx(Input, {
									value: connection.timeout,
									onChange: (value) => updateConnection("timeout", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Usuario",
								children: /* @__PURE__ */ jsx(Input, {
									value: connection.user,
									onChange: (value) => updateConnection("user", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Contraseña cifrada",
								hint: "Nunca se guarda en texto plano",
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: props.password,
									onChange: (event) => props.setPassword(event.target.value),
									placeholder: "••••••••••••",
									className: inputClass
								})
							})
						] })
					}),
					connection.type === "Archivos" && /* @__PURE__ */ jsx("div", {
						className: "mt-3 border-t border-border pt-3",
						children: /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Ruta origen",
								children: /* @__PURE__ */ jsx(Input, {
									value: connection.sourcePath,
									onChange: (value) => updateConnection("sourcePath", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Formato",
								children: /* @__PURE__ */ jsx(Select, {
									value: connection.format,
									options: [
										"DBF",
										"CSV",
										"XLSX",
										"TXT",
										"ZIP"
									],
									onChange: (value) => updateConnection("format", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Año",
								children: /* @__PURE__ */ jsx(Input, {
									value: connection.fiscalYear,
									onChange: (value) => updateConnection("fiscalYear", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Codificación",
								children: /* @__PURE__ */ jsx(Select, {
									value: connection.encoding,
									options: [
										"UTF-8",
										"Windows-1252",
										"ISO-8859-1"
									],
									onChange: (value) => updateConnection("encoding", value)
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Patrón de archivo",
								children: /* @__PURE__ */ jsx(Input, {
									value: connection.filenamePattern,
									onChange: (value) => updateConnection("filenamePattern", value)
								})
							})
						] })
					}),
					connection.type !== "Base de datos" && connection.type !== "Archivos" && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 border-t border-border pt-3",
						children: [(connection.type === "Datos abiertos del MEF (CSV)" || connection.type === "Exportación SIAF-SP") && /* @__PURE__ */ jsx("p", {
							className: "mb-3 text-xs text-muted-foreground",
							children: connection.type === "Datos abiertos del MEF (CSV)" ? "CSV de gasto mensual que publica el MEF por año. Hoy se carga por archivo en cada proyecto («Metas del proyecto › Ejecución SIAF»), filtrado por su vínculo SIAF (CUI, metas, específicas)." : "Exportación por expediente del SIAF-SP de la unidad ejecutora (expediente, fase, documento, beneficiario, monto). Se carga por archivo en cada proyecto y cruza los pagos de los predios."
						}), /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(Field, {
							label: connection.type === "Servicio/API" ? "URL del servicio" : connection.type === "Datos abiertos del MEF (CSV)" ? "URL del CSV de gasto mensual" : "Archivo de importación",
							children: /* @__PURE__ */ jsx(Input, {
								value: connection.sourcePath,
								onChange: (value) => updateConnection("sourcePath", value),
								placeholder: connection.type === "Servicio/API" ? "https://servicio.entidad.gob.pe/api" : "Seleccione un archivo oficial"
							})
						}), /* @__PURE__ */ jsx(Field, {
							label: "Formato",
							children: /* @__PURE__ */ jsx(Select, {
								value: connection.format,
								options: [
									"JSON",
									"CSV",
									"XLSX",
									"ZIP"
								],
								onChange: (value) => updateConnection("format", value)
							})
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-background p-2.5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-2 text-xs",
							children: [
								/* @__PURE__ */ jsx(ConnectionBadge, { status: props.connectionStatus }),
								/* @__PURE__ */ jsxs("span", {
									className: "font-semibold text-muted-foreground",
									children: ["Tiempo: ", props.responseTime]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "text-muted-foreground",
									children: ["Última prueba: ", props.lastTest]
								})
							]
						}), /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: props.testConnection,
							disabled: props.connectionStatus === "testing",
							className: buttonSecondary,
							children: [
								props.connectionStatus === "testing" ? /* @__PURE__ */ jsx(Loader2, {
									size: 16,
									className: "animate-spin"
								}) : /* @__PURE__ */ jsx(Server, { size: 16 }),
								" ",
								"Probar conexión"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(SectionTitle, {
				title: "Periodos disponibles",
				description: "Seleccione información del origen y agréguela a la cola de procesamiento.",
				icon: ArrowLeftRight
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs(PeriodPanel, {
						title: "Información disponible",
						subtitle: "Periodos encontrados en el origen",
						children: [availablePeriods.map((period) => /* @__PURE__ */ jsx(PeriodRow, {
							period,
							selected: props.selectedAvailable.includes(period.id),
							onSelect: () => props.setSelectedAvailable(props.selectedAvailable.includes(period.id) ? props.selectedAvailable.filter((id) => id !== period.id) : [...props.selectedAvailable, period.id])
						}, period.id)), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2 border-t border-border px-3 py-2",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: props.selectAll,
								className: smallButton,
								children: "Seleccionar todos"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: props.clearSelection,
								className: smallButton,
								children: "Limpiar selección"
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-end md:col-span-2",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: props.addSelectedPeriods,
								disabled: !props.selectedAvailable.length,
								className: buttonPrimary,
								children: "Agregar a la cola"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => props.processingPeriods.forEach((period) => props.removePeriod(period.id)),
								className: smallButton,
								children: "Quitar de la cola"
							})]
						})
					}),
					/* @__PURE__ */ jsxs(PeriodPanel, {
						title: "Información a procesar",
						subtitle: "Cola preparada para la actualización",
						children: [props.processingPeriods.map((period) => /* @__PURE__ */ jsx(ProcessingPeriodRow, {
							period,
							onRemove: () => props.removePeriod(period.id)
						}, period.id)), !props.processingPeriods.length && /* @__PURE__ */ jsx(Empty, { text: "Agregue uno o más periodos desde el panel de origen." })]
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Actualización",
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: props.openLogs,
						className: smallButton,
						children: [/* @__PURE__ */ jsx(History, { size: 16 }), " Ver bitácora"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: props.openValidations,
						className: smallButton,
						children: [/* @__PURE__ */ jsx(ClipboardCheck, { size: 16 }), " Ver observaciones"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: props.onSave,
						className: smallButton,
						children: [/* @__PURE__ */ jsx(Save, { size: 16 }), " Guardar configuración"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: props.onPending,
						disabled: props.running,
						className: smallButton,
						children: [/* @__PURE__ */ jsx(RefreshCw, { size: 16 }), " Actualizar pendientes"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: props.onFull,
						disabled: props.running,
						className: `${smallButton} border-destructive text-destructive hover:bg-destructive-soft`,
						children: [/* @__PURE__ */ jsx(AlertTriangle, { size: 16 }), " Actualización completa"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: props.onStart,
						disabled: props.running,
						className: buttonVariants({ size: "sm" }),
						children: [
							props.running ? /* @__PURE__ */ jsx(Loader2, {
								size: 16,
								className: "animate-spin"
							}) : /* @__PURE__ */ jsx(Play, { size: 16 }),
							" ",
							"Iniciar actualización"
						]
					})
				] }),
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: "La operación se aplica únicamente a los periodos seleccionados."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid gap-2 md:grid-cols-2",
						children: [
							"Solo pendientes",
							"Incremental",
							"Reprocesar periodo",
							"Actualización completa"
						].map((mode) => /* @__PURE__ */ jsxs("label", {
							className: `cursor-pointer rounded-lg border p-3 ${props.updateMode === mode ? "border-primary bg-primary-soft" : "border-border bg-card hover:border-primary"}`,
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "radio",
									checked: props.updateMode === mode,
									onChange: () => props.setUpdateMode(mode),
									className: CHECK
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium text-foreground",
									children: mode
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs leading-4 text-muted-foreground",
								children: modeDescription(mode)
							})]
						}, mode))
					}),
					(props.running || props.progress > 0) && /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "text-base font-semibold text-foreground",
							children: ["Procesando SIAF ", connection.fiscalYear]
						}), /* @__PURE__ */ jsxs("div", {
							className: "text-xs text-muted-foreground",
							children: [
								props.processedRecords.toLocaleString("es-PE"),
								" /",
								" ",
								props.foundRecords.toLocaleString("es-PE"),
								" registros"
							]
						})] }), /* @__PURE__ */ jsxs("span", {
							className: "text-2xl font-semibold text-primary",
							children: [props.progress, "%"]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-3 h-3 overflow-hidden rounded-sm bg-muted",
						children: /* @__PURE__ */ jsx("div", {
							className: "h-full bg-primary transition-all",
							style: { width: `${props.progress}%` }
						})
					})] }),
					/* @__PURE__ */ jsxs("details", {
						className: "rounded-lg border border-border bg-card",
						children: [/* @__PURE__ */ jsxs("summary", {
							className: "cursor-pointer px-4 py-3 text-sm font-medium text-foreground",
							children: [
								"Estructura presupuestal a importar · ",
								importedFields.length,
								" campos obligatorios"
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap gap-1.5 border-t border-border p-3",
							children: importedFields.map((field) => /* @__PURE__ */ jsx("span", {
								className: "rounded-sm border border-border bg-background px-2 py-1 text-xs text-muted-foreground",
								children: field
							}, field))
						})]
					})
				]
			})
		]
	});
}
function InstitutionPanel({ rows, editor, setEditor, save, setDefault, remove }) {
	const empty = () => ({
		id: Date.now(),
		entityCode: "036",
		entityName: "",
		sector: "36 · Transportes y Comunicaciones",
		pliego: "036",
		pliegoName: "",
		ue: "",
		ueName: "",
		ruc: "",
		fiscalYear: "2026",
		active: true,
		default: false
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				title: "Configuración institucional",
				description: "Entidades, pliegos y unidades ejecutoras habilitadas para la integración.",
				icon: Building2,
				action: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setEditor(empty()),
					className: buttonPrimary,
					children: [/* @__PURE__ */ jsx(Plus, {
						size: 16,
						"aria-hidden": true
					}), " Crear configuración"]
				})
			}),
			editor && /* @__PURE__ */ jsx(InstitutionEditor, {
				value: editor,
				onChange: setEditor,
				onCancel: () => setEditor(null),
				onSave: () => save(editor)
			}),
			/* @__PURE__ */ jsx(DataTable, {
				headers: [
					"Entidad",
					"Pliego",
					"Unidad Ejecutora",
					"RUC",
					"Año",
					"Estado",
					"Predeterminada",
					"Acciones"
				],
				children: rows.map((row) => /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsxs(Cell, {
						strong: true,
						children: [
							row.entityCode,
							" · ",
							row.entityName
						]
					}),
					/* @__PURE__ */ jsxs(Cell, { children: [
						row.pliego,
						" · ",
						row.pliegoName
					] }),
					/* @__PURE__ */ jsxs(Cell, { children: [
						row.ue,
						" · ",
						row.ueName
					] }),
					/* @__PURE__ */ jsx(Cell, { children: row.ruc }),
					/* @__PURE__ */ jsx(Cell, { children: row.fiscalYear }),
					/* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Badge, {
						tone: row.active ? "green" : "slate",
						children: row.active ? "Activo" : "Inactivo"
					}) }),
					/* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setDefault(row.id),
						className: row.default ? "inline-flex h-8 items-center rounded-md bg-primary-soft px-2 text-xs font-semibold text-primary-dark" : smallButton,
						children: row.default ? "Predeterminada" : "Definir como predeterminada"
					}) }),
					/* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsxs("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setEditor({ ...row }),
							className: smallButton,
							children: "Editar registro"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => remove(row.id),
							className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
							children: /* @__PURE__ */ jsx(Trash2, {
								size: 16,
								"aria-hidden": true
							})
						})]
					}) })
				] }, row.id))
			})
		]
	});
}
function InstitutionEditor({ value, onChange, onCancel, onSave }) {
	const set = (key, fieldValue) => onChange({
		...value,
		[key]: fieldValue
	});
	return /* @__PURE__ */ jsxs(Panel, { children: [
		/* @__PURE__ */ jsx(PanelHeading, {
			title: "Datos de la configuración institucional",
			subtitle: "Complete los datos de la entidad, pliego y unidad ejecutora"
		}),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(Field, {
				label: "Código entidad",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.entityCode,
					onChange: (v) => set("entityCode", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Nombre entidad",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.entityName,
					onChange: (v) => set("entityName", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Sector",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.sector,
					onChange: (v) => set("sector", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Pliego",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.pliego,
					onChange: (v) => set("pliego", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Nombre del pliego",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.pliegoName,
					onChange: (v) => set("pliegoName", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Unidad Ejecutora",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.ue,
					onChange: (v) => set("ue", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Nombre de Unidad Ejecutora",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.ueName,
					onChange: (v) => set("ueName", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "RUC",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.ruc,
					onChange: (v) => set("ruc", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Año fiscal",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.fiscalYear,
					onChange: (v) => set("fiscalYear", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Estado",
				children: /* @__PURE__ */ jsx(Select, {
					value: value.active ? "Activo" : "Inactivo",
					options: ["Activo", "Inactivo"],
					onChange: (v) => set("active", v === "Activo")
				})
			})
		] }),
		/* @__PURE__ */ jsx(ActionFooter, {
			onCancel,
			onSave,
			accion: "Guardar configuración institucional"
		})
	] });
}
function ProjectsPanel({ rows, anio, editor, setEditor, save, remove }) {
	const proyectoDe = (row) => proyectos.find((p) => p.id === row.projectId || row.cui && leerVinculo(p.id, anio).cuis.some((c) => c.cui === row.cui));
	const empty = () => ({
		id: Date.now(),
		cui: "",
		internalCode: "",
		name: "",
		infrastructure: "Aeroportuaria",
		department: "",
		province: "",
		district: "",
		ue: "001",
		startYear: "2026",
		endYear: "2028",
		budget: 0,
		active: true
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				title: "Proyectos / CUI",
				description: "Proyectos habilitados para relacionarse con metas presupuestales, expedientes y predios.",
				icon: Landmark,
				action: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setEditor(empty()),
					className: buttonPrimary,
					children: [/* @__PURE__ */ jsx(Plus, {
						size: 16,
						"aria-hidden": true
					}), " Crear proyecto"]
				})
			}),
			editor && /* @__PURE__ */ jsx(ProjectEditor, {
				value: editor,
				onChange: setEditor,
				onCancel: () => setEditor(null),
				onSave: () => save(editor)
			}),
			/* @__PURE__ */ jsx(DataTable, {
				headers: [
					"CUI / Código",
					"Proyecto",
					"Ubicación",
					"Unidad Ejecutora",
					"Periodo",
					"Presupuesto",
					"Estado",
					"Vínculo SIAF",
					"Acciones"
				],
				children: rows.map((row) => {
					const proyecto = proyectoDe(row);
					const estado = proyecto ? estadoVinculo(leerVinculo(proyecto.id, anio)) : null;
					return /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsxs(Cell, {
							strong: true,
							children: [row.cui, /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground",
								children: row.internalCode
							})]
						}),
						/* @__PURE__ */ jsxs(Cell, { children: [row.name, /* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground",
							children: row.infrastructure
						})] }),
						/* @__PURE__ */ jsxs(Cell, { children: [
							row.department,
							" / ",
							row.province,
							" / ",
							row.district
						] }),
						/* @__PURE__ */ jsx(Cell, { children: row.ue }),
						/* @__PURE__ */ jsxs(Cell, { children: [
							row.startYear,
							"-",
							row.endYear
						] }),
						/* @__PURE__ */ jsxs(Cell, {
							strong: true,
							children: ["S/ ", row.budget.toLocaleString("es-PE")]
						}),
						/* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Badge, {
							tone: row.active ? "green" : "slate",
							children: row.active ? "Activo" : "Inactivo"
						}) }),
						/* @__PURE__ */ jsx(Cell, { children: proyecto && estado ? /* @__PURE__ */ jsxs(Link, {
							to: "/proyectos/$projectId/metas",
							params: { projectId: proyecto.id },
							className: "text-sm font-medium text-primary-dark underline-offset-2 hover:underline",
							children: [
								NOMBRE_ESTADO_VINCULO[estado],
								" · ",
								proyecto.codigo
							]
						}) : /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: "Sin proyecto del PDGP"
						}) }),
						/* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsxs("div", {
							className: "flex gap-1",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setEditor({ ...row }),
								className: smallButton,
								children: "Editar registro"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => remove(row.id),
								className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
								children: /* @__PURE__ */ jsx(Trash2, {
									size: 16,
									"aria-hidden": true
								})
							})]
						}) })
					] }, row.id);
				})
			})
		]
	});
}
function ProjectEditor({ value, onChange, onCancel, onSave }) {
	const set = (key, fieldValue) => onChange({
		...value,
		[key]: fieldValue
	});
	return /* @__PURE__ */ jsxs(Panel, { children: [
		/* @__PURE__ */ jsx(PanelHeading, {
			title: "Datos del proyecto de Gestión Predial",
			subtitle: "Complete el CUI, la ubicación y el presupuesto referencial"
		}),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(Field, {
				label: "ID proyecto",
				children: /* @__PURE__ */ jsx(Input, {
					value: String(value.id),
					onChange: (v) => set("id", Number(v) || value.id)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "CUI",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.cui,
					onChange: (v) => set("cui", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Código interno",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.internalCode,
					onChange: (v) => set("internalCode", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Proyecto del PDGP",
				hint: "Al guardar, el CUI se agrega al vínculo SIAF de ese proyecto (Metas del proyecto › Vínculo SIAF).",
				children: /* @__PURE__ */ jsxs("select", {
					value: value.projectId ?? "",
					onChange: (e) => set("projectId", e.target.value || void 0),
					className: inputClass,
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Sin proyecto del sistema"
					}), proyectos.map((p) => /* @__PURE__ */ jsxs("option", {
						value: p.id,
						children: [
							p.codigo,
							" · ",
							p.nombre
						]
					}, p.id))]
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Nombre del proyecto",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.name,
					onChange: (v) => set("name", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Tipo de infraestructura",
				children: /* @__PURE__ */ jsx(Select, {
					value: value.infrastructure,
					options: [
						"Aeroportuaria",
						"Vial",
						"Ferroviaria",
						"Portuaria"
					],
					onChange: (v) => set("infrastructure", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Departamento",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.department,
					onChange: (v) => set("department", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Provincia",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.province,
					onChange: (v) => set("province", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Distrito",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.district,
					onChange: (v) => set("district", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Unidad Ejecutora",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.ue,
					onChange: (v) => set("ue", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Año inicio",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.startYear,
					onChange: (v) => set("startYear", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Año término",
				children: /* @__PURE__ */ jsx(Input, {
					value: value.endYear,
					onChange: (v) => set("endYear", v)
				})
			}),
			/* @__PURE__ */ jsx(Field, {
				label: "Presupuesto referencial",
				children: /* @__PURE__ */ jsx(Input, {
					value: String(value.budget),
					onChange: (v) => set("budget", Number(v) || 0)
				})
			})
		] }),
		/* @__PURE__ */ jsx(ActionFooter, {
			onCancel,
			onSave,
			accion: "Guardar proyecto"
		})
	] });
}
function CeplanPanel({ onSave }) {
	const [source, setSource] = useState("Archivo XLSX");
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-3",
		children: /* @__PURE__ */ jsxs(Section, {
			titulo: "Configuración CEPLAN",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: "Información del PEI, POI y actividades operativas que será homologada con las metas SIAF."
				}),
				/* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(Field, {
						label: "Entidad",
						children: /* @__PURE__ */ jsx(Input, { value: "036 · MTC" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Año",
						children: /* @__PURE__ */ jsx(Input, { value: "2026" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "PEI",
						children: /* @__PURE__ */ jsx(Input, { value: "PEI 2024-2030" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "POI",
						children: /* @__PURE__ */ jsx(Input, { value: "POI Anual 2026" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Código OEI",
						children: /* @__PURE__ */ jsx(Input, { value: "OEI.05" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Código AEI",
						children: /* @__PURE__ */ jsx(Input, { value: "AEI.05.02" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Actividad Operativa",
						children: /* @__PURE__ */ jsx(Input, { value: "AOI00003600412" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Centro de costo",
						children: /* @__PURE__ */ jsx(Input, { value: "DDP · Dirección de Disponibilidad de Predios" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Unidad orgánica",
						children: /* @__PURE__ */ jsx(Input, { value: "Dirección General de Programas y Proyectos" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Unidad de medida",
						children: /* @__PURE__ */ jsx(Input, { value: "Predio liberado" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Meta física",
						children: /* @__PURE__ */ jsx(Input, { value: "125" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Programación financiera",
						children: /* @__PURE__ */ jsx(Input, { value: "18500000" })
					})
				] }),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4 border-t border-border pt-3",
					children: /* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Origen CEPLAN",
							children: /* @__PURE__ */ jsx(Select, {
								value: source,
								options: [
									"Archivo XLSX",
									"Servicio/API",
									"Importación manual"
								],
								onChange: setSource
							})
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Archivo o endpoint",
							children: /* @__PURE__ */ jsx(Input, { value: source === "Servicio/API" ? "https://api.ceplan.gob.pe/poi" : "POI_2026_MTC.xlsx" })
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							disabled: true,
							title: "Carga de información disponible próximamente",
							className: `${buttonSecondary} self-end`,
							children: [/* @__PURE__ */ jsx(Upload, {
								size: 16,
								"aria-hidden": true
							}), " Cargar información (próximamente)"]
						})
					] })
				}),
				/* @__PURE__ */ jsx(ActionFooter, {
					onCancel: () => void 0,
					onSave,
					accion: "Guardar configuración CEPLAN"
				})
			]
		})
	});
}
function ParametersPanel() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			title: "Parámetros presupuestales",
			description: "Catálogos con código y descripción original del SIAF.",
			icon: Database
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 xl:grid-cols-2",
			children: [
				/* @__PURE__ */ jsx(Catalog, {
					title: "Metas presupuestales",
					headers: [
						"Año",
						"Secuencia",
						"Meta",
						"CUI",
						"Actividad / Obra",
						"Estado"
					],
					rows: [[
						"2026",
						"0042",
						"0012",
						"2491435",
						"Gestión y liberación predial",
						"Activo"
					], [
						"2026",
						"0057",
						"0018",
						"2233850",
						"Adquisición de terrenos",
						"Activo"
					]]
				}),
				/* @__PURE__ */ jsx(Catalog, {
					title: "Fuentes de financiamiento",
					headers: ["Código", "Descripción"],
					rows: [
						["1", "Recursos Ordinarios"],
						["3", "Recursos por Operaciones Oficiales de Crédito"],
						["5", "Recursos Determinados"]
					]
				}),
				/* @__PURE__ */ jsx(Catalog, {
					title: "Rubros",
					headers: ["Código", "Descripción"],
					rows: [["00", "Recursos Ordinarios"], ["19", "Recursos por Operaciones Oficiales de Crédito"]]
				}),
				/* @__PURE__ */ jsx(Catalog, {
					title: "Clasificadores de gasto",
					headers: [
						"Código",
						"Descripción",
						"Genérica",
						"Subgenérica",
						"Específica"
					],
					rows: [[
						"2.6.5.1.1.1",
						"Terrenos urbanos",
						"2.6",
						"2.6.5",
						"2.6.5.1.1.1"
					], [
						"2.6.5.1.1.2",
						"Terrenos rurales",
						"2.6",
						"2.6.5",
						"2.6.5.1.1.2"
					]]
				})
			]
		})]
	});
}
function PredialMappingPanel({ onSave }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				title: "Homologación SIAF - Gestión Predial",
				description: "Una meta SIAF puede financiar múltiples expedientes y predios.",
				icon: Link2
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 xl:grid-cols-[1fr_56px_1fr]",
				children: [
					/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(PanelHeading, {
						title: "Información SIAF",
						subtitle: "Clave presupuestal de origen"
					}), /* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Pliego",
							children: /* @__PURE__ */ jsx(Input, { value: "036 · MTC" })
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Unidad Ejecutora",
							children: /* @__PURE__ */ jsx(Input, { value: "001" })
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Año",
							children: /* @__PURE__ */ jsx(Input, { value: "2026" })
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "CUI",
							children: /* @__PURE__ */ jsx(Input, { value: "2491435" })
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Meta",
							children: /* @__PURE__ */ jsx(Input, { value: "0012" })
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Secuencia funcional",
							children: /* @__PURE__ */ jsx(Input, { value: "0042" })
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Clasificador",
							children: /* @__PURE__ */ jsx(Input, { value: "2.6.5.1.1.2" })
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Fuente de financiamiento",
							children: /* @__PURE__ */ jsx(Input, { value: "1 · Recursos Ordinarios" })
						})
					] })] }),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-center",
						children: /* @__PURE__ */ jsx(ArrowLeftRight, {
							className: "text-primary",
							"aria-hidden": true
						})
					}),
					/* @__PURE__ */ jsxs(Panel, { children: [
						/* @__PURE__ */ jsx(PanelHeading, {
							title: "Gestión Predial",
							subtitle: "Destino de la homologación"
						}),
						/* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Proyecto",
								children: /* @__PURE__ */ jsx(Input, { value: "Aeropuerto de Iquitos" })
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Componente",
								children: /* @__PURE__ */ jsx(Input, { value: "Liberación de áreas" })
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Tramo",
								children: /* @__PURE__ */ jsx(Input, { value: "Perímetro aeroportuario" })
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Sector",
								children: /* @__PURE__ */ jsx(Input, { value: "Sector 02" })
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Expediente predial",
								children: /* @__PURE__ */ jsx(Input, { value: "EXP-IQT-2026-0042" })
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Etapa",
								children: /* @__PURE__ */ jsx(Select, {
									value: "Adquisición",
									options: [
										"Diagnóstico",
										"Tasación",
										"Adquisición",
										"Pago",
										"Consignación",
										"Entrega de posesión",
										"Inscripción registral",
										"Transferencia interestatal"
									]
								})
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "mb-1 text-xs font-medium text-muted-foreground",
								children: "Predios relacionados"
							}), [
								"AERO-JAUJA-PR-0567T",
								"AERO-JAUJA-PR-00245-A",
								"AERO-JAUJA-PR-0056"
							].map((code) => /* @__PURE__ */ jsxs("label", {
								className: "mr-2 mt-1 inline-flex items-center gap-1.5 rounded-md border border-border bg-primary-soft px-2 py-1.5 text-xs font-medium text-primary-dark",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									defaultChecked: true,
									className: CHECK,
									"aria-label": `Incluir predio ${code}`
								}), code]
							}, code))]
						})
					] })
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: onSave,
					className: buttonPrimary,
					children: [/* @__PURE__ */ jsx(Link2, { size: 16 }), " Guardar homologación"]
				})
			}),
			/* @__PURE__ */ jsx(Catalog, {
				title: "Homologaciones vigentes",
				headers: [
					"CUI",
					"Meta / Secuencia",
					"Clasificador",
					"Proyecto",
					"Expediente",
					"Predios",
					"Etapa",
					"Estado"
				],
				rows: [[
					"2491435",
					"0012 / 0042",
					"2.6.5.1.1.2",
					"Aeropuerto de Iquitos",
					"EXP-IQT-2026-0042",
					"3",
					"Adquisición",
					"Vigente"
				]]
			})
		]
	});
}
function CeplanMappingPanel({ onSave }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				title: "Homologación SIAF - CEPLAN",
				description: "Relaciona la ejecución presupuestal con objetivos y actividades operativas.",
				icon: ArrowLeftRight
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 xl:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(PanelHeading, {
					title: "Meta SIAF",
					subtitle: "Información presupuestal"
				}), /* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(Field, {
						label: "Proyecto / CUI",
						children: /* @__PURE__ */ jsx(Input, { value: "2491435" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Meta SIAF",
						children: /* @__PURE__ */ jsx(Input, { value: "0012" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Secuencia funcional",
						children: /* @__PURE__ */ jsx(Input, { value: "0042" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Actividad presupuestal",
						children: /* @__PURE__ */ jsx(Input, { value: "6000053 · Adquisición de terrenos" })
					})
				] })] }), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(PanelHeading, {
					title: "Planeamiento CEPLAN",
					subtitle: "Cadena estratégica"
				}), /* @__PURE__ */ jsxs(FormGrid, { children: [
					/* @__PURE__ */ jsx(Field, {
						label: "PEI",
						children: /* @__PURE__ */ jsx(Input, { value: "PEI 2024-2030" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "OEI",
						children: /* @__PURE__ */ jsx(Input, { value: "OEI.05" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "AEI",
						children: /* @__PURE__ */ jsx(Input, { value: "AEI.05.02" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "POI",
						children: /* @__PURE__ */ jsx(Input, { value: "POI 2026" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Actividad Operativa",
						children: /* @__PURE__ */ jsx(Input, { value: "AOI00003600412" })
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Centro de costo",
						children: /* @__PURE__ */ jsx(Input, { value: "DDP" })
					})
				] })] })]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: onSave,
					className: buttonPrimary,
					children: [/* @__PURE__ */ jsx(Link2, { size: 16 }), " Guardar homologación"]
				})
			}),
			/* @__PURE__ */ jsx(Catalog, {
				title: "Homologaciones registradas",
				headers: [
					"CUI",
					"Meta / Secuencia",
					"PEI / POI",
					"OEI / AEI",
					"Actividad operativa",
					"Centro de costo",
					"Fecha",
					"Usuario",
					"Estado"
				],
				rows: [[
					"2491435",
					"0012 / 0042",
					"PEI 2024-2030 / POI 2026",
					"OEI.05 / AEI.05.02",
					"AOI00003600412",
					"DDP",
					"21/08/2026",
					"mquiroz",
					"Vigente"
				]]
			})
		]
	});
}
function ValidationsPanel() {
	const totals = {
		correct: validationRows.filter((row) => row.severity === "Correcto").length,
		warning: validationRows.filter((row) => row.severity === "Advertencia").length,
		critical: validationRows.filter((row) => row.severity === "Error crítico").length
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ jsx(SectionTitle, {
				title: "Validaciones automáticas",
				description: "Controles ejecutados después de cada importación o reproceso.",
				icon: ClipboardCheck
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-2 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ jsx(Metric, {
						label: "Reglas correctas",
						value: totals.correct,
						tone: "green"
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Advertencias",
						value: totals.warning,
						tone: "amber"
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Errores críticos",
						value: totals.critical,
						tone: "red"
					})
				]
			}),
			/* @__PURE__ */ jsx(DataTable, {
				headers: [
					"Resultado",
					"Regla de validación",
					"Descripción",
					"Registros"
				],
				children: validationRows.map((row) => /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(SeverityBadge, { severity: row.severity }) }),
					/* @__PURE__ */ jsx(Cell, {
						strong: true,
						children: row.rule
					}),
					/* @__PURE__ */ jsx(Cell, { children: row.detail }),
					/* @__PURE__ */ jsx(Cell, {
						strong: true,
						children: row.records.toLocaleString("es-PE")
					})
				] }, row.rule))
			})
		]
	});
}
function LogsPanel({ logs }) {
	const [q, setQ] = useState("");
	const texto = q.trim().toLocaleLowerCase("es-PE");
	const visibles = logs.filter((log) => !texto || `${log.id} ${log.period} ${log.year} ${log.user} ${log.status}`.toLocaleLowerCase("es-PE").includes(texto));
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			title: "Bitácora de actualización",
			description: "Trazabilidad completa de cada proceso ejecutado.",
			icon: History,
			action: /* @__PURE__ */ jsxs("label", {
				className: "relative block",
				children: [/* @__PURE__ */ jsx(Search, {
					size: 16,
					className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("input", {
					type: "search",
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar proceso",
					"aria-label": "Buscar proceso",
					className: `${inputClass} w-64 pl-9`
				})]
			})
		}), /* @__PURE__ */ jsx(DataTable, {
			headers: [
				"ID proceso",
				"Entidad / UE",
				"Origen",
				"Año / Periodo",
				"Inicio / Fin",
				"Usuario",
				"Encontrados",
				"Procesados",
				"Insertados",
				"Actualizados",
				"Observados",
				"Errores",
				"Estado",
				"Archivo / Hash"
			],
			children: visibles.map((log) => /* @__PURE__ */ jsxs("tr", { children: [
				/* @__PURE__ */ jsx(Cell, {
					strong: true,
					children: log.id
				}),
				/* @__PURE__ */ jsxs(Cell, { children: [
					log.entity,
					" / ",
					log.ue
				] }),
				/* @__PURE__ */ jsx(Cell, { children: log.origin }),
				/* @__PURE__ */ jsxs(Cell, { children: [
					log.year,
					" / ",
					log.period
				] }),
				/* @__PURE__ */ jsxs(Cell, { children: [log.startedAt, /* @__PURE__ */ jsx("div", {
					className: "text-xs text-muted-foreground",
					children: log.finishedAt
				})] }),
				/* @__PURE__ */ jsx(Cell, { children: log.user }),
				/* @__PURE__ */ jsx(Cell, { children: log.found.toLocaleString("es-PE") }),
				/* @__PURE__ */ jsx(Cell, { children: log.processed.toLocaleString("es-PE") }),
				/* @__PURE__ */ jsx(Cell, { children: log.inserted.toLocaleString("es-PE") }),
				/* @__PURE__ */ jsx(Cell, { children: log.updated.toLocaleString("es-PE") }),
				/* @__PURE__ */ jsx(Cell, { children: log.observed.toLocaleString("es-PE") }),
				/* @__PURE__ */ jsx(Cell, { children: log.errors.toLocaleString("es-PE") }),
				/* @__PURE__ */ jsxs(Cell, { children: [/* @__PURE__ */ jsx(Badge, {
					tone: "amber",
					children: log.status
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-1 text-xs text-muted-foreground",
					children: log.message
				})] }),
				/* @__PURE__ */ jsxs(Cell, { children: [log.sourceFile, /* @__PURE__ */ jsx("div", {
					className: "text-xs text-muted-foreground",
					children: log.hash
				})] })
			] }, log.id))
		})]
	});
}
function SecurityPanel() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			title: "Seguridad y auditoría",
			description: "Permisos independientes y registro de operaciones sensibles.",
			icon: ShieldCheck
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-3 xl:grid-cols-2",
			children: [/* @__PURE__ */ jsxs(Panel, { children: [
				/* @__PURE__ */ jsx(PanelHeading, {
					title: "Permisos del módulo",
					subtitle: "Perfil: Especialista presupuestal"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: [
						"Administrador",
						"Configuración SIAF",
						"Importación",
						"Homologación",
						"Conciliación",
						"Consulta",
						"Reportes"
					].map((permission, index) => /* @__PURE__ */ jsxs("label", {
						className: "flex items-center justify-between rounded-md border border-border p-2.5 text-sm font-medium text-foreground",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(KeyRound, {
								size: 16,
								className: "text-muted-foreground",
								"aria-hidden": true
							}), permission]
						}), /* @__PURE__ */ jsx("input", {
							type: "checkbox",
							defaultChecked: index !== 0,
							className: CHECK
						})]
					}, permission))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-3 rounded-md border border-warning bg-warning-soft p-2.5 text-xs leading-4 text-warning",
					children: "Las credenciales de conexión se mantienen fuera del almacenamiento del navegador y deben cifrarse en el servicio seguro del backend."
				})
			] }), /* @__PURE__ */ jsxs(Panel, { children: [/* @__PURE__ */ jsx(PanelHeading, {
				title: "Auditoría reciente",
				subtitle: "Creación, modificación, actualización y homologación"
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-2",
				children: [
					[
						"21/08/2026 10:42",
						"mquiroz",
						"ACTUALIZACIÓN",
						"SIAF 2026 · Julio"
					],
					[
						"21/08/2026 09:18",
						"jperez",
						"HOMOLOGACIÓN",
						"Meta 0012 con 3 predios"
					],
					[
						"20/08/2026 16:04",
						"admin",
						"MODIFICACIÓN",
						"Conexión SIAF · UE 001"
					]
				].map((row) => /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-[125px_90px_110px_1fr] gap-2 rounded-md border border-border bg-background p-2 text-xs",
					children: [
						/* @__PURE__ */ jsx("span", { children: row[0] }),
						/* @__PURE__ */ jsx("strong", { children: row[1] }),
						/* @__PURE__ */ jsx(Badge, {
							tone: "blue",
							children: row[2]
						}),
						/* @__PURE__ */ jsx("span", { children: row[3] })
					]
				}, row.join("-")))
			})] })]
		})]
	});
}
var inputClass = controlClase;
var buttonPrimary = buttonVariants({});
var buttonSecondary = buttonVariants({ variant: "outline" });
var smallButton = buttonVariants({
	variant: "outline",
	size: "sm"
});
function Panel({ children }) {
	return /* @__PURE__ */ jsx("section", {
		className: "rounded-lg border border-border bg-card p-4",
		children
	});
}
function PanelHeading({ title, subtitle }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-3 border-b border-border pb-1",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-sm font-bold uppercase text-primary-dark",
			children: title
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-0.5 text-xs text-muted-foreground",
			children: subtitle
		})]
	});
}
function SectionTitle({ title, description, icon: Icon, action }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center justify-between gap-2 border-b-2 border-primary pb-1",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ jsx(Icon, {
				size: 16,
				className: "mt-0.5 shrink-0 text-primary",
				"aria-hidden": true
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-bold uppercase text-primary-dark",
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: description
			})] })]
		}), action]
	});
}
/** Etiqueta a la izquierda y control a la derecha (FormField); asocia la etiqueta al control hijo. */
function Field({ label, hint, children }) {
	return /* @__PURE__ */ jsx(FormField, {
		etiqueta: label,
		ayuda: hint,
		children: (id) => isValidElement(children) ? cloneElement(children, { id }) : children
	});
}
function Input({ id, value = "", onChange = () => void 0, placeholder }) {
	return /* @__PURE__ */ jsx("input", {
		id,
		value,
		onChange: (event) => onChange(event.target.value),
		placeholder,
		className: inputClass
	});
}
function Select({ id, value, options, onChange = () => void 0 }) {
	return /* @__PURE__ */ jsx("select", {
		id,
		value,
		onChange: (event) => onChange(event.target.value),
		className: inputClass,
		children: options.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
	});
}
function ContextSelect({ label, value, options, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [/* @__PURE__ */ jsx("span", {
			className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("select", {
			value,
			onChange: (event) => onChange(event.target.value),
			className: inputClass,
			children: options.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
		})]
	});
}
var TONO = {
	slate: "neutral",
	blue: "primary",
	green: "success",
	amber: "warning",
	red: "destructive"
};
function Badge({ children, tone = "slate" }) {
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: TONO[tone],
		children
	});
}
function ConnectionBadge({ status }) {
	if (status === "testing") return /* @__PURE__ */ jsxs(Badge, {
		tone: "blue",
		children: [/* @__PURE__ */ jsx(Loader2, {
			size: 12,
			className: "mr-1 animate-spin",
			"aria-hidden": true
		}), " Probando conexión"]
	});
	if (status === "success") return /* @__PURE__ */ jsxs(Badge, {
		tone: "green",
		children: [/* @__PURE__ */ jsx(CheckCircle2, {
			size: 12,
			className: "mr-1",
			"aria-hidden": true
		}), " Conexión establecida"]
	});
	if (status === "failed") return /* @__PURE__ */ jsxs(Badge, {
		tone: "red",
		children: [/* @__PURE__ */ jsx(XCircle, {
			size: 12,
			className: "mr-1",
			"aria-hidden": true
		}), " Conexión fallida"]
	});
	return /* @__PURE__ */ jsx(Badge, { children: "Sin probar" });
}
function PeriodPanel({ title, subtitle, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "overflow-hidden rounded-lg border border-border bg-card",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-sm font-bold uppercase text-primary-dark",
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: subtitle
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "divide-y divide-border",
			children
		})]
	});
}
function PeriodRow({ period, selected, onSelect }) {
	return /* @__PURE__ */ jsxs("label", {
		className: `grid cursor-pointer grid-cols-[18px_52px_1fr_auto] items-center gap-2 px-4 py-2.5 text-sm ${selected ? "bg-primary-soft" : "hover:bg-background"}`,
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: selected,
				onChange: onSelect,
				className: CHECK
			}),
			/* @__PURE__ */ jsx("strong", { children: period.year }),
			/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("strong", { children: period.period }), /* @__PURE__ */ jsxs("span", {
				className: "ml-2 text-muted-foreground",
				children: [
					period.origin,
					" · ",
					period.records.toLocaleString("es-PE"),
					" registros · BD",
					" ",
					period.databaseDate
				]
			})] }),
			/* @__PURE__ */ jsx(Badge, {
				tone: period.status === "Observado" ? "amber" : period.status === "Procesado" ? "green" : "blue",
				children: period.status
			})
		]
	});
}
function ProcessingPeriodRow({ period, onRemove }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-[52px_1fr_auto] items-center gap-2 px-4 py-2.5 text-sm",
		children: [
			/* @__PURE__ */ jsx("strong", { children: period.year }),
			/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("strong", { children: period.period }), /* @__PURE__ */ jsxs("span", {
				className: "ml-2 text-muted-foreground",
				children: [
					period.records.toLocaleString("es-PE"),
					" registros · ",
					period.databaseDate
				]
			})] }),
			/* @__PURE__ */ jsx(BotonEliminar, {
				etiqueta: `Quitar periodo ${period.year} ${period.period}`,
				onClick: onRemove
			})
		]
	});
}
function BotonEliminar({ etiqueta, onClick }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		"aria-label": etiqueta,
		title: etiqueta,
		onClick,
		className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
		children: /* @__PURE__ */ jsx(Trash2, {
			size: 16,
			"aria-hidden": true
		})
	});
}
function Empty({ text }) {
	return /* @__PURE__ */ jsx("p", {
		className: "px-4 py-10 text-center text-sm text-muted-foreground",
		children: text
	});
}
function ActionFooter({ onCancel, onSave, accion = "Guardar cambios" }) {
	return /* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsx(Button, {
		type: "button",
		variant: "outline",
		onClick: onCancel,
		children: "Cancelar"
	}), /* @__PURE__ */ jsxs(Button, {
		type: "button",
		onClick: onSave,
		children: [
			/* @__PURE__ */ jsx(Save, {}),
			" ",
			accion
		]
	})] });
}
/** Misma interfaz de siempre (`<tr key><Cell>…</Cell></tr>`), dibujada con `Tabla` del kit (R9). */
function DataTable({ headers, children }) {
	const filas = Children.toArray(children).filter(isValidElement);
	const celdas = (fila) => Children.toArray(fila.props.children).filter(isValidElement);
	return /* @__PURE__ */ jsx(Tabla, {
		columnas: headers.map((h, i) => ({
			clave: h,
			titulo: h,
			render: (fila) => {
				const c = celdas(fila)[i];
				if (!c) return null;
				return c.props.strong ? /* @__PURE__ */ jsx("span", {
					className: "font-medium text-foreground",
					children: c.props.children
				}) : c.props.children;
			}
		})),
		filas,
		claveFila: (f, i) => f.key ?? i
	});
}
/** Marcador de celda: `DataTable` lee sus props; nunca se renderiza como `<td>`. */
function Cell(_props) {
	return null;
}
function Catalog({ title, headers, rows }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "overflow-hidden rounded-lg border border-border bg-card",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-sm font-bold uppercase text-primary-dark",
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Código y descripción original conservados · Datos de demostración"
			})]
		}), /* @__PURE__ */ jsx(Tabla, {
			columnas: headers.map((h, i) => ({
				clave: h,
				titulo: h,
				render: (row) => row[i]
			})),
			filas: rows,
			claveFila: (_, i) => `${title}-${i}`
		})]
	});
}
function Metric({ label, value, tone }) {
	const cls = {
		green: "border-success bg-success-soft text-success",
		amber: "border-warning bg-warning-soft text-warning",
		red: "border-destructive bg-destructive-soft text-destructive"
	}[tone];
	return /* @__PURE__ */ jsxs("div", {
		className: `rounded-lg border border-l-4 p-3 ${cls}`,
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-medium uppercase",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: "text-lg font-semibold tabular-nums",
			children: value
		})]
	});
}
function SeverityBadge({ severity }) {
	if (severity === "Correcto") return /* @__PURE__ */ jsx(Badge, {
		tone: "green",
		children: "Correcto"
	});
	if (severity === "Advertencia") return /* @__PURE__ */ jsx(Badge, {
		tone: "amber",
		children: "Observado"
	});
	return /* @__PURE__ */ jsx(Badge, {
		tone: "red",
		children: "Error crítico"
	});
}
function modeDescription(mode) {
	if (mode === "Solo pendientes") return "Importa únicamente registros que todavía no han sido procesados.";
	if (mode === "Incremental") return "Inserta registros nuevos y actualiza aquellos que fueron modificados.";
	if (mode === "Reprocesar periodo") return "Reemplaza solo el año y periodo actualmente seleccionados.";
	return "Reconstruye toda la información del periodo después de confirmar la operación.";
}
//#endregion
export { SiafCeplanPage as component };
