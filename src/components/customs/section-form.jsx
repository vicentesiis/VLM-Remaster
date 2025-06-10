import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AutoCompleteField } from "@/components/customs/auto-complete-field"
import DatePickerField from "./date-range-picker/date-picker-field"
import { Textarea } from "../ui/textarea"

export const SectionForm = ({ form, title, fields }) => {
  return (
    <Card>
      <CardHeader className="-my-2 -mb-8">
        <CardTitle>{title}</CardTitle>
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
                      <FormItem className="col-span-full -mt-2">
                        {" "}
                        {/* full width */}
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
                    render={() => (
                      <AutoCompleteField
                        name={name}
                        label={label}
                        control={form.control}
                        options={options}
                      />
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
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <DatePickerField
                              value={field.value}
                              onChange={field.onChange}
                              showYearDropdown
                              scrollableYearDropdown
                              dateFormat="dd/MM/yyyy"
                            />
                          </FormControl>
                        </div>
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
