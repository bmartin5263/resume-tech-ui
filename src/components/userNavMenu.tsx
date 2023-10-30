import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Icon, { IconType } from "./icon"

export type UserNavMenuProps = {
  children: React.ReactNode,
  style?: React.CSSProperties
}

export default function UserNavMenu(props : UserNavMenuProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!isOpen);
  const menuIcon = isOpen ? 'expand_more' : 'chevron_right';

  return (
    <>
      <button className='user-nav-btn' onClick={toggleOpen} style={props.style ?? {}}>
        <Icon name={menuIcon} style={{padding: '0 .3em',}} type={IconType.OUTLINED}/>
        Education
      </button>
      <div className='user-nav-menu' style={isOpen ? {} : {display: 'none'}}>
        {props.children}
      </div>
    </>
  )
}