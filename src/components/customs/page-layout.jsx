import PropTypes from "prop-types"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { H4 } from "@/components/ui/typography"

const PageLayout = ({ title, buttons, children }) => {
  const location = useLocation()
  const paths = location.pathname.split("/").filter(Boolean)

  return (
    <div className="mx-auto max-w-screen-xl">
      {/* --- Header + Buttons --- */}
      <div className="flex items-center">
        <H4 className="-mt-2 text-2xl font-bold">{title}</H4>
        <div className="flex sm:gap-2">{buttons}</div>
      </div>

      {/* --- Breadcrumb --- */}
      <Breadcrumb className="mb-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {paths.map((path, index) => {
            const to = "/" + paths.slice(0, index + 1).join("/")
            const isLast = index === paths.length - 1
            // Replace hyphens with spaces
            const formattedPath = decodeURIComponent(path).replace(/-/g, " ")

            return (
              <React.Fragment key={to}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="capitalize">
                      {formattedPath}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={to} className="capitalize">
                        {formattedPath}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* --- Content --- */}
      <div>{children}</div>
    </div>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.node,
  children: PropTypes.node.isRequired,
}

export default PageLayout
