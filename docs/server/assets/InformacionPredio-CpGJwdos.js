import { m as fecha, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { ft as codigoAsignado, n as etiquetaProyecto, xt as useCodigos } from "./PredioEncabezado-FhqZ2Jv6.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { useEffect, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronUp } from "lucide-react";
//#region src/components/kit/InformacionPredio.tsx
function etiquetaInfraestructura(tipo) {
	if (tipo === "Aeroportuarios") return "AEROPORTUARIO";
	if (tipo === "Viales") return "VIAL";
	if (tipo === "Especiales") return "ESPECIAL";
	return String(tipo || "").toUpperCase();
}
function etiquetaGrupo(proyecto) {
	if (!proyecto) return "";
	const aeropuertos = proyecto.coordinacionPredial.match(/Aeropuertos\s+0?(\d+)/i);
	if (aeropuertos) return `GRUPO DE AEROPUERTOS ${aeropuertos[1]}`;
	const viales = proyecto.coordinacionGeneral.match(/Vial\s+0?(\d+)/i);
	if (viales) return `GRUPO DE PROYECTOS VIALES ${viales[1]}`;
	if (proyecto.coordinacionGeneral.toLowerCase().includes("proyectos viales y especiales")) return "GRUPO DE PROYECTOS VIALES Y ESPECIALES";
	return proyecto.coordinacionGeneral.toUpperCase();
}
var CLAVE_DETALLE = "pdgp-info-predio-detalle";
/** Par etiqueta / valor de solo lectura. */
function Dato({ etiqueta, valor }) {
	const texto = typeof valor === "string" ? valor || "Sin información" : valor;
	return /* @__PURE__ */ jsxs("div", {
		className: "grid grid-cols-1 gap-1 border-b border-border py-1.5 lg:grid-cols-12",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground lg:col-span-4",
			children: etiqueta
		}), /* @__PURE__ */ jsx("dd", {
			className: "min-w-0 truncate text-sm font-medium lg:col-span-8",
			title: typeof texto === "string" ? texto : void 0,
			children: texto
		})]
	});
}
/**
* «Información del predio» de solo lectura, igual en todos los formularios del predio: datos generales
* (infraestructura, grupo, proyecto, fecha, código, expediente, sección funcional, coordinación) y
* responsables. Muestra primero un resumen (código, proyecto, expediente, brigada); «Mostrar todo el
* detalle» despliega el resto. `datos` agrega pares propios del paso (sujeto pasivo, partida, oficina registral) en un
* tercer grupo; `brigada` reemplaza la brigada por defecto (la coordinación predial del proyecto).
*/
function InformacionPredio({ projectId, codigo, brigada, datos, tituloDatos = "Datos del paso", className }) {
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(codigo);
	const expediente = codigoAsignado(useCodigos(), codigo, "expediente") || predio?.exp || "Sin expediente";
	const brigadaTexto = brigada || proyecto?.coordinacionPredial || "Brigada predial";
	const [detalle, setDetalle] = useState(false);
	useEffect(() => {
		try {
			setDetalle(localStorage.getItem(CLAVE_DETALLE) === "si");
		} catch {}
	}, []);
	const alternar = () => setDetalle((d) => {
		try {
			localStorage.setItem(CLAVE_DETALLE, d ? "no" : "si");
		} catch {}
		return !d;
	});
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Información del predio",
		acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(StatusBadge, { children: "Solo lectura" }), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "ghost",
			size: "sm",
			onClick: alternar,
			"aria-expanded": detalle,
			children: [detalle ? /* @__PURE__ */ jsx(ChevronUp, { "aria-hidden": true }) : /* @__PURE__ */ jsx(ChevronDown, { "aria-hidden": true }), detalle ? "Mostrar solo el resumen" : "Mostrar todo el detalle"]
		})] }),
		className,
		children: !detalle ? /* @__PURE__ */ jsxs("dl", {
			className: "grid grid-cols-1 gap-x-8 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Código de predio",
					valor: predio?.cod || codigo
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Proyecto",
					valor: etiquetaProyecto(proyecto, projectId).toUpperCase()
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Expediente",
					valor: expediente
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Brigada responsable",
					valor: brigadaTexto
				})
			]
		}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: "Datos generales" }),
			/* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-1 gap-x-8 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Tipo de infraestructura",
						valor: etiquetaInfraestructura(proyecto?.tipo)
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Grupo",
						valor: etiquetaGrupo(proyecto)
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Proyecto",
						valor: etiquetaProyecto(proyecto, projectId).toUpperCase()
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Fecha actual",
						valor: fecha(/* @__PURE__ */ new Date())
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Código de predio",
						valor: predio?.cod || codigo
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Expediente",
						valor: expediente
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Sección funcional",
						valor: predio?.et || ""
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Coordinación",
						valor: proyecto?.coordinacionPredial || ""
					})
				]
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Responsables" }),
			/* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-1 gap-x-8 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Profesional legal",
						valor: predio?.rlegal || ""
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Profesional técnico",
						valor: predio?.rtec || ""
					}),
					/* @__PURE__ */ jsx(Dato, {
						etiqueta: "Brigada responsable",
						valor: brigadaTexto
					})
				]
			}),
			datos && datos.length > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Subtitulo, { children: tituloDatos }), /* @__PURE__ */ jsx("dl", {
				className: "grid grid-cols-1 gap-x-8 lg:grid-cols-2",
				children: datos.map((d) => /* @__PURE__ */ jsx(Dato, {
					etiqueta: d.etiqueta,
					valor: d.valor
				}, d.etiqueta))
			})] })
		] })
	});
}
//#endregion
export { InformacionPredio as t };
