import { useQuery, useMutation } from "@tanstack/react-query"
import * as recordApi from "@/api/recordApi"

export const useGetRecords = (params) =>
  useQuery({
    queryKey: ["records", params],
    queryFn: () => recordApi.getRecordsByCriteria(params),
  })

export const useCreateLead = () =>
  useMutation({ mutationFn: recordApi.createLeadRecord })

export const useCreateProspect = () =>
  useMutation({ mutationFn: recordApi.createProspectRecord })

export const useAssignLead = () =>
  useMutation({ mutationFn: recordApi.assignLeadRecord })
