import { Button } from "@/components/ui/button"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import { ArrowUpRight } from "lucide-react"
import logo from "@/assets/logo.png"
import { Lead } from "@/components/ui/typography"

const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-background">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex lg:pl-6">
          <img src={logo} width={50} height={40} alt="Logo" />
          <Lead>Proyecto VLM</Lead>
        </div>
        <div className="flex px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {/* Desktop Menu */}
            <NavMenu className="hidden lg:block" />
          </div>

          <div className="hidden items-center justify-end gap-3 lg:block">
            <Button>Logout</Button>

            {/* Mobile Menu */}
          </div>
          <div className="lg:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
