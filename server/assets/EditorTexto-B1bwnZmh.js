import { i as TooltipContent, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bold, ImagePlus, Italic, Link2, List, ListOrdered, Underline } from "lucide-react";
//#region src/components/kit/EditorTexto.tsx
/**
* Editor de texto acotado: negrita, cursiva, subrayado, listas y enlaces. El HTML que produce se sanea
* al mostrarlo (`sanear` en lib/anuncios). Sin dependencias: `contentEditable` y los comandos del navegador.
* Con `imagenes`, el botón «Insertar imagen» sube el archivo y pone `<img data-archivo="id">` donde está
* el cursor; la imagen se muestra con una URL de objeto que no se guarda en el HTML.
* ponytail: execCommand está en desuso pero lo soportan todos los navegadores; si se necesitan tablas, se
* cambia por una biblioteca sin tocar el modelo (el mensaje sigue siendo HTML).
*/
function EditorTexto({ id, valor, onCambio, invalido, descripcion, imagenes }) {
	const ref = useRef(null);
	const entrada = useRef(null);
	const [errorImagen, setErrorImagen] = useState("");
	const html = () => (ref.current?.innerHTML ?? "").replace(/\ssrc="blob:[^"]*"/g, "");
	useEffect(() => {
		if (ref.current && ref.current.innerHTML !== valor) ref.current.innerHTML = valor;
		const urls = [];
		ref.current?.querySelectorAll("img[data-archivo]").forEach((img) => {
			imagenes?.leer(img.dataset.archivo).then((b) => {
				if (!b) return;
				const u = URL.createObjectURL(b);
				urls.push(u);
				img.src = u;
			});
		});
		return () => urls.forEach((u) => URL.revokeObjectURL(u));
	}, []);
	const aplicar = (comando, arg) => {
		ref.current?.focus();
		document.execCommand(comando, false, arg);
		onCambio(html());
	};
	const seleccion = useRef(null);
	const insertarImagen = async (archivo) => {
		if (!imagenes) return;
		setErrorImagen("");
		if (!archivo.type.startsWith("image/")) {
			setErrorImagen(`«${archivo.name}» no es una imagen.`);
			return;
		}
		try {
			const { id: idArchivo, nombre } = await imagenes.subir(archivo);
			const blob = await imagenes.leer(idArchivo);
			const url = blob ? URL.createObjectURL(blob) : "";
			ref.current?.focus();
			if (seleccion.current) {
				const sel = window.getSelection();
				sel?.removeAllRanges();
				sel?.addRange(seleccion.current);
			}
			const alt = nombre.replace(/["<>&]/g, "");
			document.execCommand("insertHTML", false, `<img data-archivo="${idArchivo}" alt="${alt}" src="${url}">`);
			onCambio(html());
		} catch (e) {
			setErrorImagen(e.message);
		}
	};
	const comandos = [
		{
			nombre: "Negrita",
			icono: Bold,
			ejecutar: () => aplicar("bold")
		},
		{
			nombre: "Cursiva",
			icono: Italic,
			ejecutar: () => aplicar("italic")
		},
		{
			nombre: "Subrayado",
			icono: Underline,
			ejecutar: () => aplicar("underline")
		},
		{
			nombre: "Lista con viñetas",
			icono: List,
			ejecutar: () => aplicar("insertUnorderedList")
		},
		{
			nombre: "Lista numerada",
			icono: ListOrdered,
			ejecutar: () => aplicar("insertOrderedList")
		},
		{
			nombre: "Enlace",
			icono: Link2,
			ejecutar: () => {
				const url = window.prompt("Dirección del enlace (https://…)");
				if (url && /^(https?:\/\/|mailto:)/i.test(url.trim())) aplicar("createLink", url.trim());
			}
		},
		...imagenes ? [{
			nombre: "Insertar imagen",
			icono: ImagePlus,
			ejecutar: () => {
				const sel = window.getSelection();
				seleccion.current = sel?.rangeCount && ref.current?.contains(sel.anchorNode) ? sel.getRangeAt(0).cloneRange() : null;
				entrada.current?.click();
			}
		}] : []
	];
	return /* @__PURE__ */ jsxs("div", {
		className: `overflow-hidden rounded-md border bg-card focus-within:ring-2 focus-within:ring-primary/30 ${invalido ? "border-destructive" : "border-border focus-within:border-primary"}`,
		children: [
			/* @__PURE__ */ jsx("div", {
				role: "toolbar",
				"aria-label": "Formato del mensaje",
				className: "flex flex-wrap gap-1 border-b border-border bg-background px-2 py-1",
				children: comandos.map((c) => /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("button", {
						type: "button",
						onMouseDown: (e) => e.preventDefault(),
						onClick: c.ejecutar,
						"aria-label": c.nombre,
						className: "flex size-8 items-center justify-center rounded-sm text-foreground hover:bg-muted",
						children: /* @__PURE__ */ jsx(c.icono, {
							size: 16,
							"aria-hidden": true
						})
					})
				}), /* @__PURE__ */ jsx(TooltipContent, { children: c.nombre })] }, c.nombre))
			}),
			/* @__PURE__ */ jsx("div", {
				id,
				ref,
				role: "textbox",
				"aria-multiline": "true",
				"aria-label": "Mensaje del anuncio",
				"aria-invalid": invalido || void 0,
				"aria-describedby": descripcion,
				contentEditable: true,
				suppressContentEditableWarning: true,
				onInput: () => onCambio(html()),
				className: "anuncio-cuerpo min-h-48 px-3 py-2 text-base text-foreground focus:outline-none"
			}),
			imagenes && /* @__PURE__ */ jsx("input", {
				ref: entrada,
				type: "file",
				accept: "image/*",
				className: "sr-only",
				tabIndex: -1,
				"aria-hidden": true,
				onChange: (e) => {
					const f = e.target.files?.[0];
					e.target.value = "";
					if (f) insertarImagen(f);
				}
			}),
			errorImagen && /* @__PURE__ */ jsx("p", {
				role: "alert",
				className: "border-t border-border px-3 py-1.5 text-xs text-destructive",
				children: errorImagen
			})
		]
	});
}
//#endregion
export { EditorTexto as t };
