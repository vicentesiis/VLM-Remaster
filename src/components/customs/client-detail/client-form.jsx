import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { SectionForm } from "../section-form"
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

export const ClientForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date_of_birth: null,
      nationality: "méxico",
      state: "",
      curp: "",
      passport: "",
      job: "",
      program: "",
      channel: "",
      comments: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  // GET Codex Data
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
    jobField(),
    programField(programaOptions),
    channelField(channelOptions),
    commentsField(),
  ]

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <SectionForm
              title="Datos del Registro"
              form={form}
              fields={recordDataFields}
            />
            <SectionForm
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

export default ClientForm
