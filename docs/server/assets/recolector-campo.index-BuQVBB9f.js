import { _ as registrarEnBitacora, u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { C as useSesionCampo, S as useRegistrosCampo, m as proyectosAsignados, r as cerrarSesionCampo } from "./campo-Dn2b-x9H.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { i as TituloCampo, r as TarjetaCampo, t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { u as controlCampo } from "./Controles-CqdT34l5.js";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { FolderOpen, LogOut, Search } from "lucide-react";
//#region src/routes/recolector-campo.index.tsx?tsr-split=component
/** Proyectos a los que está asignado el usuario: de aquí se elige dónde se trabaja hoy. */
function MisProyectos() {
	const navigate = useNavigate();
	const correo = useSesionCampo() ?? "";
	const usuario = useUsuarioSesion();
	const rol = useRol();
	const registros = useRegistrosCampo();
	const nombre = usuario?.nombre ?? correo;
	const [asignados, setAsignados] = useState({
		lista: [],
		sinBrigada: false
	});
	const [buscar, setBuscar] = useState("");
	useEffect(() => setAsignados(proyectosAsignados(nombre, rol)), [nombre, rol]);
	const t = buscar.trim().toLowerCase();
	const visibles = useMemo(() => asignados.lista.filter((p) => !t || `${p.nombre} ${p.codigo} ${p.tipo}`.toLowerCase().includes(t)), [asignados.lista, t]);
	const pendientes = (id) => registros.filter((r) => r.projectId === id && !r.enviadoEl).length;
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: "Mis proyectos",
		subtitulo: `${nombre} · ${ROLES[rol]}`,
		derecha: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => {
				registrarEnBitacora({
					modulo: 30,
					entidad: "sesion",
					registro: correo,
					accion: "salida",
					detalle: "Recolector de campo"
				});
				cerrarSesionCampo();
			},
			"aria-label": "Cerrar sesión",
			title: "Cerrar sesión",
			className: "flex size-11 items-center justify-center rounded-md hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-primary-foreground",
			children: /* @__PURE__ */ jsx(LogOut, {
				size: 20,
				"aria-hidden": true
			})
		}),
		children: [
			asignados.sinBrigada && /* @__PURE__ */ jsx(Aviso, {
				tipo: "info",
				children: "Sin brigada asignada: se muestran todos los proyectos (demostración). La asignación se hace en Equipos y brigadas del proyecto."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative mb-4",
				children: [/* @__PURE__ */ jsx(Search, {
					size: 20,
					className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("input", {
					type: "search",
					value: buscar,
					onChange: (e) => setBuscar(e.target.value),
					placeholder: "Buscar proyecto",
					"aria-label": "Buscar proyecto",
					className: `${controlCampo} pl-10`
				})]
			}),
			/* @__PURE__ */ jsxs(TituloCampo, { children: [
				visibles.length,
				" proyecto",
				visibles.length === 1 ? "" : "s"
			] }),
			/* @__PURE__ */ jsx("ul", {
				className: "space-y-2",
				children: visibles.map((p) => {
					const n = pendientes(p.id);
					return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
						icono: FolderOpen,
						titulo: p.nombre,
						detalle: [
							p.codigo,
							p.tipo,
							p.brigada
						].filter(Boolean).join(" · "),
						extra: n > 0 && /* @__PURE__ */ jsxs("span", {
							className: "mt-1 block text-sm font-medium text-warning",
							children: [
								n,
								" registro",
								n === 1 ? "" : "s",
								" por enviar"
							]
						}),
						onClick: () => navigate({
							to: "/recolector-campo/$projectId",
							params: { projectId: p.id }
						})
					}) }, p.id);
				})
			}),
			asignados.lista.length > 0 && visibles.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "mt-4 text-base text-muted-foreground",
				children: "Ningún proyecto coincide."
			})
		]
	});
}
//#endregion
export { MisProyectos as component };
