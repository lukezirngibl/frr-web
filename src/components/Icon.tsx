import React from 'react'
import styled, { createGlobalStyle, CSSProperties } from 'styled-components'

export type IconProps = {
  icon: string
  style?: CSSProperties
  className?: string
  size?: number
  color?: string
  onClick?: (e: any) => void
}

export const MaterialIconFontFace = createGlobalStyle`
  @font-face {
    font-display: block;
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url('../assets/fonts/MaterialIcons-Regular.eot'); /* For IE6-8 */
    src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url('../assets/fonts/MaterialIcons-Regular.woff2') format('woff2'),
    url('../assets/fonts/MaterialIcons-Regular.woff') format('woff'),
    url('../assets/fonts/MaterialIcons-Regular.ttf') format('truetype');
  }
`

const IconElement = styled.i<IconProps>`
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  transition: all ease 0.7s;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  color: ${(props) => props.color || 'black'};
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
  ${(props) => (props.size ? `font-size: ${props.size}px` : 'font-size: 24px')};

  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`

export const Icon = (props: IconProps) => {
  const { style, ...otherProps } = props
  return (
    <IconElement className="material-icons" {...otherProps} style={style as any}>
      {props.icon}
    </IconElement>
  )
}
