import React from 'react'

export const IoImagesOutline = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M432 112V96a48.14 48.14 0 0 0-48-48H64a48.14 48.14 0 0 0-48 48v256a48.14 48.14 0 0 0 48 48h16"
      ></path>
      <rect
        width="400"
        height="336"
        x="96"
        y="128"
        fill="none"
        strokeLinejoin="round"
        strokeWidth="32"
        rx="45.99"
        ry="45.99"
      ></rect>
      <ellipse
        cx="372.92"
        cy="219.64"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="32"
        rx="30.77"
        ry="30.55"
      ></ellipse>
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M342.15 372.17 255 285.78a30.93 30.93 0 0 0-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0 1 41.46-1.87L496 402.91"
      ></path>
    </svg>
  )
}
