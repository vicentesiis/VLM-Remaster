import { login, refreshToken } from "@/api/api"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

export const loginUser = async (credentials) => {
  const data = await login(credentials)
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
  return data
}

export const refreshAuthToken = async () => {
  const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (!storedRefreshToken) throw new Error("No refresh token found")

  const data = await refreshToken(storedRefreshToken)
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
  return data.access_token
}

export const getValidAccessToken = async () => {
  let token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) throw new Error("No access token found")

  if (isTokenExpired(token)) {
    token = await refreshAuthToken()
  }

  return token
}

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]))
    return Date.now() > decoded.exp * 1000
  } catch {
    return true
  }
}
