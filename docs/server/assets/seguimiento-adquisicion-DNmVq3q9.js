import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { ClipboardCheck } from "lucide-react";
//#region src/routes/seguimiento-adquisicion.tsx?tsr-split=component
function Page() {
	return /* @__PURE__ */ jsxs(AppShell, { children: [/* @__PURE__ */ jsx(PageHeader, {
		icono: ClipboardCheck,
		titulo: "Seguimiento de la adquisición",
		descripcion: "Seguimiento del proceso de adquisición por parte del sujeto pasivo."
	}), /* @__PURE__ */ jsx(Section, {
		titulo: "Estado del módulo",
		children: /* @__PURE__ */ jsx("p", {
			className: "text-sm text-muted-foreground",
			children: "Módulo en construcción (próximamente). Aquí se registrará el seguimiento del proceso de adquisición por parte del sujeto pasivo."
		})
	})] });
}
//#endregion
export { Page as component };
