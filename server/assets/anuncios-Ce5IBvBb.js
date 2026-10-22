import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { C as puedeRedactar, O as useAnuncios, b as marcarLeido, d as estadoDe, g as lectorActual, j as vigentesParaUsuario, n as alcanceTexto, y as leido } from "./anuncios-CchLukSd.js";
import { o as VistaAnuncio } from "./Anuncio-BIz5COtU.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Check, Megaphone, Pencil } from "lucide-react";
//#region src/routes/anuncios.tsx?tsr-split=component
/** Anuncios para el perfil activo: vigentes arriba, anteriores plegados. */
function LecturaAnuncios() {
	const datos = useAnuncios();
	const rol = useRol();
	const [lector, setLector] = useState("");
	useEffect(() => setLector(lectorActual()), []);
	const vigentes = vigentesParaUsuario(datos.anuncios, rol);
	const anteriores = datos.anuncios.filter((a) => a.audiencia === "usuarios" && ["vencido", "archivado"].includes(estadoDe(a)) && (a.perfiles.length === 0 || a.perfiles.includes(rol)));
	const sinLeer = vigentes.filter((a) => !leido(datos, a.id, lector)).length;
	useEffect(() => {
		const id = window.location.hash.slice(1);
		if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
	}, [vigentes.length]);
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Megaphone,
			titulo: "Anuncios",
			descripcion: `Avisos para el perfil ${ROLES[rol]} · ${vigentes.length} vigentes · ${sinLeer} sin leer`,
			migas: [{
				texto: "Inicio",
				to: "/inicio"
			}, { texto: "Anuncios" }],
			acciones: puedeRedactar(rol) ? /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/seguridad/anuncios",
					children: [/* @__PURE__ */ jsx(Pencil, {}), " Redactar anuncios"]
				})
			}) : void 0
		}),
		vigentes.length === 0 ? /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx("p", {
			className: "py-8 text-center text-sm text-muted-foreground",
			children: "No hay anuncios vigentes para su perfil."
		}) }) : /* @__PURE__ */ jsx("div", {
			className: "space-y-3",
			children: vigentes.map((a) => /* @__PURE__ */ jsx(TarjetaAnuncio, {
				anuncio: a,
				leido: leido(datos, a.id, lector),
				onLeido: () => marcarLeido(a.id, lector)
			}, a.id))
		}),
		anteriores.length > 0 && /* @__PURE__ */ jsxs("details", {
			className: "mt-6 rounded-lg border border-border bg-card",
			children: [/* @__PURE__ */ jsxs("summary", {
				className: "cursor-pointer px-4 py-3 text-sm font-bold uppercase text-primary-dark",
				children: [
					"Anteriores (",
					anteriores.length,
					")"
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-3 border-t border-border p-4",
				children: anteriores.map((a) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-md bg-background p-3",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold",
							children: a.titulo
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mb-2 text-xs text-muted-foreground",
							children: [
								fechaHora(a.mostrarDesde || a.publicadoEl),
								" · ",
								alcanceTexto(a.alcance)
							]
						}),
						/* @__PURE__ */ jsx(VistaAnuncio, { anuncio: a })
					]
				}, a.id))
			})]
		})
	] });
}
function TarjetaAnuncio({ anuncio: a, leido: yaLeido, onLeido }) {
	const importante = a.prioridad === "importante";
	return /* @__PURE__ */ jsxs("article", {
		id: a.id,
		className: `scroll-mt-20 rounded-lg border bg-card ${importante ? "border-destructive" : "border-border"} ${yaLeido ? "" : "shadow-sm"}`,
		children: [/* @__PURE__ */ jsxs("header", {
			className: `flex flex-wrap items-start justify-between gap-2 border-b px-4 py-3 ${importante ? "border-destructive bg-destructive-soft" : "border-border"}`,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-base font-bold text-foreground",
					children: [importante && /* @__PURE__ */ jsx("span", {
						className: "mr-2 text-xs font-semibold uppercase text-destructive",
						children: "Importante"
					}), a.titulo]
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [
						fechaHora(a.mostrarDesde || a.publicadoEl),
						" · ",
						a.autor,
						" · ",
						alcanceTexto(a.alcance)
					]
				})]
			}), yaLeido ? /* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-1 text-xs font-medium text-success",
				children: [/* @__PURE__ */ jsx(Check, {
					size: 14,
					"aria-hidden": true
				}), " Leído"]
			}) : /* @__PURE__ */ jsxs(Button, {
				type: "button",
				size: "sm",
				variant: importante ? "default" : "outline",
				onClick: onLeido,
				children: [/* @__PURE__ */ jsx(Check, {}), " Marcar como leído"]
			})]
		}), /* @__PURE__ */ jsx(VistaAnuncio, {
			anuncio: a,
			className: "px-4 py-3"
		})]
	});
}
//#endregion
export { LecturaAnuncios as component };
