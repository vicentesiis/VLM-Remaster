import { NewNavbar } from "@/components/admin-panel/navbar"

export function ContentLayout({ title, children }) {
  return (
    <div>
      <NewNavbar title={title} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  )
}
