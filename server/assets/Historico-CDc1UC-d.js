import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { h as fechaHora } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as diferencias, o as useHistorial, t as aplanar } from "./historial-Bc37nCTn.js";
import { Dt as BotonIcono, E as Modal, T as Confirmar, x as exportarExcel } from "./PredioEncabezado-FhqZ2Jv6.js";
import { n as Subtitulo } from "./Section-2P4M-r-S.js";
import { t as Tabla } from "./Tabla-m67oRvjV.js";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Download, Eye, GitCompare, History, RotateCcw } from "lucide-react";
//#region src/components/kit/Historico.tsx
var VISIBLES = 6;
/**
* Histórico de un registro: quién, cuándo, qué hizo y qué cambió campo por campo; ver el registro como
* estaba en una versión, comparar dos versiones, restaurar (crea una versión nueva) y exportar.
*/
function Historico({ registro, etiquetas = {}, puedeRestaurar = false, onRestaurar, nombreArchivo = "historico", filtroInicial = "" }) {
	const versiones = useHistorial(registro);
	const [texto, setTexto] = useState(filtroInicial);
	const [usuario, setUsuario] = useState("");
	const [accion, setAccion] = useState("");
	const [ver, setVer] = useState(null);
	const [comparar, setComparar] = useState(null);
	const [restaurar, setRestaurar] = useState(null);
	const conCambios = useMemo(() => versiones.map((v, i) => ({
		v,
		cambios: diferencias(versiones[i + 1]?.registro, v.registro, etiquetas)
	})), [versiones, etiquetas]);
	const usuarios = [...new Set(versiones.map((v) => v.usuario))];
	const acciones = [...new Set(versiones.map((v) => v.accion))];
	const t = texto.trim().toLowerCase();
	const filtradas = conCambios.filter(({ v, cambios }) => (!usuario || v.usuario === usuario) && (!accion || v.accion === accion) && (!t || `${v.accion} ${v.objeto} ${v.motivo ?? ""} ${cambios.map((c) => `${c.campo} ${c.antes} ${c.despues}`).join(" ")}`.toLowerCase().includes(t)));
	const exportar = () => exportarExcel(nombreArchivo, [
		{
			titulo: "Versión",
			valor: (f) => f.v.n
		},
		{
			titulo: "Fecha",
			valor: (f) => fechaHora(f.v.fecha)
		},
		{
			titulo: "Usuario",
			valor: (f) => f.v.usuario
		},
		{
			titulo: "Perfil",
			valor: (f) => f.v.perfil
		},
		{
			titulo: "Acción",
			valor: (f) => f.v.accion
		},
		{
			titulo: "Sobre",
			valor: (f) => f.v.objeto
		},
		{
			titulo: "Campo",
			valor: (f) => f.campo
		},
		{
			titulo: "Antes",
			valor: (f) => f.antes
		},
		{
			titulo: "Después",
			valor: (f) => f.despues
		},
		{
			titulo: "Motivo",
			valor: (f) => f.v.motivo ?? ""
		}
	], filtradas.flatMap(({ v, cambios }) => (cambios.length ? cambios : [{
		campo: "",
		antes: "",
		despues: ""
	}]).map((c) => ({
		...c,
		v
	}))));
	if (versiones.length === 0) return /* @__PURE__ */ jsx("p", {
		className: "rounded-md bg-background px-4 py-6 text-center text-sm text-muted-foreground",
		children: "Aún no hay versiones. Cada vez que se guarde un cambio quedará aquí con la fecha, el usuario y el detalle."
	});
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex flex-wrap items-end gap-2",
			children: [
				/* @__PURE__ */ jsxs("label", {
					className: "flex min-w-48 flex-1 flex-col gap-1 text-xs font-medium text-muted-foreground",
					children: ["Buscar", /* @__PURE__ */ jsx("input", {
						value: texto,
						onChange: (e) => setTexto(e.target.value),
						placeholder: "Campo, valor, acción o motivo",
						className: controlClase
					})]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
					children: ["Usuario", /* @__PURE__ */ jsxs("select", {
						value: usuario,
						onChange: (e) => setUsuario(e.target.value),
						className: `${controlClase} w-56`,
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Todos"
						}), usuarios.map((u) => /* @__PURE__ */ jsx("option", { children: u }, u))]
					})]
				}),
				/* @__PURE__ */ jsxs("label", {
					className: "flex flex-col gap-1 text-xs font-medium text-muted-foreground",
					children: ["Acción", /* @__PURE__ */ jsxs("select", {
						value: accion,
						onChange: (e) => setAccion(e.target.value),
						className: `${controlClase} w-48`,
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "Todas"
						}), acciones.map((a) => /* @__PURE__ */ jsx("option", { children: a }, a))]
					})]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: () => versiones.length > 1 && setComparar([versiones[1].n, versiones[0].n]),
					disabled: versiones.length < 2,
					children: [/* @__PURE__ */ jsx(GitCompare, {}), " Comparar versiones"]
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					onClick: exportar,
					children: [/* @__PURE__ */ jsx(Download, {}), " Exportar"]
				})
			]
		}),
		/* @__PURE__ */ jsxs("p", {
			className: "mb-2 text-xs text-muted-foreground",
			role: "status",
			children: [
				filtradas.length,
				" de ",
				versiones.length,
				" versiones"
			]
		}),
		/* @__PURE__ */ jsx(Tabla, {
			columnas: [
				{
					clave: "n",
					titulo: "Versión",
					ancho: "80px",
					render: ({ v }) => /* @__PURE__ */ jsxs("span", {
						className: "font-semibold tabular-nums",
						children: ["v", v.n]
					})
				},
				{
					clave: "fecha",
					titulo: "Fecha",
					render: ({ v }) => /* @__PURE__ */ jsx("span", {
						className: "whitespace-nowrap tabular-nums",
						children: fechaHora(v.fecha)
					})
				},
				{
					clave: "usuario",
					titulo: "Usuario",
					render: ({ v }) => v.usuario
				},
				{
					clave: "accion",
					titulo: "Acción",
					render: ({ v }) => /* @__PURE__ */ jsxs("span", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-medium",
							children: v.accion
						}),
						": ",
						v.objeto
					] })
				},
				{
					clave: "cambios",
					titulo: "Cambios",
					alinear: "derecha",
					render: ({ cambios }) => /* @__PURE__ */ jsx("span", {
						className: "tabular-nums",
						children: cambios.length
					})
				},
				{
					clave: "acciones",
					titulo: "Acciones",
					alinear: "derecha",
					render: ({ v }) => /* @__PURE__ */ jsxs("span", {
						className: "inline-flex gap-1",
						children: [/* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Ver detalle",
							icono: Eye,
							onClick: () => setVer(v)
						}), puedeRestaurar && onRestaurar && v.n !== versiones[0].n && /* @__PURE__ */ jsx(BotonIcono, {
							nombre: "Restaurar esta versión",
							icono: RotateCcw,
							onClick: () => setRestaurar(v)
						})]
					})
				}
			],
			filas: filtradas,
			claveFila: ({ v }) => String(v.n),
			vacio: "Ninguna versión coincide con los filtros."
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: ver !== null,
			onCerrar: () => setVer(null),
			ancho: "xl",
			titulo: ver ? `Versión ${ver.n}: ${ver.accion}` : "",
			descripcion: ver ? `${ver.objeto}. ${fechaHora(ver.fecha)} · ${ver.usuario}${ver.perfil ? ` · ${ver.perfil}` : ""}` : void 0,
			children: ver && /* @__PURE__ */ jsxs(Fragment$1, { children: [
				ver.motivo && /* @__PURE__ */ jsxs("p", {
					className: "mb-3 text-sm",
					children: ["Motivo: ", ver.motivo]
				}),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Qué cambió respecto a la versión anterior" }),
				(() => {
					const c = conCambios.find((x) => x.v.n === ver.n)?.cambios ?? [];
					return c.length ? /* @__PURE__ */ jsx(TablaCambios, {
						cambios: c,
						todos: true
					}) : /* @__PURE__ */ jsx("p", {
						className: "mb-3 text-sm text-muted-foreground",
						children: "Sin cambios de datos."
					});
				})(),
				/* @__PURE__ */ jsx(Subtitulo, { children: "Registro completo como quedó en esta versión" }),
				/* @__PURE__ */ jsx(RegistroComoEstaba, {
					registro: ver.registro,
					etiquetas
				})
			] })
		}),
		/* @__PURE__ */ jsx(Modal, {
			abierto: comparar !== null,
			onCerrar: () => setComparar(null),
			ancho: "xl",
			titulo: "Comparar versiones",
			descripcion: "Solo los campos que difieren entre las dos versiones.",
			children: comparar && /* @__PURE__ */ jsx(Comparador, {
				versiones,
				par: comparar,
				onPar: setComparar,
				etiquetas
			})
		}),
		/* @__PURE__ */ jsx(Confirmar, {
			abierto: restaurar !== null,
			onCerrar: () => setRestaurar(null),
			onConfirmar: () => restaurar && onRestaurar?.(restaurar.registro, restaurar.n),
			titulo: "Restaurar versión",
			texto: `El registro vuelve a como estaba en la versión ${restaurar?.n ?? ""}. Se guarda como una versión nueva; las posteriores siguen en el histórico.`,
			accion: "Restaurar versión"
		})
	] });
}
function TablaCambios({ cambios, todos: inicial = false }) {
	const [todos, setTodos] = useState(inicial);
	const visibles = todos ? cambios : cambios.slice(0, VISIBLES);
	return /* @__PURE__ */ jsxs("div", {
		className: "px-3 py-2",
		children: [/* @__PURE__ */ jsxs("table", {
			className: "w-full text-xs",
			children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
				/* @__PURE__ */ jsx("th", {
					className: "px-2 py-1 text-left",
					children: "Campo"
				}),
				/* @__PURE__ */ jsx("th", {
					className: "px-2 py-1 text-left",
					children: "Antes"
				}),
				/* @__PURE__ */ jsx("th", {
					className: "px-2 py-1 text-left",
					children: "Después"
				})
			] }) }), /* @__PURE__ */ jsx("tbody", { children: visibles.map((c) => /* @__PURE__ */ jsxs("tr", {
				className: "border-t border-border align-top",
				children: [
					/* @__PURE__ */ jsx("td", {
						className: "px-2 py-1 font-medium",
						children: c.campo
					}),
					/* @__PURE__ */ jsx("td", {
						className: "break-all px-2 py-1 text-muted-foreground",
						children: c.antes
					}),
					/* @__PURE__ */ jsx("td", {
						className: "break-all px-2 py-1",
						children: c.despues
					})
				]
			}, c.campo)) })]
		}), cambios.length > VISIBLES && /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => setTodos((v) => !v),
			className: "mt-1 text-xs font-medium text-primary-dark underline underline-offset-2",
			children: todos ? "Ver menos" : `Ver los ${cambios.length} cambios`
		})]
	});
}
function RegistroComoEstaba({ registro, etiquetas }) {
	return /* @__PURE__ */ jsx(Tabla, {
		columnas: [{
			clave: "campo",
			titulo: "Campo",
			render: (f) => /* @__PURE__ */ jsx("span", {
				className: "font-medium",
				children: f.campo
			})
		}, {
			clave: "valor",
			titulo: "Valor",
			render: (f) => /* @__PURE__ */ jsx("span", {
				className: "break-all",
				children: f.valor
			})
		}],
		filas: Object.entries(aplanar(registro, "", etiquetas)).map(([campo, valor]) => ({
			campo,
			valor
		})),
		claveFila: (f) => f.campo,
		vacio: "El registro estaba vacío."
	});
}
function Comparador({ versiones, par, onPar, etiquetas }) {
	const a = versiones.find((v) => v.n === par[0]);
	const b = versiones.find((v) => v.n === par[1]);
	const cambios = a && b ? diferencias(a.registro, b.registro, etiquetas) : [];
	const selector = (i) => /* @__PURE__ */ jsx("select", {
		value: par[i],
		onChange: (e) => onPar(i === 0 ? [Number(e.target.value), par[1]] : [par[0], Number(e.target.value)]),
		className: `${controlClase} w-auto`,
		"aria-label": i === 0 ? "Versión de origen" : "Versión de destino",
		children: versiones.map((v) => /* @__PURE__ */ jsxs("option", {
			value: v.n,
			children: [
				"v",
				v.n,
				" · ",
				fechaHora(v.fecha),
				" · ",
				v.accion
			]
		}, v.n))
	});
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-3 flex flex-wrap items-center gap-2 text-sm",
		children: [
			/* @__PURE__ */ jsx(History, {
				size: 16,
				className: "text-primary",
				"aria-hidden": true
			}),
			"Desde ",
			selector(0),
			" hasta ",
			selector(1)
		]
	}), cambios.length === 0 ? /* @__PURE__ */ jsx("p", {
		className: "rounded-md bg-background px-4 py-6 text-center text-sm text-muted-foreground",
		children: "Las dos versiones tienen los mismos datos."
	}) : /* @__PURE__ */ jsx(TablaCambios, { cambios })] });
}
//#endregion
export { Historico as t };
