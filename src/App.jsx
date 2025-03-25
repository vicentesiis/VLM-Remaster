import React from "react"
import { Routes, Route } from "react-router-dom"
import { Login } from "@/pages/login/login"
import { MainRoutes } from "@/pages/main/main-page" // Import MainRoutes

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<MainRoutes />} /> {/* Fix: Use MainRoutes */}
    </Routes>
  )
}

export default App
