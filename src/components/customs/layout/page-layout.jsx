import PropTypes from "prop-types"
import React from "react"
import AddRegistroDialog from "../dialogs/add-registro-dialog"
import { H3 } from "@/components/ui/typography"
import { Roles } from "@/constants/appConstants"
import { useAuth } from "@/hooks"

const PageLayout = ({ title, subtitle, children }) => {
  const { user } = useAuth()
  const role = user?.data?.role

  return (
    <div className="mx-auto max-w-screen-xl sm:p-4 xl:p-0">
      {/* --- Header + Buttons --- */}
      <div className="flex items-center justify-between px-2 py-2 sm:flex">
        <div className="flex flex-row items-center gap-2">
          <H3 className="text-primary">{title}</H3>
          {subtitle && (
            <p className="text-xl font-bold text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {role === Roles.AGENT && <AddRegistroDialog />}
      </div>

      {/* --- Content --- */}
      {children}
    </div>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  buttons: PropTypes.node,
  children: PropTypes.node.isRequired,
}

export default PageLayout
