import { SVGProps } from 'react'

export const MdArrowDropUp: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M7 14l5-5 5 5z"></path>
    </svg>
  )
}
