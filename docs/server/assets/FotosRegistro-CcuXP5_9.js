import { n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { E as Modal } from "./PredioEncabezado-FhqZ2Jv6.js";
import { a as fotosDe, g as useFotos } from "./fotos-CUnD_Pb7.js";
import { t as CampoFoto } from "./CampoFoto-CSlShmEX.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Camera } from "lucide-react";
//#region src/components/foto/FotosRegistro.tsx
/** Campos de foto dentro de un formulario de alta o edición (uno por rótulo), a lo ancho. */
function FotosDelRegistro({ base, registro, campos }) {
	return /* @__PURE__ */ jsx(Fragment$1, { children: campos.map((c) => /* @__PURE__ */ jsx(FormField, {
		etiqueta: c.campo,
		ancho: "doble",
		children: /* @__PURE__ */ jsx(CampoFoto, {
			contexto: {
				...base,
				registro,
				campo: c.campo
			},
			multiple: c.multiple ?? (c.maximo == null || c.maximo > 1),
			maximo: c.maximo
		})
	}, c.campo)) });
}
/**
* Celda "Fotos" de una tabla: el número de fotos de la fila y un botón que abre sus campos de foto para
* ver, editar o agregar. El número sale del almacén de fotos, no de un texto guardado en la fila.
*/
function BotonFotosDeFila({ base, registro, campos, titulo }) {
	const n = fotosDe(useFotos(), {
		predio: base.predio,
		pantalla: base.pantalla,
		seccion: base.seccion,
		registro
	}).length;
	const [abierto, setAbierto] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick: () => setAbierto(true),
		title: n ? `Ver y editar las ${n} fotos` : "Agregar fotos",
		children: [
			/* @__PURE__ */ jsx(Camera, {}),
			" ",
			n ? `${n} ${n === 1 ? "foto" : "fotos"}` : "Agregar"
		]
	}), /* @__PURE__ */ jsx(Modal, {
		abierto,
		onCerrar: () => setAbierto(false),
		ancho: "xl",
		titulo: `Fotos: ${titulo}`,
		descripcion: "Suba, edite (estampa, anotaciones, marca de agua) o quite las fotos de este registro. El original no se modifica.",
		children: /* @__PURE__ */ jsx(FormGrid, {
			columnas: 1,
			children: /* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro,
				campos
			})
		})
	})] });
}
//#endregion
export { FotosDelRegistro as n, BotonFotosDeFila as t };
