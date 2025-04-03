import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { createContext, useState, useEffect } from "react"
import {
  loginUser,
  getUser,
  logout as logoutUser,
} from "@/services/authService"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"))
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
  })

  // Login mutation to handle login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      setToken(data.access_token)
      queryClient.invalidateQueries(["user"])
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })

  // Logout mutation to handle logout
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      setToken(null)
      queryClient.clear()
    },
    onError: (error) => {
      console.error("Logout failed:", error)
    },
  })

  useEffect(() => {
    if (!token) {
      setToken(null)
      queryClient.clear()
    }
  }, [token, queryClient])

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, isError, loginMutation, logoutMutation }}
    >
      {children}
    </AuthContext.Provider>
  )
}
