import { t as login_bg_default } from "./login-bg-CFFUB6xk.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
//#region src/routes/recuperar.tsx?tsr-split=component
function RecuperarPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");
	const submit = (e) => {
		e.preventDefault();
		setError("");
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Ingrese un correo válido");
			return;
		}
		setSending(true);
		setTimeout(() => {
			setSending(false);
			setSent(true);
		}, 900);
	};
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4",
		style: { backgroundImage: `url(${login_bg_default})` },
		children: /* @__PURE__ */ jsx("div", {
			className: "w-full max-w-[420px]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-card rounded-md shadow-xl pt-8 pb-6 px-8 border-t-4 border-primary",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-center text-xl font-bold text-primary leading-tight",
						children: "RECUPERAR CONTRASEÑA"
					}),
					/* @__PURE__ */ jsx("div", { className: "mx-auto mt-3 h-0.5 w-16 bg-primary rounded-sm" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-center mt-4 text-xs text-muted-foreground",
						children: sent ? "Revisa tu bandeja de entrada." : "Te enviaremos tu contraseña al correo registrado."
					}),
					sent ? /* @__PURE__ */ jsxs("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ jsxs("div", {
							role: "status",
							className: "flex items-start gap-3 bg-success-soft border border-success rounded-md p-3",
							children: [/* @__PURE__ */ jsx(CheckCircle2, {
								size: 18,
								className: "text-success mt-0.5 shrink-0",
								"aria-hidden": true
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm text-success",
								children: [
									"Contraseña enviada al correo ",
									/* @__PURE__ */ jsx("strong", { children: email }),
									". Si no la encuentras, revisa la carpeta de spam."
								]
							})]
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => navigate({ to: "/" }),
							className: "w-full mt-4 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold text-sm py-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
							children: "VOLVER AL INICIO DE SESIÓN"
						})]
					}) : /* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-5 space-y-3",
						children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "recuperar-email",
								className: "block text-xs text-foreground",
								children: "Correo electrónico"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx(Mail, {
									size: 16,
									className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
									"aria-hidden": true
								}), /* @__PURE__ */ jsx("input", {
									id: "recuperar-email",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "usuario@mtc.gob.pe",
									className: "w-full pl-9 pr-3 py-2.5 border border-border rounded-md text-sm bg-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30",
									required: true,
									autoFocus: true
								})]
							}),
							error && /* @__PURE__ */ jsx("p", {
								role: "alert",
								className: "text-xs text-destructive",
								children: error
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: sending,
								className: "w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold text-sm py-2.5 rounded-md mt-2 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
								children: sending ? "ENVIANDO..." : "ENVIAR CONTRASEÑA"
							}),
							/* @__PURE__ */ jsxs(Link, {
								to: "/",
								className: "w-full flex items-center justify-center gap-2 bg-card hover:bg-primary-soft text-primary border border-primary font-semibold text-sm py-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
								children: [/* @__PURE__ */ jsx(ArrowLeft, {
									size: 14,
									"aria-hidden": true
								}), " VOLVER"]
							})
						]
					})
				]
			})
		})
	});
}
//#endregion
export { RecuperarPage as component };
