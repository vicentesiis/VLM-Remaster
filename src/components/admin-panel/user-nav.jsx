import { LogOut, Moon, Sun } from "lucide-react"
import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useTheme } from "@/hooks/useTheme"

export function UserNav() {
  const { logoutMutation } = useAuth()
  const { user } = useCurrentUser()
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
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="#" alt="Avatar" />
            <AvatarFallback className="bg-transparent">
              {getAvatarInitials(user.name ?? "???")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name ?? "???"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.username ?? "???"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
          Cerrar sesion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
