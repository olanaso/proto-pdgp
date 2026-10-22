import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { i as predioDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { K as leerItems, U as itemActual, et as registrarSubida, h as leerSujetoPasivo, jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { r as registrarComunicacionCampo, t as MEDIOS } from "./comunicacionAfectacion-DI8RFukP.js";
import { b as useBorrador, n as anotarRegistro, w as useUltimaPosicion } from "./campo-Dn2b-x9H.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./recolector-campo._projectId.caracterizacion._codigo.notificacion-CwMr3kqB.js";
import { a as fotosDe, c as leerFotos, g as useFotos, l as leerOriginal } from "./fotos-CUnD_Pb7.js";
import { a as Fotos, c as SiNo, i as Firma, l as Texto, n as Chips, s as Resumen, t as AreaTexto } from "./Controles-CqdT34l5.js";
import { t as Asistente } from "./Asistente-D-VBBAeR.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.notificacion.tsx?tsr-split=component
var PANTALLA = "comunicacion-afectacion";
var ACEPTACION = [
	{
		valor: "ACEPTA",
		etiqueta: "Acepta"
	},
	{
		valor: "DENIEGA",
		etiqueta: "Deniega"
	},
	{
		valor: "SIN RESPUESTA",
		etiqueta: "Sin respuesta"
	},
	{
		valor: "PENDIENTE",
		etiqueta: "Pendiente"
	}
];
var hoy = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
/**
* Notificación y cargo en campo: la entrega de la comunicación de afectación, su resultado y el cargo
* firmado. Escribe la comunicación en el registro de la pantalla de escritorio y el cargo en el expediente.
*/
function NotificacionCampo() {
	const { projectId, codigo } = Route$1.useParams();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const usuario = useUsuarioSesion();
	const fotos = useFotos();
	const gpsEquipo = useUltimaPosicion();
	const gps = gpsEquipo ? {
		lat: gpsEquipo.lat,
		lon: gpsEquipo.lon
	} : void 0;
	const [paso, setPaso] = useState(0);
	const [error, setError] = useState("");
	const [guardando, setGuardando] = useState(false);
	const [destinatarios, setDestinatarios] = useState([]);
	const [d, setD, limpiar] = useBorrador(`campo-notificacion-${codigo}`, {
		ref: `com-campo-${Date.now().toString(36)}`,
		fecha: hoy(),
		medio: "Entrega física",
		destinatario: "",
		realizadoPor: "",
		efectiva: null,
		aceptacion: "",
		fechaRespuesta: hoy(),
		observacion: "",
		seNego: null,
		motivoNegativa: ""
	});
	const pon = (k, v) => setD((x) => ({
		...x,
		[k]: v
	}));
	const nombreUsuario = usuario?.nombre ?? "";
	useEffect(() => {
		const sp = leerSujetoPasivo(codigo);
		const nombres = [...sp?.titulares.map((t) => t.nombres) ?? predioDelProyecto(codigo)?.sujetos ?? [], ...sp?.ocupantes.map((o) => o.nombres) ?? []].filter(Boolean);
		setDestinatarios([...new Set(nombres)].slice(0, 5));
	}, [codigo]);
	const contexto = (seccion, campo) => ({
		proyecto: projectId,
		predio: codigo,
		pantalla: PANTALLA,
		seccion,
		registro: d.ref,
		campo,
		modulo: 15
	});
	const nFotos = (campo) => fotosDe(fotos, {
		predio: codigo,
		pantalla: PANTALLA,
		registro: d.ref,
		campo
	}).length;
	const volver = () => navigate({
		to: "/recolector-campo/$projectId/caracterizacion/$codigo",
		params: {
			projectId,
			codigo
		}
	});
	async function guardar() {
		setGuardando(true);
		setError("");
		try {
			const responsable = proyecto?.coordinadorPredial ?? "Coordinador predial";
			const oficio = itemActual(leerItems(), codigo, "ca-oficio");
			const observacion = [d.observacion, d.seNego ? `Se negó a recibir: ${d.motivoNegativa}` : ""].filter(Boolean).join(" · ");
			const n = registrarComunicacionCampo(codigo, responsable, {
				fecha: d.fecha,
				medio: d.medio || "Entrega física",
				destinatario: d.destinatario.trim() || predioDelProyecto(codigo)?.sujeto || "Sujeto pasivo",
				documento: oficio?.numero ?? "Comunicación de afectación (entrega en campo)",
				realizadoPor: d.realizadoPor.trim() || nombreUsuario || "Brigada de campo",
				observacion,
				registradoPor: nombreUsuario || "Recolector de campo"
			}, {
				comunicacionEfectiva: d.efectiva == null ? "PENDIENTE" : d.efectiva ? "SI" : "NO",
				aceptacion: d.aceptacion || "PENDIENTE",
				fechaRespuesta: d.fechaRespuesta,
				observacion
			});
			const cargo = leerFotos().find((f) => f.registro === d.ref && f.campo === "Cargo firmado");
			const blob = cargo ? await leerOriginal(cargo.id) : void 0;
			if (blob) await registrarSubida({
				projectId,
				predio: codigo,
				expediente: void 0,
				paso: PANTALLA,
				ruta: `/proyectos/${projectId}/predios/${codigo}/comunicacion-afectacion`
			}, new File([blob], `cargo-notificacion-${codigo}.jpg`, { type: blob.type || "image/jpeg" }), {
				nombre: "Cargo del oficio de comunicación de afectación",
				catalogoId: "ca-cargo",
				fecha: d.fecha,
				numero: oficio?.numero
			});
			anotarRegistro({
				projectId,
				tipo: "notificacion",
				predio: codigo,
				titulo: `Notificación N.° ${n} · ${d.medio.toLowerCase()}`,
				detalle: d.destinatario,
				fotos: fotosDe(leerFotos(), {
					predio: codigo,
					registro: d.ref
				}).length
			});
			limpiar();
			volver();
		} catch (e) {
			setError(e.message);
			setGuardando(false);
		}
	}
	return /* @__PURE__ */ jsx(Asistente, {
		titulo: "Notificación y cargo",
		subtitulo: codigo,
		pasos: [
			{
				titulo: "Entrega",
				ayuda: "Cómo y a quién se entregó la comunicación de afectación.",
				validar: () => !d.fecha ? "Indique la fecha." : !d.medio ? "Indique el medio de entrega." : null,
				contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Fecha",
						tipo: "date",
						obligatorio: true,
						valor: d.fecha,
						onChange: (v) => pon("fecha", v)
					}),
					/* @__PURE__ */ jsx(Chips, {
						etiqueta: "Medio",
						obligatorio: true,
						opciones: MEDIOS,
						valor: d.medio,
						onChange: (v) => pon("medio", v)
					}),
					destinatarios.length > 0 && /* @__PURE__ */ jsx(Chips, {
						etiqueta: "Destinatario",
						opciones: destinatarios,
						valor: destinatarios.includes(d.destinatario) ? d.destinatario : "",
						onChange: (v) => pon("destinatario", v)
					}),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: destinatarios.length ? "U otra persona que recibió" : "Destinatario",
						valor: destinatarios.includes(d.destinatario) ? "" : d.destinatario,
						onChange: (v) => pon("destinatario", v)
					}),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Realizada por",
						valor: d.realizadoPor,
						placeholder: nombreUsuario || "Brigada de campo",
						onChange: (v) => pon("realizadoPor", v)
					})
				] })
			},
			{
				titulo: "Resultado",
				validar: () => d.efectiva === null ? "Indique si la comunicación fue efectiva." : null,
				contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(SiNo, {
						etiqueta: "¿La comunicación fue efectiva?",
						obligatorio: true,
						valor: d.efectiva,
						onChange: (v) => pon("efectiva", v)
					}),
					/* @__PURE__ */ jsx(Chips, {
						etiqueta: "Respuesta del sujeto pasivo",
						opciones: ACEPTACION,
						valor: d.aceptacion,
						onChange: (v) => pon("aceptacion", v)
					}),
					/* @__PURE__ */ jsx(Texto, {
						etiqueta: "Fecha de respuesta",
						tipo: "date",
						valor: d.fechaRespuesta,
						onChange: (v) => pon("fechaRespuesta", v)
					}),
					/* @__PURE__ */ jsx(AreaTexto, {
						etiqueta: "Observación",
						valor: d.observacion,
						onChange: (v) => pon("observacion", v),
						sugerencias: [
							"Recibió el familiar",
							"Pidió plazo para responder",
							"Dejado bajo puerta"
						]
					})
				] })
			},
			{
				titulo: "Cargo",
				ayuda: "Foto del cargo firmado y la firma de quien recibió.",
				validar: () => d.seNego === null ? "Indique si la persona se negó a recibir." : d.seNego ? !d.motivoNegativa.trim() ? "Anote el motivo de la negativa." : null : nFotos("Cargo firmado") < 1 ? "Tome la foto del cargo firmado." : null,
				contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(SiNo, {
						etiqueta: "¿Se negó a recibir?",
						obligatorio: true,
						valor: d.seNego,
						onChange: (v) => pon("seNego", v)
					}),
					d.seNego === false && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Fotos, {
						etiqueta: "Cargo firmado",
						minimo: 1,
						maximo: 2,
						contexto: contexto("Cargo", "Cargo firmado"),
						gps
					}), /* @__PURE__ */ jsx(Firma, {
						etiqueta: "Firma de quien recibe",
						contexto: contexto("Cargo", "Firma de quien recibe"),
						gps
					})] }),
					d.seNego && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(AreaTexto, {
						etiqueta: "Motivo",
						valor: d.motivoNegativa,
						onChange: (v) => pon("motivoNegativa", v),
						sugerencias: [
							"No quiso recibir",
							"No se encontró a nadie",
							"Pidió volver otro día"
						]
					}), /* @__PURE__ */ jsx(Fotos, {
						etiqueta: "Foto de constancia (fachada o puerta)",
						maximo: 2,
						contexto: contexto("Cargo", "Constancia de negativa"),
						gps
					})] })
				] })
			},
			{
				titulo: "Resumen",
				ayuda: "Al guardar se verá en Comunicación de afectación del expediente.",
				contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [error && /* @__PURE__ */ jsx(Aviso, {
					tipo: "error",
					children: error
				}), /* @__PURE__ */ jsx(Resumen, {
					onEditar: setPaso,
					grupos: [
						{
							titulo: "Entrega",
							paso: 0,
							filas: [
								["Fecha", d.fecha],
								["Medio", d.medio],
								["Destinatario", d.destinatario],
								["Realizada por", d.realizadoPor || nombreUsuario]
							]
						},
						{
							titulo: "Resultado",
							paso: 1,
							filas: [
								["Efectiva", d.efectiva == null ? "" : d.efectiva ? "Sí" : "No"],
								["Respuesta", ACEPTACION.find((a) => a.valor === d.aceptacion)?.etiqueta],
								["Observación", d.observacion]
							]
						},
						{
							titulo: "Cargo",
							paso: 2,
							filas: d.seNego ? [["Se negó a recibir", d.motivoNegativa]] : [["Fotos del cargo", String(nFotos("Cargo firmado"))], ["Firma", nFotos("Firma de quien recibe") ? "Guardada" : "Sin firma"]]
						}
					]
				})] })
			}
		],
		paso,
		onPaso: setPaso,
		onSalir: volver,
		final: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			disabled: guardando,
			onClick: () => void guardar(),
			children: [
				/* @__PURE__ */ jsx(Save, {}),
				" ",
				guardando ? "Guardando…" : "Guardar"
			]
		})
	});
}
//#endregion
export { NotificacionCampo as component };
