import PropTypes from "prop-types"
import React from "react"
import RegistroDialog from "../dialogs/registro-dialog"
import { H3 } from "@/components/ui/typography"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const PageHeader = ({ title, subtitle }) => {
  const { isAgent } = useCurrentUser()

  return (
    <div className="flex items-center justify-between px-2 py-2 sm:flex">
      <div className="flex flex-row items-center gap-2">
        {title && <H3 className="text-lg text-primary sm:text-2xl">{title}</H3>}
        {subtitle && (
          <p className="font-bold text-muted-foreground sm:mt-1 sm:text-xl">
            {subtitle}
          </p>
        )}
      </div>
      {isAgent && <RegistroDialog mode="add" />}
    </div>
  )
}

PageHeader.propTypes = {
  subtitle: PropTypes.any,
  title: PropTypes.any,
}

export default PageHeader
