import React, { useEffect, useRef } from "react"
import { Drawer } from "vaul"
import { Button, H3Border, PLead } from "../ui"
import { BaseTable } from "./table-data"
import StatusBadge from "./badge/status-badge"

export function SalesReportAgentDrawer({ saleReport, onClose, tableRef }) {
  if (!saleReport) return null // Ensure the drawer isn't shown when there's no sale report data

  const drawerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        !(tableRef?.current && tableRef.current.contains(event.target)) // Ignore clicks inside table
      ) {
        onClose() // Close drawer when clicking outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose, tableRef])

  return (
    <Drawer.Root open={true} onClose={onClose} modal={false} direction="bottom">
      <Drawer.Portal>
        {/* Drawer Content */}
        <Drawer.Content
          ref={drawerRef}
          className="fixed inset-0 z-50 ml-auto flex sm:w-[500px] items-center p-3"
        >
          <div className="flex h-full w-full grow flex-col rounded-xl border-2 bg-white p-5">
            <Drawer.Title className="mb-4 flex items-center gap-3">
              <H3Border>Detalle del {saleReport.date} </H3Border>
              <div className="mb-1">
                <StatusBadge status={saleReport.status} />
              </div>
            </Drawer.Title>
            {/* Content */}
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
                tableType={"salesReportDetailTableBody"}
              />
              <div className="flex grow flex-col justify-end mb-4">
                <Button onClick={onClose} >Cerrar</Button>
              </div>
            </Drawer.Description>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
export default SalesReportAgentDrawer
