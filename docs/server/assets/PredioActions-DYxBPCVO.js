import { B as routeByKey, F as contextMenuItems, I as estatalMenuItems, L as iconByKey, n as etapaDelPredio } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { c as DropdownMenuSub, d as DropdownMenuTrigger, l as DropdownMenuSubContent, n as DropdownMenuContent, r as DropdownMenuItem, s as DropdownMenuSeparator, t as DropdownMenu, u as DropdownMenuSubTrigger } from "./dropdown-menu-D811JBGD.js";
import { i as TooltipContent, o as TooltipTrigger, r as Tooltip } from "./Badges-LrNPShrl.js";
import { Link, useParams } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FileText, FolderOpen, MoreVertical } from "lucide-react";
//#region src/components/PredioActions.tsx
var predioActionsMenuClassName = "z-[10000] w-80";
var informationBaseMenuItems = contextMenuItems.filter((item) => item.key === "informacion-base");
function MenuItemContent({ item, showIcon = true }) {
	const Icon = iconByKey[item.key] ?? FileText;
	return /* @__PURE__ */ jsxs(Fragment, { children: [showIcon && /* @__PURE__ */ jsx(Icon, {
		size: 16,
		className: "mr-2 text-primary",
		"aria-hidden": true
	}), /* @__PURE__ */ jsx("span", {
		className: "truncate",
		title: item.description,
		children: item.label
	})] });
}
function PredioMenuItem({ item, projectId, codigo, depth = 0 }) {
	const route = routeByKey[item.key];
	if (item.children?.length) return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsx(DropdownMenuSubTrigger, {
		className: "cursor-pointer",
		children: /* @__PURE__ */ jsx(MenuItemContent, {
			item,
			showIcon: depth === 0
		})
	}), /* @__PURE__ */ jsx(DropdownMenuSubContent, {
		className: predioActionsMenuClassName,
		children: item.children.map((child) => /* @__PURE__ */ jsx(PredioMenuItem, {
			item: child,
			projectId,
			codigo,
			depth: depth + 1
		}, child.key))
	})] });
	if (route) return /* @__PURE__ */ jsx(DropdownMenuItem, {
		asChild: true,
		className: "cursor-pointer",
		children: /* @__PURE__ */ jsx(Link, {
			to: route,
			params: {
				projectId,
				codigo
			},
			children: /* @__PURE__ */ jsx(MenuItemContent, {
				item,
				showIcon: depth === 0
			})
		})
	});
	return /* @__PURE__ */ jsx(DropdownMenuItem, {
		className: "cursor-pointer",
		children: /* @__PURE__ */ jsx(MenuItemContent, {
			item,
			showIcon: depth === 0
		})
	});
}
function PredioActions({ codigoPredio, condicionPredio, mode = "menu" } = {}) {
	const projectId = useParams({ strict: false }).projectId ?? "default";
	const codigo = codigoPredio || "VIAL-LST4-T04-ST05-090506-OC-00699";
	const normalizedCondicionPredio = condicionPredio?.trim().toUpperCase();
	const availableMenuItems = normalizedCondicionPredio === "ESTATAL" ? estatalMenuItems : condicionPredio === void 0 || normalizedCondicionPredio === "PRIVADO" ? contextMenuItems : informationBaseMenuItems;
	const etapa = etapaDelPredio(codigo);
	const menu = /* @__PURE__ */ jsxs(DropdownMenuContent, {
		align: "end",
		className: predioActionsMenuClassName,
		children: [etapa && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(DropdownMenuItem, {
			asChild: true,
			className: "cursor-pointer font-semibold",
			children: /* @__PURE__ */ jsxs(Link, {
				to: etapa.ruta,
				params: {
					projectId,
					codigo
				},
				children: [/* @__PURE__ */ jsx(FolderOpen, {
					size: 16,
					className: "mr-2 text-primary",
					"aria-hidden": true
				}), /* @__PURE__ */ jsxs("span", {
					className: "truncate",
					children: ["Abrir expediente · ", etapa.nombrePaso]
				})]
			})
		}), /* @__PURE__ */ jsx(DropdownMenuSeparator, {})] }), availableMenuItems.map((item) => /* @__PURE__ */ jsx(PredioMenuItem, {
			item,
			projectId,
			codigo
		}, item.key))]
	});
	if (mode === "toolbar") return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center justify-end gap-1.5",
		children: [etapa && /* @__PURE__ */ jsx(Button, {
			asChild: true,
			size: "sm",
			children: /* @__PURE__ */ jsxs(Link, {
				to: etapa.ruta,
				params: {
					projectId,
					codigo
				},
				title: `Abrir el expediente en ${etapa.nombrePaso}`,
				children: [/* @__PURE__ */ jsx(FolderOpen, { "aria-hidden": true }), /* @__PURE__ */ jsx("span", { children: "Abrir expediente" })]
			})
		}), /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				"aria-label": "Más acciones del predio",
				children: [/* @__PURE__ */ jsx(MoreVertical, {}), /* @__PURE__ */ jsx("span", { children: "Más" })]
			})
		}), menu] })]
	});
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "flex size-8 items-center justify-center rounded-md border border-border text-primary-dark hover:bg-primary-soft",
				"aria-label": "Acciones del predio",
				children: /* @__PURE__ */ jsx(MoreVertical, {
					size: 16,
					"aria-hidden": true
				})
			})
		})
	}), /* @__PURE__ */ jsx(TooltipContent, { children: "Acciones del predio" })] }), menu] });
}
//#endregion
export { PredioActions as t };
