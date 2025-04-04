import {
  login,
  refreshToken,
  getUserData,
  fetchUserCatalogData,
} from "@/api/api"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

export const loginUser = async (credentials) => {
  const data = await login(credentials)
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
  return data
}

export const refreshAuthToken = async () => {
  const refreshTokenStored = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (!refreshTokenStored) throw new Error("No refresh token found")

  const data = await refreshToken(refreshTokenStored)
  localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
  return data.access_token
}

const getValidAccessToken = async () => {
  let token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) throw new Error("No access token found")

  if (isTokenExpired(token)) {
    token = await refreshAuthToken()
  }

  return token
}

export const getUser = async () => {
  const token = await getValidAccessToken()
  return await getUserData(token)
}

export const fetchUserCatalog = async () => {
  const token = await getValidAccessToken()
  return await fetchUserCatalogData(token)
}

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]))
    return Date.now() > decoded.exp * 1000
  } catch (err) {
    return true
  }
}
