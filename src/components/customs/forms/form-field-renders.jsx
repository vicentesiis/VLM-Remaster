import React from "react"
import DatePickerField from "../date-range-picker/date-picker-field"
import InputCurrency from "../inputs/input-currency"
import InputWithNumericOnly from "../inputs/input-with-numeric-only"
import RadioCardSelector from "../radio-card-selector"
import { AutoComplete } from "@/components/ui/auto-complete"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const renderFormField = (type, name, label, options, rest, form) => {
  switch (type) {
    case "input":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} {...rest} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case "numeric":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <InputWithNumericOnly {...field} {...rest} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case "currency":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={() => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <InputCurrency control={form.control} name={name} {...rest} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case "textarea":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Textarea {...field} {...rest} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case "autocomplete":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <AutoComplete
                  options={options}
                  value={
                    options.find((opt) => opt.value === field.value) ?? null
                  }
                  onValueChange={(selected) =>
                    field.onChange(selected?.value ?? null)
                  }
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case "date":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <DatePickerField
                  value={field.value}
                  onChange={field.onChange}
                  showYearDropdown
                  scrollableYearDropdown
                  dateFormat="dd/MM/yyyy"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case "radioCard":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <RadioCardSelector
                  value={field.value}
                  onChange={field.onChange}
                  options={options} // ← options come from the field config
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    default:
      return null
  }
}
