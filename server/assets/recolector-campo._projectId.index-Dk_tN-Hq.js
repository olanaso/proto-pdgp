import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { a as prediosDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { S as useRegistrosCampo, c as esDeHoy, t as NOMBRE_TIPO_CAMPO } from "./campo-Dn2b-x9H.js";
import { t as Route$1 } from "./recolector-campo._projectId.index-spBnxS0Y.js";
import { i as TituloCampo, n as PuntoEstado, r as TarjetaCampo, t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ClipboardList, LandPlot, Map, Send } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.index.tsx?tsr-split=component
var hora = (iso) => new Date(iso).toLocaleTimeString("es-PE", {
	hour: "2-digit",
	minute: "2-digit"
});
/** ¿Qué va a registrar? Padrón (predio nuevo) o caracterización (predio existente). */
function MenuProyecto() {
	const { projectId } = Route$1.useParams();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const registros = useRegistrosCampo().filter((r) => r.projectId === projectId);
	const pendientes = registros.filter((r) => !r.enviadoEl);
	const hoy = registros.filter((r) => esDeHoy(r.guardadoEl));
	const fichasHoy = hoy.filter((r) => r.tipo === "padron").length;
	const [nPredios, setNPredios] = useState(null);
	useEffect(() => setNPredios(prediosDelProyecto(projectId).length), [projectId]);
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: proyecto?.nombre ?? projectId,
		subtitulo: "¿Qué va a registrar?",
		onAtras: () => navigate({ to: "/recolector-campo" }),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsx(TarjetaCampo, {
						destacada: true,
						icono: ClipboardList,
						titulo: "Padrón",
						detalle: "Primera visita: registrar un predio nuevo con su ficha y acta de padrón.",
						extra: /* @__PURE__ */ jsxs("span", {
							className: "mt-1 block text-sm text-muted-foreground",
							children: [
								fichasHoy,
								" ficha",
								fichasHoy === 1 ? "" : "s",
								" hoy"
							]
						}),
						onClick: () => navigate({
							to: "/recolector-campo/$projectId/padron",
							params: { projectId }
						})
					}),
					/* @__PURE__ */ jsx(TarjetaCampo, {
						destacada: true,
						icono: LandPlot,
						titulo: "Caracterización",
						detalle: "Predio existente: sujeto pasivo, notificación, empadronamiento y caracterización.",
						extra: /* @__PURE__ */ jsx("span", {
							className: "mt-1 block text-sm text-muted-foreground",
							children: nPredios == null ? "Contando predios…" : `${nPredios} predios del proyecto`
						}),
						onClick: () => navigate({
							to: "/recolector-campo/$projectId/caracterizacion",
							params: { projectId }
						})
					}),
					/* @__PURE__ */ jsx(TarjetaCampo, {
						icono: Map,
						titulo: "Mapa",
						detalle: "Su ubicación y los predios del proyecto: toque uno para caracterizarlo.",
						onClick: () => navigate({
							to: "/recolector-campo/$projectId/mapa",
							params: { projectId }
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(TituloCampo, {
				accion: pendientes.length > 0 && /* @__PURE__ */ jsxs(Button, {
					type: "button",
					className: "h-11",
					onClick: () => navigate({
						to: "/recolector-campo/$projectId/enviar",
						params: { projectId },
						search: { ids: pendientes.map((r) => r.id).join(",") }
					}),
					children: [/* @__PURE__ */ jsx(Send, {}), " Enviar todo"]
				}),
				children: [
					"Pendientes de enviar (",
					pendientes.length,
					")"
				]
			}),
			pendientes.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "text-base text-muted-foreground",
				children: "Todo lo registrado ya se envió."
			}),
			/* @__PURE__ */ jsxs(TituloCampo, { children: [
				"Mis registros de hoy (",
				hoy.length,
				")"
			] }),
			hoy.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "text-base text-muted-foreground",
				children: "Aún no registra nada hoy."
			}) : /* @__PURE__ */ jsx("ul", {
				className: "divide-y divide-border rounded-lg border border-border bg-card",
				children: hoy.map((r) => /* @__PURE__ */ jsxs("li", {
					className: "flex items-start gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "w-12 shrink-0 pt-0.5 text-sm tabular-nums text-muted-foreground",
							children: hora(r.guardadoEl)
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "block text-base font-medium text-foreground",
								children: r.titulo
							}), /* @__PURE__ */ jsxs("span", {
								className: "block text-sm text-muted-foreground",
								children: [
									NOMBRE_TIPO_CAMPO[r.tipo],
									" · ",
									r.predio
								]
							})]
						}),
						/* @__PURE__ */ jsx(PuntoEstado, {
							estado: r.enviadoEl ? "completo" : "curso",
							etiqueta: r.enviadoEl ? "Enviado" : "Por enviar"
						})
					]
				}, r.id))
			})
		]
	});
}
//#endregion
export { MenuProyecto as component };
