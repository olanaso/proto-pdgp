import { r as ultimoRegistro } from "./cartera-B4-YODri.js";
import { t as CarteraModulo } from "./CarteraModulo-DTs_wGg3.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { ArrowUpFromLine, Banknote, Stamp } from "lucide-react";
//#region src/routes/gestion-resolucion.tsx?tsr-split=component
var SITUACIONES = {
	ACEPTADO: {
		texto: "Aceptó la carta: por resolver",
		tono: "primary"
	},
	EXPROPIACION: {
		texto: "Expropiación: norma de ejecución",
		tono: "destructive"
	},
	TASADO: {
		texto: "Tasado, sin aceptación registrada",
		tono: "neutral"
	}
};
/**
* Predios con tasación aprobada y sin resolución de adquisición: en trato directo, la aceptación de la
* carta abre la resolución (art. 20.4.a); en expropiación, la norma de ejecución (art. 27).
*/
function admite(f) {
	if (f.hito !== "Tasación") return null;
	if (f.ruta === "EXPROPIACION") return {
		...f,
		situacion: "EXPROPIACION",
		detalle: ""
	};
	if (f.ruta !== "TRATO_DIRECTO") return null;
	return ultimoRegistro(`respuesta-sujeto-pasivo-${f.codigo}`)?.form?.resultadoRespuesta === "ACEPTA" ? {
		...f,
		situacion: "ACEPTADO",
		detalle: "Aceptación registrada"
	} : {
		...f,
		situacion: "TASADO",
		detalle: "Falta la aceptación de la carta de intención"
	};
}
function ResolucionPage() {
	const navigate = useNavigate();
	const abrir = (ruta) => (f) => navigate({
		to: `/proyectos/$projectId/predios/$codigo/${ruta}`,
		params: {
			projectId: f.proyectoId,
			codigo: f.codigo
		}
	});
	return /* @__PURE__ */ jsx(CarteraModulo, {
		titulo: "Cartera de resoluciones",
		icono: Stamp,
		base: "Art. 20.4.a y 27 del TUO del DL 1192",
		admite,
		situaciones: SITUACIONES,
		acciones: [
			{
				nombre: "Certificación presupuestal (CCP)",
				icono: Banknote,
				onClick: abrir("certificacion-presupuestal-ccp")
			},
			{
				nombre: "Elevación del expediente",
				icono: ArrowUpFromLine,
				onClick: abrir("elevacion-expediente")
			},
			{
				nombre: "Resolución directoral",
				icono: Stamp,
				onClick: abrir("gestion-resolucion-rd")
			}
		],
		onFilaClick: abrir("gestion-resolucion-rd"),
		archivo: "cartera-resoluciones",
		vacio: "Sus proyectos no tienen predios tasados por resolver."
	});
}
//#endregion
export { ResolucionPage as component };
