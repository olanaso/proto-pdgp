import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { i as registrarVersion, o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.levantamiento-informacion-tecnica_.partidas-registrales-CRcZvGOS.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, Download, Eye, FileDown, FileSpreadsheet, History, Landmark, LoaderCircle, Search, Trash2, X, ZoomIn, ZoomOut } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.levantamiento-informacion-tecnica_.partidas-registrales.tsx?tsr-split=component
var offices = [
	"CHIMBOTE",
	"AREQUIPA",
	"CAJAMARCA",
	"CUSCO",
	"HUANCAYO",
	"IQUITOS",
	"LIMA",
	"PIURA",
	"TRUJILLO"
];
var addressByOffice = {
	CHIMBOTE: "AV. JOSÉ PARDO N.° 1010 - CHIMBOTE",
	AREQUIPA: "CALLE SAN FRANCISCO N.° 302 - AREQUIPA",
	CAJAMARCA: "JR. TARAPACÁ N.° 552 - CAJAMARCA",
	CUSCO: "AV. MICAELA BASTIDAS N.° 356 - CUSCO",
	HUANCAYO: "JR. AREQUIPA N.° 240 - HUANCAYO",
	IQUITOS: "JR. ARICA N.° 564 - IQUITOS",
	LIMA: "AV. EDGARDO REBAGLIATI N.° 561 - JESÚS MARÍA",
	PIURA: "AV. LORETO N.° 140 - PIURA",
	TRUJILLO: "AV. LARCO N.° 1212 - TRUJILLO"
};
var etiquetasHistorial = {
	pdfs: "PDF guardado",
	office: "Oficina registral",
	partida: "Número de partida",
	seats: "Asientos",
	fileName: "Archivo",
	savedAt: "Guardado el"
};
function buildResults(office, partida) {
	const normalizedOffice = office.trim().toUpperCase();
	const normalizedPartida = partida.trim().toUpperCase();
	if (!normalizedOffice || !normalizedPartida) return [];
	return [{
		id: `${normalizedOffice}-${normalizedPartida}-1`,
		titular: "MINISTERIO DE TRANSPORTES Y COMUNICACIONES",
		zona: normalizedOffice === "LIMA" ? "ZONA IX" : "ZONA VII",
		oficina: normalizedOffice,
		partida: normalizedPartida,
		estado: "ACTIVA",
		registro: "REGISTRO DE PREDIOS",
		libro: "PREDIOS",
		direccion: addressByOffice[normalizedOffice] ?? `OFICINA REGISTRAL DE ${normalizedOffice}`,
		asientoCount: 5
	}, {
		id: `${normalizedOffice}-${normalizedPartida}-2`,
		titular: "SUPERINTENDENCIA NACIONAL DE BIENES ESTATALES",
		zona: normalizedOffice === "LIMA" ? "ZONA IX" : "ZONA VII",
		oficina: normalizedOffice,
		partida: normalizedPartida,
		estado: "ACTIVA",
		registro: "REGISTRO DE INMUEBLES",
		libro: "PREDIOS",
		direccion: addressByOffice[normalizedOffice] ?? `OFICINA REGISTRAL DE ${normalizedOffice}`,
		asientoCount: 3
	}];
}
function buildSeats(result) {
	const acts = [
		"INMATRICULACIÓN",
		"TRANSFERENCIA DE DOMINIO",
		"RECTIFICACIÓN DE ÁREA Y LINDEROS",
		"ANOTACIÓN PREVENTIVA",
		"CARGAS Y GRAVÁMENES"
	];
	return Array.from({ length: result.asientoCount }, (_, index) => ({
		id: `${result.id}-seat-${index + 1}`,
		nro: index + 1,
		tipo: "ASIENTO",
		documentId: String(index),
		pagina: index < 2 ? index + 1 : 2,
		referencia: `${result.asientoCount - index}/${result.asientoCount}`,
		fecha: `${String(index + 8).padStart(2, "0")}/08/2026`,
		acto: acts[index] ?? "MODIFICACIÓN REGISTRAL"
	}));
}
function PartidasRegistralesPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const [office, setOffice] = useState("CHIMBOTE");
	const [partida, setPartida] = useState("P09075155");
	const [searchOffice, setSearchOffice] = useState("CHIMBOTE");
	const [searchPartida, setSearchPartida] = useState("P09075155");
	const [results, setResults] = useState(() => buildResults("CHIMBOTE", "P09075155"));
	const [activeResult, setActiveResult] = useState(null);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [previewSeat, setPreviewSeat] = useState(null);
	const [previewZoom, setPreviewZoom] = useState(.78);
	const [savedPdfs, setSavedPdfs] = useState([]);
	const [feedback, setFeedback] = useState("");
	const [downloading, setDownloading] = useState(false);
	const storageKey = `pdgp:partidas-registrales:${projectId}:${decodedCodigo}`;
	const [porQuitar, setPorQuitar] = useState(null);
	const rol = useRol();
	const claveHistorial = `partidas-registrales-${decodedCodigo}`;
	const bitacora = {
		modulo: 11,
		entidad: "partidas_registrales"
	};
	const versiones = useHistorial(claveHistorial);
	const versionar = (accion, objeto, despues, motivo) => registrarCambio(claveHistorial, {
		accion,
		objeto,
		motivo,
		antes: versiones[0]?.registro ?? { pdfs: savedPdfs },
		despues: { pdfs: despues }
	}, bitacora);
	const seats = useMemo(() => activeResult ? buildSeats(activeResult) : [], [activeResult]);
	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(storageKey);
			if (stored) setSavedPdfs(JSON.parse(stored));
		} catch {
			setSavedPdfs([]);
		}
	}, [storageKey]);
	function searchRegistry() {
		const cleanOffice = office.trim().toUpperCase();
		const cleanPartida = partida.trim().toUpperCase();
		if (!cleanOffice || !cleanPartida) {
			setFeedback("Seleccione la oficina registral e ingrese el número de partida.");
			return;
		}
		setSearchOffice(cleanOffice);
		setSearchPartida(cleanPartida);
		setResults(buildResults(cleanOffice, cleanPartida));
		setFeedback("Consulta realizada: 2 coincidencias registrales.");
	}
	function clearSearch() {
		setOffice("");
		setPartida("");
		setSearchOffice("");
		setSearchPartida("");
		setResults([]);
		setFeedback("");
	}
	function openSeats(result) {
		setActiveResult(result);
		setSelectedSeats([]);
		setPreviewSeat(null);
	}
	function toggleSeat(nro) {
		setSelectedSeats((current) => current.includes(nro) ? current.filter((item) => item !== nro) : [...current, nro]);
	}
	function toggleAllSeats() {
		setSelectedSeats((current) => current.length === seats.length ? [] : seats.map((seat) => seat.nro));
	}
	function openSeatPreview(seat) {
		setPreviewSeat(seat);
		setPreviewZoom(.78);
	}
	function persistPdf(record) {
		const nextRecords = [record, ...savedPdfs.filter((item) => item.id !== record.id)].slice(0, 20);
		setSavedPdfs(nextRecords);
		window.localStorage.setItem(storageKey, JSON.stringify(nextRecords));
		versionar("Guardó PDF de partida", `${record.office} · ${record.partida}`, nextRecords);
	}
	async function downloadPdf(result, requestedSeats) {
		setDownloading(true);
		try {
			const allSeats = buildSeats(result);
			const seatNumbers = requestedSeats?.length ? requestedSeats : allSeats.map((seat) => seat.nro);
			const includedSeats = allSeats.filter((seat) => seatNumbers.includes(seat.nro));
			const { jsPDF } = await import("jspdf");
			const pdf = new jsPDF({
				unit: "mm",
				format: "a4"
			});
			const fileName = `partida_${sanitizeFileName(result.oficina)}_${sanitizeFileName(result.partida)}.pdf`;
			pdf.setFont("helvetica", "bold");
			pdf.setFontSize(15);
			pdf.setTextColor(200, 16, 46);
			pdf.text("CONSULTA DE PARTIDA REGISTRAL", 16, 18);
			pdf.setDrawColor(200, 16, 46);
			pdf.line(16, 22, 194, 22);
			pdf.setTextColor(31, 41, 55);
			pdf.setFontSize(10);
			pdf.setFont("helvetica", "bold");
			pdf.text("Datos de la consulta", 16, 31);
			pdf.setFont("helvetica", "normal");
			const detailLines = [
				`Proyecto: ${projectLabel}`,
				`Predio: ${predio?.cod || decodedCodigo}`,
				`Oficina registral: ${result.oficina}`,
				`Número de partida registral: ${result.partida}`,
				`Titular: ${result.titular}`,
				`Zona registral: ${result.zona}`,
				`Estado: ${result.estado}`,
				`Registro / libro: ${result.registro} / ${result.libro}`,
				`Dirección: ${result.direccion}`
			];
			let y = 38;
			detailLines.forEach((line) => {
				const wrapped = pdf.splitTextToSize(line, 175);
				pdf.text(wrapped, 16, y);
				y += wrapped.length * 5;
			});
			y += 3;
			pdf.setFont("helvetica", "bold");
			pdf.text("Asientos incluidos", 16, y);
			y += 7;
			pdf.setFont("helvetica", "normal");
			includedSeats.forEach((seat) => {
				if (y > 270) {
					pdf.addPage();
					y = 18;
				}
				pdf.setFillColor(249, 250, 251);
				pdf.rect(16, y - 4, 178, 20, "F");
				pdf.text(`Asiento ${seat.nro} · ${seat.acto}`, 19, y + 1);
				pdf.text(`Documento ${seat.documentId} · Página ${seat.pagina} · Ref. ${seat.referencia} · ${seat.fecha}`, 19, y + 7);
				y += 24;
			});
			pdf.setFontSize(8);
			pdf.setTextColor(107, 114, 128);
			pdf.text(`Documento generado por la Plataforma Digital de Gestión de Predios · ${fechaHora(/* @__PURE__ */ new Date())}`, 16, 289);
			pdf.save(fileName);
			persistPdf({
				id: `${result.oficina}:${result.partida}`,
				office: result.oficina,
				partida: result.partida,
				seats: seatNumbers,
				fileName,
				savedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			setFeedback(`PDF guardado y descargado para ${result.oficina} · ${result.partida}.`);
		} finally {
			setDownloading(false);
		}
	}
	function exportResults() {
		if (!results.length) return;
		const csv = [[
			"Titular",
			"Zona",
			"Oficina",
			"Número Partida",
			"Estado",
			"Registro",
			"Libro",
			"Dirección"
		], ...results.map((result) => [
			result.titular,
			result.zona,
			result.oficina,
			result.partida,
			result.estado,
			result.registro,
			result.libro,
			result.direccion
		])].map((row) => row.map(csvCell).join(";")).join("\r\n");
		descargarBlob(`consulta_${sanitizeFileName(searchOffice)}_${sanitizeFileName(searchPartida)}.csv`, new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }));
	}
	function removeSaved(recordId) {
		setPorQuitar(savedPdfs.find((item) => item.id === recordId) ?? null);
	}
	function confirmarQuitar(motivo) {
		if (!porQuitar) return;
		const nextRecords = savedPdfs.filter((item) => item.id !== porQuitar.id);
		setSavedPdfs(nextRecords);
		window.localStorage.setItem(storageKey, JSON.stringify(nextRecords));
		versionar("Quitó PDF de partida", `${porQuitar.office} · ${porQuitar.partida}`, nextRecords, motivo);
		setPorQuitar(null);
		setFeedback("PDF quitado del registro. El histórico conserva su dato y el motivo.");
	}
	const iconoDescarga = downloading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }) : selectedSeats.length ? /* @__PURE__ */ jsx(FileDown, {}) : /* @__PURE__ */ jsx(Download, {});
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: decodedCodigo,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: decodedCodigo }),
		children: [
			/* @__PURE__ */ jsx(PredioEncabezado, {
				projectId,
				codigo: decodedCodigo,
				titulo: "Partidas registrales",
				icono: Landmark,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: savedPdfs.length ? "success" : "neutral",
					children: savedPdfs.length ? `${savedPdfs.length} PDF guardado(s)` : "Sin PDF guardados"
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "partidas-registrales",
				projectId,
				codigo: decodedCodigo,
				extra: /* @__PURE__ */ jsx("span", { children: "La búsqueda catastral y la consulta de partidas en SUNARP sustentan la identificación del inmueble (art. 16.1: certificado de búsqueda catastral en 15 d.h.)." })
			}),
			feedback && /* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mb-4 flex items-start gap-2 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: feedback
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setFeedback(""),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "registro",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "registro",
							children: "Registro"
						}), /* @__PURE__ */ jsxs(TabsTrigger, {
							value: "historico",
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
						})]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "registro",
						children: [
							/* @__PURE__ */ jsx(InformacionPredio, {
								projectId,
								codigo: decodedCodigo,
								className: "mb-4"
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Consulta SUNARP por número de partida",
								children: [/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Oficina registral",
									obligatorio: true,
									children: (id) => /* @__PURE__ */ jsxs("select", {
										id,
										className: controlClase,
										value: office,
										onChange: (event) => setOffice(event.target.value),
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Seleccione"
										}), offices.map((item) => /* @__PURE__ */ jsx("option", { children: item }, item))]
									})
								}), /* @__PURE__ */ jsx(FormField, {
									etiqueta: "Número de partida registral",
									obligatorio: true,
									ayuda: "La consulta se realiza con la oficina y el número de partida indicados.",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										className: controlClase,
										value: partida,
										onChange: (event) => setPartida(event.target.value.toUpperCase()),
										placeholder: "Ej. P09075155"
									})
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 flex flex-wrap justify-end gap-2",
									children: [/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: clearSearch,
										children: [/* @__PURE__ */ jsx(X, {}), " Limpiar filtros"]
									}), /* @__PURE__ */ jsxs(Button, {
										type: "button",
										onClick: searchRegistry,
										children: [/* @__PURE__ */ jsx(Search, {}), " Buscar partida"]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs(Section, {
								titulo: "Resultado de la búsqueda",
								className: "mt-4",
								acciones: /* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: exportResults,
									disabled: !results.length,
									children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar resultados"]
								}),
								children: [/* @__PURE__ */ jsxs("p", {
									className: "mb-2 text-xs text-muted-foreground",
									children: [
										results.length ? `${results.length} coincidencias para ${searchOffice} · ${searchPartida}` : "No hay resultados para mostrar.",
										" ",
										"· Datos de demostración."
									]
								}), /* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "asientos",
											titulo: "Asientos",
											ancho: "90px",
											render: (r) => /* @__PURE__ */ jsx(Button, {
												type: "button",
												variant: "outline",
												size: "icon",
												className: "size-8",
												title: "Ver asientos",
												"aria-label": `Ver asientos de la partida ${r.partida}`,
												onClick: () => openSeats(r),
												children: /* @__PURE__ */ jsx(Eye, {})
											})
										},
										{
											clave: "titular",
											titulo: "Razón social / titular",
											render: (r) => /* @__PURE__ */ jsx("span", {
												className: "font-medium",
												children: r.titular
											})
										},
										{
											clave: "zona",
											titulo: "Zona"
										},
										{
											clave: "oficina",
											titulo: "Oficina"
										},
										{
											clave: "partida",
											titulo: "Número de partida",
											render: (r) => /* @__PURE__ */ jsx("span", {
												className: "font-mono font-semibold text-primary-dark",
												children: r.partida
											})
										},
										{
											clave: "estado",
											titulo: "Estado",
											render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
												tono: r.estado === "ACTIVA" ? "success" : "neutral",
												children: r.estado
											})
										},
										{
											clave: "registro",
											titulo: "Registro"
										},
										{
											clave: "libro",
											titulo: "Libro"
										},
										{
											clave: "direccion",
											titulo: "Dirección"
										}
									],
									filas: results,
									claveFila: (r) => r.id,
									vacio: "Complete ambos filtros y pulse «Buscar partida»."
								})]
							}),
							/* @__PURE__ */ jsx(Section, {
								titulo: "PDF guardados por búsqueda",
								className: "mt-4",
								children: /* @__PURE__ */ jsx(Tabla, {
									columnas: [
										{
											clave: "office",
											titulo: "Oficina registral"
										},
										{
											clave: "partida",
											titulo: "Número de partida",
											render: (r) => /* @__PURE__ */ jsx("span", {
												className: "font-mono font-semibold",
												children: r.partida
											})
										},
										{
											clave: "seats",
											titulo: "Asientos",
											render: (r) => r.seats.join(", ")
										},
										{
											clave: "fileName",
											titulo: "Archivo"
										},
										{
											clave: "savedAt",
											titulo: "Fecha",
											ancho: "150px",
											render: (r) => /* @__PURE__ */ jsx("span", {
												className: "tabular-nums",
												children: fechaHora(r.savedAt) || r.savedAt
											})
										},
										{
											clave: "acciones",
											titulo: "Acciones",
											alinear: "derecha",
											ancho: "110px",
											render: (r) => /* @__PURE__ */ jsxs("span", {
												className: "inline-flex gap-1",
												children: [/* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "ghost",
													size: "icon",
													className: "size-8 text-primary",
													title: "Descargar nuevamente",
													"aria-label": `Descargar nuevamente ${r.fileName}`,
													disabled: downloading,
													onClick: () => {
														const result = buildResults(r.office, r.partida)[0];
														if (result) downloadPdf(result, r.seats);
													},
													children: /* @__PURE__ */ jsx(Download, {})
												}), /* @__PURE__ */ jsx(Button, {
													type: "button",
													variant: "ghost",
													size: "icon",
													className: "size-8 text-destructive",
													title: "Quitar del registro",
													"aria-label": `Quitar ${r.fileName} del registro`,
													onClick: () => removeSaved(r.id),
													children: /* @__PURE__ */ jsx(Trash2, {})
												})]
											})
										}
									],
									filas: savedPdfs,
									claveFila: (r) => r.id,
									vacio: "Los PDF descargados desde la lista de asientos quedarán registrados aquí."
								})
							})
						]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Partidas registrales",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: etiquetasHistorial,
								nombreArchivo: `historico-${claveHistorial}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									setSavedPdfs(r.pdfs);
									window.localStorage.setItem(storageKey, JSON.stringify(r.pdfs));
									registrarVersion(claveHistorial, {
										accion: "Restauró una versión anterior",
										objeto: `versión ${n}`,
										registro: r
									}, bitacora);
									setFeedback(`Se restauró la versión ${n}. Quedó como una versión nueva.`);
								}
							})
						})
					})
				]
			}),
			porQuitar && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: porQuitar.fileName,
				tipo: "PDF guardado",
				onCerrar: () => setPorQuitar(null),
				onConfirmar: confirmarQuitar
			}),
			/* @__PURE__ */ jsx(Modal, {
				abierto: Boolean(activeResult),
				onCerrar: () => setActiveResult(null),
				titulo: "Lista de asientos",
				descripcion: activeResult ? `${activeResult.oficina} · partida ${activeResult.partida} · ${activeResult.titular}` : void 0,
				ancho: "lg",
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setActiveResult(null),
					children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					disabled: downloading,
					onClick: () => activeResult && void downloadPdf(activeResult, selectedSeats),
					children: [iconoDescarga, selectedSeats.length ? `Guardar PDF (${selectedSeats.length} asientos)` : "Guardar PDF completo"]
				})] }),
				children: activeResult && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-2 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Seleccione los asientos que desea incluir en el archivo PDF."
					}), /* @__PURE__ */ jsxs("label", {
						className: "inline-flex cursor-pointer items-center gap-2 text-sm font-medium",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: seats.length > 0 && selectedSeats.length === seats.length,
							onChange: toggleAllSeats,
							className: "size-4 accent-primary"
						}), "Seleccionar todos"]
					})]
				}), /* @__PURE__ */ jsx(Tabla, {
					columnas: [
						{
							clave: "nro",
							titulo: "N.°",
							ancho: "56px"
						},
						{
							clave: "tipo",
							titulo: "Tipo"
						},
						{
							clave: "documentId",
							titulo: "ID documento"
						},
						{
							clave: "pagina",
							titulo: "Página"
						},
						{
							clave: "referencia",
							titulo: "Pág. referencia"
						},
						{
							clave: "fecha",
							titulo: "Fecha",
							render: (s) => /* @__PURE__ */ jsx("span", {
								className: "tabular-nums",
								children: s.fecha
							})
						},
						{
							clave: "seleccionar",
							titulo: "Incluir",
							ancho: "80px",
							render: (s) => /* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: selectedSeats.includes(s.nro),
								onChange: () => toggleSeat(s.nro),
								className: "size-4 accent-primary",
								"aria-label": `Incluir asiento ${s.nro}`
							})
						},
						{
							clave: "ver",
							titulo: "Acciones",
							alinear: "derecha",
							ancho: "80px",
							render: (s) => /* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								size: "icon",
								className: "size-8",
								title: `Ver asiento ${s.nro}`,
								"aria-label": `Ver asiento ${s.nro}`,
								onClick: () => openSeatPreview(s),
								children: /* @__PURE__ */ jsx(Eye, {})
							})
						}
					],
					filas: seats,
					claveFila: (s) => s.id
				})] })
			}),
			/* @__PURE__ */ jsx(Modal, {
				abierto: Boolean(previewSeat && activeResult),
				onCerrar: () => setPreviewSeat(null),
				titulo: previewSeat ? `Asiento ${previewSeat.nro}: ${previewSeat.acto}` : "Asiento",
				descripcion: "Vista informativa del asiento seleccionado. El PDF se guarda por oficina y partida.",
				ancho: "lg",
				pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => setPreviewSeat(null),
					children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
				}), /* @__PURE__ */ jsxs(Button, {
					type: "button",
					disabled: downloading,
					onClick: () => activeResult && previewSeat && void downloadPdf(activeResult, [previewSeat.nro]),
					children: [downloading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Download, {}), " Descargar PDF del asiento"]
				})] }),
				children: previewSeat && activeResult && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-3 flex items-center justify-end gap-1",
					children: [
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							size: "icon",
							className: "size-8",
							title: "Alejar",
							"aria-label": "Alejar",
							onClick: () => setPreviewZoom((current) => Math.max(.55, current - .1)),
							children: /* @__PURE__ */ jsx(ZoomOut, {})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "min-w-12 text-center text-xs tabular-nums text-muted-foreground",
							children: [Math.round(previewZoom * 100), " %"]
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							size: "icon",
							className: "size-8",
							title: "Acercar",
							"aria-label": "Acercar",
							onClick: () => setPreviewZoom((current) => Math.min(1.15, current + .1)),
							children: /* @__PURE__ */ jsx(ZoomIn, {})
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-auto rounded-md bg-muted p-4 sm:p-6",
					children: /* @__PURE__ */ jsx("div", {
						className: "relative mx-auto",
						style: {
							width: 620 * previewZoom,
							height: 875 * previewZoom
						},
						children: /* @__PURE__ */ jsxs("article", {
							className: "absolute left-0 top-0 h-[875px] w-[620px] origin-top-left overflow-hidden border border-border bg-card px-14 py-11 font-serif text-foreground",
							style: { transform: `scale(${previewZoom})` },
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "pointer-events-none absolute left-20 top-80 -rotate-45 select-none text-2xl font-bold text-muted-foreground/30",
									"aria-hidden": true,
									children: "COPIA INFORMATIVA"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-8 border-b-2 border-foreground pb-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Landmark, {
											size: 34,
											strokeWidth: 1.4,
											className: "text-primary-dark",
											"aria-hidden": true
										}), /* @__PURE__ */ jsxs("div", {
											className: "font-sans",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-lg font-bold",
												children: "SUNARP"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-xs font-semibold uppercase",
												children: "Superintendencia Nacional de los Registros Públicos"
											})]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "max-w-64 text-center font-sans text-xs font-bold uppercase",
										children: [
											/* @__PURE__ */ jsxs("p", { children: ["Zona registral ", activeResult.zona] }),
											/* @__PURE__ */ jsxs("p", { children: ["Oficina registral de ", activeResult.oficina] }),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 font-normal normal-case text-muted-foreground",
												children: "Publicidad registral en línea"
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 text-center text-xs font-bold uppercase",
									children: [
										/* @__PURE__ */ jsx("p", { children: "Registro de propiedad inmueble" }),
										/* @__PURE__ */ jsx("p", { children: "Registro de predios" }),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-2 text-sm",
											children: ["Partida N.° ", activeResult.partida]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-6 border-y border-muted-foreground py-2 text-center text-xs font-bold uppercase",
									children: [
										"Asiento N.° ",
										String(previewSeat.nro).padStart(5, "0"),
										" · ",
										previewSeat.acto
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-6 text-justify text-sm leading-relaxed",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "font-bold uppercase",
											children: "Inscripción registral"
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-3 indent-7",
											children: [
												"Por el presente asiento se deja constancia de la inscripción del acto de",
												" ",
												/* @__PURE__ */ jsx("strong", { children: previewSeat.acto.toLowerCase() }),
												", correspondiente al inmueble inscrito en la partida electrónica N.° ",
												activeResult.partida,
												", ubicado en el ámbito de la Oficina Registral de ",
												activeResult.oficina,
												"."
											]
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-3 indent-7",
											children: [
												"El derecho registrado corresponde a ",
												activeResult.titular,
												", conforme al título archivado y a los documentos presentados para su calificación. El predio se encuentra asociado en la Plataforma Digital de Gestión de Predios al código",
												" ",
												/* @__PURE__ */ jsx("strong", { children: predio?.cod || decodedCodigo }),
												"."
											]
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-3 indent-7",
											children: [
												"La presente visualización reproduce la información del documento N.°",
												" ",
												previewSeat.documentId,
												", página ",
												previewSeat.pagina,
												", referencia",
												" ",
												previewSeat.referencia,
												". Fecha del asiento: ",
												previewSeat.fecha,
												"."
											]
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-3 indent-7",
											children: "Se extiende el asiento luego de efectuada la evaluación registral correspondiente, quedando su contenido sujeto a la información obrante en el archivo registral."
										})
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-12 flex justify-end",
									children: /* @__PURE__ */ jsxs("div", {
										className: "w-52 text-center text-xs",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "mx-auto mb-2 w-32 -rotate-6 rounded-lg border-2 border-primary-dark/60 px-2 py-1 font-sans font-bold uppercase text-primary-dark/70",
											children: [
												"Oficina registral",
												/* @__PURE__ */ jsx("br", {}),
												activeResult.oficina
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "border-t border-foreground pt-1",
											children: [
												"Registrador Público",
												/* @__PURE__ */ jsx("br", {}),
												"Zona Registral ",
												activeResult.zona
											]
										})]
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute inset-x-14 bottom-10 border-t border-border pt-2 font-sans text-xs text-muted-foreground",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ jsx("span", { children: "Copia informativa: no constituye certificado" }), /* @__PURE__ */ jsxs("span", { children: [
											"Página ",
											previewSeat.pagina,
											" · Ref. ",
											previewSeat.referencia
										] })]
									}), /* @__PURE__ */ jsx("p", { children: "Documento de visualización generado por la Plataforma Digital de Gestión de Predios. Datos de demostración." })]
								})
							]
						})
					})
				})] })
			})
		]
	});
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, tipo, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Eliminar ${tipo}`,
		descripcion: `${nombre} sale del registro. El histórico conserva sus datos y el motivo.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "destructive",
			disabled: motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: [
				/* @__PURE__ */ jsx(Trash2, {}),
				" Eliminar ",
				tipo
			]
		})] }),
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-eliminacion",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-eliminacion",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (ev) => setMotivo(ev.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
function sanitizeFileName(value) {
	return value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "").toLowerCase();
}
function csvCell(value) {
	return `"${value.replace(/"/g, "\"\"")}"`;
}
//#endregion
export { PartidasRegistralesPage as component };
