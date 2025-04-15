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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ComboBox from "@/components/ui/combobox"
import { Label } from "@/components/ui/label"
import FormFieldTooltip from "../form-field-tooltip"

const formSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  fullName: z.string().min(1, "El nombre completo es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.string().min(1, "El rol es obligatorio"),
  tipo: z.string().min(1, { message: "El trámite es obligatorio" }),
  grupo: z.string().min(1, { message: "El grupo es obligatorio" }),

  supervisor: z.string().min(1, { message: "El supervisor es obligatorio" }),
  compensacion: z
    .string()
    .regex(/^\d+$/, "La compensación solo puede ser un número"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
})

export const UserForm = ({ open, onClose }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullName: "",
      password: "",
      role: "",
      tipo: "",
      grupo: "",
      supervisor: "",
      compensacion: "",
      phone: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data)
    onClose()
  }
  const tipos = [
    { value: "no_aplica", label: "No Aplica" },
    { value: "callcenter", label: "CallCenter" },
    { value: "remoto", label: "Remoto" },
    { value: "referidos", label: "Referidos" },
    { value: "sistema", label: "Sistema" },
    { value: "supervisor", label: "Supervisor" },
    { value: "webform", label: "WebForm" },
    { value: "bot", label: "Bot" },
    { value: "consultor", label: "Consultor" },
  ]
  const grupo = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
  ]
  const supervisores = [
    { value: "no_aplica", label: "No Aplica" },
    { value: "agentepr", label: "Agentepr - Agente DOS Modificado" },
  ]
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w2xl max-h-[100h] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Formulario de Usuario</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input placeholder="Tu nombre de usuario" {...field} />
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Nombre completo</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input placeholder="Tu nombre completo" {...field} />
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Contraseña</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Rol</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="space-y-4"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="administrador" id="r1" />
                            <Label
                              htmlFor="r1"
                              className="font-bold text-black/60"
                            >
                              Administrador
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="agente" id="r2" />
                            <Label
                              htmlFor="r2"
                              className="font-bold text-black/60"
                            >
                              Agente
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="sistema" id="r3" />
                            <Label
                              htmlFor="r3"
                              className="font-bold text-black/60"
                            >
                              Sistema
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipo"
                render={({ field, fieldState }) => (
                  <FormItem >
                    <FormLabel>Tipo</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                    <div className="relative w-full flex flex-col">

                      <FormControl>
                        <ComboBox
                          {...field}
                          options={tipos}
                          placeholder="Trámite"
                          variant="form"
                        />
                      </FormControl>
                      </div>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grupo"
                render={({ field, fieldState }) => (
                  <FormItem className>
                    <FormLabel>Grupo</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                    <div className="relative w-full flex flex-col">

                      <FormControl>
                        <ComboBox
                          options={grupo}
                          {...field}
                          placeholder="Selecciona un grupo"
                        />
                      </FormControl>
                      </div>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supervisor"
                render={({ field, fieldState }) => (
                  <FormItem className="relative flex flex-col">
                    <FormLabel>Supervisor</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                    <div className="relative w-full flex flex-col">

                      <FormControl>
                        <ComboBox
                          options={supervisores}
                          {...field}
                          placeholder="Selecciona un supervisor"
                        />
                      </FormControl>
                      </div>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compensacion"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Compensación</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input
                          placeholder="Cantidad mensual SIN Centavos ni Símbolos"
                          {...field}
                        />
                      </FormControl>
                    </FormFieldTooltip>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel>Teléfono</FormLabel>
                    <FormFieldTooltip fieldState={fieldState}>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Tu teléfono"
                          {...field}
                        />
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

export default UserForm
