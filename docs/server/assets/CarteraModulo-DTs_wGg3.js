import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { i as useCartera } from "./cartera-B4-YODri.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/kit/CarteraModulo.tsx
/**
* Cartera de un módulo de gestión (M13, M17 a M21): los predios de los proyectos asignados al usuario que
* están en la etapa del módulo, con su situación, filtro por proyecto y por situación, y las acciones que
* abren las pantallas del predio. Cada módulo define qué predios admite y en qué situación quedan.
*/
function CarteraModulo({ titulo, icono, base, admite, situaciones, acciones, onFilaClick, archivo, vacio, nota }) {
	const cartera = useCartera(useUsuarioSesion()?.nombre ?? "", admite);
	const filas = cartera.filas;
	const resumen = Object.entries(situaciones).map(([k, s]) => [filas.filter((f) => f.situacion === k).length, s.texto]).filter(([n]) => n > 0).map(([n, t]) => `${t}: ${n}`).join(" · ");
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		cartera.sinBrigada && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Sin brigada asignada: se muestran los predios de todos los proyectos (demostración). La asignación se hace en Equipos y brigadas de cada proyecto."
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo,
			icono,
			descripcion: `${resumen || "Sin predios en esta etapa"}. ${base}.`,
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
							tono: situaciones[f.situacion]?.tono ?? "neutral",
							children: situaciones[f.situacion]?.texto ?? f.situacion
						}), f.detalle && /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: f.detalle
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
				opciones: Object.entries(situaciones).map(([valor, s]) => ({
					valor,
					texto: s.texto
				}))
			}],
			buscarEn: [
				"cod",
				"codigo",
				"suj",
				"exp",
				"proyectoNombre"
			],
			accionesFila: acciones,
			onFilaClick,
			exportar: (visibles) => exportarExcel(archivo, [
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
					valor: (f) => situaciones[f.situacion]?.texto ?? f.situacion
				},
				{
					titulo: "Detalle",
					valor: (f) => f.detalle
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
			vacio: cartera.proyectos ? vacio : "No tiene proyectos asignados."
		}),
		nota && /* @__PURE__ */ jsx("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: nota
		})
	] });
}
//#endregion
export { CarteraModulo as t };
