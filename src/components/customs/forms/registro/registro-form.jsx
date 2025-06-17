import { zodResolver } from "@hookform/resolvers/zod"
import PropTypes from "prop-types"
import React, { forwardRef, useImperativeHandle } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { RegistroSectionForm } from "./registro-section-form"
import { Form } from "@/components/ui/form"
import {
  nameField,
  emailField,
  phoneField,
  dateOfBirthField,
  nationalityField,
  stateField,
  passportField,
  curpField,
  jobField,
  programField,
  channelField,
  commentsField,
} from "@/forms/fields"
import {
  nameSchema,
  emailSchema,
  phoneSchema,
  dateOfBirthSchema,
  nationalitySchema,
  stateSchema,
  curpSchema,
  passportSchema,
  jobSchema,
  programSchema,
  channelSchema,
  commentsSchema,
} from "@/forms/validators"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { extractAndMapToOptions } from "@/utils/utils"

export const formSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  date_of_birth: dateOfBirthSchema,
  nationality: nationalitySchema,
  state: stateSchema,
  curp: curpSchema,
  passport: passportSchema,
  job: jobSchema,
  program: programSchema,
  channel: channelSchema,
  comments: commentsSchema,
})

const RegistroForm = forwardRef(
  ({ onSubmit, defaultValues, isEdit = false }, ref) => {
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        date_of_birth: defaultValues?.date_of_birth ?? new Date(),
        nationality: "méxico",
        state: "",
        curp: "",
        passport: "",
        job: "",
        program: "",
        channel: "",
        comments: "",
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

    const { nationalities, mexicoStates, programs, channels } = useCodexData()

    const nacionalidadOptions = extractAndMapToOptions(nationalities)
    const estadosOptions = extractAndMapToOptions(mexicoStates)
    const programaOptions = extractAndMapToOptions(programs)
    const channelOptions = extractAndMapToOptions(channels)

    const recordDataFields = [
      nameField(),
      emailField(),
      phoneField(),
      dateOfBirthField(),
      nationalityField(nacionalidadOptions),
      stateField(estadosOptions),
      passportField(),
      curpField(),
    ]

    const vacantInfoFields = [
      jobField({ disabled: isEdit }),
      programField(programaOptions, { disabled: isEdit }),
      channelField(channelOptions, { disabled: isEdit }),
      commentsField(),
    ]

    return (
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={submitHandler}>
            <div className="space-y-4">
              <RegistroSectionForm
                title="Datos del Registro"
                form={form}
                fields={recordDataFields}
              />
              <RegistroSectionForm
                title="Información del Proceso"
                form={form}
                fields={vacantInfoFields}
              />
            </div>
          </form>
        </Form>
      </FormProvider>
    )
  }
)

RegistroForm.propTypes = {
  defaultValues: PropTypes.any,
  isEdit: PropTypes.bool,
  onSubmit: PropTypes.func,
}

RegistroForm.displayName = "RegistroForm"

export default RegistroForm
