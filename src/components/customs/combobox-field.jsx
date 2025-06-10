import React from "react"
import { Controller } from "react-hook-form"
import { SimpleSelect } from "./simple-select"
import { cn } from "@/lib/utils"
import { Combobox } from "@/components/ui/combobox"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AutoComplete } from "../ui/auto-complete"

export const ComboboxField = ({
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
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex flex-col", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <AutoComplete
              options={options}
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}
