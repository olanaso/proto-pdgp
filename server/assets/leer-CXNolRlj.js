import proj4 from "proj4";
import { gpx, kml } from "@tmcw/togeojson";
//#region src/data/concesion.geojson?url
var concesion_default = "data:application/geo+json;base64,eyJ0eXBlIjoiRmVhdHVyZUNvbGxlY3Rpb24iLCJmZWF0dXJlcyI6W3sidHlwZSI6IkZlYXR1cmUiLCJnZW9tZXRyeSI6eyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiY29vcmRpbmF0ZXMiOltbW1stNzUuNDg0Njg4NDAyMDIzOCwtMTEuNzc1MjE4MjY4NjM1NywwXSxbLTc1LjQ4NDY5NjcwMTgwNjYsLTExLjc3NTI2NjM0NjQyNDgsMF0sWy03NS40ODQxMjExMDc5OTcyLC0xMS43NzY5MzI0OTE2OTQ0LDBdLFstNzUuNDg0MDQyNjgyMTEyOSwtMTEuNzc2OTI3MzM0OTE4OCwwXSxbLTc1LjQ4MjczNjkyMzIyOCwtMTEuNzc2ODMxNDI1Mzk1OCwwXSxbLTc1LjQ4MDEwNTg2NDQwNTQsLTExLjc3ODg0MTEwNDQ3MjcsMF0sWy03NS40ODAwOTY2NDIyNTE5LC0xMS43Nzg4NTQ4OTc3Nzg1LDBdLFstNzUuNDc5ODY3MjE5MTIyNywtMTEuNzc5MDIyMzU3NTIxNiwwXSxbLTc1LjQ3OTQwNjI2NDYwMTUsLTExLjc3OTM3Njg0MTM5NCwwXSxbLTc1LjQ3OTQwNjM4NTk5NDQsLTExLjc3OTM3NjkzNzk4MjEsMF0sWy03NS40NzkyMjQwODg5MTMxLC0xMS43Nzk1MDk5OTk0MzYxLDBdLFstNzUuNDc5MTcwMjQ2OTE1MiwtMTEuNzc5NTUyODEzNzAzNSwwXSxbLTc1LjQ3ODg4NzUzOTI0OTIsLTExLjc3OTc2Nzg0OTk1NTEsMF0sWy03NS40Nzg4MTk2NjQwMDc5LC0xMS43Nzk4MjU2NzE5NzYyLDBdLFstNzUuNDc4NDc5NDkyMDk3NywtMTEuNzgwMDg2NjU1NzA0MywwXSxbLTc1LjQ3ODE3Mzg3OTY0NzEsLTExLjc4MDMxODAzNDgyOTIsMF0sWy03NS40NzgxNTI5MzMxNTYxLC0xMS43ODAzMzM4OTMzODc1LDBdLFstNzUuNDc2OTM2MzYyMjAyMiwtMTEuNzgxMjYwNzk3OTU5LDBdLFstNzUuNDc2MDQzODMzOTQ0OCwtMTEuNzgxOTQ2MDY4ODI5MiwwXSxbLTc1LjQ3NDMyMzI2MDgyMTEsLTExLjc4MzI1OTkwNjAxNCwwXSxbLTc1LjQ3NDM4MzkxMjkyMzEsLTExLjc4MzM0MjExOTkwODEsMF0sWy03NS40NzQ0NTI3ODQyNjAzLC0xMS43ODM0MTE1OTI5Mjk5LDBdLFstNzUuNDc0NTk5NzQ0MjQ5OCwtMTEuNzgzNTUyNDIxMjU4MywwXSxbLTc1LjQ3NDk3MDU2NzMzNzksLTExLjc4Mzg5Nzc4MjEwMjQsMF0sWy03NS40NzQ5MDI2NjMzNzc0LC0xMS43ODM5NTE2Nzc3MTUyLDBdLFstNzUuNDc0MDU1MDAwMzU1OSwtMTEuNzg0NjAwMzU2OTg1OCwwXSxbLTc1LjQ3MzkxMTczNzY3MDUsLTExLjc4NDcwODY2NTU4MTEsMF0sWy03NS40NzMwNTY1MDA3MzQ2LC0xMS43ODUzNjQyMTM4NjMzLDBdLFstNzUuNDczMDA5NzAyODQ5NSwtMTEuNzg1MzAxODM5MDAwMSwwXSxbLTc1LjQ3Mjc3ODc4OTY0NjYsLTExLjc4NTAwMTMzNzY4NTEsMF0sWy03NS40NzI1MTI2MDUwODAyLC0xMS43ODQ2NTc3MTY0MjI3LDBdLFstNzUuNDcyMDM0Nzg0MTIxMSwtMTEuNzg1MDI1NDg5NTYzNCwwXSxbLTc1LjQ3MTYxNzEwMTQxMDQsLTExLjc4NTM0NTQzMTUzOTUsMF0sWy03NS40NzA3MzQzMjQ0OTk2LC0xMS43ODYwMTMzNDMyMDU4LDBdLFstNzUuNDY3NTU4ODc5MTk3OCwtMTEuNzg4NDM4OTQxNDE0OCwwXSxbLTc1LjQ2NjIzMDU1NzA5NjksLTExLjc4OTQ1NDg3NTY3ODEsMF0sWy03NS40NjU3ODQzOTE0ODcsLTExLjc4OTc5NDU2ODk1OTMsMF0sWy03NS40NjUxNzM1OTAxNTc3LC0xMS43OTAyNjExNTAzODM1LDBdLFstNzUuNDY0NTM0NzAzMjE4MSwtMTEuNzkwNzQ3OTY5Nzc0NCwwXSxbLTc1LjQ2MjkxNjg3Mjg5NSwtMTEuNzkxOTkxNjcyMjM5OSwwXSxbLTc1LjQ2Mjg4MjkwNDQxMDgsLTExLjc5MjAxMzYwNDQ0ODMsMF0sWy03NS40NjI4NjM2MDk4NTM0LC0xMS43OTE5OTEwMjU4MDk3LDBdLFstNzUuNDYyMjc0Mzg2MTA1MSwtMTEuNzkxMjQxMDU1MTQ4NiwwXSxbLTc1LjQ2MjYxMTY4NDcyNDIsLTExLjc5MDk4MjY0ODQ1MzksMF0sWy03NS40NjQzMDAxNTE3MzUyLC0xMS43ODk2OTI1NTc3NjQxLDBdLFstNzUuNDY1MDQyMTM4NDM4LC0xMS43ODkxMjU2MjgyODExLDBdLFstNzUuNDY1OTEyNDI4MTY5NSwtMTEuNzg4NDYwNjYxMDEzMSwwXSxbLTc1LjQ2NjI5NDk4OTgyODYsLTExLjc4ODE2ODkzMTk1MzgsMF0sWy03NS40Njc2NzM4MDA4ODUzLC0xMS43ODcxMTM5ODcwOTUzLDBdLFstNzUuNDcxNjQyMjMxODQ3LC0xMS43ODQwODA4NjkxMzQ3LDBdLFstNzUuNDczNzc1MDk2Mjk1MiwtMTEuNzgyNDUxMDEyOTU4NywwXSxbLTc1LjQ3NDAzNjQ3NjE3OTksLTExLjc4MjI1MjQ0NTQwMjMsMF0sWy03NS40NzYwMzEyNTY0NTAxLC0xMS43ODA3MjgxNDAzNjQ0LDBdLFstNzUuNDc2MDM3OTg1NTIyNywtMTEuNzgwNzMwOTQ3MjU5OSwwXSxbLTc1LjQ3Njk5NjU1NjY2NywtMTEuNzc5OTkwNDk4Mzg5OCwwXSxbLTc1LjQ3NzEwNTQ1NDU5MjIsLTExLjc3OTkwOTgzNjI5NTUsMF0sWy03NS40Nzc0NDc5ODk3MzQzLC0xMS43Nzk2NTIwMTc3NzQ4LDBdLFstNzUuNDc3Njk1OTI3NTQ0MSwtMTEuNzc5NDU5MDE0NTg0NiwwXSxbLTc1LjQ3NzkyNjkxMzMwNzIsLTExLjc3OTMwMTA5NTc0MTUsMF0sWy03NS40NzgxNDYyMjk0Mzg3LC0xMS43NzkxMjMzNzE1NjQ0LDBdLFstNzUuNDc4NTAwNjMyMDU0NiwtMTEuNzc4ODQ2MTE0NTc5NywwXSxbLTc1LjQ3ODUyNzIzMjYxMDMsLTExLjc3ODgyNTMwNDM5OTQsMF0sWy03NS40Nzg1MjQ1NTU5MzQ0LC0xMS43Nzg4MjI4NjI4MjkyLDBdLFstNzUuNDc4Njc5NzM4ODQxNywtMTEuNzc4NzA0MjY0MTU3NCwwXSxbLTc1LjQ3ODY4MTM3NzA1MzIsLTExLjc3ODcwNTg3NjkzNTIsMF0sWy03NS40Nzk1NTEwNzc4MTEzLC0xMS43NzgwNDI1NDE0Nzg1LDBdLFstNzUuNDc5NTY0MjE3NzMxNiwtMTEuNzc4MDI4NTYxNDQ1OSwwXSxbLTc1LjQ4MDI3NzY1MDc3NjMsLTExLjc3NzQ4NTE3MDAzNjIsMF0sWy03NS40ODE0ODU3MTA2NDE5LC0xMS43NzY1NjE3MzQ3NTUzLDBdLFstNzUuNDgxNzg4Mzk0MDYzNiwtMTEuNzc2MzI5OTc5ODA1LDBdLFstNzUuNDgyMjIzNzQ5NTE4MywtMTEuNzc1OTk3ODM5Nzk2LDBdLFstNzUuNDgzMDA1OTkzNTYyNCwtMTEuNzc1Mzk5MDQ5MTM0MiwwXSxbLTc1LjQ4MzA0ODg4MjgxNDQsLTExLjc3NTM2NzA2NDc5OTMsMF0sWy03NS40ODM2MTQxMzE2MzE0LC0xMS43NzQ5MzMzNDIzOTA2LDBdLFstNzUuNDgzNzIzNDU0NzQ5OSwtMTEuNzc0ODUxMTIzNjQ1MSwwXSxbLTc1LjQ4Mzc4MzI2NTY4MDgsLTExLjc3NDg3MzM0NjM5MDYsMF0sWy03NS40ODQ2NjE3ODA5NjU1LC0xMS43NzUyMDQwMjU2MDk1LDBdLFstNzUuNDg0Njg4NDAyMDIzOCwtMTEuNzc1MjE4MjY4NjM1NywwXV1dXX0sInByb3BlcnRpZXMiOnsiTmFtZSI6ImttbF8xIiwiZGVzY3JpcHRpb24iOm51bGwsInRpbWVzdGFtcCI6bnVsbCwiYmVnaW4iOm51bGwsImVuZCI6bnVsbCwiYWx0aXR1ZGVNb2RlIjpudWxsLCJ0ZXNzZWxsYXRlIjotMSwiZXh0cnVkZSI6MCwidmlzaWJpbGl0eSI6LTEsImRyYXdPcmRlciI6bnVsbCwiaWNvbiI6bnVsbH19XX0=";
//#endregion
//#region src/data/pmd.geojson?url
var pmd_default = "data:application/geo+json;base64,eyJ0eXBlIjoiRmVhdHVyZUNvbGxlY3Rpb24iLCJmZWF0dXJlcyI6W3sidHlwZSI6IkZlYXR1cmUiLCJnZW9tZXRyeSI6eyJ0eXBlIjoiTXVsdGlQb2x5Z29uIiwiY29vcmRpbmF0ZXMiOltbW1stNzUuNDg5OTE3NDUxNTQ5OSwtMTEuNzcyNzUzMzAxNjgwMSwwXSxbLTc1LjQ4OTkxNzQ1MTU0OTgsLTExLjc3Mjc1MzMwMTY3OTksMF0sWy03NS40ODg5MzM5MDYyNDU0LC0xMS43NzM2NzYyNjAyNDIsMF0sWy03NS40ODY4NjY4MTMzMTg5LC0xMS43NzU1NTczNjA0MTkxLDBdLFstNzUuNDg1NzY1OTUwNjE0NywtMTEuNzc2NTM0OTM0NTAwMiwwXSxbLTc1LjQ3ODM2Njg1NTc3MTcsLTExLjc4MjE4OTYwNzAwNjQsMF0sWy03NS40NzkyNzY0OTU2NTExLC0xMS43ODMzNDUwNTM1NzEsMF0sWy03NS40NzkxNTk0MDMyODU5LC0xMS43ODM1OTAzODAxMjM0LDBdLFstNzUuNDc1MzE3NzAzNjE0NiwtMTEuNzg2NTI2MDI3OTcwNSwwXSxbLTc1LjQ3NDE3MjM0ODU4NTksLTExLjc4NTA1MDAwMDYzOTYsMF0sWy03NS40NjYzMzEwNjY4NTYsLTExLjc5MTA0MjkzNTEwNjksMF0sWy03NS40NjA0MzA0NDQwMTUzLC0xMS43OTI5Njg5ODIwNDIzLDBdLFstNzUuNDYxOTQ0NzMwMjYyMSwtMTEuNzkxODExOTM1NDk0MiwwXSxbLTc1LjQ2MTAwOTc4OTU2NTMsLTExLjc5MDYxOTUzMjc5MDgsMF0sWy03NS40NjEwNTM2MTE4MDY2LC0xMS43OTA0OTc2MjE5NDI0LDBdLFstNzUuNDg4MjI2NjA3OTM2MywtMTEuNzY5NzMzNzA3MTMyNCwwXSxbLTc1LjQ4ODgzNjAzNzgwMDEsLTExLjc3MDUwNzgzNjY2OCwwXSxbLTc1LjQ4OTMwMDE1OTIwNzgsLTExLjc3MDE1MzEzNTQxNTIsMF0sWy03NS40OTAzNDI3ODU4NzE5LC0xMS43NzE0Nzc0NjA4NzUxLDBdLFstNzUuNDg5NjU0NzIyMjgxMSwtMTEuNzcyMDAzMzQ5ODgyMiwwXSxbLTc1LjQ5MDAzNDI3MzU5MTIsLTExLjc3MjQ4NTQ0NjI5MDQsMF0sWy03NS40ODk5NDMxNTUwODE4LC0xMS43NzI2NzcxMjI4OTA0LDBdLFstNzUuNDg5OTE3NDUxNTQ5OSwtMTEuNzcyNzUzMzAxNjgwMSwwXV1dXX0sInByb3BlcnRpZXMiOnsiTmFtZSI6ImttbF8yIiwiZGVzY3JpcHRpb24iOm51bGwsInRpbWVzdGFtcCI6bnVsbCwiYmVnaW4iOm51bGwsImVuZCI6bnVsbCwiYWx0aXR1ZGVNb2RlIjpudWxsLCJ0ZXNzZWxsYXRlIjotMSwiZXh0cnVkZSI6MCwidmlzaWJpbGl0eSI6LTEsImRyYXdPcmRlciI6bnVsbCwiaWNvbiI6bnVsbH19XX0=";
//#endregion
//#region src/lib/geo/leer.ts
var TAMANO_MAXIMO = 50 * 1024 * 1024;
/** Sistemas que se reproyectan a WGS 84: los usuales en el Perú. */
var CRS = {
	"EPSG:4326": {
		nombre: "WGS 84 (EPSG:4326)",
		def: "+proj=longlat +datum=WGS84 +no_defs"
	},
	"EPSG:32717": {
		nombre: "UTM 17S WGS 84 (EPSG:32717)",
		def: "+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs"
	},
	"EPSG:32718": {
		nombre: "UTM 18S WGS 84 (EPSG:32718)",
		def: "+proj=utm +zone=18 +south +datum=WGS84 +units=m +no_defs"
	},
	"EPSG:32719": {
		nombre: "UTM 19S WGS 84 (EPSG:32719)",
		def: "+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs"
	},
	"EPSG:24877": {
		nombre: "UTM 17S PSAD 56 (EPSG:24877)",
		def: "+proj=utm +zone=17 +south +ellps=intl +towgs84=-288,175,-376,0,0,0,0 +units=m +no_defs"
	},
	"EPSG:24878": {
		nombre: "UTM 18S PSAD 56 (EPSG:24878)",
		def: "+proj=utm +zone=18 +south +ellps=intl +towgs84=-288,175,-376,0,0,0,0 +units=m +no_defs"
	},
	"EPSG:24879": {
		nombre: "UTM 19S PSAD 56 (EPSG:24879)",
		def: "+proj=utm +zone=19 +south +ellps=intl +towgs84=-288,175,-376,0,0,0,0 +units=m +no_defs"
	}
};
/** Reconoce el CRS por el texto del .prj (WKT) de un shapefile. */
function crsDePrj(wkt) {
	const t = wkt.toUpperCase();
	const zona = t.match(/UTM[_ ]ZONE[_ ](1[789])[_ ]?S/)?.[1];
	const psad = t.includes("PSAD") || t.includes("PROVISIONAL_S_AMERICAN");
	if (zona) return psad ? `EPSG:248${76 + Number(zona) - 16}` : `EPSG:327${zona}`;
	if (t.includes("GCS_WGS_1984") || t.includes("WGS 84") || t.includes("WGS_1984")) return "EPSG:4326";
	return null;
}
function mapearCoordenadas(g, f) {
	switch (g.type) {
		case "Point": return {
			...g,
			coordinates: f(g.coordinates)
		};
		case "MultiPoint":
		case "LineString": return {
			...g,
			coordinates: g.coordinates.map(f)
		};
		case "MultiLineString":
		case "Polygon": return {
			...g,
			coordinates: g.coordinates.map((l) => l.map(f))
		};
		case "MultiPolygon": return {
			...g,
			coordinates: g.coordinates.map((p) => p.map((l) => l.map(f)))
		};
		case "GeometryCollection": return {
			...g,
			geometries: g.geometries.map((x) => mapearCoordenadas(x, f))
		};
	}
}
/** Reproyecta a WGS 84 desde uno de los sistemas de `CRS`. */
function reproyectar(fc, desde) {
	if (desde === "EPSG:4326") return fc;
	const def = CRS[desde]?.def;
	if (!def) throw new Error(`Sistema de coordenadas no soportado: ${desde}`);
	const conv = proj4(def, CRS["EPSG:4326"].def);
	const f = (p) => {
		const [x, y] = conv.forward([p[0], p[1]]);
		return [Math.round(x * 1e7) / 1e7, Math.round(y * 1e7) / 1e7];
	};
	return {
		...fc,
		features: fc.features.map((ft) => ft.geometry ? {
			...ft,
			geometry: mapearCoordenadas(ft.geometry, f)
		} : ft)
	};
}
/** ¿Las coordenadas parecen grados (WGS 84) o metros (proyectadas)? */
function pareceProyectado(fc) {
	const ext = extension(fc);
	return Boolean(ext && (Math.abs(ext[0]) > 180 || Math.abs(ext[1]) > 90 || Math.abs(ext[2]) > 180 || Math.abs(ext[3]) > 90));
}
function recorrerPosiciones(g, f) {
	if (!g) return;
	if (g.type === "GeometryCollection") return g.geometries.forEach((x) => recorrerPosiciones(x, f));
	const visitar = (c) => {
		if (Array.isArray(c) && typeof c[0] === "number") f(c);
		else if (Array.isArray(c)) c.forEach(visitar);
	};
	visitar(g.coordinates);
}
function extension(fc) {
	let e = null;
	for (const ft of fc.features) recorrerPosiciones(ft.geometry, ([x, y]) => {
		if (!e) e = [
			x,
			y,
			x,
			y
		];
		else e = [
			Math.min(e[0], x),
			Math.min(e[1], y),
			Math.max(e[2], x),
			Math.max(e[3], y)
		];
	});
	return e;
}
function geometriaDe(fc) {
	const tipos = new Set(fc.features.map((f) => {
		const t = f.geometry?.type ?? "";
		return t.includes("Point") ? "PUNTO" : t.includes("Line") ? "LINEA" : t.includes("Polygon") ? "POLIGONO" : "MIXTA";
	}));
	return tipos.size === 1 ? [...tipos][0] : "MIXTA";
}
function camposDe(fc) {
	const tipos = /* @__PURE__ */ new Map();
	for (const f of fc.features.slice(0, 500)) for (const [k, v] of Object.entries(f.properties ?? {})) {
		if (v === null || v === void 0 || v === "") continue;
		const t = typeof v === "number" ? "numero" : typeof v === "boolean" ? "booleano" : /^\d{4}-\d{2}-\d{2}/.test(String(v)) ? "fecha" : "texto";
		const previo = tipos.get(k);
		tipos.set(k, previo && previo !== t ? "texto" : t);
	}
	return [...tipos].map(([nombre, tipo]) => ({
		nombre,
		tipo
	}));
}
function formatoDeNombre(nombre) {
	const ext = nombre.toLowerCase().split(/[?#]/)[0].split(".").pop() ?? "";
	if (ext === "geojson" || ext === "json") return "GeoJSON";
	if (ext === "kml") return "KML";
	if (ext === "kmz") return "KMZ";
	if (ext === "gpx") return "GPX";
	if (ext === "csv" || ext === "txt") return "CSV";
	if (ext === "zip") return "Shapefile";
	return null;
}
var xml = (texto) => new DOMParser().parseFromString(texto, "text/xml");
function aColeccion(datos) {
	const d = datos;
	if (d?.type === "FeatureCollection" && Array.isArray(d.features)) return d;
	if (d?.type === "Feature") return {
		type: "FeatureCollection",
		features: [d]
	};
	if (d?.type && "coordinates" in d) return {
		type: "FeatureCollection",
		features: [{
			type: "Feature",
			properties: {},
			geometry: d
		}]
	};
	throw new Error("El archivo no es un GeoJSON válido.");
}
/** Separa una línea CSV respetando comillas. */
function celdas(linea, sep) {
	const salida = [];
	let actual = "";
	let comillas = false;
	for (let i = 0; i < linea.length; i++) {
		const c = linea[i];
		if (c === "\"") if (comillas && linea[i + 1] === "\"") {
			actual += "\"";
			i++;
		} else comillas = !comillas;
		else if (c === sep && !comillas) {
			salida.push(actual);
			actual = "";
		} else actual += c;
	}
	salida.push(actual);
	return salida.map((s) => s.trim());
}
var COLUMNAS_X = [
	"lon",
	"longitud",
	"longitude",
	"lng",
	"x",
	"este",
	"easting",
	"e"
];
var COLUMNAS_Y = [
	"lat",
	"latitud",
	"latitude",
	"y",
	"norte",
	"northing",
	"n"
];
/**
* CSV con una fila de títulos y dos columnas de coordenadas. Grados → WGS 84; metros → UTM de la zona
* indicada (por defecto 18S).
*/
function leerCsv(texto, crsUtm = "EPSG:32718") {
	const lineas = texto.replace(/^\uFEFF/, "").split(/\r?\n/).filter((l) => l.trim());
	if (lineas.length < 2) throw new Error("El CSV no tiene filas de datos.");
	const sep = [
		";",
		",",
		"	"
	].sort((a, b) => lineas[0].split(b).length - lineas[0].split(a).length)[0];
	const titulos = celdas(lineas[0], sep);
	const norm = titulos.map((t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""));
	const ix = norm.findIndex((t) => COLUMNAS_X.includes(t));
	const iy = norm.findIndex((t) => COLUMNAS_Y.includes(t));
	if (ix < 0 || iy < 0) throw new Error("No se encontraron columnas de coordenadas (lon y lat, x e y, o este y norte).");
	const avisos = [];
	const features = [];
	lineas.slice(1).forEach((l, n) => {
		const c = celdas(l, sep);
		const x = Number(c[ix]?.replace(",", "."));
		const y = Number(c[iy]?.replace(",", "."));
		if (!c[ix]?.trim() || !c[iy]?.trim() || !Number.isFinite(x) || !Number.isFinite(y)) {
			if (avisos.length < 5) avisos.push(`Fila ${n + 2}: coordenadas vacías o no numéricas, se omitió.`);
			return;
		}
		const properties = Object.fromEntries(titulos.map((t, i) => [t, c[i] !== void 0 && c[i] !== "" && !Number.isNaN(Number(c[i])) ? Number(c[i]) : c[i] ?? ""]));
		features.push({
			type: "Feature",
			properties,
			geometry: {
				type: "Point",
				coordinates: [x, y]
			}
		});
	});
	let fc = {
		type: "FeatureCollection",
		features
	};
	let crsOriginal = CRS["EPSG:4326"].nombre;
	if (pareceProyectado(fc)) {
		fc = reproyectar(fc, crsUtm);
		crsOriginal = CRS[crsUtm].nombre;
		avisos.unshift(`Coordenadas en metros: se leyeron como ${CRS[crsUtm].nombre} y se pasaron a WGS 84.`);
	}
	return {
		fc,
		formato: "CSV",
		crsOriginal,
		avisos
	};
}
async function leerShapefile(datos) {
	const [{ parseZip }, { default: JSZip }] = await Promise.all([import("shpjs"), import("jszip")]);
	const zip = await JSZip.loadAsync(datos);
	const nombres = Object.keys(zip.files);
	if (!nombres.filter((n) => n.toLowerCase().endsWith(".shp")).length) throw new Error("El .zip no contiene ningún archivo .shp.");
	const prjNombre = nombres.find((n) => n.toLowerCase().endsWith(".prj"));
	const prj = prjNombre ? await zip.files[prjNombre].async("string") : "";
	const avisos = [];
	if (!nombres.some((n) => n.toLowerCase().endsWith(".dbf"))) avisos.push("Falta el .dbf: las entidades no tendrán atributos.");
	if (!prj) avisos.push("Falta el .prj: se asumió WGS 84; si las coordenadas están en metros, elija el sistema.");
	const crs = prj ? crsDePrj(prj) : null;
	if (prj && !crs) avisos.push("No se reconoció el sistema del .prj; revise que la capa caiga en su lugar.");
	const leido = await parseZip(datos);
	const colecciones = Array.isArray(leido) ? leido : [leido];
	if (colecciones.length > 1) avisos.push(`El .zip tiene ${colecciones.length} capas; se unieron en una (campo "capa_origen").`);
	return {
		fc: {
			type: "FeatureCollection",
			features: colecciones.flatMap((c) => colecciones.length > 1 ? c.features.map((f) => ({
				...f,
				properties: {
					...f.properties,
					capa_origen: c.fileName ?? ""
				}
			})) : c.features)
		},
		formato: "Shapefile",
		crsOriginal: crs ? CRS[crs]?.nombre ?? crs : prj ? "Desconocido (ver .prj)" : "Sin .prj",
		avisos
	};
}
/** Lee un archivo (o el contenido descargado de una URL) y lo devuelve en WGS 84. */
async function leerArchivo(archivo, nombre, opciones = {}) {
	if (archivo.size > 52428800) throw new Error("El archivo supera los 50 MB permitidos.");
	const formato = formatoDeNombre(nombre);
	let lectura;
	switch (formato) {
		case "GeoJSON":
			lectura = {
				fc: aColeccion(JSON.parse(await archivo.text())),
				formato,
				crsOriginal: CRS["EPSG:4326"].nombre,
				avisos: []
			};
			break;
		case "KML":
			lectura = {
				fc: kml(xml(await archivo.text())),
				formato,
				crsOriginal: CRS["EPSG:4326"].nombre,
				avisos: []
			};
			break;
		case "KMZ": {
			const { default: JSZip } = await import("jszip");
			const zip = await JSZip.loadAsync(await archivo.arrayBuffer());
			const doc = Object.keys(zip.files).find((n) => n.toLowerCase().endsWith(".kml"));
			if (!doc) throw new Error("El .kmz no contiene ningún .kml.");
			lectura = {
				fc: kml(xml(await zip.files[doc].async("string"))),
				formato,
				crsOriginal: CRS["EPSG:4326"].nombre,
				avisos: []
			};
			break;
		}
		case "GPX":
			lectura = {
				fc: gpx(xml(await archivo.text())),
				formato,
				crsOriginal: CRS["EPSG:4326"].nombre,
				avisos: []
			};
			break;
		case "CSV":
			lectura = leerCsv(await archivo.text(), opciones.crsUtm);
			break;
		case "Shapefile":
			lectura = await leerShapefile(await archivo.arrayBuffer());
			break;
		default: throw new Error("Formato no soportado. Use GeoJSON, KML, KMZ, GPX, CSV o Shapefile comprimido (.zip). GeoTIFF y GeoPackage se agregan como servicio.");
	}
	lectura.fc = {
		type: "FeatureCollection",
		features: lectura.fc.features.filter((f) => f.geometry)
	};
	if (!lectura.fc.features.length) throw new Error("El archivo no tiene entidades con geometría.");
	if (lectura.fc.features.length > 2e4) lectura.avisos.push(`La capa tiene ${lectura.fc.features.length} entidades: el mapa puede ir lento.`);
	return lectura;
}
/** Descarga un archivo por URL y lo lee. El servidor debe permitir CORS. */
async function leerUrl(url, opciones = {}) {
	let r;
	try {
		r = await fetch(url);
	} catch {
		throw new Error("No se pudo descargar: el servidor no responde o no permite pedidos desde páginas web (CORS).");
	}
	if (!r.ok) throw new Error(`El servidor respondió ${r.status} ${r.statusText}.`);
	let nombre = decodeURIComponent(new URL(url).pathname.split("/").pop() || "datos");
	if (!formatoDeNombre(nombre)) {
		const tipo = r.headers.get("content-type") ?? "";
		nombre += tipo.includes("json") ? ".geojson" : tipo.includes("kml") ? ".kml" : tipo.includes("zip") ? ".zip" : tipo.includes("csv") ? ".csv" : "";
	}
	return leerArchivo(await r.blob(), nombre, opciones);
}
//#endregion
export { formatoDeNombre as a, leerUrl as c, pmd_default as d, concesion_default as f, extension as i, pareceProyectado as l, TAMANO_MAXIMO as n, geometriaDe as o, camposDe as r, leerArchivo as s, CRS as t, reproyectar as u };
