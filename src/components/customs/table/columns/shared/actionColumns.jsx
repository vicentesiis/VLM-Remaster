import { Loader2 } from "lucide-react"
import { useState } from "react"
import React from "react"
import { FaWhatsapp } from "react-icons/fa"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { formatPhoneNumber, createWhatsAppMessage } from "@/utils"

/**
 * Creates a WhatsApp action column for agents
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} id - The column ID (default: "whatsapp_action")
 * @param {string} header - The column header text (default: "WhatsApp")
 * @returns {Object} Column definition
 */
export const createWhatsAppActionColumn = (
  columnHelper,
  id = "whatsapp_action",
  header = "Whatsapp"
) =>
  columnHelper.display({
    id,
    header,
    cell: ({ row }) => {
      const registro = row.original
      const { phone, nationality } = registro

      const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false)

      const handleWhatsAppClick = async (e) => {
        e.stopPropagation() // Prevent row click events
        setIsWhatsAppLoading(true)

        try {
          const phoneNumber = formatPhoneNumber(phone, nationality)

          if (!phoneNumber) {
            toast.error("No hay número de teléfono disponible")
            return
          }

          const message = createWhatsAppMessage(registro)
          const encodedMessage = encodeURIComponent(message)
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

          window.open(whatsappUrl, "_blank", "noopener,noreferrer")
        } catch (error) {
          console.error("WhatsApp error:", error)
          toast.error("Error al abrir WhatsApp")
        } finally {
          setTimeout(() => setIsWhatsAppLoading(false), 1000)
        }
      }

      // Don't render button if no phone number
      if (!phone) {
        return null
      }

      return (
        <div className="flex justify-center">
          <Button
            size="icon"
            variant="default"
            onClick={handleWhatsAppClick}
            disabled={isWhatsAppLoading}
            className="h-8 w-8 bg-green-600 hover:bg-green-700"
            title="Enviar WhatsApp"
          >
            {isWhatsAppLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FaWhatsapp className="h-4 w-4" />
            )}
          </Button>
        </div>
      )
    },
    meta: {
      align: "center",
      maxWidth: "85px",
    },
    enableSorting: false,
    enableColumnFilter: false,
  })
