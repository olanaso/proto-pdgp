import { h as fechaHora, n as getProyecto } from "./archivosIdb-BbjJAFd8.js";
import { a as prediosDelProyecto, n as etapaDelPredio, t as buscarPredios } from "./prediosProyecto-D1ASzaVD.js";
import { r as cn, t as Button } from "./button-DH6ZQkjT.js";
import { a as DropdownMenuRadioGroup, d as DropdownMenuTrigger, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuRadioItem, r as DropdownMenuItem, s as DropdownMenuSeparator, t as DropdownMenu } from "./dropdown-menu-D811JBGD.js";
import { a as TooltipProvider, n as StatusBadge, t as PlazoBadge } from "./Badges-LrNPShrl.js";
import { _ as registrarEnBitacora, l as MODULOS, p as BITACORA_EVENTO, u as ROLES } from "./historial-Bc37nCTn.js";
import { l as tienePermiso, r as cambiarRol, u as useRol } from "./permisos-C7yUz4DS.js";
import { n as useProyectosDelPerfil } from "./asignacion-Bv9JWe8m.js";
import { jt as useUsuarioSesion } from "./sujetoPasivo-Cz4oBCnt.js";
import { At as cerrarAyuda, Ct as recordarModulo, D as Dialog, E as Modal, Et as useRutaActual, Mt as terminarTutorial, Nt as useEstadoAyuda, O as DialogContent, St as moduloActual, Tt as useModuloRecordado, a as recordarProyecto, i as recientes, jt as iniciarTutorial, kt as alternarAyuda, n as etiquetaProyecto, o as ultimoProyecto, u as EtapaBadge } from "./PredioEncabezado-FhqZ2Jv6.js";
import { O as useAnuncios, g as lectorActual, j as vigentesParaUsuario, y as leido } from "./anuncios-CchLukSd.js";
import { t as CuerpoAnuncio } from "./Anuncio-BIz5COtU.js";
import { S as useAyudas, a as ayudaPublicada, b as ultimaActualizacion, c as desactualizada, f as duracionTexto, o as contenidoDe, v as puedeRedactarAyuda, w as nombreDeVista, y as registrarUsoAyuda } from "./manuales-BLjtkE55.js";
import { n as ReproductorVideo, t as Route$73 } from "./seguridad.manuales._id-ChMWGQFt.js";
import { c as alternarSidebar, d as PopoverContent, f as PopoverTrigger, g as usePedido, h as pedirContexto, m as faltaContexto, p as cerrarPedido, u as Popover } from "./AppShell-C-aaMtOy.js";
import { n as alertasDePlazos, t as Route$74 } from "./proyectos._projectId.index-BEW5q6c2.js";
import { t as Route$75 } from "./seguimiento-monitoreo.territorial-pagos-cierre-jt52MkNp.js";
import { t as Route$76 } from "./seguimiento-monitoreo.integrado-ceplan-siaf-CH4kcWPH.js";
import { t as Route$77 } from "./proyectos.registro-CeZ5611-.js";
import { t as Route$78 } from "./recolector-campo._projectId.index-spBnxS0Y.js";
import { t as Route$79 } from "./seguridad.anuncios._id-BNnW2dDo.js";
import { t as Route$80 } from "./recolector-campo._projectId.mapa-Db6UTN50.js";
import { t as Route$81 } from "./recolector-campo._projectId.enviar-B6lapGzF.js";
import { t as Route$82 } from "./proyectos._projectId.requerimientos-Bt1pjCG4.js";
import { t as Route$83 } from "./proyectos._projectId.padron-preliminar-Do2bRrO5.js";
import { t as Route$84 } from "./proyectos._projectId.padron-DhYhrgnh.js";
import { t as Route$85 } from "./proyectos._projectId.normas-habilitantes-CMEprl3k.js";
import { t as Route$86 } from "./proyectos._projectId.metas-CaCKwfFe.js";
import { t as Route$87 } from "./proyectos._projectId.mapa-DVr24YqD.js";
import { t as Route$88 } from "./proyectos._projectId.liberacion-bloque-Cj6Wa3qc.js";
import { t as Route$89 } from "./proyectos._projectId.expedientes-CRIQujRz.js";
import { t as Route$90 } from "./proyectos._projectId.evaluacion-informacion-CcwlkcWZ.js";
import { t as Route$91 } from "./proyectos._projectId.codigos-predios-97JSKP-O.js";
import { n as Route$92 } from "./proyectos._projectId.codigos-planos-DW_cZ9gw.js";
import { t as Route$93 } from "./proyectos._projectId.bim-DVqUAm3q.js";
import { t as Route$94 } from "./recolector-campo._projectId.padron.index-CkrfGwGH.js";
import { t as Route$95 } from "./recolector-campo._projectId.caracterizacion.index-CXux_sMy.js";
import { t as Route$96 } from "./proyectos._projectId.predios.index-Ci60g3hC.js";
import { t as Route$97 } from "./proyectos._projectId.base-grafica.index-DQEtbx_9.js";
import { t as Route$98 } from "./seguridad.roles._roleId.permisos-Di4GAAwd.js";
import { t as Route$99 } from "./recolector-campo._projectId.padron.nueva-DU5x7D0N.js";
import { t as Route$100 } from "./recolector-campo._projectId.padron._ficha-GkY9UyYS.js";
import { t as Route$101 } from "./recolector-campo._projectId.caracterizacion._codigo.index-0DMhmfTt.js";
import { t as Route$102 } from "./recolector-campo._projectId.caracterizacion._codigo.sujeto-pasivo-VXZ7jmTO.js";
import { t as Route$103 } from "./recolector-campo._projectId.caracterizacion._codigo.notificacion-CwMr3kqB.js";
import { t as Route$104 } from "./recolector-campo._projectId.caracterizacion._codigo.empadronamiento-8KT5UDyX.js";
import { t as Route$105 } from "./recolector-campo._projectId.caracterizacion._codigo.caracterizacion-predio-CbQ1XF1Y.js";
import { t as Route$106 } from "./proyectos._projectId.predios._codigo.transferencia-interestatal-sbn-Y3GNjvOA.js";
import { t as Route$107 } from "./proyectos._projectId.predios._codigo.transferencia-documentaria-opat-CJRvkxNp.js";
import { t as Route$108 } from "./proyectos._projectId.predios._codigo.sujeto-pasivo-Cx2ROOOd.js";
import { t as Route$109 } from "./proyectos._projectId.predios._codigo.saneamiento-registral-km37HpuE.js";
import { t as Route$110 } from "./proyectos._projectId.predios._codigo.revision-tasacion-CgZTAvEp.js";
import { t as Route$111 } from "./proyectos._projectId.predios._codigo.respuesta-sujeto-pasivo-DzRGF1KO.js";
import { t as Route$112 } from "./proyectos._projectId.predios._codigo.resolucion-sbn-D-ljLTQm.js";
import { t as Route$113 } from "./proyectos._projectId.predios._codigo.requerimiento-tasacion-itl-BO-JZWYq.js";
import { t as Route$114 } from "./proyectos._projectId.predios._codigo.requerimiento-entrega-Bdrw_Xhr.js";
import { t as Route$115 } from "./proyectos._projectId.predios._codigo.reconocimiento-mejoras-5vSRk7iL.js";
import { t as Route$116 } from "./proyectos._projectId.predios._codigo.publicacion-oposiciones-rjzHVZUj.js";
import { t as Route$117 } from "./proyectos._projectId.predios._codigo.publicacion-notificacion-norma-CCrbNUZW.js";
import { t as Route$118 } from "./proyectos._projectId.predios._codigo.plan-saneamiento-BHBZNsKS.js";
import { t as Route$119 } from "./proyectos._projectId.predios._codigo.perito-contratacion-DtxS7spe.js";
import { t as Route$120 } from "./proyectos._projectId.predios._codigo.pago-propietarios-BOhH2Cgs.js";
import { t as Route$121 } from "./proyectos._projectId.predios._codigo.pago-consignacion-BAWuzXY0.js";
import { t as Route$122 } from "./proyectos._projectId.predios._codigo.monitoreo-EpUaqz3n.js";
import { t as Route$123 } from "./proyectos._projectId.predios._codigo.modalidad-adquisicion-DlVLOJmo.js";
import { t as Route$124 } from "./proyectos._projectId.predios._codigo.liberacion-anticipada-areas-yyRYUyxS.js";
import { t as Route$125 } from "./proyectos._projectId.predios._codigo.ley-autoritativa-Cz2Eg_Yl.js";
import { t as Route$126 } from "./proyectos._projectId.predios._codigo.levantamiento-informacion-tecnica-C7OlE4V1.js";
import { t as Route$127 } from "./proyectos._projectId.predios._codigo.inscripcion-sunarp-C1MTsqFG.js";
import { t as Route$128 } from "./proyectos._projectId.predios._codigo.inscripcion-registral-sid-BbfXDntt.js";
import { t as Route$129 } from "./proyectos._projectId.predios._codigo.inscripcion-registral-D_euwjWE.js";
import { t as Route$130 } from "./proyectos._projectId.predios._codigo.inicio-expropiacion-D7d6Reh5.js";
import { t as Route$131 } from "./proyectos._projectId.predios._codigo.informe-verificador-especialista-DMYkWFwI.js";
import { t as Route$132 } from "./proyectos._projectId.predios._codigo.informe-tecnico-legal-expropiacion-NdeMr0AZ.js";
import { t as Route$133 } from "./proyectos._projectId.predios._codigo.informe-tecnico-legal-B-oJXNs7.js";
import { t as Route$134 } from "./proyectos._projectId.predios._codigo.identificacion-codificacion-D7srUBdS.js";
import { t as Route$135 } from "./proyectos._projectId.predios._codigo.gestion-resolucion-rd-viyf4Z-J.js";
import { t as Route$136 } from "./proyectos._projectId.predios._codigo.gestion-devengado-C8jljC1A.js";
import { t as Route$137 } from "./proyectos._projectId.predios._codigo.formulario-registral-ofEDEtSI.js";
import { t as Route$138 } from "./proyectos._projectId.predios._codigo.expropiacion-DDRLVvZu.js";
import { t as Route$139 } from "./proyectos._projectId.predios._codigo.expediente-tasacion-DxlZVD6Q.js";
import { t as Route$140 } from "./proyectos._projectId.predios._codigo.expediente-digital-GvWgDocz.js";
import { t as Route$141 } from "./proyectos._projectId.predios._codigo.expediente-afectacion-DbLRJq8V.js";
import { t as Route$142 } from "./proyectos._projectId.predios._codigo.entrega-recepcion-ddp-opat-D7JhAY-0.js";
import { t as Route$143 } from "./proyectos._projectId.predios._codigo.entrega-provisional-BMm1yR2J.js";
import { t as Route$144 } from "./proyectos._projectId.predios._codigo.entrega-posesion-B6Bd0vry.js";
import { t as Route$145 } from "./proyectos._projectId.predios._codigo.entrega-anticipada-DxkSPVS1.js";
import { t as Route$146 } from "./proyectos._projectId.predios._codigo.entidad-titular-1gQs95YX.js";
import { t as Route$147 } from "./proyectos._projectId.predios._codigo.empadronamiento-inspeccion-campo-DG79aik1.js";
import { t as Route$148 } from "./proyectos._projectId.predios._codigo.elevacion-expediente-CGM7LOX_.js";
import { t as Route$149 } from "./proyectos._projectId.predios._codigo.ejecucion-coactiva-BHPJKrMo.js";
import { t as Route$150 } from "./proyectos._projectId.predios._codigo.discrepancias-CEuUcuW3.js";
import { t as Route$151 } from "./proyectos._projectId.predios._codigo.diagnostico-preliminar-BGHufh47.js";
import { t as Route$152 } from "./proyectos._projectId.predios._codigo.declaratoria-DuA9TGfO.js";
import { t as Route$153 } from "./proyectos._projectId.predios._codigo.datos-tecnicos-DadIdWb1.js";
import { t as Route$154 } from "./proyectos._projectId.predios._codigo.datos-legales-DU-RPnRf.js";
import { t as Route$155 } from "./proyectos._projectId.predios._codigo.consignacion-0rsAP5Ot.js";
import { t as Route$156 } from "./proyectos._projectId.predios._codigo.comunicacion-afectacion-C71jlhcp.js";
import { t as Route$157 } from "./proyectos._projectId.predios._codigo.certificado-registral-inmobiliario-CcA2m-KV.js";
import { t as Route$158 } from "./proyectos._projectId.predios._codigo.certificacion-presupuestal-ccp-BHgOW1O5.js";
import { t as Route$159 } from "./proyectos._projectId.predios._codigo.cbc-180Ur2Tv.js";
import { t as Route$160 } from "./proyectos._projectId.predios._codigo.carta-intencion-DM7e4C4N.js";
import { t as Route$161 } from "./proyectos._projectId.predios._codigo.caracterizacion-predio-7PbZe92q.js";
import { t as Route$162 } from "./proyectos._projectId.predios._codigo.asignacion-predial-DOSsQxJO.js";
import { t as Route$163 } from "./proyectos._projectId.predios._codigo.arbitraje-rmAs_m_P.js";
import { t as Route$164 } from "./proyectos._projectId.predios._codigo.anotacion-preventiva-XfHoTgh0.js";
import { t as Route$165 } from "./proyectos._projectId.predios._codigo.afectado-bloque-BmdU0pHm.js";
import { t as Route$166 } from "./proyectos._projectId.predios._codigo.acuerdo-mejoras-CZP6lxJj.js";
import { t as Route$167 } from "./proyectos._projectId.predios._codigo.levantamiento-informacion-tecnica_.partidas-registrales-CRcZvGOS.js";
import * as React from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useNavigate, useParams, useRouter, useRouterState } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Bell, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Download, FileStack, FileText, FolderOpen, GraduationCap, LogOut, MapPinned, Megaphone, PanelLeft, Play, Search, UserRound, Video, X } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Command } from "cmdk";
//#region src/styles.css?url
var styles_default = "/assets/styles-BouKr4Uj.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/components/kit/Tutorial.tsx
var MARGEN = 6;
var ANCHO_BURBUJA = 320;
/**
* Tutorial guiado: resalta el elemento de cada paso (oscurece el resto con cuatro paneles, sin sombras) y
* muestra una burbuja con Anterior, Siguiente y Salir. Los pasos cuyo elemento no está en la pantalla
* (otro perfil, pantalla vacía) se omiten y se avisa cuántos fueron.
*/
function Tutorial({ pasos, onTerminar, onCompletado }) {
	const { disponibles, omitidos } = useMemo(() => {
		const ok = [];
		for (const p of pasos) try {
			if (document.querySelector(p.selector)) ok.push(p);
		} catch {}
		return {
			disponibles: ok,
			omitidos: pasos.length - ok.length
		};
	}, [pasos]);
	const [i, setI] = useState(0);
	const [caja, setCaja] = useState(null);
	const paso = disponibles[i];
	useLayoutEffect(() => {
		if (!paso) return;
		const el = document.querySelector(paso.selector);
		if (!el) return;
		el.scrollIntoView({
			block: "center",
			behavior: "instant"
		});
		const medir = () => {
			const r = el.getBoundingClientRect();
			setCaja({
				top: r.top - MARGEN,
				left: r.left - MARGEN,
				width: r.width + 2 * MARGEN,
				height: r.height + 2 * MARGEN
			});
		};
		medir();
		window.addEventListener("resize", medir);
		window.addEventListener("scroll", medir, true);
		return () => {
			window.removeEventListener("resize", medir);
			window.removeEventListener("scroll", medir, true);
		};
	}, [paso]);
	useEffect(() => {
		const tecla = (e) => {
			if (e.key === "Escape") onTerminar();
			if (e.key === "ArrowRight") setI((x) => Math.min(x + 1, disponibles.length - 1));
			if (e.key === "ArrowLeft") setI((x) => Math.max(x - 1, 0));
		};
		window.addEventListener("keydown", tecla);
		return () => window.removeEventListener("keydown", tecla);
	}, [disponibles.length, onTerminar]);
	if (disponibles.length === 0) return /* @__PURE__ */ jsxs("div", {
		role: "dialog",
		"aria-label": "Tutorial",
		className: "fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-md rounded-lg border border-border bg-card p-4 text-sm",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3",
			children: "Este tutorial no tiene pasos que se puedan mostrar en esta pantalla."
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			size: "sm",
			onClick: onTerminar,
			children: "Cerrar"
		})]
	});
	const ultimo = i === disponibles.length - 1;
	const vw = typeof window === "undefined" ? 1200 : window.innerWidth;
	const vh = typeof window === "undefined" ? 800 : window.innerHeight;
	const burbuja = caja ? {
		left: Math.max(8, Math.min(caja.left, vw - ANCHO_BURBUJA - 8)),
		top: caja.top + caja.height + 12 + 180 < vh ? caja.top + caja.height + 12 : Math.max(8, caja.top - 12 - 180)
	} : {
		left: 8,
		top: 8
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-[70]",
		role: "dialog",
		"aria-label": "Tutorial guiado",
		"aria-modal": "true",
		children: [caja ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-0 top-0 bg-foreground/60",
				style: { height: Math.max(0, caja.top) }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-0 bottom-0 bg-foreground/60",
				style: { top: caja.top + caja.height }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute left-0 bg-foreground/60",
				style: {
					top: caja.top,
					height: caja.height,
					width: Math.max(0, caja.left)
				}
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute right-0 bg-foreground/60",
				style: {
					top: caja.top,
					height: caja.height,
					left: caja.left + caja.width
				}
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute rounded-md border-2 border-primary",
				style: {
					top: caja.top,
					left: caja.left,
					width: caja.width,
					height: caja.height
				}
			})
		] }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-foreground/60" }), /* @__PURE__ */ jsxs("div", {
			className: "absolute rounded-lg border border-border bg-card p-4",
			style: {
				...burbuja,
				width: Math.min(ANCHO_BURBUJA, vw - 16)
			},
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-1 flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-xs font-semibold uppercase text-muted-foreground",
						children: [
							"Paso ",
							i + 1,
							" de ",
							disponibles.length
						]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onTerminar,
						"aria-label": "Salir del tutorial",
						className: "rounded-sm text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})]
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mb-1 text-base font-semibold text-foreground",
					children: paso.titulo
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mb-3 text-sm text-foreground",
					children: paso.texto
				}),
				omitidos > 0 && i === 0 && /* @__PURE__ */ jsxs("p", {
					className: "mb-3 text-xs text-muted-foreground",
					children: [
						omitidos,
						" ",
						omitidos === 1 ? "paso se omitió" : "pasos se omitieron",
						" porque su elemento no está en esta pantalla."
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: i === 0,
						onClick: () => setI(i - 1),
						children: [/* @__PURE__ */ jsx(ChevronLeft, {}), " Anterior"]
					}), ultimo ? /* @__PURE__ */ jsx(Button, {
						type: "button",
						size: "sm",
						onClick: () => {
							onCompletado?.();
							onTerminar();
						},
						children: "Terminar"
					}) : /* @__PURE__ */ jsxs(Button, {
						type: "button",
						size: "sm",
						onClick: () => setI(i + 1),
						children: ["Siguiente ", /* @__PURE__ */ jsx(ChevronRight, {})]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/shell/PanelAyuda.tsx
var CLAVE_VISTO = "pdgp-ayuda-tutorial-visto";
function yaVisto(ruta) {
	try {
		const m = JSON.parse(localStorage.getItem(CLAVE_VISTO) ?? "{}");
		return Boolean(m[`${lectorActual()}|${ruta}`]);
	} catch {
		return false;
	}
}
function marcarVisto(ruta) {
	try {
		const m = JSON.parse(localStorage.getItem(CLAVE_VISTO) ?? "{}");
		m[`${lectorActual()}|${ruta}`] = (/* @__PURE__ */ new Date()).toISOString();
		localStorage.setItem(CLAVE_VISTO, JSON.stringify(m));
	} catch {}
}
var tamanoTexto = (b) => b == null ? "" : b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;
/**
* Ayuda de la pantalla abierta: panel lateral con manual, video y tutorial, la tecla F1, el aviso de
* "esta pantalla tiene tutorial" y el tutorial guiado. Se monta una sola vez en la raíz.
*/
function PanelAyuda() {
	const ruta = useRutaActual();
	const rol = useRol();
	const ayudas = useAyudas();
	const estado = useEstadoAyuda();
	const ayuda = useMemo(() => ayudaPublicada(ayudas, ruta, rol), [
		ayudas,
		ruta,
		rol
	]);
	const [pestana, setPestana] = useState("manual");
	const [videoIdx, setVideoIdx] = useState(0);
	const [grande, setGrande] = useState(false);
	const [aviso, setAviso] = useState(false);
	const [prueba, setPrueba] = useState(null);
	const registrado = useRef("");
	const contenido = ayuda ? contenidoDe(ayuda) : {
		manual: false,
		video: false,
		tutorial: false
	};
	const pestanas = [
		"manual",
		"video",
		"tutorial"
	].filter((p) => contenido[p]);
	useEffect(() => {
		const tecla = (e) => {
			const el = e.target;
			const escribiendo = el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
			if (e.key === "F1" || e.key === "?" && !escribiendo && !e.ctrlKey && !e.metaKey) {
				e.preventDefault();
				alternarAyuda();
			}
			if (e.key === "Escape" && estado.abierto && !estado.tutorial) cerrarAyuda();
		};
		window.addEventListener("keydown", tecla);
		return () => window.removeEventListener("keydown", tecla);
	}, [estado.abierto, estado.tutorial]);
	useEffect(() => {
		if (!estado.abierto || !ayuda) return;
		const inicial = estado.pestana && contenido[estado.pestana] ? estado.pestana : pestanas[0] ?? "manual";
		setPestana(inicial);
		setVideoIdx(0);
	}, [estado.abierto, ayuda?.id]);
	useEffect(() => {
		if (!estado.abierto || !ayuda || registrado.current === `${ayuda.id}|${pestana}`) return;
		registrado.current = `${ayuda.id}|${pestana}`;
		if (pestana === "video") registrarUsoAyuda(ayuda, "video", ayuda.videos[videoIdx]?.nombre);
		else if (pestana === "manual") registrarUsoAyuda(ayuda, "manual");
	}, [
		estado.abierto,
		ayuda,
		pestana,
		videoIdx
	]);
	useEffect(() => {
		setAviso(false);
		if (!ayuda || !contenido.tutorial || yaVisto(ruta)) return;
		const t = window.setTimeout(() => setAviso(true), 800);
		return () => window.clearTimeout(t);
	}, [ayuda?.id, ruta]);
	useEffect(() => {
		const id = new URLSearchParams(window.location.search).get("probar");
		if (!id || !puedeRedactarAyuda(rol)) return;
		const a = ayudas.find((x) => x.id === id);
		if (!a?.tutorial) return;
		setPrueba(a);
		const t = window.setTimeout(iniciarTutorial, 700);
		return () => window.clearTimeout(t);
	}, [ruta, ayudas.length]);
	useEffect(() => {
		cerrarAyuda();
		terminarTutorial();
	}, [ruta]);
	const verAyuda = ayuda;
	const videoActual = verAyuda?.videos[videoIdx];
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		aviso && !estado.abierto && !estado.tutorial && ayuda && /* @__PURE__ */ jsxs("div", {
			role: "status",
			className: "fixed bottom-4 right-4 z-40 flex max-w-sm items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm",
			"data-print-hidden": true,
			children: [
				/* @__PURE__ */ jsx(GraduationCap, {
					size: 18,
					className: "mt-0.5 shrink-0 text-primary",
					"aria-hidden": true
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-medium text-foreground",
						children: "Esta pantalla tiene un tutorial."
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							size: "sm",
							onClick: () => {
								marcarVisto(ruta);
								setAviso(false);
								iniciarTutorial();
							},
							children: "Ver tutorial"
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => {
								marcarVisto(ruta);
								setAviso(false);
							},
							children: "No volver a mostrar"
						})]
					})]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": "Cerrar aviso",
					onClick: () => setAviso(false),
					className: "rounded-sm text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ jsx(X, { size: 16 })
				})
			]
		}),
		estado.tutorial && (prueba ?? ayuda)?.tutorial && /* @__PURE__ */ jsx(Tutorial, {
			pasos: (prueba ?? ayuda).tutorial.pasos,
			onTerminar: terminarTutorial,
			onCompletado: () => registrarUsoAyuda(prueba ?? ayuda, "tutorial")
		}),
		estado.abierto && /* @__PURE__ */ jsxs("aside", {
			"aria-label": "Ayuda de esta pantalla",
			className: "fixed bottom-0 right-0 top-14 z-40 flex w-full flex-col border-l border-border bg-card sm:w-[420px]",
			"data-print-hidden": true,
			children: [/* @__PURE__ */ jsxs("header", {
				className: "flex items-start justify-between gap-2 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "flex items-center gap-1 text-xs font-semibold uppercase text-muted-foreground",
						children: [/* @__PURE__ */ jsx(CircleHelp, {
							size: 14,
							"aria-hidden": true
						}), " Ayuda"]
					}), /* @__PURE__ */ jsx("h2", {
						className: "text-base font-semibold text-foreground",
						children: verAyuda?.titulo ?? nombreDeVista(ruta)
					})]
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: cerrarAyuda,
					"aria-label": "Cerrar la ayuda",
					className: "rounded-sm text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ jsx(X, { size: 18 })
				})]
			}), !verAyuda ? /* @__PURE__ */ jsxs("div", {
				className: "space-y-3 p-4 text-sm",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-foreground",
					children: "Esta vista aún no tiene manual ni video."
				}), puedeRedactarAyuda(rol) && /* @__PURE__ */ jsx(Button, {
					asChild: true,
					size: "sm",
					onClick: cerrarAyuda,
					children: /* @__PURE__ */ jsx(Link, {
						to: "/seguridad/manuales/$id",
						params: { id: "nuevo" },
						search: { vista: ruta },
						children: "Redactar en Seguridad y configuración"
					})
				})]
			}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex gap-1 border-b border-border px-3 py-2",
					role: "tablist",
					"aria-label": "Contenido de la ayuda",
					children: pestanas.map((p) => /* @__PURE__ */ jsxs("button", {
						type: "button",
						role: "tab",
						"aria-selected": pestana === p,
						onClick: () => setPestana(p),
						className: `inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium ${pestana === p ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary-soft"}`,
						children: [p === "manual" ? /* @__PURE__ */ jsx(FileText, { size: 14 }) : p === "video" ? /* @__PURE__ */ jsx(Video, { size: 14 }) : /* @__PURE__ */ jsx(GraduationCap, { size: 14 }), p === "manual" ? "Manual" : p === "video" ? `Video (${verAyuda.videos.length})` : "Tutorial"]
					}, p))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "min-h-0 flex-1 overflow-y-auto p-4",
					children: [
						pestanas.length === 0 && /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Esta ayuda aún no tiene contenido."
						}),
						pestana === "manual" && verAyuda.manual && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("p", {
								className: "mb-3 text-xs text-muted-foreground",
								children: [
									"Actualizado el ",
									fechaHora(verAyuda.manual.actualizadoEl),
									" por",
									" ",
									verAyuda.manual.actualizadoPor
								]
							}),
							verAyuda.semilla && /* @__PURE__ */ jsx("p", {
								className: "mb-3 rounded-md border border-border bg-muted px-3 py-2 text-xs",
								children: "Contenido de demostración generado por el sistema."
							}),
							/* @__PURE__ */ jsx(CuerpoAnuncio, { html: verAyuda.manual.contenido }),
							verAyuda.manual.pdf && /* @__PURE__ */ jsx(FilaPdf, { doc: verAyuda.manual.pdf }),
							verAyuda.enlaces.length > 0 && /* @__PURE__ */ jsx("ul", {
								className: "mt-4 space-y-1 text-sm",
								children: verAyuda.enlaces.map((e) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
									href: e.url,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "font-medium text-primary-dark underline underline-offset-2",
									children: e.texto
								}) }, e.url))
							})
						] }),
						pestana === "video" && videoActual && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(ReproductorVideo, {
								url: videoActual.url,
								titulo: videoActual.nombre
							}, videoActual.url),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 text-sm font-semibold text-foreground",
								children: videoActual.nombre
							}),
							videoActual.descripcion && /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-foreground",
								children: videoActual.descripcion
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									duracionTexto(videoActual.duracion) && `${duracionTexto(videoActual.duracion)} · `,
									"Subido el ",
									fechaHora(videoActual.subidoEl),
									" por ",
									videoActual.subidoPor
								]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								className: "mt-3",
								onClick: () => setGrande(true),
								children: [/* @__PURE__ */ jsx(Play, {}), " Ver en grande"]
							}),
							verAyuda.videos.length > 1 && /* @__PURE__ */ jsx("ul", {
								className: "mt-4 divide-y divide-border rounded-md border border-border text-sm",
								children: verAyuda.videos.map((v, k) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => {
										setVideoIdx(k);
										registrarUsoAyuda(verAyuda, "video", v.nombre);
									},
									className: `flex w-full items-center justify-between gap-2 px-3 py-2 text-left hover:bg-primary-soft ${k === videoIdx ? "bg-primary-soft font-medium" : ""}`,
									children: [/* @__PURE__ */ jsx("span", {
										className: "min-w-0 truncate",
										children: v.nombre
									}), /* @__PURE__ */ jsx("span", {
										className: "shrink-0 text-xs text-muted-foreground",
										children: duracionTexto(v.duracion)
									})]
								}) }, v.url))
							})
						] }),
						pestana === "tutorial" && verAyuda.tutorial && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("p", {
								className: "mb-2 text-sm text-foreground",
								children: [
									"Recorrido guiado de ",
									verAyuda.tutorial.pasos.length,
									" pasos sobre esta pantalla."
								]
							}),
							/* @__PURE__ */ jsx("ol", {
								className: "mb-4 list-decimal space-y-1 pl-5 text-sm text-foreground",
								children: verAyuda.tutorial.pasos.map((p) => /* @__PURE__ */ jsx("li", { children: p.titulo }, p.titulo + p.selector))
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								onClick: iniciarTutorial,
								children: [/* @__PURE__ */ jsx(GraduationCap, {}), " Iniciar tutorial"]
							})
						] })
					]
				}),
				/* @__PURE__ */ jsx(DocumentosDeLaAyuda, {
					ayuda: verAyuda,
					verVigencia: puedeRedactarAyuda(rol)
				})
			] })]
		}),
		videoActual && /* @__PURE__ */ jsx(Modal, {
			abierto: grande,
			onCerrar: () => setGrande(false),
			ancho: "xl",
			titulo: videoActual.nombre,
			descripcion: `Subido el ${fechaHora(videoActual.subidoEl)} por ${videoActual.subidoPor}`,
			children: grande && /* @__PURE__ */ jsx(ReproductorVideo, {
				url: videoActual.url,
				titulo: videoActual.nombre
			})
		})
	] });
}
function FilaPdf({ doc }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("p", {
				className: "truncate font-medium text-foreground",
				children: doc.nombre
			}), /* @__PURE__ */ jsxs("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Versión ",
					doc.version,
					tamanoTexto(doc.tamano) && ` · ${tamanoTexto(doc.tamano)}`,
					" · ",
					fechaHora(doc.subidoEl)
				]
			})]
		}), /* @__PURE__ */ jsx(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			children: /* @__PURE__ */ jsxs("a", {
				href: doc.url,
				download: doc.nombre,
				target: doc.origen === "enlace" ? "_blank" : void 0,
				rel: "noopener noreferrer",
				children: [/* @__PURE__ */ jsx(Download, {}), " Descargar"]
			})
		})]
	});
}
/** Tabla al pie del panel: cada documento de la ayuda con su versión, fecha de subida y quién lo subió. */
function DocumentosDeLaAyuda({ ayuda, verVigencia }) {
	const filas = [];
	if (ayuda.manual) filas.push({
		clave: "manual",
		tipo: "Manual",
		nombre: ayuda.manual.pdf ? "Texto del manual" : "Manual",
		fecha: ayuda.manual.actualizadoEl,
		quien: ayuda.manual.actualizadoPor
	});
	if (ayuda.manual?.pdf) filas.push({
		clave: "pdf",
		tipo: "PDF",
		nombre: ayuda.manual.pdf.nombre,
		version: ayuda.manual.pdf.version,
		fecha: ayuda.manual.pdf.subidoEl,
		quien: ayuda.manual.pdf.subidoPor
	});
	ayuda.videos.forEach((v, k) => filas.push({
		clave: `v${k}`,
		tipo: "Video",
		nombre: v.nombre,
		version: v.version,
		fecha: v.subidoEl,
		quien: v.subidoPor
	}));
	if (ayuda.tutorial) filas.push({
		clave: "tutorial",
		tipo: "Tutorial",
		nombre: `${ayuda.tutorial.pasos.length} pasos`,
		fecha: ayuda.tutorial.actualizadoEl,
		quien: ayuda.tutorial.actualizadoPor
	});
	if (filas.length === 0) return null;
	return /* @__PURE__ */ jsxs("footer", {
		className: "border-t border-border bg-background px-4 py-3",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "mb-2 flex items-center justify-between gap-2 text-xs font-semibold uppercase text-muted-foreground",
			children: ["Documentos de esta ayuda", verVigencia && desactualizada(ultimaActualizacion(ayuda)) && /* @__PURE__ */ jsx(StatusBadge, {
				tono: "warning",
				children: "Revisar vigencia"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "max-h-36 overflow-y-auto",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-xs",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
					className: "text-left text-muted-foreground",
					children: [
						/* @__PURE__ */ jsx("th", {
							className: "py-1 pr-2 font-medium",
							children: "Tipo"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "py-1 pr-2 font-medium",
							children: "Nombre"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "py-1 pr-2 font-medium",
							children: "Subido"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "py-1 font-medium",
							children: "Por"
						})
					]
				}) }), /* @__PURE__ */ jsx("tbody", { children: filas.map((f) => /* @__PURE__ */ jsxs("tr", {
					className: "border-t border-border align-top",
					children: [
						/* @__PURE__ */ jsx("td", {
							className: "py-1 pr-2",
							children: f.tipo
						}),
						/* @__PURE__ */ jsxs("td", {
							className: "max-w-28 truncate py-1 pr-2",
							title: f.nombre,
							children: [f.nombre, f.version ? ` · v${f.version}` : ""]
						}),
						/* @__PURE__ */ jsx("td", {
							className: "whitespace-nowrap py-1 pr-2 tabular-nums",
							children: fechaHora(f.fecha)
						}),
						/* @__PURE__ */ jsx("td", {
							className: "max-w-24 truncate py-1",
							title: f.quien,
							children: f.quien
						})
					]
				}, f.clave)) })]
			})
		})]
	});
}
//#endregion
//#region src/components/shell/contexto.ts
var RUTA_PROYECTO = /^\/proyectos\/(?!registro(?:\/|$))([^/]+)(?:\/predios\/([^/]+))?/;
/** Proyecto y predio que nombra la ruta, sin consultar nada más. */
function proyectoDeRuta(pathname) {
	const m = RUTA_PROYECTO.exec(pathname);
	if (!m) return {};
	return {
		projectId: decodeURIComponent(m[1]),
		codigo: m[2] ? decodeURIComponent(m[2]) : void 0
	};
}
function contextoDeRuta(pathname, moduloRecordado) {
	const { projectId, codigo } = proyectoDeRuta(pathname);
	if (projectId && codigo) {
		const etapa = etapaDelPredio(codigo);
		return {
			tipo: "predio",
			projectId,
			codigo,
			texto: `Predio ${codigo}${etapa ? ` · Etapa ${etapa.etapa} ${etapa.corto}` : ""}`
		};
	}
	if (projectId) {
		const proyecto = getProyecto(projectId);
		return {
			tipo: "proyecto",
			projectId,
			texto: `Proyecto ${proyecto?.codigo ?? projectId} · ${etiquetaProyecto(proyecto, projectId)}`
		};
	}
	const modulo = moduloActual(pathname, moduloRecordado);
	return {
		tipo: "modulo",
		texto: `Módulo ${modulo.numero} · ${modulo.nombre}`
	};
}
//#endregion
//#region src/components/ui/command.tsx
var Command$1 = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command, {
	ref,
	className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
	...props
}));
Command$1.displayName = Command.displayName;
var CommandDialog = ({ children, ...props }) => {
	return /* @__PURE__ */ jsx(Dialog, {
		...props,
		children: /* @__PURE__ */ jsx(DialogContent, {
			className: "overflow-hidden p-0",
			children: /* @__PURE__ */ jsx(Command$1, {
				className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
				children
			})
		})
	});
};
var CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", {
	className: "flex items-center border-b px-3",
	"cmdk-input-wrapper": "",
	children: [/* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ jsx(Command.Input, {
		ref,
		className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	})]
}));
CommandInput.displayName = Command.Input.displayName;
var CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command.List, {
	ref,
	className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
	...props
}));
CommandList.displayName = Command.List.displayName;
var CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(Command.Empty, {
	ref,
	className: "py-6 text-center text-sm",
	...props
}));
CommandEmpty.displayName = Command.Empty.displayName;
var CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command.Group, {
	ref,
	className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
	...props
}));
CommandGroup.displayName = Command.Group.displayName;
var CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command.Separator, {
	ref,
	className: cn("-mx-1 h-px bg-border", className),
	...props
}));
CommandSeparator.displayName = Command.Separator.displayName;
var CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command.Item, {
	ref,
	className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className),
	...props
}));
CommandItem.displayName = Command.Item.displayName;
var CommandShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ jsx("span", {
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
		...props
	});
};
CommandShortcut.displayName = "CommandShortcut";
//#endregion
//#region src/components/shell/CommandPalette.tsx
/** Buscador global (Ctrl+K): módulos, pantallas y predios del proyecto activo. */
function CommandPalette({ abierto, onCerrar }) {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const params = {
		...useParams({ strict: false }),
		...proyectoDeRuta(pathname)
	};
	const [consulta, setConsulta] = useState("");
	const rol = useRol();
	const visibles = MODULOS.filter((m) => !m.oculto && tienePermiso(rol, m.numero, "Lectura"));
	const projectId = proyectoDeRuta(pathname).projectId ?? (abierto ? ultimoProyecto() : void 0);
	const predios = projectId && consulta.trim().length >= 2 ? buscarPredios(projectId, consulta, 8) : [];
	useEffect(() => {
		if (!abierto) setConsulta("");
	}, [abierto, pathname]);
	const ir = (numero, to, nombre) => {
		recordarModulo(numero);
		onCerrar();
		if (faltaContexto(to, params)) setTimeout(() => pedirContexto({
			to,
			nombre,
			params
		}), 0);
		else navigate({
			to,
			params
		});
	};
	const abrirPredio = (p) => {
		onCerrar();
		navigate({
			to: p.etapa.ruta,
			params: {
				projectId,
				codigo: p.codigo
			}
		});
	};
	return /* @__PURE__ */ jsxs(CommandDialog, {
		open: abierto,
		onOpenChange: (v) => !v && onCerrar(),
		children: [/* @__PURE__ */ jsx(CommandInput, {
			value: consulta,
			onValueChange: setConsulta,
			placeholder: "Módulo, pantalla o predio (código, sujeto pasivo, partida)"
		}), /* @__PURE__ */ jsxs(CommandList, { children: [
			/* @__PURE__ */ jsx(CommandEmpty, { children: "No hay módulos, pantallas ni predios con ese nombre." }),
			predios.length > 0 && projectId && /* @__PURE__ */ jsx(CommandGroup, {
				heading: `Predios · ${etiquetaProyecto(getProyecto(projectId), projectId)}`,
				children: predios.map((p) => /* @__PURE__ */ jsxs(CommandItem, {
					value: `predio ${p.buscar}`,
					onSelect: () => abrirPredio(p),
					children: [
						/* @__PURE__ */ jsx(MapPinned, {
							size: 16,
							className: "text-primary"
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "block truncate font-mono text-xs font-semibold",
								children: p.cod
							}), /* @__PURE__ */ jsx("span", {
								className: "block truncate text-xs text-muted-foreground",
								children: p.sujeto
							})]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "shrink-0 text-xs text-muted-foreground",
							children: [
								"Etapa ",
								p.etapa.etapa,
								" · ",
								p.etapa.corto
							]
						})
					]
				}, p.codigo))
			}),
			/* @__PURE__ */ jsx(CommandGroup, {
				heading: "Módulos",
				children: visibles.map((m) => /* @__PURE__ */ jsxs(CommandItem, {
					value: `modulo ${m.numero} ${m.nombre}`,
					onSelect: () => ir(m.numero, m.to, m.nombre),
					children: [
						/* @__PURE__ */ jsx(m.icono, {
							size: 16,
							className: "text-primary"
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-xs text-muted-foreground",
							children: ["M", m.numero]
						}),
						/* @__PURE__ */ jsx("span", { children: m.nombre })
					]
				}, m.numero))
			}),
			/* @__PURE__ */ jsx(CommandGroup, {
				heading: "Pantallas",
				children: visibles.flatMap((m) => m.secciones.flatMap((s) => s.pantallas.map((p) => /* @__PURE__ */ jsxs(CommandItem, {
					value: `${p.nombre} ${s.nombre} ${m.nombre}`,
					onSelect: () => ir(m.numero, p.to, p.nombre),
					children: [/* @__PURE__ */ jsxs("span", { children: [p.nombre, faltaContexto(p.to, params) && "…"] }), /* @__PURE__ */ jsxs("span", {
						className: "ml-auto text-xs text-muted-foreground",
						children: [
							"M",
							m.numero,
							" · ",
							s.nombre
						]
					})]
				}, `${m.numero}-${s.nombre}-${p.nombre}`))))
			})
		] })]
	});
}
//#endregion
//#region src/components/shell/Notificaciones.tsx
/** Campana de la barra superior: anuncios sin leer y plazos legales por vencer o vencidos. */
function Notificaciones() {
	const [alertas, setAlertas] = useState([]);
	const [abierto, setAbierto] = useState(false);
	const datos = useAnuncios();
	const rol = useRol();
	const [lector, setLector] = useState("");
	useEffect(() => setLector(lectorActual()), []);
	const anuncios = lector ? vigentesParaUsuario(datos.anuncios, rol).filter((a) => !leido(datos, a.id, lector)) : [];
	useEffect(() => {
		const cargar = () => setAlertas(alertasDePlazos());
		cargar();
		window.addEventListener("storage", cargar);
		window.addEventListener(BITACORA_EVENTO, cargar);
		window.addEventListener("focus", cargar);
		return () => {
			window.removeEventListener("storage", cargar);
			window.removeEventListener(BITACORA_EVENTO, cargar);
			window.removeEventListener("focus", cargar);
		};
	}, []);
	const urgentes = alertas.filter((a) => a.estado !== "verde").length + anuncios.length;
	const hayVencidos = alertas.some((a) => a.estado === "rojo") || anuncios.some((a) => a.prioridad === "importante");
	return /* @__PURE__ */ jsxs(Popover, {
		open: abierto,
		onOpenChange: (v) => {
			setAbierto(v);
			if (v) setAlertas(alertasDePlazos());
		},
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				"aria-label": urgentes ? `Notificaciones: ${anuncios.length} anuncios sin leer y ${urgentes - anuncios.length} plazos por atender` : "Notificaciones",
				className: "relative flex size-10 items-center justify-center rounded-md hover:bg-primary-dark",
				children: [/* @__PURE__ */ jsx(Bell, {
					size: 20,
					"aria-hidden": true
				}), urgentes > 0 && /* @__PURE__ */ jsx("span", {
					className: `absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-sm px-1 text-xs font-bold ${hayVencidos ? "bg-card text-destructive" : "bg-highlight text-highlight-foreground"}`,
					children: urgentes
				})]
			})
		}), /* @__PURE__ */ jsxs(PopoverContent, {
			align: "end",
			className: "w-96 p-0",
			children: [
				anuncios.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "border-b border-border",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-b-2 border-primary px-4 py-2",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-bold uppercase text-primary-dark",
							children: "Anuncios sin leer"
						}), /* @__PURE__ */ jsx(Link, {
							to: "/anuncios",
							onClick: () => setAbierto(false),
							className: "text-xs font-medium text-primary-dark underline underline-offset-2",
							children: "Ver todos"
						})]
					}), /* @__PURE__ */ jsx("ul", {
						className: "max-h-48 overflow-y-auto",
						children: anuncios.map((a) => /* @__PURE__ */ jsx("li", {
							className: "border-b border-border last:border-b-0",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/anuncios",
								hash: a.id,
								onClick: () => setAbierto(false),
								className: "flex items-start gap-2 px-4 py-2 hover:bg-muted",
								children: [/* @__PURE__ */ jsx(Megaphone, {
									size: 16,
									className: `mt-0.5 shrink-0 ${a.prioridad === "importante" ? "text-destructive" : "text-primary"}`,
									"aria-hidden": true
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium",
									children: a.titulo
								})]
							})
						}, a.id))
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border-b-2 border-primary px-4 py-2",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-bold uppercase text-primary-dark",
						children: "Plazos legales"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: alertas.length ? `${alertas.length} plazos corriendo · ${urgentes} requieren atención` : "Sin plazos abiertos"
					})]
				}),
				/* @__PURE__ */ jsxs("ul", {
					className: "max-h-96 overflow-y-auto",
					children: [alertas.length === 0 && /* @__PURE__ */ jsx("li", {
						className: "px-4 py-6 text-center text-sm text-muted-foreground",
						children: "Los plazos aparecen aquí cuando una pantalla registra la fecha que los abre."
					}), alertas.map((a) => /* @__PURE__ */ jsx("li", {
						className: "border-b border-border last:border-b-0",
						children: /* @__PURE__ */ jsxs(Link, {
							to: a.ruta,
							onClick: () => setAbierto(false),
							className: "block px-4 py-2 hover:bg-muted",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium",
									children: a.texto
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"M",
										a.modulo,
										" · ",
										a.registro
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1",
									children: /* @__PURE__ */ jsx(PlazoBadge, { vence: a.vence })
								})
							]
						})
					}, a.id))]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/shell/ElegirContexto.tsx
/** Selector de proyecto y predio para abrir pantallas que viven dentro de ellos. */
var LIMITE = 50;
var normal = (t) => t.trim().toLocaleLowerCase("es-PE");
/** Diálogo único del selector (lo monta la barra superior); el pedido vive en `seleccionContexto`. */
function ElegirContexto() {
	const actual = usePedido();
	return actual ? /* @__PURE__ */ jsx(Selector, { actual }, actual.id) : null;
}
function Selector({ actual }) {
	const navigate = useNavigate();
	const [proyectoElegido, setProyectoElegido] = useState(actual.params.projectId);
	const [texto, setTexto] = useState("");
	const [ultimo] = useState(ultimoProyecto);
	const recientesDelProyecto = useMemo(() => proyectoElegido ? recientes(proyectoElegido) : [], [proyectoElegido]);
	const pidePredio = String(actual.to).includes("$codigo");
	const paso = proyectoElegido ? "predio" : "proyecto";
	const t = normal(texto);
	const abrir = (projectId, codigo) => {
		cerrarPedido();
		navigate({
			to: actual.to,
			params: codigo ? {
				projectId,
				codigo
			} : { projectId }
		});
	};
	const elegirProyecto = (id) => {
		if (!pidePredio) return abrir(id);
		setProyectoElegido(id);
		setTexto("");
	};
	return /* @__PURE__ */ jsxs(Modal, {
		abierto: true,
		onCerrar: cerrarPedido,
		ancho: "md",
		titulo: paso === "proyecto" ? "Elija el proyecto" : "Elija el predio",
		descripcion: pidePredio ? `«${actual.nombre}» es una pantalla del expediente de un predio${paso === "proyecto" ? ": primero el proyecto, luego el predio" : ""}.` : `«${actual.nombre}» se abre dentro de un proyecto.`,
		children: [paso === "predio" && proyectoElegido && /* @__PURE__ */ jsxs("div", {
			className: "mb-3 flex flex-wrap items-center justify-between gap-2 rounded-md bg-background px-3 py-2 text-sm",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ jsx(FolderOpen, {
					size: 16,
					className: "shrink-0 text-primary",
					"aria-hidden": true
				}), /* @__PURE__ */ jsxs("span", {
					className: "truncate",
					children: ["Proyecto: ", /* @__PURE__ */ jsx("b", { children: etiquetaProyecto(getProyecto(proyectoElegido), proyectoElegido) })]
				})]
			}), /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => {
					setProyectoElegido(void 0);
					setTexto("");
				},
				className: "flex items-center gap-1 rounded-sm text-xs font-medium text-primary-dark hover:underline",
				children: [/* @__PURE__ */ jsx(ArrowLeft, {
					size: 14,
					"aria-hidden": true
				}), " Cambiar proyecto"]
			})]
		}), /* @__PURE__ */ jsxs(Command$1, {
			shouldFilter: false,
			className: "rounded-md border border-border",
			children: [/* @__PURE__ */ jsx(CommandInput, {
				autoFocus: true,
				value: texto,
				onValueChange: setTexto,
				placeholder: paso === "proyecto" ? "Código o nombre del proyecto" : "Código, sujeto pasivo, partida o resolución",
				"aria-label": paso === "proyecto" ? "Buscar proyecto" : "Buscar predio"
			}), paso === "proyecto" ? /* @__PURE__ */ jsx(ListaProyectos, {
				texto: t,
				ultimo,
				onElegir: elegirProyecto
			}) : /* @__PURE__ */ jsx(ListaPredios, {
				texto: t,
				predios: prediosDelProyecto(proyectoElegido),
				recientes: recientesDelProyecto,
				onElegir: (codigo) => abrir(proyectoElegido, codigo)
			})]
		}, `${paso}-${proyectoElegido ?? ""}`)]
	});
}
function ListaProyectos({ texto, ultimo, onElegir }) {
	const { lista: delPerfil } = useProyectosDelPerfil();
	const lista = delPerfil.filter((p) => !texto || normal(`${p.codigo} ${p.nombre} ${p.tipo} ${p.fase}`).includes(texto));
	const primero = ultimo ? lista.find((p) => p.id === ultimo) : void 0;
	const resto = lista.filter((p) => p !== primero);
	const fila = (p) => /* @__PURE__ */ jsx(CommandItem, {
		value: p.id,
		onSelect: () => onElegir(p.id),
		className: "items-start gap-2",
		children: /* @__PURE__ */ jsxs("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ jsx("span", {
				className: "block truncate text-sm font-semibold",
				children: etiquetaProyecto(p, p.id)
			}), /* @__PURE__ */ jsxs("span", {
				className: "block truncate text-xs text-muted-foreground",
				children: [
					p.codigo,
					" · ",
					p.fase
				]
			})]
		})
	}, p.id);
	return /* @__PURE__ */ jsxs(CommandList, {
		className: "max-h-80",
		children: [
			/* @__PURE__ */ jsx(CommandEmpty, { children: "Ningún proyecto coincide." }),
			primero && /* @__PURE__ */ jsx(CommandGroup, {
				heading: "Último proyecto abierto",
				children: fila(primero)
			}),
			resto.length > 0 && /* @__PURE__ */ jsx(CommandGroup, {
				heading: `Proyectos (${resto.length})`,
				children: resto.map(fila)
			})
		]
	});
}
function ListaPredios({ texto, predios, recientes: codigosRecientes, onElegir }) {
	const recientesSesion = texto ? [] : codigosRecientes.map((c) => predios.find((p) => p.codigo === c)).filter((p) => Boolean(p));
	const coincidencias = predios.filter((p) => (!texto || p.buscar.includes(texto)) && !recientesSesion.includes(p));
	const fila = (p) => /* @__PURE__ */ jsxs(CommandItem, {
		value: p.codigo,
		onSelect: () => onElegir(p.codigo),
		className: "items-center gap-3",
		children: [/* @__PURE__ */ jsxs("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ jsx("span", {
				className: "block truncate font-mono text-xs font-semibold",
				children: p.cod
			}), /* @__PURE__ */ jsx("span", {
				className: "block truncate text-xs text-muted-foreground",
				children: p.sujeto
			})]
		}), /* @__PURE__ */ jsx(EtapaBadge, { etapa: p.etapa })]
	}, p.codigo);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(CommandList, {
		className: "max-h-80",
		children: [
			/* @__PURE__ */ jsx(CommandEmpty, { children: "Ningún predio coincide con la búsqueda." }),
			recientesSesion.length > 0 && /* @__PURE__ */ jsx(CommandGroup, {
				heading: "Abiertos en esta sesión",
				children: recientesSesion.map(fila)
			}),
			coincidencias.length > 0 && /* @__PURE__ */ jsx(CommandGroup, {
				heading: `Predios (${coincidencias.length})`,
				children: coincidencias.slice(0, LIMITE).map(fila)
			})
		]
	}), coincidencias.length > LIMITE && /* @__PURE__ */ jsxs("p", {
		className: "border-t border-border px-3 py-2 text-xs text-muted-foreground",
		children: [
			"Se muestran ",
			LIMITE,
			" de ",
			coincidencias.length,
			". Escriba para acotar la búsqueda."
		]
	})] });
}
//#endregion
//#region src/components/shell/TopBar.tsx
/** Barra superior fija de 56 px. Una sola instancia, en la raíz del router. */
function TopBar() {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const contexto = contextoDeRuta(pathname, useModuloRecordado());
	const [buscador, setBuscador] = useState(false);
	const rol = useRol();
	const yo = useUsuarioSesion();
	useEffect(() => {
		if (contexto.projectId) recordarProyecto(contexto.projectId);
	}, [contexto.projectId]);
	useEffect(() => {
		const onKey = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setBuscador((v) => !v);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const cerrarSesion = () => {
		registrarEnBitacora({
			modulo: 8,
			entidad: "sesion",
			registro: "cierre",
			accion: "salida",
			detalle: "Cierre de sesión desde la barra superior"
		});
		try {
			localStorage.removeItem("mtc-session");
			sessionStorage.clear();
		} catch {}
		navigate({
			to: "/",
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-50 flex h-14 items-center gap-3 bg-primary px-3 text-primary-foreground",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: alternarSidebar,
				"aria-label": "Mostrar u ocultar el menú",
				title: "Mostrar u ocultar el menú",
				className: "flex size-10 items-center justify-center rounded hover:bg-primary-dark",
				children: /* @__PURE__ */ jsx(PanelLeft, { size: 20 })
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/inicio",
				className: "truncate text-base font-bold",
				title: "Ir al portal de módulos",
				children: "PDGP · MTC"
			}),
			pathname !== "/inicio" && /* @__PURE__ */ jsx("span", {
				className: "hidden min-w-0 truncate rounded bg-primary-dark px-2 py-1 text-xs font-semibold md:inline",
				title: contexto.texto,
				children: contexto.texto
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => setBuscador(true),
				className: "ml-auto flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded border border-primary-soft/40 bg-card text-left text-sm text-muted-foreground hover:border-card sm:w-full sm:max-w-md sm:shrink sm:justify-start sm:px-3",
				"aria-label": "Buscar módulo, pantalla o predio",
				title: "Buscar módulo, pantalla o predio (Ctrl K)",
				children: [
					/* @__PURE__ */ jsx(Search, {
						size: 16,
						"aria-hidden": true
					}),
					/* @__PURE__ */ jsx("span", {
						className: "hidden flex-1 truncate sm:inline",
						children: "Buscar módulo, pantalla o predio"
					}),
					/* @__PURE__ */ jsx("kbd", {
						className: "hidden rounded border border-border px-1.5 text-xs sm:inline",
						children: "Ctrl K"
					})
				]
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/anuncios",
				"aria-label": "Anuncios",
				title: "Anuncios",
				className: "hidden size-10 items-center justify-center rounded-md hover:bg-primary-dark sm:flex",
				children: /* @__PURE__ */ jsx(Megaphone, {
					size: 20,
					"aria-hidden": true
				})
			}),
			/* @__PURE__ */ jsx(Notificaciones, {}),
			/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "flex h-10 items-center gap-2 rounded-md px-2 text-sm hover:bg-primary-dark",
					"aria-label": `Perfil: ${ROLES[rol]}`,
					children: [
						/* @__PURE__ */ jsx(UserRound, {
							size: 18,
							"aria-hidden": true
						}),
						/* @__PURE__ */ jsx("span", {
							className: "hidden max-w-40 truncate lg:inline",
							children: ROLES[rol]
						}),
						/* @__PURE__ */ jsx(ChevronDown, {
							size: 14,
							"aria-hidden": true
						})
					]
				})
			}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
				align: "end",
				className: "w-64",
				children: [
					/* @__PURE__ */ jsx(DropdownMenuLabel, {
						className: "text-xs text-muted-foreground",
						children: "Perfil de demostración (sin autenticación real)"
					}),
					/* @__PURE__ */ jsx(DropdownMenuRadioGroup, {
						value: rol,
						onValueChange: (v) => cambiarRol(v),
						children: Object.keys(ROLES).map((r) => /* @__PURE__ */ jsx(DropdownMenuRadioItem, {
							value: r,
							children: ROLES[r]
						}, r))
					}),
					/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
					/* @__PURE__ */ jsx(DropdownMenuItem, {
						asChild: true,
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/anuncios",
							children: [/* @__PURE__ */ jsx(Megaphone, {
								size: 16,
								"aria-hidden": true
							}), " Anuncios"]
						})
					}),
					yo && /* @__PURE__ */ jsx(DropdownMenuItem, {
						asChild: true,
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/seguridad/documentos/generados",
							search: { usuarioId: yo.id },
							children: [/* @__PURE__ */ jsx(FileStack, {
								size: 16,
								"aria-hidden": true
							}), " Mis documentos"]
						})
					}),
					/* @__PURE__ */ jsxs(DropdownMenuItem, {
						onSelect: cerrarSesion,
						children: [/* @__PURE__ */ jsx(LogOut, {
							size: 16,
							"aria-hidden": true
						}), " Cerrar sesión"]
					})
				]
			})] }),
			/* @__PURE__ */ jsx(CommandPalette, {
				abierto: buscador,
				onCerrar: () => setBuscador(false)
			}),
			/* @__PURE__ */ jsx(ElegirContexto, {})
		]
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
/** Rutas sin sesión: portal, recuperación, verificación y el portal del sujeto pasivo. */
var RUTAS_PUBLICAS = [
	"/",
	"/recuperar",
	"/verificar",
	"/seguimiento-sujeto-pasivo"
];
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Página no encontrada"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "La dirección no existe o la pantalla cambió de lugar."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/inicio",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Ir al portal de módulos"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "La pantalla no cargó"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Ocurrió un error en la aplicación. Puede reintentar o volver al portal."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Reintentar"
					}), /* @__PURE__ */ jsx("a", {
						href: "/inicio",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Ir al portal de módulos"
					})]
				})
			]
		})
	});
}
var Route$72 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Plataforma Digital de Gestión de Predios · MTC" },
			{
				name: "description",
				content: "Gestión de la adquisición, expropiación, inscripción y custodia de predios para obras de infraestructura del MTC."
			},
			{
				property: "og:title",
				content: "Plataforma Digital de Gestión de Predios · MTC"
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$72.useRouteContext();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const publica = RUTAS_PUBLICAS.includes(pathname.replace(/\/$/, "") || "/") || pathname.startsWith("/recolector-campo");
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs(TooltipProvider, {
			delayDuration: 300,
			children: [
				!publica && /* @__PURE__ */ jsx(TopBar, {}),
				/* @__PURE__ */ jsx(Outlet, {}),
				!publica && /* @__PURE__ */ jsx(PanelAyuda, {}),
				/* @__PURE__ */ jsx(Toaster$1, {
					position: "bottom-right",
					richColors: true,
					closeButton: true
				})
			]
		})
	});
}
//#endregion
//#region src/routes/verificar.tsx
var $$splitComponentImporter$67 = () => import("./verificar-DPYYsUKm.js");
var Route$71 = createFileRoute("/verificar")({
	head: () => ({ meta: [{ title: "Verificación en dos pasos · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$67, "component")
});
/** "bim@mtc.gob.pe" → "b••@mtc.gob.pe": el usuario reconoce a qué correo llegó el código. */
//#endregion
//#region src/routes/trato-directo.tsx
var $$splitComponentImporter$66 = () => import("./trato-directo-BfOiLTa-.js");
var Route$70 = createFileRoute("/trato-directo")({
	head: () => ({ meta: [{ title: "Cartera de trato directo · PDGP" }, {
		name: "description",
		content: "Predios en adquisición por trato directo (TUO DL 1192, art. 19 a 21)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$66, "component")
});
/** Lo que entra a la cartera de trato directo: los que van por esa ruta y los que aún no tienen ruta. */
//#endregion
//#region src/routes/transferencia-interestatal.tsx
var $$splitComponentImporter$65 = () => import("./transferencia-interestatal-CSG1Enwu.js");
var Route$69 = createFileRoute("/transferencia-interestatal")({
	head: () => ({ meta: [{ title: "Cartera de transferencia interestatal · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$65, "component")
});
/** Predios del Estado: transferencia gratuita por la SBN en 45 d.h., sin tasación ni carta (art. 41). */
//#endregion
//#region src/routes/servicios.tsx
var $$splitComponentImporter$64 = () => import("./servicios-DJ9PvyVE.js");
var Route$68 = createFileRoute("/servicios")({
	head: () => ({ meta: [{ title: "Servicios" }] }),
	component: lazyRouteComponent($$splitComponentImporter$64, "component")
});
//#endregion
//#region src/routes/seguimiento-sujeto-pasivo.tsx
var $$splitComponentImporter$63 = () => import("./seguimiento-sujeto-pasivo-BI8Z-m2k.js");
var Route$67 = createFileRoute("/seguimiento-sujeto-pasivo")({
	head: () => ({ meta: [{ title: "Consulta de seguimiento predial · MTC" }, {
		name: "description",
		content: "Consulta individual del sujeto pasivo sobre el estado, avance y documentos de sus predios y expedientes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$63, "component")
});
/** "Ing. Juan Carlos Pérez García" → "JP": primer nombre y primer apellido, sin el título. */
/** Anuncios de la DDP para los sujetos pasivos de los proyectos donde este DNI tiene predios. */
//#endregion
//#region src/routes/seguimiento-monitoreo.tsx
var $$splitComponentImporter$62 = () => import("./seguimiento-monitoreo-CPtAHXEk.js");
var Route$66 = createFileRoute("/seguimiento-monitoreo")({ component: lazyRouteComponent($$splitComponentImporter$62, "component") });
/**
* Layout de los tableros: solo el <Outlet/> y la guía flotante que alterna la clase global
* `monitor-simple-mode` (styles.css). El sidebar y la cabecera los pone cada página con AppShell.
*/
//#endregion
//#region src/routes/seguimiento-adquisicion.tsx
var $$splitComponentImporter$61 = () => import("./seguimiento-adquisicion-DNmVq3q9.js");
var Route$65 = createFileRoute("/seguimiento-adquisicion")({
	head: () => ({ meta: [{ title: "Seguimiento de adquisición · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$61, "component")
});
//#endregion
//#region src/routes/regularizacion.tsx
var $$splitComponentImporter$60 = () => import("./regularizacion-C_v0FthG.js");
var Route$64 = createFileRoute("/regularizacion")({
	head: () => ({ meta: [{ title: "Cartera de regularización · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$60, "component")
});
/**
* Predios que necesitan regularizar su condición técnico-legal antes de adquirirse: discrepancias técnicas,
* legales o registrales sin resolver, saneamiento en curso, o sin partida registral (inmatriculación)
* cuando aún no tienen resolución de adquisición.
*/
//#endregion
//#region src/routes/recuperar.tsx
var $$splitComponentImporter$59 = () => import("./recuperar-BWtfe_Ei.js");
var Route$63 = createFileRoute("/recuperar")({
	head: () => ({ meta: [{ title: "Recuperar contraseña · MTC" }, {
		name: "description",
		content: "Recupera tu contraseña del sistema de Gestión Predial del MTC."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$59, "component")
});
//#endregion
//#region src/routes/reconocimiento-mejoras.tsx
var $$splitComponentImporter$58 = () => import("./reconocimiento-mejoras-D9rEm_WG.js");
var Route$62 = createFileRoute("/reconocimiento-mejoras")({
	head: () => ({ meta: [{ title: "Cartera de reconocimiento de mejoras · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$58, "component")
});
/** Predios sin sujeto pasivo con ocupante: se reconocen mejoras y gastos de traslado (DCF 3.ª). */
//#endregion
//#region src/routes/recolector-campo.tsx
var $$splitComponentImporter$57 = () => import("./recolector-campo-lxM_PtNt.js");
var Route$61 = createFileRoute("/recolector-campo")({
	head: () => ({
		meta: [
			{ title: "Recolector de campo · PDGP" },
			{
				name: "description",
				content: "Padrón y caracterización de predios en campo, para tablet y celular."
			},
			{
				name: "theme-color",
				content: "#C8102E"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			}
		],
		links: [{
			rel: "manifest",
			href: "/manifest.webmanifest"
		}, {
			rel: "apple-touch-icon",
			href: "/icono-campo.svg"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$57, "component")
});
/** Perfiles que salen a campo (módulo 30). */
/** Sin sesión pide el acceso; con sesión muestra la pantalla del recolector. */
//#endregion
//#region src/routes/pago-consignacion.tsx
var $$splitComponentImporter$56 = () => import("./pago-consignacion-BrGblJ2J.js");
var Route$60 = createFileRoute("/pago-consignacion")({
	head: () => ({ meta: [{ title: "Pago y consignación" }] }),
	component: lazyRouteComponent($$splitComponentImporter$56, "component")
});
/** Dato de solo lectura dentro de una grilla de formulario. */
//#endregion
//#region src/routes/pago.tsx
var $$splitComponentImporter$55 = () => import("./pago-CxycauF_.js");
var Route$59 = createFileRoute("/pago")({
	head: () => ({ meta: [{ title: "Cartera de pago y consignación · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$55, "component")
});
/**
* Predios con resolución y sin entrega: pago dentro de los 20 d.h. del formulario registral (art. 20.4.b)
* o consignación en expropiación (art. 28.3); y los que ya tienen el devengado en trámite.
*/
//#endregion
//#region src/routes/mapa.tsx
var $$splitComponentImporter$54 = () => import("./mapa-Ch0jv4RU.js");
var Route$58 = createFileRoute("/mapa")({
	head: () => ({ meta: [{ title: "Mapa de proyectos · PDGP" }, {
		name: "description",
		content: "Visor geográfico nacional de los proyectos de gestión predial del MTC."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$54, "component")
});
//#endregion
//#region src/routes/kit.tsx
var $$splitComponentImporter$53 = () => import("./kit-DksdVjP5.js");
var Route$57 = createFileRoute("/kit")({
	head: () => ({ meta: [{ title: "Kit de interfaz · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$53, "component")
});
//#endregion
//#region src/routes/interoperabilidad.tsx
var $$splitComponentImporter$52 = () => import("./interoperabilidad-DOg1HNIO.js");
var Route$56 = createFileRoute("/interoperabilidad")({
	head: () => ({ meta: [{ title: "Interoperabilidad" }, {
		name: "description",
		content: "Administración, configuración y seguimiento de servicios interoperables de la Plataforma Digital de Gestión de Predios."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$52, "component")
});
//#endregion
//#region src/routes/interferencias.tsx
var $$splitComponentImporter$51 = () => import("./interferencias-DYT6tVHe.js");
var Route$55 = createFileRoute("/interferencias")({
	head: () => ({ meta: [{ title: "Liberación de interferencias · PDGP" }, {
		name: "description",
		content: "Interferencias de servicios públicos en el área del proyecto y su liberación (Título VII del TUO del DL 1192, art. 42 a 44)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$51, "component")
});
/** Plazo vigente según el estado (art. 43). Devuelve el hito desde el que corre y el plazo. */
/**
* Código del registro (no es un documento emitido, por eso no pasa por Numeración): INF-AAAA-NNNN,
* el mayor del año en la lista más uno.
*/
/** Eliminar o anular exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
//#region src/routes/inscripcion-registral.tsx
var $$splitComponentImporter$50 = () => import("./inscripcion-registral-B94gtguR.js");
var Route$54 = createFileRoute("/inscripcion-registral")({
	head: () => ({ meta: [{ title: "Cartera de inscripción registral · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$50, "component")
});
/**
* Predios ya entregados que se inscriben a favor del MTC: por presentar por el SID, con título en
* calificación (plazo de inscripción) o inscritos.
*/
//#endregion
//#region src/routes/inicio.tsx
var $$splitComponentImporter$49 = () => import("./inicio-DlTY8Oex.js");
var Route$53 = createFileRoute("/inicio")({
	head: () => ({ meta: [{ title: "Módulos · PDGP · MTC" }] }),
	component: lazyRouteComponent($$splitComponentImporter$49, "component")
});
/** Orden del esquema de la plataforma: columnas del flujo de izquierda a derecha, luego las franjas transversales de arriba abajo. */
/** Color del ícono por bloque: sin encabezados de grupo, el color es lo que distingue el bloque. */
/** Portal tras el ingreso: cuadrícula plana de módulos, filtrada por el permiso de lectura del perfil. */
//#endregion
//#region src/routes/gestion-social.tsx
var $$splitComponentImporter$48 = () => import("./gestion-social-BO7QaW1G.js");
var Route$52 = createFileRoute("/gestion-social")({
	head: () => ({ meta: [{ title: "Gestión social" }, {
		name: "description",
		content: "Módulo transversal de Gestión Predial Social: antecedentes por proyecto, riesgos, actores, atención a sujetos pasivos y actas de gestión social."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$48, "component")
});
/** Modal de baja: el motivo (mínimo 5 caracteres) queda en el histórico. */
//#endregion
//#region src/routes/gestion-resolucion.tsx
var $$splitComponentImporter$47 = () => import("./gestion-resolucion-Bl22B7S1.js");
var Route$51 = createFileRoute("/gestion-resolucion")({
	head: () => ({ meta: [{ title: "Cartera de resoluciones · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$47, "component")
});
/**
* Predios con tasación aprobada y sin resolución de adquisición: en trato directo, la aceptación de la
* carta abre la resolución (art. 20.4.a); en expropiación, la norma de ejecución (art. 27).
*/
//#endregion
//#region src/routes/gestion-presupuestal.tsx
var $$splitComponentImporter$46 = () => import("./gestion-presupuestal-Ch5zDkw6.js");
var Route$50 = createFileRoute("/gestion-presupuestal")({
	head: () => ({ meta: [{ title: "Metas" }, {
		name: "description",
		content: "Programación, reprogramación y seguimiento de metas físicas y financieras."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$46, "component")
});
/**
* Metas que los coordinadores enviaron a aprobación: Presupuesto (Tesorería / Presupuesto) las revisa,
* aprueba u observa con motivo. «Ver» abre las metas del proyecto y ejercicio abajo.
*/
/** Últimas cargas de ejecución del SIAF de todos los proyectos; el detalle está en cada proyecto. */
//#endregion
//#region src/routes/gestion-predial-social.tsx
var $$splitComponentImporter$45 = () => import("./gestion-predial-social-CzRaFLFq.js");
var Route$49 = createFileRoute("/gestion-predial-social")({
	head: () => ({ meta: [{ title: "Gestión Predial Social" }] }),
	component: lazyRouteComponent($$splitComponentImporter$45, "component")
});
/** Eliminar o anular exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
//#region src/routes/gestion-documental.tsx
var $$splitComponentImporter$44 = () => import("./gestion-documental-CKNV3zxa.js");
var Route$48 = createFileRoute("/gestion-documental")({
	head: () => ({ meta: [{ title: "Plantillas Word | Gestión Documental" }, {
		name: "description",
		content: "Configuración de plantillas Word para los documentos de gestión predial."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$44, "component")
});
/** Eliminar o anular exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
//#region src/routes/expropiacion.tsx
var $$splitComponentImporter$43 = () => import("./expropiacion-CeDudXPN.js");
var Route$47 = createFileRoute("/expropiacion")({
	head: () => ({ meta: [{ title: "Cartera de expropiación · PDGP" }, {
		name: "description",
		content: "Predios en expropiación y los que esperan la respuesta a la carta de intención (TUO DL 1192, art. 20.5, 24 a 38)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$43, "component")
});
/**
* La cartera de expropiación: los predios que ya van por esa ruta y los de trato directo con la carta de
* intención notificada y sin aceptación (esperando, con el plazo de 10 d.h. vencido o con rechazo), que
* son los que pueden pasar a expropiación (art. 20.5 y 26).
*/
//#endregion
//#region src/routes/anuncios.tsx
var $$splitComponentImporter$42 = () => import("./anuncios-Ce5IBvBb.js");
var Route$46 = createFileRoute("/anuncios")({
	head: () => ({ meta: [{ title: "Anuncios · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
/** Anuncios para el perfil activo: vigentes arriba, anteriores plegados. */
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$41 = () => import("./routes-DY2eobJk.js");
var Route$45 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Acceso · PDGP · MTC" }, {
		name: "description",
		content: "Acceso a la Plataforma Digital de Gestión de Predios del MTC, Dirección de Disponibilidad de Predios (DDP)."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
/**
* Sujetos del TUO del DL 1192 (Título II, Cap. I). El panel derecho cambia según el perfil elegido.
* El ícono y su color identifican el perfil; el texto siempre lo nombra, el color nunca va solo.
*/
//#endregion
//#region src/routes/seguimiento-monitoreo.index.tsx
var $$splitComponentImporter$40 = () => import("./seguimiento-monitoreo.index-DBq8Mol2.js");
var Route$44 = createFileRoute("/seguimiento-monitoreo/")({ component: lazyRouteComponent($$splitComponentImporter$40, "component") });
//#endregion
//#region src/routes/recolector-campo.index.tsx
var $$splitComponentImporter$39 = () => import("./recolector-campo.index-BuQVBB9f.js");
var Route$43 = createFileRoute("/recolector-campo/")({
	head: () => ({ meta: [{ title: "Mis proyectos · Recolector de campo · PDGP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
/** Proyectos a los que está asignado el usuario: de aquí se elige dónde se trabaja hoy. */
//#endregion
//#region src/routes/proyectos.index.tsx
var $$splitComponentImporter$38 = () => import("./proyectos.index-MFYrtLTg.js");
var Route$42 = createFileRoute("/proyectos/")({
	head: () => ({ meta: [{ title: "Proyectos · PDGP" }, {
		name: "description",
		content: "Gestione proyectos prediales, consulte avances y cambie entre vistas operativas."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
//#endregion
//#region src/routes/seguridad.usuarios.tsx
var $$splitComponentImporter$37 = () => import("./seguridad.usuarios-eKqUQbyQ.js");
var Route$41 = createFileRoute("/seguridad/usuarios")({
	head: () => ({ meta: [{ title: "Seguridad · Usuarios" }, {
		name: "description",
		content: "Administración de usuarios del sistema MTC."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
//#region src/routes/seguridad.roles.tsx
var $$splitComponentImporter$36 = () => import("./seguridad.roles-LmVsCmUc.js");
var Route$40 = createFileRoute("/seguridad/roles")({ component: lazyRouteComponent($$splitComponentImporter$36, "component") });
//#endregion
//#region src/routes/seguridad.bitacora.tsx
var $$splitComponentImporter$35 = () => import("./seguridad.bitacora-UnGNskyC.js");
var Route$39 = createFileRoute("/seguridad/bitacora")({
	head: () => ({ meta: [{ title: "Bitácora de accesos y cambios · PDGP" }, {
		name: "description",
		content: "Registro de auditoría: quién hizo qué, cuándo y sobre qué registro."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
//#endregion
//#region src/routes/seguridad.auditoria.tsx
var $$splitComponentImporter$34 = () => import("./seguridad.auditoria-BlvPziyG.js");
var Route$38 = createFileRoute("/seguridad/auditoria")({
	head: () => ({ meta: [{ title: "Registro de auditoría · PDGP" }, {
		name: "description",
		content: "Ingresos, cierres de sesión, cambios de perfil y acciones sobre registros, en orden cronológico."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
//#endregion
//#region src/routes/seguridad.areas.tsx
var $$splitComponentImporter$33 = () => import("./seguridad.areas-TB6EVX93.js");
var Route$37 = createFileRoute("/seguridad/areas")({
	head: () => ({ meta: [{ title: "Áreas · Seguridad y configuración · PDGP" }, {
		name: "description",
		content: "Estructura orgánica de la entidad como árbol: áreas, responsables y código documental."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
/** Áreas en orden de árbol con su nivel, para listas, selectores y exportaciones. */
/**
* Asignar usuarios al área: se marcan los que pertenecen a ella. Un usuario tiene una sola área, así
* que marcar a alguien de otra área lo cambia de área (se avisa en la fila).
*/
/** Selector de área superior con sangría; excluye al área y su subárbol (no hay ciclos). */
//#endregion
//#region src/routes/seguridad.acceso-gis.tsx
var $$splitComponentImporter$32 = () => import("./seguridad.acceso-gis-DOgVZp0O.js");
var Route$36 = createFileRoute("/seguridad/acceso-gis")({
	head: () => ({ meta: [{ title: "Acceso GIS · Seguridad y configuración · PDGP" }, {
		name: "description",
		content: "Usuarios que leen los proyectos desde QGIS o ArcGIS y envían cambios a revisión: credenciales, proyectos y permisos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
/** Perfil y permisos GIS de un usuario: el mejor de sus roles en la matriz del módulo 12. */
//#endregion
//#region src/routes/seguimiento-monitoreo.transferencia-interestatal.tsx
var $$splitComponentImporter$31 = () => import("./seguimiento-monitoreo.transferencia-interestatal-0iaUPSZk.js");
var Route$35 = createFileRoute("/seguimiento-monitoreo/transferencia-interestatal")({
	head: () => ({ meta: [{ title: "Coordinadores · Transferencias interestatales" }, {
		name: "description",
		content: "Seguimiento de predios estatales pendientes, en trámite y adquiridos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.territorial-integral.tsx
var $$splitComponentImporter$30 = () => import("./seguimiento-monitoreo.territorial-integral-_-yaUmC_.js");
var Route$34 = createFileRoute("/seguimiento-monitoreo/territorial-integral")({
	head: () => ({ meta: [{ title: "Dashboard territorial integral de pagos, inscripción y cierre" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.tecnico-tasaciones.tsx
var $$splitComponentImporter$29 = () => import("./seguimiento-monitoreo.tecnico-tasaciones-Ct1NnK7R.js");
var Route$33 = createFileRoute("/seguimiento-monitoreo/tecnico-tasaciones")({
	head: () => ({ meta: [{ title: "Expedientes, tasaciones y costos" }] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.seguimiento-personal.tsx
var $$splitComponentImporter$28 = () => import("./seguimiento-monitoreo.seguimiento-personal-CjToeYZT.js");
var Route$32 = createFileRoute("/seguimiento-monitoreo/seguimiento-personal")({
	head: () => ({ meta: [{ title: "Seguimiento del personal" }] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.presupuestal-predio.tsx
var $$splitComponentImporter$27 = () => import("./seguimiento-monitoreo.presupuestal-predio-Dq7Pcq7r.js");
var Route$31 = createFileRoute("/seguimiento-monitoreo/presupuestal-predio")({
	head: () => ({ meta: [{ title: "Seguimiento presupuestal por predio" }] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.predios-privados.tsx
var $$splitComponentImporter$26 = () => import("./seguimiento-monitoreo.predios-privados-DBoiLckg.js");
var Route$30 = createFileRoute("/seguimiento-monitoreo/predios-privados")({
	head: () => ({ meta: [{ title: "Coordinadores · Seguimiento de predios privados" }, {
		name: "description",
		content: "Seguimiento de predios privados por etapa de adquisición y cierre predial."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.predial.tsx
var $$splitComponentImporter$25 = () => import("./seguimiento-monitoreo.predial-DDAgjpwk.js");
var Route$29 = createFileRoute("/seguimiento-monitoreo/predial")({
	head: () => ({ meta: [{ title: "Metas y ejecución predial" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.legal-riesgos-plazos.tsx
var $$splitComponentImporter$24 = () => import("./seguimiento-monitoreo.legal-riesgos-plazos-D_P2hacy.js");
var Route$28 = createFileRoute("/seguimiento-monitoreo/legal-riesgos-plazos")({
	head: () => ({ meta: [{ title: "Situación legal, riesgos y plazos" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.integrado-proyectos.tsx
var $$splitComponentImporter$23 = () => import("./seguimiento-monitoreo.integrado-proyectos-DZW5tlZO.js");
var Route$27 = createFileRoute("/seguimiento-monitoreo/integrado-proyectos")({
	head: () => ({ meta: [{ title: "Seguimiento integrado de todos los proyectos" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.inscripciones.tsx
var $$splitComponentImporter$22 = () => import("./seguimiento-monitoreo.inscripciones-BsAQoO5u.js");
var Route$26 = createFileRoute("/seguimiento-monitoreo/inscripciones")({
	head: () => ({ meta: [{ title: "Inscripción registral de predios" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.general.tsx
var $$splitComponentImporter$21 = () => import("./seguimiento-monitoreo.general-vNVLJ2XO.js");
var Route$25 = createFileRoute("/seguimiento-monitoreo/general")({
	head: () => ({ meta: [{ title: "Alta gerencia · Reporte general aeroportuario" }, {
		name: "description",
		content: "Reporte ejecutivo del avance de adquisiciones prediales y liberación de interferencias."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.gastos-proyecto-predio.tsx
var $$splitComponentImporter$20 = () => import("./seguimiento-monitoreo.gastos-proyecto-predio-DJvKrz8K.js");
var Route$24 = createFileRoute("/seguimiento-monitoreo/gastos-proyecto-predio")({
	head: () => ({ meta: [{ title: "Monitoreo de gastos por proyecto y predio" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.dashboard-geografico.tsx
var $$splitComponentImporter$19 = () => import("./seguimiento-monitoreo.dashboard-geografico-BZNr-IoM.js");
var Route$23 = createFileRoute("/seguimiento-monitoreo/dashboard-geografico")({
	head: () => ({ meta: [{ title: "Dashboard geográfico de proyectos" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.dashboard-financiero.tsx
var $$splitComponentImporter$18 = () => import("./seguimiento-monitoreo.dashboard-financiero-XjMxoJ6J.js");
var Route$22 = createFileRoute("/seguimiento-monitoreo/dashboard-financiero")({
	head: () => ({ meta: [{ title: "Presupuesto y pagos prediales" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.contractual-servicios-interferencias.tsx
var $$splitComponentImporter$17 = () => import("./seguimiento-monitoreo.contractual-servicios-interferencias-B0_B-Am0.js");
var Route$21 = createFileRoute("/seguimiento-monitoreo/contractual-servicios-interferencias")({
	head: () => ({ meta: [{ title: "Contratos, servicios e interferencias" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
//#endregion
//#region src/routes/seguimiento-monitoreo.cartera-liberacion.tsx
var $$splitComponentImporter$16 = () => import("./seguimiento-monitoreo.cartera-liberacion-CI7Sj8EP.js");
var Route$20 = createFileRoute("/seguimiento-monitoreo/cartera-liberacion")({
	head: () => ({ meta: [{ title: "Avance y disponibilidad predial" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
//#endregion
//#region src/routes/configuracion.sms.tsx
var $$splitComponentImporter$15 = () => import("./configuracion.sms-C04NhptN.js");
var Route$19 = createFileRoute("/configuracion/sms")({
	head: () => ({ meta: [{ title: "Configuración · SMS (Twilio)" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
/** Tokens y secretos: no se copian al histórico. */
//#endregion
//#region src/routes/configuracion.siaf-ceplan.tsx
var $$splitComponentImporter$14 = () => import("./configuracion.siaf-ceplan-CXg1LYyT.js");
var Route$18 = createFileRoute("/configuracion/siaf-ceplan")({
	head: () => ({ meta: [{ title: "Configuración · Integración presupuestal SIAF-CEPLAN" }, {
		name: "description",
		content: "Configuración, homologación y actualización presupuestal SIAF-CEPLAN para la gestión predial."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
/** Misma interfaz de siempre (`<tr key><Cell>…</Cell></tr>`), dibujada con `Tabla` del kit (R9). */
/** Marcador de celda: `DataTable` lee sus props; nunca se renderiza como `<td>`. */
//#endregion
//#region src/routes/configuracion.maestros.tsx
var $$splitComponentImporter$13 = () => import("./configuracion.maestros-iA7Zc4oK.js");
var Route$17 = createFileRoute("/configuracion/maestros")({
	head: () => ({ meta: [{ title: "Configuración · Maestros" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
/** Eliminar o anular exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
//#region src/routes/configuracion.hitos-plazos.tsx
var $$splitComponentImporter$12 = () => import("./configuracion.hitos-plazos-B4U9YW_g.js");
var Route$16 = createFileRoute("/configuracion/hitos-plazos")({
	head: () => ({ meta: [{ title: "Configuración · Hitos y plazos" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
/** Lo que el sistema usa hoy: lo guardado o, si nunca se guardó, los valores por defecto. */
//#endregion
//#region src/routes/configuracion.fotos.tsx
var $$splitComponentImporter$11 = () => import("./configuracion.fotos-DA3SVvnT.js");
var Route$15 = createFileRoute("/configuracion/fotos")({
	head: () => ({ meta: [{ title: "Configuración · Fotos" }, {
		name: "description",
		content: "Marca de agua y estampa por defecto de las fotos de cada proyecto."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
/** Imagen de muestra para la vista previa: un degradado neutro en SVG (sin archivo externo). */
//#endregion
//#region src/routes/configuracion.correos.tsx
var $$splitComponentImporter$10 = () => import("./configuracion.correos-BPpvlG8p.js");
var Route$14 = createFileRoute("/configuracion/correos")({
	head: () => ({ meta: [{ title: "Configuración · Correos" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
/** Contraseñas y claves: no se copian al histórico. */
//#endregion
//#region src/routes/configuracion.acceso.tsx
var $$splitComponentImporter$9 = () => import("./configuracion.acceso-BGjaiuQE.js");
var Route$13 = createFileRoute("/configuracion/acceso")({
	head: () => ({ meta: [{ title: "Configuración · Pantalla de acceso" }, {
		name: "description",
		content: "Color o imagen de fondo de la pantalla de acceso a la plataforma."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
//#endregion
//#region src/routes/seguridad.roles.index.tsx
var $$splitComponentImporter$8 = () => import("./seguridad.roles.index-BRe3oTBo.js");
var Route$12 = createFileRoute("/seguridad/roles/")({
	head: () => ({ meta: [{ title: "Seguridad · Administración de roles" }, {
		name: "description",
		content: "Listado y administración de roles del sistema MTC."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
/** Eliminar exige un motivo escrito: queda en el histórico junto al registro como estaba. */
//#endregion
//#region src/routes/seguridad.manuales.index.tsx
var $$splitComponentImporter$7 = () => import("./seguridad.manuales.index-CF9dkO7Q.js");
var Route$11 = createFileRoute("/seguridad/manuales/")({
	head: () => ({ meta: [{ title: "Ayuda por vista · PDGP" }, {
		name: "description",
		content: "Manuales, videos y tutoriales de cada vista del sistema."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/seguridad.anuncios.index.tsx
var $$splitComponentImporter$6 = () => import("./seguridad.anuncios.index-DkPE_Pgk.js");
var Route$10 = createFileRoute("/seguridad/anuncios/")({
	head: () => ({ meta: [{ title: "Anuncios · PDGP" }, {
		name: "description",
		content: "Redacción de anuncios para usuarios del sistema y sujetos pasivos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/seguridad.documentos.tipos.tsx
var $$splitComponentImporter$5 = () => import("./seguridad.documentos.tipos-BiPt31LM.js");
var Route$9 = createFileRoute("/seguridad/documentos/tipos")({
	head: () => ({ meta: [{ title: "Tipos de documento · Seguridad y configuración · PDGP" }, {
		name: "description",
		content: "Catálogo de tipos y subtipos de documento que genera la gestión predial."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/seguridad.documentos.numeracion.tsx
var $$splitComponentImporter$4 = () => import("./seguridad.documentos.numeracion-CzOm4yjA.js");
var Route$8 = createFileRoute("/seguridad/documentos/numeracion")({
	head: () => ({ meta: [{ title: "Numeración de documentos · Seguridad y configuración · PDGP" }, {
		name: "description",
		content: "Reglas de numeración por tipo de documento y contadores vigentes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/seguridad.documentos.generados.tsx
var $$splitComponentImporter$3 = () => import("./seguridad.documentos.generados-CCPLZzj4.js");
var Route$7 = createFileRoute("/seguridad/documentos/generados")({
	head: () => ({ meta: [{ title: "Documentos generados · Seguridad y configuración · PDGP" }, {
		name: "description",
		content: "Registro de los documentos numerados por proyecto, predio, usuario y área."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
/** Ven todo el registro; el resto, lo suyo y lo de su área. */
/** Cantidad por grupo (proyecto o usuario) y tipo; el grupo enlaza a la lista filtrada. */
/** Oficio o memorando que no nace de un paso del predio: consulta, memorando interno, informe del proyecto. */
//#endregion
//#region src/routes/seguridad.documentos.expediente.tsx
var $$splitComponentImporter$2 = () => import("./seguridad.documentos.expediente-BfId9wz-.js");
var Route$6 = createFileRoute("/seguridad/documentos/expediente")({
	head: () => ({ meta: [{ title: "Documentos del expediente · Seguridad y configuración · PDGP" }, {
		name: "description",
		content: "Catálogo de documentos que debe tener cada paso del expediente predial y su cobertura de la lista de la DDP."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
/** Pasos del menú del predio (todas las rutas), en orden, con su número y nombre. */
/**
* Catálogo de documentos del expediente predial (docs/PLAN-EXPEDIENTE-DOCUMENTOS.md §7.5): qué debe tener
* cada paso del predio, la cobertura de la lista de la DDP (ninguna fila sin paso), los documentos que
* los predios registraron fuera del catálogo y la importación de una lista nueva.
*/
//#endregion
//#region src/routes/proyectos.$projectId.equipos.tsx
var $$splitComponentImporter$1 = () => import("./proyectos._projectId.equipos-854jzswh.js");
var Route$5 = createFileRoute("/proyectos/$projectId/equipos")({
	head: () => ({ meta: [{ title: "Equipos y brigadas · PDGP" }, {
		name: "description",
		content: "Configuración operativa: equipos, responsables y permisos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
/** Modal de baja: el motivo (mínimo 5 caracteres) queda en el histórico. */
/** Botón de ícono 32 × 32 con tooltip obligatorio (mismo patrón que CrudPage). */
//#endregion
//#region src/routes/proyectos.$projectId.base-grafica.tsx
var $$splitComponentImporter = () => import("./proyectos._projectId.base-grafica-DERNgc2Y.js");
var Route$4 = createFileRoute("/proyectos/$projectId/base-grafica")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routes/api.gis.$.ts
/** Servicio GIS (`src/server/gis.ts`): OGC API Features, sesión del plugin, cambios y planos. */
var Route$3 = createFileRoute("/api/gis/$")({ server: { handlers: { ANY: async ({ request, params }) => (await import("./gis-yvrQfc0y.js")).atender(request, params._splat ?? "") } } });
//#endregion
//#region src/routes/proyectos.$projectId.base-grafica.registro.tsx
/** El antiguo Registro de capa vive ahora en el asistente «Añadir datos» de la base gráfica. */
var Route$2 = createFileRoute("/proyectos/$projectId/base-grafica/registro")({ beforeLoad: ({ params }) => {
	throw redirect({
		to: "/proyectos/$projectId/base-grafica",
		params: { projectId: params.projectId },
		search: { anadir: "ARCHIVO" },
		replace: true
	});
} });
//#endregion
//#region src/routes/proyectos.$projectId.predios.$codigo.gestion-documentos-dgppt-vmt.tsx
/**
* Pantalla retirada del menú (docs/PLAN-MENU-FLUJOGRAMA.md §8): sus documentos se registran ahora en
* la elevación del expediente. La ruta se conserva para los enlaces guardados.
*/
var Route$1 = createFileRoute("/proyectos/$projectId/predios/$codigo/gestion-documentos-dgppt-vmt")({ beforeLoad: ({ params }) => {
	throw redirect({
		to: "/proyectos/$projectId/predios/$codigo/elevacion-expediente",
		params
	});
} });
//#endregion
//#region src/routeTree.gen.ts
var VerificarRoute = Route$71.update({
	id: "/verificar",
	path: "/verificar",
	getParentRoute: () => Route$72
});
var TratoDirectoRoute = Route$70.update({
	id: "/trato-directo",
	path: "/trato-directo",
	getParentRoute: () => Route$72
});
var TransferenciaInterestatalRoute = Route$69.update({
	id: "/transferencia-interestatal",
	path: "/transferencia-interestatal",
	getParentRoute: () => Route$72
});
var ServiciosRoute = Route$68.update({
	id: "/servicios",
	path: "/servicios",
	getParentRoute: () => Route$72
});
var SeguimientoSujetoPasivoRoute = Route$67.update({
	id: "/seguimiento-sujeto-pasivo",
	path: "/seguimiento-sujeto-pasivo",
	getParentRoute: () => Route$72
});
var SeguimientoMonitoreoRoute = Route$66.update({
	id: "/seguimiento-monitoreo",
	path: "/seguimiento-monitoreo",
	getParentRoute: () => Route$72
});
var SeguimientoAdquisicionRoute = Route$65.update({
	id: "/seguimiento-adquisicion",
	path: "/seguimiento-adquisicion",
	getParentRoute: () => Route$72
});
var RegularizacionRoute = Route$64.update({
	id: "/regularizacion",
	path: "/regularizacion",
	getParentRoute: () => Route$72
});
var RecuperarRoute = Route$63.update({
	id: "/recuperar",
	path: "/recuperar",
	getParentRoute: () => Route$72
});
var ReconocimientoMejorasRoute = Route$62.update({
	id: "/reconocimiento-mejoras",
	path: "/reconocimiento-mejoras",
	getParentRoute: () => Route$72
});
var RecolectorCampoRoute = Route$61.update({
	id: "/recolector-campo",
	path: "/recolector-campo",
	getParentRoute: () => Route$72
});
var PagoConsignacionRoute = Route$60.update({
	id: "/pago-consignacion",
	path: "/pago-consignacion",
	getParentRoute: () => Route$72
});
var PagoRoute = Route$59.update({
	id: "/pago",
	path: "/pago",
	getParentRoute: () => Route$72
});
var MapaRoute = Route$58.update({
	id: "/mapa",
	path: "/mapa",
	getParentRoute: () => Route$72
});
var KitRoute = Route$57.update({
	id: "/kit",
	path: "/kit",
	getParentRoute: () => Route$72
});
var InteroperabilidadRoute = Route$56.update({
	id: "/interoperabilidad",
	path: "/interoperabilidad",
	getParentRoute: () => Route$72
});
var InterferenciasRoute = Route$55.update({
	id: "/interferencias",
	path: "/interferencias",
	getParentRoute: () => Route$72
});
var InscripcionRegistralRoute = Route$54.update({
	id: "/inscripcion-registral",
	path: "/inscripcion-registral",
	getParentRoute: () => Route$72
});
var InicioRoute = Route$53.update({
	id: "/inicio",
	path: "/inicio",
	getParentRoute: () => Route$72
});
var GestionSocialRoute = Route$52.update({
	id: "/gestion-social",
	path: "/gestion-social",
	getParentRoute: () => Route$72
});
var GestionResolucionRoute = Route$51.update({
	id: "/gestion-resolucion",
	path: "/gestion-resolucion",
	getParentRoute: () => Route$72
});
var GestionPresupuestalRoute = Route$50.update({
	id: "/gestion-presupuestal",
	path: "/gestion-presupuestal",
	getParentRoute: () => Route$72
});
var GestionPredialSocialRoute = Route$49.update({
	id: "/gestion-predial-social",
	path: "/gestion-predial-social",
	getParentRoute: () => Route$72
});
var GestionDocumentalRoute = Route$48.update({
	id: "/gestion-documental",
	path: "/gestion-documental",
	getParentRoute: () => Route$72
});
var ExpropiacionRoute = Route$47.update({
	id: "/expropiacion",
	path: "/expropiacion",
	getParentRoute: () => Route$72
});
var AnunciosRoute = Route$46.update({
	id: "/anuncios",
	path: "/anuncios",
	getParentRoute: () => Route$72
});
var IndexRoute = Route$45.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$72
});
var SeguimientoMonitoreoIndexRoute = Route$44.update({
	id: "/",
	path: "/",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var RecolectorCampoIndexRoute = Route$43.update({
	id: "/",
	path: "/",
	getParentRoute: () => RecolectorCampoRoute
});
var ProyectosIndexRoute = Route$42.update({
	id: "/proyectos/",
	path: "/proyectos/",
	getParentRoute: () => Route$72
});
var SeguridadUsuariosRoute = Route$41.update({
	id: "/seguridad/usuarios",
	path: "/seguridad/usuarios",
	getParentRoute: () => Route$72
});
var SeguridadRolesRoute = Route$40.update({
	id: "/seguridad/roles",
	path: "/seguridad/roles",
	getParentRoute: () => Route$72
});
var SeguridadBitacoraRoute = Route$39.update({
	id: "/seguridad/bitacora",
	path: "/seguridad/bitacora",
	getParentRoute: () => Route$72
});
var SeguridadAuditoriaRoute = Route$38.update({
	id: "/seguridad/auditoria",
	path: "/seguridad/auditoria",
	getParentRoute: () => Route$72
});
var SeguridadAreasRoute = Route$37.update({
	id: "/seguridad/areas",
	path: "/seguridad/areas",
	getParentRoute: () => Route$72
});
var SeguridadAccesoGisRoute = Route$36.update({
	id: "/seguridad/acceso-gis",
	path: "/seguridad/acceso-gis",
	getParentRoute: () => Route$72
});
var SeguimientoMonitoreoTransferenciaInterestatalRoute = Route$35.update({
	id: "/transferencia-interestatal",
	path: "/transferencia-interestatal",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoTerritorialPagosCierreRoute = Route$75.update({
	id: "/territorial-pagos-cierre",
	path: "/territorial-pagos-cierre",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoTerritorialIntegralRoute = Route$34.update({
	id: "/territorial-integral",
	path: "/territorial-integral",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoTecnicoTasacionesRoute = Route$33.update({
	id: "/tecnico-tasaciones",
	path: "/tecnico-tasaciones",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoSeguimientoPersonalRoute = Route$32.update({
	id: "/seguimiento-personal",
	path: "/seguimiento-personal",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoPresupuestalPredioRoute = Route$31.update({
	id: "/presupuestal-predio",
	path: "/presupuestal-predio",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoPrediosPrivadosRoute = Route$30.update({
	id: "/predios-privados",
	path: "/predios-privados",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoPredialRoute = Route$29.update({
	id: "/predial",
	path: "/predial",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoLegalRiesgosPlazosRoute = Route$28.update({
	id: "/legal-riesgos-plazos",
	path: "/legal-riesgos-plazos",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoIntegradoProyectosRoute = Route$27.update({
	id: "/integrado-proyectos",
	path: "/integrado-proyectos",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoIntegradoCeplanSiafRoute = Route$76.update({
	id: "/integrado-ceplan-siaf",
	path: "/integrado-ceplan-siaf",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoInscripcionesRoute = Route$26.update({
	id: "/inscripciones",
	path: "/inscripciones",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoGeneralRoute = Route$25.update({
	id: "/general",
	path: "/general",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoGastosProyectoPredioRoute = Route$24.update({
	id: "/gastos-proyecto-predio",
	path: "/gastos-proyecto-predio",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoDashboardGeograficoRoute = Route$23.update({
	id: "/dashboard-geografico",
	path: "/dashboard-geografico",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoDashboardFinancieroRoute = Route$22.update({
	id: "/dashboard-financiero",
	path: "/dashboard-financiero",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoContractualServiciosInterferenciasRoute = Route$21.update({
	id: "/contractual-servicios-interferencias",
	path: "/contractual-servicios-interferencias",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var SeguimientoMonitoreoCarteraLiberacionRoute = Route$20.update({
	id: "/cartera-liberacion",
	path: "/cartera-liberacion",
	getParentRoute: () => SeguimientoMonitoreoRoute
});
var ProyectosRegistroRoute = Route$77.update({
	id: "/proyectos/registro",
	path: "/proyectos/registro",
	getParentRoute: () => Route$72
});
var ConfiguracionSmsRoute = Route$19.update({
	id: "/configuracion/sms",
	path: "/configuracion/sms",
	getParentRoute: () => Route$72
});
var ConfiguracionSiafCeplanRoute = Route$18.update({
	id: "/configuracion/siaf-ceplan",
	path: "/configuracion/siaf-ceplan",
	getParentRoute: () => Route$72
});
var ConfiguracionMaestrosRoute = Route$17.update({
	id: "/configuracion/maestros",
	path: "/configuracion/maestros",
	getParentRoute: () => Route$72
});
var ConfiguracionHitosPlazosRoute = Route$16.update({
	id: "/configuracion/hitos-plazos",
	path: "/configuracion/hitos-plazos",
	getParentRoute: () => Route$72
});
var ConfiguracionFotosRoute = Route$15.update({
	id: "/configuracion/fotos",
	path: "/configuracion/fotos",
	getParentRoute: () => Route$72
});
var ConfiguracionCorreosRoute = Route$14.update({
	id: "/configuracion/correos",
	path: "/configuracion/correos",
	getParentRoute: () => Route$72
});
var ConfiguracionAccesoRoute = Route$13.update({
	id: "/configuracion/acceso",
	path: "/configuracion/acceso",
	getParentRoute: () => Route$72
});
var SeguridadRolesIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => SeguridadRolesRoute
});
var SeguridadManualesIndexRoute = Route$11.update({
	id: "/seguridad/manuales/",
	path: "/seguridad/manuales/",
	getParentRoute: () => Route$72
});
var SeguridadAnunciosIndexRoute = Route$10.update({
	id: "/seguridad/anuncios/",
	path: "/seguridad/anuncios/",
	getParentRoute: () => Route$72
});
var RecolectorCampoProjectIdIndexRoute = Route$78.update({
	id: "/$projectId/",
	path: "/$projectId/",
	getParentRoute: () => RecolectorCampoRoute
});
var ProyectosProjectIdIndexRoute = Route$74.update({
	id: "/proyectos/$projectId/",
	path: "/proyectos/$projectId/",
	getParentRoute: () => Route$72
});
var SeguridadManualesIdRoute = Route$73.update({
	id: "/seguridad/manuales/$id",
	path: "/seguridad/manuales/$id",
	getParentRoute: () => Route$72
});
var SeguridadDocumentosTiposRoute = Route$9.update({
	id: "/seguridad/documentos/tipos",
	path: "/seguridad/documentos/tipos",
	getParentRoute: () => Route$72
});
var SeguridadDocumentosNumeracionRoute = Route$8.update({
	id: "/seguridad/documentos/numeracion",
	path: "/seguridad/documentos/numeracion",
	getParentRoute: () => Route$72
});
var SeguridadDocumentosGeneradosRoute = Route$7.update({
	id: "/seguridad/documentos/generados",
	path: "/seguridad/documentos/generados",
	getParentRoute: () => Route$72
});
var SeguridadDocumentosExpedienteRoute = Route$6.update({
	id: "/seguridad/documentos/expediente",
	path: "/seguridad/documentos/expediente",
	getParentRoute: () => Route$72
});
var SeguridadAnunciosIdRoute = Route$79.update({
	id: "/seguridad/anuncios/$id",
	path: "/seguridad/anuncios/$id",
	getParentRoute: () => Route$72
});
var RecolectorCampoProjectIdMapaRoute = Route$80.update({
	id: "/$projectId/mapa",
	path: "/$projectId/mapa",
	getParentRoute: () => RecolectorCampoRoute
});
var RecolectorCampoProjectIdEnviarRoute = Route$81.update({
	id: "/$projectId/enviar",
	path: "/$projectId/enviar",
	getParentRoute: () => RecolectorCampoRoute
});
var ProyectosProjectIdRequerimientosRoute = Route$82.update({
	id: "/proyectos/$projectId/requerimientos",
	path: "/proyectos/$projectId/requerimientos",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPadronPreliminarRoute = Route$83.update({
	id: "/proyectos/$projectId/padron-preliminar",
	path: "/proyectos/$projectId/padron-preliminar",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPadronRoute = Route$84.update({
	id: "/proyectos/$projectId/padron",
	path: "/proyectos/$projectId/padron",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdNormasHabilitantesRoute = Route$85.update({
	id: "/proyectos/$projectId/normas-habilitantes",
	path: "/proyectos/$projectId/normas-habilitantes",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdMetasRoute = Route$86.update({
	id: "/proyectos/$projectId/metas",
	path: "/proyectos/$projectId/metas",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdMapaRoute = Route$87.update({
	id: "/proyectos/$projectId/mapa",
	path: "/proyectos/$projectId/mapa",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdLiberacionBloqueRoute = Route$88.update({
	id: "/proyectos/$projectId/liberacion-bloque",
	path: "/proyectos/$projectId/liberacion-bloque",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdExpedientesRoute = Route$89.update({
	id: "/proyectos/$projectId/expedientes",
	path: "/proyectos/$projectId/expedientes",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdEvaluacionInformacionRoute = Route$90.update({
	id: "/proyectos/$projectId/evaluacion-informacion",
	path: "/proyectos/$projectId/evaluacion-informacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdEquiposRoute = Route$5.update({
	id: "/proyectos/$projectId/equipos",
	path: "/proyectos/$projectId/equipos",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdCodigosPrediosRoute = Route$91.update({
	id: "/proyectos/$projectId/codigos-predios",
	path: "/proyectos/$projectId/codigos-predios",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdCodigosPlanosRoute = Route$92.update({
	id: "/proyectos/$projectId/codigos-planos",
	path: "/proyectos/$projectId/codigos-planos",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdBimRoute = Route$93.update({
	id: "/proyectos/$projectId/bim",
	path: "/proyectos/$projectId/bim",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdBaseGraficaRoute = Route$4.update({
	id: "/proyectos/$projectId/base-grafica",
	path: "/proyectos/$projectId/base-grafica",
	getParentRoute: () => Route$72
});
var ApiGisSplatRoute = Route$3.update({
	id: "/api/gis/$",
	path: "/api/gis/$",
	getParentRoute: () => Route$72
});
var RecolectorCampoProjectIdPadronIndexRoute = Route$94.update({
	id: "/$projectId/padron/",
	path: "/$projectId/padron/",
	getParentRoute: () => RecolectorCampoRoute
});
var RecolectorCampoProjectIdCaracterizacionIndexRoute = Route$95.update({
	id: "/$projectId/caracterizacion/",
	path: "/$projectId/caracterizacion/",
	getParentRoute: () => RecolectorCampoRoute
});
var ProyectosProjectIdPrediosIndexRoute = Route$96.update({
	id: "/proyectos/$projectId/predios/",
	path: "/proyectos/$projectId/predios/",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdBaseGraficaIndexRoute = Route$97.update({
	id: "/",
	path: "/",
	getParentRoute: () => ProyectosProjectIdBaseGraficaRoute
});
var SeguridadRolesRoleIdPermisosRoute = Route$98.update({
	id: "/$roleId/permisos",
	path: "/$roleId/permisos",
	getParentRoute: () => SeguridadRolesRoute
});
var RecolectorCampoProjectIdPadronNuevaRoute = Route$99.update({
	id: "/$projectId/padron/nueva",
	path: "/$projectId/padron/nueva",
	getParentRoute: () => RecolectorCampoRoute
});
var RecolectorCampoProjectIdPadronFichaRoute = Route$100.update({
	id: "/$projectId/padron/$ficha",
	path: "/$projectId/padron/$ficha",
	getParentRoute: () => RecolectorCampoRoute
});
var ProyectosProjectIdBaseGraficaRegistroRoute = Route$2.update({
	id: "/registro",
	path: "/registro",
	getParentRoute: () => ProyectosProjectIdBaseGraficaRoute
});
var RecolectorCampoProjectIdCaracterizacionCodigoIndexRoute = Route$101.update({
	id: "/$projectId/caracterizacion/$codigo/",
	path: "/$projectId/caracterizacion/$codigo/",
	getParentRoute: () => RecolectorCampoRoute
});
var RecolectorCampoProjectIdCaracterizacionCodigoSujetoPasivoRoute = Route$102.update({
	id: "/$projectId/caracterizacion/$codigo/sujeto-pasivo",
	path: "/$projectId/caracterizacion/$codigo/sujeto-pasivo",
	getParentRoute: () => RecolectorCampoRoute
});
var RecolectorCampoProjectIdCaracterizacionCodigoNotificacionRoute = Route$103.update({
	id: "/$projectId/caracterizacion/$codigo/notificacion",
	path: "/$projectId/caracterizacion/$codigo/notificacion",
	getParentRoute: () => RecolectorCampoRoute
});
var RecolectorCampoProjectIdCaracterizacionCodigoEmpadronamientoRoute = Route$104.update({
	id: "/$projectId/caracterizacion/$codigo/empadronamiento",
	path: "/$projectId/caracterizacion/$codigo/empadronamiento",
	getParentRoute: () => RecolectorCampoRoute
});
var RecolectorCampoProjectIdCaracterizacionCodigoCaracterizacionPredioRoute = Route$105.update({
	id: "/$projectId/caracterizacion/$codigo/caracterizacion-predio",
	path: "/$projectId/caracterizacion/$codigo/caracterizacion-predio",
	getParentRoute: () => RecolectorCampoRoute
});
var ProyectosProjectIdPrediosCodigoTransferenciaInterestatalSbnRoute = Route$106.update({
	id: "/proyectos/$projectId/predios/$codigo/transferencia-interestatal-sbn",
	path: "/proyectos/$projectId/predios/$codigo/transferencia-interestatal-sbn",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoTransferenciaDocumentariaOpatRoute = Route$107.update({
	id: "/proyectos/$projectId/predios/$codigo/transferencia-documentaria-opat",
	path: "/proyectos/$projectId/predios/$codigo/transferencia-documentaria-opat",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoSujetoPasivoRoute = Route$108.update({
	id: "/proyectos/$projectId/predios/$codigo/sujeto-pasivo",
	path: "/proyectos/$projectId/predios/$codigo/sujeto-pasivo",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoSaneamientoRegistralRoute = Route$109.update({
	id: "/proyectos/$projectId/predios/$codigo/saneamiento-registral",
	path: "/proyectos/$projectId/predios/$codigo/saneamiento-registral",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoRevisionTasacionRoute = Route$110.update({
	id: "/proyectos/$projectId/predios/$codigo/revision-tasacion",
	path: "/proyectos/$projectId/predios/$codigo/revision-tasacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoRespuestaSujetoPasivoRoute = Route$111.update({
	id: "/proyectos/$projectId/predios/$codigo/respuesta-sujeto-pasivo",
	path: "/proyectos/$projectId/predios/$codigo/respuesta-sujeto-pasivo",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoResolucionSbnRoute = Route$112.update({
	id: "/proyectos/$projectId/predios/$codigo/resolucion-sbn",
	path: "/proyectos/$projectId/predios/$codigo/resolucion-sbn",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoRequerimientoTasacionItlRoute = Route$113.update({
	id: "/proyectos/$projectId/predios/$codigo/requerimiento-tasacion-itl",
	path: "/proyectos/$projectId/predios/$codigo/requerimiento-tasacion-itl",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoRequerimientoEntregaRoute = Route$114.update({
	id: "/proyectos/$projectId/predios/$codigo/requerimiento-entrega",
	path: "/proyectos/$projectId/predios/$codigo/requerimiento-entrega",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoReconocimientoMejorasRoute = Route$115.update({
	id: "/proyectos/$projectId/predios/$codigo/reconocimiento-mejoras",
	path: "/proyectos/$projectId/predios/$codigo/reconocimiento-mejoras",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoPublicacionOposicionesRoute = Route$116.update({
	id: "/proyectos/$projectId/predios/$codigo/publicacion-oposiciones",
	path: "/proyectos/$projectId/predios/$codigo/publicacion-oposiciones",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoPublicacionNotificacionNormaRoute = Route$117.update({
	id: "/proyectos/$projectId/predios/$codigo/publicacion-notificacion-norma",
	path: "/proyectos/$projectId/predios/$codigo/publicacion-notificacion-norma",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoPlanSaneamientoRoute = Route$118.update({
	id: "/proyectos/$projectId/predios/$codigo/plan-saneamiento",
	path: "/proyectos/$projectId/predios/$codigo/plan-saneamiento",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoPeritoContratacionRoute = Route$119.update({
	id: "/proyectos/$projectId/predios/$codigo/perito-contratacion",
	path: "/proyectos/$projectId/predios/$codigo/perito-contratacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoPagoPropietariosRoute = Route$120.update({
	id: "/proyectos/$projectId/predios/$codigo/pago-propietarios",
	path: "/proyectos/$projectId/predios/$codigo/pago-propietarios",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoPagoConsignacionRoute = Route$121.update({
	id: "/proyectos/$projectId/predios/$codigo/pago-consignacion",
	path: "/proyectos/$projectId/predios/$codigo/pago-consignacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoMonitoreoRoute = Route$122.update({
	id: "/proyectos/$projectId/predios/$codigo/monitoreo",
	path: "/proyectos/$projectId/predios/$codigo/monitoreo",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoModalidadAdquisicionRoute = Route$123.update({
	id: "/proyectos/$projectId/predios/$codigo/modalidad-adquisicion",
	path: "/proyectos/$projectId/predios/$codigo/modalidad-adquisicion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoLiberacionAnticipadaAreasRoute = Route$124.update({
	id: "/proyectos/$projectId/predios/$codigo/liberacion-anticipada-areas",
	path: "/proyectos/$projectId/predios/$codigo/liberacion-anticipada-areas",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoLeyAutoritativaRoute = Route$125.update({
	id: "/proyectos/$projectId/predios/$codigo/ley-autoritativa",
	path: "/proyectos/$projectId/predios/$codigo/ley-autoritativa",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoLevantamientoInformacionTecnicaRoute = Route$126.update({
	id: "/proyectos/$projectId/predios/$codigo/levantamiento-informacion-tecnica",
	path: "/proyectos/$projectId/predios/$codigo/levantamiento-informacion-tecnica",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoInscripcionSunarpRoute = Route$127.update({
	id: "/proyectos/$projectId/predios/$codigo/inscripcion-sunarp",
	path: "/proyectos/$projectId/predios/$codigo/inscripcion-sunarp",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoInscripcionRegistralSidRoute = Route$128.update({
	id: "/proyectos/$projectId/predios/$codigo/inscripcion-registral-sid",
	path: "/proyectos/$projectId/predios/$codigo/inscripcion-registral-sid",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoInscripcionRegistralRoute = Route$129.update({
	id: "/proyectos/$projectId/predios/$codigo/inscripcion-registral",
	path: "/proyectos/$projectId/predios/$codigo/inscripcion-registral",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoInicioExpropiacionRoute = Route$130.update({
	id: "/proyectos/$projectId/predios/$codigo/inicio-expropiacion",
	path: "/proyectos/$projectId/predios/$codigo/inicio-expropiacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoInformeVerificadorEspecialistaRoute = Route$131.update({
	id: "/proyectos/$projectId/predios/$codigo/informe-verificador-especialista",
	path: "/proyectos/$projectId/predios/$codigo/informe-verificador-especialista",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoInformeTecnicoLegalExpropiacionRoute = Route$132.update({
	id: "/proyectos/$projectId/predios/$codigo/informe-tecnico-legal-expropiacion",
	path: "/proyectos/$projectId/predios/$codigo/informe-tecnico-legal-expropiacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoInformeTecnicoLegalRoute = Route$133.update({
	id: "/proyectos/$projectId/predios/$codigo/informe-tecnico-legal",
	path: "/proyectos/$projectId/predios/$codigo/informe-tecnico-legal",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoIdentificacionCodificacionRoute = Route$134.update({
	id: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
	path: "/proyectos/$projectId/predios/$codigo/identificacion-codificacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoGestionResolucionRdRoute = Route$135.update({
	id: "/proyectos/$projectId/predios/$codigo/gestion-resolucion-rd",
	path: "/proyectos/$projectId/predios/$codigo/gestion-resolucion-rd",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoGestionDocumentosDgpptVmtRoute = Route$1.update({
	id: "/proyectos/$projectId/predios/$codigo/gestion-documentos-dgppt-vmt",
	path: "/proyectos/$projectId/predios/$codigo/gestion-documentos-dgppt-vmt",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoGestionDevengadoRoute = Route$136.update({
	id: "/proyectos/$projectId/predios/$codigo/gestion-devengado",
	path: "/proyectos/$projectId/predios/$codigo/gestion-devengado",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoFormularioRegistralRoute = Route$137.update({
	id: "/proyectos/$projectId/predios/$codigo/formulario-registral",
	path: "/proyectos/$projectId/predios/$codigo/formulario-registral",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoExpropiacionRoute = Route$138.update({
	id: "/proyectos/$projectId/predios/$codigo/expropiacion",
	path: "/proyectos/$projectId/predios/$codigo/expropiacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoExpedienteTasacionRoute = Route$139.update({
	id: "/proyectos/$projectId/predios/$codigo/expediente-tasacion",
	path: "/proyectos/$projectId/predios/$codigo/expediente-tasacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoExpedienteDigitalRoute = Route$140.update({
	id: "/proyectos/$projectId/predios/$codigo/expediente-digital",
	path: "/proyectos/$projectId/predios/$codigo/expediente-digital",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoExpedienteAfectacionRoute = Route$141.update({
	id: "/proyectos/$projectId/predios/$codigo/expediente-afectacion",
	path: "/proyectos/$projectId/predios/$codigo/expediente-afectacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoEntregaRecepcionDdpOpatRoute = Route$142.update({
	id: "/proyectos/$projectId/predios/$codigo/entrega-recepcion-ddp-opat",
	path: "/proyectos/$projectId/predios/$codigo/entrega-recepcion-ddp-opat",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoEntregaProvisionalRoute = Route$143.update({
	id: "/proyectos/$projectId/predios/$codigo/entrega-provisional",
	path: "/proyectos/$projectId/predios/$codigo/entrega-provisional",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoEntregaPosesionRoute = Route$144.update({
	id: "/proyectos/$projectId/predios/$codigo/entrega-posesion",
	path: "/proyectos/$projectId/predios/$codigo/entrega-posesion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoEntregaAnticipadaRoute = Route$145.update({
	id: "/proyectos/$projectId/predios/$codigo/entrega-anticipada",
	path: "/proyectos/$projectId/predios/$codigo/entrega-anticipada",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoEntidadTitularRoute = Route$146.update({
	id: "/proyectos/$projectId/predios/$codigo/entidad-titular",
	path: "/proyectos/$projectId/predios/$codigo/entidad-titular",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoEmpadronamientoInspeccionCampoRoute = Route$147.update({
	id: "/proyectos/$projectId/predios/$codigo/empadronamiento-inspeccion-campo",
	path: "/proyectos/$projectId/predios/$codigo/empadronamiento-inspeccion-campo",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoElevacionExpedienteRoute = Route$148.update({
	id: "/proyectos/$projectId/predios/$codigo/elevacion-expediente",
	path: "/proyectos/$projectId/predios/$codigo/elevacion-expediente",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoEjecucionCoactivaRoute = Route$149.update({
	id: "/proyectos/$projectId/predios/$codigo/ejecucion-coactiva",
	path: "/proyectos/$projectId/predios/$codigo/ejecucion-coactiva",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoDiscrepanciasRoute = Route$150.update({
	id: "/proyectos/$projectId/predios/$codigo/discrepancias",
	path: "/proyectos/$projectId/predios/$codigo/discrepancias",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoDiagnosticoPreliminarRoute = Route$151.update({
	id: "/proyectos/$projectId/predios/$codigo/diagnostico-preliminar",
	path: "/proyectos/$projectId/predios/$codigo/diagnostico-preliminar",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoDeclaratoriaRoute = Route$152.update({
	id: "/proyectos/$projectId/predios/$codigo/declaratoria",
	path: "/proyectos/$projectId/predios/$codigo/declaratoria",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoDatosTecnicosRoute = Route$153.update({
	id: "/proyectos/$projectId/predios/$codigo/datos-tecnicos",
	path: "/proyectos/$projectId/predios/$codigo/datos-tecnicos",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoDatosLegalesRoute = Route$154.update({
	id: "/proyectos/$projectId/predios/$codigo/datos-legales",
	path: "/proyectos/$projectId/predios/$codigo/datos-legales",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoConsignacionRoute = Route$155.update({
	id: "/proyectos/$projectId/predios/$codigo/consignacion",
	path: "/proyectos/$projectId/predios/$codigo/consignacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoComunicacionAfectacionRoute = Route$156.update({
	id: "/proyectos/$projectId/predios/$codigo/comunicacion-afectacion",
	path: "/proyectos/$projectId/predios/$codigo/comunicacion-afectacion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoCertificadoRegistralInmobiliarioRoute = Route$157.update({
	id: "/proyectos/$projectId/predios/$codigo/certificado-registral-inmobiliario",
	path: "/proyectos/$projectId/predios/$codigo/certificado-registral-inmobiliario",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoCertificacionPresupuestalCcpRoute = Route$158.update({
	id: "/proyectos/$projectId/predios/$codigo/certificacion-presupuestal-ccp",
	path: "/proyectos/$projectId/predios/$codigo/certificacion-presupuestal-ccp",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoCbcRoute = Route$159.update({
	id: "/proyectos/$projectId/predios/$codigo/cbc",
	path: "/proyectos/$projectId/predios/$codigo/cbc",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoCartaIntencionRoute = Route$160.update({
	id: "/proyectos/$projectId/predios/$codigo/carta-intencion",
	path: "/proyectos/$projectId/predios/$codigo/carta-intencion",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoCaracterizacionPredioRoute = Route$161.update({
	id: "/proyectos/$projectId/predios/$codigo/caracterizacion-predio",
	path: "/proyectos/$projectId/predios/$codigo/caracterizacion-predio",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoAsignacionPredialRoute = Route$162.update({
	id: "/proyectos/$projectId/predios/$codigo/asignacion-predial",
	path: "/proyectos/$projectId/predios/$codigo/asignacion-predial",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoArbitrajeRoute = Route$163.update({
	id: "/proyectos/$projectId/predios/$codigo/arbitraje",
	path: "/proyectos/$projectId/predios/$codigo/arbitraje",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoAnotacionPreventivaRoute = Route$164.update({
	id: "/proyectos/$projectId/predios/$codigo/anotacion-preventiva",
	path: "/proyectos/$projectId/predios/$codigo/anotacion-preventiva",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoAfectadoBloqueRoute = Route$165.update({
	id: "/proyectos/$projectId/predios/$codigo/afectado-bloque",
	path: "/proyectos/$projectId/predios/$codigo/afectado-bloque",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoAcuerdoMejorasRoute = Route$166.update({
	id: "/proyectos/$projectId/predios/$codigo/acuerdo-mejoras",
	path: "/proyectos/$projectId/predios/$codigo/acuerdo-mejoras",
	getParentRoute: () => Route$72
});
var ProyectosProjectIdPrediosCodigoLevantamientoInformacionTecnicaPartidasRegistralesRoute = Route$167.update({
	id: "/proyectos/$projectId/predios/$codigo/levantamiento-informacion-tecnica_/partidas-registrales",
	path: "/proyectos/$projectId/predios/$codigo/levantamiento-informacion-tecnica/partidas-registrales",
	getParentRoute: () => Route$72
});
var RecolectorCampoRouteChildren = {
	RecolectorCampoIndexRoute,
	RecolectorCampoProjectIdEnviarRoute,
	RecolectorCampoProjectIdMapaRoute,
	RecolectorCampoProjectIdIndexRoute,
	RecolectorCampoProjectIdPadronFichaRoute,
	RecolectorCampoProjectIdPadronNuevaRoute,
	RecolectorCampoProjectIdCaracterizacionIndexRoute,
	RecolectorCampoProjectIdPadronIndexRoute,
	RecolectorCampoProjectIdCaracterizacionCodigoCaracterizacionPredioRoute,
	RecolectorCampoProjectIdCaracterizacionCodigoEmpadronamientoRoute,
	RecolectorCampoProjectIdCaracterizacionCodigoNotificacionRoute,
	RecolectorCampoProjectIdCaracterizacionCodigoSujetoPasivoRoute,
	RecolectorCampoProjectIdCaracterizacionCodigoIndexRoute
};
var RecolectorCampoRouteWithChildren = RecolectorCampoRoute._addFileChildren(RecolectorCampoRouteChildren);
var SeguimientoMonitoreoRouteChildren = {
	SeguimientoMonitoreoCarteraLiberacionRoute,
	SeguimientoMonitoreoContractualServiciosInterferenciasRoute,
	SeguimientoMonitoreoDashboardFinancieroRoute,
	SeguimientoMonitoreoDashboardGeograficoRoute,
	SeguimientoMonitoreoGastosProyectoPredioRoute,
	SeguimientoMonitoreoGeneralRoute,
	SeguimientoMonitoreoInscripcionesRoute,
	SeguimientoMonitoreoIntegradoCeplanSiafRoute,
	SeguimientoMonitoreoIntegradoProyectosRoute,
	SeguimientoMonitoreoLegalRiesgosPlazosRoute,
	SeguimientoMonitoreoPredialRoute,
	SeguimientoMonitoreoPrediosPrivadosRoute,
	SeguimientoMonitoreoPresupuestalPredioRoute,
	SeguimientoMonitoreoSeguimientoPersonalRoute,
	SeguimientoMonitoreoTecnicoTasacionesRoute,
	SeguimientoMonitoreoTerritorialIntegralRoute,
	SeguimientoMonitoreoTerritorialPagosCierreRoute,
	SeguimientoMonitoreoTransferenciaInterestatalRoute,
	SeguimientoMonitoreoIndexRoute
};
var SeguimientoMonitoreoRouteWithChildren = SeguimientoMonitoreoRoute._addFileChildren(SeguimientoMonitoreoRouteChildren);
var SeguridadRolesRouteChildren = {
	SeguridadRolesIndexRoute,
	SeguridadRolesRoleIdPermisosRoute
};
var SeguridadRolesRouteWithChildren = SeguridadRolesRoute._addFileChildren(SeguridadRolesRouteChildren);
var ProyectosProjectIdBaseGraficaRouteChildren = {
	ProyectosProjectIdBaseGraficaRegistroRoute,
	ProyectosProjectIdBaseGraficaIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AnunciosRoute,
	ExpropiacionRoute,
	GestionDocumentalRoute,
	GestionPredialSocialRoute,
	GestionPresupuestalRoute,
	GestionResolucionRoute,
	GestionSocialRoute,
	InicioRoute,
	InscripcionRegistralRoute,
	InterferenciasRoute,
	InteroperabilidadRoute,
	KitRoute,
	MapaRoute,
	PagoRoute,
	PagoConsignacionRoute,
	RecolectorCampoRoute: RecolectorCampoRouteWithChildren,
	ReconocimientoMejorasRoute,
	RecuperarRoute,
	RegularizacionRoute,
	SeguimientoAdquisicionRoute,
	SeguimientoMonitoreoRoute: SeguimientoMonitoreoRouteWithChildren,
	SeguimientoSujetoPasivoRoute,
	ServiciosRoute,
	TransferenciaInterestatalRoute,
	TratoDirectoRoute,
	VerificarRoute,
	ConfiguracionAccesoRoute,
	ConfiguracionCorreosRoute,
	ConfiguracionFotosRoute,
	ConfiguracionHitosPlazosRoute,
	ConfiguracionMaestrosRoute,
	ConfiguracionSiafCeplanRoute,
	ConfiguracionSmsRoute,
	ProyectosRegistroRoute,
	SeguridadAccesoGisRoute,
	SeguridadAreasRoute,
	SeguridadAuditoriaRoute,
	SeguridadBitacoraRoute,
	SeguridadRolesRoute: SeguridadRolesRouteWithChildren,
	SeguridadUsuariosRoute,
	ProyectosIndexRoute,
	ApiGisSplatRoute,
	ProyectosProjectIdBaseGraficaRoute: ProyectosProjectIdBaseGraficaRoute._addFileChildren(ProyectosProjectIdBaseGraficaRouteChildren),
	ProyectosProjectIdBimRoute,
	ProyectosProjectIdCodigosPlanosRoute,
	ProyectosProjectIdCodigosPrediosRoute,
	ProyectosProjectIdEquiposRoute,
	ProyectosProjectIdEvaluacionInformacionRoute,
	ProyectosProjectIdExpedientesRoute,
	ProyectosProjectIdLiberacionBloqueRoute,
	ProyectosProjectIdMapaRoute,
	ProyectosProjectIdMetasRoute,
	ProyectosProjectIdNormasHabilitantesRoute,
	ProyectosProjectIdPadronRoute,
	ProyectosProjectIdPadronPreliminarRoute,
	ProyectosProjectIdRequerimientosRoute,
	SeguridadAnunciosIdRoute,
	SeguridadDocumentosExpedienteRoute,
	SeguridadDocumentosGeneradosRoute,
	SeguridadDocumentosNumeracionRoute,
	SeguridadDocumentosTiposRoute,
	SeguridadManualesIdRoute,
	ProyectosProjectIdIndexRoute,
	SeguridadAnunciosIndexRoute,
	SeguridadManualesIndexRoute,
	ProyectosProjectIdPrediosIndexRoute,
	ProyectosProjectIdPrediosCodigoAcuerdoMejorasRoute,
	ProyectosProjectIdPrediosCodigoAfectadoBloqueRoute,
	ProyectosProjectIdPrediosCodigoAnotacionPreventivaRoute,
	ProyectosProjectIdPrediosCodigoArbitrajeRoute,
	ProyectosProjectIdPrediosCodigoAsignacionPredialRoute,
	ProyectosProjectIdPrediosCodigoCaracterizacionPredioRoute,
	ProyectosProjectIdPrediosCodigoCartaIntencionRoute,
	ProyectosProjectIdPrediosCodigoCbcRoute,
	ProyectosProjectIdPrediosCodigoCertificacionPresupuestalCcpRoute,
	ProyectosProjectIdPrediosCodigoCertificadoRegistralInmobiliarioRoute,
	ProyectosProjectIdPrediosCodigoComunicacionAfectacionRoute,
	ProyectosProjectIdPrediosCodigoConsignacionRoute,
	ProyectosProjectIdPrediosCodigoDatosLegalesRoute,
	ProyectosProjectIdPrediosCodigoDatosTecnicosRoute,
	ProyectosProjectIdPrediosCodigoDeclaratoriaRoute,
	ProyectosProjectIdPrediosCodigoDiagnosticoPreliminarRoute,
	ProyectosProjectIdPrediosCodigoDiscrepanciasRoute,
	ProyectosProjectIdPrediosCodigoEjecucionCoactivaRoute,
	ProyectosProjectIdPrediosCodigoElevacionExpedienteRoute,
	ProyectosProjectIdPrediosCodigoEmpadronamientoInspeccionCampoRoute,
	ProyectosProjectIdPrediosCodigoEntidadTitularRoute,
	ProyectosProjectIdPrediosCodigoEntregaAnticipadaRoute,
	ProyectosProjectIdPrediosCodigoEntregaPosesionRoute,
	ProyectosProjectIdPrediosCodigoEntregaProvisionalRoute,
	ProyectosProjectIdPrediosCodigoEntregaRecepcionDdpOpatRoute,
	ProyectosProjectIdPrediosCodigoExpedienteAfectacionRoute,
	ProyectosProjectIdPrediosCodigoExpedienteDigitalRoute,
	ProyectosProjectIdPrediosCodigoExpedienteTasacionRoute,
	ProyectosProjectIdPrediosCodigoExpropiacionRoute,
	ProyectosProjectIdPrediosCodigoFormularioRegistralRoute,
	ProyectosProjectIdPrediosCodigoGestionDevengadoRoute,
	ProyectosProjectIdPrediosCodigoGestionDocumentosDgpptVmtRoute,
	ProyectosProjectIdPrediosCodigoGestionResolucionRdRoute,
	ProyectosProjectIdPrediosCodigoIdentificacionCodificacionRoute,
	ProyectosProjectIdPrediosCodigoInformeTecnicoLegalRoute,
	ProyectosProjectIdPrediosCodigoInformeTecnicoLegalExpropiacionRoute,
	ProyectosProjectIdPrediosCodigoInformeVerificadorEspecialistaRoute,
	ProyectosProjectIdPrediosCodigoInicioExpropiacionRoute,
	ProyectosProjectIdPrediosCodigoInscripcionRegistralRoute,
	ProyectosProjectIdPrediosCodigoInscripcionRegistralSidRoute,
	ProyectosProjectIdPrediosCodigoInscripcionSunarpRoute,
	ProyectosProjectIdPrediosCodigoLevantamientoInformacionTecnicaRoute,
	ProyectosProjectIdPrediosCodigoLeyAutoritativaRoute,
	ProyectosProjectIdPrediosCodigoLiberacionAnticipadaAreasRoute,
	ProyectosProjectIdPrediosCodigoModalidadAdquisicionRoute,
	ProyectosProjectIdPrediosCodigoMonitoreoRoute,
	ProyectosProjectIdPrediosCodigoPagoConsignacionRoute,
	ProyectosProjectIdPrediosCodigoPagoPropietariosRoute,
	ProyectosProjectIdPrediosCodigoPeritoContratacionRoute,
	ProyectosProjectIdPrediosCodigoPlanSaneamientoRoute,
	ProyectosProjectIdPrediosCodigoPublicacionNotificacionNormaRoute,
	ProyectosProjectIdPrediosCodigoPublicacionOposicionesRoute,
	ProyectosProjectIdPrediosCodigoReconocimientoMejorasRoute,
	ProyectosProjectIdPrediosCodigoRequerimientoEntregaRoute,
	ProyectosProjectIdPrediosCodigoRequerimientoTasacionItlRoute,
	ProyectosProjectIdPrediosCodigoResolucionSbnRoute,
	ProyectosProjectIdPrediosCodigoRespuestaSujetoPasivoRoute,
	ProyectosProjectIdPrediosCodigoRevisionTasacionRoute,
	ProyectosProjectIdPrediosCodigoSaneamientoRegistralRoute,
	ProyectosProjectIdPrediosCodigoSujetoPasivoRoute,
	ProyectosProjectIdPrediosCodigoTransferenciaDocumentariaOpatRoute,
	ProyectosProjectIdPrediosCodigoTransferenciaInterestatalSbnRoute,
	ProyectosProjectIdPrediosCodigoLevantamientoInformacionTecnicaPartidasRegistralesRoute
};
var routeTree = Route$72._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultRemountDeps: ({ params }) => params
	});
};
//#endregion
export { getRouter };
