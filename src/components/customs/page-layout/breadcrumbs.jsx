import React from "react"
import { useLocation } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const Breadcrumbs = () => {
  const location = useLocation()
  const paths = location.pathname.split("/").filter(Boolean)

  return (
    <Breadcrumb className="mb-2 hidden px-2 sm:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <a href="/registros">Registros</a>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.slice(1).map((path, index) => {
          const formattedPath = decodeURIComponent(path).replace(/-/g, " ")
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {formattedPath}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
