import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { H2, H4 } from "@/components/ui/typography"
import logo from "@/assets/logo.png"
import { Navigate } from "react-router-dom"

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      ;<Navigate to="/" replace />
    }
  }, [isLoggedIn]) // This effect will run whenever `isLoggedIn` changes

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="bg-gray-200 px-8">
      <div className="absolute -ml-4 mt-24 flex items-center lg:ml-16 lg:mt-16">
        <img src={logo} alt="Proyecto VLM" width={70} height={60} />
        <H2>Sistema de Administración de Proyecto VLM</H2>
      </div>

      <div className="grid h-screen place-items-center">
        <Card shadow="sm" className="p-8 md:p-16">
          <CardHeader className="mt-0 flex-col sm:w-[400px]">
            <H2 className="!text-3xl lg:text-4xl">Bienvenid@</H2>
            <H4 className="mb-4 !text-gray-600">Por favor ingresa tus datos</H4>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col gap-4 space-y-6"
            >
              <div className="space-y-4">
                <Input
                  id="username"
                  placeholder="Usuario"
                  size="lg"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  id="password"
                  placeholder="Contraseña"
                  size="lg"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Login
