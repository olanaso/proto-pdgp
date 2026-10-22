import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { i as useCartera, n as respuestaPendiente } from "./cartera-B4-YODri.js";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Eye, Gavel, MessageSquare } from "lucide-react";
//#region src/routes/expropiacion.tsx?tsr-split=component
var SITUACION = {
	EXPROPIACION: {
		texto: "En expropiación",
		tono: "destructive"
	},
	RECHAZO: {
		texto: "No acepta o no responde",
		tono: "destructive"
	},
	VENCIDA: {
		texto: "Plazo de respuesta vencido",
		tono: "warning"
	},
	ESPERANDO: {
		texto: "Esperando respuesta",
		tono: "neutral"
	}
};
/**
* La cartera de expropiación: los predios que ya van por esa ruta y los de trato directo con la carta de
* intención notificada y sin aceptación (esperando, con el plazo de 10 d.h. vencido o con rechazo), que
* son los que pueden pasar a expropiación (art. 20.5 y 26).
*/
var admite = (f) => {
	if (f.ruta === "EXPROPIACION") return {
		...f,
		situacion: "EXPROPIACION",
		plazoRespuesta: ""
	};
	if (f.ruta !== "TRATO_DIRECTO") return null;
	const r = respuestaPendiente(f.codigo);
	if (!r) return null;
	return {
		...f,
		plazoRespuesta: r.estado === "rechazo" ? `Respuesta registrada: ${r.resultado.toLowerCase()}` : !r.vence ? "" : r.restantes != null && r.restantes < 0 ? `Venció el ${fecha(r.vence)}` : `Vence el ${fecha(r.vence)} (${r.restantes} d.h.)`,
		situacion: r.estado === "rechazo" ? "RECHAZO" : r.estado === "vencida" ? "VENCIDA" : "ESPERANDO"
	};
};
function ExpropiacionPage() {
	const navigate = useNavigate();
	const cartera = useCartera(useUsuarioSesion()?.nombre ?? "", admite);
	const filas = cartera.filas;
	const cuenta = (s) => filas.filter((f) => f.situacion === s).length;
	const abrir = (ruta) => (f) => navigate({
		to: `/proyectos/$projectId/predios/$codigo/${ruta}`,
		params: {
			projectId: f.proyectoId,
			codigo: f.codigo
		}
	});
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		cartera.sinBrigada && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Sin brigada asignada: se muestran los predios de todos los proyectos (demostración). La asignación se hace en Equipos y brigadas de cada proyecto."
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Cartera de expropiación",
			icono: Gavel,
			descripcion: `${cuenta("EXPROPIACION")} en expropiación · ${cuenta("RECHAZO") + cuenta("VENCIDA")} para pasar a expropiación · ${cuenta("ESPERANDO")} esperando respuesta a la carta de intención. Art. 20.5, 24 a 38 del TUO del DL 1192.`,
			estado: cartera.cargando ? "cargando" : "listo",
			columnas: [
				{
					clave: "proyectoNombre",
					titulo: "Proyecto",
					ancho: "140px"
				},
				{
					clave: "cod",
					titulo: "Código de predio",
					ancho: "220px",
					render: (f) => /* @__PURE__ */ jsxs(Fragment, { children: [f.cod, f.codigo !== f.cod && /* @__PURE__ */ jsx("span", {
						className: "block text-xs text-muted-foreground",
						children: f.codigo
					})] })
				},
				{
					clave: "suj",
					titulo: "Sujeto pasivo"
				},
				{
					clave: "situacion",
					titulo: "Situación",
					render: (f) => /* @__PURE__ */ jsxs("span", {
						className: "flex flex-col items-start gap-0.5",
						children: [/* @__PURE__ */ jsx(StatusBadge, {
							tono: SITUACION[f.situacion].tono,
							children: SITUACION[f.situacion].texto
						}), f.plazoRespuesta && /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: f.plazoRespuesta
						})]
					})
				},
				{
					clave: "exp",
					titulo: "Expediente"
				},
				{
					clave: "valor",
					titulo: "Monto (S/)",
					alinear: "derecha"
				}
			],
			filas,
			claveFila: (f) => `${f.proyectoId}:${f.rowId}`,
			filtros: [{
				clave: "proyectoId",
				etiqueta: "Proyecto",
				opciones: cartera.opcionesProyecto
			}, {
				clave: "situacion",
				etiqueta: "Situación",
				opciones: Object.keys(SITUACION).map((s) => ({
					valor: s,
					texto: SITUACION[s].texto
				}))
			}],
			buscarEn: [
				"cod",
				"suj",
				"exp",
				"proyectoNombre"
			],
			accionesFila: [{
				nombre: "Procedimiento expropiatorio",
				icono: Eye,
				visible: (f) => f.situacion === "EXPROPIACION",
				onClick: abrir("expropiacion")
			}, {
				nombre: "Respuesta del sujeto pasivo",
				icono: MessageSquare,
				onClick: abrir("respuesta-sujeto-pasivo")
			}],
			onFilaClick: (f) => f.situacion === "EXPROPIACION" ? abrir("expropiacion")(f) : abrir("respuesta-sujeto-pasivo")(f),
			exportar: (visibles) => exportarExcel("cartera-expropiacion", [
				{
					titulo: "Proyecto",
					valor: (f) => f.proyectoNombre
				},
				{
					titulo: "Código de predio",
					valor: (f) => f.cod
				},
				{
					titulo: "Sujeto pasivo",
					valor: (f) => f.suj
				},
				{
					titulo: "Situación",
					valor: (f) => SITUACION[f.situacion].texto
				},
				{
					titulo: "Plazo de respuesta",
					valor: (f) => f.plazoRespuesta
				},
				{
					titulo: "Expediente",
					valor: (f) => f.exp
				},
				{
					titulo: "Monto (S/)",
					valor: (f) => f.valor
				}
			], visibles),
			vacio: cartera.proyectos ? "Sus proyectos no tienen predios en expropiación ni cartas de intención esperando respuesta." : "No tiene proyectos asignados."
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: "«Esperando respuesta» sale de la fecha de notificación de la carta registrada en Respuesta del sujeto pasivo; la aceptación saca al predio de esta cartera. El paso a expropiación se decide en esa pantalla (exige ley autoritativa vigente, art. 25)."
		})
	] });
}
//#endregion
export { ExpropiacionPage as component };
