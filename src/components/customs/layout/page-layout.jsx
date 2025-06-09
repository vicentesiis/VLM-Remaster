import PropTypes from "prop-types"
import React from "react"
import AddRegistroDialog from "../dialogs/add-registro-dialog"
import { H3 } from "@/components/ui/typography"
import { Roles } from "@/constants/appConstants"
import { useAuth } from "@/hooks"

const PageLayout = ({ title, children }) => {
  const { user } = useAuth()
  const role = user?.data?.role

  return (
    <div className="mx-auto max-w-screen-xl sm:p-4 xl:p-0">
      {/* --- Header + Buttons --- */}
      <div className="flex items-center justify-between px-2 py-3 sm:flex sm:px-0">
        <H3 className="text-primary">{title}</H3>
        {role === Roles.AGENT && <AddRegistroDialog />}
      </div>

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
