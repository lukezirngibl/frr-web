import type { SVGProps } from 'react'
import React from 'react'

export const MdDownload: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"></path>
    </svg>
  )
}
