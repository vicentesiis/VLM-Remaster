import React from "react"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-4 text-white">Sidebar Content</aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* This renders the child routes */}
      </main>
    </div>
  )
}

export default DashboardLayout
