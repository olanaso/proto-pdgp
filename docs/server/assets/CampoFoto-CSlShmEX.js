import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { u as ROLES } from "./historial-Bc37nCTn.js";
import { l as tienePermiso, u as useRol } from "./permisos-C7yUz4DS.js";
import { A as DialogTitle, C as numerarPaginasPdf, D as Dialog, Dt as BotonIcono, E as Modal, O as DialogContent, T as Confirmar, b as dibujarCabeceraPdf, k as DialogDescription, w as registrarExportacion, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { _ as idAnot, a as COLORES, b as visible, c as OVERLAYS, d as anotacionDeOverlay, f as dimensiones, g as girarAnotaciones, h as estampaPorDefecto, i as FotoSvg, l as aCoordenadas, m as escalaPantalla, o as ESTILO_BASE, p as distancia, r as renderizarFoto, s as NOMBRE_COLOR, u as ajustesBase, v as metrosDeTexto, y as unidad } from "./fotoRender-BT_YRQ8T.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { a as fotosDe, b as utmTexto, d as quitarFoto, g as useFotos, l as leerOriginal, m as subirFoto, r as descargarFoto, s as leerConfigFotos, t as aplicarEdicion, u as nombreArchivoFoto, v as useUrlFoto, y as aUtm } from "./fotos-CUnD_Pb7.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowUpToLine, Camera, Circle, Copy, Crop, Download, Eye, FileImage, History, ImagePlus, Minus, MousePointer2, MoveUpRight, Pencil, Plus, RectangleHorizontal, Redo2, RotateCcw, RotateCw, Ruler, Scan, Spline, Stamp, Trash2, Type, Undo2, X } from "lucide-react";
//#region src/lib/panelFotografico.ts
var aDataUrl = (blob) => new Promise((resolver, rechazar) => {
	const r = new FileReader();
	r.onload = () => resolver(String(r.result));
	r.onerror = () => rechazar(/* @__PURE__ */ new Error("No se pudo leer la foto."));
	r.readAsDataURL(blob);
});
/** "28/08/2026 12:20:48 · UTM 18S … · km 12+350" */
var pieDe = (f) => [
	f.metadatos.fecha && f.metadatos.fecha.split("-").reverse().join("/") + (f.metadatos.hora ? ` ${f.metadatos.hora}` : ""),
	f.metadatos.utm,
	f.metadatos.km && `km ${f.metadatos.km}`
].filter(Boolean).join(" · ");
/**
* Panel fotográfico en PDF (anexo de la memoria descriptiva o del informe): A4 vertical con la cabecera
* institucional, dos o cuatro fotos por hoja (la versión editada) y, debajo de cada una, su título,
* sección, fecha, UTM, km y versión.
*/
async function generarPanelFotografico(fotos, cabecera, nombre, porHoja = 4) {
	const { jsPDF } = await import("jspdf");
	const doc = new jsPDF({
		orientation: "portrait",
		unit: "mm",
		format: "a4"
	});
	const ancho = doc.internal.pageSize.getWidth();
	const alto = doc.internal.pageSize.getHeight();
	const m = 12;
	const columnas = porHoja === 4 ? 2 : 1;
	const filas = 2;
	const gap = 6;
	const pie = 14;
	let y0 = dibujarCabeceraPdf(doc, cabecera, m);
	const celdaW = (ancho - 2 * m - gap * (columnas - 1)) / columnas;
	const celdaH = () => (alto - m - 8 - y0 - gap * (filas - 1)) / filas;
	for (let i = 0; i < fotos.length; i++) {
		const enHoja = i % porHoja;
		if (i > 0 && enHoja === 0) {
			doc.addPage();
			y0 = 16;
		}
		const f = fotos[i];
		const col = enHoja % columnas;
		const fila = Math.floor(enHoja / columnas);
		const h = celdaH();
		const x = m + col * (celdaW + gap);
		const y = y0 + fila * (h + gap);
		const original = await leerOriginal(f.id);
		if (original) {
			const url = await aDataUrl(await renderizarFoto(f, original, 1800, .85));
			const prop = await new Promise((resolver) => {
				const img = new Image();
				img.onload = () => resolver(img.width / img.height || 4 / 3);
				img.onerror = () => resolver(4 / 3);
				img.src = url;
			});
			const maxH = h - pie;
			let w = celdaW;
			let hh = w / prop;
			if (hh > maxH) {
				hh = maxH;
				w = hh * prop;
			}
			doc.addImage(url, "JPEG", x + (celdaW - w) / 2, y, w, hh);
			doc.setDrawColor(210, 210, 210);
			doc.rect(x + (celdaW - w) / 2, y, w, hh);
			const yPie = y + hh + 4;
			doc.setFont("helvetica", "bold");
			doc.setFontSize(8.5);
			doc.setTextColor(0, 0, 0);
			doc.text(`Foto ${String(i + 1).padStart(2, "0")}. ${f.titulo}`, x, yPie, { maxWidth: celdaW });
			doc.setFont("helvetica", "normal");
			doc.setFontSize(7.5);
			doc.setTextColor(90, 90, 90);
			doc.text([`${f.seccion} · ${f.campo} · versión ${f.version}`, pieDe(f)].filter(Boolean).join("\n"), x, yPie + 4, { maxWidth: celdaW });
		} else {
			doc.setFontSize(9);
			doc.setTextColor(150, 0, 0);
			doc.text(`Foto ${i + 1}: el archivo no está en este navegador.`, x, y + 10);
		}
	}
	if (fotos.length === 0) {
		doc.setFontSize(10);
		doc.text("No hay fotos para este panel.", m, y0 + 6);
	}
	numerarPaginasPdf(doc, cabecera.titulo, m);
	doc.save(`${nombre}.pdf`);
	registrarExportacion(nombre, "PDF", fotos.length, cabecera.titulo);
}
//#endregion
//#region src/components/foto/BotonPanelFotografico.tsx
/**
* Botón "Panel fotográfico (PDF)" de una pantalla: todas sus fotos del predio, editadas, dos o cuatro
* por hoja con la cabecera institucional y el pie de datos de cada toma.
*/
function BotonPanelFotografico({ proyecto, predio, pantalla, titulo }) {
	const todas = useFotos();
	const fotos = useMemo(() => fotosDe(todas, {
		predio,
		pantalla
	}), [
		todas,
		predio,
		pantalla
	]);
	const secciones = useMemo(() => [...new Set(fotos.map((f) => f.seccion))], [fotos]);
	const [abierto, setAbierto] = useState(false);
	const [porHoja, setPorHoja] = useState(4);
	const [elegidas, setElegidas] = useState([]);
	const [generando, setGenerando] = useState(false);
	const [error, setError] = useState(null);
	const incluidas = fotos.filter((f) => elegidas.length === 0 || elegidas.includes(f.seccion));
	async function generar() {
		setGenerando(true);
		setError(null);
		try {
			const p = getProyecto(proyecto);
			await generarPanelFotografico(incluidas, {
				titulo,
				lineas: [
					`Proyecto: ${p ? p.nombre : proyecto}`,
					`Predio: ${predio}`,
					`${incluidas.length} ${incluidas.length === 1 ? "foto" : "fotos"}${elegidas.length ? ` · secciones: ${elegidas.join(", ")}` : ""}`
				]
			}, `panel-fotografico-${predio}-${pantalla}`, porHoja);
			setAbierto(false);
		} catch (e) {
			setError(e.message || "No se pudo generar el panel.");
		} finally {
			setGenerando(false);
		}
	}
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick: () => setAbierto(true),
		disabled: fotos.length === 0,
		title: fotos.length ? void 0 : "Aún no hay fotos",
		children: [
			/* @__PURE__ */ jsx(FileImage, {}),
			" Panel fotográfico (",
			fotos.length,
			")"
		]
	}), /* @__PURE__ */ jsxs(Modal, {
		abierto,
		onCerrar: () => setAbierto(false),
		ancho: "sm",
		titulo: "Panel fotográfico (PDF)",
		descripcion: "Fotos editadas con su pie de datos (fecha, UTM, km y versión), para el anexo de la memoria o del informe.",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: () => setAbierto(false),
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: () => void generar(),
			disabled: generando || incluidas.length === 0,
			children: [
				/* @__PURE__ */ jsx(FileImage, {}),
				" ",
				generando ? "Generando…" : `Generar PDF (${incluidas.length})`
			]
		})] }),
		children: [
			/* @__PURE__ */ jsxs("fieldset", {
				className: "mb-3",
				children: [/* @__PURE__ */ jsx("legend", {
					className: "mb-1 text-sm font-medium",
					children: "Fotos por hoja"
				}), /* @__PURE__ */ jsx("div", {
					className: "flex gap-4 text-sm",
					children: [2, 4].map((n) => /* @__PURE__ */ jsxs("label", {
						className: "flex cursor-pointer items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "radio",
								name: "por-hoja",
								className: "accent-primary",
								checked: porHoja === n,
								onChange: () => setPorHoja(n)
							}),
							n,
							" por hoja"
						]
					}, n))
				})]
			}),
			secciones.length > 1 && /* @__PURE__ */ jsxs("fieldset", { children: [/* @__PURE__ */ jsx("legend", {
				className: "mb-1 text-sm font-medium",
				children: "Secciones (sin marcar = todas)"
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-1 text-sm",
				children: secciones.map((s) => /* @__PURE__ */ jsxs("label", {
					className: "flex cursor-pointer items-center gap-2",
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							className: "accent-primary",
							checked: elegidas.includes(s),
							onChange: (e) => setElegidas((x) => e.target.checked ? [...x, s] : x.filter((y) => y !== s))
						}),
						s,
						" (",
						fotos.filter((f) => f.seccion === s).length,
						")"
					]
				}, s))
			})] }),
			error && /* @__PURE__ */ jsx("p", {
				role: "alert",
				className: "mt-2 text-xs text-destructive",
				children: error
			})
		]
	})] });
}
//#endregion
//#region src/components/foto/PanelesEditor.tsx
function Grupo({ titulo, extra, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "border-b border-border px-4 py-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-xs font-semibold uppercase text-muted-foreground",
				children: titulo
			}), extra && /* @__PURE__ */ jsx("span", {
				className: "text-xs text-muted-foreground",
				children: extra
			})]
		}), children]
	});
}
function Fila({ etiqueta, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-2 grid grid-cols-[88px_1fr] items-center gap-2 text-sm",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-foreground",
			children: etiqueta
		}), /* @__PURE__ */ jsx("div", {
			className: "min-w-0",
			children
		})]
	});
}
function Deslizador({ etiqueta, valor, min, max, paso = 1, sufijo = "", onCambio }) {
	return /* @__PURE__ */ jsx(Fila, {
		etiqueta,
		children: /* @__PURE__ */ jsxs("span", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx("input", {
				type: "range",
				min,
				max,
				step: paso,
				value: valor,
				onChange: (e) => onCambio(Number(e.target.value)),
				"aria-label": etiqueta,
				className: "h-2 w-full cursor-pointer accent-primary"
			}), /* @__PURE__ */ jsxs("span", {
				className: "w-12 shrink-0 text-right text-xs tabular-nums text-muted-foreground",
				children: [valor, sufijo]
			})]
		})
	});
}
function Segmentado({ etiqueta, valor, opciones, onCambio }) {
	return /* @__PURE__ */ jsx(Fila, {
		etiqueta,
		children: /* @__PURE__ */ jsx("span", {
			className: "flex rounded-md border border-border bg-muted p-0.5",
			role: "radiogroup",
			"aria-label": etiqueta,
			children: opciones.map((o) => /* @__PURE__ */ jsx("button", {
				type: "button",
				role: "radio",
				"aria-checked": valor === o.valor,
				onClick: () => onCambio(o.valor),
				className: `flex-1 rounded-sm px-2 py-1 text-xs font-medium ${valor === o.valor ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`,
				children: o.texto
			}, o.valor))
		})
	});
}
function Casilla({ etiqueta, valor, onCambio }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "mb-2 flex cursor-pointer items-center gap-2 text-sm",
		children: [/* @__PURE__ */ jsx("input", {
			type: "checkbox",
			className: "size-4 accent-primary",
			checked: valor,
			onChange: (e) => onCambio(e.target.checked)
		}), etiqueta]
	});
}
function Colores({ valor, onCambio }) {
	return /* @__PURE__ */ jsx(Fila, {
		etiqueta: "Color",
		children: /* @__PURE__ */ jsx("span", {
			className: "flex flex-wrap gap-1.5",
			role: "radiogroup",
			"aria-label": "Color",
			children: Object.keys(COLORES).map((c) => /* @__PURE__ */ jsx("button", {
				type: "button",
				role: "radio",
				"aria-checked": valor === c,
				"aria-label": NOMBRE_COLOR[c],
				title: NOMBRE_COLOR[c],
				onClick: () => onCambio(c),
				style: { background: COLORES[c] },
				className: `size-7 rounded-md border ${valor === c ? "border-foreground ring-2 ring-primary ring-offset-1" : "border-border"}`
			}, c))
		})
	});
}
function PanelAjustar({ foto, onAjustes, onRotar, recortando, proporcion, onProporcion, onRecortar, onQuitarRecorte }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsxs(Grupo, {
			titulo: "Orientación",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => onRotar(-1),
					children: [/* @__PURE__ */ jsx(RotateCcw, {}), " Girar a la izquierda"]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => onRotar(1),
					children: [/* @__PURE__ */ jsx(RotateCw, {}), " Girar a la derecha"]
				})]
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "Las anotaciones giran con la foto. Girar quita el recorte."
			})]
		}),
		/* @__PURE__ */ jsxs(Grupo, {
			titulo: "Recorte",
			extra: foto.ajustes.recorte ? `${foto.ajustes.recorte.w} × ${foto.ajustes.recorte.h} px` : "Sin recorte",
			children: [
				/* @__PURE__ */ jsx(Segmentado, {
					etiqueta: "Proporción",
					valor: proporcion,
					opciones: [
						{
							valor: "libre",
							texto: "Libre"
						},
						{
							valor: "4:3",
							texto: "4:3"
						},
						{
							valor: "16:9",
							texto: "16:9"
						},
						{
							valor: "1:1",
							texto: "1:1"
						}
					],
					onCambio: onProporcion
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: recortando ? "default" : "outline",
						size: "sm",
						onClick: onRecortar,
						children: [
							/* @__PURE__ */ jsx(Crop, {}),
							" ",
							recortando ? "Aplicar recorte" : "Recortar"
						]
					}), foto.ajustes.recorte && !recortando && /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: onQuitarRecorte,
						children: "Quitar recorte"
					})]
				}),
				recortando && /* @__PURE__ */ jsx("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Arrastre sobre la foto el área que quiere conservar."
				})
			]
		}),
		/* @__PURE__ */ jsxs(Grupo, {
			titulo: "Luz",
			children: [
				/* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Brillo",
					valor: foto.ajustes.brillo,
					min: -100,
					max: 100,
					onCambio: (v) => onAjustes({ brillo: v })
				}),
				/* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Contraste",
					valor: foto.ajustes.contraste,
					min: -100,
					max: 100,
					onCambio: (v) => onAjustes({ contraste: v })
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "link",
					size: "sm",
					className: "h-auto px-0",
					onClick: () => onAjustes({
						brillo: 0,
						contraste: 0
					}),
					children: "Restablecer luz"
				})
			]
		})
	] });
}
function PanelEstampa({ foto, onMetadatos, onEstampa, onMarcaAgua, onTitulo, onRecalcularUtm, marcaPorDefecto }) {
	const m = foto.metadatos;
	const e = foto.estampa;
	const ma = foto.marcaAgua;
	const dias = m.fecha && Number.isFinite(Date.parse(m.fecha)) ? Math.abs(Date.parse(foto.original.subidoEl) - Date.parse(m.fecha)) / 864e5 : 0;
	const corregido = (k) => m.corregidos.includes(k);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsxs(Grupo, {
			titulo: "Datos de la toma",
			extra: m.origen === "exif" ? "Leídos de la foto" : m.origen === "manual" ? "Corregidos a mano" : "La foto no trae datos",
			children: [
				m.origen === "sin_datos" && /* @__PURE__ */ jsx("p", {
					className: "mb-2 rounded-md border border-warning bg-warning-soft px-2 py-1 text-xs text-warning",
					children: "La foto no trae fecha ni coordenadas (pasa con capturas y fotos de WhatsApp). Escríbalos a mano."
				}),
				dias > 30 && /* @__PURE__ */ jsxs("p", {
					className: "mb-2 rounded-md border border-warning bg-warning-soft px-2 py-1 text-xs text-warning",
					children: [
						"La foto se tomó ",
						Math.round(dias),
						" días antes de subirla. Revise que corresponda a esta inspección."
					]
				}),
				/* @__PURE__ */ jsx(Fila, {
					etiqueta: "Título",
					children: /* @__PURE__ */ jsx("input", {
						className: controlClase,
						value: foto.titulo,
						onChange: (ev) => onTitulo(ev.target.value),
						"aria-label": "Título de la foto"
					})
				}),
				/* @__PURE__ */ jsx(Fila, {
					etiqueta: corregido("fecha") ? "Fecha *" : "Fecha",
					children: /* @__PURE__ */ jsx("input", {
						type: "date",
						className: controlClase,
						value: m.fecha,
						onChange: (ev) => onMetadatos({ fecha: ev.target.value }),
						"aria-label": "Fecha de la toma"
					})
				}),
				/* @__PURE__ */ jsx(Fila, {
					etiqueta: corregido("hora") ? "Hora *" : "Hora",
					children: /* @__PURE__ */ jsx("input", {
						type: "time",
						step: 1,
						className: controlClase,
						value: m.hora,
						onChange: (ev) => onMetadatos({ hora: ev.target.value }),
						"aria-label": "Hora de la toma"
					})
				}),
				/* @__PURE__ */ jsx(Fila, {
					etiqueta: corregido("utm") ? "UTM *" : "UTM",
					children: /* @__PURE__ */ jsx("input", {
						className: controlClase,
						value: m.utm,
						placeholder: "UTM 18S 445 612 E · 8 698 210 N",
						onChange: (ev) => onMetadatos({ utm: ev.target.value }),
						"aria-label": "Coordenadas UTM"
					})
				}),
				/* @__PURE__ */ jsx(Fila, {
					etiqueta: "Progresiva",
					children: /* @__PURE__ */ jsx("input", {
						className: controlClase,
						value: m.km,
						placeholder: "Por ejemplo 12+350",
						onChange: (ev) => onMetadatos({ km: ev.target.value }),
						"aria-label": "Progresiva en km"
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-xs text-muted-foreground",
					children: [[
						m.camara && `Cámara ${m.camara}`,
						m.lat != null && m.lon != null && `GPS ${m.lat.toFixed(6)}, ${m.lon.toFixed(6)}`,
						m.altitud != null && `${m.altitud} m s. n. m.`
					].filter(Boolean).join(" · ") || "Sin datos de cámara ni GPS.", m.corregidos.length > 0 && " Los campos con * se corrigieron a mano; el histórico guarda lo leído."]
				}),
				m.lat != null && m.lon != null && corregido("utm") && /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "link",
					size: "sm",
					className: "h-auto px-0",
					onClick: onRecalcularUtm,
					children: "Volver a la coordenada del GPS"
				})
			]
		}),
		/* @__PURE__ */ jsxs(Grupo, {
			titulo: "Estampa",
			children: [/* @__PURE__ */ jsx(Casilla, {
				etiqueta: "Mostrar la estampa sobre la foto",
				valor: Boolean(e?.visible),
				onCambio: (v) => onEstampa(e ? {
					...e,
					visible: v
				} : v ? estampaPorDefecto() : null)
			}), e?.visible && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx("div", {
					className: "mb-2 grid grid-cols-2 gap-x-2 text-sm",
					children: [
						["fecha", "Fecha"],
						["hora", "Hora"],
						["utm", "UTM"],
						["km", "Progresiva"],
						["titulo", "Título"]
					].map(([k, t]) => /* @__PURE__ */ jsx(Casilla, {
						etiqueta: t,
						valor: e.campos[k],
						onCambio: (v) => onEstampa({
							...e,
							campos: {
								...e.campos,
								[k]: v
							}
						})
					}, k))
				}),
				/* @__PURE__ */ jsx(Fila, {
					etiqueta: "Posición",
					children: /* @__PURE__ */ jsxs("select", {
						className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
						value: e.posicion,
						onChange: (ev) => onEstampa({
							...e,
							posicion: ev.target.value
						}),
						"aria-label": "Posición de la estampa",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "inferior-izquierda",
								children: "Abajo a la izquierda"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "inferior-derecha",
								children: "Abajo a la derecha"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "superior-izquierda",
								children: "Arriba a la izquierda"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "superior-derecha",
								children: "Arriba a la derecha"
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Tamaño",
					valor: e.tamano,
					min: 12,
					max: 48,
					onCambio: (v) => onEstampa({
						...e,
						tamano: v
					})
				}),
				/* @__PURE__ */ jsx(Segmentado, {
					etiqueta: "Fondo",
					valor: e.fondo,
					opciones: [{
						valor: "claro",
						texto: "Claro"
					}, {
						valor: "oscuro",
						texto: "Oscuro"
					}],
					onCambio: (v) => onEstampa({
						...e,
						fondo: v
					})
				}),
				/* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Opacidad",
					valor: e.opacidad,
					min: 30,
					max: 100,
					sufijo: "%",
					onCambio: (v) => onEstampa({
						...e,
						opacidad: v
					})
				})
			] })]
		}),
		/* @__PURE__ */ jsxs(Grupo, {
			titulo: "Marca de agua",
			children: [/* @__PURE__ */ jsx(Casilla, {
				etiqueta: "Mostrar la marca de agua",
				valor: Boolean(ma?.visible),
				onCambio: (v) => onMarcaAgua(ma ? {
					...ma,
					visible: v
				} : v ? {
					...marcaPorDefecto,
					visible: true
				} : null)
			}), ma?.visible && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx(Fila, {
					etiqueta: "Texto",
					children: /* @__PURE__ */ jsx("input", {
						className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
						value: ma.texto,
						onChange: (ev) => onMarcaAgua({
							...ma,
							texto: ev.target.value
						}),
						"aria-label": "Texto de la marca de agua"
					})
				}),
				/* @__PURE__ */ jsx(Segmentado, {
					etiqueta: "Posición",
					valor: ma.posicion,
					opciones: [
						{
							valor: "diagonal",
							texto: "Diagonal"
						},
						{
							valor: "centro",
							texto: "Centro"
						},
						{
							valor: "inferior",
							texto: "Abajo"
						}
					],
					onCambio: (v) => onMarcaAgua({
						...ma,
						posicion: v
					})
				}),
				/* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Tamaño",
					valor: ma.tamano,
					min: 20,
					max: 140,
					onCambio: (v) => onMarcaAgua({
						...ma,
						tamano: v
					})
				}),
				/* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Opacidad",
					valor: ma.opacidad,
					min: 10,
					max: 90,
					sufijo: "%",
					onCambio: (v) => onMarcaAgua({
						...ma,
						opacidad: v
					})
				})
			] })]
		})
	] });
}
var HERRAMIENTAS = [
	{
		clave: "mover",
		nombre: "Mover",
		icono: MousePointer2
	},
	{
		clave: "texto",
		nombre: "Texto",
		icono: Type
	},
	{
		clave: "linea",
		nombre: "Línea",
		icono: Minus
	},
	{
		clave: "flecha",
		nombre: "Flecha",
		icono: MoveUpRight
	},
	{
		clave: "cota",
		nombre: "Cota",
		icono: Ruler
	},
	{
		clave: "rectangulo",
		nombre: "Rectáng.",
		icono: RectangleHorizontal
	},
	{
		clave: "elipse",
		nombre: "Elipse",
		icono: Circle
	},
	{
		clave: "polilinea",
		nombre: "Polilínea",
		icono: Spline
	}
];
var AYUDA = {
	mover: "Arrastre para mover. Use los puntos para cambiar la forma. Supr la elimina.",
	texto: "Haga clic donde va el texto y escríbalo abajo.",
	linea: "Arrastre de un extremo al otro.",
	flecha: "Arrastre desde el inicio hasta la punta.",
	cota: "Arrastre entre los dos puntos medidos y escriba la medida.",
	rectangulo: "Arrastre de una esquina a la opuesta.",
	elipse: "Arrastre para definir el óvalo.",
	polilinea: "Un clic por vértice. Doble clic o Intro para terminar; Esc cancela."
};
function PanelAnotar({ foto, herramienta, onHerramienta, seleccion, estilo, onEstilo, onAnotacion, onDuplicar, onAlFrente, onEliminar, onOverlay, onReferencia, dibujandoPoli, onTerminarPoli }) {
	const s = seleccion;
	const conTexto = s && "texto" in s;
	const conRelleno = s ? [
		"rectangulo",
		"elipse",
		"polilinea",
		"franja",
		"norte"
	].includes(s.tipo) : [
		"rectangulo",
		"elipse",
		"polilinea"
	].includes(herramienta);
	const conExtremos = s && (s.tipo === "linea" || s.tipo === "flecha" || s.tipo === "cota");
	const esReferencia = s && foto.escala?.anotacion === s.id;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsxs(Grupo, {
			titulo: "Herramientas",
			extra: `${foto.anotaciones.length} anotaciones`,
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-4 gap-1.5",
					children: HERRAMIENTAS.map((h) => /* @__PURE__ */ jsxs("button", {
						type: "button",
						"aria-pressed": herramienta === h.clave,
						onClick: () => onHerramienta(h.clave),
						className: `flex flex-col items-center gap-1 rounded-md border px-1 py-2 text-xs ${herramienta === h.clave ? "border-primary bg-primary-soft text-primary-dark" : "border-border bg-card text-foreground hover:bg-muted"}`,
						children: [/* @__PURE__ */ jsx(h.icono, {
							size: 18,
							"aria-hidden": true
						}), h.nombre]
					}, h.clave))
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: AYUDA[herramienta]
				}),
				dibujandoPoli && /* @__PURE__ */ jsx(Button, {
					type: "button",
					size: "sm",
					className: "mt-2",
					onClick: onTerminarPoli,
					children: "Terminar la polilínea"
				})
			]
		}),
		/* @__PURE__ */ jsxs(Grupo, {
			titulo: s ? "Estilo de la selección" : "Estilo de la próxima figura",
			children: [
				/* @__PURE__ */ jsx(Colores, {
					valor: estilo.color,
					onCambio: (c) => onEstilo({ color: c })
				}),
				(!s || !["texto", "franja"].includes(s.tipo)) && /* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Grosor",
					valor: estilo.grosor,
					min: 1,
					max: 14,
					onCambio: (v) => onEstilo({ grosor: v })
				}),
				(!s || [
					"linea",
					"flecha",
					"cota",
					"rectangulo",
					"elipse",
					"polilinea"
				].includes(s.tipo)) && /* @__PURE__ */ jsx(Segmentado, {
					etiqueta: "Trazo",
					valor: estilo.trazo,
					opciones: [
						{
							valor: "continuo",
							texto: "Continuo"
						},
						{
							valor: "guiones",
							texto: "Guiones"
						},
						{
							valor: "puntos",
							texto: "Puntos"
						}
					],
					onCambio: (v) => onEstilo({ trazo: v })
				}),
				conExtremos && s && (s.tipo === "linea" || s.tipo === "flecha" || s.tipo === "cota") && /* @__PURE__ */ jsx(Fila, {
					etiqueta: "Extremos",
					children: /* @__PURE__ */ jsx("span", {
						className: "grid grid-cols-2 gap-1",
						children: [0, 1].map((i) => /* @__PURE__ */ jsxs("select", {
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
							"aria-label": i === 0 ? "Extremo inicial" : "Extremo final",
							value: s.extremos[i],
							onChange: (e) => {
								const ext = [s.extremos[0], s.extremos[1]];
								ext[i] = e.target.value;
								onAnotacion({ extremos: ext });
							},
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "ninguno",
									children: "Ninguno"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "tope",
									children: "Tope"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "flecha",
									children: "Flecha"
								})
							]
						}, i))
					})
				}),
				conRelleno && /* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Relleno",
					valor: estilo.relleno,
					min: 0,
					max: 100,
					sufijo: "%",
					onCambio: (v) => onEstilo({ relleno: v })
				}),
				s?.tipo === "polilinea" && /* @__PURE__ */ jsx(Casilla, {
					etiqueta: "Cerrar la figura",
					valor: s.cerrada,
					onCambio: (v) => onAnotacion({ cerrada: v })
				}),
				s?.tipo === "texto" && /* @__PURE__ */ jsx(Casilla, {
					etiqueta: "Con fondo de color",
					valor: s.fondo,
					onCambio: (v) => onAnotacion({ fondo: v })
				}),
				conTexto && s && "texto" in s && /* @__PURE__ */ jsx("textarea", {
					className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted mb-2 h-auto py-2`,
					rows: 2,
					value: s.texto,
					"aria-label": "Texto de la anotación",
					placeholder: s.tipo === "cota" ? "2.60 m" : "Texto",
					onChange: (e) => onAnotacion({ texto: e.target.value })
				}),
				s?.tipo === "franja" && /* @__PURE__ */ jsx(Segmentado, {
					etiqueta: "Posición",
					valor: s.posicion,
					opciones: [{
						valor: "superior",
						texto: "Arriba"
					}, {
						valor: "inferior",
						texto: "Abajo"
					}],
					onCambio: (v) => onAnotacion({ posicion: v })
				}),
				s?.tipo === "norte" && /* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Rotación",
					valor: s.rotacion,
					min: 0,
					max: 359,
					sufijo: "°",
					onCambio: (v) => onAnotacion({ rotacion: v })
				}),
				(!s || s.tipo !== "linea" || s.texto) && /* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Tamaño",
					valor: estilo.tamano,
					min: 10,
					max: 90,
					onCambio: (v) => onEstilo({ tamano: v })
				}),
				/* @__PURE__ */ jsx(Deslizador, {
					etiqueta: "Opacidad",
					valor: estilo.opacidad,
					min: 10,
					max: 100,
					sufijo: "%",
					onCambio: (v) => onEstilo({ opacidad: v })
				}),
				s?.tipo === "cota" && /* @__PURE__ */ jsxs("div", {
					className: "mb-2 rounded-md border border-border bg-background p-2 text-xs",
					children: [
						/* @__PURE__ */ jsx(Casilla, {
							etiqueta: "Usar como referencia de escala",
							valor: Boolean(esReferencia),
							onCambio: onReferencia
						}),
						!esReferencia && foto.escala && /* @__PURE__ */ jsx(Casilla, {
							etiqueta: "Calcular la medida con la escala",
							valor: Boolean(s.auto),
							onCambio: (v) => onAnotacion({ auto: v })
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground",
							children: esReferencia ? "Esta cota fija la escala de la foto con la medida escrita." : foto.escala ? "Hay una escala fijada: las medidas calculadas son estimaciones sobre la foto (≈), no topografía." : "Escriba una medida conocida (wincha, jalón, puerta) y márquela como referencia para estimar las demás."
						})
					]
				}),
				s && (s.tipo === "rectangulo" || s.tipo === "elipse" || s.tipo === "polilinea" && s.cerrada) && foto.escala && /* @__PURE__ */ jsx(Casilla, {
					etiqueta: "Mostrar el área estimada",
					valor: Boolean(s.mostrarArea),
					onCambio: (v) => onAnotacion({ mostrarArea: v })
				}),
				s && /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onDuplicar,
							children: [/* @__PURE__ */ jsx(Copy, {}), " Duplicar"]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onAlFrente,
							children: [/* @__PURE__ */ jsx(ArrowUpToLine, {}), " Al frente"]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "text-destructive",
							onClick: onEliminar,
							children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar"]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ jsx(Grupo, {
			titulo: "Overlays listos",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-1.5",
				children: OVERLAYS.map((o) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onOverlay(o.clave),
					className: "flex items-center gap-2 rounded-md border border-border bg-card px-2 py-2 text-left text-xs font-medium text-foreground hover:bg-muted",
					children: [/* @__PURE__ */ jsx("span", {
						className: "size-3 shrink-0 rounded-sm border border-border",
						style: { background: COLORES[o.color] },
						"aria-hidden": true
					}), o.nombre]
				}, o.clave))
			})
		})
	] });
}
//#endregion
//#region src/lib/fotoEdicion.ts
function distSegmento(p, a, b) {
	const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
	if (l2 === 0) return distancia(p, a);
	const t = Math.max(0, Math.min(1, ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2));
	return distancia(p, {
		x: a.x + t * (b.x - a.x),
		y: a.y + t * (b.y - a.y)
	});
}
function dentroPoligono(p, pts) {
	let dentro = false;
	for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
		const a = pts[i];
		const b = pts[j];
		if (a.y > p.y !== b.y > p.y && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) dentro = !dentro;
	}
	return dentro;
}
/** Caja aproximada de un texto (misma estimación que el dibujo). */
function cajaTexto(x, y, texto, tam) {
	const w = Math.max(texto.length, 1) * tam * .56 + tam;
	return {
		x,
		y: y - tam * .8,
		w,
		h: tam * 1.6
	};
}
/** ¿El punto toca la anotación? `tol` en píxeles de imagen; `u` es la unidad de grosor de la foto. */
function golpe(f, a, p, tol, u) {
	switch (a.tipo) {
		case "texto": {
			const c = cajaTexto(a.x, a.y, a.texto, a.tamano * u);
			return p.x >= c.x - tol && p.x <= c.x + c.w + tol && p.y >= c.y - tol && p.y <= c.y + c.h + tol;
		}
		case "linea":
		case "flecha":
		case "cota": return distSegmento(p, a.puntos[0], a.puntos[1]) <= tol + a.estilo.grosor * u / 2;
		case "rectangulo":
		case "elipse": return p.x >= a.x - tol && p.x <= a.x + a.w + tol && p.y >= a.y - tol && p.y <= a.y + a.h + tol;
		case "polilinea":
			if (a.cerrada && dentroPoligono(p, a.puntos)) return true;
			return a.puntos.some((q, i) => i > 0 && distSegmento(p, a.puntos[i - 1], q) <= tol + a.estilo.grosor * u / 2) || a.cerrada && a.puntos.length > 2 && distSegmento(p, a.puntos[a.puntos.length - 1], a.puntos[0]) <= tol;
		case "franja": {
			const v = visible(f);
			const h = a.tamano * (v.w / 1e3) * 2;
			const y = a.posicion === "inferior" ? v.y + v.h - h : v.y;
			return p.y >= y && p.y <= y + h;
		}
		case "norte": return distancia(p, a) <= a.tamano * u * .7 + tol;
	}
}
/** La anotación más alta bajo el puntero (la última dibujada gana). */
function anotacionEn(f, p, tol, u) {
	const franjas = f.anotaciones.filter((a) => a.tipo === "franja").reverse();
	const resto = f.anotaciones.filter((a) => a.tipo !== "franja").reverse();
	return [...franjas, ...resto].find((a) => golpe(f, a, p, tol, u));
}
/** Asas de una anotación: puntos que se arrastran para cambiar su forma. */
function asasDe(a) {
	switch (a.tipo) {
		case "linea":
		case "flecha":
		case "cota": return a.puntos;
		case "rectangulo":
		case "elipse": return [
			{
				x: a.x,
				y: a.y
			},
			{
				x: a.x + a.w,
				y: a.y
			},
			{
				x: a.x + a.w,
				y: a.y + a.h
			},
			{
				x: a.x,
				y: a.y + a.h
			}
		];
		case "polilinea": return a.puntos;
		default: return [];
	}
}
/** Caja que encierra la anotación (para el marco de selección). */
function cajaDe(f, a, u) {
	switch (a.tipo) {
		case "texto": return cajaTexto(a.x, a.y, a.texto, a.tamano * u);
		case "rectangulo":
		case "elipse": return {
			x: a.x,
			y: a.y,
			w: a.w,
			h: a.h
		};
		case "franja": {
			const v = visible(f);
			const h = a.tamano * (v.w / 1e3) * 2;
			return {
				x: v.x,
				y: a.posicion === "inferior" ? v.y + v.h - h : v.y,
				w: v.w,
				h
			};
		}
		case "norte": {
			const s = a.tamano * u;
			return {
				x: a.x - s * .5,
				y: a.y - s * .7,
				w: s,
				h: s * 1.6
			};
		}
		default: {
			const pts = a.puntos;
			const xs = pts.map((p) => p.x);
			const ys = pts.map((p) => p.y);
			return {
				x: Math.min(...xs),
				y: Math.min(...ys),
				w: Math.max(...xs) - Math.min(...xs),
				h: Math.max(...ys) - Math.min(...ys)
			};
		}
	}
}
function moverAnotacion(a, dx, dy) {
	const m = (p) => ({
		x: p.x + dx,
		y: p.y + dy
	});
	switch (a.tipo) {
		case "texto":
		case "norte":
		case "rectangulo":
		case "elipse": return {
			...a,
			x: a.x + dx,
			y: a.y + dy
		};
		case "linea":
		case "flecha":
		case "cota": return {
			...a,
			puntos: [m(a.puntos[0]), m(a.puntos[1])]
		};
		case "polilinea": return {
			...a,
			puntos: a.puntos.map(m)
		};
		case "franja": return a;
	}
}
/** Arrastra el asa `i` a `p`. En rectángulo y elipse, la esquina opuesta queda fija. */
function moverAsa(a, i, p) {
	switch (a.tipo) {
		case "linea":
		case "flecha":
		case "cota": {
			const pts = [a.puntos[0], a.puntos[1]];
			pts[i] = p;
			return {
				...a,
				puntos: pts
			};
		}
		case "rectangulo":
		case "elipse": {
			const fija = asasDe(a)[(i + 2) % 4];
			return {
				...a,
				x: Math.min(fija.x, p.x),
				y: Math.min(fija.y, p.y),
				w: Math.abs(p.x - fija.x),
				h: Math.abs(p.y - fija.y)
			};
		}
		case "polilinea": return {
			...a,
			puntos: a.puntos.map((q, k) => k === i ? p : q)
		};
		default: return a;
	}
}
/** Figura que nace de un arrastre de `p` a `q`. Un clic sin arrastre crea una figura de tamaño base. */
function crearDesdeArrastre(h, p, q, estilo, tamano, base) {
	const corto = distancia(p, q) < base * .05;
	const fin = corto ? {
		x: p.x + base * .25,
		y: p.y
	} : q;
	const id = idAnot();
	switch (h) {
		case "linea": return {
			id,
			tipo: "linea",
			puntos: [p, fin],
			texto: "",
			tamano,
			extremos: ["ninguno", "ninguno"],
			estilo
		};
		case "flecha": return {
			id,
			tipo: "flecha",
			puntos: [p, fin],
			texto: "",
			tamano,
			extremos: ["ninguno", "flecha"],
			estilo
		};
		case "cota": return {
			id,
			tipo: "cota",
			puntos: [p, fin],
			texto: "0.00 m",
			tamano,
			extremos: ["tope", "tope"],
			estilo
		};
		case "rectangulo":
		case "elipse": {
			const f2 = corto ? {
				x: p.x + base * .25,
				y: p.y + base * .18
			} : q;
			return {
				id,
				tipo: h,
				x: Math.min(p.x, f2.x),
				y: Math.min(p.y, f2.y),
				w: Math.abs(f2.x - p.x),
				h: Math.abs(f2.y - p.y),
				texto: "",
				tamano,
				estilo
			};
		}
		case "texto": return {
			id,
			tipo: "texto",
			x: p.x,
			y: p.y,
			texto: "Texto",
			tamano,
			fondo: false,
			estilo
		};
		default: return null;
	}
}
function duplicar(a, desplazamiento) {
	return {
		...moverAnotacion(a, desplazamiento, desplazamiento),
		id: idAnot()
	};
}
/** Recorte con proporción fija (ancho/alto) o libre, a partir de dos esquinas, dentro de la imagen. */
function recorteDesde(p, q, W, H, proporcion) {
	let x = Math.max(0, Math.min(p.x, q.x));
	let y = Math.max(0, Math.min(p.y, q.y));
	let w = Math.min(W, Math.max(p.x, q.x)) - x;
	let h = Math.min(H, Math.max(p.y, q.y)) - y;
	if (proporcion) {
		if (w / h > proporcion) w = h * proporcion;
		else h = w / proporcion;
		if (q.x < p.x) x = p.x - w;
		if (q.y < p.y) y = p.y - h;
	}
	return {
		x: Math.round(x),
		y: Math.round(y),
		w: Math.max(10, Math.round(w)),
		h: Math.max(10, Math.round(h))
	};
}
//#endregion
//#region src/components/foto/EditorFoto.tsx
var PROPORCION = {
	libre: void 0,
	"4:3": 4 / 3,
	"16:9": 16 / 9,
	"1:1": 1
};
/**
* Editor de una foto: pantalla completa, la foto a la izquierda y el panel a la derecha (Ajustar, Estampa,
* Anotar). Todo cambio es sobre un borrador; "Aplicar" lo guarda como versión nueva. El original nunca
* cambia.
*/
function EditorFoto({ foto, onCerrar, numero }) {
	const src = useUrlFoto(foto.id, "original");
	const [b, setB] = useState(foto);
	const [pasado, setPasado] = useState([]);
	const [futuro, setFuturo] = useState([]);
	const [pestana, setPestana] = useState("anotar");
	const [herramienta, setHerramienta] = useState("mover");
	const [sel, setSel] = useState(null);
	const [estiloNuevo, setEstiloNuevo] = useState({
		...ESTILO_BASE,
		tamano: 30
	});
	const [arrastre, setArrastre] = useState(null);
	const [poli, setPoli] = useState(null);
	const [cursor, setCursor] = useState(null);
	const [verOriginal, setVerOriginal] = useState(false);
	const [zoom, setZoom] = useState(1);
	const [recortando, setRecortando] = useState(false);
	const [proporcion, setProporcion] = useState("libre");
	const [recorteTemp, setRecorteTemp] = useState();
	const [confirmar, setConfirmar] = useState(null);
	const [guardando, setGuardando] = useState(false);
	const [error, setError] = useState(null);
	const svgRef = useRef(null);
	const observador = useRef(null);
	const cajaRef = useCallback((el) => {
		observador.current?.disconnect();
		if (!el) return;
		observador.current = new ResizeObserver(([e]) => setCajaTam({
			w: e.contentRect.width,
			h: e.contentRect.height
		}));
		observador.current.observe(el);
	}, []);
	const [cajaTam, setCajaTam] = useState({
		w: 800,
		h: 600
	});
	const marcaPorDefecto = useMemo(() => leerConfigFotos(foto.proyecto).marcaAgua, [foto.proyecto]);
	const tactil = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;
	const u = unidad(b);
	const seleccion = b.anotaciones.find((a) => a.id === sel);
	const sucio = pasado.length > 0;
	const vistaFoto = recortando ? {
		...b,
		ajustes: {
			...b.ajustes,
			recorte: void 0
		}
	} : b;
	const v = visible(vistaFoto);
	useEffect(() => () => observador.current?.disconnect(), []);
	const ajuste = Math.min((cajaTam.w - 24) / v.w, (cajaTam.h - 24) / v.h);
	const anchoSvg = Math.max(50, v.w * ajuste * zoom);
	const altoSvg = Math.max(50, v.h * ajuste * zoom);
	/** Cambia el borrador guardando el estado anterior para deshacer. */
	const cambiar = useCallback((nuevo, anterior) => {
		setB((x) => {
			const n = typeof nuevo === "function" ? nuevo(x) : nuevo;
			setPasado((p) => [...p.slice(-80), anterior ?? x]);
			setFuturo([]);
			return n;
		});
	}, []);
	const deshacer = () => {
		setPasado((p) => {
			if (!p.length) return p;
			setFuturo((f) => [b, ...f]);
			setB(p[p.length - 1]);
			return p.slice(0, -1);
		});
	};
	const rehacer = () => {
		setFuturo((f) => {
			if (!f.length) return f;
			setPasado((p) => [...p, b]);
			setB(f[0]);
			return f.slice(1);
		});
	};
	const editarAnotacion = (id, cambios) => cambiar((x) => ({
		...x,
		anotaciones: x.anotaciones.map((a) => a.id === id ? {
			...a,
			...cambios
		} : a)
	}));
	const agregar = (a) => {
		cambiar((x) => ({
			...x,
			anotaciones: [...x.anotaciones, a]
		}));
		setSel(a.id);
		setHerramienta("mover");
	};
	const eliminar = (id) => {
		cambiar((x) => ({
			...x,
			anotaciones: x.anotaciones.filter((a) => a.id !== id),
			escala: x.escala?.anotacion === id ? void 0 : x.escala
		}));
		setSel(null);
	};
	const terminarPoli = useCallback(() => {
		if (poli && poli.length >= 2) agregar({
			id: idAnot(),
			tipo: "polilinea",
			puntos: poli,
			cerrada: poli.length >= 3,
			texto: "",
			tamano: estiloNuevo.tamano,
			estilo: { ...estiloNuevo }
		});
		setPoli(null);
	}, [poli, estiloNuevo]);
	const tolerancia = () => (tactil ? 18 : 9) / escalaPantalla(svgRef.current);
	function alPresionar(e) {
		if (!svgRef.current || verOriginal) return;
		const p = aCoordenadas(svgRef.current, e.clientX, e.clientY);
		svgRef.current.setPointerCapture(e.pointerId);
		if (pestana === "ajustar" && recortando) {
			setArrastre({
				modo: "recorte",
				inicio: p,
				actual: p
			});
			return;
		}
		if (pestana !== "anotar") return;
		if (herramienta === "polilinea") {
			setPoli((pts) => [...pts ?? [], p]);
			return;
		}
		if (herramienta === "mover") {
			const tol = tolerancia();
			if (seleccion) {
				const i = asasDe(seleccion).findIndex((q) => distancia(q, p) <= tol * 1.4);
				if (i >= 0) {
					setArrastre({
						modo: "asa",
						id: seleccion.id,
						indice: i,
						antes: b
					});
					return;
				}
			}
			const a = anotacionEn(b, p, tol, u);
			setSel(a?.id ?? null);
			if (a) setArrastre({
				modo: "mover",
				id: a.id,
				inicio: p,
				base: a,
				antes: b
			});
			return;
		}
		if (herramienta === "texto") {
			const t = crearDesdeArrastre("texto", p, p, { ...estiloNuevo }, estiloNuevo.tamano, v.w);
			if (t) agregar(t);
			return;
		}
		setArrastre({
			modo: "crear",
			inicio: p,
			actual: p
		});
	}
	function alMover(e) {
		if (!svgRef.current) return;
		const p = aCoordenadas(svgRef.current, e.clientX, e.clientY);
		if (poli) setCursor(p);
		if (!arrastre) return;
		if (arrastre.modo === "crear" || arrastre.modo === "recorte") {
			setArrastre({
				...arrastre,
				actual: p
			});
			if (arrastre.modo === "recorte") {
				const { W, H } = dimensiones(b);
				setRecorteTemp(recorteDesde(arrastre.inicio, p, W, H, PROPORCION[proporcion]));
			}
			return;
		}
		if (arrastre.modo === "mover") {
			const movida = moverAnotacion(arrastre.base, p.x - arrastre.inicio.x, p.y - arrastre.inicio.y);
			setB((x) => ({
				...x,
				anotaciones: x.anotaciones.map((a) => a.id === arrastre.id ? movida : a)
			}));
			return;
		}
		if (arrastre.modo === "asa") setB((x) => ({
			...x,
			anotaciones: x.anotaciones.map((a) => a.id === arrastre.id ? moverAsa(a, arrastre.indice, p) : a)
		}));
	}
	function alSoltar() {
		if (!arrastre) return;
		if (arrastre.modo === "crear") {
			const a = crearDesdeArrastre(herramienta, arrastre.inicio, arrastre.actual, { ...estiloNuevo }, estiloNuevo.tamano, v.w);
			if (a) agregar(a);
		} else if (arrastre.modo === "mover" || arrastre.modo === "asa") {
			if (JSON.stringify(arrastre.antes.anotaciones) !== JSON.stringify(b.anotaciones)) {
				setPasado((p) => [...p.slice(-80), arrastre.antes]);
				setFuturo([]);
			}
		}
		setArrastre(null);
	}
	useEffect(() => {
		const tecla = (e) => {
			const el = e.target;
			if (el && (el.isContentEditable || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.tagName === "INPUT" && ![
				"checkbox",
				"radio",
				"range",
				"button",
				"file"
			].includes(el.type))) return;
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
				e.preventDefault();
				if (e.shiftKey) rehacer();
				else deshacer();
			} else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
				e.preventDefault();
				rehacer();
			} else if ((e.key === "Delete" || e.key === "Backspace") && sel) {
				e.preventDefault();
				eliminar(sel);
			} else if (e.key === "Enter" && poli) terminarPoli();
			else if (sel && e.key.startsWith("Arrow")) {
				e.preventDefault();
				const paso = (e.shiftKey ? 10 : 1) / escalaPantalla(svgRef.current);
				const dx = e.key === "ArrowLeft" ? -paso : e.key === "ArrowRight" ? paso : 0;
				const dy = e.key === "ArrowUp" ? -paso : e.key === "ArrowDown" ? paso : 0;
				cambiar((x) => ({
					...x,
					anotaciones: x.anotaciones.map((a) => a.id === sel ? moverAnotacion(a, dx, dy) : a)
				}));
			}
		};
		window.addEventListener("keydown", tecla);
		return () => window.removeEventListener("keydown", tecla);
	});
	const estiloVisible = seleccion ? {
		...seleccion.estilo,
		tamano: seleccion.tamano
	} : estiloNuevo;
	function cambiarEstilo(c) {
		const { tamano, ...est } = c;
		if (seleccion) editarAnotacion(seleccion.id, {
			estilo: {
				...seleccion.estilo,
				...est
			},
			...tamano != null ? { tamano } : {}
		});
		else setEstiloNuevo((x) => ({
			...x,
			...c
		}));
	}
	function overlay(o) {
		if (o === "marca_agua") {
			cambiar((x) => ({
				...x,
				marcaAgua: {
					...x.marcaAgua ?? marcaPorDefecto,
					visible: true
				}
			}));
			return;
		}
		const a = anotacionDeOverlay(b, o);
		if (a) agregar(a);
	}
	function referencia(usar) {
		if (!seleccion || seleccion.tipo !== "cota") return;
		if (!usar) return cambiar((x) => ({
			...x,
			escala: void 0
		}));
		const m = metrosDeTexto(seleccion.texto);
		const px = distancia(seleccion.puntos[0], seleccion.puntos[1]);
		if (!m || px < 1) {
			setError("Escriba en la cota una medida en metros (por ejemplo 2.60 m) antes de usarla como referencia.");
			return;
		}
		setError(null);
		cambiar((x) => ({
			...x,
			escala: {
				anotacion: seleccion.id,
				metrosPorPx: m / px
			}
		}));
	}
	function rotar(sentido) {
		cambiar((x) => {
			let anot = x.anotaciones;
			let rot = x.ajustes.rotacion;
			const veces = sentido === 1 ? 1 : 3;
			let actual = x;
			for (let i = 0; i < veces; i++) {
				const { W, H } = dimensiones(actual);
				anot = girarAnotaciones(anot, W, H);
				rot = (rot + 90) % 360;
				actual = {
					...actual,
					anotaciones: anot,
					ajustes: {
						...actual.ajustes,
						rotacion: rot
					}
				};
			}
			return {
				...actual,
				ajustes: {
					...actual.ajustes,
					recorte: void 0
				}
			};
		});
	}
	function alternarRecorte() {
		if (recortando) {
			if (recorteTemp) cambiar((x) => ({
				...x,
				ajustes: {
					...x.ajustes,
					recorte: recorteTemp
				}
			}));
			setRecortando(false);
			setRecorteTemp(void 0);
		} else {
			setRecorteTemp(b.ajustes.recorte);
			setRecortando(true);
		}
	}
	function metadatos(m) {
		cambiar((x) => {
			const nuevo = {
				...x.metadatos,
				...m
			};
			const leido = nuevo.leido;
			const corregidos = [
				"fecha",
				"hora",
				"utm"
			].filter((k) => leido[k] != null && nuevo[k] !== leido[k]);
			return {
				...x,
				metadatos: {
					...nuevo,
					corregidos,
					origen: corregidos.length ? "manual" : x.metadatos.origen === "sin_datos" && (nuevo.fecha || nuevo.utm) ? "manual" : x.metadatos.origen
				}
			};
		});
	}
	async function aplicar() {
		setGuardando(true);
		setError(null);
		try {
			const partes = [
				b.anotaciones.length !== foto.anotaciones.length && `${b.anotaciones.length} anotaciones`,
				JSON.stringify(b.estampa) !== JSON.stringify(foto.estampa) && "estampa",
				JSON.stringify(b.marcaAgua) !== JSON.stringify(foto.marcaAgua) && "marca de agua",
				JSON.stringify(b.ajustes) !== JSON.stringify(foto.ajustes) && "ajustes",
				JSON.stringify(b.metadatos) !== JSON.stringify(foto.metadatos) && "datos de la toma"
			].filter(Boolean);
			onCerrar(await aplicarEdicion(b, "Editó la foto", `${b.titulo}${partes.length ? `: ${partes.join(", ")}` : ""}`));
		} catch (e) {
			setError(e.message || "No se pudo guardar la edición.");
		} finally {
			setGuardando(false);
		}
	}
	function restablecer() {
		cambiar((x) => ({
			...x,
			ajustes: ajustesBase(),
			estampa: null,
			marcaAgua: null,
			anotaciones: [],
			escala: void 0
		}));
		setSel(null);
	}
	const esc = escalaPantalla(svgRef.current) || ajuste * zoom;
	const radio = (tactil ? 14 : 7) / esc;
	const linea = 1.5 / esc;
	const capa = /* @__PURE__ */ jsxs("g", {
		pointerEvents: "none",
		children: [
			seleccion && !verOriginal && (() => {
				const c = cajaDe(b, seleccion, u);
				return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("rect", {
					x: c.x - 4 / esc,
					y: c.y - 4 / esc,
					width: c.w + 8 / esc,
					height: c.h + 8 / esc,
					fill: "none",
					stroke: "rgb(37, 99, 235)",
					strokeWidth: linea,
					strokeDasharray: `${6 / esc} ${4 / esc}`
				}), asasDe(seleccion).map((q, i) => /* @__PURE__ */ jsx("circle", {
					cx: q.x,
					cy: q.y,
					r: radio,
					fill: "rgb(255, 255, 255)",
					stroke: "rgb(37, 99, 235)",
					strokeWidth: linea * 1.5
				}, i))] });
			})(),
			arrastre?.modo === "crear" && /* @__PURE__ */ jsx("rect", {
				x: Math.min(arrastre.inicio.x, arrastre.actual.x),
				y: Math.min(arrastre.inicio.y, arrastre.actual.y),
				width: Math.abs(arrastre.actual.x - arrastre.inicio.x),
				height: Math.abs(arrastre.actual.y - arrastre.inicio.y),
				fill: "none",
				stroke: "rgb(37, 99, 235)",
				strokeWidth: linea,
				strokeDasharray: `${4 / esc} ${4 / esc}`
			}),
			poli && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("polyline", {
				points: [...poli, ...cursor ? [cursor] : []].map((p) => `${p.x},${p.y}`).join(" "),
				fill: "none",
				stroke: "rgb(37, 99, 235)",
				strokeWidth: linea * 2,
				strokeDasharray: `${6 / esc} ${4 / esc}`
			}), poli.map((p, i) => /* @__PURE__ */ jsx("circle", {
				cx: p.x,
				cy: p.y,
				r: radio * .7,
				fill: "rgb(255, 255, 255)",
				stroke: "rgb(37, 99, 235)",
				strokeWidth: linea
			}, i))] }),
			recortando && recorteTemp && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("path", {
				d: `M${v.x},${v.y}h${v.w}v${v.h}h${-v.w}z M${recorteTemp.x},${recorteTemp.y}v${recorteTemp.h}h${recorteTemp.w}v${-recorteTemp.h}z`,
				fill: "rgb(0, 0, 0)",
				fillOpacity: .5,
				fillRule: "evenodd"
			}), /* @__PURE__ */ jsx("rect", {
				x: recorteTemp.x,
				y: recorteTemp.y,
				width: recorteTemp.w,
				height: recorteTemp.h,
				fill: "none",
				stroke: "rgb(255, 255, 255)",
				strokeWidth: linea * 2
			})] })
		]
	});
	const cursorCss = pestana === "anotar" && herramienta !== "mover" ? "crosshair" : recortando ? "crosshair" : "default";
	return /* @__PURE__ */ jsx(Dialog, {
		open: true,
		onOpenChange: (abierto) => {
			if (abierto) return;
			if (poli) return setPoli(null);
			if (sucio) setConfirmar("cancelar");
			else onCerrar();
		},
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "left-0 top-0 flex h-[100dvh] max-h-none w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 p-0 sm:max-w-none lg:flex-row [&>button.absolute]:hidden",
			onPointerDownOutside: (e) => e.preventDefault(),
			children: [
				/* @__PURE__ */ jsxs(DialogTitle, {
					className: "sr-only",
					children: ["Editar foto ", foto.titulo]
				}),
				/* @__PURE__ */ jsx(DialogDescription, {
					className: "sr-only",
					children: "Editor de fotos: la foto original no se modifica."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative flex min-h-0 min-w-0 flex-1 flex-col bg-foreground",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-1 px-3 py-2 text-primary-foreground",
						"data-print-hidden": true,
						children: [
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: deshacer,
								disabled: !pasado.length,
								title: "Deshacer (Ctrl+Z)",
								children: [/* @__PURE__ */ jsx(Undo2, {}), /* @__PURE__ */ jsx("span", {
									className: "sr-only",
									children: "Deshacer"
								})]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: rehacer,
								disabled: !futuro.length,
								title: "Rehacer (Ctrl+Y)",
								children: [/* @__PURE__ */ jsx(Redo2, {}), /* @__PURE__ */ jsx("span", {
									className: "sr-only",
									children: "Rehacer"
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mx-1 h-5 w-px bg-primary-foreground/30",
								"aria-hidden": true
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: () => setZoom((z) => Math.max(.5, +(z - .25).toFixed(2))),
								title: "Alejar",
								children: [/* @__PURE__ */ jsx(Minus, {}), /* @__PURE__ */ jsx("span", {
									className: "sr-only",
									children: "Alejar"
								})]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "w-12 text-center text-xs tabular-nums",
								children: [Math.round(zoom * 100), " %"]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: () => setZoom((z) => Math.min(4, +(z + .25).toFixed(2))),
								title: "Acercar",
								children: [/* @__PURE__ */ jsx(Plus, {}), /* @__PURE__ */ jsx("span", {
									className: "sr-only",
									children: "Acercar"
								})]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								size: "sm",
								variant: "secondary",
								onClick: () => setZoom(1),
								title: "Ajustar a la ventana",
								children: [/* @__PURE__ */ jsx(Scan, {}), /* @__PURE__ */ jsx("span", {
									className: "sr-only",
									children: "Ajustar"
								})]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "ml-auto truncate text-xs text-primary-foreground/80",
								children: [
									foto.original.ancho,
									" × ",
									foto.original.alto,
									" px · ",
									foto.original.nombre
								]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						ref: cajaRef,
						className: "relative min-h-[40vh] min-w-0 flex-1",
						children: /* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 flex overflow-auto",
							children: src ? /* @__PURE__ */ jsx("div", {
								className: "m-auto p-3",
								children: /* @__PURE__ */ jsx(FotoSvg, {
									foto: vistaFoto,
									src,
									refSvg: svgRef,
									verOriginal,
									style: {
										width: anchoSvg,
										height: altoSvg,
										touchAction: "none",
										cursor: cursorCss,
										display: "block"
									},
									onPointerDown: alPresionar,
									onPointerMove: alMover,
									onPointerUp: alSoltar,
									onDoubleClick: () => poli && terminarPoli(),
									children: capa
								})
							}) : /* @__PURE__ */ jsx("p", {
								className: "m-auto text-sm text-primary-foreground/80",
								children: "Cargando la foto…"
							})
						})
					})]
				}),
				/* @__PURE__ */ jsxs("aside", {
					className: "flex max-h-[55dvh] w-full shrink-0 flex-col border-l border-border bg-card lg:max-h-none lg:w-[380px]",
					children: [
						/* @__PURE__ */ jsxs("header", {
							className: "flex items-start justify-between gap-2 border-b border-border px-4 py-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-lg font-semibold text-foreground",
									children: "Editar foto"
								}), /* @__PURE__ */ jsxs("p", {
									className: "truncate text-xs text-muted-foreground",
									children: [
										numero ? `Foto ${String(numero).padStart(2, "0")} · ` : "",
										b.titulo,
										" · la foto original no se modifica"
									]
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Cerrar el editor",
								onClick: () => sucio ? setConfirmar("cancelar") : onCerrar(),
								className: "rounded-sm text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ jsx(X, { size: 18 })
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "px-4 pt-3",
							children: /* @__PURE__ */ jsx("div", {
								className: "flex rounded-md border border-border bg-muted p-0.5",
								role: "tablist",
								"aria-label": "Edición",
								children: [
									["ajustar", "Ajustar"],
									["estampa", "Estampa"],
									["anotar", "Anotar"]
								].map(([k, t]) => /* @__PURE__ */ jsx("button", {
									type: "button",
									role: "tab",
									"aria-selected": pestana === k,
									onClick: () => {
										setPestana(k);
										setPoli(null);
										if (k !== "ajustar" && recortando) {
											setRecortando(false);
											setRecorteTemp(void 0);
										}
									},
									className: `flex-1 rounded-sm px-2 py-1.5 text-sm font-medium ${pestana === k ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`,
									children: t
								}, k))
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-h-0 flex-1 overflow-y-auto",
							children: [
								error && /* @__PURE__ */ jsx("p", {
									role: "alert",
									className: "mx-4 mt-3 rounded-md border border-destructive bg-destructive-soft px-2 py-1 text-xs text-destructive",
									children: error
								}),
								pestana === "ajustar" && /* @__PURE__ */ jsx(PanelAjustar, {
									foto: b,
									onAjustes: (a) => cambiar((x) => ({
										...x,
										ajustes: {
											...x.ajustes,
											...a
										}
									})),
									onRotar: rotar,
									recortando,
									proporcion,
									onProporcion: setProporcion,
									onRecortar: alternarRecorte,
									onQuitarRecorte: () => cambiar((x) => ({
										...x,
										ajustes: {
											...x.ajustes,
											recorte: void 0
										}
									}))
								}),
								pestana === "estampa" && /* @__PURE__ */ jsx(PanelEstampa, {
									foto: b,
									onMetadatos: metadatos,
									onEstampa: (e) => cambiar((x) => ({
										...x,
										estampa: e
									})),
									onMarcaAgua: (m) => cambiar((x) => ({
										...x,
										marcaAgua: m
									})),
									onTitulo: (t) => cambiar((x) => ({
										...x,
										titulo: t
									})),
									onRecalcularUtm: () => b.metadatos.lat != null && b.metadatos.lon != null && metadatos({ utm: utmTexto(aUtm(b.metadatos.lat, b.metadatos.lon)) }),
									marcaPorDefecto
								}),
								pestana === "anotar" && /* @__PURE__ */ jsx(PanelAnotar, {
									foto: b,
									herramienta,
									onHerramienta: (h) => {
										setHerramienta(h);
										setPoli(null);
										if (h !== "mover") setSel(null);
									},
									seleccion,
									estilo: estiloVisible,
									onEstilo: cambiarEstilo,
									onAnotacion: (c) => seleccion && editarAnotacion(seleccion.id, c),
									onDuplicar: () => seleccion && agregar(duplicar(seleccion, v.w * .03)),
									onAlFrente: () => seleccion && cambiar((x) => ({
										...x,
										anotaciones: [...x.anotaciones.filter((a) => a.id !== seleccion.id), seleccion]
									})),
									onEliminar: () => seleccion && eliminar(seleccion.id),
									onOverlay: overlay,
									onReferencia: referencia,
									dibujandoPoli: Boolean(poli),
									onTerminarPoli: terminarPoli
								}),
								/* @__PURE__ */ jsx(Grupo, {
									titulo: "Acciones",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											size: "sm",
											onClick: deshacer,
											disabled: !pasado.length,
											children: [/* @__PURE__ */ jsx(Undo2, {}), " Deshacer"]
										}), /* @__PURE__ */ jsx(Button, {
											type: "button",
											variant: "link",
											size: "sm",
											className: "text-destructive",
											disabled: !b.anotaciones.length,
											onClick: () => setConfirmar("quitar"),
											children: "Quitar todas"
										})]
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("footer", {
							className: "flex flex-wrap items-center gap-2 border-t border-border px-4 py-3",
							children: [
								/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									"aria-pressed": verOriginal,
									onClick: () => setVerOriginal((x) => !x),
									title: "Muestra la foto sin ediciones",
									children: [
										/* @__PURE__ */ jsx(Eye, {}),
										" ",
										verOriginal ? "Ver editada" : "Ver original"
									]
								}),
								/* @__PURE__ */ jsx(Button, {
									type: "button",
									variant: "link",
									size: "sm",
									onClick: () => setConfirmar("restablecer"),
									children: "Restablecer"
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "ml-auto flex gap-2",
									children: [/* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										onClick: () => sucio ? setConfirmar("cancelar") : onCerrar(),
										children: "Cancelar"
									}), /* @__PURE__ */ jsx(Button, {
										type: "button",
										onClick: aplicar,
										disabled: guardando || !sucio,
										children: guardando ? "Guardando…" : "Aplicar"
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsx(Confirmar, {
					abierto: confirmar !== null,
					onCerrar: () => setConfirmar(null),
					titulo: confirmar === "cancelar" ? "Descartar cambios" : confirmar === "restablecer" ? "Restablecer la foto" : "Quitar todas las anotaciones",
					texto: confirmar === "cancelar" ? "Los cambios sin aplicar se pierden. La foto queda como estaba." : confirmar === "restablecer" ? "Se quitan ajustes, recorte, estampa, marca de agua y anotaciones. Puede deshacerlo antes de aplicar." : "Se quitan todas las anotaciones de la foto. Puede deshacerlo antes de aplicar.",
					accion: confirmar === "cancelar" ? "Descartar" : confirmar === "restablecer" ? "Restablecer" : "Quitar todas",
					onConfirmar: () => {
						if (confirmar === "cancelar") onCerrar();
						else if (confirmar === "restablecer") restablecer();
						else {
							cambiar((x) => ({
								...x,
								anotaciones: [],
								escala: void 0
							}));
							setSel(null);
						}
						setConfirmar(null);
					}
				})
			]
		})
	});
}
//#endregion
//#region src/components/foto/CampoFoto.tsx
var ETIQUETAS = {
	titulo: "Título",
	metadatos: "Datos de la toma",
	fecha: "Fecha",
	hora: "Hora",
	utm: "UTM",
	km: "Progresiva",
	ajustes: "Ajustes",
	rotacion: "Rotación",
	recorte: "Recorte",
	brillo: "Brillo",
	contraste: "Contraste",
	estampa: "Estampa",
	marcaAgua: "Marca de agua",
	anotaciones: "Anotación",
	texto: "Texto",
	estilo: "Estilo",
	version: "Versión",
	escala: "Escala"
};
/**
* Campo de fotos de una pantalla: carga (clic o arrastrar, varias a la vez), galería con miniaturas ya
* editadas, y por foto Editar, Ver, Descargar (editada u original), Historial y Quitar (con motivo).
* Lee los metadatos al subir y aplica la estampa del proyecto (docs/PLAN-EDITOR-FOTOS.md §6).
*/
function CampoFoto({ contexto, etiqueta, multiple = true, maximo, soloLectura }) {
	const rol = useRol();
	const todas = useFotos();
	const fotos = useMemo(() => fotosDe(todas, {
		predio: contexto.predio,
		pantalla: contexto.pantalla,
		seccion: contexto.seccion,
		registro: contexto.registro,
		campo: contexto.campo
	}), [
		todas,
		contexto.predio,
		contexto.pantalla,
		contexto.seccion,
		contexto.registro,
		contexto.campo
	]);
	const edita = !soloLectura && (tienePermiso(rol, contexto.modulo, "Edición") || rol === "COORDINADOR" || rol === "BRIGADISTA");
	const restaura = rol === "ADMIN" || rol === "COORDINADOR";
	const input = useRef(null);
	const [subiendo, setSubiendo] = useState(null);
	const [errores, setErrores] = useState([]);
	const [encima, setEncima] = useState(false);
	const [editando, setEditando] = useState(null);
	const [viendo, setViendo] = useState(null);
	const [historial, setHistorial] = useState(null);
	const [quitar, setQuitar] = useState(null);
	const [motivo, setMotivo] = useState("");
	const lleno = maximo != null && fotos.length >= maximo;
	const rotulo = etiqueta ?? contexto.campo;
	async function subir(lista) {
		const archivos = [...lista].slice(0, maximo != null ? Math.max(0, maximo - fotos.length) : void 0);
		if (!archivos.length) return;
		const fallas = [];
		for (let i = 0; i < archivos.length; i++) {
			setSubiendo(`Subiendo ${i + 1} de ${archivos.length}…`);
			try {
				await subirFoto(archivos[i], contexto, archivos.length > 1 || fotos.length ? `${contexto.campo} ${fotos.length + i + 1}` : contexto.campo);
			} catch (e) {
				fallas.push(e.message);
			}
		}
		setSubiendo(null);
		setErrores(fallas);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0",
		children: [
			edita && !lleno && /* @__PURE__ */ jsxs("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setEncima(true);
				},
				onDragLeave: () => setEncima(false),
				onDrop: (e) => {
					e.preventDefault();
					setEncima(false);
					subir(e.dataTransfer.files);
				},
				className: `flex flex-wrap items-center gap-2 rounded-md border border-dashed px-3 py-2 text-sm ${encima ? "border-primary bg-primary-soft" : "border-border bg-background"}`,
				children: [
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => input.current?.click(),
						disabled: Boolean(subiendo),
						children: [
							/* @__PURE__ */ jsx(ImagePlus, {}),
							" ",
							multiple ? "Subir fotos" : "Subir foto"
						]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: subiendo ?? `o arrastre aquí. JPG o PNG hasta 15 MB${maximo ? ` · máximo ${maximo}` : ""}.`
					}),
					/* @__PURE__ */ jsx("input", {
						ref: input,
						type: "file",
						accept: "image/*,.heic,.heif",
						multiple,
						className: "sr-only",
						"aria-label": `Subir ${rotulo}`,
						onChange: (e) => {
							if (e.target.files) subir(e.target.files);
							e.target.value = "";
						}
					})
				]
			}),
			errores.length > 0 && /* @__PURE__ */ jsx("ul", {
				role: "alert",
				className: "mt-1 list-disc pl-5 text-xs text-destructive",
				children: errores.map((e) => /* @__PURE__ */ jsx("li", { children: e }, e))
			}),
			fotos.length === 0 ? !edita && /* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Sin fotos.",
					" ",
					!soloLectura && `Su perfil (${ROLES[rol]}) solo puede ver las fotos de esta pantalla; las suben quienes la editan, el Coordinador y la Brigada.`
				]
			}) : /* @__PURE__ */ jsx("ul", {
				className: "mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4",
				children: fotos.map((f, i) => /* @__PURE__ */ jsx(Miniatura, {
					foto: f,
					numero: i + 1,
					edita,
					onEditar: () => setEditando(f),
					onVer: () => setViendo(f),
					onHistorial: () => setHistorial(f),
					onQuitar: () => {
						setMotivo("");
						setQuitar(f);
					}
				}, f.id))
			}),
			editando && /* @__PURE__ */ jsx(EditorFoto, {
				foto: editando,
				numero: fotos.findIndex((f) => f.id === editando.id) + 1,
				onCerrar: () => setEditando(null)
			}, editando.id),
			viendo && /* @__PURE__ */ jsx(VisorFoto, {
				foto: fotos.find((f) => f.id === viendo.id) ?? viendo,
				onCerrar: () => setViendo(null),
				onEditar: edita ? () => {
					setEditando(fotos.find((f) => f.id === viendo.id) ?? viendo);
					setViendo(null);
				} : void 0
			}),
			/* @__PURE__ */ jsx(Modal, {
				abierto: historial !== null,
				onCerrar: () => setHistorial(null),
				ancho: "xl",
				titulo: `Historial: ${historial?.titulo ?? ""}`,
				descripcion: "Cada subida, edición y corrección de datos, con quién y cuándo. El original nunca cambia.",
				children: historial && /* @__PURE__ */ jsx(Historico, {
					registro: `foto-${historial.id}`,
					etiquetas: ETIQUETAS,
					nombreArchivo: `historico-foto-${historial.id}`,
					puedeRestaurar: restaura && edita,
					onRestaurar: (r, n) => {
						aplicarEdicion({
							...r,
							id: historial.id
						}, "Restauró una versión anterior", `versión ${n}`);
						setHistorial(null);
					}
				})
			}),
			/* @__PURE__ */ jsxs(Modal, {
				abierto: quitar !== null,
				onCerrar: () => setQuitar(null),
				ancho: "sm",
				titulo: "Quitar foto",
				descripcion: `«${quitar?.titulo ?? ""}» sale del expediente. El histórico conserva sus datos y el motivo.`,
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setQuitar(null),
					children: "Cancelar"
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "destructive",
					disabled: motivo.trim().length < 5,
					onClick: () => {
						if (quitar) quitarFoto(quitar, motivo.trim());
						setQuitar(null);
					},
					children: [/* @__PURE__ */ jsx(Trash2, {}), " Quitar foto"]
				})] }),
				children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: "motivo-quitar-foto",
					className: "mb-1 block text-sm font-medium",
					children: ["Motivo ", /* @__PURE__ */ jsx("span", {
						className: "text-destructive",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("textarea", {
					id: "motivo-quitar-foto",
					rows: 3,
					className: `${controlClase} h-auto py-2`,
					value: motivo,
					onChange: (e) => setMotivo(e.target.value),
					placeholder: "Por ejemplo: foto duplicada; no corresponde al predio"
				})]
			})
		]
	});
}
function Miniatura({ foto, numero, edita, onEditar, onVer, onHistorial, onQuitar }) {
	const url = useUrlFoto(foto.id, "miniatura");
	const fecha = foto.metadatos.fecha ? foto.metadatos.fecha.split("-").reverse().join("/") : "Sin fecha";
	return /* @__PURE__ */ jsxs("li", {
		className: "overflow-hidden rounded-md border border-border bg-card",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: edita ? onEditar : onVer,
			className: "block w-full bg-muted",
			title: edita ? "Editar foto" : "Ver foto",
			children: url ? /* @__PURE__ */ jsx("img", {
				src: url,
				alt: foto.titulo,
				className: "aspect-[4/3] w-full object-cover"
			}) : /* @__PURE__ */ jsx("span", {
				className: "flex aspect-[4/3] w-full items-center justify-center text-muted-foreground",
				children: /* @__PURE__ */ jsx(Camera, {
					size: 20,
					"aria-hidden": true
				})
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "px-2 py-1.5",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "truncate text-xs font-medium text-foreground",
					title: foto.titulo,
					children: [
						String(numero).padStart(2, "0"),
						". ",
						foto.titulo
					]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "flex items-center gap-1 text-xs text-muted-foreground",
					children: [
						fecha,
						foto.version > 1 && /* @__PURE__ */ jsxs("span", { children: ["· v", foto.version] }),
						foto.estampa?.visible && /* @__PURE__ */ jsx(Stamp, {
							size: 12,
							"aria-label": "Con estampa"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-1 flex flex-wrap gap-0.5",
					children: [
						edita && /* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Editar foto",
							icono: Pencil,
							onClick: onEditar
						}),
						/* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Ver foto",
							icono: Eye,
							onClick: onVer
						}),
						/* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Descargar foto editada",
							icono: Download,
							onClick: async () => {
								const b = await descargarFoto(foto, "editada");
								if (b) descargarBlob(nombreArchivoFoto(foto, "editada"), b);
							}
						}),
						/* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Historial de la foto",
							icono: History,
							onClick: onHistorial
						}),
						edita && /* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Quitar foto",
							icono: Trash2,
							destructiva: true,
							onClick: onQuitar
						})
					]
				})
			]
		})]
	});
}
/** Visor: la foto editada a todo el ancho, sus datos y las descargas. */
function VisorFoto({ foto, onCerrar, onEditar }) {
	const src = useUrlFoto(foto.id, "original");
	const [original, setOriginal] = useState(false);
	const m = foto.metadatos;
	const datos = [
		["Fecha y hora", [m.fecha && m.fecha.split("-").reverse().join("/"), m.hora].filter(Boolean).join(" ") || "Sin dato"],
		["Coordenadas", m.utm || "Sin dato"],
		["Progresiva", m.km ? `km ${m.km}` : "Sin dato"],
		["Cámara", m.camara || "Sin dato"],
		["Origen de los datos", m.origen === "exif" ? "Leídos de la foto" : m.origen === "manual" ? `Corregidos a mano (${m.corregidos.join(", ") || "datos"})` : "La foto no traía datos"],
		["Archivo", `${foto.original.nombre} · ${foto.original.ancho} × ${foto.original.alto} px`],
		["Subida", `${fechaHora(foto.original.subidoEl)} por ${foto.original.subidoPor}`],
		["Versión", `${foto.version} · ${fechaHora(foto.modificadoEl)} por ${foto.modificadoPor}`]
	];
	const descargar = async (cual) => {
		const b = await descargarFoto(foto, cual);
		if (b) descargarBlob(nombreArchivoFoto(foto, cual), b);
	};
	return /* @__PURE__ */ jsx(Modal, {
		abierto: true,
		onCerrar,
		ancho: "xl",
		titulo: foto.titulo,
		descripcion: `${foto.seccion}${foto.registro ? ` · ${foto.registro}` : ""} · ${foto.campo}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setOriginal((x) => !x),
				"aria-pressed": original,
				children: [
					/* @__PURE__ */ jsx(Eye, {}),
					" ",
					original ? "Ver editada" : "Ver original"
				]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => void descargar("original"),
				children: [/* @__PURE__ */ jsx(Download, {}), " Original"]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				onClick: () => void descargar("editada"),
				children: [/* @__PURE__ */ jsx(Download, {}), " Editada"]
			}),
			onEditar && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: onEditar,
				children: [/* @__PURE__ */ jsx(Pencil, {}), " Editar"]
			})
		] }),
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-center rounded-md bg-foreground p-2",
				children: src ? /* @__PURE__ */ jsx(FotoSvg, {
					foto,
					src,
					verOriginal: original,
					style: {
						width: "100%",
						height: "auto",
						maxHeight: "60vh",
						display: "block"
					}
				}) : /* @__PURE__ */ jsx("p", {
					className: "py-10 text-sm text-primary-foreground/80",
					children: "Cargando…"
				})
			}), /* @__PURE__ */ jsx("dl", {
				className: "space-y-2 text-sm",
				children: datos.map(([k, val]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
					className: "text-xs font-semibold uppercase text-muted-foreground",
					children: k
				}), /* @__PURE__ */ jsx("dd", {
					className: "break-words text-foreground",
					children: val
				})] }, k))
			})]
		})
	});
}
//#endregion
export { BotonPanelFotografico as n, CampoFoto as t };
