import { h as fechaHora, n as getProyecto, v as numero } from "./archivosIdb-BbjJAFd8.js";
import { d as predioRows, f as prediosGeojson } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.bim-DVqUAm3q.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { t as ProyectoResumen } from "./ProyectoResumen-P9Ur26E3.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Box, FileDown, History, Upload } from "lucide-react";
//#region src/lib/ifcExport.ts
var PALETTE = [
	"#16a34a",
	"#dc2626",
	"#2563eb",
	"#f59e0b",
	"#7c3aed",
	"#0891b2",
	"#9ca3af"
];
var IFC_GUID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$";
function guid() {
	let out = IFC_GUID_CHARS[Math.floor(Math.random() * 4)];
	for (let i = 1; i < 22; i++) out += IFC_GUID_CHARS[Math.floor(Math.random() * 64)];
	return out;
}
function str(value) {
	return `'${value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\x20-\x7e]/g, "").replace(/'/g, "''").replace(/\\/g, "/")}'`;
}
var num = (v) => {
	const s = v.toFixed(3);
	return s.includes(".") ? s : s + ".";
};
function firstRing(feature) {
	return ((feature.geometry?.coordinates)?.[0] ?? []).map(([lng, lat]) => [lng, lat]);
}
function signedArea(ring) {
	let a = 0;
	for (let i = 0; i < ring.length; i++) {
		const [x1, y1] = ring[i];
		const [x2, y2] = ring[(i + 1) % ring.length];
		a += x1 * y2 - x2 * y1;
	}
	return a / 2;
}
/** Proyecta los predios con geometría a metros locales (equirectangular). */
function buildLots(limit = Infinity) {
	const rings = prediosGeojson.features.map(firstRing);
	const all = rings.flat();
	if (!all.length) return [];
	const lng0 = all.reduce((s, p) => s + p[0], 0) / all.length;
	const lat0 = all.reduce((s, p) => s + p[1], 0) / all.length;
	const kx = Math.cos(lat0 * Math.PI / 180) * 111320;
	const ky = 110540;
	const lots = [];
	rings.forEach((ring, i) => {
		if (ring.length < 4 || lots.length >= limit) return;
		let pts = ring.map(([lng, lat]) => [(lng - lng0) * kx, (lat - lat0) * ky]);
		const [fx, fy] = pts[0];
		const [lx, ly] = pts[pts.length - 1];
		if (Math.abs(fx - lx) < 1e-6 && Math.abs(fy - ly) < 1e-6) pts = pts.slice(0, -1);
		if (pts.length < 3) return;
		if (signedArea(pts) < 0) pts.reverse();
		lots.push({
			row: predioRows[i],
			ring: pts,
			height: 2 + i % 4 * 1.5
		});
	});
	return lots;
}
function buildProjectIfc(projectName, lots) {
	const lines = [];
	let id = 0;
	const add = (entity) => {
		id += 1;
		lines.push(`#${id}=${entity};`);
		return `#${id}`;
	};
	const placement = add(`IFCAXIS2PLACEMENT3D(${add("IFCCARTESIANPOINT((0.,0.,0.))")},$,$)`);
	const units = add(`IFCUNITASSIGNMENT((${add("IFCSIUNIT(*,.LENGTHUNIT.,$,.METRE.)")},${add("IFCSIUNIT(*,.AREAUNIT.,$,.SQUARE_METRE.)")},${add("IFCSIUNIT(*,.VOLUMEUNIT.,$,.CUBIC_METRE.)")}))`);
	const context = add(`IFCGEOMETRICREPRESENTATIONCONTEXT($,'Model',3,1.E-05,${placement},$)`);
	const body = add(`IFCGEOMETRICREPRESENTATIONSUBCONTEXT('Body','Model',*,*,*,*,${context},$,.MODEL_VIEW.,$)`);
	const project = add(`IFCPROJECT('${guid()}',$,${str("Consolidado predial " + projectName)},${str("Plataforma Digital de Gestion de Predios - MTC")},$,$,$,(${context}),${units})`);
	const sitePlacement = add(`IFCLOCALPLACEMENT($,${placement})`);
	const site = add(`IFCSITE('${guid()}',$,${str("Area del proyecto " + projectName)},$,$,${sitePlacement},$,$,.ELEMENT.,$,$,$,$,$)`);
	add(`IFCRELAGGREGATES('${guid()}',$,$,$,${project},(${site}))`);
	const up = add("IFCDIRECTION((0.,0.,1.))");
	const styles = /* @__PURE__ */ new Map();
	const styleFor = (modalidad) => {
		const key = modalidad || "SIN INFORMACION";
		if (!styles.has(key)) {
			const hex = PALETTE[styles.size % PALETTE.length];
			const [r, g, b] = [
				1,
				3,
				5
			].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
			const colour = add(`IFCCOLOURRGB($,${num(r)},${num(g)},${num(b)})`);
			const rendering = add(`IFCSURFACESTYLERENDERING(${colour},0.,$,$,$,$,$,$,.NOTDEFINED.)`);
			styles.set(key, add(`IFCSURFACESTYLE(${str(key)},.BOTH.,(${rendering}))`));
		}
		return styles.get(key);
	};
	const elements = [];
	lots.forEach((lot) => {
		const { row, ring, height } = lot;
		const points = ring.map(([x, y]) => add(`IFCCARTESIANPOINT((${num(x)},${num(y)}))`));
		const polyline = add(`IFCPOLYLINE((${[...points, points[0]].join(",")}))`);
		const profile = add(`IFCARBITRARYCLOSEDPROFILEDEF(.AREA.,$,${polyline})`);
		const solid = add(`IFCEXTRUDEDAREASOLID(${profile},${placement},${up},${num(height)})`);
		add(`IFCSTYLEDITEM(${solid},(${styleFor(row.mod)}),$)`);
		const shape = add(`IFCSHAPEREPRESENTATION(${body},'Body','SweptSolid',(${solid}))`);
		const productShape = add(`IFCPRODUCTDEFINITIONSHAPE($,$,(${shape}))`);
		const lotPlacement = add(`IFCLOCALPLACEMENT(${sitePlacement},${placement})`);
		const element = add(`IFCBUILDINGELEMENTPROXY('${guid()}',$,${str(row.cod || row.codigo)},${str(row.suj)},${str("Predio")},${lotPlacement},${productShape},${str(row.codigo)},$)`);
		elements.push(element);
		const props = [
			["Codigo", row.cod || row.codigo],
			["SujetoPasivo", row.suj],
			["ModalidadAdquisicion", row.mod],
			["CondicionSujetoPasivo", row.cond],
			["CondicionPredio", row.condicionPredio],
			["TipoPredio", row.tipo],
			["AreaAfectadaM2", row.area],
			["Expediente", row.exp],
			["Resolucion", row.res],
			["PartidaRegistral", row.part]
		].filter(([, v]) => v).map(([k, v]) => add(`IFCPROPERTYSINGLEVALUE(${str(k)},$,IFCLABEL(${str(v)}),$)`));
		if (props.length) {
			const pset = add(`IFCPROPERTYSET('${guid()}',$,'PDGP_Predio',$,(${props.join(",")}))`);
			add(`IFCRELDEFINESBYPROPERTIES('${guid()}',$,$,$,(${element}),${pset})`);
		}
	});
	if (elements.length) add(`IFCRELCONTAINEDINSPATIALSTRUCTURE('${guid()}',$,$,$,(${elements.join(",")}),${site})`);
	const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19);
	return [
		"ISO-10303-21;",
		"HEADER;",
		"FILE_DESCRIPTION(('ViewDefinition [CoordinationView]'),'2;1');",
		`FILE_NAME(${str(`consolidado_${projectName}.ifc`)},'${stamp}',('PDGP'),('MTC'),'PDGP','PDGP','');`,
		"FILE_SCHEMA(('IFC4'));",
		"ENDSEC;",
		"DATA;",
		...lines,
		"ENDSEC;",
		"END-ISO-10303-21;",
		""
	].join("\n");
}
//#endregion
//#region src/routes/proyectos.$projectId.bim.tsx?tsr-split=component
function ClientBimViewer(props) {
	const [Comp, setComp] = useState(null);
	useEffect(() => {
		import("./BimViewer-Cyb9YQ0E.js").then((m) => setComp(() => m.default));
	}, []);
	if (!Comp) return /* @__PURE__ */ jsx("div", { className: "h-full w-full animate-pulse bg-muted" });
	return /* @__PURE__ */ jsx(Comp, { ...props });
}
var ETIQUETAS = {
	origen: "Origen",
	bytes: "Tamaño (bytes)",
	fecha: "Fecha del registro"
};
function BimPage() {
	const { projectId } = Route$1.useParams();
	const nombre = getProyecto(projectId)?.nombre ?? projectId;
	const lots = useMemo(() => buildLots(), []);
	const [ifcData, setIfcData] = useState(null);
	const [modelName, setModelName] = useState("");
	const rol = useRol();
	const [modelos, setModelos] = useState([]);
	const [selection, setSelection] = useState(null);
	const historial = useFormularioConHistorial(`bim-${projectId}`, modelos, setModelos, {
		modulo: 29,
		entidad: "modelo_bim"
	});
	const ifcFileName = `consolidado_${projectId}.ifc`;
	/** El modelo de ejemplo del arranque solo se muestra; Generar y Cargar además dejan una versión. */
	function registrar(modelo, accion) {
		const siguiente = [modelo, ...modelos.filter((m) => m.nombre !== modelo.nombre)];
		setModelos((prev) => [modelo, ...prev.filter((m) => m.nombre !== modelo.nombre)]);
		if (accion) historial.guardarVersion(accion, modelo.nombre, void 0, siguiente);
	}
	function generar(descargar, accion) {
		const text = buildProjectIfc(nombre, lots);
		const bytes = new TextEncoder().encode(text);
		setIfcData(bytes);
		setModelName(ifcFileName);
		setSelection(null);
		registrar({
			nombre: ifcFileName,
			origen: "Generado",
			bytes: bytes.length,
			fecha: fechaHora(/* @__PURE__ */ new Date())
		}, accion);
		if (descargar) {
			const url = URL.createObjectURL(new Blob([text], { type: "application/x-step" }));
			const a = document.createElement("a");
			a.href = url;
			a.download = ifcFileName;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		}
	}
	async function cargar(file) {
		if (!file) return;
		const bytes = new Uint8Array(await file.arrayBuffer());
		setIfcData(bytes);
		setModelName(file.name);
		setSelection(null);
		registrar({
			nombre: file.name,
			origen: "Cargado",
			bytes: bytes.length,
			fecha: fechaHora(/* @__PURE__ */ new Date())
		}, "Cargó un modelo IFC");
	}
	useEffect(() => {
		generar(false);
	}, [projectId]);
	const areaTotal = lots.reduce((s, l) => s + (Number(l.row.area.replace(/,/g, "")) || 0), 0);
	const modalidades = Array.from(new Set(lots.map((l) => l.row.mod || "SIN INFORMACION")));
	return /* @__PURE__ */ jsxs(AppShell, {
		lateral: /* @__PURE__ */ jsx(ProyectoResumen, { projectId }),
		children: [/* @__PURE__ */ jsx(ProyectoEncabezado, {
			projectId,
			titulo: "Modelo BIM",
			icono: Box,
			descripcion: `${lots.length} lotes · ${numero(areaTotal)} m² afectados · ${modalidades.length} modalidades · IFC4 generado desde la base gráfica de predios`,
			acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => generar(true, "Generó el IFC consolidado"),
				children: [/* @__PURE__ */ jsx(FileDown, {}), " Generar y descargar IFC"]
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ jsxs("label", {
					className: "cursor-pointer",
					children: [
						/* @__PURE__ */ jsx(Upload, {}),
						" Cargar IFC al sistema",
						/* @__PURE__ */ jsx("input", {
							type: "file",
							accept: ".ifc",
							className: "sr-only",
							onChange: (e) => cargar(e.target.files?.[0] ?? null)
						})
					]
				})
			})] })
		}), /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "visor",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "visor",
						children: "Visor"
					}), /* @__PURE__ */ jsxs(TabsTrigger, {
						value: "historico",
						children: [
							/* @__PURE__ */ jsx(History, {
								size: 16,
								className: "mr-1",
								"aria-hidden": true
							}),
							" Histórico (",
							historial.versiones.length,
							")"
						]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "visor",
					forceMount: true,
					className: "data-[state=inactive]:hidden",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative h-[calc(100vh-3.5rem-2rem-7rem)] min-h-[420px] overflow-hidden rounded-lg border border-border bg-card",
							children: [/* @__PURE__ */ jsx(ClientBimViewer, {
								ifcData,
								modelName,
								onSelect: setSelection
							}), /* @__PURE__ */ jsx("p", {
								className: "pointer-events-none absolute bottom-3 left-3 rounded-md border border-border bg-card/90 px-2 py-1 text-xs text-muted-foreground",
								children: "Visor ThatOpen · arrastre para orbitar, rueda para zoom, clic en un lote para ver sus datos"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4",
							children: [/* @__PURE__ */ jsx(Section, {
								titulo: "Lote seleccionado",
								children: selection ? /* @__PURE__ */ jsxs("dl", {
									className: "space-y-2 text-sm",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
										className: "text-xs text-muted-foreground",
										children: "Elemento"
									}), /* @__PURE__ */ jsx("dd", {
										className: "font-mono font-semibold",
										children: selection.name
									})] }), selection.properties.map(([k, v]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
										className: "text-xs text-muted-foreground",
										children: k
									}), /* @__PURE__ */ jsx("dd", {
										className: "break-words",
										children: v
									})] }, k))]
								}) : /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Haga clic sobre un lote en el visor."
								})
							}), /* @__PURE__ */ jsx(Section, {
								titulo: "Modelos en el sistema",
								children: modelos.length === 0 ? /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "Sin modelos cargados."
								}) : /* @__PURE__ */ jsx("ul", {
									className: "space-y-2 text-sm",
									children: modelos.map((m) => /* @__PURE__ */ jsxs("li", {
										className: `rounded-md border px-3 py-2 ${m.nombre === modelName ? "border-primary bg-primary-soft" : "border-border"}`,
										children: [/* @__PURE__ */ jsx("p", {
											className: "truncate font-mono font-semibold",
											title: m.nombre,
											children: m.nombre
										}), /* @__PURE__ */ jsxs("p", {
											className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
											children: [
												/* @__PURE__ */ jsx(StatusBadge, {
													tono: m.origen === "Generado" ? "primary" : "neutral",
													children: m.origen
												}),
												numero(m.bytes / 1024),
												" KB · ",
												m.fecha
											]
										})]
									}, m.nombre))
								})
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico de modelos BIM",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: `bim-${projectId}`,
							etiquetas: ETIQUETAS,
							nombreArchivo: `historico-bim-${projectId}`,
							puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
							onRestaurar: historial.restaurar
						})
					})
				})
			]
		})]
	});
}
//#endregion
export { BimPage as component };
