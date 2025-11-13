"use client"

import { X } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Dialog, DialogClose, DialogContent, DialogPortal, DialogTrigger } from "./dialog"

const CustomDialog = Dialog

const CustomDialogTrigger = DialogTrigger

const CustomDialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogContent
        ref={ref}
        className={cn(
          "flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0",
          className
        )}
        {...props}
      >
        {children}
      </DialogContent>
    </DialogPortal>
  )
)
CustomDialogContent.displayName = "CustomDialogContent"

const CustomDialogHeader = ({
  icon: Icon,
  title,
  className,
  iconBgClass = "bg-primary",
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:h-[4.5rem] sm:px-6",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform hover:scale-105 sm:h-11 sm:w-11",
              iconBgClass
            )}
          >
            <Icon className="size-5 sm:size-6" />
          </div>
          <div className="h-8 w-px shrink-0 bg-gradient-to-b from-transparent via-border to-transparent sm:h-10" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold leading-tight tracking-tight text-foreground sm:text-xl">
          {title}
        </h1>
      </div>

      <DialogClose asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-full hover:bg-muted sm:h-10 sm:w-10"
        >
          <X className="size-4 sm:size-5" />
          <span className="sr-only">Cerrar</span>
        </Button>
      </DialogClose>
    </div>
  )
}
CustomDialogHeader.displayName = "CustomDialogHeader"

const CustomDialogBody = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto px-4 py-4 sm:px-6",
        className
      )}
      {...props}
    />
  )
)
CustomDialogBody.displayName = "CustomDialogBody"

const CustomDialogFooter = ({
  className,
  cancelLabel = "Cancelar",
  cancelVariant = "outline",
  onCancel,
  actionLabel,
  actionVariant = "default",
  isLoading = false,
  onAction,
  actionProps = {},
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col-reverse gap-2 border-t bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:flex-row sm:justify-end sm:gap-3 sm:px-6",
        className
      )}
      {...props}
    >
      <DialogClose asChild>
        <Button
          size="lg"
          variant={cancelVariant}
          onClick={onCancel}
          disabled={isLoading}
          className="w-full sm:w-auto sm:min-w-[120px]"
        >
          {cancelLabel}
        </Button>
      </DialogClose>

      <Button
        size="lg"
        variant={actionVariant}
        onClick={onAction}
        isLoading={isLoading}
        className="w-full sm:w-auto sm:min-w-[120px]"
        {...actionProps}
      >
        {actionLabel}
      </Button>
    </div>
  )
}
CustomDialogFooter.displayName = "CustomDialogFooter"

export {
  CustomDialog,
  CustomDialogTrigger,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogBody,
  CustomDialogFooter,
}
