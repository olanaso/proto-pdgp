import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { S as useRegistrosCampo } from "./campo-Dn2b-x9H.js";
import { t as Route$1 } from "./recolector-campo._projectId.padron.index-CkrfGwGH.js";
import { i as TituloCampo, n as PuntoEstado, r as TarjetaCampo, t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ClipboardList, Plus } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.padron.index.tsx?tsr-split=component
var fechaHora = (iso) => new Date(iso).toLocaleString("es-PE", {
	day: "2-digit",
	month: "2-digit",
	hour: "2-digit",
	minute: "2-digit"
});
/** Fichas de padrón levantadas en el proyecto y la entrada a una nueva. */
function FichasPadron() {
	const { projectId } = Route$1.useParams();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const fichas = useRegistrosCampo().filter((r) => r.projectId === projectId && r.tipo === "padron");
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: "Padrón",
		subtitulo: proyecto?.nombre,
		onAtras: () => navigate({
			to: "/recolector-campo/$projectId",
			params: { projectId }
		}),
		pie: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			onClick: () => navigate({
				to: "/recolector-campo/$projectId/padron/nueva",
				params: { projectId }
			}),
			children: [/* @__PURE__ */ jsx(Plus, {}), " Nueva ficha de padrón"]
		}),
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-base text-muted-foreground",
				children: "Primera visita a un predio: ubicación, sujeto pasivo, ocupación, fotos y acta. Al guardar, el predio entra al proyecto con código provisional."
			}),
			/* @__PURE__ */ jsxs(TituloCampo, { children: [
				"Fichas levantadas (",
				fichas.length,
				")"
			] }),
			fichas.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "text-base text-muted-foreground",
				children: "Aún no hay fichas en este proyecto."
			}) : /* @__PURE__ */ jsx("ul", {
				className: "space-y-2",
				children: fichas.map((f) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
					icono: ClipboardList,
					titulo: f.titulo,
					detalle: `${f.predio} · ${fechaHora(f.guardadoEl)}`,
					extra: /* @__PURE__ */ jsx("span", {
						className: "mt-1 block",
						children: /* @__PURE__ */ jsx(PuntoEstado, {
							estado: f.enviadoEl ? "completo" : "curso",
							etiqueta: f.enviadoEl ? "Enviada" : "Guardada, por enviar"
						})
					}),
					onClick: () => navigate({
						to: "/recolector-campo/$projectId/padron/$ficha",
						params: {
							projectId,
							ficha: f.id
						}
					})
				}) }, f.id))
			})
		]
	});
}
//#endregion
export { FichasPadron as component };
