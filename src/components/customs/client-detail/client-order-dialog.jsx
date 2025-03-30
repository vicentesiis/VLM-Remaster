import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CreditCard, CircleDollarSign } from "lucide-react" // Import the icons from lucide-react
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Import the custom RadioGroup components
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import AmmountRadioGroup from "@/components/customs/ammount-radio-group"
import {
  H1,
  H2,
  H3,
  H4,
  P,
  PLead,
  Lead,
  Large,
  Muted,
} from "@/components/ui/typography"

export const ClientOrderDialog = ({ open, handleOpen }) => {
  const [selectedValue, setSelectedValue] = useState(null)

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="flex h-[60%] w-full max-w-2xl flex-col sm:h-auto sm:p-10">
        <DialogHeader className="relative flex justify-between">
          <DialogTitle className="text-xl font-semibold">
            Nueva Órden
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <Lead className="mb-2 font-bold">Método de Pago</Lead>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <CircleDollarSign />
              <Label htmlFor="r1">
                <P className={"font-bold"}>Efectivo</P>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="r2" />
              <CreditCard />
              <Label htmlFor="r2">
                <P className={"font-bold"}>Transferencia</P>
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

export default ClientOrderDialog
