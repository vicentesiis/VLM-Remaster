import { SearchIcon } from "lucide-react"
import { Briefcase, ClipboardList, CreditCard } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OrderDescriptionDialog } from "./dialogs/order-description-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchById } from "@/hooks/useSearchById"

const options = [
  {
    label: "Registros",
    value: "Registros",
    icon: <ClipboardList className="mr-1 h-4 w-4" />,
  },
  {
    label: "Vacantes",
    value: "Vacantes",
    icon: <Briefcase className="mr-1 h-4 w-4" />,
  },
  {
    label: "Pagos",
    value: "Ordenes",
    icon: <CreditCard className="mr-1 h-4 w-4" />,
  },
]

export function OmniSearch() {
  const {
    selectedOption,
    setSelectedOption,
    searchQuery,
    setSearchQuery,
    inputRef,
    handleSearchClick,
    result,
    isLoading,
  } = useSearchById()

  const navigate = useNavigate()
  const [isFocused, setIsFocused] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    if (result?.redirectPath) {
      navigate(result.redirectPath)
    }

    if (result?.showModal && result?.data) {
      setSelectedOrder(result.data?.data)
      setOpenDialog(true)
    }
  }, [result])

  return (
    <div className="w-full lg:block lg:w-[400px] xl:w-[500px]">
      <div className="flex flex-col gap-2 rounded-md border border-input p-2 lg:flex-row lg:items-center lg:gap-0 lg:p-0">
        <Select defaultValue={selectedOption} onValueChange={setSelectedOption}>
          <SelectTrigger className="w-full border focus:ring-0 lg:w-[120px] lg:rounded-r-none lg:border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center">
                  {option.icon}
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative w-full lg:w-[400px]">
          <Input
            ref={inputRef}
            placeholder={
              selectedOption === "Ordenes"
                ? isFocused
                  ? "Ingresa el número de la referencia"
                  : "Buscar por referencia..."
                : selectedOption === "Registros"
                  ? isFocused
                    ? "ID, email, teléfono, CURP o pasaporte"
                    : "Buscar por identificador..."
                  : isFocused
                    ? "Ingresa el ID"
                    : "Buscar por ID..."
            }
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value.trim())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSearchClick()
              }
            }}
            className="w-full border-0 pr-10 font-mono lg:rounded"
          />

          <Button
            onClick={handleSearchClick}
            showSpinnerText={false}
            isLoading={isLoading}
            size="sm"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1"
            aria-label="Search"
          >
            <SearchIcon className="text-foreground" />
          </Button>
        </div>
      </div>

      <OrderDescriptionDialog
        order={selectedOrder}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </div>
  )
}

export default OmniSearch
