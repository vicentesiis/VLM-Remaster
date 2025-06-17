import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginUser, logout as logoutUser } from "@/services/authService"

export const useAuthMutations = (setToken) => {
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token)
      setToken(data.access_token)
      queryClient.invalidateQueries(["user"])
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setToken(null)
      localStorage.clear()
      queryClient.clear()
    },
  })

  return { loginMutation, logoutMutation }
}
