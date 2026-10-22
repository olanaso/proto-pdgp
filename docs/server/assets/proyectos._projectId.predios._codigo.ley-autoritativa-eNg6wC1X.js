import { a as controlClase, n as FormField, r as FormGrid } from "./Form-DtuiyqJ8.js";
import { c as useHitosPredio, m as fecha, n as getProyecto, s as registrarHito } from "./archivosIdb-BbjJAFd8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { $ as estadoLey, J as usePerfilPredio, n as etiquetaProyecto, nt as useNormasProyecto, t as PredioEncabezado } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as Aviso } from "./Aviso-BQbaG--2.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as Historico } from "./Historico-CDc1UC-d.js";
import { t as Route$1 } from "./proyectos._projectId.predios._codigo.ley-autoritativa-Cz2Eg_Yl.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CJh5IDPU.js";
import { t as StepperEtapa } from "./StepperEtapa-DeL9JwoI.js";
import { n as PredioResumen, t as PredioSidebar } from "./PredioSidebar-v62B6yoq.js";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ExternalLink, History, Scale } from "lucide-react";
//#region src/routes/proyectos.$projectId.predios.$codigo.ley-autoritativa.tsx?tsr-split=component
var PASO = "ley-autoritativa";
var ESTADO = {
	VIGENTE: {
		texto: "Vigente",
		tono: "success"
	},
	CADUCA_PRONTO: {
		texto: "Caduca pronto",
		tono: "warning"
	},
	CADUCADA: {
		texto: "Caducada",
		tono: "destructive"
	},
	SIN_FECHA: {
		texto: "Sin fecha de vigencia",
		tono: "neutral"
	}
};
function Dato({ etiqueta, valor }) {
	return /* @__PURE__ */ jsx(FormField, {
		etiqueta,
		children: (id) => /* @__PURE__ */ jsx("input", {
			id,
			className: `${controlClase} bg-muted`,
			value: valor,
			readOnly: true
		})
	});
}
function LeyAutoritativaPage() {
	const { projectId, codigo } = Route$1.useParams();
	const c = decodeURIComponent(codigo);
	const projectLabel = etiquetaProyecto(getProyecto(projectId), projectId);
	const perfil = usePerfilPredio(projectId, c);
	const normas = useNormasProyecto(projectId);
	const hitos = useHitosPredio(c);
	const ley = perfil.ley;
	const estado = ley ? estadoLey(ley) : void 0;
	const caducadas = normas.leyes.filter((l) => (l.alcance === "proyecto" || l.predios.includes(c)) && estadoLey(l).estado === "CADUCADA");
	const inicio = ley ? ley.vigencia || ley.publicacion : "";
	const registrado = hitos.caducidad_ley;
	useEffect(() => {
		if (inicio && registrado?.fecha !== inicio) registrarHito(c, "caducidad_ley", inicio, PASO, "Vigencia de la ley autoritativa");
		if (!inicio && registrado?.pantalla === PASO) registrarHito(c, "caducidad_ley", "", PASO, "");
	}, [
		c,
		inicio,
		registrado?.fecha,
		registrado?.pantalla
	]);
	const enlaceNormas = /* @__PURE__ */ jsx(Button, {
		asChild: true,
		variant: "outline",
		size: "sm",
		children: /* @__PURE__ */ jsxs(Link, {
			to: "/proyectos/$projectId/normas-habilitantes",
			params: { projectId },
			children: [/* @__PURE__ */ jsx(ExternalLink, {}), " Normas habilitantes del proyecto"]
		})
	});
	return /* @__PURE__ */ jsxs(AppShell, {
		sidebar: /* @__PURE__ */ jsx(PredioSidebar, {
			projectId,
			codigo: c,
			projectLabel
		}),
		lateral: /* @__PURE__ */ jsx(PredioResumen, { codigo: c }),
		children: [
			/* @__PURE__ */ jsx(PredioEncabezado, {
				projectId,
				codigo: c,
				titulo: "Ley autoritativa y caducidad",
				icono: Scale,
				acciones: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(StatusBadge, {
					tono: estado ? ESTADO[estado.estado].tono : "destructive",
					children: estado ? ESTADO[estado.estado].texto : "Sin ley"
				}), enlaceNormas] })
			}),
			/* @__PURE__ */ jsx(StepperEtapa, {
				actual: PASO,
				projectId,
				codigo: c
			}),
			!ley && /* @__PURE__ */ jsx(Aviso, {
				tipo: "error",
				children: "No hay ley autoritativa vigente que alcance al predio. Sin ella la expropiación queda deshabilitada (art. 25). La ley se registra una vez en Normas habilitantes del proyecto y cada predio la hereda."
			}),
			estado?.estado === "CADUCA_PRONTO" && /* @__PURE__ */ jsxs(Aviso, {
				tipo: "aviso",
				children: [
					"La ley caduca el ",
					fecha(estado.caduca),
					", en ",
					estado.dias,
					" días (art. 33). Después de esa fecha no se puede expropiar con ella."
				]
			}),
			caducadas.map((l) => /* @__PURE__ */ jsxs(Aviso, {
				tipo: "info",
				children: [
					"La Ley N.º ",
					l.numero,
					" alcanzaba al predio y caducó el ",
					fecha(estadoLey(l).caduca),
					"."
				]
			}, l.id)),
			/* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "registro",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						className: "mb-3",
						children: [/* @__PURE__ */ jsx(TabsTrigger, {
							value: "registro",
							children: "Registro"
						}), /* @__PURE__ */ jsxs(TabsTrigger, {
							value: "historico",
							children: [/* @__PURE__ */ jsx(History, {
								size: 16,
								className: "mr-1",
								"aria-hidden": true
							}), " Histórico del proyecto"]
						})]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "registro",
						children: /* @__PURE__ */ jsxs(Section, {
							titulo: "Ley que alcanza al predio",
							children: [/* @__PURE__ */ jsx("p", {
								className: "mb-3 text-sm text-muted-foreground",
								children: "Vista de solo lectura. Para registrar, corregir o vincular otra ley, use Normas habilitantes del proyecto."
							}), ley && estado ? /* @__PURE__ */ jsxs(FormGrid, { children: [
								/* @__PURE__ */ jsx(Dato, {
									etiqueta: "Número de la ley",
									valor: `Ley N.º ${ley.numero}`
								}),
								/* @__PURE__ */ jsx(Dato, {
									etiqueta: "Nombre",
									valor: ley.nombre || "Sin nombre registrado"
								}),
								/* @__PURE__ */ jsx(Dato, {
									etiqueta: "Publicación en El Peruano",
									valor: fecha(ley.publicacion) || "Sin fecha"
								}),
								/* @__PURE__ */ jsx(Dato, {
									etiqueta: "Vigencia",
									valor: fecha(ley.vigencia) || "Sin fecha"
								}),
								/* @__PURE__ */ jsx(Dato, {
									etiqueta: "Alcance",
									valor: ley.alcance === "proyecto" ? "Todo el proyecto" : `Predios listados (${ley.predios.length})`
								}),
								/* @__PURE__ */ jsx(Dato, {
									etiqueta: "Caducidad (60 meses)",
									valor: fecha(estado.caduca)
								}),
								/* @__PURE__ */ jsx(Dato, {
									etiqueta: "Días restantes",
									valor: estado.dias !== void 0 ? `${estado.dias} días` : "Sin fecha"
								}),
								/* @__PURE__ */ jsx(Dato, {
									etiqueta: "Estado",
									valor: ESTADO[estado.estado].texto
								}),
								/* @__PURE__ */ jsx(FormField, {
									etiqueta: "Razón de necesidad pública",
									ancho: "doble",
									children: (id) => /* @__PURE__ */ jsx("textarea", {
										id,
										rows: 3,
										className: `${controlClase} h-auto bg-muted py-2`,
										value: ley.razon,
										readOnly: true
									})
								})
							] }) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Sin ley autoritativa vinculada."
							})]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "historico",
						children: /* @__PURE__ */ jsx(Section, {
							titulo: "Histórico · Normas habilitantes del proyecto",
							children: /* @__PURE__ */ jsx(Historico, {
								registro: `normas-${projectId}`,
								nombreArchivo: `historico-normas-${projectId}`
							})
						})
					})
				]
			})
		]
	});
}
//#endregion
export { LeyAutoritativaPage as component };
