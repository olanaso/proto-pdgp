import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { _ as moneda, h as fechaHora, r as proyectos, v as numero } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio, u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { E as Modal, m as MotivoModal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { E as useCargasSiaf, H as limpiarMetas, I as conNombre, J as useAprobacionesMetas, L as decidirMetas, M as MESES, N as NOMBRE_ESTADO_METAS, O as useResumenesEjecucion, P as aprobacionDe, R as ejercicioInicial, U as metasDemostracion, V as leerMetas, W as puedeAprobarMetas, j as ETIQUETAS_METAS, p as estadoVinculo, q as totalProgramado, r as NOMBRE_ESTADO_VINCULO, s as UNIDADES_EJECUTORAS, v as leerVinculo, z as ejerciciosDesde } from "./siaf-ocJzaGES.js";
import { n as TablaCargas } from "./CargaSiaf-C7obvddh.js";
import { n as Kpis, t as Kpi } from "./Kpi-W-n9ERev.js";
import { n as MarcoSiaf } from "./ConciliacionSiaf-DB3SkFdm.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Calendar, CheckCircle2, ChevronDown, Edit, ExternalLink, FileSpreadsheet, Folder, History, MessageSquareWarning, Paperclip, Save, Send, Target, X } from "lucide-react";
//#region src/components/siaf/VinculosPorProyecto.tsx
var TONO_VINCULO = {
	SIN_VINCULO: "neutral",
	VINCULADO: "success",
	OBSERVADO: "destructive"
};
var TONO_METAS = {
	BORRADOR: "neutral",
	EN_APROBACION: "warning",
	APROBADA: "success",
	OBSERVADA: "destructive"
};
var FUENTE = {
	"datos-abiertos": "Datos abiertos del MEF",
	"export-siaf": "Exportación SIAF-SP",
	servicio: "Servicio del MEF"
};
/**
* Vista integral para Presupuesto: cómo está configurado el vínculo SIAF de cada proyecto (lo que el
* Coordinador registra en Metas del proyecto › Vínculo SIAF), qué ejecución tiene cargada y en qué
* estado van sus metas. Cada fila abre la pantalla del proyecto.
*/
function VinculosPorProyecto() {
	const [anio, setAnio] = useState(2026);
	const [filtro, setFiltro] = useState("TODOS");
	const aprobaciones = useAprobacionesMetas();
	const cargas = useCargasSiaf();
	const resumenes = useResumenesEjecucion(useMemo(() => proyectos.map((p) => p.id), []), anio);
	const filas = useMemo(() => proyectos.map((proyecto) => {
		const v = leerVinculo(proyecto.id, anio);
		const metas = leerMetas(proyecto.id, anio);
		return {
			proyecto,
			v,
			estado: estadoVinculo(v),
			metasEstado: aprobacionDe(aprobaciones, proyecto.id, anio).estado,
			fisica: totalProgramado(metas.fisica),
			financiera: totalProgramado(metas.financiera),
			ultimaCarga: cargas.find((c) => c.proyecto === proyecto.id && c.anio === anio)?.periodo,
			ejecucion: resumenes[proyecto.id]
		};
	}), [
		anio,
		aprobaciones,
		cargas,
		resumenes
	]);
	const visibles = filas.filter((f) => filtro === "TODOS" || f.estado === filtro);
	const cuenta = (e) => filas.filter((f) => f.estado === e).length;
	const conEjecucion = filas.filter((f) => f.ejecucion).length;
	const ueNombre = (c) => UNIDADES_EJECUTORAS.find((u) => u.codigo === c)?.nombre ?? "";
	const exportar = () => exportarExcel(`vinculo-siaf-proyectos-${anio}`, [
		{
			titulo: "Código",
			valor: (f) => f.proyecto.codigo
		},
		{
			titulo: "Proyecto",
			valor: (f) => f.proyecto.nombre
		},
		{
			titulo: "Estado del vínculo",
			valor: (f) => NOMBRE_ESTADO_VINCULO[f.estado]
		},
		{
			titulo: "Pliego",
			valor: (f) => f.v.pliego
		},
		{
			titulo: "UE",
			valor: (f) => `${f.v.unidadEjecutora} ${ueNombre(f.v.unidadEjecutora)}`
		},
		{
			titulo: "Categoría presupuestal",
			valor: (f) => f.v.categoriaPresupuestal
		},
		{
			titulo: "CUI",
			valor: (f) => f.v.cuis.map((c) => c.cui).join(", ")
		},
		{
			titulo: "Metas presupuestarias",
			valor: (f) => f.v.metas.map((m) => `${m.numero} (SF ${m.secFunc || "–"}) ${m.cantidadAnual} ${m.unidadMedida}`).join("; ")
		},
		{
			titulo: "Específicas",
			valor: (f) => f.v.especificas.join(", ")
		},
		{
			titulo: "OEI",
			valor: (f) => f.v.ceplan.oei
		},
		{
			titulo: "AEI",
			valor: (f) => f.v.ceplan.aei
		},
		{
			titulo: "AOI",
			valor: (f) => f.v.ceplan.aoi
		},
		{
			titulo: "Fuente de datos",
			valor: (f) => FUENTE[f.v.fuenteDatos]
		},
		{
			titulo: "Observación",
			valor: (f) => f.v.observacion
		},
		{
			titulo: "Última carga",
			valor: (f) => f.ultimaCarga ?? ""
		},
		{
			titulo: "PIM",
			valor: (f) => f.ejecucion?.pim ?? ""
		},
		{
			titulo: "Devengado",
			valor: (f) => f.ejecucion?.devengado ?? ""
		},
		{
			titulo: "Girado",
			valor: (f) => f.ejecucion?.girado ?? ""
		},
		{
			titulo: "Metas del proyecto",
			valor: (f) => NOMBRE_ESTADO_METAS[f.metasEstado]
		},
		{
			titulo: "Meta física",
			valor: (f) => f.fisica
		},
		{
			titulo: "Meta financiera",
			valor: (f) => f.financiera
		}
	], visibles, {
		titulo: `Vínculo SIAF por proyecto · ${anio}`,
		lineas: [`${visibles.length} proyectos · ${NOMBRE_ESTADO_VINCULO[filtro] ?? "Todos los estados"}`]
	});
	return /* @__PURE__ */ jsxs(Section, {
		titulo: `Vínculo SIAF por proyecto · ${anio}`,
		className: "mb-4",
		acciones: /* @__PURE__ */ jsxs(Button, {
			type: "button",
			size: "sm",
			variant: "outline",
			onClick: exportar,
			children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar"]
		}),
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Lo que cada Coordinador configuró en «Metas del proyecto › Vínculo SIAF» (pliego, UE, CUI, metas presupuestarias, específicas y CEPLAN), la ejecución cargada y el estado de sus metas. Presupuesto valida u observa el vínculo desde cada proyecto."
			}),
			/* @__PURE__ */ jsxs(Kpis, { children: [
				/* @__PURE__ */ jsx(Kpi, {
					etiqueta: "Vinculados",
					valor: numero(cuenta("VINCULADO")),
					detalle: `de ${filas.length} proyectos`
				}),
				/* @__PURE__ */ jsx(Kpi, {
					etiqueta: "Sin vínculo",
					valor: numero(cuenta("SIN_VINCULO")),
					detalle: "Falta CUI o meta presupuestaria"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					etiqueta: "Observados",
					valor: numero(cuenta("OBSERVADO")),
					detalle: "Pendientes de corrección del Coordinador"
				}),
				/* @__PURE__ */ jsx(Kpi, {
					etiqueta: "Con ejecución cargada",
					valor: numero(conEjecucion),
					detalle: `Ejercicio ${anio}`
				})
			] }),
			/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Ejercicio",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					value: anio,
					onChange: (e) => setAnio(Number(e.target.value)),
					className: controlClase,
					children: ejerciciosDesde(2024).map((y) => /* @__PURE__ */ jsx("option", {
						value: y,
						children: y
					}, y))
				})
			}), /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado del vínculo",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					value: filtro,
					onChange: (e) => setFiltro(e.target.value),
					className: controlClase,
					children: [/* @__PURE__ */ jsx("option", {
						value: "TODOS",
						children: "Todos"
					}), Object.keys(NOMBRE_ESTADO_VINCULO).map((e) => /* @__PURE__ */ jsx("option", {
						value: e,
						children: NOMBRE_ESTADO_VINCULO[e]
					}, e))]
				})
			})] }),
			/* @__PURE__ */ jsx("div", {
				className: "mt-3",
				children: /* @__PURE__ */ jsx(Tabla, {
					filas: visibles,
					claveFila: (f) => f.proyecto.id,
					vacio: "Ningún proyecto con ese estado.",
					columnas: [
						{
							clave: "proyecto",
							titulo: "Proyecto",
							render: (f) => /* @__PURE__ */ jsxs(Link, {
								to: "/proyectos/$projectId/metas",
								params: { projectId: f.proyecto.id },
								className: "font-medium text-primary-dark underline-offset-2 hover:underline",
								children: [f.proyecto.nombre, /* @__PURE__ */ jsxs("span", {
									className: "block text-xs font-normal text-muted-foreground",
									children: [
										f.proyecto.codigo,
										" · ",
										f.proyecto.tipo
									]
								})]
							})
						},
						{
							clave: "estado",
							titulo: "Vínculo",
							render: (f) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
								/* @__PURE__ */ jsx(StatusBadge, {
									tono: TONO_VINCULO[f.estado],
									children: NOMBRE_ESTADO_VINCULO[f.estado]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "mt-1 block text-xs text-muted-foreground",
									children: [
										"UE ",
										f.v.unidadEjecutora,
										" · ",
										FUENTE[f.v.fuenteDatos]
									]
								}),
								f.v.observacion && /* @__PURE__ */ jsx("span", {
									className: "mt-1 block text-xs text-destructive",
									children: f.v.observacion
								})
							] })
						},
						{
							clave: "cui",
							titulo: "CUI",
							render: (f) => f.v.cuis.length ? f.v.cuis.map((c) => /* @__PURE__ */ jsx("span", {
								className: "block font-mono text-xs",
								title: c.nombre,
								children: c.cui || "—"
							}, c.cui)) : /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "Sin CUI"
							})
						},
						{
							clave: "metas",
							titulo: "Metas presupuestarias",
							render: (f) => f.v.metas.length ? f.v.metas.map((m, i) => /* @__PURE__ */ jsxs("span", {
								className: "block text-xs",
								title: m.finalidad,
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "font-mono",
										children: m.numero || "—"
									}),
									m.secFunc && /* @__PURE__ */ jsxs("span", {
										className: "font-mono text-muted-foreground",
										children: [" · SF ", m.secFunc]
									}),
									" ",
									"· ",
									numero(m.cantidadAnual),
									" ",
									m.unidadMedida
								]
							}, i)) : /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "Sin meta"
							})
						},
						{
							clave: "especificas",
							titulo: "Específicas",
							alinear: "centro",
							render: (f) => /* @__PURE__ */ jsx("span", {
								className: "text-xs",
								title: f.v.especificas.join("\n"),
								children: f.v.especificas.length
							})
						},
						{
							clave: "ceplan",
							titulo: "CEPLAN",
							render: (f) => f.v.ceplan.oei || f.v.ceplan.aei || f.v.ceplan.aoi ? /* @__PURE__ */ jsx("span", {
								className: "block text-xs",
								children: [
									f.v.ceplan.oei,
									f.v.ceplan.aei,
									f.v.ceplan.aoi
								].filter(Boolean).join(" · ")
							}) : /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "—"
							})
						},
						{
							clave: "ejecucion",
							titulo: "Ejecución cargada",
							alinear: "derecha",
							render: (f) => f.ejecucion ? /* @__PURE__ */ jsxs("span", {
								className: "block text-xs tabular-nums",
								children: [
									"PIM ",
									moneda(f.ejecucion.pim),
									/* @__PURE__ */ jsxs("span", {
										className: "block",
										children: ["Dev. ", moneda(f.ejecucion.devengado)]
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "block text-muted-foreground",
										children: [f.ejecucion.ultimoMes ? `a ${MESES[f.ejecucion.ultimoMes - 1]}` : "", f.ejecucion.movimientos ? ` · ${f.ejecucion.movimientos} mov.` : ""]
									})
								]
							}) : /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "Sin carga"
							})
						},
						{
							clave: "metasProyecto",
							titulo: "Metas del proyecto",
							render: (f) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(StatusBadge, {
								tono: TONO_METAS[f.metasEstado],
								children: NOMBRE_ESTADO_METAS[f.metasEstado]
							}), /* @__PURE__ */ jsxs("span", {
								className: "mt-1 block text-xs tabular-nums text-muted-foreground",
								children: [
									numero(f.fisica),
									" predios · ",
									moneda(f.financiera)
								]
							})] })
						},
						{
							clave: "abrir",
							titulo: "",
							alinear: "derecha",
							render: (f) => /* @__PURE__ */ jsx(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ jsxs(Link, {
									to: "/proyectos/$projectId/metas",
									params: { projectId: f.proyecto.id },
									children: [/* @__PURE__ */ jsx(ExternalLink, {}), " Abrir"]
								})
							})
						}
					]
				})
			})
		]
	});
}
//#endregion
//#region src/routes/gestion-presupuestal.tsx?tsr-split=component
function seedHistory(kind, metas) {
	const out = {};
	metas.forEach((m, i) => {
		if (!m.fechaReprog) return;
		const key = `${kind}-${m.mes}`;
		const [dd, mm, yyyy] = m.fechaReprog.split("/");
		out[key] = [{
			fecha: `${dd}/${mm}/${yyyy} 09:${String(15 + i).padStart(2, "0")}:00`,
			usuario: "Sistema",
			cambios: [{
				campo: "Meta Programada",
				anterior: "Sin valor",
				nuevo: String(m.programada)
			}]
		}, {
			fecha: `${dd}/${mm}/${yyyy} 14:${String(20 + i).padStart(2, "0")}:00`,
			usuario: m.usuarioReprog || "Jean Ascencios",
			cambios: [{
				campo: "Meta Reprogramada",
				anterior: String(m.programada),
				nuevo: String(m.reprogramada)
			}]
		}];
	});
	return out;
}
function ProjectAutocomplete({ id, value, onChange }) {
	const [open, setOpen] = useState(false);
	const [q, setQ] = useState("");
	const ref = useRef(null);
	const selected = proyectos.find((p) => p.id === value);
	useEffect(() => {
		function onDoc(e) {
			if (!ref.current?.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	const filtered = proyectos.filter((p) => p.nombre.toLowerCase().includes(q.toLowerCase())).slice(0, 40);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: "relative w-full",
		children: [/* @__PURE__ */ jsxs("button", {
			id,
			type: "button",
			"aria-haspopup": "listbox",
			"aria-expanded": open,
			onClick: () => setOpen((v) => !v),
			className: `${controlClase} flex items-center justify-between text-left`,
			children: [/* @__PURE__ */ jsx("span", {
				className: selected ? "truncate text-foreground" : "text-muted-foreground",
				children: selected ? selected.nombre : "Buscar proyecto"
			}), /* @__PURE__ */ jsx(ChevronDown, {
				size: 16,
				className: "shrink-0 text-muted-foreground",
				"aria-hidden": true
			})]
		}), open && /* @__PURE__ */ jsxs("div", {
			className: "absolute z-50 mt-1 w-full rounded-md border border-border bg-card",
			children: [/* @__PURE__ */ jsx("input", {
				autoFocus: true,
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Escriba para filtrar",
				"aria-label": "Filtrar proyectos",
				className: "h-9 w-full border-b border-border bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
			}), /* @__PURE__ */ jsxs("ul", {
				role: "listbox",
				className: "max-h-64 overflow-auto py-1",
				children: [filtered.length === 0 && /* @__PURE__ */ jsx("li", {
					className: "px-3 py-2 text-sm text-muted-foreground",
					children: "Ningún proyecto coincide."
				}), filtered.map((p) => /* @__PURE__ */ jsx("li", {
					role: "option",
					"aria-selected": p.id === value,
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => {
							onChange(p.id);
							setOpen(false);
							setQ("");
						},
						className: "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-primary-soft",
						children: [
							/* @__PURE__ */ jsx(Folder, {
								size: 16,
								className: "shrink-0 text-primary",
								"aria-hidden": true
							}),
							/* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: p.nombre
							}),
							/* @__PURE__ */ jsx("span", {
								className: "ml-auto text-xs text-muted-foreground",
								children: p.codigo
							})
						]
					})
				}, p.id))]
			})]
		})]
	});
}
function Page() {
	const [proyectoId, setProyectoId] = useState(null);
	const [ejercicio, setEjercicio] = useState(null);
	const [tab, setTab] = useState("fisica");
	const [modal, setModal] = useState(null);
	const [editModal, setEditModal] = useState(null);
	const [historyModal, setHistoryModal] = useState(null);
	const [metasFis, setMetasFis] = useState([]);
	const [metasFin, setMetasFin] = useState([]);
	const [historial, setHistorial] = useState({});
	const [mensaje, setMensaje] = useState("");
	const [verHistorico, setVerHistorico] = useState(false);
	const rol = useRol();
	const claveHistorial = `metas-${proyectoId ?? "sin-proyecto"}-${ejercicio ?? "sin-ejercicio"}`;
	const versiones = useHistorial(claveHistorial);
	const bitacora = {
		modulo: 26,
		entidad: "meta_presupuestal"
	};
	const aprobaciones = useAprobacionesMetas();
	const proyecto = proyectos.find((p) => p.id === proyectoId);
	const ejercicios = useMemo(() => proyecto ? ejerciciosDesde(ejercicioInicial(proyecto.codigo)) : [], [proyecto]);
	useEffect(() => {
		if (ejercicios.length && ejercicio === null) setEjercicio(ejercicios[0]);
		if (!proyecto) setEjercicio(null);
	}, [
		ejercicios,
		ejercicio,
		proyecto
	]);
	useEffect(() => {
		if (ejercicio !== null) {
			const mf = metasDemostracion("fisica", ejercicio);
			const mfin = metasDemostracion("financiera", ejercicio);
			const guardado = versiones[0]?.registro;
			setMetasFis(guardado ? limpiarMetas(guardado.fisica) : mf);
			setMetasFin(guardado ? limpiarMetas(guardado.financiera) : mfin);
			setHistorial({
				...seedHistory("fisica", mf),
				...seedHistory("financiera", mfin)
			});
		}
	}, [ejercicio, proyectoId]);
	/** Cambios de un mes a lo largo de las versiones guardadas, de la más antigua a la más nueva. */
	const entradasDelMes = (kind, mes) => {
		const cronologicas = [...versiones].reverse();
		const guardadas = [];
		cronologicas.forEach((v, i) => {
			const previa = cronologicas[i - 1]?.registro[kind].find((m) => m.mes === mes);
			const actual = v.registro[kind].find((m) => m.mes === mes);
			if (!previa || !actual) return;
			const cambios = [];
			if (previa.programada !== actual.programada) cambios.push({
				campo: "Meta Programada",
				anterior: String(previa.programada),
				nuevo: String(actual.programada)
			});
			if (previa.reprogramada !== actual.reprogramada) cambios.push({
				campo: "Meta Reprogramada",
				anterior: String(previa.reprogramada),
				nuevo: String(actual.reprogramada)
			});
			if (cambios.length) guardadas.push({
				fecha: fechaHora(v.fecha),
				usuario: v.usuario,
				cambios
			});
		});
		return [...historial[`${kind}-${mes}`] ?? [], ...guardadas];
	};
	const saveEdit = (kind, mes, programada, reprogramada) => {
		const setter = kind === "fisica" ? setMetasFis : setMetasFin;
		const list = kind === "fisica" ? metasFis : metasFin;
		const prev = list.find((m) => m.mes === mes);
		if (!prev) return;
		const cambio = prev.programada !== programada || prev.reprogramada !== reprogramada;
		const nueva = list.map((m) => m.mes === mes ? {
			...m,
			programada,
			reprogramada
		} : m);
		setter(nueva);
		if (cambio) {
			const antes = {
				fisica: metasFis,
				financiera: metasFin
			};
			registrarCambio(claveHistorial, {
				accion: `Modificó meta ${kind === "fisica" ? "física" : "financiera"}`,
				objeto: `${mes} ${ejercicio}`,
				antes: conNombre(antes),
				despues: conNombre({
					...antes,
					[kind]: nueva
				})
			}, bitacora);
		}
		setMensaje(`Meta de ${mes} guardada.`);
	};
	const restaurar = (r, n) => {
		const registro = {
			fisica: limpiarMetas(r.fisica),
			financiera: limpiarMetas(r.financiera)
		};
		registrarCambio(claveHistorial, {
			accion: "Restauró una versión anterior",
			objeto: `versión ${n}`,
			antes: conNombre({
				fisica: metasFis,
				financiera: metasFin
			}),
			despues: conNombre(registro)
		}, bitacora);
		setMetasFis(registro.fisica);
		setMetasFin(registro.financiera);
		setMensaje(`Metas restauradas a la versión ${n}.`);
	};
	const currentMetas = tab === "fisica" ? metasFis : metasFin;
	const fmt = (n) => tab === "financiera" ? moneda(n) : numero(n);
	const brecha = (n) => n === null ? "" : /* @__PURE__ */ jsx("span", {
		className: n < 0 ? "text-destructive" : "text-success",
		children: fmt(n)
	});
	const conDatos = currentMetas.filter((b) => b.fechaReprog);
	const suma = (lista, f) => lista.reduce((a, b) => a + f(b), 0);
	/** Fila de totales al pie de la tabla de periodos (R9: una sola `Tabla`, sin `<table>` a mano). */
	const TOTALES = "Totales";
	const filasPeriodos = [...currentMetas, {
		mes: TOTALES,
		programada: suma(currentMetas, (m) => m.programada),
		reprogramada: suma(conDatos, (m) => m.reprogramada),
		cumplida: suma(conDatos, (m) => m.cumplida),
		fechaReprog: "x",
		usuarioReprog: ""
	}];
	const esTotal = (m) => m.mes === TOTALES;
	const num = (n) => /* @__PURE__ */ jsx("span", {
		className: "tabular-nums",
		children: fmt(n)
	});
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: Target,
			titulo: "Metas",
			descripcion: "Programación y seguimiento de metas físicas y financieras por proyecto.",
			migas: [{ texto: "Gestión presupuestal" }, { texto: "Metas y reprogramación" }]
		}),
		mensaje && /* @__PURE__ */ jsxs("p", {
			role: "status",
			className: "mb-4 flex items-center justify-between gap-3 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
			children: [mensaje, /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setMensaje(""),
				"aria-label": "Cerrar aviso",
				className: "rounded-sm hover:bg-success/10",
				children: /* @__PURE__ */ jsx(X, {
					size: 16,
					"aria-hidden": true
				})
			})]
		}),
		/* @__PURE__ */ jsx(MetasPorAprobar, { onVer: (proyecto, anio) => {
			setProyectoId(proyecto);
			setEjercicio(anio);
		} }),
		/* @__PURE__ */ jsx(VinculosPorProyecto, {}),
		/* @__PURE__ */ jsx(CargasSiafRecientes, {}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Metas por ejercicio",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-4 grid grid-cols-1 items-end gap-3 md:grid-cols-[320px_1fr_auto]",
				children: [
					/* @__PURE__ */ jsx(FormGrid, {
						columnas: 1,
						children: /* @__PURE__ */ jsx(FormField, {
							etiqueta: "Proyecto",
							obligatorio: true,
							children: (id) => /* @__PURE__ */ jsx(ProjectAutocomplete, {
								id,
								value: proyectoId,
								onChange: setProyectoId
							})
						})
					}),
					/* @__PURE__ */ jsx(Tabs, {
						value: verHistorico ? "historico" : tab,
						onValueChange: (v) => {
							setVerHistorico(v === "historico");
							if (v !== "historico") setTab(v);
						},
						children: /* @__PURE__ */ jsxs(TabsList, {
							"aria-label": "Tipo de meta",
							children: [
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "fisica",
									disabled: !proyecto,
									children: "Metas físicas"
								}),
								/* @__PURE__ */ jsx(TabsTrigger, {
									value: "financiera",
									disabled: !proyecto,
									children: "Metas financieras"
								}),
								/* @__PURE__ */ jsxs(TabsTrigger, {
									value: "historico",
									disabled: !proyecto,
									children: [
										/* @__PURE__ */ jsx(History, {
											size: 16,
											className: "mr-1",
											"aria-hidden": true
										}),
										" Histórico (",
										versiones.length,
										")"
									]
								})
							]
						})
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "text-xs text-muted-foreground md:text-right",
						children: [
							tab === "fisica" ? "Cantidad de predios a liberar" : "Monto (S/) a ejecutar",
							proyecto && ejercicio && ` · Metas ${NOMBRE_ESTADO_METAS[aprobacionDe(aprobaciones, proyecto.id, ejercicio).estado].toLowerCase()}`,
							" ",
							"· Datos de demostración"
						]
					})
				]
			}), !proyecto ? /* @__PURE__ */ jsx("p", {
				className: "rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
				children: "Seleccione un proyecto para visualizar sus ejercicios y metas."
			}) : verHistorico ? /* @__PURE__ */ jsx(Historico, {
				registro: claveHistorial,
				etiquetas: ETIQUETAS_METAS,
				nombreArchivo: `historico-${claveHistorial}`,
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: restaurar
			}) : /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "h-fit rounded-md border border-border",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1.5 border-b border-border bg-background px-3 py-2 text-xs font-semibold uppercase text-primary-dark",
						children: [/* @__PURE__ */ jsx(Calendar, {
							size: 16,
							className: "text-primary",
							"aria-hidden": true
						}), " Periodos"]
					}), /* @__PURE__ */ jsx("nav", {
						"aria-label": "Ejercicios",
						className: "p-1",
						children: ejercicios.map((y) => {
							const active = y === ejercicio;
							return /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setEjercicio(y),
								"aria-current": active ? "true" : void 0,
								className: `flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm ${active ? "bg-primary font-semibold text-primary-foreground" : "text-foreground hover:bg-muted"}`,
								children: [/* @__PURE__ */ jsx(Calendar, {
									size: 16,
									"aria-hidden": true
								}), y]
							}, y);
						})
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ jsx(Tabla, {
							filas: filasPeriodos,
							claveFila: (m) => m.mes,
							claseFila: (m) => esTotal(m) ? "bg-muted font-semibold" : void 0,
							vacio: "Sin periodos para este ejercicio.",
							columnas: [
								{
									clave: "mes",
									titulo: "Mes"
								},
								{
									clave: "programada",
									titulo: "Meta programada",
									alinear: "derecha",
									render: (m) => num(m.programada)
								},
								{
									clave: "reprogramada",
									titulo: "Meta reprog.",
									alinear: "derecha",
									render: (m) => m.fechaReprog ? num(m.reprogramada) : ""
								},
								{
									clave: "fechaReprog",
									titulo: "F. reprog.",
									alinear: "centro",
									render: (m) => esTotal(m) ? "" : /* @__PURE__ */ jsx("span", {
										className: "text-muted-foreground",
										children: m.fechaReprog
									})
								},
								{
									clave: "usuarioReprog",
									titulo: "Usuario",
									render: (m) => /* @__PURE__ */ jsx("span", {
										className: "text-muted-foreground",
										children: m.usuarioReprog
									})
								},
								{
									clave: "solicitar",
									titulo: "Solicitar",
									alinear: "centro",
									render: (m) => esTotal(m) ? "" : /* @__PURE__ */ jsxs(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => setModal({
											mes: m.mes,
											kind: tab
										}),
										children: [/* @__PURE__ */ jsx(Send, {}), " Reprogramar"]
									})
								},
								{
									clave: "cumplida",
									titulo: "Cumplida",
									alinear: "derecha",
									render: (m) => m.fechaReprog ? /* @__PURE__ */ jsx("span", {
										className: "font-medium",
										children: num(m.cumplida)
									}) : ""
								},
								{
									clave: "bInicial",
									titulo: "Brecha inicial",
									alinear: "derecha",
									render: (m) => brecha(m.fechaReprog ? m.cumplida - m.programada : null)
								},
								{
									clave: "bReprog",
									titulo: "Brecha reprog.",
									alinear: "derecha",
									render: (m) => brecha(m.fechaReprog ? m.cumplida - m.reprogramada : null)
								},
								{
									clave: "acciones",
									titulo: "Acciones",
									alinear: "derecha",
									render: (m) => esTotal(m) ? "" : /* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ jsxs(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => setEditModal({
												mes: m.mes,
												kind: tab
											}),
											children: [/* @__PURE__ */ jsx(Edit, {}), " Editar"]
										}), /* @__PURE__ */ jsxs(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => setHistoryModal({
												mes: m.mes,
												kind: tab
											}),
											children: [/* @__PURE__ */ jsx(History, {}), " Historial"]
										})]
									})
								}
							]
						}),
						/* @__PURE__ */ jsx(Subtitulo, { children: "Solicitudes de reprogramación enviadas" }),
						/* @__PURE__ */ jsx(HistorialEnvios, {
							proyecto: proyecto.id,
							paso: "gestion-presupuestal",
							vacio: "Aún no se envió ninguna solicitud de reprogramación."
						})
					]
				})]
			})]
		}),
		modal && proyecto && ejercicio && /* @__PURE__ */ jsx(ReprogramarModal, {
			mes: modal.mes,
			kind: modal.kind,
			proyecto: proyecto.nombre,
			ejercicio,
			onClose: () => setModal(null),
			onSubmit: (solicitud) => {
				const actual = conNombre({
					fisica: metasFis,
					financiera: metasFin
				});
				registrarCambio(claveHistorial, {
					accion: `Solicitó reprogramación de meta ${modal.kind === "fisica" ? "física" : "financiera"}`,
					objeto: `${modal.mes} ${ejercicio}: ${solicitud.indicaciones || "sin indicaciones"}`,
					antes: actual,
					despues: actual
				}, bitacora);
				registrarEnvio({
					proyecto: proyecto.id,
					predio: "",
					paso: "gestion-presupuestal",
					canal: "Solicitud de reprogramación",
					destinatario: "Coordinación",
					documento: `${modal.mes} ${ejercicio} · meta ${modal.kind === "fisica" ? "física" : "financiera"}`,
					detalle: solicitud.indicaciones || void 0,
					acuse: solicitud.anexo || void 0
				}, bitacora);
				setModal(null);
				setMensaje(`Solicitud de reprogramación de ${modal.mes} enviada a los coordinadores de ${proyecto.nombre}.`);
			}
		}),
		editModal && (() => {
			const meta = (editModal.kind === "fisica" ? metasFis : metasFin).find((m) => m.mes === editModal.mes);
			if (!meta) return null;
			return /* @__PURE__ */ jsx(EditarMetaModal, {
				meta,
				kind: editModal.kind,
				onClose: () => setEditModal(null),
				onSave: (p, r) => {
					saveEdit(editModal.kind, editModal.mes, p, r);
					setEditModal(null);
				}
			});
		})(),
		historyModal && /* @__PURE__ */ jsx(HistorialModal, {
			mes: historyModal.mes,
			kind: historyModal.kind,
			entries: entradasDelMes(historyModal.kind, historyModal.mes),
			onClose: () => setHistoryModal(null)
		})
	] });
}
function ReprogramarModal({ mes, kind, proyecto, ejercicio, onClose, onSubmit }) {
	const [file, setFile] = useState(null);
	const [indicaciones, setIndicaciones] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Solicitar reprogramación",
		descripcion: `${proyecto} · ${ejercicio} · ${mes} · Meta ${kind === "fisica" ? "física" : "financiera"}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: () => onSubmit({
				indicaciones: indicaciones.trim(),
				anexo: file?.name
			}),
			children: [/* @__PURE__ */ jsx(Send, {}), " Enviar solicitud"]
		})] }),
		children: [
			/* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mb-3 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
				children: [
					"La solicitud se enviará a los coordinadores del proyecto ",
					/* @__PURE__ */ jsx("b", { children: proyecto }),
					". Ellos podrán reprogramar las cantidades",
					" ",
					kind === "fisica" ? "físicas (predios a liberar)" : "financieras (monto en S/)",
					" dentro del rango de fechas indicado."
				]
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de la solicitud" }),
			/* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Fecha de inicio de registro",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Fecha de fin de registro",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Prioridad",
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						children: [
							/* @__PURE__ */ jsx("option", { children: "Alta" }),
							/* @__PURE__ */ jsx("option", { children: "Media" }),
							/* @__PURE__ */ jsx("option", { children: "Baja" })
						]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Indicaciones",
					obligatorio: true,
					ancho: "doble",
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						rows: 3,
						className: `${controlClase} h-auto py-2`,
						value: indicaciones,
						onChange: (e) => setIndicaciones(e.target.value),
						placeholder: "Motivo y detalles para el coordinador"
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Anexo",
					ancho: "doble",
					children: /* @__PURE__ */ jsxs("label", {
						className: "inline-flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 text-sm hover:bg-muted",
						children: [
							/* @__PURE__ */ jsx(Paperclip, {
								size: 16,
								"aria-hidden": true
							}),
							file ? file.name : "Adjuntar archivo",
							/* @__PURE__ */ jsx("input", {
								type: "file",
								className: "sr-only",
								onChange: (e) => setFile(e.target.files?.[0] ?? null)
							})
						]
					})
				})
			] })
		]
	});
}
function EditarMetaModal({ meta, kind, onClose, onSave }) {
	const [programada, setProgramada] = useState(meta.programada);
	const [reprogramada, setReprogramada] = useState(meta.reprogramada);
	const unidad = kind === "financiera" ? "S/" : "Predios";
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Editar meta",
		descripcion: `${meta.mes} · Meta ${kind === "fisica" ? "física" : "financiera"} · ${unidad}`,
		ancho: "sm",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: () => onSave(programada, reprogramada),
			children: [/* @__PURE__ */ jsx(Save, {}), " Guardar meta"]
		})] }),
		children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Valores de la meta" }), /* @__PURE__ */ jsxs(FormGrid, {
			columnas: 1,
			children: [/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Meta programada",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "number",
					value: programada,
					onChange: (e) => setProgramada(Number(e.target.value)),
					className: controlClase
				})
			}), /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Meta reprogramada",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "number",
					value: reprogramada,
					onChange: (e) => setReprogramada(Number(e.target.value)),
					className: controlClase
				})
			})]
		})]
	});
}
function HistorialModal({ mes, kind, entries, onClose }) {
	const ordered = [...entries].reverse();
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Historial de modificaciones",
		descripcion: `${mes} · Meta ${kind === "fisica" ? "física" : "financiera"}`,
		ancho: "lg",
		pie: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cerrar"
		}),
		children: /* @__PURE__ */ jsx(Tabla, {
			filas: ordered.flatMap((e) => e.cambios.map((c) => ({
				...c,
				fecha: e.fecha,
				usuario: e.usuario
			}))),
			vacio: "Sin modificaciones registradas.",
			columnas: [
				{
					clave: "fecha",
					titulo: "Fecha / hora",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "whitespace-nowrap",
						children: f.fecha
					})
				},
				{
					clave: "usuario",
					titulo: "Usuario"
				},
				{
					clave: "campo",
					titulo: "Campo"
				},
				{
					clave: "anterior",
					titulo: "Valor anterior",
					alinear: "derecha",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: f.anterior
					})
				},
				{
					clave: "nuevo",
					titulo: "Valor nuevo",
					alinear: "derecha",
					render: (f) => /* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: f.nuevo
					})
				}
			]
		})
	});
}
/**
* Metas que los coordinadores enviaron a aprobación: Presupuesto (Tesorería / Presupuesto) las revisa,
* aprueba u observa con motivo. «Ver» abre las metas del proyecto y ejercicio abajo.
*/
function MetasPorAprobar({ onVer }) {
	const rol = useRol();
	const quien = useUsuarioSesion()?.nombre ?? ROLES[rol];
	const aprueba = puedeAprobarMetas(rol);
	const pendientes = Object.values(useAprobacionesMetas()).filter((a) => a.estado === "EN_APROBACION");
	const [observar, setObservar] = useState(null);
	const nombreDe = (id) => proyectos.find((p) => p.id === id)?.nombre ?? id;
	if (!pendientes.length) return null;
	return /* @__PURE__ */ jsxs(Section, {
		titulo: `Metas por aprobar (${pendientes.length})`,
		className: "mb-4",
		children: [
			!aprueba && /* @__PURE__ */ jsxs("p", {
				className: "mb-2 text-xs text-muted-foreground",
				children: [
					"Las aprueba el perfil Tesorería / Presupuesto; el perfil ",
					ROLES[rol],
					" solo consulta."
				]
			}),
			/* @__PURE__ */ jsx(Tabla, {
				filas: pendientes,
				claveFila: (a) => `${a.proyecto}-${a.ejercicio}`,
				vacio: "No hay metas por aprobar.",
				columnas: [
					{
						clave: "proyecto",
						titulo: "Proyecto",
						render: (a) => nombreDe(a.proyecto)
					},
					{
						clave: "ejercicio",
						titulo: "Ejercicio"
					},
					{
						clave: "solicitadoEl",
						titulo: "Solicitado",
						render: (a) => `${fechaHora(a.solicitadoEl ?? "")} · ${a.solicitadoPor ?? ""}`
					},
					{
						clave: "fisica",
						titulo: "Predios a liberar",
						alinear: "derecha",
						render: (a) => numero(totalProgramado(leerMetas(a.proyecto, a.ejercicio).fisica))
					},
					{
						clave: "financiera",
						titulo: "Monto a ejecutar",
						alinear: "derecha",
						render: (a) => moneda(totalProgramado(leerMetas(a.proyecto, a.ejercicio).financiera))
					},
					{
						clave: "pim",
						titulo: "PIM del SIAF",
						alinear: "derecha",
						render: (a) => /* @__PURE__ */ jsx(MarcoSiaf, {
							proyecto: a.proyecto,
							anio: a.ejercicio,
							metaFinanciera: totalProgramado(leerMetas(a.proyecto, a.ejercicio).financiera)
						})
					},
					{
						clave: "acciones",
						titulo: "Acciones",
						alinear: "derecha",
						render: (a) => /* @__PURE__ */ jsxs("div", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => onVer(a.proyecto, a.ejercicio),
								children: "Ver metas"
							}), aprueba && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => setObservar(a),
								children: [/* @__PURE__ */ jsx(MessageSquareWarning, {}), " Observar"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								onClick: () => decidirMetas(a.proyecto, a.ejercicio, "APROBADA", quien),
								children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Aprobar"]
							})] })]
						})
					}
				]
			}),
			observar && /* @__PURE__ */ jsx(MotivoModal, {
				titulo: "Observar las metas",
				descripcion: `Metas ${observar.ejercicio} de ${nombreDe(observar.proyecto)}. El Coordinador las corrige y vuelve a pedir la aprobación.`,
				accion: "Observar metas",
				onCerrar: () => setObservar(null),
				onConfirmar: (motivo) => {
					decidirMetas(observar.proyecto, observar.ejercicio, "OBSERVADA", quien, motivo);
					setObservar(null);
				}
			})
		]
	});
}
/** Últimas cargas de ejecución del SIAF de todos los proyectos; el detalle está en cada proyecto. */
function CargasSiafRecientes() {
	const cargas = useCargasSiaf().slice(0, 8);
	if (!cargas.length) return null;
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Cargas de ejecución del SIAF",
		className: "mb-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-muted-foreground",
			children: "Archivos de datos abiertos del MEF o exportaciones del SIAF-SP cargados en «Metas del proyecto › Ejecución SIAF». Las metas por aprobar muestran el PIM que resulta de estas cargas."
		}), /* @__PURE__ */ jsx(TablaCargas, {
			cargas,
			conProyecto: true,
			nombreDe: (id) => proyectos.find((p) => p.id === id)?.nombre ?? id
		})]
	});
}
//#endregion
export { Page as component };
