"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

const data = [
  {
    value: "creado",
    label: "Creado",
  },
  {
    value: "importado",
    label: "Importado",
  },
  {
    value: "información Pendiente",
    label: "Información Pendiente",
  },
  {
    value: "generar Referencia",
    label: "Generar Referencia",
  },
  {
    value: "generar Contrato",
    label: "Generar Contrato",
  },
  {
    value: "contrato Generado",
    label: "Contrato Generado",
  },
]

export function FancyMultiSelect({ className = "" }) {
  const inputRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState([])
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = React.useCallback((framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value))
  }, [])

  const handleKeyDown = React.useCallback((e) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev]
            newSelected.pop()
            return newSelected
          })
        }
      }
      if (e.key === "Escape") {
        input.blur()
      }
    }
  }, [])

  const selectables = data.filter(
    (framework) => !selected.includes(framework)
  )

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-transparent ${className}`}
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Selecciona Estatus..."
            className="flex-1 outline-none placeholder "
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue("")
                        setSelected((prev) => [...prev, framework])
                      }}
                      className="cursor-pointer"
                    >
                      {framework.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  )
}
