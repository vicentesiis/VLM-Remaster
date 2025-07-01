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
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 pt-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
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
        "sticky top-0 z-10 -mx-6 flex h-14 items-center gap-1 border-b bg-background px-4 sm:px-6",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="flex items-center gap-2 pr-1">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-white",
              iconBgClass
            )}
          >
            <Icon className="size-5" />
          </div>
          <div className="h-6 w-0.5 bg-border" />
        </div>
      )}

      <div className="flex-1">
        <DialogTitle asChild>
          <h1 className="text-sm font-semibold leading-tight tracking-tight dark:text-white sm:text-xl">
            {title}
          </h1>
        </DialogTitle>
      </div>

      <DialogClose asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <X className="size-4" />
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
        "-pb-2 -mx-6 -mb-4 flex flex-col gap-2 border-t bg-background px-6 py-2 sm:flex-row sm:justify-end sm:gap-2 sm:py-0 sm:pt-3",
        className
      )}
    >
      <DialogClose asChild>
        <Button
          size="lg"
          variant={cancelVariant}
          onClick={onCancel}
          className="w-full sm:w-auto"
        >
          {cancelLabel}
        </Button>
      </DialogClose>

      <Button
        size="lg"
        variant={actionVariant}
        onClick={onAction}
        isLoading={isLoading}
        className="w-full sm:w-auto"
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
