import { z } from "zod"

const normalizeToEmptyString = (schema, errorMsg) =>
  z.preprocess(
    (val) => (val === null || val === undefined ? "" : val),
    schema.min(1, { message: errorMsg })
  )

export const skipIfEmpty = (schema) =>
  z.preprocess(
    (val) =>
      val === null || val === undefined || val === "" ? undefined : val,
    schema.optional()
  )

export const nameSchema = z.preprocess(
  (val) => (val === null || val === undefined ? "" : val),
  z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre debe tener menos de 50 caracteres" })
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/,
      "El nombre no permite caracteres especiales, números o espacios en blanco al inicio o final"
    )
)

export const emailSchema = skipIfEmpty(
  z.string().email("Correo inválido").optional()
)

export const phoneSchema = normalizeToEmptyString(
  z
    .string()
    .regex(/^\d{8,10}$/, "El teléfono debe tener entre 8 y 10 dígitos"),
  "El teléfono es obligatorio"
);

export const dateOfBirthSchema = z.preprocess(
  (val) => {
    if (typeof val === "string" || typeof val === "number") {
      const parsed = new Date(val)
      return Number.isNaN(parsed.getTime()) ? undefined : parsed
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
  z
    .string()
    .max(20, { message: "El documento debe de tener menos de 20 caracteres" })
    .regex(/^\S+$/, "El documento no puede contener espacios en blanco"),
  "El Documento es obligatorio"
)

export const documentTypeSchema = normalizeToEmptyString(
  z.string(),
  "El tipo de Documento es obligatorio"
)

export const exitDateTypeSchema = z.preprocess(
  (val) => {
    if (val === null || val === undefined || val === "") {
      return undefined
    }
    if (typeof val === "string" || typeof val === "number") {
      const parsed = new Date(val)
      return Number.isNaN(parsed.getTime()) ? undefined : parsed
    }
    return val
  },
  z.date().optional()
)

export const jobSchema = skipIfEmpty(
  z
    .string()
    .regex(/^\S+$/, "El ID de la Vacante no puede contener espacios en blanco")
    .optional()
)

export const programSchema = normalizeToEmptyString(
  z.string(),
  "El programa es obligatorio"
)

export const channelSchema = normalizeToEmptyString(
  z.string(),
  "El canal es obligatorio"
)

export const commentsSchema = skipIfEmpty(
  z
    .string()
    .max(250, {
      message: "El comentario debe de tener menos de 250 caracteres",
    })
    .optional()
)

// Country-specific amount validation schemas
export const amountSchemaByCountry = {
  méxico: z.preprocess(
    (val) => {
      const parsed = Number(val)
      return Number.isNaN(parsed) ? undefined : parsed
    },
    z
      .number({ required_error: "El monto es obligatorio" })
      .min(500, { message: "El monto mínimo es $500" })
      .max(10000, { message: "El monto máximo es $10,000" })
  ),
  colombia: z.preprocess(
    (val) => {
      const parsed = Number(val)
      return Number.isNaN(parsed) ? undefined : parsed
    },
    z
      .number({ required_error: "El monto es obligatorio" })
      .min(95000, { message: "El monto mínimo es $95,000 COP" })
      .max(2000000, { message: "El monto máximo es $2,000,000 COP" })
  ),
  guatemala: z.preprocess(
    (val) => {
      const parsed = Number(val)
      return Number.isNaN(parsed) ? undefined : parsed
    },
    z
      .number({ required_error: "El monto es obligatorio" })
      .min(190, { message: "El monto mínimo es Q190 GTQ" })
      .max(4000, { message: "El monto máximo es Q4,000 GTQ" })
  ),
}

// Default amount schema (for backward compatibility)
export const amountSchema = amountSchemaByCountry.méxico

export const paymentMethodSchema = normalizeToEmptyString(
  z.string(),
  "El método de pago es obligatorio"
)

export const countrySchema = normalizeToEmptyString(
  z.string(),
  "El país es obligatorio"
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

export const creditSchema = z
  .preprocess(
    (val) => {
      const parsed = Number(val)
      return Number.isNaN(parsed) ? undefined : parsed
    },
    z
      .number({ required_error: "El monto es obligatorio" })
      .min(0, { message: "El monto mínimo es $0 USD" })
      .max(500, { message: "El monto máximo es $500 USD" })
  )
  .optional()
