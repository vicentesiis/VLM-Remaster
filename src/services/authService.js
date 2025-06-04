import { apiClient } from "@/api/apiClient"
import { plainAxios } from "@/api/plainAxios"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

export const storeTokens = ({ access_token, refresh_token }) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
}

export const getStoredAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

export const getStoredRefreshToken = () =>
  localStorage.getItem(REFRESH_TOKEN_KEY)

export const isTokenExpired = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]))
    return Date.now() > exp * 1000
  } catch {
    return true
  }
}

export const loginUser = async (credentials) => {
  const data = new URLSearchParams(credentials)
  const tokens = await apiClient.post("/auth/token", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
  storeTokens(tokens)
  return tokens
}

export const refreshAuthToken = async () => {
  const refresh_token = getStoredRefreshToken()
  if (!refresh_token) throw new Error("No refresh token found")

  const response = await plainAxios.post("/auth/refresh", { refresh_token })
  storeTokens(response.data)
  return response.data.access_token
}

export const getValidAccessToken = async () => {
  let token = getStoredAccessToken()
  if (!token || isTokenExpired(token)) {
    token = await refreshAuthToken()
  }
  return token
}

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
