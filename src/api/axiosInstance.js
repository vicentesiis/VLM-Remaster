// src/api/axiosInstance.js
import axios from "axios"
import {
  getValidAccessToken,
  refreshAuthToken,
  logout,
} from "@/services/authService"

const API_URL = "https://vl-api-v6.onrender.com/api"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
})

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getValidAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle token refresh on 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshAuthToken()
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        logout()
        return Promise.reject(refreshError)
      }
    }
    console.log(error)
    return Promise.reject(error)
  }
)

export default axiosInstance
