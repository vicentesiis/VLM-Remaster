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

  const { nationalities, mexicoStates, programs, channels } = useCodexData(
    role,
    { enabled: true }
  )

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

  return (
    <FormProvider {...form}>
      {/* Client Information Section */}
      <div className="mb-6">
        <SectionDivider title="Datos del Registro" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Nombre Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre Completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha de Nacimiento Field */}
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <DatePickerField
                        value={field.value}
                        onChange={field.onChange}
                        showYearDropdown
                        scrollableYearDropdown
                        dateFormat="dd/MM/yyyy"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese su Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefono Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Teléfono"
                      maxLength={10}
                      {...field}
                      onKeyDown={(e) => {
                        const isNumber = /^[0-9]$/.test(e.key)
                        const allowed = [
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                        ]
                        if (!isNumber && !allowed.includes(e.key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationality"
              render={() => (
                <AutoCompleteField
                  name="nationality"
                  label="Nacionalidad"
                  control={form.control}
                  options={nacionalidad}
                />
              )}
            />

            {/* Estado Field */}
            <FormField
              control={form.control}
              name="state"
              render={() => (
                <AutoCompleteField
                  name="state"
                  label="Estado"
                  control={form.control}
                  options={estadosMexico}
                />
              )}
            />

            {/* Pasaporte Field */}
            <FormField
              control={form.control}
              name="passport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pasaporte</FormLabel>
                  <FormControl>
                    <Input placeholder="Pasaporte" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CURP Field */}
            <FormField
              control={form.control}
              name="curp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CURP</FormLabel>
                  <FormControl>
                    <Input placeholder="CURP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Información del Proceso */}
          <SectionDivider title="Información del Proceso" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Programa Field */}
            <FormField
              control={form.control}
              name="program"
              render={() => (
                <AutoCompleteField
                  name="program"
                  label="Programa"
                  control={form.control}
                  options={programa}
                />
              )}
            />

            {/* Vacante Field */}
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID de la Vacante</FormLabel>
                  <FormControl>
                    <Input placeholder="ID de la Vacante" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Canal Field */}
            <FormField
              control={form.control}
              name="channel"
              render={() => (
                <AutoCompleteField
                  name="channel"
                  label="Canal de Captación"
                  control={form.control}
                  options={channelOptions}
                />
              )}
            />
          </div>

          {/* Comentarios Field */}
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Comentarios"
                    {...field}
                    rows={4}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit">Actualizar</Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}

export default ClientForm
