import { useQuery, useMutation } from "@tanstack/react-query"
import * as userApi from "@/api/userApi"

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

export const useCreateUser = () =>
  useMutation({ mutationFn: userApi.createUser })

export const useUpdateUser = () =>
  useMutation({ mutationFn: userApi.updateUser })
