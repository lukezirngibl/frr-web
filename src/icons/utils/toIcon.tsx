import { ReactNode } from 'react'
import { createStyled } from '../../theme/util'
import styled from 'styled-components'

type IconProps = {
  dataTestId?: string
  onClick?: () => void
  size?: number
  cssStyles?: { cssStyles: string; dataThemeId: string }
}
export const toIcon = (SVG: ReactNode) => (props: IconProps) =>
  (
    <IconDiv
      data-test-id={props.dataTestId}
      onClick={props.onClick}
      size={props.size}
      {...props.cssStyles}
    >
      {SVG}
    </IconDiv>
  )

const IconDiv = createStyled(styled.div<IconProps>`
  width: ${(props) => props.size || 24}px;
  height: ${(props) => props.size || 24}px;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`)
