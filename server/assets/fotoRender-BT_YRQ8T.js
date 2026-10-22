import { createElement, useId } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region src/lib/fotoModelo.ts
/**
* Colores de anotación. Son datos de la foto, no del tema: se dibujan dentro de la imagen exportada,
* donde no llegan las variables CSS. Rojo gob.pe y tonos de alto contraste sobre fotografía.
*/
var COLORES = {
	rojo: "rgb(200, 16, 46)",
	ambar: "rgb(250, 204, 21)",
	verde: "rgb(22, 163, 74)",
	azul: "rgb(37, 99, 235)",
	blanco: "rgb(255, 255, 255)",
	negro: "rgb(17, 17, 17)",
	morado: "rgb(76, 29, 149)"
};
var NOMBRE_COLOR = {
	rojo: "Rojo",
	ambar: "Ámbar",
	verde: "Verde",
	azul: "Azul",
	blanco: "Blanco",
	negro: "Negro",
	morado: "Morado"
};
/** Texto legible sobre un fondo de ese color. */
var contraste = (c) => c === "ambar" || c === "blanco" ? COLORES.negro : COLORES.blanco;
var ESTILO_BASE = {
	color: "rojo",
	grosor: 6,
	trazo: "continuo",
	relleno: 0,
	opacidad: 100
};
function estampaPorDefecto() {
	return {
		visible: true,
		posicion: "inferior-izquierda",
		campos: {
			fecha: true,
			hora: true,
			utm: true,
			km: true,
			titulo: false
		},
		tamano: 22,
		fondo: "claro",
		opacidad: 92
	};
}
var ajustesBase = () => ({
	rotacion: 0,
	brillo: 0,
	contraste: 0
});
var idAnot = () => `a-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
/** Ancho y alto de la imagen girada. */
function dimensiones(f) {
	const girada = f.ajustes.rotacion === 90 || f.ajustes.rotacion === 270;
	return {
		W: girada ? f.original.alto : f.original.ancho,
		H: girada ? f.original.ancho : f.original.alto
	};
}
/** Ventana visible: el recorte, o toda la imagen girada. */
function visible(f) {
	const { W, H } = dimensiones(f);
	return f.ajustes.recorte ?? {
		x: 0,
		y: 0,
		w: W,
		h: H
	};
}
/** Escala de trazo: 1 unidad de grosor por cada 1000 px de ancho de la imagen girada. */
var unidad = (f) => dimensiones(f).W / 1e3;
/** Gira 90° (horario) todos los puntos de las anotaciones. W y H son las medidas antes de girar. */
function girarAnotaciones(lista, W, H) {
	const p = (q) => ({
		x: H - q.y,
		y: q.x
	});
	return lista.map((a) => {
		switch (a.tipo) {
			case "texto":
			case "norte": {
				const n = p(a);
				return a.tipo === "norte" ? {
					...a,
					...n,
					rotacion: (a.rotacion + 90) % 360
				} : {
					...a,
					...n
				};
			}
			case "linea":
			case "flecha":
			case "cota": return {
				...a,
				puntos: [p(a.puntos[0]), p(a.puntos[1])]
			};
			case "rectangulo":
			case "elipse": return {
				...a,
				x: H - (a.y + a.h),
				y: a.x,
				w: a.h,
				h: a.w
			};
			case "polilinea": return {
				...a,
				puntos: a.puntos.map(p)
			};
			default: return a;
		}
	});
}
var distancia = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
/** Área de un polígono (fórmula del área de Gauss), en px². */
function areaPoligono(puntos) {
	let s = 0;
	for (let i = 0; i < puntos.length; i++) {
		const a = puntos[i];
		const b = puntos[(i + 1) % puntos.length];
		s += a.x * b.y - b.x * a.y;
	}
	return Math.abs(s) / 2;
}
function centroide(puntos) {
	const n = puntos.length || 1;
	return {
		x: puntos.reduce((t, p) => t + p.x, 0) / n,
		y: puntos.reduce((t, p) => t + p.y, 0) / n
	};
}
var num = (n) => n.toLocaleString("es-PE", {
	maximumFractionDigits: 2,
	minimumFractionDigits: 2
});
/** Texto que se muestra en una anotación: el escrito, o la medida estimada con la escala de la foto. */
function textoDe(f, a) {
	const k = f.escala?.metrosPorPx;
	if (a.tipo === "cota" && a.auto && k && f.escala?.anotacion !== a.id) return `≈ ${num(distancia(a.puntos[0], a.puntos[1]) * k)} m`;
	if (a.tipo === "polilinea" && a.cerrada || a.tipo === "rectangulo" || a.tipo === "elipse") {
		if (a.mostrarArea && k) {
			const area = `≈ ${num((a.tipo === "polilinea" ? areaPoligono(a.puntos) : a.tipo === "rectangulo" ? a.w * a.h : Math.PI * a.w * a.h / 4) * k * k)} m²`;
			return a.texto ? `${a.texto} · ${area}` : area;
		}
	}
	return "texto" in a ? a.texto : "";
}
/** Metros que dice el texto de una cota ("2.60 m", "2,6") o null. */
function metrosDeTexto(t) {
	const m = t.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
	const v = m ? Number(m[1]) : NaN;
	return Number.isFinite(v) && v > 0 ? v : null;
}
var OVERLAYS = [
	{
		clave: "observacion",
		nombre: "Observación",
		color: "rojo"
	},
	{
		clave: "conforme",
		nombre: "Conforme",
		color: "verde"
	},
	{
		clave: "flecha_nota",
		nombre: "Flecha con nota",
		color: "ambar"
	},
	{
		clave: "cota",
		nombre: "Cota",
		color: "ambar"
	},
	{
		clave: "zona",
		nombre: "Zona resaltada",
		color: "ambar"
	},
	{
		clave: "franja",
		nombre: "Franja de título",
		color: "negro"
	},
	{
		clave: "marca_agua",
		nombre: "Marca de agua",
		color: "blanco"
	},
	{
		clave: "norte",
		nombre: "Norte",
		color: "rojo"
	},
	{
		clave: "antes",
		nombre: "Antes",
		color: "negro"
	},
	{
		clave: "despues",
		nombre: "Después",
		color: "azul"
	}
];
/**
* Anotación lista para el overlay pedido, centrada en la parte visible. La marca de agua no es una
* anotación: la pantalla la activa en `foto.marcaAgua` (devuelve null).
*/
function anotacionDeOverlay(f, o) {
	const v = visible(f);
	const cx = v.x + v.w / 2;
	const cy = v.y + v.h / 2;
	const w = v.w * .28;
	const h = v.h * .22;
	const est = (color, extra = {}) => ({
		...ESTILO_BASE,
		color,
		...extra
	});
	const id = idAnot();
	switch (o) {
		case "observacion":
		case "conforme": return {
			id,
			tipo: "rectangulo",
			x: cx - w / 2,
			y: cy - h / 2,
			w,
			h,
			texto: o === "observacion" ? "OBSERVACIÓN" : "CONFORME",
			tamano: 26,
			estilo: est(o === "observacion" ? "rojo" : "verde")
		};
		case "flecha_nota": return {
			id,
			tipo: "flecha",
			puntos: [{
				x: cx - w,
				y: cy - h
			}, {
				x: cx,
				y: cy
			}],
			texto: "Nota",
			tamano: 28,
			extremos: ["ninguno", "flecha"],
			estilo: est("ambar")
		};
		case "cota": return {
			id,
			tipo: "cota",
			puntos: [{
				x: cx - w / 2,
				y: cy
			}, {
				x: cx + w / 2,
				y: cy
			}],
			texto: "0.00 m",
			tamano: 30,
			extremos: ["tope", "tope"],
			estilo: est("ambar")
		};
		case "zona": return {
			id,
			tipo: "polilinea",
			puntos: [
				{
					x: cx - w / 2,
					y: cy - h / 2
				},
				{
					x: cx + w / 2,
					y: cy - h / 3
				},
				{
					x: cx + w / 2.5,
					y: cy + h / 2
				},
				{
					x: cx - w / 2,
					y: cy + h / 2.5
				}
			],
			cerrada: true,
			texto: "",
			tamano: 26,
			estilo: est("ambar", {
				relleno: 20,
				trazo: "guiones"
			})
		};
		case "franja": return {
			id,
			tipo: "franja",
			posicion: "inferior",
			texto: f.titulo.toUpperCase(),
			tamano: 26,
			estilo: est("negro", { relleno: 70 })
		};
		case "antes":
		case "despues": return {
			id,
			tipo: "franja",
			posicion: "superior",
			texto: o === "antes" ? "ANTES" : "DESPUÉS",
			tamano: 30,
			estilo: est(o === "antes" ? "negro" : "azul", { relleno: 85 })
		};
		case "norte": return {
			id,
			tipo: "norte",
			x: v.x + v.w * .9,
			y: v.y + v.h * .14,
			rotacion: 0,
			tamano: 60,
			estilo: est("rojo", { relleno: 100 })
		};
		case "marca_agua": return null;
	}
}
/** Medidas en pantalla de un SVG para pasar de un clic a coordenadas de la imagen girada. */
function aCoordenadas(svg, clientX, clientY) {
	const m = svg.getScreenCTM();
	if (!m) return {
		x: 0,
		y: 0
	};
	const p = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
	return {
		x: p.x,
		y: p.y
	};
}
/** Píxeles de pantalla por píxel de imagen (para dibujar asas de tamaño constante). */
function escalaPantalla(svg) {
	const m = svg?.getScreenCTM();
	return m ? m.a || 1 : 1;
}
//#endregion
//#region src/components/foto/FotoSvg.tsx
/**
* Dibujo de una foto con sus ediciones, en SVG. Es el único dibujo: el editor lo muestra (con su capa de
* asas encima), la galería y el visor también, y la descarga y el panel fotográfico lo pasan a JPEG
* (`lib/fotoRender.ts`). Coordenadas: las de la imagen girada; el recorte es el `viewBox`.
*/
function FotoSvg({ foto, src, className, verOriginal = false, children, refSvg, onPointerDown, onPointerMove, onPointerUp, onDoubleClick, style }) {
	const v = visible(foto);
	return /* @__PURE__ */ jsxs("svg", {
		ref: refSvg,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: `${v.x} ${v.y} ${v.w} ${v.h}`,
		width: v.w,
		height: v.h,
		className,
		style,
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onDoubleClick,
		role: "img",
		"aria-label": foto.titulo,
		children: [/* @__PURE__ */ jsx(FotoContenido, {
			foto,
			src,
			verOriginal
		}), children]
	});
}
/** Imagen girada con sus ajustes, anotaciones, marca de agua y estampa. */
function FotoContenido({ foto, src, verOriginal = false }) {
	const filtroId = useId().replace(/:/g, "");
	const { ancho: W0, alto: H0 } = foto.original;
	const { rotacion, brillo, contraste: ctr } = foto.ajustes;
	const giro = rotacion === 90 ? `translate(${H0} 0) rotate(90)` : rotacion === 180 ? `translate(${W0} ${H0}) rotate(180)` : rotacion === 270 ? `translate(0 ${W0}) rotate(270)` : void 0;
	const pendiente = 1 + ctr / 100;
	const intercepto = .5 * (1 - pendiente) + brillo / 100;
	const conFiltro = !verOriginal && (brillo !== 0 || ctr !== 0);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		conFiltro && /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("filter", {
			id: filtroId,
			colorInterpolationFilters: "sRGB",
			children: /* @__PURE__ */ jsxs("feComponentTransfer", { children: [
				/* @__PURE__ */ jsx("feFuncR", {
					type: "linear",
					slope: pendiente,
					intercept: intercepto
				}),
				/* @__PURE__ */ jsx("feFuncG", {
					type: "linear",
					slope: pendiente,
					intercept: intercepto
				}),
				/* @__PURE__ */ jsx("feFuncB", {
					type: "linear",
					slope: pendiente,
					intercept: intercepto
				})
			] })
		}) }),
		/* @__PURE__ */ jsx("g", {
			transform: giro,
			children: /* @__PURE__ */ jsx("image", {
				href: src,
				x: 0,
				y: 0,
				width: W0,
				height: H0,
				preserveAspectRatio: "none",
				filter: conFiltro ? `url(#${filtroId})` : void 0
			})
		}),
		!verOriginal && /* @__PURE__ */ jsxs(Fragment$1, { children: [
			foto.anotaciones.filter((a) => a.tipo !== "franja").map((a) => /* @__PURE__ */ jsx(DibujoAnotacion, {
				foto,
				a
			}, a.id)),
			foto.marcaAgua?.visible && /* @__PURE__ */ jsx(DibujoMarcaAgua, { foto }),
			foto.anotaciones.filter((a) => a.tipo === "franja").map((a) => /* @__PURE__ */ jsx(DibujoAnotacion, {
				foto,
				a
			}, a.id)),
			foto.estampa?.visible && /* @__PURE__ */ jsx(DibujoEstampa, { foto })
		] })
	] });
}
var FUENTE = "Inter, Arial, Helvetica, sans-serif";
/** Ancho aproximado de un texto (sin medir en el DOM: el dibujo debe servir también para exportar). */
var anchoTexto = (t, tam) => t.length * tam * .56;
function trazo(e, u) {
	const g = e.grosor * u;
	return {
		stroke: COLORES[e.color],
		strokeWidth: g,
		strokeOpacity: e.opacidad / 100,
		strokeDasharray: e.trazo === "guiones" ? `${g * 3} ${g * 2}` : e.trazo === "puntos" ? `0 ${g * 2}` : void 0,
		strokeLinecap: e.trazo === "puntos" ? "round" : "butt",
		strokeLinejoin: "round"
	};
}
/** Etiqueta con fondo de color (cotas, títulos de rectángulo, notas). */
function Etiqueta({ x, y, texto, tam, estilo, ancla = "middle" }) {
	if (!texto) return null;
	const w = anchoTexto(texto, tam) + tam * .9;
	const h = tam * 1.5;
	const x0 = ancla === "middle" ? x - w / 2 : x;
	return /* @__PURE__ */ jsxs("g", {
		opacity: estilo.opacidad / 100,
		children: [/* @__PURE__ */ jsx("rect", {
			x: x0,
			y: y - h / 2,
			width: w,
			height: h,
			rx: tam * .3,
			fill: COLORES[estilo.color]
		}), /* @__PURE__ */ jsx("text", {
			x: x0 + w / 2,
			y,
			fontFamily: FUENTE,
			fontWeight: 700,
			fontSize: tam,
			fill: contraste(estilo.color),
			textAnchor: "middle",
			dominantBaseline: "central",
			children: texto
		})]
	});
}
/** Texto suelto legible sobre cualquier fondo: borde contrastante pintado debajo del relleno. */
function TextoHalo({ x, y, texto, tam, estilo, ancla = "middle" }) {
	if (!texto) return null;
	return /* @__PURE__ */ jsx("text", {
		x,
		y,
		fontFamily: FUENTE,
		fontWeight: 700,
		fontSize: tam,
		fill: COLORES[estilo.color],
		fillOpacity: estilo.opacidad / 100,
		stroke: contraste(estilo.color),
		strokeOpacity: .55 * (estilo.opacidad / 100),
		strokeWidth: tam * .12,
		paintOrder: "stroke",
		textAnchor: ancla,
		dominantBaseline: "central",
		children: texto
	});
}
function Extremo_({ en, desde, tipo, u, estilo }) {
	if (tipo === "ninguno") return null;
	const ang = Math.atan2(en.y - desde.y, en.x - desde.x);
	const g = Math.max(estilo.grosor, 2) * u;
	if (tipo === "tope") {
		const l = g * 3;
		const dx = Math.cos(ang + Math.PI / 2) * l;
		const dy = Math.sin(ang + Math.PI / 2) * l;
		return /* @__PURE__ */ jsx("line", {
			x1: en.x - dx,
			y1: en.y - dy,
			x2: en.x + dx,
			y2: en.y + dy,
			stroke: COLORES[estilo.color],
			strokeWidth: g,
			strokeOpacity: estilo.opacidad / 100
		});
	}
	const l = g * 4.5;
	const a1 = ang + Math.PI - .45;
	const a2 = ang + Math.PI + .45;
	return /* @__PURE__ */ jsx("polygon", {
		points: [
			en,
			{
				x: en.x + Math.cos(a1) * l,
				y: en.y + Math.sin(a1) * l
			},
			{
				x: en.x + Math.cos(a2) * l,
				y: en.y + Math.sin(a2) * l
			}
		].map((p) => `${p.x},${p.y}`).join(" "),
		fill: COLORES[estilo.color],
		fillOpacity: estilo.opacidad / 100
	});
}
function DibujoAnotacion({ foto, a }) {
	const u = unidad(foto);
	const v = visible(foto);
	const t = textoDe(foto, a);
	const relleno = (e) => ({
		fill: e.relleno > 0 ? COLORES[e.color] : "none",
		fillOpacity: e.relleno / 100 * (e.opacidad / 100)
	});
	switch (a.tipo) {
		case "texto": return a.fondo ? /* @__PURE__ */ jsx(Etiqueta, {
			x: a.x,
			y: a.y,
			texto: a.texto,
			tam: a.tamano * u,
			estilo: a.estilo,
			ancla: "start"
		}) : /* @__PURE__ */ jsx(TextoHalo, {
			x: a.x,
			y: a.y,
			texto: a.texto,
			tam: a.tamano * u,
			estilo: a.estilo,
			ancla: "start"
		});
		case "linea":
		case "flecha":
		case "cota": {
			const [p, q] = a.puntos;
			const medio = {
				x: (p.x + q.x) / 2,
				y: (p.y + q.y) / 2
			};
			return /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsx("line", {
					x1: p.x,
					y1: p.y,
					x2: q.x,
					y2: q.y,
					...trazo(a.estilo, u)
				}),
				/* @__PURE__ */ jsx(Extremo_, {
					en: p,
					desde: q,
					tipo: a.extremos[0],
					u,
					estilo: a.estilo
				}),
				/* @__PURE__ */ jsx(Extremo_, {
					en: q,
					desde: p,
					tipo: a.extremos[1],
					u,
					estilo: a.estilo
				}),
				a.tipo === "cota" ? /* @__PURE__ */ jsx(Etiqueta, {
					x: medio.x,
					y: medio.y,
					texto: t,
					tam: a.tamano * u,
					estilo: a.estilo
				}) : t && /* @__PURE__ */ jsx(Etiqueta, {
					x: p.x,
					y: p.y - a.tamano * u,
					texto: t,
					tam: a.tamano * u,
					estilo: a.estilo
				})
			] });
		}
		case "rectangulo":
		case "elipse": return /* @__PURE__ */ jsxs("g", { children: [a.tipo === "rectangulo" ? /* @__PURE__ */ jsx("rect", {
			x: a.x,
			y: a.y,
			width: a.w,
			height: a.h,
			...trazo(a.estilo, u),
			...relleno(a.estilo)
		}) : /* @__PURE__ */ jsx("ellipse", {
			cx: a.x + a.w / 2,
			cy: a.y + a.h / 2,
			rx: a.w / 2,
			ry: a.h / 2,
			...trazo(a.estilo, u),
			...relleno(a.estilo)
		}), t && /* @__PURE__ */ jsx(Etiqueta, {
			x: a.x,
			y: a.y - a.tamano * u * .9,
			texto: t,
			tam: a.tamano * u,
			estilo: a.estilo,
			ancla: "start"
		})] });
		case "polilinea": {
			const pts = a.puntos.map((p) => `${p.x},${p.y}`).join(" ");
			const c = centroide(a.puntos);
			return /* @__PURE__ */ jsxs("g", { children: [a.cerrada ? /* @__PURE__ */ jsx("polygon", {
				points: pts,
				...trazo(a.estilo, u),
				...relleno(a.estilo)
			}) : /* @__PURE__ */ jsx("polyline", {
				points: pts,
				...trazo(a.estilo, u),
				fill: "none"
			}), t && /* @__PURE__ */ jsx(TextoHalo, {
				x: c.x,
				y: c.y,
				texto: t,
				tam: a.tamano * u,
				estilo: {
					...a.estilo,
					color: a.estilo.color === "blanco" ? "negro" : "blanco"
				}
			})] });
		}
		case "franja": {
			const tam = a.tamano * (v.w / 1e3);
			const h = tam * 2;
			const y = a.posicion === "inferior" ? v.y + v.h - h : v.y;
			return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("rect", {
				x: v.x,
				y,
				width: v.w,
				height: h,
				fill: COLORES[a.estilo.color],
				fillOpacity: Math.max(a.estilo.relleno, 30) / 100 * (a.estilo.opacidad / 100)
			}), /* @__PURE__ */ jsx("text", {
				x: v.x + v.w / 2,
				y: y + h / 2,
				fontFamily: FUENTE,
				fontWeight: 800,
				fontSize: tam,
				fill: contraste(a.estilo.color),
				textAnchor: "middle",
				dominantBaseline: "central",
				letterSpacing: tam * .04,
				children: a.texto
			})] });
		}
		case "norte": {
			const s = a.tamano * u;
			return /* @__PURE__ */ jsxs("g", {
				transform: `translate(${a.x} ${a.y}) rotate(${a.rotacion})`,
				opacity: a.estilo.opacidad / 100,
				children: [/* @__PURE__ */ jsx("polygon", {
					points: `0,${-s * .6} ${s * .4},${s * .3} 0,${s * .12} ${-s * .4},${s * .3}`,
					fill: COLORES[a.estilo.color],
					stroke: COLORES.blanco,
					strokeWidth: s * .05
				}), /* @__PURE__ */ jsx("text", {
					y: s * .75,
					fontFamily: FUENTE,
					fontWeight: 800,
					fontSize: s * .4,
					fill: COLORES.blanco,
					stroke: COLORES.negro,
					strokeOpacity: .5,
					strokeWidth: s * .03,
					paintOrder: "stroke",
					textAnchor: "middle",
					dominantBaseline: "central",
					children: "N"
				})]
			});
		}
	}
}
function DibujoMarcaAgua({ foto }) {
	const m = foto.marcaAgua;
	const v = visible(foto);
	const tam = m.tamano * (v.w / 1e3);
	const cx = v.x + v.w / 2;
	const cy = m.posicion === "inferior" ? v.y + v.h * .82 : v.y + v.h / 2;
	return /* @__PURE__ */ jsx("text", {
		x: cx,
		y: cy,
		transform: m.posicion === "diagonal" ? `rotate(-18 ${cx} ${cy})` : void 0,
		fontFamily: FUENTE,
		fontWeight: 800,
		fontSize: tam,
		fill: COLORES.blanco,
		fillOpacity: m.opacidad / 100,
		stroke: COLORES.negro,
		strokeOpacity: m.opacidad / 100 * .35,
		strokeWidth: tam * .03,
		paintOrder: "stroke",
		textAnchor: "middle",
		dominantBaseline: "central",
		letterSpacing: tam * .03,
		children: m.texto
	});
}
/** Panel de datos de la toma: fecha, hora, UTM, km y título. */
function DibujoEstampa({ foto }) {
	const e = foto.estampa;
	const v = visible(foto);
	const m = foto.metadatos;
	const lineas = [];
	if (e.campos.titulo && foto.titulo) lineas.push({
		simbolo: "■",
		texto: foto.titulo
	});
	if (e.campos.fecha && m.fecha) lineas.push({
		simbolo: "▣",
		texto: m.fecha.split("-").reverse().join("/")
	});
	if (e.campos.hora && m.hora) lineas.push({
		simbolo: "◷",
		texto: m.hora
	});
	if (e.campos.utm && m.utm) lineas.push({
		simbolo: "◉",
		texto: m.utm
	});
	if (e.campos.km && m.km) lineas.push({
		simbolo: "⚑",
		texto: `km ${m.km}`
	});
	if (lineas.length === 0) return null;
	const tam = e.tamano * (v.w / 1e3);
	const alto = tam * 1.45;
	const pad = tam * .7;
	const w = Math.max(...lineas.map((l) => anchoTexto(l.texto, tam))) + tam * 1.6 + pad * 2;
	const h = lineas.length * alto + pad * 2 - (alto - tam);
	const margen = v.w * .02;
	const derecha = e.posicion.endsWith("derecha");
	const abajo = e.posicion.startsWith("inferior");
	const franja = foto.anotaciones.find((a) => a.tipo === "franja" && a.posicion === (abajo ? "inferior" : "superior"));
	const desplaza = franja && franja.tipo === "franja" ? franja.tamano * (v.w / 1e3) * 2 : 0;
	const x = derecha ? v.x + v.w - margen - w : v.x + margen;
	const y = abajo ? v.y + v.h - margen - h - desplaza : v.y + margen + desplaza;
	const claro = e.fondo === "claro";
	const fondo = claro ? COLORES.blanco : COLORES.negro;
	const tinta = claro ? COLORES.negro : COLORES.blanco;
	return /* @__PURE__ */ jsxs("g", {
		opacity: e.opacidad / 100,
		children: [/* @__PURE__ */ jsx("rect", {
			x,
			y,
			width: w,
			height: h,
			rx: tam * .45,
			fill: fondo,
			fillOpacity: .88
		}), lineas.map((l, i) => {
			const cy = y + pad + tam / 2 + i * alto;
			return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("text", {
				x: x + pad,
				y: cy,
				fontFamily: FUENTE,
				fontSize: tam * .85,
				fill: tinta,
				fillOpacity: .75,
				dominantBaseline: "central",
				children: l.simbolo
			}), /* @__PURE__ */ jsx("text", {
				x: x + pad + tam * 1.4,
				y: cy,
				fontFamily: FUENTE,
				fontWeight: 600,
				fontSize: tam,
				fill: tinta,
				dominantBaseline: "central",
				children: l.texto
			})] }, l.simbolo + i);
		})]
	});
}
//#endregion
//#region src/lib/fotoRender.ts
/** Tope del lado mayor al dibujar en canvas: algunos navegadores fallan por encima de 4000 px. */
var LADO_MAXIMO = 4e3;
var aDataUrl = (blob) => new Promise((resolver, rechazar) => {
	const r = new FileReader();
	r.onload = () => resolver(String(r.result));
	r.onerror = () => rechazar(/* @__PURE__ */ new Error("No se pudo leer la foto."));
	r.readAsDataURL(blob);
});
var cargarImagen = (src) => new Promise((resolver, rechazar) => {
	const img = new Image();
	img.onload = () => resolver(img);
	img.onerror = () => rechazar(/* @__PURE__ */ new Error("No se pudo dibujar la foto."));
	img.src = src;
});
/**
* Dibuja la foto con sus ediciones y la devuelve como JPEG. Usa el mismo SVG que se ve en pantalla
* (con el original incrustado), lo pasa a imagen y lo pinta en un canvas.
*/
async function renderizarFoto(foto, original, ladoMaximo = LADO_MAXIMO, calidad = .9) {
	const { renderToStaticMarkup } = await import("react-dom/server");
	const svg = renderToStaticMarkup(createElement(FotoSvg, {
		foto,
		src: await aDataUrl(original)
	}));
	const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
	try {
		const img = await cargarImagen(url);
		const v = visible(foto);
		const k = Math.min(1, ladoMaximo / Math.max(v.w, v.h));
		const canvas = document.createElement("canvas");
		canvas.width = Math.max(1, Math.round(v.w * k));
		canvas.height = Math.max(1, Math.round(v.h * k));
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Este navegador no permite dibujar la foto.");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		return await new Promise((resolver, rechazar) => canvas.toBlob((b) => b ? resolver(b) : rechazar(/* @__PURE__ */ new Error("No se pudo generar el JPEG.")), "image/jpeg", calidad));
	} finally {
		URL.revokeObjectURL(url);
	}
}
/** Imagen derecha y reducida a `ladoMaximo`, como JPEG. Las fotos de celular se enderezan aquí. */
async function reducirImagen(archivo, ladoMaximo, calidad = .9) {
	let bitmap;
	try {
		bitmap = await createImageBitmap(archivo, { imageOrientation: "from-image" });
	} catch {
		throw new Error("El navegador no puede abrir este formato. Si es HEIC (iPhone), expórtelo como JPG e inténtelo de nuevo.");
	}
	const k = Math.min(1, ladoMaximo / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(bitmap.width * k));
	canvas.height = Math.max(1, Math.round(bitmap.height * k));
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Este navegador no permite procesar la foto.");
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();
	return {
		blob: await new Promise((resolver, rechazar) => canvas.toBlob((b) => b ? resolver(b) : rechazar(/* @__PURE__ */ new Error("No se pudo procesar la foto.")), "image/jpeg", calidad)),
		ancho: canvas.width,
		alto: canvas.height
	};
}
//#endregion
export { idAnot as _, COLORES as a, visible as b, OVERLAYS as c, anotacionDeOverlay as d, dimensiones as f, girarAnotaciones as g, estampaPorDefecto as h, FotoSvg as i, aCoordenadas as l, escalaPantalla as m, reducirImagen as n, ESTILO_BASE as o, distancia as p, renderizarFoto as r, NOMBRE_COLOR as s, LADO_MAXIMO as t, ajustesBase as u, metrosDeTexto as v, unidad as y };
