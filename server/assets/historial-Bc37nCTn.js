import { useEffect, useRef, useSyncExternalStore } from "react";
import { Archive, ArrowLeftRight, Banknote, BarChart3, BookOpenCheck, Boxes, Briefcase, Building2, Calculator, CircleHelp, ClipboardCheck, ClipboardList, Database, FileCheck, FileSearch, FileSignature, FileText, FolderArchive, FolderPlus, FolderTree, Gavel, Hammer, HandCoins, Handshake, Hash, HeartHandshake, HousePlus, KeyRound, LandPlot, Landmark, Layers, LayoutDashboard, Map as Map$1, MapPinned, Megaphone, Milestone, Network, PackageCheck, Ruler, Scale, Search, ShieldCheck, Stamp, TabletSmartphone, Target, UserSearch, Users, Wallet } from "lucide-react";
//#region src/lib/bitacora.ts
var CLAVE = "pdgp-bitacora";
var TOPE$1 = 5e3;
var BITACORA_EVENTO = "pdgp:bitacora";
function usuarioActual() {
	try {
		return localStorage.getItem("mtc-session") || "anónimo";
	} catch {
		return "anónimo";
	}
}
function leerBitacora() {
	try {
		return JSON.parse(localStorage.getItem(CLAVE) ?? "[]");
	} catch {
		return [];
	}
}
function registrarEnBitacora(e) {
	const entrada = {
		id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
		fecha: (/* @__PURE__ */ new Date()).toISOString(),
		usuario: e.usuario ?? usuarioActual(),
		...e
	};
	try {
		const todas = [entrada, ...leerBitacora()].slice(0, TOPE$1);
		localStorage.setItem(CLAVE, JSON.stringify(todas));
		window.dispatchEvent(new CustomEvent(BITACORA_EVENTO, { detail: entrada }));
	} catch {}
	return entrada;
}
/** Código corto de la entrada para el registro de auditoría: "sesion.ingreso", "expediente.editar". */
function codigoDeEntrada(e) {
	return `${e.entidad.toLowerCase().replace(/\s+/g, "_")}.${e.accion}`;
}
/** Diferencia campo a campo entre dos versiones de un registro, para mostrar en la bitácora. */
function cambiosEntre(antes, despues) {
	return [.../* @__PURE__ */ new Set([...Object.keys(antes ?? {}), ...Object.keys(despues ?? {})])].filter((k) => JSON.stringify(antes?.[k]) !== JSON.stringify(despues?.[k])).map((k) => ({
		campo: k,
		antes: antes?.[k],
		despues: despues?.[k]
	}));
}
//#endregion
//#region src/lib/modulos.ts
var ROLES = {
	ADMIN: "Administrador del sistema",
	COORDINADOR: "Coordinador de proyecto",
	ESP_TECNICO: "Especialista técnico",
	ESP_LEGAL: "Especialista legal",
	BRIGADISTA: "Brigadista de campo",
	GESTOR_SOCIAL: "Gestor social",
	TESORERIA: "Tesorería / Presupuesto",
	CUSTODIA: "Custodia y archivo (OPAT)",
	SUPERVISOR: "Supervisor / Directivo"
};
var P = "/proyectos/$projectId";
var PR = `${P}/predios/$codigo`;
var BLOQUES = [
	{
		numero: 1,
		nombre: "Inicio y diagnóstico",
		base: "TUO DL 1192 · Título II (sujetos, bienes, tasación) · art. 16–17 (identificación y expediente técnico legal)",
		modulos: [
			{
				numero: 10,
				nombre: "Gestión de Inicio del Proyecto",
				icono: Milestone,
				to: "/proyectos",
				editan: ["COORDINADOR"],
				secciones: [{
					nombre: "Proyectos",
					icono: FolderPlus,
					pantallas: [
						{
							nombre: "Lista de proyectos",
							to: "/proyectos"
						},
						{
							nombre: "Registro de proyecto y metas",
							to: "/proyectos/registro"
						},
						{
							nombre: "Mapa de proyectos",
							to: "/mapa"
						}
					]
				}, {
					nombre: "Organización del proyecto",
					icono: Users,
					pantallas: [
						{
							nombre: "Equipos y brigadas",
							to: `${P}/equipos`
						},
						{
							nombre: "Requerimientos",
							to: `${P}/requerimientos`
						},
						{
							nombre: "Expedientes del proyecto",
							to: `${P}/expedientes`
						}
					]
				}]
			},
			{
				numero: 11,
				nombre: "Diagnóstico Técnico Legal General",
				icono: FileSearch,
				to: "/proyectos",
				editan: ["ESP_TECNICO", "BRIGADISTA"],
				secciones: [{
					nombre: "Padrón de afectados",
					icono: ClipboardList,
					pantallas: [{
						nombre: "Padrón preliminar",
						to: `${P}/padron-preliminar`
					}, {
						nombre: "Evaluación de información",
						to: `${P}/evaluacion-informacion`
					}]
				}, {
					nombre: "Identificación del predio y del sujeto pasivo",
					icono: Search,
					pantallas: [
						{
							nombre: "Identificación y codificación",
							to: `${PR}/identificacion-codificacion`
						},
						{
							nombre: "Sujeto pasivo",
							to: `${PR}/sujeto-pasivo`
						},
						{
							nombre: "Asignación predial",
							to: `${PR}/asignacion-predial`
						},
						{
							nombre: "Diagnóstico preliminar",
							to: `${PR}/diagnostico-preliminar`
						},
						{
							nombre: "Empadronamiento e inspección de campo",
							to: `${PR}/empadronamiento-inspeccion-campo`
						},
						{
							nombre: "Levantamiento de información técnica",
							to: `${PR}/levantamiento-informacion-tecnica`
						},
						{
							nombre: "Partidas registrales",
							to: `${PR}/levantamiento-informacion-tecnica/partidas-registrales`
						}
					]
				}]
			},
			{
				numero: 12,
				nombre: "Diagnóstico Técnico Legal Específico",
				icono: LandPlot,
				to: "/proyectos",
				editan: ["ESP_TECNICO"],
				secciones: [{
					nombre: "Codificación",
					icono: Layers,
					pantallas: [
						{
							nombre: "Códigos de predios",
							to: `${P}/codigos-predios`
						},
						{
							nombre: "Códigos de planos",
							to: `${P}/codigos-planos`
						},
						{
							nombre: "Base gráfica",
							to: `${P}/base-grafica`
						}
					]
				}, {
					nombre: "Actos previos del predio",
					icono: FileCheck,
					pantallas: [
						{
							nombre: "Certificado de búsqueda catastral (CBC)",
							to: `${PR}/cbc`
						},
						{
							nombre: "Anotación preventiva",
							to: `${PR}/anotacion-preventiva`
						},
						{
							nombre: "Certificado registral inmobiliario (CRI)",
							to: `${PR}/certificado-registral-inmobiliario`
						},
						{
							nombre: "Publicación y oposiciones",
							to: `${PR}/publicacion-oposiciones`
						},
						{
							nombre: "Caracterización del predio",
							to: `${PR}/caracterizacion-predio`
						},
						{
							nombre: "Datos técnicos",
							to: `${PR}/datos-tecnicos`
						},
						{
							nombre: "Datos legales",
							to: `${PR}/datos-legales`
						}
					]
				}]
			},
			{
				numero: 13,
				nombre: "Regularización de la Condición Técnico Legal",
				icono: FileCheck,
				to: "/regularizacion",
				editan: ["ESP_LEGAL"],
				secciones: [{
					nombre: "Regularización",
					icono: FileCheck,
					pantallas: [
						{
							nombre: "Cartera de regularización",
							to: "/regularizacion",
							nueva: true
						},
						{
							nombre: "Discrepancias técnicas, legales y registrales",
							to: `${PR}/discrepancias`,
							nueva: true
						},
						{
							nombre: "Saneamiento registral",
							to: `${PR}/saneamiento-registral`
						}
					]
				}]
			}
		]
	},
	{
		numero: 2,
		nombre: "Valoración y rutas de gestión",
		base: "TUO DL 1192 · Título III adquisición y trato directo (art. 18–21) · Título IV expropiación (art. 24–38) · Título VI transferencia estatal (art. 41) · DCF 3.ª mejoras",
		modulos: [
			{
				numero: 14,
				nombre: "Gestión de la Tasación",
				icono: Calculator,
				to: "/proyectos",
				editan: ["ESP_TECNICO"],
				secciones: [{
					nombre: "Tasación del predio",
					icono: Scale,
					pantallas: [
						{
							nombre: "Requerimiento de tasación / ITL",
							to: `${PR}/requerimiento-tasacion-itl`
						},
						{
							nombre: "Expediente de tasación",
							to: `${PR}/expediente-tasacion`
						},
						{
							nombre: "Informe del verificador especialista",
							to: `${PR}/informe-verificador-especialista`
						},
						{
							nombre: "Informe técnico legal",
							to: `${PR}/informe-tecnico-legal`
						}
					]
				}, {
					nombre: "Seguimiento",
					icono: BarChart3,
					pantallas: [{
						nombre: "Tablero técnico de tasaciones",
						to: "/seguimiento-monitoreo/tecnico-tasaciones"
					}]
				}]
			},
			{
				numero: 15,
				nombre: "Trato Directo",
				icono: Handshake,
				to: "/trato-directo",
				editan: ["ESP_LEGAL"],
				secciones: [{
					nombre: "Expediente de trato directo",
					icono: Handshake,
					pantallas: [
						{
							nombre: "Cartera de trato directo",
							to: "/trato-directo"
						},
						{
							nombre: "Modalidad de adquisición",
							to: `${PR}/modalidad-adquisicion`
						},
						{
							nombre: "Comunicación de afectación",
							to: `${PR}/comunicacion-afectacion`
						},
						{
							nombre: "Carta de intención",
							to: `${PR}/carta-intencion`
						},
						{
							nombre: "Respuesta del sujeto pasivo",
							to: `${PR}/respuesta-sujeto-pasivo`
						}
					]
				}, {
					nombre: "Seguimiento",
					icono: BarChart3,
					pantallas: [{
						nombre: "Cartera en liberación",
						to: "/seguimiento-monitoreo/cartera-liberacion"
					}]
				}]
			},
			{
				numero: 16,
				nombre: "Expropiación",
				icono: Gavel,
				to: "/expropiacion",
				editan: ["ESP_LEGAL"],
				secciones: [{
					nombre: "Procedimiento expropiatorio",
					icono: Gavel,
					pantallas: [
						{
							nombre: "Cartera de expropiación",
							to: "/expropiacion",
							nueva: true
						},
						{
							nombre: "Procedimiento expropiatorio del predio",
							to: `${PR}/expropiacion`,
							nueva: true
						},
						{
							nombre: "Respuesta del sujeto pasivo (rechazo)",
							to: `${PR}/respuesta-sujeto-pasivo`
						},
						{
							nombre: "Entrega de posesión",
							to: `${PR}/entrega-posesion`
						}
					]
				}]
			},
			{
				numero: 17,
				nombre: "Reconocimiento de Mejoras",
				icono: HousePlus,
				to: "/reconocimiento-mejoras",
				editan: ["ESP_TECNICO"],
				secciones: [{
					nombre: "Mejoras",
					icono: Hammer,
					pantallas: [
						{
							nombre: "Cartera de reconocimiento de mejoras",
							to: "/reconocimiento-mejoras",
							nueva: true
						},
						{
							nombre: "Avisos, oposiciones y pago al poseedor",
							to: `${PR}/reconocimiento-mejoras`,
							nueva: true
						},
						{
							nombre: "Caracterización del predio (inventario)",
							to: `${PR}/caracterizacion-predio`
						}
					]
				}]
			},
			{
				numero: 21,
				nombre: "Transferencia Interestatal",
				icono: ArrowLeftRight,
				to: "/transferencia-interestatal",
				editan: ["ESP_LEGAL"],
				secciones: [{
					nombre: "Transferencia ante la SBN",
					icono: ArrowLeftRight,
					pantallas: [
						{
							nombre: "Cartera de transferencia interestatal",
							to: "/transferencia-interestatal",
							nueva: true
						},
						{
							nombre: "Expediente de transferencia",
							to: `${PR}/transferencia-interestatal-sbn`
						},
						{
							nombre: "Tablero de transferencias",
							to: "/seguimiento-monitoreo/transferencia-interestatal"
						}
					]
				}]
			}
		]
	},
	{
		numero: 3,
		nombre: "Formalización, pago e inscripción",
		base: "TUO DL 1192 · art. 20.4 (norma, formulario registral, pago, desocupación) · art. 21 acuerdos · art. 22 y 30 inscripción · DCF 2.ª saneamiento",
		modulos: [
			{
				numero: 18,
				nombre: "Gestión de la Resolución",
				icono: Stamp,
				to: "/gestion-resolucion",
				editan: ["ESP_LEGAL"],
				secciones: [{
					nombre: "Acto resolutivo",
					icono: FileText,
					pantallas: [
						{
							nombre: "Cartera de resoluciones",
							to: "/gestion-resolucion",
							nueva: true
						},
						{
							nombre: "Certificación presupuestal (CCP)",
							to: `${PR}/certificacion-presupuestal-ccp`
						},
						{
							nombre: "Elevación del expediente",
							to: `${PR}/elevacion-expediente`
						},
						{
							nombre: "Resolución directoral",
							to: `${PR}/gestion-resolucion-rd`
						}
					]
				}]
			},
			{
				numero: 19,
				nombre: "Trámite del Pago y Consignación",
				icono: HandCoins,
				to: "/pago",
				editan: ["TESORERIA"],
				secciones: [{
					nombre: "Pago",
					icono: Banknote,
					pantallas: [
						{
							nombre: "Cartera de pago y consignación",
							to: "/pago",
							nueva: true
						},
						{
							nombre: "Bandeja de pagos y consignaciones",
							to: "/pago-consignacion"
						},
						{
							nombre: "Gestión de devengado",
							to: `${PR}/gestion-devengado`
						},
						{
							nombre: "Pago a propietarios",
							to: `${PR}/pago-propietarios`
						},
						{
							nombre: "Pago o consignación del predio",
							to: `${PR}/pago-consignacion`
						}
					]
				}, {
					nombre: "Entrega",
					icono: FileSignature,
					pantallas: [{
						nombre: "Formulario registral",
						to: `${PR}/formulario-registral`
					}, {
						nombre: "Entrega de posesión",
						to: `${PR}/entrega-posesion`
					}]
				}]
			},
			{
				numero: 20,
				nombre: "Inscripción Registral de Predios Adquiridos",
				icono: BookOpenCheck,
				to: "/inscripcion-registral",
				editan: ["ESP_LEGAL"],
				secciones: [{
					nombre: "SUNARP",
					icono: Landmark,
					pantallas: [
						{
							nombre: "Cartera de inscripción registral",
							to: "/inscripcion-registral",
							nueva: true
						},
						{
							nombre: "Presentación SID",
							to: `${PR}/inscripcion-registral-sid`
						},
						{
							nombre: "Inscripción registral",
							to: `${PR}/inscripcion-registral`
						},
						{
							nombre: "Tablero de inscripciones",
							to: "/seguimiento-monitoreo/inscripciones"
						}
					]
				}]
			}
		]
	},
	{
		numero: 4,
		nombre: "Recepción y custodia",
		base: "Recepción física del predio inscrito a favor del MTC y entrega para custodia (OPAT)",
		modulos: [{
			numero: 22,
			nombre: "Recepción y Custodia de Predios",
			icono: KeyRound,
			to: "/proyectos",
			editan: ["CUSTODIA"],
			secciones: [{
				nombre: "Cierre del expediente",
				icono: Archive,
				pantallas: [
					{
						nombre: "Expediente digital",
						to: `${PR}/expediente-digital`
					},
					{
						nombre: "Entrega y recepción DDP - OPAT",
						to: `${PR}/entrega-recepcion-ddp-opat`
					},
					{
						nombre: "Transferencia documentaria a OPAT",
						to: `${PR}/transferencia-documentaria-opat`
					},
					{
						nombre: "Monitoreo del predio",
						to: `${PR}/monitoreo`
					}
				]
			}]
		}]
	},
	{
		numero: 5,
		nombre: "Terceros y sujetos vinculados",
		base: "TUO DL 1192 · Título VII liberación de interferencias (art. 42–44) · derecho de información del sujeto pasivo",
		modulos: [{
			numero: 23,
			nombre: "Evaluación de Productos por Encargatura",
			icono: PackageCheck,
			to: "/servicios",
			editan: ["COORDINADOR"],
			secciones: [{
				nombre: "Encargaturas",
				icono: Briefcase,
				pantallas: [
					{
						nombre: "Servicios y solicitudes",
						to: "/servicios"
					},
					{
						nombre: "Contratos, servicios e interferencias",
						to: "/seguimiento-monitoreo/contractual-servicios-interferencias"
					},
					{
						nombre: "Liberación de interferencias",
						to: "/interferencias",
						nueva: true
					}
				]
			}]
		}, {
			numero: 27,
			nombre: "Seguimiento por los Sujetos Vinculados",
			icono: UserSearch,
			to: "/seguimiento-sujeto-pasivo",
			editan: ["GESTOR_SOCIAL"],
			secciones: [{
				nombre: "Portal del sujeto pasivo",
				icono: ClipboardCheck,
				pantallas: [{
					nombre: "Consulta del sujeto pasivo",
					to: "/seguimiento-sujeto-pasivo"
				}, {
					nombre: "Seguimiento de la adquisición",
					to: "/seguimiento-adquisicion"
				}]
			}]
		}]
	},
	{
		numero: 6,
		nombre: "Soporte e integración transversal",
		base: "Seguridad, interoperabilidad (SUNARP · SBN · SIAF · CEPLAN), gestión documental, social, presupuestal, seguimiento y GIS-BIM",
		modulos: [
			{
				numero: 8,
				nombre: "Seguridad y configuración",
				icono: ShieldCheck,
				to: "/seguridad/usuarios",
				editan: ["ADMIN"],
				secciones: [
					{
						nombre: "Accesos",
						icono: KeyRound,
						pantallas: [
							{
								nombre: "Usuarios",
								to: "/seguridad/usuarios"
							},
							{
								nombre: "Roles",
								to: "/seguridad/roles"
							},
							{
								nombre: "Acceso GIS (QGIS y ArcGIS)",
								to: "/seguridad/acceso-gis",
								nueva: true
							},
							{
								nombre: "Registro de auditoría",
								to: "/seguridad/auditoria",
								nueva: true
							},
							{
								nombre: "Bitácora de accesos y cambios",
								to: "/seguridad/bitacora",
								nueva: true
							}
						]
					},
					{
						nombre: "Comunicaciones",
						icono: Megaphone,
						pantallas: [{
							nombre: "Anuncios",
							to: "/seguridad/anuncios",
							nueva: true
						}]
					},
					{
						nombre: "Ayuda",
						icono: CircleHelp,
						pantallas: [{
							nombre: "Ayuda por vista",
							to: "/seguridad/manuales",
							nueva: true
						}]
					},
					{
						nombre: "Organización",
						icono: FolderTree,
						pantallas: [{
							nombre: "Áreas",
							to: "/seguridad/areas",
							nueva: true
						}]
					},
					{
						nombre: "Documentos",
						icono: FileText,
						pantallas: [
							{
								nombre: "Tipos de documento",
								to: "/seguridad/documentos/tipos",
								nueva: true
							},
							{
								nombre: "Numeración",
								to: "/seguridad/documentos/numeracion",
								nueva: true
							},
							{
								nombre: "Documentos del expediente",
								to: "/seguridad/documentos/expediente",
								nueva: true
							},
							{
								nombre: "Documentos generados",
								to: "/seguridad/documentos/generados",
								nueva: true
							}
						]
					},
					{
						nombre: "Configuración",
						icono: Database,
						pantallas: [
							{
								nombre: "Maestros",
								to: "/configuracion/maestros"
							},
							{
								nombre: "Hitos y plazos",
								to: "/configuracion/hitos-plazos"
							},
							{
								nombre: "Correos",
								to: "/configuracion/correos"
							},
							{
								nombre: "SMS",
								to: "/configuracion/sms"
							},
							{
								nombre: "Fotos",
								to: "/configuracion/fotos",
								nueva: true
							},
							{
								nombre: "Pantalla de acceso",
								to: "/configuracion/acceso",
								nueva: true
							}
						]
					}
				]
			},
			{
				numero: 9,
				nombre: "Interoperabilidad",
				icono: Network,
				to: "/interoperabilidad",
				editan: ["ADMIN"],
				secciones: [{
					nombre: "Conexiones",
					icono: Network,
					pantallas: [{
						nombre: "Servicios externos",
						to: "/interoperabilidad"
					}, {
						nombre: "SIAF - CEPLAN",
						to: "/configuracion/siaf-ceplan"
					}]
				}]
			},
			{
				numero: 24,
				nombre: "Gestión Documental de Registros y Productos",
				icono: FolderArchive,
				to: "/gestion-documental",
				editan: ["CUSTODIA"],
				secciones: [{
					nombre: "Documentos",
					icono: Database,
					pantallas: [{
						nombre: "Plantillas y repositorio",
						to: "/gestion-documental"
					}]
				}]
			},
			{
				numero: 25,
				nombre: "Gestión Predial Social",
				icono: HeartHandshake,
				to: "/gestion-predial-social",
				editan: ["GESTOR_SOCIAL", "BRIGADISTA"],
				secciones: [{
					nombre: "Gestión social",
					icono: Handshake,
					pantallas: [{
						nombre: "Actores y evidencias",
						to: "/gestion-predial-social"
					}, {
						nombre: "Actas y reuniones",
						to: "/gestion-social"
					}]
				}]
			},
			{
				numero: 26,
				nombre: "Gestión Presupuestal",
				icono: Wallet,
				to: "/gestion-presupuestal",
				editan: ["TESORERIA", "COORDINADOR"],
				secciones: [{
					nombre: "Presupuesto",
					icono: Wallet,
					pantallas: [
						{
							nombre: "Metas y reprogramación",
							to: "/gestion-presupuestal"
						},
						{
							nombre: "Presupuestal por predio",
							to: "/seguimiento-monitoreo/presupuestal-predio"
						},
						{
							nombre: "Gastos por proyecto y predio",
							to: "/seguimiento-monitoreo/gastos-proyecto-predio"
						},
						{
							nombre: "Integrado CEPLAN - SIAF",
							to: "/seguimiento-monitoreo/integrado-ceplan-siaf"
						}
					]
				}]
			},
			{
				numero: 28,
				nombre: "Seguimiento, Monitoreo, Reportes e Indicadores",
				icono: BarChart3,
				to: "/seguimiento-monitoreo",
				editan: ["SUPERVISOR"],
				secciones: [
					{
						nombre: "Ejecutivo",
						icono: BarChart3,
						pantallas: [
							{
								nombre: "Reporte general",
								to: "/seguimiento-monitoreo/general"
							},
							{
								nombre: "Dashboard geográfico",
								to: "/seguimiento-monitoreo/dashboard-geografico"
							},
							{
								nombre: "Dashboard financiero",
								to: "/seguimiento-monitoreo/dashboard-financiero"
							},
							{
								nombre: "Cartera de liberación",
								to: "/seguimiento-monitoreo/cartera-liberacion"
							}
						]
					},
					{
						nombre: "Coordinación",
						icono: ClipboardList,
						pantallas: [
							{
								nombre: "Predios privados",
								to: "/seguimiento-monitoreo/predios-privados"
							},
							{
								nombre: "Transferencia interestatal",
								to: "/seguimiento-monitoreo/transferencia-interestatal"
							},
							{
								nombre: "Contractual y servicios",
								to: "/seguimiento-monitoreo/contractual-servicios-interferencias"
							},
							{
								nombre: "Territorial integral",
								to: "/seguimiento-monitoreo/territorial-integral"
							},
							{
								nombre: "Territorial: pagos y cierre",
								to: "/seguimiento-monitoreo/territorial-pagos-cierre"
							},
							{
								nombre: "Monitoreo predial",
								to: "/seguimiento-monitoreo/predial"
							},
							{
								nombre: "Seguimiento de personal",
								to: "/seguimiento-monitoreo/seguimiento-personal"
							}
						]
					},
					{
						nombre: "Técnico legal",
						icono: Scale,
						pantallas: [
							{
								nombre: "Tasaciones",
								to: "/seguimiento-monitoreo/tecnico-tasaciones"
							},
							{
								nombre: "Riesgos legales y plazos",
								to: "/seguimiento-monitoreo/legal-riesgos-plazos"
							},
							{
								nombre: "Inscripciones",
								to: "/seguimiento-monitoreo/inscripciones"
							}
						]
					},
					{
						nombre: "Integración",
						icono: Network,
						pantallas: [{
							nombre: "Proyectos integrados",
							to: "/seguimiento-monitoreo/integrado-proyectos"
						}, {
							nombre: "CEPLAN - SIAF",
							to: "/seguimiento-monitoreo/integrado-ceplan-siaf"
						}]
					}
				]
			},
			{
				numero: 29,
				nombre: "Información Integrada de Predios GIS-BIM",
				icono: Map$1,
				to: "/mapa",
				editan: ["ESP_TECNICO"],
				secciones: [{
					nombre: "GIS",
					icono: Map$1,
					pantallas: [
						{
							nombre: "Mapa de proyectos",
							to: "/mapa"
						},
						{
							nombre: "Dashboard geográfico",
							to: "/seguimiento-monitoreo/dashboard-geografico"
						},
						{
							nombre: "Base gráfica del proyecto",
							to: `${P}/base-grafica`
						}
					]
				}, {
					nombre: "BIM",
					icono: Building2,
					pantallas: [{
						nombre: "Visor BIM del proyecto",
						to: `${P}/bim`
					}]
				}]
			},
			{
				numero: 30,
				nombre: "Recolector de Campo",
				icono: TabletSmartphone,
				to: "/recolector-campo",
				oculto: true,
				editan: [
					"BRIGADISTA",
					"ESP_TECNICO",
					"ESP_LEGAL",
					"GESTOR_SOCIAL",
					"COORDINADOR"
				],
				secciones: [{
					nombre: "Campo",
					icono: TabletSmartphone,
					pantallas: [{
						nombre: "Padrón y caracterización en campo",
						to: "/recolector-campo",
						nueva: true
					}]
				}]
			}
		]
	}
];
var MODULOS = BLOQUES.flatMap((b) => b.modulos);
/**
* Menú del espacio de proyecto (`/proyectos/$projectId/*`): reemplaza al sidebar del módulo, como el
* menú por etapas lo hace dentro de un predio. Reúne las pantallas de proyecto de M10, M11, M12 y M29,
* que antes estaban repartidas entre tres sidebars y dos desplegables de la cabecera.
* Una sección con una sola pantalla se muestra como enlace directo.
*/
var MENU_PROYECTO = [
	{
		nombre: "Resumen del proyecto",
		icono: LayoutDashboard,
		modulo: 10,
		pantallas: [{
			nombre: "Resumen del proyecto",
			to: P
		}]
	},
	{
		nombre: "Metas del proyecto",
		icono: Target,
		modulo: 26,
		pantallas: [{
			nombre: "Metas del proyecto",
			to: `${P}/metas`,
			nueva: true
		}]
	},
	{
		nombre: "Predios",
		icono: MapPinned,
		modulo: 10,
		pantallas: [
			{
				nombre: "Listado de predios",
				to: `${P}/predios`,
				nueva: true
			},
			{
				nombre: "Mapa del proyecto",
				to: `${P}/mapa`,
				nueva: true
			},
			{
				nombre: "Padrón completo",
				to: `${P}/padron`,
				nueva: true
			}
		]
	},
	{
		nombre: "Diagnóstico general",
		icono: ClipboardCheck,
		modulo: 11,
		pantallas: [{
			nombre: "Padrón preliminar",
			to: `${P}/padron-preliminar`
		}, {
			nombre: "Evaluación de información",
			to: `${P}/evaluacion-informacion`
		}]
	},
	{
		nombre: "Codificación",
		icono: Hash,
		modulo: 12,
		pantallas: [
			{
				nombre: "Códigos de predios",
				to: `${P}/codigos-predios`
			},
			{
				nombre: "Códigos de planos",
				to: `${P}/codigos-planos`
			},
			{
				nombre: "Expedientes del proyecto",
				to: `${P}/expedientes`
			}
		]
	},
	{
		nombre: "Base gráfica",
		icono: Ruler,
		modulo: 12,
		pantallas: [{
			nombre: "Base gráfica",
			to: `${P}/base-grafica`
		}]
	},
	{
		nombre: "Modelo BIM",
		icono: Boxes,
		modulo: 29,
		pantallas: [{
			nombre: "Modelo BIM",
			to: `${P}/bim`
		}]
	},
	{
		nombre: "Organización",
		icono: Users,
		modulo: 10,
		pantallas: [{
			nombre: "Equipos y brigadas",
			to: `${P}/equipos`
		}, {
			nombre: "Requerimientos",
			to: `${P}/requerimientos`
		}]
	}
];
function moduloPorNumero(numero) {
	return MODULOS.find((m) => m.numero === numero);
}
/** Módulo al que pertenece una ruta (la primera pantalla que coincide). */
function moduloPorRuta(pathname) {
	const aPatron = (to) => new RegExp("^" + to.replace(/\$[a-zA-Z]+/g, "[^/]+") + "$");
	return MODULOS.find((m) => m.secciones.some((s) => s.pantallas.some((p) => aPatron(p.to).test(pathname))));
}
//#endregion
//#region src/lib/historial.ts
var TOPE = 200;
var clave = (registro) => `pdgp-historial-${registro}`;
var cache = /* @__PURE__ */ new Map();
var oyentes = /* @__PURE__ */ new Map();
var VACIO = [];
function leer(registro) {
	if (!cache.has(registro)) try {
		cache.set(registro, JSON.parse(localStorage.getItem(clave(registro)) ?? "[]"));
	} catch {
		cache.set(registro, []);
	}
	return cache.get(registro);
}
/** Versiones del registro, de la más nueva a la más antigua. */
function useHistorial(registro) {
	return useSyncExternalStore((f) => {
		const s = oyentes.get(registro) ?? /* @__PURE__ */ new Set();
		s.add(f);
		oyentes.set(registro, s);
		return () => {
			s.delete(f);
		};
	}, () => leer(registro), () => VACIO);
}
function sesion() {
	try {
		const rol = localStorage.getItem("pdgp-rol") ?? "ADMIN";
		return {
			usuario: localStorage.getItem("mtc-session") || "usuario sin sesión",
			perfil: ROLES[rol] ?? rol
		};
	} catch {
		return {
			usuario: "usuario sin sesión",
			perfil: ""
		};
	}
}
/**
* Guarda una versión. `bitacora` decide cómo se ve en el Registro de auditoría (módulo y entidad).
* Devuelve la versión creada.
*/
function registrarVersion(registro, v, bitacora) {
	const lista = leer(registro);
	const anterior = lista[0];
	const nueva = {
		n: (anterior?.n ?? 0) + 1,
		fecha: (/* @__PURE__ */ new Date()).toISOString(),
		...sesion(),
		...v
	};
	const siguiente = [nueva, ...lista].slice(0, TOPE);
	cache.set(registro, siguiente);
	try {
		localStorage.setItem(clave(registro), JSON.stringify(siguiente));
	} catch {}
	oyentes.get(registro)?.forEach((f) => f());
	registrarEnBitacora({
		modulo: bitacora.modulo,
		entidad: bitacora.entidad,
		registro,
		accion: bitacora.accion ?? (anterior ? "editar" : "crear"),
		detalle: `${v.accion}: ${v.objeto}${v.motivo ? `. Motivo: ${v.motivo}` : ""}`,
		antes: anterior ? aplanar(anterior.registro) : void 0,
		despues: aplanar(v.registro)
	});
	return nueva;
}
/**
* Registra un cambio sobre una lista o formulario. La primera vez deja antes una versión "Estado inicial"
* con `antes`, para que el primer cambio también se pueda comparar y restaurar.
*/
function registrarCambio(registro, v, bitacora) {
	if (leer(registro).length === 0) registrarVersion(registro, {
		accion: "Estado inicial",
		objeto: "antes del primer cambio",
		registro: v.antes
	}, {
		...bitacora,
		accion: "crear"
	});
	return registrarVersion(registro, {
		accion: v.accion,
		objeto: v.objeto,
		motivo: v.motivo,
		registro: v.despues
	}, bitacora);
}
/**
* Historial de un formulario que ya guarda su estado con useState. La última versión guardada se carga
* una sola vez al abrir la pantalla; `guardarVersion` registra el cambio (la primera vez deja antes un
* "Estado inicial" con lo que había al abrir); `restaurar` vuelve a una versión y la registra como nueva.
*/
function useFormularioConHistorial(clave, formulario, setFormulario, bitacora) {
	const versiones = useHistorial(clave);
	const inicial = useRef(formulario);
	const cargado = useRef(false);
	useEffect(() => {
		if (cargado.current || versiones.length === 0) return;
		cargado.current = true;
		setFormulario(versiones[0].registro);
	}, [versiones.length]);
	const guardarVersion = (accion, objeto, motivo, despues = formulario) => registrarCambio(clave, {
		accion,
		objeto,
		motivo,
		antes: versiones[0]?.registro ?? inicial.current,
		despues
	}, bitacora);
	const restaurar = (registro, version) => {
		setFormulario(registro);
		registrarVersion(clave, {
			accion: "Restauró una versión anterior",
			objeto: `versión ${version}`,
			registro
		}, bitacora);
	};
	return {
		versiones,
		guardarVersion,
		restaurar
	};
}
/** Valor legible: Sí/No, archivo por su nombre, vacío como "(vacío)". */
function legible(v) {
	if (v === true) return "Sí";
	if (v === false) return "No";
	if (v == null || v === "") return "(vacío)";
	if (typeof v === "object" && "nombre" in v && "fecha" in v) {
		const a = v;
		return `${a.nombre} (${a.fecha})`;
	}
	return String(v);
}
/** Nombre con que se identifica un elemento de una lista (titular, documento, ocupante). */
function etiquetaElemento(x, i) {
	return String(x.nombres || x.nombre || x.codigo || x.numero || x.titulo || x.asunto || x.tipo || x.id || `#${i + 1}`);
}
/**
* Registro aplanado a "ruta legible → valor": `Titular LOLA PIZARRO › correo`. Las listas de objetos se
* identifican por su nombre, no por su posición, para que un elemento movido no parezca cambiado.
*/
function aplanar(obj, prefijo = "", etiquetas = {}) {
	const out = {};
	const nombre = (k) => etiquetas[k] ?? k;
	if (Array.isArray(obj)) {
		obj.forEach((x, i) => {
			if (x && typeof x === "object" && !Array.isArray(x)) Object.assign(out, aplanar(x, `${prefijo} › ${etiquetaElemento(x, i)}`, etiquetas));
			else out[`${prefijo} › ${i + 1}`] = legible(x);
		});
		return out;
	}
	if (obj && typeof obj === "object" && !("nombre" in obj && "fecha" in obj && Object.keys(obj).length === 2)) {
		for (const [k, v] of Object.entries(obj)) {
			if (k === "id") continue;
			const ruta = prefijo ? `${prefijo} › ${nombre(k)}` : nombre(k);
			if (v && typeof v === "object" && !("nombre" in v && "fecha" in v && Object.keys(v).length === 2)) Object.assign(out, aplanar(v, ruta, etiquetas));
			else out[ruta] = legible(v);
		}
		return out;
	}
	out[prefijo || "valor"] = legible(obj);
	return out;
}
/** Campos que cambiaron entre dos versiones (agregados, quitados o modificados). */
function diferencias(antes, despues, etiquetas = {}) {
	const a = antes === void 0 ? {} : aplanar(antes, "", etiquetas);
	const d = aplanar(despues, "", etiquetas);
	return [.../* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(d)])].filter((c) => (a[c] ?? "(no existía)") !== (d[c] ?? "(eliminado)")).map((c) => ({
		campo: c,
		antes: a[c] ?? "(no existía)",
		despues: d[c] ?? "(eliminado)"
	}));
}
//#endregion
export { registrarEnBitacora as _, useFormularioConHistorial as a, MENU_PROYECTO as c, moduloPorNumero as d, moduloPorRuta as f, leerBitacora as g, codigoDeEntrada as h, registrarVersion as i, MODULOS as l, cambiosEntre as m, diferencias as n, useHistorial as o, BITACORA_EVENTO as p, registrarCambio as r, BLOQUES as s, aplanar as t, ROLES as u };
