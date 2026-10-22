import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, h as fechaHora, v as numero } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { E as useCargasSiaf, M as MESES, S as puedeCargarSiaf, _ as leerArchivo, a as NOMBRE_FORMATO, d as csvEjemploDatosAbiertos, f as csvEjemploExportSiaf, h as guardarCarga, i as NOMBRE_FASE, p as estadoVinculo, x as parsearCsv } from "./siaf-ocJzaGES.js";
import { useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Download, FileUp, Upload, X } from "lucide-react";
//#region src/components/siaf/CargaSiaf.tsx
var TOPE_MB = 50;
/**
* Carga de la ejecución del SIAF por archivo: el CSV mensual de datos abiertos del MEF o la exportación
* del SIAF-SP de la UE. Se lee en el navegador, se filtra por el vínculo, se muestra qué entra y qué se
* descarta, y solo entonces se guarda. ponytail: con backend, la descarga del CSV es una tarea diaria.
*/
function CargaSiaf({ projectId, anio, vinculo }) {
	const rol = useRol();
	const quien = useUsuarioSesion()?.nombre ?? ROLES[rol];
	const carga = puedeCargarSiaf(rol);
	const cargas = useCargasSiaf().filter((c) => c.proyecto === projectId && c.anio === anio);
	const [pendiente, setPendiente] = useState(null);
	const [error, setError] = useState(null);
	const [exito, setExito] = useState(null);
	const [leyendo, setLeyendo] = useState(false);
	const input = useRef(null);
	const vinculado = estadoVinculo(vinculo) !== "SIN_VINCULO";
	const elegir = async (archivo) => {
		setError(null);
		setExito(null);
		setPendiente(null);
		if (!archivo) return;
		if (archivo.size > TOPE_MB * 1024 * 1024) {
			setError(`El archivo pesa más de ${TOPE_MB} MB. Filtre el CSV por pliego 036 antes de cargarlo.`);
			return;
		}
		setLeyendo(true);
		try {
			const texto = await archivo.text();
			const { cabecera, filas } = parsearCsv(texto);
			const r = leerArchivo(cabecera, filas, vinculo);
			if ("error" in r) setError(r.error);
			else setPendiente({
				archivo: archivo.name,
				texto,
				resultado: r
			});
		} catch {
			setError("No se pudo leer el archivo.");
		} finally {
			setLeyendo(false);
			if (input.current) input.current.value = "";
		}
	};
	const confirmar = async () => {
		if (!pendiente) return;
		const c = await guardarCarga(projectId, anio, pendiente.archivo, pendiente.texto, pendiente.resultado, quien);
		setPendiente(null);
		setExito(`Se cargaron ${numero(c.filasCargadas)} filas de ${NOMBRE_FORMATO[c.formato]} (${c.periodo}). La conciliación ya las usa.`);
	};
	const descargarEjemplo = (formato) => {
		const texto = formato === "datos-abiertos" ? csvEjemploDatosAbiertos(vinculo) : csvEjemploExportSiaf(vinculo);
		descargarBlob(`${formato === "datos-abiertos" ? `${anio}-Gasto-Mensual-ejemplo` : `siaf-sp-${anio}-exportacion-ejemplo`}-${projectId}.csv`, new Blob([texto], { type: "text/csv;charset=utf-8" }), false);
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			onCerrar: () => setError(null),
			children: error
		}),
		exito && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setExito(null),
			children: exito
		}),
		!vinculado && /* @__PURE__ */ jsx(Aviso, {
			tipo: "aviso",
			children: "Complete primero el vínculo SIAF del proyecto (CUI y metas): el archivo se filtra con él."
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: `Cargar ejecución del SIAF · ${anio}`,
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: [
						"Acepta el CSV mensual de datos abiertos del MEF (Consulta Amigable, columnas SEC_FUNC y MONTO_PIM) y la exportación por expediente del SIAF-SP (columnas EXPEDIENTE, FASE y MONTO). Solo se guardan las filas del pliego 036, UE ",
						vinculo.unidadEjecutora,
						", con el CUI o las metas del vínculo y las específicas elegidas."
					]
				}),
				carga ? /* @__PURE__ */ jsx(FormGrid, {
					columnas: 1,
					children: /* @__PURE__ */ jsx(FormField, {
						etiqueta: "Archivo CSV",
						ayuda: `Hasta ${TOPE_MB} MB. Una carga del mismo periodo reemplaza a la anterior sin duplicar.`,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							ref: input,
							type: "file",
							accept: ".csv,text/csv",
							disabled: !vinculado || leyendo,
							onChange: (e) => elegir(e.target.files?.[0]),
							className: `${controlClase} py-1.5 file:mr-3 file:rounded-sm file:border-0 file:bg-primary-soft file:px-2 file:py-0.5 file:text-sm file:font-medium file:text-primary-dark`
						})
					})
				}) : /* @__PURE__ */ jsxs("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"El perfil ",
						ROLES[rol],
						" consulta las cargas; las hace el Coordinador o Presupuesto."
					]
				}),
				pendiente && /* @__PURE__ */ jsx(VistaPrevia, {
					p: pendiente,
					onCargar: confirmar,
					onDescartar: () => setPendiente(null)
				}),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Archivos de ejemplo" }),
				/* @__PURE__ */ jsx("p", {
					className: "mb-2 text-xs text-muted-foreground",
					children: "Con las columnas reales y los códigos del vínculo de este proyecto, para probar la carga antes de tener el archivo oficial."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ jsxs(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => descargarEjemplo("datos-abiertos"),
						children: [/* @__PURE__ */ jsx(Download, {}), " Datos abiertos (gasto mensual)"]
					}), /* @__PURE__ */ jsxs(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => descargarEjemplo("export-siaf"),
						children: [/* @__PURE__ */ jsx(Download, {}), " Exportación SIAF-SP (expedientes)"]
					})]
				})
			]
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: `Cargas realizadas (${cargas.length})`,
			className: "mt-4",
			children: /* @__PURE__ */ jsx(TablaCargas, { cargas })
		})
	] });
}
function VistaPrevia({ p, onCargar, onDescartar }) {
	const r = p.resultado;
	const cargables = r.formato === "datos-abiertos" ? r.ejecucion.length : r.movimientos.length;
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-3 rounded-md border border-border bg-background p-3",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex flex-wrap items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ jsx(FileUp, {
						size: 16,
						className: "text-primary-dark",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: p.archivo
					}),
					/* @__PURE__ */ jsx(StatusBadge, {
						tono: "primary",
						children: NOMBRE_FORMATO[r.formato]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: r.periodo
					})
				]
			}),
			/* @__PURE__ */ jsxs("dl", {
				className: "mb-3 grid grid-cols-3 gap-2 text-sm",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-xs text-muted-foreground",
						children: "Filas leídas"
					}), /* @__PURE__ */ jsx("dd", {
						className: "tabular-nums",
						children: numero(r.filasLeidas)
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-xs text-muted-foreground",
						children: "Del vínculo"
					}), /* @__PURE__ */ jsx("dd", {
						className: "tabular-nums",
						children: numero(cargables)
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "text-xs text-muted-foreground",
						children: "Descartadas"
					}), /* @__PURE__ */ jsx("dd", {
						className: "tabular-nums",
						children: numero(r.descartadas)
					})] })
				]
			}),
			r.observaciones.length > 0 && /* @__PURE__ */ jsx("ul", {
				className: "mb-3 list-disc rounded-md bg-warning-soft px-3 py-2 pl-7 text-xs text-warning",
				children: r.observaciones.map((o) => /* @__PURE__ */ jsx("li", { children: o }, o))
			}),
			r.formato === "datos-abiertos" ? /* @__PURE__ */ jsx(Tabla, {
				filas: r.ejecucion.slice(0, 8),
				claveFila: (_, i) => i,
				columnas: [
					{
						clave: "mes",
						titulo: "Mes",
						render: (e) => MESES[e.mes - 1] ?? e.mes
					},
					{
						clave: "meta",
						titulo: "Meta",
						render: (e) => /* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs",
							children: e.meta
						})
					},
					{
						clave: "especificaDet",
						titulo: "Específica",
						render: (e) => /* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs",
							children: e.especificaDet
						})
					},
					{
						clave: "pim",
						titulo: "PIM",
						alinear: "derecha",
						render: (e) => moneda(e.pim)
					},
					{
						clave: "devengado",
						titulo: "Devengado",
						alinear: "derecha",
						render: (e) => moneda(e.devengado)
					},
					{
						clave: "girado",
						titulo: "Girado",
						alinear: "derecha",
						render: (e) => moneda(e.girado)
					}
				]
			}) : /* @__PURE__ */ jsx(Tabla, {
				filas: r.movimientos.slice(0, 8),
				claveFila: (_, i) => i,
				columnas: [
					{
						clave: "expediente",
						titulo: "Expediente",
						render: (m) => /* @__PURE__ */ jsx("span", {
							className: "font-mono text-xs",
							children: m.expediente
						})
					},
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
					}
				]
			}),
			cargables > 8 && /* @__PURE__ */ jsxs("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					"Se muestran 8 de ",
					numero(cargables),
					" filas."
				]
			}),
			/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: onDescartar,
				children: [/* @__PURE__ */ jsx(X, {}), " Descartar"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				disabled: cargables === 0,
				onClick: onCargar,
				children: [/* @__PURE__ */ jsx(Upload, {}), " Cargar al sistema"]
			})] })
		]
	});
}
/** Lista de cargas (de un proyecto o de todos, en Gestión presupuestal). */
function TablaCargas({ cargas, conProyecto, nombreDe }) {
	return /* @__PURE__ */ jsx(Tabla, {
		filas: cargas,
		claveFila: (c) => c.id,
		vacio: "Aún no se cargó ejecución del SIAF.",
		columnas: [
			{
				clave: "fecha",
				titulo: "Fecha",
				render: (c) => fechaHora(c.fecha)
			},
			...conProyecto ? [{
				clave: "proyecto",
				titulo: "Proyecto",
				render: (c) => `${nombreDe?.(c.proyecto) ?? c.proyecto} · ${c.anio}`
			}] : [],
			{
				clave: "archivo",
				titulo: "Archivo"
			},
			{
				clave: "formato",
				titulo: "Formato",
				render: (c) => NOMBRE_FORMATO[c.formato]
			},
			{
				clave: "periodo",
				titulo: "Periodo"
			},
			{
				clave: "filasCargadas",
				titulo: "Filas",
				alinear: "derecha",
				render: (c) => numero(c.filasCargadas)
			},
			{
				clave: "descartadas",
				titulo: "Descartadas",
				alinear: "derecha",
				render: (c) => numero(c.descartadas)
			},
			{
				clave: "observaciones",
				titulo: "Observaciones",
				render: (c) => c.observaciones.length ? /* @__PURE__ */ jsx("span", {
					title: c.observaciones.join("\n"),
					className: "text-warning",
					children: c.observaciones.length
				}) : /* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: "Ninguna"
				})
			},
			{
				clave: "usuario",
				titulo: "Cargó"
			}
		]
	});
}
//#endregion
export { TablaCargas as n, CargaSiaf as t };
