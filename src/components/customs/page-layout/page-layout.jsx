import { UserPlusIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import RegistroDialog from "../dialogs/registro-dialog"
import NewNavbar from "@/components/admin-panel/navbar"
import { Button } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { componentPropsMap } from "@/routes/route-props"

const PageLayout = ({ routeKey, title, subtitle, children }) => {
  const { isAgent } = useCurrentUser()
  const mappedProps = componentPropsMap[routeKey] || {}

  const resolvedTitle = title ?? mappedProps.title
  const resolvedSubtitle = subtitle ?? mappedProps.subtitle

  const renderRegistroDialog = () => (
    <div className="fixed bottom-6 right-6 z-40">
      <RegistroDialog
        mode="add"
        trigger={
          <Button
            variant="add"
            size="icon"
            className="size-10 rounded-full lg:size-12 2xl:size-14"
          >
            <UserPlusIcon className="size-6" />
          </Button>
        }
      />
    </div>
  )

  return (
    <>
      <NewNavbar title={resolvedTitle} subtitle={resolvedSubtitle} />
      {isAgent && renderRegistroDialog()}
      <div className="relative mx-auto max-w-screen-2xl sm:px-10 sm:py-6">
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
