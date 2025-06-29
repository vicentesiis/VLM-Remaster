import { Roles } from "@/constants"
import { dropdownMenus, menuItems } from "@/data"

export function getSidebarMenu(role, pathname) {
  const getFirstSegment = (path) => path.split("/")[1] || ""

  const baseMenus = menuItems
    .filter((item) => item.allowedRoutes.includes(role))
    .map((item) => ({
      label: item.title,
      href: item.to,
      icon: item.icon,
      active: pathname.startsWith(item.to),
    }))

  const dropdowns = dropdownMenus
    .filter((group) => group.allowedRoutes.includes(role))
    .map((group) => {
      const submenus = group.items
        .filter((item) => item.allowedRoutes.includes(role))
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
