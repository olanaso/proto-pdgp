import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { At as useTiposDocumento, Ot as useDocumentos, it as useItems, mt as documentosDe, z as firmaDeDocumento } from "./sujetoPasivo-Cz4oBCnt.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/kit/DocumentosEmitidos.tsx
/**
* Documentos numerados de un proyecto o de un predio (docs/PLAN-DOCUMENTOS.md §5.4): los últimos,
* el total del año por tipo y el enlace al registro completo filtrado.
*/
function DocumentosEmitidos({ projectId, predio, limite = 5, titulo = "Documentos emitidos" }) {
	const registro = useDocumentos();
	const tipos = useTiposDocumento();
	const items = useItems();
	const lista = useMemo(() => documentosDe(registro, {
		projectId,
		predio
	}), [
		registro,
		projectId,
		predio
	]);
	const anio = String((/* @__PURE__ */ new Date()).getFullYear());
	const delAnio = lista.filter((d) => d.estado === "emitido" && d.fecha.startsWith(anio));
	const porTipo = tipos.map((t) => ({
		t,
		n: delAnio.filter((d) => d.tipoId === t.id).length
	})).filter((x) => x.n > 0);
	const nombreTipo = (id) => tipos.find((t) => t.id === id)?.nombre ?? id;
	const filtro = predio ? `q=${encodeURIComponent(predio)}` : projectId ? `projectId=${encodeURIComponent(projectId)}` : "";
	const enlace = `/seguridad/documentos/generados${filtro ? `?${filtro}` : ""}`;
	return /* @__PURE__ */ jsxs(Section, {
		titulo,
		acciones: lista.length > 0 && /* @__PURE__ */ jsxs("a", {
			href: enlace,
			className: "text-sm font-semibold text-primary-dark hover:underline",
			children: ["Ver los ", lista.length]
		}),
		children: [porTipo.length > 0 && /* @__PURE__ */ jsxs("p", {
			className: "mb-2 text-sm text-muted-foreground",
			children: [
				"En ",
				anio,
				": ",
				porTipo.map((x) => `${x.t.nombre}: ${x.n}`).join(" · ")
			]
		}), /* @__PURE__ */ jsx(Tabla, {
			columnas: [
				{
					clave: "numero",
					titulo: "Número",
					render: (d) => /* @__PURE__ */ jsx("span", {
						className: `font-mono text-xs font-semibold ${d.estado === "anulado" ? "line-through" : ""}`,
						children: d.numero
					})
				},
				{
					clave: "tipo",
					titulo: "Tipo",
					render: (d) => nombreTipo(d.tipoId)
				},
				{
					clave: "origen",
					titulo: "Paso",
					render: (d) => d.origen.pantalla
				},
				{
					clave: "fecha",
					titulo: "Fecha",
					render: (d) => fechaHora(d.fecha)
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (d) => {
						if (d.estado === "anulado") return /* @__PURE__ */ jsx(StatusBadge, {
							tono: "destructive",
							children: "Anulado"
						});
						const f = firmaDeDocumento(items, d.id);
						return /* @__PURE__ */ jsx(StatusBadge, {
							tono: f.tono,
							children: f.texto
						});
					}
				}
			],
			filas: lista.slice(0, limite),
			claveFila: (d) => d.id,
			vacio: predio ? "Este predio aún no tiene documentos numerados." : "Este proyecto aún no tiene documentos numerados."
		})]
	});
}
//#endregion
export { DocumentosEmitidos as t };
