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
import { H3 } from "@/components/ui/typography"

const PageLayout = ({ title, buttons, children }) => {
  const location = useLocation()
  const paths = location.pathname.split("/").filter(Boolean)

  return (
    <div className="mx-auto max-w-screen-xl pb-24 sm:p-4 xl:p-0">
      {/* --- Header + Buttons --- */}
      <div className="hidden items-center sm:block pb-2">
        <H3 className="-mt-2 text-primary">{title}</H3>
      </div>

      {/* --- Breadcrumb --- */}
      {/* <Breadcrumb className="mb-3 hidden sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/registros">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {paths.map((path, index) => {
            const to = "/" + paths.slice(0, index + 1).join("/")
            const isLast = index === paths.length - 1
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
      </Breadcrumb> */}

      {/* --- Content --- */}
      {children}
    </div>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.node,
  children: PropTypes.node.isRequired,
}

export default PageLayout
