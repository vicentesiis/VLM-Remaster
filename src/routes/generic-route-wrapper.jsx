import React from "react"
import { Ajustes } from "@/pages/main/ajustes/ajustes"
import { Cuentas } from "@/pages/main/ajustes/modules/cuentas"
import { AjustesUsuarios } from "@/pages/main/ajustes/modules/usuarios"
import { Clientes } from "@/pages/main/clientes/clientes"
import { ClientesDetail } from "@/pages/main/clientes/clientes-detail/clientes-detail"
import { Info } from "@/pages/main/info/info"
import { Registros } from "@/pages/main/registros/registros"
import { ReportesReporteDeRegistros } from "@/pages/main/reportes/modules/reportes-reporte-de-registros"
import { ReportesReporteVentasPorAgente } from "@/pages/main/reportes/modules/reportes-reporte-de-ventas-por-agente"
import { ReportesReporteVentalMensual } from "@/pages/main/reportes/modules/reportes-reporte-venta-mensual"
import { ReportesReporteVentasGlobales } from "@/pages/main/reportes/modules/reportes-reporte-ventas-globales"
import { Reportes } from "@/pages/main/reportes/reportes"
import { Vacantes } from "@/pages/main/vacantes/vacantes"

// Inline simple components for routes with no component (replace <>Text</>)
const MisRegistros = () => <>Mis Registros</>
const MisClientes = () => <>Mis Clientes</>
const MisTareas = () => <>Mis Tareas</>
const ReportePersonal = () => <>Reporte Personal</>
const AuditoriaDeRegistros = () => <>Auditoria de Registros</>
const ControlDeFinalizados = () => <>Control de Finalizados</>
const VentasPorCanal = () => <>Ventas por Canal</>
const CortesPorAgente = () => <>Cortes por Agente</>
const UsuariosInfo = () => <>Usuarios</>
const UnauthorizedAccess = () => <>Unauthorized Access</>

export const componentMap = {
  ajustes: Ajustes,
  cuentas: Cuentas,
  ajustesUsuarios: AjustesUsuarios,
  clientes: Clientes,
  clientesDetail: ClientesDetail,
  info: Info,
  registros: Registros,
  reportesReporteDeRegistros: ReportesReporteDeRegistros,
  reportesReporteVentasPorAgente: ReportesReporteVentasPorAgente,
  reportesReporteVentalMensual: ReportesReporteVentalMensual,
  reportesReporteVentasGlobales: ReportesReporteVentasGlobales,
  reportes: Reportes,
  vacantes: Vacantes,
  misRegistros: Registros,
  misClientes: Registros,
  misTareas: Registros,
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
  misClientes: {
    title: "Mis Clientes",
  },
  misTareas: {
    title: "Mis Tareas",
  },
}

export const GenericRouteWrapper = ({ routeKey, ...routeParams }) => {
  const Component = componentMap[routeKey]
  const componentProps = componentPropsMap[routeKey] || {}

  if (!Component) return <>Unknown Component</>

  return <Component {...componentProps} {...routeParams} />
}
