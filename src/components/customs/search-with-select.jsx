import {
  UserIcon,
  CheckSquareIcon,
  WalletCardsIcon,
  SearchIcon,
} from "lucide-react"
import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const options = [
  {
    label: "Registros",
    value: "Registros",
    icon: <UserIcon className="mr-1 h-4 w-4" />,
  },
  {
    label: "Vacantes",
    value: "Vacantes",
    icon: <CheckSquareIcon className="mr-1 h-4 w-4" />,
  },
  {
    label: "Ordenes",
    value: "Ordenes",
    icon: <WalletCardsIcon className="mr-1 h-4 w-4" />,
  },
]

export function SearchWithSelect() {
  const [selectedOption, setSelectedOption] = useState("Registros")
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef(null)

  const handleSelectChange = (value) => {
    setSelectedOption(value)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchClick = () => {
    console.log(`Searching ${selectedOption}:`, searchQuery)
  }

  return (
    <div className="w-full sm:w-[350px]">
      <div
        className={`flex flex-col gap-2 rounded-md border border-input p-2 sm:flex-row sm:items-center sm:gap-0 sm:p-0`}
      >
        <Select defaultValue="Registros" onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full border focus:ring-0 sm:w-[200px] sm:rounded-r-none sm:border-none">
            <SelectValue placeholder="Selecciona" />
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

        <Input
          ref={inputRef}
          placeholder={`Buscar por ID`}
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full font-bold focus:ring-1 focus:ring-ring sm:rounded "
        />

        <Button
          variant="default"
          onClick={handleSearchClick}
          className="ml-auto w-16 sm:w-auto sm:rounded-l-none"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default SearchWithSelect
