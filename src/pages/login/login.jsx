import React, { useEffect, useRef } from "react"
import { Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import logo from "@/assets/logo.png"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { H2, Lead, H3 } from "@/components/ui/typography"
import { useAuth } from "@/hooks/useAuth"
import "@/styles/LoginAnimationBackground.css"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { ButtonLoading } from "@/components/customs/button-loading"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const loginSchema = z.object({
  user: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
})

export const Login = () => {
  const { token, loginMutation } = useAuth()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  })

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form

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

  if (token) return <Navigate to="/" replace />

  const renderLoginCard = () => (
    <Card
      shadow="sm"
      className="backdrop rounded-lg p-4 shadow-lg md:p-10 md:py-6"
    >
      <CardHeader className="flex-col sm:w-[400px]">
        <H2 className="text-[28px] lg:text-3xl">Bienvenid@</H2>
        <Lead className="">Por favor ingresa tus datos</Lead>
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
                    <FormLabel className="text-primary">Usuario</FormLabel>
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
                    <FormLabel className="text-primary">Contraseña</FormLabel>
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
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Usuario o contraseña incorrectos
                </AlertDescription>
              </Alert>
            )}

            <ButtonLoading
              className="w-full"
              isLoading={loginMutation.isPending}
            >
              Iniciar Sesión
            </ButtonLoading>
          </form>
        </Form>
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
        <img src={logo} alt="Proyecto VLM" width={60} />
        <H3 className="text-xl md:text-3xl font-normal">
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
