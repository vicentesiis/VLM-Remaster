const months = [
  { label: "Enero", value: "01" },
  { label: "Febrero", value: "02" },
  { label: "Marzo", value: "03" },
  { label: "Abril", value: "04" },
  { label: "Mayo", value: "05" },
  { label: "Junio", value: "06" },
  { label: "Julio", value: "07" },
  { label: "Agosto", value: "08" },
  { label: "Septiembre", value: "09" },
  { label: "Octubre", value: "10" },
  { label: "Noviembre", value: "11" },
  { label: "Diciembre", value: "12" },
]
export const mont = [
  { label: "Enero", value: "january" },
  { label: "Febrero", value: "february" },
  { label: "Marzo", value: "march" },
  { label: "Abril", value: "april" },
  { label: "Mayo", value: "may" },
  { label: "Junio", value: "june" },
  { label: "Julio", value: "july" },
  { label: "Agosto", value: "august" },
  { label: "Septiembre", value: "september" },
  { label: "Octubre", value: "october" },
  { label: "Noviembre", value: "november" },
  { label: "Diciembre", value: "december" },
]
const generateYearOptions = () =>
  Array.from({ length: 6 }, (_, i) => {
    const year = new Date().getFullYear() - i
    return { label: year.toString(), value: year.toString() }
  })

export const group = {
  key: "group_id",
  label: "Grupo",
  placeholder: "Selecciona un grupo",
  getOptions: (context) => context.groups,
}

export const month = {
  key: "month",
  label: "Mes",
  placeholder: "Selecciona un mes",
  options: months,
}

export const year = {
  key: "year",
  label: "Año",
  placeholder: "Selecciona un año",
  options: generateYearOptions(),
}
export const channel = {
  key:"channel",
  label:"canal",
  placeholder:"Selecciona un canal",
  getOptions: (context) => context.channels,

}

export const currentMonth = new Date().getMonth()

export const currentYear = new Date().getFullYear()

export const baseFilterConfig = [group, month, year]

export const registrosFilterConfig = [group, year, channel]
