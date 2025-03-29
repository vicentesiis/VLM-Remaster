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
  const titleObj = titles[key]
  if (titleObj) {
    return { title: titleObj }
  }
  return { title: key.charAt(0).toUpperCase() + key.slice(1) }
}

export default generateColumnTitle
