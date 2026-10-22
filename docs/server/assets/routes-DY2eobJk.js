import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { _ as registrarEnBitacora } from "./historial-Bc37nCTn.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { i as fondoAcceso, r as credencialesValidas, s as useConfigAcceso } from "./acceso-0XmxD4pK.js";
import { t as mtc_logo_default } from "./mtc-logo-CCXAGej3.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Eye, EyeOff } from "lucide-react";
//#region src/components/kit/IconosPerfil.tsx
var base = (size) => ({
	width: size,
	height: size,
	viewBox: "0 0 48 48",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": true
});
/** Sujeto Activo: sede institucional con frontón, columnas y bandera. */
function IconoSujetoActivo({ size = 24, ...p }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		...p,
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M6 20 24 9l18 11Z",
				fill: "currentColor",
				opacity: ".15"
			}),
			/* @__PURE__ */ jsx("path", { d: "M6 20 24 9l18 11Z" }),
			/* @__PURE__ */ jsx("path", { d: "M10 20v16M18 20v16M30 20v16M38 20v16" }),
			/* @__PURE__ */ jsx("path", {
				d: "M8 36h32v4H8z",
				fill: "currentColor",
				opacity: ".15"
			}),
			/* @__PURE__ */ jsx("path", { d: "M8 36h32v4H8z" }),
			/* @__PURE__ */ jsx("path", {
				d: "M24 9V3h7l-2 2 2 2h-7",
				fill: "currentColor",
				opacity: ".3"
			})
		]
	});
}
/** Beneficiario: obra en ejecución, edificio con grúa y la vía al frente. */
function IconoBeneficiario({ size = 24, ...p }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		...p,
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M8 40V18h16v22",
				fill: "currentColor",
				opacity: ".15"
			}),
			/* @__PURE__ */ jsx("path", { d: "M8 40V18h16v22" }),
			/* @__PURE__ */ jsx("path", { d: "M12 23h3M17 23h3M12 29h3M17 29h3M12 35h3M17 35h3" }),
			/* @__PURE__ */ jsx("path", {
				d: "M28 40V12l14-4v32",
				fill: "currentColor",
				opacity: ".15"
			}),
			/* @__PURE__ */ jsx("path", { d: "M28 40V12l14-4v32" }),
			/* @__PURE__ */ jsx("path", { d: "M33 16v3M37 15v3M33 24v3M37 23v3M33 32v3M37 31v3" }),
			/* @__PURE__ */ jsx("path", { d: "M4 40h40" }),
			/* @__PURE__ */ jsx("path", {
				d: "M4 44h40",
				strokeDasharray: "3 3",
				opacity: ".6"
			})
		]
	});
}
/** Sujeto Pasivo: vivienda y chacra, el predio que la obra afecta. */
function IconoSujetoPasivo({ size = 24, ...p }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		...p,
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M8 24 22 12l14 12v15H8z",
				fill: "currentColor",
				opacity: ".15"
			}),
			/* @__PURE__ */ jsx("path", { d: "M8 24 22 12l14 12v15H8z" }),
			/* @__PURE__ */ jsx("path", { d: "M18 39V29h8v10" }),
			/* @__PURE__ */ jsx("path", { d: "M28 20v-5h4v8" }),
			/* @__PURE__ */ jsx("path", { d: "M40 39v-9" }),
			/* @__PURE__ */ jsx("path", {
				d: "M40 30c-4 0-5-5-2-7 0-3 4-3 4 0 3 2 2 7-2 7Z",
				fill: "currentColor",
				opacity: ".3"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M4 44c6-3 10-3 16 0s10 3 16 0 10-3 8 0",
				opacity: ".6"
			})
		]
	});
}
/** Terceros: acta sellada y balanza, el trámite puntual de peritos, notarías y árbitros. */
function IconoTerceros({ size = 24, ...p }) {
	return /* @__PURE__ */ jsxs("svg", {
		...base(size),
		...p,
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M10 6h20l8 8v28H10z",
				fill: "currentColor",
				opacity: ".15"
			}),
			/* @__PURE__ */ jsx("path", { d: "M10 6h20l8 8v28H10z" }),
			/* @__PURE__ */ jsx("path", { d: "M30 6v8h8" }),
			/* @__PURE__ */ jsx("path", { d: "M16 20h12M16 26h8" }),
			/* @__PURE__ */ jsx("circle", {
				cx: "31",
				cy: "33",
				r: "5",
				fill: "currentColor",
				opacity: ".3"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "31",
				cy: "33",
				r: "5"
			}),
			/* @__PURE__ */ jsx("path", { d: "m28 33 2 2 4-4" })
		]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var CLAVE_RECORDAR = "mtc-recordar";
/**
* Sujetos del TUO del DL 1192 (Título II, Cap. I). El panel derecho cambia según el perfil elegido.
* El ícono y su color identifican el perfil; el texto siempre lo nombra, el color nunca va solo.
*/
var PERFILES = [
	{
		clave: "activo",
		icono: IconoSujetoActivo,
		tono: "bg-primary-soft text-primary-dark",
		nombre: "Sujeto Activo",
		descripcion: "Entidad del Estado que conduce la adquisición o expropiación del predio: aquí, el MTC.",
		ejemplo: "Especialista legal o técnico de la DDP; consultor de la empresa contratada para el saneamiento.",
		base: "art. 5 · credencial institucional",
		titulo: "Sujeto Activo · MTC",
		detalle: "Personal de la Dirección de Disponibilidad de Predios (DDP) y consultores acreditados.",
		correo: {
			etiqueta: "Correo institucional",
			ejemplo: "nombre@mtc.gob.pe"
		}
	},
	{
		clave: "beneficiario",
		icono: IconoBeneficiario,
		tono: "bg-success-soft text-success",
		nombre: "Beneficiario",
		descripcion: "Entidad a cuyo favor se destina el predio: la titular de la obra, cuando no es el propio MTC.",
		ejemplo: "Gobierno regional que ejecuta una vía departamental; concesionaria de una línea del Metro.",
		base: "art. 5.2 · convenio interinstitucional",
		titulo: "Beneficiario · entidad titular de la obra",
		detalle: "Concesionarias, gobiernos regionales y locales con convenio vigente con la DDP.",
		correo: {
			etiqueta: "Correo institucional de la entidad",
			ejemplo: "nombre@entidad.gob.pe"
		}
	},
	{
		clave: "pasivo",
		icono: IconoSujetoPasivo,
		tono: "bg-warning-soft text-warning",
		nombre: "Sujeto Pasivo",
		descripcion: "Propietario o poseedor del inmueble que la obra afecta, total o parcialmente.",
		ejemplo: "Dueño de la chacra que atraviesa la carretera; familia que posee la vivienda junto al aeropuerto.",
		base: "art. 6 y 7 · sin cuenta, DNI / RUC",
		titulo: "Sujeto Pasivo · consulta del expediente",
		detalle: "Sin cuenta: entre a la consulta pública y vea el estado de su expediente con su DNI o RUC y el código del predio.",
		correo: {
			etiqueta: "",
			ejemplo: ""
		}
	},
	{
		clave: "terceros",
		icono: IconoTerceros,
		tono: "bg-muted text-foreground",
		nombre: "Terceros",
		descripcion: "Entidades y profesionales que intervienen en un trámite puntual del expediente, por invitación de la DDP.",
		ejemplo: "Perito tasador, notaría que eleva la minuta a escritura pública, registrador de SUNARP, árbitro.",
		base: "acceso por invitación",
		titulo: "Terceros · acceso por invitación",
		detalle: "Peritos, notarías, SUNARP, SBN y árbitros. La invitación de la DDP llega por correo con la credencial.",
		correo: {
			etiqueta: "Correo de la invitación",
			ejemplo: "nombre@entidad.pe"
		}
	}
];
function AccesoPage() {
	const navigate = useNavigate();
	const [perfil, setPerfil] = useState("activo");
	const [correo, setCorreo] = useState("");
	const [clave, setClave] = useState("");
	const [ver, setVer] = useState(false);
	const [recordar, setRecordar] = useState(false);
	const [cargando, setCargando] = useState(false);
	const [error, setError] = useState("");
	const [aviso, setAviso] = useState("");
	const [apariencia] = useConfigAcceso();
	useEffect(() => {
		try {
			const guardado = localStorage.getItem(CLAVE_RECORDAR);
			if (guardado) {
				setCorreo(guardado);
				setRecordar(true);
			}
		} catch {}
	}, []);
	const actual = PERFILES.find((p) => p.clave === perfil) ?? PERFILES[0];
	const elegir = (p) => {
		setPerfil(p);
		setError("");
		setAviso("");
	};
	const ingresar = (e) => {
		e.preventDefault();
		const usuario = correo.trim().toLowerCase();
		if (!credencialesValidas(usuario, clave)) {
			registrarEnBitacora({
				usuario,
				modulo: 8,
				entidad: "sesion",
				registro: usuario,
				accion: "ingreso_fallido",
				detalle: `Perfil ${actual.nombre}: contraseña incorrecta`
			});
			setError("Correo o contraseña incorrectos. Revise los datos e intente de nuevo.");
			return;
		}
		setError("");
		try {
			localStorage.setItem("mtc-session", usuario);
			if (recordar) localStorage.setItem(CLAVE_RECORDAR, usuario);
			else localStorage.removeItem(CLAVE_RECORDAR);
		} catch {}
		registrarEnBitacora({
			usuario,
			modulo: 8,
			entidad: "sesion",
			registro: usuario,
			accion: "ingreso",
			detalle: `Perfil ${actual.nombre}`
		});
		setCargando(true);
		setTimeout(() => navigate({ to: "/verificar" }), 400);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid min-h-screen bg-background lg:grid-cols-[minmax(0,1fr)_440px]",
		children: [/* @__PURE__ */ jsxs("section", {
			className: "px-6 py-8 sm:px-10 lg:px-14 lg:py-12",
			style: fondoAcceso(apariencia),
			"aria-labelledby": "titulo-plataforma",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: mtc_logo_default,
					alt: "Ministerio de Transportes y Comunicaciones",
					className: "h-12 object-contain"
				}),
				/* @__PURE__ */ jsx("h1", {
					id: "titulo-plataforma",
					className: "mt-6 max-w-xl text-3xl font-bold leading-tight text-foreground",
					children: "Plataforma Digital de Gestión de Predios"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 max-w-xl text-sm text-muted-foreground",
					children: "Adquisición y expropiación de inmuebles para obras de infraestructura · TUO del DL 1192"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-10 text-base font-semibold text-foreground",
					children: "¿Quién eres en el proceso?"
				}),
				/* @__PURE__ */ jsx("div", {
					role: "radiogroup",
					"aria-label": "Perfil de acceso",
					className: "mt-3 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2",
					children: PERFILES.map((p) => {
						const elegido = p.clave === perfil;
						return /* @__PURE__ */ jsxs("button", {
							type: "button",
							role: "radio",
							"aria-checked": elegido,
							onClick: () => elegir(p.clave),
							className: `rounded-lg border-2 bg-card p-4 text-left transition-colors ${elegido ? "border-primary" : "border-border hover:border-primary/50"}`,
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ jsx("span", {
										className: `flex size-12 shrink-0 items-center justify-center rounded-lg ${p.tono}`,
										"aria-hidden": true,
										children: /* @__PURE__ */ jsx(p.icono, { size: 32 })
									}), /* @__PURE__ */ jsx("span", {
										className: "text-base font-bold text-foreground",
										children: p.nombre
									})]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "mt-1 block text-sm text-muted-foreground",
									children: p.descripcion
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "mt-2 block text-sm text-foreground",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold",
											children: "Por ejemplo:"
										}),
										" ",
										p.ejemplo
									]
								}),
								/* @__PURE__ */ jsx("span", {
									className: "mt-2 block font-mono text-xs text-primary-dark",
									children: p.base
								})
							]
						}, p.clave);
					})
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-8 max-w-2xl text-xs text-muted-foreground",
					children: "Sujeto Activo y Beneficiario pueden ser entidades distintas (art. 5 del TUO) · Acceso con credencial institucional."
				})
			]
		}), /* @__PURE__ */ jsxs("section", {
			className: "flex flex-col border-t border-border bg-card px-6 py-8 sm:px-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12",
			"aria-labelledby": "titulo-acceso",
			children: [
				/* @__PURE__ */ jsxs("h2", {
					id: "titulo-acceso",
					className: "flex items-center gap-2.5 text-xl font-bold text-foreground",
					children: [/* @__PURE__ */ jsx("span", {
						className: `flex size-10 shrink-0 items-center justify-center rounded-lg ${actual.tono}`,
						"aria-hidden": true,
						children: /* @__PURE__ */ jsx(actual.icono, { size: 26 })
					}), actual.titulo]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: actual.detalle
				}),
				perfil === "pasivo" ? /* @__PURE__ */ jsxs("div", {
					className: "mt-6 space-y-4",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						className: "h-10 w-full",
						onClick: () => navigate({ to: "/seguimiento-sujeto-pasivo" }),
						children: "Consultar mi expediente"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Consulta pública del estado del expediente: etapa, plazos y documentos notificados. No requiere cuenta; el DNI o RUC y el código del predio se piden en la consulta."
					})]
				}) : /* @__PURE__ */ jsxs("form", {
					onSubmit: ingresar,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "correo",
								className: "text-sm font-medium text-foreground",
								children: actual.correo.etiqueta
							}), /* @__PURE__ */ jsx("input", {
								id: "correo",
								type: "email",
								autoComplete: "username",
								value: correo,
								onChange: (e) => setCorreo(e.target.value),
								placeholder: actual.correo.ejemplo,
								className: controlClase,
								required: true
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "clave",
								className: "text-sm font-medium text-foreground",
								children: "Contraseña"
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("input", {
									id: "clave",
									type: ver ? "text" : "password",
									autoComplete: "current-password",
									value: clave,
									onChange: (e) => setClave(e.target.value),
									className: `${controlClase} pr-10`,
									required: true
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setVer((v) => !v),
									"aria-label": ver ? "Ocultar contraseña" : "Mostrar contraseña",
									title: ver ? "Ocultar contraseña" : "Mostrar contraseña",
									className: "absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground",
									children: ver ? /* @__PURE__ */ jsx(EyeOff, {
										size: 16,
										"aria-hidden": true
									}) : /* @__PURE__ */ jsx(Eye, {
										size: 16,
										"aria-hidden": true
									})
								})]
							})]
						}),
						error && /* @__PURE__ */ jsx(Aviso, {
							tipo: "error",
							children: error
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex cursor-pointer items-center gap-2 text-foreground",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: recordar,
									onChange: (e) => setRecordar(e.target.checked),
									className: "size-4 accent-primary"
								}), "Recordarme"]
							}), /* @__PURE__ */ jsx(Link, {
								to: "/recuperar",
								className: "text-primary underline-offset-2 hover:underline",
								children: "Olvidé mi contraseña"
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: cargando,
							className: "h-10 w-full",
							children: cargando ? "Ingresando…" : "Ingresar"
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							className: "h-10 w-full border-dashed",
							onClick: () => setAviso("ID GOB.PE: disponible cuando la DDP active el convenio con la Secretaría de Gobierno y Transformación Digital."),
							children: "Ingresar con ID GOB.PE"
						}),
						aviso && /* @__PURE__ */ jsx(Aviso, {
							tipo: "info",
							onCerrar: () => setAviso(""),
							children: aviso
						}),
						perfil === "activo" && /* @__PURE__ */ jsx(Link, {
							to: "/recolector-campo",
							className: "block text-sm font-medium text-primary-dark underline-offset-2 hover:underline",
							children: "Trabajo de campo en tablet o celular →"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-auto space-y-1 pt-8 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx("p", { children: "Al ingresar aceptas el tratamiento de datos personales (Ley 29733). Sesión auditada." }), /* @__PURE__ */ jsxs("p", { children: [
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
export { AccesoPage as component };
