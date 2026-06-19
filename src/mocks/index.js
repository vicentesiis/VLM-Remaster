import MockAdapter from "axios-mock-adapter"
import axiosInstance from "@/api/axiosInstance"
import { plainAxios } from "@/api/plainAxios"
import { initAuthMocks } from "./handlers/authMocks"
import { initUserMocks } from "./handlers/userMocks"

export const initMocks = () => {
  console.log("[Mock] Initializing API mocks...")

  // Delay response by 200ms to simulate network latency
  const mockInstance = new MockAdapter(axiosInstance, { delayResponse: 200 })
  const mockPlain = new MockAdapter(plainAxios, { delayResponse: 200 })

  initAuthMocks(mockPlain)
  initUserMocks(mockInstance)

  // Pass through any other requests to the actual network so we don't break unmocked assets/calls
  mockInstance.onAny().passThrough()
  mockPlain.onAny().passThrough()
}
