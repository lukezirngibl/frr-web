import type { SVGProps } from 'react'
import React from 'react'

export const MdKeyboardArrowRight: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
    </svg>
  )
}