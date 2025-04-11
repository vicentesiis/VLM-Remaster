// Columns to hide in the Table
export const columnsConfig = {
  tasks: {
    columns: ["name"],
    columnsMobile: ["name", "country", "type", "comments", "phone", "actions"],
  },
  salesAgentReport: {
    columns: ["sells"],
    columnsMobile: ["sells"],
  },
  salesReportDetailTableBody: { columns: [] },
  userSettingsTableBody: { columns: [] },
}

export default columnsConfig
