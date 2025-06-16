import { z } from "zod"

const normalizeToEmptyString = (schema, errorMsg) =>
  z.preprocess(
    (val) => (val === null || val === undefined ? "" : val),
    schema.min(1, { message: errorMsg })
  )

export const nameSchema = normalizeToEmptyString(
  z.string(),
  "El nombre es obligatorio"
)

export const emailSchema = z.preprocess(
  (val) => (val === null || val === undefined ? "" : val),
  z.string().email({ message: "Correo electrónico inválido" })
)

export const phoneSchema = normalizeToEmptyString(
  z.string(),
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

export const curpSchema = z.preprocess(
  (val) => (val === null || val === undefined ? "" : val),
  z
    .string()
    .min(1, { message: "El CURP es obligatorio" })
    .regex(
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      "CURP inválido"
    )
)

export const passportSchema = normalizeToEmptyString(
  z.string(),
  "El pasaporte es obligatorio"
)

export const jobSchema = normalizeToEmptyString(
  z.string(),
  "La vacante es obligatoria"
)

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
