import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import DatePickerField from "../date-range-picker/date-picker-field"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import ComboBox from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { H3 } from "@/components/ui/typography"
import FormFieldTooltip from "../form-field-tooltip"

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico inválida" }),
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  fechaNacimiento: z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.date({ required_error: "La fecha de nacimiento es obligatoria" })
  ),
  telefono: z.string().min(1, { message: "El teléfono es obligatorio" }),
  nacionalidad: z
    .string()
    .min(1, { message: "La nacionalidad es obligatoria" }),

  estado: z.string().min(1, { message: "El estado es obligatorio" }),
  curp: z
    .string()
    .min(1, { message: "El CURP es obligatoria" })
    .regex(
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      "CURP inválida"
    ),
  fechadeDeportacion: z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.date({ required_error: "La fecha de deportación es obligatoria" })
  ),
  salida: z.preprocess(
    (val) => (val === "" || val === null ? undefined : val),
    z.date({ required_error: "La fecha de salida es obligatoria" })
  ),
  tramite: z.string().min(1, { message: "El trámite es obligatorio" }),
  vacante: z.string().min(1, { message: "La vacante es obligatoria" }),
  destino: z.string().min(1, { message: "El destino es obligatorio" }),
  periodo: z.string().min(1, { message: "El periodo es obligatorio" }),
  estatus: z.string().min(1, { message: "El estatus es obligatorio" }),
  servicio: z.string().min(1, { message: "El servicio es obligatorio" }),
})

export const ClientForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      nombre: "",
      fechaNacimiento: null,
      telefono: "",
      nacionalidad: "",
      estado: "",
      curp: "",
      documentoDelCliente: "",
      fechadeDeportacion: null,
      tramite: "",
      vacante: "",
      destino: "",
      periodo: "",
      estatus: "",
      salida: "",
      comentarios: "",
      servicio: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const comboBoxStatus = [
    { value: "Creado", label: "Creado" },
    { value: "Importado", label: "Importado" },
    { value: "Aprovado", label: "Aprovado" },
    { value: "Pendiente", label: "Pendiente" },
  ]
  const servicio = [
    { value: "al cliente", label: "al cliente" },
    { value: "al hogar", label: "al hogar" },
    { value: "cerrado", label: "cerrado" },
  ]
  const nacionalidad = [
    { value: "Mèxicano", label: "Mèxicano" },
    { value: "Estado unidense", label: "Estado unidense" },
    { value: "Canadiense", label: "Canadiense" },
  ]
  const tramite = [
    { value: "Visa Laboral", label: "Visa Laboral" },
    { value: "Visa Laboral + Pasaporte", label: "Visa Laboral + Pasaporte" },
    { value: "Pèrdon Migratorio", label: "Pèrdon Migratorio" },
  ]
  const opcionesVacante = [
    { value: "no_aplica", label: "No aplica" },
    { value: "b_usa", label: "B-USA" },
    { value: "p_usa", label: "P-USA" },
    { value: "d_canada", label: "D-CANADA" },
    { value: "q_canada", label: "Q-CANADA" },
  ]
  const destino = [
    { value: "USA", label: "USA" },
    { value: "CANADA", label: "CANADA" },
  ]
  const opcionesPeriodo = [
    { value: "3", label: "3 Meses" },
    { value: "4", label: "4 Meses" },
    { value: "6", label: "6 Meses" },
    { value: "8", label: "8 Meses" },
    { value: "12", label: "12 Meses" },
    { value: "18", label: "18 Meses" },
    { value: "24", label: "24 Meses" },
    { value: "30", label: "30 Meses" },
    { value: "36", label: "36 Meses" },
  ]
  const status = [
    { value: "creado", label: "Creado" },
    { value: "importado", label: "Importado" },
    { value: "informacion_pendiente", label: "Información Pendiente" },
    { value: "generar_referencia", label: "Generar Referencia" },
    { value: "generar_contrato", label: "Generar Contrato" },
    { value: "contrato_generado", label: "Contrato Generado" },
    { value: "corregir_contrato", label: "Corregir Contrato" },
    { value: "primer_aviso", label: "Primer Aviso" },
    { value: "pendiente_aprobacion", label: "Pendiente de Aprobación" },
    { value: "aprobado", label: "Aprobado" },
    { value: "eligiendo_fecha", label: "Eligiendo Fecha de Salida" },
    { value: "con_fecha", label: "Con Fecha de Salida" },
    { value: "fecha_confirmada", label: "Fecha de Salida Confirmada" },
    { value: "finalizo", label: "Finalizó" },
    { value: "inactivo_temporal", label: "Temporalmente Inactivo" },
  ]
  const estadosMexico = [
    { value: "Aguascalientes", label: "Aguascalientes" },
    { value: "Baja California", label: "Baja California" },
    { value: "Baja California Sur", label: "Baja California Sur" },
    { value: "Campeche", label: "Campeche" },
    { value: "Chihuahua", label: "Chihuahua" },
    { value: "Coahuila", label: "Coahuila" },
    { value: "Colima", label: "Colima" },
    { value: "Durango", label: "Durango" },
    { value: "Guanajuato", label: "Guanajuato" },
    { value: "Guerrero", label: "Guerrero" },
    { value: "Hidalgo", label: "Hidalgo" },
    { value: "Jalisco", label: "Jalisco" },
    { value: "Mexico", label: "México" },
    { value: "Michoacán", label: "Michoacán" },
    { value: "Morelos", label: "Morelos" },
    { value: "Nayarit", label: "Nayarit" },
    { value: "Nuevo León", label: "Nuevo León" },
    { value: "Oaxaca", label: "Oaxaca" },
    { value: "Puebla", label: "Puebla" },
    { value: "Querétaro", label: "Querétaro" },
    { value: "Quintana Roo", label: "Quintana Roo" },
    { value: "San Luis Potosí", label: "San Luis Potosí" },
    { value: "Sinaloa", label: "Sinaloa" },
    { value: "Sonora", label: "Sonora" },
    { value: "Tabasco", label: "Tabasco" },
    { value: "Tamaulipas", label: "Tamaulipas" },
    { value: "Tlaxcala", label: "Tlaxcala" },
    { value: "Veracruz", label: "Veracruz" },
    { value: "Yucatán", label: "Yucatán" },
    { value: "Zacatecas", label: "Zacatecas" },
  ]

  return (
    <FormProvider {...form}>
      {/* Client Information Section */}
      <div className="mb-4 space-y-4">
        <H3>Datos del Cliente</H3>
        <Separator />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Nombre Field */}
            <FormField
              control={form.control}
              name="nombre"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Fecha de Nacimiento Field */}
            <FormField
              control={form.control}
              name="fechaNacimiento"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
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
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <FormControl>
                      <Input placeholder="Ingrese su Email" {...field} />
                    </FormControl>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Telefono Field */}
            <FormField
              control={form.control}
              name="telefono"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Telefono"
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
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Nacionalidad Field */}
            <FormField
              control={form.control}
              name="nacionalidad"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nacionalidad</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={nacionalidad}
                          placeholder="Nacionalidad"
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Estado Field */}
            <FormField
              control={form.control}
              name="estado"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Estado</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={estadosMexico}
                          placeholder="Selecciona un estado"
                          variant="form"
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Documento del Cliente Field */}
            <FormField
              control={form.control}
              name="documentoDelCliente"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Documento del Cliente</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <FormControl>
                      <Input placeholder="Documento" {...field} />
                    </FormControl>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Fecha de Deportacion Field */}
            <FormField
              control={form.control}
              name="fechadeDeportacion"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Fecha de Deportacion</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
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
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* CURP Field */}
            <FormField
              control={form.control}
              name="curp"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>CURP</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <FormControl>
                      <Input placeholder="CURP" {...field} />
                    </FormControl>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Process Status Section */}
          <div className="mt-8 space-y-4">
            <H3>Información del Proceso</H3>
            <Separator />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Tramite Field */}
            <FormField
              control={form.control}
              name="tramite"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Tramite</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={tramite}
                          placeholder="Tramite"
                          variant="form"
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Vacante Field */}
            <FormField
              control={form.control}
              name="vacante"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Vacante</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={opcionesVacante}
                          placeholder="Selecciona una vacante"
                          variant="form"
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Destino Field */}
            <FormField
              control={form.control}
              name="destino"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Destino</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={destino}
                          placeholder="Destino"
                          variant="form"
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Periodo Field */}
            <FormField
              control={form.control}
              name="periodo"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Periodo</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={opcionesPeriodo}
                          placeholder="Periodo"
                          variant="form"
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estatus Field */}
            <FormField
              control={form.control}
              name="estatus"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Estatus</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={status}
                          placeholder="Selecciona un Estatus"
                          variant="form"
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salida Field */}
            <FormField
              control={form.control}
              name="salida"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Salida</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="w-full">
                      <FormControl>
                        <DatePickerField
                          value={field.value}
                          onChange={(date) => {
                            field.onChange(date)
                          }}
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Servicio Field */}
            <FormField
              control={form.control}
              name="servicio"
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Servicio</FormLabel>
                  <FormFieldTooltip fieldState={fieldState} position="bottom">
                    <div className="flex w-full flex-col">
                      <FormControl></FormControl>
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={servicio}
                          placeholder="Servicio"
                          variant="form"
                        />
                      </FormControl>
                    </div>
                  </FormFieldTooltip>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Comentarios Field */}
          <FormField
            control={form.control}
            name="comentarios"
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
