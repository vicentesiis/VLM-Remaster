import React from "react"
import DatePickerField from "../date-range-picker/date-picker-field"
import InputCurrency from "../inputs/input-currency"
import InputWithNumericOnly from "../inputs/input-with-numeric-only"
import RadioCardSelector from "../radio-card-selector"
import { RadioGroup, RadioGroupItem } from "@/components/ui"
import { Switch } from "@/components/ui"
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
import { cn } from "@/lib"

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
                <Input
                  {...field}
                  {...rest}
                  className={cn(rest.className)}
                  onChange={(e) => {
                    const rawValue = e.target.value
                    const transformedValue =
                      typeof rest.transform === "function"
                        ? rest.transform(rawValue)
                        : rawValue
                    field.onChange(transformedValue)
                  }}
                  value={field.value ?? ""}
                />
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
                  disableRange={rest?.disableRange || "future"}
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
                  options={options}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case "radio":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                  {...rest}
                >
                  {options?.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`${name}-${option.value}`}
                      />
                      <label
                        htmlFor={`${name}-${option.value}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )

    case "switch":
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-sm font-medium">{label}</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  {...rest}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )

    default:
      return null
  }
}
