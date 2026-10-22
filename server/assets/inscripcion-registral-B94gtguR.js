import { t as CarteraModulo } from "./CarteraModulo-DTs_wGg3.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { BookOpenCheck, Landmark, Send } from "lucide-react";
//#region src/routes/inscripcion-registral.tsx?tsr-split=component
var SITUACIONES = {
	POR_PRESENTAR: {
		texto: "Entregado: por presentar a SUNARP",
		tono: "warning"
	},
	EN_SUNARP: {
		texto: "Título en SUNARP",
		tono: "primary"
	},
	INSCRITO: {
		texto: "Inscrito a favor del MTC",
		tono: "success"
	}
};
/**
* Predios ya entregados que se inscriben a favor del MTC: por presentar por el SID, con título en
* calificación (plazo de inscripción) o inscritos.
*/
function admite(f) {
	if (f.hito === "Entrega de posesión") return {
		...f,
		situacion: "POR_PRESENTAR",
		detalle: "Presentación por el SID pendiente"
	};
	if (f.hito === "Inscripción registral en trámite") return {
		...f,
		situacion: "EN_SUNARP",
		detalle: f.plazo || (f.titulo ? `Título ${f.titulo}` : "")
	};
	if (f.hito === "Inscripción registral concluida") return {
		...f,
		situacion: "INSCRITO",
		detalle: f.part ? `Partida ${f.part}` : ""
	};
	return null;
}
function InscripcionPage() {
	const navigate = useNavigate();
	const abrir = (ruta) => (f) => navigate({
		to: `/proyectos/$projectId/predios/$codigo/${ruta}`,
		params: {
			projectId: f.proyectoId,
			codigo: f.codigo
		}
	});
	return /* @__PURE__ */ jsx(CarteraModulo, {
		titulo: "Cartera de inscripción registral",
		icono: BookOpenCheck,
		base: "Art. 20.4.c y 35 del TUO del DL 1192",
		admite,
		situaciones: SITUACIONES,
		acciones: [{
			nombre: "Presentación SID",
			icono: Send,
			onClick: abrir("inscripcion-registral-sid")
		}, {
			nombre: "Inscripción registral",
			icono: Landmark,
			onClick: abrir("inscripcion-registral")
		}],
		onFilaClick: (f) => f.situacion === "POR_PRESENTAR" ? abrir("inscripcion-registral-sid")(f) : abrir("inscripcion-registral")(f),
		archivo: "cartera-inscripcion-registral",
		vacio: "Sus proyectos no tienen predios por inscribir."
	});
}
//#endregion
export { InscripcionPage as component };
