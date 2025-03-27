import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Main from "@/pages/main/main-page"
import { Login } from "@/pages"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Main />} />
    </Routes>
  )
}

export default App
