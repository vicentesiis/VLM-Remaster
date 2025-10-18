import {
  Contact,
  Target,
  UserCheck,
} from "lucide-react"

// WhatsApp message template for registros
export const WHATSAPP_MESSAGE_TEMPLATE =
  "Hola buen día {NOMBRE_REGISTRO} le saluda {NOMBRE_AGENTE} de AsesoriaLaboralMigratoria.com le escribo porque se registro con nosotros a través de {CANAL} y le interesa laborar en el extranjero. Le comparto su folio de registro: {ID_REGISTRO} le proporcionare mas información sobre nuestros servicios y algunas vacantes que tenemos disponibles para usted."

// Country mapping for flags
export const COUNTRY_FLAG_MAP = {
  "argentina": "AR",
  "belice": "BZ",
  "bolivia": "BO",
  "brasil": "BR",
  "chile": "CL",
  "colombia": "CO",
  "costa rica": "CR",
  "república dominicana": "DO",
  "ecuador": "EC",
  "el salvador": "SV",
  "guatemala": "GT",
  "honduras": "HN",
  "méxico": "MX",
  "nicaragua": "NI",
  "panamá": "PA",
  "paraguay": "PY",
  "perú": "PE",
  "uruguay": "UY",
  "venezuela": "VE"
}

// Record type configuration for badges and UI
export const RECORD_TYPE_CONFIG = {
  lead: { icon: Contact, variant: 'warning' },
  prospect: { icon: Target, variant: 'success' },
  default: { icon: UserCheck, variant: 'outline' }
}

// Helper function to get record type config
export const getRecordTypeConfig = (recordType) => {
  const typeLower = recordType?.toLowerCase()
  return RECORD_TYPE_CONFIG[typeLower] || RECORD_TYPE_CONFIG.default
}