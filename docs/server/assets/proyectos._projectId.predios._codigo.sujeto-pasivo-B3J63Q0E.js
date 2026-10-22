import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { i as predioDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { _ as sumaCuotas, a as TIPO_PERSONA, c as codigoComunero, d as exigeRepresentante, f as faltantesRegistro, g as registroInicialSujetoPasivo, h as leerSujetoPasivo, i as TIPO_DOCUMENTO, l as esComunidad, m as idSP, n as DOCUMENTOS_SUSTENTO, o as archivoDe, p as faltantesTitular, r as NOMBRE_ESTADO_DNI, s as claveSujetoPasivo, t as CONDICION, u as estadoDni, v as titularVacio } from "./sujetoPasivo-Cz4oBCnt.js";
import { Dt as BotonIcono, E as Modal, N as ListaDocumentos, S as exportarPdf, c as derivadoDe, l as usePrediosDerivados, n as etiquetaProyecto, s as crearPredioDerivado, t as PredioEncabezado, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.sujeto-pasivo-Cx2ROOOd.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { n as useAlmacen } from "./almacen-BgvL3X8T.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as dniDeArchivo, t as consultarReniec } from "./reniec-RuBzYGfh.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { FileDown, FileSearch, FileSpreadsheet, FolderOpen, History, Mail, MessageCircle, PenLine, Pencil, Plus, Save, Search, Send, ShieldCheck, Trash2, UserPlus, X } from "lucide-react";
//#region src/components/TitularDialog.tsx
var TONO_DNI$1 = {
	completo: "success",
	parcial: "warning",
	sin: "destructive",
	no_aplica: "neutral"
};
/** Condiciones que admite cada tipo de persona. */
var CONDICIONES_POR_TIPO = {
	NATURAL: [
		"TITULAR_REGISTRAL",
		"PROPIETARIO_FECHA_CIERTA",
		"POSEEDOR_10",
		"LITIGIO",
		"FIDUCIARIO"
	],
	JURIDICA: [
		"TITULAR_REGISTRAL",
		"PROPIETARIO_FECHA_CIERTA",
		"POSEEDOR_10",
		"LITIGIO",
		"FIDUCIARIO"
	],
	COMUNIDAD_CAMPESINA: [
		"COMUNIDAD",
		"TITULAR_REGISTRAL",
		"LITIGIO"
	],
	COMUNIDAD_NATIVA: [
		"COMUNIDAD",
		"TITULAR_REGISTRAL",
		"LITIGIO"
	],
	SUCESION: ["SUCESION", "LITIGIO"],
	JUNTA_PROPIETARIOS: ["JUNTA"]
};
/**
* Añadir o editar un titular del sujeto pasivo. Modal ancho a dos columnas; los bloques cambian con el
* tipo de persona. Se puede guardar con datos pendientes (resumen "Faltan" en el pie); registrar el
* sujeto pasivo en la pantalla exige que no falte nada.
*/
function TitularDialog({ inicial, onCerrar, onGuardar }) {
	const [t, setT] = useState(() => inicial ?? titularVacio());
	const [conyuge, setConyuge] = useState({
		agregar: false,
		nombres: "",
		numero: ""
	});
	const [doc, setDoc] = useState({
		tipo: "",
		numero: "",
		fecha: "",
		entidad: "",
		archivo: null,
		obligatoria: false
	});
	const cambiar = (k, v) => setT((x) => ({
		...x,
		[k]: v
	}));
	const faltan = faltantesTitular(t);
	const natural = t.tipoPersona === "NATURAL";
	const comunidad = esComunidad(t);
	const conPareja = natural && (t.estadoCivil === "CASADO" || t.estadoCivil === "CONVIVIENTE");
	const posesion = t.condicion === "POSEEDOR_10";
	const [paso, setPaso] = useState(inicial ? "formulario" : "consulta");
	const [consultando, setConsultando] = useState(false);
	const [errorReniec, setErrorReniec] = useState(null);
	const enConsulta = paso === "consulta" && natural && t.tipoDocumento === "DNI";
	async function consultar(dni) {
		const limpio = dni.trim();
		if (!/^\d{8}$/.test(limpio)) {
			setErrorReniec("El DNI tiene 8 dígitos.");
			return;
		}
		setConsultando(true);
		setErrorReniec(null);
		const d = await consultarReniec(limpio);
		setConsultando(false);
		if (!d) {
			setErrorReniec(`RENIEC no devolvió datos para el DNI ${limpio}. Revise el número o complete a mano.`);
			return;
		}
		const { consultadoEl, simulado, ...datos } = d;
		setT((x) => ({
			...x,
			...datos,
			reniecConsultadoEl: consultadoEl,
			reniecSimulado: simulado
		}));
		setPaso("formulario");
	}
	const cambiarTipo = (tipo) => setT((x) => ({
		...x,
		tipoPersona: tipo,
		tipoDocumento: tipo === "NATURAL" ? "DNI" : "RUC",
		condicion: CONDICIONES_POR_TIPO[tipo][0],
		tieneRepresentante: tipo !== "NATURAL"
	}));
	const agregarDoc = () => {
		if (!doc.tipo) return;
		cambiar("documentos", [...t.documentos, {
			...doc,
			id: idSP()
		}]);
		setDoc({
			tipo: "",
			numero: "",
			fecha: "",
			entidad: "",
			archivo: null,
			obligatoria: false
		});
	};
	const archivoCampo = (clave) => ({
		onCargar: (_, f) => cambiar(clave, archivoDe(f)),
		onQuitar: () => cambiar(clave, null)
	});
	const texto = (k, extra = {}) => (id) => /* @__PURE__ */ jsx("input", {
		id,
		className: controlClase,
		value: String(t[k] ?? ""),
		onChange: (e) => cambiar(k, e.target.value),
		...extra
	});
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "xl",
		titulo: inicial ? `Editar titular · ${inicial.nombres || "sin nombre"}` : "Añadir titular",
		descripcion: "Identidad, contacto y notificación, condición jurídica y documentos (art. 4.15, 6, 7 y 8 del TUO del DL 1192).",
		pie: /* @__PURE__ */ jsxs("div", {
			className: "flex w-full flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsx("p", {
				className: `max-w-2xl text-xs ${faltan.length ? "text-warning" : "text-success"}`,
				role: "status",
				children: faltan.length ? `Faltan para registrar: ${faltan.join(", ")}.` : "Datos completos para registrar."
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: onCerrar,
					children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					disabled: !t.nombres.trim(),
					title: t.nombres.trim() ? void 0 : "Escriba al menos el nombre",
					onClick: () => onGuardar(t, conPareja && conyuge.agregar && conyuge.nombres.trim() ? conyuge : void 0),
					children: [/* @__PURE__ */ jsx(Save, {}), " Guardar titular"]
				})]
			})]
		}),
		children: [
			/* @__PURE__ */ jsxs("fieldset", {
				className: "mb-4",
				children: [/* @__PURE__ */ jsx("legend", {
					className: "mb-2 text-sm font-medium",
					children: "Tipo de persona"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-x-5 gap-y-2 text-sm",
					role: "radiogroup",
					children: Object.keys(TIPO_PERSONA).map((tp) => /* @__PURE__ */ jsxs("label", {
						className: "flex cursor-pointer items-center gap-2",
						children: [/* @__PURE__ */ jsx("input", {
							type: "radio",
							name: "tipoPersona",
							checked: t.tipoPersona === tp,
							onChange: () => cambiarTipo(tp),
							className: "accent-primary"
						}), TIPO_PERSONA[tp]]
					}, tp))
				})]
			}),
			enConsulta ? /* @__PURE__ */ jsx(ConsultaIdentidad, {
				consultando,
				error: errorReniec,
				onConsultar: consultar,
				onFicha: (f) => {
					cambiar("fichaReniec", archivoDe(f));
					const dni = dniDeArchivo(f.name);
					if (dni) consultar(dni);
					else setErrorReniec("La ficha quedó adjunta. Escriba el DNI para cargar los datos.");
				},
				ficha: t.fichaReniec,
				onManual: () => setPaso("formulario")
			}) : /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Subtitulo, { children: "Identidad" }),
					/* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Tipo de documento",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsx("select", {
								id,
								className: controlClase,
								value: t.tipoDocumento,
								onChange: (e) => cambiar("tipoDocumento", e.target.value),
								children: Object.keys(TIPO_DOCUMENTO).map((d) => /* @__PURE__ */ jsx("option", {
									value: d,
									children: TIPO_DOCUMENTO[d]
								}, d))
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Número",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [texto("numero", { inputMode: t.tipoDocumento === "DNI" || t.tipoDocumento === "RUC" ? "numeric" : void 0 })(id), natural && t.tipoDocumento === "DNI" && /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									disabled: consultando,
									onClick: () => consultar(t.numero),
									children: [
										/* @__PURE__ */ jsx(Search, {}),
										" ",
										consultando ? "Consultando…" : "Consultar RENIEC"
									]
								})]
							}), errorReniec && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-destructive",
								children: errorReniec
							})] })
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: natural ? "Nombres y apellidos" : "Denominación o razón social",
							obligatorio: true,
							children: texto("nombres")
						}),
						natural && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Caducidad del DNI",
							children: texto("caducidad", { type: "date" })
						}), /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Estado civil",
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: t.estadoCivil,
								onChange: (e) => cambiar("estadoCivil", e.target.value),
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "SOLTERO",
										children: "Soltero"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "CASADO",
										children: "Casado"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "CONVIVIENTE",
										children: "Conviviente"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "VIUDO",
										children: "Viudo"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "DIVORCIADO",
										children: "Divorciado"
									})
								]
							})
						})] }),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Cuota de copropiedad (%)",
							ayuda: "Las cuotas de todos los titulares deben sumar 100 %. Con un solo titular puede dejarse vacía.",
							children: texto("cuota", {
								inputMode: "numeric",
								placeholder: "100"
							})
						})
					] }),
					conPareja && !inicial && /* @__PURE__ */ jsxs("div", {
						className: "mt-3 rounded-md bg-background p-3 text-sm",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "flex cursor-pointer items-center gap-2",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: conyuge.agregar,
								onChange: (e) => setConyuge((c) => ({
									...c,
									agregar: e.target.checked
								})),
								className: "accent-primary"
							}), "Agregar al cónyuge o conviviente como cotitular (firma el formulario registral)"]
						}), conyuge.agregar && /* @__PURE__ */ jsxs("div", {
							className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ jsx("input", {
								"aria-label": "Nombres del cónyuge",
								placeholder: "Nombres y apellidos",
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: conyuge.nombres,
								onChange: (e) => setConyuge((c) => ({
									...c,
									nombres: e.target.value
								}))
							}), /* @__PURE__ */ jsx("input", {
								"aria-label": "DNI del cónyuge",
								placeholder: "DNI",
								inputMode: "numeric",
								className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
								value: conyuge.numero,
								onChange: (e) => setConyuge((c) => ({
									...c,
									numero: e.target.value
								}))
							})]
						})]
					}),
					natural && t.tipoDocumento === "DNI" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
						/* @__PURE__ */ jsx(Subtitulo, {
							acciones: /* @__PURE__ */ jsx(StatusBadge, {
								tono: TONO_DNI$1[estadoDni(t)],
								children: NOMBRE_ESTADO_DNI[estadoDni(t)]
							}),
							children: "Documento de identidad"
						}),
						/* @__PURE__ */ jsx(ListaDocumentos, {
							items: [
								{
									clave: "dniAnverso",
									nombre: "Anverso del DNI",
									archivo: t.dniAnverso,
									accept: "image/*,.pdf"
								},
								{
									clave: "dniReverso",
									nombre: "Reverso del DNI",
									archivo: t.dniReverso,
									accept: "image/*,.pdf"
								},
								{
									clave: "fichaReniec",
									nombre: "Ficha RENIEC",
									archivo: t.fichaReniec,
									accept: ".pdf",
									ayuda: "PDF de la consulta RENIEC"
								}
							],
							onCargar: (k, f) => cambiar(k, archivoDe(f)),
							onQuitar: (k) => cambiar(k, null)
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: t.reniecConsultadoEl ? `Nombres, estado civil, caducidad y domicilio cargados de RENIEC el ${fechaHora(t.reniecConsultadoEl)}${t.reniecSimulado ? " (respuesta simulada: M9 sin convenio activo)" : ""}.` : "Datos escritos a mano: no se consultó RENIEC."
						})
					] }),
					(natural || !comunidad) && /* @__PURE__ */ jsxs(Fragment$1, { children: [
						/* @__PURE__ */ jsx(Subtitulo, { children: "Representante o apoderado" }),
						natural && /* @__PURE__ */ jsxs("label", {
							className: "mb-2 flex cursor-pointer items-center gap-2 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: t.tieneRepresentante,
								onChange: (e) => cambiar("tieneRepresentante", e.target.checked),
								className: "accent-primary"
							}), "Actúa mediante representante o apoderado"]
						}),
						(t.tieneRepresentante || exigeRepresentante(t)) && /* @__PURE__ */ jsxs(FormGrid, { children: [
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Nombres del representante",
								obligatorio: true,
								children: texto("representanteNombres")
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "DNI del representante",
								obligatorio: true,
								children: texto("representanteDni", { inputMode: "numeric" })
							}),
							/* @__PURE__ */ jsx(FormField, {
								etiqueta: "Poder o vigencia",
								children: /* @__PURE__ */ jsx(ListaDocumentos, {
									items: [{
										clave: "representantePoder",
										nombre: "Poder o vigencia de poder",
										archivo: t.representantePoder
									}],
									...archivoCampo("representantePoder")
								})
							})
						] })
					] })
				] }), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Subtitulo, { children: "Contacto y notificación" }),
					/* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Correo electrónico",
							children: texto("correo", {
								type: "email",
								inputMode: "email"
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Celular",
							children: (id) => /* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ jsx("input", {
									id,
									inputMode: "tel",
									className: `${controlClase} max-w-48`,
									value: t.celular,
									onChange: (e) => cambiar("celular", e.target.value)
								}), /* @__PURE__ */ jsxs("label", {
									className: "flex cursor-pointer items-center gap-2 text-sm",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: t.whatsapp,
										onChange: (e) => cambiar("whatsapp", e.target.checked),
										className: "accent-primary"
									}), "Tiene WhatsApp"]
								})]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Teléfono fijo",
							children: texto("telefono", { inputMode: "tel" })
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Domicilio real",
							obligatorio: true,
							children: texto("domicilio")
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Distrito, provincia y departamento",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ jsx("input", {
										"aria-label": "Distrito",
										placeholder: "Distrito",
										className: controlClase,
										value: t.distrito,
										onChange: (e) => cambiar("distrito", e.target.value)
									}),
									/* @__PURE__ */ jsx("input", {
										"aria-label": "Provincia",
										placeholder: "Provincia",
										className: controlClase,
										value: t.provincia,
										onChange: (e) => cambiar("provincia", e.target.value)
									}),
									/* @__PURE__ */ jsx("input", {
										"aria-label": "Departamento",
										placeholder: "Departamento",
										className: controlClase,
										value: t.departamento,
										onChange: (e) => cambiar("departamento", e.target.value)
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Domicilio para notificaciones",
							ayuda: "Ahí se entrega la comunicación de afectación (art. 16.1) y la carta de intención (art. 20.2).",
							children: (id) => /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("label", {
									className: "flex cursor-pointer items-center gap-2 text-sm",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: t.notificarEnDomicilioReal,
										onChange: (e) => cambiar("notificarEnDomicilioReal", e.target.checked),
										className: "accent-primary"
									}), "Usar el domicilio real"]
								}), !t.notificarEnDomicilioReal && /* @__PURE__ */ jsx("input", {
									id,
									className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
									value: t.domicilioNotificacion,
									onChange: (e) => cambiar("domicilioNotificacion", e.target.value)
								})]
							})
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "flex cursor-pointer items-start gap-2 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: t.aceptaElectronica,
								onChange: (e) => cambiar("aceptaElectronica", e.target.checked),
								className: "mt-0.5 accent-primary"
							}), /* @__PURE__ */ jsxs("span", { children: ["Autoriza la notificación electrónica al correo", /* @__PURE__ */ jsx("span", {
								className: "block text-xs text-muted-foreground",
								children: "Autorización expresa del administrado (TUO de la Ley 27444). Sin ella, se notifica solo en el domicilio."
							})] })]
						})
					] }),
					/* @__PURE__ */ jsx(Subtitulo, { children: "Titularidad" }),
					/* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Condición jurídica",
							obligatorio: true,
							ayuda: `${CONDICION[t.condicion].base}. Exige: ${CONDICION[t.condicion].exige}`,
							children: (id) => /* @__PURE__ */ jsx("select", {
								id,
								className: controlClase,
								value: t.condicion,
								onChange: (e) => cambiar("condicion", e.target.value),
								children: CONDICIONES_POR_TIPO[t.tipoPersona].map((c) => /* @__PURE__ */ jsx("option", {
									value: c,
									children: CONDICION[c].nombre
								}, c))
							})
						}),
						(t.condicion === "TITULAR_REGISTRAL" || t.condicion === "FIDUCIARIO" || t.condicion === "JUNTA") && /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Partida registral",
							obligatorio: t.condicion === "TITULAR_REGISTRAL",
							children: texto("partida", { inputMode: "numeric" })
						}),
						posesion && /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Inicio de la posesión",
							obligatorio: true,
							ayuda: "Debe superar los diez años a la fecha (art. 6.3 y 7.2).",
							children: texto("fechaInicioPosesion", { type: "date" })
						})
					] }),
					/* @__PURE__ */ jsx(Subtitulo, { children: "Documentos de sustento" }),
					t.documentos.length > 0 && /* @__PURE__ */ jsx("ul", {
						className: "mb-2 divide-y divide-border rounded-md border border-border",
						children: t.documentos.map((d) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-2 px-3 py-2 text-sm",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "block font-medium",
									children: [d.tipo, d.obligatoria && /* @__PURE__ */ jsx("span", {
										className: "ml-2 rounded-sm bg-primary-soft px-1 text-xs font-semibold text-primary-dark",
										children: "Prueba obligatoria"
									})]
								}), /* @__PURE__ */ jsx("span", {
									className: "block text-xs text-muted-foreground",
									children: [
										d.numero,
										d.fecha,
										d.entidad,
										d.archivo?.nombre
									].filter(Boolean).join(" · ") || "Sin datos adicionales"
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => cambiar("documentos", t.documentos.filter((x) => x.id !== d.id)),
								className: "rounded-sm p-1 text-destructive hover:bg-destructive-soft",
								"aria-label": `Quitar ${d.tipo}`,
								title: "Quitar documento",
								children: /* @__PURE__ */ jsx(Trash2, {
									size: 14,
									"aria-hidden": true
								})
							})]
						}, d.id))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 gap-2 rounded-md bg-background p-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ jsxs("select", {
								"aria-label": "Tipo de documento de sustento",
								className: `${controlClase} sm:col-span-2`,
								value: doc.tipo,
								onChange: (e) => setDoc((d) => ({
									...d,
									tipo: e.target.value
								})),
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Tipo de documento…"
								}), Object.entries(DOCUMENTOS_SUSTENTO).map(([grupo, tipos]) => /* @__PURE__ */ jsx("optgroup", {
									label: grupo,
									children: tipos.map((tp) => /* @__PURE__ */ jsx("option", { children: tp }, tp))
								}, grupo))]
							}),
							/* @__PURE__ */ jsx("input", {
								"aria-label": "Número del documento",
								placeholder: "Número",
								className: controlClase,
								value: doc.numero,
								onChange: (e) => setDoc((d) => ({
									...d,
									numero: e.target.value
								}))
							}),
							/* @__PURE__ */ jsx("input", {
								"aria-label": "Fecha del documento",
								type: "date",
								className: controlClase,
								value: doc.fecha,
								onChange: (e) => setDoc((d) => ({
									...d,
									fecha: e.target.value
								}))
							}),
							/* @__PURE__ */ jsx("input", {
								"aria-label": "Entidad emisora",
								placeholder: "Entidad emisora",
								className: `${controlClase} sm:col-span-2`,
								value: doc.entidad,
								onChange: (e) => setDoc((d) => ({
									...d,
									entidad: e.target.value
								}))
							}),
							/* @__PURE__ */ jsxs("label", {
								className: "flex h-9 cursor-pointer items-center gap-2 truncate rounded-md border border-border bg-card px-3 text-sm hover:bg-primary-soft sm:col-span-2",
								children: [doc.archivo ? doc.archivo.nombre : "Adjuntar archivo (PDF o imagen)", /* @__PURE__ */ jsx("input", {
									type: "file",
									className: "sr-only",
									accept: ".pdf,image/*",
									onChange: (e) => setDoc((d) => ({
										...d,
										archivo: e.target.files?.[0] ? archivoDe(e.target.files[0]) : null
									}))
								})]
							}),
							posesion && DOCUMENTOS_SUSTENTO["Posesión (art. 6.3)"].includes(doc.tipo) && /* @__PURE__ */ jsxs("label", {
								className: "flex cursor-pointer items-center gap-2 text-sm sm:col-span-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: Boolean(doc.obligatoria),
									onChange: (e) => setDoc((d) => ({
										...d,
										obligatoria: e.target.checked
									})),
									className: "accent-primary"
								}), "Es la prueba obligatoria según la norma de formalización"]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								className: "sm:col-span-2 sm:justify-self-start",
								disabled: !doc.tipo,
								onClick: agregarDoc,
								children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar documento"]
							})
						]
					})
				] })]
			}),
			comunidad && /* @__PURE__ */ jsx(BloqueComunidad, {
				t,
				cambiar
			})
		]
	});
}
function BloqueComunidad({ t, cambiar }) {
	const [nuevo, setNuevo] = useState({
		nombres: "",
		dni: "",
		condicion: "COMUNERO_HABIL",
		area: ""
	});
	const archivo = (k, nombre, ayuda) => ({
		clave: k,
		nombre,
		archivo: t[k],
		ayuda
	});
	const editarComunero = (id, campo, valor) => cambiar("comuneros", t.comuneros.map((c) => c.id === id ? {
		...c,
		[campo]: valor
	} : c));
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: "Comunidad: junta directiva, acuerdos y comuneros" }),
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 rounded-md bg-warning-soft px-3 py-2 text-xs text-warning",
				children: "Las tierras comunales se rigen por las leyes de la materia (art. 41.8 del TUO; Ley 24656 y Ley 26505, por verificar). La afectación requiere acuerdo de la asamblea general."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(FormGrid, {
					columnas: 1,
					children: [/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Presidente de la junta directiva",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase,
							value: t.juntaPresidente,
							onChange: (e) => cambiar("juntaPresidente", e.target.value)
						})
					}), /* @__PURE__ */ jsx(FormField, {
						etiqueta: "DNI del presidente",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							inputMode: "numeric",
							className: controlClase,
							value: t.juntaPresidenteDni,
							onChange: (e) => cambiar("juntaPresidenteDni", e.target.value)
						})
					})]
				}), /* @__PURE__ */ jsx(ListaDocumentos, {
					items: [
						archivo("actaAsamblea", "Acta de asamblea general", "Acuerdo que aprueba la afectación o disposición"),
						archivo("vigenciaPoder", "Vigencia de poder de la junta directiva"),
						archivo("padronComuneros", "Padrón de comuneros vigente")
					],
					onCargar: (k, f) => cambiar(k, archivoDe(f)),
					onQuitar: (k) => cambiar(k, null)
				})]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mb-2 mt-4 text-sm font-medium",
				children: [
					"Comuneros que ocupan el predio (",
					t.comuneros.length,
					")"
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-2 text-xs text-muted-foreground",
				children: "Después de guardar, cada comunero puede tener su expediente individual desde la pantalla del sujeto pasivo."
			}),
			t.comuneros.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "mb-2 overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							className: "px-2 py-1 text-left text-xs",
							children: "Nombres"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-2 py-1 text-left text-xs",
							children: "DNI"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-2 py-1 text-left text-xs",
							children: "Condición"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-2 py-1 text-left text-xs",
							children: "Área o lote"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "px-2 py-1 text-left text-xs",
							children: "Constancias"
						}),
						/* @__PURE__ */ jsx("th", { className: "px-2 py-1" })
					] }) }), /* @__PURE__ */ jsx("tbody", { children: t.comuneros.map((c) => /* @__PURE__ */ jsxs("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-1",
								children: c.nombres
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-1 tabular-nums",
								children: c.dni
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-1",
								children: c.condicion === "COMUNERO_HABIL" ? "Comunero hábil" : "Posesionario"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-1",
								children: c.area
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-1",
								children: /* @__PURE__ */ jsx("span", {
									className: "flex flex-wrap gap-2 text-xs",
									children: [["constanciaHabil", "Comunero hábil"], ["constanciaPosesion", "Posesión"]].map(([k, n]) => /* @__PURE__ */ jsxs("label", {
										className: `cursor-pointer rounded-sm px-1.5 py-0.5 ${c[k] ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"}`,
										children: [c[k] ? `✓ ${n}` : `Cargar ${n.toLowerCase()}`, /* @__PURE__ */ jsx("input", {
											type: "file",
											className: "sr-only",
											accept: ".pdf,image/*",
											onChange: (e) => e.target.files?.[0] && editarComunero(c.id, k, archivoDe(e.target.files[0]))
										})]
									}, k))
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-2 py-1 text-right",
								children: !c.expediente && /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => cambiar("comuneros", t.comuneros.filter((x) => x.id !== c.id)),
									className: "rounded-sm p-1 text-destructive hover:bg-destructive-soft",
									"aria-label": `Quitar a ${c.nombres}`,
									title: "Quitar comunero",
									children: /* @__PURE__ */ jsx(Trash2, {
										size: 14,
										"aria-hidden": true
									})
								})
							})
						]
					}, c.id)) })]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-2 rounded-md bg-background p-3 sm:grid-cols-5",
				children: [
					/* @__PURE__ */ jsx("input", {
						"aria-label": "Nombres del comunero",
						placeholder: "Nombres y apellidos",
						className: `${controlClase} sm:col-span-2`,
						value: nuevo.nombres,
						onChange: (e) => setNuevo((n) => ({
							...n,
							nombres: e.target.value
						}))
					}),
					/* @__PURE__ */ jsx("input", {
						"aria-label": "DNI del comunero",
						placeholder: "DNI",
						inputMode: "numeric",
						className: controlClase,
						value: nuevo.dni,
						onChange: (e) => setNuevo((n) => ({
							...n,
							dni: e.target.value
						}))
					}),
					/* @__PURE__ */ jsxs("select", {
						"aria-label": "Condición del comunero",
						className: controlClase,
						value: nuevo.condicion,
						onChange: (e) => setNuevo((n) => ({
							...n,
							condicion: e.target.value
						})),
						children: [/* @__PURE__ */ jsx("option", {
							value: "COMUNERO_HABIL",
							children: "Comunero hábil"
						}), /* @__PURE__ */ jsx("option", {
							value: "POSESIONARIO",
							children: "Posesionario"
						})]
					}),
					/* @__PURE__ */ jsx("input", {
						"aria-label": "Área o lote",
						placeholder: "Área o lote",
						className: controlClase,
						value: nuevo.area,
						onChange: (e) => setNuevo((n) => ({
							...n,
							area: e.target.value
						}))
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "sm:col-span-5 sm:justify-self-start",
						disabled: !nuevo.nombres.trim() || !/^\d{8}$/.test(nuevo.dni),
						title: !/^\d{8}$/.test(nuevo.dni) ? "Nombre y DNI de 8 dígitos" : void 0,
						onClick: () => {
							cambiar("comuneros", [...t.comuneros, {
								...nuevo,
								id: idSP(),
								constanciaHabil: null,
								constanciaPosesion: null
							}]);
							setNuevo({
								nombres: "",
								dni: "",
								condicion: "COMUNERO_HABIL",
								area: ""
							});
						},
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar comunero"]
					})
				]
			})
		]
	});
}
/** Paso 1 de una persona natural: DNI o ficha RENIEC. La respuesta llena el formulario. */
function ConsultaIdentidad({ consultando, error, ficha, onConsultar, onFicha, onManual }) {
	const [dni, setDni] = useState("");
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-border bg-background p-4",
		children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: "Paso 1 · Consulta de identidad" }),
			/* @__PURE__ */ jsx("p", {
				className: "mb-4 text-sm text-muted-foreground",
				children: "Ingrese el DNI o adjunte la ficha RENIEC. Con la respuesta de RENIEC se cargan nombres, estado civil, caducidad y domicilio; luego se completa el resto."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => {
						e.preventDefault();
						onConsultar(dni);
					},
					children: [/* @__PURE__ */ jsxs("label", {
						htmlFor: "consulta-dni",
						className: "mb-1 block text-sm font-medium",
						children: ["DNI ", /* @__PURE__ */ jsx("span", {
							className: "text-destructive",
							children: "*"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ jsx("input", {
							id: "consulta-dni",
							autoFocus: true,
							inputMode: "numeric",
							maxLength: 8,
							placeholder: "8 dígitos",
							className: controlClase,
							value: dni,
							onChange: (e) => setDni(e.target.value.replace(/\D/g, ""))
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: consultando || dni.length !== 8,
							children: [
								/* @__PURE__ */ jsx(Search, {}),
								" ",
								consultando ? "Consultando…" : "Consultar RENIEC"
							]
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "mb-1 text-sm font-medium",
					children: "O adjunte la ficha RENIEC"
				}), /* @__PURE__ */ jsx(ListaDocumentos, {
					items: [{
						clave: "fichaReniec",
						nombre: "Ficha RENIEC",
						archivo: ficha,
						accept: ".pdf",
						ayuda: "Se lee el DNI del nombre del archivo y se consulta"
					}],
					onCargar: (_, f) => onFicha(f),
					onQuitar: () => void 0,
					deshabilitado: consultando
				})] })]
			}),
			error && /* @__PURE__ */ jsxs("p", {
				role: "alert",
				className: "mt-3 flex items-center gap-2 text-sm text-destructive",
				children: [
					/* @__PURE__ */ jsx(FileSearch, {
						size: 16,
						"aria-hidden": true
					}),
					" ",
					error
				]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				className: "mt-3",
				onClick: onManual,
				children: [/* @__PURE__ */ jsx(PenLine, {}), " Sin DNI o sin conexión: completar a mano"]
			})
		]
	});
}
//#endregion
//#region src/routes/proyectos.$projectId.predios.$codigo.sujeto-pasivo.tsx?tsr-split=component
var TONO_DNI = {
	completo: "success",
	parcial: "warning",
	sin: "destructive",
	no_aplica: "neutral"
};
/** Nombres legibles de los campos en el histórico. */
var ETIQUETAS = {
	predioInscrito: "Predio inscrito en SUNARP",
	estado: "Estado del registro",
	titulares: "Titular",
	ocupantes: "Ocupante",
	comuneros: "Comunero",
	documentos: "Documento",
	litigio: "Litigio",
	partidaMatriz: "Partida matriz",
	partidaIndependizada: "Partida independizada",
	areaDocumento: "Área del documento",
	unidadDocumento: "Unidad",
	tipoPersona: "Tipo de persona",
	tipoDocumento: "Tipo de documento",
	numero: "Número de documento",
	nombres: "Nombres",
	caducidad: "Caducidad del DNI",
	dniAnverso: "Anverso del DNI",
	dniReverso: "Reverso del DNI",
	fichaReniec: "Ficha RENIEC",
	reniecConsultadoEl: "Consulta RENIEC",
	reniecSimulado: "Respuesta RENIEC simulada",
	estadoCivil: "Estado civil",
	cuota: "Cuota (%)",
	correo: "Correo",
	celular: "Celular",
	whatsapp: "WhatsApp",
	telefono: "Teléfono fijo",
	domicilio: "Domicilio real",
	departamento: "Departamento",
	provincia: "Provincia",
	distrito: "Distrito",
	notificarEnDomicilioReal: "Notificar en el domicilio real",
	domicilioNotificacion: "Domicilio para notificaciones",
	aceptaElectronica: "Autoriza notificación electrónica",
	condicion: "Condición jurídica",
	partida: "Partida registral",
	fechaInicioPosesion: "Inicio de la posesión",
	tieneRepresentante: "Tiene representante",
	representanteNombres: "Representante",
	representanteDni: "DNI del representante",
	representantePoder: "Poder del representante",
	juntaPresidente: "Presidente de la junta",
	juntaPresidenteDni: "DNI del presidente",
	actaAsamblea: "Acta de asamblea",
	vigenciaPoder: "Vigencia de poder",
	padronComuneros: "Padrón de comuneros",
	constanciaHabil: "Constancia de comunero hábil",
	constanciaPosesion: "Constancia de posesión",
	expediente: "Expediente individual",
	relacion: "Relación con el titular",
	notificadoEl: "Notificado el",
	dni: "DNI",
	area: "Área o lote",
	tipo: "Tipo",
	expedienteJudicial: "Expediente",
	organo: "Órgano",
	partes: "Partes",
	fecha: "Fecha",
	entidad: "Entidad emisora",
	archivo: "Archivo",
	obligatoria: "Prueba obligatoria"
};
/** Punto de partida cuando el predio aún no tiene registro: los sujetos del padrón, sin documentos. */
var registroInicial = (codigo, derivado) => registroInicialSujetoPasivo(predioDelProyecto(codigo), derivado);
function SujetoPasivoPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const navigate = useNavigate();
	const rol = useRol();
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const derivados = usePrediosDerivados();
	const derivado = derivadoDe(derivados, decodedCodigo);
	const claveHistorial = `sujeto-pasivo-${decodedCodigo}`;
	const versiones = useHistorial(claveHistorial);
	const [reg, setReg, cargado] = useAlmacen(claveSujetoPasivo(decodedCodigo), registroInicial(decodedCodigo, derivado));
	const [editando, setEditando] = useState(null);
	const [eliminar, setEliminar] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const [ocupante, setOcupante] = useState({
		nombres: "",
		dni: "",
		relacion: "",
		notificadoEl: ""
	});
	const puedeRestaurar = rol === "ADMIN" || rol === "COORDINADOR";
	useEffect(() => {
		if (cargado && derivado && reg.titulares.length === 0 && !leerSujetoPasivo(decodedCodigo)) setReg(registroInicial(decodedCodigo, derivado));
	}, [
		cargado,
		derivado,
		reg.titulares.length,
		decodedCodigo,
		setReg
	]);
	/** Guarda el registro y deja la versión en el histórico. La primera vez, antes guarda cómo estaba. */
	function guardar(nuevo, accion, objeto, motivo) {
		if (versiones.length === 0) registrarVersion(claveHistorial, {
			accion: "Creó el registro",
			objeto: `${reg.titulares.length} titulares desde el padrón`,
			registro: reg
		}, {
			modulo: 11,
			entidad: "sujeto_pasivo"
		});
		setReg(nuevo);
		registrarVersion(claveHistorial, {
			accion,
			objeto,
			motivo,
			registro: nuevo
		}, {
			modulo: 11,
			entidad: "sujeto_pasivo"
		});
	}
	function guardarTitular(t, conyuge) {
		const existe = reg.titulares.some((x) => x.id === t.id);
		const titulares = existe ? reg.titulares.map((x) => x.id === t.id ? t : x) : [...reg.titulares, t];
		if (conyuge) titulares.push(titularVacio({
			nombres: conyuge.nombres,
			numero: conyuge.numero,
			estadoCivil: t.estadoCivil,
			condicion: t.condicion,
			partida: t.partida,
			domicilio: t.domicilio,
			distrito: t.distrito,
			provincia: t.provincia,
			departamento: t.departamento
		}));
		guardar({
			...reg,
			titulares
		}, existe ? "Modificó titular" : "Agregó titular", `${t.nombres}${conyuge ? ` y su cónyuge ${conyuge.nombres}` : ""}`);
		setEditando(null);
		setMensaje({
			tipo: "exito",
			texto: `Titular ${t.nombres} ${existe ? "actualizado" : "agregado"}.`
		});
	}
	function confirmarEliminacion(motivo) {
		if (!eliminar) return;
		if (eliminar.tipo === "titular") guardar({
			...reg,
			titulares: reg.titulares.filter((t) => t.id !== eliminar.id)
		}, "Eliminó titular", eliminar.nombre, motivo);
		else guardar({
			...reg,
			ocupantes: reg.ocupantes.filter((o) => o.id !== eliminar.id)
		}, "Eliminó ocupante", eliminar.nombre, motivo);
		setMensaje({
			tipo: "exito",
			texto: `${eliminar.tipo === "titular" ? "Titular" : "Ocupante"} ${eliminar.nombre} eliminado. El motivo quedó en el histórico.`
		});
		setEliminar(null);
	}
	function agregarOcupante() {
		const o = {
			id: idSP(),
			...ocupante
		};
		guardar({
			...reg,
			ocupantes: [...reg.ocupantes, o]
		}, "Agregó ocupante", o.nombres);
		setOcupante({
			nombres: "",
			dni: "",
			relacion: "",
			notificadoEl: ""
		});
	}
	function abrirExpedienteIndividual(titular, comunero) {
		const codigoHijo = comunero.expediente ?? codigoComunero(decodedCodigo, derivados.map((d) => d.codigo));
		if (!comunero.expediente) {
			crearPredioDerivado({
				codigo: codigoHijo,
				padre: decodedCodigo,
				projectId,
				comunidad: titular.nombres,
				comunero: comunero.nombres,
				dni: comunero.dni,
				area: comunero.area
			});
			const titulares = reg.titulares.map((t) => t.id === titular.id ? {
				...t,
				comuneros: t.comuneros.map((c) => c.id === comunero.id ? {
					...c,
					expediente: codigoHijo
				} : c)
			} : t);
			guardar({
				...reg,
				titulares
			}, "Abrió expediente individual", `${comunero.nombres} · ${codigoHijo}`);
		}
		navigate({
			to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
			params: {
				projectId,
				codigo: codigoHijo
			}
		});
	}
	function guardarBorrador() {
		guardar({
			...reg,
			estado: reg.estado
		}, "Guardó datos de titularidad", "situación registral, partidas y litigio");
		setMensaje({
			tipo: "exito",
			texto: "Borrador del sujeto pasivo guardado."
		});
	}
	function registrar() {
		const faltan = faltantesRegistro(reg);
		if (faltan.length) {
			setMensaje({
				tipo: "error",
				texto: "No se puede registrar: faltan datos.",
				detalle: faltan
			});
			return;
		}
		guardar({
			...reg,
			estado: "REGISTRADO"
		}, "Registró el sujeto pasivo", `estado ${reg.estado} → REGISTRADO`);
		setMensaje({
			tipo: "exito",
			texto: "Sujeto pasivo registrado. La comunicación de afectación y la carta de intención ya toman estos datos."
		});
	}
	const suma = sumaCuotas(reg.titulares);
	const dniIncompletos = reg.titulares.filter((t) => ["sin", "parcial"].includes(estadoDni(t))).length;
	const comunidades = reg.titulares.filter(esComunidad);
	const hayLitigio = reg.titulares.some((t) => t.condicion === "LITIGIO");
	/** Excel o PDF de los titulares, con la cabecera del predio al que pertenecen. */
	function descargar(formato) {
		const p = predioDelProyecto(decodedCodigo);
		const cabecera = {
			titulo: `Sujeto pasivo del predio ${decodedCodigo}`,
			lineas: [
				`Proyecto: ${projectLabel}`,
				`Predio: ${decodedCodigo}${derivado ? ` · expediente individual del predio comunal ${derivado.padre} (${derivado.comunidad})` : ""}`,
				`Estado del registro: ${reg.estado === "REGISTRADO" ? "Registrado" : "Borrador"} · Predio inscrito en SUNARP: ${reg.predioInscrito ? "Sí" : "No"}${reg.partidaMatriz ? ` · Partida ${reg.partidaMatriz}` : ""}`,
				`Área del documento: ${reg.areaDocumento || p?.area ? `${reg.areaDocumento || p?.area} ${reg.unidadDocumento === "ha" ? "ha" : "m²"}` : "sin dato"} · Suma de cuotas: ${suma} %`,
				...reg.ocupantes.length ? [`Ocupantes: ${reg.ocupantes.map((o) => o.nombres).join(", ")}`] : []
			]
		};
		const columnas = [
			{
				titulo: "N.º",
				valor: (t) => reg.titulares.indexOf(t) + 1
			},
			{
				titulo: "Titular",
				valor: (t) => t.nombres
			},
			{
				titulo: "Tipo de persona",
				valor: (t) => TIPO_PERSONA[t.tipoPersona]
			},
			{
				titulo: "Documento",
				valor: (t) => t.numero ? `${TIPO_DOCUMENTO[t.tipoDocumento]} ${t.numero}` : "Pendiente"
			},
			{
				titulo: "Condición jurídica",
				valor: (t) => CONDICION[t.condicion].nombre
			},
			{
				titulo: "Cuota (%)",
				valor: (t) => t.cuota || (reg.titulares.length === 1 ? "100" : "")
			},
			{
				titulo: "DNI",
				valor: (t) => NOMBRE_ESTADO_DNI[estadoDni(t)]
			},
			{
				titulo: "Correo",
				valor: (t) => t.correo
			},
			{
				titulo: "Celular",
				valor: (t) => `${t.celular}${t.whatsapp ? " (WhatsApp)" : ""}`
			},
			{
				titulo: "Domicilio de notificación",
				valor: (t) => [
					t.notificarEnDomicilioReal ? t.domicilio : t.domicilioNotificacion,
					t.distrito,
					t.provincia,
					t.departamento
				].filter(Boolean).join(", ")
			},
			{
				titulo: "Notificación electrónica",
				valor: (t) => t.aceptaElectronica ? "Autorizada" : "No"
			}
		];
		const nombre = `sujeto-pasivo-${decodedCodigo}`;
		if (formato === "excel") exportarExcel(nombre, columnas, reg.titulares, cabecera);
		else exportarPdf(nombre, columnas, reg.titulares, cabecera);
	}
	const setCampo = (k, v) => setReg({
		...reg,
		[k]: v
	});
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
				titulo: "Sujeto pasivo",
				icono: ShieldCheck,
				sinDocumentos: true,
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(StatusBadge, {
						tono: reg.estado === "REGISTRADO" ? "success" : "warning",
						children: reg.estado === "REGISTRADO" ? "Registrado" : "Borrador"
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => descargar("excel"),
						children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Excel"]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => descargar("pdf"),
						children: [/* @__PURE__ */ jsx(FileDown, {}), " PDF"]
					})
				] })
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "sujeto-pasivo",
				projectId,
				codigo: decodedCodigo
			}),
			mensaje && /* @__PURE__ */ jsxs(Aviso, {
				tipo: mensaje.tipo,
				onCerrar: () => setMensaje(null),
				children: [mensaje.texto, mensaje.detalle && /* @__PURE__ */ jsx("ul", {
					className: "mt-1 list-disc pl-5",
					children: mensaje.detalle.map((d) => /* @__PURE__ */ jsx("li", { children: d }, d))
				})]
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
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "registro",
						children: [
							/* @__PURE__ */ jsx(InformacionPredio, {
								projectId,
								codigo: decodedCodigo,
								className: "mb-4"
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "Situación registral del predio",
								className: "mb-4",
								children: /* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Predio inscrito en SUNARP",
										ayuda: reg.predioInscrito ? "Art. 6: el sujeto pasivo es el titular registral." : "Art. 7: aviso en El Peruano y diario nacional; sujeto pasivo quien acredite propiedad con fecha cierta o posesión de más de diez años.",
										children: /* @__PURE__ */ jsx("div", {
											className: "flex gap-4 pt-2 text-sm",
											role: "radiogroup",
											"aria-label": "Predio inscrito en SUNARP",
											children: [true, false].map((v) => /* @__PURE__ */ jsxs("label", {
												className: "flex cursor-pointer items-center gap-2",
												children: [/* @__PURE__ */ jsx("input", {
													type: "radio",
													name: "inscrito",
													checked: reg.predioInscrito === v,
													onChange: () => setCampo("predioInscrito", v),
													className: "accent-primary"
												}), v ? "Sí" : "No"]
											}, String(v)))
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Partida registral matriz",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											inputMode: "numeric",
											className: controlClase,
											value: reg.partidaMatriz,
											onChange: (e) => setCampo("partidaMatriz", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Partida independizada",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											inputMode: "numeric",
											className: controlClase,
											value: reg.partidaIndependizada,
											onChange: (e) => setCampo("partidaIndependizada", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Área del documento de propiedad",
										children: (id) => /* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												id,
												inputMode: "decimal",
												className: controlClase,
												value: reg.areaDocumento,
												onChange: (e) => setCampo("areaDocumento", e.target.value)
											}), /* @__PURE__ */ jsxs("select", {
												"aria-label": "Unidad",
												className: `${controlClase} w-24`,
												value: reg.unidadDocumento,
												onChange: (e) => setCampo("unidadDocumento", e.target.value),
												children: [/* @__PURE__ */ jsx("option", {
													value: "m2",
													children: "m²"
												}), /* @__PURE__ */ jsx("option", {
													value: "ha",
													children: "ha"
												})]
											})]
										})
									})
								] })
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Titulares (sujetos pasivos)",
								className: "mb-4",
								acciones: /* @__PURE__ */ jsxs(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: () => setEditando("nuevo"),
									children: [/* @__PURE__ */ jsx(UserPlus, {}), " Añadir titular"]
								}),
								children: [/* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "n",
											titulo: "N.º",
											ancho: "48px",
											render: (_t, i) => i + 1
										},
										{
											clave: "nombres",
											titulo: "Titular",
											render: (t) => /* @__PURE__ */ jsxs("span", {
												className: "block",
												children: [/* @__PURE__ */ jsx("span", {
													className: "block font-medium text-foreground",
													children: t.nombres || "Sin nombre"
												}), /* @__PURE__ */ jsx("span", {
													className: "block text-xs text-muted-foreground",
													children: TIPO_PERSONA[t.tipoPersona]
												})]
											})
										},
										{
											clave: "numero",
											titulo: "Documento",
											render: (t) => /* @__PURE__ */ jsx("span", {
												className: "whitespace-nowrap tabular-nums",
												children: t.numero ? `${TIPO_DOCUMENTO[t.tipoDocumento]} ${t.numero}` : /* @__PURE__ */ jsx("span", {
													className: "text-muted-foreground",
													children: "Pendiente"
												})
											})
										},
										{
											clave: "condicion",
											titulo: "Condición jurídica",
											render: (t) => /* @__PURE__ */ jsx("span", {
												title: CONDICION[t.condicion].base,
												children: CONDICION[t.condicion].nombre
											})
										},
										{
											clave: "cuota",
											titulo: "Cuota",
											alinear: "derecha",
											render: (t) => t.cuota ? `${t.cuota} %` : reg.titulares.length === 1 ? "100 %" : "Pendiente"
										},
										{
											clave: "dni",
											titulo: "DNI",
											render: (t) => /* @__PURE__ */ jsx(StatusBadge, {
												tono: TONO_DNI[estadoDni(t)],
												children: NOMBRE_ESTADO_DNI[estadoDni(t)]
											})
										},
										{
											clave: "contacto",
											titulo: "Contacto",
											render: (t) => /* @__PURE__ */ jsxs("span", {
												className: "flex flex-wrap gap-2 text-xs text-muted-foreground",
												children: [
													t.correo && /* @__PURE__ */ jsxs("span", {
														className: "flex items-center gap-1",
														title: t.correo,
														children: [/* @__PURE__ */ jsx(Mail, {
															size: 14,
															"aria-hidden": true
														}), " Correo"]
													}),
													t.whatsapp && /* @__PURE__ */ jsxs("span", {
														className: "flex items-center gap-1",
														title: t.celular,
														children: [/* @__PURE__ */ jsx(MessageCircle, {
															size: 14,
															"aria-hidden": true
														}), " WhatsApp"]
													}),
													t.aceptaElectronica && /* @__PURE__ */ jsx("span", { children: "Notif. electrónica" }),
													!t.correo && !t.celular && /* @__PURE__ */ jsx("span", { children: "Sin contacto" })
												]
											})
										},
										{
											clave: "acciones",
											titulo: "Acciones",
											alinear: "derecha",
											render: (t) => /* @__PURE__ */ jsxs("span", {
												className: "inline-flex gap-1",
												children: [/* @__PURE__ */ jsx(BotonIcono, {
													nombre: "Editar titular",
													icono: Pencil,
													onClick: () => setEditando(t)
												}), /* @__PURE__ */ jsx(BotonIcono, {
													nombre: "Eliminar titular",
													icono: Trash2,
													destructiva: true,
													onClick: () => setEliminar({
														tipo: "titular",
														id: t.id,
														nombre: t.nombres
													})
												})]
											})
										}
									],
									filas: reg.titulares,
									claveFila: (t) => t.id,
									vacio: "Sin titulares. Use «Añadir titular»."
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: Math.abs(suma - 100) < .01 ? "text-success" : "text-warning",
											children: [
												"Suma de cuotas: ",
												suma,
												" %"
											]
										}),
										/* @__PURE__ */ jsx("span", {
											className: dniIncompletos ? "text-warning" : "text-success",
											children: dniIncompletos ? `${dniIncompletos} titulares con DNI incompleto` : "DNI completo en todos los titulares"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-muted-foreground",
											children: "Cada titular se guarda al agregarlo, editarlo o eliminarlo, y el cambio queda en el histórico."
										})
									]
								})]
							}),
							comunidades.map((c) => /* @__PURE__ */ jsx(Section, {
								titulo: `Comuneros de ${c.nombres}: expedientes individuales`,
								className: "mb-4",
								children: c.comuneros.length === 0 ? /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Agregue los comuneros desde «Editar titular» de la comunidad."
								}) : /* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "nombres",
											titulo: "Comunero"
										},
										{
											clave: "dni",
											titulo: "DNI"
										},
										{
											clave: "condicion",
											titulo: "Condición",
											render: (x) => x.condicion === "COMUNERO_HABIL" ? "Comunero hábil" : "Posesionario"
										},
										{
											clave: "area",
											titulo: "Área o lote"
										},
										{
											clave: "constancias",
											titulo: "Constancias",
											render: (x) => /* @__PURE__ */ jsxs(StatusBadge, {
												tono: x.constanciaHabil && x.constanciaPosesion ? "success" : "warning",
												children: [[x.constanciaHabil, x.constanciaPosesion].filter(Boolean).length, " de 2"]
											})
										},
										{
											clave: "expediente",
											titulo: "Expediente individual",
											alinear: "derecha",
											render: (x) => /* @__PURE__ */ jsxs(Button, {
												type: "button",
												size: "sm",
												variant: x.expediente ? "outline" : "default",
												onClick: () => abrirExpedienteIndividual(c, x),
												children: [
													/* @__PURE__ */ jsx(FolderOpen, {}),
													" ",
													x.expediente ? x.expediente.slice(-3) : "Abrir expediente individual"
												]
											})
										}
									],
									filas: c.comuneros,
									claveFila: (x) => x.id
								})
							}, c.id)),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Ocupantes (se notifican · art. 6.5 y 7.1)",
								className: "mb-4",
								children: [reg.ocupantes.length > 0 && /* @__PURE__ */ jsx("div", {
									className: "mb-3",
									children: /* @__PURE__ */ jsx(Tabla, {
										columnas: [
											{
												clave: "nombres",
												titulo: "Ocupante"
											},
											{
												clave: "dni",
												titulo: "DNI"
											},
											{
												clave: "relacion",
												titulo: "Relación con el titular"
											},
											{
												clave: "notificadoEl",
												titulo: "Notificado el"
											},
											{
												clave: "acciones",
												titulo: "Acciones",
												alinear: "derecha",
												render: (o) => /* @__PURE__ */ jsx(BotonIcono, {
													nombre: "Eliminar ocupante",
													icono: Trash2,
													destructiva: true,
													onClick: () => setEliminar({
														tipo: "ocupante",
														id: o.id,
														nombre: o.nombres
													})
												})
											}
										],
										filas: reg.ocupantes,
										claveFila: (o) => o.id
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "rounded-md bg-background p-3",
									children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Ocupante",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												placeholder: "Nombres y apellidos",
												className: controlClase,
												value: ocupante.nombres,
												onChange: (e) => setOcupante((o) => ({
													...o,
													nombres: e.target.value
												}))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "DNI",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												inputMode: "numeric",
												className: controlClase,
												value: ocupante.dni,
												onChange: (e) => setOcupante((o) => ({
													...o,
													dni: e.target.value
												}))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Relación con el titular",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												placeholder: "Inquilino, familiar…",
												className: controlClase,
												value: ocupante.relacion,
												onChange: (e) => setOcupante((o) => ({
													...o,
													relacion: e.target.value
												}))
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Notificado el",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: ocupante.notificadoEl,
												onChange: (e) => setOcupante((o) => ({
													...o,
													notificadoEl: e.target.value
												}))
											})
										})
									] }), /* @__PURE__ */ jsx("div", {
										className: "mt-3 flex justify-end",
										children: /* @__PURE__ */ jsxs(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											disabled: !ocupante.nombres.trim(),
											onClick: agregarOcupante,
											children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar ocupante"]
										})
									})]
								})]
							}),
							hayLitigio && /* @__PURE__ */ jsxs(Section, {
								titulo: "Litigio sobre la propiedad (art. 6.4 y 7.3)",
								className: "mb-4",
								children: [/* @__PURE__ */ jsxs(FormGrid, { children: [
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Tipo",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsxs("select", {
											id,
											className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
											value: reg.litigio.tipo,
											onChange: (e) => setCampo("litigio", {
												...reg.litigio,
												tipo: e.target.value
											}),
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "",
													children: "Seleccione"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "JUDICIAL",
													children: "Judicial"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "ARBITRAL",
													children: "Arbitral"
												})
											]
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Número de expediente",
										obligatorio: true,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
											value: reg.litigio.expediente,
											onChange: (e) => setCampo("litigio", {
												...reg.litigio,
												expediente: e.target.value
											})
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Juzgado o tribunal",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
											value: reg.litigio.organo,
											onChange: (e) => setCampo("litigio", {
												...reg.litigio,
												organo: e.target.value
											})
										})
									}),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Partes",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
											value: reg.litigio.partes,
											onChange: (e) => setCampo("litigio", {
												...reg.litigio,
												partes: e.target.value
											})
										})
									})
								] }), /* @__PURE__ */ jsx("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: "Con litigio, el pago de la indemnización se consigna hasta que se resuelva."
								})]
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
									onClick: guardarBorrador,
									disabled: !cargado,
									children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
								}),
								/* @__PURE__ */ jsxs(Button, {
									type: "button",
									onClick: registrar,
									disabled: !cargado,
									children: [/* @__PURE__ */ jsx(Send, {}), " Registrar sujeto pasivo"]
								})
							] })
						]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico del sujeto pasivo",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS,
								nombreArchivo: `historico-sujeto-pasivo-${decodedCodigo}`,
								puedeRestaurar,
								onRestaurar: (r, n) => {
									guardar(r, "Restauró una versión anterior", `versión ${n}`);
									setMensaje({
										tipo: "exito",
										texto: `Se restauró la versión ${n}. Quedó como una versión nueva en el histórico.`
									});
								}
							})
						})
					})
				]
			}),
			editando && /* @__PURE__ */ jsx(TitularDialog, {
				inicial: editando === "nuevo" ? void 0 : editando,
				onCerrar: () => setEditando(null),
				onGuardar: guardarTitular
			}),
			eliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: eliminar.nombre,
				tipo: eliminar.tipo,
				onCerrar: () => setEliminar(null),
				onConfirmar: confirmarEliminacion
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
				onChange: (e) => setMotivo(e.target.value),
				placeholder: "Por ejemplo: no figura en la partida; vendió su cuota"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
//#endregion
export { SujetoPasivoPage as component };
