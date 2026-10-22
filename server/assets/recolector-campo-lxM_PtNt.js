import { t as Button } from "./button-DH6ZQkjT.js";
import { _ as registrarEnBitacora, u as ROLES } from "./historial-Bc37nCTn.js";
import { r as cambiarRol, u as useRol } from "./permisos-C7yUz4DS.js";
import { C as useSesionCampo, f as iniciarSesionCampo } from "./campo-Dn2b-x9H.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { r as credencialesValidas } from "./acceso-0XmxD4pK.js";
import { t as mtc_logo_default } from "./mtc-logo-CCXAGej3.js";
import { n as Chips, u as controlCampo } from "./Controles-CqdT34l5.js";
import { useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Eye, EyeOff } from "lucide-react";
//#region src/routes/recolector-campo.tsx?tsr-split=component
/** Perfiles que salen a campo (módulo 30). */
var PERFILES_CAMPO = [
	"ESP_TECNICO",
	"ESP_LEGAL",
	"BRIGADISTA",
	"GESTOR_SOCIAL",
	"COORDINADOR",
	"ADMIN"
];
/** Sin sesión pide el acceso; con sesión muestra la pantalla del recolector. */
function RecolectorCampo() {
	const sesion = useSesionCampo();
	if (sesion === null) return /* @__PURE__ */ jsx("div", { className: "min-h-dvh bg-background" });
	if (!sesion) return /* @__PURE__ */ jsx(AccesoCampo, {});
	return /* @__PURE__ */ jsx(Outlet, {});
}
function AccesoCampo() {
	const rolActual = useRol();
	const [correo, setCorreo] = useState("");
	const [clave, setClave] = useState("");
	const [ver, setVer] = useState(false);
	const [rol, setRol] = useState(PERFILES_CAMPO.includes(rolActual) && rolActual !== "ADMIN" ? rolActual : "ESP_TECNICO");
	const [error, setError] = useState("");
	const ingresar = (e) => {
		e.preventDefault();
		const usuario = correo.trim().toLowerCase();
		if (!credencialesValidas(usuario, clave)) {
			registrarEnBitacora({
				usuario,
				modulo: 30,
				entidad: "sesion",
				registro: usuario,
				accion: "ingreso_fallido",
				detalle: "Recolector de campo: contraseña incorrecta"
			});
			setError("Correo o contraseña incorrectos. Revise los datos e intente de nuevo.");
			return;
		}
		cambiarRol(rol);
		iniciarSesionCampo(usuario);
		registrarEnBitacora({
			usuario,
			modulo: 30,
			entidad: "sesion",
			registro: usuario,
			accion: "ingreso",
			detalle: `Recolector de campo · ${ROLES[rol]}`
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ jsx("header", {
			className: "flex h-14 items-center bg-primary px-4 text-primary-foreground",
			children: /* @__PURE__ */ jsx("p", {
				className: "text-base font-semibold",
				children: "PDGP · Trabajo de campo"
			})
		}), /* @__PURE__ */ jsxs("main", {
			className: "mx-auto w-full max-w-md px-4 py-6",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: mtc_logo_default,
					alt: "Ministerio de Transportes y Comunicaciones",
					className: "h-10"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-5 text-2xl font-bold text-foreground",
					children: "Recolector de campo"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-base text-muted-foreground",
					children: "Padrón y caracterización de predios desde la tablet o el celular."
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: ingresar,
					className: "mt-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "campo-correo",
								className: "mb-1.5 block text-sm font-semibold",
								children: "Correo institucional"
							}), /* @__PURE__ */ jsx("input", {
								id: "campo-correo",
								type: "email",
								autoComplete: "username",
								inputMode: "email",
								value: correo,
								onChange: (e) => setCorreo(e.target.value),
								placeholder: "nombre@mtc.gob.pe",
								className: controlCampo,
								required: true
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "campo-clave",
								className: "mb-1.5 block text-sm font-semibold",
								children: "Contraseña"
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("input", {
									id: "campo-clave",
									type: ver ? "text" : "password",
									autoComplete: "current-password",
									value: clave,
									onChange: (e) => setClave(e.target.value),
									className: `${controlCampo} pr-12`,
									required: true
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setVer((v) => !v),
									"aria-label": ver ? "Ocultar contraseña" : "Mostrar contraseña",
									className: "absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
									children: ver ? /* @__PURE__ */ jsx(EyeOff, {
										size: 20,
										"aria-hidden": true
									}) : /* @__PURE__ */ jsx(Eye, {
										size: 20,
										"aria-hidden": true
									})
								})]
							})]
						}),
						/* @__PURE__ */ jsx(Chips, {
							etiqueta: "Perfil",
							ayuda: "Demostración: elija con qué perfil sale a campo.",
							opciones: PERFILES_CAMPO.map((r) => ({
								valor: r,
								etiqueta: ROLES[r]
							})),
							valor: rol,
							onChange: (v) => v && setRol(v)
						}),
						error && /* @__PURE__ */ jsx(Aviso, {
							tipo: "error",
							children: error
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							className: "h-12 w-full text-base",
							children: "Ingresar"
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "font-medium text-primary-dark underline underline-offset-2",
						children: "Ir al sistema completo"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 space-y-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx("p", { children: "Sesión auditada · Ley 29733 de protección de datos personales." }), /* @__PURE__ */ jsxs("p", { children: [
						"Datos de demostración: correo ",
						/* @__PURE__ */ jsx("span", {
							className: "font-mono",
							children: "bim@mtc.gob.pe"
						}),
						", contraseña ",
						/* @__PURE__ */ jsx("span", {
							className: "font-mono",
							children: "Bim2026*"
						}),
						"."
					] })]
				})
			]
		})]
	});
}
//#endregion
export { RecolectorCampo as component };
