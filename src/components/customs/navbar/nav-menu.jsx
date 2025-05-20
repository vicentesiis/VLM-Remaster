import PropTypes from "prop-types"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { menuItems, dropdownMenus } from "@/data/navbar-config"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

export const NavMenu = (props) => {
  const location = useLocation()
  const { currentRole } = useAuth()

  const filteredMenuItems = menuItems.filter((item) =>
    item.allowedRoutes.includes(currentRole)
  )

  const filteredDropdownMenus = dropdownMenus
    .filter((menu) => menu.allowedRoutes.includes(currentRole))
    .map((menu) => {
      const filteredItems = menu.items.filter((item) =>
        item.allowedRoutes.includes(currentRole)
      )
      const isActive = filteredItems.some((item) =>
        location.pathname.startsWith(item.to)
      )
      return {
        ...menu,
        items: filteredItems,
        isActive,
      }
    })

  const isMenuItemActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path)

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        {filteredMenuItems.map((item) => (
          <NavigationMenuItem key={item.title} className="ml-[-60px]">
            <Button
              variant="ghost"
              className="text-[15px] font-normal"
              asChild
              data-state={isMenuItemActive(item.to) ? "open" : undefined}
            >
              <Link to={item.to}>{item.title}</Link>
            </Button>
          </NavigationMenuItem>
        ))}
        {filteredDropdownMenus.map((menu) => (
          <NavigationMenuItem key={menu.title}>
            <NavigationMenuTrigger
              className="text-[15px] font-normal"
              data-state={menu.isActive ? "open" : undefined}
            >
              {menu.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                className={cn(
                  "gap-3 p-4 text-primary",
                  (menu.items.length === 1 ||
                    menu.items.length === 3 ||
                    menu.items.length === 5) &&
                    "flex flex-col lg:w-[450px]",
                  menu.items.length !== 1 &&
                    menu.items.length !== 3 &&
                    menu.items.length !== 5 &&
                    "grid w-[600px] sm:grid-cols-2"
                )}
              >
                {menu.items.map((subItem) => (
                  <ListItem
                    key={subItem.title}
                    title={subItem.title}
                    to={subItem.to}
                    icon={subItem.icon}
                    isActive={location.pathname.startsWith(subItem.to)}
                  >
                    {subItem.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(
  ({ className, title, to, children, icon: Icon, isActive, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={to}
            className={cn(
              "flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              isActive && "bg-accent text-accent-foreground",
              className
            )}
            {...props}
          >
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <div>
              <div className="text-sm font-semibold">{title}</div>
              <p className="text-sm text-muted-foreground">{children}</p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

NavMenu.propTypes = {
  props: PropTypes.object,
}

ListItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  icon: PropTypes.elementType,
  isActive: PropTypes.bool,
}

export default NavMenu
