export const titles = {
  tasks: {
    id: "Cliente",
    name: "Nombre",
    country: "País",
    type: "Vacante",
    status: "Estatus",
    comments: "Comentarios",
    phone: "Teléfono",
    actions: "Acciones",
  },
  salesAgentReport: {
    date: "Fecha",
    status: "Estatus",
    quantity: "Cantidad de Ordenes",
    total: "Monto Total Diario",
  },
  salesReportDetailTableBody: {
    id: "# de Referencia",
    name: "Nombre del Cliente",
    quantity: "Monto",
    status: "Estatus del Pago",
  },
  userSettingsTableBody: {
    username: "Nombre de Usuario",
    name: "Nombre",
    role: "Rol",
    type: "Tipo",
    supervisor: "Supervisor",
    compensation: "Compensación",
    phone: "Teléfono",
    active: "Activo",
    actions: "Acciones",
  }
}

export const generateColumnTitle = (type, key) => {
  return titles[type]?.[key] || key
}

export const columnAlignments = {
  tasks: {
    id: "left",
    name: "left",
    country: "left",
    comments: "left",
    phone: "left",
    type: "center",
    status: "left",
    actions: "left",
  },
  salesAgentReport: {
    date: "left",
    status: "center",
    quantity: "center",
    total: "center",
  },
  salesReportDetailTableBody: {
    id: "left",
    name: "left",
    quantity: "left",
    status: "left",
  },
  userSettingsTableBody: {
    username: "left",
    name: "left",
    role: "center",
    type: "center",
    supervisor: "left",
    compensation: "left",
    phone: "left",
    active: "center",
    actions: "center",
  }
}

export const generateColumnAlign = (type, key) => {
  return columnAlignments[type]?.[key] || "left"
}

export default { generateColumnTitle, generateColumnAlign }
