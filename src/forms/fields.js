import { MX, CO, GT } from "country-flag-icons/react/3x2"
import OxxoPayIcon from "@/assets/oxxo-pay.svg?react"
import PayCashIcon from "@/assets/pay-cash.svg?react"
import SPEIIcon from "@/assets/spei_icon.svg?react"
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
  disableRange: "future",
  ...config,
})

export const exitDate = (config = {}) => ({
  name: "exit_date",
  label: "Fecha de Salida",
  type: "date",
  placeholder: "Selecciona la fecha de salida",
  disableRange: "past",
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
  label: "Estado de Residencia",
  type: "autocomplete",
  options,
  placeholder: "Selecciona un estado",
  ...config,
})

export const documentField = (config = {}) => ({
  name: "document",
  label: "Documento de Identidad",
  type: "input",
  autoComplete: "off",
  placeholder: "Pasaporte / Documento de Identidad",
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

export const amountField = (country, config = {}) => {
  const currencyConfig = {
    méxico: {
      label: "Monto de la Órden (MXN)",
      symbol: "$",
      placeholder: "Min $500 - Max $10,000"
    },
    colombia: {
      label: "Monto de la Órden (COP)",
      symbol: "$",
      placeholder: "Min $95,000 - Max $2,000,000"
    },
    guatemala: {
      label: "Monto de la Órden (GTQ)",
      symbol: "Q",
      placeholder: "Min Q190 - Max Q4,000"
    }
  }

  const selectedConfig = currencyConfig[country] || currencyConfig.méxico

  return {
    name: "order_amount_local",
    label: selectedConfig.label,
    type: "currency",
    placeholder: selectedConfig.placeholder,
    currencySymbol: selectedConfig.symbol,
    ...config,
  }
}

export const countryField = (config = {}) => ({
  name: "country",
  label: "País",
  type: "radioCard",
  options: [
    {
      label: "México",
      value: "méxico",
      icon: MX,
    },
    {
      label: "Colombia",
      value: "colombia",
      icon: CO,
    },
    {
      label: "Guatemala",
      value: "guatemala",
      icon: GT,
    },
  ],
  ...config,
})

// Country-specific payment method options
const paymentMethodsByCountry = {
  méxico: [
    {
      label: "Oxxo Pay",
      value: "cash",
      icon: OxxoPayIcon,
      size: "w-20 h-10",
    },
    {
      label: "SPEI",
      value: "spei",
      icon: SPEIIcon,
      size: "w-12 h-12",
    },
    {
      label: "PayCash",
      value: "bank",
      icon: PayCashIcon,
      size: "w-20 h-12",
    },
  ],
  colombia: [
    {
      label: "PayCash",
      value: "bank",
      icon: PayCashIcon,
      size: "w-20 h-12",
    },
  ],
  guatemala: [
    {
      label: "PayCash",
      value: "bank",
      icon: PayCashIcon,
      size: "w-20 h-12",
    },
  ],
}

export const paymentMethodField = (country, config = {}) => ({
  name: "payment_method",
  label: "Método de Pago",
  type: "radioCard",
  options: country ? paymentMethodsByCountry[country] || [] : [],
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

export const creditField = (config = {}) => ({
  name: "credit",
  label: "Cantidad a tomar a cuenta (USD)",
  type: "currency",
  placeholder: "Min $0 USD - Max $500 USD",
  maxLength: 5,
  ...config,
})
