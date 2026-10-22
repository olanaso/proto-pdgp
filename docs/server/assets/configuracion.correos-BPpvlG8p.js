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
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AtSign, History, Mail, Save, Send, X } from "lucide-react";
//#region src/routes/configuracion.correos.tsx?tsr-split=component
var PROVEEDORES = [
	{
		id: "smtp",
		label: "SMTP genérico"
	},
	{
		id: "sendgrid",
		label: "SendGrid"
	},
	{
		id: "resend",
		label: "Resend"
	},
	{
		id: "ses",
		label: "Amazon SES"
	}
];
var INICIAL = {
	host: "smtp.gmail.com",
	port: "587",
	user: "notificaciones@mtc.gob.pe",
	pass: "",
	fromName: "MTC Gestión Predial",
	fromEmail: "notificaciones@mtc.gob.pe",
	secure: "tls",
	apiKey: "",
	domain: ""
};
/** Contraseñas y claves: no se copian al histórico. */
var SECRETOS = ["pass", "apiKey"];
var ETIQUETAS = {
	provider: "Proveedor",
	host: "Servidor SMTP",
	port: "Puerto",
	user: "Usuario",
	fromName: "Nombre del remitente",
	fromEmail: "Correo del remitente",
	secure: "Cifrado",
	domain: "Región"
};
function CorreosPage() {
	const rol = useRol();
	const [provider, setProvider] = useState("smtp");
	const [form, setForm] = useState(INICIAL);
	const historial = useFormularioConHistorial("configuracion-correos", {
		provider,
		...Object.fromEntries(Object.entries(form).filter(([k]) => !SECRETOS.includes(k)))
	}, ({ provider: p, ...resto }) => {
		setProvider(p);
		setForm((f) => ({
			...f,
			...resto
		}));
	}, {
		modulo: 8,
		entidad: "configuracion_correos"
	});
	const [status, setStatus] = useState(null);
	const [testTo, setTestTo] = useState("");
	const upd = (k, v) => setForm({
		...form,
		[k]: v
	});
	const test = () => {
		if (!testTo) return setStatus({
			ok: false,
			msg: "Ingrese un correo de prueba"
		});
		const faltaServidor = provider === "smtp" ? !form.host : !form.apiKey;
		registrarEnvio({
			proyecto: "mtc",
			predio: "",
			paso: "configuracion-correos",
			canal: "Correo",
			destinatario: testTo,
			documento: "Correo de prueba",
			resultado: faltaServidor ? "rechazado" : "enviado",
			detalle: faltaServidor ? "Sin servidor o clave configurados" : void 0
		}, {
			modulo: 8,
			entidad: "configuracion_correos"
		});
		setStatus(faltaServidor ? {
			ok: false,
			msg: `No se pudo enviar a ${testTo}: complete el servidor o la clave`
		} : {
			ok: true,
			msg: `Correo de prueba enviado a ${testTo}`
		});
	};
	const cancelar = () => {
		setForm(INICIAL);
		setProvider("smtp");
		setStatus(null);
	};
	const guardar = () => {
		const proveedor = PROVEEDORES.find((p) => p.id === provider)?.label ?? provider;
		historial.guardarVersion("Guardó la configuración de correo", proveedor);
		setStatus({
			ok: true,
			msg: `Configuración de correo guardada (${proveedor}).`
		});
	};
	const campo = (etiqueta, clave, type = "text") => /* @__PURE__ */ jsx(FormField, {
		etiqueta,
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			type,
			value: form[clave],
			onChange: (e) => upd(clave, e.target.value),
			className: controlClase
		})
	});
	return /* @__PURE__ */ jsxs(AppShell, { children: [/* @__PURE__ */ jsx(PageHeader, {
		icono: Mail,
		titulo: "Configuración de correos",
		descripcion: "Servidor de salida para las notificaciones del sistema: asignaciones, confirmaciones y recordatorios de expedientes.",
		migas: [{ texto: "Configuración" }, { texto: "Correos" }]
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
							titulo: "Servidor de correo",
							children: [
								/* @__PURE__ */ jsx(Subtitulo, { children: "Proveedor" }),
								/* @__PURE__ */ jsx("div", {
									className: "mb-4 flex flex-wrap gap-2",
									role: "group",
									"aria-label": "Proveedor de correo",
									children: PROVEEDORES.map((p) => /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: provider === p.id ? "default" : "outline",
										"aria-pressed": provider === p.id,
										onClick: () => setProvider(p.id),
										children: p.label
									}, p.id))
								}),
								/* @__PURE__ */ jsx(Subtitulo, { children: "Credenciales" }),
								/* @__PURE__ */ jsxs(FormGrid, { children: [
									provider === "smtp" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
										campo("Servidor SMTP", "host"),
										campo("Puerto", "port"),
										campo("Usuario", "user"),
										campo("Contraseña", "pass", "password"),
										/* @__PURE__ */ jsx(FormField, {
											etiqueta: "Cifrado",
											children: (id) => /* @__PURE__ */ jsxs("select", {
												id,
												value: form.secure,
												onChange: (e) => upd("secure", e.target.value),
												className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "none",
														children: "Ninguno"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "tls",
														children: "STARTTLS"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "ssl",
														children: "SSL/TLS"
													})
												]
											})
										})
									] }),
									(provider === "sendgrid" || provider === "resend") && campo("API Key", "apiKey", "password"),
									provider === "ses" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
										campo("Access Key ID", "apiKey"),
										campo("Secret Access Key", "pass", "password"),
										campo("Región", "domain")
									] }),
									campo("Nombre del remitente", "fromName"),
									/* @__PURE__ */ jsx(FormField, {
										etiqueta: "Correo del remitente",
										icono: AtSign,
										children: (id) => /* @__PURE__ */ jsx("input", {
											id,
											type: "email",
											value: form.fromEmail,
											onChange: (e) => upd("fromEmail", e.target.value),
											className: controlClase
										})
									})
								] })
							]
						}),
						/* @__PURE__ */ jsxs(Section, {
							titulo: "Probar conexión",
							acciones: /* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: test,
								children: [/* @__PURE__ */ jsx(Send, {}), " Enviar correo de prueba"]
							}),
							children: [
								/* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
									etiqueta: "Correo de prueba",
									icono: AtSign,
									children: (id) => /* @__PURE__ */ jsx("input", {
										id,
										value: testTo,
										onChange: (e) => setTestTo(e.target.value),
										type: "email",
										placeholder: "correo@dominio.com",
										className: controlClase
									})
								}) }),
								/* @__PURE__ */ jsx("div", {
									className: "mt-3",
									children: /* @__PURE__ */ jsx(HistorialEnvios, {
										proyecto: "mtc",
										paso: "configuracion-correos"
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
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar configuración"]
						})] })
					]
				})
			}),
			/* @__PURE__ */ jsx(TabsContent, {
				value: "historico",
				children: /* @__PURE__ */ jsx(Section, {
					titulo: "Histórico de la configuración de correo",
					children: /* @__PURE__ */ jsx(Historico, {
						registro: "configuracion-correos",
						etiquetas: ETIQUETAS,
						nombreArchivo: "historico-configuracion-correos",
						puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
						onRestaurar: historial.restaurar
					})
				})
			})
		]
	})] });
}
//#endregion
export { CorreosPage as component };
