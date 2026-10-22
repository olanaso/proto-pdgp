import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
//#region src/components/kit/Aviso.tsx
var CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive",
	info: "border-border bg-muted text-foreground"
};
var ICONO = {
	exito: CheckCircle2,
	aviso: AlertCircle,
	error: AlertCircle,
	info: Info
};
/** Mensaje de resultado de una acción. Éxito y aviso anuncian (status); error interrumpe (alert). */
function Aviso({ tipo, children, onCerrar }) {
	const Icono = ICONO[tipo];
	return /* @__PURE__ */ jsxs("p", {
		role: tipo === "error" ? "alert" : "status",
		className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${CLASE[tipo]}`,
		children: [
			/* @__PURE__ */ jsx(Icono, {
				size: 16,
				className: "mt-0.5 shrink-0",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("span", {
				className: "min-w-0 flex-1",
				children
			}),
			onCerrar && /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onCerrar,
				"aria-label": "Cerrar aviso",
				className: "rounded-sm hover:opacity-70",
				children: /* @__PURE__ */ jsx(X, { size: 16 })
			})
		]
	});
}
/** Franja para listas y tableros con datos mock mientras no exista backend (R-17 / R-38). */
function DatosDemostracion({ children = "Datos de demostración: esta pantalla no está conectada a un servicio." }) {
	return /* @__PURE__ */ jsx("p", {
		className: "mb-4 rounded-md bg-warning-soft px-3 py-1.5 text-xs text-warning",
		children
	});
}
//#endregion
export { DatosDemostracion as n, Aviso as t };
