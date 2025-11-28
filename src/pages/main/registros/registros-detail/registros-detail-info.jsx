import {
  Briefcase,
  Calendar,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
  Clock,
  Globe2,
  Layers,
  MessageSquare,
} from "lucide-react"
import PropTypes from "prop-types"

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
import InfoSection from "@/components/customs/info-section"
import { Card, CardContent } from "@/components/ui/card"
import { toTitleCase } from "@/utils/utils"

const formatDate = (isoDate) =>
  isoDate ? new Date(isoDate).toLocaleDateString("es-MX") : "-"

const getStatusVariant = (status) => {
  const statusMap = {
    activo: "default",
    inactivo: "secondary",
    pendiente: "outline",
    completado: "success",
  }
  return statusMap[status?.toLowerCase()] || "default"
}

const getChannelIcon = (channel) => {
  const channelLower = channel?.toLowerCase()

  switch (channelLower) {
    case 'facebook':
      return FaFacebook
    case 'instagram':
      return FaInstagram
    case 'whatsapp':
      return FaWhatsapp
    case 'telegram':
      return FaTelegram
    case 'tiktok':
      return FaTiktok
    case 'email':
      return MdEmail
    case 'phone':
      return MdPhone
    case 'web':
      return MdLanguage
    case 'other':
      return MdMoreHoriz
    default:
      return MdLanguage
  }
}

export const RegistrosDetailInfo = ({ registro }) => {
  const {
    name,
    date_of_birth,
    phone,
    email,
    nationality,
    state,
    curp,
    passport,
    channel,
    status,
    program,
    assignment_date,
    exit_date,
    end_date,
    record_type,
    comments,
    user,
    job,
  } = registro

  const sections = [
    {
      title: "Información del Registro",
      icon: User,
      items: [
        { label: "Nombre", value: toTitleCase(name), icon: User },
        { label: "Teléfono", value: phone, icon: Phone },
        { label: "E-mail", value: email?.toLowerCase(), icon: Mail },
        { label: "Fecha de Nacimiento", value: formatDate(date_of_birth), icon: Calendar },
        { label: "Nacionalidad", value: toTitleCase(nationality), icon: Globe2 },
        {
          label: "Estado o Departamento de Residencia",
          value: toTitleCase(state),
          icon: MapPin,
        },
        {
          label: "Documento de Identidad",
          value: curp?.toUpperCase() ?? passport?.toUpperCase() ?? "-",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Información del Proceso",
      icon: Briefcase,
      items: [
        {
          label: "Agente Asignado",
          value: toTitleCase(user?.name),
          icon: User,
        },
        {
          label: "Canal",
          value: toTitleCase(channel),
          icon: getChannelIcon(channel),
        },
        {
          label: "Programa",
          value: toTitleCase(program),
          icon: Layers,
        },
        {
          label: "Tipo de Registro",
          value: toTitleCase(record_type),
          icon: FileText,
          isBadge: true,
        },
        {
          label: "Estatus",
          value: status,
          icon: Clock,
          isBadge: true,
        },
        {
          label: "ID de la Vacante",
          value: job,
          icon: Briefcase,
        },
        {
          label: "Fecha de Asignación",
          value: formatDate(assignment_date),
          icon: Calendar,
        },
        {
          label: "Fecha de Salida",
          value: formatDate(exit_date),
          icon: Calendar,
        },
        {
          label: "Fecha de Finalización",
          value: formatDate(end_date),
          icon: Calendar,
        },
        {
          label: "Comentarios",
          value: comments,
          icon: MessageSquare,
          fullWidth: true,
        },
      ],
    },
  ]

  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col gap-8 p-6 sm:p-8">
        {sections.map((section) => (
          <InfoSection
            key={section.title}
            title={section.title}
            icon={section.icon}
            items={section.items}
            getStatusVariant={getStatusVariant}
          />
        ))}
      </CardContent>
    </Card>
  )
}

RegistrosDetailInfo.propTypes = {
  registro: PropTypes.any,
}

export default RegistrosDetailInfo