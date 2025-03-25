import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { H3 } from "@/components/ui/typography"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils" // Helper function for classnames
import logo from "@/assets/logo.png"

export function Navbar() {
  const [openNav, setOpenNav] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false)
      }
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  function NavButton({ name, path }) {
    const isActive = location.pathname.includes(path)

    return (
      <Link to={`/${path}`} className="w-full">
        <Button variant={isActive ? "default" : "ghost"} className="w-full">
          {name}
        </Button>
      </Link>
    )
  }

  function NavList({ className }) {
    return (
      <div
        className={cn("flex flex-col gap-2 md:flex-row md:gap-4", className)}
      >
        <NavButton name="Tareas" path="tareas" />
        <NavButton name="Clientes" path="clientes" />
        <NavButton name="Órdenes" path="ordenes" />
        <NavButton name="Reportes" path="reportes" />
        <NavButton name="Info" path="info" />
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-md">
      <div className="flex items-center justify-between p-4 md:px-8">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <img src={logo} width={40} height={40} alt="Logo" />
          <H3>Proyecto VLM</H3>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:flex">
          <NavList />
          <Button variant="outline">Hola Agente</Button>
        </nav>

        {/* Mobile Menu (Drawer) */}
        <Sheet open={openNav} onOpenChange={setOpenNav}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              ☰
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <NavList className="flex flex-col gap-4" />
            <Button variant="outline" className="mt-4 w-full">
              Hola Agente
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar
