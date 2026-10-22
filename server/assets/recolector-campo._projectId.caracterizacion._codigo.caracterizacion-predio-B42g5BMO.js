import { t as Button } from "./button-DH6ZQkjT.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { g as sesionCampo, n as anotarRegistro, w as useUltimaPosicion } from "./campo-Dn2b-x9H.js";
import { t as Route$1 } from "./recolector-campo._projectId.caracterizacion._codigo.caracterizacion-predio-CbQ1XF1Y.js";
import { a as fotosDe, c as leerFotos, i as descartarFotos } from "./fotos-CUnD_Pb7.js";
import { a as claveCaracterizacion, i as agregarFilaCaracterizacion, o as guardarEntornoCampo, s as leerCaracterizacion } from "./caracterizacion-BHWY_R4f.js";
import { i as TituloCampo, r as TarjetaCampo, t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { a as Fotos, c as SiNo, l as Texto, n as Chips, t as AreaTexto } from "./Controles-CqdT34l5.js";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Apple, Fence, Hammer, Home, MapPinned, Plus, Save, Sprout, Trees, Wrench, X } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.caracterizacion-predio.tsx?tsr-split=component
var PANTALLA = "caracterizacion-predio";
var num = (v) => Number(String(v ?? "").replace(",", ".")) || 0;
var suma = (filas, k) => filas.reduce((n, f) => n + num(f[k]), 0);
var txt = (v) => v == null ? "" : String(v);
var ESTADO = [
	"BUENO",
	"REGULAR",
	"MALO"
];
/** Lo que se levanta en campo de cada lista de la caracterización (docs/PLAN-RECOLECTOR-CAMPO.md §4.11). */
var BLOQUES = {
	viviendas: {
		titulo: "Viviendas",
		item: "vivienda",
		icono: Home,
		seccion: "Viviendas",
		fotos: [
			"Foto frente",
			"Foto lado derecho",
			"Foto lado izquierdo",
			"Foto fondo"
		].map((campo) => ({
			campo,
			maximo: 1
		})),
		campos: [
			{
				clave: "descripcion",
				etiqueta: "Descripción",
				obligatorio: true
			},
			{
				clave: "modulo",
				etiqueta: "Módulo"
			},
			{
				clave: "piso",
				etiqueta: "Piso",
				opciones: [
					"1",
					"2",
					"3",
					"4"
				]
			},
			{
				clave: "uso",
				etiqueta: "Uso",
				opciones: [
					"VIVIENDA",
					"COMERCIO",
					"DEPÓSITO",
					"MIXTO",
					"OTRO"
				]
			},
			{
				clave: "material",
				etiqueta: "Material predominante",
				opciones: [
					"ADOBE",
					"LADRILLO",
					"CONCRETO",
					"MADERA",
					"QUINCHA",
					"OTRO"
				]
			},
			{
				clave: "directa",
				etiqueta: "Área directa (m²)",
				tipo: "numero"
			},
			{
				clave: "indirecta",
				etiqueta: "Área indirecta (m²)",
				tipo: "numero"
			}
		],
		aFila: (f, fotoRef) => ({
			descripcion: f.descripcion.trim().toUpperCase(),
			modulo: f.modulo,
			piso: f.piso,
			directa: num(f.directa),
			indirecta: num(f.indirecta),
			total: num(f.directa) + num(f.indirecta),
			uso: f.uso,
			material: f.material,
			fotos: "",
			fotoRef,
			formulario: f
		}),
		rotulo: (r) => txt(r.descripcion) || "Vivienda",
		detalle: (r) => [
			r.modulo && `Módulo ${txt(r.modulo)}`,
			r.piso && `Piso ${txt(r.piso)}`,
			txt(r.material),
			`${num(r.total)} m²`
		].filter(Boolean).join(" · "),
		total: (filas) => `${suma(filas, "total").toFixed(2)} m² en total`
	},
	obras: {
		titulo: "Obras complementarias",
		item: "obra complementaria",
		icono: Hammer,
		seccion: "Obras complementarias",
		fotos: [{
			campo: "Fotos de la obra complementaria",
			maximo: 3
		}],
		campos: [
			{
				clave: "tipo",
				etiqueta: "Tipo",
				opciones: [
					"CERCO",
					"MURO",
					"LOSA",
					"POZO",
					"CANAL",
					"OTRO"
				],
				obligatorio: true
			},
			{
				clave: "longitud",
				etiqueta: "Longitud (m)",
				tipo: "numero"
			},
			{
				clave: "altura",
				etiqueta: "Altura (m)",
				tipo: "numero"
			},
			{
				clave: "metrado",
				etiqueta: "Metrado",
				tipo: "numero"
			},
			{
				clave: "unidad",
				etiqueta: "Unidad",
				opciones: [
					"M",
					"M2",
					"M3",
					"UND"
				]
			},
			{
				clave: "uso",
				etiqueta: "Uso"
			},
			{
				clave: "caracteristicas",
				etiqueta: "Características técnicas",
				tipo: "area"
			},
			{
				clave: "ubicacion",
				etiqueta: "Ubicación en el predio"
			}
		],
		aFila: (f, fotoRef) => ({
			...f,
			foto: "",
			fotoRef,
			formulario: f
		}),
		rotulo: (r) => txt(r.tipo) || "Obra",
		detalle: (r) => [r.metrado && `${txt(r.metrado)} ${txt(r.unidad)}`, txt(r.ubicacion)].filter(Boolean).join(" · ")
	},
	instalaciones: {
		titulo: "Instalaciones fijas permanentes",
		item: "instalación",
		icono: Wrench,
		seccion: "Instalaciones fijas y permanentes",
		fotos: [{
			campo: "Fotos de la instalación",
			maximo: 3
		}],
		campos: [
			{
				clave: "descripcion",
				etiqueta: "Descripción",
				obligatorio: true
			},
			{
				clave: "areaMetrado",
				etiqueta: "Área o metrado (m²)",
				tipo: "numero"
			},
			{
				clave: "longitud",
				etiqueta: "Largo (m)",
				tipo: "numero"
			},
			{
				clave: "ancho",
				etiqueta: "Ancho (m)",
				tipo: "numero"
			},
			{
				clave: "alturaProfundidad",
				etiqueta: "Alto o profundidad (m)",
				tipo: "numero"
			},
			{
				clave: "antiguedadAnos",
				etiqueta: "Antigüedad (años)",
				tipo: "numero"
			},
			{
				clave: "material",
				etiqueta: "Material"
			},
			{
				clave: "estadoConservacion",
				etiqueta: "Estado de conservación",
				opciones: ESTADO
			},
			{
				clave: "estadoConstruccion",
				etiqueta: "Estado de construcción",
				opciones: ["TERMINADA", "EN CONSTRUCCIÓN"]
			}
		],
		aFila: (f, fotoRef) => ({
			...f,
			vuif: "",
			fd: "",
			caracteristicas: "",
			foto: "",
			fotoRef,
			formulario: f
		}),
		rotulo: (r) => txt(r.descripcion) || "Instalación",
		detalle: (r) => [r.areaMetrado && `${txt(r.areaMetrado)} m²`, txt(r.estadoConservacion)].filter(Boolean).join(" · ")
	},
	frutales: {
		titulo: "Plantaciones frutales",
		item: "plantación frutal",
		icono: Apple,
		seccion: "Plantaciones frutales",
		fotos: [{
			campo: "Fotos de la plantación",
			maximo: 3
		}],
		campos: [
			{
				clave: "nombreComun",
				etiqueta: "Nombre común",
				obligatorio: true
			},
			{
				clave: "variedad",
				etiqueta: "Variedad"
			},
			{
				clave: "edadAnos",
				etiqueta: "Edad (años)",
				tipo: "numero"
			},
			{
				clave: "cantidad",
				etiqueta: "Cantidad (plantas)",
				tipo: "numero",
				obligatorio: true
			}
		],
		aFila: (f, fotoRef) => ({
			nombreComun: f.nombreComun.trim().toUpperCase(),
			nombreCientifico: "",
			variedad: f.variedad,
			edadAnos: f.edadAnos,
			unidadMedida: "UND",
			cantidad: f.cantidad,
			utilidad: "",
			vupp: "",
			observacion: "",
			foto: "",
			fotoRef,
			formulario: f
		}),
		rotulo: (r) => txt(r.nombreComun) || "Frutal",
		detalle: (r) => [`${txt(r.cantidad)} plantas`, r.edadAnos && `${txt(r.edadAnos)} años`].filter(Boolean).join(" · "),
		total: (filas) => `${suma(filas, "cantidad")} plantas`
	},
	forestales: {
		titulo: "Plantaciones forestales",
		item: "plantación forestal",
		icono: Trees,
		seccion: "Plantaciones forestales",
		fotos: [{
			campo: "Fotos de la plantación",
			maximo: 3
		}],
		campos: [
			{
				clave: "nombreComun",
				etiqueta: "Especie",
				obligatorio: true
			},
			{
				clave: "edadAnos",
				etiqueta: "Edad (años)",
				tipo: "numero"
			},
			{
				clave: "numeroPlantas",
				etiqueta: "Cantidad (plantas)",
				tipo: "numero",
				obligatorio: true
			},
			{
				clave: "diametro",
				etiqueta: "Diámetro (cm)",
				tipo: "numero"
			},
			{
				clave: "alturaTotal",
				etiqueta: "Altura total (m)",
				tipo: "numero"
			}
		],
		aFila: (f, fotoRef) => ({
			nombreComun: f.nombreComun.trim().toUpperCase(),
			nombreCientifico: "",
			edadAnos: f.edadAnos,
			diametro: f.diametro,
			alturaTotal: f.alturaTotal,
			numeroPlantas: f.numeroPlantas,
			utilidad: "",
			vupp: "",
			observacion: "",
			foto: "",
			fotoRef,
			formulario: f
		}),
		rotulo: (r) => txt(r.nombreComun) || "Forestal",
		detalle: (r) => `${txt(r.numeroPlantas)} plantas`,
		total: (filas) => `${suma(filas, "numeroPlantas")} plantas`
	},
	transitorias: {
		titulo: "Plantaciones transitorias",
		item: "cultivo",
		icono: Sprout,
		seccion: "Plantaciones transitorias",
		fotos: [{
			campo: "Fotos de la plantación",
			maximo: 3
		}],
		campos: [
			{
				clave: "nombreComun",
				etiqueta: "Cultivo",
				obligatorio: true
			},
			{
				clave: "variedad",
				etiqueta: "Variedad"
			},
			{
				clave: "cantidad",
				etiqueta: "Área sembrada (m²)",
				tipo: "numero",
				obligatorio: true
			},
			{
				clave: "etapa",
				etiqueta: "Etapa del cultivo",
				opciones: [
					"SIEMBRA",
					"CRECIMIENTO",
					"COSECHA"
				]
			}
		],
		aFila: (f, fotoRef) => ({
			nombreComun: f.nombreComun.trim().toUpperCase(),
			nombreCientifico: "",
			variedad: f.variedad,
			edadAnos: "",
			unidadMedida: "M2",
			cantidad: f.cantidad,
			utilidad: "",
			vupt: "",
			observacion: f.etapa ? `Etapa: ${f.etapa}` : "",
			foto: "",
			fotoRef,
			formulario: f
		}),
		rotulo: (r) => txt(r.nombreComun) || "Cultivo",
		detalle: (r) => [`${txt(r.cantidad)} ${txt(r.unidadMedida) || "M2"}`, txt(r.observacion)].filter(Boolean).join(" · "),
		total: (filas) => `${suma(filas, "cantidad")} m² sembrados`
	},
	cercoVivo: {
		titulo: "Cerco vivo",
		item: "cerco vivo",
		icono: Fence,
		seccion: "Cerco vivo",
		fotos: [{
			campo: "Fotos del cerco vivo",
			maximo: 3
		}],
		campos: [
			{
				clave: "nombreComun",
				etiqueta: "Especie",
				obligatorio: true
			},
			{
				clave: "longitudCerco",
				etiqueta: "Longitud (m)",
				tipo: "numero",
				obligatorio: true
			},
			{
				clave: "distanciamientoPlantas",
				etiqueta: "Distancia entre plantas (m)",
				tipo: "numero"
			},
			{
				clave: "edadAnos",
				etiqueta: "Edad (años)",
				tipo: "numero"
			},
			{
				clave: "estadoFitosanitario",
				etiqueta: "Estado fitosanitario",
				opciones: ESTADO
			}
		],
		aFila: (f, fotoRef) => ({
			nombreCientifico: "",
			nombreComun: f.nombreComun.trim().toUpperCase(),
			edadAnos: f.edadAnos,
			longitudCerco: f.longitudCerco,
			distanciamientoPlantas: f.distanciamientoPlantas,
			estadoFitosanitario: f.estadoFitosanitario,
			observaciones: "",
			foto: "",
			fotoRef,
			formulario: f
		}),
		rotulo: (r) => txt(r.nombreComun) || "Cerco",
		detalle: (r) => [`${txt(r.longitudCerco)} m`, txt(r.estadoFitosanitario)].filter(Boolean).join(" · "),
		total: (filas) => `${suma(filas, "longitudCerco").toFixed(2)} m en total`
	}
};
var ENTORNO_VACIO = {
	acceso: "",
	agua: "",
	luz: "",
	desague: "",
	claseVia: "",
	materialVia: "",
	usoEntorno: "",
	observaciones: "",
	fotoRef: "entorno",
	registradoEl: "",
	registradoPor: ""
};
/**
* Caracterización levantada en campo: viviendas, obras, instalaciones, plantaciones, cerco vivo y entorno.
* Cada ítem entra a la misma lista de la pantalla de escritorio, con sus fotos en la sección de la fila.
*/
function CaracterizacionCampo() {
	const { projectId, codigo } = Route$1.useParams();
	const { sub, agregar } = Route$1.useSearch();
	const navigate = useNavigate();
	const versiones = useHistorial(claveCaracterizacion(codigo));
	const [inicial, setInicial] = useState(null);
	useEffect(() => setInicial(leerCaracterizacion(codigo)), [codigo]);
	const registro = versiones[0]?.registro ?? inicial;
	const ir = (s, nuevo) => navigate({
		to: "/recolector-campo/$projectId/caracterizacion/$codigo/caracterizacion-predio",
		params: {
			projectId,
			codigo
		},
		search: {
			sub: s,
			agregar: nuevo || void 0
		}
	});
	const alPredio = () => navigate({
		to: "/recolector-campo/$projectId/caracterizacion/$codigo",
		params: {
			projectId,
			codigo
		}
	});
	if (!registro) return null;
	if (sub === "entorno") return /* @__PURE__ */ jsx(FormEntorno, {
		projectId,
		codigo,
		inicial: registro.entorno,
		onSalir: () => ir()
	});
	if (sub && agregar) return /* @__PURE__ */ jsx(FormItem, {
		projectId,
		codigo,
		clave: sub,
		onSalir: () => ir(sub)
	});
	if (sub) {
		const b = BLOQUES[sub];
		const filas = registro.listas[sub];
		return /* @__PURE__ */ jsxs(CampoShell, {
			titulo: b.titulo,
			subtitulo: codigo,
			onAtras: () => ir(),
			pie: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				className: "h-12 flex-1 text-base",
				onClick: () => ir(sub, true),
				children: [
					/* @__PURE__ */ jsx(Plus, {}),
					" Agregar ",
					b.item
				]
			}),
			children: [
				b.total && filas.length > 0 && /* @__PURE__ */ jsxs("p", {
					className: "mb-3 rounded-lg border border-border bg-card px-4 py-3 text-base font-semibold text-foreground",
					children: [
						filas.length,
						" registro",
						filas.length === 1 ? "" : "s",
						" · ",
						b.total(filas)
					]
				}),
				filas.length === 0 ? /* @__PURE__ */ jsx("p", {
					className: "text-base text-muted-foreground",
					children: "Sin registros. Agregue el primero."
				}) : /* @__PURE__ */ jsx("ul", {
					className: "divide-y divide-border rounded-lg border border-border bg-card",
					children: filas.map((f, i) => /* @__PURE__ */ jsxs("li", {
						className: "px-4 py-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block text-base font-medium text-foreground",
							children: b.rotulo(f)
						}), /* @__PURE__ */ jsx("span", {
							className: "block text-sm text-muted-foreground",
							children: b.detalle(f)
						})]
					}, `${txt(f.fotoRef)}-${i}`))
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Para corregir o quitar un registro, use la pantalla Caracterización del predio en el sistema."
				})
			]
		});
	}
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: "Caracterización del predio",
		subtitulo: codigo,
		onAtras: alPredio,
		children: [/* @__PURE__ */ jsx(TituloCampo, { children: "Qué hay en el predio" }), /* @__PURE__ */ jsxs("ul", {
			className: "space-y-2",
			children: [Object.keys(BLOQUES).map((k) => {
				const b = BLOQUES[k];
				const filas = registro.listas[k];
				return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
					icono: b.icono,
					titulo: b.titulo,
					detalle: filas.length ? `${filas.length} registro${filas.length === 1 ? "" : "s"}${b.total ? ` · ${b.total(filas)}` : ""}` : "Sin registros",
					onClick: () => ir(k)
				}) }, k);
			}), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
				icono: MapPinned,
				titulo: "Descripción del entorno",
				detalle: registro.entorno ? `Registrado ${new Date(registro.entorno.registradoEl).toLocaleDateString("es-PE")}` : "Acceso, servicios, vías y uso del entorno",
				onClick: () => ir("entorno")
			}) })]
		})]
	});
}
/** Un ítem nuevo de una lista: campos cortos y las fotos de la fila. */
function FormItem({ projectId, codigo, clave, onSalir }) {
	const b = BLOQUES[clave];
	const gpsEquipo = useUltimaPosicion();
	const gps = gpsEquipo ? {
		lat: gpsEquipo.lat,
		lon: gpsEquipo.lon
	} : void 0;
	const [fotoRef] = useState(() => `${b.seccion}-campo-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`);
	const [f, setF] = useState(() => Object.fromEntries(b.campos.map((c) => [c.clave, ""])));
	const [error, setError] = useState("");
	const contexto = (campo) => ({
		proyecto: projectId,
		predio: codigo,
		pantalla: PANTALLA,
		seccion: b.seccion,
		registro: fotoRef,
		campo,
		modulo: 12
	});
	const cancelar = () => {
		descartarFotos({
			predio: codigo,
			pantalla: PANTALLA,
			registro: fotoRef
		});
		onSalir();
	};
	function guardar() {
		const falta = b.campos.find((c) => c.obligatorio && !f[c.clave]?.trim());
		if (falta) {
			setError(`Complete «${falta.etiqueta}».`);
			return;
		}
		const negativo = b.campos.find((c) => c.tipo === "numero" && f[c.clave] && num(f[c.clave]) < 0);
		if (negativo) {
			setError(`«${negativo.etiqueta}» no puede ser negativo.`);
			return;
		}
		const fila = b.aFila(f, fotoRef);
		agregarFilaCaracterizacion(codigo, clave, fila);
		anotarRegistro({
			projectId,
			tipo: "caracterizacion",
			predio: codigo,
			titulo: `${b.titulo} · ${b.rotulo(fila)}`,
			detalle: b.detalle(fila),
			fotos: fotosDe(leerFotos(), {
				predio: codigo,
				registro: fotoRef
			}).length
		});
		onSalir();
	}
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: `Agregar ${b.item}`,
		subtitulo: codigo,
		onAtras: cancelar,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			className: "h-12 flex-1 text-base",
			onClick: cancelar,
			children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			onClick: guardar,
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar"]
		})] }),
		children: [
			b.campos.map((c) => c.opciones ? /* @__PURE__ */ jsx(Chips, {
				etiqueta: c.etiqueta,
				obligatorio: c.obligatorio,
				opciones: c.opciones,
				valor: f[c.clave],
				onChange: (v) => setF({
					...f,
					[c.clave]: v
				})
			}, c.clave) : c.tipo === "area" ? /* @__PURE__ */ jsx(AreaTexto, {
				etiqueta: c.etiqueta,
				valor: f[c.clave],
				onChange: (v) => setF({
					...f,
					[c.clave]: v
				})
			}, c.clave) : /* @__PURE__ */ jsx(Texto, {
				etiqueta: c.etiqueta,
				obligatorio: c.obligatorio,
				tipo: c.tipo === "numero" ? "number" : "text",
				inputMode: c.tipo === "numero" ? "decimal" : void 0,
				valor: f[c.clave],
				onChange: (v) => setF({
					...f,
					[c.clave]: v
				})
			}, c.clave)),
			b.fotos.map((x) => /* @__PURE__ */ jsx(Fotos, {
				etiqueta: x.campo,
				maximo: x.maximo,
				contexto: contexto(x.campo),
				gps
			}, x.campo)),
			error && /* @__PURE__ */ jsx("p", {
				role: "alert",
				className: "rounded-md border border-destructive bg-destructive-soft px-3 py-2 text-sm font-medium text-destructive",
				children: error
			})
		]
	});
}
/** Entorno del predio: acceso, servicios, vía y uso del entorno, con fotos. */
function FormEntorno({ projectId, codigo, inicial, onSalir }) {
	const usuario = useUsuarioSesion();
	const gpsEquipo = useUltimaPosicion();
	const gps = gpsEquipo ? {
		lat: gpsEquipo.lat,
		lon: gpsEquipo.lon
	} : void 0;
	const [e, setE] = useState(inicial ?? ENTORNO_VACIO);
	const pon = (k, v) => setE({
		...e,
		[k]: v
	});
	const siNo = (v) => v === "" ? null : v === "SI";
	const contexto = useMemo(() => ({
		proyecto: projectId,
		predio: codigo,
		pantalla: PANTALLA,
		seccion: "Descripción del entorno",
		registro: "entorno",
		campo: "Fotos del entorno",
		modulo: 12
	}), [projectId, codigo]);
	function guardar() {
		guardarEntornoCampo(codigo, {
			...e,
			registradoEl: (/* @__PURE__ */ new Date()).toISOString(),
			registradoPor: usuario?.nombre ?? sesionCampo()
		});
		anotarRegistro({
			projectId,
			tipo: "caracterizacion",
			predio: codigo,
			titulo: "Descripción del entorno",
			detalle: [e.usoEntorno, e.claseVia].filter(Boolean).join(" · "),
			fotos: fotosDe(leerFotos(), {
				predio: codigo,
				registro: "entorno"
			}).length
		});
		onSalir();
	}
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: "Descripción del entorno",
		subtitulo: codigo,
		onAtras: onSalir,
		pie: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			onClick: guardar,
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar"]
		}),
		children: [
			/* @__PURE__ */ jsx(AreaTexto, {
				etiqueta: "Acceso al predio",
				valor: e.acceso,
				onChange: (v) => pon("acceso", v),
				sugerencias: [
					"Por carretera asfaltada",
					"Por trocha carrozable",
					"A pie"
				]
			}),
			/* @__PURE__ */ jsx(SiNo, {
				etiqueta: "¿Tiene agua?",
				valor: siNo(e.agua),
				onChange: (v) => pon("agua", v ? "SI" : "NO")
			}),
			/* @__PURE__ */ jsx(SiNo, {
				etiqueta: "¿Tiene luz?",
				valor: siNo(e.luz),
				onChange: (v) => pon("luz", v ? "SI" : "NO")
			}),
			/* @__PURE__ */ jsx(SiNo, {
				etiqueta: "¿Tiene desagüe?",
				valor: siNo(e.desague),
				onChange: (v) => pon("desague", v ? "SI" : "NO")
			}),
			/* @__PURE__ */ jsx(Chips, {
				etiqueta: "Clase de vía",
				opciones: [
					"ARTERIAL",
					"COLECTORA",
					"LOCAL",
					"TROCHA",
					"CAMINO VECINAL"
				],
				valor: e.claseVia,
				onChange: (v) => pon("claseVia", v)
			}),
			/* @__PURE__ */ jsx(Chips, {
				etiqueta: "Material de la vía",
				opciones: [
					"ASFALTO",
					"CONCRETO",
					"AFIRMADO",
					"TIERRA",
					"ADOQUÍN"
				],
				valor: e.materialVia,
				onChange: (v) => pon("materialVia", v)
			}),
			/* @__PURE__ */ jsx(Chips, {
				etiqueta: "Uso del entorno",
				opciones: [
					"RESIDENCIAL",
					"AGRÍCOLA",
					"COMERCIAL",
					"INDUSTRIAL",
					"MIXTO"
				],
				valor: e.usoEntorno,
				onChange: (v) => pon("usoEntorno", v)
			}),
			/* @__PURE__ */ jsx(AreaTexto, {
				etiqueta: "Observaciones",
				valor: e.observaciones,
				onChange: (v) => pon("observaciones", v)
			}),
			/* @__PURE__ */ jsx(Fotos, {
				etiqueta: "Fotos del entorno",
				maximo: 6,
				contexto,
				gps
			})
		]
	});
}
//#endregion
export { CaracterizacionCampo as component };
