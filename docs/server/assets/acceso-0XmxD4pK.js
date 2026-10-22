import { r as registrarCambio } from "./historial-Bc37nCTn.js";
import { n as reducirImagen } from "./fotoRender-BT_YRQ8T.js";
import { n as useAlmacen } from "./almacen-BgvL3X8T.js";
import "./login-bg-CFFUB6xk.js";
/** Correo correcto para la demostración: "bim" o "bim@cualquier.dominio" con la clave de demostración. */
var credencialesValidas = (correo, clave) => correo.trim().toLowerCase().split("@")[0] === "bim" && clave === "Bim2026*";
var CLAVE_ACCESO = "pdgp-acceso";
var REGISTRO_ACCESO = "config-acceso";
var ACCESO_POR_DEFECTO = {
	fondo: "banner",
	color: "",
	imagen: "",
	velo: 70
};
var LADO_FONDO = 1920;
var useConfigAcceso = () => useAlmacen(CLAVE_ACCESO, ACCESO_POR_DEFECTO);
/** Estilo del panel: banner (subido o institucional) con velo, o color sólido (vacío = tema). */
function fondoAcceso(c) {
	if (c.fondo === "color") return c.color ? { backgroundColor: c.color } : {};
	const v = Math.min(1, Math.max(0, c.velo / 100));
	return {
		backgroundImage: `linear-gradient(rgba(255,255,255,${v}), rgba(255,255,255,${v})), url(${c.imagen || "/assets/login-bg-5TeyhAPx.png"})`,
		backgroundSize: "cover",
		backgroundPosition: "center"
	};
}
/** Imagen reducida a 1920 px y en JPEG, lista para guardarse como fondo. */
async function imagenDeFondo(archivo) {
	const { blob } = await reducirImagen(archivo, LADO_FONDO, .8);
	return new Promise((resolver, rechazar) => {
		const lector = new FileReader();
		lector.onload = () => resolver(lector.result);
		lector.onerror = () => rechazar(/* @__PURE__ */ new Error("No se pudo leer la imagen."));
		lector.readAsDataURL(blob);
	});
}
function registrarConfigAcceso(antes, despues) {
	registrarCambio(REGISTRO_ACCESO, {
		accion: "Guardó la apariencia de la pantalla de acceso",
		objeto: despues.fondo === "color" ? despues.color || "fondo del tema" : despues.imagen ? "banner propio" : "banner institucional",
		antes,
		despues
	}, {
		modulo: 8,
		entidad: "configuracion_acceso"
	});
}
//#endregion
export { imagenDeFondo as a, fondoAcceso as i, REGISTRO_ACCESO as n, registrarConfigAcceso as o, credencialesValidas as r, useConfigAcceso as s, ACCESO_POR_DEFECTO as t };
