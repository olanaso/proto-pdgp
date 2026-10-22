import JSZip from "jszip";
import proj4 from "proj4";
//#region src/lib/gisPaquete.ts
function recorrer(g, f) {
	if (!g) return;
	if (g.type === "GeometryCollection") return g.geometries.forEach((h) => recorrer(h, f));
	const ir = (c) => {
		if (Array.isArray(c) && typeof c[0] === "number") f(c[0], c[1]);
		else if (Array.isArray(c)) c.forEach(ir);
	};
	ir(g.coordinates);
}
function extensionDe(colecciones) {
	let e = null;
	for (const c of colecciones) for (const ft of c.datos.features) recorrer(ft.geometry, (x, y) => {
		e = e ? [
			Math.min(e[0], x),
			Math.min(e[1], y),
			Math.max(e[2], x),
			Math.max(e[3], y)
		] : [
			x,
			y,
			x,
			y
		];
	});
	return e;
}
/** EPSG de la zona UTM WGS 84 del punto (Perú: 17S, 18S o 19S). */
function epsgUtm(lng, lat) {
	const zona = Math.min(60, Math.max(1, Math.floor((lng + 180) / 6) + 1));
	return (lat < 0 ? 32700 : 32600) + zona;
}
function aUtm(epsg, lng, lat) {
	return proj4("EPSG:4326", `+proj=utm +zone=${epsg % 100}${epsg >= 32700 ? " +south" : ""} +datum=WGS84 +units=m +no_defs`, [lng, lat]);
}
var esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** "#2563eb" y opacidad → "37,99,235,255" (formato de color de QGIS). */
function colorQgis(hex, opacidad = 1) {
	const h = hex.replace("#", "");
	const n = parseInt(h.length === 3 ? [...h].map((c) => c + c).join("") : h.slice(0, 6), 16);
	const a = Math.round(Math.max(0, Math.min(1, opacidad)) * 255);
	return `${n >> 16 & 255},${n >> 8 & 255},${n & 255},${Number.isFinite(n) ? a : 255}`;
}
var mm = (px) => (px * .26).toFixed(2);
var LINEA = {
	CONTINUA: "solid",
	DISCONTINUA: "dash",
	PUNTEADA: "dot"
};
function simbolo(nombre, g, e, color = e.relleno) {
	const prop = (k, v) => `<prop k="${k}" v="${esc(v)}"/>`;
	if (g === "PUNTO") return `<symbol type="marker" name="${nombre}" alpha="1" clip_to_extent="1" force_rhr="0"><layer class="SimpleMarker" enabled="1" locked="0" pass="0">${[
		prop("name", e.formaPunto === "CUADRADO" ? "square" : "circle"),
		prop("color", colorQgis(color, e.opacidad)),
		prop("outline_color", colorQgis(e.borde)),
		prop("outline_width", "0.3"),
		prop("size", mm(e.tamanoPunto * 2)),
		prop("size_unit", "MM")
	].join("")}</layer></symbol>`;
	if (g === "LINEA") return `<symbol type="line" name="${nombre}" alpha="1" clip_to_extent="1" force_rhr="0"><layer class="SimpleLine" enabled="1" locked="0" pass="0">${[
		prop("line_color", colorQgis(color)),
		prop("line_width", mm(e.grosor)),
		prop("line_width_unit", "MM"),
		prop("line_style", LINEA[e.tipoLinea])
	].join("")}</layer></symbol>`;
	return `<symbol type="fill" name="${nombre}" alpha="1" clip_to_extent="1" force_rhr="0"><layer class="SimpleFill" enabled="1" locked="0" pass="0">${[
		prop("color", colorQgis(color, e.opacidad)),
		prop("style", e.opacidad > 0 ? "solid" : "no"),
		prop("outline_color", colorQgis(e.borde)),
		prop("outline_width", mm(e.grosor)),
		prop("outline_width_unit", "MM"),
		prop("outline_style", LINEA[e.tipoLinea])
	].join("")}</layer></symbol>`;
}
/** Simbología y etiqueta de la colección, como fragmento XML de capa de QGIS. */
function rendererXml(c) {
	const e = c.estilo;
	const renderer = e.categorias ? `<renderer-v2 type="categorizedSymbol" attr="${esc(e.categorias.campo)}" symbollevels="0" enableorderby="0" forceraster="0"><categories>${e.categorias.valores.map((v, i) => `<category value="${esc(v.valor)}" label="${esc(v.etiqueta)}" symbol="${i}" render="true"/>`).join("")}</categories><symbols>${e.categorias.valores.map((v, i) => simbolo(String(i), c.geometria, e, v.color)).join("")}</symbols></renderer-v2>` : `<renderer-v2 type="singleSymbol" symbollevels="0" enableorderby="0" forceraster="0"><symbols>${simbolo("0", c.geometria, e)}</symbols></renderer-v2>`;
	const etiqueta = e.etiqueta ? `<labeling type="simple"><settings calloutType="simple"><text-style fieldName="${esc(e.etiqueta)}" fontSize="8" fontSizeUnit="Point" textColor="30,41,59,255" isExpression="0"><text-buffer bufferDraw="1" bufferSize="0.8" bufferColor="255,255,255,255"/></text-style><placement placement="${c.geometria === "LINEA" ? 2 : c.geometria === "PUNTO" ? 6 : 1}"/></settings></labeling>` : "";
	return renderer + etiqueta + (etiqueta ? `<customproperties><Option type="Map"><Option name="labeling/enabled" type="bool" value="true"/></Option></customproperties>` : "");
}
function qml(c) {
	return `<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>\n<qgis version="3.22.0" styleCategories="Symbology|Labeling">${rendererXml(c)}</qgis>\n`;
}
var TIPO_QGS = {
	POLIGONO: "Polygon",
	LINEA: "Line",
	PUNTO: "Point"
};
var proj4De = (epsg) => epsg === 4326 ? "+proj=longlat +datum=WGS84 +no_defs" : `+proj=utm +zone=${epsg % 100}${epsg >= 32700 ? " +south" : ""} +datum=WGS84 +units=m +no_defs`;
/** QGIS no reconoce el CRS solo por el código: necesita la definición proj4. */
var srs = (epsg) => `<spatialrefsys nativeFormat="Proj"><proj4>${proj4De(epsg)}</proj4><srid>${epsg}</srid><authid>EPSG:${epsg}</authid><description>${epsg === 4326 ? "WGS 84" : `WGS 84 / UTM zone ${epsg % 100}${epsg >= 32700 ? "S" : "N"}`}</description><projectionacronym>${epsg === 4326 ? "longlat" : "utm"}</projectionacronym><ellipsoidacronym>EPSG:7030</ellipsoidacronym><geographicflag>${epsg === 4326}</geographicflag></spatialrefsys>`;
/** Orden de dibujo: puntos arriba, polígonos de fondo. */
var PESO = {
	PUNTO: 0,
	LINEA: 1,
	POLIGONO: 2
};
var enOrdenDeDibujo = (cs) => [...cs].sort((a, b) => PESO[a.geometria] - PESO[b.geometria]);
function qgs(p) {
	const ext = extensionDe(p.colecciones);
	const epsg = ext ? epsgUtm((ext[0] + ext[2]) / 2, (ext[1] + ext[3]) / 2) : 32718;
	const [x0, y0] = ext ? aUtm(epsg, ext[0], ext[1]) : [0, 0];
	const [x1, y1] = ext ? aUtm(epsg, ext[2], ext[3]) : [0, 0];
	const margen = Math.max(x1 - x0, y1 - y0) * .05;
	const capas = enOrdenDeDibujo(p.colecciones.filter((c) => c.datos.features.length));
	const lid = (c) => `pdgp_${c.id.replace(/[^a-z0-9]/gi, "_")}`;
	return `<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis projectname="${esc(p.nombre)}" version="3.22.0">
  <title>${esc(`PDGP · ${p.nombre}`)}</title>
  <projectCrs>${srs(epsg)}</projectCrs>
  <layer-tree-group>
    <layer-tree-group name="${esc(`PDGP · ${p.nombre}`)}" checked="Qt::Checked" expanded="1">
${capas.map((c) => `      <layer-tree-layer id="${lid(c)}" name="${esc(c.titulo)}" source="./${c.id}.geojson" providerKey="ogr" checked="Qt::Checked" expanded="0"/>`).join("\n")}
    </layer-tree-group>
  </layer-tree-group>
  <mapcanvas name="theMapCanvas">
    <units>meters</units>
    <extent><xmin>${x0 - margen}</xmin><ymin>${y0 - margen}</ymin><xmax>${x1 + margen}</xmax><ymax>${y1 + margen}</ymax></extent>
    <destinationsrs>${srs(epsg)}</destinationsrs>
  </mapcanvas>
  <projectlayers>
${capas.map((c) => `    <maplayer type="vector" geometry="${TIPO_QGS[c.geometria]}">
      <id>${lid(c)}</id>
      <datasource>./${c.id}.geojson</datasource>
      <layername>${esc(c.titulo)}</layername>
      <abstract>${esc(c.descripcion)}</abstract>
      <srs>${srs(4326)}</srs>
      <provider encoding="UTF-8">ogr</provider>
      ${rendererXml(c)}
    </maplayer>`).join("\n")}
  </projectlayers>
  <properties><Paths><Absolute type="bool">false</Absolute></Paths><SpatialRefSys><ProjectionsEnabled type="int">1</ProjectionsEnabled></SpatialRefSys></properties>
</qgis>
`;
}
/** Zip con un GeoJSON y un .qml por colección, el proyecto .qgs, el manifiesto y el LEEME. */
async function armarPaquete(p, opciones) {
	const fecha = opciones.fecha ?? /* @__PURE__ */ new Date();
	const zip = new JSZip();
	const ext = extensionDe(p.colecciones);
	const manifiesto = {
		proyecto: {
			id: p.id,
			codigo: p.codigo,
			nombre: p.nombre
		},
		publicadoEl: p.publicadoEl,
		publicadoPor: p.publicadoPor,
		descargadoEl: fecha.toISOString(),
		descargadoPor: opciones.usuario,
		servicio: opciones.servicio,
		epsgUtm: ext ? epsgUtm((ext[0] + ext[2]) / 2, (ext[1] + ext[3]) / 2) : 32718,
		demostracion: p.demostracion,
		colecciones: p.colecciones.map((c) => ({
			id: c.id,
			titulo: c.titulo,
			geometria: c.geometria,
			editable: c.editable,
			entidades: c.datos.features.length
		}))
	};
	for (const c of p.colecciones) {
		if (!c.datos.features.length) continue;
		zip.file(`${c.id}.geojson`, JSON.stringify(c.datos));
		zip.file(`${c.id}.qml`, qml(c));
	}
	zip.file(`${p.id}.qgs`, qgs(p));
	const extras = Object.entries(opciones.extras ?? {});
	for (const [nombre, datos] of extras) zip.file(nombre, datos);
	zip.file("manifiesto.json", JSON.stringify(manifiesto, null, 2));
	zip.file("LEEME.txt", [
		`PDGP · Plataforma Digital de Gestión de Predios (MTC, DDP)`,
		``,
		`Proyecto: ${p.nombre} (${p.codigo})`,
		`Publicado: ${p.publicadoEl} por ${p.publicadoPor}`,
		`Descargado: ${fecha.toLocaleString("es-PE")} por ${opciones.usuario}`,
		`Servicio OGC API Features: ${opciones.servicio}`,
		``,
		`Contenido`,
		...p.colecciones.map((c) => `  ${c.id}.geojson  ${c.titulo} (${c.datos.features.length} entidades)`),
		`  ${p.id}.qgs  proyecto de QGIS con los estilos del sistema (UTM WGS 84, EPSG:${manifiesto.epsgUtm})`,
		...extras.map(([nombre]) => nombre.endsWith(".dxf") ? `  ${nombre}  plano clave en DXF (UTM, una capa por colección; AutoCAD lo guarda como DWG)` : `  ${nombre}  plano clave`),
		``,
		`Los GeoJSON están en WGS 84 (EPSG:4326). ArcGIS Pro los abre con la herramienta`,
		`"JSON To Features" o arrastrándolos al mapa; el .qgs es solo para QGIS.`,
		p.demostracion ? `\nAVISO: el proyecto aún no tiene polígonos propios; los datos son de demostración (Jauja).` : ``,
		`Los cambios hechos aquí no vuelven solos al sistema: envíelos con el plugin PDGP;`,
		`entran en revisión y el Coordinador los aprueba en la base gráfica.`
	].join("\r\n"));
	return zip.generateAsync({
		type: "uint8array",
		compression: "DEFLATE"
	});
}
/** Área en m² (UTM de la zona del polígono). Puntos y líneas: null. */
function areaM2(g) {
	if (!g || g.type !== "Polygon" && g.type !== "MultiPolygon") return null;
	const poligonos = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
	const p0 = poligonos[0]?.[0]?.[0];
	if (!p0) return null;
	const epsg = epsgUtm(p0[0], p0[1]);
	const anillo = (r) => {
		const u = r.map(([x, y]) => aUtm(epsg, x, y));
		let s = 0;
		for (let i = 0; i < u.length; i++) {
			const [x1, y1] = u[i];
			const [x2, y2] = u[(i + 1) % u.length];
			s += x1 * y2 - x2 * y1;
		}
		return Math.abs(s) / 2;
	};
	let total = 0;
	for (const p of poligonos) p.forEach((r, i) => total += i === 0 ? anillo(r) : -anillo(r));
	return Math.round(total * 100) / 100;
}
/** Asegura `properties.fid` en cada entidad (índice si no hay otro). */
function conFid(fc, fid) {
	return {
		type: "FeatureCollection",
		features: fc.features.map((f, i) => ({
			...f,
			properties: {
				...f.properties ?? {},
				fid: String(f.properties?.fid ?? fid(f, i))
			}
		}))
	};
}
//#endregion
export { extensionDe as a, epsgUtm as i, armarPaquete as n, conFid as r, areaM2 as t };
