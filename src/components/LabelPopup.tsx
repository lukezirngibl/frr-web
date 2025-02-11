import React, { ReactNode, useEffect, useRef, useState } from 'react'
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

  // Get position of popup element and check if rendered outside of the screen with a hidden element
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupState, setPopupState] = useState({ isOpen: false, isOverflow: false })

  useEffect(() => {
    if (open && popupRef.current) {
      setTimeout(() => {
        const rectBody = document.getElementsByTagName('body')![0].getBoundingClientRect()
        const rectPopUp = popupRef.current.getBoundingClientRect()

        const isOverflow = rectPopUp.right > rectBody.right - 64

        setPopupState({ isOpen: true, isOverflow })
      }, 30)
    } else {
      setPopupState({ isOpen: false, isOverflow: false })
    }
  }, [open])

  return open ? (
    <>
      {popupState.isOpen ? (
        <ClickAwayListener onClickAway={onClose}>
          <PopupElementAnimated
            onClick={onClose}
            ref={popupRef}
            {...getCSSStyles({
              descriptionPopup: true,
              descriptionPopupOverflow: popupState.isOverflow,
            })}
          >
            {children}
          </PopupElementAnimated>
        </ClickAwayListener>
      ) : (
        <PopupElementHidden
          ref={popupRef}
          {...getCSSStyles({ descriptionPopup: true, descriptionPopupOverflow: popupState.isOverflow })}
        >
          {children}
        </PopupElementHidden>
      )}
    </>
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
const PopupElementAnimated = createStyled(styled.div`
  animation: ${PopupAnimation} 0.12s ease-out;
`)

const PopupElementHidden = createStyled(styled.div`
  opacity: 0 !important;
`)
