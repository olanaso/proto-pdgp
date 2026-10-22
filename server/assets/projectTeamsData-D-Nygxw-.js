//#region src/lib/projectTeamsData.ts
var usuariosEquipo = [
	{
		id: "u1",
		nombre: "Ing. Pedro Ramírez",
		tipo: "Técnico",
		especialidad: "Coordinación General"
	},
	{
		id: "u2",
		nombre: "Arq. Ana Torres",
		tipo: "Técnico",
		especialidad: "Arquitectura / Catastro"
	},
	{
		id: "u3",
		nombre: "Abog. Juan Delgado",
		tipo: "Legal",
		especialidad: "Asuntos Legales"
	},
	{
		id: "u4",
		nombre: "Ing. Carlos Flores",
		tipo: "Técnico",
		especialidad: "Saneamiento Físico Legal"
	},
	{
		id: "u5",
		nombre: "Valeria Quispe",
		tipo: "Técnico",
		especialidad: "Topografía / GIS"
	},
	{
		id: "u6",
		nombre: "Luis Vargas",
		tipo: "Administrativo",
		especialidad: "Apoyo de Campo"
	},
	{
		id: "u7",
		nombre: "Abog. Carla Pérez",
		tipo: "Legal",
		especialidad: "Asesoría Legal"
	},
	{
		id: "u8",
		nombre: "Ing. Luis Mendoza",
		tipo: "Técnico",
		especialidad: "Topografía"
	},
	{
		id: "u9",
		nombre: "María Gómez",
		tipo: "Administrativo",
		especialidad: "Gestión Documental"
	},
	{
		id: "u10",
		nombre: "Roberto Salas",
		tipo: "Otro",
		especialidad: "Logística"
	},
	{
		id: "u11",
		nombre: "Ing. Diana Flores",
		tipo: "Técnico",
		especialidad: "Gestión Predial"
	},
	{
		id: "u12",
		nombre: "Abog. Jorge Núñez",
		tipo: "Legal",
		especialidad: "Expropiaciones"
	}
];
var initialProjectBrigades = [
	{
		id: "b1",
		codigo: "BRG-CAB-001",
		nombre: "Equipo Norte",
		zona: "Tramo 1 - Sector Norte",
		coordinadorId: "u1",
		vigenciaIni: "2025-05-01",
		vigenciaFin: "2025-12-31",
		estado: "Activa",
		descripcion: "Equipo encargado de la gestión predial en el sector norte del proyecto.",
		integrantes: [
			{
				usuarioId: "u1",
				rol: "Coordinador"
			},
			{
				usuarioId: "u2",
				rol: "Responsable Técnico"
			},
			{
				usuarioId: "u3",
				rol: "Responsable Legal"
			},
			{
				usuarioId: "u4",
				rol: "Especialista Predial"
			},
			{
				usuarioId: "u5",
				rol: "Miembro"
			},
			{
				usuarioId: "u6",
				rol: "Miembro"
			}
		]
	},
	{
		id: "b2",
		codigo: "BRG-CAB-002",
		nombre: "Equipo Centro",
		zona: "Tramo 1 - Sector Centro",
		coordinadorId: "u2",
		vigenciaIni: "2025-05-01",
		vigenciaFin: "2025-12-31",
		estado: "Activa",
		descripcion: "Equipo del sector centro.",
		integrantes: [
			{
				usuarioId: "u2",
				rol: "Coordinador"
			},
			{
				usuarioId: "u9",
				rol: "Miembro"
			},
			{
				usuarioId: "u11",
				rol: "Especialista Predial"
			},
			{
				usuarioId: "u7",
				rol: "Responsable Legal"
			},
			{
				usuarioId: "u10",
				rol: "Miembro"
			}
		]
	},
	{
		id: "b3",
		codigo: "BRG-CAB-003",
		nombre: "Equipo Sur",
		zona: "Tramo 2 - Sector Sur",
		coordinadorId: "u8",
		vigenciaIni: "2025-05-15",
		vigenciaFin: "2026-01-31",
		estado: "En formación",
		descripcion: "Equipo de despliegue en el sector sur.",
		integrantes: [
			{
				usuarioId: "u8",
				rol: "Coordinador"
			},
			{
				usuarioId: "u12",
				rol: "Responsable Legal"
			},
			{
				usuarioId: "u11",
				rol: "Miembro"
			},
			{
				usuarioId: "u6",
				rol: "Miembro"
			}
		]
	},
	{
		id: "b4",
		codigo: "BRG-CAB-004",
		nombre: "Equipo Auxiliar",
		zona: "Zona de Afectación Indirecta",
		coordinadorId: "u7",
		vigenciaIni: "2025-06-01",
		vigenciaFin: "2025-12-31",
		estado: "Programada",
		descripcion: "Equipo de apoyo para zonas de afectación indirecta.",
		integrantes: [
			{
				usuarioId: "u7",
				rol: "Coordinador"
			},
			{
				usuarioId: "u9",
				rol: "Miembro"
			},
			{
				usuarioId: "u10",
				rol: "Miembro"
			}
		]
	}
];
var rolesBrigada = [
	"Coordinador",
	"Responsable Técnico",
	"Responsable Legal",
	"Especialista Predial",
	"Miembro"
];
var tiposUsuario = [
	"Técnico",
	"Legal",
	"Administrativo",
	"Otro"
];
var storagePrefix = "mtc-project-brigades";
var PROJECT_BRIGADES_UPDATED_EVENT = "mtc-project-brigades-updated";
function storageKey(projectId) {
	return `${storagePrefix}:${projectId}`;
}
function readProjectBrigades(projectId) {
	if (typeof window === "undefined") return initialProjectBrigades;
	try {
		const stored = window.localStorage.getItem(storageKey(projectId));
		if (!stored) return initialProjectBrigades;
		const parsed = JSON.parse(stored);
		return Array.isArray(parsed) && parsed.length ? parsed : initialProjectBrigades;
	} catch {
		return initialProjectBrigades;
	}
}
function writeProjectBrigades(projectId, brigades) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(storageKey(projectId), JSON.stringify(brigades));
	window.dispatchEvent(new CustomEvent(PROJECT_BRIGADES_UPDATED_EVENT, { detail: { projectId } }));
}
function getUsuarioEquipo(usuarioId) {
	return usuariosEquipo.find((usuario) => usuario.id === usuarioId);
}
//#endregion
export { rolesBrigada as a, writeProjectBrigades as c, readProjectBrigades as i, getUsuarioEquipo as n, tiposUsuario as o, initialProjectBrigades as r, usuariosEquipo as s, PROJECT_BRIGADES_UPDATED_EVENT as t };
