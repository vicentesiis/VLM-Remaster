import React from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./protected-route"
import { Login } from "@/pages"
import { MainPage } from "@/pages/main/main-page"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRouter
