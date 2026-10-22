import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Activity, AlertCircle, CheckCircle2, Clock3, Eye, EyeOff, KeyRound, Link2, LoaderCircle, Network, Save, Settings2, ShieldCheck, X } from "lucide-react";
//#region src/routes/interoperabilidad.tsx?tsr-split=component
var STORAGE_KEY = "pdgp:interoperabilidad:config:v1";
var CLAVE_HISTORIAL = "interoperabilidad";
var BITACORA = {
	modulo: 9,
	entidad: "interoperabilidad"
};
var ETIQUETAS_CONFIG = {
	enabled: "Servicio activo",
	health: "Estado técnico",
	environment: "Ambiente",
	protocol: "Protocolo",
	method: "Método HTTP",
	endpoint: "Endpoint",
	authType: "Tipo de autenticación",
	token: "Token Bearer",
	tokenEndpoint: "Endpoint de token",
	clientId: "Client ID",
	clientSecret: "Client Secret",
	username: "Usuario",
	password: "Contraseña",
	apiKeyName: "Nombre de cabecera",
	apiKey: "API Key",
	scope: "Scope",
	certificateAlias: "Alias del certificado",
	timeout: "Tiempo de espera",
	retries: "Reintentos",
	headers: "Cabeceras HTTP",
	notes: "Notas técnicas",
	lastCheck: "Última validación"
};
/** Las credenciales no se copian al histórico: solo una huella para saber que cambiaron. */
var SECRETOS = [
	"token",
	"clientSecret",
	"password",
	"apiKey"
];
var OCULTO = "(oculto";
function huella(valor) {
	let h = 5381;
	for (const c of valor) h = h * 33 + c.charCodeAt(0) >>> 0;
	return h.toString(36);
}
function sinSecretos(configs) {
	return Object.fromEntries(Object.entries(configs).map(([code, config]) => {
		const copia = { ...config };
		for (const k of SECRETOS) if (config[k]) copia[k] = `${OCULTO} ${huella(config[k])})`;
		return [code, copia];
	}));
}
/** Al restaurar, las credenciales ocultas conservan el valor vigente. */
function conSecretosVigentes(registro, vigentes) {
	const next = initialConfigMap();
	for (const code of Object.keys(next)) {
		const version = registro[code];
		if (!version) continue;
		next[code] = {
			...next[code],
			...version
		};
		for (const k of SECRETOS) if (String(version[k] ?? "").startsWith(OCULTO)) next[code][k] = vigentes[code]?.[k] ?? "";
	}
	return next;
}
var monoCls = `${controlClase} font-mono text-xs`;
var textareaCls = `${controlClase} h-auto min-h-20 py-2 font-mono text-xs`;
var CHECK = "size-4 rounded-sm accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";
var serviceCatalog = [
	{
		code: "ID-01",
		category: "Identificación de personas naturales",
		name: "Consulta de identidad por DNI",
		entity: "RENIEC",
		input: "Número de DNI",
		description: "Validar la identidad de una persona natural peruana vinculada con un procedimiento de gestión predial.",
		expected: "Nombres, apellidos, fecha de nacimiento o defunción, fotografía, estado civil, domicilio, ubigeo y condición del documento.",
		protocol: "REST"
	},
	{
		code: "ID-02",
		category: "Identificación de personas naturales",
		name: "Consulta de carné de extranjería",
		entity: "Migraciones",
		input: "Número de carné de extranjería o documento migratorio",
		description: "Validar la identidad de una persona extranjera propietaria, posesionaria, ocupante, representante o afectada.",
		expected: "Nombres, apellidos, nacionalidad, documento, calidad migratoria, vigencia, fotografía y domicilio.",
		protocol: "REST"
	},
	{
		code: "PJ-01",
		category: "Identificación de personas jurídicas",
		name: "Consulta de ficha RUC",
		entity: "SUNAT",
		input: "Número de RUC",
		description: "Validar la existencia, condición tributaria, domicilio fiscal, representantes y datos generales de una persona jurídica.",
		expected: "Razón social, contribuyente, estado, actividad económica, domicilio, ubigeo y representantes legales.",
		protocol: "REST"
	},
	{
		code: "GD-01",
		category: "Gestión documental institucional",
		name: "Gestión integral de expedientes y documentos",
		entity: "STD - MTC",
		input: "Hoja de ruta, expediente, documento, proyecto y predio",
		description: "Consultar expedientes e historial de derivaciones y registrar documentos generados por la plataforma predial.",
		expected: "Hoja de ruta, expediente, asunto, documentos, derivaciones, unidad responsable, estado y última actuación.",
		protocol: "SOAP"
	},
	{
		code: "FD-01",
		category: "Firma digital",
		name: "Firma digital de documentos del expediente (Firma Perú)",
		entity: "PCM - Firma Perú",
		input: "PDF numerado del expediente, firmante, razón y posición del sello (PAdES)",
		description: "Enviar a firma los documentos que genera el sistema y recibir el PDF firmado con certificado digital del Estado para el expediente predial digital.",
		expected: "PDF firmado (PAdES), firmante, fecha y hora de firma, cadena del certificado y estado de validación.",
		protocol: "REST"
	},
	{
		code: "FD-02",
		category: "Firma digital",
		name: "Validación de firmas digitales (ReFirma)",
		entity: "RENIEC - ReFirma",
		input: "PDF firmado",
		description: "Validar la cadena de confianza y la vigencia del certificado de las firmas de un PDF subido al expediente.",
		expected: "Firmantes, certificado, emisor, vigencia, revocación y resultado de la validación.",
		protocol: "REST"
	},
	{
		code: "SR-01",
		category: "Publicidad registral de SUNARP",
		name: "Consulta de partida registral",
		entity: "SUNARP",
		input: "Número de partida y oficina registral",
		description: "Consultar el contenido de una partida registral inmobiliaria.",
		expected: "Titularidad, inmueble, antecedentes, cargas, gravámenes, anotaciones, títulos, PDF e imágenes de asientos.",
		protocol: "REST"
	},
	{
		code: "SR-03",
		category: "Publicidad registral de SUNARP",
		name: "Consulta de títulos archivados",
		entity: "SUNARP",
		input: "Número de título, año, partida y oficina registral",
		description: "Consultar los documentos que dieron mérito a una inscripción registral.",
		expected: "Escrituras, formularios, resoluciones, planos, memorias descriptivas, anexos e imágenes o PDF.",
		protocol: "REST"
	},
	{
		code: "SR-04",
		category: "Publicidad registral de SUNARP",
		name: "Consulta de cargas y gravámenes",
		entity: "SUNARP",
		input: "Número de partida",
		description: "Identificar restricciones o derechos inscritos que afectan al inmueble.",
		expected: "Hipotecas, embargos, demandas, servidumbres, bloqueos, cargas técnicas y demás afectaciones.",
		protocol: "REST"
	},
	{
		code: "SR-05",
		category: "Publicidad registral de SUNARP",
		name: "Consulta de antecedentes registrales",
		entity: "SUNARP",
		input: "Número de partida",
		description: "Identificar partidas matrices, independizaciones, acumulaciones y títulos anteriores.",
		expected: "Partida matriz, partidas independizadas, antecedentes de dominio y títulos archivados.",
		protocol: "REST"
	},
	{
		code: "SI-01",
		category: "Presentación e inscripción registral",
		name: "Presentación electrónica de títulos",
		entity: "SID-SUNARP",
		input: "Parte, formulario, resolución, planos y documentos firmados",
		description: "Presentar electrónicamente títulos destinados a inscripción registral.",
		expected: "Número de título, fecha, hora, oficina, asiento de presentación y constancia de ingreso.",
		protocol: "SOAP"
	},
	{
		code: "SI-02",
		category: "Presentación e inscripción registral",
		name: "Seguimiento del título",
		entity: "SID-SUNARP",
		input: "Número de título, año y oficina registral",
		description: "Consultar el avance del procedimiento de calificación registral.",
		expected: "Estado, observaciones, esquela, liquidación, pago, subsanación, inscripción, tacha o desistimiento.",
		protocol: "REST"
	},
	{
		code: "SI-03",
		category: "Presentación e inscripción registral",
		name: "Consulta de observaciones",
		entity: "SUNARP",
		input: "Número de título",
		description: "Obtener las observaciones formuladas por el registrador público.",
		expected: "Esquela, requisitos pendientes, fecha de notificación y plazo de subsanación.",
		protocol: "REST"
	},
	{
		code: "SI-04",
		category: "Presentación e inscripción registral",
		name: "Consulta de liquidación registral",
		entity: "SUNARP",
		input: "Número de título",
		description: "Consultar los derechos registrales pendientes de pago.",
		expected: "Monto, concepto, fechas de emisión y vencimiento, y estado del pago.",
		protocol: "REST"
	},
	{
		code: "SI-05",
		category: "Presentación e inscripción registral",
		name: "Descarga del asiento inscrito",
		entity: "SUNARP",
		input: "Número de título o partida",
		description: "Obtener el resultado final de la inscripción registral.",
		expected: "Asiento inscrito, constancia, partida actualizada y archivo PDF.",
		protocol: "REST"
	},
	{
		code: "GC-01",
		category: "Información gráfica y catastral",
		name: "Consulta gráfica mediante polígono",
		entity: "SUNARP",
		input: "Polígono georreferenciado del área de interés",
		description: "Comparar el área enviada con la Base Gráfica Registral.",
		expected: "Polígonos intersectados, partidas, ubicación y geometrías resultantes.",
		protocol: "OGC API"
	},
	{
		code: "BE-01",
		category: "Bienes inmuebles del Estado",
		name: "Consulta de predios estatales por polígono",
		entity: "SBN / SINABIP",
		input: "Polígono georreferenciado del área de interés",
		description: "Comparar el área del proyecto con la información de bienes inmuebles del Estado.",
		expected: "Predios intersectados, código SINABIP, entidad titular, ubicación y condición jurídica.",
		protocol: "OGC API"
	},
	{
		code: "PF-01",
		category: "Seguimiento presupuestal y financiero",
		name: "Consulta de certificación presupuestal",
		entity: "SIAF-SP",
		input: "Número de certificación, expediente o proyecto",
		description: "Verificar la disponibilidad presupuestal para efectuar un pago.",
		expected: "Número de certificación, monto, saldo, fecha y estado.",
		protocol: "REST"
	},
	{
		code: "PF-02",
		category: "Seguimiento presupuestal y financiero",
		name: "Consulta de compromiso",
		entity: "SIAF-SP",
		input: "Número de expediente SIAF",
		description: "Consultar el registro del compromiso presupuestal.",
		expected: "Número de compromiso, monto, fecha, beneficiario, concepto y estado.",
		protocol: "REST"
	},
	{
		code: "PF-03",
		category: "Seguimiento presupuestal y financiero",
		name: "Consulta de devengado",
		entity: "SIAF-SP",
		input: "Número de expediente SIAF",
		description: "Verificar que la obligación de pago haya sido reconocida.",
		expected: "Número de devengado, monto, fecha, concepto, beneficiario y estado.",
		protocol: "REST"
	},
	{
		code: "PF-04",
		category: "Seguimiento presupuestal y financiero",
		name: "Consulta de girado",
		entity: "SIAF-SP",
		input: "Número de expediente SIAF",
		description: "Consultar la emisión de la orden financiera para realizar el pago.",
		expected: "Número de girado, monto, fecha, cuenta, beneficiario y estado.",
		protocol: "REST"
	},
	{
		code: "PF-05",
		category: "Seguimiento presupuestal y financiero",
		name: "Consulta de pago",
		entity: "SIAF-SP / Tesorería",
		input: "Expediente SIAF, DNI, RUC o beneficiario",
		description: "Verificar si el pago fue ejecutado.",
		expected: "Estado pagado, fecha, monto, beneficiario, comprobante y medio de pago.",
		protocol: "REST"
	},
	{
		code: "PF-06",
		category: "Seguimiento presupuestal y financiero",
		name: "Consulta de pagos por predio",
		entity: "SIAF-SP / PDGP",
		input: "Código del predio o expediente predial",
		description: "Relacionar los registros financieros con el inmueble afectado.",
		expected: "Tasación, incentivo, compensación, indemnización, mejoras, monto, fecha y estado.",
		protocol: "REST"
	},
	{
		code: "PF-07",
		category: "Seguimiento presupuestal y financiero",
		name: "Consulta de observaciones o devoluciones",
		entity: "SIAF-SP / Tesorería",
		input: "Número de expediente financiero",
		description: "Identificar problemas que impiden continuar con el pago.",
		expected: "Motivo de observación, devolución o rechazo, documento pendiente y unidad responsable.",
		protocol: "REST"
	},
	{
		code: "PF-08",
		category: "Seguimiento presupuestal y financiero",
		name: "Ejecución presupuestal por CUI y meta (datos abiertos del MEF)",
		entity: "MEF · Consulta Amigable / datos abiertos",
		input: "Año, pliego 036, unidad ejecutora, CUI, meta presupuestaria y específicas del vínculo",
		description: "PIA, PIM, certificado, compromiso, devengado y girado del proyecto, mes a mes, para conciliar las metas. Disponible hoy por archivo CSV; con convenio, descarga diaria.",
		expected: "Filas del CSV de gasto mensual filtradas por el vínculo SIAF de cada proyecto.",
		protocol: "REST"
	},
	{
		code: "PF-09",
		category: "Seguimiento presupuestal y financiero",
		name: "Consulta SIAF-RP por expediente",
		entity: "MEF · SIAF-RP",
		input: "Unidad ejecutora, año y número de expediente SIAF",
		description: "Fases del expediente (certificación, compromiso, devengado, girado, pagado) con documento y beneficiario. Pendiente de convenio con el MEF; el SIAF-RP está en construcción hasta 2027.",
		expected: "Movimientos del expediente para cruzarlos con el pago registrado en el predio.",
		protocol: "REST"
	},
	{
		code: "PF-10",
		category: "Seguimiento presupuestal y financiero",
		name: "Avance físico de la inversión (Formato 12-B)",
		entity: "MEF · Banco de Inversiones (Invierte.pe)",
		input: "CUI",
		description: "Avance físico y financiero acumulado declarado por la UF en el Formato 12-B. Pendiente de convenio; mientras, se anota a mano en la conciliación.",
		expected: "Porcentaje de avance físico acumulado y mes de corte.",
		protocol: "REST"
	}
];
var initiallyEnabled = /* @__PURE__ */ new Set([
	"ID-01",
	"PJ-01",
	"GD-01",
	"SR-01",
	"PF-01",
	"PF-03",
	"PF-05",
	"PF-08"
]);
/** Servicios sin endpoint propio: lo que hoy los reemplaza y lo que falta para conectarlos. */
var NOTAS_SIAF = {
	"PF-08": {
		endpoint: "https://fs.datosabiertos.mef.gob.pe/datastorefiles/{AÑO}-Gasto-Mensual.csv",
		notes: "Hoy: carga por archivo en «Metas del proyecto › Ejecución SIAF». El CSV completo pesa cientos de MB; con backend se descarga y filtra por pliego 036 en una tarea diaria."
	},
	"PF-09": {
		endpoint: "",
		notes: "Pendiente de convenio con el MEF. Mientras, la UE exporta del SIAF-SP el detalle por expediente y se carga como archivo."
	},
	"PF-10": {
		endpoint: "",
		notes: "Pendiente de convenio con el MEF. Mientras, el avance del 12-B se anota a mano en la conciliación de metas."
	}
};
function defaultConfig(service) {
	const enabled = initiallyEnabled.has(service.code);
	return {
		enabled,
		health: enabled ? "OPERATIVO" : "SIN_CONFIGURAR",
		environment: enabled ? "PRODUCCION" : "PRUEBAS",
		protocol: service.protocol,
		method: service.protocol === "SOAP" ? "POST" : "GET",
		endpoint: NOTAS_SIAF[service.code]?.endpoint ?? (enabled ? "https://api.pdgp.mtc.gob.pe/interoperabilidad/" + service.code.toLowerCase() : ""),
		authType: "NONE",
		token: "",
		tokenEndpoint: "",
		clientId: "",
		clientSecret: "",
		username: "",
		password: "",
		apiKeyName: "X-API-Key",
		apiKey: "",
		scope: "",
		certificateAlias: "",
		timeout: "30",
		retries: "2",
		headers: "{\n  \"Content-Type\": \"application/json\",\n  \"Accept\": \"application/json\"\n}",
		notes: NOTAS_SIAF[service.code]?.notes ?? "",
		lastCheck: enabled ? "03/09/2026 09:30" : ""
	};
}
function initialConfigMap() {
	return Object.fromEntries(serviceCatalog.map((service) => [service.code, defaultConfig(service)]));
}
var ESTADO_TONO = {
	Inactivo: "neutral",
	Operativo: "success",
	"Por configurar": "warning",
	"Con error": "destructive"
};
function estadoDe(config) {
	if (!config.enabled) return "Inactivo";
	if (config.health === "OPERATIVO") return "Operativo";
	if (config.health === "CON_ERROR") return "Con error";
	return "Por configurar";
}
var opciones = (valores) => valores.map((v) => ({
	valor: v,
	texto: v
}));
function InteroperabilidadPage() {
	const [configs, setConfigs] = useState(initialConfigMap);
	const rol = useRol();
	const [selectedService, setSelectedService] = useState(null);
	const [draft, setDraft] = useState(null);
	const [showSecrets, setShowSecrets] = useState(false);
	const [testing, setTesting] = useState(false);
	const [feedback, setFeedback] = useState(null);
	const [pageNotice, setPageNotice] = useState("");
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (!stored) return;
			const parsed = JSON.parse(stored);
			const defaults = initialConfigMap();
			Object.keys(defaults).forEach((code) => {
				if (parsed[code]) defaults[code] = {
					...defaults[code],
					...parsed[code]
				};
			});
			setConfigs(defaults);
		} catch {
			setConfigs(initialConfigMap());
		}
	}, []);
	const categories = useMemo(() => Array.from(new Set(serviceCatalog.map((service) => service.category))).sort(), []);
	const entities = useMemo(() => Array.from(new Set(serviceCatalog.map((service) => service.entity))).sort(), []);
	const filas = useMemo(() => serviceCatalog.map((service) => {
		const config = configs[service.code];
		return {
			...service,
			config,
			activoTexto: config.enabled ? "Sí" : "No",
			estadoTexto: estadoDe(config),
			lastCheck: config.lastCheck || "Sin validar"
		};
	}), [configs]);
	const stats = useMemo(() => {
		const values = Object.values(configs);
		return {
			active: values.filter((config) => config.enabled).length,
			operative: values.filter((config) => config.enabled && config.health === "OPERATIVO").length,
			inactive: values.filter((config) => !config.enabled).length,
			pending: values.filter((config) => config.health === "SIN_CONFIGURAR").length
		};
	}, [configs]);
	function persist(next, accion, objeto) {
		registrarCambio(CLAVE_HISTORIAL, {
			accion,
			objeto,
			antes: sinSecretos(configs),
			despues: sinSecretos(next)
		}, BITACORA);
		setConfigs(next);
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	}
	function toggleEnabled(service) {
		const current = configs[service.code];
		const enabled = !current.enabled;
		const nextConfig = {
			...current,
			enabled,
			health: enabled && !current.endpoint ? "SIN_CONFIGURAR" : current.health
		};
		persist({
			...configs,
			[service.code]: nextConfig
		}, enabled ? "Activó servicio" : "Desactivó servicio", `${service.code} ${service.name}`);
		setPageNotice(service.code + " " + (enabled ? "activado. Revise su configuración." : "desactivado."));
	}
	function openConfiguration(service) {
		setSelectedService(service);
		setDraft({ ...configs[service.code] });
		setShowSecrets(false);
		setFeedback(null);
	}
	function closeConfiguration() {
		setSelectedService(null);
		setDraft(null);
		setFeedback(null);
		setTesting(false);
	}
	function updateDraft(key, value) {
		setDraft((current) => current ? {
			...current,
			[key]: value
		} : current);
		setFeedback(null);
	}
	function validateDraft() {
		if (!draft) return "No existe una configuración para validar.";
		if (draft.enabled && !draft.endpoint.trim()) return "Ingrese el endpoint del servicio.";
		if (draft.endpoint && !/^https?:\/\//i.test(draft.endpoint)) return "El endpoint debe comenzar con http:// o https://.";
		if (Number(draft.timeout) < 1 || Number(draft.timeout) > 300) return "El tiempo de espera debe estar entre 1 y 300 segundos.";
		try {
			JSON.parse(draft.headers || "{}");
		} catch {
			return "Las cabeceras HTTP deben tener un formato JSON válido.";
		}
		if (draft.authType === "BEARER" && draft.enabled && !draft.token.trim()) return "Ingrese el token Bearer requerido por el servicio.";
		if (draft.authType === "API_KEY" && draft.enabled && !draft.apiKey.trim()) return "Ingrese la API Key requerida por el servicio.";
		if (draft.authType === "BASIC" && draft.enabled && (!draft.username || !draft.password)) return "Ingrese el usuario y la contraseña.";
		if (draft.authType === "OAUTH2" && draft.enabled && (!draft.tokenEndpoint || !draft.clientId || !draft.clientSecret)) return "Complete el endpoint de token, Client ID y Client Secret.";
		if (draft.authType === "MTLS" && draft.enabled && !draft.certificateAlias) return "Ingrese el alias del certificado mTLS.";
		return "";
	}
	function testParameters() {
		const error = validateDraft();
		if (error) {
			setFeedback({
				kind: "error",
				text: error
			});
			return;
		}
		setTesting(true);
		window.setTimeout(() => {
			setDraft((current) => current ? {
				...current,
				health: current.enabled ? "OPERATIVO" : current.health,
				lastCheck: (/* @__PURE__ */ new Date()).toLocaleString("es-PE")
			} : current);
			setTesting(false);
			setFeedback({
				kind: "success",
				text: "Parámetros validados. La configuración tiene el formato requerido."
			});
		}, 650);
	}
	function saveConfiguration(event) {
		event.preventDefault();
		if (!selectedService || !draft) return;
		const error = validateDraft();
		if (error) {
			setFeedback({
				kind: "error",
				text: error
			});
			return;
		}
		const savedDraft = {
			...draft,
			health: draft.enabled && draft.endpoint ? "OPERATIVO" : draft.health,
			lastCheck: draft.enabled && draft.endpoint ? draft.lastCheck || (/* @__PURE__ */ new Date()).toLocaleString("es-PE") : draft.lastCheck
		};
		persist({
			...configs,
			[selectedService.code]: savedDraft
		}, "Modificó configuración del servicio", `${selectedService.code} ${selectedService.name}`);
		setPageNotice("Configuración guardada para " + selectedService.code + " · " + selectedService.name + ".");
		closeConfiguration();
	}
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		pageNotice && /* @__PURE__ */ jsxs("p", {
			role: "status",
			className: "mb-4 flex items-center justify-between gap-3 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						"aria-hidden": true
					}),
					" ",
					pageNotice
				]
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setPageNotice(""),
				"aria-label": "Cerrar mensaje",
				className: "rounded-sm hover:bg-success/10",
				children: /* @__PURE__ */ jsx(X, {
					size: 16,
					"aria-hidden": true
				})
			})]
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Interoperabilidad",
			icono: Network,
			descripcion: "Catálogo y configuración de los servicios de información requeridos por la plataforma. Última revisión del catálogo: 03/09/2026.",
			migas: [{ texto: "Interoperabilidad" }, { texto: "Servicios externos" }],
			columnas: [
				{
					clave: "code",
					titulo: "Código",
					ancho: "90px",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "font-mono font-semibold text-primary-dark",
						children: f.code
					})
				},
				{
					clave: "name",
					titulo: "Servicio requerido",
					render: (f) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("p", {
						className: "font-medium",
						children: f.name
					}), /* @__PURE__ */ jsxs("p", {
						className: "max-w-[260px] truncate text-xs text-muted-foreground",
						title: f.input,
						children: ["Entrada: ", f.input]
					})] })
				},
				{
					clave: "entity",
					titulo: "Entidad / sistema",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: f.entity
					})
				},
				{
					clave: "category",
					titulo: "Categoría",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: f.category
					})
				},
				{
					clave: "protocol",
					titulo: "Protocolo",
					render: (f) => /* @__PURE__ */ jsx(StatusBadge, { children: f.config.protocol })
				},
				{
					clave: "activoTexto",
					titulo: "Activo",
					alinear: "centro",
					render: (f) => /* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: f.config.enabled,
						onChange: () => toggleEnabled(f),
						onClick: (e) => e.stopPropagation(),
						"aria-label": `${f.config.enabled ? "Desactivar" : "Activar"} ${f.name}`,
						className: CHECK
					})
				},
				{
					clave: "estadoTexto",
					titulo: "Estado técnico",
					render: (f) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: ESTADO_TONO[f.estadoTexto],
						children: f.estadoTexto
					})
				},
				{
					clave: "lastCheck",
					titulo: "Última validación",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: f.lastCheck
					})
				}
			],
			filas,
			claveFila: (f) => f.code,
			filtros: [
				{
					clave: "category",
					etiqueta: "Categoría",
					opciones: opciones(categories)
				},
				{
					clave: "entity",
					etiqueta: "Entidad",
					opciones: opciones(entities)
				},
				{
					clave: "activoTexto",
					etiqueta: "Activo",
					opciones: opciones(["Sí", "No"])
				},
				{
					clave: "estadoTexto",
					etiqueta: "Estado técnico",
					opciones: opciones(Object.keys(ESTADO_TONO))
				}
			],
			buscarEn: [
				"code",
				"name",
				"entity",
				"category",
				"input"
			],
			accionesFila: [{
				nombre: "Configurar servicio",
				icono: Settings2,
				onClick: openConfiguration
			}],
			onFilaClick: openConfiguration,
			exportar: (visibles) => exportarExcel("interoperabilidad", [
				{
					titulo: "Código",
					valor: (f) => f.code
				},
				{
					titulo: "Servicio",
					valor: (f) => f.name
				},
				{
					titulo: "Entidad",
					valor: (f) => f.entity
				},
				{
					titulo: "Categoría",
					valor: (f) => f.category
				},
				{
					titulo: "Protocolo",
					valor: (f) => f.config.protocol
				},
				{
					titulo: "Activo",
					valor: (f) => f.activoTexto
				},
				{
					titulo: "Estado técnico",
					valor: (f) => f.estadoTexto
				},
				{
					titulo: "Endpoint",
					valor: (f) => f.config.endpoint
				},
				{
					titulo: "Última validación",
					valor: (f) => f.lastCheck
				}
			], visibles),
			vacio: "El catálogo de servicios está vacío.",
			historial: {
				registro: CLAVE_HISTORIAL,
				etiquetas: {
					...ETIQUETAS_CONFIG,
					...Object.fromEntries(serviceCatalog.map((x) => [x.code, `${x.code} ${x.name}`]))
				},
				etiquetaFila: (f) => f.code,
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: (registro, n) => persist(conSecretosVigentes(registro, configs), "Restauró una versión anterior", `versión ${n}`)
			}
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Resumen del catálogo",
			className: "mt-4",
			children: [/* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5",
				children: [
					/* @__PURE__ */ jsx(MetricCard, {
						icon: Network,
						label: "Servicios catalogados",
						value: serviceCatalog.length
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						icon: Activity,
						label: "Activos",
						value: stats.active,
						tono: "primary"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						icon: CheckCircle2,
						label: "Operativos",
						value: stats.operative,
						tono: "success"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						icon: AlertCircle,
						label: "Por configurar",
						value: stats.pending,
						tono: "warning"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						icon: Clock3,
						label: "Inactivos",
						value: stats.inactive,
						tono: "neutral"
					})
				]
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
				children: "Los parámetros se guardan en este prototipo por navegador. En producción, los tokens, contraseñas y certificados deben almacenarse cifrados en un gestor seguro de secretos."
			})]
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: selectedService !== null && draft !== null,
			onCerrar: closeConfiguration,
			titulo: selectedService ? `Configuración de ${selectedService.name}` : "Configuración",
			descripcion: selectedService ? `${selectedService.code} · ${selectedService.entity}` : void 0,
			ancho: "xl",
			pie: /* @__PURE__ */ jsxs("div", {
				className: "flex w-full flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx(KeyRound, {
						size: 16,
						className: "text-primary",
						"aria-hidden": true
					}), "Credenciales visibles solo para usuarios autorizados."]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: closeConfiguration,
							children: "Cancelar"
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							disabled: testing,
							onClick: testParameters,
							children: [testing ? /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Activity, {}), "Validar parámetros"]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							form: "form-interoperabilidad",
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar configuración"]
						})
					]
				})]
			}),
			children: selectedService && draft && /* @__PURE__ */ jsxs("form", {
				id: "form-interoperabilidad",
				onSubmit: saveConfiguration,
				children: [
					feedback && /* @__PURE__ */ jsx(FeedbackMessage, { feedback }),
					/* @__PURE__ */ jsx(Subtitulo, { children: "Información del servicio" }),
					/* @__PURE__ */ jsxs("dl", {
						className: "grid gap-3 rounded-md border border-border bg-muted p-3 lg:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(InfoLine, {
								label: "Categoría",
								value: selectedService.category
							}),
							/* @__PURE__ */ jsx(InfoLine, {
								label: "Entidad o sistema",
								value: selectedService.entity
							}),
							/* @__PURE__ */ jsx(InfoLine, {
								label: "Datos de entrada",
								value: selectedService.input
							}),
							/* @__PURE__ */ jsx(InfoLine, {
								label: "Protocolo sugerido",
								value: selectedService.protocol
							}),
							/* @__PURE__ */ jsx("div", {
								className: "lg:col-span-2",
								children: /* @__PURE__ */ jsx(InfoLine, {
									label: "Descripción",
									value: selectedService.description
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "lg:col-span-2",
								children: /* @__PURE__ */ jsx(InfoLine, {
									label: "Información esperada",
									value: selectedService.expected
								})
							})
						]
					}),
					/* @__PURE__ */ jsx(Subtitulo, { children: "Conexión" }),
					/* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Servicio activo",
							children: /* @__PURE__ */ jsxs("label", {
								className: "inline-flex h-9 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: draft.enabled,
									onChange: (event) => updateDraft("enabled", event.target.checked),
									className: CHECK
								}), "Habilitar consumo desde la plataforma"]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Ambiente",
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.environment,
								onChange: (event) => updateDraft("environment", event.target.value),
								children: [/* @__PURE__ */ jsx("option", {
									value: "PRUEBAS",
									children: "Pruebas / homologación"
								}), /* @__PURE__ */ jsx("option", {
									value: "PRODUCCION",
									children: "Producción"
								})]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Protocolo",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.protocol,
								onChange: (event) => updateDraft("protocol", event.target.value),
								children: [
									/* @__PURE__ */ jsx("option", { children: "REST" }),
									/* @__PURE__ */ jsx("option", { children: "SOAP" }),
									/* @__PURE__ */ jsx("option", { children: "OGC API" })
								]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Método HTTP",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.method,
								onChange: (event) => updateDraft("method", event.target.value),
								children: [
									/* @__PURE__ */ jsx("option", { children: "GET" }),
									/* @__PURE__ */ jsx("option", { children: "POST" }),
									/* @__PURE__ */ jsx("option", { children: "PUT" })
								]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Endpoint",
							obligatorio: draft.enabled,
							icono: Link2,
							ancho: "doble",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: monoCls,
								value: draft.endpoint,
								onChange: (event) => updateDraft("endpoint", event.target.value),
								placeholder: "https://api.entidad.gob.pe/v1/servicio"
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Tiempo de espera",
							ayuda: "Entre 1 y 300 segundos",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								type: "number",
								min: 1,
								max: 300,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.timeout,
								onChange: (event) => updateDraft("timeout", event.target.value)
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Reintentos",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								type: "number",
								min: 0,
								max: 10,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.retries,
								onChange: (event) => updateDraft("retries", event.target.value)
							})
						})
					] }),
					/* @__PURE__ */ jsx(Subtitulo, { children: "Seguridad y autenticación" }),
					/* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Tipo de autenticación",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.authType,
								onChange: (event) => updateDraft("authType", event.target.value),
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "NONE",
										children: "Sin autenticación"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "BEARER",
										children: "Bearer token"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "API_KEY",
										children: "API Key"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "BASIC",
										children: "Usuario y contraseña"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "OAUTH2",
										children: "OAuth 2.0"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "MTLS",
										children: "Certificado mTLS"
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Credenciales",
							children: /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setShowSecrets((current) => !current),
								"aria-pressed": showSecrets,
								children: [showSecrets ? /* @__PURE__ */ jsx(EyeOff, {}) : /* @__PURE__ */ jsx(Eye, {}), showSecrets ? "Ocultar valores" : "Mostrar valores"]
							})
						}),
						draft.authType === "BEARER" && /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Token Bearer",
							obligatorio: draft.enabled,
							ancho: "doble",
							children: (id) => /* @__PURE__ */ jsx(SecretInput, {
								id,
								value: draft.token,
								visible: showSecrets,
								onChange: (value) => updateDraft("token", value),
								placeholder: "Pegue el token entregado por la entidad"
							})
						}),
						draft.authType === "API_KEY" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Nombre de cabecera",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.apiKeyName,
								onChange: (event) => updateDraft("apiKeyName", event.target.value)
							})
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "API Key",
							obligatorio: draft.enabled,
							children: (id) => /* @__PURE__ */ jsx(SecretInput, {
								id,
								value: draft.apiKey,
								visible: showSecrets,
								onChange: (value) => updateDraft("apiKey", value)
							})
						})] }),
						draft.authType === "BASIC" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Usuario",
							obligatorio: draft.enabled,
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.username,
								onChange: (event) => updateDraft("username", event.target.value)
							})
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Contraseña",
							obligatorio: draft.enabled,
							children: (id) => /* @__PURE__ */ jsx(SecretInput, {
								id,
								value: draft.password,
								visible: showSecrets,
								onChange: (value) => updateDraft("password", value)
							})
						})] }),
						draft.authType === "OAUTH2" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Endpoint de token",
								obligatorio: draft.enabled,
								ancho: "doble",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: monoCls,
									value: draft.tokenEndpoint,
									onChange: (event) => updateDraft("tokenEndpoint", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Client ID",
								obligatorio: draft.enabled,
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
									value: draft.clientId,
									onChange: (event) => updateDraft("clientId", event.target.value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Client Secret",
								obligatorio: draft.enabled,
								children: (id) => /* @__PURE__ */ jsx(SecretInput, {
									id,
									value: draft.clientSecret,
									visible: showSecrets,
									onChange: (value) => updateDraft("clientSecret", value)
								})
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Scope",
								children: (id) => /* @__PURE__ */ jsx("input", {
									id,
									className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
									value: draft.scope,
									onChange: (event) => updateDraft("scope", event.target.value),
									placeholder: "consulta lectura"
								})
							})
						] }),
						draft.authType === "MTLS" && /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Alias del certificado",
							obligatorio: draft.enabled,
							icono: ShieldCheck,
							ancho: "doble",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: draft.certificateAlias,
								onChange: (event) => updateDraft("certificateAlias", event.target.value),
								placeholder: "cert-entidad-produccion"
							})
						})
					] }),
					/* @__PURE__ */ jsx(Subtitulo, { children: "Parámetros adicionales" }),
					/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Cabeceras HTTP",
						ayuda: "Formato JSON",
						ancho: "doble",
						children: (id) => /* @__PURE__ */ jsx("textarea", {
							id,
							className: textareaCls,
							value: draft.headers,
							onChange: (event) => updateDraft("headers", event.target.value),
							spellCheck: false
						})
					}), /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Notas técnicas",
						ancho: "doble",
						children: (id) => /* @__PURE__ */ jsx("textarea", {
							id,
							className: `${textareaCls} font-sans text-base`,
							value: draft.notes,
							onChange: (event) => updateDraft("notes", event.target.value),
							placeholder: "Convenio, contacto técnico, restricciones, versión u observaciones"
						})
					})] })
				]
			})
		})
	] });
}
function MetricCard({ icon: Icon, label, value, tono = "neutral" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-md border border-border p-3",
		children: [/* @__PURE__ */ jsx("span", {
			className: `inline-flex size-9 shrink-0 items-center justify-center rounded-md ${{
				neutral: "bg-muted text-muted-foreground",
				primary: "bg-primary-soft text-primary-dark",
				success: "bg-success-soft text-success",
				warning: "bg-warning-soft text-warning",
				destructive: "bg-destructive-soft text-destructive"
			}[tono]}`,
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx(Icon, { size: 16 })
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dd", {
			className: "text-lg font-semibold leading-5 tabular-nums",
			children: value
		}), /* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		})] })]
	});
}
function InfoLine({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "text-sm",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "mt-0.5 text-foreground",
			children: value
		})]
	});
}
function SecretInput({ id, value, visible, onChange, placeholder }) {
	return /* @__PURE__ */ jsx("input", {
		id,
		type: visible ? "text" : "password",
		className: monoCls,
		value,
		onChange: (event) => onChange(event.target.value),
		placeholder,
		autoComplete: "new-password"
	});
}
function FeedbackMessage({ feedback }) {
	return /* @__PURE__ */ jsxs("p", {
		role: feedback.kind === "success" ? "status" : "alert",
		className: `mb-4 flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${feedback.kind === "success" ? "border-success bg-success-soft text-success" : "border-destructive bg-destructive-soft text-destructive"}`,
		children: [feedback.kind === "success" ? /* @__PURE__ */ jsx(CheckCircle2, {
			size: 16,
			"aria-hidden": true
		}) : /* @__PURE__ */ jsx(AlertCircle, {
			size: 16,
			"aria-hidden": true
		}), feedback.text]
	});
}
//#endregion
export { InteroperabilidadPage as component };
