import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export type LeftLinkProps = {
  href: string,
  children: React.ReactNode,
  style?: React.CSSProperties
}

export default function LeftLink({ href, children, style } : LeftLinkProps) {
  var router = useRouter();
  var currentPath = router.pathname;
  var className = "left-link";
  if (href == currentPath) {
    className += " left-link-selected"
  }

  return (
    <Link href={href} className={className} style={style ?? {}}>
      {children}
    </Link>
  )
}