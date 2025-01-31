import React, { ReactNode } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import styled, { keyframes } from 'styled-components'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'

export type LabelPopupProps = {
  children?: ReactNode
  open: boolean
  onClose: () => void
  style?: ComponentTheme['label']['descriptionPopup']
}

export const LabelPopup = ({ children, open, onClose, style }: LabelPopupProps) => {
  // Styles
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'label')({ descriptionPopup: style })

  return open ? (
    <ClickAwayListener onClickAway={onClose}>
      <PopupElement onClick={onClose} {...getCSSStyles('descriptionPopup')}>
        {children}
      </PopupElement>
    </ClickAwayListener>
  ) : null
}

const PopupAnimation = keyframes`
  from {
    opacity: 0;
    transform-origin: top center;
    transform: scale(0, 0);
  }
  to {
    opacity: 1;
    transform-origin: top center;
    transform: scale(1, 1);
  }
`

const PopupElement = createStyled(styled.div`
  animation: ${PopupAnimation} 0.12s ease-out;
`)
