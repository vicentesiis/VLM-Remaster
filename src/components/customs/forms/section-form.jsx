import React from "react"
import { renderFormField } from "./form-field-renders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
            return renderFormField(type, name, label, options, rest, form)
          })}
        </div>
      </CardContent>
    </Card>
  )
}
