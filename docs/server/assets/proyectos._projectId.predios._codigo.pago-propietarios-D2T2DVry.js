import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, f as vencimiento, g as fechaIso, h as fechaHora, m as fecha, n as getProyecto, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { d as predioRows, s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.pago-propietarios-BOhH2Cgs.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, Banknote, CalendarDays, CheckCircle2, Forward, Mail, Save, Search, Send, Trash2, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.pago-propietarios.tsx?tsr-split=component
var MENSAJE_CLASE = {
	success: "border-success bg-success-soft text-success",
	warning: "border-warning bg-warning-soft text-warning",
	error: "border-destructive bg-destructive-soft text-destructive"
};
var ESTADO_TONO = {
	BORRADOR: "neutral",
	ENVIADA: "primary",
	"PENDIENTE DE ATENCIÓN": "warning",
	OBSERVADA: "destructive",
	ATENDIDA: "success",
	DERIVADA: "neutral"
};
function parseMoney(value) {
	const normalized = String(value ?? "").replace(/[^\d.-]/g, "");
	const parsed = Number(normalized);
	return Number.isFinite(parsed) ? parsed : 0;
}
function hasTasacion(row) {
	return parseMoney(row.valor) > 0;
}
function toDetailRow(row) {
	const valor = parseMoney(row.valor);
	return {
		codigo: row.codigo,
		cod: row.cod || row.codigo,
		propietario: row.suj || "Sin información",
		documento: row.ruc || row.dni || row.doc || row.part || "No registrado",
		ubicacion: [row.ciudad, row.proyecto].filter(Boolean).join(" / ") || "Sin ubicación",
		expediente: row.exp || "Sin expediente",
		valorTasacion: valor,
		montoSolicitado: valor,
		observacion: ""
	};
}
function PagoPropietariosPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const selectedPredio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const requestNumber = useMemo(() => `SPP-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(Date.now()).slice(-6)}`, []);
	const [activeTab, setActiveTab] = useState("solicitud");
	const [form, setForm] = useState({
		fecha: fechaIso(/* @__PURE__ */ new Date()),
		numero: requestNumber,
		solicitante: "Coordinador predial",
		areaSolicitante: "Gestión predial",
		destinatario: "Tesorería DDP",
		correoSolicitante: "coordinador.predial@mtc.gob.pe",
		fechaNorma: "",
		observacion: "",
		estado: "PENDIENTE DE ATENCIÓN",
		simulateEmailFail: false
	});
	const [details, setDetails] = useState(() => selectedPredio && hasTasacion(selectedPredio) ? [toDetailRow(selectedPredio)] : []);
	const [query, setQuery] = useState("");
	const [message, setMessage] = useState(selectedPredio && !hasTasacion(selectedPredio) ? {
		type: "warning",
		text: "El predio seleccionado no fue agregado: no cuenta con tasación registrada ni valor disponible."
	} : null);
	const [trace, setTrace] = useState([{
		fecha: fechaHora(/* @__PURE__ */ new Date()),
		usuario: "Sistema",
		estadoAnterior: "-",
		estadoNuevo: "BORRADOR",
		comentario: "Solicitud inicial creada"
	}]);
	const [sentRequests, setSentRequests] = useState([{
		numero: "SPP-2026-000184",
		fecha: "2026-07-01",
		solicitante: "Coordinador predial",
		cantidadPredios: 3,
		total: 428500,
		estado: "PENDIENTE DE ATENCIÓN"
	}]);
	const eligibleRows = useMemo(() => predioRows.filter(hasTasacion), []);
	const filteredRows = useMemo(() => {
		const term = query.trim().toLowerCase();
		if (!term) return eligibleRows.slice(0, 12);
		return eligibleRows.filter((row) => {
			return [
				row.cod,
				row.codigo,
				row.suj,
				row.ruc,
				row.dni,
				row.doc,
				row.ciudad,
				row.proyecto,
				row.exp
			].filter(Boolean).join(" ").toLowerCase().includes(term);
		}).slice(0, 12);
	}, [eligibleRows, query]);
	const totalSolicitado = details.reduce((sum, row) => sum + row.montoSolicitado, 0);
	const hasOverBudgetWithoutObservation = details.some((row) => row.montoSolicitado > row.valorTasacion && !row.observacion.trim());
	const vencePago = form.fechaNorma ? vencimiento(/* @__PURE__ */ new Date(`${form.fechaNorma}T00:00:00`), plazo("formulario_y_pago")) : null;
	function addTrace(usuario, estadoAnterior, estadoNuevo, comentario) {
		setTrace((items) => [{
			fecha: fechaHora(/* @__PURE__ */ new Date()),
			usuario,
			estadoAnterior,
			estadoNuevo,
			comentario
		}, ...items]);
	}
	function addPredio(row) {
		if (!hasTasacion(row)) {
			setMessage({
				type: "error",
				text: "El predio no puede agregarse: no cuenta con tasación registrada."
			});
			return;
		}
		if (details.some((item) => item.codigo === row.codigo)) {
			setMessage({
				type: "warning",
				text: "El predio ya está en el detalle de la solicitud."
			});
			return;
		}
		setDetails((items) => [...items, toDetailRow(row)]);
		setQuery("");
		setMessage(null);
	}
	function updateDetail(codigoPredio, patch) {
		setDetails((items) => items.map((item) => item.codigo === codigoPredio ? {
			...item,
			...patch
		} : item));
	}
	function removeDetail(codigoPredio) {
		setDetails((items) => items.filter((item) => item.codigo !== codigoPredio));
	}
	function saveDraft() {
		addTrace(form.solicitante, form.estado, "BORRADOR", `Borrador de la solicitud ${form.numero} guardado.`);
		setMessage({
			type: "success",
			text: `Borrador de la solicitud ${form.numero} guardado.`
		});
	}
	function sendRequest() {
		if (details.length === 0) {
			setMessage({
				type: "error",
				text: "Agregue al menos un predio con tasación registrada."
			});
			return;
		}
		if (details.some((row) => row.valorTasacion <= 0)) {
			setMessage({
				type: "error",
				text: "Todos los predios deben tener valor de tasación disponible."
			});
			return;
		}
		if (!form.destinatario.trim()) {
			setMessage({
				type: "error",
				text: "Seleccione un destinatario de Administración/Tesorería."
			});
			return;
		}
		if (hasOverBudgetWithoutObservation) {
			setMessage({
				type: "error",
				text: "Hay un monto solicitado mayor al valor de tasación. Registre una observación por predio para justificarlo."
			});
			return;
		}
		const estadoNuevo = form.estado === "ENVIADA" ? "ENVIADA" : "PENDIENTE DE ATENCIÓN";
		setForm((current) => ({
			...current,
			estado: estadoNuevo
		}));
		setTrace((items) => [
			{
				fecha: fechaHora(/* @__PURE__ */ new Date()),
				usuario: form.solicitante,
				estadoAnterior: "BORRADOR",
				estadoNuevo,
				comentario: `Solicitud enviada a ${form.destinatario}. Notificación interna registrada.`
			},
			{
				fecha: fechaHora(/* @__PURE__ */ new Date()),
				usuario: "Sistema de notificaciones",
				estadoAnterior: estadoNuevo,
				estadoNuevo,
				comentario: form.simulateEmailFail ? "Solicitud registrada. El envío de correo falló y queda pendiente de reintento." : "Correos enviados al coordinador, jefe de brigada, Tesorería/Administración y copia al solicitante."
			},
			...items
		]);
		setSentRequests((items) => [{
			numero: form.numero,
			fecha: form.fecha,
			solicitante: form.solicitante,
			cantidadPredios: details.length,
			total: totalSolicitado,
			estado: estadoNuevo
		}, ...items.filter((item) => item.numero !== form.numero)]);
		setMessage({
			type: form.simulateEmailFail ? "warning" : "success",
			text: form.simulateEmailFail ? "Solicitud creada y en la bandeja de Administración/Tesorería, pero el correo no pudo enviarse. Se registró una alerta para reintento." : "Solicitud de pago a propietarios enviada. La notificación por correo fue remitida y la solicitud está en la bandeja de Administración/Tesorería."
		});
		setActiveTab("bandeja");
	}
	function attendRequest(numero, estado) {
		setSentRequests((items) => items.map((item) => item.numero === numero ? {
			...item,
			estado
		} : item));
		if (numero === form.numero) {
			addTrace("Administración/Tesorería", form.estado, estado, `Solicitud ${numero} marcada como ${estado.toLowerCase()}.`);
			setForm((current) => ({
				...current,
				estado
			}));
		}
		setMessage({
			type: "success",
			text: `Solicitud ${numero} marcada como ${estado.toLowerCase()}.`
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
				titulo: "Solicitud de pago a propietarios",
				icono: Banknote,
				acciones: /* @__PURE__ */ jsx(StatusBadge, {
					tono: ESTADO_TONO[form.estado],
					children: form.estado
				})
			}),
			/* @__PURE__ */ jsxs(Section, {
				titulo: "Pago · art. 20.4.b del TUO del DL 1192",
				className: "mb-4",
				children: [/* @__PURE__ */ jsx(Stepper, { pasos: [
					{
						nombre: "Devengado",
						estado: "completado",
						detalle: "Art. 20.4.b · memorando a Tesorería",
						to: "/proyectos/$projectId/predios/$codigo/gestion-devengado",
						params: {
							projectId,
							codigo
						}
					},
					{
						nombre: "Pago a propietarios",
						estado: "actual",
						detalle: "Art. 20.4.b · 20 d.h. desde la norma (60 en fideicomiso)"
					},
					{
						nombre: "Pago o consignación",
						estado: "pendiente",
						detalle: "Art. 20.4.b · pago directo o Banco de la Nación",
						to: "/proyectos/$projectId/predios/$codigo/pago-consignacion",
						params: {
							projectId,
							codigo
						}
					},
					{
						nombre: "Formulario registral",
						estado: "pendiente",
						detalle: "Art. 20.4.b · suscripción",
						to: "/proyectos/$projectId/predios/$codigo/formulario-registral",
						params: {
							projectId,
							codigo
						}
					},
					{
						nombre: "Entrega de posesión",
						estado: "pendiente",
						detalle: "Art. 20.4.e · 10 d.h. libre, 30 ocupado",
						to: "/proyectos/$projectId/predios/$codigo/entrega-posesion",
						params: {
							projectId,
							codigo
						}
					}
				] }), /* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
					children: ["Plazo para suscribir el formulario registral y pagar (art. 20.4.b):", vencePago ? /* @__PURE__ */ jsx(PlazoBadge, { vence: vencePago }) : /* @__PURE__ */ jsx("span", { children: "registre la fecha de la norma aprobatoria para calcularlo." })]
				})]
			}),
			message && /* @__PURE__ */ jsxs("p", {
				role: message.type === "error" ? "alert" : "status",
				className: `mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${MENSAJE_CLASE[message.type]}`,
				children: [
					message.type === "success" ? /* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}) : /* @__PURE__ */ jsx(AlertTriangle, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: message.text
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMessage(null),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				value: activeTab,
				onValueChange: (v) => setActiveTab(v),
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "solicitud",
							children: "Solicitud de pago"
						}), /* @__PURE__ */ jsxs(TabsTrigger, {
							value: "bandeja",
							children: [
								"Bandeja Administración/Tesorería (",
								sentRequests.length,
								")"
							]
						})]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "solicitud",
						children: /* @__PURE__ */ jsxs("form", {
							onSubmit: (event) => {
								event.preventDefault();
								sendRequest();
							},
							children: [
								/* @__PURE__ */ jsx(InformacionPredio, {
									projectId,
									codigo: decodedCodigo,
									className: "mb-4"
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Datos principales de la solicitud",
									children: /* @__PURE__ */ jsxs(FormGrid, { children: [
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de solicitud",
											icono: CalendarDays,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fecha,
												onChange: (e) => setForm({
													...form,
													fecha: e.target.value
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Nro. de solicitud",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: `${controlClase} bg-muted`,
												value: form.numero,
												readOnly: true
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Usuario solicitante",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												className: controlClase,
												value: form.solicitante,
												onChange: (e) => setForm({
													...form,
													solicitante: e.target.value
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Área solicitante",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.areaSolicitante,
												onChange: (e) => setForm({
													...form,
													areaSolicitante: e.target.value
												}),
												children: [
													/* @__PURE__ */ jsx("option", { children: "Gestión predial" }),
													/* @__PURE__ */ jsx("option", { children: "Coordinación predial" }),
													/* @__PURE__ */ jsx("option", { children: "Brigada de campo" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Destinatario",
											obligatorio: true,
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.destinatario,
												onChange: (e) => setForm({
													...form,
													destinatario: e.target.value
												}),
												required: true,
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "",
														children: "Seleccione"
													}),
													/* @__PURE__ */ jsx("option", { children: "Tesorería DDP" }),
													/* @__PURE__ */ jsx("option", { children: "Administración DDP" }),
													/* @__PURE__ */ jsx("option", { children: "Administración/Tesorería" })
												]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Estado inicial",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												className: controlClase,
												value: form.estado,
												onChange: (e) => setForm({
													...form,
													estado: e.target.value
												}),
												children: [/* @__PURE__ */ jsx("option", { children: "ENVIADA" }), /* @__PURE__ */ jsx("option", { children: "PENDIENTE DE ATENCIÓN" })]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Correo solicitante",
											icono: Mail,
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "email",
												className: controlClase,
												value: form.correoSolicitante,
												onChange: (e) => setForm({
													...form,
													correoSolicitante: e.target.value
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Fecha de la norma aprobatoria",
											icono: CalendarDays,
											ayuda: "Resolución que aprueba el valor y el pago (art. 20.4.a); inicia el plazo de 20 d.h.",
											children: (id) => /* @__PURE__ */ jsx("input", {
												id,
												type: "date",
												className: controlClase,
												value: form.fechaNorma,
												onChange: (e) => setForm({
													...form,
													fechaNorma: e.target.value
												})
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Prueba de correo",
											ayuda: "Datos de demostración: simula una falla del servicio de correo",
											children: (id) => /* @__PURE__ */ jsxs("label", {
												htmlFor: id,
												className: "flex h-9 items-center gap-2 text-sm",
												children: [/* @__PURE__ */ jsx("input", {
													id,
													type: "checkbox",
													checked: form.simulateEmailFail,
													onChange: (e) => setForm({
														...form,
														simulateEmailFail: e.target.checked
													}),
													className: "size-4 accent-primary"
												}), "Simular falla de envío"]
											})
										}),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Observaciones / sustento",
											ancho: "doble",
											children: (id) => /* @__PURE__ */ jsx("textarea", {
												id,
												rows: 2,
												className: `${controlClase} h-auto py-2`,
												value: form.observacion,
												onChange: (e) => setForm({
													...form,
													observacion: e.target.value
												})
											})
										})
									] })
								}),
								/* @__PURE__ */ jsxs(Section, {
									titulo: "Predios tasados",
									className: "mt-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "relative mb-3 max-w-3xl",
											children: [
												/* @__PURE__ */ jsx("label", {
													htmlFor: "buscar-predio",
													className: "sr-only",
													children: "Buscar predio tasado"
												}),
												/* @__PURE__ */ jsx(Search, {
													size: 16,
													className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
													"aria-hidden": true
												}),
												/* @__PURE__ */ jsx("input", {
													id: "buscar-predio",
													type: "search",
													value: query,
													onChange: (e) => setQuery(e.target.value),
													placeholder: "Buscar por código, propietario, documento, ubicación o expediente",
													className: `${controlClase} pl-9`
												}),
												query && /* @__PURE__ */ jsxs("div", {
													className: "absolute z-40 mt-1 max-h-72 w-full overflow-auto rounded-md border border-border bg-card shadow-md",
													children: [filteredRows.map((row) => {
														return /* @__PURE__ */ jsxs("button", {
															type: "button",
															onClick: () => addPredio(row),
															disabled: details.some((item) => item.codigo === row.codigo),
															className: "flex w-full items-center justify-between gap-3 border-b border-border px-3 py-2 text-left text-sm last:border-b-0 hover:bg-primary-soft disabled:cursor-not-allowed disabled:opacity-50",
															children: [/* @__PURE__ */ jsxs("span", {
																className: "min-w-0",
																children: [/* @__PURE__ */ jsx("span", {
																	className: "block truncate font-mono text-primary-dark",
																	children: row.cod || row.codigo
																}), /* @__PURE__ */ jsxs("span", {
																	className: "block truncate text-xs text-muted-foreground",
																	children: [
																		row.suj,
																		" / ",
																		row.exp || "Sin expediente"
																	]
																})]
															}), /* @__PURE__ */ jsx("span", {
																className: "shrink-0 font-medium tabular-nums",
																children: moneda(parseMoney(row.valor))
															})]
														}, row.rowId);
													}), filteredRows.length === 0 && /* @__PURE__ */ jsx("p", {
														className: "px-3 py-4 text-center text-sm text-muted-foreground",
														children: "Sin predios tasados disponibles."
													})]
												})
											]
										}),
										/* @__PURE__ */ jsx(Tabla, {
											columnas: [
												{
													clave: "cod",
													titulo: "Código",
													render: (r) => /* @__PURE__ */ jsx("span", {
														className: "font-mono text-primary-dark",
														children: r.cod
													})
												},
												{
													clave: "propietario",
													titulo: "Propietario / sujeto pasivo"
												},
												{
													clave: "documento",
													titulo: "DNI / RUC"
												},
												{
													clave: "ubicacion",
													titulo: "Ubicación"
												},
												{
													clave: "valorTasacion",
													titulo: "Valor de tasación",
													alinear: "derecha",
													render: (r) => /* @__PURE__ */ jsx("span", {
														className: "font-medium tabular-nums",
														children: moneda(r.valorTasacion)
													})
												},
												{
													clave: "montoSolicitado",
													titulo: "Monto solicitado",
													alinear: "derecha",
													ancho: "160px",
													render: (r) => /* @__PURE__ */ jsx("input", {
														type: "number",
														min: 0,
														step: "0.01",
														inputMode: "decimal",
														"aria-label": `Monto solicitado para ${r.cod}`,
														value: r.montoSolicitado,
														onChange: (e) => updateDetail(r.codigo, { montoSolicitado: Number(e.target.value) || 0 }),
														className: `${controlClase} text-right tabular-nums`
													})
												},
												{
													clave: "observacion",
													titulo: "Observación",
													ancho: "240px",
													render: (r) => {
														const faltaSustento = r.montoSolicitado > r.valorTasacion && !r.observacion.trim();
														return /* @__PURE__ */ jsx("input", {
															"aria-label": `Observación para ${r.cod}`,
															"aria-invalid": faltaSustento || void 0,
															value: r.observacion,
															onChange: (e) => updateDetail(r.codigo, { observacion: e.target.value }),
															placeholder: faltaSustento ? "Obligatoria: supera la tasación" : "Observación por predio",
															className: `${controlClase} ${faltaSustento ? "border-warning" : ""}`
														});
													}
												},
												{
													clave: "acciones",
													titulo: "Acciones",
													alinear: "derecha",
													ancho: "1%",
													render: (r) => /* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => removeDetail(r.codigo),
														"aria-label": `Quitar predio ${r.cod}`,
														title: "Quitar predio",
														className: "flex size-8 items-center justify-center rounded-md border border-border text-destructive hover:bg-destructive-soft",
														children: /* @__PURE__ */ jsx(Trash2, {
															size: 16,
															"aria-hidden": true
														})
													})
												}
											],
											filas: details,
											claveFila: (r) => r.codigo,
											vacio: "Sin predios agregados. Busque un predio tasado para incluirlo en la solicitud."
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3 flex justify-end",
											children: /* @__PURE__ */ jsxs("div", {
												className: "rounded-md border border-border bg-primary-soft px-4 py-2 text-right",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-xs text-primary-dark",
													children: "Valor total solicitado"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-lg font-semibold tabular-nums text-primary-dark",
													children: moneda(totalSolicitado)
												})]
											})
										})
									]
								}),
								/* @__PURE__ */ jsx(Section, {
									titulo: "Trazabilidad y notificaciones",
									className: "mt-4",
									children: /* @__PURE__ */ jsx(Tabla, {
										columnas: [
											{
												clave: "fecha",
												titulo: "Fecha",
												ancho: "150px"
											},
											{
												clave: "usuario",
												titulo: "Usuario"
											},
											{
												clave: "estadoAnterior",
												titulo: "Estado anterior"
											},
											{
												clave: "estadoNuevo",
												titulo: "Estado nuevo",
												render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
													tono: "primary",
													children: r.estadoNuevo
												})
											},
											{
												clave: "comentario",
												titulo: "Comentario"
											}
										],
										filas: trace,
										claveFila: (r, i) => `${r.fecha}-${i}`
									})
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
										onClick: saveDraft,
										children: [/* @__PURE__ */ jsx(Save, {}), " Guardar borrador"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										type: "submit",
										children: [/* @__PURE__ */ jsx(Send, {}), " Enviar solicitud de pago"]
									})
								] })
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "bandeja",
						children: /* @__PURE__ */ jsxs(Section, {
							titulo: "Bandeja de atención Administración/Tesorería",
							children: [/* @__PURE__ */ jsx("p", {
								className: "mb-3 rounded-md bg-warning-soft px-3 py-1.5 text-xs text-warning",
								children: "Datos de demostración: la bandeja no está conectada a Tesorería."
							}), /* @__PURE__ */ jsx(Tabla, {
								columnas: [
									{
										clave: "numero",
										titulo: "Nro. de solicitud",
										render: (r) => /* @__PURE__ */ jsx("span", {
											className: "font-mono text-primary-dark",
											children: r.numero
										})
									},
									{
										clave: "fecha",
										titulo: "Fecha",
										render: (r) => fecha(r.fecha)
									},
									{
										clave: "solicitante",
										titulo: "Solicitante"
									},
									{
										clave: "cantidadPredios",
										titulo: "Predios",
										alinear: "derecha"
									},
									{
										clave: "total",
										titulo: "Monto total",
										alinear: "derecha",
										render: (r) => /* @__PURE__ */ jsx("span", {
											className: "font-medium tabular-nums",
											children: moneda(r.total)
										})
									},
									{
										clave: "estado",
										titulo: "Estado",
										render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
											tono: ESTADO_TONO[r.estado],
											children: r.estado
										})
									},
									{
										clave: "acciones",
										titulo: "Acciones",
										alinear: "derecha",
										render: (r) => /* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap justify-end gap-1",
											children: [
												/* @__PURE__ */ jsxs(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => attendRequest(r.numero, "ATENDIDA"),
													disabled: r.estado === "ATENDIDA",
													children: [/* @__PURE__ */ jsx(CheckCircle2, {}), " Atender"]
												}),
												/* @__PURE__ */ jsxs(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => attendRequest(r.numero, "OBSERVADA"),
													disabled: r.estado === "OBSERVADA",
													children: [/* @__PURE__ */ jsx(AlertTriangle, {}), " Observar"]
												}),
												/* @__PURE__ */ jsxs(Button, {
													type: "button",
													variant: "outline",
													size: "sm",
													onClick: () => attendRequest(r.numero, "DERIVADA"),
													disabled: r.estado === "DERIVADA",
													children: [/* @__PURE__ */ jsx(Forward, {}), " Derivar"]
												})
											]
										})
									}
								],
								filas: sentRequests,
								claveFila: (r) => r.numero,
								vacio: "Sin solicitudes pendientes."
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { PagoPropietariosPage as component };
