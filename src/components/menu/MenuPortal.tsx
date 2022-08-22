import React, { createContext, Fragment, ReactNode, RefCallback, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { CommonPropsAndClassName, MenuPlacement, MenuPlacementState, RectType } from './Menu.types'
import { getBoundingClientObj, getMenuPlacement } from './Menu.utils'

// ==============================
// Portal Placement Context
// ==============================

type setPortalPlacementType = (placement: MenuPlacement) => void
export const PortalPlacementContext = createContext<{ setPortalPlacement: setPortalPlacementType }>({
  setPortalPlacement: () => {},
})
export const usePortalPlacementContext = () => {
  const { setPortalPlacement } = useContext(PortalPlacementContext)
  return setPortalPlacement
}

// ==============================
// Portal Component
// ==============================

interface MenuPortalProps extends CommonPropsAndClassName {
  appendTo: HTMLElement | undefined
  children: ReactNode
  controlElement: HTMLDivElement | null
}

export const MenuPortal = (props: MenuPortalProps) => {
  const [placement, setPlacement] = useState<MenuPlacement>('bottom')

  // callback for occasions where the menu must "flip"
  const setPortalPlacement = (newPlacement: MenuPlacement) => {
    // avoid re-renders if the placement has not changed
    if (newPlacement !== placement) {
      setPlacement(newPlacement)
    }
  }

  const { appendTo, children, className, controlElement, cx } = props

  // bail early if required elements aren't present
  if (!appendTo || !controlElement) {
    return null
  }

  const rect = getBoundingClientObj(controlElement)
  const scrollDistance = window.pageYOffset
  const offset = rect[placement] + scrollDistance

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
    <PortalPlacementContext.Provider value={{ setPortalPlacement }}>
      {appendTo ? createPortal(MenuWrapper, appendTo) : MenuWrapper}
    </PortalPlacementContext.Provider>
  )
}

const StyledMenuPortal = styled.div<{ rect: RectType; offset: number }>`
  left: ${(props) => props.rect.left}px;
  position: absolute;
  top: ${(props) => props.offset}px;
  width: ${(props) => props.rect.width}px;
  zindex: 1;
`

// ==============================
// Menu Placer
// ==============================

interface ChildrenProps {
  ref: RefCallback<HTMLDivElement>
  placerProps: MenuPlacementState
}

interface MenuPlacerProps {
  maxMenuHeight: number
  fieldHeight: number
  children: (childrenProps: ChildrenProps) => ReactNode
}

// NOTE: internal only
export const MenuPlacer = (props: MenuPlacerProps) => {
  const [menuPlacementState, setMenuPlacementState] = useState<MenuPlacementState>({
    placement: 'bottom',
    maxHeight: props.maxMenuHeight,
  })
  const setPortalPlacement = usePortalPlacementContext()

  const setMenuPlacementRefCallback: RefCallback<HTMLDivElement> = (ref) => {
    if (!ref) return

    const state = getMenuPlacement({
      menuEl: ref,
      maxHeight: props.maxMenuHeight,
      fieldHeight: props.fieldHeight,
    })

    if (state.placement !== menuPlacementState.placement) {
      if (setPortalPlacement) setPortalPlacement(state.placement)
    }

    if (
      state.maxHeight !== menuPlacementState.maxHeight ||
      state.placement !== menuPlacementState.placement
    ) {
      setMenuPlacementState(state)
    }
  }

  return (
    <Fragment>
      {props.children({
        ref: setMenuPlacementRefCallback,
        placerProps: menuPlacementState,
      })}
    </Fragment>
  )
}
