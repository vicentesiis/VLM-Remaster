import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as userApi from "@/api/userApi"

export const useCurrentUser = ({
  params = { with_group: true },
  ...rest
} = {}) =>
  useQuery({
    queryKey: ["users", "me", params],
    queryFn: () => userApi.getCurrentUser(params),
    retry: false,
    ...rest,
  })

export const useGetUsers = (params) =>
  useQuery({
    queryKey: ["users", params],
    queryFn: () => userApi.getUsers(params),
  })

export const useGetUserById = (id) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
  })

export const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["group"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["group"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}

export const useUpdateUserRecordWeight = (options = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ user_searchable_id, record_weight }) =>
      userApi.setUserRecordWeight({
        user_searchable_id,
        record_weight,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["group"])

      if (options.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}
