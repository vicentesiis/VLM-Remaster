import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import React, { createContext, useState, useEffect } from "react"
import {
  loginUser,
  getUser,
  logout as logoutUser,
  fetchUserCatalog, // ✅ Include fetchUserCatalog
} from "@/services/authService"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"))
  const queryClient = useQueryClient()

  // Fetch user data
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
  })

  // Fetch user roles & permissions
  const { data: userCatalog, isLoading: isCatalogLoading } = useQuery({
    queryKey: ["userCatalog"],
    queryFn: fetchUserCatalog,
    enabled: !!token,
  })

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      setToken(data.access_token)
      queryClient.invalidateQueries(["user"])
      queryClient.invalidateQueries(["userCatalog"]) // ✅ Also refetch catalog
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      setToken(null)
      queryClient.clear()
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
      value={{
        user,
        userCatalog, // ✅ Provide to child components
        token,
        isLoading,
        isCatalogLoading,
        isError,
        loginMutation,
        logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
