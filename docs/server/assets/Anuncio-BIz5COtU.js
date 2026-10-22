import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { T as sanear, d as estadoDe, k as useUrlArchivoAnuncio, s as descargarArchivoAnuncio, t as NOMBRE_ESTADO, u as esImagen, v as leerArchivoAnuncio, x as pesoArchivo } from "./anuncios-CchLukSd.js";
import { useEffect, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Check, Download, ExternalLink, FileText, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
//#region src/components/kit/Anuncio.tsx
var TONO = {
	borrador: "neutral",
	programado: "warning",
	publicado: "success",
	vencido: "neutral",
	archivado: "neutral"
};
function EstadoAnuncioBadge({ anuncio }) {
	const e = estadoDe(anuncio);
	return /* @__PURE__ */ jsx(StatusBadge, {
		tono: TONO[e],
		children: NOMBRE_ESTADO[e]
	});
}
/**
* Cuerpo del anuncio saneado. Se arma en el navegador (el servidor no tiene DOMParser) y las imágenes del
* mensaje se cargan de IndexedDB por su id.
*/
function CuerpoAnuncio({ html, className = "" }) {
	const [limpio, setLimpio] = useState("");
	const ref = useRef(null);
	useEffect(() => setLimpio(sanear(html)), [html]);
	useEffect(() => {
		const urls = [];
		let vivo = true;
		ref.current?.querySelectorAll("img[data-archivo]").forEach((img) => {
			leerArchivoAnuncio(img.dataset.archivo).then((b) => {
				if (!vivo || !b) return;
				const u = URL.createObjectURL(b);
				urls.push(u);
				img.src = u;
			});
		});
		return () => {
			vivo = false;
			urls.forEach((u) => URL.revokeObjectURL(u));
		};
	}, [limpio]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: `anuncio-cuerpo text-sm text-foreground ${className}`,
		dangerouslySetInnerHTML: { __html: limpio }
	});
}
/** Imagen guardada del anuncio. */
function ImagenAnuncio({ archivo, className, alt }) {
	const url = useUrlArchivoAnuncio(archivo.id);
	return url ? /* @__PURE__ */ jsx("img", {
		src: url,
		alt: alt ?? archivo.nombre,
		className
	}) : /* @__PURE__ */ jsx("span", {
		className: `block animate-pulse bg-muted ${className ?? ""}`,
		"aria-hidden": true
	});
}
function MiniaturaAdjunto({ archivo }) {
	const url = useUrlArchivoAnuncio(archivo.id);
	return /* @__PURE__ */ jsx("a", {
		href: url,
		target: "_blank",
		rel: "noopener noreferrer",
		title: `Ver ${archivo.nombre}`,
		className: "block aspect-4/3 overflow-hidden rounded-md border border-border bg-muted focus-visible:outline-2 focus-visible:outline-primary",
		children: url && /* @__PURE__ */ jsx("img", {
			src: url,
			alt: archivo.nombre,
			className: "size-full object-cover"
		})
	});
}
/** Imágenes en galería y archivos para descargar. */
function AdjuntosAnuncio({ adjuntos }) {
	if (!adjuntos?.length) return null;
	const imagenes = adjuntos.filter(esImagen);
	const archivos = adjuntos.filter((a) => !esImagen(a));
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 space-y-3",
		children: [imagenes.length > 0 && /* @__PURE__ */ jsx("ul", {
			className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
			"aria-label": "Imágenes del anuncio",
			children: imagenes.map((a) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(MiniaturaAdjunto, { archivo: a }) }, a.id))
		}), archivos.length > 0 && /* @__PURE__ */ jsx("ul", {
			className: "divide-y divide-border rounded-md border border-border",
			"aria-label": "Archivos del anuncio",
			children: archivos.map((a) => /* @__PURE__ */ jsxs("li", {
				className: "flex items-center gap-3 px-3 py-2",
				children: [
					/* @__PURE__ */ jsx(FileText, {
						size: 20,
						className: "shrink-0 text-primary-dark",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block truncate text-sm font-medium text-foreground",
							children: a.nombre
						}), /* @__PURE__ */ jsx("span", {
							className: "block text-xs text-muted-foreground",
							children: pesoArchivo(a.tamano)
						})]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => void descargarArchivoAnuncio(a),
						children: [/* @__PURE__ */ jsx(Download, {}), " Descargar"]
					})
				]
			}, a.id))
		})]
	});
}
/** Botón de acción del anuncio: abre la web o el correo en otra pestaña; una pantalla del sistema, aquí. */
function BotonAnuncio({ boton }) {
	if (!boton?.texto || !boton.url) return null;
	const interno = boton.url.startsWith("/");
	return /* @__PURE__ */ jsx(Button, {
		asChild: true,
		variant: "outline",
		children: /* @__PURE__ */ jsxs("a", {
			href: boton.url,
			target: interno ? void 0 : "_blank",
			rel: interno ? void 0 : "noopener noreferrer",
			children: [
				boton.texto,
				" ",
				!interno && /* @__PURE__ */ jsx(ExternalLink, {})
			]
		})
	});
}
/** El anuncio completo dentro de una tarjeta o lista: imagen destacada, mensaje, adjuntos y botón. */
function VistaAnuncio({ anuncio: a, className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className,
		children: [
			a.portada && /* @__PURE__ */ jsx(ImagenAnuncio, {
				archivo: a.portada,
				alt: "",
				className: "mb-3 max-h-72 w-full rounded-md object-cover"
			}),
			/* @__PURE__ */ jsx(CuerpoAnuncio, { html: a.mensaje }),
			/* @__PURE__ */ jsx(AdjuntosAnuncio, { adjuntos: a.adjuntos }),
			a.boton?.texto && /* @__PURE__ */ jsx("div", {
				className: "mt-3",
				children: /* @__PURE__ */ jsx(BotonAnuncio, { boton: a.boton })
			})
		]
	});
}
/**
* Ventana del anuncio, como los avisos emergentes de WordPress: la imagen destacada a todo el ancho arriba,
* luego el título, el mensaje, las imágenes y archivos, y al pie el botón de acción y «Marcar como leído».
*/
function ModalAnuncio({ anuncio: a, abierto, onCerrar, meta, pie }) {
	const importante = a.prioridad === "importante";
	return /* @__PURE__ */ jsx(DialogPrimitive.Root, {
		open: abierto,
		onOpenChange: (v) => !v && onCerrar(),
		children: /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [/* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-50 bg-black/70" }), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
			className: `fixed left-1/2 top-1/2 z-50 flex max-h-[92dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border bg-card focus:outline-none ${importante ? "border-destructive" : "border-border"}`,
			children: [
				/* @__PURE__ */ jsx(DialogPrimitive.Close, {
					"aria-label": "Cerrar",
					className: "absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary",
					children: /* @__PURE__ */ jsx(X, {
						size: 18,
						"aria-hidden": true
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "min-h-0 overflow-y-auto",
					children: [a.portada && /* @__PURE__ */ jsx(ImagenAnuncio, {
						archivo: a.portada,
						alt: "",
						className: "max-h-80 w-full object-cover"
					}), /* @__PURE__ */ jsxs("div", {
						className: "px-5 pt-4 pb-2",
						children: [
							importante && /* @__PURE__ */ jsx("p", {
								className: "mb-1 inline-flex rounded-sm bg-destructive-soft px-2 text-xs font-semibold uppercase text-destructive",
								children: "Importante"
							}),
							/* @__PURE__ */ jsx(DialogPrimitive.Title, {
								className: "pr-10 text-xl font-semibold text-primary-dark",
								children: a.titulo || "Sin título"
							}),
							/* @__PURE__ */ jsx(DialogPrimitive.Description, {
								className: meta ? "mt-0.5 text-xs text-muted-foreground" : "sr-only",
								children: meta || a.titulo
							}),
							/* @__PURE__ */ jsx(CuerpoAnuncio, {
								html: a.mensaje,
								className: "mt-3"
							}),
							/* @__PURE__ */ jsx(AdjuntosAnuncio, { adjuntos: a.adjuntos })
						]
					})]
				}),
				(pie || a.boton?.texto) && /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap justify-end gap-2 border-t border-border px-5 py-3",
					children: [/* @__PURE__ */ jsx(BotonAnuncio, { boton: a.boton }), pie]
				})
			]
		})] })
	});
}
/** Pie habitual de la ventana: «Más tarde» y «Marcar como leído». */
function PieLectura({ onMasTarde, onLeido }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
		type: "button",
		variant: "outline",
		onClick: onMasTarde,
		children: "Más tarde"
	}), /* @__PURE__ */ jsxs(Button, {
		type: "button",
		onClick: onLeido,
		children: [/* @__PURE__ */ jsx(Check, {}), " Marcar como leído"]
	})] });
}
//#endregion
export { PieLectura as a, ModalAnuncio as i, EstadoAnuncioBadge as n, VistaAnuncio as o, ImagenAnuncio as r, CuerpoAnuncio as t };
