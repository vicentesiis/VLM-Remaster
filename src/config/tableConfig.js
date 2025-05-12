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
    columnsToHide: [
      "name",
      "public_id",
      "date_of_birth",
      "contacted",
      "amount_owed",
      "active",
      "end_date",
      "previous_status",
      "exit_date",
      "updated_at",
      "desired_jobs",
      "job",
      "comments",
      "program",
      "curp",
      "state",
      "passport",
    ],
    columnsMobileToHide: [
      "name",
      "country",
      "type",
      "comments",
      "phone",
      "actions",
      "comments",
    ],
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
    columnsToHide: ["sells"],
    columnsMobileToHide: ["sells"],
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
    columnsToHide: [],
    columnsMobileToHide: [],
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
    columnsToHide: [],
    columnsMobileToHide: [],
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

export const getColumnsToHide = (type, isMobile = false) => {
  const config = tableConfig[type]
  if (!config) return new Set()

  return new Set(
    isMobile
      ? config.columnsMobileToHide || config.columnsToHide || []
      : config.columnsToHide || []
  )
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
  getColumnsToHide,
  getColumnOrder,
  getColumnsToAdd,
}
