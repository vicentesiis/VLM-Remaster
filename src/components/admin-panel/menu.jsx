import React from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"

import { useCurrentUser } from "@/hooks/useCurrentUser"
import { cn } from "@/lib/utils"
import { getSidebarMenu } from "@/utils/getSidebarMenu"

export function Menu({ isOpen }) {
  const location = useLocation()
  const { role } = useCurrentUser()
  const pathname = location.pathname

  const menuList = getSidebarMenu(role, pathname)

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li key={index} className={cn("w-full", groupLabel ? "pt-5" : "")}>
              {isOpen && groupLabel && (
                <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                  {groupLabel}
                </p>
              )}

              {menus.map(({ href, label, icon: Icon, active }, index) => (
                <div className="w-full" key={index}>
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={active ? "secondary" : "ghost"}
                          className="mb-1 h-10 w-full justify-start"
                          asChild
                        >
                          <Link to={href}>
                            <span
                              className={cn(isOpen === false ? "" : "mr-4")}
                            >
                              <Icon className="size-5" />
                            </span>
                            <p
                              className={cn(
                                "max-w-[200px] truncate",
                                isOpen === false
                                  ? "-translate-x-96 opacity-0"
                                  : "translate-x-0 opacity-100"
                              )}
                            >
                              {label}
                            </p>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      {isOpen === false && (
                        <TooltipContent side="right">{label}</TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  )
}

export default Menu
