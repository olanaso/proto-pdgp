import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { m as fecha, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { Q as declaratoriaDelProyecto, n as etiquetaProyecto, nt as useNormasProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.declaratoria-DuA9TGfO.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Scale } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.declaratoria.tsx?tsr-split=component
var TIPO = {
	LEY: "Ley",
	DECRETO_SUPREMO: "Decreto supremo",
	RESOLUCION: "Resolución"
};
/** Vista del predio, en solo lectura: la declaratoria es dato del proyecto (§15.2). */
function DeclaratoriaPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const d = declaratoriaDelProyecto(useNormasProyecto(projectId));
	const datos = d ? [
		["Norma", `${TIPO[d.tipo]} N.° ${d.numero}`],
		["Fecha", d.fecha ? fecha(d.fecha) : "Sin fecha"],
		["Alcance", d.alcance || "Sin registrar"],
		["Estado", d.estado === "VIGENTE" ? "Vigente" : "En trámite"],
		...d.estado === "EN_TRAMITE" ? [["Documento con el que se elevó", d.documentoTramite || "Sin registrar"]] : []
	] : [];
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: decodedCodigo,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: decodedCodigo }),
		children: [
			/* @__PURE__ */ jsx(PredioEncabezado, {
				projectId,
				codigo: decodedCodigo,
				titulo: "Declaratoria de necesidad pública",
				icono: Scale,
				acciones: /* @__PURE__ */ jsxs(Fragment, { children: [d && /* @__PURE__ */ jsx(StatusBadge, {
					tono: d.estado === "VIGENTE" ? "success" : "warning",
					children: d.estado === "VIGENTE" ? "Vigente" : "En trámite"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ jsx(Link, {
						to: "/proyectos/$projectId/normas-habilitantes",
						params: { projectId },
						children: "Ir a Normas habilitantes"
					})
				})] })
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "declaratoria",
				projectId,
				codigo: decodedCodigo
			}),
			/* @__PURE__ */ jsx(Aviso, {
				tipo: "info",
				children: "La transferencia puede solicitarse a la SBN antes de que se publique la declaratoria (art. 41.1): basta el documento con el que se elevó. La declaratoria se registra una vez para el proyecto, en Normas habilitantes."
			}),
			/* @__PURE__ */ jsx(Section, {
				titulo: "Declaratoria del proyecto",
				children: d ? /* @__PURE__ */ jsx(FormGrid, { children: datos.map(([etiqueta, valor]) => /* @__PURE__ */ jsx(FormField, {
					etiqueta,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: `${controlClase} bg-muted`,
						value: valor,
						readOnly: true
					})
				}, etiqueta)) }) : /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "El proyecto no tiene declaratoria registrada. Regístrela en Normas habilitantes."
				})
			})
		]
	});
}
//#endregion
export { DeclaratoriaPage as component };
