import { Menu, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { H2, H3, H4, P, PLead } from "@/components/ui/typography"
import { menuItems, dropdownMenus } from "@/data/navbar-config"
import { cn } from "@/lib/utils"

export const NavigationSheet = () => {
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState(null)
  const [open, setOpen] = useState(false) // control Sheet state
  const isDropdownActive = (menu) => {
    return menu.items.some((subItem) =>
      location.pathname.startsWith(subItem.to)
    )
  }

  const handleLinkClick = () => {
    setOpen(false) // dismiss sheet
    setOpenMenu(null) // collapse dropdowns
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <H2>Modulos</H2>
        </SheetHeader>

        {/* Scrollable */}
        <div className="space-y-3 overflow-y-auto text-base">
          {/* Plain Items */}
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              onClick={handleLinkClick}
              className={cn(
                "block rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground",
                location.pathname.startsWith(item.to) &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <H4>{item.title}</H4>
            </Link>
          ))}

          {/* Dropdowns */}
          {dropdownMenus.map((menu) => {
            const isActive = isDropdownActive(menu)
            return (
              <Collapsible
                key={menu.title}
                open={openMenu === menu.title}
                onOpenChange={(open) => setOpenMenu(open ? menu.title : null)}
              >
                <CollapsibleTrigger
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-2 py-2 font-bold transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <H4>{menu.title}</H4>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openMenu === menu.title && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="ml-1 mt-2 space-y-2 border-l pl-4">
                    {menu.items.map((subItem) => (
                      <li key={subItem.title}>
                        <Link
                          to={subItem.to}
                          onClick={handleLinkClick}
                          className={cn(
                            "flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground",
                            location.pathname.startsWith(subItem.to) &&
                              "bg-accent text-accent-foreground"
                          )}
                        >
                          <P>{subItem.title}</P>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
