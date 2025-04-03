import {
  login,
  refreshToken,
  getUserData,
  fetchUserCatalogData,
} from "@/api/api"

export const loginUser = async (credentials) => {
  const data = await login(credentials)
  return data
}

export const refreshAuthToken = async () => {
  const refreshTokenFromStorage = localStorage.getItem("refresh_token")
  if (!refreshTokenFromStorage) throw new Error("No refresh token found")

  const data = await refreshToken(refreshTokenFromStorage)

  localStorage.setItem("access_token", data.access_token)
  localStorage.setItem("refresh_token", data.refresh_token)

  return data.access_token
}

export const getUser = async () => {
  let token = localStorage.getItem("access_token")

  if (!token) throw new Error("No token found")

  if (checkTokenExpiration(token)) {
    try {
      token = await refreshAuthToken()
    } catch (error) {
      throw new Error("Unable to refresh token. Please login again.")
    }
  }

  return await getUserData(token)
}

export const fetchUserCatalog = async () => {
  let token = localStorage.getItem("access_token")

  if (!token) throw new Error("No token found")

  if (checkTokenExpiration(token)) {
    try {
      token = await refreshAuthToken()
    } catch (error) {
      throw new Error("Unable to refresh token. Please login again.")
    }
  }

  return await fetchUserCatalogData(token)
}

export const logout = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
}

const checkTokenExpiration = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]))
    const expirationTime = decodedToken.exp * 1000

    return Date.now() > expirationTime
  } catch (error) {
    return true
  }
}
