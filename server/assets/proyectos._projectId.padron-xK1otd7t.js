import { o as filasDelProyecto, r as padronDemostrativo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as DatosDemostracion } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Route$1 } from "./proyectos._projectId.padron-DhYhrgnh.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { t as FullPrediosTable } from "./FullPrediosTable-DSKQiRob.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ListChecks, Map, Sheet } from "lucide-react";
//#region src/routes/proyectos.$projectId.padron.tsx?tsr-split=component
function PadronCompleto() {
	const { projectId } = Route$1.useParams();
	const [seleccion, setSeleccion] = useState(null);
	return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsxs("div", {
		className: "flex h-[calc(100vh-3.5rem-2rem)] flex-col",
		children: [
			/* @__PURE__ */ jsx(ProyectoEncabezado, {
				projectId,
				titulo: "Padrón completo",
				icono: Sheet,
				descripcion: `${filasDelProyecto(projectId).length} registros del padrón en cinco grupos de columnas, con filtro por columna. Para revisar y exportar; para trabajar un predio, use el listado.`,
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/$projectId/predios",
						params: { projectId },
						children: [/* @__PURE__ */ jsx(ListChecks, {}), " Listado de predios"]
					})
				}), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/proyectos/$projectId/mapa",
						params: { projectId },
						children: [/* @__PURE__ */ jsx(Map, {}), " Ver mapa"]
					})
				})] })
			}),
			padronDemostrativo(projectId) && /* @__PURE__ */ jsx(DatosDemostracion, { children: "Datos de demostración: este proyecto muestra el padrón del Aeropuerto de Jauja hasta que se cargue el suyo." }),
			/* @__PURE__ */ jsx("section", {
				className: "flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card",
				children: /* @__PURE__ */ jsx(FullPrediosTable, {
					rows: filasDelProyecto(projectId),
					selectedCodigo: seleccion,
					onSelectCodigo: setSeleccion
				})
			})
		]
	}) });
}
//#endregion
export { PadronCompleto as component };
