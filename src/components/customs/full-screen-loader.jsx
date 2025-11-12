import PropTypes from "prop-types"
import React from "react"
import { H3 } from "@/components/ui"

export const FullScreenLoader = ({ message = "Preparando contenido..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center">
      <div className="relative h-12 w-12 duration-500 animate-in fade-in md:h-16 md:w-16">
        <div className="h-12 w-12 animate-spin rounded-full border-8 border-primary border-t-transparent md:h-16 md:w-16" />
        <div className="absolute inset-0 animate-ping rounded-full border-4 border-primary/30 md:border-8" />
      </div>
      <H3 className="animate-fade-in mt-8 text-muted-foreground md:text-3xl">
        {message}
      </H3>
    </div>
  )
}

FullScreenLoader.propTypes = {
  message: PropTypes.string,
}

export default FullScreenLoader
