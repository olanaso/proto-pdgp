import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { S as useRegistrosCampo, d as gruposFichaPadron } from "./campo-Dn2b-x9H.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./recolector-campo._projectId.padron._ficha-GkY9UyYS.js";
import { n as PuntoEstado, t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { s as Resumen } from "./Controles-CqdT34l5.js";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { LandPlot, Send } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.padron.$ficha.tsx?tsr-split=component
/** Una ficha de padrón ya guardada: lo que se registró, su código provisional, el acta y si se envió. */
function FichaGuardada() {
	const { projectId, ficha } = Route$1.useParams();
	const { nuevo } = Route$1.useSearch();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const r = useRegistrosCampo().find((x) => x.id === ficha);
	const volver = () => navigate({
		to: "/recolector-campo/$projectId/padron",
		params: { projectId }
	});
	if (!r?.ficha) return /* @__PURE__ */ jsx(CampoShell, {
		titulo: "Ficha de padrón",
		subtitulo: proyecto?.nombre,
		onAtras: volver,
		children: /* @__PURE__ */ jsx("p", {
			className: "text-base text-muted-foreground",
			children: "La ficha no está en este equipo."
		})
	});
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: `Ficha ${r.ficha.numero}`,
		subtitulo: proyecto?.nombre,
		onAtras: volver,
		pie: /* @__PURE__ */ jsxs(Fragment, { children: [!r.enviadoEl && /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			className: "h-12 flex-1 text-base",
			onClick: () => navigate({
				to: "/recolector-campo/$projectId/enviar",
				params: { projectId },
				search: { ids: r.id }
			}),
			children: [/* @__PURE__ */ jsx(Send, {}), " Enviar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			onClick: () => navigate({
				to: "/recolector-campo/$projectId/caracterizacion/$codigo",
				params: {
					projectId,
					codigo: r.predio
				}
			}),
			children: [/* @__PURE__ */ jsx(LandPlot, {}), " Caracterizar"]
		})] }),
		children: [
			nuevo && /* @__PURE__ */ jsxs(Aviso, {
				tipo: "exito",
				children: [
					"Ficha guardada. El predio ",
					r.predio,
					" ya está en el listado y el mapa del proyecto."
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-3 rounded-lg border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Código provisional del predio"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "font-mono text-lg font-semibold text-foreground",
						children: r.predio
					}),
					r.acta && /* @__PURE__ */ jsxs("p", {
						className: "mt-2 text-sm text-foreground",
						children: ["Acta: ", /* @__PURE__ */ jsx("span", {
							className: "font-mono font-semibold",
							children: r.acta
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2",
						children: /* @__PURE__ */ jsx(PuntoEstado, {
							estado: r.enviadoEl ? "completo" : "curso",
							etiqueta: r.enviadoEl ? `Enviada el ${new Date(r.enviadoEl).toLocaleString("es-PE")}` : "Guardada en el equipo, por enviar"
						})
					})
				]
			}),
			/* @__PURE__ */ jsx(Resumen, { grupos: [{
				titulo: "Fotos",
				filas: [["Tomadas", String(r.fotos)]]
			}, ...gruposFichaPadron(r.ficha)] })
		]
	});
}
//#endregion
export { FichaGuardada as component };
