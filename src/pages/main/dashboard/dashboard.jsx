import React from "react"
import { useDashboardData } from "./hooks/useDashboardData"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { useGetMyPotentialSales } from "@/hooks/queries/UseReports"

const Dashboard = () => {
  const { dashboardData, isLoading, isFetching, isError, isFetched } = useDashboardData()
  const { data: potentialSalesData } = useGetMyPotentialSales()

  return (
    <PageLayout title={"Dashboard"}>
      <WithStatusState 
      isLoading={isFetching}
        isError={isError}
        isIdle={!isFetched}>

      </WithStatusState>
    </PageLayout>
  )
}

export default Dashboard