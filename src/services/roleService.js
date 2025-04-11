import { getValidAccessToken } from "./authService"
import { fetchUserCatalogData } from "@/api/api"

/**
 * @returns {Promise<UserCatalogResponse>}
 */
export const fetchUserCatalog = async () => {
  const token = await getValidAccessToken()
  return await fetchUserCatalogData(token)
}
