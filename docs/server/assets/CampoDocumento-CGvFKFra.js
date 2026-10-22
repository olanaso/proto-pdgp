import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { G as leerCatalogo, W as itemsDe, Y as mismoDocumento, it as useItems } from "./sujetoPasivo-Cz4oBCnt.js";
import { P as useRegistroExpediente, f as descargarArchivo } from "./PredioEncabezado-FhqZ2Jv6.js";
import { useId, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Download } from "lucide-react";
//#region src/components/kit/CampoDocumento.tsx
/**
* Campo de formulario para subir un documento (firmado o recibido). Lo que se sube es parte del
* formulario de registro: aquí se elige el archivo y se ve si ya está en el expediente (folio, número,
* firmante). El archivo entra al expediente del predio con folio y huella; si el documento es uno que
* el sistema generó y está numerado, el PDF cierra su firma.
*/
function CampoDocumento({ projectId, codigo, nombre, catalogoId, firmado, accept = ".pdf,.doc,.docx,image/*", numero, fecha, emisor, onSubido, excluir }) {
	const id = useId();
	const items = useItems();
	const registrar = useRegistroExpediente(projectId, codigo);
	const [subiendo, setSubiendo] = useState(false);
	const actual = documentoDelCampo(excluir?.length ? items.filter((i) => !excluir.includes(i.id)) : items, codigo, nombre, catalogoId);
	const archivo = actual?.archivo ?? actual?.generado;
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
		id,
		type: "file",
		accept,
		disabled: subiendo,
		"aria-label": nombre,
		className: `${controlClase} h-auto py-1.5 file:mr-3 file:h-6 file:rounded-sm file:border-0 file:bg-primary-soft file:px-2 file:text-xs file:font-semibold file:text-primary-dark`,
		onChange: async (e) => {
			const f = e.target.files?.[0];
			e.target.value = "";
			if (!f) return;
			setSubiendo(true);
			const item = await registrar(f, {
				nombre,
				catalogoId,
				firmado,
				numero,
				fecha,
				emisor
			});
			setSubiendo(false);
			if (item) onSubido?.(item);
		}
	}), /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-xs text-muted-foreground",
		children: subiendo ? "Subiendo…" : actual && actual.archivo ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
			"Registrado · ",
			/* @__PURE__ */ jsx("span", {
				className: "font-mono",
				children: actual.folio
			}),
			actual.numero && ` · ${actual.numero}`,
			actual.firmas?.length ? ` · firmó ${actual.firmas.map((x) => x.firmante).join(", ")}` : "",
			archivo && /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "ml-2 inline-flex items-center gap-1 underline",
				onClick: () => void descargarArchivo(archivo),
				children: [
					/* @__PURE__ */ jsx(Download, {
						size: 12,
						"aria-hidden": true
					}),
					" ",
					archivo.nombre
				]
			})
		] }) : "Sin archivo registrado."
	})] });
}
/** El documento que corresponde a un campo: el del catálogo (con archivo subido) o el libre del mismo nombre. */
function documentoDelCampo(items, codigo, nombre, catalogoId) {
	const conArchivo = (i) => i.estado !== "anulado" && Boolean(i.archivo);
	if (catalogoId) {
		const del = itemsDe(items, codigo, catalogoId).filter(conArchivo);
		if (del.length) return del[0];
	}
	const catalogo = leerCatalogo();
	return items.find((i) => i.predio === codigo && conArchivo(i) && (i.libre?.nombre === nombre || mismoDocumento(nombre, catalogo.find((c) => c.id === i.catalogoId)?.nombre ?? "")));
}
//#endregion
export { documentoDelCampo as n, CampoDocumento as t };
