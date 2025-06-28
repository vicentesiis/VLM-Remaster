import React from "react"
import OmniSearch from "../customs/navbar/omnisearch"
import { SheetMenu } from "@/components/admin-panel/sheet-menu"
import { UserNav } from "@/components/admin-panel/user-nav"

export function NewNavbar({ title, subtitle }) {
  return (
    <header className="sticky top-0 z-30 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <div className="flex gap-4">
            <h1 className="text-xl font-bold dark:text-white">{title}</h1>
            {subtitle && <p className="font-bold text-primary">{subtitle}</p>}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <OmniSearch />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export default NewNavbar
