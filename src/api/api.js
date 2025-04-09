const API_URL = "/api"

const apiRequest = async (endpoint, method, headers, body) => {
  if (body && headers["Content-Type"] === "application/json") {
    body = JSON.stringify(body)
  } else if (
    body &&
    headers["Content-Type"] === "application/x-www-form-urlencoded"
  ) {
    body = new URLSearchParams(body).toString()
    console.log(body)
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body,
  })

  if (!response.ok) throw new Error(`${method} request to ${endpoint} failed`)

  return await response.json()
}

// Login function: Sending credentials as x-www-form-urlencoded
export const login = async (credentials) => {
  const headers = { "Content-Type": "application/x-www-form-urlencoded" }
  return await apiRequest("/auth/token", "POST", headers, credentials)
}

// Refresh token function
export const refreshToken = async (refreshToken) => {
  const headers = { "Content-Type": "application/json" }
  return await apiRequest("/auth/refresh", "POST", headers, {
    refresh_token: refreshToken,
  })
}

// Get user data function
export const getUserData = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  return await apiRequest("/users/me", "GET", headers, null)
}

export const fetchUserCatalogData = async (token) => {
  const headers = { Authorization: `Bearer ${token}` }
  return await apiRequest("/users/catalog", "GET", headers, null)
}
