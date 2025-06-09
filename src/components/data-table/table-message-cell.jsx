import { Info, AlertTriangle, Search } from "lucide-react"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export function TableMessageCell({
  colSpan,
  message,
  variant = "info", // "info" | "error" | "empty"
  className,
  icon,
}) {
  const variantClasses = {
    info: "text-muted-foreground",
    error: "text-destructive",
    empty: "text-muted-foreground",
  }

  const defaultIcons = {
    info: <Info className="mb-3 h-10 w-10 text-muted-foreground" />,
    error: <AlertTriangle className="mb-3 h-10 w-10 text-destructive" />,
    empty: <Search className="mb-3 h-10 w-10 text-muted-foreground" />,
  }

  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-48 p-0">
        <div
          className={cn(
            "flex h-full flex-col items-center justify-center gap-1 text-xl font-semibold",
            variantClasses[variant],
            className
          )}
        >
          {icon ?? defaultIcons[variant]}
          <span>{message}</span>
        </div>
      </TableCell>
    </TableRow>
  )
}
