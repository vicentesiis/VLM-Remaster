import AjustesUsuariosTableBody from "@/components/customs/table-data/table-body/ajustes-usuarios-table-body"
import RegistrosTableBody from "@/components/customs/table-data/table-body/registros-table-body"
import ReportesVentasPorAgenteDetalleTableBody from "@/components/customs/table-data/table-body/reportes-ventas-por-agente-detalle-table-body"
import ReportesVentasPorAgenteTableBody from "@/components/customs/table-data/table-body/reportes-ventas-por-agente-table-body"

export const tableBodyRegister = {
  Registros: RegistrosTableBody,
  ReportesVentasPorAgente: ReportesVentasPorAgenteTableBody,
  ReportesVentasPorAgenteDetalle: ReportesVentasPorAgenteDetalleTableBody,
  AjustesUsuarios: AjustesUsuariosTableBody,
}

export default tableBodyRegister
