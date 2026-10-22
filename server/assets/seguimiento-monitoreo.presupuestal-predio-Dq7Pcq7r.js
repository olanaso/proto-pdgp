import { a as controlClase } from "./Form-DtuiyqJ8.js";
import { t as Button } from "./button-DH6ZQkjT.js";
import { n as StatusBadge } from "./Badges-LrNPShrl.js";
import { w as registrarExportacion } from "./PredioEncabezado-FhqZ2Jv6.js";
import { t as AppShell } from "./AppShell-C-aaMtOy.js";
import { t as Section } from "./Section-2P4M-r-S.js";
import { t as PageHeader } from "./PageHeader-BAdNVO4Y.js";
import { i as SituacionSiafPredio } from "./ConciliacionSiaf-DB3SkFdm.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Building2, ChevronDown, ChevronUp, Clock3, FileSpreadsheet, Landmark, MapPin, Search, UserRound, WalletCards } from "lucide-react";
import writeXlsxFile from "write-excel-file/browser";
//#region src/routes/seguimiento-monitoreo.presupuestal-predio.tsx?tsr-split=component
var projects = [{
	id: "iquitos",
	name: "Mejoramiento y ampliación del Aeropuerto de Iquitos",
	cui: "2457896",
	executingUnit: "001 · Administración General MTC",
	fiscalYear: "2026",
	meta: "0045",
	functionalSequence: "0123",
	fundingSource: "1 · Recursos Ordinarios",
	item: "00 · Recursos Ordinarios",
	pia: 1e7,
	pim: 125e5
}, {
	id: "jauja",
	name: "Mejoramiento y ampliación del Aeropuerto de Jauja",
	cui: "2233850",
	executingUnit: "020 · Provías Nacional",
	fiscalYear: "2026",
	meta: "0061",
	functionalSequence: "0187",
	fundingSource: "1 · Recursos Ordinarios",
	item: "00 · Recursos Ordinarios",
	pia: 84e5,
	pim: 98e5
}];
var predios = [
	{
		projectId: "iquitos",
		code: "AERO-IQT-PR-000125",
		file: "EXP-IQT-0125-2026",
		owner: "Juan Pérez Quispe",
		identity: "DNI 40851247",
		location: "Loreto / Maynas / San Juan Bautista",
		sector: "Sector Este",
		section: "Tramo 1",
		affectedArea: 1250.45,
		propertyState: "En proceso",
		currentStage: "Pago",
		updatedAt: "05/04/2026 16:40",
		appraisal: 15e4,
		compensation: 2e4,
		improvements: 5e3,
		otherConcepts: 2e3,
		certification: 177e3,
		annualCommitment: 177e3,
		monthlyCommitment: 177e3,
		accrued: 177e3,
		drawn: 17e4,
		paid: 15e4,
		lastMovement: "Pago 425 · 05/04/2026",
		movements: [
			{
				date: "05/03/2026",
				siafFile: "3256",
				classifier: "2.6.8.1.4.2",
				document: "Cert. 125",
				certification: 177e3,
				commitment: 0,
				accrued: 0,
				drawn: 0,
				paid: 0,
				state: "Certificado"
			},
			{
				date: "15/03/2026",
				siafFile: "3587",
				classifier: "2.6.8.1.4.2",
				document: "Comp. 208",
				certification: 0,
				commitment: 177e3,
				accrued: 0,
				drawn: 0,
				paid: 0,
				state: "Comprometido"
			},
			{
				date: "25/03/2026",
				siafFile: "4125",
				classifier: "2.6.8.1.4.2",
				document: "Dev. 350",
				certification: 0,
				commitment: 0,
				accrued: 177e3,
				drawn: 0,
				paid: 0,
				state: "Devengado"
			},
			{
				date: "02/04/2026",
				siafFile: "4350",
				classifier: "2.6.8.1.4.2",
				document: "Girado 401",
				certification: 0,
				commitment: 0,
				accrued: 0,
				drawn: 17e4,
				paid: 0,
				state: "Girado"
			},
			{
				date: "05/04/2026",
				siafFile: "4401",
				classifier: "2.6.8.1.4.2",
				document: "Pago 425",
				certification: 0,
				commitment: 0,
				accrued: 0,
				drawn: 0,
				paid: 15e4,
				state: "Pagado parcial"
			}
		]
	},
	{
		projectId: "iquitos",
		code: "AERO-IQT-PR-000126",
		file: "EXP-IQT-0126-2026",
		owner: "Rosa Elena Salazar Vela",
		identity: "DNI 05281469",
		location: "Loreto / Maynas / San Juan Bautista",
		sector: "Sector Este",
		section: "Tramo 1",
		affectedArea: 840.2,
		propertyState: "Pagado",
		currentStage: "Entrega de posesión",
		updatedAt: "18/05/2026 11:12",
		appraisal: 116e3,
		compensation: 14500,
		improvements: 7500,
		otherConcepts: 0,
		certification: 138e3,
		annualCommitment: 138e3,
		monthlyCommitment: 138e3,
		accrued: 138e3,
		drawn: 138e3,
		paid: 138e3,
		lastMovement: "Pago 771 · 18/05/2026",
		movements: makeMovements("0045", 138e3, "5260")
	},
	{
		projectId: "iquitos",
		code: "AERO-IQT-PR-000127",
		file: "EXP-IQT-0127-2026",
		owner: "Inversiones Amazónicas S.A.C.",
		identity: "RUC 20541278963",
		location: "Loreto / Maynas / Iquitos",
		sector: "Sector Norte",
		section: "Tramo 2",
		affectedArea: 2185.7,
		propertyState: "Observado",
		currentStage: "Certificación",
		updatedAt: "21/05/2026 09:08",
		appraisal: 245e3,
		compensation: 32e3,
		improvements: 18e3,
		otherConcepts: 5e3,
		certification: 24e4,
		annualCommitment: 0,
		monthlyCommitment: 0,
		accrued: 0,
		drawn: 0,
		paid: 0,
		lastMovement: "Cert. 388 · 20/05/2026",
		movements: [{
			date: "20/05/2026",
			siafFile: "5874",
			classifier: "2.6.8.1.4.2",
			document: "Cert. 388",
			certification: 24e4,
			commitment: 0,
			accrued: 0,
			drawn: 0,
			paid: 0,
			state: "Observado"
		}]
	},
	{
		projectId: "iquitos",
		code: "AERO-IQT-PR-000128",
		file: "EXP-IQT-0128-2026",
		owner: "Comunidad Campesina San Juan",
		identity: "RUC 20178645219",
		location: "Loreto / Maynas / San Juan Bautista",
		sector: "Sector Sur",
		section: "Tramo 2",
		affectedArea: 3240,
		propertyState: "Pendiente",
		currentStage: "Tasación",
		updatedAt: "25/05/2026 15:30",
		appraisal: 32e4,
		compensation: 4e4,
		improvements: 15e3,
		otherConcepts: 4500,
		certification: 0,
		annualCommitment: 0,
		monthlyCommitment: 0,
		accrued: 0,
		drawn: 0,
		paid: 0,
		lastMovement: "Sin movimiento SIAF",
		movements: []
	},
	{
		projectId: "jauja",
		code: "AERO-JAUJA-PR-00245-A",
		file: "EXP-JAUJA-0245A",
		owner: "María Elena Rojas Huamán",
		identity: "DNI 42581736",
		location: "Junín / Jauja / Sausa",
		sector: "Sector Oeste",
		section: "Tramo 1",
		affectedArea: 978.55,
		propertyState: "En proceso",
		currentStage: "Devengado",
		updatedAt: "12/06/2026 10:20",
		appraisal: 185e3,
		compensation: 25e3,
		improvements: 12e3,
		otherConcepts: 3e3,
		certification: 225e3,
		annualCommitment: 225e3,
		monthlyCommitment: 225e3,
		accrued: 225e3,
		drawn: 0,
		paid: 0,
		lastMovement: "Dev. 612 · 12/06/2026",
		movements: makeMovements("0061", 225e3, "6402", false)
	},
	{
		projectId: "jauja",
		code: "AERO-JAUJA-PR-0056",
		file: "EXP-JAUJA-0056",
		owner: "Dirección Regional Agraria Junín",
		identity: "RUC 20145541253",
		location: "Junín / Jauja / Yauyos",
		sector: "Sector Norte",
		section: "Tramo 2",
		affectedArea: 4150.3,
		propertyState: "En proceso",
		currentStage: "Transferencia interestatal",
		updatedAt: "03/07/2026 08:55",
		appraisal: 0,
		compensation: 0,
		improvements: 42e3,
		otherConcepts: 8e3,
		certification: 5e4,
		annualCommitment: 5e4,
		monthlyCommitment: 5e4,
		accrued: 25e3,
		drawn: 25e3,
		paid: 25e3,
		lastMovement: "Pago 806 · 03/07/2026",
		movements: makeMovements("0061", 5e4, "7021")
	}
];
function makeMovements(meta, amount, start, complete = true) {
	const base = Number(start);
	const rows = [
		{
			date: "06/05/2026",
			siafFile: String(base),
			classifier: "2.6.8.1.4.2",
			document: `Cert. ${meta}-01`,
			certification: amount,
			commitment: 0,
			accrued: 0,
			drawn: 0,
			paid: 0,
			state: "Certificado"
		},
		{
			date: "13/05/2026",
			siafFile: String(base + 21),
			classifier: "2.6.8.1.4.2",
			document: `Comp. ${meta}-02`,
			certification: 0,
			commitment: amount,
			accrued: 0,
			drawn: 0,
			paid: 0,
			state: "Comprometido"
		},
		{
			date: "20/05/2026",
			siafFile: String(base + 37),
			classifier: "2.6.8.1.4.2",
			document: `Dev. ${meta}-03`,
			certification: 0,
			commitment: 0,
			accrued: amount,
			drawn: 0,
			paid: 0,
			state: "Devengado"
		}
	];
	if (complete) rows.push({
		date: "27/05/2026",
		siafFile: String(base + 52),
		classifier: "2.6.8.1.4.2",
		document: `Girado ${meta}-04`,
		certification: 0,
		commitment: 0,
		accrued: 0,
		drawn: amount,
		paid: 0,
		state: "Girado"
	}, {
		date: "31/05/2026",
		siafFile: String(base + 64),
		classifier: "2.6.8.1.4.2",
		document: `Pago ${meta}-05`,
		certification: 0,
		commitment: 0,
		accrued: 0,
		drawn: 0,
		paid: amount,
		state: "Pagado"
	});
	return rows;
}
var moneyFormatter = new Intl.NumberFormat("es-PE", {
	style: "currency",
	currency: "PEN",
	minimumFractionDigits: 2
});
function money(value) {
	return moneyFormatter.format(value);
}
function compactMoney(value) {
	if (value >= 1e6) return `S/ ${(value / 1e6).toFixed(1)} M`;
	return `S/ ${value.toLocaleString("es-PE", { maximumFractionDigits: 0 })}`;
}
function totalCost(predio) {
	return predio.appraisal + predio.compensation + predio.improvements + predio.otherConcepts;
}
function budgetState(predio) {
	const cost = totalCost(predio);
	if (predio.certification <= 0) return "Sin presupuesto";
	if (predio.certification < cost) return "Presupuesto insuficiente";
	if (predio.paid >= cost && cost > 0) return "Pagado";
	if (predio.annualCommitment > 0 || predio.accrued > 0 || predio.drawn > 0) return "En ejecución";
	return "Certificado";
}
var stateTone = {
	"Sin presupuesto": "destructive",
	"Presupuesto insuficiente": "warning",
	Certificado: "neutral",
	"En ejecución": "primary",
	Pagado: "success"
};
var matrixHeaders = [
	"Proyecto",
	"CUI",
	"Meta",
	"Código predial",
	"PIA",
	"PIM",
	"Certificación",
	"Compromiso anual",
	"Compromiso mensual",
	"Devengado",
	"Girado",
	"Pagado",
	"Costo total predio",
	"Pendiente",
	"Avance",
	"Estado",
	"Último movimiento"
];
var movementHeaders = [
	"Fecha",
	"Expediente SIAF",
	"Meta",
	"Clasificador",
	"Documento",
	"Certificación",
	"Compromiso",
	"Devengado",
	"Girado",
	"Pagado",
	"Estado"
];
function SeguimientoPresupuestalPredioPage() {
	const [projectId, setProjectId] = useState(projects[0].id);
	const [selectedCode, setSelectedCode] = useState(predios[0].code);
	const [search, setSearch] = useState("");
	const [searchOpen, setSearchOpen] = useState(false);
	const [movementsOpen, setMovementsOpen] = useState(true);
	const project = projects.find((item) => item.id === projectId) ?? projects[0];
	const projectPredios = useMemo(() => predios.filter((item) => item.projectId === projectId), [projectId]);
	const selectedPredio = projectPredios.find((item) => item.code === selectedCode) ?? projectPredios[0];
	const filteredPredios = useMemo(() => {
		const query = search.trim().toLocaleLowerCase("es-PE");
		if (!query) return projectPredios;
		return projectPredios.filter((item) => [
			item.code,
			item.file,
			item.identity,
			item.owner,
			item.sector,
			item.section
		].some((value) => value.toLocaleLowerCase("es-PE").includes(query)));
	}, [projectPredios, search]);
	const cost = totalCost(selectedPredio);
	const pending = Math.max(cost - selectedPredio.paid, 0);
	const paidAdvance = cost ? selectedPredio.paid / cost * 100 : 0;
	const accruedAdvance = cost ? selectedPredio.accrued / cost * 100 : 0;
	const state = budgetState(selectedPredio);
	const handleProjectChange = (nextProjectId) => {
		const firstPredio = predios.find((item) => item.projectId === nextProjectId);
		setProjectId(nextProjectId);
		if (firstPredio) setSelectedCode(firstPredio.code);
		setSearch("");
	};
	const selectPredio = (code) => {
		setSelectedCode(code);
		setSearch("");
		setSearchOpen(false);
		setMovementsOpen(true);
	};
	const exportMatrix = async () => {
		const rows = [[
			"Proyecto",
			"CUI",
			"Meta",
			"Secuencia funcional",
			"Código predial",
			"Expediente predial",
			"PIA Meta",
			"PIM Meta",
			"Certificación predio",
			"Compromiso anual predio",
			"Compromiso mensual predio",
			"Devengado predio",
			"Girado predio",
			"Pagado predio",
			"Costo total predio",
			"Pendiente",
			"Avance financiero",
			"Estado",
			"Último movimiento"
		].map((value) => ({
			value,
			fontWeight: "bold",
			wrap: true
		})), [
			project.name,
			project.cui,
			project.meta,
			project.functionalSequence,
			selectedPredio.code,
			selectedPredio.file,
			project.pia,
			project.pim,
			selectedPredio.certification,
			selectedPredio.annualCommitment,
			selectedPredio.monthlyCommitment,
			selectedPredio.accrued,
			selectedPredio.drawn,
			selectedPredio.paid,
			cost,
			pending,
			paidAdvance / 100,
			state,
			selectedPredio.lastMovement
		].map((value, index) => ({
			value,
			type: typeof value === "number" ? Number : String,
			format: index === 16 ? "0.00%" : index >= 6 && index <= 15 ? "S/ #,##0.00" : void 0,
			wrap: true
		}))];
		const movementRows = [movementHeaders.map((value) => ({
			value,
			fontWeight: "bold"
		})), ...selectedPredio.movements.map((item) => [
			item.date,
			item.siafFile,
			project.meta,
			item.classifier,
			item.document,
			item.certification,
			item.commitment,
			item.accrued,
			item.drawn,
			item.paid,
			item.state
		].map((value, index) => ({
			value,
			type: typeof value === "number" ? Number : String,
			format: index >= 5 && index <= 9 ? "S/ #,##0.00" : void 0
		})))];
		await writeXlsxFile([{
			sheet: "Resumen predio",
			data: rows,
			stickyRowsCount: 1,
			orientation: "landscape",
			columns: Array.from({ length: 19 }, () => ({ width: 20 }))
		}, {
			sheet: "Movimientos SIAF",
			data: movementRows,
			stickyRowsCount: 1,
			orientation: "landscape",
			columns: Array.from({ length: 11 }, () => ({ width: 18 }))
		}]).toFile(`seguimiento_presupuestal_${selectedPredio.code}.xlsx`);
		registrarExportacion(`seguimiento_presupuestal_${selectedPredio.code}`, "Excel");
	};
	const economicRows = [
		["Valor de tasación", selectedPredio.appraisal],
		["Indemnización", selectedPredio.compensation],
		["Mejoras", selectedPredio.improvements],
		["Otros conceptos", selectedPredio.otherConcepts]
	];
	const kpis = [
		{
			label: "Costo predio",
			value: cost
		},
		{
			label: "Certificado",
			value: selectedPredio.certification
		},
		{
			label: "Devengado",
			value: selectedPredio.accrued
		},
		{
			label: "Girado",
			value: selectedPredio.drawn
		},
		{
			label: "Pagado",
			value: selectedPredio.paid
		},
		{
			label: "Pendiente",
			value: pending
		}
	];
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			icono: WalletCards,
			titulo: "Seguimiento presupuestal por predio",
			descripcion: "Coordinadores · Seguimiento financiero. Proyecto, meta SIAF, predio, certificación, devengado y pagado.",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				onClick: exportMatrix,
				children: [/* @__PURE__ */ jsx(FileSpreadsheet, {}), " Exportar matriz"]
			})
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-4 rounded-md border border-warning bg-warning-soft px-3 py-2 text-xs text-warning",
			children: "Datos de demostración. Las cifras de este tablero son de muestra y no provienen de un sistema real."
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Selección y contexto presupuestal",
			className: "mb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 xl:grid-cols-[minmax(300px,0.8fr)_minmax(420px,1.2fr)]",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block text-xs font-medium text-foreground",
						children: "Proyecto de inversión"
					}), /* @__PURE__ */ jsx("select", {
						value: projectId,
						onChange: (event) => handleProjectChange(event.target.value),
						className: controlClase,
						children: projects.map((item) => /* @__PURE__ */ jsx("option", {
							value: item.id,
							children: item.name
						}, item.id))
					})]
				}), /* @__PURE__ */ jsxs("dl", {
					className: "mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border",
					children: [
						/* @__PURE__ */ jsx(ContextItem, {
							label: "CUI",
							value: project.cui
						}),
						/* @__PURE__ */ jsx(ContextItem, {
							label: "Año fiscal",
							value: project.fiscalYear
						}),
						/* @__PURE__ */ jsx(ContextItem, {
							label: "Unidad ejecutora",
							value: project.executingUnit,
							wide: true
						}),
						/* @__PURE__ */ jsx(ContextItem, {
							label: "Meta SIAF",
							value: project.meta
						}),
						/* @__PURE__ */ jsx(ContextItem, {
							label: "Secuencia funcional",
							value: project.functionalSequence
						}),
						/* @__PURE__ */ jsx(ContextItem, {
							label: "Fuente",
							value: project.fundingSource
						}),
						/* @__PURE__ */ jsx(ContextItem, {
							label: "Rubro",
							value: project.item
						}),
						/* @__PURE__ */ jsx(ContextItem, {
							label: "Presupuesto vigente (PIM)",
							value: money(project.pim),
							wide: true
						})
					]
				})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
					className: "block",
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 block text-xs font-medium text-foreground",
						children: "Buscar y seleccionar predio"
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ jsx(Search, {
								size: 16,
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": true
							}),
							/* @__PURE__ */ jsx("input", {
								value: search,
								onFocus: () => setSearchOpen(true),
								onBlur: () => window.setTimeout(() => setSearchOpen(false), 150),
								onChange: (event) => {
									setSearch(event.target.value);
									setSearchOpen(true);
								},
								placeholder: "Código predial, expediente, DNI/RUC, propietario, sector o tramo",
								className: `${controlClase} pl-9`
							}),
							searchOpen && /* @__PURE__ */ jsx("div", {
								className: "absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-card p-1.5 shadow-md",
								children: filteredPredios.length ? filteredPredios.map((item) => /* @__PURE__ */ jsxs("button", {
									type: "button",
									onMouseDown: (event) => event.preventDefault(),
									onClick: () => selectPredio(item.code),
									className: `grid w-full grid-cols-[minmax(150px,0.7fr)_minmax(180px,1fr)_100px] gap-2 rounded-md px-2.5 py-2 text-left text-sm hover:bg-muted ${item.code === selectedPredio.code ? "bg-primary-soft text-primary-dark" : ""}`,
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold",
											children: item.code
										}),
										/* @__PURE__ */ jsx("span", {
											className: "truncate",
											children: item.owner
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-right text-muted-foreground",
											children: item.sector
										})
									]
								}, item.code)) : /* @__PURE__ */ jsx("p", {
									className: "px-3 py-5 text-center text-sm text-muted-foreground",
									children: "No se encontraron predios con ese criterio."
								})
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-3 rounded-md border border-border bg-background p-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-sm font-semibold text-foreground",
							children: selectedPredio.code
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground",
							children: selectedPredio.file
						})] }), /* @__PURE__ */ jsx(StatusBadge, {
							tono: stateTone[state],
							children: state
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-3 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(InfoLine, {
								icon: UserRound,
								label: "Sujeto pasivo",
								value: selectedPredio.owner
							}),
							/* @__PURE__ */ jsx(InfoLine, {
								icon: Building2,
								label: "Documento",
								value: selectedPredio.identity
							}),
							/* @__PURE__ */ jsx(InfoLine, {
								icon: MapPin,
								label: "Ubicación",
								value: selectedPredio.location
							}),
							/* @__PURE__ */ jsx(InfoLine, {
								icon: Landmark,
								label: "Área afectada",
								value: `${selectedPredio.affectedArea.toLocaleString("es-PE")} m²`
							}),
							/* @__PURE__ */ jsx(InfoLine, {
								icon: WalletCards,
								label: "Etapa actual",
								value: selectedPredio.currentStage
							}),
							/* @__PURE__ */ jsx(InfoLine, {
								icon: Clock3,
								label: "Última actualización",
								value: selectedPredio.updatedAt
							})
						]
					})]
				})] })]
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Resumen económico del predio",
			className: "mb-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 xl:grid-cols-[330px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "space-y-1.5 text-sm",
						children: economicRows.map(([label, value]) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: label
							}), /* @__PURE__ */ jsx("strong", {
								className: "tabular-nums text-foreground",
								children: money(value)
							})]
						}, label))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-2 space-y-1.5 border-t border-border pt-2 text-sm",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between font-semibold",
								children: [/* @__PURE__ */ jsx("span", { children: "Costo total predial" }), /* @__PURE__ */ jsx("span", {
									className: "tabular-nums",
									children: money(cost)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between text-success",
								children: [/* @__PURE__ */ jsx("span", { children: "Pagado" }), /* @__PURE__ */ jsx("strong", {
									className: "tabular-nums",
									children: money(selectedPredio.paid)
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between rounded-md bg-destructive-soft px-2 py-1.5 font-semibold text-destructive",
								children: [/* @__PURE__ */ jsx("span", { children: "Pendiente por pagar" }), /* @__PURE__ */ jsx("span", {
									className: "tabular-nums",
									children: money(pending)
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ jsx(ProgressLine, {
							label: "Avance financiero pagado",
							value: paidAdvance,
							color: "bg-primary"
						}), /* @__PURE__ */ jsx(ProgressLine, {
							label: "Avance devengado",
							value: accruedAdvance,
							color: "bg-primary-dark"
						})]
					})
				] }), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-3",
					children: kpis.map((item) => /* @__PURE__ */ jsx(KpiCard, { ...item }, item.label))
				})]
			})
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Matriz presupuestal principal",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ jsx(StatusBadge, {
					tono: "neutral",
					children: "PIA / PIM = contexto Proyecto · Meta"
				}), /* @__PURE__ */ jsx(StatusBadge, {
					tono: "primary",
					children: "Ejecución = vinculada al predio"
				})]
			}),
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "La meta puede financiar varios predios; los montos de ejecución corresponden solo al predio seleccionado."
			}), /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[1900px] text-sm",
					children: [/* @__PURE__ */ jsxs("thead", { children: [/* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							scope: "colgroup",
							colSpan: 4,
							className: "h-9 px-3 text-center text-xs font-semibold uppercase",
							children: "Identificación"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "colgroup",
							colSpan: 2,
							className: "h-9 border-l border-border px-3 text-center text-xs font-semibold uppercase",
							children: "Presupuesto del proyecto / meta SIAF"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "colgroup",
							colSpan: 6,
							className: "h-9 border-l border-border px-3 text-center text-xs font-semibold uppercase",
							children: "Ejecución asociada al predio"
						}),
						/* @__PURE__ */ jsx("th", {
							scope: "colgroup",
							colSpan: 5,
							className: "h-9 border-l border-border px-3 text-center text-xs font-semibold uppercase",
							children: "Control"
						})
					] }), /* @__PURE__ */ jsx("tr", { children: matrixHeaders.map((header, index) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: `h-9 whitespace-nowrap border-t border-border px-3 text-xs font-semibold uppercase ${index >= 4 && index <= 13 ? "text-right" : "text-left"} ${index === 4 || index === 6 || index === 12 ? "border-l border-border" : ""}`,
						children: header
					}, header)) })] }), /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", {
						className: "h-10 border-t border-border",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "max-w-64 px-3 py-2 font-semibold",
								children: project.name
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2",
								children: project.cui
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-semibold",
								children: project.meta
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 font-semibold text-primary-dark",
								children: selectedPredio.code
							}),
							/* @__PURE__ */ jsx(AmountCell, {
								value: project.pia,
								divisor: true
							}),
							/* @__PURE__ */ jsx(AmountCell, { value: project.pim }),
							/* @__PURE__ */ jsx(AmountCell, {
								value: selectedPredio.certification,
								divisor: true
							}),
							/* @__PURE__ */ jsx(AmountCell, { value: selectedPredio.annualCommitment }),
							/* @__PURE__ */ jsx(AmountCell, { value: selectedPredio.monthlyCommitment }),
							/* @__PURE__ */ jsx(AmountCell, { value: selectedPredio.accrued }),
							/* @__PURE__ */ jsx(AmountCell, { value: selectedPredio.drawn }),
							/* @__PURE__ */ jsx(AmountCell, {
								value: selectedPredio.paid,
								strong: true
							}),
							/* @__PURE__ */ jsx(AmountCell, {
								value: cost,
								divisor: true
							}),
							/* @__PURE__ */ jsx(AmountCell, {
								value: pending,
								strong: true
							}),
							/* @__PURE__ */ jsx("td", {
								className: "min-w-28 px-3 py-2",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("div", {
										className: "h-1.5 flex-1 overflow-hidden rounded-sm bg-muted",
										"aria-hidden": true,
										children: /* @__PURE__ */ jsx("div", {
											className: "h-full bg-primary",
											style: { width: `${Math.min(paidAdvance, 100)}%` }
										})
									}), /* @__PURE__ */ jsxs("strong", {
										className: "tabular-nums",
										children: [paidAdvance.toFixed(2), "%"]
									})]
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "px-3 py-2 text-center",
								children: /* @__PURE__ */ jsx(StatusBadge, {
									tono: stateTone[state],
									children: state
								})
							}),
							/* @__PURE__ */ jsx("td", {
								className: "min-w-40 px-3 py-2",
								children: selectedPredio.lastMovement
							})
						]
					}) })]
				})
			})]
		}),
		/* @__PURE__ */ jsxs(Section, {
			titulo: "Movimientos presupuestales vinculados",
			className: "mb-4",
			acciones: /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				onClick: () => setMovementsOpen((value) => !value),
				"aria-expanded": movementsOpen,
				children: [
					selectedPredio.movements.length,
					" movimiento(s)",
					movementsOpen ? /* @__PURE__ */ jsx(ChevronUp, {}) : /* @__PURE__ */ jsx(ChevronDown, {})
				]
			}),
			children: [/* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: "Expedientes SIAF y documentos que sustentan la ejecución del predio."
			}), movementsOpen && /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full min-w-[1200px] text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: movementHeaders.map((header, index) => /* @__PURE__ */ jsx("th", {
						scope: "col",
						className: `h-9 whitespace-nowrap px-3 text-xs font-semibold uppercase ${index >= 5 && index <= 9 ? "text-right" : "text-left"}`,
						children: header
					}, header)) }) }), /* @__PURE__ */ jsx("tbody", {
						className: "[&>tr:nth-child(even)]:bg-background",
						children: selectedPredio.movements.length ? selectedPredio.movements.map((item) => /* @__PURE__ */ jsxs("tr", {
							className: "h-10 border-t border-border",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 tabular-nums",
									children: item.date
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 font-semibold",
									children: item.siafFile
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: project.meta
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: item.classifier
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2 font-semibold",
									children: item.document
								}),
								/* @__PURE__ */ jsx(MovementAmount, { value: item.certification }),
								/* @__PURE__ */ jsx(MovementAmount, { value: item.commitment }),
								/* @__PURE__ */ jsx(MovementAmount, { value: item.accrued }),
								/* @__PURE__ */ jsx(MovementAmount, { value: item.drawn }),
								/* @__PURE__ */ jsx(MovementAmount, { value: item.paid }),
								/* @__PURE__ */ jsx("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ jsx(StatusBadge, {
										tono: "neutral",
										children: item.state
									})
								})
							]
						}, `${item.siafFile}-${item.document}`)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 11,
							className: "px-3 py-8 text-center text-sm text-muted-foreground",
							children: "Este predio todavía no tiene movimientos presupuestales vinculados."
						}) })
					})]
				})
			})]
		}),
		/* @__PURE__ */ jsx(SituacionSiafPredio, { codigo: selectedPredio.code }),
		/* @__PURE__ */ jsx(Section, {
			titulo: "Lectura de los estados",
			className: "mb-4",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-3 md:grid-cols-5",
				children: [
					["Sin presupuesto", "No existe certificación vinculada."],
					["Presupuesto insuficiente", "La certificación es menor al costo predial."],
					["Certificado", "Cuenta con certificación y aún no registra ejecución."],
					["En ejecución", "Registra compromiso, devengado o girado."],
					["Pagado", "El pago cubre el costo total reconocido."]
				].map(([label, description]) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-md border border-border p-3",
					children: [/* @__PURE__ */ jsx(StatusBadge, {
						tono: stateTone[label],
						children: label
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: description
					})]
				}, label))
			})
		})
	] });
}
function ContextItem({ label, value, wide = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `bg-card px-2.5 py-2 ${wide ? "col-span-2" : ""}`,
		children: [/* @__PURE__ */ jsx("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "mt-0.5 truncate text-sm font-semibold text-foreground",
			title: value,
			children: value
		})]
	});
}
function InfoLine({ icon: Icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-w-0 gap-1.5",
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 16,
			className: "mt-0.5 shrink-0 text-primary-dark",
			"aria-hidden": true
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-xs text-muted-foreground",
				children: label
			}), /* @__PURE__ */ jsx("div", {
				className: "truncate font-semibold text-foreground",
				title: value,
				children: value
			})]
		})]
	});
}
function KpiCard({ label, value }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-lg border border-border bg-card p-3",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-1 text-lg font-semibold tabular-nums text-foreground",
			children: compactMoney(value)
		})]
	});
}
function ProgressLine({ label, value, color }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-1 flex justify-between text-xs text-muted-foreground",
			children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsxs("span", {
				className: "tabular-nums",
				children: [value.toFixed(2), "%"]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "h-1.5 overflow-hidden rounded-sm bg-muted",
			"aria-hidden": true,
			children: /* @__PURE__ */ jsx("div", {
				className: `h-full ${color}`,
				style: { width: `${Math.min(value, 100)}%` }
			})
		})]
	});
}
function AmountCell({ value, divisor = false, strong = false }) {
	return /* @__PURE__ */ jsx("td", {
		className: `px-3 py-2 text-right tabular-nums ${divisor ? "border-l border-border" : ""} ${strong ? "font-semibold" : ""}`,
		children: compactMoney(value)
	});
}
function MovementAmount({ value }) {
	return /* @__PURE__ */ jsx("td", {
		className: "px-3 py-2 text-right tabular-nums",
		children: value ? money(value) : ""
	});
}
//#endregion
export { SeguimientoPresupuestalPredioPage as component };
