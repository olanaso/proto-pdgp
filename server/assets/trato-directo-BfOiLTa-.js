import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { B as asignarRuta, R as NOMBRE_RUTA, U as puedeCambiarRuta, m as MotivoModal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { i as useCartera } from "./cartera-B4-YODri.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Eye, FileText, Handshake, MessageSquare, Signpost } from "lucide-react";
//#region src/routes/trato-directo.tsx?tsr-split=component
var unicos = (claves) => [...new Set(claves.filter(Boolean))].sort().map((v) => ({
	valor: v,
	texto: v
}));
/** Lo que entra a la cartera de trato directo: los que van por esa ruta y los que aún no tienen ruta. */
var admite = (f) => f.ruta === "TRATO_DIRECTO" || f.ruta === "PENDIENTE" ? f : null;
function TratoDirectoPage() {
	const navigate = useNavigate();
	const rol = useRol();
	const cartera = useCartera(useUsuarioSesion()?.nombre ?? "", admite);
	const [asignar, setAsignar] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const asigna = puedeCambiarRuta(rol);
	const enTrato = cartera.filas.filter((f) => f.ruta === "TRATO_DIRECTO").length;
	const porDefinir = cartera.filas.length - enTrato;
	const abrir = (ruta) => (f) => navigate({
		to: `/proyectos/$projectId/predios/$codigo/${ruta}`,
		params: {
			projectId: f.proyectoId,
			codigo: f.codigo
		}
	});
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		cartera.sinBrigada && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Sin brigada asignada: se muestran los predios de todos los proyectos (demostración). La asignación se hace en Equipos y brigadas de cada proyecto."
		}),
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(""),
			children: mensaje
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Cartera de trato directo",
			icono: Handshake,
			descripcion: `Predios en trato directo y por definir de sus proyectos: ${enTrato} en trato directo · ${porDefinir} por definir. Art. 19 a 21 del TUO del DL 1192.`,
			estado: cartera.cargando ? "cargando" : "listo",
			columnas: [
				{
					clave: "proyectoNombre",
					titulo: "Proyecto",
					ancho: "140px"
				},
				{
					clave: "cod",
					titulo: "Código de predio",
					ancho: "220px",
					render: (f) => /* @__PURE__ */ jsxs(Fragment$1, { children: [f.cod, f.codigo !== f.cod && /* @__PURE__ */ jsx("span", {
						className: "block text-xs text-muted-foreground",
						children: f.codigo
					})] })
				},
				{
					clave: "suj",
					titulo: "Sujeto pasivo"
				},
				{
					clave: "condicionPredio",
					titulo: "Condición"
				},
				{
					clave: "ruta",
					titulo: "Modalidad",
					render: (f) => f.ruta === "TRATO_DIRECTO" ? /* @__PURE__ */ jsx(StatusBadge, {
						tono: "primary",
						children: NOMBRE_RUTA.TRATO_DIRECTO
					}) : /* @__PURE__ */ jsx(StatusBadge, {
						tono: "warning",
						children: "Por definir"
					})
				},
				{
					clave: "exp",
					titulo: "Expediente"
				},
				{
					clave: "valor",
					titulo: "Monto (S/)",
					alinear: "derecha"
				}
			],
			filas: cartera.filas,
			claveFila: (f) => `${f.proyectoId}:${f.rowId}`,
			filtros: [
				{
					clave: "proyectoId",
					etiqueta: "Proyecto",
					opciones: cartera.opcionesProyecto
				},
				{
					clave: "ruta",
					etiqueta: "Modalidad",
					opciones: [{
						valor: "TRATO_DIRECTO",
						texto: "Trato directo"
					}, {
						valor: "PENDIENTE",
						texto: "Por definir"
					}]
				},
				{
					clave: "condicionPredio",
					etiqueta: "Condición",
					opciones: unicos(cartera.filas.map((f) => f.condicionPredio))
				}
			],
			buscarEn: [
				"cod",
				"suj",
				"exp",
				"proyectoNombre"
			],
			accionesFila: [
				{
					nombre: "Asignar a trato directo",
					icono: Signpost,
					visible: (f) => asigna && f.ruta === "PENDIENTE",
					onClick: setAsignar
				},
				{
					nombre: "Abrir expediente",
					icono: Eye,
					onClick: abrir("modalidad-adquisicion")
				},
				{
					nombre: "Carta de intención",
					icono: FileText,
					visible: (f) => f.ruta === "TRATO_DIRECTO",
					onClick: abrir("carta-intencion")
				},
				{
					nombre: "Respuesta del sujeto pasivo",
					icono: MessageSquare,
					visible: (f) => f.ruta === "TRATO_DIRECTO",
					onClick: abrir("respuesta-sujeto-pasivo")
				}
			],
			onFilaClick: (f) => f.ruta === "TRATO_DIRECTO" ? abrir("carta-intencion")(f) : abrir("modalidad-adquisicion")(f),
			exportar: (visibles) => exportarExcel("cartera-trato-directo", [
				{
					titulo: "Proyecto",
					valor: (f) => f.proyectoNombre
				},
				{
					titulo: "Código de predio",
					valor: (f) => f.cod
				},
				{
					titulo: "Sujeto pasivo",
					valor: (f) => f.suj
				},
				{
					titulo: "Condición",
					valor: (f) => f.condicionPredio
				},
				{
					titulo: "Modalidad",
					valor: (f) => f.ruta === "TRATO_DIRECTO" ? "Trato directo" : "Por definir"
				},
				{
					titulo: "Expediente",
					valor: (f) => f.exp
				},
				{
					titulo: "Monto (S/)",
					valor: (f) => f.valor
				}
			], visibles),
			vacio: cartera.proyectos ? "Sus proyectos no tienen predios en trato directo ni por definir." : "No tiene proyectos asignados."
		}),
		!asigna && /* @__PURE__ */ jsxs("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: [
				"Asignar la ruta lo hacen el Especialista legal, el Coordinador y el Administrador; el perfil ",
				ROLES[rol],
				" solo consulta."
			]
		}),
		asignar && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: "Asignar a trato directo",
			descripcion: `${asignar.cod} · ${asignar.suj || "Sin sujeto pasivo"} · ${asignar.proyectoNombre}. El predio pasa a la ruta de trato directo (art. 19): su menú habilita la carta de intención.`,
			accion: "Asignar a trato directo",
			onCerrar: () => setAsignar(null),
			onConfirmar: (motivo) => {
				asignarRuta(asignar.codigo, "TRATO_DIRECTO", motivo);
				setMensaje(`${asignar.cod} quedó en trato directo.`);
				setAsignar(null);
			}
		})
	] });
}
//#endregion
export { TratoDirectoPage as component };
