import { a as controlClase, i as SiNo, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Database, Pencil, Plus, Power, Search, Trash2 } from "lucide-react";
//#region src/routes/configuracion.maestros.tsx?tsr-split=component
var GRUPOS = [
	{
		titulo: "Ubicación geográfica",
		items: [
			{
				key: "departamentos",
				label: "Departamentos",
				values: [
					"AMAZONAS",
					"ANCASH",
					"APURIMAC",
					"AREQUIPA",
					"AYACUCHO",
					"CAJAMARCA",
					"CALLAO",
					"CUSCO",
					"HUANCAVELICA",
					"HUANUCO",
					"ICA",
					"JUNIN",
					"LA LIBERTAD",
					"LAMBAYEQUE",
					"LIMA",
					"LORETO",
					"MADRE DE DIOS",
					"MOQUEGUA",
					"PASCO",
					"PIURA",
					"PUNO",
					"SAN MARTIN",
					"TACNA",
					"TUMBES",
					"UCAYALI"
				]
			},
			{
				key: "provincias",
				label: "Provincias",
				values: []
			},
			{
				key: "distritos",
				label: "Distritos",
				values: []
			}
		]
	},
	{
		titulo: "Predio",
		items: [
			{
				key: "tipo-predio",
				label: "Tipo de predio",
				values: ["URBANO", "RURAL"]
			},
			{
				key: "estado-predio",
				label: "Estado del predio",
				values: [
					"DESIGNADO",
					"POR MEDIR",
					"MEDIDO",
					"NEGATIVO",
					"LISTO PARA TASAR",
					"CON TASACIÓN"
				]
			},
			{
				key: "uso-predio",
				label: "Uso del predio",
				values: [
					"VIVIENDA",
					"VIVIENDA-COMERCIO",
					"COMERCIO",
					"TERRENO",
					"ALMACEN",
					"AGRÍCOLA",
					"ERIAZO",
					"EXPANSIÓN URBANA",
					"ISLA RÚSTICA"
				]
			},
			{
				key: "condicion-rustico",
				label: "Condición de rústico",
				values: [
					"AGRÍCOLA",
					"ERIAZO",
					"EXPANSIÓN URBANA",
					"ISLA RÚSTICA"
				]
			},
			{
				key: "tipo-via",
				label: "Tipo de vía",
				values: [
					"AVENIDA",
					"CARRETERA NACIONAL",
					"PASAJE",
					"JIRÓN",
					"ALAMEDA",
					"CALLE",
					"PROLONGACIÓN",
					"MALECÓN"
				]
			},
			{
				key: "lado",
				label: "Lado",
				values: [
					"DERECHO",
					"IZQUIERDO",
					"DERECHO/IZQUIERDO"
				]
			},
			{
				key: "tipo-servidumbre",
				label: "Tipo de servidumbre",
				values: [
					"NINGUNO",
					"SERVIDUMBRE DE PASO",
					"SERVIDUMBRE DE PASO DE LÍNEAS ELÉCTRICAS, AÉREAS O ENTERRADAS DE ALTA TENSIÓN",
					"SERVIDUMBRE DE AGUAS",
					"SERVIDUMBRE DE DESAGÜE",
					"SERVIDUMBRE DE ACUEDUCTO",
					"SERVIDUMBRE DE COSTAS Y RÍOS",
					"SERVIDUMBRE DE LUCES Y VISTAS",
					"SERVIDUMBRE DE MEDIANERÍA",
					"SERVIDUMBRES AERONÁUTICAS",
					"SERVIDUMBRES DE CARRETERAS Y FERROCARRILES",
					"SERVIDUMBRE DE BALCÓN",
					"SERVIDUMBRE DE PALCO O BUTACA",
					"SERVIDUMBRES DE SACA DE LEÑA",
					"SERVIDUMBRE DE COMUNIDAD DE PASTOS"
				]
			}
		]
	},
	{
		titulo: "Titularidad y documentos",
		items: [
			{
				key: "condicion-juridica",
				label: "Condición jurídica del propietario",
				values: [
					"PROPIETARIO",
					"PROPIETARIO NO INSCRITO",
					"POSESIONARIO MAYOR A 10 AÑOS (6.3)",
					"OCUPANTE",
					"PROPIEDAD DEL ESTADO PERUANO",
					"TRANSFERENCIA INTERESTATAL",
					"POSESIONARIO MAYOR A 10 AÑOS (7.2)",
					"COMUNERO"
				]
			},
			{
				key: "documento-titularidad",
				label: "Documento que acredita la titularidad",
				values: [
					"CERTIFICADO DE FORMALIZACIÓN DE LA PROPIEDAD RURAL OTORGADO POR COFOPRI",
					"CONSTANCIA DE POSESIÓN",
					"CONSTANCIA DE COMUNERO HÁBIL",
					"CONTRATO DE TRANSFERENCIA",
					"CONTRATO PRIVADO DE COMPRAVENTA DE ACCIONES Y DERECHOS",
					"DECLARACIÓN JURADA DE 6 VECINOS",
					"DOCUMENTOS CON FECHA CIERTA",
					"PARTIDA REGISTRAL",
					"SOLICITUD DE CONSTANCIA DE POSESIÓN",
					"TÍTULO DE PROPIEDAD",
					"MINUTA DE COMPRAVENTA"
				]
			},
			{
				key: "entidad-titularidad",
				label: "Entidad que acredita la titularidad",
				values: [
					"Zona Registral N° I - Sede Piura",
					"Zona Registral N° II - Sede Chiclayo",
					"Zona Registral N° III - Sede Moyobamba",
					"Zona Registral N° IV - Sede Iquitos",
					"Zona Registral N° V - Sede Trujillo",
					"Zona Registral N° VI - Sede Pucallpa",
					"Zona Registral N° VII - Sede Huaraz",
					"Zona Registral N° VIII - Sede Huancayo",
					"Zona Registral N° IX - Sede Lima",
					"Zona Registral N° X - Sede Cusco",
					"Zona Registral N° XI - Sede Ica",
					"Zona Registral N° XII - Sede Arequipa",
					"Zona Registral N° XIII - Sede Tacna",
					"Zona Registral N° XIV - Sede Ayacucho",
					"Gobierno Regional",
					"Gobierno Municipal",
					"COFOPRI",
					"Comunidad Campesina",
					"Otros"
				]
			},
			{
				key: "unidad-doc-propiedad",
				label: "Unidades del documento de propiedad",
				values: ["m²", "ha"]
			}
		]
	},
	{
		titulo: "Tasación",
		items: [
			{
				key: "periodo-tasacion",
				label: "Tipo periodo tasación",
				values: ["ACTUAL", "RETROSPECTIVA"]
			},
			{
				key: "tipo-tasacion",
				label: "Tipo de tasación",
				values: ["COMERCIAL", "REGLAMENTARIA"]
			},
			{
				key: "monedas",
				label: "Monedas",
				values: [
					"PEN - Soles",
					"USD - Dólares",
					"EUR - Euros"
				]
			}
		]
	},
	{
		titulo: "Planos y cartografía",
		items: [{
			key: "datum-planos",
			label: "Datum de los planos",
			values: [
				"PSAD56",
				"WGS84 - ZONA 18S",
				"WGS84"
			]
		}, {
			key: "unidad-medida",
			label: "Unidad de medida",
			values: [
				"m",
				"m²",
				"m³",
				"ha",
				"km",
				"km²",
				"und",
				"ml"
			]
		}]
	},
	{
		titulo: "Edificación / Construcción",
		items: [
			{
				key: "material-predominante",
				label: "Material predominante",
				values: [
					"ACERO",
					"ADOBE",
					"ALUMINIO",
					"ALUZINC",
					"ASFALTO",
					"CALAMINA",
					"CALAMINA METÁLICA",
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
					"LOSA",
					"MADERA",
					"MATERIAL LIGERO",
					"PIEDRA",
					"POLIETILENO",
					"POLIPROPILENO",
					"TRIPLAY",
					"QUINCHA",
					"TAPIAL",
					"VIDRIO"
				]
			},
			{
				key: "estado-conservacion",
				label: "Estado de conservación",
				values: [
					"MUY BUENO",
					"BUENO",
					"REGULAR",
					"MALO",
					"MUY MALO"
				]
			},
			{
				key: "estado-construccion",
				label: "Estado de construcción",
				values: [
					"TERMINADO",
					"INCONCLUSO",
					"EN CONSTRUCCIÓN"
				]
			},
			{
				key: "uso-obra-complementaria",
				label: "Uso de obra complementaria",
				values: [
					"ALMACÉN",
					"ALTILLO",
					"AZOTEA",
					"BAÑO",
					"CANAL",
					"CERCO FRONTAL",
					"CERCO PERIMÉTRICO",
					"COBERTIZO",
					"COBERTURA",
					"COCHERA",
					"COLUMNA",
					"CRIANZA DE AVES",
					"CUBIERTA",
					"DEPÓSITO",
					"ESCALERA",
					"HORNO",
					"LAVADERO",
					"LOSA",
					"MESADA",
					"MURO",
					"MURO DE CONTENCIÓN",
					"PARAPETO",
					"PARRILLA",
					"PASADIZO",
					"PATIO",
					"PIRCA",
					"PISO",
					"PÓRTICO",
					"PORTÓN",
					"POZA",
					"PROTECCIÓN",
					"RAMAL",
					"RAMPA",
					"REJA",
					"RESERVORIO",
					"SARDINEL",
					"TANQUE ELEVADO",
					"TECHO",
					"TENDAL",
					"VEREDA"
				]
			}
		]
	},
	{
		titulo: "Cultivos",
		items: [
			{
				key: "plantaciones-frutales",
				label: "Plantaciones frutales",
				values: [
					"ALFALFA",
					"CAPULÍ",
					"CHIRIMOYA",
					"DURAZNO",
					"GRANADILLA",
					"LIMÓN",
					"LÚCUMA",
					"MANDARINA",
					"MANZANA",
					"MARACUYÁ",
					"MEMBRILLO",
					"MORA",
					"NARANJA",
					"NÍSPERO",
					"PACAY",
					"PALTA",
					"PAPAYA",
					"PLÁTANO",
					"SÁBILA",
					"SANKY",
					"TANGELO",
					"TUNA",
					"UVA",
					"PIÑA",
					"MANGO"
				]
			},
			{
				key: "plantaciones-forestales",
				label: "Plantaciones forestales",
				values: [
					"EUCALIPTO",
					"PINO",
					"CIPRÉS",
					"MOLLE",
					"ALISO",
					"QUEÑUA",
					"QUINUAL",
					"TARA",
					"HUARANGO",
					"CAOBA",
					"CEDRO",
					"ISHPINGO",
					"TORNILLO",
					"SHIHUAHUACO",
					"BOLAINA",
					"CAPIRONA"
				]
			},
			{
				key: "plantaciones-transitorias",
				label: "Plantaciones transitorias",
				values: [
					"CAÑA DE AZÚCAR",
					"CEBADA",
					"CEBOLLA",
					"COL",
					"HABA",
					"MAÍZ",
					"OCA",
					"PAPA",
					"TARA",
					"TRIGO",
					"ZAPALLO",
					"ARROZ",
					"QUINUA",
					"KIWICHA",
					"OLLUCO",
					"ARVEJA",
					"FRIJOL",
					"YUCA",
					"CAMOTE",
					"ALGODÓN",
					"ESPÁRRAGO",
					"TOMATE",
					"AJÍ",
					"ZANAHORIA"
				]
			}
		]
	},
	{
		titulo: "Organización",
		items: [{
			key: "tipos-infra",
			label: "Tipos de infraestructura",
			values: [
				"CARRETERA",
				"PUENTE",
				"AEROPUERTO",
				"PUERTO",
				"FERROCARRIL",
				"LÍNEA DE TRANSMISIÓN",
				"HIDROELÉCTRICA",
				"SANEAMIENTO"
			]
		}, {
			key: "cargos",
			label: "Cargos / Puestos",
			values: [
				"COORDINADOR",
				"ESPECIALISTA LEGAL",
				"ESPECIALISTA TÉCNICO",
				"TASADOR",
				"TOPÓGRAFO",
				"ASISTENTE SOCIAL",
				"ASISTENTE TÉCNICO",
				"ASISTENTE LEGAL",
				"JEFE DE PROYECTO",
				"GERENTE"
			]
		}]
	},
	{
		titulo: "Servicios APR",
		items: [{
			key: "tipos-servicio-apr",
			label: "Tipos de servicio APR",
			values: [
				"1.MAQUINAS Y EQUIPOS - 2.6.3.2.1.1",
				"2.MOBILIARIO - 2.6.3.2.1.2",
				"1.EQUIPOS COMPUTACIONALES Y PERIFERICOS - 2.6.3.2.3.1",
				"1.AIRE ACONDICIONADO Y REFRIGERACION - 2.6.3.2.9.1",
				"5.EQUIPOS E INSTRUMENTOS DE MEDICION - 2.6.3.2.9.5",
				"1.TERRENOS URBANOS - 2.6.5.1.1.1",
				"2.TERRENOS RURALES - 2.6.5.1.1.2",
				"2.SOFTWARES - 2.6.6.1.3.2",
				"2.GASTO POR LA COMPRA DE BIENES - 2.6.8.1.4.2",
				"3.GASTO POR LA CONTRATACION DE SERVICIOS - 2.6.8.1.4.3",
				"4.GASTO POR LAUDOS ARBITRALES O SENTENCIAS VINCULADAS A INVERSIONES - 2.6.8.1.4.4",
				"99.OTROS GASTOS - 2.6.8.1.4.99",
				"3.EQUIPOS DE TELECOMUNICACIONES - 2.6.3.2.3.3"
			]
		}]
	}
];
var ALL_MAESTROS = GRUPOS.flatMap((g) => g.items);
var seedRows = (m) => {
	const prefix = m.key.slice(0, 3).toUpperCase();
	if (m.values.length === 0) return Array.from({ length: 4 }).map((_, i) => ({
		id: i + 1,
		codigo: `${prefix}-${String(i + 1).padStart(3, "0")}`,
		descripcion: `Pendiente de carga ${i + 1}`,
		activo: true
	}));
	return m.values.map((v, i) => ({
		id: i + 1,
		codigo: `${prefix}-${String(i + 1).padStart(3, "0")}`,
		descripcion: v,
		activo: true
	}));
};
var ETIQUETAS = {
	codigo: "Código",
	descripcion: "Descripción",
	activo: "Activo"
};
function MaestrosPage() {
	const [selected, setSelected] = useState(ALL_MAESTROS[0]);
	const [groupFilter, setGroupFilter] = useState("");
	const [modal, setModal] = useState(null);
	const [confirm, setConfirm] = useState(null);
	const [intentado, setIntentado] = useState(false);
	const rol = useRol();
	const clave = `configuracion-maestros-${selected.key}`;
	const bitacora = {
		modulo: 8,
		entidad: "configuracion_maestros"
	};
	const versiones = useHistorial(clave);
	const rows = useMemo(() => versiones[0]?.registro ?? seedRows(selected), [versiones, selected]);
	const filas = useMemo(() => rows.map((r) => ({
		...r,
		estado: r.activo ? "Activo" : "Inactivo"
	})), [rows]);
	const cambiar = (despues, accion, objeto, motivo) => registrarCambio(clave, {
		accion,
		objeto,
		motivo,
		antes: rows,
		despues
	}, bitacora);
	const nombre = (r) => `${r.codigo} ${r.descripcion}`;
	const openCreate = () => {
		const prefix = selected.key.slice(0, 3).toUpperCase();
		const nextId = (rows.reduce((a, r) => Math.max(a, r.id), 0) || 0) + 1;
		setIntentado(false);
		setModal({
			mode: "create",
			row: {
				id: nextId,
				codigo: `${prefix}-${String(nextId).padStart(3, "0")}`,
				descripcion: "",
				activo: true
			}
		});
	};
	const openEdit = (r) => {
		setIntentado(false);
		setModal({
			mode: "edit",
			row: { ...r }
		});
	};
	const save = () => {
		if (!modal) return;
		setIntentado(true);
		const r = modal.row;
		if (!r.descripcion.trim() || !r.codigo.trim()) return;
		if (modal.mode === "create") cambiar([...rows, r], "Agregó valor", nombre(r));
		else cambiar(rows.map((x) => x.id === r.id ? r : x), "Modificó valor", nombre(r));
		setModal(null);
	};
	const toggleActivo = (r) => cambiar(rows.map((x) => x.id === r.id ? {
		...x,
		activo: !x.activo
	} : x), r.activo ? "Inactivó valor" : "Activó valor", nombre(r));
	const remove = (motivo) => {
		if (!confirm) return;
		cambiar(rows.filter((x) => x.id !== confirm.id), "Eliminó valor", nombre(confirm), motivo);
		setConfirm(null);
	};
	const gruposFiltrados = useMemo(() => {
		if (!groupFilter) return GRUPOS;
		const t = groupFilter.toLowerCase();
		return GRUPOS.map((g) => ({
			...g,
			items: g.items.filter((i) => i.label.toLowerCase().includes(t))
		})).filter((g) => g.items.length > 0);
	}, [groupFilter]);
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]",
			children: [/* @__PURE__ */ jsxs(Section, {
				titulo: "Catálogos",
				className: "h-fit",
				children: [
					/* @__PURE__ */ jsxs("p", {
						className: "mb-2 text-xs text-muted-foreground",
						children: [ALL_MAESTROS.length, " catálogos del sistema."]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "relative mb-2 block",
						children: [/* @__PURE__ */ jsx(Search, {
							size: 16,
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": true
						}), /* @__PURE__ */ jsx("input", {
							type: "search",
							value: groupFilter,
							onChange: (e) => setGroupFilter(e.target.value),
							placeholder: "Filtrar catálogos",
							"aria-label": "Filtrar catálogos",
							className: `${controlClase} pl-9`
						})]
					}),
					/* @__PURE__ */ jsxs("nav", {
						"aria-label": "Catálogos",
						className: "max-h-[calc(100vh-16rem)] overflow-y-auto",
						children: [gruposFiltrados.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "px-2 py-4 text-center text-sm text-muted-foreground",
							children: "Ningún catálogo coincide."
						}), gruposFiltrados.map((g) => /* @__PURE__ */ jsxs("div", {
							className: "mb-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "px-2 py-1 text-xs font-semibold uppercase text-muted-foreground",
								children: g.titulo
							}), g.items.map((m) => /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setSelected(m),
								"aria-current": selected.key === m.key ? "true" : void 0,
								className: `flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm ${selected.key === m.key ? "bg-primary-soft font-medium text-primary-dark" : "text-foreground hover:bg-muted"}`,
								children: [/* @__PURE__ */ jsx("span", {
									className: "truncate",
									children: m.label
								}), /* @__PURE__ */ jsx("span", {
									className: "ml-2 text-xs text-muted-foreground",
									children: m.values.length || "Sin carga"
								})]
							}, m.key))]
						}, g.titulo))]
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "min-w-0",
				children: /* @__PURE__ */ jsx(CrudPage, {
					titulo: selected.label,
					icono: Database,
					descripcion: `Maestros del sistema · ${rows.length} valores del catálogo.`,
					migas: [
						{ texto: "Configuración" },
						{ texto: "Maestros" },
						{ texto: selected.label }
					],
					acciones: /* @__PURE__ */ jsxs(Button, {
						type: "button",
						onClick: openCreate,
						children: [/* @__PURE__ */ jsx(Plus, {}), " Agregar valor"]
					}),
					demo: true,
					columnas: [
						{
							clave: "codigo",
							titulo: "Código",
							ancho: "140px",
							render: (r) => /* @__PURE__ */ jsx("span", {
								className: "font-mono text-xs",
								children: r.codigo
							})
						},
						{
							clave: "descripcion",
							titulo: "Descripción"
						},
						{
							clave: "estado",
							titulo: "Estado",
							ancho: "120px",
							render: (r) => /* @__PURE__ */ jsx(StatusBadge, {
								tono: r.activo ? "success" : "neutral",
								children: r.estado
							})
						}
					],
					filas,
					claveFila: (r) => r.id,
					filtros: [{
						clave: "estado",
						etiqueta: "Estado",
						opciones: [{
							valor: "Activo",
							texto: "Activo"
						}, {
							valor: "Inactivo",
							texto: "Inactivo"
						}]
					}],
					buscarEn: ["codigo", "descripcion"],
					accionesFila: [
						{
							nombre: "Editar valor",
							icono: Pencil,
							onClick: openEdit
						},
						{
							nombre: "Inactivar valor",
							icono: Power,
							onClick: toggleActivo,
							visible: (r) => r.activo
						},
						{
							nombre: "Activar valor",
							icono: Power,
							onClick: toggleActivo,
							visible: (r) => !r.activo
						},
						{
							nombre: "Eliminar valor",
							icono: Trash2,
							destructiva: true,
							onClick: (r) => setConfirm(r)
						}
					],
					exportar: (visibles) => exportarExcel(`maestro-${selected.key}`, [
						{
							titulo: "Código",
							valor: (r) => r.codigo
						},
						{
							titulo: "Descripción",
							valor: (r) => r.descripcion
						},
						{
							titulo: "Estado",
							valor: (r) => r.estado
						}
					], visibles),
					vacio: "Este catálogo no tiene valores.",
					historial: {
						registro: clave,
						etiquetas: ETIQUETAS,
						etiquetaFila: (r) => r.codigo,
						puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
						onRestaurar: (registro, n) => cambiar(registro, "Restauró una versión anterior", `versión ${n}`)
					}
				})
			})]
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: modal !== null,
			onCerrar: () => setModal(null),
			titulo: modal?.mode === "create" ? "Agregar valor" : "Editar valor",
			descripcion: selected.label,
			ancho: "sm",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setModal(null),
				children: "Cancelar"
			}), /* @__PURE__ */ jsx(Button, {
				type: "button",
				onClick: save,
				children: modal?.mode === "create" ? "Agregar valor" : "Guardar valor"
			})] }),
			children: modal && /* @__PURE__ */ jsxs(FormGrid, {
				columnas: 1,
				children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Código",
						obligatorio: true,
						error: intentado && !modal.row.codigo.trim() ? "Ingrese el código" : void 0,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							value: modal.row.codigo,
							onChange: (e) => setModal({
								...modal,
								row: {
									...modal.row,
									codigo: e.target.value
								}
							}),
							className: `h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted font-mono`
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Descripción",
						obligatorio: true,
						error: intentado && !modal.row.descripcion.trim() ? "Ingrese la descripción" : void 0,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							autoFocus: true,
							value: modal.row.descripcion,
							onChange: (e) => setModal({
								...modal,
								row: {
									...modal.row,
									descripcion: e.target.value
								}
							}),
							className: "h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-muted"
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Activo",
						children: /* @__PURE__ */ jsx(SiNo, {
							valor: modal.row.activo,
							onCambiar: (v) => setModal({
								...modal,
								row: {
									...modal.row,
									activo: v
								}
							}),
							nombre: "Activo"
						})
					})
				]
			})
		}),
		confirm && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: "Eliminar valor",
			descripcion: `${confirm.descripcion} (${confirm.codigo}) se quitará del catálogo ${selected.label}. El histórico conserva el valor y el motivo.`,
			accion: "Eliminar valor",
			onCerrar: () => setConfirm(null),
			onConfirmar: remove
		})
	] });
}
/** Eliminar o anular exige un motivo escrito: queda en el histórico junto al registro como estaba. */
function MotivoModal({ titulo, descripcion, accion, onCerrar, onConfirmar }) {
	const [motivo, setMotivo] = useState("");
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar,
		ancho: "sm",
		titulo,
		descripcion,
		pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "outline",
			onClick: onCerrar,
			children: "Cancelar"
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			variant: "destructive",
			disabled: motivo.trim().length < 5,
			onClick: () => onConfirmar(motivo.trim()),
			children: accion
		})] }),
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor: "motivo-cambio",
				className: "mb-1 block text-sm font-medium",
				children: ["Motivo ", /* @__PURE__ */ jsx("span", {
					className: "text-destructive",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				id: "motivo-cambio",
				rows: 3,
				className: `${controlClase} h-auto py-2`,
				value: motivo,
				onChange: (e) => setMotivo(e.target.value)
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Mínimo cinco caracteres."
			})
		]
	});
}
//#endregion
export { MaestrosPage as component };
