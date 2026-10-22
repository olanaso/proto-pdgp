import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { n as getProyecto, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.inscripcion-registral-sid-BbfXDntt.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CheckCircle2, FileCode2, History, Landmark, Loader2, Plus, Save, Search, Send, Trash2, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.inscripcion-registral-sid.tsx?tsr-split=component
var ZONAS_REGISTRALES = [
	{
		id: "I",
		label: "Zona Registral N° I · Sede Piura",
		oficinas: [
			"Piura",
			"Tumbes",
			"Sullana",
			"Chulucanas",
			"Talara"
		]
	},
	{
		id: "II",
		label: "Zona Registral N° II · Sede Chiclayo",
		oficinas: [
			"Chiclayo",
			"Lambayeque",
			"Cajamarca",
			"Chota",
			"Jaén"
		]
	},
	{
		id: "III",
		label: "Zona Registral N° III · Sede Moyobamba",
		oficinas: [
			"Moyobamba",
			"Tarapoto",
			"Chachapoyas",
			"Yurimaguas"
		]
	},
	{
		id: "IV",
		label: "Zona Registral N° IV · Sede Iquitos",
		oficinas: ["Iquitos", "Pucallpa"]
	},
	{
		id: "V",
		label: "Zona Registral N° V · Sede Trujillo",
		oficinas: [
			"Trujillo",
			"Pacasmayo",
			"Chepén",
			"Otuzco",
			"Santiago de Chuco",
			"Huamachuco"
		]
	},
	{
		id: "VI",
		label: "Zona Registral N° VI · Sede Pucallpa",
		oficinas: ["Pucallpa", "Aguaytía"]
	},
	{
		id: "VII",
		label: "Zona Registral N° VII · Sede Huancayo",
		oficinas: [
			"Huancayo",
			"La Merced",
			"Tarma",
			"Satipo"
		]
	},
	{
		id: "VIII",
		label: "Zona Registral N° VIII · Sede Huancavelica",
		oficinas: [
			"Huancavelica",
			"Ayacucho",
			"Ica"
		]
	},
	{
		id: "IX",
		label: "Zona Registral N° IX · Sede Lima",
		oficinas: [
			"Lima",
			"Callao",
			"Cañete",
			"Huacho",
			"Huaral"
		]
	},
	{
		id: "X",
		label: "Zona Registral N° X · Sede Cusco",
		oficinas: [
			"Cusco",
			"Quillabamba",
			"Sicuani",
			"Puerto Maldonado"
		]
	},
	{
		id: "XI",
		label: "Zona Registral N° XI · Sede Ica",
		oficinas: [
			"Ica",
			"Chincha",
			"Pisco",
			"Nazca"
		]
	},
	{
		id: "XII",
		label: "Zona Registral N° XII · Sede Arequipa",
		oficinas: [
			"Arequipa",
			"Mollendo",
			"Camaná"
		]
	},
	{
		id: "XIII",
		label: "Zona Registral N° XIII · Sede Tacna",
		oficinas: [
			"Tacna",
			"Moquegua",
			"Ilo"
		]
	},
	{
		id: "XIV",
		label: "Zona Registral N° XIV · Sede Ayacucho",
		oficinas: ["Ayacucho", "Puquio"]
	}
];
var REGISTROS_JURIDICOS = [
	"Registro de Propiedad Inmueble",
	"Registro de Personas Jurídicas",
	"Registro de Bienes Muebles",
	"Registro Personal"
];
var TIPOS_ACTO = [
	"Medida Cautelar / Embargo",
	"Afectación en Uso",
	"Resolución Administrativa de Transferencia",
	"Levantamiento de Medida",
	"Inscripción de Derecho de Vía",
	"Anotación Preventiva",
	"Cancelación de Anotación Preventiva",
	"Transferencia de Dominio"
];
/** Título que se presenta: se sube en su campo de la sección C (el catálogo no lo tiene). */
var TITULO_SID = "Título para inscripción registral (PDF firmado)";
var etiquetasHistorial = {
	zonaId: "Zona registral",
	oficina: "Oficina registral",
	registroJuridico: "Registro jurídico",
	partidaRegistral: "N.° de partida registral",
	tipoActo: "Tipo de acto",
	numeroDocumento: "N.° de documento",
	anioDocumento: "Año del documento",
	sumilla: "Sumilla",
	intervinientes: "Interviniente",
	rol: "Rol",
	tipoDocumento: "Tipo de documento",
	documento: "N.° de documento",
	nombre: "Nombre o razón social",
	consultado: "Verificado en PIDE",
	pdfNombre: "PDF firmado",
	pdfHash: "SHA-256",
	firmaDigital: "Firma digital",
	enviado: "Presentado a SUNARP",
	numeroTramite: "N.° de trámite"
};
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
function Validacion({ ok, texto }) {
	return /* @__PURE__ */ jsxs(StatusBadge, {
		tono: ok ? "success" : "neutral",
		children: [ok ? /* @__PURE__ */ jsx(CheckCircle2, {
			size: 12,
			className: "mr-1",
			"aria-hidden": true
		}) : /* @__PURE__ */ jsx(AlertCircle, {
			size: 12,
			className: "mr-1",
			"aria-hidden": true
		}), texto]
	});
}
function InscripcionRegistralSidPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(InscripcionRegistralSidForm, {
		projectId,
		codigo
	}, `${projectId}-${codigo}`);
}
function InscripcionRegistralSidForm({ projectId, codigo }) {
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const params = {
		projectId,
		codigo
	};
	const plazoRemision = plazo("remision_sunarp_adquisicion");
	const plazoInscripcion = plazo("inscripcion");
	const plazoSaneamiento = plazo("saneamiento");
	const instData = {
		ruc: "20131370301",
		institucion: "Ministerio de Transportes y Comunicaciones",
		organo: "Dirección de Gestión Predial · DDP",
		funcionario: proyecto?.coordinadorPredial || "Gilbert Manuel Aguirre Gómez",
		dniFuncionario: "09875432"
	};
	const [zonaId, setZonaId] = useState("IX");
	const zona = ZONAS_REGISTRALES.find((z) => z.id === zonaId) ?? ZONAS_REGISTRALES[8];
	const [oficina, setOficina] = useState(zona.oficinas[0]);
	const [registroJuridico, setRegistroJuridico] = useState(REGISTROS_JURIDICOS[0]);
	const [partidaRegistral, setPartidaRegistral] = useState(predio?.part || "");
	const partidaValida = /^\d{5,12}$/.test(partidaRegistral.trim());
	useEffect(() => {
		setOficina((actual) => zona.oficinas.includes(actual) ? actual : zona.oficinas[0]);
	}, [zona]);
	const [tipoActo, setTipoActo] = useState(TIPOS_ACTO[2]);
	const [numeroDocumento, setNumeroDocumento] = useState("");
	const [anioDocumento, setAnioDocumento] = useState("2026");
	const [sumilla, setSumilla] = useState("");
	const [intervinientes, setIntervinientes] = useState([]);
	const [showAddIntervient, setShowAddIntervient] = useState(false);
	const [porQuitar, setPorQuitar] = useState(null);
	function addInterviniente(i) {
		const nuevos = [...intervinientes, {
			...i,
			id: Date.now()
		}];
		setIntervinientes(nuevos);
		setShowAddIntervient(false);
		guardarVersion("Agregó interviniente", `${i.rol}: ${i.nombre}`, void 0, {
			...formulario,
			intervinientes: nuevos
		});
	}
	function removeInterviniente(i, motivo) {
		const restantes = intervinientes.filter((x) => x.id !== i.id);
		setIntervinientes(restantes);
		setPorQuitar(null);
		guardarVersion("Eliminó interviniente", `${i.rol}: ${i.nombre}`, motivo, {
			...formulario,
			intervinientes: restantes
		});
	}
	const items = useItems();
	const delPaso = items.filter((i) => i.predio === decodedCodigo && i.paso === "inscripcion-registral-sid" && i.estado !== "anulado");
	const titulo = documentoDelCampo(items, decodedCodigo, TITULO_SID);
	const tituloListo = Boolean(titulo);
	const firmaValida = titulo?.tipoFirma === "digital";
	const anexos = delPaso.filter((i) => i !== titulo && i.archivo);
	const [mensaje, setMensaje] = useState(null);
	const [showPayload, setShowPayload] = useState(false);
	const [sending, setSending] = useState(false);
	const [enviado, setEnviado] = useState(false);
	const [numeroTramite, setNumeroTramite] = useState("");
	const rol = useRol();
	const claveHistorial = `inscripcion-registral-sid-${decodedCodigo}`;
	const formulario = {
		zonaId,
		oficina,
		registroJuridico,
		partidaRegistral,
		tipoActo,
		numeroDocumento,
		anioDocumento,
		sumilla,
		intervinientes,
		pdfNombre: titulo?.archivo?.nombre ?? "",
		pdfHash: titulo?.archivo?.sha256 ?? "",
		firmaDigital: firmaValida ? "Válida" : "Pendiente",
		enviado,
		numeroTramite
	};
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, formulario, (r) => {
		setZonaId(r.zonaId);
		setOficina(r.oficina);
		setRegistroJuridico(r.registroJuridico);
		setPartidaRegistral(r.partidaRegistral);
		setTipoActo(r.tipoActo);
		setNumeroDocumento(r.numeroDocumento);
		setAnioDocumento(r.anioDocumento);
		setSumilla(r.sumilla);
		setIntervinientes(r.intervinientes);
		setEnviado(r.enviado);
		setNumeroTramite(r.numeroTramite);
	}, {
		modulo: 20,
		entidad: "inscripcion_registral_sid"
	});
	const allFieldsComplete = partidaValida && numeroDocumento.trim() !== "" && sumilla.trim() !== "" && tituloListo && firmaValida;
	const payload = useMemo(() => {
		return {
			header: {
				entidadRuc: instData.ruc,
				entidadNombre: instData.institucion,
				organoEmisor: instData.organo,
				funcionario: instData.funcionario,
				dniFuncionario: instData.dniFuncionario,
				ipOrigen: "192.168.1.45",
				timestampUtc: (/* @__PURE__ */ new Date()).toISOString()
			},
			destinoRegistral: {
				zonaRegistral: zona.label,
				oficinaRegistral: oficina,
				registroJuridico,
				partidaRegistral: partidaRegistral.trim()
			},
			actoAdministrativo: {
				tipoActo,
				numeroDocumento: `${numeroDocumento}-${anioDocumento}`,
				sumilla: sumilla.trim()
			},
			intervinientes: intervinientes.map((i) => ({
				rol: i.rol,
				tipoDocumento: i.tipoDocumento,
				documento: i.documento,
				nombre: i.nombre
			})),
			documento: {
				nombreArchivo: titulo?.archivo?.nombre || "",
				tipoMime: "application/pdf",
				hashSha256: titulo?.archivo?.sha256 || "",
				firmaDigital: firmaValida ? "VALIDA_IOFE_INDECOPI" : "PENDIENTE",
				base64: "[contenido en Base64 omitido por longitud]"
			},
			anexos: anexos.map((i) => ({
				nombre: i.archivo.nombre,
				tamano: i.archivo.bytes
			}))
		};
	}, [
		instData,
		zona,
		oficina,
		registroJuridico,
		partidaRegistral,
		tipoActo,
		numeroDocumento,
		anioDocumento,
		sumilla,
		intervinientes,
		titulo,
		firmaValida,
		anexos
	]);
	function handleSend() {
		if (!allFieldsComplete) return;
		setSending(true);
		setTimeout(() => {
			const tramite = "PIDE-2026-" + String(Math.floor(1e4 + Math.random() * 9e4));
			setSending(false);
			setEnviado(true);
			setNumeroTramite(tramite);
			guardarVersion("Presentó título a SUNARP", `${tipoActo} N.° ${numeroDocumento}-${anioDocumento}`, void 0, {
				...formulario,
				enviado: true,
				numeroTramite: tramite
			});
			setMensaje({
				tipo: "exito",
				texto: "Acto administrativo presentado a SUNARP a través de la PIDE. Número de trámite: " + tramite
			});
		}, 3e3);
	}
	const estado = enviado ? {
		tono: "success",
		texto: "Presentado a SUNARP"
	} : allFieldsComplete ? {
		tono: "primary",
		texto: "Listo para presentar"
	} : {
		tono: "neutral",
		texto: "En preparación"
	};
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: decodedCodigo,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: decodedCodigo }),
		children: [
			/* @__PURE__ */ jsx(PredioEncabezado, {
				projectId,
				codigo: decodedCodigo,
				titulo: "Presentación SID · Inscripción registral",
				icono: Landmark,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: estado.tono,
					children: estado.texto
				})
			}),
			/* @__PURE__ */ jsx(Section, {
				titulo: "Inscripción registral · art. 21 y 22 del TUO del DL 1192",
				className: "mb-4",
				children: /* @__PURE__ */ jsx(Stepper, { pasos: [
					{
						nombre: "Formulario registral",
						estado: "completado",
						detalle: "Art. 21 formulario registral (Secciones I y II)",
						to: "/proyectos/$projectId/predios/$codigo/formulario-registral",
						params
					},
					{
						nombre: "Presentación SID",
						estado: "actual",
						detalle: `Art. ${plazoRemision.articulo} · remisión a SUNARP ${plazoRemision.dias} d.h.`
					},
					{
						nombre: "Inscripción registral",
						estado: "pendiente",
						detalle: `Art. 22 · inscripción ${plazoInscripcion.dias} d.h.`,
						to: "/proyectos/$projectId/predios/$codigo/inscripcion-registral",
						params
					},
					{
						nombre: "Saneamiento",
						estado: "pendiente",
						detalle: `${plazoSaneamiento.articulo} · saneamiento ${plazoSaneamiento.dias} d.h.`,
						to: "/proyectos/$projectId/predios/$codigo/saneamiento-registral",
						params
					}
				] })
			}),
			mensaje && /* @__PURE__ */ jsxs("p", {
				role: mensaje.tipo === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[mensaje.tipo]}`,
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: mensaje.texto
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMensaje(null),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "registro",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "registro",
							children: "Registro"
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
						value: "registro",
						children: /* @__PURE__ */ jsxs("form", {
							className: "space-y-4",
							onSubmit: (e) => {
								e.preventDefault();
								handleSend();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "A. Datos institucionales y del remitente",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "RUC de la entidad",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted`,
												value: instData.ruc,
												readOnly: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Institución",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted`,
												value: instData.institucion,
												readOnly: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Órgano o área emisora",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted`,
												value: instData.organo,
												readOnly: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Funcionario responsable",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted`,
												value: instData.funcionario,
												readOnly: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "DNI del funcionario",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted`,
												value: instData.dniFuncionario,
												readOnly: true
											})
										})
									] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "B. Destino registral (SUNARP)",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Zona registral",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("select", {
												id,
												className: controlClase,
												value: zonaId,
												onChange: (e) => setZonaId(e.target.value),
												children: ZONAS_REGISTRALES.map((z) => /* @__PURE__ */ jsx("option", {
													value: z.id,
													children: z.label
												}, z.id))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Oficina registral",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("select", {
												id,
												className: controlClase,
												value: oficina,
												onChange: (e) => setOficina(e.target.value),
												children: zona.oficinas.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Registro jurídico",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("select", {
												id,
												className: controlClase,
												value: registroJuridico,
												onChange: (e) => setRegistroJuridico(e.target.value),
												children: REGISTROS_JURIDICOS.map((r) => /* @__PURE__ */ jsx("option", { children: r }, r))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "N.° de partida registral",
											obligatorio: true,
											ayuda: partidaRegistral.trim() && partidaValida ? "Formato válido" : "Entre 5 y 12 dígitos",
											error: partidaRegistral.trim() && !partidaValida ? "Debe tener entre 5 y 12 dígitos" : void 0,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												inputMode: "numeric",
												value: partidaRegistral,
												onChange: (e) => setPartidaRegistral(e.target.value),
												placeholder: "Ej. 11085444"
											})
										})
									] })
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "C. Datos del acto o título a inscribir",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Tipo de acto administrativo",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsx("select", {
												id,
												className: controlClase,
												value: tipoActo,
												onChange: (e) => setTipoActo(e.target.value),
												children: TIPOS_ACTO.map((t) => /* @__PURE__ */ jsx("option", { children: t }, t))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "N.° y año del documento",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsxs("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ jsx("div", {
													className: "min-w-0 flex-1",
													children: /* @__PURE__ */ jsx("input", {
														id,
														className: controlClase,
														value: numeroDocumento,
														onChange: (e) => setNumeroDocumento(e.target.value),
														placeholder: "Res. Gerencial N° 124"
													})
												}), /* @__PURE__ */ jsx("div", {
													className: "w-24 shrink-0",
													children: /* @__PURE__ */ jsx("input", {
														className: controlClase,
														inputMode: "numeric",
														value: anioDocumento,
														onChange: (e) => setAnioDocumento(e.target.value),
														placeholder: "Año",
														"aria-label": "Año del documento"
													})
												})]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Resumen o sumilla",
											obligatorio: true,
											ancho: "doble",
											ayuda: `${sumilla.length}/500 caracteres`,
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												className: `${controlClase} h-auto py-2`,
												rows: 3,
												maxLength: 500,
												value: sumilla,
												onChange: (e) => setSumilla(e.target.value),
												placeholder: "Describa brevemente el acto administrativo a inscribir"
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: TITULO_SID,
											obligatorio: true,
											ancho: "doble",
											ayuda: "Debe tener firma digital para presentarse por la PIDE.",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: TITULO_SID,
												firmado: true,
												accept: ".pdf",
												numero: numeroDocumento ? `${numeroDocumento}-${anioDocumento}` : void 0
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Anexos de la inscripción",
											ancho: "doble",
											ayuda: anexos.length ? `${anexos.length} anexo(s) se enviarán con el título: ${anexos.map((i) => i.archivo.nombre).join(", ")}` : "Planos, formulario registral u otros documentos que acompañan al título. Suba uno por vez.",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Anexo de inscripción registral"
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "D. Personas o intervinientes vinculados",
									acciones: /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => setShowAddIntervient(true),
										children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar interviniente"]
									}),
									children: [/* @__PURE__ */ jsx("p", {
										className: "mb-3 text-xs text-muted-foreground",
										children: "Consulta de interoperabilidad RENIEC / SUNAT mediante PIDE."
									}), /* @__PURE__ */ jsx(Tabla, {
										columnas: [
											{
												clave: "rol",
												titulo: "Rol"
											},
											{
												clave: "tipoDocumento",
												titulo: "Tipo doc.",
												ancho: "90px"
											},
											{
												clave: "documento",
												titulo: "N.° documento",
												ancho: "140px"
											},
											{
												clave: "nombre",
												titulo: "Nombre o razón social",
												render: (i) => /* @__PURE__ */ jsx("span", {
													className: "font-medium text-primary-dark",
													children: i.nombre
												})
											},
											{
												clave: "consultado",
												titulo: "PIDE",
												render: (i) => i.consultado ? /* @__PURE__ */ jsx(StatusBadge, {
													tono: "success",
													children: "Verificado"
												}) : /* @__PURE__ */ jsx(StatusBadge, { children: "Pendiente" })
											},
											{
												clave: "acciones",
												titulo: "Acciones",
												alinear: "derecha",
												ancho: "90px",
												render: (i) => /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => setPorQuitar(i),
													"aria-label": `Quitar a ${i.nombre}`,
													title: "Quitar interviniente",
													className: "inline-flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
													children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
												})
											}
										],
										filas: intervinientes,
										claveFila: (i) => i.id,
										vacio: "No se han agregado intervinientes. Use el botón Agregar interviniente."
									})]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Validación previa al envío",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap gap-2",
											children: [
												/* @__PURE__ */ jsx(Validacion, {
													ok: partidaValida,
													texto: "Partida registral"
												}),
												/* @__PURE__ */ jsx(Validacion, {
													ok: numeroDocumento.trim() !== "",
													texto: "N.° de documento"
												}),
												/* @__PURE__ */ jsx(Validacion, {
													ok: sumilla.trim() !== "",
													texto: "Sumilla"
												}),
												/* @__PURE__ */ jsx(Validacion, {
													ok: tituloListo,
													texto: "Título en el expediente"
												}),
												/* @__PURE__ */ jsx(Validacion, {
													ok: firmaValida,
													texto: "Firma digital"
												})
											]
										}),
										!tituloListo ? /* @__PURE__ */ jsxs("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: [
												"Suba el título firmado en el campo «",
												TITULO_SID,
												"» de la sección C."
											]
										}) : !firmaValida && /* @__PURE__ */ jsx("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: "El título registrado no tiene firma digital. Suba el PDF firmado digitalmente."
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-3",
											children: [/* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "ghost",
												size: "sm",
												onClick: () => setShowPayload(!showPayload),
												"aria-expanded": showPayload,
												children: [
													/* @__PURE__ */ jsx(FileCode2, {}),
													" ",
													showPayload ? "Ocultar" : "Mostrar",
													" payload técnico (JSON / PIDE)"
												]
											}), showPayload && /* @__PURE__ */ jsx("pre", {
												className: "mt-2 max-h-100 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-muted p-3 font-mono text-xs leading-relaxed text-foreground",
												children: JSON.stringify(payload, null, 2)
											})]
										})
									]
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: () => window.history.back(),
										children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: () => {
											guardarVersion(versiones.length ? "Modificó el borrador" : "Guardó el borrador", `${tipoActo} N.° ${numeroDocumento || "sin número"}`);
											setMensaje({
												tipo: "aviso",
												texto: "Borrador de la presentación guardado."
											});
										},
										children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
									}),
									/* @__PURE__ */ jsx(Button, {
										type: "submit",
										disabled: !allFieldsComplete || sending,
										children: sending ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }), " Presentando a SUNARP"] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Send, {}), " Presentar título a SUNARP vía PIDE"] })
									})
								] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Presentación SID",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setMensaje({
										tipo: "exito",
										texto: `Se restauró la versión ${n}. Quedó como una versión nueva.`
									});
								}
							})
						})
					})
				]
			}),
			porQuitar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: porQuitar.nombre,
				tipo: "interviniente",
				onCerrar: () => setPorQuitar(null),
				onConfirmar: (motivo) => removeInterviniente(porQuitar, motivo)
			}),
			showAddIntervient && /* @__PURE__ */ jsx(IntervinienteDialog, {
				onClose: () => setShowAddIntervient(false),
				onAdd: addInterviniente
			}),
			sending && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-foreground/40",
				role: "status",
				"aria-live": "polite",
				children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-card p-8 text-center",
					children: [
						/* @__PURE__ */ jsx(Loader2, {
							size: 40,
							className: "mx-auto animate-spin text-primary",
							"aria-hidden": true
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-base font-semibold",
							children: "Transmitiendo a SUNARP vía PIDE"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Conectando con el endpoint de interoperabilidad del Estado"
						})
					]
				})
			})
		]
	});
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, tipo, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Eliminar ${tipo}`,
		descripcion: `${nombre} sale del registro. El histórico conserva sus datos y el motivo.`,
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
				onChange: (ev) => setMotivo(ev.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function IntervinienteDialog({ onClose, onAdd }) {
	const [form, setForm] = useState({
		rol: "Afectado",
		tipoDocumento: "DNI",
		documento: "",
		nombre: "",
		consultado: false
	});
	const [consultando, setConsultando] = useState(false);
	const fuente = form.tipoDocumento === "DNI" ? "RENIEC" : "SUNAT";
	function setField(key, value) {
		setForm((c) => ({
			...c,
			[key]: value
		}));
	}
	function consultarPide() {
		if (!form.documento.trim()) return;
		setConsultando(true);
		setTimeout(() => {
			if (form.tipoDocumento === "DNI") setForm((c) => ({
				...c,
				nombre: "ERICK SIMON ESCALANTE OLANO",
				consultado: true
			}));
			else setForm((c) => ({
				...c,
				nombre: "CORPORACIÓN ANDINA DE FOMENTO S.A.C.",
				consultado: true
			}));
			setConsultando(false);
		}, 1800);
	}
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Agregar interviniente",
		descripcion: "Datos de demostración: la consulta a RENIEC / SUNAT vía PIDE se simula.",
		ancho: "sm",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: () => onAdd({
				...form,
				id: 0
			}),
			disabled: !form.documento.trim() || !form.nombre.trim(),
			children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar interviniente"]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, {
			columnas: 1,
			children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Rol",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						value: form.rol,
						onChange: (e) => setField("rol", e.target.value),
						children: [
							/* @__PURE__ */ jsx("option", { children: "Afectado" }),
							/* @__PURE__ */ jsx("option", { children: "Titular" }),
							/* @__PURE__ */ jsx("option", { children: "Beneficiario" }),
							/* @__PURE__ */ jsx("option", { children: "Representante Legal" })
						]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Tipo de documento",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						value: form.tipoDocumento,
						onChange: (e) => setField("tipoDocumento", e.target.value),
						children: [/* @__PURE__ */ jsx("option", { children: "DNI" }), /* @__PURE__ */ jsx("option", { children: "RUC" })]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "N.° de documento",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								id,
								className: controlClase,
								inputMode: "numeric",
								value: form.documento,
								onChange: (e) => setField("documento", e.target.value),
								placeholder: form.tipoDocumento === "DNI" ? "Ej. 70021899" : "Ej. 20131370301"
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: consultarPide,
								disabled: !form.documento.trim() || consultando,
								children: [consultando ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Search, {}), consultando ? `Consultando ${fuente} vía PIDE` : `Consultar ${fuente} vía PIDE`]
							}),
							form.consultado && /* @__PURE__ */ jsxs("p", {
								role: "status",
								className: "flex items-center gap-1.5 rounded-md border border-success bg-success-soft px-2 py-1 text-xs text-success",
								children: [
									/* @__PURE__ */ jsx(CheckCircle2, {
										size: 14,
										className: "shrink-0",
										"aria-hidden": true
									}),
									"Identidad verificada por ",
									fuente
								]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Nombre o razón social",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: `${controlClase} ${form.consultado ? "bg-muted" : ""}`,
						value: form.nombre,
						onChange: (e) => setField("nombre", e.target.value),
						readOnly: form.consultado
					})
				})
			]
		})
	});
}
//#endregion
export { InscripcionRegistralSidPage as component };
