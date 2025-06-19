import PropTypes from "prop-types"
import React from "react"
import PageHeader from "./page-header"
import { componentPropsMap } from "@/routes/route-props"

const PageLayout = ({ routeKey, title, subtitle, children }) => {
  const mappedProps = componentPropsMap[routeKey] || {}

  const resolvedTitle = title ?? mappedProps.title
  const resolvedSubtitle = subtitle ?? mappedProps.subtitle

  return (
    <div className="relative mx-auto max-w-screen-xl sm:p-4 xl:p-0">
      <PageHeader title={resolvedTitle} subtitle={resolvedSubtitle} />
      {children}
    </div>
  )
}

PageLayout.propTypes = {
  routeKey: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
}

export default PageLayout
