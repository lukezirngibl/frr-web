import React, { Fragment, MouseEvent, ReactNode, RefCallback, useEffect, useRef } from 'react'
import { CoercedMenuPlacement } from 'react-select'
import styled, { css } from 'styled-components'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { CommonPropsAndClassName } from './Menu.types'
import { getMenuPlacement } from './Menu.utils'
import { useMenuPlacement } from './MenuPortal'
import useScrollCapture from './useScrollCapture'
import useScrollLock from './useScrollLock'

const alignToControl = (placement: CoercedMenuPlacement) => {
  const placementToCSSProp = { bottom: 'top', top: 'bottom' }
  return placement ? placementToCSSProp[placement] : 'bottom'
}

export interface MenuProps extends CommonPropsAndClassName {
  children: ReactNode
  fieldHeight: number
  isLoading: boolean
  maxMenuHeight: number
  menuShouldBlockScroll?: boolean
  minMenuHeight: number
  style?: Partial<ComponentTheme['select']>
}

export const Menu = (props: MenuProps) => {
  const commonProps = { className: props.className, cx: props.cx }

  // Style
  const theme = useComponentTheme()
  const cssStyles = useCSSStyles(theme, 'select')(props.style)

  // Refs
  const menuListRef = useRef<HTMLDivElement>(null)
  const getMenuListRef: RefCallback<HTMLDivElement> = (ref) => {
    menuListRef.current = ref
  }

  // Mouse evnets
  const onMenuMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return
    }
    event.stopPropagation()
    event.preventDefault()
  }

  // Menu Placement
  const menuRef = useRef(null)
  const { menuPlacement, setMenuPlacement } = useMenuPlacement()

  useEffect(() => {
    if (!menuRef.current) return

    const state = getMenuPlacement({
      menuEl: menuRef.current,
      maxHeight: props.maxMenuHeight,
      fieldHeight: props.fieldHeight,
    })

    if (state.maxHeight !== menuPlacement.maxHeight || state.placement !== menuPlacement.placement) {
      setMenuPlacement(state)
    }
  }, [])

  return (
    <StyledMenu
      {...cssStyles('menu')}
      align={alignToControl(menuPlacement.placement)}
      className={props.cx({ menu: true }, props.className)}
      label="menu"
      onMouseDown={onMenuMouseDown}
      ref={menuRef}
    >
      <ScrollManager lockEnabled={props.menuShouldBlockScroll} captureEnabled={false}>
        {(scrollTargetRef) => (
          <MenuList
            {...commonProps}
            innerRef={(instance) => {
              getMenuListRef(instance)
              scrollTargetRef(instance)
            }}
            maxMenuHeight={menuPlacement.maxHeight}
            options={props.options}
          >
            {props.children}
          </MenuList>
        )}
      </ScrollManager>
    </StyledMenu>
  )
}

const StyledMenu = createStyled(styled.div<{ align: CoercedMenuPlacement }>`
  position: absolute;

  ${(props) =>
    css`
      margin-bottom: ${props.align === 'top' ? 38 : 0}px;
      ${[props.align]}: 100%;
    `};
`)

// ==============================
// Menu List
// ==============================

export interface MenuListProps extends CommonPropsAndClassName {
  maxMenuHeight: number
  children: ReactNode
  innerRef: RefCallback<HTMLDivElement>
}

export const MenuList = (props: MenuListProps) => {
  const { children, className, cx, innerRef, maxMenuHeight } = props

  return (
    <StyledMenuList
      $maxMenuHeight={maxMenuHeight}
      className={cx({ 'menu-list': true }, className)}
      ref={innerRef}
    >
      {children}
    </StyledMenuList>
  )
}

const StyledMenuList = styled.div<{ $maxMenuHeight: number }>`
  max-height: ${(props) => props.$maxMenuHeight}px;
  overflow-y: auto;
  position: relative; /* required for offset[Height, Top] > keyboard scroll */
  webkit-overflow-scrolling: touch;
`

// ==============================
// Scroll Manager
// ==============================

interface ScrollManagerProps {
  readonly children: (ref: RefCallback<HTMLElement>) => React.ReactElement
  readonly lockEnabled: boolean
  readonly captureEnabled: boolean
  readonly onBottomArrive?: (event: WheelEvent | TouchEvent) => void
  readonly onBottomLeave?: (event: WheelEvent | TouchEvent) => void
  readonly onTopArrive?: (event: WheelEvent | TouchEvent) => void
  readonly onTopLeave?: (event: WheelEvent | TouchEvent) => void
}

const blurSelectInput = () => document.activeElement && (document.activeElement as HTMLElement).blur()

export const ScrollManager = ({
  children,
  lockEnabled,
  captureEnabled = true,
  onBottomArrive,
  onBottomLeave,
  onTopArrive,
  onTopLeave,
}: ScrollManagerProps) => {
  const setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive,
    onBottomLeave,
    onTopArrive,
    onTopLeave,
  })
  const setScrollLockTarget = useScrollLock({ isEnabled: lockEnabled })

  const targetRef: RefCallback<HTMLElement> = (element) => {
    setScrollCaptureTarget(element)
    setScrollLockTarget(element)
  }

  return (
    <Fragment>
      {lockEnabled && (
        <div
          onClick={blurSelectInput}
          style={{ position: 'fixed', left: 0, bottom: 0, right: 0, top: 0 }}
        />
      )}
      {children(targetRef)}
    </Fragment>
  )
}
