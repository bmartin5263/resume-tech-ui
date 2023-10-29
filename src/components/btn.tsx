import React from 'react'

export type BtnProps = {
  children: React.ReactNode
}

export default function Btn(props: BtnProps) {
  return (
    <>
      {props.children}
    </>
  )
}
