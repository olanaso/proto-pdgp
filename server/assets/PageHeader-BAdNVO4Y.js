import { t as Button } from "./button-DH6ZQkjT.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { E as Modal, Ot as BotonAyuda } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Activity } from "lucide-react";
//#region src/components/kit/PageHeader.tsx
/** Tarjeta de título: única por pantalla. Ícono + nombre a la izquierda, acciones a la derecha. */
function PageHeader({ icono: Icono, titulo, descripcion, migas, acciones }) {
	const ruta = useRouterState({ select: (s) => s.location.pathname.replace(/\/+$/, "") || "/" });
	const claveActividad = `actividad-${ruta}`;
	const actividad = useHistorial(claveActividad);
	const [verActividad, setVerActividad] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-4 rounded-lg border border-border bg-card px-4 py-3",
		"data-ayuda": "encabezado",
		children: [
			migas && migas.length > 0 && /* @__PURE__ */ jsx("nav", {
				"aria-label": "Ubicación",
				className: "mb-1 flex flex-wrap items-center gap-1 text-xs text-muted-foreground",
				children: migas.map((m, i) => /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-1",
					children: [i > 0 && /* @__PURE__ */ jsx("span", {
						"aria-hidden": true,
						children: "/"
					}), m.to ? /* @__PURE__ */ jsx(Link, {
						to: m.to,
						params: m.params,
						className: "hover:text-primary-dark hover:underline",
						children: m.texto
					}) : /* @__PURE__ */ jsx("span", { children: m.texto })]
				}, `${m.texto}-${i}`))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ jsx(Icono, {
						size: 22,
						className: "shrink-0 text-primary",
						"aria-hidden": true
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "text-2xl font-bold uppercase text-primary-dark sm:truncate",
							children: titulo
						}), descripcion && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: descripcion
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						acciones,
						actividad.length > 0 && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => setVerActividad(true),
							"data-print-hidden": true,
							children: [
								/* @__PURE__ */ jsx(Activity, {}),
								" Actividad (",
								actividad.length,
								")"
							]
						}),
						/* @__PURE__ */ jsx(BotonAyuda, {})
					]
				})]
			}),
			/* @__PURE__ */ jsx(Modal, {
				abierto: verActividad,
				onCerrar: () => setVerActividad(false),
				ancho: "xl",
				titulo: "Actividad de esta pantalla",
				descripcion: "Descargas y otras acciones registradas, de la más reciente a la más antigua.",
				children: verActividad && /* @__PURE__ */ jsx(Historico, {
					registro: claveActividad,
					nombreArchivo: `actividad${ruta.replace(/\//g, "-")}`
				})
			})
		]
	});
}
//#endregion
export { PageHeader as t };
