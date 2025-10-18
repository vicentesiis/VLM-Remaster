import { WHATSAPP_MESSAGE_TEMPLATE } from "@/constants"
import { toTitleCase } from "./utils"

/**
 * Formats phone number for WhatsApp (adds country code if needed)
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const phoneNumber = phone?.replace(/\D/g, "")
  return phoneNumber?.length === 10 ? `52${phoneNumber}` : phoneNumber
}

/**
 * Creates WhatsApp message using template and registro data
 * @param {Object} registro - Registro object with name, user, channel, public_id, id
 * @returns {string} Formatted WhatsApp message
 */
export const createWhatsAppMessage = (registro) => {
  const nombreRegistro = toTitleCase(registro?.name || "")
  const nombreAgente = toTitleCase(registro?.user?.name || "Agente")
  const canal = toTitleCase(registro?.channel || "nuestro sitio web")
  const idRegistro = registro?.public_id || registro?.id || ""

  return WHATSAPP_MESSAGE_TEMPLATE.replace("{NOMBRE_REGISTRO}", nombreRegistro)
    .replace("{NOMBRE_AGENTE}", nombreAgente)
    .replace("{CANAL}", canal)
    .replace("{ID_REGISTRO}", idRegistro)
}

/**
 * Creates tracking URL for registro
 * @param {Object} registro - Registro object with public_id and date_of_birth
 * @returns {string} Tracking URL
 */
export const createTrackingUrl = (registro) => {
  const birthDate = new Date(registro.date_of_birth)
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()

  return `https://statusvisas.com/seguimiento?public_id=${registro.public_id}&day=${day}&month=${month}&year=${year}`
}