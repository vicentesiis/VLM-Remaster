import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { z } from "zod"

import logo from "@/assets/logo.png"
import FullScreenLoader from "@/components/customs/full-screen-loader"
import { Button } from "@/components/ui"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import "@/styles/LoginAnimationBackground.css"

const loginSchema = z.object({
  user: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
})

export const Login = () => {
  const { token, loading, loginMutation } = useAuth()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  })

  const { handleSubmit, control } = form

  const onSubmit = (data) => {
    loginMutation.mutate(
      { username: data.user, password: data.password },
      {
        onError: () => {
          form.reset({ user: "", password: "" })
        },
      }
    )
  }

  const userInputRef = useRef(null)

  useEffect(() => {
    userInputRef.current?.focus()
  }, [])

  if (token && loading) {
    return <FullScreenLoader />
  }

  if (token && !loading) {
    return <Navigate to="/registros" replace />
  }

  const renderLoginCard = () => (
    <Card className="w-full max-w-md backdrop-blur-sm bg-white/95 shadow-2xl border-0">
      <CardHeader className="!pb-2">
        <h2 className="text-4xl font-bold tracking-tight text-center">
          Bienvenid@
        </h2>
        <p className="text-base text-muted-foreground text-center">
          Por favor ingresa tus datos para continuar
        </p>
      </CardHeader>

      <CardContent className="px-6 pb-8">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="user"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Usuario
                  </FormLabel>
                  <FormControl>
                    <Input
                      ref={userInputRef}
                      placeholder="Ingresa tu usuario"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="username"
                      className="h-12 text-base"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        loginMutation.reset()
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa tu contraseña"
                      type="password"
                      autoComplete="current-password"
                      className="h-12 text-base"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        loginMutation.reset()
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {loginMutation.isError && (
              <Alert variant="destructive" className="animate-in fade-in-50">
                <AlertTitle className="text-base font-semibold">
                  Error de inicio de sesión
                </AlertTitle>
                <AlertDescription className="text-base">
                  Usuario o contraseña incorrectos. Por favor, intenta nuevamente.
                </AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full h-12 text-lg mt-6"
              isLoading={loginMutation.isPending}
            >
              Iniciar Sesión
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )

  return (
    <section className="login-background relative min-h-screen overflow-hidden">
      {/* Logo */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3 sm:top-10 sm:left-10">
        <img
          src={logo}
          alt="NorthEntry Logo"
          width={60}
          height={60}
          className="drop-shadow-lg"
        />
        <h3 className="text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl lg:text-4xl">
          NorthEntry
        </h3>
      </div>

      {/* Centered Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        {renderLoginCard()}
      </div>
    </section>
  )
}

export default Login
