import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { n as etiquetaProyecto } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { jsx } from "react/jsx-runtime";
//#region src/components/kit/ProyectoEncabezado.tsx
/** Tarjeta de título de una pantalla de proyecto: migas Proyectos / Proyecto. */
function ProyectoEncabezado({ projectId, titulo, icono, descripcion, acciones }) {
	const proyecto = getProyecto(projectId);
	return /* @__PURE__ */ jsx(PageHeader, {
		icono,
		titulo,
		descripcion: descripcion ?? (proyecto ? `${proyecto.codigo} · ${proyecto.fase}` : void 0),
		migas: [
			{
				texto: "Proyectos",
				to: "/proyectos"
			},
			{
				texto: etiquetaProyecto(proyecto, projectId),
				to: "/proyectos/$projectId",
				params: { projectId }
			},
			{ texto: titulo }
		],
		acciones
	});
}
//#endregion
export { ProyectoEncabezado as t };
