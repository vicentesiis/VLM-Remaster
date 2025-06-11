import { useMemo } from "react"
import { getRegistrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { extractList } from "@/utils/utils"

export function useRegistroColumns(
  role,
  title,
  isSuperAdmin,
  groups,
  channels,
  programs
) {
  const groupList = useMemo(() => extractList(groups), [groups])
  const channelList = useMemo(() => extractList(channels), [channels])
  const programList = useMemo(() => extractList(programs), [programs])

  return useMemo(() => {
    const cols = getRegistrosColumns(role, title)

    if (!isSuperAdmin) return cols

    if (groupList.length) {
      const groupOptions = groupList.map(({ id, name }) => ({
        label: name,
        value: id,
      }))
      const groupColumn = cols.find((col) => col.accessorKey === "group_id")
      if (groupColumn?.meta) groupColumn.meta.options = groupOptions
    }

    if (channelList.length) {
      const channelOptions = channelList.map((channel) => ({
        label: channel,
        value: channel,
      }))
      const channelColumn = cols.find((col) => col.accessorKey === "channel")
      if (channelColumn?.meta) channelColumn.meta.options = channelOptions
    }

    if (programList.length) {
      const programOptions = programList.map((program) => ({
        label: program,
        value: program,
      }))
      const programColumn = cols.find((col) => col.accessorKey === "program")
      if (programColumn?.meta) programColumn.meta.options = programOptions
    }

    return cols
  }, [title, groupList, channelList, programList])
}
