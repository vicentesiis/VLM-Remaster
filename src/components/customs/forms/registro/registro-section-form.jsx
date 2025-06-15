import PropTypes from "prop-types"
import React from "react"
import { renderFormField } from "../form-field-renders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const RegistroSectionForm = ({ form, title, fields }) => {
  return (
    <Card>
      <CardHeader className="px-4 sm:-mb-10 sm:-mt-2">
        <CardTitle className="text-lg font-semibold text-primary">
          {title}
        </CardTitle>
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

RegistroSectionForm.propTypes = {
  fields: PropTypes.any,
  form: PropTypes.any,
  title: PropTypes.any,
}
