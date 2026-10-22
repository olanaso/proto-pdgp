import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as TIPO_DOCUMENTO, s as claveSujetoPasivo } from "./sujetoPasivo-Cz4oBCnt.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { n as useAlmacen } from "./almacen-BgvL3X8T.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Users } from "lucide-react";
//#region src/components/DestinatariosSujetoPasivo.tsx
var domicilio = (t) => [
	t.notificarEnDomicilioReal ? t.domicilio : t.domicilioNotificacion,
	t.distrito,
	t.provincia
].filter(Boolean).join(", ");
/**
* A quién se notifica: los titulares y ocupantes del registro del sujeto pasivo, con su domicilio de
* notificación y el medio (electrónico si lo autorizó, art. 20.4 de la Ley 27444; si no, físico).
*/
function DestinatariosSujetoPasivo({ projectId, codigo }) {
	const [reg] = useAlmacen(claveSujetoPasivo(codigo), null);
	const enlace = /* @__PURE__ */ jsx(Link, {
		to: "/proyectos/$projectId/predios/$codigo/sujeto-pasivo",
		params: {
			projectId,
			codigo
		},
		className: "font-medium text-primary-dark underline underline-offset-2",
		children: "Sujeto pasivo"
	});
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Destinatarios de la notificación",
		className: "mb-4",
		acciones: reg && /* @__PURE__ */ jsx(StatusBadge, {
			tono: reg.estado === "REGISTRADO" ? "success" : "warning",
			children: reg.estado === "REGISTRADO" ? "Sujeto pasivo registrado" : "Sujeto pasivo en borrador"
		}),
		children: !reg || reg.titulares.length === 0 ? /* @__PURE__ */ jsxs("p", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [
				/* @__PURE__ */ jsx(Users, {
					size: 16,
					"aria-hidden": true
				}),
				" Aún no hay titulares registrados. Regístrelos en ",
				enlace,
				"."
			]
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "nombres",
						titulo: "Titular"
					},
					{
						clave: "numero",
						titulo: "Documento",
						render: (t) => t.numero ? `${TIPO_DOCUMENTO[t.tipoDocumento]} ${t.numero}` : "Pendiente"
					},
					{
						clave: "domicilio",
						titulo: "Domicilio de notificación",
						render: (t) => domicilio(t) || /* @__PURE__ */ jsx("span", {
							className: "text-warning",
							children: "Sin domicilio"
						})
					},
					{
						clave: "medio",
						titulo: "Medio",
						render: (t) => t.aceptaElectronica && t.correo ? /* @__PURE__ */ jsx("span", {
							title: t.correo,
							children: "Electrónico y físico"
						}) : "Físico"
					}
				],
				filas: reg.titulares,
				claveFila: (t) => t.id
			}),
			reg.ocupantes.length > 0 && /* @__PURE__ */ jsxs("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: [
					"También se notifica a los ocupantes: ",
					reg.ocupantes.map((o) => o.nombres).join(", "),
					"."
				]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: [
					"Los datos se corrigen en ",
					enlace,
					"."
				]
			})
		] })
	});
}
//#endregion
export { DestinatariosSujetoPasivo as t };
