import SalesReportDetailTableBody from "@/components/customs/table-data/table-body/sales-report-detail-table-body"
import SalesReportTableBody from "@/components/customs/table-data/table-body/sales-report-table-body"
import TaskTableBody from "@/components/customs/table-data/table-body/task-table-body"
import UserSettingsTableBody from "@/components/customs/table-data/table-body/user-settings-table-body"

export const tableBodyRegister = {
  tasks: TaskTableBody,
  salesAgentReport: SalesReportTableBody,
  salesReportDetailTableBody: SalesReportDetailTableBody,
  userSettingsTableBody: UserSettingsTableBody,
}

export default tableBodyRegister
