import React from "react"
import RegistrosIndexRedirect from "./registros-index-redirect"
import { componentPropsMap } from "./route-props"
import Ajustes from "@/pages/main/ajustes/ajustes"
import Cuentas from "@/pages/main/ajustes/modules/cuentas"
import Dashboard from "@/pages/main/dashboard/dashboard"
import Registros from "@/pages/main/registros/registros"
import RegistrosDetail from "@/pages/main/registros/registros-detail/registros-detail"
import ReporteReporteCorteAgente from "@/pages/main/reportes/modules/reportes-reporte-de-corte-de-agente"
import ReporteReporteRecordFinalizado from "@/pages/main/reportes/modules/reportes-reporte-de-record_finalizado"
import ReportesReporteDeRegistros from "@/pages/main/reportes/modules/reportes-reporte-de-registros"
import ReportesReporteVentasPorAgente from "@/pages/main/reportes/modules/reportes-reporte-de-ventas-por-agente/reportes-reporte-de-ventas-por-agente"
import ReportesReporteVentalMensual from "@/pages/main/reportes/modules/reportes-reporte-venta-mensual"
import ReportesReporteVentaPorAgentePotencial from "@/pages/main/reportes/modules/reportes-reporte-venta-por-agente-potencial"
import ReportesReporteVentasActivasPorCobrar from "@/pages/main/reportes/modules/reportes-reporte-ventas-activas-por-cobrar/reportes-reporte-ventas-activas-por-cobrar"
import ReportesReporteVentasGlobales from "@/pages/main/reportes/modules/reportes-reporte-ventas-globales"
import Reportes from "@/pages/main/reportes/reportes"
import Usuarios from "@/pages/main/usuarios/usuarios"
import Vacantes from "@/pages/main/vacantes/vacantes"
import VacantesDetail from "@/pages/main/vacantes/vacantes-detail/vacantes-detail"

export const componentMap = {
  home: RegistrosIndexRedirect,
  dashboard: Dashboard,
  registros: Registros,
  misProspectos: Registros,
  misLeads: Registros,
  misClientes: Registros,
  clientes: Registros,
  tareas: Registros,
  ajustes: Ajustes,
  cuentas: Cuentas,
  registroDetail: RegistrosDetail,
  reportesReporteDeRegistros: ReportesReporteDeRegistros,
  reportesReporteVentasPorAgente: ReportesReporteVentasPorAgente,
  reportesReporteVentalMensual: ReportesReporteVentalMensual,
  reportesReporteVentasGlobales: ReportesReporteVentasGlobales,
  reporteReporteRecordFinalizado: ReporteReporteRecordFinalizado,
  reportesReporteCorteAgente: ReporteReporteCorteAgente,
  reportesReporteVentaPorAgentePotencial:
    ReportesReporteVentaPorAgentePotencial,
  reportesReporteVentasActivasPorCobrar: ReportesReporteVentasActivasPorCobrar,
  reportes: Reportes,
  vacantes: Vacantes,
  vacantDetail: VacantesDetail,
  usuarios: Usuarios
}

export const GenericRouteWrapper = ({ routeKey, ...routeParams }) => {
  const Component = componentMap[routeKey]
  const componentProps = componentPropsMap[routeKey] || {}

  if (!Component) return <>Unknown Component</>

  return <Component {...componentProps} {...routeParams} />
}
