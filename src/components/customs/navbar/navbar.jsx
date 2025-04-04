import React from "react"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import UserAvatarDropdown from "../user-avatar-dropwdown"
import logo from "@/assets/logo.png"
import { Lead } from "@/components/ui/typography"

const Navbar = () => {
  return (
    <nav className="h-16 border-b">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-16">
        <div className="flex lg:pl-6">
          <img src={logo} width={50} height={40} alt="Logo" />
          <Lead>Proyecto VLM</Lead>
        </div>
        <div className="flex px-4 sm:px-6 lg:px-8">
          {/* Desktop Menu */}
          <div className="flex items-center justify-center">
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
