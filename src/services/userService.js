import { getValidAccessToken } from "./authService"
import { getUserData } from "@/api/api"

/**
 * @returns {Promise<UserResponse>}
 */
export const getUser = async () => {
  const token = await getValidAccessToken()
  return await getUserData(token)
}