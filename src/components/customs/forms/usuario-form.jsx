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
  activeField,
} from "@/forms/fields"
import {
  nameSchema,
  usernameSchema,
  passwordSchema,
  phoneSchema,
  agentTypeSchema,
} from "@/forms/validators"

export const getFormSchema = (isEdit) =>
  z.object({
    name: nameSchema,
    username: usernameSchema,
    password: isEdit ? z.string().optional() : passwordSchema,
    phone: phoneSchema,
    agent_type: agentTypeSchema,
    active: z.boolean().optional(),
  })

const UsuarioForm = forwardRef(
  ({ onSubmit, defaultValues, isEdit = false }, ref) => {
    const schema = getFormSchema(isEdit)

    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        name: "",
        username: "",
        password: "",
        phone: "",
        agent_type: "",
        active: true,
        ...defaultValues,
      },
    })
    const submitHandler = form.handleSubmit((data) => {
      onSubmit?.(data)
    })

    // Expose the submit method to parent
    useImperativeHandle(ref, () => ({
      submit: () => submitHandler(),
    }))

    const agentTypeOptions = [
      { label: "Remote", value: "remote" },
      { label: "Callcenter", value: "callcenter" },
      { label: "Post", value: "post" },
    ]

    const fields = [
      nameField(),
      usernameField({ disabled: isEdit }),
      ...(!isEdit ? [passwordField()] : []),
      phoneField(),
      agentTypeField(agentTypeOptions),
      ...(isEdit ? [activeField()] : []),
    ]

    return (
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={submitHandler}>
            <div className="grid sm:grid-cols-2 gap-4">
              {fields.map((fieldConfig) => {
                const { name, type, label, options, ...rest } = fieldConfig
                return renderFormField(type, name, label, options, rest, form)
              })}
            </div>
          </form>
        </Form>
      </FormProvider>
    )
  }
)

UsuarioForm.propTypes = {
  defaultValues: PropTypes.any,
  isEdit: PropTypes.bool,
  onSubmit: PropTypes.func,
}

UsuarioForm.displayName = "UsuarioForm"

export default UsuarioForm
