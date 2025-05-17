import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { H2, Lead, H3 } from "@/components/ui/typography"
import { useAuth } from "@/hooks/useAuth"
import "@/styles/LoginAnimationBackground.css"

export const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { token, loginMutation } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
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
    if (usernameError) setUsernameError("")
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    if (passwordError) setPasswordError("")
  }

  if (token) return <Navigate to="/" replace />

  const renderLoginCard = () => (
    <Card shadow="sm" className="backdrop rounded-lg p-8 shadow-lg md:p-16">
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
                <p className="mt-1 text-sm text-red-500">{usernameError}</p>
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
                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>

          {loginMutation.isError && (
            <p className="mt-2 text-center text-red-500">
              {loginMutation.error.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )

  return (
    <section className="login-background relative h-screen overflow-hidden text-white">
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />

      {/* Logo */}
      <div className="absolute z-10 mt-8 flex items-center sm:ml-16 sm:mt-16">
        <img src={logo} alt="Proyecto VLM" width={75} height={60} />
        <H3 className="sm:text-4xl sm:font-normal">
          Sistema de Administración de Proyecto VLM
        </H3>
      </div>

      {/* Centered Card */}
      <div className="relative z-10 grid h-full place-items-center">
        {renderLoginCard()}
      </div>
    </section>
  )
}

export default Login
