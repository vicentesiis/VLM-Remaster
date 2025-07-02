import { SearchIcon } from "lucide-react"
import { UserIcon, BriefcaseIcon, FileTextIcon } from "lucide-react"
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
    icon: <UserIcon className="mr-1 h-4 w-4" />,
  },
  {
    label: "Vacantes",
    value: "Vacantes",
    icon: <BriefcaseIcon className="mr-1 h-4 w-4" />,
  },
  {
    label: "Pagos",
    value: "Ordenes",
    icon: <FileTextIcon className="mr-1 h-4 w-4" />,
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
    <div className="hidden w-full sm:block sm:w-[400px] lg:w-[500px]">
      <div className="flex flex-col gap-2 rounded-md border border-input p-2 sm:flex-row sm:items-center sm:gap-0 sm:p-0">
        <Select defaultValue={selectedOption} onValueChange={setSelectedOption}>
          <SelectTrigger className="w-full border focus:ring-0 sm:w-[120px] sm:rounded-r-none sm:border-none">
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

        <div className="relative w-full sm:w-[400px]">
          <Input
            ref={inputRef}
            placeholder={
              selectedOption === "Ordenes"
                ? isFocused
                  ? "Ingresa el número de la referencia"
                  : "Buscar por referencia..."
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
            className="w-full border-0 pr-10 font-mono sm:rounded"
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
