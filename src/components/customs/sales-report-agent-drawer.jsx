import React, { useEffect, useRef } from "react"
import { Drawer } from "vaul"
import { Button, H3, PLead } from "../ui"
import { BaseTable } from "./table-data"
import { X } from "lucide-react"

export function SalesReportAgentDrawer({
  open,
  onOpenChange,
  saleReport,
  tableRef,
}) {
  const drawerRef = useRef(null)

  if (!saleReport) return null

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      modal={false}
      direction="bottom"
    >
      <Drawer.Portal>
        {/* <Drawer.Overlay className="bg-black/40 backdrop-blur-sm transition-all" /> */}
        <Drawer.Content className="fixed inset-0 z-30 items-center pt-8 transition-all duration-300 sm:ml-auto sm:flex sm:w-[500px] sm:p-8 sm:py-24">
          <div className="flex h-full w-full flex-col rounded-xl border-2 bg-white p-5">
            <Drawer.Title className="mb-4 items-center gap-3">
              <div className="flex items-center justify-between">
                <H3>Detalle del {saleReport.date} </H3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                >
                  <X style={{ width: "24px", height: "24px" }} />
                </Button>
              </div>
              <StatusBadge status={saleReport.status} />
            </Drawer.Title>

            <Drawer.Description className="flex h-full flex-col">
              <div className="mb-4 flex flex-col gap-3">
                <PLead>
                  <strong>Agentes:</strong> Lista de Agentes (?)
                </PLead>
                <PLead>
                  <strong>Cantidad de Órdenes:</strong> {saleReport.quantity}
                </PLead>
                <PLead>
                  <strong>Ventas del día:</strong> ${saleReport.total}
                </PLead>
              </div>

              <BaseTable
                data={saleReport["sells"]}
                tableType={"ReportesVentasPorAgenteDetalle"}
              />
            </Drawer.Description>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
export default SalesReportAgentDrawer
