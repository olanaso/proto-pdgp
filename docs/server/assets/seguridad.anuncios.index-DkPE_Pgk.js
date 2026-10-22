import { h as fechaHora, r as proyectos } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, T as Confirmar, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { C as puedeRedactar, E as textoPlano, O as useAnuncios, S as publicarAhora, c as destinatarios, d as estadoDe, i as audienciaTexto, l as eliminarBorrador, n as alcanceTexto, o as copiarAnuncio, r as archivarAnuncio, t as NOMBRE_ESTADO } from "./anuncios-CchLukSd.js";
import { i as ModalAnuncio, n as EstadoAnuncioBadge } from "./Anuncio-BIz5COtU.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Archive, Copy, Eye, Megaphone, Pencil, Plus, Send, Trash2, Users } from "lucide-react";
//#region src/routes/seguridad.anuncios.index.tsx?tsr-split=component
var ESTADOS = [
	"publicado",
	"programado",
	"borrador",
	"vencido",
	"archivado"
];
function AnunciosPage() {
	const navigate = useNavigate();
	const rol = useRol();
	const { anuncios, lecturas } = useAnuncios();
	const [lecturasDe, setLecturasDe] = useState(null);
	const [vista, setVista] = useState(null);
	const [aArchivar, setAArchivar] = useState(null);
	const [aEliminar, setAEliminar] = useState(null);
	const [motivoEliminar, setMotivoEliminar] = useState("");
	const redacta = puedeRedactar(rol);
	const filas = useMemo(() => anuncios.map((a) => ({
		...a,
		estado: estadoDe(a),
		audienciaClave: a.audiencia,
		vieron: (lecturas[a.id] ?? []).length,
		total: destinatarios(a),
		buscar: `${a.titulo} ${textoPlano(a.mensaje)}`
	})), [anuncios, lecturas]);
	const cuenta = (e) => filas.filter((f) => f.estado === e).length;
	const filtros = useMemo(() => [
		{
			clave: "estado",
			etiqueta: "Estado",
			opciones: ESTADOS.map((e) => ({
				valor: e,
				texto: NOMBRE_ESTADO[e]
			}))
		},
		{
			clave: "audienciaClave",
			etiqueta: "Audiencia",
			opciones: [{
				valor: "usuarios",
				texto: "Usuarios del sistema"
			}, {
				valor: "sujetos_pasivos",
				texto: "Sujetos pasivos"
			}]
		},
		{
			clave: "alcance",
			etiqueta: "Alcance",
			opciones: [{
				valor: "todos",
				texto: "Todos los proyectos"
			}, ...proyectos.map((p) => ({
				valor: p.id,
				texto: alcanceTexto(p.id)
			}))]
		},
		{
			clave: "prioridad",
			etiqueta: "Prioridad",
			opciones: [{
				valor: "normal",
				texto: "Normal"
			}, {
				valor: "importante",
				texto: "Importante"
			}]
		}
	], []);
	const editar = (f) => navigate({
		to: "/seguridad/anuncios/$id",
		params: { id: f.id }
	});
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Anuncios",
			icono: Megaphone,
			descripcion: "Avisos para los usuarios del sistema o para los sujetos pasivos, de todos los proyectos o de uno. Se muestran en el portal, la campana y la pantalla Anuncios.",
			migas: [{ texto: "Seguridad y configuración" }, { texto: "Anuncios" }],
			acciones: redacta ? /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/seguridad/anuncios/$id",
					params: { id: "nuevo" },
					children: [/* @__PURE__ */ jsx(Plus, {}), " Nuevo anuncio"]
				})
			}) : void 0,
			columnas: [
				{
					clave: "titulo",
					titulo: "Anuncio",
					render: (f) => /* @__PURE__ */ jsxs("span", {
						className: "block max-w-xl",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2 font-semibold text-foreground",
								children: [f.prioridad === "importante" && /* @__PURE__ */ jsx("span", {
									className: "rounded-sm bg-destructive-soft px-1.5 text-xs font-semibold text-destructive",
									children: "Importante"
								}), /* @__PURE__ */ jsx("span", {
									className: "truncate",
									children: f.titulo
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "block truncate text-xs text-muted-foreground",
								children: textoPlano(f.mensaje)
							}),
							(f.portada || (f.adjuntos?.length ?? 0) > 0) && /* @__PURE__ */ jsx("span", {
								className: "block text-xs text-muted-foreground",
								children: [f.portada && "Con imagen destacada", f.adjuntos?.length && `${f.adjuntos.length} ${f.adjuntos.length === 1 ? "adjunto" : "adjuntos"}`].filter(Boolean).join(" · ")
							})
						]
					})
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (f) => /* @__PURE__ */ jsxs("span", {
						className: "flex flex-col items-start gap-0.5",
						children: [/* @__PURE__ */ jsx(EstadoAnuncioBadge, { anuncio: f }), /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: fechaHora(f.modificadoEl)
						})]
					})
				},
				{
					clave: "audienciaClave",
					titulo: "Destinatarios",
					render: (f) => /* @__PURE__ */ jsxs("span", {
						className: "block text-xs",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block",
							children: audienciaTexto(f)
						}), /* @__PURE__ */ jsx("span", {
							className: "block text-muted-foreground",
							children: alcanceTexto(f.alcance)
						})]
					})
				},
				{
					clave: "mostrarDesde",
					titulo: "Vigencia",
					render: (f) => /* @__PURE__ */ jsxs("span", {
						className: "block whitespace-nowrap text-xs",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "block",
							children: ["Desde ", f.mostrarDesde ? fechaHora(f.mostrarDesde) : "la publicación"]
						}), /* @__PURE__ */ jsx("span", {
							className: "block text-muted-foreground",
							children: f.ocultarEl ? `Hasta ${fechaHora(f.ocultarEl)}` : "Sin fecha de fin"
						})]
					})
				},
				{
					clave: "vieron",
					titulo: "Vieron",
					alinear: "derecha",
					render: (f) => /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: (e) => {
							e.stopPropagation();
							setLecturasDe(f);
						},
						className: "tabular-nums text-primary-dark underline underline-offset-2 hover:no-underline",
						title: "Ver quiénes lo leyeron",
						children: [
							f.vieron,
							" / ",
							f.total
						]
					})
				}
			],
			filas,
			claveFila: (f) => f.id,
			filtros,
			buscarEn: ["buscar"],
			placeholderBuscar: "Título o texto del anuncio",
			onFilaClick: setVista,
			accionesFila: redacta ? [
				{
					nombre: "Editar",
					icono: Pencil,
					onClick: editar,
					visible: (f) => f.estado !== "archivado"
				},
				{
					nombre: "Copiar como borrador",
					icono: Copy,
					onClick: (f) => editarCopia(f)
				},
				{
					nombre: "Publicar ahora",
					icono: Send,
					onClick: (f) => publicarAhora(f),
					visible: (f) => f.estado === "programado"
				},
				{
					nombre: "Ver quiénes lo leyeron",
					icono: Users,
					onClick: setLecturasDe,
					visible: (f) => f.estado !== "borrador"
				},
				{
					nombre: "Archivar",
					icono: Archive,
					onClick: setAArchivar,
					visible: (f) => [
						"publicado",
						"programado",
						"vencido"
					].includes(f.estado)
				},
				{
					nombre: "Eliminar borrador",
					icono: Trash2,
					destructiva: true,
					onClick: (f) => {
						setMotivoEliminar("");
						setAEliminar(f);
					},
					visible: (f) => f.estado === "borrador"
				}
			] : [{
				nombre: "Ver anuncio",
				icono: Eye,
				onClick: setVista
			}],
			exportar: (v) => exportarExcel("anuncios", [
				{
					titulo: "Título",
					valor: (f) => f.titulo
				},
				{
					titulo: "Estado",
					valor: (f) => NOMBRE_ESTADO[f.estado]
				},
				{
					titulo: "Prioridad",
					valor: (f) => f.prioridad === "importante" ? "Importante" : "Normal"
				},
				{
					titulo: "Audiencia",
					valor: (f) => audienciaTexto(f)
				},
				{
					titulo: "Alcance",
					valor: (f) => alcanceTexto(f.alcance)
				},
				{
					titulo: "Mostrar desde",
					valor: (f) => fechaHora(f.mostrarDesde)
				},
				{
					titulo: "Ocultar el",
					valor: (f) => fechaHora(f.ocultarEl)
				},
				{
					titulo: "Leyeron",
					valor: (f) => f.vieron
				},
				{
					titulo: "Destinatarios",
					valor: (f) => f.total
				},
				{
					titulo: "Mensaje",
					valor: (f) => textoPlano(f.mensaje)
				}
			], v),
			demo: "Datos de demostración: los anuncios y sus lecturas se guardan en este navegador; los destinatarios salen del directorio de muestra y del padrón de Jauja.",
			vacio: redacta ? "Aún no hay anuncios. Use «Nuevo anuncio» para redactar el primero." : "Aún no hay anuncios."
		}),
		/* @__PURE__ */ jsxs("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: [
				cuenta("publicado"),
				" publicados · ",
				cuenta("programado"),
				" programados · ",
				cuenta("borrador"),
				" ",
				"borradores · ",
				cuenta("vencido"),
				" vencidos · ",
				cuenta("archivado"),
				" archivados",
				!redacta && ` · El perfil ${ROLES[rol]} solo puede leer los anuncios.`
			]
		}),
		vista && /* @__PURE__ */ jsx(ModalAnuncio, {
			anuncio: vista,
			abierto: true,
			onCerrar: () => setVista(null),
			meta: `${audienciaTexto(vista)} · ${alcanceTexto(vista.alcance)} · ${NOMBRE_ESTADO[vista.estado]}`,
			pie: redacta && vista.estado !== "archivado" ? /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => editar(vista),
				children: [/* @__PURE__ */ jsx(Pencil, {}), " Editar anuncio"]
			}) : void 0
		}),
		/* @__PURE__ */ jsxs(Modal, {
			abierto: lecturasDe !== null,
			onCerrar: () => setLecturasDe(null),
			titulo: "Quiénes lo leyeron",
			descripcion: lecturasDe ? `${lecturasDe.titulo} · ${lecturasDe.vieron} de ${lecturasDe.total} destinatarios` : void 0,
			children: [/* @__PURE__ */ jsx(Tabla, {
				columnas: [{
					clave: "quien",
					titulo: lecturasDe?.audiencia === "sujetos_pasivos" ? "Sujeto pasivo" : "Usuario"
				}, {
					clave: "fecha",
					titulo: "Leído el",
					render: (l) => fechaHora(l.fecha)
				}],
				filas: lecturasDe ? lecturas[lecturasDe.id] ?? [] : [],
				claveFila: (l) => l.quien,
				vacio: "Nadie lo ha marcado como leído todavía."
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "Cuenta quien pulsa «Leído». Los sujetos pasivos aparecen con los cuatro últimos dígitos de su DNI."
			})]
		}),
		/* @__PURE__ */ jsx(Confirmar, {
			abierto: aArchivar !== null,
			onCerrar: () => setAArchivar(null),
			onConfirmar: () => aArchivar && archivarAnuncio(aArchivar),
			titulo: "Archivar anuncio",
			texto: `«${aArchivar?.titulo ?? ""}» deja de mostrarse y queda en el historial con sus lecturas.`,
			accion: "Archivar anuncio"
		}),
		/* @__PURE__ */ jsxs(Modal, {
			abierto: aEliminar !== null,
			onCerrar: () => setAEliminar(null),
			ancho: "sm",
			titulo: "Eliminar borrador",
			descripcion: `El borrador «${aEliminar?.titulo ?? ""}» se elimina. No se publicó nunca, así que nadie lo vio. Queda en el histórico.`,
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setAEliminar(null),
				children: "Cancelar"
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "destructive",
				disabled: motivoEliminar.trim().length < 5,
				onClick: () => {
					if (aEliminar) eliminarBorrador(aEliminar, motivoEliminar.trim());
					setAEliminar(null);
				},
				children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar borrador"]
			})] }),
			children: [/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-eliminar-anuncio",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}), /* @__PURE__ */ jsx("textarea", {
				id: "motivo-eliminar-anuncio",
				rows: 3,
				className: "h-auto w-full rounded-md border border-border bg-card px-3 py-2 text-base text-foreground",
				value: motivoEliminar,
				onChange: (e) => setMotivoEliminar(e.target.value),
				placeholder: "Por ejemplo: duplicado; se redactó de nuevo"
			})]
		})
	] });
	function editarCopia(f) {
		const copia = copiarAnuncio(f, ROLES[rol]);
		navigate({
			to: "/seguridad/anuncios/$id",
			params: { id: copia.id }
		});
	}
}
//#endregion
export { AnunciosPage as component };
