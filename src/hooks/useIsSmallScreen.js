import { useState, useEffect } from "react"

export const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640) // 640px breakpoint for small screen
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check on initial load

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isSmallScreen
}

export default useIsSmallScreen
