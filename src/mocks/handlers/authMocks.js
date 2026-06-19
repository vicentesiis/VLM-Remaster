const generateMockJWT = (username = "mock_admin") => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = btoa(
    JSON.stringify({
      sub: username,
      role: "super_admin",
      exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 365, // 1 year expiration
    })
  )
  return `${header}.${payload}.mocksignature`
}

export const initAuthMocks = (mock) => {
  // Mock POST /auth/token
  mock.onPost("/auth/token").reply((config) => {
    console.log("[Mock] POST /auth/token request received")
    return [
      200,
      {
        access_token: generateMockJWT(),
        refresh_token: "mock_refresh_token",
      },
    ]
  })

  // Mock POST /auth/refresh
  mock.onPost("/auth/refresh").reply(() => {
    console.log("[Mock] POST /auth/refresh request received")
    return [
      200,
      {
        access_token: generateMockJWT(),
        refresh_token: "mock_refresh_token",
      },
    ]
  })
}
