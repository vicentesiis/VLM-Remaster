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
import { cn } from "@/lib/utils"

export const NavMenu = (props) => {
  const location = useLocation()

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Button
              variant="ghost"
              className={cn("text-[15px] font-normal", {
                "bg-accent text-accent-foreground":
                  location.pathname.startsWith(item.to),
              })}
              asChild
            >
              <Link to={item.to}>{item.title}</Link>
            </Button>
          </NavigationMenuItem>
        ))}
        {dropdownMenus.map((menu) => (
          <NavigationMenuItem key={menu.title}>
            <NavigationMenuTrigger className="text-[15px] font-normal">
              {menu.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
            {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
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
