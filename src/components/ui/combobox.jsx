import React, { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
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

export function Combobox({
  options,
  placeholder = "Select option...",
  value: controlledValue,
  onChange,
  className,
  widthClass = "w-[200px]",
}) {
  const [open, setOpen] = useState(false)
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState("")

  const value = isControlled ? controlledValue : internalValue

  const handleSelect = (newValue) => {
    const finalValue = newValue === value ? "" : newValue
    if (!isControlled) {
      setInternalValue(finalValue)
    }
    if (onChange) {
      onChange(finalValue)
    }
    setOpen(false)
  }

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(widthClass, "justify-between", className)}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(widthClass, "p-0")}>
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
