import { months } from "@/constants"
import { getYearOptions } from "@/utils"

export const groupConfig = {
  key: "group_id",
  label: "Grupo",
  placeholder: "Selecciona un grupo",
  getOptions: (context) => context.groups,
  required: true,
}

export const userConfig = {
  key: "user_id",
  label: "Usuario",
  placeholder: "Selecciona un usuario",
  getOptions: (context) => context.users,
  required: true,
}

export const monthConfig = {
  key: "month",
  label: "Mes",
  placeholder: "Selecciona un mes",
  options: months,
  required: true,
}

export const yearConfig = {
  key: "year",
  label: "Año",
  placeholder: "Selecciona un año",
  options: getYearOptions(3),
  required: true,
}
export const channelConfig = {
  key: "channel",
  label: "canal",
  placeholder: "Selecciona un canal",
  getOptions: (context) => context.channels,
}

export const record_type = {
  key: "record_type",
  label: "Tipo de Registro",
  placeholder: "Selecciona tipo",
  options: [
    { label: "Lead", value: "lead" },
    { label: "Prospect", value: "prospect" },
  ],
}
