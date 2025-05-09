import { login, refreshToken } from "@/api/api"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

/**
 * @typedef {Object} AuthTokens
 * @property {string} access_token
 * @property {string} refresh_token
 */

/**
 * Save tokens to localStorage
 * @param {AuthTokens} tokens
 */
const storeTokens = ({ access_token, refresh_token }) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
}

/**
 * Get access token from localStorage
 * @returns {string|null}
 */
const getStoredAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

/**
 * Get refresh token from localStorage
 * @returns {string|null}
 */
const getStoredRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

/**
 * @param {string} token
 * @returns {boolean}
 */
const isTokenExpired = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]))
    return Date.now() > exp * 1000
  } catch {
    return true
  }
}

/**
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<AuthTokens>}
 */
export const loginUser = async (credentials) => {
  const tokens = await login(credentials)
  storeTokens(tokens)
  return tokens
}

/**
 * Refresh the access token using stored refresh token
 * @returns {Promise<string>} New access token
 */
export const refreshAuthToken = async () => {
  const refresh_token = getStoredRefreshToken()
  if (!refresh_token) throw new Error("No refresh token found")

  const tokens = await refreshToken(refresh_token)
  storeTokens(tokens)
  return tokens.access_token
}

/**
 * Get a valid access token (refresh if needed)
 * @returns {Promise<string>}
 */
export const getValidAccessToken = async () => {
  let token = getStoredAccessToken()
  if (!token || isTokenExpired(token)) {
    token = await refreshAuthToken()
  }
  return token
}

/**
 * Clear stored tokens
 */
export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}