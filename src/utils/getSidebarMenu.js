import { Roles } from "@/constants"
import { dropdownMenus, menuItems } from "@/data"

export function getSidebarMenu(role, pathname, isLeader = false) {
  const isAllowed = (allowedRoles) => {
    if (!allowedRoles) return true
    return allowedRoles.some(
      (allowed) => allowed === role || (allowed === Roles.LEADER && isLeader)
    )
  }

  const baseMenus = menuItems
    .filter((item) => isAllowed(item.allowedRoutes))
    .map((item) => ({
      label: item.title,
      href: item.to,
      icon: item.icon,
      active: pathname.startsWith(item.to),
    }))

  const dropdowns = dropdownMenus
    .filter((group) => isAllowed(group.allowedRoutes))
    .map((group) => {
      const submenus = group.items
        .filter((item) => isAllowed(item.allowedRoutes))
        .map((item) => ({
          label: item.title,
          href: item.to,
          icon: item.icon,
          active: pathname.startsWith(item.to),
        }))

      return {
        groupLabel: group.title,
        menus: submenus,
      }
    })

  const grouped = dropdowns.length > 0 ? dropdowns : []
  const topLevel =
    baseMenus.length > 0 ? [{ groupLabel: "", menus: baseMenus }] : []

  return [...topLevel, ...grouped]
}

export default getSidebarMenu
