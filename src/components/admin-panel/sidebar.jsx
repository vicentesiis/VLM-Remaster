import React from "react"
import { Link } from "react-router-dom"
import logo from "@/assets/logo.png"
import { Menu } from "@/components/admin-panel/menu"
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/hooks/use-sidebar"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x)
  if (!sidebar) return null
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform duration-300 ease-in-out",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link to="/registros" className="mr-auto flex">
            <img src={logo} width={40} alt="Logo" />
            <h1
              className={cn(
                "whitespace-nowrap text-lg font-bold text-black transition-[transform,opacity,display] duration-300 ease-in-out dark:text-white",
                !getOpenState()
                  ? "hidden -translate-x-96 opacity-0"
                  : "translate-x-0 opacity-100"
              )}
            >
              NorthEntry
            </h1>
          </Link>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  )
}
