import type { SVGProps } from 'react'
import React from 'react'

export const MdKeyboardArrowLeft: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
    </svg>
  )
}
