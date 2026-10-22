import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { r as registrarEnvio } from "./envios-0BYSMr_j.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as HistorialEnvios } from "./HistorialEnvios-BdqFQs1Q.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ExternalLink, History, MessageSquare, Phone, Save, Send, X } from "lucide-react";
//#region src/routes/configuracion.sms.tsx?tsr-split=component
var INICIAL = {
	accountSid: "",
	authToken: "",
	apiKeySid: "",
	apiKeySecret: "",
	from: "+51",
	messagingServiceSid: "",
	statusCallback: "https://mtc.gob.pe/api/twilio/status",
	geoPermissions: true,
	pumpingProtection: true
};
var CHECK = "size-4 rounded-sm accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";
/** Tokens y secretos: no se copian al histórico. */
var SECRETOS = ["authToken", "apiKeySecret"];
var ETIQUETAS = {
	accountSid: "Account SID",
	apiKeySid: "API Key SID",
	from: "Número remitente",
	messagingServiceSid: "Messaging Service SID",
	statusCallback: "Status Callback URL",
	geoPermissions: "Solo destinos en Perú",
	pumpingProtection: "SMS Pumping Protection"
};
function SmsPage() {
	const rol = useRol();
	const [form, setForm] = useState(INICIAL);
	const historial = useFormularioConHistorial("configuracion-sms", Object.fromEntries(Object.entries(form).filter(([k]) => !SECRETOS.includes(k))), (v) => setForm((f) => ({
		...f,
		...v
	})), {
		modulo: 8,
		entidad: "configuracion_sms"
	});
	const [testTo, setTestTo] = useState("");
	const [testBody, setTestBody] = useState("Mensaje de prueba MTC Gestión Predial");
	const [status, setStatus] = useState(null);
	const upd = (k, v) => setForm({
		...form,
		[k]: v
	});
	const test = () => {
		if (!testTo) return setStatus({
			ok: false,
			msg: "Ingrese un número destino"
		});
		const sinCredenciales = !form.accountSid || !form.authToken;
		registrarEnvio({
			proyecto: "mtc",
			predio: "",
			paso: "configuracion-sms",
			canal: "SMS",
			destinatario: testTo,
			documento: testBody,
			resultado: sinCredenciales ? "rechazado" : "enviado",
			detalle: sinCredenciales ? "Sin Account SID o Auth Token" : void 0
		}, {
			modulo: 8,
			entidad: "configuracion_sms"
		});
		setStatus(sinCredenciales ? {
			ok: false,
			msg: `No se pudo enviar a ${testTo}: complete Account SID y Auth Token`
		} : {
			ok: true,
			msg: `SMS de prueba enviado a ${testTo}`
		});
	};
	const cancelar = () => {
		setForm(INICIAL);
		setStatus(null);
	};
	const guardar = () => {
		if (!form.accountSid || !form.authToken) return setStatus({
			ok: false,
			msg: "No se pudo guardar la conexión: complete Account SID y Auth Token"
		});
		historial.guardarVersion("Guardó la conexión con Twilio", form.accountSid);
		setStatus({
			ok: true,
			msg: "Conexión con Twilio guardada."
		});
	};
	const campo = (etiqueta, clave, type = "text", placeholder) => /* @__PURE__ */ jsx(FormField, {
		etiqueta,
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			type,
			value: String(form[clave]),
			placeholder,
			onChange: (e) => upd(clave, e.target.value),
			className: controlClase
		})
	});
	return /* @__PURE__ */ jsxs(AppShell, { children: [/* @__PURE__ */ jsx(PageHeader, {
		icono: MessageSquare,
		titulo: "Configuración de SMS · Twilio",
		descripcion: "Conexión a Twilio para notificaciones SMS a propietarios y equipo técnico, con trazabilidad de expedientes.",
		migas: [{ texto: "Configuración" }, { texto: "SMS" }],
		acciones: /* @__PURE__ */ jsx(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ jsxs("a", {
				href: "https://console.twilio.com/",
				target: "_blank",
				rel: "noreferrer",
				children: ["Abrir consola Twilio ", /* @__PURE__ */ jsx(ExternalLink, {})]
			})
		})
	}), /* @__PURE__ */ jsxs(Tabs, {
		defaultValue: "configuracion",
		children: [
			/* @__PURE__ */ jsxs(TabsList, {
				className: "mb-3",
				children: [/* @__PURE__ */ jsx(TabsTrigger, {
					value: "configuracion",
					children: "Configuración"
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
				value: "configuracion",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => {
						e.preventDefault();
						guardar();
					},
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs(Section, {
							titulo: "Credenciales de Twilio",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "mb-3 text-xs text-muted-foreground",
									children: "Obtenga las credenciales desde la consola de Twilio."
								}),
								/* @__PURE__ */ jsxs(FormGrid, { children: [
									campo("Account SID", "accountSid", "text", "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
									campo("Auth Token", "authToken", "password"),
									campo("API Key SID (opcional)", "apiKeySid"),
									campo("API Key Secret (opcional)", "apiKeySecret", "password"),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Número remitente (E.164)",
										icono: Phone,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											value: form.from,
											placeholder: "+51987654321",
											onChange: (e) => upd("from", e.target.value),
											className: controlClase
										})
									}),
									campo("Messaging Service SID (opcional)", "messagingServiceSid"),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Status Callback URL",
										ancho: "doble",
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "url",
											value: form.statusCallback,
											onChange: (e) => upd("statusCallback", e.target.value),
											className: controlClase
										})
									})
								] }),
								/* @__PURE__ */ jsx(Subtitulo, { children: "Protección y permisos" }),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "flex items-center gap-2 text-sm",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: form.pumpingProtection,
											onChange: (e) => upd("pumpingProtection", e.target.checked),
											className: CHECK
										}), "Habilitar SMS Pumping Protection"]
									}), /* @__PURE__ */ jsxs("label", {
										className: "flex items-center gap-2 text-sm",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: form.geoPermissions,
											onChange: (e) => upd("geoPermissions", e.target.checked),
											className: CHECK
										}), "Restringir envío solo a destinos en Perú (Geo Permissions)"]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs(Section, {
							titulo: "Probar envío",
							acciones: /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: test,
								children: [/* @__PURE__ */ jsx(Send, {}), " Enviar SMS de prueba"]
							}),
							children: [
								/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Número destino",
									icono: Phone,
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										value: testTo,
										onChange: (e) => setTestTo(e.target.value),
										placeholder: "+51987654321",
										className: controlClase
									})
								}), /* @__PURE__ */ jsx(FormField, {
									etiqueta: "Mensaje de prueba",
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										value: testBody,
										onChange: (e) => setTestBody(e.target.value),
										className: controlClase
									})
								})] }),
								/* @__PURE__ */ jsx("div", {
									className: "mt-3",
									children: /* @__PURE__ */ jsx(HistorialEnvios, {
										proyecto: "mtc",
										paso: "configuracion-sms"
									})
								}),
								status && /* @__PURE__ */ jsxs("p", {
									role: status.ok ? "status" : "alert",
									className: `mt-3 flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm ${status.ok ? "border-success bg-success-soft text-success" : "border-destructive bg-destructive-soft text-destructive"}`,
									children: [status.msg, /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setStatus(null),
										"aria-label": "Cerrar aviso",
										className: "rounded-sm",
										children: /* @__PURE__ */ jsx(X, {
											size: 16,
											"aria-hidden": true
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: cancelar,
							children: "Cancelar"
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar conexión"]
						})] })
					]
				})
			}),
			/* @__PURE__ */ jsx(TabsContent, {
				value: "historico",
				children: /* @__PURE__ */ jsx(Section, {
					titulo: "Histórico de la conexión con Twilio",
					children: /* @__PURE__ */ jsx(Historico, {
						registro: "configuracion-sms",
						etiquetas: ETIQUETAS,
						nombreArchivo: "historico-configuracion-sms",
						puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
						onRestaurar: historial.restaurar
					})
				})
			})
		]
	})] });
}
//#endregion
export { SmsPage as component };
