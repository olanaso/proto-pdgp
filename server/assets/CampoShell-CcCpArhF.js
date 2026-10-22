import { w as useUltimaPosicion, x as useEnLinea } from "./campo-Dn2b-x9H.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, LocateFixed, Wifi, WifiOff } from "lucide-react";
//#region src/components/campo/CampoShell.tsx
/**
* Cabecera y marco del recolector de campo (tablet y celular): franja roja de 56 px con Atrás, título y
* proyecto, y los indicadores de GPS y conexión. Sin sidebar. El pie, si lo hay, queda fijo abajo para que
* Atrás y Siguiente estén siempre a la vista (docs/PLAN-RECOLECTOR-CAMPO.md §3).
*/
function CampoShell({ titulo, subtitulo, onAtras, derecha, pie, pantallaCompleta, children }) {
	const enLinea = useEnLinea();
	const gps = useUltimaPosicion();
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "sticky top-0 z-40 flex h-14 items-center gap-1 bg-primary px-2 text-primary-foreground",
				children: [
					onAtras ? /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onAtras,
						"aria-label": "Atrás",
						className: "flex size-11 shrink-0 items-center justify-center rounded-md hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-primary-foreground",
						children: /* @__PURE__ */ jsx(ChevronLeft, {
							size: 26,
							"aria-hidden": true
						})
					}) : /* @__PURE__ */ jsx("span", {
						className: "w-2",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "truncate text-base font-semibold leading-tight",
							children: titulo
						}), subtitulo && /* @__PURE__ */ jsx("p", {
							className: "truncate text-xs leading-tight opacity-90",
							children: subtitulo
						})]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "flex size-9 items-center justify-center",
						title: gps ? `GPS: ±${gps.precision} m a las ${new Date(gps.hora).toLocaleTimeString("es-PE", {
							hour: "2-digit",
							minute: "2-digit"
						})}` : "Sin posición GPS tomada",
						children: [/* @__PURE__ */ jsx(LocateFixed, {
							size: 18,
							className: gps ? "" : "opacity-50",
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("span", {
							className: "sr-only",
							children: gps ? `GPS ±${gps.precision} m` : "Sin GPS"
						})]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "flex size-9 items-center justify-center",
						title: enLinea ? "Con conexión" : "Sin conexión: lo registrado se guarda en el equipo",
						children: [enLinea ? /* @__PURE__ */ jsx(Wifi, {
							size: 18,
							"aria-hidden": true
						}) : /* @__PURE__ */ jsx(WifiOff, {
							size: 18,
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("span", {
							className: "sr-only",
							children: enLinea ? "Con conexión" : "Sin conexión"
						})]
					}),
					derecha
				]
			}),
			/* @__PURE__ */ jsx("main", {
				className: pantallaCompleta ? "relative h-[calc(100dvh-3.5rem)] w-full overflow-hidden" : `mx-auto w-full max-w-screen-md px-4 py-4 ${pie ? "pb-32" : "pb-8"}`,
				children
			}),
			pie && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto flex w-full max-w-screen-md gap-3",
					children: pie
				})
			})
		]
	});
}
var PUNTO = {
	pendiente: "bg-muted-foreground/40",
	curso: "bg-warning",
	completo: "bg-success"
};
function PuntoEstado({ estado, etiqueta }) {
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
		children: [/* @__PURE__ */ jsx("span", {
			className: `size-2.5 shrink-0 rounded-full ${PUNTO[estado]}`,
			"aria-hidden": true
		}), etiqueta]
	});
}
/** Tarjeta tocable a todo el ancho: un bloque, un proyecto o un predio. */
function TarjetaCampo({ titulo, detalle, icono: Icono, estado, extra, onClick, destacada }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: `flex min-h-16 w-full items-center gap-3 rounded-lg border p-4 text-left hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary ${destacada ? "border-primary bg-card" : "border-border bg-card"}`,
		children: [
			Icono && /* @__PURE__ */ jsx("span", {
				className: "flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark",
				children: /* @__PURE__ */ jsx(Icono, {
					size: 26,
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "block text-base font-semibold text-foreground",
						children: titulo
					}),
					detalle && /* @__PURE__ */ jsx("span", {
						className: "mt-0.5 block text-sm text-muted-foreground",
						children: detalle
					}),
					estado && /* @__PURE__ */ jsx("span", {
						className: "mt-1 block",
						children: /* @__PURE__ */ jsx(PuntoEstado, {
							estado: estado.estado,
							etiqueta: estado.texto
						})
					}),
					extra
				]
			}),
			/* @__PURE__ */ jsx(ChevronRight, {
				size: 22,
				className: "shrink-0 text-muted-foreground",
				"aria-hidden": true
			})
		]
	});
}
/** Título de bloque dentro de una pantalla de campo. */
function TituloCampo({ children, accion }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-6 mb-2 flex items-center justify-between gap-2 first:mt-0",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-sm font-semibold uppercase text-primary-dark",
			children
		}), accion]
	});
}
//#endregion
export { TituloCampo as i, PuntoEstado as n, TarjetaCampo as r, CampoShell as t };
