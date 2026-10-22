import { t as Button } from "./button-DH6ZQkjT.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { i as fondoAcceso, s as useConfigAcceso } from "./acceso-0XmxD4pK.js";
import { t as mtc_logo_default } from "./mtc-logo-CCXAGej3.js";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ShieldCheck } from "lucide-react";
//#region src/routes/verificar.tsx?tsr-split=component
/** "bim@mtc.gob.pe" → "b••@mtc.gob.pe": el usuario reconoce a qué correo llegó el código. */
function enmascarar(correo) {
	const [u, d] = correo.split("@");
	if (!d) return correo;
	return `${u.slice(0, 1)}${"•".repeat(Math.max(2, u.length - 1))}@${d}`;
}
function VerificarPage() {
	const navigate = useNavigate();
	const [apariencia] = useConfigAcceso();
	const [codigo, setCodigo] = useState(Array(6).fill(""));
	const [intentos, setIntentos] = useState(3);
	const [error, setError] = useState("");
	const [cargando, setCargando] = useState(false);
	const [reenvio, setReenvio] = useState(45);
	const inputs = useRef([]);
	let correo = "";
	try {
		correo = localStorage.getItem("mtc-session") ?? "";
	} catch {}
	if (correo && !correo.includes("@")) correo = `${correo}@mtc.gob.pe`;
	useEffect(() => {
		inputs.current[0]?.focus();
	}, []);
	useEffect(() => {
		if (reenvio <= 0) return;
		const t = window.setInterval(() => setReenvio((s) => Math.max(0, s - 1)), 1e3);
		return () => window.clearInterval(t);
	}, [reenvio]);
	const ponerDigito = (i, v) => {
		const d = v.replace(/\D/g, "").slice(-1);
		const next = [...codigo];
		next[i] = d;
		setCodigo(next);
		setError("");
		if (d && i < 5) inputs.current[i + 1]?.focus();
	};
	const alTeclear = (i, e) => {
		if (e.key === "Backspace" && !codigo[i] && i > 0) inputs.current[i - 1]?.focus();
	};
	const pegar = (e) => {
		const texto = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
		if (texto.length < 6) return;
		e.preventDefault();
		setCodigo(texto.split(""));
		inputs.current[5]?.focus();
	};
	const verificar = (e) => {
		e.preventDefault();
		if (codigo.join("") === "000000") {
			const quedan = intentos - 1;
			setIntentos(quedan);
			setError(quedan > 0 ? `El código no coincide. Le quedan ${quedan} intento${quedan === 1 ? "" : "s"}.` : "Agotó los intentos. Vuelva a ingresar para recibir un nuevo código.");
			setCodigo(Array(6).fill(""));
			inputs.current[0]?.focus();
			return;
		}
		setCargando(true);
		setTimeout(() => navigate({ to: "/inicio" }), 600);
	};
	const completo = codigo.every((c) => c !== "");
	return /* @__PURE__ */ jsxs("div", {
		className: "grid min-h-screen bg-background lg:grid-cols-[minmax(0,1fr)_440px]",
		children: [/* @__PURE__ */ jsxs("section", {
			className: "px-6 py-8 sm:px-10 lg:px-14 lg:py-12",
			style: fondoAcceso(apariencia),
			children: [
				/* @__PURE__ */ jsx("img", {
					src: mtc_logo_default,
					alt: "Ministerio de Transportes y Comunicaciones",
					className: "h-12 object-contain"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-6 max-w-xl text-3xl font-bold leading-tight text-foreground",
					children: "Plataforma Digital de Gestión de Predios"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 max-w-xl text-sm text-muted-foreground",
					children: "Adquisición y expropiación de inmuebles para obras de infraestructura · TUO del DL 1192"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-10 max-w-md text-sm text-muted-foreground",
					children: "La verificación en dos pasos protege los expedientes y los datos personales de los sujetos pasivos. Cada ingreso queda en la bitácora del sistema."
				})
			]
		}), /* @__PURE__ */ jsxs("section", {
			className: "flex flex-col border-t border-border bg-card px-6 py-8 sm:px-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12",
			"aria-labelledby": "titulo-verificar",
			children: [
				/* @__PURE__ */ jsxs("h2", {
					id: "titulo-verificar",
					className: "flex items-center gap-2.5 text-xl font-bold text-foreground",
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-dark",
						"aria-hidden": true,
						children: /* @__PURE__ */ jsx(ShieldCheck, { size: 22 })
					}), "Verificación en dos pasos"]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Enviamos un código de 6 dígitos a",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "font-mono text-foreground",
							children: enmascarar(correo) || "su correo"
						}),
						". Vence en 10 minutos."
					]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: verificar,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex gap-2",
							role: "group",
							"aria-label": "Código de verificación",
							onPaste: pegar,
							children: codigo.map((d, i) => /* @__PURE__ */ jsx("input", {
								ref: (el) => {
									inputs.current[i] = el;
								},
								value: d,
								onChange: (e) => ponerDigito(i, e.target.value),
								onKeyDown: (e) => alTeclear(i, e),
								inputMode: "numeric",
								autoComplete: i === 0 ? "one-time-code" : "off",
								maxLength: 1,
								"aria-label": `Dígito ${i + 1}`,
								className: "h-12 w-full rounded-md border border-input bg-background text-center text-lg font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
							}, i))
						}),
						error && /* @__PURE__ */ jsx(Aviso, {
							tipo: "error",
							children: error
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: !completo || cargando || intentos <= 0,
							className: "h-10 w-full",
							children: cargando ? "Verificando…" : "Verificar e ingresar"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: reenvio > 0,
								onClick: () => {
									setReenvio(45);
									setError("");
								},
								className: "text-primary underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline",
								children: reenvio > 0 ? `Reenviar código en ${reenvio} s` : "Reenviar código"
							}), /* @__PURE__ */ jsxs(Link, {
								to: "/",
								className: "inline-flex items-center gap-1 text-foreground underline-offset-2 hover:underline",
								children: [/* @__PURE__ */ jsx(ArrowLeft, {
									size: 14,
									"aria-hidden": true
								}), " Volver al acceso"]
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-auto space-y-1 pt-8 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx("p", { children: "¿No llegó el correo? Revise la carpeta de no deseados o pida el reenvío." }), /* @__PURE__ */ jsxs("p", { children: [
						"Datos de demostración: cualquier código de 6 dígitos ingresa;",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "font-mono",
							children: "000000"
						}),
						" muestra el rechazo."
					] })]
				})
			]
		})]
	});
}
//#endregion
export { VerificarPage as component };
