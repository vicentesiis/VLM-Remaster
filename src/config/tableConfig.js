// Table Configuration
const tableConfig = {
  // ─────────────────────────────────────────
  Registros: {
    titles: {
      id: "Cliente",
      name: "Nombre",
      status: "Estatus",
      comments: "Comentarios",
      phone: "Teléfono",
      actions: "Acciones",
      email: "Correo",
      nationality: "Nacionalidad",
      state: "Estado",
      curp: "CURP",
      passport: "Pasaporte",
      channel: "Canal",
      program: "Programa",
      created_at: "Fecha de Creación",
      record_type: "Tipo de Registro",
    },
    alignments: {
      id: "left",
      name: "left",
      country: "left",
      comments: "center",
      phone: "left",
      type: "center",
      status: "center",
      actions: "center",
      email: "left",
      nationality: "center",
      state: "center",
      curp: "left",
      passport: "left",
      channel: "center",
      program: "left",
      created_at: "center",
      record_type: "center",
    },
    columnsToShow: ["id", "status", "phone", "email", "created_at"],
    columnsMobileToShow: ["name", "status"],
    columnOrder: ["id", "status", "email"],
    columnsToAdd: ["actions"],
  },

  // ─────────────────────────────────────────
  ReportesVentasPorAgente: {
    titles: {
      date: "Fecha",
      status: "Estatus",
      quantity: "Cantidad de Ordenes",
      total: "Monto Total Diario",
    },
    alignments: {
      date: "left",
      status: "center",
      quantity: "center",
      total: "center",
    },
    columnsToShow: ["date", "status", "quantity", "total"],
    columnsMobileToShow: ["date", "status"],
    columnOrder: [],
  },

  // ─────────────────────────────────────────
  ReportesVentasPorAgenteDetalle: {
    titles: {
      id: "# de Referencia",
      name: "Nombre del Cliente",
      quantity: "Monto",
      status: "Estatus del Pago",
    },
    alignments: {
      id: "left",
      name: "left",
      quantity: "left",
      status: "left",
    },
    columnsToShow: ["id", "name", "quantity", "status"],
    columnsMobileToShow: ["name", "status"],
    columnOrder: [],
  },

  // ─────────────────────────────────────────
  AjustesUsuarios: {
    titles: {
      username: "Nombre de Usuario",
      name: "Nombre",
      role: "Rol",
      type: "Tipo",
      supervisor: "Supervisor",
      compensation: "Compensación",
      phone: "Teléfono",
      active: "Activo",
      actions: "Acciones",
    },
    alignments: {
      username: "left",
      name: "left",
      role: "center",
      type: "center",
      supervisor: "left",
      compensation: "left",
      phone: "left",
      active: "center",
      actions: "center",
    },
    columnsToShow: ["username", "name", "role", "type", "phone", "active"],
    columnsMobileToShow: ["name", "role"],
    columnOrder: [],
  },
}

// Utility Functions
export const getTitle = (type, key) => {
  return tableConfig[type]?.titles?.[key] || key
}

export const getAlignment = (type, key) => {
  return tableConfig[type]?.alignments?.[key] || "left"
}

export const getColumnsToShow = (type, isMobile = false) => {
  const config = tableConfig[type]
  if (!config) return []
  return isMobile ? config.columnsMobileToShow || [] : config.columnsToShow || []
}

export const getColumnOrder = (type) => {
  return tableConfig[type]?.columnOrder || []
}

export const getColumnsToAdd = (type) => {
  return tableConfig[type]?.columnsToAdd || []
}

export default {
  tableConfig,
  getTitle,
  getAlignment,
  getColumnsToShow,
  getColumnOrder,
  getColumnsToAdd,
}