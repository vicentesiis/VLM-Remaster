import { months } from "@/constants"
import { getYearOptions } from "@/utils"

export const groupConfig = {
  key: "group_id",
  label: "Grupo",
  placeholder: "Selecciona un grupo",
  getOptions: (context) => context.groups,
}

export const userConfig = {
  key: "user_id",
  label: "Usuario",
  placeholder: "Selecciona un usuario",
  getOptions: (context) => context.users,
}

export const monthConfig = {
  key: "month",
  label: "Mes",
  placeholder: "Selecciona un mes",
  options: months,
}

export const yearConfig = {
  key: "year",
  label: "Año",
  placeholder: "Selecciona un año",
  options: getYearOptions(3),
}

export const channelConfig = {
  key: "channel",
  label: "canal",
  placeholder: "Selecciona un canal",
  getOptions: (context) => context.channels,
}
