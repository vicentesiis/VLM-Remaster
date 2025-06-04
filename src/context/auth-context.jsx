import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import React, { createContext, useState, useEffect } from "react"
import { FullScreenLoader } from "@/components/customs/full-screen-loader"
import { loginUser, logout as logoutUser } from "@/services/authService"
import { getUser } from "@/services/userService"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"))
  const queryClient = useQueryClient()

  const {
    data: user,
    isError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
    retry: false,
  })

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

  useEffect(() => {
    if (!token) {
      queryClient.clear()
    }
  }, [token, queryClient])

  const currentRole = user?.data?.role || null
  const loading = isUserLoading

  if (loading) {
    return <FullScreenLoader />
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        loginMutation,
        logoutMutation,
        isError,
        loading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
