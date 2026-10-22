import { t as Button } from "./button-DH6ZQkjT.js";
import { jt as useUsuarioSesion, x as dni } from "./sujetoPasivo-Cz4oBCnt.js";
import { i as registrarRealizacion, r as nuevoId, t as initialForm } from "./empadronamiento-BwTjGigO.js";
import { b as useBorrador, n as anotarRegistro, o as emitirActaCampo, w as useUltimaPosicion } from "./campo-Dn2b-x9H.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./recolector-campo._projectId.caracterizacion._codigo.empadronamiento-8KT5UDyX.js";
import { a as fotosDe, c as leerFotos, g as useFotos } from "./fotos-CUnD_Pb7.js";
import { a as Fotos, c as SiNo, i as Firma, l as Texto, n as Chips, r as ConsultaDni, s as Resumen, t as AreaTexto } from "./Controles-CqdT34l5.js";
import { t as Asistente } from "./Asistente-D-VBBAeR.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.empadronamiento.tsx?tsr-split=component
var PANTALLA = "empadronamiento-inspeccion-campo";
var hoy = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
/**
* Empadronamiento e inspección en campo: el mismo registro de la pantalla de escritorio (un empadronamiento
* realizado, con sus fotos y el acta numerada). Con «no se pudo empadronar» se omiten los pasos del
* ocupante y de lo que se ve.
*/
function EmpadronamientoCampo() {
	const { projectId, codigo } = Route$1.useParams();
	const navigate = useNavigate();
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
	const [d, setD, limpiar] = useBorrador(`campo-empadronamiento-${codigo}`, {
		...initialForm,
		id: nuevoId(),
		fechaInicio: hoy(),
		sePudo: null,
		motivo: ""
	});
	const pon = (k, v) => setD((x) => ({
		...x,
		[k]: v
	}));
	const contexto = (seccion, campo) => ({
		proyecto: projectId,
		predio: codigo,
		pantalla: PANTALLA,
		seccion,
		registro: d.id,
		campo,
		modulo: 11
	});
	const nFotos = (campo) => fotosDe(fotos, {
		predio: codigo,
		pantalla: PANTALLA,
		registro: d.id,
		campo
	}).length;
	const nombreUsuario = usuario?.nombre ?? "";
	const volver = () => navigate({
		to: "/recolector-campo/$projectId/caracterizacion/$codigo",
		params: {
			projectId,
			codigo
		}
	});
	const form = () => ({
		conEmpadronamiento: d.sePudo === true,
		realizadoPor: d.realizadoPor.trim() || nombreUsuario || "Brigada de campo",
		fechaInicio: d.fechaInicio,
		fechaFin: d.fechaFin,
		ocupante: d.ocupante.trim().toUpperCase(),
		documentoOcupante: d.documentoOcupante,
		condicionOcupante: d.condicionOcupante,
		caracteristicasPredio: d.caracteristicasPredio,
		edificaciones: d.edificaciones,
		mejoras: d.mejoras,
		observaciones: [d.sePudo === false ? `No se pudo empadronar: ${d.motivo}` : "", d.observaciones].filter(Boolean).join(" · ")
	});
	const resumen = () => {
		const f = form();
		return [
			{
				titulo: "Visita",
				paso: 0,
				filas: [
					["Fecha", f.fechaInicio],
					["Realizado por", f.realizadoPor],
					["Se empadronó", d.sePudo == null ? "" : d.sePudo ? "Sí" : `No · ${d.motivo}`]
				]
			},
			...d.sePudo ? [{
				titulo: "Ocupante",
				paso: 1,
				filas: [
					["Ocupante", f.ocupante],
					["Documento", f.documentoOcupante],
					["Condición", f.condicionOcupante]
				]
			}, {
				titulo: "Lo que se ve",
				paso: 2,
				filas: [
					["Características", f.caracteristicasPredio],
					["Edificaciones", f.edificaciones],
					["Mejoras", f.mejoras]
				]
			}] : [],
			{
				titulo: "Fotos y observaciones",
				filas: [["Fotos de la inspección", String(nFotos("Fotos de la inspección"))], ["Observaciones", f.observaciones]]
			}
		];
	};
	async function guardar() {
		setGuardando(true);
		setError("");
		try {
			const f = form();
			const { numero, item } = await emitirActaCampo({
				projectId,
				predio: codigo,
				subtipoId: "ac-empadronamiento",
				catalogoId: "emp-acta",
				titulo: "Acta de empadronamiento e inspección de campo",
				paso: PANTALLA,
				ruta: `/proyectos/${projectId}/predios/${codigo}/${PANTALLA}`,
				usuario,
				grupos: resumen()
			});
			const n = registrarRealizacion(codigo, {
				id: d.id,
				form: f,
				registradoPor: nombreUsuario || "Recolector de campo",
				registradoEl: (/* @__PURE__ */ new Date()).toISOString(),
				actaItemId: item.id,
				otrosItemIds: [],
				estado: "vigente"
			}, "Registró empadronamiento desde campo");
			anotarRegistro({
				projectId,
				tipo: "empadronamiento",
				predio: codigo,
				titulo: `Empadronamiento N.° ${n}${f.ocupante ? ` · ${f.ocupante}` : ""}`,
				detalle: f.fechaInicio,
				fotos: fotosDe(leerFotos(), {
					predio: codigo,
					registro: d.id
				}).length,
				acta: numero
			});
			limpiar();
			volver();
		} catch (e) {
			setError(e.message);
			setGuardando(false);
		}
	}
	const pasoVisita = {
		titulo: "Visita",
		validar: () => !d.fechaInicio ? "Indique la fecha del empadronamiento." : d.sePudo === null ? "Indique si se pudo empadronar." : d.sePudo === false && !d.motivo.trim() ? "Anote por qué no se pudo empadronar." : null,
		contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Texto, {
				etiqueta: "Fecha",
				tipo: "date",
				obligatorio: true,
				valor: d.fechaInicio,
				onChange: (v) => pon("fechaInicio", v)
			}),
			/* @__PURE__ */ jsx(Texto, {
				etiqueta: "Realizado por",
				valor: d.realizadoPor,
				placeholder: nombreUsuario || "Brigada de campo",
				onChange: (v) => pon("realizadoPor", v)
			}),
			/* @__PURE__ */ jsx(SiNo, {
				etiqueta: "¿Se pudo empadronar?",
				obligatorio: true,
				valor: d.sePudo,
				onChange: (v) => pon("sePudo", v)
			}),
			d.sePudo === false && /* @__PURE__ */ jsx(AreaTexto, {
				etiqueta: "Motivo",
				valor: d.motivo,
				onChange: (v) => pon("motivo", v),
				sugerencias: [
					"Predio cerrado",
					"No se permitió el ingreso",
					"Ocupante ausente"
				]
			})
		] })
	};
	const pasoOcupante = {
		titulo: "Ocupante encontrado",
		validar: () => !d.ocupante.trim() ? "Escriba el nombre del ocupante encontrado." : d.documentoOcupante && dni(d.documentoOcupante) ? dni(d.documentoOcupante) : null,
		contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(ConsultaDni, {
				valor: d.documentoOcupante,
				onChange: (v) => pon("documentoOcupante", v),
				onDatos: (r) => setD((x) => ({
					...x,
					documentoOcupante: r.numero,
					ocupante: r.nombres
				}))
			}),
			/* @__PURE__ */ jsx(Texto, {
				etiqueta: "Nombres y apellidos",
				obligatorio: true,
				valor: d.ocupante,
				onChange: (v) => pon("ocupante", v)
			}),
			/* @__PURE__ */ jsx(Chips, {
				etiqueta: "Condición del ocupante",
				opciones: [
					"PROPIETARIO",
					"POSEEDOR",
					"INQUILINO",
					"PRECARIO",
					"FAMILIAR",
					"OTRO"
				],
				valor: d.condicionOcupante,
				onChange: (v) => pon("condicionOcupante", v)
			})
		] })
	};
	const pasoVisto = {
		titulo: "Lo que se ve",
		ayuda: "Toque una frase para agregarla y complete a mano.",
		contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(AreaTexto, {
				etiqueta: "Características del predio",
				valor: d.caracteristicasPredio,
				onChange: (v) => pon("caracteristicasPredio", v),
				sugerencias: [
					"Terreno plano",
					"Terreno en pendiente",
					"Con acceso por trocha"
				]
			}),
			/* @__PURE__ */ jsx(AreaTexto, {
				etiqueta: "Edificaciones",
				valor: d.edificaciones,
				onChange: (v) => pon("edificaciones", v),
				sugerencias: [
					"Vivienda de adobe",
					"Vivienda de material noble",
					"Corral"
				]
			}),
			/* @__PURE__ */ jsx(AreaTexto, {
				etiqueta: "Mejoras",
				valor: d.mejoras,
				onChange: (v) => pon("mejoras", v),
				sugerencias: [
					"Cerco de alambre",
					"Cultivo de maíz",
					"Pozo de agua"
				]
			})
		] })
	};
	const pasoFotos = {
		titulo: "Fotos y acta",
		ayuda: "Al guardar se numera el acta de empadronamiento (solo correlativo).",
		validar: () => nFotos("Fotos de la inspección") < 2 ? "Tome al menos dos fotos de la inspección." : null,
		contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Fotos, {
				etiqueta: "Fotos de la inspección",
				minimo: 2,
				contexto: contexto("Ficha de campo", "Fotos de la inspección"),
				gps
			}),
			/* @__PURE__ */ jsx(Fotos, {
				etiqueta: "Fotos del acta",
				contexto: contexto("Acta", "Fotos del acta"),
				gps,
				ayuda: "Si se llenó el acta en papel, fotografíela."
			}),
			d.sePudo && /* @__PURE__ */ jsx(Firma, {
				etiqueta: "Firma del ocupante",
				contexto: contexto("Acta", "Firma del ocupante"),
				gps
			})
		] })
	};
	const pasoFinal = {
		titulo: "Observaciones y resumen",
		contenido: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			error && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: error
			}),
			/* @__PURE__ */ jsx(AreaTexto, {
				etiqueta: "Observaciones de campo",
				valor: d.observaciones,
				onChange: (v) => pon("observaciones", v)
			}),
			/* @__PURE__ */ jsx(Resumen, {
				grupos: resumen(),
				onEditar: setPaso
			})
		] })
	};
	const pasos = d.sePudo === false ? [
		pasoVisita,
		pasoFotos,
		pasoFinal
	] : [
		pasoVisita,
		pasoOcupante,
		pasoVisto,
		pasoFotos,
		pasoFinal
	];
	return /* @__PURE__ */ jsx(Asistente, {
		titulo: "Empadronamiento",
		subtitulo: codigo,
		pasos,
		paso: Math.min(paso, pasos.length - 1),
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
export { EmpadronamientoCampo as component };
