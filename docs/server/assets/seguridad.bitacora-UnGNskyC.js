import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { g as leerBitacora, l as MODULOS, m as cambiosEntre, p as BITACORA_EVENTO } from "./historial-Bc37nCTn.js";
import { E as Modal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Eye, ScrollText } from "lucide-react";
//#region src/routes/seguridad.bitacora.tsx?tsr-split=component
var TONO = {
	crear: "success",
	editar: "primary",
	anular: "destructive",
	eliminar: "destructive",
	transicion: "warning",
	generar: "primary",
	exportar: "neutral",
	enviar: "primary",
	acceso: "neutral",
	ingreso: "success",
	ingreso_fallido: "destructive",
	salida: "neutral"
};
function BitacoraPage() {
	const [filas, setFilas] = useState([]);
	const [detalle, setDetalle] = useState(null);
	useEffect(() => {
		const cargar = () => setFilas(leerBitacora().map((e) => ({
			...e,
			moduloNombre: `M${e.modulo} · ${MODULOS.find((m) => m.numero === e.modulo)?.nombre ?? "Sistema"}`
		})));
		cargar();
		window.addEventListener(BITACORA_EVENTO, cargar);
		window.addEventListener("storage", cargar);
		return () => {
			window.removeEventListener(BITACORA_EVENTO, cargar);
			window.removeEventListener("storage", cargar);
		};
	}, []);
	const modulosPresentes = [...new Set(filas.map((f) => f.moduloNombre))].sort().map((m) => ({
		valor: m,
		texto: m
	}));
	const cambios = detalle ? cambiosEntre(detalle.antes, detalle.despues) : [];
	return /* @__PURE__ */ jsxs(AppShell, { children: [/* @__PURE__ */ jsx(CrudPage, {
		titulo: "Bitácora de accesos y cambios",
		icono: ScrollText,
		descripcion: "Cada guardado, transición de estado, generación de documento y exportación deja una entrada. Solo lectura.",
		columnas: [
			{
				clave: "fecha",
				titulo: "Fecha y hora",
				ancho: "150px",
				render: (f) => fechaHora(f.fecha)
			},
			{
				clave: "usuario",
				titulo: "Usuario",
				ancho: "140px"
			},
			{
				clave: "moduloNombre",
				titulo: "Módulo"
			},
			{
				clave: "entidad",
				titulo: "Entidad",
				ancho: "120px"
			},
			{
				clave: "registro",
				titulo: "Registro"
			},
			{
				clave: "accion",
				titulo: "Acción",
				ancho: "120px",
				render: (f) => /* @__PURE__ */ jsx(StatusBadge, {
					tono: TONO[f.accion],
					children: f.accion
				})
			},
			{
				clave: "detalle",
				titulo: "Detalle"
			}
		],
		filas,
		claveFila: (f) => f.id,
		filtros: [{
			clave: "moduloNombre",
			etiqueta: "Módulo",
			opciones: modulosPresentes
		}, {
			clave: "accion",
			etiqueta: "Acción",
			opciones: Object.keys(TONO).map((a) => ({
				valor: a,
				texto: a
			}))
		}],
		buscarEn: [
			"usuario",
			"registro",
			"detalle",
			"entidad"
		],
		accionesFila: [{
			nombre: "Ver cambios",
			icono: Eye,
			onClick: setDetalle,
			visible: (f) => Boolean(f.antes || f.despues)
		}],
		onFilaClick: (f) => (f.antes || f.despues) && setDetalle(f),
		exportar: (v) => exportarExcel("bitacora", [
			{
				titulo: "Fecha y hora",
				valor: (f) => fechaHora(f.fecha)
			},
			{
				titulo: "Usuario",
				valor: (f) => f.usuario
			},
			{
				titulo: "Módulo",
				valor: (f) => f.moduloNombre
			},
			{
				titulo: "Entidad",
				valor: (f) => f.entidad
			},
			{
				titulo: "Registro",
				valor: (f) => f.registro
			},
			{
				titulo: "Acción",
				valor: (f) => f.accion
			},
			{
				titulo: "Detalle",
				valor: (f) => f.detalle ?? ""
			}
		], v),
		vacio: "Aún no hay entradas. La bitácora se llena a medida que se guardan registros en el sistema."
	}), /* @__PURE__ */ jsx(Modal, {
		abierto: detalle !== null,
		onCerrar: () => setDetalle(null),
		titulo: "Cambios registrados",
		descripcion: detalle ? `${fechaHora(detalle.fecha)} · ${detalle.usuario} · ${detalle.registro}` : void 0,
		children: /* @__PURE__ */ jsx(Tabla, {
			columnas: [
				{
					clave: "campo",
					titulo: "Campo",
					ancho: "160px"
				},
				{
					clave: "antes",
					titulo: "Antes",
					render: (c) => /* @__PURE__ */ jsx("span", {
						className: "break-all text-muted-foreground",
						children: formatear(c.antes)
					})
				},
				{
					clave: "despues",
					titulo: "Después",
					render: (c) => /* @__PURE__ */ jsx("span", {
						className: "break-all font-medium",
						children: formatear(c.despues)
					})
				}
			],
			filas: cambios,
			claveFila: (c) => c.campo,
			vacio: "Sin diferencias campo a campo (la entrada registra solo la acción)."
		})
	})] });
}
function formatear(v) {
	if (v == null || v === "") return "(vacío)";
	if (typeof v === "object") return JSON.stringify(v);
	return String(v);
}
//#endregion
export { BitacoraPage as component };
