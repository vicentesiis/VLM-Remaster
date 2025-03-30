"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form" // Import FormProvider here
import { z } from "zod"
import { H3 } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"

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
import DatePickerField from "../date-range-picker/date-picker-field"

// Define the schema with zod validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Dirección de correo electrónico inválida" }),
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  fechaNacimiento: z.date({
    required_error: "La fecha de nacimiento es obligatoria",
  }),
  telefono: z
    .string()
    .min(1, { message: "El número de teléfono es obligatorio" }),
  nacionalidad: z
    .string()
    .min(1, { message: "La nacionalidad es obligatoria" }),
  estado: z.string().min(1, { message: "El estado es obligatorio" }),
  curp: z.string().min(1, { message: "La CURP es obligatoria" }),
  documentoDelCliente: z
    .string()
    .min(1, { message: "El documento es obligatorio" }),
  fechadeDeportacion: z
    .string()
    .min(1, { message: "La fecha de deportación es obligatoria" }),
  tramite: z.string().min(1, { message: "El trámite es obligatorio" }),
  vacante: z.string().min(1, { message: "La vacante es obligatoria" }),
  destino: z.string().min(1, { message: "El destino es obligatorio" }),
  periodo: z.string().min(1, { message: "El periodo es obligatorio" }),
  estatus: z.string().min(1, { message: "El estatus es obligatorio" }),
  salida: z.string().min(1, { message: "La salida es obligatoria" }),
  comentarios: z
    .string()
    .min(1, { message: "Los comentarios son obligatorios" }),
  servicio: z.string().min(1, { message: "El servicio es obligatorio" }),
})

export function ClientForm() {
  // Setup form with validation
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
      fechadeDeportacion: "",
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

  // Submit function
  const onSubmit = (data) => {
    console.log(data)
  }

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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Fecha de Nacimiento Field */}
            <FormField
              control={form.control}
              name="fechaNacimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <FormControl>
                    <DatePickerField
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
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
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefono Field */}
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Telefono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nacionalidad Field */}
            <FormField
              control={form.control}
              name="nacionalidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nacionalidad</FormLabel>
                  <FormControl>
                    <Input placeholder="Nacionalidad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado Field */}
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Documento del Cliente Field */}
            <FormField
              control={form.control}
              name="documentoDelCliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento del Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Documento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha de Deportacion Field */}
            <FormField
              control={form.control}
              name="fechadeDeportacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Deportacion</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tramite</FormLabel>
                  <FormControl>
                    <Input placeholder="Tramite" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vacante Field */}
            <FormField
              control={form.control}
              name="vacante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vacante</FormLabel>
                  <FormControl>
                    <Input placeholder="Vacante" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Destino Field */}
            <FormField
              control={form.control}
              name="destino"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destino</FormLabel>
                  <FormControl>
                    <Input placeholder="Destino" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Periodo Field */}
            <FormField
              control={form.control}
              name="periodo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Periodo</FormLabel>
                  <FormControl>
                    <Input placeholder="Periodo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estatus Field */}
            <FormField
              control={form.control}
              name="estatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estatus</FormLabel>
                  <FormControl>
                    <Input placeholder="Estatus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salida Field */}
            <FormField
              control={form.control}
              name="salida"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salida</FormLabel>
                  <FormControl>
                    <Input placeholder="Salida" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Comentarios Field */}
            <FormField
              control={form.control}
              name="comentarios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentarios</FormLabel>
                  <FormControl>
                    <Input placeholder="Comentarios" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Servicio Field */}
            <FormField
              control={form.control}
              name="servicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl>
                    <Input placeholder="Servicio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </FormProvider>
  )
}

export default ClientForm
