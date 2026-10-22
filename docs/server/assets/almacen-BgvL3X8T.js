import { useEffect, useState } from "react";
//#region src/lib/almacen.ts
/**
* Estado persistido en localStorage por clave. Arranca con `inicial` (también en SSR)
* y carga lo guardado al montar, así no hay desajuste de hidratación.
* ponytail: con backend, esta función se reemplaza por una consulta y una mutación.
*/
function useAlmacen(clave, inicial) {
	const [valor, setValor] = useState(inicial);
	const [cargado, setCargado] = useState(false);
	useEffect(() => {
		try {
			const crudo = localStorage.getItem(clave);
			if (crudo) setValor(JSON.parse(crudo));
		} catch {}
		setCargado(true);
	}, [clave]);
	const guardar = (v) => setValor((anterior) => {
		const nuevo = typeof v === "function" ? v(anterior) : v;
		try {
			localStorage.setItem(clave, JSON.stringify(nuevo));
		} catch {}
		return nuevo;
	});
	return [
		valor,
		guardar,
		cargado
	];
}
var idNuevo = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
//#endregion
export { useAlmacen as n, idNuevo as t };
