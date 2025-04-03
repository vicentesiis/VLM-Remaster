import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createContext, useState } from "react"
import { login, getUser, logout } from "@/api/auth-api"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token, // Fetch user only if token exists
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      setToken(data.access_token)
      queryClient.invalidateQueries(["user"]) // Refetch user
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("token")
      setToken(null)
      queryClient.clear() // Clear all cache
    },
  })

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, loginMutation, logoutMutation }}
    >
      {children}
    </AuthContext.Provider>
  )
}
