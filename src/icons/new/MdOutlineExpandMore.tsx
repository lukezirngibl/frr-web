import type { SVGProps } from 'react'
import React from 'react'

export const MdOutlineExpandMore: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>
    </svg>
  )
}
