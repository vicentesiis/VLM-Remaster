import React from "react"
import DatePickerField from "./date-range-picker/date-picker-field"
import { AutoComplete } from "../ui/auto-complete"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export const SectionForm = ({ form, title, fields }) => {
  return (
    <Card>
      <CardHeader className="-mb-6">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((fieldConfig) => {
            const { name, type, label, options, ...rest } = fieldConfig

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
                            onKeyDown={(e) => {
                              if (rest.numericOnly) {
                                const isNumber = /^[0-9]$/.test(e.key)
                                const allowed = [
                                  "Backspace",
                                  "Tab",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Delete",
                                ]
                                if (!isNumber && !allowed.includes(e.key)) {
                                  e.preventDefault()
                                }
                              }
                              if (rest.onKeyDown) rest.onKeyDown(e)
                            }}
                          />
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
                              options.find(
                                (opt) => opt.value === field.value
                              ) ?? null
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

              default:
                return null
            }
          })}
        </div>
      </CardContent>
    </Card>
  )
}
