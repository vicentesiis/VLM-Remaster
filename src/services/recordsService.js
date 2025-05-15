import { getValidAccessToken } from "./authService"
import { getRecordsData } from "@/api/api"

/**
 * @returns {Promise<RecordsResponse>}
 */
export const getRecords = async () => {
  const token = await getValidAccessToken()
  const result = await getRecordsData(token)

  await new Promise((resolve) => setTimeout(resolve, 800))

  return result
}
