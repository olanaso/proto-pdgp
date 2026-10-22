import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { o as useHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { a as imagenDeFondo, i as fondoAcceso, n as REGISTRO_ACCESO, o as registrarConfigAcceso, s as useConfigAcceso, t as ACCESO_POR_DEFECTO } from "./acceso-0XmxD4pK.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { History, MonitorSmartphone, Save } from "lucide-react";
//#region src/routes/configuracion.acceso.tsx?tsr-split=component
function ConfigAccesoPage() {
	const rol = useRol();
	const edita = rol === "ADMIN" || rol === "COORDINADOR";
	const [guardada, guardar] = useConfigAcceso();
	const [c, setC] = useState(guardada);
	const [mensaje, setMensaje] = useState(null);
	const [error, setError] = useState(null);
	const versiones = useHistorial(REGISTRO_ACCESO);
	const firma = JSON.stringify(guardada);
	useEffect(() => setC(JSON.parse(firma)), [firma]);
	const set = (k, v) => setC((x) => ({
		...x,
		[k]: v
	}));
	const subir = async (archivo) => {
		if (!archivo) return;
		setError(null);
		try {
			set("imagen", await imagenDeFondo(archivo));
		} catch (e) {
			setError(e instanceof Error ? e.message : "No se pudo cargar la imagen.");
		}
	};
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: MonitorSmartphone,
			titulo: "Pantalla de acceso",
			descripcion: "Banner detrás de las tarjetas de perfil, o color sólido, que ven todos al ingresar.",
			migas: [{ texto: "Configuración" }, { texto: "Pantalla de acceso" }]
		}),
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(null),
			children: mensaje
		}),
		error && /* @__PURE__ */ jsx(Aviso, {
			tipo: "error",
			onCerrar: () => setError(null),
			children: error
		}),
		!edita && /* @__PURE__ */ jsx(Aviso, {
			tipo: "info",
			children: "Su perfil solo puede leer esta configuración."
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "config",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "config",
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
							versiones.length,
							")"
						]
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "config",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 gap-4 xl:grid-cols-[1fr_520px]",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Section, {
							titulo: "Fondo",
							children: /* @__PURE__ */ jsxs(FormGrid, { children: [
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Tipo de fondo",
									children: /* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-x-5 gap-y-1 pt-2 text-sm",
										role: "radiogroup",
										children: [["banner", "Banner (imagen)"], ["color", "Color sólido"]].map(([k, t]) => /* @__PURE__ */ jsxs("label", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "radio",
												name: "fondo",
												className: "accent-primary",
												disabled: !edita,
												checked: c.fondo === k,
												onChange: () => set("fondo", k)
											}), t]
										}, k))
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Color de fondo",
									ayuda: "Solo con fondo de color. Vacío: el color del tema.",
									children: (id) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 pt-1",
										children: [
											/* @__PURE__ */ jsx("input", {
												id,
												type: "color",
												"aria-label": "Color de fondo",
												disabled: !edita || c.fondo !== "color",
												value: c.color || "#f8f8f8",
												onChange: (e) => set("color", e.target.value),
												className: "h-9 w-14 cursor-pointer rounded-sm border border-border bg-card p-0.5"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "font-mono text-sm text-muted-foreground",
												children: c.color || "tema"
											}),
											c.color && edita && /* @__PURE__ */ jsx(Button, {
												type: "button",
												variant: "ghost",
												size: "sm",
												onClick: () => set("color", ""),
												children: "Quitar"
											})
										]
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Imagen del banner",
									ayuda: c.imagen ? "Banner propio. Quítelo para volver a la sede del MTC." : "Por defecto, la sede del MTC. JPG o PNG; se reduce a 1920 px.",
									children: (id) => /* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-2 pt-1",
										children: [/* @__PURE__ */ jsx("input", {
											id,
											type: "file",
											accept: "image/*",
											disabled: !edita || c.fondo !== "banner",
											onChange: (e) => subir(e.target.files?.[0]),
											className: `${controlClase} h-auto py-1.5 file:mr-3 file:rounded-sm file:border-0 file:bg-muted file:px-2 file:py-1 file:text-sm`
										}), c.imagen && edita && /* @__PURE__ */ jsx(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => set("imagen", ""),
											children: "Quitar imagen"
										})]
									})
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Velo claro sobre el banner",
									ayuda: "Más velo, más legible el texto; menos velo, más se ve la imagen.",
									children: (id) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 pt-1",
										children: [/* @__PURE__ */ jsx("input", {
											id,
											type: "range",
											min: 0,
											max: 100,
											disabled: !edita || c.fondo !== "banner",
											value: c.velo,
											onChange: (e) => set("velo", Number(e.target.value)),
											className: "w-full accent-primary"
										}), /* @__PURE__ */ jsxs("span", {
											className: "w-12 text-right font-mono text-sm text-muted-foreground",
											children: [c.velo, " %"]
										})]
									})
								})
							] })
						}), edita && /* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setC(ACCESO_POR_DEFECTO),
							children: "Valores por defecto"
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							onClick: () => {
								registrarConfigAcceso(guardada, c);
								guardar(c);
								setMensaje("Configuración guardada. Se aplica a la pantalla de acceso.");
							},
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar configuración"]
						})] })] }), /* @__PURE__ */ jsxs(Section, {
							titulo: "Vista previa",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "grid aspect-16/10 grid-cols-[1fr_40%] overflow-hidden rounded-md border border-border bg-background",
								"aria-label": "Vista previa de la pantalla de acceso",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "p-4",
									style: fondoAcceso(c),
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-bold text-foreground",
											children: "Plataforma Digital de Gestión de Predios"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-1 text-[11px] text-muted-foreground",
											children: "Adquisición y expropiación de inmuebles · TUO del DL 1192"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-3 grid grid-cols-2 gap-2",
											children: [
												"Sujeto Activo",
												"Beneficiario",
												"Sujeto Pasivo",
												"Terceros"
											].map((n, i) => /* @__PURE__ */ jsx("div", {
												className: `rounded-sm border-2 bg-card p-2 text-[11px] font-bold text-foreground ${i === 0 ? "border-primary" : "border-border"}`,
												children: n
											}, n))
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "border-l border-border bg-card p-4",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-bold text-foreground",
											children: "Sujeto Activo · MTC"
										}),
										/* @__PURE__ */ jsx("div", { className: "mt-3 h-6 rounded-sm border border-border" }),
										/* @__PURE__ */ jsx("div", { className: "mt-2 h-6 rounded-sm border border-border" }),
										/* @__PURE__ */ jsx("div", { className: "mt-3 h-6 rounded-sm bg-primary" })
									]
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "Así se ve la pantalla de acceso con esta configuración."
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico de la configuración",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: REGISTRO_ACCESO,
							nombreArchivo: "historico-config-acceso"
						})
					})
				})
			]
		})
	] });
}
//#endregion
export { ConfigAccesoPage as component };
