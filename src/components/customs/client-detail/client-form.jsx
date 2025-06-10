import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import DatePickerField from "../date-range-picker/date-picker-field"
import { AutoCompleteField } from "@/components/customs/auto-complete-field"
import SectionDivider from "@/components/customs/section-divider"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { extractList } from "@/utils/utils"
import { toTitleCase } from "@/utils/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components/ui"
import { SectionForm } from "../section-form"

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  phone: z.string().min(1, { message: "El teléfono es obligatorio" }),
  date_of_birth: z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.date({ required_error: "La fecha de nacimiento es obligatoria" })
  ),
  nationality: z.string().min(1, { message: "La nacionalidad es obligatoria" }),
  state: z.string().min(1, { message: "El estado es obligatorio" }),
  curp: z
    .string()
    .min(1, { message: "El CURP es obligatorio" })
    .regex(
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      "CURP inválido"
    ),
  passport: z.string().min(1, { message: "El pasaporte es obligatorio" }),
  job: z.string().min(1, { message: "La vacante es obligatoria" }),
  program: z.string().min(1, { message: "El programa es obligatorio" }),
  channel: z.string().min(1, { message: "El canal es obligatorio" }),
  comments: z.string().optional(),
})

export const ClientForm = () => {
  const { user } = useAuth()
  const role = user?.data?.role

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

  const { nationalities, mexicoStates, programs, channels } = useCodexData()

  const nationalitiesList = extractList(nationalities)
  const mexicoStatesList = extractList(mexicoStates)
  const programsList = extractList(programs)
  const channelsList = extractList(channels)

  const nacionalidad =
    nationalitiesList?.map((name) => ({
      label: toTitleCase(name),
      value: name,
    })) ?? []

  const estadosMexico =
    mexicoStatesList?.map((name) => ({
      label: toTitleCase(name),
      value: name,
    })) ?? []

  const programa =
    programsList?.map((name) => ({
      label: toTitleCase(name),
      value: name,
    })) ?? []

  const channelOptions =
    channelsList?.map((name) => ({
      label: toTitleCase(name),
      value: name,
    })) ?? []

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
      options: nacionalidad,
    },
    {
      name: "state",
      label: "Estado",
      type: "autocomplete",
      options: estadosMexico,
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
      options: programa,
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        </form>
      </Form>
    </FormProvider>
  )
}

export default ClientForm
