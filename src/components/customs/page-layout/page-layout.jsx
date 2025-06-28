import PropTypes from "prop-types"
import React from "react"
import PageHeader from "./page-header"
import { componentPropsMap } from "@/routes/route-props"
import RegistroDialog from "../dialogs/registro-dialog"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const PageLayout = ({ routeKey, title, subtitle, children }) => {
  const { isAgent } = useCurrentUser()
  const mappedProps = componentPropsMap[routeKey] || {}

  const resolvedTitle = title ?? mappedProps.title
  const resolvedSubtitle = subtitle ?? mappedProps.subtitle

  return (
    <div className="relative mx-auto max-w-screen-xl py-8">
      {/* <PageHeader title={resolvedTitle} subtitle={resolvedSubtitle} /> */}
      {/* {isAgent && <RegistroDialog mode="add" />} */}
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
