import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const DatePickerField = ({
  value,
  onChange,
  placeholder = "Selecciona una fecha",
  disableRange = "future", // "future", "past", "none"
}) => {
  const [open, setOpen] = React.useState(false)

  const dateValue =
    typeof value === "string"
      ? parseISO(value)
      : value instanceof Date
        ? value
        : null

  const handleSelect = (date) => {
    onChange(date)
    setOpen(false)
  }

  const getDisabledFunction = () => {
    const today = new Date()
    const minDate = new Date("1900-01-01")

    switch (disableRange) {
      case "future":
        return (date) => date > today || date < minDate
      case "past":
        return (date) => {
          const dateOnly = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          )
          const todayOnly = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          )
          return dateOnly < todayOnly || date < minDate
        }
      case "none":
        return (date) => date < minDate
      default:
        return (date) => date > today || date < minDate
    }
  }

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? (
            format(value, "PPP", { locale: es })
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleSelect}
          captionLayout="dropdown"
          fromYear={1900}
          toYear={
            disableRange === "past"
              ? new Date().getFullYear() + 10
              : new Date().getFullYear()
          }
          disabled={getDisabledFunction()}
          defaultMonth={dateValue || new Date()}
          locale={es}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerField
