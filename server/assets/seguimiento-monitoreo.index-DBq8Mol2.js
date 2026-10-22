import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
//#region src/routes/seguimiento-monitoreo.index.tsx?tsr-split=component
function SeguimientoMonitoreoIndex() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate({
			to: "/seguimiento-monitoreo/general",
			replace: true
		});
	}, [navigate]);
	return null;
}
//#endregion
export { SeguimientoMonitoreoIndex as component };
