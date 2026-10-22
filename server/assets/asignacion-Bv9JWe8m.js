import { r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { useMemo } from "react";
//#region src/lib/asignacion.ts
/**
* Proyectos asignados por perfil (demostración): el Especialista técnico y el Especialista legal trabajan
* en pocos proyectos; los demás perfiles ven todos. La lista de proyectos, sus selectores, las carteras de
* los módulos y el recolector de campo leen de aquí.
* ponytail: asignación fija por perfil; con backend, la asignación usuario–proyecto (o la brigada).
*/
var PROYECTOS_POR_PERFIL = {
	ESP_TECNICO: ["jauja", "cajamarca"],
	ESP_LEGAL: ["jauja", "cajamarca"]
};
/** Ids de los proyectos asignados al perfil, o null si el perfil ve todos. */
var idsAsignadosAlPerfil = (rol) => PROYECTOS_POR_PERFIL[rol] ?? null;
/** Proyectos que el perfil activo puede ver, y si la lista está acotada. */
function useProyectosDelPerfil() {
	const rol = useRol();
	return useMemo(() => {
		const ids = idsAsignadosAlPerfil(rol);
		return ids ? {
			lista: proyectos.filter((p) => ids.includes(p.id)),
			acotado: true
		} : {
			lista: proyectos,
			acotado: false
		};
	}, [rol]);
}
//#endregion
export { useProyectosDelPerfil as n, idsAsignadosAlPerfil as t };
