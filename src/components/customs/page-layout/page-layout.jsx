import PropTypes from "prop-types"
import React from "react"
import RegistroDialog from "../dialogs/registro-dialog"
import NewNavbar from "@/components/admin-panel/navbar"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { componentPropsMap } from "@/routes/route-props"

const PageLayout = ({ routeKey, title, subtitle, children }) => {
  const { isAgent } = useCurrentUser()
  const mappedProps = componentPropsMap[routeKey] || {}

  const resolvedTitle = title ?? mappedProps.title
  const resolvedSubtitle = subtitle ?? mappedProps.subtitle

  return (
    <>
      <NewNavbar title={resolvedTitle} subtitle={resolvedSubtitle} />
      {isAgent && (
        <div className="fixed bottom-4 right-4 z-50">
          <RegistroDialog mode="add" />
        </div>
      )}
      <div className="relative mx-auto max-w-screen-xl px-4 py-8">
        {children}
      </div>
    </>
  )
}

PageLayout.propTypes = {
  routeKey: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
}

export default PageLayout
