import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, i as estadoPlazo, m as fecha, n as getProyecto, s as registrarHito, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { B as routeByKey, M as rotulosDePaso, s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { i as registrarEnviosPorFecha, r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { Dt as BotonIcono, E as Modal, J as usePerfilPredio, Y as varianteDe, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { n as useAlmacen } from "./almacen-BgvL3X8T.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { n as BotonPanelFotografico, t as CampoFoto } from "./CampoFoto-CSlShmEX.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { n as documentoDelCampo, t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, CheckCircle2, FileText, History, Plus, Save, Trash2, X } from "lucide-react";
//#region src/components/PredioSimpleForm.tsx
/**
* Regla de docs/PLAN-INTERFACES.md §1 (R2 y R3): todo campo grande ocupa el ancho completo y va al final
* de su sección; los cortos conservan el orden declarado entre sí, y los grandes también.
*/
var TIPOS_GRANDES = /* @__PURE__ */ new Set([
	"textarea",
	"file",
	"foto",
	"lista",
	"verificacion"
]);
var esGrande = (f) => Boolean(f.fullWidth) || TIPOS_GRANDES.has(f.type);
/** Archivos y fotos: lo que el sistema recibe; van juntos en «Documentos recibidos» (R7). */
var esRecibido = (f) => f.type === "file" || f.type === "foto";
function ordenarCampos(campos) {
	return [...campos.filter((f) => !esGrande(f)), ...campos.filter(esGrande)];
}
/** Texto visible sin guion corto (U+2013): "Certificación – CCP" pasa a "Certificación · CCP". */
var sinGuion = (texto) => texto.replace(/\s*–\s*/g, " · ");
function leerJson(texto, vacio) {
	try {
		return texto ? JSON.parse(texto) : vacio;
	} catch {
		return vacio;
	}
}
/** Página de predio (patrón 1.3) con secciones de campos declarativas. */
function PredioSimpleForm({ projectId, codigo, title, paso, sections, successMessage, additionalAction, antesDelFormulario, acciones, modulo = 11, validar, alGuardar, transiciones = [], documento }) {
	const navigate = useNavigate();
	const rol = useRol();
	const decodedCodigo = decodeURIComponent(codigo);
	const predio = getPredioByCodigo(decodedCodigo);
	const perfil = usePerfilPredio(projectId, decodedCodigo);
	const hitos = useHitosPredio(decodedCodigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const titulo = sinGuion(title);
	const rotulos = rotulosDePaso(paso, varianteDe(perfil));
	const itemsExpediente = useItems();
	const adjunto = (nombre) => documentoDelCampo(itemsExpediente, decodedCodigo, nombre);
	const claveHistorial = `${paso}-${decodedCodigo}`;
	const [values, setValues, cargado] = useAlmacen(`pdgp-form-${claveHistorial}`, {});
	const [borrador, setBorrador] = useState(null);
	const actuales = borrador ?? values;
	const ctx = {
		values: actuales,
		perfil,
		hitos,
		projectId,
		codigo: decodedCodigo,
		rol
	};
	const secciones = (typeof sections === "function" ? sections(ctx) : sections).filter((s) => !s.visible || s.visible(ctx));
	const campos = secciones.flatMap((s) => s.fields.filter((f) => !f.visible || f.visible(ctx)));
	const conFotos = campos.some((f) => f.type === "foto");
	const recibidos = secciones.flatMap((s) => s.fields.filter((f) => (!f.visible || f.visible(ctx)) && esRecibido(f)).map((field) => ({
		field,
		seccion: s.title
	})));
	const versiones = useHistorial(claveHistorial);
	const etiquetas = useMemo(() => Object.fromEntries(campos.map((field) => [field.key, field.label])), [campos.map((c) => c.key).join("|")]);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const [pendiente, setPendiente] = useState(null);
	const [motivo, setMotivo] = useState("");
	const sucio = borrador !== null;
	function setField(key, value) {
		setBorrador({
			...actuales,
			[key]: value
		});
	}
	/** Publica los hitos de las fechas del formulario (o los borra si se vaciaron). */
	function publicarHitos(nuevo) {
		for (const f of campos) if (f.type === "date" && f.hito) registrarHito(decodedCodigo, f.hito, nuevo[f.key] ?? "", paso, f.label);
	}
	function guardar(nuevo, accion, objeto) {
		setValues(nuevo);
		setBorrador(null);
		publicarHitos(nuevo);
		registrarVersion(claveHistorial, {
			accion,
			objeto,
			registro: nuevo
		}, {
			modulo,
			entidad: paso
		});
	}
	function faltantes() {
		return campos.filter((f) => f.required && ![
			"foto",
			"calculado",
			"verificacion"
		].includes(f.type ?? "")).filter((f) => {
			const v = actuales[f.key] ?? "";
			if (f.type === "file") return !adjunto(f.label) && !v.trim();
			return f.type === "lista" ? leerJson(v, []).length === 0 : !v.trim();
		}).map((f) => f.label);
	}
	const accionDoc = {
		values: actuales,
		decodedCodigo,
		projectLabel,
		predio,
		setMessage
	};
	const opcionesDocumentos = { ...documento && {
		propio: {
			titulo: documento.titulo,
			tipos: documento.tipos,
			subtipos: documento.subtipos,
			tipoInicial: documento.tipoInicial,
			asunto: documento.asunto?.(accionDoc) ?? `${titulo} del predio ${decodedCodigo}`,
			nombreArchivo: (t) => documento.nombreArchivo(accionDoc, t)
		},
		armar: { "*": (numero, t) => documento.armarArchivo(numero, t, accionDoc) },
		destino: documento.destino?.(accionDoc),
		alGenerar: (_, { numero }) => {
			guardar(documento.campoNumero && numero ? {
				...actuales,
				[documento.campoNumero]: numero
			} : actuales, numero ? "Generó documento numerado" : "Generó borrador sin numerar", numero ?? documento.titulo);
			setMessage(numero ? `${numero} generado y registrado. Revise la descarga en Word.` : "Borrador sin numerar generado. Revise la descarga en Word.");
		}
	} };
	function renderPlazo(f) {
		if (!f.hito) return null;
		const e = estadoPlazo(hitos, f.hito);
		if (!e) return /* @__PURE__ */ jsxs("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: [
				"Al guardar esta fecha empieza a correr: ",
				plazo(f.hito).nombre,
				" (",
				plazo(f.hito).tipo === "gestion" ? "plazo de gestión de la DDP" : `art. ${plazo(f.hito).articulo}`,
				")."
			]
		});
		return /* @__PURE__ */ jsxs("p", {
			className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ jsx(PlazoBadge, {
					vence: e.vence,
					etiqueta: e.gestion ? "Plazo de gestión" : `Art. ${e.articulo}`
				}),
				e.nombre,
				": vence el ",
				fecha(e.vence),
				"."
			]
		});
	}
	function renderField(field, id, seccion) {
		const valor = actuales[field.key] ?? "";
		if (documento?.campoNumero === field.key) return /* @__PURE__ */ jsx("input", {
			id,
			className: `${controlClase} bg-muted font-mono`,
			value: valor || "Se asigna al generar el documento",
			readOnly: true
		});
		switch (field.type) {
			case "foto": return /* @__PURE__ */ jsx(CampoFoto, {
				contexto: {
					proyecto: projectId,
					predio: decodedCodigo,
					pantalla: paso,
					seccion,
					registro: "",
					campo: field.label,
					modulo
				},
				maximo: field.maximo
			});
			case "calculado": return /* @__PURE__ */ jsx("input", {
				id,
				className: `${controlClase} bg-muted tabular-nums`,
				value: field.calcular?.(ctx) ?? "",
				readOnly: true,
				"aria-readonly": "true"
			});
			case "verificacion": {
				const marcados = leerJson(valor, {});
				return /* @__PURE__ */ jsx("ul", {
					id,
					className: "space-y-1.5 pt-1 text-sm",
					children: (field.items ?? []).map((it) => {
						const auto = it.completo?.(ctx);
						const hecho = auto ?? Boolean(marcados[it.clave]);
						return /* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								className: "mt-0.5 size-4 accent-primary",
								checked: hecho,
								disabled: auto !== void 0,
								"aria-label": it.texto,
								onChange: (e) => setField(field.key, JSON.stringify({
									...marcados,
									[it.clave]: e.target.checked
								}))
							}), /* @__PURE__ */ jsxs("span", {
								className: hecho ? "text-foreground" : "text-muted-foreground",
								children: [it.texto, auto !== void 0 && /* @__PURE__ */ jsx("span", {
									className: "ml-1 text-xs text-muted-foreground",
									children: "(se lee de su pantalla)"
								})]
							})]
						}, it.clave);
					})
				});
			}
			case "lista": return /* @__PURE__ */ jsx(CampoLista, {
				id,
				columnas: field.columnas ?? [],
				filas: leerJson(valor, []),
				onCambio: (filas) => setField(field.key, JSON.stringify(filas))
			});
			case "textarea": return /* @__PURE__ */ jsx("textarea", {
				id,
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: valor,
				placeholder: field.placeholder,
				onChange: (event) => setField(field.key, event.target.value)
			});
			case "select": return /* @__PURE__ */ jsxs("select", {
				id,
				className: controlClase,
				value: valor,
				onChange: (event) => setField(field.key, event.target.value),
				children: [/* @__PURE__ */ jsx("option", {
					value: "",
					children: "Seleccione"
				}), field.options?.map((option) => /* @__PURE__ */ jsx("option", {
					value: option,
					children: option
				}, option))]
			});
			case "file": return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(CampoDocumento, {
				projectId,
				codigo: decodedCodigo,
				nombre: field.label,
				accept: field.accept,
				firmado: true,
				onSubido: (item) => setField(field.key, item.archivo?.nombre ?? item.folio)
			}) });
			default: return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
				id,
				type: field.type === "date" ? "date" : field.type === "number" ? "number" : "text",
				inputMode: field.type === "number" ? "decimal" : void 0,
				step: field.type === "number" ? "any" : void 0,
				className: controlClase,
				value: valor,
				placeholder: field.placeholder,
				onChange: (event) => setField(field.key, event.target.value)
			}), field.type === "date" && renderPlazo(field)] });
		}
	}
	const visibles = transiciones.filter((t) => !t.visible || t.visible(ctx));
	function ejecutarTransicion(t, m) {
		t.ejecutar(ctx, m);
		setPendiente(null);
		setMotivo("");
		setMessage(`${t.texto}: listo.`);
		if (t.destino) {
			const ruta = routeByKey[t.destino];
			if (ruta) navigate({
				to: ruta,
				params: {
					projectId,
					codigo: decodedCodigo
				}
			});
		}
	}
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
				titulo,
				icono: FileText,
				documentos: opcionesDocumentos,
				descripcion: sinGuion(rotulos?.menu ?? ""),
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					rotulos && /* @__PURE__ */ jsx(StatusBadge, {
						tono: "primary",
						children: rotulos.insignia
					}),
					conFotos && /* @__PURE__ */ jsx(BotonPanelFotografico, {
						proyecto: projectId,
						predio: decodedCodigo,
						pantalla: paso,
						titulo: `Panel fotográfico · ${titulo}`
					}),
					acciones
				] })
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: paso,
				projectId,
				codigo: decodedCodigo
			}),
			typeof antesDelFormulario === "function" ? antesDelFormulario(ctx) : antesDelFormulario,
			message && /* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mb-4 flex items-start gap-2 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: message
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMessage(null),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
			}),
			error && /* @__PURE__ */ jsxs("p", {
				role: "alert",
				className: "mb-4 flex items-start gap-2 rounded-md border border-destructive bg-destructive-soft px-3 py-2 text-sm text-destructive",
				children: [
					/* @__PURE__ */ jsx(AlertTriangle, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: error
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setError(null),
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
							onSubmit: (event) => {
								event.preventDefault();
								const falta = faltantes();
								const extra = validar?.(ctx) ?? null;
								if (falta.length || extra) {
									setError([falta.length ? `Complete: ${falta.join(", ")}.` : "", extra ?? ""].filter(Boolean).join(" "));
									return;
								}
								setError(null);
								registrarEnviosPorFecha(values, actuales, campos.filter((f) => f.envio).map((f) => ({
									campo: f.key,
									...f.envio
								}))).forEach((e) => registrarEnvio({
									...e,
									proyecto: projectId,
									predio: decodedCodigo,
									paso
								}, {
									modulo,
									entidad: paso.replaceAll("-", "_")
								}));
								guardar(actuales, versiones.length ? "Modificó el registro" : "Creó el registro", titulo);
								alGuardar?.({
									...ctx,
									values: actuales
								});
								setMessage(successMessage ?? `${titulo}: registro guardado.`);
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo
								}),
								secciones.map((section) => {
									const visiblesSeccion = ordenarCampos(section.fields.filter((f) => (!f.visible || f.visible(ctx)) && !esRecibido(f)));
									if (visiblesSeccion.length === 0) return null;
									return /* @__PURE__ */ jsx(Section, {
										titulo: section.title,
										className: "mt-4",
										children: /* @__PURE__ */ jsx(FormGrid, {
											columnas: section.columnas,
											children: visiblesSeccion.map((field) => /* @__PURE__ */ jsx(FormField, {
												etiqueta: field.label,
												obligatorio: field.required,
												ayuda: field.ayuda,
												ancho: esGrande(field) ? "doble" : "completo",
												children: (id) => renderField(field, id, section.title)
											}, field.key))
										})
									}, section.title);
								}),
								campos.some((f) => f.envio) && /* @__PURE__ */ jsxs(Section, {
									titulo: "Envíos y notificaciones",
									className: "mt-4",
									children: [/* @__PURE__ */ jsx("p", {
										className: "mb-3 text-sm text-muted-foreground",
										children: "Cada fecha de notificación, publicación o remisión que se guarda queda aquí; el resultado se actualiza en la fila cuando responde el destinatario."
									}), /* @__PURE__ */ jsx(HistorialEnvios, {
										proyecto: projectId,
										predio: decodedCodigo,
										paso,
										editable: true
									})]
								}),
								recibidos.length > 0 && /* @__PURE__ */ jsx(Section, {
									titulo: "Documentos recibidos",
									className: "mt-4",
									children: /* @__PURE__ */ jsx(FormGrid, {
										columnas: 1,
										children: recibidos.map(({ field, seccion }) => /* @__PURE__ */ jsx(FormField, {
											etiqueta: field.label,
											obligatorio: field.required,
											ayuda: field.ayuda,
											ancho: "doble",
											children: (id) => renderField(field, id, seccion)
										}, field.key))
									})
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: () => navigate({
											to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
											params: {
												projectId,
												codigo: decodedCodigo
											}
										}),
										children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
									}),
									additionalAction && /* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: () => additionalAction.onClick({
											values: actuales,
											decodedCodigo,
											projectLabel,
											predio,
											setMessage
										}),
										children: [additionalAction.icon, additionalAction.label]
									}),
									visibles.map((t) => {
										const bloqueo = t.permitido?.(ctx) ?? (versiones.length === 0 || sucio ? "Guarde el registro antes de continuar." : null);
										return /* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: t.destructiva ? "destructive" : "outline",
											disabled: Boolean(bloqueo),
											title: bloqueo ?? void 0,
											onClick: () => t.exigeMotivo || t.confirmacion ? setPendiente(t) : ejecutarTransicion(t, ""),
											children: [t.icono, t.texto]
										}, t.texto);
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "submit",
										disabled: !cargado,
										children: [/* @__PURE__ */ jsx(Save, {}), " Guardar registro"]
									})
								] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: `Histórico · ${titulo}`,
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									guardar(r, "Restauró una versión anterior", `versión ${n}`);
									setMessage(`Se restauró la versión ${n}. Quedó como una versión nueva.`);
								}
							})
						})
					})
				]
			}),
			/* @__PURE__ */ jsx(Modal, {
				abierto: pendiente !== null,
				onCerrar: () => setPendiente(null),
				ancho: "sm",
				titulo: pendiente?.texto ?? "",
				descripcion: pendiente?.confirmacion,
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setPendiente(null),
					children: "Cancelar"
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: pendiente?.destructiva ? "destructive" : "default",
					disabled: Boolean(pendiente?.exigeMotivo) && motivo.trim().length < 5,
					onClick: () => pendiente && ejecutarTransicion(pendiente, motivo.trim()),
					children: "Confirmar"
				})] }),
				children: pendiente?.exigeMotivo ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: "motivo-transicion",
					className: "mb-1 block text-sm font-medium",
					children: ["Motivo ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("textarea", {
					id: "motivo-transicion",
					rows: 3,
					className: `${controlClase} h-auto py-2`,
					value: motivo,
					onChange: (e) => setMotivo(e.target.value),
					placeholder: "Queda en el histórico del predio"
				})] }) : /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "El cambio queda en el histórico del predio."
				})
			})
		]
	});
}
/** Tabla de filas dentro de un formulario: alta en línea y baja con motivo (el motivo queda en la fila). */
function CampoLista({ id, columnas, filas, onCambio }) {
	const vacia = () => Object.fromEntries(columnas.map((c) => [c.clave, ""]));
	const [nueva, setNueva] = useState(vacia);
	const [quitar, setQuitar] = useState(null);
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs("div", {
		id,
		children: [
			filas.filter((f) => !f._bajaMotivo).length > 0 && /* @__PURE__ */ jsx("div", {
				className: "mb-2",
				children: /* @__PURE__ */ jsx(Tabla, {
					columnas: [...columnas.map((c) => ({
						clave: c.clave,
						titulo: c.titulo,
						render: (f) => c.tipo === "date" && f.datos[c.clave] ? fecha(f.datos[c.clave]) : f.datos[c.clave] || "Sin dato"
					})), {
						clave: "acciones",
						titulo: "Acciones",
						alinear: "derecha",
						render: (f) => /* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Quitar fila",
							icono: Trash2,
							destructiva: true,
							onClick: () => setQuitar(f.i)
						})
					}],
					filas: filas.flatMap((f, i) => f._bajaMotivo ? [] : [{
						datos: f,
						i
					}]),
					claveFila: (f) => f.i
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-md border border-dashed border-border p-3",
				children: [/* @__PURE__ */ jsx(FormGrid, { children: columnas.map((c) => /* @__PURE__ */ jsx(FormField, {
					etiqueta: c.titulo,
					children: (idCampo) => c.tipo === "select" ? /* @__PURE__ */ jsxs("select", {
						id: idCampo,
						className: controlClase,
						value: nueva[c.clave] ?? "",
						onChange: (e) => setNueva((n) => ({
							...n,
							[c.clave]: e.target.value
						})),
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}), c.opciones?.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))]
					}) : /* @__PURE__ */ jsx("input", {
						id: idCampo,
						type: c.tipo === "date" ? "date" : c.tipo === "number" ? "number" : "text",
						className: controlClase,
						value: nueva[c.clave] ?? "",
						onChange: (e) => setNueva((n) => ({
							...n,
							[c.clave]: e.target.value
						}))
					})
				}, c.clave)) }), /* @__PURE__ */ jsx("div", {
					className: "mt-3 flex justify-end",
					children: /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: !Object.values(nueva).some((v) => v.trim()),
						onClick: () => {
							onCambio([...filas, nueva]);
							setNueva(vacia());
						},
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar fila"]
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Modal, {
				abierto: quitar !== null,
				onCerrar: () => setQuitar(null),
				ancho: "sm",
				titulo: "Quitar fila",
				descripcion: "La fila sale de la lista; el histórico conserva sus datos y el motivo.",
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
						if (quitar !== null) onCambio(filas.map((f, i) => i === quitar ? {
							...f,
							_bajaMotivo: motivo.trim()
						} : f));
						setQuitar(null);
						setMotivo("");
					},
					children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar"]
				})] }),
				children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: "motivo-quitar-fila",
					className: "mb-1 block text-sm font-medium",
					children: ["Motivo ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("textarea", {
					id: "motivo-quitar-fila",
					rows: 3,
					className: `${controlClase} h-auto py-2`,
					value: motivo,
					onChange: (e) => setMotivo(e.target.value)
				})]
			})
		]
	});
}
//#endregion
export { esGrande as n, ordenarCampos as r, PredioSimpleForm as t };
