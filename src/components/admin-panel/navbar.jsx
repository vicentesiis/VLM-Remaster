import React from "react"
import OmniSearch from "../customs/omnisearch"
import { SheetMenu } from "@/components/admin-panel/sheet-menu"
import { UserNav } from "@/components/admin-panel/user-nav"

export function NewNavbar({ title, subtitle }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border/40 dark:shadow-secondary/20">
      <div className="mx-4 flex h-16 items-center md:mx-8">
        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-0">
          <SheetMenu />
          <div className="flex items-center gap-1.5 md:gap-2">
            <h1 className="text-lg font-semibold tracking-tight text-foreground transition-colors md:text-xl">
              {title}
            </h1>
            {subtitle && (
              <>
                <span className="hidden text-muted-foreground/40 md:inline">
                  /
                </span>
                <p className="text-base font-medium text-primary md:text-lg">
                  {subtitle}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          <div className="hidden lg:block">
            <OmniSearch />
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export default NewNavbar
