import { a as controlClase, n as FormField, r as FormGrid, t as FormActions } from "./Form-DtuiyqJ8.js";
import { n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { o as useHistorial, r as registrarCambio } from "./historial-Bc37nCTn.js";
import { Dt as BotonIcono, E as Modal, T as Confirmar, n as etiquetaProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as Subtitulo, t as Section } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.datos-legales-DU-RPnRf.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as InformacionPredio } from "./InformacionPredio-CpGJwdos.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { History, Plus, Save, Scale, Trash2, X } from "lucide-react";
//#region src/components/PadronLegalForm.tsx
var TITULAR_VACIO = {
	tipo: "NATURAL",
	dni: "",
	nombres: "",
	telefono: "",
	condicion: "PROPIETARIO NO INSCRITO",
	doc: "DOCUMENTOS CON FECHA CIERTA"
};
var areaClase = `${controlClase} h-auto py-2`;
function PadronLegalForm({ codigoPredio }) {
	const [titulares, setTitulares] = useState([{
		tipo: "NATURAL",
		dni: "70021899",
		nombres: "ERICK SIMON ESCALANTE OLANO",
		telefono: "978868159",
		condicion: "PROPIETARIO NO INSCRITO",
		doc: "DOCUMENTOS CON FECHA CIERTA"
	}]);
	const [showAdd, setShowAdd] = useState(false);
	const [newTit, setNewTit] = useState(TITULAR_VACIO);
	const [intento, setIntento] = useState(false);
	const [eliminar, setEliminar] = useState(null);
	const cerrarAdd = () => {
		setShowAdd(false);
		setIntento(false);
	};
	const addTitular = () => {
		setIntento(true);
		if (!newTit.dni || !newTit.nombres) return;
		setTitulares([...titulares, newTit]);
		setNewTit(TITULAR_VACIO);
		cerrarAdd();
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Subtitulo, { children: "Datos de expediente" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código del predio",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					defaultValue: codigoPredio || "VIAL-LST4-T04-ST05-090506-OC-00699"
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
				etiqueta: "Profesional legal responsable",
				obligatorio: true,
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "LAZARO MONTAÑEZ JAROL BRAYAN",
					children: /* @__PURE__ */ jsx("option", { children: "LAZARO MONTAÑEZ JAROL BRAYAN" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Mes de elaboración del expediente",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "-- SELECCIONE --" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado del predio",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					defaultValue: "MEDIDO",
					children: /* @__PURE__ */ jsx("option", { children: "MEDIDO" })
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Ubicación" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Distrito",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					defaultValue: "LOCROJA"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Sector / localidad",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					defaultValue: "CASERÍO HUANCHUY"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Manzana",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					defaultValue: "-"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Lote",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					defaultValue: "-"
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "UC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					defaultValue: "-"
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, {
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setShowAdd(true),
				children: [/* @__PURE__ */ jsx(Plus, {
					size: 16,
					"aria-hidden": true
				}), " Agregar titular"]
			}),
			children: "Titulares"
		}),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Titular registral",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Teléfono de contacto",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase
			})
		})] }),
		/* @__PURE__ */ jsx("div", {
			className: "mt-3",
			children: /* @__PURE__ */ jsx(Tabla, {
				columnas: [
					{
						clave: "n",
						titulo: "#",
						ancho: "3rem",
						render: (_t, i) => i + 1
					},
					{
						clave: "tipo",
						titulo: "Tipo persona"
					},
					{
						clave: "dni",
						titulo: "DNI / RUC"
					},
					{
						clave: "nombres",
						titulo: "Nombres / razón social",
						render: (t) => /* @__PURE__ */ jsx("span", {
							className: "font-medium",
							children: t.nombres
						})
					},
					{
						clave: "telefono",
						titulo: "Teléfonos"
					},
					{
						clave: "condicion",
						titulo: "Condición jurídica",
						render: (t) => /* @__PURE__ */ jsx(StatusBadge, {
							tono: "primary",
							children: t.condicion
						})
					},
					{
						clave: "doc",
						titulo: "Doc. sust. titularidad"
					},
					{
						clave: "acciones",
						titulo: "Acciones",
						alinear: "derecha",
						ancho: "5rem",
						render: (_t, i) => /* @__PURE__ */ jsx("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ jsx(BotonIcono, {
								nombre: "Quitar titular",
								icono: Trash2,
								destructiva: true,
								onClick: () => setEliminar(i)
							})
						})
					}
				],
				filas: titulares,
				claveFila: (t, i) => `${t.dni}-${i}`,
				vacio: "Sin titulares registrados."
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-4",
			children: /* @__PURE__ */ jsxs(FormGrid, {
				columnas: 1,
				children: [
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Condición jurídica de los titulares",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							defaultValue: "OCUPANTE",
							children: [/* @__PURE__ */ jsx("option", { children: "OCUPANTE" }), /* @__PURE__ */ jsx("option", { children: "PROPIETARIO" })]
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Partida registral matriz",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Partida registral independizada",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Documento que acredita la titularidad del predio",
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: controlClase,
							defaultValue: "CONSTANCIA DE COMUNERO HÁBIL",
							children: /* @__PURE__ */ jsx("option", { children: "CONSTANCIA DE COMUNERO HÁBIL" })
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Entidad que acredita la titularidad",
						children: (id) => /* @__PURE__ */ jsx("select", {
							id,
							className: controlClase,
							defaultValue: "Zona Registral N° I - Sede Piura",
							children: /* @__PURE__ */ jsx("option", { children: "Zona Registral N° I - Sede Piura" })
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Número de documento que acredita la titularidad del predio",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Fecha de emisión",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							type: "date",
							className: controlClase,
							defaultValue: "2024-05-13"
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Entidad",
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Área del documento de propiedad",
						obligatorio: true,
						children: (id) => /* @__PURE__ */ jsx("input", {
							id,
							className: controlClase,
							defaultValue: "1245"
						})
					}),
					/* @__PURE__ */ jsx(FormField, {
						etiqueta: "Unidades del documento de propiedad",
						children: (id) => /* @__PURE__ */ jsxs("select", {
							id,
							className: controlClase,
							defaultValue: "m2",
							children: [/* @__PURE__ */ jsx("option", { children: "m2" }), /* @__PURE__ */ jsx("option", { children: "ha" })]
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Lucro cesante" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Lucro cesante",
				children: (id) => /* @__PURE__ */ jsxs("select", {
					id,
					className: controlClase,
					defaultValue: "NO",
					children: [/* @__PURE__ */ jsx("option", { children: "NO" }), /* @__PURE__ */ jsx("option", { children: "SI" })]
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de empresa",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "-- SELECCIONE --" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Denominación del negocio",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					disabled: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción del giro comercial",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					disabled: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Condición del negocio",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "-- SELECCIONE --" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de negocio",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					disabled: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Régimen",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "-- SELECCIONE --" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Actividad",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "-- SELECCIONE --" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "N.° RUC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase,
					disabled: true
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Tipo de establecimiento",
				children: (id) => /* @__PURE__ */ jsx("select", {
					id,
					className: controlClase,
					children: /* @__PURE__ */ jsx("option", { children: "-- SELECCIONE --" })
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Descripción del lucro",
				ancho: "doble",
				children: (id) => /* @__PURE__ */ jsx("textarea", {
					id,
					className: areaClase,
					rows: 2,
					placeholder: "Descripción del lucro cesante"
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Servidumbre" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [/* @__PURE__ */ jsx(FormField, {
			etiqueta: "Tipo de servidumbre",
			children: (id) => /* @__PURE__ */ jsx("select", {
				id,
				className: controlClase,
				children: /* @__PURE__ */ jsx("option", { children: "-- SELECCIONE --" })
			})
		}), /* @__PURE__ */ jsx(FormField, {
			etiqueta: "Período (años)",
			children: (id) => /* @__PURE__ */ jsx("input", {
				id,
				className: controlClase
			})
		})] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Certificado de búsqueda catastral (CBC)" }),
		/* @__PURE__ */ jsxs(FormGrid, { children: [
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Número de publicidad CBC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de informe técnico",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Código de verificación CBC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Estado del CBC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Fecha de emisión del CBC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					type: "date",
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "Análisis legal CBC",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			}),
			/* @__PURE__ */ jsx(FormField, {
				etiqueta: "N.° de informe técnico",
				children: (id) => /* @__PURE__ */ jsx("input", {
					id,
					className: controlClase
				})
			})
		] }),
		/* @__PURE__ */ jsx(Subtitulo, { children: "Marco legal, análisis y observaciones" }),
		/* @__PURE__ */ jsxs(FormGrid, {
			columnas: 1,
			children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Marco legal en el que se basa el requerimiento",
					ancho: "doble",
					children: /* @__PURE__ */ jsx("textarea", {
						"aria-label": "Marco legal en el que se basa el requerimiento",
						className: areaClase,
						rows: 4,
						defaultValue: "ARTICULO 15 DEL TEXTO ÚNICO ORDENADO DEL DECRETO LEGISLATIVO N°1192, QUE APRUEBA LA \"LEY MARCO DE ADQUISICION Y EXPROPIACION DE INMUEBLES, TRANSFERENCIA DE INMUEBLES DE PROPIEDAD DEL ESTADO, LIBERACION DE INTERFERENCIAS Y DICTA OTRAS MEDIDAS PARA LA EJECUCION DE OBRAS DE INFRAESTRUCTURA\", APROBADO MEDIANTE DECRETO SUPREMO N°015-2020-VIVIENDA."
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Análisis de la situación legal del predio",
					ancho: "doble",
					children: /* @__PURE__ */ jsx("textarea", {
						"aria-label": "Análisis de la situación legal del predio",
						className: areaClase,
						rows: 3,
						defaultValue: "EL TITULAR DEL PREDIO ACREDITA SU DERECHO DE PROPIEDAD DEL INMUEBLE, EN MERITO A LA PARTIDA REGISTRAL N° <nro-registral> DEL REGISTRO DE PREDIOS DE LIMA, ZONA REGISTRAL N° IX- SEDE LIMA, EN CUMPLIMIENTO AL ART. 6.1 DEL TEXTO UNICO ORDENADO DEL DECRETO LEGISLATIVO N° 1192."
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Observaciones",
					ancho: "doble",
					children: /* @__PURE__ */ jsx("textarea", {
						"aria-label": "Observaciones",
						className: areaClase,
						rows: 2,
						placeholder: "Ingrese la observación"
					})
				})
			]
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: showAdd,
			onCerrar: cerrarAdd,
			titulo: "Agregar titular",
			ancho: "xl",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: cerrarAdd,
				children: "Cancelar"
			}), /* @__PURE__ */ jsx(Button, {
				type: "button",
				onClick: addTitular,
				children: "Agregar titular"
			})] }),
			children: /* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Tipo persona",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						value: newTit.tipo,
						onChange: (e) => setNewTit({
							...newTit,
							tipo: e.target.value
						}),
						children: [/* @__PURE__ */ jsx("option", { children: "NATURAL" }), /* @__PURE__ */ jsx("option", { children: "JURÍDICA" })]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "DNI",
					obligatorio: true,
					error: intento && !newTit.dni ? "Ingrese el DNI del titular." : void 0,
					ayuda: "Validación con ficha RENIEC y búsqueda por DNI: próximamente.",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: newTit.dni,
						onChange: (e) => setNewTit({
							...newTit,
							dni: e.target.value
						})
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Nombres y apellidos",
					obligatorio: true,
					error: intento && !newTit.nombres ? "Ingrese los nombres del titular." : void 0,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: newTit.nombres,
						onChange: (e) => setNewTit({
							...newTit,
							nombres: e.target.value
						})
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Fecha de caducidad del DNI",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Departamento de domicilio",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Provincia de domicilio",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Distrito de domicilio",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Dirección",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Teléfono de contacto",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: newTit.telefono,
						onChange: (e) => setNewTit({
							...newTit,
							telefono: e.target.value
						})
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Foto de identidad",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "file",
						className: "block w-full text-sm text-foreground"
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Condición jurídica",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						value: newTit.condicion,
						onChange: (e) => setNewTit({
							...newTit,
							condicion: e.target.value
						}),
						children: [
							/* @__PURE__ */ jsx("option", { children: "PROPIETARIO NO INSCRITO" }),
							/* @__PURE__ */ jsx("option", { children: "PROPIETARIO" }),
							/* @__PURE__ */ jsx("option", { children: "OCUPANTE" })
						]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Estado civil",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsxs("select", {
						id,
						className: controlClase,
						children: [/* @__PURE__ */ jsx("option", { children: "SOLTERO" }), /* @__PURE__ */ jsx("option", { children: "CASADO" })]
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Documento que sustenta la titularidad",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						className: controlClase,
						value: newTit.doc,
						onChange: (e) => setNewTit({
							...newTit,
							doc: e.target.value
						}),
						children: /* @__PURE__ */ jsx("option", { children: "DOCUMENTOS CON FECHA CIERTA" })
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Archivo del documento de sustento",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "file",
						className: "block w-full text-sm text-foreground"
					})
				})
			] })
		}),
		/* @__PURE__ */ jsx(Confirmar, {
			abierto: eliminar !== null,
			onCerrar: () => setEliminar(null),
			onConfirmar: () => {
				if (eliminar !== null) setTitulares(titulares.filter((_, idx) => idx !== eliminar));
				setEliminar(null);
			},
			titulo: "Quitar titular",
			texto: `${eliminar !== null ? titulares[eliminar]?.nombres ?? "El titular" : "El titular"} se quitará del padrón legal.`,
			accion: "Quitar titular",
			destructiva: true
		})
	] });
}
//#endregion
//#region src/routes/proyectos.$projectId.predios.$codigo.datos-legales.tsx?tsr-split=component
/**
* El padrón legal (`PadronLegalForm`) guarda sus campos sin estado propio, así que la versión se arma
* leyendo lo que el usuario tiene en pantalla al guardar: cada campo por su etiqueta y los titulares.
* ponytail: versiona pero no restaura ni recarga; para eso `PadronLegalForm` debe pasar a campos controlados.
*/
function leerPadron(raiz) {
	const datos = {};
	const poner = (clave, valor) => {
		let nombre = clave;
		for (let i = 2; nombre in datos; i++) nombre = `${clave} (${i})`;
		datos[nombre] = valor;
	};
	raiz.querySelectorAll("label[for]").forEach((etiqueta) => {
		const control = document.getElementById(etiqueta.htmlFor);
		if (control && typeof control.value === "string") poner((etiqueta.textContent ?? "").replace(/\s*\*$/, "").trim(), control.value);
	});
	raiz.querySelectorAll("textarea[aria-label]").forEach((area) => {
		poner(area.getAttribute("aria-label") ?? "Texto", area.value);
	});
	let n = 0;
	raiz.querySelectorAll("table tbody tr").forEach((fila) => {
		const celdas = [...fila.querySelectorAll("td")].map((c) => c.textContent?.trim() ?? "");
		if (celdas.length > 2) poner(`Titular ${++n}`, celdas.filter(Boolean).slice(1).join(" · "));
	});
	return datos;
}
function DatosLegalesPage() {
	const { projectId, codigo } = Route$1.useParams();
	const router = useRouter();
	const goBack = () => router.history.back();
	const decodedCodigo = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const claveHistorial = `datos-legales-${decodedCodigo}`;
	const versiones = useHistorial(claveHistorial);
	const raiz = useRef(null);
	function guardar() {
		if (raiz.current) registrarCambio(claveHistorial, {
			accion: "Guardó padrón legal",
			objeto: `predio ${decodedCodigo}`,
			antes: versiones[0]?.registro ?? {},
			despues: leerPadron(raiz.current)
		}, {
			modulo: 12,
			entidad: "datos_legales"
		});
		goBack();
	}
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: decodedCodigo,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: decodedCodigo }),
		children: [/* @__PURE__ */ jsx(PredioEncabezado, {
			projectId,
			codigo: decodedCodigo,
			titulo: "Datos legales",
			icono: Scale
		}), /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "registro",
			children: [
				/* @__PURE__ */ jsxs(TabsList, {
					className: "mb-3",
					children: [/* @__PURE__ */ jsx(TabsTrigger, {
						value: "registro",
						children: "Registro"
					}), /* @__PURE__ */ jsxs(TabsTrigger, {
						value: "historico",
						children: [
							/* @__PURE__ */ jsx(History, {
								size: 16,
								"aria-hidden": true
							}),
							" Histórico (",
							versiones.length,
							")"
						]
					})]
				}),
				/* @__PURE__ */ jsxs(TabsContent, {
					value: "registro",
					forceMount: true,
					className: "data-[state=inactive]:hidden",
					children: [
						/* @__PURE__ */ jsx(InformacionPredio, {
							projectId,
							codigo: decodedCodigo,
							className: "mb-4"
						}),
						/* @__PURE__ */ jsx(Section, {
							titulo: "Padrón legal · art. 5 a 8 del TUO del DL 1192",
							children: /* @__PURE__ */ jsx("div", {
								ref: raiz,
								children: /* @__PURE__ */ jsx(PadronLegalForm, { codigoPredio: decodedCodigo })
							})
						}),
						/* @__PURE__ */ jsxs(FormActions, { children: [/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							onClick: goBack,
							children: [/* @__PURE__ */ jsx(X, {}), " Cancelar"]
						}), /* @__PURE__ */ jsxs(Button, {
							type: "button",
							onClick: guardar,
							children: [/* @__PURE__ */ jsx(Save, {}), " Guardar padrón legal"]
						})] })
					]
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "historico",
					children: /* @__PURE__ */ jsx(Section, {
						titulo: "Histórico de datos legales",
						children: /* @__PURE__ */ jsx(Historico, {
							registro: claveHistorial,
							nombreArchivo: `historico-datos-legales-${decodedCodigo}`
						})
					})
				})
			]
		})]
	});
}
//#endregion
export { DatosLegalesPage as component };
