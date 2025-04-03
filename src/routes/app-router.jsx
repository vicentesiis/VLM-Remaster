import React from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./protected-route"
import { Login } from "@/pages"
// import Login from "@/pages/login"
import { Main } from "@/pages/main/main-page"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRouter
