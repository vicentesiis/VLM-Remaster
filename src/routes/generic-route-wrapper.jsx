import React from "react"
import RegistrosIndexRedirect from "./registros-index-redirect"
import { Ajustes } from "@/pages/main/ajustes/ajustes"
import { Cuentas } from "@/pages/main/ajustes/modules/cuentas"
import { AjustesUsuarios } from "@/pages/main/ajustes/modules/usuarios"
import { Clientes } from "@/pages/main/clientes/clientes"
import { Info } from "@/pages/main/info/info"
import { Registros } from "@/pages/main/registros/registros"
import { RegistrosDetail } from "@/pages/main/registros/registros-detail/registros-detail"
import { ReportesReporteDeRegistros } from "@/pages/main/reportes/modules/reportes-reporte-de-registros"
import { ReportesReporteVentasPorAgente } from "@/pages/main/reportes/modules/reportes-reporte-de-ventas-por-agente"
import { ReportesReporteVentalMensual } from "@/pages/main/reportes/modules/reportes-reporte-venta-mensual"
import { ReportesReporteVentasGlobales } from "@/pages/main/reportes/modules/reportes-reporte-ventas-globales"
import { Reportes } from "@/pages/main/reportes/reportes"
import { Vacantes } from "@/pages/main/vacantes/vacantes"

const MisRegistros = () => <>Mis Registros</>
const MisLeads = () => <>Mis Leads</>
const MisClientes = () => <>Mis Clientes</>
const Tareas = () => <>Mis Tareas</>
const ReportePersonal = () => <>Reporte Personal</>
const AuditoriaDeRegistros = () => <>Auditoria de Registros</>
const ControlDeFinalizados = () => <>Control de Finalizados</>
const VentasPorCanal = () => <>Ventas por Canal</>
const CortesPorAgente = () => <>Cortes por Agente</>
const UsuariosInfo = () => <>Usuarios</>
const UnauthorizedAccess = () => <>Unauthorized Access</>

export const componentMap = {
  home: RegistrosIndexRedirect,
  registros: Registros,
  misRegistros: Registros,
  misLeads: Registros,
  misClientes: Registros,
  clientes: Registros,
  tareas: Clientes,
  ajustes: Ajustes,
  cuentas: Cuentas,
  ajustesUsuarios: AjustesUsuarios,
  registroDetail: RegistrosDetail,
  info: Info,
  reportesReporteDeRegistros: ReportesReporteDeRegistros,
  reportesReporteVentasPorAgente: ReportesReporteVentasPorAgente,
  reportesReporteVentalMensual: ReportesReporteVentalMensual,
  reportesReporteVentasGlobales: ReportesReporteVentasGlobales,
  reportes: Reportes,
  vacantes: Vacantes,
  reportePersonal: ReportePersonal,
  auditoriaDeRegistros: AuditoriaDeRegistros,
  controlDeFinalizados: ControlDeFinalizados,
  ventasPorCanal: VentasPorCanal,
  cortesPorAgente: CortesPorAgente,
  usuariosInfo: UsuariosInfo,
  unauthorizedAccess: UnauthorizedAccess,
}

export const componentPropsMap = {
  registros: {
    title: "Registros",
  },
  misRegistros: {
    title: "Mis Registros",
  },
  misLeads: {
    title: "Mis Leads",
  },
  misClientes: {
    title: "Mis Clientes",
  },
  tareas: {
    title: "Mis Tareas",
  },
  clientes: {
    title: "Clientes",
  },
}

export const GenericRouteWrapper = ({ routeKey, ...routeParams }) => {
  const Component = componentMap[routeKey]
  const componentProps = componentPropsMap[routeKey] || {}

  if (!Component) return <>Unknown Component</>

  return <Component {...componentProps} {...routeParams} />
}
