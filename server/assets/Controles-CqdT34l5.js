import { t as Button } from "./button-DH6ZQkjT.js";
import { y as tomarPosicion } from "./campo-Dn2b-x9H.js";
import { a as fotosDe, d as quitarFoto, g as useFotos, m as subirFoto, v as useUrlFoto } from "./fotos-CUnD_Pb7.js";
import { t as consultarReniec } from "./reniec-RuBzYGfh.js";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Camera, Check, Eraser, LocateFixed, Pencil, Search, Trash2 } from "lucide-react";
//#region src/components/campo/Controles.tsx
/**
* Controles del recolector de campo: grandes (48 px), texto de 16 px y una sola columna. Selecciones cortas
* como botones; fotos con la cámara trasera; firma en pantalla (docs/PLAN-RECOLECTOR-CAMPO.md §5).
*/
var controlCampo = "h-12 w-full rounded-md border border-input bg-card px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-60";
function Campo({ etiqueta, ayuda, obligatorio, error, htmlFor, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-5",
		children: [
			/* @__PURE__ */ jsxs("label", {
				htmlFor,
				className: "mb-1.5 block text-sm font-semibold text-foreground",
				children: [etiqueta, obligatorio && /* @__PURE__ */ jsx("span", {
					className: "ml-0.5 text-destructive",
					children: "*"
				})]
			}),
			children,
			ayuda && !error && /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: ayuda
			}),
			error && /* @__PURE__ */ jsx("p", {
				role: "alert",
				className: "mt-1 text-sm font-medium text-destructive",
				children: error
			})
		]
	});
}
function Texto({ etiqueta, valor, onChange, tipo = "text", inputMode, placeholder, obligatorio, ayuda, maxLength }) {
	const id = useId();
	return /* @__PURE__ */ jsx(Campo, {
		etiqueta,
		obligatorio,
		ayuda,
		htmlFor: id,
		children: /* @__PURE__ */ jsx("input", {
			id,
			type: tipo,
			inputMode,
			value: valor,
			maxLength,
			placeholder,
			onChange: (e) => onChange(e.target.value),
			className: controlCampo
		})
	});
}
function AreaTexto({ etiqueta, valor, onChange, placeholder, sugerencias, ayuda }) {
	const id = useId();
	return /* @__PURE__ */ jsxs(Campo, {
		etiqueta,
		ayuda,
		htmlFor: id,
		children: [/* @__PURE__ */ jsx("textarea", {
			id,
			rows: 3,
			value: valor,
			placeholder,
			onChange: (e) => onChange(e.target.value),
			className: `${controlCampo} h-auto py-2.5`
		}), sugerencias && /* @__PURE__ */ jsx("div", {
			className: "mt-2 flex flex-wrap gap-2",
			children: sugerencias.map((s) => /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => onChange(valor.trim() ? `${valor.trim()}; ${s}` : s),
				className: "min-h-11 rounded-full border border-border bg-card px-3 text-sm text-foreground hover:bg-muted",
				children: ["+ ", s]
			}, s))
		})]
	});
}
var valorDe = (o) => typeof o === "string" ? o : o.valor;
var etiquetaDe = (o) => typeof o === "string" ? o : o.etiqueta;
/** Elección única con botones (hasta 6 opciones); con más, un desplegable grande. */
function Chips({ etiqueta, opciones, valor, onChange, obligatorio, ayuda }) {
	const id = useId();
	if (opciones.length > 6) return /* @__PURE__ */ jsx(Campo, {
		etiqueta,
		obligatorio,
		ayuda,
		htmlFor: id,
		children: /* @__PURE__ */ jsxs("select", {
			id,
			value: valor,
			onChange: (e) => onChange(e.target.value),
			className: controlCampo,
			children: [/* @__PURE__ */ jsx("option", {
				value: "",
				children: "Seleccione…"
			}), opciones.map((o) => /* @__PURE__ */ jsx("option", {
				value: valorDe(o),
				children: etiquetaDe(o)
			}, valorDe(o)))]
		})
	});
	return /* @__PURE__ */ jsx(Campo, {
		etiqueta,
		obligatorio,
		ayuda,
		children: /* @__PURE__ */ jsx("div", {
			role: "group",
			"aria-label": etiqueta,
			className: "grid grid-cols-2 gap-2",
			children: opciones.map((o) => {
				const v = valorDe(o);
				const elegido = valor === v;
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					"aria-pressed": elegido,
					onClick: () => onChange(elegido ? "" : v),
					className: `flex min-h-12 items-center justify-center gap-1.5 rounded-md border px-2 text-center text-sm font-medium ${elegido ? "border-primary bg-primary-soft text-primary-dark" : "border-border bg-card text-foreground hover:bg-muted"}`,
					children: [elegido && /* @__PURE__ */ jsx(Check, {
						size: 16,
						"aria-hidden": true
					}), etiquetaDe(o)]
				}, v);
			})
		})
	});
}
function SiNo({ etiqueta, valor, onChange, obligatorio, ayuda }) {
	return /* @__PURE__ */ jsx(Chips, {
		etiqueta,
		obligatorio,
		ayuda,
		opciones: ["Sí", "No"],
		valor: valor === null ? "" : valor ? "Sí" : "No",
		onChange: (v) => v && onChange(v === "Sí")
	});
}
/**
* DNI con consulta a RENIEC (M9): al consultar, RENIEC devuelve nombres, estado civil, caducidad y
* domicilio, y la pantalla los toma con `onDatos`. Sin respuesta, se completa a mano.
*/
function ConsultaDni({ etiqueta = "DNI", valor, onChange, onDatos, obligatorio }) {
	const id = useId();
	const [consultando, setConsultando] = useState(false);
	const [estado, setEstado] = useState(null);
	async function consultar() {
		if (!/^\d{8}$/.test(valor)) {
			setEstado({
				ok: false,
				texto: "El DNI tiene 8 dígitos."
			});
			return;
		}
		setConsultando(true);
		setEstado(null);
		const d = await consultarReniec(valor).catch(() => null);
		setConsultando(false);
		if (!d) {
			setEstado({
				ok: false,
				texto: `RENIEC no devolvió datos para el DNI ${valor}. Revise el número o complete a mano.`
			});
			return;
		}
		onDatos(d);
		setEstado({
			ok: true,
			texto: `RENIEC: ${d.nombres}${d.simulado ? " (respuesta simulada: M9 sin convenio activo)" : ""}.`
		});
	}
	return /* @__PURE__ */ jsxs(Campo, {
		etiqueta,
		obligatorio,
		htmlFor: id,
		error: estado && !estado.ok ? estado.texto : void 0,
		ayuda: estado?.ok ? void 0 : "Escriba el DNI y pulse Consultar: RENIEC completa los datos.",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ jsx("input", {
				id,
				inputMode: "numeric",
				autoComplete: "off",
				value: valor,
				onChange: (e) => {
					onChange(e.target.value.replace(/\D/g, "").slice(0, 8));
					setEstado(null);
				},
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						consultar();
					}
				},
				className: controlCampo
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				className: "h-12 shrink-0 text-base",
				disabled: consultando,
				onClick: () => void consultar(),
				children: [
					/* @__PURE__ */ jsx(Search, {}),
					" ",
					consultando ? "Consultando…" : "Consultar"
				]
			})]
		}), estado?.ok && /* @__PURE__ */ jsx("p", {
			role: "status",
			className: "mt-1 text-sm font-medium text-success",
			children: estado.texto
		})]
	});
}
/** Posición del predio: «Tomar posición» con el GPS del equipo, o las coordenadas a mano. */
function Gps({ lat, lon, precision, onChange, obligatorio }) {
	const [cargando, setCargando] = useState(false);
	const [error, setError] = useState("");
	const idLat = useId();
	const idLon = useId();
	return /* @__PURE__ */ jsxs(Campo, {
		etiqueta: "Posición GPS",
		obligatorio,
		error,
		ayuda: precision ? `Precisión ±${precision} m. Si es mayor a 15 m, espere unos segundos y tome de nuevo.` : "Párese en el predio y tome la posición. Sin GPS, escriba las coordenadas (grados decimales).",
		children: [/* @__PURE__ */ jsxs(Button, {
			type: "button",
			variant: "outline",
			className: "mb-2 h-12 w-full text-base",
			disabled: cargando,
			onClick: async () => {
				setCargando(true);
				setError("");
				try {
					const p = await tomarPosicion();
					onChange({
						lat: String(p.lat),
						lon: String(p.lon),
						precision: String(p.precision)
					});
				} catch (e) {
					setError(e.message);
				} finally {
					setCargando(false);
				}
			},
			children: [
				/* @__PURE__ */ jsx(LocateFixed, {}),
				" ",
				cargando ? "Buscando señal…" : lat ? "Tomar de nuevo" : "Tomar posición"
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				htmlFor: idLat,
				className: "mb-1 block text-xs text-muted-foreground",
				children: "Latitud"
			}), /* @__PURE__ */ jsx("input", {
				id: idLat,
				inputMode: "decimal",
				value: lat,
				placeholder: "-11.78200",
				onChange: (e) => onChange({
					lat: e.target.value,
					lon,
					precision: ""
				}),
				className: controlCampo
			})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				htmlFor: idLon,
				className: "mb-1 block text-xs text-muted-foreground",
				children: "Longitud"
			}), /* @__PURE__ */ jsx("input", {
				id: idLon,
				inputMode: "decimal",
				value: lon,
				placeholder: "-75.47800",
				onChange: (e) => onChange({
					lat,
					lon: e.target.value,
					precision: ""
				}),
				className: controlCampo
			})] })]
		})]
	});
}
function Miniatura({ id, alt }) {
	const url = useUrlFoto(id, "miniatura");
	return url ? /* @__PURE__ */ jsx("img", {
		src: url,
		alt,
		className: "size-full object-cover"
	}) : /* @__PURE__ */ jsx("span", { className: "block size-full animate-pulse bg-muted" });
}
/**
* Fotos de un campo: abre la cámara trasera (o la galería), guarda cada foto en el almacén del sistema con
* su contexto y la posición del GPS si la foto no la trae. Se ven de inmediato en el expediente.
*/
function Fotos({ etiqueta, contexto, minimo = 0, maximo, gps, ayuda }) {
	const id = useId();
	const todas = useFotos();
	const fotos = useMemo(() => fotosDe(todas, {
		predio: contexto.predio,
		pantalla: contexto.pantalla,
		seccion: contexto.seccion,
		registro: contexto.registro,
		campo: contexto.campo
	}), [
		todas,
		contexto.predio,
		contexto.pantalla,
		contexto.seccion,
		contexto.registro,
		contexto.campo
	]);
	const [subiendo, setSubiendo] = useState(0);
	const [error, setError] = useState("");
	const lleno = maximo != null && fotos.length >= maximo;
	return /* @__PURE__ */ jsxs(Campo, {
		etiqueta,
		obligatorio: minimo > 0,
		error,
		ayuda: ayuda ?? (minimo ? `Mínimo ${minimo}. ${fotos.length === 1 ? "1 tomada" : `${fotos.length} tomadas`}.` : void 0),
		children: [fotos.length > 0 && /* @__PURE__ */ jsx("ul", {
			className: "mb-2 grid grid-cols-3 gap-2",
			children: fotos.map((f, i) => /* @__PURE__ */ jsxs("li", {
				className: "relative aspect-square overflow-hidden rounded-md border border-border",
				children: [/* @__PURE__ */ jsx(Miniatura, {
					id: f.id,
					alt: `${etiqueta} ${i + 1}`
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": `Quitar foto ${i + 1}`,
					onClick: () => void quitarFoto(f, "Quitada en campo antes de enviar"),
					className: "absolute right-1 top-1 flex size-11 items-center justify-center rounded-md bg-card/90 text-destructive",
					children: /* @__PURE__ */ jsx(Trash2, {
						size: 18,
						"aria-hidden": true
					})
				})]
			}, f.id))
		}), !lleno && /* @__PURE__ */ jsxs("label", {
			htmlFor: id,
			className: "flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-primary bg-primary-soft px-3 text-base font-semibold text-primary-dark hover:bg-primary-soft/70 focus-within:outline-2 focus-within:outline-primary",
			children: [
				/* @__PURE__ */ jsx(Camera, {
					size: 20,
					"aria-hidden": true
				}),
				subiendo ? subiendo === 1 ? "Guardando la foto…" : `Guardando ${subiendo} fotos…` : fotos.length ? "Tomar otra foto" : "Tomar foto",
				/* @__PURE__ */ jsx("input", {
					id,
					type: "file",
					accept: "image/*",
					capture: "environment",
					multiple: maximo == null || maximo > 1,
					className: "sr-only",
					onChange: async (e) => {
						const archivos = Array.from(e.target.files ?? []).slice(0, maximo != null ? maximo - fotos.length : void 0);
						e.target.value = "";
						setError("");
						setSubiendo(archivos.length);
						for (const a of archivos) {
							try {
								await subirFoto(a, contexto, contexto.campo, gps);
							} catch (err) {
								setError(err.message);
							}
							setSubiendo((n) => n - 1);
						}
					}
				})
			]
		})]
	});
}
/**
* Firma en pantalla con el dedo o el lápiz. Al guardarla queda como foto «Firma» del registro (PNG); para
* firma digital hace falta el servidor.
*/
function Firma({ etiqueta, contexto, gps }) {
	const lienzo = useRef(null);
	const trazando = useRef(false);
	const [vacio, setVacio] = useState(true);
	const [guardando, setGuardando] = useState(false);
	const guardada = fotosDe(useFotos(), {
		predio: contexto.predio,
		pantalla: contexto.pantalla,
		registro: contexto.registro,
		campo: contexto.campo
	})[0];
	useEffect(() => {
		const c = lienzo.current;
		if (!c) return;
		const ajustar = () => {
			const r = c.getBoundingClientRect();
			c.width = Math.round(r.width * devicePixelRatio);
			c.height = Math.round(r.height * devicePixelRatio);
			const ctx = c.getContext("2d");
			ctx.scale(devicePixelRatio, devicePixelRatio);
			ctx.lineWidth = 2.5;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.strokeStyle = "#1F2937";
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(0, 0, r.width, r.height);
			setVacio(true);
		};
		ajustar();
		window.addEventListener("resize", ajustar);
		return () => window.removeEventListener("resize", ajustar);
	}, [guardada]);
	const punto = (e) => {
		const r = e.currentTarget.getBoundingClientRect();
		return [e.clientX - r.left, e.clientY - r.top];
	};
	if (guardada) return /* @__PURE__ */ jsx(Campo, {
		etiqueta,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 rounded-md border border-success bg-success-soft p-3",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "h-16 w-28 overflow-hidden rounded-sm border border-border bg-card",
					children: /* @__PURE__ */ jsx(Miniatura, {
						id: guardada.id,
						alt: etiqueta
					})
				}),
				/* @__PURE__ */ jsx("span", {
					className: "flex-1 text-sm font-medium text-success",
					children: "Firma guardada"
				}),
				/* @__PURE__ */ jsxs(Button, {
					type: "button",
					variant: "outline",
					className: "h-11",
					onClick: () => void quitarFoto(guardada, "Firma rehecha en campo"),
					children: [/* @__PURE__ */ jsx(Pencil, {}), " Rehacer"]
				})
			]
		})
	});
	return /* @__PURE__ */ jsxs(Campo, {
		etiqueta,
		ayuda: "Firme con el dedo dentro del recuadro.",
		children: [/* @__PURE__ */ jsx("canvas", {
			ref: lienzo,
			"aria-label": `Recuadro de firma: ${etiqueta}`,
			className: "h-40 w-full touch-none rounded-md border border-input bg-card",
			onPointerDown: (e) => {
				e.currentTarget.setPointerCapture(e.pointerId);
				trazando.current = true;
				const ctx = e.currentTarget.getContext("2d");
				const [x, y] = punto(e);
				ctx.beginPath();
				ctx.moveTo(x, y);
			},
			onPointerMove: (e) => {
				if (!trazando.current) return;
				const ctx = e.currentTarget.getContext("2d");
				const [x, y] = punto(e);
				ctx.lineTo(x, y);
				ctx.stroke();
				setVacio(false);
			},
			onPointerUp: () => {
				trazando.current = false;
			}
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-2 grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				className: "h-12 text-base",
				onClick: () => {
					const c = lienzo.current;
					const ctx = c.getContext("2d");
					ctx.fillStyle = "#FFFFFF";
					ctx.fillRect(0, 0, c.width, c.height);
					setVacio(true);
				},
				children: [/* @__PURE__ */ jsx(Eraser, {}), " Limpiar"]
			}), /* @__PURE__ */ jsxs(Button, {
				type: "button",
				className: "h-12 text-base",
				disabled: vacio || guardando,
				onClick: () => {
					setGuardando(true);
					lienzo.current.toBlob(async (blob) => {
						if (blob) await subirFoto(new File([blob], "firma.png", { type: "image/png" }), contexto, contexto.campo, gps).catch(() => void 0);
						setGuardando(false);
					}, "image/png");
				},
				children: [
					/* @__PURE__ */ jsx(Check, {}),
					" ",
					guardando ? "Guardando…" : "Guardar firma"
				]
			})]
		})]
	});
}
/** Revisión antes de guardar: pares etiqueta/valor por paso, con «Editar» que vuelve a ese paso. */
function Resumen({ grupos, onEditar }) {
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-3",
		children: grupos.map((g) => /* @__PURE__ */ jsxs("section", {
			className: "rounded-lg border border-border bg-card p-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-sm font-semibold uppercase text-primary-dark",
					children: g.titulo
				}), onEditar && g.paso != null && /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onEditar(g.paso),
					className: "flex min-h-11 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary-dark underline underline-offset-2",
					children: [/* @__PURE__ */ jsx(Pencil, {
						size: 16,
						"aria-hidden": true
					}), " Editar"]
				})]
			}), /* @__PURE__ */ jsx("dl", {
				className: "grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-3 gap-y-1.5 text-sm",
				children: g.filas.map(([k, v]) => /* @__PURE__ */ jsxs("div", {
					className: "contents",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "text-muted-foreground",
						children: k
					}), /* @__PURE__ */ jsx("dd", {
						className: "break-words font-medium text-foreground",
						children: v?.trim() ? v : "—"
					})]
				}, k))
			})]
		}, g.titulo))
	});
}
//#endregion
export { Fotos as a, SiNo as c, Firma as i, Texto as l, Chips as n, Gps as o, ConsultaDni as r, Resumen as s, AreaTexto as t, controlCampo as u };
