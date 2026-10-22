import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { f as vencimiento, g as fechaIso, n as getProyecto, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Stepper } from "./Stepper-CmTnl87J.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.datos-tecnicos-DadIdWb1.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { _ as useFotosDelRegistro, p as refDeFila } from "./fotos-CUnD_Pb7.js";
import { n as BotonPanelFotografico } from "./CampoFoto-CSlShmEX.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { n as FotosDelRegistro, t as BotonFotosDeFila } from "./FotosRegistro-CcuXP5_9.js";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, Apple, CalendarDays, Compass, Crop, Download, Fence, FileSpreadsheet, FileText, Hammer, History, Home, MapPinned, Plus, Ruler, Save, Sprout, Trash2, Trees, Wrench, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.datos-tecnicos.tsx?tsr-split=component
var DATA_TEMPLATE_DOWNLOAD_URL = "https://drive.google.com/uc?id=17nJ9tRmPRJYtE8bvhIEkAv_fjMf50CcX&export=download";
var TABS = [
	{
		name: "Padrón",
		icon: FileText
	},
	{
		name: "Colindancia matriz",
		icon: Compass
	},
	{
		name: "Área afectada",
		icon: Crop
	},
	{
		name: "Cuadro de datos técnicos",
		icon: Ruler
	},
	{
		name: "Datos de la vivienda",
		icon: Home
	},
	{
		name: "Obras complementarias",
		icon: Hammer
	},
	{
		name: "Instalaciones fijas permanentes",
		icon: Wrench
	},
	{
		name: "Plantaciones frutales",
		icon: Apple
	},
	{
		name: "Plantaciones forestales",
		icon: Trees
	},
	{
		name: "Plantaciones transitorias",
		icon: Sprout
	},
	{
		name: "Cerco vivo",
		icon: Fence
	},
	{
		name: "Daño emergente",
		icon: AlertTriangle
	},
	{
		name: "Descripción del entorno",
		icon: MapPinned
	},
	{
		name: "Histórico",
		icon: History
	}
];
/** Fotos de los datos técnicos: predio y proyecto de la ruta, pantalla y módulo fijos (M12). */
function useBaseFotos(seccion) {
	const { projectId, codigo } = Route$1.useParams();
	return {
		proyecto: projectId,
		predio: decodeURIComponent(codigo),
		pantalla: "datos-tecnicos",
		seccion,
		modulo: 12
	};
}
/** Campos de foto de cada área (docs/PLAN-EDITOR-FOTOS.md §6.2). */
var CAMPOS_FOTO_AREA = [
	"Foto panorámica",
	"Foto frontal",
	"Foto lado izquierdo",
	"Foto lado derecho",
	"Foto fondo"
].map((campo) => ({
	campo,
	maximo: 1
}));
var SECCION_LISTA = {
	matriz: "Área matriz",
	afectadas: "Áreas afectadas",
	remanentes: "Áreas remanentes"
};
var NOMBRE_LISTA = {
	matriz: "área matriz",
	afectadas: "área afectada",
	remanentes: "área remanente"
};
var ETIQUETAS_DATOS_TECNICOS = {
	itt: "Tasación (ITT)",
	areas: "Áreas",
	matriz: "Área matriz",
	afectadas: "Área afectada",
	remanentes: "Área remanente",
	peritoNombre: "Perito tasador",
	peritoDni: "DNI del perito",
	peritoSupervisor: "Perito supervisor",
	fechaItt: "Fecha del ITT",
	valorTasacion: "Valor de tasación",
	version: "Versión",
	archivo: "Archivo",
	fecha: "Fecha",
	usuario: "Usuario",
	estado: "Estado",
	cod: "Cód. polígono",
	uso: "Uso DT",
	directa: "Área directa (m²)",
	indirecta: "Área indirecta (m²)",
	total: "Área total (m²)",
	planoCbc: "Código del plano CBC",
	fotoRef: "Fotos"
};
var SELECCIONE = "Seleccione";
function Seleccione({ id }) {
	return /* @__PURE__ */ jsx("select", {
		id,
		className: controlClase,
		defaultValue: "",
		children: /* @__PURE__ */ jsx("option", {
			value: "",
			children: SELECCIONE
		})
	});
}
function TasacionPeritoPanel({ itt, onItt }) {
	const { peritoNombre, peritoDni, peritoSupervisor, fechaItt, valorTasacion } = itt;
	const setPeritoNombre = (v) => onItt({
		...itt,
		peritoNombre: v
	});
	const setPeritoDni = (v) => onItt({
		...itt,
		peritoDni: v
	});
	const setPeritoSupervisor = (v) => onItt({
		...itt,
		peritoSupervisor: v
	});
	const setFechaItt = (v) => onItt({
		...itt,
		fechaItt: v
	});
	const setValorTasacion = (v) => onItt({
		...itt,
		valorTasacion: v
	});
	const { projectId, codigo } = Route$1.useParams();
	const venceCarta = fechaItt ? vencimiento(/* @__PURE__ */ new Date(`${fechaItt}T00:00:00`), plazo("carta_intencion")) : null;
	return /* @__PURE__ */ jsx(Section, {
		titulo: "Tasación: Informe Técnico de Tasación (ITT)",
		className: "mb-4",
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Perito tasador",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: peritoNombre,
					onChange: (event) => setPeritoNombre(event.target.value),
					placeholder: "Nombre completo del perito"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "DNI del perito",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					inputMode: "numeric",
					value: peritoDni,
					onChange: (event) => setPeritoDni(event.target.value),
					placeholder: "DNI"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Perito supervisor",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: peritoSupervisor,
					onChange: (event) => setPeritoSupervisor(event.target.value),
					placeholder: "Nombre completo del supervisor"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha del ITT",
				obligatorio: true,
				icono: CalendarDays,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					type: "date",
					value: fechaItt,
					onChange: (event) => setFechaItt(event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Valor de tasación",
				ayuda: "En soles (S/)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					inputMode: "decimal",
					value: valorTasacion,
					onChange: (event) => setValorTasacion(event.target.value),
					placeholder: "0.00"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Plazo para la carta de intención",
				ayuda: "Art. 20.2: 20 d.h. desde la recepción de la tasación",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex h-9 items-center",
					children: venceCarta ? /* @__PURE__ */ jsx(PlazoBadge, { vence: venceCarta }) : /* @__PURE__ */ jsx("span", {
						className: "text-sm text-muted-foreground",
						children: "Registre la fecha del ITT"
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Informe técnico de tasación (ITT) firmado",
				ancho: "doble",
				children: () => /* @__PURE__ */ jsx(CampoDocumento, {
					projectId,
					codigo: decodeURIComponent(codigo),
					nombre: "Informe técnico de tasación (ITT) firmado",
					catalogoId: "itt-informe",
					accept: ".pdf",
					fecha: fechaItt || void 0,
					emisor: "Perito tasador"
				})
			})
		] })
	});
}
function ExpedienteHeader({ codigo, editable = false }) {
	const clase = editable ? controlClase : `${controlClase} bg-muted`;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }), /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
		etiqueta: "Código del predio",
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			className: clase,
			defaultValue: codigo,
			readOnly: !editable
		})
	}), /* @__PURE__ */ jsx(FormField, {
		etiqueta: "Código de expediente",
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			className: clase,
			defaultValue: "3546-2023-MTC/DDP",
			readOnly: !editable
		})
	})] })] });
}
function PadronTab({ codigo }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-warning",
			children: "Formulario no guardado"
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del predio",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					defaultValue: codigo
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código de expediente",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					defaultValue: "3546-2023-MTC/DDP"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Profesional técnico responsable",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Mes de elaboración del expediente",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado del predio",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de tasación",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de periodo de tasación",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de inspección de campo",
				icono: CalendarDays,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Ubicación" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de predio",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Zonificación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Condición rústico",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Norma que aprueba",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Uso",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Comunidad campesina",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Denominación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sector",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Manzana",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "UC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Lote",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Vía",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre de la vía",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Número municipal",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Interior",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Progresiva inicial",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Lado",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Progresiva final",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Topografía" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Topografía",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Accesibilidad",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Pistas y veredas",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Alumbrado público",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Instalaciones de gas",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Alcantarillado",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Agua potable",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Áreas y certificación" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área gráfica matriz (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					inputMode: "decimal"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área registral matriz (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					inputMode: "decimal"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Partida electrónica para CBC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Profesional que elaboró el CBC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Observaciones técnicas" }),
		/* @__PURE__ */ jsx(FormGrid, {
			columnas: 1,
			children: /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observación",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					className: `${controlClase} h-auto py-2`,
					rows: 2,
					placeholder: "Ingrese la observación"
				})
			})
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de los planos" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Profesional responsable de firmar planos",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Datum de los planos",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano de diagnóstico",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del plano de diagnóstico",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano de ubicación",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del plano de ubicación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano perimétrico",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del plano perimétrico",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano de afectación",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del plano de afectación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano de distribución",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del plano de distribución",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano de arquitectura",
				children: (id) => /* @__PURE__ */ jsx(Seleccione, { id })
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del plano de arquitectura",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Firma del plano de arquitectura",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de la memoria descriptiva" }),
		/* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Fecha de emisión",
			icono: CalendarDays,
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				type: "date",
				className: controlClase
			})
		}) })
	] });
}
function ColindanciaMatrizTab({ codigo }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(ExpedienteHeader, { codigo }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Colindancias" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Norte (frente)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Norte (frente): distancia",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					inputMode: "decimal"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Este (derecha)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Este (derecha): distancia",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					inputMode: "decimal"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sur (izquierda)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sur (izquierda): distancia",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					inputMode: "decimal"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Oeste (fondo)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Oeste (fondo): distancia",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					inputMode: "decimal"
				})
			})
		] })
	] });
}
function AreaTable({ rows, onDelete, seccion }) {
	const base = useBaseFotos(seccion);
	return /* @__PURE__ */ jsx(Tabla, {
		columnas: [
			{
				clave: "n",
				titulo: "#",
				ancho: "48px",
				render: (r) => rows.indexOf(r) + 1
			},
			{
				clave: "cod",
				titulo: "Cód. polígono"
			},
			{
				clave: "uso",
				titulo: "Uso DT"
			},
			{
				clave: "directa",
				titulo: "Área directa (m²)",
				alinear: "derecha",
				render: (r) => r.directa.toFixed(2)
			},
			{
				clave: "indirecta",
				titulo: "Área indirecta (m²)",
				alinear: "derecha",
				render: (r) => r.indirecta.toFixed(2)
			},
			{
				clave: "total",
				titulo: "Área total (m²)",
				alinear: "derecha",
				render: (r) => r.total.toFixed(2)
			},
			{
				clave: "fecha",
				titulo: "Fecha del plano CBC"
			},
			{
				clave: "planoCbc",
				titulo: "Código del plano CBC"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila(seccion, r, rows.indexOf(r)),
					campos: CAMPOS_FOTO_AREA,
					titulo: `${seccion} ${r.cod}`
				})
			},
			{
				clave: "acciones",
				titulo: "Acciones",
				alinear: "derecha",
				render: (r) => /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					size: "icon",
					className: "size-8 text-destructive hover:bg-destructive-soft",
					title: "Eliminar área",
					"aria-label": "Eliminar área",
					onClick: () => onDelete(rows.indexOf(r)),
					children: /* @__PURE__ */ jsx(Trash2, {})
				})
			}
		],
		filas: rows,
		claveFila: (_, i) => i,
		vacio: "Sin registros."
	});
}
/** Se monta al abrir: cada alta tiene su propia referencia de fotos (si se cierra sin agregar, se descartan). */
function AddAreaModal({ seccion, onClose, onAdd }) {
	const base = useBaseFotos(seccion);
	const fotos = useFotosDelRegistro(base, "area");
	const [form, setForm] = useState({
		cod: "",
		uso: "AFECTADA",
		directa: 0,
		indirecta: 0,
		total: 0,
		fecha: "",
		planoCbc: ""
	});
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: "Agregar área",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: () => {
				fotos.confirmar();
				onAdd({
					...form,
					cod: form.cod || "KFRE",
					fotoRef: fotos.ref
				});
				onClose();
			},
			children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar área"]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Uso DT",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.uso,
					onChange: (e) => setForm({
						...form,
						uso: e.target.value
					}),
					children: [
						/* @__PURE__ */ jsx("option", { children: "AFECTADA" }),
						/* @__PURE__ */ jsx("option", { children: "MATRIZ" }),
						/* @__PURE__ */ jsx("option", { children: "REMANENTE" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área directa (m²)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "number",
					className: controlClase,
					value: form.directa,
					onChange: (e) => {
						const v = Number(e.target.value);
						setForm({
							...form,
							directa: v,
							total: v + form.indirecta
						});
					}
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área indirecta (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "number",
					className: controlClase,
					value: form.indirecta,
					onChange: (e) => {
						const v = Number(e.target.value);
						setForm({
							...form,
							indirecta: v,
							total: form.directa + v
						});
					}
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área total (m²)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "number",
					className: `${controlClase} bg-muted`,
					value: form.total,
					readOnly: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano CBC",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.fecha,
					onChange: (e) => setForm({
						...form,
						fecha: e.target.value
					}),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: SELECCIONE
						}),
						/* @__PURE__ */ jsx("option", { children: "ENERO 2025" }),
						/* @__PURE__ */ jsx("option", { children: "FEBRERO 2025" }),
						/* @__PURE__ */ jsx("option", { children: "MARZO 2025" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del plano CBC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.planoCbc,
					onChange: (e) => setForm({
						...form,
						planoCbc: e.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: fotos.ref,
				campos: CAMPOS_FOTO_AREA
			})
		] })
	});
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: "Eliminar área",
		descripcion: `${nombre} sale del listado. El histórico conserva sus datos y el motivo.`,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "destructive",
			disabled: motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: [/* @__PURE__ */ jsx(Trash2, {}), " Eliminar área"]
		})] }),
		children: [/* @__PURE__ */ jsxs("label", {
			htmlFor: "motivo-eliminacion",
			className: "mb-1 block text-sm font-medium",
			children: ["Motivo ", /* @__PURE__ */ jsx("span", {
				className: "text-destructive",
				children: "*"
			})]
		}), /* @__PURE__ */ jsx("textarea", {
			id: "motivo-eliminacion",
			rows: 3,
			className: `${controlClase} h-auto py-2`,
			value: motivo,
			onChange: (e) => setMotivo(e.target.value),
			placeholder: "Por ejemplo: polígono duplicado; error de digitación"
		})]
	});
}
function AreaAfectadaTab({ codigo, areas, onAreas }) {
	const { matriz, afectadas, remanentes } = areas;
	const [modal, setModal] = useState(null);
	const [aEliminar, setAEliminar] = useState(null);
	const descripcion = (lista, r) => `${NOMBRE_LISTA[lista]} ${r.cod}, ${r.total.toFixed(2)} m²`;
	const agregar = (lista, r) => onAreas({
		...areas,
		[lista]: [...areas[lista], r]
	}, "Agregó área", descripcion(lista, r));
	const totalDirecta = afectadas.reduce((s, r) => s + r.directa, 0);
	const totalIndirecta = afectadas.reduce((s, r) => s + r.indirecta, 0);
	const totalAreas = afectadas.reduce((s, r) => s + r.total, 0);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(ExpedienteHeader, { codigo }),
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setModal("matriz"),
				children: [/* @__PURE__ */ jsx(Plus, {}), " Añadir área matriz"]
			}),
			children: "Área matriz"
		}),
		/* @__PURE__ */ jsx(AreaTable, {
			rows: matriz,
			seccion: SECCION_LISTA.matriz,
			onDelete: (i) => setAEliminar({
				lista: "matriz",
				i
			})
		}),
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setModal("afectadas"),
				children: [/* @__PURE__ */ jsx(Plus, {}), " Añadir área afectada"]
			}),
			children: "Listado de áreas afectadas"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-warning",
			children: "Datos de demostración"
		}),
		/* @__PURE__ */ jsx(AreaTable, {
			rows: afectadas,
			seccion: SECCION_LISTA.afectadas,
			onDelete: (i) => setAEliminar({
				lista: "afectadas",
				i
			})
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Totales" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área directa total (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} bg-muted tabular-nums`,
					value: totalDirecta.toFixed(2),
					readOnly: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sumatoria de áreas (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} bg-muted tabular-nums`,
					value: totalAreas.toFixed(2),
					readOnly: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área indirecta total (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} bg-muted tabular-nums`,
					value: totalIndirecta.toFixed(2),
					readOnly: true
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setModal("remanentes"),
				children: [/* @__PURE__ */ jsx(Plus, {}), " Añadir área remanente"]
			}),
			children: "Listado de áreas remanentes"
		}),
		/* @__PURE__ */ jsx(AreaTable, {
			rows: remanentes,
			seccion: SECCION_LISTA.remanentes,
			onDelete: (i) => setAEliminar({
				lista: "remanentes",
				i
			})
		}),
		modal && /* @__PURE__ */ jsx(AddAreaModal, {
			seccion: SECCION_LISTA[modal],
			onClose: () => setModal(null),
			onAdd: (r) => agregar(modal, r)
		}, modal),
		aEliminar && /* @__PURE__ */ jsx(MotivoEliminacion, {
			nombre: descripcion(aEliminar.lista, areas[aEliminar.lista][aEliminar.i]),
			onCerrar: () => setAEliminar(null),
			onConfirmar: (motivo) => {
				const { lista, i } = aEliminar;
				onAreas({
					...areas,
					[lista]: areas[lista].filter((_, idx) => idx !== i)
				}, "Eliminó área", descripcion(lista, areas[lista][i]), motivo);
				setAEliminar(null);
			}
		})
	] });
}
var CDT_ROWS = [
	{
		v: 1,
		cod: "KFRE",
		uso: "AFECTADA",
		lado: "1-2",
		dist: 6.56,
		ang: "46°25'33\"",
		e: 537816.4,
		n: 8605575.39,
		e2: 538041.07,
		n2: 8605942.86,
		lado2: "NORTE",
		col: "COMUNIDAD CAMPESINA COTAY (PE: 40019771)",
		colCbc: "Colinda con Comunidad Campesina Cotay (PE: 40019771)..."
	},
	{
		v: 2,
		cod: "KFRE",
		uso: "AFECTADA",
		lado: "2-3",
		dist: 10.01,
		ang: "92°2'18\"",
		e: 537822.79,
		n: 8605573.89,
		e2: 538047.46,
		n2: 8605941.36,
		lado2: "ESTE",
		col: "CARRETERA NACIONAL PE-3S",
		colCbc: "Colinda con Carretera Nacional PE-3S..."
	},
	{
		v: 3,
		cod: "KFRE",
		uso: "AFECTADA",
		lado: "3-4",
		dist: .13,
		ang: "25°8'25\"",
		e: 537820.85,
		n: 8605564.07,
		e2: 538045.52,
		n2: 8605931.54,
		lado2: "SUR",
		col: "VIAL-LST4-T05-090511-OC-00080",
		colCbc: ""
	},
	{
		v: 4,
		cod: "KFRE",
		uso: "AFECTADA",
		lado: "4-5",
		dist: 1.24,
		ang: "181°11'31\"",
		e: 537820.82,
		n: 8605564.19,
		e2: 538045.49,
		n2: 8605931.66,
		lado2: "SUR",
		col: "VIAL-LST4-T05-090511-OC-00080",
		colCbc: ""
	}
];
var COL_ROWS = [
	{
		n: 1,
		cod: "KFRE",
		tipo: "RURAL",
		datum: "WGS84",
		uso: "AFECTADA",
		lado: "NORTE",
		col: "COMUNIDAD CAMPESINA COTAY (PE: 40019771)",
		suma: 6.56,
		colCbc: "Colinda con Comunidad Campesina Cotay (PE: 40019771)..."
	},
	{
		n: 2,
		cod: "KFRE",
		tipo: "RURAL",
		datum: "WGS84",
		uso: "AFECTADA",
		lado: "ESTE",
		col: "CARRETERA NACIONAL PE-3S",
		suma: 10.01,
		colCbc: "Colinda con Carretera Nacional PE-3S..."
	},
	{
		n: 3,
		cod: "KFRE",
		tipo: "RURAL",
		datum: "WGS84",
		uso: "AFECTADA",
		lado: "SUR",
		col: "VIAL-LST4-T05-090511-OC-00080",
		suma: 1.37,
		colCbc: ""
	},
	{
		n: 4,
		cod: "KFRE",
		tipo: "RURAL",
		datum: "WGS84",
		uso: "AFECTADA",
		lado: "OESTE",
		col: "VIAL-LST4-T05-090511-OC-00080",
		suma: 10.84,
		colCbc: ""
	}
];
var AREAS_DEMO = [{
	cod: "KFRE",
	uso: "AFECTADA",
	directa: 150,
	indirecta: 0,
	total: 150,
	fecha: "FEBRERO 2025",
	planoCbc: "PTKT-0001"
}];
var pendiente = (v) => v || /* @__PURE__ */ jsx("span", {
	className: "text-muted-foreground",
	children: "Pendiente"
});
function CuadroDatosTecnicosTab({ codigo }) {
	const { projectId } = Route$1.useParams();
	const [selectedArea, setSelectedArea] = useState("KFRE");
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(ExpedienteHeader, { codigo }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Listado de áreas afectadas" }),
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-warning",
			children: "Datos de demostración"
		}),
		/* @__PURE__ */ jsx(Tabla, {
			columnas: [
				{
					clave: "n",
					titulo: "#",
					ancho: "48px",
					render: (r) => AREAS_DEMO.indexOf(r) + 1
				},
				{
					clave: "cod",
					titulo: "Cód. polígono"
				},
				{
					clave: "uso",
					titulo: "Uso DT"
				},
				{
					clave: "directa",
					titulo: "Área directa (m²)",
					alinear: "derecha",
					render: (r) => r.directa.toFixed(2)
				},
				{
					clave: "indirecta",
					titulo: "Área indirecta (m²)",
					alinear: "derecha",
					render: (r) => r.indirecta.toFixed(2)
				},
				{
					clave: "total",
					titulo: "Área total (m²)",
					alinear: "derecha",
					render: (r) => r.total.toFixed(2)
				},
				{
					clave: "fecha",
					titulo: "Fecha del plano CBC"
				},
				{
					clave: "planoCbc",
					titulo: "Código del plano CBC"
				},
				{
					clave: "seleccionar",
					titulo: "Seleccionar",
					alinear: "derecha",
					render: (r) => /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: selectedArea === r.cod ? "default" : "outline",
						size: "sm",
						onClick: () => setSelectedArea(r.cod),
						children: selectedArea === r.cod ? "Seleccionada" : "Seleccionar área"
					})
				}
			],
			filas: AREAS_DEMO,
			claveFila: (r) => r.cod
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Cuadro de datos técnicos en Excel" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área seleccionada",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} bg-muted font-semibold`,
					value: selectedArea,
					readOnly: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Plantilla de carga de datos",
				children: /* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs("a", {
						href: DATA_TEMPLATE_DOWNLOAD_URL,
						children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Descargar plantilla"]
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Cuadro de datos técnicos (CDT)",
				children: () => /* @__PURE__ */ jsx(CampoDocumento, {
					projectId,
					codigo,
					nombre: "Cuadro de datos técnicos (CDT)",
					accept: ".xls,.xlsx,.pdf"
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Cuadro de datos técnicos y colindancias" }),
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-warning",
			children: "Datos de demostración"
		}),
		/* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "cdt",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "cdt",
						children: "Cuadro de datos técnicos"
					}), /* @__PURE__ */ jsx(TabsTrigger, {
						value: "col",
						children: "Colindancias"
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "cdt",
					children: /* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "v",
								titulo: "Vértice"
							},
							{
								clave: "cod",
								titulo: "Cód. afectada"
							},
							{
								clave: "uso",
								titulo: "Uso DT"
							},
							{
								clave: "lado",
								titulo: "Lado"
							},
							{
								clave: "dist",
								titulo: "Distancia (m)",
								alinear: "derecha"
							},
							{
								clave: "ang",
								titulo: "Ángulo interno"
							},
							{
								clave: "e",
								titulo: "Este",
								alinear: "derecha"
							},
							{
								clave: "n",
								titulo: "Norte",
								alinear: "derecha"
							},
							{
								clave: "e2",
								titulo: "Este 2",
								alinear: "derecha"
							},
							{
								clave: "n2",
								titulo: "Norte 2",
								alinear: "derecha"
							},
							{
								clave: "lado2",
								titulo: "Lado 2"
							},
							{
								clave: "col",
								titulo: "Colindancia",
								render: (r) => /* @__PURE__ */ jsx("span", {
									className: "text-primary-dark",
									children: r.col
								})
							},
							{
								clave: "colCbc",
								titulo: "Colindancia CBC",
								render: (r) => /* @__PURE__ */ jsx("span", {
									className: "block max-w-60 text-xs",
									children: pendiente(r.colCbc)
								})
							}
						],
						filas: CDT_ROWS,
						claveFila: (r) => r.v
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "col",
					children: /* @__PURE__ */ jsx(Tabla, {
						columnas: [
							{
								clave: "n",
								titulo: "N.°"
							},
							{
								clave: "cod",
								titulo: "Cód. afectada"
							},
							{
								clave: "tipo",
								titulo: "Tipo"
							},
							{
								clave: "datum",
								titulo: "Datum"
							},
							{
								clave: "uso",
								titulo: "Uso DT"
							},
							{
								clave: "lado",
								titulo: "Lado"
							},
							{
								clave: "col",
								titulo: "Colindancia",
								render: (r) => /* @__PURE__ */ jsx("span", {
									className: "text-primary-dark",
									children: r.col
								})
							},
							{
								clave: "suma",
								titulo: "Suma de lados",
								alinear: "derecha"
							},
							{
								clave: "colCbc",
								titulo: "Colindancia CBC",
								render: (r) => /* @__PURE__ */ jsx("span", {
									className: "block max-w-72 text-xs",
									children: pendiente(r.colCbc)
								})
							}
						],
						filas: COL_ROWS,
						claveFila: (r) => r.n
					})
				})
			]
		})
	] });
}
function ListadoTab({ codigo, title, headers }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(ExpedienteHeader, { codigo }),
		/* @__PURE__ */ jsx(Subtitulo, { children: title }),
		/* @__PURE__ */ jsx(Tabla, {
			columnas: headers.map((h, i) => ({
				clave: String(i),
				titulo: h,
				render: (r) => r[i]
			})),
			filas: [],
			vacio: "Sin registros. El alta de registros en esta sección estará disponible próximamente."
		})
	] });
}
function DescripcionEntornoTab({ codigo }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(ExpedienteHeader, { codigo }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Descripción del entorno" }),
		/* @__PURE__ */ jsx(FormGrid, {
			columnas: 1,
			children: /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					className: `${controlClase} h-auto py-2`,
					rows: 6,
					placeholder: "Describa el entorno del predio (uso de suelo circundante, accesos, servicios, hitos, etc.)"
				})
			})
		})
	] });
}
function renderTab(tab, codigo, ctx) {
	switch (tab) {
		case "Padrón": return /* @__PURE__ */ jsx(PadronTab, { codigo });
		case "Colindancia matriz": return /* @__PURE__ */ jsx(ColindanciaMatrizTab, { codigo });
		case "Área afectada": return /* @__PURE__ */ jsx(AreaAfectadaTab, {
			codigo,
			areas: ctx.areas,
			onAreas: ctx.onAreas
		});
		case "Cuadro de datos técnicos": return /* @__PURE__ */ jsx(CuadroDatosTecnicosTab, { codigo });
		case "Datos de la vivienda": return /* @__PURE__ */ jsx(ListadoTab, {
			codigo,
			title: "Listado de viviendas",
			headers: [
				"#",
				"Módulo",
				"Piso",
				"Descripción",
				"Área directa (m²)",
				"Área indirecta (m²)",
				"Área total (m²)",
				"Uso",
				"Material predominante",
				"Fotos"
			]
		});
		case "Obras complementarias": return /* @__PURE__ */ jsx(ListadoTab, {
			codigo,
			title: "Listado de obras complementarias",
			headers: [
				"#",
				"Tipo",
				"Longitud",
				"Altura",
				"Metrado",
				"Unidad",
				"Uso",
				"Características técnicas",
				"Ubicación",
				"Foto"
			]
		});
		case "Instalaciones fijas permanentes": return /* @__PURE__ */ jsx(ListadoTab, {
			codigo,
			title: "Listado de instalaciones fijas permanentes",
			headers: [
				"#",
				"Tipo",
				"Descripción",
				"Cantidad",
				"Unidad",
				"Material",
				"Estado",
				"Foto"
			]
		});
		case "Plantaciones frutales": return /* @__PURE__ */ jsx(ListadoTab, {
			codigo,
			title: "Listado de plantaciones frutales",
			headers: [
				"#",
				"Especie",
				"Cantidad",
				"Edad (años)",
				"Estado",
				"Producción",
				"Foto"
			]
		});
		case "Plantaciones forestales": return /* @__PURE__ */ jsx(ListadoTab, {
			codigo,
			title: "Listado de plantaciones forestales",
			headers: [
				"#",
				"Especie",
				"Cantidad",
				"Edad (años)",
				"Altura (m)",
				"Diámetro (cm)",
				"Foto"
			]
		});
		case "Plantaciones transitorias": return /* @__PURE__ */ jsx(ListadoTab, {
			codigo,
			title: "Listado de plantaciones transitorias",
			headers: [
				"#",
				"Cultivo",
				"Área (m²)",
				"Campaña",
				"Rendimiento",
				"Foto"
			]
		});
		case "Cerco vivo": return /* @__PURE__ */ jsx(ListadoTab, {
			codigo,
			title: "Listado de cerco vivo",
			headers: [
				"#",
				"Especie",
				"Longitud (m)",
				"Altura (m)",
				"Estado",
				"Foto"
			]
		});
		case "Daño emergente": return /* @__PURE__ */ jsx(ListadoTab, {
			codigo,
			title: "Listado de daño emergente",
			headers: [
				"#",
				"Concepto",
				"Descripción",
				"Monto (S/)",
				"Sustento"
			]
		});
		case "Descripción del entorno": return /* @__PURE__ */ jsx(DescripcionEntornoTab, { codigo });
		case "Histórico": return ctx.historico;
	}
}
function createIttDraftWordBlob({ codigo, sujeto, area, valorTasacion, peritoNombre, peritoDni, peritoSupervisor, fechaItt }) {
	const html = `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body style="font-family: Arial; font-size: 10pt; color: black;">
    <h2>INFORME TÉCNICO DE TASACIÓN - BORRADOR</h2>
    <p><b>Fecha:</b> ${escapeHtml(fechaItt)}</p>
    <p><b>Código de predio:</b> ${escapeHtml(codigo)}</p>
    <p><b>Sujeto pasivo:</b> ${escapeHtml(sujeto)}</p>
    <p><b>Área afectada:</b> ${escapeHtml(area)} m2</p>
    <p><b>Valor de tasación:</b> ${escapeHtml(valorTasacion || "Pendiente de registro")}</p>
    <p><b>Perito tasador:</b> ${escapeHtml(peritoNombre || "Pendiente de registro")}</p>
    <p><b>DNI del perito:</b> ${escapeHtml(peritoDni || "Pendiente de registro")}</p>
    <p><b>Perito supervisor:</b> ${escapeHtml(peritoSupervisor || "Pendiente de registro")}</p>
    <h3>1. Antecedentes</h3>
    <p>El presente borrador se genera desde el módulo de tasación para revisión y culminación por el perito tasador.</p>
    <h3>2. Desarrollo de la tasación</h3>
    <p>Registrar metodología, inspección, fuentes de información, análisis del predio y sustento del valor.</p>
    <h3>3. Conclusión</h3>
    <p>Registrar el valor final de tasación y recomendaciones.</p>
  </body>
</html>`;
	return new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
}
function escapeHtml(value) {
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function DatosTecnicosPage() {
	const { projectId, codigo } = Route$1.useParams();
	const router = useRouter();
	const goBack = () => router.history.back();
	const decoded = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const [tab, setTab] = useState("Padrón");
	const predio = getPredioByCodigo(decoded);
	const [itt, setItt] = useState({
		peritoNombre: "",
		peritoDni: "",
		peritoSupervisor: "",
		fechaItt: fechaIso(/* @__PURE__ */ new Date()),
		valorTasacion: predio?.valor || ""
	});
	const [areas, setAreas] = useState({
		matriz: [],
		afectadas: [{
			cod: "KFRE",
			uso: "AFECTADA",
			directa: 150,
			indirecta: 0,
			total: 150,
			fecha: "FEBRERO 2025",
			planoCbc: "PTKT-0001"
		}],
		remanentes: []
	});
	const rol = useRol();
	const claveHistorial = `datos-tecnicos-${decoded}`;
	const nombrar = (rows) => rows.map((r) => ({
		...r,
		nombre: `${r.cod} · ${r.total.toFixed(2)} m²`
	}));
	const registroDe = (i, a) => ({
		itt: i,
		areas: {
			matriz: nombrar(a.matriz),
			afectadas: nombrar(a.afectadas),
			remanentes: nombrar(a.remanentes)
		}
	});
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, registroDe(itt, areas), (v) => {
		setItt(v.itt);
		setAreas(v.areas);
	}, {
		modulo: 12,
		entidad: "datos_tecnicos"
	});
	const onAreas = (nuevas, accion, objeto, motivo) => {
		setAreas(nuevas);
		guardarVersion(accion, objeto, motivo, registroDe(itt, nuevas));
	};
	function generarBorradorItt() {
		const fileName = `borrador_itt_${(predio?.cod || decoded).replace(/[^A-Z0-9-]/gi, "_")}.doc`;
		descargarBlob(fileName, createIttDraftWordBlob({
			codigo: predio?.cod || decoded,
			sujeto: predio?.suj || "Sin información",
			area: predio?.area || predio?.m2 || "Sin información",
			valorTasacion: itt.valorTasacion,
			peritoNombre: itt.peritoNombre,
			peritoDni: itt.peritoDni,
			peritoSupervisor: itt.peritoSupervisor,
			fechaItt: itt.fechaItt
		}));
		guardarVersion("Generó borrador del ITT", fileName);
	}
	const historico = /* @__PURE__ */ jsx(Historico, {
		registro: claveHistorial,
		etiquetas: ETIQUETAS_DATOS_TECNICOS,
		nombreArchivo: `historico-datos-tecnicos-${decoded}`,
		puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
		onRestaurar: restaurar
	});
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: decoded,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: decoded }),
		children: [
			/* @__PURE__ */ jsx(PredioEncabezado, {
				projectId,
				codigo: decoded,
				titulo: "Tasación / ITT",
				icono: Ruler,
				documentos: { extras: { "itt-informe": /* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: generarBorradorItt,
					children: [/* @__PURE__ */ jsx(Download, {}), " Borrador del ITT"]
				}) } },
				acciones: /* @__PURE__ */ jsx(BotonPanelFotografico, {
					proyecto: projectId,
					predio: decoded,
					pantalla: "datos-tecnicos",
					titulo: "Panel fotográfico · Datos técnicos"
				})
			}),
			/* @__PURE__ */ jsx(Section, {
				titulo: "Tasación · Título II cap. III y art. 18 del TUO del DL 1192",
				className: "mb-4",
				children: /* @__PURE__ */ jsx(Stepper, { pasos: [
					{
						nombre: "Requerimiento de tasación / ITL",
						estado: "completado",
						detalle: "Art. 17 · expediente técnico legal",
						to: "/proyectos/$projectId/predios/$codigo/requerimiento-tasacion-itl",
						params: {
							projectId,
							codigo
						}
					},
					{
						nombre: "Expediente de tasación",
						estado: "completado",
						detalle: "Art. 17 · 4 meses desde la identificación"
					},
					{
						nombre: "Tasación / ITT",
						estado: "actual",
						detalle: "Art. 18 · 30 d.h. desde la designación del perito"
					},
					{
						nombre: "Modalidad de adquisición",
						estado: "pendiente",
						detalle: "Art. 19 a 21",
						to: "/proyectos/$projectId/predios/$codigo/modalidad-adquisicion",
						params: {
							projectId,
							codigo
						}
					}
				] })
			}),
			/* @__PURE__ */ jsx(InformacionPredio, {
				projectId,
				codigo: decoded,
				className: "mb-4"
			}),
			/* @__PURE__ */ jsx(TasacionPeritoPanel, {
				itt,
				onItt: setItt
			}),
			/* @__PURE__ */ jsxs(Tabs, {
				value: tab,
				onValueChange: (v) => setTab(v),
				orientation: "vertical",
				className: "flex flex-col gap-4 lg:flex-row",
				children: [/* @__PURE__ */ jsx(TabsList, {
					"aria-label": "Secciones del expediente técnico",
					className: "h-auto w-full shrink-0 flex-col items-stretch justify-start gap-0.5 rounded-lg border border-border bg-card p-1 lg:w-60",
					children: TABS.map((t) => /* @__PURE__ */ jsxs(TabsTrigger, {
						value: t.name,
						className: "justify-start gap-2 px-3 py-2 data-[state=active]:bg-primary-soft data-[state=active]:text-primary-dark",
						children: [/* @__PURE__ */ jsx(t.icon, {
							size: 16,
							className: "shrink-0"
						}), /* @__PURE__ */ jsx("span", {
							className: "truncate",
							children: t.name === "Histórico" ? `Histórico (${versiones.length})` : t.name
						})]
					}, t.name))
				}), /* @__PURE__ */ jsxs(TabsContent, {
					value: tab,
					className: "mt-0 min-w-0 flex-1",
					children: [/* @__PURE__ */ jsx(Section, {
						titulo: tab,
						children: renderTab(tab, decoded, {
							areas,
							onAreas,
							historico
						})
					}), tab !== "Histórico" && /* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						onClick: goBack,
						children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
					}), /* @__PURE__ */ jsxs(Button, {
						type: "button",
						onClick: () => {
							guardarVersion("Guardó datos técnicos", `predio ${predio?.cod || decoded}`);
							goBack();
						},
						children: [/* @__PURE__ */ jsx(Save, {}), " Guardar datos técnicos"]
					})] })]
				})]
			})
		]
	});
}
//#endregion
export { DatosTecnicosPage as component };
