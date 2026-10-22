//#region src/lib/projectContext.ts
var CURRENT_USER = {
	id: "u-001",
	nombre: "GADY GABRIELA, QUIROZ PINCHI",
	rol: "Profesional Predial"
};
var PROFESIONALES = [
	"GADY GABRIELA, QUIROZ PINCHI",
	"LUIS ENRIQUE, PONCE MUÑOZ",
	"OKY AGUSTÍN, SUPARO TAJIRI",
	"CHRISTIAN ALEXANDER, ALIAGA VASQUEZ",
	"DAVID DALAMBERT, LINO RUIZ"
];
var COORDINACIONES = [
	"COORDINACIÓN GENERAL VIAL 3",
	"COORDINACIÓN DE EJECUCIÓN DE LA GESTIÓN PREDIAL",
	"COORDINACIÓN PREDIAL AUTOPISTA DEL SOL",
	"COORDINACIÓN DE MULTIPROYECTOS VIALES 1"
];
var TIPOS_PLANO = [
	"PLANO DE DISTRIBUCION DE EDIFICACIONES",
	"PLANO DE INDEPENDIZACION",
	"PLANO PERIMETRICO Y UBICACION",
	"PLANO DE AFECTACION",
	"PLANO PARA BUSQUEDA CATASTRAL ANTE REGISTROS PUBLICOS"
];
var PROCESOS_GESTION_PREDIAL = [
	"Diagnóstico Técnico Legal",
	"Saneamiento Físico Legal",
	"Tasación",
	"Adquisición / Expropiación",
	"Liberación de Áreas"
];
var PROJECTS = { caballococha: {
	id: "caballococha",
	nombre: "AEROPUERTO DE CABALLOCOCHA",
	coordinacion: "COORDINACIÓN DE EJECUCIÓN DE LA GESTIÓN PREDIAL",
	tipoInfraestructura: "Aeropuerto",
	departamento: "LORETO",
	provincia: "Mariscal Ramón Castilla",
	distrito: "Caballococha"
} };
function getProjectInfo(projectId) {
	return PROJECTS[projectId] ?? {
		id: projectId,
		nombre: projectId.toUpperCase(),
		coordinacion: COORDINACIONES[0],
		tipoInfraestructura: "Vial",
		departamento: "",
		provincia: "",
		distrito: ""
	};
}
var seguimientoMock = [
	{
		id: 1,
		fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " "),
		usuario: CURRENT_USER.nombre,
		accion: "Creación de registro",
		detalle: "Registro generado desde el módulo",
		estado: "DISPONIBLE"
	},
	{
		id: 2,
		fecha: "2026-06-23 07:52:30",
		usuario: "LUIS ENRIQUE, PONCE MUÑOZ",
		accion: "Asignación a profesional",
		detalle: "Asignado para validación técnica",
		estado: "ASIGNADO"
	},
	{
		id: 3,
		fecha: "2026-06-23 09:10:12",
		usuario: "GADY GABRIELA, QUIROZ PINCHI",
		accion: "Validación técnica",
		detalle: "Documentación conforme",
		estado: "USADO"
	}
];
//#endregion
export { TIPOS_PLANO as a, PROFESIONALES as i, CURRENT_USER as n, getProjectInfo as o, PROCESOS_GESTION_PREDIAL as r, seguimientoMock as s, COORDINACIONES as t };
