import PropTypes from "prop-types"
import React from "react"
import { renderFormField } from "../form-field-renders"
import { SectionTitle } from "@/components/customs/section-title"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const RegistroSectionForm = ({ form, title, fields }) => {
  return (
    <Card>
      <CardHeader className="px-4 sm:-mb-10 sm:-mt-2">
        <SectionTitle title={title} />
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
