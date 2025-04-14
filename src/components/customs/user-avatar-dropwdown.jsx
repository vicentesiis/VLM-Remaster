import { LogOut, Settings, User } from "lucide-react"
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
import { useAuth } from "@/hooks/useAuth" // Assuming you have useAuth for getting user info or handle logout
import { P } from "../ui"

export default function UserAvatarDropdown() {
  const { logoutMutation, user } = useAuth() // Assuming logout function from useAuth hook

  // Function to get the first two letters of the user's name
  const getAvatarInitials = (fullName) => {
    if (!fullName) return "" // Guard clause to prevent errors if name is undefined or empty

    const nameParts = fullName.split(" ")
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
      )
    } else {
      return nameParts[0]?.charAt(0).toUpperCase() || "" // In case there's only one word
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-[2px] focus:ring-primary focus:ring-offset-2">
        <Avatar>
          {/* Use the initials derived from the user's name */}
          <AvatarFallback>{getAvatarInitials(user?.data?.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hola!, {user?.data.name}</DropdownMenuLabel>
        <DropdownMenuItem>
          <Settings className="h-4 w-4" /> Ajustes
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-4 w-4" /> Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
