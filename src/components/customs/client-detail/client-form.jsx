import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { SectionForm } from "../section-form"
import { Form } from "@/components/ui/form"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { extractAndMapToOptions } from "@/utils/utils"

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
} from "@/validation/validators"

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
    { name: "name", label: "Nombre Completo", type: "input" },
    { name: "email", label: "Email", type: "input" },
    {
      name: "phone",
      label: "Teléfono",
      type: "input",
      maxLength: 10,
      numericOnly: true,
    },
    {
      name: "date_of_birth",
      label: "Fecha de Nacimiento",
      type: "date",
    },
    {
      name: "nationality",
      label: "Nacionalidad",
      type: "autocomplete",
      options: nacionalidadOptions,
    },
    {
      name: "state",
      label: "Estado",
      type: "autocomplete",
      options: estadosOptions,
    },
    { name: "passport", label: "Pasaporte", type: "input" },
    { name: "curp", label: "CURP", type: "input" },
  ]

  const vacantInfoFields = [
    {
      name: "job",
      label: "ID de la Vacante",
      type: "input",
      placeholder: "ID de la Vacante",
    },
    {
      name: "program",
      label: "Programa",
      type: "autocomplete",
      options: programaOptions,
    },
    {
      name: "channel",
      label: "Canal de Captación",
      type: "autocomplete",
      options: channelOptions,
    },
    {
      name: "comments",
      label: "Comentarios",
      type: "textarea",
      placeholder: "Escribe aquí tus observaciones...",
    },
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
