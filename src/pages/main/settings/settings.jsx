import React from "react"
import { Link } from "react-router-dom"
import PageLayout from "@/components/customs/layout/page-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { dropdownMenus } from "@/data/navbar-config"
import { useAuth } from "@/hooks/useAuth"

export const Settings = () => {
  const { currentRole } = useAuth()

  const settingsMenu = dropdownMenus.find((menu) => menu.title === "Ajustes")

  if (!settingsMenu) return null

  const allowedItems = settingsMenu.items.filter((item) =>
    item.allowedRoutes.includes(currentRole)
  )

  return (
    <PageLayout title="Ajustes del Sistema">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allowedItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.to} to={item.to}>
              <Card className="transition-shadow duration-200 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
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

export default Settings
