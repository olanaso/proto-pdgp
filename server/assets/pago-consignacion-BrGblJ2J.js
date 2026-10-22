import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { _ as moneda } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Banknote, CalendarClock, CheckCircle2, ClipboardCheck, Eye, FileText, History, Paperclip, Printer, Save, Send } from "lucide-react";
//#region src/routes/pago-consignacion.tsx?tsr-split=component
var PROYECTOS = [
	"Chachapoyas",
	"Tumbes",
	"Piura Norte",
	"Trujillo Metropolitano"
];
var seed = [
	{
		id: "PC-0001",
		proyecto: "Chachapoyas",
		tramo: "Tramo 2",
		codigo: "CHA-P-00145",
		modalidad: "Adquisición",
		sujeto: "María Elena Torres Vargas",
		dni: "45231987",
		valorAprobado: 128500,
		incentivo: 25700,
		total: 154200,
		resolucion: "RD N° 145-2026-MTC/DDP",
		forma: "Cheque",
		cheque: {
			numero: "01234567",
			entidad: "Banco de la Nación",
			emision: "12/06/2026",
			vencimiento: "12/09/2026",
			moneda: "PEN",
			custodio: "Tesorería DDP"
		},
		entrega: {
			fecha: "20/06/2026",
			lugar: "Sede Chachapoyas",
			responsable: "Jean Ascencios"
		},
		estado: "Entrega programada",
		actas: ["Reporte cálculo.pdf", "Ficha cheque.pdf"]
	},
	{
		id: "PC-0002",
		proyecto: "Chachapoyas",
		tramo: "Tramo 1",
		codigo: "CHA-P-00078",
		modalidad: "Expropiación",
		sujeto: "Constructora Andes SAC",
		dni: "20512334987",
		valorAprobado: 342e3,
		incentivo: 0,
		total: 342e3,
		resolucion: "RM N° 088-2026-MTC",
		forma: "Consignación",
		consignacion: {
			expediente: "EXP-2026-00089",
			entidad: "3° Juzgado Civil - Chachapoyas",
			constancia: "CONS-2026-0044",
			fecha: "05/06/2026"
		},
		entrega: {
			fecha: "",
			lugar: "",
			responsable: "Legal DDP"
		},
		estado: "Consignado",
		actas: ["Constancia consignación.pdf", "Cargo judicial.pdf"]
	},
	{
		id: "PC-0003",
		proyecto: "Tumbes",
		tramo: "Tramo 4",
		codigo: "TUM-P-00212",
		modalidad: "Adquisición",
		sujeto: "Luis Alberto Ruiz Palma",
		dni: "40912456",
		valorAprobado: 87400,
		incentivo: 17480,
		total: 104880,
		resolucion: "RD N° 091-2026-MTC/DDP",
		forma: "Cheque",
		entrega: {
			fecha: "",
			lugar: "",
			responsable: ""
		},
		estado: "Apto para pago",
		actas: ["Resolución.pdf", "Informe tasación.pdf"]
	},
	{
		id: "PC-0004",
		proyecto: "Piura Norte",
		tramo: "Tramo 2",
		codigo: "PIN-P-00033",
		modalidad: "Adquisición",
		sujeto: "Rosa Angélica Mendoza",
		dni: "42887610",
		valorAprobado: 56200,
		incentivo: 11240,
		total: 67440,
		resolucion: "RD N° 073-2026-MTC/DDP",
		forma: "Cheque",
		cheque: {
			numero: "01234512",
			entidad: "Banco de la Nación",
			emision: "01/06/2026",
			vencimiento: "01/09/2026",
			moneda: "PEN",
			custodio: "Tesorería DDP"
		},
		entrega: {
			fecha: "10/06/2026",
			lugar: "Sede Piura",
			responsable: "Diana Ramos"
		},
		estado: "Pagado",
		actas: [
			"Acta recepción.pdf",
			"Cargo entrega.pdf",
			"Ficha cheque.pdf"
		]
	},
	{
		id: "PC-0005",
		proyecto: "Trujillo Metropolitano",
		tramo: "Tramo 3",
		codigo: "TRU-P-00567",
		modalidad: "Adquisición",
		sujeto: "José Miguel Salazar",
		dni: "44123890",
		valorAprobado: 213800,
		incentivo: 42760,
		total: 256560,
		resolucion: "RD N° 112-2026-MTC/DDP",
		forma: "Cheque",
		cheque: {
			numero: "01234599",
			entidad: "Banco de la Nación",
			emision: "22/05/2026",
			vencimiento: "22/08/2026",
			moneda: "PEN",
			custodio: "Tesorería DDP"
		},
		entrega: {
			fecha: "30/05/2026",
			lugar: "Sede Trujillo",
			responsable: "Carlos Vela"
		},
		estado: "Entrega reprogramada",
		actas: ["Acta reprogramación.pdf"]
	}
];
var CLAVE_HISTORIAL = "pago-consignacion";
var BITACORA = {
	modulo: 19,
	entidad: "pago_consignacion"
};
var ETIQUETAS = {
	proyecto: "Proyecto",
	tramo: "Tramo",
	modalidad: "Modalidad",
	sujeto: "Sujeto pasivo",
	dni: "DNI / RUC",
	valorAprobado: "Valor aprobado",
	incentivo: "Incentivo",
	total: "Monto total",
	resolucion: "Resolución",
	forma: "Forma de atención",
	cheque: "Cheque",
	numero: "N° de cheque",
	entidad: "Entidad",
	emision: "Fecha de emisión",
	vencimiento: "Fecha de vencimiento",
	custodio: "Responsable de custodia",
	consignacion: "Consignación",
	expediente: "Expediente",
	constancia: "Constancia",
	fecha: "Fecha",
	entrega: "Entrega",
	lugar: "Lugar",
	responsable: "Responsable",
	estado: "Estado",
	actas: "Documentos"
};
var trazSeed = {
	"PC-0001": [
		{
			fecha: "10/06/2026 09:15",
			usuario: "Sistema",
			accion: "Predio marcado apto",
			detalle: "Resolución RD 145-2026 vinculada"
		},
		{
			fecha: "11/06/2026 11:03",
			usuario: "Área Financiera",
			accion: "Cheque registrado",
			detalle: "N° 01234567 · Banco de la Nación"
		},
		{
			fecha: "12/06/2026 15:22",
			usuario: "Jean Ascencios",
			accion: "Entrega programada",
			detalle: "20/06/2026 · Sede Chachapoyas"
		}
	],
	"PC-0002": [{
		fecha: "04/06/2026 08:40",
		usuario: "Legal DDP",
		accion: "Consignación registrada",
		detalle: "Expediente EXP-2026-00089"
	}, {
		fecha: "05/06/2026 16:11",
		usuario: "Sistema",
		accion: "Estado actualizado",
		detalle: "Consignado"
	}],
	"PC-0004": [
		{
			fecha: "01/06/2026 10:00",
			usuario: "Área Financiera",
			accion: "Cheque registrado",
			detalle: "N° 01234512"
		},
		{
			fecha: "10/06/2026 14:35",
			usuario: "Diana Ramos",
			accion: "Entrega realizada",
			detalle: "Firma del Sujeto Pasivo"
		},
		{
			fecha: "10/06/2026 14:36",
			usuario: "Sistema",
			accion: "Estado actualizado",
			detalle: "Pagado"
		}
	]
};
var estadoTono = {
	"Apto para pago": "primary",
	"Cheque generado": "warning",
	"Entrega programada": "primary",
	Pagado: "success",
	"No pagado": "destructive",
	Consignado: "neutral",
	"Entrega reprogramada": "warning",
	"Predio entregado": "success"
};
var opciones = (valores) => valores.map((v) => ({
	valor: v,
	texto: v
}));
function Page() {
	const predios = useHistorial(CLAVE_HISTORIAL)[0]?.registro ?? seed;
	const rol = useRol();
	const [selected, setSelected] = useState(null);
	const [chequeModal, setChequeModal] = useState(null);
	const [programModal, setProgramModal] = useState(null);
	const [entregaModal, setEntregaModal] = useState(null);
	const [trazModal, setTrazModal] = useState(null);
	const totales = useMemo(() => {
		const t = {
			total: 0,
			pagados: 0,
			aptos: 0,
			consignados: 0
		};
		predios.forEach((p) => {
			t.total += p.total;
			if (p.estado === "Pagado") t.pagados += p.total;
			if (p.estado === "Apto para pago") t.aptos += p.total;
			if (p.estado === "Consignado") t.consignados += p.total;
		});
		return t;
	}, [predios]);
	const cambiar = (despues, accion, objeto, motivo) => registrarCambio(CLAVE_HISTORIAL, {
		accion,
		objeto,
		motivo,
		antes: predios,
		despues
	}, BITACORA);
	const upsert = (p, accion, motivo) => cambiar(predios.map((x) => x.id === p.id ? p : x), accion, `${p.codigo} ${p.sujeto}`, motivo);
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Pago y consignación",
			icono: Banknote,
			descripcion: "Bandeja de predios aptos para pago: cheques, consignaciones y entregas al sujeto pasivo.",
			migas: [{ texto: "Trámite del pago" }, { texto: "Bandeja de pagos y consignaciones" }],
			demo: true,
			columnas: [
				{
					clave: "codigo",
					titulo: "Código",
					ancho: "130px",
					render: (p) => /* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: p.codigo
					})
				},
				{
					clave: "proyecto",
					titulo: "Proyecto / tramo",
					render: (p) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", { children: p.proyecto }), /* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: p.tramo
					})] })
				},
				{
					clave: "sujeto",
					titulo: "Sujeto pasivo",
					render: (p) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", { children: p.sujeto }), /* @__PURE__ */ jsxs("div", {
						className: "text-xs text-muted-foreground",
						children: ["DNI/RUC ", p.dni]
					})] })
				},
				{
					clave: "modalidad",
					titulo: "Modalidad"
				},
				{
					clave: "total",
					titulo: "Monto total",
					alinear: "derecha",
					render: (p) => /* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: moneda(p.total)
					})
				},
				{
					clave: "forma",
					titulo: "Forma"
				},
				{
					clave: "cheque",
					titulo: "Cheque / consignación",
					ordenable: false,
					render: (p) => /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: p.cheque ? `N° ${p.cheque.numero} · ${p.cheque.entidad}` : p.consignacion ? p.consignacion.constancia : "Sin registrar"
					})
				},
				{
					clave: "entrega",
					titulo: "Entrega",
					ordenable: false,
					render: (p) => /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: p.entrega.fecha ? `${p.entrega.fecha} · ${p.entrega.lugar}` : "Sin programar"
					})
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (p) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: estadoTono[p.estado],
						children: p.estado
					})
				}
			],
			filas: predios,
			claveFila: (p) => p.id,
			filtros: [
				{
					clave: "proyecto",
					etiqueta: "Proyecto",
					opciones: opciones(PROYECTOS)
				},
				{
					clave: "modalidad",
					etiqueta: "Modalidad",
					opciones: opciones(["Adquisición", "Expropiación"])
				},
				{
					clave: "estado",
					etiqueta: "Estado",
					opciones: opciones(Object.keys(estadoTono))
				}
			],
			buscarEn: [
				"codigo",
				"sujeto",
				"resolucion",
				"dni"
			],
			accionesFila: [
				{
					nombre: "Ver detalle",
					icono: Eye,
					onClick: (p) => setSelected(p)
				},
				{
					nombre: "Registrar cheque o consignación",
					icono: Banknote,
					onClick: (p) => setChequeModal(p)
				},
				{
					nombre: "Programar entrega",
					icono: CalendarClock,
					onClick: (p) => setProgramModal(p)
				},
				{
					nombre: "Registrar entrega",
					icono: ClipboardCheck,
					onClick: (p) => setEntregaModal(p)
				},
				{
					nombre: "Ver trazabilidad",
					icono: History,
					onClick: (p) => setTrazModal(p)
				}
			],
			onFilaClick: (p) => setSelected(p),
			exportar: (visibles) => exportarExcel("pago-consignacion", [
				{
					titulo: "Código",
					valor: (p) => p.codigo
				},
				{
					titulo: "Proyecto",
					valor: (p) => p.proyecto
				},
				{
					titulo: "Tramo",
					valor: (p) => p.tramo
				},
				{
					titulo: "Sujeto pasivo",
					valor: (p) => p.sujeto
				},
				{
					titulo: "DNI/RUC",
					valor: (p) => p.dni
				},
				{
					titulo: "Modalidad",
					valor: (p) => p.modalidad
				},
				{
					titulo: "Monto total",
					valor: (p) => p.total
				},
				{
					titulo: "Forma",
					valor: (p) => p.forma
				},
				{
					titulo: "Resolución",
					valor: (p) => p.resolucion
				},
				{
					titulo: "Entrega",
					valor: (p) => p.entrega.fecha ? `${p.entrega.fecha} · ${p.entrega.lugar}` : ""
				},
				{
					titulo: "Estado",
					valor: (p) => p.estado
				}
			], visibles),
			vacio: "No hay predios en la bandeja de pagos.",
			historial: {
				registro: CLAVE_HISTORIAL,
				etiquetas: ETIQUETAS,
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: (registro, n) => cambiar(registro, "Restauró una versión anterior", `versión ${n}`)
			}
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Resumen de la bandeja",
			className: "mt-4",
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Totales sobre toda la bandeja · Datos de demostración"
			}), /* @__PURE__ */ jsxs("dl", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(Kpi, {
						label: "Predios en bandeja",
						value: String(predios.length)
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Monto total",
						value: moneda(totales.total)
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Monto pagado",
						value: moneda(totales.pagados),
						tono: "text-success"
					}),
					/* @__PURE__ */ jsx(Kpi, {
						label: "Consignado",
						value: moneda(totales.consignados)
					})
				]
			})]
		}),
		selected && /* @__PURE__ */ jsx(DetalleModal, {
			predio: selected,
			onClose: () => setSelected(null)
		}),
		chequeModal && /* @__PURE__ */ jsx(ChequeModal, {
			predio: chequeModal,
			onClose: () => setChequeModal(null),
			onSave: (p, accion, motivo) => {
				upsert(p, accion, motivo);
				setChequeModal(null);
			}
		}),
		programModal && /* @__PURE__ */ jsx(ProgramarModal, {
			predio: programModal,
			onClose: () => setProgramModal(null),
			onSave: (p, accion, motivo) => {
				upsert(p, accion, motivo);
				setProgramModal(null);
			}
		}),
		entregaModal && /* @__PURE__ */ jsx(EntregaModal, {
			predio: entregaModal,
			onClose: () => setEntregaModal(null),
			onSave: (p, accion, motivo) => {
				upsert(p, accion, motivo);
				setEntregaModal(null);
			}
		}),
		trazModal && /* @__PURE__ */ jsx(TrazabilidadModal, {
			predio: trazModal,
			entries: trazSeed[trazModal.id] || [],
			onClose: () => setTrazModal(null)
		})
	] });
}
function Kpi({ label, value, tono = "text-foreground" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-md border border-border p-3",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: `mt-1 text-lg font-semibold tabular-nums ${tono}`,
			children: value
		})]
	});
}
/** Dato de solo lectura dentro de una grilla de formulario. */
function Dato({ etiqueta, children }) {
	return /* @__PURE__ */ jsx(FormField, {
		etiqueta,
		children: /* @__PURE__ */ jsx("p", {
			className: "py-2 text-sm",
			children
		})
	});
}
function DetalleModal({ predio, onClose }) {
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: `Detalle · ${predio.codigo}`,
		descripcion: `${predio.proyecto} · ${predio.tramo} · ${predio.modalidad}`,
		ancho: "lg",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: () => window.print(),
			children: [/* @__PURE__ */ jsx(Printer, {}), " Imprimir detalle"]
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cerrar"
		})] }),
		children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: "Datos generales" }),
			/* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Sujeto pasivo",
					children: predio.sujeto
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "DNI / RUC",
					children: predio.dni
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Resolución",
					children: predio.resolucion
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Forma de atención",
					children: predio.forma
				})
			] }),
			/* @__PURE__ */ jsxs(Subtitulo, { children: [
				"Cálculo del monto (",
				predio.modalidad,
				")"
			] }),
			/* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "concepto",
						titulo: "Concepto"
					},
					{
						clave: "monto",
						titulo: "Monto",
						alinear: "derecha"
					},
					{
						clave: "sustento",
						titulo: "Sustento"
					}
				],
				filas: [
					{
						concepto: predio.modalidad === "Adquisición" ? "Valor aprobado" : "Valor de tasación",
						monto: moneda(predio.valorAprobado),
						sustento: `Sustento: ${predio.resolucion}`
					},
					...predio.modalidad === "Adquisición" && predio.incentivo > 0 ? [{
						concepto: "Incentivo / componente adicional",
						monto: moneda(predio.incentivo),
						sustento: "Sustentado en resolución"
					}] : [],
					{
						concepto: "Monto total al sujeto pasivo",
						monto: moneda(predio.total),
						sustento: ""
					}
				],
				claveFila: (f) => f.concepto,
				claseFila: (f) => f.concepto.startsWith("Monto total") ? "bg-muted font-semibold" : void 0
			}),
			predio.cheque && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Ficha del cheque" }), /* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "N° de cheque",
					children: predio.cheque.numero
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Entidad financiera",
					children: predio.cheque.entidad
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Fecha de emisión",
					children: predio.cheque.emision
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Fecha de vencimiento",
					children: predio.cheque.vencimiento
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Responsable de custodia",
					children: predio.cheque.custodio
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Moneda",
					children: predio.cheque.moneda
				})
			] })] }),
			predio.consignacion && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Ficha de consignación" }), /* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Expediente",
					children: predio.consignacion.expediente
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Órgano / entidad",
					children: predio.consignacion.entidad
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Constancia",
					children: predio.consignacion.constancia
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Fecha",
					children: predio.consignacion.fecha
				})
			] })] }),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Documentos" }),
			/* @__PURE__ */ jsx("ul", {
				className: "space-y-1",
				children: predio.actas.map((a) => /* @__PURE__ */ jsxs("li", {
					className: "flex items-center justify-between gap-2 rounded-md border border-border px-3 py-1.5 text-sm",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx(FileText, {
								size: 16,
								className: "text-muted-foreground",
								"aria-hidden": true
							}),
							" ",
							a
						]
					}), /* @__PURE__ */ jsx(StatusBadge, { children: "Archivo de demostración" })]
				}, a))
			})
		]
	});
}
function ChequeModal({ predio, onClose, onSave }) {
	const [numero, setNumero] = useState(predio.cheque?.numero || "");
	const [entidad, setEntidad] = useState(predio.cheque?.entidad || "Banco de la Nación");
	const [emision, setEmision] = useState(predio.cheque?.emision || "");
	const [venc, setVenc] = useState(predio.cheque?.vencimiento || "");
	const [custodio, setCustodio] = useState(predio.cheque?.custodio || "Tesorería DDP");
	const [expediente, setExpediente] = useState(predio.consignacion?.expediente || "");
	const [entJud, setEntJud] = useState(predio.consignacion?.entidad || "");
	const [constancia, setConstancia] = useState(predio.consignacion?.constancia || "");
	const [fechaCons, setFechaCons] = useState(predio.consignacion?.fecha || "");
	const isCons = predio.forma === "Consignación";
	const save = () => {
		const upd = { ...predio };
		if (isCons) {
			upd.consignacion = {
				expediente,
				entidad: entJud,
				constancia,
				fecha: fechaCons
			};
			if (constancia) upd.estado = "Consignado";
		} else {
			upd.cheque = {
				numero,
				entidad,
				emision,
				vencimiento: venc,
				moneda: "PEN",
				custodio
			};
			if (numero && upd.estado === "Apto para pago") upd.estado = "Cheque generado";
		}
		onSave(upd, isCons ? predio.consignacion ? "Actualizó consignación" : "Registró consignación" : predio.cheque ? "Actualizó cheque" : "Registró cheque");
	};
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: isCons ? "Registrar consignación" : "Registrar o actualizar cheque",
		descripcion: `${predio.codigo} · ${predio.sujeto} · ${moneda(predio.total)}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: save,
			children: [
				/* @__PURE__ */ jsx(Save, {}),
				" ",
				isCons ? "Guardar consignación" : "Guardar cheque"
			]
		})] }),
		children: isCons ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de la consignación" }), /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Expediente",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: expediente,
					onChange: (e) => setExpediente(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Órgano / entidad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: entJud,
					onChange: (e) => setEntJud(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "N° de constancia",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: constancia,
					onChange: (e) => setConstancia(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: fechaCons,
					onChange: (e) => setFechaCons(e.target.value)
				})
			})
		] })] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: "Ficha del cheque" }),
			/* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "N° de cheque",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: numero,
						onChange: (e) => setNumero(e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Entidad financiera",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: entidad,
						onChange: (e) => setEntidad(e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Fecha de emisión",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: emision,
						onChange: (e) => setEmision(e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Fecha de vencimiento",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: venc,
						onChange: (e) => setVenc(e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Beneficiario",
					children: predio.sujeto
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "DNI / RUC",
					children: predio.dni
				}),
				/* @__PURE__ */ jsx(Dato, {
					etiqueta: "Monto",
					children: /* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: moneda(predio.total)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Responsable de custodia",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: custodio,
						onChange: (e) => setCustodio(e.target.value)
					})
				})
			] }),
			/* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mt-3 flex items-start gap-2 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
				children: [/* @__PURE__ */ jsx(AlertCircle, {
					size: 16,
					className: "mt-0.5 shrink-0",
					"aria-hidden": true
				}), "El sistema bloqueará la entrega si el beneficiario, monto o número de cheque no coinciden con la resolución vinculada."]
			})
		] })
	});
}
function ProgramarModal({ predio, onClose, onSave }) {
	const [fecha, setFecha] = useState("");
	const [lugar, setLugar] = useState(predio.entrega.lugar);
	const [responsable, setResponsable] = useState(predio.entrega.responsable);
	const [obs, setObs] = useState("");
	const save = () => {
		onSave({
			...predio,
			entrega: {
				fecha: fecha || predio.entrega.fecha,
				lugar,
				responsable
			},
			estado: "Entrega programada"
		}, "Programó entrega", obs.trim() || void 0);
	};
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Programar entrega",
		descripcion: `${predio.codigo} · ${predio.sujeto}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: onClose,
				children: "Cancelar"
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				disabled: true,
				title: "Generación de acta disponible próximamente",
				children: [/* @__PURE__ */ jsx(FileText, {}), " Generar acta (próximamente)"]
			}),
			/* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: save,
				children: [/* @__PURE__ */ jsx(Send, {}), " Programar entrega"]
			})
		] }),
		children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Cronograma de entrega" }), /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha programada",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase,
					value: fecha,
					onChange: (e) => setFecha(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Lugar de entrega",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: lugar,
					onChange: (e) => setLugar(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Responsable",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: responsable,
					onChange: (e) => setResponsable(e.target.value)
				})
			}),
			/* @__PURE__ */ jsx(Dato, {
				etiqueta: "Sujeto pasivo citado",
				children: predio.sujeto
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observaciones",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					rows: 3,
					className: `${controlClase} h-auto py-2`,
					value: obs,
					onChange: (e) => setObs(e.target.value)
				})
			})
		] })]
	});
}
function EntregaModal({ predio, onClose, onSave }) {
	const [resultado, setResultado] = useState("pagado");
	const [motivo, setMotivo] = useState("");
	const [nuevaFecha, setNuevaFecha] = useState("");
	const [file, setFile] = useState(null);
	const save = () => {
		const upd = { ...predio };
		if (resultado === "pagado") upd.estado = "Pagado";
		if (resultado === "reprogramado") {
			upd.estado = "Entrega reprogramada";
			if (nuevaFecha) upd.entrega = {
				...upd.entrega,
				fecha: nuevaFecha
			};
		}
		if (resultado === "no-pagado") upd.estado = "No pagado";
		const accion = {
			pagado: "Registró entrega: pagado",
			reprogramado: "Reprogramó entrega",
			"no-pagado": "Registró entrega: no pagado"
		}[resultado];
		onSave(upd, accion, motivo.trim() || void 0);
	};
	const opcionesResultado = [
		{
			v: "pagado",
			label: "Pagado / entregado",
			icon: CheckCircle2
		},
		{
			v: "reprogramado",
			label: "Reprogramado",
			icon: CalendarClock
		},
		{
			v: "no-pagado",
			label: "No pagado / imposibilidad",
			icon: AlertCircle
		}
	];
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Registrar entrega",
		descripcion: `${predio.codigo} · ${predio.entrega.fecha || "Sin fecha"} · ${predio.entrega.lugar || "Sin lugar"}`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: save,
			disabled: resultado !== "pagado" && motivo.trim().length < 5,
			children: [/* @__PURE__ */ jsx(Save, {}), " Registrar entrega"]
		})] }),
		children: [
			/* @__PURE__ */ jsx(Subtitulo, { children: "Resultado de la entrega" }),
			/* @__PURE__ */ jsx("div", {
				className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3",
				role: "group",
				"aria-label": "Resultado de la entrega",
				children: opcionesResultado.map((o) => /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: resultado === o.v ? "default" : "outline",
					"aria-pressed": resultado === o.v,
					onClick: () => setResultado(o.v),
					children: [
						/* @__PURE__ */ jsx(o.icon, {}),
						" ",
						o.label
					]
				}, o.v))
			}),
			/* @__PURE__ */ jsxs(FormGrid, { children: [
				resultado === "reprogramado" && /* @__PURE__ */ jsx(FormField, {
					etiqueta: "Nueva fecha",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted",
						value: nuevaFecha,
						onChange: (e) => setNuevaFecha(e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: resultado === "pagado" ? "Observaciones" : "Motivo",
					obligatorio: resultado !== "pagado",
					ancho: "doble",
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						rows: 3,
						className: `${controlClase} h-auto py-2`,
						value: motivo,
						onChange: (e) => setMotivo(e.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Evidencia / acta",
					ancho: "doble",
					children: /* @__PURE__ */ jsxs("label", {
						className: "inline-flex h-9 w-fit cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 text-sm hover:bg-muted",
						children: [
							/* @__PURE__ */ jsx(Paperclip, {
								size: 16,
								"aria-hidden": true
							}),
							file ? file.name : "Adjuntar acta o evidencia",
							/* @__PURE__ */ jsx("input", {
								type: "file",
								className: "sr-only",
								onChange: (e) => setFile(e.target.files?.[0] ?? null)
							})
						]
					})
				})
			] })
		]
	});
}
function TrazabilidadModal({ predio, entries, onClose }) {
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: onClose,
		titulo: "Trazabilidad del predio",
		descripcion: `${predio.codigo} · ${predio.sujeto}`,
		ancho: "lg",
		pie: /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: "Cerrar"
		}),
		children: [
			entries.length > 0 && /* @__PURE__ */ jsx(Subtitulo, { children: "Antecedentes del expediente" }),
			entries.length > 0 && /* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "fecha",
						titulo: "Fecha / hora",
						render: (e) => /* @__PURE__ */ jsx("span", {
							className: "whitespace-nowrap",
							children: e.fecha
						})
					},
					{
						clave: "usuario",
						titulo: "Usuario"
					},
					{
						clave: "accion",
						titulo: "Acción",
						render: (e) => /* @__PURE__ */ jsx("span", {
							className: "font-medium",
							children: e.accion
						})
					},
					{
						clave: "detalle",
						titulo: "Detalle",
						render: (e) => /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: e.detalle
						})
					}
				],
				filas: entries,
				vacio: "Sin eventos registrados."
			}),
			/* @__PURE__ */ jsx(Subtitulo, { children: "Cambios registrados en el sistema" }),
			/* @__PURE__ */ jsx(Historico, {
				registro: CLAVE_HISTORIAL,
				etiquetas: ETIQUETAS,
				filtroInicial: predio.codigo,
				nombreArchivo: `historico-pago-consignacion-${predio.codigo}`
			})
		]
	});
}
//#endregion
export { Page as component };
