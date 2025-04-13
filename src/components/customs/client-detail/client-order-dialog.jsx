import { CreditCard, CircleDollarSign } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import AmmountRadioGroup from "@/components/customs/ammount-radio-group"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { P, Lead, H3 } from "@/components/ui/typography"

export const ClientOrderDialog = ({ open, handleOpen }) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="flex w-full max-w-2xl flex-col sm:h-auto sm:p-10">
        <DialogHeader>
          <DialogTitle>
            <H3>Nueva Órden</H3>
            <Separator />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Lead className="mb-2 font-bold">Método de Pago</Lead>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <CircleDollarSign />
              <Label className="font-bold" htmlFor="r1">
                Efectivo
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="r2" />
              <CreditCard />
              <Label className="font-bold" htmlFor="r2">
                Transferencia
              </Label>
            </div>
          </RadioGroup>
          <div className="-space-y-1">
            <Lead className="mt-2 font-bold">Especifica el monto:</Lead>
            <P className="">Si no conoces el monto, acude con tu supervisor.</P>
            <AmmountRadioGroup className="pt-4" />
          </div>
        </DialogDescription>
        <DialogFooter className={"mt-44 sm:mt-10"}>
          <Button appearance="primary" size="lg">
            Crear Órden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

ClientOrderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
}

export default ClientOrderDialog
