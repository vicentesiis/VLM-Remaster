import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import React, { createContext, useState, useEffect } from "react"
import { H3 } from "@/components/ui"
import {
  loginUser,
  getUser,
  logout as logoutUser,
  fetchUserCatalog,
} from "@/services/authService"

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

  const { data: userCatalog, isLoading: isCatalogLoading } = useQuery({
    queryKey: ["userCatalog"],
    queryFn: fetchUserCatalog,
    enabled: !!token,
    retry: false,
  })

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.access_token)
      queryClient.invalidateQueries(["user"])
      queryClient.invalidateQueries(["userCatalog"])
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setToken(null)
      queryClient.clear()
    },
  })

  useEffect(() => {
    if (!token) {
      queryClient.clear()
    }
  }, [token, queryClient])

  const currentRole = user?.data?.role || null
  const listOfRoles = userCatalog?.data?.roles || []

  const loading = isUserLoading || isCatalogLoading

  if (loading) {
    // Full-screen loading UI with spinner
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <H3 className="text-muted-foreground">Cargando información base...</H3>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        listOfRoles,
        userCatalog,
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

export default AuthProvider
