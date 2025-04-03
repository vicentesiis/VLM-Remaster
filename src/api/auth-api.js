const API_URL = "http://127.0.0.1:8000/api"

// Login function
export const login = async (credentials) => {
  const formBody = new URLSearchParams(credentials).toString() // Convert to x-www-form-urlencoded

  const response = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody,
  })

  if (!response.ok) throw new Error("Login failed")

  const data = await response.json()

  // Save tokens in localStorage
  localStorage.setItem("access_token", data.access_token)
  localStorage.setItem("refresh_token", data.refresh_token)

  return data // Returns the token or user data
}

// Refresh token function
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token")
  if (!refreshToken) throw new Error("No refresh token found")

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!response.ok) throw new Error("Failed to refresh token")

  const data = await response.json()

  // Update tokens in localStorage
  localStorage.setItem("access_token", data.access_token)
  localStorage.setItem("refresh_token", data.refresh_token)

  return data
}

// Get user information
export const getUser = async () => {
  let token = localStorage.getItem("access_token")

  if (!token) {
    throw new Error("No token found")
  }

  // Check if the token is expired (you can use a helper to decode JWT or check expiration time)
  const isTokenExpired = checkTokenExpiration(token)
  if (isTokenExpired) {
    try {
      // Attempt to refresh the token
      await refreshToken()
      token = localStorage.getItem("access_token") // Get the new token after refreshing
    } catch (error) {
      throw new Error("Unable to refresh token. Please login again.")
    }
  }

  const response = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) throw new Error("Failed to fetch user")
  const data = await response.json() // Parse the stream into a JSON object
  return data
}

// Logout function
export const logout = async () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
}

// Helper function to check if the token is expired
const checkTokenExpiration = (token) => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]))
    const expirationTime = decodedToken.exp * 1000 // Convert to milliseconds

    // Calculate remaining time
    const remainingTime = expirationTime - Date.now()
    const remainingSeconds = Math.floor(remainingTime / 1000)
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60

    // Log the remaining time
    console.log(`Faltan ${minutes} minutos y ${seconds} segundos hasta que el token expire`)

    return Date.now() > expirationTime
  } catch (error) {
    return true // If we can't decode the token, consider it expired
  }
}