import { t as Button } from "./button-DH6ZQkjT.js";
import { t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { useEffect, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ArrowRight } from "lucide-react";
//#region src/components/campo/Asistente.tsx
/**
* Asistente de un paso por pantalla: barra de avance, el paso actual y el pie fijo con Atrás y Siguiente.
* En el último paso el pie muestra `final` (Guardar, Guardar y enviar). Atrás en el primer paso sale.
*/
function Asistente({ titulo, subtitulo, pasos, paso, onPaso, onSalir, final }) {
	const [error, setError] = useState("");
	const tituloPaso = useRef(null);
	const actual = pasos[paso];
	const ultimo = paso === pasos.length - 1;
	useEffect(() => {
		setError("");
		window.scrollTo({ top: 0 });
		tituloPaso.current?.focus();
	}, [paso]);
	const atras = () => paso === 0 ? onSalir() : onPaso(paso - 1);
	const siguiente = () => {
		const e = actual.validar?.() ?? null;
		setError(e ?? "");
		if (!e) onPaso(paso + 1);
	};
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo,
		subtitulo,
		onAtras: atras,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			className: "h-12 flex-1 text-base",
			onClick: atras,
			children: [
				/* @__PURE__ */ jsx(ArrowLeft, {}),
				" ",
				paso === 0 ? "Salir" : "Atrás"
			]
		}), ultimo ? final : /* @__PURE__ */ jsxs(Button, {
			type: "button",
			className: "h-12 flex-1 text-base",
			onClick: siguiente,
			children: ["Siguiente ", /* @__PURE__ */ jsx(ArrowRight, {})]
		})] }),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Paso ",
							paso + 1,
							" de ",
							pasos.length
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-1 flex gap-1",
						role: "progressbar",
						"aria-valuemin": 1,
						"aria-valuemax": pasos.length,
						"aria-valuenow": paso + 1,
						"aria-label": "Avance del registro",
						children: pasos.map((p, i) => /* @__PURE__ */ jsx("span", { className: `h-1.5 flex-1 rounded-full ${i <= paso ? "bg-primary" : "bg-border"}` }, p.titulo))
					}),
					/* @__PURE__ */ jsx("h2", {
						ref: tituloPaso,
						tabIndex: -1,
						className: "mt-3 text-xl font-semibold text-foreground focus:outline-none",
						children: actual.titulo
					}),
					actual.ayuda && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: actual.ayuda
					})
				]
			}),
			actual.contenido,
			error && /* @__PURE__ */ jsx("p", {
				role: "alert",
				className: "mt-2 rounded-md border border-destructive bg-destructive-soft px-3 py-2 text-sm font-medium text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { Asistente as t };
