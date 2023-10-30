import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Icon, { IconType } from "./icon"

export type UserNavLinkProps = {
  href: string,
  children: React.ReactNode,
  style?: React.CSSProperties,
  icon?: string
  iconType?: IconType
}

export default function UserNavLink({ href, children, style, icon, iconType } : UserNavLinkProps) {
  var router = useRouter();
  var currentPath = router.pathname;
  var className = "user-nav-link";
  if (href == currentPath) {
    className += " user-nav-link-selected"
  }

  return (
    <Link href={href} className={className} style={style ?? {}}>
      {icon != null && <Icon name={icon} style={{padding: '0 .3em',}} type={iconType ?? IconType.OUTLINED}/>}
      {children}
    </Link>
  )
}