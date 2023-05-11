import Top from "./top"
import Bottom from "./bottom"
import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Top />
      <main>{children}</main>
      <Bottom />
    </>
  )
}
