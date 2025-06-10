import React from "react"
import { Controller } from "react-hook-form"
import { AutoComplete } from "../ui/auto-complete"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

export const AutoCompleteField = ({
  name,
  label,
  description,
  options,
  control,
  disabled = false,
  placeholder = "Seleccione una opción",
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = options.find((opt) => opt.value === field.value)

        return (
          <FormItem className={cn("flex flex-col", className)}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <AutoComplete
                options={options}
                value={selectedOption}
                onValueChange={(selected) => {
                  field.onChange(selected?.value) // extract only the value
                }}
                placeholder={placeholder}
                disabled={disabled}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )
      }}
    />
  )
}
