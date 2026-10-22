import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { i as predioDelProyecto } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { S as useRegistrosCampo, l as estadoBloques } from "./campo-Dn2b-x9H.js";
import { t as Route$1 } from "./recolector-campo._projectId.caracterizacion._codigo.index-0DMhmfTt.js";
import { a as fotosDe, g as useFotos } from "./fotos-CUnD_Pb7.js";
import { i as TituloCampo, r as TarjetaCampo, t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ClipboardCheck, Home, Mail, Map, Send, UserRound } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.caracterizacion.$codigo.index.tsx?tsr-split=component
/** Lo que se levanta en campo de un predio existente, en el orden en que se hace. */
function ChecklistPredio() {
	const { projectId, codigo } = Route$1.useParams();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const registros = useRegistrosCampo();
	const fotos = useFotos();
	const predio = predioDelProyecto(codigo);
	const estado = useMemo(() => estadoBloques(codigo, proyecto?.coordinadorPredial ?? ""), [
		codigo,
		proyecto?.coordinadorPredial,
		registros
	]);
	const pendientes = registros.filter((r) => r.predio === codigo && !r.enviadoEl);
	const nFotos = fotosDe(fotos, { predio: codigo }).length;
	const ir = (a) => navigate({
		to: a,
		params: {
			projectId,
			codigo
		}
	});
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: predio?.cod ?? codigo,
		subtitulo: predio?.sujeto || "Sin sujeto pasivo",
		onAtras: () => navigate({
			to: "/recolector-campo/$projectId/caracterizacion",
			params: { projectId }
		}),
		pie: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			disabled: pendientes.length === 0,
			onClick: () => navigate({
				to: "/recolector-campo/$projectId/enviar",
				params: { projectId },
				search: {
					ids: pendientes.map((r) => r.id).join(","),
					volver: codigo
				}
			}),
			children: [/* @__PURE__ */ jsx(Send, {}), pendientes.length ? `Enviar al sistema (${pendientes.length})` : "Nada pendiente de enviar"]
		}),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 rounded-lg border border-border bg-card p-4 text-sm",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-foreground",
						children: [
							predio?.condicion,
							predio?.area && `${predio.area} m²`,
							predio?.etapa.nombre
						].filter(Boolean).join(" · ")
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-muted-foreground",
						children: [
							nFotos,
							" foto",
							nFotos === 1 ? "" : "s",
							" del predio en el sistema"
						]
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/recolector-campo/$projectId/mapa",
						params: { projectId },
						search: { predio: codigo },
						className: "mt-2 inline-flex min-h-11 items-center gap-1.5 font-medium text-primary-dark underline underline-offset-2",
						children: [/* @__PURE__ */ jsx(Map, {
							size: 18,
							"aria-hidden": true
						}), " Ver en el mapa"]
					})
				]
			}),
			/* @__PURE__ */ jsx(TituloCampo, { children: "Qué registrar" }),
			/* @__PURE__ */ jsxs("ol", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
						icono: UserRound,
						titulo: "1. Sujeto pasivo",
						detalle: "Titulares, contacto, ocupantes y documentos que presenta.",
						estado: estado["sujeto-pasivo"],
						onClick: () => ir("/recolector-campo/$projectId/caracterizacion/$codigo/sujeto-pasivo")
					}) }),
					/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
						icono: Mail,
						titulo: "2. Notificación y cargo",
						detalle: "Entrega de la comunicación, resultado y cargo firmado.",
						estado: estado.notificacion,
						onClick: () => ir("/recolector-campo/$projectId/caracterizacion/$codigo/notificacion")
					}) }),
					/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
						icono: ClipboardCheck,
						titulo: "3. Empadronamiento e inspección",
						detalle: "Ocupante encontrado, lo que se ve, fotos y acta.",
						estado: estado.empadronamiento,
						onClick: () => ir("/recolector-campo/$projectId/caracterizacion/$codigo/empadronamiento")
					}) }),
					/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
						icono: Home,
						titulo: "4. Caracterización del predio",
						detalle: "Viviendas, obras, instalaciones, plantaciones, cerco vivo y entorno.",
						estado: estado.caracterizacion,
						onClick: () => ir("/recolector-campo/$projectId/caracterizacion/$codigo/caracterizacion-predio")
					}) })
				]
			})
		]
	});
}
//#endregion
export { ChecklistPredio as component };
