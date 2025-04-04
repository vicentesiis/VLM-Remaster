import React from "react"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"
import { Lead } from "@/components/ui/typography"
import { useAuth } from "@/hooks/useAuth"
import UserAvatarDropdown from "../user-avatar-dropwdown"

const Navbar = () => {
  const { logoutMutation } = useAuth()

  return (
    <nav className="h-16 border-b">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-16">
        <div className="flex lg:pl-6">
          <img src={logo} width={50} height={40} alt="Logo" />
          <Lead>Proyecto VLM</Lead>
        </div>
        <div className="flex px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {/* Desktop Menu */}
            <NavMenu className="hidden lg:block" />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <NavigationSheet />
          </div>
        </div>
        <UserAvatarDropdown />
      </div>
    </nav>
  )
}

export default Navbar
