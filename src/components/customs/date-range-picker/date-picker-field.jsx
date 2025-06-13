import { format, parseISO } from "date-fns"
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
}) => {
  const dateValue =
    typeof value === "string"
      ? parseISO(value)
      : value instanceof Date
        ? value
        : null

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={onChange}
          captionLayout="dropdown"
          fromYear={1900} // Años desde 1900
          toYear={new Date().getFullYear()} // Hasta el año actual
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerField
