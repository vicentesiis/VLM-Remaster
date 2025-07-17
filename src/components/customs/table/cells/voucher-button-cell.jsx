import { DownloadIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { Button } from "@/components/ui"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { shouldDisableVoucher } from "@/utils"

export function VoucherButton({ order, canCreateOrder, onClick, isLoading }) {
  const { isSuperAdmin, isAdmin } = useCurrentUser()

  const disabled =
    isSuperAdmin ||
    isAdmin ||
    shouldDisableVoucher(order, canCreateOrder) ||
    isLoading

  const handleClick = () => {
    if (!disabled) onClick?.(order)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={disabled}
      onClick={handleClick}
      isLoading={isLoading}
      showSpinnerText={false}
    >
      <DownloadIcon className="h-4 w-4" />
    </Button>
  )
}

VoucherButton.propTypes = {
  canCreateOrder: PropTypes.any,
  isLoading: PropTypes.any,
  onClick: PropTypes.func,
  order: PropTypes.any,
}

export default VoucherButton
