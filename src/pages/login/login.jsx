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
    <Card
      shadow="sm"
      className="backdrop rounded-lg p-4 shadow-lg md:p-10 md:py-6"
    >
      <CardHeader className="flex-col sm:w-[400px]">
        <h2 className="scroll-m-20 border-b pb-2 text-[28px] font-semibold tracking-tight first:mt-0 lg:text-3xl">Bienvenid@</h2>
        <p className="text-xl text-muted-foreground">Por favor ingresa tus datos</p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
            <div className="mb-2 space-y-2">
              <FormField
                name="user"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md text-primary">
                      Usuario
                    </FormLabel>
                    <FormControl>
                      <Input
                        ref={userInputRef}
                        placeholder="Ingresa tu Usuario"
                        type="text"
                        autoCapitalize="none"
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
                    <FormLabel className="text-md text-primary">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingresa tu Contraseña"
                        type="password"
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
            </div>

            {loginMutation.isError && (
              <Alert variant="destructive">
                <AlertTitle>Error de inicio de sesión</AlertTitle>
                <AlertDescription>
                  Usuario o contraseña incorrectos
                </AlertDescription>
              </Alert>
            )}

            <Button className="w-full" isLoading={loginMutation.isPending}>
              Iniciar Sesión
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )

  return (
    <section className="login-background relative h-screen overflow-hidden text-white">

      {/* Logo */}
      <div className="absolute z-10 mt-8 flex items-center gap-3 sm:ml-16 sm:mt-16">
        <img src={logo} alt="NorthEntry" width={60} />
        <h3 className="3xl:text-4xl scroll-m-20 text-xl font-normal tracking-tight md:text-3xl">
          NorthEntry
        </h3>
      </div>

      {/* Centered Card */}
      <div className="relative z-10 grid h-full place-items-center">
        {renderLoginCard()}
      </div>
    </section>
  )
}

export default Login
