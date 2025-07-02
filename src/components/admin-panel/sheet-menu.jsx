import { MenuIcon, PanelsTopLeft } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"
import logo from "@/assets/logo.png"

import { Menu } from "@/components/admin-panel/menu"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button
            className="flex items-center justify-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link to="/registros" className="flex items-center">
              <img src={logo} width={40} alt="Logo" />
              <SheetTitle className="text-lg font-bold">NorthEntry</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}
