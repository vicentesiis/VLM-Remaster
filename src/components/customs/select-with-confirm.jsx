import { SaveIcon, XIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Button } from "../ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { recordStatusesLabel } from "@/constants/appConstants"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { extractAndMapToOptions } from "@/utils/utils"

export function SelectWithConfirm({ currentOption }) {
  const { recordStatuses } = useCodexData()

  const getStatusLabel = (option) => recordStatusesLabel[option] ?? option

  const recordStatusesOptions = extractAndMapToOptions(
    recordStatuses,
    getStatusLabel
  )

  const [initial, setInitial] = useState(currentOption ?? "")
  const [selected, setSelected] = useState(currentOption ?? "")

  useEffect(() => {
    if (!initial && currentOption) {
      setInitial(currentOption)
      setSelected(currentOption)
    }
  }, [currentOption, initial])

  const hasChanged = selected !== initial

  const handleClear = (e) => {
    e.stopPropagation()
    setSelected(initial)
  }

  return (
    <div className="ml-auto mt-2 flex gap-2 sm:mt-0">
      {hasChanged && (
        <Button
          variant="edit"
          onClick={() => {
            console.log("Confirmed:", selected)
            setInitial(selected)
          }}
          disabled={!selected}
        >
          <SaveIcon className="size-5" />
          Actualizar
        </Button>
      )}
      <Select
        value={selected}
        onValueChange={setSelected}
        disabled={!recordStatuses}
        className="w-full"
      >
        {/* Wrap SelectTrigger in relative container */}
        <div className="relative sm:w-full">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          {/* Reset button positioned absolutely inside trigger */}
          {hasChanged && (
            <Button
              size="mini"
              variant="outline"
              onClick={handleClear}
              className="absolute -right-3 -top-3"
            >
              <XIcon />
            </Button>
          )}
        </div>

        <SelectContent>
          {recordStatusesOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
