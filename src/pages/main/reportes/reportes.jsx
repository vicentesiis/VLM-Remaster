import React from "react"
import { Link } from "react-router-dom"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { dropdownMenus } from "@/data/navbar-config"
import { useUserPermissions } from "@/hooks/useUserPermissions"

export const Reportes = () => {
  const { role } = useUserPermissions()

  const reportMenu = dropdownMenus.find((menu) => menu.title === "Reportes")

  if (!reportMenu) return null

  const allowedItems = reportMenu.items.filter((item) =>
    item.allowedRoutes.includes(role)
  )

  return (
    <PageLayout title="Reportes">
      <div className="grid gap-4 md:grid-cols-2">
        {allowedItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.to} to={item.to}>
              <Card className="transition-shadow duration-200 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-primary">{item.title}</CardTitle>
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

export default Reportes
