import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export function TableMessageCell({ colSpan, message, className }) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className={cn("h-24 text-center text-muted-foreground", className)}
      >
        {message}
      </TableCell>
    </TableRow>
  )
}
