import React from "react"
import { Link } from "react-router-dom"
import PageLayout from "@/components/customs/layout/page-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { menuItems, dropdownMenus } from "@/data/navbar-config"
import { useAuth } from "@/hooks/useAuth"

export const Home = () => {
  const { currentRole } = useAuth()

  // Filter top-level menu items
  const allowedMenuItems = menuItems.filter((item) =>
    item.allowedRoutes.includes(currentRole)
  )

  // Filter dropdowns by role (but only show their titles, not inner items)
  const allowedDropdownMenus = dropdownMenus.filter((menu) =>
    menu.allowedRoutes.includes(currentRole)
  )

  // Combine both
  const combinedItems = [
    ...allowedMenuItems.map((item) => ({
      title: item.title,
      to: item.to,
      description: "",
      icon: item.icon,
    })),
    ...allowedDropdownMenus.map((menu) => ({
      title: menu.title,
      to: "#", // optional: set to "#" or to a generic route
      description: "",
      icon: menu.icon, // optional: you can define icons for these menus if needed
    })),
  ]

  return (
    <PageLayout title="Bienvenido">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
        {combinedItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.title} to={item.to}>
              <Card className="transition-shadow duration-200 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-3">
                  {Icon && <Icon className="h-8 w-8 text-primary" />}
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </PageLayout>
  )
}

export default Home
