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
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import ComboBox from "@/components/ui/combobox"
import FormFieldTooltip from "../form-field-tooltip"

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

export const AccountForm = ({ open, onClose }) => {
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Formulario de Cuenta</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="  grid-cols-1 gap-4 md:grid-cols-1">
              <FormField
                control={form.control}
                name="alias"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Alias de cuenta</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input placeholder="usuario123" {...field} />
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identificador"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Identificador Único</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input type="int" placeholder="Ej. 1234" {...field} />
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuentaFuente"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Cuenta Fuente</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input placeholder="Cuenta fuente" {...field} />
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuentaDestino"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Cuenta Destino</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input placeholder="Cuenta destino" {...field} />
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proveedor"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Proveedor</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <div className="relative flex w-full flex-col">
                        <FormControl>
                          <ComboBox
                            {...field}
                            id={field.name}
                            options={proveedores}
                            placeholder="Selecciona un proveedor"
                          />
                        </FormControl>
                      </div>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apiKey"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>API Key de la Cuenta</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input placeholder="Tu API Key" {...field} />
                      </FormControl>
                    </FormFieldTooltip>
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

export default AccountForm
