import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, v as numero } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { C as puedeEditarVinculo, D as useEjecucionSiaf, M as MESES, T as useAvance12B, b as movimientosDeExpediente, i as NOMBRE_FASE, l as cantidadFisicaVinculada, m as guardarAvance12B, u as conciliar } from "./siaf-ocJzaGES.js";
import { n as Kpis, t as Kpi } from "./Kpi-W-n9ERev.js";
import { useEffect, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region src/components/siaf/ConciliacionSiaf.tsx
var TOTAL = "Total";
/** Semáforo de la brecha del mes: cumple, hasta 10 % por debajo, o más. */
function semaforo(f) {
	if (!f.conDatos || f.metaFinanciera === 0) return null;
	if (f.brecha >= 0) return {
		tono: "success",
		texto: "Cumple"
	};
	if (-f.brecha <= f.metaFinanciera * .1) return {
		tono: "warning",
		texto: "Cerca"
	};
	return {
		tono: "destructive",
		texto: "Por debajo"
	};
}
/**
* Metas del Coordinador contra lo cargado del SIAF: PIM, devengado y girado mes a mes; meta física contra
* los predios con pago registrado en el padrón; avance físico del Formato 12-B anotado a mano.
*/
function ConciliacionSiaf({ projectId, anio, metas, ejecucion, vinculo }) {
	if (!metas) return null;
	const c = conciliar(projectId, anio, metas, ejecucion);
	const filas = [...c.filas, {
		mes: 0,
		nombreMes: TOTAL,
		metaFinanciera: c.metaFinancieraAnual,
		devengado: c.devengadoAcumulado,
		girado: c.giradoAcumulado,
		brecha: c.devengadoAcumulado - c.filas.filter((f) => f.conDatos).reduce((n, f) => n + f.metaFinanciera, 0),
		metaFisica: c.metaFisicaAnual,
		prediosPagados: c.prediosPagadosAnual,
		conDatos: c.ultimoMes > 0
	}];
	const fisicaVinculada = cantidadFisicaVinculada(vinculo);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		!ejecucion.length && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "info",
			children: [
				"Aún no hay ejecución del SIAF cargada para ",
				anio,
				". Cargue el CSV en «Ejecución SIAF»; mientras, la tabla muestra solo las metas y los predios pagados del padrón."
			]
		}),
		c.excedente > 0 && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "aviso",
			children: [
				"La meta financiera anual (",
				moneda(c.metaFinancieraAnual),
				") supera el PIM vigente (",
				moneda(c.pim),
				") en ",
				moneda(c.excedente),
				". Presupuesto debe ajustar las metas o tramitar una modificación."
			]
		}),
		fisicaVinculada > 0 && c.metaFisicaAnual > 0 && fisicaVinculada !== c.metaFisicaAnual && /* @__PURE__ */ jsxs(Aviso, {
			tipo: "aviso",
			children: [
				"La meta física del Coordinador (",
				numero(c.metaFisicaAnual),
				" predios) no coincide con la cantidad anual de la meta presupuestaria del SIAF (",
				numero(fisicaVinculada),
				")."
			]
		}),
		/* @__PURE__ */ jsxs(Kpis, { children: [
			/* @__PURE__ */ jsx(Kpi, {
				etiqueta: "PIM vigente",
				valor: c.pim ? moneda(c.pim) : "Sin datos",
				detalle: c.pia ? `PIA ${moneda(c.pia)}` : void 0
			}),
			/* @__PURE__ */ jsx(Kpi, {
				etiqueta: `Devengado acumulado${c.ultimoMes ? ` a ${MESES[c.ultimoMes - 1]}` : ""}`,
				valor: c.ultimoMes ? moneda(c.devengadoAcumulado) : "Sin datos",
				detalle: c.pim ? `${numero(c.devengadoAcumulado / c.pim * 100, 1)} % del PIM` : void 0
			}),
			/* @__PURE__ */ jsx(Kpi, {
				etiqueta: "Girado acumulado",
				valor: c.ultimoMes ? moneda(c.giradoAcumulado) : "Sin datos",
				detalle: c.certificado ? `Certificado ${moneda(c.certificado)}` : void 0
			}),
			/* @__PURE__ */ jsx(Kpi, {
				etiqueta: "Predios pagados en el año",
				valor: numero(c.prediosPagadosAnual),
				detalle: `Meta física ${numero(c.metaFisicaAnual)}${fisicaVinculada ? ` · SIAF ${numero(fisicaVinculada)}` : ""}`
			})
		] }),
		/* @__PURE__ */ jsxs(Section, {
			titulo: `Conciliación mes a mes · ${anio}`,
			children: [/* @__PURE__ */ jsx(Tabla, {
				filas,
				claveFila: (f) => f.nombreMes,
				claseFila: (f) => f.nombreMes === TOTAL ? "bg-muted font-semibold" : f.conDatos ? void 0 : "text-muted-foreground",
				columnas: [
					{
						clave: "nombreMes",
						titulo: "Mes"
					},
					{
						clave: "metaFinanciera",
						titulo: "Meta financiera",
						alinear: "derecha",
						render: (f) => moneda(f.metaFinanciera)
					},
					{
						clave: "devengado",
						titulo: "Devengado SIAF",
						alinear: "derecha",
						render: (f) => f.conDatos ? moneda(f.devengado) : ""
					},
					{
						clave: "girado",
						titulo: "Girado SIAF",
						alinear: "derecha",
						render: (f) => f.conDatos ? moneda(f.girado) : ""
					},
					{
						clave: "brecha",
						titulo: "Brecha",
						alinear: "derecha",
						render: (f) => {
							const s = semaforo(f);
							return f.conDatos ? /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "tabular-nums",
									children: moneda(f.brecha)
								}), s && f.nombreMes !== TOTAL && /* @__PURE__ */ jsx(StatusBadge, {
									tono: s.tono,
									children: s.texto
								})]
							}) : /* @__PURE__ */ jsx("span", {
								className: "text-xs",
								children: "Sin carga"
							});
						}
					},
					{
						clave: "metaFisica",
						titulo: "Meta física",
						alinear: "derecha",
						render: (f) => numero(f.metaFisica)
					},
					{
						clave: "prediosPagados",
						titulo: "Predios pagados",
						alinear: "derecha",
						render: (f) => numero(f.prediosPagados)
					}
				]
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "Devengado y girado del mes se obtienen por diferencia de los acumulados del CSV. Los predios pagados son los que tienen fecha de pago registrada en «Pago o consignación»."
			})]
		}),
		/* @__PURE__ */ jsx(Avance12B, {
			projectId,
			anio
		})
	] });
}
function Avance12B({ projectId, anio }) {
	const rol = useRol();
	const guardado = useAvance12B(projectId, anio);
	const [porcentaje, setPorcentaje] = useState("");
	const [mes, setMes] = useState((/* @__PURE__ */ new Date()).getMonth() + 1);
	const [exito, setExito] = useState(false);
	useEffect(() => {
		if (guardado) {
			setPorcentaje(String(guardado.porcentaje));
			setMes(guardado.mes);
		}
	}, [guardado]);
	const edita = puedeEditarVinculo(rol);
	return /* @__PURE__ */ jsxs(Section, {
		titulo: "Avance físico declarado (Formato 12-B)",
		className: "mt-4",
		children: [
			/* @__PURE__ */ jsxs("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: ["El avance físico de la inversión lo registra la UF en el Banco de Inversiones (Formato 12-B). No hay servicio para leerlo: se anota aquí lo declarado, con el mes al que corresponde.", guardado && ` Último dato: ${numero(guardado.porcentaje, 1)} % a ${MESES[guardado.mes - 1]}.`]
			}),
			/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Avance físico acumulado (%)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "number",
					min: 0,
					max: 100,
					step: .1,
					value: porcentaje,
					readOnly: !edita,
					onChange: (e) => setPorcentaje(e.target.value),
					className: `${controlClase} max-w-40 text-right tabular-nums`
				})
			}), /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Al mes",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					value: mes,
					disabled: !edita,
					onChange: (e) => setMes(Number(e.target.value)),
					className: controlClase,
					children: MESES.map((m, i) => /* @__PURE__ */ jsx("option", {
						value: i + 1,
						children: m
					}, m))
				})
			})] }),
			edita && /* @__PURE__ */ jsxs(FormActions, { children: [exito && /* @__PURE__ */ jsx("span", {
				role: "status",
				className: "self-center text-sm text-success",
				children: "Avance anotado."
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				disabled: porcentaje === "",
				onClick: () => {
					guardarAvance12B(projectId, anio, {
						porcentaje: Math.min(100, Math.max(0, Number(porcentaje) || 0)),
						mes,
						fuente: "Formato 12-B · Banco de Inversiones"
					});
					setExito(true);
				},
				children: [/* @__PURE__ */ jsx(Save, {}), " Anotar avance"]
			})] })
		]
	});
}
/** PIM y brecha del proyecto para la bandeja de aprobación de Presupuesto. */
function MarcoSiaf({ proyecto, anio, metaFinanciera }) {
	const { ejecucion } = useEjecucionSiaf(proyecto, anio);
	const meses = ejecucion.map((e) => e.mes);
	const ultimo = meses.length ? Math.max(...meses) : 0;
	if (!ultimo) return /* @__PURE__ */ jsx("span", {
		className: "text-xs text-muted-foreground",
		children: "Sin ejecución SIAF cargada"
	});
	const pim = ejecucion.filter((e) => e.mes === ultimo).reduce((n, e) => n + e.pim, 0);
	const brecha = pim - metaFinanciera;
	return /* @__PURE__ */ jsxs("span", {
		className: "inline-flex flex-wrap items-center gap-1 tabular-nums",
		children: [moneda(pim), /* @__PURE__ */ jsx(StatusBadge, {
			tono: brecha >= 0 ? "success" : "destructive",
			children: brecha >= 0 ? "Cabe en el PIM" : `Excede ${moneda(-brecha)}`
		})]
	});
}
/** Movimientos del expediente SIAF cargado por exportación: lo que la UE registró para ese pago. */
function SituacionSiaf({ expediente, anio }) {
	const [movs, setMovs] = useState(null);
	useEffect(() => {
		let vivo = true;
		setMovs(null);
		movimientosDeExpediente(expediente, anio).then((m) => vivo && setMovs(m));
		return () => {
			vivo = false;
		};
	}, [expediente, anio]);
	const exp = expediente.trim();
	if (!exp) return null;
	if (movs === null) return null;
	if (!movs.length) return /* @__PURE__ */ jsxs(Aviso, {
		tipo: "aviso",
		children: [
			"El expediente SIAF ",
			exp,
			" no aparece en las exportaciones cargadas de ",
			anio,
			". Cargue la exportación del SIAF-SP en «Metas del proyecto › Ejecución SIAF» o revise el número."
		]
	});
	const porFase = (f) => movs.filter((m) => m.fase === f).reduce((n, m) => n + m.monto, 0);
	const girado = porFase("G");
	return /* @__PURE__ */ jsxs(Section, {
		titulo: `Expediente SIAF ${exp} · ${anio}`,
		className: "mb-4",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "mb-2 text-sm",
			children: [
				"Devengado ",
				moneda(porFase("D")),
				" · Girado ",
				moneda(girado),
				" ",
				/* @__PURE__ */ jsx(StatusBadge, {
					tono: girado > 0 ? "success" : "warning",
					children: girado > 0 ? "Girado" : "Sin girar"
				})
			]
		}), /* @__PURE__ */ jsx(Tabla, {
			filas: movs,
			claveFila: (m) => `${m.fase}-${m.secuencia}-${m.fecha}`,
			columnas: [
				{
					clave: "fase",
					titulo: "Fase",
					render: (m) => NOMBRE_FASE[m.fase] ?? m.fase
				},
				{
					clave: "fecha",
					titulo: "Fecha"
				},
				{
					clave: "documento",
					titulo: "Documento",
					render: (m) => `${m.tipoDocumento} ${m.documento}`.trim()
				},
				{
					clave: "beneficiario",
					titulo: "Beneficiario"
				},
				{
					clave: "monto",
					titulo: "Monto",
					alinear: "derecha",
					render: (m) => moneda(m.monto)
				},
				{
					clave: "estado",
					titulo: "Estado"
				}
			]
		})]
	});
}
/** El expediente SIAF del predio, tal como se anotó en «Pago o consignación». */
function SituacionSiafPredio({ codigo }) {
	const pago = useHistorial(`pago-consignacion-${codigo}`)[0]?.registro;
	const expediente = pago?.expedienteSiaf ?? "";
	const anio = Number(pago?.fechaPago?.slice(0, 4)) || (/* @__PURE__ */ new Date()).getFullYear();
	if (!expediente) return null;
	return /* @__PURE__ */ jsx(SituacionSiaf, {
		expediente,
		anio
	});
}
//#endregion
export { SituacionSiafPredio as i, MarcoSiaf as n, SituacionSiaf as r, ConciliacionSiaf as t };
