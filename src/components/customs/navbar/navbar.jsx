import React from "react"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import UserAvatarDropdown from "../user-avatar-dropwdown"
import logo from "@/assets/logo.png"
import { SearchWithSelect } from "@/components/customs/search-with-select"
import { Lead } from "@/components/ui/typography"

const Navbar = () => {
  return (
    <nav className="h-12 sm:h-16">
      <div className="mx-auto bg-background flex h-full items-center justify-between px-4 lg:px-0 xl:px-20">
        <div className="flex grow justify-between lg:justify-normal lg:gap-14 xl:gap-32">
          {/* Title + Logo */}
          <div className="flex w-[180px] items-center">
            <img src={logo} width={50} height={40} alt="Logo" />
            <Lead className="dark:text-white" >Proyecto VLM</Lead>
          </div>
          <div>
            {/* Desktop Menu */}
            <div className="flex items-center justify-center">
              <NavMenu className="hidden lg:block" />
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
        <div className="hidden gap-8 lg:flex">
          <SearchWithSelect />
          <UserAvatarDropdown />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
