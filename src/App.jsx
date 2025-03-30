import React from "react"
import { Routes, Route } from "react-router-dom"
import { Login } from "@/pages"
import Main from "@/pages/main/main-page"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Main />} />
    </Routes>
  )
}

export default App
