import { t as CarteraModulo } from "./CarteraModulo-DTs_wGg3.js";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Banknote, HandCoins, Receipt, Wallet } from "lucide-react";
//#region src/routes/pago.tsx?tsr-split=component
var SITUACIONES = {
	POR_PAGAR: {
		texto: "Resolución emitida: por pagar",
		tono: "warning"
	},
	POR_CONSIGNAR: {
		texto: "Expropiación: por consignar",
		tono: "destructive"
	},
	DEVENGADO: {
		texto: "Devengado en trámite",
		tono: "primary"
	}
};
/**
* Predios con resolución y sin entrega: pago dentro de los 20 d.h. del formulario registral (art. 20.4.b)
* o consignación en expropiación (art. 28.3); y los que ya tienen el devengado en trámite.
*/
function admite(f) {
	if (f.ruta !== "TRATO_DIRECTO" && f.ruta !== "EXPROPIACION") return null;
	if (f.hito === "Resolución de adquisición") return {
		...f,
		situacion: f.ruta === "EXPROPIACION" ? "POR_CONSIGNAR" : "POR_PAGAR",
		detalle: f.plazo
	};
	if (f.hito === "Devengado, pago o consignación") return {
		...f,
		situacion: "DEVENGADO",
		detalle: f.pago ? `Devengado ${f.pago}` : ""
	};
	return null;
}
function PagoPage() {
	const navigate = useNavigate();
	const abrir = (ruta) => (f) => navigate({
		to: `/proyectos/$projectId/predios/$codigo/${ruta}`,
		params: {
			projectId: f.proyectoId,
			codigo: f.codigo
		}
	});
	return /* @__PURE__ */ jsx(CarteraModulo, {
		titulo: "Cartera de pago y consignación",
		icono: HandCoins,
		base: "Art. 20.4.b y 28.3 del TUO del DL 1192",
		admite,
		situaciones: SITUACIONES,
		acciones: [
			{
				nombre: "Gestión de devengado",
				icono: Receipt,
				onClick: abrir("gestion-devengado")
			},
			{
				nombre: "Pago a propietarios",
				icono: Wallet,
				onClick: abrir("pago-propietarios")
			},
			{
				nombre: "Pago o consignación",
				icono: Banknote,
				onClick: abrir("pago-consignacion")
			}
		],
		onFilaClick: (f) => f.situacion === "DEVENGADO" ? abrir("pago-consignacion")(f) : abrir("gestion-devengado")(f),
		archivo: "cartera-pago-consignacion",
		vacio: "Sus proyectos no tienen predios por pagar ni consignar.",
		nota: /* @__PURE__ */ jsxs(Fragment, { children: [
			"Los cheques, depósitos y entregas programadas se siguen en la",
			" ",
			/* @__PURE__ */ jsx(Link, {
				to: "/pago-consignacion",
				className: "font-medium text-primary-dark underline",
				children: "bandeja de pagos y consignaciones"
			}),
			"."
		] })
	});
}
//#endregion
export { PagoPage as component };
