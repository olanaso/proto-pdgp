import { useId } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/kit/Form.tsx
/** Clase común de controles: 36 px de alto, radio 4 px, foco rojo. */
var controlClase = "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted";
/**
* Dos mitades simétricas cuando el formulario mide 768 px o más; una columna por debajo. Se mide el ancho
* del propio formulario (consulta de contenedor), no el de la pantalla: así funciona igual en una
* página, en un modal angosto o en uno ancho.
*/
function FormGrid({ children, columnas = 2 }) {
	return /* @__PURE__ */ jsx("div", {
		className: "@container",
		children: /* @__PURE__ */ jsx("div", {
			className: `grid grid-cols-1 gap-x-8 gap-y-3 ${columnas === 2 ? "@3xl:grid-cols-2" : ""}`,
			children
		})
	});
}
/**
* Etiqueta a la izquierda (3 col) y control a la derecha (9 col), como en la Mesa de Partes, cuando el
* formulario mide 448 px o más; más angosto, la etiqueta va encima del control.
* Si `children` es una función recibe el id para asociar la etiqueta al control.
*/
function FormField({ etiqueta, obligatorio, icono: Icono, ayuda, error, ancho = "completo", children }) {
	const id = useId();
	const control = typeof children === "function" ? children(id) : children;
	return /* @__PURE__ */ jsxs("div", {
		className: `grid grid-cols-1 gap-1 @md:grid-cols-12 @md:items-start ${ancho === "doble" ? "col-span-full" : ""}`,
		children: [/* @__PURE__ */ jsxs("label", {
			htmlFor: id,
			className: "text-sm font-medium text-foreground @md:col-span-3 @md:pt-2",
			children: [etiqueta, obligatorio && /* @__PURE__ */ jsxs("span", {
				className: "text-destructive",
				"aria-hidden": true,
				children: [" ", "*"]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "@md:col-span-9",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex",
				children: [Icono && /* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-l-md border border-r-0 border-border bg-primary-soft text-primary-dark",
					children: /* @__PURE__ */ jsx(Icono, { size: 16 })
				}), /* @__PURE__ */ jsx("div", {
					className: `min-w-0 flex-1 ${Icono ? "[&>*]:rounded-l-none" : ""}`,
					children: control
				})]
			}), error ? /* @__PURE__ */ jsx("p", {
				role: "alert",
				className: "mt-1 text-xs text-destructive",
				children: error
			}) : ayuda && /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: ayuda
			})]
		})]
	});
}
/**
* Barra de botones al pie de un formulario. Orden (docs/DESIGN.md, Formularios): Cancelar o Volver,
* acciones secundarias (Guardar borrador), transiciones y, al final a la derecha, el único botón
* primario (Registrar o Guardar).
*/
function FormActions({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-4 flex flex-wrap justify-end gap-2 border-t border-border pt-4",
		children
	});
}
/** Alternador Sí / No (rojo oscuro cuando activo, como en la referencia). */
function SiNo({ valor, onCambiar, nombre }) {
	const base = "h-9 px-4 text-sm font-semibold focus-visible:z-10";
	return /* @__PURE__ */ jsxs("div", {
		role: "group",
		"aria-label": nombre,
		className: "inline-flex overflow-hidden rounded-md border border-border",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			"aria-pressed": valor,
			onClick: () => onCambiar(true),
			className: `${base} rounded-l-md ${valor ? "bg-primary-dark text-primary-foreground" : "bg-muted text-foreground hover:bg-primary-soft"}`,
			children: "Sí"
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			"aria-pressed": !valor,
			onClick: () => onCambiar(false),
			className: `${base} rounded-r-md ${!valor ? "bg-primary-dark text-primary-foreground" : "bg-muted text-foreground hover:bg-primary-soft"}`,
			children: "No"
		})]
	});
}
//#endregion
export { controlClase as a, SiNo as i, FormField as n, FormGrid as r, FormActions as t };
