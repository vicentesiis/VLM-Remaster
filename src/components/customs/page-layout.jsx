import React from "react"
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  InlineCode,
  Lead,
  PLead,
  Large,
  Muted,
} from "@/components/ui/typography"

const PageLayout = ({ title, buttons, children }) => {
  return (
    <div className="mx-auto my-4 max-w-screen-xl">
      <div className="mb-4 flex items-center justify-between">
        <H4 className="text-2xl font-bold">{title}</H4>
        <div className="flex gap-2">{buttons}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default PageLayout
