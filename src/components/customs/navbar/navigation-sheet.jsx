import { Menu, ChevronDown } from "lucide-react"
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import OmniSearch from "./omnisearch"
import UserAvatarDropdown from "@/components/customs/user-avatar-dropwdown"
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
import { H2, H4, P } from "@/components/ui/typography"
import { menuItems, dropdownMenus } from "@/data/navbar-config"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { cn } from "@/lib/utils"

export const NavigationSheet = () => {
  const location = useLocation()
  const { role } = useCurrentUser()
  const [openMenu, setOpenMenu] = useState(null)
  const [open, setOpen] = useState(false)

  const isDropdownActive = (menu) => {
    return menu.items.some((subItem) =>
      location.pathname.startsWith(subItem.to)
    )
  }

  const filteredMenuItems = menuItems.filter((item) =>
    item.allowedRoutes.includes(role)
  )

  const filteredDropdownMenus = dropdownMenus
    .filter((menu) => menu.allowedRoutes.includes(role))
    .map((menu) => ({
      ...menu,
      items: menu.items.filter((item) => item.allowedRoutes.includes(role)),
    }))

  const handleLinkClick = () => {
    setOpen(false)
    setOpenMenu(null)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col dark:text-white">
        <div className="absolute right-4 top-4">
          <UserAvatarDropdown />
        </div>

        <SheetHeader>
          <H2>Modulos</H2>
        </SheetHeader>

        <div className="flex-1 space-y-3 overflow-y-auto">
          <OmniSearch />
          {filteredMenuItems.map((item) => (
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
              <H4 className={"text-lg font-medium"}>{item.title}</H4>
            </Link>
          ))}

          {/* Dropdowns */}
          {filteredDropdownMenus.map((menu) => {
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
