import { Z as NOMBRE_MODALIDAD_OBRA } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route } from "./proyectos._projectId.predios._codigo.liberacion-anticipada-areas-yyRYUyxS.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/proyectos.$projectId.predios.$codigo.liberacion-anticipada-areas.tsx?tsr-split=component
var aplica = (c) => c.perfil.modalidadObra !== "ORDINARIA";
var sections = [
	{
		title: "Reunión informativa y de sensibilización",
		visible: aplica,
		fields: [
			{
				key: "fechaReunion",
				label: "Fecha de la reunión",
				type: "date",
				required: true,
				hito: "liberacion_anticipada_areas"
			},
			{
				key: "lugar",
				label: "Lugar",
				required: true
			},
			{
				key: "asistentes",
				label: "Asistentes",
				type: "lista",
				columnas: [
					{
						clave: "nombre",
						titulo: "Nombre"
					},
					{
						clave: "documento",
						titulo: "DNI o RUC"
					},
					{
						clave: "calidad",
						titulo: "Calidad",
						tipo: "select",
						opciones: [
							"Titular",
							"Poseedor",
							"Ocupante",
							"Representante",
							"Otro"
						]
					}
				]
			},
			{
				key: "actaReunion",
				label: "Acta de la reunión",
				type: "file",
				accept: ".pdf"
			}
		]
	},
	{
		title: "Acta de compromiso de liberación de áreas",
		visible: aplica,
		fields: [
			{
				key: "fechaActa",
				label: "Fecha del acta",
				type: "date"
			},
			{
				key: "firmantes",
				label: "Firmantes",
				type: "lista",
				columnas: [
					{
						clave: "nombre",
						titulo: "Nombre"
					},
					{
						clave: "documento",
						titulo: "DNI o RUC"
					},
					{
						clave: "calidad",
						titulo: "Calidad"
					}
				]
			},
			{
				key: "condiciones",
				label: "Condiciones",
				type: "textarea",
				fullWidth: true
			},
			{
				key: "actaCompromiso",
				label: "Acta de compromiso firmada",
				type: "file",
				accept: ".pdf",
				fullWidth: true
			}
		]
	},
	{
		title: "Liberación",
		visible: aplica,
		fields: [{
			key: "fechaLiberacion",
			label: "Fecha de liberación efectiva",
			type: "date"
		}]
	}
];
function LiberacionAnticipadaAreasPage() {
	const { projectId, codigo } = Route.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Liberación anticipada de áreas",
		paso: "liberacion-anticipada-areas",
		sections,
		antesDelFormulario: ({ perfil }) => perfil.modalidadObra === "ORDINARIA" ? /* @__PURE__ */ jsxs(Aviso, {
			tipo: "aviso",
			children: [
				"No aplica: el proyecto está registrado con obra ordinaria. La liberación anticipada de áreas solo procede con contrato NEC u obra de ejecución inmediata; la modalidad se registra en",
				" ",
				/* @__PURE__ */ jsx(Link, {
					to: "/proyectos/$projectId/normas-habilitantes",
					params: { projectId },
					className: "font-medium underline",
					children: "Normas habilitantes"
				}),
				"."
			]
		}) : /* @__PURE__ */ jsxs(Aviso, {
			tipo: "info",
			children: [NOMBRE_MODALIDAD_OBRA[perfil.modalidadObra], ": con los titulares se acuerda liberar el área antes de concluir la adquisición. Es distinta de la entrega anticipada del art. 21."]
		})
	});
}
//#endregion
export { LiberacionAnticipadaAreasPage as component };
