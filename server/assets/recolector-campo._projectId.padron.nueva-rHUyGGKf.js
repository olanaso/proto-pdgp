import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { S as registrarPredio } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { jt as useUsuarioSesion, w as ruc, x as dni, y as celular } from "./sujetoPasivo-Cz4oBCnt.js";
import { _ as siguienteNumeroFicha, b as useBorrador, d as gruposFichaPadron, n as anotarRegistro, o as emitirActaCampo, s as enviarRegistros, u as fichaPadronVacia } from "./campo-Dn2b-x9H.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./recolector-campo._projectId.padron.nueva-DU5x7D0N.js";
import { a as fotosDe, c as leerFotos, f as reasignarFotos, g as useFotos } from "./fotos-CUnD_Pb7.js";
import { a as Fotos, c as SiNo, i as Firma, l as Texto, n as Chips, o as Gps, r as ConsultaDni, s as Resumen, t as AreaTexto } from "./Controles-CqdT34l5.js";
import { t as Asistente } from "./Asistente-D-VBBAeR.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Save, Send } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.padron.nueva.tsx?tsr-split=component
var PANTALLA = "padron-campo";
/**
* Ficha de padrón: la primera visita a un predio, en seis pasos. Al guardar el predio entra al proyecto
* (código provisional PAD-…), las fotos pasan a ese código y se numera el acta de padrón.
*/
function NuevaFichaPadron() {
	const { projectId } = Route$1.useParams();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const usuario = useUsuarioSesion();
	const [d, setD, limpiar] = useBorrador(`campo-padron-${projectId}`, {
		...fichaPadronVacia(""),
		ref: `fp-${Date.now().toString(36)}`
	});
	const [paso, setPaso] = useState(0);
	const [guardando, setGuardando] = useState(false);
	const [error, setError] = useState("");
	const todas = useFotos();
	const numero = d.numero || siguienteNumeroFicha(projectId);
	const pon = (k, v) => setD((x) => ({
		...x,
		[k]: v
	}));
	const contexto = (campo) => ({
		proyecto: projectId,
		predio: `FICHA-${d.ref}`,
		pantalla: PANTALLA,
		seccion: "Ficha de padrón",
		registro: d.ref,
		campo,
		modulo: 30
	});
	const gps = d.lat && d.lon && Number.isFinite(Number(d.lat)) && Number.isFinite(Number(d.lon)) ? {
		lat: Number(d.lat),
		lon: Number(d.lon)
	} : void 0;
	const fotosDel = (campo) => fotosDe(todas, {
		pantalla: PANTALLA,
		registro: d.ref,
		campo
	}).length;
	const sinSujeto = d.condicionPredio === "SIN SUJETO PASIVO";
	const salir = () => navigate({
		to: "/recolector-campo/$projectId/padron",
		params: { projectId }
	});
	async function guardar(enviar) {
		setGuardando(true);
		setError("");
		try {
			const ficha = {
				...d,
				numero
			};
			const predio = registrarPredio(projectId, {
				codigoPadron: numero,
				origen: "PADRON",
				condicionPredio: d.condicionPredio,
				tipoPredio: d.tipoPredio,
				sujetoPasivo: sinSujeto ? "" : d.sujetoPasivo.trim().toUpperCase(),
				tipoPersona: d.tipoPersona,
				condicionSujeto: d.condicionSujeto,
				areaM2: d.areaM2,
				lat: d.lat,
				lon: d.lon,
				ubicacion: [
					d.distrito,
					d.sector,
					d.referencia
				].filter(Boolean).join(" · "),
				observaciones: [
					d.uso && `Uso: ${d.uso}`,
					d.numeroDocumento && `${d.tipoDocumento} ${d.numeroDocumento}`,
					d.telefono && `Tel. ${d.telefono}`,
					d.hayOcupante && `Ocupante: ${d.ocupante}${d.dniOcupante ? ` (DNI ${d.dniOcupante})` : ""}`,
					[
						d.norte && `N: ${d.norte}`,
						d.sur && `S: ${d.sur}`,
						d.este && `E: ${d.este}`,
						d.oeste && `O: ${d.oeste}`
					].filter(Boolean).join(", "),
					d.observaciones,
					`Ficha de campo ${numero}`
				].filter(Boolean).join(" · ")
			});
			reasignarFotos(d.ref, predio.codigo);
			const { numero: acta } = await emitirActaCampo({
				projectId,
				predio: predio.codigo,
				subtipoId: "ac-padron",
				titulo: "Acta de registro de padrón",
				paso: PANTALLA,
				ruta: `/recolector-campo/${projectId}/padron`,
				usuario,
				grupos: [{
					titulo: "Ficha",
					filas: [["Número de ficha", numero], ["Código provisional", predio.codigo]]
				}, ...gruposFichaPadron(ficha)]
			});
			const fotos = leerFotos().filter((f) => f.registro === d.ref).length;
			const r = anotarRegistro({
				projectId,
				tipo: "padron",
				predio: predio.codigo,
				titulo: `${numero} · ${sinSujeto ? "Sin sujeto pasivo" : d.sujetoPasivo.trim().toUpperCase()}`,
				detalle: [d.distrito, d.sector].filter(Boolean).join(" · "),
				fotos,
				acta,
				ficha
			});
			if (enviar) enviarRegistros([r.id]);
			limpiar();
			navigate({
				to: "/recolector-campo/$projectId/padron/$ficha",
				params: {
					projectId,
					ficha: r.id
				},
				search: { nuevo: true }
			});
		} catch (e) {
			setError(e.message);
			setGuardando(false);
		}
	}
	const pasos = [
		{
			titulo: "Ubicación",
			ayuda: "Párese en el predio y tome la posición.",
			validar: () => {
				const lat = Number(d.lat);
				const lon = Number(d.lon);
				if (!d.lat || !d.lon) return "Tome la posición o escriba latitud y longitud.";
				if (!Number.isFinite(lat) || lat < -90 || lat > 90) return "La latitud no es válida.";
				if (!Number.isFinite(lon) || lon < -180 || lon > 180) return "La longitud no es válida.";
				return null;
			},
			contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx(Gps, {
					obligatorio: true,
					lat: d.lat,
					lon: d.lon,
					precision: d.precision,
					onChange: (p) => setD((x) => ({
						...x,
						...p
					}))
				}),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Distrito",
					valor: d.distrito,
					onChange: (v) => pon("distrito", v)
				}),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Sector o localidad",
					valor: d.sector,
					onChange: (v) => pon("sector", v),
					placeholder: "Ej. Anexo Huaripampa"
				}),
				/* @__PURE__ */ jsx(AreaTexto, {
					etiqueta: "Referencia",
					valor: d.referencia,
					onChange: (v) => pon("referencia", v),
					placeholder: "Ej. A 200 m del puente, margen derecha"
				})
			] })
		},
		{
			titulo: "El predio",
			validar: () => !d.condicionPredio ? "Indique la condición del predio." : !d.tipoPredio ? "Indique si el predio es rural o urbano." : d.areaM2 && !(Number(d.areaM2) > 0) ? "El área debe ser un número mayor que cero." : null,
			contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx(Chips, {
					etiqueta: "Condición del predio",
					obligatorio: true,
					opciones: [
						"PRIVADO",
						"ESTATAL",
						"COMUNAL",
						"SIN SUJETO PASIVO"
					],
					valor: d.condicionPredio,
					onChange: (v) => pon("condicionPredio", v)
				}),
				/* @__PURE__ */ jsx(Chips, {
					etiqueta: "Tipo de predio",
					obligatorio: true,
					opciones: ["RURAL", "URBANO"],
					valor: d.tipoPredio,
					onChange: (v) => pon("tipoPredio", v)
				}),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Área estimada (m²)",
					tipo: "number",
					inputMode: "decimal",
					valor: d.areaM2,
					onChange: (v) => pon("areaM2", v)
				}),
				/* @__PURE__ */ jsx(Chips, {
					etiqueta: "Uso actual",
					opciones: [
						"VIVIENDA",
						"CULTIVO",
						"COMERCIO",
						"SIN USO",
						"OTRO"
					],
					valor: d.uso,
					onChange: (v) => pon("uso", v)
				})
			] })
		},
		{
			titulo: "Sujeto pasivo",
			ayuda: sinSujeto ? "El predio se marcó sin sujeto pasivo: puede seguir sin estos datos." : "Quien figura o se presenta como propietario o poseedor.",
			validar: () => {
				if (sinSujeto) return null;
				if (!d.sujetoPasivo.trim()) return "Escriba el nombre o la razón social del sujeto pasivo.";
				if (d.numeroDocumento) {
					const e = d.tipoDocumento === "DNI" ? dni(d.numeroDocumento) : d.tipoDocumento === "RUC" ? ruc(d.numeroDocumento) : null;
					if (e) return e;
				}
				if (d.telefono && celular(d.telefono)) return celular(d.telefono);
				return null;
			},
			contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx(Chips, {
					etiqueta: "Tipo de persona",
					opciones: [
						"NATURAL",
						"JURIDICA",
						"COMUNIDAD",
						"ESTADO"
					],
					valor: d.tipoPersona,
					onChange: (v) => pon("tipoPersona", v)
				}),
				/* @__PURE__ */ jsx(Chips, {
					etiqueta: "Tipo de documento",
					opciones: [
						"DNI",
						"RUC",
						"CE"
					],
					valor: d.tipoDocumento,
					onChange: (v) => pon("tipoDocumento", v || "DNI")
				}),
				d.tipoDocumento === "DNI" ? /* @__PURE__ */ jsx(ConsultaDni, {
					valor: d.numeroDocumento,
					onChange: (v) => pon("numeroDocumento", v),
					onDatos: (r) => setD((x) => ({
						...x,
						numeroDocumento: r.numero,
						sujetoPasivo: r.nombres
					}))
				}) : /* @__PURE__ */ jsx(Texto, {
					etiqueta: "Número de documento",
					inputMode: "numeric",
					valor: d.numeroDocumento,
					onChange: (v) => pon("numeroDocumento", v.replace(/\D/g, "").slice(0, 11))
				}),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Nombre o razón social",
					obligatorio: !sinSujeto,
					valor: d.sujetoPasivo,
					onChange: (v) => pon("sujetoPasivo", v)
				}),
				/* @__PURE__ */ jsx(Chips, {
					etiqueta: "Condición",
					opciones: [
						"PROPIETARIO",
						"POSEEDOR",
						"OCUPANTE",
						"DESCONOCIDO"
					],
					valor: d.condicionSujeto,
					onChange: (v) => pon("condicionSujeto", v)
				}),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Celular",
					tipo: "tel",
					inputMode: "tel",
					valor: d.telefono,
					onChange: (v) => pon("telefono", v.replace(/\D/g, "").slice(0, 9))
				})
			] })
		},
		{
			titulo: "Ocupación y linderos",
			validar: () => d.hayOcupante === null ? "Indique si hay un ocupante distinto del titular." : d.hayOcupante && !d.ocupante.trim() ? "Escriba el nombre del ocupante." : d.hayOcupante && d.dniOcupante && dni(d.dniOcupante) ? dni(d.dniOcupante) : null,
			contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx(SiNo, {
					etiqueta: "¿Hay un ocupante distinto del titular?",
					obligatorio: true,
					valor: d.hayOcupante,
					onChange: (v) => pon("hayOcupante", v)
				}),
				d.hayOcupante && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(ConsultaDni, {
					etiqueta: "DNI del ocupante",
					valor: d.dniOcupante,
					onChange: (v) => pon("dniOcupante", v),
					onDatos: (r) => setD((x) => ({
						...x,
						dniOcupante: r.numero,
						ocupante: r.nombres
					}))
				}), /* @__PURE__ */ jsx(Texto, {
					etiqueta: "Nombre del ocupante",
					obligatorio: true,
					valor: d.ocupante,
					onChange: (v) => pon("ocupante", v)
				})] }),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Colinda por el norte con",
					valor: d.norte,
					onChange: (v) => pon("norte", v)
				}),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Colinda por el sur con",
					valor: d.sur,
					onChange: (v) => pon("sur", v)
				}),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Colinda por el este con",
					valor: d.este,
					onChange: (v) => pon("este", v)
				}),
				/* @__PURE__ */ jsx(Texto, {
					etiqueta: "Colinda por el oeste con",
					valor: d.oeste,
					onChange: (v) => pon("oeste", v)
				}),
				/* @__PURE__ */ jsx(AreaTexto, {
					etiqueta: "Observaciones",
					valor: d.observaciones,
					onChange: (v) => pon("observaciones", v),
					sugerencias: [
						"Predio cercado",
						"Sin ocupante al momento",
						"Linderos no visibles"
					]
				})
			] })
		},
		{
			titulo: "Fotos y firma del acta",
			validar: () => fotosDel("Fotos del predio") < 1 ? "Tome al menos una foto del predio." : d.seNegoFirmar === null ? "Indique si el titular u ocupante firmó o se negó." : !d.seNegoFirmar && fotosDel("Firma del titular u ocupante") < 1 ? "Recoja la firma y pulse «Guardar firma»." : d.seNegoFirmar && !d.motivoNegativa.trim() ? "Anote el motivo por el que no firmó." : null,
			contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx(Fotos, {
					etiqueta: "Fotos del predio",
					minimo: 1,
					contexto: contexto("Fotos del predio"),
					gps
				}),
				/* @__PURE__ */ jsx(Fotos, {
					etiqueta: "Foto del frente",
					maximo: 1,
					contexto: contexto("Foto del frente"),
					gps
				}),
				/* @__PURE__ */ jsx(SiNo, {
					etiqueta: "¿Se negó a firmar?",
					obligatorio: true,
					valor: d.seNegoFirmar,
					onChange: (v) => pon("seNegoFirmar", v)
				}),
				d.seNegoFirmar === false && /* @__PURE__ */ jsx(Firma, {
					etiqueta: "Firma del titular u ocupante",
					contexto: contexto("Firma del titular u ocupante"),
					gps
				}),
				d.seNegoFirmar && /* @__PURE__ */ jsx(AreaTexto, {
					etiqueta: "Motivo",
					valor: d.motivoNegativa,
					onChange: (v) => pon("motivoNegativa", v),
					sugerencias: [
						"No se encontraba el titular",
						"Se negó a firmar",
						"Pidió consultar a su abogado"
					]
				})
			] })
		},
		{
			titulo: "Resumen",
			ayuda: "Revise antes de guardar. Al guardar se numera el acta de padrón.",
			contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				error && /* @__PURE__ */ jsx(Aviso, {
					tipo: "error",
					children: error
				}),
				/* @__PURE__ */ jsx(Resumen, {
					grupos: [{
						titulo: "Ficha",
						filas: [["Número", numero], ["Fotos", String(fotosDe(todas, {
							pantalla: PANTALLA,
							registro: d.ref
						}).length)]]
					}, ...gruposFichaPadron({
						...d,
						numero
					})],
					onEditar: setPaso
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					className: "mt-4 h-12 w-full text-base",
					disabled: guardando,
					onClick: () => void guardar(false),
					children: [/* @__PURE__ */ jsx(Save, {}), " Guardar sin enviar"]
				})
			] })
		}
	];
	return /* @__PURE__ */ jsx(Asistente, {
		titulo: `Ficha de padrón ${numero}`,
		subtitulo: proyecto?.nombre,
		pasos,
		paso,
		onPaso: setPaso,
		onSalir: salir,
		final: /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			disabled: guardando,
			onClick: () => void guardar(true),
			children: [
				/* @__PURE__ */ jsx(Send, {}),
				" ",
				guardando ? "Guardando…" : "Guardar y enviar"
			]
		}) })
	});
}
//#endregion
export { NuevaFichaPadron as component };
