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

const generateYearOptions = () =>
  Array.from({ length: 6 }, (_, i) => {
    const year = new Date().getFullYear() - i
    return { label: year.toString(), value: year.toString() }
  })

export const group = {
  key: "group",
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

export const baseFilterConfig = [group, month, year]
