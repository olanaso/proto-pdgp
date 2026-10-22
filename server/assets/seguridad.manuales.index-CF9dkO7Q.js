import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, T as Confirmar, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { g as lectorActual } from "./anuncios-CchLukSd.js";
import { C as listarVistas, S as useAyudas, _ as puedePublicarAyuda, b as ultimaActualizacion, c as desactualizada, g as publicarAyuda, o as contenidoDe, p as eliminarBorradorAyuda, r as archivarAyuda, s as crearBorradoresFaltantes, t as NOMBRE_ESTADO_AYUDA, v as puedeRedactarAyuda } from "./manuales-BLjtkE55.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useMemo, useState } from "react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Archive, CircleHelp, Pencil, Plus, Send, Sparkles, Trash2 } from "lucide-react";
//#region src/routes/seguridad.manuales.index.tsx?tsr-split=component
var TONO = {
	PUBLICADO: "success",
	BORRADOR: "warning",
	ARCHIVADO: "neutral",
	SIN_AYUDA: "neutral"
};
function Marca({ si, texto }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-block rounded-sm px-1.5 text-xs font-medium ${si ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"}`,
		title: si ? `Tiene ${texto.toLowerCase()}` : `Sin ${texto.toLowerCase()}`,
		children: texto
	});
}
function ManualesPage() {
	const navigate = useNavigate();
	const router = useRouter();
	const rol = useRol();
	const ayudas = useAyudas();
	const redacta = puedeRedactarAyuda(rol);
	const publica = puedePublicarAyuda(rol);
	const [aArchivar, setAArchivar] = useState(null);
	const [motivo, setMotivo] = useState("");
	const [aEliminar, setAEliminar] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const vistas = useMemo(() => listarVistas(Object.keys(router.routesByPath)), [router]);
	const filas = useMemo(() => {
		const porVista = new Map(ayudas.filter((a) => a.estado !== "ARCHIVADO").map((a) => [a.vista, a]));
		const base = vistas.map((v) => {
			const a = porVista.get(v.ruta);
			const tiene = a ? contenidoDe(a) : {
				manual: false,
				video: false,
				tutorial: false
			};
			return {
				clave: v.ruta,
				vista: v,
				ayuda: a,
				estado: a ? a.estado : "SIN_AYUDA",
				modulo: v.moduloNombre,
				tipo: [
					tiene.manual && "manual",
					tiene.video && "video",
					tiene.tutorial && "tutorial"
				].filter(Boolean).join(" "),
				tiene,
				actualizado: a ? ultimaActualizacion(a) : "",
				revisar: a?.estado === "PUBLICADO" && desactualizada(ultimaActualizacion(a)),
				buscar: `${v.nombre} ${v.moduloNombre} ${v.ruta} ${a?.titulo ?? ""}`
			};
		});
		const rutas = new Set(vistas.map((v) => v.ruta));
		for (const a of ayudas) {
			if (rutas.has(a.vista) && a.estado !== "ARCHIVADO") continue;
			const v = {
				ruta: a.vista,
				nombre: a.titulo,
				modulo: 0,
				moduloNombre: "Otras",
				ambito: "general"
			};
			const tiene = contenidoDe(a);
			base.push({
				clave: a.id,
				vista: v,
				ayuda: a,
				estado: a.estado,
				modulo: rutas.has(a.vista) ? vistas.find((x) => x.ruta === a.vista)?.moduloNombre ?? "Otras" : "Otras",
				tipo: [
					tiene.manual && "manual",
					tiene.video && "video",
					tiene.tutorial && "tutorial"
				].filter(Boolean).join(" "),
				tiene,
				actualizado: ultimaActualizacion(a),
				revisar: false,
				buscar: `${a.titulo} ${a.vista}`
			});
		}
		return base;
	}, [ayudas, vistas]);
	const sinAyuda = filas.filter((f) => f.estado === "SIN_AYUDA").length;
	const publicadas = filas.filter((f) => f.estado === "PUBLICADO").length;
	const filtros = useMemo(() => [
		{
			clave: "estado",
			etiqueta: "Estado",
			opciones: [
				{
					valor: "SIN_AYUDA",
					texto: "Sin ayuda"
				},
				{
					valor: "BORRADOR",
					texto: "Borrador"
				},
				{
					valor: "PUBLICADO",
					texto: "Publicado"
				},
				{
					valor: "ARCHIVADO",
					texto: "Archivado"
				}
			]
		},
		{
			clave: "modulo",
			etiqueta: "Módulo",
			opciones: [...new Set(vistas.map((v) => v.moduloNombre))].map((m) => ({
				valor: m,
				texto: m
			}))
		},
		{
			clave: "tipo",
			etiqueta: "Contenido",
			opciones: [
				{
					valor: "manual",
					texto: "Con manual"
				},
				{
					valor: "video",
					texto: "Con video"
				},
				{
					valor: "tutorial",
					texto: "Con tutorial"
				}
			]
		}
	], [vistas]);
	const editar = (f) => f.ayuda ? navigate({
		to: "/seguridad/manuales/$id",
		params: { id: f.ayuda.id }
	}) : navigate({
		to: "/seguridad/manuales/$id",
		params: { id: "nuevo" },
		search: { vista: f.vista.ruta }
	});
	const acciones = [
		{
			nombre: redacta ? "Editar o redactar" : "Ver ayuda",
			icono: Pencil,
			onClick: editar
		},
		...publica ? [{
			nombre: "Publicar",
			icono: Send,
			onClick: (f) => {
				if (!f.ayuda) return;
				publicarAyuda(f.ayuda);
				setMensaje("Se publicó la ayuda de «" + f.vista.nombre + "».");
			},
			visible: (f) => f.estado === "BORRADOR"
		}, {
			nombre: "Archivar",
			icono: Archive,
			onClick: (f) => {
				setMotivo("");
				setAArchivar(f);
			},
			visible: (f) => f.estado === "PUBLICADO"
		}] : [],
		...redacta ? [{
			nombre: "Eliminar borrador",
			icono: Trash2,
			destructiva: true,
			onClick: (f) => setAEliminar(f),
			visible: (f) => f.estado === "BORRADOR"
		}] : []
	];
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Ayuda por vista",
			icono: CircleHelp,
			descripcion: `Manuales, videos y tutoriales de cada pantalla. ${publicadas} publicadas · ${sinAyuda} vistas sin ayuda.`,
			migas: [{ texto: "Seguridad y configuración" }, { texto: "Ayuda" }],
			acciones: redacta ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => {
					const n = crearBorradoresFaltantes(vistas, lectorActual());
					setMensaje(n ? `Se crearon ${n} borradores. Revíselos y complételos antes de publicar.` : "Todas las vistas ya tienen ayuda.");
				},
				children: [/* @__PURE__ */ jsx(Sparkles, {}), " Generar borradores faltantes"]
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/seguridad/manuales/$id",
					params: { id: "nuevo" },
					children: [/* @__PURE__ */ jsx(Plus, {}), " Nueva ayuda"]
				})
			})] }) : void 0,
			columnas: [
				{
					clave: "buscar",
					titulo: "Vista",
					render: (f) => /* @__PURE__ */ jsxs("span", {
						className: "block max-w-md",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block font-semibold text-foreground",
							children: f.vista.nombre
						}), /* @__PURE__ */ jsx("span", {
							className: "block truncate text-xs text-muted-foreground",
							children: f.vista.ruta
						})]
					})
				},
				{
					clave: "modulo",
					titulo: "Módulo"
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (f) => /* @__PURE__ */ jsxs("span", {
						className: "flex flex-col items-start gap-0.5",
						children: [/* @__PURE__ */ jsx(StatusBadge, {
							tono: TONO[f.estado],
							children: f.estado === "SIN_AYUDA" ? "Sin ayuda" : NOMBRE_ESTADO_AYUDA[f.estado]
						}), f.revisar && /* @__PURE__ */ jsx("span", {
							className: "text-xs text-warning",
							children: "Revisar vigencia"
						})]
					})
				},
				{
					clave: "tipo",
					titulo: "Contenido",
					ordenable: false,
					render: (f) => /* @__PURE__ */ jsxs("span", {
						className: "flex gap-1",
						children: [
							/* @__PURE__ */ jsx(Marca, {
								si: f.tiene.manual,
								texto: "Manual"
							}),
							/* @__PURE__ */ jsx(Marca, {
								si: f.tiene.video,
								texto: "Video"
							}),
							/* @__PURE__ */ jsx(Marca, {
								si: f.tiene.tutorial,
								texto: "Tutorial"
							})
						]
					})
				},
				{
					clave: "actualizado",
					titulo: "Última subida",
					render: (f) => f.actualizado ? /* @__PURE__ */ jsxs("span", {
						className: "block whitespace-nowrap text-xs",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block",
							children: fechaHora(f.actualizado)
						}), /* @__PURE__ */ jsx("span", {
							className: "block text-muted-foreground",
							children: f.ayuda?.manual?.actualizadoPor ?? f.ayuda?.autor
						})]
					}) : /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: "—"
					})
				}
			],
			filas,
			claveFila: (f) => f.clave,
			filtros,
			buscarEn: ["buscar"],
			placeholderBuscar: "Nombre de la vista, módulo o ruta",
			accionesFila: acciones,
			onFilaClick: editar,
			exportar: (v) => exportarExcel("ayuda-por-vista", [
				{
					titulo: "Vista",
					valor: (f) => f.vista.nombre
				},
				{
					titulo: "Ruta",
					valor: (f) => f.vista.ruta
				},
				{
					titulo: "Módulo",
					valor: (f) => f.modulo
				},
				{
					titulo: "Estado",
					valor: (f) => f.estado
				},
				{
					titulo: "Manual",
					valor: (f) => f.tiene.manual ? "Sí" : "No"
				},
				{
					titulo: "Video",
					valor: (f) => f.tiene.video ? "Sí" : "No"
				},
				{
					titulo: "Tutorial",
					valor: (f) => f.tiene.tutorial ? "Sí" : "No"
				},
				{
					titulo: "Última subida",
					valor: (f) => f.actualizado ? fechaHora(f.actualizado) : ""
				}
			], v, {
				titulo: "Ayuda por vista",
				lineas: [`${publicadas} publicadas · ${sinAyuda} vistas sin ayuda`]
			}),
			vacio: "No hay vistas."
		}),
		mensaje && /* @__PURE__ */ jsx("div", {
			className: "mt-4",
			children: /* @__PURE__ */ jsx(Aviso, {
				tipo: "exito",
				onCerrar: () => setMensaje(null),
				children: mensaje
			})
		}),
		/* @__PURE__ */ jsxs(Modal, {
			abierto: aArchivar !== null,
			onCerrar: () => setAArchivar(null),
			ancho: "sm",
			titulo: "Archivar ayuda",
			descripcion: `«${aArchivar?.vista.nombre ?? ""}» deja de mostrarse a los usuarios. Queda en el histórico.`,
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setAArchivar(null),
				children: "Cancelar"
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				disabled: motivo.trim().length < 5,
				onClick: () => {
					if (aArchivar?.ayuda) archivarAyuda(aArchivar.ayuda, motivo.trim());
					setAArchivar(null);
				},
				children: [/* @__PURE__ */ jsx(Archive, {}), " Archivar"]
			})] }),
			children: [/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-archivo",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}), /* @__PURE__ */ jsx("textarea", {
				id: "motivo-archivo",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value),
				placeholder: "Por ejemplo: la pantalla cambió; se redacta una nueva"
			})]
		}),
		/* @__PURE__ */ jsx(Confirmar, {
			abierto: aEliminar !== null,
			onCerrar: () => setAEliminar(null),
			titulo: "Eliminar borrador",
			texto: `Se elimina el borrador de «${aEliminar?.vista.nombre ?? ""}». Esta acción no se puede deshacer.`,
			accion: "Eliminar borrador",
			onConfirmar: () => {
				if (aEliminar?.ayuda) eliminarBorradorAyuda(aEliminar.ayuda);
				setAEliminar(null);
			}
		})
	] });
}
//#endregion
export { ManualesPage as component };
