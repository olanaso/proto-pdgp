import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { S as useRegistrosCampo, p as plural, s as enviarRegistros, t as NOMBRE_TIPO_CAMPO } from "./campo-Dn2b-x9H.js";
import { t as Route$1 } from "./recolector-campo._projectId.enviar-B6lapGzF.js";
import { t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, Send } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.enviar.tsx?tsr-split=component
/**
* Enviar al sistema: confirma qué sale del campo (fichas y bloques, fotos) y deja un envío por registro.
* ponytail: los datos ya están en el expediente; con backend, aquí se descarga la cola contra la API.
*/
function EnviarAlSistema() {
	const { projectId } = Route$1.useParams();
	const { ids, volver } = Route$1.useSearch();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const pedidos = (ids ?? "").split(",").filter(Boolean);
	const porEnviar = useRegistrosCampo().filter((r) => r.projectId === projectId && pedidos.includes(r.id)).filter((r) => !r.enviadoEl);
	const fotos = porEnviar.reduce((n, r) => n + r.fotos, 0);
	const [enviados, setEnviados] = useState(null);
	const volverA = () => volver ? navigate({
		to: "/recolector-campo/$projectId/caracterizacion/$codigo",
		params: {
			projectId,
			codigo: volver
		}
	}) : navigate({
		to: "/recolector-campo/$projectId",
		params: { projectId }
	});
	if (enviados != null) return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: "Enviado",
		subtitulo: proyecto?.nombre,
		onAtras: volverA,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "rounded-lg border border-success bg-success-soft p-5 text-center",
			children: [
				/* @__PURE__ */ jsx(CheckCircle2, {
					size: 40,
					className: "mx-auto text-success",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-2 text-lg font-semibold text-success",
					children: [
						enviados,
						" registro",
						enviados === 1 ? "" : "s",
						" enviado",
						enviados === 1 ? "" : "s",
						" al sistema"
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-foreground",
					children: "Quedó constancia en el historial de envíos y en la bitácora."
				})
			]
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			className: "mt-4 h-12 w-full text-base",
			onClick: volverA,
			children: volver ? "Volver al predio" : "Volver al proyecto"
		})]
	});
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: "Enviar al sistema",
		subtitulo: proyecto?.nombre,
		onAtras: volverA,
		pie: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			disabled: porEnviar.length === 0,
			onClick: () => setEnviados(enviarRegistros(porEnviar.map((r) => r.id))),
			children: [
				/* @__PURE__ */ jsx(Send, {}),
				" Enviar ",
				porEnviar.length,
				" registro",
				porEnviar.length === 1 ? "" : "s"
			]
		}),
		children: [
			/* @__PURE__ */ jsxs("p", {
				className: "text-base text-foreground",
				children: [
					"Se envía",
					porEnviar.length === 1 ? "" : "n",
					" ",
					porEnviar.length,
					" registro",
					porEnviar.length === 1 ? "" : "s",
					" con ",
					fotos,
					" foto",
					fotos === 1 ? "" : "s",
					"."
				]
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "mt-4 divide-y divide-border rounded-lg border border-border bg-card",
				children: porEnviar.map((r) => /* @__PURE__ */ jsxs("li", {
					className: "px-4 py-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "block text-base font-medium text-foreground",
						children: r.titulo
					}), /* @__PURE__ */ jsxs("span", {
						className: "block text-sm text-muted-foreground",
						children: [
							NOMBRE_TIPO_CAMPO[r.tipo],
							" · ",
							r.predio,
							r.fotos ? ` · ${plural(r.fotos, "foto", "fotos")}` : "",
							r.acta ? ` · ${r.acta}` : ""
						]
					})]
				}, r.id))
			}),
			porEnviar.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "mt-4 text-base text-muted-foreground",
				children: "No hay nada pendiente de enviar."
			})
		]
	});
}
//#endregion
export { EnviarAlSistema as component };
