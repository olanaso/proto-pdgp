import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { C as usePrediosRegistrados, E as ETAPA_CORTA, S as registrarPredio, a as prediosDelProyecto, g as darDeBaja, h as codigoProvisional, p as NOMBRE_ORIGEN, r as padronDemostrativo, w as ETAPAS_DE_AVANCE, x as registradoPorCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, G as rutaRapida, R as NOMBRE_RUTA, d as PlazoPredioBadge, l as usePrediosDerivados, n as etiquetaProyecto, r as guardarRecorrido, u as EtapaBadge, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Route$1 } from "./proyectos._projectId.predios.index-Ci60g3hC.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChartGantt, ClipboardPen, FileSpreadsheet, FolderOpen, ListChecks, Map, MapPinned, Plus, Save, Sheet, Trash2 } from "lucide-react";
//#region src/components/NuevoPredioModal.tsx
/**
* Alta directa de un predio (docs/PLAN-REGISTRO-PREDIOS.md §5): los mismos campos del padrón de
* campo. Queda como preliminar con código provisional; "Guardar e iniciar registro" abre su
* Identificación y codificación.
*/
var CONDICIONES = [
	"PRIVADO",
	"ESTATAL",
	"COMUNAL",
	"SIN SUJETO PASIVO"
];
var TIPOS_PERSONA = [
	"NATURAL",
	"JURIDICA",
	"COMUNIDAD CAMPESINA",
	"COMUNIDAD NATIVA"
];
var CONDICIONES_SUJETO = [
	"PROPIETARIO",
	"POSEEDOR",
	"OCUPANTE",
	"SIN INFORMACION"
];
var vacio = () => ({
	codigoPadron: "",
	origen: "DIRECTO",
	condicionPredio: "PRIVADO",
	tipoPredio: "RURAL",
	sujetoPasivo: "",
	tipoPersona: "NATURAL",
	condicionSujeto: "POSEEDOR",
	areaM2: "",
	lat: "",
	lon: "",
	ubicacion: "",
	observaciones: ""
});
function NuevoPredioModal({ projectId, onCerrar, onCreado }) {
	const navigate = useNavigate();
	const [d, setD] = useState(vacio);
	const [intentado, setIntentado] = useState(false);
	const set = (k, v) => setD((x) => ({
		...x,
		[k]: v
	}));
	const num = (v) => v.trim() ? Number(v.replace(",", ".")) : NaN;
	const lat = num(d.lat);
	const lon = num(d.lon);
	const error = !d.sujetoPasivo.trim() ? "Ingrese el sujeto pasivo o escriba SIN INFORMACION." : !d.ubicacion.trim() && !(d.lat.trim() && d.lon.trim()) ? "Indique la ubicación o las coordenadas del predio." : (d.lat.trim() || d.lon.trim()) && (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) ? "Las coordenadas deben ser latitud y longitud en grados decimales (por ejemplo -11.78215 y -75.47852)." : d.areaM2.trim() && !(num(d.areaM2) > 0) ? "El área debe ser un número mayor que cero." : null;
	function guardar(abrir) {
		setIntentado(true);
		if (error) return;
		const p = registrarPredio(projectId, {
			...d,
			sujetoPasivo: d.sujetoPasivo.trim().toUpperCase()
		});
		onCreado(p.codigo);
		if (abrir) navigate({
			to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
			params: {
				projectId,
				codigo: p.codigo
			}
		});
	}
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "xl",
		titulo: "Nuevo predio",
		descripcion: `Se registra como preliminar con el código provisional ${codigoProvisional(projectId)}; el código oficial se asigna en Identificación y codificación.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: onCerrar,
				children: "Cancelar"
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => guardar(false),
				children: [/* @__PURE__ */ jsx(Save, {}), " Guardar"]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => guardar(true),
				children: [/* @__PURE__ */ jsx(FolderOpen, {}), " Guardar e iniciar registro"]
			})
		] }),
		children: [intentado && error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			children: error
		}), /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sujeto pasivo",
				obligatorio: true,
				ayuda: "Nombre o razón social; SIN INFORMACION si aún no se conoce.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} uppercase`,
					value: d.sujetoPasivo,
					onChange: (e) => set("sujetoPasivo", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de persona",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: d.tipoPersona,
					onChange: (e) => set("tipoPersona", e.target.value),
					children: TIPOS_PERSONA.map((t) => /* @__PURE__ */ jsx("option", { children: t }, t))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Condición del sujeto",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: d.condicionSujeto,
					onChange: (e) => set("condicionSujeto", e.target.value),
					children: CONDICIONES_SUJETO.map((t) => /* @__PURE__ */ jsx("option", { children: t }, t))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Condición del predio",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					value: d.condicionPredio,
					onChange: (e) => set("condicionPredio", e.target.value),
					children: CONDICIONES.map((t) => /* @__PURE__ */ jsx("option", { children: t }, t))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de predio",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: d.tipoPredio,
					onChange: (e) => set("tipoPredio", e.target.value),
					children: [/* @__PURE__ */ jsx("option", { children: "RURAL" }), /* @__PURE__ */ jsx("option", { children: "URBANO" })]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área afectada (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					inputMode: "decimal",
					className: controlClase,
					value: d.areaM2,
					onChange: (e) => set("areaM2", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Ubicación",
				ayuda: "Distrito, sector o referencia.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: d.ubicacion,
					onChange: (e) => set("ubicacion", e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código de padrón de campo",
				ayuda: "Si viene de una ficha de campo.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} uppercase`,
					value: d.codigoPadron,
					onChange: (e) => set("codigoPadron", e.target.value.toUpperCase())
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Latitud",
				ayuda: "Grados decimales (WGS 84).",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					inputMode: "decimal",
					className: controlClase,
					value: d.lat,
					onChange: (e) => set("lat", e.target.value),
					placeholder: "-11.78215"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Longitud",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					inputMode: "decimal",
					className: controlClase,
					value: d.lon,
					onChange: (e) => set("lon", e.target.value),
					placeholder: "-75.47852"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observaciones",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 2,
					className: `${controlClase} h-auto py-2`,
					value: d.observaciones,
					onChange: (e) => set("observaciones", e.target.value)
				})
			})
		] })]
	});
}
//#endregion
//#region src/routes/proyectos.$projectId.predios.index.tsx?tsr-split=component
var OPCIONES_PLAZO = [
	{
		valor: "rojo",
		texto: "Vencido"
	},
	{
		valor: "ambar",
		texto: "Por vencer (3 d.h. o menos)"
	},
	{
		valor: "verde",
		texto: "En plazo"
	},
	{
		valor: "sin",
		texto: "Sin fecha de inicio"
	}
];
var BUSCAR_EN = ["buscar"];
var distintos = (filas, clave) => [...new Set(filas.map((p) => p[clave]))].sort().map((v) => ({
	valor: v,
	texto: v
}));
/** Baja de un preliminar: exige motivo y queda en el histórico del registro. */
function BajaModal({ fila, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Dar de baja ${fila.cod}`,
		descripcion: "El predio preliminar deja de aparecer en el listado y el mapa. El histórico conserva sus datos y el motivo.",
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
			children: [/* @__PURE__ */ jsx(Trash2, {}), " Dar de baja"]
		})] }),
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-baja-predio",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-baja-predio",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value),
				placeholder: "Por ejemplo: predio fuera del área de influencia según el replanteo"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
/** El padrón no clasifica todos los predios: "Pendiente" en gris en lugar del rótulo largo. */
function Clasificacion({ valor }) {
	return valor.includes("PENDIENTE") ? /* @__PURE__ */ jsx("span", {
		className: "text-muted-foreground",
		title: valor,
		children: "Pendiente"
	}) : /* @__PURE__ */ jsx("span", { children: valor });
}
var OPCIONES_RUTA = Object.keys(NOMBRE_RUTA).map((r) => ({
	valor: r,
	texto: NOMBRE_RUTA[r]
}));
var sinSuscripcion = () => () => {};
function Ruta({ fila }) {
	if (!fila.ruta) return null;
	return /* @__PURE__ */ jsxs("span", {
		className: "block",
		children: [NOMBRE_RUTA[fila.ruta], fila.rutaInferida && /* @__PURE__ */ jsx("span", {
			className: "block text-xs text-muted-foreground",
			children: "inferida"
		})]
	});
}
function ListadoPredios() {
	const { projectId } = Route$1.useParams();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const derivados = usePrediosDerivados();
	const registrados = usePrediosRegistrados(projectId);
	const rol = useRol();
	const gestiona = rol === "ADMIN" || rol === "COORDINADOR" || rol === "ESP_TECNICO" || rol === "BRIGADISTA";
	const [nuevo, setNuevo] = useState(false);
	const [baja, setBaja] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const enCliente = useSyncExternalStore(sinSuscripcion, () => true, () => false);
	const filas = useMemo(() => {
		const hijos = derivados.filter((d) => d.projectId === projectId);
		const conRuta = (p) => {
			if (!enCliente) return p;
			const r = rutaRapida(p.codigo);
			return {
				...p,
				ruta: r.ruta,
				rutaInferida: r.inferida
			};
		};
		return prediosDelProyecto(projectId).flatMap((p) => {
			const propios = hijos.filter((d) => d.padre === p.codigo);
			if (propios.length === 0) return [conRuta(p)];
			return [conRuta({
				...p,
				tipoExpediente: "Comunal"
			}), ...propios.map((d) => conRuta({
				...p,
				codigo: d.codigo,
				cod: d.codigo,
				sujetos: [d.comunero],
				sujeto: d.comunero,
				area: d.area,
				etapa: {
					...p.etapa,
					ruta: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion"
				},
				buscar: `${d.codigo} ${d.comunero} ${d.dni} ${d.comunidad}`.toLocaleLowerCase("es-PE"),
				tipoExpediente: "Individual",
				comunidad: d.comunidad
			}))];
		});
	}, [
		projectId,
		derivados,
		enCliente,
		registrados
	]);
	const filtros = useMemo(() => [
		{
			clave: "etapaFiltro",
			etiqueta: "Etapa",
			opciones: ETAPAS_DE_AVANCE.map((n) => ({
				valor: `e${n}`,
				texto: `${n} · ${ETAPA_CORTA[n]}`
			}))
		},
		{
			clave: "plazoFiltro",
			etiqueta: "Plazo legal",
			opciones: OPCIONES_PLAZO
		},
		{
			clave: "origen",
			etiqueta: "Origen",
			opciones: Object.keys(NOMBRE_ORIGEN).map((o) => ({
				valor: o,
				texto: NOMBRE_ORIGEN[o]
			}))
		},
		{
			clave: "registro",
			etiqueta: "Registro",
			opciones: [{
				valor: "PRELIMINAR",
				texto: "Preliminar"
			}, {
				valor: "CODIFICADO",
				texto: "Codificado"
			}]
		},
		{
			clave: "ruta",
			etiqueta: "Ruta",
			opciones: OPCIONES_RUTA
		},
		{
			clave: "modalidad",
			etiqueta: "Modalidad",
			opciones: distintos(filas, "modalidad")
		},
		{
			clave: "condicion",
			etiqueta: "Condición",
			opciones: distintos(filas, "condicion")
		}
	], [filas]);
	const abrir = (p) => navigate({
		to: p.etapa.ruta,
		params: {
			projectId,
			codigo: p.codigo
		}
	});
	const completar = (p) => navigate({
		to: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
		params: {
			projectId,
			codigo: p.codigo
		}
	});
	const demo = padronDemostrativo(projectId) ? "Datos de demostración: este proyecto muestra el padrón del Aeropuerto de Jauja hasta que se cargue el suyo." : void 0;
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		mensaje && /* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mb-4 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
			children: mensaje
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Listado de predios",
			icono: ListChecks,
			descripcion: "Clic en un predio para abrir su expediente en la pantalla de su etapa actual.",
			migas: [
				{
					texto: "Proyectos",
					to: "/proyectos"
				},
				{
					texto: etiquetaProyecto(proyecto, projectId),
					to: "/proyectos/$projectId",
					params: { projectId }
				},
				{ texto: "Predios" }
			],
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
				gestiona && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => setNuevo(true),
					children: [/* @__PURE__ */ jsx(Plus, {}), " Nuevo predio"]
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/$projectId/padron-preliminar",
						params: { projectId },
						children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Importar padrón"]
					})
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/$projectId/mapa",
						params: { projectId },
						children: [/* @__PURE__ */ jsx(Map, {}), " Ver mapa"]
					})
				}),
				/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/$projectId/padron",
						params: { projectId },
						children: [/* @__PURE__ */ jsx(Sheet, {}), " Padrón completo"]
					})
				})
			] }),
			columnas: [
				{
					clave: "cod",
					titulo: "Código de predio",
					render: (p) => /* @__PURE__ */ jsx("span", {
						className: "whitespace-nowrap font-mono text-xs font-semibold text-foreground",
						children: p.cod
					})
				},
				{
					clave: "sujeto",
					titulo: "Sujeto pasivo",
					render: (p) => /* @__PURE__ */ jsxs("span", {
						title: p.sujetos.join(", "),
						className: "block",
						children: [
							p.sujeto,
							p.registro === "PRELIMINAR" && /* @__PURE__ */ jsx("span", {
								className: "mt-0.5 block",
								children: /* @__PURE__ */ jsxs(StatusBadge, {
									tono: "warning",
									children: ["Preliminar · ", p.origenTexto]
								})
							}),
							p.tipoExpediente && /* @__PURE__ */ jsx("span", {
								className: "block text-xs text-muted-foreground",
								children: p.tipoExpediente === "Comunal" ? "Predio comunal con expedientes individuales" : `Expediente individual · comunero de ${p.comunidad}`
							})
						]
					})
				},
				{
					clave: "condicion",
					titulo: "Condición",
					render: (p) => /* @__PURE__ */ jsx(Clasificacion, { valor: p.condicion })
				},
				{
					clave: "modalidad",
					titulo: "Modalidad",
					render: (p) => /* @__PURE__ */ jsx(Clasificacion, { valor: p.modalidad })
				},
				{
					clave: "ruta",
					titulo: "Ruta",
					render: (p) => /* @__PURE__ */ jsx(Ruta, { fila: p })
				},
				{
					clave: "etapaOrden",
					titulo: "Etapa actual",
					render: (p) => /* @__PURE__ */ jsx(EtapaBadge, {
						etapa: p.etapa,
						conPaso: true
					})
				},
				{
					clave: "plazoOrden",
					titulo: "Plazo legal",
					render: (p) => /* @__PURE__ */ jsx(PlazoPredioBadge, { plazo: p.etapa.plazo })
				}
			],
			filas,
			claveFila: (p) => p.codigo,
			filtros,
			buscarEn: BUSCAR_EN,
			placeholderBuscar: "Código, sujeto pasivo, partida o resolución",
			accionesFila: [
				{
					nombre: "Completar registro",
					icono: ClipboardPen,
					onClick: completar,
					visible: (p) => p.registro === "PRELIMINAR"
				},
				{
					nombre: "Abrir expediente",
					icono: FolderOpen,
					onClick: abrir
				},
				{
					nombre: "Ver en el mapa",
					icono: MapPinned,
					onClick: (p) => navigate({
						to: "/proyectos/$projectId/mapa",
						params: { projectId },
						search: { predio: p.codigo }
					})
				},
				{
					nombre: "Dar de baja",
					icono: Trash2,
					destructiva: true,
					visible: (p) => gestiona && p.registro === "PRELIMINAR" && p.origen !== "BASE",
					onClick: (p) => setBaja(p)
				},
				{
					nombre: "Avance y plazos",
					icono: ChartGantt,
					onClick: (p) => navigate({
						to: "/proyectos/$projectId/predios/$codigo/monitoreo",
						params: {
							projectId,
							codigo: p.codigo
						}
					})
				}
			],
			onFilaClick: abrir,
			onVista: (v) => guardarRecorrido(projectId, {
				codigos: v.map((p) => p.codigo),
				origen: "listado de predios"
			}),
			exportar: (v) => exportarExcel(`predios-${projectId}`, [
				{
					titulo: "Código de predio",
					valor: (p) => p.cod
				},
				{
					titulo: "Origen",
					valor: (p) => p.origenTexto
				},
				{
					titulo: "Registro",
					valor: (p) => p.registro === "PRELIMINAR" ? "Preliminar" : "Codificado"
				},
				{
					titulo: "Sujetos pasivos",
					valor: (p) => p.sujetos.join("; ")
				},
				{
					titulo: "Condición",
					valor: (p) => p.condicion
				},
				{
					titulo: "Modalidad",
					valor: (p) => p.modalidad
				},
				{
					titulo: "Ruta",
					valor: (p) => p.ruta ? `${NOMBRE_RUTA[p.ruta]}${p.rutaInferida ? " (inferida)" : ""}` : ""
				},
				{
					titulo: "Partida registral",
					valor: (p) => p.partida
				},
				{
					titulo: "Resolución",
					valor: (p) => p.resolucion
				},
				{
					titulo: "Etapa",
					valor: (p) => `${p.etapa.etapa}. ${p.etapa.nombre}`
				},
				{
					titulo: "Paso pendiente",
					valor: (p) => p.etapa.nombrePaso
				},
				{
					titulo: "Sustento de la etapa",
					valor: (p) => p.etapa.hito
				},
				{
					titulo: "Plazo legal",
					valor: (p) => p.etapa.plazo ? `${p.etapa.plazo.nombre} (art. ${p.etapa.plazo.articulo})` : ""
				},
				{
					titulo: "Vence",
					valor: (p) => p.etapa.plazo ? fecha(p.etapa.plazo.vence) : ""
				},
				{
					titulo: "Días hábiles restantes",
					valor: (p) => p.etapa.plazo?.restantes ?? ""
				}
			], v),
			demo,
			vacio: "El proyecto aún no tiene predios: regístrelos con «Nuevo predio» o importe el padrón de campo."
		}),
		nuevo && /* @__PURE__ */ jsx(NuevoPredioModal, {
			projectId,
			onCerrar: () => setNuevo(false),
			onCreado: (codigo) => {
				setNuevo(false);
				setMensaje(`Predio ${codigo} registrado como preliminar. Complete su identificación para asignarle el código oficial.`);
			}
		}),
		baja && /* @__PURE__ */ jsx(BajaModal, {
			fila: baja,
			onCerrar: () => setBaja(null),
			onConfirmar: (motivo) => {
				const r = registradoPorCodigo(baja.codigo);
				if (r) darDeBaja(projectId, r.id, motivo);
				setBaja(null);
				setMensaje(`Predio ${baja.cod} dado de baja.`);
			}
		})
	] });
}
//#endregion
export { ListadoPredios as component };
