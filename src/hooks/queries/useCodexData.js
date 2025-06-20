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

export const useCodexData = () => {
  const recordStatuses = useGetRecordStatuses()
  const recordTypes = useGetRecordTypes()
  const nationalities = useGetNationalities()
  const mexicoStates = useGetMexicoStates()
  const roles = useGetRoles()
  const agentTypes = useGetAgentTypes()
  const programs = useGetPrograms()
  const channels = useGetChannels()

  const isLoading =
    recordStatuses.isLoading ||
    recordTypes.isLoading ||
    nationalities.isLoading ||
    mexicoStates.isLoading ||
    roles.isLoading ||
    agentTypes.isLoading ||
    programs.isLoading ||
    channels.isLoading

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
  }
}
