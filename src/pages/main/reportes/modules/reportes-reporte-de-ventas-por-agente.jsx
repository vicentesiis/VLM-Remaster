import { Search } from "lucide-react"
import React, { useRef, useState } from "react"
import { CardHeaderSection } from "@/components/customs/card-header-section"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import GenericSelect from "@/components/customs/generic-select"
import PageLayout from "@/components/customs/layout/page-layout"
import { SalesReportAgentDrawer } from "@/components/customs/sales-report-agent-drawer"
import BaseTable from "@/components/customs/table-data/base-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { currentYear, currentMonth } from "@/constants/utils-contants"
import reportesReporteVentasPorAgenteDetail from "@/data/sales-report-agent-table-data"
import { useAuth } from "@/hooks/useAuth"

export const ReportesReporteVentasPorAgente = () => {
  const [selectedSaleReport, setSelectedSaleReport] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const tableRef = useRef(null)
  const { currentRole } = useAuth()

  const listOfAgents = [
    "Todos",
    "agent",
    "agent2",
    "agent3",
    "agent4",
    "agent5",
  ]

  const handleRowClick = (saleReport) => {
    setSelectedSaleReport(saleReport)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  const [filters, setFilters] = useState({
    selectedYear: currentYear.toString(),
    selectedMonth: currentMonth.toString(),
    displayedYear: null,
    displayedMonth: null,
  })

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      displayedYear: filters.selectedYear,
      displayedMonth: filters.selectedMonth,
    }))
  }

  const Actions = () => {
    const [selectedAgent, setSelectedAgent] = useState(listOfAgents[0])

    return (
      <>
        {(currentRole === "super_admin" || currentRole === "admin") && (
          <GenericSelect
            value={selectedAgent}
            onChange={setSelectedAgent}
            options={listOfAgents.map((agent) => ({
              value: agent,
              label: agent,
            }))}
            placeholder="Agente"
            className="w-[100px]"
          />
        )}

        <DateRangePicker
          title="Rango de Fechas"
          locale="es-MX"
          showCompare={false}
          onUpdate={(range) => setDateRange(range)}
        />

        <Button onClick={handleSearch} className="ml-auto">
          <Search className="h-2 w-2" />
          Buscar
        </Button>
      </>
    )
  }

  return (
    <div>
      <PageLayout title="Ventas Por Agente">
        <Card>
          <CardHeaderSection
            title={"Reporte de Ventas Por Agente"}
            actions={<Actions />}
          />
          <CardContent>
            <div ref={tableRef}>
              <BaseTable
                data={reportesReporteVentasPorAgenteDetail}
                tableType={"ReportesVentasPorAgente"}
                onRowClick={handleRowClick}
              />
            </div>
          </CardContent>
        </Card>
      </PageLayout>

      {/* Conditionally render the Drawer with selectedSaleReport data */}
      <SalesReportAgentDrawer
        open={isDrawerOpen}
        onOpenChange={(val) => {
          if (!val) {
            // Delay deselecting until animation completes
            setTimeout(() => setSelectedSaleReport(null), 300)
          }
          setIsDrawerOpen(val)
        }}
        saleReport={selectedSaleReport}
        tableRef={tableRef}
      />
    </div>
  )
}

export default ReportesReporteVentasPorAgente
