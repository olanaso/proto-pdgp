import { d as semaforo, l as diasHabilesRestantes, m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { r as cn } from "./button-DH6ZQkjT.js";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
//#region src/components/ui/tooltip.tsx
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
//#endregion
//#region src/components/kit/Badges.tsx
var TONOS = {
	success: "bg-success-soft text-success",
	warning: "bg-warning-soft text-warning",
	destructive: "bg-destructive-soft text-destructive",
	primary: "bg-primary-soft text-primary-dark",
	neutral: "bg-muted text-muted-foreground"
};
function StatusBadge({ tono = "neutral", children }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex min-h-6 max-w-full items-center rounded-sm px-2 py-0.5 text-xs sm:whitespace-nowrap font-semibold ${TONOS[tono]}`,
		children
	});
}
var SEMAFORO = {
	verde: {
		tono: "success",
		texto: (d) => `${d} d.h. restantes`
	},
	ambar: {
		tono: "warning",
		texto: (d) => d === 0 ? "vence hoy" : `${d} d.h. restantes`
	},
	rojo: {
		tono: "destructive",
		texto: (d) => `vencido hace ${-d} d.h.`
	}
};
/** Semáforo de plazo legal. El color nunca va solo: siempre con la fecha y los días. */
function PlazoBadge({ vence, hoy, etiqueta }) {
	const estado = semaforo(vence, hoy);
	const restan = diasHabilesRestantes(vence, hoy);
	const s = SEMAFORO[estado];
	return /* @__PURE__ */ jsxs(StatusBadge, {
		tono: s.tono,
		children: [
			etiqueta ? `${etiqueta}: ` : "",
			"vence ",
			fecha(vence),
			" · ",
			s.texto(restan)
		]
	});
}
//#endregion
export { TooltipProvider as a, TooltipContent as i, StatusBadge as n, TooltipTrigger as o, Tooltip as r, PlazoBadge as t };
