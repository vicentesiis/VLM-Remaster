import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import React, { createContext, useState, useEffect } from "react"
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

  /** @type {import("@tanstack/react-query").UseQueryResult<UserResponse>} */
  const {
    data: user,
    isLoading: isUserLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
    retry: false,
  })

  // Get catalog (roles & permissions)
  const { data: userCatalog, isLoading: isCatalogLoading } = useQuery({
    queryKey: ["userCatalog"],
    queryFn: fetchUserCatalog,
    enabled: !!token,
    retry: false,
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.access_token)
      queryClient.invalidateQueries(["user"])
      queryClient.invalidateQueries(["userCatalog"])
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setToken(null)
      queryClient.clear()
    },
  })

  // Sync token removal
  useEffect(() => {
    if (!token) {
      queryClient.clear()
    }
  }, [token, queryClient])

  const currentRole = user?.data?.role || null
  const listOfRoles = userCatalog?.data?.roles || []
  const loading = isUserLoading || isCatalogLoading

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
