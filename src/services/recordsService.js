import { getValidAccessToken } from "./authService"
import { getRecordsData } from "@/api/api"

/**
 * @returns {Promise<RecordsResponse>}
 */ 
export const getRecords = async () => {
  const token = await getValidAccessToken()
  return await getRecordsData(token)
}