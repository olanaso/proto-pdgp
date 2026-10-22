import { t as Button } from "./button-DH6ZQkjT.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.revision-tasacion-CgZTAvEp.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.revision-tasacion.tsx?tsr-split=component
var sections = [
	{
		title: "Informe de tasación",
		fields: [{
			key: "fechaRecepcion",
			label: "Recepción del informe de tasación",
			type: "date",
			hito: "revision_tasacion",
			required: true,
			ayuda: "Desde aquí corren 2 d.h. de gestión para revisarlo y pedir la CCP."
		}, {
			key: "numeroInforme",
			label: "N.º de informe de tasación"
		}]
	},
	{
		title: "Verificación",
		fields: [
			{
				key: "verificacion",
				label: "Contra la memoria descriptiva",
				type: "verificacion",
				items: [
					{
						clave: "valores",
						texto: "Valores conformes con la memoria descriptiva"
					},
					{
						clave: "areas",
						texto: "Áreas afectadas coinciden"
					},
					{
						clave: "mejoras",
						texto: "Mejoras (edificaciones, obras, cultivos)"
					},
					{
						clave: "lucro",
						texto: "Lucro cesante"
					},
					{
						clave: "dano",
						texto: "Daño emergente"
					}
				]
			},
			{
				key: "observaciones",
				label: "Observaciones",
				type: "textarea",
				fullWidth: true
			},
			{
				key: "conclusion",
				label: "Conclusión",
				type: "select",
				options: ["CONFORME", "OBSERVADO"],
				required: true
			}
		]
	},
	{
		title: "Pedido de CCP a la OGA",
		visible: ({ values }) => values.conclusion === "CONFORME",
		fields: [
			{
				key: "memorando",
				label: "N.º de memorando",
				required: true
			},
			{
				key: "fechaMemorando",
				envio: {
					canal: "Memorando de pedido de CCP",
					destinatario: "OGA"
				},
				label: "Fecha del memorando",
				type: "date",
				required: true
			},
			{
				key: "memorandoArchivo",
				label: "Memorando",
				type: "file",
				accept: ".pdf",
				fullWidth: true
			}
		]
	}
];
function RevisionTasacionPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Revisión de la tasación y pedido de CCP",
		paso: "revision-tasacion",
		sections,
		modulo: 14,
		acciones: /* @__PURE__ */ jsx(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/proyectos/$projectId/predios/$codigo/certificacion-presupuestal-ccp",
				params: {
					projectId,
					codigo
				},
				children: ["4.2 Certificación presupuestal ", /* @__PURE__ */ jsx(ArrowRight, {})]
			})
		})
	});
}
//#endregion
export { RevisionTasacionPage as component };
