import {
  useGetRecordStatuses,
  useGetRecordTypes,
  useGetPrograms,
  useGetChannels,
  useGetNationalities,
  useGetMexicoStates,
  useGetRoles,
  useGetAgentTypes,
} from "./useCodex"

import { useGetGroups } from "./useGroup"
import { Roles } from "@/constants/appConstants"

export const useCodexData = (currentRole, { enabled = true } = {}) => {
  const recordStatuses = useGetRecordStatuses({ enabled })
  const recordTypes = useGetRecordTypes({ enabled })
  const nationalities = useGetNationalities({ enabled })
  const mexicoStates = useGetMexicoStates({ enabled })
  const roles = useGetRoles({ enabled })
  const agentTypes = useGetAgentTypes({ enabled })
  const programs = useGetPrograms({ enabled })
  const channels = useGetChannels({ enabled })

  const groups = useGetGroups({
    enabled: enabled && currentRole === Roles.SUPER_ADMIN,
  })

  const isLoading =
    recordStatuses.isLoading ||
    recordTypes.isLoading ||
    nationalities.isLoading ||
    mexicoStates.isLoading ||
    roles.isLoading ||
    agentTypes.isLoading ||
    programs.isLoading ||
    channels.isLoading ||
    groups.isLoading

  return {
    recordStatuses,
    recordTypes,
    nationalities,
    mexicoStates,
    roles,
    agentTypes,
    programs,
    channels,
    groups: currentRole === Roles.SUPER_ADMIN ? groups : null,
    isLoading,
  }
}
