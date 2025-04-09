import { Check, ChevronsUpDown } from "lucide-react"
import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const ComboBox = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  variant = "button", // 'button' o 'form'
}) => {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const buttonRef = useRef(null) // Ref para el Button
  const selectedLabel = options.find((option) => option.value === value)?.label

  // Usamos useEffect para establecer el ancho del botón cuando se renderiza
  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth) // Establecer el ancho del Button
    }
  }, [open]) // Se ejecuta cada vez que el popover se abre

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef} // Usamos el ref aquí
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between",
            variant === "form"
              ? "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              : "w-[200px]", // Estilo por defecto para el combo en el header
            className
          )}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(variant === "form" ? "p-0" : "p-0")}
        style={{ width: `${width}px` }} // Aquí aplicamos el ancho del Button
      >
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBox
