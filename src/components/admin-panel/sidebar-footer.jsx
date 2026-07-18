import { LogOut } from "lucide-react"
import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuth } from "@/hooks/useAuth"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { cn } from "@/lib/utils"

const ROLE_LABELS = {
  super_admin: "Super admin",
  admin: "Admin",
  agent: "Agente",
  leader: "Líder",
}

const getAvatarInitials = (fullName) => {
  if (!fullName) return ""
  const parts = fullName.split(" ")
  if (parts.length > 1) {
    return (
      parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase()
    )
  }
  return parts[0]?.charAt(0).toUpperCase() || ""
}

export function SidebarFooter({ isOpen }) {
  const { logoutMutation } = useAuth()
  const { user, role } = useCurrentUser()

  const initials = getAvatarInitials(user.name)
  const roleLabel = ROLE_LABELS[role] ?? role ?? ""

  return (
    <div
      className={cn(
        "mt-2 flex shrink-0 items-center gap-2 border-t px-2 pt-3",
        isOpen ? "justify-between" : "justify-center"
      )}
    >
      {isOpen ? (
        <>
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src="#" alt="Avatar" />
              <AvatarFallback className="bg-transparent text-xs font-semibold">
                {initials || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-medium">
                {user.name ?? "Invitado"}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {roleLabel}
              </span>
            </div>
          </div>
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => logoutMutation.mutate()}
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Cerrar sesión</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Cerrar sesión"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent text-xs font-semibold">
                    {initials || "?"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="flex flex-col">
                <span className="font-medium">{user.name ?? "Invitado"}</span>
                {roleLabel && (
                  <span className="text-xs text-muted-foreground">
                    {roleLabel}
                  </span>
                )}
                <span className="mt-1 text-xs">Cerrar sesión</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
