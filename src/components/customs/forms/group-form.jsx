import { zodResolver } from "@hookform/resolvers/zod"
import PropTypes from "prop-types"
import React, { forwardRef, useImperativeHandle } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { renderFormField } from "./form-field-renders"
import { Form } from "@/components/ui/form"
import { groupNameField, phoneField } from "@/forms/fields"
import { groupNameSchema, phoneSchema } from "@/forms/validators"

export const getFormSchema = () =>
  z.object({
    name: groupNameSchema,
    phone: phoneSchema,
  })

const GroupForm = forwardRef(({ onSubmit }, ref) => {
  const schema = getFormSchema()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
    },
  })
  const submitHandler = form.handleSubmit((data) => {
    onSubmit?.(data)
  })

  // Expose the submit method to parent
  useImperativeHandle(ref, () => ({
    submit: () => submitHandler(),
  }))

  const fields = [groupNameField(), phoneField()]

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((fieldConfig) => {
              const { name, type, label, options, ...rest } = fieldConfig
              return renderFormField(type, name, label, options, rest, form)
            })}
          </div>
        </form>
      </Form>
    </FormProvider>
  )
})

GroupForm.propTypes = {
  defaultValues: PropTypes.any,
  isEdit: PropTypes.bool,
  onSubmit: PropTypes.func,
}

GroupForm.displayName = "GroupForm"

export default GroupForm
