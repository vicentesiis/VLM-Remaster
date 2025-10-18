import { createColumnHelper } from "@tanstack/react-table"
import {
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Music,
  Mail,
  Phone,
  Globe,
  MoreHorizontal
} from "lucide-react"
import React from "react"
import IconBadge from "../../../badge/icon-badge"
import NullableCell from "../../cells/nullable-cell"
import { Badge } from "@/components/ui"
import { toTitleCase } from "@/utils"

const columnHelper = createColumnHelper()

// Helper function to get channel icon and color
const getChannelConfig = (channel) => {
  const channelLower = channel?.toLowerCase()

  switch (channelLower) {
    case 'facebook':
      return { icon: Facebook, variant: 'facebook' }
    case 'instagram':
      return { icon: Instagram, variant: 'instagram' }
    case 'whatsapp':
      return { icon: MessageCircle, variant: 'whatsapp' }
    case 'telegram':
      return { icon: Send, variant: 'telegram' }
    case 'tiktok':
      return { icon: Music, variant: 'tiktok' }
    case 'email':
      return { icon: Mail, variant: 'email' }
    case 'phone':
      return { icon: Phone, variant: 'phone' }
    case 'web':
      return { icon: Globe, variant: 'web' }
    case 'other':
      return { icon: MoreHorizontal, variant: 'other' }
    default:
      return { icon: Globe, variant: 'outline' }
  }
}

/**
 * Creates a channel column for admin users
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createChannelColumn = (columnHelper) =>
  columnHelper.accessor("channel", {
    header: "Canal",
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
      label: "Canal",
      options: [],
    },
  })

/**
 * Creates a program column
 * @param {Object} columnHelper - TanStack table column helper
 * @returns {Object} Column definition
 */
export const createProgramColumn = (columnHelper) =>
  columnHelper.accessor("program", {
    header: "Programa",
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
      label: "Programa",
      options: [],
    },
  })

export { columnHelper }