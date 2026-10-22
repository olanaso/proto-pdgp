import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as OBC from "@thatopen/components";
import * as FRAGS from "@thatopen/fragments";
import * as THREE from "three";
//#region src/components/BimViewer.tsx
function collectProperties(data) {
	const out = [];
	const psets = data.IsDefinedBy ?? [];
	for (const pset of psets) {
		const props = pset.HasProperties ?? [];
		for (const prop of props) {
			const name = prop.Name?.value;
			const value = prop.NominalValue?.value;
			if (name !== void 0 && value !== void 0) out.push([String(name), String(value)]);
		}
	}
	return out;
}
function BimViewer({ ifcData, modelName, onSelect }) {
	const containerRef = useRef(null);
	const viewerRef = useRef(null);
	const [status, setStatus] = useState("Iniciando visor...");
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		let disposed = false;
		const components = new OBC.Components();
		(async () => {
			const world = components.get(OBC.Worlds).create();
			world.scene = new OBC.SimpleScene(components);
			world.renderer = new OBC.SimpleRenderer(components, container);
			world.camera = new OBC.OrthoPerspectiveCamera(components);
			components.init();
			world.scene.setup();
			world.scene.three.background = new THREE.Color("#eef2f7");
			components.get(OBC.Grids).create(world);
			await world.camera.controls.setLookAt(150, 120, 150, 0, 0, 0);
			const fragments = components.get(OBC.FragmentsManager);
			fragments.init(await OBC.FragmentsManager.getWorker());
			world.camera.controls.addEventListener("rest", () => fragments.core.update(true));
			fragments.list.onItemSet.add(({ value: model }) => {
				model.useCamera(world.camera.three);
				world.scene.three.add(model.object);
				fragments.core.update(true);
			});
			const loader = components.get(OBC.IfcLoader);
			await loader.setup({
				autoSetWasm: false,
				wasm: {
					path: `/web-ifc/`,
					absolute: true
				}
			});
			if (disposed) return;
			viewerRef.current = {
				components,
				world,
				fragments,
				loader
			};
			setStatus("");
		})().catch((error) => {
			setStatus("No se pudo iniciar el visor: " + (error instanceof Error ? error.message : String(error)));
		});
		return () => {
			disposed = true;
			viewerRef.current = null;
			components.dispose();
		};
	}, []);
	useEffect(() => {
		if (!ifcData) return;
		let cancelled = false;
		const run = async () => {
			while (!viewerRef.current && !cancelled) await new Promise((r) => setTimeout(r, 100));
			const viewer = viewerRef.current;
			if (!viewer || cancelled) return;
			const { fragments, loader, world } = viewer;
			setStatus("Procesando IFC...");
			for (const [id] of fragments.list) await fragments.core.disposeModel(id);
			const model = await loader.load(ifcData, false, modelName, { instanceCallback: (importer) => importer.addAllRelations() });
			await fragments.core.update(true);
			const box = new THREE.Box3();
			for (const itemBox of await model.getBoxes()) box.union(itemBox);
			if (!box.isEmpty()) {
				const size = box.getSize(new THREE.Vector3());
				const center = box.getCenter(new THREE.Vector3());
				const camera = world.camera.three;
				camera.far = Math.max(camera.far, size.length() * 10);
				camera.updateProjectionMatrix();
				const fov = camera instanceof THREE.PerspectiveCamera ? camera.fov : 60;
				const distance = Math.max(size.x, size.z) / (2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2)) * .7;
				world.camera.controls.maxDistance = Infinity;
				await world.camera.controls.setLookAt(center.x + distance, center.y + distance, center.z + distance, center.x, center.y, center.z, true);
			}
			if (!cancelled) setStatus("");
		};
		run().catch((error) => {
			if (!cancelled) setStatus("Error al cargar el IFC: " + (error instanceof Error ? error.message : String(error)));
		});
		return () => {
			cancelled = true;
		};
	}, [ifcData, modelName]);
	async function handleClick(event) {
		const viewer = viewerRef.current;
		const container = containerRef.current;
		if (!viewer || !container) return;
		const { fragments, world } = viewer;
		const canvas = container.querySelector("canvas");
		if (!canvas) return;
		const mouse = new THREE.Vector2(event.clientX, event.clientY);
		const hit = await fragments.raycast({
			camera: world.camera.three,
			mouse,
			dom: canvas
		});
		await fragments.resetHighlight();
		if (!hit) {
			onSelect?.(null);
			return;
		}
		const model = hit.fragments;
		await fragments.highlight({
			color: new THREE.Color("#facc15"),
			renderedFaces: FRAGS.RenderedFaces.TWO,
			opacity: 1,
			transparent: false
		}, { [model.modelId]: /* @__PURE__ */ new Set([hit.localId]) });
		const [data] = await model.getItemsData([hit.localId], {
			attributesDefault: true,
			relations: { IsDefinedBy: {
				attributes: true,
				relations: true
			} }
		});
		const name = (data?.Name)?.value;
		onSelect?.({
			name: name ? String(name) : `Elemento ${hit.localId}`,
			properties: data ? collectProperties(data) : []
		});
		await fragments.core.update(true);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "relative h-full w-full",
		children: [/* @__PURE__ */ jsx("div", {
			ref: containerRef,
			className: "h-full w-full",
			onClick: handleClick
		}), status && /* @__PURE__ */ jsx("div", {
			className: "pointer-events-none absolute inset-x-0 top-3 flex justify-center",
			children: /* @__PURE__ */ jsx("p", {
				role: "status",
				className: "rounded-md border border-border bg-card/90 px-3 py-1 text-xs text-foreground",
				children: status
			})
		})]
	});
}
//#endregion
export { BimViewer as default };
