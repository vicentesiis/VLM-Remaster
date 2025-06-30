import { zodResolver } from "@hookform/resolvers/zod"
import PropTypes from "prop-types"
import React, { forwardRef, useImperativeHandle } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { renderFormField } from "./form-field-renders"
import { Form } from "@/components/ui/form"
import {
  nameField,
  usernameField,
  passwordField,
  phoneField,
} from "@/forms/fields"
import {
  nameSchema,
  usernameSchema,
  passwordSchema,
  phoneSchema,
} from "@/forms/validators"

const adminSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  password: passwordSchema,
  phone: phoneSchema,
})

const AdminForm = forwardRef(({ onSubmit }, ref) => {
  const form = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      phone: "",
    },
  })

  const submitHandler = form.handleSubmit((data) => {
    onSubmit?.({ ...data, role: "admin" }) // hardcoded role
  })

  // Expose submit() for imperative triggering
  useImperativeHandle(ref, () => ({
    submit: () => submitHandler(),
  }))

  const fields = [nameField(), usernameField(), passwordField(), phoneField()]

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={submitHandler}>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(({ name, type, label, options, ...rest }) =>
              renderFormField(type, name, label, options, rest, form)
            )}
          </div>
        </form>
      </Form>
    </FormProvider>
  )
})

AdminForm.propTypes = {
  onSubmit: PropTypes.func,
  defaultValues: PropTypes.object,
  isSubmitting: PropTypes.bool,
}

AdminForm.displayName = "AdminForm"

export default AdminForm
