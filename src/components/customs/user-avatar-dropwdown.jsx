import { LogOut, Moon, Settings, Sun, User } from "lucide-react"
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"

export function UserAvatarDropdown() {
  const { logoutMutation, user } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  const getAvatarInitials = (fullName) => {
    if (!fullName) return ""
    const nameParts = fullName.split(" ")
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
      )
    } else {
      return nameParts[0]?.charAt(0).toUpperCase() || ""
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-[2px] focus:ring-primary focus:ring-offset-2">
        <Avatar>
          <AvatarFallback>{getAvatarInitials(user?.data?.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Hola!, {user?.data.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={toggleTheme}>
          {isDark ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Modo claro
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Modo oscuro
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Ajustes
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatarDropdown
