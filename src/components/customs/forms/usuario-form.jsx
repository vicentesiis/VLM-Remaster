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
  agentTypeField,
} from "@/forms/fields"
import {
  nameSchema,
  usernameSchema,
  passwordSchema,
  phoneSchema,
  agentTypeSchema,
} from "@/forms/validators"
import { useCodexData } from "@/hooks/queries"
import { extractAndMapToOptions } from "@/utils"

export const formSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  password: passwordSchema,
  phone: phoneSchema,
  agent_type: agentTypeSchema,
})

const UsuarioForm = forwardRef(({ onSubmit }, ref) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      phone: "",
      agent_type: "",
    },
  })

  const submitHandler = form.handleSubmit((data) => {
    onSubmit?.(data)
  })

  // Expose the submit method to parent
  useImperativeHandle(ref, () => ({
    submit: () => submitHandler(),
  }))

  const { agentTypes } = useCodexData()
  const agentTypesOptions = extractAndMapToOptions(agentTypes)

  const fields = [
    nameField(),
    usernameField(),
    passwordField(),
    phoneField(),
    agentTypeField(agentTypesOptions),
  ]

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

UsuarioForm.propTypes = {
  defaultValues: PropTypes.any,
  isEdit: PropTypes.bool,
  onSubmit: PropTypes.func,
}

UsuarioForm.displayName = "UsuarioForm"

export default UsuarioForm
