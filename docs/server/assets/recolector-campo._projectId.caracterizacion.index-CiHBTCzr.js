import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { a as prediosDelProyecto, c as getPredioCenter } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { S as useRegistrosCampo, a as distanciaM, l as estadoBloques, y as tomarPosicion } from "./campo-Dn2b-x9H.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Route$1 } from "./recolector-campo._projectId.caracterizacion.index-CXux_sMy.js";
import { n as PuntoEstado, r as TarjetaCampo, t as CampoShell } from "./CampoShell-CcCpArhF.js";
import { u as controlCampo } from "./Controles-CqdT34l5.js";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { LocateFixed, Map, Search } from "lucide-react";
//#region src/routes/recolector-campo.$projectId.caracterizacion.index.tsx?tsr-split=component
var FILTROS = [
	{
		id: "todos",
		texto: "Todos"
	},
	{
		id: "sujeto-pasivo",
		texto: "Sin sujeto pasivo"
	},
	{
		id: "notificacion",
		texto: "Sin notificar"
	},
	{
		id: "empadronamiento",
		texto: "Sin empadronar"
	},
	{
		id: "caracterizacion",
		texto: "Sin caracterizar"
	}
];
var POR_PAGINA = 30;
var metros = (m) => m < 1e3 ? `${Math.round(m)} m` : `${(m / 1e3).toFixed(1)} km`;
/** Elegir el predio a caracterizar: buscar, filtrar por lo que falta o los más cercanos. */
function ElegirPredio() {
	const { projectId } = Route$1.useParams();
	const navigate = useNavigate();
	const proyecto = getProyecto(projectId);
	const registros = useRegistrosCampo();
	const [predios, setPredios] = useState(null);
	const [buscar, setBuscar] = useState("");
	const [filtro, setFiltro] = useState("todos");
	const [cerca, setCerca] = useState(null);
	const [buscandoGps, setBuscandoGps] = useState(false);
	const [errorGps, setErrorGps] = useState("");
	const [limite, setLimite] = useState(POR_PAGINA);
	useEffect(() => setPredios(prediosDelProyecto(projectId)), [projectId]);
	const responsable = proyecto?.coordinadorPredial ?? "";
	const filas = useMemo(() => (predios ?? []).map((p) => ({
		p,
		estado: estadoBloques(p.codigo, responsable)
	})), [
		predios,
		responsable,
		registros
	]);
	const t = buscar.trim().toLowerCase();
	const visibles = useMemo(() => {
		let lista = filas.filter((f) => (!t || f.p.buscar.includes(t) || f.p.cod.toLowerCase().includes(t)) && (filtro === "todos" || f.estado[filtro].estado === "pendiente"));
		if (cerca) lista = lista.map((f) => {
			const c = getPredioCenter(f.p.codigo);
			return {
				...f,
				distancia: c ? distanciaM(cerca, {
					lat: c[1],
					lon: c[0]
				}) : void 0
			};
		}).sort((a, b) => (a.distancia ?? Infinity) - (b.distancia ?? Infinity));
		return lista;
	}, [
		filas,
		t,
		filtro,
		cerca
	]);
	const puntos = (e) => [
		["SP", e["sujeto-pasivo"]],
		["Notif.", e.notificacion],
		["Emp.", e.empadronamiento],
		["Caract.", e.caracterizacion]
	].map(([k, v]) => /* @__PURE__ */ jsx(PuntoEstado, {
		estado: v.estado,
		etiqueta: k
	}, k));
	return /* @__PURE__ */ jsxs(CampoShell, {
		titulo: "Caracterización",
		subtitulo: proyecto?.nombre,
		onAtras: () => navigate({
			to: "/recolector-campo/$projectId",
			params: { projectId }
		}),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative mb-3",
				children: [/* @__PURE__ */ jsx(Search, {
					size: 20,
					className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": true
				}), /* @__PURE__ */ jsx("input", {
					type: "search",
					value: buscar,
					onChange: (e) => {
						setBuscar(e.target.value);
						setLimite(POR_PAGINA);
					},
					placeholder: "Código, sujeto pasivo o partida",
					"aria-label": "Buscar predio",
					className: `${controlCampo} pl-10`
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1",
				role: "group",
				"aria-label": "Filtrar",
				children: FILTROS.map((f) => /* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-pressed": filtro === f.id,
					onClick: () => {
						setFiltro(f.id);
						setLimite(POR_PAGINA);
					},
					className: `min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium ${filtro === f.id ? "border-primary bg-primary-soft text-primary-dark" : "border-border bg-card text-foreground"}`,
					children: f.texto
				}, f.id))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-3 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					className: "h-12 w-full text-base",
					disabled: buscandoGps,
					onClick: async () => {
						setBuscandoGps(true);
						setErrorGps("");
						try {
							setCerca(await tomarPosicion());
						} catch (e) {
							setErrorGps(e.message);
						} finally {
							setBuscandoGps(false);
						}
					},
					children: [
						/* @__PURE__ */ jsx(LocateFixed, {}),
						" ",
						buscandoGps ? "Buscando señal…" : cerca ? "Actualizar" : "Cerca de mí"
					]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					className: "h-12 w-full text-base",
					onClick: () => navigate({
						to: "/recolector-campo/$projectId/mapa",
						params: { projectId }
					}),
					children: [/* @__PURE__ */ jsx(Map, {}), " Ver mapa"]
				})]
			}),
			errorGps && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: errorGps
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-2 text-sm text-muted-foreground",
				children: predios == null ? "Cargando predios…" : `${visibles.length} predio${visibles.length === 1 ? "" : "s"}${cerca ? ", del más cercano al más lejano" : ""}`
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "space-y-2",
				children: visibles.slice(0, limite).map((f) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(TarjetaCampo, {
					titulo: f.p.cod,
					detalle: [
						f.p.sujeto || "Sin sujeto pasivo",
						f.p.condicion,
						`Etapa ${f.p.etapa.etapa}`,
						f.distancia != null ? `a ${metros(f.distancia)}` : ""
					].filter(Boolean).join(" · "),
					extra: /* @__PURE__ */ jsx("span", {
						className: "mt-1.5 flex flex-wrap gap-x-3 gap-y-1",
						children: puntos(f.estado)
					}),
					onClick: () => navigate({
						to: "/recolector-campo/$projectId/caracterizacion/$codigo",
						params: {
							projectId,
							codigo: f.p.codigo
						}
					})
				}) }, f.p.codigo))
			}),
			visibles.length > limite && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				className: "mt-3 h-12 w-full text-base",
				onClick: () => setLimite((n) => n + POR_PAGINA),
				children: [
					"Ver ",
					Math.min(POR_PAGINA, visibles.length - limite),
					" más"
				]
			})
		]
	});
}
//#endregion
export { ElegirPredio as component };
