// components/ui/FullScreenLoader.jsx
import React from "react"
import { H1 } from "@/components/ui"

export const FullScreenLoader = ({ message = "Cargando Información Base..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-center">
      <div className="relative h-20 w-20 animate-in fade-in duration-500">
        <div className="h-20 w-20 animate-spin rounded-full border-8 border-primary border-t-transparent" />
        <div className="absolute inset-0 animate-ping rounded-full border-8 border-primary/30" />
      </div>
      <H1 className="animate-fade-in mt-16 text-muted-foreground font-normal">{message}</H1>
    </div>
  )
}

export default FullScreenLoader
