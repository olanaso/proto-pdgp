import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/ChartExplanation.tsx
function ChartExplanation({ children }) {
	return /* @__PURE__ */ jsxs("p", {
		className: "mt-1 flex max-w-3xl items-start gap-1.5 text-xs leading-4 text-muted-foreground",
		children: [/* @__PURE__ */ jsx("span", {
			className: "shrink-0 rounded-sm bg-primary-soft px-1.5 py-0.5 font-semibold text-primary-dark",
			children: "Cómo leerlo"
		}), /* @__PURE__ */ jsx("span", { children })]
	});
}
//#endregion
export { ChartExplanation as t };
