import { z } from "zod"

export const nameSchema = z
  .string()
  .min(1, { message: "El nombre es obligatorio" })
export const emailSchema = z
  .string()
  .email({ message: "Correo electrónico inválido" })
export const phoneSchema = z
  .string()
  .min(1, { message: "El teléfono es obligatorio" })

export const dateOfBirthSchema = z.preprocess(
  (val) => (val === "" || val === null ? undefined : val),
  z.date({ required_error: "La fecha de nacimiento es obligatoria" })
)

export const nationalitySchema = z
  .string()
  .min(1, { message: "La nacionalidad es obligatoria" })

export const stateSchema = z
  .string()
  .min(1, { message: "El estado es obligatorio" })

export const curpSchema = z
  .string()
  .min(1, { message: "El CURP es obligatorio" })
  .regex(
    /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
    "CURP inválido"
  )

export const passportSchema = z
  .string()
  .min(1, { message: "El pasaporte es obligatorio" })

export const jobSchema = z
  .string()
  .min(1, { message: "La vacante es obligatoria" })

export const programSchema = z
  .string()
  .min(1, { message: "El programa es obligatorio" })

export const channelSchema = z
  .string()
  .min(1, { message: "El canal es obligatorio" })

export const commentsSchema = z.string().optional()
