import {
  useGetRecordStatuses,
  useGetRecordTypes,
  useGetPrograms,
  useGetChannels,
  useGetNationalities,
  useGetMexicoStates,
  useGetRoles,
  useGetAgentTypes,
  useGetCountryStates,
  useGetVacantCategories,
} from "./useCodex"

export const useCodexData = ({ enabled = true } = {}) => {
  const recordStatuses = useGetRecordStatuses({ enabled })
  const recordTypes = useGetRecordTypes({ enabled })
  const nationalities = useGetNationalities({ enabled })
  const mexicoStates = useGetMexicoStates({ enabled })
  const roles = useGetRoles({ enabled })
  const agentTypes = useGetAgentTypes({ enabled })
  const programs = useGetPrograms({ enabled })
  const channels = useGetChannels({ enabled })
  const countryStates = useGetCountryStates({ enabled })
  const vacantCategories = useGetVacantCategories({ enabled })

  const isLoading =
    recordStatuses.isLoading ||
    recordTypes.isLoading ||
    nationalities.isLoading ||
    mexicoStates.isLoading ||
    roles.isLoading ||
    agentTypes.isLoading ||
    programs.isLoading ||
    channels.isLoading ||
    countryStates.isLoading ||
    vacantCategories.isLoading

  return {
    recordStatuses,
    recordTypes,
    nationalities,
    mexicoStates,
    roles,
    agentTypes,
    programs,
    channels,
    isLoading,
    countryStates,
    vacantCategories,
  }
}
