import { i as predioDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { r as registrarCambio } from "./historial-Bc37nCTn.js";
import { _ as sumaCuotas, a as TIPO_PERSONA, b as correo, g as registroInicialSujetoPasivo, h as leerSujetoPasivo, i as TIPO_DOCUMENTO, m as idSP, n as DOCUMENTOS_SUSTENTO, s as claveSujetoPasivo, t as CONDICION, v as titularVacio, w as ruc, x as dni, y as celular } from "./sujetoPasivo-Cz4oBCnt.js";
import { n as anotarRegistro, p as plural, v as sujetoPasivoDesdeFicha, w as useUltimaPosicion } from "./campo-Dn2b-x9H.js";
import { t as Route$1 } from "./recolector-campo._projectId.caracterizacion._codigo.sujeto-pasivo-VXZ7jmTO.js";
import { a as fotosDe, g as useFotos } from "./fotos-CUnD_Pb7.js";
import { i as TituloCampo } from "./CampoShell-CcCpArhF.js";
import { a as Fotos, c as SiNo, l as Texto, n as Chips, r as ConsultaDni, s as Resumen } from "./Controles-CqdT34l5.js";
import { t as Asistente } from "./Asistente-D-VBBAeR.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Plus, Save, Trash2 } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.sujeto-pasivo.tsx?tsr-split=component
var PANTALLA = "sujeto-pasivo";
var opcionesDe = (r) => Object.entries(r).map(([valor, etiqueta]) => ({
	valor,
	etiqueta
}));
var OPC_CONDICION = Object.entries(CONDICION).map(([valor, c]) => ({
	valor,
	etiqueta: c.nombre
}));
/** Documentos que exige la condición del titular (grupo de DOCUMENTOS_SUSTENTO). */
var GRUPO_POR_CONDICION = {
	TITULAR_REGISTRAL: "Registrales",
	PROPIETARIO_FECHA_CIERTA: "Fecha cierta (art. 4.15)",
	POSEEDOR_10: "Posesión (art. 6.3)",
	SUCESION: "Representación",
	JUNTA: "Representación",
	COMUNIDAD: "Representación",
	LITIGIO: "Registrales",
	FIDUCIARIO: "Representación"
};
var errorDocumento = (tipo, numero) => !numero ? null : tipo === "DNI" ? dni(numero) : tipo === "RUC" ? ruc(numero) : null;
/** Sujeto pasivo levantado en campo: escribe el mismo registro que la pantalla 1.3 del escritorio. */
function SujetoPasivoCampo() {
	const { projectId, codigo } = Route$1.useParams();
	const navigate = useNavigate();
	const gpsEquipo = useUltimaPosicion();
	const gps = gpsEquipo ? {
		lat: gpsEquipo.lat,
		lon: gpsEquipo.lon
	} : void 0;
	const fotos = useFotos();
	const [reg, setReg] = useState(null);
	const [paso, setPaso] = useState(0);
	const [nuevoTitular, setNuevoTitular] = useState(() => titularVacio());
	const [ocupante, setOcupante] = useState({
		nombres: "",
		dni: "",
		relacion: ""
	});
	const [errorLista, setErrorLista] = useState("");
	useEffect(() => {
		const r = leerSujetoPasivo(codigo) ?? sujetoPasivoDesdeFicha(registroInicialSujetoPasivo(predioDelProyecto(codigo)), codigo);
		setReg(r.titulares.length ? r : {
			...r,
			titulares: [titularVacio()]
		});
	}, [codigo]);
	const volver = () => navigate({
		to: "/recolector-campo/$projectId/caracterizacion/$codigo",
		params: {
			projectId,
			codigo
		}
	});
	if (!reg) return null;
	const t = reg.titulares[0];
	const ponT = (cambio, i = 0) => setReg((r) => r ? {
		...r,
		titulares: r.titulares.map((x, k) => k === i ? {
			...x,
			...cambio
		} : x)
	} : r);
	const contexto = (titular, seccion, campo) => ({
		proyecto: projectId,
		predio: codigo,
		pantalla: PANTALLA,
		seccion,
		registro: titular.id,
		campo,
		modulo: 11
	});
	const tieneFoto = (titular, campo) => fotosDe(fotos, {
		predio: codigo,
		pantalla: PANTALLA,
		registro: titular.id,
		campo
	}).length > 0;
	const docsDe = (titular) => DOCUMENTOS_SUSTENTO[GRUPO_POR_CONDICION[titular.condicion]];
	const varios = reg.titulares.length > 1;
	function guardar() {
		const hoy = (/* @__PURE__ */ new Date()).toLocaleDateString("es-PE");
		const nuevo = {
			...reg,
			titulares: reg.titulares.map((x) => {
				const conFoto = (campo) => tieneFoto(x, campo) ? {
					nombre: `${campo} (foto de campo)`,
					fecha: hoy
				} : null;
				const nuevos = docsDe(x).filter((tipo) => tieneFoto(x, tipo) && !x.documentos.some((d) => d.tipo === tipo)).map((tipo) => ({
					id: idSP(),
					tipo,
					numero: "",
					fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					entidad: "",
					archivo: {
						nombre: `${tipo} (foto de campo)`,
						fecha: hoy
					}
				}));
				return {
					...x,
					nombres: x.nombres.trim().toUpperCase(),
					dniAnverso: x.dniAnverso ?? conFoto("DNI anverso"),
					dniReverso: x.dniReverso ?? conFoto("DNI reverso"),
					documentos: [...x.documentos, ...nuevos]
				};
			})
		};
		const antes = leerSujetoPasivo(codigo) ?? registroInicialSujetoPasivo(predioDelProyecto(codigo));
		try {
			localStorage.setItem(claveSujetoPasivo(codigo), JSON.stringify(nuevo));
		} catch {}
		registrarCambio(`sujeto-pasivo-${codigo}`, {
			accion: "Registró el sujeto pasivo desde campo",
			objeto: nuevo.titulares.map((x) => x.nombres).join(", "),
			antes,
			despues: nuevo
		}, {
			modulo: 11,
			entidad: "sujeto_pasivo"
		});
		anotarRegistro({
			projectId,
			tipo: "sujeto-pasivo",
			predio: codigo,
			titulo: `Sujeto pasivo · ${nuevo.titulares[0]?.nombres ?? ""}`,
			detalle: `${plural(nuevo.titulares.length, "titular", "titulares")}, ${plural(nuevo.ocupantes.length, "ocupante", "ocupantes")}`,
			fotos: fotosDe(fotos, {
				predio: codigo,
				pantalla: PANTALLA
			}).length
		});
		volver();
	}
	return /* @__PURE__ */ jsx(Asistente, {
		titulo: "Sujeto pasivo",
		subtitulo: codigo,
		pasos: [
			{
				titulo: "Titular",
				ayuda: varios ? "Titular principal. Los demás se agregan en el paso 3." : void 0,
				validar: () => !t.nombres.trim() ? "Escriba el nombre o la razón social del titular." : errorDocumento(t.tipoDocumento, t.numero),
				contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(Chips, {
						etiqueta: "Tipo de persona",
						opciones: opcionesDe(TIPO_PERSONA),
						valor: t.tipoPersona,
						onChange: (v) => v && ponT({ tipoPersona: v })
					}),
					/* @__PURE__ */ jsx(Chips, {
						etiqueta: "Tipo de documento",
						opciones: opcionesDe(TIPO_DOCUMENTO),
						valor: t.tipoDocumento,
						onChange: (v) => v && ponT({ tipoDocumento: v })
					}),
					t.tipoPersona === "NATURAL" && t.tipoDocumento === "DNI" ? /* @__PURE__ */ jsx(ConsultaDni, {
						valor: t.numero,
						onChange: (v) => ponT({ numero: v }),
						onDatos: ({ consultadoEl, simulado, ...datos }) => ponT({
							...datos,
							reniecConsultadoEl: consultadoEl,
							reniecSimulado: simulado
						})
					}) : /* @__PURE__ */ jsx(Texto, {
						etiqueta: `Número de ${TIPO_DOCUMENTO[t.tipoDocumento]}`,
						inputMode: t.tipoDocumento === "PASAPORTE" ? "text" : "numeric",
						valor: t.numero,
						onChange: (v) => ponT({ numero: v.trim().slice(0, 12) })
					}),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: t.tipoPersona === "NATURAL" ? "Nombres y apellidos" : "Razón social",
						obligatorio: true,
						valor: t.nombres,
						onChange: (v) => ponT({ nombres: v })
					}),
					/* @__PURE__ */ jsx(Chips, {
						etiqueta: "Condición",
						opciones: OPC_CONDICION,
						valor: t.condicion,
						onChange: (v) => v && ponT({ condicion: v }),
						ayuda: CONDICION[t.condicion].exige
					}),
					t.condicion === "TITULAR_REGISTRAL" && /* @__PURE__ */ jsx(Texto, {
						etiqueta: "Partida registral",
						inputMode: "numeric",
						valor: t.partida,
						onChange: (v) => ponT({ partida: v })
					}),
					t.tipoPersona === "NATURAL" && t.tipoDocumento === "DNI" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Fotos, {
						etiqueta: "DNI anverso",
						maximo: 1,
						contexto: contexto(t, "Titulares", "DNI anverso"),
						gps
					}), /* @__PURE__ */ jsx(Fotos, {
						etiqueta: "DNI reverso",
						maximo: 1,
						contexto: contexto(t, "Titulares", "DNI reverso"),
						gps
					})] })
				] })
			},
			{
				titulo: "Contacto",
				ayuda: "Para notificarle y coordinar las visitas.",
				validar: () => t.celular && celular(t.celular) || t.correo && correo(t.correo) || (!t.notificarEnDomicilioReal && !t.domicilioNotificacion.trim() ? "Escriba el domicilio para notificaciones." : null),
				contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Celular",
						tipo: "tel",
						inputMode: "tel",
						valor: t.celular,
						onChange: (v) => ponT({ celular: v.replace(/\D/g, "").slice(0, 9) })
					}),
					/* @__PURE__ */ jsx(SiNo, {
						etiqueta: "¿Usa WhatsApp en ese celular?",
						valor: t.celular ? t.whatsapp : null,
						onChange: (v) => ponT({ whatsapp: v })
					}),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Teléfono fijo",
						tipo: "tel",
						inputMode: "tel",
						valor: t.telefono,
						onChange: (v) => ponT({ telefono: v })
					}),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Correo",
						tipo: "email",
						inputMode: "email",
						valor: t.correo,
						onChange: (v) => ponT({ correo: v.trim() })
					}),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Domicilio real",
						valor: t.domicilio,
						onChange: (v) => ponT({ domicilio: v })
					}),
					/* @__PURE__ */ jsx(SiNo, {
						etiqueta: "¿Se le notifica en el domicilio real?",
						valor: t.notificarEnDomicilioReal,
						onChange: (v) => ponT({ notificarEnDomicilioReal: v })
					}),
					!t.notificarEnDomicilioReal && /* @__PURE__ */ jsx(Texto, {
						etiqueta: "Domicilio para notificaciones",
						obligatorio: true,
						valor: t.domicilioNotificacion,
						onChange: (v) => ponT({ domicilioNotificacion: v })
					})
				] })
			},
			{
				titulo: "Más titulares",
				ayuda: "Copropietarios, herederos o cónyuge. Si no hay, siga al siguiente paso.",
				validar: () => varios && Math.abs(sumaCuotas(reg.titulares) - 100) > .01 ? `Las cuotas suman ${sumaCuotas(reg.titulares)} %; deben sumar 100 %.` : null,
				contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					reg.titulares.map((x, i) => /* @__PURE__ */ jsxs("div", {
						className: "mb-2 rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "text-base font-semibold text-foreground",
									children: [
										x.nombres || "Sin nombre",
										" ",
										i === 0 && "(principal)"
									]
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-sm text-muted-foreground",
									children: [
										TIPO_DOCUMENTO[x.tipoDocumento],
										" ",
										x.numero || "—",
										" ·",
										" ",
										CONDICION[x.condicion].nombre
									]
								})]
							}), i > 0 && /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": `Quitar a ${x.nombres}`,
								onClick: () => setReg({
									...reg,
									titulares: reg.titulares.filter((y) => y.id !== x.id)
								}),
								className: "flex size-11 items-center justify-center rounded-md text-destructive hover:bg-destructive-soft",
								children: /* @__PURE__ */ jsx(Trash2, {
									size: 20,
									"aria-hidden": true
								})
							})]
						}), varios && /* @__PURE__ */ jsx("div", {
							className: "mt-2",
							children: /* @__PURE__ */ jsx(Texto, {
								etiqueta: "Cuota (%)",
								tipo: "number",
								inputMode: "decimal",
								valor: x.cuota,
								onChange: (v) => ponT({ cuota: v }, i)
							})
						})]
					}, x.id)),
					varios && /* @__PURE__ */ jsxs("p", {
						className: "mb-4 text-sm font-medium text-foreground",
						children: [
							"Suma de cuotas: ",
							sumaCuotas(reg.titulares),
							" %"
						]
					}),
					/* @__PURE__ */ jsx(TituloCampo, { children: "Agregar titular" }),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Nombres o razón social",
						valor: nuevoTitular.nombres,
						onChange: (v) => setNuevoTitular({
							...nuevoTitular,
							nombres: v
						})
					}),
					/* @__PURE__ */ jsx(Chips, {
						etiqueta: "Tipo de documento",
						opciones: opcionesDe(TIPO_DOCUMENTO),
						valor: nuevoTitular.tipoDocumento,
						onChange: (v) => v && setNuevoTitular({
							...nuevoTitular,
							tipoDocumento: v
						})
					}),
					nuevoTitular.tipoDocumento === "DNI" ? /* @__PURE__ */ jsx(ConsultaDni, {
						valor: nuevoTitular.numero,
						onChange: (v) => setNuevoTitular({
							...nuevoTitular,
							numero: v
						}),
						onDatos: ({ consultadoEl, simulado, ...datos }) => setNuevoTitular({
							...nuevoTitular,
							...datos,
							reniecConsultadoEl: consultadoEl,
							reniecSimulado: simulado
						})
					}) : /* @__PURE__ */ jsx(Texto, {
						etiqueta: "Número",
						inputMode: "numeric",
						valor: nuevoTitular.numero,
						onChange: (v) => setNuevoTitular({
							...nuevoTitular,
							numero: v.trim()
						})
					}),
					/* @__PURE__ */ jsx(Chips, {
						etiqueta: "Condición",
						opciones: OPC_CONDICION,
						valor: nuevoTitular.condicion,
						onChange: (v) => v && setNuevoTitular({
							...nuevoTitular,
							condicion: v
						})
					}),
					errorLista && paso === 2 && /* @__PURE__ */ jsx("p", {
						role: "alert",
						className: "mb-3 text-sm font-medium text-destructive",
						children: errorLista
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						className: "h-12 w-full text-base",
						onClick: () => {
							const e = !nuevoTitular.nombres.trim() ? "Escriba el nombre del titular." : errorDocumento(nuevoTitular.tipoDocumento, nuevoTitular.numero);
							setErrorLista(e ?? "");
							if (e) return;
							setReg({
								...reg,
								titulares: [...reg.titulares, {
									...nuevoTitular,
									nombres: nuevoTitular.nombres.trim().toUpperCase()
								}]
							});
							setNuevoTitular(titularVacio({ condicion: t.condicion }));
						},
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar titular"]
					})
				] })
			},
			{
				titulo: "Ocupantes",
				ayuda: "Quienes viven o trabajan en el predio sin ser titulares (se les notifica).",
				contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					reg.ocupantes.length === 0 && /* @__PURE__ */ jsx("p", {
						className: "mb-4 text-base text-muted-foreground",
						children: "Sin ocupantes registrados."
					}),
					reg.ocupantes.map((o) => /* @__PURE__ */ jsxs("div", {
						className: "mb-2 flex items-start gap-2 rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-base font-semibold text-foreground",
								children: o.nombres
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"DNI ",
									o.dni || "—",
									" · ",
									o.relacion || "Sin relación indicada"
								]
							})]
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": `Quitar a ${o.nombres}`,
							onClick: () => setReg({
								...reg,
								ocupantes: reg.ocupantes.filter((y) => y.id !== o.id)
							}),
							className: "flex size-11 items-center justify-center rounded-md text-destructive hover:bg-destructive-soft",
							children: /* @__PURE__ */ jsx(Trash2, {
								size: 20,
								"aria-hidden": true
							})
						})]
					}, o.id)),
					/* @__PURE__ */ jsx(TituloCampo, { children: "Agregar ocupante" }),
					/* @__PURE__ */ jsx(ConsultaDni, {
						valor: ocupante.dni,
						onChange: (v) => setOcupante({
							...ocupante,
							dni: v
						}),
						onDatos: (d) => setOcupante({
							...ocupante,
							dni: d.numero,
							nombres: d.nombres
						})
					}),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Nombres y apellidos",
						valor: ocupante.nombres,
						onChange: (v) => setOcupante({
							...ocupante,
							nombres: v
						})
					}),
					/* @__PURE__ */ jsx(Chips, {
						etiqueta: "Relación con el titular",
						opciones: [
							"FAMILIAR",
							"INQUILINO",
							"CUIDADOR",
							"TRABAJADOR",
							"OTRO"
						],
						valor: ocupante.relacion,
						onChange: (v) => setOcupante({
							...ocupante,
							relacion: v
						})
					}),
					errorLista && paso === 3 && /* @__PURE__ */ jsx("p", {
						role: "alert",
						className: "mb-3 text-sm font-medium text-destructive",
						children: errorLista
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						className: "h-12 w-full text-base",
						onClick: () => {
							const e = !ocupante.nombres.trim() ? "Escriba el nombre del ocupante." : ocupante.dni ? dni(ocupante.dni) : null;
							setErrorLista(e ?? "");
							if (e) return;
							setReg({
								...reg,
								ocupantes: [...reg.ocupantes, {
									id: idSP(),
									nombres: ocupante.nombres.trim().toUpperCase(),
									dni: ocupante.dni,
									relacion: ocupante.relacion,
									notificadoEl: ""
								}]
							});
							setOcupante({
								nombres: "",
								dni: "",
								relacion: ""
							});
						},
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar ocupante"]
					})
				] })
			},
			{
				titulo: "Documentos que presenta",
				ayuda: `Fotografíe los documentos que muestra el titular. Por su condición (${CONDICION[t.condicion].nombre}) se piden estos.`,
				contenido: /* @__PURE__ */ jsx(Fragment$1, { children: docsDe(t).map((tipo) => /* @__PURE__ */ jsx(Fotos, {
					etiqueta: tipo,
					maximo: 3,
					contexto: contexto(t, "Documentos de sustento", tipo),
					gps
				}, tipo)) })
			},
			{
				titulo: "Resumen",
				ayuda: "Revise antes de guardar. Se verá en la pantalla Sujeto pasivo del expediente.",
				contenido: /* @__PURE__ */ jsx(Resumen, {
					onEditar: setPaso,
					grupos: [
						{
							titulo: "Titular principal",
							paso: 0,
							filas: [
								["Nombre", t.nombres],
								["Documento", t.numero ? `${TIPO_DOCUMENTO[t.tipoDocumento]} ${t.numero}` : ""],
								["Tipo de persona", TIPO_PERSONA[t.tipoPersona]],
								["Condición", CONDICION[t.condicion].nombre]
							]
						},
						{
							titulo: "Contacto",
							paso: 1,
							filas: [
								["Celular", t.celular ? `${t.celular}${t.whatsapp ? " (WhatsApp)" : ""}` : ""],
								["Correo", t.correo],
								["Domicilio real", t.domicilio],
								["Notificar en", t.notificarEnDomicilioReal ? "Domicilio real" : t.domicilioNotificacion]
							]
						},
						{
							titulo: "Titulares y ocupantes",
							paso: 2,
							filas: [["Titulares", reg.titulares.map((x) => x.nombres).join(", ")], ["Ocupantes", reg.ocupantes.map((x) => x.nombres).join(", ")]]
						},
						{
							titulo: "Documentos",
							paso: 4,
							filas: [["Fotografiados", docsDe(t).filter((tipo) => tieneFoto(t, tipo)).join("; ")]]
						}
					]
				})
			}
		],
		paso,
		onPaso: (n) => {
			setErrorLista("");
			setPaso(n);
		},
		onSalir: volver,
		final: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			onClick: guardar,
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar"]
		})
	});
}
//#endregion
export { SujetoPasivoCampo as component };
