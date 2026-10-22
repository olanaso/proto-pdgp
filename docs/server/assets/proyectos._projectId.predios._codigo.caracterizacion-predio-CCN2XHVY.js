import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { s as getPredioByCodigo } from "./prediosProyecto-D1ASzaVD.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { a as useFormularioConHistorial } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, n as etiquetaProyecto, t as PredioEncabezado, y as descargarBlob } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.caracterizacion-predio-7PbZe92q.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { _ as useFotosDelRegistro, p as refDeFila } from "./fotos-CUnD_Pb7.js";
import { n as BotonPanelFotografico } from "./CampoFoto-CSlShmEX.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { t as CampoDocumento } from "./CampoDocumento-CGvFKFra.js";
import { n as FotosDelRegistro, t as BotonFotosDeFila } from "./FotosRegistro-CcuXP5_9.js";
import { c as rotular, l as rotuloFila, n as LISTAS_INICIALES, r as NOMBRE_LISTA, t as DANO_INICIAL } from "./caracterizacion-BHWY_R4f.js";
import { createContext, useContext, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, Apple, CheckCircle2, Compass, Crop, Download, Fence, FileSpreadsheet, FileText, Hammer, History, Home, MapPinned, Pencil, Plus, Ruler, Save, Sprout, Trash2, Trees, Wrench, X } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.caracterizacion-predio.tsx?tsr-split=component
var MEMORIA_DESCRIPTIVA_FILE_NAME = "35412023_20260903_ITT.doc";
var MEMORIA_DESCRIPTIVA_URL = `/documents/${MEMORIA_DESCRIPTIVA_FILE_NAME}`;
var DATA_TEMPLATE_DOWNLOAD_URL = "https://drive.google.com/uc?id=17nJ9tRmPRJYtE8bvhIEkAv_fjMf50CcX&export=download";
var TABS = [
	{
		key: "padronTecnico",
		label: "Padrón técnico",
		icon: FileText
	},
	{
		key: "colindanciaMatriz",
		label: "Colindancia matriz",
		icon: Compass
	},
	{
		key: "areaAfectada",
		label: "Área afectada",
		icon: Crop
	},
	{
		key: "cuadroDatosTecnicos",
		label: "Cuadro de datos técnicos",
		icon: Ruler
	},
	{
		key: "datosVivienda",
		label: "Datos de la vivienda",
		icon: Home
	},
	{
		key: "obrasComplementarias",
		label: "Obras complementarias",
		icon: Hammer
	},
	{
		key: "instFijasPermanentes",
		label: "Instalaciones fijas permanentes",
		icon: Wrench
	},
	{
		key: "plantacionesFrutales",
		label: "Plantaciones frutales",
		icon: Apple
	},
	{
		key: "plantacionesForestales",
		label: "Plantaciones forestales",
		icon: Trees
	},
	{
		key: "plantacionesTransitorias",
		label: "Plantaciones transitorias",
		icon: Sprout
	},
	{
		key: "cercoVivo",
		label: "Cerco vivo",
		icon: Fence
	},
	{
		key: "danoEmergente",
		label: "Daño emergente",
		icon: AlertTriangle
	},
	{
		key: "descripcionEntorno",
		label: "Descripción del entorno",
		icon: MapPinned
	},
	{
		key: "historico",
		label: "Histórico",
		icon: History
	}
];
/** Fotos de la caracterización: predio y proyecto de la ruta, pantalla y módulo fijos (M12). */
function useBaseFotos(seccion) {
	const { projectId, codigo } = Route$1.useParams();
	return {
		proyecto: projectId,
		predio: decodeURIComponent(codigo),
		pantalla: "caracterizacion-predio",
		seccion,
		modulo: 12
	};
}
/**
* Formulario para editar una fila: parte de los valores vacíos y toma los de la fila (números como
* texto) y, si la fila guardó su formulario completo, esos. Solo las claves del formulario.
*/
function desdeFila(vacio, fila) {
	if (!fila) return vacio;
	const datos = {
		...fila,
		...fila.formulario ?? {}
	};
	return Object.fromEntries(Object.keys(vacio).map((k) => {
		const v = datos[k];
		return [k, typeof v === "number" ? String(v) : typeof v === "string" ? v : vacio[k]];
	}));
}
/** Campos de foto de cada sección (docs/PLAN-EDITOR-FOTOS.md §6.2). */
var CAMPOS_FOTO = {
	area: [
		"Foto panorámica",
		"Foto frontal",
		"Foto lado izquierdo",
		"Foto lado derecho",
		"Foto fondo"
	].map((campo) => ({
		campo,
		maximo: 1
	})),
	vivienda: [
		"Foto frente",
		"Foto lado derecho",
		"Foto lado izquierdo",
		"Foto fondo"
	].map((campo) => ({
		campo,
		maximo: 1
	})),
	obra: [{
		campo: "Fotos de la obra complementaria",
		maximo: 3
	}],
	instalacion: [{
		campo: "Fotos de la instalación",
		maximo: 3
	}],
	plantacion: [{
		campo: "Fotos de la plantación",
		maximo: 3
	}],
	cerco: [{
		campo: "Fotos del cerco vivo",
		maximo: 3
	}]
};
var SECCION_AREA = {
	MATRIZ: "Área matriz",
	AFECTADA: "Áreas afectadas",
	REMANENTE: "Áreas remanentes"
};
var ETIQUETAS_CARACTERIZACION = {
	listas: "Listados",
	danoEmergente: "Daño emergente",
	matriz: "Área matriz",
	afectadas: "Área afectada",
	remanentes: "Área remanente",
	viviendas: "Vivienda",
	obras: "Obra complementaria",
	instalaciones: "Instalación fija permanente",
	frutales: "Plantación frutal",
	forestales: "Plantación forestal",
	transitorias: "Plantación transitoria",
	cercoVivo: "Cerco vivo",
	correspondencia: "Correspondencia",
	identificacion: "Identificación",
	tipoAfectacion: "Tipo de afectación",
	numeralUno: "Numeral 1",
	lucroCesante: "Lucro cesante",
	formaAfectacion: "Forma de afectación",
	condicionPredio: "Condición del predio",
	descripcion: "Descripción",
	cod: "Cód. polígono",
	uso: "Uso",
	directa: "Área directa (m²)",
	indirecta: "Área indirecta (m²)",
	total: "Área total (m²)",
	fechaPlanoCbc: "Fecha del plano CBC",
	codigoPlanoCbc: "Código del plano CBC",
	nombreComun: "Nombre común",
	nombreCientifico: "Nombre científico",
	edadAnos: "Edad (años)",
	cantidad: "Cantidad"
};
var CaracterizacionContext = createContext(null);
function useCaracterizacion() {
	const ctx = useContext(CaracterizacionContext);
	if (!ctx) throw new Error("useCaracterizacion fuera de CaracterizacionPredioPage");
	return ctx;
}
/** Una lista de la pantalla: sus filas y las acciones que dejan versión en el histórico. */
function useLista(key) {
	const ctx = useCaracterizacion();
	return {
		rows: ctx.listas[key],
		agregar: (fila) => ctx.agregar(key, fila),
		baja: (index) => ctx.pedirBaja(key, index),
		editar: (index, fila) => ctx.editar(key, index, fila)
	};
}
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoEliminacion({ nombre, tipo, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo: `Eliminar ${tipo}`,
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
			children: [
				/* @__PURE__ */ jsx(Trash2, {}),
				" Eliminar ",
				tipo
			]
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
			placeholder: "Por ejemplo: registro duplicado; error de digitación"
		})]
	});
}
function CaracterizacionPredioPage() {
	const { projectId, codigo } = Route$1.useParams();
	const decodedCodigo = decodeURIComponent(codigo);
	const proyecto = getProyecto(projectId);
	const predio = getPredioByCodigo(decodedCodigo);
	const projectLabel = etiquetaProyecto(proyecto, projectId);
	const [activeTab, setActiveTab] = useState("padronTecnico");
	const [message, setMessage] = useState("");
	const tabActual = TABS.find((t) => t.key === activeTab) ?? TABS[0];
	const rol = useRol();
	const claveHistorial = `caracterizacion-predio-${decodedCodigo}`;
	const [listas, setListas] = useState(LISTAS_INICIALES);
	const [dano, setDano] = useState(DANO_INICIAL);
	const [entorno, setEntorno] = useState();
	const [bajaPendiente, setBajaPendiente] = useState(null);
	const registroDe = (l = listas) => ({
		listas: rotular(l),
		danoEmergente: dano,
		...entorno ? { entorno } : {}
	});
	const { versiones, guardarVersion, restaurar } = useFormularioConHistorial(claveHistorial, registroDe(), (v) => {
		setListas(v.listas);
		setDano(v.danoEmergente);
		setEntorno(v.entorno);
	}, {
		modulo: 12,
		entidad: "caracterizacion_predio"
	});
	const codigoPredio = predio?.cod || decodedCodigo;
	function agregar(key, fila) {
		const nuevas = {
			...listas,
			[key]: [...listas[key], fila]
		};
		setListas(nuevas);
		guardarVersion(`Agregó ${NOMBRE_LISTA[key]}`, rotuloFila(fila), void 0, registroDe(nuevas));
	}
	function editar(key, index, fila) {
		const nuevas = {
			...listas,
			[key]: listas[key].map((x, i) => i === index ? fila : x)
		};
		setListas(nuevas);
		guardarVersion(`Modificó ${NOMBRE_LISTA[key]}`, rotuloFila(fila), void 0, registroDe(nuevas));
	}
	function confirmarBaja(motivo) {
		if (!bajaPendiente) return;
		const { key, index } = bajaPendiente;
		const fila = listas[key][index];
		const nuevas = {
			...listas,
			[key]: listas[key].filter((_, i) => i !== index)
		};
		setListas(nuevas);
		guardarVersion(`Eliminó ${NOMBRE_LISTA[key]}`, rotuloFila(fila), motivo, registroDe(nuevas));
		setBajaPendiente(null);
	}
	function handleSubmit(event) {
		event.preventDefault();
		guardarVersion("Guardó caracterización", `predio ${codigoPredio}`);
		setMessage("Caracterización del predio guardada como borrador técnico.");
	}
	function handleGenerateMemoriaDescriptiva() {
		const link = document.createElement("a");
		link.href = MEMORIA_DESCRIPTIVA_URL;
		link.download = MEMORIA_DESCRIPTIVA_FILE_NAME;
		document.body.appendChild(link);
		link.click();
		link.remove();
		guardarVersion("Generó memoria descriptiva", MEMORIA_DESCRIPTIVA_FILE_NAME);
		setMessage("Memoria descriptiva descargada.");
	}
	function handleGenerateMembretadoPlanos() {
		const baseCode = getDocumentBaseCode(predio?.cod || decodedCodigo);
		descargarBlob(`membretado_planos_${baseCode}.xls`, createMembretadoPlanosBlob({
			baseCode,
			codigo: predio?.cod || decodedCodigo,
			predio,
			projectLabel
		}));
		guardarVersion("Generó membretado de planos", `predio ${codigoPredio}`);
		setMessage("Membretado de planos generado. Revise la descarga.");
	}
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: decodedCodigo,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: decodedCodigo }),
		children: [
			/* @__PURE__ */ jsx(PredioEncabezado, {
				projectId,
				codigo: decodedCodigo,
				titulo: "Caracterización del predio",
				icono: Home,
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx(BotonPanelFotografico, {
						proyecto: projectId,
						predio: decodedCodigo,
						pantalla: "caracterizacion-predio",
						titulo: "Panel fotográfico · Caracterización del predio"
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						onClick: handleGenerateMemoriaDescriptiva,
						children: [/* @__PURE__ */ jsx(Download, {}), " Generar memoria descriptiva"]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						onClick: handleGenerateMembretadoPlanos,
						children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Generar membretado de planos"]
					})
				] })
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: "caracterizacion-predio",
				projectId,
				codigo: decodedCodigo
			}),
			message && /* @__PURE__ */ jsxs("p", {
				role: "status",
				className: "mb-4 flex items-start gap-2 rounded-md border border-success bg-success-soft px-3 py-2 text-sm text-success",
				children: [
					/* @__PURE__ */ jsx(CheckCircle2, {
						size: 16,
						className: "mt-0.5 shrink-0",
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: message
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setMessage(""),
						"aria-label": "Cerrar aviso",
						className: "rounded-sm hover:opacity-70",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ jsx(CaracterizacionContext.Provider, {
				value: {
					listas,
					dano,
					setDano,
					entorno,
					agregar,
					editar,
					pedirBaja: (key, index) => setBajaPendiente({
						key,
						index
					})
				},
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					children: [/* @__PURE__ */ jsx(InformacionPredio, {
						projectId,
						codigo: decodedCodigo,
						className: "mb-4"
					}), /* @__PURE__ */ jsxs(Tabs, {
						value: activeTab,
						onValueChange: (v) => setActiveTab(v),
						orientation: "vertical",
						className: "flex flex-col gap-4 lg:flex-row",
						children: [/* @__PURE__ */ jsx(TabsList, {
							"aria-label": "Secciones de la caracterización",
							className: "h-auto w-full shrink-0 flex-col items-stretch justify-start gap-0.5 rounded-lg border border-border bg-card p-1 lg:w-60",
							children: TABS.map((tab) => /* @__PURE__ */ jsxs(TabsTrigger, {
								value: tab.key,
								className: "justify-start gap-2 px-3 py-2 data-[state=active]:bg-primary-soft data-[state=active]:text-primary-dark",
								children: [/* @__PURE__ */ jsx(tab.icon, {
									size: 16,
									className: "shrink-0"
								}), /* @__PURE__ */ jsx("span", {
									className: "min-w-0 truncate",
									children: tab.key === "historico" ? `Histórico (${versiones.length})` : tab.label
								})]
							}, tab.key))
						}), /* @__PURE__ */ jsxs(TabsContent, {
							value: activeTab,
							className: "mt-0 min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx(Section, {
								titulo: tabActual.label,
								children: activeTab === "historico" ? /* @__PURE__ */ jsx(Historico, {
									registro: claveHistorial,
									etiquetas: ETIQUETAS_CARACTERIZACION,
									nombreArchivo: `historico-caracterizacion-predio-${decodedCodigo}`,
									puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
									onRestaurar: (r, n) => {
										restaurar(r, n);
										setMessage(`Se restauró la versión ${n}.`);
									}
								}) : renderActiveTab(activeTab, {
									codigo: decodedCodigo,
									predio,
									projectLabel
								})
							}), activeTab !== "historico" && /* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								onClick: () => history.back(),
								children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "submit",
								children: [/* @__PURE__ */ jsx(Save, {}), " Guardar caracterización"]
							})] })]
						})]
					})]
				})
			}),
			bajaPendiente && /* @__PURE__ */ jsx(MotivoEliminacion, {
				nombre: rotuloFila(listas[bajaPendiente.key][bajaPendiente.index]),
				tipo: NOMBRE_LISTA[bajaPendiente.key],
				onCerrar: () => setBajaPendiente(null),
				onConfirmar: confirmarBaja
			})
		]
	});
}
function renderActiveTab(activeTab, props) {
	switch (activeTab) {
		case "padronTecnico": return /* @__PURE__ */ jsx(PadronTecnicoTab, { ...props });
		case "colindanciaMatriz": return /* @__PURE__ */ jsx(ColindanciasTab, { ...props });
		case "areaAfectada": return /* @__PURE__ */ jsx(AreasTab, { ...props });
		case "cuadroDatosTecnicos": return /* @__PURE__ */ jsx(DatosTecnicosTab, { ...props });
		case "datosVivienda": return /* @__PURE__ */ jsx(DatosViviendaTab, { ...props });
		case "obrasComplementarias": return /* @__PURE__ */ jsx(ObrasComplementariasTab, { ...props });
		case "instFijasPermanentes": return /* @__PURE__ */ jsx(InstalacionesFijasPermanentesTab, { ...props });
		case "plantacionesFrutales": return /* @__PURE__ */ jsx(PlantacionesFrutalesTab, { ...props });
		case "plantacionesForestales": return /* @__PURE__ */ jsx(PlantacionesForestalesTab, { ...props });
		case "plantacionesTransitorias": return /* @__PURE__ */ jsx(PlantacionesTransitoriasTab, { ...props });
		case "cercoVivo": return /* @__PURE__ */ jsx(CercoVivoTab, {});
		case "danoEmergente": return /* @__PURE__ */ jsx(DanoEmergenteTab, { ...props });
		case "descripcionEntorno": return /* @__PURE__ */ jsx(DescripcionEntornoTab, {});
		case "historico": return null;
	}
}
/** Datos de expediente que encabezan cada pestaña. */
function ExpedienteHeader({ codigo }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }), /* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
		etiqueta: "Código del predio",
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			className: controlClase,
			defaultValue: codigo
		})
	}), /* @__PURE__ */ jsx(FormField, {
		etiqueta: "Código de expediente",
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			className: controlClase,
			defaultValue: "3546-2023-MTC/DDP"
		})
	})] })] });
}
/** Lista de registros de una pestaña: numeración, columnas propias y acción de eliminar. */
function TablaFilas({ rows, columnas, onDelete, onEdit, etiqueta }) {
	return /* @__PURE__ */ jsx(Tabla, {
		columnas: [
			{
				clave: "n",
				titulo: "#",
				ancho: "48px",
				render: (r) => rows.indexOf(r) + 1
			},
			...columnas,
			{
				clave: "acciones",
				titulo: "Acciones",
				alinear: "derecha",
				render: (r) => /* @__PURE__ */ jsxs("span", {
					className: "inline-flex gap-1",
					children: [onEdit && /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						className: "size-8",
						title: `Editar ${etiqueta}`,
						"aria-label": `Editar ${etiqueta}`,
						onClick: () => onEdit(rows.indexOf(r)),
						children: /* @__PURE__ */ jsx(Pencil, {})
					}), /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						className: "size-8 text-destructive hover:bg-destructive-soft",
						title: `Eliminar ${etiqueta}`,
						"aria-label": `Eliminar ${etiqueta}`,
						onClick: () => onDelete(rows.indexOf(r)),
						children: /* @__PURE__ */ jsx(Trash2, {})
					})]
				})
			}
		],
		filas: rows,
		claveFila: (_, i) => i,
		vacio: "Sin registros."
	});
}
/** Tabla de solo lectura a partir de cabeceras y filas de texto. */
function TablaTexto({ headers, rows, ultimaAncha = false }) {
	return /* @__PURE__ */ jsx(Tabla, {
		columnas: headers.map((h, i) => ({
			clave: String(i),
			titulo: h,
			render: (r) => ultimaAncha && i === headers.length - 1 ? /* @__PURE__ */ jsx("span", {
				className: "block max-w-72 text-xs",
				children: r[i] || /* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: "Pendiente"
				})
			}) : r[i] || /* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: "Pendiente"
			})
		})),
		filas: rows,
		claveFila: (r, i) => `${r[0]}-${i}`,
		vacio: "Sin registros. El alta de registros en esta sección estará disponible próximamente."
	});
}
function PadronTecnicoTab({ codigo }) {
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Mes de elaboración del expediente",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado del predio",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de tasación",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo periodo tasación",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de inspección de campo",
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: `${controlClase} bg-muted`,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre de vía",
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Alumbrado público",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Instalaciones de gas",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Alcantarillado",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Agua potable",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Áreas y certificacion" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área gráfica matriz (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área registral matriz (m²)",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
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
				etiqueta: "Profesional técnico responsable de firmar planos",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Datum de los planos",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano de diagnóstico",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "Seleccione" })
				})
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
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos Memoria descriptiva" }),
		/* @__PURE__ */ jsx(FormGrid, {
			columnas: 1,
			children: /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de emisión",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase
				})
			})
		})
	] });
}
function AreasTab({ codigo }) {
	const matriz = useLista("matriz");
	const afe = useLista("afectadas");
	const remanentes = useLista("remanentes");
	const afectadas = afe.rows;
	const [modal, setModal] = useState(null);
	const [editando, setEditando] = useState(null);
	const listaDe = {
		matriz,
		afectadas: afe,
		remanentes
	};
	const NOMBRE_SECCION = {
		matriz: "Área matriz",
		afectadas: "Áreas afectadas",
		remanentes: "Áreas remanentes"
	};
	const abrir = (target, indice) => {
		setEditando(indice);
		setModal(target);
	};
	const totalDirecta = afectadas.reduce((sum, row) => sum + row.directa, 0);
	const totalIndirecta = afectadas.reduce((sum, row) => sum + row.indirecta, 0);
	const totalArea = afectadas.reduce((sum, row) => sum + row.total, 0);
	function addArea(target, row) {
		if (editando != null) listaDe[target].editar(editando, row);
		else listaDe[target].agregar(row);
		setModal(null);
		setEditando(null);
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
		/* @__PURE__ */ jsx(AreaSectionBlock, {
			title: "Área matriz",
			rows: matriz.rows,
			onAdd: () => abrir("matriz", null),
			onEdit: (i) => abrir("matriz", i),
			onDelete: matriz.baja
		}),
		/* @__PURE__ */ jsx(AreaSectionBlock, {
			title: "Listado de áreas afectadas",
			demo: true,
			rows: afectadas,
			onAdd: () => abrir("afectadas", null),
			onEdit: (i) => abrir("afectadas", i),
			onDelete: afe.baja
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-3",
			children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Totales" }), /* @__PURE__ */ jsxs(FormGrid, { children: [
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
						value: totalArea.toFixed(2),
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
			] })]
		}),
		/* @__PURE__ */ jsx(AreaSectionBlock, {
			title: "Listado de áreas remanentes",
			rows: remanentes.rows,
			onAdd: () => abrir("remanentes", null),
			onEdit: (i) => abrir("remanentes", i),
			onDelete: remanentes.baja
		}),
		modal && /* @__PURE__ */ jsx(AddAreaModal, {
			defaultUso: modal === "matriz" ? "MATRIZ" : modal === "remanentes" ? "REMANENTE" : "AFECTADA",
			onClose: () => {
				setModal(null);
				setEditando(null);
			},
			onAdd: (row) => addArea(modal, row),
			inicial: editando != null ? listaDe[modal].rows[editando] : void 0,
			refFotos: editando != null ? refDeFila(NOMBRE_SECCION[modal], listaDe[modal].rows[editando], editando) : void 0
		}, `${modal}-${editando ?? "nuevo"}`)
	] });
}
function AreaSectionBlock({ title, rows, onAdd, onDelete, onEdit, demo = false }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsx(AddButton, {
				onClick: onAdd,
				etiqueta: "área"
			}),
			children: title
		}),
		demo && /* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-warning",
			children: "Datos de demostración"
		}),
		/* @__PURE__ */ jsx(AreaTable, {
			rows,
			onDelete,
			onEdit,
			seccion: title.replace("Listado de áreas", "Áreas")
		})
	] });
}
function AddButton({ onClick, etiqueta = "registro" }) {
	return /* @__PURE__ */ jsxs(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick,
		children: [
			/* @__PURE__ */ jsx(Plus, {}),
			" Añadir ",
			etiqueta
		]
	});
}
function AreaTable({ rows, onDelete, onEdit, seccion }) {
	const base = useBaseFotos(seccion);
	return /* @__PURE__ */ jsx(TablaFilas, {
		rows,
		onDelete,
		onEdit,
		etiqueta: "área",
		columnas: [
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
				render: (r) => formatAreaNumber(r.directa)
			},
			{
				clave: "indirecta",
				titulo: "Área indirecta (m²)",
				alinear: "derecha",
				render: (r) => formatAreaNumber(r.indirecta)
			},
			{
				clave: "total",
				titulo: "Área total (m²)",
				alinear: "derecha",
				render: (r) => formatAreaNumber(r.total)
			},
			{
				clave: "fechaPlanoCbc",
				titulo: "Fecha del plano CBC"
			},
			{
				clave: "codigoPlanoCbc",
				titulo: "Código del plano CBC"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila(seccion, r, rows.indexOf(r)),
					campos: CAMPOS_FOTO.area,
					titulo: `${seccion} ${r.cod}`
				})
			}
		]
	});
}
function AddAreaModal({ defaultUso, onClose, onAdd, inicial, refFotos }) {
	const base = useBaseFotos(SECCION_AREA[defaultUso] ?? "Áreas");
	const fotos = useFotosDelRegistro(base, "area");
	const [form, setForm] = useState(() => desdeFila({
		cod: "",
		uso: defaultUso,
		directa: "",
		indirecta: "",
		fechaPlanoCbc: "FEBRERO 2026",
		codigoPlanoCbc: ""
	}, inicial));
	const directa = parseNumber(form.directa);
	const indirecta = parseNumber(form.indirecta);
	const total = directa + indirecta;
	function handleAdd() {
		fotos.confirmar();
		onAdd({
			formulario: form,
			fotoRef: refFotos ?? fotos.ref,
			cod: form.cod || "KFRE",
			uso: form.uso === "Seleccione" ? defaultUso : form.uso,
			directa,
			indirecta,
			total,
			fechaPlanoCbc: form.fechaPlanoCbc,
			codigoPlanoCbc: form.codigoPlanoCbc
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: inicial ? "Editar área" : "Agregar área",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleAdd,
			children: [
				/* @__PURE__ */ jsx(Plus, {}),
				" ",
				inicial ? "Guardar cambios" : "Agregar área"
			]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Uso",
				obligatorio: true,
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.uso,
					onChange: (event) => setForm({
						...form,
						uso: event.target.value
					}),
					children: [
						/* @__PURE__ */ jsx("option", { children: "Seleccione" }),
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
					className: controlClase,
					value: form.directa,
					onChange: (event) => setForm({
						...form,
						directa: event.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área indirecta (m²)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.indirecta,
					onChange: (event) => setForm({
						...form,
						indirecta: event.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área total (m²)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} bg-muted`,
					value: formatAreaNumber(total),
					readOnly: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de elaboración del plano CBC",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.fechaPlanoCbc,
					onChange: (event) => setForm({
						...form,
						fechaPlanoCbc: event.target.value
					}),
					children: [
						/* @__PURE__ */ jsx("option", { children: "FEBRERO 2026" }),
						/* @__PURE__ */ jsx("option", { children: "FEBRERO 2025" }),
						/* @__PURE__ */ jsx("option", { children: "ENERO 2026" }),
						/* @__PURE__ */ jsx("option", { children: "MARZO 2026" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del plano CBC",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.codigoPlanoCbc,
					onChange: (event) => setForm({
						...form,
						codigoPlanoCbc: event.target.value
					})
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: refFotos ?? fotos.ref,
				campos: CAMPOS_FOTO.area
			})
		] })
	});
}
function parseNumber(value) {
	const parsed = Number(String(value).replace(",", "."));
	return Number.isFinite(parsed) ? parsed : 0;
}
function formatAreaNumber(value) {
	return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
function ColindanciasTab({ codigo }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
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
					className: controlClase
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
					className: controlClase
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
					className: controlClase
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
					className: controlClase
				})
			})
		] })
	] });
}
function DatosTecnicosTab({ codigo }) {
	const { projectId } = Route$1.useParams();
	const [selectedArea, setSelectedArea] = useState("NINGUNO");
	const areaRows = [{
		cod: "KFRE",
		uso: "AFECTADA",
		directa: 150,
		indirecta: 0,
		total: 150,
		fechaPlanoCbc: "FEBRERO 2025",
		codigoPlanoCbc: "PTKT-0001"
	}];
	const cdtRows = [
		[
			"1",
			"KFRE",
			"AFECTADA",
			"1-2",
			"6.56",
			"46d25'33\"",
			"537816.4",
			"8605575.39",
			"538041.07",
			"8605942.86",
			"NORTE",
			"COMUNIDAD CAMPESINA COTAY (PE: 40019771)",
			"Colinda con Comunidad Campesina Cotay (PE: 40019771), mediante una linea recta compuesta por un tramo recto que mide en total 6.56 metros, desde el vertice 1 al vertice 2; tal como se indica en los datos tecnico descritos en el Anexo Nro. 1"
		],
		[
			"2",
			"KFRE",
			"AFECTADA",
			"2-3",
			"10.01",
			"92d2'18\"",
			"537822.79",
			"8605573.89",
			"538047.46",
			"8605941.36",
			"ESTE",
			"CARRETERA NACIONAL PE-3S",
			"Colinda con Carretera Nacional PE-3S, mediante una linea recta compuesta por un tramo recto que mide en total 10.01 metros, desde el vertice 2 al vertice 3; tal como se indica en los datos tecnico descritos en el Anexo Nro. 1"
		],
		[
			"3",
			"KFRE",
			"AFECTADA",
			"3-4",
			"0.13",
			"25d8'25\"",
			"537820.85",
			"8605564.07",
			"538045.52",
			"8605931.54",
			"SUR",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"4",
			"KFRE",
			"AFECTADA",
			"4-5",
			"1.24",
			"181d11'31\"",
			"537820.82",
			"8605564.19",
			"538045.49",
			"8605931.66",
			"SUR",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"5",
			"KFRE",
			"AFECTADA",
			"5-6",
			"1.23",
			"181d15'7\"",
			"537820.49",
			"8605565.39",
			"538045.17",
			"8605932.85",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"6",
			"KFRE",
			"AFECTADA",
			"6-7",
			"1.22",
			"181d18'42\"",
			"537820.15",
			"8605566.57",
			"538044.82",
			"8605934.03",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"7",
			"KFRE",
			"AFECTADA",
			"7-8",
			"1.21",
			"181d22'19\"",
			"537819.78",
			"8605567.72",
			"538044.45",
			"8605935.19",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"8",
			"KFRE",
			"AFECTADA",
			"8-9",
			"1.2",
			"181d25'48\"",
			"537819.38",
			"8605568.86",
			"538044.05",
			"8605936.33",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"9",
			"KFRE",
			"AFECTADA",
			"9-10",
			"1.19",
			"181d29'27\"",
			"537818.96",
			"8605569.98",
			"538043.63",
			"8605937.45",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"10",
			"KFRE",
			"AFECTADA",
			"10-11",
			"1.17",
			"181d33'2\"",
			"537818.52",
			"8605571.08",
			"538043.19",
			"8605938.55",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"11",
			"KFRE",
			"AFECTADA",
			"11-12",
			"1.16",
			"181d36'34\"",
			"537818.05",
			"8605572.16",
			"538042.72",
			"8605939.62",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"12",
			"KFRE",
			"AFECTADA",
			"12-13",
			"1.15",
			"181d40'9\"",
			"537817.55",
			"8605573.21",
			"538042.22",
			"8605940.68",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"13",
			"KFRE",
			"AFECTADA",
			"13-14",
			"1.14",
			"181d43'46\"",
			"537817.03",
			"8605574.24",
			"538041.7",
			"8605941.71",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		],
		[
			"14",
			"KFRE",
			"AFECTADA",
			"14-1",
			"0.17",
			"181d47'19\"",
			"537816.48",
			"8605575.25",
			"538041.15",
			"8605942.71",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			""
		]
	];
	const colRows = [
		[
			"1",
			"KFRE",
			"RURAL",
			"WGS84",
			"AFECTADA",
			"NORTE",
			"COMUNIDAD CAMPESINA COTAY (PE: 40019771)",
			"6.56",
			cdtRows[0][12]
		],
		[
			"2",
			"KFRE",
			"RURAL",
			"WGS84",
			"AFECTADA",
			"ESTE",
			"CARRETERA NACIONAL PE-3S",
			"10.01",
			cdtRows[1][12]
		],
		[
			"3",
			"KFRE",
			"RURAL",
			"WGS84",
			"AFECTADA",
			"SUR",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			"1.37",
			""
		],
		[
			"4",
			"KFRE",
			"RURAL",
			"WGS84",
			"AFECTADA",
			"OESTE",
			"VIAL-LST4-T04-ST05-090511-OC-00080",
			"10.84",
			""
		]
	];
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
					render: (r) => areaRows.indexOf(r) + 1
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
					render: (r) => formatAreaNumber(r.directa)
				},
				{
					clave: "indirecta",
					titulo: "Área indirecta (m²)",
					alinear: "derecha",
					render: (r) => formatAreaNumber(r.indirecta)
				},
				{
					clave: "total",
					titulo: "Área total (m²)",
					alinear: "derecha",
					render: (r) => formatAreaNumber(r.total)
				},
				{
					clave: "fechaPlanoCbc",
					titulo: "Fecha del plano CBC"
				},
				{
					clave: "codigoPlanoCbc",
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
			filas: areaRows,
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
						value: "colindancias",
						children: "Colindancias"
					})]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "cdt",
					children: /* @__PURE__ */ jsx(TablaTexto, {
						headers: [
							"Vértice",
							"Cód. afectada",
							"Uso DT",
							"Lado",
							"Distancia (m)",
							"Ángulo interno",
							"Este",
							"Norte",
							"Este 2",
							"Norte 2",
							"Lado 2",
							"Colindancia",
							"Colindancia CBC"
						],
						rows: cdtRows,
						ultimaAncha: true
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "colindancias",
					children: /* @__PURE__ */ jsx(TablaTexto, {
						headers: [
							"N.°",
							"Cód. afectada",
							"Tipo",
							"Datum",
							"Uso DT",
							"Lado",
							"Colindancia",
							"Suma de lados",
							"Colindancia CBC"
						],
						rows: colRows,
						ultimaAncha: true
					})
				})
			]
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Memoria descriptiva y membretado de planos" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Memoria descriptiva del predio",
			children: () => /* @__PURE__ */ jsx(CampoDocumento, {
				projectId,
				codigo,
				nombre: "Memoria descriptiva del predio"
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Membretado de planos",
			children: () => /* @__PURE__ */ jsx(CampoDocumento, {
				projectId,
				codigo,
				nombre: "Membretado de planos"
			})
		})] })
	] });
}
function DatosViviendaTab({ codigo }) {
	const { rows, agregar, baja, editar } = useLista("viviendas");
	const [open, setOpen] = useState(false);
	const [editando, setEditando] = useState(null);
	function addVivienda(row) {
		if (editando != null) editar(editando, row);
		else agregar(row);
		setOpen(false);
		setEditando(null);
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Listado de viviendas" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(AddButton, {
				onClick: () => {
					setEditando(null);
					setOpen(true);
				},
				etiqueta: "vivienda"
			})
		}),
		/* @__PURE__ */ jsx(ViviendaTable, {
			rows,
			onDelete: baja,
			onEdit: (i) => {
				setEditando(i);
				setOpen(true);
			}
		}),
		open && /* @__PURE__ */ jsx(AddViviendaModal, {
			onClose: () => {
				setOpen(false);
				setEditando(null);
			},
			onAdd: addVivienda,
			inicial: editando != null ? rows[editando] : void 0,
			refFotos: editando != null ? refDeFila("Viviendas", rows[editando], editando) : void 0
		}, editando ?? "nuevo")
	] });
}
function ViviendaTable({ rows, onDelete, onEdit }) {
	const base = useBaseFotos("Viviendas");
	return /* @__PURE__ */ jsx(TablaFilas, {
		rows,
		onDelete,
		onEdit,
		etiqueta: "vivienda",
		columnas: [
			{
				clave: "modulo",
				titulo: "Módulo"
			},
			{
				clave: "piso",
				titulo: "Piso"
			},
			{
				clave: "descripcion",
				titulo: "Descripción"
			},
			{
				clave: "directa",
				titulo: "Área directa (m²)",
				alinear: "derecha",
				render: (r) => formatAreaNumber(r.directa)
			},
			{
				clave: "indirecta",
				titulo: "Área indirecta (m²)",
				alinear: "derecha",
				render: (r) => formatAreaNumber(r.indirecta)
			},
			{
				clave: "total",
				titulo: "Área total (m²)",
				alinear: "derecha",
				render: (r) => formatAreaNumber(r.total)
			},
			{
				clave: "uso",
				titulo: "Uso"
			},
			{
				clave: "material",
				titulo: "Material predominante"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila("Viviendas", r, rows.indexOf(r)),
					campos: CAMPOS_FOTO.vivienda,
					titulo: `Vivienda ${r.modulo || r.descripcion}`
				})
			}
		]
	});
}
function AddViviendaModal({ onClose, onAdd, inicial, refFotos }) {
	const base = useBaseFotos("Viviendas");
	const fotos = useFotosDelRegistro(base, "vivienda");
	const [form, setForm] = useState(() => desdeFila({
		descripcion: "",
		modulo: "",
		piso: "",
		directa: "",
		indirecta: "",
		pisoMasAlto: "",
		volado: "",
		volado2: "",
		caracteristicas: "",
		uso: "",
		antiguedadAnos: "",
		material: "",
		estadoConservacion: "",
		estadoConstruccion: "",
		muros: "",
		columnas: "",
		techos: "",
		pisos: "",
		puertas: "",
		ventanas: "",
		revestimiento: "",
		banos: "",
		instalacionesElectricas: "",
		instalacionesSanitarias: "",
		vuat: "",
		fd: ""
	}, inicial));
	const directa = parseNumber(form.directa);
	const indirecta = parseNumber(form.indirecta);
	const total = directa + indirecta;
	const materialOptions = [
		"ACERO",
		"ADOBE",
		"ALUMINIO",
		"ALUZINC",
		"ASFALTO",
		"CALAMINA",
		"CALAMINA METALICA",
		"CALAMINA PLASTIFICADA",
		"CALAMINA TIPO ETERNIT",
		"COBRE",
		"CONCRETO",
		"DRYWALL",
		"FIBRA DE VIDRIO",
		"FIERRO",
		"FIERRO LISO",
		"GRANITO",
		"LADRILLO",
		"LONA",
		"LOSA"
	];
	function setValue(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function handleAdd() {
		fotos.confirmar();
		onAdd({
			formulario: form,
			fotoRef: refFotos ?? fotos.ref,
			descripcion: form.descripcion,
			modulo: form.modulo || "MODULO 1",
			piso: form.piso || "1",
			directa,
			indirecta,
			total,
			uso: form.uso,
			material: form.material,
			fotos: ""
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: inicial ? "Editar vivienda" : "Agregar vivienda",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleAdd,
			children: [
				/* @__PURE__ */ jsx(Plus, {}),
				" ",
				inicial ? "Guardar cambios" : "Agregar vivienda"
			]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.descripcion,
					onChange: (event) => setValue("descripcion", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Módulo",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.modulo,
					onChange: (event) => setValue("modulo", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "MODULO 1" }),
						/* @__PURE__ */ jsx("option", { children: "MODULO 2" }),
						/* @__PURE__ */ jsx("option", { children: "MODULO 3" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Piso",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.piso,
					onChange: (event) => setValue("piso", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "1" }),
						/* @__PURE__ */ jsx("option", { children: "2" }),
						/* @__PURE__ */ jsx("option", { children: "3" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área directa (m²)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.directa,
					onChange: (event) => setValue("directa", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área indirecta (m²)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.indirecta,
					onChange: (event) => setValue("indirecta", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área total (m²)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} bg-muted`,
					value: formatAreaNumber(total),
					readOnly: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Piso más alto",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					type: "number",
					value: form.pisoMasAlto,
					onChange: (event) => setValue("pisoMasAlto", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Volado",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.volado,
					onChange: (event) => setValue("volado", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Volado 2",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.volado2,
					onChange: (event) => setValue("volado2", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Características",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.caracteristicas,
					onChange: (event) => setValue("caracteristicas", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Uso",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.uso,
					onChange: (event) => setValue("uso", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Antigüedad (años)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.antiguedadAnos,
					onChange: (event) => setValue("antiguedadAnos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Material predominante",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.material,
					onChange: (event) => setValue("material", event.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), materialOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado de conservación",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.estadoConservacion,
					onChange: (event) => setValue("estadoConservacion", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "BUENO" }),
						/* @__PURE__ */ jsx("option", { children: "REGULAR" }),
						/* @__PURE__ */ jsx("option", { children: "MALO" }),
						/* @__PURE__ */ jsx("option", { children: "MUY BUENO" }),
						/* @__PURE__ */ jsx("option", { children: "MUY MALO" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado de construcción",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.estadoConstruccion,
					onChange: (event) => setValue("estadoConstruccion", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "TERMINADO" }),
						/* @__PURE__ */ jsx("option", { children: "INCONCLUSO" }),
						/* @__PURE__ */ jsx("option", { children: "EN CONSTRUCCION" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Muros",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.muros,
					onChange: (event) => setValue("muros", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Columnas",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.columnas,
					onChange: (event) => setValue("columnas", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Techos",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.techos,
					onChange: (event) => setValue("techos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Pisos",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.pisos,
					onChange: (event) => setValue("pisos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Puertas",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.puertas,
					onChange: (event) => setValue("puertas", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Ventanas",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.ventanas,
					onChange: (event) => setValue("ventanas", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Revestimiento",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.revestimiento,
					onChange: (event) => setValue("revestimiento", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Baños",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.banos,
					onChange: (event) => setValue("banos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Instalaciones eléctricas",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.instalacionesElectricas,
					onChange: (event) => setValue("instalacionesElectricas", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Instalaciones sanitarias",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.instalacionesSanitarias,
					onChange: (event) => setValue("instalacionesSanitarias", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "VUAT",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.vuat,
					onChange: (event) => setValue("vuat", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "FD",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.fd,
					onChange: (event) => setValue("fd", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: refFotos ?? fotos.ref,
				campos: CAMPOS_FOTO.vivienda
			})
		] })
	});
}
function ObrasComplementariasTab({ codigo }) {
	const { rows, agregar, baja, editar } = useLista("obras");
	const [open, setOpen] = useState(false);
	const [editando, setEditando] = useState(null);
	function addObra(row) {
		if (editando != null) editar(editando, row);
		else agregar(row);
		setOpen(false);
		setEditando(null);
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Listado de obras complementarias" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(AddButton, {
				onClick: () => {
					setEditando(null);
					setOpen(true);
				},
				etiqueta: "obra complementaria"
			})
		}),
		/* @__PURE__ */ jsx(ObrasComplementariasTable, {
			rows,
			onDelete: baja,
			onEdit: (i) => {
				setEditando(i);
				setOpen(true);
			}
		}),
		open && /* @__PURE__ */ jsx(AddObraComplementariaModal, {
			onClose: () => {
				setOpen(false);
				setEditando(null);
			},
			onAdd: addObra,
			inicial: editando != null ? rows[editando] : void 0,
			refFotos: editando != null ? refDeFila("Obras complementarias", rows[editando], editando) : void 0
		}, editando ?? "nuevo")
	] });
}
function ObrasComplementariasTable({ rows, onDelete, onEdit }) {
	const base = useBaseFotos("Obras complementarias");
	return /* @__PURE__ */ jsx(TablaFilas, {
		rows,
		onDelete,
		onEdit,
		etiqueta: "obra complementaria",
		columnas: [
			{
				clave: "tipo",
				titulo: "Tipo"
			},
			{
				clave: "longitud",
				titulo: "Longitud"
			},
			{
				clave: "altura",
				titulo: "Altura"
			},
			{
				clave: "metrado",
				titulo: "Metrado"
			},
			{
				clave: "unidad",
				titulo: "Unidad"
			},
			{
				clave: "uso",
				titulo: "Uso"
			},
			{
				clave: "caracteristicas",
				titulo: "Características técnicas"
			},
			{
				clave: "ubicacion",
				titulo: "Ubicación"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila("Obras complementarias", r, rows.indexOf(r)),
					campos: CAMPOS_FOTO.obra,
					titulo: `${r.tipo}`
				})
			}
		]
	});
}
function AddObraComplementariaModal({ onClose, onAdd, inicial, refFotos }) {
	const base = useBaseFotos("Obras complementarias");
	const fotos = useFotosDelRegistro(base, "obra");
	const [form, setForm] = useState(() => desdeFila({
		tipo: "",
		longitud: "",
		altura: "",
		ancho: "",
		espesor: "",
		metrado: "",
		unidad: "",
		uso: "",
		antiguedadAnos: "",
		material: "",
		estadoConservacion: "",
		estadoConstruccion: "",
		caracteristicas: "",
		ubicacion: "",
		vuoc: "",
		fd: ""
	}, inicial));
	const tipoOptions = [
		"ALMACEN",
		"ALTILLO",
		"AZOTEA",
		"BANO",
		"CANAL",
		"CERCO FRONTAL",
		"CERCO PERIMETRICO",
		"COBERTIZO",
		"COBERTURA",
		"COCHERA",
		"COLUMNA",
		"CRIANZA DE AVES",
		"CUBIERTA",
		"DEPOSITO",
		"ESCALERA",
		"HORNO",
		"LAVADERO",
		"LOSA",
		"MESADA",
		"MURO DE CONTENCION",
		"PARAPETO",
		"PARRILLA",
		"PASADIZO",
		"PATIO",
		"PIRCA",
		"PISO",
		"PORTICO",
		"PORTON",
		"POZA",
		"PROTECCION",
		"RAMAL",
		"RAMPA",
		"REJA",
		"RESERVORIO",
		"SARDINEL",
		"TANQUE ELEVADO",
		"TECHO",
		"TENDAL",
		"VEREDA"
	];
	const materialOptions = [
		"ACERO",
		"ADOBE",
		"ALUMINIO",
		"ALUZINC",
		"ASFALTO",
		"CALAMINA",
		"CALAMINA METALICA",
		"CALAMINA PLASTIFICADA",
		"CALAMINA TIPO ETERNIT",
		"COBRE",
		"CONCRETO",
		"DRYWALL",
		"FIBRA DE VIDRIO",
		"FIERRO",
		"FIERRO LISO",
		"GRANITO",
		"LADRILLO",
		"LONA",
		"LOSA"
	];
	function setValue(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function handleAdd() {
		fotos.confirmar();
		onAdd({
			formulario: form,
			fotoRef: refFotos ?? fotos.ref,
			tipo: form.tipo,
			longitud: form.longitud,
			altura: form.altura,
			metrado: form.metrado,
			unidad: form.unidad,
			uso: form.uso,
			caracteristicas: form.caracteristicas,
			ubicacion: form.ubicacion,
			foto: ""
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: inicial ? "Editar obra complementaria" : "Agregar obra complementaria",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleAdd,
			children: [
				/* @__PURE__ */ jsx(Plus, {}),
				" ",
				inicial ? "Guardar cambios" : "Agregar obra complementaria"
			]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.tipo,
					onChange: (event) => setValue("tipo", event.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), tipoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Longitud",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.longitud,
					onChange: (event) => setValue("longitud", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Altura",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.altura,
					onChange: (event) => setValue("altura", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Ancho",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.ancho,
					onChange: (event) => setValue("ancho", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Espesor",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.espesor,
					onChange: (event) => setValue("espesor", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Metrado",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.metrado,
					onChange: (event) => setValue("metrado", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Unidad (m, m², m³)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.unidad,
					onChange: (event) => setValue("unidad", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "m" }),
						/* @__PURE__ */ jsx("option", { children: "m2" }),
						/* @__PURE__ */ jsx("option", { children: "m3" }),
						/* @__PURE__ */ jsx("option", { children: "und" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Uso",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.uso,
					onChange: (event) => setValue("uso", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "DOMESTICO" }),
						/* @__PURE__ */ jsx("option", { children: "COMERCIAL" }),
						/* @__PURE__ */ jsx("option", { children: "AGRICOLA" }),
						/* @__PURE__ */ jsx("option", { children: "RURAL" }),
						/* @__PURE__ */ jsx("option", { children: "SIN USO" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Antigüedad (años)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.antiguedadAnos,
					onChange: (event) => setValue("antiguedadAnos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Material predominante",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.material,
					onChange: (event) => setValue("material", event.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), materialOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado de conservación",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.estadoConservacion,
					onChange: (event) => setValue("estadoConservacion", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "BUENO" }),
						/* @__PURE__ */ jsx("option", { children: "REGULAR" }),
						/* @__PURE__ */ jsx("option", { children: "MALO" }),
						/* @__PURE__ */ jsx("option", { children: "MUY BUENO" }),
						/* @__PURE__ */ jsx("option", { children: "MUY MALO" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado de construcción",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.estadoConstruccion,
					onChange: (event) => setValue("estadoConstruccion", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "TERMINADO" }),
						/* @__PURE__ */ jsx("option", { children: "INCONCLUSO" }),
						/* @__PURE__ */ jsx("option", { children: "EN CONSTRUCCION" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Características técnicas",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.caracteristicas,
					onChange: (event) => setValue("caracteristicas", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Ubicación",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.ubicacion,
					onChange: (event) => setValue("ubicacion", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "VUOC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.vuoc,
					onChange: (event) => setValue("vuoc", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "F.D.",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.fd,
					onChange: (event) => setValue("fd", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: refFotos ?? fotos.ref,
				campos: CAMPOS_FOTO.obra
			})
		] })
	});
}
function InstalacionesFijasPermanentesTab({ codigo }) {
	const { rows, agregar, baja, editar } = useLista("instalaciones");
	const [open, setOpen] = useState(false);
	const [editando, setEditando] = useState(null);
	function addInstalacion(row) {
		if (editando != null) editar(editando, row);
		else agregar(row);
		setOpen(false);
		setEditando(null);
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Listado de instalaciones fijas permanentes" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(AddButton, {
				onClick: () => {
					setEditando(null);
					setOpen(true);
				},
				etiqueta: "instalación fija permanente"
			})
		}),
		/* @__PURE__ */ jsx(InstalacionesFijasPermanentesTable, {
			rows,
			onDelete: baja,
			onEdit: (i) => {
				setEditando(i);
				setOpen(true);
			}
		}),
		open && /* @__PURE__ */ jsx(AddInstalacionFijaPermanenteModal, {
			onClose: () => {
				setOpen(false);
				setEditando(null);
			},
			onAdd: addInstalacion,
			inicial: editando != null ? rows[editando] : void 0,
			refFotos: editando != null ? refDeFila("Instalaciones fijas y permanentes", rows[editando], editando) : void 0
		}, editando ?? "nuevo")
	] });
}
function InstalacionesFijasPermanentesTable({ rows, onDelete, onEdit }) {
	const base = useBaseFotos("Instalaciones fijas y permanentes");
	return /* @__PURE__ */ jsx(TablaFilas, {
		rows,
		onDelete,
		onEdit,
		etiqueta: "instalación fija permanente",
		columnas: [
			{
				clave: "descripcion",
				titulo: "Descripción"
			},
			{
				clave: "areaMetrado",
				titulo: "Área o metrado (m²)"
			},
			{
				clave: "longitud",
				titulo: "Longitud (m)"
			},
			{
				clave: "ancho",
				titulo: "Ancho (m)"
			},
			{
				clave: "alturaProfundidad",
				titulo: "Altura o profundidad (m)"
			},
			{
				clave: "antiguedadAnos",
				titulo: "Antigüedad (años)"
			},
			{
				clave: "material",
				titulo: "Material"
			},
			{
				clave: "estadoConservacion",
				titulo: "Estado de conservación"
			},
			{
				clave: "estadoConstruccion",
				titulo: "Estado de construcción"
			},
			{
				clave: "vuif",
				titulo: "VUIF"
			},
			{
				clave: "fd",
				titulo: "FD"
			},
			{
				clave: "caracteristicas",
				titulo: "Características técnicas"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila("Instalaciones fijas y permanentes", r, rows.indexOf(r)),
					campos: CAMPOS_FOTO.instalacion,
					titulo: `${r.descripcion}`
				})
			}
		]
	});
}
function AddInstalacionFijaPermanenteModal({ onClose, onAdd, inicial, refFotos }) {
	const base = useBaseFotos("Instalaciones fijas y permanentes");
	const fotos = useFotosDelRegistro(base, "instalacion");
	const [form, setForm] = useState(() => desdeFila({
		descripcion: "",
		areaMetrado: "",
		longitud: "",
		ancho: "",
		alturaProfundidad: "",
		antiguedadAnos: "",
		material: "",
		estadoConservacion: "",
		estadoConstruccion: "",
		vuif: "",
		fd: "",
		caracteristicas: ""
	}, inicial));
	const materialOptions = [
		"ACERO",
		"ADOBE",
		"ALUMINIO",
		"ALUZINC",
		"ASFALTO",
		"CALAMINA",
		"CALAMINA METALICA",
		"CALAMINA PLASTIFICADA",
		"CALAMINA TIPO ETERNIT",
		"COBRE",
		"CONCRETO",
		"DRYWALL",
		"FIBRA DE VIDRIO",
		"FIERRO",
		"FIERRO LISO",
		"GRANITO",
		"LADRILLO",
		"LONA",
		"LOSA"
	];
	function setValue(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function handleAdd() {
		fotos.confirmar();
		onAdd({
			formulario: form,
			fotoRef: refFotos ?? fotos.ref,
			descripcion: form.descripcion,
			areaMetrado: form.areaMetrado,
			longitud: form.longitud,
			ancho: form.ancho,
			alturaProfundidad: form.alturaProfundidad,
			antiguedadAnos: form.antiguedadAnos,
			material: form.material,
			estadoConservacion: form.estadoConservacion,
			estadoConstruccion: form.estadoConstruccion,
			vuif: form.vuif,
			fd: form.fd,
			caracteristicas: form.caracteristicas,
			foto: ""
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: inicial ? "Editar instalación fija permanente" : "Agregar instalación fija permanente",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleAdd,
			children: [
				/* @__PURE__ */ jsx(Plus, {}),
				" ",
				inicial ? "Guardar cambios" : "Agregar instalación fija permanente"
			]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.descripcion,
					onChange: (event) => setValue("descripcion", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Área o metrado (m²)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.areaMetrado,
					onChange: (event) => setValue("areaMetrado", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Longitud (m)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.longitud,
					onChange: (event) => setValue("longitud", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Ancho (m)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.ancho,
					onChange: (event) => setValue("ancho", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Altura o profundidad (m)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.alturaProfundidad,
					onChange: (event) => setValue("alturaProfundidad", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Antigüedad en años",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.antiguedadAnos,
					onChange: (event) => setValue("antiguedadAnos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Material predominante",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.material,
					onChange: (event) => setValue("material", event.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), materialOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado de conservación",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.estadoConservacion,
					onChange: (event) => setValue("estadoConservacion", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "BUENO" }),
						/* @__PURE__ */ jsx("option", { children: "REGULAR" }),
						/* @__PURE__ */ jsx("option", { children: "MALO" }),
						/* @__PURE__ */ jsx("option", { children: "MUY BUENO" }),
						/* @__PURE__ */ jsx("option", { children: "MUY MALO" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado de construcción",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.estadoConstruccion,
					onChange: (event) => setValue("estadoConstruccion", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Seleccione"
						}),
						/* @__PURE__ */ jsx("option", { children: "TERMINADO" }),
						/* @__PURE__ */ jsx("option", { children: "INCONCLUSO" }),
						/* @__PURE__ */ jsx("option", { children: "EN CONSTRUCCION" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "VUIF",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.vuif,
					onChange: (event) => setValue("vuif", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "FD",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.fd,
					onChange: (event) => setValue("fd", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: refFotos ?? fotos.ref,
				campos: CAMPOS_FOTO.instalacion
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Características técnicas",
				obligatorio: true,
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					className: `${controlClase} h-auto py-2`,
					rows: 3,
					value: form.caracteristicas,
					onChange: (event) => setValue("caracteristicas", event.target.value)
				})
			})
		] })
	});
}
var PLANTACION_FRUTAL_OPTIONS = [
	"ALFALFA",
	"CAPULI",
	"CHIRIMOYA",
	"DURAZNO",
	"GRANADILLA",
	"LIMON",
	"LUCUMA",
	"MANDARINA",
	"MANZANA",
	"MARACUYA",
	"MEMBRILLO",
	"MORA",
	"NARANJA",
	"NISPERO",
	"PACAY",
	"PALTA",
	"PAPAYA",
	"PLATANO",
	"SABILA"
];
function PlantacionesFrutalesTab({ codigo }) {
	const { rows, agregar, baja, editar } = useLista("frutales");
	const [open, setOpen] = useState(false);
	const [editando, setEditando] = useState(null);
	function addPlantacion(row) {
		if (editando != null) editar(editando, row);
		else agregar(row);
		setOpen(false);
		setEditando(null);
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Listado de plantaciones frutales" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(AddButton, {
				onClick: () => {
					setEditando(null);
					setOpen(true);
				},
				etiqueta: "plantación frutal"
			})
		}),
		/* @__PURE__ */ jsx(PlantacionesFrutalesTable, {
			rows,
			onDelete: baja,
			onEdit: (i) => {
				setEditando(i);
				setOpen(true);
			}
		}),
		open && /* @__PURE__ */ jsx(AddPlantacionFrutalModal, {
			onClose: () => {
				setOpen(false);
				setEditando(null);
			},
			onAdd: addPlantacion,
			inicial: editando != null ? rows[editando] : void 0,
			refFotos: editando != null ? refDeFila("Plantaciones frutales", rows[editando], editando) : void 0
		}, editando ?? "nuevo")
	] });
}
function PlantacionesFrutalesTable({ rows, onDelete, onEdit }) {
	const base = useBaseFotos("Plantaciones frutales");
	return /* @__PURE__ */ jsx(TablaFilas, {
		rows,
		onDelete,
		onEdit,
		etiqueta: "plantación frutal",
		columnas: [
			{
				clave: "nombreComun",
				titulo: "Nombre común"
			},
			{
				clave: "nombreCientifico",
				titulo: "Nombre científico"
			},
			{
				clave: "variedad",
				titulo: "Variedad"
			},
			{
				clave: "edadAnos",
				titulo: "Edad (años)"
			},
			{
				clave: "cantidad",
				titulo: "Cantidad"
			},
			{
				clave: "utilidad",
				titulo: "Utilidad"
			},
			{
				clave: "vupp",
				titulo: "VUPP"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila("Plantaciones frutales", r, rows.indexOf(r)),
					campos: CAMPOS_FOTO.plantacion,
					titulo: `${r.nombreComun}`
				})
			}
		]
	});
}
function AddPlantacionFrutalModal({ onClose, onAdd, inicial, refFotos }) {
	const base = useBaseFotos("Plantaciones frutales");
	const fotos = useFotosDelRegistro(base, "plantacion");
	const [form, setForm] = useState(() => desdeFila({
		nombreComun: "",
		nombreCientifico: "",
		variedad: "",
		edadAnos: "",
		unidadMedida: "UND",
		cantidad: "",
		utilidad: "",
		vupp: "",
		observacion: "",
		foto: ""
	}, inicial));
	function setValue(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function handleAdd() {
		fotos.confirmar();
		onAdd({
			formulario: form,
			fotoRef: refFotos ?? fotos.ref,
			nombreComun: form.nombreComun,
			nombreCientifico: form.nombreCientifico,
			variedad: form.variedad,
			edadAnos: form.edadAnos,
			unidadMedida: form.unidadMedida,
			cantidad: form.cantidad,
			utilidad: form.utilidad,
			vupp: form.vupp,
			observacion: form.observacion,
			foto: form.foto
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: inicial ? "Editar plantación frutal" : "Agregar plantación frutal",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleAdd,
			children: [
				/* @__PURE__ */ jsx(Plus, {}),
				" ",
				inicial ? "Guardar cambios" : "Agregar plantación frutal"
			]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre común",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.nombreComun,
					onChange: (event) => setValue("nombreComun", event.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), PLANTACION_FRUTAL_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre científico",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.nombreCientifico,
					onChange: (event) => setValue("nombreCientifico", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Variedad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.variedad,
					onChange: (event) => setValue("variedad", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Edad (años)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.edadAnos,
					onChange: (event) => setValue("edadAnos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Unidad de medida",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: `${controlClase} bg-muted`,
					value: form.unidadMedida,
					onChange: (event) => setValue("unidadMedida", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Cantidad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.cantidad,
					onChange: (event) => setValue("cantidad", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Utilidad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.utilidad,
					onChange: (event) => setValue("utilidad", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "VUPP",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.vupp,
					onChange: (event) => setValue("vupp", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.observacion,
					onChange: (event) => setValue("observacion", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: refFotos ?? fotos.ref,
				campos: CAMPOS_FOTO.plantacion
			})
		] })
	});
}
var PLANTACION_FORESTAL_OPTIONS = [
	"ALCANFOR",
	"ALISOS",
	"CABUYA",
	"CABUYA BLANCA",
	"CIPRES",
	"COLIFLOR",
	"EUCALIPTO",
	"HUARANGO",
	"JASSI",
	"LECHUGA",
	"MOLLE",
	"PATI",
	"PINO",
	"TARA"
];
function PlantacionesForestalesTab({ codigo }) {
	const { rows, agregar, baja, editar } = useLista("forestales");
	const [open, setOpen] = useState(false);
	const [editando, setEditando] = useState(null);
	function addPlantacion(row) {
		if (editando != null) editar(editando, row);
		else agregar(row);
		setOpen(false);
		setEditando(null);
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Listado de plantaciones forestales" }),
		/* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(AddButton, {
				onClick: () => {
					setEditando(null);
					setOpen(true);
				},
				etiqueta: "plantación forestal"
			})
		}),
		/* @__PURE__ */ jsx(PlantacionesForestalesTable, {
			rows,
			onDelete: baja,
			onEdit: (i) => {
				setEditando(i);
				setOpen(true);
			}
		}),
		open && /* @__PURE__ */ jsx(AddPlantacionForestalModal, {
			onClose: () => {
				setOpen(false);
				setEditando(null);
			},
			onAdd: addPlantacion,
			inicial: editando != null ? rows[editando] : void 0,
			refFotos: editando != null ? refDeFila("Plantaciones forestales", rows[editando], editando) : void 0
		}, editando ?? "nuevo")
	] });
}
function PlantacionesForestalesTable({ rows, onDelete, onEdit }) {
	const base = useBaseFotos("Plantaciones forestales");
	return /* @__PURE__ */ jsx(TablaFilas, {
		rows,
		onDelete,
		onEdit,
		etiqueta: "plantación forestal",
		columnas: [
			{
				clave: "nombreComun",
				titulo: "Nombre común"
			},
			{
				clave: "nombreCientifico",
				titulo: "Nombre científico"
			},
			{
				clave: "edadAnos",
				titulo: "Edad (años)"
			},
			{
				clave: "diametro",
				titulo: "Diámetro (m)"
			},
			{
				clave: "alturaTotal",
				titulo: "Altura total (m)"
			},
			{
				clave: "numeroPlantas",
				titulo: "N.° de plantas"
			},
			{
				clave: "utilidad",
				titulo: "Utilidad"
			},
			{
				clave: "vupp",
				titulo: "VUPP"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila("Plantaciones forestales", r, rows.indexOf(r)),
					campos: CAMPOS_FOTO.plantacion,
					titulo: `${r.nombreComun}`
				})
			}
		]
	});
}
function AddPlantacionForestalModal({ onClose, onAdd, inicial, refFotos }) {
	const base = useBaseFotos("Plantaciones forestales");
	const fotos = useFotosDelRegistro(base, "plantacion");
	const [form, setForm] = useState(() => desdeFila({
		nombreComun: "",
		nombreCientifico: "",
		edadAnos: "",
		diametro: "",
		alturaTotal: "",
		numeroPlantas: "",
		utilidad: "",
		vupp: "",
		observacion: "",
		foto: ""
	}, inicial));
	function setValue(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function handleAdd() {
		fotos.confirmar();
		onAdd({
			formulario: form,
			fotoRef: refFotos ?? fotos.ref,
			nombreComun: form.nombreComun,
			nombreCientifico: form.nombreCientifico,
			edadAnos: form.edadAnos,
			diametro: form.diametro,
			alturaTotal: form.alturaTotal,
			numeroPlantas: form.numeroPlantas,
			utilidad: form.utilidad,
			vupp: form.vupp,
			observacion: form.observacion,
			foto: form.foto
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: inicial ? "Editar plantación forestal" : "Agregar plantación forestal",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleAdd,
			children: [
				/* @__PURE__ */ jsx(Plus, {}),
				" ",
				inicial ? "Guardar cambios" : "Agregar plantación forestal"
			]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre común",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.nombreComun,
					onChange: (event) => setValue("nombreComun", event.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), PLANTACION_FORESTAL_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre científico",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.nombreCientifico,
					onChange: (event) => setValue("nombreCientifico", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Edad (años)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.edadAnos,
					onChange: (event) => setValue("edadAnos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Diámetro (m)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.diametro,
					onChange: (event) => setValue("diametro", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Altura total (m)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.alturaTotal,
					onChange: (event) => setValue("alturaTotal", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "N.° de plantas",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.numeroPlantas,
					onChange: (event) => setValue("numeroPlantas", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Utilidad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.utilidad,
					onChange: (event) => setValue("utilidad", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "VUPP",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.vupp,
					onChange: (event) => setValue("vupp", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.observacion,
					onChange: (event) => setValue("observacion", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: refFotos ?? fotos.ref,
				campos: CAMPOS_FOTO.plantacion
			})
		] })
	});
}
var PLANTACION_TRANSITORIA_OPTIONS = [
	"CANA DE AZUCAR",
	"CEBADA",
	"CEBOLLA",
	"COL",
	"HABA",
	"MAIZ",
	"OCA",
	"PAPA",
	"TARA",
	"TRIGO",
	"ZAPALLO"
];
function PlantacionesTransitoriasTab({ codigo }) {
	const { rows, agregar, baja, editar } = useLista("transitorias");
	const [open, setOpen] = useState(false);
	const [editando, setEditando] = useState(null);
	function addPlantacion(row) {
		if (editando != null) editar(editando, row);
		else agregar(row);
		setOpen(false);
		setEditando(null);
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Listado de plantaciones transitorias" }),
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-warning",
			children: "Datos de demostración"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(AddButton, {
				onClick: () => {
					setEditando(null);
					setOpen(true);
				},
				etiqueta: "plantación transitoria"
			})
		}),
		/* @__PURE__ */ jsx(PlantacionesTransitoriasTable, {
			rows,
			onDelete: baja,
			onEdit: (i) => {
				setEditando(i);
				setOpen(true);
			}
		}),
		open && /* @__PURE__ */ jsx(AddPlantacionTransitoriaModal, {
			onClose: () => {
				setOpen(false);
				setEditando(null);
			},
			onAdd: addPlantacion,
			inicial: editando != null ? rows[editando] : void 0,
			refFotos: editando != null ? refDeFila("Plantaciones transitorias", rows[editando], editando) : void 0
		}, editando ?? "nuevo")
	] });
}
function PlantacionesTransitoriasTable({ rows, onDelete, onEdit }) {
	const base = useBaseFotos("Plantaciones transitorias");
	return /* @__PURE__ */ jsx(TablaFilas, {
		rows,
		onDelete,
		onEdit,
		etiqueta: "plantación transitoria",
		columnas: [
			{
				clave: "nombreComun",
				titulo: "Nombre común"
			},
			{
				clave: "nombreCientifico",
				titulo: "Nombre científico"
			},
			{
				clave: "variedad",
				titulo: "Variedad"
			},
			{
				clave: "edadAnos",
				titulo: "Edad (años)"
			},
			{
				clave: "unidadMedida",
				titulo: "Unidad de medida"
			},
			{
				clave: "cantidad",
				titulo: "Cantidad"
			},
			{
				clave: "utilidad",
				titulo: "Utilidad"
			},
			{
				clave: "vupt",
				titulo: "VUPT"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila("Plantaciones transitorias", r, rows.indexOf(r)),
					campos: CAMPOS_FOTO.plantacion,
					titulo: `${r.nombreComun}`
				})
			}
		]
	});
}
function AddPlantacionTransitoriaModal({ onClose, onAdd, inicial, refFotos }) {
	const base = useBaseFotos("Plantaciones transitorias");
	const fotos = useFotosDelRegistro(base, "plantacion");
	const [form, setForm] = useState(() => desdeFila({
		nombreComun: "",
		nombreCientifico: "",
		variedad: "",
		edadAnos: "",
		unidadMedida: "",
		cantidad: "",
		utilidad: "",
		vupt: "",
		observacion: "",
		foto: ""
	}, inicial));
	function setValue(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function handleAdd() {
		fotos.confirmar();
		onAdd({
			formulario: form,
			fotoRef: refFotos ?? fotos.ref,
			nombreComun: form.nombreComun,
			nombreCientifico: form.nombreCientifico,
			variedad: form.variedad,
			edadAnos: form.edadAnos,
			unidadMedida: form.unidadMedida,
			cantidad: form.cantidad,
			utilidad: form.utilidad,
			vupt: form.vupt,
			observacion: form.observacion,
			foto: form.foto
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: inicial ? "Editar plantación transitoria" : "Agregar plantación transitoria",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleAdd,
			children: [
				/* @__PURE__ */ jsx(Plus, {}),
				" ",
				inicial ? "Guardar cambios" : "Agregar plantación transitoria"
			]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre común",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.nombreComun,
					onChange: (event) => setValue("nombreComun", event.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), PLANTACION_TRANSITORIA_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre científico",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.nombreCientifico,
					onChange: (event) => setValue("nombreCientifico", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Variedad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.variedad,
					onChange: (event) => setValue("variedad", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Edad (años)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.edadAnos,
					onChange: (event) => setValue("edadAnos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Unidad de medida",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.unidadMedida,
					onChange: (event) => setValue("unidadMedida", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Cantidad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.cantidad,
					onChange: (event) => setValue("cantidad", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Utilidad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.utilidad,
					onChange: (event) => setValue("utilidad", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "VUPT",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.vupt,
					onChange: (event) => setValue("vupt", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observación",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.observacion,
					onChange: (event) => setValue("observacion", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: refFotos ?? fotos.ref,
				campos: CAMPOS_FOTO.plantacion
			})
		] })
	});
}
var CERCO_VIVO_OPTIONS = [
	"ALCANFOR",
	"ALFALFA",
	"ALISOS",
	"CABUYA",
	"CABUYA BLANCA",
	"CANA DE AZUCAR",
	"CAPULI",
	"CEBADA",
	"CEBOLLA",
	"CHIRIMOYA",
	"CIPRES",
	"COL",
	"COLIFLOR",
	"DURAZNO",
	"EUCALIPTO",
	"GRANADILLA",
	"HABA",
	"HUARANGO",
	"JASSI",
	"LIMON",
	"MOLLE",
	"PINO",
	"TARA"
];
function CercoVivoTab() {
	const { rows, agregar, baja, editar } = useLista("cercoVivo");
	const [open, setOpen] = useState(false);
	const [editando, setEditando] = useState(null);
	function addCerco(row) {
		if (editando != null) editar(editando, row);
		else agregar(row);
		setOpen(false);
		setEditando(null);
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Listado de cerco vivo" }),
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-warning",
			children: "Datos de demostración"
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mb-3",
			children: /* @__PURE__ */ jsx(AddButton, {
				onClick: () => {
					setEditando(null);
					setOpen(true);
				},
				etiqueta: "cerco vivo"
			})
		}),
		/* @__PURE__ */ jsx(CercoVivoTable, {
			rows,
			onDelete: baja,
			onEdit: (i) => {
				setEditando(i);
				setOpen(true);
			}
		}),
		open && /* @__PURE__ */ jsx(AddCercoVivoModal, {
			onClose: () => {
				setOpen(false);
				setEditando(null);
			},
			onAdd: addCerco,
			inicial: editando != null ? rows[editando] : void 0,
			refFotos: editando != null ? refDeFila("Cerco vivo", rows[editando], editando) : void 0
		}, editando ?? "nuevo")
	] });
}
function CercoVivoTable({ rows, onDelete, onEdit }) {
	const base = useBaseFotos("Cerco vivo");
	return /* @__PURE__ */ jsx(TablaFilas, {
		rows,
		onDelete,
		onEdit,
		etiqueta: "cerco vivo",
		columnas: [
			{
				clave: "nombreCientifico",
				titulo: "Nombre científico"
			},
			{
				clave: "nombreComun",
				titulo: "Nombre común"
			},
			{
				clave: "edadAnos",
				titulo: "Edad (años)"
			},
			{
				clave: "longitudCerco",
				titulo: "Longitud de cerco (m)"
			},
			{
				clave: "distanciamientoPlantas",
				titulo: "Distanciamiento entre plantas (m)"
			},
			{
				clave: "estadoFitosanitario",
				titulo: "Estado fitosanitario"
			},
			{
				clave: "observaciones",
				titulo: "Observaciones"
			},
			{
				clave: "fotoRef",
				titulo: "Fotos",
				render: (r) => /* @__PURE__ */ jsx(BotonFotosDeFila, {
					base,
					registro: refDeFila("Cerco vivo", r, rows.indexOf(r)),
					campos: CAMPOS_FOTO.cerco,
					titulo: `${r.nombreComun}`
				})
			}
		]
	});
}
function AddCercoVivoModal({ onClose, onAdd, inicial, refFotos }) {
	const base = useBaseFotos("Cerco vivo");
	const fotos = useFotosDelRegistro(base, "cerco");
	const [form, setForm] = useState(() => desdeFila({
		nombreComun: "",
		nombreCientifico: "",
		edadAnos: "",
		longitudCerco: "",
		distanciamientoPlantas: "",
		estadoFitosanitario: "BUENO",
		observaciones: "",
		foto: ""
	}, inicial));
	function setValue(key, value) {
		setForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function handleAdd() {
		fotos.confirmar();
		onAdd({
			formulario: form,
			fotoRef: refFotos ?? fotos.ref,
			nombreCientifico: form.nombreCientifico,
			nombreComun: form.nombreComun,
			edadAnos: form.edadAnos,
			longitudCerco: form.longitudCerco,
			distanciamientoPlantas: form.distanciamientoPlantas,
			estadoFitosanitario: form.estadoFitosanitario,
			observaciones: form.observaciones,
			foto: form.foto
		});
	}
	return /* @__PURE__ */ jsx(Modal, {
		ancho: "xl",
		abierto: true,
		onCerrar: onClose,
		titulo: inicial ? "Editar cerco vivo" : "Agregar cerco vivo",
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			onClick: onClose,
			children: [/* @__PURE__ */ jsx(X, {}), " Cerrar"]
		}), /* @__PURE__ */ jsxs(Button, {
			type: "button",
			onClick: handleAdd,
			children: [
				/* @__PURE__ */ jsx(Plus, {}),
				" ",
				inicial ? "Guardar cambios" : "Agregar cerco vivo"
			]
		})] }),
		children: /* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre común",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.nombreComun,
					onChange: (event) => setValue("nombreComun", event.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Seleccione"
					}), CERCO_VIVO_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Nombre científico",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.nombreCientifico,
					onChange: (event) => setValue("nombreCientifico", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Edad",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.edadAnos,
					onChange: (event) => setValue("edadAnos", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Longitud de cerco (m)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.longitudCerco,
					onChange: (event) => setValue("longitudCerco", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Distanciamiento entre plantas (m)",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.distanciamientoPlantas,
					onChange: (event) => setValue("distanciamientoPlantas", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado fitosanitario",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: form.estadoFitosanitario,
					onChange: (event) => setValue("estadoFitosanitario", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", { children: "BUENO" }),
						/* @__PURE__ */ jsx("option", { children: "REGULAR" }),
						/* @__PURE__ */ jsx("option", { children: "MALO" })
					]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observaciones",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					value: form.observaciones,
					onChange: (event) => setValue("observaciones", event.target.value)
				})
			}),
			/* @__PURE__ */ jsx(FotosDelRegistro, {
				base,
				registro: refFotos ?? fotos.ref,
				campos: CAMPOS_FOTO.cerco
			})
		] })
	});
}
var TIPO_AFECTACION_OPTIONS = [
	{
		key: "A",
		text: "EL INMUEBLE QUEDA INHABITABLE O INOPERATIVO E IMPIDE AL SUJETO PASIVO REALIZAR SUS ACTIVIDADES"
	},
	{
		key: "B",
		text: "EXISTE PÉRDIDA DE FUNCIONALIDAD U OPERATIVIDAD PARCIAL DEL INMUEBLE Y SE REQUIERA EL ACONDICIONAMIENTO DEL ÁREA REMANENTE QUE PERMITA CONTINUAR CON SUS ACTIVIDADES"
	},
	{
		key: "C",
		text: "EN CASO SE AFECTE LA OPERATIVIDAD DE LAS ACTIVIDADES ECONÓMICAS, DE ACUERDO A LO SEÑALADO EN LOS LITERALES A) Y B), PRECEDENTES, EL DAÑO EMERGENTE DEBE CONSIDERAR, DE CORRESPONDER, PRECISADO EN EL NUMERAL 1."
	},
	{
		key: "D",
		text: "TRASLADO DE BIENES MUEBLES, SE DEBE CUANTIFICAR EL NÚMERO DE VIAJES Y VOLUMEN DE CARGA NECESARIOS"
	},
	{
		key: "E",
		text: "IDENTIFICACIÓN DEL INMUEBLE DEFINITIVO O EL ALQUILER TEMPORAL"
	},
	{
		key: "F",
		text: "CUANDO SE AFECTA INFRAESTRUCTURA E INSTALACIONES PRODUCTIVAS QUE SIRVEN A OTRA ÁREA, DISTINTA AL ÁREA A ADQUIRIR O EXPROPIAR Y GENERE LA INTERRUPCIÓN TEMPORAL DE ALGUNA ACTIVIDAD PRODUCTIVA, CORRESPONDE CONSIDERAR LA RESTITUCIÓN DE LA INFRAESTRUCTURA AFECTADA Y LAS ADECUACIONES NECESARIAS PARA LA CONTINUIDAD DE DICHA ACTIVIDAD."
	},
	{
		key: "G",
		text: "PENALIDADES POR INCUMPLIMIENTO DE OBLIGACIONES CON TERCEROS, A CONSECUENCIA DE LA ADQUISICIÓN Y EXPROPIACIÓN DEL INMUEBLE"
	},
	{
		key: "H",
		text: "OTROS CASOS DEBIDAMENTE SUSTENTADOS QUE IDENTIFIQUE EL SUJETO ACTIVO"
	}
];
var NUMERAL_UNO_OPTIONS = [
	"TRASLADO DE ENSERES Y DEMÁS BIENES DEL NEGOCIO SEGÚN CORRESPONDA.",
	"ACONDICIONAMIENTO DEL NUEVO INMUEBLE.",
	"VALOR DE LAS INSTALACIONES NO SUSCEPTIBLES DE TRASLADO Y GASTOS DE SUSTITUCIÓN.",
	"GASTOS ADMINISTRATIVOS Y OPERATIVOS DESDE LA PARALIZACIÓN HASTA LA INSTALACIÓN Y PUESTA EN MARCHA.",
	"INDEMNIZACIONES LABORALES.",
	"PÉRDIDA DE BENEFICIOS."
];
function DanoEmergenteTab({ codigo }) {
	const { dano, setDano } = useCaracterizacion();
	const { correspondencia, identificacion, tipoAfectacion, numeralUno } = dano;
	const setCorrespondencia = (f) => setDano((d) => ({
		...d,
		correspondencia: f(d.correspondencia)
	}));
	const setIdentificacion = (f) => setDano((d) => ({
		...d,
		identificacion: f(d.identificacion)
	}));
	const setTipoAfectacion = (f) => setDano((d) => ({
		...d,
		tipoAfectacion: f(d.tipoAfectacion)
	}));
	const setNumeralUno = (f) => setDano((d) => ({
		...d,
		numeralUno: f(d.numeralUno)
	}));
	function setCorrespondenciaValue(key, value) {
		setCorrespondencia((current) => ({
			...current,
			[key]: value
		}));
	}
	function setIdentificacionValue(key, value) {
		setIdentificacion((current) => ({
			...current,
			[key]: value
		}));
	}
	function toggleNumeral(index) {
		setNumeralUno((current) => ({
			...current,
			[index]: !current[index]
		}));
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("p", {
			className: "mb-2 text-xs text-warning",
			children: "Formulario no guardado"
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código del predio",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: codigo
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Código de expediente",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase,
				defaultValue: "3546-2023-MTC/DDP"
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "10. Descripción de perjuicio económico" }),
		/* @__PURE__ */ jsx("div", {
			className: "ml-4 max-w-160 overflow-hidden rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
					className: "px-3 py-2 text-center font-semibold",
					children: "COMPONENTE"
				}), /* @__PURE__ */ jsx("th", {
					className: "px-3 py-2 text-center font-semibold",
					children: "CORRESPONDENCIA"
				})] }) }), /* @__PURE__ */ jsx("tbody", { children: [["DAÑO EMERGENTE", "danoEmergente"], ["LUCRO CESANTE", "lucroCesante"]].map(([label, key]) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", {
					className: "border-t border-border px-3 py-2 text-center font-semibold text-muted-foreground",
					children: label
				}), /* @__PURE__ */ jsx("td", {
					className: "border-l border-t border-border px-2 py-1.5",
					children: /* @__PURE__ */ jsxs("select", {
						className: controlClase,
						value: correspondencia[key],
						onChange: (event) => setCorrespondenciaValue(key, event.target.value),
						children: [
							/* @__PURE__ */ jsx("option", { children: "Seleccione" }),
							/* @__PURE__ */ jsx("option", { children: "SI" }),
							/* @__PURE__ */ jsx("option", { children: "NO" })
						]
					})
				})] }, key)) })]
			})
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "10.1 Daño emergente" }),
		/* @__PURE__ */ jsx("p", {
			className: "mb-3 rounded-md bg-primary-soft px-3 py-2 text-sm font-semibold text-primary-dark",
			children: "10.1.1 Identificación"
		}),
		/* @__PURE__ */ jsxs(FormGrid, {
			columnas: 1,
			children: [/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Forma de afectación",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: identificacion.formaAfectacion,
					onChange: (event) => setIdentificacionValue("formaAfectacion", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", { children: "Seleccione" }),
						/* @__PURE__ */ jsx("option", { children: "PARCIAL" }),
						/* @__PURE__ */ jsx("option", { children: "TOTAL" })
					]
				})
			}), /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Condición del predio",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					value: identificacion.condicionPredio,
					onChange: (event) => setIdentificacionValue("condicionPredio", event.target.value),
					children: [
						/* @__PURE__ */ jsx("option", { children: "Seleccione" }),
						/* @__PURE__ */ jsx("option", { children: "INHABITABLE" }),
						/* @__PURE__ */ jsx("option", { children: "HABITABLE" }),
						/* @__PURE__ */ jsx("option", { children: "INOPERATIVO" }),
						/* @__PURE__ */ jsx("option", { children: "OPERATIVO PARCIAL" })
					]
				})
			})]
		}),
		/* @__PURE__ */ jsx(FormGrid, {
			columnas: 1,
			children: /* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción del daño emergente",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					className: `${controlClase} h-auto py-2`,
					rows: 3,
					value: identificacion.descripcion,
					onChange: (event) => setIdentificacionValue("descripcion", event.target.value)
				})
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-245 text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
					className: "px-2 py-2 text-center font-semibold",
					colSpan: 2,
					children: "TIPO DE AFECTACIÓN"
				}), /* @__PURE__ */ jsx("th", {
					className: "w-42.5 px-2 py-2 text-center font-semibold",
					children: "CORRESPONDENCIA"
				})] }) }), /* @__PURE__ */ jsx("tbody", { children: TIPO_AFECTACION_OPTIONS.map((row) => /* @__PURE__ */ jsxs("tr", {
					className: "align-top",
					children: [
						/* @__PURE__ */ jsxs("td", {
							className: "w-8 border-t border-border px-2 py-2 font-semibold text-muted-foreground",
							children: [row.key, ")"]
						}),
						/* @__PURE__ */ jsx("td", {
							className: "border-t border-border px-2 py-2 text-muted-foreground",
							children: row.text
						}),
						/* @__PURE__ */ jsx("td", {
							className: "border-l border-t border-border px-2 py-2",
							children: /* @__PURE__ */ jsx("div", {
								className: "flex justify-center gap-5",
								children: ["SI", "NO"].map((value) => /* @__PURE__ */ jsxs("label", {
									className: "inline-flex items-center gap-1 text-sm text-foreground",
									children: [/* @__PURE__ */ jsx("input", {
										type: "radio",
										name: `tipo-afectacion-${row.key}`,
										value,
										checked: tipoAfectacion[row.key] === value,
										onChange: () => setTipoAfectacion((current) => ({
											...current,
											[row.key]: value
										})),
										className: "accent-primary"
									}), value === "SI" ? "Sí" : "No"]
								}, value))
							})
						})
					]
				}, row.key)) })]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-4 max-w-205 overflow-hidden rounded-md border border-border",
			children: /* @__PURE__ */ jsx("table", {
				className: "w-full text-sm",
				children: /* @__PURE__ */ jsxs("tbody", { children: [/* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("td", {
						className: "w-24 bg-primary-soft text-center font-semibold text-primary-dark",
						rowSpan: NUMERAL_UNO_OPTIONS.length + 1,
						children: "NUMERAL 1."
					}),
					/* @__PURE__ */ jsx("td", {
						className: "bg-primary-soft px-2 py-2 font-semibold text-primary-dark",
						children: "DESMONTAJE Y MONTAJE DE MOBILIARIO, EQUIPOS Y MAQUINARIAS."
					}),
					/* @__PURE__ */ jsx("td", {
						className: "w-10 bg-primary-soft px-2 py-2 text-center",
						children: /* @__PURE__ */ jsx("input", {
							type: "checkbox",
							className: "accent-primary",
							checked: !!numeralUno[-1],
							onChange: () => toggleNumeral(-1)
						})
					})
				] }), NUMERAL_UNO_OPTIONS.map((option, index) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", {
					className: "border-t border-border px-2 py-1.5 text-muted-foreground",
					children: option
				}), /* @__PURE__ */ jsx("td", {
					className: "border-l border-t border-border px-2 py-1.5 text-center",
					children: /* @__PURE__ */ jsx("input", {
						type: "checkbox",
						className: "accent-primary",
						checked: !!numeralUno[index],
						onChange: () => toggleNumeral(index)
					})
				})] }, option))] })
			})
		})
	] });
}
function DescripcionEntornoTab() {
	const yesNoOptions = ["SI", "NO"];
	const fuenteOptions = [
		"Seleccione",
		"RED PÚBLICA",
		"POZO",
		"CISTERNA",
		"RÍO O QUEBRADA",
		"OTRO"
	];
	const tipoSistemaOptions = [
		"CONDOMINIAL",
		"CONVENCIONAL",
		"LETRINA",
		"POZO SÉPTICO",
		"NINGUNO"
	];
	const claseViaOptions = [
		"VÍA EXPRESA",
		"ARTERIAL",
		"COLECTORA",
		"LOCAL",
		"TROCHA",
		"CAMINO VECINAL"
	];
	const materialViaOptions = [
		"AFIRMADO",
		"ASFALTO",
		"CONCRETO",
		"TROCHA",
		"TIERRA",
		"ADOQUÍN"
	];
	const pendienteOptions = [
		"DE 0 A 5%",
		"DE 6 A 10%",
		"DE 11 A 20%",
		"DE 21 A 30%",
		"MAYOR A 30%"
	];
	const { entorno } = useCaracterizacion();
	return /* @__PURE__ */ jsxs("div", { children: [
		entorno && /* @__PURE__ */ jsxs("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ jsx(Subtitulo, { children: "Registrado en campo" }), /* @__PURE__ */ jsx("dl", {
				className: "grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[max-content_1fr]",
				children: [
					["Acceso", entorno.acceso],
					["Agua · luz · desagüe", [
						entorno.agua,
						entorno.luz,
						entorno.desague
					].map((x) => x || "—").join(" · ")],
					["Vía", [entorno.claseVia, entorno.materialVia].filter(Boolean).join(" · ")],
					["Uso del entorno", entorno.usoEntorno],
					["Observaciones", entorno.observaciones],
					["Registrado", `${fechaHora(entorno.registradoEl)} · ${entorno.registradoPor}`]
				].filter(([, v]) => v).map(([k, v]) => /* @__PURE__ */ jsxs("div", {
					className: "contents",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "font-semibold text-foreground",
						children: k
					}), /* @__PURE__ */ jsx("dd", {
						className: "text-foreground",
						children: v
					})]
				}, k))
			})]
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Sistema de Agua Potable" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de red",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4 text-sm text-foreground",
					children: [/* @__PURE__ */ jsxs("label", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							className: "accent-primary"
						}), " Pública"]
					}), /* @__PURE__ */ jsxs("label", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							className: "accent-primary"
						}), " Domiciliaria"]
					})]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fuente",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "Seleccione",
					children: fuenteOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Administrado por organismo regulador",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "NO",
					children: yesNoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Abastecimiento óptimo",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "NO",
					children: yesNoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Calidad del agua potable",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "SI",
					children: yesNoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observaciones",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					className: `${controlClase} h-auto py-2`,
					rows: 3
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Sistema de Alcantarillado" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Red",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4 text-sm text-foreground",
					children: [/* @__PURE__ */ jsxs("label", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							defaultChecked: true,
							className: "accent-primary"
						}), " Pública"]
					}), /* @__PURE__ */ jsxs("label", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							className: "accent-primary"
						}), " Domiciliaria"]
					})]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de sistema",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "CONDOMINIAL",
					children: tipoSistemaOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Administrado por organismo regulador",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "NO",
					children: yesNoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fuente receptora autorizada",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "SI",
					children: yesNoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observaciones",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					className: `${controlClase} h-auto py-2`,
					rows: 3
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Servicios Publicos" }),
		/* @__PURE__ */ jsx(FormGrid, { children: [
			["Alumbrado público", "SI"],
			["Telefonía fija", "NO"],
			["Internet / Cable", "NO"],
			["Gas", "NO"]
		].map(([label, defaultValue]) => /* @__PURE__ */ jsx(FormField, {
			etiqueta: label,
			children: (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				defaultValue,
				children: yesNoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
			})
		}, label)) }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Accesibilidad y Vias" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Clase de vía",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "VÍA EXPRESA",
					children: claseViaOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Material",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "AFIRMADO",
					children: materialViaOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Observaciones de accesibilidad",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					placeholder: "Ej: A traves del Jiron Los Pinos hasta el Jr. Iquitos C-01"
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Equipamiento Urbano" }),
		/* @__PURE__ */ jsx(FormGrid, { children: [
			["Comercio", "NO"],
			["Salud", "NO"],
			["Recreacion", "NO"],
			["Instituciones públicas", "NO"],
			["Educacion", "SI"],
			["Transporte", "NO"]
		].map(([label, defaultValue]) => /* @__PURE__ */ jsx(FormField, {
			etiqueta: label,
			children: (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				defaultValue,
				children: yesNoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
			})
		}, label)) }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Infraestructura de Riego" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [[
			["Canales / Surcos", "SI"],
			["Inundacion", "NO"],
			["Goteo", "SI"],
			["Microaspersión", "NO"],
			["Aspersion", "NO"],
			["Otro", "NO"]
		].map(([label, defaultValue]) => /* @__PURE__ */ jsx(FormField, {
			etiqueta: label,
			children: (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				defaultValue,
				children: yesNoOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
			})
		}, label)), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Observaciones",
			ancho: "doble",
			children: (id) => /* @__PURE__ */ jsx("textarea", {
				id,
				className: `${controlClase} h-auto py-2`,
				rows: 3
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Topografía" }),
		/* @__PURE__ */ jsx(FormGrid, { children: /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Pendiente (topografía)",
			children: (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				defaultValue: "DE 21 A 30%",
				children: pendienteOptions.map((option) => /* @__PURE__ */ jsx("option", { children: option }, option))
			})
		}) })
	] });
}
function getDocumentBaseCode(codigo) {
	return codigo.replace(/[^A-Z0-9-]/gi, "").toUpperCase() || "PREDIO";
}
function createMembretadoPlanosBlob({ baseCode, codigo, predio, projectLabel }) {
	const planTypes = [
		["Plano de diagnóstico", "PD"],
		["Plano de ubicación", "PU"],
		["Plano perimétrico", "PP"],
		["Plano de afectación", "PA"],
		["Plano de distribución", "PDI"],
		["Plano de arquitectura", "PARQ"]
	];
	const headers = [
		"Tipo de plano",
		"Código del plano",
		"Código del predio",
		"Proyecto",
		"Sujeto pasivo",
		"Área m²"
	];
	const rows = planTypes.map(([tipo, suffix], index) => [
		tipo,
		`${baseCode}-${suffix}-${String(index + 1).padStart(2, "0")}`,
		codigo,
		projectLabel,
		predio?.suj || "",
		predio?.area || predio?.m2 || ""
	]);
	const html = `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body>
    <table border="1">
      <thead><tr>${headers.map((header) => `<th>${escapeDocumentHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeDocumentHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </body>
</html>`;
	return new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
}
function escapeDocumentHtml(value) {
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
//#endregion
export { CaracterizacionPredioPage as component };
