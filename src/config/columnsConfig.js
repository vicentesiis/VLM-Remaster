// Define the columns configuration for each table type
export const columnsConfig = {
  tasks: {
    columns: ["name"],
    columnsMobile: ["name", "country", "type", "comments", "phone", "actions"],
  },
  orders: {
    columns: ["id", "name", "voucher", "pay", "status", "quantity"],
    columnsMobile: ["voucher", "pay", "status"],
  },
  // Add more table configurations here
}

export default columnsConfig
