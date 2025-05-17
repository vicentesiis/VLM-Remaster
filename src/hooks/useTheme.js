import { useEffect, useState } from "react"

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("is_dark_mode") === "true"
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("is_dark_mode", isDark)
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return { isDark, toggleTheme }
}
