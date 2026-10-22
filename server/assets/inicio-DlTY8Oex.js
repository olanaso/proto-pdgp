import { s as BLOQUES, u as ROLES } from "./historial-Bc37nCTn.js";
import { l as tienePermiso, u as useRol } from "./permisos-C7yUz4DS.js";
import { Ct as recordarModulo } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as FranjaAnuncios } from "./FranjaAnuncios-DOF5aRC8.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
//#region src/routes/inicio.tsx?tsr-split=component
/** Orden del esquema de la plataforma: columnas del flujo de izquierda a derecha, luego las franjas transversales de arriba abajo. */
var ORDEN = [
	10,
	11,
	12,
	30,
	14,
	15,
	16,
	17,
	21,
	18,
	19,
	20,
	22,
	29,
	13,
	23,
	24,
	25,
	26,
	27,
	28,
	9,
	8
];
/** Color del ícono por bloque: sin encabezados de grupo, el color es lo que distingue el bloque. */
var COLOR_BLOQUE = {
	1: "bg-primary-dark",
	2: "bg-sky-700",
	3: "bg-emerald-700",
	4: "bg-amber-700",
	5: "bg-violet-700",
	6: "bg-slate-600"
};
/** Portal tras el ingreso: cuadrícula plana de módulos, filtrada por el permiso de lectura del perfil. */
function PortalPage() {
	const rol = useRol();
	const [usuario, setUsuario] = useState("");
	const [filtro, setFiltro] = useState("");
	useEffect(() => {
		try {
			setUsuario(localStorage.getItem("mtc-session") ?? "");
		} catch {}
	}, []);
	const q = filtro.trim().toLowerCase();
	const modulos = BLOQUES.flatMap((b) => b.modulos.map((m) => ({
		...m,
		bloque: b
	}))).filter((m) => !m.oculto && tienePermiso(rol, m.numero, "Lectura") && (!q || m.nombre.toLowerCase().includes(q) || String(m.numero) === q)).sort((a, b) => ORDEN.indexOf(a.numero) - ORDEN.indexOf(b.numero));
	return /* @__PURE__ */ jsx("main", {
		className: "min-h-[calc(100vh-3.5rem)] bg-muted px-4 py-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-screen-2xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-xl font-semibold text-foreground",
						children: "Módulos"
					}), /* @__PURE__ */ jsxs("p", {
						className: "mt-0.5 text-sm text-muted-foreground",
						children: [usuario ? `Sesión de ${usuario} · ` : "", ROLES[rol]]
					})] }), /* @__PURE__ */ jsxs("label", {
						className: "relative w-full max-w-md",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "Filtrar módulos"
							}),
							/* @__PURE__ */ jsx(Search, {
								size: 16,
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": true
							}),
							/* @__PURE__ */ jsx("input", {
								type: "search",
								value: filtro,
								onChange: (e) => setFiltro(e.target.value),
								placeholder: "Buscar…",
								className: "h-9 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsx(FranjaAnuncios, {}),
				modulos.length === 0 ? /* @__PURE__ */ jsx("p", {
					role: "status",
					className: "mt-6 rounded-md bg-card px-4 py-3 text-sm text-foreground",
					children: q ? `Ningún módulo coincide con «${filtro.trim()}».` : `El perfil ${ROLES[rol]} no tiene módulos asignados. Cambie de perfil en la barra superior.`
				}) : /* @__PURE__ */ jsx("ul", {
					className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
					children: modulos.map((m) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
						to: m.to,
						onClick: () => recordarModulo(m.numero),
						className: "group flex h-full gap-3 rounded-sm border border-border bg-card p-2 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary",
						children: [/* @__PURE__ */ jsx("span", {
							className: `grid size-16 shrink-0 place-items-center rounded-sm text-white ${COLOR_BLOQUE[m.bloque.numero]}`,
							children: /* @__PURE__ */ jsx(m.icono, {
								size: 34,
								strokeWidth: 1.75,
								"aria-hidden": true
							})
						}), /* @__PURE__ */ jsxs("span", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium leading-snug text-foreground",
									children: m.nombre
								}),
								/* @__PURE__ */ jsx("span", {
									className: "truncate text-xs text-muted-foreground",
									title: m.bloque.nombre,
									children: m.bloque.nombre
								}),
								/* @__PURE__ */ jsx("span", {
									className: "mt-auto self-end rounded-sm border border-border px-2 py-0.5 text-xs text-foreground group-hover:bg-muted",
									children: "Abrir"
								})
							]
						})]
					}) }, m.numero))
				})
			]
		})
	});
}
//#endregion
export { PortalPage as component };
