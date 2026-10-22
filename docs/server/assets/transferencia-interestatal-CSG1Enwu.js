import { t as antesDe } from "./cartera-B4-YODri.js";
import { t as CarteraModulo } from "./CarteraModulo-DTs_wGg3.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
import { ArrowLeftRight, Eye } from "lucide-react";
//#region src/routes/transferencia-interestatal.tsx?tsr-split=component
var SITUACIONES = {
	EN_SBN: {
		texto: "En trámite ante la SBN",
		tono: "warning"
	},
	TRANSFERIDO: {
		texto: "Transferido, por inscribir",
		tono: "primary"
	},
	INSCRITO: {
		texto: "Inscrito a favor del MTC",
		tono: "success"
	}
};
/** Predios del Estado: transferencia gratuita por la SBN en 45 d.h., sin tasación ni carta (art. 41). */
function admite(f) {
	if (f.ruta !== "TRANSFERENCIA") return null;
	const situacion = antesDe(f, "Resolución de adquisición") ? "EN_SBN" : f.hito === "Inscripción registral concluida" ? "INSCRITO" : "TRANSFERIDO";
	return {
		...f,
		situacion,
		detalle: f.plazo || f.hito
	};
}
function TransferenciaPage() {
	const navigate = useNavigate();
	const abrir = (f) => navigate({
		to: "/proyectos/$projectId/predios/$codigo/transferencia-interestatal-sbn",
		params: {
			projectId: f.proyectoId,
			codigo: f.codigo
		}
	});
	return /* @__PURE__ */ jsx(CarteraModulo, {
		titulo: "Cartera de transferencia interestatal",
		icono: ArrowLeftRight,
		base: "Art. 41 del TUO del DL 1192",
		admite,
		situaciones: SITUACIONES,
		acciones: [{
			nombre: "Expediente de transferencia",
			icono: Eye,
			onClick: abrir
		}],
		onFilaClick: abrir,
		archivo: "cartera-transferencia-interestatal",
		vacio: "Sus proyectos no tienen predios estatales por transferir."
	});
}
//#endregion
export { TransferenciaPage as component };
