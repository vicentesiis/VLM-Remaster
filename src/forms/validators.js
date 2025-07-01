import { z } from "zod"

const normalizeToEmptyString = (schema, errorMsg) =>
  z.preprocess(
    (val) => (val === null || val === undefined ? "" : val),
    schema.min(1, { message: errorMsg })
  )

export const nameSchema = z.preprocess(
  (val) => (val === null || val === undefined ? "" : val),
  z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/,
      "El nombre no permite caracteres especiales, números o espacios en blanco al inicio o final"
    )
)

export const emailSchema = z.string().optional()

export const phoneSchema = normalizeToEmptyString(
  z.string().regex(/^\d{10}$/, "El teléfono debe tener exactamente 10 dígitos"),
  "El teléfono es obligatorio"
)

export const dateOfBirthSchema = z.preprocess(
  (val) => {
    if (typeof val === "string" || typeof val === "number") {
      const parsed = new Date(val)
      return isNaN(parsed) ? undefined : parsed
    }
    return val
  },
  z.date({ required_error: "La fecha de nacimiento es obligatoria" })
)

export const nationalitySchema = normalizeToEmptyString(
  z.string(),
  "La nacionalidad es obligatoria"
)

export const stateSchema = normalizeToEmptyString(
  z.string(),
  "El estado es obligatorio"
)

export const documentSchema = normalizeToEmptyString(
  z.string(),
  "El Documento es obligatorio"
)

export const documentTypeSchema = normalizeToEmptyString(
  z.string(),
  "El tipo de Documento es obligatorio"
)

export const jobSchema = z.string().optional()

export const programSchema = normalizeToEmptyString(
  z.string(),
  "El programa es obligatorio"
)

export const channelSchema = normalizeToEmptyString(
  z.string(),
  "El canal es obligatorio"
)

export const commentsSchema = z.string().optional()

export const amountSchema = z.preprocess(
  (val) => {
    const parsed = Number(val)
    return isNaN(parsed) ? undefined : parsed
  },
  z
    .number({ required_error: "El monto es obligatorio" })
    .min(500, { message: "El monto mínimo es $500" })
    .max(10000, { message: "El monto máximo es $10,000" })
)

export const paymentMethodSchema = normalizeToEmptyString(
  z.string(),
  "El método de pago es obligatorio"
)

export const usernameSchema = normalizeToEmptyString(
  z.string(),
  "El nombre de usuario es obligatorio"
)

export const passwordSchema = normalizeToEmptyString(
  z.string(),
  "La contraseña es obligatorio"
)

export const agentTypeSchema = normalizeToEmptyString(
  z.string(),
  "El tipo de agente es obligatorio"
)

export const groupNameSchema = normalizeToEmptyString(
  z.string(),
  "El nombre del grupo es obligatorio"
)
