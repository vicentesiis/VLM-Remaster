import { SaveIcon, XIcon } from "lucide-react"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Button } from "../ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AGENT_ALLOWED_STATUS_LIST,
  NEXT_STATUS_MAP,
  NEXT_STATUS_MAP_FOR_ADMIN,
  RECORD_STATUSES_LABEL,
} from "@/constants"
import { useCodexData } from "@/hooks/queries/useCodexData"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { mapToOptions } from "@/utils/utils"

export function SelectUpdateRegistroStatus({ currentOption, onConfirm }) {
  const { recordStatuses } = useCodexData()
  const { isAgent, isAdmin } = useCurrentUser()

  const getStatusLabel = (option) => RECORD_STATUSES_LABEL[option] ?? option

  const recordStatusesOptions = mapToOptions(
    recordStatuses.data,
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

  const [localLoading, setLocalLoading] = useState(false)

  const handleConfirm = async () => {
    setLocalLoading(true)
    try {
      await onConfirm?.(selected)
      setInitial(selected)
    } catch (error) {
      console.error("Error confirming status update:", error)
    } finally {
      setLocalLoading(false)
    }
  }

  const isDisabled = (status) => {
    if (isAdmin) {
      const adminNextStatuses = NEXT_STATUS_MAP_FOR_ADMIN[initial] ?? []
      return !adminNextStatuses.includes(status)
    }

    const nextStatuses = NEXT_STATUS_MAP[initial] ?? []
    const notInNext = !nextStatuses.includes(status)
    const agentNotAllowed =
      isAgent && !AGENT_ALLOWED_STATUS_LIST.includes(status)

    return notInNext || agentNotAllowed
  }

  return (
    <div className="ml-auto mt-2 flex gap-2 sm:mt-0">
      {hasChanged && (
        <Button variant="edit" onClick={handleConfirm} isLoading={localLoading}>
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
        <div className="relative sm:w-full">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

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
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={isDisabled(option.value)}
              title={
                isDisabled(option.value)
                  ? "Sin permisos para seleccionar este estatus"
                  : ""
              }
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

SelectUpdateRegistroStatus.propTypes = {
  currentOption: PropTypes.string,
  isLoading: PropTypes.any,
  onConfirm: PropTypes.any,
}
