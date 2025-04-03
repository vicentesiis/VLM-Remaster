import React from "react"
import { AuthProvider } from "@/context/auth-context"
import AppRouter from "@/routes/app-router"

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App