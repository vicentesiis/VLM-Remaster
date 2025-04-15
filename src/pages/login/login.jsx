import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { H2, Lead } from "@/components/ui/typography"
import { useAuth } from "@/hooks/useAuth"

export const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { token, loginMutation } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Limpiar errores anteriores
    setUsernameError("")
    setPasswordError("")

    loginMutation.mutate(
      { username: userName, password },
      {
        onError: () => {
          const errorMsg = "Usuario o contraseña incorrectos"
          setUsernameError(errorMsg)
          setPasswordError(errorMsg)
        },
      }
    )
  }

  const handleChangeUserName = (e) => {
    setUserName(e.target.value)
    // Limpiar error de usuario cuando se empiece a escribir
    if (usernameError) setUsernameError("")
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    // Limpiar error de contraseña cuando se empiece a escribir
    if (passwordError) setPasswordError("")
  }

  if (token) return <Navigate to="/" replace />

  return (
    <section className="bg-gray-200 px-8">
      <div className="absolute -ml-4 mt-8 flex items-center sm:ml-16 sm:mt-16">
        <img src={logo} alt="Proyecto VLM" width={70} height={60} />
        <H2 className="text-lg sm:text-4xl sm:font-normal">
          Sistema de Administración de Proyecto VLM
        </H2>
      </div>

      <div className="grid h-screen place-items-center">
        <Card shadow="sm" className="p-8 md:p-16">
          <CardHeader className="mt-0 flex-col sm:w-[400px]">
            <H2 className="!text-3xl lg:text-4xl">Bienvenid@</H2>
            <Lead>Por favor ingresa tus datos</Lead>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col gap-4 space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <Input
                    id="username"
                    placeholder="Usuario"
                    size="lg"
                    value={userName}
                    onChange={handleChangeUserName}
                  />
                  {usernameError && (
                    <p className="text-sm text-red-500 mt-1">
                      {usernameError}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    id="password"
                    placeholder="Contraseña"
                    size="lg"
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500 mt-1">
                      {passwordError}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isLoading}
              >
                {loginMutation.isLoading
                  ? "Iniciando sesión..."
                  : "Iniciar Sesión"}
              </Button>

              {loginMutation.isError && (
                <p className="text-center text-red-500 mt-2">
                  {loginMutation.error.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Login
