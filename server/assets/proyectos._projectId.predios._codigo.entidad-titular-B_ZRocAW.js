import { U as puedeCambiarRuta, V as corregirPerfil } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.entidad-titular-1gQs95YX.js";
import { t as PredioSimpleForm } from "./PredioSimpleForm-D1Ryg2uF.js";
import { jsx } from "react/jsx-runtime";
import { Users } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.entidad-titular.tsx?tsr-split=component
var hayComunidad = (v) => v.comunidad === "SÍ";
var sections = [{
	title: "Entidad titular registral",
	fields: [
		{
			key: "entidadNombre",
			label: "Entidad titular",
			required: true,
			fullWidth: true
		},
		{
			key: "nivelGobierno",
			label: "Nivel de gobierno",
			type: "select",
			options: [
				"GOBIERNO NACIONAL",
				"GOBIERNO REGIONAL",
				"GOBIERNO LOCAL",
				"EMPRESA DEL ESTADO"
			],
			required: true
		},
		{
			key: "entidadRuc",
			label: "RUC",
			required: true,
			placeholder: "11 dígitos"
		}
	]
}, {
	title: "Ocupación y uso",
	fields: [
		{
			key: "ocupanteDistinto",
			label: "Entidad o empresa ocupante",
			ayuda: "Solo si es distinta de la titular: es la que entrega el predio (art. 41.5).",
			fullWidth: true
		},
		{
			key: "usoActual",
			label: "Uso actual",
			type: "select",
			options: [
				"SERVICIO PÚBLICO",
				"SIN USO",
				"OCUPACIÓN DE TERCEROS"
			],
			required: true
		},
		{
			key: "comunidad",
			label: "¿Hay comunidad campesina o nativa?",
			type: "select",
			options: ["NO", "SÍ"],
			required: true,
			ayuda: "Sus tierras no son estatales (art. 41.8): se tramitan como predio comunal."
		},
		{
			key: "ocupantes",
			label: "Ocupantes particulares",
			type: "lista",
			ayuda: "Se usan en Gastos de traslado y mejoras a ocupantes (art. 41.9).",
			columnas: [
				{
					clave: "nombre",
					titulo: "Nombre"
				},
				{
					clave: "dni",
					titulo: "DNI"
				},
				{
					clave: "desde",
					titulo: "Ocupa desde",
					tipo: "date"
				}
			]
		}
	]
}];
/** Los datos del perfil que se corrigen, sin los calculados. */
var datosDe = (p) => ({
	condicion: p.condicion,
	ruta: p.ruta,
	inscrito: p.inscrito,
	ocupado: p.ocupado,
	actividad: p.actividad,
	casoEspecial: p.casoEspecial,
	entregaAnticipada: p.entregaAnticipada
});
function EntidadTitularPage() {
	const { projectId, codigo } = Route$1.useParams();
	return /* @__PURE__ */ jsx(PredioSimpleForm, {
		projectId,
		codigo,
		title: "Entidad titular y ocupantes",
		paso: "entidad-titular",
		sections,
		antesDelFormulario: (ctx) => hayComunidad(ctx.values) && /* @__PURE__ */ jsx(Aviso, {
			tipo: "aviso",
			children: "El predio está en tierras de una comunidad campesina o nativa: no es estatal (art. 41.8) y no se transfiere por la SBN. Cambie la condición a predio comunal; la ruta queda pendiente de definir en Modalidad de adquisición (trato directo o expropiación)."
		}),
		transiciones: [{
			texto: "Cambiar a predio comunal",
			icono: /* @__PURE__ */ jsx(Users, {}),
			visible: (ctx) => hayComunidad(ctx.values) && ctx.perfil.condicion !== "COMUNAL",
			permitido: (ctx) => puedeCambiarRuta(ctx.rol) ? null : "Lo hacen el Especialista legal, el Coordinador y el Administrador.",
			exigeMotivo: true,
			confirmacion: "El predio pasa a condición comunal (art. 41.8) y su ruta queda pendiente. El menú del predio cambia.",
			ejecutar: (ctx, motivo) => corregirPerfil(ctx.codigo, datosDe(ctx.perfil), {
				condicion: "COMUNAL",
				ruta: "PENDIENTE"
			}, "Cambió la condición a predio comunal (art. 41.8)", motivo),
			destino: "modalidad-adquisicion"
		}]
	});
}
//#endregion
export { EntidadTitularPage as component };
