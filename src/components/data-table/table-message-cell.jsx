import React from "react"
import { StatusState } from "@/components/customs/status-state/status-state"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export function TableMessageCell({
  colSpan,
  message,
  description,
  variant = "info",
  className
}) {
  const statusTypeMap = {
    info: "idle",
    error: "error",
    empty: "empty",
  }

  return (
    <TableRow className="hover:!bg-transparent hover:!shadow-none hover:!translate-y-0 hover:!brightness-100">
      <TableCell colSpan={colSpan} className="h-72 p-0">
        <StatusState
          type={statusTypeMap[variant] ?? "idle"}
          title={message}
          description={description}
          className={cn(
            "!h-full !rounded-none !border-0 !shadow-none !p-0",
            className
          )}
        />
      </TableCell>
    </TableRow>
  )
}
