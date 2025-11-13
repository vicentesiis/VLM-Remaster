"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "."

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        onPointerDownOutside={(event) => event.preventDefault()}
        ref={ref}
        aria-describedby={undefined}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 pt-1 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
)
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "scroll-m-20 text-xl font-semibold tracking-tight", // H3 styles
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

const DialogHeaderCustom = ({
  icon: Icon,
  title,
  className,
  iconBgClass = "bg-primary",
  ...props
}) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 -mx-6 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:h-[4.5rem] sm:px-6",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-transform hover:scale-105 sm:h-11 sm:w-11",
              iconBgClass
            )}
          >
            <Icon className="size-5 sm:size-6" />
          </div>
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:h-10" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <DialogTitle asChild>
          <h1 className="truncate text-base font-semibold leading-tight tracking-tight text-foreground sm:text-xl">
            {title}
          </h1>
        </DialogTitle>
      </div>

      <DialogClose asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full hover:bg-muted sm:h-10 sm:w-10"
        >
          <X className="size-4 sm:size-5" />
          <span className="sr-only">Cerrar</span>
        </Button>
      </DialogClose>
    </div>
  )
}

DialogHeaderCustom.displayName = "DialogHeaderCustom"

const DialogFooterCustom = ({
  className,
  cancelLabel = "Cancelar",
  cancelVariant = "outline",
  onCancel,
  actionLabel,
  actionVariant = "default",
  isLoading = false,
  onAction,
  actionProps = {},
}) => {
  return (
    <div
      className={cn(
        "sticky bottom-0 -mx-6 mt-4 flex flex-col-reverse gap-2 border-t bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:flex-row sm:justify-end sm:gap-3 sm:px-6",
        className
      )}
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

DialogFooterCustom.displayName = "DialogFooterCustom"

export { DialogFooterCustom }

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogHeaderCustom,
}
