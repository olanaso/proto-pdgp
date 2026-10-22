import { l as descripcionDeVideo } from "./manuales-BLjtkE55.js";
import { useState } from "react";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ExternalLink, VideoOff } from "lucide-react";
//#region src/components/kit/Video.tsx
/**
* Reproductor de la ayuda: YouTube y Vimeo se incrustan; un MP4 o WebM se reproduce directo; cualquier
* otro enlace se abre en una pestaña nueva. Si el archivo no carga, avisa en lugar de mostrar un hueco.
*/
function ReproductorVideo({ url, titulo }) {
	const v = descripcionDeVideo(url);
	const [fallo, setFallo] = useState(false);
	if (v.tipo === "externo" || fallo) return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-start gap-2 rounded-md border border-border bg-muted p-3 text-sm",
		children: [fallo && /* @__PURE__ */ jsxs("p", {
			className: "flex items-center gap-2 text-destructive",
			children: [/* @__PURE__ */ jsx(VideoOff, {
				size: 16,
				"aria-hidden": true
			}), " Video no disponible. Avise al Administrador."]
		}), /* @__PURE__ */ jsxs("a", {
			href: v.src,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "inline-flex items-center gap-1 font-medium text-primary-dark underline underline-offset-2",
			children: [/* @__PURE__ */ jsx(ExternalLink, {
				size: 14,
				"aria-hidden": true
			}), " Abrir el video en una pestaña nueva"]
		})]
	});
	return /* @__PURE__ */ jsx("div", {
		className: "aspect-video w-full overflow-hidden rounded-md border border-border bg-foreground",
		children: v.tipo === "incrustado" ? /* @__PURE__ */ jsx("iframe", {
			src: v.src,
			title: titulo,
			className: "size-full",
			allow: "encrypted-media; picture-in-picture; fullscreen",
			referrerPolicy: "strict-origin-when-cross-origin"
		}) : /* @__PURE__ */ jsx("video", {
			src: v.src,
			title: titulo,
			controls: true,
			className: "size-full",
			onError: () => setFallo(true)
		})
	});
}
//#endregion
//#region src/routes/seguridad.manuales.$id.tsx
var $$splitComponentImporter = () => import("./seguridad.manuales._id-B8NDimQz.js");
var Route$1 = createFileRoute("/seguridad/manuales/$id")({
	validateSearch: (s) => ({ vista: typeof s.vista === "string" ? s.vista : void 0 }),
	head: () => ({ meta: [{ title: "Editar ayuda · PDGP" }, {
		name: "description",
		content: "Manual, video y tutorial de una vista del sistema."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Elementos que el tutorial puede señalar sin escribir un selector a mano. */
//#endregion
export { ReproductorVideo as n, Route$1 as t };
