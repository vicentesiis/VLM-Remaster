import { useQuery } from "@tanstack/react-query"
import * as reportApi from "@/api/reportApi"

export const useGetVentasGlobales = (
  { year, group, channel },
  options = {}
) => {
  return useQuery({
    queryKey: ["globalSales", year, group, channel],
    queryFn: () =>
      reportApi
        .getReportesGlobales({
          year,
          group_id: group,
          channel,
        })
        .then((res) => res.data),
    enabled: !!year && !!group && !!channel,
    ...options,
  })
}
export const useGetAgentSales = (
  { user_id, start_date, end_date },
  options = {}
) => {
  return useQuery({
    queryKey: ["agentSalesReport", user_id, start_date, end_date],
    queryFn: () =>
      reportApi
        .getAgentSales({
          user_id,
          start_date,
          end_date,
        })
        .then((res) => res.data),
    enabled: !!user_id && !!start_date && !!end_date,
    ...options,
  })
}
export const useGetAgentRegistrations = (
  { user_id, start_date, end_date, record_type },
  options = {}
) => {
  return useQuery({
    queryKey: [
      "agentRegistrationsReport",
      user_id,
      start_date,
      end_date,
      record_type,
    ],
    queryFn: () =>
      reportApi
        .getAgentRegistrations({
          user_id,
          start_date,
          end_date,
          record_type,
        })
        .then((res) => res.data),
    enabled: !!user_id && !!start_date && !!end_date,
    record_type,
    ...options,
  })
}
export const useGetGroupSalesReport = (
  { start_date, end_date, group_id, channel },
  options = {}
) => {
  return useQuery({
    queryKey: ["groupSalesReport", start_date, end_date, group_id, channel],
    queryFn: () =>
      reportApi
        .getGroupSalesReport({
          start_date,
          end_date,
          group_id,
          channel,
        })
        .then((res) => res.data),
    enabled: !!start_date && !!end_date,
    channel,
    ...options,
  })
}
export const useGetAgentCutOff = ({ agent_id }, options = {}) => {
  return useQuery({
    queryKey: ["agent-cut-off", agent_id],
    queryFn: () =>
      reportApi
        .getAgentCutOff({
          agent_id,
        })
        .then((res) => res.data),
    enabled: !!agent_id,
    ...options,
  })
}
export const useGetTasks = (options = {}) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      return await reportApi.getUserTasks()
    },
    ...options,
  })
}

export const useGetFinalizedReport = (
  { skip, limit, group_id }, 
  options = {}
) => {
  return useQuery({
    queryKey: ["finalizedReport", skip, limit, group_id],
    queryFn: () =>
      reportApi.getFinalizedReport({
        skip,
        limit,
        group_id,
      }),
    ...options,
  })
}

export const useGetAgentPotentialSales = ({ agent_id }, options = {}) => {
  return useQuery({
    queryKey: ["agentPotentialSale", agent_id],
    queryFn: () =>
      reportApi
        .getAgentPotentialSales({
          agent_id,
        })
        .then((res) => res.data),
    enabled: !!agent_id,
    ...options,
  })
}
