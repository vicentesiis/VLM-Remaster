import { Loader2 } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"

export function ButtonLoading({ isLoading, message, className, ...props }) {
  return (
    <Button
      className={`flex items-center justify-center gap-2 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {message ? message : "Cargando..."}
        </>
      ) : (
        props.children
      )}
    </Button>
  )
}
export default ButtonLoading
