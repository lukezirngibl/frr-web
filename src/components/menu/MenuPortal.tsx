import React, { ReactNode, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { CommonPropsAndClassName, MenuPlacementState, RectType } from './Menu.types'
import { getBoundingClientObj, MAX_HEIGHT } from './Menu.utils'

// ==============================
// Portal Placement Context
// ==============================

type SetMenuPlacement = (menuPlacement: MenuPlacementState) => void
export const MenuPlacementContext = React.createContext<{
  menuPlacement: MenuPlacementState
  setMenuPlacement: SetMenuPlacement
}>({
  setMenuPlacement: () => {},
  menuPlacement: {
    placement: 'bottom',
    maxHeight: MAX_HEIGHT,
  },
})
export const useMenuPlacement = () => useContext(MenuPlacementContext)

// ==============================
// Portal Component
// ==============================

interface MenuPortalProps extends CommonPropsAndClassName {
  appendTo: HTMLElement | undefined
  children: ReactNode
  fieldHeight: number
  controlElement: HTMLDivElement | null
  maxMenuHeight: number
}

export const MenuPortal = (props: MenuPortalProps) => {
  const [menuPlacement, setMenuPlacement] = useState<MenuPlacementState>({
    placement: 'bottom',
    maxHeight: props.maxMenuHeight,
  })

  const { appendTo, children, className, controlElement, cx } = props

  // bail early if required elements aren't present
  if (!appendTo || !controlElement) {
    return null
  }

  const rect = getBoundingClientObj(controlElement)
  const scrollDistance = window.pageYOffset
  const fieldHeightCorrection = menuPlacement.placement === 'top' ? props.fieldHeight : 0
  const offset = rect[menuPlacement.placement] + scrollDistance - fieldHeightCorrection

  // same wrapper element whether fixed or portalled
  const MenuWrapper = (
    <StyledMenuPortal
      className={cx(
        {
          'menu-portal': true,
        },
        className,
      )}
      rect={rect}
      offset={offset}
    >
      {children}
    </StyledMenuPortal>
  )

  return (
    <MenuPlacementContext.Provider value={{ menuPlacement, setMenuPlacement }}>
      {appendTo ? createPortal(MenuWrapper, appendTo) : MenuWrapper}
    </MenuPlacementContext.Provider>
  )
}

const StyledMenuPortal = styled.div<{ rect: RectType; offset: number }>`
  position: absolute;
  top: ${(props) => props.offset}px;
  left: ${(props) => props.rect.left}px;
  width: ${(props) => props.rect.width}px;
  z-index: 1;
`
