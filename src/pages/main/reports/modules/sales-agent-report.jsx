import { SearchIcon } from "lucide-react"
import React, { useRef, useState } from "react"
import CollapsibleComponentGroup from "@/components/customs/collapsible/collapsible-component-group"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import InputIcon from "@/components/customs/input-icon"
import PageLayout from "@/components/customs/page-layout"
import { SalesReportAgentDrawer } from "@/components/customs/sales-report-agent-drawer"
import SplitPane from "@/components/customs/split-pane"
import BaseTable from "@/components/customs/table-data/base-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import salesAgentReportDetail from "@/data/sales-report-agent-table-data"

export const SalesAgentReport = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedSaleReport, setSelectedSaleReport] = useState(null)

  const tableRef = useRef(null) // Add ref to table

  const handleRowClick = (saleReport) => {
    setSelectedSaleReport(saleReport)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  function SalesAgentFilter() {
    return (
      <div>
        <CollapsibleComponentGroup title={"Filtro"}>
          <InputIcon
            title="Buscar"
            alwaysOpen={true}
            placeholder={"Buscar"}
            icon={SearchIcon}
          />
          <DateRangePicker
            title="Rango de Fechas"
            locale="es-MX"
            showCompare={false}
          />
        </CollapsibleComponentGroup>
        <div className="flex justify-end sm:mt-8">
          <Button>Aplicar</Button>
        </div>
      </div>
    )
  }

  function SalesAgentTable() {
    return (
      <div ref={tableRef}>
        {" "}
        {/* Wrap table with ref */}
        <BaseTable
          data={salesAgentReportDetail}
          tableType="salesAgentReport"
          onRowClick={handleRowClick}
        />
      </div>
    )
  }

  return (
    <div>
      <PageLayout title="Ventas Por Agente">
        <Card>
          <CardContent>
            <SplitPane
              title={"Lista de Ventas"}
              subTitle={""}
              LeftSideComponent={SalesAgentFilter}
              RightSideComponent={SalesAgentTable}
            />
          </CardContent>
        </Card>
      </PageLayout>

      {/* Conditionally render the Drawer with selectedSaleReport data */}
      {isDrawerOpen && selectedSaleReport && (
        <SalesReportAgentDrawer
          saleReport={selectedSaleReport}
          onClose={handleCloseDrawer}
          tableRef={tableRef} // Pass tableRef to drawer
        />
      )}
    </div>
  )
}

export default SalesAgentReport
