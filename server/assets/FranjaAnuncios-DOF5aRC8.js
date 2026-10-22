import { m as fecha } from "./archivosIdb-BbjJAFd8.js";
import { u as useRol } from "./permisos-C7yUz4DS.js";
import { E as textoPlano, O as useAnuncios, b as marcarLeido, g as lectorActual, j as vigentesParaUsuario, n as alcanceTexto, y as leido } from "./anuncios-CchLukSd.js";
import { a as PieLectura, i as ModalAnuncio } from "./Anuncio-BIz5COtU.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Check, Megaphone, Paperclip } from "lucide-react";
//#region src/components/shell/FranjaAnuncios.tsx
/**
* Anuncios sin leer del perfil activo: hasta dos, importantes primero. Va en el portal de módulos
* y, con `projectId`, en el Resumen del proyecto (solo los de ese proyecto). Sin anuncios, no ocupa lugar.
*/
function FranjaAnuncios({ projectId, variante = "portal" }) {
	const datos = useAnuncios();
	const rol = useRol();
	const [lector, setLector] = useState("");
	useEffect(() => setLector(lectorActual()), []);
	const [modal, setModal] = useState(null);
	const pendientes = vigentesParaUsuario(datos.anuncios, rol, projectId).filter((a) => !leido(datos, a.id, lector));
	const candidato = pendientes.find((a) => a.emergente !== false);
	const emergente = modal === "cerrado" ? void 0 : pendientes.find((a) => a.id === modal) ?? (variante === "portal" && modal === null ? candidato : void 0);
	useEffect(() => {
		if (variante !== "portal" || modal !== null || !lector || !candidato) return;
		let visto = false;
		try {
			visto = sessionStorage.getItem("pdgp-anuncio-visto") === candidato.id;
			sessionStorage.setItem("pdgp-anuncio-visto", candidato.id);
		} catch {}
		setModal(visto ? "cerrado" : candidato.id);
	}, [
		variante,
		modal,
		lector,
		candidato
	]);
	if (!lector || pendientes.length === 0) return null;
	const visibles = pendientes.slice(0, 2);
	const resto = pendientes.length - visibles.length;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [emergente && /* @__PURE__ */ jsx(ModalAnuncio, {
		anuncio: emergente,
		abierto: true,
		onCerrar: () => setModal("cerrado"),
		meta: `${fecha(emergente.mostrarDesde || emergente.publicadoEl)} · ${alcanceTexto(emergente.alcance)} · ${emergente.autor}`,
		pie: /* @__PURE__ */ jsx(PieLectura, {
			onMasTarde: () => setModal("cerrado"),
			onLeido: () => {
				marcarLeido(emergente.id, lector);
				setModal("cerrado");
			}
		})
	}), /* @__PURE__ */ jsxs("section", {
		"aria-label": projectId ? "Anuncios del proyecto" : "Anuncios",
		className: variante === "portal" ? "mt-5 space-y-2" : "mb-4 space-y-2",
		children: [
			variante === "tarjeta" && /* @__PURE__ */ jsxs("h2", {
				className: "flex items-center gap-2 text-sm font-bold uppercase text-primary-dark",
				children: [/* @__PURE__ */ jsx(Megaphone, {
					size: 16,
					"aria-hidden": true
				}), " Anuncios del proyecto"]
			}),
			visibles.map((a) => {
				const importante = a.prioridad === "importante";
				return /* @__PURE__ */ jsxs("div", {
					className: `flex flex-wrap items-start gap-3 rounded-lg border bg-card px-4 py-3 ${importante ? "border-destructive" : "border-border"}`,
					children: [
						/* @__PURE__ */ jsx(Megaphone, {
							size: 18,
							className: `mt-0.5 shrink-0 ${importante ? "text-destructive" : "text-primary"}`,
							"aria-hidden": true
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "text-sm font-semibold text-foreground",
									children: [importante && /* @__PURE__ */ jsx("span", {
										className: "mr-2 text-xs font-semibold uppercase text-destructive",
										children: "Importante"
									}), a.titulo]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "line-clamp-2 text-xs text-muted-foreground",
									children: textoPlano(a.mensaje)
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "mt-1 flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground",
									children: [
										fecha(a.mostrarDesde || a.publicadoEl),
										" · ",
										alcanceTexto(a.alcance),
										(a.adjuntos?.length ?? 0) > 0 && /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-0.5",
											children: [
												"· ",
												/* @__PURE__ */ jsx(Paperclip, {
													size: 12,
													"aria-hidden": true
												}),
												" ",
												a.adjuntos.length,
												" ",
												a.adjuntos.length === 1 ? "adjunto" : "adjuntos"
											]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setModal(a.id),
								className: "text-xs font-medium text-primary-dark underline underline-offset-2 hover:no-underline",
								children: "Leer"
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => marcarLeido(a.id, lector),
								className: "flex h-8 items-center gap-1 rounded-md border border-border px-2 text-xs font-medium text-foreground hover:bg-muted",
								children: [/* @__PURE__ */ jsx(Check, {
									size: 14,
									"aria-hidden": true
								}), " Leído"]
							})]
						})
					]
				}, a.id);
			}),
			resto > 0 && /* @__PURE__ */ jsx(Link, {
				to: "/anuncios",
				className: `inline-block text-xs font-medium underline underline-offset-2 hover:no-underline ${variante === "portal" ? "text-primary-foreground" : "text-primary-dark"}`,
				children: resto === 1 ? "1 anuncio más" : `${resto} anuncios más`
			})
		]
	})] });
}
//#endregion
export { FranjaAnuncios as t };
