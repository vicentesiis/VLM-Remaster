
import React from "react"
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTelegram,
  FaTiktok
} from "react-icons/fa"
import {
  MdEmail,
  MdPhone,
  MdLanguage,
  MdMoreHoriz
} from "react-icons/md"
import IconBadge from "../../../badge/icon-badge"
import NullableCell from "../../cells/nullable-cell"
import { Badge } from "@/components/ui"
import { toTitleCase } from "@/utils"

// Helper function to get channel icon and color
const getChannelConfig = (channel) => {
  const channelLower = channel?.toLowerCase()

  switch (channelLower) {
    case 'facebook':
      return { icon: FaFacebook, variant: 'facebook' }
    case 'instagram':
      return { icon: FaInstagram, variant: 'instagram' }
    case 'whatsapp':
      return { icon: FaWhatsapp, variant: 'whatsapp' }
    case 'telegram':
      return { icon: FaTelegram, variant: 'telegram' }
    case 'tiktok':
      return { icon: FaTiktok, variant: 'tiktok' }
    case 'email':
      return { icon: MdEmail, variant: 'email' }
    case 'phone':
      return { icon: MdPhone, variant: 'phone' }
    case 'web':
      return { icon: MdLanguage, variant: 'web' }
    case 'other':
      return { icon: MdMoreHoriz, variant: 'other' }
    default:
      return { icon: MdLanguage, variant: 'outline' }
  }
}

/**
 * Creates a channel column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "channel")
 * @param {string} header - The column header text (default: "Canal")
 * @returns {Object} Column definition
 */
export const createChannelColumn = (columnHelper, accessor = "channel", header = "Canal") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => {
      const channel = info.getValue()
      if (!channel) return <NullableCell value={null} className="text-center" />

      const { icon: Icon, variant } = getChannelConfig(channel)

      return (
        <div className="flex justify-center">
          <IconBadge
            title={toTitleCase(channel)}
            icon={Icon}
            variant={variant}
          />
        </div>
      )
    },
    meta: {
      align: "center",
      variant: "multiSelect",
      label: header,
      options: [],
    },
  })

/**
 * Creates a program column
 * @param {Object} columnHelper - TanStack table column helper
 * @param {string} accessor - The data accessor key (default: "program")
 * @param {string} header - The column header text (default: "Programa")
 * @returns {Object} Column definition
 */
export const createProgramColumn = (columnHelper, accessor = "program", header = "Programa") =>
  columnHelper.accessor(accessor, {
    header,
    cell: (info) => {
      const program = info.getValue()
      if (!program) return <NullableCell value={null} className="text-center" />

      return (
        <div className="flex justify-center">
          <Badge variant="outline">
            {toTitleCase(program)}
          </Badge>
        </div>
      )
    },
    meta: {
      align: "center",
      variant: "multiSelect",
      label: header,
      options: [],
    },
  })

