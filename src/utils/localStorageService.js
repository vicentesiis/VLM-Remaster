const KEYS = {
  ACCESS_TOKEN: "access_token",
  USER: "user",
  DARK_MODE: "dark_mode",
}

export const localStorageService = {
  // Token
  getToken: () => localStorage.getItem(KEYS.ACCESS_TOKEN),
  setToken: (token) => localStorage.setItem(KEYS.ACCESS_TOKEN, token),
  clearToken: () => localStorage.removeItem(KEYS.ACCESS_TOKEN),

  // User (JSON stored)
  getUser: () => {
    try {
      const user = localStorage.getItem(KEYS.USER)
      return user ? JSON.parse(user) : null
    } catch (err) {
      return null
    }
  },
  setUser: (user) => localStorage.setItem(KEYS.USER, JSON.stringify(user)),
  clearUser: () => localStorage.removeItem(KEYS.USER),

  // Dark mode
  getDarkMode: () => localStorage.getItem(KEYS.DARK_MODE) === "true",
  setDarkMode: (enabled) =>
    localStorage.setItem(KEYS.DARK_MODE, String(enabled)),
  clearDarkMode: () => localStorage.removeItem(KEYS.DARK_MODE),

  // Clear all keys
  clearAll: () => {
    Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
  },
}
