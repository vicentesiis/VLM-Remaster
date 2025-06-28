import React from "react"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function SidebarToggle({ isOpen, setIsOpen }) {
  return (
    <div className="invisible absolute -right-[16px] top-[12px] z-50 lg:visible">
      <Button
        onClick={() => setIsOpen?.()}
        className="h-8 w-8 rounded-md"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform duration-700 ease-in-out",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  )
}
