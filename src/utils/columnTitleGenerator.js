const titles = {

  // Tasks
  id: { title: "Cliente" },
  type: { title: "Vacante", align: "center" },
  status: { title: "Estatus", align: "center" },
  comments: { title: "Comentarios" },
  phone: { title: "Teléfono" },
  actions: { title: "Acciones", align: "center" },
  // Orders
  orderID: { title: "ID de Orden", align: "" },
  reference: { title: "Referencia", align: "" },
  creationDate: { title: "Fecha de Creación", align: "" },
  paymentStatus: { title: "Estatus", align: "center" },
  quantity: { title: "Monto", align: "" },
  pay: { title: "Método", align: "center" },
  voucher: { title: "Voucher", align: "" },
}

export const generateTitle = (key) => {
  const titleObj = titles[key]
  if (titleObj) {
    return titleObj
  }
  return { title: key.charAt(0).toUpperCase() + key.slice(1), align: "left" }
}

export default generateTitle
