import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { f as vencimiento, g as fechaIso, m as fecha, r as proyectos, u as plazo } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { r as registrarCambio } from "./historial-Bc37nCTn.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as Modal, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { n as useAlmacen, t as idNuevo } from "./almacen-BgvL3X8T.js";
import { t as CrudPage } from "./CrudPage-BaZhmkvI.js";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Ban, CalendarDays, Network, Pencil, Plus } from "lucide-react";
//#region src/routes/interferencias.tsx?tsr-split=component
var TIPOS = [
	"Red eléctrica",
	"Agua potable",
	"Alcantarillado",
	"Telecomunicaciones",
	"Gas natural",
	"Riego",
	"Otra"
];
var TONO = {
	Comunicada: "primary",
	"Presupuesto recibido": "primary",
	Observada: "warning",
	Aprobada: "success",
	"En ejecución": "warning",
	Liberada: "success",
	Anulada: "neutral"
};
/** Plazo vigente según el estado (art. 43). Devuelve el hito desde el que corre y el plazo. */
function plazoVigente(i) {
	if (i.estado === "Comunicada" && i.fechaComunicacion) return {
		desde: i.fechaComunicacion,
		p: plazo("interferencias_presupuesto")
	};
	if (i.estado === "Observada" && i.fechaObservacion) return {
		desde: i.fechaObservacion,
		p: plazo("interferencias_observaciones")
	};
	if (i.estado === "Aprobada" && i.fechaAprobacion) return {
		desde: i.fechaAprobacion,
		p: plazo("interferencias_inicio")
	};
	return null;
}
var CLAVE_HISTORIAL = "interferencias";
var BITACORA = {
	modulo: 23,
	entidad: "interferencias"
};
var ETIQUETAS = {
	codigo: "Código",
	proyecto: "Proyecto",
	tipo: "Tipo",
	titular: "Titular",
	ubicacion: "Ubicación",
	descripcion: "Descripción",
	estado: "Estado",
	fechaComunicacion: "Comunicación al titular",
	fechaPresupuesto: "Presupuesto recibido",
	fechaObservacion: "Observación de la entidad",
	fechaAprobacion: "Aprobación",
	fechaInicio: "Inicio de trabajos",
	fechaLiberacion: "Liberación"
};
var d = (iso) => /* @__PURE__ */ new Date(`${iso}T00:00:00`);
/**
* Código del registro (no es un documento emitido, por eso no pasa por Numeración): INF-AAAA-NNNN,
* el mayor del año en la lista más uno.
*/
function siguienteCodigo(lista, anio = (/* @__PURE__ */ new Date()).getFullYear()) {
	const usados = lista.map((i) => /^INF-(d{4})-(d+)$/.exec(i.codigo)).filter((m) => m && m[1] === String(anio)).map((m) => Number(m[2]));
	return `INF-${anio}-${String(Math.max(0, ...usados) + 1).padStart(4, "0")}`;
}
var NUEVA = () => ({
	proyecto: proyectos[0]?.id ?? "",
	tipo: TIPOS[0],
	titular: "",
	ubicacion: "",
	descripcion: "",
	estado: "Comunicada",
	fechaComunicacion: fechaIso(/* @__PURE__ */ new Date()),
	fechaPresupuesto: "",
	fechaObservacion: "",
	fechaAprobacion: "",
	fechaInicio: "",
	fechaLiberacion: ""
});
function InterferenciasPage() {
	const [lista, setLista] = useAlmacen("pdgp-interferencias", []);
	const rol = useRol();
	const [abierto, setAbierto] = useState(false);
	const [editando, setEditando] = useState(null);
	const [form, setForm] = useState(NUEVA());
	const [aAnular, setAAnular] = useState(null);
	const [mensaje, setMensaje] = useState(null);
	const nombreProyecto = (id) => proyectos.find((p) => p.id === id)?.nombre ?? id;
	function abrirNueva() {
		setEditando(null);
		setForm(NUEVA());
		setAbierto(true);
	}
	function abrirEdicion(i) {
		setEditando(i);
		const { id: _id, codigo: _codigo, ...resto } = i;
		setForm(resto);
		setAbierto(true);
	}
	function guardar() {
		if (!form.titular.trim() || !form.descripcion.trim()) return setMensaje({
			tipo: "error",
			texto: "Indique el titular de la interferencia y descríbala."
		});
		if (editando) {
			const actualizada = {
				...editando,
				...form
			};
			const despues = lista.map((x) => x.id === editando.id ? actualizada : x);
			setLista(despues);
			registrarCambio(CLAVE_HISTORIAL, {
				accion: "Modificó interferencia",
				objeto: editando.codigo,
				antes: lista,
				despues
			}, BITACORA);
			setMensaje({
				tipo: "exito",
				texto: `Interferencia ${editando.codigo} actualizada.`
			});
		} else {
			const nueva = {
				id: idNuevo(),
				codigo: siguienteCodigo(lista),
				...form
			};
			const despues = [nueva, ...lista];
			setLista(despues);
			registrarCambio(CLAVE_HISTORIAL, {
				accion: "Registró interferencia",
				objeto: nueva.codigo,
				antes: lista,
				despues
			}, BITACORA);
			setMensaje({
				tipo: "exito",
				texto: `Interferencia ${nueva.codigo} registrada. Plazo de la empresa: 20 d.h. para presupuesto y cronograma (art. 43.2).`
			});
		}
		setAbierto(false);
	}
	function anular(motivo) {
		if (!aAnular) return;
		const despues = lista.map((x) => x.id === aAnular.id ? {
			...x,
			estado: "Anulada"
		} : x);
		setLista(despues);
		registrarCambio(CLAVE_HISTORIAL, {
			accion: "Anuló interferencia",
			objeto: aAnular.codigo,
			motivo,
			antes: lista,
			despues
		}, {
			...BITACORA,
			accion: "anular"
		});
		setMensaje({
			tipo: "exito",
			texto: `Interferencia ${aAnular.codigo} anulada.`
		});
		setAAnular(null);
	}
	const f = (k) => (v) => setForm((a) => ({
		...a,
		[k]: v
	}));
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		mensaje && /* @__PURE__ */ jsx("p", {
			role: mensaje.tipo === "error" ? "alert" : "status",
			className: `mb-4 rounded-md border px-3 py-2 text-sm ${mensaje.tipo === "error" ? "border-destructive bg-destructive-soft text-destructive" : "border-success bg-success-soft text-success"}`,
			children: mensaje.texto
		}),
		/* @__PURE__ */ jsx(CrudPage, {
			titulo: "Liberación de interferencias",
			icono: Network,
			descripcion: "Título VII del TUO del DL 1192: comunicación al titular, presupuesto en 20 d.h., observaciones en 15 d.h., inicio de trabajos en 30 días.",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: abrirNueva,
				children: [/* @__PURE__ */ jsx(Plus, {}), " Registrar interferencia"]
			}),
			columnas: [
				{
					clave: "codigo",
					titulo: "Código",
					ancho: "130px"
				},
				{
					clave: "proyecto",
					titulo: "Proyecto",
					render: (i) => nombreProyecto(i.proyecto)
				},
				{
					clave: "tipo",
					titulo: "Tipo"
				},
				{
					clave: "titular",
					titulo: "Titular"
				},
				{
					clave: "estado",
					titulo: "Estado",
					render: (i) => /* @__PURE__ */ jsx(StatusBadge, {
						tono: TONO[i.estado],
						children: i.estado
					})
				},
				{
					clave: "plazo",
					titulo: "Plazo vigente",
					ordenable: false,
					render: (i) => {
						const v = plazoVigente(i);
						if (!v) return /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: i.estado === "Liberada" ? `Liberada el ${fecha(d(i.fechaLiberacion))}` : "Sin plazo corriendo"
						});
						return /* @__PURE__ */ jsx(PlazoBadge, {
							vence: vencimiento(d(v.desde), v.p),
							etiqueta: `Art. ${v.p.articulo}`
						});
					}
				}
			],
			filas: lista,
			claveFila: (i) => i.id,
			filtros: [
				{
					clave: "estado",
					etiqueta: "Estado",
					opciones: Object.keys(TONO).map((e) => ({
						valor: e,
						texto: e
					}))
				},
				{
					clave: "tipo",
					etiqueta: "Tipo",
					opciones: TIPOS.map((t) => ({
						valor: t,
						texto: t
					}))
				},
				{
					clave: "proyecto",
					etiqueta: "Proyecto",
					opciones: proyectos.map((p) => ({
						valor: p.id,
						texto: p.nombre
					}))
				}
			],
			buscarEn: [
				"codigo",
				"titular",
				"ubicacion",
				"descripcion"
			],
			accionesFila: [{
				nombre: "Editar interferencia",
				icono: Pencil,
				onClick: abrirEdicion
			}, {
				nombre: "Anular interferencia",
				icono: Ban,
				destructiva: true,
				onClick: setAAnular,
				visible: (i) => i.estado !== "Anulada"
			}],
			onFilaClick: abrirEdicion,
			exportar: (v) => exportarExcel("interferencias", [
				{
					titulo: "Código",
					valor: (i) => i.codigo
				},
				{
					titulo: "Proyecto",
					valor: (i) => nombreProyecto(i.proyecto)
				},
				{
					titulo: "Tipo",
					valor: (i) => i.tipo
				},
				{
					titulo: "Titular",
					valor: (i) => i.titular
				},
				{
					titulo: "Ubicación",
					valor: (i) => i.ubicacion
				},
				{
					titulo: "Estado",
					valor: (i) => i.estado
				},
				{
					titulo: "Comunicación",
					valor: (i) => i.fechaComunicacion
				},
				{
					titulo: "Liberación",
					valor: (i) => i.fechaLiberacion
				}
			], v),
			vacio: "No hay interferencias registradas.",
			historial: {
				registro: CLAVE_HISTORIAL,
				etiquetas: ETIQUETAS,
				etiquetaFila: (i) => i.codigo,
				puedeRestaurar: rol === "ADMIN" || rol === "COORDINADOR",
				onRestaurar: (registro, n) => {
					const anterior = registro;
					setLista(anterior);
					registrarCambio(CLAVE_HISTORIAL, {
						accion: "Restauró una versión anterior",
						objeto: `versión ${n}`,
						antes: lista,
						despues: anterior
					}, BITACORA);
				}
			}
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto,
			onCerrar: () => setAbierto(false),
			ancho: "xl",
			titulo: editando ? `Interferencia ${editando.codigo}` : "Registrar interferencia",
			pie: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "outline",
				onClick: () => setAbierto(false),
				children: "Cancelar"
			}), /* @__PURE__ */ jsx(Button, {
				type: "button",
				onClick: guardar,
				children: editando ? "Guardar cambios" : "Registrar interferencia"
			})] }),
			children: /* @__PURE__ */ jsxs(FormGrid, { children: [
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Proyecto",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						className: controlClase,
						value: form.proyecto,
						onChange: (ev) => f("proyecto")(ev.target.value),
						children: proyectos.map((p) => /* @__PURE__ */ jsx("option", {
							value: p.id,
							children: p.nombre
						}, p.id))
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Tipo",
					obligatorio: true,
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						className: controlClase,
						value: form.tipo,
						onChange: (ev) => f("tipo")(ev.target.value),
						children: TIPOS.map((t) => /* @__PURE__ */ jsx("option", { children: t }, t))
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Titular del servicio",
					obligatorio: true,
					ayuda: "Empresa o entidad propietaria de la instalación",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: form.titular,
						onChange: (ev) => f("titular")(ev.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Ubicación",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						className: controlClase,
						value: form.ubicacion,
						onChange: (ev) => f("ubicacion")(ev.target.value),
						placeholder: "Progresiva, sector o predio"
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Estado",
					children: (id) => /* @__PURE__ */ jsx("select", {
						id,
						className: controlClase,
						value: form.estado,
						onChange: (ev) => f("estado")(ev.target.value),
						children: Object.keys(TONO).map((e) => /* @__PURE__ */ jsx("option", { children: e }, e))
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Comunicación al titular",
					obligatorio: true,
					icono: CalendarDays,
					ayuda: "Art. 43.1: abre 20 d.h. para presupuesto y cronograma",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: form.fechaComunicacion,
						onChange: (ev) => f("fechaComunicacion")(ev.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Presupuesto recibido",
					icono: CalendarDays,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: form.fechaPresupuesto,
						onChange: (ev) => f("fechaPresupuesto")(ev.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Observación de la entidad",
					icono: CalendarDays,
					ayuda: "Art. 43.3: la empresa levanta en 15 d.h.",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: form.fechaObservacion,
						onChange: (ev) => f("fechaObservacion")(ev.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Aprobación",
					icono: CalendarDays,
					ayuda: "Los trabajos inician en 30 días",
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: form.fechaAprobacion,
						onChange: (ev) => f("fechaAprobacion")(ev.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Inicio de trabajos",
					icono: CalendarDays,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: form.fechaInicio,
						onChange: (ev) => f("fechaInicio")(ev.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Liberación",
					icono: CalendarDays,
					children: (id) => /* @__PURE__ */ jsx("input", {
						id,
						type: "date",
						className: controlClase,
						value: form.fechaLiberacion,
						onChange: (ev) => f("fechaLiberacion")(ev.target.value)
					})
				}),
				/* @__PURE__ */ jsx(FormField, {
					etiqueta: "Descripción",
					obligatorio: true,
					ancho: "doble",
					children: (id) => /* @__PURE__ */ jsx("textarea", {
						id,
						rows: 2,
						className: `${controlClase} h-auto py-2`,
						value: form.descripcion,
						onChange: (ev) => f("descripcion")(ev.target.value)
					})
				})
			] })
		}),
		aAnular && /* @__PURE__ */ jsx(MotivoModal, {
			titulo: "Anular interferencia",
			descripcion: `La interferencia ${aAnular.codigo} pasará a estado Anulada. No se elimina: queda en la lista y en el histórico.`,
			accion: "Anular interferencia",
			onCerrar: () => setAAnular(null),
			onConfirmar: anular
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
export { InterferenciasPage as component };
