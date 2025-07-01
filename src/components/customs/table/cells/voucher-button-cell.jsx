import { DownloadIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { Button } from "@/components/ui"
import { shouldDisableVoucher } from "@/utils"

export function VoucherButton({ order, canCreateOrder, onClick }) {
  const disabled = shouldDisableVoucher(order, canCreateOrder)

  const handleClick = () => {
    if (!disabled) onClick?.(order)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={disabled}
      onClick={handleClick}
    >
      <DownloadIcon className="h-4 w-4" />
    </Button>
  )
}

VoucherButton.propTypes = {
  canCreateOrder: PropTypes.any,
  onClick: PropTypes.func,
  order: PropTypes.any,
}

export default VoucherButton
