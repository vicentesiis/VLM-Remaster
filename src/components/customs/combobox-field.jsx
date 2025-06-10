import React from "react"
import { Controller } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Combobox } from "@/components/ui/combobox"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

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
            <Combobox
              options={options}
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
              disabled={disabled}
              widthClass="w-full"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}