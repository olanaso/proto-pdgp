import { r as ultimoRegistro, t as antesDe } from "./cartera-B4-YODri.js";
import { t as CarteraModulo } from "./CarteraModulo-DTs_wGg3.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { FileCheck, FileWarning, Landmark } from "lucide-react";
//#region src/routes/regularizacion.tsx?tsr-split=component
var SITUACIONES = {
	DISCREPANCIAS: {
		texto: "Con discrepancias abiertas",
		tono: "destructive"
	},
	SANEAMIENTO: {
		texto: "Saneamiento registral en curso",
		tono: "warning"
	},
	SIN_PARTIDA: {
		texto: "Sin partida registral",
		tono: "neutral"
	}
};
/**
* Predios que necesitan regularizar su condición técnico-legal antes de adquirirse: discrepancias técnicas,
* legales o registrales sin resolver, saneamiento en curso, o sin partida registral (inmatriculación)
* cuando aún no tienen resolución de adquisición.
*/
function admite(f) {
	const abiertas = (ultimoRegistro(`discrepancias-${f.codigo}`) ?? []).filter((d) => d.estado !== "Resuelta").length;
	if (abiertas) return {
		...f,
		situacion: "DISCREPANCIAS",
		detalle: `${abiertas} ${abiertas === 1 ? "discrepancia" : "discrepancias"} sin resolver`
	};
	if (ultimoRegistro(`saneamiento-registral-${f.codigo}`)) return {
		...f,
		situacion: "SANEAMIENTO",
		detalle: ""
	};
	if ([
		"TRATO_DIRECTO",
		"EXPROPIACION",
		"PENDIENTE"
	].includes(f.ruta) && !f.part?.trim() && antesDe(f, "Resolución de adquisición")) return {
		...f,
		situacion: "SIN_PARTIDA",
		detalle: "Requiere inmatriculación o saneamiento"
	};
	return null;
}
function RegularizacionPage() {
	const navigate = useNavigate();
	const abrir = (ruta) => (f) => navigate({
		to: `/proyectos/$projectId/predios/$codigo/${ruta}`,
		params: {
			projectId: f.proyectoId,
			codigo: f.codigo
		}
	});
	return /* @__PURE__ */ jsx(CarteraModulo, {
		titulo: "Cartera de regularización",
		icono: FileCheck,
		base: "Saneamiento previo a la adquisición, art. 6 y 16 del TUO del DL 1192",
		admite,
		situaciones: SITUACIONES,
		acciones: [{
			nombre: "Discrepancias",
			icono: FileWarning,
			onClick: abrir("discrepancias")
		}, {
			nombre: "Saneamiento registral",
			icono: Landmark,
			onClick: abrir("saneamiento-registral")
		}],
		onFilaClick: (f) => f.situacion === "SANEAMIENTO" ? abrir("saneamiento-registral")(f) : abrir("discrepancias")(f),
		archivo: "cartera-regularizacion",
		vacio: "Sus proyectos no tienen predios por regularizar.",
		nota: "«Sin partida registral» toma los predios en trato directo, expropiación o por definir que no tienen partida en el padrón y aún no tienen resolución de adquisición."
	});
}
//#endregion
export { RegularizacionPage as component };
