export const titles = {
  Registros: {
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
  ReportesVentasPorAgente: {
    date: "Fecha",
    status: "Estatus",
    quantity: "Cantidad de Ordenes",
    total: "Monto Total Diario",
  },
  ReportesVentasPorAgenteDetalle: {
    id: "# de Referencia",
    name: "Nombre del Cliente",
    quantity: "Monto",
    status: "Estatus del Pago",
  },
  AjustesUsuarios: {
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
}

export const generateColumnTitle = (type, key) => {
  return titles[type]?.[key] || key
}

export const columnAlignments = {
  Registros: {
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
  ReportesVentasPorAgente: {
    date: "left",
    status: "center",
    quantity: "center",
    total: "center",
  },
  ReportesVentasPorAgenteDetalle: {
    id: "left",
    name: "left",
    quantity: "left",
    status: "left",
  },
  AjustesUsuarios: {
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
}

export const generateColumnAlign = (type, key) => {
  return columnAlignments[type]?.[key] || "left"
}

export const columnsToHide = {
  Registros: {
    columns: [
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
    ],
    columnsMobile: [
      "name",
      "country",
      "type",
      "comments",
      "phone",
      "actions",
      "comments",
    ],
  },
  ReportesVentasPorAgente: {
    columns: ["sells"],
    columnsMobile: ["sells"],
  },
  ReportesVentasPorAgenteDetalle: { columns: [] },
  AjustesUsuarios: { columns: [] },
}

export default { generateColumnTitle, generateColumnAlign, columnsToHide }
