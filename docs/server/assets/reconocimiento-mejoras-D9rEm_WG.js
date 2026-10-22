import { t as antesDe } from "./cartera-B4-YODri.js";
import { t as CarteraModulo } from "./CarteraModulo-DTs_wGg3.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { ClipboardList, Hammer, HousePlus } from "lucide-react";
//#region src/routes/reconocimiento-mejoras.tsx?tsr-split=component
var SITUACIONES = {
	INVENTARIO: {
		texto: "Inventario y avisos",
		tono: "neutral"
	},
	VALORIZADO: {
		texto: "Mejoras valorizadas",
		tono: "warning"
	},
	RECONOCIDO: {
		texto: "Reconocidas o pagadas",
		tono: "success"
	}
};
/** Predios sin sujeto pasivo con ocupante: se reconocen mejoras y gastos de traslado (DCF 3.ª). */
function admite(f) {
	if (f.ruta !== "MEJORAS") return null;
	const situacion = antesDe(f, "Tasación") ? "INVENTARIO" : antesDe(f, "Devengado, pago o consignación") ? "VALORIZADO" : "RECONOCIDO";
	return {
		...f,
		situacion,
		detalle: f.hito
	};
}
function MejorasPage() {
	const navigate = useNavigate();
	const abrir = (ruta) => (f) => navigate({
		to: `/proyectos/$projectId/predios/$codigo/${ruta}`,
		params: {
			projectId: f.proyectoId,
			codigo: f.codigo
		}
	});
	return /* @__PURE__ */ jsx(CarteraModulo, {
		titulo: "Cartera de reconocimiento de mejoras",
		icono: HousePlus,
		base: "Disposición complementaria final 3.ª del TUO del DL 1192",
		admite,
		situaciones: SITUACIONES,
		acciones: [{
			nombre: "Avisos, oposiciones y pago",
			icono: Hammer,
			onClick: abrir("reconocimiento-mejoras")
		}, {
			nombre: "Caracterización (inventario)",
			icono: ClipboardList,
			onClick: abrir("caracterizacion-predio")
		}],
		onFilaClick: abrir("reconocimiento-mejoras"),
		archivo: "cartera-reconocimiento-mejoras",
		vacio: "Sus proyectos no tienen predios con reconocimiento de mejoras."
	});
}
//#endregion
export { MejorasPage as component };
