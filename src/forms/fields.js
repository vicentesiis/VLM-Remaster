import { Banknote, CreditCard } from "lucide-react"

export const nameField = (config = {}) => ({
  name: "name",
  label: "Nombre Completo",
  type: "input",
  autoComplete: "off",
  placeholder: "Nombre completo",
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

export const passportField = (config = {}) => ({
  name: "passport",
  label: "Pasaporte",
  type: "input",
  autoComplete: "off",
  placeholder: "Ej. G20693408",
  ...config,
})

export const curpField = (config = {}) => ({
  name: "curp",
  label: "CURP",
  type: "input",
  autoComplete: "off",
  placeholder: "Ej. RASC050729MMCSHNA2",
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

export const ammountField = (config = {}) => ({
  name: "ammount",
  label: "Monto de la Órden",
  type: "currency",
  autoComplete: "off",
  placeholder: "Min $500 max $10,000",
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
