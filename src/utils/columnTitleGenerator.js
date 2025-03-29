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

export default generateColumnTitle
