import { Banknote, CreditCard } from "lucide-react"
import { toTitleCase } from "@/utils"

export const nameField = (config = {}) => ({
  name: "name",
  label: "Nombre Completo",
  type: "input",
  autoComplete: "off",
  placeholder: "Nombre completo",
  transform: (val) => toTitleCase(val),
  ...config,
})

export const emailField = (config = {}) => ({
  name: "email",
  label: "Email",
  type: "input",
  autoComplete: "off",
  placeholder: "ejemplo@correo.com",
  ...config,
})

export const phoneField = (config = {}) => ({
  name: "phone",
  label: "Teléfono",
  type: "numeric",
  autoComplete: "off",
  maxLength: 10,
  placeholder: "Número de teléfono (10 dígitos)",
  ...config,
})

export const dateOfBirthField = (config = {}) => ({
  name: "date_of_birth",
  label: "Fecha de Nacimiento",
  type: "date",
  placeholder: "Selecciona la fecha de nacimiento",
  ...config,
})

export const nationalityField = (options, config = {}) => ({
  name: "nationality",
  label: "Nacionalidad",
  type: "autocomplete",
  options,
  placeholder: "Selecciona una nacionalidad",
  ...config,
})

export const stateField = (options, config = {}) => ({
  name: "state",
  label: "Estado",
  type: "autocomplete",
  options,
  placeholder: "Selecciona un estado",
  ...config,
})

export const documentField = (config = {}) => ({
  name: "document",
  label: "Documento",
  type: "input",
  autoComplete: "off",
  placeholder: "Pasaporte / CURP",
  transform: (val) => val.toUpperCase(),
  className: "uppercase",
  ...config,
})

export const documentTypeField = (options, config = {}) => ({
  name: "document_type",
  label: "Tipo de Documento",
  type: "radio",
  options,
  placeholder: "Selecciona el tipo de Documento",
  ...config,
})

export const jobField = (config = {}) => ({
  name: "job",
  label: "ID de la Vacante",
  type: "input",
  autoComplete: "off",
  placeholder: "Ingresa el ID de la vacante",
  ...config,
})

export const programField = (options, config = {}) => ({
  name: "program",
  label: "Programa",
  type: "autocomplete",
  options,
  placeholder: "Selecciona el programa",
  ...config,
})

export const channelField = (options, config = {}) => ({
  name: "channel",
  label: "Canal de Captación",
  type: "autocomplete",
  options,
  placeholder: "Selecciona el canal de captación",
  ...config,
})

export const commentsField = (config = {}) => ({
  name: "comments",
  label: "Comentarios",
  type: "textarea",
  placeholder: "Comentarios...",
  ...config,
})

export const amountField = (config = {}) => ({
  name: "order_amount",
  label: "Monto de la Órden",
  type: "currency",
  placeholder: "Min $500 - Max $10,000",
  maxLength: 7,
  ...config,
})

export const paymentMethodField = (config = {}) => ({
  name: "payment_method",
  label: "Método de Pago",
  type: "radioCard",
  options: [
    {
      label: "Efectivo",
      value: "cash",
      icon: Banknote,
    },
    {
      label: "SPEI",
      value: "spei",
      icon: CreditCard,
    },
  ],
  ...config,
})

export const usernameField = (config = {}) => ({
  name: "username",
  label: "Nombre de Usuario",
  type: "input",
  autoComplete: "off",
  placeholder: "Nombre de Usuario",
  ...config,
})

export const passwordField = (config = {}) => ({
  name: "password",
  label: "Contraseña",
  type: "input",
  placeholder: "Mínimo 8 caracteres",
  autoComplete: "off",

  ...config,
})

export const agentTypeField = (options, config = {}) => ({
  name: "agent_type",
  label: "Tipo de Agente",
  type: "radio",
  options,
  placeholder: "Selecciona el tipo de Agente",
  ...config,
})

export const activeField = (config = {}) => ({
  name: "active",
  label: "¿Usuario Activo?",
  type: "switch",
  ...config,
})

export const groupNameField = (config = {}) => ({
  name: "name",
  label: "Nombre del Grupo",
  type: "input",
  autoComplete: "off",
  placeholder: "Nombre del Grupo",
  ...config,
})
