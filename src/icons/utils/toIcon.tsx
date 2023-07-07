import { ReactNode } from 'react'
import { createStyled } from '../../theme/util'
import styled, { css } from 'styled-components'
import { CSSProperties } from '../../theme/configure.theme'

type IconProps = {
  dataTestId?: string
  onClick?: () => void
  size?: number
  dataThemeId?: string
  cssStyles?: string
  cssStylesSVG?: string
  style?: CSSProperties
}
export const toIcon = (SVG: ReactNode) => (props: IconProps) =>
  (
    <IconDiv
      cssStyles={props.cssStyles}
      cssStylesSVG={props.cssStylesSVG}
      data-test-id={props.dataTestId}
      dataThemeId={props.dataThemeId}
      onClick={props.onClick}
      size={props.size}
      style={props.style}
    >
      {SVG}
    </IconDiv>
  )

const IconDiv = createStyled(styled.div<IconProps>`
  width: ${(props) => props.size || 24}px;
  height: ${(props) => props.size || 24}px;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};

  svg {
    ${(props) => css`${props.cssStylesSVG}`}
  }
`)
