import { a as controlClase, i as SiNo, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { _ as moneda, f as vencimiento, m as fecha, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { Dt as BotonIcono, E as Modal, M as CargaDocumento, T as Confirmar, j as AccionDocumento } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Banknote, CalendarDays, Eye, FileText, IdCard, LayoutGrid, Pencil, Printer, Send, Trash2 } from "lucide-react";
//#region src/routes/kit.tsx?tsr-split=component
var ETAPAS = [
	"Carta de intención",
	"Respuesta del sujeto pasivo",
	"Norma de valor y pago",
	"Formulario registral"
];
var DEMO = Array.from({ length: 23 }, (_, i) => ({
	id: i + 1,
	codigo: `EXP-2026-${String(i + 1).padStart(5, "0")}`,
	predio: `PRD-${String(100 + i)}`,
	sujetoPasivo: [
		"Persona natural",
		"Persona jurídica",
		"Comunidad campesina"
	][i % 3],
	etapa: ETAPAS[i % ETAPAS.length],
	monto: 12500 + i * 1375.5,
	inicio: new Date(2026, 8, 1 + i)
}));
function KitPage() {
	const [modal, setModal] = useState(false);
	const [confirmar, setConfirmar] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const [notificar, setNotificar] = useState(true);
	const [estado, setEstado] = useState("listo");
	const hoy = new Date(2026, 9, 14);
	const vence = (dias) => vencimiento(new Date(2026, 9, 14 - dias), plazo("carta_intencion"));
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: LayoutGrid,
			titulo: "Kit de interfaz",
			descripcion: "Todos los componentes estándar, funcionando. Referencia para migrar cada pantalla.",
			migas: [{
				texto: "Portal",
				to: "/inicio"
			}, { texto: "Kit" }],
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: () => setModal(true),
				children: [/* @__PURE__ */ jsx(FileText, {}), " Abrir diálogo de muestra"]
			})
		}),
		mensaje && /* @__PURE__ */ jsx(Aviso, {
			tipo: "exito",
			onCerrar: () => setMensaje(""),
			children: mensaje
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 gap-4 xl:grid-cols-3",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Estados y plazos",
				className: "xl:col-span-1",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ jsx(StatusBadge, {
								tono: "success",
								children: "Inscrito"
							}),
							/* @__PURE__ */ jsx(StatusBadge, {
								tono: "warning",
								children: "Observado"
							}),
							/* @__PURE__ */ jsx(StatusBadge, {
								tono: "destructive",
								children: "Anulado"
							}),
							/* @__PURE__ */ jsx(StatusBadge, {
								tono: "primary",
								children: "En trato directo"
							}),
							/* @__PURE__ */ jsx(StatusBadge, {
								tono: "neutral",
								children: "Sin iniciar"
							})
						]
					}),
					/* @__PURE__ */ jsx(Subtitulo, { children: "Semáforo de plazo (art. 20.2, carta de intención: 20 d.h.)" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-start gap-2",
						children: [
							/* @__PURE__ */ jsx(PlazoBadge, {
								vence: vence(2),
								hoy,
								etiqueta: "Dentro de plazo"
							}),
							/* @__PURE__ */ jsx(PlazoBadge, {
								vence: vence(17),
								hoy,
								etiqueta: "Por vencer"
							}),
							/* @__PURE__ */ jsx(PlazoBadge, {
								vence: vence(25),
								hoy,
								etiqueta: "Vencido"
							})
						]
					})
				]
			}), /* @__PURE__ */ jsx(Section, {
				titulo: "Pasos del procedimiento",
				className: "xl:col-span-2",
				children: /* @__PURE__ */ jsx(Stepper, { pasos: [
					{
						nombre: "Tasación",
						estado: "completado",
						detalle: "Art. 18 · 30 d.h."
					},
					{
						nombre: "Carta de intención",
						estado: "actual",
						detalle: "Art. 20.2 · 20 d.h."
					},
					{
						nombre: "Respuesta del sujeto pasivo",
						estado: "pendiente",
						detalle: "Art. 20.3 · 15 d.h."
					},
					{
						nombre: "Norma de valor y pago",
						estado: "pendiente",
						detalle: "Art. 20.4.a · 10 d.h."
					}
				] })
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Acciones documentales y botones de ícono",
			className: "mt-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ jsx(AccionDocumento, {
					titulo: "Generar carta de intención",
					descripcion: "Descarga el documento Word para firma",
					onClick: () => setMensaje("Documento de muestra generado.")
				}), /* @__PURE__ */ jsx(CargaDocumento, {
					titulo: "Subir documento firmado",
					descripcion: "PDF o Word con firma digital o manuscrita",
					onArchivos: (a) => setMensaje(`${a.length} archivo(s) recibido(s): ${a.map((x) => x.name).join(", ")}`)
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsx(BotonIcono, {
						nombre: "Ver detalle",
						icono: Eye,
						onClick: () => setMensaje("Detalle abierto (muestra).")
					}),
					/* @__PURE__ */ jsx(BotonIcono, {
						nombre: "Editar",
						icono: Pencil,
						onClick: () => setModal(true)
					}),
					/* @__PURE__ */ jsx(BotonIcono, {
						nombre: "Imprimir",
						icono: Printer,
						onClick: () => setMensaje("Impresión enviada (muestra).")
					}),
					/* @__PURE__ */ jsx(BotonIcono, {
						nombre: "Anular",
						icono: Trash2,
						destructiva: true,
						onClick: () => setConfirmar(DEMO[0])
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: "32 px, tooltip y aria-label con el verbo"
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Formulario estándar",
			className: "mt-4",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: (e) => {
					e.preventDefault();
					setMensaje("Formulario de muestra guardado.");
				},
				children: [
					/* @__PURE__ */ jsx(Subtitulo, {
						acciones: /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							children: "+ Agregar"
						}),
						children: "Sujeto pasivo"
					}),
					/* @__PURE__ */ jsxs(FormGrid, { children: [
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Tipo de documento",
							obligatorio: true,
							icono: IdCard,
							children: (id) => /* @__PURE__ */ jsxs("select", {
								id,
								className: controlClase,
								defaultValue: "DNI",
								children: [
									/* @__PURE__ */ jsx("option", { children: "DNI" }),
									/* @__PURE__ */ jsx("option", { children: "RUC" }),
									/* @__PURE__ */ jsx("option", { children: "Carné de extranjería" })
								]
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Número de documento",
							obligatorio: true,
							ayuda: "8 dígitos para DNI, 11 para RUC",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: controlClase,
								inputMode: "numeric",
								placeholder: "Ingrese el número"
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Nombre o razón social",
							obligatorio: true,
							ancho: "doble",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: controlClase,
								placeholder: "Como figura en SUNARP"
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Fecha de notificación",
							icono: CalendarDays,
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								type: "date",
								className: controlClase
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "Valor de tasación",
							icono: Banknote,
							error: "Ingrese un monto mayor a cero",
							children: (id) => /* @__PURE__ */ jsx("input", {
								id,
								className: controlClase,
								inputMode: "decimal",
								placeholder: "0.00"
							})
						}),
						/* @__PURE__ */ jsx(FormField, {
							etiqueta: "¿Notificar por correo?",
							children: /* @__PURE__ */ jsx(SiNo, {
								valor: notificar,
								onCambiar: setNotificar,
								nombre: "Notificar por correo"
							})
						})
					] }),
					/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: () => setMensaje(""),
						children: "Cancelar"
					}), /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						children: [/* @__PURE__ */ jsx(Send, {}), " Guardar sujeto pasivo"]
					})] })
				]
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
				children: ["Estado de la lista:", [
					"listo",
					"cargando",
					"error"
				].map((e) => /* @__PURE__ */ jsx(Button, {
					type: "button",
					size: "sm",
					variant: estado === e ? "default" : "outline",
					onClick: () => setEstado(e),
					children: e
				}, e))]
			}), /* @__PURE__ */ jsx(CrudPage, {
				titulo: "Expedientes de trato directo",
				icono: FileText,
				descripcion: "Lista estándar: filtros en la URL, orden por columna, acciones con tooltip, paginación.",
				acciones: /* @__PURE__ */ jsx(Button, {
					type: "button",
					onClick: () => setModal(true),
					children: "+ Nuevo expediente"
				}),
				demo: true,
				estado,
				onReintentar: () => setEstado("listo"),
				columnas: [
					{
						clave: "codigo",
						titulo: "Código",
						ancho: "150px"
					},
					{
						clave: "predio",
						titulo: "Predio"
					},
					{
						clave: "sujetoPasivo",
						titulo: "Sujeto pasivo"
					},
					{
						clave: "etapa",
						titulo: "Etapa",
						render: (f) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: f.etapa
						})
					},
					{
						clave: "monto",
						titulo: "Monto",
						alinear: "derecha",
						render: (f) => moneda(f.monto)
					},
					{
						clave: "inicio",
						titulo: "Inicio",
						render: (f) => fecha(f.inicio)
					}
				],
				filas: DEMO,
				claveFila: (f) => f.id,
				filtros: [{
					clave: "etapa",
					etiqueta: "Etapa",
					opciones: ETAPAS.map((e) => ({
						valor: e,
						texto: e
					}))
				}, {
					clave: "sujetoPasivo",
					etiqueta: "Sujeto pasivo",
					opciones: [
						"Persona natural",
						"Persona jurídica",
						"Comunidad campesina"
					].map((e) => ({
						valor: e,
						texto: e
					}))
				}],
				accionesFila: [
					{
						nombre: "Ver detalle",
						icono: Eye,
						onClick: (f) => setMensaje(`Detalle de ${f.codigo}`)
					},
					{
						nombre: "Editar",
						icono: Pencil,
						onClick: () => setModal(true)
					},
					{
						nombre: "Imprimir",
						icono: Printer,
						onClick: (f) => setMensaje(`Impresión de ${f.codigo} enviada`)
					},
					{
						nombre: "Anular expediente",
						icono: Trash2,
						destructiva: true,
						onClick: (f) => setConfirmar(f)
					}
				],
				exportar: (filas) => setMensaje(`Exportados ${filas.length} registros (muestra)`),
				onFilaClick: (f) => setMensaje(`Fila abierta: ${f.codigo}`)
			})]
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: modal,
			onCerrar: () => setModal(false),
			titulo: "Nuevo expediente",
			descripcion: "Diálogo estándar: cierra con Esc y devuelve el foco.",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setModal(false),
				children: "Cancelar"
			}), /* @__PURE__ */ jsx(Button, {
				type: "button",
				onClick: () => {
					setModal(false);
					setMensaje("Expediente de muestra creado.");
				},
				children: "Crear expediente"
			})] }),
			children: /* @__PURE__ */ jsxs(FormGrid, {
				columnas: 1,
				children: [/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Código de predio",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						placeholder: "PRD-000"
					})
				}), /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Observaciones",
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						rows: 3,
						className: `${controlClase} h-auto py-2`
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx(Confirmar, {
			abierto: confirmar !== null,
			onCerrar: () => setConfirmar(null),
			onConfirmar: () => {
				setMensaje(`Expediente ${confirmar?.codigo} anulado (muestra).`);
				setConfirmar(null);
			},
			titulo: "Anular expediente",
			texto: `El expediente ${confirmar?.codigo ?? ""} pasará a estado Anulado y dejará de aparecer en la cartera.`,
			accion: "Anular expediente",
			destructiva: true
		})
	] });
}
//#endregion
export { KitPage as component };
