import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { f as vencimiento, g as fechaIso, h as fechaHora, m as fecha, n as getProyecto, s as registrarHito, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { it as useItems, jt as useUsuarioSesion, rt as useCatalogo } from "./sujetoPasivo-Cz4oBCnt.js";
import { m as MotivoModal, n as etiquetaProyecto, t as PredioEncabezado, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.cbc-180Ur2Tv.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { CalendarDays, CheckCircle2, Download, History, Save, Search, Send, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.cbc.tsx?tsr-split=component
/** Usuario de la sesión cuando no está en Usuarios (correo de ingreso). */
function sesionActual() {
	try {
		return localStorage.getItem("mtc-session") || "Usuario sin sesión";
	} catch {
		return "Usuario sin sesión";
	}
}
var MENSAJE_CLASE = {
	exito: "border-success bg-success-soft text-success",
	aviso: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var RESULTADO_TONO = {
	Pendiente: "neutral",
	"Emitido sin observación": "success",
	"Emitido con observación": "warning",
	"Requiere subsanación": "destructive"
};
var ETIQUETAS_CBC = {
	envio: "Envío en preparación",
	envios: "Envío a SUNARP",
	registradoPor: "Registrado por",
	documentos: "Documento enviado",
	folio: "Folio",
	nombre: "Documento",
	numero: "Número",
	registradoEl: "Registrado el",
	anulacion: "Anulación",
	motivo: "Motivo",
	recepcion: "Recepción del certificado",
	nroSolicitud: "Número de solicitud",
	fechaEnvio: "Fecha de envío",
	canal: "Canal de envío",
	responsable: "Enviado por",
	observacion: "Observación",
	nroCertificado: "Número de certificado",
	fechaEmision: "Fecha de emisión",
	fechaRecepcion: "Fecha de recepción",
	resultado: "Resultado"
};
function crc32(bytes) {
	let crc = 4294967295;
	for (const byte of bytes) {
		crc ^= byte;
		for (let i = 0; i < 8; i++) crc = crc >>> 1 ^ 3988292384 & -(crc & 1);
	}
	return (crc ^ 4294967295) >>> 0;
}
function writeUint16(out, value) {
	out.push(value & 255, value >>> 8 & 255);
}
function writeUint32(out, value) {
	out.push(value & 255, value >>> 8 & 255, value >>> 16 & 255, value >>> 24 & 255);
}
function createZipBlob(files) {
	const encoder = new TextEncoder();
	const local = [];
	const central = [];
	const records = [];
	files.forEach((file) => {
		const nameBytes = encoder.encode(file.name);
		const data = encoder.encode(file.content);
		const crc = crc32(data);
		const offset = local.length;
		writeUint32(local, 67324752);
		writeUint16(local, 20);
		writeUint16(local, 0);
		writeUint16(local, 0);
		writeUint16(local, 0);
		writeUint16(local, 0);
		writeUint32(local, crc);
		writeUint32(local, data.length);
		writeUint32(local, data.length);
		writeUint16(local, nameBytes.length);
		writeUint16(local, 0);
		local.push(...nameBytes, ...data);
		records.push({
			nameBytes,
			data,
			crc,
			offset
		});
	});
	records.forEach((record) => {
		writeUint32(central, 33639248);
		writeUint16(central, 20);
		writeUint16(central, 20);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint32(central, record.crc);
		writeUint32(central, record.data.length);
		writeUint32(central, record.data.length);
		writeUint16(central, record.nameBytes.length);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint16(central, 0);
		writeUint32(central, 0);
		writeUint32(central, record.offset);
		central.push(...record.nameBytes);
	});
	const end = [];
	writeUint32(end, 101010256);
	writeUint16(end, 0);
	writeUint16(end, 0);
	writeUint16(end, records.length);
	writeUint16(end, records.length);
	writeUint32(end, central.length);
	writeUint32(end, local.length);
	writeUint16(end, 0);
	return new Blob([new Uint8Array([
		...local,
		...central,
		...end
	])], { type: "application/zip" });
}
function officeForLocation(ciudad, oficina) {
	if (oficina?.trim()) return oficina.trim();
	const value = (ciudad ?? "").toUpperCase();
	if (value.includes("JAUJA") || value.includes("HUANCAYO")) return "SUNARP - Oficina Registral Huancayo";
	if (value.includes("LIMA")) return "SUNARP - Oficina Registral Lima";
	if (value.includes("PUNO")) return "SUNARP - Oficina Registral Puno";
	return "SUNARP - Oficina Registral competente por ubicación";
}
function buildDxf(codigo) {
	return `0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1027\n0\nENDSEC\n0\nSECTION\n2\nENTITIES\n999\nPredio ${codigo}\n0\nENDSEC\n0\nEOF\n`;
}
function CbcPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const oficinaRegistral = useMemo(() => officeForLocation(predio?.ciudad, predio?.ofi), [predio?.ciudad, predio?.ofi]);
	const [mensaje, setMensaje] = useState(null);
	const [envio, setEnvio] = useState({
		nroSolicitud: `CBC-${(/* @__PURE__ */ new Date()).getFullYear()}-${decodedCodigo.slice(-5)}`,
		fechaEnvio: fechaIso(/* @__PURE__ */ new Date()),
		canal: "Mesa de partes SUNARP",
		responsable: "",
		observacion: ""
	});
	const [envios, setEnvios] = useState([]);
	const [anular, setAnular] = useState(null);
	const catalogo = useCatalogo();
	const enviables = useItems().filter((i) => i.predio === decodedCodigo && i.estado !== "anulado" && i.catalogoId !== "cbc-certificado" && (i.paso === "cbc" || [
		"cbc-plano",
		"cbc-memoria",
		"cbc-solicitud"
	].includes(i.catalogoId ?? "")));
	const nombreItem = (i) => i.libre?.nombre ?? catalogo.find((c) => c.id === i.catalogoId)?.nombre ?? "Documento";
	const [marcados, setMarcados] = useState(null);
	const seleccion = marcados ?? enviables.map((i) => i.id);
	const nombreUsuario = useUsuarioSesion()?.nombre ?? sesionActual();
	const [recepcion, setRecepcion] = useState({
		nroCertificado: "",
		fechaEmision: "",
		fechaRecepcion: "",
		resultado: "Pendiente",
		observacion: ""
	});
	const rol = useRol();
	const claveHistorial = `cbc-${decodedCodigo}`;
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, {
		envio,
		envios,
		recepcion
	}, (v) => {
		setEnvio(v.envio);
		setEnvios(v.envios ?? []);
		setRecepcion(v.recepcion);
	}, {
		modulo: 12,
		entidad: "cbc"
	});
	const ultimoEnvio = envios.find((e) => e.estado === "vigente");
	const venceCbc = ultimoEnvio ? vencimiento(/* @__PURE__ */ new Date(`${ultimoEnvio.fechaEnvio}T00:00:00`), plazo("cbc")) : null;
	function handleRegistrarEnvio() {
		if (!envio.nroSolicitud.trim() || !envio.fechaEnvio) {
			setMensaje({
				tipo: "error",
				texto: "Registre el número de solicitud y la fecha de envío a SUNARP."
			});
			return;
		}
		const docs = enviables.filter((i) => seleccion.includes(i.id));
		if (!docs.some((i) => i.catalogoId === "cbc-solicitud")) {
			setMensaje({
				tipo: "error",
				texto: "Marque la solicitud de CBC entre los documentos que se envían. Si aún no existe, genérela en «Documentos que genera este paso», arriba del formulario."
			});
			return;
		}
		const enviadoPor = envio.responsable.trim() || nombreUsuario;
		const nuevo = {
			...envio,
			nroSolicitud: envio.nroSolicitud.trim(),
			responsable: enviadoPor,
			id: `env-${Date.now().toString(36)}`,
			documentos: docs.map((i) => ({
				itemId: i.id,
				folio: i.folio,
				nombre: nombreItem(i),
				numero: i.numero
			})),
			registradoPor: nombreUsuario,
			registradoEl: (/* @__PURE__ */ new Date()).toISOString(),
			estado: "vigente"
		};
		const lista = [nuevo, ...envios];
		const siguiente = {
			...envio,
			nroSolicitud: `CBC-${(/* @__PURE__ */ new Date()).getFullYear()}-${decodedCodigo.slice(-5)}-${lista.length + 1}`,
			observacion: ""
		};
		setEnvios(lista);
		setEnvio(siguiente);
		setMarcados(null);
		guardarVersion("Registró envío a SUNARP", `solicitud ${nuevo.nroSolicitud} del ${fecha(nuevo.fechaEnvio)}, enviada por ${enviadoPor}`, void 0, {
			envio: siguiente,
			envios: lista,
			recepcion
		});
		registrarHito(decodedCodigo, "cbc", nuevo.fechaEnvio, "cbc", "Envío de la solicitud de CBC a SUNARP");
		setMensaje({
			tipo: "exito",
			texto: `Envío ${nuevo.nroSolicitud} registrado.`
		});
	}
	function handleAnularEnvio(e, motivo) {
		const lista = envios.map((x) => x.id === e.id ? {
			...x,
			estado: "anulado",
			anulacion: {
				motivo,
				usuario: nombreUsuario,
				fecha: (/* @__PURE__ */ new Date()).toISOString()
			}
		} : x);
		setEnvios(lista);
		guardarVersion("Anuló envío a SUNARP", `solicitud ${e.nroSolicitud}`, motivo, {
			envio,
			envios: lista,
			recepcion
		});
		setMensaje({
			tipo: "exito",
			texto: `Envío ${e.nroSolicitud} anulado.`
		});
	}
	function memoriaBlob(numero) {
		const html = `<!doctype html>
      <html><head><meta charset="utf-8"><title>Memoria descriptiva CBC</title></head>
      <body style="font-family: Arial; font-size: 10pt;">
        <h2>MEMORIA DESCRIPTIVA PARA CERTIFICADO DE BÚSQUEDA CATASTRAL</h2>
        <p style="text-align:center"><b>${numero ?? "BORRADOR SIN NUMERAR"}</b></p>
        <p><b>Código de predio:</b> ${predio?.cod || decodedCodigo}</p>
        <p><b>Proyecto:</b> ${predio?.proyecto || proyecto?.nombre || projectId}</p>
        <p><b>Oficina registral:</b> ${oficinaRegistral}</p>
        <p><b>Sujeto pasivo:</b> ${predio?.suj || "Sin información"}</p>
        <p><b>Tipo de predio:</b> ${predio?.tipo || predio?.tp || "Sin información"}</p>
        <p><b>Área afectada:</b> ${predio?.area || predio?.m2 || "Sin información"} m2</p>
        <p><b>Partida registral:</b> ${predio?.part || predio?.pind || "Sin información"}</p>
        <p><b>Modalidad:</b> ${predio?.mod || "Sin información"}</p>
        <h3>Descripción</h3>
        <p>El presente documento sustenta la solicitud de certificado de búsqueda catastral del predio seleccionado, con la información técnica y registral disponible en la plataforma.</p>
      </body></html>`;
		return new Blob([html], { type: "application/msword;charset=utf-8" });
	}
	function generateDxf() {
		descargarBlob(`predio_${decodedCodigo}.dxf`, new Blob([buildDxf(decodedCodigo)], { type: "application/dxf" }));
		setMensaje({
			tipo: "exito",
			texto: "Plano DXF descargado."
		});
	}
	function paqueteZip() {
		return createZipBlob([{
			name: "solicitud_cbc.txt",
			content: `Solicitud CBC\nPredio: ${predio?.cod || decodedCodigo}\nOficina registral: ${oficinaRegistral}\nSujeto pasivo: ${predio?.suj || "Sin información"}\nÁrea m2: ${predio?.area || predio?.m2 || "Sin información"}\n`
		}, {
			name: `predio_${decodedCodigo}.dxf`,
			content: buildDxf(decodedCodigo)
		}]);
	}
	function handleGuardarBorrador() {
		guardarVersion("Guardó borrador", "datos del CBC");
		setMensaje({
			tipo: "exito",
			texto: "Borrador guardado."
		});
	}
	function handleRegistrarCbc() {
		if (!ultimoEnvio) {
			setMensaje({
				tipo: "error",
				texto: "Registre al menos un envío a SUNARP."
			});
			return;
		}
		guardarVersion("Registró solicitud CBC", `solicitud ${ultimoEnvio.nroSolicitud}, resultado ${recepcion.resultado}`);
		setMensaje({
			tipo: "exito",
			texto: `Solicitud ${ultimoEnvio.nroSolicitud} registrada. Resultado: ${recepcion.resultado}.`
		});
	}
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
				titulo: "Certificado de búsqueda catastral (CBC)",
				icono: Search,
				documentos: {
					armar: { "cbc-memoria": (numero) => memoriaBlob(numero) },
					productos: { "cbc-plano": {
						texto: "Generar paquete ZIP",
						nombreArchivo: `paquete_cbc_${decodedCodigo}.zip`,
						generar: paqueteZip
					} },
					extras: { "cbc-plano": /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: generateDxf,
						children: [/* @__PURE__ */ jsx(Download, {}), " DXF"]
					}) }
				},
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: RESULTADO_TONO[recepcion.resultado] ?? "neutral",
					children: recepcion.resultado
				})
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "cbc",
				projectId,
				codigo: decodedCodigo,
				extra: venceCbc && /* @__PURE__ */ jsxs(Fragment$1, { children: ["Plazo de SUNARP para emitir el CBC (art. 16.1, 15 d.h. desde la solicitud):", /* @__PURE__ */ jsx(PlazoBadge, { vence: venceCbc })] })
			}),
			mensaje && /* @__PURE__ */ jsxs("p", {
				role: mensaje.tipo === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[mensaje.tipo]}`,
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: mensaje.texto
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMensaje(null),
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
									"aria-hidden": true
								}),
								" Histórico (",
								versiones.length,
								")"
							]
						})]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "registro",
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: (event) => {
								event.preventDefault();
								handleRegistrarCbc();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									tituloDatos: "Datos registrales",
									datos: [
										{
											etiqueta: "Oficina registral",
											valor: oficinaRegistral
										},
										{
											etiqueta: "Sujeto pasivo",
											valor: predio?.suj || ""
										},
										{
											etiqueta: "Tipo de predio",
											valor: predio?.tipo || predio?.tp || ""
										},
										{
											etiqueta: "Área afectada (m²)",
											valor: predio?.area || predio?.m2 || ""
										},
										{
											etiqueta: "Partida registral",
											valor: predio?.part || predio?.pind || ""
										},
										{
											etiqueta: "Modalidad",
											valor: predio?.mod || ""
										}
									]
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Envíos a SUNARP",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "mb-3 text-sm text-muted-foreground",
											children: "Cada envío queda registrado con quién lo envió. Si la solicitud se reitera o se reenvía, registre un envío nuevo."
										}),
										/* @__PURE__ */ jsxs(FormGrid, { children: [
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Número de solicitud",
												obligatorio: true,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													value: envio.nroSolicitud,
													onChange: (e) => setEnvio({
														...envio,
														nroSolicitud: e.target.value
													})
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Fecha de envío",
												obligatorio: true,
												icono: CalendarDays,
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													type: "date",
													className: controlClase,
													value: envio.fechaEnvio,
													onChange: (e) => setEnvio({
														...envio,
														fechaEnvio: e.target.value
													})
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Canal de envío",
												children: (id) => /* @__PURE__ */ jsxs("select", {
													id,
													className: controlClase,
													value: envio.canal,
													onChange: (e) => setEnvio({
														...envio,
														canal: e.target.value
													}),
													children: [
														/* @__PURE__ */ jsx("option", { children: "Mesa de partes SUNARP" }),
														/* @__PURE__ */ jsx("option", { children: "SID SUNARP" }),
														/* @__PURE__ */ jsx("option", { children: "Ventanilla registral" })
													]
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Enviado por",
												ayuda: "Quien hizo el envío. Si lo deja vacío, se registra su usuario.",
												children: (id) => /* @__PURE__ */ jsx("input", {
													id,
													className: controlClase,
													placeholder: nombreUsuario,
													value: envio.responsable,
													onChange: (e) => setEnvio({
														...envio,
														responsable: e.target.value
													})
												})
											}),
											/* @__PURE__ */ jsx(FormField, {
												etiqueta: "Observación del envío",
												ancho: "doble",
												children: (id) => /* @__PURE__ */ jsx("textarea", {
													id,
													rows: 2,
													className: `${controlClase} h-auto py-2`,
													value: envio.observacion,
													onChange: (e) => setEnvio({
														...envio,
														observacion: e.target.value
													})
												})
											})
										] }),
										/* @__PURE__ */ jsxs("fieldset", {
											className: "mt-3 rounded-md border border-border px-3 py-2",
											children: [/* @__PURE__ */ jsx("legend", {
												className: "px-1 text-sm font-semibold",
												children: "Documentos que se envían"
											}), enviables.length === 0 ? /* @__PURE__ */ jsx("p", {
												className: "text-sm text-muted-foreground",
												children: "Aún no hay documentos en este paso. Genere la solicitud, la memoria y el plano en «Documentos que genera este paso», arriba del formulario."
											}) : /* @__PURE__ */ jsx("ul", {
												className: "space-y-1",
												children: enviables.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", {
													className: "flex items-start gap-2 text-sm",
													children: [/* @__PURE__ */ jsx("input", {
														type: "checkbox",
														className: "mt-0.5 size-4 accent-primary",
														checked: seleccion.includes(i.id),
														onChange: (e) => setMarcados(e.target.checked ? [...seleccion, i.id] : seleccion.filter((x) => x !== i.id))
													}), /* @__PURE__ */ jsxs("span", { children: [nombreItem(i), /* @__PURE__ */ jsxs("span", {
														className: "ml-1 font-mono text-xs text-muted-foreground",
														children: [
															i.folio,
															i.numero && ` · ${i.numero}`,
															i.estado !== "firmado" && i.estado !== "recibido" && ` · ${i.estado === "borrador" ? "borrador" : "sin firma"}`
														]
													})] })]
												}) }, i.id))
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3 flex justify-end",
											children: /* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												onClick: handleRegistrarEnvio,
												children: [/* @__PURE__ */ jsx(Send, {}), " Registrar envío"]
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-4",
											children: /* @__PURE__ */ jsx(Tabla, {
												filas: envios,
												claveFila: (e) => e.id,
												claseFila: (e) => e.estado === "anulado" ? "text-muted-foreground line-through" : void 0,
												vacio: "Aún no se registró ningún envío a SUNARP.",
												columnas: [
													{
														clave: "n",
														titulo: "N.°",
														ancho: "50px",
														render: (_, i) => envios.length - i
													},
													{
														clave: "nroSolicitud",
														titulo: "Solicitud",
														render: (e) => /* @__PURE__ */ jsx("span", {
															className: "font-mono text-xs",
															children: e.nroSolicitud
														})
													},
													{
														clave: "fechaEnvio",
														titulo: "Fecha de envío",
														render: (e) => fecha(e.fechaEnvio)
													},
													{
														clave: "canal",
														titulo: "Canal"
													},
													{
														clave: "documentos",
														titulo: "Documentos enviados",
														render: (e) => e.documentos?.length ? /* @__PURE__ */ jsx("ul", {
															className: "text-xs",
															children: e.documentos.map((d) => /* @__PURE__ */ jsxs("li", { children: [d.nombre, /* @__PURE__ */ jsxs("span", {
																className: "block font-mono text-muted-foreground",
																children: [d.folio, d.numero && ` · ${d.numero}`]
															})] }, d.itemId))
														}) : /* @__PURE__ */ jsx("span", {
															className: "text-xs text-muted-foreground",
															children: "Sin detalle"
														})
													},
													{
														clave: "responsable",
														titulo: "Enviado por"
													},
													{
														clave: "registro",
														titulo: "Registrado por",
														render: (e) => /* @__PURE__ */ jsxs("span", {
															className: "text-xs",
															children: [e.registradoPor, /* @__PURE__ */ jsx("span", {
																className: "block text-muted-foreground",
																children: fechaHora(e.registradoEl)
															})]
														})
													},
													{
														clave: "observacion",
														titulo: "Observación",
														render: (e) => e.estado === "anulado" ? `Anulado: ${e.anulacion?.motivo ?? ""}` : e.observacion
													},
													{
														clave: "acciones",
														titulo: "Acciones",
														render: (e) => e.estado === "vigente" && /* @__PURE__ */ jsxs(Button, {
															type: "button",
															variant: "outline",
															size: "sm",
															onClick: () => setAnular(e),
															children: [/* @__PURE__ */ jsx(X, {}), " Anular"]
														})
													}
												]
											})
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Recepción del certificado emitido",
									className: "mt-4",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Número de certificado",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: recepcion.nroCertificado,
												onChange: (e) => setRecepcion({
													...recepcion,
													nroCertificado: e.target.value
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Resultado",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: recepcion.resultado,
												onChange: (e) => setRecepcion({
													...recepcion,
													resultado: e.target.value
												}),
												children: [
													/* @__PURE__ */ jsx("option", { children: "Pendiente" }),
													/* @__PURE__ */ jsx("option", { children: "Emitido sin observación" }),
													/* @__PURE__ */ jsx("option", { children: "Emitido con observación" }),
													/* @__PURE__ */ jsx("option", { children: "Requiere subsanación" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de emisión",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: recepcion.fechaEmision,
												onChange: (e) => setRecepcion({
													...recepcion,
													fechaEmision: e.target.value
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de recepción",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: recepcion.fechaRecepcion,
												onChange: (e) => setRecepcion({
													...recepcion,
													fechaRecepcion: e.target.value
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Certificado de búsqueda catastral (CBC)",
											ancho: "doble",
											children: () => /* @__PURE__ */ jsx(CampoDocumento, {
												projectId,
												codigo: decodedCodigo,
												nombre: "Certificado de búsqueda catastral (CBC)",
												catalogoId: "cbc-certificado",
												emisor: "SUNARP",
												numero: recepcion.nroCertificado || void 0,
												fecha: recepcion.fechaEmision || void 0
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Observación de la recepción",
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 2,
												className: `${controlClase} h-auto py-2`,
												value: recepcion.observacion,
												onChange: (e) => setRecepcion({
													...recepcion,
													observacion: e.target.value
												})
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(FormActions, { children: [
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: () => window.history.back(),
										children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "button",
										variant: "outline",
										onClick: handleGuardarBorrador,
										children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "submit",
										children: [/* @__PURE__ */ jsx(Send, {}), " Registrar solicitud CBC"]
									})
								] })
							]
						})
					}),
					anular && /* @__PURE__ */ jsx(MotivoModal, {
						titulo: "Anular envío a SUNARP",
						descripcion: `Solicitud ${anular.nroSolicitud}: queda en la tabla como anulada.`,
						accion: "Anular envío",
						destructiva: true,
						onCerrar: () => setAnular(null),
						onConfirmar: (motivo) => {
							handleAnularEnvio(anular, motivo);
							setAnular(null);
						}
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico del certificado de búsqueda catastral",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: claveHistorial,
								etiquetas: ETIQUETAS_CBC,
								nombreArchivo: `historico-cbc-${decodedCodigo}`,
								puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
								onRestaurar: (r, n) => {
									restaurar(r, n);
									setMensaje({
										tipo: "exito",
										texto: `Se restauró la versión ${n}.`
									});
								}
							})
						})
					})
				]
			})
		]
	});
}
//#endregion
export { CbcPage as component };
