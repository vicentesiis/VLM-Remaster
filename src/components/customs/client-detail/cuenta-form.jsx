import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import ComboBox from "@/components/ui/combobox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  alias: z.string().min(1, "El alias de la cuenta es obligatorio"),
  identificador: z
    .string()
    .regex(/^\d+$/, "El identificador debe ser un número entero"),
  cuentaFuente: z.string().min(1, "La cuenta fuente es obligatoria"),
  cuentaDestino: z.string().min(1, "La cuenta destino es obligatoria"),
  proveedor: z.string().min(1, "El proveedor es obligatorio"),
  apiKey: z.string().min(1, "La API Key es obligatoria"),
})

const proveedores = [
  { value: "conekta", label: "Conekta" },
  { value: "femsa", label: "FEMSA" },
  { value: "stripe", label: "Stripe" },
]

export const CuentaForm = ({ open, onClose }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: "",
      identificador: "",
      cuentaFuente: "",
      cuentaDestino: "",
      proveedor: "",
      apiKey: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data)
    onClose()
  }

  return (
    <Dialog modal={false} open={open} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Formulario de Cuenta</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid-cols-1 gap-4 md:grid-cols-1">
              <FormField
                control={form.control}
                name="alias"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Alias de cuenta</FormLabel>
                    <FormControl>
                      <Input placeholder="usuario123" className="border border-primary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identificador"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Identificador Único</FormLabel>
                    <FormControl>
                      <Input type="int" placeholder="Ej. 1234"className="border border-primary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuentaFuente"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Cuenta Fuente</FormLabel>
                    <FormControl>
                      <Input placeholder="Cuenta fuente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuentaDestino"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Cuenta Destino</FormLabel>
                    <FormControl>
                      <Input placeholder="Cuenta destino" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proveedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Proveedor</FormLabel>
                    <div className="relative flex w-full flex-col ">
                      <FormControl>
                        <ComboBox
                          {...field}
                          options={proveedores}
                          placeholder="Selecciona un proveedor"
                          disabled ={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>API Key de la Cuenta</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu API Key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CuentaForm
