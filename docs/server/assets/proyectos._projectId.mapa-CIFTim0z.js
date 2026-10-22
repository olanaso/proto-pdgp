import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { E as ETAPA_CORTA, T as ETAPA_COLOR, a as prediosDelProyecto, r as padronDemostrativo, w as ETAPAS_DE_AVANCE } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { d as DropdownMenuTrigger, i as DropdownMenuLabel, n as DropdownMenuContent, r as DropdownMenuItem, s as DropdownMenuSeparator, t as DropdownMenu } from "./dropdown-menu-D811JBGD.js";
import { a as NOMBRE_CLASE, l as claseDe, n as CAPAS_SISTEMA, w as useCapas, y as leerEstilosSistema } from "./capas-B7cJ7zRJ.js";
import { a as extensionDe, i as epsgUtm, n as armarPaquete } from "./gisPaquete-070Jklxg.js";
import { l as proyectoGis, m as urlOgc, v as usuarioWeb } from "./gisProyecto-CAMCHdpa.js";
import { n as etiquetaProyecto, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { n as DatosDemostracion, t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Route$1 } from "./proyectos._projectId.mapa-DVr24YqD.js";
import { t as ProyectoEncabezado } from "./ProyectoEncabezado-Y-ElsIKq.js";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronRight, Download, Eye, EyeOff, FileText, FolderArchive, Layers, ListChecks, Map as Map$1, MoreVertical, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, PenTool, Sheet, ZoomIn } from "lucide-react";
import proj4 from "proj4";
//#region src/components/LayersPanel.tsx
var EXPORT_FORMATS = [
	"GeoJSON",
	"KML",
	"Shapefile (zipped)",
	"CSV (attributes only)"
];
function downloadLayer(name, format) {
	const ext = format.toLowerCase().includes("csv") ? "csv" : format.toLowerCase().includes("shape") ? "zip" : format.toLowerCase().includes("kml") ? "kml" : "geojson";
	const filename = `${name.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}.${ext}`;
	let blob;
	if (ext === "geojson") blob = new Blob([JSON.stringify({
		type: "FeatureCollection",
		name,
		features: []
	}, null, 2)], { type: "application/geo+json" });
	else if (ext === "csv") blob = new Blob([`id,name\n1,${name}\n`], { type: "text/csv" });
	else blob = new Blob([`# ${format} export of ${name} (mock)\n`], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
function ActionsMenu({ name, visible, onToggleVisible, opacity, onOpacityChange, scope = "capa", originalFile }) {
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground",
			title: "Acciones",
			"aria-label": `Acciones de ${name}`,
			onClick: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ jsx(MoreVertical, {
				size: 16,
				"aria-hidden": true
			})
		})
	}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
		align: "end",
		className: "min-w-[220px] z-[9999]",
		children: [
			/* @__PURE__ */ jsxs(DropdownMenuLabel, {
				className: "truncate",
				children: [
					scope === "grupo" ? "Grupo" : "Capa",
					": ",
					name
				]
			}),
			/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			onToggleVisible && /* @__PURE__ */ jsxs(DropdownMenuItem, {
				className: "cursor-pointer",
				onClick: onToggleVisible,
				children: [visible ? /* @__PURE__ */ jsx(EyeOff, {
					size: 16,
					className: "mr-2",
					"aria-hidden": true
				}) : /* @__PURE__ */ jsx(Eye, {
					size: 16,
					className: "mr-2",
					"aria-hidden": true
				}), visible ? "Ocultar capa" : "Mostrar capa"]
			}),
			scope === "capa" && /* @__PURE__ */ jsxs(DropdownMenuItem, {
				className: "cursor-pointer",
				children: [/* @__PURE__ */ jsx(ZoomIn, {
					size: 16,
					className: "mr-2",
					"aria-hidden": true
				}), " Zoom a la capa"]
			}),
			onOpacityChange && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(DropdownMenuSeparator, {}), /* @__PURE__ */ jsxs("div", {
				className: "px-2 py-1.5",
				onClick: (e) => e.stopPropagation(),
				onKeyDown: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs("label", {
					className: "mb-1 flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", { children: "Opacidad" }), /* @__PURE__ */ jsx("span", {
						className: "tabular-nums",
						children: (opacity ?? 1).toFixed(2)
					})]
				}), /* @__PURE__ */ jsx("input", {
					type: "range",
					min: 0,
					max: 1,
					step: .05,
					value: opacity ?? 1,
					onChange: (e) => onOpacityChange(parseFloat(e.target.value)),
					"aria-label": "Opacidad",
					className: "h-1 w-full accent-primary"
				})]
			})] }),
			/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			/* @__PURE__ */ jsx(DropdownMenuLabel, {
				className: "text-xs font-normal text-muted-foreground",
				children: "Exportar como"
			}),
			/* @__PURE__ */ jsxs(DropdownMenuItem, {
				className: "cursor-pointer",
				title: originalFile ?? "La capa viene de otra fuente y no fue subida",
				onClick: () => {
					if (originalFile) downloadLayer(originalFile.replace(/\.[^.]+$/, ""), "Original");
					else alert("La capa viene de otra fuente y no fue subida.");
				},
				children: [/* @__PURE__ */ jsx(Download, {
					size: 16,
					className: "mr-2",
					"aria-hidden": true
				}), /* @__PURE__ */ jsxs("span", {
					className: "flex-1 truncate",
					children: ["Original", originalFile ? ` (${originalFile})` : " (no disponible)"]
				})]
			}),
			EXPORT_FORMATS.map((f) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
				className: "cursor-pointer",
				onClick: () => downloadLayer(name, f),
				children: [
					/* @__PURE__ */ jsx(Download, {
						size: 16,
						className: "mr-2",
						"aria-hidden": true
					}),
					" ",
					f
				]
			}, f))
		]
	})] });
}
function LayerRow({ item, visible, onToggleVisible }) {
	const [opacity, setOpacity] = useState(1);
	return /* @__PURE__ */ jsx("div", {
		className: "mb-1 rounded-md border border-border bg-card",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 px-2 py-1",
			children: [
				/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: visible,
					onChange: onToggleVisible,
					"aria-label": `Mostrar ${item.name}`,
					className: "accent-primary"
				}),
				/* @__PURE__ */ jsx("span", {
					className: "flex-1 truncate text-sm text-foreground",
					title: item.name,
					children: item.name
				}),
				/* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold text-muted-foreground",
					children: "Vector"
				}),
				/* @__PURE__ */ jsx(ActionsMenu, {
					name: item.name,
					visible,
					onToggleVisible,
					opacity,
					onOpacityChange: setOpacity
				})
			]
		})
	});
}
function LayersPanel({ layerGroups, openGroups, setOpenGroups, layerVisibility, setLayerVisibility, className = "" }) {
	const [groupOpacity, setGroupOpacity] = useState(Object.fromEntries(layerGroups.map((g) => [g.name, 1])));
	const [collapsed, setCollapsed] = useState(false);
	const groupVisible = (group) => group.items.every((item) => layerVisibility[item.id] !== false);
	const toggleGroup = (group) => {
		const nextVisible = !groupVisible(group);
		setLayerVisibility((state) => ({
			...state,
			...Object.fromEntries(group.items.map((item) => [item.id, nextVisible]))
		}));
	};
	if (collapsed) return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: () => setCollapsed(false),
		title: "Mostrar capas",
		"aria-label": "Mostrar capas",
		className: `absolute left-3 top-3 z-[500] flex size-9 items-center justify-center rounded-md border border-border bg-card hover:bg-muted ${className}`,
		children: /* @__PURE__ */ jsx(PanelLeftOpen, {
			size: 16,
			className: "text-primary",
			"aria-hidden": true
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: `absolute left-0 top-0 z-[500] flex h-full w-[320px] flex-col border-r border-border bg-card ${className}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex shrink-0 items-center justify-between border-b border-border px-3 py-2",
			children: [/* @__PURE__ */ jsxs("h2", {
				className: "flex items-center gap-1.5 text-sm font-semibold",
				children: [/* @__PURE__ */ jsx(Layers, {
					size: 16,
					"aria-hidden": true
				}), " Capas"]
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setCollapsed(true),
				title: "Ocultar panel",
				"aria-label": "Ocultar panel de capas",
				className: "flex size-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted",
				children: /* @__PURE__ */ jsx(PanelLeftClose, {
					size: 16,
					"aria-hidden": true
				})
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1 overflow-y-auto px-2 py-2",
			children: layerGroups.map((g) => /* @__PURE__ */ jsxs("div", {
				className: "mb-2 text-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 rounded-sm px-1 py-1 hover:bg-muted",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setOpenGroups((s) => ({
								...s,
								[g.name]: !s[g.name]
							})),
							className: "flex items-center",
							title: openGroups[g.name] ? "Colapsar" : "Expandir",
							"aria-label": `${openGroups[g.name] ? "Colapsar" : "Expandir"} ${g.name}`,
							"aria-expanded": Boolean(openGroups[g.name]),
							children: /* @__PURE__ */ jsx(ChevronRight, {
								size: 14,
								className: openGroups[g.name] ? "rotate-90 transition" : "transition",
								"aria-hidden": true
							})
						}),
						/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: groupVisible(g),
							onChange: () => toggleGroup(g),
							"aria-label": `Mostrar grupo ${g.name}`,
							className: "accent-primary"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "flex-1 truncate text-left font-semibold text-foreground",
							children: g.name
						}),
						/* @__PURE__ */ jsx(ActionsMenu, {
							name: g.name,
							scope: "grupo",
							visible: groupVisible(g),
							onToggleVisible: () => toggleGroup(g),
							opacity: groupOpacity[g.name] ?? 1,
							onOpacityChange: (v) => setGroupOpacity((s) => ({
								...s,
								[g.name]: v
							}))
						})
					]
				}), openGroups[g.name] && /* @__PURE__ */ jsx("div", {
					className: "pl-5 pr-1 pt-1",
					children: g.items.map((item) => /* @__PURE__ */ jsx(LayerRow, {
						item,
						visible: layerVisibility[item.id] !== false,
						onToggleVisible: () => setLayerVisibility((state) => ({
							...state,
							[item.id]: !(state[item.id] !== false)
						}))
					}, item.id))
				})]
			}, g.name))
		})]
	});
}
//#endregion
//#region src/components/MapLegend.tsx
/** Leyenda flotante del mapa. Los colores de cada ítem son la simbología de las capas, no tokens de interfaz. */
function MapLegend({ items }) {
	const [open, setOpen] = useState(true);
	if (!open) return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: () => setOpen(true),
		title: "Mostrar leyenda",
		"aria-label": "Mostrar leyenda",
		className: "absolute bottom-4 right-4 z-[500] flex size-9 items-center justify-center rounded-md border border-border bg-card hover:bg-muted",
		children: /* @__PURE__ */ jsx(PanelRightOpen, {
			size: 16,
			className: "text-primary",
			"aria-hidden": true
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "absolute bottom-4 right-4 z-[500] w-60 rounded-md border border-border bg-card/95 px-3 py-2 text-xs",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-1 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsx("p", {
				className: "font-semibold",
				children: "Leyenda"
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setOpen(false),
				title: "Ocultar leyenda",
				"aria-label": "Ocultar leyenda",
				className: "flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted",
				children: /* @__PURE__ */ jsx(PanelRightClose, {
					size: 14,
					"aria-hidden": true
				})
			})]
		}), /* @__PURE__ */ jsx("ul", {
			className: "space-y-1",
			children: items.map((l, i) => /* @__PURE__ */ jsxs(Fragment, { children: [l.grupo && l.grupo !== items[i - 1]?.grupo && /* @__PURE__ */ jsx("li", {
				className: "pt-1 font-semibold text-muted-foreground first:pt-0",
				children: l.grupo
			}), /* @__PURE__ */ jsxs("li", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "size-3 shrink-0 rounded-sm border border-foreground/20",
						style: { background: l.color },
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "min-w-0 flex-1 truncate text-foreground",
						children: l.label
					}),
					l.cantidad !== void 0 && /* @__PURE__ */ jsx("b", {
						className: "tabular-nums text-foreground",
						children: l.cantidad
					})
				]
			})] }, l.label))
		})]
	});
}
//#endregion
//#region src/components/MapStatusBar.tsx
function utmFromLatLng(lat, lng) {
	const zone = Math.floor((lng + 180) / 6) + 1;
	const band = "CDEFGHJKLMNPQRSTUVWX"[Math.floor((lat + 80) / 8)] ?? "L";
	const centralMeridian = (zone - 1) * 6 - 180 + 3;
	const mPerDeg = 111320;
	return {
		zone,
		band,
		easting: 5e5 + (lng - centralMeridian) * mPerDeg * Math.cos(lat * Math.PI / 180),
		northing: lat < 0 ? 1e7 + lat * mPerDeg : lat * mPerDeg
	};
}
function fmt(n, d = 2) {
	return n.toLocaleString("en-US", {
		minimumFractionDigits: d,
		maximumFractionDigits: d
	});
}
function MapStatusBar({ centerLat = -3.9089, centerLng = -70.5152, initialScale = 347130, posicion }) {
	const ref = useRef(null);
	const [pos, setPos] = useState({
		lat: centerLat,
		lng: centerLng
	});
	const span = initialScale * .5 / 111320;
	useEffect(() => {
		const parent = ref.current?.parentElement;
		if (!parent) return;
		const onMove = (e) => {
			const rect = parent.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			if (x < 0 || x > 1 || y < 0 || y > 1) return;
			setPos({
				lng: centerLng + (x - .5) * span,
				lat: centerLat - (y - .5) * span
			});
		};
		parent.addEventListener("mousemove", onMove);
		return () => parent.removeEventListener("mousemove", onMove);
	}, [
		centerLat,
		centerLng,
		span
	]);
	const actual = posicion ?? pos;
	const utm = utmFromLatLng(actual.lat, actual.lng);
	const cell = "flex items-center gap-1 whitespace-nowrap border-l border-border px-3 py-1";
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: "absolute bottom-0 left-1/2 z-[600] flex -translate-x-1/2 items-center overflow-hidden rounded-t-md border border-border bg-card text-xs text-foreground",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: `${cell} bg-primary-dark font-semibold text-primary-foreground`,
				children: "DATUM WGS84"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cell,
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: "GCS Longitud:"
				}), /* @__PURE__ */ jsx("span", {
					className: "tabular-nums",
					children: fmt(actual.lng, 5)
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cell,
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: "Latitud:"
				}), /* @__PURE__ */ jsx("span", {
					className: "tabular-nums",
					children: fmt(actual.lat, 5)
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cell,
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: "UTM Zona:"
				}), /* @__PURE__ */ jsxs("span", {
					className: "tabular-nums",
					children: [
						utm.zone,
						" ",
						utm.band
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cell,
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: "Este:"
				}), /* @__PURE__ */ jsxs("span", {
					className: "tabular-nums",
					children: [fmt(utm.easting), " m"]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cell,
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: "Norte:"
				}), /* @__PURE__ */ jsxs("span", {
					className: "tabular-nums",
					children: [fmt(utm.northing), " m"]
				})]
			})
		]
	});
}
//#endregion
//#region src/lib/planoClave.ts
/** Anillos y líneas de una geometría ya proyectada; los puntos van aparte. */
function trazosDe(g, p) {
	const trazos = [];
	const puntos = [];
	const ir = (h) => {
		if (!h) return;
		switch (h.type) {
			case "Point":
				puntos.push(p(h.coordinates));
				break;
			case "MultiPoint":
				h.coordinates.forEach((c) => puntos.push(p(c)));
				break;
			case "LineString":
				trazos.push({
					puntos: h.coordinates.map(p),
					cerrado: false
				});
				break;
			case "MultiLineString":
				h.coordinates.forEach((l) => trazos.push({
					puntos: l.map(p),
					cerrado: false
				}));
				break;
			case "Polygon":
				h.coordinates.forEach((a) => trazos.push({
					puntos: a.map(p),
					cerrado: true
				}));
				break;
			case "MultiPolygon":
				h.coordinates.forEach((pg) => pg.forEach((a) => trazos.push({
					puntos: a.map(p),
					cerrado: true
				})));
				break;
			case "GeometryCollection": h.geometries.forEach(ir);
		}
	};
	ir(g);
	return {
		trazos,
		puntos
	};
}
/** Color de una entidad: el de su categoría (predios por etapa) o el de la colección. */
function colorDe(c, f, borde = false) {
	const cat = c.estilo.categorias;
	if (cat) {
		const v = String(f.properties?.[cat.campo] ?? "");
		const hallado = cat.valores.find((x) => x.valor === v);
		if (hallado) return hallado.color;
	}
	return borde ? c.estilo.borde : c.estilo.relleno;
}
var hexRgb = (hex) => {
	const h = hex.replace("#", "").padEnd(6, "0");
	return [
		parseInt(h.slice(0, 2), 16),
		parseInt(h.slice(2, 4), 16),
		parseInt(h.slice(4, 6), 16)
	];
};
var PRINCIPALES = /* @__PURE__ */ new Set([
	"delimitacion",
	"concesion",
	"predios",
	"predios-sin-poligono"
]);
async function proyectar(projectId) {
	const p = await proyectoGis(projectId, usuarioWeb());
	const principales = p.colecciones.filter((c) => PRINCIPALES.has(c.id) && c.datos.features.length);
	const e = extensionDe(principales.length ? principales : p.colecciones);
	if (!e) throw new Error("El proyecto no tiene geometrías que dibujar.");
	const epsg = epsgUtm((e[0] + e[2]) / 2, (e[1] + e[3]) / 2);
	const zona = `${epsg % 100}${epsg >= 32700 ? "S" : "N"}`;
	const conv = proj4("EPSG:4326", `+proj=utm +zone=${epsg % 100}${epsg >= 32700 ? " +south" : ""} +datum=WGS84 +units=m +no_defs`);
	const aXY = (c) => conv.forward([c[0], c[1]]);
	const [x0, y0] = aXY([e[0], e[1]]);
	const [x1, y1] = aXY([e[2], e[3]]);
	return {
		p,
		titulo: etiquetaProyecto(getProyecto(projectId), projectId),
		epsg,
		zona,
		ext: [
			x0,
			y0,
			x1,
			y1
		],
		aXY
	};
}
/** Índice de color AutoCAD (ACI) más cercano al hex: paleta corta, suficiente para distinguir capas. */
var ACI = [
	[1, [
		255,
		0,
		0
	]],
	[2, [
		255,
		255,
		0
	]],
	[3, [
		0,
		255,
		0
	]],
	[4, [
		0,
		255,
		255
	]],
	[5, [
		0,
		0,
		255
	]],
	[6, [
		255,
		0,
		255
	]],
	[7, [
		0,
		0,
		0
	]],
	[8, [
		128,
		128,
		128
	]],
	[9, [
		192,
		192,
		192
	]],
	[11, [
		255,
		127,
		127
	]],
	[30, [
		255,
		127,
		0
	]],
	[40, [
		255,
		191,
		0
	]],
	[50, [
		191,
		255,
		0
	]],
	[94, [
		0,
		191,
		127
	]],
	[150, [
		0,
		63,
		255
	]],
	[170, [
		63,
		0,
		255
	]],
	[200, [
		191,
		0,
		255
	]],
	[210, [
		255,
		0,
		191
	]],
	[12, [
		165,
		0,
		0
	]],
	[14, [
		76,
		0,
		0
	]]
];
function aci(hex) {
	const [r, g, b] = hexRgb(hex);
	let mejor = 7;
	let d = Infinity;
	for (const [i, [r2, g2, b2]] of ACI) {
		const dd = (r - r2) ** 2 + (g - g2) ** 2 + (b - b2) ** 2;
		if (dd < d) {
			d = dd;
			mejor = i;
		}
	}
	return mejor;
}
var LTIPO = {
	CONTINUA: "CONTINUOUS",
	DISCONTINUA: "DASHED",
	PUNTEADA: "DOT"
};
var nombreCapa = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 31) || "CAPA";
var n = (v) => v.toFixed(3);
/**
* DXF R12 (AC1009): el formato que cualquier AutoCAD, BricsCAD, QGIS o Civil 3D abre sin reparos.
* Una capa por colección (los predios, una por etapa) con color y tipo de línea; POLYLINE para
* polígonos y líneas, POINT para puntos, TEXT con el código del predio.
*/
function dxfPlanoClave(pr) {
	const capas = /* @__PURE__ */ new Map();
	const ent = [];
	const capaDe = (nombre, color, ltipo) => {
		const k = nombreCapa(nombre);
		if (!capas.has(k)) capas.set(k, {
			color: aci(color),
			ltipo
		});
		return k;
	};
	for (const c of pr.p.colecciones) {
		const base = nombreCapa(c.titulo);
		const ltipo = LTIPO[c.estilo.tipoLinea] ?? "CONTINUOUS";
		const etiqueta = c.estilo.etiqueta;
		for (const f of c.datos.features) {
			const cat = c.estilo.categorias;
			const v = cat ? cat.valores.find((x) => x.valor === String(f.properties?.[cat.campo] ?? "")) : null;
			const capa = v ? capaDe(`${base}_${v.etiqueta}`, v.color, ltipo) : capaDe(base, c.estilo.borde || c.estilo.relleno, ltipo);
			const { trazos, puntos } = trazosDe(f.geometry, pr.aXY);
			for (const t of trazos) {
				ent.push(`0\nPOLYLINE\n8\n${capa}\n66\n1\n70\n${t.cerrado ? 1 : 0}\n10\n0\n20\n0\n30\n0`);
				for (const [x, y] of t.puntos) ent.push(`0\nVERTEX\n8\n${capa}\n10\n${n(x)}\n20\n${n(y)}\n30\n0`);
				ent.push(`0\nSEQEND\n8\n${capa}`);
			}
			for (const [x, y] of puntos) ent.push(`0\nPOINT\n8\n${capa}\n10\n${n(x)}\n20\n${n(y)}\n30\n0`);
			const texto = etiqueta ? String(f.properties?.[etiqueta] ?? "") : "";
			if (texto && (trazos.length || puntos.length)) {
				const todos = trazos.length ? trazos.flatMap((t) => t.puntos) : puntos;
				const cx = todos.reduce((s, q) => s + q[0], 0) / todos.length;
				const cy = todos.reduce((s, q) => s + q[1], 0) / todos.length;
				const ct = capaDe(`${base}_TEXTO`, "#000000", "CONTINUOUS");
				ent.push(`0\nTEXT\n8\n${ct}\n10\n${n(cx)}\n20\n${n(cy)}\n30\n0\n40\n2.5\n1\n${texto.replace(/[\r\n]/g, " ")}\n72\n1\n73\n2\n11\n${n(cx)}\n21\n${n(cy)}\n31\n0`);
			}
		}
	}
	const [x0, y0, x1, y1] = pr.ext;
	const ltype = (nombre, desc, tramos) => `0\nLTYPE\n2\n${nombre}\n70\n64\n3\n${desc}\n72\n65\n73\n${tramos.length}\n40\n${n(tramos.reduce((s, t) => s + Math.abs(t), 0))}${tramos.map((t) => `\n49\n${n(t)}`).join("")}`;
	return [
		"0\nSECTION\n2\nHEADER",
		"9\n$ACADVER\n1\nAC1009",
		"9\n$INSUNITS\n70\n6",
		`9\n$EXTMIN\n10\n${n(x0)}\n20\n${n(y0)}\n30\n0`,
		`9\n$EXTMAX\n10\n${n(x1)}\n20\n${n(y1)}\n30\n0`,
		"0\nENDSEC",
		"0\nSECTION\n2\nTABLES",
		"0\nTABLE\n2\nLTYPE\n70\n3",
		ltype("CONTINUOUS", "Solid line", []),
		ltype("DASHED", "Dashed __ __ __", [12.7, -6.35]),
		ltype("DOT", "Dot . . . .", [0, -6.35]),
		"0\nENDTAB",
		`0\nTABLE\n2\nLAYER\n70\n${capas.size + 1}`,
		"0\nLAYER\n2\n0\n70\n0\n62\n7\n6\nCONTINUOUS",
		...[...capas].map(([k, c]) => `0\nLAYER\n2\n${k}\n70\n0\n62\n${c.color}\n6\n${c.ltipo}`),
		"0\nENDTAB",
		"0\nTABLE\n2\nSTYLE\n70\n1",
		"0\nSTYLE\n2\nSTANDARD\n70\n0\n40\n0\n41\n1\n50\n0\n71\n0\n42\n2.5\n3\ntxt\n4\n",
		"0\nENDTAB",
		"0\nENDSEC",
		"0\nSECTION\n2\nENTITIES",
		...ent,
		"0\nENDSEC",
		"0\nEOF",
		""
	].join("\n");
}
var ESCALAS = [
	250,
	500,
	1e3,
	1500,
	2e3,
	2500,
	5e3,
	7500,
	1e4,
	15e3,
	2e4,
	25e3,
	5e4,
	1e5,
	25e4
];
var ROJO = [
	200,
	16,
	46
];
/** Plano clave en A3 horizontal: dibujo con grilla UTM, norte y barra de escala; membrete y leyenda. */
async function pdfPlanoClave(pr) {
	const { jsPDF } = await import("jspdf");
	const doc = new jsPDF({
		orientation: "landscape",
		unit: "mm",
		format: "a3"
	});
	const W = doc.internal.pageSize.getWidth();
	const H = doc.internal.pageSize.getHeight();
	const M = 10;
	const MEMBRETE = 88;
	const dx0 = M;
	const dy0 = M;
	const dw = W - 2 * M - MEMBRETE - 4;
	const dh = H - 2 * M;
	const [x0, y0, x1, y1] = pr.ext;
	const ancho = (x1 - x0) * 1.12 || 100;
	const alto = (y1 - y0) * 1.12 || 100;
	const necesaria = Math.max(ancho / dw, alto / dh) * 1e3;
	const escala = ESCALAS.find((s) => s >= necesaria) ?? Math.ceil(necesaria / 1e3) * 1e3;
	const mmPorM = 1e3 / escala;
	const cx = (x0 + x1) / 2;
	const cy = (y0 + y1) / 2;
	const px = (x) => dx0 + dw / 2 + (x - cx) * mmPorM;
	const py = (y) => dy0 + dh / 2 - (y - cy) * mmPorM;
	const vx0 = cx - dw / 2 / mmPorM;
	const vx1 = cx + dw / 2 / mmPorM;
	const vy0 = cy - dh / 2 / mmPorM;
	const vy1 = cy + dh / 2 / mmPorM;
	doc.setDrawColor(0, 0, 0);
	doc.setLineWidth(.5);
	doc.rect(dx0, dy0, dw, dh);
	const paso = [
		50,
		100,
		200,
		250,
		500,
		1e3,
		2e3,
		2500,
		5e3,
		1e4,
		25e3
	].find((s) => s * mmPorM >= 25) ?? 5e4;
	doc.setLineWidth(.1);
	doc.setDrawColor(190, 190, 190);
	doc.setFontSize(6);
	doc.setTextColor(90, 90, 90);
	for (let x = Math.ceil(vx0 / paso) * paso; x < vx1; x += paso) {
		doc.line(px(x), dy0, px(x), dy0 + dh);
		doc.text(`${Math.round(x)} E`, px(x), dy0 - 1, { align: "center" });
		doc.text(`${Math.round(x)} E`, px(x), dy0 + dh + 3, { align: "center" });
	}
	for (let y = Math.ceil(vy0 / paso) * paso; y < vy1; y += paso) {
		doc.line(dx0, py(y), dx0 + dw, py(y));
		doc.text(`${Math.round(y)} N`, dx0 - 1, py(y), {
			align: "right",
			angle: 90
		});
		doc.text(`${Math.round(y)} N`, dx0 + dw + 3, py(y), { angle: 90 });
	}
	doc.saveGraphicsState();
	doc.rect(dx0, dy0, dw, dh, null);
	doc.clip();
	doc.discardPath();
	const poligono = (pts, estilo, cerrado) => {
		if (pts.length < 2) return;
		const rel = pts.slice(1).map((q, i) => [q[0] - pts[i][0], q[1] - pts[i][1]]);
		doc.lines(rel, pts[0][0], pts[0][1], [1, 1], estilo, cerrado);
	};
	const etiquetas = [];
	for (const c of pr.p.colecciones) {
		const grosor = Math.max(.15, c.estilo.grosor * .18);
		const guion = c.estilo.tipoLinea === "DISCONTINUA" ? [2.5, 1.5] : c.estilo.tipoLinea === "PUNTEADA" ? [.6, 1] : [];
		for (const f of c.datos.features) {
			const { trazos, puntos } = trazosDe(f.geometry, pr.aXY);
			const [rr, gg, bb] = hexRgb(colorDe(c, f));
			const [br, bg, bbb] = hexRgb(colorDe(c, f, true));
			doc.setLineWidth(grosor);
			doc.setLineDashPattern(guion, 0);
			for (const t of trazos) {
				const pts = t.puntos.map(([x, y]) => [px(x), py(y)]);
				if (t.cerrado && c.estilo.opacidad > 0) {
					doc.saveGraphicsState();
					doc.setGState(doc.GState({ opacity: Math.min(.6, c.estilo.opacidad) }));
					doc.setFillColor(rr, gg, bb);
					poligono(pts, "F", true);
					doc.restoreGraphicsState();
				}
				doc.setDrawColor(br, bg, bbb);
				poligono(pts, "S", t.cerrado);
			}
			doc.setLineDashPattern([], 0);
			doc.setFillColor(rr, gg, bb);
			doc.setDrawColor(255, 255, 255);
			for (const [x, y] of puntos) doc.circle(px(x), py(y), 1, "FD");
			const campo = c.estilo.etiqueta;
			if (campo && trazos.length) {
				const todos = trazos.flatMap((t) => t.puntos);
				const xs = todos.map((q) => q[0]);
				const ys = todos.map((q) => q[1]);
				const anchoMm = (Math.max(...xs) - Math.min(...xs)) * mmPorM;
				const t = String(f.properties?.[campo] ?? "");
				doc.setFontSize(4.5);
				if (anchoMm >= doc.getTextWidth(t) * .9) etiquetas.push({
					x: px((Math.min(...xs) + Math.max(...xs)) / 2),
					y: py((Math.min(...ys) + Math.max(...ys)) / 2),
					t
				});
			}
		}
	}
	doc.setFontSize(4.5);
	doc.setTextColor(20, 20, 20);
	for (const e of etiquetas) doc.text(e.t, e.x, e.y + .8, { align: "center" });
	doc.restoreGraphicsState();
	const nx = dx0 + dw - 12;
	const ny = 18;
	doc.setFillColor(0, 0, 0);
	doc.setDrawColor(0, 0, 0);
	doc.setLineWidth(.4);
	doc.triangle(nx, 28, nx - 3, 32, nx, ny, "F");
	doc.triangle(nx, 28, nx + 3, 32, nx, ny, "S");
	doc.setFontSize(9);
	doc.setTextColor(0, 0, 0);
	doc.text("N", nx, ny - 1.5, { align: "center" });
	const barraM = [
		10,
		20,
		25,
		50,
		100,
		200,
		250,
		500,
		1e3,
		2e3,
		5e3
	].find((m) => m * mmPorM >= 30) ?? 1e4;
	const bx = 16;
	const by = dy0 + dh - 8;
	const tramo = barraM * mmPorM / 4;
	for (let i = 0; i < 4; i++) {
		const gris = i % 2 ? 255 : 0;
		doc.setFillColor(gris, gris, gris);
		doc.rect(bx + i * tramo, by, tramo, 1.6, "FD");
	}
	doc.setFontSize(6);
	doc.text("0", bx, by - 1, { align: "center" });
	doc.text(`${barraM / 2} m`, bx + 2 * tramo, by - 1, { align: "center" });
	doc.text(`${barraM} m`, bx + 4 * tramo, by - 1, { align: "center" });
	doc.text(`Escala gráfica · 1:${escala.toLocaleString("es-PE")}`, bx, by + 5);
	const mx = dx0 + dw + 4;
	const mw = MEMBRETE;
	doc.setDrawColor(0, 0, 0);
	doc.setLineWidth(.5);
	doc.rect(mx, dy0, mw, dh);
	doc.setFillColor(...ROJO);
	doc.rect(mx, dy0, mw, 3, "F");
	let y = 20;
	const linea = (t, tam = 8, negrita = false, color = [
		0,
		0,
		0
	]) => {
		doc.setFont("helvetica", negrita ? "bold" : "normal");
		doc.setFontSize(tam);
		doc.setTextColor(...color);
		const partes = doc.splitTextToSize(t, mw - 8);
		doc.text(partes, mx + 4, y);
		y += partes.length * (tam * .42) + 1.5;
	};
	const separador = () => {
		doc.setDrawColor(...ROJO);
		doc.setLineWidth(.3);
		doc.line(mx + 4, y - 1, mx + mw - 4, y - 1);
		y += 3;
	};
	linea("MINISTERIO DE TRANSPORTES Y COMUNICACIONES", 8, true, ROJO);
	linea("Dirección de Disponibilidad de Predios (DDP)", 7.5);
	linea("Plataforma Digital de Gestión de Predios · PDGP", 7);
	separador();
	linea("PLANO CLAVE", 14, true);
	linea(pr.titulo, 9, true);
	linea(`Proyecto ${pr.p.codigo}`, 8);
	separador();
	linea(`Lámina PC-01 · Escala 1:${escala.toLocaleString("es-PE")} · Formato A3`, 8);
	linea(`Sistema de referencia: WGS 84 / UTM zona ${pr.zona} (EPSG:${pr.epsg}). Grilla cada ${paso} m.`, 7.5);
	linea(`Fecha: ${(/* @__PURE__ */ new Date()).toLocaleDateString("es-PE")} · Elaborado por: ${usuarioWeb()}`, 7.5);
	linea("Fuente: base gráfica del proyecto (capas del sistema y capas aprobadas) y padrón de predios.", 7);
	separador();
	linea("LEYENDA", 9, true);
	const simbolo = (color, borde, forma, texto) => {
		const [r, g, b] = hexRgb(color);
		const [br, bg, bb] = hexRgb(borde);
		doc.setDrawColor(br, bg, bb);
		doc.setFillColor(r, g, b);
		doc.setLineWidth(.4);
		if (forma === "area") doc.rect(mx + 4, y - 3, 7, 3.5, "FD");
		else if (forma === "linea") doc.line(mx + 4, y - 1.2, mx + 11, y - 1.2);
		else doc.circle(mx + 7.5, y - 1.2, 1.2, "FD");
		doc.setFont("helvetica", "normal");
		doc.setFontSize(7);
		doc.setTextColor(0, 0, 0);
		const partes = doc.splitTextToSize(texto, mw - 18);
		doc.text(partes, mx + 13, y);
		y += Math.max(4.5, partes.length * 3.1 + 1.4);
	};
	for (const c of pr.p.colecciones) {
		if (!c.datos.features.length) continue;
		if (c.estilo.categorias) {
			doc.setFont("helvetica", "bold");
			doc.setFontSize(7);
			doc.text(`${c.titulo} (${c.datos.features.length})`, mx + 4, y);
			y += 4;
			for (const v of c.estilo.categorias.valores) {
				const cant = c.datos.features.filter((f) => String(f.properties?.[c.estilo.categorias.campo] ?? "") === v.valor).length;
				if (cant) simbolo(v.color, c.estilo.borde, c.geometria === "PUNTO" ? "punto" : "area", `${v.etiqueta} (${cant})`);
			}
		} else {
			const forma = c.geometria === "PUNTO" ? "punto" : c.geometria === "LINEA" || c.estilo.opacidad === 0 ? "linea" : "area";
			simbolo(c.estilo.relleno, c.estilo.borde, forma, `${c.titulo} (${c.datos.features.length})`);
		}
	}
	if (pr.p.demostracion) {
		y += 2;
		linea("Datos de demostración: el proyecto aún no tiene polígonos propios; se dibuja el padrón de Jauja.", 7, false, [
			180,
			83,
			9
		]);
	}
	doc.setFontSize(6);
	doc.setTextColor(120, 120, 120);
	doc.text(`Generado por PDGP · ${(/* @__PURE__ */ new Date()).toLocaleString("es-PE")}`, mx + 4, dy0 + dh - 3);
	return doc.output("blob");
}
async function descargarPlanoClave(projectId, formato) {
	const pr = await proyectar(projectId);
	const base = `plano-clave-${pr.p.codigo.toLowerCase()}`;
	if (formato === "pdf") return descargarBlob(`${base}.pdf`, await pdfPlanoClave(pr));
	if (formato === "dxf") return descargarBlob(`${base}.dxf`, new Blob([dxfPlanoClave(pr)], { type: "application/dxf" }));
	const zip = await armarPaquete(pr.p, {
		servicio: urlOgc(projectId),
		usuario: usuarioWeb(),
		extras: {
			[`${base}.dxf`]: dxfPlanoClave(pr),
			[`${base}.pdf`]: await pdfPlanoClave(pr)
		}
	});
	descargarBlob(`capas-${pr.p.codigo.toLowerCase()}.zip`, new Blob([zip], { type: "application/zip" }));
}
//#endregion
//#region src/routes/proyectos.$projectId.mapa.tsx?tsr-split=component
/** MapLibre no corre en el servidor: el mapa se carga en el navegador. */
function MapaCliente(props) {
	const [Mapa, setMapa] = useState(null);
	useEffect(() => {
		import("./MapView-CftjYrgX.js").then((m) => setMapa(() => m.default));
	}, []);
	if (!Mapa) return /* @__PURE__ */ jsx("div", {
		className: "h-full w-full animate-pulse bg-muted",
		role: "status",
		"aria-label": "Cargando mapa"
	});
	return /* @__PURE__ */ jsx(Mapa, { ...props });
}
/** Los mismos grupos que el panel de la Base gráfica: capas del sistema y luego las de cada clase. */
var GRUPOS_DE_CAPAS = [{
	name: "Base cartográfica",
	items: [{
		id: "base",
		name: "Mapa base"
	}]
}, {
	name: "Capas del sistema",
	items: CAPAS_SISTEMA.map((c) => ({
		id: c.id,
		name: c.nombre
	}))
}];
var CLASES = [
	"BASE",
	"PROYECTO",
	"AUXILIAR"
];
var CAPAS_LINEALES = [{
	color: "#ec4899",
	label: "Concesión",
	grupo: "Capas del proyecto"
}, {
	color: "#dc2626",
	label: "PMD",
	grupo: "Capas del proyecto"
}];
/** Centro del padrón de Jauja: la barra de coordenadas arranca aquí hasta que el puntero se mueve. */
var CENTRO = {
	lat: -11.782,
	lng: -75.478
};
function MapaProyecto() {
	const { projectId } = Route$1.useParams();
	const { predio } = Route$1.useSearch();
	const [seleccion, setSeleccion] = useState(predio ?? null);
	const [cursor, setCursor] = useState(null);
	const [gruposAbiertos, setGruposAbiertos] = useState({
		...Object.fromEntries(GRUPOS_DE_CAPAS.map((g) => [g.name, true])),
		...Object.fromEntries(CLASES.map((c) => [NOMBRE_CLASE[c], true]))
	});
	const leyenda = useMemo(() => {
		const lista = prediosDelProyecto(projectId);
		return [...ETAPAS_DE_AVANCE.map((n) => ({
			color: ETAPA_COLOR[n],
			label: `${n} · ${ETAPA_CORTA[n]}`,
			grupo: "Etapa del predio",
			cantidad: lista.filter((p) => p.etapa.etapa === n).length
		})), ...CAPAS_LINEALES];
	}, [projectId]);
	const [capas, setCapas] = useState({
		base: true,
		puntos: false
	});
	const todas = useCapas(projectId);
	const activas = useMemo(() => todas.filter((c) => c.activa), [todas]);
	const porDefecto = useMemo(() => Object.fromEntries(activas.map((c) => [`capa:${c.id}`, c.visible])), [activas]);
	const visibilidad = useMemo(() => ({
		...porDefecto,
		...capas
	}), [porDefecto, capas]);
	const setVisibilidad = (u) => setCapas((prev) => typeof u === "function" ? u({
		...porDefecto,
		...prev
	}) : u);
	const grupos = [...GRUPOS_DE_CAPAS, ...CLASES.map((clase) => ({
		name: NOMBRE_CLASE[clase],
		items: activas.filter((c) => claseDe(c) === clase).map((c) => ({
			id: `capa:${c.id}`,
			name: c.nombre
		}))
	})).filter((g) => g.items.length)];
	const capasMapa = useMemo(() => activas.map((c) => ({ capa: {
		...c,
		visible: visibilidad[`capa:${c.id}`] !== false
	} })), [activas, visibilidad]);
	const [descargando, setDescargando] = useState(null);
	const [errorDescarga, setErrorDescarga] = useState(null);
	const descargar = async (formato) => {
		setDescargando(formato);
		setErrorDescarga(null);
		try {
			await descargarPlanoClave(projectId, formato);
		} catch (e) {
			setErrorDescarga(e instanceof Error ? e.message : "No se pudo generar el plano clave.");
		} finally {
			setDescargando(null);
		}
	};
	return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsxs("div", {
		className: "flex h-[calc(100vh-3.5rem-2rem)] flex-col",
		children: [
			/* @__PURE__ */ jsx(ProyectoEncabezado, {
				projectId,
				titulo: "Mapa del proyecto",
				icono: Map$1,
				descripcion: "Predios coloreados por su etapa actual. Clic en un predio para ver su ficha y abrir el expediente.",
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/proyectos/$projectId/predios",
							params: { projectId },
							children: [/* @__PURE__ */ jsx(ListChecks, {}), " Listado de predios"]
						})
					}),
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/proyectos/$projectId/padron",
							params: { projectId },
							children: [/* @__PURE__ */ jsx(Sheet, {}), " Padrón completo"]
						})
					}),
					/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsxs(Button, {
							type: "button",
							disabled: descargando !== null,
							children: [
								/* @__PURE__ */ jsx(Download, {}),
								" ",
								descargando ? "Generando…" : "Descargar plano clave"
							]
						})
					}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
						align: "end",
						children: [
							/* @__PURE__ */ jsxs(DropdownMenuItem, {
								onSelect: () => descargar("pdf"),
								children: [/* @__PURE__ */ jsx(FileText, {
									size: 16,
									"aria-hidden": true
								}), " Plano clave en PDF (A3)"]
							}),
							/* @__PURE__ */ jsxs(DropdownMenuItem, {
								onSelect: () => descargar("dxf"),
								children: [/* @__PURE__ */ jsx(PenTool, {
									size: 16,
									"aria-hidden": true
								}), " Plano clave en DWG/DXF (AutoCAD)"]
							}),
							/* @__PURE__ */ jsxs(DropdownMenuItem, {
								onSelect: () => descargar("zip"),
								children: [/* @__PURE__ */ jsx(FolderArchive, {
									size: 16,
									"aria-hidden": true
								}), " Capas en ZIP (GeoJSON, QGIS, DXF y PDF)"]
							})
						]
					})] })
				] })
			}),
			errorDescarga && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				onCerrar: () => setErrorDescarga(null),
				children: errorDescarga
			}),
			padronDemostrativo(projectId) && /* @__PURE__ */ jsx(DatosDemostracion, { children: "Datos de demostración: este proyecto muestra el padrón del Aeropuerto de Jauja hasta que se cargue el suyo." }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative min-h-0 flex-1 overflow-hidden rounded-lg border border-border bg-card",
				children: [
					/* @__PURE__ */ jsx(MapaCliente, {
						selectedCodigo: seleccion,
						onSelectCodigo: setSeleccion,
						layerVisibility: visibilidad,
						estilosSistema: leerEstilosSistema(projectId),
						onCursor: setCursor,
						capas: capasMapa
					}),
					/* @__PURE__ */ jsx(LayersPanel, {
						layerGroups: grupos,
						openGroups: gruposAbiertos,
						setOpenGroups: setGruposAbiertos,
						layerVisibility: visibilidad,
						setLayerVisibility: setVisibilidad
					}),
					/* @__PURE__ */ jsx(MapLegend, { items: leyenda }),
					/* @__PURE__ */ jsx(MapStatusBar, {
						centerLat: CENTRO.lat,
						centerLng: CENTRO.lng,
						posicion: cursor
					})
				]
			})
		]
	}) });
}
//#endregion
export { MapaProyecto as component };
