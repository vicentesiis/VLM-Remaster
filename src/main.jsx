import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import { AuthProvider } from "./context/auth-context.jsx"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
