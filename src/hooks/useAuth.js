import { useContext } from "react"
import { Roles } from "@/constants/appConstants"
import { AuthContext } from "@/context/auth-context"

export const useAuth = () => useContext(AuthContext)

// Functions Helpers
export const useUserRole = () => useAuth().user?.data?.role || null

export const useIsSuperAdmin = () => useUserRole() === Roles.SUPER_ADMIN

export const useUserId = () => useAuth().user?.data?.id || null

export const useUserEmail = () => useAuth().user?.data?.email || null
