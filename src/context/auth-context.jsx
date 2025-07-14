import { useMutation, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"
import React, { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FullScreenLoader from "@/components/customs/full-screen-loader"
import { useCurrentUser } from "@/hooks/queries/useUser"
import { loginUser, logout as logoutUser } from "@/services/authService"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"))
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  console.log("AuthProvider token:", token)

  const {
    data: user,
    isError,
    isLoading: isUserLoading,
    error,
  } = useCurrentUser({ enabled: !!token })

  useEffect(() => {
    if (
      isError &&
      (error?.response?.status === 401 || error?.response?.status === 404)
    ) {
      localStorage.removeItem("access_token")
      setToken(null)
      navigate("/login")
    }
  }, [isError, error, navigate])

  const loading = isUserLoading

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

  if (loading) {
    return <FullScreenLoader />
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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

AuthProvider.propTypes = {
  children: PropTypes.any,
}
