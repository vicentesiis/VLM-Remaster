export const titles = {
  // Tasks
  id: "Cliente",
  name: "Nombre",
  country: "País",
  type: "Vacante",
  status: "Estatus",
  comments: "Comentarios",
  phone: "Teléfono",
  actions: "Acciones",
  // Orders
  orderID: "ID",
  reference: "Referencia",
  creationDate: "Fecha",
  paymentStatus: "Estatus",
  quantity: "Monto",
  pay: "Método",
  voucher: "Voucher",
}

export const generateColumnTitle = (key) => {
  return titles[key]
}

export const columnAlignments = {
  // Left-aligned columns
  id: "left",
  name: "left",
  country: "left",
  comments: "left",
  phone: "left",

  // Center-aligned columns
  type: "center",
  status: "left",
  actions: "left",

  // Right-aligned columns
  orderID: "left",
  reference: "left",
  creationDate: "left",
  paymentStatus: "left",
  quantity: "left",
  pay: "left",
  voucher: "left",
}

export const generateColumnAlign = (key) => {
  return columnAlignments[key] || "left" // Default to "left" if not specified
}

export default { generateColumnTitle, generateColumnAlign }
