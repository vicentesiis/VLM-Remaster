import PropTypes from "prop-types"
import React from "react"
import RegistroDialog from "../dialogs/registro-dialog"
import { H3 } from "@/components/ui/typography"
import { useUserPermissions } from "@/hooks/useUserPermissions"

const PageLayout = ({ title, subtitle, children }) => {
  const { isAgent } = useUserPermissions()

  return (
    <div className="mx-auto max-w-screen-xl sm:p-4 xl:p-0">
      {/* --- Header + Buttons --- */}
      <div className="flex items-center justify-between px-2 py-2 sm:flex">
        <div className="flex flex-row items-center gap-2">
          <H3 className="text-lg text-primary sm:text-2xl">{title}</H3>
          {subtitle && (
            <p className="font-bold text-muted-foreground sm:mt-1 sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
        {isAgent && <RegistroDialog mode="add" />}
      </div>

      {/* --- Content --- */}
      {children}
    </div>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttons: PropTypes.node,
  children: PropTypes.node,
}

export default PageLayout
